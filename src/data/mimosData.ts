import {
  CANALES_CONTACTO_CENTRAL,
  DATOS_LEGALES_EMPRESA,
  DISCREPANCIAS_COMERCIALES,
  MASTER_TIENDAS_PROPIAS,
  MASTER_ESTABLECIMIENTOS_COLABORADORES,
  MASTER_PUNTOS_REGISTRO_RAW,
  TODOS_LOS_ESTABLECIMIENTOS,
  getEstablecimientoById,
  buildWhatsAppUrlConMensaje,
  buildGoogleMapsSearchUrl,
  type TiendaPropia,
  type EstablecimientoColaborador,
  type DatosLegalesEmpresa,
  type CanalesContactoCentral,
  type DiscrepanciaRegistrada,
  STORE_GOOGLE_RATINGS,
  type StoreGoogleRatingRecord,
  type LegacyPuntoRegistroRaw,
} from './commercialMasterData';

export {
  CANALES_CONTACTO_CENTRAL,
  DATOS_LEGALES_EMPRESA,
  DISCREPANCIAS_COMERCIALES,
  MASTER_TIENDAS_PROPIAS,
  MASTER_ESTABLECIMIENTOS_COLABORADORES,
  MASTER_PUNTOS_REGISTRO_RAW,
  TODOS_LOS_ESTABLECIMIENTOS,
  getEstablecimientoById,
  buildWhatsAppUrlConMensaje,
  buildGoogleMapsSearchUrl,
  type TiendaPropia,
  type EstablecimientoColaborador,
  type DatosLegalesEmpresa,
  type CanalesContactoCentral,
  STORE_GOOGLE_RATINGS,
  type StoreGoogleRatingRecord,
  type DiscrepanciaRegistrada,
};

export const IMAGES = {
  ositoMimos: '/osito-mimos.webp',
  logoMimos: '/logo-mimos.webp',
  tiendaMimos: '/tienda-mimos.webp',
  b2bApartamentos: '/apartamentos-mimos.webp',
  alfombrasMimos: '/alfombras-mimos.webp',
  blogVino: '/blog-vino.webp',
  blogEdredon: '/blog-edredon.webp',
  blogColadaCasa: '/blog-colada-casa.webp',
  blogMontarTintoreria: '/blog-montar-tintoreria.webp',
  servicioTintoreria: '/servicio-tintoreria.webp',
  arreglosRopa: '/arreglos-ropa-mimos.webp',
  blogSiniestrosIncendio: '/images/articulos/blog-siniestros-incendio.webp',
  blogLimpiezaComunidades: '/images/articulos/blog-limpieza-comunidades.webp',
  blogLimpiezaOficinas: '/images/articulos/blog-limpieza-oficinas.webp',
  blogApartamentosRotacion: '/images/articulos/blog-apartamentos-rotacion.webp',
  blogColchonesTapicerias: '/images/articulos/blog-colchones-tapicerias.webp',
};

export const MIMOS_LOGO_DATA_URI = '/logo-mimos.webp';

export function buildMimoWhatsAppUrl(message: string): string {
  return buildWhatsAppUrlConMensaje(message);
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

// Tipado de compatibilidad derivado de commercialMasterData.ts
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

const datosDerivados = derivarDatosDesdePuntos(
  MASTER_PUNTOS_REGISTRO_RAW as unknown as PuntoRegistroRaw[]
);

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

// Datos verificados del negocio centralizados desde commercialMasterData.ts y la sede activa
export const CONTACT_INFO = {
  companyName: DATOS_LEGALES_EMPRESA.nombreComercial,
  legalName: DATOS_LEGALES_EMPRESA.razonSocial,
  cif: DATOS_LEGALES_EMPRESA.cif,
  registroMercantil: DATOS_LEGALES_EMPRESA.registroMercantil,
  canalEtico: DATOS_LEGALES_EMPRESA.canalEtico,
  streetAddress: sedeNavia?.direccion ?? DATOS_LEGALES_EMPRESA.domicilioSocial,
  postalCode: sedeNavia?.codigo_postal ?? DATOS_LEGALES_EMPRESA.codigoPostal,
  locality: sedeNavia?.localidad ?? DATOS_LEGALES_EMPRESA.localidad,
  region: DATOS_LEGALES_EMPRESA.provincia,
  phoneDisplay: CANALES_CONTACTO_CENTRAL.telefonoPrincipalMostrado,
  phoneHref: CANALES_CONTACTO_CENTRAL.telefonoPrincipalHref,
  whatsappNumber: CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado,
  whatsappBaseHref: CANALES_CONTACTO_CENTRAL.whatsappBaseHref,
  whatsappHref: buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero hacer una consulta sobre vuestros servicios.'
  ),
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
  email: CANALES_CONTACTO_CENTRAL.emailAtencion,
  emailHref: CANALES_CONTACTO_CENTRAL.emailAtencionHref,
  appName: CANALES_CONTACTO_CENTRAL.appClientes,
  googleMapsMainHref:
    'https://www.google.com/maps/search/?api=1&query=Tintorer%C3%ADa+Mimos+Navia+C%2F+Teixugueiras+11+bajo+9+36212+Vigo',
  googleReviewsHref:
    'https://www.google.com/maps/place/Tintorer%C3%ADa+Mimos/@42.21223,-8.754691,17z/data=!4m8!3m7!1s0xd2f777174db1dbb:0x524855ad2566ecb9!8m2!3d42.21223!4d-8.754691!9m1!1b1!16s%2Fg%2F11b6d194vf?entry=ttu',
  scheduleWeekdays: resumenNaviaPartes[0] ?? 'L-V 09:30-14:00 y 16:00-20:00',
  scheduleSaturday: resumenNaviaPartes[1] ?? 'Sáb 10:00-13:30',
  scheduleFullNavia:
    sedeNavia?.horario.resumen ?? 'L-V 09:30-14:00 y 16:00-20:00 · Sáb 10:00-13:30',
  canonicalBase: CANALES_CONTACTO_CENTRAL.webOficial,
  social: {
    facebook: 'https://www.facebook.com/tintoreriamimos',
    instagram: 'https://www.instagram.com/tintoreria_mimos_navia/',
    youtube: 'https://www.youtube.com/@tintoreriamimosnavias.l.1658',
    linkedin: 'https://www.linkedin.com/company/tintorer%C3%ADa-mimos-navia-s-l-/',
  },
};

