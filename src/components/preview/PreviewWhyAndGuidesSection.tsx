import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import {
  ARTICULOS_BLOG_RESUMEN,
  CONTACT_INFO,
  FAQ_PORTADA_SIN_PRECIOS,
  RESENAS_REALES,
} from '../../data/mimosData';
import { trackWhatsAppClick } from '../../utils/analytics';

interface PreviewWhyAndGuidesSectionProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const PreviewWhyAndGuidesSection: React.FC<PreviewWhyAndGuidesSectionProps> = ({
  onNavigate,
}) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const featuredGuides = ARTICULOS_BLOG_RESUMEN.slice(0, 3);
  const moreGuides = ARTICULOS_BLOG_RESUMEN.slice(3);

  return (
    <>
      {/* 1. OPINIONES REALES EN FORMATO CITA EDITORIAL */}
      <section
        id="por-que-mimos"
        aria-labelledby="reviews-heading"
        className="py-16 lg:py-22 bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs sm:text-sm font-bold text-[#0F76BB] mb-1">
                Opiniones reales de clientes en Google
              </p>
              <h2
                id="reviews-heading"
                className="text-2xl sm:text-4xl font-extrabold text-[#002147] tracking-tight text-balance"
              >
                Lo que cuentan quienes ya confían sus prendas a Mimos
              </h2>
            </div>

            <a
              href={CONTACT_INFO.googleReviewsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold text-[#002147] hover:underline whitespace-nowrap shrink-0"
            >
              <span>Ver reseñas en Google</span>
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 border-t border-slate-200 pt-8">
            {RESENAS_REALES.map((resena) => (
              <blockquote
                key={resena.autor}
                className="flex flex-col justify-between space-y-4 border-l-2 border-[#0F76BB]/50 pl-5"
              >
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  «{resena.texto}»
                </p>
                <footer className="text-xs sm:text-sm text-slate-500">
                  <strong className="text-[#002147] font-extrabold">
                    {resena.autor}
                  </strong>{' '}
                  · {resena.origen}
                </footer>
              </blockquote>
            ))}
          </div>
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
