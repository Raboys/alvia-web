# AI Notes · publicada en V5

Publicada por pedido de Pablo en [alvia.ar/v5/ai-notes.html](https://alvia.ar/v5/ai-notes.html), con enlace desde la entrada AI Notes en home. Runtime **`a4ca4aa824b49d767349cca3bc78b1004e7702e2`**, release `/var/www/alvia.ar/releases/v5-a4ca4aa`. Ese release corresponde a la publicación inicial de AI Notes. El runtime vigente es `60dadfc`, que incorpora [Validaciones](../validaciones/README.md) y navegación recíproca; Recetas sigue informativa. Base institucional `626cd3b`; producto contrastado `f5e854a`.

La página sigue la corrección de Pablo: documentación automatizada, menos trabajo administrativo, consultas más ágiles y estudios recibidos por email/WhatsApp. Dos escenas, copy breve y CTA de demo. La responsabilidad médica queda en una línea; consentimiento y apagado en un desplegable.

- [Brief vigente](BRIEF.md) y [autoría de escenas](PROVENANCE.md).
- [Caso ficticio](fixture.json).
- [Plan y estado](../../../v5/TODO.md).

## Revisión visual

| Ancho | Página completa |
|---|---|
| 1440 | [Escritorio](review/1440-full.png) |
| 1024 | [Escritorio compacto](review/1024-full.png) |
| 768 | [Tablet](review/768-full.png) |
| 390 | [Móvil](review/390-full.png) |
| 320 | [Móvil pequeño](review/320-full.png) |

También: [hero escritorio](review/1440-hero.png), [hero móvil](review/390-hero.png), [entrada en home](review/1440-home-features.png), [entrada móvil](review/390-home-features.png), [sin JS](review/390-no-js.png), [texto ampliado](review/720-enlarged-text.png), [consentimiento](review/390-conditions.png) y [copia denegada](review/390-copy-fallback.png).

Chromium headless, DPR 1. Las capturas verifican composición y legibilidad; no aprobación, conversión ni pruebas sobre hardware móvil real. No se sobrescribió el baseline aprobado.

## Verificaciones

- [148 comprobaciones de la página y su navegación](review/browser-checks.json), repetidas con éxito [sobre el paquete aislado](review/package-browser-checks.json): cinco anchos, lectura de resumen, estudios y coherencia del paciente, enlaces, consentimiento por teclado, copia exacta, fallo de portapapeles y selección manual, menú y Escape, foco, no-JS, movimiento reducido y reflujo equivalente a zoom 200 %.
- [146 comprobaciones de regresión de home](review/home-regression-checks.json) después de extraer el menú común: calculadora, pestañas, selector de app, navegación, teclado y estados sin JS. La actualización posterior de copy/enlace también se verificó en los 148 checks actuales y en las capturas de home.
- [Paquete y hashes](review/package-checks.json): 16 archivos, 451.577 bytes, más manifiesto. Todos coinciden por HTTP, SHA-256 y contenido con el árbol de trabajo. Incluye sólo runtime referenciado y licencias, sin documentos, fixtures o capturas de revisión. El modo tradicional `--ref HEAD` conserva los 12 archivos y hashes del commit base.
- [Manifiesto exacto del runtime revisado](review/runtime-manifest.json), marcado `working-tree-preview` y `source_commit: null`. No se atribuyen cambios sin commit a un release anterior.
- Revisión de HTML, CSS y JS, `node --check` de los tres scripts y `git diff --check`; sin errores.

## Ejecutar

```sh
python3 -m http.server 8925 --bind 127.0.0.1
# http://127.0.0.1:8925/v5/ai-notes.html
node docs/features/ai-notes/verify.cjs
```

El runner acepta `ALVIA_PLAYWRIGHT`, `ALVIA_V5_URL` y `ALVIA_V5_EVIDENCE`.

```sh
# Preview local; destino nuevo. No es un paquete de publicación.
python3 scripts/package_v5.py --working-tree /tmp/alvia-ai-notes-preview/v5
python3 -m http.server 8926 --bind 127.0.0.1 --directory /tmp/alvia-ai-notes-preview
ALVIA_V5_URL=http://127.0.0.1:8926/v5/ ALVIA_V5_EVIDENCE=/tmp/alvia-ai-notes-package-checks node docs/features/ai-notes/verify.cjs
```

## Publicación · 2026-09-12 UTC

Pablo pidió publicar la versión corregida, documentar su preferencia de textos cortos y directos y hacer commit. La publicación se hizo desde el commit de implementación `a4ca4aa`, después de comprobar que sus 16 archivos coincidían exactamente con el runtime revisado y de probar el paquete por HTTP en escritorio y móvil. Se reemplazó atómicamente sólo el enlace V5 y se conservó `v5-0b5a3c1` para revertir.

- [148 comprobaciones públicas](public/browser-checks.json) de AI Notes y navegación; [146 de regresión de home](public/home-regression-checks.json).
- [HTTP y SHA-256 en origen y ambos dominios](public/http-checks.json); [manifiesto publicado](public/release.json).
- Capturas públicas: [escritorio](public/1440-full.png), [móvil](public/390-full.png), [home escritorio](public/1440-home-features.png) y [home móvil](public/390-home-features.png).
- Las raíces mantienen el 301 a `/v5/`. `/v4/` ya redirigía a V5 al comenzar esta publicación y conserva ese comportamiento. No se modificó Nginx ni se reiniciaron servicios.
- [Registro de release y rollback](../../releases/2026-09-12-v5.md#ai-notes-y-estudios-previos--2026-09-12-utc).

### Aprendizajes para verificar futuras publicaciones

Cloudflare puede agregar su decodificador de correo y un beacon de observabilidad. La verificación permite únicamente esos recursos identificados; sigue rechazando llamadas al producto o destinos inesperados. `verify-public.py` compara el HTML normalizando sólo la protección de correo conocida y exige igualdad exacta del resto.

Los CSS y scripts cambiados llevan versión en el query del HTML. La comprobación pública usa **esas URLs exactas**: un recurso pedido sin su query puede conservar una copia anterior en la caché del CDN, aunque el navegador de la página reciba la versión correcta. En origen se verifican también los archivos sin query contra el manifiesto. No se invalidó la caché global ni se cambió la configuración de Cloudflare.

```sh
python3 docs/features/ai-notes/verify-public.py \
  --release /var/www/alvia.ar/releases/v5-a4ca4aa \
  --before docs/features/ai-notes/public/before-deploy.json \
  --output /tmp/alvia-ai-notes-public-http-checks.json
```
