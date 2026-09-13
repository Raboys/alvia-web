# Atlas — memoria de largo plazo de Alvia Web

Reconstrucción ordenada de las sesiones de trabajo que llevaron la web institucional desde V1 hasta la V5 vigente. El Atlas cruza los digests de Codex con Git, PRs, releases y archivos reales para separar lo publicado, lo histórico y lo pendiente.

## Estructura

- `sessions/NNN-YYYY-MM-DD-<uuid8>.md` — digest por sesión: trabajo, decisiones, verificaciones y cabos sueltos.
- `INDEX.md` — headline cronológico por sesión.
- `INVENTORY.md` — estado real actual por área.
- `LOOSE_ENDS.md` — pendientes deduplicados y congelador deliberado.
- `NEXT.md` — camino crítico corto, escrito sólo después de confirmar el objetivo actual con Pablo.
- `map.html` — proyección visual de INVENTORY/LOOSE_ENDS/NEXT; los Markdown mandan. El render local fue verificado en Chrome; no se publicó una URL Artifact porque esa herramienta no está disponible en este entorno.

## Estado del proceso

- [x] Cold start Codex (2026-09-12 UTC): 24 sesiones candidatas procesadas en paralelo con seis workers `openai/gpt-5.6-terra`; 23 digests pertinentes conservados y una coincidencia incidental descartada.
- [x] Cobertura temporal: 2026-08-22 → 2026-09-12 UTC, desde la creación V1/V2/V3 hasta V5, las cuatro páginas de producto y URLs limpias.
- [x] Síntesis cruzada con `main@d1dc60a`, `origin/main`, PRs #1–#31, documentación de diseño/release y el estado público registrado por esos releases.
- [x] `NEXT.md`: sin prioridad activa registrada después de consultar; el Atlas no inventa objetivos a partir de sesiones pasadas.

## Cómo se eligieron las sesiones

El trabajo de Alvia Web se inició muchas veces desde sesiones cuyo repo primario era `telemed-starter`. Por eso este cold start leyó `~/.codex/sessions`, tomó sólo sesiones raíz, excluyó subagentes y la sesión activa, y seleccionó evidencia explícita de `/home/pablo/dev/alvia-web` o `Raboys/alvia-web`. Una auditoría de disco ajena al proyecto entró por una mención incidental y se eliminó después de revisar el digest.

Para mantenerlo vivo, agregar una línea a `INDEX.md` y actualizar únicamente los ítems afectados en INVENTORY/LOOSE_ENDS/NEXT al cerrar trabajo significativo. No reprocesar todo salvo que se pierda la numeración o la fuente cambie.
