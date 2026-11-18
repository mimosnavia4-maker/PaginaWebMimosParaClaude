import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import {
  ArrowLeft,
  ArrowUpRight,
  Baby,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  Crown,
  Droplets,
  ExternalLink,
  MessageCircle,
  Phone,
  Scissors,
  ShieldAlert,
  Shirt,
  Sparkles,
  Store,
  Truck,
  XCircle,
} from 'lucide-react';
import heroNoviaImg from '../assets/images/limpieza_vestido_novia_taller_1794727830953.webp';
import tejidosCeremoniaImg from '../assets/images/tejidos_ceremonia_pedreria_1794727830540.webp';
import comunionBautizoImg from '../assets/images/comunion_bautizo_lino_1794729699892.webp';
import fiestaChaqueImg from '../assets/images/fiesta_chaque_ceremonia_1794729700180.webp';
import {
  SERVICIO_NOVIA_CEREMONIA_DATA,
  TIENDAS_PROPIAS,
  PUNTOS_COLABORADORES,
  RESENAS_REALES,
  CONTACT_INFO,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackWhatsAppClick, trackPhoneClick } from '../utils/analytics';

interface BridalCeremonyPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

const GARMENT_TYPES = [
  'Vestido de novia',
  'Vestido de fiesta o madrina',
  'Vestido o traje de Comunión',
  'Faldón o traje de Bautizo',
  'Chaqué o traje de novio / padrino',
  'Velo, cancán o complemento',
];

const MOMENT_OPTIONS = [
  'Después del evento (limpieza y conservación)',
  'Antes del evento (puesta a punto, vapor o arrugas de viaje)',
  'Prenda antigua o faldón heredado (tono amarillo / armario)',
];

const FABRIC_DETAILS = [
  'Capas de tul, organza o encaje',
  'Crepé, raso o mikado (liso o estructurado)',
  'Lino, batista, jaretas o puntillas',
  'Pedrería, perlas o lentejuelas',
  'Seda, gasa, muselina o tejido plisado',
  'Lana fría o tejido sastre de ceremonia',
  'No estoy seguro / Prefiero enviar foto',
];

const SOLUTION_OPTIONS = [
  'Bajos rozados o manchas visibles',
  'Solo repaso, vaporizado y planchado previo al evento',
  'Manchas antiguas o tono amarillento',
  'Limpieza + arreglo de costura (bajo, enganche, presilla o ajuste)',
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
  'Consultar recogida y entrega a domicilio con Mimo (sujeta a mínimo)',
];

interface CategoryVisualMeta {
  image: string;
  alt: string;
  shortLabel: string;
  garmentOption: string;
  fabricOption: string;
  defaultMomentIdx: number;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORY_VISUAL_META: Record<string, CategoryVisualMeta> = {
  novia: {
    image: heroNoviaImg,
    alt: 'Vestido de novia con encaje preparado para inspección y vaporizado artesanal en Tintorería Mimos Vigo',
    shortLabel: 'Novia, velos y colas',
    garmentOption: GARMENT_TYPES[0],
    fabricOption: FABRIC_DETAILS[0],
    defaultMomentIdx: 0,
    icon: Crown,
  },
  'madrina-fiesta': {
    image: fiestaChaqueImg,
    alt: 'Vestido verde esmeralda de madrina y fiesta en gasa de seda con pedrería junto a chaqué azul marino en taller artesanal',
    shortLabel: 'Madrina, fiesta e invitada',
    garmentOption: GARMENT_TYPES[1],
    fabricOption: FABRIC_DETAILS[4],
    defaultMomentIdx: 0,
    icon: Sparkles,
  },
  'comunion-bautizo': {
    image: comunionBautizoImg,
    alt: 'Faldón de bautizo y vestido de Primera Comunión en lino fino con jaretas, vainicas y puntillas sobre mesa de taller',
    shortLabel: 'Comunión y bautizo',
    garmentOption: GARMENT_TYPES[2],
    fabricOption: FABRIC_DETAILS[2],
    defaultMomentIdx: 1,
    icon: Baby,
  },
  'chaques-novio': {
    image: fiestaChaqueImg,
    alt: 'Chaqué azul marino de lana fría y chaleco de vestir junto a vestido de fiesta en perchas anchas de madera',
    shortLabel: 'Chaqués, novio y padrino',
    garmentOption: GARMENT_TYPES[4],
    fabricOption: FABRIC_DETAILS[5],
    defaultMomentIdx: 1,
    icon: Shirt,
  },
};

export const BridalCeremonyPage: React.FC<BridalCeremonyPageProps> = ({
  onNavigate,
}) => {
  const [activeMomentIdx, setActiveMomentIdx] = useState<number>(0);
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    SERVICIO_NOVIA_CEREMONIA_DATA.prendasTratadas[0].id
  );
  const [showAllFaqs, setShowAllFaqs] = useState<boolean>(false);

