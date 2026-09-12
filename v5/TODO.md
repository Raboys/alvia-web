# Ejecución de PLAN_FEATURES · V5

Estado vigente: runtime `ddc8df8`. Home, Validaciones, AI Notes, Recetas y Turnos inteligentes están publicados; las cuatro tarjetas completas llevan a sus páginas y el megamenú mobile ofrece los mismos accesos. [Registro de publicación](../docs/releases/2026-09-12-smart-appointments.md). Los bloques anteriores conservan la historia de cada corrida.

## AI Notes · corrida y publicación inicial

2026-09-12. Alcance de esta corrida: **AI Notes**, por pedido explícito de Pablo, adelantada al orden original. Validaciones y Recetas siguen pendientes. Publicación y commits autorizados por Pablo en el mensaje posterior.

| ID | Estado | Resultado y verificación |
|---|---|---|
| AI-01 | done | Contrastar panel, ciclo, consentimiento y firma con producto `f5e854a`; leer DESIGN, COPYWRITING y baseline. Brief en `docs/features/ai-notes/BRIEF.md`. |
| AI-02 | done | Implementar página, caso ficticio, escenas nativas y procedencia (§7, §9). Resumen legible y rol médico visible. |
| AI-03 | done | Conectar sólo AI Notes desde home; entrada directa, retorno y CTA comercial (§5, §10). |
| AI-04 | done | Revisar 1440/1024/768/390/320, teclado, sin JS, movimiento reducido, copia y recursos; guardar capturas (§10). |
| AI-05 | done | Verificar empaquetado y hashes del runtime, revisar diff y actualizar continuidad (§10, §11). |

La guía completa conserva las entregas de las otras páginas; no se implementan en esta corrida. La verificación de paquete de trabajo se distinguirá de un release de commit y de cualquier publicación.

Corrección de Pablo: se reabrió AI-02 para eliminar frases artificiosas y exceso de texto. Foco en documentación automatizada, eficiencia de la consulta y estudios recibidos por email/WhatsApp. La revisión anterior queda invalidada por esta reescritura.

Cierre: 148 checks de página en autoría y 148 sobre paquete aislado; 146 checks del menú/home, hashes HTTP y referencias validadas. Revisión visual de los cinco anchos y diff final completados. Evidencia en `docs/features/ai-notes/README.md`. Todas las tareas de implementación local están terminadas. Ese cierre correspondía a la preview; publicación y commits completados en la continuación de abajo.

## Publicación autorizada

| ID | Estado | Resultado y verificación |
|---|---|---|
| AI-06 | done | Consolidar corrección editorial y decisiones reutilizables en DESIGN, PLAN_FEATURES y brief. |
| AI-07 | done | Commit de implementación y documentación; empaquetar desde ese commit y comparar con runtime revisado. |
| AI-08 | done | Publicar mediante reemplazo atómico del enlace V5; comprobar URL, home, recursos y rutas existentes. |
| AI-09 | done | Registrar commit servido, evidencias públicas y rollback; commit final de documentación. |

Runtime confirmado: `a4ca4aa824b49d767349cca3bc78b1004e7702e2`. Paquete de commit: 16 archivos, 451.577 bytes; todos coinciden con el árbol revisado. Smoke HTTP desktop/móvil correcto.

Publicación verificada en `alvia.ar` y `www.alvia.ar`: 148 checks de página, 146 de home, 16 archivos con hashes correctos usando las URLs versionadas; manifiesto de commit correcto. Nginx y rutas encontradas preservadas; release anterior conservado.

Cierre final: implementación, publicación y documentación terminadas. Commit de runtime `a4ca4aa`; registro de publicación y evidencias en el commit final de documentación. Todas las tareas están `done`.

## Validaciones · 2026-09-12

Nueva corrida solicitada: implementar únicamente Validaciones según PLAN_FEATURES (§6, §9, §10). El cierre de AI Notes anterior conserva su alcance histórico. Checkout institucional limpio al inicio, base `905a01c`; producto contrastado `f5e854a`. El primer cierre fue local; la petición posterior de Pablo autoriza publicación, documentación, commits y push, registrados al final.

