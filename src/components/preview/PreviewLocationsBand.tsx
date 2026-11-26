import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  ArrowUpRight,
  Map as MapIcon,
  ExternalLink,
  Search,
} from 'lucide-react';
import {
  CONTACT_INFO,
  REGISTROS_PUNTOS,
  TIENDAS_PROPIAS,
  PUNTOS_COLABORADORES,
  ZONAS_RESUMEN,
  PuntoRegistro,
  buildGoogleMapsUrl,
  buildMimoWhatsAppUrl,
} from '../../data/mimosData';
import { trackPhoneClick, trackWhatsAppClick } from '../../utils/analytics';
import { lazyWithRetry } from '../../utils/lazyWithRetry';
import { ErrorBoundary } from '../ErrorBoundary';

const MimosGoogleMap = lazyWithRetry(() =>
  import('../MimosGoogleMap').then((m) => ({ default: m.MimosGoogleMap }))
);

interface PreviewLocationsBandProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

type FilterKind = 'todos' | 'tienda' | 'punto';

function getPointDetailHref(punto: PuntoRegistro): string | null {
  if (punto.id === 'as-teixugueiras') return '/tienda-mimos-navia-vigo';
  if (punto.id === 'gregorio-espino') return '/tienda-mimos-gregorio-espino-vigo';
  if (punto.id === 'rua-venezuela') return '/tienda-mimos-venezuela-vigo';
  if (punto.id === 'punto-vigo-dpasso') return '/punto-mimos-dpasso-vigo';
  if (punto.id === 'punto-redondela') return '/zonas/redondela';
  if (punto.id === 'punto-gondomar') return '/zonas/gondomar';
  if (punto.id === 'punto-ponteareas') return '/zonas/ponteareas';
  if (punto.id === 'punto-o-porrino') return '/zonas/o-porrino';
  if (punto.localidad === 'Vigo') return '/zonas/vigo';
  return null;
}

interface InlineZoneGuidance {
  title: string;
  text: string;
  href: string;
  linkLabel: string;
}

function getColabDireccion(id: string, fallback: string): string {
  return PUNTOS_COLABORADORES.find((p) => p.id === id)?.direccion || fallback;
}

function resolveInlineZoneGuidance(rawQuery: string): InlineZoneGuidance | null {
  const q = rawQuery
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  if (!q) return null;

  if (q.includes('mos') || q.includes('3641') || q.includes('puxeiros') || q.includes('tameiga')) {
    return {
      title: 'Cobertura en Mos (sin tienda física aún)',
      text: 'Atendemos Mos mediante ruta a domicilio (sujeta a mínimo) y entrega sin mínimo en Telas y Más (O Porriño) o Gregorio Espino (Vigo).',
      href: '/zonas/mos',
      linkLabel: 'Ver guía de Mos',
    };
  }
  if (
    q.includes('nigran') ||
    q.includes('panxon') ||
    q.includes('ramallosa') ||
    q.includes('3634') ||
    q.includes('3635') ||
    q.includes('3636') ||
    q.includes('3637')
  ) {
    return {
      title: 'Cobertura en Nigrán (sin tienda física aún)',
      text: 'Cubrimos Nigrán con ruta a domicilio (sujeta a mínimo) y entrega sin mínimo en Puntadas No Aire (Gondomar) o Navia por VG-20.',
      href: '/zonas/nigran',
      linkLabel: 'Ver guía de Nigrán',
    };
  }
  if (q.includes('redondela') || q.includes('36800') || q.includes('chapela')) {
    const dir = getColabDireccion('punto-redondela', 'C/ José Regojo, 29 bajo');
    return {
      title: 'Redondela · Comercio colaborador oficial',
      text: `Mismas tarifas que Vigo en ${dir} (sin pedido mínimo) conectado con planta Navia.`,
      href: '/zonas/redondela',
      linkLabel: 'Ver ficha Redondela',
    };
  }
  if (q.includes('gondomar') || q.includes('36380')) {
    const dir = getColabDireccion('punto-gondomar', 'Avda. Elduayen, 9');
    return {
      title: `Gondomar · Puntadas No Aire (${dir})`,
      text: 'Recepción Mimos sin mínimo y taller propio de costura desde las 08:00 (M-V).',
      href: '/zonas/gondomar',
      linkLabel: 'Ver ficha Gondomar',
    };
  }
  if (q.includes('ponteareas') || q.includes('36860')) {
    const dir = getColabDireccion('punto-ponteareas', 'C/ Argentina, 4');
    return {
      title: `Ponteareas · Arregla2 (${dir})`,
      text: 'Tintorería, lavandería, alfombras y arreglos de costura con enlace directo a Vigo.',
      href: '/zonas/ponteareas',
      linkLabel: 'Ver ficha Ponteareas',
    };
  }
  if (q.includes('porrino') || q.includes('36400')) {
    const dir = getColabDireccion('punto-o-porrino', 'C/ Manuel Rodríguez, 30');
    return {
      title: `O Porriño · Telas y Más (${dir})`,
      text: 'Punto colaborador sin mínimo ni recargos y taller propio de costura.',
      href: '/zonas/o-porrino',
      linkLabel: 'Ver ficha O Porriño',
    };
  }

  return {
    title: 'Red propia en Vigo + rutas en área metropolitana',
    text: 'Atendemos directamente en Navia, Gregorio Espino, Venezuela y punto D’Passo, además de rutas programadas.',
    href: '/zonas/vigo',
    linkLabel: 'Ver zonas de Vigo',
  };
}

