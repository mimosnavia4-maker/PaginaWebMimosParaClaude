# Tintorería Mimos Navia S.L. — Web Corporativa y Comercial

Sitio web oficial de **Tintorería Mimos Navia S.L.** (Vigo, Pontevedra).  
Producción: [https://www.tintoreriamimos.es/](https://www.tintoreriamimos.es/)

---

## 1. Tecnologías y Requisitos

* **Framework:** React `^19.0.1` (`react` / `react-dom` `^19.0.1`, con tipados `@types/react` `^19.3.0` y `@types/react-dom` `^19.3.0`). SPA con prerenderizado estático AEO de 34 rutas.
* **Lenguaje:** TypeScript `^7.0.2`.
* **Empaquetador y Bundler:** Vite `^8.3.0` (con plugin `@vitejs/plugin-react` `^6.1.1`).
* **Estilos:** Tailwind CSS `^4.3.3` (con integración `@tailwindcss/vite` `^4.3.3`).
* **Servidor de desarrollo y preview:** Node.js + Express `^4.21.2` (con `@types/express` `^4.17.21`) ejecutado con `tsx` `^4.21.0` (`server.ts`).
* **Iconografía:** Lucide React `^0.546.0`.
* **Mapas:** `@vis.gl/react-google-maps` `^1.10.1` (con `@types/google.maps` `^3.66.6`).

### Requisito de Entorno
* **Node.js:** Versión 22 o superior (`>= 22.0.0`, tipado en devDependencies con `@types/node` `^22.14.0`).
* **npm:** Versión 10 o superior (gestor predeterminado en Node.js 22).

---

## 2. Instalación y Variables de Entorno

### Instalación de dependencias
```bash
npm install
# o en entornos de integración continua:
npm ci
```

### Variables de Entorno Reales
El proyecto **únicamente utiliza una variable de entorno**:

* `VITE_GOOGLE_MAPS_API_KEY`: Clave de API de Google Maps Platform utilizada exclusivamente en el componente interactivo de mapas (`src/components/MimosGoogleMap.tsx`).

> **Importante:** Al ser una variable con prefijo `VITE_`, Vite la incrusta directamente en el código JavaScript compilado durante la ejecución de `npm run build`. Por lo tanto, el archivo `.env` con la variable configurada **debe estar presente antes de ejecutar la compilación de producción**.

Ejemplo en `.env` (ver `.env.example`):
```env
VITE_GOOGLE_MAPS_API_KEY="AIzaSy..."
```

*(Nota: Este proyecto no utiliza claves de inteligencia artificial ni `GEMINI_API_KEY`; se trata de una aplicación web comercial y estática).*

---

## 3. Comandos de la Aplicación

Los scripts disponibles en `package.json` son exactamente:

* `npm run dev`: Inicia el servidor de desarrollo en el puerto 3000 mediante `tsx server.ts` con middlewares de Vite montados.
* `npm run build`: Ejecuta en secuencia:
  1. `tsc --noEmit`: comprobación estricta de tipos TypeScript (se detiene de inmediato si existe cualquier error).
  2. `vite build`: compilación y empaquetado de producción en `dist/`.
  3. `tsx scripts/prerender-routes.ts`: prerenderizado estático de las 34 rutas comerciales en archivos HTML independientes (`dist/*/index.html`) con metadatos SEO y generación de `dist/sitemap.xml`.
* `npm start`: Inicia el servidor Node.js en producción mediante `node server.ts`.
* `npm run preview`: Previsualiza localmente el contenido generado en `dist/` mediante `vite preview`.
* `npm run clean`: Limpia los artefactos generados ejecutando `rm -rf dist server.js`.
* `npm run lint`: Ejecuta el análisis estático de tipos TypeScript sin emitir archivos (`tsc --noEmit`).

---

## 4. Despliegue y Publicación en Hosting (Apache / Plesk)

La web se publica como un conjunto de archivos estáticos optimizados en un servidor Apache bajo panel Plesk (ProfesionalHosting).

### Procedimiento de despliegue:
1. **Compilar el proyecto localmente:**
   ```bash
   npm run build
   ```
2. **Copia de seguridad previa:**
   Antes de subir nuevos archivos al servidor, realizar una copia de seguridad completa del contenido existente en la carpeta raíz del hosting (`httpdocs/`).
3. **Subida de archivos:**
   Subir el **CONTENIDO interior de la carpeta `dist/`** directamente a `httpdocs/`.
   * **Atención al archivo oculto:** Asegurarse de subir el archivo `.htaccess` (situado en `dist/.htaccess`), ya que gestiona las directivas de enrutamiento estático de Apache, compresión, políticas de caché y cabeceras de seguridad.
4. **Comprobación tras la subida:**
   * Navegar por las rutas principales y verificar que cargan el contenido estático correspondiente.
   * Probar una ruta inexistente (ej. `/ruta-que-no-existe`) para confirmar la respuesta de página no encontrada.

> **Aviso técnico:** La verificación real de los códigos de estado HTTP del servidor (como respuestas `404 Not Found` nativas de Apache o redirecciones `301`) solo puede comprobarse directamente sobre el servidor de hosting en producción; no debe darse por comprobada en el entorno local.

---

## 5. Dónde Residen los Datos del Proyecto

El proyecto centraliza sus fuentes de datos en dos archivos maestros:

1. **Datos comerciales de tiendas y puntos:**
   * **Archivo:** `src/data/commercialMasterData.ts`
   * Contiene los registros de las 3 tiendas propias y los 5 puntos colaboradores independientes: nombres, direcciones exactas, teléfonos, horarios semanales, servicios confirmados, si disponen de taller propio de costura in situ y rutas de fotografías locales.
2. **Metadatos SEO por ruta:**
   * **Archivo:** `src/data/routesSeoData.ts`
   * Contiene la configuración de cada una de las 34 rutas indexables: título SEO (`<title>`), meta description, URL canónica, directivas robots (`index, follow`), encabezado `H1`, migas de pan y área geográfica de servicio.

### Cómo añadir una página nueva al proyecto:
1. Crear el componente React de la página en `src/components/`.
2. Registrar la nueva ruta y sus metadatos SEO en `src/data/routesSeoData.ts`.
3. Añadir la ruta a la navegación en `src/App.tsx`.
4. Si la página requiere datos de un nuevo establecimiento colaborador, añadir el registro en `src/data/commercialMasterData.ts`.
5. Ejecutar `npm run build` para que `scripts/prerender-routes.ts` genere automáticamente el nuevo archivo estático `dist/<ruta>/index.html` y actualice `dist/sitemap.xml`.

*(Nota histórica: El archivo antiguo `puntos.json` ya no existe ni forma parte del proyecto; toda la información se gestiona en `commercialMasterData.ts`).*

---

## 6. Reglas Fundamentales del Proyecto

* **Fidelidad comercial absoluta:** No inventar horarios, teléfonos, precios ni características de servicio. Los datos deben reflejar la operativa real de Tintorería Mimos.
* **Distinción de establecimientos:**
  * **Tiendas propias (exactamente 3):** Navia (Teixugueiras 11), Gregorio Espino (Alcalde Gregorio Espino 44) y Venezuela (C/ Venezuela 41).
  * **Talleres in situ:** Gregorio Espino y Venezuela disponen de taller propio de costura y modistería en sus instalaciones. Navia es tienda propia y punto de recepción/entrega de arreglos (no dispone de modista in situ).
  * **Puntos colaboradores independientes:** Redondela, Puntadas No Aire (Gondomar), Arregla2 (Ponteareas), Telas y Más (O Porriño) y D'Passo (As Travesas, Vigo). Son negocios colaboradores independientes para recepción y entrega, nunca sucursales propias de Mimos.
* **Analítica y privacidad:** No modificar el identificador de GA4 (`G-17E0NSEG5Q`) ni los eventos de analítica sin autorización expresa. Mantener el bloqueo por defecto de cookies hasta la aceptación del usuario según la normativa RGPD/AEPD.
