# V5 · megamenú mobile publicado

Pablo cambió su selección de mobile al megamenú visual y pidió implementar, commitear, pushear, documentar, publicar y avisar por WhatsApp. Desktop conserva nombre + beneficio de la opción 4. Se incorporó la versión vigente con chevrones B antes de aplicar la corrección.

- Publicado en <https://alvia.ar/v5/> y <https://www.alvia.ar/v5/>; incluye home, Validaciones, AI Notes y Recetas.
- Runtime: **`09734e21f2c55b5d830e2abe4d455b8db9e21db7`**, commiteado y pusheado antes de activar el release.
- Rama: `feat/v5-mobile-megamenu`; [PR #26](https://github.com/Raboys/alvia-web/pull/26), borrador con base `main` (`48efd08`). La publicación estática no integra el PR.
- Release: `/var/www/alvia.ar/releases/v5-09734e2`, activado atómicamente a las **20:07:51 UTC del 2026-09-12** mediante `/var/www/alvia.ar/www/v5`.
- Release anterior conservado: `/var/www/alvia.ar/releases/v5-8276775`.
- Paquete desde commit: **22 archivos, 521.175 bytes**, más manifiesto; todos idénticos al paquete de preview verificado.

Mobile muestra los tres nombres debajo de «Explorá la plataforma» y abre entradas con miniaturas y beneficios. `details/summary` permite abrir y navegar sin JavaScript. `header.js` agrega cierre con Escape, retorno de foco, clic/foco exterior, navegación y cambios de viewport. El panel tiene scroll propio para pantallas bajas. El HTML de contenido y la navegación desktop se conservan byte a byte respecto de main; también permanecen los chevrones B.

## Verificación

**189 comprobaciones locales y 189 en cada dominio público**. Home y las tres subpáginas en 320, 390, 768, 900, 901 y 1440 px; apertura/cierre, enlaces visibles con áreas táctiles de al menos 44 px, estado activo, teclado, retorno de foco, navegación entre features, sin JS, header fijo, cambios de viewport y landscape. Sin errores HTTP/JS ni desbordes.

Los 22 archivos y manifiestos coinciden por HTTP/SHA-256 desde origen y ambos dominios; se normaliza solamente la protección de correo de Cloudflare en HTML. CSS y JS se verifican con las URLs versionadas del HTML. Nginx y redirecciones conservan su estado de preflight; el release anterior sigue disponible.

[Decisión, herramientas, capturas y resultados](../design/v5-mobile-megamenu/README.md). El commit posterior de documentación guarda la evidencia sin cambiar el runtime servido.

## Rollback

Confirmar que `/var/www/alvia.ar/www/v5` siga apuntando a `releases/v5-09734e2`; crear un enlace temporal hacia `releases/v5-8276775` y renombrarlo atómicamente sobre `www/v5`. Verificar home, las tres subpáginas y `release.json` en ambos dominios. El release anterior recupera las tres tarjetas fijas en mobile y conserva los chevrones. No modificar Nginx, redirecciones ni borrar releases.
