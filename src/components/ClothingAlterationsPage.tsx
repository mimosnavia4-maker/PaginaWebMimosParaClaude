import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  ExternalLink,
  Handshake,
  MapPin,
  MessageCircle,
  Phone,
  Scissors,
  Search,
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
import { PageHeroLight } from './PageHeroLight';

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

    return (
      <article
        key={punto.id}
        className={`rounded-sm border p-6 flex flex-col justify-between transition-colors bg-white ${
          punto.tipo === 'tienda'
            ? 'border-[#0F76BB]/40 border-l-4 border-l-[#0F76BB]'
            : 'border-slate-200'
        }`}
      >
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-3">
            <span className="inline-flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider text-[#0F76BB]">
              {punto.tipo === 'tienda' ? (
                <>
                  <Store className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Tienda propia Mimos · {punto.localidad}</span>
                </>
              ) : (
                <>
                  <Handshake className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>Punto colaborador · {punto.localidad}</span>
                </>
              )}
            </span>

            {punto.id === 'gregorio-espino' || punto.id === 'rua-venezuela' ? (
              <span className="text-xs font-bold text-[#178A47]">
                Taller propio in situ
              </span>
            ) : punto.id === 'as-teixugueiras' ? (
              <span className="text-xs font-bold text-[#0F76BB]">
                Recepción para taller propio
              </span>
            ) : tieneCostura ? (
              <span className="text-xs font-bold text-[#178A47]">
                Taller del colaborador
              </span>
            ) : null}
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] mb-1">
            {punto.nombre_mostrado}
          </h3>

          {punto.tipo === 'punto' && (
            <p className="text-xs font-semibold text-slate-600 mb-3">
              Establecimiento colaborador: {punto.nombre_comercio}
            </p>
          )}

          <dl className="space-y-2 text-sm text-slate-600 mb-4">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#0F76BB] shrink-0 mt-1" aria-hidden="true" />
              <div>
                <dt className="sr-only">Dirección</dt>
                <dd className="font-bold text-slate-800">
                  {punto.direccion} · <span className="font-mono">{punto.codigo_postal}</span>{' '}
                  {punto.localidad}
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#0F76BB] shrink-0 mt-1" aria-hidden="true" />
              <div>
                <dt className="sr-only">Horario</dt>
                <dd>{punto.horario.resumen}</dd>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
              <div>
                <dt className="sr-only">Teléfono</dt>
                <dd>
                  <a
                    href={`tel:+34${punto.telefono}`}
                    className="inline-flex items-center min-h-[36px] font-bold text-[#002147] hover:text-[#0F76BB] hover:underline tabular-nums"
                  >
                    {punto.telefonos_mostrados}
                  </a>
                </dd>
              </div>
            </div>
          </dl>

          {tieneCostura && punto.arreglos_confirmados.length > 0 ? (
            <div className="p-3.5 rounded-sm bg-[#F7F6F2] border border-slate-200 mb-4">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#002147] mb-2 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5 text-[#0F76BB]" aria-hidden="true" />
                <span>Arreglos confirmados en este establecimiento:</span>
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {punto.arreglos_confirmados.map((arr) => (
                  <li key={arr} className="flex items-start gap-2">
                    <CheckCircle2
                      className="w-3.5 h-3.5 text-[#0F76BB] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{arr}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-3.5 rounded-sm bg-[#F7F6F2] border border-slate-200 text-xs text-slate-600 mb-4">
              <p className="font-bold text-[#002147] mb-1.5">
                Servicios confirmados en este establecimiento:
              </p>
              <ul className="space-y-1">
                {derivarEtiquetasServicios(punto.servicios_confirmados).map((srv) => (
                  <li key={srv} className="flex items-start gap-1.5">
                    <CheckCircle2
                      className="w-3.5 h-3.5 text-[#0F76BB] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{srv}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
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
            className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg bg-[#1FA855] hover:bg-[#178A47] text-white text-xs font-bold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span>Consultar con Mimo</span>
          </a>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 min-h-[44px] text-xs font-bold text-[#002147] hover:text-[#0F76BB]"
            >
              <span>Cómo llegar</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>

            {zonaPage && (
              <a
                href={zonaPage.url}
                onClick={(e) => onNavigate(zonaPage.url, e)}
                className="inline-flex items-center gap-1 min-h-[44px] text-xs font-bold text-[#0F76BB] hover:underline"
              >
                <span>Zona {punto.localidad}</span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
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
      className="focus:outline-hidden bg-white text-slate-900 border-b border-slate-200"
    >
      {/* 1. CABECERA LUMINOSA */}
      <PageHeroLight
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Servicios', href: '/#servicios' },
          { label: 'Arreglos de ropa en Vigo' },
        ]}
        onNavigate={onNavigate}
        kicker="Sin cita previa · Taller propio in situ en Gregorio Espino y Venezuela · Recepción en Navia"
        title={SERVICIO_ARREGLOS_DATA.h1}
        description={SERVICIO_ARREGLOS_DATA.subtituloCabecera}
        whatsappHref={whatsappArregloUrl}
        whatsappLabel="Consultar mi arreglo con Mimo"
        onWhatsAppClick={() =>
          trackWhatsAppClick(SERVICIO_ARREGLOS_DATA.url, 'service_detail', {
            service_id: 'arreglos-de-ropa',
          })
        }
        secondaryAction={{
          label: 'Encontrar mi punto de costura',
          href: '#localizador-puntos-costura',
          icon: <MapPin className="w-4 h-4 shrink-0" aria-hidden="true" />,
          isInternalRoute: false,
        }}
        image={{
          src: IMAGES.arreglosRopa,
          alt: 'Trabajo profesional de costura y marcado de bajo de pantalón con jaboncillo de sastre en Vigo',
          caption:
            'Taller propio de costura in situ en Gregorio Espino y Venezuela, recepción de prendas en Navia y red de colaboradores.',
          fallbackTitle: 'Costura y composturas profesionales en Vigo',
          fallbackSubtitle: 'Atención directa sin cita previa en nuestras tiendas de Vigo',
        }}
      />

      {/* 2. QUÉ ARREGLAMOS: trabajos organizados por categoría y disponibilidad (Blanco) */}
      <section className="py-14 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Guía rápida antes de acudir */}
          <div className="rounded-sm border border-[#0F76BB]/25 bg-[#EDF5FD] p-6 sm:p-8 space-y-5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0F76BB]">
                  Consejos prácticos antes de venir (sin cita previa)
                </p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                  Cómo preparar tu prenda y qué centro elegir en Vigo
                </h2>
              </div>
              <a
                href="/blog/guia-arreglos-ropa-bajo-vaquero-vigo"
                onClick={(e) => onNavigate('/blog/guia-arreglos-ropa-bajo-vaquero-vigo', e)}
                className="inline-flex items-center gap-1.5 min-h-[44px] text-xs sm:text-sm font-extrabold text-[#0F76BB] hover:underline whitespace-nowrap shrink-0"
              >
                <span>Leer guía técnica de bajo original y ceremonia</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700">
              <div className="rounded-sm border border-slate-200 bg-white p-4 space-y-1.5">
                <h3 className="font-extrabold text-[#002147]">
                  1. Calzado y margen de encogimiento
                </h3>
                <p className="leading-relaxed">
                  Trae el calzado definitivo (misma altura de tacón o suela) para marcar bajos o ceremonia, y lava antes vaqueros crudos o lino nuevo si aún no han tocado el agua.
                </p>
              </div>
              <div className="rounded-sm border border-slate-200 bg-white p-4 space-y-1.5">
                <h3 className="font-extrabold text-[#002147]">
                  2. Taller propio con probador in situ
                </h3>
                <p className="leading-relaxed">
                  Modista y probador propios en{' '}
                  <strong>Alcalde Gregorio Espino, 42</strong> (L–V y sábados mañana; piel, bordados, hogar) y{' '}
                  <strong>Rúa de Venezuela, 29, Entreplanta</strong> (L–V; cerrado sábados).
                </p>
              </div>
              <div className="rounded-sm border border-slate-200 bg-white p-4 space-y-1.5">
                <h3 className="font-extrabold text-[#002147]">
                  3. Navia y puntos colaboradores
                </h3>
                <p className="leading-relaxed">
                  En <strong>Navia</strong> (C/ Teixugueiras, 11, bajo 9) recepcionamos arreglos sin prueba con traslado gratuito; en Gondomar, Ponteareas y O Porriño disponen de costura local. D’Passo (As Travesas) y Redondela son solo tintorería/lavandería.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#0F76BB] mb-1">
                  Composturas de ropa de vestir · Tiendas propias y puntos con costura
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                  Qué arreglos de ropa realizamos
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                  Trabajamos tanto las composturas habituales del día a día como trabajos especializados de taller propio (piel, prendas delicadas, bordados, confección hogar y servicio express), siempre con revisión previa del tejido y las costuras:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICIO_ARREGLOS_DATA.trabajosConfirmados.map((item) => (
                  <article
                    key={item.id}
                    className="p-5 rounded-sm border border-slate-200 bg-[#F7F6F2]/70 flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-[11px] font-mono font-bold text-[#0F76BB] mb-1">
                        {item.disponibilidad}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <Scissors className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                        <h3 className="text-base sm:text-lg font-extrabold text-[#002147]">
                          {item.titulo}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                        {item.descripcion}
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 pt-2 border-t border-slate-200">
                      <strong className="text-[#002147]">Prendas:</strong>{' '}
                      {item.prendasHabituales}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Panel lateral: Prendas confirmadas y ventaja de combinar con Tintorería */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-sm border border-slate-200 bg-[#F7F6F2] p-6 space-y-4">
                <h3 className="text-lg font-extrabold text-[#002147]">
                  Prendas que atendemos
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  {SERVICIO_ARREGLOS_DATA.prendasConfirmadas.map((prenda) => (
                    <li key={prenda} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{prenda}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-3 border-t border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <strong className="text-[#002147]">Especialidades y hogar en tienda propia:</strong> Arreglos en piel, bordados personalizados, confección de cortinas, estores y cojines, y servicio express en nuestro taller de <strong>Gregorio Espino</strong> (con recepción previa en Navia bajo consulta con Mimo).
                </div>
              </div>

              <div className="rounded-sm border border-[#0F76BB]/25 border-l-4 border-l-[#0F76BB] bg-[#EDF5FD] p-6 space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0F76BB]">
                  Servicio combinado Mimos
                </p>
                <h3 className="text-lg font-extrabold text-[#002147]">
                  Costura + Tintorería y Planchado en un solo paso
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  ¿Necesitas subir el bajo de un pantalón de traje, ajustar un vestido de invitada o cambiar la cremallera de un abrigo y dejarlo limpio y planchado? En Mimos puedes solicitar ambos servicios a la vez.
                </p>
              </div>
            </div>
          </div>

          {/* Especialidades de taller propio + Confección Hogar */}
          <div className="pt-10 border-t border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0F76BB] mb-1">
                  Especialidades de taller propio en Vigo
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] tracking-tight">
                  Prendas delicadas, arreglos de piel, bordados y servicio express
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICIO_ARREGLOS_DATA.especialidadesTallerPropio.map((esp) => (
                  <article
                    key={esp.id}
                    className="p-5 rounded-sm border border-slate-200 bg-[#F7F6F2]/70"
                  >
                    <p className="text-[11px] font-mono font-bold text-[#0F76BB] mb-1">
                      {esp.disponibilidad}
                    </p>
                    <h4 className="text-base font-extrabold text-[#002147] mb-1.5">
                      {esp.titulo}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {esp.descripcion}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 rounded-sm border border-slate-200 bg-[#F7F6F2] p-6 sm:p-7 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#0F76BB] mb-1">
                  Taller propio Gregorio Espino · Vigo
                </p>
                <h3 className="text-xl font-extrabold text-[#002147]">
                  Confección de textiles del hogar a medida
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  Además de la compostura de prendas de vestir, confeccionamos textiles para tu vivienda u oficina bajo medida y valoración en taller:
                </p>
              </div>

              <div className="space-y-3">
                {SERVICIO_ARREGLOS_DATA.confeccionHogar.map((conf) => (
                  <div
                    key={conf.id}
                    className="p-3.5 rounded-sm border border-slate-200 bg-white"
                  >
                    <h4 className="text-sm font-extrabold text-[#002147] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
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

          {/* Índice completo de trabajos de costura y confección */}
          <div className="p-6 sm:p-7 rounded-sm border border-slate-200 bg-[#F7F6F2]">
            <p className="text-xs font-bold uppercase tracking-wider text-[#0F76BB] mb-3">
              Listado completo de trabajos de costura y confección profesional
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-xs sm:text-sm text-slate-700">
              {SERVICIO_ARREGLOS_DATA.catalogoCompleto18Puntos.map((puntoNombre, idx) => (
                <li key={puntoNombre} className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#0F76BB] tabular-nums w-6 shrink-0">
                    {idx + 1 < 10 ? `0${idx + 1}.` : `${idx + 1}.`}
                  </span>
                  <span>{puntoNombre}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-slate-600">
                ¿Dudas sobre cómo conservamos el desgastado en el <strong className="text-[#002147]">bajo original de vaquero</strong> o dónde acudir sin cita previa según el tipo de prenda?
              </p>
              <a
                href="/blog/guia-arreglos-ropa-bajo-vaquero-vigo"
                onClick={(e) => onNavigate('/blog/guia-arreglos-ropa-bajo-vaquero-vigo', e)}
                className="inline-flex items-center gap-1.5 min-h-[44px] text-xs sm:text-sm font-bold text-[#0F76BB] hover:underline whitespace-nowrap shrink-0"
              >
                <span>Leer guía de arreglos, bajo original y modista in situ</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOCALIZADOR DE PUNTOS DE COSTURA (#F7F6F2) */}
      <section
        id="localizador-puntos-costura"
        className="py-14 lg:py-20 bg-[#F7F6F2] border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <p className="text-xs sm:text-sm font-bold text-[#0F76BB] mb-1">
              Localizador de establecimientos por localidad y servicio
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight mb-3 text-balance">
              Dónde llevar tu ropa a arreglar: tiendas propias en Vigo y puntos colaboradores con costura
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Nuestras <strong>{TIENDAS_PROPIAS.length} tiendas propias en Vigo</strong> realizan arreglos de ropa, y también ofrecen servicio de costura los puntos colaboradores de{' '}
              <strong>
                {puntosColaboradoresConCostura
                  .map((p) => `${p.localidad} (${p.nombre_comercio})`)
                  .join(', ')}
              </strong>
              . Diferenciamos cada ficha para que elijas con total claridad:
            </p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            {/* Filtro por localidad */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-white border border-slate-200 rounded-lg w-fit">
              {localidadesCosturaDisponibles.map((loc) => {
                const active = selectedLocalidad === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setSelectedLocalidad(loc)}
                    aria-pressed={active}
                    className={`min-h-[40px] px-3.5 py-2 rounded-md text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#002147] text-white'
                        : 'text-slate-700 hover:text-[#002147] hover:bg-slate-50'
                    }`}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <select
                value={selectedServicioFilter}
                onChange={(e) =>
                  setSelectedServicioFilter(
                    e.target.value as 'costura_arreglos' | 'todos_servicios'
                  )
                }
                aria-label="Filtrar por servicio confirmado"
                className="min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-white text-base sm:text-sm font-bold text-[#002147] focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
              >
                <option value="costura_arreglos">
                  Servicio: Costura y arreglos ({PUNTOS_CON_COSTURA.length})
                </option>
                <option value="todos_servicios">
                  Todos los puntos Mimos ({REGISTROS_PUNTOS.length})
                </option>
              </select>

              <select
                value={selectedTipo}
                onChange={(e) =>
                  setSelectedTipo(e.target.value as 'todos' | 'tienda' | 'punto')
                }
                aria-label="Filtrar por tienda propia o punto colaborador"
                className="min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-white text-base sm:text-sm font-bold text-[#002147] focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
              >
                <option value="todos">Tiendas propias y colaboradores</option>
                <option value="tienda">
                  Solo tiendas propias en Vigo ({TIENDAS_PROPIAS.length})
                </option>
                <option value="punto">Solo puntos colaboradores</option>
              </select>

              <div className="relative w-full sm:w-64">
                <label htmlFor="buscar-punto-costura" className="sr-only">
                  Buscar por calle, localidad o código postal
                </label>
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="buscar-punto-costura"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Calle, localidad o CP..."
                  className="w-full min-h-[44px] pl-10 pr-4 py-2.5 rounded-sm border border-slate-300 bg-white text-base sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                />
              </div>
            </div>
          </div>

          {tiendasPropiasFiltradas.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-2.5 mb-4">
                <Store className="w-5 h-5 text-[#0F76BB]" aria-hidden="true" />
                <h3 className="text-xl font-extrabold text-[#002147]">
                  Tiendas propias de Tintorería Mimos en Vigo con servicio de costura (
                  {tiendasPropiasFiltradas.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tiendasPropiasFiltradas.map(renderEstablecimientoCosturaCard)}
              </div>
            </div>
          )}

          {puntosColaboradoresFiltrados.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-2.5 mb-2">
                <Handshake className="w-5 h-5 text-[#0F76BB]" aria-hidden="true" />
                <h3 className="text-xl font-extrabold text-[#002147]">
                  Puntos colaboradores ({puntosColaboradoresFiltrados.length})
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mb-4">
                Establecimientos colaboradores independientes en el área de Vigo donde puedes gestionar tus arreglos de costura y tus encargos de Tintorería Mimos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {puntosColaboradoresFiltrados.map(renderEstablecimientoCosturaCard)}
              </div>
            </div>
          )}

          {filteredEstablecimientos.length === 0 && (
            <div className="p-8 rounded-sm border border-slate-200 bg-white text-center space-y-3 mb-10">
              <p className="text-base font-bold text-[#002147]">
                No hay establecimientos que coincidan con ese filtro.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedLocalidad('Todas');
                  setSelectedTipo('todos');
                  setSearchQuery('');
                }}
                className="min-h-[44px] px-4 py-2 rounded-lg bg-[#002147] text-white text-xs font-bold cursor-pointer"
              >
                Restablecer filtros de costura
              </button>
            </div>
          )}

          <div className="p-5 sm:p-6 rounded-sm border border-slate-200 bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              <strong className="text-[#002147]">
                Red completa de tiendas propias y puntos colaboradores Mimos:
              </strong>{' '}
              Consulta todas las ubicaciones, horarios actualizados y servicios confirmados en cada establecimiento del área de Vigo.
            </div>
            <a
              href="/puntos-mimos"
              onClick={(e) => onNavigate('/puntos-mimos', e)}
              className="inline-flex items-center gap-1.5 min-h-[44px] text-xs font-bold text-[#0F76BB] hover:underline whitespace-nowrap shrink-0"
            >
              <span>Ver mapa completo de puntos</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. CÓMO PEDIRLO y 5. PRESUPUESTO Y PLAZO (Blanco) */}
      <section className="py-14 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div>
            <div className="max-w-3xl mb-8">
              <p className="text-xs sm:text-sm font-bold text-[#0F76BB] mb-1">
                Atención en mostrador o consulta previa por WhatsApp
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                Cómo solicitar tu arreglo de ropa paso a paso
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SERVICIO_ARREGLOS_DATA.comoPedirloPasos.map((paso) => (
                <article
                  key={paso.num}
                  className="p-6 rounded-sm border border-slate-200 bg-[#F7F6F2]/70"
                >
                  <span className="text-xs font-mono tabular-nums font-bold text-[#0F76BB]">
                    PASO {paso.num}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#002147] mt-1.5 mb-2">
                    {paso.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {paso.descripcion}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="pt-10 border-t border-slate-200">
            <div className="max-w-3xl mb-8">
              <p className="text-xs sm:text-sm font-bold text-[#0F76BB] mb-1">
                Valoración clara y sin sorpresas · Sin tarifas estándar cerradas
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight mb-2 text-balance">
                ¿De qué dependen el presupuesto y el plazo de entrega?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Cada prenda tiene una confección distinta. Por eso el presupuesto y el plazo se confirman al valorar la prenda según estos cuatro factores:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SERVICIO_ARREGLOS_DATA.factoresPresupuestoYPlazo.map((f, idx) => (
                <article
                  key={f.titulo}
                  className="p-5 rounded-sm border border-slate-200 bg-white"
                >
                  <h3 className="text-base font-extrabold text-[#002147] mb-1.5">
                    0{idx + 1}. {f.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {f.detalle}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. BLOQUE INTERACTIVO DE CONSULTA CON MIMO POR WHATSAPP (#EDF5FD) */}
      <section
        id="consultar-arreglo-mimo"
        className="py-16 lg:py-20 bg-[#EDF5FD] text-[#002147] border-b border-slate-200"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-xs sm:text-sm font-bold text-[#0F76BB] mb-2">
              Consulta directa por WhatsApp · {CONTACT_INFO.whatsappNumber}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] tracking-tight mb-3 text-balance">
              Consultar mi arreglo con Mimo
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Selecciona el tipo de arreglo, la prenda y tu establecimiento más cercano para abrir WhatsApp con el mensaje listo. Recuerda que un enlace de WhatsApp no adjunta imágenes automáticamente: <strong>Mimo te pedirá fotos dentro del chat</strong> si hacen falta para orientarte.
            </p>
          </div>

          <div className="rounded-sm bg-white border border-slate-200 text-slate-900 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="arr-tipo"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Tipo de arreglo
                </label>
                <select
                  id="arr-tipo"
                  value={tipoArreglo}
                  onChange={(e) => setTipoArreglo(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Prenda
                </label>
                <select
                  id="arr-prenda"
                  value={tipoPrenda}
                  onChange={(e) => setTipoPrenda(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Tienda o punto de costura
                </label>
                <select
                  id="arr-zona"
                  value={zonaPreferida}
                  onChange={(e) => setZonaPreferida(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
                className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
              >
                Detalles adicionales sobre el tejido o el arreglo (opcional)
              </label>
              <input
                id="arr-detalles"
                type="text"
                value={detallesExtra}
                onChange={(e) => setDetallesExtra(e.target.value)}
                placeholder="Ej.: Es un pantalón de traje con vuelta, o un abrigo con forro interior..."
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
                className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2.5 bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm sm:text-base py-3 px-6 rounded-lg transition-colors shadow-xs"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Consultar mi arreglo con Mimo en WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="min-h-[48px] inline-flex items-center justify-center gap-1.5 border border-[#002147] bg-white hover:bg-[#002147] hover:text-white px-4 py-3 rounded-lg text-xs font-bold text-[#002147] cursor-pointer transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#1FA855]" aria-hidden="true" />
                    <span>Mensaje copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Copiar texto</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-500 text-center">
              La aceptación del encargo, el presupuesto definitivo y el plazo de entrega se confirman al revisar la prenda en el establecimiento.
            </p>
          </div>
        </div>
      </section>

      {/* 6. PREGUNTAS FRECUENTES (#F7F6F2) */}
      <section className="py-14 lg:py-20 bg-[#F7F6F2] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-xs sm:text-sm font-bold text-[#0F76BB] mb-1">
              Dudas habituales sobre costura y composturas
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
              Preguntas frecuentes sobre arreglos de ropa en Vigo y comarca
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICIO_ARREGLOS_DATA.preguntasFrecuentes.map((faq) => (
              <details
                key={faq.pregunta}
                className="group rounded-sm border border-slate-200 bg-white p-5"
              >
                <summary className="min-h-[44px] font-extrabold text-[#002147] cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base">
                  <span>{faq.pregunta}</span>
                  <span className="text-[#0F76BB] font-mono text-lg group-open:rotate-45 transition-transform shrink-0">
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
      </section>

      {/* 7. ENLACES RELACIONADOS Y LLAMADA FINAL (Blanco) */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] mb-6">
            Servicios relacionados de cuidado textil y red de puntos Mimos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {SERVICIO_ARREGLOS_DATA.enlacesRelacionados.map((rel) => (
              <a
                key={rel.href}
                href={rel.href}
                onClick={(e) => onNavigate(rel.href, e)}
                className="p-6 rounded-sm border border-slate-200 hover:border-[#0F76BB] bg-[#F7F6F2]/60 flex flex-col justify-between group transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-extrabold text-[#002147] group-hover:text-[#0F76BB]">
                      {rel.titulo}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {rel.descripcion}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="inline-flex items-center gap-2 min-h-[44px] text-sm font-bold text-[#002147] hover:text-[#0F76BB]"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Volver a la portada de Tintorería Mimos Navia</span>
            </a>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={whatsappArregloUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick(SERVICIO_ARREGLOS_DATA.url, 'service_detail_footer', {
                    service_id: 'arreglos-de-ropa',
                  })
                }
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm px-5 py-3 rounded-lg transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Consultar mi arreglo con Mimo</span>
              </a>
              <a
                href={CONTACT_INFO.phoneHref}
                onClick={() => trackPhoneClick(SERVICIO_ARREGLOS_DATA.url, 'service_detail')}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-white border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-4 py-3 rounded-lg transition-colors tabular-nums group"
              >
                <Phone
                  className="w-4 h-4 text-[#0F76BB] group-hover:text-white shrink-0"
                  aria-hidden="true"
                />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
