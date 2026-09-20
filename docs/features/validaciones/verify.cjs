/* Authoring-only checks for the approved A refinada composition. */
const { chromium } = require(process.env.ALVIA_PLAYWRIGHT || 'playwright');
const { default: AxeBuilder } = require(process.env.ALVIA_AXE || '@axe-core/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const http = require('node:http');
const { createHash } = require('node:crypto');
const fixture = require('./fixture.json');
const evidence = process.env.ALVIA_V5_EVIDENCE || fs.mkdtempSync(path.join(os.tmpdir(), 'alvia-validaciones-a-'));
const checks = [];
const errors = [];
const check = (name, value) => { assert.ok(value, name); checks.push(name); };
const fits = page => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
fs.mkdirSync(evidence, { recursive: true });

async function serve() {
  const root = path.resolve(process.env.ALVIA_V5_ROOT || path.join(__dirname, '../../../v5'));
  const pages = { '/': 'index.html', '/validaciones': 'validaciones.html', '/ainotes': 'ai-notes.html', '/recetas': 'recetas.html', '/turnos-inteligentes': 'turnos-inteligentes.html' };
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.webp': 'image/webp' };
  const server = http.createServer((req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const file = path.resolve(root, pages[pathname] || `.${pathname}`);
      if (!file.startsWith(root + path.sep)) throw new Error('Outside runtime');
      const data = fs.readFileSync(file);
      res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' });
      res.end(data);
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return server;
}

(async () => {
  let server, browser, pageUrl;
  const runtime = {};
  try {
    server = process.env.ALVIA_V5_URL ? null : await serve();
    const base = process.env.ALVIA_V5_URL || `http://127.0.0.1:${server.address().port}/`;
    pageUrl = new URL('/validaciones', base).href;
    const deployment = new URL(base);
    const publicSite = ['alvia.ar', 'www.alvia.ar'].includes(deployment.hostname);
    const allowed = name => {
      const url = new URL(name);
      return url.origin === deployment.origin || (publicSite && url.origin === 'https://static.cloudflareinsights.com' && url.pathname.startsWith('/beacon.min.js/'));
    };
    browser = await chromium.launch({ headless: true, executablePath: process.env.ALVIA_CHROMIUM || undefined, args: ['--no-sandbox'] });
    async function open(width, options = {}) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, ...options });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      page.on('requestfailed', req => errors.push(`Failed: ${req.url()}`));
      page.on('response', res => { if (res.status() >= 400) errors.push(`${res.status()} ${res.url()}`); });
      page.on('request', req => { if (!allowed(req.url())) errors.push(`Unexpected request: ${req.url()}`); });
      const response = await page.goto(pageUrl, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      check(`${width}: clean route returns 200`, response.status() === 200);
      return { page, context };
    }
    async function interact(page, label, js) {
      const summary = page.locator('.av-pending summary');
      await summary.focus();
      check(`${label}: visible keyboard focus`, await summary.evaluate(el => getComputedStyle(el).outlineStyle !== 'none'));
      check(`${label}: keyboard icon responds immediately`, await summary.locator('svg').evaluate(el => getComputedStyle(el).transitionDuration === '0s'));
      await page.keyboard.press('Enter');
      check(`${label}: disclosure opens by keyboard`, await page.locator('.av-pending details p').isVisible() && await fits(page));
      await page.keyboard.press('Enter');
      check(`${label}: disclosure closes by keyboard`, !await page.locator('.av-pending details p').isVisible());
      if (page.viewportSize().width <= 900) {
        const menu = page.locator('.product-menu summary');
        await menu.focus(); await page.keyboard.press('Enter');
        check(`${label}: menu shows all four features`, await page.locator('.product-menu-links>a:visible').count() === 4 && await fits(page));
        if (js) {
          await page.keyboard.press('Escape');
          check(`${label}: Escape closes menu and restores focus`, !await page.locator('.product-menu').evaluate(el => el.open) && await menu.evaluate(el => el === document.activeElement));
        } else {
          await menu.click();
          check(`${label}: native menu closes without JS`, !await page.locator('.product-menu').evaluate(el => el.open));
        }
      }
    }
    for (const width of [1440, 1024, 768, 390, 320]) {
      const { page, context } = await open(width);
      check(`${width}: exact approved hero`, await page.locator('h1').count() === 1 && (await page.locator('h1').innerText()).replace(/\s+/g, ' ') === fixture.hero);
      check(`${width}: illustration and page fit`, await fits(page) && await page.locator('.av-hero-visual img').evaluate(el => el.complete && el.naturalWidth > 0));
      check(`${width}: local fonts loaded`, await page.evaluate(() => document.fonts.check('16px "DM Sans"') && document.fonts.check('54px Lora')));
      check(`${width}: illustration has an accessible description`, (await page.locator('.av-hero-visual img').getAttribute('alt')).includes('selfie'));
      check(`${width}: code remains illustrative`, (await page.locator('.av-code').innerText()).replace(/\s/g, '') === fixture.auth_code.code && await page.locator('main input,main button').count() === 0);
      check(`${width}: generic affiliate copy`, await page.locator('.av-credential p').innerText() === fixture.auth_code.explanation);
      check(`${width}: three requested payment methods`, (await page.locator('.av-methods li>span').allTextContents()).map(s => s.trim()).join(',') === fixture.payment_methods.join(','));
      check(`${width}: payment timing`, (await page.locator('.av-timing').innerText()).includes('Al reservar.') && (await page.locator('.av-timing').innerText()).includes('Antes de entrar a la espera.'));
      check(`${width}: contextual demo CTA`, await page.locator('.av-closing a[href*="wa.me"]').evaluate(a => new URL(a.href).searchParams.get('text').includes('validaciones')));
      if ([1440, 390, 320].includes(width)) await page.screenshot({ path: path.join(evidence, `${width}-full.png`), fullPage: true });
      await interact(page, String(width), true);
      if (width === 1440) {
        const canonical = 'https://alvia.ar/validaciones';
        check('canonical and OG URL retain public route', await page.locator('link[rel="canonical"]').getAttribute('href') === canonical && await page.locator('meta[property="og:url"]').getAttribute('content') === canonical);
        check('metadata follows approved message', await page.title() === await page.locator('meta[property="og:title"]').getAttribute('content') && (await page.title()).includes('Sabé quién está del otro lado') && await page.locator('meta[name="description"]').getAttribute('content') === await page.locator('.av-lead').innerText());
        check('existing indexing policy preserved', await page.locator('meta[name="robots"]').getAttribute('content') === 'noindex, nofollow');
        const links = await page.locator('a').evaluateAll(es => es.map(el => ({ href: el.href, name: el.getAttribute('aria-label') || el.textContent.trim() })));
        for (const link of links) {
          assert.ok(link.name && link.href, 'Named link');
          const url = new URL(link.href);
          if (url.origin !== deployment.origin || url.pathname.startsWith('/cdn-cgi/')) continue;
          const response = await page.request.get(url.href);
          assert.equal(response.status(), 200, url.href);
          if (url.hash) assert.ok((await response.text()).includes(`id="${url.hash.slice(1)}"`), url.href);
        }
        check('local links and anchors resolve', true);
        for (const name of ['validaciones.css?v=20260920-astra-a', 'assets/validaciones-identidad.svg']) {
          const response = await page.request.get(new URL(name, base).href);
          check(`resource returns 200: ${name}`, response.status() === 200);
          runtime[name] = createHash('sha256').update(await response.body()).digest('hex');
        }
      }
      if (width === 1440 || width === 390) {
        const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        fs.writeFileSync(path.join(evidence, `${width}-axe.json`), JSON.stringify(result.violations, null, 2) + '\n');
        check(`${width}: axe WCAG A/AA without violations`, result.violations.length === 0);
        for (const route of ['/ainotes', '/recetas', '/turnos-inteligentes']) {
          await page.locator(`.footer a[href="${route}"]`).click(); await page.waitForURL(new URL(route, base).href); await page.waitForLoadState('networkidle');
          check(`${width}: ${route} renders`, await page.locator('h1').isVisible() && await fits(page));
          await page.locator('.footer a[href="/validaciones"]').click(); await page.waitForURL(pageUrl); await page.waitForLoadState('networkidle');
          check(`${width}: return to Validaciones`, await page.locator('#av-title').isVisible());
        }
        await page.locator('.footer a[href="/#funcionalidades"]').click(); await page.waitForURL(new URL('/#funcionalidades', base).href); await page.waitForLoadState('networkidle');
        check(`${width}: home links four features without feature CSS`, await page.locator('.feature-entry a').count() === 4 && await page.locator('link[href*="validaciones.css"]').count() === 0);
        await page.locator('[data-feature="validaciones"] a').click(); await page.waitForURL(pageUrl);
        check(`${width}: home entry returns to approved page`, await page.locator('#av-title').isVisible());
      }
      await context.close();
    }
    for (const width of [1440, 390, 320]) {
      const { page, context } = await open(width, { javaScriptEnabled: false });
      await interact(page, `${width} without JS`, false);
      check(`${width} without JS: readable content`, await page.locator('#av-title').isVisible() && await fits(page));
      await context.close();
    }
    const { page, context } = await open(720, { reducedMotion: 'reduce' });
    check('reduced motion: no smooth scroll or animation', await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === 'auto' && [...document.querySelectorAll('*')].every(el => getComputedStyle(el).animationName === 'none')));
    check('200% zoom equivalent fits', await fits(page));
    await page.addStyleTag({ content: '.validations-page main p{font-size:200% !important}' });
    check('enlarged reading text fits', await fits(page));
    await context.close();
    check('no failed resources, browser errors or unexpected requests', errors.length === 0);
  } finally {
    fs.writeFileSync(path.join(evidence, 'browser-checks.json'), JSON.stringify({ checkedAt: new Date().toISOString(), url: pageUrl, runtime, passed: checks.length, checks, errors }, null, 2) + '\n');
    if (browser) await browser.close();
    if (server) await new Promise(resolve => server.close(resolve));
  }
  console.log(JSON.stringify({ passed: checks.length, evidence }));
})().catch(error => { console.error(error); process.exitCode = 1; });
