/**
 * FUENTE ÚNICA DE VERDAD: DATOS MAESTROS COMERCIALES Y CORPORATIVOS
 * TINTORERÍA MIMOS NAVIA, S.L.
 *
 * Fase 2: Normalización y centralización de datos maestros comerciales.
 * Distingue estrictamente entre Tiendas Propias (3) y Establecimientos Colaboradores (5).
 * Los datos no confirmados se marcan como PENDIENTE sin inventar información.
 */

export type CategoriaEstablecimiento = 'tienda_propia' | 'establecimiento_colaborador';
export type TramoHorario = [string, string];

export interface HorarioSemanal {
  zona_horaria: string;
  lunes: TramoHorario[];
  martes: TramoHorario[];
  miercoles: TramoHorario[];
  jueves: TramoHorario[];
  viernes: TramoHorario[];
  sabado: TramoHorario[];
  domingo: TramoHorario[];
  resumen: string;
}

export interface CoordenadasGPS {
  latitud: number;
  longitud: number;
}

export interface TiendaPropia {
  id: string;
  activo: boolean;
  categoria: 'tienda_propia';
  tipoLegacy: 'tienda';
  esSedeCentral: boolean;
  nombreComercio: string;
  nombreMostrado: string;
  localidad: string;
  provincia: string;
  zonaSlug: string;
  direccion: string;
  codigoPostal: string;
  coordenadas: CoordenadasGPS;
  telefono: string;
  telefonoMostrado: string;
  telefonoHref: string;
  telefonoInternacional: string;
  horario: HorarioSemanal;
  serviciosConfirmados: string[];
  arreglosConfirmados: string[];
  diasDeRuta: string;
  plazo: string;
  horaLimite: string;
  instrucciones: string;
  foto: string;
  referenciaLocal: string;
  aparcamiento: string;
  cierreTemporal: boolean;
  notaDiscrepancia?: string;
}

export interface EstablecimientoColaborador {
  id: string;
  activo: boolean;
  categoria: 'establecimiento_colaborador';
  tipoLegacy: 'punto';
  nombreComercio: string;
  nombreMostrado: string;
  localidad: string;
  provincia: string;
  zonaSlug: string;
  direccion: string;
  codigoPostal: string;
  coordenadas: CoordenadasGPS;
  telefono: string;
  telefonoMostrado: string;
  telefonoHref: string;
  telefonoInternacional: string;
  horario: HorarioSemanal;
  tieneCosturaEnLocal: boolean;
  serviciosConfirmados: string[];
  arreglosConfirmados: string[];
  diasDeRuta: string;
  plazo: string;
  horaLimite: string;
  instrucciones: string;
  foto: string;
  referenciaLocal: string;
  aparcamiento: string;
  cierreTemporal: boolean;
}

export interface DatosLegalesEmpresa {
  razonSocial: string;
  nombreComercial: string;
  cif: string;
  cifEstado: 'CONFIRMADO' | 'PENDIENTE';
  registroMercantil: string;
  registroMercantilEstado: 'CONFIRMADO' | 'PENDIENTE_DATOS_REGISTRALES';
  tomo?: string;
  libro?: string;
  folio?: string;
  seccion?: string;
  hoja?: string;
  inscripcion?: string;
  fechaInscripcionRegistral?: string;
  fechaComienzoOperaciones?: string;
  domicilioSocial: string;
  localidad: string;
  codigoPostal: string;
  provincia: string;
  pais: string;
  emailLegal: string;
  emailLegalHref: string;
  canalEtico: string;
}

export interface CanalesContactoCentral {
  telefonoPrincipal: string;
  telefonoPrincipalMostrado: string;
  telefonoPrincipalHref: string;
  telefonoPrincipalInternacional: string;
  whatsappNumero: string;
  whatsappNumeroMostrado: string;
  whatsappBaseHref: string;
  emailAtencion: string;
  emailAtencionHref: string;
  webOficial: string;
  appClientes: string;
}

export interface DiscrepanciaRegistrada {
  campo: string;
  solicitudInicial: string;
  valorActivoEnCodigo: string;
  estado: 'PENDIENTE_DE_CONFIRMACION' | 'CONFIRMADA_Y_CERRADA';
  observaciones: string;
}

