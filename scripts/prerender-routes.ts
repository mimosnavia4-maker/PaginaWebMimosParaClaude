/**
 * Pre-generador de archivos HTML estáticos por ruta para ProfesionalHosting (Apache/Plesk) y buscadores de IA (AEO)
 * Consume directamente la fuente única de verdad: src/data/routesSeoData.ts
 * Genera dist/<ruta>/index.html y sincroniza automáticamente dist/sitemap.xml y public/sitemap.xml.
 */

import fs from 'fs';
import path from 'path';
import { ROUTE_SEO_MAP, RouteMeta } from '../src/data/routesSeoData.ts';

function renderHtmlForRoute(baseHtml: string, routePath: string, meta: RouteMeta): string {
  const breadcrumbItems = [{ name: 'Inicio', url: 'https://www.tintoreriamimos.es/' }];
  if (meta.breadcrumbParent) {
    breadcrumbItems.push(meta.breadcrumbParent);
  }
  if (routePath !== '/') {
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
    routePath !== '/' &&
    routePath !== '/blog' &&
    routePath !== '/puntos-mimos' &&
    routePath !== '/contacto' &&
    !routePath.startsWith('/aviso') &&
    !routePath.startsWith('/privacidad') &&
    !routePath.startsWith('/cookies') &&
    !routePath.startsWith('/feder') &&
    !routePath.startsWith('/programa-bono-energia') &&
    !routePath.startsWith('/empleo-unete-a-nosotros')
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

  const aeoNoscriptBlock = `<noscript id="aeo-static-summary"><section><h1>${meta.h1}</h1><p>${meta.description}</p><p><strong>Tintorería Mimos Navia, S.L.</strong> · Sede central: C/ Teixugueiras, 11 bajo 9, 36212 Vigo (Pontevedra) · Teléfono fijo: +34 986 12 51 41 · WhatsApp y asistente Mimo (precios y presupuestos): +34 655 536 844 (https://wa.me/34655536844) · Email: info@tintoreriamimos.es.</p><p>3 tiendas propias en Vigo: C/ Teixugueiras, 11 bajo 9 (Navia), C/ Venezuela, 41 bajo 1 y Avda. Alcalde Gregorio Espino, 44. Puntos colaboradores en Redondela, Gondomar, Ponteareas, O Porriño y Vigo (D'Passo).</p></section></noscript>`;

  return baseHtml
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
}

function generateSitemapXml(routes: Record<string, RouteMeta>): string {
  const today = '2026-10-18';
  const urls = Object.entries(routes)
    .filter(([_, meta]) => meta.robots === 'index, follow')
    .map(([path, meta]) => {
      let priority = '0.8';
      let changefreq = 'monthly';
      if (path === '/') {
        priority = '1.0';
        changefreq = 'weekly';
      } else if (
        path === '/puntos-mimos' ||
        path === '/tienda-mimos-gregorio-espino-vigo' ||
        path === '/limpieza-alfombras-vigo' ||
        path === '/arreglos-de-ropa-vigo' ||
        path === '/zonas/gondomar' ||
        path === '/zonas/o-porrino'
      ) {
        priority = '0.9';
        changefreq = 'weekly';
      } else if (path.startsWith('/blog/')) {
        priority = '0.7';
        changefreq = 'monthly';
      } else if (
        path === '/aviso-legal' ||
        path === '/privacidad' ||
        path === '/cookies' ||
        path === '/feder' ||
        path.startsWith('/programa-bono') ||
        path === '/empleo-unete-a-nosotros'
      ) {
        priority = '0.5';
        changefreq = 'yearly';
      }
      return `  <url>\n    <loc>${meta.canonical}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
    });

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

const distDir = path.resolve(process.cwd(), 'dist');
const baseIndexPath = path.join(distDir, 'index.html');

if (fs.existsSync(baseIndexPath)) {
  const baseHtml = fs.readFileSync(baseIndexPath, 'utf-8');

  for (const [routePath, meta] of Object.entries(ROUTE_SEO_MAP)) {
    const rendered = renderHtmlForRoute(baseHtml, routePath, meta);
    if (routePath === '/') {
      fs.writeFileSync(baseIndexPath, rendered, 'utf-8');
    } else {
      const targetDir = path.join(distDir, routePath.replace(/^\//, ''));
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'index.html'), rendered, 'utf-8');
    }
  }

  // Generar y sincronizar sitemap.xml
  const sitemapXml = generateSitemapXml(ROUTE_SEO_MAP);
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.resolve(process.cwd(), 'public/sitemap.xml'), sitemapXml, 'utf-8');

  console.log(`[AEO Prerender] Generados ${Object.keys(ROUTE_SEO_MAP).length} archivos HTML estáticos y sitemap.xml sincronizado.`);
}
