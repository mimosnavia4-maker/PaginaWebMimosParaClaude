import React, { useState } from 'react';
import { MessageCircle, ArrowUpRight, CheckCircle2, Scissors, MapPin } from 'lucide-react';
import {
  SERVICIOS_MIMOS,
  CONTACT_INFO,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';

interface ServicesAndPricingSectionProps {
  onNavigate?: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

const PRENDAS_CONSULTA_RAPIDA = [
  { label: 'Traje completo o americana', prenda: 'un traje o americana' },
  { label: 'Vestido de fiesta o ceremonia', prenda: 'un vestido de fiesta o ceremonia' },
  { label: 'Arreglo de costura (bajos, cremallera...)', prenda: 'un arreglo de ropa (costura)' },
  { label: 'Edredón sintético o de plumas', prenda: 'un edredón' },
  { label: 'Alfombra o cortinas', prenda: 'una alfombra o cortinas' },
  { label: 'Lote de camisas o planchado', prenda: 'unas camisas o prendas para planchar' },
  { label: 'Colada familiar semanal', prenda: 'una colada familiar' },
];

export const ServicesAndPricingSection: React.FC<ServicesAndPricingSectionProps> = ({
  onNavigate,
}) => {
  const [prendaPersonalizada, setPrendaPersonalizada] = useState('');

  const customPrendaUrl = buildMimoWhatsAppUrl(
    `Hola, Mimo. Quiero saber cuánto cuesta limpiar ${
      prendaPersonalizada.trim() || 'una prenda'
    }`
  );

  return (
    <section
      id="servicios"
      aria-labelledby="servicios-heading"
      className="py-16 lg:py-24 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de Sección (Sección 3.A, 4 y 7.3 del Plan Maestro) */}
        <div className="max-w-3xl mb-12">
          <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-2">
            Especialistas en cuidado textil y limpieza en Vigo
          </p>
          <h2
            id="servicios-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight mb-4"
          >
            Nuestros 8 servicios profesionales de tintorería, lavandería y limpieza
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            En <strong>Tintorería Mimos Navia</strong> tratamos cada prenda y cada textil según su tejido y composición. Nuestro asistente <strong>Mimo</strong> te facilita al instante por WhatsApp el precio exacto o el presupuesto personalizado para lo que necesites.
          </p>
        </div>

        {/* Grid de los 8 Servicios Principales (Sección 3.A y 7.3 — Cero tarifas públicas) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {SERVICIOS_MIMOS.map((servicio) => (
            <article
              key={servicio.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-[#0F76BB]/60 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] uppercase tracking-wider">
                    SERVICIO {servicio.index}
                  </span>
                  {onNavigate && (
                    <a
                      href={servicio.url}
                      onClick={(e) => onNavigate(servicio.url, e)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#002147] dark:text-[#60B5F6] hover:underline"
                    >
                      <span>Ver ficha del servicio</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-1.5">
                  {onNavigate ? (
                    <a
                      href={servicio.url}
                      onClick={(e) => onNavigate(servicio.url, e)}
                      className="hover:text-[#0F76BB] dark:hover:text-[#60B5F6] transition-colors"
                    >
                      {servicio.titulo}
                    </a>
                  ) : (
                    servicio.titulo
                  )}
                </h3>

                <p className="text-xs sm:text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-3">
                  {servicio.subtitulo}
                </p>

                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  {servicio.descripcion}
                </p>

                <div className="mb-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#002147] dark:text-slate-200 mb-2">
                    Qué prendas y textiles tratamos:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {servicio.queTratamos.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {servicio.notaPendiente && (
                  <p className="text-xs text-amber-900 dark:text-amber-300 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-300/80 dark:border-amber-700/60 rounded-lg px-3 py-2 mb-5">
                    {servicio.notaPendiente}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={servicio.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>{servicio.ctaTexto}</span>
                </a>

                {onNavigate && (
                  <a
                    href={servicio.url}
                    onClick={(e) => onNavigate(servicio.url, e)}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 hover:text-[#0F76BB]"
                  >
                    <span>Más información</span>
                    <ArrowUpRight className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Servicio Destacado (Sección 7): Costura y arreglos de ropa (/arreglos-de-ropa-vigo) */}
        <div className="mb-14 rounded-2xl border-2 border-[#002147]/25 dark:border-[#0F76BB]/50 bg-white dark:bg-[#071324] p-6 sm:p-8 lg:p-10 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] uppercase tracking-wider">
                <Scissors className="w-4 h-4" aria-hidden="true" />
                <span>Servicio Destacado · Costura y Composturas</span>
                <span aria-hidden="true">·</span>
                <span>3 Tiendas en Vigo y 3 Puntos con Costura</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                {onNavigate ? (
                  <a
                    href="/arreglos-de-ropa-vigo"
                    onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                    className="hover:text-[#0F76BB] dark:hover:text-[#60B5F6] transition-colors"
                  >
                    Arreglos de ropa en Vigo: costura y composturas profesionales
                  </a>
                ) : (
                  'Arreglos de ropa en Vigo: costura y composturas profesionales'
                )}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Realizamos <strong>bajos y bastillas, cambio de cremalleras, botones, estrechar y ensanchar prendas, ajustes de cintura, zurcidos y descosidos</strong> en pantalones, faldas, vestidos, camisas, chaquetas y abrigos. Disponible en nuestras <strong>3 tiendas propias en Vigo</strong> y en los puntos colaboradores con servicio de costura en <strong>Gondomar, Ponteareas y O Porriño</strong>.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              {onNavigate && (
                <a
                  href="/arreglos-de-ropa-vigo"
                  onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                  className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] dark:hover:bg-[#0B5C94] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap"
                >
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span>Ver arreglos y puntos de costura</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              )}

              <a
                href={CONTACT_INFO.whatsappArreglosHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Consultar mi arreglo con Mimo</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bloque de consulta de precios directa a Mimo por WhatsApp (Sección 4 del Plan Maestro) */}
        <div
          id="consultar-precio-mimo"
          className="rounded-2xl bg-[#002147] text-white p-6 sm:p-10 border border-slate-800 shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#60B5F6]">
                Atención inmediata por WhatsApp · {CONTACT_INFO.whatsappNumber}
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                ¿Quieres saber cuánto cuesta limpiar una prenda, un edredón o una alfombra?
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Los precios te los da nuestro asistente <strong>Mimo</strong> al instante por WhatsApp según el tipo de prenda, tejido o servicio que necesites. Selecciona una consulta rápida o escribe tu prenda:
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {PRENDAS_CONSULTA_RAPIDA.map((item) => (
                  <a
                    key={item.label}
                    href={buildMimoWhatsAppUrl(
                      `Hola, Mimo. Quiero saber cuánto cuesta limpiar ${item.prenda}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 hover:bg-[#0F76BB] text-xs font-bold text-white border border-white/15 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#4ade80]" aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl bg-white/10 border border-white/15 p-5 space-y-3">
                <label
                  htmlFor="prenda-consulta-input"
                  className="block text-sm font-bold text-white"
                >
                  Pregunta por una prenda concreta:
                </label>
                <input
                  id="prenda-consulta-input"
                  type="text"
                  value={prendaPersonalizada}
                  onChange={(e) => setPrendaPersonalizada(e.target.value)}
                  placeholder="Ej.: un abrigo de lana, 2 edredones, vestido..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white text-slate-900 text-sm font-medium placeholder:text-slate-400"
                />
                <a
                  href={customPrendaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3.5 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Consulta tu precio con Mimo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
