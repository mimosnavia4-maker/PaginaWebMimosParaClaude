import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Pause,
  Play,
  Star,
} from 'lucide-react';
import {
  ARTICULOS_BLOG_RESUMEN,
  CONTACT_INFO,
  FAQ_PORTADA_SIN_PRECIOS,
  GOOGLE_RATING_SUMMARY,
  RESENAS_PORTADA_GOOGLE,
} from '../../data/mimosData';
import { trackWhatsAppClick } from '../../utils/analytics';

interface PreviewWhyAndGuidesSectionProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

const AVATAR_STYLES = [
  'bg-[#DCEBFA] text-[#002147]',
  'bg-[#E2E8F0] text-[#002147]',
  'bg-[#1FA855] text-white',
  'bg-[#FCD9B6] text-[#7C2D12]',
];

const GoogleGIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-8.97Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
    />
  </svg>
);

const RatingSummaryStars: React.FC = () => (
  <span className="inline-flex items-center gap-0.5" aria-hidden="true">
    {[0, 1, 2, 3].map((i) => (
      <Star
        key={i}
        className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]"
      />
    ))}
    <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
      <defs>
        <linearGradient id="mimos-star-43" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="40%" stopColor="#CBD5E1" />
        </linearGradient>
      </defs>
      <path
        fill="url(#mimos-star-43)"
        stroke="#F59E0B"
        strokeWidth="1.4"
        strokeLinejoin="round"
        d="M12 2.5l2.93 5.94 6.56.95-4.74 4.62 1.12 6.53L12 17.45l-5.87 3.09 1.12-6.53L2.51 9.39l6.56-.95L12 2.5z"
      />
    </svg>
  </span>
);

