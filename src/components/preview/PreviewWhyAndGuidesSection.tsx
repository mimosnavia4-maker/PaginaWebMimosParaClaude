import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  MessageCircle,
  BookOpen,
} from 'lucide-react';
import {
  ARTICULOS_BLOG,
  CONTACT_INFO,
  FAQ_PORTADA_SIN_PRECIOS,
  PUNTOS_COLABORADORES,
  RESENAS_REALES,
  TIENDAS_PROPIAS,
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

  const pilares = [
    {
      num: '01',
      titulo: 'Cuidado experto tejido a tejido',
      descripcion:
        'Tratamos cada prenda y textil del hogar según su fibra, estructura y etiqueta en nuestra planta de Navia, sin procesos genéricos en serie.',
    },
    {
      num: '02',
      titulo: 'Comodidad sin esperas ni pedido mínimo en tienda',
      descripcion: `Entrega directa en nuestras ${TIENDAS_PROPIAS.length} tiendas propias en Vigo o ${PUNTOS_COLABORADORES.length} puntos colaboradores, o solicita recogida y entrega a domicilio.`,
    },
    {
      num: '03',
      titulo: 'Atención cercana por WhatsApp con Mimo',
      descripcion:
        'Resolvemos dudas de manchas, sofás, alfombras o arreglos con foto previa antes de que te desplaces, avisándote en cuanto tu pedido está listo.',
    },
  ];

  // Destacamos 3 guías editoriales en portada (estilo revista Celsious), manteniendo acceso completo en /blog
  const featuredGuides = ARTICULOS_BLOG.slice(0, 3);

  return (
    <>
      {/* 1. CONFIANZA EN CASCADA + RESEÑAS REALES DE GOOGLE */}
      <section
        id="por-que-mimos"
        aria-labelledby="preview-trust-heading"
        className="py-18 lg:py-26 bg-white dark:bg-[#071324] border-b border-slate-200/70 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-18">
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl space-y-2.5"
            >
              <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Por qué elegir Tintorería Mimos Navia
              </p>
              <h2
                id="preview-trust-heading"
                className="text-3xl sm:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance"
              >
                Oficio textil artesanal con la agilidad que esperas hoy
              </h2>
            </motion.div>

            {/* Tres pilares sin encajonar en cajas repetitivas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pt-4 border-t border-slate-200/80 dark:border-slate-800">
              {pilares.map((p, idx) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="space-y-2.5 pt-2"
                >
                  <p className="text-2xl font-extrabold text-[#0F76BB] dark:text-[#60B5F6] tabular-nums">
                    {p.num}
                  </p>
                  <h3 className="text-xl font-extrabold text-[#002147] dark:text-white">
                    {p.titulo}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {p.descripcion}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Opiniones reales de clientes en Google */}
          <div className="pt-12 border-t border-slate-200/80 dark:border-slate-800 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                  Opiniones reales de clientes en Google
                </p>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                  Lo que dicen quienes ya confían su ropa a Mimos
                </h3>
              </div>

              <a
                href={CONTACT_INFO.googleReviewsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
              >
                <span>Ver todas las reseñas en Google</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {RESENAS_REALES.map((resena, idx) => (
                <motion.blockquote
                  key={resena.autor}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="rounded-3xl bg-[#F4F7FB] dark:bg-[#0b1d36] p-6 sm:p-7 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span
                        className="text-amber-500 font-bold tracking-tight"
                        aria-label="Valoración de 5 estrellas"
                      >
                        ★★★★★
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{resena.origen}</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                      «{resena.texto}»
                    </p>
                  </div>
                  <footer className="text-sm font-extrabold text-[#002147] dark:text-white pt-3 border-t border-slate-200/70 dark:border-slate-800">
                    {resena.autor}
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. REVISTA Y GUÍAS PRÁCTICAS DE CUIDADO TEXTIL (Estilo Celsious) */}
      <section
        id="blog"
        aria-labelledby="preview-guides-heading"
        className="py-18 lg:py-26 bg-[#FAFBFD] dark:bg-[#09182e] border-b border-slate-200/70 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          >
            <div className="max-w-2xl space-y-2.5">
              <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Cuaderno textil · Guías de Tintorería Mimos
              </p>
              <h2
                id="preview-guides-heading"
                className="text-3xl sm:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance"
              >
                Consejos prácticos antes de lavar o guardar en casa
              </h2>
            </div>

            <a
              href="/blog"
              onClick={(e) => onNavigate('/blog', e)}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>Ver las {ARTICULOS_BLOG.length} guías del blog</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {featuredGuides.map((articulo, idx) => (
              <motion.article
                key={articulo.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <a
                    href={articulo.url}
                    onClick={(e) => onNavigate(articulo.url, e)}
                    className="block aspect-4/3 rounded-3xl overflow-hidden bg-[#002147]"
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
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-6 text-center text-white">
                        <span className="text-base font-bold">{articulo.titulo}</span>
                      </div>
                    )}
                  </a>

                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                        {articulo.categoria}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{articulo.tiempoLectura}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white leading-snug">
                      <a
                        href={articulo.url}
                        onClick={(e) => onNavigate(articulo.url, e)}
                        className="hover:text-[#0F76BB] dark:hover:text-[#60B5F6] transition-colors"
                      >
                        {articulo.titulo}
                      </a>
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {articulo.extracto}
                    </p>
                  </div>
                </div>

                <div>
                  <a
                    href={articulo.url}
                    onClick={(e) => onNavigate(articulo.url, e)}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline"
                  >
                    <span>Leer guía completa</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PREGUNTAS FRECUENTES LIMPIAS (SEO/AEO sin saturación) + CIERRE DIRECTO */}
      <section
        id="preguntas-frecuentes"
        aria-labelledby="preview-faq-heading"
        className="py-18 lg:py-24 bg-white dark:bg-[#071324]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 space-y-5"
            >
              <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Dudas habituales
              </p>
              <h2
                id="preview-faq-heading"
                className="text-3xl sm:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance"
              >
                Preguntas frecuentes sobre precios, tiendas y recogida
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Si prefieres orientarte al instante para una prenda concreta, envíanos una fotografía por WhatsApp antes de venir.
              </p>
              <a
                href={CONTACT_INFO.whatsappGeneralHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('/preview-portada', 'faq_closing')}
                className="inline-flex items-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Preguntar ahora por WhatsApp</span>
              </a>
            </motion.div>

            <div className="lg:col-span-7 divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800">
              {FAQ_PORTADA_SIN_PRECIOS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={faq.pregunta} className="py-5">
                    <button
                      type="button"
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-[#002147] dark:text-white cursor-pointer"
                    >
                      <span>{faq.pregunta}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#0F76BB] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="pt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
                        >
                          {faq.respuesta}
                        </motion.div>
                      )}
                    </AnimatePresence>
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
