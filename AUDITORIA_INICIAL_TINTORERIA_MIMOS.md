# AUDITORÍA TÉCNICA, SEO, GEO, LOCAL, CRO Y RENDIMIENTO
## TINTORERÍA MIMOS NAVIA S.L. (`https://www.tintoreriamimos.es/`)

**Fecha de emisión:** Noviembre 2026  
**Equipo auditor:** Equipo Multidisciplinar (Arquitectura Software React/TS, Consultoría SEO Técnico & Local, Especialista GEO/IA, Especialista CRO, Auditoría de Rendimiento Web y Accesibilidad)  
**Versión del informe:** 1.0 (Auditoría Exhaustiva de Código y Servidor en Producción)  
**Estado:** Lectura estricta y diagnóstico — Sin modificaciones de código ejecutadas.

---

## 1. RESUMEN EJECUTIVO

Tintorería Mimos Navia S.L. dispone de una base de código moderna desarrollada en **React 19 + TypeScript + Vite 6 + Tailwind CSS**, concebida para reemplazar la instalación legada en producción (un CMS Joomla con servidor LiteSpeed sobre Plesk Linux). El proyecto implementa un sistema avanzado de generación estática previa (**prerenderizado SSG para 34 rutas**), marcado semántico Schema.org mediante grafos vinculados, integración de datos geográficos para el área metropolitana de Vigo, y optimización orientada a motores generativos de inteligencia artificial (GEO vía `llms.txt` y metaetiquetas especializadas).

### Puntos Fuertes Identificados
1. **Prerenderizado SSG completo (34 rutas):** Todo el contenido crítico, metadatos SEO, resúmenes textuales para rastreadores sin JavaScript (`noscript#aeo-static-summary` con `<main id="main-content">`), y bloques JSON-LD están incrustados directamente en el HTML inicial servido.
2. **Grafo Schema.org robusto y profesional:** Uso de `@graph` con `@id` canónicos jerárquicos que vinculan la corporación (`DryCleaningOrLaundry`), las tiendas físicas específicas (`DryCleaningOrLaundry` / `LocalBusiness`), la web (`WebSite`) y los documentos (`WebPage`), evitando duplicidad de entidades.
3. **Cero dependencias obsoletas o vulnerabilidades críticas de build:** El compilador TypeScript (`tsc --noEmit`) compila sin errores, el empaquetado de producción (`npm run build`) es limpio y la estructura de componentes es modular.
4. **Infraestructura de servidor de producción potente:** El servidor de producción cuenta con **LiteSpeed Web Server**, compatibilidad nativa con **HTTP/3 y HTTP/2**, compresión **Brotli** y **Gzip**, y cabeceras **HSTS (max-age=63072000)** activas.

### Principales Vulnerabilidades y Desviaciones Críticas
1. **Contradicciones en la realidad comercial y talleres de costura:** Inconsistencia grave en el mensaje comercial. En varios componentes y textos de `src/data/mimosData.ts` (L899) y `ClothingAlterationsPage.tsx` (L422) se afirma que *"las 3 tiendas propias cuentan con taller de costura propio"*, lo cual es falso y confuso (Navia es punto de recepción y recogida de arreglos, pero NO tiene taller de confección in situ; únicamente Gregorio Espino y Venezuela disponen de taller físico con modista).
2. **Duplicidad de fuentes de verdad de datos:** Coexisten `src/data/commercialMasterData.ts` (774 líneas) y `src/data/mimosData.ts` (2097 líneas), produciendo redundancia en precios, catálogos de servicios y listas de colaboradores, facilitando la desincronización de datos.
3. **Imágenes hiperpesadas en `public/`:** Se han detectado más de 20 imágenes en formatos JPEG y WebP sin optimizar, con pesos individuales entre **600 KB y 978 KB** (ej. `public/images/puntadas-no-aire/fachadaGondomar2.jpg` con 978 KB; `public/alfombras-mimos.webp` con 949 KB). Su impacto en el LCP (Largest Contentful Paint) móvil es crítico.
4. **Fuga y duplicidad en producción (Redirección Canónica www):** El servidor LiteSpeed actual responde con código HTTP 200 directo tanto en `https://www.tintoreriamimos.es/` como en `https://tintoreriamimos.es/`, canibalizando el dominio y duplicando la indexación al carecer de una regla de redirección 301 forzosa a la versión con `www`.

