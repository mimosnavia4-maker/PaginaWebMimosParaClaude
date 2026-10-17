import React from 'react';
import {
  ArrowLeft,
  MapPin,
  Phone,
  MessageCircle,
  ExternalLink,
  Store,
  Handshake,
  Clock,
  CheckCircle2,
  Scissors,
  ArrowUpRight,
} from 'lucide-react';
import {
  ZonaSEOLocal,
  ZONAS_SEO_LOCAL,
  REGISTROS_PUNTOS,
  CONTACT_INFO,
  PuntoRegistro,
  buildMimoWhatsAppUrl,
  derivarEtiquetasServicios,
} from '../data/mimosData';

interface LocalZonePageProps {
  zona: ZonaSEOLocal;
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const LocalZonePage: React.FC<LocalZonePageProps> = ({ zona, onNavigate }) => {
  const puntosDeEstaZona = REGISTROS_PUNTOS.filter(
    (p) => p.localidad.toLowerCase() === zona.localidad.toLowerCase()
  );

  const tiendasPropiasZona = puntosDeEstaZona.filter((p) => p.tipo === 'tienda');
  const puntosColaboradoresZona = puntosDeEstaZona.filter((p) => p.tipo === 'punto');

  const otrasZonas = ZONAS_SEO_LOCAL.filter((z) => z.slug !== zona.slug);

  const renderEstablecimientoZona = (punto: PuntoRegistro) => {
    const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${punto.direccion}, ${punto.codigo_postal} ${punto.localidad}`
    )}`;
    const tieneCostura = punto.servicios_confirmados.includes('costura_arreglos');

    return (
      <article
        key={punto.id}
        className={`rounded-2xl border-2 p-6 sm:p-8 flex flex-col justify-between shadow-xs ${
          punto.tipo === 'tienda'
            ? 'border-[#002147]/25 dark:border-[#0F76BB]/50 bg-white dark:bg-[#071324]'
            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324]'
        }`}
      >
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-md ${
                punto.tipo === 'tienda'
                  ? 'bg-[#002147] text-white dark:bg-[#0F76BB]'
                  : 'bg-slate-100 dark:bg-slate-800 text-[#002147] dark:text-slate-200 border border-slate-300 dark:border-slate-700'
              }`}
            >
              {punto.tipo === 'tienda' ? (
                <>
                  <Store className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Tienda propia de Tintorería Mimos</span>
                </>
              ) : (
                <>
                  <Handshake className="w-3.5 h-3.5 text-[#0F76BB]" aria-hidden="true" />
                  <span>Establecimiento colaborador independiente</span>
                </>
              )}
            </span>
            <span className="text-xs font-mono text-slate-500">
              CP {punto.codigo_postal}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-2">
            {punto.nombre_mostrado}
          </h3>

          {punto.tipo === 'punto' && (
            <p className="text-xs sm:text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-4">
              Comercio colaborador: {punto.nombre_comercio}
            </p>
          )}

          <dl className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300 mb-5">
            <div className="flex items-start gap-2.5">
              <MapPin
                className="w-4 h-4 text-[#0F76BB] shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs text-slate-500">Dirección:</dt>
                <dd className="font-bold text-[#002147] dark:text-white">
                  {punto.direccion}, {punto.codigo_postal} {punto.localidad}
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock
                className="w-4 h-4 text-[#0F76BB] shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs text-slate-500">Horario de atención:</dt>
                <dd className="font-semibold">{punto.horario.resumen}</dd>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone
                className="w-4 h-4 text-[#0F76BB] shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <dt className="text-xs text-slate-500">Teléfono de contacto:</dt>
                <dd>
                  <a
                    href={`tel:+34${punto.telefono}`}
                    className="font-bold text-[#002147] dark:text-[#60B5F6] hover:underline tabular-nums"
                  >
                    {punto.telefonos_mostrados}
                  </a>
                </dd>
              </div>
            </div>
          </dl>

          <div className="mb-5 p-4 rounded-xl bg-slate-50 dark:bg-[#0b1d36] border border-slate-200/80 dark:border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-[#002147] dark:text-slate-200 mb-2">
              Servicios confirmados en este establecimiento:
            </p>
            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {derivarEtiquetasServicios(punto.servicios_confirmados).map((srv) => (
                <li key={srv} className="flex items-start gap-2">
                  <CheckCircle2
                    className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{srv}</span>
                </li>
              ))}
            </ul>

            {tieneCostura && punto.arreglos_confirmados.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold text-[#178A47] dark:text-[#4ade80] flex items-center gap-1.5 mb-1.5">
                  <Scissors className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Arreglos de ropa confirmados en este punto:</span>
                </p>
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 mb-2">
                  {punto.arreglos_confirmados.map((arr) => (
                    <li key={arr} className="flex items-start gap-1.5">
                      <span className="text-[#0F76BB] font-bold">·</span>
                      <span>{arr}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/arreglos-de-ropa-vigo"
                  onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
                >
                  <span>Ver página de costura y arreglos de ropa</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
            {punto.instrucciones_entrega_recogida}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-3">
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#002147] hover:bg-[#0a3161] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
          >
            <span>Abrir en Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>

          <a
            href={buildMimoWhatsAppUrl(
              `Hola, Mimo. Quiero hacer una consulta antes de llevar mis prendas a ${punto.direccion} (${punto.localidad})`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-[#178A47] hover:bg-[#126E38] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Consultar con Mimo</span>
          </a>
        </div>
      </article>
    );
  };

  return (
    <main className="bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
      {/* Cabecera Local */}
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
                  href="/puntos-mimos"
                  onClick={(e) => onNavigate('/puntos-mimos', e)}
                  className="hover:text-white underline-offset-4 hover:underline"
                >
                  Tiendas y Puntos Mimos
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#60B5F6] font-semibold">{zona.localidad}</li>
            </ol>
          </nav>

          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 text-[#60B5F6] text-xs font-mono uppercase tracking-wider font-bold">
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>
                {zona.localidad} · {zona.comarca} · CP {zona.codigosPostales}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
              {zona.h1}
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              {zona.subtitulo}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href={zona.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Consultar con Mimo ({zona.localidad})</span>
              </a>

              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white font-bold text-sm sm:text-base px-5 py-4 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4 text-[#60B5F6]" aria-hidden="true" />
                <span>Central Mimos: {CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Fichas de Establecimientos en este Municipio (separando Tiendas Propias de Puntos Colaboradores) */}
      <section className="py-14 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white mb-3">
              Dónde entregar y recoger tus prendas en {zona.localidad}
            </h2>
            {zona.explicacionEspecificaZona.map((parrafo, idx) => (
              <p
                key={idx}
                className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-3"
              >
                {parrafo}
              </p>
            ))}
          </div>

          {tiendasPropiasZona.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2.5 mb-4">
                <Store className="w-5 h-5 text-[#002147] dark:text-[#60B5F6]" aria-hidden="true" />
                <h3 className="text-xl font-extrabold text-[#002147] dark:text-white">
                  Tiendas propias de Tintorería Mimos en {zona.localidad} ({tiendasPropiasZona.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tiendasPropiasZona.map(renderEstablecimientoZona)}
              </div>
            </div>
          )}

          {puntosColaboradoresZona.length > 0 && (
            <div>
              {tiendasPropiasZona.length > 0 && (
                <div className="flex items-center gap-2.5 mb-3">
                  <Handshake className="w-5 h-5 text-[#0F76BB] dark:text-[#60B5F6]" aria-hidden="true" />
                  <h3 className="text-xl font-extrabold text-[#002147] dark:text-white">
                    Establecimiento colaborador en {zona.localidad} ({puntosColaboradoresZona.length})
                  </h3>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {puntosColaboradoresZona.map(renderEstablecimientoZona)}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Instrucciones paso a paso y Preguntas Frecuentes de la Localidad */}
      <section className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white mb-8">
            Cómo funciona la entrega y recogida en {zona.localidad}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {zona.pasosEntregaRecogida.map((p) => (
              <div
                key={p.paso}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-6"
              >
                <span className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  PASO {p.paso}
                </span>
                <h3 className="text-lg font-extrabold text-[#002147] dark:text-white mt-1 mb-2">
                  {p.titulo}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {p.detalle}
                </p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-extrabold text-[#002147] dark:text-white mb-6">
            Preguntas frecuentes sobre el servicio en {zona.localidad}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {zona.preguntasFrecuentes.map((faq) => (
              <div
                key={faq.pregunta}
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1d36] p-5"
              >
                <h3 className="text-base font-bold text-[#002147] dark:text-white mb-2">
                  {faq.pregunta}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.respuesta}
                </p>
              </div>
            ))}
          </div>

          {/* Otras zonas */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <a
              href="/puntos-mimos"
              onClick={(e) => onNavigate('/puntos-mimos', e)}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#002147] dark:text-slate-200 hover:text-[#0F76BB]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Volver al buscador de tiendas y puntos Mimos</span>
            </a>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500">Otras localidades:</span>
              {otrasZonas.map((z) => (
                <a
                  key={z.slug}
                  href={z.url}
                  onClick={(e) => onNavigate(z.url, e)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold text-[#002147] dark:text-slate-200 hover:border-[#0F76BB]"
                >
                  {z.localidad}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
