import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { ROUTE_SEO_MAP } from './src/data/routesSeoData.ts';
import type { RouteMeta } from './src/data/routesSeoData.ts';
export { ROUTE_SEO_MAP };
export type { RouteMeta };

export function injectSeoIntoHtml(html: string, reqPath: string): string {
  const cleanPath = reqPath.split('?')[0].split('#')[0] || '/';
  const meta = ROUTE_SEO_MAP[cleanPath] || ROUTE_SEO_MAP['/'];

  const breadcrumbItems: { name: string; url: string }[] = [
    { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
  ];
  if (meta.breadcrumbParent) {
    breadcrumbItems.push(meta.breadcrumbParent);
  }
  if (cleanPath !== '/') {
    breadcrumbItems.push({ name: meta.breadcrumbName, url: meta.canonical });
  }

  const routeJsonLd: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        item: item.url,
      })),
    },
  ];

  if (meta.ogType === 'article') {
    routeJsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: meta.h1,
      description: meta.description,
      datePublished: '2026-10-09',
      author: {
        '@type': 'Organization',
        name: 'Tintorería Mimos Navia, S.L.',
        url: 'https://www.tintoreriamimos.es/',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': meta.canonical,
      },
    });
  } else if (
    cleanPath !== '/' &&
    cleanPath !== '/blog' &&
    cleanPath !== '/puntos-mimos' &&
    cleanPath !== '/contacto' &&
    !cleanPath.startsWith('/aviso') &&
    !cleanPath.startsWith('/privacidad') &&
    !cleanPath.startsWith('/cookies')
  ) {
    routeJsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: meta.h1,
      description: meta.description,
      provider: { '@id': 'https://www.tintoreriamimos.es/#negocio' },
      areaServed: meta.areaServed || { '@type': 'City', name: 'Vigo' },
      url: meta.canonical,
    });
  }

  const routeSchemaTag = `<script type="application/ld+json" id="schema-dynamic-page">${JSON.stringify(
    routeJsonLd
  )}</script>`;

  const aeoNoscriptBlock = `<noscript id="aeo-static-summary"><section><h1>${meta.h1}</h1><p>${meta.description}</p><p><strong>Tintorería Mimos Navia, S.L.</strong> · Sede central: C/ As Teixugueiras, 11, local 9, 36212 Vigo (Pontevedra) · Teléfono fijo: +34 986 12 51 41 · WhatsApp y asistente Mimo (precios y presupuestos): +34 655 536 844 (https://wa.me/34655536844) · Email: info@tintoreriamimos.es.</p><p>3 tiendas propias en Vigo: As Teixugueiras 11 (Navia), C/ Venezuela 41 bajo 1 y Avda. Alcalde Gregorio Espino 44. Puntos colaboradores en Redondela, Gondomar, Ponteareas y O Porriño.</p></section></noscript>`;

  let out = html
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
      /<link\s+rel="canonical"\s+id="canonical-link"\s+href="[^"]*"\s*\/>/,
      `<link rel="canonical" id="canonical-link" href="${meta.canonical}" />`
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
      /<meta\s+property="og:url"\s+id="og-url"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:url" id="og-url" content="${meta.canonical}" />`
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
    )
    .replace('</head>', `    ${routeSchemaTag}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root"></div>\n    ${aeoNoscriptBlock}`);

  return out;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Redirecciones 301 hacia las URLs canónicas (Secciones 7 y 16)
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
      cleanPath === '/arreglos-ropa-vigo' ||
      cleanPath === '/arreglos-ropa-vigo/'
    ) {
      return res.redirect(301, '/arreglos-de-ropa-vigo');
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
      server: { middlewareMode: true },
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
        const htmlWithSeo = injectSeoIntoHtml(template, url);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlWithSeo);
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
      const htmlWithSeo = injectSeoIntoHtml(template, req.originalUrl);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlWithSeo);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Tintorería Mimos Navia server running on http://localhost:${PORT}`);
  });
}

startServer();
