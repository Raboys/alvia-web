# Validaciones · entrega local V5

2026-09-12. Implementada en [v5/validaciones.html](../../../v5/validaciones.html), con enlace desde home y navegación recíproca con AI Notes. Recetas sigue informativa. **Sin publicar ni crear commits:** el runtime público registrado continúa en `a4ca4aa`.

La página reúne identidad, código de credencial y copagos bajo las reglas de cobertura. El ejemplo de guardia permite comparar una cobertura con copago y otra sin copago mediante radios nativos. Explica DNI/selfie, el código de la app de la cobertura y el momento del pago: al reservar un turno o antes de entrar a la espera en guardia. No hay un segundo cobro al ingresar al turno reservado.

- [Brief y decisiones](BRIEF.md), [procedencia por escena](PROVENANCE.md) y [fixture sintético](fixture.json).
- [Estado durable](../../../v5/TODO.md) y [continuidad del plan](../../../v5/PLAN_FEATURES.md).
- Institucional base `905a01c4700e3ff2ea020d37facf953fc25fcc92`; producto contrastado `f5e854a813a08e57111044601eb982ba1924fba3`.

## Revisión visual

| Ancho CSS | Página completa |
|---|---|
| 1440 | [Escritorio](review/1440-full.png) |
| 1024 | [Escritorio compacto](review/1024-full.png) |
| 768 | [Tablet](review/768-full.png) |
| 390 | [Móvil](review/390-full.png) |
| 320 | [Móvil pequeño](review/320-full.png) |

También: [hero escritorio](review/1440-hero.png), [hero móvil](review/390-hero.png), [cobertura sin copago](review/390-no-copay.png), [requisito pendiente](review/390-pending-requirement.png), [sin JavaScript](review/390-no-js.png), [selector sin JavaScript](review/390-without-JS-no-copay.png), [texto ampliado](review/720-enlarged-text.png), [entrada de home](review/1440-home-features.png) y [home móvil](review/390-home-features.png).

Chromium headless, DPR 1. Revisión de composición y legibilidad en los cinco anchos, sin desborde horizontal. Se corrigió un desborde de palabras en la prueba de texto ampliado. Las capturas no acreditan preferencia comercial, conversión ni pruebas en dispositivos físicos. No se sobrescribieron el baseline aprobado ni las capturas históricas de AI Notes.

## Verificaciones

- **[205 comprobaciones locales](review/browser-checks.json)** y **[205 sobre el paquete aislado](review/package-browser-checks.json)**: acceso directo, fuentes, fixture, ambas variantes, teclado, foco, navegación móvil y Escape, requisitos pendientes, enlaces y anclas, ida/vuelta entre features, Recetas sin enlace, ausencia de errores y de llamadas externas o al producto, sin JS, movimiento reducido y reflujo equivalente a zoom de 200 % más texto de lectura ampliado.
- **[148 comprobaciones de regresión de AI Notes](review/ai-notes-regression-checks.json)**: copia y fallback, consentimiento, estudios, navegación y estados responsivos. Se actualizan sólo las dos aserciones de home que antes esperaban a Validaciones sin destino; las evidencias históricas se conservan.
- **[Paquete HTTP y SHA-256](review/package-checks.json)**: 18 archivos, 472.984 bytes, más manifiesto; todos coinciden con el árbol revisado. Incluye fuentes y licencias, excluye documentos, fixtures y capturas. La nueva página no agrega imágenes ni JS propio y sus estilos no se cargan en home.
- **[Manifiesto del runtime revisado](review/runtime-manifest.json)**: `source_mode: working-tree-preview`, `source_commit: null`, base `905a01c`. Paquete local `/tmp/alvia-validaciones-verified/v5`. No es un release de publicación.
- `node --check` del runner nuevo y navegación común, HTML con IDs/referencias accesibles comprobados y `git diff --check` sin errores. Revisión final de cambios limitada a la página, navegación y documentación relacionada.

## Reproducir

Desde `/home/pablo/dev/alvia-web-v5-features`:

```sh
python3 -m http.server 8935 --bind 127.0.0.1
# http://127.0.0.1:8935/v5/validaciones.html
# En otra terminal:
node docs/features/validaciones/verify.cjs

# Regresión de AI Notes, sin sobrescribir su evidencia histórica:
ALVIA_V5_URL=http://127.0.0.1:8935/v5/ ALVIA_V5_EVIDENCE=/tmp/alvia-validaciones-ai-notes-regression node docs/features/ai-notes/verify.cjs
```

El runner acepta `ALVIA_PLAYWRIGHT`, `ALVIA_V5_URL` y `ALVIA_V5_EVIDENCE`. El valor por defecto de Playwright apunta a la instalación local registrada, sin agregar dependencias al sitio.

```sh
# Elegir un destino nuevo para cada paquete:
python3 scripts/package_v5.py --working-tree /tmp/alvia-validaciones-preview-new/v5
python3 -m http.server 8937 --bind 127.0.0.1 --directory /tmp/alvia-validaciones-preview-new
# En otra terminal:
ALVIA_V5_URL=http://127.0.0.1:8937/v5/ ALVIA_V5_EVIDENCE=/tmp/alvia-validaciones-package-review node docs/features/validaciones/verify.cjs
```

Antes de una futura publicación corresponde guardar el runtime en un commit, empaquetar con `--ref <commit>` y comparar sus hashes con la evidencia revisada. Esta corrida completa el desarrollo local solicitado. El registro de release no se modifica como si hubiera habido un despliegue.
