/* Authoring checks: native coverage example, navigation and isolated runtime. */
const { chromium } = require(process.env.ALVIA_PLAYWRIGHT || '/home/pablo/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const fixture = require('./fixture.json');
const base = process.env.ALVIA_V5_URL || 'http://127.0.0.1:8935/v5/';
const evidence = process.env.ALVIA_V5_EVIDENCE || path.join(__dirname, 'review');
const pageUrl = new URL('validaciones.html', base).href;
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
fs.mkdirSync(evidence, { recursive: true });
const check = (name, value) => { assert.ok(value, name); checks.push(name); };
const fits = page => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
async function capture(page, name, fullPage = true) {
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: path.join(evidence, name), fullPage });
}

async function exerciseExample(page, prefix) {
  const paid = page.locator('#coverage-copay');
  const exempt = page.locator('#coverage-no-copay');
  await paid.focus();
  check(`${prefix}: visible radio focus`, await page.locator('label[for="coverage-copay"]').evaluate(el => getComputedStyle(el).outlineStyle !== 'none'));
  await page.keyboard.press('ArrowRight');
  check(`${prefix}: keyboard selects no copay`, await exempt.isChecked());
  check(`${prefix}: exemption visible, paid row hidden`, await page.locator('.copay-exempt').isVisible() && !await page.locator('.copay-applied').isVisible());
  check(`${prefix}: other requirements remain resolved`, await page.locator('.clearance-list li:visible').count() === 3 && await page.locator('.clearance-ready').isVisible());
  check(`${prefix}: no overflow in exemption`, await fits(page));
  if (prefix === '390' || prefix === '390 without JS') await capture(page, `${prefix.replaceAll(' ', '-')}-no-copay.png`);
  await page.keyboard.press('ArrowLeft');
  check(`${prefix}: keyboard restores paid variant`, await paid.isChecked() && await page.locator('.copay-applied').isVisible() && !await page.locator('.copay-exempt').isVisible());
  await page.getByText('Sin copago', { exact: true }).click();
  check(`${prefix}: label works by pointer`, await exempt.isChecked());
  await page.getByText('Con copago', { exact: true }).click();
}

async function checkLinks(page, label) {
  const links = await page.locator('a').evaluateAll(as => as.map(a => ({ href: a.getAttribute('href'), resolved: a.href, name: a.getAttribute('aria-label') || a.innerText.trim() })));
  for (const link of links) {
    assert.ok(link.href && link.href !== '#' && link.name, `${label}: named nonempty link`);
    const url = new URL(link.resolved);
    if (url.origin !== new URL(base).origin) continue;
    const response = await page.request.get(url.href);
    assert.equal(response.status(), 200, url.href);
    if (url.hash) assert.ok((await response.text()).includes(`id="${url.hash.slice(1)}"`), `Missing anchor ${url.href}`);
  }
  check(`${label}: all local destinations and fragments resolve`, true);
}

