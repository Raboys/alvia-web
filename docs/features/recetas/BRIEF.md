# Recetas · brief

2026-09-12. Página institucional V5 para organizaciones de salud de Argentina. Alcance: PLAN_FEATURES §8, §9 y §10. Estado: publicada y verificada por pedido de Pablo; runtime `5f74ecf`. [Entrega y evidencia](README.md).

## Decisión y mensaje

El comprador necesita entender cómo la indicación del médico llega al celular del paciente dentro del servicio de telemedicina. Beneficio: sus afiliados encuentran el documento de la consulta en la app, desde donde pueden abrirlo, descargar el PDF o compartirlo.

Titular: «La receta de la consulta llega al celular del paciente.» Bajada: «El médico la prepara y emite en Alvia. Tus afiliados la encuentran en la app para descargarla o compartirla.» Se conservan voseo, CTA a WhatsApp, Lora/DM Sans y paleta V5. No se agregan tutoriales, métricas ni promesas de aceptación en farmacias.

## Relato y escenas

Una composición abierta reúne preparación médica y documento paciente. Ambas usan Sofía Giménez, Dra. Lucía Robles, Plan Integral y 12 sep 2026. El medicamento y su presentación se identifican como ficticios; se omiten dosis, diagnósticos, matrículas y firmas que no aportan a la demostración comercial. No es una recomendación terapéutica ni un payload para emitir.

- Consola médica: paciente, medicamento seleccionado, cantidad e indicación de ejemplo. Campos representados como datos de lectura, sin buscadores ni botones inactivos. El médico selecciona en vademécum, completa y emite.
- Celular: documento con la misma información. Radios nativos «En preparación / Documento listo» cambian el ejemplo entre `issued` y `ready`. Sólo el estado listo muestra el documento disponible. Descargar/compartir se explican como acciones de la app, sin controles falsos en la web institucional.
- Un desplegable compacto explica demoras, indisponibilidad y la restricción de consultas por invitación. CTA comercial y enlaces recíprocos completan la página.

Mocks HTML/CSS porque permiten leer texto y comparar estados en 320 px. Las capturas existentes muestran otro fixture y el documento de demostración; no se presentan como evidencia de emisión productiva. No se agregan imágenes ni JS de feature.

## Evidencia y condiciones resueltas

Producto `Raboys/telemed-starter` en `f5e854a813a08e57111044601eb982ba1924fba3`, checkout actual `/home/pablo/.t3/worktrees/telemed-starter/t3code-fe9193a6`.

| Afirmación | Fuente y límite |
|---|---|
| El profesional prepara y emite | `frontend/doctor/src/panel-receta.jsx`, `panel-receta-preview.jsx`: selección de catálogo, cantidad, posología, indicaciones y emisión. La preview no prueba emisión. |
| La preparación del PDF tiene un estado propio | `backend/src/Prescription/EmissionService.php`: confirma `issued` y encola PDF. `app/src/app/prescriptions.tsx`: `generating` → Generando; `issued` → Preparando; sólo `ready` abre. No se promete un plazo fijo. |
| Abrir, descargar, compartir | `app/src/app/prescription-detail.tsx`, `app/src/lib/pdf.ts`, `pdf.web.ts`: sólo `ready` habilita acciones. Guardar/compartir en móvil depende de la hoja del sistema. |
| Ejemplo de demostración | La vista paciente conserva «Documento de demostración · sin validez legal». `backend/src/Gateways.php` usa `mock` por defecto y `sandbox` para MisRx si no hay configuración. Esto no acredita la configuración productiva. |
| Alcance de consultas | `backend/src/Prescription/PrescriptionPolicy.php`: origen `invite` sólo permite lectura. Se evita «cualquier consulta» y se explicita la excepción bajo demanda. |

No se atribuye preparación de recetas a AI Notes ni se afirma firma digital, cumplimiento legal universal, disponibilidad instantánea, entrega de PDF por WhatsApp o aceptación en todas las farmacias. La integración MisRx se registra como procedencia, sin convertirla en un claim legal. No hace falta investigación normativa porque la página no formula afirmaciones de validez.

## Cierre verificable

Cinco anchos (1440/1024/768/390/320), texto ampliado y sin desborde; fixture consistente; estados distinguibles; navegación por teclado, sin JS y con movimiento reducido; CTA/enlaces válidos. Regresión de AI Notes y Validaciones sin sobrescribir evidencias históricas. Paquete `--working-tree` servido aislado y comparado por SHA-256. Capturas y procedencia en esta carpeta.
