import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  MapPin,
  Phone,
  MessageCircle,
  ArrowUpRight,
  Store,
  Handshake,
  Clock,
  Map as MapIcon,
  ExternalLink,
} from 'lucide-react';
import {
  CONTACT_INFO,
  REGISTROS_PUNTOS,
  TIENDAS_PROPIAS,
  PUNTOS_COLABORADORES,
  ZONAS_SEO_LOCAL,
  PuntoRegistro,
  buildGoogleMapsUrl,
  buildMimoWhatsAppUrl,
} from '../../data/mimosData';
import { trackPhoneClick, trackWhatsAppClick } from '../../utils/analytics';

const MimosGoogleMap = React.lazy(() =>
  import('../MimosGoogleMap').then((m) => ({ default: m.MimosGoogleMap }))
);

interface PreviewLocationsBandProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

type FilterKind = 'todos' | 'tienda' | 'punto';

function getPointDetailHref(punto: PuntoRegistro): string | null {
  if (punto.id === 'as-teixugueiras') return '/tienda-mimos-navia-vigo';
  if (punto.id === 'gregorio-espino') return '/tienda-mimos-gregorio-espino-vigo';
  if (punto.id === 'punto-redondela') return '/zonas/redondela';
  if (punto.id === 'punto-gondomar') return '/zonas/gondomar';
  if (punto.id === 'punto-ponteareas') return '/zonas/ponteareas';
  if (punto.id === 'punto-o-porrino') return '/zonas/o-porrino';
  if (punto.localidad === 'Vigo') return '/zonas/vigo';
  return null;
}

