import puntosRaw from './puntos.json';

export const IMAGES = {
  ositoMimos: '/osito-mimos.jpg',
  logoMimos: '/logo-mimos.webp',
  tiendaMimos: '/tienda-mimos.jpg',
  b2bApartamentos: '/apartamentos-mimos.jpg',
  alfombrasMimos: '/alfombras-mimos.webp',
  blogVino: '/blog-vino.jpg',
  blogEdredon: '/blog-edredon.jpg',
  blogColadaCasa: '/blog-colada-casa.jpg',
  blogMontarTintoreria: '/blog-montar-tintoreria.jpg',
  servicioTintoreria: '/servicio-tintoreria.jpg',
  arreglosRopa: '/arreglos-ropa-mimos.jpg',
};

export const MIMOS_LOGO_DATA_URI = '/logo-mimos.webp';

export function buildMimoWhatsAppUrl(message: string): string {
  return `https://wa.me/34655536844?text=${encodeURIComponent(message)}`;
}

export function buildGoogleMapsUrl(punto: {
  direccion: string;
  codigo_postal: string;
  localidad: string;
  latitud?: number | null;
  longitud?: number | null;
}): string {
  if (typeof punto.latitud === 'number' && typeof punto.longitud === 'number') {
    return `https://www.google.com/maps/search/?api=1&query=${punto.latitud},${punto.longitud}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${punto.direccion}, ${punto.codigo_postal} ${punto.localidad}`
  )}`;
}

// Tipado del archivo único de puntos (src/data/puntos.json)
export type TramoHorario = [string, string];

export interface HorarioEstructuradoRaw {
  zona_horaria: string;
  lunes: TramoHorario[];
  martes: TramoHorario[];
  miercoles: TramoHorario[];
  jueves: TramoHorario[];
  viernes: TramoHorario[];
  sabado: TramoHorario[];
  domingo: TramoHorario[];
}

export interface HorarioEstructurado extends HorarioEstructuradoRaw {
  resumen: string;
}

export interface PuntoRegistroRaw {
  id: string;
  activo: boolean;
  tipo: 'tienda' | 'punto';
  nombre_comercio: string;
  nombre_mostrado: string;
  localidad: string;
  zona_slug: string;
  direccion: string;
  codigo_postal: string;
  latitud: number | null;
  longitud: number | null;
  telefono: string;
  telefonos_mostrados: string;
  horario: HorarioEstructuradoRaw;
  servicios_confirmados: string[];
  arreglos_confirmados: string[];
  dias_de_ruta: string;
  plazo: string;
  hora_limite: string;
  instrucciones_entrega_recogida: string;
  foto: string;
  referencia_local: string;
  aparcamiento: string;
  cierre_temporal: boolean | string;
  permiso_comercio: string;
}

export interface PuntoRegistro extends Omit<PuntoRegistroRaw, 'horario'> {
  horario: HorarioEstructurado;
  servicios_admitidos: string[];
}

export const ETIQUETAS_SERVICIOS_CONFIRMADOS: Record<string, string> = {
  tintoreria: 'Tintorería profesional',
  lavanderia: 'Lavandería',
  planchado: 'Planchado profesional',
  colada_familiar: 'Colada familiar (lavado, secado y doblado)',
  textiles_hogar: 'Limpieza de textiles del hogar (edredones, mantas y cortinas)',
  limpieza_alfombras: 'Limpieza de alfombras',
  costura_arreglos: 'Costura y arreglos de ropa',
  alojamientos_empresas: 'Servicio para alojamientos turísticos y empresas',
};

export function derivarEtiquetasServicios(serviciosConfirmados: string[]): string[] {
  return serviciosConfirmados
    .map((clave) => ETIQUETAS_SERVICIOS_CONFIRMADOS[clave])
    .filter((etiqueta): etiqueta is string => Boolean(etiqueta));
}

function formatearTramosDia(tramos: TramoHorario[]): string {
  if (!tramos || tramos.length === 0) return '';
  return tramos.map(([inicio, fin]) => `${inicio}-${fin}`).join(' y ');
}

export function derivarResumenHorario(horario: HorarioEstructuradoRaw): string {
  const diasLaborables: { abrev: string; tramos: string }[] = [
    { abrev: 'L', tramos: formatearTramosDia(horario.lunes) },
    { abrev: 'M', tramos: formatearTramosDia(horario.martes) },
    { abrev: 'X', tramos: formatearTramosDia(horario.miercoles) },
    { abrev: 'J', tramos: formatearTramosDia(horario.jueves) },
    { abrev: 'V', tramos: formatearTramosDia(horario.viernes) },
  ];

  const grupos: { inicio: string; fin: string; tramos: string }[] = [];
  for (const dia of diasLaborables) {
    if (!dia.tramos) continue;
    const ultimo = grupos[grupos.length - 1];
    if (ultimo && ultimo.tramos === dia.tramos) {
      ultimo.fin = dia.abrev;
    } else {
      grupos.push({ inicio: dia.abrev, fin: dia.abrev, tramos: dia.tramos });
    }
  }

  const partes: string[] = grupos.map((g) => {
    const rango = g.inicio === g.fin ? g.inicio : `${g.inicio}-${g.fin}`;
    return `${rango} ${g.tramos}`;
  });

  const sabTramos = formatearTramosDia(horario.sabado);
  partes.push(sabTramos ? `Sáb ${sabTramos}` : 'Sáb cerrado');

  const domTramos = formatearTramosDia(horario.domingo);
  if (domTramos) {
    partes.push(`Dom ${domTramos}`);
  }

  return partes.join(' · ');
}

export function derivarDatosDesdePuntos(rawList: PuntoRegistroRaw[]) {
  const registrosPuntos: PuntoRegistro[] = rawList
    .filter((p) => p.activo === true)
    .map((p) => ({
      ...p,
      horario: {
        ...p.horario,
        resumen: derivarResumenHorario(p.horario),
      },
      servicios_admitidos: derivarEtiquetasServicios(p.servicios_confirmados),
    }));

  const tiendasPropias = registrosPuntos.filter((p) => p.tipo === 'tienda');
  const puntosColaboradores = registrosPuntos.filter((p) => p.tipo === 'punto');
  const puntosConCostura = registrosPuntos.filter((p) =>
    p.servicios_confirmados.includes('costura_arreglos')
  );
  const puntosSinCostura = registrosPuntos.filter(
    (p) => !p.servicios_confirmados.includes('costura_arreglos')
  );
  const zonasServicio = Array.from(new Set(registrosPuntos.map((p) => p.localidad)));

  return {
    registrosPuntos,
    tiendasPropias,
    puntosColaboradores,
    puntosConCostura,
    puntosSinCostura,
    zonasServicio,
  };
}

const datosDerivados = derivarDatosDesdePuntos(puntosRaw as unknown as PuntoRegistroRaw[]);

export const REGISTROS_PUNTOS: PuntoRegistro[] = datosDerivados.registrosPuntos;
export const TIENDAS_PROPIAS: PuntoRegistro[] = datosDerivados.tiendasPropias;
export const PUNTOS_COLABORADORES: PuntoRegistro[] = datosDerivados.puntosColaboradores;
export const PUNTOS_CON_COSTURA: PuntoRegistro[] = datosDerivados.puntosConCostura;
export const PUNTOS_SIN_COSTURA: PuntoRegistro[] = datosDerivados.puntosSinCostura;
export const ZONAS_SERVICIO: string[] = datosDerivados.zonasServicio;

const sedeNavia =
  REGISTROS_PUNTOS.find((p) => p.id === 'as-teixugueiras') ?? TIENDAS_PROPIAS[0];
const resumenNaviaPartes = (
  sedeNavia?.horario.resumen ?? 'L-V 09:30-14:00 y 16:00-20:00 · Sáb 10:00-13:30'
).split(' · ');

// Datos verificados del negocio derivados de la sede activa en puntos.json
export const CONTACT_INFO = {
  companyName: sedeNavia?.nombre_mostrado ?? 'Tintorería Mimos Navia',
  legalName: sedeNavia?.nombre_comercio ?? 'Tintorería Mimos Navia, S.L.',
  cif: 'B27755925',
  registroMercantil: 'Registro Mercantil de Pontevedra (en proceso de incorporación previa a publicación)',
  canalEtico:
    'Consultas y comunicaciones a través de info@tintoreriamimos.es',
  streetAddress: sedeNavia?.direccion ?? 'C/ Teixugueiras, 11, bajo 9',
  postalCode: sedeNavia?.codigo_postal ?? '36212',
  locality: sedeNavia?.localidad ?? 'Vigo',
  region: 'Pontevedra',
  phoneDisplay: sedeNavia?.telefonos_mostrados ?? '986 12 51 41',
  phoneHref: `tel:+34${sedeNavia?.telefono ?? '986125141'}`,
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
    'https://www.google.com/maps/search/?api=1&query=Tintorer%C3%ADa+Mimos+Navia+C%2F+Teixugueiras+11+bajo+9+36212+Vigo',
  googleReviewsHref:
    'https://www.google.com/maps/search/?api=1&query=Tintorer%C3%ADa+Mimos+Vigo',
  scheduleWeekdays: resumenNaviaPartes[0] ?? 'L-V 09:30-14:00 y 16:00-20:00',
  scheduleSaturday: resumenNaviaPartes[1] ?? 'Sáb 10:00-13:30',
  scheduleFullNavia:
    sedeNavia?.horario.resumen ?? 'L-V 09:30-14:00 y 16:00-20:00 · Sáb 10:00-13:30',
  canonicalBase: 'https://www.tintoreriamimos.es',
};

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
      'Costura y arreglos de ropa en nuestras 3 tiendas propias de Vigo y en los puntos colaboradores con servicio de costura',
    ],
    comoSeContrata: [
      `Entrega directa en cualquiera de nuestras ${TIENDAS_PROPIAS.length} tiendas propias en Vigo (${TIENDAS_PROPIAS.map((t) => t.direccion).join(', ')}).`,
      `Depósito en nuestra red de establecimientos colaboradores en ${ZONAS_SERVICIO.join(', ')}.`,
      'Solicitud de recogida y entrega a domicilio consultando previamente con Mimo por WhatsApp.',
    ],
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
      'Valoración personalizada con Mimo según el volumen y las prendas de tu colada',
    ],
    comoSeContrata: [
      'Escríbenos por WhatsApp para que Mimo te explique las condiciones de la colada familiar.',
      'Entrégala en tienda, en tu punto colaborador o solicita recogida a domicilio según tu zona.',
    ],
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
      'Entrégalos directamente en cualquiera de nuestras 3 tiendas propias en Vigo o deposítalos en nuestra red de puntos colaboradores de recogida y entrega en la comarca para su tratamiento en nuestras instalaciones de Mimos Navia.',
      'Para piezas voluminosas como alfombras o varios edredones, consulta con Mimo o solicita recogida a domicilio por WhatsApp.',
    ],
    ctaTexto: 'Preguntar precio por WhatsApp',
    whatsappMensaje: 'Hola, Mimo. Quiero consultar el precio de lavar un edredón',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el precio de lavar un edredón'
    ),
  },
  {
    index: '06',
    id: 'pieles-y-cuero',
    url: '/limpieza-pieles-cuero-vigo',
    seoTitle: 'Limpieza de Pieles, Cuero, Ante y Nobuk en Vigo | Tintorería Mimos',
    metaDescription:
      'Servicio especializado de limpieza y cuidado de prendas de piel, cuero, ante, nobuk y peletería en Vigo. Recepción en tiendas propias, puntos colaboradores o a domicilio.',
    h1: 'Limpieza especializada de pieles, cuero, ante y nobuk en Vigo',
    titulo: 'Limpieza de pieles y cuero',
    subtitulo: 'Cuidado específico para cazadoras de cuero, ante, nobuk, peletería y prendas combinadas',
    descripcion:
      'Las prendas de piel, ante, nobuk, napa y peletería requieren procesos de limpieza, nutrición y acabado completamente distintos a los de un tejido convencional. Valoramos cada prenda de forma individualizada para aplicar el tratamiento específico que conserve su flexibilidad, tacto y tonalidad sin resecar ni acartonar la piel.',
    queTratamos: [
      'Cazadoras, chaquetas, abrigos, faldas y pantalones de cuero liso o napa',
      'Prendas y chaquetones de ante, serraje, nobuk y doble faz',
      'Abrigos de piel, peletería y prendas de abrigo con cuellos o apliques de piel natural',
      'Prendas textiles combinadas con piezas de cuero o ante que exigen tratamiento diferenciado',
      'Revisión previa del estado de la piel, elasticidad, costuras y solidez de la tintura antes de su procesado',
    ],
    comoSeContrata: [
      'Entrégala en cualquiera de nuestras 3 tiendas propias en Vigo o deposítala en nuestra red de establecimientos colaboradores de recogida y entrega para que gestionemos su tratamiento especializado.',
      'Ten en cuenta que los artículos de piel, ante y cuero llevan un tratamiento técnico específico y plazos de entrega propios superiores a la tintorería habitual, que te confirmaremos tras revisar la prenda.',
      'Escribe a Mimo por WhatsApp para consultar el presupuesto o solicitar recogida y entrega a domicilio.',
    ],
    ctaTexto: 'Consultar prenda de piel con Mimo',
    whatsappMensaje:
      'Hola, Mimo. Quiero consultar la limpieza de una prenda de piel o cuero en Vigo',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar la limpieza de una prenda de piel o cuero en Vigo'
    ),
  },
  {
    index: '07',
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
      'Soluciones de limpieza entre reservas y puesta a punto adaptadas a cada alojamiento',
    ],
    comoSeContrata: [
      'Sin tarifas cerradas estándar: estudiamos el número de alojamientos, camas y rotación.',
      'Pulsa en pedir presupuesto y Mimo recogerá los datos de tu alojamiento por WhatsApp.',
    ],
    ctaTexto: 'Pide presupuesto para tu empresa',
    whatsappMensaje:
      'Hola, Mimo. Quiero solicitar un presupuesto para la limpieza y lavandería de apartamentos turísticos',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar un presupuesto para la limpieza y lavandería de apartamentos turísticos'
    ),
  },
  {
    index: '08',
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
    index: '09',
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
      'Recogida de prendas de tintorería, pieles, coladas familiares, edredones y alfombras',
      'Seguimiento y solicitud mediante WhatsApp con Mimo, teléfono o la aplicación Wash In Town',
      'Plazos e información del pedido confirmados directamente al gestionar tu solicitud',
    ],
    comoSeContrata: [
      'Escribe a Mimo por WhatsApp o rellena el formulario de recogida indicando tu dirección o código postal.',
      'O bien deposita tus prendas en cualquiera de nuestros establecimientos colaboradores sin cita previa.',
    ],
    ctaTexto: 'Solicitar recogida por WhatsApp',
    whatsappMensaje:
      'Hola, Mimo. Quiero consultar las condiciones de recogida y entrega a domicilio',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar las condiciones de recogida y entrega a domicilio'
    ),
  },
];

// Modalidades orientativas de apartamentos turísticos (Sección 3.B del Plan Maestro)
export const PACKS_APARTAMENTOS_BORRADOR = [
  {
    id: 'pack-lenceria',
    nombre: 'Modalidad 1 · Lavandería de Lencería para Alojamientos',
    estado: 'Propuesta a medida según rotación',
    descripcion:
      'Lavado, higienización, secado y planchado de juegos de sábanas, fundas nórdicas, fundas de almohada y toallas de tus apartamentos turísticos en Vigo.',
    incluye: [
      'Higienización y planchado profesional de ropa de cama y baño',
      'Opciones adaptadas al equipamiento textil de cada alojamiento',
      'Entrega en tienda o recogida coordinada según tus rotaciones',
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar un presupuesto para la lavandería de ropa de cama y toallas de apartamentos turísticos'
    ),
  },
  {
    id: 'pack-checkout',
    nombre: 'Modalidad 2 · Limpieza entre Reservas + Lavandería',
    estado: 'Propuesta a medida según inmueble',
    descripcion:
      'Solución combinada para propietarios y anfitriones: preparación del apartamento tras la salida del huésped junto con la renovación de toda la ropa de cama y toallas limpias.',
    incluye: [
      'Puesta a punto del alojamiento entre reservas según necesidades del inmueble',
      'Retirada de textil usado y reposición de juegos higienizados por Tintorería Mimos',
      'Coordinación directa por WhatsApp según calendario de entradas',
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar un presupuesto para la limpieza check-out y lavandería de mi apartamento turístico'
    ),
  },
  {
    id: 'pack-empresas-pisos',
    nombre: 'Modalidad 3 · Gestoras y Propietarios con Varios Apartamentos',
    estado: 'Propuesta integral para carteras',
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

// Información de las páginas por localidad (Sección 5: contenido único por municipio, con noindex mientras esté en revisión previa a publicación)
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

const ZONAS_SEO_LOCAL_BASE: ZonaSEOLocal[] = [
  {
    slug: 'redondela',
    url: '/zonas/redondela',
    canonical: 'https://www.tintoreriamimos.es/zonas/redondela',
    localidad: 'Redondela',
    comarca: 'Ría de Vigo',
    codigosPostales: '36800',
    tienePendientes: false,
    seoTitle: 'Servicio de Tintorería y Lavandería en Redondela | Punto Colaborador Mimos',
    metaDescription:
      'Punto colaborador de recogida y entrega Mimos Redondela en C/ José Regojo, 29 bajo (36800 Redondela) para prendas, alfombras y textiles del hogar. Consulta con Mimo.',
    h1: 'Servicio de tintorería y lavandería Mimos en Redondela',
    subtitulo:
      'Entrega y recoge tus prendas y textiles para los servicios de Tintorería Mimos en el establecimiento colaborador Mimos Redondela situado en C/ José Regojo, 29 bajo, en el casco urbano de Redondela.',
    explicacionEspecificaZona: [
      'Para los vecinos del centro de Redondela, Vilavella y el entorno de la alameda y el viaducto, desplazarse en coche hasta Vigo solo para llevar un abrigo, un traje de ceremonia o un edredón supone perder tiempo y buscar aparcamiento.',
      'Por eso ofrecemos el servicio de recepción y entrega de Tintorería Mimos a través del establecimiento colaborador Mimos Redondela situado en la C/ José Regojo, 29 bajo (36800 Redondela). En este punto colaborador puedes entregar tus prendas de vestir, alfombras y textiles del hogar para que sean gestionados y tratados en nuestras instalaciones propias de Tintorería Mimos Navia en Vigo.',
    ],
    pasosEntregaRecogida: [
      {
        paso: '01',
        titulo: 'Entrega en C/ José Regojo, 29 bajo (Redondela)',
        detalle:
          'Acércate en horario de lunes a viernes (10:00-13:30 y 17:00-20:00) o sábados (10:00-13:00) para depositar tus prendas o textiles para los servicios de Tintorería Mimos.',
      },
      {
        paso: '02',
        titulo: 'Tratamiento en la central de Tintorería Mimos en Vigo',
        detalle:
          'Recogemos tu encargo en el punto colaborador de Redondela dentro de nuestra ruta periódica y realizamos el desmanchado, lavado en seco o acuoso, secado y planchado en nuestras instalaciones propias de Navia.',
      },
      {
        paso: '03',
        titulo: 'Recogida en el mismo establecimiento colaborador',
        detalle:
          'Una vez finalizado el tratamiento en Vigo y devuelto el pedido al punto de Redondela, podrás pasar a retirarlo cómodamente en su horario de apertura.',
      },
    ],
    preguntasFrecuentes: [
      {
        pregunta: '¿Cómo funciona el punto Mimos Redondela en C/ José Regojo 29?',
        respuesta:
          'Es un establecimiento colaborador de recogida y entrega en Redondela (C/ José Regojo, 29 bajo, teléfono 613 62 47 24) donde puedes dejar tus prendas, colada familiar, alfombras y textiles del hogar para que Tintorería Mimos Navia, S.L. gestione su tratamiento profesional en sus instalaciones de Vigo.',
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
    tienePendientes: false,
    seoTitle: 'Tintorería, Lavandería y Costura en Gondomar | Punto Mimos en Puntadas No Aire',
    metaDescription:
      'Punto colaborador de Tintorería Mimos y arreglos de ropa disponible en Puntadas No Aire (Avda. Elduayen, 9, Gondomar). Recogida y entrega de prendas y costura confirmada.',
    h1: 'Servicio de tintorería, lavandería y arreglos de ropa en Gondomar (Val Miñor)',
    subtitulo:
      'Punto de recogida y entrega de Tintorería Mimos y servicio de costura disponible en Puntadas No Aire (Avda. Elduayen, 9), establecimiento colaborador independiente en el centro de Gondomar.',
    explicacionEspecificaZona: [
      'En la comarca del Val Miñor, contar con un punto colaborador en el propio centro de Gondomar evita desplazamientos innecesarios hasta Vigo tanto para el cuidado de trajes, vestidos, abrigos y textiles del hogar como para realizar arreglos y composturas de ropa.',
      'Nuestro servicio está disponible en Puntadas No Aire, taller y tienda de costura independiente ubicada en Avda. Elduayen, 9 (36380 Gondomar), donde puedes depositar y recoger tus prendas y textiles para que Tintorería Mimos los trate en sus instalaciones de Vigo, además de contar con servicio confirmado de costura y arreglos de ropa (bajos, cremalleras, botones, ajustes de talla y cintura y zurcidos). Su horario matinal desde las 08:00 h de martes a viernes facilita dejar las prendas antes de ir a trabajar.',
    ],
    pasosEntregaRecogida: [
      {
        paso: '01',
        titulo: 'Deposita tus prendas en Puntadas No Aire (Avda. Elduayen, 9)',
        detalle:
          'Abierto L 10:00-13:30 y 16:00-19:00 · M-X 08:00-14:00 y 16:00-19:00 · J-V 08:00-14:00 · Sáb 10:00-13:30, tanto para encargos de Tintorería Mimos como para arreglos de costura.',
      },
      {
        paso: '02',
        titulo: 'Cuidado textil en Mimos Navia o compostura de costura',
        detalle:
          'Los encargos de tintorería, lavandería, planchado y textiles del hogar se trasladan a nuestra central de Navia (Vigo) para su tratamiento profesional, y las prendas para arreglos reciben revisión y compostura de costura.',
      },
      {
        paso: '03',
        titulo: 'Retirada en Gondomar',
        detalle:
          'Cuando tus prendas están listas, las recoges cómodamente en el propio establecimiento colaborador Puntadas No Aire en Gondomar.',
      },
    ],
    preguntasFrecuentes: [
      {
        pregunta: '¿Qué relación hay entre Puntadas No Aire y Tintorería Mimos?',
        respuesta:
          'Puntadas No Aire es un taller y tienda de costura independiente en Gondomar que actúa como establecimiento colaborador para la recogida y entrega de encargos gestionados por Tintorería Mimos Navia, S.L., ofreciendo además servicio confirmado de costura y arreglos de ropa.',
      },
      {
        pregunta: '¿Qué servicios están confirmados en el punto colaborador de Gondomar?',
        respuesta:
          'En Puntadas No Aire (Avda. Elduayen, 9) puedes entregar tus prendas y textiles del hogar para los servicios de Tintorería Mimos (tratados en nuestra central de Vigo) y solicitar costura y arreglos de ropa (bajos, cremalleras, botones, estrechar o ensanchar y zurcidos). Consulta cualquier duda o presupuesto con Mimo por WhatsApp.',
      },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar un servicio de tintorería o costura desde el punto de Gondomar'
    ),
  },
  {
    slug: 'ponteareas',
    url: '/zonas/ponteareas',
    canonical: 'https://www.tintoreriamimos.es/zonas/ponteareas',
    localidad: 'Ponteareas',
    comarca: 'O Condado',
    codigosPostales: '36860',
    tienePendientes: false,
    seoTitle: 'Tintorería, Lavandería y Costura en Ponteareas | Punto Mimos en Arregla2',
    metaDescription:
      'Punto colaborador de Tintorería Mimos y arreglos de ropa disponible en Arregla2 (C/ Argentina, 4, Ponteareas). Recogida y entrega de prendas y costura confirmada.',
    h1: 'Servicio de tintorería, lavandería y arreglos de ropa en Ponteareas',
    subtitulo:
      'Punto de recogida y entrega de Tintorería Mimos y servicio de costura disponible en Arregla2, tienda y taller de costura colaborador independiente en C/ Argentina, 4 (Ponteareas).',
    explicacionEspecificaZona: [
      'Ponteareas es la cabecera comercial de toda la comarca de O Condado. Tanto para trajes de ceremonia, bodas y eventos como para el cuidado de abrigos, edredones o el arreglo y ajuste de prendas, los vecinos de Ponteareas disponen de un punto colaborador en pleno casco urbano.',
      'El servicio se gestiona en C/ Argentina, 4, en el establecimiento colaborador independiente Arregla2 (tienda y taller de costura), donde puedes entregar y recoger tus prendas y textiles para su tratamiento en las instalaciones de Tintorería Mimos en Vigo, junto con el servicio confirmado de costura y arreglos de ropa.',
    ],
    pasosEntregaRecogida: [
      {
        paso: '01',
        titulo: 'Acude a C/ Argentina, 4 (Ponteareas)',
        detalle:
          'Horario del establecimiento colaborador: L-V 09:30-13:30 y 16:00-19:30 · Sáb 09:30-13:30 para entregar tus prendas y textiles para Tintorería Mimos o tus arreglos de costura.',
      },
      {
        paso: '02',
        titulo: 'Tratamiento de tintorería en Vigo o arreglo de costura',
        detalle:
          'Recogemos las prendas y textiles del hogar para tratarlos en nuestra central de Tintorería Mimos Navia (Vigo), y se atienden los arreglos y composturas de ropa confirmados en el punto.',
      },
      {
        paso: '03',
        titulo: 'Recogida en C/ Argentina, 4',
        detalle:
          'Una vez terminado el servicio, retiras tus prendas listas en el mismo establecimiento colaborador de Ponteareas.',
      },
    ],
    preguntasFrecuentes: [
      {
        pregunta: '¿Dónde puedo dejar mis prendas para tintorería o arreglos de ropa en Ponteareas?',
        respuesta:
          'En el establecimiento colaborador independiente Arregla2, situado en C/ Argentina, 4 (36860 Ponteareas), teléfono 647 61 66 15, en horario de lunes a viernes de 09:30 a 13:30 y de 16:00 a 19:30, y sábados de 09:30 a 13:30.',
      },
      {
        pregunta: '¿Qué servicios están confirmados en el punto colaborador de Ponteareas?',
        respuesta:
          'Actúa como punto de recogida y entrega para los servicios de Tintorería Mimos (tratados en nuestra central de Vigo) y dispone de servicio confirmado de costura y arreglos de ropa (bajos, bastillas, cremalleras, botones, ajustes de talla y zurcidos). Puedes consultar previamente con Mimo por WhatsApp.',
      },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar un servicio de tintorería o costura desde el punto de Ponteareas'
    ),
  },
  {
    slug: 'o-porrino',
    url: '/zonas/o-porrino',
    canonical: 'https://www.tintoreriamimos.es/zonas/o-porrino',
    localidad: 'O Porriño',
    comarca: 'A Louriña',
    codigosPostales: '36400',
    tienePendientes: false,
    seoTitle: 'Tintorería, Lavandería y Costura en O Porriño | Punto Mimos en Telas y Más',
    metaDescription:
      'Punto colaborador de Tintorería Mimos y arreglos de ropa disponible en Telas y Más (C/ Manuel Rodríguez, 30, O Porriño). Recogida y entrega de prendas y costura confirmada.',
    h1: 'Servicio de tintorería, lavandería y arreglos de ropa en O Porriño',
    subtitulo:
      'Punto de recogida y entrega de Tintorería Mimos y servicio de costura disponible en Telas y Más (C/ Manuel Rodríguez, 30), establecimiento colaborador independiente en el centro de O Porriño.',
    explicacionEspecificaZona: [
      'En O Porriño y el valle de A Louriña, poder dejar la ropa de diario, trajes, abrigos o textiles del hogar y realizar arreglos de costura en el propio centro urbano ahorra desplazamientos hasta Vigo.',
      'Contamos con la colaboración del comercio independiente Telas y Más, ubicado en C/ Manuel Rodríguez, 30 (36400 O Porriño), donde están confirmados tanto la recogida y entrega de prendas y textiles para su tratamiento por Tintorería Mimos en Vigo como el servicio de costura y arreglos de ropa, con horario de lunes a viernes hasta las 20:30 h y los sábados por la mañana.',
    ],
    pasosEntregaRecogida: [
      {
        paso: '01',
        titulo: 'Entrega tus prendas en Telas y Más (C/ Manuel Rodríguez, 30)',
        detalle:
          'Horario en O Porriño: L-V 10:00-13:30 y 17:00-20:30 · Sáb 10:00-13:30 para recepción de encargos de Tintorería Mimos y arreglos de ropa.',
      },
      {
        paso: '02',
        titulo: 'Procesado profesional en Mimos Navia o compostura textil',
        detalle:
          'Recogemos los encargos de tintorería, lavandería, planchado y textiles del hogar para tratarlos en nuestra planta de Vigo y se realizan los arreglos de costura confirmados para tus prendas.',
      },
      {
        paso: '03',
        titulo: 'Recogida cómoda en O Porriño',
        detalle:
          'Una vez listo tu pedido, recoges tus prendas en Telas y Más (C/ Manuel Rodríguez, 30) dentro de su amplio horario comercial.',
      },
    ],
    preguntasFrecuentes: [
      {
        pregunta: '¿Qué servicios ofrece el punto colaborador Telas y Más en O Porriño?',
        respuesta:
          'Telas y Más (C/ Manuel Rodríguez, 30) es un establecimiento colaborador independiente donde puedes entregar y recoger tus prendas y textiles para su tratamiento por Tintorería Mimos en Vigo, y que ofrece además servicio confirmado de costura y arreglos de ropa.',
      },
      {
        pregunta: '¿Cómo consulto un precio o arreglo antes de acudir al punto de O Porriño?',
        respuesta:
          'Escríbenos por WhatsApp al 655 536 844 y nuestro asistente Mimo te informará al instante según la prenda o el arreglo que necesites.',
      },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar un servicio de tintorería o costura desde el punto de O Porriño'
    ),
  },
  {
    slug: 'vigo',
    url: '/zonas/vigo',
    canonical: 'https://www.tintoreriamimos.es/zonas/vigo',
    localidad: 'Vigo',
    comarca: '3 Tiendas propias',
    codigosPostales: '36212 · 36203 · 36205',
    tienePendientes: false,
    seoTitle:
      'Tiendas Propias de Tintorería Mimos en Vigo | Navia, Venezuela y Gregorio Espino',
    metaDescription:
      'Conoce nuestras 3 tiendas propias de Tintorería Mimos en Vigo (C/ Teixugueiras 11, C/ Venezuela 41 y Avda. Alcalde Gregorio Espino 44) con todos los servicios, costura y recogida a domicilio.',
    h1: 'Nuestras 3 tiendas propias en Vigo y servicio de recogida a domicilio',
    subtitulo:
      'Atención directa con todos nuestros servicios (incluida costura y limpieza de alfombras) en nuestras 3 tiendas propias de Tintorería Mimos Navia, S.L. en Vigo, y servicio coordinado de recogida y entrega a domicilio.',
    explicacionEspecificaZona: [
      'En Vigo contamos con 3 tiendas propias de Tintorería Mimos Navia, S.L.: la sede central en C/ Teixugueiras, 11, bajo 9 (Navia), la tienda del centro urbano en C/ Venezuela, 41, bajo 1 y la tienda de Avda. Alcalde Gregorio Espino, 44. En nuestras 3 tiendas propias ofrecemos el catálogo completo de Mimos: tintorería profesional, lavandería, planchado, colada familiar, limpieza de alfombras y textiles del hogar, costura y arreglos de ropa, y atención a empresas y alojamientos turísticos.',
      'Para mayor comodidad de particulares, empresas y viviendas turísticas, disponemos también de servicio coordinado de recogida y entrega a domicilio en Vigo y comarca con solicitud directa a través de nuestro asistente Mimo por WhatsApp o formulario web.',
    ],
    pasosEntregaRecogida: [
      {
        paso: '01',
        titulo: 'Elige entre nuestras 3 tiendas propias en Vigo o solicita recogida a domicilio',
        detalle:
          'Acude a cualquiera de nuestras 3 tiendas propias (C/ Teixugueiras 11 en Navia, C/ Venezuela 41 en el centro o Avda. Alcalde Gregorio Espino 44 en O Calvario) para todos los servicios y costura, o solicita recogida a domicilio con Mimo.',
      },
      {
        paso: '02',
        titulo: 'Atención especializada por el equipo de Mimos en Vigo',
        detalle:
          'Revisamos tus prendas y aplicamos el cuidado textil, desmanchado, lavado, planchado o compostura correspondiente en nuestras instalaciones propias de Vigo.',
      },
      {
        paso: '03',
        titulo: 'Aviso y entrega de tus prendas listas',
        detalle:
          'Te informamos cuando tu encargo está terminado para que pases a recogerlo en la tienda elegida o te lo entreguemos cómodamente en tu domicilio.',
      },
    ],
    preguntasFrecuentes: [
      {
        pregunta:
          '¿Dónde están ubicadas las 3 tiendas propias de Mimos en Vigo y qué servicios ofrecen?',
        respuesta:
          'Nuestras 3 tiendas propias se encuentran en C/ Teixugueiras, 11, bajo 9 (Navia, CP 36212), C/ Venezuela, 41, bajo 1 (Centro, CP 36203) y Avda. Alcalde Gregorio Espino, 44 (O Calvario, CP 36205). En las 3 tiendas ofrecemos el catálogo completo de servicios: tintorería profesional, lavandería, planchado, colada, limpieza de alfombras y taller de costura y arreglos de ropa.',
      },
      {
        pregunta: '¿Qué tiendas propias de Vigo abren los sábados por la mañana?',
        respuesta:
          'Las 3 tiendas propias de Vigo abren los sábados por la mañana: la sede de C/ Teixugueiras, 11, bajo 9 (Navia) de 10:00 a 13:30; la tienda de C/ Venezuela, 41, bajo 1 de 10:00 a 14:00; y la tienda de Avda. Alcalde Gregorio Espino, 44 de 09:30 a 13:00.',
      },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar un servicio de tintorería o costura en Vigo'
    ),
  },
];

export const ZONAS_SEO_LOCAL: ZonaSEOLocal[] = ZONAS_SEO_LOCAL_BASE.filter((z) =>
  ZONAS_SERVICIO.includes(z.localidad)
);

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
    respuesta: `Contamos con ${TIENDAS_PROPIAS.length} tiendas propias en Vigo (${TIENDAS_PROPIAS.map((t) => `${t.nombre_mostrado} en ${t.direccion}`).join(', ')}) y, además, colaboramos con ${PUNTOS_COLABORADORES.length} comercios de proximidad en ${Array.from(new Set(PUNTOS_COLABORADORES.map((p) => p.localidad))).join(', ')} donde puedes depositar y recoger tus encargos con la garantía de que son tratados por Tintorería Mimos.`,
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
    seoTitle: 'Símbolos de Lavado en Etiquetas de Ropa (ISO 3758:2023) | Mimos Vigo',
    metaDescription:
      'Guía técnica completa según la norma internacional ISO 3758:2023: significado de los 5 símbolos de las etiquetas de ropa (lavado, blanqueo, secado, plancha y tintorería P, F, W), tablas de temperaturas y consejos de tintorero.',
    categoria: 'Etiquetado textil y cuidado de prendas',
    fechaPublicacion: '13 de octubre de 2026',
    fechaISO: '2026-10-13',
    tiempoLectura: '8 min de lectura',
    extracto:
      'Descubre qué significa cada uno de los cinco pictogramas obligatorios de la norma ISO 3758:2023. Aprende por qué encogen los tejidos, cómo evitar brillos al planchar y cuándo es imprescindible confiar en la tintorería profesional.',
    imagen: '/images/articulos/simbolos-etiquetas-ropa.jpg',
    imagenAlt:
      'Primer plano de manos examinando la etiqueta textil de composición y símbolos de lavado según norma internacional ISO 3758 en una prenda de lana y seda',
    introduccion: [
      'La correcta interpretación del etiquetado textil regulado por la norma internacional ISO 3758:2023 resulta determinante para prolongar la vida útil de tus prendas y prevenir fallos fisicoquímicos derivados del estrés térmico, químico o mecánico.',
      'La norma establece una secuencia obligatoria de cinco pictogramas universales que neutralizan errores de mantenimiento tanto en el hogar como en la industria del cuidado textil: 1. Lavado en agua (cubeta) → 2. Blanqueo (triángulo) → 3. Secado (cuadrado) → 4. Planchado (plancha) → 5. Cuidado profesional (círculo).',
      'Comprender el fundamento técnico de cada pictograma te evitará encogimientos irreversibles en jerséis de lana, rotura de elastano en prendas técnicas o deformación en americanas y trajes con entretela.',
    ],
    secciones: [
      {
        h2: '1. La secuencia obligatoria de la norma ISO 3758:2023',
        parrafos: [
          'En cualquier prenda confeccionada conforme a la normativa europea e internacional, los símbolos aparecen siempre en el mismo orden de izquierda a derecha. Si un fabricante omite un símbolo de la serie, el estándar presupone que la prenda admite el tratamiento general correspondiente a su naturaleza.',
          'El sistema se basa en tres variables críticas: la temperatura máxima permitida (indicada por números en grados Celsius o puntos), la intensidad de la acción mecánica (indicada por barras horizontales bajo el símbolo) y las restricciones químicas absolutas (indicadas por una cruz de San Andrés sobre el pictograma).',
        ],
        puntosClave: [
          'Sin barras: Acción mecánica normal (tejidos resistentes de algodón o fibras sintéticas tenaces).',
          'Una barra inferior: Acción mecánica reducida (programa para sintéticos delicados, agitación moderada y centrifugado suave).',
          'Dos barras inferiores: Acción mecánica muy reducida (programa especial lana/seda, centrifugado corto a bajas revoluciones).',
          'Aspa o cruz (X): Prohibición expresa del tratamiento bajo riesgo de daño irreversible en las fibras.',
        ],
      },
      {
        h2: '2. Lavado en agua (La cubeta): estrés térmico y contracción de fibras',
        parrafos: [
          'El símbolo de la cubeta representa el lavado acuoso doméstico o industrial. El número en su interior especifica la temperatura límite del baño. Superar esta temperatura desestabiliza los enlaces moleculares de la fibra y causa sangrado de tintes reactivos.',
          'En el caso de fibras proteicas como la lana virgen o el cashmere, el agua caliente combinada con la fricción del tambor abre las escamas de la cutícula capilar del pelo de lana. Al enfriarse o centrifugarse, estas escamas se entrelazan irreversiblemente, produciendo el conocido fenómeno del afieltrado (la prenda encoge y queda rígida como un fieltro).',
        ],
        subsecciones: [
          {
            h3: 'Cubeta con 30 °C (1 punto)',
            texto:
              'Indica lavado templado o frío. Vital para preservar el elastano de prendas deportivas, pantalones elásticos, viscosas y sedas lavables. Evita la deformación por dilatación térmica.',
          },
          {
            h3: 'Cubeta con mano sumergida',
            texto:
              'Prohíbe totalmente la lavadora mecánica. Requiere inmersión suave en agua templada (máx. 40 °C) sin frotar ni escurrir. En Tintorería Mimos aplicamos para estas prendas nuestro sistema Wet Cleaning profesional.',
          },
        ],
      },
      {
        h2: '3. Blanqueo (El triángulo): oxidantes clorados vs. oxígeno activo',
        parrafos: [
          'El triángulo regula el uso de agentes blanqueantes y quitamanchas químicos. Los blanqueadores actúan rompiendo químicamente los enlaces dobles de las moléculas que causan las manchas visibles (cromóforos).',
          'El uso indebido de lejía doméstica tradicional (hipoclorito de sodio) en prendas con triángulo con dos líneas o tachado destruye la celulosa del algodón a nivel microscópico, amarillea las poliamidas y quema de forma instantánea la lana y la seda natural.',
        ],
      },
      {
        h2: '4. Secado mecánico y natural (El cuadrado)',
        parrafos: [
          'El cuadrado con círculo interior indica secadora de tambor (tumble dry). Los puntos marcan el límite térmico: un punto para secado delicado a 60 °C y dos puntos para secado normal a 80 °C.',
          'El secado al aire libre es igual de determinante: las líneas horizontales exigen secar en plano (fundamental para jerséis de punto pesado que se deforman si se cuelgan húmedos), mientras que la raya diagonal en la esquina superior izquierda alerta de la necesidad de secar a la sombra para proteger los tintes de la fotodegradación por rayos ultravioleta.',
        ],
      },
      {
        h2: '5. Planchado (La plancha): termofijación y eliminación de brillos',
        parrafos: [
          'Cada punto dentro de la plancha equivale a un escalón térmico de 40 a 50 °C: 1 punto (110 °C, acetato, nylon, acrílico sin vapor), 2 puntos (150 °C, lana y poliéster) y 3 puntos (200 °C, lino y algodón puro).',
          'El principal error doméstico al planchar americanas o pantalones de lana es aplicar la suela caliente directamente sobre el tejido oscuro: el calor excesivo aplasta el pelo de la fibra y crea brillos permanentes. En nuestra tintorería en Vigo trabajamos con mesas de aspiración y maniquís de vapor que vaporizan desde el interior sin tocar el tejido con metal caliente.',
        ],
      },
      {
        h2: '6. Cuidado profesional (El círculo): Percloroetileno (P), Hidrocarburos (F) y Wet Cleaning (W)',
        parrafos: [
          'El círculo es el símbolo que reserva la prenda exclusivamente a instalaciones de tintorería profesional dotadas de maquinaria de circuito cerrado y filtración continua.',
          'La letra «P» autoriza el uso de percloroetileno y solventes halogenados estándar; la «F» restringe el proceso a hidrocarburos más suaves para sedas y pedrerías; y la «W» identifica el sistema Wet Cleaning (limpieza acuosa profesional ecológica), la tecnología puntera que en Tintorería Mimos utilizamos para lavar prendas delicadas con agua sin encogerlas ni alterar su textura.',
        ],
      },
    ],
    advertenciaProfesional:
      'Si has cortado la etiqueta interior de tu abrigo, vestido de fiesta o traje y tienes dudas sobre su composición, no experimentes en casa. En Tintorería Mimos Navia y nuestras tiendas en Vigo realizamos un análisis visual y táctil de la fibra para seleccionar el tratamiento químico exacto que mantendrá tu prenda como el primer día.',
    enlacesInternos: [
      {
        texto: 'Tintorería Profesional y Limpieza en Seco en Vigo',
        href: '/tintoreria-vigo',
        descripcion: 'Cuidado especializado para prendas con símbolo de círculo (P, F o W), trajes y abrigos.',
      },
      {
        texto: 'Planchado Profesional de Camisas y Prendas en Vigo',
        href: '/planchado-vigo',
        descripcion: 'Acabado de sastrería sin brillos con mesas de aspiración y temperatura controlada.',
      },
      {
        texto: 'Limpieza y Secado Controlado de Edredones',
        href: '/edredones-mimos-vigo',
        descripcion: 'Tratamiento volumétrico con recuperación de plumón y desinfección térmica profunda.',
      },
      {
        texto: 'Tiendas Mimos y Puntos de Recogida',
        href: '/puntos-mimos',
        descripcion: 'Localiza nuestras 3 tiendas en Vigo o nuestros puntos colaboradores más cercanos.',
      },
    ],
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Tengo una duda con los símbolos de la etiqueta de una prenda y quiero consultar su cuidado en tintorería'
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
  {
    slug: 'la-colada-en-casa',
    url: '/blog/la-colada-en-casa',
    canonical: 'https://www.tintoreriamimos.es/blog/la-colada-en-casa',
    titulo: 'La colada en casa: ¿Ahorro o pérdida de tiempo y calidad?',
    seoTitle: 'La colada en casa: ¿Ahorro o pérdida de tiempo? | Tintorería Mimos Vigo',
    metaDescription:
      '¿Compensa hacer la colada en casa o en autoservicio? Analizamos el tiempo del fin de semana, el coste de energía, el desgaste textil y las ventajas de externalizar el lavado profesional.',
    categoria: 'Colada y cuidado de ropa',
    fechaPublicacion: '12 de octubre de 2026',
    fechaISO: '2026-10-12',
    tiempoLectura: '4 min de lectura',
    extracto:
      'Una de las tareas domésticas menos reconfortantes es hacer la colada. Entre lavar, clasificar, tender y planchar se va buena parte del fin de semana. Analizamos por qué externalizar este servicio a profesionales alarga la vida de tus prendas y te devuelve tu tiempo libre.',
    imagen: IMAGES.blogColadaCasa,
    imagenAlt:
      'Ropa limpia, recién lavada, planchada y doblada con mimo en un hogar ordenado',
    introduccion: [
      'Una de las tareas domésticas menos reconfortantes es la de realizar la colada. Multitud de unidades familiares dedican buena parte del tiempo del fin de semana a realizar esta tarea: clasificar por colores, lavar, tender, clasificar y planchar la ropa.',
      'Es evidente el gasto de energía y tiempo que se van en esta labor, y normalmente con resultados poco profesionales, bien por falta de experiencia o bien por descuido (ropa desteñida, prendas encogidas, manchas que no salen, etc.).',
    ],
    secciones: [
      {
        h2: '1. El problema del espacio: cuartos pequeños y sin tendales adecuados',
        parrafos: [
          'Otro de los problemas con los que nos encontramos habitualmente en casa es la falta de un lugar adecuado para realizar bien esta labor. Los cuartos de colada suelen ser sitios pequeños donde apenas disponemos del espacio suficiente para tener una lavadora y una secadora.',
          'En muchas ocasiones se carece de tendales o estos son insuficientes, algo altamente recomendable para según qué tipo de prendas que no admiten secadora ni centrifugados agresivos.',
        ],
        puntosClave: [
          'Falta de ventilación natural para secar adecuadamente sábanas y toallas sin acumular humedad en la vivienda.',
          'Riesgo de malos olores si la ropa tarda en secarse en épocas de lluvia o invierno en Galicia.',
          'Dificultad para mantener una separación estricta de tejidos delicados sin espacio físico suficiente.',
        ],
      },
      {
        h2: '2. Las lavanderías autoservicio: limitaciones y costes reales',
        parrafos: [
          'Muchas personas están optando por acudir a las lavanderías autoservicio, donde por unos euros logran tener un entorno más propicio para realizar la colada. Sin embargo, el problema de estos espacios es la falta de control sobre los productos utilizados, ciclos de lavado, temperaturas de secado, etc.',
          'Si eres alguien que realmente quiere mimar tus prendas, sufres al no poder adecuar el lavado al tipo de ropa por la inflexibilidad de este tipo de establecimientos. O bien, porque de usar el lavado adecuado para cada prenda, este tipo de servicios sería realmente costoso económicamente, al necesitar poner 5 ó 6 lavadoras a la semana para separar blancos, colores, ropa de diario y prendas finas.',
        ],
      },
      {
        h2: '3. La solución óptima: externalizar la colada a un equipo profesional',
        parrafos: [
          'Tras darle muchas vueltas a este tema, nos damos cuenta de que una solución óptima es la de externalizar este tipo de servicio a una empresa profesional que lo realice. La cual nos garantice que va a tratar cada prenda de nuestra colada según el etiquetado del fabricante y seleccionando la ropa por colores para proceder a su lavado.',
          'Si bien externalizar supone un coste económico frente a hacerlo uno mismo, el ahorro de tiempo y el alargamiento de la vida útil de las prendas compensa con creces el desembolso. Evitas accidentes de desteñidos, quemaduras de plancha y el desgaste prematuro de tus prendas favoritas.',
        ],
        subsecciones: [
          {
            h3: 'Tratamiento según etiquetado y selección por colores',
            texto:
              'Cada colada se clasifica minuciosamente antes del lavado: ropa blanca, tonos claros, prendas oscuras y tejidos técnicos reciben el programa y los productos óptimos sin mezclas arriesgadas.',
          },
          {
            h3: 'Lavado, secado suave y opción de planchado profesional',
            texto:
              'Entregamos tus prendas listas para usar o guardar: puedes elegir entrega doblada por kilos o planchado impecable de camisas y prendas de vestir.',
          },
        ],
      },
      {
        h2: '4. Recupera tu tiempo libre: nosotros lo tenemos claro, ¿y tú?',
        parrafos: [
          'Así que al final, como casi todo en esta vida, podemos optar por hacerlo nosotros mismos y perder nuestro tiempo en esta ardua tarea, o pagar a alguien para que nos libere de la misma.',
          'En Tintorería Mimos Navia disponemos de servicio de colada familiar (lavado, secado y doblado profesional) con recepción en nuestras 3 tiendas propias en Vigo, recogida y entrega a domicilio y puntos colaboradores en Gondomar, Redondela, Ponteareas y O Porriño.',
        ],
      },
    ],
    advertenciaProfesional:
      'En Tintorería Mimos Navia nos ocupamos de tu colada semanal para que disfrutes de tu fin de semana sin horas perdidas entre lavadoras y planchas. Consulta nuestras condiciones de colada familiar por kilos o recogida a domicilio por WhatsApp.',
    enlacesInternos: [
      {
        texto: 'Servicio de Colada Familiar en Vigo',
        href: '/colada-familiar-vigo',
        descripcion: 'Lavado, secado y doblado de tu ropa de diario para ahorrar tiempo en casa.',
      },
      {
        texto: 'Recogida y Entrega a Domicilio',
        href: '/recogida-a-domicilio',
        descripcion: 'Servicio de recogida a domicilio en Vigo y área metropolitana.',
      },
      {
        texto: 'Servicio de Planchado Profesional en Vigo',
        href: '/planchado-vigo',
        descripcion: 'Planchado individual de camisas, trajes y vestidos de diario.',
      },
    ],
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el servicio de colada familiar semanal y recogida a domicilio'
    ),
  },
  {
    slug: 'montar-tu-propia-tintoreria-lavanderia',
    url: '/blog/montar-tu-propia-tintoreria-lavanderia',
    canonical: 'https://www.tintoreriamimos.es/blog/montar-tu-propia-tintoreria-lavanderia',
    titulo: 'Montar tu propia tintorería o lavandería: las claves de un negocio moderno',
    seoTitle: 'Montar una Tintorería o Lavandería Moderna: Claves y Rentabilidad | Tintorería Mimos',
    metaDescription:
      '¿Pensando en abrir una tintorería o lavandería? Analizamos costes, wetcleaning vs seco, hábitos de consumo, tecnología RFID, taquillas inteligentes y el modelo de éxito de Mimos.',
    categoria: 'Emprendimiento y sector',
    fechaPublicacion: '12 de abril de 2018 (Actualizado 2026)',
    fechaISO: '2026-10-13',
    tiempoLectura: '6 min de lectura',
    extracto:
      'En la vida moderna, antes o después recurrimos a este servicio. Desgranamos en qué se está convirtiendo el cuidado de la ropa: costes reales, wetcleaning, tecnología RFID, taquillas inteligentes y atención personalizada frente a nuevos hábitos de consumo.',
    imagen: IMAGES.blogMontarTintoreria,
    imagenAlt:
      'Montar tu propio negocio de tintorería y lavandería moderna',
    introduccion: [
      'En la vida moderna, antes o después tenemos que acudir a este tipo de servicio. Y a muchas personas se nos ha ocurrido la idea de abrir nuestra propia tintorería como medio de vida.',
      'Vamos a intentar desgranar en unas pocas líneas el tipo de negocio en el que se está convirtiendo el lavado y cuidado de ropa, cómo han cambiado los hábitos de consumo y cuáles son los pilares fundamentales para que un proyecto sea rentable, sostenible y de alta calidad.',
    ],
    secciones: [
      {
        h2: '1. Lavado en seco vs. Wetcleaning y el valor del acabado profesional',
        parrafos: [
          'Antes de nada, uno tiene que aprender a diferenciar el lavado en seco y el lavado en agua. Para dar un servicio integral a nuestros clientes debemos de tener la capacidad de poder ofertar ambos servicios. Si bien en la actualidad con la moderna maquinaria de wetcleaning son escasas las prendas en las cuales necesitaríamos disponer del sistema de limpieza en seco, nuestro consejo es la instalación de ambos sistemas de limpieza para tener más posibilidades a la hora de la eliminación de manchas complejas sin deteriorar los tejidos.',
          'Una vez que tenemos claro que en las tintorerías se lava, también debemos de saber que en las tintorerías se plancha. Para ello debemos de contar con la maquinaria necesaria para hacer un óptimo acabado de las prendas. En las tintorerías se lava y se plancha la ropa del cliente con maquinaria industrial que nos permite ofrecer unos acabados en las prendas que el cliente por sí solo no puede alcanzar en su hogar. Y por esto nos paga.',
        ],
        puntosClave: [
          'Wetcleaning ecológico: tratamiento en base acuosa con detergentes biodegradables y control milimétrico de temperatura y centrifugado.',
          'Limpieza en seco: insustituible para fibras nobles, forros estructurados y manchas de base grasa sin deformación.',
          'Prensas y maniquíes industriales: tensión de planchado y vaporizado homogéneo que devuelven la caída original a trajes y abrigos.',
        ],
      },
      {
        h2: '2. Nuevos hábitos de consumo: por qué el modelo tradicional ya no basta',
        parrafos: [
          'Esta era la clave tradicional de nuestro negocio; sin embargo, la globalización y el consumismo actual nos han llevado a un escenario totalmente distinto donde el mercado está cambiando hacia nuevos hábitos:',
        ],
        puntosClave: [
          'El valor de las prendas de vestir ha disminuido drásticamente: con la moda rápida (fast fashion), en muchas ocasiones resulta más barato comprar una prenda nueva que llevarla a la tintorería.',
          'El uso de prendas de etiqueta ha disminuido drásticamente: los comerciales y profesionales recurren cada vez menos al traje como uniforme de trabajo diario y visten de forma mucho más casual.',
          'Han aparecido nuevos competidores: lavanderías autoservicio y aplicaciones de recogida a domicilio que fragmentan la cuota de clientes tradicionales.',
        ],
        subsecciones: [
          {
            h3: 'El volumen tradicional se reduce: hay que evolucionar',
            texto:
              'Con lo cual, el volumen social de ropa que necesita de los servicios clásicos de tintorería ha disminuido. El pastel tradicional se está haciendo más pequeño y aparecen más competidores. En esta situación hemos aprendido a escuchar, ofrecer soluciones reales a nuestros clientes y asegurar la rentabilidad del negocio.',
          },
        ],
      },
      {
        h2: '3. Las cuatro ideas clave de la tintorería y lavandería moderna',
        parrafos: [
          'Estamos cansados de escuchar a empresarios del sector quejarse de la situación actual y de no hacer nada para modificar el rumbo de su negocio. Frente a esto, las ideas clave de una tintorería moderna y rentable son claras:',
        ],
        puntosClave: [
          'Gestión profesional de costes: una empresa debe tener claro cuáles son sus costes reales de producción (energía, mano de obra, químicos, amortización) y, a partir de ellos, calcular sus precios. Trabajar copiando las tarifas de la competencia sin conocer los costes propios lleva a ofrecer servicios a pérdidas sin saberlo.',
          'Trato personalizado y flexible a cada cliente: trato individualizado dentro de una línea de producción continua, atendiendo particularidades de cada tejido y preferencia de cliente.',
          'Disponer de información en tiempo real: conocer los hábitos de nuestros clientes para satisfacer sus peticiones y estados de sus pedidos en todo momento.',
          'Adaptarse a los nuevos tiempos: diversificar la oferta con recogida y entrega profesional a domicilio, servicios de colada por kilos, tratamientos con ozono y taquillas de entrega y recogida.',
        ],
      },
      {
        h2: '4. El modelo innovador de Tintorería Mimos en la actualidad',
        parrafos: [
          'Como en todos los principios, es trabajoso alcanzar todos estos objetivos, pero poco a poco uno se da cuenta de que va dando los pasos en la dirección correcta. En Tintorería Mimos hemos consolidado un modelo diferencial:',
        ],
        puntosClave: [
          'Software de gestión propio: facilita la toma de decisiones al mostrarnos el estado del negocio en tiempo real con informes avanzados, y ofrece a los clientes una App para realizar pedidos y comprobar la trazabilidad en vivo.',
          'Especialización en coladas a domicilio con tecnología RFID: sistema de marcado inteligente que garantiza la no pérdida de ninguna prenda del cliente y el tratamiento idóneo para cada una.',
          'Taquillas inteligentes en comunidades de vecinos: facilitan el depósito y la recogida de prendas las 24 horas del día con máxima comodidad.',
          'Red de puntos de recogida y entrega: presencia en toda la ciudad y comarca (Vigo, Gondomar, Redondela, Ponteareas y O Porriño) para acercarnos a los clientes y reforzar la marca.',
        ],
      },
    ],
    advertenciaProfesional:
      'Si has llegado hasta aquí y sigues interesado en montar tu propio negocio de tintorería/lavandería, explorar sinergias o convertirte en uno de nuestros clientes o puntos colaboradores exclusivos, no dudes en ponerte en contacto con nosotros. Estaremos encantados de solucionar todas las dudas que tengas.',
    enlacesInternos: [
      {
        texto: 'Servicios de Tintorería y Wetcleaning en Vigo',
        href: '/servicios',
        descripcion: 'Conoce nuestros procesos de lavado en seco y en agua con tecnología ecológica.',
      },
      {
        texto: 'Recogida a Domicilio y Puntos Mimos',
        href: '/recogida-a-domicilio',
        descripcion: 'Nuestra red de recogida en Vigo, Redondela, Gondomar, Ponteareas y O Porriño.',
      },
      {
        texto: 'Colada Familiar Semanal en Vigo',
        href: '/colada-familiar-vigo',
        descripcion: 'El servicio de colada por kilos que lidera el nuevo consumo de lavandería.',
      },
    ],
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. He leído el artículo del blog sobre montar una tintorería/lavandería moderna y quiero ponerme en contacto con vosotros.'
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
    subtitulo: 'Valoración personalizada según necesidades del hogar',
    descripcion:
      'Soluciones de limpieza profesional para hogares en Vigo que buscan un equipo de confianza, respaldado por nuestra experiencia en el cuidado textil de ropa de hogar, cortinas, alfombras y tapicerías.',
    incluye: [
      'Intervenciones de limpieza en viviendas particulares previa valoración con Mimo',
      'Adaptación a las características y dimensiones de cada domicilio en Vigo',
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
    descripcion:
      'Servicio de limpieza adaptado a los horarios y necesidades de oficinas, clínicas, despachos profesionales y comercios en Vigo, con opción de incluir el mantenimiento de textiles y vestuario laboral.',
    incluye: [
      'Propuesta adaptada a la superficie y frecuencia de cada oficina, despacho o comercio',
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
    titulo: 'Limpieza de comunidades y puesta a punto de inmuebles',
    subtitulo: 'Valoración previa según tipo de edificio o inmueble en Vigo',
    descripcion:
      'Servicios sujetos a valoración previa para zonas comunes de edificios y puesta a punto de viviendas o locales en Vigo.',
    incluye: [
      'Estudio personalizado según las características de la comunidad o del inmueble',
      'Coordinación con propietarios, administradores o empresas en Vigo',
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
    respuesta: `Contamos con ${TIENDAS_PROPIAS.length} tiendas propias en Vigo:\n${TIENDAS_PROPIAS.map(
      (t) => `• ${t.nombre_mostrado} (${t.direccion}): ${t.horario.resumen} · Tel. ${t.telefonos_mostrados}.`
    ).join('\n')}`,
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Tengo una consulta sobre vuestras tiendas y horarios'
    ),
    whatsappCtaLabel: 'Escribir a Mimo por WhatsApp',
  },
  {
    id: 'puntos',
    label: 'Puntos colaboradores',
    respuesta: `Además de nuestras ${TIENDAS_PROPIAS.length} tiendas propias en Vigo, el servicio de Tintorería Mimos está disponible en ${PUNTOS_COLABORADORES.length} establecimientos colaboradores: ${PUNTOS_COLABORADORES.map(
      (p) => `${p.localidad} (${p.nombre_comercio}, ${p.direccion}, ${p.horario.resumen})`
    ).join('; ')}.`,
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
    respuesta: `Realizamos arreglos y composturas de ropa (bajos, cremalleras, botones, estrechar/ensanchar, ajustes de cintura, zurcidos y descosidos) en nuestras ${TIENDAS_PROPIAS.length} tiendas propias de Vigo (${TIENDAS_PROPIAS.map(
      (t) => `${t.nombre_mostrado} en ${t.direccion}`
    ).join(', ')}) y en los puntos colaboradores con servicio de costura confirmado: ${PUNTOS_CON_COSTURA.filter(
      (p) => p.tipo === 'punto'
    )
      .map((p) => `${p.localidad} (${p.nombre_comercio}, ${p.direccion})`)
      .join(', ')}.`,
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

// SECCIÓN 16 DEL PLAN MAESTRO: Servicio prioritario de limpieza y reparación de alfombras con recogida y entrega (/limpieza-alfombras-vigo)
export const SERVICIO_ALFOMBRAS_DATA = {
  url: '/limpieza-alfombras-vigo',
  canonical: 'https://www.tintoreriamimos.es/limpieza-alfombras-vigo',
  seoTitle: 'Limpieza y Reparación de Alfombras en Vigo con Recogida a Domicilio | Mimos',
  metaDescription:
    'Servicio profesional de limpieza y reparación de alfombras en Vigo con recogida y entrega a domicilio o en nuestras 3 tiendas propias. Pide presupuesto con Mimo.',
  h1: 'Limpieza y reparación de alfombras en Vigo con recogida y entrega a domicilio',
  subtituloCabecera:
    'Recogemos tu alfombra en tu domicilio o en nuestras tiendas propias de Vigo para limpiarla o restaurar sus bordes y flecos en nuestras instalaciones, devolviéndotela cuidada y lista para colocar.',
  aclaracionDomicilio:
    'Importante: nuestro servicio «a domicilio» consiste en recoger tu alfombra en tu vivienda u oficina, trasladarla a nuestras instalaciones para su limpieza, secado controlado o reparación, y entregártela de vuelta una vez lista (no realizamos limpiezas en húmedo dentro del domicilio del cliente).',
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
  reparacionYRestauracion: {
    titulo: 'Reparación y restauración de alfombras (flecos, bordes y descosidos)',
    subtitulo: 'Valoración previa por fotografía con Mimo antes de intervenir',
    descripcion:
      'Con el uso diario o el paso del aspirador es frecuente que los extremos de una alfombra se deshilachen o pierdan parte del festón lateral. Además de su higienización, gestionamos la reparación y restauración de alfombras para frenar el deterioro y recuperar su acabado.',
    trabajos: [
      'Reparación, reposición e igualado de flecos deteriorados, sueltos o desgastados',
      'Remate y refuerzo de bordes laterales, ribetes (festón) y esquinas abiertas',
      'Revisión y arreglo de descosidos perimetrales o pequeñas roturas en la base de la alfombra',
      'Posibilidad de combinar la limpieza e higienización completa con la restauración de bordes o flecos',
    ],
    comoSolicitarlo:
      'Para valorar cualquier reparación o restauración en tu alfombra, envíanos por WhatsApp a Mimo una foto general de la pieza y una foto de cerca del fleco, borde o zona dañada. Nuestro equipo confirmará la viabilidad del arreglo, el presupuesto y el plazo estimado antes de recogerla.',
    whatsappReparacionUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar la reparación o restauración de una alfombra en Vigo. Te envío fotos del estado de los bordes o flecos.'
    ),
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
    tiendasPropias: `Recepción directa en nuestras ${TIENDAS_PROPIAS.length} tiendas propias en Vigo: ${TIENDAS_PROPIAS.map(
      (t) => `${t.nombre_mostrado} (${t.direccion})`
    ).join(', ')}.`,
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
        'Puedes pulsar cualquiera de los botones de esta página para abrir el chat de WhatsApp con Mimo (655 536 844), llamarnos al 986 12 51 41 o acercarte a nuestras tiendas propias en Vigo.',
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
      respuesta: `Atendemos directamente en nuestras ${TIENDAS_PROPIAS.length} tiendas propias de Vigo (${TIENDAS_PROPIAS.map(
        (t) => `${t.nombre_mostrado} en ${t.direccion}`
      ).join(', ')}) y realizamos recogidas a domicilio según zona de cobertura y condiciones del servicio. En los puntos colaboradores, solo si el establecimiento admite expresamente piezas de este tamaño.`,
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
      pregunta: '10. ¿Hacéis reparación de flecos, bordes o restauración de alfombras?',
      respuesta:
        'Sí, gestionamos trabajos de reparación y restauración de alfombras (reposición o igualado de flecos, refuerzo de bordes y ribetes desgastados o descosidos). Envíanos una fotografía detallada de la zona dañada por WhatsApp a Mimo (655 536 844) para valorar tu alfombra y confirmarte viabilidad, presupuesto y plazo antes de intervenir.',
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
      respuesta: `Puedes acudir a nuestras ${TIENDAS_PROPIAS.length} tiendas propias en Vigo (${TIENDAS_PROPIAS.map(
        (t) => `${t.nombre_mostrado} en ${t.direccion}`
      ).join(', ')}) y a los puntos colaboradores con servicio de costura confirmado en ${PUNTOS_CON_COSTURA.filter(
        (p) => p.tipo === 'punto'
      )
        .map((p) => `${p.localidad} (${p.nombre_comercio}, ${p.direccion})`)
        .join(', ')}.`,
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

