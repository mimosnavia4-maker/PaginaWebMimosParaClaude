import {
  CANALES_CONTACTO_CENTRAL,
  CONTACT_INFO,
  IMAGES,
  PUNTOS_COLABORADORES,
  PUNTOS_CON_COSTURA,
  TIENDAS_PROPIAS,
  buildMimoWhatsAppUrl,
} from './mimosData';

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
  seoTitle: 'Arreglos de Ropa en Vigo Sin Cita Previa: Costura y Piel | Mimos',
  metaDescription:
    'Arreglos de ropa en Vigo sin cita previa: bajos, bajo original vaquero, cremalleras, piel, bordados y confección hogar. Taller in situ en Gregorio Espino y Venezuela.',
  h1: 'Arreglos de ropa en Vigo: costura y composturas profesionales',
  subtituloCabecera:
    'Sin cita previa en horario comercial. Taller propio de costura y composturas in situ en Gregorio Espino y Venezuela, recepción de prendas en Navia y red de puntos colaboradores con costura. Desde bajo original de vaquero y arreglos habituales hasta prendas de piel, bordados y confección de cortinas, estores y cojines.',
  trabajosConfirmados: [
    {
      id: 'bajos-bastillas',
      categoria: 'Composturas habituales',
      disponibilidad: 'Tiendas propias y puntos con costura',
      titulo: 'Bajos, bastillas y bajo original de vaquero',
      descripcion:
        'Subir o bajar el largo de pantalones de vestir o vaqueros —incluyendo bajo original de vaquero conservando el desgastado y remate de fábrica—, faldas, vestidos de calle o ceremonia, mangas y abrigos respetando la caída original.',
      prendasHabituales: 'Pantalones, vaqueros, faldas, vestidos, camisas y abrigos',
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
    'Bajos, bastillas y bajo original de vaquero',
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
      pregunta: '1. ¿Qué tipos de arreglo de bajos, bajo original vaquero, pantalones, faldas y abrigos realizáis?',
      respuesta:
        'Realizamos bajos y bastillas tradicionales, bajo original de vaquero conservando el desgastado y pespunte originales de fábrica, arreglos de pantalones de vestir o chinos, faldas y vestidos de calle o ceremonia, y composturas en chaquetas y abrigos cuidando que el hilo y la caída respeten el diseño original.',
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
      pregunta: '7. ¿Hace falta cita previa y en qué tiendas puedo entregar mi ropa?',
      respuesta: `No hace falta cita previa en horario comercial. Puedes acudir directamente a nuestras tiendas propias con taller propio de costura in situ en Gregorio Espino (Alcalde Gregorio Espino, 42 — con piel, bordados, confección hogar y express bajo consulta) o Venezuela (Rúa de Venezuela, 29, Entreplanta); a nuestra sede de Navia (C/ Teixugueiras, 11, bajo 9 — recepción y entrega para taller); y para composturas habituales de vestir, a los puntos colaboradores con costura en ${PUNTOS_CON_COSTURA.filter(
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
        id: 'desmanchado-costura-tenido',
        titulo: 'Desmanchado técnico, teñido textil y costura propia',
        etiqueta: 'Teñido compatible + taller propio de costura',
        descripcion:
          'Tratamiento previo mancha a mancha (grasa, tinta, vino o rozaduras), servicio especializado de teñido de prendas textiles compatibles y enlace directo con taller propio si hace falta reparar algo.',
        puntos: [
          'Revisión previa de botones de nácar/cuerno, cremalleras, forros y lentejuelas',
          'Teñido de prendas de algodón, lino o fibras naturales compatibles (evaluación previa de costuras e hilos)',
          'Talleres propios de costura in situ en Gregorio Espino y Venezuela (recepción en Navia)',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Tengo una prenda con una mancha concreta o quiero consultar un teñido o repaso de costura',
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
      {
        titulo: 'Cómo actuar ante manchas de vino tinto en ropa delicada',
        descripcion:
          'Qué hacer en los primeros minutos sobre seda, lana o vestidos de fiesta antes de acudir a mesa de desmanchado.',
        href: '/blog/como-quitar-mancha-vino-tinto-ropa-delicada',
        cta: 'Leer protocolo anti-manchas',
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
        id: 'tecnica-impermeable-encerado',
        titulo: 'Encerado (Barbour), impermeabilización (Gore-Tex) y ropa técnica',
        etiqueta: 'Reactivación DWR y encerado tradicional sin suavizantes',
        descripcion:
          'Limpieza específica, encerado artesanal de cazadoras tipo Barbour e impermeabilización técnica de prendas con membrana transpirable (tipo Gore-Tex), siempre revisando antes la etiqueta.',
        puntos: [
          'Encerado uniforme de chaquetas enceradas tipo Barbour y algodón tratado',
          'Lavado sin suavizante + tratamiento hidrófugo / impermeabilización para membranas tipo Gore-Tex',
          'Secado controlado respetando costuras termoselladas y transpirabilidad',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Quiero consultar la limpieza, encerado (Barbour) o impermeabilización (Gore-Tex) de una cazadora',
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
          criterio: 'Barbour (encerado), Gore-Tex y lana/punto delicado',
          valores: [
            'Encerado específico para Barbour, impermeabilización sin suavizante en membranas tipo Gore-Tex y programa suave anti-afieltrado en lana y punto',
            'Ciclos automáticos estándar que pueden llevar suavizante y obstruir membranas técnicas o encoger el punto de lana',
            'Riesgo de saturar membranas transpirables, aplicar temperatura excesiva o estropear la cera y el fieltrado',
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
    comparativaTabla: {
      titulo: 'Colada atendida Mimos frente a autoservicio con monedas y lavado en casa',
      subtitulo:
        'Compara tiempo semanal, consumo de luz, humedad de Vigo y acabado real al externalizar tu colada diaria.',
      columnas: [
        'Colada familiar Mimos (/colada-familiar-vigo)',
        'Autoservicio con monedas (Vigo)',
        'Lavadora y tendal en casa',
      ],
      filas: [
        {
          criterio: 'Clasificación y atención',
          valores: [
            'Separamos colores y prendas delicadas; sin mezclar lotes con otros clientes',
            'Cargas todo en un único ciclo estándar y asumes el riesgo de teñidos',
            'Requiere clasificar, poner varias lavadoras y recoger en casa',
          ],
        },
        {
          criterio: 'Tiempo tuyo invertido',
          valores: [
            '0 horas de espera: dejas en tienda/punto o recogemos en casa y recoges doblado o en percha',
            '60–90 minutos de desplazamiento y espera obligatoria junto a la máquina',
            'Horas de fin de semana entre tender, descolgar, planchar y doblar',
          ],
        },
        {
          criterio: 'Secado en la humedad de Vigo',
          valores: [
            'Secado 100 % en planta de Navia: toallas y vaqueros secos al instante sin olor a humedad',
            'Secado por tiempo cerrado a menudo insuficiente para rizo grueso',
            'Tendido lento en pisos húmedos y gasto eléctrico elevado en secadora doméstica',
          ],
        },
        {
          criterio: 'Combinación doblado + planchado',
          valores: [
            'Sí: ropa diaria doblada + camisas o pantalones concretos planchados en el mismo lote',
            'No dispone de servicio de planchado ni doblado profesional',
            'Plancha doméstica lenta sobre camisas y sábanas grandes',
          ],
        },
      ],
    },
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
  'recogida-a-domicilio': {
    serviceId: 'recogida-a-domicilio',
    badgeSuperior: 'Furgoneta propia en Vigo, Comarca y Polígonos · 8 puntos físicos sin mínimo',
    aclaracionHonesta:
      'Nuestro reparto propio cubre Vigo, toda su comarca (Redondela, Nigrán, Baiona, Mos, O Porriño, Gondomar, Ponteareas, Cangas y Moaña) y polígonos industriales (PTL Valladares, Zona Franca, Porriño, Mos), sujeto a ruta disponible e importe mínimo de servicio a consultar con Mimo según zona. Si entregas pocas prendas en nuestras 3 tiendas propias o 5 puntos colaboradores, no existe pedido mínimo.',
    modalidadesTitulo: 'Elige cómo entregar o recibir tus encargos con Tintorería Mimos',
    modalidadesSubtitulo:
      'Adaptamos nuestra logística propia tanto a hogares con prendas voluminosas o lotes familiares como a empresas en parques empresariales y puntos de proximidad.',
    modalidades: [
      {
        id: 'particulares-vigo-comarca',
        titulo: 'Particulares en Vigo y Comarca',
        etiqueta: 'Vigo, Redondela, Val Miñor, Louriña y Morrazo',
        descripcion:
          'Recogida y devolución en vivienda particular para lotes de ropa, trajes, edredones nórdicos, cortinas (con desmontaje opcional), pieles y alfombras enrolladas.',
        puntos: [
          'Cobertura en Vigo urbano, Redondela, Nigrán, Baiona, Mos, O Porriño, Gondomar, Ponteareas, Cangas y Moaña',
          'Importe mínimo y ventana horaria de ruta confirmados al instante por Mimo según tu código postal',
          'Aviso automático por WhatsApp o teléfono al finalizar el tratamiento en planta',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Quiero consultar el día de ruta y el importe mínimo para recogida en mi domicilio',
      },
      {
        id: 'empresas-poligonos',
        titulo: 'Empresas y Polígonos Industriales',
        etiqueta: 'PTL Valladares, Zona Franca, Porriño y Mos',
        descripcion:
          'Rutas programadas para oficinas, clínicas, comercios y vestuario laboral con suciedad normal en parques empresariales y áreas industriales del área de Vigo.',
        puntos: [
          'Recogida y entrega directa en PTL Valladares, Zona Franca (Bouzas/Balaídos), A Granxa / As Gándaras (O Porriño) y Mos',
          'Prendas propias de la empresa tratadas por separado en carros, sin renting impuesto',
          'Facturación mensual agrupada con CIF B27755925 para pymes y autónomos',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Consulto recogida y entrega para nuestra empresa en un polígono industrial de Vigo/comarca',
      },
      {
        id: 'ocho-puntos-sin-minimo',
        titulo: 'Entrega sin pedido mínimo en 8 puntos físicos',
        etiqueta: '3 tiendas propias en Vigo + 5 puntos colaboradores',
        descripcion:
          'Si solo necesitas llevar una camisa, un abrigo, un arreglo de costura o no llegas al mínimo a domicilio, acude sin cita previa ni mínimo de pedido.',
        puntos: [
          '3 tiendas propias en Vigo: Navia (Teixugueiras 11 bajo 9), Gregorio Espino 42 y Rúa de Venezuela 29 Entreplanta',
          '5 comercios colaboradores en Vigo (As Travesas - D’Passo), Redondela, Gondomar, Ponteareas y O Porriño',
          'Las mismas tarifas oficiales de tienda central en toda la red sin recargos',
        ],
        whatsappEjemplo:
          'Hola, Mimo. Quiero saber qué tienda o punto colaborador me queda más cerca para entregar sin pedido mínimo',
      },
    ],
    procesoTitulo: 'Cómo funciona la recogida a domicilio paso a paso',
    procesoSubtitulo:
      'Sin descargas ni plataformas rotas: coordinación directa con nuestro equipo y flota propia desde Navia.',
    procesoPasos: [
      {
        numero: '01',
        titulo: 'Indícanos tu zona y piezas por WhatsApp o formulario',
        descripcion:
          'Escríbenos con tu calle o código postal y qué necesitas recoger (prendas, edredones, alfombras, cortinas o colada).',
      },
      {
        numero: '02',
        titulo: 'Confirmamos día de ruta e importe mínimo',
        descripcion:
          'Mimo te informa al momento del día de paso de nuestra furgoneta por tu municipio o polígono y de la orientación de presupuesto.',
      },
      {
        numero: '03',
        titulo: 'Recogida y tratamiento en planta de Navia',
        descripcion:
          'Recogemos tu encargo con resguardo oficial y lo procesamos con los mismos estándares de nuestras tiendas propias.',
      },
      {
        numero: '04',
        titulo: 'Entrega coordinada de vuelta en tu puerta',
        descripcion:
          'Cuando todo está limpio, seco y revisado, concertamos la ventana de entrega en tu domicilio o empresa.',
      },
    ],
    consejosTitulo: 'Consejos rápidos para agilizar tu recogida a domicilio',
    consejos: [
      'Agrupa prendas sueltas junto con un edredón, manta o alfombra si quieres alcanzar fácilmente el mínimo de ruta a domicilio en municipios de comarca.',
      'La antigua aplicación Wash In Town ya no está operativa: coordina cualquier recogida o consulta de forma directa por WhatsApp (655 536 844), teléfono (986 12 51 41) o el formulario inferior.',
      'Si tu entrega es en edificio con conserjería o horario comercial de polígono, indícalo en observaciones para cuadrar la parada sin esperas.',
    ],
    enlacesEspecializados: [
      {
        titulo: 'Localizador de 3 tiendas propias y 5 puntos colaboradores',
        descripcion: 'Consulta direcciones, horarios reales y aparcamiento para entregar sin mínimo de pedido.',
        href: '/puntos-mimos',
        cta: 'Ver tiendas y puntos',
      },
      {
        titulo: 'Limpieza de alfombras con recogida y entrega',
        descripcion: 'Recogemos tu alfombra enrollada en casa y la devolvemos seca e higienizada.',
        href: '/limpieza-alfombras-vigo',
        cta: 'Ver limpieza de alfombras',
      },
      {
        titulo: 'Limpieza de sofás, tapicerías y colchones in situ',
        descripcion: 'Desplazamiento técnico a vivienda en Vigo y comarca por inyección-extracción.',
        href: '/limpieza-sofas-vigo',
        cta: 'Ver sofás y colchones',
      },
      {
        titulo: 'Textiles del hogar y desmontaje de cortinas',
        descripcion: 'Lavado y secado de nórdicos de plumas, mantas y retirada/colocación de cortinas.',
        href: '/textiles-hogar-vigo',
        cta: 'Ver textiles del hogar',
      },
    ],
    consultaOpcionesLabel: '¿Qué quieres que pasemos a recoger?',
    consultaOpciones: [
      'Prendas de tintorería + colada familiar',
      'Edredones, mantas o desmontaje de cortinas',
      'Alfombras enrolladas (limpieza o reparación)',
      'Lote semanal para empresa / polígono industrial',
      'Pieles, cuero o prendas de ceremonia',
    ],
    consultaPlaceholder: 'Ej.: Vigo centro o PTL Valladares, 2 edredones y un traje...',
    preguntasFrecuentes: [
      {
        pregunta: '¿Cuál es el importe mínimo para el servicio de recogida a domicilio?',
        respuesta:
          'El importe mínimo del servicio a domicilio varía según la zona (Vigo centro, parroquias o municipios del área metropolitana) y se consulta directamente con Mimo por WhatsApp antes de confirmar la recogida. Si entregas tus prendas en nuestras 3 tiendas propias o en cualquiera de los 5 puntos colaboradores no existe pedido mínimo.',
      },
      {
        pregunta: '¿Qué municipios de la comarca y polígonos industriales cubrís?',
        respuesta:
          'Cubrimos todo Vigo y rutas coordinadas hacia Redondela, Nigrán, Baiona, Mos, O Porriño, Gondomar, Ponteareas, Cangas y Moaña, además de parques empresariales como PTL Valladares, Zona Franca, A Granxa / As Gándaras (O Porriño) y polígonos de Mos según volumen y ruta.',
      },
      {
        pregunta: '¿Sigue funcionando la app Wash In Town para pedir recogidas?',
        respuesta:
          'No, la aplicación Wash In Town ya no está operativa. Todas las solicitudes y consultas de estado se gestionan de forma directa y personalizada por WhatsApp con Mimo (655 536 844), mediante nuestro formulario web o llamando al 986 12 51 41.',
      },
      {
        pregunta: '¿Recogéis alfombras, edredones de plumas y cortinas en domicilio?',
        respuesta:
          'Sí, de hecho el transporte de piezas voluminosas (alfombras enrolladas, edredones nórdicos, mantas y cortinas, incluyendo servicio opcional de descolgado y recolocación) es uno de los usos más habituales del servicio con nuestra furgoneta propia.',
      },
      {
        pregunta: '¿Puedo dejar las prendas en una tienda y pedir que me las entreguen en casa?',
        respuesta:
          'Sí, puedes entregar en cualquiera de nuestras tiendas de Navia, Gregorio Espino o Rúa Venezuela y solicitar posteriormente el envío a domicilio con Mimo cumpliendo las condiciones de ruta e importe de tu zona.',
      },
      {
        pregunta: '¿Qué información necesito enviar a Mimo para agendar una recogida?',
        respuesta:
          'Basta con indicar tu dirección o código postal, la franja horaria que prefieres, un teléfono de contacto y un resumen breve de las prendas o piezas (o una foto) para confirmarte día de ruta e importe mínimo.',
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

export const LIMPIEZA_PROFESIONAL_DATA = {
  badgeSuperior: 'MANTENIMIENTO PERIÓDICO EN VIGO · RC, PRL Y CAE AL DÍA · VISITA GRATUITA',
  h1: 'Limpieza profesional de oficinas, comunidades y locales en Vigo',
  subtitulo:
    'Servicio continuado para comunidades de propietarios (LPH), administradores de fincas, oficinas, despachos, clínicas y comercios en Vigo. Personal en Régimen General, sustituciones cubiertas y visita técnica gratuita sin compromiso.',
  alcanceClaro:
    'Enfoque exclusivo en mantenimiento periódico y sofás/tapicerías a domicilio: no realizamos limpiezas fin de obra, trabajos verticales de cristales en altura ni pulidos industriales de suelos.',
  garantiasOperativas: [
    {
      titulo: 'Seguro de Responsabilidad Civil (RC) vigente',
      detalle:
        'Cobertura específica de daños para total tranquilidad de presidentes de comunidad, administradores de fincas y gerencias.',
    },
    {
      titulo: 'PRL y Coordinación CAE al día',
      detalle:
        'Personal dado de alta en Régimen General, formación en Prevención de Riesgos Laborales y documentación CAE lista para comunidades y empresas.',
    },
    {
      titulo: 'Sustituciones planificadas garantizadas',
      detalle:
        'Cubrimos vacaciones, bajas y festivos con personal propio sin interrumpir el calendario de limpieza de tu portal u oficina.',
    },
    {
      titulo: 'Visita técnica de valoración gratuita',
      detalle:
        'Acudimos al inmueble en Vigo para revisar metros, granito/mármol o zonas críticas y entregar propuesta transparente para junta o gerencia.',
    },
  ],
  areasLimpieza: [
    {
      index: '01',
      id: 'comunidades-lph',
      etiqueta: 'Comunidades de Propietarios · Administradores de Fincas (LPH)',
      titulo: 'Portales, escaleras, ascensores y zonas comunes',
      descripcion:
        'Mantenimiento periódico adaptado al tránsito real del edificio, cuidando el granito gallego, mármol y acero inoxidable con productos de pH neutro y documentación CAE/RC lista para la junta.',
      incluye: [
        'Barrido y fregado de portal, escaleras, rellanos y cabina de ascensor',
        'Limpieza de cristales de puerta de acceso, espejos, buzones y pasamanos',
        'Atención directa a Administradores de Fincas y juntas bajo Ley de Propiedad Horizontal (LPH)',
        'Sustituciones cubiertas todo el año y factura mensual clara por comunidad',
      ],
      enlaceTexto: 'Leer guía de limpieza de comunidades (LPH)',
      enlaceHref: '/blog/limpieza-comunidades-propietarios-vigo',
      whatsappUrl: buildMimoWhatsAppUrl(
        'Hola, Mimo. Soy administrador/presidente de una comunidad en Vigo y quiero concertar visita técnica gratuita para limpieza de portal y escaleras.'
      ),
    },
    {
      index: '02',
      id: 'oficinas-despachos-clinicas',
      etiqueta: 'Oficinas · Despachos · Clínicas y Consultas',
      titulo: 'Espacios de trabajo saludables fuera de horario comercial',
      descripcion:
        'Limpieza e higienización periódica de despachos, notarías, academias y consultas médicas o dentales con bayetas codificadas por color y horarios sin interferir en la jornada.',
      incluye: [
        'Desinfección de puestos de trabajo, mesas de juntas, teléfonos y zonas de apoyo',
        'Higienización reforzada de aseos corporativos, salas de espera y office',
        'Turnos a primera hora de la mañana o al cierre según la actividad del centro',
        'Opción de combinar en pack con lavandería de batas, toallas o uniformes (/servicios-empresas)',
      ],
      enlaceTexto: 'Leer guía de oficinas y clínicas en Vigo',
      enlaceHref: '/blog/limpieza-oficinas-despachos-clinicas-vigo',
      whatsappUrl: buildMimoWhatsAppUrl(
        'Hola, Mimo. Quiero solicitar presupuesto y visita técnica para la limpieza periódica de nuestra oficina o clínica en Vigo.'
      ),
    },
    {
      index: '03',
      id: 'locales-comercios',
      etiqueta: 'Locales Comerciales · Tiendas · Escaparates a cota cero',
      titulo: 'Mantenimiento continuo de tiendas y comercios en Vigo',
      descripcion:
        'Conserva impecable la primera impresión de tu negocio: suelos de tienda, mostradores, probadores y cristales accesibles de escaparate (sin trabajos en altura ni fin de obra).',
      incluye: [
        'Fregado y repaso de suelos comerciales, estanterías, probadores y mostradores',
        'Limpieza periódica de escaparates y puertas acristaladas accesibles desde calle',
        'Mantenimiento de aseos de personal y almacenes con factura deducible con CIF',
      ],
      whatsappUrl: buildMimoWhatsAppUrl(
        'Hola, Mimo. Tengo un local comercial en Vigo y quiero consultar un plan de limpieza periódica.'
      ),
    },
    {
      index: '04',
      id: 'tapicerias-b2b-siniestros',
      etiqueta: 'Tapicerías a domicilio · Siniestros · Pack Lavandería',
      titulo: 'Limpieza de sofás/colchones in situ y soporte textil en planta',
      descripcion:
        'Complementamos la limpieza de tu edificio o empresa con higienización de sofás, sillas tapizadas y colchones a domicilio (/limpieza-sofas-vigo), lavandería empresarial y rescate textil tras incendios.',
      incluye: [
        'Inyección-extracción a domicilio para sofás, sillones, sillas de oficina y colchones',
        'Pack combinado Limpieza de oficina/clínica + Lavandería de toallas y batas en Navia',
        'Recuperación textil urgente tras humo, incendios o inundaciones con factura para seguro',
      ],
      enlaceTexto: 'Ver pack combinado con lavandería de empresa',
      enlaceHref: '/servicios-empresas',
      whatsappUrl: buildMimoWhatsAppUrl(
        'Hola, Mimo. Quiero consultar un servicio combinado de limpieza profesional y lavandería o tapicerías para nuestro centro en Vigo.'
      ),
    },
  ],
  checklistPresupuesto: [
    'Tipo de inmueble (comunidad de propietarios, oficina, clínica o local comercial) y barrio o polígono en Vigo.',
    'Superficie aproximada, número de alturas o baños y frecuencia semanal deseada (1, 2, 3 días o diaria).',
    'Si necesitas coordinar CAE con administrador de fincas o añadir lavado periódico de toallas/batas en pack combinado.',
  ],
  preguntasFrecuentes: [
    {
      pregunta: '¿Contáis con Seguro de Responsabilidad Civil, alta en Seguridad Social y CAE al día?',
      respuesta:
        'Sí. Todo nuestro personal está contratado y dado de alta en Régimen General, con formación en PRL, póliza de Seguro de Responsabilidad Civil vigente y documentación de Coordinación de Actividades Empresariales (CAE) lista para entregar a administradores de fincas, comunidades de propietarios y empresas.',
    },
    {
      pregunta: '¿Hacéis limpiezas fin de obra, cristales en altura o pulidos industriales de mármol?',
      respuesta:
        'No. Para mantener la especialización y calidad de nuestros equipos, nos centramos exclusivamente en mantenimiento periódico continuo (comunidades, oficinas, clínicas y locales comerciales a cota normal) y en limpieza de sofás y tapicerías a domicilio. No realizamos limpiezas fin de obra ni trabajos verticales en altura.',
    },
    {
      pregunta: '¿Cómo gestionáis las vacaciones o bajas médicas de la persona asignada?',
      respuesta:
        'Planificamos sustituciones internas con personal propio para que la comunidad, oficina o clínica nunca quede descubierta ni pierda días de limpieza por vacaciones o imprevistos.',
    },
    {
      pregunta: '¿La visita previa para presupuestar tiene coste? ¿Cómo se valora un edificio o local?',
      respuesta: `No publicamos precios cerrados por metro cuadrado porque cada portal, consulta o despacho tiene materiales y frecuencias distintas. Realizamos una visita técnica gratuita en Vigo para medir áreas, revisar el tipo de suelo y entregarte una propuesta cerrada sin compromiso.`,
    },
    {
      pregunta: '¿Podemos combinar la limpieza de nuestra clínica o local con el lavado de batas y toallas?',
      respuesta:
        'Sí. Al contar con planta propia de lavandería y tintorería en Navia, podemos unificar en un mismo proveedor la limpieza periódica de tus instalaciones y el lavado/planchado de uniformes, toallas o sábanas de camilla (suciedad habitual) en un pack combinado con factura mensual única con CIF.',
    },
  ] as ServicioFaqItem[],
};

export const APARTAMENTOS_TURISTICOS_DATA = {
  badgeSuperior: 'ALOJAMIENTOS TURÍSTICOS VUT EN VIGO · FRANJA 11:00–15:00 · DECRETO 12/2017 (REAT)',
  h1: 'Limpieza y lavandería para apartamentos turísticos y viviendas vacacionales en Vigo',
  subtitulo:
    'Operativa diseñada para rotaciones reales entre huéspedes en Vigo: limpieza en la franja crítica de 11:00 a 15:00 incluidos sábados, festivos y agosto, lavandería de tu propia lencería separada por vivienda, reposición de amenities, entrega de llaves y reporte fotográfico alineado con los estándares de higiene textil del Decreto 12/2017 y el REAT.',
  clavesDiferenciales: [
    {
      titulo: 'Franja crítica 11:00–15:00 todo el año',
      detalle:
        'Planificamos los cambios de check-out/check-in entre las 11:00 y las 15:00, cubriendo sábados, festivos y temporada alta en agosto.',
    },
    {
      titulo: 'Lencería propia separada (acuerdos negociables)',
      detalle:
        'No imponemos renting estándar cerrado: lavamos e higienizamos tus sábanas y toallas separadas por piso, con condiciones negociables por volumen.',
    },
    {
      titulo: 'Amenities, entrega de llaves y foto-reporte',
      detalle:
        'Más que limpiar: reponemos amenities básicos, coordinamos entrega de llaves/check-in y enviamos reporte fotográfico de incidencias tras cada salida.',
    },
    {
      titulo: 'Estándar Decreto 12/2017 y REAT (Xunta de Galicia)',
      detalle:
        'Protocolos higiénicos y de lencería pensados para Viviendas de Uso Turístico (VUT) inscritas en el REAT (Rexistro de Empresas e Actividades Turísticas), evitando humedades y fallos de presentación.',
    },
  ],
  checklistPresupuesto: [
    'Número de viviendas turísticas o habitaciones/camas que gestionas y ubicación aproximada en Vigo.',
    'Modalidad elegida: solo lavandería de ropa de cama y toallas, limpieza + lavandería, o coordinación integral con llaves y amenities.',
    'Frecuencia estimada de rotaciones y si trabajas con 1 o más juegos propios de lencería por apartamento.',
  ],
  preguntasFrecuentes: [
    {
      pregunta: '¿Cubrís cambios entre huéspedes de 11:00 a 15:00 los sábados, festivos y en agosto?',
      respuesta:
        'Sí. Sabemos que el grueso de las entradas y salidas en Vigo se concentra entre las 11:00 y las 15:00, especialmente en fines de semana, puentes festivos y verano. Coordinamos nuestros turnos para garantizar la puesta a punto puntual en esas ventanas.',
    },
    {
      pregunta: '¿Tenéis servicio de renting de sábanas o laváis la lencería propia del apartamento?',
      respuesta:
        'Trabajamos principalmente lavando, higienizando y planchando en calandra tu propia lencería separada por apartamento para que nunca se mezcle ni pierda calidad, sin obligarte a un renting estándar cerrado; no obstante, estamos abiertos a negociar acuerdos a medida según el volumen de viviendas.',
    },
    {
      pregunta: '¿Incluís reposición de amenities, entrega de llaves y aviso de desperfectos?',
      respuesta:
        'Sí. Dentro de nuestra coordinación operativa podemos encargarnos de reponer los amenities del apartamento, apoyar en la entrega de llaves o coordinación del check-in y enviarte un reporte fotográfico inmediato por WhatsApp si detectamos manchas, roturas o faltas tras la salida del huésped.',
    },
    {
      pregunta: '¿Atendéis tanto a propietarios con 1–2 apartamentos como a gestoras VUT?',
      respuesta:
        'Sí. Adaptamos tanto las entregas de lencería limpia empaquetada como los servicios completos de rotación tanto si gestionas un único piso en Airbnb/Booking en Vigo como si administras una cartera de varios apartamentos turísticos.',
    },
    {
      pregunta: '¿Cómo evitáis el olor a humedad en toallas y sábanas con el clima de Vigo?',
      respuesta:
        'Toda la lencería se lava a temperatura controlada en nuestra planta propia de Navia y se seca íntegramente antes de pasar por calandra y embolsarse por apartamento, eliminando la humedad residual que dejan los tendederos y lavadoras domésticas.',
    },
    {
      pregunta: '¿Vuestro protocolo ayuda a cumplir el Decreto 12/2017 y las exigencias del REAT en Galicia?',
      respuesta:
        'Sí en todo lo relativo a limpieza e higiene textil: las VUT registradas en el REAT (Rexistro de Empresas e Actividades Turísticas de la Xunta de Galicia) deben presentarse en óptimas condiciones de limpieza y dotación textil para cada huésped, algo que cubrimos con limpieza entre estancias, higienización de lencería propia en planta y reporte fotográfico de estado.',
    },
  ] as ServicioFaqItem[],
};

export const SERVICIO_SOFAS_FAQS: ServicioFaqItem[] = [
  {
    pregunta: '1. ¿La limpieza del sofá o colchón se hace en mi propia casa o os lo lleváis?',
    respuesta:
      'El servicio de sofás, colchones, sillones, sillas tapizadas y cabeceros se realiza al 100 % en tu domicilio o negocio mediante equipo portátil profesional, sin desmontar ni trasladar muebles. Que un cojín lleve cremallera responde a menudo al tapizado de fábrica: solo retiramos a nuestra planta de Vigo las fundas desenfundables cuya etiqueta autorice expresamente su limpieza.',
  },
  {
    pregunta: '2. ¿Cómo sé el precio de limpiar mi sofá, colchón o mis sillas?',
    respuesta:
      'No publicamos tarifas estándar cerradas porque el presupuesto depende del número de plazas o medida del colchón, el código y tipo de tejido, el estado de las manchas y la localidad (sujeto a importe mínimo de visita a consultar). Envía tus fotos a Mimo por WhatsApp para recibir valoración personalizada.',
  },
  {
    pregunta: '3. ¿Cómo seca el sofá o colchón y cuánto tiempo tarda en Vigo?',
    respuesta:
      'Extraemos mecánicamente la solución aplicada y dejamos terminar el secado de forma natural al aire con ventilación cruzada de la estancia; no utilizamos secadores de aire caliente ni ventiladores industriales. La referencia habitual en interiores es de 8 a 12 horas, pudiendo prolongarse en Vigo (donde la humedad alcanza el 80–85 % de octubre a enero) según densidad de espuma y tejido.',
  },
  {
    pregunta: '4. ¿Qué métodos utilizáis? ¿Usáis vapor seco, ozono o enzimáticos?',
    respuesta:
      'Trabajamos mediante lectura previa de etiqueta (W, S, WS, X), aspirado profundo en seco, pretratamiento localizado e inyección-extracción controlada (o limpieza de baja humedad en seco en tejidos código S). Quedan excluidos el vapor seco a alta presión, los tratamientos gaseosos con ozono, los procesos enzimáticos in situ y el calor forzado.',
  },
  {
    pregunta: '5. ¿Desaparecen todas las manchas antiguas, de tinta o remediadas en casa?',
    respuesta:
      'Valoramos tus fotografías con franqueza antes de acudir. Las manchas recientes habituales suelen mejorar notablemente; sin embargo, tintas fijadas, humedad incrustada en el núcleo de espuma o cercos alterados previamente con lejía, amoníaco, bicarbonato con vinagre o vaporeta (que fija proteínas y provoca pardeamiento celulósico) no permiten prometer una eliminación del 100 %.',
  },
  {
    pregunta: '6. ¿Cómo limpiáis colchones y sofás antimanchas, terciopelo, lino o viscosa?',
    respuesta:
      'Adaptamos el método a la etiqueta y la fibra: los tejidos Aquaclean (hidrofilia en el hilo sin PFC) exigen pH neutro sin lejía ni amoníaco; la microfibra es oleofílica y requiere desengrasado controlado; y el lino, el algodón, el terciopelo y especialmente la viscosa/rayón rechazan la saturación acuosa por riesgo de pardeamiento, cercos o rotura de fibras.',
  },
  {
    pregunta: '7. ¿Los productos son seguros para bebés, alérgicos y mascotas?',
    respuesta:
      'Sí. Empleamos formulaciones profesionales de pH equilibrado que se aclaran y extraen mecánicamente durante el servicio, evitando residuos jabonosos pegajosos (wick-back) que atraen suciedad. Una vez el mueble seca al aire por completo con ventilación natural, es seguro para toda la familia y mascotas.',
  },
  {
    pregunta: '8. ¿Qué necesitáis en casa el día de la cita y cuánto dura?',
    respuesta:
      'Solo necesitamos acceso a una toma de corriente doméstica, un punto de agua, algo de espacio alrededor de la pieza, posibilidad de abrir ventanas para ventilación cruzada y una persona responsable al inicio y al final. La duración habitual ronda entre 1 y 2 horas según tamaño y estado.',
  },
  {
    pregunta: '9. ¿Por qué aparece moho en el canapé abatible o bajo el colchón en Vigo?',
    respuesta:
      'Con la humedad atlántica de Vigo (77 % anual y 80–85 % en otoño e invierno), el vapor corporal nocturno condensa si el canapé está pegado a una pared exterior fría o lleno de textiles sin aireación. Recomendamos separarlo 5–10 cm del muro, ventilar la habitación y limpiar superficialmente antes de valorar el colchón.',
  },
  {
    pregunta: '10. ¿Limpiáis tapicerías de coches o furgonetas?',
    respuesta:
      'No. Este servicio a domicilio está enfocado exclusivamente en colchones, sofás, sillones, sillas tapizadas, cabeceros y mobiliario tapizado de viviendas particulares, alojamientos turísticos, oficinas y locales.',
  },
  {
    pregunta: '11. ¿En qué zonas trabajáis y con qué frecuencia conviene limpiar?',
    respuesta:
      'Atendemos Vigo y su área de influencia según ruta y condiciones de visita (a consultar con Mimo). Se recomienda una higienización profesional anual como mantenimiento preventivo frente a polvo y ácaros (Dermatophagoides), o cada seis meses en hogares con niños pequeños, mascotas o alergias respiratorias.',
  },
];

export const BLOG_FAQS_MAP: Record<string, ServicioFaqItem[]> = {
  'como-quitar-mancha-vino-tinto-ropa-delicada': [
    {
      pregunta: '¿Qué hago en los primeros minutos si cae vino tinto sobre una prenda delicada?',
      respuesta:
        'Coloca un paño blanco limpio o papel absorbente sin tintes debajo y encima de la mancha y presiona en vertical con toques suaves para absorber el exceso de líquido, sin frotar el tejido ni extender el cerco.',
    },
    {
      pregunta: '¿Puedo echar sal o usar agua caliente, secador o plancha sobre el vino tinto?',
      respuesta:
        'No. Frotar, cubrir con sal en tintes delicados o aplicar agua caliente, secadora o plancha oxida los taninos y azúcares del vino, caramelizando la mancha y fijándola de forma permanente dentro de la fibra.',
    },
    {
      pregunta: '¿Qué hago si la prenda indica limpieza en seco (P o F) o es de seda o ceremonia?',
      respuesta:
        'No apliques agua ni jabón doméstico, ya que pueden desplazar el apresto y dejar aureolas más difíciles de corregir que el propio vino. Tráela cuanto antes a Tintorería Mimos tras absorber el exceso en seco e indícanos si se aplicó algún producto previo.',
    },
  ],
  'como-lavar-edredon-de-plumas-guia-practica': [
    {
      pregunta: '¿Se puede lavar un edredón de plumas en una lavadora doméstica pequeña?',
      respuesta:
        'No es recomendable si el edredón llena demasiado el tambor. Un nórdico de pluma o plumón natural necesita espacio para flotar y aclararse sin apelmazar el relleno ni forzar la máquina.',
    },
    {
      pregunta: '¿Por qué no debe usarse suavizante ni quedar humedad en un relleno de plumón?',
      respuesta:
        'El suavizante recubre las plumas, apelmaza las cámaras aislantes y reduce la capacidad térmica del edredón; además, si el núcleo queda ligeramente húmedo al retirarlo, aparecen grumos, mal olor y moho interior.',
    },
    {
      pregunta: '¿Qué garantiza el lavado en gran formato y secado en planta de Navia?',
      respuesta:
        'Permite lavar el edredón en maquinaria de alta capacidad sin suavizantes y someterlo a un secado completo y progresivo hasta el centro del relleno para recuperar volumen, ligereza e higiene frente a la humedad de Vigo.',
    },
  ],
  'guia-simbolos-etiquetas-ropa-significado': [
    {
      pregunta: '¿Qué significa el círculo con una P en la etiqueta de la ropa?',
      respuesta:
        'El círculo con una letra P autoriza la limpieza en seco profesional utilizando percloroetileno y solventes habituales. Es exclusivo de tintorerías y no debe lavarse en agua en lavadoras domésticas.',
    },
    {
      pregunta: '¿Qué significan los puntos dentro del símbolo de la plancha?',
      respuesta:
        'Indican la temperatura máxima de planchado: 1 punto (máx. 110 °C, sin vapor para sintéticos y sedas), 2 puntos (máx. 150 °C para lana y poliéster) y 3 puntos (máx. 200 °C para algodón y lino).',
    },
    {
      pregunta: '¿Qué significan las barras debajo del símbolo de la cubeta de lavado?',
      respuesta:
        'Una barra horizontal inferior indica acción mecánica reducida (programa para sintéticos delicados y centrifugado suave). Dos barras horizontales indican acción mecánica muy reducida (programa especial para lana o seda).',
    },
    {
      pregunta: '¿Qué significa el círculo con la letra W?',
      respuesta:
        'El círculo con la letra W identifica el sistema Wet Cleaning (limpieza profesional ecológica en agua con control informático de humedad), una alternativa avanzada al lavado en seco que preserva tejidos delicados sin disolventes.',
    },
    {
      pregunta: '¿Por qué encogen los jerséis de lana al lavarlos en lavadora?',
      respuesta:
        'La lana encoge por el fenómeno del afieltrado: el agua caliente combinada con la fricción mecánica del tambor abre las escamas de la cutícula del pelo de lana, entrelazándolas de forma irreversible al enfriarse.',
    },
  ],
  'montar-tu-propia-tintoreria-lavanderia': [
    {
      pregunta: '¿Es suficiente montar solo limpieza en agua (Wet Cleaning) o hace falta limpieza en seco?',
      respuesta:
        'Para ofrecer un servicio integral es clave disponer de ambos sistemas: aunque el Wet Cleaning moderno resuelve la mayoría de prendas, la limpieza en seco sigue siendo insustituible en fibras nobles, forros sastre estructurados y determinadas manchas grasas.',
    },
    {
      pregunta: '¿Qué pesa más en la rentabilidad actual de una tintorería o lavandería?',
      respuesta:
        'Conocer los costes reales de producción (energía, mano de obra, químicos y amortización) en lugar de copiar tarifas de la competencia, mantener trazabilidad con resguardos oficiales y diversificar hacia colada por kilos, textiles del hogar y puntos de recogida.',
    },
    {
      pregunta: '¿Puedo colaborar con Tintorería Mimos desde mi comercio de barrio sin montar planta propia?',
      respuesta:
        'Sí. Los comercios de proximidad en Vigo y comarca pueden sumarse como Punto Colaborador Mimos operando recepción rápida con resguardo sin asumir maquinaria industrial ni planta de lavado.',
    },
  ],
  'ropa-afectada-humo-incendio-siniestro-hogar': [
    {
      pregunta: '¿Por qué no debo lavar ni meter en bolsas de plástico la ropa afectada por humo tras un incendio?',
      respuesta:
        'Las bolsas herméticas impiden la desgasificación y favorecen condensación y moho, mientras que lavar en casa con agua caliente o suavizante emulsiona el hollín oleoso y sella los compuestos orgánicos del humo en el interior de la fibra de forma permanente.',
    },
    {
      pregunta: '¿Qué documentación facilita Tintorería Mimos para el seguro de hogar (Ley 50/1980)?',
      respuesta:
        'Realizamos triaje técnico con prueba de viabilidad previa, inventario detallado de prendas recuperables e inviables (Pérdida Total) compatible con la gestión pericial del Art. 38 de la Ley 50/1980 y factura oficial desglosada con CIF corporativo.',
    },
    {
      pregunta: '¿Qué prendas tienen mayor recuperación y cuáles suelen declararse pérdida total?',
      respuesta:
        'Las fibras naturales y sintéticas sin daño térmico ni fusión suelen alcanzar buenas tasas de recuperación tras aspiración en seco, neutralización de hollín y desodorización; en cambio, fibras carbonizadas o sintéticos fundidos por calor se declaran pérdida total para el seguro.',
    },
  ],
  'protocolo-rotacion-apartamentos-turisticos-vigo': [
    {
      pregunta: '¿Cuánto tiempo margen es recomendable dejar entre check-out y check-in en Vigo?',
      respuesta:
        'Lo habitual es organizar la ventana entre las 11:00 y las 15:00 (4 horas) para ventilar, limpiar cocina y baños a fondo, hacer camas con lencería recién planchada, revisar desperfectos y reponer amenities sin prisas.',
    },
    {
      pregunta: '¿Es mejor usar lavandería externa o lavar sábanas y toallas en el apartamento?',
      respuesta:
        'Con la humedad ambiental de Vigo (>77 % media anual), lavar y secar toallas gruesas y sábanas dobles dentro del propio apartamento suele saturar el tiempo entre reservas y dejar humedad residual. Externalizar en planta profesional garantiza higienización térmica, calandra y secado completo.',
    },
    {
      pregunta: '¿Cuántos juegos de sábanas y toallas conviene tener por apartamento turístico?',
      respuesta:
        'Se recomienda contar con al menos 2,5 o 3 juegos completos por cama y huésped: uno puesto en el apartamento, otro en lavandería y uno de reserva inmediata en el inmueble ante imprevistos o estancias consecutivas.',
    },
  ],
  'limpieza-comunidades-propietarios-vigo': [
    {
      pregunta: '¿Qué frecuencia de limpieza es mejor para un portal pequeño frente a una comunidad grande?',
      respuesta:
        'En edificios pequeños de 8–12 viviendas suele bastar con 1 visita semanal completa, mientras que comunidades medianas o grandes con mayor tránsito o locales comerciales requieren 2 a 3 días por semana.',
    },
    {
      pregunta: '¿Qué productos deben evitarse en portales de granito de Porriño o mármol?',
      respuesta:
        'Conviene evitar lejías concentradas, salfumán o limpiadores ácidos agresivos que queman el pulido natural de la piedra y el acero inoxidable; en mantenimiento profesional usamos detergentes de pH neutro.',
    },
    {
      pregunta: '¿Qué documentación debe exigir un administrador de fincas (LPH) antes de contratar limpieza?',
      respuesta:
        'Alta de trabajadores en Seguridad Social, acreditación de PRL, póliza en vigor de Seguro de Responsabilidad Civil (RC) y coordinación CAE actualizada, además de cobertura asegurada en vacaciones o bajas.',
    },
  ],
  'limpieza-oficinas-despachos-clinicas-vigo': [
    {
      pregunta: '¿En qué horario se realiza la limpieza de oficinas y clínicas en Vigo?',
      respuesta:
        'Adaptamos los turnos a primera hora antes de abrir, al mediodía en horario partido o al cierre de la jornada para no interferir en la atención a pacientes, clientes ni en el trabajo del equipo.',
    },
    {
      pregunta: '¿Qué diferencia la limpieza de una clínica de la de una oficina convencional?',
      respuesta:
        'Las clínicas y consultas exigen desinfección más frecuente en camillas, salas de espera y aseos con bayetas codificadas por color (sin contaminar zonas administrativas) y productos virucidas/bactericidas sin aromas penetrantes.',
    },
    {
      pregunta: '¿Podéis limpiar la oficina y lavar también las batas o toallas de consulta?',
      respuesta:
        'Sí. Combinamos el mantenimiento periódico de las instalaciones con el lavado y planchado separado de batas y toallas propias (suciedad habitual, sin residuos biológicos infecciosos) desde nuestra planta de Navia.',
    },
  ],
  'como-preparar-apartamento-turistico-entre-huespedes': [
    {
      pregunta: '¿Qué exige el Decreto 12/2017 de la Xunta de Galicia en materia de higiene textil?',
      respuesta:
        'Las Viviendas de Uso Turístico (VUT) en Galicia deben mantenerse en óptimas condiciones de higiene, limpieza y dotación de lencería de cama y baño limpia para cada estancia, evitando olores a humedad o manchas residuales.',
    },
    {
      pregunta: '¿Trabajáis con renting estándar o lavando nuestra lencería propia separada?',
      respuesta:
        'Lavamos, higienizamos y planchamos en calandra tu propia lencería separada por apartamento para que nunca se mezcle, sin imponerte un renting estándar cerrado; además, estamos abiertos a negociar acuerdos a medida según volumen.',
    },
    {
      pregunta: '¿Cubrís entregas y cambios entre las 11:00 y las 15:00 en sábados, festivos y agosto?',
      respuesta:
        'Sí. Adaptamos la logística de recogida de lencería, limpieza entre estancias, reposición de amenities y reporte fotográfico a la ventana real de 11:00 a 15:00 todo el año en Vigo.',
    },
  ],
  'la-colada-en-casa': [
    {
      pregunta: '¿Qué diferencia hay entre una lavandería autoservicio de monedas y la lavandería atendida de Mimos?',
      respuesta:
        'En un autoservicio debes esperar, clasificar tú mismo y asumir ciclos estándar con detergentes genéricos. En Mimos atendemos tu colada en nuestra planta de Navia separando por color y etiqueta, con secado completo frente a la humedad de Vigo y opción de doblado o planchado.',
    },
    {
      pregunta: '¿Laváis edredones de plumas y colchas gruesas dentro de la colada o aparte?',
      respuesta:
        'Los edredones nórdicos de plumas, mantas y colchas requieren tambores de gran formato y ciclos de secado prolongados para que el relleno no se apelmace ni coja olor a humedad en invierno.',
    },
    {
      pregunta: '¿Dónde puedo dejar la colada semanal en Vigo o pedir recogida a domicilio?',
      respuesta:
        'Sin pedido mínimo en nuestras 3 tiendas propias en Vigo (Navia, Gregorio Espino y Rúa Venezuela) y 5 puntos colaboradores; o mediante recogida y entrega a domicilio consultando ruta e importe mínimo con Mimo por WhatsApp.',
    },
  ],
  'guia-arreglos-ropa-bajo-vaquero-vigo': [
    {
      pregunta: '1. ¿Qué diferencia hay entre un bajo original y un bajo a máquina en un vaquero?',
      respuesta:
        'El bajo a máquina corta el remate de fábrica y cose un dobladillo nuevo con pespunte recto, por lo que desaparece el desgaste original. El bajo original (o Euro Hem) conserva la bastilla desgastada de fábrica re-anclándola a la nueva altura mediante un pliegue oculto o un recorte interior sobrehilado. En Mimos Gregorio Espino y Mimos Venezuela valoramos el corte de tu vaquero (recto, ancho, pitillo o campana) para recomendarte la opción que mejor asiente sin frunces.',
    },
    {
      pregunta: '2. ¿Conviene lavar los vaqueros o pantalones de lino antes de cogerles el bajo?',
      respuesta:
        'Sí. Los tejidos naturales sin prelavar sufren un encogimiento longitudinal tras su primer contacto con el agua: alrededor de un 4 % de media en lino puro (hasta 10–15 % con secadora o agua caliente), entre un 4 % y un 10 % en algodón puro, y entre un 3 % y un 8 % en denim crudo sin sanforizar. Si no quieres lavarlos en casa antes de ajustarlos, puedes solicitar primero nuestro circuito de limpieza controlada y marcar después el largo definitivo.',
    },
    {
      pregunta: '3. ¿Qué tengo que llevar a la prueba de un vestido de novia, invitada o traje de ceremonia?',
      respuesta:
        'Debes acudir al probador con el calzado definitivo (o uno con la misma altura exacta de tacón), la ropa interior o faja que utilizarás ese día y los complementos que alteren la caída o el escote, como velo o cinturón. Durante la prueba con la modista en Mimos Gregorio Espino o Mimos Venezuela conviene además caminar, sentarse y levantar los brazos para confirmar que el ajuste resulta cómodo en movimiento.',
    },
    {
      pregunta: '4. ¿Se puede ensanchar una americana de hombros o sacar un vestido de satén sin que quede marca?',
      respuesta:
        'En americanas y chaqués, los hombros sostienen las hombreras, entretelas y la copa de la manga, por lo que estrechar suele ser factible, pero ensanchar de hombros o pecho resulta muy limitado o inviable sin añadir piezas y re-cortar mangas. En vestidos de seda, satén o crepé, solo puede sacarse lo que permita el margen interior de tela y forro, con el riesgo técnico de que el descosido deje microperforaciones de aguja o marcas de planchado anteriores.',
    },
    {
      pregunta: '5. ¿Cuándo hay que limpiar una prenda de ceremonia antes del arreglo y cuándo después?',
      respuesta:
        'Si la prenda es de segunda mano, vintage, de alquiler o tiene manchas de sudor, maquillaje o bebida, debe limpiarse antes de arreglarla para evitar que las manchas orgánicas se oxiden o se fijen con la plancha del taller. Si la prenda es nueva y está limpia, se realiza primero el arreglo de costura y después el acabado profesional (Wet Cleaning o limpieza en seco y vaporizado final según tejido) para entregarla lista para el evento.',
    },
    {
      pregunta: '6. Si la cremallera de una cazadora se abre sola, ¿hay que cambiarla entera?',
      respuesta:
        'No necesariamente. Si los dientes y la cinta están sanos y el problema reside únicamente en el cursor desgastado, perdido o en la rotura de la cajita o el tope inferior, puede sustituirse solo el carro o la pieza de cierre sin descoser la prenda. El cambio completo es necesario cuando faltan dientes, la espiral está dañada o la cinta está rasgada. En prendas de piel requiere agujas cortantes y puntada larga (3–3,5 mm) para no debilitar el cuero.',
    },
    {
      pregunta: '7. ¿Puedo llevar prendas a arreglar en Navia o necesito ir a otro centro de Mimos en Vigo?',
      respuesta:
        'Depende de si necesitas probador. Para marcar bajos con tu calzado o probar vestidos, americanas y prendas complejas con la modista in situ, debes acudir sin cita previa (en horario comercial) a Mimos Gregorio Espino (O Calvario; L–V y sábados mañana) o a Mimos Venezuela (Centro; L–V). Si ya tienes definido el arreglo y no requiere prueba sobre el cuerpo, puedes entregarlo en nuestra Sede Central de Navia (Teixugueiras, 11, bajo 9), donde anotamos tus especificaciones y trasladamos la prenda a nuestros talleres propios sin coste adicional. Recuerda que D’Passo (As Travesas) y Redondela son únicamente puntos de recepción de tintorería y lavandería.',
    },
  ],
  'humedad-acaros-colchones-sofas-vigo': [
    {
      pregunta: '1. ¿Cómo quitar las manchas amarillas de sudor del colchón sin que salga un cerco alrededor?',
      respuesta:
        'Las marcas amarillas proceden de sales, grasas corporales y sudor oxidado acumulado en las fibras. Frotar o humedecer sin extracción suele desplazar la suciedad hacia los bordes creando un cerco por capilaridad (wick-back). En casa conviene aspirar en seco y proteger el colchón con funda transpirable; los cercos ya formados requieren pretratamiento localizado e inyección-extracción profesional controlada para retirar el residuo sin saturar la espuma.',
    },
    {
      pregunta: '2. ¿El bicarbonato y el vinagre realmente limpian el colchón y eliminan los ácaros?',
      respuesta:
        'No. El bicarbonato puede absorber parte de la humedad y olores superficiales y el vinagre aporta acidez suave, pero ninguno desinfecta en profundidad ni elimina de forma fiable los ácaros y sus alérgenos del interior del colchón. Además, pulverizar líquidos innecesarios sin extracción mecánica empuja la humedad al núcleo y eleva el riesgo de moho y cercos.',
    },
    {
      pregunta: '3. ¿Se puede limpiar un colchón viscoelástico o de muelles con vaporeta o vapor caliente?',
      respuesta:
        'No es aconsejable. Principales fabricantes de colchones viscoelásticos prohíben explícitamente la limpieza con vapor —incluido el vapor seco— porque la humedad introducida a presión y el calor reblandecen y degradan de forma duradera la espuma viscoelástica y de poliuretano, además de generar riesgo de moho interno si retiene humedad más de 48 horas.',
    },
    {
      pregunta: '4. ¿Cómo limpiar una mancha de sangre fresca en el colchón sin fijarla?',
      respuesta:
        'Actúa al momento absorbiendo en vertical con un paño blanco limpio y agua fría, presionando desde fuera hacia el centro sin frotar. Nunca utilices agua caliente ni vapor: el calor coagula las proteínas de la sangre (como la fibrina) y sella la mancha en las fibras.',
    },
    {
      pregunta: '5. ¿Por qué sale moho debajo del colchón o dentro del canapé aunque la habitación parezca limpia?',
      respuesta:
        'En zonas húmedas como Vigo (77 % de humedad media anual y 80–85 % entre octubre y enero), el moho del canapé aparece por condensación y falta de circulación de aire. El vapor del cuerpo al dormir choca con paredes exteriores o suelos fríos y queda atrapado si el canapé está pegado al muro o lleno de textiles. Sepáralo 5–10 cm de la pared, ventila a diario y limpia el moho con protección antes de valorar el colchón.',
    },
    {
      pregunta: '6. ¿Qué hacer si se ha orinado un niño o mascota en el colchón y persiste el olor?',
      respuesta:
        'Seca de inmediato presionando con papel absorbente o toallas secas sin frotar ni añadir abundante agua para no empujar la orina al núcleo. No apliques lejía, ya que fija la mancha proteica y libera gases cloramina tóxicos al reaccionar con el amoníaco de la orina. Cuando la orina alcanza la espuma interior, la limpieza casera superficial no resuelve el foco y conviene recurrir a extracción profesional.',
    },
    {
      pregunta: '7. ¿Se puede usar lejía o amoníaco para desinfectar y blanquear colchones o sofás?',
      respuesta:
        'No. La lejía debilita y decolora los tejidos de forma desigual, fija manchas proteicas de sangre, orina y sudor, y produce gases tóxicos peligrosos (cloramina, gas cloro o cloroformo) si entra en contacto con orina, amoníaco, vinagre o alcohol. El amoníaco puro también daña la espuma interna y acelera el pardeamiento celulósico en algodón y lino.',
    },
    {
      pregunta: '8. ¿Se pueden meter en la lavadora las fundas con cremallera de los cojines del sofá?',
      respuesta:
        'Solo si la etiqueta del fabricante autoriza expresamente el lavado a máquina. En muchos sofás, la cremallera responde únicamente al proceso de tapizado en fábrica y lavar las fundas en casa provoca encogimiento, impidiendo volver a cerrarlas. En Tintorería Mimos revisamos la etiqueta y solo retiramos a planta en Vigo las fundas desenfundables aptas.',
    },
    {
      pregunta: '9. ¿Qué significan las letras W, S, WS y X en la etiqueta del sofá?',
      respuesta:
        'Indican la química segura de limpieza: W admite productos de base agua con humedad controlada; S exige disolventes en seco sin nada de agua; WS (o SW) permite base agua o disolvente suave tras prueba en zona oculta; y X restringe el cuidado únicamente a aspirado y cepillado suave en seco sin líquidos.',
    },
    {
      pregunta: '10. ¿Cómo limpiar un sofá antimanchas tipo Aquaclean, de microfibra, terciopelo o viscosa sin dañarlo?',
      respuesta:
        'En tejidos Aquaclean suele bastar agua y jabón neutro con un paño blanco para manchas recientes, evitando siempre lejía o amoníaco. La microfibra resiste bien líquidos acuosos pero absorbe con rapidez aceites y grasas corporales. En terciopelo y chenilla evita empapar o frotar y aspira en el sentido del pelo; y en viscosa o rayón evita la limpieza húmeda convencional por riesgo de hinchamiento y rotura de la fibra.',
    },
    {
      pregunta: '11. ¿Los ácaros del polvo pican y basta con dejar la cama sin hacer para eliminarlos?',
      respuesta:
        'No. Los ácaros domésticos del género Dermatophagoides no muerden ni pican; sus alérgenos provocan síntomas respiratorios o cutáneos por exposición. Retirar la ropa de cama entre 20 y 60 minutos cada mañana ayuda a disipar la humedad nocturna, pero en climas húmedos requiere complementarse con lavado semanal de sábanas a 54–60 °C, fundas antiácaros transpirables y aspirado con filtro HEPA.',
    },
    {
      pregunta: '12. ¿Cuánto tarda en secar al aire un sofá o colchón limpio en un clima húmedo como Vigo?',
      respuesta:
        'Tras una inyección-extracción controlada, la referencia habitual en interiores bien ventilados es de 8 a 12 horas, aunque en Vigo —donde la humedad exterior alcanza el 80–85 % entre octubre y enero— varía según el grosor y densidad de la espuma y el tipo de tejido. Mantener ventilación cruzada continua permite un secado natural seguro sin usar ventiladores industriales ni aire caliente, muy por debajo del umbral de 48 horas.',
    },
  ],
};
