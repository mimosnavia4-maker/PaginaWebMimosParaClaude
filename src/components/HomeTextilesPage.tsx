import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import {
  ArrowLeft,
  ArrowUpRight,
  BedDouble,
  Blinds,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Droplets,
  ExternalLink,
  Home,
  Layers,
  MessageCircle,
  Phone,
  Scissors,
  ShieldAlert,
  Sparkles,
  Store,
  Truck,
  XCircle,
} from 'lucide-react';
import edredonPlumasImg from '../assets/images/edredon_plumas_taller_1794731040431.webp';
import cortinasEstoresImg from '../assets/images/cortinas_estores_taller_1794731040136.webp';
import {
  SERVICIO_TEXTILES_HOGAR_DATA,
  TIENDAS_PROPIAS,
  PUNTOS_COLABORADORES,
  RESENAS_REALES,
  CONTACT_INFO,
  IMAGES,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackWhatsAppClick, trackPhoneClick } from '../utils/analytics';

interface HomeTextilesPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

const PIECE_TYPES = [
  'Edredón nórdico de plumas / plumón',
  'Edredón nórdico sintético / colcha boutí',
  'Cortinas / visillos (entrego yo en tienda)',
  'Cortinas / cortinajes (quiero consultar desmontaje y colocación en casa)',
  'Estores textiles de tela (paqueto o varillas)',
  'Mantas gruesas / fundas desenfundables de sofá o colchón',
];

const SIZE_OR_QTY_OPTIONS = [
  'Cama individual (90 / 105 cm) o 1 pieza pequeña',
  'Cama matrimonio (135 / 150 cm) o 2 piezas',
  'Cama grande / King Size (180 / 200 cm)',
  'Cortinas: 1–2 ventanas (2–4 paños)',
  'Cortinaje completo de salón o varias estancias',
  'Varios edredones / mantas en el mismo encargo',
];

const MATERIAL_OPTIONS = [
  'Pluma o plumón natural',
  'Fibra hueca / poliéster sintético',
  'Lino, algodón o tejido natural delicado',
  'Terciopelo, gasa o cortina con forro grueso',
  'Lana, coralina o pelo largo',
  'No estoy seguro / Prefiero enviar foto de etiqueta',
];

const EXTRA_SERVICE_OPTIONS = [
  'Solo lavado, higienización y secado / planchado',
  'Retirada de cortinas en casa + limpieza + volver a colocar',
  'Limpieza + repaso de costura (bajo, cinta, ollaos o cremallera)',
  'Manchas concretas o mal olor tras lavar en casa',
];

const DELIVERY_POINTS = [
  'Navia — Sede Central (C/ Teixugueiras, 11)',
  'Vigo Centro — Rúa de Venezuela, 29, Entreplanta (taller de costura in situ)',
  'Vigo — Avda. Gregorio Espino, 42 (taller de costura in situ)',
  "Vigo As Travesas — Punto colaborador D'Passo",
  'Redondela — Punto colaborador (C/ José Regojo, 29)',
  'Gondomar — Punto colaborador (Puntadas No Aire)',
  'Ponteareas — Punto colaborador (Arregla2)',
  'O Porriño — Punto colaborador (Telas y Más)',
  'Consultar recogida o retirada de cortinas a domicilio con Mimo',
];

interface SpecialtyVisualMeta {
  image: string;
  alt: string;
  pieceOption: string;
  materialOption: string;
  extraOption: string;
  icon: React.ComponentType<{ className?: string }>;
}