export const PreviewLocationsBand: React.FC<PreviewLocationsBandProps> = ({
  onNavigate,
}) => {
  const [filterKind, setFilterKind] = useState<FilterKind>('todos');
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
    if (filterKind === 'todos') return REGISTROS_PUNTOS;
    return REGISTROS_PUNTOS.filter((p) => p.tipo === filterKind);
  }, [filterKind]);

  const filterTabs: { id: FilterKind; label: string }[] = [
    { id: 'todos', label: `Toda la red (${REGISTROS_PUNTOS.length})` },
    { id: 'tienda', label: `Tiendas propias (${TIENDAS_PROPIAS.length})` },
    { id: 'punto', label: `Puntos colaboradores (${PUNTOS_COLABORADORES.length})` },
  ];

  return (
    <section
      id="puntos"
      aria-labelledby="preview-puntos-heading"
      className="py-18 lg:py-26 bg-[#FAFBFD] dark:bg-[#09182e] border-b border-slate-200/70 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Cabecera limpia y enlace a red y colaboradores */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6"
        >
          <div className="max-w-2xl space-y-2.5">
            <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
              Cobertura local transparente · Vigo y comarca
            </p>
            <h2
              id="preview-puntos-heading"
              className="text-3xl sm:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance"
            >
              {TIENDAS_PROPIAS.length} tiendas propias en Vigo y {PUNTOS_COLABORADORES.length} puntos colaboradores
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Pulsa cualquier establecimiento para centrarlo en el mapa interactivo o entra en su ficha local con aparcamiento y ruta directa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="/puntos-mimos"
              onClick={(e) => onNavigate('/puntos-mimos', e)}
              className="inline-flex items-center gap-1.5 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] dark:hover:bg-[#0B5C94] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              <span>Ver fichas de los {REGISTROS_PUNTOS.length} puntos</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
            <a
              href="/se-punto-colaborador"
              onClick={(e) => onNavigate('/se-punto-colaborador', e)}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
            >
              <span>¿Tienes comercio? Colabora</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </motion.div>

        {/* Barra de filtros segmentada + acceso rápido a páginas por municipio */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2">
          <div className="inline-flex flex-wrap items-center gap-1 p-1.5 rounded-2xl bg-slate-200/75 dark:bg-[#0b1d36] w-fit">
            {filterTabs.map((tab) => {
              const active = filterKind === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setFilterKind(tab.id)}
                  aria-pressed={active}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:text-[#002147] dark:hover:text-white'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="locations-filter-bg"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-0 rounded-xl bg-[#002147] dark:bg-[#0F76BB]"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm">
            <span className="font-bold text-slate-500 dark:text-slate-400">Guías por zona:</span>
            {ZONAS_SEO_LOCAL.map((zona) => (
              <a
                key={zona.slug}
                href={zona.url}
                onClick={(e) => onNavigate(zona.url, e)}
                className="font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
              >
                {zona.localidad}
              </a>
            ))}
          </div>
        </div>

        {/* División limpia de 12 columnas: listado en cascada + mapa real */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Izquierda (5 cols): listado editorial en cascada sin cajas pesadas */}
          <div className="lg:col-span-5 divide-y divide-slate-200/80 dark:divide-slate-800 bg-white dark:bg-[#071324] rounded-3xl border border-slate-200/70 dark:border-slate-800 overflow-hidden">
            {visiblePuntos.map((punto, idx) => {
              const isSelected = selectedPuntoId === punto.id;
              const detailHref = getPointDetailHref(punto);
              const mapsHref = buildGoogleMapsUrl(punto);

              return (
                <motion.div
                  key={punto.id}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{
                    duration: 0.3,
                    delay: idx * 0.04,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`p-5 transition-colors ${
                    isSelected
                      ? 'bg-[#F4F7FB] dark:bg-[#0b1d36]'
                      : 'hover:bg-slate-50/70 dark:hover:bg-[#0b1d36]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPuntoId(punto.id);
                        setMapShouldLoad(true);
                      }}
                      className="text-left flex-1 cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        {punto.tipo === 'tienda' ? (
                          <Store className="w-3.5 h-3.5 text-[#0F76BB] shrink-0" aria-hidden="true" />
                        ) : (
                          <Handshake className="w-3.5 h-3.5 text-[#178A47] shrink-0" aria-hidden="true" />
                        )}
                        <span className="font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                          {punto.tipo === 'tienda' ? 'Tienda Propia' : 'Punto Colaborador'}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{punto.localidad}</span>
                      </div>

                      <h3 className="text-base font-extrabold text-[#002147] dark:text-white mt-1 group-hover:text-[#0F76BB] transition-colors">
                        {punto.nombre_mostrado}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                        {punto.direccion} · {punto.codigo_postal}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 shrink-0 text-slate-400" aria-hidden="true" />
                        <span>{punto.horario.resumen}</span>
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPuntoId(punto.id);
                        setMapShouldLoad(true);
                      }}
                      aria-label={`Centrar ${punto.nombre_mostrado} en el mapa`}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold shrink-0 transition-colors cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'bg-[#002147] text-white dark:bg-[#0F76BB]'
                          : 'bg-slate-100 dark:bg-[#0b1d36] text-[#002147] dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#112645]'
                      }`}
                    >
                      {isSelected ? 'En mapa' : 'Ver mapa'}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800/70 text-xs font-bold">
                    <a
                      href={`tel:+34${punto.telefono}`}
                      onClick={() =>
                        trackPhoneClick('/preview-portada', 'preview_location_row', {
                          store_id: punto.id,
                        })
                      }
                      className="inline-flex items-center gap-1 text-[#002147] dark:text-slate-200 hover:text-[#0F76BB] tabular-nums"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#0F76BB]" aria-hidden="true" />
                      <span>{punto.telefonos_mostrados}</span>
                    </a>

                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
                    >
                      <span>Cómo llegar</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>

                    {detailHref && (
                      <a
                        href={detailHref}
                        onClick={(e) => onNavigate(detailHref, e)}
                        className="inline-flex items-center gap-1 text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
                      >
                        <span>Ver ficha</span>
                        <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Derecha (7 cols): Mapa interactivo Google Maps + franja limpia de contacto central */}
          <div className="lg:col-span-7 space-y-5">
            <div ref={mapContainerRef}>
              {!mapShouldLoad ? (
                <div className="w-full h-[460px] lg:h-[520px] rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F76BB]/10 flex items-center justify-center mb-3">
                    <MapPin className="w-6 h-6 text-[#0F76BB]" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-extrabold text-[#002147] dark:text-white mb-1.5">
                    Mapa interactivo de tiendas y puntos Mimos
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mb-5">
                    Explora nuestras {TIENDAS_PROPIAS.length} tiendas propias en Vigo y {PUNTOS_COLABORADORES.length} puntos colaboradores con rutas en Google Maps.
                  </p>
                  <button
                    type="button"
                    onClick={() => setMapShouldLoad(true)}
                    className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0F76BB] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer"
                  >
                    <MapIcon className="w-4 h-4" aria-hidden="true" />
                    <span>Cargar mapa interactivo</span>
                  </button>
                </div>
              ) : (
                <React.Suspense
                  fallback={
                    <div className="w-full h-[460px] lg:h-[520px] rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] flex flex-col items-center justify-center p-6 text-center">
                      <MapPin className="w-7 h-7 text-[#0F76BB] mb-2" aria-hidden="true" />
                      <p className="font-bold text-[#002147] dark:text-white text-sm">
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
              )}
            </div>

            {/* Franja de atención central directa (sin relleno de tarjetas) */}
            <div
              id="contacto"
              className="rounded-3xl bg-white dark:bg-[#071324] border border-slate-200/70 dark:border-slate-800 p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div className="space-y-1">
                <p className="text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  Atención central · {CONTACT_INFO.legalName}
                </p>
                <p className="text-base font-extrabold text-[#002147] dark:text-white">
                  {CONTACT_INFO.streetAddress} · {CONTACT_INFO.postalCode} {CONTACT_INFO.locality}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {CONTACT_INFO.scheduleFullNavia} ·{' '}
                  <a
                    href={CONTACT_INFO.emailHref}
                    className="underline hover:text-[#0F76BB]"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={CONTACT_INFO.phoneHref}
                  onClick={() => trackPhoneClick('/preview-portada', 'central_strip')}
                  className="inline-flex items-center gap-2 bg-[#F4F7FB] dark:bg-[#0b1d36] hover:bg-slate-200 dark:hover:bg-[#112645] text-[#002147] dark:text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors tabular-nums whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                  <span>{CONTACT_INFO.phoneDisplay}</span>
                </a>
                <a
                  href={buildMimoWhatsAppUrl(
                    'Hola, Mimo. Quiero consultar horarios o un encargo en vuestras tiendas de Vigo.'
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('/preview-portada', 'central_strip')}
                  className="inline-flex items-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp Mimo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