---

## 2. ESTADO GENERAL DEL PROYECTO

### 2.1 Comparativa: Servidor de Producción Actual vs. Código Local Prerenderizado

| Parámetro | Producción Actual (`https://www.tintoreriamimos.es/`) | Código Local / Build Vite (`dist/`) |
| :--- | :--- | :--- |
| **Tecnología Base** | Joomla! Legacy CMS (`0abbfef464...` session cookies) | React 19 + TypeScript + Vite 6 + Tailwind CSS |
| **Servidor Web** | LiteSpeed / Plesk Linux (`x-powered-by: PleskLin`) | Apache / LiteSpeed (vía `.htaccess`) o Node (`server.ts`) |
| **Protocolo HTTP** | HTTP/3 (`h3=":443"`), HTTP/2, TLS 1.3 | Compatible con HTTP/2 y HTTP/3 en LiteSpeed |
| **Compresión** | Brotli (`br`) y Gzip activos | Ficheros listos para compresión estática o al vuelo |
| **Caché HTML** | `no-cache, private`, `expires: 2005` (Anti-caché forzado) | HTML prerenderizado listo para `must-revalidate` |
| **Caché Assets** | `max-age=604800` (7 días) | Hashes Vite (`assets/[name]-[hash].js`) listos para 1 año |
| **Rutas Modernas** | `/limpieza-alfombras-vigo`, `/llms.txt`, etc. devuelven 404 | 34 rutas prerenderizadas estáticas listas en `dist/` |
| **Redirección No-WWW** | Vulnerable: `tintoreriamimos.es` responde 200 sin redirigir | Requiere directiva `.htaccess` para forzar 301 a `www.` |

### 2.2 Ficheros Clave del Proyecto
- **Datos Maestros:** `src/data/commercialMasterData.ts` (fuente canónica estricta).
- **Datos de UI / Vistas:** `src/data/mimosData.ts` (capa intermedia de compatibilidad).
- **SEO por Ruta:** `src/data/routesSeoData.ts` (metadatos, canonicals, OGP).
- **Generador de Schema & SEO:** `src/utils/seo.ts` (generación del grafo `@graph`).
- **Script SSG:** `scripts/prerender-routes.ts` (motor Node que inyecta HTML, metadatos y schemas en 34 rutas).
- **Configuración de Rastreo:** `public/robots.txt` y `public/llms.txt`.
- **Servidor Express Dev/SSR:** `server.ts`.

---

## 3. AUDITORÍA TÉCNICA

### 3.1 Arquitectura React, TypeScript y Vite
- **TypeScript:** Configurado en modo estricto (`strict: true`). No existen errores de tipado al ejecutar `tsc --noEmit`.
- **Rendimiento de Bundle JS/CSS:**
  - `dist/assets/index-*.js`: ~238 KB (~68 KB Gzip / ~58 KB Brotli). Excelente contención de peso para una SPA moderna con enrutamiento dinámico.
  - `dist/assets/index-*.css`: ~42 KB (~8 KB Gzip / ~6.5 KB Brotli).
- **Enrutamiento del Lado del Cliente (Client Routing):** 
  - Utiliza `History API` con gestión de popstate y listeners de clicks en anclas.
  - Compatible con el SSG estático: el servidor sirve el HTML específico de cada ruta física (`/textiles-hogar-vigo/index.html`) y React hidrata la aplicación en el cliente.
- **Doble Entrada de Contenido (AEO Static Summary):**
  - Cada HTML prerenderizado incluye un `<noscript id="aeo-static-summary">` con un `<main id="main-content">` en el que se plasma todo el contenido del servicio o zona, H1, H2, listas de servicios, preguntas frecuentes y direcciones completas. Esto garantiza indexabilidad absoluta para cualquier bot que no ejecute JavaScript.

