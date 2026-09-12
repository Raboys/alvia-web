const { chromium } = require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/claude-1000/-home-pablo/6b65ca94-dc9a-4bd5-8021-578c5b098fc8/scratchpad/copero/node_modules/playwright-core');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.PREVIEW_URL || 'http://100.71.73.116:18729';
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || '/home/pablo/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome', headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const failures = [];
  page.on('pageerror', error => failures.push(error.message));
  page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
  const evidence = [];
  const shots = path.join(__dirname, 'screenshots');
  fs.mkdirSync(shots, { recursive: true });
  for (const variant of [1, 2, 3, 4]) {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 650 });
      await page.goto(`${base}/${variant}/index.html?clean=1${variant === 2 ? '&menu=1' : ''}`);
      await page.evaluate(() => document.fonts.ready);
      await page.screenshot({ path: path.join(shots, `option-${variant}${width === 390 ? '-mobile' : ''}.png`) });
    }
    for (const width of [360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      for (const file of ['index.html', 'validaciones.html', 'ai-notes.html', 'recetas.html']) {
        await page.goto(`${base}/${variant}/${file}`);
        if (variant === 2) await page.locator('.mega-menu summary').click();
        const result = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth > innerWidth,
          headerLinks: [...document.querySelectorAll('.study-header .feature-nav-link')].map(a => {
            const r = a.getBoundingClientRect();
            return { text: a.innerText.trim(), url: a.getAttribute('href'), visible: r.width > 0 && r.height > 0, touchHeight: r.height };
          }),
          active: document.querySelector('.study-header [aria-current=page]')?.getAttribute('href') || null,
        }));
        if (result.overflow || result.headerLinks.length !== 3 || result.headerLinks.some(a => !a.visible || a.touchHeight < 44)) failures.push({ variant, width, file, ...result });
        if (file !== 'index.html' && result.active !== file) failures.push(`Wrong active link: ${variant}/${file}`);
        evidence.push({ variant, width, file, ...result });
      }
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${base}/${variant}/index.html?clean=1`);
    if (variant === 2) {
      await page.locator('.mega-menu summary').click();
      await page.keyboard.press('Escape');
      if (await page.locator('.mega-menu').getAttribute('open') !== null) failures.push('Escape did not close megamenu');
      await page.locator('.mega-menu summary').click();
    }
    await page.locator('.study-header a[href*="ai-notes.html"]').click();
    if (!page.url().includes('ai-notes.html')) failures.push(`Navigation failed ${variant}`);
    if (variant === 2) await page.locator('.mega-menu summary').click();
    await page.locator('.study-header a[href*="recetas.html"]').click();
    if (!page.url().includes('recetas.html')) failures.push(`Reciprocal navigation failed ${variant}`);
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(300);
    const top = await page.locator('.study-header').evaluate(el => el.getBoundingClientRect().top);
    if (Math.abs(top) > 1) failures.push(`Header not sticky ${variant}: ${top}`);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.locator('[data-device=desktop]').click();
  await page.locator('[data-device=mobile]').click();
  if (!(await page.locator('body').getAttribute('class')).includes('preview-mobile')) failures.push('Device switch failed');
  await page.screenshot({ path: path.join(shots, 'comparison-mobile.png'), fullPage: true });
  fs.writeFileSync(path.join(__dirname, 'checks.json'), JSON.stringify({ checked: new Date().toISOString(), failures, evidence }, null, 2));
  console.log(JSON.stringify({ pagesAndWidthsChecked: evidence.length, failures }, null, 2));
  await browser.close();
  if (failures.length) process.exitCode = 1;
})().catch(e => { console.error(e); process.exit(1); });
