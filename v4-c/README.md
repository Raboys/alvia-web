# V4-C — Tus médicos, atendiendo online

Variante creada el 2026-09-04 a pedido de Pablo. Nueva composición y textos breves: presentar la atención, explicar el uso de las horas disponibles y ofrecer la Red Alvia como complemento. El detalle de cobertura queda en preguntas desplegables.

## Abrir

- Publicación para revisión: https://alvia.ar/v4/ (fuente desplegada e historial en [el registro del release](../docs/releases/2026-09-05-v4.md)).
- Preview privada por Tailscale: http://100.71.73.116:18727/v4-c/
- Fuente: `v4-c/index.html`, `v4-c/styles.css` y `v4-c/script.js` (reproducción automática de las demostraciones).
- A y B siguen disponibles en `/v4-a/` y `/v4-b/` en el mismo servidor.
- Servidor temporal de usuario: `alvia-v4-preview.service`, Python estático, ligado sólo a `100.71.73.116:18727`. No es un despliegue público.
- Para detenerlo: `XDG_RUNTIME_DIR=/run/user/1000 DBUS_SESSION_BUS_ADDRESS=unix:path=/run/user/1000/bus systemctl --user stop alvia-v4-preview.service`.
- Para servir manualmente desde la raíz del worktree: `python3 -m http.server 18727 --bind 100.71.73.116`.

## Verificación de la primera versión

Chrome real con Playwright: 1440, 1024, 768, 390 y 320 px de ancho, sin JavaScript y con movimiento reducido. Sin desborde horizontal, errores de carga ni anclas internas rotas; imágenes completas; un solo h1. Preguntas probadas con clic y Enter para abrir y cerrar. Capturas de página completa y primera pantalla en `/tmp/alvia-v4c-review/`.

En 390 × 844 la imagen de atención comienza en y=387 px. Esto comprueba su presencia inicial, no sustituye un test de comprensión con compradores.

## Muestras de la app — 2026-09-04

Se conserva el hero y el lenguaje simple aprobado. El explorador muestra cinco vistas: inicio, identidad, autorización, copago y recetas. Las condiciones se explican en cada vista, sin presentar una secuencia obligatoria. También se muestran la agenda y la consulta médica de V3.

### Capturas consistentes

Las cinco vistas se renderizan desde los componentes de la app web, importados sin cambios de `telemed-starter/app/src` en el checkout `81da853`: `Home`, `PrescriptionDetailScreen`, `IdentityCapture`, `AuthCodePrompt`, `PaymentSheet` y `GuardiaConfirm`. Comparten fuentes, cuenta ficticia y un único marco de dispositivo definido en `captures/device.html`.

- Pantalla completa de 390 × 844 CSS px: barra superior de 44 px, contenido de 390 × 766 y barra inferior de 34 px. PNG a DPR 2 (780 × 1688); video de 390 × 844.
- Misma hora (9:41), señal, Wi-Fi, batería e indicador inferior en todas. La pantalla oscura de identidad adapta el color de los indicadores, manteniendo la geometría.
- Autorización y copago usan la misma pantalla de fondo y el mismo oscurecimiento. El tamaño de cada hoja depende del contenido del componente real.
- Identidad usa el componente real en modo selfie, sustituyendo la cámara por el video ilustrativo de V3 como fuente de MediaStream. No se activa una cámara física ni se envían verificaciones.
- La cuenta y sus datos son sintéticos. No hay sesión real, navegación ni solicitudes de pago. Nombres, tiempos e importes son ejemplos, no promesas comerciales.
- La landing escala cada cuadro completo a 390:844 con `object-fit: contain`, sin estirar ni recomponer sus elementos.

Reproducción: `node v4-c/captures/render.mjs`. Usa dependencias locales, Chrome, FFmpeg y cwebp; permite configurar `ALVIA_APP_SOURCE`, `ALVIA_APP_DEPS`, `ALVIA_ESBUILD` y `ALVIA_PLAYWRIGHT`. Sirve temporalmente en loopback, bloquea solicitudes externas y cierra navegador y servidor al terminar. El sitio sólo sirve los archivos resultantes; no incorpora React Native ni Expo.

### Carga y navegación

