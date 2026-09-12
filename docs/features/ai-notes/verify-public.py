#!/usr/bin/env python3
"""Verify an Alvia V5 release in origin and Cloudflare without modifying the site."""
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
assert manifest.get('source_commit'), 'Public releases require a source commit'
assert Path('/var/www/alvia.ar/www/v5').resolve() == args.release.resolve()


def digest(data):
    return hashlib.sha256(data).hexdigest()


def curl(domain, path, origin=False, headers=False):
    command = ['curl', '--fail', '--silent', '--show-error', '--max-time', '25']
    if origin:
        command += ['--resolve', f'{domain}:443:127.0.0.1']
    if headers:
        command += ['--head']
    return subprocess.check_output(command + [f'https://{domain}{path}'])


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


report = {'source_commit': manifest['source_commit'], 'release': str(args.release),
          'previous_release': before['previous_release'], 'files': [], 'routing': {}}
# Verify the exact cache-versioned URLs used by the deployed pages. Origin checks
# still compare the unversioned files directly against the commit manifest.
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
for name, entry in manifest['files'].items():
    expected = (args.release / name).read_bytes()
    assert digest(expected) == entry['sha256'] and len(expected) == entry['bytes'], name
    origin = curl('alvia.ar', '/v5/' + name, origin=True)
    assert origin == expected, f'Origin differs: {name}'
    item = {'file': name, 'source_sha256': entry['sha256'], 'origin_exact': True, 'public': {}}
    for domain in ['alvia.ar', 'www.alvia.ar']:
        item['public'][domain] = []
        for request in sorted(requests.get(name, {name})):
            public = curl(domain, '/v5/' + request)
            normalized = normalize_cloudflare(public) if name.endswith('.html') else public
            assert normalized == expected, f'Cloudflare differs beyond email protection: {domain}/{request}'
            item['public'][domain].append({'request': '/v5/' + request, 'raw_sha256': digest(public),
                                           'exact': public == expected, 'normalized_matches': True})
    report['files'].append(item)
for domain in ['alvia.ar', 'www.alvia.ar']:
    for origin in [False, True]:
        served_manifest = json.loads(curl(domain, '/v5/release.json', origin))
        assert served_manifest == manifest, f'Manifest differs: {domain}, origin={origin}'
    for path in ['/', '/v5/', '/v4/']:
        expected = before['routing'][domain + path]
        for origin in [False, True]:
            response = curl(domain, path, origin, headers=True).decode()
            lines = [line.strip() for line in response.splitlines()
                     if line.startswith('HTTP/') or line.lower().startswith('location:')]
            # Protocol negotiation may differ between edge and origin; compare status and destination.
            assert lines[0].split()[1] == expected[0].split()[1], (domain, path, lines)
            assert lines[1:] == expected[1:], (domain, path, lines)
            report['routing'][f'{domain}{path} (origin={origin})'] = lines
report['nginx_unchanged'] = digest(Path('/etc/nginx/sites-available/alvia.ar').read_bytes()) == before['nginx_sha256']
assert report['nginx_unchanged']
report['previous_release_preserved'] = Path(before['previous_release']).is_dir()
assert report['previous_release_preserved']
report['files_count'] = len(report['files'])
report['bytes'] = sum(entry['bytes'] for entry in manifest['files'].values())
args.output.parent.mkdir(parents=True, exist_ok=True)
args.output.write_text(json.dumps(report, indent=2) + '\n')
print(json.dumps({'source_commit': manifest['source_commit'], 'files': report['files_count'],
                  'bytes': report['bytes'], 'origin_and_both_domains_verified': True}))
