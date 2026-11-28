import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock,
  MapPin,
  MessageCircle,
  Pause,
  Phone,
  Play,
  Store,
} from 'lucide-react';
import {
  CONTACT_INFO,
  IMAGES,
  PUNTOS_COLABORADORES,
  TIENDAS_PROPIAS,
  buildMimoWhatsAppUrl,
} from '../../data/mimosData';
import { getNaviaStoreStatus, StoreStatusInfo } from '../../utils/storeStatus';
import { trackPhoneClick, trackWhatsAppClick } from '../../utils/analytics';
import limpiezaSofasImg from '../../assets/images/limpieza_sofas_domicilio_1794599721481.webp';
import limpiezaSofasImg640 from '../../assets/images/limpieza_sofas_domicilio_640w.webp';

interface PreviewHeroSectionProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  onScrollToSection: (sectionId: string) => void;
}

interface HeroServiceSlide {
  id: string;
  tabLabel: string;
  kicker: string;
  headline: string;
  description: string;
  imageUrl: string;
  imageSrcSet?: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  isBrandSlide?: boolean;
  pageHref: string;
  scrollTargetId?: string;
  pageLabel: string;
  whatsappHref: string;
  whatsappLabel: string;
}

const STORE_DETAIL_HREFS: Record<string, string> = {
  'as-teixugueiras': '/tienda-mimos-navia-vigo',
  'gregorio-espino': '/tienda-mimos-gregorio-espino-vigo',
  'rua-venezuela': '/tienda-mimos-venezuela-vigo',
};

const STORE_SHORT_NAMES: Record<string, string> = {
  'as-teixugueiras': 'Navia',
  'gregorio-espino': 'Gregorio Espino',
  'rua-venezuela': 'Venezuela',
};

