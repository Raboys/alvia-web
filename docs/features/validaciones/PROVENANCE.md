# Validaciones · procedencia de las escenas

Todas las escenas son ejemplos nativos de HTML/CSS con datos sintéticos, identificados en la página. No son capturas literales ni operaciones reales.

Producto fuente: `Raboys/telemed-starter`, `f5e854a813a08e57111044601eb982ba1924fba3`. Institucional base: `Raboys/alvia-web`, `905a01c4700e3ff2ea020d37facf953fc25fcc92`. Runtime vigente: `2d3380dc31ea832366bdd9a1fd4c5e50722b9d74`; [manifiesto corregido](public-copy-update/release.json). Sólo cambia `validaciones.html` respecto del primer release `60dadfc`, conservado en `public/release.json`. Las capturas de `review/` y `public/` corresponden a esa primera versión; las de `public-copy-update/` muestran las correcciones de Pablo. El manifiesto de revisión usa `source_mode: working-tree-preview` y `source_commit: null`; no atribuye archivos nuevos a un commit anterior.

| Escena | Afirmación | Componente / archivo fuente | Fixture | Tratamiento y simplificación | Dimensiones / asset final |
|---|---|---|---|---|---|
| Requisitos antes de guardia | Se permite ingresar a la espera cuando están satisfechas las condiciones aplicables | `app/src/components/guardia/GuardiaConfirm.tsx`, `coverage-gateway/src/clearances.ts`, `backend/src/CoverageHelpers.php` | `fixture.json`: guardia, identidad `passed`, código `verified`, pago aplicado | Comprobante ilustrativo. Se omiten controles de captura, pago e ingreso; el resultado es informativo. No hay médico asignado, consulta iniciada ni panel médico inventado. | Fluido, texto de requisitos 15–16 CSS px. `.clearance-paper` en `v5/validaciones.html` y `validaciones.css`; sin raster. |
| Cobertura sin copago | Un requisito puede no corresponder; las reglas se configuran por cobertura | `coverage-gateway/src/policies.ts`, `clearances.ts` | `variants.no-copay`: importe y contextos null; identidad y código siguen requeridos | Radios nativos comparan dos configuraciones del ejemplo, no permiten evitar un pago real. «No requerido» es una aclaración editorial: la app omite la fila cuando el requisito no aplica. No hay llamadas al backend. | Mismo comprobante, radio mínimo de 44 CSS px. `.coverage-example` y `.copay-exempt`. |
| Documento y selfie | Se verifica DNI y coincidencia facial; puede reutilizarse el documento validado | `backend/src/Identity/IdentityService.php`, `app/src/components/identity/IdentityCapture.tsx`, `README.md` | Documento ya validado; comparación `passed` para la atención | Ilustración lineal abstracta en HTML/CSS/SVG con texto explicativo exterior. No muestra DNI real, datos personales, cámara ni prueba de vida. No confunde captura completada con aprobación. | Arte decorativo de 132 px de alto en escritorio y 112 px en móvil. `.identity-art`. |
| Código de credencial | El afiliado usa el código de la app de su cobertura | `app/src/components/ui/AuthCodeSheet.tsx`, `coverage-gateway/src/challenges.ts` | Código sintético `482`, tres dígitos según la corrección de Pablo | Tres casilleros decorativos sin formulario. El texto exterior sólo indica que el código viene de la app de la cobertura. Por pedido de Pablo se quitaron las aclaraciones de terminología y de acceso. No es un OTP generado por la página. | Casilleros de 29–37 CSS px de ancho; `.code-art`. |
| Momento del copago | Guardia antes de encolar; turno al reservar, sin segundo cobro al ingresar | `app/src/components/ui/PaymentSheet.tsx`, `pagos-y-copago.md`, `README.md` | ARS 3.000 de ejemplo, aplicado; `payment_timing` | Comprobante mínimo y dos definiciones de momento de pago. A pedido de Pablo, la línea de cierre dice «Con todos los medios de pago». No abre un checkout ni afirma que el dinero esté liquidado o sea no reembolsable. Importe ficticio identificado en la escena principal. | Arte de 132/112 px y texto HTML adaptable; `.payment-art`, `.copay-timing`. |
| Requisito pendiente | Se impide continuar mientras falte lo exigido | `coverage-gateway/src/clearances.ts`, `IdentityCapture.tsx`, `GuardiaConfirm.tsx` | Estado explicativo, sin transición ejecutada | `details` nativo, casos de código rechazado, identidad en revisión y pago sin confirmar. | Fluido; `.validation-conditions`. |

## Reproducción

Desde la raíz institucional:

```sh
python3 -m http.server 8935 --bind 127.0.0.1
node docs/features/validaciones/verify.cjs
```

El runner acepta `ALVIA_PLAYWRIGHT`, `ALVIA_V5_URL` y `ALVIA_V5_EVIDENCE`. Captura Chromium headless, DPR 1, anchos 1440, 1024, 768, 390 y 320 × 900 CSS px, full page y hero. Incluye alternativa sin copago, requisitos pendientes, sin JS y texto ampliado. Las imágenes de revisión no se usan como assets de la web ni se publican. No se sobrescribe `docs/design/v5-baseline` ni la evidencia histórica de AI Notes.

La verificación técnica demuestra fidelidad del ejemplo, legibilidad y funcionamiento; no preferencia del comprador, uso en dispositivos físicos ni conversión comercial.
