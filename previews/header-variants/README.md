# Alvia V5 · alternativas de header

Preview privado: <http://100.71.73.116:18729/>. Abre en vista celular; el selector permite comparar desktop.

**Elegida por Pablo: opción 4, Nombre + beneficio.** Implementación integrada y empaquetada para revisión: <http://100.71.73.116:18729/elegida/>. Fuente en `/home/pablo/dev/alvia-web-v5-header`, rama `feat/v5-descriptive-header`; Pablo autorizó documentar, commitear, pushear y publicar la elección. El registro de release está en `../../docs/releases/2026-09-12-v5.md`.

- [1 · Accesos directos](http://100.71.73.116:18729/1/index.html): tres enlaces persistentes de una fila en mobile.
- [2 · Megamenú visual](http://100.71.73.116:18729/2/index.html): los nombres aparecen en el disparador mobile; un toque abre las tres explicaciones. Requiere dos toques para entrar a una feature.
- [3 · Barra de producto](http://100.71.73.116:18729/3/index.html): segunda fila fija con iconos y nombres. Más peso visual.
- [4 · Nombre + beneficio](http://100.71.73.116:18729/4/index.html): tres accesos con una descripción breve. Ocupa más altura.

Cada opción contiene la home y las tres subpáginas completas, con el mismo header, estado activo y navegación recíproca. Los tres antiguos enlaces a anclas se reemplazan en el header. Ingresar y Hablemos permanecen disponibles en desktop y celular. El logo vuelve al inicio. `?clean=1` oculta el comparador y se conserva al navegar. En opción 2, `&menu=1` abre el megamenú para la captura comparativa.

## Fuente

Snapshot de `/home/pablo/dev/alvia-web-v5-features/v5`, commit `c03f138e47f2a486bd5972d2343090cf8bc0e5c4`, 2026-09-12. Se reutilizan la home, páginas, fuentes, foto, estilos e ilustraciones HTML/CSS existentes. `build.py` genera las páginas; `headers.css` y `headers.js` contienen los cambios del estudio. El comparador conserva los cuatro mocks. La opción 4 se publicó posteriormente en la V5 desde `6176676`; [registro y evidencia](../../docs/design/v5-header-option4/README.md).

## Ejecutar

```sh
python3 previews/header-variants/build.py
python3 -m http.server 18729 --bind 100.71.73.116 --directory previews/header-variants
```

El servidor de esta sesión corre como proceso separado, con log `/tmp/alvia-header-mocks.log`; no depende de la pestaña del agente. No está configurado para sobrevivir un reinicio del host.

## Verificación

`check.cjs` usa Playwright local (paths reemplazables mediante `PLAYWRIGHT_CORE_PATH`, `CHROME_PATH`, `PREVIEW_URL`). Verifica las cuatro páginas de cada alternativa en 360, 390, 768 y 1440 px: desborde, enlaces visibles, alto táctil de al menos 44 px, estado activo, errores JS y HTTP; además prueba navegación mobile, Escape del megamenú, header fijo y cambio de vista del comparador. Evidencia en `checks.json` y `screenshots/`.

```sh
node previews/header-variants/check.cjs
```
