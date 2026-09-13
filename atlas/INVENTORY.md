# INVENTORY — qué existe hoy y en qué estado real

Actualizado 2026-09-12 UTC, reconstruido de 23 sesiones raíz de Codex, el repo, releases y PRs actuales.
Leyenda: ✅ publicado/real · 🟡 construido pero demo, manual o parcial · ⚠️ verificar · 🔴 no existe.

## Superficie pública

- ✅ **V5 en producción** — `alvia.ar` y `www.alvia.ar` sirven el sitio V5 desde la raíz. El runtime público actual registrado es `4239034`; la documentación vigente termina en `d1dc60a`.
- ✅ **URLs canónicas limpias** — Home `/` y features `/ainotes`, `/validaciones`, `/recetas`, `/turnos-inteligentes`. `/v5`, variantes con slash y rutas `.html` redirigen de forma compatible; PRs #30–#31.
- ✅ **V1–V4 retiradas de la navegación pública** — permanecen versionadas como referencia y evidencia histórica, pero sus rutas públicas redirigen a V5.

## Narrativa y diseño

- ✅ **Dirección V5** — composición inspirada en 1DOC3, adaptada a Alvia; Lora + DM Sans, paleta petróleo/menta, hero comercial y narrativa argentina. Las decisiones y restricciones están en `v5/DESIGN.md`, `v5/README.md` y los releases.
- ✅ **Home orientada a producto** — tarjetas de features variante C, calculadora de capacidad variante C, CTA y secciones comerciales conectan la promesa con evidencia visual concreta.
- ✅ **Navegación responsive** — desktop muestra beneficio junto al header; mobile usa megamenú visual. Los indicadores de salida adoptaron chevrons B. El trabajo quedó publicado y documentado, aunque el PR draft #26 original quedó abierto y conflictivo después de integraciones posteriores.

## Páginas de producto

- ✅ **AI Notes** — página comercial publicada con narrativa, mock y comportamiento propio; ruta canónica `/ainotes`.
- ✅ **Validaciones** — página comercial publicada y corregida tras la primera verificación pública; ruta `/validaciones`.
- ✅ **Recetas** — página comercial publicada con mock de prescripción refinado; ruta `/recetas`.
- ✅ **Turnos inteligentes** — cuarta página de producto publicada con explicación de capacidad/agenda; ruta `/turnos-inteligentes`.
- 🟡 **Naturaleza de las demos** — estas páginas son superficies estáticas de marketing y evidencia del producto; no ejecutan las capacidades clínicas o administrativas del backend de Telemed dentro de este repo.

## Assets y evidencia

- ✅ **Capturas y verificaciones reproducibles** — cada iteración relevante conserva checks, screenshots desktop/mobile, manifests de publicación y notas de release bajo `docs/design/` y `docs/releases/`.
- ✅ **Assets V5 locales** — tipografías con licencia, imágenes WebP, favicon y scripts/styles se empaquetan sin dependencias de runtime externas; la imagen principal fue generada para V5 y las capturas del producto provienen de superficies reales.
- 🟡 **Videos históricos V1–V4** — existen loops de videoconsulta/KYC generados con ElevenLabs. Ya no se publican con V5; no hay evidencia en el repo de autorización comercial escrita para reutilizarlos.

## Entrega y operación

- ✅ **Paquete reproducible** — `scripts/package_v5.py` arma el release V5 y la documentación registra hashes/checks HTTP y comparación visual para publicaciones relevantes.
- 🟡 **Deploy manual y atómico** — la publicación al servidor está documentada y verificada, pero no existe un workflow de CI/CD del repo; los releases dependen de ejecutar el runbook manual.
- ✅ **Repositorio sincronizado** — `main@d1dc60a` coincide con `origin/main` al cierre de este refresh.

## Documentación e historia

- ✅ **Fuente de verdad V5** — `README.md`, `v5/README.md`, `v5/DESIGN.md`, `v5/PLAN_FEATURES.md`, `v5/TODO.md` y `docs/releases/2026-09-12-v5.md` describen el estado vigente; `v5/TODO.md` no conserva tareas abiertas de implementación.
- ✅ **Versiones anteriores preservadas** — V1–V4, alternativas y previews rastreados permiten reconstruir decisiones sin confundirlos con la versión pública actual.
- ⚠️ **Artefactos locales sin decisión** — el checkout conserva un prompt V4 y previews no rastreados; no forman parte de `main` y deben preservarse hasta decidir archivo, commit o descarte.