/* =======================================================================
   1. CANALES DE CONTACTO CENTRALES (VERIFICADOS)
   ======================================================================= */
export const CANALES_CONTACTO_CENTRAL: CanalesContactoCentral = {
  telefonoPrincipal: '986125141',
  telefonoPrincipalMostrado: '986 12 51 41',
  telefonoPrincipalHref: 'tel:+34986125141',
  telefonoPrincipalInternacional: '+34986125141',
  whatsappNumero: '655536844',
  whatsappNumeroMostrado: '655 536 844',
  whatsappBaseHref: 'https://wa.me/34655536844',
  emailAtencion: 'info@tintoreriamimos.es',
  emailAtencionHref: 'mailto:info@tintoreriamimos.es',
  webOficial: 'https://www.tintoreriamimos.es',
  appClientes: 'Wash In Town',
};

/* =======================================================================
   2. DATOS LEGALES Y REGISTRALES (LSSI-CE / RGPD / BORME)
   ======================================================================= */
export const DATOS_LEGALES_EMPRESA: DatosLegalesEmpresa = {
  razonSocial: 'Tintorería Mimos Navia, S.L.',
  nombreComercial: 'Tintorería Mimos Navia',
  cif: 'B27755925',
  cifEstado: 'CONFIRMADO',
  registroMercantil:
    'Inscrita en el Registro Mercantil de Pontevedra, Tomo 3698, Libro 3698, Folio 170, Sección 8, Hoja PO-51054, Inscripción 1ª (28.03.11)',
  registroMercantilEstado: 'CONFIRMADO',
  tomo: '3698',
  libro: '3698',
  folio: '170',
  seccion: '8',
  hoja: 'PO-51054',
  inscripcion: '1',
  fechaInscripcionRegistral: '28/03/2011',
  fechaComienzoOperaciones: '25/03/2011',
  // NOTA REGISTRAL: El objeto social inicial recogido en el BORME de 2011 ('Dar servicios de lavandería y tintorería...')
  // tuvo modificaciones posteriores (2012/2014) y no se utiliza como dato activo vigente.
  // Los datos corporativos y fiscales vigentes contrastados de la entidad son:
  // Razón social: Tintorería Mimos Navia, S.L. | CIF: B27755925 | Domicilio: C/ Teixugueiras, 11, bajo 9, 36212 Vigo.
  domicilioSocial: 'C/ Teixugueiras, 11, bajo 9',
  localidad: 'Vigo',
  codigoPostal: '36212',
  provincia: 'Pontevedra',
  pais: 'España',
  emailLegal: 'info@tintoreriamimos.es',
  emailLegalHref: 'mailto:info@tintoreriamimos.es',
  canalEtico: 'Consultas y comunicaciones a través de info@tintoreriamimos.es',
};

/* =======================================================================
   3. DISCREPANCIAS Y REGISTRO DE DECISIONES DE CLIENTE
   ======================================================================= */
export const DISCREPANCIAS_COMERCIALES: DiscrepanciaRegistrada[] = [
  {
    campo: 'Ubicación 3ª Tienda Propia en Vigo',
    solicitudInicial: 'Bouzas',
    valorActivoEnCodigo: 'Venezuela (C/ Venezuela, 41, bajo 1, 36203 Vigo · Tel. 646 94 67 64)',
    estado: 'CONFIRMADA_Y_CERRADA',
    observaciones:
      'Confirmado definitivamente por el cliente: Tintorería Mimos cuenta con exactamente 3 tiendas propias en Vigo (Navia, Gregorio Espino y Venezuela). Bouzas no es tienda propia de Mimos y queda excluida como sucursal o ficha.',
  },
  {
    campo: 'Datos registrales mercantiles completos',
    solicitudInicial: 'Registro Mercantil de Pontevedra',
    valorActivoEnCodigo:
      'Inscrita en el Registro Mercantil de Pontevedra, Tomo 3698, Libro 3698, Folio 170, Sección 8, Hoja PO-51054, Inscripción 1ª (28.03.11)',
    estado: 'CONFIRMADA_Y_CERRADA',
    observaciones:
      'Acreditado fehacientemente con publicación oficial del BORME (BORME-A-2011-68-36 en BOE): Tomo 3698, Folio 170, Hoja PO-51054, Inscripción 1ª de fecha 28/03/2011, comienzo de operaciones 25/03/2011. Datos 100% verificados.',
  },
];

