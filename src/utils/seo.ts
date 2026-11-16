import {
  ARTICULOS_BLOG,
  CONTACT_INFO,
  CANALES_CONTACTO_CENTRAL,
  REGISTROS_PUNTOS,
  SERVICIOS_MIMOS,
  SERVICIO_DETALLE_ENRIQUECIDO,
  SERVICIO_ALFOMBRAS_DATA,
  SERVICIO_REPARACION_ALFOMBRAS_DATA,
  SERVICIO_ARREGLOS_DATA,
  SERVICIO_NOVIA_CEREMONIA_DATA,
  SERVICIO_PIELES_DATA,
  SERVICIO_SINIESTROS_FAQS,
  SERVICIO_TEXTILES_HOGAR_DATA,
  SERVICIO_EMPRESAS_B2B_DATA,
  TIENDAS_PROPIAS,
  ZONAS_SEO_LOCAL,
  FAQ_PORTADA_SIN_PRECIOS,
} from '../data/mimosData.ts';

import { ALL_ROUTE_PATHS, ROUTE_SEO_MAP } from '../data/routesSeoData.ts';
import type { RouteMeta } from '../data/routesSeoData.ts';

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
  '/servicios/reparacion-de-alfombras.html': '/reparacion-alfombras-vigo',
  '/servicios/reparacion-de-alfombras': '/reparacion-alfombras-vigo',
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
  '/tienda/navia': '/tienda-mimos-navia-vigo',
  '/tienda-navia': '/tienda-mimos-navia-vigo',
  '/central-navia': '/tienda-mimos-navia-vigo',
  '/tienda/gregorio-espino': '/tienda-mimos-gregorio-espino-vigo',
  '/tienda-gregorio-espino': '/tienda-mimos-gregorio-espino-vigo',
  '/punto-dpasso-vigo': '/punto-mimos-dpasso-vigo',
  '/punto/dpasso': '/punto-mimos-dpasso-vigo',
  '/ficha/dpasso': '/punto-mimos-dpasso-vigo',
  '/se-punto-de-recogida.html': '/se-punto-colaborador',
  '/se-punto-de-recogida': '/se-punto-colaborador',
  '/punto-colaborador': '/se-punto-colaborador',
  '/siniestros-vigo': '/limpieza-incendios-siniestros-vigo',
  '/limpieza-incendios-vigo': '/limpieza-incendios-siniestros-vigo',
  '/recuperacion-textil-siniestros': '/limpieza-incendios-siniestros-vigo',
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
    streetAddress: CONTACT_INFO.streetAddress,
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
  sameAs: [
    CONTACT_INFO.social.facebook,
    CONTACT_INFO.social.instagram,
    CONTACT_INFO.social.youtube,
    CONTACT_INFO.social.linkedin,
  ],
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
  url: 'https://www.tintoreriamimos.es/tienda-mimos-navia-vigo',
  telephone: '+34986125141',
  parentOrganization: { '@id': 'https://www.tintoreriamimos.es/#organization' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: CONTACT_INFO.streetAddress,
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
    streetAddress: 'Alcalde Gregorio Espino, 42, bajo',
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
  } else if (cleanPath === '/tienda-mimos-navia-vigo') {
    graph.push(
      ORGANIZATION_SCHEMA,
      TIENDA_NAVIA_SCHEMA
    );
  } else if (cleanPath === '/tienda-mimos-gregorio-espino-vigo') {
    const gregorioFaqs = [
      {
        pregunta: '¿Tengo que pedir cita previa para llevar prendas a arreglar o limpiar?',
        respuesta:
          'No, no hace falta cita previa en ningún momento. Puedes acudir libremente en nuestro horario de apertura (lunes a viernes de 09:30 a 13:30 y de 16:30 a 20:00, y sábados de 09:30 a 13:00). Te atenderemos directamente en el mostrador.',
      },
      {
        pregunta: '¿Se pueden probar las prendas en la tienda para tomar la medida del bajo?',
        respuesta:
          'Sí, por supuesto. Disponemos de espacio para que puedas probarte pantalones, faldas, vestidos o chaquetas, y nuestra modista tomará la medida exacta con alfileres según tus indicaciones y el calzado que vayas a utilizar.',
      },
      {
        pregunta: '¿Puedo entregar alfombras grandes viniendo en coche?',
        respuesta:
          'Sí, es una de las mayores comodidades de esta tienda. Justo en la bocacalle lateral de Rúa do Escultor Nogueira dispones de zona de carga y descarga a pocos metros de la puerta. Si nos avisas al llegar, nuestro personal te ayuda a bajarlas del vehículo.',
      },
      {
        pregunta: '¿Disponéis de servicio de arreglos express o urgentes?',
        respuesta:
          'Sí, para arreglos sencillos como bajos de pantalón o cremalleras comunes podemos ofrecer plazo express en el mismo día o en 24 horas según el volumen de trabajo del taller en ese momento.',
      },
      {
        pregunta: '¿Cómo me notificáis cuando las prendas están listas para recoger?',
        respuesta:
          'Te enviamos un aviso personalizado por WhatsApp o SMS en el mismo instante en que la prenda sale planchada y revisada por nuestro control de calidad. Así evitas viajes innecesarios.',
      },
      {
        pregunta: '¿Qué métodos de pago aceptáis en la tienda de Gregorio Espino?',
        respuesta:
          'Aceptamos pago con tarjeta de crédito/débito (contactless, Apple Pay, Google Pay), Bizum para mayor agilidad y dinero en efectivo. Entregamos siempre resguardo oficial con IVA desglosado.',
      },
      {
        pregunta: 'Si después no puedo desplazarme a recogerlas, ¿podéis llevármelas a casa?',
        respuesta:
          'Sí. Si por cualquier motivo prefieres que te entreguemos tus prendas limpias en tu domicilio o lugar de trabajo en Vigo, solo tienes que indicárnoslo por WhatsApp y coordinamos la entrega con nuestra furgoneta propia de reparto.',
      },
    ];
    graph.push(
      ORGANIZATION_SCHEMA,
      TIENDA_GREGORIO_ESPINO_SCHEMA,
      {
        '@type': 'FAQPage',
        mainEntity: gregorioFaqs.map((f) => ({
          '@type': 'Question',
          name: f.pregunta,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.respuesta,
          },
        })),
      }
    );
  } else if (cleanPath === '/punto-mimos-dpasso-vigo') {
    const dpassoFaqs = [
      {
        pregunta: "¿Cómo funciona la entrega de ropa para Tintorería Mimos en D'Passo?",
        respuesta:
          "Llevas tus prendas (trajes, vestidos, abrigos, edredones, alfombras o colada familiar) a D'Passo en Camiño Espedrigada, 9 bajo, Vigo. Allí registran tu encargo con tu resguardo oficial y nuestra furgoneta las traslada a la central de Mimos en Navia para devolverlas listas y protegidas al punto.",
      },
      {
        pregunta: "¿Cuál es el horario de apertura de D'Passo en Vigo?",
        respuesta:
          'Atiende de lunes a viernes en horario partido de 09:30 a 13:30 y de 16:30 a 20:30. Los sábados, domingos y festivos permanece cerrado.',
      },
      {
        pregunta: "¿Se realizan arreglos de costura o composturas en D'Passo?",
        respuesta:
          "No. D'Passo actúa como punto colaborador oficial de recogida y entrega para tintorería, lavandería, planchado, colada familiar, ropa de hogar y alfombras, sin taller de costura en el local. Para arreglos de ropa atendemos en nuestras tiendas propias de Vigo (Navia, Rúa Venezuela y Gregorio Espino).",
      },
      {
        pregunta: '¿Se pueden entregar edredones nórdicos y alfombras grandes en este punto?',
        respuesta:
          'Sí. En D’Passo recibimos edredones sintéticos y de plumón natural, mantas, colchas, cortinas y alfombras de cualquier formato. En nuestra central de Navia realizamos el desempolvado, lavado especializado, higienización y secado controlado.',
      },
      {
        pregunta: '¿Los precios son los mismos que en las tiendas propias de Tintorería Mimos?',
        respuesta:
          'Sí. Se aplican exactamente las mismas tarifas oficiales de Tintorería Mimos que en nuestras 3 tiendas propias de Vigo, sin recargos por recepción ni transporte desde el punto colaborador.',
      },
      {
        pregunta: '¿Puedo consultar por WhatsApp antes de llevar la prenda o pedir entrega en casa?',
        respuesta:
          'Por supuesto. Puedes escribir directamente a Mimo por WhatsApp al 655 536 844 o llamar a D’Passo al 986 23 06 43. Si después prefieres que te entreguemos los encargos limpios en tu domicilio o trabajo en Vigo, también puedes coordinarlo con Mimo por WhatsApp.',
      },
    ];
    graph.push(
      ORGANIZATION_SCHEMA,
      {
        '@type': 'Service',
        '@id': `${meta.canonical}#servicio`,
        name: "Punto Colaborador Oficial Tintorería Mimos en D'Passo (Vigo)",
        description: meta.description,
        provider: { '@id': 'https://www.tintoreriamimos.es/#organization' },
        areaServed: { '@type': 'City', name: 'Vigo' },
        url: meta.canonical,
      },
      {
        '@type': 'FAQPage',
        mainEntity: dpassoFaqs.map((f) => ({
          '@type': 'Question',
          name: f.pregunta,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.respuesta,
          },
        })),
      }
    );
  } else if (cleanPath === '/zonas/vigo') {
    const zonaVigo = ZONAS_SEO_LOCAL.find((z) => z.url === '/zonas/vigo');
    graph.push(
      ORGANIZATION_SCHEMA,
      TIENDA_NAVIA_SCHEMA,
      TIENDA_GREGORIO_ESPINO_SCHEMA,
      TIENDA_VENEZUELA_SCHEMA
    );
    if (zonaVigo?.preguntasFrecuentes && zonaVigo.preguntasFrecuentes.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: zonaVigo.preguntasFrecuentes.map((f) => ({
          '@type': 'Question',
          name: f.pregunta,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.respuesta,
          },
        })),
      });
    }
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
  } else if (cleanPath === '/reparacion-alfombras-vigo') {
    graph.push(
      ORGANIZATION_SCHEMA,
      {
        '@type': 'Service',
        '@id': `${meta.canonical}#servicio`,
        name: SERVICIO_REPARACION_ALFOMBRAS_DATA.h1,
        description: meta.description,
        provider: { '@id': 'https://www.tintoreriamimos.es/#organization' },
        areaServed: meta.areaServed || [
          { '@type': 'City', name: 'Vigo' },
          { '@type': 'City', name: 'Redondela' },
          { '@type': 'City', name: 'Gondomar' },
          { '@type': 'City', name: 'Ponteareas' },
          { '@type': 'City', name: 'O Porriño' },
        ],
        url: meta.canonical,
      },
      {
        '@type': 'FAQPage',
        mainEntity: SERVICIO_REPARACION_ALFOMBRAS_DATA.preguntasFrecuentes.map((f) => ({
          '@type': 'Question',
          name: f.pregunta,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.respuesta,
          },
        })),
      }
    );
  } else if (cleanPath === '/limpieza-pieles-cuero-vigo') {
    graph.push(
      ORGANIZATION_SCHEMA,
      {
        '@type': 'Service',
        '@id': `${meta.canonical}#servicio`,
        name: SERVICIO_PIELES_DATA.h1,
        description: meta.description,
        provider: { '@id': 'https://www.tintoreriamimos.es/#organization' },
        areaServed: { '@type': 'City', name: 'Vigo' },
        url: meta.canonical,
      },
      {
        '@type': 'FAQPage',
        mainEntity: SERVICIO_PIELES_DATA.preguntasFrecuentes.map((f) => ({
          '@type': 'Question',
          name: f.pregunta,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.respuesta,
          },
        })),
      }
    );
  } else if (cleanPath === '/limpieza-vestidos-novia-ceremonia-vigo') {
    graph.push(
      ORGANIZATION_SCHEMA,
      {
        '@type': 'Service',
        '@id': `${meta.canonical}#servicio`,
        name: SERVICIO_NOVIA_CEREMONIA_DATA.h1,
        description: meta.description,
        provider: { '@id': 'https://www.tintoreriamimos.es/#organization' },
        areaServed: meta.areaServed || [
          { '@type': 'City', name: 'Vigo' },
          { '@type': 'City', name: 'Redondela' },
          { '@type': 'City', name: 'Gondomar' },
          { '@type': 'City', name: 'Ponteareas' },
          { '@type': 'City', name: 'O Porriño' },
        ],
        url: meta.canonical,
      },
      {
        '@type': 'FAQPage',
        mainEntity: SERVICIO_NOVIA_CEREMONIA_DATA.preguntasFrecuentes.map((f) => ({
          '@type': 'Question',
          name: f.pregunta,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.respuesta,
          },
        })),
      }
    );
  } else if (cleanPath === '/textiles-hogar-vigo') {
    graph.push(
      ORGANIZATION_SCHEMA,
      {
        '@type': 'Service',
        '@id': `${meta.canonical}#servicio`,
        name: SERVICIO_TEXTILES_HOGAR_DATA.h1,
        description: meta.description,
        provider: { '@id': 'https://www.tintoreriamimos.es/#organization' },
        areaServed: meta.areaServed || [
          { '@type': 'City', name: 'Vigo' },
          { '@type': 'City', name: 'Redondela' },
          { '@type': 'City', name: 'Gondomar' },
          { '@type': 'City', name: 'Ponteareas' },
          { '@type': 'City', name: 'O Porriño' },
        ],
        url: meta.canonical,
      },
      {
        '@type': 'FAQPage',
        mainEntity: SERVICIO_TEXTILES_HOGAR_DATA.preguntasFrecuentes.map((f) => ({
          '@type': 'Question',
          name: f.pregunta,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.respuesta,
          },
        })),
      }
    );
  } else if (cleanPath === '/limpieza-sofas-vigo') {
    const sofaFaqs = [
      {
        pregunta: '1. ¿La limpieza del sofá se hace en mi propia casa o os lo lleváis?',
        respuesta:
          'La limpieza de sofás y tapicerías fijas se realiza al 100 % en tu domicilio o negocio mediante equipo portátil profesional, sin desmontar estructuras ni trasladar muebles. Si tu sofá tiene fundas desenfundables lavables, también podemos tratarlas en nuestras instalaciones de Vigo.',
      },
      {
        pregunta: '2. ¿Cómo sé el precio de limpiar mi sofá o mis sillas?',
        respuesta:
          'No publicamos tarifas estándar cerradas porque el presupuesto depende del número de plazas o piezas, el tipo de tejido, el estado de las manchas y la localidad (sujeto a importe mínimo de visita a consultar). Envía tus fotos a Mimo por WhatsApp para recibir valoración personalizada.',
      },
      {
        pregunta: '3. ¿Cómo seca el sofá y cuánto tiempo tarda?',
        respuesta:
          'Durante el servicio extraemos la mayor parte de la humedad aplicada, pero no utilizamos secadores de aire caliente ni ventiladores industriales: la tapicería termina de secar de forma natural al aire. El tiempo depende del grosor de la tela, la humedad ambiental y la ventilación de la estancia; te indicaremos cuándo volver a sentarte.',
      },
      {
        pregunta: '4. ¿Qué métodos utilizáis? ¿Usáis vapor seco u ozono?',
        respuesta:
          'Trabajamos principalmente mediante aspirado profundo en seco, pretratamiento localizado e inyección-extracción controlada (o limpieza de baja humedad / en seco en tejidos código S que no admiten agua). No aplicamos vapor seco ni tratamientos gaseosos de ozono ni procesos enzimáticos en domicilio.',
      },
      {
        pregunta: '5. ¿Desaparecen todas las manchas antiguas, de tinta o remediadas en casa?',
        respuesta:
          'Cada mancha se valora con franqueza tras ver tus fotos. Las manchas recientes habituales suelen mejorar notablemente; sin embargo, tintas fijadas, transferencia vaquera, humedad incrustada en la espuma interior o cercos ya tratados con lejía, amoníaco, vinagre o bicarbonato pueden dejar marca permanente.',
      },
      {
        pregunta: '6. ¿Los productos son seguros para bebés, alérgicos y mascotas?',
        respuesta:
          'Sí. Empleamos formulaciones profesionales de pH equilibrado que se aclaran y extraen mecánicamente durante el proceso, evitando residuos pegajosos. Una vez que el tejido ha secado por completo al aire con ventilación natural, es seguro para toda la familia y mascotas.',
      },
      {
        pregunta: '7. ¿Qué necesitáis en casa el día de la cita y cuánto dura?',
        respuesta:
          'Solo necesitamos acceso a una toma de corriente doméstica, un punto de agua, algo de espacio alrededor del mueble, posibilidad de ventilar la habitación y una persona responsable al inicio y al final. La duración habitual ronda entre 1 y 2 horas según tamaño y estado.',
      },
      {
        pregunta: '8. ¿Limpiáis tapicerías de coches o furgonetas?',
        respuesta:
          'No. Este servicio a domicilio está enfocado exclusivamente en sofás, sillones, sillas, cabeceros, colchones y mobiliario tapizado de viviendas particulares, alojamientos turísticos, oficinas y locales.',
      },
      {
        pregunta: '9. ¿En qué zonas trabajáis y con qué frecuencia conviene limpiar el sofá?',
        respuesta:
          'Atendemos Vigo y su área de influencia según ruta y condiciones de visita (a consultar con Mimo). Se recomienda una limpieza profesional anual como mantenimiento preventivo, o cada seis meses en hogares con niños pequeños, mascotas o alergias al polvo.',
      },
    ];
    graph.push(
      ORGANIZATION_SCHEMA,
      {
        '@type': 'Service',
        '@id': `${meta.canonical}#servicio`,
        name: meta.h1,
        description: meta.description,
        provider: { '@id': 'https://www.tintoreriamimos.es/#organization' },
        areaServed: { '@type': 'City', name: 'Vigo' },
        url: meta.canonical,
      },
      {
        '@type': 'FAQPage',
        mainEntity: sofaFaqs.map((f) => ({
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
  } else if (cleanPath === '/servicios-empresas') {
    graph.push(
      ORGANIZATION_SCHEMA,
      {
        '@type': 'Service',
        '@id': `${meta.canonical}#servicio`,
        name: SERVICIO_EMPRESAS_B2B_DATA.h1,
        serviceType: 'Lavandería y tintorería para empresas, peluquerías, clínicas y uniformidad laboral',
        description: meta.description,
        provider: { '@id': 'https://www.tintoreriamimos.es/#organization' },
        areaServed: meta.areaServed || [
          { '@type': 'City', name: 'Vigo' },
          { '@type': 'City', name: 'Redondela' },
          { '@type': 'City', name: 'Gondomar' },
          { '@type': 'City', name: 'Ponteareas' },
          { '@type': 'City', name: 'O Porriño' },
        ],
        url: meta.canonical,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: SERVICIO_EMPRESAS_B2B_DATA.sectoresTitulo,
          itemListElement: SERVICIO_EMPRESAS_B2B_DATA.sectores.map((sec) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: `${sec.etiqueta}: ${sec.titulo}`,
              description: sec.descripcion,
            },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: SERVICIO_EMPRESAS_B2B_DATA.preguntasFrecuentes.map((f) => ({
          '@type': 'Question',
          name: f.pregunta,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.respuesta,
          },
        })),
      }
    );
  } else if (cleanPath === '/limpieza-incendios-siniestros-vigo') {
    graph.push(
      ORGANIZATION_SCHEMA,
      {
        '@type': 'Service',
        '@id': `${meta.canonical}#servicio`,
        name: meta.h1,
        serviceType: 'Recuperación y descontaminación textil tras incendios, humo e inundaciones',
        description: meta.description,
        provider: { '@id': 'https://www.tintoreriamimos.es/#organization' },
        areaServed: meta.areaServed || [
          { '@type': 'City', name: 'Vigo' },
          { '@type': 'City', name: 'Redondela' },
          { '@type': 'City', name: 'Gondomar' },
          { '@type': 'City', name: 'Ponteareas' },
          { '@type': 'City', name: 'O Porriño' },
        ],
        url: meta.canonical,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Protocolos técnicos de recuperación textil tras siniestros en Vigo',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Descontaminación y desodorización de ropa y textiles tras incendio, humo y hollín',
                description:
                  'Aspiración mecánica en seco, desengrase lipofílico, neutralización molecular y tratamiento en Dry Cleaning o Wet Cleaning según fibra y origen del residuo.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Rescate e higienización de textiles afectados por agua e inundaciones (Categorías 1 y 2)',
                description:
                  'Separación de tintes, lavado desinfectante y secado controlado en instalaciones de Vigo frente a la humedad ambiental.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Prueba técnica de viabilidad previa y lote prioritario de urgencia',
                description:
                  'Test puntual en prendas críticas antes de facturar el grueso del lote y adelanto de vestuario de trabajo o uniformes escolares.',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Expediente pericial Art. 38 LCS, certificado de pérdida total y factura oficial con CIF',
                description:
                  'Presupuesto previo cerrado tras revisar el lote, inventario desglosado, certificado técnico de prendas irrecuperables y factura oficial de Tintorería Mimos Navia, S.L. (CIF B27755925).',
              },
            },
          ],
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: SERVICIO_SINIESTROS_FAQS.map((f) => ({
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
      const detalle = servicio ? SERVICIO_DETALLE_ENRIQUECIDO[servicio.id] : undefined;
      const serviceNode: Record<string, unknown> = {
        '@type': 'Service',
        '@id': `${meta.canonical}#servicio`,
        name: meta.h1,
        description: meta.description,
        provider: { '@id': 'https://www.tintoreriamimos.es/#organization' },
        areaServed: meta.areaServed || { '@type': 'City', name: 'Vigo' },
        url: meta.canonical,
      };
      if (detalle) {
        serviceNode.serviceType = servicio?.titulo ?? meta.h1;
        serviceNode.hasOfferCatalog = {
          '@type': 'OfferCatalog',
          name: detalle.modalidadesTitulo,
          itemListElement: detalle.modalidades.map((m) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: m.titulo,
              description: m.descripcion,
            },
          })),
        };
      }
      graph.push(ORGANIZATION_SCHEMA, serviceNode);

      if (detalle && detalle.preguntasFrecuentes.length > 0) {
        graph.push({
          '@type': 'FAQPage',
          mainEntity: detalle.preguntasFrecuentes.map((f) => ({
            '@type': 'Question',
            name: f.pregunta,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.respuesta,
            },
          })),
        });
      }
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
