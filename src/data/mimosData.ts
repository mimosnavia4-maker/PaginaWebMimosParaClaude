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
  type DiscrepanciaRegistrada,
};

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
  blogSiniestrosIncendio: '/images/articulos/blog-siniestros-incendio.jpg',
  blogLimpiezaComunidades: '/images/articulos/blog-limpieza-comunidades.jpg',
  blogLimpiezaOficinas: '/images/articulos/blog-limpieza-oficinas.jpg',
  blogApartamentosRotacion: '/images/articulos/blog-apartamentos-rotacion.jpg',
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
      'Lavandería 100 % atendida en Vigo (sin monedas): plumíferos, anoraks, cazadoras impermeables, jerséis delicados y secado anti-humedad en planta de Navia.',
    h1: 'Lavandería profesional atendida en Vigo para tus prendas técnicas, delicadas y de abrigo',
    titulo: 'Lavandería',
    subtitulo: 'Lavado acuoso 100 % atendido de plumíferos, anoraks, ropa técnica y jerséis',
    descripcion:
      'Somos una lavandería 100 % atendida en nuestra planta propia de Navia (Vigo), sin máquinas de autoservicio ni monedas. Clasificamos por color y fibra, revisamos cada etiqueta, realizamos desmanchado previo y aplicamos lavado acuoso controlado con secado completo anti-humedad para tus plumíferos, anoraks, cazadoras impermeables y prendas delicadas.',
    queTratamos: [
      'Plumíferos, anoraks, parkas y chaquetas acolchadas de pluma o fibra lavables en agua',
      'Cazadoras impermeables, cortavientos y ropa técnica o deportiva con membrana',
      'Jerséis de punto, prendas de lana lavables en agua y piezas delicadas',
      'Prendas particulares con olor persistente a humedad acumulada o humo',
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
      'Servicio de recogida y entrega de tintorería y lavandería a domicilio en Vigo y red de puntos colaboradores en Redondela, Gondomar, Ponteareas y O Porriño.',
    h1: 'Recogida y entrega de prendas a domicilio y en puntos colaboradores',
    titulo: 'Recogida y entrega a domicilio y en puntos',
    subtitulo: 'Pasamos por tu domicilio o te atendemos en tu punto colaborador más cercano',
    descripcion:
      'Para que cuidar tu ropa resulte todavía más sencillo, disponemos de servicio de recogida y entrega a domicilio sujeto a un importe mínimo de servicio (a consultar con Mimo según zona y recogida en Vigo y alrededores), así como 3 tiendas propias en Vigo y puntos colaboradores en la comarca.',
    queTratamos: [
      'Recogida de prendas de tintorería, pieles, coladas familiares, edredones y alfombras (importe mínimo a domicilio a consultar)',
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
    nombre: 'Solo Ropa de Cama y Toallas',
    estado: 'Servicio de lavandería profesional',
    descripcion:
      'Tú te encargas del apartamento. Nosotros nos ocupamos de que la ropa de cama y baño esté siempre limpia, cuidada y preparada para la siguiente estancia.',
    incluye: [
      'Lavado, higienización y planchado profesional de sábanas, fundas nórdicas, toallas y demás textiles del alojamiento.',
      'Preparación de los juegos de cama y baño limpios y listos para su utilización.',
      'Recogida de ropa utilizada y entrega de lencería limpia, adaptándonos a las necesidades y días de cambio del alojamiento.',
    ],
    ctaTexto: 'Consultar servicio de lavandería',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el servicio de lavandería y lencería para apartamentos turísticos en Vigo'
    ),
  },
  {
    id: 'pack-checkout',
    nombre: 'Limpieza y Lavandería Completa',
    estado: 'Preparación entre reservas',
    descripcion:
      'Tú gestionas las reservas. Nosotros nos ocupamos de la limpieza y de la ropa entre una estancia y la siguiente, para que el alojamiento esté preparado para recibir a nuevos huéspedes.',
    incluye: [
      'Limpieza profesional del apartamento después de cada salida, incluyendo cocina, baño, habitaciones y zonas comunes.',
      'Recogida de textiles utilizados, tratamiento de lavandería y entrega de juegos limpios de cama y baño.',
      'Revisión visual del estado del alojamiento y comunicación de posibles incidencias o necesidades detectadas.',
    ],
    ctaTexto: 'Solicitar presupuesto de limpieza y lavandería',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar presupuesto de limpieza y lavandería completa para mi apartamento turístico en Vigo'
    ),
  },
  {
    id: 'pack-gestion-integral',
    nombre: 'Coordinación Integral de Limpieza y Lavandería',
    estado: 'Servicio coordinado para propietarios y gestores',
    descripcion:
      'Coordinamos la limpieza tras cada checkout y el suministro puntual de lencería limpia, adaptándonos al calendario de entradas y salidas de tu alojamiento.',
    incluye: [
      'Limpieza completa del apartamento entre reservas (baños, cocina, dormitorios y zonas comunes).',
      'Lavandería y planchado profesional de ropa de cama y baño con entrega de juegos limpios.',
      'Revisión visual del estado del inmueble tras la salida y aviso inmediato de incidencias.',
      'Coordinación logística flexible según las fechas de ocupación de tu alojamiento.',
    ],
    ctaTexto: 'Solicitar propuesta de coordinación integral',
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero solicitar propuesta de coordinación integral de limpieza y lavandería para apartamentos turísticos en Vigo'
    ),
  },
];

// 4 Bloques estructurados de la Modalidad 3 (Coordinación Integral de Limpieza y Lavandería)
export const GESTION_INTEGRAL_AREAS = [
  {
    numero: '01',
    titulo: 'Planificación y rotación de limpiezas',
    puntos: [
      'Coordinación de los turnos de limpieza adaptados al calendario de salidas y entradas de tu alojamiento.',
      'Limpieza exhaustiva de estancias: cocina, baño, dormitorios y zonas comunes tras cada checkout.',
      'Uso de productos profesionales y desinfección de superficies de alto contacto.',
    ],
  },
  {
    numero: '02',
    titulo: 'Lavandería y gestión textil completa',
    puntos: [
      'Recogida de ropa de cama y toallas usadas tras la salida de cada huésped.',
      'Lavado térmico, higienización y planchado profesional en calandra de vapor.',
      'Entrega de lencería limpia, empaquetada y lista para su uso en el siguiente cambio.',
    ],
  },
  {
    numero: '03',
    titulo: 'Revisión del inmueble en cada cambio',
    puntos: [
      'Revisión visual del estado general de la vivienda durante el proceso de limpieza.',
      'Comunicación rápida con el propietario si se detectan incidencias o desperfectos.',
      'Ventilación completa y comprobación de orden general para la siguiente estancia.',
    ],
  },
  {
    numero: '04',
    titulo: 'Logística ágil y regularidad en Vigo',
    puntos: [
      'Rutas de reparto y recogida adaptadas al ritmo de reservas de tus alojamientos.',
      'Puntualidad en los días de mayor rotación (fines de semana y temporada alta).',
      'Facturación transparente agrupada por estancias o por volumen de textil tratado.',
    ],
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
  modoCobertura?: 'punto-fisico' | 'solo-domicilio';
  opcionesCercanas?: {
    nombre: string;
    direccion: string;
    href: string;
    detalle: string;
  }[];
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
    seoTitle: 'Tintorería y Lavandería Mimos en Gondomar | Punto en Puntadas No Aire',
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
    seoTitle: 'Tintorería y Lavandería Mimos en Ponteareas | Punto en Arregla2',
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
    seoTitle: 'Tintorería y Lavandería Mimos en O Porriño | Punto en Telas y Más',
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
          'Escríbenos por WhatsApp al 655 536 844 para consultar disponibilidad y presupuesto personalizado según la prenda o el arreglo que necesites.',
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
      'Conoce nuestras 3 tiendas propias de Tintorería Mimos en Vigo (C/ Teixugueiras 11, Rúa de Venezuela 29 Entreplanta y Alcalde Gregorio Espino 42) con servicios completos, talleres propios de costura en Gregorio Espino y Venezuela, recepción en Navia y recogida a domicilio.',
    h1: 'Nuestras 3 tiendas propias en Vigo y servicio de recogida a domicilio',
    subtitulo:
      'Atención directa en nuestras 3 tiendas propias de Vigo (taller propio de costura in situ en Gregorio Espino y Venezuela, y recepción en Navia), con limpieza de alfombras y recogida a domicilio.',
    explicacionEspecificaZona: [
      'En Vigo contamos con 3 tiendas propias de Tintorería Mimos Navia, S.L.: la sede central en C/ Teixugueiras, 11, bajo 9 (Navia, punto de recepción para arreglos), la tienda de Rúa de Venezuela, 29, Entreplanta (Santiago de Vigo, con taller propio de costura in situ) y la de Avda. Alcalde Gregorio Espino, 42 (con taller propio de costura y modistería in situ). En nuestras 3 tiendas ofrecemos el catálogo completo de cuidado textil, tintorería, lavandería, limpieza de alfombras y servicio coordinado de arreglos de ropa.',
      'Para mayor comodidad de particulares, empresas y viviendas turísticas, disponemos también de servicio coordinado de recogida y entrega a domicilio en Vigo y comarca con solicitud directa a través de nuestro asistente Mimo por WhatsApp o formulario web.',
    ],
    pasosEntregaRecogida: [
      {
        paso: '01',
        titulo: 'Elige entre nuestras 3 tiendas propias en Vigo o solicita recogida a domicilio',
        detalle:
          'Acude a cualquiera de nuestras 3 tiendas propias (taller propio in situ en Gregorio Espino y Venezuela, o entrega y recepción en Navia) para todos los servicios y arreglos, o solicita recogida a domicilio con Mimo.',
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
          'Nuestras 3 tiendas propias se encuentran en C/ Teixugueiras, 11, bajo 9 (Navia, CP 36212), Rúa de Venezuela, 29, Entreplanta (Centro / Santiago de Vigo, CP 36203) y Avda. Alcalde Gregorio Espino, 42 (O Calvario, CP 36205). Ofrecemos el catálogo completo de tintorería, lavandería, planchado, colada y limpieza de alfombras en las 3 tiendas. Para arreglos de ropa, disponemos de taller propio de costura in situ en Gregorio Espino y Venezuela, mientras que en Navia atendemos la recepción y entrega de prendas para su confección en nuestros talleres.',
      },
      {
        pregunta: '¿Qué tiendas propias de Vigo abren los sábados por la mañana?',
        respuesta:
          'Abren los sábados por la mañana nuestras tiendas de Navia (C/ Teixugueiras, 11, bajo 9, de 10:00 a 13:30) y Gregorio Espino (Avda. Alcalde Gregorio Espino, 42, de 09:30 a 13:00). La tienda de Rúa de Venezuela, 29, Entreplanta atiende de lunes a viernes de 09:30 a 13:30 y de 16:30 a 19:30.',
      },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar un servicio de tintorería o costura en Vigo'
    ),
  },
  {
    slug: 'mos',
    url: '/zonas/mos',
    canonical: 'https://www.tintoreriamimos.es/zonas/mos',
    localidad: 'Mos',
    comarca: 'Recogida a domicilio',
    codigosPostales: '36415 - 36419',
    modoCobertura: 'solo-domicilio',
    opcionesCercanas: [
      {
        nombre: 'Punto colaborador O Porriño · Telas y Más',
        direccion: 'C/ Manuel Rodríguez, 30 · 36400 O Porriño',
        href: '/zonas/o-porrino',
        detalle:
          'Sin importe mínimo. Recepción de tintorería, lavandería, alfombras y costura confirmada.',
      },
      {
        nombre: 'Tienda propia Gregorio Espino (Vigo)',
        direccion: 'Alcalde Gregorio Espino, 42 · 36205 Vigo',
        href: '/tienda-mimos-gregorio-espino-vigo',
        detalle:
          'A unos 15 minutos desde Mos por la A-55. Taller propio de costura in situ, tintorería y colada.',
      },
      {
        nombre: 'Sede central Mimos Navia (Vigo)',
        direccion: 'C/ Teixugueiras, 11, bajo 9 · 36212 Vigo',
        href: '/tienda-mimos-navia-vigo',
        detalle:
          'Planta central de tintorería, gran formato y limpieza de alfombras con sábados abiertos.',
      },
    ],
    tienePendientes: false,
    seoTitle: 'Tintorería y Lavandería con Recogida en Mos | Tintorería Mimos',
    metaDescription:
      'Tintorería, lavandería, alfombras y sofás en Mos mediante recogida a domicilio con Mimo o entrega en O Porriño y Vigo. Consulta ruta hoy.',
    h1: 'Tintorería, lavandería y limpieza de alfombras con recogida en Mos',
    subtitulo:
      'Actualmente no contamos con tienda propia ni punto colaborador físico en Mos: atendemos el municipio mediante recogida y entrega a domicilio (sujeta a ruta e importe mínimo) y en nuestros puntos cercanos de O Porriño y Vigo.',
    explicacionEspecificaZona: [
      'Si vives o trabajas en Mos (Puxeiros, Tameiga, Petelos, Sanguiñeda, Louredo o Dornelas) y necesitas limpiar alfombras grandes, edredones de plumas, cortinas o trajes, podemos coordinar la recogida y devolución directamente en tu vivienda o empresa dentro de nuestra ruta de área metropolitana.',
      'Con total transparencia: en Mos todavía no disponemos de comercio colaborador ni tienda física propia. Si tienes pocas prendas sueltas y prefieres evitar el importe mínimo del servicio a domicilio, puedes entregarlas sin mínimo en nuestro punto colaborador de O Porriño (Telas y Más, C/ Manuel Rodríguez, 30) o en nuestras tiendas propias de Vigo.',
    ],
    pasosEntregaRecogida: [
      {
        paso: '01',
        titulo: 'Consulta ruta e importe mínimo con Mimo por WhatsApp',
        detalle:
          'Indícanos tu parroquia o código postal en Mos y las piezas que quieres tratar (ropa, edredones, alfombras o sofá a domicilio) para confirmarte día de ruta y orientación de precio.',
      },
      {
        paso: '02',
        titulo: 'Recogida en domicilio o entrega en O Porriño / Vigo',
        detalle:
          'Recogemos tu encargo con furgoneta propia o, si prefieres entregar sin pedido mínimo, puedes acudir al punto colaborador Telas y Más (O Porriño) o a nuestras tiendas propias en Vigo.',
      },
      {
        paso: '03',
        titulo: 'Tratamiento en nuestra planta de Navia y devolución',
        detalle:
          'Procesamos tus prendas, alfombras o textiles del hogar en nuestras instalaciones propias de Vigo con secado completo anti-humedad y te los entregamos listos.',
      },
    ],
    preguntasFrecuentes: [
      {
        pregunta: '¿Tenéis tienda física o punto colaborador en Mos?',
        respuesta:
          'No todavía. Queremos ser 100 % transparentes: en Mos no hay tienda propia ni punto colaborador por ahora. Atendemos el municipio mediante recogida y entrega a domicilio (sujeta a ruta e importe mínimo) o en los establecimientos cercanos de O Porriño y Vigo.',
      },
      {
        pregunta: '¿Qué servicios ofrecéis a domicilio en Mos?',
        respuesta:
          'Recogida y entrega de tintorería, lavandería, colada familiar, edredones, cortinas (con desmontaje y colocación opcional), limpieza y reparación de alfombras, además de limpieza de sofás y tapicerías directamente en tu casa.',
      },
      {
        pregunta: '¿Cuál es la opción más cercana si no llego al pedido mínimo a domicilio?',
        respuesta:
          'Puedes depositar cualquier cantidad de prendas sin pedido mínimo en nuestro punto colaborador Telas y Más (C/ Manuel Rodríguez, 30, O Porriño) o acercarte por la A-55 a nuestra tienda propia de Gregorio Espino, 42 en Vigo.',
      },
      {
        pregunta: '¿Cómo pido presupuesto y fecha de recogida en Mos?',
        respuesta:
          'Escríbenos por WhatsApp al 655 536 844 con tu zona de Mos y fotos o listado de tus piezas, o llámanos al 986 12 51 41 para confirmarte ruta.',
      },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Vivo en Mos y quiero consultar ruta e importe mínimo para una recogida a domicilio'
    ),
  },
  {
    slug: 'nigran',
    url: '/zonas/nigran',
    canonical: 'https://www.tintoreriamimos.es/zonas/nigran',
    localidad: 'Nigrán',
    comarca: 'Recogida a domicilio',
    codigosPostales: '36340 - 36370',
    modoCobertura: 'solo-domicilio',
    opcionesCercanas: [
      {
        nombre: 'Punto colaborador Gondomar · Puntadas No Aire',
        direccion: 'Avda. Elduayen, 9 · 36380 Gondomar',
        href: '/zonas/gondomar',
        detalle:
          'En el mismo Val Miñor, sin importe mínimo. Recogida de tintorería/hogar y costura confirmada.',
      },
      {
        nombre: 'Sede central Mimos Navia (Vigo)',
        direccion: 'C/ Teixugueiras, 11, bajo 9 · 36212 Vigo',
        href: '/tienda-mimos-navia-vigo',
        detalle:
          'A unos 10 minutos por la VG-20 desde A Ramallosa o Panxón. Sábados mañana abierto.',
      },
    ],
    tienePendientes: false,
    seoTitle: 'Tintorería y Lavandería con Recogida en Nigrán | Mimos Val Miñor',
    metaDescription:
      'Tintorería, lavandería, edredones, alfombras y sofás en Nigrán (Val Miñor) por recogida a domicilio o en Gondomar y Navia. Consulta con Mimo.',
    h1: 'Tintorería, lavandería y limpieza de alfombras en Nigrán (Val Miñor)',
    subtitulo:
      'Actualmente no disponemos de tienda ni punto colaborador físico en Nigrán: cubrimos todo el municipio mediante recogida y entrega a domicilio (sujeta a ruta e importe mínimo) y en nuestros puntos vecinos de Gondomar y Vigo Navia.',
    explicacionEspecificaZona: [
      'En Nigrán, Panxón, Praia América, A Ramallosa, Priegue y Camos la humedad costera del Val Miñor dificulta el secado de nórdicos de plumas, mantas, cortinas y alfombras en casa. Atendemos Nigrán con ruta programada de recogida y entrega a domicilio, además de servicio in situ para limpieza de sofás y tapicerías.',
      'De forma transparente: todavía no tenemos tienda propia ni comercio colaborador dentro del término municipal de Nigrán. Si quieres entregar una prenda suelta sin importe mínimo, estamos muy cerca tanto en nuestro punto colaborador de Gondomar (Puntadas No Aire, Avda. Elduayen, 9) como en nuestra sede central de Navia (Vigo) por la VG-20.',
    ],
    pasosEntregaRecogida: [
      {
        paso: '01',
        titulo: 'Consulta ruta en Nigrán con Mimo por WhatsApp',
        detalle:
          'Escríbenos indicando tu zona de Nigrán (Panxón, A Ramallosa, Priegue, centro...) y qué necesitas limpiar para confirmarte ventana de recogida e importe mínimo.',
      },
      {
        paso: '02',
        titulo: 'Recogida a domicilio o entrega en Gondomar / Navia',
        detalle:
          'Pasamos a recoger alfombras, cortinas, edredones o vestuario en ruta, o puedes acercarte sin mínimo a Puntadas No Aire (Gondomar) o a Mimos Navia (Vigo).',
      },
      {
        paso: '03',
        titulo: 'Lavado, secado completo anti-humedad y devolución',
        detalle:
          'Tratamos cada pieza en nuestra planta central de Vigo con secado completo controlado y la devolvemos embolsada o en percha lista para usar o guardar.',
      },
    ],
    preguntasFrecuentes: [
      {
        pregunta: '¿Hay tienda física o punto colaborador de Mimos en Nigrán?',
        respuesta:
          'No todavía. Actualmente no tenemos local ni punto colaborador en Nigrán: atendemos el municipio mediante recogida y entrega a domicilio (sujeta a ruta e importe mínimo) y desde las ubicaciones contiguas de Gondomar y Navia (Vigo).',
      },
      {
        pregunta: '¿Limpiáis sofás, alfombras y cortinas a domicilio en Nigrán?',
        respuesta:
          'Sí. Realizamos limpieza de sofás y colchones 100 % en tu vivienda de Nigrán, Panxón o A Ramallosa sin trasladar muebles, y recogemos alfombras y cortinas (con desmontaje y colocación opcional).',
      },
      {
        pregunta: '¿Dónde puedo dejar una prenda suelta cerca de Nigrán sin mínimo de pedido?',
        respuesta:
          'Tienes dos opciones muy próximas sin importe mínimo: nuestro punto colaborador Puntadas No Aire en el centro de Gondomar (Avda. Elduayen, 9) o nuestra sede central en Navia (C/ Teixugueiras, 11, bajo 9, Vigo) subiendo directo por la VG-20.',
      },
      {
        pregunta: '¿Atendéis viviendas vacacionales y pisos turísticos en el Val Miñor?',
        respuesta:
          'Sí, ofrecemos lavado y secado completo anti-humedad de sábanas, toallas, protectores y nórdicos para propietarios y gestores de alojamientos en Nigrán consultando frecuencia con Mimo.',
      },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Vivo en Nigrán y quiero consultar ruta e importe mínimo para una recogida a domicilio'
    ),
  },
];

