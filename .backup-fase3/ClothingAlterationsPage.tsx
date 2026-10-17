import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  CheckCircle2,
  Scissors,
  Store,
  Handshake,
  MapPin,
  Clock,
  Search,
  ExternalLink,
  ArrowUpRight,
  Copy,
  Check,
} from 'lucide-react';
import {
  SERVICIO_ALFOMBRAS_DATA,
  SERVICIO_ARREGLOS_DATA,
  REGISTROS_PUNTOS,
  TIENDAS_PROPIAS,
  PUNTOS_CON_COSTURA,
  ZONAS_SEO_LOCAL,
  CONTACT_INFO,
  IMAGES,
  PuntoRegistro,
  buildMimoWhatsAppUrl,
  derivarEtiquetasServicios,
} from '../data/mimosData';

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
  // Estado del localizador filtrado por "Costura y arreglos" (Sección 7.3)
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

  // Estado del preparador de mensaje de WhatsApp para Mimo
  const [tipoArreglo, setTipoArreglo] = useState<string>('Bajos o bastillas');
  const [tipoPrenda, setTipoPrenda] = useState<string>('Pantalón');
  const [zonaPreferida, setZonaPreferida] = useState<string>(() =>
    PUNTOS_CON_COSTURA[0]
      ? formatPuntoCosturaOptionValue(PUNTOS_CON_COSTURA[0])
      : 'Tintorería Mimos Navia – C/ Teixugueiras, 11, bajo 9 (Vigo)'
  );
  const [detallesExtra, setDetallesExtra] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

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
      // ignore
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
    const zonaPage = ZONAS_SEO_LOCAL.find((z) => z.localidad === punto.localidad);
    const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${punto.direccion}, ${punto.codigo_postal} ${punto.localidad}`
    )}`;

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
        className={`rounded-2xl border p-6 flex flex-col justify-between transition-colors ${
          punto.tipo === 'tienda'
            ? 'border-[#002147]/35 dark:border-[#0F76BB]/60 bg-white dark:bg-[#071324]'
            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324]'
        }`}
      >
        <div>
          {/* Cabecera de Ficha: Tipo (Tienda propia vs Colaborador) + Localidad */}
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
                  <span>Punto colaborador · {punto.localidad}</span>
                </>
              )}
            </span>

            {tieneCostura && (
              <span className="text-xs font-bold text-[#178A47] dark:text-[#4ade80]">
                Costura y arreglos confirmados
              </span>
            )}
          </div>

          <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white mb-1">
            {punto.nombre_mostrado}
          </h3>

          {punto.tipo === 'punto' && (
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-3">
              Establecimiento colaborador: {punto.nombre_comercio}
            </p>
          )}

          {/* Datos de ubicación, horario y teléfono */}
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

          {/* Arreglos confirmados o servicios confirmados del establecimiento */}
          {tieneCostura && punto.arreglos_confirmados.length > 0 ? (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b1d36] border border-slate-200/80 dark:border-slate-800 mb-4">
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#002147] dark:text-[#60B5F6] mb-2 flex items-center gap-1.5">
                <Scissors className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Arreglos confirmados en este establecimiento:</span>
              </p>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
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
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0b1d36] border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 mb-4">
              <p className="font-bold text-[#002147] dark:text-slate-200 mb-1.5">
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

        {/* Acciones de la ficha */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={whatsappPuntoCosturaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#178A47] dark:text-[#4ade80] hover:underline"
            >
              <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Consultar arreglo aquí con Mimo</span>
            </a>

            <a
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#002147] dark:text-slate-200 hover:text-[#0F76BB]"
            >
              <span>Cómo llegar</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>

          {zonaPage && (
            <a
              href={zonaPage.url}
              onClick={(e) => onNavigate(zonaPage.url, e)}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
            >
              <span>Zona {punto.localidad}</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          )}
        </div>
      </article>
    );
  };

  return (
    <main className="bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
      {/* 1. CABECERA: H1, frase breve y botones «Consultar mi arreglo con Mimo» y «Encontrar mi punto de costura» */}
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
              <li className="text-[#60B5F6] font-bold">Arreglos de ropa en Vigo</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#60B5F6] font-mono uppercase tracking-wider font-bold">
                <span>Servicio Destacado</span>
                <span aria-hidden="true">·</span>
                <span>
                  {TIENDAS_PROPIAS.length} Tiendas Propias en Vigo y{' '}
                  {puntosColaboradoresConCostura.length} Puntos con Costura
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] text-balance">
                {SERVICIO_ARREGLOS_DATA.h1}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                {SERVICIO_ARREGLOS_DATA.subtituloCabecera}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href={whatsappArregloUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-5 sm:px-6 py-4 rounded-xl transition-colors text-center sm:whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Consultar mi arreglo con Mimo</span>
                </a>

                <a
                  href="#localizador-puntos-costura"
                  className="inline-flex items-center justify-center gap-2 bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm sm:text-base px-5 sm:px-6 py-4 rounded-xl transition-colors text-center sm:whitespace-nowrap shrink-0"
                >
                  <MapPin className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Encontrar mi punto de costura</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="rounded-2xl overflow-hidden border border-white/15 bg-[#071936] shadow-lg">
                {!imgError ? (
                  <img
                    src={IMAGES.arreglosRopa}
                    alt="Trabajo profesional de costura y marcado de bajo de pantalón con jaboncillo de sastre en Vigo"
                    width={800}
                    height={600}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full aspect-4/3 object-cover"
                  />
                ) : (
                  <div className="w-full aspect-4/3 bg-gradient-to-br from-[#071936] to-[#002147] flex flex-col items-center justify-center p-6 text-center">
                    <Scissors className="w-12 h-12 text-[#60B5F6] mb-3" aria-hidden="true" />
                    <p className="text-sm font-bold text-white">
                      Costura y composturas profesionales en Vigo
                    </p>
                  </div>
                )}
                <figcaption className="p-4 text-xs text-slate-300 border-t border-white/10">
                  Bajos, cremalleras, botones, entallados y composturas en nuestras 3 tiendas propias de Vigo y en puntos colaboradores con taller de costura.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUÉ ARREGLAMOS (Solo trabajos confirmados en prendas confirmadas — Sección 7.2) */}
      <section className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div>
                <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                  Composturas y costura de prendas de vestir
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                  Qué arreglos de ropa realizamos
                </h2>
                <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Trabajamos los arreglos y ajustes esenciales para que tus prendas sienten bien y duren más temporadas, siempre con revisión previa del tejido y las costuras:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SERVICIO_ARREGLOS_DATA.trabajosConfirmados.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Scissors
                          className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0"
                          aria-hidden="true"
                        />
                        <h3 className="text-base sm:text-lg font-extrabold text-[#002147] dark:text-white">
                          {item.titulo}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                        {item.descripcion}
                      </p>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/70 dark:border-slate-800">
                      <strong className="text-[#002147] dark:text-slate-200">Prendas:</strong>{' '}
                      {item.prendasHabituales}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Panel lateral: Prendas confirmadas y ventaja de combinar con Tintorería */}
            <div className="lg:col-span-4 space-y-6">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a1b33] p-6 space-y-4">
                <h3 className="text-lg font-extrabold text-[#002147] dark:text-white">
                  Prendas que atendemos
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-200">
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

                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Consultas sobre otros textiles:</strong> Para ropa del hogar, cortinas, estores, cojines, prendas de piel u otros trabajos especiales, consulta previamente con Mimo por WhatsApp para verificar disponibilidad y en qué establecimiento puede atenderse.
                </div>
              </div>

              <div className="rounded-2xl bg-[#002147] text-white p-6 space-y-3 border border-white/10">
                <p className="text-xs font-mono uppercase tracking-wider text-[#60B5F6] font-bold">
                  Servicio combinado Mimos
                </p>
                <h3 className="text-lg font-extrabold text-white">
                  Costura + Tintorería y Planchado en un solo paso
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  ¿Necesitas subir el bajo de un pantalón de traje, ajustar un vestido de invitada o cambiar la cremallera de un abrigo y dejarlo limpio y planchado? En Mimos puedes solicitar ambos servicios a la vez.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DÓNDE: Tiendas propias y puntos con costura con el localizador filtrado por «Costura y arreglos» (Sección 7.3) */}
      <section
        id="localizador-puntos-costura"
        className="py-14 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
              Localizador de establecimientos por localidad y servicio
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight mb-3">
              Dónde llevar tu ropa a arreglar: tiendas propias en Vigo y puntos colaboradores con costura
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Nuestras <strong>{TIENDAS_PROPIAS.length} tiendas propias en Vigo</strong> realizan arreglos de ropa, y también ofrecen servicio de costura los puntos colaboradores de{' '}
              <strong>
                {puntosColaboradoresConCostura
                  .map((p) => `${p.localidad} (${p.nombre_comercio})`)
                  .join(', ')}
              </strong>
              . Diferenciamos cada ficha para que elijas con total claridad:
            </p>
          </div>

          {/* Controles de filtrado por Localidad, Servicio, Tipo de establecimiento y Búsqueda */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            {/* Filtro por localidad */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-200/70 dark:bg-[#071324] rounded-xl w-fit">
              {localidadesCosturaDisponibles.map((loc) => {
                const active = selectedLocalidad === loc;
                return (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => setSelectedLocalidad(loc)}
                    aria-pressed={active}
                    className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#002147] text-white dark:bg-[#0F76BB]'
                        : 'text-slate-700 dark:text-slate-300 hover:text-[#002147]'
                    }`}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>

            {/* Filtros por Servicio, Tipo (Tienda propia vs Colaborador) y Buscador */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <select
                value={selectedServicioFilter}
                onChange={(e) =>
                  setSelectedServicioFilter(
                    e.target.value as 'costura_arreglos' | 'todos_servicios'
                  )
                }
                aria-label="Filtrar por servicio confirmado"
                className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-xs sm:text-sm font-bold text-[#002147] dark:text-white"
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
                className="px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-xs sm:text-sm font-bold text-[#002147] dark:text-white"
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
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Listado 1: Las 3 Tiendas Propias de Tintorería Mimos en Vigo */}
          {tiendasPropiasFiltradas.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-2.5 mb-4">
                <Store
                  className="w-5 h-5 text-[#002147] dark:text-[#60B5F6]"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-extrabold text-[#002147] dark:text-white">
                  Tiendas propias de Tintorería Mimos en Vigo con servicio de costura (
                  {tiendasPropiasFiltradas.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tiendasPropiasFiltradas.map(renderEstablecimientoCosturaCard)}
              </div>
            </div>
          )}

          {/* Listado 2: Puntos Colaboradores con Costura */}
          {puntosColaboradoresFiltrados.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-2.5 mb-2">
                <Handshake
                  className="w-5 h-5 text-[#0F76BB] dark:text-[#60B5F6]"
                  aria-hidden="true"
                />
                <h3 className="text-xl font-extrabold text-[#002147] dark:text-white">
                  Puntos colaboradores ({puntosColaboradoresFiltrados.length})
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
                Establecimientos colaboradores independientes en el área de Vigo donde puedes gestionar tus arreglos de costura y tus encargos de Tintorería Mimos.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {puntosColaboradoresFiltrados.map(renderEstablecimientoCosturaCard)}
              </div>
            </div>
          )}

          {filteredEstablecimientos.length === 0 && (
            <div className="p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] text-center space-y-3 mb-10">
              <p className="text-base font-bold text-[#002147] dark:text-white">
                No hay establecimientos que coincidan con ese filtro.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedLocalidad('Todas');
                  setSelectedTipo('todos');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-lg bg-[#002147] text-white text-xs font-bold cursor-pointer"
              >
                Restablecer filtros de costura
              </button>
            </div>
          )}

          {/* Enlace directo al mapa completo de puntos Mimos */}
          <div className="p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong className="text-[#002147] dark:text-white">
                Red completa de tiendas propias y puntos colaboradores Mimos:
              </strong>{' '}
              Consulta todas las ubicaciones, horarios actualizados y servicios confirmados en cada establecimiento del área de Vigo.
            </div>
            <a
              href="/puntos-mimos"
              onClick={(e) => onNavigate('/puntos-mimos', e)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
            >
              <span>Ver mapa completo de puntos</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* 4. CÓMO PEDIRLO y 5. PRESUPUESTO Y PLAZO (Sección 7.4 y 7.5 — Sin tarifas ni importes estimados) */}
      <section className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* 4. Cómo pedirlo */}
          <div>
            <div className="max-w-3xl mb-8">
              <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                Atención en mostrador o consulta previa por WhatsApp
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                Cómo solicitar tu arreglo de ropa paso a paso
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SERVICIO_ARREGLOS_DATA.comoPedirloPasos.map((paso) => (
                <div
                  key={paso.num}
                  className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36]"
                >
                  <span className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                    PASO {paso.num}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#002147] dark:text-white mt-1.5 mb-2">
                    {paso.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {paso.descripcion}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Presupuesto y plazo */}
          <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-3xl mb-8">
              <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                Valoración clara y sin sorpresas · Sin tarifas estándar cerradas
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight mb-2">
                ¿De qué dependen el presupuesto y el plazo de entrega?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Cada prenda tiene una confección distinta. Por eso el presupuesto y el plazo se confirman al valorar la prenda según estos cuatro factores:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SERVICIO_ARREGLOS_DATA.factoresPresupuestoYPlazo.map((f, idx) => (
                <div
                  key={f.titulo}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1d36]"
                >
                  <h3 className="text-base font-extrabold text-[#002147] dark:text-white mb-1.5">
                    0{idx + 1}. {f.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {f.detalle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE INTERACTIVO DE CONSULTA CON MIMO POR WHATSAPP (Sección 7 — Precio y solicitud) */}
      <section
        id="consultar-arreglo-mimo"
        className="py-16 lg:py-20 bg-[#002147] text-white border-b border-white/10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-xs font-mono uppercase tracking-wider text-[#60B5F6] font-bold mb-2">
              Consulta directa por WhatsApp · {CONTACT_INFO.whatsappNumber}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
              Consultar mi arreglo con Mimo
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Selecciona el tipo de arreglo, la prenda y tu establecimiento más cercano para abrir WhatsApp con el mensaje listo. Recuerda que un enlace de WhatsApp no adjunta imágenes automáticamente: <strong>Mimo te pedirá fotos dentro del chat</strong> si hacen falta para orientarte.
            </p>
          </div>

          <div className="rounded-2xl bg-white text-slate-900 dark:bg-[#0b1d36] dark:text-white p-6 sm:p-8 shadow-xl space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="arr-tipo"
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Tipo de arreglo
                </label>
                <select
                  id="arr-tipo"
                  value={tipoArreglo}
                  onChange={(e) => setTipoArreglo(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm font-medium"
                >
                  <option value="Bajos o bastillas">Bajos o bastillas</option>
                  <option value="Cambio o arreglo de cremallera">
                    Cambio o arreglo de cremallera
                  </option>
                  <option value="Estrechar o ensanchar prenda">
                    Estrechar o ensanchar prenda
                  </option>
                  <option value="Ajuste de cintura">Ajuste de cintura</option>
                  <option value="Botones o cierres">Botones o cierres</option>
                  <option value="Zurcido, descosido o roto">Zurcido, descosido o roto</option>
                  <option value="Arreglo + Tintorería / Planchado">
                    Arreglo + Tintorería / Planchado
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="arr-prenda"
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Prenda
                </label>
                <select
                  id="arr-prenda"
                  value={tipoPrenda}
                  onChange={(e) => setTipoPrenda(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm font-medium"
                >
                  <option value="Pantalón">Pantalón</option>
                  <option value="Falda">Falda</option>
                  <option value="Vestido">Vestido</option>
                  <option value="Camisa o blusa">Camisa o blusa</option>
                  <option value="Chaqueta o americana">Chaqueta o americana</option>
                  <option value="Abrigo o gabardina">Abrigo o gabardina</option>
                  <option value="Otra prenda (consultar)">Otra prenda (consultar)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="arr-zona"
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Tienda o punto de costura
                </label>
                <select
                  id="arr-zona"
                  value={zonaPreferida}
                  onChange={(e) => setZonaPreferida(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm font-medium"
                >
                  {PUNTOS_CON_COSTURA.map((p) => (
                    <option
                      key={p.id}
                      value={formatPuntoCosturaOptionValue(p)}
                    >
                      {formatPuntoCosturaOptionLabel(p)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="arr-detalles"
                className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
              >
                Detalles adicionales sobre el tejido o el arreglo (opcional)
              </label>
              <input
                id="arr-detalles"
                type="text"
                value={detallesExtra}
                onChange={(e) => setDetallesExtra(e.target.value)}
                placeholder="Ej.: Es un pantalón de traje con vuelta, o un abrigo con forro interior..."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={whatsappArregloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base py-4 px-6 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Consultar mi arreglo con Mimo en WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-600 px-4 py-3.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#178A47]" />
                    <span>Mensaje copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar texto</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              La aceptación del encargo, el presupuesto definitivo y el plazo de entrega se confirman al revisar la prenda en el establecimiento.
            </p>
          </div>
        </div>
      </section>

      {/* 6. PREGUNTAS FRECUENTES (Sin precios — Sección 7.6) */}
      <section className="py-14 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
              Dudas habituales sobre costura y composturas
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
              Preguntas frecuentes sobre arreglos de ropa en Vigo y comarca
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICIO_ARREGLOS_DATA.preguntasFrecuentes.map((faq) => (
              <details
                key={faq.pregunta}
                className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-5"
              >
                <summary className="font-extrabold text-[#002147] dark:text-white cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base">
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
      </section>

      {/* 7. ENLACES RELACIONADOS Y LLAMADA FINAL (Sección 7.7) */}
      <section className="py-14 bg-white dark:bg-[#071324]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-6">
            Servicios relacionados de cuidado textil y red de puntos Mimos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {SERVICIO_ARREGLOS_DATA.enlacesRelacionados.map((rel) => (
              <a
                key={rel.href}
                href={rel.href}
                onClick={(e) => onNavigate(rel.href, e)}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB] bg-slate-50/70 dark:bg-[#0b1d36] flex flex-col justify-between group transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-extrabold text-[#002147] dark:text-white group-hover:text-[#0F76BB] dark:group-hover:text-[#60B5F6]">
                      {rel.titulo}
                    </h3>
                    <ArrowUpRight
                      className="w-4 h-4 text-[#0F76BB] shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rel.descripcion}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#002147] dark:text-slate-200 hover:text-[#0F76BB]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Volver a la portada de Tintorería Mimos Navia</span>
            </a>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={whatsappArregloUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Consultar mi arreglo con Mimo</span>
              </a>
              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center gap-2 border border-slate-300 dark:border-slate-700 text-[#002147] dark:text-white font-bold text-sm px-4 py-3 rounded-xl tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