### 3.2 Análisis de Fuentes de Datos (Master Data vs. mimosData)
Existe un problema estructural de arquitectura de datos:
- `commercialMasterData.ts` define con precisión quirúrgica:
  - 3 tiendas propias y sus particularidades (Navia: sin taller in situ; Gregorio Espino: taller in situ; Venezuela: taller in situ).
  - 5 puntos colaboradores (independientes, talleres propios ajenos).
  - Catálogo de servicios confirmados (`tintoreria_lavanderia`, `textiles_hogar`, `limpieza_alfombras`, `limpieza_edredones`, `costura_arreglos`, `desinfeccion_ozono`).
- Sin embargo, `mimosData.ts` (2097 líneas) reimplementa estructuras paralelas:
  - Duplica arrays de zonas, puntos de servicio y tarifas.
  - Introduce textos descriptivos que entran en contradicción directa con el master data.
  - Declara servicios no homologados en `commercialMasterData.ts` (ej. `/limpieza-pieles-cuero-vigo` como Servicio 06 con URLs dedicadas, cuando en los datos maestros solo figura como especialidad artesanal de Gregorio Espino).

---

## 4. AUDITORÍA SEO TÉCNICO Y ON-PAGE

### 4.1 Indexabilidad, Sitemap y Robots.txt
- **Sitemap (`public/sitemap.xml`):**
  - 31 URLs indexables perfectamente sincronizadas con `routesSeoData.ts`.
  - Excluye con acierto las 3 páginas de aviso legal, privacidad y cookies (`noindex, nofollow`).
- **Robots.txt (`public/robots.txt`):**
  - Declara `Sitemap: https://www.tintoreriamimos.es/sitemap.xml`.
  - Permite rastreo general `Allow: /`.
  - Bloquea `/api/` y `/*.json$`.
  - **Hallazgo:** Autoriza explícitamente a rastreadores de entrenamiento de IA de forma indiferenciada junto con rastreadores de búsqueda conversacional (ver Sección 6).

### 4.2 Títulos, Metadescripciones y Jerarquía de Encabezados
- **Títulos y Metas:**
  - 100% de las 34 rutas disponen de `<title>` exclusivo y `<meta name="description">` orientada a búsqueda transaccional local.
  - OpenGraph (`og:title`, `og:description`, `og:image`, `og:url`) y Twitter Cards integrados en el prerender.
- **Canónicas (`<link rel="canonical">`):**
  - Todas las rutas apuntan de forma unívoca a la URL canónica absoluta con `https://www.tintoreriamimos.es/...`.
- **Jerarquía H1/H2/H3:**
  - Todas las páginas cuentan con un único H1 visual y un único H1 en el bloque estático de prerenderizado.
  - En la fase 5.2A se resolvió el conflicto de modales de colaboradores: los modales renderizan `<h2>` con `id="modal-title-..."` enlazado con `aria-labelledby`, reservando el `<h1>` para la página dedicada.

### 4.3 Grafo Schema.org (`@graph`)
El generador `src/utils/seo.ts` construye un grafo RDF/JSON-LD vinculado:
1. `DryCleaningOrLaundry` principal: `@id: https://www.tintoreriamimos.es/#organization`.
2. 3 nodos `DryCleaningOrLaundry` de tienda física:
   - `.../#store-navia`
   - `.../#store-gregorio-espino`
   - `.../#store-venezuela`
3. 5 nodos `LocalBusiness` de colaboradores:
   - Identificados como `branchOf: ...#organization` y clarificados en descripción como puntos de entrega/recogida colaboradores independientes.
4. `WebSite`: `@id: https://www.tintoreriamimos.es/#website`.
5. `WebPage`: `@id: https://www.tintoreriamimos.es/.../#webpage`.
6. `BreadcrumbList` y `FAQPage` automáticos cuando la ruta incluye preguntas frecuentes.

