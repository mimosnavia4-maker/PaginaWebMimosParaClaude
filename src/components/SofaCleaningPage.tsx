import React, { useState } from 'react';
import {
  ArrowRight,
  AlertTriangle,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  Copy,
  Home,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Tag,
} from 'lucide-react';
import heroSofasImg from '../assets/images/limpieza_sofas_domicilio_1794599721481.webp';
import { SERVICIO_SOFAS_FAQS } from '../data/servicePagesData';
import {
  CONTACT_INFO,
  ZONAS_SERVICIO,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackWhatsAppClick } from '../utils/analytics';

interface SofaCleaningPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

const POR_QUE_LIMPIAR_SOFA = [
  {
    id: 'ahorro-retapizado',
    titulo: 'Ahorro frente a retapizar o cambiar el sofá',
    descripcion:
      'Higienizar profesionalmente tu tapicería supone una pequeña fracción frente al coste de retapizar o comprar un sofá nuevo, conservando la estructura y las espumas originales y alargando su vida útil.',
  },
  {
    id: 'seguro-hogar',
    titulo: 'Apto para hogares con niños y mascotas',
    descripcion:
      'Aplicamos productos profesionales de pH equilibrado que se aclaran y extraen durante el servicio para no dejar residuos jabonosos pegajosos que atraigan nueva suciedad al sentarse.',
  },
  {
    id: 'sin-trucos-caseros',
    titulo: 'Evita cercos por remedios domésticos',
    descripcion:
      'Las espumas comerciales, la lejía, el amoníaco, el exceso de agua o el secador doméstico empapan el relleno, fijan pigmentos y agrandan los cercos. Trabajamos con extracción controlada según tejido.',
  },
];

const TAPICERIAS_ATENDIDAS = [
  {
    id: 'sofas-chaiselongue',
    titulo: 'Sofás de 2, 3 o más plazas, chaiselongue y rinconeras',
    descripcion:
      'Tratamos asientos, respaldos, reposabrazos, cojines fijos o extraíbles y las uniones ocultas directamente en tu vivienda, sin desmontar estructuras pesadas.',
  },
  {
    id: 'sillones-butacas',
    titulo: 'Sillones, butacas y descalzadoras',
    descripcion:
      'Limpieza integral de frente, brazos, laterales y trasera tapizada para retirar roces de uso diario, polvo acumulado y manchas localizadas.',
  },
  {
    id: 'sillas-tapizadas',
    titulo: 'Sillas tapizadas de comedor, oficina y salas',
    descripcion:
      'Higienización adaptada a solo asiento o a asiento y respaldo completo, tanto para juegos de comedor en casa como para lotes de sillas en empresas y consultas.',
  },
  {
    id: 'cabeceros-bases',
    titulo: 'Cabeceros tapizados, canapés y pufs',
    descripcion:
      'Limpieza controlada o de baja humedad en piezas fijas de dormitorio para atenuar roces de cabeza, polvo y condensación en canapés sin dañar la pared ni el bastidor.',
  },
  {
    id: 'colchones',
    titulo: 'Colchones (higienización de caras accesibles)',
    descripcion:
      'Aspirado profundo en seco, pretratamiento y extracción controlada de baja humedad frente a ácaros y cercos sin saturar la espuma viscoelástica ni usar vaporeta.',
  },
  {
    id: 'fundas-desenfundables',
    titulo: 'Fundas desenfundables (en nuestra planta de Vigo)',
    descripcion:
      'Que un cojín tenga cremallera suele ser para el tapizado de fábrica: revisamos primero la etiqueta y solo trasladamos a planta las fundas aptas sin riesgo de encogimiento.',
  },
];

