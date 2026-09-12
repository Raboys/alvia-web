# V5 · Guía para desarrollar las páginas de features

Fecha: 2026-09-12. Estado: **home y cuatro funcionalidades publicadas y verificadas en rutas limpias**. Runtime vigente `4239034`: `/ainotes`, `/validaciones`, `/recetas` y `/turnos-inteligentes`. `/v5` y los nombres `.html` redirigen sin romper enlaces anteriores. [Publicación](../docs/releases/2026-09-12-pretty-urls.md). Este documento guía las corridas y registra sus decisiones.

## 1. Encargo y decisiones de esta etapa

Mostrar con más profundidad las capacidades que viven en la experiencia del paciente y del médico, manteniendo la home institucional liviana y orientada a la organización que contrata Alvia.

Orden pedido por Pablo:

1. **Validaciones:** identidad, código de credencial y copagos, reunidos en una página.
2. **AI Notes.**
3. **Recetas.**
4. **Turnos inteligentes:** confirmación 24 horas antes y adelanto automático para reducir el ausentismo.

**Pedido posterior de Pablo:** desarrollar AI Notes en esta corrida, sin esperar a Validaciones. Su corrección editorial posterior prioriza documentación automatizada, menos trabajo administrativo, consultas más ágiles y estudios enviados por email/WhatsApp, con mucho menos texto. Ver [brief vigente](../docs/features/ai-notes/BRIEF.md).

Cada corrida desarrolla **una página completa**: investiga su estado actual, decide relato y composición, produce capturas o mocks, implementa, verifica y documenta. No intentar resolver las tres páginas en una corrida ni dar por definitivos hoy sus titulares o storyboards.

**Corrección explícita de Pablo durante esta etapa:** los tres elementos de la home **no deben llevar a ningún destino todavía**. No crear fichas provisorias, redirigir a V4, poner `href="#"` ni mostrar botones que no hacen nada. Se convierten en enlaces individualmente cuando exista la página correspondiente. No mostrar «próximamente»: lo pendiente es el desarrollo editorial de las páginas.

## 2. Punto de partida y fuentes de verdad

| Fuente | Para qué leerla |
|---|---|
| [DESIGN.md](DESIGN.md) | Dirección vigente V5, decisiones de Pablo, mensaje, tres ejes comerciales, estilos y comportamientos. |
| [README.md](README.md) y [README del sitio](../README.md) | Archivos, ejecución local y relación con las versiones anteriores. |
| [Base visual aprobada](../docs/design/v5-baseline/README.md) | Revisar la home completa antes de diseñar una extensión. No sobrescribir estas capturas. |
| `telemed-starter/docs/COPYWRITING.md` | Guía editorial transversal: una línea permanece si orienta, diferencia, demuestra, reduce riesgo o mueve la decisión. |
| [V4-C: recursos y decisiones](../v4-c/README.md) | Antecedentes de mocks HTML/CSS simplificados para AI Notes y recetas, pedidos por Pablo. Recuperar la legibilidad y el criterio de simplificación. |
| [Publicación V5](../docs/releases/2026-09-12-v5.md) | Qué está publicado, empaquetado y actualización del release. Terminar una página local no equivale a publicarla. |

El sitio pertenece a **`Raboys/alvia-web`**, carpeta `v5/`. El monorepo **`Raboys/telemed-starter`** conserva el producto y los componentes para producir evidencia. `telemed-starter/web-v2/` no es la fuente de esta home.

Base institucional analizada: `91b75f2` de `alvia-web`. Base de producto consultada: `f5e854a813a08e57111044601eb982ba1924fba3`. En esta sesión, el checkout de producto está en `/home/pablo/.t3/worktrees/telemed-starter/t3code-5f61c469`; el trabajo institucional, en `/home/pablo/dev/alvia-web-v5-features`, rama `feat/v5-feature-pages-plan`. Las rutas de worktrees son referencias de esta sesión: localizar el checkout vigente al retomar.

