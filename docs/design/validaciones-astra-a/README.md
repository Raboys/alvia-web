# Validaciones · A refinada

Pablo eligió **A refinada** entre tres variantes realizadas por tres subagentes Astra y pidió
integrarla, documentarla y publicarla. Es la referencia aprobada para continuar Validaciones y
el criterio de acabado para próximas páginas. B sobria y C personalidad no fueron elegidas.

- Fuente final: [`v5/validaciones.html`](../../../v5/validaciones.html),
  [`validaciones.css`](../../../v5/validaciones.css) y
  [`assets/validaciones-identidad.svg`](../../../v5/assets/validaciones-identidad.svg).
- Preview elegida: <http://100.71.73.116:18732/a-refinada/>.
- Comparador de autoría: <http://100.71.73.116:18732/>; no forma parte del runtime público.
- [Publicación y rollback](../../releases/2026-09-20-validaciones-astra-a.md).
- [Decisiones funcionales y verificación](../../features/validaciones/README.md).

## Diseño aprobado

El hero dice «Sabé quién está del otro lado», con la bajada y el CTA ya acordados. Una
identificación genérica y una selfie con el mismo retrato ocupan la otra mitad del hero.
La ilustración representa una sola idea; no contiene párrafos, datos personales ni un DNI oficial.

Debajo hay dos explicaciones abiertas de identidad y credencial. Copagos tiene su propio bloque
con QR, transferencias y tarjetas y los momentos de pago juntos: turno al reservar y guardia antes
de la espera. El desplegable de pendientes es secundario y el cierre vuelve a la demo.

Se retiraron de la propuesta anterior el gran panel de comprobantes, el nombre ficticio, el importe,
el selector con/sin copago y las píldoras de pago. No hacen falta para explicar esta propuesta
comercial. La condicionalidad del copago sigue explícita en el texto.

| Before | After | Why |
| --- | --- | --- |
| Panel alto con contenido pequeño y un vacío bajo el CTA | Hero equilibrado, ilustración grande y explicaciones abiertas | Dar escala a la idea principal y ritmo al recorrido. |
| Hero de la primera propuesta Astra a 60 px, mínimo 545 px | A usa 59 px, interlínea 1.12 y mínimo 530 px en desktop | Afinar el peso entre titular e ilustración. |
| Documento/selfie inclinados 5° y sombras más presentes | 4°, sombras cortas y trazos más finos | Mantener cercanía con un acabado más contenido. |
| Título de credencial compitiendo con el código en móvil | Título a todo el ancho; código junto al párrafo | Evitar quiebres de lectura innecesarios. |
| FAQ más angosta que el resto | FAQ y cierre alineados con el contenido | Mantener ejes verticales claros. |
| Flechas de transferencia de 5 unidades | Trazo de 4 unidades | Igualar el peso óptico del conjunto QR/transferencia/tarjetas. |

## Criterios para futuras páginas

1. **Partir de la página y del contenido.** Elegir la idea principal antes de dibujar bloques.
   No copiar una secuencia fija de etiquetas, títulos, bajadas y tarjetas.
2. **Usar el vocabulario del comprador.** Afiliado, credencial, cobertura, consulta y copago.
   Configuraciones internas como «reglas» no deben ocupar el titular comercial. Aplicar
   [COPYWRITING.md](https://github.com/Raboys/telemed-starter/blob/main/docs/COPYWRITING.md).
3. **Una demostración protagonista.** Darle escala y espacio. Los bordes representan objetos
   concretos —documento, tarjeta o casilla—; no encerrar por defecto toda la página en paneles.
4. **Equilibrar masas y blancos.** El espacio separa ideas. Si queda un vacío grande al lado
   de una columna alta y densa, revisar la composición antes de agregar decoración.
5. **Conservar Alvia.** Blanco dominante, Lora para titulares, DM Sans para texto e interfaces,
   azul `#3778ef`, azul de lectura `#2865ce` y naranja `#ffad16`. Fuentes locales.
6. **Dibujar una familia.** SVG mantenible, siluetas claras, peso óptico comparable y pocos
   detalles. El retrato es un único `symbol` reutilizado para documento y selfie. No recurrir
   a fotos personales o documentos oficiales para ilustrar la identificación genérica.
7. **Resolver mobile como composición propia.** No reducir el desktop hasta hacerlo caber.
   Títulos y explicación deben seguir juntos; redistribuir figuras o códigos cuando compiten
   por ancho. Verificar 1440, 1024, 768, 390 y 320 px.
8. **Interacción al servicio de la lectura.** Menú y desplegable nativos, foco visible y respuesta
   inmediata a teclado. Hover de movimiento sólo con mouse. Feedback de presión sutil y breve,
   transiciones sobre propiedades explícitas y movimiento reducido respetado. No agregar
   animación automática o controles de simulación sin una necesidad de comprensión.
9. **Revisar capturas completas, no sólo tests.** Comprobar escala, continuidad de ejes, aire,
   jerarquía, lectura y siluetas al tamaño real. Los tests técnicos no sustituyen la elección visual.
10. **Integrar la variante exacta.** Mantener metadatos, rutas limpias, header/footer y destinos
    comerciales del sitio real. Versionar el CSS y empaquetar desde un commit verificable.
    Publicar con release atómico; conservar el anterior y registrar evidencia y rollback.

Las guías aplicadas fueron
[emil-design-eng](https://github.com/emilkowalski/skills/blob/main/skills/emil-design-eng/SKILL.md)
y `craft-vector-icons` (`/home/pablo/.codex/skills/craft-vector-icons/SKILL.md`). Son criterios
para decidir y pulir, no una plantilla para uniformar todas las páginas.

La bajada de home queda para una iteración propia. No trasladar automáticamente el titular de
Validaciones al servicio completo ni cambiar el resto del sitio durante una entrega de esta página.

## Evidencia

127 comprobaciones correctas sobre el paquete integrado: cinco anchos, teclado, sin JS,
axe en desktop/móvil, metadatos y navegación. Sólo cambian HTML/CSS de Validaciones y su nuevo
SVG respecto del release anterior; los otros 23 archivos conservan sus hashes.

[Escritorio](1440-full.png), [móvil](390-full.png) y
[comprobaciones del paquete](package-browser-checks.json). Los archivos de imagen son evidencia
de autoría; no se incluyen en el release. El registro de publicación identifica el commit servido
por separado de los commits posteriores de documentación.