  const [tipoPrenda, setTipoPrenda] = useState(GARMENT_TYPES[0]);
  const [momentoNecesidad, setMomentoNecesidad] = useState(MOMENT_OPTIONS[0]);
  const [tejidoDetalle, setTejidoDetalle] = useState(FABRIC_DETAILS[6]);
  const [solucionPrincipal, setSolucionPrincipal] = useState(SOLUTION_OPTIONS[0]);
  const [puntoEntrega, setPuntoEntrega] = useState(DELIVERY_POINTS[0]);
  const [observaciones, setObservaciones] = useState('');
  const [copied, setCopied] = useState(false);

  const [heroImgError, setHeroImgError] = useState(false);
  const [detailImgError, setDetailImgError] = useState(false);
  const [showcaseImgError, setShowcaseImgError] = useState<Record<string, boolean>>({});

  const activeCategory =
    SERVICIO_NOVIA_CEREMONIA_DATA.prendasTratadas.find(
      (item) => item.id === activeCategoryId
    ) ?? SERVICIO_NOVIA_CEREMONIA_DATA.prendasTratadas[0];

  const activeCategoryMeta =
    CATEGORY_VISUAL_META[activeCategory.id] ?? CATEGORY_VISUAL_META.novia;

  const activeMoment =
    SERVICIO_NOVIA_CEREMONIA_DATA.momentosUso[activeMomentIdx] ??
    SERVICIO_NOVIA_CEREMONIA_DATA.momentosUso[0];

  const visibleFaqs = showAllFaqs
    ? SERVICIO_NOVIA_CEREMONIA_DATA.preguntasFrecuentes
    : SERVICIO_NOVIA_CEREMONIA_DATA.preguntasFrecuentes.slice(0, 6);

  const buildBridalWhatsAppMessage = () => {
    const lines = [
      'Hola, Mimo. Quiero consultar el cuidado de una prenda de ceremonia.',
      `Prenda: ${tipoPrenda}`,
      `Momento / necesidad: ${momentoNecesidad}`,
      `Tejido / detalle: ${tejidoDetalle}`,
      `Qué necesito resolver: ${solucionPrincipal}`,
      `Punto preferido: ${puntoEntrega}`,
    ];
    if (observaciones.trim()) {
      lines.push(`Notas adicionales: ${observaciones.trim()}`);
    }
    lines.push(
      'Te adjunto las 3 fotos recomendadas (vista completa, etiqueta/pedrería y detalle del bajo o mancha) para recibir orientación.'
    );
    return lines.join('\n');
  };

