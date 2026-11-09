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
  Sparkles,
  Map as MapIcon,
} from 'lucide-react';
import { getStoreStatusById } from '../utils/storeStatus';
import {
  CONTACT_INFO,
  REGISTROS_PUNTOS,
  TIENDAS_PROPIAS,
  PUNTOS_COLABORADORES,
  ZONAS_SERVICIO,
  ZONAS_SEO_LOCAL,
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

const MimosGoogleMap = React.lazy(() =>
  import('./MimosGoogleMap').then((m) => ({ default: m.MimosGoogleMap }))
);
import { PuntoTelasMasFicha } from './PuntoTelasMasFicha';
import { PuntoGondomarFicha } from './PuntoGondomarFicha';
import { PuntoRedondelaFicha } from './PuntoRedondelaFicha';
import { PuntoArregla2Ficha } from './PuntoArregla2Ficha';
import { Dialog } from './Dialog';

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

  // Carga diferida inteligente de Google Maps: solo cuando se acerca al viewport o el usuario lo activa
  const mapRef = React.useRef<HTMLDivElement>(null);
  const [mapShouldLoad, setMapShouldLoad] = useState<boolean>(pageMode === 'puntos');

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
      { rootMargin: '300px' }
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
    const zonaPage = ZONAS_SEO_LOCAL.find((z) => z.localidad === punto.localidad);
    const mapsHref = buildGoogleMapsUrl(punto);
    const tieneCostura = punto.servicios_confirmados.includes('costura_arreglos');

    return (
      <article
        key={punto.id}
        className={`rounded-3xl border flex flex-col justify-between transition-all duration-300 overflow-hidden shadow-sm hover:shadow-xl bg-white dark:bg-[#071324] ${
          punto.tipo === 'tienda'
            ? 'border-[#002147]/20 dark:border-[#0F76BB]/40'
            : 'border-slate-200 dark:border-slate-800'
        }`}
      >
        <div>
          {punto.foto ? (
            /* Foto real en cabecera con reclamo visual */
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
              <img
                src={punto.foto}
                alt={`Fachada de ${punto.nombre_mostrado}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

              {/* Badge superior flotante */}
              <div className="absolute top-3.5 left-3.5 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-mono uppercase tracking-wider bg-[#002147] text-white shadow-md">
                  <Store className="w-4 h-4 text-white" aria-hidden="true" />
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
                      ? 'bg-[#002147] text-white dark:bg-[#0F76BB]'
                      : 'bg-slate-100 text-[#002147] dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
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
              <h3 className="text-2xl font-black text-[#002147] dark:text-white tracking-tight">
                {punto.nombre_mostrado}
              </h3>
              {punto.tipo === 'punto' && (
                <p className="text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] mt-1">
                  Comercio colaborador: {punto.nombre_comercio}
                </p>
              )}
            </div>

            {/* Datos principales con iconos */}
            <dl className="space-y-2.5 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Dirección</dt>
                  <dd className="font-bold text-slate-800 dark:text-slate-100">
                    {punto.direccion} · <span className="font-mono">{punto.codigo_postal}</span> {punto.localidad}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <dt className="sr-only">Horario</dt>
                  <dd className="text-slate-700 dark:text-slate-200 font-medium">
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
                      className="font-extrabold text-[#0F76BB] dark:text-[#60B5F6] hover:underline tabular-nums text-base"
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
                    <dd className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-snug">
                      <strong className="text-slate-800 dark:text-slate-100">Ubicación:</strong> {punto.referencia_local}
                    </dd>
                  </div>
                </div>
              )}

              {punto.aparcamiento && (
                <div className="flex items-start gap-2.5">
                  <Car className="w-5 h-5 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <dt className="sr-only">Aparcamiento</dt>
                    <dd className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-snug">
                      <strong className="text-slate-800 dark:text-slate-100">Aparcamiento:</strong> {punto.aparcamiento}
                    </dd>
                  </div>
                </div>
              )}
            </dl>

            {/* Texto de recepción y entrega */}
            {punto.instrucciones_entrega_recogida && (
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1">
                {punto.instrucciones_entrega_recogida}
              </p>
            )}

            {/* Caja de Servicios Confirmados en este establecimiento */}
            {punto.servicios_confirmados.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/60 dark:bg-[#0b1d36] border border-blue-200/70 dark:border-blue-900/40">
                <p className="text-xs font-bold uppercase tracking-wider text-[#002147] dark:text-slate-200 mb-3">
                  Servicios confirmados en este establecimiento:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
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
                  <div className="mt-3.5 pt-3.5 border-t border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <Scissors className="w-4 h-4 text-[#178A47]" aria-hidden="true" />
                        <span className="text-xs font-bold text-[#178A47] dark:text-[#4ade80]">
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
                        className="text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
                      >
                        Ver arreglos →
                      </a>
                    </div>
                    {punto.id === 'as-teixugueiras' && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-4 mb-1.5 leading-snug">
                        Recepción directa en tienda central para su confección y ajuste con nuestro taller propio de costura.
                      </p>
                    )}
                    {punto.tipo === 'punto' && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-4 mb-1.5 leading-snug">
                        Servicio de costura y composturas realizado de forma independiente por el propio taller de {punto.nombre_comercio}.
                      </p>
                    )}
                    {punto.arreglos_confirmados && punto.arreglos_confirmados.length > 0 && (
                      <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300 pl-4">
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

        {/* Acciones del pie de tarjeta (Exactas a Captura 1) */}
        <div className="p-6 pt-0">
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            {/* Fila 1: Botón Ver ficha detallada + Cómo llegar */}
            <div className="flex items-center gap-3">
              {punto.id === 'gregorio-espino' ? (
                <a
                  href="/tienda-mimos-gregorio-espino-vigo"
                  onClick={(e) => onNavigate('/tienda-mimos-gregorio-espino-vigo', e)}
                  className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0a3161] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Ver ficha detallada</span>
                </a>
              ) : punto.id === 'punto-o-porrino' ? (
                <a
                  href="/zonas/o-porrino"
                  onClick={(e) => onNavigate('/zonas/o-porrino', e)}
                  className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0a3161] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Ver ficha detallada</span>
                </a>
              ) : punto.id === 'punto-gondomar' ? (
                <a
                  href="/zonas/gondomar"
                  onClick={(e) => onNavigate('/zonas/gondomar', e)}
                  className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0a3161] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Ver ficha y fotos</span>
                </a>
              ) : punto.id === 'punto-redondela' ? (
                <a
                  href="/zonas/redondela"
                  onClick={(e) => onNavigate('/zonas/redondela', e)}
                  className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0a3161] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Ver ficha y fotos</span>
                </a>
              ) : punto.id === 'punto-ponteareas' ? (
                <a
                  href="/zonas/ponteareas"
                  onClick={(e) => onNavigate('/zonas/ponteareas', e)}
                  className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0a3161] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Ver ficha y fotos</span>
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setPuntoModalFicha(punto)}
                  className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0a3161] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs cursor-pointer"
                >
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  <span>Ver ficha detallada</span>
                </button>
              )}

              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
              >
                <span>Cómo llegar</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>

            {/* Fila 2: Ver en mapa | WhatsApp | Ver ficha de {localidad} */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500 pt-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedMapPuntoId(punto.id);
                  document.getElementById('mapa-interactivo-puntos')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-[#0F76BB] dark:text-[#60B5F6] hover:underline cursor-pointer"
              >
                <MapIcon className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Ver en mapa</span>
              </button>

              <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">|</span>

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
                className="inline-flex items-center gap-1.5 text-[#178A47] dark:text-[#4ade80] hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>WhatsApp</span>
              </a>

              {zonaPage && (
                <>
                  <span className="text-slate-300 dark:text-slate-700" aria-hidden="true">|</span>
                  <a
                    href={zonaPage.url}
                    onClick={(e) => onNavigate(zonaPage.url, e)}
                    className="inline-flex items-center gap-1 text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
                  >
                    <span>Ver ficha de {punto.localidad}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </article>
    );
  };

  return (
    <section
      id="puntos"
      aria-labelledby="puntos-heading"
      className="py-16 lg:py-24 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado de Tiendas y Puntos (Sección 5 y 7.5 del Plan Maestro) */}
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-2">
            {TIENDAS_PROPIAS.length} tiendas propias en Vigo y {PUNTOS_COLABORADORES.length} puntos de recogida colaboradores
          </p>
          {pageMode === 'contacto' ? (
            <h1
              id="puntos-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight mb-4"
            >
              Contacto, tiendas propias en Vigo y horarios de Tintorería Mimos Navia
            </h1>
          ) : pageMode === 'puntos' ? (
            <h1
              id="puntos-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight mb-4"
            >
              Red de tiendas propias de Tintorería Mimos en Vigo y puntos colaboradores
            </h1>
          ) : (
            <h2
              id="puntos-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight mb-4"
            >
              Red de tiendas propias de Tintorería Mimos y puntos colaboradores en la comarca
            </h2>
          )}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Diferenciamos con total transparencia nuestras <strong>{TIENDAS_PROPIAS.length} tiendas propias en Vigo</strong> de los <strong>{PUNTOS_COLABORADORES.length} establecimientos colaboradores</strong> en {ZONAS_SERVICIO.join(', ')} donde puedes depositar y recoger tus encargos.
          </p>
        </div>

        {/* Tarjetas de Acceso Directo a las 5 Páginas por Localidad (/zonas/...) */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h3 className="text-sm sm:text-base font-extrabold text-[#002147] dark:text-white">
              Selecciona tu municipio para ver su página local e instrucciones paso a paso:
            </h3>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              {ZONAS_SERVICIO.join(' · ')}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {ZONAS_SEO_LOCAL.map((zona) => (
              <a
                key={zona.slug}
                href={zona.url}
                onClick={(e) => onNavigate(zona.url, e)}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB] bg-slate-50/70 dark:bg-[#0b1d36] transition-colors flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-base font-extrabold text-[#002147] dark:text-white group-hover:text-[#0F76BB] dark:group-hover:text-[#60B5F6]">
                      {zona.localidad}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {zona.comarca} · CP {zona.codigosPostales}
                  </p>
                </div>
                <span className="mt-3 text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] group-hover:underline">
                  Ver puntos en {zona.localidad} →
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
                <span className="p-1.5 rounded-lg bg-[#0F76BB]/10 text-[#0F76BB] dark:bg-[#0F76BB]/20">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white">
                  Mapa interactivo de tiendas propias y puntos colaboradores
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                Explora las 3 tiendas propias en Vigo y los 5 puntos colaboradores (Redondela, Gondomar, Ponteareas, O Porriño y D'Passo en Vigo). Pulsa en cualquier chincheta para ver horarios, teléfono y ruta directa en Google Maps.
              </p>
            </div>
          </div>
          {!mapShouldLoad ? (
            <div className="w-full h-[430px] sm:h-[490px] lg:h-[530px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#071324] flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#0F76BB]/10 flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-[#0F76BB]" />
              </div>
              <h4 className="font-extrabold text-[#002147] dark:text-white text-lg sm:text-xl mb-2">
                Mapa interactivo de tiendas y puntos Mimos
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mb-5 leading-relaxed">
                3 tiendas propias en Vigo y 5 puntos colaboradores oficiales en Redondela, Gondomar, Ponteareas, O Porriño y As Travesas.
              </p>
              <button
                type="button"
                onClick={() => setMapShouldLoad(true)}
                className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0F76BB] text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                <MapIcon className="w-4 h-4" />
                <span>Cargar mapa interactivo</span>
              </button>
            </div>
          ) : (
            <React.Suspense
              fallback={
                <div className="w-full h-[430px] sm:h-[490px] lg:h-[530px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#071324] flex flex-col items-center justify-center p-6 text-center animate-pulse">
                  <div className="w-12 h-12 rounded-full bg-[#0F76BB]/10 flex items-center justify-center mb-3">
                    <MapPin className="w-6 h-6 text-[#0F76BB] animate-bounce" />
                  </div>
                  <p className="font-extrabold text-[#002147] dark:text-white text-base">
                    Cargando mapa interactivo de Mimos...
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
              />
            </React.Suspense>
          )}
        </div>

        {/* Buscador por localidad o código postal + Filtros */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/70 dark:bg-[#071324] rounded-xl w-fit">
            {['Todos', ...ZONAS_SERVICIO].map((zona) => {
              const active = selectedZone === zona;
              return (
                <button
                  key={zona}
                  type="button"
                  onClick={() => setSelectedZone(zona)}
                  aria-pressed={active}
                  className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#002147] text-white dark:bg-[#0F76BB]'
                      : 'text-slate-700 dark:text-slate-300 hover:text-[#002147]'
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
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-xs sm:text-sm font-bold text-[#002147] dark:text-white focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-xs sm:text-sm font-bold text-[#002147] dark:text-white focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Bloque 1: Las 3 Tiendas Propias en Vigo */}
        {tiendasFiltradas.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2.5 mb-4">
              <Store className="w-5 h-5 text-[#002147] dark:text-[#60B5F6]" aria-hidden="true" />
              <h3 className="text-xl font-extrabold text-[#002147] dark:text-white">
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
              <Handshake className="w-5 h-5 text-[#0F76BB] dark:text-[#60B5F6]" aria-hidden="true" />
              <h3 className="text-xl font-extrabold text-[#002147] dark:text-white">
                Puntos de recogida en establecimientos colaboradores ({colaboradoresFiltrados.length})
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
              Comercios colaboradores donde está disponible el servicio de entrega y recogida de encargos de Tintorería Mimos Navia, S.L.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colaboradoresFiltrados.map(renderPuntoCard)}
            </div>
          </div>
        )}

        {/* Bloque para captar nuevos comercios colaboradores (Sección 5 del Plan Maestro) */}
        <div className="mb-16 rounded-2xl border border-[#0F76BB]/40 bg-white dark:bg-[#071324] p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-mono uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6] font-bold mb-1">
              Red de comercios colaboradores Mimos
            </p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-2">
              ¿Tienes un comercio y quieres ser punto Mimos?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Si tienes una tienda de arreglos, mercería, zapatería o comercio de proximidad en Vigo o su área metropolitana y quieres ofrecer a tus vecinos el servicio de recepción de Tintorería Mimos, escríbenos y te explicamos cómo colaborar.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <a
              href="/se-punto-colaborador"
              onClick={(e) => onNavigate('/se-punto-colaborador', e)}
              className="inline-flex items-center justify-center gap-2 bg-[#0F76BB] hover:bg-[#0d649e] text-white font-bold text-sm px-5 sm:px-6 py-3.5 rounded-xl transition-colors text-center sm:whitespace-nowrap"
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
              className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0a3161] dark:bg-white/10 dark:hover:bg-white/20 text-white font-bold text-sm px-4 sm:px-5 py-3.5 rounded-xl transition-colors text-center sm:whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 shrink-0 text-[#4ade80]" aria-hidden="true" />
              <span>WhatsApp directo</span>
            </a>
          </div>
        </div>

        {/* Preguntas frecuentes generales SIN PRECIOS (Sección 4 y 7.9) */}
        <div className="mb-16 pt-12 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-2xl font-extrabold text-[#002147] dark:text-white mb-6">
            Preguntas frecuentes sobre nuestros servicios, precios y puntos
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FAQ_PORTADA_SIN_PRECIOS.map((faq) => (
              <details
                key={faq.pregunta}
                className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-5"
              >
                <summary className="font-bold text-[#002147] dark:text-white cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base">
                  <span>{faq.pregunta}</span>
                  <span
                    className="text-[#0F76BB] font-mono text-lg group-open:rotate-45 transition-transform"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-3 border-t border-slate-100 dark:border-slate-800">
                  {faq.respuesta}
                </p>
              </details>
            ))}
          </div>
        </div>

        {/* Contacto Directo y Sede Central Navia (Sección 2, 6.14 y 7.9) */}
        <div
          id="contacto"
          className="pt-12 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                Contacto directo · {CONTACT_INFO.legalName}
              </p>
              {pageMode === 'contacto' ? (
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white">
                  Estamos a tu disposición en Navia (Vigo)
                </h2>
              ) : (
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white">
                  Estamos a tu disposición en Navia (Vigo)
                </h3>
              )}
            </div>

            <dl className="space-y-4 text-sm text-slate-700 dark:text-slate-300">
              <div className="p-4 rounded-xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-800">
                <dt className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1">
                  Sede Central Mimos Navia
                </dt>
                <dd className="font-bold text-[#002147] dark:text-white text-base">
                  {CONTACT_INFO.streetAddress} · {CONTACT_INFO.postalCode} {CONTACT_INFO.locality} (
                  {CONTACT_INFO.region})
                </dd>
                <dd className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  Horario: {CONTACT_INFO.scheduleFullNavia}
                </dd>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={CONTACT_INFO.phoneHref}
                  onClick={() => trackPhoneClick(currentSectionPath, 'contact_central_phone')}
                  className="p-4 rounded-xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB] transition-colors block"
                >
                  <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                    Teléfono fijo central
                  </span>
                  <span className="font-extrabold text-[#002147] dark:text-white text-base tabular-nums flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                    {CONTACT_INFO.phoneDisplay}
                  </span>
                </a>

                <a
                  href={CONTACT_INFO.whatsappGeneralHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(currentSectionPath, 'contact_central_whatsapp')}
                  className="p-4 rounded-xl bg-[#178A47] hover:bg-[#126E38] text-white transition-colors block"
                >
                  <span className="text-xs text-white/85 block mb-1">
                    WhatsApp y Asistente Mimo
                  </span>
                  <span className="font-extrabold text-white text-base tabular-nums flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    {CONTACT_INFO.whatsappNumber}
                  </span>
                </a>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <dt className="text-xs text-slate-500 dark:text-slate-400">
                    Correo electrónico oficial
                  </dt>
                  <dd className="font-bold text-[#002147] dark:text-white">
                    <a href={CONTACT_INFO.emailHref} className="hover:underline">
                      {CONTACT_INFO.email}
                    </a>
                  </dd>
                </div>
                <Mail className="w-5 h-5 text-[#0F76BB]" aria-hidden="true" />
              </div>

              {/* Redes Sociales Oficiales */}
              <div className="p-4 rounded-xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div>
                  <dt className="text-xs text-slate-500 dark:text-slate-400 block mb-0.5">
                    Redes sociales oficiales
                  </dt>
                  <dd className="font-bold text-[#002147] dark:text-white text-sm">
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
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-8">
              <h3 className="text-xl font-extrabold text-[#002147] dark:text-white mb-2">
                Envíanos tu consulta por WhatsApp o correo electrónico
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                Completa este formulario y elige si prefieres enviar tu mensaje directamente al WhatsApp de Mimo ({CONTACT_INFO.whatsappNumber}) o por correo a {CONTACT_INFO.email}.
              </p>

              <form onSubmit={handleContactSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-nombre"
                      className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1d36] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-telefono"
                      className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1d36] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1d36] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-asunto"
                      className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1d36] text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
                    className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1d36] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                  />
                </div>

                <label className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={contactPrivacidad}
                    onChange={(e) => {
                      setContactPrivacidad(e.target.checked);
                      setContactError('');
                    }}
                    className="mt-0.5 rounded border-slate-300 text-[#002147] focus:ring-[#0F76BB]"
                  />
                  <span>
                    He leído y acepto la{' '}
                    <a
                      href="/privacidad"
                      onClick={(e) => onNavigate('/privacidad', e)}
                      className="underline font-bold text-[#002147] dark:text-[#60B5F6]"
                    >
                      política de privacidad
                    </a>
                    .
                  </span>
                </label>

                {contactError && (
                  <p id="contact-form-error" role="alert" className="text-xs font-bold text-red-600 dark:text-red-400">
                    {contactError}
                  </p>
                )}

                {!contactReady ? (
                  <button
                    type="submit"
                    className="w-full bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] dark:hover:bg-[#0B5C94] text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-colors cursor-pointer"
                  >
                    Preparar consulta
                  </button>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-[#0b1d36] border border-slate-300 dark:border-slate-700 flex flex-col sm:flex-row gap-3">
                    <a
                      href={contactWhatsAppHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackWhatsAppClick(currentSectionPath, 'contact_form')
                      }
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm py-3 px-4 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Enviar por WhatsApp a Mimo</span>
                    </a>
                    <a
                      href={contactMailtoHref}
                      className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0a3161] text-white font-bold text-sm py-3 px-4 rounded-lg transition-colors"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
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
          puntoModalFicha?.id === 'punto-o-porrino' ||
          puntoModalFicha?.id === 'punto-gondomar' ||
          puntoModalFicha?.id === 'punto-redondela' ||
          puntoModalFicha?.id === 'punto-ponteareas'
            ? 'max-w-5xl'
            : 'max-w-2xl'
        }
      >
        {puntoModalFicha && (
          puntoModalFicha.id === 'punto-o-porrino' ? (
            <div className="overflow-y-auto max-h-[92vh]">
              <PuntoTelasMasFicha
                isModal={true}
                onClose={() => setPuntoModalFicha(null)}
                onNavigate={onNavigate}
              />
            </div>
          ) : puntoModalFicha.id === 'punto-gondomar' ? (
            <div className="overflow-y-auto max-h-[92vh]">
              <PuntoGondomarFicha
                isModal={true}
                onClose={() => setPuntoModalFicha(null)}
                onNavigate={onNavigate}
              />
            </div>
          ) : puntoModalFicha.id === 'punto-redondela' ? (
            <div className="overflow-y-auto max-h-[92vh]">
              <PuntoRedondelaFicha
                isModal={true}
                onClose={() => setPuntoModalFicha(null)}
                onNavigate={onNavigate}
              />
            </div>
          ) : puntoModalFicha.id === 'punto-ponteareas' ? (
            <div className="overflow-y-auto max-h-[92vh]">
              <PuntoArregla2Ficha
                isModal={true}
                onClose={() => setPuntoModalFicha(null)}
                onNavigate={onNavigate}
              />
            </div>
          ) : (
            <>
              {/* Cabecera del Modal */}
              <div className="relative px-6 py-5 bg-gradient-to-r from-[#002147] to-[#0F76BB] text-white shrink-0">
                <button
                  type="button"
                  onClick={() => setPuntoModalFicha(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Cerrar ficha de la tienda"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-xs font-bold text-white mb-2">
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

                <h3 id="modal-ficha-titulo" className="text-xl sm:text-2xl font-black text-white">
                  {puntoModalFicha.nombre_mostrado}
                </h3>
                <p className="text-xs text-blue-100 font-medium">
                  {puntoModalFicha.tipo === 'tienda'
                    ? 'Tintorería Mimos Navia, S.L. · Atención y taller directo'
                    : `Comercio colaborador: ${puntoModalFicha.nombre_comercio}`}
                </p>
              </div>

              {/* Contenido scrolleable de la ficha */}
              <div className="px-6 py-5 overflow-y-auto space-y-5 text-slate-800 dark:text-slate-100">
                {/* Fotografías del establecimiento si están disponibles */}
                {puntoModalFicha.id === 'punto-redondela' ? (
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#002147] dark:text-slate-200">
                      Fotografías del establecimiento
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900">
                        <img
                          src="/images/mimos-redondela/fachada-mimos-redondela.jpg"
                          alt="Fachada de Mimos Redondela"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900">
                        <img
                          src="/images/mimos-redondela/interior-mostrador-mimos-redondela.jpg"
                          alt="Interior y mostrador de Mimos Redondela"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900">
                        <img
                          src="/images/mimos-redondela/escaparate-acceso-mimos-redondela.jpg"
                          alt="Acceso comercial de Mimos Redondela"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                ) : puntoModalFicha.id === 'punto-ponteareas' ? (
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#002147] dark:text-slate-200">
                      Fotografías del establecimiento
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900">
                        <img
                          src="/images/arregla2-ponteareas/fachada-arregla2-ponteareas.jpg"
                          alt="Fachada de Arregla2 Ponteareas"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900">
                        <img
                          src="/images/arregla2-ponteareas/interior-taller-arregla2-ponteareas.jpg"
                          alt="Interior y taller de costura de Arregla2 Ponteareas"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900">
                        <img
                          src="/images/arregla2-ponteareas/escaparate-arregla2-ponteareas.jpg"
                          alt="Acceso comercial y escaparate de Arregla2 Ponteareas"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                ) : puntoModalFicha.foto ? (
                  <div className="aspect-[16/9] rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900">
                    <img
                      src={puntoModalFicha.foto}
                      alt={`Instalaciones de ${puntoModalFicha.nombre_mostrado}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ) : null}

                {/* Ubicación y accesos */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0b1d36] border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-5 h-5 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Dirección física</p>
                      <p className="text-sm font-bold text-[#002147] dark:text-white">
                        {puntoModalFicha.direccion} · {puntoModalFicha.codigo_postal} {puntoModalFicha.localidad}
                      </p>
                    </div>
                  </div>

                  {puntoModalFicha.referencia_local && (
                    <div className="flex items-start gap-2.5">
                      <Navigation className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Referencia visual</p>
                        <p className="text-xs text-slate-700 dark:text-slate-200 font-medium">
                          {puntoModalFicha.referencia_local}
                        </p>
                      </div>
                    </div>
                  )}

                  {puntoModalFicha.aparcamiento && (
                    <div className="flex items-start gap-2.5">
                      <Car className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Aparcamiento y descarga</p>
                        <p className="text-xs text-slate-700 dark:text-slate-200 font-medium">
                          {puntoModalFicha.aparcamiento}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Horario y Teléfonos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0b1d36] border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#002147] dark:text-slate-200">
                        Horario de atención
                      </h4>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {puntoModalFicha.horario.resumen}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                      Domingos y festivos: Cerrado
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0b1d36] border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Phone className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#002147] dark:text-slate-200">
                        Contacto directo
                      </h4>
                    </div>
                    <p className="text-xs text-slate-500 mb-1">Teléfono tienda:</p>
                    <a
                      href={`tel:+34${puntoModalFicha.telefono}`}
                      className="text-base font-extrabold text-[#002147] dark:text-[#60B5F6] hover:underline block mb-2"
                    >
                      {puntoModalFicha.telefonos_mostrados}
                    </a>
                    <a
                      href={buildMimoWhatsAppUrl(
                        `Hola, Mimo. Quiero hacer una consulta sobre la tienda ${puntoModalFicha.nombre_mostrado} (${puntoModalFicha.direccion})`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#178A47] dark:text-[#4ade80] hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>WhatsApp Mimos ({CONTACT_INFO.whatsappNumber})</span>
                    </a>
                  </div>
                </div>

                {/* Taller de costura y arreglos si aplica */}
                {puntoModalFicha.arreglos_confirmados && puntoModalFicha.arreglos_confirmados.length > 0 && (
                  <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#178A47] dark:text-[#4ade80] flex items-center gap-1.5">
                        <Scissors className="w-4 h-4" aria-hidden="true" />
                        <span>Taller propio de costura y arreglos (In situ)</span>
                      </h4>
                      <a
                        href="/arreglos-de-ropa-vigo"
                        onClick={(e) => {
                          setPuntoModalFicha(null);
                          onNavigate('/arreglos-de-ropa-vigo', e);
                        }}
                        className="text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
                      >
                        Ver tarifas y prendas →
                      </a>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-700 dark:text-slate-200">
                      {puntoModalFicha.arreglos_confirmados.map((arr) => (
                        <li key={arr} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#178A47] dark:text-[#4ade80] shrink-0 mt-0.5" aria-hidden="true" />
                          <span>{arr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Servicios confirmados */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#002147] dark:text-slate-200 mb-2">
                    Servicios disponibles en este punto
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {derivarEtiquetasServicios(puntoModalFicha.servicios_confirmados).map((srv) => (
                      <span
                        key={srv}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#0F76BB]" aria-hidden="true" />
                        <span>{srv}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Instrucciones de recogida y entrega */}
                <div className="p-3.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300">
                  <p className="font-bold text-[#002147] dark:text-blue-300 mb-1">
                    Recepción y entrega de prendas:
                  </p>
                  <p>{puntoModalFicha.instrucciones_entrega_recogida}</p>
                </div>
              </div>

              {/* Pie de botones de acción */}
              <div className="px-6 py-4 bg-slate-50 dark:bg-[#0b1d36] border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <a
                  href={buildGoogleMapsUrl(puntoModalFicha)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002147] dark:text-slate-200 hover:text-[#0F76BB]"
                >
                  <span>Cómo llegar (Google Maps)</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>

                <div className="flex items-center gap-2">
                  <a
                    href={`tel:+34${puntoModalFicha.telefono}`}
                    onClick={() =>
                      trackPhoneClick(currentSectionPath, 'point_modal', {
                        store_id: puntoModalFicha.id,
                      })
                    }
                    className="inline-flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg bg-[#002147] hover:bg-[#0a3161] text-white transition-colors"
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
                    className="inline-flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-lg bg-[#178A47] hover:bg-[#126E38] text-white transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setPuntoModalFicha(null)}
                    className="text-xs font-bold px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
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
  );
};
