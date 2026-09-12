# V5 · bloque de features para revisión

2026-09-12. **Publicada en V5 para revisión por pedido de Pablo.** Runtime: `0b5a3c10b397fc34626dd0d07b8222b4780d4655`. Rama `feat/v5-feature-pages-plan`.

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

## Publicación para revisión

Pablo pidió «Publicalo en v5, dale asi lo veo». Publicado el 2026-09-12 en [V5](https://alvia.ar/v5/#funcionalidades), release `/var/www/alvia.ar/releases/v5-0b5a3c1`. El anterior `v5-c2817c1` se conserva. No se crearon enlaces a subpáginas.

- [40 comprobaciones públicas del bloque](public/feature-checks.json) y [146 de regresión](public/regression-checks.json).
- Capturas públicas: [escritorio](public/desktop-features.png) y [móvil](public/mobile-features.png).
- [Comprobación HTTP, hashes y rutas](public/http-checks.json): origen coincide con los 12 archivos del manifiesto; en Cloudflare, los 11 recursos coinciden byte a byte y el HTML sólo recibe la protección automática del correo. Tras decodificar esa transformación, coincide exactamente con el origen. Las raíces siguen llevando a V5 y V4 conserva su acceso.
- Fuente conservada en [PR #22](https://github.com/Raboys/alvia-web/pull/22), borrador para revisión; no se integró a main en esta publicación.
