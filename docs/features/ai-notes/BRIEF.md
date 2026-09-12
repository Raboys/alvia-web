# AI Notes · brief V5

2026-09-12. Página: `v5/ai-notes.html`. Estado: versión corregida; publicación y commits autorizados por Pablo. Resultado en README y registro de release.

## Dirección de Pablo

La página vende **tecnología al servicio de la atención médica**: documentación automatizada, consultas más ágiles, menos trabajo administrativo, más atención del médico y mejor información para construir la historia clínica. Incluye los estudios que el paciente manda por email o WhatsApp antes de la consulta.

Pablo rechazó la primera redacción por exceso de texto, condescendencia y juegos de palabras. Se eliminaron los titulares «La conversación, resumida. El criterio, del médico», el recorrido de revisión/firma, la historia ilustrada duplicada y el diálogo desplegable. Esta corrección reemplaza la dirección editorial inicial del plan para esta página. Las reglas reutilizables de tono, longitud y selección de secciones quedan en `v5/DESIGN.md`, apartado «Reglas para continuar las páginas».

Referencia revisada por pedido explícito: [1doc3](https://www.1doc3.com/), 2026-09-12. Aplicación: beneficio primero, capacidades concretas en pocas líneas, demostración y CTA. No se importan sus métricas, testimonios ni condiciones comerciales.

## Página implementada

- **Hero:** «Automatizá la documentación de la consulta.» Una bajada explica el resumen automático y su propósito: menos trabajo administrativo, consultas más ágiles y más tiempo para atender.
- **Ejemplo AI Notes:** dos párrafos seleccionables de una consulta de control. Botón copiar real, sin simulación de escritura en vivo. Una sola línea explica que el médico revisa el resumen, completa y firma la historia.
- **Estudios:** dos archivos del mismo paciente recibidos el día anterior por email y WhatsApp. El texto explica disponibilidad para preparar la atención y completar la historia. No se representa lectura automática de PDFs por AI Notes: la médica los revisa y lo conversado alimenta el resumen.
- **Consentimiento:** un único `details` con activación por consulta, consentimiento expreso y apagado terminal con continuidad de llamada. Es detalle de uso y no una sección comercial extensa.
- **Cierre:** «Sumá AI Notes a tu servicio de telemedicina.» WhatsApp y correo existentes.

Automatización describe la síntesis. El producto vigente no escribe ni firma autónomamente la historia clínica. Se presentan los beneficios operativos como propósito de las funciones, sin porcentajes, mediciones de velocidad ni resultados clínicos inventados.

## Composición

Dos escenas HTML/CSS abiertas, sin imágenes nuevas: resumen a la derecha del hero y estudios a la izquierda del segundo bloque. Se mantiene V5: blanco, azul/naranja, Lora y DM Sans locales, contenedor de 1160 px. En móvil, primero el mensaje y luego la demostración con texto legible.

El caso ficticio es Sofía Giménez, atendida por Dra. Lucía Rivas el 12/09/2026; archivos recibidos el 11/09. No se muestran resultados, medicación ni recomendaciones para el visitante. El guion fuente permanece en `fixture.json`, fuera del runtime.

## Fuentes funcionales

Producto: `f5e854a813a08e57111044601eb982ba1924fba3`, checkout `/home/pablo/.t3/worktrees/telemed-starter/t3code-c7adfa3e`.

- `frontend/doctor/src/ai-notes-panel.jsx`: narrativa de sólo lectura y copia; `onUseAi` marca uso, no escribe la historia.
- `frontend/doctor/src/ai-lifecycle.js` y `screen-video.jsx`: activación, resumen y apagado terminal.
- `backend/src/AiNotes.php`, `app/src/app/legal/ai-terms.tsx`: consentimiento expreso por consulta registrado por el médico.
- `frontend/doctor/src/panel-historia.jsx`: redacción y firma del médico.
- `frontend/doctor/src/panel-estudios.jsx`: bandeja por paciente, email/WhatsApp, adjuntos y links.
- `docs/archivado/estudios-adjuntos.md`: documentación funcional construida, acceso antes/durante/después; contrastada con el panel vigente.

Fuente institucional al inicio: `626cd3bb0715f60bd982c85cfe743d3c26c25263`, rama `feat/v5-feature-pages-plan`. Se adelanta AI Notes a Validaciones por pedido de Pablo; sólo su entrada tiene enlace. Validaciones y Recetas siguen pendientes.

Verificación y límites de publicación en [README.md](README.md); autoría en [PROVENANCE.md](PROVENANCE.md).
