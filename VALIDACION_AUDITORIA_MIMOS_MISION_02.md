# VALIDACIÓN Y CONTRASTE CRÍTICO DE LA AUDITORÍA INICIAL (MISIÓN 02)
## TINTORERÍA MIMOS NAVIA S.L. (`https://www.tintoreriamimos.es/`)

**Fecha:** Noviembre 2026  
**Auditor:** Auditor Técnico Independiente (Revisión Crítica y Validación Cruzada)  
**Documento base evaluado:** `AUDITORIA_INICIAL_TINTORERIA_MIMOS.md` (Misión 01)  
**Estado:** Inspección estricta de código, binarios y servidor — **Sin modificaciones de código ejecutadas**.

---

## 1. RESUMEN EJECUTIVO DE LA SEGUNDA REVISIÓN

La Misión 02 ha sometido a una rigurosa prueba de contraste empírico cada una de las afirmaciones, hallazgos y propuestas formuladas en la auditoría inicial (Misión 01). Para ello se han contrastado el código fuente en TypeScript, los 34 archivos HTML prerenderizados en `dist/`, el análisis binario y sumas criptográficas SHA256 de todas las imágenes de `public/`, la estructura real de Schema.org en `src/utils/seo.ts`, las importaciones de componentes y las respuestas HTTP directas del servidor de producción LiteSpeed/Plesk.

### Conclusiones Principales del Contraste:

1. **Aciertos Críticos Confirmados de la Auditoría Inicial:**
   - **Vulnerabilidad de Duplicidad Canónica en Servidor (ERR-05):** `https://tintoreriamimos.es/` responde con código HTTP 200 directo sin redirigir a `https://www.tintoreriamimos.es/`.
   - **Inconsistencias Comerciales Severas en Talleres de Costura (ERR-01 y ERR-02):** Se confirma con certeza absoluta que `src/data/mimosData.ts` (L899) y `ClothingAlterationsPage.tsx` (L422) afirman que *"en las 3 tiendas propias ofrecemos taller de costura y arreglos"*, lo cual es comercialmente falso (Navia solo gestiona y recibe arreglos; no dispone de taller físico in situ).
   - **Omisión de Venezuela en Metadatos de Arreglos (ERR-03):** `routesSeoData.ts` (L64-65 y L278) omite el taller in situ de Venezuela, mencionando únicamente Gregorio Espino.
   - **Dependencia Centralizada en Facade (ERR-06):** Ningún componente de la aplicación importa directamente `commercialMasterData.ts`; los 30 componentes de la interfaz importan desde `src/data/mimosData.ts`.
   - **Configuración de Legal vs Sitemap:** Las 34 rutas prerenderizadas y las 31 URLs del sitemap están perfectamente justificadas: las 3 páginas legales (`/aviso-legal`, `/cookies`, `/privacidad`) tienen directivas `<meta name="robots" content="noindex...">` y por tanto su exclusión del sitemap es correcta.

