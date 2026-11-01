# ESPECIFICACIÓN ESTRATÉGICA: SEO, SEO LOCAL, GEO, CRO, ANALÍTICA Y AUTORIDAD DIGITAL
## Plataforma Comercial Web — Tintorería Mimos (Vigo y Comarca)

**Versión:** 1.1.1  
**Fecha:** 1 de noviembre de 2026  
**Ámbito:** Documento marco transversal que rige la ejecución técnica y comercial del plan de 7 fases de Tintorería Mimos Navia, S.L.  
**Estado:** Documento Estratégico Definitivo  

---

## 1. VALORACIÓN ESTRATÉGICA Y PRINCIPIOS RECTORES

El propósito de esta especificación es dotar al proyecto web de una orientación de negocio rigurosa y medible, superando el concepto de «sitio web catálogo» para consolidar una herramienta comercial local funcional, veraz y transparente.

El marco de trabajo se fundamenta en cuatro principios rectores:

1. **Veracidad comercial sin excepciones:** Ningún dato, servicio, horario o capacidad operativa no verificado directamente por el titular puede ser publicado como hecho consumado ni inyectado en datos estructurados.
2. **Realismo técnico frente a motores de búsqueda e IA:** Los buscadores y asistentes generativos (Google Search, AI Overviews, AI Mode, Gemini, ChatGPT, Perplexity) no responden a atajos artificiales ni garantizan menciones fijas. Se optimiza la disponibilidad técnica, la claridad semántica y la consistencia de los datos para maximizar las probabilidades de indexación, comprensión y citación.
3. **Respeto a la legalidad y a la privacidad:** Las acciones de captación y medición se ejecutan supeditadas al consentimiento previo del usuario (AEPD / RGPD / ePrivacy), sin transferir datos personales identificativos (PII).
4. **Alineación con el plan maestro de 7 fases:** Este documento no crea un calendario alternativo; distribuye las 6 disciplinas estratégicas de forma transversal dentro de las 7 fases oficiales previamente aprobadas.

---

## 2. REGLA TRANSVERSAL: SISTEMA DE CLASIFICACIÓN DE DATOS Y SERVICIOS

### 2.1. Clasificación de Datos Comerciales y Legales
Todo dato comercial (dirección, teléfono, horario, tarifa, dato registral o coordenada) se clasifica estrictamente en uno de estos tres estados:

- **`CONFIRMADO`:** Validado directamente por el propietario o acreditado mediante documentación fehaciente (ej. CIF en tarjeta censal/escritura, titularidad de las 3 tiendas propias, canales de contacto centrales). Es el único que puede publicarse como definitivo y formar parte de los esquemas `Schema.org` (JSON-LD).
- **`PENDIENTE DE VALIDACIÓN`:** Procedente del código histórico o fuentes secundarias que aún carece de ratificación expresa del cliente (ej. horarios de establecimientos colaboradores, datos registrales mercantiles de tomo y folio, días de reparto de ruta). Se mantiene inventariado para gestión interna; **no puede publicarse como hecho cerrado ni incorporarse a datos estructurados Schema.org**.
- **`NO DISPONIBLE`:** Dato del que no se dispone constancia documental ni operativa. Queda terminantemente prohibido inventarlo, estimarlo o completarlo mediante suposiciones.

### 2.2. Control de Disponibilidad de Servicios Comerciales
Cada servicio o tratamiento que se mencione en la web debe tener expresamente asignado uno de los siguientes tres estados operativos:

- **`CONFIRMADO`:** Mimos presta activamente el servicio en la actualidad y dispone de información comercial, técnica y tarifaria respaldada por la empresa.
- **`PENDIENTE DE VALIDACIÓN`:** Existe una referencia en el código preexistente o en documentación histórica, pero requiere confirmación expresa del propietario antes de publicarse como servicio activo.
- **`NO DISPONIBLE`:** Mimos no ofrece actualmente este servicio.