export const PreviewWhyAndGuidesSection: React.FC<PreviewWhyAndGuidesSectionProps> = ({
  onNavigate,
}) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [isPaused, setIsPaused] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    }
    return false;
  });
  const [isHoveringTrack, setIsHoveringTrack] = useState(false);
  const [isTouchingTrack, setIsTouchingTrack] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const touchResumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const featuredGuides = ARTICULOS_BLOG_RESUMEN.slice(0, 3);
  const moreGuides = ARTICULOS_BLOG_RESUMEN.slice(3);

  const carouselReviews = [...RESENAS_PORTADA_GOOGLE, ...RESENAS_PORTADA_GOOGLE];

  useEffect(() => {
    if (isPaused || isHoveringTrack || isTouchingTrack) {
      return;
    }

    let frameId = 0;
    let lastTime = performance.now();

    const step = (now: number) => {
      const el = trackRef.current;
      const dt = Math.min(now - lastTime, 48);
      lastTime = now;

      if (el) {
        const halfWidth = el.scrollWidth / 2;
        if (halfWidth > 0) {
          el.scrollLeft += dt * 0.04;
          if (el.scrollLeft >= halfWidth) {
            el.scrollLeft -= halfWidth;
          }
        }
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, isHoveringTrack, isTouchingTrack]);

  useEffect(() => {
    return () => {
      if (touchResumeTimeoutRef.current) {
        clearTimeout(touchResumeTimeoutRef.current);
      }
    };
  }, []);

  const scrollTrackByCard = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const stepPx = Math.min(360, Math.round(el.clientWidth * 0.85));
    const halfWidth = el.scrollWidth / 2;
    if (halfWidth > 0) {
      if (direction === -1 && el.scrollLeft < stepPx) {
        el.scrollLeft += halfWidth;
      } else if (direction === 1 && el.scrollLeft >= halfWidth) {
        el.scrollLeft -= halfWidth;
      }
    }
    el.scrollBy({ left: direction * stepPx, behavior: 'smooth' });
  };

  const handleTouchStart = () => {
    if (touchResumeTimeoutRef.current) {
      clearTimeout(touchResumeTimeoutRef.current);
      touchResumeTimeoutRef.current = null;
    }
    setIsTouchingTrack(true);
  };

  const handleTouchEnd = () => {
    if (touchResumeTimeoutRef.current) {
      clearTimeout(touchResumeTimeoutRef.current);
    }
    touchResumeTimeoutRef.current = setTimeout(() => {
      setIsTouchingTrack(false);
    }, 2500);
  };

  return (
    <>
      {/* 1. OPINIONES REALES EN GOOGLE ("Ganándonos la confianza de Vigo") */}
      <section
        id="por-que-mimos"
        aria-labelledby="reviews-heading"
        className="py-14 sm:py-16 lg:py-20 bg-[#EAF4FE] border-b border-slate-200 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h2
            id="reviews-heading"
            className="text-2xl sm:text-4xl font-extrabold text-[#002147] tracking-tight text-balance"
          >
            Ganándonos la confianza de Vigo
          </h2>
          <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto leading-relaxed">
            Lo que dicen de Mimos quienes ya nos confían su ropa y sus espacios en Vigo y alrededores.
          </p>

          <div className="pt-1 flex justify-center">
            <a
              href={CONTACT_INFO.googleReviewsHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Valoración media ${GOOGLE_RATING_SUMMARY.ratingDisplay} sobre 5 basada en ${GOOGLE_RATING_SUMMARY.label}. Abrir reseñas en Google`}
              className="inline-flex items-center gap-2.5 min-h-[44px] bg-white border border-[#BFDBFE] hover:border-[#0F76BB] rounded-full px-4 sm:px-5 py-2 shadow-2xs transition-colors"
            >
              <GoogleGIcon className="w-4 h-4 shrink-0" />
              <span className="text-sm sm:text-base font-extrabold text-[#002147] tabular-nums">
                {GOOGLE_RATING_SUMMARY.ratingDisplay}
              </span>
              <RatingSummaryStars />
              <span className="text-xs sm:text-sm font-bold text-[#002147]">
                {GOOGLE_RATING_SUMMARY.label}
              </span>
            </a>
          </div>
        </div>

        {/* Carrusel horizontal con desplazamiento suave, pausa y swipe táctil en móvil */}
        <div
          className="relative mt-8 sm:mt-10 max-w-[1440px] mx-auto"
          onMouseEnter={() => setIsHoveringTrack(true)}
          onMouseLeave={() => setIsHoveringTrack(false)}
        >
          <div
            className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#EAF4FE] to-transparent z-10"
            aria-hidden="true"
          />
          <div
            className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#EAF4FE] to-transparent z-10"
            aria-hidden="true"
          />

          <div
            ref={trackRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            className={`flex gap-4 sm:gap-5 overflow-x-auto px-4 sm:px-6 lg:px-10 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              isPaused || isTouchingTrack ? 'snap-x snap-proximity' : ''
            }`}
            aria-label="Carrusel de reseñas reales de clientes en Google"
          >
            {carouselReviews.map((resena, index) => {
              const avatarStyle = AVATAR_STYLES[index % AVATAR_STYLES.length];
              const initial = resena.autor.trim().charAt(0).toUpperCase();
              const isDuplicate = index >= RESENAS_PORTADA_GOOGLE.length;

              return (
                <article
                  key={`${resena.autor}-${index}`}
                  aria-hidden={isDuplicate ? true : undefined}
                  className="w-[84vw] max-w-[330px] sm:w-[340px] sm:max-w-none shrink-0 snap-start rounded-2xl bg-white border border-[#BFDBFE] p-5 sm:p-6 shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 ${avatarStyle}`}
                          aria-hidden="true"
                        >
                          {initial}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-sm font-extrabold text-[#002147] truncate">
                            {resena.autor}
                          </h3>
                          <div
                            className="flex items-center gap-0.5 mt-0.5"
                            aria-label={`${resena.estrellas} de 5 estrellas`}
                          >
                            {Array.from({ length: resena.estrellas }).map((_, starIdx) => (
                              <Star
                                key={starIdx}
                                className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]"
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <GoogleGIcon className="w-4 h-4 shrink-0 mt-0.5" />
                    </div>

                    <div className="border-t border-slate-100 my-3.5" />

                    <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                      «{resena.texto}»
                    </p>
                  </div>

                  <p className="mt-4 pt-2 text-[11px] font-bold text-[#002147]">
                    {resena.origen}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        {/* Controles inferiores: anterior/siguiente + pausa + ver todas en Google */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollTrackByCard(-1)}
            aria-label="Ver reseña anterior"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-[#BFDBFE] hover:border-[#0F76BB] text-[#002147] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={
              isPaused
                ? 'Reanudar desplazamiento automático de reseñas'
                : 'Pausar desplazamiento automático de reseñas'
            }
            aria-pressed={isPaused}
            className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[#DCEBFA] hover:bg-[#BFDBFE] text-[#002147] transition-colors cursor-pointer"
          >
            {isPaused ? (
              <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            ) : (
              <Pause className="w-4 h-4 fill-current" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => scrollTrackByCard(1)}
            aria-label="Ver siguiente reseña"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white border border-[#BFDBFE] hover:border-[#0F76BB] text-[#002147] transition-colors cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>

          <a
            href={CONTACT_INFO.googleReviewsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center min-h-[44px] px-6 py-2.5 rounded-full bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm transition-colors shadow-xs"
          >
            Ver todas las opiniones en Google
          </a>
        </div>
      </section>

      {/* 2. GUÍAS PRÁCTICAS DE CUIDADO TEXTIL */}
      <section
        id="blog"
        aria-labelledby="guides-heading"
        className="py-16 lg:py-22 bg-[#F7F6F2] border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs sm:text-sm font-bold text-[#0F76BB]">
                Cuaderno textil · Guías de Tintorería Mimos
              </p>
              <h2
                id="guides-heading"
                className="text-2xl sm:text-4xl font-extrabold text-[#002147] tracking-tight text-balance"
              >
                Consejos prácticos antes de lavar o guardar en casa
              </h2>
            </div>

            <a
              href="/blog"
              onClick={(e) => onNavigate('/blog', e)}
              className="inline-flex items-center gap-2 min-h-[44px] text-sm font-bold text-[#002147] hover:underline whitespace-nowrap shrink-0"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>Ver las {ARTICULOS_BLOG_RESUMEN.length} guías del blog</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredGuides.map((articulo) => (
              <article
                key={articulo.slug}
                className="group flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3.5">
                  <a
                    href={articulo.url}
                    onClick={(e) => onNavigate(articulo.url, e)}
                    className="block aspect-4/3 rounded-sm overflow-hidden bg-[#EDF5FD]"
                  >
                    {!imgErrors[articulo.slug] ? (
                      <img
                        src={articulo.imagen}
                        alt={articulo.imagenAlt}
                        width={800}
                        height={600}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setImgErrors((prev) => ({ ...prev, [articulo.slug]: true }))
                        }
                        className="w-full h-full object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-6 text-center text-[#002147]">
                        <span className="text-base font-bold">{articulo.titulo}</span>
                      </div>
                    )}
                  </a>

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span className="font-bold text-[#0F76BB]">
                        {articulo.categoria}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{articulo.tiempoLectura}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] leading-snug">
                      <a
                        href={articulo.url}
                        onClick={(e) => onNavigate(articulo.url, e)}
                        className="hover:text-[#0F76BB] transition-colors"
                      >
                        {articulo.titulo}
                      </a>
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                      {articulo.extracto}
                    </p>
                  </div>
                </div>

                <div>
                  <a
                    href={articulo.url}
                    onClick={(e) => onNavigate(articulo.url, e)}
                    className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold text-[#002147] hover:underline"
                  >
                    <span>Leer guía completa</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {moreGuides.length > 0 && (
            <div className="pt-5 border-t border-slate-300/80 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs sm:text-sm">
              <span className="font-bold text-slate-500">
                Más guías útiles:
              </span>
              {moreGuides.map((g) => (
                <a
                  key={g.slug}
                  href={g.url}
                  onClick={(e) => onNavigate(g.url, e)}
                  className="inline-flex items-center min-h-[44px] font-bold text-[#002147] hover:text-[#0F76BB] hover:underline"
                >
                  {g.titulo}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. PREGUNTAS FRECUENTES */}
      <section
        id="preguntas-frecuentes"
        aria-labelledby="faq-heading"
        className="py-16 lg:py-22 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs sm:text-sm font-bold text-[#0F76BB]">
                Dudas habituales
              </p>
              <h2
                id="faq-heading"
                className="text-2xl sm:text-4xl font-extrabold text-[#002147] tracking-tight text-balance"
              >
                Preguntas frecuentes sobre tiendas, plazos y recogida
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Si quieres orientarte al instante para una prenda concreta o un sofá, envíanos una fotografía por WhatsApp antes de venir.
              </p>
              <a
                href={CONTACT_INFO.whatsappGeneralHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('/', 'faq_closing')}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm px-5 py-2.5 rounded-sm transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Preguntar ahora por WhatsApp</span>
              </a>
            </div>

            <div className="lg:col-span-7 divide-y divide-slate-200 border-t border-b border-slate-200">
              {FAQ_PORTADA_SIN_PRECIOS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={faq.pregunta} className="py-3.5">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full min-h-[48px] text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-[#002147] cursor-pointer py-1"
                    >
                      <span>{faq.pregunta}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#0F76BB] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      className={
                        isOpen
                          ? 'pt-2 pb-2 text-sm text-slate-600 leading-relaxed'
                          : 'hidden'
                      }
                    >
                      {faq.respuesta}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
