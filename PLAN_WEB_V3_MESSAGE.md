# Plan — Web V3: posicionamiento, evidencia y simpleza

## Estado

- [x] Alcance y criterio editorial acordados
- [x] Reescritura y jerarquía implementadas
- [x] Revisión visual, responsive y accesibilidad
- [x] Claims y evidencia auditados
- [x] Cambios integrados en `main`
- [x] Producción desplegada y verificada

## Release

- PR: [#9](https://github.com/Raboys/alvia-web/pull/9)
- Commit integrado y desplegado: `7a178fa532cbd3c5786ff89857870ffe6b59ba94`
- Publicado: 29 de agosto de 2026
- Ruta: <https://www.alvia.ar/v3/>
- Backup recuperable: `/var/www/alvia.ar/backups/20260829-185517-v3-message-evidence`

## Objetivo

Hacer que la V3 explique en pocos segundos una propuesta B2B concreta: Alvia pone la tecnología para que una organización de salud aproveche la red médica que ya tiene, atienda online dentro de sus reglas y opere sin desarrollar una plataforma propia.

La página debe reducir explicación, no información decisiva. Cada bloque tiene que ayudar al comprador a responder una pregunta: qué es, para quién es, qué cambia, cómo funciona, qué puede controlar, qué evidencia existe y cuál es el próximo paso.

## Posicionamiento

### Cuenta principal

Organizaciones de salud que ya administran una red médica: financiadores, prepagas, obras sociales y prestadores con capacidad profesional disponible.

Empresas y gobiernos no se presentan como segmentos equivalentes en esta página. Si se necesitan, tendrán recorridos o páginas específicas.

### Idea central

> Alvia pone la tecnología. Vos aprovechás la red médica que ya tenés.

### Promesa operativa

Los médicos de la red atienden online a los afiliados dentro de la cobertura y las reglas de la organización, sin que ésta tenga que desarrollar ni operar una plataforma propia.

### Modelo de red

La organización puede usar su propia red, sumar la red de Alvia o combinar ambas. La página debe mostrar las tres posibilidades como un solo modelo flexible, no como productos aislados.

## Principios de contenido

1. El posicionamiento antecede a la brevedad: primero claridad sobre cuenta, problema, alternativa y diferencia.
2. Un título por decisión. Los sobretítulos sólo se mantienen cuando orientan categoría o contexto real.
3. Los beneficios se explican mediante mecanismos verificables; no se prometen resultados comerciales sin datos.
4. Una captura prueba una acción o capacidad específica. No se usa `Producto real` como sustituto de evidencia.
5. Un CTA primario consistente: `Agendá una demo`. El secundario, cuando ayude, es `Ver cómo funciona`.
6. La tecnología es la estructura que aporta Alvia; la organización aprovecha su estructura médica existente.
7. La página no inventa certificaciones, cumplimiento, validez legal, integraciones ni métricas.

## Arquitectura propuesta

### 1. Hero

- Mantener el relato visual red → plataforma.
- Mantener una etiqueta de categoría útil: `Telemedicina para organizaciones de salud`.
- Titular centrado en activar la red existente.
- Bajada explícita: Alvia aporta la tecnología; la organización aprovecha sus médicos y reglas.
- CTA primario `Agendá una demo`; secundario `Ver cómo funciona`.
- En navegación, reemplazar `Ingresar` por `Acceso médicos` si el destino es el portal profesional.

### 2. Tensión económica y operativa

Explicar el problema sin abstracciones: capacidad médica disponible que no llega online al afiliado y guardias/canales externos que elevan costo y fragmentan la atención.

### 3. Modelo operativo

Presentar en un bloque compacto:

- Tu red.
- La red de Alvia.
- Ambas.

La diferencia no es contratar otra estructura médica: es activar digitalmente la que ya existe y completarla cuando haga falta.

### 4. Qué cambia para el financiador

Reemplazar claims de resultado por capacidades concretas:

- `Atención dentro de tu red`: los afiliados pueden atenderse online con profesionales ya contratados.
- `Prestaciones bajo tus reglas`: padrón, autorización, copago y vademécum se aplican según cobertura y plan, sólo donde esté verificado por producto.
- `Capacidad médica disponible online`: las horas disponibles se convierten en oferta visible para el afiliado.
- `Operación trazable`: consultas, documentos y estados pueden seguirse desde la plataforma, sólo con el alcance que efectivamente exista.

### 5. Experiencia médica y evidencia de producto

Unificar `Del lado del médico` y la demostración de consola en una sola historia: el profesional atiende, documenta y prescribe en el mismo flujo.

Cada pieza visual debe tener una leyenda que diga qué demuestra. La captura actual de la consola no puede presentarse como evidencia vigente de AI Notes si muestra un flujo obsoleto. Se reemplaza por una captura actual segura si existe; si no, se evita afirmar que esa porción representa el comportamiento actual y se registra la actualización como deuda explícita. No se fabrican interfaces.

### 6. Implementación, control y auditoría

Narrativa sugerida: `Conectás la red. Definís las reglas. Auditás cada atención.`

Debe reducir riesgo de adopción con mecanismos existentes y verificables, sin agregar una sección genérica de marketing.

### 7. Seguridad y cierre

Explicar controles verificables en lenguaje llano y terminar con un único llamado principal a demo. El bloque no debe funcionar como depósito de referencias legales.

## Matriz de claims

| Claim actual | Tratamiento | Reemplazo o criterio |
| --- | --- | --- |
| Menos fuga fuera de red | Reescribir | `Atención dentro de tu red`, explicada por el acceso a profesionales contratados |
| Menos sobreprestación | Reescribir | `Prestaciones bajo tus reglas`, con mecanismos concretos y verificados |
| Horas ociosas que rinden | Reescribir | `Capacidad médica disponible online` |
| Vos definís las reglas; Alvia las cumple | Precisar | La organización configura reglas de cobertura y Alvia las aplica cuando corresponde |
| Historia clínica conforme a Ley 26.529 | Quitar o validar legalmente | `Historia clínica digital y trazable`, describiendo sólo atributos comprobados |
| Receta electrónica válida | Precisar | `Receta electrónica integrada`, indicando el flujo comprobado |
| Datos cifrados en tránsito y reposo | Mantener sólo con verificación técnica | Si no se puede demostrar el alcance, usar `Protección de datos clínicos` y enumerar controles verificados |
| Producto real | Quitar | La captura y su leyenda deben aportar la evidencia |

## Cambios esperados

- Reescribir `v3/index.html` conservando la identidad visual y los activos valiosos.
- Ajustar `v3/styles.css` sólo donde la nueva jerarquía o contenido lo requieran.
- Tocar `v3/script.js` únicamente si cambia navegación o interacción necesaria.
- No rediseñar la marca, no introducir un framework y no expandir el alcance a otras versiones del sitio.
- No modificar links productivos sin verificar destino.

## Criterios de aceptación

- En el primer viewport se entiende qué es Alvia, para quién es y qué aporta cada parte.
- La página deja claro que el cliente aprovecha su red médica existente y Alvia aporta la tecnología.
- Se muestran las opciones de red propia, red Alvia y modelo combinado.
- No quedan sobretítulos puramente retóricos ni CTAs competidores.
- Ningún claim absoluto queda sin mecanismo o evidencia.
- La experiencia del médico y la evidencia de producto forman un solo relato.
- La navegación, anclas y links funcionan.
- La versión desktop y mobile no presenta cortes, desbordes ni solapamientos.
- El contenido principal sigue siendo legible sin JavaScript.

## Verificación y entrega

1. Revisar el diff editorial contra este documento y `COPYWRITING.md`.
2. Ejecutar las comprobaciones estáticas disponibles en el repositorio.
3. Servir la V3 localmente y revisar desktop y mobile.
4. Verificar links, anclas, consola del navegador y carga de recursos.
5. Auditar claims sensibles contra las capacidades existentes; rebajar o retirar los no comprobados.
6. Commit de implementación, push de la rama y PR.
7. Integrar en `main`, actualizar el checkout local y desplegar V3 de forma atómica.
8. Verificar `https://www.alvia.ar/v3/` en producción y documentar el commit desplegado.