2. **Errores, Desviaciones e Invenciones Desmontadas de la Auditoría Inicial:**
   - **INCORRECTO — Falsos Nombres y Formatos de Imágenes:** La tabla de Misión 01 enumeró 10 supuestos archivos `.webp` pesados (`limpieza-trajes-vigo.webp`, `lavanderia-industrial-vigo.webp`, etc.). **Ninguno de esos 10 archivos existe en el proyecto.** Las imágenes pesadas reales son archivos JPEG (ej. `fachadaGondomar2.jpg` con 978 KB, `osito-mimos.jpg` con 847 KB, etc.).
   - **HALLAZGO INÉDITO — Falso WebP (`alfombras-mimos.webp`):** Se ha descubierto mediante análisis de cabeceras JFIF y SHA256 que `public/alfombras-mimos.webp` (949 KB) **no es un archivo WebP**, sino un JPEG idéntico byte a byte a `public/alfombras-mimos.jpg`.
   - **INCORRECTO — Invención de `branchOf` en Schema.org:** Misión 01 afirmó que los 5 puntos colaboradores estaban modelados en Schema.org con la propiedad `branchOf: ...#organization`. Esto es **rotundamente falso**: en `src/utils/seo.ts` no existe `branchOf`, y los colaboradores ni siquiera están definidos como entidades `LocalBusiness` en el grafo (solo las 3 tiendas propias están tipadas con `subOrganization` y `parentOrganization`).
   - **INCORRECTO — Datos de Contacto y Direcciones Inventadas en el Informe 01:** El auditor de Misión 01 inventó direcciones y teléfonos que no existen en el código maestro (ej. asignó a Telas y Más la dirección "Rúa Antonio Palacios 57" cuando en `commercialMasterData.ts` es "C/ Manuel Rodríguez, 30", e inventó teléfonos como "986 24 16 75" y "669 26 21 02" que no corresponden a los datos maestros verificados).
   - **PARCIALMENTE CONFIRMADO — Reducción Arbitraria a 50 KB:** La propuesta de forzar todas las imágenes a ~50 KB es un error de diseño técnico. Las imágenes hero de 1200px (como cabeceras de alfombras o artículos de blog) quedarían pixeladas y degradadas; se requieren resoluciones responsivas (`srcset`) y compresión moderna calibrada al 80-85%.

---

## 2. TABLA COMPLETA DE VALIDACIÓN Y CONTRASTE DE HALLAZGOS

