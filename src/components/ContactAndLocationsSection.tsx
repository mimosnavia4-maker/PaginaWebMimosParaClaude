import React, { useState, useMemo, useEffect } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  Clock,
  Search,
  ExternalLink,
  ArrowUpRight,
  Store,
  Handshake,
  Scissors,
  CheckCircle2,
  Navigation,
  Car,
  X,
  FileText,
  Map as MapIcon,
} from 'lucide-react';
import {
  CONTACT_INFO,
  REGISTROS_PUNTOS,
  TIENDAS_PROPIAS,
  PUNTOS_COLABORADORES,
  ZONAS_SERVICIO,
  ZONAS_RESUMEN,
  FAQ_PORTADA_SIN_PRECIOS,
  PuntoRegistro,
  buildMimoWhatsAppUrl,
  buildGoogleMapsUrl,
  derivarEtiquetasServicios,
} from '../data/mimosData';
import {
  trackWhatsAppClick,
  trackPhoneClick,
  trackFormPrepared,
  trackLocatorSearch,
} from '../utils/analytics';

import { lazyWithRetry } from '../utils/lazyWithRetry';
import { ErrorBoundary } from './ErrorBoundary';

const MimosGoogleMap = lazyWithRetry(() =>
  import('./MimosGoogleMap').then((m) => ({ default: m.MimosGoogleMap }))
);
const PuntoTelasMasFicha = lazyWithRetry(() =>
  import('./PuntoTelasMasFicha').then((m) => ({ default: m.PuntoTelasMasFicha }))
);
const PuntoGondomarFicha = lazyWithRetry(() =>
  import('./PuntoGondomarFicha').then((m) => ({ default: m.PuntoGondomarFicha }))
);
const PuntoRedondelaFicha = lazyWithRetry(() =>
  import('./PuntoRedondelaFicha').then((m) => ({ default: m.PuntoRedondelaFicha }))
);
const PuntoArregla2Ficha = lazyWithRetry(() =>
  import('./PuntoArregla2Ficha').then((m) => ({ default: m.PuntoArregla2Ficha }))
);
const TiendaNaviaFicha = lazyWithRetry(() =>
  import('./TiendaNaviaFicha').then((m) => ({ default: m.TiendaNaviaFicha }))
);
import { Dialog } from './Dialog';
import { PageHeroLight } from './PageHeroLight';

interface ContactAndLocationsSectionProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  pageMode?: 'puntos' | 'contacto' | null;
}