Se realizaron tres análisis paralelos, de sólo lectura: continuidad de diseño V5, evidencia de producto y arquitectura editorial. Coincidieron en ubicar el bloque después de las modalidades de red, mostrar los tres temas juntos y profundizar fuera de la home. La decisión posterior de Pablo sobre enlaces reemplaza la alternativa inicialmente considerada de fichas breves.

## 3. Dirección que se conserva

### Mensaje y público

La home mantiene **«Un servicio de telemedicina que sí te funciona.»** y sus tres ejes:

- Ampliar oferta de turnos y consultas sin ampliar estructura.
- Tecnología al servicio de gestión y atención.
- Valor agregado para los afiliados.

Las nuevas páginas hacen tangible el segundo eje y muestran su efecto en el tercero. El comprador sigue siendo una organización de salud en Argentina. Pacientes y médicos son protagonistas de la demostración; no estamos creando tres landings de venta directa al consumidor.

Las formas de operación siguen siendo **red propia, red Alvia y combinación de ambas**, bajo las reglas de la organización. Explicar su relación con una feature sólo cuando cambie la decisión; no repetir las tres modalidades en cada página.

### Lenguaje

Español argentino y voseo al dirigirse al comprador: «definís», «ofrecé», «conocé». Usar «afiliado» al hablar de cobertura y «paciente» en la relación clínica; «médico» o «profesional» según el contexto. Mantener los nombres **Validaciones**, **AI Notes** y **Recetas** como orientación, con titulares que expliquen un beneficio concreto.

