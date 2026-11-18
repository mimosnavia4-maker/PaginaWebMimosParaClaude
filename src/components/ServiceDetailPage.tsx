import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from 'lucide-react';
import {
  ServicioMimos,
  SERVICIOS_MIMOS,
  SERVICIO_DETALLE_ENRIQUECIDO,
  TIENDAS_PROPIAS,
  PUNTOS_COLABORADORES,
  PUNTOS_CON_COSTURA,
  CONTACT_INFO,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackWhatsAppClick, trackPhoneClick } from '../utils/analytics';
import { HomePickupSection } from './HomePickupSection';

interface ServiceDetailPageProps {
  servicio: ServicioMimos;
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  servicio,
  onNavigate,
}) => {
  const detalle = SERVICIO_DETALLE_ENRIQUECIDO[servicio.id];
  const otrosServicios = SERVICIOS_MIMOS.filter((s) => s.id !== servicio.id);

  const [selectedOpcion, setSelectedOpcion] = useState<string>(
    detalle?.consultaOpciones[0] ?? ''
  );
  const [notaConsulta, setNotaConsulta] = useState<string>('');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  useEffect(() => {
    setSelectedOpcion(detalle?.consultaOpciones[0] ?? '');
    setNotaConsulta('');
    setOpenFaqIdx(0);
  }, [servicio.id, detalle]);

  const consultaWhatsAppMessage = (() => {
    if (!detalle) return servicio.whatsappMensaje;
    const lines = [
      `Hola, Mimo. Quiero consultar sobre ${servicio.titulo.toLowerCase()}.`,
      `Opción: ${selectedOpcion || detalle.consultaOpciones[0]}`,
    ];
    if (notaConsulta.trim()) {
      lines.push(`Detalles de mis prendas: ${notaConsulta.trim()}`);
    }
    lines.push('¿Podéis orientarme sobre el tratamiento y el precio?');
    return lines.join('\n');
  })();

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="focus:outline-hidden bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800"
    >
      {/* 1. Cabecera del Servicio */}
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

          <div className="max-w-4xl space-y-5">
            <p className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[#60B5F6] font-bold">
              {detalle ? detalle.badgeSuperior : `SERVICIO ${servicio.index} · TINTORERÍA MIMOS NAVIA (VIGO)`}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] text-balance">
              {servicio.h1}
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl">
              {servicio.descripcion}
            </p>

            {detalle?.aclaracionHonesta && (
              <div className="p-4 sm:p-5 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-slate-100 leading-relaxed flex items-start gap-3 max-w-3xl">
                <Info className="w-5 h-5 text-[#60B5F6] shrink-0 mt-0.5" aria-hidden="true" />
                <p>{detalle.aclaracionHonesta}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href={servicio.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick(servicio.url, 'service_detail', {
                    service_id: servicio.id,
                  })
                }
                className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>{servicio.ctaTexto}</span>
              </a>

              <a
                href={CONTACT_INFO.phoneHref}
                onClick={() => trackPhoneClick(servicio.url, 'service_detail')}
                className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white font-bold text-sm sm:text-base px-5 py-4 rounded-xl transition-colors whitespace-nowrap tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#60B5F6] shrink-0" aria-hidden="true" />
                <span>Llamar al {CONTACT_INFO.phoneDisplay}</span>
              </a>

              {detalle && (
                <button
                  type="button"
                  onClick={() => scrollToElement('preguntas-frecuentes-servicio')}
                  className="inline-flex items-center justify-center gap-2 text-slate-200 hover:text-white font-bold text-sm px-4 py-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <HelpCircle className="w-4 h-4 text-[#60B5F6] shrink-0" aria-hidden="true" />
                  <span>Ver dudas frecuentes</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Modalidades / Técnicas reales diferenciadas (si aplica) */}
      {detalle && (
        <section className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 space-y-2">
              <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Técnicas y modalidades de atención
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                {detalle.modalidadesTitulo}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {detalle.modalidadesSubtitulo}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {detalle.modalidades.map((mod) => (
                <article
                  key={mod.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6] mb-1.5">
                        {mod.etiqueta}
                      </p>
                      <h3 className="text-xl font-extrabold text-[#002147] dark:text-white leading-snug">
                        {mod.titulo}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {mod.descripcion}
                    </p>

                    <ul className="space-y-2.5 pt-2 border-t border-slate-200/80 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                      {mod.puntos.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 mt-6 border-t border-slate-200/80 dark:border-slate-700/60">
                    <a
                      href={buildMimoWhatsAppUrl(mod.whatsappEjemplo)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackWhatsAppClick(servicio.url, 'service_modality_card', {
                          service_id: `${servicio.id}:${mod.id}`,
                        })
                      }
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#178A47] dark:text-[#4ade80] hover:underline"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Consultar esta modalidad con Mimo</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Proceso paso a paso en planta + Consejos prácticos */}
      {detalle && (
        <section className="py-14 lg:py-20 bg-[#F4F7FB] dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-2">
              <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Cómo trabajamos en nuestras instalaciones de Navia (Vigo)
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                {detalle.procesoTitulo}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {detalle.procesoSubtitulo}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {detalle.procesoPasos.map((paso) => (
                <article
                  key={paso.numero}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 space-y-3"
                >
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[#002147] dark:bg-[#0F76BB] text-white font-mono text-sm font-bold tabular-nums">
                    {paso.numero}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#002147] dark:text-white leading-snug">
                    {paso.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {paso.descripcion}
                  </p>
                </article>
              ))}
            </div>

            <div className="rounded-2xl bg-[#002147] text-white p-6 sm:p-8 border border-white/10">
              <div className="flex items-start gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-[#60B5F6] shrink-0 mt-0.5" aria-hidden="true" />
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {detalle.consejosTitulo}
                </h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {detalle.consejos.map((consejo) => (
                  <li
                    key={consejo}
                    className="rounded-xl bg-white/10 border border-white/15 p-4 text-xs sm:text-sm text-slate-100 leading-relaxed flex items-start gap-2.5"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{consejo}</span>
                  </li>
                ))}
              </ul>
            </div>

            {detalle.comparativaTabla && (
              <div className="space-y-4 pt-2">
                <div className="max-w-3xl space-y-1.5">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                    {detalle.comparativaTabla.titulo}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                    {detalle.comparativaTabla.subtitulo}
                  </p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] shadow-2xs">
                  <table className="w-full min-w-[680px] text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#002147] text-white">
                        <th scope="col" className="p-4 font-extrabold border-b border-white/15 w-[22%]">
                          Criterio técnico y operativo
                        </th>
                        <th scope="col" className="p-4 font-extrabold border-b border-white/15 bg-[#0F76BB] text-white w-[28%]">
                          {detalle.comparativaTabla.columnas[0]}
                        </th>
                        <th scope="col" className="p-4 font-bold border-b border-white/15 w-[25%]">
                          {detalle.comparativaTabla.columnas[1]}
                        </th>
                        <th scope="col" className="p-4 font-bold border-b border-white/15 w-[25%]">
                          {detalle.comparativaTabla.columnas[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {detalle.comparativaTabla.filas.map((fila) => (
                        <tr key={fila.criterio} className="align-top">
                          <th scope="row" className="p-4 font-extrabold text-[#002147] dark:text-white bg-slate-50/70 dark:bg-[#0b1d36]">
                            {fila.criterio}
                          </th>
                          <td className="p-4 font-medium text-slate-800 dark:text-slate-100 bg-[#0F76BB]/5 dark:bg-[#0F76BB]/10">
                            {fila.valores[0]}
                          </td>
                          <td className="p-4 text-slate-600 dark:text-slate-300">
                            {fila.valores[1]}
                          </td>
                          <td className="p-4 text-slate-600 dark:text-slate-300">
                            {fila.valores[2]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 4. Detalle: Qué tratamos + Cómo contratar / Consultor interactivo con Mimo */}
      <section className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-6 sm:p-8">
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

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1d36] p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-4">
                  ¿Cómo puedes contratarlo?
                </h2>
                <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
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
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-[#002147]/15 dark:border-slate-700 bg-[#002147] text-white p-6 sm:p-8 space-y-5">
              {detalle ? (
                <>
                  <div className="space-y-1.5">
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#60B5F6]">
                      Atención inmediata · WhatsApp {CONTACT_INFO.whatsappNumber}
                    </p>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                      Consulta el precio o condiciones con Mimo
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      Sin tarifas genéricas descontextualizadas: dinos qué necesitas y Mimo te orienta antes de venir o coordinar recogida.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="service-consulta-select"
                        className="block text-xs font-bold text-slate-200 mb-1.5"
                      >
                        {detalle.consultaOpcionesLabel}
                      </label>
                      <select
                        id="service-consulta-select"
                        value={selectedOpcion}
                        onChange={(e) => setSelectedOpcion(e.target.value)}
                        className="w-full rounded-xl bg-white text-slate-900 px-3.5 py-2.5 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#60B5F6]"
                      >
                        {detalle.consultaOpciones.map((op) => (
                          <option key={op} value={op}>
                            {op}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="service-consulta-notes"
                        className="block text-xs font-bold text-slate-200 mb-1.5"
                      >
                        Prendas, cantidad o barrio (opcional)
                      </label>
                      <textarea
                        id="service-consulta-notes"
                        rows={2}
                        value={notaConsulta}
                        onChange={(e) => setNotaConsulta(e.target.value)}
                        placeholder={detalle.consultaPlaceholder}
                        className="w-full rounded-xl bg-white text-slate-900 px-3.5 py-2.5 text-sm placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#60B5F6]"
                      />
                    </div>
                  </div>

                  <a
                    href={buildMimoWhatsAppUrl(consultaWhatsAppMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick(servicio.url, 'service_detail_builder', {
                        service_id: servicio.id,
                      })
                    }
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm py-3.5 px-4 rounded-xl transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Enviar consulta por WhatsApp a Mimo</span>
                  </a>
                </>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Nuestro asistente <strong>Mimo</strong> te indica las condiciones al instante por WhatsApp según tus prendas y zona:
                  </p>
                  <a
                    href={servicio.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick(servicio.url, 'service_detail_secondary', {
                        service_id: servicio.id,
                      })
                    }
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm py-3.5 px-4 rounded-xl transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>{servicio.ctaTexto}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Destacado a página propia de Vestidos de Novia, Fiesta y Ceremonia dentro de Tintorería */}
      {servicio.id === 'tintoreria-profesional' && (
        <section className="py-10 bg-slate-50 dark:bg-[#0b1d36] border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-[#0F76BB]/30 bg-white dark:bg-[#071324] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs sm:text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  Sección especializada · Ceremonia y celebración
                </p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white">
                  ¿Buscas limpieza de vestidos de novia, madrina, fiesta o comunión?
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Consulta nuestro protocolo específico en 5 fases para revisión de pedrería y encajes, tratamiento de bajos rozados, coordinación con costura propia y entrega en funda protectora transpirable.
                </p>
              </div>
              <a
                href="/limpieza-vestidos-novia-ceremonia-vigo"
                onClick={(e) => onNavigate('/limpieza-vestidos-novia-ceremonia-vigo', e)}
                className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0F76BB] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <span>Ver especialidad en novia y ceremonia</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Bloque boda en Tintorería */}

      {/* Destacado desde Solo Planchado hacia puesta a punto previa a bodas, comuniones y eventos */}
      {servicio.id === 'planchado-profesional' && (
        <section className="py-10 bg-slate-50 dark:bg-[#0b1d36] border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-[#0F76BB]/30 bg-white dark:bg-[#071324] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs sm:text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  Puesta a punto previa a celebración
                </p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white">
                  ¿Necesitas vaporizar un vestido de novia, invitada, comunión o chaqué antes del evento?
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Quitamos arrugas de viaje o portatrajes, revisamos costuras y preparamos tejidos delicados (tul, seda, gasa, lino o lana fría) sin brillos antes de la ceremonia o sesión de fotos.
                </p>
              </div>
              <a
                href="/limpieza-vestidos-novia-ceremonia-vigo#planchado-antes-evento"
                onClick={(e) => onNavigate('/limpieza-vestidos-novia-ceremonia-vigo', e)}
                className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0F76BB] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <span>Ver planchado pre-evento de ceremonia</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Si es la página de recogida a domicilio, mostramos el formulario interactivo */}
      {servicio.id === 'recogida-a-domicilio' && (
        <HomePickupSection onNavigate={onNavigate} />
      )}

      {/* Micro-bloque puente limpio hacia Empresas (solo al final antes de FAQs, sin ensuciar el embudo B2C superior) */}
      {servicio.id === 'lavanderia-profesional' && (
        <section className="py-10 bg-slate-50 dark:bg-[#0b1d36] border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-[#0F76BB]/30 bg-white dark:bg-[#071324] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs sm:text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  Sección exclusiva para negocios y autónomos en Vigo
                </p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white">
                  ¿Buscas lavandería profesional para tu negocio en Vigo?
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Si gestionas una peluquería, clínica, comercio o pequeño lote de cocina y necesitas lavado de toallas, batas o uniformes propios en carros separados y con factura mensual con CIF, consulta nuestra página exclusiva para empresas.
                </p>
              </div>
              <a
                href="/servicios-empresas"
                onClick={(e) => onNavigate('/servicios-empresas', e)}
                className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0F76BB] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <span>Ir a lavandería para empresas</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 5. Preguntas frecuentes (sincronizadas 1:1 con JSON-LD FAQPage) */}
      {detalle && detalle.preguntasFrecuentes.length > 0 && (
        <section
          id="preguntas-frecuentes-servicio"
          aria-labelledby="faq-servicio-heading"
          className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 space-y-4">
                <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  Dudas frecuentes · {servicio.titulo}
                </p>
                <h2
                  id="faq-servicio-heading"
                  className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance"
                >
                  Respuestas claras antes de entregar tus prendas
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Si prefieres orientarte al momento con una foto de la etiqueta o de la mancha, habla directamente con Mimo por WhatsApp.
                </p>
                <a
                  href={servicio.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick(servicio.url, 'service_faq_cta', {
                      service_id: servicio.id,
                    })
                  }
                  className="inline-flex items-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Preguntar por WhatsApp</span>
                </a>
              </div>

              <div className="lg:col-span-7 divide-y divide-slate-200 dark:divide-slate-800 border-t border-b border-slate-200 dark:border-slate-800">
                {detalle.preguntasFrecuentes.map((faq, idx) => {
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

                      {isOpen && (
                        <div className="pt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {faq.respuesta}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. Especialidades relacionadas y guías */}
      {detalle && detalle.enlacesEspecializados.length > 0 && (
        <section className="py-12 bg-[#F4F7FB] dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-6">
              Servicios y guías relacionadas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {detalle.enlacesEspecializados.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => onNavigate(link.href, e)}
                  className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-5 flex flex-col justify-between hover:border-[#0F76BB] transition-colors"
                >
                  <div className="space-y-2 mb-4">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#002147] dark:text-white group-hover:text-[#0F76BB] transition-colors">
                      {link.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {link.descripcion}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                    <span>{link.cta}</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Resumen de Tiendas Propias y Puntos Colaboradores */}
      <section className="py-12 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#002147] dark:text-white">
                Dónde entregar tus prendas: {TIENDAS_PROPIAS.length} tiendas propias en Vigo y{' '}
                {PUNTOS_COLABORADORES.length} puntos colaboradores
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                Atención directa en nuestras {TIENDAS_PROPIAS.length} tiendas propias de Vigo, recepción y entrega en puntos colaboradores (con tratamiento en nuestras instalaciones de Mimos Navia) o recogida a domicilio consultando con Mimo.
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
                  {t.id === 'rua-venezuela' ? ' (Santiago de Vigo · entorno Urzáiz / Gran Vía / El Corte Inglés)' : ''}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t.horario.resumen}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <strong>Puntos de recogida y entrega en establecimientos colaboradores independientes</strong> (reciben tus prendas y textiles para su tratamiento por Tintorería Mimos en Vigo):{' '}
            {PUNTOS_COLABORADORES.map((p) => `${p.localidad} (${p.nombre_comercio}, ${p.direccion})`).join(' · ')}. Los puntos colaboradores de{' '}
            {PUNTOS_CON_COSTURA.filter((p) => p.tipo === 'punto')
              .map((p) => `${p.localidad} (${p.nombre_comercio})`)
              .join(', ')}{' '}
            cuentan además con servicio confirmado de costura y arreglos de ropa.
          </p>
        </div>
      </section>

      {/* 8. Otros servicios */}
      <section className="py-12">
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