(async () => {
  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  try {
    for (const width of [1440, 1024, 768, 390, 320]) {
      const context = await browser.newContext({ viewport: { width, height: 900 } });
      const page = await context.newPage();
      const errors = [];
      const unexpectedRequests = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('response', response => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
      page.on('request', request => { if (!allowedRequest(request.url())) unexpectedRequests.push(request.url()); });
      const response = await page.goto(pageUrl, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      check(`${width}: direct entry and descriptive title`, response.status() === 200 && (await page.title()).includes('Validaciones'));
      check(`${width}: one H1 and preserved indexing`, await page.locator('h1').count() === 1 && await page.locator('meta[name="robots"]').getAttribute('content') === 'noindex, nofollow');
      check(`${width}: no horizontal overflow`, await fits(page));
      check(`${width}: local fonts available`, await page.evaluate(() => document.fonts.check('16px "DM Sans"') && document.fonts.check('54px Lora')));
      check(`${width}: patient agrees with fixture`, await page.locator('.clearance-patient strong').innerText() === fixture.patient);
      check(`${width}: example explicitly identified`, (await page.locator('#validation-caption').innerText()).includes('ficticios') && (await page.locator('legend').innerText()).includes('ejemplo'));
      check(`${width}: approved identity and validated code`, fixture.identity.status === 'passed' && fixture.auth_code.status === 'verified' && (await page.locator('.clearance-list').innerText()).includes('Identidad verificada'));
      check(`${width}: code length is only a fixture`, await page.locator('.example-digits').innerText().then(text => text.replace(/\s/g, '')) === fixture.auth_code.code);
      check(`${width}: readable example text`, await page.locator('.clearance-list strong').evaluateAll(es => es.every(el => parseFloat(getComputedStyle(el).fontSize) >= 15)));
      check(`${width}: explanations have no clipping`, await page.locator('.validation-mechanism').evaluateAll(es => es.every(el => el.scrollWidth <= el.clientWidth && el.scrollHeight <= el.clientHeight)));
      check(`${width}: distinct payment moments and no second charge`, (await page.locator('.copay-timing').innerText()).includes('Al reservar.') && (await page.locator('.copay-timing').innerText()).includes('Antes de entrar a la espera.') && (await page.locator('#copay-title + .copay-timing + p').innerText()).includes('no se cobra de nuevo'));
      check(`${width}: no fake patient action or personal-data input`, await page.locator('main button, main input:not([type="radio"]), main a[href="#"]').count() === 0);
      check(`${width}: contextual commercial CTA`, await page.locator('.validations-closing a[href*="wa.me"]').evaluate(a => new URL(a.href).searchParams.get('text').includes('cobertura')));
      await capture(page, `${width}-full.png`);
      if (width === 1440 || width === 390) await capture(page, `${width}-hero.png`, false);
      await exerciseExample(page, String(width));
      await page.locator('.validation-conditions summary').focus();
      await page.keyboard.press('Enter');
      check(`${width}: disclosure works by keyboard`, await page.locator('.validation-conditions details').evaluate(el => el.open));
      check(`${width}: pending requirements block progression`, (await page.locator('.validation-conditions p').innerText()).includes('no puede continuar'));
      check(`${width}: open disclosure fits`, await fits(page));
      if (width === 390) await capture(page, '390-pending-requirement.png');
      await page.keyboard.press('Enter');
      check(`${width}: disclosure closes by keyboard`, await page.locator('.validation-conditions details').evaluate(el => !el.open));
      if (width <= 900) {
        const menu = page.locator('.menu-toggle');
        await menu.focus();
        await page.keyboard.press('Enter');
        check(`${width}: mobile menu opens`, await menu.getAttribute('aria-expanded') === 'true' && await page.locator('#main-nav').isVisible());
        await page.keyboard.press('Escape');
        check(`${width}: Escape closes menu and restores focus`, await menu.getAttribute('aria-expanded') === 'false' && await menu.evaluate(el => el === document.activeElement));
      }
      if (width === 1440) await checkLinks(page, 'Validaciones');
      await page.locator('.footer a[href="ai-notes.html"]').click();
      await page.waitForURL(new URL('ai-notes.html', base).href);
      check(`${width}: cross link to AI Notes`, await page.locator('#notes-title').isVisible());
      await page.locator('.footer a[href="validaciones.html"]').click();
      await page.waitForURL(pageUrl);
      check(`${width}: cross link back to Validaciones`, await page.locator('#validations-title').isVisible());
      await page.locator('.footer a[href="index.html#funcionalidades"]').click();
      await page.waitForURL(new URL('index.html#funcionalidades', base).href);
      check(`${width}: two complete features linked from home`, await page.locator('.feature-entry a').count() === 2);
      check(`${width}: Recetas remains informative`, await page.locator('[data-feature="recetas"]').evaluate(el => !el.querySelector('a,button,[tabindex]')));
      check(`${width}: home has no overflow`, await fits(page));
      check(`${width}: feature assets excluded from home`, await page.locator('link[href*="validaciones.css"],script[src*="validaciones"]').count() === 0);
      if (width === 1440 || width === 390) await page.locator('#funcionalidades').screenshot({ path: path.join(evidence, `${width}-home-features.png`) });
      await page.locator('[data-feature="validaciones"] a').click();
      await page.waitForURL(pageUrl);
      check(`${width}: home entry works`, await page.locator('#validations-title').isVisible());
      check(`${width}: no resource or JS errors`, errors.length === 0);
      check(`${width}: only runtime or known hosting resources, no product requests`, unexpectedRequests.length === 0);
      await context.close();
    }

    for (const width of [1440, 390, 320]) {
      const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width, height: 900 } });
      const page = await context.newPage();
      await page.goto(pageUrl);
      check(`${width} without JS: content and navigation visible`, await page.locator('#main-nav').isVisible() && await page.locator('.clearance-paper').isVisible() && await page.locator('#copay-title').isVisible());
      check(`${width} without JS: no nonfunctional menu`, !await page.locator('.menu-toggle').isVisible());
      await exerciseExample(page, `${width} without JS`);
      await page.locator('.validation-conditions summary').click();
      check(`${width} without JS: native disclosure and reflow`, await page.locator('.validation-conditions p').isVisible() && await fits(page));
      if (width === 390) await capture(page, '390-no-js.png');
      await context.close();
    }

    const reduced = await browser.newPage({ reducedMotion: 'reduce', viewport: { width: 390, height: 844 } });
    await reduced.goto(pageUrl);
    check('reduced motion: no smooth scroll or animations', await reduced.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === 'auto' && [...document.querySelectorAll('*')].every(el => getComputedStyle(el).animationName === 'none')));
    await reduced.close();

    const zoom = await browser.newPage({ viewport: { width: 720, height: 450 } });
    await zoom.goto(pageUrl);
    check('200% zoom equivalent of 1440px: no overflow', await fits(zoom));
    await zoom.addStyleTag({ content: '.validations-page main p,.validations-page main strong,.validations-page main dd{font-size:200% !important}' });
    check('enlarged reading text: no overflow or clipping', await fits(zoom) && await zoom.locator('.clearance-paper,.validation-mechanism').evaluateAll(es => es.every(el => el.scrollWidth <= el.clientWidth && el.scrollHeight <= el.clientHeight)));
    await capture(zoom, '720-enlarged-text.png');
    await zoom.close();
    fs.writeFileSync(path.join(evidence, 'browser-checks.json'), JSON.stringify({ url: pageUrl, passed: checks.length, checks }, null, 2) + '\n');
    console.log(JSON.stringify({ url: pageUrl, passed: checks.length, evidence }));
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
