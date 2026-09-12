# Recetas · entrega local V5

2026-09-12. **Página terminada y verificada localmente**, según PLAN_FEATURES §8–10. [Página HTML](../../../v5/recetas.html). La preview enlaza Recetas desde home, AI Notes y Validaciones; las tres páginas tienen navegación recíproca. Esta corrida no publica, commitea ni modifica producción. Runtime público documentado: `2d3380d`.

El recorrido muestra la preparación médica y el documento en el celular del paciente con un mismo caso ficticio. Un selector nativo permite comparar PDF en preparación y documento listo. Se mantienen la leyenda de demostración y las condiciones de disponibilidad; no hay medicación real, dosis, firmas o matrículas inventadas. Las acciones de descarga y compartir se explican como capacidades de la app.

- [Brief y decisiones](BRIEF.md), [procedencia por escena](PROVENANCE.md), [fixture](fixture.json).
- [Plan](../../../v5/PLAN_FEATURES.md) y [estado durable](../../../v5/TODO.md).
- Base institucional `ab8aa78b067424598d68b3f8c1df2e0954a4c3b1`; producto `f5e854a813a08e57111044601eb982ba1924fba3`.

## Capturas y revisión visual

| Ancho CSS | Página completa |
|---|---|
| 1440 | [Escritorio](review/1440-full.png) |
| 1024 | [Escritorio compacto](review/1024-full.png) |
| 768 | [Tablet](review/768-full.png) |
| 390 | [Móvil](review/390-full.png) |
| 320 | [Móvil pequeño](review/320-full.png) |

También: [preparación del PDF](review/390-preparing.png), [sin JavaScript](review/390-no-js.png), [preparación sin JS](review/390-without-JS-preparing.png), [texto duplicado y nombre largo](review/720-enlarged-ready.png), [texto ampliado a 320 px](review/320-enlarged-ready.png), [home escritorio](review/1440-home-features.png) y [home móvil](review/390-home-features.png).

Chromium headless, DPR 1. Revisados composición, orden de lectura, legibilidad, estados, pie de demostración y enlaces en los cinco anchos. Se corrigió el selector para que los radios permanezcan en la celda de su etiqueta y el clic lo reciba la etiqueta visible; conserva el foco de teclado. La verificación evita iniciar la interacción mientras se desplaza hacia el control. Se capturan los estados desde el inicio de la página para que la cabecera fija no aparezca en mitad de la imagen.

La revisión no acredita preferencias del comprador, conversión o pruebas en dispositivos físicos. Se conservan las evidencias históricas de V5 y de las otras features.

## Verificaciones

- **[232 comprobaciones de Recetas en autoría](review/browser-checks.json)** y **[232 sobre paquete aislado](review/package-browser-checks.json)**: entrada directa, metadata, fuentes locales, fixture entre superficies, borrador y documento listo, cinco anchos, teclado y foco, clic, ambas variantes, desplegable, menú móvil/Escape, enlaces/anclas, ida/vuelta entre las tres features, home, recursos y ausencia de llamadas al producto. Incluye calculadora, pestañas por teclado y selector de pantalla de home en escritorio/móvil; sin JS a 1440/390/320, movimiento reducido, reflujo y texto de lectura al doble con nombre largo a 720/320.
- **[205 comprobaciones de Validaciones](review/validaciones-regression-checks.json)** y **[148 de AI Notes](review/ai-notes-regression-checks.json)**. Sus runners actualizan únicamente la expectativa de navegación: tres features completas y Recetas con destino real. El contenido y las interacciones de esas páginas pasan sus comprobaciones anteriores.
- **[HTTP y SHA-256 del paquete](review/package-checks.json)**: 20 archivos, 493.421 bytes, idénticos al árbol revisado y al manifiesto servido. Incluye fuentes y licencias; excluye herramientas, documentación, fixtures y capturas de revisión.
- **[Manifiesto](review/runtime-manifest.json)**: `source_mode: working-tree-preview`, `source_commit: null`, base `ab8aa78`. Preview `/tmp/alvia-recetas-final/v5`; no sustituye el paquete desde el futuro commit de publicación.
- `node --check` de los runners y menú común; `git diff --check`; revisión final del diff y de las referencias locales de documentación. No se modifican backend ni app.

La página añade `recetas.html` (10.500 bytes) y `recetas.css` (10.005 bytes). Comparte `styles.css` y `navigation.js`; no incorpora imágenes, JS propio ni dependencias. Home conserva sus assets y sólo suma el enlace. AI Notes y Validaciones sólo agregan el enlace recíproco en el footer.

## Reproducir

Desde `/home/pablo/dev/alvia-web-v5-features`:

```sh
python3 -m http.server 8945 --bind 127.0.0.1
# http://127.0.0.1:8945/v5/recetas.html
# En otra terminal:
node docs/features/recetas/verify.cjs

# Regresiones, conservando la evidencia histórica:
ALVIA_V5_URL=http://127.0.0.1:8945/v5/ ALVIA_V5_EVIDENCE=/tmp/recetas-validaciones-check node docs/features/validaciones/verify.cjs
ALVIA_V5_URL=http://127.0.0.1:8945/v5/ ALVIA_V5_EVIDENCE=/tmp/recetas-ai-notes-check node docs/features/ai-notes/verify.cjs
```

Los runners aceptan `ALVIA_PLAYWRIGHT`, `ALVIA_V5_URL` y `ALVIA_V5_EVIDENCE`. Recetas verifica sólo recursos del runtime estático local; no acepta solicitudes externas de hosting.

```sh
# Elegir un destino nuevo para cada paquete:
python3 scripts/package_v5.py --working-tree /tmp/recetas-preview-new/v5
python3 -m http.server 8949 --bind 127.0.0.1 --directory /tmp/recetas-preview-new
# En otra terminal:
ALVIA_V5_URL=http://127.0.0.1:8949/v5/ ALVIA_V5_EVIDENCE=/tmp/recetas-preview-check node docs/features/recetas/verify.cjs
python3 docs/features/recetas/verify-package.py --runtime /tmp/recetas-preview-new/v5 --url http://127.0.0.1:8949/v5/ --output /tmp/recetas-package-checks.json
```

## Continuidad

La implementación local y la revisión conjunta están completas. Publicación, commit y paquete desde commit quedan como una acción separada; no se actualizó el registro de release como si la preview estuviera publicada. El runtime público continúa documentado en `2d3380d`.
