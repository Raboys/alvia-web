/* Verify the editorial journey, native availability states and V5 integration. */
const { chromium } = require(process.env.ALVIA_PLAYWRIGHT || '/home/pablo/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const fixture = require('./fixture.json');
const base = process.env.ALVIA_V5_URL || 'http://127.0.0.1:8945/v5/';
const evidence = process.env.ALVIA_V5_EVIDENCE || path.join(__dirname, 'review');
const pageUrl = new URL('recetas.html', base).href;
const deployment = new URL(base);
const publicSite = ['alvia.ar', 'www.alvia.ar'].includes(deployment.hostname);
const allowedRequest = name => {
  const url = new URL(name);
  if (url.origin === deployment.origin && url.pathname.startsWith('/v5/')) return true;
  if (!publicSite) return false;
  return (url.origin === deployment.origin &&
    (url.pathname === '/cdn-cgi/rum' || /^\/cdn-cgi\/scripts\/[a-f0-9]+\/cloudflare-static\/email-decode\.min\.js$/.test(url.pathname))) ||
    (url.origin === 'https://static.cloudflareinsights.com' && url.pathname.startsWith('/beacon.min.js/'));
};
const checks = [];
const check = (name, value) => { assert.ok(value, name); checks.push(name); };
const fits = page => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
const unclipped = page => page.locator('.rx-editor-body,.rx-document,.rx-pending-content,.rx-hero-action,.rx-scene-heading').evaluateAll(es => es.every(el => el.scrollWidth <= el.clientWidth + 1 && el.scrollHeight <= el.clientHeight + 1));
fs.mkdirSync(evidence, { recursive: true });
async function capture(page, name, fullPage = true) {
  const scroll = await page.evaluate(() => ({ left: scrollX, top: scrollY }));
  await page.evaluate(() => { window.scrollTo({ top: 0, behavior: 'instant' }); return document.fonts.ready; });
  await page.screenshot({ path: path.join(evidence, name), fullPage });
  await page.evaluate(position => window.scrollTo({ ...position, behavior: 'instant' }), scroll);
}
async function exerciseStates(page, prefix) {
  const ready = page.locator('#rx-ready');
  const pending = page.locator('#rx-preparing');
  check(`${prefix}: document initially ready`, await ready.isChecked() && await page.locator('.rx-document').isVisible() && !await page.locator('.rx-pending-content').isVisible());
  await ready.scrollIntoViewIfNeeded();
  await ready.focus();
  check(`${prefix}: visible radio focus`, await page.locator('label[for="rx-ready"]').evaluate(el => getComputedStyle(el).outlineStyle !== 'none'));
  await page.keyboard.press('ArrowLeft');
  check(`${prefix}: keyboard selects preparation`, await pending.isChecked());
  check(`${prefix}: pending PDF cannot be opened`, await page.locator('.rx-pending-content').isVisible() && !await page.locator('.rx-document').isVisible() && !await page.locator('.rx-available').isVisible() && await page.locator('.rx-pending-content a,.rx-pending-content button').count() === 0);
  check(`${prefix}: honest preparation state`, (await page.locator('.rx-pending-content').innerText()).includes('todavía no está disponible') && await pending.inputValue() === fixture.states.preparing);
  check(`${prefix}: preparation fits`, await fits(page) && await unclipped(page));
  if (prefix === '390' || prefix === '390 without JS') await capture(page, `${prefix.replaceAll(' ', '-')}-preparing.png`);
  await page.keyboard.press('ArrowRight');
  check(`${prefix}: keyboard restores document`, await ready.isChecked() && await page.locator('.rx-document').isVisible() && !await page.locator('.rx-pending-content').isVisible());
  await page.getByText('En preparación', { exact: true }).click();
  check(`${prefix}: pointer selects preparation`, await pending.isChecked());
  await page.getByText('Documento listo', { exact: true }).click();
  check(`${prefix}: pointer restores ready`, await ready.isChecked());
}
async function checkLinks(page, label) {
  const links = await page.locator('a').evaluateAll(as => as.map(a => ({ href: a.getAttribute('href'), resolved: a.href, name: a.getAttribute('aria-label') || a.innerText.trim() })));
  for (const link of links) {
    assert.ok(link.href && link.href !== '#' && link.name, `${label}: named, nonempty link`);
    const url = new URL(link.resolved);
    if (url.origin !== new URL(base).origin) continue;
    const response = await page.request.get(url.href);
    assert.equal(response.status(), 200, url.href);
    if (url.hash) assert.ok((await response.text()).includes(`id="${url.hash.slice(1)}"`), `Missing anchor ${url.href}`);
  }
  check(`${label}: all local destinations and anchors resolve`, true);
}
(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    for (const width of [1440, 1024, 768, 390, 320]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      const errors = [], unexpected = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
      page.on('request', request => { if (!allowedRequest(request.url())) unexpected.push(request.url()); });
      const response = await page.goto(pageUrl, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      check(`${width}: direct entry and title`, response.status() === 200 && (await page.title()).includes('Recetas'));
      check(`${width}: one H1 and unchanged indexing`, await page.locator('h1').count() === 1 && await page.locator('meta[name="robots"]').getAttribute('content') === 'noindex, nofollow');
      check(`${width}: no overflow or clipped content`, await fits(page) && await unclipped(page));
      check(`${width}: local fonts loaded`, await page.evaluate(() => document.fonts.check('17px "DM Sans"') && document.fonts.check('54px Lora')));
      for (const selector of ['.rx-editor-body', '.rx-document']) {
        const text = await page.locator(selector).innerText();
        check(`${width}: ${selector} matches the same fixture`, [fixture.patient, fixture.doctor, fixture.coverage, fixture.medication, fixture.presentation, fixture.quantity, fixture.instructions].every(value => text.includes(value)));
      }
      check(`${width}: same consultation date`, (await page.locator('.rx-editor-body').innerText()).includes(fixture.date) && (await page.locator('.rx-document').innerText()).includes(fixture.date));
      check(`${width}: draft distinguished from issued document`, await page.locator('.rx-draft').innerText() === 'Borrador' && await page.locator('.rx-validity').innerText() === fixture.validity);
      check(`${width}: readable patient and medication`, await page.locator('.rx-patient strong,.rx-document-medication strong,.rx-fields dd strong').evaluateAll(es => es.every(el => parseFloat(getComputedStyle(el).fontSize) >= 16)));
      check(`${width}: no inert action buttons or patient data inputs`, await page.locator('main button,main input:not([type="radio"]),main a[href="#"]').count() === 0);
      check(`${width}: example identified on both surfaces`, (await page.locator('#editor-caption').innerText()).includes('ficticios') && (await page.locator('#patient-caption').innerText()).includes('ficticio'));
      check(`${width}: contextual CTA`, await page.locator('.rx-closing a[href*="wa.me"]').evaluate(a => new URL(a.href).searchParams.get('text').includes('recetas digitales')));
      check(`${width}: accessible references and unique IDs`, await page.evaluate(() => {
        const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
        return ids.length === new Set(ids).size && [...document.querySelectorAll('[aria-labelledby],[aria-controls],label[for]')].every(el => (el.getAttribute('aria-labelledby') || el.getAttribute('aria-controls') || el.getAttribute('for')).split(/\s+/).every(id => document.getElementById(id)));
      }));
      await capture(page, `${width}-full.png`);
      if (width === 1440 || width === 390) await capture(page, `${width}-hero.png`, false);
      await exerciseStates(page, String(width));
      await page.locator('.rx-conditions summary').focus();
      await page.keyboard.press('Enter');
      check(`${width}: disclosure opens by keyboard`, await page.locator('.rx-conditions details').evaluate(el => el.open));
      check(`${width}: delays, unavailable PDFs and invite exception explained`, (await page.locator('.rx-conditions details').innerText()).includes('No disponible') && (await page.locator('.rx-conditions details').innerText()).includes('no emitir recetas'));
      check(`${width}: open disclosure fits`, await fits(page));
      await page.keyboard.press('Enter');
      check(`${width}: disclosure closes by keyboard`, await page.locator('.rx-conditions details').evaluate(el => !el.open));
      if (width <= 900) {
        const menu = page.locator('.menu-toggle');
        await menu.focus(); await page.keyboard.press('Enter');
        check(`${width}: mobile menu opens`, await menu.getAttribute('aria-expanded') === 'true' && await page.locator('#main-nav').isVisible());
        await page.keyboard.press('Escape');
        check(`${width}: Escape closes menu and restores focus`, await menu.getAttribute('aria-expanded') === 'false' && await menu.evaluate(el => el === document.activeElement));
      }
      if (width === 1440) await checkLinks(page, 'Recetas');
      for (const other of ['validaciones', 'ai-notes']) {
        await page.locator(`.footer a[href="${other}.html"]`).click();
        await page.waitForURL(new URL(`${other}.html`, base).href);
        check(`${width}: ${other} cross link works`, await page.locator('h1').isVisible() && await fits(page));
        if (width === 1440) await checkLinks(page, other);
        await page.locator('.footer a[href="recetas.html"]').click();
        await page.waitForURL(pageUrl);
        check(`${width}: ${other} returns to Recetas`, await page.locator('#rx-title').isVisible());
      }
      await page.locator('.footer a[href="index.html#funcionalidades"]').click();
      await page.waitForURL(new URL('index.html#funcionalidades', base).href);
      check(`${width}: three completed features linked`, await page.locator('.feature-entry a').count() === 3);
      check(`${width}: home remains light and fits`, await fits(page) && await page.locator('link[href*="recetas.css"],script[src*="recetas"]').count() === 0);
      if (width === 1440 || width === 390) {
        check(`${width}: home calculator retains initial capacity`, await page.locator('#capacity-total').innerText() === '480');
        await page.locator('#professionals').fill('10');
        check(`${width}: home calculator updates`, await page.locator('#capacity-total').innerText() === '240');
        await page.locator('#professionals').fill('20');
        const tabs = page.locator('.organization-tabs [role="tab"]');
        await tabs.first().focus(); await page.keyboard.press('End');
        check(`${width}: home tabs work by keyboard`, await tabs.last().getAttribute('aria-selected') === 'true' && await page.locator('[role="tabpanel"]:visible').count() === 1);
        await page.keyboard.press('Home');
        await page.locator('label[for="app-prescription"]').click();
        check(`${width}: home prescription image selector works`, await page.locator('.screen-prescription').isVisible() && !await page.locator('.screen-home').isVisible());
        await page.locator('label[for="app-home"]').click();
      }

      if (width === 1440 || width === 390) await page.locator('#funcionalidades').screenshot({ path: path.join(evidence, `${width}-home-features.png`) });
      await page.locator('[data-feature="recetas"] a').click();
      await page.waitForURL(pageUrl);
      check(`${width}: home entry works`, await page.locator('#rx-title').isVisible());
      check(`${width}: no resource or JS errors`, errors.length === 0);
      check(`${width}: only runtime and known hosting resources`, unexpected.length === 0);
      await context.close();
    }
    for (const width of [1440, 390, 320]) {
      const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: 900 } });
      const page = await context.newPage();
      await page.goto(pageUrl);
      check(`${width} without JS: content and navigation available`, await page.locator('#main-nav').isVisible() && await page.locator('.rx-editor-body').isVisible() && !await page.locator('.menu-toggle').isVisible());
      await exerciseStates(page, `${width} without JS`);
      await page.locator('.rx-conditions summary').click();
      check(`${width} without JS: native disclosure and layout`, await page.locator('.rx-conditions details>div').isVisible() && await fits(page));
      if (width === 390) await capture(page, '390-no-js.png');
      await context.close();
    }
    const reduced = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
    await reduced.goto(pageUrl);
    check('reduced motion: no animations or smooth scroll', await reduced.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === 'auto' && [...document.querySelectorAll('*')].every(el => getComputedStyle(el).animationName === 'none')));
    await reduced.close();
    for (const width of [720, 320]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      await page.goto(pageUrl);
      check(`${width}: zoom reflow fits`, await fits(page));
      await page.locator('.rx-patient strong').evaluateAll(es => es.forEach(el => { el.textContent = 'Sofía María Giménez Fernández de los Santos'; }));
      await page.evaluate(() => {
        const sizes = [...document.querySelectorAll('main p,main strong,main dd')].map(el => [el, parseFloat(getComputedStyle(el).fontSize)]);
        sizes.forEach(([el, size]) => el.style.setProperty('font-size', `${size * 2}px`, 'important'));
      });
      check(`${width}: doubled reading text and long patient name fit`, await fits(page) && await unclipped(page));
      await capture(page, `${width}-enlarged-ready.png`);
      await page.getByText('En preparación', { exact: true }).click();
      check(`${width}: enlarged preparation state fits`, await fits(page) && await unclipped(page));
      await capture(page, `${width}-enlarged-text.png`);
      await page.close();
    }
    fs.writeFileSync(path.join(evidence, 'browser-checks.json'), JSON.stringify({ url: pageUrl, passed: checks.length, checks }, null, 2) + '\n');
    console.log(JSON.stringify({ url: pageUrl, passed: checks.length, evidence }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
