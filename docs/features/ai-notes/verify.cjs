/* Authoring verification; excluded from the public package. */
const { chromium } = require(process.env.ALVIA_PLAYWRIGHT || '/home/pablo/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = process.env.ALVIA_V5_URL || 'http://127.0.0.1:8925/v5/';
const evidence = process.env.ALVIA_V5_EVIDENCE || path.join(__dirname, 'review');
fs.mkdirSync(evidence, {recursive:true});
const checks = [];
const check = (name, value) => { assert.ok(value, name); checks.push(name); };
const pageUrl = new URL('ai-notes.html', base).href;
const fits = page => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth);
const screenshot = async (page, name) => {
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({path:path.join(evidence, name), fullPage:true});
};
(async () => {
  const browser = await chromium.launch({headless:true, args:['--no-sandbox']});
  try {
    for (const width of [1440, 1024, 768, 390, 320]) {
      const context = await browser.newContext({viewport:{width, height:900}, permissions:['clipboard-read', 'clipboard-write']});
      const page = await context.newPage();
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('response', r => {if(r.status() >= 400) errors.push(`${r.status()} ${r.url()}`)});
      const response = await page.goto(pageUrl, {waitUntil:'networkidle'});
      check(`${width}: direct entry 200`, response.status() === 200);
      check(`${width}: one descriptive H1`, await page.locator('h1').count() === 1 && (await page.title()).includes('AI Notes'));
      check(`${width}: no overflow`, await fits(page));
      check(`${width}: local fonts loaded`, await page.evaluate(() => document.fonts.check('16px "DM Sans"') && document.fonts.check('54px Lora')));
      check(`${width}: summary readable`, await page.locator('.example-narrative p').evaluateAll(ps => ps.every(p => parseFloat(getComputedStyle(p).fontSize) >= 15 && p.getBoundingClientRect().width > 200)));
      check(`${width}: no empty or missing local anchors`, await page.locator('a[href^="#"]').evaluateAll(as => as.every(a => a.hash.length > 1 && document.getElementById(a.hash.slice(1)))));
      check(`${width}: synthetic example identified`, (await page.locator('#summary-caption').innerText()).includes('ficticios'));
      check(`${width}: automated summary and physician review`, (await page.locator('.summary-patient').innerText()).includes('Resumen automático') && (await page.locator('.notes-review').innerText()).includes('completa y firma'));
      check(`${width}: incoming studies from both channels`, (await page.locator('.studies-inbox').innerText()).includes('Recibido por email') && (await page.locator('.studies-inbox').innerText()).includes('Recibido por WhatsApp'));
      check(`${width}: consistent synthetic patient`, (await page.locator('.summary-patient strong').innerText()) === (await page.locator('.inbox-heading > span').innerText()));
      check(`${width}: contextual commercial CTA`, await page.locator('.notes-closing a[href*="wa.me"]').evaluate(a => new URL(a.href).searchParams.get('text').includes('AI Notes')));
      const deployment = new URL(base);
      const publicSite = ['alvia.ar', 'www.alvia.ar'].includes(deployment.hostname);
      check(`${width}: only runtime or known hosting resources, no product calls`,
        (await page.evaluate(() => performance.getEntriesByType('resource').map(r => r.name))).every(name => {
          const url = new URL(name);
          if (url.origin === deployment.origin && url.pathname.startsWith('/v5/')) return true;
          if (!publicSite) return false;
          return (url.origin === deployment.origin &&
            (url.pathname === '/cdn-cgi/rum' || /^\/cdn-cgi\/scripts\/[a-f0-9]+\/cloudflare-static\/email-decode\.min\.js$/.test(url.pathname))) ||
            (url.origin === 'https://static.cloudflareinsights.com' && url.pathname.startsWith('/beacon.min.js/'));
        }));
      await screenshot(page, `${width}-full.png`);
      if (width === 1440 || width === 390) await page.screenshot({path:path.join(evidence, `${width}-hero.png`)});
      const conditions = page.locator('.notes-conditions summary');
      await conditions.focus();
      await page.keyboard.press('Enter');
      check(`${width}: conditions open by keyboard`, await page.locator('.notes-conditions details').evaluate(el => el.open));
      check(`${width}: consent and terminal stop explained`, (await page.locator('.notes-conditions p').innerText()).includes('consentimiento expreso') && (await page.locator('.notes-conditions p').innerText()).includes('no vuelve a iniciarse'));
      check(`${width}: expanded conditions fit`, await fits(page));
      if(width === 390) await screenshot(page, '390-conditions.png');
      await page.keyboard.press('Enter');
      check(`${width}: conditions close by keyboard`, await page.locator('.notes-conditions details').evaluate(el => !el.open));
      const copy = page.locator('.copy-example');
      await copy.focus();
      check(`${width}: visible keyboard focus`, await copy.evaluate(el => getComputedStyle(el).outlineStyle !== 'none'));
      await page.keyboard.press('Enter');
      await page.waitForFunction(() => document.querySelector('.copy-feedback').textContent.includes('copiado'));
      const expected = await page.locator('#example-narrative p').evaluateAll(ps => ps.map(p=>p.textContent.trim()).join('\n\n'));
      check(`${width}: exact narrative copied`, await page.evaluate(() => navigator.clipboard.readText()) === expected);
      if (width <= 900) {
        const menu = page.locator('.menu-toggle');
        await menu.focus();
        await page.keyboard.press('Enter');
        check(`${width}: menu opens by keyboard`, await menu.getAttribute('aria-expanded') === 'true' && await page.locator('#main-nav').isVisible());
        await page.keyboard.press('Escape');
        check(`${width}: escape restores menu focus`, await menu.getAttribute('aria-expanded') === 'false' && await menu.evaluate(el => el === document.activeElement));
      }
      await page.locator('.footer a[href="index.html#funcionalidades"]').click();
      await page.waitForURL(new URL('index.html#funcionalidades', base).href);
      check(`${width}: return to home features`, await page.locator('#funcionalidades').isVisible());
      check(`${width}: completed features linked`, await page.locator('.feature-entry a').count() === 2 && await page.locator('[data-feature="ai-notes"] a').getAttribute('href') === 'ai-notes.html' && await page.locator('[data-feature="validaciones"] a').getAttribute('href') === 'validaciones.html');
      check(`${width}: Recetas stays informative`, await page.locator('[data-feature="recetas"]').evaluate(el => !el.querySelector('a,button,[tabindex]')));
      if(width === 1440 || width === 390) await page.locator('#funcionalidades').screenshot({path:path.join(evidence,`${width}-home-features.png`)});
      await page.locator('[data-feature="ai-notes"] a').click();
      await page.waitForURL(pageUrl);
      check(`${width}: home entry works`, await page.locator('h1').isVisible());
      check(`${width}: no browser or resource errors`, errors.length === 0);
      await context.close();
    }
    const context = await browser.newContext({viewport:{width:390,height:844}});
    const page = await context.newPage();
    await page.goto(pageUrl);
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', {configurable:true, value:{writeText:async()=>{throw new DOMException('Denied', 'NotAllowedError')}}}));
    await page.locator('.copy-example').click();
    await page.waitForFunction(() => document.querySelector('.copy-feedback').textContent.includes('No se pudo'));
    check('denied clipboard: honest failure', !(await page.locator('.copy-feedback').innerText()).includes('copiado'));
    check('denied clipboard: entire narrative selected', await page.evaluate(() => getSelection().toString().includes('Sofía consulta') && getSelection().toString().includes('continuar el seguimiento.')));
    check('denied clipboard: readable and focus retained', await fits(page) && await page.locator('#example-narrative').evaluate(el => el === document.activeElement));
    await screenshot(page, '390-copy-fallback.png');
    await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', {configurable:true, value:undefined}));
    await page.locator('.copy-example').click();
    check('HTTP without Clipboard API: manual fallback', (await page.locator('.copy-feedback').innerText()).includes('Seleccionamos el resumen'));
    await context.close();

    for(const width of [1440, 390, 320]) {
      const context = await browser.newContext({javaScriptEnabled:false,viewport:{width,height:900}});
      const page = await context.newPage();
      await page.goto(pageUrl);
      check(`${width} without JS: summary visible`, await page.locator('#example-narrative').isVisible());
      check(`${width} without JS: copy hidden`, !await page.locator('.copy-example').isVisible());
      check(`${width} without JS: navigation visible`, await page.locator('#main-nav').isVisible());
      await page.locator('.notes-conditions summary').click();
      check(`${width} without JS: native disclosure works`, await page.locator('.notes-conditions p').isVisible());
      check(`${width} without JS: studies visible`, await page.locator('.studies-inbox').isVisible());
      check(`${width} without JS: no overflow`, await fits(page));
      if(width === 390) await screenshot(page,'390-no-js.png');
      await context.close();
    }
    const reduced = await browser.newPage({reducedMotion:'reduce',viewport:{width:390,height:844}});
    await reduced.goto(pageUrl);
    check('reduced motion: no smooth scrolling', await reduced.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === 'auto'));
    check('reduced motion: no animations', await reduced.evaluate(() => [...document.querySelectorAll('*')].every(el => getComputedStyle(el).animationName === 'none')));
    await reduced.close();
    const zoom = await browser.newPage({viewport:{width:1440,height:900}});
    await zoom.goto(pageUrl);
    // A 1440px window at 200% zoom exposes a 720 CSS px viewport.
    await zoom.setViewportSize({width:720,height:450});
    check('200% zoom equivalent: no overflow', await fits(zoom));
    await zoom.addStyleTag({content:'.notes-page { font-size: 200%; } .notes-page p, .notes-page dd { font-size: 1em; }'});
    check('long text / enlarged reading text: no overflow', await fits(zoom));
    check('long text / enlarged reading text: no clipping', await zoom.locator('.example-narrative').evaluate(el=>el.scrollHeight<=el.clientHeight));
    await screenshot(zoom,'720-enlarged-text.png');
    await zoom.close();
    fs.writeFileSync(path.join(evidence,'browser-checks.json'), JSON.stringify({url:pageUrl, passed:checks.length, checks},null,2)+'\n');
    console.log(JSON.stringify({url:pageUrl,passed:checks.length,evidence}));
  } finally { await browser.close(); }
})().catch(error=>{console.error(error);process.exitCode=1});
