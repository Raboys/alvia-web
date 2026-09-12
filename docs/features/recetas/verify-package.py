"""Compare an isolated V5 preview, HTTP responses and its authoring files."""
import argparse
import hashlib
import json
from pathlib import Path
from urllib.request import urlopen

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--runtime', required=True, type=Path)
parser.add_argument('--url', required=True, help='Base URL ending in /v5/')
parser.add_argument('--output', required=True, type=Path)
args = parser.parse_args()
repo = Path(__file__).resolve().parents[3]
manifest = json.loads((args.runtime / 'release.json').read_text())
assert manifest['source_mode'] == 'working-tree-preview'
assert manifest['source_commit'] is None
assert {'recetas.html', 'recetas.css', 'validaciones.html', 'ai-notes.html'} <= manifest['files'].keys()
expected = set(manifest['files']) | {'release.json'}
assert {str(p.relative_to(args.runtime)) for p in args.runtime.rglob('*') if p.is_file()} == expected
checks = []
for name, metadata in manifest['files'].items():
    assert not name.startswith(('docs/', 'captures/')) and not name.endswith(('.md', '.cjs', '.py'))
    local = (args.runtime / name).read_bytes()
    authoring = (repo / 'v5' / name).read_bytes()
    with urlopen(args.url.rstrip('/') + '/' + name, timeout=10) as response:
        assert response.status == 200
        served = response.read()
    assert local == authoring == served, name
    assert len(local) == metadata['bytes'], name
    assert hashlib.sha256(local).hexdigest() == metadata['sha256'], name
    checks.append({'file': name, 'bytes': len(local), 'http': 200, 'sha256_matches': True, 'authoring_matches': True})
with urlopen(args.url.rstrip('/') + '/release.json', timeout=10) as response:
    assert json.load(response) == manifest
result = {'url': args.url, 'source_mode': manifest['source_mode'], 'source_commit': None, 'base_commit': manifest['base_commit'], 'files': len(checks), 'bytes': sum(c['bytes'] for c in checks), 'manifest_matches': True, 'checks': checks}
args.output.parent.mkdir(parents=True, exist_ok=True)
args.output.write_text(json.dumps(result, indent=2) + '\n')
print(json.dumps({key: value for key, value in result.items() if key != 'checks'}))
