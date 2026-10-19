/**
 * Fuente única de verdad para los metadatos SEO, OpenGraph y AEO de todas las rutas de Tintorería Mimos.
 * Consumido por el servidor Express (server.ts), el prerenderizador estático (prerender-routes),
 * el generador de sitemap y el cliente React.
 */

export interface BreadcrumbParent {
  name: string;
  url: string;
}

export interface CityArea {
  '@type': 'City';
  name: string;
}

export interface RouteMeta {
  title: string;
  h1: string;
  description: string;
  canonical: string;
  robots: 'index, follow' | 'noindex, nofollow';
  ogType: 'website' | 'article';
  breadcrumbName: string;
  breadcrumbParent?: BreadcrumbParent;
  ogImage?: string;
  areaServed?: CityArea | CityArea[];
}

export const ROUTE_SEO_MAP: Record<string, RouteMeta> = {
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
    title: 'Limpieza y Reparación de Alfombras en Vigo con Recogida a Domicilio | Mimos',
    h1: 'Limpieza y reparación de alfombras en Vigo con recogida y entrega a domicilio',
    description:
      'Servicio profesional de limpieza y reparación de alfombras en Vigo con recogida y entrega a domicilio o en nuestras 3 tiendas propias. Pide presupuesto con Mimo.',
    canonical: 'https://www.tintoreriamimos.es/limpieza-alfombras-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Limpieza de alfombras en Vigo',
  },
  '/limpieza-pieles-cuero-vigo': {
    title: 'Limpieza de Pieles, Cuero, Ante y Nobuk en Vigo | Tintorería Mimos',
    h1: 'Limpieza especializada de pieles, cuero, ante y nobuk en Vigo',
    description:
      'Servicio especializado de limpieza y cuidado de prendas de piel, cuero, ante, nobuk y peletería en Vigo. Recepción en tiendas propias, puntos colaboradores o a domicilio.',
    canonical: 'https://www.tintoreriamimos.es/limpieza-pieles-cuero-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Limpieza de pieles y cuero',
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
    areaServed: [
      { '@type': 'City', name: 'Vigo' },
      { '@type': 'City', name: 'Gondomar' },
      { '@type': 'City', name: 'Ponteareas' },
      { '@type': 'City', name: 'O Porriño' },
    ],
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
    breadcrumbName: 'Recogida a domicilio',
  },
  '/limpieza-profesional-vigo': {
    title: 'Empresa de Limpieza Profesional en Vigo | Limpieza Mimos',
    h1: 'Servicios profesionales de limpieza en Vigo para empresas, comunidades y particulares',
    description:
      'Empresa de limpieza profesional en Vigo para comunidades, oficinas, comercios, fin de obra, garajes y viviendas. Pide presupuesto sin compromiso.',
    canonical: 'https://www.tintoreriamimos.es/limpieza-profesional-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Limpieza profesional en Vigo',
  },
  '/limpieza-apartamentos-turisticos-vigo': {
    title: 'Limpieza de Apartamentos Turísticos en Vigo | Lavandería y Cambio Textil | Mimos',
    h1: 'Limpieza integral y gestión textil para apartamentos turísticos en Vigo',
    description:
      'Servicio especializado de limpieza, higienización y gestión de sábanas y toallas para alojamientos turísticos y vacacionales en Vigo. Check-in impecable.',
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
    title: 'Tiendas Mimos en Vigo y Red de Puntos de Recogida Colaboradores | Tintorería Mimos',
    h1: 'Red de tiendas propias de Tintorería Mimos en Vigo y puntos colaboradores',
    description:
      'Consulta las 3 tiendas propias de Tintorería Mimos en Vigo y los 5 puntos de recogida en establecimientos colaboradores en Redondela, Gondomar, Ponteareas, O Porriño y Vigo (D\'Passo).',
    canonical: 'https://www.tintoreriamimos.es/puntos-mimos',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Tiendas y Puntos Mimos',
  },
  '/tienda-mimos-gregorio-espino-vigo': {
    title: 'Mimos Gregorio Espino Vigo | Tintorería, Lavandería y Taller de Costura Propio',
    h1: 'Tintorería, Lavandería y Taller Propio de Costura en Gregorio Espino (Vigo)',
    description:
      'Tienda propia de Tintorería Mimos en Alcalde Gregorio Espino 44, Vigo. Taller in situ de costura y modistería, limpieza de alfombras, tintorería, edredones y colada con carga y descarga fácil.',
    canonical: 'https://www.tintoreriamimos.es/tienda-mimos-gregorio-espino-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Mimos Gregorio Espino',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
    areaServed: { '@type': 'City', name: 'Vigo' },
  },
  '/contacto': {
    title: 'Contacto, Tiendas en Vigo y Horarios | Tintorería Mimos Navia',
    h1: 'Contacto, tiendas propias en Vigo y horarios de Tintorería Mimos Navia',
    description:
      'Contacta con Tintorería Mimos Navia en C/ As Teixugueiras, 11, local 9 (36212 Vigo), teléfono 986 12 51 41 y WhatsApp de Mimo 655 536 844.',
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
      'Servicio de Tintorería Mimos disponible en Mimos Redondela (C/ José Regojo, 29 bajo), establecimiento colaborador en Redondela. Recogida y entrega de prendas.',
    canonical: 'https://www.tintoreriamimos.es/zonas/redondela',
    robots: 'noindex, nofollow',
    ogType: 'website',
    breadcrumbName: 'Redondela',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
    areaServed: { '@type': 'City', name: 'Redondela' },
  },
  '/zonas/gondomar': {
    title: 'Tintorería, Lavandería y Costura en Gondomar | Punto Mimos en Puntadas No Aire',
    h1: 'Servicio de tintorería, lavandería y arreglos de ropa en Gondomar (Val Miñor)',
    description:
      'Punto colaborador de Tintorería Mimos y arreglos de ropa disponible en Puntadas No Aire (Avda. Elduayen, 9, Gondomar). Recogida y entrega de prendas y costura confirmada.',
    canonical: 'https://www.tintoreriamimos.es/zonas/gondomar',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Gondomar',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
    areaServed: { '@type': 'City', name: 'Gondomar' },
  },
  '/zonas/ponteareas': {
    title: 'Tintorería, Lavandería y Costura en Ponteareas | Punto Mimos en Arregla2',
    h1: 'Servicio de tintorería, lavandería y arreglos de ropa en Ponteareas',
    description:
      'Punto colaborador de Tintorería Mimos y arreglos de ropa disponible en Arregla2 (C/ Argentina, 4, Ponteareas). Recogida y entrega de prendas y costura confirmada.',
    canonical: 'https://www.tintoreriamimos.es/zonas/ponteareas',
    robots: 'noindex, nofollow',
    ogType: 'website',
    breadcrumbName: 'Ponteareas',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
    areaServed: { '@type': 'City', name: 'Ponteareas' },
  },
  '/zonas/o-porrino': {
    title: 'Tintorería, Lavandería y Costura en O Porriño | Punto Mimos en Telas y Más',
    h1: 'Servicio de tintorería, lavandería y arreglos de ropa en O Porriño',
    description:
      'Punto colaborador de Tintorería Mimos y arreglos de ropa disponible en Telas y Más (C/ Manuel Rodríguez, 30, O Porriño). Recogida y entrega de prendas y costura confirmada.',
    canonical: 'https://www.tintoreriamimos.es/zonas/o-porrino',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'O Porriño',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
    areaServed: { '@type': 'City', name: 'O Porriño' },
  },
  '/zonas/vigo': {
    title: 'Tiendas Propias de Tintorería Mimos en Vigo | Navia, Venezuela y Gregorio Espino',
    h1: 'Nuestras 3 tiendas propias en Vigo y servicio de recogida a domicilio',
    description:
      'Conoce nuestras 3 tiendas propias de Tintorería Mimos en Vigo (Teixugueiras, Venezuela y Gregorio Espino) con todos los servicios y costura, además del servicio de recogida a domicilio.',
    canonical: 'https://www.tintoreriamimos.es/zonas/vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Vigo',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
    areaServed: { '@type': 'City', name: 'Vigo' },
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
    breadcrumbName: 'Cómo quitar una mancha de vino tinto',
    breadcrumbParent: {
      name: 'Blog y Guías',
      url: 'https://www.tintoreriamimos.es/blog',
    },
  },
  '/blog/como-lavar-edredon-de-plumas-guia-practica': {
    title: 'Cómo lavar un edredón de plumas: guía práctica | Tintorería Mimos',
    h1: 'Cómo lavar un edredón de plumas sin estropearlo: guía paso a paso',
    description:
      'Consejos profesionales para lavar y secar un edredón de plumas o plumón: capacidad del tambor, secado correcto para evitar apelmazamiento y ventajas de la higienización profesional.',
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
    title: 'Significado de los símbolos de las etiquetas de la ropa | Mimos',
    h1: 'Guía práctica de los símbolos de lavado y cuidado en las etiquetas de tu ropa',
    description:
      'Aprende a interpretar los símbolos de lavado, lejía, secado, planchado y limpieza en seco de tus prendas para evitar desteñidos y encogimientos.',
    canonical:
      'https://www.tintoreriamimos.es/blog/guia-simbolos-etiquetas-ropa-significado',
    robots: 'index, follow',
    ogType: 'article',
    breadcrumbName: 'Símbolos de las etiquetas de la ropa',
    breadcrumbParent: {
      name: 'Blog y Guías',
      url: 'https://www.tintoreriamimos.es/blog',
    },
  },
  '/blog/como-preparar-apartamento-turistico-entre-huespedes': {
    title: 'Cómo preparar un apartamento turístico entre huéspedes | Mimos Vigo',
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
  '/blog/la-colada-en-casa': {
    title: 'La colada en casa: ¿Ahorro o pérdida de tiempo? | Tintorería Mimos Vigo',
    h1: 'La colada en casa: ¿Ahorro o pérdida de tiempo y calidad?',
    description:
      '¿Compensa hacer la colada en casa o en autoservicio? Analizamos el tiempo del fin de semana, el coste de energía, el desgaste textil y las ventajas de externalizar el lavado profesional.',
    canonical: 'https://www.tintoreriamimos.es/blog/la-colada-en-casa',
    robots: 'index, follow',
    ogType: 'article',
    breadcrumbName: 'La colada en casa: ¿Ahorro o pérdida de tiempo?',
    breadcrumbParent: {
      name: 'Blog y Guías',
      url: 'https://www.tintoreriamimos.es/blog',
    },
  },
  '/blog/montar-tu-propia-tintoreria-lavanderia': {
    title: 'Montar una Tintorería o Lavandería Moderna: Claves y Rentabilidad | Tintorería Mimos',
    h1: 'Montar tu propia tintorería o lavandería: las claves de un negocio moderno',
    description:
      '¿Pensando en abrir una tintorería o lavandería? Analizamos costes reales, wetcleaning vs seco, hábitos de consumo, tecnología RFID, taquillas inteligentes y el modelo de éxito de Mimos.',
    canonical: 'https://www.tintoreriamimos.es/blog/montar-tu-propia-tintoreria-lavanderia',
    robots: 'index, follow',
    ogType: 'article',
    breadcrumbName: 'Montar una tintorería o lavandería moderna',
    breadcrumbParent: {
      name: 'Blog y Guías',
      url: 'https://www.tintoreriamimos.es/blog',
    },
    ogImage: 'https://www.tintoreriamimos.es/blog-montar-tintoreria.jpg',
  },
  '/aviso-legal': {
    title: 'Aviso Legal | Tintorería Mimos Navia, S.L. (Vigo)',
    h1: 'Aviso Legal – Tintorería Mimos Navia, S.L.',
    description:
      'Información legal e identificativa de Tintorería Mimos Navia, S.L., con domicilio en C/ As Teixugueiras, 11, local 9, 36212 Vigo.',
    canonical: 'https://www.tintoreriamimos.es/aviso-legal',
    robots: 'noindex, nofollow',
    ogType: 'website',
    breadcrumbName: 'Aviso Legal',
  },
  '/privacidad': {
    title: 'Política de Privacidad | Tintorería Mimos Navia, S.L. (Vigo)',
    h1: 'Política de Privacidad – Tintorería Mimos Navia, S.L.',
    description:
      'Política de protección de datos personales y privacidad de Tintorería Mimos Navia, S.L. en Vigo.',
    canonical: 'https://www.tintoreriamimos.es/privacidad',
    robots: 'noindex, nofollow',
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
  '/feder': {
    title: 'FEDER – Programa Re-Acciona TIC (Empresa Dixital) | Tintorería Mimos Navia',
    h1: 'FEDER — Programa Re-Acciona TIC (Empresa Dixital)',
    description:
      'Publicidad institucional del Programa Re-Acciona TIC (Empresa Dixital), operación cofinanciada por la Unión Europea (Programa Operativo FEDER Galicia 2014-2020) en Tintorería Mimos Navia, S.L.',
    canonical: 'https://www.tintoreriamimos.es/feder',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'FEDER',
  },
  '/programa-bono-energia-peme-2025-in417z': {
    title: 'Programa Bono Energía Peme 2025: IN417Z | Tintorería Mimos Navia',
    h1: 'Programa Bono Energía Peme 2025: IN417Z — Sustitución de Secadora Girbau STI-23 por Secadora Domus DTT2-18 E',
    description:
      'Convocatoria de Subvencións do Instituto Enerxético de Galicia (INEGA) para proxectos de Mellora Enerxética (Programa Bono enerxía Peme 2025: IN417Z) — Sustitución de secadora Girbau STI-23 por secadora Domus DTT2-18 E.',
    canonical: 'https://www.tintoreriamimos.es/programa-bono-energia-peme-2025-in417z',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Programa Bono Energía Peme 2025: IN417Z',
  },
  '/empleo-unete-a-nosotros': {
    title: 'Empleo – Únete a Nosotros | Trabaja en Tintorería Mimos (Vigo)',
    h1: 'Empleo — Únete a nosotros en Tintorería Mimos (Vigo)',
    description:
      'Bolsa de empleo de Tintorería Mimos en Vigo: buscamos personal de tintorería (atención al público, desmanchado, lavado y planchado) y personal de limpieza a domicilio.',
    canonical: 'https://www.tintoreriamimos.es/empleo-unete-a-nosotros',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Empleo — Únete a nosotros',
  },
};

export const ALL_ROUTE_PATHS = Object.keys(ROUTE_SEO_MAP);

export function getRouteMeta(path: string): RouteMeta | undefined {
  return ROUTE_SEO_MAP[path];
}