---

## 5. AUDITORÍA SEO LOCAL Y GEOGRÁFICO

### 5.1 Consistencia NAP (Name, Address, Phone)
Las 3 tiendas físicas propias presentan datos NAP rigurosos en `commercialMasterData.ts`:

1. **Tienda Navia (Sede Central / Lavandería Principal):**
   - **Nombre:** Tintorería Mimos - Navia
   - **Dirección:** Rúa Teixugueiras 11, Entreplanta 9 (Acceso por rampa comunitaria), 36212 Vigo, Pontevedra.
   - **Teléfono:** `+34 986 24 16 75` / WhatsApp: `+34 669 26 21 02`
   - **Coordenadas:** `lat: 42.209633, lng: -8.769917`
   - **Peculiaridad:** NO tiene taller de costura in situ (recoge prendas para taller central/asociado).
2. **Tienda Gregorio Espino:**
   - **Nombre:** Tintorería Mimos - Gregorio Espino
   - **Dirección:** Rúa do Alcalde Gregorio Espino 44, 36205 Vigo, Pontevedra.
   - **Teléfono:** `+34 986 26 31 11`
   - **Coordenadas:** `lat: 42.231200, lng: -8.705100`
   - **Peculiaridad:** Taller de costura propio in situ con modista especializada. Especialista en pieles.
3. **Tienda Venezuela:**
   - **Nombre:** Tintorería Mimos - Venezuela
   - **Dirección:** Rúa Venezuela 41, Bajo 1, 36203 Vigo, Pontevedra.
   - **Teléfono:** `+34 986 48 30 79`
   - **Coordenadas:** `lat: 42.233900, lng: -8.718800`
   - **Peculiaridad:** Taller de costura propio in situ. Horario de sábado: CERRADO.

### 5.2 Red de Colaboradores (5 Puntos Oficiales)
- **Telas y Más (O Porriño):** Rúa Antonio Palacios 57. Taller de confección y arreglos independiente.
- **Puntadas No Aire (Gondomar):** Rúa San Bieito 5. Taller de arreglos y costura independiente.
- **Arregla2 (Ponteareas):** Rúa Senén Canido 4. Taller de arreglos y costura independiente.
- **D'Passo (Vigo - As Travesas):** Rúa López Mora 74. Zapatería y reparación de calzado / Punto de recogida.
- **Redondela (Punto de Entrega):** Rúa Ribeira 11. **ADVERTENCIA COMERCIAL:** Es exclusivamente punto de recogida y entrega de tintorería y lavandería. NO debe publicitarse como taller de costura ni de arreglos.

### 5.3 Cobertura Geoespacial y Riesgo de Canibalización
- Se detecta competencia semántica entre:
  - `/` (Home con foco en Vigo y comarca).
  - `/tintoreria-vigo` (Landing especializada).
  - `/lavanderia-vigo` (Landing especializada).
  - `/zonas/vigo` (Página de cobertura local de Vigo).
- **Riesgo:** Si las cuatro páginas utilizan densidades similares de "tintorería en Vigo", Google dispersa la autoridad del dominio entre varias URLs en lugar de consolidar la Home o la landing de servicio principal.

---

## 6. AUDITORÍA GEO (GENERATIVE ENGINE OPTIMIZATION)

La optimización para motores generativos (ChatGPT Search, Perplexity AI, Google Gemini, Microsoft Copilot) presenta un nivel de madurez sobresaliente gracias al archivo `public/llms.txt`. Sin embargo, se identifican aspectos de refinamiento crítico:

### 6.1 Análisis de `public/llms.txt`
- **Estructura:** Excelente organización en Markdown con sintaxis limpia, resúmenes de servicios, direcciones exactas de las 3 tiendas, lista de 5 puntos colaboradores y FAQs de alto impacto.
- **Coherencia reciente:** Ya se incorporó la corrección del horario de Venezuela (Sábados cerrado) y su taller propio.
- **Punto de mejora:** Debe enfatizarse inequívocamente que **Navia NO tiene taller de confección in situ**, para que los motores de IA no generen alucinaciones cuando un usuario pregunte: *"¿Puedo llevar un vestido para que me cojan el bajo en el acto en Mimos Navia?"*.

