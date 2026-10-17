import puntosRaw from './puntos.json';

export const IMAGES = {
  ositoMimos: '/osito-mimos.jpg',
  logoMimos: '/logo-mimos.webp',
  tiendaMimos: '/tienda-mimos.jpg',
  b2bApartamentos: '/apartamentos-mimos.jpg',
  alfombrasMimos: '/alfombras-mimos.webp',
  blogVino: '/blog-vino.jpg',
  blogEdredon: '/blog-edredon.jpg',
  servicioTintoreria: '/servicio-tintoreria.jpg',
  arreglosRopa: '/arreglos-ropa-mimos.jpg',
};

export const MIMOS_LOGO_DATA_URI = '/logo-mimos.webp';

export function buildMimoWhatsAppUrl(message: string): string {
  return `https://wa.me/34655536844?text=${encodeURIComponent(message)}`;
}

// Datos verificados del negocio (Sección 2 del Plan Maestro)
export const CONTACT_INFO = {
  companyName: 'Tintorería Mimos Navia',
  legalName: 'Tintorería Mimos Navia, S.L.',
  cif: '[PENDIENTE: confirmar CIF]',
  registroMercantil: '[PENDIENTE: confirmar datos del Registro Mercantil]',
  canalEtico:
    '[PENDIENTE: consultar si es obligatorio para la empresa (Ley 2/2023, a partir de 50 trabajadores)]',
  streetAddress: 'C/ As Teixugueiras, 11, local 9',
  postalCode: '36212',
  locality: 'Vigo',
  region: 'Pontevedra',
  phoneDisplay: '986 12 51 41',
  phoneHref: 'tel:+34986125141',
  whatsappNumber: '655 536 844',
  whatsappBaseHref: 'https://wa.me/34655536844',
  whatsappGeneralHref: buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero hacer una consulta sobre vuestros servicios.'
  ),
  whatsappPickupHref: buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero solicitar información sobre la recogida y entrega a domicilio.'
  ),
  whatsappAlfombrasHref: buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero consultar el presupuesto para limpiar una alfombra en Vigo.'
  ),
  whatsappArreglosHref: buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero consultar un arreglo de ropa en Vigo.'
  ),
  whatsappB2BHref: buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero solicitar un presupuesto para mi empresa.'
  ),
  whatsappApartamentosHref: buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero solicitar un presupuesto para la limpieza y lavandería de apartamentos turísticos.'
  ),
  whatsappCleaningHref: buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero solicitar un presupuesto de limpieza profesional en Vigo.'
  ),
  whatsappBlogHelpHref: buildMimoWhatsAppUrl(
    'Hola, Mimo. Necesito asesoramiento para el cuidado de una prenda.'
  ),
  email: 'info@tintoreriamimos.es',
  emailHref: 'mailto:info@tintoreriamimos.es',
  appName: 'Wash In Town',
  googleMapsMainHref:
    'https://www.google.com/maps/search/?api=1&query=Tintorer%C3%ADa+Mimos+Navia+C%2F+As+Teixugueiras+11+local+9+36212+Vigo',
  googleReviewsHref:
    'https://www.google.com/maps/search/?api=1&query=Tintorer%C3%ADa+Mimos+Vigo',
  scheduleWeekdays: 'L-V 9.30-14.00 y 16.00-20.00',
  scheduleSaturday: 'Sáb 10.00-13.30',
  scheduleFullNavia: 'L-V 9.30-14.00 y 16.00-20.00 · Sáb 10.00-13.30',
  canonicalBase: 'https://www.tintoreriamimos.es',
};

// Tipado del archivo único de puntos (src/data/puntos.json)
export interface PuntoRegistro {
  id: string;
  activo: boolean;
  tipo: 'tienda' | 'punto';
  nombre_comercio: string;
  nombre_mostrado: string;
  localidad: string;
  zona_slug: string;
  direccion: string;
  codigo_postal: string;
  latitud: number;
  longitud: number;
  telefono: string;
  telefonos_mostrados: string;
  horario: {
    resumen: string;
    [key: string]: string | undefined;
  };
  servicios_confirmados: string[];
  arreglos_confirmados: string[];
  servicios_admitidos: string[];
  dias_de_ruta: string;
  plazo: string;
  hora_limite: string;
  instrucciones_entrega_recogida: string;
  foto: string;
  permiso_comercio: string;
}

export const REGISTROS_PUNTOS: PuntoRegistro[] = (
  puntosRaw as PuntoRegistro[]
).filter((p) => p.activo);

export const TIENDAS_PROPIAS: PuntoRegistro[] = REGISTROS_PUNTOS.filter(
  (p) => p.tipo === 'tienda'
);

export const PUNTOS_COLABORADORES: PuntoRegistro[] = REGISTROS_PUNTOS.filter(
  (p) => p.tipo === 'punto'
);

export const PUNTOS_CON_COSTURA: PuntoRegistro[] = REGISTROS_PUNTOS.filter(
  (p) => p.servicios_confirmados.includes('costura_arreglos')
);

export const PUNTOS_SIN_COSTURA: PuntoRegistro[] = REGISTROS_PUNTOS.filter(
  (p) => !p.servicios_confirmados.includes('costura_arreglos')
);

export const ZONAS_SERVICIO = [
  'Vigo',
  'Redondela',
  'Gondomar',
  'Ponteareas',
  'O Porriño',
];

export interface ServicioMimos {
  index: string;
  id: string;
  url: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  titulo: string;
  subtitulo: string;
  descripcion: string;
  queTratamos: string[];
  comoSeContrata: string[];
  notaPendiente?: string;
  ctaTexto: string;
  whatsappMensaje: string;
  whatsappUrl: string;
}