- Las cinco vistas se sirven en WebP: 398 KB en total (incluida la receta abierta); la primera tanda pesaba 369 KB frente a 1,15 MB de los PNG. Las cuatro capturas sin fotografía usan compresión sin pérdida, conservando exactamente sus píxeles; identidad usa calidad 85. Los enlaces para ampliar conservan los PNG originales.
- Las cinco imágenes, incluidos los posters de ambos videos, tienen `preload`. Los `img` son eager y el script solicita su decodificación al inicio, incluso si la pestaña está oculta.
- El hero se sirve en WebP de 69 KB frente al PNG original de 2,03 MB, conservando composición y resolución. El original queda disponible en assets.
- Para repetir sólo la compresión: `node v4-c/captures/optimize.mjs`. También corre al finalizar la captura.
- El explorador usa radios nativos y CSS: funciona con clic, flechas y sin JavaScript.
- Identidad y autorización son videos MP4 con `autoplay`, `loop`, `muted`, `playsinline` y `preload="auto"`. Se reproducen automáticamente al mostrar su pestaña. El script pausa las vistas ocultas, fuera de pantalla o en una pestaña de navegador inactiva. Sin JavaScript se conservan los atributos de reproducción automática.
- Autorización muestra el componente real escribiendo `6284` dígito por dígito, confirma y cierra la hoja; la pantalla de fondo muestra la fila verde «Código ingresado». Tras 2,2 segundos vuelve a empezar por el código vacío. Es una demostración local del estado completado, sin verificar un código real contra un servidor.
- Ambos videos pesan unos 212 KB en total. Los controles nativos sólo aparecen como respaldo si el navegador rechaza la reproducción automática.

## Verificación final

Chrome real: 1440, 390 y 320 px, más 390 px sin JavaScript. Una vista visible a la vez, relación 390:844, sin desborde ni errores. En 390 px se simuló caché deshabilitada, 80 ms de latencia y 200 KB/s: las pestañas no provocaron nuevas descargas de imágenes ni videos. Se comprobaron autoplay sin clic, avance y reinicio del bucle de autorización, pausa de videos ocultos y navegación con flechas. Evidencia: `/tmp/alvia-v4c-final-review/`.

Comparación de píxeles decodificados: los cuatro WebP de interfaz sin fotografía son idénticos a los PNG; las barras superiores de autorización y copago también son idénticas. Capturas originales y fotogramas de autorización: `/tmp/alvia-real-screens-NWwsQV/`.

## Rediseño del explorador — 2026-09-04

«Así lo ve tu afiliado» se presenta como una sola demo de producto. En escritorio, el selector lateral usa iconos, títulos y descripciones breves; la opción elegida tiene fondo verde oscuro. El teléfono queda en el centro y una explicación corta al lado. Identidad, autorización y copago aclaran «Según su cobertura».

En tablet y móvil, las cinco opciones permanecen visibles en una barra que acompaña el desplazamiento. «Código» abrevia autorización en espacios chicos. La altura de la explicación es estable entre vistas para conservar la posición del teléfono. El marco, las proporciones y los assets siguen siendo los mismos.

«Ampliar» abre un diálogo nativo dentro de la página. Se mueve el elemento multimedia ya cargado, conservando el buffer y la reproducción; al cerrar, vuelve a su posición y devuelve el foco al enlace. Cierra con Escape, el botón o un clic fuera. Sin JavaScript, el enlace original sigue abriendo el PNG.

Verificado en Chrome a 1440, 1024, 768, 390 y 320 px: cinco opciones, apertura/cierre, restauración del elemento y del foco, video automático en la ampliación y teléfono completo sin desbordar el diálogo. Se repitieron las pruebas de carga anticipada, teclado, bucles y 390 px sin JavaScript; no hubo nuevas descargas al cambiar de vista. Evidencia visual: `/tmp/alvia-v4c-tour-design/`.

## Capacidad médica, cobertura, receta abierta y AI Notes — 2026-09-04

Se recupera el mensaje «Pagás capacidad médica que no llega al afiliado» en la sección de agenda, ahora inmediatamente después del hero. Dos párrafos cortos conectan las horas disponibles con turnos online. Junto al explorador se explicita que identidad, autorización y copago dependen de las reglas de cada cobertura.

La vista de recetas muestra `PrescriptionDetailScreen` de la app web: documento abierto, medicación, profesional y acciones para descargar/compartir. Datos sintéticos de la misma cuenta; conserva la leyenda de demostración del componente real. Assets `app-receta-real.png` y `.webp` (780 × 1688, WebP sin pérdida de 52 KB). La antigua lista ya no se muestra. Para regenerar sólo este documento: `ALVIA_CAPTURE_SCREEN=prescriptions node v4-c/captures/render.mjs`.

AI Notes tiene una sección propia después de la consulta médica: «Menos tiempo escribiendo. Más atención al paciente». Se explica que resume la conversación como referencia y que el médico activa la IA, redacta y firma la historia. Esta descripción se verificó contra `frontend/doctor/src/ai-notes-panel.jsx`, `ai-lifecycle.js` y `docs/ai-notes-lifecycle-mvp.md` de telemed-starter. No se promete escritura ni firma automática de la historia.