### 6.2 Estrategia de Rastreadores IA en `robots.txt`
Actualmente `public/robots.txt` trata por igual a todos los User-Agents de IA. Se aconseja distinguir dos tipologías:
1. **Rastreadores de Búsqueda y Grounding en Tiempo Real (Alineados con el Negocio - DEBEN PERMITIRSE):**
   - `OAI-SearchBot` (Búsqueda en tiempo real de ChatGPT).
   - `PerplexityBot` (Indexación del buscador Perplexity).
   - `Claude-SearchBot` (Búsqueda de Anthropic).
2. **Rastreadores de Entrenamiento Offline (Scraping Masivo para Modelos Base):**
   - `GPTBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`.
   - *Nota:* Si la empresa desea que su contenido sea citado en respuestas generativas pero no indexado masivamente para entrenar modelos sin atribución, conviene planificar esta distinción.

---

## 7. AUDITORÍA CRO (CONVERSION RATE OPTIMIZATION)

### 7.1 Embudos de Conversión Móvil y Puntos de Fuga
- **WhatsApp Flotante:** Excelente implementación con número directo (`+34 669 26 21 02`) y mensaje preconfigurado contextual.
- **Llamadas Rápidas (Click-to-Call):** Los números de teléfono están formateados como enlaces accesibles `tel:+34...`.
- **Formulario de Recogida a Domicilio:**
  - El formulario en `HomeHeroSection.tsx` y en páginas de servicio solicita datos claros (nombre, teléfono, dirección, tipo de servicio).
  - **Fricción detectada:** En resoluciones móviles (< 375px), el bloque del formulario compite visualmente con el botón de llamada directa y los selectores de tiendas.
  - **Ausencia de feedback en servidor:** Al no existir un backend conectado en el entorno de desarrollo, el envío simula éxito o depende de mailto. En producción requerirá un webhook o endpoint API seguro con confirmación inmediata por WhatsApp o SMS.

---

## 8. AUDITORÍA DE RENDIMIENTO Y ACCESIBILIDAD

### 8.1 Rendimiento y Pesos de Imágenes (Hallazgo Crítico)
Se ha llevado a cabo un análisis exhaustivo del directorio `public/` y subdirectorios de imágenes. Se han detectado activos con pesos desorbitados que penalizan directamente el Core Web Vitals **LCP** en conexiones 4G/móviles:

| Archivo de Imagen | Formato | Peso Actual | Peso Objetivo (WebP/AVIF comprimido) | Reducción Estimada |
| :--- | :--- | :--- | :--- | :--- |
| `public/images/puntadas-no-aire/fachadaGondomar2.jpg` | JPG | **978 KB** | ~45 KB | -95% |
| `public/alfombras-mimos.webp` | WebP | **949 KB** | ~75 KB | -92% |
| `public/images/puntadas-no-aire/fachadaGondomar1.jpg` | JPG | **879 KB** | ~50 KB | -94% |
| `public/images/puntadas-no-aire/tallerGondomar1.jpg` | JPG | **878 KB** | ~60 KB | -93% |
| `public/osito-mimos.jpg` | JPG | **847 KB** | ~40 KB | -95% |
| `public/images/puntadas-no-aire/tallerGondomar3.jpg` | JPG | **844 KB** | ~55 KB | -93% |
| `public/images/puntadas-no-aire/tallerGondomar2.jpg` | JPG | **769 KB** | ~50 KB | -93% |
| `public/limpieza-trajes-vigo.webp` | WebP | **691 KB** | ~55 KB | -92% |
| `public/lavanderia-industrial-vigo.webp` | WebP | **689 KB** | ~60 KB | -91% |
| `public/desinfeccion-ozono-vigo.webp` | WebP | **685 KB** | ~55 KB | -92% |
| `public/tintoreria-vigo.webp` | WebP | **676 KB** | ~50 KB | -92% |
| `public/colada-semanal-vigo.webp` | WebP | **669 KB** | ~50 KB | -92% |
| `public/planchado-profesional-vigo.webp` | WebP | **658 KB** | ~50 KB | -92% |
| `public/servicio-domicilio-vigo.webp` | WebP | **653 KB** | ~55 KB | -92% |
| `public/edredones-mantas-vigo.webp` | WebP | **648 KB** | ~55 KB | -92% |
| `public/vestidos-fiesta-vigo.webp` | WebP | **635 KB** | ~50 KB | -92% |
| `public/limpieza-cortinas-vigo.webp` | WebP | **608 KB** | ~50 KB | -92% |