// Los 8 servicios principales (Sección 3.A y Sección 4: sin tarifas públicas, consulta directa a Mimo)
export const SERVICIOS_MIMOS: ServicioMimos[] = [
  {
    index: '01',
    id: 'tintoreria-profesional',
    url: '/tintoreria-vigo',
    seoTitle: 'Tintorería Profesional en Vigo | Prendas Delicadas y Ceremonia | Mimos',
    metaDescription:
      'Servicio de tintorería profesional en Vigo para trajes, vestidos de fiesta, comunión y novia, abrigos y prendas delicadas. Consulta tu precio con Mimo por WhatsApp.',
    h1: 'Tintorería profesional en Vigo para prendas delicadas, trajes y ceremonia',
    titulo: 'Tintorería profesional',
    subtitulo: 'Cuidado especializado de trajes, vestidos, abrigos y ropa de ceremonia',
    descripcion:
      'Limpieza especializada de prendas que requieren un tratamiento específico según su composición, estructura sastre y acabados. Analizamos cada tejido en nuestras instalaciones de Navia (Vigo) para aplicar el procedimiento adecuado de desmanchado, limpieza y acabado.',
    queTratamos: [
      'Trajes de chaqueta, americanas, esmóquines y pantalones de vestir',
      'Vestidos de fiesta, invitada, comunión, bautizo y vestidos de novia',
      'Abrigos de paño, gabardinas, chaquetones y plumíferos técnicos',
      'Blusas de seda, lino, viscosa, lana fría y tejidos con pedrería o encaje',
      'Costura y arreglos de ropa en nuestras 3 tiendas de Vigo y puntos colaboradores con costura (otros tratamientos como pieles/ante o teñido: [PENDIENTE: confirmar cuáles se mantienen])',
    ],
    comoSeContrata: [
      'Entrega directa en cualquiera de nuestras 3 tiendas propias en Vigo (As Teixugueiras, Rúa Venezuela o Gregorio Espino).',
      'Depósito en nuestra red de establecimientos colaboradores en Vigo, Redondela, Gondomar, Ponteareas y O Porriño.',
      'Solicitud de recogida y entrega a domicilio consultando previamente con Mimo por WhatsApp.',
    ],
    notaPendiente:
      '[PENDIENTE: confirmar cuáles de los servicios complementarios adicionales (pieles y ante, teñido de prendas) se mantienen activos]',
    ctaTexto: 'Consulta tu precio con Mimo',
    whatsappMensaje: 'Hola, Mimo. Quiero consultar el precio de un servicio de tintorería',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el precio de un servicio de tintorería'
    ),
  },
  {
    index: '02',
    id: 'lavanderia-profesional',
    url: '/lavanderia-vigo',
    seoTitle: 'Lavandería Profesional en Vigo | Cuidado de Ropa y Textiles | Mimos',
    metaDescription:
      'Lavandería profesional en Vigo para tu ropa de diario, prendas de temporada y textiles. Soluciones adaptadas a cada tejido con atención en tienda o a domicilio.',
    h1: 'Lavandería profesional en Vigo adaptada a cada tipo de tejido',
    titulo: 'Lavandería',
    subtitulo: 'Lavado profesional de ropa de uso diario y textiles',
    descripcion:
      'Lavado acuoso profesional con control de temperatura y productos específicos para cada fibra. Una alternativa cómoda y segura para mantener tu ropa limpia, fresca y cuidada sin preocuparte por el trabajo que supone hacerlo en casa.',
    queTratamos: [
      'Camisas, blusas, polos, camisetas y pantalones de uso cotidiano',
      'Jerséis de punto, chaquetas, faldas y prendas de entretiempo',
      'Cazadoras lavables en agua, anoraks y ropa deportiva o de nieve',
      'Ropa blanca y prendas de color separadas rigurosamente por composición',
    ],
    comoSeContrata: [
      'Acércate a nuestras tiendas propias en Vigo o a tu punto Mimos colaborador más cercano.',
      'Pregunta a Mimo por WhatsApp para conocer el importe exacto según tus prendas o solicitar recogida en casa.',
    ],
    ctaTexto: 'Preguntar precio por WhatsApp',
    whatsappMensaje: 'Hola, Mimo. Quiero consultar el precio de un servicio de lavandería',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el precio de un servicio de lavandería'
    ),
  },
  {
    index: '03',
    id: 'planchado-profesional',
    url: '/planchado-vigo',
    seoTitle: 'Servicio de Planchado Profesional en Vigo | Ropa Impecable | Mimos',
    metaDescription:
      'Servicio de solo planchado profesional en Vigo para camisas, pantalones, vestidos, trajes y ropa de hogar. Prendas listas para guardar o estrenar.',
    h1: 'Servicio de planchado profesional en Vigo para prendas impecables',
    titulo: 'Planchado profesional',
    subtitulo: 'Acabado de plancha profesional listo para guardar o utilizar',
    descripcion:
      'Trae tus prendas ya lavadas y nuestro equipo se encarga de devolverles una caída perfecta, sin brillos ni marcas de plancha doméstica. Ideal para quienes necesitan camisas de trabajo, pantalones o vestidos siempre impecables.',
    queTratamos: [
      'Camisas de vestir y blusas entregadas en percha o dobladas',
      'Pantalones de pinzas, trajes, americanas y faldas',
      'Vestidos de calle o de ceremonia que requieren vapor profesional',
      'Sábanas, fundas nórdicas, mantelerías y cortinas',
    ],
    comoSeContrata: [
      'Entrega tus prendas limpias en cualquiera de nuestras 3 tiendas en Vigo o puntos colaboradores.',
      'Consulta con Mimo por WhatsApp cuánto cuesta planchar tu lote de camisas o prendas sueltas.',
    ],
    ctaTexto: 'Quiero saber cuánto cuesta',
    whatsappMensaje: 'Hola, Mimo. Quiero saber cuánto cuesta planchar unas prendas',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero saber cuánto cuesta planchar unas prendas'
    ),
  },
  {
    index: '04',
    id: 'colada-familiar',
    url: '/colada-familiar-vigo',
    seoTitle: 'Colada Familiar en Vigo | Lavado, Secado y Doblado de Ropa | Mimos',
    metaDescription:
      'Servicio de colada familiar en Vigo: nos ocupamos de lavar, secar y doblar tu ropa semanal para que ahorres tiempo en casa. Consulta condiciones con Mimo.',
    h1: 'Colada familiar en Vigo: lavado, secado y doblado de tu ropa de diario',
    titulo: 'Colada familiar (lavado, secado y doblado)',
    subtitulo: 'Simplifica las tareas domésticas y dedica tu tiempo a lo que importa',
    descripcion:
      'Con nuestro servicio de colada familiar nos ocupamos de lavar, secar y doblar tu ropa cotidiana con equipos profesionales. Una solución práctica para familias, profesionales con poco tiempo y cualquier persona que quiera olvidarse de poner lavadoras y tender en los meses húmedos de Vigo.',
    queTratamos: [
      'Ropa cotidiana de toda la familia (camisetas, pantalones, ropa interior, pijamas, sudaderas)',
      'Ropa de cama de uso diario y toallas domésticas',
      'Posibilidad de añadir planchado para las prendas del pedido que nos indiques',
      'Modalidad de cobro y formato de bolsa/peso: [PENDIENTE: confirmar cómo se cobra la colada]',
    ],
    comoSeContrata: [
      'Escríbenos por WhatsApp para que Mimo te explique las condiciones de la colada familiar.',
      'Entrégala en tienda, en tu punto colaborador o solicita recogida a domicilio según tu zona.',
    ],
    notaPendiente: '[PENDIENTE: confirmar cómo se cobra la colada familiar]',
    ctaTexto: 'Consulta tu precio con Mimo',
    whatsappMensaje: 'Hola, Mimo. Quiero consultar las condiciones y el precio del servicio de colada familiar',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar las condiciones y el precio del servicio de colada familiar'
    ),
  },
  {
    index: '05',
    id: 'textiles-hogar',
    url: '/textiles-hogar-vigo',
    seoTitle: 'Limpieza de Edredones, Alfombras y Textiles del Hogar en Vigo | Mimos',
    metaDescription:
      'Lavado e higienización profesional de edredones de plumas y sintéticos, mantas, ropa de cama, fundas de sofá, cortinas y alfombras en Vigo.',
    h1: 'Limpieza profesional de edredones, alfombras y textiles del hogar en Vigo',
    titulo: 'Limpieza de textiles del hogar',
    subtitulo: 'Edredones, mantas, ropa de cama, alfombras y cortinas',
    descripcion:
      'Cuidado de grandes piezas textiles que no caben o no se secan correctamente en una lavadora doméstica. Utilizamos maquinaria de gran capacidad y secado controlado para devolver la esponjosidad e higiene a toda la ropa de tu hogar.',
    queTratamos: [
      'Edredones nórdicos de pluma/plumón natural y edredones sintéticos de todos los tamaños',
      'Mantas, colchas, juegos de sábanas, protectores de cuna y fundas de colchón',
      'Fundas de sofá, cojines, mantelerías y cortinajes',
      'Limpieza e higienización de alfombras',
    ],
    comoSeContrata: [
      'Tráelos a nuestras tiendas de Vigo o puntos colaboradores en la comarca.',
      'Para piezas voluminosas como alfombras o varios edredones, solicita recogida a domicilio por WhatsApp.',
    ],
    ctaTexto: 'Preguntar precio por WhatsApp',
    whatsappMensaje: 'Hola, Mimo. Quiero consultar el precio de lavar un edredón',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el precio de lavar un edredón'
    ),
  },
  {
    index: '06',
    id: 'alojamientos-turisticos',
    url: '/limpieza-apartamentos-turisticos-vigo',
    seoTitle: 'Limpieza y Lavandería para Apartamentos Turísticos en Vigo | Mimos',
    metaDescription:
      'Servicio de lavandería y limpieza profesional para apartamentos turísticos y viviendas vacacionales en Vigo. Pide presupuesto personalizado con Mimo.',
    h1: 'Servicio de lavandería y limpieza para apartamentos turísticos en Vigo',
    titulo: 'Servicio para alojamientos turísticos',
    subtitulo: 'Ropa de cama, toallas y preparación de apartamentos entre huéspedes',
    descripcion:
      'Ayudamos a propietarios y gestores de apartamentos turísticos y viviendas vacacionales en Vigo a tener cada estancia lista para la siguiente entrada, combinando el lavado y planchado profesional de sábanas y toallas con soluciones de limpieza.',
    queTratamos: [
      'Lavado, higienización, secado y planchado de sábanas, fundas nórdicas, cuadrantes y toallas',
      'Limpieza de edredones, protectores de colchón, cortinas y textiles de decoración',
      'Soluciones de limpieza entre reservas y puesta a punto [PENDIENTE: confirmar packs y condiciones exactas]',
    ],
    comoSeContrata: [
      'Sin tarifas cerradas estándar: estudiamos el número de alojamientos, camas y rotación.',
      'Pulsa en pedir presupuesto y Mimo recogerá los datos de tu alojamiento por WhatsApp.',
    ],
    notaPendiente:
      '[PENDIENTE: confirmar alcance exacto de lencería propia, limpieza completa entre reservas y zonas de cobertura]',
    ctaTexto: 'Pide presupuesto para tu empresa',
    whatsappMensaje:
      'Hola, Mimo. Quiero solicitar un presupuesto para la limpieza y lavandería de apartamentos turísticos',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar un presupuesto para la limpieza y lavandería de apartamentos turísticos'
    ),
  },
  {
    index: '07',
    id: 'servicios-empresas',
    url: '/servicios-empresas',
    seoTitle: 'Lavandería y Tintorería para Empresas y Profesionales en Vigo | Mimos',
    metaDescription:
      'Soluciones de lavandería, planchado y tintorería para empresas, hostelería, comercios y profesionales en Vigo. Presupuesto adaptado a cada negocio.',
    h1: 'Servicios de lavandería y tintorería para empresas y profesionales en Vigo',
    titulo: 'Servicios para empresas y profesionales',
    subtitulo: 'Mantenimiento textil de confianza para negocios en Vigo',
    descripcion:
      'Ponemos nuestras instalaciones de Navia al servicio de empresas y profesionales que necesitan mantener su vestuario laboral, mantelería o lencería impecables con un proveedor local serio y cercano.',
    queTratamos: [
      'Uniformes corporativos, batas, ropa de trabajo y vestuario de personal',
      'Mantelerías, servilletas y textiles para restaurantes, eventos y hostelería',
      'Toallas y lencería para clínicas, centros de estética, fisioterapia y gimnasios',
    ],
    comoSeContrata: [
      'Solicita presupuesto por WhatsApp o teléfono indicando el tipo de prenda, volumen y frecuencia.',
      'Acordamos la recogida y entrega en tus instalaciones o en nuestras tiendas de Vigo.',
    ],
    ctaTexto: 'Pide presupuesto para tu empresa',
    whatsappMensaje:
      'Hola, Mimo. Quiero solicitar un presupuesto de lavandería y tintorería para mi empresa en Vigo',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar un presupuesto de lavandería y tintorería para mi empresa en Vigo'
    ),
  },
  {
    index: '08',
    id: 'recogida-a-domicilio',
    url: '/recogida-a-domicilio',
    seoTitle: 'Tintorería y Lavandería a Domicilio en Vigo y Comarca | Mimos',
    metaDescription:
      'Servicio de recogida y entrega de tintorería y lavandería a domicilio en Vigo y red de puntos colaboradores en Redondela, Gondomar, Ponteareas y O Porriño.',
    h1: 'Recogida y entrega de prendas a domicilio y en puntos colaboradores',
    titulo: 'Recogida y entrega a domicilio y en puntos',
    subtitulo: 'Pasamos por tu domicilio o te atendemos en tu punto colaborador más cercano',
    descripcion:
      'Para que cuidar tu ropa resulte todavía más sencillo, disponemos de servicio de recogida y entrega a domicilio (sujeto a las condiciones del servicio y a la zona de cobertura) así como 3 tiendas propias en Vigo y puntos colaboradores en la comarca.',
    queTratamos: [
      'Recogida de prendas de tintorería, coladas familiares, edredones y alfombras',
      'Seguimiento y solicitud mediante WhatsApp con Mimo, teléfono o la aplicación Wash In Town',
      'Condiciones de plazo y resguardo digital: [PENDIENTE: confirmar antes de publicar]',
    ],
    comoSeContrata: [
      'Escribe a Mimo por WhatsApp o rellena el formulario de recogida indicando tu dirección o código postal.',
      'O bien deposita tus prendas en cualquiera de nuestros establecimientos colaboradores sin cita previa.',
    ],
    notaPendiente:
      '[PENDIENTE: confirmar condiciones de recogida a domicilio, plazo habitual y resguardo digital antes de publicar]',
    ctaTexto: 'Solicitar recogida por WhatsApp',
    whatsappMensaje:
      'Hola, Mimo. Quiero consultar las condiciones de recogida y entrega a domicilio',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar las condiciones de recogida y entrega a domicilio'
    ),
  },
];

// Packs en borrador de apartamentos turísticos (Sección 3.B del Plan Maestro)
export const PACKS_APARTAMENTOS_BORRADOR = [
  {
    id: 'pack-lenceria',
    nombre: 'Pack 1 · Lavandería de Lencería para Alojamientos',
    estado: '[PENDIENTE: confirmar condiciones y si incluye lencería propia o del cliente]',
    descripcion:
      'Lavado, higienización, secado y planchado de juegos de sábanas, fundas nórdicas, fundas de almohada y toallas de tus apartamentos turísticos en Vigo.',
    incluye: [
      'Higienización y planchado profesional de ropa de cama y baño',
      'Lencería propia / renting textil: [PENDIENTE: confirmar disponibilidad y condiciones]',
      'Entrega en tienda o recogida programada según rotaciones: [PENDIENTE: confirmar]',
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar un presupuesto para la lavandería de ropa de cama y toallas de apartamentos turísticos'
    ),
  },
  {
    id: 'pack-checkout',
    nombre: 'Pack 2 · Limpieza Check-out entre Reservas + Lavandería',
    estado: '[PENDIENTE: confirmar alcance de la limpieza completa y zonas en Vigo]',
    descripcion:
      'Solución combinada para propietarios y anfitriones: preparación del apartamento tras la salida del huésped junto con la renovación de toda la ropa de cama y toallas limpias.',
    incluye: [
      'Limpieza entre reservas de habitaciones, baño, cocina y salón: [PENDIENTE: confirmar condiciones]',
      'Retirada de textil usado y reposición de juegos higienizados por Tintorería Mimos',
      'Coordinación directa por WhatsApp según calendario de entradas',
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar un presupuesto para la limpieza check-out y lavandería de mi apartamento turístico'
    ),
  },
  {
    id: 'pack-empresas-pisos',
    nombre: 'Pack 3 · Gestoras y Empresas con Varios Apartamentos',
    estado: '[PENDIENTE: confirmar condiciones operativas para carteras de varios inmuebles]',
    descripcion:
      'Servicio a medida para empresas gestoras y propietarios con múltiples viviendas vacacionales o alojamientos en Vigo que requieren un socio único de limpieza y lavandería.',
    incluye: [
      'Planificación adaptada al volumen de apartamentos y temporada alta/baja',
      'Limpieza periódica + lavandería textil + limpieza de edredones, sofás y cortinas',
      'Facturación unificada y contacto directo con nuestro equipo en Vigo',
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Gestiono varios apartamentos turísticos en Vigo y quiero solicitar un presupuesto personalizado'
    ),
  },
];

// Información de las páginas por localidad (Sección 5: contenido único por municipio, prohibido texto clonado, con noindex mientras haya [PENDIENTE])
export interface ZonaSEOLocal {
  slug: string;
  url: string;
  canonical: string;
  localidad: string;
  comarca: string;
  codigosPostales: string;
  tienePendientes: boolean;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  subtitulo: string;
  explicacionEspecificaZona: string[];
  pasosEntregaRecogida: {
    paso: string;
    titulo: string;
    detalle: string;
  }[];
  preguntasFrecuentes: {
    pregunta: string;
    respuesta: string;
  }[];
  whatsappUrl: string;
}