/* =======================================================================
   4. LAS TRES TIENDAS PROPIAS EN VIGO (VERIFICADAS)
   ======================================================================= */
export const MASTER_TIENDAS_PROPIAS: TiendaPropia[] = [
  {
    id: 'as-teixugueiras',
    activo: true,
    categoria: 'tienda_propia',
    tipoLegacy: 'tienda',
    esSedeCentral: true,
    nombreComercio: 'Tintorería Mimos Navia, S.L.',
    nombreMostrado: 'Tintorería Mimos Navia',
    localidad: 'Vigo',
    provincia: 'Pontevedra',
    zonaSlug: 'vigo',
    direccion: 'C/ Teixugueiras, 11, bajo 9',
    codigoPostal: '36212',
    coordenadas: { latitud: 42.21223, longitud: -8.754691 },
    telefono: '986125141',
    telefonoMostrado: '986 12 51 41',
    telefonoHref: 'tel:+34986125141',
    telefonoInternacional: '+34986125141',
    horario: {
      zona_horaria: 'Europe/Madrid',
      lunes: [['09:30', '14:00'], ['16:00', '20:00']],
      martes: [['09:30', '14:00'], ['16:00', '20:00']],
      miercoles: [['09:30', '14:00'], ['16:00', '20:00']],
      jueves: [['09:30', '14:00'], ['16:00', '20:00']],
      viernes: [['09:30', '14:00'], ['16:00', '20:00']],
      sabado: [['10:00', '13:30']],
      domingo: [],
      resumen: 'L-V 09:30-14:00 y 16:00-20:00 · Sáb 10:00-13:30',
    },
    serviciosConfirmados: [
      'tintoreria',
      'lavanderia',
      'planchado',
      'colada_familiar',
      'textiles_hogar',
      'limpieza_alfombras',
      'costura_arreglos',
      'alojamientos_empresas',
    ],
    arreglosConfirmados: [
      'Bajos y bastillas en pantalones, faldas, vestidos y abrigos',
      'Cambio y reparación de cremalleras y botones',
      'Estrechar y ensanchar prendas y ajustes de cintura',
      'Zurcidos, descosidos y rotos en camisas, chaquetas y prendas de calle',
    ],
    diasDeRuta: 'Atención diaria directa en tienda central',
    plazo: 'Se confirma en tienda o por WhatsApp según prenda y tratamiento',
    horaLimite: 'Durante todo el horario de apertura',
    instrucciones:
      'Entrega y recogida directa en nuestra tienda principal de Navia sin cita previa, tanto para tintorería, lavandería y textiles del hogar como para costura y arreglos de ropa.',
    foto: '',
    referenciaLocal: 'En el barrio de Navia (Vigo), C/ As Teixugueiras, 11, bajo 9.',
    aparcamiento: 'Fácil aparcamiento en las inmediaciones y plazas públicas de Teixugueiras.',
    cierreTemporal: false,
  },
  {
    id: 'gregorio-espino',
    activo: true,
    categoria: 'tienda_propia',
    tipoLegacy: 'tienda',
    esSedeCentral: false,
    nombreComercio: 'Tintorería Mimos Navia, S.L.',
    nombreMostrado: 'Mimos Gregorio Espino',
    localidad: 'Vigo',
    provincia: 'Pontevedra',
    zonaSlug: 'vigo',
    direccion: 'Alcalde Gregorio Espino, 44',
    codigoPostal: '36205',
    coordenadas: { latitud: 42.22836, longitud: -8.707589 },
    telefono: '986192787',
    telefonoMostrado: '986 19 27 87',
    telefonoHref: 'tel:+34986192787',
    telefonoInternacional: '+34986192787',
    horario: {
      zona_horaria: 'Europe/Madrid',
      lunes: [['09:30', '13:30'], ['16:30', '20:00']],
      martes: [['09:30', '13:30'], ['16:30', '20:00']],
      miercoles: [['09:30', '13:30'], ['16:30', '20:00']],
      jueves: [['09:30', '13:30'], ['16:30', '20:00']],
      viernes: [['09:30', '13:30'], ['16:30', '20:00']],
      sabado: [['09:30', '13:00']],
      domingo: [],
      resumen: 'L-V 09:30-13:30 y 16:30-20:00 · Sáb 09:30-13:00',
    },
    serviciosConfirmados: [
      'tintoreria',
      'lavanderia',
      'planchado',
      'colada_familiar',
      'textiles_hogar',
      'limpieza_alfombras',
      'costura_arreglos',
    ],
    arreglosConfirmados: [
      'Servicio express: bajos y arreglos en el día',
      'Cambio y reparación de cremalleras y botones',
      'Estrechar, ensanchar y ajustes de cintura en trajes, faldas y pantalones',
      'Especialistas en arreglos y tratamiento de prendas de piel',
      'Bordados personalizados y confección de cortinas, estores y cojines',
      'Zurcidos, descosidos, rotos y transformación de prendas favoritas',
    ],
    diasDeRuta: 'Atención directa en tienda propia',
    plazo: 'Se confirma en tienda o por WhatsApp según prenda y tratamiento',
    horaLimite: 'Durante todo el horario de apertura',
    instrucciones:
      'Entrega y recogida directa en nuestra tienda propia de Alcalde Gregorio Espino, 44 para tintorería, lavandería, textiles del hogar y arreglos de ropa.',
    foto: '/images/gregorio-espino/fachada1Gregorio.jpg',
    referenciaLocal:
      'Esquina con Rúa do Escultor Nogueira, frente a la zona ajardinada de Alcalde Gregorio Espino.',
    aparcamiento:
      'Zona de carga/descarga y estacionamiento en calles aledañas (Escultor Nogueira y Gregorio Espino).',
    cierreTemporal: false,
  },
  {
    id: 'rua-venezuela',
    activo: true,
    categoria: 'tienda_propia',
    tipoLegacy: 'tienda',
    esSedeCentral: false,
    nombreComercio: 'Tintorería Mimos Navia, S.L.',
    nombreMostrado: 'Mimos Venezuela',
    localidad: 'Vigo',
    provincia: 'Pontevedra',
    zonaSlug: 'vigo',
    direccion: 'C/ Venezuela, 41, bajo 1',
    codigoPostal: '36203',
    coordenadas: { latitud: 42.23268, longitud: -8.719311 },
    telefono: '646946764',
    telefonoMostrado: '646 94 67 64',
    telefonoHref: 'tel:+34646946764',
    telefonoInternacional: '+34646946764',
    horario: {
      zona_horaria: 'Europe/Madrid',
      lunes: [['09:30', '13:30'], ['16:30', '19:30']],
      martes: [['09:30', '13:30'], ['16:30', '19:30']],
      miercoles: [['09:30', '13:30'], ['16:30', '19:30']],
      jueves: [['09:30', '13:30'], ['16:30', '19:30']],
      viernes: [['09:30', '13:30'], ['16:30', '19:30']],
      sabado: [],
      domingo: [],
      resumen: 'L-V 09:30-13:30 y 16:30-19:30 · Sáb cerrado',
    },
    serviciosConfirmados: [
      'tintoreria',
      'lavanderia',
      'planchado',
      'colada_familiar',
      'textiles_hogar',
      'limpieza_alfombras',
      'costura_arreglos',
    ],
    arreglosConfirmados: [
      'Bajos y bastillas en pantalones, faldas, vestidos y abrigos',
      'Cambio y reparación de cremalleras y botones',
      'Estrechar y ensanchar prendas y ajustes de cintura',
      'Zurcidos, descosidos y rotos en camisas, chaquetas y prendas de calle',
    ],
    diasDeRuta: 'Atención directa en tienda propia',
    plazo: 'Se confirma en tienda o por WhatsApp según prenda y tratamiento',
    horaLimite: 'Durante todo el horario de apertura',
    instrucciones:
      'Entrega y recogida directa en nuestra tienda propia de C/ Venezuela, 41, bajo 1 para servicios de tintorería, lavandería, textiles del hogar y arreglos de ropa.',
    foto: '',
    referenciaLocal: 'En el centro urbano de Vigo, C/ Venezuela, 41, bajo 1.',
    aparcamiento: 'Aparcamientos públicos cercanos y zona de parada rápida en C/ Venezuela.',
    cierreTemporal: false,
  },
];

