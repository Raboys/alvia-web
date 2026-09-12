# Header V5 · opción 4 elegida

Pablo eligió «4» después de comparar cuatro alternativas de header y pidió priorizar descubribilidad en mobile. Se adopta nombre + beneficio para las tres funcionalidades:

- Validaciones · Identidad y cobertura.
- AI Notes · Documentación automática.
- Recetas · Del médico al paciente.

El header compartido se aplica a home y las tres subpáginas. Reemplaza los enlaces a secciones de la home. En desktop muestra los tres accesos junto a la marca; en mobile muestra una segunda fila de tres tarjetas permanentemente visibles. Ingresar y Hablemos permanecen disponibles. Cada página marca su acceso con `aria-current="page"`.

La navegación usa enlaces HTML sin menú hamburguesa ni JavaScript. `header.css` concentra el estilo elegido; se retira el script anterior del menú. El offset de anclas contempla la altura del header fijo.

Preview de la implementación empaquetada: <http://100.71.73.116:18729/elegida/>. Comparador original: <http://100.71.73.116:18729/>. No se publicó en el dominio público en esta iteración.

Base: `c03f138`; rama `feat/v5-descriptive-header`. `scripts/package_v5.py --working-tree` resolvió 21 recursos, incluidas las cuatro páginas, sin referencias a los mocks de comparación.

Verificación: 36 combinaciones de página y ancho (320, 360, 390, 430, 768, 900, 901, 1100 y 1440 px), sin desborde ni errores HTTP/JS; enlaces con área táctil mínima de 44 px. Navegación entre features y sin JavaScript verificada. Header fijo verificado. Evidencia: `checks.json`, `mobile.png` y `desktop.png`.
