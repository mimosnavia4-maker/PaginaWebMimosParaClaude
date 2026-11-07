import express from 'express';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { ROUTE_SEO_MAP } from './src/data/routesSeoData.ts';
import type { RouteMeta } from './src/data/routesSeoData.ts';
import { getPageSEO } from './src/utils/seo.ts';
export { ROUTE_SEO_MAP };
export type { RouteMeta };

export function isKnownServerRoute(reqPath: string): boolean {
  const cleanPath = reqPath.split('?')[0].split('#')[0] || '/';
  const normalized = cleanPath.length > 1 ? cleanPath.replace(/\/+$/, '') : '/';
  return Boolean(ROUTE_SEO_MAP[normalized]);
}

export function injectSeoIntoHtml(html: string, reqPath: string): { html: string; status: number } {
  const cleanPath = reqPath.split('?')[0].split('#')[0] || '/';
  const isFound = Boolean(ROUTE_SEO_MAP[cleanPath]);
  const meta: RouteMeta = ROUTE_SEO_MAP[cleanPath] || {
    title: 'Página no encontrada | Tintorería Mimos',
    h1: 'Página no encontrada',
    description:
      'La página que busca no existe o ha sido movida. Tintorería y lavandería profesional en Vigo con recogida a domicilio y 3 tiendas propias.',
    canonical: '',
    robots: 'noindex, nofollow',
    ogType: 'website',
    breadcrumbName: 'Página no encontrada',
  };

  const seo = getPageSEO(cleanPath);
  const routeSchemaTag =
    seo.jsonLd && (Array.isArray(seo.jsonLd) ? seo.jsonLd.length > 0 : Object.keys(seo.jsonLd).length > 0)
      ? `<script type="application/ld+json" id="schema-dynamic-page">${JSON.stringify(seo.jsonLd)}</script>`
      : '';

  const aeoNoscriptBlock = isFound
    ? `<noscript id="aeo-static-summary"><section><h1>${meta.h1}</h1><p>${meta.description}</p><p><strong>Tintorería Mimos Navia, S.L.</strong> · Sede central: C/ As Teixugueiras, 11, local 9, 36212 Vigo (Pontevedra) · Teléfono fijo: +34 986 12 51 41 · WhatsApp y asistente Mimo: +34 655 536 844 · Email: info@tintoreriamimos.es.</p><p>3 tiendas propias en Vigo: As Teixugueiras 11 (Navia), C/ Venezuela 41 bajo 1 y Avda. Alcalde Gregorio Espino 44. Puntos colaboradores en Redondela, Gondomar, Ponteareas y O Porriño.</p></section></noscript>`
    : `<noscript id="aeo-static-summary"><section><h1>Página no encontrada</h1><p>La dirección solicitada no existe. Dispone de servicios profesionales de tintorería y lavandería en Vigo con recogida a domicilio y 3 tiendas propias.</p><p><a href="/">Volver a la portada</a></p></section></noscript>`;

  let out = html
    .replace(/<script\s+type="application\/ld\+json"\s+id="schema-localbusiness">[\s\S]*?<\/script>\s*/, '')
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="${meta.description}" />`
    )
    .replace(
      /<meta\s+name="robots"\s+id="meta-robots"\s+content="[^"]*"\s*\/>/,
      `<meta name="robots" id="meta-robots" content="${meta.robots}" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+id="canonical-link"\s+href="[^"]*"\s*\/>\s*/,
      meta.canonical ? `<link rel="canonical" id="canonical-link" href="${meta.canonical}" />` : ''
    )
    .replace(
      /<meta\s+property="og:type"\s+content="[^"]*"\s+id="og-type"\s*\/>/,
      `<meta property="og:type" content="${meta.ogType}" id="og-type" />`
    )
    .replace(
      /<meta\s+property="og:title"\s+id="og-title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" id="og-title" content="${meta.title}" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+id="og-description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" id="og-description" content="${meta.description}" />`
    )
    .replace(
      /<meta\s+property="og:url"\s+id="og-url"\s+content="[^"]*"\s*\/>\s*/,
      meta.canonical ? `<meta property="og:url" id="og-url" content="${meta.canonical}" />` : ''
    )
    .replace(
      /<meta\s+name="twitter:title"\s+id="twitter-title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" id="twitter-title" content="${meta.title}" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+id="twitter-description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" id="twitter-description" content="${meta.description}" />`
    )
    .replace(
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:image" content="${meta.ogImage || 'https://www.tintoreriamimos.es/osito-mimos.jpg'}" />`
    )
    .replace(
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:image" content="${meta.ogImage || 'https://www.tintoreriamimos.es/osito-mimos.jpg'}" />`
    );

  if (routeSchemaTag) {
    out = out.replace('</head>', `    ${routeSchemaTag}\n  </head>`);
  }
  out = out.replace('<div id="root"></div>', `<div id="root"></div>\n    ${aeoNoscriptBlock}`);

  return { html: out, status: isFound ? 200 : 404 };
}

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const PORT = 3000;

  // Redirecciones 301 hacia las URLs canónicas (sincronizadas con .htaccess)
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
    if (cleanPath === '/tienda/gregorio-espino' || cleanPath === '/tienda/gregorio-espino/') {
      return res.redirect(301, '/tienda-mimos-gregorio-espino-vigo');
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
    next();
  });

  if (process.env.NODE_ENV !== 'production') {
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
        const { html: htmlWithSeo, status } = injectSeoIntoHtml(template, url);
        res.status(status).set({ 'Content-Type': 'text/html' }).end(htmlWithSeo);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, { index: false }));

    app.use((req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        return next();
      }
      const indexPath = path.join(distPath, 'index.html');
      const template = fs.readFileSync(indexPath, 'utf-8');
      const { html: htmlWithSeo, status } = injectSeoIntoHtml(template, req.originalUrl);
      res.status(status).set({ 'Content-Type': 'text/html' }).end(htmlWithSeo);
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Tintorería Mimos Navia server running on http://localhost:${PORT}`);
  });
}

startServer();
