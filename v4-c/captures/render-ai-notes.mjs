import { createRequire } from 'node:module';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';
import { createServer } from 'node:http';
import { execFileSync } from 'node:child_process';
const require = createRequire(import.meta.url);
const { build } = require(process.env.ALVIA_ESBUILD || '/home/pablo/dev/telemed-starter/frontend/doctor/node_modules/esbuild');
const { chromium } = require(process.env.ALVIA_PLAYWRIGHT || '/home/pablo/dev/aircraft-sandbox/node_modules/playwright');
const here = dirname(fileURLToPath(import.meta.url));
const doctor = process.env.ALVIA_DOCTOR_SOURCE || '/home/pablo/.t3/worktrees/telemed-starter/t3code-635603e3/frontend/doctor/src';
const deps = process.env.ALVIA_DOCTOR_DEPS || '/home/pablo/dev/telemed-starter/frontend/doctor/node_modules';
const out = await mkdtemp(join(tmpdir(), 'alvia-ai-notes-'));
await build({ entryPoints: [join(here, 'ai-notes.jsx')], outfile: join(out, 'bundle.js'), bundle: true, format: 'iife', jsx: 'automatic', nodePaths: [deps], alias: { '@doctor': doctor, react: join(deps, 'react'), 'react-dom': join(deps, 'react-dom') }, define: { 'process.env.NODE_ENV': '"production"' } });
// Download the product's public fonts once; the capture itself only uses loopback.
const response = await fetch('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
if (!response.ok) throw Error('Unable to load product fonts');
let fontCss = await response.text();
for (const [i, url] of [...new Set([...fontCss.matchAll(/url\((https:[^)]+)\)/g)].map(m => m[1]))].entries()) {
  const font = await fetch(url); if (!font.ok) throw Error('Unable to load font');
  await writeFile(join(out, `font-${i}`), Buffer.from(await font.arrayBuffer()));
  fontCss = fontCss.replaceAll(url, `/font-${i}`);
}
await writeFile(join(out, 'index.html'), `<!doctype html><html lang="es"><meta name="viewport" content="width=device-width,initial-scale=1"><style id="med-fonts">${fontCss}</style><style>html,body{margin:0}#root{background:#f8f6ff;display:flex;flex-direction:column}</style><div id="root"></div><script src="/bundle.js"></script></html>`);
const server = createServer(async (req, res) => {
  const name = new URL(req.url, 'http://localhost').pathname.slice(1) || 'index.html';
  try { if (name.includes('/') || name.includes('..')) throw Error('Bad path'); res.setHeader('Content-Type', name.endsWith('.js') ? 'text/javascript' : name.startsWith('font-') ? 'font/ttf' : 'text/html'); res.end(await readFile(join(out, name))); } catch { res.writeHead(404); res.end(); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
let browser;
try {
  browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
  const page = await browser.newPage({ viewport: { width: 520, height: 700 }, deviceScaleFactor: 2 });
  const errors = []; page.on('pageerror', e => { errors.push(e.message); console.error(e.message); });
  await page.route('**/*', route => route.request().url().startsWith(`http://127.0.0.1:${server.address().port}/`) ? route.continue() : route.abort());
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  await page.getByText('Síntesis lista', { exact: true }).waitFor({ timeout: 10000 }).catch(async error => { console.error(await page.locator('body').innerText()); throw error; });
  await page.evaluate(() => document.fonts.ready);
  const png = resolve(here, '../assets/ai-notes-real.png');
  await page.locator('#root').screenshot({ path: png });
  execFileSync('cwebp', ['-quiet', '-lossless', '-m', '6', png, '-o', png.replace('.png', '.webp')]);
  if (errors.length) throw Error(errors.join('\n'));
  console.log(JSON.stringify({ source: doctor, screenshot: png, bounds: await page.locator('#root').boundingBox(), errors, evidence: out }));
} finally { if (browser) await browser.close(); server.close(); }
