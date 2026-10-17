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

export const KNOWN_ROUTES: string[] = Array.from(
  new Set([
    '/',
    '/limpieza-alfombras-vigo',
    '/arreglos-de-ropa-vigo',
    '/limpieza-profesional-vigo',
    '/puntos-mimos',
    '/contacto',
    '/blog',
    '/aviso-legal',
    '/privacidad',
    '/cookies',
    '/feder',
    '/programa-bono-energia-peme-2025-in417z',
    '/empleo-unete-a-nosotros',
    ...SERVICIOS_MIMOS.map((s) => s.url),
    ...ARTICULOS_BLOG.map((a) => a.url),
    ...ZONAS_SEO_LOCAL.map((z) => z.url),
  ])
);

const LEGACY_REDIRECT_MAP: Record<string, string> = {
  '/feder.html': '/feder',
  '/programa-bono-energia-peme-2025-in417z.html': '/programa-bono-energia-peme-2025-in417z',
  '/empleo-unete-a-nosotros.html': '/empleo-unete-a-nosotros',
  '/empleo': '/empleo-unete-a-nosotros',
  '/unete-a-nosotros': '/empleo-unete-a-nosotros',
  '/servicios/alfombras-pieles': '/limpieza-alfombras-vigo',
  '/alfombras-vigo': '/limpieza-alfombras-vigo',
  '/servicios/limpieza-de-alfombras.html': '/limpieza-alfombras-vigo',
  '/servicios/limpieza-de-alfombras': '/limpieza-alfombras-vigo',
  '/servicios/reparacion-de-alfombras.html': '/limpieza-alfombras-vigo',
  '/servicios/reparacion-de-alfombras': '/limpieza-alfombras-vigo',
  '/servicios/limpieza-de-pieles-y-cuero.html': '/limpieza-pieles-cuero-vigo',
  '/servicios/limpieza-de-pieles-y-cuero': '/limpieza-pieles-cuero-vigo',
  '/pieles-y-cuero-vigo': '/limpieza-pieles-cuero-vigo',
  '/costura-y-arreglos': '/arreglos-de-ropa-vigo',
  '/servicios/costura-arreglos': '/arreglos-de-ropa-vigo',
  '/arreglos-ropa-vigo': '/arreglos-de-ropa-vigo',
};

export function resolveCanonicalRoute(rawPath: string): string {
  const withoutQuery = (rawPath || '/').split('?')[0].split('#')[0] || '/';
  const normalized =
    withoutQuery.length > 1 ? withoutQuery.replace(/\/+$/, '') : '/';
  return LEGACY_REDIRECT_MAP[normalized] || normalized;
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
          name: SERVICIO_ALFOMBRAS_DATA.h1,
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

  // 5. Páginas por Localidad (/zonas/...) — Con noindex hasta completar requisitos de indexación (Sección 5)
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
          '@type': 'Service',
          name: zona.h1,
          description: zona.metaDescription,
          provider: { '@id': 'https://www.tintoreriamimos.es/#negocio' },
          areaServed: { '@type': 'City', name: zona.localidad },
          url: zona.canonical,
        },
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

  // 6. Páginas Legales (Aviso Legal y Privacidad en modo borrador noindex hasta completar datos registrales definitivos)
  if (cleanPath === '/aviso-legal') {
    return {
      title: 'Aviso Legal | Tintorería Mimos Navia, S.L. (Vigo)',
      description:
        'Información legal e identificativa de Tintorería Mimos Navia, S.L., con domicilio en C/ As Teixugueiras, 11, local 9, 36212 Vigo.',
      canonical: 'https://www.tintoreriamimos.es/aviso-legal',
      robots: 'noindex, nofollow',
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
      robots: 'noindex, nofollow',
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

  // 6.B. Publicidad institucional de subvenciones (FEDER y Programa Bono Energía Peme 2025: IN417Z)
  if (cleanPath === '/feder') {
    return {
      title: 'FEDER – Programa Re-Acciona TIC (Empresa Dixital) | Tintorería Mimos Navia',
      description:
        'Publicidad institucional del Programa Re-Acciona TIC (Empresa Dixital), operación cofinanciada por la Unión Europea (Programa Operativo FEDER Galicia 2014-2020) en Tintorería Mimos Navia, S.L.',
      canonical: 'https://www.tintoreriamimos.es/feder',
      robots: 'index, follow',
      ogType: 'website',
      jsonLd: [
        DEFAULT_LOCALBUSINESS_SCHEMA,
        buildBreadcrumbSchema([
          { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
          { name: 'FEDER', url: 'https://www.tintoreriamimos.es/feder' },
        ]),
      ],
    };
  }

  if (cleanPath === '/programa-bono-energia-peme-2025-in417z') {
    return {
      title: 'Programa Bono Energía Peme 2025: IN417Z | Tintorería Mimos Navia',
      description:
        'Convocatoria de Subvencións do Instituto Enerxético de Galicia (INEGA) para proxectos de Mellora Enerxética (Programa Bono enerxía Peme 2025: IN417Z) — Sustitución de secadora Girbau STI-23 por secadora Domus DTT2-18 E.',
      canonical: 'https://www.tintoreriamimos.es/programa-bono-energia-peme-2025-in417z',
      robots: 'index, follow',
      ogType: 'website',
      jsonLd: [
        DEFAULT_LOCALBUSINESS_SCHEMA,
        buildBreadcrumbSchema([
          { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
          {
            name: 'Programa Bono Energía Peme 2025: IN417Z',
            url: 'https://www.tintoreriamimos.es/programa-bono-energia-peme-2025-in417z',
          },
        ]),
      ],
    };
  }

  if (cleanPath === '/empleo-unete-a-nosotros') {
    return {
      title: 'Empleo – Únete a Nosotros | Trabaja en Tintorería Mimos (Vigo)',
      description:
        'Bolsa de empleo de Tintorería Mimos en Vigo: buscamos personal de tintorería (atención al público, desmanchado, lavado y planchado) y personal de limpieza a domicilio.',
      canonical: 'https://www.tintoreriamimos.es/empleo-unete-a-nosotros',
      robots: 'index, follow',
      ogType: 'website',
      jsonLd: [
        DEFAULT_LOCALBUSINESS_SCHEMA,
        buildBreadcrumbSchema([
          { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
          {
            name: 'Empleo — Únete a nosotros',
            url: 'https://www.tintoreriamimos.es/empleo-unete-a-nosotros',
          },
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
