# Recetas · publicada en V5

**Iteración visual vigente:** alternativa 3 con sólo editor médico y app del paciente, mostrando siempre el documento generado sin selector de estados, runtime `0cd831d`. Se conservan todos los textos y la estructura exterior a los mocks. [Decisión, capturas y verificaciones](../../design/v5-prescription-mocks/README.md). Las secciones siguientes conservan la evidencia de la primera publicación.

2026-09-12. **Publicada y verificada en [alvia.ar/v5/recetas.html](https://alvia.ar/v5/recetas.html)** y en [www.alvia.ar](https://www.alvia.ar/v5/recetas.html), por pedido de Pablo. Runtime inicial **`5f74ecf7390da9f3e8d6f77b8b117ec87bdf8d95`**, rama `feat/v5-feature-pages-plan` de `Raboys/alvia-web`. Home enlaza las tres features, con navegación recíproca. La evidencia de la entrega local se conserva debajo; la publicación se registra al final.

El recorrido muestra la preparación médica y el documento en el celular del paciente con un mismo caso ficticio. Un selector nativo permite comparar PDF en preparación y documento listo. Se mantienen la leyenda de demostración y las condiciones de disponibilidad; no hay medicación real, dosis, firmas o matrículas inventadas. Las acciones de descarga y compartir se explican como capacidades de la app.

- [Brief y decisiones](BRIEF.md), [procedencia por escena](PROVENANCE.md), [fixture](fixture.json).
- [Plan](../../../v5/PLAN_FEATURES.md) y [estado durable](../../../v5/TODO.md).
- Base institucional `ab8aa78b067424598d68b3f8c1df2e0954a4c3b1`; producto `f5e854a813a08e57111044601eb982ba1924fba3`.

## Capturas y revisión visual

| Ancho CSS | Página completa |
|---|---|
| 1440 | [Escritorio](review/1440-full.png) |
| 1024 | [Escritorio compacto](review/1024-full.png) |
| 768 | [Tablet](review/768-full.png) |
| 390 | [Móvil](review/390-full.png) |
| 320 | [Móvil pequeño](review/320-full.png) |

También: [preparación del PDF](review/390-preparing.png), [sin JavaScript](review/390-no-js.png), [preparación sin JS](review/390-without-JS-preparing.png), [texto duplicado y nombre largo](review/720-enlarged-ready.png), [texto ampliado a 320 px](review/320-enlarged-ready.png), [home escritorio](review/1440-home-features.png) y [home móvil](review/390-home-features.png).

Chromium headless, DPR 1. Revisados composición, orden de lectura, legibilidad, estados, pie de demostración y enlaces en los cinco anchos. Se corrigió el selector para que los radios permanezcan en la celda de su etiqueta y el clic lo reciba la etiqueta visible; conserva el foco de teclado. La verificación evita iniciar la interacción mientras se desplaza hacia el control. Se capturan los estados desde el inicio de la página para que la cabecera fija no aparezca en mitad de la imagen.

La revisión no acredita preferencias del comprador, conversión o pruebas en dispositivos físicos. Se conservan las evidencias históricas de V5 y de las otras features.

## Verificaciones locales

- **[232 comprobaciones de Recetas en autoría](review/browser-checks.json)** y **[232 sobre paquete aislado](review/package-browser-checks.json)**: entrada directa, metadata, fuentes locales, fixture entre superficies, borrador y documento listo, cinco anchos, teclado y foco, clic, ambas variantes, desplegable, menú móvil/Escape, enlaces/anclas, ida/vuelta entre las tres features, home, recursos y ausencia de llamadas al producto. Incluye calculadora, pestañas por teclado y selector de pantalla de home en escritorio/móvil; sin JS a 1440/390/320, movimiento reducido, reflujo y texto de lectura al doble con nombre largo a 720/320.
- **[205 comprobaciones de Validaciones](review/validaciones-regression-checks.json)** y **[148 de AI Notes](review/ai-notes-regression-checks.json)**. Sus runners actualizan únicamente la expectativa de navegación: tres features completas y Recetas con destino real. El contenido y las interacciones de esas páginas pasan sus comprobaciones anteriores.
- **[HTTP y SHA-256 del paquete](review/package-checks.json)**: 20 archivos, 493.421 bytes, idénticos al árbol revisado y al manifiesto servido. Incluye fuentes y licencias; excluye herramientas, documentación, fixtures y capturas de revisión.
- **[Manifiesto](review/runtime-manifest.json)**: `source_mode: working-tree-preview`, `source_commit: null`, base `ab8aa78`. Preview `/tmp/alvia-recetas-final/v5`; no sustituye el paquete desde el futuro commit de publicación.
- `node --check` de los runners y menú común; `git diff --check`; revisión final del diff y de las referencias locales de documentación. No se modifican backend ni app.

La página añade `recetas.html` (10.500 bytes) y `recetas.css` (10.005 bytes). Comparte `styles.css` y `navigation.js`; no incorpora imágenes, JS propio ni dependencias. Home conserva sus assets y sólo suma el enlace. AI Notes y Validaciones sólo agregan el enlace recíproco en el footer.

## Reproducir

Desde `/home/pablo/dev/alvia-web-v5-features`:

```sh
python3 -m http.server 8945 --bind 127.0.0.1
# http://127.0.0.1:8945/v5/recetas.html
# En otra terminal:
node docs/features/recetas/verify.cjs

# Regresiones, conservando la evidencia histórica:
ALVIA_V5_URL=http://127.0.0.1:8945/v5/ ALVIA_V5_EVIDENCE=/tmp/recetas-validaciones-check node docs/features/validaciones/verify.cjs
ALVIA_V5_URL=http://127.0.0.1:8945/v5/ ALVIA_V5_EVIDENCE=/tmp/recetas-ai-notes-check node docs/features/ai-notes/verify.cjs
```

Los runners aceptan `ALVIA_PLAYWRIGHT`, `ALVIA_V5_URL` y `ALVIA_V5_EVIDENCE`. Recetas acepta el runtime y, al verificar `alvia.ar` o `www.alvia.ar`, únicamente los recursos conocidos de correo y observabilidad de Cloudflare. Sigue rechazando solicitudes al producto o a otros destinos.

```sh
# Elegir un destino nuevo para cada paquete:
python3 scripts/package_v5.py --working-tree /tmp/recetas-preview-new/v5
python3 -m http.server 8949 --bind 127.0.0.1 --directory /tmp/recetas-preview-new
# En otra terminal:
ALVIA_V5_URL=http://127.0.0.1:8949/v5/ ALVIA_V5_EVIDENCE=/tmp/recetas-preview-check node docs/features/recetas/verify.cjs
python3 docs/features/recetas/verify-package.py --runtime /tmp/recetas-preview-new/v5 --url http://127.0.0.1:8949/v5/ --output /tmp/recetas-package-checks.json
```

## Continuidad

La implementación y la publicación están completas. El pedido posterior de Pablo autoriza publicación, commits de implementación/documentación y push. La preview histórica conserva su manifiesto sin commit; el release público se identifica en el registro de abajo.


## Publicación · 2026-09-12 UTC

Release `/var/www/alvia.ar/releases/v5-5f74ecf`, activado el **2026-09-12 18:44:43 UTC** mediante reemplazo atómico de `/var/www/alvia.ar/www/v5`. Runtime `5f74ecf7390da9f3e8d6f77b8b117ec87bdf8d95`; release anterior `v5-2d3380d` conservado para rollback. El paquete sale del commit pusheado, con hashes idénticos a la preview revisada: 20 archivos, 493.421 bytes más manifiesto.

- [232 checks del paquete de commit](public/commit-package-checks.json) y [comparación de hashes/HTTP](public/commit-package-manifest-checks.json), antes de publicar.
- [232 checks públicos de Recetas](public/browser-checks.json) y [232 en www](public/www-browser-checks.json): cinco anchos, ambos estados, teclado, sin JS, movimiento reducido, texto ampliado, enlaces y home.
- [205 checks públicos de Validaciones](public/validaciones-regression-checks.json) y [148 de AI Notes](public/ai-notes-regression-checks.json).
- [HTTP y hashes en origen y ambos dominios](public/http-checks.json): 20 archivos correctos; el HTML coincide después de normalizar sólo la protección de correo de Cloudflare. Las URLs versionadas de CSS/JS son las del HTML. Manifiesto idéntico, Nginx sin cambios, rutas de portada y versiones retiradas preservadas.
- [Manifiesto de commit](public/release.json), [preflight](public/before-deploy.json) y [registro del cambio atómico](public/deployment.json).

Capturas públicas: [escritorio](public/1440-full.png), [móvil](public/390-full.png), [PDF en preparación](public/390-preparing.png), [home escritorio](public/1440-home-features.png), [home móvil](public/390-home-features.png), [www escritorio](public/www-1440-full.png) y [www móvil](public/www-390-full.png).

Para repetir la verificación sin sobrescribir estas evidencias:

```sh
python3 docs/features/ai-notes/verify-public.py --release /var/www/alvia.ar/releases/v5-5f74ecf --before docs/features/recetas/public/before-deploy.json --output /tmp/recetas-public-http.json
ALVIA_V5_URL=https://alvia.ar/v5/ ALVIA_V5_EVIDENCE=/tmp/recetas-public-review node docs/features/recetas/verify.cjs
ALVIA_V5_URL=https://www.alvia.ar/v5/ ALVIA_V5_EVIDENCE=/tmp/recetas-public-www-review node docs/features/recetas/verify.cjs
```

[Registro de release y rollback](../../releases/2026-09-12-v5.md#recetas--2026-09-12-utc). La documentación posterior se commitea y pushea separada del runtime; el manifiesto sigue apuntando a `5f74ecf` aunque HEAD avance con esa evidencia.
