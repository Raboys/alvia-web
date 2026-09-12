// Usage: NODE_PATH=<directory containing playwright> node verify.cjs <base URL> <output directory>
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const [base, destination] = process.argv.slice(2);
if (!base || !destination) throw Error('Pass base URL and output directory');
fs.mkdirSync(destination, { recursive: true });
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const errors = [];
  const checks = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
  const check = (name, ok) => { checks.push({ name, pass: Boolean(ok) }); if (!ok) throw Error(name); };
  await page.goto(base);
  await page.evaluate(() => document.fonts.ready);
  const result = () => page.locator('#capacity-total').textContent();
  check('initial 480', await result() === '480');
  check('no calculator CTA', await page.locator('#capacidad a').count() === 0);
  check('no explanatory filler', !/de a 30|EL POTENCIAL|Imaginá/.test(await page.locator('#capacidad').innerText()));
  await page.getByRole('button', { name: 'Sumar un médico', exact: true }).click();
  check('21 doctors = 504', await result() === '504');
  await page.getByRole('button', { name: 'Restar un médico', exact: true }).click();
  await page.getByRole('button', { name: 'Sumar media hora', exact: true }).click();
  check('complete slots per doctor = 560', await result() === '560');
  await page.getByRole('button', { name: 'Restar media hora', exact: true }).click();
  for (const [duration, expected] of [[10, '960'], [20, '480'], [30, '320']]) {
    await page.locator(`#duration-${duration}`).check();
    check(`${duration} minutes`, await result() === expected);
  }
  await page.locator('#duration-20').focus();
  await page.keyboard.press('ArrowLeft');
  check('radio keyboard selection', await page.locator('#duration-10').isChecked());
  await page.locator('#professionals').fill('1');
  check('minimum doctors disabled', await page.getByRole('button', { name: 'Restar un médico', exact: true }).isDisabled());
  await page.locator('#professionals').fill('10000');
  check('maximum doctors disabled', await page.getByRole('button', { name: 'Sumar un médico', exact: true }).isDisabled());
  await page.locator('#hours').fill('0.5');
  check('minimum hours disabled', await page.getByRole('button', { name: 'Restar media hora', exact: true }).isDisabled());
  await page.locator('#hours').fill('80');
  check('maximum hours disabled', await page.getByRole('button', { name: 'Sumar media hora', exact: true }).isDisabled());
  await page.locator('#professionals').fill('');
  check('empty value', await result() === '—');
  await page.locator('#professionals').fill('20.5');
  check('fractional doctor invalid', await result() === '—');
  await page.locator('#professionals').fill('20');
  await page.locator('#hours').fill('2');
  await page.locator('#duration-20').check();
  await page.getByText('Cómo se calcula', { exact: true }).click();
  check('method opens', await page.locator('details.calculator-note').getAttribute('open') !== null);
  await page.getByText('Cómo se calcula', { exact: true }).click();
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    check(`no page overflow ${width}`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    check(`no calculator overflow ${width}`, await page.locator('.capacity-calculator').evaluate(e => e.scrollWidth <= e.clientWidth));
    check(`touch targets ${width}`, await page.locator('.capacity-stepper button').evaluateAll(buttons => buttons.every(e => e.offsetWidth >= 44 && e.offsetHeight >= 44)));
    if (width === 1440 || width === 390) await page.locator('#capacidad').screenshot({ path: path.join(destination, `capacity-${width}.png`) });
  }
  await page.locator('.product-menu summary').click();
  check('mobile menu retained', await page.locator('.product-menu').getAttribute('open') !== null);
  for (const route of ['validaciones.html', 'ai-notes.html', 'recetas.html']) {
    const response = await page.goto(new URL(route, base).href);
    check(`${route} HTTP 200`, response.status() === 200);
    check(`${route} no overflow`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  }
  const staticPage = await browser.newPage({ javaScriptEnabled: false });
  await staticPage.goto(base);
  check('no JS example', await staticPage.locator('#capacidad noscript').isVisible());
  check('no JS controls hidden', !await staticPage.locator('#capacity-form').isVisible());
  check('no runtime/resource errors', errors.length === 0);
  fs.writeFileSync(path.join(destination, 'checks.json'), JSON.stringify({ base, checks, errors }, null, 2) + '\n');
  console.log(`${checks.length} checks passed at ${base}`);
  await browser.close();
})().catch(error => { console.error(error); process.exit(1); });
