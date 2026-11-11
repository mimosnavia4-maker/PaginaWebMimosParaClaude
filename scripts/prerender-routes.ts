/**
 * Pre-generador de archivos HTML estáticos por ruta para ProfesionalHosting (Apache/Plesk) y buscadores de IA (AEO)
 * Consume directamente la fuente única de verdad: src/data/routesSeoData.ts y src/data/mimosData.ts
 * Genera dist/<ruta>/index.html y dist/sitemap.xml.
 */

import fs from 'fs';
import path from 'path';
import { ROUTE_SEO_MAP, RouteMeta } from '../src/data/routesSeoData.ts';
import { getPageSEO } from '../src/utils/seo.ts';
import {
  ARTICULOS_BLOG,
  CONTACT_INFO,
  ETIQUETAS_SERVICIOS_CONFIRMADOS,
  FAQ_PORTADA_SIN_PRECIOS,
  REGISTROS_PUNTOS,
  SERVICIOS_LIMPIEZA_PROFESIONAL,
  SERVICIOS_MIMOS,
  SERVICIO_ALFOMBRAS_DATA,
  SERVICIO_ARREGLOS_DATA,
  TIENDAS_PROPIAS,
  ZONAS_SEO_LOCAL,
} from '../src/data/mimosData.ts';

