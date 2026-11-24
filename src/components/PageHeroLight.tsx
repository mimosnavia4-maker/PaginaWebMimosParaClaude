import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

export interface PageHeroBreadcrumb {
  label: string;
  href?: string;
}

export interface PageHeroLightProps {
  breadcrumbs: PageHeroBreadcrumb[];
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  kicker: string;
  title: string;
  description: string;
  note?: React.ReactNode;
  whatsappHref: string;
  whatsappLabel: string;
  onWhatsAppClick?: () => void;
  secondaryAction?: {
    label: string;
    href: string;
    icon?: React.ReactNode;
    isInternalRoute?: boolean;
  };
  image?: {
    src: string;
    srcSet?: string;
    sizes?: string;
    alt: string;
    caption?: string;
    fallbackTitle: string;
    fallbackSubtitle?: string;
  };
  extraContent?: React.ReactNode;
}

export const PageHeroLight: React.FC<PageHeroLightProps> = ({
  breadcrumbs,
  onNavigate,
  kicker,
  title,
  description,
  note,
  whatsappHref,
  whatsappLabel,
  onWhatsAppClick,
  secondaryAction,
  image,
  extraContent,
}) => {
  const [imgError, setImgError] = useState(false);

  const handleSecondaryClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!secondaryAction) return;
    if (secondaryAction.href.startsWith('#')) {
      e.preventDefault();
      const targetId = secondaryAction.href.slice(1);
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    if (secondaryAction.isInternalRoute !== false) {
      onNavigate(secondaryAction.href, e);
    }
  };

  return (
    <section className="relative py-10 sm:py-14 lg:py-16 bg-gradient-to-br from-white via-[#F4F9FE] to-[#EDF5FD] border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Migas de pan" className="mb-5 sm:mb-6">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-slate-600">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <React.Fragment key={`${crumb.label}-${idx}`}>
                  {idx > 0 && (
                    <li aria-hidden="true" className="text-slate-400">
                      /
                    </li>
                  )}
                  <li>
                    {crumb.href && !isLast ? (
                      <a
                        href={crumb.href}
                        onClick={(e) => onNavigate(crumb.href!, e)}
                        className="inline-flex items-center min-h-[36px] text-slate-600 hover:text-[#0F76BB] underline-offset-4 hover:underline transition-colors font-medium"
                      >
                        {crumb.label}
                      </a>
                    ) : (
                      <span className="font-bold text-[#0F76BB]">{crumb.label}</span>
                    )}
                  </li>
                </React.Fragment>
              );
            })}
          </ol>
        </nav>

        <div
          className={
            image
              ? 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center'
              : 'max-w-3xl'
          }
        >
          <div className={image ? 'lg:col-span-7 space-y-4 sm:space-y-5' : 'space-y-4 sm:space-y-5'}>
            <p className="text-xs sm:text-sm font-bold text-[#0F76BB] leading-snug">
              {kicker}
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-[#002147] tracking-tight leading-[1.1] text-balance">
              {title}
            </h1>

            <div className="flex items-start gap-4 max-w-2xl">
              <span
                className="hidden sm:block w-10 h-px bg-[#002147]/25 mt-3 shrink-0"
                aria-hidden="true"
              />
              <p className="text-sm sm:text-base lg:text-lg text-slate-700 leading-relaxed font-medium">
                {description}
              </p>
            </div>

            {note && (
              <div className="border-l-2 border-[#0F76BB] pl-4 py-1 text-xs sm:text-sm text-slate-700 leading-relaxed bg-white/70 rounded-r-sm max-w-2xl">
                {note}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onWhatsAppClick}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-lg bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm sm:text-base transition-colors text-center sm:whitespace-nowrap shrink-0 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>{whatsappLabel}</span>
              </a>

              {secondaryAction && (
                <a
                  href={secondaryAction.href}
                  onClick={handleSecondaryClick}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[48px] px-5 py-3 rounded-lg bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm sm:text-base transition-colors text-center sm:whitespace-nowrap shrink-0 group"
                >
                  {secondaryAction.icon && (
                    <span className="shrink-0">{secondaryAction.icon}</span>
                  )}
                  <span>{secondaryAction.label}</span>
                  {!secondaryAction.icon && (
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  )}
                </a>
              )}
            </div>

            {extraContent}
          </div>

          {image && (
            <div className="lg:col-span-5">
              <figure className="rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                {!imgError ? (
                  <img
                    src={image.src}
                    srcSet={image.srcSet}
                    sizes={image.sizes || '(max-width: 1023px) 100vw, 42vw'}
                    alt={image.alt}
                    width={800}
                    height={600}
                    fetchPriority="high"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full aspect-[4/3] object-cover"
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#EDF5FD] to-[#DCEBFA] flex flex-col items-center justify-center p-6 text-center text-[#002147]">
                    <Sparkles className="w-9 h-9 text-[#0F76BB] mb-2" aria-hidden="true" />
                    <p className="font-extrabold text-base">{image.fallbackTitle}</p>
                    {image.fallbackSubtitle && (
                      <p className="text-xs text-slate-600 mt-1">{image.fallbackSubtitle}</p>
                    )}
                  </div>
                )}
                {image.caption && (
                  <figcaption className="px-4 py-3 text-xs text-slate-600 border-t border-slate-100 bg-white leading-relaxed">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
