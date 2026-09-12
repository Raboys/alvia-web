# AI Notes · entrega local V5

Implementada en `v5/ai-notes.html`, con enlace desde la entrada AI Notes en home. **Sin commit, push ni publicación.** Validaciones y Recetas siguen informativas. Fuente institucional base `626cd3b`; producto contrastado `f5e854a`.

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

Al publicar, guardar los cambios en el commit correspondiente, ejecutar el empaquetador con `--ref <commit>` y verificar ese paquete antes de actualizar el release. El sitio público continúa en `0b5a3c1`; el registro de publicación previo se conserva sin atribuirle esta página.