function escapeHtml(str: unknown): string {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildNoscriptContent(routePath: string, meta: RouteMeta): string {
  let specificHtml = '';

  if (meta.ogType === 'article') {
    const articulo = ARTICULOS_BLOG.find((a) => a.url === routePath);
    if (articulo) {
      const seccionesHtml = articulo.secciones
        .map(
          (s) =>
            `<li><h3>${escapeHtml(s.h2)}</h3>` +
            (s.subsecciones && s.subsecciones.length > 0
              ? `<ul>${s.subsecciones.map((sub) => `<li>${escapeHtml(sub.h3)}</li>`).join('')}</ul>`
              : '') +
            `</li>`
        )
        .join('');

      specificHtml =
        `<section>` +
        (articulo.introduccion ? `<p>${escapeHtml(articulo.introduccion)}</p>` : '') +
        `<h2>Estructura y claves del artículo</h2>` +
        `<ul>${seccionesHtml}</ul>` +
        `</section>`;
    }
  } else if (routePath.startsWith('/zonas/')) {
    const zona = ZONAS_SEO_LOCAL.find((z) => z.url === routePath);
    if (zona) {
      const puntos = REGISTROS_PUNTOS.filter((p) => p.zona_slug === zona.slug);
      const puntosHtml = puntos
        .map(
          (p) =>
            `<article>` +
            `<h3>${escapeHtml(p.nombre_mostrado)}</h3>` +
            `<p><strong>Dirección:</strong> ${escapeHtml(p.direccion)}, ${escapeHtml(p.codigo_postal)} ${escapeHtml(p.localidad)}</p>` +
            `<p><strong>Horario:</strong> ${escapeHtml(p.horario.resumen)}</p>` +
            `<p><strong>Teléfono:</strong> ${escapeHtml(p.telefonos_mostrados)}</p>` +
            `<p><strong>Servicios confirmados:</strong> ${escapeHtml(
              p.servicios_confirmados.map((s) => ETIQUETAS_SERVICIOS_CONFIRMADOS[s] || s).join(', ')
            )}</p>` +
            `</article>`
        )
        .join('');

      const faqsHtml =
        zona.preguntasFrecuentes && zona.preguntasFrecuentes.length > 0
          ? `<h3>Preguntas frecuentes en ${escapeHtml(zona.localidad)}</h3><dl>` +
            zona.preguntasFrecuentes
              .map(
                (f) =>
                  `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
              )
              .join('') +
            `</dl>`
          : '';

      specificHtml =
        `<section>` +
        (zona.subtitulo ? `<p>${escapeHtml(zona.subtitulo)}</p>` : '') +
        `<h2>Puntos de atención y recogida en ${escapeHtml(zona.localidad)}</h2>` +
        puntosHtml +
        faqsHtml +
        `</section>`;
    }
  } else if (routePath === '/tienda-mimos-navia-vigo') {
    const punto = TIENDAS_PROPIAS.find((t) => t.id === 'as-teixugueiras');
    if (punto) {
      specificHtml =
        `<section>` +
        `<h2>Sede Central Tintorería Mimos Navia (Vigo)</h2>` +
        `<p><strong>Dirección:</strong> ${escapeHtml(punto.direccion)}, ${escapeHtml(punto.codigo_postal)} ${escapeHtml(punto.localidad)}</p>` +
        `<p><strong>Horario:</strong> ${escapeHtml(punto.horario.resumen)}</p>` +
        `<p><strong>Teléfono:</strong> ${escapeHtml(punto.telefonos_mostrados)}</p>` +
        `<p><strong>Servicios disponibles:</strong> Tintorería profesional, lavandería, centro de planchado, colada familiar por kilos, limpieza de alfombras, edredones y mantas, coordinación de recogida a domicilio y recepción para taller propio de costura.</p>` +
        `</section>`;
    }
  } else if (routePath === '/tienda-mimos-gregorio-espino-vigo') {
    const punto = TIENDAS_PROPIAS.find((t) => t.id === 'gregorio-espino');
    if (punto) {
      specificHtml =
        `<section>` +
        `<h2>Tienda propia Tintorería Mimos Gregorio Espino (Vigo)</h2>` +
        `<p><strong>Dirección:</strong> ${escapeHtml(punto.direccion)}, ${escapeHtml(punto.codigo_postal)} ${escapeHtml(punto.localidad)}</p>` +
        `<p><strong>Horario:</strong> ${escapeHtml(punto.horario.resumen)}</p>` +
        `<p><strong>Teléfono:</strong> ${escapeHtml(punto.telefonos_mostrados)}</p>` +
        `<p><strong>Servicios disponibles:</strong> Tintorería profesional, lavandería, planchado profesional, colada familiar, limpieza de alfombras y taller propio de costura y arreglos in situ.</p>` +
        `</section>`;
    }
  } else if (routePath === '/limpieza-alfombras-vigo') {
    const faqsHtml = SERVICIO_ALFOMBRAS_DATA.preguntasFrecuentes
      .map(
        (f) =>
          `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
      )
      .join('');
    specificHtml =
      `<section>` +
      `<p>${escapeHtml(SERVICIO_ALFOMBRAS_DATA.subtituloCabecera)}</p>` +
      `<h2>Preguntas frecuentes sobre limpieza de alfombras en Vigo</h2>` +
      `<dl>${faqsHtml}</dl>` +
      `</section>`;
  } else if (routePath === '/arreglos-de-ropa-vigo') {
    const faqsHtml = SERVICIO_ARREGLOS_DATA.preguntasFrecuentes
      .map(
        (f) =>
          `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
      )
      .join('');
    specificHtml =
      `<section>` +
      `<p>${escapeHtml(SERVICIO_ARREGLOS_DATA.subtituloCabecera)}</p>` +
      `<h2>Preguntas frecuentes sobre costura y arreglos de ropa</h2>` +
      `<dl>${faqsHtml}</dl>` +
      `</section>`;
  } else if (routePath === '/limpieza-profesional-vigo') {
    const subdivisionesHtml = SERVICIOS_LIMPIEZA_PROFESIONAL.map(
      (s) =>
        `<article>` +
        `<h3>${escapeHtml(s.titulo)}</h3>` +
        `<p>${escapeHtml(s.descripcion)}</p>` +
        `<ul>` +
        s.incluye.map((i) => `<li>${escapeHtml(i)}</li>`).join('') +
        `</ul>` +
        `</article>`
    ).join('');
    specificHtml =
      `<section>` +
      `<h2>Servicios de la división de limpieza profesional</h2>` +
      subdivisionesHtml +
      `</section>`;
  } else if (routePath === '/se-punto-colaborador') {
    specificHtml =
      `<section>` +
      `<h2>Sé Punto Colaborador de Tintorería Mimos</h2>` +
      `<p>Suma un servicio de tintorería profesional a tu comercio de proximidad (modistería, mercería, arreglos, boutique o calzado) en Vigo, Val Miñor, O Morrazo o comarcas limítrofes.</p>` +
      `<h3>Claves para tu comercio</h3>` +
      `<ul>` +
      `<li>Operativa ágil en mostrador en menos de 30 segundos con el software TintoSilver.</li>` +
      `<li>Recogida y entrega puntual en tu puerta con furgoneta propia de Mimos.</li>` +
      `<li>Tratamiento profesional en taller propio central en Vigo con acabado al vapor Veit.</li>` +
      `<li>Comisión periódica directa por prenda y aumento de tráfico de clientes a tu tienda.</li>` +
      `</ul>` +
      `</section>`;
  } else if (routePath === '/') {
    const faqsHtml = FAQ_PORTADA_SIN_PRECIOS.map(
      (f) =>
        `<dt><strong>${escapeHtml(f.pregunta)}</strong></dt><dd>${escapeHtml(f.respuesta)}</dd>`
    ).join('');
    specificHtml =
      `<section>` +
      `<h2>Preguntas frecuentes de nuestros clientes</h2>` +
      `<dl>${faqsHtml}</dl>` +
      `</section>`;
  } else {
    const servicio = SERVICIOS_MIMOS.find((s) => s.url === routePath);
    if (servicio) {
      const queTratamosHtml =
        servicio.queTratamos && servicio.queTratamos.length > 0
          ? `<h3>Prendas y textiles que tratamos</h3><ul>` +
            servicio.queTratamos.map((item) => `<li>${escapeHtml(item)}</li>`).join('') +
            `</ul>`
          : '';
      const comoSeContrataHtml =
        servicio.comoSeContrata && servicio.comoSeContrata.length > 0
          ? `<h3>Cómo solicitar el servicio</h3><ul>` +
            servicio.comoSeContrata.map((item) => `<li>${escapeHtml(item)}</li>`).join('') +
            `</ul>`
          : '';
      specificHtml =
        `<section>` +
        `<p>${escapeHtml(servicio.descripcion)}</p>` +
        queTratamosHtml +
        comoSeContrataHtml +
        `</section>`;
    }
  }

  const navHtml =
    `<nav aria-label="Navegación principal">` +
    `<h2>Servicios y secciones principales</h2>` +
    `<ul>` +
    `<li><a href="/">Inicio</a></li>` +
    `<li><a href="/tintoreria-vigo">Tintorería profesional</a></li>` +
    `<li><a href="/lavanderia-vigo">Lavandería</a></li>` +
    `<li><a href="/planchado-vigo">Solo planchado</a></li>` +
    `<li><a href="/colada-familiar-vigo">Colada familiar</a></li>` +
    `<li><a href="/textiles-hogar-vigo">Textiles del hogar</a></li>` +
    `<li><a href="/limpieza-alfombras-vigo">Limpieza de alfombras</a></li>` +
    `<li><a href="/limpieza-pieles-cuero-vigo">Pieles y cuero</a></li>` +
    `<li><a href="/arreglos-de-ropa-vigo">Arreglos de ropa</a></li>` +
    `<li><a href="/recogida-a-domicilio">Recogida a domicilio</a></li>` +
    `<li><a href="/limpieza-profesional-vigo">Limpieza profesional</a></li>` +
    `<li><a href="/limpieza-apartamentos-turisticos-vigo">Apartamentos turísticos</a></li>` +
    `<li><a href="/servicios-empresas">Servicios para empresas</a></li>` +
    `<li><a href="/puntos-mimos">Tiendas y Puntos Mimos</a></li>` +
    `<li><a href="/contacto">Contacto y horarios</a></li>` +
    `<li><a href="/blog">Blog y consejos</a></li>` +
    `</ul>` +
    `</nav>`;

  const tiendasHtml = TIENDAS_PROPIAS.map(
    (t) =>
      `<li><strong>${escapeHtml(t.nombre_mostrado)}:</strong> ${escapeHtml(t.direccion)} (${escapeHtml(
        t.localidad
      )}) · Tel. ${escapeHtml(t.telefonos_mostrados)} · Horario: ${escapeHtml(t.horario.resumen)}</li>`
  ).join('');

  const footerHtml =
    `<footer>` +
    `<h2>Contacto oficial y tiendas propias</h2>` +
    `<p><strong>${escapeHtml(CONTACT_INFO.companyName)}</strong> · Sede central: ${escapeHtml(
      CONTACT_INFO.streetAddress
    )}, ${escapeHtml(CONTACT_INFO.postalCode)} ${escapeHtml(CONTACT_INFO.locality)} (${escapeHtml(
      CONTACT_INFO.region
    )}) · Teléfono: <a href="tel:+34986125141">+34 986 12 51 41</a> · WhatsApp: <a href="https://wa.me/34655536844">+34 655 536 844</a> · Email: <a href="mailto:${escapeHtml(
      CONTACT_INFO.email
    )}">${escapeHtml(CONTACT_INFO.email)}</a>.</p>` +
    `<h3>Tiendas propias en Vigo:</h3>` +
    `<ul>${tiendasHtml}</ul>` +
    `</footer>`;

  return (
    `<noscript id="aeo-static-summary">` +
    `<main id="main-content">` +
    `<h1>${escapeHtml(meta.h1)}</h1>` +
    `<p>${escapeHtml(meta.description)}</p>` +
    specificHtml +
    navHtml +
    footerHtml +
    `</main>` +
    `</noscript>`
  );
}

function renderHtmlForRoute(baseHtml: string, routePath: string, meta: RouteMeta): string {
  const seo = getPageSEO(routePath);
  const routeSchemaTag = `<script type="application/ld+json" id="schema-dynamic-page">${JSON.stringify(
    seo.jsonLd
  )}</script>`;

  const aeoNoscriptBlock = buildNoscriptContent(routePath, meta);

  return baseHtml
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

function render404Html(baseHtml: string): string {
  const notFoundNoscriptBlock =
    `<noscript id="aeo-static-summary">` +
    `<main id="main-content">` +
    `<h1>Página no encontrada</h1>` +
    `<p>La dirección que has introducido no existe o ha sido trasladada a una nueva sección. Tintorería Mimos ofrece servicios profesionales de tintorería, lavandería y limpieza de alfombras en Vigo y comarca con recogida a domicilio y 3 tiendas propias.</p>` +
    `<nav aria-label="Servicios recomendados">` +
    `<ul>` +
    `<li><a href="/">Portada principal de Tintorería Mimos</a></li>` +
    `<li><a href="/limpieza-alfombras-vigo">Limpieza de alfombras con recogida a domicilio</a></li>` +
    `<li><a href="/tintoreria-vigo">Tintorería profesional en Vigo</a></li>` +
    `<li><a href="/lavanderia-vigo">Lavandería y colada por kilos</a></li>` +
    `<li><a href="/arreglos-de-ropa-vigo">Arreglos de ropa y costura</a></li>` +
    `<li><a href="/contacto">Contacto, teléfonos y horarios</a></li>` +
    `</ul>` +
    `</nav>` +
    `</main>` +
    `</noscript>`;

  return baseHtml
    .replace(/<title>[\s\S]*?<\/title>/, `<title>Página no encontrada | Tintorería Mimos</title>`)
    .replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
      `<meta name="description" content="La página que busca no existe o ha sido movida. Tintorería y lavandería profesional en Vigo con recogida a domicilio y 3 tiendas propias." />`
    )
    .replace(
      /<meta\s+name="robots"\s+id="meta-robots"\s+content="[^"]*"\s*\/>/,
      `<meta name="robots" id="meta-robots" content="noindex, nofollow" />`
    )
    .replace(
      /<link\s+rel="canonical"\s+id="canonical-link"\s+href="[^"]*"\s*\/>\s*/,
      ''
    )
    .replace(
      /<meta\s+property="og:title"\s+id="og-title"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:title" id="og-title" content="Página no encontrada | Tintorería Mimos" />`
    )
    .replace(
      /<meta\s+property="og:description"\s+id="og-description"\s+content="[^"]*"\s*\/>/,
      `<meta property="og:description" id="og-description" content="La página solicitada no existe o ha sido movida." />`
    )
    .replace(
      /<meta\s+property="og:url"\s+id="og-url"\s+content="[^"]*"\s*\/>\s*/,
      ''
    )
    .replace(
      /<meta\s+name="twitter:title"\s+id="twitter-title"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" id="twitter-title" content="Página no encontrada | Tintorería Mimos" />`
    )
    .replace(
      /<meta\s+name="twitter:description"\s+id="twitter-description"\s+content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" id="twitter-description" content="La página solicitada no existe o ha sido movida." />`
    )
    .replace('<div id="root"></div>', `<div id="root"></div>\n    ${notFoundNoscriptBlock}`);
}

