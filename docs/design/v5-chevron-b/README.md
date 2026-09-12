# Chevrones B · evidencia de publicación

Pablo eligió B y pidió commit, push, documentación y publicación. [Decisión y rollback](../../releases/2026-09-12-chevron-b.md). Runtime público `8276775bf9c1313da04f103d1bbbae8e4743b2c4`.

- [Preflight y archivos conservados](before-deploy.json).
- [Cambio atómico del release](deployment.json).
- [Manifiesto publicado](release.json).
- [Comparación de archivos, manifiestos y rutas en origen/apex/www](public-http-checks.json).
- [54 comprobaciones locales](local/browser-checks.json), [54 en apex](apex/browser-checks.json) y [54 en www](www/browser-checks.json).
- [Portada publicada en escritorio](apex/index-1440.png) y [celular](apex/index-390.png).
- Subpáginas en celular: [AI Notes](apex/ai-notes-390.png), [Validaciones](apex/validaciones-390.png), [Recetas](apex/recetas-390.png).

Las capturas preservan el nuevo header mobile y las funcionalidades previas. Los resultados documentan esta publicación; no sustituyen los checks de una futura versión. El script puntual de navegador está en `/tmp/alvia-cta-review/verify-all.cjs`; la verificación de HTTP se ejecutó con `docs/features/ai-notes/verify-public.py` del repositorio.
