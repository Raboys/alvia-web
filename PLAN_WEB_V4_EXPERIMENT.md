# Plan Web V4 — experimento de evidencia para decisión

## Estado y modo

Web V4 es un experimento comparativo y no reemplaza V3. El proyecto se declara en modo `strict-gated`: cada gate debe aportar evidencia explícita antes de avanzar, y ninguna variante se publica ni se declara ganadora por inferencia interna.

Este bloque define el experimento. No compone ni implementa V4-A o V4-B y no cambia pantallas ni layouts, por lo que no requiere revisión visual.

## Decisión que debe habilitar

El objetivo es identificar qué composición ayuda mejor a una persona compradora a entender, evaluar y explicar el modelo B2B de Alvia sin confundir prioridad de red, responsabilidades ni controles de cobertura.

Los roles compradores son responsables de red, operaciones, prestaciones, innovación o dirección ejecutiva de una prepaga, obra social, clínica o sanatorio. La decisión que deben poder tomar es: ¿Alvia puede activar nuestra red médica online, preservar nuestros controles de cobertura y evitar que construyamos una plataforma propia?

La respuesta de producto más fuerte respaldada es: Alvia publica disponibilidad, conecta médicos y afiliados y aplica padrón, autorización, identidad y copago según cobertura, en un flujo que además documenta la consulta y emite la receta cuando corresponde.

## Hipótesis independientes

### Hipótesis A — responsabilidades, prioridad y complemento

Una composición cuya residencia visual principal sea la separación de responsabilidades permitirá comprender antes:

- qué aporta Alvia y qué aporta la organización;
- que `Tu red` tiene prioridad;
- que `Red Alvia` complementa capacidad o cobertura;
- que `Ambas` describe un único modelo combinado, no un tercer producto par.

La evidencia principal debe organizar el modelo y sus responsabilidades; los beneficios se ubican junto al mecanismo que los hace relevantes.

### Hipótesis B — recorrido condicional

Una composición cuya residencia visual principal sea el recorrido condicional permitirá comprender mejor cómo Alvia preserva reglas de cobertura sin presentar todos los controles como una secuencia universal.

La evidencia principal debe explicar que padrón se verifica si se requiere, que la política puede pedir `autorización y/o identidad según cobertura`, que el copago aparece sólo cuando corresponde y que las autorizaciones requeridas se resuelven antes de consulta, sala o cola según el tipo de atención.

A y B se mantienen independientes durante composición, prototipo y observación. No se premezclan ni se fusionan automáticamente. Sólo observaciones humanas posteriores pueden justificar una nueva hipótesis combinada.

## Taxonomía de mensajes congelada

| Clase | Territorio permitido | Regla de evidencia |
|---|---|---|
| Operacional | Disponibilidad publicada; atención espontánea y turnos; red propia multiprestador; agenda y reservas; videoconsulta; historia firmada; recetas y documentos; padrón, OTP, prueba de vida y pago como gates configurables | Preferir UI actual del producto o fixtures de implementación documentados |
| B2B acordado, en construcción | Prioridad de red propia más complemento de Red Alvia como un solo modelo; autoservicio organizacional de reglas | Mantener el mensaje con etiqueta honesta de estado; usar flujo, diagrama o prototipo, nunca una UI falsamente presentada como enviada |
| Beneficio comercial | No construir plataforma propia; ahorro y menor costo; atención 24/7 donde aplique; uso de capacidad ociosa; menor presión sobre guardias costosas, fuga y sobredimensionamiento; más acceso y control operativo | Copy firme y direccional; no requiere métrica pública |
| Garantía condicional concreta | Cierre antes de consulta o sala cuando falla un clearance requerido; código de un uso; prueba de vida superada; pago aprobado o aplicado; registro firmado y trazable | Expresar sólo junto con su condición real; no convertir en garantía contractual universal |
| CTA | `Agendá una demo`; `Ver cómo funciona`; acceso médico; email; WhatsApp | Demo primaria, explicación secundaria y los demás como utilidades |

La licencia de copy comercial es firme: la ausencia de métricas públicas o de una UI terminada no debilita beneficios aprobados ni capacidades acordadas. No se inventan porcentajes, montos, plazos, clientes, testimonios, partners, integraciones, certificaciones ni garantías absolutas. Toda capacidad acordada pero en construcción conserva su territorio de mensaje y declara honestamente su forma de evidencia.

## Política de evidencia, activos y privacidad

- Cada claim tiene una única residencia visual primaria y cada sección responde una nueva pregunta de compra.
- La UI real disponible es la evidencia preferida para capacidades operacionales. Un fixture documentado no se presenta como dato de una persona real.
- Los diagramas conceptuales explican; no se usan como prueba de una UI entregada.
- El texto `~4 min` del activo de app no se reutiliza como claim sin verificación.
- Los medios humanos con procedencia o consentimiento sin confirmar no se usan hasta resolverlos.
- Sólo se admiten fixtures sintéticos aprobados y reproducibles. Nunca se incorpora PHI, información real de pacientes, secretos ni credenciales.
- El experimento es institucional y estático: no procesa datos clínicos ni solicita credenciales.

## Intención de experiencia

La lectura es quieta por defecto: sin scroll cinematográfico, revelados masivos, autoplay decorativo, parallax ni movimiento que demore la comprensión. El eventual prototipo deberá ser responsive y accesible: HTML semántico, un `h1`, orden lógico, navegación sin JavaScript, foco visible, texto alternativo preciso y respeto por preferencias de movimiento reducido.

V1, V2 y V3 son alcance inmutable y deben permanecer byte por byte sin cambios. V3 sigue siendo el baseline y uno de los tres estímulos de la prueba humana.

