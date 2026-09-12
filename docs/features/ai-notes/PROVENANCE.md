# AI Notes · autoría de las escenas

Todas las escenas son mocks nativos; no son capturas literales ni operaciones reales.

Producto fuente: `Raboys/telemed-starter` en `f5e854a813a08e57111044601eb982ba1924fba3`. Institucional base: `Raboys/alvia-web` en `626cd3bb0715f60bd982c85cfe743d3c26c25263`. Cambios de esta página: árbol de trabajo sin commit. Los hashes exactos del runtime revisado se guardan en `review/runtime-manifest.json`.

| Escena | Afirmación | Componente fuente (commit de producto arriba) | Fixture | Tratamiento y simplificación | Dimensiones | Asset final |
|---|---|---|---|---|---|---|
| Resumen automático | AI Notes sintetiza lo conversado; el profesional puede copiar la narrativa | `frontend/doctor/src/ai-notes-panel.jsx`, `ai-lifecycle.js` | `fixture.json`, `narrative` | HTML seleccionable, dos párrafos. Se omiten SOAP, pipeline, avisos internos; misma simplificación pedida en V4-C. Copiar tiene éxito real o selección manual. No escribe la historia. | Fluido: 537 px en escritorio 1440, 350 px en 390; texto 15–16 CSS px | `v5/ai-notes.html` (`.summary-scene`), `ai-notes.css`, `ai-notes.js`; sin raster |
| Estudios antes de la consulta | Email y WhatsApp ingresan a la bandeja del paciente y están disponibles para el médico | `frontend/doctor/src/panel-estudios.jsx`, `docs/archivado/estudios-adjuntos.md` | `fixture.json`, `studies` con estado clean | Bandeja reducida a paciente, archivos, fecha y canal. No hay controles inertes ni resultados clínicos ficticiamente interpretados. El contenido de los PDFs no se incluye en el resumen por un pipeline inventado. | Fluido: columna de 535 px a 1440; 350 px a 390 | `v5/ai-notes.html` (`.studies-scene`), `ai-notes.css`; sin raster |
| Consentimiento | Activación médica por consulta; el paciente puede pedir apagarla y la llamada continúa, sin reencendido | `frontend/doctor/src/screen-video.jsx`, `backend/src/AiNotes.php`, `app/src/app/legal/ai-terms.tsx` | No hay operación simulada | Texto de uso en un `details` nativo; sin panel paciente inventado | Fluido, texto refluye | `v5/ai-notes.html` (`.notes-conditions`) |
| Entrada desde home | Sólo AI Notes tiene página desarrollada | `v5/index.html`, base institucional arriba | No aplica | Se mantiene miniatura decorativa; nombre enlazado con flecha. Las otras entradas siguen informativas | Layout V5 existente | `v5/index.html`, `features.css` |

## Reproducir la evidencia

Desde la raíz institucional:

```sh
python3 -m http.server 8925 --bind 127.0.0.1
# En otra terminal:
node docs/features/ai-notes/verify.cjs
```

Playwright se resuelve por `ALVIA_PLAYWRIGHT` o el path local registrado en el runner. URL y destino de evidencia se pueden configurar con `ALVIA_V5_URL` y `ALVIA_V5_EVIDENCE`.

Capturas mediante Chromium headless, DPR 1: 1440, 1024, 768, 390 y 320 × 900 CSS px; imágenes full-page conservan el alto real de la página. Se incluyen estados sin JS, texto ampliado, consentimiento abierto y copia denegada. No se necesita ampliar ninguna captura para leer el producto en la web: las demostraciones son texto HTML.

El runner, fixture, originales de revisión y documentos no se incluyen en el paquete. No se sobrescribe `docs/design/v5-baseline/`. La primera redacción rechazada por Pablo no forma parte de la evidencia vigente.
