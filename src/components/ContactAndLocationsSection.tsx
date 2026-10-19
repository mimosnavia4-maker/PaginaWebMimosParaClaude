import React, { useState, useMemo } from 'react';
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

const MimosGoogleMap = React.lazy(() =>
  import('./MimosGoogleMap').then((m) => ({ default: m.MimosGoogleMap }))
);
import { PuntoTelasMasFicha } from './PuntoTelasMasFicha';
import { PuntoGondomarFicha } from './PuntoGondomarFicha';
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

                {/* Sub-bloque Taller de costura y arreglos in situ */}
                {tieneCostura && (
                  <div className="mt-3.5 pt-3.5 border-t border-slate-200/80 dark:border-slate-800">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5">
                        <Scissors className="w-4 h-4 text-[#178A47]" aria-hidden="true" />
                        <span className="text-xs font-bold text-[#178A47] dark:text-[#4ade80]">
                          Taller de costura y arreglos in situ
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
          {pageMode === 'puntos' ? (
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
        <div id="mapa-interactivo-puntos" className="mb-12 scroll-mt-24">
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
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-xs sm:text-sm font-bold text-[#002147] dark:text-white"
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
              className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-xs sm:text-sm font-bold text-[#002147] dark:text-white"
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
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
          <a
            href={buildMimoWhatsAppUrl(
              'Hola, Mimo. Tengo un comercio y me gustaría recibir información para ser Punto Mimos colaborador.'
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] dark:hover:bg-[#0B5C94] text-white font-bold text-sm px-5 sm:px-6 py-3.5 rounded-xl transition-colors text-center sm:whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Quiero ser punto Mimos colaborador</span>
          </a>
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
                  <span className="text-[#0F76BB] font-mono text-lg group-open:rotate-45 transition-transform">
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
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white">
                  Contacto, tiendas propias en Vigo y horarios de Tintorería Mimos Navia
                </h1>
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1d36] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1d36] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1d36] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
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
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1d36] text-sm text-slate-900 dark:text-white"
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1d36] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
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
          puntoModalFicha?.id === 'punto-o-porrino' || puntoModalFicha?.id === 'punto-gondomar'
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
                      <span>WhatsApp Mimos (655 536 844)</span>
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
