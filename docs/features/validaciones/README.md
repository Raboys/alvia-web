# Validaciones · aprobada y publicada en V5

2026-09-12. **Publicada en [alvia.ar/v5/validaciones.html](https://alvia.ar/v5/validaciones.html)** y en `www.alvia.ar`, con enlace desde home y navegación recíproca con AI Notes. Recetas sigue informativa. Pablo aprobó la página y pidió publicarla, documentarla, commitear y pushear. Runtime vigente **`2d3380dc31ea832366bdd9a1fd4c5e50722b9d74`**, rama `feat/v5-feature-pages-plan` de `Raboys/alvia-web`.

La página reúne identidad, código de credencial y copagos bajo las reglas de cobertura. El ejemplo de guardia permite comparar una cobertura con copago y otra sin copago mediante radios nativos. Explica DNI/selfie, el código de la app de la cobertura y el momento del pago: al reservar un turno o antes de entrar a la espera en guardia. El ejemplo de código tiene tres dígitos y el cierre de copagos dice «Con todos los medios de pago», según las correcciones posteriores de Pablo.

- [Brief y decisiones](BRIEF.md), [procedencia por escena](PROVENANCE.md) y [fixture sintético](fixture.json).
- [Estado durable](../../../v5/TODO.md) y [continuidad del plan](../../../v5/PLAN_FEATURES.md).
- Institucional base `905a01c4700e3ff2ea020d37facf953fc25fcc92`; producto contrastado `f5e854a813a08e57111044601eb982ba1924fba3`.

## Revisión visual inicial

| Ancho CSS | Página completa |
|---|---|
| 1440 | [Escritorio](review/1440-full.png) |
| 1024 | [Escritorio compacto](review/1024-full.png) |
| 768 | [Tablet](review/768-full.png) |
| 390 | [Móvil](review/390-full.png) |
| 320 | [Móvil pequeño](review/320-full.png) |

También: [hero escritorio](review/1440-hero.png), [hero móvil](review/390-hero.png), [cobertura sin copago](review/390-no-copay.png), [requisito pendiente](review/390-pending-requirement.png), [sin JavaScript](review/390-no-js.png), [selector sin JavaScript](review/390-without-JS-no-copay.png), [texto ampliado](review/720-enlarged-text.png), [entrada de home](review/1440-home-features.png) y [home móvil](review/390-home-features.png).

Chromium headless, DPR 1. Revisión de composición y legibilidad en los cinco anchos, sin desborde horizontal. Se corrigió un desborde de palabras en la prueba de texto ampliado. Las capturas no acreditan preferencia comercial, conversión ni pruebas en dispositivos físicos. No se sobrescribieron el baseline aprobado ni las capturas históricas de AI Notes.

## Verificaciones de la primera publicación

- **[205 comprobaciones locales](review/browser-checks.json)** y **[205 sobre el paquete aislado](review/package-browser-checks.json)**: acceso directo, fuentes, fixture, ambas variantes, teclado, foco, navegación móvil y Escape, requisitos pendientes, enlaces y anclas, ida/vuelta entre features, Recetas sin enlace, ausencia de errores y de llamadas externas o al producto, sin JS, movimiento reducido y reflujo equivalente a zoom de 200 % más texto de lectura ampliado.
- **[148 comprobaciones de regresión de AI Notes](review/ai-notes-regression-checks.json)**: copia y fallback, consentimiento, estudios, navegación y estados responsivos. Se actualizan sólo las dos aserciones de home que antes esperaban a Validaciones sin destino; las evidencias históricas se conservan.
- **[Paquete HTTP y SHA-256](review/package-checks.json)**: 18 archivos, 472.984 bytes, más manifiesto; todos coinciden con el árbol revisado. Incluye fuentes y licencias, excluye documentos, fixtures y capturas. La nueva página no agrega imágenes ni JS propio y sus estilos no se cargan en home.
- **[Manifiesto del runtime revisado](review/runtime-manifest.json)**: `source_mode: working-tree-preview`, `source_commit: null`, base `905a01c`. Paquete local `/tmp/alvia-validaciones-verified/v5`. No es un release de publicación.
- `node --check` del runner nuevo y navegación común, HTML con IDs/referencias accesibles comprobados y `git diff --check` sin errores. Revisión final de cambios limitada a la página, navegación y documentación relacionada.

## Reproducir

Desde `/home/pablo/dev/alvia-web-v5-features`:

```sh
python3 -m http.server 8935 --bind 127.0.0.1
# http://127.0.0.1:8935/v5/validaciones.html
# En otra terminal:
node docs/features/validaciones/verify.cjs

# Regresión de AI Notes, sin sobrescribir su evidencia histórica:
ALVIA_V5_URL=http://127.0.0.1:8935/v5/ ALVIA_V5_EVIDENCE=/tmp/alvia-validaciones-ai-notes-regression node docs/features/ai-notes/verify.cjs
```

El runner acepta `ALVIA_PLAYWRIGHT`, `ALVIA_V5_URL` y `ALVIA_V5_EVIDENCE`. El valor por defecto de Playwright apunta a la instalación local registrada, sin agregar dependencias al sitio.

```sh
# Elegir un destino nuevo para cada paquete:
python3 scripts/package_v5.py --working-tree /tmp/alvia-validaciones-preview-new/v5
python3 -m http.server 8937 --bind 127.0.0.1 --directory /tmp/alvia-validaciones-preview-new
# En otra terminal:
ALVIA_V5_URL=http://127.0.0.1:8937/v5/ ALVIA_V5_EVIDENCE=/tmp/alvia-validaciones-package-review node docs/features/validaciones/verify.cjs
```

La publicación de abajo se generó desde el commit de implementación con `--ref 60dadfc`. El manifiesto `review/runtime-manifest.json` conserva la preview inicial; `public/release.json` identifica el commit servido. Sus archivos y hashes coinciden exactamente.


## Publicación · 2026-09-12 UTC

Se activó el release `/var/www/alvia.ar/releases/v5-60dadfc` el **2026-09-12 17:43:31 UTC**, reemplazando atómicamente el enlace `/var/www/alvia.ar/www/v5`. Se conserva `/var/www/alvia.ar/releases/v5-a4ca4aa` para revertir. No se modificaron Nginx, las redirecciones ni los servicios del producto.

- [205 comprobaciones del paquete generado desde Git](public/commit-package-checks.json), antes de publicar, con hashes idénticos a la versión aprobada.
- [205 comprobaciones públicas de Validaciones](public/browser-checks.json), en 1440, 1024, 768, 390 y 320 px; selector, teclado, sin JS, movimiento reducido, texto ampliado y navegación.
- [148 comprobaciones públicas de AI Notes](public/ai-notes-regression-checks.json), incluida copia, fallback, consentimiento y navegación.
- [18 comprobaciones en www](public/www-smoke-checks.json), en escritorio y móvil: home, calculadora, pestañas, selector de app, entrada a Validaciones, alternativa sin copago y ausencia de errores/desborde.
- [Verificación HTTP y hashes](public/http-checks.json): 18 archivos, 472.984 bytes, más manifiesto, en origen y ambos dominios. El HTML coincide tras normalizar únicamente la protección de correo conocida de Cloudflare. CSS/JS se comparan con sus URLs versionadas exactas.
- [Manifiesto de commit](public/release.json), [estado previo](public/before-deploy.json) y [registro del cambio atómico](public/deployment.json). Ambas raíces mantienen 301 a `https://alvia.ar/v5/`; V5 responde 200 y V4 conserva su redirección previa. Nginx mantiene su hash y el release anterior existe.

Capturas públicas: [escritorio](public/1440-full.png), [móvil](public/390-full.png), [home escritorio](public/1440-home-features.png), [home móvil](public/390-home-features.png), [www escritorio](public/www-1440-full.png) y [www móvil](public/www-390-full.png).

La herramienta de navegador admite exclusivamente el runtime y los recursos conocidos de correo/observabilidad de Cloudflare al comprobar dominios públicos; sigue rechazando llamadas al producto. La verificación HTTP reutiliza `docs/features/ai-notes/verify-public.py`, que recorre todos los archivos del manifiesto, incluida Validaciones:

```sh
python3 docs/features/ai-notes/verify-public.py \
  --release /var/www/alvia.ar/releases/v5-60dadfc \
  --before docs/features/validaciones/public/before-deploy.json \
  --output /tmp/alvia-validaciones-public-http-checks.json
ALVIA_V5_URL=https://alvia.ar/v5/ ALVIA_V5_EVIDENCE=/tmp/alvia-validaciones-public-checks node docs/features/validaciones/verify.cjs
```

[Registro de release y rollback](../../releases/2026-09-12-v5.md#validaciones--2026-09-12-utc). Implementación y documentación quedan en commits separados; el manifiesto identifica el commit de runtime, aunque HEAD avance con la evidencia de publicación.


## Correcciones de copy · 2026-09-12 UTC

Pablo pidió mostrar tres dígitos (`482`), quitar «En Alvia se llama…» y la aclaración sobre número de afiliado/código de acceso, y reemplazar la aclaración de segundo cobro por **«Con todos los medios de pago»**. El texto del código queda en una sola oración: «El afiliado ingresa el código que ve en la app de su cobertura».

Runtime vigente **`2d3380dc31ea832366bdd9a1fd4c5e50722b9d74`**, release `/var/www/alvia.ar/releases/v5-2d3380d`, activado el **2026-09-12 18:12:57 UTC**. Paquete de commit: 18 archivos, 472.759 bytes, más manifiesto. Sólo cambia `validaciones.html` respecto de `60dadfc`. El fixture y las decisiones editoriales también se actualizaron en el repo.

- [205 comprobaciones locales](public-copy-update/local-browser-checks.json) y [205 públicas](public-copy-update/browser-checks.json) sobre la corrección. La prueba de copagos exige ahora el texto pedido por Pablo.
- [HTTP y SHA-256](public-copy-update/http-checks.json) de los 18 archivos y manifiesto en origen y ambos dominios; rutas y Nginx conservados.
- [Captura vigente de escritorio](public-copy-update/1440-full.png) y [móvil](public-copy-update/390-full.png). Las imágenes anteriores se conservan como evidencia histórica de la primera publicación.
- [Manifiesto de commit](public-copy-update/release.json), [preflight](public-copy-update/before-deploy.json) y [cambio atómico](public-copy-update/deployment.json).

Rollback de esta corrección: comprobar que `www/v5` siga apuntando a `v5-2d3380d` y reemplazar atómicamente el enlace por `v5-60dadfc`, conservado. [Registro de la corrección](../../releases/2026-09-12-v5.md#correcciones-de-copy-de-validaciones--2026-09-12-utc). Para verificar el release vigente con `verify-public.py`, usar `--release /var/www/alvia.ar/releases/v5-2d3380d` y `--before docs/features/validaciones/public-copy-update/before-deploy.json`.