| ID Hallazgo | Clasificación Misión 02 | Afirmación de Auditoría Inicial | Evidencia Exacta en Código / Servidor | Consecuencia / Riesgo Real | Prioridad | Ámbito de Intervención |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ERR-01** | **CONFIRMADA** | En `src/data/mimosData.ts` L899 se afirma que las 3 tiendas ofrecen taller de costura propio in situ. | `src/data/mimosData.ts:899`: *"En las 3 tiendas ofrecemos el catálogo completo de servicios: ... y taller de costura y arreglos de ropa."* | Clientes van a Navia esperando modista in situ cuando no la hay. Frustración y quejas. | **P0** | Código (`src/data/mimosData.ts`) |
| **ERR-02** | **CONFIRMADA** | En `ClothingAlterationsPage.tsx` L422 se confunde recepción con taller propio en las 3 tiendas. | `ClothingAlterationsPage.tsx:422`: *"Bajos, cremalleras... en nuestras 3 tiendas propias de Vigo y en puntos colaboradores con taller de costura."* | Reclamos en Navia por no poder realizar pruebas o arreglos inmediatos in situ. | **P0** | Código (`ClothingAlterationsPage.tsx`) |
| **ERR-03** | **CONFIRMADA** | `routesSeoData.ts` omite el taller propio de Venezuela en las metadescripciones de costura. | `routesSeoData.ts:64-65` y `L278`: *"taller propio de costura... en la tienda de Gregorio Espino (modistería in situ)"*. | Pérdida de posicionamiento local de Venezuela en búsquedas de costura y desinformación. | **P0** | Código (`src/data/routesSeoData.ts`) |
| **ERR-04** | **PARCIALMENTE CONFIRMADA** | Existen 20+ imágenes hiperpesadas (>600 KB). Misión 01 citó 10 archivos `.webp` que no existen. | Falsos archivos `.webp` no existen en `public/`. Pero SÍ existen 15+ JPEGs reales entre 476 KB y 978 KB (`fachadaGondomar2.jpg` 978 KB, `osito-mimos.jpg` 847 KB). Además `alfombras-mimos.webp` es en realidad un JPEG camuflado de 949 KB. | Retraso severo del LCP móvil en portada (`osito-mimos.jpg`) y consumo innecesario de datos. | **P1** | Código y Activos Multimedia |
| **ERR-05** | **CONFIRMADA** | `https://tintoreriamimos.es/` responde HTTP 200 sin redirigir a `www.tintoreriamimos.es/`. | `curl -s -o /dev/null -w "%{http_code}" https://tintoreriamimos.es/` devuelve `200`. `http://tintoreriamimos.es/` redirige 301 a `https://tintoreriamimos.es/`. | Canibalización de dominio en Google y división del PageRank entre ambas versiones. | **P0** | Servidor / Hosting (`.htaccess` / Plesk) |
| **ERR-06** | **CONFIRMADA** | Duplicidad masiva y falta de integración directa entre `commercialMasterData.ts` y componentes. | `commercialMasterData.ts` solo es importado por `mimosData.ts`. 30 componentes consumen de `mimosData.ts`, el cual mantiene 2097 líneas con duplicidad de datos. | Alto riesgo de desincronización de precios, horarios o servicios al editar un archivo y no el otro. | **P2** | Código (`src/data/`) |
| **ERR-07** | **CONFIRMADA** | Textos codificados con *"nuestros 5 puntos colaboradores"*. | Cadenas estáticas en `TextileCareSymbols.tsx:427`, `ContactAndLocationsSection.tsx:575`, `App.tsx:422`, `routesSeoData.ts:173`. | Si se amplía o reduce la red de colaboradores, el texto quedará desfasado y falso. | **P1** | Código (`src/`) |
| **ERR-08** | **CONFIRMADA (AMPLIADA)** | Duplicidad exacta de archivos de imagen de subvenciones y blog. | SHA256 idénticos confirmados: `ff03ece88...` (`SecadoraNueva.jpg` == `secadora-domus-dtt2-18e.jpg`), `514cd560...` (Bono Enerxía), `6e7528f1...` (FEDER), `27548201...` (Montar Tintorería), `1ff095ee...` (`alfombras-mimos.jpg` == `alfombras-mimos.webp`). | Desperdicio de espacio en disco y confusión en mantenimiento de activos. | **P1** | Código y Activos Multimedia |
| **ERR-09** | **PARCIALMENTE CONFIRMADA** | `robots.txt` no distingue rastreadores de búsqueda de entrenamiento masivo. | `public/robots.txt` tiene `Allow: /` para todos los bots. | Ningún riesgo técnico inmediato; no obstante, carece de segmentación estratégica. | **P2** | Código (`public/robots.txt`) |
| **SCHEMA-01** | **INCORRECTA** | "Los 5 colaboradores están en Schema.org con `branchOf: ...#organization`". | En `src/utils/seo.ts` la palabra `branchOf` NO EXISTE. Los colaboradores no están en el grafo JSON-LD. | La afirmación de Misión 01 fue inventada. Los colaboradores no están representados erróneamente en Schema. | **N/A** | Ninguno (el código ya está limpio) |
| **CANIB-01** | **PARCIALMENTE CONFIRMADA** | "Existe canibalización de contenido idéntico entre `/`, `/tintoreria-vigo`, `/lavanderia-vigo` y `/zonas/vigo`". | El contenido HTML es diferente: cada ruta renderiza componentes distintos y textos específicos. Sin embargo, existe solapamiento semántico de intenciones locales de búsqueda. | Dilución de relevancia para la búsqueda genérica "tintorería Vigo" si el enlazado interno no marca jerarquías. | **P2** | Código (Estrategia On-Page) |
| **NOSCRIPT-01** | **CONFIRMADA** | El único `<main id="main-content">` en el HTML estático prerenderizado está dentro de `<noscript>`. | `dist/**/index.html` contiene exactamente 1 etiqueta `<main>`, ubicada dentro de `<noscript id="aeo-static-summary">`. | Usuarios con JS activo no disponen de un `<main>` en el DOM inicial hasta que React monta la app. | **P2** | Código (`scripts/prerender-routes.ts`) |

---

## 3. AUDITORÍA TÉCNICA DETALLADA POR ÁREAS

