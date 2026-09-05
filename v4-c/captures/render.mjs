import { createRequire } from 'node:module';
import { readFile, writeFile, mkdtemp, copyFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { execFileSync } from 'node:child_process';

const require = createRequire(import.meta.url);
const { build } = require(process.env.ALVIA_ESBUILD || '/home/pablo/dev/telemed-starter/frontend/doctor/node_modules/esbuild');
const { chromium } = require(process.env.ALVIA_PLAYWRIGHT || '/home/pablo/dev/aircraft-sandbox/node_modules/playwright');
const here = dirname(fileURLToPath(import.meta.url));
const app = process.env.ALVIA_APP_SOURCE || '/home/pablo/.t3/worktrees/telemed-starter/t3code-635603e3/app';
const deps = process.env.ALVIA_APP_DEPS || '/home/pablo/dev/telemed-starter/app/node_modules';
const out = await mkdtemp(join(tmpdir(), 'alvia-real-screens-'));
const assets = resolve(here, '../assets');
await mkdir(assets, { recursive: true });
await copyFile(resolve(here, '../../v3/assets/verificacion-identidad-kyc.mp4'), join(out, 'camera.mp4'));
const ui = ['Button', 'Card', 'Icon', 'Input', 'Mascot', 'NavBar', 'Screen', 'SectionLabel', 'Text', 'Avatar', 'Badge', 'DocAvatar', 'IconButton', 'TabBar'];
await build({
  entryPoints: [join(here, 'entry.tsx')], outfile: join(out, 'bundle.js'), bundle: true, format: 'iife', jsx: 'automatic',
  nodePaths: [deps], mainFields: ['browser', 'module', 'main'], tsconfigRaw: { compilerOptions: { jsx: 'react-jsx' } },
  resolveExtensions: ['.web.tsx', '.web.ts', '.web.js', '.tsx', '.ts', '.js', '.json'],
  define: { 'process.env.NODE_ENV': '"production"', __DEV__: 'false', global: 'globalThis' },
  alias: { 'react-native': join(deps, 'react-native-web'), 'react-native-svg': join(deps, 'react-native-svg/lib/module/ReactNativeSVG.web.js') },
  plugins: [{ name: 'capture-boundaries', setup(b) {
    b.onResolve({ filter: /^expo-camera$/ }, () => ({ path: join(here, 'camera.tsx') }));
    b.onResolve({ filter: /^expo-router$/ }, () => ({ path: 'router', namespace: 'fixture' }));
    b.onResolve({ filter: /^@\/lib\/api$/ }, () => ({ path: join(here, 'fixtures.ts') }));
    b.onResolve({ filter: /^@\/lib\/session$/ }, () => ({ path: 'session', namespace: 'fixture' }));
    b.onResolve({ filter: /^@\/components\/ui$/ }, () => ({ path: 'ui', namespace: 'fixture' }));
    b.onResolve({ filter: /^@\// }, args => b.resolve(join(app, 'src', args.path.slice(2)), { kind: args.kind, resolveDir: app }));
    b.onLoad({ filter: /^ui$/, namespace: 'fixture' }, () => ({ contents: ui.map(n => `export {${n}} from '@/components/ui/${n}';`).join('\n') + '\nexport {Breath} from "@/components/ui/motion";', loader: 'ts', resolveDir: here }));
    b.onLoad({ filter: /^router$/, namespace: 'fixture' }, () => ({ contents: 'const disabled=()=>{throw Error("Navigation is disabled in capture")};export const router={back:disabled,push:disabled,replace:disabled};export const Redirect=disabled;export const usePathname=()=>"/";', loader: 'js' }));
    b.onLoad({ filter: /^session$/, namespace: 'fixture' }, () => ({ contents: 'export const useSession=()=>({token:"capture-only"});', loader: 'js' }));
  } }],
});
let fontCss = '';
for (const [folder, family] of [['400Regular', 'PlusJakartaSans_400Regular'], ['500Medium', 'PlusJakartaSans_500Medium'], ['600SemiBold', 'PlusJakartaSans_600SemiBold'], ['700Bold', 'PlusJakartaSans_700Bold'], ['800ExtraBold', 'PlusJakartaSans_800ExtraBold']]) {
  await copyFile(join(deps, '@expo-google-fonts/plus-jakarta-sans', folder, `${family}.ttf`), join(out, `${family}.ttf`));
  fontCss += `@font-face{font-family:'${family}';src:url('/${family}.ttf')}`;
}
await writeFile(join(out, 'app.html'), `<!doctype html><html lang="es"><meta name="viewport" content="width=device-width,initial-scale=1"><style>${fontCss}html,body,#root{margin:0;width:100%;height:100%;overflow:hidden}#root{display:flex;flex-direction:column}body{background:#f6f8fc}</style><div id="root"></div><script src="/bundle.js"></script></html>`);
await copyFile(join(here, 'device.html'), join(out, 'index.html'));
const server = createServer(async (req, res) => {
  const path = new URL(req.url, 'http://localhost').pathname;
  try {
    const name = path === '/' ? 'index.html' : path.slice(1);
    if (name.includes('/') || name.includes('..')) throw Error('Bad path');
    const types = { html: 'text/html', js: 'text/javascript', ttf: 'font/ttf', mp4: 'video/mp4' };
    res.setHeader('Content-Type', types[name.split('.').pop()] || 'application/octet-stream');
    res.end(await readFile(join(out, name)));
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
let browser;
try {
  browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, reducedMotion: 'reduce', timezoneId: 'America/Argentina/Buenos_Aires' });
  await context.addInitScript(() => {
    const OriginalDate = Date;
    window.Date = class extends OriginalDate {
      constructor(...args) { super(...(args.length ? args : ['2026-09-04T12:41:00Z'])); }
      static now() { return new OriginalDate('2026-09-04T12:41:00Z').getTime(); }
    };
  });
  const page = await context.newPage(); const errors = [];
  page.on('pageerror', e => { errors.push(e.message); console.error(e.message); });
  await page.route('**/*', route => route.request().url().startsWith(`http://127.0.0.1:${server.address().port}/`) ? route.continue() : route.abort());
  const appFrame = page.frameLocator('iframe');
  const captureScreens = [
    ['home', 'Sofía Giménez', 'app-inicio-real.png'],
    ['authorization', 'Código de autorización', 'app-autorizacion-real.png'],
    ['copay', 'Copago de la consulta', 'app-copago-real.png'],
    ['prescriptions', 'Faringitis aguda · Dra. Carla Méndez', 'app-recetas-real.png'],
  ];
  for (const [screen, ready, filename] of captureScreens) {
    await page.goto(`http://127.0.0.1:${server.address().port}/?screen=${screen}`);
    await appFrame.getByText(ready, { exact: true }).last().waitFor();
    await appFrame.locator('body').evaluate(() => document.fonts.ready); await page.waitForTimeout(600);
    if (screen === 'authorization') await appFrame.locator('input').fill('62');
    if (screen === 'authorization' || screen === 'copay') await appFrame.getByText(ready, { exact: true }).last().click();
    await page.screenshot({ path: join(assets, filename) });
    if (errors.length) throw Error(errors.join('\n'));
  }
  // Record the actual OTP component: four typed digits, confirmation and completed row.
  await page.goto(`http://127.0.0.1:${server.address().port}/?screen=authorization`);
  await appFrame.getByText('Código de autorización', { exact: true }).last().waitFor();
  await appFrame.locator('body').evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  const authFrames = join(out, 'authorization'); await mkdir(authFrames);
  const sequence = [];
  for (let i = 0; i <= 4; i++) {
    await appFrame.locator('input').fill('6284'.slice(0, i));
    await page.waitForTimeout(80);
    const filename = join(authFrames, `${i}.png`);
    await page.screenshot({ path: filename, scale: 'css' });
    sequence.push(`file '${filename}'\nduration ${i === 0 ? 1 : i === 4 ? 0.9 : 0.65}`);
  }
  await appFrame.getByRole('button', { name: 'Confirmar y continuar', exact: true }).click();
  await appFrame.getByText('Código ingresado', { exact: true }).waitFor();
  await page.evaluate(() => { document.documentElement.className = ''; document.body.className = ''; });
  await page.waitForTimeout(400);
  const successFrame = join(authFrames, 'success.png');
  await page.screenshot({ path: successFrame, scale: 'css' });
  sequence.push(`file '${successFrame}'\nduration 2.2`, `file '${successFrame}'`);
  const concat = join(authFrames, 'sequence.txt'); await writeFile(concat, sequence.join('\n'));
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', concat, '-vf', 'fps=15', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', join(assets, 'app-autorizacion-real.mp4')]);
  await page.goto(`http://127.0.0.1:${server.address().port}/?screen=identity`);
  await appFrame.getByText('Antes de empezar', { exact: true }).waitFor();
  await appFrame.getByRole('button', { name: 'Estoy listo', exact: true }).click();
  await page.waitForFunction(() => { const v = document.querySelector('iframe').contentDocument.querySelector('video'); return v && v.readyState >= 2 && v.videoWidth > 0; });
  await appFrame.locator('body').evaluate(() => { const source = window.__captureCameraSource; source.pause(); source.currentTime = 0.4; });
  await page.waitForTimeout(250);
  await page.screenshot({ path: join(assets, 'app-identidad-real.png') });
  await appFrame.locator('body').evaluate(() => window.__captureCameraSource.play());
  if (errors.length) throw Error(errors.join('\n'));
  // Record a second, already-mounted page segment by using a fixed screenshot sequence
  // from the live component; no HTML overlays or resized sub-elements are introduced.
  const frames = join(out, 'frames'); await mkdir(frames);
  for (let i = 0; i < 60; i++) {
    await page.screenshot({ path: join(frames, `${String(i).padStart(3, '0')}.png`), scale: 'css' });
    await page.waitForTimeout(50);
  }
  if (errors.length) throw Error(errors.join('\n'));
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-framerate', '15', '-i', join(frames, '%03d.png'), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', join(assets, 'app-identidad-real.mp4')]);
  execFileSync(process.execPath, [join(here, 'optimize.mjs')], { stdio: 'inherit' });
  console.log(JSON.stringify({ app, viewport: '390x844', contentViewport: '390x766', statusBar: 44, homeIndicator: 34, dpr: 2, assets: [...captureScreens.map(x => x[2]), 'app-identidad-real.png', 'app-identidad-real.mp4', 'app-autorizacion-real.mp4'], errors, evidence: out }));
  await context.close();
} finally { if (browser) await browser.close(); server.close(); }
