# AI Notes, Recetas y Turnos · ilustraciones nuevas y textos anteriores

Pablo revisó tres propuestas realizadas por tres subagentes y pidió recuperar los textos
anteriores manteniendo las ilustraciones nuevas. Tras revisar la corrección en Tailscale,
autorizó publicar las tres páginas. Esta entrega integra exactamente ese contenido principal.

Publicadas desde `c1cfb07` en [AI Notes](https://alvia.ar/ainotes),
[Recetas](https://alvia.ar/recetas) y [Turnos inteligentes](https://alvia.ar/turnos-inteligentes),
y en `www.alvia.ar`. [Release y rollback](../../releases/2026-09-20-three-feature-illustrations.md).

## Decisiones

| Antes | Después | Motivo |
| --- | --- | --- |
| AI Notes: panel y bandeja densos. | Conversación SVG, resumen HTML y documentos abiertos. | Dar escala al mecanismo sin perder la lectura ni la copia del resumen. |
| Recetas: editor completo y teléfono extenso. | Ilustración documento→celular y explicaciones abiertas. | Mostrar la continuidad de la receta con menos interfaz secundaria. |
| Turnos: agenda y registro operativo. | Calendario→oferta→aceptación, con una escena de adelanto. | Entender un caso concreto sin interpretar un dashboard. |
| Primera preview con titulares y bajadas nuevas. | Titulares, bajadas y cierres anteriores, solicitados por Pablo. | Conservar el lenguaje preferido y adoptar el nuevo trabajo visual. |

Titulares vigentes:

- «Automatizá la documentación de la consulta.»
- «La receta de la consulta llega al celular del paciente.»
- «Controlá el ausentismo y mantené la agenda ocupada.»

La integración conserva header, footer, metadatos y rutas limpias del sitio real. No traslada
los enlaces de Tailscale ni cambia la home o Validaciones. CSS versionado por página.

## Procedencia y alcance

Base de producción: `a47eb69`; integración sobre `fb4af28`, que agrega la documentación de ese
release. Copys anteriores recuperados de las páginas de esa base. Se conservan revisión médica
y consentimiento de AI Notes, distinción emisión/PDF listo y restricciones de invitación en
Recetas, y confirmación 24 h/especialidad/primero que acepta en Turnos.

Las ilustraciones son SVG propios escritos como código, con `craft-vector-icons` y criterios de
[emil-design-eng](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md).
Guía editorial: `telemed-starter/docs/COPYWRITING.md`. Referencia visual: [A refinada](../validaciones-astra-a/README.md).
No hay nuevas imágenes raster, bibliotecas ni operaciones contra el producto.

## Archivos

HTML y CSS en `v5/ai-notes.*`, `v5/recetas.*` y `v5/turnos-inteligentes.*`.
Nuevos assets: `notes-conversation.svg`, `recetas-entrega.svg`, `turnos-oportunidad.svg`.
AI Notes mantiene su script de copia. Recetas deja de cargar `recetas-mocks.css`; el archivo
histórico se conserva en Git pero no se necesita en el paquete.

## Verificación

[Runner vigente](verify.cjs): páginas, rutas, fuentes, ilustraciones, cinco anchos, teclado,
Escape, despliegues nativos, copia exacta y fallback, sin JavaScript, texto ampliado y axe.
Los runners anteriores de AI Notes/Recetas describen las composiciones históricas y no son
la autoridad para los selectores nuevos. La regresión de Validaciones usa su runner vigente.

```sh
ALVIA_V5_ROOT=/ruta/al/paquete/v5 node docs/design/three-feature-illustrations/verify.cjs
ALVIA_V5_URL=https://alvia.ar ALVIA_V5_EVIDENCE=/tmp/alvia-three-public node docs/design/three-feature-illustrations/verify.cjs
```

Variables opcionales: `ALVIA_PLAYWRIGHT`, `ALVIA_AXE`, `ALVIA_CHROMIUM` y `ALVIA_V5_EVIDENCE`.
La copia se prueba con Clipboard API instrumentada y con rechazo/fallback; no se envían mensajes.
Las capturas y checks son evidencia técnica, no medición de conversión.

[Paquete revisado](review/package/browser-checks.json).
[Release y rollback](../../releases/2026-09-20-three-feature-illustrations.md).
