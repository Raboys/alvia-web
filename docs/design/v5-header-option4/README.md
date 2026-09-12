# Header V5 · opción 4 elegida

Pablo eligió «4» después de comparar cuatro alternativas de header y pidió priorizar descubribilidad en mobile. Se adopta nombre + beneficio para las tres funcionalidades:

- Validaciones · Identidad y cobertura.
- AI Notes · Documentación automática.
- Recetas · Del médico al paciente.

El header compartido se aplica a home y las tres subpáginas. Reemplaza los enlaces a secciones de la home. En desktop muestra los tres accesos junto a la marca; en mobile muestra una segunda fila de tres tarjetas permanentemente visibles. Ingresar y Hablemos permanecen disponibles. Cada página marca su acceso con `aria-current="page"`.

La navegación usa enlaces HTML sin menú hamburguesa ni JavaScript. `header.css` concentra el estilo elegido; se retira el script anterior del menú. El offset de anclas contempla la altura del header fijo.

Preview de la implementación empaquetada: <http://100.71.73.116:18729/elegida/>. Comparador original: <http://100.71.73.116:18729/>. Publicado en [alvia.ar](https://alvia.ar/v5/) y [www.alvia.ar](https://www.alvia.ar/v5/) por pedido explícito posterior de Pablo.

Base: `c03f138`; rama `feat/v5-descriptive-header`. `scripts/package_v5.py --working-tree` resolvió 21 recursos, incluidas las cuatro páginas, sin referencias a los mocks de comparación.

Verificación: 36 combinaciones de página y ancho (320, 360, 390, 430, 768, 900, 901, 1100 y 1440 px), sin desborde ni errores HTTP/JS; enlaces con área táctil mínima de 44 px. Navegación entre features y sin JavaScript verificada. Header fijo verificado. Evidencia: `checks.json`, `mobile.png` y `desktop.png`.

## Publicación · 2026-09-12

- Runtime: `6176676571a1366c9962800bbbf89295b2d60b97`, commiteado y pusheado antes de publicar.
- PR borrador: [#25](https://github.com/Raboys/alvia-web/pull/25), rama `feat/v5-descriptive-header`, base `main`. Incluye la base de features ya publicada del PR #22; la publicación estática no integra los PR a main.
- Release: `/var/www/alvia.ar/releases/v5-6176676`, activado atómicamente a las **19:58:24 UTC**.
- Release anterior: `/var/www/alvia.ar/releases/v5-0cd831d`, conservado.
- Paquete desde commit: **21 archivos, 505.808 bytes**, más manifiesto; idéntico archivo por archivo a la preview verificada.
- Navegador público: **36 combinaciones de página/ancho en cada dominio**, sin errores ni desbordes, más navegación entre features, sin JS y header fijo. Anchos: 320, 360, 390, 430, 768, 900, 901, 1100 y 1440.
- Los 21 archivos y manifiestos coinciden desde origen y ambos dominios; el HTML público sólo añade la protección de correo conocida de Cloudflare, normalizada para comparar. Se validó la URL versionada de `header.css` usada por las páginas.
- Configuración Nginx y redirecciones conservadas. No se reiniciaron servicios.

Evidencia: [preflight](public/before-deploy.json), [activación](public/deployment.json), [manifiesto](public/release.json), [HTTP y hashes](public/http-checks.json), [navegador apex](public/apex/checks.json), [navegador www](public/www/checks.json). Capturas de [mobile](public/apex/mobile.png) y [desktop](public/apex/desktop.png).

Los cuatro mocks están conservados en [previews/header-variants](../../../previews/header-variants/README.md), dentro del repositorio institucional. El enlace Tailscale existente se mantiene. El paquete público excluye mocks, documentación y capturas.

### Rollback

Comprobar que `/var/www/alvia.ar/www/v5` todavía apunte a `releases/v5-6176676`, crear un enlace temporal hacia `releases/v5-0cd831d` y renombrarlo atómicamente sobre `www/v5`. Verificar `release.json`, home y las tres subpáginas en ambos dominios. El release anterior conserva las páginas y recupera el header anterior. No modificar Nginx ni borrar releases.
