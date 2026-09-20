#!/usr/bin/env python3
"""Verify a root-route Alvia release at origin and both public domains, read-only."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess
from html.parser import HTMLParser
from urllib.parse import urlsplit

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--release', required=True, type=Path)
parser.add_argument('--before', required=True, type=Path)
parser.add_argument('--output', required=True, type=Path)
args = parser.parse_args()
manifest = json.loads((args.release / 'release.json').read_text())
before = json.loads(args.before.read_text())
assert manifest.get('source_commit') and manifest['public_path'] == '/'
assert Path('/var/www/alvia.ar/www/v5').resolve() == args.release.resolve()


def digest(data):
    return hashlib.sha256(data).hexdigest()


def curl(domain, resource, origin=False, headers=False):
    command = ['curl', '--fail', '--silent', '--show-error', '--max-time', '25']
    if origin:
        command += ['--resolve', f'{domain}:443:127.0.0.1']
    if headers:
        command += ['--head']
    return subprocess.check_output(command + [f'https://{domain}{resource}'])


def decode_mail(encoded):
    payload = bytes.fromhex(encoded)
    return bytes(byte ^ payload[0] for byte in payload[1:]).decode('utf-8')


def normalize_cloudflare(data):
    text = data.decode('utf-8')
    text = re.sub(r'href="/cdn-cgi/l/email-protection#([0-9a-f]+)"',
                  lambda m: 'href="mailto:' + decode_mail(m[1]) + '"', text)
    text = re.sub(r'<span class="__cf_email__" data-cfemail="([0-9a-f]+)">.*?</span>',
                  lambda m: decode_mail(m[1]), text)
    text = re.sub(r'<script data-cfasync="false" src="/cdn-cgi/scripts/[0-9a-f]+/cloudflare-static/email-decode.min.js"></script>', '', text)
    return text.encode('utf-8')


requests = {}
class References(HTMLParser):
    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key not in ('src', 'href') or not value:
                continue
            url = urlsplit(value)
            if not url.scheme and not url.netloc and url.path:
                requests.setdefault(url.path, set()).add(url.path + ('?' + url.query if url.query else ''))

for name in manifest['files']:
    if name.endswith('.html'):
        References().feed((args.release / name).read_text())
routes = {'index.html': '/', 'validaciones.html': '/validaciones', 'ai-notes.html': '/ainotes',
          'recetas.html': '/recetas', 'turnos-inteligentes.html': '/turnos-inteligentes'}
report = {'source_commit': manifest['source_commit'], 'release': str(args.release),
          'previous_release': before['previous_release'], 'files': [], 'routing': {}}
for name, entry in manifest['files'].items():
    expected = (args.release / name).read_bytes()
    assert digest(expected) == entry['sha256'] and len(expected) == entry['bytes'], name
    request = routes.get(name, '/' + name)
    assert curl('alvia.ar', request, origin=True) == expected, f'Origin differs: {name}'
    item = {'file': name, 'sha256': entry['sha256'], 'origin_exact': True, 'public': {}}
    urls = {routes[name]} if name in routes else {'/' + r.lstrip('/') for r in requests.get(name, {name})}
    for domain in ['alvia.ar', 'www.alvia.ar']:
        for resource in sorted(urls):
            data = curl(domain, resource)
            normalized = normalize_cloudflare(data) if name.endswith('.html') else data
            assert normalized == expected, f'Public content differs: {domain}{resource}'
        item['public'][domain] = {'urls': sorted(urls), 'matches': True}
    report['files'].append(item)
for domain in ['alvia.ar', 'www.alvia.ar']:
    for origin in [False, True]:
        assert json.loads(curl(domain, '/release.json', origin)) == manifest
    for old, current in [('/v5/', '/'), ('/v5/validaciones.html', '/validaciones'),
                         ('/validaciones.html', '/validaciones'), ('/validaciones/', '/validaciones')]:
        header = curl(domain, old, headers=True).decode()
        status = next(line for line in header.splitlines() if line.startswith('HTTP/')).split()[1]
        target = next(line.split(':', 1)[1].strip() for line in header.splitlines() if line.lower().startswith('location:'))
        assert status == '301' and target == 'https://alvia.ar' + current
        report['routing'][domain + old] = {'status': int(status), 'location': target}
report['nginx_unchanged'] = digest(Path('/etc/nginx/sites-available/alvia.ar').read_bytes()) == before['nginx_sha256']
report['previous_release_preserved'] = Path(before['previous_release']).is_dir()
assert report['nginx_unchanged'] and report['previous_release_preserved']
report['files_count'] = len(report['files'])
report['bytes'] = sum(v['bytes'] for v in manifest['files'].values())
args.output.parent.mkdir(parents=True, exist_ok=True)
args.output.write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({'source_commit': manifest['source_commit'], 'files': report['files_count'],
                  'bytes': report['bytes'], 'origin_and_both_domains_verified': True}))
