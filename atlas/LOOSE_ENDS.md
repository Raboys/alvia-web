# LOOSE_ENDS — todos los hilos sueltos

Consolidado de 23 sesiones raíz de Codex (2026-08-22 → 09-12 UTC) y `main`/PRs al 09-12 UTC, dedupeado y con lo resuelto filtrado. `(NNN)` refiere al digest en `sessions/`. Lo que no se promueva explícitamente a `NEXT.md` queda estacionado acá.

## Producto y mensaje

- [ ] **Validación comercial real** — el trabajo ADRI concluyó que la implementación web dejó de ser el cuello de botella: faltan conversaciones, objeciones, evidencia de conversión y aprendizaje de compradores reales para decidir el próximo cambio de mensaje (003/006).
- [ ] **Verdad de producto en mocks futuros** — mantener el criterio de no inventar capacidades y actualizar capturas sólo cuando el producto Telemed cambie de forma material (001/003/015–024).

## Operación y calidad

- [ ] **Publicación sigue siendo manual** — `scripts/package_v5.py` y los runbooks hacen el proceso reproducible/atómico, pero no hay CI/CD. Automatizar sólo si la frecuencia o el riesgo operativo lo justifican (014–024; repo real).
- [ ] **PR draft #26 conflictivo** — el megamenú mobile fue reimplementado/documentado a través de cambios posteriores en `main`; el PR `feat/v5-mobile-megamenu` hoy tiene conflictos y no es ancestro de `main`. Comparar cualquier diferencia residual útil y luego cerrar o reemplazar el PR (021; GitHub real).
- [ ] **Prueba de regresión consolidada** — hay verificadores por variante/release, pero no un único gate automatizado que recorra Home, las cuatro rutas canónicas, redirects y breakpoints antes de publicar. Promover sólo si el mantenimiento manual empieza a fallar.

## Housekeeping repo

- [ ] **Prompt V4 no rastreado** — `PROMPT_WEB_V4_ORCHESTRATION.md` sigue en el checkout principal. V4 ya fue reemplazada por V5; decidir si aporta memoria que deba archivarse/commitearse o si es descartable (008–012; repo real).
- [ ] **Previews locales no rastreados** — preservar hasta decidir: `previews/cta-variants/aplicada`, `aplicada-portada-inicial/`, `publicacion-b/`, `release-b/` y `previews/prescription-variants/`. Parte del árbol `previews/` sí está rastreada; no borrar en bloque (019/020; repo real).
- [ ] **Cerrar ramas/PRs superseded** — después de resolver #26, revisar ramas remotas de variantes ya integradas para reducir ambigüedad sin perder evidencia.

## Legal / assets históricos

- [ ] **Licencia de videos ElevenLabs** — no hay evidencia de autorización comercial escrita para los loops históricos V1–V4. No bloquea V5 porque esas versiones ya no se publican; verificar antes de republicar o reutilizar sus videos (002/014).

## Congelador deliberado

- V4 A/B y V4-C como candidata pública → reemplazadas por V5; conservar sólo como historia/evidencia.
- Nuevas variantes visuales sin hipótesis comercial o defecto reproducible → esperar señal de usuarios/compradores.
- Backend o interactividad clínica dentro de este repo → las capacidades reales pertenecen a `telemed-starter`; este repo es la superficie institucional estática.
- Automatización de deploy completa → cuando la frecuencia, el equipo o el costo de error supere el runbook manual.