**Duplicidad de Archivos Detectada:**
- `public/secadora-domus-dtt2-18e.jpg` y `public/SecadoraNueva.jpg` son exactamente el mismo archivo binario duplicado (217 KB cada uno).

### 8.2 Accesibilidad (WCAG 2.2 Nivel AA)
- **Avances consolidados en Fase 5.2A:**
  - Implementación del skip-link `#main-content` con `tabIndex="-1"`.
  - Corrección de `aria-labelledby` en modales de puntos colaboradores (`modal-title-telas-mas`, `modal-title-gondomar`).
  - Navegación por teclado en submenú Servicios con soporte de Escape y foco cíclico.
- **Puntos pendientes de verificación en navegador real:**
  - Ratio de contraste de textos grises claros (`text-slate-400` / `text-gray-500`) sobre fondos blancos en pie de página y etiquetas de aviso.
  - Comprobación de lector de pantalla (NVDA / VoiceOver) para asegurar que el contenido dentro de `<noscript id="aeo-static-summary">` no genera lectura redundante o ruido cuando JavaScript está activado en el navegador del usuario.

---

## 9. TABLA DE PROBLEMAS CONFIRMADOS (EVIDENCIAS DE CÓDIGO)

| ID | Gravedad | Archivo y Línea | Descripción del Problema | Consecuencia | Solución Técnica Propuesta | Método de Verificación |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ERR-01** | **ALTA** | `src/data/mimosData.ts`<br>L899 | Texto afirma: *"En las 3 tiendas ofrecemos el catálogo completo... y taller de costura y arreglos de ropa."* | Error comercial grave. Clientes van a Navia esperando modista in situ cuando no la hay. | Reescribir indicando que el taller in situ está en Gregorio Espino y Venezuela; Navia recibe y entrega. | Búsqueda textual y validación contra `commercialMasterData.ts`. |
| **ERR-02** | **ALTA** | `src/components/ClothingAlterationsPage.tsx`<br>L422 | Afirma: *"en nuestras 3 tiendas propias de Vigo y en puntos colaboradores con taller de costura."* | Confusión entre punto de recepción de prendas y taller propio. | Ajustar redacción especificando qué tiendas disponen de taller físico in situ. | Inspección visual y build estático. |
| **ERR-03** | **ALTA** | `src/data/routesSeoData.ts`<br>L64-65, L278 | Metadatos mencionan *"taller propio en Gregorio Espino"*, omitiendo el taller de Venezuela. | Inconsistencia con Fase 5.1 y pérdida de relevancia local para Venezuela en costura. | Sincronizar metadatos para mencionar ambos talleres propios (Gregorio Espino y Venezuela). | Verificación de meta tags en rutas de arreglos. |
| **ERR-04** | **ALTA** | `public/` (20+ imágenes) | Imágenes entre 600 KB y 978 KB servidas sin compresión moderna eficiente. | Arrastre masivo del tiempo de carga móvil (LCP > 4.5s en 4G). Penalización PageSpeed. | Procesar imágenes con Sharp a WebP/AVIF optimizados (80-85% calidad, max-width 1200px/800px). | Inspección de tamaño de ficheros (`ls -lh public/`). |
| **ERR-05** | **ALTA** | Servidor Producción (Plesk/LiteSpeed) | `https://tintoreriamimos.es/` responde 200 directo sin redirigir a `www.tintoreriamimos.es/`. | Contenido duplicado en Google, dilución de PageRank entre versión con www y sin www. | Configurar directiva 301 canónica en `.htaccess` de LiteSpeed. | Ejecutar `curl -I https://tintoreriamimos.es/` y verificar respuesta 301 a `https://www.tintoreriamimos.es/`. |
| **ERR-06** | **MEDIA** | `src/data/mimosData.ts` vs `src/data/commercialMasterData.ts` | Duplicidad masiva de definiciones de servicios, tarifas y puntos (2097 líneas frente a 774 líneas). | Riesgo permanente de desincronización de precios y horarios al actualizar una sola fuente. | Refactorizar `mimosData.ts` para que consuma directamente los objetos de `commercialMasterData.ts`. | Análisis de dependencias internas y comprobación de importaciones. |
| **ERR-07** | **MEDIA** | Múltiples componentes (`TextileCareSymbols.tsx` L427, `App.tsx` L422, etc.) | Cadenas de texto codificadas a fuego con *"nuestros 5 puntos colaboradores"*. | Si la red de colaboradores cambia a 4 o 6, el texto quedará desfasado y falso. | Reemplazar strings fijos por interpolación dinámica `{PUNTOS_COLABORADORES.length}`. | Grep de `5 puntos colaboradores` en `src/`. |
| **ERR-08** | **MEDIA** | `public/secadora-domus-dtt2-18e.jpg` | Duplicado exacto byte a byte de `public/SecadoraNueva.jpg` (217 KB). | Desperdicio de espacio en disco y confusión de nombres en templates. | Unificar referencias a una sola imagen optimizada y eliminar el duplicado. | Suma de verificación MD5/SHA256 idéntica. |
| **ERR-09** | **BAJA** | `public/robots.txt` | Rastreadores de scraping masivo de IA autorizados de forma idéntica a buscadores conversacionales. | Scraping descontrolado de contenidos sin atribución de tráfico o branding. | Separar bots de grounding (SearchBots) de bots de entrenamiento bruto. | Inspección de sintaxis de `robots.txt`. |