const SPECIALTY_VISUAL_META: Record<string, SpecialtyVisualMeta> = {
  edredones: {
    image: edredonPlumasImg,
    alt: 'Edredón nórdico de plumas recién lavado, seco y esponjoso frente a secadora de gran capacidad en taller',
    pieceOption: PIECE_TYPES[0],
    materialOption: MATERIAL_OPTIONS[0],
    extraOption: EXTRA_SERVICE_OPTIONS[0],
    icon: BedDouble,
  },
  cortinas: {
    image: cortinasEstoresImg,
    alt: 'Cortinas de lino natural recién vaporizadas junto a estor textil de varillas en taller propio',
    pieceOption: PIECE_TYPES[3],
    materialOption: MATERIAL_OPTIONS[2],
    extraOption: EXTRA_SERVICE_OPTIONS[1],
    icon: Home,
  },
  'estores-textiles': {
    image: cortinasEstoresImg,
    alt: 'Estor textil de tela con varillas preparado y planchado al vapor en bastidor de taller',
    pieceOption: PIECE_TYPES[4],
    materialOption: MATERIAL_OPTIONS[2],
    extraOption: EXTRA_SERVICE_OPTIONS[0],
    icon: Blinds,
  },
  'mantas-fundas': {
    image: IMAGES.blogEdredon,
    alt: 'Mantas, colchas y fundas desenfundables limpias y dobladas en lavandería profesional',
    pieceOption: PIECE_TYPES[5],
    materialOption: MATERIAL_OPTIONS[4],
    extraOption: EXTRA_SERVICE_OPTIONS[0],
    icon: Layers,
  },
};

