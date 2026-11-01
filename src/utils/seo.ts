import {
  ARTICULOS_BLOG,
  CONTACT_INFO,
  CANALES_CONTACTO_CENTRAL,
  REGISTROS_PUNTOS,
  SERVICIOS_MIMOS,
  SERVICIO_ALFOMBRAS_DATA,
  SERVICIO_ARREGLOS_DATA,
  TIENDAS_PROPIAS,
  ZONAS_SEO_LOCAL,
  FAQ_PORTADA_SIN_PRECIOS,
} from '../data/mimosData';

import { ALL_ROUTE_PATHS, ROUTE_SEO_MAP } from '../data/routesSeoData';
import type { RouteMeta } from '../data/routesSeoData';

export interface PageSEOConfig {
  title: string;
  description: string;
  canonical: string;
  robots: 'index, follow' | 'noindex, nofollow' | 'noindex, follow';
  ogType: 'website' | 'article';
  jsonLd: Record<string, unknown>;
}

export const KNOWN_ROUTES: string[] = ALL_ROUTE_PATHS;

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
  '/blog/9-blog/26-la-colada-en-casa.html': '/blog/la-colada-en-casa',
  '/blog/9-blog/26-la-colada-en-casa': '/blog/la-colada-en-casa',
  '/blog/9-blog/22-montar-tu-propia-tintoreria-lavanderia.html':
    '/blog/montar-tu-propia-tintoreria-lavanderia',
  '/blog/9-blog/22-montar-tu-propia-tintoreria-lavanderia':
    '/blog/montar-tu-propia-tintoreria-lavanderia',
  '/punto-telas-mas-porrino': '/zonas/o-porrino',
  '/punto/telas-mas': '/zonas/o-porrino',
  '/ficha/telas-mas': '/zonas/o-porrino',
  '/punto-puntadas-no-aire-gondomar': '/zonas/gondomar',
  '/punto/puntadas-no-aire': '/zonas/gondomar',
  '/ficha/puntadas-no-aire': '/zonas/gondomar',
  '/tienda/gregorio-espino': '/tienda-mimos-gregorio-espino-vigo',
};

export function resolveCanonicalRoute(rawPath: string): string {
  const withoutQuery = (rawPath || '/').split('?')[0].split('#')[0] || '/';
  const normalized =
    withoutQuery.length > 1 ? withoutQuery.replace(/\/+$/, '') : '/';
  return LEGACY_REDIRECT_MAP[normalized] || normalized;
}

export function isKnownRoute(rawPath: string): boolean {
  const resolved = resolveCanonicalRoute(rawPath);
  return KNOWN_ROUTES.includes(resolved);
}

function buildBreadcrumbSchema(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export const ORGANIZATION_SCHEMA: Record<string, unknown> = {
  '@type': 'Organization',
  '@id': 'https://www.tintoreriamimos.es/#organization',
  name: 'Tintorería Mimos',
  legalName: 'Tintorería Mimos Navia, S.L.',
  taxID: 'ESB27755925',
  vatID: 'ESB27755925',
  url: 'https://www.tintoreriamimos.es/',
  logo: 'https://www.tintoreriamimos.es/logo-mimos.webp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C/ Teixugueiras, 11, bajo 9',
    addressLocality: 'Vigo',
    postalCode: '36212',
    addressRegion: 'Pontevedra',
    addressCountry: 'ES',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+34986125141',
    contactType: 'customer service',
    availableLanguage: ['es', 'gl'],
  },
  subOrganization: [
    { '@id': 'https://www.tintoreriamimos.es/#tienda-navia' },
    { '@id': 'https://www.tintoreriamimos.es/#tienda-gregorio-espino' },
    { '@id': 'https://www.tintoreriamimos.es/#tienda-venezuela' },
  ],
};

export const TIENDA_NAVIA_SCHEMA: Record<string, unknown> = {
  '@type': 'DryCleaningOrLaundry',
  '@id': 'https://www.tintoreriamimos.es/#tienda-navia',
  name: 'Tintorería Mimos – Sede Central Navia',
  url: 'https://www.tintoreriamimos.es/',
  telephone: '+34986125141',
  parentOrganization: { '@id': 'https://www.tintoreriamimos.es/#organization' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C/ As Teixugueiras, 11, local 9',
    addressLocality: 'Vigo',
    postalCode: '36212',
    addressRegion: 'Pontevedra',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.21223,
    longitude: -8.754691,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:30',
      closes: '14:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '16:00',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '10:00',
      closes: '13:30',
    },
  ],
};