const FASES_LIMPIEZA_SOFA = [
  {
    num: '01',
    titulo: 'Lectura de etiqueta y prueba de solidez',
    descripcion:
      'Comprobamos el código de limpieza del fabricante (W, S, WS o X), el tipo de fibra y realizamos una prueba discreta para confirmar la estabilidad del color.',
  },
  {
    num: '02',
    titulo: 'Retirada de cojines y aspirado en seco',
    descripcion:
      'Desmontamos los elementos móviles y aspiramos en profundidad costuras, pliegues y rincones para eliminar polvo, migas, ácaros superficiales y pelos antes de humedecer.',
  },
  {
    num: '03',
    titulo: 'Pretratamiento específico según mancha',
    descripcion:
      'Aplicamos formulaciones específicas adaptadas al tejido sobre roces de brazos, cabeceros y manchas concretas, sin lejías ni productos agresivos.',
  },
  {
    num: '04',
    titulo: 'Inyección-extracción o baja humedad controlada',
    descripcion:
      'Según admita agua o requiera cuidado en seco (código S), aplicamos boquilla tapicera de inyección-extracción o tratamiento de mínima humedad adaptado al tejido.',
  },
  {
    num: '05',
    titulo: 'Aclarado y extracción sin saturar el relleno',
    descripcion:
      'Succionamos al instante la suciedad suspendida y los restos de producto para dejar el tejido limpio evitando empapar la espuma interior.',
  },
  {
    num: '06',
    titulo: 'Peinado de fibras y secado natural al aire',
    descripcion:
      'Peinamos en una sola dirección terciopelos y microfibras, revisamos el acabado contigo y te damos pautas de ventilación para un secado natural uniforme al aire.',
  },
];

const CODIGOS_ETIQUETA = [
  {
    codigo: 'W',
    nombre: 'Limpieza con base agua (Water)',
    regla: 'Admite soluciones limpiadoras acuosas aplicadas con inyección-extracción controlada sin empapar el relleno interior.',
  },
  {
    codigo: 'S',
    nombre: 'Solo limpieza en seco (Solvent)',
    regla: 'No admite agua: el lavado acuoso puede encoger la fibra o marcar cercos. Requiere disolventes o métodos específicos de mínima humedad.',
  },
  {
    codigo: 'WS',
    nombre: 'Mixto (Agua o disolvente)',
    regla: 'Compatible tanto con limpieza controlada al agua como con tratamiento en seco tras revisar la estabilidad del tinte en zona oculta.',
  },
  {
    codigo: 'X',
    nombre: 'Solo aspirado suave en seco',
    regla: 'Tejido sumamente sensible que rechaza tanto agua como disolventes; únicamente permite aspiración y cepillado suave en seco.',
  },
];

const MATERIALES_TAPICERIA = [
  {
    material: 'Telas antimanchas (Aquaclean frente a teflón/PFC)',
    cuidado:
      'Aquaclean integra hidrofilia en el hilo sin PFC y exige limpieza suave de base agua y pH neutro. Evita siempre lejía, amoníaco, alcohol, secadora y plancha para no degradar la protección ni abrir la barrera en recubrimientos superficiales.',
  },
  {
    material: 'Poliéster y microfibras',
    cuidado:
      'Alta resistencia y secado ágil con comportamiento oleofílico (repelen agua pero atrapan aceites y grasas corporales). Suelen admitir extracción controlada W/WS y peinado en un único sentido.',
  },
  {
    material: 'Lino, algodón y lana',
    cuidado:
      'Fibras celulósicas con lignina natural: encogen al mojarse y sufren pardeamiento amarillento si se saturan o reciben álcalis como amoníaco. Exigen mínima humedad (o código S en lino) y secado ágil.',
  },
  {
    material: 'Terciopelo, chenilla y bouclé',
    cuidado:
      'Pelo sensible a la fricción y la humedad lenta: nunca frotar en círculos ni usar calor o cepillos duros. Se aspira siguiendo el pelo, se extrae con mínima humedad y se peina al finalizar.',
  },
  {
    material: 'Viscosa y rayón',
    cuidado:
      'Celulosa regenerada que pierde resistencia al mojarse y puede hincharse o rasgarse de forma irreversible en limpieza húmeda convencional. Evaluamos mínima humedad o método en seco según etiqueta.',
  },
  {
    material: 'Piel natural y polipiel',
    cuidado:
      'No admiten inyección-extracción acuosa ni amoníaco o toallitas. Valoración obligatoria por foto para indicar viabilidad o limpieza específica.',
  },
];

const CHECKLIST_FOTOS_SOFA = [
  'Una fotografía frontal completa donde se vean todas las plazas o el módulo chaiselongue.',
  'Fotografías de cerca de las manchas, roces en brazos o zonas más desgastadas.',
  'Foto del tejido de cerca y, si la conserva bajo el asiento, de la etiqueta (W, S, WS o X).',
  'Número exacto de plazas, módulos o sillas (y si quieres incluir cojines o trasera).',
  'Origen y antigüedad aproximada de la mancha (y si aplicaste algún producto casero antes).',
  'Tu municipio y barrio o código postal para confirmar cobertura, ruta e importe mínimo aplicable.',
];

