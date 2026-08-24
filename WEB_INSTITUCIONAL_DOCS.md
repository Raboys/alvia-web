# Web institucional de Alvia

## 1. Objetivo de este repositorio

Este repositorio conserva, compara y permite desplegar las versiones de la web institucional de Alvia sin depender del monorepo de producto.

| Versión | Ruta pública | Carpeta | Estado |
|---|---|---|---|
| V1 | <https://www.alvia.ar/> | `v1/` | Web institucional vigente al crear este repositorio |
| V2 | <https://www.alvia.ar/v2/> | `v2/` | Nueva propuesta B2B publicada para revisión y comparación |
| V3 | <https://www.alvia.ar/v3/> | `v3/` | Híbrido publicado: diseño V2 con contenido y profundidad de V1 |

Snapshot inicial: 23 de agosto de 2026.

## 2. Principios de la V2

La V2 busca una presencia institucional más humana, clásica y editorial, inspirada en la claridad comercial de Wheel, sin copiar su identidad.

La idea central es:

> La tecnología, los profesionales y la operación necesarios para ofrecer telemedicina bajo la marca y las reglas de cada organización.

La comunicación está escrita para compradores B2B de salud en Argentina:

- prepagas;
- obras sociales;
- clínicas y sanatorios;
- empresas;
- gobiernos.

El contenido evita métricas, integraciones, capacidades de auditoría o automatizaciones que no estén respaldadas por el producto real.

## 3. Estructura

```text
alvia-web/
├── README.md
├── WEB_INSTITUCIONAL_DOCS.md
├── v1/
│   ├── index.html
│   ├── contacto.html
│   ├── Alvia - Habla con Ventas.html
│   ├── theme.css
│   └── assets/
│       └── doctor-videoconsulta.png
├── v2/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── assets/
│       ├── app-paciente.png
│       ├── console-medica.png
│       ├── doctor-videoconsulta.png
│       ├── mockup-operacion.png
│       ├── mockup-postconsulta-medica.png
│       ├── mockup-postconsulta-paciente.png
│       ├── mockup-preconsulta-autorizacion.png
│       └── mockup-preconsulta-copago.png
└── v3/
    ├── index.html
    ├── styles.css
    ├── script.js
    └── assets/
```

`Alvia - Habla con Ventas.html` se conserva como archivo legado del snapshot de producción. La página de contacto enlazada por `v1/index.html` es `v1/contacto.html`.

## 4. Tecnología

Todas las versiones son sitios estáticos:

- HTML semántico;
- CSS sin preprocesador;
- JavaScript vanilla;
- imágenes PNG;
- sin bundler;
- sin framework de frontend;
- sin base de datos;
- sin variables de entorno;
- sin secretos dentro del repositorio.

V2 y V3 cargan `DM Sans` y `Noto Serif` desde Google Fonts. Si esas fuentes no están disponibles, utilizan las familias de fallback declaradas en sus respectivos `styles.css`.

## 5. Diferencias entre las versiones

### V1

- Página larga con gran parte de sus estilos y comportamiento dentro de `index.html`.
- Alternancia de contenido español/inglés mediante JavaScript del cliente.
- Página de contacto separada.
- Usa una fotografía de videoconsulta y numerosas composiciones HTML/CSS/SVG.

### V2

- Dirección visual editorial y sobria.
- Wording exclusivamente orientado al mercado B2B argentino.
- Explica tres modalidades: red propia, red Alvia 24/7 y modelo combinado.
- Describe el flujo antes, durante y después de la consulta.
- Incorpora capturas renderizadas del producto real.
- Layout responsive con breakpoints en `1050px` y `700px`.
- Menú móvil controlado por `script.js`.

### V3

- Mantiene la tipografía, la paleta y el ritmo editorial sobrio de V2.
- Recupera de V1 el problema económico, la red propia, los controles por cobertura, la experiencia médica, la operación, seguridad y segmentos.
- Presenta cuatro flujos reales: identidad, autorización, copago y prescripción.
- Usa composiciones amplias y alternadas en lugar de acumular tarjetas comerciales.
- Se publica en `/v3/` para comparación, manteniendo V1 y V2 disponibles sin cambios.

## 6. Assets de la V2

### Fotografía

`doctor-videoconsulta.png` es el asset fotográfico utilizado en el hero y en una de las escenas institucionales.

### Capturas renderizadas de producto

Las siguientes imágenes son renders rasterizados de interfaces implementadas en los canvases de producto de `telemed-starter`; no son ilustraciones genéricas creadas para la landing:

| Asset | Superficie representada |
|---|---|
| `mockup-preconsulta-autorizacion.png` | Código de autorización solicitado por la cobertura |
| `mockup-preconsulta-copago.png` | Identidad y copago antes de ingresar a la consulta |
| `console-medica.png` | Consola médica durante la videoconsulta |
| `mockup-postconsulta-paciente.png` | Receta electrónica disponible para el afiliado |
| `mockup-postconsulta-medica.png` | Historial de consultas finalizadas, notas y recetas |
| `mockup-operacion.png` | Portal institucional de capacidad y turnos |

Los datos visibles son fixtures de demostración. No deben reemplazarse por datos reales de pacientes o profesionales.

Los harnesses que regeneran estas imágenes permanecen en el monorepo privado `telemed-starter`, junto a los componentes fuente. Este repositorio contiene solamente los PNG finales necesarios para servir la web de forma independiente.

## 7. Enlaces y conversiones

Antes de publicar cambios, verificar especialmente:

