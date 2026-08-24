# Alvia Web Institucional

Repositorio de las versiones estáticas de la web institucional de Alvia.

- Producción actual: <https://www.alvia.ar/>
- Versión 2 para comparación: <https://www.alvia.ar/v2/>
- Versión 3 híbrida: <https://www.alvia.ar/v3/>

## Estructura

- `v1/`: snapshot de la web institucional actualmente publicada en la raíz.
- `v2/`: nueva versión B2B, publicada en `/v2/`.
- `v3/`: dirección visual de V2 con la profundidad de contenido y producto de V1.
- `WEB_INSTITUCIONAL_DOCS.md`: arquitectura, contenido, assets, preview, despliegue y mantenimiento.

## Preview local

```bash
python3 -m http.server 8080
```

Abrir:

- <http://127.0.0.1:8080/v1/>
- <http://127.0.0.1:8080/v2/>
- <http://127.0.0.1:8080/v3/>

No hay build step ni dependencias de Node: ambas versiones son HTML, CSS, JavaScript y assets estáticos.
