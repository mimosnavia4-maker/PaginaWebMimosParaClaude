import React, { useState } from 'react';
import { MessageCircle, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import {
  CONTACT_INFO,
  IMAGES,
  PACKS_APARTAMENTOS_BORRADOR,
} from '../data/mimosData';

interface B2BApartmentsSectionProps {
  onNavigate?: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const B2BApartmentsSection: React.FC<B2BApartmentsSectionProps> = ({ onNavigate }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="empresas"
      aria-labelledby="b2b-heading"
      className="py-16 lg:py-24 bg-[#002147] text-white border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-14">
          {/* Left Column (7 cols): Segunda Gran Línea de Negocio (Sección 3.B y 7.6) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 text-[#60B5F6] text-xs font-mono uppercase tracking-wider font-bold">
              <span>Línea 2 · Limpieza Profesional, Apartamentos Turísticos y Empresas</span>
            </div>

            <h2
              id="b2b-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight"
            >
              Empresa de limpieza en Vigo, apartamentos turísticos y lavandería para empresas
            </h2>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              Además de nuestra actividad de tintorería y lavandería, en <strong>Tintorería Mimos Navia</strong> ofrecemos servicios de limpieza profesional y mantenimiento textil para propietarios y gestores de apartamentos turísticos, viviendas, oficinas, locales y empresas en Vigo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-base font-bold text-[#60B5F6] mb-1.5">
                  Apartamentos turísticos y vacacionales
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Lavado y planchado profesional de ropa de cama y toallas, cuidado de edredones y cortinas, y soluciones de puesta a punto entre huéspedes.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                <h3 className="text-base font-bold text-[#60B5F6] mb-1.5">
                  Viviendas, oficinas y empresas en Vigo
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Lavandería para negocios y hostelería, junto con servicios de limpieza profesional en Vigo sujetos a valoración y presupuesto personalizado.
                </p>
              </div>
            </div>

            {/* Botones de Acción (Sección 4 y 7.6) */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href={CONTACT_INFO.whatsappApartamentosHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-5 sm:px-6 py-4 rounded-xl transition-colors text-center sm:whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Solicitar presupuesto con Mimo</span>
              </a>

              {onNavigate && (
                <a
                  href="/limpieza-profesional-vigo"
                  onClick={(e) => onNavigate('/limpieza-profesional-vigo', e)}
                  className="inline-flex items-center justify-center gap-2 bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm sm:text-base px-5 sm:px-6 py-4 rounded-xl transition-colors text-center sm:whitespace-nowrap shrink-0"
                >
                  <span>Ver página de Limpieza Profesional</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              )}

              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white font-bold text-sm sm:text-base px-5 py-4 rounded-xl transition-colors text-center sm:whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-[#60B5F6] shrink-0" aria-hidden="true" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#071936]">
              {!imgError ? (
                <div className="aspect-4/3 w-full overflow-hidden">
                  <img
                    src={IMAGES.b2bApartamentos}
                    alt="Ropa de cama blanca y toallas higienizadas por Tintorería Mimos para apartamentos turísticos en Vigo"
                    width={800}
                    height={600}
                    loading="lazy"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}

              <div className="p-5 sm:p-6">
                <p className="text-xs font-mono uppercase tracking-wider text-[#60B5F6] mb-1">
                  PRESUPUESTOS A MEDIDA · SIN TARIFAS ESTÁNDAR CERRADAS
                </p>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Adaptamos la propuesta al número de inmuebles, rotación de reservas, volumen de textil o necesidades de tu negocio en Vigo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Tarjetas de Modalidades de Apartamentos Turísticos (Sección 3.B y 7.6 — sin precios cerrados) */}
        <div className="pt-10 border-t border-white/15">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-[#60B5F6] font-bold">
                Propuesta para alojamientos turísticos en Vigo
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Modalidades de servicio para apartamentos turísticos
              </h3>
            </div>
            {onNavigate && (
              <a
                href="/limpieza-apartamentos-turisticos-vigo"
                onClick={(e) => onNavigate('/limpieza-apartamentos-turisticos-vigo', e)}
                className="text-xs sm:text-sm font-bold text-[#60B5F6] hover:underline"
              >
                Ver ficha completa para apartamentos turísticos →
              </a>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKS_APARTAMENTOS_BORRADOR.map((pack) => (
              <div
                key={pack.id}
                className="rounded-2xl border border-white/15 bg-white/5 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="inline-block text-[11px] font-mono bg-white/10 text-[#60B5F6] border border-white/15 px-2.5 py-1 rounded-md mb-3">
                    {pack.estado}
                  </span>
                  <h4 className="text-lg font-extrabold text-white mb-2">{pack.nombre}</h4>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-4">
                    {pack.descripcion}
                  </p>
                  <ul className="space-y-2 text-xs text-slate-200 mb-6">
                    {pack.incluye.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href={pack.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Solicitar presupuesto con Mimo</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