- ingreso médico: <https://doctor.alvia.ar/>;
- ventas: `hola@alvia.ar`;
- WhatsApp: `+54 11 3357 8538`;
- mensajes precargados de “Agendá una demo” y “Hablar con ventas”.

No incorporar formularios que recolecten información sensible sin definir antes su backend, almacenamiento, consentimiento y política de privacidad.

## 8. Preview local

Desde la raíz del repositorio:

```bash
python3 -m http.server 8080
```

Abrir:

```text
http://127.0.0.1:8080/v1/
http://127.0.0.1:8080/v2/
http://127.0.0.1:8080/v3/
```

No abrir los HTML directamente con `file://`: un servidor HTTP local reproduce mejor el comportamiento de rutas, fuentes y assets.

## 9. Arquitectura de producción

La VPS sirve el sitio mediante Nginx y Cloudflare:

```text
Cloudflare
    ↓
Nginx — alvia.ar / www.alvia.ar
    ↓
/var/www/alvia.ar/www
├── index.html        → V1 en /
├── contacto.html
├── theme.css
├── assets/
├── v2/
│   ├── index.html    → V2 en /v2/
│   ├── styles.css
│   ├── script.js
│   └── assets/
└── v3/
    ├── index.html
    ├── styles.css
    ├── script.js
    └── assets/
```

El server block usa una estrategia `try_files`: primero intenta servir un archivo institucional y, si no existe, deriva a rutas del backend de telemedicina. Por eso no deben crearse carpetas institucionales que colisionen con rutas de aplicación como `invitacion`, `invites`, `consultations`, `admin`, `doctor`, `firma`, `auth` o `internal`.

Publicar `/v2/` o `/v3/` no requiere editar ni recargar Nginx mientras se mantenga esta estructura.

## 10. Despliegue de versiones

El despliegue recomendado es atómico: copiar a un directorio temporal oculto y moverlo a la ruta pública al final.

Ejemplo conceptual para una primera publicación:

```bash
sudo install -d -o github-runner -g telemed -m 2755 /var/www/alvia.ar/www/.v2-stage
sudo cp -a v2/index.html v2/styles.css v2/script.js v2/assets /var/www/alvia.ar/www/.v2-stage/
sudo chown -R github-runner:telemed /var/www/alvia.ar/www/.v2-stage
sudo mv /var/www/alvia.ar/www/.v2-stage /var/www/alvia.ar/www/v2
```

Para actualizar una V2 ya publicada, preparar primero un release nuevo, conservar un backup recuperable del directorio vigente y luego intercambiar ambos directorios mediante `mv`. No usar `rm -rf` ni sincronizaciones con `--delete` sobre el document root completo.

V3 se despliega con el mismo procedimiento, cambiando `v2` y `.v2-stage` por `v3` y `.v3-stage`.

La V1 vive en la raíz del document root. Su despliegue debe copiar únicamente los archivos conocidos de `v1/`; nunca borrar el document root porque allí también conviven `v2/` y rutas atendidas por la aplicación.

## 11. Verificación posterior al despliegue

Checklist mínimo:

1. `https://www.alvia.ar/` continúa respondiendo `200`.
2. `https://www.alvia.ar/v2/` responde `200`.
3. `https://www.alvia.ar/v3/` responde `200`.
4. CSS, JavaScript y PNG responden `200` con su tipo MIME correcto.
5. Hero, navegación y CTA aparecen en desktop.
6. Menú, columnas y galería funcionan a `390px` de ancho.
7. No existe overflow horizontal.
8. Los enlaces de WhatsApp, email e ingreso médico apuntan al destino correcto.
9. La consola del navegador no muestra errores de recursos propios, aparte del favicon conocido en V1/V2 que todavía no está definido.
10. La portada V1 y la ruta V2 no cambian al actualizar V3.

Ejemplos de verificación HTTP:

```bash
curl -I https://www.alvia.ar/
curl -I https://www.alvia.ar/v2/
curl -I https://www.alvia.ar/v3/
curl -I https://www.alvia.ar/v2/styles.css
curl -I https://www.alvia.ar/v2/assets/mockup-operacion.png
curl -I https://www.alvia.ar/v3/styles.css
curl -I https://www.alvia.ar/v3/assets/mockup-preconsulta-copago.png
```

## 12. Limitaciones conocidas del snapshot inicial

- V1 y V2 no declaran todavía un favicon. Algunos navegadores solicitan `/favicon.ico` automáticamente y reciben `404`; esto no afecta el render ni la navegación.
- `v1/Alvia - Habla con Ventas.html` conserva referencias históricas a un nombre de archivo anterior que no forma parte del snapshot. No es la página canónica: V1 enlaza `contacto.html`.

## 13. Flujo de cambios

1. Crear una rama corta desde `main`.
2. Cambiar solamente la versión involucrada.
3. Levantar preview local.
4. Revisar desktop y móvil.
5. Verificar enlaces y assets.
6. Hacer commits pequeños y descriptivos.
7. Abrir un pull request.
8. Desplegar después de aprobar el cambio.
9. Verificar producción y registrar el release.

Mensajes de commit sugeridos:

```text
feat(v2): add institutional product proof
fix(v1): repair sales contact link
docs: update institutional deployment guide
```

## 14. Fuente de verdad

Desde la creación de este repositorio:

- `Raboys/alvia-web` debe ser la fuente de verdad de la web institucional estática;
- la VPS es un destino de despliegue, no el lugar principal de edición;
- el monorepo `telemed-starter` conserva los canvases y harnesses necesarios para regenerar capturas de producto;
- cualquier cambio manual urgente en producción debe trasladarse inmediatamente a este repositorio para evitar divergencias.