export const HomeTextilesPage: React.FC<HomeTextilesPageProps> = ({
  onNavigate,
}) => {
  const [activeSpecId, setActiveSpecId] = useState<string>(
    SERVICIO_TEXTILES_HOGAR_DATA.especialidades[0].id
  );
  const [showAllFaqs, setShowAllFaqs] = useState<boolean>(false);

  const [tipoPieza, setTipoPieza] = useState(PIECE_TYPES[0]);
  const [medidaCantidad, setMedidaCantidad] = useState(SIZE_OR_QTY_OPTIONS[1]);
  const [materialDetalle, setMaterialDetalle] = useState(MATERIAL_OPTIONS[0]);
  const [servicioExtra, setServicioExtra] = useState(EXTRA_SERVICE_OPTIONS[0]);
  const [puntoEntrega, setPuntoEntrega] = useState(DELIVERY_POINTS[0]);
  const [observaciones, setObservaciones] = useState('');
  const [copied, setCopied] = useState(false);

  const [heroImgError, setHeroImgError] = useState(false);
  const [showcaseImgError, setShowcaseImgError] = useState<Record<string, boolean>>({});

  const activeSpec =
    SERVICIO_TEXTILES_HOGAR_DATA.especialidades.find(
      (item) => item.id === activeSpecId
    ) ?? SERVICIO_TEXTILES_HOGAR_DATA.especialidades[0];

  const activeMeta =
    SPECIALTY_VISUAL_META[activeSpec.id] ?? SPECIALTY_VISUAL_META.edredones;

  const visibleFaqs = showAllFaqs
    ? SERVICIO_TEXTILES_HOGAR_DATA.preguntasFrecuentes
    : SERVICIO_TEXTILES_HOGAR_DATA.preguntasFrecuentes.slice(0, 6);

  // Ordenar las reseñas para destacar primero la que menciona expresamente retirada y colocación de cortinajes
  const orderedReviews = [...RESENAS_REALES].sort((a, b) => {
    const aHasCurtains = a.texto.toLowerCase().includes('cortinajes') ? -1 : 0;
    const bHasCurtains = b.texto.toLowerCase().includes('cortinajes') ? -1 : 0;
    return aHasCurtains - bHasCurtains;
  });

  const buildHomeTextilesWhatsAppMessage = () => {
    const lines = [
      'Hola, Mimo. Quiero consultar el cuidado de textiles del hogar.',
      `Pieza: ${tipoPieza}`,
      `Medida o cantidad: ${medidaCantidad}`,
      `Material / relleno: ${materialDetalle}`,
      `Modalidad: ${servicioExtra}`,
      `Punto o zona: ${puntoEntrega}`,
    ];
    if (observaciones.trim()) {
      lines.push(`Notas adicionales: ${observaciones.trim()}`);
    }
    lines.push(
      'Si ayuda, te paso ahora foto de la etiqueta o de las ventanas/piezas para que me orientéis.'
    );
    return lines.join('\n');
  };

  const whatsappUrl = buildMimoWhatsAppUrl(buildHomeTextilesWhatsAppMessage());

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildHomeTextilesWhatsAppMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // ignore clipboard errors
    }
  };

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const selectSpecialtyAndConsult = (specId: string) => {
    const meta = SPECIALTY_VISUAL_META[specId] ?? SPECIALTY_VISUAL_META.edredones;
    setTipoPieza(meta.pieceOption);
    setMaterialDetalle(meta.materialOption);
    setServicioExtra(meta.extraOption);
    if (specId === 'cortinas') {
      setMedidaCantidad(SIZE_OR_QTY_OPTIONS[3]);
      setPuntoEntrega(DELIVERY_POINTS[8]);
    } else if (specId === 'estores-textiles') {
      setMedidaCantidad(SIZE_OR_QTY_OPTIONS[3]);
    } else {
      setMedidaCantidad(SIZE_OR_QTY_OPTIONS[1]);
    }
    scrollToElement('consulta-textiles-hogar');
  };

  return (
    <MotionConfig reducedMotion="user">
      <main
        id="main-content"
        tabIndex={-1}
        className="focus:outline-hidden bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800"
      >
        {/* 1. HERO EDITORIAL DUAL (#002147) */}
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
                    href="/#servicios"
                    onClick={(e) => onNavigate('/#servicios', e)}
                    className="hover:text-white underline-offset-4 hover:underline"
                  >
                    Servicios
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-[#60B5F6] font-bold">
                  Edredones, mantas, cortinas y estores
                </li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-7 flex flex-col justify-center space-y-5"
              >
                <p className="text-sm font-bold text-[#60B5F6] tracking-wide">
                  Lavado y secado en gran formato · Desmontaje y colocación de cortinas
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-extrabold text-white tracking-tight leading-[1.09] text-balance">
                  {SERVICIO_TEXTILES_HOGAR_DATA.h1}
                </h1>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                  {SERVICIO_TEXTILES_HOGAR_DATA.subtituloCabecera}
                </p>

                <div className="p-4 sm:p-5 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-slate-100 leading-relaxed">
                  {SERVICIO_TEXTILES_HOGAR_DATA.aclaracionServicio}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                  <button
                    type="button"
                    onClick={() => scrollToElement('consulta-textiles-hogar')}
                    className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-colors cursor-pointer sm:whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>Consultar pieza con Mimo</span>
                  </button>

                  <a
                    href="#puntos-entrega-hogar"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToElement('puntos-entrega-hogar');
                    }}
                    className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white font-bold text-sm sm:text-base px-5 py-4 rounded-xl transition-colors sm:whitespace-nowrap shrink-0"
                  >
                    <Store className="w-4 h-4 text-[#60B5F6] shrink-0" aria-hidden="true" />
                    <span>Tiendas, puntos y desmontaje</span>
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5"
              >
                <div className="h-full rounded-2xl overflow-hidden border border-white/15 bg-[#041731] shadow-2xl flex flex-col">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#001a38]">
                    {!heroImgError ? (
                      <img
                        src={edredonPlumasImg}
                        alt="Edredón nórdico de plumas recién lavado y aireado en nuestras instalaciones de gran formato en Vigo"
                        width={1200}
                        height={896}
                        fetchPriority="high"
                        referrerPolicy="no-referrer"
                        onError={() => setHeroImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-8 text-center text-sm text-slate-300 font-semibold">
                        Lavado y secado completo en gran formato en Tintorería Mimos Vigo
                      </div>
                    )}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#001530]/80 via-transparent to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                    <p className="absolute bottom-4 left-5 right-5 text-xs sm:text-sm font-bold text-white">
                      Secado completo hasta el núcleo · Sin olor a humedad ni apelmazamientos
                    </p>
                  </div>

                  <div className="p-5 sm:p-6 space-y-2.5 text-xs sm:text-sm text-slate-200 flex-1 flex flex-col justify-center">
                    <p className="font-bold text-white">
                      Qué incluye el cuidado en gran formato:
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>Tambores amplios y cero suavizante en plumas y plumón</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>Desmontaje, lavado, planchado y colocación de cortinas en casa</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>Arreglos de bajos, cintas o cremalleras en costura propia</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. VITRINA INTERACTIVA EN 4 ESPECIALIDADES DE HOGAR (#FFFFFF) */}
        <section className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 space-y-2">
              <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Cada textil del hogar tratado según su relleno y tejido
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                Edredones, cortinas, estores de tela, mantas y fundas desenfundables
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Toca cada especialidad para ver cómo trabajamos la pieza y resolver dudas concretas antes de traerla o concertar visita.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Selector izquierda */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {SERVICIO_TEXTILES_HOGAR_DATA.especialidades.map((item, idx) => {
                  const meta =
                    SPECIALTY_VISUAL_META[item.id] ?? SPECIALTY_VISUAL_META.edredones;
                  const Icon = meta.icon;
                  const isSelected = activeSpec.id === item.id;
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveSpecId(item.id)}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.32,
                        delay: idx * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`relative w-full text-left p-4 rounded-2xl transition-all duration-200 cursor-pointer flex items-center gap-3.5 ${
                        isSelected
                          ? 'text-white'
                          : 'bg-slate-50 dark:bg-[#0b1d36] text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#112645]'
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="active-hometextiles-category-bg"
                          transition={{
                            type: 'spring',
                            stiffness: 400,
                            damping: 32,
                          }}
                          className="absolute inset-0 rounded-2xl bg-[#002147] dark:bg-[#0F76BB] shadow-sm"
                          aria-hidden="true"
                        />
                      )}
                      <span
                        className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-white/15 text-white'
                            : 'bg-white dark:bg-[#071324] text-[#0F76BB] dark:text-[#60B5F6]'
                        }`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </span>
                      <div className="relative z-10 min-w-0">
                        <p className="text-sm sm:text-base font-extrabold leading-tight">
                          {item.tituloCorto}
                        </p>
                        <p
                          className={`text-xs mt-0.5 truncate ${
                            isSelected
                              ? 'text-slate-200'
                              : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          {item.tejidos}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Vitrina viva derecha */}
              <div className="lg:col-span-7">
                <AnimatePresence mode="wait">
                  <motion.article
                    key={activeSpec.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-3xl bg-[#F4F7FB] dark:bg-[#0b1d36] border border-slate-200/80 dark:border-slate-800 overflow-hidden"
                  >
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-[#002147]">
                      {!showcaseImgError[activeSpec.id] ? (
                        <img
                          src={activeMeta.image}
                          alt={activeMeta.alt}
                          width={1200}
                          height={896}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setShowcaseImgError((prev) => ({
                              ...prev,
                              [activeSpec.id]: true,
                            }))
                          }
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white font-bold p-6 text-center">
                          {activeSpec.titulo}
                        </div>
                      )}
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-[#001530]/80 via-transparent to-transparent pointer-events-none"
                        aria-hidden="true"
                      />
                      <p className="absolute bottom-4 left-6 right-6 text-white text-xs sm:text-sm font-bold">
                        {activeSpec.tejidos}
                      </p>
                    </div>

                    <div className="p-6 sm:p-8 space-y-5">
                      <div className="space-y-2">
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                          {activeSpec.titulo}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                          {activeSpec.descripcion}
                        </p>
                      </div>

                      <ul className="space-y-2.5 border-t border-slate-200/80 dark:border-slate-700/60 pt-4">
                        {activeSpec.claves.map((clave) => (
                          <li
                            key={clave}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
                          >
                            <CheckCircle2
                              className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{clave}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="rounded-2xl bg-white dark:bg-[#071324] border border-slate-200/80 dark:border-slate-800 p-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                        {activeSpec.avisoHonesto}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                        <button
                          type="button"
                          onClick={() => selectSpecialtyAndConsult(activeSpec.id)}
                          className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
                        >
                          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Consultar esta pieza</span>
                        </button>

                        {activeSpec.id === 'mantas-fundas' ? (
                          <a
                            href="/limpieza-sofas-vigo"
                            onClick={(e) => onNavigate('/limpieza-sofas-vigo', e)}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
                          >
                            <span>¿Sofá fijo? Ver limpieza a domicilio</span>
                            <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                          </a>
                        ) : (
                          <a
                            href="/arreglos-de-ropa-vigo"
                            onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
                          >
                            <span>¿Necesita costura o bajos?</span>
                            <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SECADO EN GRAN FORMATO FRENTE A LA HUMEDAD DE VIGO (#F4F7FB) */}
        <section className="py-14 lg:py-20 bg-[#F4F7FB] dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl space-y-2">
                <div className="flex items-center gap-2 text-[#0F76BB] dark:text-[#60B5F6]">
                  <Droplets className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <p className="text-sm font-bold">
                    Humedad media del 77 % en Vigo · Secado en gran formato
                  </p>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                  Por qué un nórdico de plumas o unas cortinas no se secan bien en casa
                </h2>
              </div>

              <a
                href="/blog/como-lavar-edredon-de-plumas-guia-practica"
                onClick={(e) =>
                  onNavigate('/blog/como-lavar-edredon-de-plumas-guia-practica', e)
                }
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
              >
                <span>Leer guía técnica de edredones</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Columna izquierda: En casa */}
              <article className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-8 space-y-5">
                <div className="flex items-start gap-3">
                  <ShieldAlert
                    className="w-6 h-6 text-[#C85A17] dark:text-amber-400 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white">
                      {SERVICIO_TEXTILES_HOGAR_DATA.problemaCasaVsMimos.enCasa.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                      {SERVICIO_TEXTILES_HOGAR_DATA.problemaCasaVsMimos.enCasa.subtitulo}
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {SERVICIO_TEXTILES_HOGAR_DATA.problemaCasaVsMimos.enCasa.puntos.map(
                    (pt) => (
                      <li
                        key={pt.titulo}
                        className="rounded-2xl bg-slate-50 dark:bg-[#0b1d36] border border-slate-200/80 dark:border-slate-800 p-4 flex items-start gap-3"
                      >
                        <XCircle
                          className="w-5 h-5 text-[#C85A17] dark:text-amber-400 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="text-sm font-extrabold text-[#002147] dark:text-white">
                            {pt.titulo}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                            {pt.detalle}
                          </p>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </article>

              {/* Columna derecha: En Mimos */}
              <article className="rounded-3xl border border-[#002147]/20 dark:border-slate-700 bg-[#002147] text-white p-6 sm:p-8 space-y-5">
                <div className="flex items-start gap-3">
                  <Sparkles
                    className="w-6 h-6 text-[#60B5F6] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">
                      {SERVICIO_TEXTILES_HOGAR_DATA.problemaCasaVsMimos.enMimos.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      {SERVICIO_TEXTILES_HOGAR_DATA.problemaCasaVsMimos.enMimos.subtitulo}
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {SERVICIO_TEXTILES_HOGAR_DATA.problemaCasaVsMimos.enMimos.puntos.map(
                    (pt) => (
                      <li
                        key={pt.titulo}
                        className="rounded-2xl bg-white/10 border border-white/15 p-4 flex items-start gap-3"
                      >
                        <CheckCircle2
                          className="w-5 h-5 text-[#60B5F6] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="text-sm font-extrabold text-white">
                            {pt.titulo}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-200 mt-1 leading-relaxed">
                            {pt.detalle}
                          </p>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </article>
            </div>
          </div>
        </section>

        {/* 4. DOBLE VENTAJA MIMOS: DESMONTAJE DE CORTINAS A DOMICILIO + TALLER PROPIO DE COSTURA (#002147) */}
        <section className="py-14 lg:py-20 bg-[#002147] text-white border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 space-y-2">
              <p className="text-sm font-bold text-[#60B5F6]">
                Dos soluciones que rara vez encontrarás juntas en Vigo
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-balance">
                Vamos a tu casa a desmontar y volver a colgar cortinas, y reparamos bajos o fundas en taller propio
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bloque A: Desmontaje y colocación de cortinas */}
              <article className="rounded-3xl bg-white/10 border border-white/15 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-[#60B5F6]">
                    <Home className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="font-mono text-xs font-bold">
                      01 · {SERVICIO_TEXTILES_HOGAR_DATA.ventajasDiferenciales.retiradaCortinas.subtitulo}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {SERVICIO_TEXTILES_HOGAR_DATA.ventajasDiferenciales.retiradaCortinas.titulo}
                  </h3>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {SERVICIO_TEXTILES_HOGAR_DATA.ventajasDiferenciales.retiradaCortinas.descripcion}
                  </p>
                  <ul className="space-y-2.5 pt-2 border-t border-white/15">
                    {SERVICIO_TEXTILES_HOGAR_DATA.ventajasDiferenciales.retiradaCortinas.detalles.map(
                      (det) => (
                        <li
                          key={det}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-100 leading-relaxed"
                        >
                          <CheckCircle2
                            className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{det}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => selectSpecialtyAndConsult('cortinas')}
                  className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors cursor-pointer self-start whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Consultar retirada y colocación de cortinas</span>
                </button>
              </article>

              {/* Bloque B: Taller propio de costura */}
              <article className="rounded-3xl bg-white text-[#002147] p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 text-[#0F76BB]">
                    <Scissors className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span className="font-mono text-xs font-bold">
                      02 · {SERVICIO_TEXTILES_HOGAR_DATA.ventajasDiferenciales.costuraHogar.subtitulo}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                    {SERVICIO_TEXTILES_HOGAR_DATA.ventajasDiferenciales.costuraHogar.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {SERVICIO_TEXTILES_HOGAR_DATA.ventajasDiferenciales.costuraHogar.descripcion}
                  </p>
                  <ul className="space-y-2.5 pt-2 border-t border-slate-200">
                    {SERVICIO_TEXTILES_HOGAR_DATA.ventajasDiferenciales.costuraHogar.detalles.map(
                      (det) => (
                        <li
                          key={det}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed"
                        >
                          <CheckCircle2
                            className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{det}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <a
                  href="/arreglos-de-ropa-vigo"
                  onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                  className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0F76BB] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors self-start whitespace-nowrap"
                >
                  <span>Ver catálogo de costura y confección</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* 5. CONSULTOR GUIADO DE WHATSAPP + TRANSPARENCIA DE PRESUPUESTO (#FFFFFF) */}
        <section
          id="consulta-textiles-hogar"
          className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 space-y-2">
              <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Consulta directa sin cargar con piezas grandes antes de saber presupuesto
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                Prepara tu consulta por WhatsApp en 20 segundos
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Elige la pieza, medida o modalidad y abre el chat con Mimo con todos los datos ordenados.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Configurador */}
              <div className="lg:col-span-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-6 sm:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="ht-piece-type"
                      className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                    >
                      1. Tipo de pieza
                    </label>
                    <select
                      id="ht-piece-type"
                      value={tipoPieza}
                      onChange={(e) => setTipoPieza(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    >
                      {PIECE_TYPES.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="ht-size"
                      className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                    >
                      2. Medida o volumen aproximado
                    </label>
                    <select
                      id="ht-size"
                      value={medidaCantidad}
                      onChange={(e) => setMedidaCantidad(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    >
                      {SIZE_OR_QTY_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="ht-material"
                      className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                    >
                      3. Relleno o tejido
                    </label>
                    <select
                      id="ht-material"
                      value={materialDetalle}
                      onChange={(e) => setMaterialDetalle(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    >
                      {MATERIAL_OPTIONS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="ht-extra"
                      className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                    >
                      4. Servicio adicional o necesidad
                    </label>
                    <select
                      id="ht-extra"
                      value={servicioExtra}
                      onChange={(e) => setServicioExtra(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    >
                      {EXTRA_SERVICE_OPTIONS.map((ex) => (
                        <option key={ex} value={ex}>
                          {ex}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="ht-delivery"
                    className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    5. Tienda de entrega o visita a domicilio
                  </label>
                  <select
                    id="ht-delivery"
                    value={puntoEntrega}
                    onChange={(e) => setPuntoEntrega(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                  >
                    {DELIVERY_POINTS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="ht-notes"
                    className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    Notas opcionales (barrio/localidad si es desmontaje o recogida, nº de estores, manchas...)
                  </label>
                  <textarea
                    id="ht-notes"
                    rows={2}
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    placeholder="Ej.: 2 nórdicos de plumas (150 cm) y 4 paños de cortina de salón en Coia para desmontar..."
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick(
                        SERVICIO_TEXTILES_HOGAR_DATA.url,
                        'service_detail',
                        { service_id: 'textiles-hogar-builder' }
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base py-3.5 px-5 rounded-xl transition-colors sm:whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Abrir WhatsApp con esta consulta</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-600 px-4 py-3.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer hover:border-[#0F76BB] transition-colors whitespace-nowrap shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#178A47]" aria-hidden="true" />
                        <span>Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        <span>Copiar texto</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Barra lateral: Transparencia de valoración */}
              <aside className="lg:col-span-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-[#F4F7FB] dark:bg-[#0b1d36] p-6 sm:p-8 space-y-5">
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                    Sin precios cerrados a ciegas
                  </p>
                  <h3 className="text-xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                    Cómo calculamos el presupuesto de tus textiles
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Te orientamos al instante por WhatsApp y confirmamos el importe en tienda o visita según estos cuatro factores reales:
                  </p>
                </div>

                <dl className="divide-y divide-slate-200/80 dark:divide-slate-800">
                  {SERVICIO_TEXTILES_HOGAR_DATA.criteriosPresupuesto.map((criterio, idx) => (
                    <div key={criterio.titulo} className="py-3.5 first:pt-0 last:pb-0">
                      <dt className="text-sm font-extrabold text-[#002147] dark:text-white flex items-center gap-2">
                        <span className="font-mono text-xs text-[#0F76BB] dark:text-[#60B5F6]">
                          0{idx + 1}
                        </span>
                        <span>{criterio.titulo}</span>
                      </dt>
                      <dd className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {criterio.detalle}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 space-y-2">
                  <p className="text-xs font-extrabold text-[#002147] dark:text-white">
                    Consejos prácticos antes de entregar o guardar:
                  </p>
                  <ul className="space-y-1.5">
                    {SERVICIO_TEXTILES_HOGAR_DATA.consejosEntregaYGuarda.map((tip) => (
                      <li
                        key={tip}
                        className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed"
                      >
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 6. RESEÑAS REALES + RED FÍSICA DE TIENDAS Y PUNTOS (#F4F7FB) */}
        <section
          id="puntos-entrega-hogar"
          className="py-14 lg:py-20 bg-[#F4F7FB] dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            {/* Opiniones reales de Google */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                    Opiniones reales de clientes en Google
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                    Experiencias reales con cortinajes, colada y entregas en Vigo
                  </h2>
                </div>
                <a
                  href={CONTACT_INFO.googleReviewsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
                >
                  <span>Ver todas las reseñas en Google</span>
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {orderedReviews.map((resena) => (
                  <blockquote
                    key={resena.autor}
                    className="rounded-2xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span
                          className="text-amber-500 font-bold tracking-tight"
                          aria-label="Valoración de 5 estrellas"
                        >
                          ★★★★★
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{resena.origen}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                        «{resena.texto}»
                      </p>
                    </div>
                    <footer className="text-xs sm:text-sm font-extrabold text-[#002147] dark:text-white pt-3 border-t border-slate-100 dark:border-slate-800">
                      {resena.autor}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>

            {/* Tiendas propias, puntos colaboradores y recogida */}
            <div className="pt-10 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#002147] dark:text-white">
                    3 tiendas propias en Vigo, {PUNTOS_COLABORADORES.length} puntos colaboradores y recogida a domicilio
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Sin importe mínimo en tiendas ni puntos de proximidad; recogida o retirada de cortinajes a domicilio bajo consulta.
                  </p>
                </div>
                <a
                  href="/puntos-mimos"
                  onClick={(e) => onNavigate('/puntos-mimos', e)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
                >
                  <Store className="w-4 h-4" aria-hidden="true" />
                  <span>Ver mapa y horarios completos</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                {TIENDAS_PROPIAS.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-5 space-y-2"
                  >
                    <p className="text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                      Tienda propia Mimos · {t.localidad}
                    </p>
                    <h3 className="text-base font-extrabold text-[#002147] dark:text-white">
                      {t.nombre_mostrado}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {t.direccion} · {t.codigo_postal} {t.localidad}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.horario.resumen} · Tel. {t.telefonos_mostrados}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Truck
                    className="w-5 h-5 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>Puntos colaboradores y domicilio:</strong> entrega cómoda en{' '}
                    {PUNTOS_COLABORADORES.map((p) => `${p.localidad} (${p.nombre_comercio})`).join(', ')}{' '}
                    y servicio a domicilio sujeto a importe mínimo y zona.
                  </p>
                </div>
                <a
                  href="/recogida-a-domicilio"
                  onClick={(e) => onNavigate('/recogida-a-domicilio', e)}
                  className="text-xs sm:text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
                >
                  Ver recogida a domicilio →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 7. PREGUNTAS FRECUENTES (6 + DESPLEGABLE) Y ENLACES ESPECIALIZADOS (#FFFFFF) */}
        <section className="py-14 lg:py-20 bg-white dark:bg-[#071324]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div>
              <div className="max-w-3xl mb-8 space-y-1.5">
                <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  Dudas habituales antes de entregar tus piezas
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                  Preguntas frecuentes sobre edredones, mantas, cortinas y estores en Vigo
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleFaqs.map((faq) => (
                  <details
                    key={faq.pregunta}
                    className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-5"
                  >
                    <summary className="font-extrabold text-[#002147] dark:text-white cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base">
                      <span>{faq.pregunta}</span>
                      <span className="text-[#0F76BB] font-mono text-lg group-open:rotate-45 transition-transform shrink-0">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-3 border-t border-slate-200/70 dark:border-slate-700/60">
                      {faq.respuesta}
                    </p>
                  </details>
                ))}
              </div>

              {SERVICIO_TEXTILES_HOGAR_DATA.preguntasFrecuentes.length > 6 && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllFaqs((prev) => !prev)}
                    aria-expanded={showAllFaqs}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0b1d36] px-5 py-3 text-xs sm:text-sm font-bold text-[#002147] dark:text-white hover:border-[#0F76BB] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>
                      {showAllFaqs
                        ? 'Ocultar dudas adicionales'
                        : `Ver ${SERVICIO_TEXTILES_HOGAR_DATA.preguntasFrecuentes.length - 6} dudas más`}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${showAllFaqs ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Deslinde limpio y servicios relacionados */}
            <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
              <div className="max-w-3xl mb-6 space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white">
                  ¿Buscas alfombras, sofás tapizados fijos o arreglos de costura?
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Accede directamente a cada especialidad dedicada en Tintorería Mimos Vigo:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {SERVICIO_TEXTILES_HOGAR_DATA.enlacesRelacionados.map((rel) => (
                  <a
                    key={rel.href}
                    href={rel.href}
                    onClick={(e) => onNavigate(rel.href, e)}
                    className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB] bg-[#F8FAFC] dark:bg-[#0b1d36] flex flex-col justify-between group transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-base font-extrabold text-[#002147] dark:text-white group-hover:text-[#0F76BB] dark:group-hover:text-[#60B5F6]">
                          {rel.titulo}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {rel.descripcion}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <a
                  href="/"
                  onClick={(e) => onNavigate('/', e)}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#002147] dark:text-slate-200 hover:text-[#0F76BB]"
                >
                  <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                  <span>Volver a la portada de Tintorería Mimos Navia</span>
                </a>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick(
                        SERVICIO_TEXTILES_HOGAR_DATA.url,
                        'service_detail_footer',
                        { service_id: 'textiles-hogar' }
                      )
                    }
                    className="inline-flex items-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Consultar pieza con Mimo</span>
                  </a>
                  <a
                    href={CONTACT_INFO.phoneHref}
                    onClick={() =>
                      trackPhoneClick(SERVICIO_TEXTILES_HOGAR_DATA.url, 'service_detail')
                    }
                    className="inline-flex items-center gap-2 border border-slate-300 dark:border-slate-700 text-[#002147] dark:text-white font-bold text-sm px-4 py-3 rounded-xl hover:border-[#0F76BB] transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                    <span>{CONTACT_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
};