export const REDES_SOCIALES = CONTACT_INFO.social;

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
      'Teñido profesional de prendas textiles compatibles previa revisión de fibra',
      'Costura y arreglos de ropa (taller propio in situ en Gregorio Espino y Venezuela; recepción en Navia y puntos con costura)',
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
    seoTitle: 'Lavandería Profesional en Vigo: Plumíferos, Anoraks y Ropa Técnica | Mimos',
    metaDescription:
      'Lavandería 100 % atendida en Vigo (sin monedas): plumíferos, anoraks, encerado Barbour e impermeabilización Gore-Tex, jerséis delicados y secado anti-humedad.',
    h1: 'Lavandería profesional atendida en Vigo para tus prendas técnicas, delicadas y de abrigo',
    titulo: 'Lavandería',
    subtitulo: 'Lavado acuoso 100 % atendido de plumíferos, anoraks, encerados e impermeabilización técnica',
    descripcion:
      'Somos una lavandería 100 % atendida en nuestra planta propia de Navia (Vigo), sin máquinas de autoservicio ni monedas. Clasificamos por color y fibra, revisamos cada etiqueta, realizamos desmanchado previo y aplicamos lavado acuoso controlado con secado completo anti-humedad para plumíferos, anoraks, encerado tipo Barbour, impermeabilización Gore-Tex y prendas delicadas.',
    queTratamos: [
      'Plumíferos, anoraks, parkas y chaquetas acolchadas de pluma o fibra lavables en agua',
      'Encerado e impermeabilización técnica de prendas (Barbour, Gore-Tex y membranas transpirables)',
      'Cazadoras cortavientos y ropa técnica o deportiva sin suavizante en membranas',
      'Jerséis de punto, prendas de lana lavables en agua y eliminación de olor a humedad o humo',
    ],
    comoSeContrata: [
      'Envía una foto de tu prenda y de su etiqueta por WhatsApp a Mimo para recibir valoración previa antes de venir.',
      'Entrega sin pedido mínimo en nuestras 3 tiendas propias de Vigo (Navia Teixugueiras 11 bajo 9, Gregorio Espino 42 y Vigo centro en Rúa de Venezuela 29, Entreplanta, entorno Urzáiz/Gran Vía) o en nuestros 5 puntos colaboradores.',
      'También puedes consultar con Mimo por WhatsApp la recogida y entrega a domicilio en Vigo y área metropolitana (sujeta a importe mínimo).',
    ],
    ctaTexto: 'Pedir valoración por WhatsApp con Mimo',
    whatsappMensaje:
      'Hola, Mimo. Quiero consultar el precio de lavandería para un plumífero, anorak o prenda delicada en Vigo',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el precio de lavandería para un plumífero, anorak o prenda delicada en Vigo'
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
      'Trae tus prendas ya lavadas y nuestro equipo se encarga de devolverles una caída perfecta con vapor y prensas profesionales, sin brillos ni marcas de plancha doméstica. Entrega en percha o doblada según necesites.',
    queTratamos: [
      'Camisas de vestir y blusas entregadas en percha o dobladas',
      'Pantalones de pinzas, trajes, americanas y faldas sin brillos',
      'Vestidos de calle o ceremonia que requieren vapor profesional',
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
    seoTitle: 'Colada Familiar en Vigo | Lavar y Doblar o Lavar y Planchar | Mimos',
    metaDescription:
      'Servicio de colada familiar en Vigo con modalidad de lavar y doblar, lavar y planchar o opción combinada por prenda. Secado completo frente a la humedad de Vigo.',
    h1: 'Colada familiar en Vigo: lavar y doblar, lavar y planchar o combinada por prenda',
    titulo: 'Colada familiar (lavar y doblar / lavar y planchar)',
    subtitulo: 'Elige lavar y doblar, lavar y planchar o combina según cada prenda',
    descripcion:
      'Con nuestro servicio de colada familiar nos ocupamos de tu ropa cotidiana en dos modalidades principales —lavar y doblar o lavar y planchar— y con flexibilidad total para combinarlas: si traes ropa diaria junto con camisas o piezas concretas, puedes elegir qué va doblado y qué prendas quieres planchadas.',
    queTratamos: [
      'Ropa cotidiana de toda la familia (camisetas, pantalones de diario, ropa interior, pijamas, sudaderas)',
      'Modalidad Lavar y doblar, Lavar y planchar, o combinada eligiendo qué prendas van planchadas (p. ej. camisas)',
      'Ropa de cama de uso diario y toallas domésticas con secado completo anti-humedad',
      'Valoración transparente con Mimo según el volumen, composición y modalidad elegida (sin tarifas cerradas por kilo)',
    ],
    comoSeContrata: [
      'Escríbenos por WhatsApp para que Mimo te indique las condiciones según volumen y modalidad.',
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
    seoTitle: 'Limpieza de Edredones, Mantas, Cortinas y Estores en Vigo | Mimos',
    metaDescription:
      'Lavado y secado en gran formato de edredones nórdicos de plumas y sintéticos, mantas, colchas, cortinas (con retirada y colocación), estores textiles y fundas desenfundables en Vigo.',
    h1: 'Limpieza y secado en gran formato de edredones, mantas, cortinas y estores en Vigo',
    titulo: 'Limpieza de textiles del hogar',
    subtitulo: 'Edredones de plumas y sintéticos, mantas, cortinas y estores de tela',
    descripcion:
      'Lavado y secado completo en maquinaria de gran capacidad para piezas que no caben ni se secan bien en casa frente a la humedad de Vigo. Además, vamos a domicilio a desmontar y volver a colocar cortinajes o puedes entregarlos en nuestras tiendas.',
    queTratamos: [
      'Edredones nórdicos de pluma/plumón natural y sintéticos de todas las medidas',
      'Mantas, colchas, boutís, sábanas, protectores de colchón y cuna',
      'Cortinas y visillos (con servicio de retirada y colocación a domicilio bajo consulta)',
      'Estores textiles de tela (paqueto, plegables y con varillas) y fundas desenfundables',
    ],
    comoSeContrata: [
      'Entrégalos en cualquiera de nuestras 3 tiendas propias en Vigo o en nuestros 5 puntos colaboradores.',
      'Para cortinajes pesados o varios edredones, consulta con Mimo por WhatsApp la retirada/colocación de cortinas o recogida a domicilio.',
    ],
    ctaTexto: 'Consultar pieza por WhatsApp',
    whatsappMensaje: 'Hola, Mimo. Quiero consultar el precio de lavar un edredón o unas cortinas',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el precio de lavar un edredón o unas cortinas'
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
      'Entrégala sin cita previa en cualquiera de nuestras 3 tiendas propias en Vigo (Navia, Gregorio Espino o Rúa Venezuela) o en cualquiera de nuestros 5 puntos colaboradores (Redondela, Gondomar, Ponteareas, O Porriño y Vigo As Travesas).',
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
    seoTitle: 'Lavandería y Tintorería para Empresas en Vigo | Ropa Laboral y Negocios | Mimos',
    metaDescription:
      'Lavandería para empresas en Vigo: toallas de peluquerías y clínicas, uniformes y ropa laboral con suciedad normal. Tiendas o recogida y factura CIF.',
    h1: 'Lavandería y tintorería para empresas y negocios en Vigo',
    titulo: 'Lavandería para empresas y negocios',
    subtitulo: 'Toallas, vestuario laboral y lencería profesional en Vigo',
    descripcion:
      'Servicio profesional para peluquerías, centros de estética, clínicas, comercios, oficinas y vestuario laboral con suciedad habitual. Atendemos en nuestras 3 tiendas de Vigo o mediante recogida coordinada, con factura mensual agrupada con CIF.',
    queTratamos: [
      'Toallas, capas y batas para peluquerías, barberías y centros de estética',
      'Batas, toallas y sábanas de camilla para clínicas médicas, dentales, fisioterapia y veterinarias',
      'Uniformes corporativos, polos, camisas, trajes de empresa y ropa laboral con suciedad normal (sin grasa industrial pesada)',
      'Piezas sueltas o lotes pequeños de cocina y eventos (chaquetillas, mandiles o 2–3 manteles)',
    ],
    comoSeContrata: [
      'Indícanos por WhatsApp o teléfono el tipo de negocio, prendas habituales y si prefieres entrega en tienda o recogida coordinada.',
      'Adaptamos el ritmo de recogida y entrega al volumen de tu negocio, con factura mensual agrupada con CIF para empresas y autónomos.',
    ],
    ctaTexto: 'Pedir presupuesto para mi negocio',
    whatsappMensaje:
      'Hola, Mimo. Quiero consultar condiciones de lavandería para mi empresa o negocio en Vigo',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar condiciones de lavandería para mi empresa o negocio en Vigo'
    ),
  },
  {
    index: '09',
    id: 'recogida-a-domicilio',
    url: '/recogida-a-domicilio',
    seoTitle: 'Tintorería y Lavandería a Domicilio en Vigo y Comarca | Mimos',
    metaDescription:
      'Servicio de recogida y entrega en Vigo, toda la comarca (Baiona, Nigrán, Mos, Redondela, Gondomar, Porriño, Ponteareas, Cangas y Moaña) y polígonos industriales, o sin mínimo en 8 puntos físicos.',
    h1: 'Recogida y entrega de prendas a domicilio y en puntos colaboradores',
    titulo: 'Recogida y entrega a domicilio y en puntos',
    subtitulo: 'Cobertura en Vigo, comarca y polígonos industriales (o entrega sin mínimo en 8 puntos)',
    descripcion:
      'Disponemos de servicio de recogida y entrega a domicilio en Vigo, toda su comarca (Redondela, Nigrán, Baiona, Mos, O Porriño, Gondomar, Ponteareas, Cangas y Moaña) y polígonos industriales (PTL Valladares, Zona Franca, O Porriño y Mos), sujeto a ruta e importe mínimo de servicio a consultar con Mimo, además de 3 tiendas propias y 5 puntos colaboradores sin pedido mínimo.',
    queTratamos: [
      'Recogida y entrega de tintorería, pieles, coladas familiares, edredones, cortinas y alfombras (importe mínimo a domicilio a consultar)',
      'Rutas domiciliarias y para empresas en polígonos industriales y área metropolitana de Vigo',
      'Solicitud rápida y seguimiento personalizado por WhatsApp con Mimo, formulario web o teléfono',
    ],
    comoSeContrata: [
      'Escribe a Mimo por WhatsApp o rellena el formulario de recogida indicando tu dirección, municipio o polígono y las prendas o piezas.',
      'Si prefieres entregar sin importe mínimo ni espera de ruta, acude a cualquiera de nuestras 3 tiendas propias o 5 puntos colaboradores.',
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
    nombre: 'Solo Ropa de Cama y Toallas',
    estado: 'Servicio de lavandería profesional',
    descripcion:
      'Tú te encargas del apartamento. Nosotros lavamos, higienizamos y planchamos la lencería propia de tu alojamiento separada por vivienda (con opción de negociar acuerdos por volumen).',
    incluye: [
      'Lavado térmico, higienización y planchado profesional de tus juegos de sábanas, fundas nórdicas y toallas separados por apartamento.',
      'Preparación en lotes protegidos y empaquetados listos para vestir cada cama y baño.',
      'Recogida de lencería usada y entrega puntual en tus días de cambio (abiertos a valorar acuerdos según volumen).',
    ],
    ctaTexto: 'Consultar servicio de lavandería VUT',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el servicio de lavandería y lencería para apartamentos turísticos en Vigo'
    ),
  },
  {
    id: 'pack-checkout',
    nombre: 'Limpieza y Lavandería Completa',
    estado: 'Franja 11:00–15:00 · Sábados, festivos y agosto',
    descripcion:
      'Tú gestionas las reservas. Nosotros cubrimos la limpieza en la ventana crítica de check-out/check-in (11:00–15:00 incluidos sábados, festivos y agosto) y la lencería entre huéspedes.',
    incluye: [
      'Limpieza integral tras salida (cocina, baños, dormitorios y superficies de alto contacto) en línea con el Decreto 12/2017 de la Xunta.',
      'Recogida y lavado planchado de la ropa de cama y baño propia de cada piso turístico.',
      'Reposición de amenities básicos y reporte fotográfico de incidencias o desperfectos al salir.',
    ],
    ctaTexto: 'Solicitar presupuesto de limpieza y lavandería',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar presupuesto de limpieza y lavandería completa para mi apartamento turístico en Vigo'
    ),
  },
  {
    id: 'pack-gestion-integral',
    nombre: 'Coordinación Integral de Limpieza, Lavandería y Check-in',
    estado: 'Operativa completa para propietarios y gestoras',
    descripcion:
      'Coordinamos la limpieza de rotación, la lencería planchada, reposición de amenities, entrega de llaves / check-in y reporte fotográfico continuo para tu VUT.',
    incluye: [
      'Cobertura garantizada en franja 11:00–15:00 incluidos fines de semana, festivos y temporada alta (agosto).',
      'Lavandería y planchado de juegos propios separados por vivienda, sin mezclas ni pérdidas.',
      'Reposición de amenities, entrega de llaves o coordinación de check-in cuando lo necesites.',
      'Revisión completa con reporte fotográfico inmediato de incidencias y mantenimiento básico tras cada salida.',
    ],
    ctaTexto: 'Solicitar propuesta de coordinación integral',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar propuesta de coordinación integral para apartamentos turísticos en Vigo'
    ),
  },
];

