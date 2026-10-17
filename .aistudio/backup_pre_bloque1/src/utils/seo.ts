import {
  ARTICULOS_BLOG,
  CONTACT_INFO,
  SERVICIOS_MIMOS,
  SERVICIO_ALFOMBRAS_DATA,
  SERVICIO_ARREGLOS_DATA,
  TIENDAS_PROPIAS,
  ZONAS_SEO_LOCAL,
  FAQ_PORTADA_SIN_PRECIOS,
} from '../data/mimosData';

export interface PageSEOConfig {
  title: string;
  description: string;
  canonical: string;
  robots: 'index, follow' | 'noindex, nofollow';
  ogType: 'website' | 'article';
  jsonLd: Record<string, unknown> | Record<string, unknown>[];
}

function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

const DEFAULT_LOCALBUSINESS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'DryCleaningOrLaundry',
  '@id': 'https://www.tintoreriamimos.es/#negocio',
  name: CONTACT_INFO.companyName,
  legalName: CONTACT_INFO.legalName,
  url: 'https://www.tintoreriamimos.es/',
  image: 'https://www.tintoreriamimos.es/osito-mimos.jpg',
  telephone: '+34986125141',
  email: CONTACT_INFO.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT_INFO.streetAddress,
    addressLocality: CONTACT_INFO.locality,
    addressRegion: CONTACT_INFO.region,
    postalCode: CONTACT_INFO.postalCode,
    addressCountry: 'ES',
  },
  areaServed: [
    { '@type': 'City', name: 'Vigo' },
    { '@type': 'City', name: 'Redondela' },
    { '@type': 'City', name: 'Gondomar' },
    { '@type': 'City', name: 'Ponteareas' },
    { '@type': 'City', name: 'O Porriño' },
  ],
  // Exclusivamente las 3 tiendas propias en Vigo como DryCleaningOrLaundry (Sección 5 y 10 del Plan Maestro)
  department: TIENDAS_PROPIAS.map((t) => ({
    '@type': 'DryCleaningOrLaundry',
    name: t.nombre_mostrado,
    telephone: `+34${t.telefono}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: t.direccion,
      addressLocality: t.localidad,
      postalCode: t.codigo_postal,
      addressCountry: 'ES',
    },
  })),
};

export function getPageSEO(pathname: string): PageSEOConfig {
  const cleanPath = pathname.split('?')[0].split('#')[0] || '/';

  // 0. Servicio prioritario: Limpieza de alfombras en Vigo (/limpieza-alfombras-vigo — Sección 16)
  if (cleanPath === '/limpieza-alfombras-vigo') {
    return {
      title: SERVICIO_ALFOMBRAS_DATA.seoTitle,
      description: SERVICIO_ALFOMBRAS_DATA.metaDescription,
      canonical: SERVICIO_ALFOMBRAS_DATA.canonical,
      robots: 'index, follow',
      ogType: 'website',
      jsonLd: [
        DEFAULT_LOCALBUSINESS_SCHEMA,
        buildBreadcrumbSchema([
          { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
          {
            name: 'Limpieza de alfombras en Vigo',
            url: SERVICIO_ALFOMBRAS_DATA.canonical,
          },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Limpieza de alfombras en Vigo con recogida y entrega a domicilio',
          description: SERVICIO_ALFOMBRAS_DATA.metaDescription,
          provider: { '@id': 'https://www.tintoreriamimos.es/#negocio' },
          areaServed: { '@type': 'City', name: 'Vigo' },
          url: SERVICIO_ALFOMBRAS_DATA.canonical,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: SERVICIO_ALFOMBRAS_DATA.preguntasFrecuentes.map((f) => ({
            '@type': 'Question',
            name: f.pregunta,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.respuesta,
            },
          })),
        },
      ],
    };
  }

  // 0.B. Servicio destacado: Costura y arreglos de ropa (/arreglos-de-ropa-vigo — Sección 7)
  if (cleanPath === '/arreglos-de-ropa-vigo') {
    return {
      title: SERVICIO_ARREGLOS_DATA.seoTitle,
      description: SERVICIO_ARREGLOS_DATA.metaDescription,
      canonical: SERVICIO_ARREGLOS_DATA.canonical,
      robots: 'index, follow',
      ogType: 'website',
      jsonLd: [
        DEFAULT_LOCALBUSINESS_SCHEMA,
        buildBreadcrumbSchema([
          { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
          {
            name: 'Arreglos de ropa en Vigo',
            url: SERVICIO_ARREGLOS_DATA.canonical,
          },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Arreglos de ropa en Vigo: costura y composturas profesionales',
          description: SERVICIO_ARREGLOS_DATA.metaDescription,
          provider: { '@id': 'https://www.tintoreriamimos.es/#negocio' },
          areaServed: [
            { '@type': 'City', name: 'Vigo' },
            { '@type': 'City', name: 'Gondomar' },
            { '@type': 'City', name: 'Ponteareas' },
            { '@type': 'City', name: 'O Porriño' },
          ],
          url: SERVICIO_ARREGLOS_DATA.canonical,
        },
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: SERVICIO_ARREGLOS_DATA.preguntasFrecuentes.map((f) => ({
            '@type': 'Question',
            name: f.pregunta,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.respuesta,
            },
          })),
        },
      ],
    };
  }

  // 1. Guías del Blog
  const articulo = ARTICULOS_BLOG.find((a) => a.url === cleanPath);
  if (articulo) {
    return {
      title: articulo.seoTitle,
      description: articulo.metaDescription,
      canonical: articulo.canonical,
      robots: 'index, follow',
      ogType: 'article',
      jsonLd: [
        DEFAULT_LOCALBUSINESS_SCHEMA,
        buildBreadcrumbSchema([
          { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
          { name: 'Blog y Guías', url: 'https://www.tintoreriamimos.es/blog' },
          { name: articulo.titulo, url: articulo.canonical },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: articulo.titulo,
          description: articulo.metaDescription,
          datePublished: articulo.fechaISO,
          dateModified: articulo.fechaISO,
          author: {
            '@type': 'Organization',
            name: CONTACT_INFO.legalName,
            url: 'https://www.tintoreriamimos.es/',
          },
          publisher: {
            '@type': 'Organization',
            name: CONTACT_INFO.legalName,
            url: 'https://www.tintoreriamimos.es/',
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articulo.canonical,
          },
        },
      ],
    };
  }

  if (cleanPath === '/blog') {
    return {
      title: 'Blog y Guías de Cuidado Textil | Tintorería Mimos Navia (Vigo)',
      description:
        'Guías prácticas de Tintorería Mimos en Vigo: cómo tratar manchas difíciles, lavar edredones de plumas, leer símbolos de etiquetas y preparar apartamentos turísticos.',
      canonical: 'https://www.tintoreriamimos.es/blog',
      robots: 'index, follow',
      ogType: 'website',
      jsonLd: [
        DEFAULT_LOCALBUSINESS_SCHEMA,
        buildBreadcrumbSchema([
          { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
          {
            name: 'Blog y Guías de Cuidado Textil',
            url: 'https://www.tintoreriamimos.es/blog',
          },
        ]),
      ],
    };
  }

  // 2. División Limpieza Profesional
  if (cleanPath === '/limpieza-profesional-vigo') {
    return {
      title:
        'Empresa de Limpieza Profesional en Vigo | Apartamentos, Viviendas y Oficinas | Mimos',
      description:
        'Servicios de limpieza profesional en Vigo respaldados por Tintorería Mimos Navia: apartamentos turísticos, viviendas, oficinas y empresas. Pide presupuesto con Mimo.',
      canonical: 'https://www.tintoreriamimos.es/limpieza-profesional-vigo',
      robots: 'index, follow',
      ogType: 'website',
      jsonLd: [
        DEFAULT_LOCALBUSINESS_SCHEMA,
        buildBreadcrumbSchema([
          { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
          {
            name: 'Limpieza Profesional en Vigo',
            url: 'https://www.tintoreriamimos.es/limpieza-profesional-vigo',
          },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Servicios de Limpieza Profesional en Vigo – Tintorería Mimos Navia',
          provider: { '@id': 'https://www.tintoreriamimos.es/#negocio' },
          areaServed: { '@type': 'City', name: 'Vigo' },
        },
      ],
    };
  }

  // 3. Servicios individuales (incluyendo /limpieza-apartamentos-turisticos-vigo y /servicios-empresas)
  const servicio = SERVICIOS_MIMOS.find((s) => s.url === cleanPath);
  if (servicio) {
    const canonicalUrl = `https://www.tintoreriamimos.es${servicio.url}`;
    return {
      title: servicio.seoTitle,
      description: servicio.metaDescription,
      canonical: canonicalUrl,
      robots: 'index, follow',
      ogType: 'website',
      jsonLd: [
        DEFAULT_LOCALBUSINESS_SCHEMA,
        buildBreadcrumbSchema([
          { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
          { name: servicio.titulo, url: canonicalUrl },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${servicio.titulo} en Vigo – Tintorería Mimos Navia`,
          description: servicio.metaDescription,
          provider: { '@id': 'https://www.tintoreriamimos.es/#negocio' },
          areaServed: { '@type': 'City', name: 'Vigo' },
          url: canonicalUrl,
        },
      ],
    };
  }

  // 4. Buscador de Tiendas y Puntos Mimos y Contacto
  if (cleanPath === '/puntos-mimos') {
    return {
      title:
        'Tiendas Mimos en Vigo y Red de Puntos de Recogida Colaboradores | Tintorería Mimos',
      description:
        'Consulta las 3 tiendas propias de Tintorería Mimos en Vigo y los 5 puntos de recogida en establecimientos colaboradores en Redondela, Gondomar, Ponteareas, O Porriño y Vigo.',
      canonical: 'https://www.tintoreriamimos.es/puntos-mimos',
      robots: 'index, follow',
      ogType: 'website',
      jsonLd: [
        DEFAULT_LOCALBUSINESS_SCHEMA,
        buildBreadcrumbSchema([
          { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
          {
            name: 'Tiendas y Puntos Mimos',
            url: 'https://www.tintoreriamimos.es/puntos-mimos',
          },
        ]),
      ],
    };
  }

  if (cleanPath === '/contacto') {
    return {
      title: 'Contacto, Tiendas en Vigo y Horarios | Tintorería Mimos Navia',
      description:
        'Contacta con Tintorería Mimos Navia en C/ As Teixugueiras 11, local 9 (36212 Vigo), teléfono 986 12 51 41 y WhatsApp de Mimo 655 536 844.',
      canonical: 'https://www.tintoreriamimos.es/contacto',
      robots: 'index, follow',
      ogType: 'website',
      jsonLd: [
        DEFAULT_LOCALBUSINESS_SCHEMA,
        buildBreadcrumbSchema([
          { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
          { name: 'Contacto y Horarios', url: 'https://www.tintoreriamimos.es/contacto' },
        ]),
      ],
    };
  }

  // 5. Páginas por Localidad (/zonas/...) — Con noindex mientras tengan datos [PENDIENTE] (Regla 0.5 y Sección 5)
  const zona = ZONAS_SEO_LOCAL.find((z) => z.url === cleanPath);
  if (zona) {
    return {
      title: zona.seoTitle,
      description: zona.metaDescription,
      canonical: zona.canonical,
      robots: zona.tienePendientes ? 'noindex, nofollow' : 'index, follow',
      ogType: 'website',
      jsonLd: [
        DEFAULT_LOCALBUSINESS_SCHEMA,
        buildBreadcrumbSchema([
          { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
          {
            name: 'Tiendas y Puntos Mimos',
            url: 'https://www.tintoreriamimos.es/puntos-mimos',
          },
          { name: zona.localidad, url: zona.canonical },
        ]),
        {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: zona.preguntasFrecuentes.map((f) => ({
            '@type': 'Question',
            name: f.pregunta,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.respuesta,
            },
          })),
        },
      ],
    };
  }

  // 6. Páginas Legales
  if (cleanPath === '/aviso-legal') {
    return {
      title: 'Aviso Legal | Tintorería Mimos Navia, S.L. (Vigo)',
      description:
        'Información legal e identificativa de Tintorería Mimos Navia, S.L., con domicilio en C/ As Teixugueiras, 11, local 9, 36212 Vigo.',
      canonical: 'https://www.tintoreriamimos.es/aviso-legal',
      robots: 'index, follow',
      ogType: 'website',
      jsonLd: [
        DEFAULT_LOCALBUSINESS_SCHEMA,
        buildBreadcrumbSchema([
          { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
          { name: 'Aviso Legal', url: 'https://www.tintoreriamimos.es/aviso-legal' },
        ]),
      ],
    };
  }

  if (cleanPath === '/privacidad') {
    return {
      title: 'Política de Privacidad | Tintorería Mimos Navia, S.L. (Vigo)',
      description:
        'Política de protección de datos personales y privacidad de Tintorería Mimos Navia, S.L. en Vigo.',
      canonical: 'https://www.tintoreriamimos.es/privacidad',
      robots: 'index, follow',
      ogType: 'website',
      jsonLd: [
        DEFAULT_LOCALBUSINESS_SCHEMA,
        buildBreadcrumbSchema([
          { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
          {
            name: 'Política de Privacidad',
            url: 'https://www.tintoreriamimos.es/privacidad',
          },
        ]),
      ],
    };
  }

  if (cleanPath === '/cookies') {
    return {
      title: 'Política de Cookies | Tintorería Mimos Navia, S.L. (Vigo)',
      description: 'Información sobre el uso de cookies técnicas y preferencias en www.tintoreriamimos.es.',
      canonical: 'https://www.tintoreriamimos.es/cookies',
      robots: 'index, follow',
      ogType: 'website',
      jsonLd: [
        DEFAULT_LOCALBUSINESS_SCHEMA,
        buildBreadcrumbSchema([
          { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
          { name: 'Política de Cookies', url: 'https://www.tintoreriamimos.es/cookies' },
        ]),
      ],
    };
  }

  // 7. Portada (/)
  return {
    title: 'Tintorería Mimos Navia – Tintorería, Lavandería y Limpieza en Vigo',
    description:
      'Tintorería y lavandería profesional en Vigo con recogida a domicilio, 3 tiendas propias, red de puntos colaboradores y limpieza de apartamentos turísticos.',
    canonical: 'https://www.tintoreriamimos.es/',
    robots: 'index, follow',
    ogType: 'website',
    jsonLd: [
      DEFAULT_LOCALBUSINESS_SCHEMA,
      buildBreadcrumbSchema([
        { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: FAQ_PORTADA_SIN_PRECIOS.map((f) => ({
          '@type': 'Question',
          name: f.pregunta,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.respuesta,
          },
        })),
      },
    ],
  };
}

export function applyPageSEO(pathname: string): void {
  const seo = getPageSEO(pathname);
  document.title = seo.title;

  const setMetaContent = (selector: string, content: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.setAttribute('content', content);
    }
  };

  setMetaContent('meta[name="description"]', seo.description);
  setMetaContent('meta[name="robots"]', seo.robots);
  setMetaContent('meta[property="og:title"]', seo.title);
  setMetaContent('meta[property="og:description"]', seo.description);
  setMetaContent('meta[property="og:url"]', seo.canonical);
  setMetaContent('meta[property="og:type"]', seo.ogType);
  setMetaContent('meta[name="twitter:title"]', seo.title);
  setMetaContent('meta[name="twitter:description"]', seo.description);

  const canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalEl) {
    canonicalEl.setAttribute('href', seo.canonical);
  }

  let scriptEl = document.getElementById('schema-dynamic-page') as HTMLScriptElement | null;
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'schema-dynamic-page';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }
  scriptEl.textContent = JSON.stringify(seo.jsonLd);
}