export const PreviewLocationsBand: React.FC<PreviewLocationsBandProps> = ({
  onNavigate,
}) => {
  const [filterKind, setFilterKind] = useState<FilterKind>('todos');
  const [zoneQuery, setZoneQuery] = useState('');
  const [selectedPuntoId, setSelectedPuntoId] = useState<string | null>('as-teixugueiras');
  const [mapShouldLoad, setMapShouldLoad] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapShouldLoad || typeof window === 'undefined') return;
    const el = mapContainerRef.current;
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
      { rootMargin: '280px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [mapShouldLoad]);

  const visiblePuntos = useMemo(() => {
    const base =
      filterKind === 'todos'
        ? REGISTROS_PUNTOS
        : REGISTROS_PUNTOS.filter((p) => p.tipo === filterKind);
    const q = zoneQuery
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();

    if (!q) return base;
    const matches = base.filter((p) =>
      `${p.nombre_mostrado} ${p.localidad} ${p.direccion} ${p.codigo_postal}`
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .includes(q)
    );
    return matches.length > 0 ? matches : base;
  }, [filterKind, zoneQuery]);

  const zoneGuidance = resolveInlineZoneGuidance(zoneQuery);

  const filterTabs: { id: FilterKind; label: string }[] = [
    { id: 'todos', label: `Toda la red (${REGISTROS_PUNTOS.length})` },
    { id: 'tienda', label: `Tiendas propias (${TIENDAS_PROPIAS.length})` },
    { id: 'punto', label: `Puntos colaboradores (${PUNTOS_COLABORADORES.length})` },
  ];

  return (
    <section
      id="puntos"
      aria-labelledby="puntos-heading"
      className="py-16 lg:py-24 bg-[#F7F6F2] border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs sm:text-sm font-bold text-[#0C65A1]">
              Red sin pedido mínimo · Vigo y área metropolitana
            </p>
            <h2
              id="puntos-heading"
              className="text-2xl sm:text-4xl font-extrabold text-[#002147] tracking-tight text-balance"
            >
              {TIENDAS_PROPIAS.length} tiendas propias en Vigo y {PUNTOS_COLABORADORES.length} comercios colaboradores
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Los 5 puntos colaboradores son establecimientos independientes con nuestras tarifas oficiales. Toca cualquiera para centrarlo en el mapa o abrir su ficha.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <a
              href="/puntos-mimos"
              onClick={(e) => onNavigate('/puntos-mimos', e)}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm px-5 py-2.5 rounded-sm transition-colors whitespace-nowrap"
            >
              <span>Fichas completas ({REGISTROS_PUNTOS.length})</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="/se-punto-colaborador"
              onClick={(e) => onNavigate('/se-punto-colaborador', e)}
              className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold text-[#002147] hover:text-[#0F76BB] hover:underline whitespace-nowrap"
            >
              <span>¿Tienes comercio? Colabora</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Barra de filtro integrada sin cajas: tabs subrayados + buscador rápido de municipio/CP */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-300 pb-3">
          <div className="flex flex-wrap items-center gap-5">
            {filterTabs.map((tab) => {
              const active = filterKind === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterKind(tab.id)}
                  aria-pressed={active}
                  className={`min-h-[44px] pb-2 border-b-2 text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    active
                      ? 'border-[#002147] text-[#002147]'
                      : 'border-transparent text-slate-600 hover:text-[#002147]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-80">
            <Search
              className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="text"
              value={zoneQuery}
              onChange={(e) => setZoneQuery(e.target.value)}
              aria-label="Filtrar por barrio, municipio o código postal"
              placeholder="Buscar zona o CP (Mos, Nigrán, 36212...)"
              className="w-full min-h-[44px] pl-9 pr-3 py-2 rounded-sm bg-white border border-slate-300 text-base text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
            />
          </div>
        </div>

        {zoneGuidance && (
          <div className="border-l-2 border-[#0F76BB] pl-4 py-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
            <div>
              <strong className="text-[#002147]">{zoneGuidance.title}: </strong>
              <span className="text-slate-600">{zoneGuidance.text}</span>
            </div>
            <a
              href={zoneGuidance.href}
              onClick={(e) => onNavigate(zoneGuidance.href, e)}
              className="inline-flex items-center gap-1 min-h-[44px] font-bold text-[#0C65A1] hover:underline shrink-0"
            >
              <span>{zoneGuidance.linkLabel}</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Izquierda (5 cols): Directorio con líneas finas */}
          <div className="lg:col-span-5 divide-y divide-slate-300/80 border-t border-b border-slate-300/80">
            {visiblePuntos.map((punto) => {
              const isSelected = selectedPuntoId === punto.id;
              const detailHref = getPointDetailHref(punto);
              const mapsHref = buildGoogleMapsUrl(punto);

              return (
                <div
                  key={punto.id}
                  className={`py-4 px-2 sm:px-3 transition-colors ${
                    isSelected
                      ? 'bg-white border-l-2 border-[#0F76BB]'
                      : 'hover:bg-white/70'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPuntoId(punto.id);
                        setMapShouldLoad(true);
                      }}
                      className="text-left flex-1 cursor-pointer group min-h-[44px]"
                    >
                      <p className="text-xs font-bold text-[#0C65A1]">
                        {punto.tipo === 'tienda' ? 'Tienda propia' : 'Comercio colaborador'} ·{' '}
                        <span className="text-slate-600 font-medium">
                          {punto.localidad}
                        </span>
                      </p>

                      <h3 className="text-base font-extrabold text-[#002147] mt-0.5 group-hover:text-[#0F76BB] transition-colors">
                        {punto.nombre_mostrado}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                        {punto.direccion} · {punto.codigo_postal}
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {punto.horario.resumen}
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPuntoId(punto.id);
                        setMapShouldLoad(true);
                      }}
                      aria-label={`Centrar ${punto.nombre_mostrado} en el mapa`}
                      className={`min-h-[44px] px-3 py-1.5 rounded-sm text-xs font-bold shrink-0 border transition-colors cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#0F76BB] border-[#0F76BB] text-white'
                          : 'border-slate-300 bg-white text-[#002147] hover:border-[#002147]'
                      }`}
                    >
                      {isSelected ? 'En mapa' : 'Ver mapa'}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs sm:text-sm font-bold">
                    <a
                      href={`tel:+34${punto.telefono}`}
                      onClick={() =>
                        trackPhoneClick('/', 'location_row', {
                          store_id: punto.id,
                        })
                      }
                      className="inline-flex items-center gap-1 min-h-[44px] text-[#002147] hover:text-[#0F76BB] tabular-nums"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#0C65A1]" aria-hidden="true" />
                      <span>{punto.telefonos_mostrados}</span>
                    </a>

                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 min-h-[44px] text-[#0C65A1] hover:underline"
                    >
                      <span>Cómo llegar</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>

                    {detailHref && (
                      <a
                        href={detailHref}
                        onClick={(e) => onNavigate(detailHref, e)}
                        className="inline-flex items-center gap-1 min-h-[44px] text-[#0C65A1] hover:underline"
                      >
                        <span>Ver ficha</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Derecha (7 cols): Mapa real + atención central sin relleno */}
          <div className="lg:col-span-7 space-y-6">
            <div ref={mapContainerRef}>
              {!mapShouldLoad ? (
                <div className="w-full h-[420px] lg:h-[520px] rounded-sm border border-slate-300 bg-white flex flex-col items-center justify-center p-6 text-center">
                  <MapPin className="w-6 h-6 text-[#0C65A1] mb-2.5" aria-hidden="true" />
                  <h3 className="text-lg font-extrabold text-[#002147] mb-1.5">
                    Mapa interactivo de tiendas y puntos Mimos
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mb-5">
                    Consulta ubicaciones exactas y aparcamiento en nuestras {TIENDAS_PROPIAS.length} tiendas propias en Vigo y {PUNTOS_COLABORADORES.length} puntos colaboradores.
                  </p>
                  <button
                    type="button"
                    onClick={() => setMapShouldLoad(true)}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm px-5 py-2.5 rounded-sm transition-colors cursor-pointer"
                  >
                    <MapIcon className="w-4 h-4" aria-hidden="true" />
                    <span>Cargar mapa interactivo</span>
                  </button>
                </div>
              ) : (
                <ErrorBoundary
                  fallback={
                    <div className="w-full h-[420px] lg:h-[520px] rounded-sm border border-slate-300 bg-white flex flex-col items-center justify-center p-6 text-center">
                      <MapPin className="w-6 h-6 text-[#0C65A1] mb-2.5" aria-hidden="true" />
                      <h3 className="text-lg font-extrabold text-[#002147] mb-1.5">
                        Mapa interactivo no disponible temporalmente
                      </h3>
                      <p className="text-sm text-slate-600 max-w-md mb-5">
                        Puedes abrir «Cómo llegar» en Google Maps directamente desde cualquiera de nuestras 3 tiendas y 5 puntos colaboradores de la lista.
                      </p>
                      <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm px-5 py-2.5 rounded-sm transition-colors cursor-pointer"
                      >
                        <MapIcon className="w-4 h-4" aria-hidden="true" />
                        <span>Recargar mapa</span>
                      </button>
                    </div>
                  }
                >
                  <React.Suspense
                    fallback={
                      <div className="w-full h-[420px] lg:h-[520px] rounded-sm border border-slate-300 bg-white flex flex-col items-center justify-center p-6 text-center">
                        <MapPin className="w-7 h-7 text-[#0C65A1] mb-2" aria-hidden="true" />
                        <p className="font-bold text-[#002147] text-sm">
                          Cargando mapa interactivo de Mimos...
                        </p>
                      </div>
                    }
                  >
                    <MimosGoogleMap
                      selectedPuntoId={selectedPuntoId}
                      onSelectPunto={(p) => setSelectedPuntoId(p ? p.id : null)}
                      onNavigate={onNavigate}
                    />
                  </React.Suspense>
                </ErrorBoundary>
              )}
            </div>

            <div
              id="contacto"
              className="border-t border-slate-300 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#0C65A1]">
                  Sede central · {CONTACT_INFO.legalName}
                </p>
                <p className="text-base font-extrabold text-[#002147]">
                  {CONTACT_INFO.streetAddress} · {CONTACT_INFO.postalCode} {CONTACT_INFO.locality}
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  {CONTACT_INFO.scheduleFullNavia} ·{' '}
                  <a href={CONTACT_INFO.emailHref} className="underline hover:text-[#0F76BB]">
                    {CONTACT_INFO.email}
                  </a>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={CONTACT_INFO.phoneHref}
                  onClick={() => trackPhoneClick('/', 'central_strip')}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-white border border-slate-300 hover:border-[#002147] text-[#002147] font-bold text-xs sm:text-sm px-4 py-2 rounded-sm transition-colors tabular-nums whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-[#0C65A1]" aria-hidden="true" />
                  <span>{CONTACT_INFO.phoneDisplay}</span>
                </a>
                <a
                  href={buildMimoWhatsAppUrl(
                    'Hola, Mimo. Quiero consultar horarios o un encargo en vuestras tiendas de Vigo.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('/', 'central_strip')}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-xs sm:text-sm px-4 py-2 rounded-sm transition-colors whitespace-nowrap shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp Mimo</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Enlaces directos a los 7 municipios para SEO local (usando ZONAS_RESUMEN ligero) */}
        <nav
          aria-label="Cobertura por municipios"
          className="pt-5 border-t border-slate-300/80 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs sm:text-sm"
        >
          <span className="font-bold text-slate-600">
            Guías por zona:
          </span>
          {ZONAS_RESUMEN.map((zona) => (
            <a
              key={zona.slug}
              href={zona.url}
              onClick={(e) => onNavigate(zona.url, e)}
              className="inline-flex items-center min-h-[44px] font-bold text-[#0C65A1] hover:underline whitespace-nowrap"
            >
              {zona.localidad}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
};
