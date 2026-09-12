# V5 · Gestión inteligente de turnos

Pablo eligió la variante D y autorizó su publicación. La cuarta feature explica confirmación 24 horas antes, recuperación dinámica de horarios y adelanto de turnos para reducir el ausentismo. Se quitó la sección «Controlá las reglas y cada cambio» y no se usa «modalidad y cobertura».

La home incorpora la tarjeta enlazada y una segunda mención sin link. El header muestra las cuatro funcionalidades en desktop y en el megamenú mobile de las cinco páginas.

## Publicación

- Runtime: `ddc8df8899d9d074ec1322814482d452feeaf1b9`.
- [PR #28](https://github.com/Raboys/alvia-web/pull/28), integrado en `main` antes de empaquetar.
- Activación atómica: 2026-09-12 22:21:46 UTC.
- Release: `/var/www/alvia.ar/releases/v5-ddc8df8`.
- Release anterior conservado: `/var/www/alvia.ar/releases/v5-41a6d83`.
- Paquete: 25 archivos, 547.182 bytes, más `release.json`.
- Nginx sin cambios: SHA-256 `6a997ad27dfbfca112c5e9750a369ce83debbd0500d403e8e74d36a78169467c` antes y después.

[Home](https://alvia.ar/#funcionalidades) · [Turnos inteligentes](https://alvia.ar/turnos-inteligentes) · [manifiesto](https://alvia.ar/release.json). Las URLs originales de este release ahora redirigen a las rutas limpias registradas en [la publicación posterior](2026-09-12-pretty-urls.md).

## Verificación

- 25 combinaciones locales: cinco páginas en 1440, 1024, 768, 390 y 320 px.
- 10 combinaciones sobre el paquete aislado.
- 35 combinaciones públicas: cinco páginas y cinco anchos en apex; cinco páginas en desktop/mobile para www.
- Sin errores de consola o recursos, desborde horizontal ni fallas del megamenú.
- Cuatro tarjetas en home, cuatro accesos en cada navegación y estado activo correcto.
- Ambos dominios responden 200 para V5 y la subpágina; las raíces mantienen el 301 canónico a `https://alvia.ar/v5/`.
- El manifiesto público identifica el commit exacto. Los 20 recursos no HTML coinciden por SHA-256 en ambos dominios; Cloudflare transforma los cinco HTML para proteger el email y el navegador confirmó su contenido final.

## Rollback

Comprobar primero que el enlace siga apuntando a este release; si cambió, revisar la publicación posterior. El rollback conserva todos los archivos y no requiere tocar Nginx.

```sh
test "$(readlink -f /var/www/alvia.ar/www/v5)" = /var/www/alvia.ar/releases/v5-ddc8df8
sudo ln -s /var/www/alvia.ar/releases/v5-41a6d83 /var/www/alvia.ar/www/v5-turnos-rollback.next
sudo mv -Tf /var/www/alvia.ar/www/v5-turnos-rollback.next /var/www/alvia.ar/www/v5
```

Verificar después home, las cuatro subpáginas y `release.json` en apex y www. No borrar releases.
