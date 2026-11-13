import React, { useState } from 'react';
import {
  MessageCircle,
  ArrowUpRight,
  CheckCircle2,
  Scissors,
  MapPin,
  Sparkles,
  Building2,
} from 'lucide-react';
import {
  SUBBLOQUES_TINTORERIA_PORTADA,
  RESUMEN_FAMILIAS_EXTENDIDAS_PORTADA,
  TIENDAS_PROPIAS,
  PUNTOS_CON_COSTURA,
  CONTACT_INFO,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackWhatsAppClick } from '../utils/analytics';

interface ServicesAndPricingSectionProps {
  onNavigate?: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

const PRENDAS_CONSULTA_RAPIDA = [
  { label: 'Traje completo o americana', prenda: 'un traje o americana' },
  { label: 'Vestido de fiesta o ceremonia', prenda: 'un vestido de fiesta o ceremonia' },
  { label: 'Sofá o tapicería a domicilio', prenda: 'un sofá o tapicería a domicilio' },
  { label: 'Alfombra (limpieza o arreglo)', prenda: 'una alfombra (limpieza o reparación de flecos/bordes)' },
  { label: 'Cazadora de cuero, ante o piel', prenda: 'una prenda de piel, cuero o ante' },
  { label: 'Arreglo de costura (bajos, cremallera...)', prenda: 'un arreglo de ropa (costura)' },
  { label: 'Edredón, cortinas o estores', prenda: 'un edredón, cortinas o estores' },
  { label: 'Wet Cleaning o prenda delicada', prenda: 'una prenda delicada en Wet Cleaning' },
  { label: 'Colada familiar o lote de camisas', prenda: 'una colada familiar o lote de planchado' },
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

  const puntosColaboradoresCostura = PUNTOS_CON_COSTURA.filter((p) => p.tipo === 'punto');

  return (
    <section
      id="servicios"
      aria-labelledby="servicios-heading"
      className="py-16 lg:py-24 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado General de las 4 Familias */}
        <div className="max-w-3xl mb-12">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6] mb-2">
            Catálogo estructurado · 4 áreas especializadas en Vigo
          </p>
          <h2
            id="servicios-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance mb-4"
          >
            Tintorería, lavandería, costura y limpieza profesional adaptada a cada encargo
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            En <strong>Tintorería Mimos Navia</strong> organizamos nuestro trabajo en cuatro grandes especialidades: desde la tintorería técnica y el cuidado de prendas delicadas hasta la costura en taller propio, la limpieza profesional de espacios y la gestión de alojamientos turísticos. Consulta con <strong>Mimo</strong> por WhatsApp para recibir orientación según tu tejido o necesidad.
          </p>
        </div>

        {/* FAMILIA 01: TINTORERÍA Y LAVANDERÍA (15 servicios en 4 subbloques) */}
        <div className="mb-14">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                Familia 01 · Familia principal · 15 servicios especializados
              </p>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                Tintorería y lavandería profesional
              </h3>
            </div>
            {onNavigate && (
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm font-bold">
                <a
                  href="/tintoreria-vigo"
                  onClick={(e) => onNavigate('/tintoreria-vigo', e)}
                  className="inline-flex items-center gap-1 text-[#002147] dark:text-[#60B5F6] hover:underline"
                >
                  <span>Ficha de tintorería</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href="/lavanderia-vigo"
                  onClick={(e) => onNavigate('/lavanderia-vigo', e)}
                  className="inline-flex items-center gap-1 text-[#002147] dark:text-[#60B5F6] hover:underline"
                >
                  <span>Ficha de lavandería</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SUBBLOQUES_TINTORERIA_PORTADA.map((bloque) => (
              <article
                key={bloque.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:border-[#0F76BB]/60 transition-colors"
              >
                <div>
                  <p className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] uppercase tracking-wider mb-2">
                    {bloque.codigo}
                  </p>
                  <h4 className="text-xl font-extrabold text-[#002147] dark:text-white mb-1.5">
                    {bloque.titulo}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 mb-5">
                    {bloque.subtitulo}
                  </p>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 mb-6">
                    {bloque.servicios.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={bloque.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick('/#servicios', 'service_card', {
                        service_id: bloque.id,
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Consultar con Mimo</span>
                  </a>

                  {onNavigate && (
                    <div className="flex flex-wrap items-center gap-3">
                      {bloque.enlaces.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          onClick={(e) => onNavigate(link.href, e)}
                          className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 hover:text-[#0F76BB]"
                        >
                          <span>{link.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#0F76BB]" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* FAMILIA 02: COSTURA Y ARREGLOS DE ROPA (18 servicios) */}
        <div className="mb-14 rounded-2xl border-2 border-[#002147]/25 dark:border-[#0F76BB]/50 bg-white dark:bg-[#071324] p-6 sm:p-8 lg:p-10 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] uppercase tracking-wider">
                <Scissors className="w-4 h-4" aria-hidden="true" />
                <span>Familia 02 · Costura y arreglos de ropa · 18 especialidades</span>
                <span aria-hidden="true">·</span>
                <span>
                  {TIENDAS_PROPIAS.length} Tiendas en Vigo y {puntosColaboradoresCostura.length} Puntos con Costura
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                {onNavigate ? (
                  <a
                    href="/arreglos-de-ropa-vigo"
                    onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                    className="hover:text-[#0F76BB] dark:hover:text-[#60B5F6] transition-colors"
                  >
                    Arreglos de ropa, confección a medida, bordados y composturas en Vigo
                  </a>
                ) : (
                  'Arreglos de ropa, confección a medida, bordados y composturas en Vigo'
                )}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Cubrimos los <strong>18 servicios de nuestro catálogo de costura</strong>: desde <strong>bajos y bastillas, pantalones, faldas, vestidos, abrigos, cambio y reparación de cremalleras, botones, estrechar/ensanchar, ajustes de cintura, zurcidos y descosidos</strong> hasta especialidades en taller propio como <strong>prendas delicadas, prendas de piel, bordados personalizados, servicio express y confección de cortinas, estores y cojines</strong>.
              </p>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <strong>Dónde atendemos:</strong> taller propio in situ en <strong>Gregorio Espino</strong> y <strong>Venezuela</strong>, recepción y derivación en <strong>Navia</strong>, y puntos colaboradores con costura en{' '}
                <strong>
                  {puntosColaboradoresCostura
                    .map((p) => `${p.localidad} (${p.nombre_comercio})`)
                    .join(', ')}
                </strong>
                .
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
                  <span>Ver los 18 arreglos y talleres</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              )}

              <a
                href={CONTACT_INFO.whatsappArreglosHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick('/#servicios', 'services_featured_costura', {
                    service_id: 'costura_arreglos',
                  })
                }
                className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Consultar mi arreglo con Mimo</span>
              </a>
            </div>
          </div>
        </div>

        {/* FAMILIAS 03 Y 04: LIMPIEZA PROFESIONAL Y ALOJAMIENTOS TURÍSTICOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
          {/* Familia 03: Limpieza Profesional */}
          <article className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-8 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] uppercase tracking-wider mb-2">
                <Building2 className="w-4 h-4" aria-hidden="true" />
                <span>{RESUMEN_FAMILIAS_EXTENDIDAS_PORTADA.limpiezaProfesional.badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-2">
                {RESUMEN_FAMILIAS_EXTENDIDAS_PORTADA.limpiezaProfesional.titulo}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                {RESUMEN_FAMILIAS_EXTENDIDAS_PORTADA.limpiezaProfesional.descripcion}
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 mb-6">
                {RESUMEN_FAMILIAS_EXTENDIDAS_PORTADA.limpiezaProfesional.puntos.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <a
                href={RESUMEN_FAMILIAS_EXTENDIDAS_PORTADA.limpiezaProfesional.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick('/#servicios', 'service_card', {
                    service_id: 'limpieza_profesional',
                  })
                }
                className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Pedir presupuesto</span>
              </a>

              {onNavigate && (
                <div className="flex flex-wrap gap-3">
                  {RESUMEN_FAMILIAS_EXTENDIDAS_PORTADA.limpiezaProfesional.enlaces.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => onNavigate(link.href, e)}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 hover:text-[#0F76BB]"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#0F76BB]" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>

          {/* Familia 04: Gestión de Alojamientos Turísticos */}
          <article className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-8 flex flex-col justify-between shadow-2xs">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>{RESUMEN_FAMILIAS_EXTENDIDAS_PORTADA.alojamientosTuristicos.badge}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-2">
                {RESUMEN_FAMILIAS_EXTENDIDAS_PORTADA.alojamientosTuristicos.titulo}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                {RESUMEN_FAMILIAS_EXTENDIDAS_PORTADA.alojamientosTuristicos.descripcion}
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 mb-6">
                {RESUMEN_FAMILIAS_EXTENDIDAS_PORTADA.alojamientosTuristicos.puntos.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <a
                href={RESUMEN_FAMILIAS_EXTENDIDAS_PORTADA.alojamientosTuristicos.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick('/#servicios', 'service_card', {
                    service_id: 'alojamientos_turisticos',
                  })
                }
                className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Consultar para alojamientos</span>
              </a>

              {onNavigate && (
                <div className="flex flex-wrap gap-3">
                  {RESUMEN_FAMILIAS_EXTENDIDAS_PORTADA.alojamientosTuristicos.enlaces.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => onNavigate(link.href, e)}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 hover:text-[#0F76BB]"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#0F76BB]" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        </div>

        {/* Bloque de consulta de precios directa a Mimo por WhatsApp (Cero tarifas públicas) */}
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
                ¿Quieres consultar la tarifa para una prenda, sofá, alfombra o arreglo?
              </h3>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Cada encargo se valora según tejido, dimensiones y tratamiento necesario. Selecciona una consulta rápida o escribe directamente tu prenda para hablar con Mimo por WhatsApp:
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {PRENDAS_CONSULTA_RAPIDA.map((item) => (
                  <a
                    key={item.label}
                    href={buildMimoWhatsAppUrl(
                      `Hola, Mimo. Quiero consultar la tarifa para ${item.prenda}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick('/#servicios', 'pricing_quick_query')
                    }
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
                  Pregunta por una prenda o servicio concreto:
                </label>
                <input
                  id="prenda-consulta-input"
                  type="text"
                  value={prendaPersonalizada}
                  onChange={(e) => setPrendaPersonalizada(e.target.value)}
                  placeholder="Ej.: sofá chaise longue, cortinas de salón, vestido..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white text-slate-900 text-sm font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-[#60B5F6] focus:outline-hidden transition-colors"
                />
                <a
                  href={customPrendaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick('/#servicios', 'pricing_custom_query')
                  }
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3.5 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Consultar tarifa con Mimo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
