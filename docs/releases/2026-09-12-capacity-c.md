# V5 · calculadora C

Pablo aprobó la variante C simplificada y autorizó documentar, commitear, pushear y publicar en alvia.ar. Controles +/− para médicos y horas, valores editables y opciones 10/20/30 minutos; resultado debajo y método desplegable. Se elimina el CTA «Veamos el potencial de tu red».

Se aplica `telemed-starter/docs/COPYWRITING.md`: mínima información suficiente. Se conserva el alcance semanal, se eliminan el preámbulo, el sobretítulo y las explicaciones sobre los controles. El resultado se identifica como estimación.

Límites: 1–10.000 médicos; 0,5–80 horas semanales por médico. Cálculo: médicos × floor(horas × 60 / duración) × 4. Valor inicial: 480. Sin JavaScript se conserva un ejemplo de los valores iniciales.

Base: `09734e21`, menú móvil ya publicado sobre el release `v5-8276775`. La integración conserva ese menú, los chevrones y las páginas de funcionalidades. Se agrega `capacity.css` y se versionan las URLs de la nueva hoja y del script.

La publicación utiliza un paquete de Git y sustitución atómica del enlace V5, con comprobación de los hashes del release previo para evitar pisar otra publicación concurrente. No requiere cambios en Nginx.

## Verificación

Verificación en Chromium de controles, cálculo y redondeo, límites, entrada inválida, navegación por teclado del selector, método desplegable, ausencia de CTA, diseño a 1440/1024/768/390/320 px y contenido sin JavaScript. Script reproducible y evidencia en `docs/design/v5-capacity-c/`.

## Publicación

Pendiente de registrar el commit y los resultados públicos tras activar el paquete.
