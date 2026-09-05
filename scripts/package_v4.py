#!/usr/bin/env python3
"""Package V4-C from an exact Git revision, including only public runtime files."""
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
args = parser.parse_args()
repo = Path(__file__).resolve().parents[1]
revision = subprocess.check_output(['git', 'rev-parse', '--verify', f'{args.ref}^{{commit}}'], cwd=repo, text=True).strip()

def source(name):
    return subprocess.check_output(['git', 'show', f'{revision}:v4-c/{name}'], cwd=repo)

files = {}
pending = {'index.html'}

def resource(url, parent=''):
    parsed = urlsplit(url)
    if parsed.scheme or parsed.netloc or not parsed.path:
        return
    name = PurePosixPath(parent) / unquote(parsed.path)
    if name.is_absolute() or '..' in name.parts:
        raise ValueError(f'Resource must stay inside V4: {url}')
    if name.suffix.lower() not in {'.html', '.css', '.js', '.webp', '.png', '.jpg', '.mp4', '.svg', '.woff2'}:
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
            prefix = 'https://alvia.ar/v4/'
            if not image_url.startswith(prefix):
                raise ValueError('Sharing image must belong to the V4 release')
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
manifest = {'source_commit': revision, 'public_path': '/v4/', 'files': {name: {'bytes': len(data), 'sha256': hashlib.sha256(data).hexdigest()} for name, data in sorted(files.items())}}
(args.destination / 'release.json').write_text(json.dumps(manifest, indent=2) + '\n')
print(json.dumps({'destination': str(args.destination), 'commit': revision, 'files': len(files), 'bytes': sum(len(d) for d in files.values())}))
