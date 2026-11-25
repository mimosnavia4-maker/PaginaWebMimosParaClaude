import React, { useEffect, useId, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, Star } from 'lucide-react';

export interface GoogleReviewCardItem {
  autor: string;
  origen?: string;
  estrellas: number;
  texto: string;
  fechaTexto?: string;
}

export interface GoogleReviewsCarouselSectionProps {
  id?: string;
  variant?: 'fullwidth' | 'card';
  title: string;
  subtitle: string;
  headingId?: string;
  reviews: GoogleReviewCardItem[];
  ratingValue?: number | null;
  ratingDisplay?: string;
  reviewCountLabel?: string;
  googleReviewsHref: string;
  googleButtonLabel?: string;
  writeReviewHref?: string;
  writeReviewLabel?: string;
  trackAriaLabel?: string;
}

const AVATAR_STYLES = [
  'bg-[#DCEBFA] text-[#002147]',
  'bg-[#E2E8F0] text-[#002147]',
  'bg-[#1FA855] text-white',
  'bg-[#FCD9B6] text-[#7C2D12]',
];

const GoogleGIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
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

const RatingSummaryStars: React.FC<{ ratingValue: number }> = ({ ratingValue }) => {
  const starGradientId = useId();
  const clamped = Math.max(0, Math.min(5, ratingValue));
  const fullStars = Math.floor(clamped);
  const partialPct = Math.round((clamped - fullStars) * 100);

  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, idx) => {
        if (idx < fullStars) {
          return (
            <Star
              key={idx}
              className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]"
            />
          );
        }
        if (idx === fullStars && partialPct > 0) {
          return (
            <svg key={idx} viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
              <defs>
                <linearGradient id={starGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset={`${partialPct}%`} stopColor="#F59E0B" />
                  <stop offset={`${partialPct}%`} stopColor="#CBD5E1" />
                </linearGradient>
              </defs>
              <path
                fill={`url(#${starGradientId})`}
                stroke="#F59E0B"
                strokeWidth="1.4"
                strokeLinejoin="round"
                d="M12 2.5l2.93 5.94 6.56.95-4.74 4.62 1.12 6.53L12 17.45l-5.87 3.09 1.12-6.53L2.51 9.39l6.56-.95L12 2.5z"
              />
            </svg>
          );
        }
        return (
          <Star
            key={idx}
            className="w-4 h-4 fill-[#CBD5E1] text-[#F59E0B]"
          />
        );
      })}
    </span>
  );
};