export const ZONAS_SEO_LOCAL: ZonaSEOLocal[] = [
  {
    slug: 'redondela',
    url: '/zonas/redondela',
    canonical: 'https://www.tintoreriamimos.es/zonas/redondela',
    localidad: 'Redondela',
    comarca: 'Ría de Vigo',
    codigosPostales: '36800',
    tienePendientes: true,
    seoTitle: 'Servicio de Tintorería y Lavandería en Redondela | Punto Mimos',
    metaDescription:
      'Servicio de Tintorería Mimos disponible en nuestro establecimiento colaborador en C/ José Regojo, 29 bajo (Redondela) y recogida a domicilio. Consulta con Mimo.',
    h1: 'Servicio de tintorería y lavandería Mimos en Redondela',
    subtitulo:
      'Acerca tus prendas, trajes, edredones y alfombras al establecimiento colaborador en C/ José Regojo, 29 bajo, en el casco urbano de Redondela.',
    explicacionEspecificaZona: [
      'Para los vecinos del centro de Redondela, Vilavella y el entorno de la alameda y el viaducto, desplazarse en coche hasta Vigo solo para llevar un abrigo, un traje de ceremonia o un edredón de invierno supone perder tiempo y buscar aparcamiento.',
      'Por eso ofrecemos el servicio de Tintorería Mimos a través del establecimiento colaborador situado en la C/ José Regojo, 29 bajo (Redondela). Tú dejas y recoges tus prendas a pie de calle en Redondela con horario de mañana y tarde, y todas las prendas se higienizan en nuestra central de Tintorería Mimos Navia en Vigo.',
    ],
    pasosEntregaRecogida: [
      {
        paso: '01',
        titulo: 'Entrega en C/ José Regojo, 29 bajo (Redondela)',
        detalle:
          'Acércate en horario de lunes a viernes (10.00-13.30 y 17.00-20.00) o sábados (10.00-13.00). Días de ruta y hora límite: [PENDIENTE: confirmar días de ruta y hora límite].',
      },
      {
        paso: '02',
        titulo: 'Tratamiento en la central de Tintorería Mimos en Vigo',
        detalle:
          'Recogemos las prendas en el punto colaborador de Redondela y realizamos el desmanchado, lavado en seco o acuoso, secado de edredones o planchado en nuestras instalaciones propias.',
      },
      {
        paso: '03',
        titulo: 'Recogida en el mismo establecimiento colaborador',
        detalle:
          'Plazo de entrega en el punto de Redondela: [PENDIENTE: confirmar plazo de entrega]. Te avisamos para que pases a retirarlo cuando te resulte cómodo.',
      },
    ],
    preguntasFrecuentes: [
      {
        pregunta: '¿El local de C/ José Regojo 29 es una tienda propia de Mimos o un colaborador?',
        respuesta:
          'Es un establecimiento colaborador independiente ([PENDIENTE: confirmar nombre comercial autorizado y permiso]) donde está disponible el servicio de recepción y entrega de Tintorería Mimos Navia, S.L.',
      },
      {
        pregunta: '¿Cómo puedo saber cuánto cuesta limpiar una prenda desde el punto de Redondela?',
        respuesta:
          'Los precios te los facilita directamente nuestro asistente Mimo por WhatsApp en el 655 536 844 antes de que lleves tu prenda al punto de Redondela.',
      },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar un servicio de tintorería desde el punto de Redondela'
    ),
  },
  {
    slug: 'gondomar',
    url: '/zonas/gondomar',
    canonical: 'https://www.tintoreriamimos.es/zonas/gondomar',
    localidad: 'Gondomar',
    comarca: 'O Val Miñor',
    codigosPostales: '36380',
    tienePendientes: true,
    seoTitle: 'Servicio de Tintorería y Lavandería en Gondomar | Punto Mimos en Puntadas No Aire',
    metaDescription:
      'Servicio de Tintorería Mimos disponible en Puntadas No Aire (C/ Ángel Urzaiz, 6), establecimiento colaborador en Gondomar. Consulta precios con Mimo por WhatsApp.',
    h1: 'Servicio de tintorería y lavandería Mimos en Gondomar (Val Miñor)',
    subtitulo:
      'Servicio de Tintorería Mimos disponible en Puntadas No Aire (C/ Ángel Urzaiz, 6), establecimiento colaborador de costura en el centro de Gondomar.',
    explicacionEspecificaZona: [
      'En la comarca del Val Miñor, donde abundan las viviendas unifamiliares con gran volumen de ropa de hogar, edredones, mantas, cortinas y alfombras, contar con un punto de confianza en el propio Gondomar evita desplazamientos innecesarios hasta Vigo.',
      'Nuestro servicio está disponible en Puntadas No Aire, taller y tienda de costura ubicada en la C/ Ángel Urzaiz, 6 (Gondomar). Además, su horario matinal desde las 8.00 h de martes a viernes facilita enormemente dejar las prendas antes de salir a trabajar.',
    ],
    pasosEntregaRecogida: [
      {
        paso: '01',
        titulo: 'Deposita tus prendas en Puntadas No Aire (C/ Ángel Urzaiz, 6)',
        detalle:
          'Abierto L 10.00-13.30 y 16.00-19.00 · M-X 8.00-14.00 y 16.00-19.00 · J-V 8.00-14.00 · Sáb 10.00-13.30. Ruta y hora límite: [PENDIENTE: confirmar días de ruta y hora límite].',
      },
      {
        paso: '02',
        titulo: 'Cuidado textil en Tintorería Mimos Navia',
        detalle:
          'Nuestro transporte recoge los encargos en Gondomar para tratarlos en nuestra central de Navia (Vigo) con maquinaria industrial de tintorería y lavandería.',
      },
      {
        paso: '03',
        titulo: 'Retirada en Gondomar',
        detalle:
          'Plazo de entrega: [PENDIENTE: confirmar plazo de entrega en el punto de Gondomar]. Recoge tus prendas limpias y embolsadas en Puntadas No Aire.',
      },
    ],
    preguntasFrecuentes: [
      {
        pregunta: '¿Qué relación hay entre Puntadas No Aire y Tintorería Mimos?',
        respuesta:
          'Puntadas No Aire es un taller y tienda de costura en Gondomar que actúa como establecimiento colaborador para la recepción y entrega de pedidos de Tintorería Mimos Navia, S.L. [PENDIENTE: permiso del comercio para figurar en la web].',
      },
      {
        pregunta: '¿Puedo dejar edredones o trajes de ceremonia en el punto de Gondomar?',
        respuesta:
          'Sí, puedes entregar trajes, vestidos de fiesta, abrigos, edredones de plumas o sintéticos y ropa de hogar. Consulta antes el precio con Mimo por WhatsApp.',
      },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar un servicio de tintorería desde el punto de Gondomar'
    ),
  },
  {
    slug: 'ponteareas',
    url: '/zonas/ponteareas',
    canonical: 'https://www.tintoreriamimos.es/zonas/ponteareas',
    localidad: 'Ponteareas',
    comarca: 'O Condado',
    codigosPostales: '36860',
    tienePendientes: true,
    seoTitle: 'Servicio de Tintorería y Lavandería en Ponteareas | Punto Mimos',
    metaDescription:
      'Servicio de Tintorería Mimos disponible en Arreglado2 (C/ Argentina, 4), establecimiento colaborador en Ponteareas. Consulta precios con Mimo por WhatsApp.',
    h1: 'Servicio de tintorería y lavandería Mimos en Ponteareas',
    subtitulo:
      'Servicio de Tintorería Mimos disponible en Arreglado2 [PENDIENTE: confirmar si es Arreglado2 o Arregla2], tienda y taller de costura colaborador en C/ Argentina, 4 (Ponteareas).',
    explicacionEspecificaZona: [
      'Ponteareas es la cabecera comercial de toda la comarca de O Condado. Tanto para celebraciones, bodas y eventos como para el cambio de armario y limpieza de edredones o abrigos, los vecinos de Ponteareas disponen de un punto colaborador en pleno casco urbano.',
      'El servicio de Tintorería Mimos se gestiona en C/ Argentina, 4, en la tienda y taller de costura colaborador Arreglado2 [PENDIENTE: confirmar grafía exacta Arreglado2 / Arregla2], con apertura de lunes a sábado.',
    ],
    pasosEntregaRecogida: [
      {
        paso: '01',
        titulo: 'Acude a C/ Argentina, 4 (Ponteareas)',
        detalle:
          'Horario del establecimiento colaborador: L-V 9.30-13.30 y 16.00-19.30 · Sáb 9.30-13.30. Días de ruta y hora límite: [PENDIENTE: confirmar días de ruta y hora límite].',
      },
      {
        paso: '02',
        titulo: 'Traslado y limpieza en nuestra central de Vigo',
        detalle:
          'Recogemos las prendas depositadas en Ponteareas y las tratamos en Tintorería Mimos Navia según las exigencias de cada tejido.',
      },
      {
        paso: '03',
        titulo: 'Recogida en C/ Argentina, 4',
        detalle:
          'Plazo de entrega en Ponteareas: [PENDIENTE: confirmar plazo de entrega]. Retira tus prendas listas en tu horario habitual.',
      },
    ],
    preguntasFrecuentes: [
      {
        pregunta: '¿Dónde puedo dejar mis prendas para la tintorería en Ponteareas?',
        respuesta:
          'En el establecimiento colaborador situado en C/ Argentina, 4 (Ponteareas), teléfono 647 616 615, en horario de lunes a viernes de 9.30 a 13.30 y de 16.00 a 19.30, y sábados de 9.30 a 13.30.',
      },
      {
        pregunta: '¿Cómo consulto cuánto cuesta limpiar un traje o un vestido desde Ponteareas?',
        respuesta:
          'Pulsa el botón de WhatsApp de esta página para preguntarle directamente a nuestro asistente Mimo antes de llevar la prenda.',
      },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar un servicio de tintorería desde el punto de Ponteareas'
    ),
  },
  {
    slug: 'o-porrino',
    url: '/zonas/o-porrino',
    canonical: 'https://www.tintoreriamimos.es/zonas/o-porrino',
    localidad: 'O Porriño',
    comarca: 'A Louriña',
    codigosPostales: '36400',
    tienePendientes: true,
    seoTitle: 'Servicio de Tintorería y Lavandería en O Porriño | Punto Mimos en Telas y Más',
    metaDescription:
      'Servicio de Tintorería Mimos disponible en Telas y Más (C/ Manuel Rodríguez, 30), establecimiento colaborador en O Porriño. Consulta tu precio con Mimo.',
    h1: 'Servicio de tintorería y lavandería Mimos en O Porriño',
    subtitulo:
      'Servicio de Tintorería Mimos disponible en Telas y Más (C/ Manuel Rodríguez, 30), establecimiento colaborador en el centro de O Porriño.',
    explicacionEspecificaZona: [
      'En un municipio con tanta actividad comercial, industrial y familiar como O Porriño y el valle de A Louriña, poder dejar la ropa de trabajo, trajes, abrigos o edredones en el propio centro urbano ahorra desplazamientos a Vigo.',
      'Contamos con la colaboración de la tienda Telas y Más, ubicada en C/ Manuel Rodríguez, 30 (36400 O Porriño), con horario de lunes a viernes hasta las 20.30 h y los sábados por la mañana.',
    ],
    pasosEntregaRecogida: [
      {
        paso: '01',
        titulo: 'Entrega tus prendas en Telas y Más (C/ Manuel Rodríguez, 30)',
        detalle:
          'Horario en O Porriño: L-V 10.00-13.30 y 17.00-20.30 · Sáb 10.00-13.30. Días de ruta y hora límite: [PENDIENTE: confirmar días de ruta y hora límite].',
      },
      {
        paso: '02',
        titulo: 'Procesado profesional en Tintorería Mimos Navia',
        detalle:
          'Recogemos tu pedido en Telas y Más y aplicamos el tratamiento de tintorería, lavandería o planchado correspondiente en Vigo.',
      },
      {
        paso: '03',
        titulo: 'Recogida cómoda en O Porriño',
        detalle:
          'Plazo de entrega: [PENDIENTE: confirmar plazo de entrega en el punto de O Porriño]. Recoge tu ropa lista en C/ Manuel Rodríguez, 30.',
      },
    ],
    preguntasFrecuentes: [
      {
        pregunta: '¿Qué horario tiene el punto colaborador de Telas y Más en O Porriño?',
        respuesta:
          'Abre de lunes a viernes de 10.00 a 13.30 y de 17.00 a 20.30, y los sábados de 10.00 a 13.30 en C/ Manuel Rodríguez, 30 (teléfono 605 027 652).',
      },
      {
        pregunta: '¿Cómo pido precio para lavar prendas o edredones desde O Porriño?',
        respuesta:
          'Escríbenos por WhatsApp al 655 536 844 y nuestro asistente Mimo te informará al instante.',
      },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar un servicio de tintorería desde el punto de O Porriño'
    ),
  },
  {
    slug: 'vigo',
    url: '/zonas/vigo',
    canonical: 'https://www.tintoreriamimos.es/zonas/vigo',
    localidad: 'Vigo',
    comarca: 'Vigo (Tiendas propias y colaborador)',
    codigosPostales: '36212 · 36203 · 36205 · 36210',
    tienePendientes: true,
    seoTitle: 'Tiendas de Tintorería Mimos en Vigo y Punto Colaborador | Navia, Venezuela y Gregorio Espino',
    metaDescription:
      'Conoce nuestras 3 tiendas propias de Tintorería Mimos en Vigo (As Teixugueiras, Rúa Venezuela y Gregorio Espino), el punto colaborador D\'Passo y la recogida a domicilio.',
    h1: 'Nuestras 3 tiendas propias en Vigo, punto colaborador y recogida a domicilio',
    subtitulo:
      'Presencia directa con 3 tiendas propias de Tintorería Mimos Navia, S.L. en Vigo y servicio disponible en el establecimiento colaborador D\'Passo.',
    explicacionEspecificaZona: [
      'En Vigo tienes a tu disposición nuestras 3 tiendas propias: la sede central en C/ As Teixugueiras, 11, local 9 (Navia), la tienda del centro urbano en Rúa de Venezuela, 34 (bajos Parking Venezuela) y la tienda de Avda. Alcalde Gregorio Espino, 44.',
      'De forma complementaria, contamos con un punto de recogida en el establecimiento colaborador D\'Passo (cerrajería y zapatería) en Camiño Espedrigada, 9 bajo [PENDIENTE: confirmar si es Camiño o Rúa y permiso del comercio], además de nuestro servicio de recogida y entrega a domicilio en Vigo.',
    ],
    pasosEntregaRecogida: [
      {
        paso: '01',
        titulo: 'Elige entre nuestras 3 tiendas propias, punto colaborador o domicilio',
        detalle:
          'Acude directamente a As Teixugueiras 11, Rúa Venezuela 34 o Gregorio Espino 44, al colaborador D\'Passo, o solicita recogida a domicilio por WhatsApp.',
      },
      {
        paso: '02',
        titulo: 'Atención especializada por el equipo de Mimos',
        detalle:
          'Revisamos tus prendas y aplicamos el cuidado textil adecuado en nuestras instalaciones de Vigo.',
      },
      {
        paso: '03',
        titulo: 'Aviso cuando tu pedido está listo',
        detalle:
          'Plazo habitual y resguardo digital: [PENDIENTE: confirmar antes de publicar].',
      },
    ],
    preguntasFrecuentes: [
      {
        pregunta: '¿Cuáles son las tiendas propias de Tintorería Mimos en Vigo?',
        respuesta:
          'Las 3 tiendas propias de Tintorería Mimos Navia, S.L. están en C/ As Teixugueiras, 11, local 9 (Navia), Rúa de Venezuela, 34 y Avda. Alcalde Gregorio Espino, 44. Adicionalmente, el servicio está disponible en D\'Passo como establecimiento colaborador.',
      },
      {
        pregunta: '¿Qué tiendas propias de Vigo abren los sábados?',
        respuesta:
          'Los sábados abren la tienda sede de As Teixugueiras (de 10.00 a 13.30) y la tienda de Avda. Alcalde Gregorio Espino, 44 (de 10.00 a 13.00). La tienda de Rúa Venezuela permanece cerrada los sábados.',
      },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar un servicio de tintorería en Vigo'
    ),
  },
];

