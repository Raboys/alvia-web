# V5 · calculadora C

Pablo aprobó la variante C simplificada y autorizó documentar, commitear, pushear y publicar en alvia.ar. Controles +/− para médicos y horas, valores editables y opciones 10/20/30 minutos; resultado debajo y método desplegable. Se elimina el CTA «Veamos el potencial de tu red».

Se aplica `telemed-starter/docs/COPYWRITING.md`: mínima información suficiente. Se conserva el alcance semanal, se eliminan el preámbulo, el sobretítulo y las explicaciones sobre los controles. El resultado se identifica como estimación.

Límites: 1–10.000 médicos; 0,5–80 horas semanales por médico. Cálculo: médicos × floor(horas × 60 / duración) × 4. Valor inicial: 480. Sin JavaScript se conserva un ejemplo de los valores iniciales.

Base: `09734e21`, menú móvil ya publicado en el release `v5-09734e2`. La integración conserva ese menú, los chevrones y las páginas de funcionalidades. Se agrega `capacity.css` y se versionan las URLs de la nueva hoja y del script.

La publicación utiliza un paquete de Git y sustitución atómica del enlace V5, con comprobación de los hashes del release previo para evitar pisar otra publicación concurrente. No requiere cambios en Nginx.

## Verificación

Verificación en Chromium de controles, cálculo y redondeo, límites, entrada inválida, navegación por teclado del selector, método desplegable, ausencia de CTA, diseño a 1440/1024/768/390/320 px y contenido sin JavaScript. Script reproducible y evidencia en `docs/design/v5-capacity-c/`.

## Publicación

- Runtime: `41a6d8386668c08ff3484007165c551678dddbae`, commiteado y pusheado antes de publicar.
- Activación: 2026-09-12 20:11:47 UTC.
- Release: `/var/www/alvia.ar/releases/v5-41a6d83`.
- [PR #27](https://github.com/Raboys/alvia-web/pull/27), rama `feat/v5-capacity-friendly`.
- [Web pública](https://alvia.ar/v5/#capacidad) y [manifiesto](https://alvia.ar/v5/release.json).
- 41 comprobaciones locales y 41 públicas, sin errores de recursos/JavaScript ni desbordes.
- Los 23 archivos y el manifiesto coinciden byte a byte con origen. El manifiesto y los recursos modificados coinciden también en Cloudflare para apex y www. Ambas raíces conservan el 301 a V5.
- Sólo cambian `index.html`, `script.js` y la nueva `capacity.css` frente al runtime anterior; los otros 20 archivos se conservan.

## Rollback

Release anterior conservado: `/var/www/alvia.ar/releases/v5-09734e2`. Comprobar que V5 siga apuntando a `v5-41a6d83`; si cambió, revisar primero la publicación posterior.

```sh
test "$(readlink -f /var/www/alvia.ar/www/v5)" = /var/www/alvia.ar/releases/v5-41a6d83
sudo ln -s /var/www/alvia.ar/releases/v5-09734e2 /var/www/alvia.ar/www/v5-capacity-rollback.next
sudo mv -Tf /var/www/alvia.ar/www/v5-capacity-rollback.next /var/www/alvia.ar/www/v5
```

Verificar después las dos portadas, el manifiesto y las cuatro páginas. No es necesario recargar Nginx.