  const whatsappUrl = buildMimoWhatsAppUrl(buildBridalWhatsAppMessage());

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildBridalWhatsAppMessage());
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

  const selectMomentAndScroll = (momentIdx: number) => {
    setMomentoNecesidad(MOMENT_OPTIONS[momentIdx === 0 ? 1 : 0]);
    setSolucionPrincipal(SOLUTION_OPTIONS[momentIdx === 0 ? 1 : 0]);
    scrollToElement('consulta-vestido');
  };

  const selectCategoryAndConsult = (categoryId: string) => {
    const meta = CATEGORY_VISUAL_META[categoryId] ?? CATEGORY_VISUAL_META.novia;
    setTipoPrenda(meta.garmentOption);
    setTejidoDetalle(meta.fabricOption);
    setMomentoNecesidad(MOMENT_OPTIONS[meta.defaultMomentIdx]);
    setSolucionPrincipal(
      meta.defaultMomentIdx === 1 ? SOLUTION_OPTIONS[1] : SOLUTION_OPTIONS[0]
    );
    scrollToElement('consulta-vestido');
  };

  return (
    <MotionConfig reducedMotion="user">
      <main
        id="main-content"
        tabIndex={-1}
        className="focus:outline-hidden bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800"
      >
        {/* 1. HERO EDITORIAL DUAL (Oscuro de contraste #002147) */}
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
                    href="/tintoreria-vigo"
                    onClick={(e) => onNavigate('/tintoreria-vigo', e)}
                    className="hover:text-white underline-offset-4 hover:underline"
                  >
                    Tintorería profesional
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-[#60B5F6] font-bold">
                  Novia, fiesta, comunión y bautizo
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
                  Desde 2011 · Sin envíos fuera de Vigo · Valoración previa sin compromiso
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-white tracking-tight leading-[1.09] text-balance">
                  {SERVICIO_NOVIA_CEREMONIA_DATA.h1}
                </h1>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                  {SERVICIO_NOVIA_CEREMONIA_DATA.subtituloCabecera}
                </p>

                <div className="p-4 sm:p-5 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-slate-100 leading-relaxed">
                  {SERVICIO_NOVIA_CEREMONIA_DATA.aclaracionServicio}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                  <button
                    type="button"
                    onClick={() => scrollToElement('consulta-vestido')}
                    className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-colors cursor-pointer sm:whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>Preparar consulta con 3 fotos</span>
                  </button>

                  <a
                    href="#puntos-entrega-ceremonia"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToElement('puntos-entrega-ceremonia');
                    }}
                    className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white font-bold text-sm sm:text-base px-5 py-4 rounded-xl transition-colors sm:whitespace-nowrap shrink-0"
                  >
                    <Store className="w-4 h-4 text-[#60B5F6] shrink-0" aria-hidden="true" />
                    <span>Tiendas en Vigo y comarca</span>
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
                        src={heroNoviaImg}
                        alt="Vestido de novia con encaje preparado para inspección y vaporizado artesanal en Tintorería Mimos Vigo"
                        width={1200}
                        height={896}
                        fetchPriority="high"
                        referrerPolicy="no-referrer"
                        onError={() => setHeroImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-8 text-center text-sm text-slate-300 font-semibold">
                        Revisión individualizada de tejidos, encajes y pedrería en Tintorería Mimos Vigo
                      </div>
                    )}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#001530]/80 via-transparent to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                    <p className="absolute bottom-4 left-5 right-5 text-xs sm:text-sm font-bold text-white">
                      3 tiendas propias en Vigo + talleres propios de costura in situ
                    </p>
                  </div>

                  <div className="p-5 sm:p-6 space-y-2.5 text-xs sm:text-sm text-slate-200 flex-1 flex flex-col justify-center">
                    <p className="font-bold text-white">
                      Compromiso de cuidado en mostrador:
                    </p>
                    <ul className="space-y-1.5">
                      <li className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>Revisión compartida contigo y resguardo antes de empezar</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>Prueba previa de pedrería cosida o pegada y tintes delicados</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>Costura y tintorería en el mismo circuito, sin salir de Vigo</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. MOMENTO DE COMPRA + VITRINA INTERACTIVA POR TIPO DE PRENDA */}
        <section
          id="planchado-antes-evento"
          className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            {/* Sub-bloque A: Selector de momento (Antes vs Después) */}
            <div className="rounded-3xl bg-[#F4F7FB] dark:bg-[#0b1d36] p-6 sm:p-8 lg:p-10 border border-slate-200/80 dark:border-slate-800">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                <div className="max-w-2xl space-y-2">
                  <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                    Según el momento en el que estés
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                    ¿Preparas una celebración o quieres limpiar una prenda tras el evento?
                  </h2>
                </div>

                <div
                  role="tablist"
                  aria-label="Momento del evento"
                  className="inline-flex rounded-xl bg-white dark:bg-[#071324] p-1.5 border border-slate-200 dark:border-slate-700 self-start shrink-0"
                >
                  {SERVICIO_NOVIA_CEREMONIA_DATA.momentosUso.map((momento, idx) => {
                    const selected = activeMomentIdx === idx;
                    return (
                      <button
                        key={momento.id}
                        role="tab"
                        aria-selected={selected}
                        type="button"
                        onClick={() => setActiveMomentIdx(idx)}
                        className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
                          selected
                            ? 'bg-[#002147] dark:bg-[#0F76BB] text-white'
                            : 'text-slate-600 dark:text-slate-300 hover:text-[#002147] dark:hover:text-white'
                        }`}
                      >
                        {idx === 0 ? 'Antes del evento' : 'Después del evento'}
                      </button>
                    );
                  })}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMoment.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
                >
                  <div className="lg:col-span-8 space-y-4">
                    <div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white">
                        {activeMoment.titulo}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#0F76BB] dark:text-[#60B5F6] font-semibold mt-0.5">
                        {activeMoment.subtitulo}
                      </p>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeMoment.casos.map((caso) => (
                        <li
                          key={caso}
                          className="flex items-start gap-2.5 rounded-xl bg-white dark:bg-[#071324] border border-slate-200/70 dark:border-slate-800 p-3.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed"
                        >
                          <CheckCircle2
                            className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{caso}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-4 rounded-2xl bg-[#002147] text-white p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-[#60B5F6]">
                        Cómo actuamos en este caso
                      </p>
                      <p className="text-sm text-slate-100 leading-relaxed">
                        {activeMoment.enfoque}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => selectMomentAndScroll(activeMomentIdx)}
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>
                        {activeMomentIdx === 0
                          ? 'Consultar puesta a punto'
                          : 'Consultar limpieza y bajos'}
                      </span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sub-bloque B: Vitrina interactiva con fotografía real por categoría */}
            <div>
              <div className="max-w-3xl mb-8 space-y-2">
                <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  Cada tejido exige un criterio propio
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                  Especialistas en novia, madrina, comunión, bautizo y chaqué
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  Selecciona una categoría para ver los tejidos que tratamos y cómo cuidamos cada pieza sin mezclar procesos.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Izquierda (5 cols): Selector en cascada */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                  {SERVICIO_NOVIA_CEREMONIA_DATA.prendasTratadas.map((item, idx) => {
                    const meta =
                      CATEGORY_VISUAL_META[item.id] ?? CATEGORY_VISUAL_META.novia;
                    const Icon = meta.icon;
                    const isSelected = activeCategory.id === item.id;
                    return (
                      <motion.button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveCategoryId(item.id)}
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
                            layoutId="active-ceremony-category-bg"
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
                            {meta.shortLabel}
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

                {/* Derecha (7 cols): Vitrina viva con imagen real por tipo de prenda */}
                <div className="lg:col-span-7">
                  <AnimatePresence mode="wait">
                    <motion.article
                      key={activeCategory.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                      className="rounded-3xl bg-[#F4F7FB] dark:bg-[#0b1d36] border border-slate-200/80 dark:border-slate-800 overflow-hidden"
                    >
                      <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-[#002147]">
                        {!showcaseImgError[activeCategory.id] ? (
                          <img
                            src={activeCategoryMeta.image}
                            alt={activeCategoryMeta.alt}
                            width={1200}
                            height={896}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setShowcaseImgError((prev) => ({
                                ...prev,
                                [activeCategory.id]: true,
                              }))
                            }
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white font-bold p-6 text-center">
                            {activeCategory.titulo}
                          </div>
                        )}
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-[#001530]/80 via-transparent to-transparent pointer-events-none"
                          aria-hidden="true"
                        />
                        <p className="absolute bottom-4 left-6 right-6 text-white text-xs sm:text-sm font-bold">
                          {activeCategory.tejidos}
                        </p>
                      </div>

                      <div className="p-6 sm:p-8 space-y-5">
                        <div className="space-y-2">
                          <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                            {activeCategory.titulo}
                          </h3>
                          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                            {activeCategory.descripcion}
                          </p>
                        </div>

                        <div className="rounded-2xl bg-white dark:bg-[#071324] border border-slate-200/70 dark:border-slate-800 p-4 flex items-start gap-3">
                          <CheckCircle2
                            className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-semibold leading-relaxed">
                            {activeCategory.atencionEspecial}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                          <button
                            type="button"
                            onClick={() => selectCategoryAndConsult(activeCategory.id)}
                            className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap shrink-0"
                          >
                            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                            <span>Consultar esta prenda</span>
                          </button>

                          <a
                            href="/arreglos-de-ropa-vigo"
                            onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
                          >
                            <span>¿Necesita también arreglo de costura?</span>
                            <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                          </a>
                        </div>
                      </div>
                    </motion.article>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. PROTOCOLO ARTESANAL EN 5 FASES + TALLER PROPIO DE COSTURA */}
        <section className="py-14 lg:py-20 bg-[#F4F7FB] dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Columna izquierda: Foto macro encaje/pedrería + diferencia de sistemas + taller costura */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                    Cómo trabajamos una pieza irrepetible
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                    Protocolo en 5 pasos y taller propio de costura en Vigo
                  </h2>
                </div>

                <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] shadow-sm">
                  <div className="relative aspect-[4/3] w-full bg-[#002147]">
                    {!detailImgError ? (
                      <img
                        src={tejidosCeremoniaImg}
                        alt="Detalle de encaje bordado, tul y perlas sobre tejido de ceremonia revisado antes del tratamiento"
                        width={1200}
                        height={896}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() => setDetailImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-6 text-center text-sm text-white font-semibold">
                        Protección de encajes, tul y pedrería en taller
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6 space-y-2">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#002147] dark:text-white">
                      Limpieza en seco suave o Wet Cleaning según fibra
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      En seco para grasas, maquillaje y asfalto manteniendo sedas y entretelas; Wet Cleaning controlado para sudor, sales y azúcares respetando linos y algodones.
                    </p>
                  </div>
                </div>

                {/* Bloque compacto de Costura Propia */}
                <div className="rounded-2xl bg-[#002147] text-white p-6 space-y-4">
                  <div className="flex items-center gap-2 text-[#60B5F6]">
                    <Scissors className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <p className="text-xs sm:text-sm font-bold">
                      Modistería propia en Gregorio Espino 42 y Rúa de Venezuela 29 (Entreplanta)
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Recepción también en Navia. Si el vestido requiere ajustar largo, asegurar un enganche en el tul o reponer una presilla de cola, no sale de nuestras manos:
                  </p>
                  <div className="space-y-3 pt-1 border-t border-white/15">
                    {SERVICIO_NOVIA_CEREMONIA_DATA.flujosCostura.map((flujo, idx) => (
                      <div key={flujo.titulo} className="space-y-0.5">
                        <p className="text-xs font-extrabold text-white">
                          0{idx + 1} · {flujo.titulo}
                        </p>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {flujo.detalle}
                        </p>
                      </div>
                    ))}
                  </div>
                  <a
                    href="/arreglos-de-ropa-vigo"
                    onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#60B5F6] hover:text-white transition-colors pt-1"
                  >
                    <span>Ver catálogo de costura y arreglos</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Columna derecha: Lista editorial limpia (divide-y sin tarjetas anidadas) */}
              <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
                <ol className="divide-y divide-slate-200/80 dark:divide-slate-800">
                  {SERVICIO_NOVIA_CEREMONIA_DATA.fasesProtocolo.map((fase, idx) => (
                    <motion.li
                      key={fase.num}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.34,
                        delay: idx * 0.05,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="py-5 first:pt-0 last:pb-0 flex items-start gap-4 sm:gap-5"
                    >
                      <span className="font-mono text-lg sm:text-xl font-extrabold text-[#0F76BB] dark:text-[#60B5F6] shrink-0 leading-none pt-1">
                        {fase.num}
                      </span>
                      <div className="space-y-1.5">
                        <h3 className="text-base sm:text-lg font-extrabold text-[#002147] dark:text-white">
                          {fase.titulo}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {fase.descripcion}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CONSULTA POR WHATSAPP CON 3 FOTOS + CRITERIOS DE PRESUPUESTO */}
        <section
          id="consulta-vestido"
          className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 space-y-2">
              <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Orientación previa sin desplazarte cargando con el vestido
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                Envíanos 3 fotos por WhatsApp y te orientamos antes de traer tu prenda
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Prepara tu mensaje en 20 segundos. Las fotos nos permiten darte orientación realista sobre el tratamiento y acordar el presupuesto exacto al ver el tejido en tienda.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Formulario guiado */}
              <div className="lg:col-span-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-6 sm:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="bridal-garment-type"
                      className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                    >
                      1. Tipo de prenda
                    </label>
                    <select
                      id="bridal-garment-type"
                      value={tipoPrenda}
                      onChange={(e) => setTipoPrenda(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    >
                      {GARMENT_TYPES.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="bridal-moment"
                      className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                    >
                      2. Momento y necesidad
                    </label>
                    <select
                      id="bridal-moment"
                      value={momentoNecesidad}
                      onChange={(e) => setMomentoNecesidad(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    >
                      {MOMENT_OPTIONS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="bridal-fabric"
                      className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                    >
                      3. Características del tejido
                    </label>
                    <select
                      id="bridal-fabric"
                      value={tejidoDetalle}
                      onChange={(e) => setTejidoDetalle(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    >
                      {FABRIC_DETAILS.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="bridal-solution"
                      className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                    >
                      4. Qué quieres solucionar
                    </label>
                    <select
                      id="bridal-solution"
                      value={solucionPrincipal}
                      onChange={(e) => setSolucionPrincipal(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    >
                      {SOLUTION_OPTIONS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="bridal-delivery"
                    className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    5. Punto de entrega preferido en Vigo y comarca
                  </label>
                  <select
                    id="bridal-delivery"
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
                    htmlFor="bridal-notes"
                    className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    Detalles opcionales (fecha del evento, manchas concretas, cola, velo...)
                  </label>
                  <textarea
                    id="bridal-notes"
                    rows={2}
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    placeholder="Ej.: Comunión dentro de 3 semanas y faldón de lino heredado con ligero tono amarillo en el pecho..."
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                  />
                </div>

                <div className="rounded-xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-700 p-4 flex items-start gap-3">
                  <Camera
                    className="w-5 h-5 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>3 fotos útiles al abrir el chat:</strong> (1) vista completa de frente, (2) etiqueta interior o zona con pedrería y (3) detalle con buena luz del bajo o mancha principal.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick(
                        SERVICIO_NOVIA_CEREMONIA_DATA.url,
                        'service_detail',
                        { service_id: 'novia-ceremonia-builder' }
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

              {/* Barra lateral: Transparencia de presupuesto */}
              <aside className="lg:col-span-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-[#F4F7FB] dark:bg-[#0b1d36] p-6 sm:p-8 space-y-5">
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                    Sin tarifas estándar ni precios sorpresa
                  </p>
                  <h3 className="text-xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                    Cómo valoramos tu encargo con total franqueza
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Nunca iniciamos un tratamiento sin aceptar antes el presupuesto acordado. Evaluamos juntos estos 4 criterios:
                  </p>
                </div>

                <dl className="divide-y divide-slate-200/80 dark:divide-slate-800">
                  {SERVICIO_NOVIA_CEREMONIA_DATA.criteriosPresupuesto.map((criterio, idx) => (
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

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-2 border-t border-slate-200/80 dark:border-slate-800">
                  Plazos realistas desde el primer día: te damos fecha segura tras ver la prenda para no arriesgar tejidos delicados con secados forzados.
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* 5. CLIMA DE VIGO (77 % HUMEDAD): QUÉ EVITAR VS CÓMO GUARDARLO */}
        <section className="py-14 lg:py-20 bg-[#002147] text-white border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-7 space-y-2.5">
                <div className="flex items-center gap-2 text-[#60B5F6]">
                  <Droplets className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <p className="text-sm font-bold">
                    Humedad atlántica de Vigo (77 % media anual)
                  </p>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-balance">
                  Cómo evitar que un vestido blanco o un faldón antiguo amarillee en el armario
                </h2>
              </div>
              <p className="lg:col-span-5 text-sm text-slate-200 leading-relaxed">
                En Vigo superamos el 80 % de humedad en otoño e invierno. Los restos invisibles de champán o sudor y la bolsa de plástico hermética son las principales causas de manchas ocres meses después de la boda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SERVICIO_NOVIA_CEREMONIA_DATA.factoresClimaVigo.map((item) => (
                <article
                  key={item.dato}
                  className="rounded-2xl bg-white/10 border border-white/15 p-6 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-white">
                      {item.dato}
                    </h3>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      {item.impacto}
                    </p>
                  </div>
                  <p className="pt-3 border-t border-white/15 text-xs sm:text-sm font-semibold text-[#60B5F6] leading-relaxed">
                    {item.recomendacion}
                  </p>
                </article>
              ))}
            </div>

            {/* Comparativa directa Qué evitar vs Cómo lo entregamos */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 rounded-2xl bg-[#041731] border border-white/15 p-6 sm:p-8 space-y-5">
                <div className="flex items-start gap-3">
                  <ShieldAlert
                    className="w-5 h-5 text-amber-400 shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-white">
                      Qué evitar en casa antes de traerlo
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                      Casi todos los cercos definitivos se producen por remedios caseros o plástico cerrado.
                    </p>
                  </div>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICIO_NOVIA_CEREMONIA_DATA.erroresEvitar.map((err) => (
                    <li
                      key={err.titulo}
                      className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-1.5"
                    >
                      <div className="flex items-start gap-2">
                        <XCircle
                          className="w-4 h-4 text-amber-400 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <p className="text-xs sm:text-sm font-extrabold text-white leading-snug">
                          {err.titulo}
                        </p>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed pl-6">
                        {err.motivo}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 rounded-2xl bg-white text-[#002147] p-6 sm:p-8 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#0F76BB]">
                    <Sparkles className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#002147]">
                      Entrega en percha ancha con funda transpirable
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Te entregamos la prenda planchada al vapor, colgada desde sus cintas interiores y protegida del polvo sin retener humedad.
                  </p>
                  <ul className="space-y-2.5 pt-2 border-t border-slate-200">
                    {SERVICIO_NOVIA_CEREMONIA_DATA.consejosConservacion.map((tip) => (
                      <li
                        key={tip}
                        className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed"
                      >
                        <CheckCircle2
                          className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick(
                      SERVICIO_NOVIA_CEREMONIA_DATA.url,
                      'service_detail_secondary',
                      { service_id: 'novia-ceremonia' }
                    )
                  }
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm py-3.5 px-4 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Consultar conservación o limpieza</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. RESEÑAS REALES + RED FÍSICA DE TIENDAS Y PUNTOS */}
        <section
          id="puntos-entrega-ceremonia"
          className="py-14 lg:py-20 bg-[#F4F7FB] dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            {/* Reseñas reales en Google */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                    Opiniones reales de clientes en Google
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                    Lo que dicen quienes ya confían sus prendas especiales a Mimos
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
                {RESENAS_REALES.map((resena) => (
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

            {/* Tiendas propias + puntos colaboradores + domicilio */}
            <div className="pt-10 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#002147] dark:text-white">
                    3 tiendas propias en Vigo, {PUNTOS_COLABORADORES.length} puntos colaboradores y recogida a domicilio
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Atención directa en mostrador, recepción en tu comarca o recogida concertada en casa.
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
                    <strong>Puntos colaboradores y domicilio:</strong> recepción en{' '}
                    {PUNTOS_COLABORADORES.map((p) => `${p.localidad} (${p.nombre_comercio})`).join(', ')}{' '}
                    y recogida a domicilio bajo consulta (sujeta a importe mínimo).
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

        {/* 7. PREGUNTAS FRECUENTES (6 + DESPLEGABLE) Y ENLACES HERMANOS */}
        <section className="py-14 lg:py-20 bg-white dark:bg-[#071324]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div>
              <div className="max-w-3xl mb-8 space-y-1.5">
                <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  Dudas habituales antes de dejar tu prenda
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                  Preguntas frecuentes sobre limpieza de vestidos de novia, fiesta, comunión y bautizo en Vigo
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

              {SERVICIO_NOVIA_CEREMONIA_DATA.preguntasFrecuentes.length > 6 && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllFaqs((prev) => !prev)}
                    aria-expanded={showAllFaqs}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0b1d36] px-5 py-3 text-xs sm:text-sm font-bold text-[#002147] dark:text-white hover:border-[#0F76BB] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>
                      {showAllFaqs
                        ? 'Ocultar dudas técnicas adicionales'
                        : `Ver ${SERVICIO_NOVIA_CEREMONIA_DATA.preguntasFrecuentes.length - 6} dudas técnicas más`}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${showAllFaqs ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Enlaces hermanos y pie de consulta */}
            <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-6">
                Servicios relacionados en Tintorería Mimos Vigo
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {SERVICIO_NOVIA_CEREMONIA_DATA.enlacesRelacionados.map((rel) => (
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
                        SERVICIO_NOVIA_CEREMONIA_DATA.url,
                        'service_detail_footer',
                        { service_id: 'novia-ceremonia' }
                      )
                    }
                    className="inline-flex items-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Consultar prenda con Mimo</span>
                  </a>
                  <a
                    href={CONTACT_INFO.phoneHref}
                    onClick={() =>
                      trackPhoneClick(SERVICIO_NOVIA_CEREMONIA_DATA.url, 'service_detail')
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