export interface ResenaCliente {
  autor: string;
  origen: string;
  estrellas: number;
  texto: string;
}

// Reseñas reales literales aportadas (Sección 11: sin inventar nota media global, con aviso de texto literal pendiente de validación final si procede)
export const RESENAS_REALES: ResenaCliente[] = [
  {
    autor: 'L Fdz',
    origen: 'Reseña real en Google',
    estrellas: 5,
    texto:
      'Son encantadores y súper eficientes. Siempre lo dejan todo impecable y es un placer tratar con ellas. Yo siempre les llevo todo esté dónde esté en ese momento porque ni quiero comparar otros más cerca. Me imagino que el servicio a domicilio será ya de 10.',
  },
  {
    autor: 'Miguel Peixoto Riobó',
    origen: 'Reseña real en Google',
    estrellas: 5,
    texto:
      'Los mejores. Me pasé ayer a primera hora y simplemente puedo decir que rapidísimo, me solucionaron un problema en cuestión de minutos, las trabajadoras dieron un trato de 10 e hicieron un trabajo maravilloso, sin duda volveré cuando lo necesite a esta tintorería sin pensármelo.',
  },
  {
    autor: 'Cristina De andres Rodríguez',
    origen: 'Reseña real en Google',
    estrellas: 5,
    texto:
      'Son únicos e incomparables. Entregarle un traje a las 9 de la mañana y a la 1 del mediodía lo tienes en casa. No hay nada que no puedan hacer, todo es posible con ellos. Retirada de cortinajes antiguos, lavado y planchado en 1 día y colocados de nuevo. Un gran empresario Antonio, su seriedad lo demuestra innato.',
  },
];

// Preguntas frecuentes generales de portada SIN PRECIOS (Sección 4, 7.9 y 10)
export const FAQ_PORTADA_SIN_PRECIOS = [
  {
    pregunta: '¿Cómo puedo consultar el precio de limpiar una prenda, un edredón o una alfombra?',
    respuesta:
      'Todos los precios y presupuestos te los facilita de forma inmediata nuestro asistente Mimo por WhatsApp en el 655 536 844 (o llamándonos al 986 12 51 41). Así podemos darte la información exacta según el tipo de prenda, tejido o servicio que necesites.',
  },
  {
    pregunta: '¿Cuál es la diferencia entre las tiendas Mimos y los puntos de recogida?',
    respuesta:
      'Contamos con 3 tiendas propias en Vigo (As Teixugueiras 11 en Navia, Rúa de Venezuela 34 y Avda. Alcalde Gregorio Espino 44) y, además, colaboramos con comercios de proximidad en Redondela, Gondomar, Ponteareas, O Porriño y Vigo donde puedes depositar y recoger tus encargos con la garantía de que son tratados por Tintorería Mimos.',
  },
  {
    pregunta: '¿Cómo funciona el servicio de recogida y entrega a domicilio?',
    respuesta:
      'Puedes solicitar la recogida escribiendo por WhatsApp al 655 536 844, a través del formulario de esta web o desde la aplicación Wash In Town. El servicio está sujeto a las condiciones y zona de cobertura.',
  },
  {
    pregunta: '¿Ofrecéis servicios para apartamentos turísticos, viviendas y empresas en Vigo?',
    respuesta:
      'Sí. Disponemos de una línea especializada para alojamientos turísticos, viviendas, oficinas, locales y empresas en Vigo. Preparamos presupuestos a medida según el volumen, la frecuencia y las necesidades de cada cliente.',
  },
];

export interface ArticuloBlog {
  slug: string;
  url: string;
  canonical: string;
  titulo: string;
  seoTitle: string;
  metaDescription: string;
  categoria: string;
  fechaPublicacion: string;
  fechaISO: string;
  tiempoLectura: string;
  extracto: string;
  imagen: string;
  imagenAlt: string;
  introduccion: string[];
  secciones: {
    h2: string;
    parrafos: string[];
    subsecciones?: {
      h3: string;
      texto: string;
    }[];
    puntosClave?: string[];
  }[];
  advertenciaProfesional: string;
  enlacesInternos: {
    texto: string;
    href: string;
    descripcion: string;
  }[];
  whatsappCtaUrl: string;
}

