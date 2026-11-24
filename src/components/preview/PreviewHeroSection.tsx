import React, { useEffect, useState } from 'react';
import {
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

const HERO_SERVICE_SLIDES: HeroServiceSlide[] = [
  {
    id: 'marca-mimos',
    tabLabel: 'Mimos Vigo',
    kicker: '3 tiendas propias en Vigo · 5 puntos colaboradores · Recogida a domicilio',
    headline: 'Cuidamos tu ropa, tus textiles del hogar y tus espacios con mimo profesional.',
    description:
      'Desde nuestras instalaciones en Navia (Vigo) damos servicio a particulares, apartamentos turísticos y empresas. Contamos con 3 tiendas propias en Vigo, red de establecimientos colaboradores en Redondela, Gondomar, Ponteareas, O Porriño y As Travesas, y servicio de recogida y entrega a domicilio.',
    imageUrl: IMAGES.ositoMimos,
    imageSrcSet: '/osito-mimos-640w.webp 640w, /osito-mimos.webp 1024w',
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
    kicker: 'Sin cita previa · Talleres propios en Gregorio Espino y Venezuela · Recepción en Navia',
    headline: 'Arreglos de ropa y costura profesional de todo tipo de prendas',
    description:
      'Bajos y bajo original vaquero, cremalleras, ajustes de talla, prendas de piel, bordados personalizados y confección de cortinas, estores y cojines. Disponible también en puntos colaboradores con costura.',
    imageUrl: IMAGES.arreglosRopa,
    imageSrcSet: '/arreglos-ropa-mimos-640w.webp 640w, /arreglos-ropa-mimos.webp 1024w',
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
    headline: 'Limpieza de sofás, tapicerías y colchones a domicilio',
    description:
      'Inyección-extracción controlada o baja humedad según etiqueta (W/S/WS/X) sin mover muebles, sin vapor seco ni ozono y con secado natural al aire. Para hogares, empresas y pisos turísticos.',
    imageUrl: limpiezaSofasImg,
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
    kicker: 'Recogida a domicilio o entrega en nuestras 3 tiendas',
    headline: 'Limpieza y reparación de alfombras',
    description:
      'Limpieza profunda según fibra y reverso con secado completo anti-humedad, y reparación de flecos, festón y bordes mediante especialista (puedes contratar solo reparación o limpieza + arreglo juntos).',
    imageUrl: IMAGES.alfombrasMimos,
    imageSrcSet: '/alfombras-mimos-640w.webp 640w, /alfombras-mimos.webp 1024w',
    imageAlt: 'Revisión y medición profesional de una alfombra de lana',
    pageHref: '/limpieza-alfombras-vigo',
    pageLabel: 'Ver alfombras y reparaciones',
    whatsappHref: CONTACT_INFO.whatsappAlfombrasHref,
    whatsappLabel: 'Consultar alfombra con Mimo',
  },
  {
    id: 'tintoreria-lavanderia',
    tabLabel: 'Tintorería y lavandería',
    kicker: 'Lavandería y limpieza profesional de prendas · En seco y al agua',
    headline: 'Tintorería, lavandería atendida, colada familiar y hogar',
    description:
      'Servicio 100 % atendido por nuestro equipo (sin monedas): trajes, novia y ceremonia, pieles, teñido, encerado Barbour e impermeabilización Gore-Tex, colada familiar, solo plancha, edredones y cortinas.',
    imageUrl: IMAGES.servicioTintoreria,
    imageSrcSet: '/servicio-tintoreria-640w.webp 640w, /servicio-tintoreria.webp 1024w',
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
    kicker:
      'Personal propio contratado · Seguro de responsabilidad civil · Prevención de riesgos laborales · Visita y presupuesto gratuitos',
    headline: 'Limpieza de comunidades, oficinas, locales y hogares',
    description:
      'Mantenimiento periódico de viviendas particulares (baños, cocinas y cristales), comunidades de propietarios (LPH), oficinas, clínicas y locales comerciales, además de lavandería laboral y recuperación textil tras siniestros.',
    imageUrl: IMAGES.blogLimpiezaOficinas,
    imageAlt: 'Equipo profesional realizando limpieza de mantenimiento en oficina',
    pageHref: '/limpieza-profesional-vigo',
    pageLabel: 'Ver limpieza profesional',
    whatsappHref: CONTACT_INFO.whatsappCleaningHref,
    whatsappLabel: 'Pedir visita o presupuesto',
  },
  {
    id: 'apartamentos-turisticos',
    tabLabel: 'Apartamentos turísticos',
    kicker:
      'Limpiezas entre reservas el mismo día · Sábados, domingos y festivos · Decreto 12/2017 (REAT)',
    headline: 'Apartamentos turísticos y viviendas de uso turístico',
    description:
      'Tú decides el nivel de ayuda: solo lavado y planchado de tu lencería separada por vivienda, limpieza de rotación + lavandería o coordinación integral con amenities, entrega de llaves y foto-reporte.',
    imageUrl: IMAGES.b2bApartamentos,
    imageSrcSet: '/apartamentos-mimos-640w.webp 640w, /apartamentos-mimos.webp 1024w',
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
  const [isPaused, setIsPaused] = useState(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const statusTimer = setInterval(() => {
      setStoreStatus(getNaviaStoreStatus());
    }, 60000);
    return () => clearInterval(statusTimer);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || isPaused) return;

    const slideTimer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SERVICE_SLIDES.length);
    }, 6500);

    return () => clearInterval(slideTimer);
  }, [isPaused]);

  const activeSlide = HERO_SERVICE_SLIDES[activeIndex];
  const isBrandSlide = Boolean(activeSlide.isBrandSlide);

  const handleSelectSlide = (idx: number) => {
    setActiveIndex(idx);
    setIsPaused(true);
  };

  const handleImageError = (slideId: string) => {
    setFailedImages((prev) => ({ ...prev, [slideId]: true }));
  };

  return (
    <section
      aria-labelledby="hero-h1"
      className="relative min-h-[82svh] flex flex-col justify-between bg-[#F4F9FE] overflow-hidden border-b border-slate-200"
    >
      {/* Fondo de diapositivas 2–7 con foto grande desenfocada y velo luminoso; en la 1 (Marca) lienzo limpio para lucir el oso nítido */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
          isBrandSlide ? 'opacity-0' : 'opacity-100'
        }`}
        aria-hidden="true"
      >
        {HERO_SERVICE_SLIDES.filter((slide) => !slide.isBrandSlide).map((slide) => {
          const isCurrent = slide.id === activeSlide.id;
          if (failedImages[slide.id]) {
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 bg-gradient-to-br from-[#EDF5FD] via-white to-[#DCEBFA] transition-opacity duration-700 ease-out ${
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
              alt=""
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => handleImageError(slide.id)}
              className={`absolute inset-0 w-full h-full object-cover blur-[2px] sm:blur-[2.5px] scale-[1.03] transition-opacity duration-700 ease-out ${
                isCurrent ? 'opacity-100' : 'opacity-0'
              }`}
            />
          );
        })}

        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-[#F2F8FE]/82 to-[#EBF4FD]/28" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/92 via-white/10 to-white/60 lg:via-transparent" />
      </div>

      {/* Lienzo luminoso para la Transición 1 (Oso nítido) */}
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-br from-white via-[#F4F9FE] to-[#E6F1FC] transition-opacity duration-500 ${
          isBrandSlide ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Cuerpo principal del Hero */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-auto py-6 sm:py-10">
        {/* Fila superior fija: H1 semántico + Estado Navia + Teléfono directo */}
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1.5 pb-3.5 mb-5 sm:mb-6 border-b border-[#002147]/12">
          <h1
            id="hero-h1"
            className="text-sm sm:text-base font-extrabold text-[#002147] tracking-tight"
          >
            Tintorería, lavandería y limpieza profesional en Vigo
          </h1>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-bold text-[#002147]">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#0F76BB] shrink-0" aria-hidden="true" />
              <span className={storeStatus.isOpen ? 'text-[#178A47]' : 'text-slate-700'}>
                Navia: {storeStatus.statusText}
              </span>
            </span>
            <span className="text-slate-300" aria-hidden="true">
              ·
            </span>
            <a
              href={CONTACT_INFO.phoneHref}
              onClick={() => trackPhoneClick('/', 'hero_top_phone')}
              className="inline-flex items-center gap-1.5 min-h-[44px] text-[#002147] hover:text-[#0F76BB] tabular-nums whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#0F76BB] shrink-0" aria-hidden="true" />
              <span>{CONTACT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* Contenido dinámico sincronizado */}
        <div
          className={
            isBrandSlide
              ? 'grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center'
              : 'max-w-3xl'
          }
        >
          <div className={isBrandSlide ? 'lg:col-span-7 space-y-4 sm:space-y-5' : 'space-y-4 sm:space-y-5'}>
            <p className="text-xs sm:text-sm font-bold text-[#0F76BB] leading-snug">
              {activeSlide.kicker}
            </p>

            <h2
              className={`font-extrabold text-[#002147] tracking-tight leading-[1.08] text-balance ${
                isBrandSlide
                  ? 'text-[1.75rem] sm:text-4xl lg:text-[3.1rem]'
                  : 'text-[1.8rem] sm:text-5xl lg:text-[3.25rem]'
              }`}
            >
              {activeSlide.headline}
            </h2>

            <div className="flex items-start gap-4 max-w-2xl">
              <span
                className="hidden sm:block w-10 h-px bg-[#002147]/30 mt-3 shrink-0"
                aria-hidden="true"
              />
              <p className="text-sm sm:text-base lg:text-lg text-slate-800 leading-relaxed font-medium">
                {activeSlide.description}
              </p>
            </div>

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
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm sm:text-base transition-colors text-center sm:whitespace-nowrap shrink-0 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{activeSlide.whatsappLabel}</span>
              </a>

              {activeSlide.scrollTargetId ? (
                <button
                  type="button"
                  onClick={() => onScrollToSection(activeSlide.scrollTargetId!)}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[48px] px-5 py-3 rounded-lg bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm sm:text-base transition-colors text-center sm:whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>{activeSlide.pageLabel}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </button>
              ) : (
                <a
                  href={activeSlide.pageHref}
                  onClick={(e) => onNavigate(activeSlide.pageHref, e)}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[48px] px-5 py-3 rounded-lg bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm sm:text-base transition-colors text-center sm:whitespace-nowrap shrink-0"
                >
                  <span>{activeSlide.pageLabel}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          {/* Foto nítida del Osito Mimos en la puerta solo en Transición 1 */}
          {isBrandSlide && (
            <div className="lg:col-span-5">
              <figure className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                {!failedImages[activeSlide.id] ? (
                  <img
                    src={activeSlide.imageUrl}
                    srcSet={activeSlide.imageSrcSet}
                    sizes="(max-width: 1023px) 100vw, 42vw"
                    alt={activeSlide.imageAlt}
                    width={800}
                    height={600}
                    fetchPriority="high"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(activeSlide.id)}
                    className="w-full aspect-[4/3] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#EDF5FD] to-[#DCEBFA] flex flex-col items-center justify-center p-6 text-center text-[#002147]">
                    <Store className="w-10 h-10 text-[#0F76BB] mb-2" aria-hidden="true" />
                    <p className="font-extrabold text-base">Tintorería Mimos Navia</p>
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

      {/* Zócalo inferior luminoso: Franja fija de 3 Tiendas Propias y Horarios + Tira de 7 Transiciones */}
      <div className="relative z-10 bg-white/95 backdrop-blur-xs border-t border-slate-200">
        {/* Franja fija compacta con las 3 tiendas propias, direcciones y horarios reales */}
        <div className="border-b border-slate-200 bg-[#F8FBFF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 lg:gap-6 flex-1 divide-y sm:divide-y-0 sm:divide-x divide-slate-200">
                {TIENDAS_PROPIAS.map((tienda, idx) => {
                  const detailHref = STORE_DETAIL_HREFS[tienda.id] ?? '/puntos-mimos';
                  return (
                    <div
                      key={tienda.id}
                      className={idx > 0 ? 'pt-2 sm:pt-0 sm:pl-4 lg:pl-6' : ''}
                    >
                      <a
                        href={detailHref}
                        onClick={(e) => onNavigate(detailHref, e)}
                        className="group block focus:outline-hidden min-h-[44px]"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-extrabold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                            {tienda.nombre_mostrado}
                          </span>
                          <span className="text-[11px] font-bold text-[#0F76BB] tabular-nums shrink-0">
                            {tienda.telefonos_mostrados}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 font-medium mt-0.5">
                          {tienda.direccion}
                        </p>
                        <p className="text-[11px] text-slate-600 mt-0.5 tabular-nums">
                          {tienda.horario.resumen}
                        </p>
                      </a>
                    </div>
                  );
                })}
              </div>

              <div className="pt-1 sm:pt-2 lg:pt-0 lg:pl-4 lg:border-l lg:border-slate-200 shrink-0">
                <a
                  href="#puntos"
                  onClick={(e) => {
                    e.preventDefault();
                    onScrollToSection('puntos');
                  }}
                  className="inline-flex items-center gap-1.5 min-h-[44px] text-xs font-bold text-[#0F76BB] hover:underline whitespace-nowrap shrink-0"
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Ver los {PUNTOS_COLABORADORES.length} puntos y mapa</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Selector de las 7 transiciones + Pausa/Reanudar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 space-y-2.5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold text-slate-600 tabular-nums">
              Elige o explora servicio ({activeIndex + 1}/{HERO_SERVICE_SLIDES.length})
            </p>
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={
                isPaused
                  ? 'Reanudar carrusel de servicios'
                  : 'Pausar carrusel de servicios'
              }
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3 text-xs font-bold text-[#002147] hover:text-[#0F76BB] cursor-pointer whitespace-nowrap shrink-0"
            >
              {isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Reanudar</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Pausar</span>
                </>
              )}
            </button>
          </div>

          <div
            role="tablist"
            aria-label="Servicios destacados en el carrusel"
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-3 gap-y-1.5"
          >
            {HERO_SERVICE_SLIDES.map((slide, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleSelectSlide(idx)}
                  className={`min-h-[48px] text-left pt-2 pb-1.5 border-t-2 transition-colors cursor-pointer flex items-center justify-between gap-1 ${
                    idx === HERO_SERVICE_SLIDES.length - 1 ? 'col-span-2 sm:col-span-1' : ''
                  } ${
                    isSelected
                      ? 'border-[#0F76BB] text-[#002147]'
                      : 'border-slate-300 text-slate-600 hover:border-[#002147]/50 hover:text-[#002147]'
                  }`}
                >
                  <span className="text-xs font-extrabold leading-tight">
                    <span className="text-[#0F76BB] mr-1 tabular-nums">{idx + 1}.</span>
                    {slide.tabLabel}
                  </span>
                  {isSelected && (
                    <ArrowRight
                      className="w-3.5 h-3.5 text-[#0F76BB] shrink-0"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
