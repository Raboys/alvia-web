# Alvia V5

Versión comercial inspirada en la composición y el recorrido de [1doc3](https://1doc3.com/), con identidad Alvia, fotografías propias y contenido para organizaciones de salud en Argentina.

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

python3 scripts/package_v5.py --ref HEAD /tmp/alvia-v5-release
```

El paquete sale de un commit concreto, valida las referencias e incluye las licencias de las fuentes y un manifiesto SHA-256. No publica este README ni el prompt. El destino público es `/v5/`; el cambio de portada es una decisión separada.

Sin JavaScript, la navegación y las preguntas siguen funcionando, se muestran todos los segmentos, el selector de app usa controles nativos y el cálculo muestra un ejemplo estático. Con JavaScript se habilitan la calculadora, el menú móvil y las pestañas accesibles por teclado. Se respeta la preferencia de movimiento reducido.

## Verificación local

Chrome a 1440, 1024, 768, 390 y 320 px: 146 comprobaciones correctas, incluyendo recursos, ausencia de desborde, enlaces, cálculo normal y límites, entradas inválidas, turnos completos, selección de pantallas, pestañas por clic y teclado, menú móvil, preguntas, funcionamiento sin JavaScript y movimiento reducido. Evidencia de autoría: `/tmp/alvia-v5-review/checks.json` y capturas en ese directorio.
