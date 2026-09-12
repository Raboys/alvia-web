const {chromium}=require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/claude-1000/-home-pablo/6b65ca94-dc9a-4bd5-8021-578c5b098fc8/scratchpad/copero/node_modules/playwright-core');
const fs=require('node:fs');
const path=require('node:path');
const base=process.env.PREVIEW_URL || 'http://100.71.73.116:18729/elegida/';
const out=process.env.EVIDENCE_DIR || path.join(__dirname,'local');
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH || '/home/pablo/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',headless:true,args:['--no-sandbox']});
 const page=await browser.newPage();const failures=[];const checks=[];
 page.on('pageerror',e=>failures.push(e.message));page.on('response',r=>{if(r.status()>=400)failures.push(`${r.status()} ${r.url()}`)});
 const check=(condition,label)=>{checks.push({label,ok:Boolean(condition)});if(!condition)failures.push(label)};
 for(const width of [320,390,768,900,901,1440]){
  await page.setViewportSize({width,height:844});
  for(const file of ['index.html','validaciones.html','ai-notes.html','recetas.html']){
   await page.goto(base+file);await page.evaluate(()=>document.fonts.ready);
   const mobile=width<=900;
   const menu=page.locator('.product-menu');const summary=menu.locator('summary');
   check(await summary.isVisible()===mobile,`${width}/${file}: correct navigation for viewport`);
   if(mobile){
    check(!(await menu.getAttribute('open')!==null),`${width}/${file}: starts closed`);
    check(!(await page.locator('.product-menu-links a').first().isVisible()),`${width}/${file}: closed links hidden`);
    check((await summary.innerText()).includes('Validaciones · AI Notes · Recetas'),`${width}/${file}: names discoverable`);
    await summary.click();check(await menu.getAttribute('open')!==null,`${width}/${file}: opens on tap`);
   }
   const nav=mobile?'.product-menu-links':'.product-nav';
   const state=await page.locator(nav).evaluate(el=>({active:el.querySelector('[aria-current=page]')?.getAttribute('href'),links:[...el.querySelectorAll('a')].map(a=>({href:a.getAttribute('href'),height:a.getBoundingClientRect().height,visible:a.checkVisibility()}))}));
   check(state.links.length===3&&state.links.every(a=>a.visible&&a.height>=44),`${width}/${file}: three usable links`);
   check(file==='index.html'?!state.active:state.active===file,`${width}/${file}: active feature`);
   check(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}/${file}: no overflow`);
   if(mobile){
    await page.keyboard.press('Escape');check(await menu.getAttribute('open')===null&&await summary.evaluate(el=>el===document.activeElement),`${width}/${file}: Escape closes and restores focus`);
   }
  }
 }
 await page.setViewportSize({width:390,height:844});await page.goto(base);
 const menu=page.locator('.product-menu');const summary=menu.locator('summary');
 await summary.focus();await page.keyboard.press('Enter');check(await menu.getAttribute('open')!==null,'Keyboard opens menu');
 await page.keyboard.press('Tab');check(await page.locator('.product-menu-links a').first().evaluate(el=>el===document.activeElement),'Tab reaches first feature');
 await page.keyboard.press('Enter');await page.waitForURL('**/validaciones.html');check(page.url().endsWith('/validaciones.html'),'Keyboard navigates to Validaciones');
 await summary.click();await page.locator('.product-menu-links a[href="ai-notes.html"]').click();check(page.url().endsWith('/ai-notes.html'),'Mobile navigates to AI Notes');
 await summary.click();await page.locator('.product-menu-links a[href="recetas.html"]').click();check(page.url().endsWith('/recetas.html'),'Mobile navigates to Recetas');
 await page.goto(base);await summary.click();await page.locator('.product-header .wordmark').focus();check(await menu.getAttribute('open')===null,'Focus outside closes menu');
 await summary.click();await page.mouse.click(2,220);check(await menu.getAttribute('open')===null,'Outside click closes menu');
 await summary.click();await page.setViewportSize({width:1440,height:900});await page.waitForTimeout(50);check(await menu.getAttribute('open')===null,'Resize closes menu');
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>window.scrollTo({top:650,behavior:'instant'}));
 check(Math.abs(await page.locator('.product-header').evaluate(el=>el.getBoundingClientRect().top))<1,'Header stays sticky');
 await summary.click();check(await page.locator('.product-menu-panel').evaluate(el=>el.getBoundingClientRect().bottom<=innerHeight),'Open panel fits scrolled viewport');
 await page.setViewportSize({width:844,height:390});await page.goto(base);await summary.click();
 check(await page.locator('.product-menu-panel').evaluate(el=>el.getBoundingClientRect().bottom<=innerHeight),'Landscape panel fits viewport');
 await page.locator('.product-menu-links a[href="recetas.html"]').click();check(page.url().endsWith('/recetas.html'),'Landscape can reach last feature');
 await page.setViewportSize({width:390,height:844});await page.goto(base);await page.evaluate(()=>document.fonts.ready);await page.mouse.move(0,0);
 await page.screenshot({path:path.join(out,'mobile-closed.png')});await summary.click();await page.screenshot({path:path.join(out,'mobile-open.png')});
 await page.setViewportSize({width:1440,height:900});await page.goto(base);await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:path.join(out,'desktop.png')});
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.goto(base);await nojs.locator('.product-menu summary').click();await nojs.locator('.product-menu-links a[href="recetas.html"]').click();check(nojs.url().endsWith('/recetas.html'),'No-JS menu and navigation work');
 fs.writeFileSync(path.join(out,'checks.json'),JSON.stringify({base,checks,failures},null,2));console.log(JSON.stringify({checks:checks.length,failures},null,2));await browser.close();if(failures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
