# Guía de Despliegue en Plesk (ProfesionalHosting) y Google Maps en Producción

## 1. Modos de ejecución en Plesk (Apache vs Nginx)

### Escenario A · Nginx en "Modo proxy" hacia Apache (Recomendado)
- En Plesk (`Configuración de Apache y Nginx`), mantén **Modo proxy** activado y desactiva **Servir archivos estáticos directamente por Nginx** si quieres que todo pase por `public/.htaccess` (incluido en `dist/.htaccess`).
- `dist/.htaccess` ya gestiona:
  - Todas las redirecciones `301` canónicas (incluido `/servicios/limpieza-a-domicilio -> /limpieza-casas-vigo`).
  - Eliminación de barra final y conservación de `?utm_*` / `?gclid`.
  - Servicio directo de carpetas pre-renderizadas (`dist/<ruta>/index.html`) y `ErrorDocument 404 /404.html`.
  - Cabeceras de seguridad (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`).

### Escenario B · Nginx sirviendo estáticos directamente (sin pasar por Apache)
- Nginx **no lee `.htaccess`**.
- Copia el contenido de `deploy/plesk-nginx-directives.conf` dentro de **Directivas adicionales de Nginx** en Plesk.
- Ese archivo incluye las mismas redirecciones `301`, `try_files $uri $uri/index.html =404;`, `error_page 404 /404.html`, caché inmutable para `/assets/` y cabeceras de seguridad en todos los bloques `location`.

## 2. Redirección canónica HTTPS + www y HSTS
- En Plesk (`Configuración de hosting`), activa **Redirección permanente 301 de HTTP a HTTPS** y fija el dominio preferido `www.tintoreriamimos.es` (no se fuerza en `.htaccess` para evitar bucles con Let's Encrypt).
- Una vez verificado con `curl -I` que `https://www.tintoreriamimos.es/` responde correctamente sin errores de certificado, puedes descomentar la línea `Strict-Transport-Security` (HSTS) en `.htaccess` o en `deploy/plesk-nginx-directives.conf`.

## 3. Credenciales reales obligatorias para Google Maps antes del build final
Antes de ejecutar `npm run build` para subir `dist/` a producción, define en un archivo `.env` local (nunca subir `.env` al servidor ni a Git):

- `VITE_GOOGLE_MAPS_API_KEY`: API key de Google Cloud Platform con **Maps JavaScript API** habilitada y restricción por HTTP referrer:
  - `https://www.tintoreriamimos.es/*`
  - `https://tintoreriamimos.es/*`
- `VITE_GOOGLE_MAPS_MAP_ID`: ID de mapa creado en Google Cloud Console (*Google Maps Platform > Map Management*). Necesario para los marcadores avanzados (`AdvancedMarker`) con el logotipo de Mimos. (Si falta temporalmente, el mapa usa marcadores clásicos sin `DEMO_MAP_ID`, pero para producción debe configurarse el `Map ID` real).