// Las 4 guías útiles del blog (Sección 10: manchas, edredones, símbolos de etiqueta, cómo preparar un apartamento entre huéspedes — SIN PRECIOS)
export const ARTICULOS_BLOG: ArticuloBlog[] = [
  {
    slug: 'como-quitar-mancha-vino-tinto-ropa-delicada',
    url: '/blog/como-quitar-mancha-vino-tinto-ropa-delicada',
    canonical: 'https://www.tintoreriamimos.es/blog/como-quitar-mancha-vino-tinto-ropa-delicada',
    titulo: 'Cómo quitar una mancha de vino tinto sin dañar tu ropa delicada',
    seoTitle: 'Cómo quitar una mancha de vino tinto en ropa delicada | Mimos Vigo',
    metaDescription:
      'Guía práctica para actuar ante una mancha de vino tinto en prendas delicadas: qué hacer en los primeros minutos, por qué evitar frotar o aplicar calor y cuándo acudir a la tintorería.',
    categoria: 'Cuidado de prendas delicadas',
    fechaPublicacion: '9 de octubre de 2026',
    fechaISO: '2026-10-09',
    tiempoLectura: '5 min de lectura',
    extracto:
      'Actuar con prudencia en los primeros minutos es determinante cuando cae vino tinto sobre una blusa, un vestido o un traje. Descubre cómo absorber el exceso sin frotar, por qué debes evitar el calor y cuándo confiar la prenda a un tratamiento profesional.',
    imagen: IMAGES.blogVino,
    imagenAlt:
      'Especialista de tintorería revisando una blusa de seda delicada sobre una mesa de trabajo limpia',
    introduccion: [
      'Un brindis en una comida familiar, una cena de trabajo o una celebración puede terminar con unas gotas de vino tinto sobre tu prenda favorita. El vino tinto contiene antocianinas (pigmentos naturales de la uva) y taninos que penetran con rapidez en las fibras textiles, especialmente cuando se trata de tejidos porosos o delicados.',
      'Sin embargo, el mayor daño en vestidos de fiesta, blusas de seda, pantalones de lana o mantelerías finas rara vez lo produce el propio vino: suele provocarlo una reacción precipitada en los primeros minutos. Frotar con fuerza, aplicar remedios caseros abrasivos o planchar la prenda antes de tiempo puede deteriorar el tejido o fijar el pigmento de forma irreversible.',
    ],
    secciones: [
      {
        h2: '1. Qué hacer en los primeros minutos: absorber con suavidad y sin frotar',
        parrafos: [
          'La regla fundamental ante cualquier derrame de líquido sobre un tejido es actuar con rapidez pero con total delicadeza. Antes de que el vino atraviese por completo el entramado del hilo, coloca un paño blanco limpio o papel absorbente sin tintes directamente sobre la zona afectada.',
          'Presiona mediante toques suaves y verticales (secado por absorción) para recoger la mayor cantidad posible de líquido superficial. Si es posible, coloca otro paño limpio debajo de la tela para evitar que la humedad traspase al forro o a la capa inferior de la prenda.',
        ],
        subsecciones: [
          {
            h3: 'Por qué debes evitar frotar el tejido',
            texto:
              'Frotar una mancha de vino tinto con una servilleta tiene dos consecuencias negativas inmediatas: extiende el pigmento hacia las fibras limpias colindantes y genera fricción mecánica. En tejidos como la seda natural, el crepé, la viscosa, el lino fino o la lana fría, esa fricción rompe las microfibras superficiales, provocando zonas blanquecinas, pérdida de brillo o deformaciones que ya no se pueden revertir con el lavado.',
          },
          {
            h3: 'Precaución con la sal y otros remedios universales',
            texto:
              'Aunque popularmente se suele recomendar cubrir el vino con sal de mesa o mezclas caseras, no existe un procedimiento doméstico universal válido para todos los tejidos. En prendas delicadas o de color, ciertos productos alcalinos, ácidos o granulados pueden alterar la tintura original de la prenda o dejar cercos permanentes.',
          },
        ],
      },
      {
        h2: '2. El error más crítico: nunca apliques calor antes de eliminar la mancha',
        parrafos: [
          'Los taninos y azúcares presentes en el vino tinto reaccionan químicamente ante las altas temperaturas. Cuando se aplica calor sobre un resto de vino —incluso si a simple vista parece haberse aclarado—, la mancha se oxida y se carameliza dentro de la fibra, fijándose como un tinte permanente.',
        ],
        puntosClave: [
          'No utilices agua caliente al intentar aclarar una prenda que admita lavado en agua.',
          'No introduzcas nunca la prenda en la secadora si no has comprobado con luz natural que la mancha ha desaparecido al cien por cien.',
          'No pases la plancha ni apliques vapor sobre una zona que haya sufrido una mancha de vino sin haberla tratado previamente.',
          'No utilices secadores de pelo ni fuentes de calor directo para acelerar el secado tras un accidente en una celebración.',
        ],
      },
      {
        h2: '3. Revisa siempre la etiqueta de composición y conservación',
        parrafos: [
          'Antes de aplicar agua o cualquier jabón neutro, consulta la etiqueta interior de la prenda. La respuesta de un algodón blanco resistente no tiene nada que ver con la de un vestido de invitada, una chaqueta sastre con entretela o una blusa con mezcla de acetato o seda.',
        ],
        subsecciones: [
          {
            h3: 'Prendas lavables en agua de uso cotidiano',
            texto:
              'Si la etiqueta permite expresamente el lavado en agua y se trata de un tejido resistente (como algodón o poliéster de diario), humedece la zona únicamente con agua fría tras haber absorbido el exceso y realiza un lavado suave siguiendo las indicaciones del fabricante, comprobando siempre en húmedo si queda rastro antes de secar.',
          },
          {
            h3: 'Tejidos delicados o de limpieza en seco (símbolo P o F)',
            texto:
              'Si la prenda indica «Solo limpieza en seco», contiene seda, lana virgen, terciopelo, lino estructurado, encajes, pedrería o forros sastre, no apliques agua ni jabón doméstico. El contacto puntual con el agua puede generar aureolas por desplazamiento del apresto que resultan más complejas de corregir que la propia mancha.',
          },
        ],
      },
      {
        h2: '4. Cuándo acudir a un tratamiento profesional de tintorería',
        parrafos: [
          'En Tintorería Mimos Navia tratamos las manchas de forma individualizada en mesa de desmanchado profesional, empleando vapor calibrado, vacío de absorción y reactivos específicos para taninos que respetan el color y la estructura de cada fibra.',
          'Si has sufrido una mancha en un traje, vestido de ceremonia, abrigo o prenda delicada, lo más recomendable es traerla cuanto antes tras haber absorbido únicamente el exceso en seco, e indicar a nuestro equipo que se trata de vino tinto y si se ha aplicado algún producto previo.',
        ],
      },
    ],
    advertenciaProfesional:
      'Nota importante: el éxito en la recuperación de una prenda manchada depende de la naturaleza de la fibra, la solidez del tinte original, la antigüedad de la mancha y las manipulaciones previas. Ningún procedimiento casero ni profesional puede garantizar al 100 % la eliminación de todas las manchas, por lo que recomendamos evitar tratamientos agresivos en casa ante la menor duda.',
    enlacesInternos: [
      {
        texto: 'Servicio de Tintorería Profesional en Vigo',
        href: '/tintoreria-vigo',
        descripcion: 'Descubre cómo cuidamos tus trajes, vestidos de fiesta, blusas y abrigos delicados.',
      },
      {
        texto: 'Solicitar recogida y entrega a domicilio',
        href: '/recogida-a-domicilio',
        descripcion: 'Consulta con Mimo cómo programar la recogida de tus prendas en Vigo y comarca.',
      },
    ],
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Necesito consultar el tratamiento de una mancha en una prenda delicada'
    ),
  },
  {
    slug: 'como-lavar-edredon-de-plumas-guia-practica',
    url: '/blog/como-lavar-edredon-de-plumas-guia-practica',
    canonical: 'https://www.tintoreriamimos.es/blog/como-lavar-edredon-de-plumas-guia-practica',
    titulo: 'Cómo lavar un edredón de plumas: guía práctica para cuidarlo correctamente',
    seoTitle: 'Cómo lavar un edredón de plumas y secarlo bien | Mimos Vigo',
    metaDescription:
      'Aprende cómo lavar un edredón de plumas paso a paso: lectura de la etiqueta, capacidad de la lavadora, ciclo adecuado y claves para secar completamente el relleno.',
    categoria: 'Ropa de cama y hogar',
    fechaPublicacion: '9 de octubre de 2026',
    fechaISO: '2026-10-09',
    tiempoLectura: '6 min de lectura',
    extracto:
      'Un edredón de pluma o plumón natural ofrece un aislamiento térmico extraordinario, pero requiere cuidados específicos al lavarlo y, sobre todo, al secarlo. Te explicamos qué comprobar antes de meterlo en la lavadora y cómo conservar su volumen.',
    imagen: IMAGES.blogEdredon,
    imagenAlt:
      'Edredón blanco de plumas y almohadas recién lavados y doblados en una lavandería profesional',
    introduccion: [
      'Los edredones nórdicos rellenos de pluma y plumón natural destacan por su ligereza, transpirabilidad y capacidad para mantener el calor corporal durante los meses fríos y húmedos de Vigo. Sin embargo, a diferencia de los rellenos sintéticos de fibra hueca, el plumón es un material orgánico delicado que puede apelmazarse, perder su capacidad aislante o adquirir mal olor si no se lava y seca siguiendo un protocolo adecuado.',
      'Con el cambio de temporada o tras varios meses de uso, higienizar el edredón es fundamental para eliminar ácaros, sudoración y polvo acumulado. A continuación, repasamos los pasos esenciales para saber si puedes lavarlo en casa o si conviene recurrir a maquinaria profesional de gran capacidad.',
    ],
    secciones: [
      {
        h2: '1. Consulta siempre la etiqueta del fabricante y revisa las costuras',
        parrafos: [
          'El primer paso indispensable antes de mojar cualquier edredón de plumas es leer detenidamente la etiqueta de conservación cosida por el fabricante. Aunque muchos nórdicos actuales admiten lavado acuoso suave a baja temperatura (habitualmente 30 °C), otros modelos con tejidos exteriores de seda, algodón batista muy tupido o tratamientos especiales exigen limpieza profesional específica.',
          'Además, inspecciona visualmente todo el perímetro y los tabiques internos (casetones) del edredón. Si detectas algún pequeño descosido o zona debilitada, es imprescindible repararlo antes del lavado; de lo contrario, la presión del agua hará que las plumas salgan al tambor durante el ciclo.',
        ],
      },
      {
        h2: '2. Comprueba la capacidad real de tu lavadora',
        parrafos: [
          'Uno de los problemas más frecuentes al intentar lavar un edredón de matrimonio o King Size en una lavadora doméstica es la falta de espacio en el tambor. Aunque en seco el nórdico parezca caber porque el plumón se comprime fácilmente, al empaparse de agua su peso se multiplica y necesita espacio libre para moverse.',
        ],
        subsecciones: [
          {
            h3: 'Por qué no debes forzar el tambor',
            texto:
              'Si el edredón entra a presión ocupando todo el volumen de la cuba, el agua y el detergente no circularán a través del relleno: quedarán zonas sin lavar y restos de jabón atrapados en el interior. Además, el peso excesivo del plumón mojado puede desequilibrar el centrifugado y someter a una tensión excesiva tanto a los tabiques internos del edredón como al motor de tu lavadora.',
          },
          {
            h3: 'Cuándo optar por lavandería profesional',
            texto:
              'Para edredones de cama de 135 cm, 150 cm o superiores, contar con lavadoras y secadoras industriales de gran diámetro permite que la prenda flote libremente en el baño de lavado y reciba un aclarado y secado homogéneos sin sufrir tirones.',
          },
        ],
      },
      {
        h2: '3. Elige un procedimiento de lavado suave y sin suavizante',
        parrafos: [
          'Si la etiqueta lo autoriza y dispones de un tambor con holgura suficiente, selecciona un programa para prendas delicadas o específico para edredones/plumas, respetando siempre la temperatura máxima indicada por el fabricante (por regla general, agua fría o máximo 30 °C).',
        ],
        puntosClave: [
          'Utiliza una dosis moderada de detergente líquido neutro para prendas delicadas.',
          'No utilices nunca suavizante ni lejía: el suavizante recubre los filamentos microscópicos del plumón, impidiendo que retengan el aire y restándoles esponjosidad.',
          'Programa un aclarado extra para asegurarte de que no queda ningún residuo jabonoso en el núcleo del relleno.',
          'Selecciona un centrifugado moderado (según indique la etiqueta) para extraer el agua sin partir las cañas de las plumas.',
        ],
      },
      {
        h2: '4. El paso decisivo: secar completamente el relleno',
        parrafos: [
          'El secado es la fase más crítica en el cuidado de un edredón de plumas. Aunque el tejido exterior de algodón parezca seco al tacto en pocas horas, el interior de los grupos de plumón retiene humedad durante mucho más tiempo.',
          'Si guardas o colocas en la cama un edredón de plumas que conserve humedad residual en su interior, las plumas se apelmazarán en bloques duros, aparecerán manchas amarillentas en la funda exterior y proliferarán hongos y olores desagradables difíciles de eliminar.',
        ],
        subsecciones: [
          {
            h3: 'Secado siguiendo las instrucciones del fabricante',
            texto:
              'La mayoría de fabricantes de nórdicos de pluma recomiendan el secado en secadora de gran capacidad a baja temperatura, realizando varios ciclos suaves y sacudiendo el edredón entre ellos para redistribuir el plumón y devolverle todo su volumen original.',
          },
          {
            h3: 'Cuidado profesional de edredones en Mimos Vigo',
            texto:
              'En Tintorería Mimos Navia nos encargamos del lavado, higienización y secado completo de edredones sintéticos y de plumas, entregándolos esponjosos, perfectamente secos y listos para guardar o estrenar temporada. Puedes consultar el precio de tu edredón directamente con Mimo por WhatsApp.',
          },
        ],
      },
    ],
    advertenciaProfesional:
      'Consejo de conservación: antes de guardar tu edredón al finalizar el invierno, asegúrate de que esté limpio y totalmente seco, y consérvalo en una bolsa de tela transpirable (evita las bolsas de plástico herméticas o al vacío para los rellenos de pluma natural, ya que comprimen en exceso la estructura del plumón).',
    enlacesInternos: [
      {
        texto: 'Limpieza de Textiles del Hogar en Vigo',
        href: '/textiles-hogar-vigo',
        descripcion: 'Conoce cómo lavamos y cuidamos edredones, mantas, cortinas y alfombras.',
      },
      {
        texto: 'Red de Tiendas y Puntos Mimos',
        href: '/puntos-mimos',
        descripcion: 'Entrega tu edredón en nuestras 3 tiendas de Vigo o en nuestros puntos colaboradores.',
      },
    ],
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el precio de lavar un edredón'
    ),
  },
  {
    slug: 'guia-simbolos-etiquetas-ropa-significado',
    url: '/blog/guia-simbolos-etiquetas-ropa-significado',
    canonical: 'https://www.tintoreriamimos.es/blog/guia-simbolos-etiquetas-ropa-significado',
    titulo: 'Guía práctica de los símbolos de lavado y etiquetas de tu ropa',
    seoTitle: 'Significado de los Símbolos de las Etiquetas de Ropa | Guía Mimos Vigo',
    metaDescription:
      'Aprende a interpretar los símbolos de las etiquetas textiles: lavado en agua, limpieza en seco (P y F), secadora, lejía y temperaturas de planchado.',
    categoria: 'Guía de etiquetado textil',
    fechaPublicacion: '9 de octubre de 2026',
    fechaISO: '2026-10-09',
    tiempoLectura: '4 min de lectura',
    extracto:
      'Saber leer los cinco iconos básicos de la etiqueta interior de una prenda evita encogimientos, pérdidas de color y brillos irreversibles al planchar. Repasamos qué significa cada símbolo.',
    imagen: IMAGES.servicioTintoreria,
    imagenAlt:
      'Prendas de vestir y trajes perfectamente cuidados y colgados en perchas en una tintorería profesional',
    introduccion: [
      'Cada prenda que compramos incluye una etiqueta interior donde el fabricante especifica cómo debe tratarse el tejido según su composición (lana, seda, lino, viscosa, algodón o fibras técnicas). Ignorar estos símbolos es la causa más común de que un jersey encoja o una americana pierda su caída original.',
      'El sistema internacional de etiquetado textil se divide siempre en cinco familias de iconos: la cubeta (lavado en agua), el círculo (limpieza profesional en seco), el triángulo (blanqueadores), el cuadrado (secado) y la plancha.',
    ],
    secciones: [
      {
        h2: '1. La cubeta y el círculo: ¿lavadora doméstica o tintorería en seco?',
        parrafos: [
          'El símbolo de la cubeta con agua indica que la prenda admite lavado acuoso. El número en su interior señala la temperatura máxima permitida (por ejemplo, 30 °C), y una línea horizontal debajo advierte que requiere un ciclo delicado con centrifugado reducido.',
          'Por el contrario, cuando aparece una cubeta tachada junto a un círculo con una letra (habitualmente «P» o «F»), el fabricante indica que la prenda no debe mojarse en casa y necesita limpieza en seco profesional en tintorería.',
        ],
      },
      {
        h2: '2. El cuadrado y la plancha: control del calor',
        parrafos: [
          'Un cuadrado con un círculo interior representa la secadora. Si aparece tachado, nunca introduzcas la prenda en secadora, ya que el calor y el giro mecánico pueden encoger las fibras.',
          'En el icono de la plancha, los puntos interiores marcan la temperatura máxima: un punto (máximo 110 °C, para seda, acetato o tejidos delicados sin vapor), dos puntos (máximo 150 °C, para lana o poliéster) y tres puntos (máximo 200 °C, para algodón o lino).',
        ],
      },
    ],
    advertenciaProfesional:
      'Si has cortado la etiqueta interior de tu abrigo, vestido o traje y tienes dudas sobre cómo lavarlo o plancharlo, tráelo a cualquiera de nuestras tiendas Mimos en Vigo para que nuestro equipo valore el tejido antes de tratarlo.',
    enlacesInternos: [
      {
        texto: 'Servicio de Planchado Profesional en Vigo',
        href: '/planchado-vigo',
        descripcion: 'Conoce nuestro servicio de planchado para camisas, pantalones, vestidos y trajes.',
      },
      {
        texto: 'Tintorería Profesional en Vigo',
        href: '/tintoreria-vigo',
        descripcion: 'Limpieza en seco profesional para prendas con símbolo P o F.',
      },
    ],
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Tengo dudas con la etiqueta de una prenda y quiero consultar su limpieza'
    ),
  },
  {
    slug: 'como-preparar-apartamento-turistico-entre-huespedes',
    url: '/blog/como-preparar-apartamento-turistico-entre-huespedes',
    canonical:
      'https://www.tintoreriamimos.es/blog/como-preparar-apartamento-turistico-entre-huespedes',
    titulo: 'Cómo organizar la limpieza y los textiles de un apartamento turístico entre huéspedes',
    seoTitle: 'Cómo preparar un apartamento turístico entre huéspedes | Guía Mimos Vigo',
    metaDescription:
      'Claves prácticas para propietarios y gestores de apartamentos turísticos en Vigo: rotación de sábanas y toallas, revisión en el check-out y cuidado de edredones.',
    categoria: 'Alojamientos turísticos y limpieza',
    fechaPublicacion: '9 de octubre de 2026',
    fechaISO: '2026-10-09',
    tiempoLectura: '5 min de lectura',
    extracto:
      'En las viviendas vacacionales, la ventana de pocas horas entre la salida de un huésped y la entrada del siguiente exige un protocolo claro de limpieza y gestión de ropa de cama y toallas.',
    imagen: IMAGES.b2bApartamentos,
    imagenAlt:
      'Cama de apartamento turístico vestida con sábanas blancas planchadas y juego de toallas dobladas',
    introduccion: [
      'La primera impresión de un huésped al abrir la puerta de un apartamento turístico en Vigo depende directamente de dos factores: la sensación de limpieza e higiene del espacio y el tacto impecable de las sábanas y las toallas.',
      'Cuando se encadenan reservas en temporada alta o puentes festivos, lavar, secar y planchar varios juegos de cama y toallas en una lavadora doméstica dentro del propio piso resulta inviable por tiempo y humedad.',
    ],
    secciones: [
      {
        h2: '1. Trabaja siempre con juegos de ropa de cama y toallas de rotación',
        parrafos: [
          'Disponer de varios juegos completos por cama permite que, en el mismo instante en que se retira la lencería usada tras el check-out, el apartamento quede vestido de inmediato con sábanas y toallas limpias, secas y planchadas.',
          'Mientras el nuevo huésped ya disfruta de su estancia, el lote retirado se procesa en lavandería profesional con control de temperatura para eliminar cualquier mancha de maquillaje, cremas solares o uso diario.',
        ],
      },
      {
        h2: '2. No descuides los textiles de fondo: protectores, edredones, cortinas y sofás',
        parrafos: [
          'Además del cambio de sábanas y toallas en cada reserva, programar la higienización periódica de protectores de colchón, almohadas, rellenos nórdicos, fundas de sofá y cortinas mantiene el apartamento libre de olores y alarga la vida útil del equipamiento.',
        ],
      },
    ],
    advertenciaProfesional:
      'En Tintorería Mimos Navia ayudamos a propietarios y gestores de apartamentos turísticos en Vigo con soluciones de lavandería y limpieza adaptadas a su volumen de reservas. Escribe a Mimo por WhatsApp para pedir un presupuesto personalizado.',
    enlacesInternos: [
      {
        texto: 'Limpieza y Lavandería para Apartamentos Turísticos en Vigo',
        href: '/limpieza-apartamentos-turisticos-vigo',
        descripcion: 'Consulta nuestras soluciones y pide presupuesto a medida para tu alojamiento.',
      },
      {
        texto: 'División de Limpieza Profesional en Vigo',
        href: '/limpieza-profesional-vigo',
        descripcion: 'Servicios de limpieza para alojamientos, viviendas, oficinas y locales.',
      },
    ],
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar un presupuesto para la limpieza y lavandería de apartamentos turísticos'
    ),
  },
];