export const ZONAS_SEO_LOCAL: ZonaSEOLocal[] = ZONAS_SEO_LOCAL_BASE;

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
    respuesta: `Puedes solicitar la recogida escribiendo por WhatsApp al ${CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado}, a través del formulario de esta web o desde la aplicación Wash In Town. El servicio a domicilio está sujeto a un importe mínimo de pedido (a consultar con Mimo) y a la zona de cobertura en Vigo y alrededores; sin importe mínimo si entregas en nuestras 3 tiendas propias o puntos colaboradores.`,
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
      'Guía Técnica de Restauración Textil Post-Incendio: Descontaminación de Humo, Hollín y Cobertura del Seguro del Hogar en España',
    seoTitle:
      'Restauración Textil por Humo e Incendio en Vigo | Guía Técnica y Seguro',
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
      'Protocolo de rotación en apartamentos turísticos en Vigo: checklist profesional de limpieza y gestión textil',
    seoTitle:
      'Protocolo de Limpieza y Rotación de Pisos Turísticos en Vigo | Mimos',
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
      'Limpieza de comunidades de propietarios en Vigo: claves para portales, escaleras y zonas comunes impecables',
    seoTitle:
      'Limpieza de Comunidades de Vecinos en Vigo | Tintorería Mimos',
    metaDescription:
      'Consejos y frecuencias recomendadas para la limpieza de portales, escaleras, cristales y garajes en comunidades de propietarios en Vigo. Servicio profesional y de confianza.',
    categoria: 'Comunidades y Mantenimiento',
    fechaPublicacion: '7 de noviembre de 2026',
    fechaISO: '2026-11-07',
    tiempoLectura: '5 min de lectura',
    extracto:
      'El portal y las escaleras son la carta de presentación de cualquier edificio residencial. Descubre qué plan de frecuencias es el más adecuado según el número de vecinos, qué productos utilizar para no deteriorar el granito o mármol y las ventajas de contratar una empresa local con personal asegurado y supervisado en Vigo.',
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
      'Limpieza e higienización de oficinas, despachos y clínicas en Vigo: salud laboral y primera impresión',
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
    respuesta: `Disponemos de servicio de recogida y entrega a domicilio en Vigo y alrededores (sujeto a importe mínimo de pedido a consultar con Mimo y zona de cobertura); sin importe mínimo entregando en nuestras 3 tiendas propias o puntos colaboradores. Puedes pedirlo por WhatsApp (${CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado}), formulario web o Wash In Town.`,
    whatsappUrl: CONTACT_INFO.whatsappPickupHref,
    whatsappCtaLabel: 'Solicitar recogida por WhatsApp',
  },
  {
    id: 'costura',
    label: 'Costura y arreglos',
    respuesta: `Cubrimos 18 especialidades de costura y arreglos (bajos, cremalleras, botones, cintura, zurcidos, rotos y confección de cortinas, estores y cojines; además de piel, delicadas, bordados y servicio express en taller propio) en Gregorio Espino y Venezuela, recepción en Navia, y en los puntos con costura: ${PUNTOS_CON_COSTURA.filter(
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

// SECCIÓN 16 DEL PLAN MAESTRO: Servicio prioritario de limpieza de alfombras con recogida y entrega (/limpieza-alfombras-vigo)
export const SERVICIO_ALFOMBRAS_DATA = {
  url: '/limpieza-alfombras-vigo',
  canonical: 'https://www.tintoreriamimos.es/limpieza-alfombras-vigo',
  seoTitle: 'Limpieza de Alfombras en Vigo con Recogida a Domicilio | Tintorería Mimos',
  metaDescription:
    'Servicio profesional de limpieza e higienización de alfombras en Vigo con recogida y entrega a domicilio o en nuestras 3 tiendas propias. Pide presupuesto con Mimo.',
  h1: 'Limpieza de alfombras en Vigo con recogida y entrega a domicilio',
  subtituloCabecera:
    'Recogemos tu alfombra en tu domicilio o en nuestras tiendas propias de Vigo para limpiarla e higienizarla en nuestras instalaciones, devolviéndotela seca, cuidada y lista para colocar.',
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
  reparacionYRestauracion: {
    titulo: '¿Tu alfombra tiene flecos sueltos, bordes deshilachados o el festón abierto?',
    subtitulo: 'Página especializada · Solo reparación o limpieza + arreglo',
    descripcion:
      'Además de la limpieza en nuestras instalaciones, disponemos de un servicio específico de reparación y restauración de alfombras en Vigo mediante restaurador especialista colaborador. Puedes contratarlo de forma independiente (solo reparación) o combinado con la limpieza.',
    href: '/reparacion-alfombras-vigo',
    trabajos: [
      'Reposición, ajuste e igualado de flecos desgastados o sueltos',
      'Remate y refuerzo de festón lateral, ribetes y esquinas abiertas',
      'Contratación flexible: solo reparación o limpieza + arreglo juntos',
      'Valoración técnica previa por foto directamente por el restaurador',
    ],
    comoSolicitarlo:
      'Consulta la sección dedicada de reparación de alfombras para ver ejemplos de daños frecuentes, fotos recomendadas y valoración directa con el restaurador.',
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
      respuesta: `Puedes pulsar cualquiera de los botones de esta página para abrir el chat de WhatsApp con Mimo (${CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado}), llamarnos al ${CANALES_CONTACTO_CENTRAL.telefonoPrincipalMostrado} o acercarte a nuestras tiendas propias en Vigo.`,
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
      pregunta: '10. ¿Hacéis también reparación de flecos, bordes o restauración de alfombras?',
      respuesta: `Sí. Gestionamos reparaciones de alfombras mediante un restaurador especialista colaborador, tanto de forma independiente (solo reparación) como combinada con la limpieza. Tienes toda la información específica en nuestra página de reparación de alfombras (/reparacion-alfombras-vigo) o enviando fotos por WhatsApp al ${CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado}.`,
    },
  ],
  enlacesRelacionados: [
    {
      titulo: 'Reparación y restauración de alfombras',
      href: '/reparacion-alfombras-vigo',
      descripcion:
        'Flecos, festón lateral y bordes mediante restaurador especialista colaborador. Solo reparación o con limpieza.',
    },
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
      titulo: 'Limpieza de sofás a domicilio',
      href: '/limpieza-sofas-vigo',
      descripcion: 'Limpieza por inyección-extracción en vivienda para sofás, sillones y sillas tapizadas en Vigo.',
    },
  ],
};

// SECCIÓN 7 DEL PLAN MAESTRO: Servicio destacado de costura y arreglos de ropa (/arreglos-de-ropa-vigo)
export const SERVICIO_ARREGLOS_DATA = {
  url: '/arreglos-de-ropa-vigo',
  canonical: 'https://www.tintoreriamimos.es/arreglos-de-ropa-vigo',
  seoTitle: 'Arreglos de Ropa en Vigo: Costura, Piel, Bordados y Confección | Mimos',
  metaDescription:
    'Taller propio de costura y arreglos en Vigo: bajos, cremalleras, botones, ajustes, piel, bordados, servicio express y confección de cortinas, estores y cojines.',
  h1: 'Arreglos de ropa en Vigo: costura y composturas profesionales',
  subtituloCabecera:
    'Taller propio de costura y composturas in situ en Gregorio Espino y Venezuela, recepción de prendas en Navia y red de puntos colaboradores con costura. Desde arreglos habituales y prendas de piel hasta bordados y confección de cortinas, estores y cojines.',
  trabajosConfirmados: [
    {
      id: 'bajos-bastillas',
      categoria: 'Composturas habituales',
      disponibilidad: 'Tiendas propias y puntos con costura',
      titulo: 'Bajos y bastillas',
      descripcion:
        'Subir o bajar el largo de pantalones de vestir o vaqueros, faldas, vestidos de calle o ceremonia, mangas y abrigos respetando la caída original.',
      prendasHabituales: 'Pantalones, faldas, vestidos, camisas y abrigos',
    },
    {
      id: 'arreglos-pantalones-faldas-vestidos-abrigos',
      categoria: 'Composturas habituales',
      disponibilidad: 'Tiendas propias y puntos con costura',
      titulo: 'Arreglos de pantalones, faldas, vestidos y abrigos',
      descripcion:
        'Composturas integrales adaptadas a la estructura de cada prenda: pinzas, hombros, forros interiores, bocamangas, aberturas y bajos en prendas de diario y abrigo.',
      prendasHabituales: 'Pantalones, faldas, vestidos, chaquetas y abrigos',
    },
    {
      id: 'cremalleras-cambio-reparacion',
      categoria: 'Composturas habituales',
      disponibilidad: 'Tiendas propias y puntos con costura',
      titulo: 'Cambio y reparación de cremalleras',
      descripcion:
        'Sustitución completa de cremalleras rotas (visibles, invisibles o metálicas) y reparación o ajuste de cursores y topes sin cambiar toda la pieza cuando es viable.',
      prendasHabituales: 'Pantalones, faldas, vestidos, cazadoras y abrigos',
    },
    {
      id: 'botones-ojales-cierres',
      categoria: 'Composturas habituales',
      disponibilidad: 'Tiendas propias y puntos con costura',
      titulo: 'Cambio y reparación de botones y cierres',
      descripcion:
        'Reposición y cosido reforzado de botones en camisas, trajes y abrigos, así como reparación de ojales, corchetes y cierres de cintura.',
      prendasHabituales: 'Camisas, pantalones, faldas, chaquetas y abrigos',
    },
    {
      id: 'estrechar-ensanchar-cintura',
      categoria: 'Composturas habituales',
      disponibilidad: 'Tiendas propias y puntos con costura',
      titulo: 'Estrechar, ensanchar y ajustes de cintura',
      descripcion:
        'Entallado o ampliación según márgenes de costura y ajustes precisos de cintura y tiro para que la prenda siente sin bolsas ni tiranteces.',
      prendasHabituales: 'Pantalones, faldas, vestidos, camisas y americanas',
    },
    {
      id: 'zurcidos-descosidos-rotos',
      categoria: 'Composturas habituales',
      disponibilidad: 'Tiendas propias y puntos con costura',
      titulo: 'Zurcidos, reparación de descosidos y rotos',
      descripcion:
        'Reparación limpia de costuras abiertas, bajos sueltos, bolsillos o forros descosidos, zurcidos finos y enganchones en tus prendas habituales.',
      prendasHabituales: 'Pantalones, faldas, vestidos, camisas, chaquetas y abrigos',
    },
  ],
  especialidadesTallerPropio: [
    {
      id: 'arreglos-delicadas',
      disponibilidad: 'Tiendas propias en Vigo (taller propio)',
      titulo: 'Arreglos de prendas delicadas',
      descripcion:
        'Ajustes de precisión en vestidos de fiesta, ceremonia, gasas, sedas, encajes y tejidos finos con revisión previa del tejido y el forro.',
    },
    {
      id: 'arreglos-piel',
      disponibilidad: 'Taller propio Gregorio Espino (recepción en Navia)',
      titulo: 'Arreglos de prendas de piel',
      descripcion:
        'Composturas especializadas con maquinaria adecuada para cazadoras, chaquetas, faldas y abrigos de cuero liso, napa o ante.',
    },
    {
      id: 'bordados-personalizados',
      disponibilidad: 'Taller propio Gregorio Espino (bajo consulta)',
      titulo: 'Bordados personalizados',
      descripcion:
        'Marcaje y bordado personalizado en prendas textiles, ropa laboral, toallas o textiles de hogar según diseño y tamaño solicitado.',
    },
    {
      id: 'servicio-express',
      disponibilidad: 'Taller propio Gregorio Espino (siempre bajo consulta previa)',
      titulo: 'Servicio de arreglos exprés (bajo consulta)',
      descripcion:
        'Atención prioritaria para bajos y composturas sencillas cuando la complejidad de la prenda y la disponibilidad del taller lo permiten; es necesario preguntar siempre primero en tienda.',
    },
  ],
  confeccionHogar: [
    {
      id: 'confeccion-cortinas',
      titulo: 'Confección de cortinas',
      descripcion:
        'Confección y ajuste de cortinas a medida según altura de techo, tipo de frunce, ollados o riel.',
    },
    {
      id: 'confeccion-estores',
      titulo: 'Confección de estores',
      descripcion:
        'Confección de estores textiles a medida (paqueto o varillas) adaptados a las medidas de tus ventanas.',
    },
    {
      id: 'confeccion-cojines',
      titulo: 'Confección de cojines',
      descripcion:
        'Fundas de cojines a medida con cremallera oculta, vivos o remates para salón, dormitorio o terraza.',
    },
  ],
  catalogoCompleto18Puntos: [
    'Bajos y bastillas',
    'Arreglos de pantalones',
    'Arreglos de faldas y vestidos',
    'Arreglos de abrigos',
    'Cambio de cremalleras',
    'Reparación de cremalleras',
    'Cambio y reparación de botones',
    'Estrechar y ensanchar prendas',
    'Ajustes de cintura',
    'Zurcidos',
    'Reparación de descosidos y rotos',
    'Arreglos de prendas delicadas',
    'Arreglos de prendas de piel',
    'Bordados personalizados',
    'Confección de cortinas',
    'Confección de estores',
    'Confección de cojines',
    'Servicio de arreglos express',
  ],
  prendasConfirmadas: [
    'Pantalones (de vestir, pinzas, chinos y vaqueros)',
    'Faldas de diario, oficina y ceremonia',
    'Vestidos de calle, fiesta, invitada y prendas delicadas',
    'Camisas, blusas y ropa laboral para bordado',
    'Chaquetas, americanas, blazers y prendas de piel',
    'Abrigos, gabardinas, cortinas, estores y cojines',
  ],
  comoPedirloPasos: [
    {
      num: '01',
      titulo: 'Consúltanos por WhatsApp o acude a tu punto de costura',
      descripcion:
        'Para composturas habituales puedes acudir a cualquiera de nuestras 3 tiendas propias en Vigo o a los puntos colaboradores con costura. Para prendas de piel, bordados, confección de hogar (cortinas, estores y cojines) o servicio exprés (siempre preguntando antes en taller según carga de trabajo), te atendemos desde nuestro taller propio de Gregorio Espino (o recepción previa en Navia).',
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
      titulo: 'Tipo de arreglo o confección',
      detalle:
        'No lleva el mismo trabajo coser un botón o reparar un descosido que sustituir la cremallera completa de un abrigo, trabajar sobre piel o confeccionar estores y cortinas a medida.',
    },
    {
      titulo: 'Naturaleza y delicadeza del tejido',
      detalle:
        'Los tejidos finos, vestidos de ceremonia, prendas de cuero o paños gruesos de abrigo requieren aguja, hilo y precisión específicos.',
    },
    {
      titulo: 'Complejidad estructural de la prenda',
      detalle:
        'La presencia de forros interiores, aberturas traseras, vivos, pliegues, bordados o dobles costuras influye tanto en el trabajo de costura como en el tiempo necesario.',
    },
    {
      titulo: 'Disponibilidad y modalidad de entrega',
      detalle:
        'El plazo se confirma al recibir y revisar la prenda en la tienda propia o en el taller colaborador correspondiente. El servicio express se valora in situ en Gregorio Espino según carga de trabajo.',
    },
  ],
  preguntasFrecuentes: [
    {
      pregunta: '1. ¿Qué tipos de arreglo de bajos, pantalones, faldas, vestidos y abrigos realizáis?',
      respuesta:
        'Realizamos bajos y bastillas, arreglos de pantalones (de vestir, pinzas o vaqueros), arreglos de faldas y vestidos de calle o ceremonia, y composturas en chaquetas y abrigos, cuidando que el hilo y la caída respeten el diseño original.',
    },
    {
      pregunta: '2. ¿Cambiáis y reparáis cremalleras y botones?',
      respuesta:
        'Sí. Realizamos tanto cambio completo de cremalleras como reparación de cursores o topes cuando no hace falta sustituir toda la cremallera, además de cambio y reparación de botones, ojales y cierres en todo tipo de prendas.',
    },
    {
      pregunta: '3. ¿Hacéis arreglos en prendas delicadas o vestidos de fiesta y ceremonia?',
      respuesta:
        'Sí, realizamos ajustes de largo, cintura, entallado y cierres en prendas delicadas, vestidos de fiesta e invitada. Es imprescindible revisar la prenda previamente para confirmar el acabado más adecuado y, si lo necesitas, combinarlo con tintorería y planchado profesional.',
    },
    {
      pregunta: '4. ¿Realizáis arreglos en prendas de piel, bordados personalizados y confección de cortinas, estores o cojines?',
      respuesta:
        'Sí. En nuestro taller propio de Mimos Gregorio Espino (Alcalde Gregorio Espino, 42, Vigo) disponemos de maquinaria especializada para arreglos en prendas de piel, bordados personalizados y confección a medida de cortinas, estores y cojines (también puedes consultarnos o gestionar la recepción previa desde Navia). Los puntos colaboradores independientes se centran en composturas habituales de ropa de vestir.',
    },
    {
      pregunta: '5. ¿Tenéis servicio de arreglos exprés en el día?',
      respuesta:
        'Para bajos y composturas sencillas podemos valorar un plazo exprés en nuestra tienda propia de Gregorio Espino (Vigo), pero siempre hay que preguntar primero en el taller si es posible hacerlo según la carga de trabajo y la prenda en ese momento.',
    },
    {
      pregunta: '6. ¿Cómo puedo saber el presupuesto de un arreglo o confección?',
      respuesta: `No publicamos tarifas estándar cerradas porque cada trabajo depende de la prenda, el tejido y la complejidad (forros, piel, bordado o medidas de confección). Puedes orientarte escribiendo a Mimo por WhatsApp en el ${CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado} y el presupuesto definitivo se confirma al revisar la prenda.`,
    },
    {
      pregunta: '7. ¿En qué tiendas propias y puntos colaboradores puedo entregar mi ropa para arreglar?',
      respuesta: `Puedes acudir a nuestras tiendas propias de Gregorio Espino (Alcalde Gregorio Espino, 42 — taller completo con especialidades de piel, bordados, confección hogar y express) o Venezuela (Rúa de Venezuela, 29, Entreplanta — taller propio in situ); a nuestra sede de Navia (C/ Teixugueiras, 11, bajo 9 — recepción y entrega para taller); y para composturas habituales de vestir, a los puntos colaboradores con costura en ${PUNTOS_CON_COSTURA.filter(
        (p) => p.tipo === 'punto'
      )
        .map((p) => `${p.localidad} (${p.nombre_comercio}, ${p.direccion})`)
        .join(', ')}.`,
    },
  ],
  enlacesRelacionados: [
    {
      titulo: 'Vestidos de novia, fiesta y ceremonia',
      href: '/limpieza-vestidos-novia-ceremonia-vigo',
      descripcion:
        'Limpieza y repaso de bajos, pedrería, encajes y costura integrada para vestidos de novia, madrina, comunión, bautizo y chaqués.',
    },
    {
      titulo: 'Tintorería profesional en Vigo',
      href: '/tintoreria-vigo',
      descripcion:
        'Combina el arreglo de tu traje o abrigo con nuestra limpieza en seco y desmanchado profesional.',
    },
    {
      titulo: 'Localizador de tiendas y puntos Mimos',
      href: '/puntos-mimos',
      descripcion:
        'Consulta todos los horarios, direcciones y teléfonos de nuestras tiendas propias en Vigo y puntos colaboradores.',
    },
  ],
};

// Página especializada de limpieza de pieles, cuero, ante, nobuk y peletería (/limpieza-pieles-cuero-vigo)
export const SERVICIO_PIELES_DATA = {
  url: '/limpieza-pieles-cuero-vigo',
  canonical: 'https://www.tintoreriamimos.es/limpieza-pieles-cuero-vigo',
  seoTitle: 'Limpieza de Pieles, Cuero, Ante y Nobuk en Vigo | Tintorería Mimos',
  metaDescription:
    'Limpieza especializada de cazadoras de cuero, ante, nobuk, doble faz y peletería en Vigo. Nutrición, acabado y valoración previa por foto con Mimo o en nuestras 3 tiendas propias.',
  h1: 'Limpieza especializada de pieles, cuero, ante y nobuk en Vigo',
  subtituloCabecera:
    'Tratamiento específico para cuero liso, napa, ante, nobuk, doble faz, peletería y prendas mixtas. Valoración individualizada de cada pieza para conservar su flexibilidad, tacto y tonalidad sin acartonar la piel.',
  aclaracionServicio:
    'Cada piel responde de forma distinta según su curtido, acabado y estado previo. Por eso no aplicamos tarifas estándar cerradas ni plazos exprés sin revisar antes la prenda en tienda o mediante fotos por WhatsApp con Mimo.',
  tiposPieles: [
    {
      id: 'napa-liso',
      grupo: 'Pieles lisas · Lado flor',
      titulo: 'Napa y cuero liso',
      descripcion:
        'Piel depilada del lado exterior del animal, flexible y compacta. Puede ser pigmentada (protegida con acabado superficial), anilina/semi-anilina (más natural y sensible a rozaduras) o engrasada. Conserva mejor la estructura ante el uso diario.',
    },
    {
      id: 'ante',
      grupo: 'Pieles afelpadas · Lado carne',
      titulo: 'Ante (gamuza)',
      descripcion:
        'Se obtiene lijando la cara interior de la piel. Presenta fibra más larga, tacto suave homogéneo y sin poro superficial, por lo que absorbe agua y manchas con mayor rapidez que el cuero liso.',
    },
    {
      id: 'nobuk',
      grupo: 'Pieles esmeriladas · Lado flor',
      titulo: 'Nobuk',
      descripcion:
        'Parte de la cara exterior sometida a un pulido muy fino que aporta textura aterciopelada (tacto melocotón) con pelo corto y apretado. Es más resistente que el ante, pero exige cepillado y reengrase controlados.',
    },
    {
      id: 'serraje-pecari',
      grupo: 'Curtidos porosos',
      titulo: 'Serraje y pecarí',
      descripcion:
        'El serraje procede de capas internas divididas de piel gruesa con acabado más rústico; el pecarí destaca por sus microporos característicos donde las manchas penetran en profundidad y requieren inspección previa.',
    },
    {
      id: 'doble-faz',
      grupo: 'Pieles con lana o acabado técnico',
      titulo: 'Doble faz y napalán',
      descripcion:
        'Prendas habitualmente de ovino con la lana hacia el interior y el ante al exterior (doble faz) o con tratamiento superficial liso tipo napa (napalán). Se limpian manteniendo el equilibrio entre el pelo interno y la piel exterior.',
    },
    {
      id: 'mixtas-peleteria',
      grupo: 'Combinados y pelo natural',
      titulo: 'Prendas mixtas y peletería',
      descripcion:
        'Cazadoras y abrigos de paño o tejido técnico con mangas, cuellos o vivos de piel, así como abrigos o apliques de peletería natural que se revisan pieza a pieza antes de definir el tratamiento adecuado.',
    },
  ],
  comparativaSinteticos: [
    {
      material: 'Polipiel y Skay',
      identificacion: 'Recubrimiento sintético sobre base textil, aspecto uniforme sin poros ni grano natural.',
      comportamiento: 'Limpieza suave superficial o según indicaciones estrictas de la etiqueta interior.',
      riesgo: 'El paso del tiempo, la humedad acumulada y los disolventes pueden cuartear o despegar la capa plástica.',
    },
    {
      material: 'Cuero reconstituido',
      identificacion: 'Aglomerado de fibras con recubrimiento superior; suele diferenciarse en el etiquetado.',
      comportamiento: 'Admisión condicionada a revisión previa del estado de la superficie y etiqueta.',
      riesgo: 'Muy sensible al frotado y a la insolación previa: puede pelarse o descamarse durante el proceso.',
    },
    {
      material: 'Charol y charol arrugado',
      identificacion: 'Cuero cubierto con película barnizada de alto brillo.',
      comportamiento: 'Tratamiento controlado sin disolventes agresivos ni cepillado áspero.',
      riesgo: 'Extrema sensibilidad a rayaduras finas y a transferencias irreversibles de tintes en tonos claros.',
    },
  ],
  fasesProceso: [
    {
      num: '01',
      titulo: 'Inspección y clasificación',
      descripcion:
        'Revisamos elasticidad, costuras, zonas rozadas, pegamentos internos, etiqueta y solidez del tinte, separando piezas por tonos y tipo de curtido.',
    },
    {
      num: '02',
      titulo: 'Limpieza controlada',
      descripcion:
        'Aplicamos el método más seguro para cada piel —limpieza técnica controlada, trabajo manual específico o sistema acuoso adaptado— evitando choques térmicos o mecánicos.',
    },
    {
      num: '03',
      titulo: 'Nutrición y reengrase',
      descripcion:
        'Todo proceso de limpieza retira parte de los aceites naturales del cuero. Reponemos aceites y emulsiones específicas para devolver flexibilidad, suavidad y levantar el pelo del ante o nobuk.',
    },
    {
      num: '04',
      titulo: 'Igualado y ajuste de color',
      descripcion:
        'Tras valorar la prenda, trabajamos el reavivado de zonas desgastadas o el ajuste uniforme del tono. En cambios de color sobre piel natural siempre se orienta hacia un tono más oscuro.',
    },
    {
      num: '05',
      titulo: 'Hidrofugación y acabado sin vapor',
      descripcion:
        'Aplicamos protección hidrófuga transpirable cuando la piel lo requiere (ante, nobuk, serraje o doble faz) y realizamos el planchado específico de la piel sin vapor y del forro interior.',
    },
  ],
  riesgosInherentes: [
    {
      titulo: 'Defectos camuflados de origen',
      detalle:
        'Cicatrices, picaduras o diferencias entre retales disimuladas en fábrica con masillas o tintes superficiales pueden hacerse visibles al retirar la suciedad.',
    },
    {
      titulo: 'Tintes y adhesivos inestables',
      detalle:
        'En muchas prendas de cuero la etiqueta de mantenimiento es orientativa o no se ensaya la solidez del tinte ni de los pegamentos de cuellos, puños o cremalleras.',
    },
    {
      titulo: 'Relajación de fibras y mal guardado previo',
      detalle:
        'Pieles sobrestiradas durante su confección o guardadas en ambientes muy cálidos o húmedos pierden aceites y pueden acusar rigidez o ligera contracción al limpiarse.',
    },
    {
      titulo: 'Manchas profundas de tinta o proteínas',
      detalle:
        'Tinta, sangre, leche, huevo o grasa antigua en pieles muy porosas (como serraje o pecarí) se fijan en profundidad; actuamos hasta donde es seguro sin quemar el color.',
    },
  ],
  garantiasResguardo: [
    'Revisión de la prenda en mostrador y confirmación de presupuesto y plazo estimado antes de intervenir.',
    'Emisión de resguardo de depósito conforme a la normativa española vigente (Real Decreto 1453/1987), con detalle del servicio y observaciones del estado previo.',
    'Aviso claro y conformidad escrita en el resguardo siempre que existan desgastes, materiales sintéticos envejecidos o riesgos previos de deterioro.',
    'Ninguna tintorería profesional puede prometer que una prenda usada quede «como nueva», pero sí aplicar el protocolo más seguro para recuperar al máximo su aspecto y flexibilidad.',
  ],
  consejosCasa: [
    'Si se moja con lluvia, sacude suavemente la prenda, retira la humedad superficial con un paño limpio sin frotar y déjala secar al aire en un lugar ventilado.',
    'Utiliza siempre perchas anchas (de madera o acolchadas) para respetar los hombros y guárdala en fundas de algodón o tejido transpirable.',
    'Ante una mancha fresca de aceite o grasa, posa un paño suave sin frotar y espolvorea polvos de talco durante unas horas antes de cepillar con extrema suavidad o traerla.',
    'En pieles lisas o con pelo natural, airea la prenda de forma periódica y evita rociar perfumes, colonias o laca directamente sobre ella.',
  ],
  mitosEvitar: [
    {
      practica: 'Crema Nivea, vaselina o grasa de caballo',
      motivo:
        'Contienen ceras y parafinas no formuladas para curtidos: no se absorben bien, atrapan polvo y generan cercos grasos o manchas blanquecinas.',
    },
    {
      practica: 'Secadores, radiadores, plancha o sol directo',
      motivo:
        'El calor directo reseca de golpe las fibras del cuero, provoca acartonamiento, encogimiento irreversible y oxida los tintes.',
    },
    {
      practica: 'Bolsas de plástico y bolas de naftalina',
      motivo:
        'El plástico impide transpirar y favorece moho y manchas oscuras; la naftalina reseca la piel e impregna un olor muy difícil de eliminar.',
    },
    {
      practica: 'Lavadora, sumergir en agua, toallitas o acetona',
      motivo:
        'El agua sin control ni reengrase acartona el curtido, y productos como acetona, alcohol o limpiadores domésticos queman el acabado y el color.',
    },
  ],
  preguntasFrecuentes: [
    {
      pregunta: '1. ¿Por qué limpiar una cazadora de piel cuesta más y tarda más que un abrigo textil?',
      respuesta:
        'Porque la piel es un material natural vivo que no admite ciclos textiles convencionales. Exige inspección previa, limpieza controlada en cargas reducidas o trabajo manual, secado natural sin calor, reposición de aceites (reengrase), igualado de tono cuando es necesario, hidrofugación y planchado sin vapor.',
    },
    {
      pregunta: '2. ¿Podéis asegurar que una prenda de ante o cuero quede exactamente como nueva?',
      respuesta:
        'Trabajamos para lograr el mejor resultado posible manteniendo la suavidad, flexibilidad y tonalidad de la piel, pero con total transparencia: existen factores previos ajenos al lavado (manchas antiguas fijadas, rozaduras profundas, pegamentos solubles o defectos disimulados en confección) que condicionan el acabado final.',
    },
    {
      pregunta: '3. ¿Qué diferencia hay entre cuero liso (napa), ante y nobuk?',
      respuesta:
        'La napa conserva la cara exterior lisa del animal y soporta mejor el roce y la protección superficial. El nobuk pule esa cara exterior logrando un tacto fino aterciopelado de pelo muy corto. El ante se lija por la cara interior, tiene fibra más larga y absorbe agua y manchas con mucha más facilidad.',
    },
    {
      pregunta: '4. ¿Limpiáis prendas de polipiel, skay o charol?',
      respuesta:
        'Las valoramos previamente en tienda o mediante foto con Mimo revisando la etiqueta y el estado del recubrimiento. Al ser laminados sintéticos o barnizados, si el material presenta envejecimiento o grietas puede existir riesgo de pelado o descamación, algo que siempre te advertimos antes en el resguardo.',
    },
    {
      pregunta: '5. ¿Cuánto tarda el servicio y cómo sé el presupuesto?',
      respuesta: `No publicamos tarifas estándar cerradas ni prometemos entregas exprés sin ver la prenda. Puedes enviar fotos por WhatsApp a Mimo (${CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado}) para recibir una orientación inicial, y al entregar la pieza en tienda o tras revisarla confirmamos presupuesto cerrado y fecha estimada en el resguardo.`,
    },
    {
      pregunta: '6. ¿Dónde entrego mi prenda de piel o cómo pido recogida a domicilio?',
      respuesta: `Puedes traerla a cualquiera de nuestras ${TIENDAS_PROPIAS.length} tiendas propias en Vigo (Navia, Gregorio Espino y Venezuela), depositarla en nuestra red de puntos colaboradores en la comarca o solicitar recogida y entrega a domicilio consultando el importe mínimo de servicio y las condiciones con Mimo.`,
    },
    {
      pregunta: '7. ¿Salen las manchas de grasa, tinta, agua o crema aplicada en casa?',
      respuesta:
        'Cada mancha se analiza caso por caso según el tipo de piel. Las manchas recientes tratadas solo con un paño suave sin frotar tienen mejor pronóstico; en cambio, las tintas antiguas, proteínas (sangre, leche) o cercos causados por cremas caseras (Nivea, vaselina, betún) se fijan con fuerza y evaluamos hasta dónde es seguro actuar sin dañar el tinte.',
    },
  ],
  enlacesRelacionados: [
    {
      titulo: 'Tintorería profesional en Vigo',
      href: '/tintoreria-vigo',
      descripcion:
        'Limpieza en seco y cuidado específico para trajes, abrigos de paño, vestidos de ceremonia y prendas delicadas.',
    },
    {
      titulo: 'Arreglos de ropa y costura',
      href: '/arreglos-de-ropa-vigo',
      descripcion:
        'Taller propio de costura en Gregorio Espino y Venezuela, recepción en Navia y puntos colaboradores con costura.',
    },
    {
      titulo: 'Recogida y entrega a domicilio',
      href: '/recogida-a-domicilio',
      descripcion:
        'Solicita que pasemos a recoger y entregar tus prendas en Vigo y comarca (servicio sujeto a importe mínimo a consultar con Mimo).',
    },
  ],
};

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
      'Tintorería profesional de prendas',
      'Limpieza de trajes, americanas y prendas de vestir',
      'Limpieza de vestidos de fiesta y ceremonia (bautizo, comunión y novia)',
      'Limpieza de prendas delicadas (seda, lana, lino, pedrería o encaje)',
    ],
    enlaces: [
      { label: 'Tintorería profesional', href: '/tintoreria-vigo' },
      { label: 'Novia y ceremonia', href: '/limpieza-vestidos-novia-ceremonia-vigo' },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el precio para limpiar un traje, vestido de ceremonia o prenda delicada.'
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
      'Lavandería acuosa profesional para ropa de diario y prendas lavables',
    ],
    enlaces: [
      { label: 'Colada familiar', href: '/colada-familiar-vigo' },
      { label: 'Planchado', href: '/planchado-vigo' },
      { label: 'Lavandería', href: '/lavanderia-vigo' },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar tarifas para colada familiar, lavandería o solo planchado.'
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
      'Limpieza e higienización profunda de alfombras en nuestras instalaciones',
      'Reparación y restauración de alfombras: flecos, ribetes y bordes',
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
    titulo: 'Wet Cleaning, en seco, pieles, uniformidad y siniestros',
    subtitulo: 'Procesos técnicos avanzados para materiales críticos y recuperación',
    servicios: [
      'Wet Cleaning (limpieza ecológica controlada en medio acuoso)',
      'Limpieza en seco profesional',
      'Limpieza y restauración de pieles, cuero, ante y nobuk',
      'Lavandería de uniformidad laboral (suciedad normal), toallas de clínicas y peluquerías',
      'Limpieza y recuperación de textiles afectados por incendios o humo',
    ],
    enlaces: [
      { label: 'Incendios y siniestros', href: '/limpieza-incendios-siniestros-vigo' },
      { label: 'Pieles y cuero', href: '/limpieza-pieles-cuero-vigo' },
      { label: 'Lavandería para empresas', href: '/servicios-empresas' },
    ],
    whatsappUrl: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar un tratamiento especial (Wet Cleaning, en seco, piel/ante, uniformidad o recuperación tras incendio).'
    ),
  },
];

export const RESUMEN_FAMILIAS_EXTENDIDAS_PORTADA = {
  limpiezaProfesional: {
    badge: 'FAMILIA 03 · LIMPIEZA PROFESIONAL',
    titulo: 'Limpieza profesional para particulares y empresas',
    descripcion:
      'Equipo propio para mantenimiento periódico o puntual en espacios de trabajo, edificios y hogares, además de tapicerías a domicilio y limpieza textil técnica.',
    puntos: [
      'Oficinas, locales comerciales y espacios empresariales',
      'Comunidades de vecinos, viviendas y mantenimiento periódico',
      'Apartamentos y alojamientos turísticos',
      'Limpieza de tapicerías a domicilio (sofás, sillones y colchones)',
      'Lavandería para empresas (toallas, uniformidad y vestuario laboral) y recuperación tras incendios',
    ],
    enlaces: [
      { label: 'Ver limpieza profesional', href: '/limpieza-profesional-vigo' },
      { label: 'Ver lavandería para empresas', href: '/servicios-empresas' },
    ],
    whatsappUrl: CONTACT_INFO.whatsappCleaningHref,
  },
  alojamientosTuristicos: {
    badge: 'FAMILIA 04 · ALOJAMIENTOS TURÍSTICOS',
    titulo: 'Gestión de limpieza y lavandería para alojamientos turísticos',
    descripcion:
      'Nos adaptamos a propietarios y gestores de viviendas vacacionales en Vigo para dejar cada apartamento preparado tras el check-out con rotación controlada de sábanas y toallas.',
    puntos: [
      'Limpieza tras el check-out: cocina, baños, dormitorios y zonas comunes',
      'Lavandería y planchado de ropa de cama y baño + preparación para huéspedes',
      'Coordinación de entradas y salidas, planificación de turnos y rutas',
      'Control de rotación de ropa, revisión visual y comunicación de incidencias',
    ],
    enlaces: [
      { label: 'Ver gestión de alojamientos', href: '/limpieza-apartamentos-turisticos-vigo' },
    ],
    whatsappUrl: CONTACT_INFO.whatsappApartamentosHref,
  },
};

export interface ServicioNoviaCeremoniaData {
  url: string;
  canonical: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  subtituloCabecera: string;
  aclaracionServicio: string;
  momentosUso: {
    id: string;
    titulo: string;
    subtitulo: string;
    casos: string[];
    enfoque: string;
  }[];
  prendasTratadas: {
    id: string;
    titulo: string;
    tejidos: string;
    descripcion: string;
    atencionEspecial: string;
  }[];
  flujosCostura: {
    titulo: string;
    cuando: string;
    detalle: string;
  }[];
  fasesProtocolo: {
    num: string;
    titulo: string;
    descripcion: string;
  }[];
  factoresClimaVigo: {
    dato: string;
    impacto: string;
    recomendacion: string;
  }[];
  criteriosPresupuesto: {
    titulo: string;
    detalle: string;
  }[];
  erroresEvitar: {
    titulo: string;
    motivo: string;
  }[];
  consejosConservacion: string[];
  preguntasFrecuentes: {
    pregunta: string;
    respuesta: string;
  }[];
  enlacesRelacionados: {
    titulo: string;
    href: string;
    descripcion: string;
  }[];
}

export const SERVICIO_NOVIA_CEREMONIA_DATA: ServicioNoviaCeremoniaData = {
  url: '/limpieza-vestidos-novia-ceremonia-vigo',
  canonical: 'https://www.tintoreriamimos.es/limpieza-vestidos-novia-ceremonia-vigo',
  seoTitle: 'Limpieza de Vestidos de Novia, Fiesta, Comunión y Bautizo en Vigo | Mimos',
  metaDescription:
    'Puesta a punto antes del evento y limpieza artesanal de vestidos de novia, madrina, fiesta, comunión, faldones de bautizo y chaqués en Vigo. Taller propio de costura y entrega protegida.',
  h1: 'Limpieza, costura y cuidado artesanal de vestidos de novia, fiesta, comunión y bautizo en Vigo',
  subtituloCabecera:
    'Dejamos tu prenda impecable antes del evento o recuperamos bajos, encajes y tejidos delicados tras la celebración. Todo el proceso se realiza en nuestras instalaciones en Vigo, sin envíos externos.',
  aclaracionServicio:
    'Revisamos la prenda contigo antes de empezar y entregamos un resguardo detallado con presupuesto acordado. No publicamos tarifas cerradas ni plazos exprés a ciegas porque cada vestido varía por capas, pedrería y bajos; si insistir en una mancha antigua pudiera dañar la fibra, te avisamos con franqueza.',
  momentosUso: [
    {
      id: 'pre-evento',
      titulo: 'Antes del evento: puesta a punto y planchado al vapor',
      subtitulo: 'Preparación previa a la boda, comunión, bautizo o sesión de fotos',
      casos: [
        'Higienizar y vaporizar vestidos comprados online, de muestrario o outlet',
        'Quitar arrugas de viaje o maleta en vestidos de fiesta, madrina y chaqués',
        'Devolver luminosidad a un faldón de bautizo familiar con tono amarillo de armario',
        'Recuperar el cuerpo y la caída de trajes y vestidos de comunión en lino o batista',
      ],
      enfoque: 'Revisión de costuras, vaporizado capa a capa y planchado sin brillos ni marcas.',
    },
    {
      id: 'post-evento',
      titulo: 'Después del evento: recuperación de bajos y conservación',
      subtitulo: 'Para guardar en armario en Vigo, ceder entre hermanos o dar segunda vida',
      casos: [
        'Desmanchado localizado de bajos oscurecidos por asfalto, tierra o césped',
        'Eliminación de champán, vino blanco o sudor antes de que amarilleen en el armario',
        'Repaso de costuras, botones, presillas de cola o enganches en taller propio',
        'Entrega colgada por cintas interiores en funda transpirable para proteger del polvo',
      ],
      enfoque: 'Pretratamiento manual y elección selectiva entre limpieza en seco suave o Wet Cleaning.',
    },
  ],
  prendasTratadas: [
    {
      id: 'novia',
      titulo: 'Vestidos de novia, velos, cancanes y colas',
      tejidos: 'Tul, crepé, mikado, raso, organza y encaje',
      descripcion:
        'Tratamos cada capa por separado según su fibra y caída. Trabajamos a mano los bajos con grasa urbana, barro seco o hierba sin arrastrar cerco hacia la falda.',
      atencionEspecial:
        'Comprobación previa de ballenas, botones forrados, tules finos y sujeción interna de colas.',
    },
    {
      id: 'madrina-fiesta',
      titulo: 'Madrina, fiesta e invitada',
      tejidos: 'Seda natural, gasa, muselina, lentejuelas, pedrería y plisados',
      descripcion:
        'Cuidado específico para tejidos fluidos que dejan cerco con agua casera. Distinguimos siempre si la pedrería va cosida o pegada antes de elegir el baño.',
      atencionEspecial:
        'Prueba en zona oculta para comprobar solidez del tinte, plisados permanentes y brillo de abalorios.',
    },
    {
      id: 'comunion-bautizo',
      titulo: 'Primera Comunión y Bautizo (incl. faldones heredados)',
      tejidos: 'Lino, batista, algodón fino, vainicas, jaretas y puntillas',
      descripcion:
        'Baño suave sin lejía ni centrifugados que encogen el lino o abren los entredoses. Planchado manual paciente para definir jaretas, recuperar blanco natural y mantener el porte.',
      atencionEspecial:
        'Prueba previa de resistencia en fibras antiguas y puntillas de faldones heredados.',
    },
    {
      id: 'chaques-novio',
      titulo: 'Chaqués, levitas, trajes de novio, padrino y pajes',
      tejidos: 'Lana fría, chalecos de vestir, camisas finas y pajes',
      descripcion:
        'Limpieza equilibrada que conserva la estructura interior de solapas y hombreras, eliminando rozaduras en cuellos, puños y manchas de banquete.',
      atencionEspecial:
        'Acabado en prensa de vapor y plancha manual para evitar brillos en paños oscuros.',
    },
  ],
  flujosCostura: [
    {
      titulo: 'Coser primero, limpiar después',
      cuando: 'Enganches en tul, encajes abiertos o botones sueltos tras el baile',
      detalle:
        'Si una rotura abierta puede ceder o soltar cuentas durante el baño de limpieza, nuestro taller propio en Gregorio Espino 42 o Venezuela 29 (Entreplanta) refuerza primero la estructura.',
    },
    {
      titulo: 'Limpiar primero, coser después',
      cuando: 'Bajos rozados con suciedad o ajustes de largo antes del evento',
      detalle:
        'Cuando el bajo arrastra barro o asfalto limpiamos primero para no coser sobre tela sucia; antes del evento, vaporizamos y ajustamos largos o presillas en el mismo circuito.',
    },
  ],
  fasesProtocolo: [
    {
      num: '01',
      titulo: 'Revisión compartida contigo y resguardo claro',
      descripcion:
        'Miramos juntos costuras, bajos, botones, pedrería floja y zonas manchadas para que todo quede reflejado en tu resguardo oficial antes de tocar la prenda.',
    },
    {
      num: '02',
      titulo: 'Prueba de fibra y comprobación de pedrería cosida o pegada',
      descripcion:
        'Comprobamos la firmeza del tinte y si los adornos están cosidos a hilo o fijados con adhesivo, evitando disolventes o temperaturas que puedan soltarlos.',
    },
    {
      num: '03',
      titulo: 'Desmanchado a mano y método selectivo (en seco suave o Wet Cleaning)',
      descripcion:
        'La limpieza en seco disuelve grasas, maquillaje y asfalto manteniendo intactas sedas y entretelas; el Wet Cleaning en agua controlada elimina sudor, sales y azúcares respetando linos y algodones.',
    },
    {
      num: '04',
      titulo: 'Secado al aire, planchado artesanal y repaso de costura',
      descripcion:
        'Secamos de forma natural sin secadora agresiva, vaporizamos capa por capa para devolver la caída original y coordinamos cualquier arreglo con nuestros talleres en Vigo.',
    },
    {
      num: '05',
      titulo: 'Entrega colgada en percha ancha con funda transpirable',
      descripcion:
        'Sujetamos el peso desde las cintas interiores de la cintura —nunca desde tirantes finos o encajes frágiles— y entregamos con funda transpirable para proteger del polvo en el armario.',
    },
  ],
  factoresClimaVigo: [
    {
      dato: '77 % de humedad media anual en Vigo',
      impacto:
        'Entre octubre y enero superamos el 80 % de humedad ambiental en Vigo (datos AEMET). Guardar un vestido dentro de una bolsa de plástico cerrada encierra esa humedad en el armario y acaba amarilleando el blanco o generando olor a cerrado.',
      recomendacion:
        'Si llueve el día que vienes a recogerlo, el plástico solo debe acompañarte en el trayecto: al llegar a casa, déjalo en funda transpirable.',
    },
    {
      dato: 'Manchas transparentes de champán y sudor',
      impacto:
        'Tras la boda o la comunión muchas salpicaduras se secan sin verse. Con el paso de los meses sus azúcares y sales se oxidan y dejan cercos ocres muy difíciles de sacar.',
      recomendacion:
        'No lo guardes «porque parece limpio»: revisarlo y limpiarlo poco después del evento mantiene el tono original.',
    },
    {
      dato: 'Cómo conservarlo en casa a largo plazo',
      impacto:
        'La luz solar directa, los radiadores y la tensión en tirantes finos apagan el brillo de blancos y marfiles y deforman la caída del cuerpo.',
      recomendacion:
        'Guárdalo en funda transpirable dentro de un armario seco y oscuro (o doblado con papel tisú neutro sin ácido si prefieres caja en casa).',
    },
  ],
  criteriosPresupuesto: [
    {
      titulo: 'Capas y volumen total',
      detalle: 'Número de faldas, colas, cancanes, velos o complementos incluidos.',
    },
    {
      titulo: 'Delicadeza del tejido',
      detalle: 'Comportamiento de seda natural, gasa, tul fino, crepé, mikado o lino artesanal.',
    },
    {
      titulo: 'Pedrería y ornamentación',
      detalle: 'Horas de protección manual sobre lentejuelas, encajes, jaretas y puntillas.',
    },
    {
      titulo: 'Bajos y manchas fijadas',
      detalle: 'Nivel de roce con asfalto o tierra, antigüedad de la mancha o posible repunte.',
    },
  ],
  erroresEvitar: [
    {
      titulo: 'No frotes seda, gasa ni bajos rozados con toallitas o agua en casa',
      motivo:
        'Extiende la suciedad y deja halos visibles al secar. Si el bajo tiene barro, déjalo secar por completo y no lo cepilles fuerte.',
    },
    {
      titulo: 'No guardes el vestido dentro de plástico cerrado',
      motivo:
        'Con la humedad de Vigo, la bolsa hermética retiene condensación y favorece manchas amarillas y humedad en el armario.',
    },
    {
      titulo: 'No apliques lejía ni quitamanchas fuertes en puntillas o pedrería',
      motivo:
        'Quema fibras antiguas de faldones heredados, amarillea la seda y puede despegar o apagar el brillo de cristales y perlas.',
    },
    {
      titulo: 'No pases la plancha doméstica sobre tul, encajes o plisados',
      motivo:
        'La suela caliente puede fundir el tul en segundos o aplastar para siempre relieves de guipur, vainicas y pliegues.',
    },
  ],
  consejosConservacion: [
    'Trae o consulta la prenda cuanto antes tras la celebración: los restos invisibles de bebida o sudor salen mucho mejor antes de oxidarse.',
    'Conserva las etiquetas interiores y cualquier botón o cuenta de repuesto que entregara la boutique para la revisión previa.',
    'Al llegar a casa, retira cualquier plástico exterior de lluvia y guárdalo en lugar seco, lejos de luz solar y radiadores.',
    'Cuelga siempre los vestidos pesados desde sus cintas interiores de cintura, evitando que tirantes finos o escotes soporten el peso.',
  ],
  preguntasFrecuentes: [
    {
      pregunta: '1. ¿Cuánto cuesta limpiar un vestido de novia, fiesta, comunión o bautizo en Vigo?',
      respuesta:
        'No aplicamos una tarifa fija cerrada en web porque el trabajo artesanal varía según el número de capas, la delicadeza del tejido, los apliques de pedrería y el estado de los bajos o manchas. Puedes enviarnos 3 fotos por WhatsApp a Mimo para recibir orientación previa y confirmamos el presupuesto exacto en tienda antes de empezar.',
    },
    {
      pregunta: '2. ¿Por qué no se debe guardar un vestido de novia o faldón de bautizo en bolsa de plástico en Vigo?',
      respuesta:
        'Porque Vigo tiene una humedad relativa media anual del 77 % (y superior al 80 % entre octubre y enero), por encima del umbral ideal de conservación textil (<65 %), y el plástico cerrado atrapa esa humedad favoreciendo el moho y reacciones químicas de amarilleamiento fenólico. Usa plástico solo para resguardarlo de la lluvia en el trayecto y consérvalo después en funda transpirable (o en caja y papel tisú libres de ácido si lo guardas doblado).',
    },
    {
      pregunta: '3. ¿Puedo llevar mi vestido de novia, invitada o chaqué solo a planchar antes de la boda?',
      respuesta:
        'Sí. Realizamos higienización suave, repaso de cuerpo y caída en tejidos como lino o batista, y planchado o vaporizado artesanal previo al evento para vestidos comprados online o en outlet, prendas arrugadas de viaje, chaqués y trajes de comunión. Trae la prenda o consúltanos por WhatsApp con antelación para confirmar fecha segura.',
    },
    {
      pregunta: '4. ¿Salen los bajos negros de asfalto, barro o césped en un vestido de novia?',
      respuesta:
        'En la gran mayoría de los casos logramos limpiar o atenuar notablemente los bajos rozados mediante desmanchado manual previo adaptado a grasa urbana, barro seco o hierba. Cuando existe desgaste físico severo del hilo o manchas muy oxidadas, actuamos con honestidad técnica y nos detenemos antes de que insistir pueda debilitar la fibra.',
    },
    {
      pregunta: '5. ¿Podéis limpiar y quitar el tono amarillo de un faldón de bautizo antiguo o heredado?',
      respuesta:
        'Sí. Tratamos faldones familiares de batista, lino, algodón fino y puntillas con procesos delicados sin lejía ni centrifugados para devolver luminosidad y respetar vainicas y jaretas. En piezas con décadas de antigüedad hacemos pruebas previas para comprobar la resistencia del tejido antes de intervenir.',
    },
    {
      pregunta: '6. ¿Cuánto tiempo tarda la limpieza de un vestido de ceremonia?',
      respuesta:
        'El plazo depende de la complejidad de capas, del tiempo que exija el desmanchado manual, del secado natural sin secadora y de si precisa algún ajuste de costura. Por rigor profesional no prometemos plazos exprés a ciegas: te damos una fecha estimada realista al revisar la prenda o ver tus fotos.',
    },
    {
      pregunta: '7. ¿Cómo limpiáis vestidos de fiesta o novia con lentejuelas y pedrería pegada?',
      respuesta:
        'Antes de elegir el ciclo comprobamos si los adornos van cosidos o fijados con adhesivo, ya que la pedrería pegada puede despegarse o perder brillo con disolventes o agua caliente. Hacemos pruebas en zona oculta, protegemos zonas sensibles y trabajamos a mano los sectores delicados.',
    },
    {
      pregunta: '8. ¿Qué pasa si el vestido tiene el bajo descosido, un enganche en el tul o la presilla de la cola rota?',
      respuesta:
        'Al contar con taller propio de costura y modistería in situ en Avda. Gregorio Espino 42 y Rúa de Venezuela 29, Entreplanta (con recepción también en Navia), integramos el arreglo y la limpieza en el mismo circuito, decidiendo en mostrador si conviene asegurar la costura antes del lavado o rematar el ajuste después.',
    },
    {
      pregunta: '9. ¿Hace falta limpiar un vestido tras la boda o comunión si parece que no tiene manchas?',
      respuesta:
        'Sí, porque el champán, el vino blanco y el sudor se secan transparentes, pero contienen azúcares y componentes que se oxidan o caramelizan con los meses dejando cercos amarillos o pardos difíciles de revertir. Limpiarlo poco después protege el tono original.',
    },
    {
      pregunta: '10. ¿Usáis limpieza en seco tradicional o Wet Cleaning en agua?',
      respuesta:
        'Aplicamos ambos sistemas de manera selectiva según la etiqueta, fibras y manchas, nunca un programa único automático. La limpieza en seco suave disuelve grasas, maquillaje y asfalto respetando estructuras y sedas, mientras que el Wet Cleaning controlado elimina sudor, sales y azúcares respetando linos y algodones.',
    },
    {
      pregunta: '11. ¿Dónde puedo entregar mi vestido en Vigo y en localidades cercanas?',
      respuesta:
        'Puedes traerlo a cualquiera de nuestras 3 tiendas propias en Vigo: Sede Central Navia (C/ Teixugueiras 11), Rúa de Venezuela 29 (Entreplanta) y Avda. Gregorio Espino 42. También tenemos puntos colaboradores de recepción en Vigo (As Travesas), Redondela, Gondomar, Ponteareas y O Porriño, además de recogida y entrega a domicilio bajo consulta e importe mínimo.',
    },
    {
      pregunta: '12. ¿Qué debo hacer si se mancha el vestido durante la boda antes de traéroslo?',
      respuesta:
        'No frotes ni apliques quitamanchas domésticos, jabón de manos ni calor; absorbe el exceso dando toques suaves con un paño blanco limpio y, si hay barro, déjalo secar por completo antes de manipularlo. Cuanto antes nos envíes fotos o lo acerques, menos se fija la mancha.',
    },
  ],
  enlacesRelacionados: [
    {
      titulo: 'Taller propio de costura y arreglos',
      href: '/arreglos-de-ropa-vigo',
      descripcion:
        'Modistería en Gregorio Espino 42 y Venezuela 29, Entreplanta (recepción en Navia) para bajos descosidos, enganches de tul y presillas de cola.',
    },
    {
      titulo: 'Tintorería profesional en Vigo',
      href: '/tintoreria-vigo',
      descripcion:
        'Limpieza en seco y Wet Cleaning para trajes de sastrería, abrigos de paño y prendas delicadas de diario.',
    },
    {
      titulo: 'Solo planchado artesanal',
      href: '/planchado-vigo',
      descripcion:
        'Servicio específico de planchado al vapor en percha o doblado para camisas, pantalones y textiles antes o después de tus eventos.',
    },
    {
      titulo: 'Recogida y entrega a domicilio',
      href: '/recogida-a-domicilio',
      descripcion:
        'Coordinación de recogida y entrega cómoda en Vigo y área de influencia bajo consulta e importe mínimo.',
    },
  ],
};

export interface ServicioTextilesHogarData {
  url: string;
  canonical: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  subtituloCabecera: string;
  aclaracionServicio: string;
  especialidades: {
    id: string;
    tituloCorto: string;
    tejidos: string;
    titulo: string;
    descripcion: string;
    claves: string[];
    avisoHonesto: string;
  }[];
  problemaCasaVsMimos: {
    enCasa: {
      titulo: string;
      subtitulo: string;
      puntos: {
        titulo: string;
        detalle: string;
      }[];
    };
    enMimos: {
      titulo: string;
      subtitulo: string;
      puntos: {
        titulo: string;
        detalle: string;
      }[];
    };
  };
  ventajasDiferenciales: {
    retiradaCortinas: {
      titulo: string;
      subtitulo: string;
      descripcion: string;
      detalles: string[];
    };
    costuraHogar: {
      titulo: string;
      subtitulo: string;
      descripcion: string;
      detalles: string[];
    };
  };
  criteriosPresupuesto: {
    titulo: string;
    detalle: string;
  }[];
  consejosEntregaYGuarda: string[];
  preguntasFrecuentes: {
    pregunta: string;
    respuesta: string;
  }[];
  enlacesRelacionados: {
    titulo: string;
    href: string;
    descripcion: string;
  }[];
}

export const SERVICIO_TEXTILES_HOGAR_DATA: ServicioTextilesHogarData = {
  url: '/textiles-hogar-vigo',
  canonical: 'https://www.tintoreriamimos.es/textiles-hogar-vigo',
  seoTitle: 'Limpieza de Edredones, Mantas, Cortinas y Estores en Vigo | Mimos',
  metaDescription:
    'Lavado y secado completo en gran formato de edredones de plumas y sintéticos, mantas, colchas, cortinas (vamos a tu casa a desmontar y volver a colocar), estores textiles y fundas en Vigo.',
  h1: 'Limpieza y secado en gran formato de edredones, mantas, cortinas y estores en Vigo',
  subtituloCabecera:
    'Lavamos y secamos hasta el núcleo piezas grandes que no caben ni secan bien frente a la humedad de Vigo. Además, vamos a tu casa a desmontar, limpiar, planchar y volver a colgar cortinas o puedes traerlas a tienda.',
  aclaracionServicio:
    'Cada pieza se valora según su medida, relleno y tejido antes de empezar (sin precios cerrados a ciegas ni plazos estándar forzados). Aclaración importante: en estores trabajamos únicamente estores textiles de tela (no realizamos estores enrollables técnicos de PVC, screen rígido o fibra de vidrio).',
  especialidades: [
    {
      id: 'edredones',
      tituloCorto: 'Edredones nórdicos (plumas y fibra)',
      tejidos: 'Pluma natural, plumón, fibra hueca y todas las medidas',
      titulo: 'Edredones nórdicos de plumas, plumón y relleno sintético',
      descripcion:
        'Para camas de 90, 105, 135, 150, 180 y 200 cm. Lavamos en tambores de gran diámetro para que el nórdico flote sin tensionar costuras ni apelmazar el relleno, aclarando a fondo para que no queden restos de detergente.',
      claves: [
        'Cero suavizante en pluma y plumón natural: el suavizante recubre los filamentos y apelmaza el aire interior',
        'Secado progresivo hasta el núcleo sin humedad oculta que genere olor o cercos amarillos en armario',
        'Inspección previa de tabiques y costuras para evitar fugas de pluma durante el ciclo',
      ],
      avisoHonesto:
        'Respetamos siempre la etiqueta original: si la funda exterior es de seda o batista muy fina que exige limpieza profesional específica, adaptamos el proceso.',
    },
    {
      id: 'cortinas',
      tituloCorto: 'Cortinas y visillos (con desmontaje)',
      tejidos: 'Lino, algodón, terciopelo, poliéster y cortinas forradas',
      titulo: 'Cortinas, visillos y caídas (retirada y colocación a domicilio)',
      descripcion:
        'Eliminamos el polvo urbano, grasa de cocina, nicotina y humedad acumulada devolviendo luminosidad y caída natural mediante vaporizado vertical sin brillos ni marcas de doblez.',
      claves: [
        'Servicio completo a domicilio: vamos a tu casa a descolgarlas, lavarlas, plancharlas y volver a colocarlas',
        'También puedes entregarlas directamente en nuestras 3 tiendas propias o 5 puntos colaboradores',
        'Revisión previa de zonas muy quemadas por el sol en ventanas con mucha insolación antes de lavar',
      ],
      avisoHonesto:
        'Antes de limpiar cortinas antiguas de lino o fibras naturales que nunca se han mojado, evaluamos el riesgo de encogimiento o debilitamiento solar y te lo indicamos con franqueza.',
    },
    {
      id: 'estores-textiles',
      tituloCorto: 'Estores de tela (sin PVC ni screen)',
      tejidos: 'Paqueto, estores plegables y de varillas en tejido textil',
      titulo: 'Estores textiles de tela (paqueto, varillas y visillo)',
      descripcion:
        'Limpieza delicada adaptada a estores confeccionados en tejido textil, cuidando jaretas, bolsillos de varillas, cordones laterales y apresto para que mantengan el ancho y el pliegue exactos.',
      claves: [
        'Tratamiento suave para evitar encogimientos que descuadren el ancho de las varillas',
        'Planchado manual entre varillas y cordones manteniendo una caída limpia en ventana',
        'Si alguna varilla, bolsillo o cinta necesita repaso, lo resolvemos en nuestro taller de costura propio',
      ],
      avisoHonesto:
        'Importante: limpiamos exclusivamente estores confeccionados en tela. No trabajamos estores enrollables técnicos de PVC, fibra de vidrio o tejido screen rígido.',
    },
    {
      id: 'mantas-fundas',
      tituloCorto: 'Mantas, colchas y fundas de sofá',
      tejidos: 'Mantas de lana o coralina, boutís, protectores y fundas con cremallera',
      titulo: 'Mantas, colchas, boutís y fundas desenfundables de sofá o colchón',
      descripcion:
        'Higienización profunda de piezas pesadas de cama y fundas desmontables con cremallera (cojines, respaldos, asientos o fundas de colchón), recuperando suavidad al tacto y frescor sin ácaros.',
      claves: [
        'Mantas gruesas de lana, pelo largo, acrílicas, coralina, colchas piqué y edredones boutí',
        'Lavado en seco o Wet Cleaning en fundas de sofá desmontables para evitar encogimientos de cremalleras',
        'Protectores acolchados, almohadas (según etiqueta) y mantelerías familiares de gran tamaño',
      ],
      avisoHonesto:
        '¿Tu sofá es fijo y no se desenfunda? Entonces corresponde nuestra limpieza de tapicerías a domicilio en /limpieza-sofas-vigo.',
    },
  ],
  problemaCasaVsMimos: {
    enCasa: {
      titulo: 'Qué ocurre en la lavadora doméstica y con la humedad de Vigo',
      subtitulo: 'Por qué muchos nórdicos y cortinas acaban estropeados al lavarlos en casa',
      puntos: [
        {
          titulo: 'Tambor saturado sin circulación real',
          detalle:
            'En seco parece que entra, pero al empaparse el edredón multiplica su peso, bloquea el giro y deja jabón atrapado dentro.',
        },
        {
          titulo: 'Seco por fuera, húmedo por dentro',
          detalle:
            'Con más del 77 % de humedad media anual en Vigo (y más del 80 % de octubre a enero), el interior del plumón tarda días en secar: salen bloques duros, cercos amarillos y olor a humedad.',
        },
        {
          titulo: 'Cortinas arrugadas o encogidas en la cintura de casa',
          detalle:
            'Centrifugados fuertes o agua inadecuada marcan pliegues imposibles de planchar en una tabla doméstica y pueden encoger el bajo.',
        },
      ],
    },
    enMimos: {
      titulo: 'Cómo lo resolvemos en nuestras instalaciones de gran formato',
      subtitulo: 'Capacidad amplia, secado completo hasta el núcleo y planchado de taller',
      puntos: [
        {
          titulo: 'Flotación libre y aclarado total sin residuos',
          detalle:
            'Nuestras lavadoras de gran diámetro permiten que la pieza se mueva holgadamente en el baño con dosis exactas y aclarado completo (y sin suavizante en plumas).',
        },
        {
          titulo: 'Secado controlado hasta el centro del relleno',
          detalle:
            'Secamos en ciclos progresivos de temperatura cuidada para descompactar la pluma o fibra y devolver todo su volumen térmico sin riesgo de humedad residual.',
        },
        {
          titulo: 'Vaporización amplia en mesa profesional',
          detalle:
            'Las cortinas y colchas salen estiradas al vapor en toda su caída, listas para colgar o doblar sin arrugas de centrifugado.',
        },
      ],
    },
  },
  ventajasDiferenciales: {
    retiradaCortinas: {
      titulo: 'Desmontaje, lavado, planchado y colocación de cortinas en tu casa',
      subtitulo: 'Servicio a domicilio para cortinajes completos',
      descripcion:
        'Si no quieres subirte a una escalera, desmontar paños pesados ni pelearte luego con los ganchos y rieles, acudimos a tu domicilio en Vigo y área de influencia: descolgamos las cortinas, las tratamos en nuestras instalaciones y volvemos a dejarlas colgadas y vaporizadas.',
      detalles: [
        'Ideal para salones grandes, techos altos, cortinajes antiguos o segundas residencias',
        'Valoración transparente según número de ventanas, altura, rieles y localidad',
        'Si prefieres traerlas tú mismo, te atendemos sin pedido mínimo en nuestras 3 tiendas y 5 puntos',
      ],
    },
    costuraHogar: {
      titulo: 'Limpieza y taller propio de costura y confección para el hogar',
      subtitulo: 'Gregorio Espino 42 y Rúa de Venezuela 29, Entreplanta (recepción en Navia)',
      descripcion:
        'Al contar con talleres propios de modistería y máquina industrial en Vigo, si al desmontar o lavar detectamos un bajo descosido, una cinta fruncidora gastada o una cremallera rota en una funda de sofá, lo arreglamos en el mismo circuito.',
      detalles: [
        'Bajos de cortinas, colocación de cinta fruncidora, ollaos, presillas y trabillas',
        'Repaso de estores textiles (bolsillos de varilla, cordones o contrapesos) y cojines',
        'Cambio de cremalleras en fundas de colchón, cojines y sofás desenfundables',
      ],
    },
  },
  criteriosPresupuesto: [
    {
      titulo: 'Tipo de pieza y dimensiones',
      detalle: 'Cama de 90/105 frente a 150/200 cm, peso de la manta o metros y número de paños de cortina.',
    },
    {
      titulo: 'Relleno y delicadeza del tejido',
      detalle: 'Pluma/plumón natural vs. fibra hueca, o lino/terciopelo/seda frente a poliéster lavable.',
    },
    {
      titulo: 'Desmanchado o servicio de desmontaje',
      detalle: 'Si requiere tratamiento previo de manchas o desplazamiento para descolgar y recolocar en casa.',
    },
    {
      titulo: 'Posibles repasos en costura propia',
      detalle: 'Arreglos opcionales de bajos, cintas, cremalleras de fundas o varillas de estor.',
    },
  ],
  consejosEntregaYGuarda: [
    'Si traes tú las cortinas o estores a tienda, retira antes ganchos metálicos sueltos, contrapesos rígidos y varillas si salen con facilidad (o indícanoslo en mostrador para revisarlo juntos).',
    'Avísanos si una cortina lleva muchos años expuesta al sol directo o si el bajo rozó con radiadores o humedad de ventana: así probamos antes la resistencia del hilo.',
    'Nunca guardes un edredón nórdico de plumas en bolsas de plástico al vacío ni cerradas herméticamente en el armario de Vigo: comprimen la caña del plumón y retienen humedad.',
    'Te entregamos los edredones completamente secos, aireados y protegidos, listos para usar en la cama o guardar en bolsa textil transpirable.',
  ],
  preguntasFrecuentes: [
    {
      pregunta: '1. ¿Cuánto cuesta lavar un edredón nórdico de plumas, una manta o unas cortinas en Vigo?',
      respuesta:
        'No publicamos tarifas estándar fijas porque el coste depende del tamaño (cama individual, 135/150 o King Size), de si el relleno es pluma natural o fibra sintética, del número de paños o tejido en cortinas y de si solicitas retirada y colocación a domicilio. Envíanos medidas o una foto a Mimo por WhatsApp para recibir orientación previa.',
    },
    {
      pregunta: '2. ¿Vais a casa a desmontar y volver a colgar las cortinas después de limpiarlas?',
      respuesta:
        'Sí. Además de poder entregarlas en cualquiera de nuestras 3 tiendas propias o 5 puntos colaboradores, disponemos de servicio de retirada de cortinajes a domicilio, lavado, planchado profesional y posterior colocación en tu vivienda o local (bajo consulta y presupuesto previo según número de ventanas, altura y ubicación en Vigo y alrededores).',
    },
    {
      pregunta: '3. ¿Por qué un edredón de plumas lavado en casa sale apelmazado, huele a humedad o le salen manchas amarillas?',
      respuesta:
        'En una lavadora doméstica el nórdico entra apretado, no aclara bien el detergente y al tenderlo en un clima húmedo como el de Vigo (77 % de humedad media anual y más del 80 % en otoño/invierno), la tela exterior seca antes que el núcleo del plumón. Esa humedad interior apelmaza la pluma en bloques y genera cercos ocres y mal olor.',
    },
    {
      pregunta: '4. ¿Limpiáis estores enrollables de PVC, fibra de vidrio o tejido técnico screen?',
      respuesta:
        'No. Únicamente limpiamos estores confeccionados en tejido textil (estores tipo paqueto, plegables de tela o estores con varillas textiles). No realizamos limpieza de estores enrollables rígidos de PVC, láminas plásticas o screen técnico.',
    },
    {
      pregunta: '5. ¿Las cortinas de lino o algodón pueden encoger al lavarlas?',
      respuesta:
        'Los tejidos naturales como lino o algodón que nunca han sido lavados presentan un riesgo natural de ligero encogimiento según la composición y apresto del fabricante. Por eso revisamos siempre la etiqueta y el estado previo del tejido, y aplicamos limpieza en seco o lavado controlado en frío cuando corresponde para minimizar ese riesgo.',
    },
    {
      pregunta: '6. ¿Qué diferencia hay entre traer aquí las fundas del sofá o contratar la limpieza de sofás?',
      respuesta:
        'Si las fundas de tus cojines, respaldos o estructura llevan cremallera y se pueden desmontar siguiendo su etiqueta (código W o P), puedes traerlas dentro de este servicio para lavarlas e higienizarlas en taller. Si tu tapicería es fija y no se desenfunda, lo realizamos directamente en tu vivienda mediante inyección-extracción en /limpieza-sofas-vigo.',
    },
    {
      pregunta: '7. ¿Puedo aprovechar el lavado para arreglar el bajo de una cortina o cambiar la cremallera de una funda?',
      respuesta:
        'Sí. Contamos con taller propio de costura en Avda. Gregorio Espino 42 y Rúa de Venezuela 29, Entreplanta (con recepción también en Navia), donde confeccionamos y ajustamos cortinas, estores textiles, cojines y cremalleras de fundas sin que tengas que llevar el encargo a otro establecimiento.',
    },
    {
      pregunta: '8. ¿Usáis suavizante al lavar edredones de pluma y plumón?',
      respuesta:
        'Nunca. El suavizante convencional recubre los filamentos microscópicos de la pluma natural, impidiendo que atrapen aire y reduciendo su ligereza y poder térmico. Empleamos detergentes neutros específicos, aclarado completo y secado progresivo para devolver su esponjosidad original.',
    },
    {
      pregunta: '9. ¿Cómo debo guardar el edredón en el armario hasta el próximo invierno en Vigo?',
      respuesta:
        'Asegúrate de guardarlo completamente limpio y seco, siempre en una bolsa de tela o funda transpirable (algodón o tejido TNT). Evita bolsas de plástico cerradas herméticamente y no utilices bolsas al vacío en nórdicos de pluma o plumón natural, ya que rompen y deforman la estructura de las cañas.',
    },
    {
      pregunta: '10. ¿Dónde puedo entregar edredones, mantas o cortinas, o pedir recogida a domicilio?',
      respuesta:
        'Puedes entregarlos sin importe mínimo en nuestras 3 tiendas propias en Vigo (Navia Teixugueiras 11, Rúa de Venezuela 29 Entreplanta y Avda. Gregorio Espino 42) o en los 5 puntos colaboradores de As Travesas, Redondela, Gondomar, Ponteareas y O Porriño. También coordinamos recogida y entrega a domicilio consultando previamente con Mimo el importe mínimo y zona.',
    },
  ],
  enlacesRelacionados: [
    {
      titulo: 'Limpieza de alfombras en Vigo',
      href: '/limpieza-alfombras-vigo',
      descripcion:
        'Lavado plano en instalaciones, recogida a domicilio en Vigo y enlace con restauración de flecos y bordes.',
    },
    {
      titulo: 'Limpieza de sofás a domicilio',
      href: '/limpieza-sofas-vigo',
      descripcion:
        'Para sofás, chaiselongues, sillas, cabeceros y colchones de tapicería fija tratados directamente en tu vivienda.',
    },
    {
      titulo: 'Taller propio de costura (cortinas y fundas)',
      href: '/arreglos-de-ropa-vigo',
      descripcion:
        'Confección y ajuste de cortinas, estores textiles, cojines y cambio de cremalleras en Gregorio Espino 42 y Venezuela 29 (Entreplanta).',
    },
    {
      titulo: 'Guía práctica: cómo cuidar un edredón de plumas',
      href: '/blog/como-lavar-edredon-de-plumas-guia-practica',
      descripcion:
        'Qué comprobar en la etiqueta, por qué evitar el tambor justo y claves para el secado sin olor a humedad.',
    },
  ],
};

// =========================================================================
// SERVICIO ESPECIALIZADO: REPARACIÓN Y RESTAURACIÓN DE ALFOMBRAS (/reparacion-alfombras-vigo)
// =========================================================================
export interface ServicioReparacionAlfombrasData {
  url: string;
  canonical: string;
  seoTitle: string;
  metaDescription: string;
  h1: string;
  subtituloCabecera: string;
  aclaracionOperativa: string;
  modalidades: {
    id: 'solo-reparacion' | 'limpieza-mas-reparacion';
    etiqueta: string;
    titulo: string;
    resumen: string;
    puntos: string[];
  }[];
  especialidades: {
    id: string;
    tituloCorto: string;
    soporte: string;
    titulo: string;
    descripcion: string;
    causasHabituales: string[];
    criterioRestaurador: string;
  }[];
  pasosColaborador: {
    num: string;
    titulo: string;
    descripcion: string;
  }[];
  criteriosValoracion: {
    titulo: string;
    detalle: string;
  }[];
  fotosNecesarias: {
    titulo: string;
    detalle: string;
  }[];
  preguntasFrecuentes: {
    pregunta: string;
    respuesta: string;
  }[];
  enlacesRelacionados: {
    titulo: string;
    href: string;
    descripcion: string;
  }[];
}

export const SERVICIO_REPARACION_ALFOMBRAS_DATA: ServicioReparacionAlfombrasData = {
  url: '/reparacion-alfombras-vigo',
  canonical: 'https://www.tintoreriamimos.es/reparacion-alfombras-vigo',
  seoTitle: 'Reparación de Alfombras en Vigo: Flecos, Ribetes y Bordes | Mimos',
  metaDescription:
    'Reparación y restauración de alfombras en Vigo mediante restaurador especialista colaborador: flecos, festón lateral, bordes y descosidos. Contrata solo reparación o limpieza + arreglo.',
  h1: 'Reparación y restauración de alfombras en Vigo: flecos, ribetes y bordes',
  subtituloCabecera:
    'Frena el deshilachado antes de que alcance el tejido principal de tu alfombra. Puedes contratar solo reparación (sin necesidad de limpiar la pieza) o combinar limpieza + arreglo a través de nuestro restaurador especialista colaborador.',
  aclaracionOperativa:
    'Transparencia de servicio: la intervención técnica la realiza un restaurador especialista colaborador. Tú entregas y recoges cómodamente en nuestras 3 tiendas propias de Vigo (o consultas recogida a domicilio con Mimo), y es el restaurador quien valora caso por caso la viabilidad, la solución técnica y el presupuesto a partir de tus fotos y del reverso de la pieza.',
  modalidades: [
    {
      id: 'solo-reparacion',
      etiqueta: 'Opción 1 · Encargo independiente',
      titulo: 'Solo reparación (sin obligación de limpiar)',
      resumen:
        'Si tu alfombra está limpia pero se le han soltado los flecos, abierto el festón de un lateral o despegado una esquina, puedes contratar únicamente el arreglo.',
      puntos: [
        'Sin tener que pagar ni incluir limpieza si la pieza no la necesita',
        'Recepción directa en nuestras 3 tiendas propias en Vigo o recogida a domicilio según cobertura',
        'Valoración previa por foto directamente por el restaurador antes de desplazarte',
      ],
    },
    {
      id: 'limpieza-mas-reparacion',
      etiqueta: 'Opción 2 · Todo en un viaje',
      titulo: 'Limpieza en taller + reparación de flecos o bordes',
      resumen:
        'Si la alfombra lleva meses puesta o acumula suciedad, combinamos la higienización en nuestras instalaciones con la restauración posterior del colaborador en un solo encargo.',
      puntos: [
        'Una sola entrega en tienda o una sola logística de recogida y devolución en tu domicilio',
        'Higienización previa para trabajar con el hilo limpio, asentado y el tono real a la vista',
        'Presupuesto desglosado tras revisar medidas, tejido y tramo afectado',
      ],
    },
  ],
  especialidades: [
    {
      id: 'flecos',
      tituloCorto: 'Flecos sueltos o rotos',
      soporte: 'Alfombras anudadas a mano, lana, algodón, seda y clásicas',
      titulo: 'Reposición, remate e igualado de flecos en cabeceras',
      descripcion:
        'El cepillo del aspirador, los robots limpiadores o el paso constante suelen arrancar o desgastar los flecos de las cabeceras hasta amenazar la primera fila de nudos. Valoramos fijar el borde, igualar flecos deteriorados o reponer tramos perdidos.',
      causasHabituales: [
        'Tirones de aspirador o mordeduras de mascotas en uno de los extremos',
        'Deshilachado progresivo de la urdimbre que empieza a soltar los primeros nudos del dibujo',
        'Flecos ennegrecidos, acortados de forma desigual o desprendidos parcialmente',
      ],
      criterioRestaurador:
        'El restaurador revisa si la cabecera admite reposición de fleco, consolidación con hilo o remate limpio de seguridad para evitar que siga deshaciéndose.',
    },
    {
      id: 'feston-ribete',
      tituloCorto: 'Festón y ribetes laterales',
      soporte: 'Lanas, sintéticas tejidas, kilims y alfombras de salón',
      titulo: 'Festón perimetral, ribetes y sobrehilado de bordes',
      descripcion:
        'Cuando el cordón lateral que remata el perímetro se abre o se deshilacha por el roce contra zócalos o puertas, la estructura lateral pierde sujeción. Reforzamos o reparamos el tramo dañado antes de que afecte a la trama.',
      causasHabituales: [
        'Rozamiento frecuente junto a puertas, sillas de escritorio o zonas de paso estrechas',
        'Rotura puntual del hilo del festón que se abre longitudinalmente varios centímetros',
        'Desgaste del ribete original por el paso del tiempo manteniendo sano el cuerpo central',
      ],
      criterioRestaurador:
        'Con tus fotos de frente y del reverso, el restaurador confirma qué tipo de remate (festón o ribete) encaja con el grosor y color de tu alfombra.',
    },
    {
      id: 'esquinas-descosidos',
      tituloCorto: 'Esquinas y descosidos',
      soporte: 'Bordes doblados, esquinas levantadas y refuerzos perimetrales',
      titulo: 'Esquinas abiertas, descosidos y consolidación de bordes',
      descripcion:
        'Las esquinas son la zona que más sufre tropiezos y dobleces. Cuando se descose la unión entre el remate lateral y la cabecera o cede el ribete de la esquina, actuamos sobre el foco para recuperar estabilidad y evitar tropiezos.',
      causasHabituales: [
        'Esquinas despegadas o abiertas tras enganches con muebles o patas de sofá',
        'Separación entre el lateral festoneado y la cabecera de flecos',
        'Bordes ondulados o debilitados que requieren estabilización por el reverso',
      ],
      criterioRestaurador:
        'Algunas piezas con látex trasero endurecido o cuarteado presentan limitaciones técnicas; el restaurador evalúa el reverso antes de confirmar el arreglo.',
    },
    {
      id: 'roturas-valoracion',
      tituloCorto: 'Roturas o daños a valorar',
      soporte: 'Cortes, quemaduras, polilla o daños puntuales en el campo',
      titulo: 'Roturas puntuales y restauraciones evaluadas caso por caso',
      descripcion:
        'Ante un desgarro accidental, un agujero puntual, daño localizado por humedad o ataque de polilla, no aplicamos recetas estándar: derivamos las imágenes directamente al restaurador especialista para confirmar si resulta viable recuperar la zona.',
      causasHabituales: [
        'Pequeños cortes, desgarros o quemaduras localizadas cerca de chimeneas o estufas',
        'Zonas debilitadas tras humedad prolongada debajo de macetas o fugas',
        'Pérdida localizada de pelo o trama en alfombras familiares con valor sentimental',
      ],
      criterioRestaurador:
        'La viabilidad técnica, el nivel de disimulo esperable y el coste los valora directamente el restaurador examinando la pieza antes de comprometer el encargo.',
    },
  ],
  pasosColaborador: [
    {
      num: '01',
      titulo: 'Envías fotos claras por WhatsApp',
      descripcion:
        'Con el configurador inferior preparas tu mensaje indicando si buscas solo reparación o limpieza + arreglo, los centímetros o metros aproximados del daño y adjuntas fotos de la pieza y del reverso.',
    },
    {
      num: '02',
      titulo: 'Valoración del restaurador colaborador',
      descripcion:
        'Nuestro restaurador especialista colaborador estudia las imágenes (tejido, nudo y estado de la base) para confirmar si el arreglo es viable, qué técnica recomienda y cuál es el presupuesto estimado.',
    },
    {
      num: '03',
      titulo: 'Entrega en tienda o recogida en Vigo',
      descripcion:
        'Si aceptas la valoración, dejas la alfombra en cualquiera de nuestras 3 tiendas propias en Vigo (sin importe mínimo) o coordinas recogida a domicilio con Mimo según cobertura y condiciones.',
    },
    {
      num: '04',
      titulo: 'Restauración, revisión y entrega',
      descripcion:
        'El colaborador realiza el trabajo artesanal (y si solicitaste limpieza previa, la higienizamos antes en nuestras instalaciones). Cuando todo está revisado, te avisamos para la entrega.',
    },
  ],
  criteriosValoracion: [
    {
      titulo: 'Longitud lineal del daño (cm o metros)',
      detalle:
        'No es lo mismo consolidar 30 cm de esquina abierta que rehacer los dos extremos completos de flecos o festonear varios metros de lateral.',
    },
    {
      titulo: 'Tipo de alfombra, nudo y fibra',
      detalle:
        'La técnica y el hilo de igualación varían si la alfombra es de lana anudada a mano, kilim plano, algodón, seda o tejido mecánico de salón.',
    },
    {
      titulo: 'Estado real del reverso y la urdimbre',
      detalle:
        'El restaurador comprueba si la base aguanta puntada nueva o si existen soportes engomados/látex cuarteados que limiten la reparación.',
    },
    {
      titulo: 'Solo reparación vs limpieza + arreglo y recogida',
      detalle:
        'Se presupuesta por separado si únicamente contratas la reparación o si sumas limpieza previa y recogida/entrega a domicilio en Vigo.',
    },
  ],
  fotosNecesarias: [
    {
      titulo: '01. Vista general de la alfombra completa',
      detalle: 'Para ver proporción, estilo de tejido y ubicación exacta del desperfecto.',
    },
    {
      titulo: '02. Primer plano del fleco, borde o rotura',
      detalle: 'Con buena luz natural para que el restaurador distinga el tipo de punto, color y alcance.',
    },
    {
      titulo: '03. Foto de la parte trasera (reverso) en la zona afectada',
      detalle: 'Imprescindible para comprobar si lleva yute, algodón o base engomada/látex y si admite costura.',
    },
    {
      titulo: '04. Medida aproximada del tramo a reparar',
      detalle: 'Por ejemplo: «1,70 m de flecos en un lado» o «unos 40 cm de festón suelto».',
    },
  ],
  preguntasFrecuentes: [
    {
      pregunta: '1. ¿Puedo contratar solo la reparación de mi alfombra sin tener que limpiarla?',
      respuesta:
        'Sí. Puedes contratar únicamente el servicio de reparación (flecos, festón lateral, ribetes o esquinas) sin obligación de añadir limpieza. Y si además quieres higienizarla, puedes combinar limpieza + arreglo en el mismo encargo.',
    },
    {
      pregunta: '2. ¿Quién realiza exactamente la reparación y restauración de la alfombra?',
      respuesta:
        'Los trabajos técnicos de reparación y restauración de alfombras se realizan a través de un restaurador especialista colaborador. En Tintorería Mimos nos encargamos de recibir tu consulta con Mimo, gestionar la entrega/recogida en nuestras 3 tiendas propias de Vigo o a domicilio, y coordinar el acabado.',
    },
    {
      pregunta: '3. ¿Todas las alfombras admiten reparación o hay casos que no se pueden arreglar?',
      respuesta:
        'La viabilidad la valora siempre el restaurador especialista caso por caso. Mientras la urdimbre y los bordes mantengan consistencia, suelen admitir muy bien refuerzos de flecos, festones y esquinas; en cambio, soportes traseros con látex muy pasado o cuarteado o bases muy podridas por humedad pueden limitar o impedir la costura.',
    },
    {
      pregunta: '4. ¿Por qué no publicáis precios fijos por metro de fleco o festón?',
      respuesta:
        'Porque cada alfombra tiene distinta densidad de nudo, grosor de hilo, estado del borde y longitud dañada. El restaurador revisa primero tus fotografías y las medidas del tramo para darte un presupuesto realista antes de que entregues la pieza.',
    },
    {
      pregunta: '5. Si también quiero limpiarla, ¿qué se hace antes: la limpieza o la reparación?',
      respuesta:
        'Por regla general se recomienda higienizar la alfombra antes de restaurar (o coordinarlo según el criterio del restaurador) para trabajar sobre fibras limpias, fijar el tono real del hilo y evitar tensiones durante el lavado. Si un borde corre riesgo de soltarse al manipularlo, el especialista decide el orden más seguro.',
    },
    {
      pregunta: '6. ¿Cómo y dónde entrego mi alfombra para repararla en Vigo?',
      respuesta: `Puedes entregarla sin pedido mínimo en cualquiera de nuestras ${TIENDAS_PROPIAS.length} tiendas propias en Vigo (${TIENDAS_PROPIAS.map(
        (t) => `${t.nombre_mostrado} en ${t.direccion}`
      ).join(', ')}). También puedes consultar con Mimo recogida y entrega a domicilio según zona de cobertura e importe mínimo de servicio.`,
    },
    {
      pregunta: '7. ¿Qué fotos debo enviar por WhatsApp para que la valore el restaurador?',
      respuesta: `Envía al WhatsApp de Mimo (${CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado}) una foto general de la alfombra, un primer plano nítido del fleco, borde o daño, una foto del reverso en esa zona y la longitud aproximada afectada en centímetros o metros.`,
    },
    {
      pregunta: '8. ¿Qué plazo tarda una reparación de alfombra?',
      respuesta:
        'Al tratarse de un trabajo artesanal gestionado con restaurador colaborador, el plazo depende de la complejidad de la costura, de los metros a reponer y de si se combina con limpieza y secado completo. Al confirmar la valoración previa te indicamos el plazo estimado.',
    },
  ],
  enlacesRelacionados: [
    {
      titulo: 'Limpieza de alfombras en Vigo',
      href: '/limpieza-alfombras-vigo',
      descripcion:
        'Lavado e higienización en nuestras instalaciones con secado completo y recogida a domicilio.',
    },
    {
      titulo: 'Recogida y entrega a domicilio',
      href: '/recogida-a-domicilio',
      descripcion:
        'Condiciones de recogida en vivienda, zonas cubiertas y entrega sin mínimo en nuestras 3 tiendas propias.',
    },
    {
      titulo: 'Textiles del hogar (edredones y cortinas)',
      href: '/textiles-hogar-vigo',
      descripcion:
        'Limpieza en gran formato de nórdicos, mantas, estores de tela y cortinajes con desmontaje en casa.',
    },
    {
      titulo: 'Taller propio de costura y arreglos de ropa',
      href: '/arreglos-de-ropa-vigo',
      descripcion:
        'Bajos, cremalleras, composturas de prendas, piel y confección de cortinas y cojines en Vigo.',
    },
  ],
};

export interface ServicioFaqItem {
  pregunta: string;
  respuesta: string;
}

export const SERVICIO_SINIESTROS_FAQS: ServicioFaqItem[] = [
  {
    pregunta: '1. ¿Qué textiles recuperáis tras un incendio, humareda o inundación en Vigo?',
    respuesta: `Recuperamos exclusivamente ropa y textiles del hogar o negocio: armarios completos, abrigos, trajes, prendas delicadas (lana, seda, punto), pieles y cuero bajo valoración previa, cortinajes (con desmontaje y colocación si lo necesitas), edredones, mantas y alfombras. No realizamos limpieza de obra en paredes, techos, suelos, muebles ni retirada de escombros (${CONTACT_INFO.legalName}, CIF ${CONTACT_INFO.cif}).`,
  },
  {
    pregunta: '2. ¿Qué debo hacer en las primeras 24–48 horas y qué errores destruyen la ropa?',
    respuesta:
      'Ventila el inmueble si es seguro, haz fotos generales y de detalle antes de mover o tirar nada, y guarda las prendas por lotes en sacos o cajas transpirables (nunca en bolsas de plástico cerradas herméticamente). No laves en la lavadora doméstica ni frotes el hollín ni apliques secador o plancha: el agua fija el hollín seco (celulosa), los gases ácidos (HCl de plásticos/PVC) atacan las fibras y el calor sella el olor a humo de forma irreversible.',
  },
  {
    pregunta: '3. ¿Por qué el clima húmedo de Vigo agrava tanto una fuga de agua o extinción?',
    respuesta:
      'En Vigo la humedad ambiental media ronda el 77 % anual y supera el 81–84 % en otoño e invierno. Con una rotura de tubería o agua de bomberos, la ropa mojada colgada en una vivienda sin deshumidificación no seca a tiempo y en apenas 24–48 horas brotan moho, olor persistente a humedad y migración de tintes. Retirar las piezas rápido a nuestras instalaciones evita el deterioro biológico.',
  },
  {
    pregunta: '4. ¿Qué textiles mojados se recuperan según la categoría del agua (Cat. 1, 2 y 3)?',
    respuesta:
      'En Categoría 1 (agua limpia de tubería o lluvia limpia), la mayoría de prendas y textiles del hogar se recuperan mediante separación por colores, higienización y secado controlado si se actúa antes del brote de moho. En Categoría 2 (aguas grises de electrodomésticos, desagües domésticos o agua de extinción sucia), aplicamos desinfección reforzada y valoración textil individual. En Categoría 3 (aguas negras o fecales con riesgo biológico grave), el dictamen habitual es pérdida total obligatoria y emitimos informe técnico de baja para tu seguro.',
  },
  {
    pregunta: '5. ¿Qué es la prueba de viabilidad previa y por qué no laváis el lote sin consultarme?',
    respuesta:
      'En piezas críticas o muy impregnadas (cuero, ante, sedas, trajes de sastrería o edredones de pluma con hollín untuoso o agua estancada), realizamos primero una prueba técnica puntual y te mostramos el resultado y un presupuesto previo cerrado tras revisar el lote antes de procesar el resto. Si el coste de recuperación supera el valor o la prenda es irrecuperable, emitimos dictamen de descarte honesto.',
  },
  {
    pregunta: '6. ¿Cuánto tarda la recuperación y tenéis lote prioritario para trabajo o colegio?',
    respuesta:
      'El ciclo habitual completo para armarios y ajuares tras un siniestro es de entre 1 y 3 semanas, según el volumen de prendas y las pasadas necesarias de aspiración en seco, desengrase, neutralización molecular y verificación olfativa. Además, separamos y adelantamos un lote prioritario con ropa de trabajo, uniformes escolares y básicos urgentes para que puedas seguir con tu rutina diaria.',
  },
  {
    pregunta: '7. ¿Qué plazos y artículos de la Ley 50/1980 debo tener en cuenta con mi aseguradora?',
    respuesta:
      'La Ley 50/1980 de Contrato de Seguro establece el deber de comunicar el siniestro en un plazo máximo de 7 días (Art. 16, recomendable antes de 72 horas), el deber y derecho de adoptar medidas urgentes de salvamento textil para aminorar el daño con gasto reembolsable (Art. 17) y la entrega por escrito de la relación de objetos dañados en los 5 días siguientes a la notificación (Art. 38). En nuestra web puedes generar gratuitamente tu pre-inventario de 5 días en PDF/Excel y la carta modelo.',
  },
  {
    pregunta: '8. ¿Me puede obligar el seguro a usar su contrata general de limpieza? (Arts. 18 y 46)',
    respuesta:
      'Conforme al Art. 18 de la Ley 50/1980, la aseguradora no puede imponer la reparación o sustitución mediante sus propios medios «si el asegurado no lo consiente», y en ramos específicos el Art. 46 refuerza los gastos de salvamento y cobertura conforme a póliza. Puedes elegir una tintorería especializada local en Vigo para tratar tus prendas presentando presupuesto previo y factura oficial desglosada, salvo condiciones particulares expresas o franquicias de tu póliza.',
  },
  {
    pregunta: '9. ¿Qué documentación emitís para el perito y la compañía de seguros?',
    respuesta: `Emitimos presupuesto previo cerrado tras revisar el lote, inventario de prendas tratadas, informe de prueba de viabilidad y certificado de pérdida total o irrecuperabilidad para aquellas piezas que no admitan rescate, además de factura oficial desglosada con IVA y datos fiscales completos de ${CONTACT_INFO.legalName} (CIF ${CONTACT_INFO.cif}). Nunca tires prendas dañadas sin fotografiarlas y documentarlas antes.`,
  },
  {
    pregunta: '10. ¿Dónde entrego mis prendas en Vigo o cómo solicito recogida urgente?',
    respuesta: `Puedes entregar bultos en sacos o cajas transpirables sin pedido mínimo en nuestras ${TIENDAS_PROPIAS.length} tiendas propias de Vigo (${TIENDAS_PROPIAS.map(
      (t) => `${t.nombre_mostrado} en ${t.direccion}, Tel. ${t.telefonos_mostrados}`
    ).join('; ')}), o en nuestros puntos colaboradores de la comarca. Para volúmenes grandes de armario, solicita recogida urgente a domicilio con Mimo por WhatsApp (${CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado}), teléfono (${CONTACT_INFO.phoneDisplay}) o correo (${CONTACT_INFO.email}), sujeta a ruta e importe mínimo según volumen y zona.`,
  },
];

export interface ServicioDetalleModalidad {
  id: string;
  titulo: string;
  etiqueta: string;
  descripcion: string;
  puntos: string[];
  whatsappEjemplo: string;
}

export interface ServicioDetalleProcesoPaso {
  numero: string;
  titulo: string;
  descripcion: string;
}

export interface ServicioDetalleEnlace {
  titulo: string;
  descripcion: string;
  href: string;
  cta: string;
}

export interface ServicioDetalleComparativa {
  titulo: string;
  subtitulo: string;
  columnas: [string, string, string];
  filas: {
    criterio: string;
    valores: [string, string, string];
  }[];
}

export interface ServicioDetalleEnriquecido {
  serviceId: string;
  badgeSuperior: string;
  aclaracionHonesta: string;
  modalidadesTitulo: string;
  modalidadesSubtitulo: string;
  modalidades: ServicioDetalleModalidad[];
  procesoTitulo: string;
  procesoSubtitulo: string;
  procesoPasos: ServicioDetalleProcesoPaso[];
  comparativaTabla?: ServicioDetalleComparativa;
  consejosTitulo: string;
  consejos: string[];
  enlacesEspecializados: ServicioDetalleEnlace[];
  consultaOpcionesLabel: string;
  consultaOpciones: string[];
  consultaPlaceholder: string;
  preguntasFrecuentes: ServicioFaqItem[];
}

export const SERVICIO_DETALLE_ENRIQUECIDO: Record<string, ServicioDetalleEnriquecido> = {
  'tintoreria-profesional': {
    serviceId: 'tintoreria-profesional',
    badgeSuperior: 'Técnicas en planta Navia · Wet Cleaning, Limpieza en Seco y Desmanchado',
    aclaracionHonesta:
      'No aplicamos procesos en serie ni tarifas cerradas a ciegas: en planta evaluamos la etiqueta, entretelas, botones y origen de cada mancha antes de decidir si la prenda va en limpieza en seco o Wet Cleaning. Si requiere costura previa o posterior, coordinamos directamente con nuestros talleres propios de Gregorio Espino y Venezuela.',
    modalidadesTitulo: 'Cómo tratamos cada prenda según su tejido y confección',
    modalidadesSubtitulo:
      'Elegimos el protocolo más seguro entre limpieza en seco y Wet Cleaning ecológico, junto con desmanchado técnico localizado y acabado al vapor profesional.',
    modalidades: [
      {
        id: 'limpieza-seco',
        titulo: 'Limpieza en seco profesional (P / F)',
        etiqueta: 'Sastrería y fibras sensibles al agua',
        descripcion:
          'Imprescindible en americanas con entretelas de crin, trajes de lana estructurados, abrigos de paño, sedas delicadas o mezclas que encogerían o perderían forma en lavado acuoso.',
        puntos: [
          'Mantiene la estructura de hombreras, solapas y caídas de sastrería',
          'Disuelve grasas corporales, aceites y suciedad ambiental sin hinchar la fibra',
          'Acabado en prensa y vapor Veit sin brillos en tejidos oscuros',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Quiero consultar el precio de limpieza en seco para un traje o abrigo',
      },
      {
        id: 'wet-cleaning',
        titulo: 'Wet Cleaning ecológico (W)',
        etiqueta: 'Limpieza en agua controlada por ordenador',
        descripcion:
          'Sistema profesional en medio acuoso con dosificación biodegradable, temperatura regulada y acción mecánica mínima para prendas delicadas compatibles y rellenos técnicos.',
        puntos: [
          'Ideal para prendas con etiqueta W, blusas delicadas, punto fino y plumíferos técnicos',
          'Elimina manchas hidrosolubles (sudor, azúcar, vino o barro) respetando colores y tacto',
          'Secado controlado y rehidratación textil sin apelmazar la prenda',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Quiero consultar una prenda delicada para tratamiento en Wet Cleaning',
      },
      {
        id: 'desmanchado-costura',
        titulo: 'Desmanchado técnico + Costura propia',
        etiqueta: 'Revisión previa de botones y composturas',
        descripcion:
          'Tratamiento previo mancha a mancha (grasa, tinta, vino, maquillaje o rozaduras) junto con protección de fornituras y enlace directo con taller propio si hace falta reparar algo.',
        puntos: [
          'Revisión previa de botones de nácar/cuerno, cremalleras, forros y lentejuelas',
          'Talleres propios de costura in situ en Gregorio Espino y Venezuela (recepción en Navia)',
          'Opción de entrega en funda protectora y percha lista para armario',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Tengo una prenda con una mancha concreta o que necesita repaso de costura y limpieza',
      },
    ],
    procesoTitulo: 'Protocolo en 4 fases en nuestra planta de Navia',
    procesoSubtitulo:
      'Así protegemos tus trajes, abrigos y prendas delicadas desde que entran en mostrador hasta su entrega.',
    procesoPasos: [
      {
        numero: '01',
        titulo: 'Inspección de etiqueta, costuras y fornituras',
        descripcion:
          'Comprobamos composición, símbolos de lavado, firmeza del tinte, botones especiales, cremalleras, forros y bolsillos antes de iniciar cualquier ciclo.',
      },
      {
        numero: '02',
        titulo: 'Pretratamiento localizado en mesa de desmanchado',
        descripcion:
          'Identificamos el origen de cada mancha (proteica, grasa, tánica o tinta) y la tratamos puntualmente sin frotados agresivos que abran el tejido.',
      },
      {
        numero: '03',
        titulo: 'Limpieza en seco o Wet Cleaning según fibra',
        descripcion:
          'Seleccionamos disolvente profesional o sistema acuoso computerizado para conseguir máxima higiene respetando el tallaje y la caída original.',
      },
      {
        numero: '04',
        titulo: 'Prensado Veit, revisión y embolsado',
        descripcion:
          'Planchamos con vapor y mesas aspirantes para evitar marcas o brillos, revisamos el resultado final y avisamos para recoger en tienda o domicilio.',
      },
    ],
    consejosTitulo: 'Qué evitar antes de traernos una prenda delicada',
    consejos: [
      'No frotes manchas recientes con toallitas, lejía, amoniaco ni agua caliente: el calor y los productos alcalinos fijan el pigmento y dañan lanas o sedas.',
      'Conserva la etiqueta interior de composición y dinos qué causó la mancha o si ya intentaste limpiarla en casa para elegir el reactivo seguro.',
      'Revisa siempre bolsillos interiores (bolígrafos, tickets térmicos, bálsamos labiales o pañuelos) antes de entregar abrigos y americanas.',
    ],
    enlacesEspecializados: [
      {
        titulo: 'Vestidos de novia, fiesta, comunión y bautizo',
        descripcion:
          'Protocolo artesanal en 5 fases con revisión de pedrería y encajes, bajos rozados y puesta a punto pre-evento.',
        href: '/limpieza-vestidos-novia-ceremonia-vigo',
        cta: 'Ver especialidad de ceremonia',
      },
      {
        titulo: 'Pieles, cuero, ante, nobuk y peletería',
        descripcion:
          'Limpieza, nutrición e hidratación especializada para cazadoras y abrigos de piel bajo valoración previa.',
        href: '/limpieza-pieles-cuero-vigo',
        cta: 'Ver cuidado de pieles y cuero',
      },
      {
        titulo: 'Taller propio de costura y arreglos (18 especialidades)',
        descripcion:
          'Bajos, entallar americanas, cambiar forros o cremalleras junto con tu servicio de tintorería.',
        href: '/arreglos-de-ropa-vigo',
        cta: 'Ver taller de costura',
      },
      {
        titulo: 'Guía de símbolos de etiquetas y lavado',
        descripcion:
          'Aprende qué significan los símbolos P, F, W y las advertencias de plancha y lavado en tus prendas.',
        href: '/blog/guia-simbolos-etiquetas-ropa-significado',
        cta: 'Leer guía de etiquetas',
      },
    ],
    consultaOpcionesLabel: '¿Qué prenda necesitas llevar a tintorería?',
    consultaOpciones: [
      'Traje completo o americana + pantalón',
      'Abrigo de paño, gabardina o plumífero',
      'Vestido de fiesta, seda o prenda delicada',
      'Prenda con mancha difícil (vino, grasa, tinta...)',
      'Limpieza + arreglo de costura',
    ],
    consultaPlaceholder: 'Ej.: abrigo de lana camel con roce en cuello y dos americanas...',
    preguntasFrecuentes: [
      {
        pregunta: '¿Qué diferencia hay entre limpieza en seco y Wet Cleaning?',
        respuesta:
          'La limpieza en seco emplea solventes profesionales específicos para prendas estructuradas, entretelas sastre, lana o seda que encogerían o perderían forma en agua. El Wet Cleaning es una limpieza ecológica en agua con control informático de temperatura, detergentes biodegradables y mínima acción mecánica para tejidos delicados compatibles.',
      },
      {
        pregunta: '¿Cómo sabéis qué proceso aplicar a mi traje o abrigo?',
        respuesta:
          'Revisamos siempre la etiqueta de conservación (símbolos P, F, W o cubo de lavado), la composición real de tejido y forro, los entretelados y los botones antes de iniciar el ciclo en nuestra planta de Navia.',
      },
      {
        pregunta: '¿Revisáis botones, cremalleras y forros antes de limpiar?',
        respuesta:
          'Sí. Inspeccionamos fornituras sensibles (botones forrados, nácar, hebillas o aplicaciones) para protegerlas o desmontarlas si hace falta, y si detectamos un descosido o botón flojo podemos coordinarlo con nuestros talleres propios de costura en Gregorio Espino y Venezuela.',
      },
      {
        pregunta: '¿Qué debo hacer si mi prenda tiene una mancha reciente de vino, grasa o tinta?',
        respuesta:
          'No la frotes ni apliques remedios caseros con calor o quitamanchas agresivos. Tráela cuanto antes o envíanos una foto por WhatsApp a Mimo indicándonos qué la provocó para tratarla en mesa de desmanchado sin fijar el cerco.',
      },
      {
        pregunta: '¿Limpiáis vestidos de novia, comunión o prendas de cuero en este servicio?',
        respuesta:
          'Sí, contamos con protocolos propios diferenciados para ambas especialidades: vestidos de ceremonia en /limpieza-vestidos-novia-ceremonia-vigo y prendas de cuero, ante o nobuk en /limpieza-pieles-cuero-vigo.',
      },
      {
        pregunta: '¿Cómo consulto el precio y dónde puedo entregar las prendas en Vigo?',
        respuesta: `No publicamos tarifas genéricas sin ver la prenda. Escribe a Mimo por WhatsApp (${CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado}) indicando el tipo de pieza o acércate sin cita a nuestras ${TIENDAS_PROPIAS.length} tiendas propias en Vigo o ${PUNTOS_COLABORADORES.length} puntos colaboradores de la comarca.`,
      },
    ],
  },
  'lavanderia-profesional': {
    serviceId: 'lavanderia-profesional',
    badgeSuperior: 'Lavandería 100 % Atendida en Planta Navia (Sin Autoservicio ni Monedas)',
    aclaracionHonesta:
      'No tenemos máquinas de autoservicio con monedas ni mezclas tus prendas: nuestro equipo clasifica por color y fibra, revisa la etiqueta y aplica lavado acuoso controlado y secado completo anti-humedad en Navia. Si buscas lavar y doblar (o planchar) tu colada semanal, visita /colada-familiar-vigo; si la etiqueta pide limpieza en seco, /tintoreria-vigo.',
    modalidadesTitulo: 'Qué prendas lavamos en este servicio de lavandería en Vigo',
    modalidadesSubtitulo:
      'Atención individual por prenda para abrigos técnicos, plumíferos, jerséis delicados y recuperación de olores que en una lavadora casera o en un autoservicio corren riesgo de estropearse.',
    modalidades: [
      {
        id: 'plumiferos-anoraks',
        titulo: 'Plumíferos, anoraks y chaquetas acolchadas',
        etiqueta: 'Sin apelmazar la pluma ni el relleno',
        descripcion:
          'Lavado en programas suaves y sin suavizante para respetar las cámaras aislantes del plumón o la fibra sintética y devolverle su volumen y capacidad térmica.',
        puntos: [
          'Cero suavizantes que recubran o apelmacen el relleno interior de pluma',
          'Revisión previa de cremalleras, corchetes, puños y cuellos manchados',
          'Secado completo controlado en Navia para evitar grumos húmedos internos',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Quiero consultar el precio de lavandería para un plumífero o anorak en Vigo',
      },
      {
        id: 'tecnica-impermeable',
        titulo: 'Cazadoras impermeables y ropa técnica o deportiva',
        etiqueta: 'Programas suaves sin suavizante en membranas',
        descripcion:
          'Prendas cortavientos, impermeables y equipamiento deportivo lavables en agua, siempre revisando antes la etiqueta del fabricante y sin añadir suavizantes ni lejías.',
        puntos: [
          'Respeto a membranas transpirables y acabados técnicos según etiqueta',
          'Desmanchado localizado previo en zonas de roce antes del ciclo acuoso',
          'Secado completo controlado respetando costuras termoselladas y etiqueta',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Quiero consultar el lavado de una cazadora impermeable o prenda técnica',
      },
      {
        id: 'jerseis-olores',
        titulo: 'Jerséis delicados y eliminación de olores persistentes',
        etiqueta: 'Cuidado del punto y desodorización real',
        descripcion:
          'Lavado mecánico suave para jerséis y prendas delicadas que admiten agua, además de protocolo para eliminar olor a humedad acumulada o humo sin taparlo con perfume.',
        puntos: [
          'Separación estricta por color y fibra para evitar encogimientos o transferencias',
          'Eliminación de olor a humedad de armario en Vigo o humo (derivación a /tintoreria-vigo si exige seco)',
          'Secado profesional completo frente a la lluvia y la humedad ambiental de Vigo',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Quiero consultar el lavado de unos jerséis delicados o prendas con olor a humedad',
      },
    ],
    procesoTitulo: 'Cómo lavamos tu ropa en nuestra planta de Navia: control por prenda y cero autoservicio',
    procesoSubtitulo:
      'Tú no manipulas máquinas ni pierdes una hora vigilando ciclos: nosotros nos encargamos de todo en cuatro pasos reales.',
    procesoPasos: [
      {
        numero: '01',
        titulo: 'Clasificación por color, fibra y lectura de etiqueta',
        descripcion:
          'Evaluamos cada prenda en recepción para asignarle lavado acuoso controlado o derivarla a /tintoreria-vigo si exige limpieza en seco.',
      },
      {
        numero: '02',
        titulo: 'Desmanchado localizado previo',
        descripcion:
          'Tratamos puntualmente cuellos, puños y manchas difíciles antes del lavado en lugar de depender de un único ciclo estándar.',
      },
      {
        numero: '03',
        titulo: 'Lavado acuoso suave sin suavizantes en plumas ni membranas',
        descripcion:
          'Suprimimos suavizantes y lejías en plumíferos, anoraks y ropa técnica para proteger la membrana transpirable y el relleno aislante.',
      },
      {
        numero: '04',
        titulo: 'Secado completo anti-humedad en el clima de Vigo',
        descripcion:
          'Aseguramos el secado total desde el interior del relleno y las costuras para que no quede humedad oculta ni olor a cerrado.',
      },
    ],
    comparativaTabla: {
      titulo: 'Lavandería atendida Mimos frente a autoservicio con monedas y lavado en casa',
      subtitulo:
        'Comparativa práctica cuando lavas un plumífero, anorak, cazadora técnica o prenda delicada en Vigo.',
      columnas: [
        'Lavandería atendida Mimos (/lavanderia-vigo)',
        'Autoservicio con monedas (Vigo)',
        'Lavadora y secadora doméstica',
      ],
      filas: [
        {
          criterio: 'Operación y revisión técnica',
          valores: [
            '100 % atendida en planta de Navia: lectura de etiqueta, clasificación y desmanchado previo',
            'Autogestionada por el usuario sin cribado de etiqueta ni pretratamiento de manchas',
            'Depende del tiempo y criterio en casa para interpretar cada tejido',
          ],
        },
        {
          criterio: 'Uso de suavizantes en plumas y membranas',
          valores: [
            'Sin suavizante en plumas, anoraks ni ropa técnica para no apelmazar ni obstruir membranas',
            'Dosificación automática preconfigurada que suele incluir suavizante estándar',
            'Riesgo de restos de suavizante en el cajetín o exceso de detergente convencional',
          ],
        },
        {
          criterio: 'Espacio de tambor y trato en abrigos',
          valores: [
            'Maquinaria profesional de planta y programas suaves ajustados a cada prenda',
            'Ciclos fijos estándar orientados a volumen rápido de colada común',
            'Tambor doméstico ajustado donde los abrigos acolchados apenas flotan',
          ],
        },
        {
          criterio: 'Secado en el clima húmedo de Vigo',
          valores: [
            'Secado completo en planta hasta eliminar la humedad interna de rellenos y costuras',
            'Secado por tiempo fijo; obliga a vigilar y ahuecar manualmente en plumas',
            'En otoño e invierno en Vigo, tender en casa genera secado lento, grumos y olor a cerrado',
          ],
        },
        {
          criterio: 'Tiempo y puntos de entrega',
          valores: [
            'Solo dejas y recoges en 3 tiendas de Vigo (Navia, Gregorio Espino 42, Vigo centro Rúa de Venezuela 29 Entreplanta) o 5 puntos colaboradores, más recogida bajo mínimo',
            'Exige desplazarte y esperar o vigilar presencialmente durante el ciclo',
            'Requiere varias horas entre lavado, ciclos repetidos y tendido',
          ],
        },
        {
          criterio: 'Valoración previa',
          valores: [
            'Valoración personalizada por foto con «Mimo» por WhatsApp o en tienda antes de confirmar',
            'Pago por ciclo cerrado sin revisión ni respaldo técnico si la prenda sufre',
            'El particular asume íntegramente el riesgo sobre abrigos o jerséis delicados',
          ],
        },
      ],
    },
    consejosTitulo: 'Qué servicio elegir según tus prendas en Tintorería Mimos',
    consejos: [
      'Elige Lavandería profesional (/lavanderia-vigo) para plumíferos, anoraks, cazadoras impermeables, jerséis lavables en agua o prendas con olor persistente.',
      'Si traes la colada cotidiana semanal para lavar y doblar (o lavar y planchar), elige Colada Familiar (/colada-familiar-vigo); si solo necesitas plancha o camisas, /planchado-vigo.',
      'Si la etiqueta marca limpieza en seco o es un traje sastre o abrigo de paño, pasa por Tintorería (/tintoreria-vigo); y para edredones o cortinas, por Textiles del Hogar (/textiles-hogar-vigo).',
    ],
    enlacesEspecializados: [
      {
        titulo: 'Colada familiar (lavar y doblar o planchar)',
        descripcion:
          'La opción práctica para tu ropa semanal cotidiana, con opción combinada por prenda.',
        href: '/colada-familiar-vigo',
        cta: 'Ver colada familiar',
      },
      {
        titulo: 'Solo planchado de camisas y prendas',
        descripcion:
          'Acabado profesional en percha o doblado sin brillos para camisas, pantalones y vestidos.',
        href: '/planchado-vigo',
        cta: 'Ver solo planchado',
      },
      {
        titulo: 'Tintorería (limpieza en seco y trajes)',
        descripcion:
          'Limpieza en seco y Wet Cleaning para trajes sastre, abrigos de paño, sedas y ceremonia.',
        href: '/tintoreria-vigo',
        cta: 'Ver tintorería',
      },
      {
        titulo: 'Edredones, mantas, cortinas y estores',
        descripcion:
          'Limpieza y secado en gran formato (y desmontaje de cortinas a domicilio).',
        href: '/textiles-hogar-vigo',
        cta: 'Ver textiles del hogar',
      },
    ],
    consultaOpcionesLabel: '¿Qué prenda quieres consultar con Mimo?',
    consultaOpciones: [
      'Plumífero, anorak o parka acolchada',
      'Cazadora impermeable o prenda técnica/deportiva',
      'Jerséis delicados o prendas lavables en agua',
      'Eliminación de olor a humedad acumulada o humo',
    ],
    consultaPlaceholder: 'Ej.: Un plumífero largo y una cazadora cortavientos en zona Vigo centro...',
    preguntasFrecuentes: [
      {
        pregunta: '¿En Mimos tenéis máquinas de autoservicio con monedas o laváis vosotros las prendas?',
        respuesta:
          'En Tintorería Mimos no tenemos máquinas de autoservicio: nuestra lavandería es 100 % atendida por personal propio en nuestra planta de Navia. Tú dejas tus prendas en tienda, en un punto colaborador o mediante recogida a domicilio y nuestro equipo se encarga de clasificarlas, desmancharlas, lavarlas en agua y secarlas por completo sin que tengas que esperar en el local.',
      },
      {
        pregunta: '¿Cómo laváis un plumífero o anorak sin que se apelotone la pluma ni pierda abrigo?',
        respuesta:
          'Lavamos cada plumífero o anorak en ciclos suaves sin añadir suavizante y aplicando un secado completo controlado en planta hasta eliminar la humedad del relleno. El suavizante recubre y apelmaza el plumón anulando el aislamiento, y un secado insuficiente con la humedad de Vigo genera grumos internos y mal olor.',
      },
      {
        pregunta: '¿Podéis lavar chaquetas impermeables o ropa técnica sin estropear la membrana?',
        respuesta:
          'Sí, siempre revisamos antes la etiqueta del fabricante y aplicamos lavado acuoso en programa suave sin suavizantes ni lejías para limpiar la prenda respetando la membrana transpirable y secarla de forma segura sin dañar las costuras.',
      },
      {
        pregunta: '¿Qué prendas van a lavandería profesional en agua y cuáles pasan a otros servicios?',
        respuesta:
          'En /lavanderia-vigo lavamos plumíferos, anoraks, cazadoras técnicas, jerséis delicados lavables en agua y prendas con olor persistente. Si se trata de trajes sastre, abrigos de paño o limpieza en seco pasan a /tintoreria-vigo; la colada diaria semanal va a /colada-familiar-vigo; solo planchado o camisas a /planchado-vigo; y edredones, mantas o cortinas a /textiles-hogar-vigo.',
      },
      {
        pregunta: '¿Podéis lavar jerséis de punto o prendas delicadas sin encogerlas ni estropearlas?',
        respuesta:
          'Sí, siempre que la etiqueta admita lavado en agua seleccionamos programas mecánicos suaves y clasificamos por color y tipo de fibra para evitar encogimientos o transferencias de tinte. Si al revisar la etiqueta detectamos que requiere limpieza en seco, derivamos la prenda directamente a nuestro servicio de tintorería en la misma planta de Navia.',
      },
      {
        pregunta: '¿Podéis eliminar el olor a humedad acumulada o a humo en prendas guardadas?',
        respuesta:
          'Sí, contamos con experiencia específica en la recuperación y desodorización de prendas con olor persistente a humedad o humo. Valoramos primero el estado real del tejido en tienda o por foto y aplicamos el lavado y secado completo adecuados para eliminar el origen del olor en lugar de taparlo con perfume.',
      },
      {
        pregunta: '¿Por qué no publicáis precios fijos en la web y cómo pido presupuesto o sé el plazo?',
        respuesta:
          'No publicamos tarifas estándar cerradas porque el importe depende de cada prenda, su composición, el relleno y las manchas que presente. Envía una foto de tu prenda y su etiqueta por WhatsApp a Mimo (655 536 844) o acércate a nuestras tiendas en Vigo para recibir tu presupuesto y confirmar el plazo estimado al entregarla.',
      },
      {
        pregunta: '¿Dónde puedo entregar mis prendas en Vigo o comarca y cómo funciona la recogida a domicilio?',
        respuesta:
          'Puedes entregar y recoger sin pedido mínimo en nuestras 3 tiendas propias de Vigo —Navia (C/ Teixugueiras 11 bajo 9), Gregorio Espino 42 y Vigo centro en Rúa de Venezuela 29, Entreplanta (entorno Urzáiz y Gran Vía)— o en nuestros 5 puntos colaboradores: D’Passo (Vigo As Travesas, Camiño Espedrigada 9), Redondela, Gondomar, Ponteareas y O Porriño. La recogida y entrega a domicilio está sujeta a importe mínimo consultable con Mimo por WhatsApp.',
      },
    ],
  },
  'planchado-profesional': {
    serviceId: 'planchado-profesional',
    badgeSuperior: 'Solo Planchado Profesional o Lavado + Plancha · Sin brillos',
    aclaracionHonesta:
      'Puedes traer tus prendas ya lavadas de casa para contratar únicamente el planchado profesional, o encargar el lavado y planchado completo. Entregamos en percha o doblado para maleta o cajón.',
    modalidadesTitulo: 'Acabado de plancha profesional adaptado a cómo usas y guardas tu ropa',
    modalidadesSubtitulo:
      'Trabajamos con prensas, vapor profesional y mesas aspirantes Veit para dejar cada prenda impecable sin dañar las fibras ni sacar brillos.',
    modalidades: [
      {
        id: 'solo-planchado',
        titulo: 'Solo planchado (ropa ya lavada)',
        etiqueta: 'Traes tus prendas limpias de casa',
        descripcion:
          'Ideal cuando tú pones la lavadora pero quieres ahorrarte horas frente a la tabla y conseguir un resultado uniforme en camisas, pantalones y vestidos.',
        puntos: [
          'Cuellos, puños, tapetas y costuras marcadas con vapor profesional',
          'Pantalones de pinzas y americanas sin brillos ni marcas de plancha doméstica',
          'Sin pedido mínimo en cualquiera de nuestras 3 tiendas propias o puntos colaboradores',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Quiero consultar el precio de solo planchado para unas camisas o prendas ya lavadas',
      },
      {
        id: 'percha-o-doblado',
        titulo: 'Entrega en percha o doblada según necesites',
        etiqueta: 'Lista para colgar o viajar en maleta',
        descripcion:
          'Preparamos las camisas, blusas, americanas y vestidos en percha para el armario, o cuidadosamente doblados si necesitas transportarlos en maleta.',
        puntos: [
          'Perchas suministradas por Mimos listas para guardar directamente en tu vestidor',
          'Doblado compacto para viajes de trabajo o falta de espacio en barra',
          'Ropa de hogar (sábanas, fundas nórdicas y mantelerías) doblada en formato armario',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Quiero consultar el planchado de un lote de ropa de trabajo y ropa de hogar',
      },
      {
        id: 'puesta-punto-eventos',
        titulo: 'Vaporizado pre-evento y tejidos delicados',
        etiqueta: 'Bodas, comuniones y ropa de ceremonia',
        descripcion:
          'Si tienes un vestido de fiesta, traje, chaqué o camisa de ceremonia arrugada del portatrajes o un viaje, la vaporizamos sin brillos antes del evento.',
        puntos: [
          'Seguro en seda, gasa, tul, lino natural, lana fría y aplicaciones delicadas',
          'Eliminación de pliegues de maleta o funda de tienda antes de la sesión de fotos',
          'Coordinación con nuestros talleres de costura si detectas un botón o bajo pendiente',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Necesito solo planchar o vaporizar un traje o vestido antes de un evento',
      },
    ],
    procesoTitulo: 'Por qué el planchado profesional dura más y no saca brillos',
    procesoSubtitulo:
      'La diferencia entre una plancha doméstica y una mesa aspirante con caldera profesional se nota al primer vistazo.',
    procesoPasos: [
      {
        numero: '01',
        titulo: 'Clasificación por temperatura y tejido',
        descripcion:
          'Agrupamos sedas, viscosas, linos, algodones y lanas frías para ajustar presión de vapor y temperatura exacta sin riesgos.',
      },
      {
        numero: '02',
        titulo: 'Vapor a presión y mesas aspirantes Veit',
        descripcion:
          'El vapor penetra en la fibra para alisar sin aplastar el hilo y la aspiración fija el acabado al instante en seco, evitando brillos.',
      },
      {
        numero: '03',
        titulo: 'Remate manual de zonas clave',
        descripcion:
          'Repasamos cuellos, puños, botones ocultos, pinzas, hombros de americanas y caídas de vestidos o faldas.',
      },
      {
        numero: '04',
        titulo: 'Presentación en percha o doblada sin arrugas',
        descripcion:
          'Preparamos el pedido en percha o doblado con papel de protección cuando hace falta para que llegue intacto a casa.',
      },
    ],
    consejosTitulo: 'Consejos prácticos para traer tu ropa a solo planchar',
    consejos: [
      'Asegúrate de que las prendas vengan limpias y completamente secas: si alguna trae una mancha pendiente, consúltanos antes porque el calor del planchado puede fijarla.',
      'Indica al entregar si prefieres las camisas en percha o dobladas para maleta/cajón.',
      'Si tu prenda viene aún por lavar, puedes optar directamente por nuestro servicio de Lavandería o Colada familiar en modalidad lavar y planchar.',
    ],
    enlacesEspecializados: [
      {
        titulo: 'Planchado pre-evento de vestidos de novia, fiesta y chaqués',
        descripcion:
          'Puesta a punto al vapor antes de bodas, comuniones y eventos sin marcar tul, gasa o lana fría.',
        href: '/limpieza-vestidos-novia-ceremonia-vigo#planchado-antes-evento',
        cta: 'Ver planchado pre-evento',
      },
      {
        titulo: 'Colada familiar (lavar y planchar o combinada)',
        descripcion:
          'Delega también el lavado y secado y elige qué prendas van dobladas y cuáles planchadas.',
        href: '/colada-familiar-vigo',
        cta: 'Ver colada familiar',
      },
      {
        titulo: 'Lavandería profesional atendida',
        descripcion:
          'Lavado profesional por prenda si prefieres entregarnos la ropa sin lavar antes.',
        href: '/lavanderia-vigo',
        cta: 'Ver servicio de lavandería',
      },
      {
        titulo: 'Cortinas y estores de tela con vapor vertical',
        descripcion:
          'Desmontaje, lavado, planchado y colocación de cortinajes en Vigo.',
        href: '/textiles-hogar-vigo',
        cta: 'Ver textiles del hogar',
      },
    ],
    consultaOpcionesLabel: '¿Qué quieres planchar con Mimos?',
    consultaOpciones: [
      'Solo planchado de lote de camisas / blusas',
      'Solo planchado de pantalones, faldas o trajes',
      'Planchado de sábanas, fundas nórdicas o mantelería',
      'Vaporizado pre-evento (vestido, invitada o chaqué)',
      'Lavado + planchado completo',
    ],
    consultaPlaceholder: 'Ej.: 6 camisas de vestir en percha y 2 pantalones de pinzas...',
    preguntasFrecuentes: [
      {
        pregunta: '¿Puedo contratar solo el planchado trayendo la ropa ya lavada de casa?',
        respuesta:
          'Sí. El servicio de solo planchado está pensado precisamente para eso: nos traes tus prendas limpias y secas y nosotros las planchamos con equipos profesionales.',
      },
      {
        pregunta: '¿Entregáis las camisas en percha o dobladas?',
        respuesta:
          'Como tú prefieras: entregamos camisas, blusas, vestidos y chaquetas en percha listas para el armario (ponemos nuestras perchas), o dobladas si vas a viajar en maleta o prefieres guardarlas en cajón.',
      },
      {
        pregunta: '¿Cómo evitáis que queden brillos en pantalones oscuros o americanas?',
        respuesta:
          'Trabajamos con mesas aspirantes, suelas de teflón y vapor profesional controlado que relaja la fibra sin aplastar ni quemar el tejido superficial.',
      },
      {
        pregunta: '¿Plancháis sábanas grandes, mantelerías o vestidos antes de una boda?',
        respuesta:
          'Sí, planchamos ropa de hogar de gran formato (sábanas, fundas nórdicas, manteles) y realizamos puesta a punto al vapor previa a ceremonias para quitar arrugas de portatrajes o viaje.',
      },
      {
        pregunta: '¿Cómo consulto el precio para mi lote de planchado?',
        respuesta: `Escríbenos por WhatsApp a Mimo (${CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado}) indicando cuántas camisas, pantalones o piezas quieres planchar y te orientamos al instante antes de acercarte a tienda.`,
      },
    ],
  },
  'colada-familiar': {
    serviceId: 'colada-familiar',
    badgeSuperior: 'Lavar y doblar · Lavar y planchar · Combinada por prenda',
    aclaracionHonesta:
      'Nos adaptamos exactamente a tu semana: puedes elegir lavar y doblar, lavar y planchar o combinar ambas en una misma entrega eligiendo qué prendas concretas quieres planchadas (por ejemplo, una camisa planchada y el resto de tu colada doblada). No publicamos tarifas genéricas por kilo; Mimo valora cada volumen de forma clara.',
    modalidadesTitulo: 'Dos modalidades principales y libertad para combinar por prenda',
    modalidadesSubtitulo:
      'Tú decides si quieres toda la colada doblada, toda planchada o indicar qué piezas concretas necesitan plancha dentro del mismo lote.',
    modalidades: [
      {
        id: 'lavar-y-doblar',
        titulo: 'Modalidad 1 · Lavar y doblar',
        etiqueta: 'Ropa cotidiana lista para guardar',
        descripcion:
          'Lavamos tu ropa diaria, la secamos por completo en planta y te la entregamos doblada y clasificada para meterla directamente en cajones y baldas.',
        puntos: [
          'Camisetas, pantalones de diario, ropa interior, pijamas, sudaderas, toallas y sábanas cotidianas',
          'Secado 100 % garantizado frente a la humedad habitual de Vigo (sin olor a cerrado)',
          'Ahorra horas de lavadora, tendal y doblado cada semana',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Quiero consultar las condiciones de la colada familiar en modalidad lavar y doblar',
      },
      {
        id: 'lavar-y-planchar',
        titulo: 'Modalidad 2 · Lavar y planchar',
        etiqueta: 'Colada completa lavada, seca y planchada',
        descripcion:
          'La solución integral para olvidarte por completo de la ropa semanal: lavado, secado completo y planchado profesional de todas las prendas del lote.',
        puntos: [
          'Acabado profesional con vapor tanto en prendas de vestir cotidianas como en ropa de cama',
          'Entrega en percha o doblada según el tipo de prenda',
          'Ideal para semanas con poco tiempo, cambios de estación o vuelta de vacaciones',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Quiero consultar el servicio de colada familiar en modalidad lavar y planchar',
      },
      {
        id: 'modalidad-combinada',
        titulo: 'Opción combinada · Elige prenda a prenda',
        etiqueta: 'Doblado + planchado solo donde tú quieras',
        descripcion:
          '¿Traes ropa interior, camisetas y además una o varias camisas o pantalones? Puedes pedir el grueso de la colada doblada y que planchemos solo esas prendas concretas.',
        puntos: [
          'Ejemplo real: ropa interior, calcetines y camisetas dobladas + camisas planchadas',
          'Pagas solo por el planchado de las piezas que realmente quieres planchar',
          'Flexibilidad total al entregar en mostrador o al hablar con Mimo',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Quiero entregar una colada combinando ropa doblada y planchar solo algunas prendas concretas',
      },
    ],
    procesoTitulo: 'Cómo funciona tu colada familiar en Mimos de principio a fin',
    procesoSubtitulo:
      'Proceso pensado para familias, personas con poco tiempo y pisos de Vigo donde tender en casa es un problema.',
    procesoPasos: [
      {
        numero: '01',
        titulo: 'Eliges modalidad al entregar o por WhatsApp',
        descripcion:
          'Nos indicas si va todo a lavar y doblar, lavar y planchar, o separas las prendas concretas (como camisas) que quieres planchadas.',
      },
      {
        numero: '02',
        titulo: 'Clasificación de colores y lavado en planta',
        descripcion:
          'Separamos tu colada en nuestras instalaciones para evitar traslados de tinte y aplicamos programas higiénicos adaptados a uso diario.',
      },
      {
        numero: '03',
        titulo: 'Secado completo anti-humedad',
        descripcion:
          'Con un promedio del 77 % de humedad anual en Vigo, nuestro secado en planta deja toallas, vaqueros y sudaderas totalmente secos hasta las costuras.',
      },
      {
        numero: '04',
        titulo: 'Doblado ordenado o plancha lista para armario',
        descripcion:
          'Entregamos todo clasificado, doblado o en percha en nuestras 3 tiendas de Vigo, puntos colaboradores o mediante recogida a domicilio con Mimo.',
      },
    ],
    consejosTitulo: 'Qué entra en Colada Familiar y qué va por servicio especializado',
    consejos: [
      'En Colada Familiar entra tu ropa cotidiana lavable en agua que no requiere tratamiento individual de tintorería ni desmanchado complejo.',
      'Trajes de chaqueta, vestidos de seda o fiesta, abrigos de paño y prendas con manchas difíciles se tratan aparte en Tintorería (/tintoreria-vigo) para proteger cada tejido.',
      'Para edredones nórdicos, mantas gruesas, cortinas o estores de tela trabajamos lavado en gran formato en Textiles del Hogar (/textiles-hogar-vigo).',
    ],
    enlacesEspecializados: [
      {
        titulo: 'Solo planchado profesional',
        descripcion:
          'Si ya lavaste en casa y quieres planchar un lote de camisas, pantalones o sábanas.',
        href: '/planchado-vigo',
        cta: 'Ver solo planchado',
      },
      {
        titulo: 'Edredones nórdicos, mantas, cortinas y estores',
        descripcion:
          'Maquinaria de gran formato para rellenos voluminosos y servicio de retirada de cortinas en casa.',
        href: '/textiles-hogar-vigo',
        cta: 'Ver textiles del hogar',
      },
      {
        titulo: 'Tintorería profesional (trajes y prendas delicadas)',
        descripcion:
          'Limpieza en seco y Wet Cleaning para prendas que requieren tratamiento individual.',
        href: '/tintoreria-vigo',
        cta: 'Ver tintorería',
      },
      {
        titulo: '¿Compensa hacer toda la colada en casa?',
        descripcion:
          'Análisis práctico de tiempos, consumo eléctrico, secado y humedad en nuestro blog.',
        href: '/blog/la-colada-en-casa',
        cta: 'Leer análisis completo',
      },
    ],
    consultaOpcionesLabel: '¿Qué modalidad prefieres consultar con Mimo?',
    consultaOpciones: [
      'Lavar y doblar (ropa cotidiana lista para armario)',
      'Lavar y planchar (colada completa planchada)',
      'Combinada (ropa doblada + planchar camisas/prendas concretas)',
      'Colada semanal con recogida y entrega a domicilio',
    ],
    consultaPlaceholder: 'Ej.: 1 bolsa semanal con ropa diaria doblada y 3 camisas planchadas...',
    preguntasFrecuentes: [
      {
        pregunta: '¿Qué modalidades tiene el servicio de colada familiar en Tintorería Mimos?',
        respuesta:
          'Disponemos de dos modalidades principales —Lavar y doblar (ropa limpia, seca y doblada lista para guardar) y Lavar y planchar (colada completa lavada, seca y planchada)— además de la opción combinada por prenda dentro del mismo encargo.',
      },
      {
        pregunta: '¿Puedo pedir la colada doblada y que me planchéis solo algunas prendas como una camisa?',
        respuesta:
          'Sí, exactamente. Si traes por ejemplo ropa interior, camisetas, toallas y una o varias camisas, puedes elegir que el resto de la colada vaya doblada y que únicamente las camisas o las prendas que nos indiques vayan planchadas.',
      },
      {
        pregunta: '¿Qué tipo de ropa entra en la colada familiar y cuál debe ir por tintorería?',
        respuesta:
          'Entra la ropa de diario lavable en agua (camisetas, pantalones cotidianos, ropa interior, pijamas, sudaderas, sábanas y toallas de uso diario). Los trajes, vestidos delicados, abrigos de paño, pieles y manchas difíciles se atienden por tintorería individual, y los edredones o cortinas por textiles del hogar en gran formato.',
      },
      {
        pregunta: '¿Tenéis un precio cerrado por kilo publicado en la web?',
        respuesta: `No publicamos precios cerrados genéricos por kilo en la web porque valoramos la modalidad elegida (lavar y doblar, lavar y planchar o combinada), el volumen real y el tipo de prendas. Puedes consultar las condiciones al momento con Mimo por WhatsApp (${CANALES_CONTACTO_CENTRAL.whatsappNumeroMostrado}).`,
      },
      {
        pregunta: '¿La ropa vuelve seca del todo frente a la humedad de Vigo?',
        respuesta:
          'Sí. Secamos la colada por completo en nuestra planta de Navia antes de doblarla o plancharla, evitando que coja olor a humedad o tarde días en secar en casa durante el otoño e invierno en Vigo.',
      },
      {
        pregunta: '¿Dónde entrego mi colada o cómo solicito recogida a domicilio?',
        respuesta: `Puedes entregarla sin pedido mínimo en nuestras ${TIENDAS_PROPIAS.length} tiendas propias de Vigo (Navia, Venezuela y Gregorio Espino) o en los ${PUNTOS_COLABORADORES.length} puntos colaboradores de Vigo As Travesas, Redondela, Gondomar, Ponteareas y O Porriño. También ofrecemos recogida a domicilio según zona e importe mínimo consultando con Mimo.`,
      },
    ],
  },
};

export const SERVICIO_EMPRESAS_B2B_DATA = {
  badgeSuperior: 'LAVANDERÍA Y TINTORERÍA PARA EMPRESAS · PLANTA PROPIA EN VIGO',
  h1: 'Lavandería y tintorería para empresas, peluquerías y clínicas en Vigo',
  subtitulo:
    'Lavamos, secamos y planchamos las toallas, batas y uniformes propios de tu negocio en nuestra planta de Navia, siempre en carros separados y sin obligarte a contratar renting de lencería ni grandes contratos. La alternativa local y directa frente a la gran lavandería industrial.',
  microResumenHero:
    'Tus propias prendas en lotes separados · Sin permanencia · 3 tiendas en Vigo (Navia, Gregorio Espino y Venezuela) o recogida · Factura mensual con CIF',
  sectoresTitulo: 'Qué prendas profesionales cuidamos para tu negocio',
  sectoresSubtitulo:
    'Cada negocio tiene un tejido y una rotación distinta. Trabajamos sobre tus propias prendas para que recuperes exactamente tu stock, sin alquiler impuesto.',
  sectores: [
    {
      id: 'peluquerias-estetica',
      etiqueta: 'Peluquerías · Barberías · Estética',
      titulo: 'Toallas, capas, kimonos y batas de cabina',
      descripcion:
        'Olvídate de poner lavadoras en la rebotica y tender con la humedad de Vigo: tus toallas salen completamente secas, con tacto agradable y listas para el siguiente cliente.',
      items: [
        'Toallas de mano, tocador y lavacabezas en rotación continua',
        'Capas de corte, kimonos y batas del equipo',
        'Secado completo en planta para evitar el olor a cerrado en el local',
      ],
      whatsappTexto:
        'Hola, Mimo. Tengo una peluquería o centro de estética en Vigo y quiero valorar el lavado de toallas, capas o batas con nuestras propias prendas.',
    },
    {
      id: 'clinicas-sanitario',
      etiqueta: 'Clínicas · Fisioterapia · Veterinaria',
      titulo: 'Batas, casacas, toallas y sábanas de camilla',
      descripcion:
        'Procesamos la lencería propia de tu consulta por separado —siempre con suciedad habitual de trabajo, sin material biológico ni infeccioso— con aclarado profundo y acabado en planchas de vapor.',
      items: [
        'Batas médicas, pijamas sanitarios y casacas de consulta',
        'Toallas, cubrecamillas y sábanas de fisioterapia, podología o dental',
        'Prendas de clínicas veterinarias con suciedad habitual',
      ],
      whatsappTexto:
        'Hola, Mimo. Consulto por lavandería para una clínica o centro de fisioterapia en Vigo (batas, toallas o camillas con suciedad habitual).',
    },
    {
      id: 'comercios-oficinas-laboral',
      etiqueta: 'Comercios · Oficinas · Gimnasios · Laboral',
      titulo: 'Uniformes corporativos y vestuario con suciedad normal',
      descripcion:
        'Lavado en agua o limpieza en seco según cada etiqueta y acabado profesional en planchas de vapor para reforzar la imagen diaria de tu equipo.',
      items: [
        'Trajes corporativos, americanas, camisas y blusas de comercio u oficina',
        'Polos, sudaderas, chaquetas, pantalones de trabajo y toallas de gimnasio',
        'Vestuario laboral con suciedad habitual (sin grasa pesada de motor)',
      ],
      whatsappTexto:
        'Hola, Mimo. Quiero pedir valoración para el lavado y planchado de uniformes o ropa laboral de nuestra empresa en Vigo.',
    },
    {
      id: 'pequenos-lotes-cocina',
      etiqueta: 'Pequeños lotes · Eventos · Cocina puntual',
      titulo: 'Chaquetillas, mandiles y piezas concretas',
      descripcion:
        'Si necesitas cuidar prendas sueltas o pequeños lotes de cocina, sala o eventos sin atarte a contratos de gran volumen industrial, te atendemos sin problema.',
      items: [
        'Chaquetillas de cocina, mandiles y uniformes de atención',
        'Pequeños lotes puntuales (por ejemplo, 2 o 3 manteles o servilletas)',
        'Atención directa sin exigir grandes sacas ni volúmenes de hotel',
      ],
      whatsappTexto:
        'Hola, Mimo. Quiero consultar el lavado o planchado de un pequeño lote de prendas para restaurante o evento en Vigo.',
    },
  ],
  procesoPlantaTitulo: 'Así lavamos y acabamos tus textiles en nuestra planta propia de Navia',
  procesoPlantaSubtitulo:
    'Cinco pasos operativos reales pensados para conservar tus prendas propias sin mezclas, sin pérdidas y sin humedad residual.',
  procesoPlanta: [
    {
      numero: '01',
      titulo: 'Separación en carros de lavado',
      descripcion:
        'Clasificamos y mantenemos las prendas de cada negocio separadas mediante carros de lavado para no mezclar cargas entre clientes.',
    },
    {
      numero: '02',
      titulo: 'Marcado de prendas repetidas',
      descripcion:
        'Cuando hay prendas repetidas o similares entre piezas, las marcamos e identificamos para mantener la trazabilidad completa y evitar pérdidas.',
    },
    {
      numero: '03',
      titulo: 'Lavado en agua o limpieza en seco',
      descripcion:
        'Combinamos lavado profesional en agua y limpieza en seco según el tejido, con aclarado profundo para cuidar tanto las fibras como el tacto de cada pieza.',
    },
    {
      numero: '04',
      titulo: 'Secado completo frente al clima de Vigo',
      descripcion:
        'Garantizamos secado integral en planta para que los rizos gruesos, costuras y batas salgan listos para guardar sin riesgo de olor a humedad.',
    },
    {
      numero: '05',
      titulo: 'Acabado con planchas de vapor',
      descripcion:
        'Planchamos batas, casacas, camisas, pantalones y manteles puntuales en nuestras planchas de vapor para entregar una imagen impecable.',
    },
  ],
  exclusividadTitulo: 'Por qué cuidamos tus prendas por separado y a la medida de tu negocio',
  exclusividadSubtitulo:
    'Nuestro foco en lotes controlados protege directamente la limpieza, el tacto y la durabilidad de la ropa de tu empresa.',
  exclusividadPuntos: [
    {
      id: 'sin-renting',
      titulo: 'Trabajamos sobre tu propia ropa, sin renting ni permanencia',
      descripcion:
        'A diferencia de las grandes lavanderías industriales orientadas al alquiler de lencería estándar, cuotas rígidas o toneladas de hotel, lavamos las prendas propias de tu negocio sin contratos de permanencia. Conservas tus colores corporativos, bordados y toallas, y recuperas siempre exactamente tu ropa.',
    },
    {
      id: 'bombos-protegidos',
      titulo: 'Bombos dedicados solo a suciedad habitual y sin riesgo biológico',
      descripcion:
        'Para proteger la higiene y el tacto de batas clínicas, toallas de estética y uniformes de comercio, procesamos exclusivamente suciedad normal. Dejamos fuera buzos o fundas de taller mecánico con grasa pesada de motor, aceites minerales o pinturas industriales, material biológico o infeccioso regulado y grandes contratos de sábanas o mantelerías de hotel.',
    },
    {
      id: 'ritmo-adaptado',
      titulo: 'Ritmo de servicio y valoración adaptados a tu local',
      descripcion:
        'Cada peluquería, clínica o despacho tiene una rotación distinta. En lugar de imponer tarifas rígidas o plazos estándar iguales para todos, Mimo valora directamente tus prendas, el volumen real y la frecuencia que mejor encaja contigo.',
    },
  ],
  ventajasTitulo: 'Tres tiendas en Vigo o recogida en tu local y factura mensual con CIF',
  ventajas: [
    {
      numero: '01',
      titulo: 'Entrega flexible en Vigo',
      descripcion:
        'Puedes entregar y recoger directamente en nuestras 3 tiendas propias —Navia (C/ Teixugueiras 11 bajo 9), Gregorio Espino 42 y Rúa de Venezuela 29, Entreplanta (Vigo centro)— o acordar recogida y entrega en tu local con Mimo según volumen y ruta.',
    },
    {
      numero: '02',
      titulo: 'Cadencia adaptada a tu rotación',
      descripcion:
        'Con los clientes habituales ajustamos días de entrega y recogida directamente a la necesidad operativa de su negocio, sin promesas cerradas irreales.',
    },
    {
      numero: '03',
      titulo: 'Sin permanencia y factura mensual con CIF',
      descripcion: `Sin contratos de permanencia ni cuotas fijas: pagas solo por las prendas enviadas y emitimos factura mensual agrupada con CIF a nombre de ${CONTACT_INFO.legalName} (CIF ${CONTACT_INFO.cif}).`,
    },
    {
      numero: '04',
      titulo: 'Control real sin pérdidas',
      descripcion:
        'El uso de carros de lavado por lote y el marcado de prendas repetidas asegura que tus toallas, batas y uniformes vuelvan siempre completos.',
    },
  ],
  preguntasFrecuentes: [
    {
      pregunta: '¿Laváis las toallas y batas propias de mi negocio o tengo que contratar renting textil?',
      respuesta:
        'Lavamos las prendas propias de tu negocio sin obligarte a alquilar lencería ni contratar un servicio de renting. Conservas tus toallas corporativas, kimonos, batas bordadas o uniformes y evitas depender de contratos pensados para grandes volúmenes.',
    },
    {
      pregunta: '¿Mezcláis nuestras prendas con ropa de otros negocios o se pueden extraviar?',
      respuesta:
        'No mezclamos lotes entre clientes: en nuestra planta propia de Navia utilizamos carros de lavado para separar la ropa de cada negocio, y cuando existen prendas repetidas las marcamos de forma controlada para evitar confusiones y asegurar que no haya pérdidas.',
    },
    {
      pregunta: '¿Qué ropa laboral aceptáis y qué pasa con buzos de taller con grasa o material biológico?',
      respuesta:
        'Lavamos y planchamos uniformes corporativos, trajes de empresa, camisas, polos, chaquetas, batas de consulta, toallas, sábanas de camilla, mandiles y pequeños lotes puntuales de chaquetillas o 2–3 manteles con suciedad habitual. Para proteger la higiene de los bombos, dejamos fuera buzos o fundas con grasa pesada de motor, aceites minerales o pinturas industriales, así como material biológico o infeccioso.',
    },
    {
      pregunta: '¿Trabajáis grandes volúmenes de mantelería o sábanas de hoteles y restaurantes?',
      respuesta:
        'No competimos en contratos de gran volumen industrial (toneladas de sábanas de hotel o grandes banquetes). Sí atendemos sin problema lotes pequeños o piezas sueltas como chaquetillas de cocina, mandiles o 2 o 3 manteles puntuales.',
    },
    {
      pregunta: '¿Cómo funciona la recogida y entrega en Vigo para una peluquería, clínica o comercio pequeño?',
      respuesta: `Puedes entregar y recoger directamente en nuestras ${TIENDAS_PROPIAS.length} tiendas propias de Vigo —Navia (C/ Teixugueiras 11 bajo 9), Gregorio Espino 42 y Rúa de Venezuela 29, Entreplanta (Vigo centro)— o acordar con Mimo por WhatsApp la recogida y entrega en tu local según el volumen y la ruta disponible.`,
    },
    {
      pregunta: '¿Emitís factura mensual agrupada con CIF y exigís permanencia?',
      respuesta: `Sí emitimos factura mensual agrupada con los datos fiscales y CIF de tu empresa o actividad como autónomo desde ${CONTACT_INFO.legalName} (${CONTACT_INFO.cif}). No exigimos contratos de permanencia ni cuotas fijas mensuales: pagas únicamente por las prendas que envías.`,
    },
    {
      pregunta: '¿Cómo se calculan las tarifas y el ritmo de entrega para empresas?',
      respuesta:
        'Cada negocio recibe una valoración personalizada y una frecuencia de recogida y entrega adaptada a su volumen real y tipo de prenda. Contactando con Mimo por WhatsApp revisamos tu rotación semanal para ajustar el servicio a medida, sin tarifas estándar cerradas ni plazos rígidos iguales para todos.',
    },
    {
      pregunta: '¿En esta misma página contratamos lavandería de apartamentos turísticos o limpieza de oficinas?',
      respuesta:
        'No; esta página se centra exclusivamente en la lavandería y tintorería de vestuario laboral y lencería de peluquerías, clínicas, comercios y autónomos. Si gestionas pisos turísticos disponemos de sección propia en /limpieza-apartamentos-turisticos-vigo, y para limpieza de despachos o locales en /limpieza-profesional-vigo.',
    },
    {
      pregunta: '¿Compensa externalizar frente a lavar toallas o batas en la lavadora del local?',
      respuesta:
        'Para la mayoría de peluquerías, clínicas y comercios en Vigo, sí: evitas dedicar horas del equipo a poner lavadoras, tender o planchar, reduces el consumo de agua, luz y desgaste en máquinas domésticas, y eliminas el riesgo de secado lento y olor a humedad en invierno. En nuestra planta de Navia las prendas salen completamente secas y acabadas en planchas de vapor.',
    },
  ],
} as const;