Una idea dominante por sección. No ensamblar automáticamente etiqueta, título, bajada, tres tarjetas y una aclaración. **Corrección vigente tras AI Notes:** titulares de beneficios concretos y prosa directa, sin juegos de palabras, tono poético ni explicaciones condescendientes. Reducir secciones y texto que no cambian la decisión; demostrar funciones juntas cuando resuelven la misma tarea. Ver [las reglas editoriales de continuidad](DESIGN.md#reglas-para-continuar-las-páginas). Evitar lenguaje de arquitectura, slogans genéricos, beneficios clínicos no demostrados y porcentajes de ahorro o velocidad inventados. Las condiciones que cambian la comprensión deben quedar junto al mensaje correspondiente, en pocas palabras.

### Diseño, formato y movimiento

| Elemento | Continuidad V5 |
|---|---|
| Impresión | Luminosa, humana, activa y comercial; blanco dominante. |
| Color | Tinta `#172133`, cuerpo `#4c5667`, azul `#3778ef`, enlaces `#2865ce`, azul pálido `#edf4ff`, naranja `#ffad16`. |
| Tipografía | Lora regular para titulares, DM Sans para lectura e interfaz; fuentes locales. |
| Composición | Contenedor hasta 1160 px; escenas abiertas, aire y pocos marcos. Usar la escala de V5 según la función de cada título. |
| Producto | Pantallas completas cuando importan el contexto y el recorrido; recortes cuando importa un detalle; mocks nativos cuando la síntesis permite entender mejor. |
| Identidad gráfica | Trazos sencillos azules con acentos cálidos, de la misma familia que la home. |
| Interacción | Sólo cuando explica algo: ampliar una imagen, alternar un estado o recorrer un ejemplo. Nada que obligue a esperar, sin autoplay ni carruseles. |
| Móvil | Reorganizar y recortar deliberadamente. El texto decisivo debe poder leerse sin ampliar una captura de escritorio. |

V4 sirve como antecedente de **simplificación de producto**, especialmente los mocks pedidos el 4 de septiembre. Su paleta, su largo recorrido de app y sus experimentos no gobiernan V5. Los modos `strict-gated`, A/B y la orquestación del plan V4 eran parte de aquel experimento; no son requisitos de este trabajo.

De [1doc3](https://www.1doc3.com/), consultada el 2026-09-12, se toma el orden comercial observado: beneficio para la organización, capacidades agrupadas, evidencia y conversación de ventas. Aplicación a Alvia: primero comprender la propuesta, luego elegir qué capacidad explorar. Sus cifras, testimonios y condiciones comerciales no se trasladan a Alvia.

## 4. El bloque de home de esta corrida

Ubicación: **después de `#tu-red`, antes de `#organizaciones`**. El visitante ya entendió la oferta, hizo la cuenta de capacidad y conoció los modelos de red. La frase previa «Siempre bajo tus reglas» introduce naturalmente el producto.

Título: **«Mucho más que una videollamada.»** Tres composiciones pequeñas, con nombre y una explicación breve:

| Elemento | Demostración visual | Mensaje de entrada |
|---|---|---|
| Validaciones | Comprobante ilustrativo con identidad, código y copago. | Las reglas de tu cobertura, desde el ingreso. |
| AI Notes | Fragmento ilustrativo de un resumen de conversación. | Referencia para que el médico escriba la historia clínica. |
| Recetas | Documento ilustrativo y recepción en el celular. | Continuidad entre lo que emite el médico y lo que recibe el paciente. |

Tres columnas abiertas en escritorio, filas compactas con miniatura lateral en móvil. Las ilustraciones son HTML/CSS, decorativas para accesibilidad; el texto exterior contiene el mensaje. No se cargan imágenes, videos ni bibliotecas nuevas. No son capturas literales, documentos clínicos ni una demostración funcional.

En la publicación inicial, el bloque es **informativo y no interactivo** por instrucción de Pablo. No tiene flechas de navegación, cursor de enlace, estados de hover de tarjeta, `tabindex`, botones deshabilitados ni destinos vacíos. Un enlace en el footer permite encontrar el bloque; no lleva a una subpágina. Se preserva la navegación principal para no sumar otra decisión arriba.

**Estado publicado actual:** las cuatro funcionalidades tienen páginas completas y tarjetas enlazadas. Turnos inteligentes comunica confirmación 24 horas antes, horarios recuperados y menos ausentismo. Runtime `ddc8df8`.

Las cuatro entradas enlazan públicamente a sus páginas completas y comparten navegación recíproca.

Implementación: [index.html](index.html), ancla `#funcionalidades`, y [features.css](features.css). Los `article[data-feature]` identifican cada entrada; los tres nombres ya son enlaces reales. El empaquetador incluye la nueva hoja por su referencia desde HTML.

## 5. Arquitectura de las futuras páginas

Rutas propuestas, compatibles con el estático actual:

| Orden | Archivo | Ruta pública | Estado actual |
|---|---|---|---|
| 1 | `v5/validaciones.html` | `/validaciones` | Publicada; enlazada desde home y navegación común. |
| 2 | `v5/ai-notes.html` | `/ainotes` | Publicada; enlazada desde home y navegación común. |
| 3 | `v5/recetas.html` | `/recetas` | Publicada; enlazada desde home y navegación común. |
| 4 | `v5/turnos-inteligentes.html` | `/turnos-inteligentes` | Publicada; enlazada desde home y navegación común. |

En la etapa inicial de la guía estos archivos no se crearon. AI Notes se agregó y publicó en su corrida; Validaciones ya está implementada, publicada y enlazada. Recetas se completó localmente y luego se publicó por pedido de Pablo, con enlaces desde home y las otras features. Se mantienen al mismo nivel que `index.html` para aprovechar el empaquetado actual. Si otra ruta aporta un beneficio concreto, la corrida que la introduzca debe adaptar y verificar el empaquetador.

Cada página tiene que funcionar para quien llega por un enlace directo: marca y contexto de Alvia, beneficio reconocible, evidencia del producto, retorno a la home y CTA comercial contextual. Enlaces entre features sólo hacia páginas que ya existan. Usar WhatsApp y correo existentes; no incorporar un formulario nuevo por defecto.

Piezas posibles del relato, sin convertirlas en plantilla obligatoria:

1. Beneficio principal y una escena que lo pruebe.
2. Recorrido concreto entre paciente, médico y organización.
3. Una o dos escenas complementarias que respondan preguntas nuevas.
4. Condiciones u objeciones específicas que cambien una decisión.
5. Conversación comercial y siguiente paso.

No replicar la home en cada feature ni crear sistemáticamente tres tarjetas «paciente / médico / organización». Mostrar cómo se relacionan los actores dentro de una misma atención.

## 6. Corrida 1 · Validaciones

**Pregunta que debe resolver:** ¿puedo ofrecer atención online manteniendo las reglas de mi cobertura?

La página reúne identidad, código de credencial y copagos. La organización define qué corresponde, el paciente completa los requisitos aplicables y el recorrido de atención aplica esas condiciones. El valor para el médico se explica desde la atención que recibe, sin inventarle un panel de validaciones.

### Decisiones previstas al iniciar la corrida

- El caso de cobertura de demostración y qué requisitos incluye. Los tres mecanismos son configurables; no presentarlos como tres pasos obligatorios para todos.
- Cómo nombrar el **código de credencial** del pedido frente a **«Código de autorización»** en la app. El componente pide el código que el afiliado ve en la app de su cobertura. Explicar la relación una vez; no confundirlo con el número de afiliado o con el OTP de acceso a Alvia.
- Una escena principal que comunique «requisitos resueltos antes de atender» y las escenas necesarias para entender identidad, código y copago. Elegir una composición amplia, recortes o ejemplos simplificados después de revisar legibilidad.
- Cómo explicar el momento del copago: en un turno se resuelve al reservar; en atención espontánea, antes de ingresar a la cola. No simular un segundo cobro al ingresar a un turno ya reservado.
- Qué excepción merece mostrarse para entender el servicio: un requisito no aplicable, un código rechazado o un pago pendiente. No convertir la página en un manual de errores.

### Fuentes iniciales en el producto

| Tema | Fuentes que debe contrastar la próxima corrida |
|---|---|
| Reglas de cobertura | `coverage-gateway/src/policies.ts`, `clearances.ts`, `challenges.ts`; `backend/src/CoverageHelpers.php`. |
| Recorrido del paciente | `app/src/components/guardia/GuardiaConfirm.tsx`, `app/src/components/ui/AuthCodeSheet.tsx`, `PaymentSheet.tsx`; `pagos-y-copago.md`. |
| Identidad | `backend/src/Identity/IdentityService.php`, `app/src/components/identity/IdentityCapture.tsx`, sección de identidad del `README.md`. |

La implementación consultada comprueba el documento y compara el rostro del DNI con una selfie. No respalda una afirmación de **prueba de vida**. El canvas paciente conserva esa expresión antigua: no copiarla. Mostrar un fixture aprobado sólo si representa el estado real de aprobación, no por haber terminado de sacar una foto.

**Cierre editorial de la página:** el comprador distingue los tres mecanismos y entiende que dependen de su cobertura; el paciente reconoce lo que debe hacer; la demostración no mezcla registro de cuenta con autorización para atenderse.

**Entrega aprobada y publicada · 2026-09-12:** [Validaciones](validaciones.html), [brief](../docs/features/validaciones/BRIEF.md), [procedencia](../docs/features/validaciones/PROVENANCE.md) y [verificación](../docs/features/validaciones/README.md). Hero «Ofrecé atención online con las reglas de tu cobertura», comprobante de guardia con identidad aprobada y código validado, selector nativo entre cobertura con/sin copago y tres explicaciones compactas. El caso ficticio de Sofía Giménez distingue la exención del pago aplicado. Turno: al reservar; guardia: antes de encolar. Sin JS propio ni imágenes nuevas. Home y AI Notes enlazan la página públicamente. Runtime `2d3380d`, publicado con las correcciones posteriores de Pablo; manifiesto y evidencias en la entrega.

**Corrección editorial vigente:** código ilustrado de tres dígitos (`482`). Pablo pidió eliminar «En Alvia se llama…» y la distinción explícita de número de afiliado/acceso. El texto visible sólo indica que el afiliado lo obtiene en la app de su cobertura. En copagos, pidió «Con todos los medios de pago» en lugar de la aclaración de segundo cobro.

## 7. Corrida 2 · AI Notes

**Pregunta que resuelve:** ¿cómo reduce Alvia el trabajo administrativo y ayuda a preparar y documentar la consulta?

**Corrección editorial explícita de Pablo en esta corrida:** AI Notes es tecnología al servicio de la atención médica: documentación automatizada, más tiempo para atender, consultas más ágiles y estudios recibidos por email o WhatsApp antes de la consulta. Rechazó el exceso de texto, el tono condescendiente y los juegos de palabras de la primera implementación. Se revisó de nuevo [1doc3](https://www.1doc3.com/) y se reemplazó ese relato por beneficios directos y dos demostraciones.

### Decisiones implementadas

- Hero: **«Automatizá la documentación de la consulta.»** Bajada breve: resumen automático para completar la historia, menos trabajo administrativo y más tiempo para atender.
- Mock nativo AI Notes: dos párrafos del control ficticio de Sofía Giménez, con copiar funcional. Una sola línea externa indica que el médico revisa, completa y firma la historia.
- Estudios antes de la consulta: laboratorio por email y ecografía por WhatsApp, del mismo paciente, recibidos el día anterior. El médico los tiene disponibles para preparar la atención y completar la historia.
- Se elimina el recorrido didáctico revisión → redacción → firma, la historia duplicada y el guion visible. Consentimiento y apagado quedan en un único `details` accesible y sin JS.
- Se conserva el sentido funcional: AI Notes sintetiza la conversación como referencia. No se representa inserción/firma automática de historia ni interpretación automática de archivos recibidos. Los beneficios no llevan métricas inventadas.

Fuentes contrastadas en producto `f5e854a813a08e57111044601eb982ba1924fba3`: `frontend/doctor/src/ai-notes-panel.jsx`, `ai-lifecycle.js`, `screen-video.jsx`, `panel-historia.jsx`, `panel-estudios.jsx`; `backend/src/AiNotes.php`; `app/src/app/legal/ai-terms.tsx`; `docs/ai-notes-lifecycle-mvp.md` y `docs/archivado/estudios-adjuntos.md`. El componente vigente manda sobre el canvas histórico.

El médico activa por consulta tras informar y obtener consentimiento expreso del paciente o su representante. El paciente puede pedir apagarla; la llamada continúa y no hay reencendido en esa consulta. El panel de AI Notes es de sólo lectura y permite copiar; no tiene «Usar» para escribir la historia.

**Entrega publicada:** [página](ai-notes.html), [brief](../docs/features/ai-notes/BRIEF.md), [autoría](../docs/features/ai-notes/PROVENANCE.md) y [verificación/capturas](../docs/features/ai-notes/README.md). Conectada sólo AI Notes desde home. Publicada por pedido de Pablo; runtime `a4ca4aa`.

## 8. Corrida 3 · Recetas

**Pregunta que debe resolver:** ¿cómo llega lo indicado por el médico al celular del paciente?

Relato central: el profesional prepara y emite → se genera el documento → el paciente lo encuentra, descarga o comparte. Mostrar ambas superficies con el mismo ejemplo y los mismos datos ficticios.

### Decidir en esa corrida

- El caso y la información mínima que deben mostrar el editor médico y el documento. Evitar medicación o indicaciones genéricas que parezcan recomendaciones al visitante.
- Qué aporta un documento completo frente a un recorte. Un mock legible puede resolver la preparación; una captura real puede demostrar la recepción en la app.
- Cómo representar emisión en curso, disponibilidad del PDF y entrega sin prometer inmediatez universal ni confundir previsualización con emisión terminada.
- Qué acciones reales mostrar: búsqueda de medicación, indicaciones, emisión, apertura, descarga o compartir. No agregar funciones imaginarias al mock.
- Qué afirmaciones sobre firma, validez e integración pueden sostenerse tras revisar el modo vigente de emisión. Resolver esto antes de escribir claims legales o de aceptación en farmacias.

Fuentes iniciales: `frontend/doctor/src/panel-receta.jsx`, `panel-receta-preview.jsx`; `app/src/app/prescriptions.tsx`, `prescription-detail.tsx`; `backend/src/Prescription/EmissionService.php`, `PrescriptionPolicy.php` y `Gateways.php`.

Existe integración MisRx, pero los defaults consultados incluyen mock/sandbox y la vista paciente muestra **«Documento de demostración · sin validez legal»**. Esas capturas no prueban emisión productiva. No ocultar esa condición para hacer pasar un ejemplo por receta real. Además, las consultas originadas por invitación tienen una restricción de emisión que debe revisarse antes de escribir «desde cualquier consulta».

**Cierre editorial de la página:** se entiende el recorrido médico → paciente y el documento mantiene coherencia entre escenas; se distinguen las acciones del profesional de la asistencia de IA; las afirmaciones comerciales no dependen de interpretar un ejemplo como evidencia legal.

**Entrega local · 2026-09-12:** [Recetas](recetas.html), [brief](../docs/features/recetas/BRIEF.md), [procedencia](../docs/features/recetas/PROVENANCE.md) y [verificación/capturas](../docs/features/recetas/README.md). Titular «La receta de la consulta llega al celular del paciente». Dos superficies del mismo caso ficticio: preparación médica y documento en la app. Un selector nativo compara `issued` («Preparando») y `ready` (documento disponible), sin espera ni emisión real. Conserva la leyenda de demostración; no muestra dosis, firma o matrícula ficticias. Las acciones de descarga/compartir se explican como capacidades de la app, sin botones inactivos. Un desplegable aclara demoras, PDF no disponible y la restricción de consultas por invitación.

Usa `styles.css`, `recetas.css` y el menú común; no agrega imágenes, dependencias ni JS propio. Home y las otras dos features tienen enlaces recíprocos en la preview. 232 comprobaciones de página en autoría y 232 sobre paquete aislado; regresiones de Validaciones (205) y AI Notes (148) correctas. Paquete de trabajo: 20 archivos, 493.421 bytes, con hashes HTTP verificados. `source_commit: null`: esa evidencia corresponde al cierre local.

**Publicación posterior autorizada:** runtime `5f74ecf7390da9f3e8d6f77b8b117ec87bdf8d95`, release `v5-5f74ecf`, activo desde 2026-09-12 18:44:43 UTC. Paquete desde commit idéntico a la preview, con 232 checks antes del cambio público. Verificación pública: 232 checks en cada dominio, Validaciones 205 y AI Notes 148; los 20 archivos y el manifiesto coinciden en origen y ambos dominios. Nginx y rutas preservados; release anterior `v5-2d3380d` disponible. [Evidencia y rollback](../docs/features/recetas/README.md#publicación--2026-09-12-utc).


## 9. Política de capturas y mocks

Elegir el recurso por lo que explica, después de definir la escena. No generar primero una colección de capturas para buscarles luego un relato.

| Tratamiento | Cuándo conviene | Qué preservar |
|---|---|---|
| Captura completa | La relación entre áreas y la ubicación dentro del producto importan. | Contexto suficiente, proporción del dispositivo y texto legible. |
| Recorte real | Una acción o estado concentra la explicación. | Actor, estado y condición que cambien el significado; conservar el original. |
| Mock HTML/CSS | La UI completa agrega ruido o se vuelve ilegible en móvil. | Conceptos, estados y acciones reales. Identificarlo como ejemplo cuando pueda confundirse con una operación real. |
| Secuencia interactiva | Manipular un estado ayuda a entender el mecanismo. | Controles reales del ejemplo, teclado, fallback y ausencia de llamadas al backend productivo. |

Assets existentes que pueden servir de partida:

- `alvia-web/v4-c/captures/render.mjs`: componentes reales de app con fixtures para inicio, código, copago, receta e identidad.
- `alvia-web/v4-c/captures/render-ai-notes.mjs` y `ai-notes.jsx`: panel real del médico con fixture.
- `alvia-web/v4-c/index.html`: ejemplos simplificados de AI Notes y recetas; su [README](../v4-c/README.md) documenta por qué se eligieron.
- `telemed-starter/sales/alvia-b2b-deck/`: material comercial y capturas secundarias que deben contrastarse con el producto.

Los harnesses V4 tienen defaults de un worktree anterior. Fijar explícitamente `ALVIA_APP_SOURCE` y/o `ALVIA_DOCTOR_SOURCE` al checkout elegido, además de las rutas de dependencias que requiera el script. El modo identidad existente sólo demuestra la selfie con cámara sustituida y envío deshabilitado; no reproduce el KYC completo ni una aprobación real.

Usar datos sintéticos consistentes: paciente, profesional, cobertura y fecha de ejemplo. No reutilizar datos reales. Para móvil, el antecedente es 390 × 844 CSS px a DPR 2; elegir otras medidas cuando el producto o la composición lo necesiten. No encoger una consola entera hasta convertir sus textos en textura.

Conservar un manifiesto de autoría por página con: **escena → afirmación → archivo/componente y commit → fixture → comando → tratamiento → dimensiones → asset final**. Para mocks nativos, registrar igualmente la fuente funcional y la simplificación. Los originales, herramientas y documentación no se publican como assets de runtime.

## 10. Mecánica de cada corrida y handoff

1. **Retomar:** leer este plan, DESIGN y COPYWRITING, revisar la home vigente y el estado de la página anterior. Resolver diferencias con el producto actual.
2. **Profundizar el brief de esa página:** decisión del comprador, beneficio por actor, fuentes, dudas que hay que resolver y afirmaciones seleccionadas. Guardarlo en `docs/features/<slug>/BRIEF.md` al empezar esa página.
3. **Resolver el relato y las escenas:** elegir composición, copy y tratamientos visuales. Comparar alternativas internamente cuando haga falta; no reabrir la identidad de V5.
4. **Producir e implementar:** assets o mocks, HTML/CSS y sólo el JS necesario. Guardar la procedencia junto al brief. Terminar la página antes de pasar a otra feature.
5. **Verificar y revisar:** legibilidad visual, fidelidad del ejemplo, enlaces, comportamiento y paquete. Corregir los hallazgos dentro de la misma corrida.
6. **Conectar:** transformar sólo su entrada de home en enlace real y agregar los enlaces cruzados hacia páginas existentes. Las demás entradas continúan informativas.
7. **Dejar continuidad:** actualizar la tabla de estado de abajo con decisiones, archivos, evidencia y próximo paso. Registrar por separado si hubo publicación y cuál es el commit servido.

Se puede repartir en subagentes la investigación de producto, el análisis visual y una revisión independiente, como en esta etapa. Un responsable integra la página y decide; no abrir tres implementaciones de features a la vez ni imponer backends, gates o una maquinaria de ejecución del experimento V4.

### Criterios para dar una página por terminada localmente

- La pregunta del comprador tiene respuesta visible y específica; los roles y condiciones no se contradicen.
- Se ve el producto o un ejemplo que explica su mecanismo, con texto legible en móvil.
- El estilo continúa V5 y el bloque home conserva su peso secundario.
- Funciona la entrada directa, regreso a home, CTA contextual y enlaces hacia páginas existentes. Nada lleva a un destino pendiente.
- Revisada en 1440, 1024, 768, 390 y 320 px, sin desborde horizontal ni errores de recursos o JS. Revisar zoom y contenido largo cuando la composición lo requiera.
- Navegación por teclado, foco y nombres accesibles; el contenido esencial funciona sin JS. Respetar movimiento reducido y no depender del hover.
- Imágenes con dimensiones, alt útil y carga diferida fuera de la escena principal. No duplicar videos pesados ni trasladar assets de subpáginas a la home.
- Empaquetado desde el commit correspondiente, referencias y manifiesto verificados; no basta con que el servidor de autoría encuentre archivos no incluidos en el release.
- Brief, procedencia y capturas de revisión guardados. Una captura técnica demuestra presentación, no preferencia del comprador ni conversión.

### Notas técnicas que evita redescubrir cada corrida

El sitio es estático, sin framework ni build. El modo opcional `--working-tree` del empaquetador verifica una preview sin commit: manifiesto con `source_commit: null`, modo `working-tree-preview` y commit base. No sustituye al paquete `--ref <commit>` que corresponde generar antes de publicar. `scripts/package_v5.py` parte de `index.html`, sigue recursos y páginas enlazados y empaqueta desde un commit de Git. Rechaza rutas absolutas, `..` y destinos sin extensiones permitidas; sus referencias HTML se resuelven desde raíz V5. Mantener los primeros HTML al mismo nivel permite avanzar sin reescribir esa herramienta.

`v5/navigation.js` contiene el menú común extraído y verificado en ambas páginas. `v5/script.js` conserva calculadora y pestañas de home y sólo se carga allí. `v5/ai-notes.js` se limita a copiar el ejemplo con fallback de selección manual. No se agregó un framework.

V5 conserva `noindex, nofollow`; esta tarea no toma una decisión nueva de indexación. Las rutas públicas, dominios y publicación existentes se documentan en el registro de release, que no debe actualizarse como si se hubiera desplegado al terminar una preview.

## 11. Estado durable

| Entrega | Estado | Evidencia / próximo paso |
|---|---|---|
| Guía high level | Actualizada | Conserva las decisiones editoriales y registra las cuatro features completas y publicadas. |
| Bloque home | Publicado con cuatro enlaces | Validaciones, AI Notes, Recetas y Turnos inteligentes tienen enlace público. |
| Validaciones | Aprobada, publicada y verificada (`2d3380d`) | Identidad, código y copagos, variante exenta, enlaces recíprocos con AI Notes. [Entrega y evidencia](../docs/features/validaciones/README.md). |
| AI Notes | Publicada y verificada | Documentación automatizada + estudios previos por email/WhatsApp. [Brief, procedencia y evidencia](../docs/features/ai-notes/README.md). |
| Recetas | Publicada y verificada (`5f74ecf`) | Preparación médica, PDF en preparación/listo, recepción y condiciones. Enlaces públicos recíprocos. [Entrega](../docs/features/recetas/README.md). |
| Turnos inteligentes | Publicada y verificada (`ddc8df8`) | Confirmación 24 horas antes, adelantos y reducción del ausentismo. [Release](../docs/releases/2026-09-12-smart-appointments.md). |
| Revisión conjunta | Completada local y públicamente | Enlaces recíprocos y home, cinco anchos, regresiones 205/148, copy y paquete de 20 archivos revisados. [Evidencia](../docs/features/recetas/README.md). |
| Publicación del bloque informativo | Realizada por pedido de Pablo | [V5](https://alvia.ar/v5/#funcionalidades), runtime `0b5a3c1`; [registro de release](../docs/releases/2026-09-12-v5.md). |
| Publicación de AI Notes | Realizada por pedido de Pablo | Runtime `a4ca4aa`; 16 archivos, 451.577 bytes. [Registro y rollback](../docs/releases/2026-09-12-v5.md), [evidencia pública](../docs/features/ai-notes/README.md). |
| Publicación de Validaciones | Realizada por pedido de Pablo | Runtime `2d3380d`; 18 archivos, 472.759 bytes. [Verificación pública](../docs/features/validaciones/README.md#publicación--2026-09-12-utc), 205 checks de página y 148 de AI Notes. |
| Publicación de Recetas | Realizada por pedido de Pablo | Runtime `5f74ecf`; 20 archivos, 493.421 bytes; 232 checks en cada dominio. [Registro](../docs/releases/2026-09-12-v5.md#recetas--2026-09-12-utc). |

### Inicio sugerido de la próxima corrida

> Las cuatro features están publicadas y verificadas en rutas limpias. Continuá desde `v5/DESIGN.md`, `v5/TODO.md` y los registros de `docs/releases/`. Runtime vigente `4239034`; conservar links absolutos internos y metadatos canónicos sin `/v5` ni `.html`.