const HERO_SERVICE_SLIDES: HeroServiceSlide[] = [
  {
    id: 'marca-mimos',
    tabLabel: 'Mimos Vigo',
    kicker: 'Planta propia en Navia · Sin pedido mínimo en tienda · Recogida según ruta',
    headline: 'Tintorería, lavandería y limpieza profesional en Vigo',
    description:
      'Servicio 100 % atendido desde nuestras 3 tiendas propias en Vigo (Navia, Gregorio Espino y Venezuela), 5 puntos colaboradores en Redondela, Gondomar, Ponteareas, O Porriño y As Travesas, y recogida a domicilio.',
    imageUrl: IMAGES.ositoMimos,
    imageSrcSet: '/osito-mimos-640w.webp 640w, /osito-mimos.webp 900w',
    imageWidth: 900,
    imageHeight: 900,
    imageAlt:
      'Osito Mimos en la puerta de Tintorería Mimos Navia en Vigo con un traje en funda protectora',
    isBrandSlide: true,
    pageHref: '/#recogida',
    scrollTargetId: 'recogida',
    pageLabel: 'Solicitar recogida a domicilio',
    whatsappHref: CONTACT_INFO.whatsappGeneralHref,
    whatsappLabel: 'Hablar con Mimo por WhatsApp',
  },
  {
    id: 'costura',
    tabLabel: 'Arreglos y costura',
    kicker: 'Sin cita previa · Taller propio en Gregorio Espino y Venezuela · Recepción en Navia',
    headline: 'Arreglos de ropa y costura profesional en Vigo',
    description:
      'Bajos y bajo original vaquero, cremalleras, ajustes de talla, prendas de piel, bordados y confección de cortinas, estores y cojines. Taller propio in situ en Gregorio Espino y Venezuela, recepción en Navia y puntos colaboradores con costura.',
    imageUrl: IMAGES.arreglosRopa,
    imageSrcSet: '/arreglos-ropa-mimos-640w.webp 640w, /arreglos-ropa-mimos.webp 1200w',
    imageWidth: 1200,
    imageHeight: 896,
    imageAlt: 'Trabajo de costura y marcado de bajo de pantalón con jaboncillo de sastre',
    pageHref: '/arreglos-de-ropa-vigo',
    pageLabel: 'Ver arreglos y costura',
    whatsappHref: CONTACT_INFO.whatsappArreglosHref,
    whatsappLabel: 'Consultar arreglo con Mimo',
  },
  {
    id: 'sofas',
    tabLabel: 'Sofás a domicilio',
    kicker: '100 % en tu domicilio · Vigo y área metropolitana',
    headline: 'Limpieza de sofás, tapicerías y colchones a domicilio en Vigo',
    description:
      'Inyección-extracción controlada o baja humedad según etiqueta (W/S/WS/X) sin mover muebles, sin vapor seco ni ozono y con secado natural al aire. Para hogares, empresas y pisos turísticos.',
    imageUrl: limpiezaSofasImg,
    imageSrcSet: `${limpiezaSofasImg640} 640w, ${limpiezaSofasImg} 1200w`,
    imageWidth: 1200,
    imageHeight: 896,
    imageAlt: 'Técnico realizando limpieza de sofá a domicilio en Vigo',
    pageHref: '/limpieza-sofas-vigo',
    pageLabel: 'Ver sofás a domicilio',
    whatsappHref: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero enviar foto de mi sofá o colchón para valoración a domicilio en Vigo.'
    ),
    whatsappLabel: 'Enviar foto del sofá a Mimo',
  },
  {
    id: 'alfombras',
    tabLabel: 'Alfombras',
    kicker: 'Recogida a domicilio o entrega en nuestras 3 tiendas propias',
    headline: 'Limpieza y reparación de alfombras en Vigo',
    description:
      'Limpieza profunda según fibra y reverso con secado completo libre de humedad, y reparación artesanal de flecos, festón y bordes mediante especialista (solo arreglo o limpieza + reparación).',
    imageUrl: IMAGES.alfombrasMimos,
    imageSrcSet: '/alfombras-mimos-640w.webp 640w, /alfombras-mimos.webp 960w',
    imageWidth: 960,
    imageHeight: 717,
    imageAlt: 'Revisión y medición profesional de una alfombra de lana',
    pageHref: '/limpieza-alfombras-vigo',
    pageLabel: 'Ver alfombras y reparaciones',
    whatsappHref: CONTACT_INFO.whatsappAlfombrasHref,
    whatsappLabel: 'Consultar alfombra con Mimo',
  },
  {
    id: 'tintoreria-lavanderia',
    tabLabel: 'Tintorería y lavandería',
    kicker: 'Limpieza en seco y Wet Cleaning · 100 % atendida sin monedas',
    headline: 'Tintorería, lavandería atendida, colada familiar y hogar en Vigo',
    description:
      'Trajes, vestidos de novia y ceremonia, pieles, teñido, encerado Barbour e impermeabilización Gore-Tex, colada semanal doblada, solo planchado, edredones y cortinas.',
    imageUrl: IMAGES.servicioTintoreria,
    imageSrcSet: '/servicio-tintoreria-640w.webp 640w, /servicio-tintoreria.webp 1200w',
    imageWidth: 1200,
    imageHeight: 670,
    imageAlt: 'Trajes y prendas delicadas en taller de tintorería y planchado',
    pageHref: '/tintoreria-vigo',
    pageLabel: 'Ver tintorería y lavandería',
    whatsappHref: buildMimoWhatsAppUrl(
      'Hola, Mimo. Quiero consultar el cuidado o precio de una prenda, colada o textil del hogar en Vigo.'
    ),
    whatsappLabel: 'Consultar prenda con Mimo',
  },
  {
    id: 'limpieza-profesional',
    tabLabel: 'Limpieza profesional',
    kicker: 'Personal propio · Seguro RC · PRL · Visita técnica gratuita en Vigo',
    headline: 'Limpieza de comunidades, oficinas, locales y viviendas en Vigo',
    description:
      'Mantenimiento periódico continuo en hogares (baños, cocinas y cristales), comunidades de propietarios (LPH), oficinas, clínicas y locales comerciales, además de lavandería laboral y recuperación tras siniestros.',
    imageUrl: IMAGES.blogLimpiezaOficinas,
    imageSrcSet:
      '/images/articulos/blog-limpieza-oficinas-640w.webp 640w, /images/articulos/blog-limpieza-oficinas.webp 1200w',
    imageWidth: 1200,
    imageHeight: 670,
    imageAlt: 'Equipo profesional realizando limpieza de mantenimiento en oficina',
    pageHref: '/limpieza-profesional-vigo',
    pageLabel: 'Ver limpieza profesional',
    whatsappHref: CONTACT_INFO.whatsappCleaningHref,
    whatsappLabel: 'Pedir visita o presupuesto',
  },
  {
    id: 'apartamentos-turisticos',
    tabLabel: 'Apartamentos turísticos',
    kicker: 'Operativa 11:00–15:00 · Sábados, festivos y agosto · Decreto 12/2017 (REAT)',
    headline: 'Lavandería y limpieza para apartamentos turísticos (VUT) en Vigo',
    description:
      'Tú decides el nivel de ayuda: lavado y planchado de tu propia lencería separada por vivienda, rotación entre huéspedes o coordinación integral con amenities, llaves y foto-reporte.',
    imageUrl: IMAGES.b2bApartamentos,
    imageSrcSet: '/apartamentos-mimos-640w.webp 640w, /apartamentos-mimos.webp 1200w',
    imageWidth: 1200,
    imageHeight: 896,
    imageAlt: 'Cama de apartamento turístico vestida con sábanas blancas planchadas y toallas dobladas',
    pageHref: '/limpieza-apartamentos-turisticos-vigo',
    pageLabel: 'Ver servicio para VUT',
    whatsappHref: CONTACT_INFO.whatsappApartamentosHref,
    whatsappLabel: 'Pedir propuesta VUT',
  },
];