// 4 Bloques estructurados de la Modalidad 3 (Coordinación Integral VUT)
export const GESTION_INTEGRAL_AREAS = [
  {
    numero: '01',
    titulo: 'Rotación en franja 11:00–15:00 (todos los días)',
    puntos: [
      'Ventanas operativas coordinadas entre salidas y entradas de 11:00 a 15:00, incluidos sábados, festivos y agosto.',
      'Limpieza exhaustiva y desinfección de cocina, baños, dormitorios y puntos de alto contacto conforme al Decreto 12/2017 de la Xunta.',
      'Checklist sistemático adaptado al número de huéspedes y características de cada vivienda.',
    ],
  },
  {
    numero: '02',
    titulo: 'Lencería propia separada por piso y amenities',
    puntos: [
      'Recogida, lavado térmico, higienización y planchado en calandra de tu propia ropa de cama y toallas separada por vivienda.',
      'Abiertos a estudiar y negociar condiciones personalizadas según volumen de camas o varios apartamentos.',
      'Reposición de amenities y consumibles básicos en cocina y baño para recibir al nuevo huésped.',
    ],
  },
  {
    numero: '03',
    titulo: 'Reporte fotográfico de incidencias',
    puntos: [
      'Inspección visual completa al finalizar la estancia para detectar desperfectos, manchas o roturas antes del siguiente ingreso.',
      'Envío directo por WhatsApp de reporte fotográfico si surge cualquier incidencia o anomalía en el apartamento.',
      'Control de ventilación, electrodomésticos y orden general de la vivienda turística.',
    ],
  },
  {
    numero: '04',
    titulo: 'Entrega de llaves y coordinación logística',
    puntos: [
      'Entrega de llaves y coordinación de check-in presencial o con cajetines cuando el propietario o gestor lo requiere.',
      'Rutas ágiles en Vigo adaptadas a tu calendario real de Airbnb, Booking o canal directo.',
      'Facturación mensual agrupada con CIF para propietarios particulares y gestoras de VUT.',
    ],
  },
];


