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
} from 'lucide-react';
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
} from '../data/mimosData';

interface ContactAndLocationsSectionProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const ContactAndLocationsSection: React.FC<ContactAndLocationsSectionProps> = ({
  onNavigate,
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('Todos');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedTipo, setSelectedTipo] = useState<'todos' | 'tienda' | 'punto'>('todos');
  const [selectedServicio, setSelectedServicio] = useState<string>('todos');

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
    const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${punto.direccion}, ${punto.codigo_postal} ${punto.localidad}`
    )}`;

    return (
      <article
        key={punto.id}
        className={`rounded-2xl border p-6 flex flex-col justify-between transition-colors ${
          punto.tipo === 'tienda'
            ? 'border-[#002147]/30 dark:border-[#0F76BB]/50 bg-white dark:bg-[#071324]'
            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324]'
        }`}
      >
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-3">
            <span
              className={`inline-flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                punto.tipo === 'tienda'
                  ? 'bg-[#002147] text-white dark:bg-[#0F76BB]'
                  : 'bg-slate-100 text-[#002147] dark:bg-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
              }`}
            >
              {punto.tipo === 'tienda' ? (
                <>
                  <Store className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Tienda propia Mimos · {punto.localidad}</span>
                </>
              ) : (
                <>
                  <Handshake className="w-3.5 h-3.5 text-[#0F76BB]" aria-hidden="true" />
                  <span>Establecimiento colaborador · {punto.localidad}</span>
                </>
              )}
            </span>

            {zonaPage && (
              <a
                href={zonaPage.url}
                onClick={(e) => onNavigate(zonaPage.url, e)}
                className="inline-flex items-center gap-1 font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
              >
                <span>Página de {punto.localidad}</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white mb-1.5">
            {punto.nombre_mostrado}
          </h3>

          {punto.tipo === 'punto' && (
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-3">
              Comercio colaborador: {punto.nombre_comercio}
            </p>
          )}

          <dl className="space-y-2 text-sm text-slate-600 dark:text-slate-300 mb-4">
            <div className="flex items-start gap-2.5">
              <MapPin
                className="w-4 h-4 text-[#0F76BB] shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <dt className="sr-only">Dirección</dt>
                <dd className="font-bold text-slate-800 dark:text-slate-100">
                  {punto.direccion} · <span className="font-mono">{punto.codigo_postal}</span>{' '}
                  {punto.localidad}
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock
                className="w-4 h-4 text-[#0F76BB] shrink-0 mt-1"
                aria-hidden="true"
              />
              <div>
                <dt className="sr-only">Horario</dt>
                <dd>{punto.horario.resumen}</dd>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone
                className="w-4 h-4 text-[#0F76BB] shrink-0"
                aria-hidden="true"
              />
              <div>
                <dt className="sr-only">Teléfono</dt>
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

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
            {punto.instrucciones_entrega_recogida}
          </p>

          {/* Servicios confirmados en este establecimiento */}
          <div className="mb-3 p-3 rounded-xl bg-slate-50 dark:bg-[#0b1d36] border border-slate-200/80 dark:border-slate-800">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#002147] dark:text-slate-200 mb-1.5">
              Servicios confirmados en este establecimiento:
            </p>
            <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
              {punto.servicios_admitidos.map((srv) => (
                <li key={srv} className="flex items-start gap-1.5">
                  <CheckCircle2
                    className="w-3.5 h-3.5 text-[#0F76BB] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{srv}</span>
                </li>
              ))}
            </ul>
            {punto.servicios_confirmados.includes('costura_arreglos') ? (
              <div className="mt-2 pt-2 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#178A47] dark:text-[#4ade80]">
                  <Scissors className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Dispone de servicio de costura y arreglos</span>
                </span>
                <a
                  href="/arreglos-de-ropa-vigo"
                  onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                  className="text-[11px] font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
                >
                  Ver arreglos →
                </a>
              </div>
            ) : (
              <p className="mt-2 pt-2 border-t border-slate-200/70 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                Punto de recogida y entrega para servicios de Tintorería Mimos (sin servicio de costura en este establecimiento).
              </p>
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002147] dark:text-slate-200 hover:text-[#0F76BB]"
            >
              <span>Cómo llegar (Google Maps)</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <a
              href={buildMimoWhatsAppUrl(
                `Hola, Mimo. Quiero hacer una consulta sobre ${
                  punto.tipo === 'tienda'
                    ? `la ${punto.nombre_mostrado}`
                    : `el punto colaborador de ${punto.localidad} (${punto.direccion})`
                }`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#178A47] dark:text-[#4ade80] hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Consultar a Mimo</span>
            </a>
          </div>

          {zonaPage && (
            <a
              href={zonaPage.url}
              onClick={(e) => onNavigate(zonaPage.url, e)}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
            >
              <span>Ver ficha de {punto.localidad}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
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
            3 tiendas propias en Vigo y 5 puntos de recogida colaboradores
          </p>
          <h2
            id="puntos-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight mb-4"
          >
            Red de tiendas propias de Tintorería Mimos y puntos colaboradores en la comarca
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Diferenciamos con total transparencia nuestras <strong>3 tiendas propias en Vigo</strong> de los <strong>5 establecimientos colaboradores</strong> en Redondela, Gondomar, Ponteareas, O Porriño y Vigo donde puedes depositar y recoger tus encargos.
          </p>
        </div>

        {/* Tarjetas de Acceso Directo a las 5 Páginas por Localidad (/zonas/...) */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h3 className="text-sm sm:text-base font-extrabold text-[#002147] dark:text-white">
              Selecciona tu municipio para ver su página local e instrucciones paso a paso:
            </h3>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Vigo · Redondela · Gondomar · Ponteareas · O Porriño
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
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white"
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
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white">
                Estamos a tu disposición en Navia (Vigo)
              </h3>
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
                      value={contactNombre}
                      onChange={(e) => {
                        setContactNombre(e.target.value);
                        setContactReady(false);
                      }}
                      placeholder="Tu nombre"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1d36] text-sm text-slate-900 dark:text-white"
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
                      value={contactTelefono}
                      onChange={(e) => {
                        setContactTelefono(e.target.value);
                        setContactReady(false);
                      }}
                      placeholder="Ej.: 600 000 000"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1d36] text-sm text-slate-900 dark:text-white"
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
                      value={contactEmail}
                      onChange={(e) => {
                        setContactEmail(e.target.value);
                        setContactReady(false);
                      }}
                      placeholder="tu@email.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1d36] text-sm text-slate-900 dark:text-white"
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
                    value={contactMensaje}
                    onChange={(e) => {
                      setContactMensaje(e.target.value);
                      setContactReady(false);
                    }}
                    placeholder="Indícanos qué prenda o servicio necesitas consultar..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0b1d36] text-sm text-slate-900 dark:text-white"
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
                  <p role="alert" className="text-xs font-bold text-red-600 dark:text-red-400">
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
    </section>
  );
};