export interface ServicioLimpiezaProfesional {
  index: string;
  id: string;
  titulo: string;
  subtitulo: string;
  estadoConfirmacion?: string;
  descripcion: string;
  incluye: string[];
  whatsappUrl: string;
}

export const SERVICIOS_LIMPIEZA_PROFESIONAL: ServicioLimpiezaProfesional[] = [
  {
    index: '01',
    id: 'apartamentos-turisticos',
    titulo: 'Limpieza y lavandería para apartamentos turísticos y viviendas vacacionales',
    subtitulo: 'Puesta a punto entre huéspedes, cambio de sábanas y toallas en Vigo',
    estadoConfirmacion:
      '[PENDIENTE: confirmar alcance exacto de limpieza entre reservas, lencería propia y zonas]',
    descripcion:
      'Ayudamos a propietarios, anfitriones y empresas gestoras en Vigo a tener sus alojamientos turísticos impecables para cada check-in. Combinamos la limpieza del apartamento con el lavado, higienización y planchado profesional de toda la ropa de cama y baño.',
    incluye: [
      'Lavado, secado y planchado profesional de sábanas, fundas nórdicas, cuadrantes y toallas',
      'Puesta a punto y limpieza entre reservas coordinada según entradas y salidas',
      'Higienización de edredones, protectores de colchón, cortinas, fundas de sofá y alfombras',
      'Presupuestos a medida según número de apartamentos, camas y frecuencia de rotación',
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar un presupuesto para la limpieza y lavandería de apartamentos turísticos'
    ),
  },
  {
    index: '02',
    id: 'viviendas-particulares',
    titulo: 'Limpieza de viviendas particulares en Vigo',
    subtitulo: 'Limpiezas generales, puntuales o por horas',
    estadoConfirmacion: '[PENDIENTE: confirmar cuáles de estas modalidades se ofrecen]',
    descripcion:
      'Soluciones de limpieza profesional para hogares en Vigo que buscan un equipo de confianza, respaldado por nuestra experiencia en el cuidado textil de ropa de hogar, cortinas, alfombras y tapicerías.',
    incluye: [
      'Limpiezas generales o de temporada en viviendas particulares: [PENDIENTE: confirmar]',
      'Limpiezas puntuales o mantenimiento periódico por horas: [PENDIENTE: confirmar]',
      'Posibilidad de combinar con lavado de edredones, cortinas, mantas y alfombras del hogar',
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar un presupuesto para la limpieza de una vivienda en Vigo'
    ),
  },
  {
    index: '03',
    id: 'oficinas-y-locales',
    titulo: 'Limpieza de oficinas, despachos y locales comerciales',
    subtitulo: 'Mantenimiento profesional para negocios en Vigo',
    estadoConfirmacion: '[PENDIENTE: confirmar condiciones y disponibilidad]',
    descripcion:
      'Servicio de limpieza adaptado a los horarios y necesidades de oficinas, clínicas, despachos profesionales y comercios en Vigo, con opción de incluir el mantenimiento de textiles y vestuario laboral.',
    incluye: [
      'Limpieza periódica o puntual de oficinas, despachos y comercios: [PENDIENTE: confirmar]',
      'Lavandería y planchado de uniformes, batas, toallas y textiles de empresa',
      'Facturación empresarial y trato directo con nuestro equipo en Navia',
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar un presupuesto de limpieza para mi oficina o local en Vigo'
    ),
  },
  {
    index: '04',
    id: 'comunidades-y-fin-de-obra',
    titulo: 'Limpieza de comunidades y fin de obra / puesta a punto de inmuebles',
    subtitulo: 'Intervenciones para comunidades de propietarios y entregas de inmuebles',
    estadoConfirmacion: '[PENDIENTE: confirmar si se ofrecen comunidades y fin de obra]',
    descripcion:
      'Servicios de limpieza para zonas comunes de edificios y puesta a punto de viviendas o locales tras reformas, mudanzas o cambios de inquilino en Vigo.',
    incluye: [
      'Limpieza de comunidades de propietarios: [PENDIENTE: confirmar]',
      'Limpieza fin de obra o puesta a punto antes de entrar a vivir o alquilar: [PENDIENTE: confirmar]',
      'Valoración previa sin compromiso a través de Mimo por WhatsApp',
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar disponibilidad y presupuesto para limpieza de comunidad o puesta a punto de inmueble'
    ),
  },
];

export interface MimoFaqTopic {
  id: string;
  label: string;
  respuesta: string;
  whatsappUrl: string;
  whatsappCtaLabel: string;
}

export const MIMO_FAQ_TOPICS: MimoFaqTopic[] = [
  {
    id: 'precios',
    label: 'Consultar precios',
    respuesta:
      'Para darte el precio exacto según tu prenda, tejido o servicio (trajes, vestidos, camisas, edredones, alfombras, colada familiar o limpieza), escríbenos por WhatsApp al 655 536 844 y te informamos al instante.',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el precio de un servicio de tintorería'
    ),
    whatsappCtaLabel: 'Consultar precio por WhatsApp',
  },
  {
    id: 'horarios-tiendas',
    label: 'Tiendas y horarios',
    respuesta:
      'Contamos con 3 tiendas propias en Vigo:\n• Sede Navia (C/ As Teixugueiras, 11, local 9): L-V 9.30-14.00 y 16.00-20.00 · Sáb 10.00-13.30.\n• Rúa de Venezuela, 34: L-V 10.00-13.30 y 16.30-19.30 · Sáb cerrado.\n• Avda. Alcalde Gregorio Espino, 44: L-V 9.30-13.30 y 16.30-20.00 · Sáb 10.00-13.00.',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Tengo una consulta sobre vuestras tiendas y horarios'
    ),
    whatsappCtaLabel: 'Escribir a Mimo por WhatsApp',
  },
  {
    id: 'puntos',
    label: 'Puntos colaboradores',
    respuesta:
      'Además de nuestras 3 tiendas propias en Vigo, el servicio de Tintorería Mimos está disponible en establecimientos colaboradores en Redondela (C/ José Regojo, 29 bajo), Gondomar (Puntadas No Aire, C/ Ángel Urzaiz, 6), Ponteareas (C/ Argentina, 4), O Porriño (Telas y Más, C/ Manuel Rodríguez, 30) y Vigo (D\'Passo, Camiño Espedrigada, 9 bajo).',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar cómo entregar mis prendas en un punto colaborador'
    ),
    whatsappCtaLabel: 'Preguntar por un punto Mimos',
  },
  {
    id: 'domicilio',
    label: 'Recogida a domicilio',
    respuesta:
      'Disponemos de servicio de recogida y entrega a domicilio sujeto a condiciones y zona de cobertura. Puedes solicitarlo directamente por WhatsApp en el 655 536 844, en el formulario de la web o con la app Wash In Town.',
    whatsappUrl: CONTACT_INFO.whatsappPickupHref,
    whatsappCtaLabel: 'Solicitar recogida por WhatsApp',
  },
  {
    id: 'costura',
    label: 'Costura y arreglos',
    respuesta:
      'Realizamos arreglos y composturas de ropa (bajos, cremalleras, botones, estrechar/ensanchar, ajustes de cintura, zurcidos y descosidos) en nuestras 3 tiendas propias de Vigo y en los puntos colaboradores con servicio de costura en Gondomar (Puntadas No Aire), Ponteareas (Arreglado2) y O Porriño (Telas y Más). Los puntos de Redondela y D\'Passo (Vigo) son exclusivos de tintorería y lavandería.',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar un arreglo de ropa y mi punto de costura más cercano'
    ),
    whatsappCtaLabel: 'Consultar arreglo con Mimo',
  },
  {
    id: 'apartamentos-empresas',
    label: 'Apartamentos y empresas',
    respuesta:
      'Ofrecemos soluciones de lavandería y limpieza profesional para apartamentos turísticos, viviendas, oficinas y empresas en Vigo con presupuesto a medida.',
    whatsappUrl: CONTACT_INFO.whatsappApartamentosHref,
    whatsappCtaLabel: 'Pedir presupuesto a medida',
  },
];

