import React, { useState } from 'react';
import { ArrowLeft, MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import { ArticuloBlog, ARTICULOS_BLOG, CONTACT_INFO } from '../data/mimosData';

interface BlogArticlePageProps {
  articulo: ArticuloBlog;
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const BlogArticlePage: React.FC<BlogArticlePageProps> = ({
  articulo,
  onNavigate,
}) => {
  const [imgError, setImgError] = useState(false);
  const otroArticulo = ARTICULOS_BLOG.find((a) => a.slug !== articulo.slug);

  return (
    <main className="py-10 sm:py-16 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Migas de pan" className="mb-6">
          <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            <li>
              <a
                href="/"
                onClick={(e) => onNavigate('/', e)}
                className="hover:text-[#002147] dark:hover:text-white underline-offset-4 hover:underline"
              >
                Inicio
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a
                href="/blog"
                onClick={(e) => onNavigate('/blog', e)}
                className="hover:text-[#002147] dark:hover:text-white underline-offset-4 hover:underline"
              >
                Guías y Consejos de Mimos
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[#002147] dark:text-slate-200 font-bold truncate max-w-xs sm:max-w-md">
              {articulo.titulo}
            </li>
          </ol>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-3">
            <span className="font-bold text-[#0F76BB] dark:text-[#60B5F6]">
              {articulo.categoria}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={articulo.fechaISO}>{articulo.fechaPublicacion}</time>
            <span aria-hidden="true">·</span>
            <span>{articulo.tiempoLectura}</span>
            <span aria-hidden="true">·</span>
            <span>Por Tintorería Mimos Navia (Vigo)</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-extrabold text-[#002147] dark:text-white tracking-tight leading-[1.15] mb-6">
            {articulo.titulo}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {articulo.extracto}
          </p>
        </header>

        {/* Featured Editorial Image */}
        <figure className="mb-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#002147]">
          {!imgError ? (
            <img
              src={articulo.imagen}
              alt={articulo.imagenAlt}
              width={960}
              height={720}
              onError={() => setImgError(true)}
              className="w-full max-h-[480px] object-cover"
            />
          ) : (
            <div className="p-12 text-center text-white">
              <p className="font-bold">{articulo.imagenAlt}</p>
            </div>
          )}
          <figcaption className="px-5 py-3 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#0b1d36] border-t border-slate-200/80 dark:border-slate-800">
            {articulo.imagenAlt} · Guía elaborada por el equipo de Tintorería Mimos Navia en Vigo.
          </figcaption>
        </figure>

        {/* Article Body Prose */}
        <div className="space-y-8 text-base sm:text-[1.0625rem] text-slate-700 dark:text-slate-200 leading-relaxed">
          <div className="space-y-4">
            {articulo.introduccion.map((p, idx) => (
              <p key={idx} className="max-w-[70ch]">
                {p}
              </p>
            ))}
          </div>

          {articulo.secciones.map((sec) => (
            <section key={sec.h2} className="pt-4 space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                {sec.h2}
              </h2>

              {sec.parrafos.map((p, idx) => (
                <p key={idx} className="max-w-[70ch]">
                  {p}
                </p>
              ))}

              {sec.subsecciones && sec.subsecciones.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {sec.subsecciones.map((sub) => (
                    <div
                      key={sub.h3}
                      className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36]"
                    >
                      <h3 className="text-base sm:text-lg font-extrabold text-[#002147] dark:text-white mb-2">
                        {sub.h3}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {sub.texto}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {sec.puntosClave && sec.puntosClave.length > 0 && (
                <ul className="space-y-2.5 p-5 sm:p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] text-sm sm:text-base">
                  {sec.puntosClave.map((punto, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] shrink-0"
                      >
                        0{idx + 1}.
                      </span>
                      <span>{punto}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Professional Precaution Box */}
          <div className="p-6 rounded-2xl border border-amber-300/80 dark:border-amber-700/60 bg-amber-50/60 dark:bg-amber-950/20 text-sm sm:text-base text-slate-800 dark:text-slate-200">
            <h2 className="text-base font-extrabold text-[#002147] dark:text-amber-300 mb-1.5">
              Recomendación profesional sobre el cuidado de tejidos
            </h2>
            <p className="leading-relaxed">{articulo.advertenciaProfesional}</p>
          </div>

          {/* Internal Links to Corresponding Services */}
          <section
            aria-label="Servicios de Mimos relacionados con este artículo"
            className="pt-4"
          >
            <h2 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white mb-4">
              Servicios relacionados en Tintorería Mimos Vigo
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {articulo.enlacesInternos.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => onNavigate(link.href, e)}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB] bg-slate-50/50 dark:bg-[#0b1d36] transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-extrabold text-[#002147] dark:text-white group-hover:text-[#0F76BB] dark:group-hover:text-[#60B5F6] transition-colors">
                        {link.texto}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {link.descripcion}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          {/* Final Required WhatsApp CTA Banner */}
          <section
            aria-label="Consulta por WhatsApp"
            className="mt-10 p-6 sm:p-8 rounded-2xl bg-[#002147] text-white border border-slate-800"
          >
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              ¿Necesitas consultar el cuidado o el precio de una prenda con Mimo?
            </h2>
            <p className="text-sm sm:text-base text-slate-200 mb-6 max-w-2xl">
              Escríbenos por WhatsApp indicando el tejido o la prenda y nuestro asistente Mimo te informará al instante. También puedes acercarte a nuestras 3 tiendas propias en Vigo o a nuestros puntos colaboradores.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href={articulo.whatsappCtaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Consultar con Mimo por WhatsApp</span>
              </a>

              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-[#60B5F6]" aria-hidden="true" />
                <span>Llamar al {CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </section>
        </div>

        {/* Footer Navigation */}
        <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <a
            href="/blog"
            onClick={(e) => onNavigate('/blog', e)}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#002147] dark:text-slate-200 hover:text-[#0F76BB]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Volver a las guías del blog</span>
          </a>

          {otroArticulo && (
            <div className="text-left sm:text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-0.5">
                Siguiente guía recomendada:
              </p>
              <a
                href={otroArticulo.url}
                onClick={(e) => onNavigate(otroArticulo.url, e)}
                className="text-sm font-extrabold text-[#002147] dark:text-[#60B5F6] hover:underline"
              >
                {otroArticulo.titulo} →
              </a>
            </div>
          )}
        </footer>
      </article>
    </main>
  );
};
