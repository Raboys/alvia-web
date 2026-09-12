# Validaciones · brief V5

2026-09-12. Página: `v5/validaciones.html`. Alcance: entrega local según `v5/PLAN_FEATURES.md`, sin publicación.

## Decisión y mensaje

El comprador es una obra social, prepaga u organización de salud argentina que quiere ofrecer atención online manteniendo sus reglas de cobertura. Titular: «Ofrecé atención online con las reglas de tu cobertura.» Identidad, código de credencial y copagos son configurables; no son tres pasos obligatorios para todos.

El afiliado resuelve los requisitos aplicables antes de atenderse. El médico recibe la consulta una vez cumplidas esas condiciones; no se dibuja un panel médico de validaciones. Beneficio operativo sin cifras de ahorro, promesas clínicas ni garantías de ausencia de fraude.

## Composición elegida

- Hero con beneficio, bajada breve, CTA comercial y comprobante ilustrativo de atención espontánea. Sofía Giménez, cobertura ficticia «Plan Integral», 12/09/2026. Identidad aprobada, código validado y copago de ejemplo de ARS 3.000 aplicado a esa atención.
- Selector nativo «Con copago / Sin copago» cambia la regla de cobertura del ejemplo y muestra la excepción «No requerido». Es una comparación de configuraciones; no es una acción del paciente para evitar pagar. Leyenda visible lo identifica como ejemplo. Radios funcionan sin JavaScript, con teclado y sin animación automática.
- Tres demostraciones compactas y abiertas: documento/selfie, código de seis dígitos y momentos de pago. Texto HTML legible, sin capturas de escritorio encogidas. No se simula verificación, toma de fotos, cobro ni acceso a una consulta real.
- Un desplegable explica que los requisitos pendientes impiden continuar. Cierre con demo por WhatsApp y correo existentes. Retorno a home y enlace cruzado con AI Notes. Recetas permanece sin destino.

## Fuentes y decisiones de fidelidad

Producto `Raboys/telemed-starter`, commit `f5e854a813a08e57111044601eb982ba1924fba3`, checkout `/home/pablo/.t3/worktrees/telemed-starter/t3code-40ffe8a5`. Institucional base `905a01c4700e3ff2ea020d37facf953fc25fcc92`, checkout `/home/pablo/dev/alvia-web-v5-features`.

| Tema | Fuente contrastada | Decisión |
|---|---|---|
| Requisitos configurables | `coverage-gateway/src/policies.ts`, `clearances.ts`, `backend/src/CoverageHelpers.php` | Sólo se exige lo configurado; identidad y pago aprobados y código validado están vinculados a la atención. El ejemplo ya satisface las condiciones, no representa un bypass. |
| Pre-cola | `app/src/components/guardia/GuardiaConfirm.tsx` | La atención espontánea permite ingresar a la espera después de resolver los requisitos. El estado final no se representa como consulta iniciada ni médico asignado. |
| Identidad | `backend/src/Identity/IdentityService.php`, `app/src/components/identity/IdentityCapture.tsx`, `README.md` | DNI y comparación facial; sólo `passed` habilita aprobación. Documento previamente validado puede reutilizarse. No se afirma prueba de vida ni se mezcla alta de cuenta con autorización de atención. |
| Código | `app/src/components/ui/AuthCodeSheet.tsx`, `coverage-gateway/src/challenges.ts` | «Código de credencial» se relaciona una vez con el nombre de UI «Código de autorización» y la app de la cobertura. No es número de afiliado ni OTP de acceso a Alvia. Seis dígitos son fixture, no longitud universal. |
| Copago | `app/src/components/ui/PaymentSheet.tsx`, `pagos-y-copago.md`, `README.md` | Guardia: antes de la cola. Turno: al reservar. No se vuelve a cobrar al entrar al turno. No se demuestra liquidación final, reembolso ni conciliación financiera. |

Continuidad: Lora y DM Sans locales, blanco, azul/naranja, contenedor de 1160 px, encabezado y navegación existentes. Aplicar `v5/DESIGN.md` y `telemed-starter/docs/COPYWRITING.md`: beneficio directo, pocas secciones y texto que cambia comprensión o decisión. Se eligen mocks nativos para explicar estados con lectura móvil; no hacen falta imágenes nuevas ni dependencias.

## Verificación prevista

Cinco anchos del plan, selector y desplegable por teclado y sin JS, foco, navegación móvil, entrada directa y enlaces cruzados, reflujo al ampliar texto, movimiento reducido, ausencia de llamadas a producto y recursos fallidos. Empaquetado `--working-tree`, comparación de hashes y prueba HTTP del paquete aislado. Evidencia y procedencia junto a este brief; no sobrescribir baseline ni declarar un release publicado.