La imagen de AI Notes se captura directamente del componente `AiNotesPanel`, sin cambios de UI, con una consulta ficticia y servicios sustituidos por fixtures locales. Render de 520 px de ancho a DPR 2, PNG de 1040 × 964 y WebP sin pérdida de 48 KB. El panel se muestra completo, con enlace para ampliar. No son datos de un paciente real ni una síntesis generada en vivo para esta web.

Reproducción: `node v4-c/captures/render-ai-notes.mjs`; variables opcionales `ALVIA_DOCTOR_SOURCE`, `ALVIA_DOCTOR_DEPS`, `ALVIA_ESBUILD` y `ALVIA_PLAYWRIGHT`. Descarga las fuentes públicas que usa el producto; la captura bloquea solicitudes fuera de su servidor temporal en loopback. Evidencia de captura: `/tmp/alvia-ai-notes-Kx3NTf/` y `/tmp/alvia-real-screens-Ck9LUf/`.

Verificado en Chrome a 1440, 768, 390 y 320 px, más 390 sin JavaScript: imágenes cargadas, una vista a la vez, teléfono del mismo tamaño en las cinco vistas, receta correcta y ampliable, videos automáticos, cero descargas nuevas al cambiar de pestaña, un h1 y anclas válidas. Sin errores ni desborde horizontal. Evidencia visual: `/tmp/alvia-v4c-content-review/`.

## Simplificación del ejemplo de AI Notes — 2026-09-04

A pedido de Pablo, la tarjeta de AI Notes pasa a ser un mock ilustrativo en HTML/CSS, con texto seleccionable y botón Copiar funcional. Se eliminan de la tarjeta «Ver SOAP», «Síntesis lista», la aclaración «Referencia — no escribe la historia» y el pie técnico. Se muestran únicamente AI Notes, el nombre ficticio y tres párrafos breves de ejemplo. La explicación comercial fuera de la tarjeta conserva el papel del médico.

Esta tarjeta ya no se presenta como captura literal del producto. Los archivos `ai-notes-real.*` y su generador se conservan como material de la versión anterior, pero la página no los carga. El ejemplo nativo evita descargar esa imagen y mantiene el texto legible en móvil.

Copiar utiliza Clipboard API cuando está disponible y un respaldo compatible con la preview HTTP. Confirma «Copiado» sólo si la operación tuvo éxito. Sin JavaScript se oculta el botón y el resumen sigue siendo seleccionable. Verificado a 1440, 390 y 320 px, más 390 sin JavaScript: texto exacto en el evento de copia, confirmación y reinicio del botón, sin desborde ni errores. Evidencia: `/tmp/alvia-notes-simple/`.

## Recetas y estudios como demos aisladas — 2026-09-04

La sección «El afiliado se atiende. El médico tiene todo a mano» reemplaza la captura completa de la consola por dos ejemplos en HTML/CSS: generación de una receta y lectura de estudios enviados por el paciente. Se disponen lado a lado en escritorio y apilados hasta 760 px, con el mismo estilo limpio de AI Notes.

- Receta: medicación, indicaciones y profesional. «Generar receta» abre el documento de ejemplo y permite volver. Usa `details` nativo y funciona sin JavaScript. No emite una receta real ni llama al backend.
- Estudios: radios nativos permiten alternar entre un análisis de laboratorio y un informe. «Ampliar estudio» abre un diálogo con el documento elegido, cierre con Escape/botón/exterior y retorno del foco. Sin JavaScript se pueden seguir consultando ambas vistas; sólo se oculta la ampliación.
- Contenido ficticio, consistente con Sofía Giménez y la profesional de los otros ejemplos. Los mocks sintetizan las funciones verificadas en `frontend/doctor/src/panel-receta.jsx` y `panel-estudios.jsx`; no son capturas literales de esos componentes.
- La página ya no descarga `v3/assets/mockup-consulta-medica.png`. Estos ejemplos no agregan imágenes ni dependencias.

Verificado a 1440, 1024, 768, 390 y 320 px, más 390 sin JavaScript: disposición responsive, generación y retorno, alternancia de archivos, documento seleccionado en la ampliación, cierre y foco, sin errores ni desborde. Evidencia: `/tmp/alvia-doctor-features/`.

## Otras imágenes

- `assets/videoconsulta.png`: escena conceptual generada con la herramienta integrada `image_gen`, con personas ficticias. No representa una captura del producto ni un testimonio. El texto alternativo la identifica como escena ilustrativa.
- Original conservado: `/home/pablo/.codex/generated_images/01a06f72-4b13-76d3-8c8f-021d3955e472/exec-39cf46f6-7e9c-488f-8180-1097ce68acd6.png`.
- `../v3/assets/mockup-operacion.png`: captura existente de la agenda con datos sintéticos documentados en `.orq/refs/03-asset-inventory.md`. Se muestra sin máscaras que borren el funcionamiento y se puede ampliar. V3 no se modifica.

