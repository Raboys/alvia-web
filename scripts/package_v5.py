#!/usr/bin/env python3
"""Package V5 runtime from a Git commit, or explicitly preview uncommitted work."""
import argparse
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path, PurePosixPath
import re
import subprocess
from urllib.parse import unquote, urlsplit

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('destination', type=Path)
parser.add_argument('--ref', default='HEAD')
parser.add_argument('--working-tree', action='store_true',
                    help='Preview local V5 files; manifest has no source commit. Not a release.')
args = parser.parse_args()
repo = Path(__file__).resolve().parents[1]
revision = subprocess.check_output(['git', 'rev-parse', '--verify', f'{args.ref}^{{commit}}'], cwd=repo, text=True).strip()

def source(name):
    if args.working_tree:
        root = (repo / 'v5').resolve()
        path = (root / name).resolve()
        if not path.is_relative_to(root):
            raise ValueError(f'Resource must stay inside V5: {name}')
        return path.read_bytes()
    return subprocess.check_output(['git', 'show', f'{revision}:v5/{name}'], cwd=repo)

files = {}
pending = {'index.html', 'assets/fonts/DM-Sans-LICENSE.txt', 'assets/fonts/Lora-LICENSE.txt'}

def resource(url, parent=''):
    parsed = urlsplit(url)
    if parsed.scheme or parsed.netloc or not parsed.path:
        return
    name = PurePosixPath(parent) / unquote(parsed.path)
    if name.is_absolute() or '..' in name.parts:
        raise ValueError(f'Resource must stay inside V5: {url}')
    if name.suffix.lower() not in {'.html', '.css', '.js', '.webp', '.png', '.jpg', '.mp4', '.svg', '.woff2', '.txt'}:
        raise ValueError(f'Unexpected public resource: {name}')
    pending.add(str(name))

class Resources(HTMLParser):
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ('src', 'href', 'poster'):
            if key in attrs:
                resource(attrs[key])
        if tag == 'meta' and attrs.get('property') == 'og:image':
            image_url = attrs['content']
            prefix = 'https://alvia.ar/v5/'
            if not image_url.startswith(prefix):
                raise ValueError('Sharing image must belong to the V5 release')
            resource(image_url[len(prefix):])

while pending:
    name = pending.pop()
    if name in files:
        continue
    data = source(name)
    files[name] = data
    if name.endswith('.html'):
        Resources().feed(data.decode())
    elif name.endswith('.css'):
        for url in re.findall(r'url\([\s\'"]*([^\)\'"\s]+)', data.decode()):
            resource(url, str(PurePosixPath(name).parent))

args.destination.mkdir(parents=True, exist_ok=False)
for name, data in files.items():
    target = args.destination / name
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_bytes(data)
manifest = {'source_commit': None if args.working_tree else revision, 'public_path': '/v5/', 'files': {name: {'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()} for name, data in sorted(files.items())}}
if args.working_tree:
    manifest.update(source_mode='working-tree-preview', base_commit=revision)
(args.destination / 'release.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(json.dumps({'destination': str(args.destination), 'commit': manifest['source_commit'], 'files': len(files), 'bytes': sum(len(d) for d in files.values())}))
