import React, { useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { ARTICULOS_BLOG, CONTACT_INFO } from '../data/mimosData';

interface BlogSectionProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  isPage?: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onNavigate, isPage = false }) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  return (
    <section
      id="blog"
      aria-labelledby="consejos-heading"
      className="py-16 lg:py-24 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-2">
            Guías de cuidado textil · Blog de Mimos
          </p>
          {isPage ? (
            <h1
              id="consejos-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight mb-4"
            >
              Guías prácticas para conservar tus prendas, textiles del hogar y alojamientos
            </h1>
          ) : (
            <h2
              id="consejos-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight mb-4"
            >
              Guías prácticas para conservar tus prendas, textiles del hogar y alojamientos
            </h2>
          )}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Consejos de expertos para el cuidado textil: manchas difíciles, edredones de plumas, símbolos de lavado, ventajas de externalizar la colada de casa y gestión de alojamientos turísticos.
          </p>
        </div>

        {/* Guías y artículos del Blog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTICULOS_BLOG.map((articulo) => (
            <article
              key={articulo.slug}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] overflow-hidden flex flex-col justify-between transition-colors hover:border-[#0F76BB]/60"
            >
              <div>
                <a
                  href={articulo.url}
                  onClick={(e) => onNavigate(articulo.url, e)}
                  className="block aspect-4/3 overflow-hidden bg-[#002147]"
                >
                  {!imgErrors[articulo.slug] ? (
                    <img
                      src={articulo.imagen}
                      alt={articulo.imagenAlt}
                      width={800}
                      height={600}
                      loading="lazy"
                      onError={() =>
                        setImgErrors((prev) => ({ ...prev, [articulo.slug]: true }))
                      }
                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-200"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-6 text-center text-white">
                      <span className="text-base font-bold">{articulo.titulo}</span>
                    </div>
                  )}
                </a>

                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <span className="font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                      {articulo.categoria}
                    </span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={articulo.fechaISO}>{articulo.fechaPublicacion}</time>
                    <span aria-hidden="true">·</span>
                    <span>{articulo.tiempoLectura}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-3 leading-snug">
                    <a
                      href={articulo.url}
                      onClick={(e) => onNavigate(articulo.url, e)}
                      className="hover:text-[#0F76BB] dark:hover:text-[#60B5F6] transition-colors"
                    >
                      {articulo.titulo}
                    </a>
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {articulo.extracto}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800/80">
                <a
                  href={articulo.url}
                  onClick={(e) => onNavigate(articulo.url, e)}
                  className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] dark:hover:bg-[#0B5C94] text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Leer guía completa</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={articulo.whatsappCtaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#178A47] dark:text-[#4ade80] hover:underline"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Consultar a Mimo</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            ¿Tienes dudas con una mancha o una prenda delicada antes de lavarla en casa? Escríbenos por WhatsApp y te orientamos sin compromiso.
          </p>
          <a
            href={CONTACT_INFO.whatsappBlogHelpHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Consultar prenda con Mimo</span>
          </a>
        </div>
      </div>
    </section>
  );
};
