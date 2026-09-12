# Acceso a funcionalidades · alternativa C

2026-09-12. Pablo eligió C después de comparar cuatro alternativas sobre la v5: enlace explícito, botón, tarjeta clickeable y desplegable. La flecha diagonal de la versión anterior resultaba poco clara. Autorizó aplicar C, documentar, commitear, pushear y publicar.

La tarjeta completa abre la página de la función. El título recupera el color de lectura; el pie azul dice «Explorar Validaciones», «Explorar AI Notes» o «Explorar Recetas», con una flecha horizontal. Borde suave, esquinas redondeadas y hover breve completan la señal de interacción. Se conserva el contenido de cada función.

Implementación en `v5/index.html` y `v5/features.css`. Un solo enlace nativo por tarjeta, sin enlaces anidados, sin JS nuevo, nombre accesible explícito, foco visible y respeto por movimiento reducido. Tres columnas en escritorio y miniatura lateral en móvil. Los pies se alinean en escritorio y el texto puede crecer sin recortarse. La URL versionada de la hoja de estilos evita usar el CSS anterior del CDN.

[Decisión de continuidad](../../../v5/DESIGN.md#13-acceso-a-funcionalidades--alternativa-c-aprobada) · [Registro de publicación y rollback](../../releases/2026-09-12-v5.md).

## Verificación local

[53 comprobaciones de navegador](local-browser-checks.json) en 1440, 1024, 768, 390 y 320 px: nombres accesibles, un enlace por tarjeta, foco y navegación con Enter/Tab, clic en las tres ilustraciones, destinos reales, ausencia de desborde y errores, texto ampliado, movimiento reducido y navegación sin JavaScript. Revisión visual de escritorio y móvil.

El paquete contiene los mismos 20 archivos de runtime del release anterior `5f74ecf`. Sólo cambian `index.html` y `features.css`; el resto del HTML de home y las tres subpáginas coinciden con la versión publicada.

## Publicación

Publicada el **2026-09-12 a las 19:04:33 UTC** en [alvia.ar/v5/#funcionalidades](https://alvia.ar/v5/#funcionalidades), también en `www.alvia.ar`. Commit de runtime `f281d8b7d86ca3282967422684884bce554774df`, pusheado a `feat/v5-feature-pages-plan` de `Raboys/alvia-web` antes de desplegar. Paquete exacto de Git: 20 archivos, 494.924 bytes más manifiesto.

- [53 comprobaciones públicas](public-browser-checks.json) y [53 en www](www-browser-checks.json). Las pruebas públicas sin JS usan foco y Enter para comprobar el enlace nativo, evitando la espera de estabilidad del clic automatizado durante el desplazamiento.
- [HTTP y SHA-256](public-http-checks.json): los 20 archivos coinciden en origen y ambos dominios; sólo se normaliza la protección de correo de Cloudflare en HTML. El manifiesto es idéntico.
- [Escritorio](1440-features.png), [móvil](390-features.png) y [320 px](320-features.png).
- [Manifiesto](release.json), [estado anterior](before-deploy.json) y [publicación atómica](deployment.json).

El enlace público apunta a `/var/www/alvia.ar/releases/v5-f281d8b`; se conserva `v5-5f74ecf` para rollback. Nginx y las redirecciones mantienen su configuración. No fue necesario reiniciar servicios ni purgar la caché global. La documentación posterior no modifica el runtime identificado por el manifiesto.