/* =======================================================================
   5. LOS CINCO ESTABLECIMIENTOS COLABORADORES (VERIFICADOS)
   ======================================================================= */
export const MASTER_ESTABLECIMIENTOS_COLABORADORES: EstablecimientoColaborador[] = [
  {
    id: 'punto-redondela',
    activo: true,
    categoria: 'establecimiento_colaborador',
    tipoLegacy: 'punto',
    nombreComercio: 'Mimos Redondela',
    nombreMostrado: 'Mimos Redondela',
    localidad: 'Redondela',
    provincia: 'Pontevedra',
    zonaSlug: 'redondela',
    direccion: 'C/ José Regojo, 29 bajo',
    codigoPostal: '36800',
    coordenadas: { latitud: 42.28084, longitud: -8.61012 },
    telefono: '613624724',
    telefonoMostrado: '613 62 47 24',
    telefonoHref: 'tel:+34613624724',
    telefonoInternacional: '+34613624724',
    horario: {
      zona_horaria: 'Europe/Madrid',
      lunes: [['10:00', '13:30'], ['17:00', '20:00']],
      martes: [['10:00', '13:30'], ['17:00', '20:00']],
      miercoles: [['10:00', '13:30'], ['17:00', '20:00']],
      jueves: [['10:00', '13:30'], ['17:00', '20:00']],
      viernes: [['10:00', '13:30'], ['17:00', '20:00']],
      sabado: [['10:00', '13:00']],
      domingo: [],
      resumen: 'L-V 10:00-13:30 y 17:00-20:00 · Sáb 10:00-13:00',
    },
    tieneCosturaEnLocal: false,
    serviciosConfirmados: [
      'tintoreria',
      'lavanderia',
      'planchado',
      'colada_familiar',
      'textiles_hogar',
      'limpieza_alfombras',
    ],
    arreglosConfirmados: [],
    diasDeRuta: 'Consultar días de recogida y reparto con Mimo por WhatsApp',
    plazo: 'Según tipo de prenda y ruta de reparto del punto',
    horaLimite: 'Dentro del horario de atención del establecimiento',
    instrucciones:
      'Deposita y recoge tus prendas y textiles del hogar para los servicios de Tintorería Mimos en C/ José Regojo, 29 bajo en Redondela.',
    foto: '/images/mimos-redondela/fachadaRedondela1.jpg',
    referenciaLocal: 'C/ José Regojo, 29 bajo, en el casco urbano de Redondela.',
    aparcamiento:
      'Aparcamiento y zona de parada rápida en las inmediaciones de la calle José Regojo.',
    cierreTemporal: false,
  },
  {
    id: 'punto-gondomar',
    activo: true,
    categoria: 'establecimiento_colaborador',
    tipoLegacy: 'punto',
    nombreComercio: 'Puntadas No Aire',
    nombreMostrado: 'Puntadas No Aire',
    localidad: 'Gondomar',
    provincia: 'Pontevedra',
    zonaSlug: 'gondomar',
    direccion: 'Avda. Elduayen, 9',
    codigoPostal: '36380',
    coordenadas: { latitud: 42.11151, longitud: -8.762659 },
    telefono: '630822184',
    telefonoMostrado: '630 82 21 84',
    telefonoHref: 'tel:+34630822184',
    telefonoInternacional: '+34630822184',
    horario: {
      zona_horaria: 'Europe/Madrid',
      lunes: [['10:00', '13:30'], ['16:00', '19:00']],
      martes: [['08:00', '14:00'], ['16:00', '19:00']],
      miercoles: [['08:00', '14:00'], ['16:00', '19:00']],
      jueves: [['08:00', '14:00']],
      viernes: [['08:00', '14:00']],
      sabado: [['10:00', '13:30']],
      domingo: [],
      resumen: 'L 10:00-13:30 y 16:00-19:00 · M-X 08:00-14:00 y 16:00-19:00 · J-V 08:00-14:00 · Sáb 10:00-13:30',
    },
    tieneCosturaEnLocal: true,
    serviciosConfirmados: [
      'tintoreria',
      'lavanderia',
      'planchado',
      'colada_familiar',
      'textiles_hogar',
      'limpieza_alfombras',
      'costura_arreglos',
    ],
    arreglosConfirmados: [
      'Bajos y bastillas en pantalones, faldas, vestidos y abrigos',
      'Cambio y reparación de cremalleras y botones',
      'Estrechar y ensanchar prendas y ajustes de cintura',
      'Zurcidos, descosidos y rotos en prendas de vestir',
    ],
    diasDeRuta: 'Consultar días de recogida y reparto con Mimo por WhatsApp',
    plazo: 'Según tipo de prenda o arreglo y disponibilidad del punto',
    horaLimite: 'Dentro del horario de atención del establecimiento',
    instrucciones:
      'Entrega tus prendas y textiles del hogar en Puntadas No Aire (Avda. Elduayen, 9, Gondomar), establecimiento colaborador de recogida y entrega para los servicios de Tintorería Mimos que cuenta además con servicio confirmado de costura y arreglos de ropa.',
    foto: '/images/puntadas-no-aire/fachadaGondomar1.jpg',
    referenciaLocal:
      'En pleno centro de Gondomar, Avda. Elduayen, 9 (taller y tienda de costura Puntadas No Aire).',
    aparcamiento:
      'Zonas de estacionamiento y parada en la propia avenida y calles adyacentes para entrega y recogida ágil de prendas.',
    cierreTemporal: false,
  },
  {
    id: 'punto-ponteareas',
    activo: true,
    categoria: 'establecimiento_colaborador',
    tipoLegacy: 'punto',
    nombreComercio: 'Arregla2',
    nombreMostrado: 'Arregla2',
    localidad: 'Ponteareas',
    provincia: 'Pontevedra',
    zonaSlug: 'ponteareas',
    direccion: 'C/ Argentina, 4',
    codigoPostal: '36860',
    coordenadas: { latitud: 42.17522, longitud: -8.507028 },
    telefono: '647616615',
    telefonoMostrado: '647 61 66 15',
    telefonoHref: 'tel:+34647616615',
    telefonoInternacional: '+34647616615',
    horario: {
      zona_horaria: 'Europe/Madrid',
      lunes: [['09:30', '13:30'], ['16:00', '19:30']],
      martes: [['09:30', '13:30'], ['16:00', '19:30']],
      miercoles: [['09:30', '13:30'], ['16:00', '19:30']],
      jueves: [['09:30', '13:30'], ['16:00', '19:30']],
      viernes: [['09:30', '13:30'], ['16:00', '19:30']],
      sabado: [['09:30', '13:30']],
      domingo: [],
      resumen: 'L-V 09:30-13:30 y 16:00-19:30 · Sáb 09:30-13:30',
    },
    tieneCosturaEnLocal: true,
    serviciosConfirmados: [
      'tintoreria',
      'lavanderia',
      'planchado',
      'colada_familiar',
      'textiles_hogar',
      'limpieza_alfombras',
      'costura_arreglos',
    ],
    arreglosConfirmados: [
      'Bajos y bastillas en pantalones, faldas, vestidos y abrigos',
      'Cambio y reparación de cremalleras y botones',
      'Estrechar y ensanchar prendas y ajustes de cintura',
      'Zurcidos, descosidos y rotos en prendas de vestir',
    ],
    diasDeRuta: 'Consultar días de recogida y reparto con Mimo por WhatsApp',
    plazo: 'Según tipo de prenda o arreglo y disponibilidad del punto',
    horaLimite: 'Dentro del horario de atención del establecimiento',
    instrucciones:
      'Deja tus prendas y textiles del hogar en Arregla2 (C/ Argentina, 4, Ponteareas), establecimiento colaborador de recogida y entrega para los servicios de Tintorería Mimos con servicio confirmado de costura y arreglos de ropa.',
    foto: '/images/arregla2-ponteareas/fachada1Ponteareas.jpg',
    referenciaLocal: 'En el casco urbano de Ponteareas, C/ Argentina, 4.',
    aparcamiento: 'Estacionamiento y parada en las calles aledañas a C/ Argentina.',
    cierreTemporal: false,
  },
  {
    id: 'punto-o-porrino',
    activo: true,
    categoria: 'establecimiento_colaborador',
    tipoLegacy: 'punto',
    nombreComercio: 'Telas y Más',
    nombreMostrado: 'Telas y Más',
    localidad: 'O Porriño',
    provincia: 'Pontevedra',
    zonaSlug: 'o-porrino',
    direccion: 'C/ Manuel Rodríguez, 30',
    codigoPostal: '36400',
    coordenadas: { latitud: 42.15916, longitud: -8.621138 },
    telefono: '605027652',
    telefonoMostrado: '605 02 76 52',
    telefonoHref: 'tel:+34605027652',
    telefonoInternacional: '+34605027652',
    horario: {
      zona_horaria: 'Europe/Madrid',
      lunes: [['10:00', '13:30'], ['17:00', '20:30']],
      martes: [['10:00', '13:30'], ['17:00', '20:30']],
      miercoles: [['10:00', '13:30'], ['17:00', '20:30']],
      jueves: [['10:00', '13:30'], ['17:00', '20:30']],
      viernes: [['10:00', '13:30'], ['17:00', '20:30']],
      sabado: [['10:00', '13:30']],
      domingo: [],
      resumen: 'L-V 10:00-13:30 y 17:00-20:30 · Sáb 10:00-13:30',
    },
    tieneCosturaEnLocal: true,
    serviciosConfirmados: [
      'tintoreria',
      'lavanderia',
      'planchado',
      'colada_familiar',
      'textiles_hogar',
      'limpieza_alfombras',
      'costura_arreglos',
    ],
    arreglosConfirmados: [
      'Bajos y bastillas en pantalones, faldas, vestidos y abrigos',
      'Cambio y reparación de cremalleras y botones',
      'Estrechar y ensanchar prendas y ajustes de cintura',
      'Zurcidos, descosidos y rotos en prendas de vestir',
    ],
    diasDeRuta: 'Consultar días de recogida y reparto con Mimo por WhatsApp',
    plazo: 'Según tipo de prenda o arreglo y disponibilidad del punto',
    horaLimite: 'Dentro del horario de atención del establecimiento',
    instrucciones:
      'Entrega tus prendas y textiles del hogar en Telas y Más (C/ Manuel Rodríguez, 30, O Porriño), establecimiento colaborador de recogida y entrega para los servicios de Tintorería Mimos que ofrece además costura y arreglos de ropa.',
    foto: '/images/telas-mas/fachada2Porri.jpg',
    referenciaLocal:
      'En pleno centro comercial de O Porriño, Rúa Manuel Rodríguez, 30 (zona peatonal y de fácil acceso).',
    aparcamiento:
      'Aparcamientos públicos cercanos en el centro urbano de O Porriño y zonas de parada breve para carga y descarga.',
    cierreTemporal: false,
  },
  {
    id: 'punto-vigo-dpasso',
    activo: true,
    categoria: 'establecimiento_colaborador',
    tipoLegacy: 'punto',
    nombreComercio: "D'Passo",
    nombreMostrado: "D'Passo",
    localidad: 'Vigo',
    provincia: 'Pontevedra',
    zonaSlug: 'vigo',
    direccion: 'Camiño Espedrigada, 9 bajo',
    codigoPostal: '36210',
    coordenadas: { latitud: 42.21774, longitud: -8.73539 },
    telefono: '986230643',
    telefonoMostrado: '986 23 06 43',
    telefonoHref: 'tel:+34986230643',
    telefonoInternacional: '+34986230643',
    horario: {
      zona_horaria: 'Europe/Madrid',
      lunes: [['09:30', '13:30'], ['16:30', '20:30']],
      martes: [['09:30', '13:30'], ['16:30', '20:30']],
      miercoles: [['09:30', '13:30'], ['16:30', '20:30']],
      jueves: [['09:30', '13:30'], ['16:30', '20:30']],
      viernes: [['09:30', '13:30'], ['16:30', '20:30']],
      sabado: [],
      domingo: [],
      resumen: 'L-V 09:30-13:30 y 16:30-20:30 · Sáb cerrado',
    },
    tieneCosturaEnLocal: false,
    serviciosConfirmados: [
      'tintoreria',
      'lavanderia',
      'planchado',
      'colada_familiar',
      'textiles_hogar',
      'limpieza_alfombras',
    ],
    arreglosConfirmados: [],
    diasDeRuta: 'Consultar días de recogida y reparto con Mimo por WhatsApp',
    plazo: 'Según tipo de prenda y ruta de reparto del punto',
    horaLimite: 'Dentro del horario de atención del establecimiento',
    instrucciones:
      "Deposita y recoge tus prendas y textiles del hogar para los servicios de Tintorería Mimos en el establecimiento colaborador D'Passo (Camiño Espedrigada, 9 bajo, Vigo).",
    foto: '',
    referenciaLocal: 'En Camiño Espedrigada, 9 bajo (Vigo).',
    aparcamiento: 'Zona de carga/descarga y parada rápida en las inmediaciones.',
    cierreTemporal: false,
  },
];

