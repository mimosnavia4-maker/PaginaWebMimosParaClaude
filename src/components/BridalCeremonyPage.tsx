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
import { SERVICIO_NOVIA_CEREMONIA_DATA } from '../data/servicePagesData';
import {
  TIENDAS_PROPIAS,
  PUNTOS_COLABORADORES,
  RESENAS_REALES,
  CONTACT_INFO,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackWhatsAppClick, trackPhoneClick } from '../utils/analytics';
import { PageHeroLight } from './PageHeroLight';

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
        className="focus:outline-hidden bg-white text-slate-900 border-b border-slate-200"
      >
        {/* 1. CABECERA LUMINOSA */}
        <PageHeroLight
          breadcrumbs={[
            { label: 'Inicio', href: '/' },
            { label: 'Tintorería profesional', href: '/tintoreria-vigo' },
            { label: 'Novia, fiesta, comunión y bautizo' },
          ]}
          onNavigate={onNavigate}
          kicker="Desde 2011 · Sin envíos fuera de Vigo · Valoración previa sin compromiso"
          title={SERVICIO_NOVIA_CEREMONIA_DATA.h1}
          description={SERVICIO_NOVIA_CEREMONIA_DATA.subtituloCabecera}
          note={SERVICIO_NOVIA_CEREMONIA_DATA.aclaracionServicio}
          whatsappHref={whatsappUrl}
          whatsappLabel="Preparar consulta con 3 fotos"
          onWhatsAppClick={() =>
            trackWhatsAppClick(SERVICIO_NOVIA_CEREMONIA_DATA.url, 'service_detail', {
              service_id: 'novia-ceremonia',
            })
          }
          secondaryAction={{
            label: 'Tiendas en Vigo y comarca',
            href: '#puntos-entrega-ceremonia',
            icon: <Store className="w-4 h-4 shrink-0" aria-hidden="true" />,
            isInternalRoute: false,
          }}
          image={{
            src: heroNoviaImg,
            alt: 'Vestido de novia con encaje preparado para inspección y vaporizado artesanal en Tintorería Mimos Vigo',
            caption:
              '3 tiendas propias en Vigo con talleres propios de costura in situ: revisión previa compartida y resguardo detallado antes de intervenir.',
            fallbackTitle: 'Limpieza y cuidado de vestidos de novia y ceremonia',
            fallbackSubtitle: 'Tratamiento individualizado en nuestras instalaciones en Vigo',
          }}
        />

        {/* 2. MOMENTO DE COMPRA + VITRINA INTERACTIVA POR TIPO DE PRENDA (Blanco) */}
        <section
          id="planchado-antes-evento"
          className="py-14 lg:py-20 bg-white border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            {/* Sub-bloque A: Selector de momento (Antes vs Después) */}
            <div className="rounded-sm bg-[#F7F6F2] p-6 sm:p-8 lg:p-10 border border-slate-200">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
                <div className="max-w-2xl space-y-2">
                  <p className="text-xs sm:text-sm font-bold text-[#0F76BB]">
                    Según el momento en el que estés
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                    ¿Preparas una celebración o quieres limpiar una prenda tras el evento?
                  </h2>
                </div>

                <div
                  role="tablist"
                  aria-label="Momento del evento"
                  className="inline-flex rounded-lg bg-white p-1.5 border border-slate-200 self-start shrink-0"
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
                        className={`min-h-[40px] px-4 py-2 rounded-md text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
                          selected
                            ? 'bg-[#002147] text-white'
                            : 'text-slate-600 hover:text-[#002147]'
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
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#002147]">
                        {activeMoment.titulo}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#0F76BB] font-semibold mt-0.5">
                        {activeMoment.subtitulo}
                      </p>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {activeMoment.casos.map((caso) => (
                        <li
                          key={caso}
                          className="flex items-start gap-2.5 rounded-sm bg-white border border-slate-200 p-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed"
                        >
                          <CheckCircle2
                            className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{caso}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-4 rounded-sm border border-[#0F76BB]/25 border-l-4 border-l-[#0F76BB] bg-[#EDF5FD] p-6 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#0F76BB]">
                        Cómo actuamos en este caso
                      </p>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {activeMoment.enfoque}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => selectMomentAndScroll(activeMomentIdx)}
                      className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-xs sm:text-sm px-4 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
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
                <p className="text-xs sm:text-sm font-bold text-[#0F76BB]">
                  Cada tejido exige un criterio propio
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                  Especialistas en novia, madrina, comunión, bautizo y chaqué
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Selecciona una categoría para ver los tejidos que tratamos y cómo cuidamos cada pieza sin mezclar procesos.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Izquierda (5 cols): Selector */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                  {SERVICIO_NOVIA_CEREMONIA_DATA.prendasTratadas.map((item) => {
                    const meta =
                      CATEGORY_VISUAL_META[item.id] ?? CATEGORY_VISUAL_META.novia;
                    const Icon = meta.icon;
                    const isSelected = activeCategory.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveCategoryId(item.id)}
                        className={`w-full min-h-[68px] text-left p-4 rounded-sm border transition-colors cursor-pointer flex items-center gap-3.5 ${
                          isSelected
                            ? 'border-[#0F76BB] border-l-4 border-l-[#0F76BB] bg-[#EDF5FD]'
                            : 'bg-white border-slate-200 hover:border-[#0F76BB]'
                        }`}
                      >
                        <span
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#002147] text-white'
                              : 'bg-[#F7F6F2] text-[#0F76BB]'
                          }`}
                        >
                          <Icon className="w-5 h-5" aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm sm:text-base font-extrabold text-[#002147] leading-tight">
                            {meta.shortLabel}
                          </p>
                          <p className="text-xs mt-0.5 truncate text-slate-600">
                            {item.tejidos}
                          </p>
                        </div>
                      </button>
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
                      className="rounded-sm bg-[#F7F6F2] border border-slate-200 overflow-hidden"
                    >
                      <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-slate-100">
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
                          <div className="w-full h-full flex items-center justify-center text-[#002147] font-bold p-6 text-center bg-[#EDF5FD]">
                            {activeCategory.titulo}
                          </div>
                        )}
                      </div>

                      <div className="p-6 sm:p-8 space-y-5">
                        <div className="space-y-2">
                          <p className="text-xs font-mono font-bold text-[#0F76BB]">
                            {activeCategory.tejidos}
                          </p>
                          <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] tracking-tight">
                            {activeCategory.titulo}
                          </h3>
                          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                            {activeCategory.descripcion}
                          </p>
                        </div>

                        <div className="rounded-sm bg-white border border-slate-200 p-4 flex items-start gap-3">
                          <CheckCircle2
                            className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                            {activeCategory.atencionEspecial}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                          <button
                            type="button"
                            onClick={() => selectCategoryAndConsult(activeCategory.id)}
                            className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm px-5 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-xs"
                          >
                            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                            <span>Consultar esta prenda</span>
                          </button>

                          <a
                            href="/arreglos-de-ropa-vigo"
                            onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                            className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold text-[#0F76BB] hover:underline whitespace-nowrap shrink-0"
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

        {/* 3. PROTOCOLO ARTESANAL EN 5 FASES + TALLER PROPIO DE COSTURA (#F7F6F2) */}
        <section className="py-14 lg:py-20 bg-[#F7F6F2] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
              {/* Columna izquierda */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <p className="text-xs sm:text-sm font-bold text-[#0F76BB]">
                    Cómo trabajamos una pieza irrepetible
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                    Protocolo en 5 pasos y taller propio de costura en Vigo
                  </h2>
                </div>

                <div className="rounded-sm overflow-hidden border border-slate-200 bg-white">
                  <div className="relative aspect-[4/3] w-full bg-slate-100">
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
                      <div className="w-full h-full flex items-center justify-center p-6 text-center text-sm text-[#002147] font-semibold bg-[#EDF5FD]">
                        Protección de encajes, tul y pedrería en taller
                      </div>
                    )}
                  </div>
                  <div className="p-5 sm:p-6 space-y-2">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#002147]">
                      Limpieza en seco suave o Wet Cleaning según fibra
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      En seco para grasas, maquillaje y asfalto manteniendo sedas y entretelas; Wet Cleaning controlado para sudor, sales y azúcares respetando linos y algodones.
                    </p>
                  </div>
                </div>

                {/* Bloque compacto de Costura Propia */}
                <div className="rounded-sm border border-[#0F76BB]/25 border-l-4 border-l-[#0F76BB] bg-[#EDF5FD] p-6 space-y-4">
                  <div className="flex items-center gap-2 text-[#0F76BB]">
                    <Scissors className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <p className="text-xs sm:text-sm font-bold">
                      Modistería propia en Gregorio Espino 42 y Rúa de Venezuela 29 (Entreplanta)
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Recepción también en Navia. Si el vestido requiere ajustar largo, asegurar un enganche en el tul o reponer una presilla de cola, no sale de nuestras manos:
                  </p>
                  <div className="space-y-3 pt-2 border-t border-[#0F76BB]/20">
                    {SERVICIO_NOVIA_CEREMONIA_DATA.flujosCostura.map((flujo, idx) => (
                      <div key={flujo.titulo} className="space-y-0.5">
                        <p className="text-xs font-extrabold text-[#002147]">
                          0{idx + 1} · {flujo.titulo}
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {flujo.detalle}
                        </p>
                      </div>
                    ))}
                  </div>
                  <a
                    href="/arreglos-de-ropa-vigo"
                    onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                    className="inline-flex items-center gap-1.5 min-h-[44px] text-xs sm:text-sm font-bold text-[#0F76BB] hover:underline pt-1"
                  >
                    <span>Ver catálogo de costura y arreglos</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Columna derecha: Lista editorial */}
              <div className="lg:col-span-7 rounded-sm bg-white border border-slate-200 p-6 sm:p-8">
                <ol className="divide-y divide-slate-200">
                  {SERVICIO_NOVIA_CEREMONIA_DATA.fasesProtocolo.map((fase) => (
                    <li
                      key={fase.num}
                      className="py-5 first:pt-0 last:pb-0 flex items-start gap-4 sm:gap-5"
                    >
                      <span className="font-mono tabular-nums text-lg sm:text-xl font-extrabold text-[#0F76BB] shrink-0 leading-none pt-1">
                        {fase.num}
                      </span>
                      <div className="space-y-1.5">
                        <h3 className="text-base sm:text-lg font-extrabold text-[#002147]">
                          {fase.titulo}
                        </h3>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {fase.descripcion}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CONSULTA POR WHATSAPP CON 3 FOTOS + CRITERIOS DE PRESUPUESTO (#EDF5FD) */}
        <section
          id="consulta-vestido"
          className="py-14 lg:py-20 bg-[#EDF5FD] border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 space-y-2">
              <p className="text-xs sm:text-sm font-bold text-[#0F76BB]">
                Orientación previa sin desplazarte cargando con el vestido
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                Envíanos 3 fotos por WhatsApp y te orientamos antes de traer tu prenda
              </h2>
              <p className="text-sm sm:text-base text-slate-700">
                Prepara tu mensaje en 20 segundos. Las fotos nos permiten darte orientación realista sobre el tratamiento y acordar el presupuesto exacto al ver el tejido en tienda.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Formulario guiado */}
              <div className="lg:col-span-7 rounded-sm border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="bridal-garment-type"
                      className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                    >
                      1. Tipo de prenda
                    </label>
                    <select
                      id="bridal-garment-type"
                      value={tipoPrenda}
                      onChange={(e) => setTipoPrenda(e.target.value)}
                      className="w-full min-h-[44px] rounded-sm border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
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
                      className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                    >
                      2. Momento y necesidad
                    </label>
                    <select
                      id="bridal-moment"
                      value={momentoNecesidad}
                      onChange={(e) => setMomentoNecesidad(e.target.value)}
                      className="w-full min-h-[44px] rounded-sm border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
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
                      className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                    >
                      3. Características del tejido
                    </label>
                    <select
                      id="bridal-fabric"
                      value={tejidoDetalle}
                      onChange={(e) => setTejidoDetalle(e.target.value)}
                      className="w-full min-h-[44px] rounded-sm border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
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
                      className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                    >
                      4. Qué quieres solucionar
                    </label>
                    <select
                      id="bridal-solution"
                      value={solucionPrincipal}
                      onChange={(e) => setSolucionPrincipal(e.target.value)}
                      className="w-full min-h-[44px] rounded-sm border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
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
                    className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                  >
                    5. Punto de entrega preferido en Vigo y comarca
                  </label>
                  <select
                    id="bridal-delivery"
                    value={puntoEntrega}
                    onChange={(e) => setPuntoEntrega(e.target.value)}
                    className="w-full min-h-[44px] rounded-sm border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-base sm:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
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
                    className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                  >
                    Detalles opcionales (fecha del evento, manchas concretas, cola, velo...)
                  </label>
                  <textarea
                    id="bridal-notes"
                    rows={2}
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                    placeholder="Ej.: Comunión dentro de 3 semanas y faldón de lino heredado con ligero tono amarillo en el pecho..."
                    className="w-full min-h-[44px] rounded-sm border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
                  />
                </div>

                <div className="rounded-sm bg-[#F7F6F2] border border-slate-200 p-4 flex items-start gap-3">
                  <Camera className="w-5 h-5 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong className="text-[#002147]">3 fotos útiles al abrir el chat:</strong> (1) vista completa de frente, (2) etiqueta interior o zona con pedrería y (3) detalle con buena luz del bajo o mancha principal.
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
                    className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm sm:text-base py-3 px-5 rounded-lg transition-colors sm:whitespace-nowrap shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Abrir WhatsApp con esta consulta</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="min-h-[48px] inline-flex items-center justify-center gap-1.5 border border-[#002147] bg-white hover:bg-[#002147] hover:text-white px-4 py-3 rounded-lg text-xs font-bold text-[#002147] cursor-pointer transition-colors whitespace-nowrap shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#1FA855]" aria-hidden="true" />
                        <span>Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Copiar texto</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Barra lateral: Transparencia de presupuesto */}
              <aside className="lg:col-span-5 rounded-sm border border-slate-200 bg-white p-6 sm:p-8 space-y-5">
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-[#0F76BB]">
                    Sin tarifas estándar ni precios sorpresa
                  </p>
                  <h3 className="text-xl font-extrabold text-[#002147] tracking-tight">
                    Cómo valoramos tu encargo con total franqueza
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Nunca iniciamos un tratamiento sin aceptar antes el presupuesto acordado. Evaluamos juntos estos 4 criterios:
                  </p>
                </div>

                <dl className="divide-y divide-slate-200">
                  {SERVICIO_NOVIA_CEREMONIA_DATA.criteriosPresupuesto.map((criterio, idx) => (
                    <div key={criterio.titulo} className="py-3.5 first:pt-0 last:pb-0">
                      <dt className="text-sm font-extrabold text-[#002147] flex items-center gap-2">
                        <span className="font-mono text-xs text-[#0F76BB]">0{idx + 1}</span>
                        <span>{criterio.titulo}</span>
                      </dt>
                      <dd className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {criterio.detalle}
                      </dd>
                    </div>
                  ))}
                </dl>

                <p className="text-xs text-slate-500 leading-relaxed pt-3 border-t border-slate-200">
                  Plazos realistas desde el primer día: te damos fecha segura tras ver la prenda para no arriesgar tejidos delicados con secados forzados.
                </p>
              </aside>
            </div>
          </div>
        </section>

        {/* 5. CLIMA DE VIGO (77 % HUMEDAD): QUÉ EVITAR VS CÓMO GUARDARLO (Blanco) */}
        <section className="py-14 lg:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-7 space-y-2.5">
                <div className="flex items-center gap-2 text-[#0F76BB]">
                  <Droplets className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <p className="text-xs sm:text-sm font-bold">
                    Humedad atlántica de Vigo (77 % media anual)
                  </p>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                  Cómo evitar que un vestido blanco o un faldón antiguo amarillee en el armario
                </h2>
              </div>
              <p className="lg:col-span-5 text-sm text-slate-600 leading-relaxed">
                En Vigo superamos el 80 % de humedad en otoño e invierno. Los restos invisibles de champán o sudor y la bolsa de plástico hermética son las principales causas de manchas ocres meses después de la boda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SERVICIO_NOVIA_CEREMONIA_DATA.factoresClimaVigo.map((item) => (
                <article
                  key={item.dato}
                  className="rounded-sm bg-[#F7F6F2]/70 border border-slate-200 p-6 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-extrabold text-[#002147]">
                      {item.dato}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.impacto}</p>
                  </div>
                  <p className="pt-3 border-t border-slate-200 text-xs sm:text-sm font-semibold text-[#0F76BB] leading-relaxed">
                    {item.recomendacion}
                  </p>
                </article>
              ))}
            </div>

            {/* Comparativa directa Qué evitar vs Cómo lo entregamos */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 rounded-sm border border-slate-200 border-t-4 border-t-amber-500 bg-[#F7F6F2] p-6 sm:p-8 space-y-5">
                <div className="flex items-start gap-3">
                  <ShieldAlert
                    className="w-5 h-5 text-amber-600 shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#002147]">
                      Qué evitar en casa antes de traerlo
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      Casi todos los cercos definitivos se producen por remedios caseros o plástico cerrado.
                    </p>
                  </div>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICIO_NOVIA_CEREMONIA_DATA.erroresEvitar.map((err) => (
                    <li
                      key={err.titulo}
                      className="rounded-sm bg-white border border-slate-200 p-4 space-y-1.5"
                    >
                      <div className="flex items-start gap-2">
                        <XCircle
                          className="w-4 h-4 text-amber-600 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <p className="text-xs sm:text-sm font-extrabold text-[#002147] leading-snug">
                          {err.titulo}
                        </p>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-6">
                        {err.motivo}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-5 rounded-sm bg-[#EDF5FD] border border-[#0F76BB]/25 border-t-4 border-t-[#0F76BB] p-6 sm:p-8 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[#0F76BB]">
                    <Sparkles className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#002147]">
                      Entrega en percha ancha con funda transpirable
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    Te entregamos la prenda planchada al vapor, colgada desde sus cintas interiores y protegida del polvo sin retener humedad.
                  </p>
                  <ul className="space-y-2.5 pt-2 border-t border-[#0F76BB]/20">
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
                  <p className="pt-2 text-xs text-slate-700 leading-relaxed">
                    ¿Mancha reciente de vino tinto en un vestido de invitada o seda?{' '}
                    <a
                      href="/blog/como-quitar-mancha-vino-tinto-ropa-delicada"
                      onClick={(e) =>
                        onNavigate('/blog/como-quitar-mancha-vino-tinto-ropa-delicada', e)
                      }
                      className="font-bold text-[#0F76BB] underline underline-offset-2 hover:text-[#002147]"
                    >
                      Lee nuestro protocolo de primeros minutos →
                    </a>
                  </p>
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
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm py-3 px-4 rounded-lg transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Consultar conservación o limpieza</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. RESEÑAS REALES + RED FÍSICA DE TIENDAS Y PUNTOS (#F7F6F2) */}
        <section
          id="puntos-entrega-ceremonia"
          className="py-14 lg:py-20 bg-[#F7F6F2] border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            {/* Reseñas reales en Google */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#0F76BB] mb-1">
                    Opiniones reales de clientes en Google
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                    Lo que dicen quienes ya confían sus prendas especiales a Mimos
                  </h2>
                </div>
                <a
                  href={CONTACT_INFO.googleReviewsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold text-[#002147] hover:text-[#0F76BB] hover:underline whitespace-nowrap shrink-0"
                >
                  <span>Ver todas las reseñas en Google</span>
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {RESENAS_REALES.map((resena) => (
                  <blockquote
                    key={resena.autor}
                    className="rounded-sm bg-white border border-slate-200 p-6 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span
                          className="text-amber-500 font-bold tracking-tight"
                          aria-label="Valoración de 5 estrellas"
                        >
                          ★★★★★
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{resena.origen}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        «{resena.texto}»
                      </p>
                    </div>
                    <footer className="text-xs sm:text-sm font-extrabold text-[#002147] pt-3 border-t border-slate-100">
                      {resena.autor}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>

            {/* Tiendas propias + puntos colaboradores + domicilio */}
            <div className="pt-10 border-t border-slate-300/70">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#002147]">
                    3 tiendas propias en Vigo, {PUNTOS_COLABORADORES.length} puntos colaboradores y recogida a domicilio
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Atención directa en mostrador, recepción en tu comarca o recogida concertada en casa.
                  </p>
                </div>
                <a
                  href="/puntos-mimos"
                  onClick={(e) => onNavigate('/puntos-mimos', e)}
                  className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold text-[#0F76BB] hover:underline whitespace-nowrap shrink-0"
                >
                  <Store className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Ver mapa y horarios completos</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                {TIENDAS_PROPIAS.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-sm border border-slate-200 bg-white p-5 space-y-2"
                  >
                    <p className="text-xs font-bold text-[#0F76BB]">
                      Tienda propia Mimos · {t.localidad}
                    </p>
                    <h3 className="text-base font-extrabold text-[#002147]">
                      {t.nombre_mostrado}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {t.direccion} · {t.codigo_postal} {t.localidad}
                    </p>
                    <p className="text-xs text-slate-500">
                      {t.horario.resumen} · Tel. {t.telefonos_mostrados}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-sm border border-slate-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <strong className="text-[#002147]">Puntos colaboradores y domicilio:</strong> recepción en{' '}
                    {PUNTOS_COLABORADORES.map((p) => `${p.localidad} (${p.nombre_comercio})`).join(', ')}{' '}
                    y recogida a domicilio bajo consulta (sujeta a importe mínimo).
                  </p>
                </div>
                <a
                  href="/recogida-a-domicilio"
                  onClick={(e) => onNavigate('/recogida-a-domicilio', e)}
                  className="inline-flex items-center min-h-[44px] text-xs sm:text-sm font-bold text-[#0F76BB] hover:underline whitespace-nowrap shrink-0"
                >
                  Ver recogida a domicilio →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 7. PREGUNTAS FRECUENTES (6 + DESPLEGABLE) Y ENLACES HERMANOS (Blanco) */}
        <section className="py-14 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div>
              <div className="max-w-3xl mb-8 space-y-1.5">
                <p className="text-xs sm:text-sm font-bold text-[#0F76BB]">
                  Dudas habituales antes de dejar tu prenda
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                  Preguntas frecuentes sobre limpieza de vestidos de novia, fiesta, comunión y bautizo en Vigo
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleFaqs.map((faq) => (
                  <details
                    key={faq.pregunta}
                    className="group rounded-sm border border-slate-200 bg-[#F7F6F2]/70 p-5"
                  >
                    <summary className="min-h-[44px] font-extrabold text-[#002147] cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base">
                      <span>{faq.pregunta}</span>
                      <span className="text-[#0F76BB] font-mono text-lg group-open:rotate-45 transition-transform shrink-0">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-200">
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
                    className="min-h-[44px] inline-flex items-center gap-2 rounded-lg border border-[#002147] bg-white hover:bg-[#002147] hover:text-white px-5 py-2.5 text-xs sm:text-sm font-bold text-[#002147] transition-colors cursor-pointer whitespace-nowrap"
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
            <div className="pt-10 border-t border-slate-200">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] mb-6">
                Servicios relacionados en Tintorería Mimos Vigo
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {SERVICIO_NOVIA_CEREMONIA_DATA.enlacesRelacionados.map((rel) => (
                  <a
                    key={rel.href}
                    href={rel.href}
                    onClick={(e) => onNavigate(rel.href, e)}
                    className="p-6 rounded-sm border border-slate-200 hover:border-[#0F76BB] bg-[#F7F6F2]/60 flex flex-col justify-between group transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-base font-extrabold text-[#002147] group-hover:text-[#0F76BB]">
                          {rel.titulo}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {rel.descripcion}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <a
                  href="/"
                  onClick={(e) => onNavigate('/', e)}
                  className="inline-flex items-center gap-2 min-h-[44px] text-sm font-bold text-[#002147] hover:text-[#0F76BB]"
                >
                  <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
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
                    className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm px-5 py-3 rounded-lg transition-colors whitespace-nowrap shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Consultar prenda con Mimo</span>
                  </a>
                  <a
                    href={CONTACT_INFO.phoneHref}
                    onClick={() =>
                      trackPhoneClick(SERVICIO_NOVIA_CEREMONIA_DATA.url, 'service_detail')
                    }
                    className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-white border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-4 py-3 rounded-lg transition-colors whitespace-nowrap group"
                  >
                    <Phone
                      className="w-4 h-4 text-[#0F76BB] group-hover:text-white shrink-0"
                      aria-hidden="true"
                    />
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