export const ContactAndLocationsSection: React.FC<ContactAndLocationsSectionProps> = ({
  onNavigate,
  pageMode = null,
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('Todos');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedTipo, setSelectedTipo] = useState<'todos' | 'tienda' | 'punto'>('todos');
  const [selectedServicio, setSelectedServicio] = useState<string>('todos');
  const [selectedMapPuntoId, setSelectedMapPuntoId] = useState<string | null>(null);
  const [puntoModalFicha, setPuntoModalFicha] = useState<PuntoRegistro | null>(null);

  // Carga diferida del componente mapa (sin peticiones a Google Maps hasta consentimiento o clic manual)
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [mapShouldLoad, setMapShouldLoad] = useState<boolean>(
    pageMode === 'puntos' || pageMode === 'contacto'
  );
  const [manualOuterMapLoad, setManualOuterMapLoad] = useState<boolean>(false);

  useEffect(() => {
    if (mapShouldLoad || typeof window === 'undefined') return;
    const el = mapRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setMapShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMapShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: '600px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mapShouldLoad]);

  // Formulario de contacto general
  const [contactNombre, setContactNombre] = useState('');
  const [contactTelefono, setContactTelefono] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactAsunto, setContactAsunto] = useState('Consulta de precio o prenda');
  const [contactMensaje, setContactMensaje] = useState('');
  const [contactPrivacidad, setContactPrivacidad] = useState(false);
  const [contactError, setContactError] = useState('');
  const [contactReady, setContactReady] = useState(false);

  const filteredPoints = useMemo(() => {
    const q = searchLocation.trim().toLowerCase();
    return REGISTROS_PUNTOS.filter((p) => {
      const matchZone = selectedZone === 'Todos' || p.localidad === selectedZone;
      const matchTipo = selectedTipo === 'todos' || p.tipo === selectedTipo;
      const matchServicio =
        selectedServicio === 'todos' ||
        p.servicios_confirmados.includes(selectedServicio);
      const matchQuery =
        !q ||
        p.nombre_mostrado.toLowerCase().includes(q) ||
        p.nombre_comercio.toLowerCase().includes(q) ||
        p.direccion.toLowerCase().includes(q) ||
        p.localidad.toLowerCase().includes(q) ||
        p.codigo_postal.toLowerCase().includes(q);
      return matchZone && matchTipo && matchServicio && matchQuery;
    });
  }, [selectedZone, selectedTipo, selectedServicio, searchLocation]);

  const currentSectionPath =
    typeof window !== 'undefined'
      ? window.location.pathname
      : pageMode === 'contacto'
        ? '/contacto'
        : pageMode === 'puntos'
          ? '/puntos-mimos'
          : '/#contacto';

  useEffect(() => {
    if (searchLocation.trim().length >= 3) {
      const timer = setTimeout(() => {
        trackLocatorSearch(currentSectionPath, filteredPoints.length, 'text_search');
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [searchLocation, filteredPoints.length, currentSectionPath]);

  const tiendasFiltradas = filteredPoints.filter((p) => p.tipo === 'tienda');
  const colaboradoresFiltrados = filteredPoints.filter((p) => p.tipo === 'punto');

  const countByConfirmedService = (serviceKey: string) =>
    REGISTROS_PUNTOS.filter((p) => p.servicios_confirmados.includes(serviceKey)).length;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactNombre.trim() || !contactTelefono.trim() || !contactMensaje.trim()) {
      setContactError('Por favor, indica tu nombre, teléfono y el detalle de tu consulta.');
      return;
    }
    if (!contactPrivacidad) {
      setContactError('Debes aceptar la política de privacidad para continuar.');
      return;
    }
    setContactError('');
    setContactReady(true);
    trackFormPrepared(currentSectionPath, 'contact_request');
  };

  const composedContactText = [
    `Hola, Mimo (${contactAsunto}):`,
    `Nombre: ${contactNombre.trim()}`,
    `Teléfono: ${contactTelefono.trim()}`,
    contactEmail.trim() ? `Email: ${contactEmail.trim()}` : '',
    `Consulta: ${contactMensaje.trim()}`,
  ]
    .filter(Boolean)
    .join('\n');

  const contactWhatsAppHref = buildMimoWhatsAppUrl(composedContactText);
  const contactMailtoHref = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
    `${contactAsunto} - ${contactNombre.trim()}`
  )}&body=${encodeURIComponent(composedContactText)}`;

  const renderPuntoCard = (punto: PuntoRegistro) => {
    const zonaPage = ZONAS_RESUMEN.find((z) => z.localidad === punto.localidad);
    const mapsHref = buildGoogleMapsUrl(punto);
    const tieneCostura = punto.servicios_confirmados.includes('costura_arreglos');

    return (
      <article
        key={punto.id}
        className={`rounded-3xl border flex flex-col justify-between transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md bg-white ${
          punto.tipo === 'tienda'
            ? 'border-[#0F76BB]/30'
            : 'border-slate-200'
        }`}
      >
        <div>
          {punto.foto ? (
            /* Foto real en cabecera con etiqueta luminosa */
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#F4F9FE]">
              <img
                src={punto.foto}
                alt={`Fachada de ${punto.nombre_mostrado}`}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002147]/35 via-transparent to-transparent" />

              {/* Badge superior flotante limpio */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider bg-white/95 text-[#002147] border border-slate-200 shadow-sm">
                  {punto.tipo === 'tienda' ? (
                    <Store className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                  ) : (
                    <Handshake className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                  )}
                  <span>
                    {punto.tipo === 'tienda' ? 'Tienda Propia Mimos' : 'Punto Colaborador'} · {punto.localidad.toUpperCase()}
                  </span>
                </span>
              </div>
            </div>
          ) : (
            /* Cabecera para puntos sin foto */
            <div className="p-6 pb-0">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg ${
                    punto.tipo === 'tienda'
                      ? 'bg-[#0F76BB] text-white'
                      : 'bg-[#EDF5FD] text-[#002147] border border-[#0F76BB]/25'
                  }`}
                >
                  {punto.tipo === 'tienda' ? (
                    <>
                      <Store className="w-4 h-4" aria-hidden="true" />
                      <span>Tienda Propia Mimos · {punto.localidad.toUpperCase()}</span>
                    </>
                  ) : (
                    <>
                      <Handshake className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                      <span>Punto Colaborador · {punto.localidad.toUpperCase()}</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          )}

          {/* Cuerpo de la tarjeta con todos los datos completos */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-2xl font-black text-[#002147] tracking-tight">
                {punto.nombre_mostrado}
              </h3>
              {punto.tipo === 'punto' && (
                <p className="text-xs font-bold text-[#0F76BB] mt-1">
                  Comercio colaborador: {punto.nombre_comercio}
                </p>
              )}
            </div>

            {/* Datos principales con iconos */}
            <dl className="space-y-2.5 text-sm text-slate-700">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Dirección</dt>
                  <dd className="font-bold text-[#002147]">
                    {punto.direccion} · <span className="font-mono">{punto.codigo_postal}</span> {punto.localidad}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Horario</dt>
                  <dd className="text-slate-700 font-medium">
                    {punto.horario.resumen}
                  </dd>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-[#0F76BB] shrink-0" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Teléfono</dt>
                  <dd>
                    <a
                      href={`tel:+34${punto.telefono}`}
                      onClick={() =>
                        trackPhoneClick(currentSectionPath, 'point_card', {
                          store_id: punto.id,
                        })
                      }
                      className="font-extrabold text-[#0F76BB] hover:underline tabular-nums text-base"
                    >
                      {punto.telefonos_mostrados}
                    </a>
                  </dd>
                </div>
              </div>

              {punto.referencia_local && (
                <div className="flex items-start gap-2.5">
                  <Navigation className="w-5 h-5 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Ubicación</dt>
                    <dd className="text-xs sm:text-sm text-slate-600 leading-snug">
                      <strong className="text-[#002147]">Ubicación:</strong> {punto.referencia_local}
                    </dd>
                  </div>
                </div>
              )}

              {punto.aparcamiento && (
                <div className="flex items-start gap-2.5">
                  <Car className="w-5 h-5 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Aparcamiento</dt>
                    <dd className="text-xs sm:text-sm text-slate-600 leading-snug">
                      <strong className="text-[#002147]">Aparcamiento:</strong> {punto.aparcamiento}
                    </dd>
                  </div>
                </div>
              )}
            </dl>

            {/* Texto de recepción y entrega */}
            {punto.instrucciones_entrega_recogida && (
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                {punto.instrucciones_entrega_recogida}
              </p>
            )}

            {/* Caja de Servicios Confirmados en este establecimiento */}
            {punto.servicios_confirmados.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#F4F9FE] border border-slate-200">
                <p className="text-xs font-bold uppercase tracking-wider text-[#002147] mb-3">
                  Servicios confirmados en este establecimiento:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {derivarEtiquetasServicios(punto.servicios_confirmados).map((srv) => (
                    <li key={srv} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{srv}</span>
                    </li>
                  ))}
                </ul>

                {/* Sub-bloque Taller de costura y arreglos */}
                {tieneCostura && (
                  <div className="mt-3.5 pt-3.5 border-t border-slate-200">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <Scissors className="w-4 h-4 text-[#178A47]" aria-hidden="true" />
                        <span className="text-xs font-bold text-[#178A47]">
                          {punto.id === 'gregorio-espino' || punto.id === 'rua-venezuela'
                            ? 'Taller propio de costura y arreglos'
                            : punto.id === 'as-teixugueiras'
                              ? 'Recepción de costura y arreglos'
                              : 'Arreglos de costura del comercio colaborador'}
                        </span>
                      </div>
                      <a
                        href="/arreglos-de-ropa-vigo"
                        onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                        className="text-xs font-bold text-[#0F76BB] hover:underline"
                      >
                        Ver arreglos →
                      </a>
                    </div>
                    {punto.id === 'as-teixugueiras' && (
                      <p className="text-[11px] text-slate-600 pl-4 mb-1.5 leading-snug">
                        Recepción directa en tienda central para su confección y ajuste con nuestro taller propio de costura.
                      </p>
                    )}
                    {punto.tipo === 'punto' && (
                      <p className="text-[11px] text-slate-600 pl-4 mb-1.5 leading-snug">
                        Servicio de costura y composturas realizado de forma independiente por el propio taller de {punto.nombre_comercio}.
                      </p>
                    )}
                    {punto.arreglos_confirmados && punto.arreglos_confirmados.length > 0 && (
                      <ul className="space-y-1 text-xs text-slate-600 pl-4">
                        {punto.arreglos_confirmados.slice(0, 3).map((arr) => (
                          <li key={arr} className="flex items-start gap-1.5">
                            <span className="text-[#0F76BB] font-bold">·</span>
                            <span>{arr}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Acciones del pie de tarjeta */}
        <div className="p-6 pt-0">
          <div className="pt-4 border-t border-slate-100 space-y-3">
            {/* Fila 1: Botón Ver ficha detallada + Cómo llegar */}
            <div className="flex flex-wrap items-center gap-2.5">
              {punto.id === 'as-teixugueiras' ? (
                <a
                  href="/tienda-mimos-navia-vigo"
                  onClick={(e) => onNavigate('/tienda-mimos-navia-vigo', e)}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Ver ficha detallada</span>
                </a>
              ) : punto.id === 'gregorio-espino' ? (
                <a
                  href="/tienda-mimos-gregorio-espino-vigo"
                  onClick={(e) => onNavigate('/tienda-mimos-gregorio-espino-vigo', e)}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Ver ficha detallada</span>
                </a>
              ) : punto.id === 'rua-venezuela' ? (
                <a
                  href="/tienda-mimos-venezuela-vigo"
                  onClick={(e) => onNavigate('/tienda-mimos-venezuela-vigo', e)}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Ver ficha y fotos</span>
                </a>
              ) : punto.id === 'punto-o-porrino' ? (
                <a
                  href="/zonas/o-porrino"
                  onClick={(e) => onNavigate('/zonas/o-porrino', e)}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Ver ficha detallada</span>
                </a>
              ) : punto.id === 'punto-gondomar' ? (
                <a
                  href="/zonas/gondomar"
                  onClick={(e) => onNavigate('/zonas/gondomar', e)}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Ver ficha y fotos</span>
                </a>
              ) : punto.id === 'punto-redondela' ? (
                <a
                  href="/zonas/redondela"
                  onClick={(e) => onNavigate('/zonas/redondela', e)}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Ver ficha y fotos</span>
                </a>
              ) : punto.id === 'punto-ponteareas' ? (
                <a
                  href="/zonas/ponteareas"
                  onClick={(e) => onNavigate('/zonas/ponteareas', e)}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Ver ficha y fotos</span>
                </a>
              ) : punto.id === 'punto-vigo-dpasso' ? (
                <a
                  href="/punto-mimos-dpasso-vigo"
                  onClick={(e) => onNavigate('/punto-mimos-dpasso-vigo', e)}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Ver ficha y fotos</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setPuntoModalFicha(punto)}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Ver ficha detallada</span>
                </button>
              )}

              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] text-xs font-bold transition-colors"
              >
                <span>Cómo llegar</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            {/* Fila 2: Ver en mapa | WhatsApp | Ver ficha de {localidad} */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold pt-1">
              <a
                href={buildMimoWhatsAppUrl(
                  `Hola, Mimo. Quiero consultar para ${
                    punto.tipo === 'tienda'
                      ? `la tienda de ${punto.nombre_mostrado}`
                      : `el punto de ${punto.localidad}`
                  } (${punto.direccion}).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick(currentSectionPath, 'point_card', {
                    store_id: punto.id,
                  })
                }
                className="inline-flex items-center justify-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-lg bg-[#1FA855] hover:bg-[#178A47] text-white transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setSelectedMapPuntoId(punto.id);
                  document.getElementById('mapa-interactivo-puntos')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 min-h-[40px] px-2.5 py-1.5 text-[#0F76BB] hover:underline cursor-pointer"
              >
                <MapIcon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Ver en mapa</span>
              </button>

              {zonaPage && (
                <a
                  href={zonaPage.url}
                  onClick={(e) => onNavigate(zonaPage.url, e)}
                  className="inline-flex items-center gap-1 min-h-[40px] px-2 py-1.5 text-[#0F76BB] hover:underline"
                >
                  <span>Ver ficha de {punto.localidad}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <>
      {pageMode === 'contacto' && (
        <PageHeroLight
          breadcrumbs={[
            { label: 'Inicio', href: '/' },
            { label: 'Contacto' },
          ]}
          onNavigate={onNavigate}
          kicker={`Contacto directo · ${CONTACT_INFO.legalName}`}
          title="Contacto, tiendas propias en Vigo y horarios de Tintorería Mimos Navia"
          description={`Atención directa desde nuestra central en Navia (Vigo), ${TIENDAS_PROPIAS.length} tiendas propias en Vigo y ${PUNTOS_COLABORADORES.length} puntos colaboradores en ${ZONAS_SERVICIO.join(', ')}.`}
          whatsappHref={CONTACT_INFO.whatsappGeneralHref}
          whatsappLabel="Hablar con Mimo por WhatsApp"
          onWhatsAppClick={() => trackWhatsAppClick(currentSectionPath, 'hero_whatsapp')}
          secondaryAction={{
            label: 'Ir al formulario de contacto',
            href: '#contacto',
          }}
        />
      )}

      {pageMode === 'puntos' && (
        <PageHeroLight
          breadcrumbs={[
            { label: 'Inicio', href: '/' },
            { label: 'Tiendas y Puntos Mimos' },
          ]}
          onNavigate={onNavigate}
          kicker={`${TIENDAS_PROPIAS.length} tiendas propias en Vigo y ${PUNTOS_COLABORADORES.length} puntos de recogida colaboradores`}
          title="Red de tiendas propias de Tintorería Mimos en Vigo y puntos colaboradores"
          description={`Diferenciamos con total transparencia nuestras ${TIENDAS_PROPIAS.length} tiendas propias en Vigo de los ${PUNTOS_COLABORADORES.length} establecimientos colaboradores en ${ZONAS_SERVICIO.join(', ')} donde puedes depositar y recoger tus encargos.`}
          whatsappHref={CONTACT_INFO.whatsappGeneralHref}
          whatsappLabel="Hablar con Mimo por WhatsApp"
          onWhatsAppClick={() => trackWhatsAppClick(currentSectionPath, 'hero_whatsapp')}
          secondaryAction={{
            label: 'Ver mapa interactivo',
            href: '#mapa-interactivo-puntos',
          }}
        />
      )}

      <section
        id="puntos"
        aria-labelledby="puntos-heading"
        className="py-12 lg:py-20 bg-[#F7F6F2] border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!pageMode && (
            <div className="max-w-3xl mb-10">
              <p className="text-sm font-bold text-[#0F76BB] mb-2">
                {TIENDAS_PROPIAS.length} tiendas propias en Vigo y {PUNTOS_COLABORADORES.length} puntos de recogida colaboradores
              </p>
              <h2
                id="puntos-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] tracking-tight mb-4"
              >
                Red de tiendas propias de Tintorería Mimos y puntos colaboradores en la comarca
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Diferenciamos con total transparencia nuestras <strong>{TIENDAS_PROPIAS.length} tiendas propias en Vigo</strong> de los <strong>{PUNTOS_COLABORADORES.length} establecimientos colaboradores</strong> en {ZONAS_SERVICIO.join(', ')} donde puedes depositar y recoger tus encargos.
              </p>
            </div>
          )}

          {/* Tarjetas de Acceso Directo a las Páginas por Localidad (/zonas/...) */}
          <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <h2 id={pageMode ? 'puntos-heading' : undefined} className="text-sm sm:text-base font-extrabold text-[#002147]">
                Selecciona tu municipio para ver su página local e instrucciones paso a paso:
              </h2>
              <span className="text-xs font-mono text-slate-500">
                {ZONAS_RESUMEN.map((z) => z.localidad).join(' · ')}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {ZONAS_RESUMEN.map((zona) => (
                <a
                  key={zona.slug}
                  href={zona.url}
                  onClick={(e) => onNavigate(zona.url, e)}
                  className="p-4 rounded-xl border border-slate-200 hover:border-[#0F76BB] bg-[#F4F9FE] transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-base font-extrabold text-[#002147] group-hover:text-[#0F76BB]">
                        {zona.localidad}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                    </div>
                    <p className="text-xs text-slate-600">
                      {zona.comarca} · CP {zona.codigosPostales}
                    </p>
                  </div>
                  <span className="mt-3 text-xs font-bold text-[#0F76BB] group-hover:underline">
                    {zona.modoCobertura === 'solo-domicilio'
                      ? `Cobertura a domicilio en ${zona.localidad} →`
                      : `Ver puntos en ${zona.localidad} →`}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Mapa Interactivo con Google Maps */}
          <div id="mapa-interactivo-puntos" ref={mapRef} className="mb-12 scroll-mt-24">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-[#EDF5FD] text-[#0F76BB]">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                    Mapa interactivo de tiendas propias y puntos colaboradores
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Explora las 3 tiendas propias en Vigo y los 5 puntos colaboradores (Redondela, Gondomar, Ponteareas, O Porriño y D&apos;Passo en Vigo). Pulsa en cualquier chincheta para ver horarios, teléfono y ruta directa en Google Maps.
                </p>
              </div>
            </div>
            {!mapShouldLoad ? (
              <div className="w-full h-[430px] sm:h-[490px] lg:h-[530px] rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 rounded-2xl bg-[#EDF5FD] flex items-center justify-center mb-4">
                  <MapPin className="w-7 h-7 text-[#0F76BB]" />
                </div>
                <h4 className="font-extrabold text-[#002147] text-lg sm:text-xl mb-2">
                  Mapa interactivo de tiendas y puntos Mimos
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mb-5 leading-relaxed">
                  3 tiendas propias en Vigo y 5 puntos colaboradores oficiales en Redondela, Gondomar, Ponteareas, O Porriño y As Travesas. Al pulsar se conectará con Google Maps.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setManualOuterMapLoad(true);
                    setMapShouldLoad(true);
                  }}
                  className="inline-flex items-center gap-2 min-h-[48px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  <MapIcon className="w-4 h-4" />
                  <span>Cargar mapa interactivo</span>
                </button>
              </div>
            ) : (
              <ErrorBoundary
                fallback={
                  <div className="w-full h-[430px] sm:h-[490px] lg:h-[530px] rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center p-6 text-center">
                    <MapPin className="w-7 h-7 text-[#0F76BB] mb-2.5" aria-hidden="true" />
                    <p className="font-extrabold text-[#002147] text-base mb-1">
                      Mapa interactivo no disponible temporalmente
                    </p>
                    <p className="text-xs text-slate-600 max-w-sm mb-4">
                      Puedes abrir «Cómo llegar» en Google Maps directamente desde cada ficha inferior.
                    </p>
                    <button
                      type="button"
                      onClick={() => window.location.reload()}
                      className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      <MapIcon className="w-4 h-4" aria-hidden="true" />
                      <span>Recargar mapa</span>
                    </button>
                  </div>
                }
              >
                <React.Suspense
                  fallback={
                    <div className="w-full h-[430px] sm:h-[490px] lg:h-[530px] rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center p-6 text-center animate-pulse">
                      <div className="w-12 h-12 rounded-full bg-[#EDF5FD] flex items-center justify-center mb-3">
                        <MapPin className="w-6 h-6 text-[#0F76BB] animate-bounce" />
                      </div>
                      <p className="font-extrabold text-[#002147] text-base">
                        Cargando mapa y ubicaciones de Mimos...
                      </p>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm">
                        Preparando tiendas propias y puntos colaboradores en Vigo y comarca.
                      </p>
                    </div>
                  }
                >
                  <MimosGoogleMap
                    selectedPuntoId={selectedMapPuntoId}
                    onSelectPunto={(p) => setSelectedMapPuntoId(p ? p.id : null)}
                    onNavigate={onNavigate}
                    initialManualLoad={manualOuterMapLoad}
                  />
                </React.Suspense>
              </ErrorBoundary>
            )}
          </div>

          {/* Buscador por localidad o código postal + Filtros */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-xl w-fit">
              {['Todos', ...ZONAS_SERVICIO].map((zona) => {
                const active = selectedZone === zona;
                return (
                  <button
                    key={zona}
                    type="button"
                    onClick={() => setSelectedZone(zona)}
                    aria-pressed={active}
                    className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#0F76BB] text-white'
                        : 'text-[#002147] hover:bg-[#EDF5FD]'
                    }`}
                  >
                    {zona}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              <select
                value={selectedServicio}
                onChange={(e) => setSelectedServicio(e.target.value)}
                aria-label="Filtrar por servicio"
                className="min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-base sm:text-sm font-bold text-[#002147] focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
              >
                <option value="todos">Todos los servicios ({REGISTROS_PUNTOS.length})</option>
                <option value="costura_arreglos">
                  Costura y arreglos ({countByConfirmedService('costura_arreglos')})
                </option>
                <option value="tintoreria">
                  Tintorería y lavandería ({countByConfirmedService('tintoreria')})
                </option>
                <option value="textiles_hogar">
                  Textiles del hogar ({countByConfirmedService('textiles_hogar')})
                </option>
              </select>

              <select
                value={selectedTipo}
                onChange={(e) =>
                  setSelectedTipo(e.target.value as 'todos' | 'tienda' | 'punto')
                }
                aria-label="Filtrar por tipo de establecimiento"
                className="min-h-[44px] px-3.5 py-2 rounded-xl border border-slate-300 bg-white text-base sm:text-sm font-bold text-[#002147] focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
              >
                <option value="todos">Todos ({REGISTROS_PUNTOS.length})</option>
                <option value="tienda">Solo tiendas propias ({TIENDAS_PROPIAS.length})</option>
                <option value="punto">
                  Solo puntos colaboradores ({PUNTOS_COLABORADORES.length})
                </option>
              </select>

              <div className="relative w-full sm:w-64">
                <label htmlFor="buscar-punto" className="sr-only">
                  Buscar por calle, localidad o código postal
                </label>
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="buscar-punto"
                  type="search"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Calle, localidad o CP (ej. 36860)..."
                  className="w-full min-h-[44px] pl-10 pr-4 py-2 rounded-xl border border-slate-300 bg-white text-base sm:text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Bloque 1: Las 3 Tiendas Propias en Vigo */}
          {tiendasFiltradas.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-2.5 mb-4">
                <Store className="w-5 h-5 text-[#0F76BB]" aria-hidden="true" />
                <h3 className="text-xl font-extrabold text-[#002147]">
                  Tiendas propias de Tintorería Mimos en Vigo ({tiendasFiltradas.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tiendasFiltradas.map(renderPuntoCard)}
              </div>
            </div>
          )}

          {/* Bloque 2: Los 5 Puntos de Recogida en Establecimientos Colaboradores */}
          {colaboradoresFiltrados.length > 0 && (
            <div className="mb-14">
              <div className="flex items-center gap-2.5 mb-2">
                <Handshake className="w-5 h-5 text-[#0F76BB]" aria-hidden="true" />
                <h3 className="text-xl font-extrabold text-[#002147]">
                  Puntos de recogida en establecimientos colaboradores ({colaboradoresFiltrados.length})
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                Comercios colaboradores donde está disponible el servicio de entrega y recogida de encargos de Tintorería Mimos Navia, S.L.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {colaboradoresFiltrados.map(renderPuntoCard)}
              </div>
            </div>
          )}

          {/* Bloque para captar nuevos comercios colaboradores */}
          <div className="mb-16 rounded-2xl border border-[#0F76BB]/30 bg-[#EDF5FD] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-mono uppercase tracking-wider text-[#0F76BB] font-bold mb-1">
                Red de comercios colaboradores Mimos
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] mb-2">
                ¿Tienes un comercio y quieres ser punto Mimos?
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Si tienes una tienda de arreglos, mercería, zapatería o comercio de proximidad en Vigo o su área metropolitana y quieres ofrecer a tus vecinos el servicio de recepción de Tintorería Mimos, escríbenos y te explicamos cómo colaborar.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href="/se-punto-colaborador"
                onClick={(e) => onNavigate('/se-punto-colaborador', e)}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-5 sm:px-6 py-3 rounded-xl transition-colors text-center sm:whitespace-nowrap"
              >
                <span>Ver condiciones y ventajas →</span>
              </a>
              <a
                href={buildMimoWhatsAppUrl(
                  'Hola, Mimo. Tengo un comercio y me gustaría recibir información para ser Punto Mimos colaborador.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick(currentSectionPath, 'partner_acquisition_cta')
                }
                className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors text-center sm:whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>WhatsApp directo</span>
              </a>
            </div>
          </div>

        {/* Preguntas frecuentes generales SIN PRECIOS (Sección 4 y 7.9) */}
        <div className="mb-16 pt-12 border-t border-slate-200">
          <h3 className="text-2xl font-extrabold text-[#002147] mb-6">
            Preguntas frecuentes sobre nuestros servicios, precios y puntos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQ_PORTADA_SIN_PRECIOS.map((faq) => (
              <details
                key={faq.pregunta}
                className="group rounded-xl border border-slate-200 bg-white p-5 shadow-xs"
              >
                <summary className="font-bold text-[#002147] cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base min-h-[44px]">
                  <span>{faq.pregunta}</span>
                  <span
                    className="text-[#0F76BB] font-mono text-lg group-open:rotate-45 transition-transform shrink-0"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
                  {faq.respuesta}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Contacto Directo y Sede Central Navia (Sección 2, 6.14 y 7.9) */}
        <div
          id="contacto"
          className="pt-12 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-sm font-bold text-[#0F76BB] mb-1">
                Contacto directo · {CONTACT_INFO.legalName}
              </p>
              {pageMode === 'contacto' ? (
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147]">
                  Estamos a tu disposición en Navia (Vigo)
                </h2>
              ) : (
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#002147]">
                  Estamos a tu disposición en Navia (Vigo)
                </h3>
              )}
            </div>

            <dl className="space-y-4 text-sm text-slate-700">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <dt className="text-xs font-mono uppercase text-slate-500 mb-1">
                  Sede Central Mimos Navia
                </dt>
                <dd className="font-bold text-[#002147] text-base">
                  {CONTACT_INFO.streetAddress} · {CONTACT_INFO.postalCode} {CONTACT_INFO.locality} (
                  {CONTACT_INFO.region})
                </dd>
                <dd className="text-xs text-slate-600 mt-1">
                  Horario: {CONTACT_INFO.scheduleFullNavia}
                </dd>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={CONTACT_INFO.phoneHref}
                  onClick={() => trackPhoneClick(currentSectionPath, 'contact_central_phone')}
                  className="p-4 rounded-xl bg-white/95 border border-[#002147] hover:bg-[#002147] text-[#002147] hover:text-white transition-colors block min-h-[48px] group"
                >
                  <span className="text-xs text-slate-500 group-hover:text-blue-100 block mb-1">
                    Teléfono fijo central
                  </span>
                  <span className="font-extrabold text-base tabular-nums flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[#0F76BB] group-hover:text-white shrink-0" aria-hidden="true" />
                    {CONTACT_INFO.phoneDisplay}
                  </span>
                </a>

                <a
                  href={CONTACT_INFO.whatsappGeneralHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(currentSectionPath, 'contact_central_whatsapp')}
                  className="p-4 rounded-xl bg-[#1FA855] hover:bg-[#178A47] text-white transition-colors block min-h-[48px]"
                >
                  <span className="text-xs text-white/90 block mb-1">
                    WhatsApp y Asistente Mimo
                  </span>
                  <span className="font-extrabold text-white text-base tabular-nums flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    {CONTACT_INFO.whatsappNumber}
                  </span>
                </a>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-2 shadow-xs">
                <div>
                  <dt className="text-xs text-slate-500">
                    Correo electrónico oficial
                  </dt>
                  <dd className="font-bold text-[#002147]">
                    <a href={CONTACT_INFO.emailHref} className="hover:underline">
                      {CONTACT_INFO.email}
                    </a>
                  </dd>
                </div>
                <Mail className="w-5 h-5 text-[#0F76BB] shrink-0" aria-hidden="true" />
              </div>

              {/* Redes Sociales Oficiales */}
              <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5 shadow-xs">
                <div>
                  <dt className="text-xs text-slate-500 block mb-0.5">
                    Redes sociales oficiales
                  </dt>
                  <dd className="font-bold text-[#002147] text-sm">
                    Síguenos en nuestros perfiles
                  </dd>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href={CONTACT_INFO.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram oficial de Tintorería Mimos Navia"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] hover:opacity-90 shadow-xs transition-opacity"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    <span>Instagram</span>
                  </a>
                  <a
                    href={CONTACT_INFO.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook oficial de Tintorería Mimos"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#1877F2] hover:bg-[#166fe5] shadow-xs transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    <span>Facebook</span>
                  </a>
                  <a
                    href={CONTACT_INFO.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube oficial de Tintorería Mimos (@tintoreriamimosnavias.l.1658)"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#FF0000] hover:bg-[#e00000] shadow-xs transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span>YouTube</span>
                  </a>
                  <a
                    href={CONTACT_INFO.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn oficial de Tintorería Mimos Navia, S.L."
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#0A66C2] hover:bg-[#095196] shadow-xs transition-colors"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </dl>
          </div>

          {/* Formulario de Contacto General */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <h3 className="text-xl font-extrabold text-[#002147] mb-2">
                Envíanos tu consulta por WhatsApp o correo electrónico
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Completa este formulario y elige si prefieres enviar tu mensaje directamente al WhatsApp de Mimo ({CONTACT_INFO.whatsappNumber}) o por correo a {CONTACT_INFO.email}.
              </p>

              <form onSubmit={handleContactSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-nombre"
                      className="block text-sm font-bold text-[#002147] mb-1.5"
                    >
                      Nombre o empresa *
                    </label>
                    <input
                      id="contact-nombre"
                      type="text"
                      required
                      autoComplete="name"
                      aria-required="true"
                      aria-invalid={Boolean(contactError && !contactNombre.trim())}
                      aria-describedby={contactError ? 'contact-form-error' : undefined}
                      value={contactNombre}
                      onChange={(e) => {
                        setContactNombre(e.target.value);
                        setContactReady(false);
                      }}
                      placeholder="Tu nombre"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 bg-[#F4F9FE]/60 text-base sm:text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-telefono"
                      className="block text-sm font-bold text-[#002147] mb-1.5"
                    >
                      Teléfono *
                    </label>
                    <input
                      id="contact-telefono"
                      type="tel"
                      required
                      autoComplete="tel"
                      aria-required="true"
                      aria-invalid={Boolean(contactError && !contactTelefono.trim())}
                      aria-describedby={contactError ? 'contact-form-error' : undefined}
                      value={contactTelefono}
                      onChange={(e) => {
                        setContactTelefono(e.target.value);
                        setContactReady(false);
                      }}
                      placeholder="Ej.: 600 000 000"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 bg-[#F4F9FE]/60 text-base sm:text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-bold text-[#002147] mb-1.5"
                    >
                      Correo electrónico (opcional)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      value={contactEmail}
                      onChange={(e) => {
                        setContactEmail(e.target.value);
                        setContactReady(false);
                      }}
                      placeholder="tu@email.com"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 bg-[#F4F9FE]/60 text-base sm:text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-asunto"
                      className="block text-sm font-bold text-[#002147] mb-1.5"
                    >
                      Motivo de la consulta
                    </label>
                    <select
                      id="contact-asunto"
                      value={contactAsunto}
                      onChange={(e) => {
                        setContactAsunto(e.target.value);
                        setContactReady(false);
                      }}
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 bg-[#F4F9FE]/60 text-base sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                    >
                      <option value="Consulta de precio o prenda">Consulta de precio o prenda</option>
                      <option value="Consulta de Costura y Arreglos de Ropa">
                        Consulta de Costura y Arreglos de Ropa
                      </option>
                      <option value="Recogida y entrega a domicilio">Recogida y entrega a domicilio</option>
                      <option value="Presupuesto Apartamentos Turísticos">
                        Presupuesto Apartamentos Turísticos
                      </option>
                      <option value="Presupuesto Limpieza Profesional / Empresa">
                        Presupuesto Limpieza Profesional / Empresa
                      </option>
                      <option value="Quiero ser Punto Mimos colaborador">
                        Quiero ser Punto Mimos colaborador
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-mensaje"
                    className="block text-sm font-bold text-[#002147] mb-1.5"
                  >
                    Tu consulta *
                  </label>
                  <textarea
                    id="contact-mensaje"
                    rows={3}
                    required
                    aria-required="true"
                    aria-invalid={Boolean(contactError && !contactMensaje.trim())}
                    aria-describedby={contactError ? 'contact-form-error' : undefined}
                    value={contactMensaje}
                    onChange={(e) => {
                      setContactMensaje(e.target.value);
                      setContactReady(false);
                    }}
                    placeholder="Indícanos qué prenda o servicio necesitas consultar..."
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-300 bg-[#F4F9FE]/60 text-base sm:text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                  />
                </div>

                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer py-1">
                  <input
                    type="checkbox"
                    checked={contactPrivacidad}
                    onChange={(e) => {
                      setContactPrivacidad(e.target.checked);
                      setContactError('');
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-slate-300 text-[#0F76BB] focus:ring-[#0F76BB]"
                  />
                  <span>
                    He leído y acepto la{' '}
                    <a
                      href="/privacidad"
                      onClick={(e) => onNavigate('/privacidad', e)}
                      className="underline font-bold text-[#0F76BB]"
                    >
                      política de privacidad
                    </a>
                    .
                  </span>
                </label>

                {contactError && (
                  <p id="contact-form-error" role="alert" className="text-xs font-bold text-red-600">
                    {contactError}
                  </p>
                )}

                {!contactReady ? (
                  <button
                    type="submit"
                    className="w-full min-h-[48px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-colors cursor-pointer"
                  >
                    Preparar consulta
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-[#EDF5FD] border border-[#0F76BB]/25 flex flex-col sm:flex-row gap-3">
                    <a
                      href={contactWhatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackWhatsAppClick(currentSectionPath, 'contact_form')
                      }
                      className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Enviar por WhatsApp a Mimo</span>
                    </a>
                    <a
                      href={contactMailtoHref}
                      className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-white/95 border border-[#002147] hover:bg-[#002147] text-[#002147] hover:text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors"
                    >
                      <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Enviar por Email</span>
                    </a>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Ficha Detallada de Establecimiento con gestión accesible Dialog */}
      <Dialog
        isOpen={Boolean(puntoModalFicha)}
        onClose={() => setPuntoModalFicha(null)}
        titleId={puntoModalFicha ? 'modal-ficha-titulo' : undefined}
        maxWidthClass={
          puntoModalFicha?.id === 'as-teixugueiras' ||
          puntoModalFicha?.id === 'punto-o-porrino' ||
          puntoModalFicha?.id === 'punto-gondomar' ||
          puntoModalFicha?.id === 'punto-redondela' ||
          puntoModalFicha?.id === 'punto-ponteareas'
            ? 'max-w-5xl'
            : 'max-w-2xl'
        }
      >
        {puntoModalFicha && (
          puntoModalFicha.id === 'as-teixugueiras' ? (
            <div className="overflow-y-auto max-h-[92vh]">
              <React.Suspense
                fallback={
                  <div className="p-8 text-center text-sm font-semibold text-slate-600">
                    Cargando ficha de tienda...
                  </div>
                }
              >
                <TiendaNaviaFicha
                  isModal={true}
                  onClose={() => setPuntoModalFicha(null)}
                  onNavigate={onNavigate}
                />
              </React.Suspense>
            </div>
          ) : puntoModalFicha.id === 'punto-o-porrino' ? (
            <div className="overflow-y-auto max-h-[92vh]">
              <React.Suspense
                fallback={
                  <div className="p-8 text-center text-sm font-semibold text-slate-600">
                    Cargando ficha de punto colaborador...
                  </div>
                }
              >
                <PuntoTelasMasFicha
                  isModal={true}
                  onClose={() => setPuntoModalFicha(null)}
                  onNavigate={onNavigate}
                />
              </React.Suspense>
            </div>
          ) : puntoModalFicha.id === 'punto-gondomar' ? (
            <div className="overflow-y-auto max-h-[92vh]">
              <React.Suspense
                fallback={
                  <div className="p-8 text-center text-sm font-semibold text-slate-600">
                    Cargando ficha de punto colaborador...
                  </div>
                }
              >
                <PuntoGondomarFicha
                  isModal={true}
                  onClose={() => setPuntoModalFicha(null)}
                  onNavigate={onNavigate}
                />
              </React.Suspense>
            </div>
          ) : puntoModalFicha.id === 'punto-redondela' ? (
            <div className="overflow-y-auto max-h-[92vh]">
              <React.Suspense
                fallback={
                  <div className="p-8 text-center text-sm font-semibold text-slate-600">
                    Cargando ficha de punto colaborador...
                  </div>
                }
              >
                <PuntoRedondelaFicha
                  isModal={true}
                  onClose={() => setPuntoModalFicha(null)}
                  onNavigate={onNavigate}
                />
              </React.Suspense>
            </div>
          ) : puntoModalFicha.id === 'punto-ponteareas' ? (
            <div className="overflow-y-auto max-h-[92vh]">
              <React.Suspense
                fallback={
                  <div className="p-8 text-center text-sm font-semibold text-slate-600">
                    Cargando ficha de punto colaborador...
                  </div>
                }
              >
                <PuntoArregla2Ficha
                  isModal={true}
                  onClose={() => setPuntoModalFicha(null)}
                  onNavigate={onNavigate}
                />
              </React.Suspense>
            </div>
          ) : (
            <>
              {/* Cabecera del Modal */}
              <div className="relative px-6 py-5 bg-gradient-to-r from-[#F4F9FE] to-[#EDF5FD] border-b border-slate-200 text-[#002147] shrink-0">
                <button
                  type="button"
                  onClick={() => setPuntoModalFicha(null)}
                  className="absolute top-4 right-4 w-11 h-11 inline-flex items-center justify-center rounded-full bg-white border border-slate-200 hover:bg-slate-100 text-[#002147] transition-colors cursor-pointer"
                  aria-label="Cerrar ficha de la tienda"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-[#0F76BB]/25 text-xs font-bold text-[#0F76BB] mb-2">
                  {puntoModalFicha.tipo === 'tienda' ? (
                    <>
                      <Store className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Tienda Propia Mimos · Taller in situ</span>
                    </>
                  ) : (
                    <>
                      <Handshake className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Punto Colaborador Oficial</span>
                    </>
                  )}
                </div>

                <h3 id="modal-ficha-titulo" className="text-xl sm:text-2xl font-black text-[#002147] pr-12">
                  {puntoModalFicha.nombre_mostrado}
                </h3>
                <p className="text-xs text-slate-600 font-medium">
                  {puntoModalFicha.tipo === 'tienda'
                    ? 'Tintorería Mimos Navia, S.L. · Atención y taller directo'
                    : `Comercio colaborador: ${puntoModalFicha.nombre_comercio}`}
                </p>
              </div>

              {/* Contenido scrolleable de la ficha */}
              <div className="px-6 py-5 overflow-y-auto space-y-5 text-slate-800">
                {/* Fotografías del establecimiento si están disponibles */}
                {puntoModalFicha.id === 'punto-redondela' ? (
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#002147]">
                      Fotografías del establecimiento
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 bg-[#F4F9FE]">
                        <img
                          src="/images/mimos-redondela/fachada-mimos-redondela.webp"
                          alt="Fachada de Mimos Redondela"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 bg-[#F4F9FE]">
                        <img
                          src="/images/mimos-redondela/interior-mostrador-mimos-redondela.webp"
                          alt="Interior y mostrador de Mimos Redondela"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 bg-[#F4F9FE]">
                        <img
                          src="/images/mimos-redondela/escaparate-acceso-mimos-redondela.webp"
                          alt="Acceso comercial de Mimos Redondela"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                ) : puntoModalFicha.id === 'punto-ponteareas' ? (
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#002147]">
                      Fotografías del establecimiento
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 bg-[#F4F9FE]">
                        <img
                          src="/images/arregla2-ponteareas/fachada-arregla2-ponteareas.webp"
                          alt="Fachada de Arregla2 Ponteareas"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 bg-[#F4F9FE]">
                        <img
                          src="/images/arregla2-ponteareas/interior-taller-arregla2-ponteareas.webp"
                          alt="Interior y taller de costura de Arregla2 Ponteareas"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 bg-[#F4F9FE]">
                        <img
                          src="/images/arregla2-ponteareas/escaparate-arregla2-ponteareas.webp"
                          alt="Acceso comercial y escaparate de Arregla2 Ponteareas"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                ) : puntoModalFicha.foto ? (
                  <div className="aspect-[16/9] rounded-xl overflow-hidden border border-slate-200 bg-[#F4F9FE]">
                    <img
                      src={puntoModalFicha.foto}
                      alt={`Instalaciones de ${puntoModalFicha.nombre_mostrado}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : null}

                {/* Ubicación y accesos */}
                <div className="p-4 rounded-xl bg-[#F4F9FE] border border-slate-200 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-5 h-5 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-slate-500">Dirección física</p>
                      <p className="text-sm font-bold text-[#002147]">
                        {puntoModalFicha.direccion} · {puntoModalFicha.codigo_postal} {puntoModalFicha.localidad}
                      </p>
                    </div>
                  </div>

                  {puntoModalFicha.referencia_local && (
                    <div className="flex items-start gap-2.5">
                      <Navigation className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500">Referencia visual</p>
                        <p className="text-xs text-slate-700 font-medium">
                          {puntoModalFicha.referencia_local}
                        </p>
                      </div>
                    </div>
                  )}

                  {puntoModalFicha.aparcamiento && (
                    <div className="flex items-start gap-2.5">
                      <Car className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500">Aparcamiento y descarga</p>
                        <p className="text-xs text-slate-700 font-medium">
                          {puntoModalFicha.aparcamiento}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Horario y Teléfonos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-[#F7F6F2] border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#002147]">
                        Horario de atención
                      </h4>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {puntoModalFicha.horario.resumen}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-2">
                      Domingos y festivos: Cerrado
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-[#F7F6F2] border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#002147]">
                        Contacto directo
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 mb-1">Teléfono tienda:</p>
                    <a
                      href={`tel:+34${puntoModalFicha.telefono}`}
                      className="text-base font-extrabold text-[#002147] hover:text-[#0F76BB] hover:underline block mb-2"
                    >
                      {puntoModalFicha.telefonos_mostrados}
                    </a>
                    <a
                      href={buildMimoWhatsAppUrl(
                        `Hola, Mimo. Quiero hacer una consulta sobre la tienda ${puntoModalFicha.nombre_mostrado} (${puntoModalFicha.direccion})`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#178A47] hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>WhatsApp Mimos ({CONTACT_INFO.whatsappNumber})</span>
                    </a>
                  </div>
                </div>

                {/* Taller de costura y arreglos si aplica */}
                {puntoModalFicha.arreglos_confirmados && puntoModalFicha.arreglos_confirmados.length > 0 && (
                  <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#178A47] flex items-center gap-1.5">
                        <Scissors className="w-4 h-4" aria-hidden="true" />
                        <span>Taller propio de costura y arreglos (In situ)</span>
                      </h4>
                      <a
                        href="/arreglos-de-ropa-vigo"
                        onClick={(e) => {
                          setPuntoModalFicha(null);
                          onNavigate('/arreglos-de-ropa-vigo', e);
                        }}
                        className="text-xs font-bold text-[#0F76BB] hover:underline"
                      >
                        Ver tarifas y prendas →
                      </a>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700">
                      {puntoModalFicha.arreglos_confirmados.map((arr) => (
                        <li key={arr} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#178A47] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{arr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Servicios confirmados */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#002147] mb-2">
                    Servicios disponibles en este punto
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {derivarEtiquetasServicios(puntoModalFicha.servicios_confirmados).map((srv) => (
                      <span
                        key={srv}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-[#F4F9FE] border border-slate-200 text-[#002147]"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#0F76BB]" aria-hidden="true" />
                        <span>{srv}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Instrucciones de recogida y entrega */}
                <div className="p-3.5 rounded-lg bg-[#EDF5FD] border border-[#0F76BB]/25 text-xs text-slate-700">
                  <p className="font-bold text-[#002147] mb-1">
                    Recepción y entrega de prendas:
                  </p>
                  <p>{puntoModalFicha.instrucciones_entrega_recogida}</p>
                </div>
              </div>

              {/* Pie de botones de acción */}
              <div className="px-6 py-4 bg-[#F4F9FE] border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <a
                  href={buildGoogleMapsUrl(puntoModalFicha)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[44px] text-xs font-bold text-[#002147] hover:text-[#0F76BB]"
                >
                  <span>Cómo llegar (Google Maps)</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>

                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`tel:+34${puntoModalFicha.telefono}`}
                    onClick={() =>
                      trackPhoneClick(currentSectionPath, 'point_modal', {
                        store_id: puntoModalFicha.id,
                      })
                    }
                    className="inline-flex items-center justify-center gap-1 min-h-[44px] text-xs font-bold px-3.5 py-2 rounded-xl bg-white/95 border border-[#002147] hover:bg-[#002147] text-[#002147] hover:text-white transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Llamar</span>
                  </a>

                  <a
                    href={buildMimoWhatsAppUrl(
                      `Hola, Mimo. Quiero consultar para la tienda de ${puntoModalFicha.nombre_mostrado}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick(currentSectionPath, 'point_modal', {
                        store_id: puntoModalFicha.id,
                      })
                    }
                    className="inline-flex items-center justify-center gap-1 min-h-[44px] text-xs font-bold px-3.5 py-2 rounded-xl bg-[#1FA855] hover:bg-[#178A47] text-white transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setPuntoModalFicha(null)}
                    className="min-h-[44px] text-xs font-bold px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-[#002147] transition-colors cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </>
          )
        )}
      </Dialog>
    </section>
    </>
  );
};
