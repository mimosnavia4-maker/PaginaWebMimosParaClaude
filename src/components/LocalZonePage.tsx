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
  Navigation,
  Car,
  Truck,
  Info,
} from 'lucide-react';
import {
  ZONAS_SEO_LOCAL,
} from '../data/zonasSeoData';
import {
  REGISTROS_PUNTOS,
  CONTACT_INFO,
  PuntoRegistro,
  buildMimoWhatsAppUrl,
  buildGoogleMapsUrl,
  derivarEtiquetasServicios,
} from '../data/mimosData';
import { PuntoTelasMasPage } from './PuntoTelasMasPage';
import { PuntoGondomarPage } from './PuntoGondomarPage';
import { PuntoRedondelaPage } from './PuntoRedondelaPage';
import { PuntoArregla2Page } from './PuntoArregla2Page';
import { PageHeroLight } from './PageHeroLight';

interface LocalZonePageProps {
  zonaSlug: string;
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const LocalZonePage: React.FC<LocalZonePageProps> = ({ zonaSlug, onNavigate }) => {
  const zona = ZONAS_SEO_LOCAL.find((z) => z.slug === zonaSlug) ?? ZONAS_SEO_LOCAL[0];

  if (zona.slug === 'o-porrino') {
    return <PuntoTelasMasPage onNavigate={onNavigate} />;
  }

  if (zona.slug === 'gondomar') {
    return <PuntoGondomarPage onNavigate={onNavigate} />;
  }

  if (zona.slug === 'redondela') {
    return <PuntoRedondelaPage onNavigate={onNavigate} />;
  }

  if (zona.slug === 'ponteareas') {
    return <PuntoArregla2Page onNavigate={onNavigate} />;
  }

  const puntosDeEstaZona = REGISTROS_PUNTOS.filter(
    (p) => p.localidad.toLowerCase() === zona.localidad.toLowerCase()
  );

  const tiendasPropiasZona = puntosDeEstaZona.filter((p) => p.tipo === 'tienda');
  const puntosColaboradoresZona = puntosDeEstaZona.filter((p) => p.tipo === 'punto');

  const otrasZonas = ZONAS_SEO_LOCAL.filter((z) => z.slug !== zona.slug);

  const renderEstablecimientoZona = (punto: PuntoRegistro) => {
    const mapsHref = buildGoogleMapsUrl(punto);
    const tieneCostura = punto.servicios_confirmados.includes('costura_arreglos');

    return (
      <article
        key={punto.id}
        className={`rounded-3xl border flex flex-col justify-between shadow-sm overflow-hidden group bg-white ${
          punto.tipo === 'tienda'
            ? 'border-[#0F76BB]/30'
            : 'border-slate-200'
        }`}
      >
        <div>
          {punto.foto ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F4F9FE]">
              <img
                src={punto.foto}
                alt={`Fachada de ${punto.nombre_mostrado}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/80 via-[#002147]/20 to-transparent" />
              <div className="absolute top-3 left-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-white/95 text-[#002147] border border-slate-200 shadow-sm">
                  {punto.tipo === 'tienda' ? (
                    <>
                      <Store className="w-3.5 h-3.5 text-[#0F76BB]" aria-hidden="true" />
                      <span>Tienda Propia Mimos · {punto.localidad}</span>
                    </>
                  ) : (
                    <>
                      <Handshake className="w-3.5 h-3.5 text-[#0F76BB]" aria-hidden="true" />
                      <span>Punto Colaborador · {punto.localidad}</span>
                    </>
                  )}
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <p className="text-xs font-bold text-[#DCEBFA] uppercase tracking-wide">
                  {punto.id === 'gregorio-espino' ? 'O Calvario · Vigo' : punto.localidad}
                </p>
                <h3 className="text-xl sm:text-2xl font-black leading-tight drop-shadow-sm">
                  {punto.nombre_mostrado}
                </h3>
              </div>
            </div>
          ) : null}

          <div className="p-6 sm:p-8 pb-0">
            {!punto.foto && (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-md ${
                      punto.tipo === 'tienda'
                        ? 'bg-[#0F76BB] text-white'
                        : 'bg-[#EDF5FD] text-[#002147] border border-[#0F76BB]/25'
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

                <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] mb-2">
                  {punto.nombre_mostrado}
                </h3>

                {punto.tipo === 'punto' && (
                  <p className="text-xs sm:text-sm font-bold text-[#0F76BB] mb-4">
                    Comercio colaborador: {punto.nombre_comercio}
                  </p>
                )}
              </>
            )}

            <dl className="space-y-2.5 text-sm text-slate-700 mb-5">
              <div className="flex items-start gap-2.5">
                <MapPin
                  className="w-4 h-4 text-[#0F76BB] shrink-0 mt-1"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs text-slate-500">Dirección:</dt>
                  <dd className="font-bold text-[#002147]">
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
                  <dd className="font-semibold text-slate-700">{punto.horario.resumen}</dd>
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
                      className="font-bold text-[#0F76BB] hover:underline tabular-nums"
                    >
                      {punto.telefonos_mostrados}
                    </a>
                  </dd>
                </div>
              </div>

              {punto.referencia_local && (
                <div className="flex items-start gap-2.5">
                  <Navigation
                    className="w-4 h-4 text-[#0F76BB] shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs text-slate-500">Referencia de ubicación:</dt>
                    <dd className="font-semibold text-xs text-slate-700">
                      {punto.referencia_local}
                    </dd>
                  </div>
                </div>
              )}

              {punto.aparcamiento && (
                <div className="flex items-start gap-2.5">
                  <Car
                    className="w-4 h-4 text-[#0F76BB] shrink-0 mt-1"
                    aria-hidden="true"
                  />
                  <div>
                    <dt className="text-xs text-slate-500">Aparcamiento:</dt>
                    <dd className="font-semibold text-xs text-slate-700">
                      {punto.aparcamiento}
                    </dd>
                  </div>
                </div>
              )}
            </dl>

            <div className="mb-5 p-4 rounded-xl bg-[#F4F9FE] border border-slate-200">
              <p className="text-xs font-bold uppercase tracking-wider text-[#002147] mb-2">
                Servicios confirmados en este establecimiento:
              </p>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
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
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <p className="text-xs font-bold text-[#178A47] flex items-center gap-1.5 mb-1.5">
                    <Scissors className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Arreglos de ropa confirmados en este punto:</span>
                  </p>
                  <ul className="space-y-1 text-xs text-slate-600 mb-2">
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
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#0F76BB] hover:underline"
                  >
                    <span>Ver página de costura y arreglos de ropa</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {punto.instrucciones_entrega_recogida}
            </p>
          </div>
        </div>

        <div className="px-6 sm:px-8 pb-6 pt-4 mt-4 border-t border-slate-200 flex flex-wrap items-center gap-2.5">
          {punto.id === 'as-teixugueiras' && (
            <a
              href="/tienda-mimos-navia-vigo"
              onClick={(e) => onNavigate('/tienda-mimos-navia-vigo', e)}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
            >
              <Store className="w-4 h-4" aria-hidden="true" />
              <span>Ver ficha completa de la tienda</span>
            </a>
          )}

          {punto.id === 'gregorio-espino' && (
            <a
              href="/tienda-mimos-gregorio-espino-vigo"
              onClick={(e) => onNavigate('/tienda-mimos-gregorio-espino-vigo', e)}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
            >
              <Store className="w-4 h-4" aria-hidden="true" />
              <span>Ver ficha completa de la tienda</span>
            </a>
          )}

          {punto.id === 'rua-venezuela' && (
            <a
              href="/tienda-mimos-venezuela-vigo"
              onClick={(e) => onNavigate('/tienda-mimos-venezuela-vigo', e)}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
            >
              <Store className="w-4 h-4" aria-hidden="true" />
              <span>Ver ficha y fotos de la tienda</span>
            </a>
          )}

          {punto.id === 'punto-vigo-dpasso' && (
            <a
              href="/punto-mimos-dpasso-vigo"
              onClick={(e) => onNavigate('/punto-mimos-dpasso-vigo', e)}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
            >
              <Store className="w-4 h-4" aria-hidden="true" />
              <span>Ver ficha y fotos de D&apos;Passo</span>
            </a>
          )}

          {punto.id === 'punto-gondomar' && (
            <a
              href="/zonas/gondomar"
              onClick={(e) => onNavigate('/zonas/gondomar', e)}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
            >
              <Store className="w-4 h-4" aria-hidden="true" />
              <span>Ver ficha y fotos de Gondomar</span>
            </a>
          )}

          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
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
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] bg-[#1FA855] hover:bg-[#178A47] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            <span>Consultar con Mimo</span>
          </a>
        </div>
      </article>
    );
  };

  return (
    <main id="main-content" tabIndex={-1} className="focus:outline-hidden bg-white border-b border-slate-200">
      {/* Cabecera Luminosa Local */}
      <PageHeroLight
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Tiendas y Puntos Mimos', href: '/puntos-mimos' },
          { label: zona.localidad },
        ]}
        onNavigate={onNavigate}
        kicker={`${zona.localidad} · ${zona.comarca} · CP ${zona.codigosPostales}`}
        title={zona.h1}
        description={zona.subtitulo}
        whatsappHref={zona.whatsappUrl}
        whatsappLabel={`Consultar con Mimo (${zona.localidad})`}
        secondaryAction={{
          label: `Central Mimos: ${CONTACT_INFO.phoneDisplay}`,
          href: CONTACT_INFO.phoneHref,
          icon: <Phone className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />,
          isInternalRoute: false,
        }}
      />

      {/* Fichas de Establecimientos en este Municipio (separando Tiendas Propias de Puntos Colaboradores) */}
      <section className="py-12 lg:py-18 bg-[#F7F6F2] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] mb-3">
              Dónde entregar y recoger tus prendas en {zona.localidad}
            </h2>
            {zona.explicacionEspecificaZona.map((parrafo, idx) => (
              <p
                key={idx}
                className="text-sm sm:text-base text-slate-700 leading-relaxed mb-3"
              >
                {parrafo}
              </p>
            ))}
          </div>

          {tiendasPropiasZona.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2.5 mb-4">
                <Store className="w-5 h-5 text-[#0F76BB]" aria-hidden="true" />
                <h3 className="text-xl font-extrabold text-[#002147]">
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
                  <Handshake className="w-5 h-5 text-[#0F76BB]" aria-hidden="true" />
                  <h3 className="text-xl font-extrabold text-[#002147]">
                    Establecimiento colaborador en {zona.localidad} ({puntosColaboradoresZona.length})
                  </h3>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {puntosColaboradoresZona.map(renderEstablecimientoZona)}
              </div>
              {zona.slug === 'vigo' && (
                <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-2xl">
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB]">
                      Municipios limítrofes sin tienda física
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      ¿Vives en <strong>Mos</strong> o en <strong>Nigrán</strong>? Allí atendemos mediante ruta de recogida a domicilio o en nuestras tiendas propias y puntos colaboradores cercanos.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2.5 shrink-0">
                    <a
                      href="/zonas/mos"
                      onClick={(e) => onNavigate('/zonas/mos', e)}
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-xl bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-xs font-bold text-[#002147] transition-colors"
                    >
                      <span>Servicio en Mos</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    </a>
                    <a
                      href="/zonas/nigran"
                      onClick={(e) => onNavigate('/zonas/nigran', e)}
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-xl bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-xs font-bold text-[#002147] transition-colors"
                    >
                      <span>Servicio en Nigrán</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
          {tiendasPropiasZona.length === 0 && puntosColaboradoresZona.length === 0 && (
            <div className="space-y-8">
              <div className="rounded-3xl border border-[#0F76BB]/30 bg-white p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-3xl">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold">
                      <Info className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>Sin tienda propia ni punto colaborador físico en {zona.localidad}</span>
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                      Cobertura en {zona.localidad} mediante recogida y entrega a domicilio
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Para ser completamente transparentes: actualmente no contamos con establecimiento físico ni comercio colaborador en {zona.localidad}. Atendemos el municipio mediante{' '}
                      <strong>recogida y entrega a domicilio</strong> (sujeta a ruta semanal e importe mínimo de pedido), además de limpieza de sofás y tapicerías in situ y desmontaje de cortinas.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                    <a
                      href={zona.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Consultar ruta con Mimo</span>
                    </a>
                    <a
                      href="/recogida-a-domicilio"
                      onClick={(e) => onNavigate('/recogida-a-domicilio', e)}
                      className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-5 py-3 rounded-xl transition-colors whitespace-nowrap group"
                    >
                      <Truck className="w-4 h-4 text-[#0F76BB] group-hover:text-white shrink-0" aria-hidden="true" />
                      <span>Condiciones recogida a domicilio</span>
                    </a>
                  </div>
                </div>
              </div>

              {zona.opcionesCercanas && zona.opcionesCercanas.length > 0 && (
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] mb-4">
                    Puntos físicos más cercanos a {zona.localidad} (sin importe mínimo):
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {zona.opcionesCercanas.map((op) => (
                      <a
                        key={op.href}
                        href={op.href}
                        onClick={(e) => onNavigate(op.href, e)}
                        className="rounded-2xl border border-slate-200 hover:border-[#0F76BB] bg-white p-6 flex flex-col justify-between gap-4 transition-colors group"
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB]">
                              <Store className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                              <span>Punto físico cercano</span>
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                          </div>
                          <h4 className="text-base sm:text-lg font-extrabold text-[#002147] group-hover:text-[#0F76BB]">
                            {op.nombre}
                          </h4>
                          <p className="text-xs font-bold text-slate-700">
                            {op.direccion}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {op.detalle}
                          </p>
                        </div>
                        <span className="text-xs font-bold text-[#0F76BB] group-hover:underline">
                          Ver ficha de ubicación y horarios →
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Instrucciones paso a paso y Preguntas Frecuentes de la Localidad */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] mb-8">
            Cómo funciona la entrega y recogida en {zona.localidad}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {zona.pasosEntregaRecogida.map((p) => (
              <div
                key={p.paso}
                className="rounded-2xl border border-slate-200 bg-[#F4F9FE] p-6"
              >
                <span className="text-xs font-mono font-bold text-[#0F76BB]">
                  PASO {p.paso}
                </span>
                <h3 className="text-lg font-extrabold text-[#002147] mt-1 mb-2">
                  {p.titulo}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {p.detalle}
                </p>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-extrabold text-[#002147] mb-6">
            Preguntas frecuentes sobre el servicio en {zona.localidad}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            {zona.preguntasFrecuentes.map((faq) => (
              <div
                key={faq.pregunta}
                className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-5"
              >
                <h3 className="text-base font-bold text-[#002147] mb-2">
                  {faq.pregunta}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {faq.respuesta}
                </p>
              </div>
            ))}
          </div>

          <div className="mb-10 rounded-2xl border border-[#0F76BB]/25 bg-[#EDF5FD] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 max-w-2xl">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB]">
                Urgencias textiles en {zona.localidad} y comarca
              </p>
              <p className="text-sm sm:text-base font-extrabold text-[#002147]">
                ¿Has sufrido un incendio, humareda o fuga de agua en casa o en tu local?
              </p>
              <p className="text-xs sm:text-sm text-slate-700">
                Preparamos triaje técnico con prueba de viabilidad previa, inventario Art. 38 y factura oficial con CIF para tu seguro.
              </p>
            </div>
            <a
              href="/limpieza-incendios-siniestros-vigo"
              onClick={(e) => onNavigate('/limpieza-incendios-siniestros-vigo', e)}
              className="inline-flex items-center justify-center gap-1.5 min-h-[48px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              <span>Recuperación tras incendios y siniestros</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          </div>

          {/* Otras zonas */}
          <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <a
              href="/puntos-mimos"
              onClick={(e) => onNavigate('/puntos-mimos', e)}
              className="inline-flex items-center gap-2 min-h-[44px] text-sm font-bold text-[#002147] hover:text-[#0F76BB]"
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
                  className="inline-flex items-center min-h-[40px] px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-bold text-[#002147] hover:border-[#0F76BB] transition-colors"
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
