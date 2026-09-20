# Validaciones · A refinada · 2026-09-20 UTC

Pablo eligió **A refinada**, pidió documentación y publicación, y reiteró expresamente la elección.
[Decisión visual y criterios para próximas páginas](../design/validaciones-astra-a/README.md).

Fuente: `v5/validaciones.html`, `validaciones.css`, `assets/validaciones-identidad.svg`.
Ruta canónica: <https://alvia.ar/validaciones>. La integración copia exactamente el `main`,
CSS y SVG de la variante A, adaptando sólo la ruta del asset y los metadatos/navegación del sitio.

Se publica como paquete de un commit integrado en `main`, con reemplazo atómico del enlace
`/var/www/alvia.ar/www/v5`. Se conserva el release anterior `/var/www/alvia.ar/releases/v5-4239034`.
No requiere cambios de Nginx ni del producto telemed.

## Publicación verificada

- [PR #32](https://github.com/Raboys/alvia-web/pull/32), integrado en `main`.
- Runtime: `a47eb691a646de5d42946cc830af107795577416`.
- Activación atómica: `2026-09-20T04:05:50.092705+00:00`.
- Release: `/var/www/alvia.ar/releases/v5-a47eb69`.
- Release anterior conservado: `/var/www/alvia.ar/releases/v5-4239034`.
- Paquete de Git: 26 archivos, 549.120 bytes, más manifiesto. Idéntico byte por byte al
  paquete aprobado de A refinada que pasó 127 comprobaciones.
- Cambios de runtime: sólo `validaciones.html`, `validaciones.css` y el nuevo
  `assets/validaciones-identidad.svg`. Los otros 23 archivos conservan sus hashes.
- CSS público versionado: `validaciones.css?v=20260920-astra-a`.
- Los 26 archivos y el manifiesto coinciden en origen, `alvia.ar` y `www.alvia.ar`.
  En HTML se normaliza únicamente la protección conocida de correo de Cloudflare.
- URLs antiguas de Validaciones y `/v5/` conservan los 301 canónicos.
- Nginx conserva SHA-256 `fb9f8a44a36571554214f789598bc00a393183bcecc0dfee4da5e39fe1fc6a76`.
  No se reiniciaron servicios ni se cambió configuración o backend.

[Estado previo](../design/validaciones-astra-a/public/before-deploy.json),
[activación](../design/validaciones-astra-a/public/deployment.json),
[manifiesto servido](../design/validaciones-astra-a/public/release.json) y
[verificación HTTP/SHA-256](../design/validaciones-astra-a/public/http-checks.json).

## Navegador público

127 comprobaciones correctas en cada dominio: cinco anchos de 320 a 1440 px, menú y FAQ por
teclado, sin JavaScript, axe desktop/móvil, navegación recíproca, metadatos, recursos y texto ampliado.

[Resultado en alvia.ar](../design/validaciones-astra-a/public/browser-checks.json),
[resultado en www](../design/validaciones-astra-a/public/www-browser-checks.json),
[escritorio público](../design/validaciones-astra-a/public/1440-full.png) y
[móvil público](../design/validaciones-astra-a/public/390-full.png).

## Reproducir la verificación pública

```sh
python3 docs/features/validaciones/verify-public.py \
  --release /var/www/alvia.ar/releases/v5-a47eb69 \
  --before docs/design/validaciones-astra-a/public/before-deploy.json \
  --output /tmp/alvia-astra-a-http-check-new.json
```

El runner de navegador documentado en `docs/features/validaciones/README.md` acepta
`ALVIA_V5_URL=https://alvia.ar/` o `https://www.alvia.ar/`. Las pruebas no ejecutan
verificaciones de identidad, cobros ni envíos de mensajes.

## Rollback

Confirmar que el enlace aún apunta a este release; si hubo una publicación posterior,
revisarla antes de revertir. Mantener ambos releases y la configuración de Nginx.

```sh
sudo python3 - <<'PYCODE'
from pathlib import Path
import os
link = Path('/var/www/alvia.ar/www/v5')
previous = Path('/var/www/alvia.ar/releases/v5-4239034')
assert link.is_symlink() and link.resolve() == Path('/var/www/alvia.ar/releases/v5-a47eb69')
assert previous.is_dir()
temporary = link.with_name('v5.rollback-astra-a.next')
assert not temporary.exists() and not temporary.is_symlink()
os.symlink(previous, temporary)
os.replace(temporary, link)
PYCODE
```

Después verificar `/validaciones`, `/`, las otras funcionalidades y `/release.json` en ambos
dominios. El rollback devuelve la composición anterior de Validaciones; no restaura el mock GLM.
