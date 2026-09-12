# V5 · megamenú mobile

Pablo cambió su elección para mobile al megamenú visual y pidió implementar, commitear, pushear, documentar, publicar y avisar por WhatsApp. Desktop conserva nombre + beneficio (opción 4). La corrección se aplica a home, Validaciones, AI Notes y Recetas.

El disparador dice «Explorá la plataforma» y mantiene visibles los tres nombres. Al tocar abre las entradas con miniaturas HTML/CSS y beneficios. El menú usa `details/summary` y funciona sin JavaScript. `header.js` agrega cierre con Escape y retorno de foco, clic/foco fuera, navegación, cambio de breakpoint y retorno del navegador. El panel permite scroll propio en pantallas bajas. No hay botones de demostración ni rutas falsas.

Se incorporó `main` (`48efd08`) antes de continuar: el release público había cambiado a `8276775` con chevrones B y el header 4. Se preservan ambos cambios; la navegación de desktop y todo el HTML posterior al header son idénticos a esa base. [Comprobación de alcance](scope-checks.json).

Preview de la implementación: <http://100.71.73.116:18729/elegida/>. Rama `feat/v5-mobile-megamenu`. Los cuatro mocks originales permanecen en `previews/header-variants/`.

## Verificación

`node docs/design/v5-mobile-megamenu/verify.cjs` acepta `PREVIEW_URL`, `EVIDENCE_DIR`, `PLAYWRIGHT_CORE_PATH` y `CHROME_PATH`. Prueba home y tres subpáginas en 320, 390, 768, 900, 901 y 1440 px, navegación táctil/teclado/sin JS, estado activo, Escape y foco, cierre exterior, cambios de viewport, header fijo y panel en landscape. Resultados y capturas en `local/`; publicación en `public/`.

## Publicado y verificado

Runtime `09734e21f2c55b5d830e2abe4d455b8db9e21db7`, activado el 2026-09-12 a las 20:07:51 UTC. [PR #26](https://github.com/Raboys/alvia-web/pull/26), borrador. [Registro de publicación y rollback](../../releases/2026-09-12-mobile-megamenu.md).

189 checks locales y 189 en cada dominio, sin fallos. Paquete desde commit de 22 archivos y 521.175 bytes, igual a la preview. HTTP/SHA-256 de archivos y manifiestos correcto desde origen y ambos dominios. Nginx y rutas conservados; release anterior `v5-8276775` disponible.

Evidencia: [preflight](public/before-deploy.json), [activación](public/deployment.json), [manifiesto](public/release.json), [HTTP](public/http-checks.json), [apex](public/apex/checks.json), [www](public/www/checks.json). Capturas: [mobile cerrado](public/apex/mobile-closed.png), [mobile abierto](public/apex/mobile-open.png), [desktop](public/apex/desktop.png).