Prompt exacto de la imagen generada:

> Use case: photo-natural. Asset type: editorial illustration for the hero of Alvia, an Argentine telemedicine website. Create a warm, believable editorial photograph of a video medical consultation, landscape 3:2. A woman patient about 40 at home seen from slightly over her shoulder, foreground on the right, speaking with a woman doctor about 45 who is clearly visible on a laptop screen centered left. The doctor wears a white coat over muted teal scrubs in a simple softly lit consultation room. The laptop screen should be large and the doctor's face easily recognizable even when the whole image is small on mobile. Simple plausible video call layout with small neutral controls only, no text, no logos, no clinical documents, no patient information. A quiet lived-in home, wooden table, a small plant, off-white wall, natural daylight. Both people at ease and attentively talking, not posed at the camera. Restrained sage green, cream, natural wood and navy palette. Realistic skin texture, unretouched magazine photography, calm composition. Fictional adults, no resemblance to known real people. Avoid futuristic effects, floating interface cards, large empty space, extra devices, duplicated faces, elaborate UI, readable text, stock-photo exaggerated smiles. This is a conceptual scene, not a screenshot of software.

## Publicación como V4 — 2026-09-05 UTC

Pablo autorizó compartir esta variante en `https://alvia.ar/v4/` e integrarla a `main`, conservando V3 como portada. La agenda se copia a `assets/agenda.png` y se sirve como WebP; V4 queda autocontenida. Se agregan metadatos Open Graph y `assets/compartir.jpg` (1200 × 800, exportado de la imagen conceptual ya aprobada) para compartir el enlace. Se conserva `noindex, nofollow`.

El empaquetado desde un commit usa `scripts/package_v4.py`; incluye sólo archivos usados y un manifiesto SHA-256. No publica los generadores ni esta documentación. Detalle, commits y rollback en [el registro del release](../docs/releases/2026-09-05-v4.md).

## Mensajes recuperados de V3 — 2026-09-05 UTC

Después de comparar V3 y V4, Pablo aprobó explicitar tres ideas en los bloques existentes:

- Agenda: «Tu equipo ve los horarios disponibles y las reservas de tu red».
- Capacidad médica: «Más consultas dentro de tu red y menos presión sobre la guardia presencial».
- Atención médica: «Cada atención queda registrada, con el paciente, el profesional y la fecha».

Se reemplazan las frases genéricas de capacidad y pie de agenda, y se suma una frase sobre el registro de la atención junto a las herramientas del médico. Se mantiene el lenguaje simple, sin nuevas secciones ni recursos multimedia.

Verificación del ajuste: Chrome a 1440, 390 y 320 px; las tres frases presentes, sin desborde horizontal ni errores de recursos o JavaScript. Capturas de los dos bloques en `/tmp/alvia-v4-copy-review/`.

## Portada y recorrido automático — 2026-09-05 UTC

Pablo pidió que la web principal redirija a V4 y que V3 quede disponible mediante `/v3/`. El cambio de Nginx se limita al destino de `location = /` en el bloque institucional de apex y www: `return 301 https://alvia.ar/v4/;`.

El explorador recorre Inicio → Identidad → Autorización → Copago → Recetas → Inicio, con siete segundos por pantalla. La barra verde de la opción activa empieza completa y se achica con el mismo reloj que determina el avance. La pantalla y su texto aparecen con una entrada suave de opacidad y desplazamiento de 10 px; los medios precargados se conservan.

Seleccionar cualquier pantalla, incluso la actual, detiene el automático. Sólo «Reproducir recorrido» lo vuelve a activar. «Pausar recorrido» permite detenerlo sin cambiar de pantalla. El reloj también se suspende fuera de vista, en una pestaña inactiva, durante la ampliación y mientras se interactúa con los controles de la pantalla. Con preferencia de movimiento reducido comienza pausado y omite las transiciones. Sin JavaScript se mantiene el selector manual nativo.

Verificado en Chrome a 1440, 390 y 320 px: ciclo completo de cinco pantallas y vuelta a Inicio, barra decreciente, videos en reproducción, selección manual detenida durante más de siete segundos, reanudación explícita y pausa al ampliar. Sin nuevas descargas de imágenes/videos durante el ciclo, errores ni desborde. Selector manual comprobado con movimiento reducido y sin JavaScript. Evidencia: `/tmp/alvia-v4-autoplay-review/`.

La comprobación pública detectó que Cloudflare conservaba JS/CSS con la versión anterior de sus URLs. Se actualiza el identificador de ambos a `20260905-tour-autoplay` para servir el recorrido nuevo sin requerir recarga forzada. Al verificar hashes públicos deben usarse las URLs con versión que referencia el HTML, porque Cloudflare conserva por separado las URLs antiguas.