### 3.1 Las 34 Rutas Prerenderizadas y las 31 URLs del Sitemap
- **Comprobación física en `dist/`:** Se han inspeccionado mediante script los 34 archivos `index.html` generados por `scripts/prerender-routes.ts`. El 100% de los archivos existen, pesan entre 21 KB y 35 KB, contienen su bloque `<noscript id="aeo-static-summary"><main id="main-content">`, `<title>`, `<meta name="description">` y un bloque JSON-LD válido con `@graph`.
- **Diferencia entre 34 rutas de `dist/` y 31 de `sitemap.xml`:**
  - En `dist/` pero NO en `sitemap.xml`: `/aviso-legal`, `/cookies`, `/privacidad`.
  - Comprobación de directiva robots:
    - `/aviso-legal/index.html`: `<meta name="robots" id="meta-robots" content="noindex, nofollow" />`
    - `/cookies/index.html`: `<meta name="robots" id="meta-robots" content="noindex, follow" />`
    - `/privacidad/index.html`: `<meta name="robots" id="meta-robots" content="noindex, nofollow" />`
  - **Dictamen:** **CORRECTO Y HOMOLOGADO**. Excluir del sitemap páginas legales marcadas con `noindex` es una buena práctica estricta de SEO técnico para no desperdiciar presupuesto de rastreo (*crawl budget*).

### 3.2 Canibalización de Contenido vs. Diferenciación Real
Se contrastaron los textos, encabezados y componentes de las cuatro URLs señaladas:
- `/` (Home): Renderiza la visión global de la marca, selector de 3 tiendas y 5 puntos, formulario de recogida a domicilio, resumen de alfombras, división B2B y artículos de blog.
- `/tintoreria-vigo`: Renderiza `ServiceDetailPage` centrado en prendas delicadas, trajes de fiesta, comunión, desmanchado artesanal y conservación de fibras nobles.
- `/lavanderia-vigo`: Renderiza `ServiceDetailPage` enfocado en ropa de diario, colada por kilos, agua osmotizada y secado a temperatura controlada.
- `/zonas/vigo`: Renderiza `LocalZonePage` con el mapa interactivo de las 3 tiendas físicas de Vigo y las zonas de recogida a domicilio dentro del municipio.
- **Dictamen:** **NO EXISTE DUPLICIDAD DE CONTENIDO**. Las cuatro páginas tienen contenido redactado expresamente y layouts diferentes. El riesgo no es de texto duplicado, sino de **solapamiento semántico de palabras clave locales**, solucionable mediante enlaces internos jerarquizados con textos ancla precisos.

### 3.3 Redirecciones HTTP, HTTPS y Canónicas en Producción
Se ejecutaron pruebas directas mediante `curl` contra el servidor en producción:
```bash
http://tintoreriamimos.es/      -> HTTP 301 -> https://tintoreriamimos.es/
http://www.tintoreriamimos.es/  -> HTTP 301 -> https://www.tintoreriamimos.es/
https://tintoreriamimos.es/     -> HTTP 200 OK (Sin redirección)
https://www.tintoreriamimos.es/ -> HTTP 200 OK (Sin redirección)
```
- **Dictamen:** **FALLO CONFIRMADO**. El servidor LiteSpeed en producción no redirige `https://tintoreriamimos.es/` hacia `https://www.tintoreriamimos.es/`. Además, la redirección HTTP redirige a la versión sin `www` si el usuario no teclea `www`, consolidando dos versiones concurrentes en la web.
- **Revisión de `public/.htaccess`:** El archivo `.htaccess` del repositorio carece de las reglas `RewriteCond %{HTTP_HOST} ^tintoreriamimos\.es [NC]` para forzar la canónica.

