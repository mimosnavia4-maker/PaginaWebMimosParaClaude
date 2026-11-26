import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { ARTICULOS_BLOG_RESUMEN, CONTACT_INFO } from '../data/mimosData';
import { PageHeroLight } from './PageHeroLight';

interface BlogSectionProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  isPage?: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onNavigate, isPage = false }) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  return (
    <div id="blog" className="bg-white border-b border-slate-200">
      {isPage && (
        <PageHeroLight
          breadcrumbs={[
            { label: 'Inicio', href: '/' },
            { label: 'Guías y consejos de Mimos' },
          ]}
          onNavigate={onNavigate}
          kicker="Guías de cuidado textil · Blog de Mimos"
          title="Guías prácticas para conservar tus prendas, textiles del hogar y alojamientos"
          description="Consejos de expertos para el cuidado textil: manchas difíciles, edredones de plumas, símbolos de lavado, ventajas de externalizar la colada de casa y gestión de alojamientos turísticos."
          whatsappHref={CONTACT_INFO.whatsappBlogHelpHref}
          whatsappLabel="Consultar prenda con Mimo"
          secondaryAction={{
            label: 'Ver las 12 guías',
            href: '#articulos-blog',
          }}
        />
      )}

      <section
        id="articulos-blog"
        aria-labelledby="consejos-heading"
        className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isPage ? (
            <div className="max-w-3xl mb-12">
              <p className="text-xs sm:text-sm font-bold text-[#0C65A1] mb-2">
                Guías de cuidado textil · Blog de Mimos
              </p>
              <h2
                id="consejos-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] tracking-tight mb-4 text-balance"
              >
                Guías prácticas para conservar tus prendas, textiles del hogar y alojamientos
              </h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                Consejos de expertos para el cuidado textil: manchas difíciles, edredones de plumas, símbolos de lavado, ventajas de externalizar la colada de casa y gestión de alojamientos turísticos.
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-slate-200">
              <div>
                <h2
                  id="consejos-heading"
                  className="text-xl sm:text-2xl font-extrabold text-[#002147] tracking-tight"
                >
                  Todas nuestras guías y artículos prácticos
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Elaboradas por el equipo de Tintorería Mimos en Vigo para cuidar ropa, hogar, empresas y apartamentos turísticos.
                </p>
              </div>
              <span className="text-xs font-bold text-slate-500 tabular-nums shrink-0">
                {ARTICULOS_BLOG_RESUMEN.length} guías publicadas
              </span>
            </div>
          )}

          {/* Guías y artículos del Blog */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {ARTICULOS_BLOG_RESUMEN.map((articulo) => (
              <article
                key={articulo.slug}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden flex flex-col justify-between transition-colors hover:border-[#0F76BB] shadow-xs"
              >
                <div>
                  <a
                    href={articulo.url}
                    onClick={(e) => onNavigate(articulo.url, e)}
                    className="block aspect-4/3 overflow-hidden bg-[#EDF5FD]"
                  >
                    {!imgErrors[articulo.slug] ? (
                      <img
                        src={articulo.imagen}
                        alt={articulo.imagenAlt}
                        width={800}
                        height={600}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setImgErrors((prev) => ({ ...prev, [articulo.slug]: true }))
                        }
                        className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-200"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#EDF5FD] to-[#DCEBFA] flex flex-col items-center justify-center p-6 text-center text-[#002147]">
                        <Sparkles className="w-8 h-8 text-[#0C65A1] mb-2" aria-hidden="true" />
                        <span className="text-base font-bold leading-snug">{articulo.titulo}</span>
                      </div>
                    )}
                  </a>

                  <div className="p-6 sm:p-7">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mb-3">
                      <span className="font-bold text-[#0C65A1]">
                        {articulo.categoria}
                      </span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={articulo.fechaISO}>{articulo.fechaPublicacion}</time>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{articulo.tiempoLectura}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] mb-2.5 leading-snug">
                      <a
                        href={articulo.url}
                        onClick={(e) => onNavigate(articulo.url, e)}
                        className="hover:text-[#0F76BB] transition-colors"
                      >
                        {articulo.titulo}
                      </a>
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {articulo.extracto}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 sm:px-7 sm:pb-7 pt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                  <a
                    href={articulo.url}
                    onClick={(e) => onNavigate(articulo.url, e)}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Leer guía completa</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>

                  <a
                    href={articulo.whatsappCtaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 min-h-[44px] bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-xs px-3.5 py-2.5 rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Consultar</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre CTA luminoso */}
      <section aria-label="Consulta directa sobre prendas" className="py-12 sm:py-16 bg-[#F7F6F2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 bg-gradient-to-br from-[#F4F9FE] via-white to-[#EDF5FD] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
            <div className="space-y-1.5 max-w-2xl">
              <p className="text-xs font-bold text-[#0C65A1]">
                Asesoramiento textil sin compromiso
              </p>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#002147]">
                ¿Tienes dudas con una mancha o una prenda delicada antes de lavarla en casa?
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                Escríbenos por WhatsApp indicando el tejido o el problema y nuestro equipo de Vigo te orientará antes de intervenir sobre la prenda.
              </p>
            </div>
            <a
              href={CONTACT_INFO.whatsappBlogHelpHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm px-6 py-3 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Consultar prenda con Mimo</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
