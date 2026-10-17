// Pre-generador de archivos HTML estáticos por ruta para ProfesionalHosting (Apache/Plesk) y buscadores de IA (AEO)
// Se ejecuta automáticamente al finalizar "npm run build" y crea dist/<ruta>/index.html con su título, meta, canonical, robots, Schema.org (BreadcrumbList + Service/Article) y resumen AEO.

import fs from 'fs';
import path from 'path';

const ROUTES = {
  '/': {
    title: 'Tintorería Mimos Navia – Tintorería, Lavandería y Limpieza en Vigo',
    h1: 'Cuidamos tu ropa, tus textiles del hogar y tus espacios con mimo profesional.',
    description:
      'Tintorería y lavandería profesional en Vigo con recogida a domicilio, 3 tiendas propias, red de puntos colaboradores y limpieza de apartamentos turísticos.',
    canonical: 'https://www.tintoreriamimos.es/',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Inicio',
  },
  '/limpieza-alfombras-vigo': {
    title: 'Limpieza de Alfombras en Vigo con Recogida y Entrega a Domicilio | Mimos',
    h1: 'Limpieza de alfombras en Vigo con recogida y entrega a domicilio',
    description:
      'Servicio profesional de limpieza de alfombras en Vigo con recogida y entrega a domicilio o recepción en nuestras 3 tiendas propias. Pide tu presupuesto con Mimo por WhatsApp.',
    canonical: 'https://www.tintoreriamimos.es/limpieza-alfombras-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Limpieza de alfombras en Vigo',
  },
  '/arreglos-de-ropa-vigo': {
    title: 'Arreglos de Ropa en Vigo: Costura y Composturas Profesionales | Mimos',
    h1: 'Arreglos de ropa en Vigo: costura y composturas profesionales',
    description:
      'Servicio profesional de arreglos de ropa, costura y composturas en Vigo (3 tiendas propias) y puntos con costura en Gondomar, Ponteareas y O Porriño. Consulta con Mimo.',
    canonical: 'https://www.tintoreriamimos.es/arreglos-de-ropa-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Arreglos de ropa en Vigo',
  },
  '/tintoreria-vigo': {
    title: 'Tintorería Profesional en Vigo | Prendas Delicadas y Ceremonia | Mimos',
    h1: 'Tintorería profesional en Vigo para prendas delicadas, trajes y ceremonia',
    description:
      'Servicio de tintorería profesional en Vigo para trajes, vestidos de fiesta, comunión y novia, abrigos y prendas delicadas. Consulta tu precio con Mimo por WhatsApp.',
    canonical: 'https://www.tintoreriamimos.es/tintoreria-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Tintorería profesional en Vigo',
  },
  '/lavanderia-vigo': {
    title: 'Lavandería Profesional en Vigo | Cuidado de Ropa y Textiles | Mimos',
    h1: 'Lavandería profesional en Vigo adaptada a cada tipo de tejido',
    description:
      'Lavandería profesional en Vigo para tu ropa de diario, prendas de temporada y textiles. Soluciones adaptadas a cada tejido con atención en tienda o a domicilio.',
    canonical: 'https://www.tintoreriamimos.es/lavanderia-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Lavandería profesional en Vigo',
  },
  '/planchado-vigo': {
    title: 'Servicio de Planchado Profesional en Vigo | Ropa Impecable | Mimos',
    h1: 'Servicio de planchado profesional en Vigo para prendas impecables',
    description:
      'Servicio de solo planchado profesional en Vigo para camisas, pantalones, vestidos, trajes y ropa de hogar. Prendas listas para guardar o estrenar.',
    canonical: 'https://www.tintoreriamimos.es/planchado-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Planchado profesional en Vigo',
  },
  '/colada-familiar-vigo': {
    title: 'Colada Familiar en Vigo | Lavado, Secado y Doblado de Ropa | Mimos',
    h1: 'Colada familiar en Vigo: lavado, secado y doblado de tu ropa de diario',
    description:
      'Servicio de colada familiar en Vigo: nos ocupamos de lavar, secar y doblar tu ropa semanal para que ahorres tiempo en casa. Consulta condiciones con Mimo.',
    canonical: 'https://www.tintoreriamimos.es/colada-familiar-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Colada familiar en Vigo',
  },
  '/textiles-hogar-vigo': {
    title: 'Limpieza de Edredones, Alfombras y Textiles del Hogar en Vigo | Mimos',
    h1: 'Limpieza profesional de edredones, alfombras y textiles del hogar en Vigo',
    description:
      'Lavado e higienización profesional de edredones de plumas y sintéticos, mantas, ropa de cama, fundas de sofá, cortinas y alfombras en Vigo.',
    canonical: 'https://www.tintoreriamimos.es/textiles-hogar-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Textiles del hogar en Vigo',
  },
  '/recogida-a-domicilio': {
    title: 'Tintorería y Lavandería a Domicilio en Vigo y Comarca | Mimos',
    h1: 'Recogida y entrega de prendas a domicilio y en puntos colaboradores',
    description:
      'Servicio de recogida y entrega de tintorería y lavandería a domicilio en Vigo y red de puntos colaboradores en Redondela, Gondomar, Ponteareas y O Porriño.',
    canonical: 'https://www.tintoreriamimos.es/recogida-a-domicilio',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Recogida y entrega a domicilio',
  },
  '/limpieza-profesional-vigo': {
    title:
      'Empresa de Limpieza Profesional en Vigo | Apartamentos, Viviendas y Oficinas | Mimos',
    h1: 'Empresa de limpieza profesional en Vigo y gestión textil para alojamientos',
    description:
      'Servicios de limpieza profesional en Vigo respaldados por Tintorería Mimos Navia: apartamentos turísticos, viviendas, oficinas y empresas. Pide presupuesto con Mimo.',
    canonical: 'https://www.tintoreriamimos.es/limpieza-profesional-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Limpieza profesional en Vigo',
  },
  '/limpieza-apartamentos-turisticos-vigo': {
    title: 'Limpieza y Lavandería para Apartamentos Turísticos en Vigo | Mimos',
    h1: 'Servicio de lavandería y limpieza para apartamentos turísticos en Vigo',
    description:
      'Servicio de lavandería y limpieza profesional para apartamentos turísticos y viviendas vacacionales en Vigo. Pide presupuesto personalizado con Mimo.',
    canonical: 'https://www.tintoreriamimos.es/limpieza-apartamentos-turisticos-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Apartamentos turísticos en Vigo',
  },
  '/servicios-empresas': {
    title: 'Lavandería y Tintorería para Empresas y Profesionales en Vigo | Mimos',
    h1: 'Servicios de lavandería y tintorería para empresas y profesionales en Vigo',
    description:
      'Soluciones de lavandería, planchado y tintorería para empresas, hostelería, comercios y profesionales en Vigo. Presupuesto adaptado a cada negocio.',
    canonical: 'https://www.tintoreriamimos.es/servicios-empresas',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Servicios para empresas',
  },
  '/puntos-mimos': {
    title:
      'Tiendas Mimos en Vigo y Red de Puntos de Recogida Colaboradores | Tintorería Mimos',
    h1: 'Red de tiendas propias de Tintorería Mimos en Vigo y puntos colaboradores',
    description:
      'Consulta las 3 tiendas propias de Tintorería Mimos en Vigo y los 5 puntos de recogida en establecimientos colaboradores en Redondela, Gondomar, Ponteareas, O Porriño y Vigo.',
    canonical: 'https://www.tintoreriamimos.es/puntos-mimos',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Tiendas y Puntos Mimos',
  },
  '/contacto': {
    title: 'Contacto, Tiendas en Vigo y Horarios | Tintorería Mimos Navia',
    h1: 'Contacto, tiendas propias en Vigo y horarios de Tintorería Mimos Navia',
    description:
      'Contacta con Tintorería Mimos Navia en C/ As Teixugueiras 11, local 9 (36212 Vigo), teléfono 986 12 51 41 y WhatsApp de Mimo 655 536 844.',
    canonical: 'https://www.tintoreriamimos.es/contacto',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Contacto y horarios',
  },
  '/blog': {
    title: 'Blog y Guías de Cuidado Textil | Tintorería Mimos Navia (Vigo)',
    h1: 'Guías prácticas para conservar tus prendas, textiles del hogar y alojamientos',
    description:
      'Guías prácticas de Tintorería Mimos en Vigo: cómo tratar manchas difíciles, lavar edredones de plumas, leer símbolos de etiquetas y preparar apartamentos turísticos.',
    canonical: 'https://www.tintoreriamimos.es/blog',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Blog y Guías',
  },
  '/zonas/redondela': {
    title: 'Servicio de Tintorería y Lavandería en Redondela | Punto Mimos',
    h1: 'Servicio de tintorería y lavandería Mimos en Redondela',
    description:
      'Servicio de Tintorería Mimos disponible en nuestro establecimiento colaborador en C/ José Regojo, 29 bajo (Redondela) y recogida a domicilio. Consulta con Mimo.',
    canonical: 'https://www.tintoreriamimos.es/zonas/redondela',
    robots: 'noindex, nofollow',
    ogType: 'website',
    breadcrumbName: 'Redondela',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
  },
  '/zonas/gondomar': {
    title: 'Servicio de Tintorería y Lavandería en Gondomar | Punto Mimos en Puntadas No Aire',
    h1: 'Servicio de tintorería y lavandería Mimos en Gondomar (Val Miñor)',
    description:
      'Servicio de Tintorería Mimos disponible en Puntadas No Aire (C/ Ángel Urzaiz, 6), establecimiento colaborador en Gondomar. Consulta precios con Mimo por WhatsApp.',
    canonical: 'https://www.tintoreriamimos.es/zonas/gondomar',
    robots: 'noindex, nofollow',
    ogType: 'website',
    breadcrumbName: 'Gondomar',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
  },
  '/zonas/ponteareas': {
    title: 'Servicio de Tintorería y Lavandería en Ponteareas | Punto Mimos',
    h1: 'Servicio de tintorería y lavandería Mimos en Ponteareas',
    description:
      'Servicio de Tintorería Mimos disponible en Arreglado2 (C/ Argentina, 4), establecimiento colaborador en Ponteareas. Consulta precios con Mimo por WhatsApp.',
    canonical: 'https://www.tintoreriamimos.es/zonas/ponteareas',
    robots: 'noindex, nofollow',
    ogType: 'website',
    breadcrumbName: 'Ponteareas',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
  },
  '/zonas/o-porrino': {
    title: 'Servicio de Tintorería y Lavandería en O Porriño | Punto Mimos en Telas y Más',
    h1: 'Servicio de tintorería y lavandería Mimos en O Porriño',
    description:
      'Servicio de Tintorería Mimos disponible en Telas y Más (C/ Manuel Rodríguez, 30), establecimiento colaborador en O Porriño. Consulta tu precio con Mimo.',
    canonical: 'https://www.tintoreriamimos.es/zonas/o-porrino',
    robots: 'noindex, nofollow',
    ogType: 'website',
    breadcrumbName: 'O Porriño',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
  },
  '/zonas/vigo': {
    title:
      'Tiendas de Tintorería Mimos en Vigo y Punto Colaborador | Navia, Venezuela y Gregorio Espino',
    h1: 'Nuestras 3 tiendas propias en Vigo, punto colaborador y recogida a domicilio',
    description:
      'Conoce nuestras 3 tiendas propias de Tintorería Mimos en Vigo (As Teixugueiras, Rúa Venezuela y Gregorio Espino), el punto colaborador D\'Passo y la recogida a domicilio.',
    canonical: 'https://www.tintoreriamimos.es/zonas/vigo',
    robots: 'noindex, nofollow',
    ogType: 'website',
    breadcrumbName: 'Vigo',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
  },
  '/blog/como-quitar-mancha-vino-tinto-ropa-delicada': {
    title: 'Cómo quitar una mancha de vino tinto en ropa delicada | Mimos Vigo',
    h1: 'Cómo quitar una mancha de vino tinto sin dañar tu ropa delicada',
    description:
      'Guía práctica para actuar ante una mancha de vino tinto en prendas delicadas: qué hacer en los primeros minutos, por qué evitar frotar o aplicar calor y cuándo acudir a la tintorería.',
    canonical:
      'https://www.tintoreriamimos.es/blog/como-quitar-mancha-vino-tinto-ropa-delicada',
    robots: 'index, follow',
    ogType: 'article',
    breadcrumbName: 'Cómo quitar una mancha de vino tinto en ropa delicada',
    breadcrumbParent: {
      name: 'Blog y Guías',
      url: 'https://www.tintoreriamimos.es/blog',
    },
  },
  '/blog/como-lavar-edredon-de-plumas-guia-practica': {
    title: 'Cómo lavar un edredón de plumas y secarlo bien | Mimos Vigo',
    h1: 'Cómo lavar un edredón de plumas: guía práctica para cuidarlo correctamente',
    description:
      'Aprende cómo lavar un edredón de plumas paso a paso: lectura de la etiqueta, capacidad de la lavadora, ciclo adecuado y claves para secar completamente el relleno.',
    canonical:
      'https://www.tintoreriamimos.es/blog/como-lavar-edredon-de-plumas-guia-practica',
    robots: 'index, follow',
    ogType: 'article',
    breadcrumbName: 'Cómo lavar un edredón de plumas',
    breadcrumbParent: {
      name: 'Blog y Guías',
      url: 'https://www.tintoreriamimos.es/blog',
    },
  },
  '/blog/guia-simbolos-etiquetas-ropa-significado': {
    title: 'Significado de los Símbolos de las Etiquetas de Ropa | Guía Mimos Vigo',
    h1: 'Guía práctica de los símbolos de lavado y etiquetas de tu ropa',
    description:
      'Aprende a interpretar los símbolos de las etiquetas textiles: lavado en agua, limpieza en seco (P y F), secadora, lejía y temperaturas de planchado.',
    canonical: 'https://www.tintoreriamimos.es/blog/guia-simbolos-etiquetas-ropa-significado',
    robots: 'index, follow',
    ogType: 'article',
    breadcrumbName: 'Guía de símbolos de etiquetas de ropa',
    breadcrumbParent: {
      name: 'Blog y Guías',
      url: 'https://www.tintoreriamimos.es/blog',
    },
  },
  '/blog/como-preparar-apartamento-turistico-entre-huespedes': {
    title: 'Cómo preparar un apartamento turístico entre huéspedes | Guía Mimos Vigo',
    h1: 'Cómo organizar la limpieza y los textiles de un apartamento turístico entre huéspedes',
    description:
      'Claves prácticas para propietarios y gestores de apartamentos turísticos en Vigo: rotación de sábanas y toallas, revisión en el check-out y cuidado de edredones.',
    canonical:
      'https://www.tintoreriamimos.es/blog/como-preparar-apartamento-turistico-entre-huespedes',
    robots: 'index, follow',
    ogType: 'article',
    breadcrumbName: 'Cómo preparar un apartamento turístico entre huéspedes',
    breadcrumbParent: {
      name: 'Blog y Guías',
      url: 'https://www.tintoreriamimos.es/blog',
    },
  },
  '/aviso-legal': {
    title: 'Aviso Legal | Tintorería Mimos Navia, S.L. (Vigo)',
    h1: 'Aviso Legal – Tintorería Mimos Navia, S.L.',
    description:
      'Información legal e identificativa de Tintorería Mimos Navia, S.L., con domicilio en C/ As Teixugueiras, 11, local 9, 36212 Vigo.',
    canonical: 'https://www.tintoreriamimos.es/aviso-legal',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Aviso Legal',
  },
  '/privacidad': {
    title: 'Política de Privacidad | Tintorería Mimos Navia, S.L. (Vigo)',
    h1: 'Política de Privacidad – Tintorería Mimos Navia, S.L.',
    description:
      'Política de protección de datos personales y privacidad de Tintorería Mimos Navia, S.L. en Vigo.',
    canonical: 'https://www.tintoreriamimos.es/privacidad',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Política de Privacidad',
  },
  '/cookies': {
    title: 'Política de Cookies | Tintorería Mimos Navia, S.L. (Vigo)',
    h1: 'Política de Cookies – Tintorería Mimos Navia, S.L.',
    description: 'Información sobre el uso de cookies técnicas y preferencias en www.tintoreriamimos.es.',
    canonical: 'https://www.tintoreriamimos.es/cookies',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Política de Cookies',
  },
};

