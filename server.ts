import express from 'express';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LEGACY_REDIRECT_MAP } from './src/data/redirectsData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = Number(process.env.PORT) || 3000;

  // Redirecciones 301 hacia las URLs canónicas oficiales (fuente única: redirectsData.ts)
  app.use((req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      return next();
    }

    const cleanPath = req.path || '/';
    if (cleanPath.startsWith('/assets/') || cleanPath.startsWith('/api/')) {
      return next();
    }

    const normalized =
      cleanPath.length > 1 ? cleanPath.replace(/\/+$/, '') : '/';
    const queryIndex = req.originalUrl.indexOf('?');
    const querySuffix =
      queryIndex !== -1 ? req.originalUrl.slice(queryIndex) : '';

    const redirectTarget = LEGACY_REDIRECT_MAP[normalized];
    if (redirectTarget) {
      return res.redirect(301, `${redirectTarget}${querySuffix}`);
    }

    if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
      return res.redirect(301, `${normalized}${querySuffix}`);
    }

    next();
  });

  const distPath = path.join(process.cwd(), 'dist');
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    (process.env.NODE_ENV !== 'development' && fs.existsSync(distPath));

  if (isProduction && fs.existsSync(distPath)) {
    // 1. Servir activos estáticos (.js, .css, .jpg, .webp, .svg, etc.) sin redirigir directorios pre-renderizados
    app.use(express.static(distPath, { index: false, redirect: false }));

    // 2. Evitar devolver HTML (404.html) ante módulos JS/CSS o activos estáticos inexistentes
    app.use((req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        return next();
      }

      const rawPath = req.path || '/';
      if (
        rawPath.startsWith('/assets/') ||
        /\.(js|mjs|css|map|webp|jpg|jpeg|png|gif|svg|ico|woff2?|ttf|json|txt|xml)$/i.test(rawPath)
      ) {
        return res.status(404).type('text/plain').send('Not found');
      }

      const cleanPath = rawPath.replace(/\/+$/, '') || '/';
      const htmlHeaders = {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache',
      };

      // Ruta raíz
      if (cleanPath === '/') {
        const rootHtml = path.join(distPath, 'index.html');
        if (fs.existsSync(rootHtml)) {
          return res.status(200).set(htmlHeaders).sendFile(rootHtml);
        }
      }

      // Archivo pre-renderizado específico: dist/<ruta>/index.html
      const subIndexHtml = path.join(distPath, cleanPath.slice(1), 'index.html');
      if (fs.existsSync(subIndexHtml)) {
        return res.status(200).set(htmlHeaders).sendFile(subIndexHtml);
      }

      // Archivo HTML directo: dist/<ruta>.html
      const directHtml = path.join(distPath, `${cleanPath.slice(1)}.html`);
      if (fs.existsSync(directHtml)) {
        return res.status(200).set(htmlHeaders).sendFile(directHtml);
      }

      // Si no existe pero es una petición HTML de navegación, fallback a 404 o index.html
      const fallback404 = path.join(distPath, '404.html');
      if (fs.existsSync(fallback404)) {
        return res.status(404).set(htmlHeaders).sendFile(fallback404);
      }

      const rootFallback = path.join(distPath, 'index.html');
      return res.status(200).set(htmlHeaders).sendFile(rootFallback);
    });
  } else {
    // Modo desarrollo con Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const hmrEnabled = process.env.ENABLE_HMR === 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: hmrEnabled ? { server } : false,
      },
      appType: 'custom',
    });

    if (!hmrEnabled) {
      app.get('/@vite/client', (_req, res) => {
        res
          .status(200)
          .set({ 'Content-Type': 'application/javascript; charset=utf-8', 'Cache-Control': 'no-cache' })
          .send(`
const sheetsMap = new Map();
export function updateStyle(id, content) {
  let style = sheetsMap.get(id);
  if (!style) {
    style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.setAttribute('data-vite-dev-id', id);
    style.textContent = content;
    document.head.appendChild(style);
    sheetsMap.set(id, style);
  } else if (style.textContent !== content) {
    style.textContent = content;
  }
}
export function removeStyle(id) {
  const style = sheetsMap.get(id);
  if (style) {
    style.remove();
    sheetsMap.delete(id);
  }
}
export function createHotContext() {
  return {
    data: {},
    accept() {},
    acceptExports() {},
    dispose() {},
    prune() {},
    decline() {},
    invalidate() {},
    on() {},
    off() {},
    send() {},
  };
}
export function injectQuery(url) {
  return url;
}
export class ErrorOverlay {}
`);
      });
    }

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
