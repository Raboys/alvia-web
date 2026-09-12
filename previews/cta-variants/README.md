# Botones y links sin flecha diagonal

Mock puntual de Alvia V5, 2026-09-12. Fuente visual: `../../v5/` y `../../v5/DESIGN.md`.

Cuatro alternativas: A sin ícono (recomendada), B chevrón, C ícono semántico a la izquierda, D flecha horizontal. El comparador permite probar hover/clic y aplicar cada alternativa a una copia completa de V5, en escritorio o celular. `context.html?variant=a` abre la página completa; A/B/C/D cambian la variante. Los enlaces externos de la copia muestran una simulación local.

Se conserva el texto, la paleta, la tipografía y las imágenes de V5. No se cambia la página publicada. Todos los recursos son locales. La propuesta A compacta los botones, conserva el subrayado visible de los links y deja ingreso como texto. Hover, foco y clic siguen identificando las acciones.

Preview: http://100.71.73.116:8958/

```sh
python3 -m http.server 8958 --bind 100.71.73.116 --directory /home/pablo/dev/alvia-web/previews/cta-variants
```

La única excepción al alcance visual es interceptar destinos externos dentro del mock para permitir revisar sin salir hacia WhatsApp o el portal.

Verificado con Chromium: comparación a 1440, 1024, 768, 390 y 320 px sin desborde; cambio de las cuatro variantes; simulación de clic en comparador y página; vista de celular a 390 px; sin errores de JavaScript ni recursos fallidos. Capturas y verificación: `/tmp/alvia-cta-review/`. Servidor: PID en `/tmp/alvia-cta-variants.pid`, log en `/tmp/alvia-cta-variants-http.log`. UFW: puerto 8958 habilitado solamente en `tailscale0`.

## Selección y publicación

Pablo eligió **B**. El comparador conserva las cuatro propuestas originales y la recomendación inicial A como antecedente; la dirección vigente es B. Publicada sobre las cuatro páginas y el nuevo header mobile desde `8276775`. [Decisión y release](../../docs/releases/2026-09-12-chevron-b.md). La carpeta conserva el snapshot de la portada con que se compararon las opciones; no reemplaza el runtime actual de `v5/`.
