# V4-C — Tus médicos, atendiendo online

Variante creada el 2026-09-04 a pedido de Pablo. Nueva composición y textos breves: presentar la atención, explicar el uso de las horas disponibles y ofrecer la Red Alvia como complemento. El detalle de cobertura queda en preguntas desplegables.

## Abrir

- Preview privada por Tailscale: http://100.71.73.116:18727/v4-c/
- Fuente: `v4-c/index.html`, `v4-c/styles.css` y `v4-c/script.js` (reproducción del video de identidad).
- A y B siguen disponibles en `/v4-a/` y `/v4-b/` en el mismo servidor.
- Servidor temporal de usuario: `alvia-v4-preview.service`, Python estático, ligado sólo a `100.71.73.116:18727`. No es un despliegue público.
- Para detenerlo: `XDG_RUNTIME_DIR=/run/user/1000 DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus systemctl --user stop alvia-v4-preview.service`.
- Para servir manualmente desde la raíz del worktree: `python3 -m http.server 18727 --bind 100.71.73.116`.

## Verificación de la primera versión

Chrome real con Playwright: 1440, 1024, 768, 390 y 320 px de ancho, sin JavaScript y con movimiento reducido. Sin desborde horizontal, errores de carga ni anclas internas rotas; imágenes completas; un solo h1. Preguntas probadas con clic y Enter para abrir y cerrar. Capturas de página completa y primera pantalla en `/tmp/alvia-v4c-review/`.

En 390 × 844 la imagen de atención comienza en y=387 px. Esto comprueba su presencia inicial, no sustituye un test de comprensión con compradores.

## Incorporación de muestras de V3 — 2026-09-04

A pedido de Pablo, se conserva el hero aprobado y se agrega un explorador de cinco vistas: inicio, identidad, autorización, copago y recetas. Cada vista tiene una explicación breve. No representa una secuencia obligatoria; las condiciones se explican en su vista correspondiente. Se suma la captura de la consulta al bloque para médicos.

- El explorador usa radios nativos y CSS; funciona con clic, flechas de teclado y sin JavaScript.
- El video de identidad se inicia sólo a pedido, tiene pausa y se detiene al cambiar de vista o salir de la pestaña. Sin JavaScript conserva los controles nativos.
- Las capturas tienen enlaces para ampliarlas. Se conservan completas y legibles, sin máscaras sobre el producto.
- `../v3/assets/app-paciente.png`, `mockup-preconsulta-autorizacion.png`, `mockup-preconsulta-copago.png` y `mockup-consulta-medica.png` se reutilizan de V3 con sus fixtures originales. Tiempos, importes y nombres de las pantallas son datos del ejemplo; no se trasladan al copy como promesas comerciales.
- `../v3/assets/verificacion-identidad-kyc.mp4` es la muestra visual de V3 que el usuario pidió recuperar. La composición del teléfono es HTML/CSS local; no activa una cámara ni ejecuta una validación real.
- `assets/identidad-poster.jpg` es un fotograma exportado del video a los 0,4 s: `ffmpeg -ss 0.4 -i v3/assets/verificacion-identidad-kyc.mp4 -frames:v 1 -q:v 3 v4-c/assets/identidad-poster.jpg`.
- `assets/app-recetas.png` se capturó desde `RecetasList` del canvas existente de telemed-starter (`design/canvas/paciente/screens-recetas.jsx`, checkout `81da853`). Render en Chrome a 390 × 844, DPR 2, paleta azul, fuentes cargadas y fixtures propios del componente. Sin cambios al repo de producto ni al contenido de la pantalla.

Verificación de esta incorporación: 1440, 768, 390 y 320 px con movimiento reducido; las cinco vistas muestran un único panel sin desborde ni errores. Repetición en 390 px sin JavaScript. Reproducción, pausa y detención al cambiar de vista verificadas en navegador real. FAQ, enlace para ampliar y anclas internas correctos. Hero conservado (imagen en y=387 px en 390 × 844). Evidencia en `/tmp/alvia-v4c-app-review/`.

## Imágenes

- `assets/videoconsulta.png`: escena conceptual generada con la herramienta integrada `image_gen`, con personas ficticias. No representa una captura del producto ni un testimonio. El texto alternativo la identifica como escena ilustrativa.
- Original conservado: `/home/pablo/.codex/generated_images/01a06f72-4b13-76d3-8c8f-021d3955e472/exec-39cf46f6-7e9c-488f-8180-1097ce68acd6.png`.
- `../v3/assets/mockup-operacion.png`: captura existente de la agenda con datos sintéticos documentados en `.orq/refs/03-asset-inventory.md`. Se muestra sin máscaras que borren el funcionamiento y se puede ampliar. V3 no se modifica.

Prompt exacto de la imagen generada:

> Use case: photo-natural. Asset type: editorial illustration for the hero of Alvia, an Argentine telemedicine website. Create a warm, believable editorial photograph of a video medical consultation, landscape 3:2. A woman patient about 40 at home seen from slightly over her shoulder, foreground on the right, speaking with a woman doctor about 45 who is clearly visible on a laptop screen centered left. The doctor wears a white coat over muted teal scrubs in a simple softly lit consultation room. The laptop screen should be large and the doctor's face easily recognizable even when the whole image is small on mobile. Simple plausible video call layout with small neutral controls only, no text, no logos, no clinical documents, no patient information. A quiet lived-in home, wooden table, a small plant, off-white wall, natural daylight. Both people at ease and attentively talking, not posed at the camera. Restrained sage green, cream, natural wood and navy palette. Realistic skin texture, unretouched magazine photography, calm composition. Fictional adults, no resemblance to known real people. Avoid futuristic effects, floating interface cards, large empty space, extra devices, duplicated faces, elaborate UI, readable text, stock-photo exaggerated smiles. This is a conceptual scene, not a screenshot of software.