function getBlogArticleLastmod(path: string): string | null {
  // Únicamente los artículos individuales del blog disponen de fechaISO real verificable
  if (path.startsWith('/blog/') && path !== '/blog') {
    const articulo = ARTICULOS_BLOG.find((a) => a.url === path);
    if (articulo?.fechaISO) return articulo.fechaISO;
  }
  return null;
}

function generateSitemapXml(routes: Record<string, RouteMeta>): string {
  const urls = Object.entries(routes)
    .filter(([_, meta]) => meta.robots === 'index, follow')
    .map(([path, meta]) => {
      const lastmod = getBlogArticleLastmod(path);
      if (lastmod) {
        return `  <url>\n    <loc>${meta.canonical}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
      }
      return `  <url>\n    <loc>${meta.canonical}</loc>\n  </url>`;
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

  // Generar dist/404.html (excluido de sitemap.xml y fuera de las 34 rutas válidas)
  const notFoundHtml = render404Html(baseHtml);
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

  // Generar dist/sitemap.xml exclusivamente en dist/ (solo contiene las 31 rutas válidas indexables)
  const sitemapXml = generateSitemapXml(ROUTE_SEO_MAP);
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');

  console.log(`[AEO Prerender] Generados ${Object.keys(ROUTE_SEO_MAP).length} archivos HTML estáticos + dist/404.html y dist/sitemap.xml.`);
}