| ID | Estado | Resultado y verificación |
|---|---|---|
| VAL-01 | done | Reglas, KYC `passed`, código de cobertura y momentos de pago contrastados con `f5e854a`; brief en `docs/features/validaciones/BRIEF.md`. |
| VAL-02 | done | Página V5, ejemplos nativos, alternativa sin copago sin JS, fixture y manifiesto de autoría completos (§5, §6, §9). |
| VAL-03 | done | Validaciones enlazada desde home y con enlace recíproco en AI Notes; Recetas permanece informativa (§10). |
| VAL-04 | done | 205 checks correctos: cinco anchos, teclado, sin JS, movimiento reducido, enlaces, recursos y texto ampliado. Desborde de texto ampliado corregido. Capturas finales conservadas; 148 checks de regresión AI Notes correctos. |
| VAL-05 | done | 205 checks también sobre paquete aislado: 18 archivos, 472.984 bytes; HTTP y SHA-256 coinciden. Brief, procedencia, capturas, README y continuidad actualizados; diff revisado. Preview `--working-tree`, sin commit ni publicación. |

Cierre de Validaciones: todas las tareas locales están `done`. [Entrega y evidencia](../docs/features/validaciones/README.md). En ese cierre local el runtime era `a4ca4aa`; la publicación posterior desde `60dadfc` se registra abajo. Próxima página pendiente: Recetas.

## Publicación de Validaciones autorizada

Pablo aprobó la página y pidió publicarla, actualizar los Markdown, commitear y pushear a `Raboys/alvia-web`.

| ID | Estado | Resultado y verificación |
|---|---|---|
| VAL-06 | done | Preflight guardado; implementación `60dadfc` commiteada y pusheada. Paquete de commit: 18 archivos, 472.984 bytes, hashes idénticos a la preview aprobada; 205 checks correctos por HTTP. |
| VAL-07 | done | Release `v5-60dadfc` activo desde 17:43:31 UTC. 18 archivos y manifiesto verificados en origen y ambos dominios; rutas y hash de Nginx conservados, release `v5-a4ca4aa` disponible para rollback. |
| VAL-08 | done | 205 checks públicos de Validaciones, 148 de AI Notes y 18 en www; evidencias guardadas. Markdown actualizado con aprobación, runtime `60dadfc` y rollback. |
| VAL-09 | done | Implementación `60dadfc` y documentación/evidencia en commits separados, publicados en `origin/feat/v5-feature-pages-plan`; cierre con confirmación de HEAD remoto. |

Cierre de publicación: Validaciones aprobada, publicada y verificada en ambos dominios. Runtime `60dadfc`; 205 checks públicos, 148 de AI Notes y 18 de www. Documentación, capturas y rollback conservados. Todas las tareas solicitadas están `done`; Recetas queda para la siguiente corrida.


## Corrección del código de autorización

Pablo indicó que el código de autorización suele tener tres dígitos y pidió eliminar las aclaraciones «En Alvia se llama…» y «Es distinto del número de afiliado…». Se corrige el ejemplo a `482` y se conserva sólo la indicación de obtenerlo en la app de la cobertura. También pidió sustituir la aclaración de segundo cobro por «Con todos los medios de pago». Continúa la autorización de publicación, documentación, commit y push.

| ID | Estado | Resultado y verificación |
|---|---|---|
| VAL-10 | done | Tres dígitos y copy corregidos según Pablo. Runtime `2d3380d` publicado; 205 checks locales y 205 públicos, hashes correctos en origen y ambos dominios. Documentación/evidencia actualizadas y commits pusheados. |


## Recetas · 2026-09-12 · entrega local

Pedido actual: desarrollar Recetas según PLAN_FEATURES (§8–10) y revisar la navegación conjunta. Base institucional limpia `ab8aa78`; producto `f5e854a813a08e57111044601eb982ba1924fba3`. Publicación y paquete desde commit son un paso posterior; esta corrida verifica una preview de trabajo.

| ID | Estado | Resultado y verificación |
|---|---|---|
| RX-01 | done | Preparación, emisión, estados, recepción y condiciones contrastados con `f5e854a`; brief y fixture documentados (§8–9). |
| RX-02 | done | Página V5, escenas nativas del mismo caso y procedencia por escena completas; texto legible y estados coherentes (§5, §8–9). |
| RX-03 | done | Recetas enlazada desde home, AI Notes y Validaciones; navegación recíproca de las tres features verificada (§10). |
| RX-04 | done | 232 comprobaciones de Recetas; cinco anchos, ambos estados, teclado, sin JS, movimiento reducido, texto ampliado y nombres largos. Corrección de foco/clic del selector en 320 sin JS. Regresiones: Validaciones 205 y AI Notes 148 correctas; capturas guardadas (§10). |
| RX-05 | done | 232 checks sobre paquete aislado; 20 archivos, 493.421 bytes, HTTP/SHA-256 idénticos al árbol revisado. 105 enlaces locales de Markdown válidos; diff, capturas y continuidad revisados (§10–11). |