---

## 10. RIESGOS POTENCIALES

1. **Riesgo de Despliegue en Caliente sobre Plesk:**  
   El hosting actual ejecuta Joomla sobre LiteSpeed con directivas de caché muy agresivas en el servidor (`expires: 2005`, cookies de sesión PHPSESSID). Si el build de Vite se despliega en la carpeta `httpdocs/` sin limpiar previamente las sesiones de Joomla o sin configurar adecuadamente el archivo `.htaccess` de LiteSpeed, los usuarios experimentarán errores 404 o mezclas de caché estática.
2. **Riesgo de Pérdida de Indexación por Canibalización Local:**  
   Vigo es el núcleo principal del negocio. Si las páginas `/`, `/tintoreria-vigo`, `/lavanderia-vigo` y `/zonas/vigo` compiten por la misma palabra clave genérica, los algoritmos de Google alternarán entre ellas en los resultados de búsqueda (SERP dance), perjudicando la posición consolidada.
3. **Riesgo de Sobrecarga de Atención al Cliente:**  
   Afirmar erróneamente que en la tienda de Navia hay taller de costura in situ genera frustración física en clientes que se desplazan buscando arreglos urgentes o pruebas de vestuario, afectando a las reseñas de Google Maps.

---

## 11. MEJORAS RECOMENDADAS

1. **Optimización Automatizada de Activos Multimedia:**  
   Crear un script de optimización de imágenes (ej. utilizando `sharp`) para reducir los ~20 MB actuales de imágenes a menos de ~2 MB totales, convirtiendo a WebP/AVIF responsivos.
2. **Unificación de la Fuente Canónica de Datos:**  
   Hacer que `src/data/commercialMasterData.ts` sea la **ÚNICA** fuente de verdad admitida en todo el frontend. Todos los textos, precios, teléfonos, direcciones y atributos de talleres deben importarse directamente de este fichero.
