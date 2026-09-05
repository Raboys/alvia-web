# Alvia Web Institucional

Sitio institucional estático de Alvia y sus variantes de diseño.

- Portada vigente: <https://alvia.ar/> → <https://alvia.ar/v3/>.
- **V4 para compartir y revisar: <https://alvia.ar/v4/>**, publicada desde `v4-c/`.
- Versiones anteriores: `v1/`, `v2/` y `v3/`.
- Experimentos conservados en Git: `v4-a/` y `v4-b/`.

## V4

La variante elegida usa textos breves, muestra la app del afiliado con pantallas consistentes y videos automáticos, y presenta demos interactivas de recetas, estudios y AI Notes. Se publica para revisión; conserva `noindex, nofollow`.

- [Historia de cambios y validaciones](v4-c/README.md).
- [Registro de publicación](docs/releases/2026-09-05-v4.md).
- [Arquitectura y mantenimiento](WEB_INSTITUCIONAL_DOCS.md).
- [Plan original del experimento](PLAN_WEB_V4_EXPERIMENT.md).

## Preview

```bash
python3 -m http.server 8080
```

Abrir `http://127.0.0.1:8080/v4-c/`. Las páginas no necesitan build ni dependencias de Node. Los generadores de capturas en `v4-c/captures/` son herramientas de autoría opcionales y no se publican.

## Paquete para publicación

```bash
python3 scripts/package_v4.py --ref main /tmp/alvia-v4-release
```

El destino debe ser nuevo. El script toma archivos de un commit de Git, incluye sólo HTML/CSS/JS y assets referenciados, verifica las rutas y escribe un manifiesto SHA-256. El resultado se sirve en `/v4/`, sin modificar V3 ni la app médica. El repositorio institucional usa publicación estática atómica; no tiene workflow de despliegue automático.
