import React from 'react';
import { ExternalLink, MessageCircle } from 'lucide-react';
import {
  RESENAS_REALES,
  CONTACT_INFO,
  TIENDAS_PROPIAS,
  PUNTOS_COLABORADORES,
} from '../data/mimosData';

export const WhyChooseMimosSection: React.FC = () => {
  // Tres pilares exactos (Sección 7.7 del Plan Maestro)
  const pilares = [
    {
      num: '01',
      titulo: 'Cuidado experto tejido a tejido',
      descripcion:
        'Tratamos cada prenda y cada textil del hogar según su fibra, estructura y etiqueta de conservación, prestando especial atención a los tejidos delicados, los acabados y los detalles en nuestras instalaciones de Navia (Vigo).',
    },
    {
      num: '02',
      titulo: 'Comodidad (domicilio, tiendas y puntos)',
      descripcion: `Elige en cada ocasión cómo prefieres entregar tus prendas: en nuestras ${TIENDAS_PROPIAS.length} tiendas propias en Vigo, en cualquiera de los ${PUNTOS_COLABORADORES.length} establecimientos colaboradores de la comarca o solicitando recogida y entrega a domicilio.`,
    },
    {
      num: '03',
      titulo: 'Solución integral para particulares y empresas',
      descripcion:
        'Damos respuesta tanto al cuidado diario de tu ropa y textiles domésticos como a las necesidades de lavandería y limpieza profesional de apartamentos turísticos, viviendas, oficinas y negocios en Vigo.',
    },
  ];

  return (
    <section
      id="por-que-mimos"
      aria-labelledby="por-que-heading"
      className="py-16 lg:py-24 bg-white dark:bg-[#071324] border-b border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tres Pilares (Sección 7.7) */}
        <div className="max-w-3xl mb-12">
          <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-2">
            Por qué elegir Tintorería Mimos Navia
          </p>
          <h2
            id="por-que-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight mb-4"
          >
            Experiencia, atención personalizada y comodidad en Vigo
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Nuestro objetivo es que disfrutes de tus prendas, textiles del hogar y espacios siempre limpios, cuidados y listos para usar, con atención inmediata a través de Mimo en WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pilares.map((p) => (
            <div
              key={p.num}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#0b1d36] p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-2">
                  PILAR {p.num}
                </p>
                <h3 className="text-xl font-extrabold text-[#002147] dark:text-white mb-2.5">
                  {p.titulo}
                </h3>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                  {p.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Las 3 Reseñas Reales de Google (Sección 7.7 y Sección 11: sin inventar nota media global) */}
        <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                Opiniones reales de clientes en Google
              </p>
              <h3 className="text-2xl font-extrabold text-[#002147] dark:text-white">
                Lo que opinan quienes ya nos confían sus prendas
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={CONTACT_INFO.googleReviewsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
              >
                <span>Ver reseñas en Google</span>
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={CONTACT_INFO.whatsappGeneralHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#178A47] hover:bg-[#126E38] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Hablar con Mimo</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESENAS_REALES.map((resena) => (
              <blockquote
                key={resena.autor}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1d36] p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <span className="text-amber-500 font-bold" aria-label="Valoración de 5 estrellas">
                      ★★★★★
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{resena.origen}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed mb-5">
                    «{resena.texto}»
                  </p>
                </div>
                <footer className="text-sm font-extrabold text-[#002147] dark:text-white pt-3 border-t border-slate-100 dark:border-slate-800">
                  {resena.autor}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
