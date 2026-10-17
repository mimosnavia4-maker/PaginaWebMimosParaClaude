import React from 'react';
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  CheckCircle2,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import {
  ServicioMimos,
  SERVICIOS_MIMOS,
  TIENDAS_PROPIAS,
  PUNTOS_COLABORADORES,
  CONTACT_INFO,
} from '../data/mimosData';
import { HomePickupSection } from './HomePickupSection';

interface ServiceDetailPageProps {
  servicio: ServicioMimos;
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  servicio,
  onNavigate,
}) => {
  const otrosServicios = SERVICIOS_MIMOS.filter((s) => s.id !== servicio.id);

  return (
    <main className="bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
      {/* Cabecera del Servicio */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#002147] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Migas de pan" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-300">
              <li>
                <a
                  href="/"
                  onClick={(e) => onNavigate('/', e)}
                  className="hover:text-white underline-offset-4 hover:underline"
                >
                  Inicio
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a
                  href="/#servicios"
                  onClick={(e) => onNavigate('/#servicios', e)}
                  className="hover:text-white underline-offset-4 hover:underline"
                >
                  Servicios
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#60B5F6] font-semibold">{servicio.titulo}</li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-5">
            <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#60B5F6] font-bold">
              SERVICIO {servicio.index} · TINTORERÍA MIMOS NAVIA (VIGO)
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
              {servicio.h1}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              {servicio.descripcion}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href={servicio.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>{servicio.ctaTexto}</span>
              </a>
              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white font-bold text-sm sm:text-base px-5 py-4 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4 text-[#60B5F6]" aria-hidden="true" />
                <span>Llamar al {CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Detalle: Qué tratamos y Cómo se contrata */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-4">
                ¿Qué prendas y artículos incluye este servicio?
              </h2>
              <ul className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-200">
                {servicio.queTratamos.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1d36] p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-4">
                  ¿Cómo puedes contratarlo y consultar el precio?
                </h2>
                <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-300 mb-6">
                  {servicio.comoSeContrata.map((paso, idx) => (
                    <li key={paso} className="flex items-start gap-2.5">
                      <span className="font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                        0{idx + 1}.
                      </span>
                      <span>{paso}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-4 rounded-xl bg-[#002147] text-white space-y-3">
                <p className="text-xs sm:text-sm text-slate-200">
                  Nuestro asistente <strong>Mimo</strong> te indica el precio al instante por WhatsApp según las prendas que necesites tratar:
                </p>
                <a
                  href={servicio.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm py-3 px-4 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>{servicio.ctaTexto}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Si es la página de recogida a domicilio, mostramos el formulario interactivo */}
      {servicio.id === 'recogida-a-domicilio' && (
        <HomePickupSection onNavigate={onNavigate} />
      )}

      {/* Resumen de Tiendas Propias y Puntos Colaboradores */}
      <section className="py-12 bg-slate-50 dark:bg-[#0a1b33] border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#002147] dark:text-white">
                Dónde entregar tus prendas: 3 tiendas propias en Vigo y 5 puntos colaboradores
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Atención directa en nuestras 3 tiendas propias de Vigo, recepción y entrega en puntos colaboradores (con tratamiento en nuestras instalaciones de Mimos Navia) o recogida a domicilio consultando con Mimo.
              </p>
            </div>
            <a
              href="/puntos-mimos"
              onClick={(e) => onNavigate('/puntos-mimos', e)}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline shrink-0"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Ver mapa y horarios completos</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {TIENDAS_PROPIAS.map((t) => (
              <div
                key={t.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-5"
              >
                <span className="inline-block text-[11px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#002147] text-white mb-2">
                  Tienda propia Mimos · {t.localidad}
                </span>
                <h3 className="text-base font-bold text-[#002147] dark:text-white">
                  {t.nombre_mostrado}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {t.direccion} · {t.codigo_postal} {t.localidad}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t.horario.resumen}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>Puntos de recogida y entrega en establecimientos colaboradores independientes</strong> (reciben tus prendas y textiles para su tratamiento por Tintorería Mimos en Vigo):{' '}
            {PUNTOS_COLABORADORES.map((p) => `${p.localidad} (${p.direccion})`).join(' · ')}. Los puntos de Gondomar, Ponteareas y O Porriño cuentan además con servicio confirmado de costura y arreglos de ropa.
          </p>
        </div>
      </section>

      {/* Otros servicios */}
      <section className="py-12 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold text-[#002147] dark:text-white mb-4">
            Otros servicios de Tintorería Mimos Navia
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {otrosServicios.map((s) => (
              <a
                key={s.id}
                href={s.url}
                onClick={(e) => onNavigate(s.url, e)}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB] bg-slate-50/60 dark:bg-[#0b1d36] flex items-center justify-between gap-2 transition-colors"
              >
                <span className="text-xs sm:text-sm font-bold text-[#002147] dark:text-white">
                  {s.index}. {s.titulo}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
              </a>
            ))}
          </div>

          <a
            href="/"
            onClick={(e) => onNavigate('/', e)}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#002147] dark:text-slate-200 hover:text-[#0F76BB]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Volver a la portada de Tintorería Mimos Navia</span>
          </a>
        </div>
      </section>
    </main>
  );
};
