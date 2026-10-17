import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Printer, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  HelpCircle
} from 'lucide-react';

export interface SimboloTextil {
  id: string;
  categoria: 'lavado' | 'blanqueo' | 'secado' | 'planchado' | 'profesional';
  categoriaNombre: string;
  nombre: string;
  simboloNombre: string;
  temperatura?: string;
  significado: string;
  detalleTecnico: string;
  riesgo: string;
  recomendacionMimos: string;
  svgCode: string;
  servicioRelacionado?: {
    texto: string;
    href: string;
  };
}

export const SIMBOLOS_TEXTILES: SimboloTextil[] = [
  // --- 1. LAVADO EN AGUA ---
  {
    id: 'lavado-30',
    categoria: 'lavado',
    categoriaNombre: 'Lavado en agua',
    nombre: 'Lavado a máximo 30 °C',
    simboloNombre: 'Cubeta con número 30° o 1 punto',
    temperatura: '30 °C',
    significado: 'Lavado a máquina a temperatura moderada para prendas delicadas y sintéticas.',
    detalleTecnico: 'Evita la dilatación térmica de fibras elastómeras (spandex, elastano) y preserva los tintes reactivos.',
    riesgo: 'A temperaturas superiores, las fibras sintéticas pierden elasticidad y los colores oscuros pueden desteñir.',
    recomendacionMimos: 'Utiliza detergente líquido neutro y programa corto. En Mimos recomendamos no sobrecargar el tambor.',
    svgCode: `<path d="M 12,32 L 17,80 L 83,80 L 88,32 Q 78,42 68,32 Q 58,22 48,32 Q 38,42 28,32 Q 20,24 12,32 Z" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round"/>
    <text x="50" y="66" font-family="system-ui, sans-serif" font-size="22" font-weight="800" text-anchor="middle" fill="currentColor">30°</text>`,
    servicioRelacionado: {
      texto: 'Ver servicio de lavandería',
      href: '/lavanderia-vigo',
    },
  },
  {
    id: 'lavado-40',
    categoria: 'lavado',
    categoriaNombre: 'Lavado en agua',
    nombre: 'Lavado a máximo 40 °C',
    simboloNombre: 'Cubeta con número 40° o 2 puntos',
    temperatura: '40 °C',
    significado: 'Temperatura estándar para ropa de uso diario: algodón, mezclas de poliéster y camisas de color.',
    detalleTecnico: 'Temperatura idónea para que los tensioactivos activen enzimas quitamanchas (proteasas y lipasas) sin dañar el tejido.',
    riesgo: 'No apto para lana pura ni seda natural, que sufren apelmazamiento térmico a partir de 35 °C.',
    recomendacionMimos: 'Separa siempre por tonalidades (blancos, claros y oscuros) para prevenir transferencia de microtintes.',
    svgCode: `<path d="M 12,32 L 17,80 L 83,80 L 88,32 Q 78,42 68,32 Q 58,22 48,32 Q 38,42 28,32 Q 20,24 12,32 Z" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round"/>
    <text x="50" y="66" font-family="system-ui, sans-serif" font-size="22" font-weight="800" text-anchor="middle" fill="currentColor">40°</text>`,
    servicioRelacionado: {
      texto: 'Colada y ropa de diario en Vigo',
      href: '/lavanderia-vigo',
    },
  },
  {
    id: 'lavado-60',
    categoria: 'lavado',
    categoriaNombre: 'Lavado en agua',
    nombre: 'Lavado a máximo 60 °C',
    simboloNombre: 'Cubeta con número 60° o 3 puntos',
    temperatura: '60 °C',
    significado: 'Lavado higienizante térmico para ropa blanca de cama, toallas resistentes y prendas de trabajo.',
    detalleTecnico: 'A 60 °C se consigue desnaturalización de bacterias domésticas, hongos y ácaros del polvo sin necesidad de químicos agresivos.',
    riesgo: 'Encogimiento severo en prendas con porcentaje de viscosa, modal o lana.',
    recomendacionMimos: 'Indicado para sábanas de hostelería o toallas de rizo 100% algodón. En Mimos aplicamos suavizantes textiles profesionales.',
    svgCode: `<path d="M 12,32 L 17,80 L 83,80 L 88,32 Q 78,42 68,32 Q 58,22 48,32 Q 38,42 28,32 Q 20,24 12,32 Z" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round"/>
    <text x="50" y="66" font-family="system-ui, sans-serif" font-size="22" font-weight="800" text-anchor="middle" fill="currentColor">60°</text>`,
    servicioRelacionado: {
      texto: 'Limpieza de textiles turísticos',
      href: '/limpieza-apartamentos-turisticos-vigo',
    },
  },
  {
    id: 'lavado-95',
    categoria: 'lavado',
    categoriaNombre: 'Lavado en agua',
    nombre: 'Lavado a 95 °C (Ebullición)',
    simboloNombre: 'Cubeta con 95°',
    temperatura: '95 °C',
    significado: 'Ciclo de alta temperatura para ropa hospitalaria o mantelería de algodón puro blanca sin estampados.',
    detalleTecnico: 'Desinfección térmica profunda de nivel sanitario.',
    riesgo: 'Degenera casi cualquier tejido que no sea lino o algodón blanqueado al cloro.',
    recomendacionMimos: 'Uso restringido a mantelerías profesionales y textiles industriales.',
    svgCode: `<path d="M 12,32 L 17,80 L 83,80 L 88,32 Q 78,42 68,32 Q 58,22 48,32 Q 38,42 28,32 Q 20,24 12,32 Z" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round"/>
    <text x="50" y="66" font-family="system-ui, sans-serif" font-size="22" font-weight="800" text-anchor="middle" fill="currentColor">95°</text>`,
  },
  {
    id: 'lavado-delicado-barra',
    categoria: 'lavado',
    categoriaNombre: 'Lavado en agua',
    nombre: 'Lavado con centrifugado reducido (1 barra)',
    simboloNombre: 'Cubeta con 1 barra inferior',
    significado: 'Ciclo suave de lavado: acción mecánica reducida y centrifugado a bajas revoluciones.',
    detalleTecnico: 'La barra inferior indica que la prenda contiene fibras sensibles a la fricción que pueden desfibrarse o formar pilling (pelotillas).',
    riesgo: 'Un centrifugado normal a 1200 rpm romperá costuras finas o deformará el patrón.',
    recomendacionMimos: 'Programa sintéticos o prendas delicadas a un máximo de 600-800 rpm.',
    svgCode: `<path d="M 12,28 L 17,70 L 83,70 L 88,28 Q 78,38 68,28 Q 58,18 48,28 Q 38,38 28,28 Q 20,20 12,28 Z" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round"/>
    <line x1="16" y1="84" x2="84" y2="84" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>`,
  },
  {
    id: 'lavado-muy-delicado-doble-barra',
    categoria: 'lavado',
    categoriaNombre: 'Lavado en agua',
    nombre: 'Lavado muy delicado (2 barras)',
    simboloNombre: 'Cubeta con 2 barras inferiores',
    significado: 'Ciclo ultra delicado para lana lavable a máquina, viscosas fluidas o sedas certificadas.',
    detalleTecnico: 'Requiere nivel alto de agua para amortiguar el roce y centrifugado breve a 400 rpm.',
    riesgo: 'Alto riesgo de afieltrado si se aplica fricción continua con poca agua.',
    recomendacionMimos: 'Usa una bolsa de malla protectora y nunca centrifugues a alta velocidad.',
    svgCode: `<path d="M 12,24 L 17,62 L 83,62 L 88,24 Q 78,34 68,24 Q 58,14 48,24 Q 38,34 28,24 Q 20,16 12,24 Z" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round"/>
    <line x1="16" y1="74" x2="84" y2="74" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="16" y1="86" x2="84" y2="86" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>`,
  },
  {
    id: 'lavado-a-mano',
    categoria: 'lavado',
    categoriaNombre: 'Lavado en agua',
    nombre: 'Lavado exclusivamente a mano',
    simboloNombre: 'Cubeta con una mano sumergida',
    temperatura: 'Máx 40 °C',
    significado: 'Prohibido el uso de lavadora mecánica. Requiere lavado manual por inmersión suave.',
    detalleTecnico: 'Fibras naturales vivas como cashmere, alpaca, seda o lino artesanal cuya cutícula se cierra y afieltra ante cualquier rotación mecánica.',
    riesgo: 'Meter esta prenda en lavadora provocará un encogimiento del 20% al 40% irreversible.',
    recomendacionMimos: 'No frotar ni retorcer. Si tienes dudas con jerséis valiosos o trajes de fiesta, nuestro sistema Wet Cleaning profesional lo limpia con total seguridad.',
    svgCode: `<path d="M 12,38 L 17,80 L 83,80 L 88,38 Q 78,48 68,38 Q 58,28 48,38 Q 38,48 28,38 Q 20,30 12,38 Z" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M 45,14 L 45,45 M 52,18 L 52,45 M 59,22 L 59,45 M 66,28 L 66,45 M 39,26 L 39,38 Q 39,46 45,50 L 58,56 L 70,52 L 72,40 L 72,25" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    servicioRelacionado: {
      texto: 'Cuidado de prendas delicadas en Mimos',
      href: '/tintoreria-vigo',
    },
  },
  {
    id: 'lavado-prohibido',
    categoria: 'lavado',
    categoriaNombre: 'Lavado en agua',
    nombre: 'Prohibido lavar en agua',
    simboloNombre: 'Cubeta tachada con cruz de San Andrés',
    significado: 'La prenda no puede entrar en contacto con agua líquida.',
    detalleTecnico: 'Los enlaces de hidrógeno de la fibra o los acabados de entretela se descomponen con el agua, provocando deformación de hombreras, cuellos y forros.',
    riesgo: 'Arrugas permanentes, manchas de agua, deformación total de americanas, abrigos y trajes sastre.',
    recomendacionMimos: 'Prenda 100% de tintorería profesional. Tráela a nuestras tiendas en Vigo para limpieza en seco o hidrocarburos.',
    svgCode: `<path d="M 12,32 L 17,80 L 83,80 L 88,32 Q 78,42 68,32 Q 58,22 48,32 Q 38,42 28,32 Q 20,24 12,32 Z" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round"/>
    <line x1="14" y1="18" x2="86" y2="88" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>
    <line x1="86" y1="18" x2="14" y2="88" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>`,
    servicioRelacionado: {
      texto: 'Tintorería en seco en Vigo',
      href: '/tintoreria-vigo',
    },
  },

  // --- 2. BLANQUEO Y LEJÍAS ---
  {
    id: 'blanqueo-permitido',
    categoria: 'blanqueo',
    categoriaNombre: 'Blanqueo y desmanchado',
    nombre: 'Se permite cualquier blanqueador',
    simboloNombre: 'Triángulo equilátero vacío',
    significado: 'La prenda tolera blanqueadores clorados (lejía tradicional) y oxigenados.',
    detalleTecnico: 'Tejidos 100% algodón blanco puro o lino crudo sin tintes ni acabados sintéticos.',
    riesgo: 'Si se aplica sobre fibras de color o poliamida se produce una decoloración o amarilleamiento químico fulminante.',
    recomendacionMimos: 'Diluye siempre el blanqueador en agua fría; nunca lo viertas concentrado sobre el tejido seco.',
    svgCode: `<polygon points="50,15 12,85 88,85" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round"/>`,
  },
  {
    id: 'blanqueo-oxigeno',
    categoria: 'blanqueo',
    categoriaNombre: 'Blanqueo y desmanchado',
    nombre: 'Solo blanqueadores con oxígeno (Sin cloro)',
    simboloNombre: 'Triángulo con dos líneas diagonales interiores',
    significado: 'Admite percarbonato de sodio o agua oxigenada comercial, pero NUNCA lejía común.',
    detalleTecnico: 'El oxígeno activo rompe los cromóforos de las manchas orgánicas sin degradar la celulosa ni disolver los tintes moderados.',
    riesgo: 'El cloro romperá los enlaces moleculares de la fibra provocando agujeros microscópicos tras varios lavados.',
    recomendacionMimos: 'Utiliza percarbonato a partir de 40 °C para activar la liberación de oxígeno efervescente.',
    svgCode: `<polygon points="50,15 12,85 88,85" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round"/>
    <line x1="42" y1="50" x2="28" y2="85" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    <line x1="58" y1="50" x2="44" y2="85" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>`,
  },
  {
    id: 'blanqueo-prohibido',
    categoria: 'blanqueo',
    categoriaNombre: 'Blanqueo y desmanchado',
    nombre: 'No usar lejía ni blanqueadores',
    simboloNombre: 'Triángulo tachado con cruz',
    significado: 'Prohibido el uso de lejía, cloro, perboratos o quitamanchas agresivos.',
    detalleTecnico: 'Muy común en ropa de color, licra, lana, elastano y ropa técnica impermeable (membranas tipo Gore-Tex).',
    riesgo: 'Decoloración irreversible (manchas rosas o amarillas) y destrucción de la membrana repelente al agua.',
    recomendacionMimos: 'Trata las manchas difíciles con jabón potásico localizado o tráela a Tintorería Mimos antes de aplicar experimentos caseros.',
    svgCode: `<polygon points="50,15 12,85 88,85" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round"/>
    <line x1="16" y1="24" x2="84" y2="84" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>
    <line x1="84" y1="24" x2="16" y2="84" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>`,
    servicioRelacionado: {
      texto: 'Desmanchado profesional en Vigo',
      href: '/tintoreria-vigo',
    },
  },

  // --- 3. SECADO A MÁQUINA Y NATURAL ---
  {
    id: 'secadora-permitida',
    categoria: 'secado',
    categoriaNombre: 'Secado en secadora y al aire',
    nombre: 'Secado en secadora permitido',
    simboloNombre: 'Cuadrado con círculo interior',
    significado: 'Prenda apta para secado mecánico a temperatura estándar.',
    detalleTecnico: 'Tejidos estables preencogidos, toallas de algodón y ropa deportiva de poliéster de alta tenacidad.',
    riesgo: 'No sobrecargar la secadora para evitar rozamiento por bola apelmazada.',
    recomendacionMimos: 'Retira la colada ligeramente húmeda para facilitar el posterior planchado.',
    svgCode: `<rect x="15" y="15" width="70" height="70" rx="6" fill="none" stroke="currentColor" stroke-width="4.5"/>
    <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" stroke-width="4.5"/>`,
  },
  {
    id: 'secadora-baja-temperatura',
    categoria: 'secado',
    categoriaNombre: 'Secado en secadora y al aire',
    nombre: 'Secadora a baja temperatura (Máx 60 °C)',
    simboloNombre: 'Cuadrado con círculo y 1 punto central',
    temperatura: '60 °C máx',
    significado: 'Ciclo delicado para prendas sintéticas, camisas de algodón fino y ropa con elastano.',
    detalleTecnico: 'El calor excesivo retrae las moléculas poliméricas y causa ondulación irreversible en cremalleras y costuras.',
    riesgo: 'Encogimiento de entre un 5% y un 10% si se superan los 60 °C.',
    recomendacionMimos: 'Selecciona el programa sintéticos delicados en tu secadora doméstica.',
    svgCode: `<rect x="15" y="15" width="70" height="70" rx="6" fill="none" stroke="currentColor" stroke-width="4.5"/>
    <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" stroke-width="4.5"/>
    <circle cx="50" cy="50" r="4.5" fill="currentColor"/>`,
  },
  {
    id: 'secadora-normal-temperatura',
    categoria: 'secado',
    categoriaNombre: 'Secado en secadora y al aire',
    nombre: 'Secadora a temperatura normal (Máx 80 °C)',
    simboloNombre: 'Cuadrado con círculo y 2 puntos centrales',
    temperatura: '80 °C máx',
    significado: 'Secado estándar para toallas, sábanas de algodón y ropa de lona resistente.',
    detalleTecnico: 'Las fibras celulósicas puras admiten 80 °C sin contracción molecular.',
    riesgo: 'Si hay mezclas con poliéster no certificado, pueden fijarse arrugas muy difíciles de planchar.',
    recomendacionMimos: 'Excelente para conseguir el tacto esponjoso de las toallas de baño.',
    svgCode: `<rect x="15" y="15" width="70" height="70" rx="6" fill="none" stroke="currentColor" stroke-width="4.5"/>
    <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" stroke-width="4.5"/>
    <circle cx="42" cy="50" r="4" fill="currentColor"/>
    <circle cx="58" cy="50" r="4" fill="currentColor"/>`,
  },
  {
    id: 'secadora-prohibida',
    categoria: 'secado',
    categoriaNombre: 'Secado en secadora y al aire',
    nombre: 'Prohibido usar secadora',
    simboloNombre: 'Cuadrado con círculo tachado',
    significado: 'Bajo ningún concepto introducir en la secadora de tambor.',
    detalleTecnico: 'El binomio calor + torsión mecánica causa colapso estructural en lanas, sedas, viscosas, tejidos elásticos y plumíferos no preparados.',
    riesgo: 'Un edredón de plumas o un jersey de cashmere saldrá reducido a la mitad de su tamaño original.',
    recomendacionMimos: 'En Tintorería Mimos disponemos de secadoras profesionales con flujo de aire volumétrico y control de humedad residual para nórdicos.',
    svgCode: `<rect x="15" y="15" width="70" height="70" rx="6" fill="none" stroke="currentColor" stroke-width="4.5"/>
    <circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" stroke-width="4.5"/>
    <line x1="16" y1="16" x2="84" y2="84" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>
    <line x1="84" y1="16" x2="16" y2="84" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>`,
    servicioRelacionado: {
      texto: 'Limpieza y secado de edredones en Vigo',
      href: '/edredones-mimos-vigo',
    },
  },
  {
    id: 'secado-horizontal',
    categoria: 'secado',
    categoriaNombre: 'Secado en secadora y al aire',
    nombre: 'Secar en plano / horizontal',
    simboloNombre: 'Cuadrado con una raya horizontal central',
    significado: 'Extender la prenda en posición plana horizontal sobre una toalla o rejilla.',
    detalleTecnico: 'El peso del agua acumulada en las fibras de punto estira las costuras y deforma los hombros si se cuelga en vertical.',
    riesgo: 'Un jersey colgado en una percha o tendal húmedo se alargará hasta 10 centímetros de manera irrecuperable.',
    recomendacionMimos: 'Coloca el jersey sobre una toalla limpia en horizontal y déjalo secar sin doblar las mangas.',
    svgCode: `<rect x="15" y="15" width="70" height="70" rx="6" fill="none" stroke="currentColor" stroke-width="4.5"/>
    <line x1="28" y1="50" x2="72" y2="50" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>`,
  },
  {
    id: 'secado-sombra',
    categoria: 'secado',
    categoriaNombre: 'Secado en secadora y al aire',
    nombre: 'Secar a la sombra',
    simboloNombre: 'Cuadrado con una raya diagonal en la esquina superior izquierda',
    significado: 'Tender en un lugar ventilado pero protegido de la radiación solar directa.',
    detalleTecnico: 'Los rayos ultravioleta (UV) fotooxidan los pigmentos de color y degradan la lignina y fibras delicadas como la seda, causando tonalidades amarillentas.',
    riesgo: 'Prendas negras o de tonos intensos quedan desteñidas y con marcas desiguales del sol.',
    recomendacionMimos: 'Tiende siempre la ropa del revés y en zonas sombreadas con buena corriente de aire.',
    svgCode: `<rect x="15" y="15" width="70" height="70" rx="6" fill="none" stroke="currentColor" stroke-width="4.5"/>
    <line x1="20" y1="36" x2="36" y2="20" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>`,
  },
  {
    id: 'no-retorcer',
    categoria: 'secado',
    categoriaNombre: 'Secado en secadora y al aire',
    nombre: 'No escurrir retorciendo',
    simboloNombre: 'Lazo de tela con aspa tachada',
    significado: 'No torcer la prenda con las manos para sacar el agua sobrante.',
    detalleTecnico: 'La torsión manual desgarra las microfibras y fractura el hilado interno de americanas, forros y vestidos.',
    riesgo: 'Rotura de costuras y arrugas de estrés mecánico que no desaparecen con la plancha.',
    recomendacionMimos: 'Envuelve la prenda en una toalla seca de rizo y presiona suavemente con las palmas para absorber la humedad.',
    svgCode: `<path d="M 20,40 C 35,25 35,75 50,50 C 65,25 65,75 80,60" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>
    <path d="M 20,60 C 35,75 35,25 50,50 C 65,75 65,25 80,40" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="22" y1="22" x2="78" y2="78" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>
    <line x1="78" y1="22" x2="22" y2="78" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>`,
  },

  // --- 4. PLANCHADO ---
  {
    id: 'planchado-permitido',
    categoria: 'planchado',
    categoriaNombre: 'Planchado y temperatura',
    nombre: 'Planchado permitido',
    simboloNombre: 'Silueta de plancha sin puntos',
    significado: 'La prenda tolera el planchado doméstico a cualquier temperatura habitual.',
    detalleTecnico: 'Tejido muy estable frente al calor superficial.',
    riesgo: 'Siempre es preferible regular la temperatura de menos a más.',
    recomendacionMimos: 'En caso de duda, plancha siempre por el revés de la prenda.',
    svgCode: `<path d="M 18,65 L 82,65 C 82,65 80,42 60,42 L 28,42 L 18,65 Z M 28,42 L 28,26 L 68,26" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>`,
  },
  {
    id: 'plancha-1-punto',
    categoria: 'planchado',
    categoriaNombre: 'Planchado y temperatura',
    nombre: 'Plancha a baja temperatura (Máx 110 °C, sin vapor)',
    simboloNombre: 'Plancha con 1 punto interior',
    temperatura: '110 °C máx',
    significado: 'Fibras muy sensibles al calor: nylon, poliamida, acetato, elastano y seda natural pura.',
    detalleTecnico: 'El vapor directo a alta presión puede causar manchas de agua en sedas o fundir polímeros de bajo punto de fusión.',
    riesgo: 'Quemar el tejido al instante dejando una marca brillante, acartonada o agujereada.',
    recomendacionMimos: 'Plancha siempre en seco, colocando un paño fino de algodón húmedo entre la plancha y la prenda delicada.',
    svgCode: `<path d="M 18,65 L 82,65 C 82,65 80,42 60,42 L 28,42 L 18,65 Z M 28,42 L 28,26 L 68,26" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="50" cy="55" r="4.5" fill="currentColor"/>`,
    servicioRelacionado: {
      texto: 'Planchado profesional para camisas y vestidos en Vigo',
      href: '/planchado-vigo',
    },
  },
  {
    id: 'plancha-2-puntos',
    categoria: 'planchado',
    categoriaNombre: 'Planchado y temperatura',
    nombre: 'Plancha a temperatura media (Máx 150 °C)',
    simboloNombre: 'Plancha con 2 puntos interiores',
    temperatura: '150 °C máx',
    significado: 'Prendas de lana, mezclas de poliéster-algodón y viscosas de confección estándar.',
    detalleTecnico: 'Admite vapor moderado para relajar las fibras y alisar arrugas sin generar estrés térmico.',
    riesgo: 'Si se pasa la plancha caliente directamente sobre lana oscura sin paño protector, se provocan brillos irreversibles en las costuras.',
    recomendacionMimos: 'En Tintorería Mimos usamos maniquís de vaporización neumática y centros de planchado por aspiración que eliminan arrugas sin aplastar el pelo de la lana.',
    svgCode: `<path d="M 18,65 L 82,65 C 82,65 80,42 60,42 L 28,42 L 18,65 Z M 28,42 L 28,26 L 68,26" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="42" cy="55" r="4" fill="currentColor"/>
    <circle cx="58" cy="55" r="4" fill="currentColor"/>`,
    servicioRelacionado: {
      texto: 'Planchado profesional en Vigo',
      href: '/planchado-vigo',
    },
  },
  {
    id: 'plancha-3-puntos',
    categoria: 'planchado',
    categoriaNombre: 'Planchado y temperatura',
    nombre: 'Plancha a temperatura alta (Máx 200 °C)',
    simboloNombre: 'Plancha con 3 puntos interiores',
    temperatura: '200 °C máx',
    significado: 'Tejidos 100% naturales pesados: lino puro, mantelerías de algodón y camisas Oxford gruesas.',
    detalleTecnico: 'La celulosa cristalina del lino requiere calor intenso y golpe de vapor para ceder y alisarse por completo.',
    riesgo: 'No aplicar sobre botones de plástico o cremalleras, ya que se funden al contacto.',
    recomendacionMimos: 'Humedece ligeramente la tela de lino unos minutos antes de plancharla para conseguir un acabado de sastrería impecable.',
    svgCode: `<path d="M 18,65 L 82,65 C 82,65 80,42 60,42 L 28,42 L 18,65 Z M 28,42 L 28,26 L 68,26" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="34" cy="55" r="3.5" fill="currentColor"/>
    <circle cx="50" cy="55" r="3.5" fill="currentColor"/>
    <circle cx="66" cy="55" r="3.5" fill="currentColor"/>`,
  },
  {
    id: 'planchado-sin-vapor',
    categoria: 'planchado',
    categoriaNombre: 'Planchado y temperatura',
    nombre: 'Planchar solo en seco (Sin vapor)',
    simboloNombre: 'Plancha con líneas de vapor tachadas debajo',
    significado: 'Planchado permitido pero con el vapor de la plancha totalmente desactivado.',
    detalleTecnico: 'Común en prendas con tratamientos hidrófugos superficiales o sedas tafetán susceptibles de aureolas de humedad.',
    riesgo: 'Las gotas microscópicas de la plancha dejan manchas redondas permanentes.',
    recomendacionMimos: 'Comprueba que el depósito de tu plancha no gotee o desactiva la caldera de vapor.',
    svgCode: `<path d="M 18,55 L 82,55 C 82,55 80,32 60,32 L 28,32 L 18,55 Z M 28,32 L 28,18 L 68,18" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>
    <line x1="32" y1="68" x2="38" y2="82" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <line x1="50" y1="68" x2="50" y2="84" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <line x1="68" y1="68" x2="62" y2="82" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
    <line x1="24" y1="70" x2="76" y2="84" stroke="#DC2626" stroke-width="4.5" stroke-linecap="round"/>
    <line x1="76" y1="70" x2="24" y2="84" stroke="#DC2626" stroke-width="4.5" stroke-linecap="round"/>`,
  },
  {
    id: 'planchado-prohibido',
    categoria: 'planchado',
    categoriaNombre: 'Planchado y temperatura',
    nombre: 'Prohibido usar la plancha',
    simboloNombre: 'Plancha tachada con cruz',
    significado: 'Tejidos que no toleran ninguna aplicación directa de plancha caliente.',
    detalleTecnico: 'Prendas acolchadas térmicas, microfibras termoselladas, polipiel, vinilo o acabados encerados.',
    riesgo: 'Fusión plástica inmediata del tejido con adherencia a la suela de la plancha.',
    recomendacionMimos: 'Tratamos estas prendas exclusivamente con túneles de vapor suave suspendido que eliminan arrugas por gravedad.',
    svgCode: `<path d="M 18,65 L 82,65 C 82,65 80,42 60,42 L 28,42 L 18,65 Z M 28,42 L 28,26 L 68,26" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>
    <line x1="16" y1="16" x2="84" y2="84" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>
    <line x1="84" y1="16" x2="16" y2="84" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>`,
  },

  // --- 5. LIMPIEZA PROFESIONAL (CÍRCULOS) ---
  {
    id: 'limpieza-seco-general',
    categoria: 'profesional',
    categoriaNombre: 'Limpieza profesional (Tintorería)',
    nombre: 'Limpieza en seco profesional permitida',
    simboloNombre: 'Círculo vacío',
    significado: 'La prenda debe limpiarse en tintorería especializada mediante disolventes.',
    detalleTecnico: 'El círculo es el símbolo reservado internacionalmente a los profesionales del cuidado textil.',
    riesgo: 'Cualquier intento de lavado en agua doméstica encogerá el paño y apelmazará la prenda.',
    recomendacionMimos: 'Entrega tu prenda en cualquiera de nuestras 3 tiendas en Vigo o en nuestros 5 puntos colaboradores.',
    svgCode: `<circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="5"/>`,
    servicioRelacionado: {
      texto: 'Tiendas y puntos de recogida en Vigo',
      href: '/puntos-mimos',
    },
  },
  {
    id: 'limpieza-seco-p',
    categoria: 'profesional',
    categoriaNombre: 'Limpieza profesional (Tintorería)',
    nombre: 'Limpieza con Percloroetileno / Disolventes habituales (P)',
    simboloNombre: 'Círculo con letra P interior',
    significado: 'Apta para limpieza en seco con percloroetileno y solventes minerales tradicionales.',
    detalleTecnico: 'El solvente más extendido en tintorería. Disuelve las grasas corporales y manchas oleosas sin tocar los enlaces de hidrógeno de la lana.',
    riesgo: 'No aplicar en tejidos con revestimientos plásticos termosensibles o lentejuelas no certificadas.',
    recomendacionMimos: 'Es el proceso estándar para trajes de caballero, americanas, faldas sastre y abrigos de paño en nuestras instalaciones.',
    svgCode: `<circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="5"/>
    <text x="50" y="62" font-family="system-ui, sans-serif" font-size="34" font-weight="900" text-anchor="middle" fill="currentColor">P</text>`,
    servicioRelacionado: {
      texto: 'Tintorería en seco para trajes en Vigo',
      href: '/tintoreria-vigo',
    },
  },
  {
    id: 'limpieza-seco-p-barra',
    categoria: 'profesional',
    categoriaNombre: 'Limpieza profesional (Tintorería)',
    nombre: 'Limpieza P con ciclo suave / acción mecánica reducida',
    simboloNombre: 'Círculo con letra P y una barra inferior',
    significado: 'Limpieza en seco con disolventes pero con temperatura, humedad y centrifugado estrictamente controlados.',
    detalleTecnico: 'Prendas con apliques delicados, botones forrados o tejidos de lana fina propensos al roce en el tambor de destilación.',
    riesgo: 'Pérdida de botones o deformación de forros finos si no se regula la velocidad del bombo.',
    recomendacionMimos: 'Protegemos botones y cremalleras con protectores térmicos individuales antes de iniciar el ciclo.',
    svgCode: `<circle cx="50" cy="46" r="33" fill="none" stroke="currentColor" stroke-width="4.5"/>
    <text x="50" y="58" font-family="system-ui, sans-serif" font-size="32" font-weight="900" text-anchor="middle" fill="currentColor">P</text>
    <line x1="22" y1="86" x2="78" y2="86" stroke="currentColor" stroke-width="4.5" stroke-linecap="round"/>`,
    servicioRelacionado: {
      texto: 'Limpieza de vestidos de fiesta y trajes',
      href: '/tintoreria-vigo',
    },
  },
  {
    id: 'limpieza-seco-f',
    categoria: 'profesional',
    categoriaNombre: 'Limpieza profesional (Tintorería)',
    nombre: 'Limpieza con Hidrocarburos (F)',
    simboloNombre: 'Círculo con letra F interior',
    significado: 'Exige limpieza profesional con solventes de hidrocarburos / proceso suave para tejidos delicados.',
    detalleTecnico: 'Los solventes tipo F tienen un punto de inflamabilidad superior y son mucho más suaves con las fibras hiperdelicadas y tintes sensibles.',
    riesgo: 'El uso de disolventes agresivos provocará sangrado de color o endurecimiento del tejido.',
    recomendacionMimos: 'Indicado para vestidos de alta costura, sedas estampadas, trajes tradicionales gallegos y pedrería.',
    svgCode: `<circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="5"/>
    <text x="50" y="62" font-family="system-ui, sans-serif" font-size="34" font-weight="900" text-anchor="middle" fill="currentColor">F</text>`,
    servicioRelacionado: {
      texto: 'Alta tintorería y prendas delicadas',
      href: '/tintoreria-vigo',
    },
  },
  {
    id: 'limpieza-wet-cleaning-w',
    categoria: 'profesional',
    categoriaNombre: 'Limpieza profesional (Tintorería)',
    nombre: 'Limpieza profesional en agua / Wet Cleaning (W)',
    simboloNombre: 'Círculo con letra W interior',
    significado: 'Sistema profesional ecológico de limpieza en medio acuoso con control informático de humedad.',
    detalleTecnico: 'Norma ISO 3758:2023. Utiliza maquinaria específica con detergentes biológicos que crean una micropelícula protectora sobre la lana y la seda.',
    riesgo: 'No confundir con la lavadora doméstica: el agua sin calibración milimétrica destrozará la prenda.',
    recomendacionMimos: 'En Tintorería Mimos somos pioneros en Vigo en Wet Cleaning: limpieza ecológica sin olores químicos, con frescor natural y máximo respeto ambiental.',
    svgCode: `<circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="5"/>
    <text x="50" y="62" font-family="system-ui, sans-serif" font-size="34" font-weight="900" text-anchor="middle" fill="currentColor">W</text>`,
    servicioRelacionado: {
      texto: 'Descubre el sistema Wet Cleaning en Vigo',
      href: '/tintoreria-vigo',
    },
  },
  {
    id: 'limpieza-seco-prohibida',
    categoria: 'profesional',
    categoriaNombre: 'Limpieza profesional (Tintorería)',
    nombre: 'No limpiar en seco',
    simboloNombre: 'Círculo tachado con cruz',
    significado: 'Prohibido usar disolventes químicos de limpieza en seco.',
    detalleTecnico: 'Prendas con estampados plastisol, gomas, plásticos, cuero sintético o rellenos que se disuelven en contacto con percloroetileno.',
    riesgo: 'Destrucción química de la prenda (el plástico se derrite o queda pegajoso y deformado).',
    recomendacionMimos: 'Estas prendas deben lavarse en agua con programas delicados de lavandería profesional.',
    svgCode: `<circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" stroke-width="5"/>
    <line x1="18" y1="18" x2="82" y2="82" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>
    <line x1="82" y1="18" x2="18" y2="82" stroke="#DC2626" stroke-width="5" stroke-linecap="round"/>`,
    servicioRelacionado: {
      texto: 'Lavandería y coladas en Vigo',
      href: '/lavanderia-vigo',
    },
  },
];