export const TIENDA_GREGORIO_ESPINO_SCHEMA: Record<string, unknown> = {
  '@type': 'DryCleaningOrLaundry',
  '@id': 'https://www.tintoreriamimos.es/#tienda-gregorio-espino',
  name: 'Tintorería Lavandería Mimos – Gregorio Espino',
  url: 'https://www.tintoreriamimos.es/tienda-mimos-gregorio-espino-vigo',
  telephone: '+34986192787',
  parentOrganization: { '@id': 'https://www.tintoreriamimos.es/#organization' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Alcalde Gregorio Espino, 44, bajo',
    addressLocality: 'Vigo',
    postalCode: '36205',
    addressRegion: 'Pontevedra',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.22836,
    longitude: -8.707589,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:30',
      closes: '13:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '16:30',
      closes: '20:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '09:30',
      closes: '13:00',
    },
  ],
};

export const TIENDA_VENEZUELA_SCHEMA: Record<string, unknown> = {
  '@type': 'DryCleaningOrLaundry',
  '@id': 'https://www.tintoreriamimos.es/#tienda-venezuela',
  name: 'Tintorería Mimos – Venezuela',
  url: 'https://www.tintoreriamimos.es/zonas/vigo',
  telephone: '+34646946764',
  parentOrganization: { '@id': 'https://www.tintoreriamimos.es/#organization' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'C/ Venezuela, 41, bajo 1',
    addressLocality: 'Vigo',
    postalCode: '36203',
    addressRegion: 'Pontevedra',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 42.23268,
    longitude: -8.719311,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:30',
      closes: '13:30',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '16:30',
      closes: '19:30',
    },
  ],
};

