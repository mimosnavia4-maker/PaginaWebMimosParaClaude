import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Copy,
  ExternalLink,
  Handshake,
  MapPin,
  MessageCircle,
  Phone,
  Scissors,
  Search,
  Sparkles,
  Store,
} from 'lucide-react';
import { SERVICIO_ARREGLOS_DATA } from '../data/servicePagesData';
import {
  REGISTROS_PUNTOS,
  TIENDAS_PROPIAS,
  PUNTOS_CON_COSTURA,
  ZONAS_RESUMEN,
  CONTACT_INFO,
  IMAGES,
  PuntoRegistro,
  buildMimoWhatsAppUrl,
  buildGoogleMapsUrl,
  derivarEtiquetasServicios,
} from '../data/mimosData';
import { trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';

interface ClothingAlterationsPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

function formatPuntoCosturaOptionValue(p: PuntoRegistro): string {
  return p.tipo === 'tienda'
    ? `${p.nombre_mostrado} – ${p.direccion} (${p.localidad})`
    : `Punto colaborador ${p.localidad} – ${p.nombre_comercio} (${p.direccion})`;
}

function formatPuntoCosturaOptionLabel(p: PuntoRegistro): string {
  return p.tipo === 'tienda'
    ? `${p.nombre_mostrado} · ${p.direccion} (${p.localidad})`
    : `Punto colaborador ${p.localidad} (${p.nombre_comercio})`;
}

export const ClothingAlterationsPage: React.FC<ClothingAlterationsPageProps> = ({
  onNavigate,
}) => {
  const [selectedLocalidad, setSelectedLocalidad] = useState<string>('Todas');
  const [selectedTipo, setSelectedTipo] = useState<'todos' | 'tienda' | 'punto'>('todos');
  const [selectedServicioFilter, setSelectedServicioFilter] = useState<
    'costura_arreglos' | 'todos_servicios'
  >('costura_arreglos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [mobileCatalogTab, setMobileCatalogTab] = useState<
    'habituales' | 'taller_hogar' | 'prendas_lista'
  >('habituales');
  const [heroImgError, setHeroImgError] = useState<boolean>(false);

  const localidadesCosturaDisponibles = useMemo(() => {
    const base =
      selectedServicioFilter === 'costura_arreglos'
        ? PUNTOS_CON_COSTURA
        : REGISTROS_PUNTOS;
    return ['Todas', ...Array.from(new Set(base.map((p) => p.localidad)))];
  }, [selectedServicioFilter]);

  const puntosColaboradoresConCostura = useMemo(
    () => PUNTOS_CON_COSTURA.filter((p) => p.tipo === 'punto'),
    []
  );

  const [tipoArreglo, setTipoArreglo] = useState<string>('Bajos o bastillas');
  const [tipoPrenda, setTipoPrenda] = useState<string>('Pantalón');
  const [zonaPreferida, setZonaPreferida] = useState<string>(() =>
    PUNTOS_CON_COSTURA[0]
      ? formatPuntoCosturaOptionValue(PUNTOS_CON_COSTURA[0])
      : 'Tintorería Mimos Navia – C/ Teixugueiras, 11, bajo 9 (Vigo)'
  );
  const [detallesExtra, setDetallesExtra] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const buildArregloWhatsAppMessage = () => {
    const lines = [
      'Hola, Mimo. Quiero consultar un arreglo de ropa.',
      `Tipo de arreglo: ${tipoArreglo}`,
      `Prenda: ${tipoPrenda}`,
      `Establecimiento / Zona: ${zonaPreferida}`,
    ];
    if (detallesExtra.trim()) {
      lines.push(`Detalle adicional: ${detallesExtra.trim()}`);
    }
    lines.push(
      'Si lo necesitas, te envío fotos de la prenda en este chat cuando me indiques.'
    );
    return lines.join('\n');
  };

  const whatsappArregloUrl = buildMimoWhatsAppUrl(buildArregloWhatsAppMessage());

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(buildArregloWhatsAppMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // ignore clipboard errors
    }
  };

  const filteredEstablecimientos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const baseList =
      selectedServicioFilter === 'costura_arreglos'
        ? PUNTOS_CON_COSTURA
        : REGISTROS_PUNTOS;

    return baseList.filter((p) => {
      const matchLoc =
        selectedLocalidad === 'Todas' || p.localidad === selectedLocalidad;
      const matchTipo = selectedTipo === 'todos' || p.tipo === selectedTipo;
      const matchQ =
        !q ||
        p.nombre_mostrado.toLowerCase().includes(q) ||
        p.nombre_comercio.toLowerCase().includes(q) ||
        p.direccion.toLowerCase().includes(q) ||
        p.localidad.toLowerCase().includes(q) ||
        p.codigo_postal.toLowerCase().includes(q);
      return matchLoc && matchTipo && matchQ;
    });
  }, [selectedLocalidad, selectedTipo, selectedServicioFilter, searchQuery]);

  const tiendasPropiasFiltradas = filteredEstablecimientos.filter(
    (p) => p.tipo === 'tienda'
  );
  const puntosColaboradoresFiltrados = filteredEstablecimientos.filter(
    (p) => p.tipo === 'punto'
  );

  const renderEstablecimientoCosturaCard = (punto: PuntoRegistro) => {
    const tieneCostura = punto.servicios_confirmados.includes('costura_arreglos');
    const zonaPage = ZONAS_RESUMEN.find((z) => z.localidad === punto.localidad);
    const mapsHref = buildGoogleMapsUrl(punto);

    const whatsappPuntoCosturaHref = buildMimoWhatsAppUrl(
      tieneCostura
        ? `Hola, Mimo. Quiero consultar un arreglo de ropa (${tipoArreglo.toLowerCase()} en ${tipoPrenda.toLowerCase()}) para entregar en ${
            punto.tipo === 'tienda'
              ? punto.nombre_mostrado
              : `${punto.nombre_comercio} (${punto.localidad})`
          }.`
        : `Hola, Mimo. Quiero consultar dónde llevar una prenda para arreglo de costura cerca de ${punto.localidad}.`
    );

    const itemsConfirmados =
      tieneCostura && punto.arreglos_confirmados.length > 0
        ? punto.arreglos_confirmados
        : derivarEtiquetasServicios(punto.servicios_confirmados);

    const modalServiceText =
      punto.id === 'gregorio-espino' || punto.id === 'rua-venezuela'
        ? 'Taller propio in situ'
        : punto.id === 'as-teixugueiras'
          ? 'Recepción para taller propio'
          : tieneCostura
            ? 'Taller del colaborador'
            : null;

    return (
      <article
        key={punto.id}
        className={`rounded-2xl bg-white p-6 sm:p-7 flex flex-col justify-between border transition-colors ${
          punto.tipo === 'tienda'
            ? 'border-[#0F76BB]/25 shadow-[0_2px_18px_-8px_rgba(0,33,71,0.08)]'
            : 'border-slate-200/80'
        }`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs mb-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-[#0C65A1]">
              {punto.tipo === 'tienda' ? (
                <>
                  <Store className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Tienda propia · {punto.localidad}</span>
                </>
              ) : (
                <>
                  <Handshake className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Colaborador · {punto.localidad}</span>
                </>
              )}
            </span>
            {modalServiceText && (
              <>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <span
                  className={`font-medium ${
                    punto.id === 'as-teixugueiras' ? 'text-[#0C65A1]' : 'text-[#13733B]'
                  }`}
                >
                  {modalServiceText}
                </span>
              </>
            )}
          </div>

          <h4 className="font-editorial-display text-xl sm:text-[1.35rem] font-medium text-[#002147] leading-snug mb-1">
            {punto.nombre_mostrado}
          </h4>

          {punto.tipo === 'punto' && (
            <p className="text-xs text-slate-600 mb-3">
              Comercio colaborador: {punto.nombre_comercio}
            </p>
          )}

          <dl className="space-y-2 text-sm text-slate-600 mt-3 mb-5">
            <div className="flex items-start gap-2.5">
              <MapPin
                className="w-4 h-4 text-slate-500 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <dt className="sr-only">Dirección</dt>
                <dd className="text-slate-700 font-medium">
                  {punto.direccion}{' '}
                  <span className="text-slate-300 font-normal">·</span>{' '}
                  <span className="font-mono text-xs text-slate-600 tabular-nums">
                    {punto.codigo_postal}
                  </span>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock
                className="w-4 h-4 text-slate-500 shrink-0 mt-0.5"
                aria-hidden="true"
              />
              <div>
                <dt className="sr-only">Horario</dt>
                <dd className="leading-relaxed">{punto.horario.resumen}</dd>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
              <div>
                <dt className="sr-only">Teléfono</dt>
                <dd>
                  <a
                    href={`tel:+34${punto.telefono}`}
                    className="inline-flex items-center min-h-[44px] font-medium text-[#002147] hover:text-[#0C65A1] underline-offset-4 hover:underline tabular-nums"
                  >
                    {punto.telefonos_mostrados}
                  </a>
                </dd>
              </div>
            </div>
          </dl>

          <details className="group border-t border-slate-100 pt-1.5 mb-4">
            <summary className="min-h-[44px] flex items-center justify-between gap-2 text-xs font-medium text-slate-600 hover:text-[#002147] cursor-pointer list-none">
              <span className="inline-flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-[#0C65A1] shrink-0" aria-hidden="true" />
                <span>
                  {tieneCostura ? 'Arreglos confirmados' : 'Servicios confirmados'} (
                  {itemsConfirmados.length})
                </span>
              </span>
              <ChevronDown
                className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-180 shrink-0"
                aria-hidden="true"
              />
            </summary>
            <ul className="space-y-1.5 text-xs text-slate-600 pt-2 pb-1">
              {itemsConfirmados.map((itemText) => (
                <li key={itemText} className="flex items-start gap-2">
                  <CheckCircle2
                    className="w-3.5 h-3.5 text-[#0C65A1] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>{itemText}</span>
                </li>
              ))}
            </ul>
          </details>
        </div>

        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <a
            href={whatsappPuntoCosturaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackWhatsAppClick(SERVICIO_ARREGLOS_DATA.url, 'service_detail_point', {
                service_id: 'arreglos-de-ropa',
                store_id: punto.id,
              })
            }
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-full bg-[#13733B] hover:bg-[#0F5C2F] text-white text-xs font-semibold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Consultar con Mimo</span>
          </a>

          <div className="flex items-center gap-4">
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 min-h-[44px] text-xs font-medium text-slate-600 hover:text-[#002147] underline-offset-4 hover:underline"
            >
              <span>Cómo llegar</span>
              <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
            </a>

            {zonaPage && (
              <a
                href={zonaPage.url}
                onClick={(e) => onNavigate(zonaPage.url, e)}
                className="inline-flex items-center gap-1 min-h-[44px] text-xs font-medium text-[#0C65A1] hover:underline underline-offset-4"
              >
                <span>{punto.localidad}</span>
                <ArrowUpRight className="w-3 h-3 shrink-0" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="font-editorial-body focus:outline-hidden bg-white text-slate-800"
    >
      {/* 1. CABECERA EDITORIAL ATELIER */}
      <section className="pt-6 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Migas de pan" className="mb-5 sm:mb-8">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
              <li>
                <a
                  href="/"
                  onClick={(e) => onNavigate('/', e)}
                  className="inline-flex items-center min-h-[44px] sm:min-h-0 hover:text-[#002147] transition-colors"
                >
                  Inicio
                </a>
              </li>
              <li aria-hidden="true" className="text-slate-400">
                /
              </li>
              <li>
                <a
                  href="/#servicios"
                  onClick={(e) => onNavigate('/#servicios', e)}
                  className="inline-flex items-center min-h-[44px] sm:min-h-0 hover:text-[#002147] transition-colors"
                >
                  Servicios
                </a>
              </li>
              <li aria-hidden="true" className="text-slate-400">
                /
              </li>
              <li className="text-[#002147] font-medium">Arreglos de ropa en Vigo</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div className="inline-flex items-center gap-2.5 text-xs tracking-[0.04em] uppercase font-semibold text-[#0C65A1]">
                <img
                  src="/images/ositos/osito-costura.webp"
                  alt=""
                  aria-hidden="true"
                  width={26}
                  height={26}
                  className="w-6.5 h-6.5 object-contain shrink-0"
                />
                <span>Sin cita previa · Taller propio en Vigo</span>
              </div>

              <h1 className="font-editorial-display text-[2.05rem] sm:text-[2.75rem] lg:text-[3.35rem] font-medium text-[#002147] tracking-[-0.02em] leading-[1.09] text-balance">
                {SERVICIO_ARREGLOS_DATA.h1}
              </h1>

              <p className="md:hidden text-[15px] text-slate-600 leading-[1.7] max-w-[54ch]">
                Bajos, bajo original de vaquero, cremalleras, piel, bordados y confección del hogar. Atención directa con probador en Gregorio Espino y Venezuela, y recepción en Navia.
              </p>

              <p className="hidden md:block text-lg text-slate-600 leading-[1.7] max-w-[56ch]">
                {SERVICIO_ARREGLOS_DATA.subtituloCabecera}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                <a
                  href={whatsappArregloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick(SERVICIO_ARREGLOS_DATA.url, 'service_detail', {
                      service_id: 'arreglos-de-ropa',
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-full bg-[#13733B] hover:bg-[#0F5C2F] text-white font-semibold text-sm sm:text-base transition-colors sm:whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Consultar mi arreglo con Mimo</span>
                </a>

                <a
                  href="#localizador-puntos-costura"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById('localizador-puntos-costura')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-full border border-slate-300 hover:border-[#002147] text-[#002147] font-medium text-sm sm:text-base transition-colors sm:whitespace-nowrap shrink-0"
                >
                  <MapPin className="w-4 h-4 text-[#0C65A1] shrink-0" aria-hidden="true" />
                  <span>Tiendas y horarios</span>
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs font-medium text-slate-600">
                <a
                  href="#que-arreglamos"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById('que-arreglamos')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center min-h-[44px] hover:text-[#0C65A1] underline-offset-4 hover:underline transition-colors"
                >
                  Qué arreglamos ↓
                </a>
                <span aria-hidden="true" className="text-slate-300">
                  ·
                </span>
                <a
                  href="#consultar-arreglo-mimo"
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById('consultar-arreglo-mimo')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center min-h-[44px] hover:text-[#0C65A1] underline-offset-4 hover:underline transition-colors"
                >
                  Preparar consulta por WhatsApp ↓
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure>
                <div className="rounded-2xl overflow-hidden bg-[#FAF9F6]">
                  {!heroImgError ? (
                    <img
                      src={IMAGES.arreglosRopa}
                      srcSet="/arreglos-ropa-mimos-640w.webp 640w, /arreglos-ropa-mimos.webp 1200w"
                      sizes="(max-width: 1023px) 100vw, 42vw"
                      alt="Trabajo profesional de costura y marcado de bajo de pantalón con jaboncillo de sastre en Vigo"
                      width={1200}
                      height={896}
                      fetchPriority="high"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgError(true)}
                      className="w-full aspect-[16/10] lg:aspect-[4/4.6] object-cover"
                    />
                  ) : (
                    <div className="w-full aspect-[16/10] lg:aspect-[4/4.6] bg-gradient-to-br from-[#F4F9FE] to-[#E6F1FC] flex flex-col items-center justify-center p-8 text-center text-[#002147]">
                      <Sparkles className="w-8 h-8 text-[#0C65A1] mb-2" aria-hidden="true" />
                      <p className="font-editorial-display text-lg font-medium">
                        Costura y composturas profesionales en Vigo
                      </p>
                      <p className="text-xs text-slate-600 mt-1">
                        Atención directa sin cita previa en horario comercial
                      </p>
                    </div>
                  )}
                </div>
                <figcaption className="hidden md:block mt-3 text-xs text-slate-600 leading-relaxed">
                  Taller propio in situ en Gregorio Espino y Venezuela · Recepción gratuita en Navia.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUÉ ARREGLAMOS: flujo aireado, cero cajas anidadas, pestañas limpias en móvil */}
      <section
        id="que-arreglamos"
        className="py-12 sm:py-16 lg:py-24 bg-[#FAF9F6] border-t border-slate-200/70"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          {/* Consejos prácticos antes de venir: acordeón en móvil, 3 columnas limpias en escritorio */}
          <details className="md:hidden group border-y border-slate-200 py-1">
            <summary className="min-h-[48px] flex items-center justify-between gap-3 cursor-pointer list-none py-2">
              <div>
                <p className="text-[11px] uppercase tracking-[0.06em] font-semibold text-[#0C65A1]">
                  Antes de venir sin cita
                </p>
                <p className="text-sm font-semibold text-[#002147]">
                  Calzado, probador y qué centro elegir
                </p>
              </div>
              <ChevronDown
                className="w-5 h-5 text-slate-500 transition-transform group-open:rotate-180 shrink-0"
                aria-hidden="true"
              />
            </summary>

            <div className="divide-y divide-slate-200/70 border-t border-slate-200/70 text-sm text-slate-600">
              <div className="py-3.5 space-y-1">
                <h3 className="font-semibold text-[#002147]">
                  1. Calzado y margen de encogimiento
                </h3>
                <p className="leading-relaxed text-xs">
                  Trae el calzado definitivo (misma altura de tacón o suela) para marcar bajos o ceremonia, y lava antes vaqueros crudos o lino nuevo si aún no han tocado el agua.
                </p>
              </div>
              <div className="py-3.5 space-y-1">
                <h3 className="font-semibold text-[#002147]">
                  2. Taller propio con probador in situ
                </h3>
                <p className="leading-relaxed text-xs">
                  Modista y probador propios en{' '}
                  <strong className="font-medium text-[#002147]">
                    Alcalde Gregorio Espino, 42
                  </strong>{' '}
                  (L–V y sábados mañana; piel, bordados, hogar) y{' '}
                  <strong className="font-medium text-[#002147]">
                    Rúa de Venezuela, 29, Entreplanta
                  </strong>{' '}
                  (L–V; cerrado sábados).
                </p>
              </div>
              <div className="py-3.5 space-y-1">
                <h3 className="font-semibold text-[#002147]">
                  3. Navia y puntos colaboradores
                </h3>
                <p className="leading-relaxed text-xs">
                  En <strong className="font-medium text-[#002147]">Navia</strong> (C/ Teixugueiras, 11, bajo 9) recepcionamos arreglos sin prueba con traslado gratuito; en Gondomar, Ponteareas y O Porriño disponen de costura local. D’Passo (As Travesas) y Redondela son solo tintorería/lavandería.
                </p>
              </div>
              <div className="py-2">
                <a
                  href="/blog/guia-arreglos-ropa-bajo-vaquero-vigo"
                  onClick={(e) => onNavigate('/blog/guia-arreglos-ropa-bajo-vaquero-vigo', e)}
                  className="inline-flex items-center gap-1.5 min-h-[44px] text-xs font-semibold text-[#0C65A1] hover:underline"
                >
                  <span>Leer guía técnica de bajo original y ceremonia</span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </details>

          <div className="hidden md:block">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200/80">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.06em] font-semibold text-[#0C65A1]">
                  Antes de acudir sin cita previa
                </p>
                <h2 className="font-editorial-display text-2xl lg:text-[1.9rem] font-medium text-[#002147]">
                  Cómo preparar tu prenda y qué centro elegir
                </h2>
              </div>
              <a
                href="/blog/guia-arreglos-ropa-bajo-vaquero-vigo"
                onClick={(e) => onNavigate('/blog/guia-arreglos-ropa-bajo-vaquero-vigo', e)}
                className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-medium text-[#0C65A1] hover:underline underline-offset-4 sm:whitespace-nowrap shrink-0"
              >
                <span>Guía de bajo original y ceremonia</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-6 text-sm text-slate-600">
              <div className="space-y-2">
                <span className="font-editorial-display text-2xl font-normal text-[#0C65A1] block">
                  01
                </span>
                <h3 className="font-semibold text-[#002147]">
                  Calzado y margen de encogimiento
                </h3>
                <p className="leading-[1.7]">
                  Trae el calzado definitivo (misma altura de tacón o suela) para marcar bajos o ceremonia, y lava antes vaqueros crudos o lino nuevo si aún no han tocado el agua.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-editorial-display text-2xl font-normal text-[#0C65A1] block">
                  02
                </span>
                <h3 className="font-semibold text-[#002147]">
                  Taller propio con probador in situ
                </h3>
                <p className="leading-[1.7]">
                  Modista y probador propios en{' '}
                  <strong className="font-medium text-[#002147]">
                    Alcalde Gregorio Espino, 42
                  </strong>{' '}
                  (L–V y sábados mañana; piel, bordados, hogar) y{' '}
                  <strong className="font-medium text-[#002147]">
                    Rúa de Venezuela, 29, Entreplanta
                  </strong>{' '}
                  (L–V; cerrado sábados).
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-editorial-display text-2xl font-normal text-[#0C65A1] block">
                  03
                </span>
                <h3 className="font-semibold text-[#002147]">
                  Navia y puntos colaboradores
                </h3>
                <p className="leading-[1.7]">
                  En <strong className="font-medium text-[#002147]">Navia</strong> (C/ Teixugueiras, 11, bajo 9) recepcionamos arreglos sin prueba con traslado gratuito; en Gondomar, Ponteareas y O Porriño disponen de costura local. D’Passo (As Travesas) y Redondela son solo tintorería/lavandería.
                </p>
              </div>
            </div>
          </div>

          {/* BLOQUE PRINCIPAL DE CATÁLOGO: único <h2> semántico compartido entre móvil y escritorio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-8 space-y-6 md:space-y-8">
              <div className="max-w-2xl">
                <p className="text-xs uppercase tracking-[0.06em] font-semibold text-[#0C65A1] mb-1.5">
                  Composturas de vestir · Tiendas propias y puntos con costura
                </p>
                <h2 className="font-editorial-display text-[1.75rem] md:text-3xl lg:text-[2.35rem] font-medium text-[#002147] tracking-[-0.015em] leading-[1.15] text-balance">
                  Qué arreglos de ropa realizamos
                </h2>
                <p className="hidden md:block text-base text-slate-600 mt-3 leading-[1.7]">
                  Trabajamos tanto las composturas habituales del día a día como trabajos especializados de taller propio (piel, prendas delicadas, bordados, confección hogar y servicio express), siempre con revisión previa del tejido y las costuras.
                </p>
              </div>

              {/* Pestañas móviles limpias (< md) */}
              <div className="md:hidden space-y-5">
                <div
                  role="tablist"
                  aria-label="Categorías de arreglos y confección"
                  className="grid grid-cols-3 border-b border-slate-200"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mobileCatalogTab === 'habituales'}
                    onClick={() => setMobileCatalogTab('habituales')}
                    className={`min-h-[44px] px-1 py-2.5 text-xs font-medium text-center border-b-2 -mb-px transition-colors cursor-pointer ${
                      mobileCatalogTab === 'habituales'
                        ? 'border-[#002147] text-[#002147] font-semibold'
                        : 'border-transparent text-slate-600 hover:text-[#002147]'
                    }`}
                  >
                    Habituales (6)
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mobileCatalogTab === 'taller_hogar'}
                    onClick={() => setMobileCatalogTab('taller_hogar')}
                    className={`min-h-[44px] px-1 py-2.5 text-xs font-medium text-center border-b-2 -mb-px transition-colors cursor-pointer ${
                      mobileCatalogTab === 'taller_hogar'
                        ? 'border-[#002147] text-[#002147] font-semibold'
                        : 'border-transparent text-slate-600 hover:text-[#002147]'
                    }`}
                  >
                    Taller y hogar
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={mobileCatalogTab === 'prendas_lista'}
                    onClick={() => setMobileCatalogTab('prendas_lista')}
                    className={`min-h-[44px] px-1 py-2.5 text-xs font-medium text-center border-b-2 -mb-px transition-colors cursor-pointer ${
                      mobileCatalogTab === 'prendas_lista'
                        ? 'border-[#002147] text-[#002147] font-semibold'
                        : 'border-transparent text-slate-600 hover:text-[#002147]'
                    }`}
                  >
                    Prendas y 18
                  </button>
                </div>

                {mobileCatalogTab === 'habituales' && (
                  <div className="divide-y divide-slate-200/80">
                    {SERVICIO_ARREGLOS_DATA.trabajosConfirmados.map((item) => (
                      <article key={item.id} className="py-5 space-y-1.5">
                        <p className="text-[11px] font-semibold text-[#0C65A1]">
                          {item.disponibilidad}
                        </p>
                        <h3 className="text-base font-semibold text-[#002147] leading-snug">
                          {item.titulo}
                        </h3>
                        <p className="text-[15px] text-slate-600 leading-[1.7]">
                          {item.descripcion}
                        </p>
                      </article>
                    ))}
                  </div>
                )}

                {mobileCatalogTab === 'taller_hogar' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xs uppercase tracking-[0.06em] font-semibold text-[#0C65A1] mb-2">
                        Especialidades de taller propio
                      </h3>
                      <div className="divide-y divide-slate-200/80 border-t border-slate-200/80">
                        {SERVICIO_ARREGLOS_DATA.especialidadesTallerPropio.map((esp) => (
                          <article key={esp.id} className="py-4 space-y-1.5">
                            <p className="text-[11px] font-semibold text-[#0C65A1]">
                              {esp.disponibilidad}
                            </p>
                            <h4 className="text-base font-semibold text-[#002147]">
                              {esp.titulo}
                            </h4>
                            <p className="text-[15px] text-slate-600 leading-[1.7]">
                              {esp.descripcion}
                            </p>
                          </article>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xs uppercase tracking-[0.06em] font-semibold text-[#0C65A1] mb-1">
                        Confección hogar a medida · Gregorio Espino
                      </h3>
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                        Textiles para tu vivienda u oficina bajo medida y valoración en taller:
                      </p>
                      <div className="divide-y divide-slate-200/80 border-t border-slate-200/80">
                        {SERVICIO_ARREGLOS_DATA.confeccionHogar.map((conf) => (
                          <article key={conf.id} className="py-4 space-y-1">
                            <h4 className="text-base font-semibold text-[#002147]">
                              {conf.titulo}
                            </h4>
                            <p className="text-[15px] text-slate-600 leading-[1.7]">
                              {conf.descripcion}
                            </p>
                          </article>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {mobileCatalogTab === 'prendas_lista' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-base font-semibold text-[#002147] mb-3">
                        Prendas que atendemos
                      </h3>
                      <ul className="divide-y divide-slate-200/70 border-t border-b border-slate-200/70 text-sm text-slate-600">
                        {SERVICIO_ARREGLOS_DATA.prendasConfirmadas.map((prenda) => (
                          <li key={prenda} className="py-3 flex items-start gap-2.5">
                            <CheckCircle2
                              className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5"
                              aria-hidden="true"
                            />
                            <span>{prenda}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs text-slate-600 leading-relaxed mt-3">
                        Arreglos en piel, bordados personalizados, confección de cortinas, estores y cojines, y servicio express en nuestro taller de{' '}
                        <strong className="font-medium text-[#002147]">Gregorio Espino</strong> (recepción previa en Navia bajo consulta con Mimo).
                      </p>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-[#002147] mb-3">
                        Listado completo de 18 trabajos
                      </h3>
                      <ul className="divide-y divide-slate-200/60 border-t border-b border-slate-200/60 text-sm text-slate-600">
                        {SERVICIO_ARREGLOS_DATA.catalogoCompleto18Puntos.map((puntoNombre, idx) => (
                          <li key={puntoNombre} className="py-2.5 flex items-center gap-3">
                            <span className="font-mono text-xs text-[#0C65A1] tabular-nums w-6 shrink-0">
                              {idx + 1 < 10 ? `0${idx + 1}.` : `${idx + 1}.`}
                            </span>
                            <span>{puntoNombre}</span>
                          </li>
                        ))}
                      </ul>
                      <a
                        href="/blog/guia-arreglos-ropa-bajo-vaquero-vigo"
                        onClick={(e) => onNavigate('/blog/guia-arreglos-ropa-bajo-vaquero-vigo', e)}
                        className="mt-3 inline-flex items-center gap-1.5 min-h-[44px] text-xs font-semibold text-[#0C65A1] hover:underline"
                      >
                        <span>Leer guía de bajo original y modista in situ</span>
                        <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                )}

                <div className="rounded-2xl bg-white border border-slate-200/80 p-5 flex items-start gap-3.5">
                  <img
                    src="/images/ositos/osito-tintoreria.webp"
                    alt=""
                    aria-hidden="true"
                    width={42}
                    height={42}
                    className="w-10.5 h-10.5 object-contain shrink-0 mt-0.5"
                  />
                  <div className="space-y-1">
                    <p className="text-[11px] uppercase tracking-[0.06em] font-semibold text-[#0C65A1]">
                      Servicio combinado Mimos
                    </p>
                    <h3 className="text-base font-semibold text-[#002147]">
                      Costura + Tintorería y Planchado en un solo paso
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Sube el bajo de un traje, ajusta un vestido o cambia la cremallera de un abrigo y llévatelo limpio y planchado de una sola vez.
                    </p>
                  </div>
                </div>
              </div>

              {/* Rejilla de escritorio (>= md) */}
              <div className="hidden md:grid grid-cols-2 gap-x-10 gap-y-8">
                {SERVICIO_ARREGLOS_DATA.trabajosConfirmados.map((item) => (
                  <article
                    key={item.id}
                    className="pt-5 border-t border-slate-200/80 flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-xs font-semibold text-[#0C65A1] mb-1.5">
                        {item.disponibilidad}
                      </p>
                      <h3 className="text-lg font-semibold text-[#002147] leading-snug mb-2">
                        {item.titulo}
                      </h3>
                      <p className="text-sm text-slate-600 leading-[1.7] mb-3">
                        {item.descripcion}
                      </p>
                    </div>
                    <p className="text-xs text-slate-600">
                      <span className="font-medium text-slate-700">Prendas:</span>{' '}
                      {item.prendasHabituales}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Panel lateral de escritorio (>= md), sin tarjeta vacía del vídeo */}
            <aside className="hidden md:block lg:col-span-4 space-y-6">
              <div className="rounded-2xl bg-white border border-slate-200/80 p-7 space-y-4">
                <h3 className="font-editorial-display text-xl font-medium text-[#002147]">
                  Prendas que atendemos
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-600">
                  {SERVICIO_ARREGLOS_DATA.prendasConfirmadas.map((prenda) => (
                    <li key={prenda} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{prenda}</span>
                    </li>
                  ))}
                </ul>

                <p className="pt-4 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                  <span className="font-medium text-[#002147]">Especialidades y hogar:</span> Arreglos en piel, bordados personalizados, confección de cortinas, estores y cojines, y servicio express en{' '}
                  <span className="font-medium text-[#002147]">Gregorio Espino</span> (con recepción previa en Navia bajo consulta con Mimo).
                </p>
              </div>

              <div className="rounded-2xl bg-[#F4F9FE] border border-[#0F76BB]/15 p-7 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/ositos/osito-tintoreria.webp"
                    alt=""
                    aria-hidden="true"
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain shrink-0"
                  />
                  <p className="text-xs uppercase tracking-[0.06em] font-semibold text-[#0C65A1]">
                    Servicio combinado Mimos
                  </p>
                </div>
                <h3 className="font-editorial-display text-xl font-medium text-[#002147] leading-snug">
                  Costura + Tintorería y Planchado en un solo paso
                </h3>
                <p className="text-sm text-slate-600 leading-[1.7]">
                  ¿Necesitas subir el bajo de un pantalón de traje, ajustar un vestido de invitada o cambiar la cremallera de un abrigo y dejarlo limpio y planchado? En Mimos puedes solicitar ambos servicios a la vez.
                </p>
              </div>
            </aside>
          </div>

          {/* Especialidades de taller propio + Confección Hogar (escritorio) */}
          <div className="hidden md:block space-y-16">
            <div className="pt-12 border-t border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <p className="text-xs uppercase tracking-[0.06em] font-semibold text-[#0C65A1] mb-1.5">
                    Especialidades de taller propio en Vigo
                  </p>
                  <h3 className="font-editorial-display text-2xl lg:text-[1.9rem] font-medium text-[#002147] leading-tight">
                    Prendas delicadas, piel, bordados y servicio express
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-x-8 gap-y-7">
                  {SERVICIO_ARREGLOS_DATA.especialidadesTallerPropio.map((esp) => (
                    <article key={esp.id} className="pt-4 border-t border-slate-200/80">
                      <p className="text-xs font-semibold text-[#0C65A1] mb-1">
                        {esp.disponibilidad}
                      </p>
                      <h4 className="text-base font-semibold text-[#002147] mb-1.5">
                        {esp.titulo}
                      </h4>
                      <p className="text-sm text-slate-600 leading-[1.7]">
                        {esp.descripcion}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200/80 p-7 space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.06em] font-semibold text-[#0C65A1] mb-1.5">
                    Taller propio Gregorio Espino · Vigo
                  </p>
                  <h3 className="font-editorial-display text-xl font-medium text-[#002147]">
                    Confección de textiles del hogar a medida
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Además de la compostura de prendas de vestir, confeccionamos textiles para tu vivienda u oficina bajo medida y valoración en taller:
                  </p>
                </div>

                <div className="divide-y divide-slate-100">
                  {SERVICIO_ARREGLOS_DATA.confeccionHogar.map((conf) => (
                    <div key={conf.id} className="py-3.5 first:pt-1 last:pb-0">
                      <h4 className="text-sm font-semibold text-[#002147] flex items-center gap-2">
                        <CheckCircle2
                          className="w-4 h-4 text-[#0C65A1] shrink-0"
                          aria-hidden="true"
                        />
                        <span>{conf.titulo}</span>
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed pl-6 mt-1">
                        {conf.descripcion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Índice completo de 18 trabajos de costura */}
            <div className="pt-10 border-t border-slate-200/80">
              <p className="text-xs uppercase tracking-[0.06em] font-semibold text-[#0C65A1] mb-4">
                Listado completo de trabajos de costura y confección profesional
              </p>
              <ul className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2.5 text-sm text-slate-600">
                {SERVICIO_ARREGLOS_DATA.catalogoCompleto18Puntos.map((puntoNombre, idx) => (
                  <li key={puntoNombre} className="flex items-center gap-2.5">
                    <span className="font-mono text-xs text-[#0C65A1] tabular-nums w-6 shrink-0">
                      {idx + 1 < 10 ? `0${idx + 1}.` : `${idx + 1}.`}
                    </span>
                    <span>{puntoNombre}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-200/70 flex items-center justify-between gap-4">
                <p className="text-sm text-slate-600">
                  ¿Dudas sobre cómo conservamos el desgastado en el{' '}
                  <strong className="font-medium text-[#002147]">bajo original de vaquero</strong> o dónde acudir sin cita previa según la prenda?
                </p>
                <a
                  href="/blog/guia-arreglos-ropa-bajo-vaquero-vigo"
                  onClick={(e) => onNavigate('/blog/guia-arreglos-ropa-bajo-vaquero-vigo', e)}
                  className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-medium text-[#0C65A1] hover:underline underline-offset-4 whitespace-nowrap shrink-0"
                >
                  <span>Leer guía de arreglos y modista in situ</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCALIZADOR DE PUNTOS DE COSTURA */}
      <section
        id="localizador-puntos-costura"
        className="py-12 sm:py-16 lg:py-24 bg-white border-t border-slate-200/70"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-7 sm:mb-10">
            <p className="text-xs uppercase tracking-[0.06em] font-semibold text-[#0C65A1] mb-1.5">
              Tiendas propias y colaboradores
            </p>
            <h2 className="font-editorial-display text-[1.75rem] sm:text-3xl lg:text-[2.35rem] font-medium text-[#002147] tracking-[-0.015em] leading-[1.15] mb-3 text-balance">
              Dónde llevar tu ropa a arreglar
            </h2>
            <p className="sm:hidden text-[15px] text-slate-600 leading-[1.65]">
              Filtra por localidad o busca tu calle para ver horario y teléfono directo.
            </p>
            <p className="hidden sm:block text-base text-slate-600 leading-[1.7]">
              Nuestras {TIENDAS_PROPIAS.length} tiendas propias en Vigo realizan arreglos de ropa, y también ofrecen servicio de costura los puntos colaboradores de{' '}
              {puntosColaboradoresConCostura
                .map((p) => `${p.localidad} (${p.nombre_comercio})`)
                .join(', ')}
              .
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 mb-8">
            <div className="flex items-center gap-1.5 p-1 bg-[#FAF9F6] border border-slate-200/80 rounded-full max-w-full overflow-x-auto no-scrollbar md:w-fit">
              {localidadesCosturaDisponibles.map((loc) => {
                const active = selectedLocalidad === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setSelectedLocalidad(loc)}
                    aria-pressed={active}
                    className={`min-h-[44px] px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#002147] text-white'
                        : 'text-slate-600 hover:text-[#002147] hover:bg-white'
                    }`}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
              <div className="md:hidden grid grid-cols-3 gap-1 p-1 bg-[#FAF9F6] border border-slate-200/80 rounded-full">
                <button
                  type="button"
                  onClick={() => setSelectedTipo('todos')}
                  aria-pressed={selectedTipo === 'todos'}
                  className={`min-h-[44px] px-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    selectedTipo === 'todos'
                      ? 'bg-[#0F76BB] text-white'
                      : 'text-slate-600 hover:text-[#002147]'
                  }`}
                >
                  Todos ({filteredEstablecimientos.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTipo('tienda')}
                  aria-pressed={selectedTipo === 'tienda'}
                  className={`min-h-[44px] px-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    selectedTipo === 'tienda'
                      ? 'bg-[#0F76BB] text-white'
                      : 'text-slate-600 hover:text-[#002147]'
                  }`}
                >
                  Tiendas Vigo
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedTipo('punto')}
                  aria-pressed={selectedTipo === 'punto'}
                  className={`min-h-[44px] px-2 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                    selectedTipo === 'punto'
                      ? 'bg-[#0F76BB] text-white'
                      : 'text-slate-600 hover:text-[#002147]'
                  }`}
                >
                  Puntos
                </button>
              </div>

              <select
                value={selectedServicioFilter}
                onChange={(e) =>
                  setSelectedServicioFilter(
                    e.target.value as 'costura_arreglos' | 'todos_servicios'
                  )
                }
                aria-label="Filtrar por servicio confirmado"
                className="hidden md:block min-h-[44px] px-4 py-2 rounded-full border border-slate-200 bg-[#FAF9F6] text-sm font-medium text-[#002147] focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
              >
                <option value="costura_arreglos">
                  Costura y arreglos ({PUNTOS_CON_COSTURA.length})
                </option>
                <option value="todos_servicios">
                  Todos los puntos ({REGISTROS_PUNTOS.length})
                </option>
              </select>

              <select
                value={selectedTipo}
                onChange={(e) =>
                  setSelectedTipo(e.target.value as 'todos' | 'tienda' | 'punto')
                }
                aria-label="Filtrar por tienda propia o punto colaborador"
                className="hidden md:block min-h-[44px] px-4 py-2 rounded-full border border-slate-200 bg-[#FAF9F6] text-sm font-medium text-[#002147] focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
              >
                <option value="todos">Tiendas y colaboradores</option>
                <option value="tienda">
                  Tiendas propias Vigo ({TIENDAS_PROPIAS.length})
                </option>
                <option value="punto">Solo colaboradores</option>
              </select>

              <div className="relative w-full sm:w-60">
                <label htmlFor="buscar-punto-costura" className="sr-only">
                  Buscar por calle, localidad o código postal
                </label>
                <Search
                  className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="buscar-punto-costura"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Calle, localidad o CP..."
                  className="w-full min-h-[44px] pl-10 pr-4 py-2 rounded-full border border-slate-200 bg-[#FAF9F6] text-base sm:text-sm text-slate-800 placeholder:text-slate-500 focus:bg-white focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                />
              </div>

              <label className="md:hidden inline-flex items-center gap-2 min-h-[44px] text-xs font-medium text-slate-600 px-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedServicioFilter === 'todos_servicios'}
                  onChange={(e) =>
                    setSelectedServicioFilter(
                      e.target.checked ? 'todos_servicios' : 'costura_arreglos'
                    )
                  }
                  className="w-4 h-4 rounded border-slate-300 text-[#0F76BB] focus:ring-[#0F76BB]"
                />
                <span>Incluir puntos sin costura ({REGISTROS_PUNTOS.length} en total)</span>
              </label>
            </div>
          </div>

          {tiendasPropiasFiltradas.length > 0 && (
            <div className="mb-10 sm:mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Store className="w-4 h-4 text-[#0C65A1] shrink-0" aria-hidden="true" />
                <h3 className="text-xs uppercase tracking-[0.06em] font-semibold text-[#002147]">
                  Tiendas propias en Vigo ({tiendasPropiasFiltradas.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {tiendasPropiasFiltradas.map(renderEstablecimientoCosturaCard)}
              </div>
            </div>
          )}

          {puntosColaboradoresFiltrados.length > 0 && (
            <div className="mb-10 sm:mb-12">
              <div className="flex items-center gap-2 mb-2">
                <Handshake className="w-4 h-4 text-[#0C65A1] shrink-0" aria-hidden="true" />
                <h3 className="text-xs uppercase tracking-[0.06em] font-semibold text-[#002147]">
                  Puntos colaboradores ({puntosColaboradoresFiltrados.length})
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                Establecimientos independientes en el área de Vigo donde gestionar arreglos de costura y encargos Mimos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {puntosColaboradoresFiltrados.map(renderEstablecimientoCosturaCard)}
              </div>
            </div>
          )}

          {filteredEstablecimientos.length === 0 && (
            <div className="p-8 rounded-2xl border border-slate-200 bg-[#FAF9F6] text-center space-y-3 mb-10">
              <p className="text-base font-medium text-[#002147]">
                No hay establecimientos que coincidan con ese filtro.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedLocalidad('Todas');
                  setSelectedTipo('todos');
                  setSearchQuery('');
                }}
                className="min-h-[44px] px-5 py-2 rounded-full bg-[#002147] text-white text-xs font-medium cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>
          )}

          <div className="pt-6 border-t border-slate-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Consulta todas las ubicaciones, horarios actualizados y servicios de nuestra red completa en Vigo y comarca.
            </p>
            <a
              href="/puntos-mimos"
              onClick={(e) => onNavigate('/puntos-mimos', e)}
              className="inline-flex items-center gap-1.5 min-h-[44px] text-xs sm:text-sm font-medium text-[#0C65A1] hover:underline underline-offset-4 sm:whitespace-nowrap shrink-0"
            >
              <span>Ver mapa completo de puntos</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. CÓMO PEDIRLO Y FACTORES DE PRESUPUESTO */}
      <section className="py-12 sm:py-16 lg:py-24 bg-[#FAF9F6] border-t border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-20">
          <div>
            <div className="max-w-2xl mb-8 sm:mb-10">
              <p className="text-xs uppercase tracking-[0.06em] font-semibold text-[#0C65A1] mb-1.5">
                Proceso en mostrador o por WhatsApp
              </p>
              <h2 className="font-editorial-display text-[1.75rem] sm:text-3xl lg:text-[2.25rem] font-medium text-[#002147] tracking-[-0.015em] leading-[1.15] text-balance">
                Cómo solicitar tu arreglo paso a paso
              </h2>
            </div>

            <div className="divide-y divide-slate-200/80 md:divide-y-0 grid grid-cols-1 md:grid-cols-3 md:gap-10">
              {SERVICIO_ARREGLOS_DATA.comoPedirloPasos.map((paso) => (
                <article
                  key={paso.num}
                  className="py-6 md:py-0 md:pt-5 md:border-t md:border-slate-200/80"
                >
                  <span className="font-editorial-display text-3xl font-normal text-[#0C65A1] block mb-2">
                    {paso.num}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-[#002147] leading-snug mb-2">
                    {paso.titulo}
                  </h3>
                  <p className="text-[15px] text-slate-600 leading-[1.7]">
                    {paso.descripcion}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="pt-10 border-t border-slate-200/80">
            <div className="max-w-2xl mb-8 sm:mb-10">
              <p className="text-xs uppercase tracking-[0.06em] font-semibold text-[#0C65A1] mb-1.5">
                Valoración clara · Sin tarifas cerradas estándar
              </p>
              <h2 className="font-editorial-display text-[1.75rem] sm:text-3xl lg:text-[2.25rem] font-medium text-[#002147] tracking-[-0.015em] leading-[1.15] mb-3 text-balance">
                ¿De qué dependen el presupuesto y el plazo?
              </h2>
              <p className="text-[15px] sm:text-base text-slate-600 leading-[1.7]">
                Cada prenda tiene una confección distinta. Confirmamos presupuesto y plazo tras revisar la pieza según cuatro criterios:
              </p>
            </div>

            <div className="divide-y divide-slate-200/80 md:divide-y-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
              {SERVICIO_ARREGLOS_DATA.factoresPresupuestoYPlazo.map((f, idx) => (
                <article
                  key={f.titulo}
                  className="py-5 md:py-0 md:pt-5 md:border-t md:border-slate-200/80"
                >
                  <p className="font-mono text-xs text-[#0C65A1] tabular-nums mb-1.5">
                    0{idx + 1}
                  </p>
                  <h3 className="text-base font-semibold text-[#002147] mb-1.5">
                    {f.titulo}
                  </h3>
                  <p className="text-[15px] sm:text-sm text-slate-600 leading-[1.7]">
                    {f.detalle}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. CONSULTAR MI ARREGLO CON MIMO */}
      <section
        id="consultar-arreglo-mimo"
        className="py-14 sm:py-20 bg-[#F4F9FE] border-t border-slate-200/70"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left sm:text-center max-w-xl mx-auto mb-8">
            <div className="flex items-center sm:justify-center gap-2.5 mb-2">
              <img
                src="/images/ositos/osito-costura.webp"
                alt=""
                aria-hidden="true"
                width={38}
                height={38}
                className="w-9.5 h-9.5 object-contain shrink-0"
              />
              <span className="text-xs uppercase tracking-[0.06em] font-semibold text-[#0C65A1]">
                WhatsApp · {CONTACT_INFO.whatsappNumber}
              </span>
            </div>
            <h2 className="font-editorial-display text-[1.85rem] sm:text-3xl lg:text-4xl font-medium text-[#002147] tracking-[-0.015em] mb-3 text-balance">
              Consultar mi arreglo con Mimo
            </h2>
            <p className="sm:hidden text-[15px] text-slate-600 leading-[1.65]">
              Elige arreglo, prenda y tienda para abrir WhatsApp con el mensaje listo; Mimo te pedirá fotos en el chat si hacen falta.
            </p>
            <p className="hidden sm:block text-base text-slate-600 leading-[1.7]">
              Selecciona el tipo de arreglo, la prenda y tu establecimiento más cercano para abrir WhatsApp con el mensaje listo.{' '}
              <strong className="font-medium text-[#002147]">
                Mimo te pedirá fotos dentro del chat
              </strong>{' '}
              si hacen falta para orientarte.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/70 p-6 sm:p-8 shadow-[0_6px_30px_-14px_rgba(0,33,71,0.08)] space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="arr-tipo"
                  className="block text-xs font-medium text-slate-600 mb-1.5"
                >
                  Tipo de arreglo
                </label>
                <select
                  id="arr-tipo"
                  value={tipoArreglo}
                  onChange={(e) => setTipoArreglo(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#FAF9F6] text-base sm:text-sm font-medium text-[#002147] focus:bg-white focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                >
                  <option value="Bajos o bastillas">Bajos o bastillas</option>
                  <option value="Bajo original de vaquero">Bajo original de vaquero</option>
                  <option value="Cambio o reparación de cremallera">
                    Cambio o reparación de cremallera
                  </option>
                  <option value="Estrechar o ensanchar prenda">
                    Estrechar o ensanchar prenda
                  </option>
                  <option value="Ajuste de cintura">Ajuste de cintura</option>
                  <option value="Cambio o reparación de botones">
                    Cambio o reparación de botones
                  </option>
                  <option value="Zurcido, descosido o roto">Zurcido, descosido o roto</option>
                  <option value="Arreglo en prenda delicada o de ceremonia">
                    Arreglo en prenda delicada o de ceremonia
                  </option>
                  <option value="Arreglo en prenda de piel">
                    Arreglo en prenda de piel (Gregorio Espino / Navia)
                  </option>
                  <option value="Bordado personalizado">
                    Bordado personalizado (Gregorio Espino)
                  </option>
                  <option value="Confección de cortinas, estores o cojines">
                    Confección de cortinas, estores o cojines
                  </option>
                  <option value="Servicio de arreglo express">
                    Servicio de arreglo express (consultar en Gregorio Espino)
                  </option>
                  <option value="Arreglo + Tintorería / Planchado">
                    Arreglo + Tintorería / Planchado
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="arr-prenda"
                  className="block text-xs font-medium text-slate-600 mb-1.5"
                >
                  Prenda
                </label>
                <select
                  id="arr-prenda"
                  value={tipoPrenda}
                  onChange={(e) => setTipoPrenda(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#FAF9F6] text-base sm:text-sm font-medium text-[#002147] focus:bg-white focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                >
                  <option value="Pantalón">Pantalón</option>
                  <option value="Falda">Falda</option>
                  <option value="Vestido o prenda delicada">Vestido o prenda delicada</option>
                  <option value="Camisa o blusa">Camisa o blusa</option>
                  <option value="Chaqueta o americana">Chaqueta o americana</option>
                  <option value="Abrigo o gabardina">Abrigo o gabardina</option>
                  <option value="Prenda de piel o cuero">Prenda de piel o cuero</option>
                  <option value="Cortinas, estores o cojines">Cortinas, estores o cojines</option>
                  <option value="Otra prenda o textil (consultar)">
                    Otra prenda o textil (consultar)
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="arr-zona"
                  className="block text-xs font-medium text-slate-600 mb-1.5"
                >
                  Tienda o punto de costura
                </label>
                <select
                  id="arr-zona"
                  value={zonaPreferida}
                  onChange={(e) => setZonaPreferida(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-slate-200 bg-[#FAF9F6] text-base sm:text-sm font-medium text-[#002147] focus:bg-white focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                >
                  {PUNTOS_CON_COSTURA.map((p) => (
                    <option key={p.id} value={formatPuntoCosturaOptionValue(p)}>
                      {formatPuntoCosturaOptionLabel(p)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="arr-detalles"
                className="block text-xs font-medium text-slate-600 mb-1.5"
              >
                Detalles sobre el tejido o el arreglo (opcional)
              </label>
              <input
                id="arr-detalles"
                type="text"
                value={detallesExtra}
                onChange={(e) => setDetallesExtra(e.target.value)}
                placeholder="Ej.: Es un pantalón de traje con vuelta, o un abrigo con forro..."
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-200 bg-[#FAF9F6] text-base sm:text-sm text-[#002147] placeholder:text-slate-500 focus:bg-white focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={whatsappArregloUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick(SERVICIO_ARREGLOS_DATA.url, 'service_detail_builder', {
                    service_id: 'arreglos-de-ropa',
                  })
                }
                className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#13733B] hover:bg-[#0F5C2F] text-white font-semibold text-sm sm:text-base py-3 px-6 rounded-full transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Consultar mi arreglo con Mimo en WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="min-h-[48px] inline-flex items-center justify-center gap-1.5 border border-slate-300 bg-white hover:border-[#002147] px-5 py-3 rounded-full text-xs font-medium text-[#002147] cursor-pointer transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#13733B]" aria-hidden="true" />
                    <span>Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Copiar texto</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-600 text-center">
              El presupuesto definitivo y el plazo de entrega se confirman al revisar la prenda en el establecimiento.
            </p>
          </div>
        </div>
      </section>

      {/* 6. PREGUNTAS FRECUENTES */}
      <section className="py-12 sm:py-16 lg:py-24 bg-white border-t border-slate-200/70">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10">
            <p className="text-xs uppercase tracking-[0.06em] font-semibold text-[#0C65A1] mb-1.5">
              Dudas habituales
            </p>
            <h2 className="font-editorial-display text-[1.75rem] sm:text-3xl font-medium text-[#002147] tracking-[-0.015em] text-balance">
              Preguntas frecuentes sobre arreglos de ropa
            </h2>
          </div>

          <div className="divide-y divide-slate-200/80 border-t border-b border-slate-200/80">
            {SERVICIO_ARREGLOS_DATA.preguntasFrecuentes.map((faq) => (
              <details key={faq.pregunta} className="group py-4 sm:py-5">
                <summary className="min-h-[44px] font-medium text-[#002147] cursor-pointer list-none flex items-center justify-between gap-4 text-[15px] sm:text-base">
                  <span>{faq.pregunta}</span>
                  <span
                    aria-hidden="true"
                    className="text-[#0C65A1] text-xl font-light group-open:rotate-45 transition-transform shrink-0"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-[15px] text-slate-600 leading-[1.7] pr-6">
                  {faq.respuesta}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 7. ENLACES RELACIONADOS Y LLAMADA FINAL */}
      <section className="pt-12 pb-24 sm:py-16 bg-[#FAF9F6] border-t border-slate-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-editorial-display text-xl sm:text-2xl font-medium text-[#002147] mb-6 sm:mb-8">
            Servicios relacionados y red de puntos
          </h2>

          <div className="divide-y divide-slate-200/80 md:divide-y-0 grid grid-cols-1 md:grid-cols-3 md:gap-10 mb-10 sm:mb-12">
            {SERVICIO_ARREGLOS_DATA.enlacesRelacionados.map((rel) => (
              <a
                key={rel.href}
                href={rel.href}
                onClick={(e) => onNavigate(rel.href, e)}
                className="py-5 md:py-0 md:pt-5 md:border-t md:border-slate-200/80 flex flex-col justify-between group transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-base font-semibold text-[#002147] group-hover:text-[#0C65A1] transition-colors">
                      {rel.titulo}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-[#0C65A1] shrink-0" aria-hidden="true" />
                  </div>
                  <p className="text-sm text-slate-600 leading-[1.65]">
                    {rel.descripcion}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="inline-flex items-center gap-2 min-h-[44px] text-sm font-medium text-slate-600 hover:text-[#002147] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Volver a la portada de Tintorería Mimos Navia</span>
            </a>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={whatsappArregloUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick(SERVICIO_ARREGLOS_DATA.url, 'service_detail_footer', {
                    service_id: 'arreglos-de-ropa',
                  })
                }
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#13733B] hover:bg-[#0F5C2F] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Consultar mi arreglo con Mimo</span>
              </a>
              <a
                href={CONTACT_INFO.phoneHref}
                onClick={() => trackPhoneClick(SERVICIO_ARREGLOS_DATA.url, 'service_detail')}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-[#002147] text-[#002147] font-medium text-sm px-5 py-3 rounded-full transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#0C65A1] shrink-0" aria-hidden="true" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