interface TextileCareSymbolsProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const TextileCareSymbols: React.FC<TextileCareSymbolsProps> = ({ onNavigate }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('todas');
  const [busqueda, setBusqueda] = useState<string>('');
  const [simboloActivo, setSimboloActivo] = useState<SimboloTextil | null>(null);

  const categorias = [
    { id: 'todas', label: 'Todos los símbolos', count: SIMBOLOS_TEXTILES.length },
    { id: 'lavado', label: '1. Lavado en agua', count: SIMBOLOS_TEXTILES.filter(s => s.categoria === 'lavado').length },
    { id: 'blanqueo', label: '2. Blanqueo / Lejía', count: SIMBOLOS_TEXTILES.filter(s => s.categoria === 'blanqueo').length },
    { id: 'secado', label: '3. Secado', count: SIMBOLOS_TEXTILES.filter(s => s.categoria === 'secado').length },
    { id: 'planchado', label: '4. Planchado', count: SIMBOLOS_TEXTILES.filter(s => s.categoria === 'planchado').length },
    { id: 'profesional', label: '5. Tintorería (P, F, W)', count: SIMBOLOS_TEXTILES.filter(s => s.categoria === 'profesional').length },
  ];

  const simbolosFiltrados = useMemo(() => {
    return SIMBOLOS_TEXTILES.filter((item) => {
      const coincideCat = categoriaSeleccionada === 'todas' || item.categoria === categoriaSeleccionada;
      if (!coincideCat) return false;
      if (!busqueda.trim()) return true;

      const q = busqueda.toLowerCase().trim();
      return (
        item.nombre.toLowerCase().includes(q) ||
        item.simboloNombre.toLowerCase().includes(q) ||
        item.significado.toLowerCase().includes(q) ||
        item.detalleTecnico.toLowerCase().includes(q) ||
        (item.temperatura && item.temperatura.toLowerCase().includes(q))
      );
    });
  }, [categoriaSeleccionada, busqueda]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="my-10 space-y-12">
      {/* Banner de Autoridad Técnica ISO 3758:2023 */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#002147] to-[#0A3366] text-white shadow-md border border-slate-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-sky-200 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Estándar Internacional ISO 3758:2023
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              Secuencia obligatoria de los 5 pictogramas textiles
            </h2>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
              Toda etiqueta textil internacional debe leerse siempre en este orden estricto de izquierda a derecha. Si falta algún símbolo, se presupone que el tejido admite el tratamiento general.
            </p>
          </div>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 bg-white text-[#002147] hover:bg-slate-100 font-bold text-sm px-4 py-2.5 rounded-xl transition-all shadow-sm shrink-0"
            title="Imprimir o guardar como PDF para tener junto a tu lavadora"
          >
            <Printer className="w-4 h-4 text-[#0F76BB]" />
            <span>Imprimir Guía A4</span>
          </button>
        </div>

        {/* Las 5 familias visuales en orden */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-5 border-t border-white/15">
          <div className="flex flex-col items-center text-center p-2.5 rounded-lg bg-white/5">
            <span className="text-xs font-bold text-sky-300 mb-1">Paso 1</span>
            <div className="w-9 h-9 text-white">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[5]">
                <path d="M 12,32 L 17,80 L 83,80 L 88,32 Q 78,42 68,32 Q 58,22 48,32 Q 38,42 28,32 Q 20,24 12,32 Z"/>
              </svg>
            </div>
            <span className="text-xs font-medium text-slate-200 mt-1">Lavado (Cubeta)</span>
          </div>

          <div className="flex flex-col items-center text-center p-2.5 rounded-lg bg-white/5">
            <span className="text-xs font-bold text-sky-300 mb-1">Paso 2</span>
            <div className="w-9 h-9 text-white">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[5]">
                <polygon points="50,15 12,85 88,85"/>
              </svg>
            </div>
            <span className="text-xs font-medium text-slate-200 mt-1">Blanqueo (Triángulo)</span>
          </div>

          <div className="flex flex-col items-center text-center p-2.5 rounded-lg bg-white/5">
            <span className="text-xs font-bold text-sky-300 mb-1">Paso 3</span>
            <div className="w-9 h-9 text-white">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[5]">
                <rect x="15" y="15" width="70" height="70" rx="6"/>
                <circle cx="50" cy="50" r="26"/>
              </svg>
            </div>
            <span className="text-xs font-medium text-slate-200 mt-1">Secado (Cuadrado)</span>
          </div>

          <div className="flex flex-col items-center text-center p-2.5 rounded-lg bg-white/5">
            <span className="text-xs font-bold text-sky-300 mb-1">Paso 4</span>
            <div className="w-9 h-9 text-white">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[5]">
                <path d="M 18,65 L 82,65 C 82,65 80,42 60,42 L 28,42 L 18,65 Z M 28,42 L 28,26 L 68,26"/>
              </svg>
            </div>
            <span className="text-xs font-medium text-slate-200 mt-1">Plancha</span>
          </div>

          <div className="flex flex-col items-center text-center p-2.5 rounded-lg bg-white/5 col-span-2 sm:col-span-1">
            <span className="text-xs font-bold text-sky-300 mb-1">Paso 5</span>
            <div className="w-9 h-9 text-white">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-[5]">
                <circle cx="50" cy="50" r="35"/>
                <text x="50" y="62" font-family="sans-serif" font-size="34" font-weight="900" text-anchor="middle" fill="currentColor">P</text>
              </svg>
            </div>
            <span className="text-xs font-medium text-slate-200 mt-1">Tintorería (Círculo)</span>
          </div>
        </div>
      </div>

      {/* Buscador interactivo y Selector de Categorías */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar símbolo (ej: 30°, percloroetileno, lejía, plancha, lana...)"
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0F76BB]"
              aria-label="Buscar símbolo textil"
            />
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 self-center">
            Mostrando <strong>{simbolosFiltrados.length}</strong> de {SIMBOLOS_TEXTILES.length} pictogramas oficiales
          </span>
        </div>

        {/* Pestañas de categorías */}
        <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          {categorias.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoriaSeleccionada(cat.id)}
              className={`text-xs sm:text-sm font-bold px-3.5 py-2 rounded-xl transition-all ${
                categoriaSeleccionada === cat.id
                  ? 'bg-[#002147] text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Pictogramas Interactivos con SVG Nativo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {simbolosFiltrados.map((simbolo) => (
          <div
            key={simbolo.id}
            onClick={() => setSimboloActivo(simbolo)}
            className="group cursor-pointer rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1d36] hover:border-[#0F76BB] dark:hover:border-[#0F76BB] p-5 transition-all hover:shadow-md flex flex-col justify-between"
          >
            <div>
              {/* Encabezado con Icono SVG nítido */}
              <div className="flex items-start gap-4 mb-4">
                <div 
                  className="w-16 h-16 shrink-0 rounded-xl bg-slate-50 dark:bg-[#071324] border border-slate-200/80 dark:border-slate-800 p-2 flex items-center justify-center text-[#002147] dark:text-sky-300 group-hover:scale-105 transition-transform"
                  dangerouslySetInnerHTML={{ 
                    __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%" aria-label="${simbolo.nombre}">${simbolo.svgCode}</svg>` 
                  }}
                />
                <div className="space-y-1 min-w-0">
                  <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                    {simbolo.categoriaNombre}
                  </span>
                  <h3 className="text-base font-extrabold text-[#002147] dark:text-white leading-snug">
                    {simbolo.nombre}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {simbolo.simboloNombre}
                  </p>
                </div>
              </div>

              {/* Significado directo */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {simbolo.significado}
              </p>

              {/* Riesgo o precaución */}
              <div className="p-3 rounded-lg bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Riesgo al tratarlo en casa:</span>
                </div>
                <p className="leading-normal">{simbolo.riesgo}</p>
              </div>
            </div>

            {/* Footer de tarjeta con recomendación y enlace */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-500 dark:text-slate-400">
                Consejo experto de Mimos
              </span>
              <span className="font-bold text-[#0F76BB] dark:text-[#60B5F6] group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                Ver detalle técnico →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Ficha Desplegada al hacer clic en un símbolo */}
      {simboloActivo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSimboloActivo(null)}
        >
          <div 
            className="w-full max-w-xl rounded-2xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 shrink-0 rounded-2xl bg-slate-50 dark:bg-[#0b1d36] border border-slate-200 dark:border-slate-800 p-2 text-[#002147] dark:text-sky-300 flex items-center justify-center"
                  dangerouslySetInnerHTML={{ 
                    __html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%" aria-label="${simboloActivo.nombre}">${simboloActivo.svgCode}</svg>` 
                  }}
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                    {simboloActivo.categoriaNombre}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#002147] dark:text-white">
                    {simboloActivo.nombre}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Norma ISO 3758:2023 · {simboloActivo.simboloNombre}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSimboloActivo(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center font-bold text-sm"
                aria-label="Cerrar modal"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-sm text-slate-600 dark:text-slate-300">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b1d36] border border-slate-200 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Fundamento fisicoquímico (Norma ISO)
                </h4>
                <p className="leading-relaxed">{simboloActivo.detalleTecnico}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200">
                <h4 className="text-xs font-bold uppercase text-rose-800 dark:text-rose-300 mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Riesgo de error doméstico
                </h4>
                <p className="leading-relaxed">{simboloActivo.riesgo}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-emerald-950 dark:text-emerald-200">
                <h4 className="text-xs font-bold uppercase text-emerald-800 dark:text-emerald-300 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  Recomendación del maestro tintorero (Mimos Vigo)
                </h4>
                <p className="leading-relaxed">{simboloActivo.recomendacionMimos}</p>
              </div>
            </div>

            {simboloActivo.servicioRelacionado && (
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  ¿Dudas con esta prenda?
                </span>
                <a
                  href={simboloActivo.servicioRelacionado.href}
                  onClick={(e) => {
                    setSimboloActivo(null);
                    onNavigate(simboloActivo.servicioRelacionado!.href, e);
                  }}
                  className="inline-flex items-center gap-1.5 font-bold text-xs text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
                >
                  {simboloActivo.servicioRelacionado.texto}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tablas Nativas HTML para Motores de Búsqueda y Featured Snippets */}
      <div className="space-y-8 pt-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white">
            Tablas comparativas oficiales de temperaturas y fibras textiles
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Respuestas rápidas para consultar temperaturas máximas, compatibilidad con fibras (lana, seda, algodón, lino) y ciclos recomendados.
          </p>
        </div>

        {/* Tabla 1: Lavado y Temperaturas */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-[#002147] text-white">
              <tr>
                <th className="p-3.5 font-bold">Pictograma</th>
                <th className="p-3.5 font-bold">Temperatura / Ciclo</th>
                <th className="p-3.5 font-bold">Fibras compatibles</th>
                <th className="p-3.5 font-bold">Consecuencia de superarla</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-[#071324] text-slate-700 dark:text-slate-200">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-bold text-[#002147] dark:text-sky-300">Cubeta 30°C (1 punto)</td>
                <td className="p-3.5 font-semibold">Máx 30 °C · Muy suave</td>
                <td className="p-3.5">Seda, encajes, elastano, ropa técnica deportiva y prendas oscuras</td>
                <td className="p-3.5 text-rose-600 dark:text-rose-400">Pérdida de elasticidad y desteñido acelerado</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-bold text-[#002147] dark:text-sky-300">Cubeta 40°C (2 puntos)</td>
                <td className="p-3.5 font-semibold">Máx 40 °C · Estándar</td>
                <td className="p-3.5">Algodón de color, poliéster, camisas de diario, vaqueros</td>
                <td className="p-3.5 text-amber-600 dark:text-amber-400">Afieltrado en lanas y encogimiento en viscosa</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-bold text-[#002147] dark:text-sky-300">Cubeta 60°C (3 puntos)</td>
                <td className="p-3.5 font-semibold">Máx 60 °C · Higienizante</td>
                <td className="p-3.5">Toallas de rizo de algodón, sábanas blancas y mantelerías</td>
                <td className="p-3.5 text-rose-600 dark:text-rose-400">Encogimiento drástico de prendas confeccionadas</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-bold text-[#002147] dark:text-sky-300">Mano sumergida</td>
                <td className="p-3.5 font-semibold">Máx 40 °C · Sin frotar</td>
                <td className="p-3.5">Cashmere, mohair, angora, seda salvaje, pedrería</td>
                <td className="p-3.5 text-rose-600 dark:text-rose-400">Encogimiento irreversible de hasta 2 tallas en lavadora</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 bg-rose-50/30 dark:bg-rose-950/10">
                <td className="p-3.5 font-bold text-rose-700 dark:text-rose-400">Cubeta tachada</td>
                <td className="p-3.5 font-bold text-rose-700 dark:text-rose-400">Prohibido agua</td>
                <td className="p-3.5">Americanas sastre, abrigos de lana, vestidos de fiesta</td>
                <td className="p-3.5 text-rose-600 dark:text-rose-400">Deformación estructural de entretelas y hombreras</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tabla 2: Planchado Profesional vs Doméstico */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-[#002147] text-white">
              <tr>
                <th className="p-3.5 font-bold">Icono Plancha</th>
                <th className="p-3.5 font-bold">Temperatura límite</th>
                <th className="p-3.5 font-bold">Fibras indicadas</th>
                <th className="p-3.5 font-bold">Uso de vapor</th>
                <th className="p-3.5 font-bold">Consejo de tintorería</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-[#071324] text-slate-700 dark:text-slate-200">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-bold text-[#002147] dark:text-sky-300">1 punto (•)</td>
                <td className="p-3.5 font-semibold">110 °C</td>
                <td className="p-3.5">Acetato, nylon, acrílico, seda natural</td>
                <td className="p-3.5 font-semibold text-rose-600 dark:text-rose-400">Sin vapor</td>
                <td className="p-3.5">Usar paño húmedo intermedio</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-bold text-[#002147] dark:text-sky-300">2 puntos (••)</td>
                <td className="p-3.5 font-semibold">150 °C</td>
                <td className="p-3.5">Lana, mezclas poliéster-algodón, viscosa</td>
                <td className="p-3.5 text-emerald-600 dark:text-emerald-400">Vapor moderado</td>
                <td className="p-3.5">Planchar por el revés para no crear brillos</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-bold text-[#002147] dark:text-sky-300">3 puntos (•••)</td>
                <td className="p-3.5 font-semibold">200 °C</td>
                <td className="p-3.5">Lino puro, algodón pesado, mantelerías</td>
                <td className="p-3.5 text-emerald-600 dark:text-emerald-400">Vapor intenso</td>
                <td className="p-3.5">Humedecer la prenda antes de comenzar</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 bg-rose-50/30 dark:bg-rose-950/10">
                <td className="p-3.5 font-bold text-rose-700 dark:text-rose-400">Plancha tachada</td>
                <td className="p-3.5 font-bold text-rose-700 dark:text-rose-400">0 °C (No planchar)</td>
                <td className="p-3.5">Relleno térmico, cuero sintético, elásticos</td>
                <td className="p-3.5 text-rose-600 dark:text-rose-400">Totalmente prohibido</td>
                <td className="p-3.5">Tratar con túnel de vapor vertical</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Tabla 3: Cuidado Profesional (Círculos P, F, W) */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead className="bg-[#002147] text-white">
              <tr>
                <th className="p-3.5 font-bold">Círculo profesional</th>
                <th className="p-3.5 font-bold">Método químico</th>
                <th className="p-3.5 font-bold">Prendas típicas</th>
                <th className="p-3.5 font-bold">¿Se puede hacer en casa?</th>
                <th className="p-3.5 font-bold">Solución en Tintorería Mimos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-[#071324] text-slate-700 dark:text-slate-200">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-extrabold text-[#002147] dark:text-sky-300">Círculo con P</td>
                <td className="p-3.5 font-semibold">Percloroetileno y solventes habituales</td>
                <td className="p-3.5">Trajes sastre, abrigos de paño, faldas plisadas</td>
                <td className="p-3.5 font-bold text-rose-600 dark:text-rose-400">No (Exclusivo tintorería)</td>
                <td className="p-3.5">
                  <a href="/tintoreria-vigo" onClick={(e) => onNavigate('/tintoreria-vigo', e)} className="text-[#0F76BB] dark:text-[#60B5F6] font-bold underline">
                    Limpieza en seco profesional
                  </a>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-3.5 font-extrabold text-[#002147] dark:text-sky-300">Círculo con F</td>
                <td className="p-3.5 font-semibold">Solventes de hidrocarburos suaves</td>
                <td className="p-3.5">Vestidos de fiesta, sedas naturales, bordados</td>
                <td className="p-3.5 font-bold text-rose-600 dark:text-rose-400">No (Riesgo de sangrado de tinte)</td>
                <td className="p-3.5">Tratamiento delicado de alta tintorería</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 bg-emerald-50/40 dark:bg-emerald-950/15">
                <td className="p-3.5 font-extrabold text-emerald-700 dark:text-emerald-400">Círculo con W</td>
                <td className="p-3.5 font-semibold">Wet Cleaning (Agua profesional ecológica)</td>
                <td className="p-3.5">Edredones de plumón, lanas vírgenes, impermeables</td>
                <td className="p-3.5 font-bold text-rose-600 dark:text-rose-400">No (Requiere dosificación controlada)</td>
                <td className="p-3.5">
                  <span className="font-bold text-emerald-700 dark:text-emerald-300">Especialidad de Mimos Navia</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recuadro descargable / imprimible (Link Magnet) */}
      <div className="p-6 sm:p-8 rounded-2xl border-2 border-dashed border-[#0F76BB]/40 bg-sky-50/50 dark:bg-sky-950/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
            <Printer className="w-4 h-4" />
            Recurso descargable para casa y lavandería
          </div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white">
            Chuleta de símbolos de lavado para imprimir en A4
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            Hemos maquetado esta guía en formato imprimible limpio para que puedas colgarla junto a tu lavadora o en el cuarto de plancha y resolver cualquier duda en 2 segundos.
          </p>
        </div>
        <button
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2.5 bg-[#0F76BB] hover:bg-[#002147] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-all shadow-md shrink-0 w-full sm:w-auto"
        >
          <Printer className="w-5 h-5" />
          <span>Imprimir o Guardar PDF</span>
        </button>
      </div>
    </div>
  );
};