// SECCIÓN 16 DEL PLAN MAESTRO: Servicio prioritario de limpieza de alfombras con recogida y entrega (/limpieza-alfombras-vigo)
// Regla de sección 16: Lo no confirmado queda como [PENDIENTE] en el documento interno de trabajo, nunca como texto visible en la web.
export const SERVICIO_ALFOMBRAS_DATA = {
  url: '/limpieza-alfombras-vigo',
  canonical: 'https://www.tintoreriamimos.es/limpieza-alfombras-vigo',
  seoTitle: 'Limpieza de Alfombras en Vigo con Recogida y Entrega a Domicilio | Mimos',
  metaDescription:
    'Servicio profesional de limpieza de alfombras en Vigo con recogida y entrega a domicilio o recepción en nuestras 3 tiendas propias. Pide tu presupuesto con Mimo por WhatsApp.',
  h1: 'Limpieza de alfombras en Vigo con recogida y entrega a domicilio',
  subtituloCabecera:
    'Recogemos tu alfombra en tu domicilio o en nuestras tiendas propias de Vigo para limpiarla en nuestras instalaciones y devolvértela cuidada, limpia y lista para colocar.',
  aclaracionDomicilio:
    'Importante: nuestro servicio «a domicilio» consiste en recoger tu alfombra en tu vivienda u oficina, trasladarla a nuestras instalaciones para su limpieza y secado controlado, y entregártela de vuelta una vez lista (no realizamos limpiezas en húmedo dentro del domicilio del cliente).',
  pasosComoFunciona: [
    {
      num: '01',
      titulo: 'Pides tu valoración con Mimo',
      descripcion:
        'Abres el chat de WhatsApp con nuestro asistente Mimo indicando tu localidad y las medidas aproximadas. Ya dentro del chat podrás enviar fotos de la alfombra y de las manchas para su valoración.',
    },
    {
      num: '02',
      titulo: 'Recogemos tu alfombra (o la entregas en tienda)',
      descripcion:
        'Coordinamos la recogida en tu domicilio según disponibilidad y zona de cobertura, o bien la recibimos directamente en cualquiera de nuestras 3 tiendas propias en Vigo.',
    },
    {
      num: '03',
      titulo: 'La limpiamos en nuestras instalaciones',
      descripcion:
        'Trasladamos la pieza a nuestras instalaciones para aplicar el tratamiento profesional adecuado a su fibra, confección, tintes y reverso, con un secado completo fuera de tu hogar.',
    },
    {
      num: '04',
      titulo: 'Te la entregamos lista para colocar o guardar',
      descripcion:
        'Una vez finalizado el proceso y revisado el acabado, te avisamos para acordar la entrega en tu domicilio o la retirada en tu tienda Mimos de Vigo.',
    },
  ],
  tiposAlfombrasValoradas: [
    {
      titulo: 'Alfombras de lana y fibras naturales',
      descripcion:
        'Piezas de lana virgen, algodón y otras fibras naturales que requieren un tratamiento respetuoso con la elasticidad y suavidad original del hilo.',
    },
    {
      titulo: 'Alfombras sintéticas y de salón',
      descripcion:
        'Alfombras de polipropileno, acrílico, poliéster o viscosa de uso cotidiano en salones, comedores, dormitorios y habitaciones infantiles.',
    },
    {
      titulo: 'Alfombras de pelo corto o pelo largo',
      descripcion:
        'Tanto alfombras de tejido plano o bucle como piezas de pelo alto (tipo shaggy) que acumulan polvo y suciedad en la base de las fibras.',
    },
    {
      titulo: 'Alfombras orientales, anudadas y delicadas',
      descripcion:
        'Alfombras clásicas, persas, kilims o piezas con tintes delicados y flecos que exigen una revisión previa del soporte y la solidez del color.',
    },
    {
      titulo: 'Alfombras de composición desconocida (sin etiqueta)',
      descripcion:
        'Si tu alfombra ya no conserva la etiqueta del fabricante, nuestro equipo examina el tejido, el nudo y el reverso antes de determinar su tratamiento.',
    },
  ],
  guiaComoMedir: {
    titulo: 'Cómo medir tu alfombra paso a paso (largo × ancho)',
    introduccion:
      'Para que Mimo pueda orientarte y preparar tu valoración por WhatsApp, solo necesitas tomar dos medidas sencillas con un metro o cinta métrica:',
    pasos: [
      'Extiende la alfombra en el suelo o mide directamente uno de sus laterales largos y uno de sus laterales cortos.',
      'Anota el LARGO por el ANCHO en metros o centímetros (por ejemplo: 2,40 m × 1,70 m, o 200 cm × 150 cm).',
      'Si la alfombra tiene flecos en los extremos, mide el cuerpo tejido de la alfombra e indícanos aparte que cuenta con flecos.',
      'Si es redonda, basta con medir el diámetro de lado a lado pasando por el centro (por ejemplo: 1,60 m de diámetro).',
    ],
    ejemploPractico: 'Ejemplo práctico: Alfombra de salón de 2,50 m de largo × 1,80 m de ancho.',
  },
  factoresPresupuesto: [
    {
      factor: '1. Medidas de la pieza',
      detalle: 'Las dimensiones de largo por ancho determinan la superficie total a tratar y secar.',
    },
    {
      factor: '2. Tipo de fibra y confección',
      detalle:
        'No requiere el mismo cuidado una alfombra sintética de diario que una de lana, fibras vegetales, viscosa o anudada a mano.',
    },
    {
      factor: '3. Estado general y manchas',
      detalle:
        'Presencia de manchas localizadas (comida, bebida, mascotas, barro, humedad) o suciedad acumulada por tránsito intenso.',
    },
    {
      factor: '4. Delicadeza de tintes y estado del reverso',
      detalle:
        'Evaluamos la solidez de los colores y el estado del soporte trasero (yute, algodón o base encolada/engomada).',
    },
    {
      factor: '5. Tratamientos adicionales según necesidad',
      detalle:
        'Cuidados específicos que la alfombra pueda requerir tras la inspección de nuestro equipo.',
    },
    {
      factor: '6. Ubicación de recogida y entrega',
      detalle:
        'Si entregas y recoges la alfombra en nuestras tiendas propias de Vigo o si solicitas recogida y entrega en tu domicilio.',
    },
  ],
  dondeRecogemosORecibimos: {
    domicilio:
      'Recogida y entrega en el domicilio del cliente (sujeta a las condiciones del servicio y a la zona de cobertura). Recogemos la alfombra en tu casa, la limpiamos en nuestras instalaciones y te la devolvemos.',
    tiendasPropias:
      'Recepción directa en nuestras 3 tiendas propias en Vigo: Sede Navia (C/ As Teixugueiras, 11, local 9), Rúa de Venezuela, 34 y Avda. Alcalde Gregorio Espino, 44.',
    puntosColaboradores:
      'En los puntos de recogida colaboradores, la entrega de alfombras está sujeta a que cada comercio colaborador acepte expresamente piezas de este volumen y tamaño. Consúltalo antes con Mimo por WhatsApp.',
  },
  plazosExplicacion:
    'El plazo de limpieza y entrega de una alfombra depende de su tamaño, el tipo de fibra, su estado inicial, el tratamiento requerido, el tiempo necesario para un secado completo y la logística de recogida y reparto. Al solicitar tu valoración, Mimo te informará del plazo estimado para tu pieza.',
  cuidadoYManchas: {
    consejosMantenimiento: [
      'Aspira la alfombra regularmente con suavidad y siempre en el sentido natural del pelo, evitando cepillos rotatorios agresivos en alfombras de lana o nudo.',
      'Gira la posición de la alfombra una o dos veces al año para repartir de forma homogénea el desgaste de las zonas de paso y la incidencia de la luz solar.',
      'Ante un derrame líquido accidental, absorbe inmediatamente el exceso presionando con un paño blanco limpio o papel absorbente, sin frotar nunca en círculos.',
    ],
    porQueEvitarProductosDomesticos:
      'Aplicar espumas secas universales, amoníaco, lejías, quitamanchas domésticos o exceso de agua en casa sin conocer la composición exacta del tejido y del reverso puede provocar cercos permanentes, corrimientos de tinte, encogimiento de la base o apelmazamiento de la fibra.',
    cuandoAcudirYAdvertencia:
      'Recomendamos realizar una limpieza profesional periódica (por ejemplo, al finalizar la temporada de invierno o antes de guardar la alfombra) y acudir cuanto antes si sufre un accidente. Nota de transparencia: el resultado final depende siempre de la fibra, la antigüedad de la mancha y las manipulaciones previas; ningún tratamiento profesional puede garantizar al 100 % la eliminación total de todas las manchas u olores.',
  },
  preguntasFrecuentes: [
    {
      pregunta: '1. ¿Cómo puedo solicitar el servicio de limpieza de alfombras?',
      respuesta:
        'Puedes pulsar cualquiera de los botones de esta página para abrir el chat de WhatsApp con Mimo (655 536 844), llamarnos al 986 12 51 41 o acercarte a nuestras 3 tiendas propias en Vigo.',
    },
    {
      pregunta: '2. ¿Qué datos hacen falta para pedir una valoración a Mimo?',
      respuesta:
        'Para darte una valoración ajustada, Mimo te pedirá en el chat de WhatsApp las medidas aproximadas (largo × ancho), el material o tipo de alfombra si lo conoces, tu localidad (si necesitas recogida a domicilio) y fotos de la alfombra y de las manchas.',
    },
    {
      pregunta: '3. ¿Cómo debo medir mi alfombra?',
      respuesta:
        'Mide el largo y el ancho con una cinta métrica (por ejemplo, 2,40 m × 1,70 m) sobre el cuerpo tejido de la alfombra. Si tiene flecos o es redonda, indícaselo a Mimo en el mensaje.',
    },
    {
      pregunta: '4. ¿Qué tipos de alfombras se valoran en Tintorería Mimos?',
      respuesta:
        'Valoramos alfombras de lana y fibras naturales, alfombras sintéticas, de pelo corto o largo, alfombras orientales o delicadas y alfombras sin etiqueta o de composición desconocida.',
    },
    {
      pregunta: '5. ¿En qué consiste la recogida y entrega de alfombras a domicilio?',
      respuesta:
        'Pasamos por tu domicilio a recoger la alfombra enrollada, la trasladamos a nuestras instalaciones para limpiarla y secarla adecuadamente, y te la entregamos de vuelta en casa. No realizamos el lavado dentro de la vivienda del cliente.',
    },
    {
      pregunta: '6. ¿Qué localidades se atienden y dónde puedo llevar mi alfombra?',
      respuesta:
        'Atendemos directamente en nuestras 3 tiendas propias de Vigo (As Teixugueiras 11 en Navia, Rúa de Venezuela 34 y Avda. Alcalde Gregorio Espino 44) y realizamos recogidas a domicilio según zona de cobertura y condiciones del servicio. En los puntos colaboradores, solo si el establecimiento admite expresamente piezas de este tamaño.',
    },
    {
      pregunta: '7. ¿Cuánto tarda la limpieza de una alfombra?',
      respuesta:
        'El plazo varía en función del tamaño de la alfombra, el tipo de fibra, la suciedad o manchas presentes, el proceso de secado completo y la ruta de recogida y entrega. Mimo te indicará la estimación al valorar tu alfombra.',
    },
    {
      pregunta: '8. ¿Cómo se tratan las manchas difíciles o los olores?',
      respuesta:
        'Cada mancha se evalúa según su origen y la resistencia del tejido y de los tintes. Es importante no aplicar remedios caseros antes de entregarla. Aunque trabajamos para recuperar al máximo cada pieza, no se puede garantizar que todas las manchas antiguas u olores desaparezcan por completo.',
    },
    {
      pregunta: '9. ¿Qué ocurre si la alfombra está deteriorada o tiene el reverso desgastado?',
      respuesta:
        'Si la alfombra presenta roturas previas, bordes deshilachados, manchas de humedad antiguas o un soporte trasero engomado deteriorado por el paso del tiempo, conviene avisarlo y enviar fotografías por WhatsApp antes de la recogida para valorar si admite tratamiento.',
    },
    {
      pregunta: '10. ¿Se hacen reparaciones de flecos o restauración de alfombras?',
      respuesta:
        'Cualquier consulta sobre arreglos o necesidades especiales en bordes o flecos debe consultarse previamente con Mimo por WhatsApp enviando una fotografía detallada para confirmar si es posible atender ese caso concreto.',
    },
  ],
  enlacesRelacionados: [
    {
      titulo: 'Cortinas, edredones y textiles del hogar',
      href: '/textiles-hogar-vigo',
      descripcion: 'Cuidado profesional de edredones, mantas, ropa de cama, fundas de sofá y cortinas en Vigo.',
    },
    {
      titulo: 'Recogida y entrega a domicilio',
      href: '/recogida-a-domicilio',
      descripcion: 'Consulta cómo solicitar que pasemos a recoger tus prendas y textiles en tu domicilio.',
    },
    {
      titulo: 'Limpieza para apartamentos turísticos',
      href: '/limpieza-apartamentos-turisticos-vigo',
      descripcion: 'Soluciones de lavandería, textil de hogar y limpieza para alojamientos turísticos en Vigo.',
    },
  ],
};