**Regla de salvaguarda publicitaria:** No se crearán páginas comerciales, tablas de tarifas, calculadoras interactivas ni mensajes promocionales para servicios que se encuentren en estado `PENDIENTE DE VALIDACIÓN` o `NO DISPONIBLE` como si estuvieran operativos. Esta regla aplica con especial rigor a:
- *Wet Cleaning* (su alcance, ventajas y aplicación real en prendas específicas deben basarse en la maquinaria y procesos efectivamente instalados).
- *Limpieza y restauración de pieles y ante*.
- *Limpieza de tapicerías a domicilio*.
- *Custodia y almacenamiento estacional de alfombras*.
- *Servicios B2B corporativos:* uniformidad laboral industrial, limpieza de oficinas y comunidades de vecinos.

Cualquier afirmación ambiental (consumos energéticos, reciclaje hídrico, productos ecológicos) o de capacidad operativa debe corresponder estrictamente a la realidad demostrable de Tintorería Mimos.

---

## 3. LAS SEIS DISCIPLINAS ESTRATÉGICAS INTEGRADAS

### Disciplina 1: SEO Tradicional (Fundamentos y Arquitectura Orgánica)
*Objetivo: Mejorar la visibilidad orgánica para intenciones de búsqueda informacionales y transaccionales legítimas en Vigo y comarca.*

- **Arquitectura de clusters temáticos por intención:**
  - *Cluster Tintorería & Cuidado Textil:* Limpieza de prendas de vestir, trajes, vestidos y prendas delicadas confirmadas.
  - *Cluster Especialidades:* Limpieza de alfombras en Vigo, edredones y textiles del hogar confirmados.
  - *Cluster Arreglos & Costura:* Composturas, bajos, cremalleras y ajustes de prendas en Vigo y localidades colaboradoras.
  - *Cluster Alojamientos Turísticos:* Soluciones especializadas para rotaciones de ropa de cama y baño.
  - *Cluster Cobertura Geográfica:* Páginas específicas por municipio o zona para intenciones de búsqueda local.
- **Control estricto de canibalización:** Cada URL atiende una intención primaria única. Se prohíbe la creación de páginas vacías o con textos clonados (*doorway pages*).
- **Enlazado interno contextual:** Conexión semántica bidireccional entre servicios relacionados, artículos educativos del blog y puntos de acceso comercial.
- **Metadatos con criterio editorial:**
  - Los límites tradicionales (~60 caracteres para `<title>` y ~155 para `<meta name="description">`) se definen como **objetivos editoriales orientativos** para minimizar el riesgo de truncamiento en las SERPs, no como restricciones técnicas fijas. Lo prioritario es que el título sea relevante, refleje la marca y la intención local, y que la descripción resuma con veracidad el contenido para favorecer clics cualificados.
  - Etiquetas canónicas (`rel="canonical"`) auto-referenciadas y normalizadas en URLs absolutas.
- **Rastreo e Indexación:** `robots.txt` estructurado y `sitemap.xml` dinámico generado en el proceso de compilación, incluyendo únicamente URLs canónicas que devuelven código HTTP 200.

---

### Disciplina 2: SEO Local (Consistencia Geográfica y Diferenciación Operativa)
*Objetivo: Facilitar a los usuarios de Vigo y su comarca información exacta sobre dónde y cómo acceder a los servicios de Mimos sin generar falsas expectativas.*