export const PreviewHeroSection: React.FC<PreviewHeroSectionProps> = ({
  onNavigate,
  onScrollToSection,
}) => {
  const [storeStatus, setStoreStatus] = useState<StoreStatusInfo>(() => getNaviaStoreStatus());
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(max-width: 639px)').matches;
  });
  const [isPaused, setIsPaused] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return (
      window.matchMedia('(max-width: 639px)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  });
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [visitedSlideIds, setVisitedSlideIds] = useState<string[]>([]);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const statusTimer = setInterval(() => {
      setStoreStatus(getNaviaStoreStatus());
    }, 60000);
    return () => clearInterval(statusTimer);
  }, []);

  // Detectar viewport móvil (<640px) para desactivar rotación automática en móvil sin afectar escritorio
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(max-width: 639px)');
    const handleViewportChange = (e: MediaQueryListEvent) => {
      setIsMobileViewport(e.matches);
      if (e.matches) {
        setIsPaused(true);
      }
    };
    setIsMobileViewport(mq.matches);
    mq.addEventListener('change', handleViewportChange);
    return () => mq.removeEventListener('change', handleViewportChange);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || isPaused || isHoveringHero || isMobileViewport) return;

    const slideTimer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SERVICE_SLIDES.length);
    }, 6500);

    return () => clearInterval(slideTimer);
  }, [isPaused, isHoveringHero, isMobileViewport]);

  const activeSlide = HERO_SERVICE_SLIDES[activeIndex];
  const isBrandSlide = Boolean(activeSlide.isBrandSlide);

  // Cargar imágenes de fondo de las diapositivas 2-7 únicamente cuando el usuario o el carrusel en escritorio pasa a ellas
  useEffect(() => {
    if (!activeSlide.isBrandSlide) {
      setVisitedSlideIds((prev) =>
        prev.includes(activeSlide.id) ? prev : [...prev, activeSlide.id]
      );
    }
  }, [activeSlide.id, activeSlide.isBrandSlide]);

  const handleSelectSlide = (idx: number) => {
    setActiveIndex(idx);
    setIsPaused(true);
  };

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    const total = HERO_SERVICE_SLIDES.length;
    let targetIdx: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      targetIdx = (idx + 1) % total;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      targetIdx = (idx - 1 + total) % total;
    } else if (e.key === 'Home') {
      targetIdx = 0;
    } else if (e.key === 'End') {
      targetIdx = total - 1;
    }
    if (targetIdx !== null) {
      e.preventDefault();
      handleSelectSlide(targetIdx);
      tabRefs.current[targetIdx]?.focus();
    }
  };

  const handleImageError = (slideId: string) => {
    setFailedImages((prev) => ({ ...prev, [slideId]: true }));
  };

  return (
    <section
      aria-labelledby="hero-h1"
      onMouseEnter={() => setIsHoveringHero(true)}
      onMouseLeave={() => setIsHoveringHero(false)}
      className="relative min-h-0 sm:min-h-[74svh] lg:min-h-[78svh] flex flex-col justify-between bg-[#FAF9F6] overflow-hidden border-b border-slate-200/70"
    >
      {/* Fondo de diapositivas 2–7 con velo luminoso editorial; montadas bajo demanda */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isBrandSlide ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      >
        {HERO_SERVICE_SLIDES.filter(
          (slide) => !slide.isBrandSlide && visitedSlideIds.includes(slide.id)
        ).map((slide) => {
          const isCurrent = slide.id === activeSlide.id;
          if (failedImages[slide.id]) {
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 bg-gradient-to-br from-[#FAF9F6] via-white to-[#EEF5FD] transition-opacity duration-700 ease-out ${
                  isCurrent ? 'opacity-100' : 'opacity-0'
                }`}
              />
            );
          }
          return (
            <img
              key={slide.id}
              src={slide.imageUrl}
              srcSet={slide.imageSrcSet}
              sizes="100vw"
              width={slide.imageWidth}
              height={slide.imageHeight}
              alt=""
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => handleImageError(slide.id)}
              className={`absolute inset-0 w-full h-full object-cover blur-[2px] scale-[1.03] transition-opacity duration-700 ease-out ${
                isCurrent ? 'opacity-100' : 'opacity-0'
              }`}
            />
          );
        })}

        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-[#FAF9F6]/88 to-[#F4F9FE]/38" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/15 to-white/65 lg:via-transparent" />
      </div>

      {/* Lienzo luminoso para la Transición 1 (Marca Mimos) */}
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-br from-white via-[#FAF9F6] to-[#F2F7FC] transition-opacity duration-500 ${
          isBrandSlide ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Cuerpo principal del Hero */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-auto py-5 sm:py-10 lg:py-12">
        {/* Barra superior de servicio: sede y contacto directo */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 pb-3 mb-5 sm:mb-7 border-b border-slate-200/80">
          <p className="text-xs sm:text-sm font-semibold text-[#0C65A1] tracking-tight">
            Planta central en Navia · 3 tiendas en Vigo y 5 puntos colaboradores
          </p>

          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-0.5 text-xs sm:text-sm font-medium text-[#002147]">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#0C65A1] shrink-0" aria-hidden="true" />
              <span className={storeStatus.isOpen ? 'text-[#13733B]' : 'text-slate-600'}>
                Navia: {storeStatus.statusText}
              </span>
            </span>
            <span className="text-slate-300" aria-hidden="true">
              ·
            </span>
            <a
              href={CONTACT_INFO.phoneHref}
              onClick={() => trackPhoneClick('/', 'hero_top_phone')}
              className="inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-0 py-1 text-[#002147] hover:text-[#0F76BB] tabular-nums whitespace-nowrap transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F76BB] rounded-md"
            >
              <Phone className="w-3.5 h-3.5 text-[#0C65A1] shrink-0" aria-hidden="true" />
              <span>{CONTACT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Contenido dinámico sincronizado con un único titular principal en Fraunces */}
        <div
          id="hero-slide-panel"
          role="tabpanel"
          aria-labelledby={`hero-tab-${activeSlide.id}`}
          className={
            isBrandSlide
              ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center lg:min-h-[380px]'
              : 'max-w-3xl lg:min-h-[380px] flex items-center'
          }
        >
          <div className={isBrandSlide ? 'lg:col-span-7 space-y-3.5 sm:space-y-5' : 'space-y-3.5 sm:space-y-5'}>
            <p className="text-xs sm:text-[13px] font-medium text-[#0C65A1] leading-snug">
              {activeSlide.kicker}
            </p>

            <h1
              id="hero-h1"
              className={`font-editorial-display font-medium text-[#002147] tracking-[-0.02em] leading-[1.08] text-balance ${
                isBrandSlide
                  ? 'text-[1.85rem] sm:text-4xl lg:text-[2.9rem]'
                  : 'text-[1.9rem] sm:text-[2.65rem] lg:text-[3.05rem]'
              }`}
            >
              {activeSlide.headline}
            </h1>

            <p className="text-[15px] sm:text-base lg:text-[17px] text-slate-600 leading-[1.65] max-w-2xl font-normal">
              {activeSlide.description}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a
                href={activeSlide.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick('/', 'hero_carousel', {
                    service_id: activeSlide.id,
                  })
                }
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full bg-[#13733B] hover:bg-[#0F5C2F] text-white font-semibold text-sm sm:text-[15px] transition-colors text-center sm:whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{activeSlide.whatsappLabel}</span>
              </a>

              {activeSlide.scrollTargetId ? (
                <button
                  type="button"
                  onClick={() => onScrollToSection(activeSlide.scrollTargetId!)}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[48px] px-5 py-3 rounded-full bg-white/95 border border-slate-300 hover:border-[#002147] text-[#002147] font-medium text-sm sm:text-[15px] transition-colors text-center sm:whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>{activeSlide.pageLabel}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              ) : (
                <a
                  href={activeSlide.pageHref}
                  onClick={(e) => onNavigate(activeSlide.pageHref, e)}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[48px] px-5 py-3 rounded-full bg-white/95 border border-slate-300 hover:border-[#002147] text-[#002147] font-medium text-sm sm:text-[15px] transition-colors text-center sm:whitespace-nowrap shrink-0"
                >
                  <span>{activeSlide.pageLabel}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Foto sin marco encajonado del Osito Mimos en la puerta solo en Transición 1 */}
          {isBrandSlide && (
            <div className="lg:col-span-5">
              <figure className="rounded-2xl overflow-hidden bg-[#F4F9FE]">
                {!failedImages[activeSlide.id] ? (
                  <img
                    src={activeSlide.imageUrl}
                    srcSet={activeSlide.imageSrcSet}
                    sizes="(max-width: 1023px) 100vw, 42vw"
                    alt={activeSlide.imageAlt}
                    width={activeSlide.imageWidth}
                    height={activeSlide.imageHeight}
                    fetchPriority="high"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(activeSlide.id)}
                    className="w-full aspect-[16/10] sm:aspect-[4/3] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[16/10] sm:aspect-[4/3] bg-gradient-to-br from-[#F4F9FE] to-[#DCEBFA] flex flex-col items-center justify-center p-6 text-center text-[#002147]">
                    <Store className="w-10 h-10 text-[#0C65A1] mb-2" aria-hidden="true" />
                    <p className="font-editorial-display font-medium text-lg">
                      Tintorería Mimos Navia
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {CONTACT_INFO.streetAddress} · {CONTACT_INFO.postalCode} Vigo
                    </p>
                  </div>
                )}
              </figure>
            </div>
          )}
        </div>
      </div>

      {/* Pie limpio del Hero: selector de 7 servicios + una sola línea serena con las 3 tiendas */}
      <div className="relative z-10 bg-white/95 backdrop-blur-xs border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controles compactos solo en móvil (< sm) */}
          <div className="flex sm:hidden items-center justify-between gap-2 pt-2.5 pb-1">
            <span className="text-xs font-semibold text-slate-600 tabular-nums">
              Servicios ({activeIndex + 1}/{HERO_SERVICE_SLIDES.length})
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() =>
                  handleSelectSlide(
                    (activeIndex - 1 + HERO_SERVICE_SLIDES.length) % HERO_SERVICE_SLIDES.length
                  )
                }
                aria-label="Servicio anterior"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full border border-slate-200 bg-white text-[#002147] hover:border-[#002147] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F76BB]"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() =>
                  handleSelectSlide((activeIndex + 1) % HERO_SERVICE_SLIDES.length)
                }
                aria-label="Siguiente servicio"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-full border border-slate-200 bg-white text-[#002147] hover:border-[#002147] cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F76BB]"
              >
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Servicios destacados"
            className="flex lg:grid lg:grid-cols-7 gap-5 lg:gap-3 overflow-x-auto no-scrollbar pt-1 snap-x snap-mandatory"
          >
            {HERO_SERVICE_SLIDES.map((slide, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  id={`hero-tab-${slide.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls="hero-slide-panel"
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => handleSelectSlide(idx)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  className={`min-h-[44px] snap-start text-left py-2.5 border-t-2 transition-colors cursor-pointer flex items-center justify-between gap-1.5 shrink-0 lg:shrink whitespace-nowrap lg:whitespace-normal focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F76BB] ${
                    isSelected
                      ? 'border-[#0F76BB] text-[#002147] font-semibold'
                      : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-[#002147] font-medium'
                  }`}
                >
                  <span className="text-xs sm:text-[13px] leading-tight">
                    {slide.tabLabel}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="py-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="text-slate-500">Tiendas propias en Vigo:</span>
              {TIENDAS_PROPIAS.map((tienda, idx) => {
                const detailHref = STORE_DETAIL_HREFS[tienda.id] ?? '/puntos-mimos';
                const shortName = STORE_SHORT_NAMES[tienda.id] ?? tienda.nombre_mostrado;
                return (
                  <React.Fragment key={tienda.id}>
                    {idx > 0 && (
                      <span className="text-slate-300" aria-hidden="true">
                        ·
                      </span>
                    )}
                    <a
                      href={detailHref}
                      onClick={(e) => onNavigate(detailHref, e)}
                      className="inline-flex items-center min-h-[44px] sm:min-h-0 font-medium text-[#002147] hover:text-[#0F76BB] hover:underline transition-colors py-1"
                    >
                      {shortName}
                    </a>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#puntos"
                onClick={(e) => {
                  e.preventDefault();
                  onScrollToSection('puntos');
                }}
                className="inline-flex items-center gap-1.5 min-h-[44px] sm:min-h-0 font-medium text-[#0C65A1] hover:underline whitespace-nowrap py-1"
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Ver mapa y {PUNTOS_COLABORADORES.length} colaboradores</span>
              </a>

              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                aria-pressed={isPaused}
                aria-label={
                  isPaused
                    ? 'Reanudar carrusel de servicios'
                    : 'Pausar carrusel de servicios'
                }
                className="hidden sm:inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-[#002147] cursor-pointer whitespace-nowrap py-1 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F76BB] rounded-md"
              >
                {isPaused ? (
                  <>
                    <Play className="w-3 h-3" aria-hidden="true" />
                    <span>Reanudar</span>
                  </>
                ) : (
                  <>
                    <Pause className="w-3 h-3" aria-hidden="true" />
                    <span>Pausar</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
