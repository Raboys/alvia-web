# Alvia V5

Versión comercial inspirada en la composición y el recorrido de [1doc3](https://1doc3.com/), con identidad Alvia, fotografías propias y contenido para organizaciones de salud en Argentina.

Portada vigente en <https://alvia.ar/> y <https://www.alvia.ar/>, con destino canónico <https://alvia.ar/v5/>. [Registro de publicación y verificaciones](../docs/releases/2026-09-12-v5.md).

**Para seguir iterando, empezar por [DESIGN.md](DESIGN.md):** decisiones de Pablo, textos aprobados, alternativas descartadas, paleta, tipografía, composición, responsive y mapa de edición. [Capturas de la base aprobada](../docs/design/v5-baseline/README.md).

## Ampliación de features · publicada para revisión

[PLAN_FEATURES.md](PLAN_FEATURES.md) guía el desarrollo por corridas: primero Validaciones (identidad, código de credencial y copagos), después AI Notes y finalmente Recetas. El bloque `#funcionalidades` presenta las tres en la home, después de las modalidades de red, con ilustraciones HTML/CSS en `features.css`.

**[Validaciones](https://alvia.ar/v5/validaciones.html) y [AI Notes](https://alvia.ar/v5/ai-notes.html) están publicadas**, enlazadas desde home y con navegación recíproca. Recetas está terminada y enlazada en la preview local; aún no está publicada. Runtime público vigente `2d3380d`. Validaciones reúne identidad, código de credencial y copagos configurables; AI Notes combina resumen de consulta y estudios previos por email/WhatsApp. [Entrega de Validaciones](../docs/features/validaciones/README.md) · [Entrega de AI Notes](../docs/features/ai-notes/README.md).

## Mensaje acordado

> Un servicio de telemedicina que sí te funciona.

> Ampliá tu oferta de turnos y consultas sin ampliar tu estructura. Tecnología al servicio de la gestión y la atención, con un valor agregado para tus afiliados.

Las correcciones de Pablo durante esta versión definen el mensaje:

- El comprador es la organización. La oferta de turnos, las consultas y la gestión van primero.
- La experiencia del afiliado se comunica como **valor agregado**, sin afirmar una mejora de calidad clínica.
- El titular «La salud más cerca. La vida sigue.» fue descartado porque no resuelve el problema del comprador.
- Se adopta el titular propuesto por Pablo, seguido de mecanismos y beneficios concretos.
- La guía editorial es `telemed-starter/docs/COPYWRITING.md`: cada frase debe orientar, diferenciar, demostrar o mover la decisión. Se eliminaron etiquetas decorativas, bajadas redundantes y aclaraciones repetidas.

## Diseño y recorrido

Blanco, azul vivo, naranja, titulares Lora y texto DM Sans. Fotografía integrada con trazos simples, bloques amplios y una sola demostración de app. La navegación lleva a beneficios, modelos de atención y propuestas por organización.

1. Oferta comercial y llamada a una conversación.
2. Turnos, guardia, gestión y valor para el afiliado, junto a la app real.
3. Calculadora de capacidad usando los datos del comprador.
4. Red propia, red Alvia 24/7 y operación combinada.
5. Obras sociales/prepagas, clínicas/sanatorios, empresas y gobiernos.
6. Respuestas a preguntas de contratación y contacto.

La calculadora muestra **capacidad potencial**, no consultas realizadas, ahorro demostrado ni resultados de clientes. Cuenta turnos completos por profesional y semana, y multiplica por cuatro semanas. Con 20 profesionales, 2 horas semanales y turnos de 20 minutos: 480 turnos/mes. No se suman fracciones de turnos entre profesionales.

## Assets

- `assets/people.webp`: fotografía publicitaria creada con el generador integrado `image_gen`, optimizada a WebP de 1100 × 1100 (75 KiB). Las personas son ficticias y no se presentan como pacientes, profesionales o clientes de Alvia. Prompt en [IMAGE_PROMPT.md](IMAGE_PROMPT.md).
- `assets/app-home.webp` y `assets/app-prescription.webp`: copias de las capturas de V4-C, producidas desde componentes reales con datos de demostración.
- `assets/fonts/`: Lora y DM Sans de Google Fonts, servidas localmente con sus licencias SIL Open Font License. No se necesitan solicitudes externas para mostrar la página.

La página no contiene testimonios inventados, logos de clientes ni métricas históricas sin respaldo. Red Alvia 24/7 y los tres modelos siguen la propuesta comercial definida en `telemed-starter/docs/WEB_V2.md`.

## Ejecutar y empaquetar

```sh
python3 -m http.server 8915 --bind 127.0.0.1
# http://127.0.0.1:8915/v5/

# Preview de cambios locales, sin atribuirlos a un commit:
python3 scripts/package_v5.py --working-tree /tmp/alvia-v5-preview

# Release: después de guardar la implementación en el commit correspondiente.
python3 scripts/package_v5.py --ref HEAD /tmp/alvia-v5-release
```

El paquete de release sale de un commit concreto, valida las referencias e incluye las licencias de las fuentes y un manifiesto SHA-256. No publica los documentos ni las capturas de referencia. El destino público es `/v5/`; las dos raíces ya redirigen a esa ruta. Actualizar el contenido de V5 no requiere volver a cambiar la portada.

Sin JavaScript, la navegación y las preguntas siguen funcionando, se muestran todos los segmentos, el selector de app usa controles nativos y el cálculo muestra un ejemplo estático. Con JavaScript se habilitan la calculadora, el menú móvil y las pestañas accesibles por teclado. Se respeta la preferencia de movimiento reducido.

## Verificación local

Chrome a 1440, 1024, 768, 390 y 320 px: 146 comprobaciones locales y 146 sobre la URL pública, incluyendo recursos, ausencia de desborde, enlaces, cálculo normal y límites, entradas inválidas, turnos completos, selección de pantallas, pestañas por clic y teclado, menú móvil, preguntas, funcionamiento sin JavaScript y movimiento reducido. [Evidencia pública conservada en Git](../docs/design/v5-baseline/README.md). Los originales de autoría también están en `/tmp/alvia-v5-review/` y `/tmp/alvia-v5-public-review/`.

La subpágina AI Notes usa `styles.css`, `ai-notes.css`, `navigation.js` y `ai-notes.js`. Home comparte sólo el menú; conserva su script de calculadora/pestañas. Las escenas son HTML/CSS, no agregan imágenes ni dependencias. La verificación reproducible está en `docs/features/ai-notes/verify.cjs`.

## Validaciones · aprobada y publicada

[validaciones.html](validaciones.html) reúne identidad, código de credencial y copagos según cobertura. Incluye un ejemplo nativo que alterna entre cobertura con/sin copago, explicaciones de los tres mecanismos y los momentos correctos de pago. Comparar coberturas y abrir el detalle funcionan sin JavaScript. Usa `styles.css`, `validaciones.css` y el menú común `navigation.js`; no agrega imágenes, dependencias ni scripts de feature.

[Brief, procedencia y verificación](../docs/features/validaciones/README.md). Para revisar: `python3 -m http.server 8935 --bind 127.0.0.1` y `node docs/features/validaciones/verify.cjs`. Pablo aprobó la página y pidió publicación, documentación, commits y push. Runtime público `2d3380d`: ejemplo de código de tres dígitos, texto breve y «Con todos los medios de pago», según las correcciones de Pablo. Release anterior `v5-60dadfc` conservado.


## Recetas · terminada localmente

[recetas.html](recetas.html) muestra la preparación médica y el documento disponible en el celular con un mismo caso ficticio. El selector «En preparación / Documento listo» funciona sin JavaScript. Se mantienen la leyenda de demostración, las condiciones de disponibilidad y el CTA comercial. La preview conecta las tres páginas desde home y mediante enlaces recíprocos.

Usa `styles.css`, `recetas.css` y `navigation.js`; no agrega imágenes, dependencias ni JS propio. [Brief, procedencia, capturas y verificación](../docs/features/recetas/README.md). 232 checks de Recetas, regresiones de Validaciones (205) y AI Notes (148), y 232 checks sobre paquete aislado. Preview: 20 archivos, 493.421 bytes, hashes HTTP correctos.

```sh
python3 -m http.server 8945 --bind 127.0.0.1
# http://127.0.0.1:8945/v5/recetas.html
node docs/features/recetas/verify.cjs
```

Esta entrega no publica ni crea un commit. El runtime público sigue en `2d3380d`; el paquete de preview registra `source_commit: null`. El estado de la corrida está en [TODO.md](TODO.md).