- **Consistencia NAP (Name, Address, Phone):** Coherencia rigurosa en nombre, dirección, código postal y teléfono en todo el sitio web, en estricta consonancia con las fichas de Google Business Profile.
- **Diferenciación estricta entre Establecimientos Propios y Colaboradores:**
  - *Tiendas Propias (Gestión directa Mimos):*
    1. Sede Navia (C/ Teixugueiras, 11, bajo 9).
    2. Mimos Gregorio Espino (Alcalde Gregorio Espino, 44).
    3. Mimos Venezuela (C/ Venezuela, 41, bajo 1).
    *Principio de veracidad:* **Las tres ubicaciones son establecimientos propios gestionados por Tintorería Mimos. Los servicios, instalaciones, maquinaria y tratamientos disponibles en cada establecimiento se describirán individualmente según su operativa real y confirmada.** No se asumirá una infraestructura homogénea de maquinaria o procesos entre ellas sin validación.
  - *Establecimientos Colaboradores (Comercios independientes asociados):*
    Redondela (Mimos Redondela), Gondomar (Puntadas No Aire), Ponteareas (Arregla2), O Porriño (Telas y Más) y Vigo As Travesas (D'Passo).
    *Principio de delimitación:* Son comercios de proximidad independientes que actúan como puntos receptores y de entrega para prendas tratadas por Mimos. **No se presupondrá que todos los trabajos se realizan necesariamente en Navia sin confirmación del propietario.** Se distinguirán nítidamente los servicios prestados por Tintorería Mimos de aquellos que ofrece de manera propia e independiente el comercio colaborador (como los talleres de costura in situ de Gondomar, Ponteareas u O Porriño).
- **Diferenciación rigurosa de 4 tipologías horarias (Sin mezclar datos):**
  1. *Horario de apertura de una tienda propia:* Horas de atención del personal de Mimos en sus locales de Vigo.
  2. *Horario de apertura de un establecimiento colaborador:* Horario comercial del negocio independiente asociado.
  3. *Horario de depósito y entrega para Mimos en el colaborador:* Tramo en el que el colaborador recibe o entrega prendas para Mimos.
  4. *Días y rutas de reparto de Mimos:* Días específicos en los que el servicio logístico de Mimos acude al establecimiento a retirar o entregar los pedidos.
  *Ninguno de estos cuatro conceptos debe confundirse en el texto visible ni en los datos técnicos.*
- **Georreferenciación y Google Business Profile:** Enlaces a Google Maps con coordenadas contrastadas. Solo se integrarán en la web y en mapas coordenadas con estado `CONFIRMADO`.

---

### Disciplina 3: GEO — Generative Engine Optimization (Optimización para Asistentes y Búsqueda por IA)
*Objetivo: Mejorar la disponibilidad, comprensión técnica y probabilidades de citación por parte de motores de búsqueda generativos y asistentes de IA (Google AI Overviews, AI Mode, Gemini, ChatGPT, Perplexity).*

- **Realismo técnico y ausencia de garantías de citación:**
  - La presencia, recomendación o citación en motores generativos **no puede garantizarse**. Ninguna técnica de etiquetado o estructura web asegura que un modelo de lenguaje recomiende un negocio.
  - El objetivo de la optimización GEO consiste en **eliminar barreras técnicas de lectura, estructurar respuestas claras y evitar contradicciones factuales** que provoquen alucinaciones o exclusión del contenido por parte de los modelos.
- **Rastreo y Renderizado (JavaScript vs. HTML inicial):**
  - Se reconoce técnicamente que motores como Googlebot son capaces de ejecutar JavaScript en sus procesos de renderizado.
  - No obstante, la generación de HTML estático pre-renderizado (SSG) aporta un **beneficio objetivo contrastado:** ofrece una mayor disponibilidad inmediata del contenido inicial y reduce la dependencia de la ejecución de JavaScript en los rastreadores (especialmente relevante para bots de IA con presupuestos de rastreo limitados).
  - El SSG es una **buena práctica de ingeniería y accesibilidad de contenidos, no una garantía de indexación o recomendación por IA**. No se afirmará que un asistente prefiera siempre el HTML inicial si no existe documentación oficial del proveedor que lo respalde expresamente.
- **Gestión deliberada de rastreadores y tokens de IA en `robots.txt`:**
  - Los proveedores de inteligencia artificial y motores de búsqueda disponen de sus propias reglas de rastreo, sintaxis y directivas de uso de contenido. **Su tratamiento en `robots.txt` debe ser una decisión deliberada del propietario**, distinguiendo con rigor documental:
    - **Google y el token `Google-Extended`:** Se aclara expresamente que `Google-Extended` **no es un rastreador web independiente ni dispone de un User-Agent HTTP propio**. Es un token de control de producto de Google que permite a los webmasters gestionar si su contenido se utiliza para el entrenamiento de modelos de IA de Google (como Gemini) y el grounding en Vertex AI Search y las aplicaciones Gemini, sin afectar en absoluto al rastreo de `Googlebot` ni a la presencia e indexación en Google Search.
    - **Rastreadores de OpenAI:**
      - `OAI-SearchBot`: Rastreo especializado para el motor de búsqueda en tiempo real de ChatGPT (SearchGPT) orientado a indexar contenido y enlazar citas y fuentes en las respuestas.
      - `GPTBot`: Rastreador general de recopilación de contenido web que puede utilizarse para el entrenamiento y mejora de futuros modelos fundacionales de OpenAI.
      - `ChatGPT-User`: Peticiones bajo demanda iniciadas directamente por usuarios cuando solicitan a ChatGPT que visite o resuma una URL específica en tiempo real.
    - **Rastreadores de Anthropic:**
      - `Claude-SearchBot`: Rastreo específico para funciones de búsqueda y citas web en tiempo real en los productos de Claude.
      - `ClaudeBot`: Rastreador general de Anthropic utilizado para recopilación de datos web y entrenamiento de modelos.
      - `Claude-User`: Accesos directos iniciados por usuarios durante sesiones de interacción activa con Claude.
    - **Otros proveedores:** Distinción análoga para `PerplexityBot` (búsqueda y citación de Perplexity) según su documentación oficial.
  - El archivo `robots.txt` se configurará en la fase correspondiente según las directrices estratégicas que determine el titular para cada proveedor y finalidad (permitir búsqueda y citación, permitir o bloquear entrenamiento de modelos).
- **Alcance real de `FAQPage` y resultados enriquecidos:**
  - De acuerdo con la documentación oficial vigente de Google, el marcado estructurado `FAQPage` **no garantiza la aparición de resultados enriquecidos en las SERPs**. Para el sector comercial de servicios, Google ha restringido severamente estos fragmentos visuales.
  - El uso de preguntas frecuentes estructuradas se preserva exclusivamente por su **valor de legibilidad semántica para modelos de IA**, sin prometer rich snippets visuales en Google.

---

### Disciplina 4: Marcado Estructurado Schema.org
*Objetivo: Proporcionar a los motores de búsqueda una descripción formal, no ambigua y verificable de la entidad corporativa, sus establecimientos y sus servicios.*

- **JSON-LD como formato único:** Implementación exclusiva mediante bloques `<script type="application/ld+json">`. Se descartan microdatos incrustados en HTML para mantener la maquetación limpia.
- **Supresión de intentos de marcado de reseñas propias (`AggregateRating`):**
  - Conforme a las directrices de Google contra las reseñas autocomplacientes (*self-serving reviews*), los negocios locales no pueden utilizar el marcado `AggregateRating` sobre su propia entidad para intentar obtener estrellas enriquecidas en sus resultados orgánicos directos.
  - **Se elimina como objetivo obtener estrellas en Google mediante marcado de reseñas propias.** Los testimonios reales de clientes se podrán mostrar en la interfaz para generar confianza comercial (CRO), pero sin marcado inválido que vulnere las directrices de calidad de Google.
- **Tratamiento tipológico riguroso (Sin inventar tipos ni sucursales falsas):**
  - *Tiendas propias:* Marcado `DryCleaningOrLaundry` / `LocalBusiness` con identificadores únicos `@id`, indicando únicamente datos con estado `CONFIRMADO`.
  - *Establecimientos colaboradores:* **Bajo ningún concepto se convertirán en sucursales de Mimos ni se generarán entidades `LocalBusiness` que puedan inducir a pensar que son locales de su propiedad.** Se estudiará el uso de tipos como `Service` y `ServiceChannel` cuando representen fielmente el canal de entrega/recogida. Si el vocabulario Schema.org no permite una representación exacta e inequívoca, **se optará por información visible clara y enlaces descriptivos sin forzar esquemas artificiales**.
- **Regla estricta de veracidad:** Queda vetada la inclusión de datos con estado `PENDIENTE DE VALIDACIÓN` o `NO DISPONIBLE` en el código JSON-LD.

---

### Disciplina 5: CRO (Optimización de la Conversión) y Analítica Ética
*Objetivo: Optimizar el flujo de contacto de usuarios legítimamente interesados y monitorizar la eficacia comercial respetando la privacidad y distinguiendo métricas de vanidad de resultados de negocio.*

- **Taxonomía precisa de eventos (Tres niveles claramente diferenciados):**
  - **A. Interacciones de navegación (Acciones que demuestran interés, no intención cerrada):**
    - `click_telefono`: Clic en enlace `tel:`. *Aclaración:* un clic en un enlace telefónico **no demuestra que se haya realizado ni completado una llamada**.
    - `click_whatsapp`: Clic en enlace de WhatsApp. *Aclaración:* abrir la aplicación de WhatsApp **no demuestra que el usuario haya enviado un mensaje**.
    - `ver_ficha_tienda`: Apertura o despliegue de detalles de un establecimiento.
    - `uso_calculadora`: Interacción con los campos de la calculadora de alfombras.
  - **B. Oportunidades comerciales / Leads (Contactos entrantes recibidos por un canal identificable):**
    - `solicitud_recogida_recibida`: Formulario de recogida a domicilio debidamente estructurado y recibido. *Aclaración:* el envío del formulario **no demuestra la contratación efectiva del servicio**.
    - `solicitud_presupuesto_recibida`: Envío formal de solicitud para empresas o colectivos.
    - `contacto_comercial_recibido`: Mensaje entrante verificado a través de los canales de atención.
  - **C. Resultados comerciales reales (Hechos económicos fuera de la web):**
    - `servicio_contratado`: Pedido formalizado y aceptado por ambas partes.
    - `servicio_realizado`: Tratamiento textil ejecutado.
    - `venta_registrada`: Cobro y facturación del servicio.
    *Los resultados comerciales ocurren fuera de la web (en mostrador, furgoneta o vía telefónica) y **no se atribuirán automáticamente a GA4**.*
- **Herramientas de medición: GA4 vs. Google Search Console:**
  - Se distingue expresamente que **Google Search Console es una herramienta de diagnóstico y medición de rendimiento en búsquedas orgánica completamente independiente de GA4**. Opera a nivel de servidores de Google y **no requiere la instalación de ningún script de seguimiento en el navegador del usuario**, por lo que no depende del consentimiento de cookies.
  - Google Analytics 4 (GA4) es una herramienta analítica del lado del cliente y requiere activación condicional.
- **Protección de Datos y Consentimiento (AEPD / RGPD / ePrivacy):**
  - Ningún script de analítica se activará sin el **consentimiento previo, libre e informado del usuario** mediante el banner de cookies, conforme a las directrices vigentes de la AEPD.
  - **Prohibición absoluta de capturar o enviar Información Personal Identificable (PII) a GA4:** queda prohibido transferir nombres, teléfonos, emails, direcciones postales o textos libres introducidos por el usuario en formularios o parámetros de evento.
- **Calculadora de alfombras con tarifas reales:** La herramienta interactiva debe apoyarse en tarifas unitarias, mínimos de facturación y suplementos que Mimos tenga formalmente aprobados como `CONFIRMADO`, evitando cálculos ficticios.

---

### Disciplina 6: Autoridad Digital y Reputación Externa
*Objetivo: Reforzar la notoriedad de marca y la confianza de los consumidores mediante señales honestas y comprobables.*

- **Protocolo de reseñas neutral y sin sesgos (*Anti-Review Gating*):**
  - Conforme a las directrices de Google y la normativa europea de protección al consumidor contra prácticas desleales, la solicitud de opiniones debe ser **abierta, honesta e imparcial**.
  - Queda estrictamente descartado el filtrado previo de clientes para solicitar reseñas únicamente a aquellos con experiencias positivas (*review gating*), así como la entrega de incentivos, descuentos o compensaciones a cambio de valoraciones.
  - El protocolo consiste en facilitar a **todos los clientes atendidos** el enlace directo a la ficha de Google Business Profile del establecimiento correspondiente tras la entrega de sus prendas.
- **Delimitación estricta de ámbitos: Código vs. Trabajo Comercial Externo:**
  - *En el código web:* Enlaces limpios a perfiles oficiales, marcado semántico, accesibilidad y velocidad.
  - *Acción externa (competencia del cliente):* La atención al cliente en mostrador, la negociación de convenios con hoteles o viviendas turísticas, la respuesta a reseñas y las apariciones en prensa son labores operativas externas que no dependen del desarrollo web.
- **Prohibición de autoridad ficticia:** No se publicarán en la web sellos de certificación, logotipos de colaboración, premios ni menciones en medios que no hayan sido acreditados fehacientemente por el titular.

---

## 4. ADAPTACIÓN TRANSVERSAL A LAS SIETE FASES OFICIALES Y CRITERIOS TÉCNICOS OBJETIVOS DE ACEPTACIÓN

La integración estratégica se ejecuta sobre el **cronograma de 7 fases oficialmente aprobado**, sin crear calendarios alternativos ni reiniciar fases concluidas. Se sustituyen expresiones ambiguas por criterios técnicos objetivos y verificables:

| Fase Oficial Aprobada | Disciplinas Transversales | Integración Estratégica en esta Fase | Criterios Técnicos Objetivos de Aceptación |
| :--- | :--- | :--- | :--- |
| **Fase 1: Cimientos técnicos y línea base** | *Auditoría general* | **[COMPLETADA Y VALIDADA]** Diagnóstico de entorno, dependencias, scripts, estado de TypeScript y registro de línea base sin tocar código. | • Cero errores de compilación (`tsc --noEmit`).<br>• Línea base documentada con versiones reales. |
| **Fase 2: Datos maestros comerciales** | *SEO Local, Legalidad, Veracidad* | **[COMPLETADA Y VALIDADA]** Creación de `commercialMasterData.ts` como fuente única de verdad, eliminación de `puntos.json`, confirmación de 3 tiendas propias (descarte de Bouzas), inventario clasificado de 5 colaboradores y depuración del Aviso Legal sin textos provisionales públicos. | • Eliminación limpia de `puntos.json` sin regresiones.<br>• `tsc --noEmit` y `npm run build` limpios.<br>• Tabla de datos maestros con estados `CONFIRMADO` y `PENDIENTE DE VALIDACIÓN`. |
| **Fase 3: SEO, SEO local, GEO y Schema.org** | *SEO Tradicional, SEO Local, GEO, Schema.org, Analítica (definición)* | Arquitectura temática y control de canibalización; metadatos optimizados con criterio editorial; contenido redactado para claridad frente a IA Overviews; marcado `Schema.org` estricto en JSON-LD (tiendas propias diferenciadas de colaboradores, sin promesas de `AggregateRating` ni `FAQPage`); definición documental del diccionario analítico (interacción vs. oportunidad sin PII); política de rastreadores en `robots.txt` (distinguiendo `OAI-SearchBot`, `GPTBot`, `ChatGPT-User`). | • **Schema.org Validator:** Cero errores de sintaxis y vocabulario en esquemas JSON-LD.<br>• **Google Rich Results Test:** Validación de compatibilidad para tipos elegibles (reconociendo que no todos los tipos generan rich snippets).<br>• Cero URLs canónicas duplicadas o rotas.<br>• Diccionario de eventos documentado según la taxonomía aprobada. |
| **Fase 4: Rediseño visual, accesibilidad, recursos y CRO** | *CRO, Autoridad, Accesibilidad* | Superación del diseño de plantilla IA; tipografía y jerarquía visual distintivas; empleo de fotografías reales de Mimos; reducción de repetición de tarjetas; flujos de contacto sin fricción (Quick Actions móvil, mensajes WhatsApp contextualizados); calculadora de alfombras con tarifas confirmadas; testimonios reales en UI sin marcado engañoso; diseño accesible. | • **Accesibilidad WCAG 2.2 nivel AA:** Comprobaciones automatizadas sin errores críticos combinadas con pruebas manuales (navegación completa por teclado, indicadores de foco claramente visibles, ratios de contraste conformes y orden semántico legible por lectores de pantalla).<br>• Flujos de contacto accesibles en ≤ 2 toques en móvil. |
| **Fase 5: Seguridad, privacidad y producción Apache** | *Privacidad, Analítica (implementación), Apache* | Implementación de GA4 estrictamente supeditada al consentimiento previo del banner de cookies (AEPD / RGPD / ePrivacy); bloqueo técnico de tracking previo a aceptación; cabeceras de seguridad HTTP en `.htaccess` (CSP, HSTS, X-Frame-Options, X-Content-Type-Options); respuestas de error 404 nativas en servidor; redirecciones canónicas; configuración de hosting estático en Apache. | • Comprobación en depurador de red: cero cookies o peticiones analíticas antes de pulsar "Aceptar".<br>• Inspección de payloads analíticos: cero parámetros con PII.<br>• Cabeceras de seguridad verificadas en respuestas HTTP Apache con códigos de estado 200 y 404 correctos. |
| **Fase 6: Prerenderizado SSG: piloto y generación global** | *GEO, Rendimiento, Indexación* | **Metodología de 2 pasos:**<br>1) *Piloto:* Generación y validación de una única ruta representativa (código HTML entregado, metadatos, JSON-LD, hidratación limpia de React y Core Web Vitals).<br>2) *Global:* Despliegue sobre todas las rutas y sincronización automática del `sitemap.xml`. | • Contenido textual, tablas y metadatos presentes en el primer paquete HTML estático inspeccionable (cero dependencia de JS para la lectura inicial).<br>• Archivo `sitemap.xml` 100 % coincidente con las rutas generadas y respuestas HTTP 200.<br>• Hidratación de React sin errores en consola. |
| **Fase 7: Auditoría final de aceptación** | *Todas (Validación Integral)* | Auditoría final integral del sitio web en entorno de producción simulado (Apache):<br>• Core Web Vitals y rendimiento.<br>• Accesibilidad y buenas prácticas.<br>• Integridad de datos frente a la matriz de veracidad.<br>• Entrega de la guía de acciones externas de autoridad (GBP, protocolo neutral de reseñas). | • **Core Web Vitals (umbral objetivo en laboratorio y percentil 75 en campo si aplica):**<br>  - **LCP:** ≤ 2,5 segundos.<br>  - **INP:** ≤ 200 milisegundos.<br>  - **CLS:** ≤ 0,1.<br>• **Lighthouse:** Rendimiento, Accesibilidad, Mejores Prácticas y SEO en rangos óptimos con cero errores bloqueantes.<br>• Cero enlaces rotos y cero discrepancias de datos comerciales. |