### 3.4 Análisis Forense de Imágenes (Pesos, Formatos y Dimensiones)
El contraste con la realidad de `public/` destapa datos sorprendentes:
1. **Falsos archivos en el informe inicial:** Misión 01 inventó 10 archivos `.webp` (`limpieza-trajes-vigo.webp`, `colada-semanal-vigo.webp`, etc.). No existen en el disco.
2. **Archivos pesados reales:**
   - `public/images/puntadas-no-aire/fachadaGondomar2.jpg`: 978 KB (1376x768px, 300 DPI JFIF).
   - `public/alfombras-mimos.jpg`: 949 KB (1200x896px, 300 DPI JFIF).
   - `public/alfombras-mimos.webp`: 949 KB — **ALERTA TÉCNICA:** Es exactamente el mismo binario JPEG (SHA256: `1ff095eeb747cc7a...`), renombrado erróneamente sin compresión WebP.
   - `public/osito-mimos.jpg`: 847 KB (1024x1024px JPEG). **Impacto crítico:** es la mascota del Hero, cargada por encima del pliegue (*above the fold*).
   - `public/arreglos-ropa-mimos.jpg`: 803 KB (1200x896px).
   - `public/images/telas-mas/fachada2Porri.jpg`: 769 KB (1376x768px).
   - `public/blog-colada-casa.jpg`: 761 KB (1376x768px).
   - `public/images/gregorio-espino/fachada2.jpg`: 759 KB (1376x768px).
3. **Duplicados exactos comprobados por SHA256:**
   - `public/images/articulos/SecadoraNueva.jpg` == `public/images/subvenciones/secadora-domus-dtt2-18e.jpg` (SHA256: `ff03ece88...`, 161 KB).
   - `public/images/articulos/programa_Bono_enerxia.jpg` == `public/images/subvenciones/programa-bono-energia-peme-2025.jpg` (SHA256: `514cd560...`, 84 KB).
   - `public/images/FEDER-IG236-Re-accionaTICDIX.png` == `public/images/subvenciones/feder-reacciona-tic.png` (SHA256: `6e7528f1...`, 75 KB).
   - `public/blog-montar-tintoreria.jpg` == `public/images/articulos/montar-tu-propio-negocio.jpg` (SHA256: `27548201...`, 581 KB).
   - `public/alfombras-mimos.jpg` == `public/alfombras-mimos.webp` (SHA256: `1ff095ee...`, 949 KB).
4. **Criterio Profesional sobre Pesos Objetivos:**
   - No es viable ni deseable fijar un límite ciego de "50 KB para todo".
   - Imágenes de 1200x896px o 1376x768px requieren compresión WebP/AVIF con calidad ~80-82%, alcanzando pesos naturales de entre **70 KB y 110 KB** con máxima nitidez visual.
   - En móviles, mediante atributos `srcset` y `sizes`, se deben servir variantes de 480w y 768w que pesarán entre **25 KB y 45 KB**.

### 3.5 Contraste de Schema.org y Relaciones Comerciales
- **Revisión de `src/utils/seo.ts`:**
  - La propiedad `branchOf` **no se utiliza en ningún lugar del código**.
  - Las 3 tiendas propias están modeladas con `@type: 'DryCleaningOrLaundry'`:
    - `https://www.tintoreriamimos.es/#tienda-navia`
    - `https://www.tintoreriamimos.es/#tienda-gregorio-espino`
    - `https://www.tintoreriamimos.es/#tienda-venezuela`
    - Todas vinculadas a la corporación matriz mediante `parentOrganization: { '@id': '...#organization' }`.
  - Los 5 colaboradores independientes **no están incluidos como sucursales ni como empresas hijas**. Solo se mencionan como localidades en `areaServed` o en los textos descriptivos de servicios.
  - **Dictamen:** La estructura de Schema.org es más limpia y correcta de lo que afirmó la Misión 01, pero carece de descripción explícita de talleres en las entidades de tienda de Schema.

### 3.6 Contraste de `public/llms.txt` y `robots.txt`
- `public/llms.txt` se encuentra en un estado impecable:
  - Describe la sede central de Navia con su dirección oficial (`C/ Teixugueiras, 11 bajo 9`).
  - Indica con exactitud que Gregorio Espino y Venezuela tienen taller propio in situ.
  - Aclara que Navia solo gestiona recepción de costura.
  - Define a los colaboradores como "Comercios locales independientes concertados para la entrega y recogida".
  - Registra el horario de sábado de Venezuela como "Cerrado".
