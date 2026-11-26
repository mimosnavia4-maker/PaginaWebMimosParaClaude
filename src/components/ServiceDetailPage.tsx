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
import { SERVICIO_DETALLE_ENRIQUECIDO } from '../data/servicePagesData';
import {
  ServicioMimos,
  SERVICIOS_MIMOS,
  TIENDAS_PROPIAS,
  PUNTOS_COLABORADORES,
  PUNTOS_CON_COSTURA,
  CONTACT_INFO,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackWhatsAppClick, trackPhoneClick } from '../utils/analytics';
import { HomePickupSection } from './HomePickupSection';
import { PageHeroLight } from './PageHeroLight';

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
      className="focus:outline-hidden bg-white text-slate-900 border-b border-slate-200"
    >
      {/* 1. Cabecera luminosa */}
      <PageHeroLight
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Servicios', href: '/#servicios' },
          { label: servicio.titulo },
        ]}
        onNavigate={onNavigate}
        kicker={
          detalle
            ? detalle.badgeSuperior
            : `Servicio ${servicio.index} · Tintorería Mimos Navia (Vigo)`
        }
        title={servicio.h1}
        description={servicio.descripcion}
        note={
          detalle?.aclaracionHonesta ? (
            <span className="flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5" aria-hidden="true" />
              <span>{detalle.aclaracionHonesta}</span>
            </span>
          ) : undefined
        }
        whatsappHref={servicio.whatsappUrl}
        whatsappLabel={servicio.ctaTexto}
        onWhatsAppClick={() =>
          trackWhatsAppClick(servicio.url, 'service_detail', {
            service_id: servicio.id,
          })
        }
        secondaryAction={{
          label: `Llamar al ${CONTACT_INFO.phoneDisplay}`,
          href: CONTACT_INFO.phoneHref,
          icon: <Phone className="w-4 h-4 text-[#0C65A1] group-hover:text-white" aria-hidden="true" />,
          isInternalRoute: false,
        }}
        extraContent={
          detalle ? (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => scrollToElement('preguntas-frecuentes-servicio')}
                className="inline-flex items-center gap-2 min-h-[44px] text-sm font-bold text-[#0C65A1] hover:text-[#002147] underline-offset-4 hover:underline cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Ver dudas frecuentes sobre este servicio</span>
              </button>
            </div>
          ) : undefined
        }
      />

      {/* 2. Modalidades / Técnicas reales diferenciadas */}
      {detalle && (
        <section className="py-12 lg:py-18 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 space-y-2">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
                Técnicas y modalidades de atención
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                {detalle.modalidadesTitulo}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {detalle.modalidadesSubtitulo}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {detalle.modalidades.map((mod) => (
                <article
                  key={mod.id}
                  className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1] mb-1.5">
                        {mod.etiqueta}
                      </p>
                      <h3 className="text-xl font-extrabold text-[#002147] leading-snug">
                        {mod.titulo}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {mod.descripcion}
                    </p>

                    <ul className="space-y-2.5 pt-3 border-t border-slate-200 text-xs sm:text-sm text-slate-700">
                      {mod.puntos.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 mt-6 border-t border-slate-200">
                    <a
                      href={buildMimoWhatsAppUrl(mod.whatsappEjemplo)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackWhatsAppClick(servicio.url, 'service_modality_card', {
                          service_id: `${servicio.id}:${mod.id}`,
                        })
                      }
                      className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg bg-[#1FA855] hover:bg-[#25B860] text-[#002147] text-xs sm:text-sm font-bold transition-colors"
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

      {/* 3. Proceso paso a paso en planta + Consejos prácticos + Comparativa */}
      {detalle && (
        <section className="py-12 lg:py-18 bg-[#F7F6F2] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
                Cómo trabajamos en nuestras instalaciones de Navia (Vigo)
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                {detalle.procesoTitulo}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {detalle.procesoSubtitulo}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {detalle.procesoPasos.map((paso) => (
                <article
                  key={paso.numero}
                  className="rounded-xl border border-slate-200 bg-white p-6 space-y-2.5"
                >
                  <p className="text-xs font-mono font-bold text-[#0C65A1] tabular-nums">
                    PASO {paso.numero}
                  </p>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#002147] leading-snug">
                    {paso.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {paso.descripcion}
                  </p>
                </article>
              ))}
            </div>

            <div className="rounded-xl border border-[#0F76BB]/25 border-t-4 border-t-[#0F76BB] bg-[#EDF5FD] p-6 sm:p-8">
              <div className="flex items-start gap-3 mb-4">
                <Sparkles className="w-5 h-5 text-[#0C65A1] shrink-0 mt-0.5" aria-hidden="true" />
                <h3 className="text-lg sm:text-xl font-extrabold text-[#002147]">
                  {detalle.consejosTitulo}
                </h3>
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {detalle.consejos.map((consejo) => (
                  <li
                    key={consejo}
                    className="rounded-lg bg-white border border-slate-200 p-4 text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-2.5"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5"
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
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                    {detalle.comparativaTabla.titulo}
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600">
                    {detalle.comparativaTabla.subtitulo}
                  </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-2xs">
                  <table className="w-full min-w-[680px] text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#EDF5FD] text-[#002147] border-b border-slate-200">
                        <th scope="col" className="p-4 font-extrabold w-[22%]">
                          Criterio técnico y operativo
                        </th>
                        <th scope="col" className="p-4 font-extrabold bg-[#DCEBFA] text-[#002147] w-[28%]">
                          {detalle.comparativaTabla.columnas[0]}
                        </th>
                        <th scope="col" className="p-4 font-bold w-[25%]">
                          {detalle.comparativaTabla.columnas[1]}
                        </th>
                        <th scope="col" className="p-4 font-bold w-[25%]">
                          {detalle.comparativaTabla.columnas[2]}
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {detalle.comparativaTabla.filas.map((fila) => (
                        <tr key={fila.criterio} className="align-top">
                          <th scope="row" className="p-4 font-extrabold text-[#002147] bg-[#F7F6F2]">
                            {fila.criterio}
                          </th>
                          <td className="p-4 font-medium text-slate-800 bg-[#F4F9FE]">
                            {fila.valores[0]}
                          </td>
                          <td className="p-4 text-slate-600">
                            {fila.valores[1]}
                          </td>
                          <td className="p-4 text-slate-600">
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

      {/* 4. Detalle: Qué tratamos + Cómo contratar + Consultor interactivo */}
      <section className="py-12 lg:py-18 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] mb-4">
                  ¿Qué prendas y artículos incluye este servicio?
                </h2>
                <ul className="space-y-3 text-sm sm:text-base text-slate-700">
                  {servicio.queTratamos.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2
                        className="w-5 h-5 text-[#0C65A1] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] mb-4">
                  ¿Cómo puedes contratarlo?
                </h2>
                <ol className="space-y-3 text-sm text-slate-600">
                  {servicio.comoSeContrata.map((paso, idx) => (
                    <li key={paso} className="flex items-start gap-2.5">
                      <span className="font-mono font-bold text-[#0C65A1] tabular-nums">
                        0{idx + 1}.
                      </span>
                      <span>{paso}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-6 sm:p-8 space-y-3">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#002147]">
                  ¿De qué depende el presupuesto y qué enviar por WhatsApp a Mimo?
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  No aplicamos tarifas genéricas sin ver la prenda: el importe exacto depende de la composición del tejido, el tratamiento indicado en etiqueta (seco, Wet Cleaning o acabado técnico), el tamaño o volumen y si requiere desmanchado especial o recogida a domicilio.
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                  <li>
                    <strong className="text-[#002147]">1. Foto o tipo de prenda/artículo:</strong> muestra el tejido completo y, si hay manchas o rozaduras, un detalle cercano.
                  </li>
                  <li>
                    <strong className="text-[#002147]">2. Etiqueta de composición y cuidado:</strong> ayuda a confirmar tratamiento al instante (o si pide teñido / impermeabilizado).
                  </li>
                  <li>
                    <strong className="text-[#002147]">3. Tienda o zona de entrega:</strong> indícanos si prefieres entregar sin mínimo en tiendas/puntos o consultar ruta a domicilio.
                  </li>
                </ul>
              </div>
            </div>

            <div className="lg:col-span-5 rounded-xl border border-[#0F76BB]/30 border-t-4 border-t-[#0F76BB] bg-[#EDF5FD] p-6 sm:p-8 space-y-5 shadow-xs">
              {detalle ? (
                <>
                  <div className="space-y-1.5">
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
                      Atención inmediata · WhatsApp {CONTACT_INFO.whatsappNumber}
                    </p>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                      Consulta el precio o condiciones con Mimo
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      Sin tarifas genéricas descontextualizadas: dinos qué necesitas y Mimo te orienta antes de venir o coordinar recogida.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label
                        htmlFor="service-consulta-select"
                        className="block text-xs font-bold text-[#002147] mb-1.5"
                      >
                        {detalle.consultaOpcionesLabel}
                      </label>
                      <select
                        id="service-consulta-select"
                        value={selectedOpcion}
                        onChange={(e) => setSelectedOpcion(e.target.value)}
                        className="w-full min-h-[44px] rounded-sm border border-slate-300 bg-white text-slate-900 px-3.5 py-2.5 text-base lg:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
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
                        className="block text-xs font-bold text-[#002147] mb-1.5"
                      >
                        Prendas, cantidad o barrio (opcional)
                      </label>
                      <textarea
                        id="service-consulta-notes"
                        rows={2}
                        value={notaConsulta}
                        onChange={(e) => setNotaConsulta(e.target.value)}
                        placeholder={detalle.consultaPlaceholder}
                        className="w-full rounded-sm border border-slate-300 bg-white text-slate-900 px-3.5 py-2.5 text-base lg:text-sm placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
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
                    className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm py-3 px-4 rounded-lg transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Enviar consulta por WhatsApp a Mimo</span>
                  </a>
                </>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-slate-700 leading-relaxed">
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
                    className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm py-3 px-4 rounded-lg transition-colors shadow-xs"
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

      {/* Destacado a Vestidos de Novia, Fiesta y Ceremonia dentro de Tintorería */}
      {servicio.id === 'tintoreria-profesional' && (
        <section className="py-10 bg-[#EDF5FD] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-[#0F76BB]/30 bg-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
                  Sección especializada · Ceremonia y celebración
                </p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                  ¿Buscas limpieza de vestidos de novia, madrina, fiesta o comunión?
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Consulta nuestro protocolo específico en 5 fases para revisión de pedrería y encajes, tratamiento de bajos rozados, coordinación con costura propia y entrega en funda protectora transpirable.
                </p>
              </div>
              <a
                href="/limpieza-vestidos-novia-ceremonia-vigo"
                onClick={(e) => onNavigate('/limpieza-vestidos-novia-ceremonia-vigo', e)}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-5 py-3 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>Ver especialidad en novia y ceremonia</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Destacado desde Solo Planchado hacia puesta a punto previa a bodas y eventos */}
      {servicio.id === 'planchado-profesional' && (
        <section className="py-10 bg-[#EDF5FD] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-[#0F76BB]/30 bg-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
                  Puesta a punto previa a celebración
                </p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                  ¿Necesitas vaporizar un vestido de novia, invitada, comunión o chaqué antes del evento?
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Quitamos arrugas de viaje o portatrajes, revisamos costuras y preparamos tejidos delicados (tul, seda, gasa, lino o lana fría) sin brillos antes de la ceremonia o sesión de fotos.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="/limpieza-vestidos-novia-ceremonia-vigo#planchado-antes-evento"
                  onClick={(e) =>
                    onNavigate('/limpieza-vestidos-novia-ceremonia-vigo#planchado-antes-evento', e)
                  }
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-5 py-3 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Ver planchado pre-evento de ceremonia</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
                <a
                  href="/colada-familiar-vigo"
                  onClick={(e) => onNavigate('/colada-familiar-vigo', e)}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white border border-slate-300 hover:border-[#0F76BB] text-[#002147] font-bold text-sm px-5 py-3 rounded-lg transition-colors whitespace-nowrap shrink-0"
                >
                  <span>¿Lavar y planchar? Colada familiar</span>
                  <ArrowUpRight className="w-4 h-4 text-[#0C65A1] shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Si es recogida a domicilio, cobertura comarcal y formulario interactivo */}
      {servicio.id === 'recogida-a-domicilio' && (
        <>
          <section className="py-10 bg-[#EDF5FD] border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <div className="max-w-3xl space-y-1.5">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
                  Rutas comarcales y entregas sin mínimo
                </p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                  Consulta las condiciones y puntos físicos por localidad
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  En <strong>Mos</strong> y <strong>Nigrán</strong> no disponemos de tienda física, por lo que trabajamos mediante recogida y entrega a domicilio (sujeta a ruta e importe mínimo) o entrega sin mínimo en los puntos físicos cercanos de O Porriño, Gondomar y Vigo.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {[
                  { label: 'Vigo (3 tiendas propias)', href: '/zonas/vigo' },
                  { label: 'Mos (solo recogida a domicilio)', href: '/zonas/mos' },
                  { label: 'Nigrán (solo recogida a domicilio)', href: '/zonas/nigran' },
                  { label: 'O Porriño (Telas y Más)', href: '/zonas/o-porrino' },
                  { label: 'Gondomar (Puntadas No Aire)', href: '/zonas/gondomar' },
                  { label: 'Redondela (Punto colaborador)', href: '/zonas/redondela' },
                  { label: 'Ponteareas (Arregla2)', href: '/zonas/ponteareas' },
                ].map((z) => (
                  <a
                    key={z.href}
                    href={z.href}
                    onClick={(e) => onNavigate(z.href, e)}
                    className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg border border-slate-200 bg-white hover:border-[#0F76BB] text-xs sm:text-sm font-bold text-[#002147] transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#0C65A1] shrink-0" aria-hidden="true" />
                    <span>{z.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </section>
          <HomePickupSection onNavigate={onNavigate} />
        </>
      )}

      {/* Bloque puente limpio hacia Empresas dentro de Lavandería */}
      {servicio.id === 'lavanderia-profesional' && (
        <section className="py-10 bg-[#EDF5FD] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-[#0F76BB]/30 bg-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
                  Sección exclusiva para negocios y autónomos en Vigo
                </p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                  ¿Buscas lavandería profesional para tu negocio en Vigo?
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Si gestionas una peluquería, clínica, comercio o pequeño lote de cocina y necesitas lavado de toallas, batas o uniformes propios en carros separados y con factura mensual con CIF, consulta nuestra página exclusiva para empresas.
                </p>
              </div>
              <a
                href="/servicios-empresas"
                onClick={(e) => onNavigate('/servicios-empresas', e)}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-5 py-3 rounded-lg transition-colors whitespace-nowrap shrink-0"
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
          className="py-12 lg:py-18 bg-white border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 space-y-4">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
                  Dudas frecuentes · {servicio.titulo}
                </p>
                <h2
                  id="faq-servicio-heading"
                  className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance"
                >
                  Respuestas claras antes de entregar tus prendas
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
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
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm px-5 py-3 rounded-lg transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Preguntar por WhatsApp</span>
                </a>
              </div>

              <div className="lg:col-span-7 divide-y divide-slate-200 border-t border-b border-slate-200">
                {detalle.preguntasFrecuentes.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={faq.pregunta} className="py-4">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full min-h-[44px] text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-[#002147] cursor-pointer py-1"
                      >
                        <span>{faq.pregunta}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#0C65A1] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {isOpen && (
                        <div className="pt-2 pb-1 text-sm text-slate-600 leading-relaxed">
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
        <section className="py-12 bg-[#F7F6F2] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] mb-6">
              Servicios y guías relacionadas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {detalle.enlacesEspecializados.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => onNavigate(link.href, e)}
                  className="group rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between hover:border-[#0F76BB] transition-colors"
                >
                  <div className="space-y-2 mb-4">
                    <h3 className="text-sm sm:text-base font-extrabold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                      {link.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {link.descripcion}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#0C65A1]">
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
      <section className="py-12 bg-[#EDF5FD] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#002147]">
                Dónde entregar tus prendas: {TIENDAS_PROPIAS.length} tiendas propias en Vigo y{' '}
                {PUNTOS_COLABORADORES.length} puntos colaboradores
              </h2>
              <p className="text-sm text-slate-700 mt-1">
                Atención directa en nuestras {TIENDAS_PROPIAS.length} tiendas propias de Vigo, recepción y entrega en puntos colaboradores (con tratamiento en nuestras instalaciones de Mimos Navia) o recogida a domicilio consultando con Mimo.
              </p>
            </div>
            <a
              href="/puntos-mimos"
              onClick={(e) => onNavigate('/puntos-mimos', e)}
              className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold text-[#0C65A1] hover:text-[#002147] hover:underline shrink-0"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Ver mapa y horarios completos</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {TIENDAS_PROPIAS.map((t) => (
              <div
                key={t.id}
                className="rounded-xl border border-slate-200 bg-white p-5"
              >
                <p className="text-xs font-mono font-bold uppercase text-[#0C65A1] mb-1.5">
                  Tienda propia Mimos · {t.localidad}
                </p>
                <h3 className="text-base font-extrabold text-[#002147]">
                  {t.nombre_mostrado}
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  {t.direccion} · {t.codigo_postal} {t.localidad}
                  {t.id === 'rua-venezuela' ? ' (Santiago de Vigo · entorno Urzáiz / Gran Vía / El Corte Inglés)' : ''}
                </p>
                <p className="text-xs text-slate-600 mt-1">
                  {t.horario.resumen}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">
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
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-extrabold text-[#002147] mb-4">
            Otros servicios de Tintorería Mimos Navia
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {otrosServicios.map((s) => (
              <a
                key={s.id}
                href={s.url}
                onClick={(e) => onNavigate(s.url, e)}
                className="p-4 min-h-[48px] rounded-xl border border-slate-200 hover:border-[#0F76BB] bg-[#F7F6F2] flex items-center justify-between gap-2 transition-colors"
              >
                <span className="text-xs sm:text-sm font-bold text-[#002147]">
                  {s.index}. {s.titulo}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#0C65A1] shrink-0" aria-hidden="true" />
              </a>
            ))}
          </div>

          <a
            href="/"
            onClick={(e) => onNavigate('/', e)}
            className="inline-flex items-center gap-2 min-h-[44px] text-sm font-bold text-[#002147] hover:text-[#0F76BB]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Volver a la portada de Tintorería Mimos Navia</span>
          </a>
        </div>
      </section>
    </main>
  );
};