export interface ZonaResumen {
  slug: string;
  url: string;
  localidad: string;
  comarca: string;
  codigosPostales: string;
  modoCobertura?: 'punto-fisico' | 'solo-domicilio';
}

export const ZONAS_RESUMEN: ZonaResumen[] = [
  {
    slug: 'redondela',
    url: '/zonas/redondela',
    localidad: 'Redondela',
    comarca: 'Ría de Vigo',
    codigosPostales: '36800',
    modoCobertura: 'punto-fisico',
  },
  {
    slug: 'gondomar',
    url: '/zonas/gondomar',
    localidad: 'Gondomar',
    comarca: 'Val Miñor',
    codigosPostales: '36380',
    modoCobertura: 'punto-fisico',
  },
  {
    slug: 'ponteareas',
    url: '/zonas/ponteareas',
    localidad: 'Ponteareas',
    comarca: 'O Condado',
    codigosPostales: '36860',
    modoCobertura: 'punto-fisico',
  },
  {
    slug: 'o-porrino',
    url: '/zonas/o-porrino',
    localidad: 'O Porriño',
    comarca: 'A Louriña',
    codigosPostales: '36400',
    modoCobertura: 'punto-fisico',
  },
  {
    slug: 'vigo',
    url: '/zonas/vigo',
    localidad: 'Vigo',
    comarca: 'Área de Vigo',
    codigosPostales: '36201–36216',
    modoCobertura: 'punto-fisico',
  },
  {
    slug: 'mos',
    url: '/zonas/mos',
    localidad: 'Mos',
    comarca: 'A Louriña · Área de Vigo',
    codigosPostales: '36415–36419',
    modoCobertura: 'solo-domicilio',
  },
  {
    slug: 'nigran',
    url: '/zonas/nigran',
    localidad: 'Nigrán',
    comarca: 'Val Miñor',
    codigosPostales: '36340–36379',
    modoCobertura: 'solo-domicilio',
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
    respuesta: `Puedes consultar precios y solicitar un presupuesto personalizado escribiéndonos por WhatsApp al ${CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado} o llamándonos al ${CANALES_CONTACTO_CENTRAL.telefonoPrincipalMostrado}. Te informaremos con detalle según el tipo de prenda, tejido o tratamiento que requiera.`,
  },
  {
    pregunta: '¿Cuál es la diferencia entre las tiendas Mimos y los puntos de recogida?',
    respuesta: `Contamos con ${TIENDAS_PROPIAS.length} tiendas propias en Vigo (${TIENDAS_PROPIAS.map((t) => `${t.nombre_mostrado} en ${t.direccion}`).join(', ')}) y, además, colaboramos con ${PUNTOS_COLABORADORES.length} comercios de proximidad en ${Array.from(new Set(PUNTOS_COLABORADORES.map((p) => p.localidad))).join(', ')} donde puedes depositar y recoger tus encargos con la garantía de que son tratados por Tintorería Mimos.`,
  },
  {
    pregunta: '¿Cómo funciona el servicio de recogida y entrega a domicilio?',
    respuesta: `Puedes solicitar la recogida escribiendo por WhatsApp al ${CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado}, por teléfono o a través del formulario de esta web. El servicio a domicilio está sujeto a ruta e importe mínimo de pedido (a consultar con Mimo según zona en Vigo, comarca y polígonos industriales); sin importe mínimo si entregas en nuestras 3 tiendas propias o 5 puntos colaboradores.`,
  },
  {
    pregunta: '¿Ofrecéis servicios para apartamentos turísticos y empresas en Vigo?',
    respuesta:
      'Sí. Disponemos de una línea especializada de cuidado textil, lavandería e higienización para alojamientos turísticos y empresas en Vigo. Preparamos presupuestos a medida según el volumen, la frecuencia y las necesidades de cada cliente.',
  },
];

export interface ArticuloBlogResumen {
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
  whatsappCtaUrl: string;
}

export interface ArticuloBlog extends ArticuloBlogResumen {
  introduccion: string[];
  secciones: {
    h2: string;
    parrafos: string[];
    subsecciones?: {
      h3: string;
      texto: string;
    }[];
    puntosClave?: string[];
    tabla?: {
      encabezados: string[];
      filas: string[][];
      pie?: string;
    };
    destacado?: {
      titulo: string;
      texto: string;
    };
  }[];
  advertenciaProfesional: string;
  enlacesInternos: {
    texto: string;
    href: string;
    descripcion: string;
  }[];
}