/* =======================================================================
   6. CONJUNTO DE ESTABLECIMIENTOS Y FUNCIONES DE ACCESO
   ======================================================================= */
export const TODOS_LOS_ESTABLECIMIENTOS = [
  ...MASTER_TIENDAS_PROPIAS,
  ...MASTER_ESTABLECIMIENTOS_COLABORADORES,
];

export function getEstablecimientoById(id: string): TiendaPropia | EstablecimientoColaborador | undefined {
  return TODOS_LOS_ESTABLECIMIENTOS.find((e) => e.id === id);
}

export function buildWhatsAppUrlConMensaje(mensaje: string): string {
  return `${CANALES_CONTACTO_CENTRAL.whatsappBaseHref}?text=${encodeURIComponent(mensaje)}`;
}

export function buildGoogleMapsSearchUrl(e: {
  direccion: string;
  codigoPostal: string;
  localidad: string;
  coordenadas?: CoordenadasGPS;
}): string {
  if (e.coordenadas && typeof e.coordenadas.latitud === 'number' && typeof e.coordenadas.longitud === 'number') {
    return `https://www.google.com/maps/search/?api=1&query=${e.coordenadas.latitud},${e.coordenadas.longitud}`;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${e.direccion}, ${e.codigoPostal} ${e.localidad}`
  )}`;
}

/* =======================================================================
   7. ADAPTADOR A ESTRUCTURAS HEREDADAS (PUNTO REGISTRO RAW)
   Garantiza que commercialMasterData.ts es la única fuente de verdad
   para toda la aplicación y ningún componente depende de copias separadas.
   ======================================================================= */
export interface LegacyHorarioRaw {
  zona_horaria: string;
  lunes: TramoHorario[];
  martes: TramoHorario[];
  miercoles: TramoHorario[];
  jueves: TramoHorario[];
  viernes: TramoHorario[];
  sabado: TramoHorario[];
  domingo: TramoHorario[];
}

export interface LegacyPuntoRegistroRaw {
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
  horario: LegacyHorarioRaw;
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

export function toLegacyPuntoRegistroRaw(
  item: TiendaPropia | EstablecimientoColaborador
): LegacyPuntoRegistroRaw {
  return {
    id: item.id,
    activo: item.activo,
    tipo: item.tipoLegacy,
    nombre_comercio: item.nombreComercio,
    nombre_mostrado: item.nombreMostrado,
    localidad: item.localidad,
    zona_slug: item.zonaSlug,
    direccion: item.direccion,
    codigo_postal: item.codigoPostal,
    latitud: item.coordenadas.latitud,
    longitud: item.coordenadas.longitud,
    telefono: item.telefono,
    telefonos_mostrados: item.telefonoMostrado,
    horario: {
      zona_horaria: item.horario.zona_horaria,
      lunes: item.horario.lunes,
      martes: item.horario.martes,
      miercoles: item.horario.miercoles,
      jueves: item.horario.jueves,
      viernes: item.horario.viernes,
      sabado: item.horario.sabado,
      domingo: item.horario.domingo,
    },
    servicios_confirmados: item.serviciosConfirmados,
    arreglos_confirmados: item.arreglosConfirmados,
    dias_de_ruta: item.diasDeRuta,
    plazo: item.plazo,
    hora_limite: item.horaLimite,
    instrucciones_entrega_recogida: item.instrucciones,
    foto: item.foto,
    referencia_local: item.referenciaLocal,
    aparcamiento: item.aparcamiento,
    cierre_temporal: item.cierreTemporal,
    permiso_comercio: '',
  };
}

export const MASTER_PUNTOS_REGISTRO_RAW: LegacyPuntoRegistroRaw[] = [
  ...MASTER_TIENDAS_PROPIAS.map(toLegacyPuntoRegistroRaw),
  ...MASTER_ESTABLECIMIENTOS_COLABORADORES.map(toLegacyPuntoRegistroRaw),
];