Cierre: todas las tareas locales de Recetas están `done`. [Entrega, capturas y comprobaciones](../docs/features/recetas/README.md). Preview `--working-tree`, `source_commit: null`, base `ab8aa78`. Ese fue el cierre local, sin publicación; la continuación autorizada de abajo registra el release de commit publicado posteriormente.


## Publicación de Recetas autorizada · 2026-09-12

Pablo pidió publicar, commitear implementación y documentación, y pushear. Se continúa la entrega local anterior. Preflight: runtime `2d3380d`, rama local sincronizada con `origin/feat/v5-feature-pages-plan`; Nginx y rutas registrados en `docs/features/recetas/public/before-deploy.json`.

| ID | Estado | Resultado y verificación |
|---|---|---|
| RX-06 | done | Implementación `5f74ecf` commiteada y pusheada; paquete desde commit: 20 archivos, 493.421 bytes, idéntico a la preview. 232 checks y hashes HTTP correctos. |
| RX-07 | done | Release `v5-5f74ecf` activado con reemplazo atómico; `v5-2d3380d` conservado para rollback. |
| RX-08 | done | 232 checks públicos en apex y 232 en www; Validaciones 205 y AI Notes 148. 20 archivos y manifiesto correctos en origen/ambos dominios. Nginx/rutas conservados; capturas y rollback guardados. |
| RX-09 | done | Release, evidencias, rollback y Markdown actualizados; commit de documentación posterior al runtime y push a la rama existente, con comprobación del HEAD remoto. |


Cierre de publicación: Recetas disponible en ambos dominios desde `5f74ecf`. 232 checks en cada dominio, Validaciones 205 y AI Notes 148; 20 archivos y manifiestos verificados. Todas las tareas están `done`. Los commits de implementación y documentación están pusheados a `origin/feat/v5-feature-pages-plan`; `v5-2d3380d` se conserva para rollback.


## Accesos a funcionalidades · alternativa C

C elegida explícitamente por Pablo, implementada y publicada. Runtime `f281d8b`: tarjetas completas con enlace nativo, acción «Explorar [función] →», foco visible y composición responsive. Documentación, 53 comprobaciones locales, 53 en cada dominio público, hashes y capturas en [el registro de tarjetas C](../docs/design/v5-feature-cards/README.md). El paquete exacto del commit pusheado está publicado; la evidencia se registra en un commit posterior sin modificar el runtime.


## Header · opción 4 · publicado

Pablo eligió Nombre + beneficio y autorizó documentación, commit, push y publicación. Implementación `6176676` publicada en apex y www: accesos a Validaciones, AI Notes y Recetas siempre visibles en mobile, con estado activo, Ingresar y Hablemos. Verificadas 36 combinaciones de página/ancho en cada dominio, además de navegación sin JS, header fijo y los 21 archivos/manifiestos por HTTP y SHA-256. Release anterior `v5-0cd831d` conservado. [Decisión, evidencia y rollback](../docs/design/v5-header-option4/README.md).

## Chevrones B · terminado y publicado

Selección B implementada en las cuatro páginas. Commit de runtime `8276775` pusheado y publicado; 54 comprobaciones locales y 54 en cada dominio, 21 archivos/manifiesto verificados por HTTP. Header mobile y funcionalidades preservados. [Registro y rollback](../docs/releases/2026-09-12-chevron-b.md).

## Turnos inteligentes · terminado y publicado

| ID | Estado | Resultado y verificación |
|---|---|---|
| TURNOS-01 | done | Variante D integrada con copy directo, «ausentismo», confirmación 24 horas antes y reasignación dinámica. Se quitaron la sección de reglas y «modalidad y cobertura». |
| TURNOS-02 | done | Cuarta tarjeta y mención independiente agregadas a home; navegación común actualizada en las cinco páginas. |
| TURNOS-03 | done | 25 combinaciones locales y 10 del paquete aislado sin errores ni desbordes. Paquete de commit: 25 archivos, 547.182 bytes. |
| TURNOS-04 | done | PR #28 integrado; release `v5-ddc8df8` activado atómicamente y `v5-41a6d83` conservado. 35 combinaciones públicas correctas en apex y www. |

Cierre: implementación, integración, publicación y verificación terminadas. Runtime `ddc8df8`; [release y rollback](../docs/releases/2026-09-12-smart-appointments.md).