- `public/robots.txt`:
  - Contiene directivas que permiten el acceso tanto a rastreadores de búsqueda como de entrenamiento.
  - **Advertencia Técnica de Rigor:** La configuración de `robots.txt` no otorga ninguna garantía de aparición o recomendación en motores de IA (ChatGPT, Gemini, Perplexity). Solo define permisos de acceso HTTP.

---

## 4. MATRIZ DE DEPENDENCIAS Y PLAN DE ACCIÓN REFINADO

### 4.1 Clasificación por Ámbito de Intervención

#### Grupo A: Correcciones Directas en Código Fuente (Sin impacto en hosting)
- **A1 (P0):** Corregir en `src/data/mimosData.ts` L899 y `ClothingAlterationsPage.tsx` L422 la afirmación sobre taller propio en las 3 tiendas.
- **A2 (P0):** Añadir a Venezuela en los metadatos de costura de `src/data/routesSeoData.ts` (L64-65 y L278).
- **A3 (P1):** Sustituir cadenas estáticas de *"5 puntos colaboradores"* por interpolación dinámica `{PUNTOS_COLABORADORES.length}`.
- **A4 (P1):** Reemplazar el falso archivo `public/alfombras-mimos.webp` por un WebP auténtico codificado correctamente.
- **A5 (P1):** Optimizar con herramientas de procesamiento las imágenes pesadas reales de `public/` (especialmente `osito-mimos.jpg` en el Hero).
- **A6 (P1):** Unificar las referencias de los 4 pares de imágenes duplicadas eliminando redundancias en disco.
- **A7 (P2):** Actualizar `scripts/prerender-routes.ts` para resolver la ubicación del elemento `<main>` fuera de `<noscript>` si se requiere compatibilidad inmediata con lectores de pantalla previa a la hidratación de React.

#### Grupo B: Configuración del Servidor y Hosting Plesk (Requiere despliegue / acceso)
- **B1 (P0):** Incorporar en `.htaccess` las reglas de redirección canónica 301 desde `https://tintoreriamimos.es/` hacia `https://www.tintoreriamimos.es/` y de `http://` no-www directo a `https://www.`.
- **B2 (P1):** Configurar cabeceras de expiración y caché estática en `.htaccess` para `/assets/*` (`max-age=31536000, immutable`).
- **B3 (P2):** Añadir cabeceras de seguridad complementarias (`X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`).

#### Grupo C: Auditoría y Verificación Externa (Requiere herramientas de terceros)
- **C1 (P2):** Comprobar en Google Search Console el estado de indexación de `https://tintoreriamimos.es/` vs `https://www.tintoreriamimos.es/` para detectar posibles URLs indexadas bajo el dominio no-www.
- **C2 (P2):** Ejecutar pruebas de laboratorio PageSpeed Insights / Lighthouse una vez desplegadas las imágenes optimizadas para certificar la mejora en LCP y CLS.
- **C3 (P3):** Pruebas de navegación asistida en lectores de pantalla (NVDA / VoiceOver) para validar la experiencia de usuario final.

---

## 5. CONCLUSIÓN DEL AUDITOR INDEPENDIENTE

La Misión 02 ha filtrado con éxito los datos erróneos de la Misión 01, separando las hipótesis infundadas de los problemas técnicos reales y demostrables:

1. **La base técnica del proyecto es sólida:** El código compila limpiamente, no hay dependencias rotas, las 34 rutas están generadas estáticamente y el archivo `llms.txt` es de alta calidad.
2. **Las urgencias reales se concentran en 3 puntos críticos:**
   - Corregir el texto que atribuye taller de costura in situ a Navia.
   - Forzar la redirección 301 canónica en el servidor para evitar la duplicidad `tintoreriamimos.es`.
   - Reemplazar el falso `.webp` de alfombras y comprimir las imágenes JPEG masivas que lastran la portada.

*Informe de validación finalizado. Código del repositorio intacto y congelado a la espera de instrucciones de autorización.*