function renderHtmlForRoute(baseHtml, routePath, meta) {
  const breadcrumbItems = [{ name: 'Inicio', url: 'https://www.tintoreriamimos.es/' }];
  if (meta.breadcrumbParent) {
    breadcrumbItems.push(meta.breadcrumbParent);
  }
  if (routePath !== '/') {
    breadcrumbItems.push({ name: meta.breadcrumbName, url: meta.canonical });
  }

  const routeJsonLd = [
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
    !routePath.startsWith('/aviso') &&
    !routePath.startsWith('/privacidad') &&
    !routePath.startsWith('/cookies')
  ) {
    routeJsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: meta.h1,
      description: meta.description,
      provider: { '@id': 'https://www.tintoreriamimos.es/#negocio' },
      areaServed: { '@type': 'City', name: 'Vigo' },
      url: meta.canonical,
    });
  }

  const routeSchemaTag = `<script type="application/ld+json" id="schema-dynamic-page">${JSON.stringify(
    routeJsonLd
  )}</script>`;

  const aeoNoscriptBlock = `<noscript id="aeo-static-summary"><section><h1>${meta.h1}</h1><p>${meta.description}</p><p><strong>Tintorería Mimos Navia, S.L.</strong> · Sede central: C/ As Teixugueiras, 11, local 9, 36212 Vigo (Pontevedra) · Teléfono fijo: +34 986 12 51 41 · WhatsApp y asistente Mimo (precios y presupuestos): +34 655 536 844 (https://wa.me/34655536844) · Email: info@tintoreriamimos.es.</p><p>3 tiendas propias en Vigo: As Teixugueiras 11 (Navia), Rúa de Venezuela 34 y Avda. Alcalde Gregorio Espino 44. Puntos colaboradores en Redondela, Gondomar, Ponteareas, O Porriño y Vigo (D'Passo).</p></section></noscript>`;

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
    .replace('</head>', `    ${routeSchemaTag}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root"></div>\n    ${aeoNoscriptBlock}`);
}

const distDir = path.resolve(process.cwd(), 'dist');
const baseIndexPath = path.join(distDir, 'index.html');

if (fs.existsSync(baseIndexPath)) {
  const baseHtml = fs.readFileSync(baseIndexPath, 'utf-8');

  for (const [routePath, meta] of Object.entries(ROUTES)) {
    const rendered = renderHtmlForRoute(baseHtml, routePath, meta);
    if (routePath === '/') {
      fs.writeFileSync(baseIndexPath, rendered, 'utf-8');
    } else {
      const targetDir = path.join(distDir, routePath.replace(/^\//, ''));
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'index.html'), rendered, 'utf-8');
    }
  }
  console.log(`[AEO Prerender] Generados ${Object.keys(ROUTES).length} archivos HTML estáticos por ruta en dist/`);
}
