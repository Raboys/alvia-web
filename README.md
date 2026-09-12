# Alvia Web Institucional

Sitio institucional estático de Alvia y sus variantes de diseño.

- **V5: <https://alvia.ar/v5/>**, portada vigente con dirección visual de 1doc3, beneficios para la organización y calculadora de capacidad. [Mensaje y diseño](v5/README.md) · [Publicación](docs/releases/2026-09-12-v5.md).

- Portada vigente: <https://alvia.ar/> → <https://alvia.ar/v5/> (también desde `www.alvia.ar`).
- **V4:** versión anterior conservada en `v4-c/`; su ruta histórica redirige a V5.
- Las rutas públicas de V1–V4 están retiradas y redirigen a V5.
- Versiones anteriores: `v1/`, `v2/` y `v3/`.
- Experimentos conservados en Git: `v4-a/` y `v4-b/`.

## V5: continuar el diseño vigente

Leer [las decisiones de mensaje y estilo](v5/DESIGN.md) antes de iterar. Incluye el titular acordado, los tres ejes comerciales, lo descartado, la guía contra el texto de relleno y los valores de paleta, tipografía y responsive.

- [Capturas de la versión aprobada](docs/design/v5-baseline/README.md).
- [Archivos, assets y ejecución](v5/README.md).
- [Publicación, promoción a portada y rollback](docs/releases/2026-09-12-v5.md).
- [Plan de páginas de features](v5/PLAN_FEATURES.md): Validaciones → AI Notes → Recetas. Bloque de home publicado para revisión. AI Notes ya está publicada y enlazada desde home; combina documentación automatizada y estudios previos por email/WhatsApp. [Entrega y verificación](docs/features/ai-notes/README.md). [Validaciones ya está publicada y verificada](docs/features/validaciones/README.md), con enlace desde home y AI Notes. Runtime vigente `60dadfc`; Recetas sigue pendiente.

## V4

La variante elegida usa textos breves, muestra la app del afiliado con pantallas consistentes y videos automáticos, y presenta demos interactivas de recetas, estudios y AI Notes. El recorrido avanza cada siete segundos con una barra decreciente; seleccionar una pantalla detiene el avance hasta pulsar «Reproducir recorrido». Fue la portada del 2026-09-05 al 2026-09-12 UTC. Su código histórico conserva `noindex, nofollow`; la ruta pública ahora redirige a V5.

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

El destino debe ser nuevo. El script toma archivos de un commit de Git, incluye sólo HTML/CSS/JS, assets referenciados y licencias de fuentes, verifica las rutas y escribe un manifiesto SHA-256. El resultado se sirve en `/v5/`. El repositorio institucional usa publicación estática atómica; no tiene workflow de despliegue automático.