3. **Configuración Integral de `.htaccess` para LiteSpeed:**  
   Asegurar que el archivo `.htaccess` contenga:
   - Forzado de HTTPS y forzado canónico a `https://www.tintoreriamimos.es/`.
   - Cabeceras de seguridad modernas (`Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`).
   - Caché inmutable para `/assets/*` (`max-age=31536000, immutable`).
   - Caché con revalidación para HTML prerenderizado (`no-cache, must-revalidate`).
4. **Especialización Semántica de Landings de Servicio:**  
   Diferenciar claramente la intención de búsqueda de cada URL:
   - `/`: Portada institucional, propuesta de valor, acceso multitienda y puntos.
   - `/tintoreria-vigo`: Tintorería en seco, trajes, vestidos de ceremonia, alta costura.
   - `/lavanderia-vigo`: Colada por kilos, lavandería industrial, hostelería, empresas.
   - `/textiles-hogar-vigo`: Edredones, mantas, cortinas, colchas.
   - `/limpieza-alfombras-vigo`: Servicio especializado de alfombras con recogida.
   - `/arreglos-costura-ropa-vigo`: Enfatizar los dos talleres físicos propios (Gregorio Espino y Venezuela) y el servicio de recepción en Navia.

---

## 12. PLAN DE ACCIÓN Y CORRECCIONES PRIORIZADO

### FASE P0 — INMEDIATA (Impacto Crítico / Corrección Obligatoria)
- **P0.1:** Corregir en `src/data/mimosData.ts` (L899) y `ClothingAlterationsPage.tsx` (L422) la afirmación falsa de taller de costura propio en las 3 tiendas. Dejar claro que el taller in situ está en Gregorio Espino y Venezuela; Navia es punto de entrega y recepción.
- **P0.2:** Actualizar `src/data/routesSeoData.ts` (L64-65, L278) para incluir a Venezuela junto a Gregorio Espino como tiendas con taller propio de costura.
- **P0.3:** Preparar directivas `.htaccess` para LiteSpeed que solucionen la redirección canónica 301 desde `https://tintoreriamimos.es/` hacia `https://www.tintoreriamimos.es/`.

### FASE P1 — ALTA PRIORIDAD (Rendimiento Web y Tráfico)
- **P1.1:** Optimizar el catálogo de más de 20 imágenes pesadas en `public/` (reducción de 978 KB -> ~50 KB por imagen) para solventar el LCP móvil.
- **P1.2:** Eliminar la imagen duplicada `public/secadora-domus-dtt2-18e.jpg` unificando la referencia a `SecadoraNueva.jpg`.
- **P1.3:** Reemplazar textos estáticos fijos de *"5 puntos colaboradores"* por variables dinámicas `{PUNTOS_COLABORADORES.length}`.

### FASE P2 — MEDIA PRIORIDAD (Arquitectura y Coherencia SEO)
- **P2.1:** Refactorizar `mimosData.ts` para que herede directamente de `commercialMasterData.ts`, suprimiendo los bloques duplicados de tarifas y zonas.
- **P2.2:** Regularizar el estatus de la página `/limpieza-pieles-cuero-vigo`: integrarla formalmente en `commercialMasterData.ts` o marcarla como especialidad artesanal vinculada a Gregorio Espino.
- **P2.3:** Ajustar `public/robots.txt` para diferenciar rastreadores de búsqueda conversacional de los rastreadores de scraping de entrenamiento masivo.

### FASE P3 — BAJA PRIORIDAD / MANTENIMIENTO
- **P3.1:** Pruebas de contraste WCAG 2.2 AA en navegadores reales (Chrome, Firefox, Safari) y validación de lector de pantalla sobre el bloque `noscript#aeo-static-summary`.
- **P3.2:** Comprobación final y verificación en producción de anclas hash (`/#servicios`) una vez desplegado el nuevo build en el hosting Plesk.

---

*Fin del Informe de Auditoría Inicial — Documento preparado para revisión del cliente.*
