import { execFileSync } from 'node:child_process';
import { readdir, stat } from 'node:fs/promises';
import { dirname, resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const assets = resolve(dirname(fileURLToPath(import.meta.url)), '../assets');
for (const name of (await readdir(assets)).filter(name => /^app-.*-real\.png$/.test(name) || name === 'videoconsulta.png')) {
  const source = join(assets, name);
  const output = source.replace(/\.png$/, '.webp');
  // Preserve UI pixels exactly. Only photographic content uses lossy encoding.
  const options = /identidad|videoconsulta/.test(name) ? ['-q', '85', '-sharp_yuv'] : ['-lossless', '-m', '6'];
  execFileSync('cwebp', ['-quiet', ...options, source, '-o', output]);
  console.log(`${name}: ${(await stat(source)).size} → ${(await stat(output)).size} bytes`);
}