// Metadatos y resúmenes ligeros para portada, /blog, footer y rutas SEO (el contenido editorial completo vive en src/data/blogArticlesFull.ts y se carga bajo demanda en /blog/*)
export const ARTICULOS_BLOG_RESUMEN: ArticuloBlogResumen[] = [
  {
    slug: 'como-quitar-mancha-vino-tinto-ropa-delicada',
    url: '/blog/como-quitar-mancha-vino-tinto-ropa-delicada',
    canonical: 'https://www.tintoreriamimos.es/blog/como-quitar-mancha-vino-tinto-ropa-delicada',
    titulo: 'Cómo quitar una mancha de vino tinto sin dañar tu ropa delicada',
    seoTitle: 'Quitar Mancha de Vino Tinto en Ropa Delicada | Mimos',
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
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Necesito consultar el tratamiento de una mancha en una prenda delicada'
    ),
  },
  {
    slug: 'como-lavar-edredon-de-plumas-guia-practica',
    url: '/blog/como-lavar-edredon-de-plumas-guia-practica',
    canonical: 'https://www.tintoreriamimos.es/blog/como-lavar-edredon-de-plumas-guia-practica',
    titulo: 'Cómo lavar un edredón de plumas: guía práctica para cuidarlo correctamente',
    seoTitle: 'Cómo Lavar un Edredón de Plumas y Secarlo | Mimos',
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
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el precio de lavar un edredón'
    ),
  },
  {
    slug: 'guia-simbolos-etiquetas-ropa-significado',
    url: '/blog/guia-simbolos-etiquetas-ropa-significado',
    canonical: 'https://www.tintoreriamimos.es/blog/guia-simbolos-etiquetas-ropa-significado',
    titulo: 'Guía práctica de los símbolos de lavado y etiquetas de tu ropa',
    seoTitle: 'Símbolos de Lavado en Etiquetas (ISO 3758) | Mimos',
    metaDescription:
      'Guía técnica completa según la norma internacional ISO 3758:2023: significado de los 5 símbolos de las etiquetas de ropa (lavado, blanqueo, secado, plancha y tintorería P, F, W), tablas de temperaturas y consejos de tintorero.',
    categoria: 'Etiquetado textil y cuidado de prendas',
    fechaPublicacion: '13 de octubre de 2026',
    fechaISO: '2026-10-13',
    tiempoLectura: '8 min de lectura',
    extracto:
      'Descubre qué significa cada uno de los cinco pictogramas obligatorios de la norma ISO 3758:2023. Aprende por qué encogen los tejidos, cómo evitar brillos al planchar y cuándo es imprescindible confiar en la tintorería profesional.',
    imagen: '/images/articulos/simbolos-etiquetas-ropa.webp',
    imagenAlt:
      'Primer plano de manos examinando la etiqueta textil de composición y símbolos de lavado según norma internacional ISO 3758 en una prenda de lana y seda',
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
    seoTitle: 'Apartamento Turístico Vigo: Decreto 12/2017 | Mimos',
    metaDescription:
      'Guía para anfitriones VUT en Vigo: requisitos del Decreto 12/2017 de la Xunta, lencería propia separada frente a renting estándar y ventana 11:00–15:00.',
    categoria: 'Alojamientos turísticos y limpieza',
    fechaPublicacion: '9 de octubre de 2026 (Actualizado nov. 2026)',
    fechaISO: '2026-10-09',
    tiempoLectura: '6 min de lectura',
    extracto:
      'Organizar una Vivienda de Uso Turístico (VUT) en Vigo exige cumplir el Decreto 12/2017 (REAT) de la Xunta de Galicia, cuidar los textiles de fondo y elegir entre lencería propia separada o renting estándar para responder sin agobios en la ventana de 11:00 a 15:00.',
    imagen: IMAGES.b2bApartamentos,
    imagenAlt:
      'Cama de apartamento turístico vestida con sábanas blancas planchadas y juego de toallas dobladas',
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar un presupuesto para la limpieza y lavandería de apartamentos turísticos'
    ),
  },
  {
    slug: 'la-colada-en-casa',
    url: '/blog/la-colada-en-casa',
    canonical: 'https://www.tintoreriamimos.es/blog/la-colada-en-casa',
    titulo: 'La colada en casa: ¿Ahorro o pérdida de tiempo y calidad?',
    seoTitle: 'Colada en Casa vs Autoservicio y Lavandería Vigo | Mimos',
    metaDescription:
      'Comparativa práctica en Vigo: lavadora en casa vs autoservicio de monedas vs lavandería atendida. Plumas, humedad atlántica, Navia, Calvario y ahorro de tiempo.',
    categoria: 'Colada y cuidado de ropa',
    fechaPublicacion: '12 de octubre de 2026 (Actualizado nov. 2026)',
    fechaISO: '2026-10-12',
    tiempoLectura: '6 min de lectura',
    extracto:
      'Comparativa práctica en Vigo entre lavar en casa, usar autoservicios de monedas o confiar en nuestra lavandería atendida: ahorro real de tiempo, control de temperatura y secado completo frente a la humedad atlántica.',
    imagen: IMAGES.blogColadaCasa,
    imagenAlt:
      'Ropa limpia, recién lavada, planchada y doblada con mimo en un hogar ordenado',
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el servicio de colada familiar semanal y recogida a domicilio'
    ),
  },
  {
    slug: 'montar-tu-propia-tintoreria-lavanderia',
    url: '/blog/montar-tu-propia-tintoreria-lavanderia',
    canonical: 'https://www.tintoreriamimos.es/blog/montar-tu-propia-tintoreria-lavanderia',
    titulo: 'Montar tu propia tintorería o lavandería: las claves de un negocio moderno',
    seoTitle: 'Montar una Tintorería o Lavandería Moderna | Mimos',
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
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. He leído el artículo del blog sobre montar una tintorería/lavandería moderna y quiero ponerme en contacto con vosotros.'
    ),
  },
  {
    slug: 'ropa-afectada-humo-incendio-siniestro-hogar',
    url: '/blog/ropa-afectada-humo-incendio-siniestro-hogar',
    canonical:
      'https://www.tintoreriamimos.es/blog/ropa-afectada-humo-incendio-siniestro-hogar',
    titulo:
      'Restauración textil tras incendios, humo y hollín: guía técnica y seguro',
    seoTitle:
      'Recuperar Ropa tras Humo e Incendio en Vigo | Mimos',
    metaDescription:
      'Guía técnica para recuperar ropa y textiles dañados por humo y hollín tras un incendio. Desodorización profunda, lavado técnico especializado y documentación para tramitar con el seguro del hogar en Vigo.',
    categoria: 'Siniestros del Hogar y Restauración Textil',
    fechaPublicacion: '8 de noviembre de 2026',
    fechaISO: '2026-11-08',
    tiempoLectura: '9 min de lectura técnica',
    extracto:
      'La contaminación de prendas y textiles tras un incendio plantea un desafío de física, química y gestión aseguradora. Descubre la fisiología del daño por COVs y hollín, los errores irreparables del lavado casero, los protocolos profesionales de desodorización y neutralización, la matriz diagnóstica de recuperación por fibra y cómo documentar la factura para tramitarla con tu seguro de hogar bajo la Ley 50/1980.',
    imagen: IMAGES.blogSiniestrosIncendio,
    imagenAlt:
      'Especialista en tintorería examinando prendas y abrigos recuperados tras un siniestro de humo e incendio',
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. He sufrido un siniestro de incendio/humo en casa y necesito presupuesto, memoria técnica y facturación para tramitar la recuperación de mis prendas con el seguro del hogar.'
    ),
  },
  {
    slug: 'protocolo-rotacion-apartamentos-turisticos-vigo',
    url: '/blog/protocolo-rotacion-apartamentos-turisticos-vigo',
    canonical:
      'https://www.tintoreriamimos.es/blog/protocolo-rotacion-apartamentos-turisticos-vigo',
    titulo:
      'Protocolo de rotación en apartamentos turísticos en Vigo: checklist textil',
    seoTitle:
      'Rotación de Apartamentos Turísticos en Vigo | Mimos',
    metaDescription:
      'Checklist operativo para anfitriones de Airbnb y Booking en Vigo: gestión de lencería de cama y toallas, desinfección ágil entre huéspedes y cómo delegar la operativa completa.',
    categoria: 'Alojamientos Turísticos y Anfitriones',
    fechaPublicacion: '7 de noviembre de 2026',
    fechaISO: '2026-11-07',
    tiempoLectura: '5 min de lectura',
    extracto:
      'La limpieza es el factor determinante en las valoraciones de los huéspedes en Airbnb y Booking. Conoce el checklist paso a paso para ejecutar rotaciones impecables en Vigo, el reto del secado con la humedad gallega y las ventajas de externalizar la lencería hotelera o la operativa completa.',
    imagen: IMAGES.blogApartamentosRotacion,
    imagenAlt:
      'Dormitorio de apartamento turístico en Vigo con cama preparada con sábanas blancas y toallas dobladas con mimo',
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Tengo apartamentos turísticos en Vigo y quiero informarme sobre el protocolo de limpieza y lencería entre reservas.'
    ),
  },
  {
    slug: 'limpieza-comunidades-propietarios-vigo',
    url: '/blog/limpieza-comunidades-propietarios-vigo',
    canonical:
      'https://www.tintoreriamimos.es/blog/limpieza-comunidades-propietarios-vigo',
    titulo:
      'Limpieza de comunidades de propietarios en Vigo: portales y escaleras',
    seoTitle:
      'Limpieza de Comunidades de Vecinos en Vigo | Mimos',
    metaDescription:
      'Frecuencias recomendadas, cuidado de granito y checklist LPH (CAE, RC, PRL y sustituciones) para juntas y administradores de fincas en Vigo.',
    categoria: 'Comunidades y Mantenimiento',
    fechaPublicacion: '7 de noviembre de 2026 (Actualizado nov. 2026)',
    fechaISO: '2026-11-07',
    tiempoLectura: '6 min de lectura',
    extracto:
      'El portal y las escaleras son la carta de presentación de cualquier edificio residencial. Descubre frecuencias recomendadas, productos de pH neutro para granito gallego y el checklist imprescindible (LPH, CAE, RC y PRL) para juntas y Administradores de Fincas en Vigo.',
    imagen: IMAGES.blogLimpiezaComunidades,
    imagenAlt:
      'Portal de comunidad de propietarios moderno y luminoso con suelo de granito pulido impecable en Vigo',
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Soy presidente/administrador de una comunidad de vecinos en Vigo y me gustaría solicitar presupuesto para la limpieza de nuestro portal y escaleras.'
    ),
  },
  {
    slug: 'limpieza-oficinas-despachos-clinicas-vigo',
    url: '/blog/limpieza-oficinas-despachos-clinicas-vigo',
    canonical:
      'https://www.tintoreriamimos.es/blog/limpieza-oficinas-despachos-clinicas-vigo',
    titulo:
      'Limpieza de oficinas, despachos y clínicas en Vigo: salud laboral e imagen',
    seoTitle:
      'Limpieza de Oficinas, Despachos y Clínicas en Vigo | Mimos',
    metaDescription:
      'Protocolos de limpieza periódica y desinfección para oficinas, consultas y locales comerciales en Vigo. Ambientes de trabajo saludables, productivos y libres de alérgenos.',
    categoria: 'Empresas y Espacios Comerciales',
    fechaPublicacion: '7 de noviembre de 2026',
    fechaISO: '2026-11-07',
    tiempoLectura: '5 min de lectura',
    extracto:
      'Un espacio de trabajo limpio reduce el absentismo laboral, mejora la concentración del equipo y proyecta profesionalidad ante clientes y visitas. Analizamos los puntos críticos de desinfección en oficinas y clínicas en Vigo, horarios sin interferencias y facturación mensual deducible.',
    imagen: IMAGES.blogLimpiezaOficinas,
    imagenAlt:
      'Oficina corporativa moderna con mamparas de cristal y escritorios limpios y desinfectados en Vigo',
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar presupuesto para la limpieza periódica de nuestra oficina / despacho / clínica en Vigo.'
    ),
  },
  {
    slug: 'guia-arreglos-ropa-bajo-vaquero-vigo',
    url: '/blog/guia-arreglos-ropa-bajo-vaquero-vigo',
    canonical:
      'https://www.tintoreriamimos.es/blog/guia-arreglos-ropa-bajo-vaquero-vigo',
    titulo:
      'Arreglos de ropa en Vigo: bajo original vaquero, ceremonia y modista in situ',
    seoTitle:
      'Arreglos de Ropa Vigo: Bajo Original y Modista | Mimos',
    metaDescription:
      'Guía técnica de arreglos de ropa en Vigo sin cita previa: bajo original vaquero, encogimiento, prueba de ceremonia, piel y talleres in situ de Mimos.',
    categoria: 'Costura y Arreglos de Ropa',
    fechaPublicacion: '19 de noviembre de 2026',
    fechaISO: '2026-11-19',
    tiempoLectura: '9 min de lectura',
    extracto:
      'Diferencia técnica entre bajo original (Euro Hem), bajo a máquina e invisible a mano; encogimiento de lino y denim antes de acortar; límites reales en seda, satén, pedrería o hombros de americana; costura en cuero, cremalleras y circuito integrado de tintorería + modista in situ en Vigo.',
    imagen: IMAGES.arreglosRopa,
    imagenAlt:
      'Trabajo profesional de costura y marcado de bajo de pantalón con jaboncillo de sastre en Tintorería Mimos Vigo',
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. He leído la guía de arreglos de ropa y quiero consultar un bajo original vaquero o compostura en Vigo.'
    ),
  },
  {
    slug: 'humedad-acaros-colchones-sofas-vigo',
    url: '/blog/humedad-acaros-colchones-sofas-vigo',
    canonical:
      'https://www.tintoreriamimos.es/blog/humedad-acaros-colchones-sofas-vigo',
    titulo:
      'Humedad y ácaros en Vigo: cómo cuidar colchones, sofás y tapicerías',
    seoTitle:
      'Humedad y Ácaros en Colchones y Sofás en Vigo | Mimos',
    metaDescription:
      'Guía técnica para cuidar colchones y sofás en Vigo (77 % humedad): códigos W/S/WS/X, tejidos, riesgos de vaporeta/lejía y limpieza sin empapar.',
    categoria: 'Hogar, Colchones y Tapicerías',
    fechaPublicacion: '19 de noviembre de 2026',
    fechaISO: '2026-11-19',
    tiempoLectura: '9 min de lectura',
    extracto:
      'Con un 77 % de humedad media anual en Vigo (80–85 % entre octubre y enero), colchones, canapés y sofás entran en la franja óptima para ácaros y moho. Analizamos los códigos W/S/WS/X, seis tejidos habituales (Aquaclean, microfibra, chenilla, lino, terciopelo y viscosa), por qué la vaporeta, la lejía o el bicarbonato con vinagre dañan la espuma o fijan cercos y cómo higienizar por inyección-extracción controlada con secado natural al aire.',
    imagen: IMAGES.blogColchonesTapicerias,
    imagenAlt:
      'Interior luminoso con sofá y dormitorio higienizados sin cercos ni exceso de humedad en Vigo',
    whatsappCtaUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. He leído la guía sobre humedad y ácaros y quiero pedir valoración con foto para limpiar mi colchón o sofá en Vigo.'
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
    titulo: 'Lavandería y cuidado textil para alojamientos turísticos',
    subtitulo: 'Lavado, secado, planchado y embolsado de ropa de cama y toallas en Vigo',
    descripcion:
      'Servicio de lavandería para propietarios y gestores de alojamientos turísticos en Vigo: lavado, higienización, planchado y entrega de juegos de cama y baño listos para su uso.',
    incluye: [
      'Lavado, secado y planchado de sábanas, fundas nórdicas y toallas',
      'Entrega de lencería limpia y protegida por lotes para facilitar su gestión',
      'Lavado e higienización de protectores, mantas y edredones',
      'Presupuestos adaptados al volumen y frecuencia de cada alojamiento',
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar un presupuesto para lavandería de apartamentos turísticos'
    ),
  },
  {
    index: '02',
    id: 'empresas-y-comercios',
    titulo: 'Lavandería para empresas, comercios y profesionales',
    subtitulo: 'Cuidado textil regular para negocios y autónomos de Vigo',
    descripcion:
      'Servicio continuado o puntual de lavado, higienización y planchado para negocios que necesitan cuidar su vestuario laboral con suciedad normal, toallas o batas.',
    incluye: [
      'Toallas, capas y batas de peluquerías, barberías, estética y clínicas',
      'Uniformes corporativos, polos, camisas y vestuario laboral con suciedad habitual',
      'Factura mensual agrupada con CIF para empresas y profesionales autónomos',
      'Atención en nuestras 3 tiendas de Vigo o recogida concertada según volumen',
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar un presupuesto de lavandería para mi empresa o negocio en Vigo'
    ),
  },
  {
    index: '03',
    id: 'higienizacion-gran-formato',
    titulo: 'Limpieza e higienización de textiles de gran formato',
    subtitulo: 'Edredones, mantas, cortinas y alfombras en Vigo',
    descripcion:
      'Tratamiento profesional para prendas y piezas textiles voluminosas que requieren procesos de tintorería y lavandería especializada en nuestras instalaciones propias.',
    incluye: [
      'Lavado e higienización de edredones de plumas y sintéticos',
      'Limpieza y tratamiento de cortinas y fundas desmontables',
      'Servicio de limpieza y mantenimiento de alfombras con recogida y entrega',
      'Tratamiento adaptado a la composición y etiqueta de cada tejido',
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar presupuesto para higienización de edredones o textiles de gran formato'
    ),
  },
  {
    index: '04',
    id: 'planchado-acabado-textil',
    titulo: 'Servicio de solo planchado y acabado textil',
    subtitulo: 'Planchado profesional para particulares, alojamientos y comercios',
    descripcion:
      'Servicio dedicado de planchado y empaquetado para quienes necesitan tener sus prendas, ropa de cama o mantelería perfectamente listas para usar o almacenar.',
    incluye: [
      'Planchado profesional adaptado a cada tipo de tejido y fibra',
      'Entrega de prendas en percha o dobladas según preferencia',
      'Cuidado riguroso de prendas delicadas y de tintorería',
      'Consulta de condiciones y plazos a través de Mimo por WhatsApp',
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar condiciones para el servicio de solo planchado'
    ),
  },
  {
    index: '05',
    id: 'recuperacion-siniestros',
    titulo: 'Recuperación Textil tras Siniestros (Incendios, Humo e Inundaciones)',
    subtitulo: 'Eliminación de humo, hollín y olores / Presupuesto y factura para aseguradoras',
    descripcion:
      'Servicio especializado y urgente para particulares y empresas afectados por incendios, humaredas o inundaciones en Vigo y área de influencia. Retiramos y recuperamos todo el vestuario y ajuar del hogar.',
    incluye: [
      'Eliminación de olores a humo persistentes mediante desodorización profesional',
      'Desmanchado y descontaminación de partículas de hollín en tejidos delicados',
      'Lavado, planchado y recuperación de armarios enteros, edredones, cortinas y alfombras',
      'Factura oficial desglosada con CIF y memoria técnica de trabajos para tramitar con tu compañía aseguradora',
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Necesito consultar el servicio urgente de recuperación textil tras siniestro (incendio, humo o inundación) en Vigo'
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
    respuesta: `Para darte el precio exacto según tu prenda, tejido o servicio (trajes, vestidos, Wet Cleaning, limpieza en seco, cortinas y estores, edredones, limpieza o arreglo de alfombras, sofás o colada familiar), escríbenos por WhatsApp al ${CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado} y te orientamos detalladamente.`,
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el precio de un servicio de tintorería o limpieza'
    ),
    whatsappCtaLabel: 'Consultar precio por WhatsApp',
  },
  {
    id: 'sofas',
    label: 'Limpieza de sofás',
    respuesta: `Limpiamos sofás, chaiselongue, sillones, sillas, cabeceros y colchones a domicilio en Vigo y comarca por inyección-extracción controlada (o limpieza en seco en etiquetas código S), con secado natural al aire. No trabajamos tapicerías de coches ni usamos vapor seco, enzimáticos ni ventiladores. Envía foto frontal, manchas y etiqueta (W/S/WS/X) a Mimo.`,
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero pedir presupuesto para limpiar mi sofá o tapicería a domicilio. Te envío foto frontal, manchas y etiqueta.'
    ),
    whatsappCtaLabel: 'Enviar foto del sofá a Mimo',
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
    respuesta: `Disponemos de servicio de recogida y entrega a domicilio en Vigo, comarca (incluidos Baiona, Nigrán, Mos, Porriño, Redondela, Gondomar, Ponteareas, Cangas y Moaña) y polígonos industriales (sujeto a ruta e importe mínimo de pedido a consultar con Mimo); sin importe mínimo entregando en nuestras 3 tiendas propias o 5 puntos colaboradores. Puedes pedirlo por WhatsApp (${CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado}), formulario web o teléfono.`,
    whatsappUrl: CONTACT_INFO.whatsappPickupHref,
    whatsappCtaLabel: 'Solicitar recogida por WhatsApp',
  },
  {
    id: 'costura',
    label: 'Costura y arreglos',
    respuesta: `Cubrimos todo tipo de costura y arreglos de ropa (bajos, cremalleras, botones, cintura, zurcidos, rotos y confección de cortinas, estores y cojines; además de piel, delicadas, bordados y servicio express en taller propio) en Gregorio Espino y Venezuela, recepción en Navia, y en los puntos con costura: ${PUNTOS_CON_COSTURA.filter(
      (p) => p.tipo === 'punto'
    )
      .map((p) => `${p.localidad} (${p.nombre_comercio}, ${p.direccion})`)
      .join(', ')}.`,
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar un arreglo de ropa o confección y mi punto de costura más cercano'
    ),
    whatsappCtaLabel: 'Consultar arreglo con Mimo',
  },
  {
    id: 'siniestros',
    label: 'Incendios, humo y seguros',
    respuesta: `Recuperamos vestuario, abrigos, cortinas, edredones y alfombras afectados por incendio, humo, hollín o inundaciones en Vigo y comarca (exclusivamente textiles; no realizamos limpieza de obra en paredes ni muebles). Hacemos triaje con prueba de viabilidad previa, lote prioritario urgente y factura oficial con CIF ${CONTACT_INFO.cif} para tu aseguradora. Consulta la página /limpieza-incendios-siniestros-vigo (con plantilla PDF/Excel Art. 38 y carta para el seguro) o escríbenos al WhatsApp ${CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado}.`,
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Necesito consultar la recuperación urgente de ropa y textiles tras un siniestro (incendio, humo o inundación) en Vigo para tramitar con mi seguro.'
    ),
    whatsappCtaLabel: 'Consultar siniestro con Mimo',
  },
  {
    id: 'apartamentos-empresas',
    label: 'Apartamentos y empresas',
    respuesta:
      'Ofrecemos soluciones de lavandería, uniformidad laboral y limpieza profesional para apartamentos turísticos, viviendas, oficinas, comunidades y empresas en Vigo con presupuesto a medida.',
    whatsappUrl: CONTACT_INFO.whatsappApartamentosHref,
    whatsappCtaLabel: 'Pedir presupuesto a medida',
  },
];