---

## 5. MATRIZ DE RESPONSABILIDADES: CÓDIGO WEB VS. ACCIÓN EXTERNA

```
┌────────────────────────────────────────────────────────────────────────────┐
│                             TINTORERÍA MIMOS                               │
├─────────────────────────────────────────────┬──────────────────────────────┤
│  EN EL CÓDIGO DE LA WEB (NUESTRO TRABAJO)   │ ACCIONES EXTERNAS (CLIENTE)  │
├─────────────────────────────────────────────┼──────────────────────────────┤
│ 1. Estructura HTML semántica y SSG accesible│ 1. Reclamación y gestión de  │
│ 2. Marcado Schema.org en JSON-LD validado   │    fichas Google Business    │
│    sin datos inventados ni AggregateRating  │ 2. Solicitud abierta y neutral│
│ 3. Optimización técnica Core Web Vitals     │    de reseñas a clientes en  │
│ 4. Coherencia NAP y diferenciación clara de │    mostrador (sin incentivos)│
│    tiendas propias vs. colaboradores        │ 3. Aportación de tarifas     │
│ 5. Flujos de conversión accesibles (CRO)    │    reales para calculadora   │
│ 6. Taxonomía de eventos sin capturar PII    │ 4. Facilitar datos de Tomo y │
│ 7. Bloqueo de analítica previo a aceptación │    Folio del Registro        │
│ 8. Configuración robots.txt según política  │ 5. Ratificación de horarios  │
│    del titular (OAI-SearchBot, GPTBot...)   │    y rutas de colaboradores  │
│ 9. Configuración Apache (.htaccess) robusta │ 6. Negociación de acuerdos   │
│    con cabeceras de seguridad y 404 nativos │    comerciales con empresas  │
└─────────────────────────────────────────────┴──────────────────────────────┘
```

---

## 6. CONCLUSIONES Y HOJA DE RUTA

- **Versión consolidada:** La presente **versión 1.1.1** constituye la referencia estratégica y técnica definitiva del proyecto.
- **Seguridad metodológica:** Las Fases 1 y 2 permanecen cerradas y validadas. Ningún archivo de código ha sido modificado en esta intervención.
- **Siguiente paso operativo:** Queda preparado el marco para iniciar la **Fase 3: SEO, SEO local, GEO y Schema.org**, la cual se abordará exclusivamente tras recibir tu autorización formal.