// SECCIÓN 7 DEL PLAN MAESTRO: Servicio destacado de costura y arreglos de ropa (/arreglos-de-ropa-vigo)
// Nota de control interno (no se publica como texto visible en la página):
// - [PENDIENTE: confirmar internamente quién realiza cada trabajo entre tienda propia/taller colaborador, quién cobra al cliente y quién responde ante una incidencia]
// - En la tarifa interna los arreglos figuran todos a 1,00 € como valor provisional: prohibido usar cifras o estimaciones de precio en la web.
export const SERVICIO_ARREGLOS_DATA = {
  url: '/arreglos-de-ropa-vigo',
  canonical: 'https://www.tintoreriamimos.es/arreglos-de-ropa-vigo',
  seoTitle: 'Arreglos de Ropa en Vigo: Costura y Composturas Profesionales | Mimos',
  metaDescription:
    'Servicio profesional de arreglos de ropa, costura y composturas en Vigo (3 tiendas propias) y puntos con costura en Gondomar, Ponteareas y O Porriño. Consulta con Mimo.',
  h1: 'Arreglos de ropa en Vigo: costura y composturas profesionales',
  subtituloCabecera:
    'Adaptamos, reparamos y damos una segunda vida a tus prendas con acabados cuidados en nuestras 3 tiendas propias de Vigo y en nuestra red de talleres colaboradores con costura.',
  trabajosConfirmados: [
    {
      id: 'bajos-bastillas',
      titulo: 'Bajos y bastillas',
      descripcion:
        'Subir o bajar el largo de pantalones de vestir, vaqueros, faldas, vestidos de calle o ceremonia, mangas de camisas, americanas, chaquetas y abrigos respetando el acabado original.',
      prendasHabituales: 'Pantalones, faldas, vestidos, camisas, chaquetas y abrigos',
    },
    {
      id: 'cremalleras',
      titulo: 'Cambio y reparación de cremalleras',
      descripcion:
        'Sustitución completa de cremalleras rotas o atascadas (visibles, invisibles o metálicas) y ajuste de cursores en prendas de diario y de abrigo.',
      prendasHabituales: 'Pantalones, faldas, vestidos, chaquetas y abrigos',
    },
    {
      id: 'botones-cierres',
      titulo: 'Botones, ojales y cierres',
      descripcion:
        'Reposición y cosido reforzado de botones en camisas, trajes y abrigos, así como ajuste de corchetes, broches y cierres de cintura.',
      prendasHabituales: 'Camisas, pantalones, faldas, chaquetas y abrigos',
    },
    {
      id: 'estrechar-ensanchar',
      titulo: 'Estrechar y ensanchar prendas',
      descripcion:
        'Entallado o ampliación de prendas según las costuras y el margen interior del tejido para recuperar un ajuste favorecedor y cómodo.',
      prendasHabituales: 'Vestidos, camisas, chaquetas, pantalones y faldas',
    },
    {
      id: 'ajustes-cintura',
      titulo: 'Ajustes de cintura y tiro',
      descripcion:
        'Entrar o sacar cintura en pantalones de vestir, vaqueros y faldas para que la prenda asiente con precisión sin hacer bolsas.',
      prendasHabituales: 'Pantalones, faldas y vestidos',
    },
    {
      id: 'zurcidos-descosidos',
      titulo: 'Zurcidos, descosidos y rotos',
      descripcion:
        'Reparación de costuras abiertas, bajos sueltos, bolsillos o forros descosidos y pequeños rotos o enganchones en tus prendas habituales.',
      prendasHabituales: 'Pantalones, faldas, vestidos, camisas, chaquetas y abrigos',
    },
  ],
  prendasConfirmadas: [
    'Pantalones (de vestir, pinzas, chinos y vaqueros)',
    'Faldas de diario, oficina y ceremonia',
    'Vestidos de calle, fiesta e invitada',
    'Camisas y blusas',
    'Chaquetas, americanas y blazers',
    'Abrigos, gabardinas y prendas de entretiempo',
  ],
  comoPedirloPasos: [
    {
      num: '01',
      titulo: 'Consúltanos por WhatsApp o acude a tu punto de costura',
      descripcion:
        'Puedes escribir a nuestro asistente Mimo indicando qué arreglo necesitas y en qué zona estás, o llevar directamente la prenda a cualquiera de nuestras 3 tiendas propias en Vigo o a los puntos colaboradores con servicio de costura.',
    },
    {
      num: '02',
      titulo: 'Revisión de la prenda y toma de medidas en mostrador',
      descripcion:
        'Al entregar la prenda revisamos el tejido, el forro, las costuras y el ajuste necesario (o marcamos con alfileres si requiere medida sobre la prenda) para confirmar la viabilidad del arreglo.',
    },
    {
      num: '03',
      titulo: 'Confirmación de presupuesto y plazo antes de intervenir',
      descripcion:
        'Te informamos del presupuesto y del plazo estimado según el tipo de compostura, la complejidad y la disponibilidad del establecimiento. Si lo deseas, puedes combinar el arreglo con la tintorería o el planchado profesional.',
    },
  ],
  factoresPresupuestoYPlazo: [
    {
      titulo: 'Tipo de arreglo y confección',
      detalle:
        'No lleva el mismo trabajo coser un botón o repasar un descosido que sustituir la cremallera completa de un abrigo o entallar una chaqueta con forro.',
    },
    {
      titulo: 'Naturaleza y delicadeza del tejido',
      detalle:
        'Los tejidos finos, vestidos de ceremonia, paños gruesos de abrigo o prendas estructuradas requieren mayor precisión de aguja y acabado.',
    },
    {
      titulo: 'Complejidad estructural de la prenda',
      detalle:
        'La presencia de forros interiores, aberturas traseras, vivos, pliegues o dobles costuras influye tanto en el trabajo de costura como en el tiempo necesario.',
    },
    {
      titulo: 'Disponibilidad de cada establecimiento',
      detalle:
        'El plazo se confirma al recibir y revisar la prenda en la tienda propia o en el taller colaborador correspondiente, según la carga de trabajo de cada punto.',
    },
  ],
  preguntasFrecuentes: [
    {
      pregunta: '1. ¿Qué tipos de arreglo de bajos y bastillas realizáis?',
      respuesta:
        'Realizamos bajos y bastillas en pantalones (de vestir, pinzas o vaqueros), faldas, vestidos, mangas de camisas, chaquetas y abrigos, cuidando que el hilo y la caída respeten el diseño original de la prenda.',
    },
    {
      pregunta: '2. ¿Cambiáis cremalleras en pantalones, vestidos, chaquetas y abrigos?',
      respuesta:
        'Sí. Sustituimos y reparamos cremalleras dañadas o atascadas en pantalones, faldas, vestidos, chaquetas y abrigos, seleccionando el tipo de cierre adecuado para cada prenda.',
    },
    {
      pregunta: '3. ¿Hacéis arreglos en prendas delicadas o vestidos de fiesta y ceremonia?',
      respuesta:
        'Sí, valoramos ajustes de largo, bajos, cierres, cintura o entallado en vestidos y trajes. Al tratarse de tejidos delicados, es imprescindible ver la prenda en el establecimiento para confirmar cómo debe realizarse la compostura y, si lo necesitas, combinarla con nuestro servicio de tintorería y planchado profesional.',
    },
    {
      pregunta: '4. ¿Arregláis ropa del hogar, cortinas o prendas especiales como pieles?',
      respuesta:
        'Nuestros arreglos habituales confirmados se centran en prendas de vestir (pantalones, faldas, vestidos, camisas, chaquetas y abrigos). Para cualquier consulta sobre textiles del hogar, cortinas u otros tejidos especiales, escríbenos antes por WhatsApp a Mimo para confirmar si está disponible y en qué establecimiento puede atenderse.',
    },
    {
      pregunta: '5. ¿Cómo puedo saber el presupuesto de un arreglo de ropa?',
      respuesta:
        'No publicamos tarifas estándar cerradas porque cada compostura depende de la prenda, el tejido y la complejidad (por ejemplo, si lleva forro o requiere desmontar piezas). Puedes orientarte escribiendo a Mimo por WhatsApp en el 655 536 844 y el presupuesto definitivo se confirma al revisar la prenda.',
    },
    {
      pregunta: '6. ¿Cuál es el plazo habitual para los arreglos de costura?',
      respuesta:
        'El plazo depende del tipo de arreglo, la dificultad técnica del tejido y la disponibilidad de trabajo del establecimiento en ese momento. Al dejar tu prenda te indicaremos la fecha estimada de recogida, sin prometer plazos exprés sin haber revisado antes la prenda.',
    },
    {
      pregunta: '7. ¿En qué tiendas propias y puntos colaboradores puedo entregar una prenda para arreglar?',
      respuesta:
        'Puedes acudir a nuestras 3 tiendas propias en Vigo (C/ As Teixugueiras 11 en Navia, Rúa de Venezuela 34 y Avda. Alcalde Gregorio Espino 44) y a los puntos colaboradores con servicio de costura en Gondomar (Puntadas No Aire), Ponteareas (Arreglado2) y O Porriño (Telas y Más). Importante: el punto colaborador de Redondela (C/ José Regojo, 29) y el de Vigo D\'Passo (Espedrigada, 9) NO realizan arreglos de costura, solo recepción de tintorería y lavandería.',
    },
  ],
  enlacesRelacionados: [
    {
      titulo: 'Tintorería profesional en Vigo',
      href: '/tintoreria-vigo',
      descripcion:
        'Combina el arreglo de tu traje, abrigo o vestido de ceremonia con nuestra limpieza en seco y desmanchado profesional.',
    },
    {
      titulo: 'Lavandería y planchado profesional',
      href: '/lavanderia-vigo',
      descripcion:
        'Cuidado en agua y planchado impecable para camisas, pantalones y prendas de diario tras su compostura.',
    },
    {
      titulo: 'Localizador de tiendas y puntos Mimos',
      href: '/puntos-mimos',
      descripcion:
        'Consulta todos los horarios, direcciones y teléfonos de nuestras tiendas propias en Vigo y puntos colaboradores.',
    },
  ],
};

