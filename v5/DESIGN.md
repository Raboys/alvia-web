# V5: decisiones de diseño, mensaje y continuidad

Actualizado: 2026-09-20 UTC. Esta es la referencia para seguir iterando la **V5 aprobada y publicada**. Resume las decisiones de Pablo, su aplicación y los detalles necesarios para mantener la dirección. Una nueva instrucción de Pablo puede cambiar estas decisiones; este documento no agrega aprobaciones ni congela el diseño.

## Decisión vigente para iterar funcionalidades

Pablo eligió **A refinada de Astra** para Validaciones, publicada desde `a47eb69` el 2026-09-20 UTC. Usar
[la decisión y sus criterios transferibles](../docs/design/validaciones-astra-a/README.md)
como referencia de composición y acabado. Reemplaza el antiguo relato de «reglas de cobertura»,
el panel de comprobantes y el mock GLM rechazado. No es una plantilla rígida para otras páginas.
[Publicación y rollback](../docs/releases/2026-09-20-validaciones-astra-a.md).

## 1. Empezar acá

- Portada: <https://alvia.ar/> y <https://www.alvia.ar/>. Las features usan `/ainotes`, `/validaciones`, `/recetas` y `/turnos-inteligentes`; `/v5` es sólo compatibilidad por redirección.
- Repositorio: `Raboys/alvia-web`. La fuente de esta página es **`v5/`**.
- Clone de autoría: `/home/pablo/dev/alvia-web`. Worktree utilizado en esta iteración: `/home/pablo/dev/alvia-web-v5`.
- Runtime vigente: `a47eb691a646de5d42946cc830af107795577416` (Validaciones A refinada). El hito anterior de calculadora C, menú móvil y chevrones B fue `41a6d8386668c08ff3484007165c551678dddbae`. Base visual aprobada: `c2817c16b87c28a2235a03433018047e4e725fbe`. Integrada con la documentación mediante [PR #20](https://github.com/Raboys/alvia-web/pull/20), merge `0673bc409a0b5b75e7890c20213217a2850d24c9`.
- [Capturas de la versión aprobada](../docs/design/v5-baseline/README.md), [ejecución y assets](README.md), [publicación y rollback](../docs/releases/2026-09-12-v5.md).
- Guía editorial transversal: [telemed-starter/docs/COPYWRITING.md](https://github.com/Raboys/telemed-starter/blob/main/docs/COPYWRITING.md). Copia local de autoría: `/home/pablo/dev/telemed-starter/docs/COPYWRITING.md`.

`telemed-starter/web-v2/`, los planes V2/V3 y los experimentos V4 son antecedentes. No describen la dirección vigente. Para continuar esta página, partir de V5 y de sus capturas, no reconstruir una variante anterior.

## 2. Decisiones tomadas con Pablo

| Decisión | Motivo y consecuencia para V5 |
|---|---|
| Adoptar muy de cerca el estilo visual, comunicativo y de marketing de **1doc3** | Pablo lo prefirió explícitamente a todas las variantes de Alvia, especialmente V4. La referencia elegida es [1doc3.com](https://1doc3.com/), observada durante esta sesión. |
| Hablar primero al comprador B2B | La página debe resolver problemas de obras sociales, prepagas y otras organizaciones: oferta de atención, uso de su red, gestión y valor de la cobertura. Las personas aportan humanidad a la imagen; la promesa principal se dirige a quien contrata. |
| Descartar «La salud más cerca. La vida sigue.» como portada | Pablo señaló que no resolvía nada a nuestros clientes. Una frase emocional genérica no sustituye la propuesta comercial. |
| Conservar «sin ampliar tu estructura» como beneficio concreto | Se propuso transitoriamente «Resolvé más consultas sin ampliar tu estructura». El concepto permanece en la bajada y en el recorrido, pero ese no es el titular final. |
| Adoptar «Un servicio de telemedicina que sí te funciona.» | Pablo propuso «Un servicio de telemedicina que te resuelve los problemas» o «que te funciona». Se eligió la segunda formulación, con «sí», y se publicó con su aprobación. La primera quedó como alternativa conversada, no como texto aprobado para reemplazarla. |
| Ordenar la oferta en tres ejes | Más turnos y consultas sin ampliar estructura; tecnología al servicio de gestión y atención; valor agregado para los afiliados. Son los criterios para seleccionar y ordenar el contenido. |
| Comunicar **valor agregado**, en lugar de centrar la promesa en **calidad** | Pablo corrigió expresamente su formulación inicial «que los afiliados perciben como mejor calidad» por «como valor agregado». No reinterpretar esa corrección como una promesa de mejores resultados clínicos. |
| Aplicar la guía contra el texto de relleno | Pablo recordó el Markdown de copywriting y pidió evitar textos por todos lados y «aclaraciones de aclaraciones». Se podaron etiquetas, bajadas duplicadas y leyendas que explicaban lo evidente. |
| Vender la propuesta mientras se construye | Pablo pidió desarrollar las ideas y los textos que faltaran y permitió un relato comercial ambicioso, incluso diciendo que no había que tener miedo de mentir. El criterio de continuidad es no convertir la web en una lista de pendientes de ingeniería. La implementación publicada no necesitó inventar clientes, testimonios ni resultados históricos: usa beneficios, producto ilustrado y capacidad calculada. Esto describe lo implementado, no una restricción adicional acordada con Pablo. |
| Elegir la alternativa C para explorar funcionalidades | Pablo pidió reemplazar la flecha diagonal por tarjetas completas clickeables, con «Explorar Validaciones / AI Notes / Recetas» al pie y flecha horizontal. |
| Aprobar el diseño completo y llevarlo a ambos dominios | Tras ver V5, Pablo la aprobó y pidió publicarla inmediatamente en `alvia.ar` y `www.alvia.ar`. V5 pasa a ser la base de las siguientes iteraciones. |

La aprobación alcanza la composición y el recorrido publicados. La calculadora, las pestañas y los detalles gráficos fueron decisiones de implementación incluidas en ese resultado; no son citas ni requisitos individuales pedidos inicialmente por Pablo.

## 3. Mensaje y jerarquía comercial

### Portada acordada

**Titular:**

> Un servicio de telemedicina que sí te funciona.

**Bajada:**

> Ampliá tu oferta de turnos y consultas sin ampliar tu estructura. Tecnología al servicio de la gestión y la atención, con un valor agregado para tus afiliados.

**Acción:** «Quiero conocer Alvia».

**Aclaración que sí diferencia la oferta:** «Tu red médica, la red Alvia o ambas.»

La imagen lleva «Un médico, desde donde estés.» como beneficio para el afiliado. Es un apoyo a la imagen, no el mensaje principal para el comprador.

### Cómo desarrollar los tres ejes

| Eje | Qué necesita comprender el comprador | Mecanismo que lo hace concreto |
|---|---|---|
| Oferta | Puede ofrecer más turnos y consultas con su capacidad disponible | Horas libres de sus profesionales convertidas en atención online; red Alvia para ampliar horarios o especialidades. |
| Gestión y atención | La tecnología acompaña la operación cotidiana | Agenda, coberturas, autorizaciones, copagos y recorrido hasta la receta, con información en un mismo lugar. |
| Valor agregado | La cobertura tiene un beneficio adicional que el afiliado puede usar | Consultar desde casa, elegir un turno y tener la receta en el celular. |

El alivio sobre la guardia es un beneficio de la oferta virtual para consultas que no requieren presencialidad. «Sin ampliar estructura» se explica con capacidad disponible y atención online; no significa que sumar profesionales o prestaciones no tenga costo.

Los modelos comerciales siguen siendo red propia, red Alvia 24/7 y combinación de ambas, bajo las reglas de la organización. La amplitud comercial proviene del brief `telemed-starter/docs/WEB_V2.md`; su antigua estética no gobierna V5.

### Voz y poda

Español argentino, voseo y vocabulario del comprador: turnos, consultas, médicos, red, cobertura, afiliados. Verbos concretos: ampliá, organizá, ofrecé, sumá. Las funcionalidades aparecen cuando explican cómo se obtiene el beneficio.

Aplicar la regla de la guía: **«Una línea permanece si orienta, diferencia, demuestra, reduce riesgo o mueve la decisión.»** La brevedad no reemplaza la claridad ni la información necesaria para decidir.

Cambios efectivos de esta ronda:

- Se quitó la etiqueta «Telemedicina para organizaciones» sobre un título que ya explica el servicio; el público está visible en la franja de organizaciones.
- Se quitó «Una solución para» antes de esa franja.
- Se quitaron bajadas que repetían el beneficio del título.
- Se quitaron las frases de cierre de cada modalidad cuando sólo reformulaban su texto.
- Se quitó el título genérico sobre las pestañas por organización: cada propuesta tiene su propio mensaje.
- Se oculta la etiqueta de organización cuando la pestaña seleccionada ya da ese contexto; sin JavaScript se conserva para distinguir los bloques.
- La aclaración de la calculadora se concentra en los supuestos necesarios para interpretar el número.

Al añadir contenido, resolver primero qué decisión ayuda a tomar. Evitar armar automáticamente una etiqueta, título, bajada, tarjetas y aclaración para cada idea. Tampoco agregar avisos del proceso de desarrollo en el recorrido comercial.

## 4. Dirección visual

La impresión buscada es **luminosa, cercana, activa y comercial**. El blanco domina; azul y naranja organizan la lectura. Se mantiene presencia humana y una demostración clara del producto. El tono contenido, crema y verde apagado de V4 deja de ser la referencia de esta página.

### Paleta implementada

| Variable o uso | Valor | Función |
|---|---|---|
| Fondo principal | `#ffffff` | Continuidad entre imagen y página; aire. |
| `--ink` | `#172133` | Titulares y elementos de contraste. |
| `--body` | `#4c5667` | Lectura de párrafos. |
| `--blue` | `#3778ef` | Marca, trazos y elementos gráficos. |
| `--blue-text` | `#2865ce` | Énfasis de titulares, enlaces y selección. |
| `--pale` | `#edf4ff` | Calculadora y cierre. |
| `--orange` | `#ffad16` | Botones principales y acentos. El texto del botón es oscuro. |
| `--line` | `#e3e9f2` | Separadores discretos. |
| Fondo de organizaciones | `#f8faff` | Diferencia suave entre secciones. |

### Tipografía y escala

**Lora regular** para los titulares principales; **DM Sans** para párrafos, navegación, controles y subtítulos funcionales. Ambas se sirven localmente, con `font-display: swap`. No hay dependencia de Google Fonts en tiempo de visita.

| Elemento | Base de escritorio | Adaptación |
|---|---|---|
| H1 | 60 px, interlínea 1.09, tracking −2.7 px | 52 px hasta 1100; 44 px hasta 900; `clamp(37px, 8.9vw, 54px)` hasta 650; 35 px hasta 359. |
| H2 habitual | 44 px, interlínea 1.2, tracking −1.5 px | Se ajusta por bloque; cerca de 32 px en móvil. |
| Bajada del hero | 18 px, interlínea 1.65, ancho máximo 495 px | 16 px en móvil; 15 px en el ancho menor. |
| Texto general | 17 px, interlínea 1.6 | Párrafos de beneficios entre 14 y 16 px según ancho. |
| Marca `alvia.` | DM Sans 700, 44 px, tracking −3.4 px | 38 px en móvil; palabra azul y punto naranja. |

Estos son valores de la implementación aprobada, no tamaños a aplicar ciegamente a cualquier bloque. La autoridad para el detalle exacto es [styles.css](styles.css).

### Composición y recursos

- Contenedor principal de hasta **1160 px**, con márgenes amplios. A 1440 px quedan 140 px a cada lado.
- Navegación blanca fija al desplazarse, con separador fino; 80 px de alto en escritorio y 66 px en móvil pequeño.
- Hero en dos columnas: mensaje y CTA a la izquierda, fotografía a la derecha. El texto comienza cerca de la parte superior de la imagen; no se centra artificialmente en un bloque vacío.
- «sí te funciona.» se destaca en azul, con un subrayado naranja fino y curvo. Ese es el foco visual del titular.
- Fotografía sobre blanco, sin tarjeta ni marco. Una pareja con celular; luz clara, piel y ropa naturales. El mismo asset se reutiliza en el cierre.
- Trazos simples de azul/naranja, una línea azul al pie de la fotografía y tres pequeños cuadrados escalonados. Dan identidad sin competir con el mensaje.
- Separadores gráficos de dos trazos azul/naranja. No llevan etiquetas textuales decorativas.
- App de proporción real, sobre una superficie circular azul tenue. Sus dos vistas están juntas en un único bloque de demostración.
- Iconos SVG de línea, finos, azules y con pequeños acentos cálidos. Evitar mezclar estilos, emojis y símbolos apilados.
- Botones naranjas redondeados y acción legible con **chevrón discreto** a la derecha (alternativa B elegida por Pablo el 2026-09-12). Reemplaza la flecha diagonal en todos los CTA, enlaces de texto, ingreso y accesos del footer. SVG de 15 px, trazo 1,7 y separación de 12 px en botones, 8 px en links y 7 px en accesos. Los enlaces secundarios siguen azules y tienen subrayado visible; al hover gana contraste. El chevrón avanza 2 px al hover y se mantiene quieto con movimiento reducido. El cambio conserva textos y destinos. Las tarjetas de funcionalidades conservan su flecha horizontal y el enlace en toda la tarjeta, ya aprobados.
- Secciones anchas y abiertas, con pocas superficies contenidas. No convertir todos los beneficios en tarjetas idénticas.
- Movimiento breve en controles y hover; sin recorrido automático, carruseles ni animación que obligue a esperar para entender la oferta. Se respeta `prefers-reduced-motion`.

### Responsive

La dirección se conserva al apilar; no se diseña una página distinta. En móvil, primero titular, bajada y CTA, después la fotografía. Los beneficios, la calculadora, las modalidades y las preguntas pasan a una columna. Las pestañas por organización quedan en una grilla 2 × 2 y el cierre pone el mensaje antes que la foto.

Breakpoints implementados: 1500, 1100, 900, 650 y 359 px, más el ajuste del hero a partir de 901 px. Revisar especialmente 1440, 1024, 768, 390 y 320 px. En 320 px, controlar también la leyenda junto a los cuadrados de la foto y las cifras largas del cálculo.

## 5. Qué hace cada sección

| Sección / ancla | Función comercial | Presentación y comportamiento |
|---|---|---|
| Hero | Explicar qué es Alvia y abrir la conversación | Titular acordado, bajada, CTA, modalidades y foto. Sin eyebrow. |
| Franja de públicos | Aclarar a quién se dirige | Obras sociales, prepagas, clínicas/sanatorios, empresas y gobiernos. Son segmentos, no logos de clientes. |
| `#beneficios` | Desarrollar oferta, gestión y valor | Cuatro beneficios: turnos, guardia, gestión y afiliados. App con selector «Atención / Receta» mediante radios nativos. |
| `#capacidad` | Hacer tangible la capacidad disponible | Calculadora sobre fondo azul claro. Resultado potencial con datos del comprador. |
| `#tu-red` | Explicar cómo contratar y operar | Tres modalidades en columnas, más una línea sobre coberturas, autorizaciones y copagos. |
| `#organizaciones` | Traducir la oferta a cada comprador | Cuatro pestañas, una propuesta visible a la vez. Flechas, Home y End operables por teclado. |
| Preguntas | Resolver objeciones de contratación | Médicos propios, reglas de cobertura, tecnología y primera reunión. `details/summary` nativos. |
| `#contacto` | Cerrar con una acción concreta | Mensaje de valor, fotografía y «Hablemos de tu organización». |
| Footer | Mantener contacto y accesos | Enlaces internos, correo, WhatsApp y acceso médico. |

No volver al recorrido de V4 que enseñaba identidad, autorización, copago, recetas, estudios e IA por separado. Ese detalle puede servir a una demo específica; la portada actual prioriza la decisión de contratar.

### Calculadora

```text
turnos por mes = profesionales × floor(horas semanales × 60 / minutos del turno) × 4
```

Valores iniciales: 20 profesionales, 2 horas por semana por profesional y turnos de 20 minutos → **480 turnos potenciales por mes**. Límites: 1–10.000 profesionales enteros; 0,5–80 horas en pasos de 0,5; turnos de 15, 20, 30, 45 o 60 minutos. Se redondea por profesional y semana antes de multiplicar.

La salida dice «turnos que podrías ofrecer por mes». Es capacidad, no ocupación, consultas completadas ni ahorro. Si un valor queda vacío o inválido, se retira la cifra anterior. Los números largos reducen su tamaño para entrar en móvil. Sin JavaScript se muestra un ejemplo estático y se ocultan los controles inactivos.

### Conversión

Los CTA abren WhatsApp a **+54 11 3357 8538**, con mensajes ajustados al bloque o segmento. Correo: `hola@alvia.ar`. Ingreso médico: `https://doctor.alvia.ar/`. No se incorporó formulario, backend de leads ni medición de conversión en esta iteración.

## 6. Mapa de edición y assets

| Archivo | Responsabilidad |
|---|---|
| [index.html](index.html) | Copy visible, estructura, imágenes, metadata, enlaces y estados iniciales. |
| [styles.css](styles.css) | Paleta, tipografía, composición, responsive y selección nativa de pantallas. |
| [script.js](script.js) | Menú, cálculo y pestañas. Sin dependencias externas. |
| [assets/people.webp](assets/people.webp) | Fotografía propia, 1100 × 1100, aproximadamente 75 KiB. |
| [IMAGE_PROMPT.md](IMAGE_PROMPT.md) | Prompt exacto usado con `image_gen` integrado. |
| `assets/app-home.webp`, `assets/app-prescription.webp` | Capturas de V4-C renderizadas desde componentes reales con datos de demostración. |
| `assets/fonts/` | Lora y DM Sans, archivos WOFF2 y licencias SIL OFL. |
| [scripts/package_v5.py](../scripts/package_v5.py) | Empaquetado desde un commit: runtime, referencias, licencias y manifiesto. |

La fotografía generada original quedó en `/home/pablo/.codex/generated_images/01a09411-525a-7df3-ad30-2e62c9e438c4/exec-9cee2521-30ce-4fd7-9a36-a4485a4ca255.png`. El sitio usa la copia WebP versionada, no ese archivo externo. Para nuevas imágenes, conservar esta relación entre prompt, original y asset de runtime; la composición y los textos se hacen en HTML/CSS, no dentro de la fotografía.

## 7. Continuar una iteración

1. Leer este documento y la guía de copywriting; mirar las capturas de escritorio y móvil de la base aprobada.
2. Identificar qué mensaje, beneficio o decisión del comprador mejora el cambio pedido. Distinguir una corrección de copy, una incorporación comercial y un cambio de dirección visual.
3. Trabajar en `alvia-web/v5/` desde `main` actualizado. Conservar el material de otras versiones como historia.
4. Revisar el bloque modificado en contexto, no sólo de forma aislada: repetición de ideas, jerarquía del CTA, proporción de la imagen y longitud total del recorrido.
5. Para cambios de UI, comprobar escritorio/móvil y las interacciones afectadas. Para cambios sólo de documentación, validar enlaces, exactitud y referencias; no hace falta repetir las pruebas de producto.
6. Actualizar este documento si cambia una decisión, el README si cambia cómo ejecutar y el registro de release si cambia lo publicado. Guardar una nueva captura si cambia la composición aprobada.
7. Empaquetar el runtime desde el commit a publicar y actualizar sólo el enlace de V5. La [guía de publicación](../docs/releases/2026-09-12-v5.md) distingue la actualización del contenido y el cambio del destino de portada.

La aprobación existente evita volver a preguntar por la referencia, la paleta, el titular vigente o los tres ejes cada vez que se retoma el trabajo. Si Pablo los cambia, incorporar la nueva decisión y dejar constancia de qué reemplaza.

## 8. Estado y temas aún no definidos

- **Diseño y mensaje:** aprobados. Las hipótesis comerciales no se midieron con experimentos de conversión durante esta sesión.
- **Publicación:** ambos dominios llevan a V5. Al publicar AI Notes, las rutas de versiones retiradas (incluida V4) ya redirigían a V5; se conservó esa configuración. No se modificaron app, backend ni consolas.
- **Indexación:** el HTML conserva `noindex, nofollow`, heredado de la publicación para revisión. La promoción a portada sólo cambió la redirección; no se tomó una decisión nueva sobre SEO.
- **Prueba comercial:** no hay testimonios, logos de clientes, satisfacción ni ahorros históricos publicados en V5. Los números de la calculadora son una estimación explícita y 24/7 describe la oferta de red Alvia.
- **Siguientes ideas:** no quedó acordada otra variante, nuevo eslogan, nuevas métricas, integración de analytics ni reemplazo de las fotos. No tratarlas como tareas ya solicitadas.

Las comprobaciones técnicas y capturas documentan que la página funciona y cómo se ve. La preferencia de Pablo está registrada en la aprobación; ninguna de esas evidencias demuestra por sí sola conversión o resultados clínicos.

## 9. Ampliación de features · 2026-09-12, publicada para revisión

Pablo pidió profundizar las features de paciente y médico en subpáginas, con una entrada vistosa pero secundaria en la home. El orden acordado es **Validaciones (identidad, código de credencial y copagos) → AI Notes → Recetas**. Cada página se desarrollará en una corrida posterior, que decidirá su copy, capturas y mocks a partir de la [guía high level](PLAN_FEATURES.md).

El bloque implementado para revisión se ubica después de `#tu-red`, antes de `#organizaciones`, con título «Mucho más que una videollamada». Usa tres pequeñas ilustraciones HTML/CSS: requisitos de acceso, resumen de AI Notes y receta en el celular. En escritorio son columnas abiertas; en móvil, filas con miniatura lateral. No agrega assets raster ni JS, y mantiene el hero, calculadora y modalidades.

**Decisión posterior explícita:** los tres elementos no llevan a nada hasta desarrollar sus páginas. Son `article`, sin flechas, botones o enlaces de mentira. No crear fichas provisorias, derivar a V4 ni mostrar «próximamente». Al terminar una página, convertir solamente su entrada en enlace real. El footer enlaza al bloque, no a las páginas pendientes.

Esto desarrolla el criterio de mantener el detalle fuera de la home; no recupera el recorrido largo de V4. Se conserva de V4 el antecedente de mocks simplificados cuando explican mejor el producto. Pablo pidió publicarlo en V5 para verlo. El bloque está publicado y verificado; la publicación para revisión no se registra como aprobación final de la composición. [Evidencia de revisión](../docs/design/v5-features/README.md).

## 10. AI Notes · corrección editorial de Pablo

En la implementación de la subpágina, Pablo rechazó el tono de «La conversación, resumida. El criterio, del médico» y «El resumen acompaña. El médico decide qué queda»: demasiado texto, condescendencia y juego de palabras. Esta corrección es la dirección vigente para continuar las features.

Se priorizan beneficios operativos concretos: **tecnología al servicio de la atención médica, documentación automatizada, consultas más ágiles, menos trabajo administrativo y más tiempo para atender**. Los estudios que el paciente manda por email o WhatsApp antes de la consulta se presentan junto con AI Notes para explicar cómo se completa la historia clínica.

Aplicación publicada: hero «Automatizá la documentación de la consulta», resumen de dos párrafos, bloque de estudios previos y CTA. La responsabilidad médica se explica una sola vez; activación y consentimiento se consultan en un `details`. Se quitaron el recorrido didáctico, la historia clínica duplicada y la conversación desplegable. Fuentes del producto y [brief vigente](../docs/features/ai-notes/BRIEF.md) distinguen síntesis automática de firma/escritura autónoma.

AI Notes se publicó por pedido de Pablo y tiene enlace desde home. Runtime `a4ca4aa`; Validaciones y Recetas siguen pendientes. El release anterior se conserva. La verificación técnica no se interpreta como medición de conversión.

### Reglas para continuar las páginas

- **Beneficio concreto en el titular.** Hablar de lo que la organización y el médico resuelven: trabajo administrativo, preparación de la consulta, disponibilidad de información y atención del paciente.
- **Prosa directa.** Evitar juegos de palabras, frases partidas para que suenen como un lema, antítesis repetidas y lenguaje poético o condescendiente. «El criterio, del médico» y «El resumen acompaña» son ejemplos rechazados, no alternativas para reutilizar.
- **Menos extensión.** No convertir una feature en un tutorial. En AI Notes bastan el mensaje principal, dos demostraciones y la acción comercial. La cantidad de secciones se decide por lo que falta explicar, sin una plantilla ni un límite de palabras universal.
- **No repetir responsabilidades.** La revisión y firma del médico se explican una sola vez. Los detalles de activación que no necesitan protagonismo comercial pueden ir en un desplegable accesible.
- **Unir capacidades cuando mejoran la misma tarea.** La recepción previa de estudios por email/WhatsApp y el resumen de la conversación ayudan a construir la historia; se muestran juntos, con el mismo paciente. No atribuir a AI Notes una interpretación automática de archivos que la demostración no realiza.
- **La referencia es 1doc3 en su forma de vender.** Beneficio visible, explicación corta, evidencia y contacto; no su vocabulario literal, sus métricas ni una reproducción de todos sus bloques.

Pablo pidió publicar la versión corregida y guardar estas decisiones. La petición posterior autoriza publicación y commits; los resultados técnicos se registran en el release correspondiente.


## 11. Validaciones · aprobada y publicada el 2026-09-12

Se implementa [validaciones.html](validaciones.html) según PLAN_FEATURES: «Ofrecé atención online con las reglas de tu cobertura». Hero con comprobante ilustrativo de guardia, tres explicaciones visuales abiertas y CTA comercial. El selector nativo compara una cobertura con copago y otra que no lo exige; no representa una elección del paciente para evitar pagar. El texto del código sólo indica que se obtiene en la app de la cobertura. Identidad significa documento validado y comparación facial aprobada; no prueba de vida.

Se explican los momentos de pago juntos: al reservar el turno o antes de entrar a la espera de guardia. No se simula un cobro al ingresar a un turno ya reservado. Los requisitos pendientes se explican en un desplegable nativo. Las demostraciones siguen siendo texto HTML legible, sin imágenes nuevas ni JS propio.

Pablo aprobó esta página y pidió publicarla, documentarla, commitear y pushear. Home enlaza Validaciones y AI Notes públicamente; ambas páginas tienen enlace recíproco en el footer. Recetas continúa informativa. Runtime `2d3380d`, con verificación pública y release anterior conservado para rollback. [Brief, autoría y evidencia](../docs/features/validaciones/README.md).


Correcciones posteriores de Pablo: el código de autorización se ilustra con **tres dígitos** (`482`); quitar «En Alvia se llama…» y la aclaración sobre número de afiliado/código de acceso. En copagos, reemplazar la aclaración sobre un segundo cobro por **«Con todos los medios de pago»**. Estas decisiones describen la primera versión. A refinada actualiza el relato y explicita QR, transferencias y tarjetas; no reintroducir las aclaraciones descartadas.


## 12. Recetas · publicada el 2026-09-12

[recetas.html](recetas.html) conserva el lenguaje comercial directo: «La receta de la consulta llega al celular del paciente». El hero une titular, una bajada breve y CTA; debajo, dos superficies legibles muestran preparación médica y recepción del mismo ejemplo. En móvil se apilan y la flecha sigue el sentido de lectura. Se evita sumar un tutorial o volver a contar el funcionamiento de AI Notes.

Los mocks nativos usan datos sintéticos explícitos, sin sustancia, dosis, matrícula o firma ficticias. El documento conserva «Documento de demostración · sin validez legal». Los estados «En preparación / Documento listo» se comparan con radios nativos; el documento listo desaparece durante la preparación. Las acciones reales de la app se explican fuera del mock, sin botones de descarga/compartir inactivos. Un desplegable explica demoras, indisponibilidad y consultas por invitación.

La entrega publicada enlaza las tres páginas desde home y agrega navegación recíproca. No añade imágenes ni JS propio; home no carga los estilos de Recetas. Se verificaron cinco anchos, teclado, sin JS, texto ampliado, movimiento reducido, enlaces y el paquete aislado. [Brief, procedencia y evidencia](../docs/features/recetas/README.md).

Pablo pidió publicar, documentar, commitear y pushear. La página está publicada y verificada en ambos dominios; runtime `5f74ecf`, release anterior `v5-2d3380d` disponible para rollback. Se conservan la historia de las publicaciones anteriores y las evidencias de preview. [Registro de release](../docs/releases/2026-09-12-v5.md#recetas--2026-09-12-utc).


## 13. Acceso a funcionalidades · alternativa C aprobada

Pablo comparó cuatro mocks rápidos sobre la v5 y eligió **C: tarjeta completa clickeable**. El enlace anterior era un título subrayado con una flecha diagonal distante, que no explicaba bien cómo conocer más sobre la función. La nueva composición agrupa ilustración, título, descripción y «Explorar [función] →» con borde suave y esquinas redondeadas.

Cada tarjeta es un único enlace HTML nativo, con nombre accesible tomado de su acción visible. Toda la superficie navega en la misma pestaña; funciona con teclado, sin JavaScript y con apertura en otra pestaña mediante los controles del navegador. El foco rodea la tarjeta. La animación breve se desactiva con movimiento reducido. En móvil se conserva la miniatura lateral; en escritorio son tres columnas con los pies alineados.

Se conservan las ilustraciones, textos descriptivos y destinos existentes. El cambio afecta `index.html` y `features.css`; no agrega JS ni cambia el recorrido de las subpáginas. Las flechas de los CTA comerciales externos no forman parte de esta decisión. [Decisión y evidencia](../docs/design/v5-feature-cards/README.md). Pablo autorizó documentación, commits, push y publicación.

## 14. Recetas · alternativa 3 con dos vistas

Pablo eligió la tercera de cuatro exploraciones y pidió quitar el documento intermedio.
La composición aprobada muestra únicamente el editor médico y la app del paciente:
formulario blanco con buscador, medicación seleccionada, indicaciones y acción naranja;
celular con marco oscuro y documento de aspecto de papel, sobre un fondo azul suave.

Corrección explícita de alcance: trasladar sólo los mocks y su presentación. Se conservan
el header, hero, títulos, párrafos, CTA, condiciones y footer de la página publicada.
La barra para comparar variantes y el hero abreviado del prototipo no se trasladan.

Los campos y la acción naranja del editor son ilustrativos. Por corrección posterior de
Pablo se quitaron «Compará los estados del ejemplo» y sus botones: la app muestra
siempre el documento generado, sin selector, estado pendiente ni JavaScript propio.
Se conservan los datos originales, la leyenda de demostración y el profesional textual,
sin incorporar la firma gráfica del prototipo. Los estilos nuevos se limitan al recorrido.

Publicada en ambos dominios desde `0cd831d`; [capturas, alcance y verificación](../docs/design/v5-prescription-mocks/README.md). El release anterior `v5-f281d8b` se conserva.


## 15. Header · alternativa 4 elegida

Pablo eligió **Nombre + beneficio** entre cuatro mocks y pidió priorizar mobile. Validaciones, AI Notes y Recetas reemplazan los enlaces del header a secciones de la home. En mobile permanecen visibles en tres tarjetas, sin abrir un menú, con Ingresar y Hablemos en la fila superior. Se aplica el mismo header a la home y a las tres subpáginas, con estado activo. [Implementación y evidencia](../docs/design/v5-header-option4/README.md). Pablo pidió documentar, commitear, pushear y publicar. Publicado y verificado en ambos dominios desde `6176676`, con el release anterior `v5-0cd831d` conservado.

## 16. Botones y links — alternativa B

Pablo eligió B (chevrón discreto) y autorizó commit, push, documentación y publicación. La primera implementación reemplazó los 11 enlaces de la portada base; al preparar el release se integró la versión ya publicada `0cd831d`, con Validaciones, AI Notes, Recetas y las dos vistas de la receta. Se conserva además el header mobile de la alternativa 4, publicado durante el preflight (`6176676`). La decisión se extiende a las cuatro páginas: **30 chevrones decorativos** en enlaces y el botón Copiar. También se retira una diagonal puramente decorativa junto al origen del código de autorización. Se preservan destinos, textos, navegación y flechas horizontales existentes.

Publicado el 2026-09-12 a las 20:01:05 UTC desde `8276775`, verificado en ambos dominios. El SVG mide 15 px y queda fuera del nombre accesible. Se mantienen subrayado, foco por teclado y movimiento reducido; no se incorpora JavaScript. [Publicación y rollback](../docs/releases/2026-09-12-chevron-b.md). Comparador histórico: <http://100.71.73.116:8958/?variant=b>.


## 17. Corrección de header · megamenú en mobile

Pablo se arrepintió de las tres tarjetas fijas en mobile y eligió el megamenú visual. Desktop conserva la opción 4, nombre + beneficio. En mobile, «Explorá la plataforma» muestra siempre los nombres Validaciones, AI Notes y Recetas; al tocar abre las tres entradas con miniatura y descripción. Los chevrones de la alternativa B permanecen. Esta decisión reemplaza únicamente el diseño mobile de §15. Publicación, documentación, commit, push y aviso por WhatsApp autorizados explícitamente. [Implementación y evidencia](../docs/design/v5-mobile-megamenu/README.md).

## Calculadora C — 2026-09-12

Pablo eligió la alternativa C: tarjeta blanca, controles circulares +/− para médicos y horas, edición directa y tres opciones de 10, 20 y 30 minutos. Se conserva el cálculo por turnos completos por médico y semana; horas en pasos de 0,5 y médicos en pasos de 1.

Tras revisar `COPYWRITING.md`, se eliminaron el preámbulo, el sobretítulo del resultado, las unidades duplicadas y «de a 30 minutos». Se conserva «Por semana», se muestra «turnos estimados por mes» y el método queda bajo «Cómo se calcula». Pablo pidió retirar también «Veamos el potencial de tu red». El bloque no lleva CTA.

Implementación: `index.html`, `script.js` y `capacity.css`. La calculadora sin JavaScript muestra el ejemplo estático. [Registro de publicación](../docs/releases/2026-09-12-capacity-c.md).

## Gestión inteligente de turnos — 2026-09-12

La cuarta feature vende una tarea concreta: reducir el **ausentismo** y mantener la agenda ocupada. Alvia pide confirmación 24 horas antes; cuando un paciente no responde, ofrece el horario a pacientes de la misma especialidad que tienen un turno futuro y lo asigna al primero que acepta.

Pablo eligió la variante D y pidió lenguaje directo. El hero muestra una agenda dinámica con un turno recuperado, pacientes contactados y confirmaciones en curso. Se descartaron la sección «Controlá las reglas y cada cambio» y la referencia a «modalidad y cobertura» porque agregaban explicación sin mejorar la propuesta comercial.

La home suma una cuarta tarjeta enlazada y una mención independiente en beneficios: «Gestioná turnos y reducí el ausentismo». El header incorpora el acceso en desktop y dentro del megamenú mobile. La página mantiene pocas secciones, no presenta la automatización como una promesa clínica y no incorpora métricas inventadas.
