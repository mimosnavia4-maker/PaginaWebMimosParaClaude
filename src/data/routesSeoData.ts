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
  robots: 'index, follow' | 'noindex, nofollow' | 'noindex, follow';
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
      'Tintorería, lavandería, costura con 18 arreglos, limpieza de sofás a domicilio, limpieza y arreglo de alfombras y limpieza profesional en Vigo.',
    canonical: 'https://www.tintoreriamimos.es/',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Inicio',
  },
  '/limpieza-alfombras-vigo': {
    title: 'Limpieza de Alfombras en Vigo con Recogida a Domicilio | Tintorería Mimos',
    h1: 'Limpieza de alfombras en Vigo con recogida y entrega a domicilio',
    description:
      'Limpieza e higienización de alfombras en Vigo con recogida a domicilio o entrega en nuestras 3 tiendas propias. Pide presupuesto con Mimo hoy.',
    canonical: 'https://www.tintoreriamimos.es/limpieza-alfombras-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Limpieza de alfombras en Vigo',
  },
  '/reparacion-alfombras-vigo': {
    title: 'Reparación de Alfombras en Vigo: Flecos, Ribetes y Bordes | Mimos',
    h1: 'Reparación y restauración de alfombras en Vigo: flecos, ribetes y bordes',
    description:
      'Reparación de flecos, festón lateral y ribetes en alfombras en Vigo con restaurador colaborador. Contrata solo arreglo o limpieza + reparación.',
    canonical: 'https://www.tintoreriamimos.es/reparacion-alfombras-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Reparación de alfombras en Vigo',
    breadcrumbParent: {
      name: 'Limpieza de alfombras',
      url: 'https://www.tintoreriamimos.es/limpieza-alfombras-vigo',
    },
    areaServed: [
      { '@type': 'City', name: 'Vigo' },
      { '@type': 'City', name: 'Redondela' },
      { '@type': 'City', name: 'Gondomar' },
      { '@type': 'City', name: 'Ponteareas' },
      { '@type': 'City', name: 'O Porriño' },
    ],
  },
  '/limpieza-pieles-cuero-vigo': {
    title: 'Limpieza de Pieles, Cuero, Ante y Nobuk en Vigo | Tintorería Mimos',
    h1: 'Limpieza especializada de pieles, cuero, ante y nobuk en Vigo',
    description:
      'Limpieza especializada de cuero, ante, nobuk, doble faz y peletería en Vigo. Nutrición, acabado y valoración previa por foto con Mimo o en tienda.',
    canonical: 'https://www.tintoreriamimos.es/limpieza-pieles-cuero-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Limpieza de pieles y cuero',
  },
  '/arreglos-de-ropa-vigo': {
    title: 'Arreglos de Ropa en Vigo: Costura y Composturas Profesionales | Mimos',
    h1: 'Arreglos de ropa en Vigo: costura y composturas profesionales',
    description:
      'Taller propio de costura en Vigo en Gregorio Espino y Venezuela (modistería in situ), recepción en Navia y puntos colaboradores con costura.',
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
    title: 'Tintorería Profesional en Vigo | Wet Cleaning, Seco y Ceremonia | Mimos',
    h1: 'Tintorería profesional en Vigo para prendas delicadas, trajes y ceremonia',
    description:
      'Tintorería en Vigo con Wet Cleaning, limpieza en seco y desmanchado técnico para trajes, abrigos, sedas y ceremonia. Consulta tu precio con Mimo.',
    canonical: 'https://www.tintoreriamimos.es/tintoreria-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Tintorería profesional en Vigo',
    areaServed: [
      { '@type': 'City', name: 'Vigo' },
      { '@type': 'City', name: 'Redondela' },
      { '@type': 'City', name: 'Gondomar' },
      { '@type': 'City', name: 'Ponteareas' },
      { '@type': 'City', name: 'O Porriño' },
    ],
  },
  '/limpieza-vestidos-novia-ceremonia-vigo': {
    title: 'Limpieza de Vestidos de Novia, Fiesta, Comunión y Bautizo en Vigo | Mimos',
    h1: 'Limpieza, costura y cuidado artesanal de vestidos de novia, fiesta, comunión y bautizo en Vigo',
    description:
      'Puesta a punto y limpieza artesanal de vestidos de novia, fiesta, comunión, bautizo y chaqués en Vigo. Taller propio de costura y entrega en funda.',
    canonical: 'https://www.tintoreriamimos.es/limpieza-vestidos-novia-ceremonia-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Vestidos de novia y ceremonia',
    breadcrumbParent: {
      name: 'Tintorería profesional',
      url: 'https://www.tintoreriamimos.es/tintoreria-vigo',
    },
    areaServed: [
      { '@type': 'City', name: 'Vigo' },
      { '@type': 'City', name: 'Redondela' },
      { '@type': 'City', name: 'Gondomar' },
      { '@type': 'City', name: 'Ponteareas' },
      { '@type': 'City', name: 'O Porriño' },
    ],
  },
  '/lavanderia-vigo': {
    title: 'Lavandería Profesional en Vigo: Plumíferos y Técnica | Mimos',
    h1: 'Lavandería profesional atendida en Vigo para tus prendas técnicas, delicadas y de abrigo',
    description:
      'Lavandería 100 % atendida en Vigo (sin monedas): plumíferos, anoraks, cazadoras impermeables, jerséis delicados y secado anti-humedad en planta de Navia.',
    canonical: 'https://www.tintoreriamimos.es/lavanderia-vigo',
    robots: 'index, follow',
    ogType: 'website',
    ogImage: 'https://www.tintoreriamimos.es/images/navia/planta-planchado-mimos-navia-vigo.jpg',
    breadcrumbName: 'Lavandería profesional en Vigo',
    areaServed: [
      { '@type': 'City', name: 'Vigo' },
      { '@type': 'City', name: 'Redondela' },
      { '@type': 'City', name: 'Gondomar' },
      { '@type': 'City', name: 'Ponteareas' },
      { '@type': 'City', name: 'O Porriño' },
    ],
  },
  '/planchado-vigo': {
    title: 'Servicio de Planchado Profesional en Vigo | Solo Planchado en Percha o Doblado | Mimos',
    h1: 'Servicio de planchado profesional en Vigo para prendas impecables',
    description:
      'Solo planchado profesional o lavado y planchado en Vigo para camisas, pantalones, trajes y hogar. Entrega en percha o doblada sin brillos.',
    canonical: 'https://www.tintoreriamimos.es/planchado-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Planchado profesional en Vigo',
    areaServed: [
      { '@type': 'City', name: 'Vigo' },
      { '@type': 'City', name: 'Redondela' },
      { '@type': 'City', name: 'Gondomar' },
      { '@type': 'City', name: 'Ponteareas' },
      { '@type': 'City', name: 'O Porriño' },
    ],
  },
  '/colada-familiar-vigo': {
    title: 'Colada Familiar en Vigo | Lavar y Doblar o Lavar y Planchar | Mimos',
    h1: 'Colada familiar en Vigo: lavar y doblar, lavar y planchar o combinada por prenda',
    description:
      'Colada familiar en Vigo: lavar y doblar, lavar y planchar o combinada por prenda. Secado completo anti-humedad listo para tu armario.',
    canonical: 'https://www.tintoreriamimos.es/colada-familiar-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Colada familiar en Vigo',
    areaServed: [
      { '@type': 'City', name: 'Vigo' },
      { '@type': 'City', name: 'Redondela' },
      { '@type': 'City', name: 'Gondomar' },
      { '@type': 'City', name: 'Ponteareas' },
      { '@type': 'City', name: 'O Porriño' },
    ],
  },
  '/textiles-hogar-vigo': {
    title: 'Limpieza de Edredones, Mantas, Cortinas y Estores en Vigo | Mimos',
    h1: 'Limpieza y secado en gran formato de edredones, mantas, cortinas y estores en Vigo',
    description:
      'Lavado y secado de edredones de plumas y sintéticos, mantas, colchas, cortinas con desmontaje a domicilio, estores de tela y fundas en Vigo.',
    canonical: 'https://www.tintoreriamimos.es/textiles-hogar-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Textiles del hogar en Vigo',
  },
  '/limpieza-sofas-vigo': {
    title: 'Limpieza de Sofás y Tapicerías a Domicilio en Vigo | Tintorería Mimos',
    h1: 'Limpieza de sofás y tapicerías a domicilio en Vigo',
    description:
      'Limpieza de sofás, chaiselongue, sillones, sillas y cabeceros tapizados a domicilio en Vigo por inyección-extracción. Pide presupuesto con foto.',
    canonical: 'https://www.tintoreriamimos.es/limpieza-sofas-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Limpieza de sofás en Vigo',
    breadcrumbParent: {
      name: 'Limpieza profesional',
      url: 'https://www.tintoreriamimos.es/limpieza-profesional-vigo',
    },
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
    title: 'Limpieza de Oficinas, Comunidades y Locales en Vigo | Mimos',
    h1: 'Limpieza profesional de oficinas, comunidades, locales y sofás a domicilio en Vigo',
    description:
      'Limpieza profesional de oficinas, despachos, comunidades de vecinos, locales comerciales y sofás a domicilio en Vigo. Pide presupuesto hoy.',
    canonical: 'https://www.tintoreriamimos.es/limpieza-profesional-vigo',
    robots: 'index, follow',
    ogType: 'website',
    ogImage: 'https://www.tintoreriamimos.es/images/articulos/personal-limpieza.jpg',
    breadcrumbName: 'Limpieza profesional en Vigo',
  },
  '/limpieza-apartamentos-turisticos-vigo': {
    title: 'Limpieza y Lavandería para Apartamentos Turísticos en Vigo | Mimos',
    h1: 'Limpieza y lavandería para apartamentos turísticos y viviendas vacacionales en Vigo',
    description:
      'Servicio de lavandería y limpieza profesional para apartamentos turísticos y viviendas vacacionales en Vigo. Pide presupuesto personalizado con Mimo.',
    canonical:
      'https://www.tintoreriamimos.es/limpieza-apartamentos-turisticos-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Apartamentos turísticos en Vigo',
  },
  '/servicios-empresas': {
    title: 'Lavandería Empresas, Peluquerías y Clínicas Vigo | Mimos',
    h1: 'Lavandería y tintorería para empresas, peluquerías y clínicas en Vigo',
    description:
      'Lavandería para empresas en Vigo: toallas, batas y uniformes propios en lotes separados, sin renting impuesto. 3 tiendas o recogida y factura mensual con CIF.',
    canonical: 'https://www.tintoreriamimos.es/servicios-empresas',
    robots: 'index, follow',
    ogType: 'website',
    ogImage: 'https://www.tintoreriamimos.es/images/navia/planta-planchado-mimos-navia-vigo.jpg',
    breadcrumbName: 'Lavandería para empresas',
  },
  '/limpieza-incendios-siniestros-vigo': {
    title: 'Limpieza Ropa Incendios y Humo Vigo | Seguros · Mimos',
    h1: 'Recuperación textil tras incendios, humo e inundaciones en Vigo',
    description:
      'Recuperación textil tras incendios, humo e inundaciones en Vigo. Prueba de viabilidad previa, lote prioritario y factura con CIF para tu seguro.',
    canonical: 'https://www.tintoreriamimos.es/limpieza-incendios-siniestros-vigo',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Recuperación textil tras incendios y siniestros',
    breadcrumbParent: {
      name: 'Tintorería profesional',
      url: 'https://www.tintoreriamimos.es/tintoreria-vigo',
    },
    ogImage: 'https://www.tintoreriamimos.es/images/articulos/blog-siniestros-incendio.jpg',
    areaServed: [
      { '@type': 'City', name: 'Vigo' },
      { '@type': 'City', name: 'Redondela' },
      { '@type': 'City', name: 'Gondomar' },
      { '@type': 'City', name: 'Ponteareas' },
      { '@type': 'City', name: 'O Porriño' },
    ],
  },
  '/puntos-mimos': {
    title: 'Tiendas Mimos en Vigo y Red de Puntos de Recogida Colaboradores | Tintorería Mimos',
    h1: 'Red de tiendas propias de Tintorería Mimos en Vigo y puntos colaboradores',
    description:
      'Consulta las 3 tiendas propias de Mimos en Vigo y los 5 puntos colaboradores en Redondela, Gondomar, Ponteareas, O Porriño y As Travesas.',
    canonical: 'https://www.tintoreriamimos.es/puntos-mimos',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Tiendas y Puntos Mimos',
  },
  '/tienda-mimos-navia-vigo': {
    title: 'Tintorería Mimos Navia (Sede Central Vigo) | C/ Teixugueiras 11',
    h1: 'Tintorería Mimos Navia – Sede Central en Vigo',
    description:
      'Sede central de Tintorería Mimos en C/ Teixugueiras 11, bajo 9, Navia (Vigo). Tintorería, colada, edredones, alfombras y recepción de costura.',
    canonical: 'https://www.tintoreriamimos.es/tienda-mimos-navia-vigo',
    robots: 'index, follow',
    ogType: 'website',
    ogImage: 'https://www.tintoreriamimos.es/images/navia/fachada-mimos-navia-vigo.jpg',
    breadcrumbName: 'Mimos Navia (Central)',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
    areaServed: { '@type': 'City', name: 'Vigo' },
  },
  '/tienda-mimos-gregorio-espino-vigo': {
    title: 'Mimos Gregorio Espino 42 (Vigo) | Tintorería y Costura',
    h1: 'Tintorería y Costura Mimos Gregorio Espino (Vigo)',
    description:
      'Tienda propia Mimos en Alcalde Gregorio Espino 42, Vigo. Taller propio de costura y modistería in situ, limpieza de alfombras, tintorería y colada.',
    canonical: 'https://www.tintoreriamimos.es/tienda-mimos-gregorio-espino-vigo',
    robots: 'index, follow',
    ogType: 'website',
    ogImage:
      'https://www.tintoreriamimos.es/images/gregorio-espino/fachada-mimos-gregorio-espino-vigo.jpg',
    breadcrumbName: 'Mimos Gregorio Espino',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
    areaServed: { '@type': 'City', name: 'Vigo' },
  },
  '/punto-mimos-dpasso-vigo': {
    title: "Tintorería Mimos en D'Passo (Vigo) | Camiño Espedrigada 9",
    h1: "Tintorería y lavandería Mimos en D'Passo (Vigo · As Travesas)",
    description:
      "Punto colaborador oficial de Tintorería Mimos en Camiño Espedrigada, 9 bajo, 36210 Vigo. Recepción de tintorería, lavandería, edredones, colada y alfombras.",
    canonical: 'https://www.tintoreriamimos.es/punto-mimos-dpasso-vigo',
    robots: 'index, follow',
    ogType: 'website',
    ogImage: 'https://www.tintoreriamimos.es/images/dpasso-vigo/fachada-dpasso-vigo.jpg',
    breadcrumbName: "D'Passo (Vigo)",
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
    areaServed: { '@type': 'City', name: 'Vigo' },
  },
  '/se-punto-colaborador': {
    title: 'Sé Punto Colaborador de Tintorería Mimos | Oportunidad para Comercios',
    h1: 'Sé Punto Colaborador de Tintorería Mimos',
    description:
      'Suma tintorería profesional a tu comercio en Vigo o comarca sin inversión, con furgoneta propia, resguardos oficiales y comisiones periódicas.',
    canonical: 'https://www.tintoreriamimos.es/se-punto-colaborador',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Sé Punto Colaborador',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
    ogImage: 'https://www.tintoreriamimos.es/images/colaboradores/paso-1-recepcion-software.jpg',
  },
  '/contacto': {
    title: 'Contacto, Tiendas Propias en Vigo y Horarios | Tintorería Mimos Navia',
    h1: 'Contacto, tiendas propias en Vigo y horarios de Tintorería Mimos Navia',
    description:
      'Horarios y vías de contacto de las 3 tiendas propias de Mimos en Vigo. Teléfono 986 12 51 41 y WhatsApp para consultas sobre servicios y presupuestos.',
    canonical: 'https://www.tintoreriamimos.es/contacto',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Contacto y horarios',
  },
  '/blog': {
    title: 'Blog y Guías de Cuidado Textil | Tintorería Mimos Navia (Vigo)',
    h1: 'Guías prácticas para conservar tus prendas, textiles del hogar y alojamientos',
    description:
      'Guías prácticas de Tintorería Mimos en Vigo: quitar manchas, lavar edredones de plumas, leer etiquetas ISO y gestionar pisos turísticos.',
    canonical: 'https://www.tintoreriamimos.es/blog',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Blog y Guías',
  },
  '/zonas/redondela': {
    title: 'Servicio de Tintorería y Lavandería en Redondela | Punto Colaborador Mimos',
    h1: 'Servicio de tintorería y lavandería Mimos en Redondela',
    description:
      'Servicio de tintorería y lavandería Mimos disponible en el comercio colaborador de Redondela. Recogida y entrega de prendas tratadas en Vigo.',
    canonical: 'https://www.tintoreriamimos.es/zonas/redondela',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Redondela',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
    areaServed: { '@type': 'City', name: 'Redondela' },
  },
  '/zonas/gondomar': {
    title: 'Tintorería y Lavandería Mimos en Gondomar | Punto en Puntadas No Aire',
    h1: 'Puntadas No Aire (Gondomar)',
    description:
      'Tintorería y lavandería Mimos en Gondomar con punto de recogida en Puntadas No Aire y servicios propios de costura y arreglos. Consúltanos.',
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
    title: 'Tintorería y Lavandería Mimos en Ponteareas | Punto en Arregla2',
    h1: 'Servicio de tintorería, lavandería y arreglos de ropa en Ponteareas',
    description:
      'Tintorería y lavandería Mimos en Ponteareas con punto de recogida en Arregla2 y servicios propios de costura y composturas. Consúltanos.',
    canonical: 'https://www.tintoreriamimos.es/zonas/ponteareas',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Ponteareas',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
    areaServed: { '@type': 'City', name: 'Ponteareas' },
  },
  '/zonas/o-porrino': {
    title: 'Tintorería y Lavandería Mimos en O Porriño | Punto en Telas y Más',
    h1: 'Telas y Más (O Porriño)',
    description:
      'Tintorería y lavandería Mimos en O Porriño con punto de recogida en Telas y Más, venta de tejidos y costura del colaborador. Consúltanos.',
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
    title: 'Tiendas Tintorería Mimos en Vigo | Navia, Centro y Calvario',
    h1: 'Nuestras 3 tiendas propias en Vigo y servicio de recogida a domicilio',
    description:
      'Conoce nuestras 3 tiendas propias en Vigo (Navia, Venezuela y Gregorio Espino) con costura in situ en Gregorio Espino y Venezuela y recogida.',
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
  '/zonas/mos': {
    title: 'Tintorería y Lavandería con Recogida en Mos | Tintorería Mimos',
    h1: 'Tintorería, lavandería y limpieza de alfombras con recogida en Mos',
    description:
      'Tintorería, lavandería, alfombras y sofás en Mos mediante recogida a domicilio con Mimo o entrega en O Porriño y Vigo. Consulta ruta hoy.',
    canonical: 'https://www.tintoreriamimos.es/zonas/mos',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Mos',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
    areaServed: { '@type': 'City', name: 'Mos' },
  },
  '/zonas/nigran': {
    title: 'Tintorería y Lavandería con Recogida en Nigrán | Mimos Val Miñor',
    h1: 'Tintorería, lavandería y limpieza de alfombras en Nigrán (Val Miñor)',
    description:
      'Tintorería, lavandería, edredones, alfombras y sofás en Nigrán (Val Miñor) por recogida a domicilio o en Gondomar y Navia. Consulta con Mimo.',
    canonical: 'https://www.tintoreriamimos.es/zonas/nigran',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Nigrán',
    breadcrumbParent: {
      name: 'Tiendas y Puntos Mimos',
      url: 'https://www.tintoreriamimos.es/puntos-mimos',
    },
    areaServed: { '@type': 'City', name: 'Nigrán' },
  },
  '/blog/como-quitar-mancha-vino-tinto-ropa-delicada': {
    title: 'Cómo quitar una mancha de vino tinto en ropa delicada | Mimos Vigo',
    h1: 'Cómo quitar una mancha de vino tinto sin dañar tu ropa delicada',
    description:
      'Cómo actuar ante una mancha de vino tinto en ropa delicada: primeros minutos, errores a evitar y cuándo acudir a nuestra tintorería en Vigo.',
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
    title: 'Cómo lavar un edredón de plumas y secarlo bien | Mimos Vigo',
    h1: 'Cómo lavar un edredón de plumas: guía práctica para cuidarlo correctamente',
    description:
      'Cómo lavar un edredón de plumas paso a paso: lectura de etiqueta, capacidad de lavadora, programa adecuado y secado completo sin humedad.',
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
    title:
      'Símbolos de Lavado en Etiquetas de Ropa (ISO 3758:2023) | Mimos Vigo',
    h1: 'Guía práctica de los símbolos de lavado y etiquetas de tu ropa',
    description:
      'Guía práctica ISO 3758:2023: significado de los 5 símbolos de las etiquetas (lavado, lejía, secado, plancha y tintorería P, F, W) y consejos.',
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
    title:
      'Cómo preparar un apartamento turístico entre huéspedes | Guía Mimos Vigo',
    h1: 'Cómo organizar la limpieza y los textiles de un apartamento turístico entre huéspedes',
    description:
      'Claves para gestionar apartamentos turísticos en Vigo: rotación de sábanas y toallas, revisión en el check-out y cuidado de edredones.',
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
      '¿Compensa hacer la colada en casa o autoservicio? Analizamos tiempo, consumo eléctrico, desgaste textil y ventajas de la lavandería en Vigo.',
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
      '¿Pensando en abrir una tintorería o lavandería? Analizamos costes reales, Wet Cleaning vs seco, taquillas inteligentes y operativa textil.',
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
  '/blog/ropa-afectada-humo-incendio-siniestro-hogar': {
    title: 'Restauración Textil por Humo e Incendio en Vigo | Guía Técnica y Seguro',
    h1: 'Guía Técnica de Restauración Textil Post-Incendio: Descontaminación de Humo, Hollín y Cobertura del Seguro del Hogar en España',
    description:
      'Guía técnica para recuperar ropa y textiles dañados por humo y hollín tras un incendio en Vigo y tramitar la cobertura con tu seguro.',
    canonical: 'https://www.tintoreriamimos.es/blog/ropa-afectada-humo-incendio-siniestro-hogar',
    robots: 'index, follow',
    ogType: 'article',
    breadcrumbName: 'Restauración Textil tras Incendios',
    breadcrumbParent: {
      name: 'Blog y Guías',
      url: 'https://www.tintoreriamimos.es/blog',
    },
    ogImage: 'https://www.tintoreriamimos.es/images/articulos/blog-siniestros-incendio.jpg',
  },
  '/blog/protocolo-rotacion-apartamentos-turisticos-vigo': {
    title: 'Protocolo de Limpieza y Rotación de Pisos Turísticos en Vigo | Mimos',
    h1: 'Protocolo de rotación en apartamentos turísticos en Vigo: checklist profesional de limpieza y gestión textil',
    description:
      'Checklist operativo para anfitriones en Vigo: gestión de lencería y toallas, desinfección entre huéspedes y externalización de lavandería.',
    canonical:
      'https://www.tintoreriamimos.es/blog/protocolo-rotacion-apartamentos-turisticos-vigo',
    robots: 'index, follow',
    ogType: 'article',
    breadcrumbName: 'Protocolo de Rotación para Apartamentos',
    breadcrumbParent: {
      name: 'Blog y Guías',
      url: 'https://www.tintoreriamimos.es/blog',
    },
    ogImage: 'https://www.tintoreriamimos.es/images/articulos/blog-apartamentos-rotacion.jpg',
  },
  '/blog/limpieza-comunidades-propietarios-vigo': {
    title: 'Limpieza de Comunidades de Vecinos en Vigo | Tintorería Mimos',
    h1: 'Limpieza de comunidades de propietarios en Vigo: claves para portales, escaleras y zonas comunes impecables',
    description:
      'Consejos y frecuencias recomendadas para la limpieza de portales, escaleras, cristales y garajes en comunidades de vecinos en Vigo.',
    canonical: 'https://www.tintoreriamimos.es/blog/limpieza-comunidades-propietarios-vigo',
    robots: 'index, follow',
    ogType: 'article',
    breadcrumbName: 'Limpieza de Comunidades de Propietarios',
    breadcrumbParent: {
      name: 'Blog y Guías',
      url: 'https://www.tintoreriamimos.es/blog',
    },
    ogImage: 'https://www.tintoreriamimos.es/images/articulos/blog-limpieza-comunidades.jpg',
  },
  '/blog/limpieza-oficinas-despachos-clinicas-vigo': {
    title: 'Limpieza de Oficinas, Despachos y Clínicas en Vigo | Mimos',
    h1: 'Limpieza e higienización de oficinas, despachos y clínicas en Vigo: salud laboral y primera impresión',
    description:
      'Protocolos de limpieza periódica e higienización para oficinas, consultas médicas y locales en Vigo. Pide presupuesto personalizado con Mimo.',
    canonical: 'https://www.tintoreriamimos.es/blog/limpieza-oficinas-despachos-clinicas-vigo',
    robots: 'index, follow',
    ogType: 'article',
    breadcrumbName: 'Limpieza de Oficinas y Despachos',
    breadcrumbParent: {
      name: 'Blog y Guías',
      url: 'https://www.tintoreriamimos.es/blog',
    },
    ogImage: 'https://www.tintoreriamimos.es/images/articulos/blog-limpieza-oficinas.jpg',
  },
  '/aviso-legal': {
    title: 'Aviso Legal | Tintorería Mimos Navia, S.L. (Vigo)',
    h1: 'Aviso Legal',
    description:
      'Información legal e identificativa de Tintorería Mimos Navia, S.L., con domicilio en C/ Teixugueiras, 11, bajo 9, 36212 Vigo.',
    canonical: 'https://www.tintoreriamimos.es/aviso-legal',
    robots: 'noindex, nofollow',
    ogType: 'website',
    breadcrumbName: 'Aviso Legal',
  },
  '/privacidad': {
    title: 'Política de Privacidad | Tintorería Mimos Navia, S.L. (Vigo)',
    h1: 'Política de Privacidad',
    description:
      'Política de protección de datos personales y privacidad de Tintorería Mimos Navia, S.L. en Vigo.',
    canonical: 'https://www.tintoreriamimos.es/privacidad',
    robots: 'noindex, nofollow',
    ogType: 'website',
    breadcrumbName: 'Política de Privacidad',
  },
  '/cookies': {
    title: 'Política de Cookies | Tintorería Mimos Navia, S.L. (Vigo)',
    h1: 'Política de Cookies',
    description: 'Información sobre el uso de cookies técnicas y preferencias en www.tintoreriamimos.es.',
    canonical: 'https://www.tintoreriamimos.es/cookies',
    robots: 'noindex, follow',
    ogType: 'website',
    breadcrumbName: 'Política de Cookies',
  },
  '/feder': {
    title: 'FEDER – Programa Re-Acciona TIC (Empresa Dixital) | Tintorería Mimos Navia',
    h1: 'FEDER — Programa Re-Acciona TIC (Empresa Dixital)',
    description:
      'Publicidad institucional del Programa Re-Acciona TIC, cofinanciado por el FEDER Galicia 2014-2020 en Tintorería Mimos Navia, S.L.',
    canonical: 'https://www.tintoreriamimos.es/feder',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'FEDER',
  },
  '/programa-bono-energia-peme-2025-in417z': {
    title: 'Programa Bono Energía Peme 2025: IN417Z | Tintorería Mimos Navia',
    h1: 'Programa Bono Energía Peme 2025: IN417Z',
    description:
      'Subvención INEGA Bono Enerxía Peme 2025 (IN417Z) en Tintorería Mimos Navia: sustitución de secadora Girbau STI-23 por Domus DTT2-18 E.',
    canonical: 'https://www.tintoreriamimos.es/programa-bono-energia-peme-2025-in417z',
    robots: 'index, follow',
    ogType: 'website',
    breadcrumbName: 'Programa Bono Energía Peme 2025: IN417Z',
  },
  '/empleo-unete-a-nosotros': {
    title: 'Empleo – Únete a Nosotros | Trabaja en Tintorería Mimos (Vigo)',
    h1: 'Empleo — Únete a nosotros',
    description:
      'Bolsa de empleo y recepción de candidaturas espontáneas para trabajar en Tintorería Mimos en Vigo (atención al público, desmanchado, lavado y planchado).',
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
