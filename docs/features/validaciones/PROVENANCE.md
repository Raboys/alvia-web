# Validaciones · procedencia de A refinada

A refinada es la variante elegida por Pablo para publicación. Autoría: Astra con un subagente
Astra; revisión de alternativas por otros dos subagentes Astra. La propuesta anterior de GLM fue
rechazada por composición. [Decisión y acabado](../../design/validaciones-astra-a/README.md).

| Escena | Fuente funcional contrastada | Tratamiento |
| --- | --- | --- |
| Identidad | `backend/src/Identity/IdentityService.php`, `app/src/components/identity/IdentityCapture.tsx` | Identificación y selfie genéricas con un único retrato SVG reutilizado; sin persona real ni datos personales. Se explica DNI y comparación facial, sin prueba de vida. |
| Código de credencial | `app/src/components/ui/AuthCodeSheet.tsx`, `coverage-gateway/src/challenges.ts` | `482` ilustrativo, obtenido en la app de la cobertura. No es un formulario ni una consulta a padrón. |
| Copago | `app/src/components/ui/PaymentSheet.tsx`, `pagos-y-copago.md` | QR, transferencias y tarjetas; al reservar un turno o antes de entrar a la espera en guardia. Sin operación, importe o liquidación simulados. |
| Pendientes | `coverage-gateway/src/clearances.ts`, `IdentityCapture.tsx`, `GuardiaConfirm.tsx` | Desplegable informativo sobre lo que falta completar antes de atenderse. |

Fuentes funcionales conservadas de la primera versión: `Raboys/telemed-starter`,
`f5e854a813a08e57111044601eb982ba1924fba3`. Contraste editorial posterior:
`f889e6f04b8420d5ed12946b3d0fa02dd434f98a`. Esta revisión cambia presentación;
no acredita nuevas capacidades o integraciones del producto.

Ilustración: `v5/assets/validaciones-identidad.svg`, 560 × 420, dos usos del mismo retrato,
4° de inclinación y sombras suaves. Iconos de pago y escudo: SVG inline. Código: HTML/CSS.
Los iconos decorativos usan `aria-hidden`; la ilustración principal tiene `alt` descriptivo.
[Fixture actual](fixture.json). Las capturas son evidencia y no se publican como assets.

Las carpetas `review/`, `public/` y `public-copy-update/` conservan pruebas históricas del diseño
anterior. [README](README.md) enlaza las pruebas actuales y el release real.
