# Alvia Web Institucional

Sitio institucional estático de Alvia y sus variantes de diseño.

- **Web vigente: <https://alvia.ar/>**, con dirección visual de 1doc3, beneficios para la organización y calculadora de capacidad. La fuente continúa en `v5/`; V5 ya no forma parte de la URL pública. [Mensaje y diseño](v5/README.md) · [Rutas y publicación](docs/releases/2026-09-12-pretty-urls.md).

- Portada vigente: <https://alvia.ar/> y <https://www.alvia.ar/>.
- Rutas públicas: `/ainotes`, `/validaciones`, `/recetas` y `/turnos-inteligentes`. `/v5` y los nombres `.html` redirigen a estas URLs limpias.
- Versiones anteriores conservadas en Git para referencia local: `v1/`, `v2/`, `v3/` y `v4-c/`.
- Experimentos conservados en Git: `v4-a/` y `v4-b/`.

## V5: continuar el diseño vigente

Leer [las decisiones de mensaje y estilo](v5/DESIGN.md) antes de iterar. Incluye el titular acordado, los tres ejes comerciales, lo descartado, la guía contra el texto de relleno y los valores de paleta, tipografía y responsive.

- [Capturas de la versión aprobada](docs/design/v5-baseline/README.md).
- [Tarjetas de funcionalidades: alternativa C aprobada](docs/design/v5-feature-cards/README.md).
- [Archivos, assets y ejecución](v5/README.md).
- [Publicación, promoción a portada y rollback](docs/releases/2026-09-12-v5.md).
- [Funcionalidades](v5/PLAN_FEATURES.md): Validaciones, AI Notes, Recetas y Turnos inteligentes están publicadas, con navegación recíproca. Home usa tarjetas completas clickeables y también menciona la gestión de turnos en beneficios. Runtime público `ddc8df8`; [publicación y rollback](docs/releases/2026-09-12-smart-appointments.md).

## V4

La variante elegida usa textos breves, muestra la app del afiliado con pantallas consistentes y videos automáticos, y presenta demos interactivas de recetas, estudios y AI Notes. El recorrido avanza cada siete segundos con una barra decreciente; seleccionar una pantalla detiene el avance hasta pulsar «Reproducir recorrido». Fue la portada del 2026-09-05 al 2026-09-12 UTC. Está archivada y su antigua URL redirige a V5.

- [Historia de cambios y validaciones](v4-c/README.md).
- [Registro de publicación](docs/releases/2026-09-05-v4.md).
- [Arquitectura y mantenimiento](WEB_INSTITUCIONAL_DOCS.md).
- [Plan original del experimento](PLAN_WEB_V4_EXPERIMENT.md).

## Preview

```bash
python3 -m http.server 8080
```

Abrir `http://127.0.0.1:8080/v5/` para la portada vigente o `/v4-c/` para V4. Las páginas no necesitan build ni dependencias de Node. Los generadores de capturas en `v4-c/captures/` son herramientas de autoría opcionales y no se publican.

## Paquete para publicación

```bash
python3 scripts/package_v5.py --ref main /tmp/alvia-v5-release
```

El destino debe ser nuevo. El script toma archivos de un commit de Git, incluye sólo HTML/CSS/JS, assets referenciados y licencias de fuentes, verifica las rutas y escribe un manifiesto SHA-256. El resultado se sirve desde `/` mediante el symlink de release. El repositorio institucional usa publicación estática atómica; no tiene workflow de despliegue automático.

## Runtime vigente

Runtime `4239034`: cuatro funcionalidades, navegación desktop y megamenú mobile, calculadora C, chevrones discretos y URLs limpias. [Gestión inteligente de turnos](https://alvia.ar/turnos-inteligentes) · [registro de publicación](docs/releases/2026-09-12-pretty-urls.md).


## Iterar las páginas de funcionalidades

Referencia visual elegida: [Validaciones · A refinada de Astra](docs/design/validaciones-astra-a/README.md).
Incluye composición, copy, SVG, ritmo, mobile e interacciones, para continuar otras páginas con
el mismo criterio de acabado. [Publicación y rollback](docs/releases/2026-09-20-validaciones-astra-a.md).