// Catálogo estructurado para portada: Familia 1 (15 servicios en 4 subbloques) + Familias 3 y 4
export interface SubbloqueTintoreriaPortada {
  id: string;
  codigo: string;
  titulo: string;
  subtitulo: string;
  servicios: string[];
  enlaces: { label: string; href: string }[];
  whatsappUrl: string;
}

export const SUBBLOQUES_TINTORERIA_PORTADA: SubbloqueTintoreriaPortada[] = [
  {
    id: 'ropa-ceremonia-delicadas',
    codigo: 'SUBBLOQUE 01 · PRENDAS DE VESTIR',
    titulo: 'Ropa de vestir, ceremonia y prendas delicadas',
    subtitulo: 'Limpieza individualizada según fibra, forro y estructura sastre',
    servicios: [
      'Tintorería profesional de prendas y teñido textil',
      'Limpieza de trajes, americanas y prendas de vestir',
      'Limpieza de vestidos de fiesta y ceremonia (bautizo, comunión y novia)',
      'Limpieza de prendas delicadas (seda, lana, lino, pedrería o encaje)',
    ],
    enlaces: [
      { label: 'Tintorería profesional', href: '/tintoreria-vigo' },
      { label: 'Novia y ceremonia', href: '/limpieza-vestidos-novia-ceremonia-vigo' },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el precio para limpiar o teñir un traje, vestido de ceremonia o prenda delicada.'
    ),
  },
  {
    id: 'colada-planchado-diario',
    codigo: 'SUBBLOQUE 02 · USO DIARIO',
    titulo: 'Colada familiar y planchado profesional',
    subtitulo: 'Ahorra tiempo en tu semana con entrega doblada o en percha',
    servicios: [
      'Colada familiar: lavado, secado y doblado (o con planchado opcional)',
      'Planchado profesional de camisas, pantalones, vestidos y lencería de mesa',
      'Lavandería atendida: plumíferos, anoraks y encerado/impermeabilización (Barbour, Gore-Tex)',
    ],
    enlaces: [
      { label: 'Colada familiar', href: '/colada-familiar-vigo' },
      { label: 'Planchado', href: '/planchado-vigo' },
      { label: 'Lavandería', href: '/lavanderia-vigo' },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar presupuesto para colada familiar, lavandería (incl. encerado/impermeabilización) o solo planchado.'
    ),
  },
  {
    id: 'hogar-cortinas-alfombras',
    codigo: 'SUBBLOQUE 03 · HOGAR Y GRAN FORMATO',
    titulo: 'Edredones, mantas, cortinas, estores y alfombras',
    subtitulo: 'Maquinaria de gran capacidad y taller propio para piezas voluminosas',
    servicios: [
      'Limpieza e higienización de edredones (plumas y sintéticos) y mantas',
      'Limpieza de cortinas y estores',
      'Limpieza e higienización profunda de alfombras con secado completo',
      'Reparación y restauración de alfombras: flecos, ribetes y bordes mediante especialista',
    ],
    enlaces: [
      { label: 'Textiles del hogar', href: '/textiles-hogar-vigo' },
      { label: 'Alfombras y arreglos', href: '/limpieza-alfombras-vigo' },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero pedir valoración para edredones, mantas, cortinas, estores o alfombras.'
    ),
  },
  {
    id: 'tecnicas-especiales-industria',
    codigo: 'SUBBLOQUE 04 · TÉCNICAS ESPECIALES E INDUSTRIA',
    titulo: 'Wet Cleaning, teñido, encerado, pieles, empresas y siniestros',
    subtitulo: 'Procesos técnicos avanzados para materiales críticos y recuperación',
    servicios: [
      'Wet Cleaning (limpieza ecológica en agua), limpieza en seco y teñido de prendas',
      'Encerado Barbour e impermeabilización técnica (Gore-Tex y membranas)',
      'Limpieza y restauración de pieles, cuero, ante y nobuk (en 3 tiendas y 5 puntos)',
      'Lavandería de uniformidad laboral (suciedad normal), toallas de clínicas y peluquerías',
      'Limpieza y recuperación de textiles afectados por incendios o humo',
    ],
    enlaces: [
      { label: 'Incendios y siniestros', href: '/limpieza-incendios-siniestros-vigo' },
      { label: 'Pieles y cuero', href: '/limpieza-pieles-cuero-vigo' },
      { label: 'Lavandería para empresas', href: '/servicios-empresas' },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar un tratamiento especial (teñido, encerado/impermeabilización, piel/ante, uniformidad o recuperación tras incendio).'
    ),
  },
];

