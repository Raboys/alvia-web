# Retiro de las versiones anteriores

Fecha: 2026-09-12 UTC. Por pedido de Pablo, **sólo V5 queda publicada** para evitar confusión con versiones anteriores. Otro agente está trabajando en V5; esta operación no modifica sus archivos, assets, manifiesto, enlace de release ni las reglas existentes que sirven V5 o las raíces.

## Estado público

- `https://alvia.ar/` y `https://www.alvia.ar/` continúan llevando a `https://alvia.ar/v5/`.
- V1, V2, V3 y V4, con o sin barra, redirigen con 301 a V5. La regla incluye sus subrutas y variantes como `v4-a`, `v4-b` y `v4-c`.
- Los antiguos `/index.html`, `/contacto.html` y `/Alvia - Habla con Ventas.html` también redirigen a V5.
- Los assets y CSS propios de la antigua V1 en `/assets/` y `/theme.css` responden 410.
- El document root `/var/www/alvia.ar/www` contiene **únicamente el enlace `v5`**.

Se conservan los fuentes históricos en Git para referencia local. No se borraron los releases privados. Esta decisión reemplaza las referencias anteriores a V3/V4 como versiones disponibles públicamente.

## Archivo fuera del directorio público

Directorio: `/var/www/alvia.ar/backups/retired-legacy-20260912T070616Z`.

Se movieron, conservando contenido y metadata:

```text
Alvia - Habla con Ventas.html
assets/
contacto.html
index.html
theme.css
v2/
v3/
v4 -> /var/www/alvia.ar/releases/v4-d07ab14
```

El archivo tiene acceso restringido y queda fuera del document root. Incluye `nginx-before.conf`, `nginx-after.conf` y `state-before.json` para conservar la configuración y las comprobaciones previas. El movimiento de `v4` retiró su enlace público; no borró el release al que apuntaba.

## Nginx

Se agregaron únicamente reglas de retiro en el servidor institucional de `/etc/nginx/sites-available/alvia.ar`:

```nginx
location ~* ^/v[1-4](?:[-./]|$) {
    return 301 https://alvia.ar/v5/;
}
location = /index.html { return 301 https://alvia.ar/v5/; }
location = /contacto.html { return 301 https://alvia.ar/v5/; }
location = "/Alvia - Habla con Ventas.html" { return 301 https://alvia.ar/v5/; }
location = /theme.css { return 410; }
location = /assets { return 410; }
location ^~ /assets/ { return 410; }
```

Las rutas de producto, subdominios de la app y backend y las reglas existentes de V5 no se cambiaron. Se comprobó `nginx -t` antes de recargar. Se verificó que V5 no dependiera de los assets antiguos antes de archivarlos.

## Preservación y verificación

Al iniciar esta operación, V5 apuntaba a `/var/www/alvia.ar/releases/v5-0b5a3c1`, publicado por el otro trabajo en curso. Se registraron sus 13 archivos, incluido el manifiesto, y se compararon sus hashes después: enlace y bytes idénticos. No se restauró el release inicial `c2817c1` ni se desplegó nada sobre V5.

[Resultado de las 84 comprobaciones](evidence/2026-09-12-retire-legacy/verification.json): ambos dominios, origen y Cloudflare; versiones antiguas redirigidas, recursos retirados con 410, V5 con 200 y document root con una sola entrada. Sin fallos. En navegador, entrar por V4 en escritorio o V3 en móvil termina en V5.

## Continuidad

- Publicar las siguientes iteraciones sobre V5, usando su propio release. No volver a copiar V1–V4 al document root como parte de un deploy.
- Para revertir una iteración de V5, elegir un release anterior de **V5**. Las instrucciones históricas de volver la portada a V4 anteceden a esta decisión y ya no son el procedimiento vigente.
- El archivo permite recuperar contenido histórico si se necesita consultarlo; no implica volver a publicarlo.
- Este documento registra el estado observado durante el retiro. Las actualizaciones posteriores de V5 pertenecen al trabajo del otro agente y se documentan por separado.