const ENLACES_RELACIONADOS = [
  {
    titulo: 'Limpieza y arreglo de alfombras',
    href: '/limpieza-alfombras-vigo',
    descripcion:
      'Lavado en taller y reparación de flecos, ribetes y bordes con recogida a domicilio en Vigo.',
  },
  {
    titulo: 'Pieles, cuero, ante y nobuk',
    href: '/limpieza-pieles-cuero-vigo',
    descripcion:
      'Limpieza técnica y cuidado especializado para prendas y piezas de piel natural en nuestras tiendas.',
  },
  {
    titulo: 'Textiles del hogar (fundas y cortinas)',
    href: '/textiles-hogar-vigo',
    descripcion:
      'Lavado profesional en planta de fundas desenfundables, edredones, mantas, cortinas y estores.',
  },
];

export const SofaCleaningPage: React.FC<SofaCleaningPageProps> = ({
  onNavigate,
}) => {
  const [tipoMueble, setTipoMueble] = useState('Sofá de 2 o 3 plazas');
  const [tapiceria, setTapiceria] = useState('Tela / Microfibra / Antimanchas');
  const [localidad, setLocalidad] = useState('Vigo');
  const [motivo, setMotivo] = useState('Limpieza general e higienización');
  const [observaciones, setObservaciones] = useState('');
  const [copied, setCopied] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);

  const buildSofaWhatsAppMessage = () => {
    const lines = [
      'Hola, Mimo. Quiero solicitar presupuesto para limpiar tapicería a domicilio.',
      `Mueble / piezas: ${tipoMueble}`,
      `Tipo de tapicería / etiqueta: ${tapiceria}`,
      `Localidad: ${localidad}`,
      `Motivo principal: ${motivo}`,
    ];
    if (observaciones.trim()) {
      lines.push(`Manchas o detalles previos: ${observaciones.trim()}`);
    }
    lines.push(
      'En cuanto abramos el chat te envío foto frontal del sofá, fotos de cerca de manchas/tejido y la etiqueta si la conserva.'
    );
    return lines.join('\n');
  };

  const whatsappUrl = buildMimoWhatsAppUrl(buildSofaWhatsAppMessage());

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildSofaWhatsAppMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="focus:outline-hidden bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800"
    >
      {/* 1. CABECERA DE SERVICIO IN SITU */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#002147] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Migas de pan" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-300">
              <li>
                <a
                  href="/"
                  onClick={(e) => onNavigate('/', e)}
                  className="hover:text-white underline-offset-4 hover:underline"
                >
                  Inicio
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a
                  href="/limpieza-profesional-vigo"
                  onClick={(e) => onNavigate('/limpieza-profesional-vigo', e)}
                  className="hover:text-white underline-offset-4 hover:underline"
                >
                  Limpieza profesional
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#60B5F6] font-bold">Limpieza de sofás en Vigo</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
              <p className="text-xs font-mono uppercase tracking-wider text-[#60B5F6] font-bold">
                100 % a domicilio en Vigo · Sin mover muebles · Presupuesto por foto
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] text-balance">
                Limpieza de sofás, tapicerías y colchones a domicilio en Vigo
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                Higienizamos tu sofá, chaiselongue, sillones, sillas, cabecero o colchón directamente en tu vivienda o negocio mediante inyección-extracción controlada, sin traslados ni desmontajes y con secado natural al aire.
              </p>

              <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-slate-100 leading-relaxed">
                Cada presupuesto se adapta al tamaño del sofá, el tipo de tejido (código de etiqueta), las manchas previas y tu zona, sujeto a un importe mínimo de visita a consultar con Mimo por WhatsApp.
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick('/limpieza-sofas-vigo', 'service_detail', {
                      service_id: 'limpieza-sofas',
                    })
                  }
                  className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-colors text-center sm:whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Pedir presupuesto por WhatsApp</span>
                </a>

                <a
                  href="#presupuestar-sofa"
                  className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white font-bold text-sm sm:text-base px-5 py-4 rounded-xl transition-colors text-center sm:whitespace-nowrap shrink-0"
                >
                  <Camera className="w-4 h-4 text-[#60B5F6] shrink-0" aria-hidden="true" />
                  <span>Qué fotos enviarnos</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col">
              <figure className="h-full rounded-2xl overflow-hidden border border-white/15 bg-[#071936] flex flex-col">
                {heroImgError ? (
                  <div className="aspect-4/3 lg:flex-1 bg-gradient-to-br from-[#071936] to-[#0b274f] flex flex-col items-center justify-center p-6 text-center text-slate-300">
                    <Sparkles className="w-10 h-10 text-[#60B5F6] mb-3" aria-hidden="true" />
                    <p className="font-bold text-white text-sm">
                      Limpieza de sofás y tapicerías a domicilio en Vigo
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      Sistema profesional de inyección-extracción in situ
                    </p>
                  </div>
                ) : (
                  <img
                    src={heroSofasImg}
                    alt="Limpieza profesional de sofá tapizado a domicilio mediante inyección-extracción en Vigo"
                    width={800}
                    height={600}
                    fetchPriority="high"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgError(true)}
                    className="w-full aspect-4/3 lg:flex-1 object-cover"
                  />
                )}
                <figcaption className="p-4 text-xs text-slate-300 border-t border-white/10">
                  Extracción controlada en el propio domicilio para retirar suciedad, polvo y manchas sin empapar el relleno interior.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POR QUÉ LIMPIAR FRENTE A RETAPIZAR O REMEDIOS CASEROS */}
      <section className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
              Valor frente a retapizar o usar trucos domésticos
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
              Recupera la higiene y el aspecto de tu sofá sin gastar en un tapizado completo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POR_QUE_LIMPIAR_SOFA.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-6"
              >
                <h3 className="text-lg font-extrabold text-[#002147] dark:text-white mb-2.5 flex items-start gap-2.5">
                  <ShieldCheck
                    className="w-5 h-5 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{item.titulo}</span>
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                  {item.descripcion}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. QUÉ TAPICERÍAS LIMPIAMOS A DOMICILIO (HOGAR + B2B) */}
      <section className="py-14 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
              Alcance residencial y profesional
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
              Qué piezas tapizadas tratamos in situ (y qué partes limpiamos)
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Trabajamos exclusivamente mobiliario tapizado de viviendas, apartamentos turísticos y espacios profesionales (no realizamos tapicería de vehículos).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {TAPICERIAS_ATENDIDAS.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6"
              >
                <h3 className="text-lg font-extrabold text-[#002147] dark:text-white mb-2 flex items-start gap-2.5">
                  <CheckCircle2
                    className="w-5 h-5 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{item.titulo}</span>
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-7">
                  {item.descripcion}
                </p>
              </article>
            ))}
          </div>

          {/* Bloque específico: Higienización de colchones a domicilio en Vigo */}
          <div className="rounded-2xl border border-[#002147]/20 dark:border-[#0F76BB]/40 bg-white dark:bg-[#071324] p-6 sm:p-8 mb-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2.5">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                Higienización de colchones a domicilio en Vigo
              </p>
              <h3 className="text-xl font-extrabold text-[#002147] dark:text-white">
                Limpieza de colchones frente a humedad, ácaros y cercos sin empapar el núcleo
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Con la humedad atlántica de Vigo (77 % anual y 80–85 % entre octubre y enero), los colchones y canapés retienen sudoración nocturna, polvo fino y ácaros (Dermatophagoides) en las capas del acolchado. Aplicamos aspirado profundo en seco, pretratamiento puntual y extracción controlada de baja humedad en caras accesibles sin saturar la espuma ni usar vaporeta (que reblandece la viscoelástica, coagula sangre/orina y dispara el riesgo de moho si supera las 48 h húmedo).
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong className="text-[#002147] dark:text-white">Para valorar tu colchón por WhatsApp:</strong> indica la medida (90, 135, 150 o 180 cm), si quieres tratar una o ambas caras accesibles, si aplicaste lejía/bicarbonato previo y adjunta foto general y de cerca de cualquier cerco o mancha.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <a
                href="#presupuestar-sofa"
                className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-xl transition-colors text-center"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Pedir valoración de colchón</span>
              </a>
              <a
                href="/blog/humedad-acaros-colchones-sofas-vigo"
                onClick={(e) => onNavigate('/blog/humedad-acaros-colchones-sofas-vigo', e)}
                className="inline-flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-700 hover:border-[#002147] text-[#002147] dark:text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-colors text-center"
              >
                <span>Guía de humedad y ácaros en Vigo</span>
                <ArrowRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Franja B2B para alojamientos, oficinas, clínicas y hostelería */}
          <div className="rounded-2xl border border-[#002147]/20 dark:border-[#0F76BB]/40 bg-white dark:bg-[#071324] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                <Building2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Empresas, clínicas, oficinas y alojamientos turísticos</span>
              </div>
              <h3 className="text-xl font-extrabold text-[#002147] dark:text-white">
                Limpieza de sofás y lotes de sillería para negocios en Vigo
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Coordinamos visitas para poner a punto sofás de viviendas vacacionales entre reservas, sillones de salas de espera en clínicas y lotes de sillas tapizadas en oficinas o restaurantes.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href="/limpieza-apartamentos-turisticos-vigo"
                onClick={(e) => onNavigate('/limpieza-apartamentos-turisticos-vigo', e)}
                className="inline-flex items-center justify-center gap-1.5 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-colors whitespace-nowrap"
              >
                <span>Alojamientos turísticos</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="/limpieza-profesional-vigo"
                onClick={(e) => onNavigate('/limpieza-profesional-vigo', e)}
                className="inline-flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-700 hover:border-[#002147] text-[#002147] dark:text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-colors whitespace-nowrap"
              >
                <span>Oficinas y locales</span>
                <ArrowRight className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PROCESO TÉCNICO EN 6 PASOS REALES */}
      <section className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
              Protocolo técnico controlado · Sin vapor ni secado forzado
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
              Cómo limpiamos tu sofá en 6 pasos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FASES_LIMPIEZA_SOFA.map((fase) => (
              <article
                key={fase.num}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-6"
              >
                <span className="text-xs font-mono tabular-nums font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  Paso {fase.num}
                </span>
                <h3 className="text-lg font-extrabold text-[#002147] dark:text-white mt-1.5 mb-2">
                  {fase.titulo}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {fase.descripcion}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GUÍA PRÁCTICA DE ETIQUETAS (W / S / WS / X) Y TEJIDOS */}
      <section className="py-14 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
              <Tag className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Cómo interpretar la etiqueta bajo los cojines</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
              Guía de códigos de tapicería (W, S, WS, X) y materiales habituales
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Antes de aplicar cualquier producto en casa, busca la etiqueta cosida bajo el asiento o en el interior de las fundas. Si puedes fotografiarla y enviarla a Mimo, nos ayudará a ajustar el método desde el primer mensaje.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Códigos universales W, S, WS, X */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CODIGOS_ETIQUETA.map((c) => (
                <article
                  key={c.codigo}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-5"
                >
                  <p className="font-mono text-xs font-extrabold text-[#0F76BB] dark:text-[#60B5F6] uppercase tracking-wider mb-1">
                    Código {c.codigo}
                  </p>
                  <h3 className="text-base font-extrabold text-[#002147] dark:text-white mb-2">
                    {c.nombre}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {c.regla}
                  </p>
                </article>
              ))}
            </div>

            {/* Comportamiento según tejido */}
            <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-7 space-y-4">
              <h3 className="text-lg font-extrabold text-[#002147] dark:text-white">
                Comportamiento según el tipo de tejido
              </h3>
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {MATERIALES_TAPICERIA.map((m) => (
                  <li key={m.material} className="py-3 first:pt-0 last:pb-0">
                    <p className="text-sm font-extrabold text-[#002147] dark:text-white">
                      {m.material}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-1">
                      {m.cuidado}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONDICIONES DE VISITA Y TRANSPARENCIA SOBRE MANCHAS */}
      <section className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-[#0F76BB] dark:text-[#60B5F6]">
                <Home className="w-5 h-5" aria-hidden="true" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white">
                  Qué tener en cuenta el día de la visita
                </h2>
              </div>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0F76BB] shrink-0 mt-1" aria-hidden="true" />
                  <span>
                    Necesitamos una toma de corriente doméstica, un punto de agua en la vivienda y un pequeño margen libre alrededor del sofá para trabajar con comodidad.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0F76BB] shrink-0 mt-1" aria-hidden="true" />
                  <span>
                    Agradecemos la presencia de una persona responsable al inicio y al final para revisar contigo las zonas prioritarias y repasar las indicaciones finales.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0F76BB] shrink-0 mt-1" aria-hidden="true" />
                  <span>
                    <strong>Secado natural al aire:</strong> no usamos secadores de aire caliente ni ventiladores industriales; el tejido seca al aire (referencia de 8–12 horas con ventilación cruzada continua, variando según grosor de espuma, tejido y humedad ambiental de Vigo) antes de volver a sentarse o vestir la cama.
                  </span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white">
                  Franqueza técnica sobre manchas difíciles
                </h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Nunca prometemos eliminar el 100 % de cualquier mancha. Valoramos tus fotografías antes de desplazarnos para indicarte con honestidad qué mejora cabe esperar en cada caso:
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-1" aria-hidden="true" />
                  <span>
                    Manchas muy antiguas, tintas penetradas, transferencia vaquera o cercos alterados previamente con lejía, amoníaco, bicarbonato con vinagre o vaporeta (que fijan proteínas y provocan pardeamiento celulósico) pueden dejar marca permanente.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-1" aria-hidden="true" />
                  <span>
                    En derrames orgánicos que ya han calado en la espuma interior, la limpieza de la tela atenúa la mancha superficial, aunque el resultado depende de hasta dónde haya penetrado el líquido.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PREPARADOR DE PRESUPUESTO POR FOTO + CHECKLIST + RGPD */}
      <section
        id="presupuestar-sofa"
        className="py-16 lg:py-20 bg-[#002147] text-white border-b border-white/10"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs font-mono uppercase tracking-wider text-[#60B5F6] font-bold mb-2">
              Valoración directa por WhatsApp · {CONTACT_INFO.whatsappNumber}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3 text-balance">
              Presupuestar la limpieza de mi sofá con Mimo
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Prepara aquí los datos básicos y te mostramos qué fotografías conviene adjuntar en el chat para darte un presupuesto ajustado y disponibilidad en tu zona.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Checklist de 6 fotos/datos útiles */}
            <div className="lg:col-span-5 rounded-2xl bg-white/10 border border-white/15 p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#60B5F6]">
                <Camera className="w-5 h-5 shrink-0" aria-hidden="true" />
                <h3 className="text-lg font-extrabold text-white">
                  Qué incluir al escribir a Mimo
                </h3>
              </div>
              <ol className="space-y-3 text-xs sm:text-sm text-slate-100 leading-relaxed">
                {CHECKLIST_FOTOS_SOFA.map((paso, idx) => (
                  <li key={paso} className="flex items-start gap-2.5">
                    <span className="font-mono font-extrabold text-[#60B5F6] shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{paso}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Configurador WhatsApp */}
            <div className="lg:col-span-7 rounded-2xl bg-white text-slate-900 dark:bg-[#0b1d36] dark:text-white p-6 sm:p-8 shadow-xl space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="sofa-mueble"
                    className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    Tipo de mueble o piezas
                  </label>
                  <select
                    id="sofa-mueble"
                    value={tipoMueble}
                    onChange={(e) => setTipoMueble(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm font-medium focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                  >
                    <option value="Sofá de 2 o 3 plazas">Sofá de 2 o 3 plazas</option>
                    <option value="Sofá con chaiselongue o rinconera">
                      Sofá con chaiselongue o rinconera
                    </option>
                    <option value="Sillón, butaca o puf">Sillón, butaca o puf</option>
                    <option value="Lote de sillas tapizadas">Lote de sillas tapizadas</option>
                    <option value="Cabecero de cama tapizado">Cabecero de cama tapizado</option>
                    <option value="Colchón (higienización)">Colchón (higienización)</option>
                    <option value="Varias piezas (sofá + sillón/sillas)">
                      Varias piezas (sofá + sillón/sillas)
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="sofa-tapiceria"
                    className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    Tapicería o código de etiqueta
                  </label>
                  <select
                    id="sofa-tapiceria"
                    value={tapiceria}
                    onChange={(e) => setTapiceria(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm font-medium focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                  >
                    <option value="Tela / Microfibra / Antimanchas">
                      Tela / Microfibra / Antimanchas
                    </option>
                    <option value="Terciopelo, chenilla o bouclé">
                      Terciopelo, chenilla o bouclé
                    </option>
                    <option value="Lino, algodón o lana (delicado)">
                      Lino, algodón o lana (delicado)
                    </option>
                    <option value="Etiqueta S o X (solo en seco / aspirado)">
                      Etiqueta S o X (solo en seco / aspirado)
                    </option>
                    <option value="Piel o polipiel (consultar viabilidad)">
                      Piel o polipiel (consultar viabilidad)
                    </option>
                    <option value="No estoy seguro / Prefiero enviar foto">
                      No estoy seguro / Prefiero enviar foto
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="sofa-localidad"
                    className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    Localidad
                  </label>
                  <select
                    id="sofa-localidad"
                    value={localidad}
                    onChange={(e) => setLocalidad(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm font-medium focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                  >
                    {ZONAS_SERVICIO.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                    <option value="Otra localidad del área de Vigo">
                      Otra localidad del área de Vigo
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="sofa-motivo"
                    className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    Motivo principal
                  </label>
                  <select
                    id="sofa-motivo"
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm font-medium focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                  >
                    <option value="Limpieza general e higienización">
                      Limpieza general e higienización
                    </option>
                    <option value="Manchas concretas (bebida, comida, grasa...)">
                      Manchas concretas (bebida, comida, grasa...)
                    </option>
                    <option value="Olores, polvo o mascotas">Olores, polvo o mascotas</option>
                    <option value="Apartamento turístico, oficina o local">
                      Apartamento turístico, oficina o local
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="sofa-obs"
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Observaciones (zona de Vigo, si usaste algún producto previo... opcional)
                </label>
                <input
                  id="sofa-obs"
                  type="text"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Ej.: Chaiselongue de 4 plazas en Coia, mancha de café sin tratar."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                />
              </div>

              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick('/limpieza-sofas-vigo', 'service_detail', {
                      service_id: 'limpieza-sofas',
                    })
                  }
                  className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base py-4 px-6 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>Enviar consulta y fotos por WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-600 px-4 py-3.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer hover:border-[#0F76BB] transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-[#178A47]" aria-hidden="true" />
                      <span>Texto copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      <span>Copiar texto</span>
                    </>
                  )}
                </button>
              </div>

              {/* Primera capa informativa RGPD / Privacidad */}
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
                <strong>Información básica de privacidad:</strong> Responsable: {CONTACT_INFO.legalName} (NIF {CONTACT_INFO.cif}). Finalidad: valorar tu tapicería mediante fotografías y gestionar tu solicitud de presupuesto por WhatsApp. Más información sobre tus derechos de acceso, rectificación o supresión en{' '}
                <a
                  href="/privacidad"
                  onClick={(e) => onNavigate('/privacidad', e)}
                  className="underline font-semibold text-[#002147] dark:text-[#60B5F6]"
                >
                  Política de privacidad
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PREGUNTAS FRECUENTES */}
      <section className="py-14 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 space-y-1">
            <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
              Dudas habituales antes de solicitar visita
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
              Preguntas frecuentes sobre limpieza de sofás, tapicerías y colchones en Vigo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICIO_SOFAS_FAQS.map((faq) => (
              <details
                key={faq.pregunta}
                className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-5"
              >
                <summary className="font-extrabold text-[#002147] dark:text-white cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base">
                  <span>{faq.pregunta}</span>
                  <span className="text-[#0F76BB] font-mono text-lg group-open:rotate-45 transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-3 border-t border-slate-100 dark:border-slate-800">
                  {faq.respuesta}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. ENLACES RELACIONADOS */}
      <section className="py-14 bg-white dark:bg-[#071324]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-6">
            Servicios relacionados de cuidado textil y hogar en Vigo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENLACES_RELACIONADOS.map((rel) => (
              <a
                key={rel.href}
                href={rel.href}
                onClick={(e) => onNavigate(rel.href, e)}
                className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-6 hover:border-[#0F76BB] transition-colors flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-base font-extrabold text-[#002147] dark:text-white group-hover:text-[#0F76BB] mb-2">
                    {rel.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rel.descripcion}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0F76BB] mt-4">
                  <span>Ver servicio</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
