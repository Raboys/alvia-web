# V5 · bloque de features para revisión

2026-09-12. **Implementación local, no publicada.** Runtime: `0b5a3c10b397fc34626dd0d07b8222b4780d4655`. Rama `feat/v5-feature-pages-plan`.

El bloque «Mucho más que una videollamada» aparece después de las modalidades de red y antes de organizaciones. Presenta Validaciones, AI Notes y Recetas con ilustraciones HTML/CSS. Por instrucción de Pablo, sus tres entradas son informativas: sin enlaces, botones, flechas ni subpáginas provisorias.

| Escritorio, 1440 px | Móvil, 390 px |
|---|---|
| [Bloque](desktop-features.png) | [Bloque](mobile-features.png) |
| [Home completa](desktop-full.png) | [Home completa](mobile-full.png) |

Las capturas corresponden al sitio servido por HTTP local, fuentes e imágenes cargadas. No sustituyen las [capturas de la base aprobada](../v5-baseline/README.md) ni registran aprobación del nuevo diseño.

## Verificación

- [146 comprobaciones de regresión](regression-checks.json) mediante el verificador de autoría existente de V5: navegación, recursos, hero, calculadora, selector de app, pestañas, teclado, preguntas, móvil y fallback sin JavaScript.
- [40 comprobaciones finales del bloque](feature-checks.json) a 1440, 1024, 768, 390 y 320 px: orden, ubicación, ausencia de controles/enlaces, contenido visible, desborde, recursos y acceso desde footer; también sin JS y con movimiento reducido.
- Revisión visual de las miniaturas a 1440, 768, 390 y 320 px. En móvil AI Notes se sintetiza gráficamente para no mostrar párrafos cortados; toda la explicación permanece en el texto exterior.
- [Paquete verificado](package-checks.json): 12 archivos de runtime, 433.097 bytes. Referencias resueltas y SHA-256 de todos los archivos comprobados al servir el paquete por HTTP. Incluye `features.css`; sólo hay una página HTML, sin documentación ni subpáginas pendientes. Smoke del paquete en navegador a 1440 y 390 px: sin errores ni desborde, estilo de features cargado y tres entradas informativas.
- Revisión editorial independiente: sin blockers de alcance, continuidad o claims en el plan y el bloque.

Herramientas de autoría usadas en esta sesión: `/tmp/alvia-v5-check.cjs`, `/tmp/alvia-v5-features-check.cjs`, Playwright/Chromium y `scripts/package_v5.py`. Los resultados y capturas quedan versionados aquí; las herramientas temporales no forman parte del runtime.

## Continuar

Leer [la guía de desarrollo por páginas](../../../v5/PLAN_FEATURES.md). El siguiente paso es profundizar e implementar **Validaciones**. AI Notes y Recetas permanecen sin destino hasta sus respectivas corridas.