export const RESUMEN_FAMILIAS_EXTENDIDAS_PORTADA = {
  limpiezaProfesional: {
    badge: 'FAMILIA 03 · LIMPIEZA PROFESIONAL',
    titulo: 'Limpieza periódica para comunidades, oficinas y locales',
    descripcion:
      'Mantenimiento profesional en Vigo con personal dado de alta, seguro RC, documentación PRL/CAE al día, sustituciones cubiertas y visita técnica de valoración gratuita.',
    puntos: [
      'Comunidades de propietarios y Administradores de Fincas (LPH)',
      'Oficinas, despachos, clínicas y locales comerciales',
      'Sofás, tapicerías y colchones a domicilio por inyección-extracción',
      'Pack combinado con lavandería de empresa y recuperación tras incendios',
      'Enfoque exclusivo en mantenimiento periódico (sin fin de obra ni cristales en altura)',
    ],
    enlaces: [
      { label: 'Ver limpieza profesional', href: '/limpieza-profesional-vigo' },
      { label: 'Ver lavandería para empresas', href: '/servicios-empresas' },
    ],
    whatsappUrl: CONTACT_INFO.whatsappCleaningHref,
  },
  alojamientosTuristicos: {
    badge: 'FAMILIA 04 · ALOJAMIENTOS TURÍSTICOS',
    titulo: 'Limpieza, lencería y operativa VUT en franja 11:00–15:00',
    descripcion:
      'Especialistas en apartamentos turísticos en Vigo incluidos sábados, festivos y agosto: rotación entre huéspedes, lavandería propia, amenities, entrega de llaves y reporte fotográfico.',
    puntos: [
      'Limpieza en ventana 11:00–15:00 (sábados, festivos y agosto) según Decreto 12/2017',
      'Lavado y planchado de tu ropa de cama y toallas separada por vivienda',
      'Reposición de amenities y coordinación de entrega de llaves / check-in',
      'Reporte fotográfico inmediato de incidencias tras cada check-out',
    ],
    enlaces: [
      { label: 'Ver gestión de alojamientos', href: '/limpieza-apartamentos-turisticos-vigo' },
    ],
    whatsappUrl: CONTACT_INFO.whatsappApartamentosHref,
  },
};
