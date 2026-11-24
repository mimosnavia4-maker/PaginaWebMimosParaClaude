import { buildMimoWhatsAppUrl } from './mimosData';

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
      'Por eso ofrecemos el servicio de recepción y entrega de Tintorería Mimos a través del establecimiento colaborador Mimos Redondela situado en la C/ José Regojo, 29 bajo (36800 Redondela). En este punto colaborador puedes entregar tus prendas de vestir y textiles del hogar para su tratamiento en nuestras instalaciones propias de Navia, así como alfombras para su gestión con especialista.',
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
          'Es un establecimiento colaborador de recogida y entrega en Redondela (C/ José Regojo, 29 bajo, teléfono 613 62 47 24) donde puedes dejar tus prendas, colada familiar y textiles del hogar para su tratamiento en nuestras instalaciones de Vigo, además de recibir alfombras para su gestión con taller especialista.',
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
    h1: 'Tintorería, lavandería y costura Mimos en Gondomar (Puntadas No Aire)',
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
    h1: 'Tintorería, lavandería y costura Mimos en O Porriño (Telas y Más)',
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
          'Planta central de tintorería, gran formato y punto de recepción de alfombras con sábados abiertos.',
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
          'Procesamos tus prendas o textiles del hogar en nuestras instalaciones propias de Vigo con secado completo anti-humedad (y gestionamos tus alfombras con taller especialista colaborador) antes de devolvértelos listos.',
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