export const GoogleReviewsCarouselSection: React.FC<GoogleReviewsCarouselSectionProps> = ({
  id,
  variant = 'fullwidth',
  title,
  subtitle,
  headingId,
  reviews,
  ratingValue,
  ratingDisplay,
  reviewCountLabel,
  googleReviewsHref,
  googleButtonLabel = 'Ver todas las opiniones en Google',
  writeReviewHref,
  writeReviewLabel = 'Dejar una reseña',
  trackAriaLabel = 'Carrusel de reseñas reales de clientes en Google',
}) => {
  const autoHeadingId = useId();
  const resolvedHeadingId = headingId || autoHeadingId;

  const [isPaused, setIsPaused] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    }
    return false;
  });
  const [isHoveringTrack, setIsHoveringTrack] = useState(false);
  const [isTouchingTrack, setIsTouchingTrack] = useState(false);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const subpixelAccumRef = useRef(0);
  const touchResumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const carouselReviews = reviews.length > 0 ? [...reviews, ...reviews] : [];

  useEffect(() => {
    if (isPaused || isHoveringTrack || isTouchingTrack || carouselReviews.length === 0) {
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
          subpixelAccumRef.current += dt * 0.04;
          const whole = Math.floor(subpixelAccumRef.current);
          if (whole >= 1) {
            el.scrollLeft += whole;
            subpixelAccumRef.current -= whole;
          }
          if (el.scrollLeft >= halfWidth) {
            el.scrollLeft -= halfWidth;
          }
        }
      }
      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused, isHoveringTrack, isTouchingTrack, carouselReviews.length]);

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
    subpixelAccumRef.current = 0;
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
    subpixelAccumRef.current = 0;
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

  const showRatingPill = typeof ratingValue === 'number' && !Number.isNaN(ratingValue);
  const formattedRating =
    ratingDisplay ??
    (showRatingPill ? ratingValue.toFixed(1).replace('.', ',') : undefined);

  const isCard = variant === 'card';
  const sectionClass = isCard
    ? 'scroll-mt-24 rounded-3xl bg-[#EAF4FE] border border-[#BFDBFE] shadow-sm py-8 sm:py-10 overflow-hidden'
    : 'py-14 sm:py-16 lg:py-20 bg-[#EAF4FE] border-b border-slate-200 overflow-hidden';

  const headerContainerClass = isCard
    ? 'px-4 sm:px-8 text-center space-y-3.5'
    : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4';

  const trackPaddingClass = isCard ? 'px-4 sm:px-8' : 'px-4 sm:px-6 lg:px-10';

  return (
    <section id={id} aria-labelledby={resolvedHeadingId} className={sectionClass}>
      <div className={headerContainerClass}>
        <h2
          id={resolvedHeadingId}
          className={
            isCard
              ? 'text-xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance'
              : 'text-2xl sm:text-4xl font-extrabold text-[#002147] tracking-tight text-balance'
          }
        >
          {title}
        </h2>
        <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>

        {showRatingPill && formattedRating && (
          <div className="pt-1 flex justify-center">
            <a
              href={googleReviewsHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Valoración media ${formattedRating} sobre 5${
                reviewCountLabel ? ` basada en ${reviewCountLabel}` : ''
              }. Abrir reseñas en Google`}
              className="inline-flex items-center gap-2.5 min-h-[44px] bg-white border border-[#BFDBFE] hover:border-[#0F76BB] rounded-full px-4 sm:px-5 py-2 shadow-2xs transition-colors"
            >
              <GoogleGIcon className="w-4 h-4 shrink-0" />
              <span className="text-sm sm:text-base font-extrabold text-[#002147] tabular-nums">
                {formattedRating}
              </span>
              <RatingSummaryStars ratingValue={ratingValue} />
              {reviewCountLabel && (
                <span className="text-xs sm:text-sm font-bold text-[#002147]">
                  {reviewCountLabel}
                </span>
              )}
            </a>
          </div>
        )}
      </div>

      {carouselReviews.length > 0 && (
        <div
          className={`relative mt-7 sm:mt-9 ${isCard ? '' : 'max-w-[1440px] mx-auto'}`}
          onMouseEnter={() => setIsHoveringTrack(true)}
          onMouseLeave={() => setIsHoveringTrack(false)}
        >
          <div
            className="hidden md:block pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-12 bg-gradient-to-r from-[#EAF4FE] to-transparent z-10"
            aria-hidden="true"
          />
          <div
            className="hidden md:block pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-12 bg-gradient-to-l from-[#EAF4FE] to-transparent z-10"
            aria-hidden="true"
          />

          <div
            ref={trackRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchEnd}
            className={`flex items-stretch gap-4 sm:gap-5 overflow-x-auto ${trackPaddingClass} py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
              isPaused || isTouchingTrack ? 'snap-x snap-proximity' : ''
            }`}
            aria-label={trackAriaLabel}
          >
            {carouselReviews.map((resena, index) => {
              const avatarStyle = AVATAR_STYLES[index % AVATAR_STYLES.length];
              const initial = resena.autor.trim().charAt(0).toUpperCase();
              const isDuplicate = index >= reviews.length;
              const footerOrigin = resena.origen || 'Reseña real en Google';

              return (
                <article
                  key={`${resena.autor}-${index}`}
                  aria-hidden={isDuplicate ? true : undefined}
                  className="w-[82vw] max-w-[330px] sm:w-[340px] sm:max-w-none shrink-0 snap-start rounded-2xl bg-white border border-[#BFDBFE] p-5 sm:p-6 shadow-2xs flex flex-col justify-between"
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
                    {footerOrigin}
                    {resena.fechaTexto ? ` · ${resena.fechaTexto}` : ''}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* Controles inferiores: anterior/pausa/siguiente + acciones Google */}
      <div
        className={`${
          isCard ? 'px-4 sm:px-8' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
        } mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3`}
      >
        {carouselReviews.length > 0 && (
          <div className="inline-flex items-center gap-2.5">
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
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <a
            href={googleReviewsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 sm:px-6 py-2.5 rounded-full bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm transition-colors shadow-xs"
          >
            <span>{googleButtonLabel}</span>
          </a>

          {writeReviewHref && (
            <a
              href={writeReviewHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-white border border-[#BFDBFE] hover:border-[#0F76BB] text-[#002147] font-bold text-sm transition-colors shadow-2xs"
            >
              <GoogleGIcon className="w-4 h-4 shrink-0" />
              <span>{writeReviewLabel}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
