const {chromium}=require(process.env.PLAYWRIGHT_CORE_PATH || '/tmp/claude-1000/-home-pablo/6b65ca94-dc9a-4bd5-8021-578c5b098fc8/scratchpad/copero/node_modules/playwright-core');
const fs=require('fs');
const path=require('path');
const out=process.env.EVIDENCE_DIR || __dirname;
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({executablePath:'/home/pablo/.cache/ms-playwright/chromium-1234/chrome-linux64/chrome',headless:true,args:['--no-sandbox']});
 const page=await browser.newPage(); const failures=[]; const checks=[];
 page.on('pageerror', e=>failures.push(e.message)); page.on('response',r=>{if(r.status()>=400)failures.push(r.status()+' '+r.url());});
 const base=process.env.PREVIEW_URL || 'http://100.71.73.116:18729/elegida/';
 for(const width of [320,360,390,430,768,900,901,1100,1440]){
  await page.setViewportSize({width,height:844});
  for(const file of ['index.html','validaciones.html','ai-notes.html','recetas.html']){
   await page.goto(base+file); await page.evaluate(()=>document.fonts.ready);
   const result=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,links:[...document.querySelectorAll('.product-nav a')].map(a=>({href:a.getAttribute('href'),height:a.getBoundingClientRect().height,width:a.getBoundingClientRect().width})),active:document.querySelector('.product-nav [aria-current=page]')?.getAttribute('href')}));
   if(result.overflow||result.links.length!==3||result.links.some(a=>a.height<44||a.width===0)||(file!=='index.html'&&result.active!==file))failures.push({width,file,...result});
   checks.push({width,file,...result});
  }
 }
 await page.setViewportSize({width:390,height:844}); await page.goto(base);
 await page.locator('.product-nav a[href="ai-notes.html"]').click();
 await page.locator('.product-nav a[href="recetas.html"]').click();
 if(!page.url().endsWith('/recetas.html'))failures.push('Feature navigation failed');
 await page.evaluate(()=>window.scrollTo({top:700,behavior:'instant'}));
 if(Math.abs(await page.locator('.product-header').evaluate(el=>el.getBoundingClientRect().top))>1)failures.push('Sticky header failed');
 await page.goto(base); await page.evaluate(()=>document.fonts.ready);
 await page.mouse.move(0,0); await page.screenshot({path:path.join(out,'mobile.png')});
 await page.setViewportSize({width:1440,height:900});await page.screenshot({path:path.join(out,'desktop.png')});
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:390,height:844}});await nojs.goto(base);await nojs.locator('.product-nav a[href="validaciones.html"]').click();if(!nojs.url().endsWith('/validaciones.html'))failures.push('No-JS navigation failed');
 fs.writeFileSync(path.join(out,'checks.json'),JSON.stringify({checks,failures},null,2));console.log(JSON.stringify({count:checks.length,failures},null,2));await browser.close();if(failures.length)process.exitCode=1;
})().catch(e=>{console.error(e);process.exit(1)});
