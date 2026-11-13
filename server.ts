import express from 'express';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = Number(process.env.PORT) || 3000;

  // Redirecciones 301 hacia las URLs canónicas oficiales
  app.use((req, res, next) => {
    const cleanPath = req.path;
    if (
      cleanPath === '/servicios/alfombras-pieles' ||
      cleanPath === '/servicios/alfombras-pieles/' ||
      cleanPath === '/alfombras-vigo' ||
      cleanPath === '/alfombras-vigo/' ||
      cleanPath === '/servicios/limpieza-de-alfombras.html' ||
      cleanPath === '/servicios/limpieza-de-alfombras' ||
      cleanPath === '/servicios/reparacion-de-alfombras.html' ||
      cleanPath === '/servicios/reparacion-de-alfombras'
    ) {
      return res.redirect(301, '/limpieza-alfombras-vigo');
    }
    if (
      cleanPath === '/servicios/limpieza-de-pieles-y-cuero.html' ||
      cleanPath === '/servicios/limpieza-de-pieles-y-cuero' ||
      cleanPath === '/servicios/limpieza-de-pieles-y-cuero/' ||
      cleanPath === '/pieles-y-cuero-vigo' ||
      cleanPath === '/pieles-y-cuero-vigo/'
    ) {
      return res.redirect(301, '/limpieza-pieles-cuero-vigo');
    }
    if (
      cleanPath === '/arreglos-de-ropa-vigo/' ||
      cleanPath === '/costura-y-arreglos' ||
      cleanPath === '/costura-y-arreglos/' ||
      cleanPath === '/servicios/costura-arreglos' ||
      cleanPath === '/servicios/costura-arreglos/' ||
      cleanPath === '/costura-arreglos-vigo' ||
      cleanPath === '/costura-arreglos-vigo/' ||
      cleanPath === '/arreglos-ropa-vigo' ||
      cleanPath === '/arreglos-ropa-vigo/'
    ) {
      return res.redirect(301, '/arreglos-de-ropa-vigo');
    }
    if (
      cleanPath === '/empleo' ||
      cleanPath === '/empleo/' ||
      cleanPath === '/unete-a-nosotros' ||
      cleanPath === '/unete-a-nosotros/' ||
      cleanPath === '/empleo-unete-a-nosotros.html'
    ) {
      return res.redirect(301, '/empleo-unete-a-nosotros');
    }
    if (cleanPath === '/feder.html') {
      return res.redirect(301, '/feder');
    }
    if (cleanPath === '/programa-bono-energia-peme-2025-in417z.html') {
      return res.redirect(301, '/programa-bono-energia-peme-2025-in417z');
    }
    if (
      cleanPath === '/punto-telas-mas-porrino' ||
      cleanPath === '/punto-telas-mas-porrino/' ||
      cleanPath === '/punto/telas-mas' ||
      cleanPath === '/punto/telas-mas/' ||
      cleanPath === '/ficha/telas-mas' ||
      cleanPath === '/ficha/telas-mas/'
    ) {
      return res.redirect(301, '/zonas/o-porrino');
    }
    if (
      cleanPath === '/punto-puntadas-no-aire-gondomar' ||
      cleanPath === '/punto-puntadas-no-aire-gondomar/' ||
      cleanPath === '/punto/puntadas-no-aire' ||
      cleanPath === '/punto/puntadas-no-aire/' ||
      cleanPath === '/ficha/puntadas-no-aire' ||
      cleanPath === '/ficha/puntadas-no-aire/'
    ) {
      return res.redirect(301, '/zonas/gondomar');
    }
    if (
      cleanPath === '/tienda/gregorio-espino' ||
      cleanPath === '/tienda/gregorio-espino/' ||
      cleanPath === '/tienda-gregorio-espino' ||
      cleanPath === '/tienda-gregorio-espino/'
    ) {
      return res.redirect(301, '/tienda-mimos-gregorio-espino-vigo');
    }
    if (
      cleanPath === '/tienda/navia' ||
      cleanPath === '/tienda/navia/' ||
      cleanPath === '/tienda-navia' ||
      cleanPath === '/tienda-navia/' ||
      cleanPath === '/central-navia' ||
      cleanPath === '/central-navia/'
    ) {
      return res.redirect(301, '/tienda-mimos-navia-vigo');
    }
    if (
      cleanPath === '/blog/9-blog/26-la-colada-en-casa.html' ||
      cleanPath === '/blog/9-blog/26-la-colada-en-casa'
    ) {
      return res.redirect(301, '/blog/la-colada-en-casa');
    }
    if (
      cleanPath === '/blog/9-blog/22-montar-tu-propia-tintoreria-lavanderia.html' ||
      cleanPath === '/blog/9-blog/22-montar-tu-propia-tintoreria-lavanderia'
    ) {
      return res.redirect(301, '/blog/montar-tu-propia-tintoreria-lavanderia');
    }
    if (
      (req.method === 'GET' || req.method === 'HEAD') &&
      cleanPath.length > 1 &&
      cleanPath.endsWith('/') &&
      !cleanPath.startsWith('/assets/') &&
      !cleanPath.startsWith('/api/')
    ) {
      const target = cleanPath.replace(/\/+$/, '');
      const queryIndex = req.originalUrl.indexOf('?');
      const querySuffix = queryIndex !== -1 ? req.originalUrl.slice(queryIndex) : '';
      return res.redirect(301, `${target}${querySuffix}`);
    }
    next();
  });

  const distPath = path.join(process.cwd(), 'dist');
  const isProduction = process.env.NODE_ENV === 'production' || fs.existsSync(distPath);

  if (isProduction && fs.existsSync(distPath)) {
    // 1. Servir activos estáticos (.js, .css, .jpg, .webp, .svg, etc.)
    app.use(express.static(distPath, { index: false }));

    // 2. Servir rutas pre-renderizadas HTML
    app.use((req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        return next();
      }

      const rawPath = req.path || '/';
      const cleanPath = rawPath.replace(/\/+$/, '') || '/';

      // Ruta raíz
      if (cleanPath === '/') {
        const rootHtml = path.join(distPath, 'index.html');
        if (fs.existsSync(rootHtml)) {
          return res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).sendFile(rootHtml);
        }
      }

      // Archivo pre-renderizado específico: dist/<ruta>/index.html
      const subIndexHtml = path.join(distPath, cleanPath.slice(1), 'index.html');
      if (fs.existsSync(subIndexHtml)) {
        return res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).sendFile(subIndexHtml);
      }

      // Archivo HTML directo: dist/<ruta>.html
      const directHtml = path.join(distPath, `${cleanPath.slice(1)}.html`);
      if (fs.existsSync(directHtml)) {
        return res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).sendFile(directHtml);
      }

      // Si no existe pero es una petición HTML de navegación, fallback a 404 o index.html
      const fallback404 = path.join(distPath, '404.html');
      if (fs.existsSync(fallback404)) {
        return res.status(404).set({ 'Content-Type': 'text/html; charset=utf-8' }).sendFile(fallback404);
      }

      const rootFallback = path.join(distPath, 'index.html');
      return res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).sendFile(rootFallback);
    });
  } else {
    // Modo desarrollo con Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: { server },
      },
      appType: 'custom',
    });

    app.use(vite.middlewares);

    app.use(async (req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        return next();
      }
      const url = req.originalUrl;
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html; charset=utf-8' }).end(template);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Tintorería Mimos Navia server listening on port ${PORT}`);
  });
}

startServer();
