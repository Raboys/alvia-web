# Tres funcionalidades · ilustraciones nuevas · 2026-09-20 UTC

Pablo aprobó las previews corregidas: textos anteriores e ilustraciones nuevas, y pidió deploy
para AI Notes, Recetas y Turnos inteligentes. [Decisiones y evidencia](../design/three-feature-illustrations/README.md).

Integración sobre `fb4af28`. Paquete generado desde Git. Release previo a conservar:
`/var/www/alvia.ar/releases/v5-a47eb69`. Activación mediante reemplazo atómico del enlace
`/var/www/alvia.ar/www/v5`, sin cambiar Nginx ni servicios del producto.

## Publicación verificada

- PR #34: https://github.com/Raboys/alvia-web/pull/34
- Runtime: `c1cfb07e8df6e4b78a3c1303a82cd242a414f94e`.
- Activación: `2026-09-20T04:52:01.686134+00:00`.
- Release: `/var/www/alvia.ar/releases/v5-c1cfb07`.
- 28 archivos, 544.919 bytes, más manifiesto. El paquete del commit coincide byte por byte
  con el runtime revisado antes de publicar.
- HTML/CSS de las tres páginas y tres SVG nuevos. `recetas-mocks.css` deja de ser necesario
  en el paquete; su fuente histórica permanece en el repositorio.
- Home, Validaciones, JS, fuentes y demás archivos compartidos conservan sus hashes.
- Los 28 archivos y el manifiesto coinciden en origen y ambos dominios. En HTML se normaliza
  únicamente la protección conocida del correo de Cloudflare. Se verificaron las URLs
  versionadas reales del CSS y las redirecciones históricas.
- Nginx sin cambios y release anterior conservado.

[Activación](../design/three-feature-illustrations/public/deployment.json),
[manifiesto](../design/three-feature-illustrations/public/release.json),
[HTTP/SHA-256](../design/three-feature-illustrations/public/http-checks.json).

## Navegador

127 checks del paquete integrado y 127 de regresión de Validaciones antes de publicar.
Las tres páginas pasaron 127 comprobaciones públicas en cada dominio:
[alvia.ar](../design/three-feature-illustrations/public/apex/browser-checks.json) y
[www](../design/three-feature-illustrations/public/www/browser-checks.json).
Incluyen cinco anchos, copy anterior, SVG/fuentes, axe desktop/móvil, teclado, menú/Escape,
copia y fallback, sin JS, texto ampliado, home y Validaciones.

## Rollback

Revertir sólo si el enlace aún apunta al release de esta entrega. Si hubo otra publicación,
revisarla antes de proceder. El anterior se conserva íntegro.

```sh
sudo python3 - <<'PYCODE'
from pathlib import Path
import os
link = Path('/var/www/alvia.ar/www/v5')
previous = Path('/var/www/alvia.ar/releases/v5-a47eb69')
assert link.is_symlink() and link.resolve() == Path('/var/www/alvia.ar/releases/v5-c1cfb07')
assert previous.is_dir()
temporary = link.with_name('v5.rollback-three-features.next')
assert not temporary.exists() and not temporary.is_symlink()
os.symlink(previous, temporary)
os.replace(temporary, link)
PYCODE
```

Verificar después las tres páginas, Validaciones, home y `/release.json` en ambos dominios.