## Modo de proyecto y modelo de amenazas

Modo declarado: experimento institucional estático, público, sin backend clínico, autenticación, formularios, analytics ni credenciales.

En alcance del modelo de amenazas:

- exposición de PHI, información real de pacientes, secretos o credenciales;
- capacidades inventadas fuera de la dirección B2B acordada;
- links o activos rotos;
- dependencias no autorizadas;
- XSS si en una fase posterior aparece JavaScript;
- regresiones de accesibilidad o responsive.

Fuera de alcance:

- auditoría legal integral de marketing;
- exigir métricas para beneficios direccionales aprobados;
- hardening root de VPS;
- backend, autenticación o infraestructura de telemedicina;
- deuda preexistente no relacionada.

## Criterios de bloqueo

Sólo bloquean el avance: una falla explícita de aceptación, pérdida o corrupción real de datos, exposición de secretos, rotura de un servicio existente o pérdida de rollback básico.

En copy de producto también bloquean: cifras exactas fabricadas, garantías contractuales absolutas, clientes o testimonios inexistentes, certificaciones no obtenidas y capacidades fuera de dirección.

El estado en construcción y la falta de métricas públicas no son bloqueantes. Deben representarse con la forma de evidencia honesta ya definida, sin debilitar el territorio comercial aprobado.

## Entregables de composición y restricciones del prototipo posterior

La fase de composición deberá producir dos propuestas comparables:

1. V4-A, con responsabilidad, prioridad y complemento como evidencia primaria.
2. V4-B, con el recorrido condicional de cobertura como evidencia primaria.

Ambas deberán compartir identidad Alvia, audiencia, proposition, inventario de claims, calidad de copy, profundidad de evidencia, CTA y restricciones técnicas. La guía de diseño de Vercel puede informar composición, jerarquía y evidencia, pero no se copia su marca, shell ni CSS.

El prototipo posterior será estático, responsive, semántico, navegable sin JavaScript, con `noindex, nofollow`, sin dependencias externas, analytics, formularios nuevos ni código de deploy. No modificará V1, V2 ni V3. La primera lectura debe establecer comprador, propuesta, separación de responsabilidades y prueba primaria. Los gates se muestran como condicionales y se usa siempre `autorización y/o identidad` en el flujo de cobertura.

## Aceptación objetiva

Una variante queda lista para prueba sólo si:

- establece en primera lectura comprador, propuesta, responsabilidades y prueba principal;
- expresa `Tu red`, `Red Alvia` y `Ambas` como prioridad y complemento, no como tres productos pares;
- conserva independientes las hipótesis A y B;
- modela padrón, autorización, identidad y copago con sus condiciones reales;
- no duplica un claim como evidencia principal en múltiples secciones;
- vincula beneficios firmes con sus mecanismos sin cifras ni garantías fabricadas;
- etiqueta honestamente la evidencia en construcción;
- usa sólo activos permitidos y fixtures sintéticos;
- satisface accesibilidad, responsive, quietud por defecto y funcionamiento base sin JavaScript;
- preserva V1, V2 y V3 y no agrega dependencias, analytics, formularios o deploy.

## Método de decisión humana

Se aplicará `WEB_V4_TEST_SCRIPT.md` a 6–8 personas compradoras objetivo. V3, V4-A y V4-B se mostrarán con el mismo procedimiento neutral y orden contrabalanceado. Se capturan comprensión, tiempo para encontrar el comportamiento de cobertura, errores de interpretación, explicación espontánea y evidencia faltante para decidir una demo o piloto.

La adjudicación posterior ponderará frecuencia, severidad y relación de cada observación con la decisión de compra. La preferencia estética no decide. Una explicación correcta de comprador, propuesta y separación de responsabilidades en al menos 6 de 8 participantes es una señal orientativa de comprensión, no una métrica de producto ni un umbral automático.

No se elige ganador antes de recibir observaciones humanas. Tampoco existe fusión automática A/B: una combinación requerirá evidencia observada, una hipótesis nueva y otra ronda comparable.

## DAG, ownership y gates

```text
G0 plan + guion
  -> G1 revisión contractual de mensajes/evidencia
  -> G2 composiciones independientes A y B
  -> G3 prototipos comparables + verificación técnica
  -> G4 prueba humana neutral
  -> G5 adjudicación documentada
  -> G6 decisión de publicación
```

| Gate | Owner | Evidencia para avanzar |
|---|---|---|
| G0 | Implementador del bloque documental | Sólo este plan y el guion, probes aprobados y commit acotado |
| G1 | Responsable de producto/mensaje | Taxonomía, condiciones, claims y evidencia revisados contra referencias congeladas |
| G2 | Owner de composición de cada variante | Dos composiciones independientes y comparables, sin premezcla |
| G3 | Owner de implementación y verificación | Prototipos que cumplen aceptación técnica, privacidad y amenaza |
| G4 | Facilitador de investigación | Notas sin completar previamente, orden asignado y observaciones de 6–8 compradores objetivo |
| G5 | Responsable de decisión con reviewer | Matriz agregada por frecuencia, severidad y relación con decisión de compra |
| G6 | Owner de publicación | Decisión explícita, rollback básico y confirmación de que V3 no fue reemplazado accidentalmente |

## Política de publicación

Este bloque no publica, despliega ni reemplaza V3. Los prototipos posteriores permanecen experimentales y con `noindex, nofollow`. Sólo una decisión humana documentada después de G5 puede autorizar una propuesta de publicación; esa autorización debe definir alcance, revisión, rollback y relación con V3. No se hace push, merge, deploy ni cambio de `main` como consecuencia automática del experimento.
