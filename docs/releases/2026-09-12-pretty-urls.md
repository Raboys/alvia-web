# Web institucional · raíz y URLs limpias

Pablo pidió quitar `/v5` de la web pública y usar URLs cortas para las funcionalidades. La fuente permanece en `v5/` y el symlink conserva su nombre interno; ninguno de esos detalles aparece en la navegación pública.

| Contenido | URL canónica |
|---|---|
| Home | `https://alvia.ar/` |
| AI Notes | `https://alvia.ar/ainotes` |
| Validaciones | `https://alvia.ar/validaciones` |
| Recetas | `https://alvia.ar/recetas` |
| Turnos inteligentes | `https://alvia.ar/turnos-inteligentes` |

Los links internos, `canonical` y Open Graph usan estas rutas. `/v5`, `/v5/`, las páginas anteriores bajo `/v5/*.html`, los `.html` de raíz y las variantes con slash final responden 301 hacia la URL canónica.

## Publicación

- Runtime: `4239034475672b94d5ac787e8aea59ec4daaecac`.
- [PR #30](https://github.com/Raboys/alvia-web/pull/30), integrado en `main` antes de empaquetar.
- Activación atómica: 2026-09-12 22:37:32 UTC.
- Release: `/var/www/alvia.ar/releases/v5-4239034`.
- Release anterior conservado: `/var/www/alvia.ar/releases/v5-ddc8df8`.
- Paquete: 25 archivos, 546.963 bytes, más `release.json`; `public_path: "/"`.
- Configuración Nginx activa: SHA-256 `fb9f8a44a36571554214f789598bc00a393183bcecc0dfee4da5e39fe1fc6a76`.
- Backup previo: `/etc/nginx/sites-available/alvia.ar.before-pretty-urls-20260912T2236Z`, SHA-256 `6a997ad27dfbfca112c5e9750a369ce83debbd0500d403e8e74d36a78169467c`.

Nginx resuelve las rutas limpias contra los HTML del release activo. La sustitución del symlink sigue publicando una versión completa de forma atómica. No se cambiaron certificados, subdominios ni el backend telemed.

## Verificación

- 25 combinaciones locales y 35 públicas en Chromium, a 1440, 1024, 768, 390 y 320 px.
- Home, cuatro páginas, navegación desktop, megamenú mobile, estados activos, canonical y Open Graph correctos.
- Sin errores de consola o recursos ni desborde horizontal.
- Apex y www responden 200 en las cinco rutas y en `/release.json`.
- Las rutas antiguas probadas responden 301 directo al destino canónico.
- `/invitacion/*`, `/auth/login`, `/consultations` y `/internal/studies/*` conservaron su código y tipo de respuesta de preflight.
- Los 20 recursos no HTML coinciden por SHA-256 en ambos dominios. Cloudflare transforma los cinco HTML para proteger el email; el navegador verificó el DOM final.
- `nginx -t` correcto y servicio activo después del reload.

## Rollback

Comprobar primero los destinos y hashes: una publicación posterior puede haberlos cambiado. Para revertir esta migración, cambiar primero el runtime mientras la configuración nueva todavía entiende ambos formatos; después restaurar la configuración y recargar Nginx.

```sh
test "$(readlink -f /var/www/alvia.ar/www/v5)" = /var/www/alvia.ar/releases/v5-4239034
sudo ln -s /var/www/alvia.ar/releases/v5-ddc8df8 /var/www/alvia.ar/www/v5-pretty-urls-rollback.next
sudo mv -Tf /var/www/alvia.ar/www/v5-pretty-urls-rollback.next /var/www/alvia.ar/www/v5
sudo cp /etc/nginx/sites-available/alvia.ar.before-pretty-urls-20260912T2236Z /etc/nginx/sites-available/alvia.ar
sudo nginx -t
sudo systemctl reload nginx
```

Verificar después `/`, `/v5/`, las cuatro páginas anteriores y las rutas telemed del preflight. No borrar releases ni el backup.