export function getPageJsonLd(cleanPath: string, meta: RouteMeta): Record<string, unknown> {
  const breadcrumbItems: { name: string; url: string }[] = [
    { name: 'Inicio', url: 'https://www.tintoreriamimos.es/' },
  ];
  if (meta.breadcrumbParent) {
    breadcrumbItems.push(meta.breadcrumbParent);
  }
  if (cleanPath !== '/') {
    breadcrumbItems.push({ name: meta.breadcrumbName, url: meta.canonical });
  }

  const breadcrumbs = buildBreadcrumbSchema(breadcrumbItems);
  const graph: Record<string, unknown>[] = [breadcrumbs];

  if (cleanPath === '/') {
    graph.push(
      {
        '@type': 'WebSite',
        '@id': 'https://www.tintoreriamimos.es/#website',
        name: 'Tintorería Mimos Navia',
        url: 'https://www.tintoreriamimos.es/',
        publisher: { '@id': 'https://www.tintoreriamimos.es/#organization' },
      },
      ORGANIZATION_SCHEMA,
      TIENDA_NAVIA_SCHEMA,
      TIENDA_GREGORIO_ESPINO_SCHEMA,
      TIENDA_VENEZUELA_SCHEMA,
      {
        '@type': 'FAQPage',
        mainEntity: FAQ_PORTADA_SIN_PRECIOS.map((f) => ({
          '@type': 'Question',
          name: f.pregunta,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.respuesta,
          },
        })),
      }
    );
  } else if (cleanPath === '/tienda-mimos-gregorio-espino-vigo') {
    graph.push(
      ORGANIZATION_SCHEMA,
      TIENDA_GREGORIO_ESPINO_SCHEMA
    );
  } else if (cleanPath === '/zonas/vigo') {
    graph.push(
      ORGANIZATION_SCHEMA,
      TIENDA_NAVIA_SCHEMA,
      TIENDA_GREGORIO_ESPINO_SCHEMA,
      TIENDA_VENEZUELA_SCHEMA
    );
  } else if (cleanPath.startsWith('/zonas/')) {
    const zona = ZONAS_SEO_LOCAL.find((z) => z.url === cleanPath);
    if (zona) {
      graph.push(
        ORGANIZATION_SCHEMA,
        {
          '@type': 'Service',
          '@id': `${meta.canonical}#servicio`,
          name: meta.h1,
          description: meta.description,
          provider: { '@id': 'https://www.tintoreriamimos.es/#organization' },
          areaServed: { '@type': 'City', name: zona.localidad },
          url: meta.canonical,
        }
      );
      if (zona.preguntasFrecuentes && zona.preguntasFrecuentes.length > 0) {
        graph.push({
          '@type': 'FAQPage',
          mainEntity: zona.preguntasFrecuentes.map((f) => ({
            '@type': 'Question',
            name: f.pregunta,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.respuesta,
            },
          })),
        });
      }
    }
  } else if (cleanPath === '/limpieza-alfombras-vigo') {
    graph.push(
      ORGANIZATION_SCHEMA,
      {
        '@type': 'Service',
        '@id': `${meta.canonical}#servicio`,
        name: SERVICIO_ALFOMBRAS_DATA.h1,
        description: meta.description,
        provider: { '@id': 'https://www.tintoreriamimos.es/#organization' },
        areaServed: { '@type': 'City', name: 'Vigo' },
        url: meta.canonical,
      },
      {
        '@type': 'FAQPage',
        mainEntity: SERVICIO_ALFOMBRAS_DATA.preguntasFrecuentes.map((f) => ({
          '@type': 'Question',
          name: f.pregunta,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.respuesta,
          },
        })),
      }
    );
  } else if (cleanPath === '/arreglos-de-ropa-vigo') {
    graph.push(
      ORGANIZATION_SCHEMA,
      {
        '@type': 'Service',
        '@id': `${meta.canonical}#servicio`,
        name: meta.h1,
        description: meta.description,
        provider: { '@id': 'https://www.tintoreriamimos.es/#organization' },
        areaServed: meta.areaServed || [
          { '@type': 'City', name: 'Vigo' },
          { '@type': 'City', name: 'Gondomar' },
          { '@type': 'City', name: 'Ponteareas' },
          { '@type': 'City', name: 'O Porriño' },
        ],
        url: meta.canonical,
      },
      {
        '@type': 'FAQPage',
        mainEntity: SERVICIO_ARREGLOS_DATA.preguntasFrecuentes.map((f) => ({
          '@type': 'Question',
          name: f.pregunta,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.respuesta,
          },
        })),
      }
    );
  } else if (meta.ogType === 'article') {
    const articulo = ARTICULOS_BLOG.find((a) => a.url === cleanPath);
    if (articulo) {
      graph.push(
        ORGANIZATION_SCHEMA,
        {
          '@type': 'Article',
          '@id': `${meta.canonical}#article`,
          headline: articulo.titulo,
          description: meta.description,
          image: `https://www.tintoreriamimos.es${articulo.imagen}`,
          datePublished: articulo.fechaISO,
          dateModified: articulo.fechaISO,
          author: {
            '@type': 'Organization',
            name: 'Tintorería Mimos',
            url: 'https://www.tintoreriamimos.es/',
          },
          publisher: { '@id': 'https://www.tintoreriamimos.es/#organization' },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': meta.canonical,
          },
        }
      );
      if (articulo.slug === 'guia-simbolos-etiquetas-ropa-significado') {
        graph.push({
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: '¿Qué significa el círculo con una P en la etiqueta de la ropa?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'El círculo con una letra P autoriza la limpieza en seco profesional utilizando percloroetileno y solventes habituales. Es exclusivo de tintorerías y no debe lavarse en agua en lavadoras domésticas.',
              },
            },
            {
              '@type': 'Question',
              name: '¿Qué significan los puntos dentro del símbolo de la plancha?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Indican la temperatura máxima de planchado: 1 punto (máx. 110 °C, sin vapor para sintéticos y sedas), 2 puntos (máx. 150 °C para lana y poliéster) y 3 puntos (máx. 200 °C para algodón y lino).',
              },
            },
            {
              '@type': 'Question',
              name: '¿Qué significan las barras debajo del símbolo de la cubeta de lavado?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'Una barra horizontal inferior indica acción mecánica reducida (programa para sintéticos delicados y centrifugado suave). Dos barras horizontales indican acción mecánica muy reducida (programa especial para lana o seda).',
              },
            },
            {
              '@type': 'Question',
              name: '¿Qué significa el círculo con la letra W?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'El círculo con la letra W identifica el sistema Wet Cleaning (limpieza profesional ecológica en agua con control informático de humedad), una alternativa avanzada al lavado en seco que preserva tejidos delicados sin disolventes.',
              },
            },
            {
              '@type': 'Question',
              name: '¿Por qué encogen los jerséis de lana al lavarlos en lavadora?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'La lana encoge por el fenómeno del afieltrado: el agua caliente combinada con la fricción mecánica del tambor abre las escamas de la cutícula del pelo de lana, entrelazándolas de forma irreversible al enfriarse.',
              },
            },
          ],
        });
      }
    }
  } else {
    const servicio = SERVICIOS_MIMOS.find((s) => s.url === cleanPath);
    if (servicio || cleanPath === '/limpieza-profesional-vigo') {
      graph.push(
        ORGANIZATION_SCHEMA,
        {
          '@type': 'Service',
          '@id': `${meta.canonical}#servicio`,
          name: meta.h1,
          description: meta.description,
          provider: { '@id': 'https://www.tintoreriamimos.es/#organization' },
          areaServed: meta.areaServed || { '@type': 'City', name: 'Vigo' },
          url: meta.canonical,
        }
      );
    } else {
      graph.push(ORGANIZATION_SCHEMA);
    }
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function getPageSEO(pathname: string): PageSEOConfig {
  const canonicalPath = resolveCanonicalRoute(pathname);
  const cleanPath = canonicalPath.split('?')[0].split('#')[0] || '/';
  const meta = ROUTE_SEO_MAP[cleanPath];

  if (!meta) {
    return {
      title: 'Página no encontrada | Tintorería Mimos',
      description:
        'La página solicitada no existe o ha sido trasladada. Tintorería y lavandería profesional en Vigo con recogida a domicilio y 3 tiendas propias.',
      canonical: '',
      robots: 'noindex, nofollow',
      ogType: 'website',
      jsonLd: { '@context': 'https://schema.org', '@graph': [] },
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    canonical: meta.canonical,
    robots: meta.robots,
    ogType: meta.ogType,
    jsonLd: getPageJsonLd(cleanPath, meta),
  };
}

export function applyPageSEO(pathname: string): void {
  const seo = getPageSEO(pathname);
  document.title = seo.title;

  const setMetaContent = (selector: string, content: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      if (selector.startsWith('meta[')) {
        el = document.createElement('meta');
        const matchName = selector.match(/name="([^"]+)"/);
        const matchProp = selector.match(/property="([^"]+)"/);
        if (matchName) el.setAttribute('name', matchName[1]);
        if (matchProp) el.setAttribute('property', matchProp[1]);
        document.head.appendChild(el);
      }
    }
    if (el) {
      el.setAttribute('content', content);
    }
  };

  setMetaContent('meta[name="description"]', seo.description);
  setMetaContent('meta[name="robots"]', seo.robots);
  setMetaContent('meta[property="og:title"]', seo.title);
  setMetaContent('meta[property="og:description"]', seo.description);
  if (seo.canonical) {
    setMetaContent('meta[property="og:url"]', seo.canonical);
  } else {
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.remove();
  }
  setMetaContent('meta[property="og:type"]', seo.ogType);
  setMetaContent('meta[name="twitter:title"]', seo.title);
  setMetaContent('meta[name="twitter:description"]', seo.description);

  const cleanPath = resolveCanonicalRoute(pathname).split('?')[0].split('#')[0] || '/';
  const meta = ROUTE_SEO_MAP[cleanPath];
  const image = meta?.ogImage || 'https://www.tintoreriamimos.es/osito-mimos.jpg';
  setMetaContent('meta[property="og:image"]', image);
  setMetaContent('meta[name="twitter:image"]', image);

  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (seo.canonical) {
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', seo.canonical);
  } else if (canonicalEl) {
    canonicalEl.remove();
  }

  const legacyLocalBusiness = document.getElementById('schema-localbusiness');
  if (legacyLocalBusiness) {
    legacyLocalBusiness.remove();
  }

  let scriptEl = document.getElementById('schema-dynamic-page') as HTMLScriptElement | null;
  if (seo.jsonLd && (Array.isArray(seo.jsonLd) ? seo.jsonLd.length > 0 : Object.keys(seo.jsonLd).length > 0)) {
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'schema-dynamic-page';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(seo.jsonLd);
  } else if (scriptEl) {
    scriptEl.remove();
  }
}
