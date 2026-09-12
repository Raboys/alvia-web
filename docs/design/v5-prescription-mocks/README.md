# Recetas: alternativa 3, dos vistas

Publicada el 12 de septiembre de 2026, a las 19:36:49 UTC, en
[alvia.ar](https://alvia.ar/v5/recetas.html) y
[www.alvia.ar](https://www.alvia.ar/v5/recetas.html).

Pablo eligió la tercera de cuatro exploraciones y quitó el documento intermedio:
quedan el editor médico y la app del paciente. Aclaró que debían trasladarse sólo
los mocks y su presentación, conservando la página actual. Después pidió quitar
«Compará los estados del ejemplo» y sus botones, y mostrar sólo la receta generada.

El editor usa campos visuales, buscador, medicación seleccionada y acción naranja.
El paciente ve directamente un documento de aspecto de papel dentro del celular.
Un fondo azul suave y una flecha conectan las vistas en escritorio; en móvil se
apilan. Se conservan textos, datos y leyendas originales. La barra de variantes,
el header y el hero abreviado del prototipo no se trasladan.

Los mocks son estáticos: no hay selector, estado pendiente, simulación ni JS propio.
La acción naranja forma parte de la ilustración médica, sin un control inactivo.

- Runtime: `0cd831deaccff40e848423106d4b98cdc4b480bf`.
- Release: `/var/www/alvia.ar/releases/v5-0cd831d`.
- Release original conservado: `/var/www/alvia.ar/releases/v5-f281d8b`.
- [Escritorio](desktop.png), [móvil](mobile.png), [manifiesto](release.json).
- [Alcance](scope-checks.json): HTML exterior a los dos `figure` idéntico, excepto
  la referencia a los estilos nuevos. Sólo cambia `recetas.html` entre los 20
  archivos originales y se agrega `recetas-mocks.css`. Los otros 19 son idénticos.
- [174 comprobaciones locales](local-checks.json): cinco anchos entre 320 y 1440,
  documento generado, ausencia de controles, teclado, no-JS, texto ampliado, menú
  y navegación. Los 21 archivos del paquete coinciden con la versión verificada.
- [Navegador público](public-checks.json): escritorio/móvil en ambos dominios,
  documento disponible, dos vistas, ausencia de comparador, errores y desbordes.
- [HTTP y hashes](http-checks.json): los 21 archivos y manifiestos coinciden en
  origen y ambos dominios. Nginx y redirecciones se conservan.

Para revertir toda esta iteración visual, comprobar que `www/v5` apunte a
`v5-0cd831d` y reemplazar atómicamente el enlace por `v5-f281d8b`. El release
intermedio `v5-59f16eb` conserva las dos vistas con selector, antes de la última
corrección. Conservar releases y configuración de Nginx.
