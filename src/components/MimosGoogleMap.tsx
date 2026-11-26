import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Marker,
  InfoWindow,
  useMap,
} from '@vis.gl/react-google-maps';
import {
  Store,
  Handshake,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Scissors,
  CheckCircle2,
  Navigation,
  ExternalLink,
  Map as MapIcon,
  ShieldCheck,
} from 'lucide-react';
import {
  REGISTROS_PUNTOS,
  TIENDAS_PROPIAS,
  PUNTOS_COLABORADORES,
  PuntoRegistro,
  buildMimoWhatsAppUrl,
  buildGoogleMapsUrl,
  derivarEtiquetasServicios,
} from '../data/mimosData';
import {
  COOKIE_CONSENT_CHANGE_EVENT,
  hasAnalyticsConsent,
} from '../utils/analytics';

interface MimosGoogleMapProps {
  selectedPuntoId?: string | null;
  onSelectPunto?: (punto: PuntoRegistro | null) => void;
  className?: string;
  onNavigate?: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  initialManualLoad?: boolean;
}

const FICHA_RUTA_POR_ID: Record<string, { href: string; label: string }> = {
  'as-teixugueiras': {
    href: '/tienda-mimos-navia-vigo',
    label: 'Ver ficha completa de la tienda',
  },
  'gregorio-espino': {
    href: '/tienda-mimos-gregorio-espino-vigo',
    label: 'Ver ficha completa de la tienda',
  },
  'rua-venezuela': {
    href: '/tienda-mimos-venezuela-vigo',
    label: 'Ver ficha y fotos de la tienda',
  },
  'punto-o-porrino': {
    href: '/zonas/o-porrino',
    label: 'Ver ficha y fotos del punto',
  },
  'punto-gondomar': {
    href: '/zonas/gondomar',
    label: 'Ver ficha y fotos de Gondomar',
  },
  'punto-ponteareas': {
    href: '/zonas/ponteareas',
    label: 'Ver ficha y fotos de Ponteareas',
  },
  'punto-redondela': {
    href: '/zonas/redondela',
    label: 'Ver ficha y fotos de Redondela',
  },
  'punto-vigo-dpasso': {
    href: '/punto-mimos-dpasso-vigo',
    label: 'Ver ficha y fotos del punto',
  },
};

// Control suave de cámara al seleccionar un punto o ajustar a todos
function MapCameraController({
  targetPoint,
  allPoints,
}: {
  targetPoint: PuntoRegistro | null;
  allPoints: PuntoRegistro[];
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    if (targetPoint && targetPoint.latitud && targetPoint.longitud) {
      map.panTo({ lat: targetPoint.latitud, lng: targetPoint.longitud });
      map.setZoom(15);
    } else if (allPoints.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      allPoints.forEach((p) => {
        if (p.latitud && p.longitud) {
          bounds.extend({ lat: p.latitud, lng: p.longitud });
        }
      });
      map.fitBounds(bounds, { top: 40, right: 40, bottom: 40, left: 40 });
    }
  }, [map, targetPoint, allPoints]);

  return null;
}

export const MimosGoogleMap: React.FC<MimosGoogleMapProps> = ({
  selectedPuntoId,
  onSelectPunto,
  className = '',
  onNavigate,
  initialManualLoad = false,
}) => {
  const apiKey = ((import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '').trim();
  const mapId = ((import.meta.env.VITE_GOOGLE_MAPS_MAP_ID as string) || '').trim();
  const [mapError, setMapError] = useState(!apiKey || apiKey === 'AIzaSy...');
  const [hasConsent, setHasConsent] = useState<boolean>(() => hasAnalyticsConsent());
  const [manualMapEnabled, setManualMapEnabled] = useState<boolean>(initialManualLoad);
  const [filterType, setFilterType] = useState<'todos' | 'tiendas' | 'colaboradores'>('todos');
  const [activePunto, setActivePunto] = useState<PuntoRegistro | null>(null);
  const [failedPhotos, setFailedPhotos] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const syncConsent = () => {
      const accepted = hasAnalyticsConsent();
      setHasConsent(accepted);
      if (!accepted) {
        setManualMapEnabled(false);
      }
    };
    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, syncConsent);
    window.addEventListener('storage', syncConsent);
    return () => {
      window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, syncConsent);
      window.removeEventListener('storage', syncConsent);
    };
  }, []);

  useEffect(() => {
    if (initialManualLoad) {
      setManualMapEnabled(true);
    }
  }, [initialManualLoad]);

  useEffect(() => {
    const handleQuota = () => setMapError(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  useEffect(() => {
    if (selectedPuntoId) {
      const match = REGISTROS_PUNTOS.find((p) => p.id === selectedPuntoId);
      if (match) setActivePunto(match);
    }
  }, [selectedPuntoId]);

  const displayedPoints = useMemo(() => {
    switch (filterType) {
      case 'tiendas':
        return TIENDAS_PROPIAS;
      case 'colaboradores':
        return PUNTOS_COLABORADORES;
      case 'todos':
      default:
        return REGISTROS_PUNTOS;
    }
  }, [filterType]);

  const handleMarkerClick = useCallback(
    (punto: PuntoRegistro) => {
      setActivePunto(punto);
      if (onSelectPunto) onSelectPunto(punto);
    },
    [onSelectPunto]
  );

  const handleCloseInfoWindow = useCallback(() => {
    setActivePunto(null);
    if (onSelectPunto) onSelectPunto(null);
  }, [onSelectPunto]);

  const defaultCenter = { lat: 42.19, lng: -8.67 };
  const canLoadInteractiveMap = !mapError && (hasConsent || manualMapEnabled);

  if (mapError) {
    return (
      <div className={`w-full p-6 sm:p-8 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-6 ${className}`}>
        <div className="text-center max-w-xl mx-auto">
          <div className="w-12 h-12 rounded-xl bg-[#EDF5FD] text-[#0C65A1] flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-6 h-6" aria-hidden="true" />
          </div>
          <h3 className="text-lg sm:text-xl font-black text-[#002147]">
            Tiendas Propias en Vigo y Puntos Colaboradores
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Consulta la dirección, horarios, ficha completa o abre la ruta directa en Google Maps para cualquiera de nuestras 8 ubicaciones:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TIENDAS_PROPIAS.map((tienda) => {
            const ficha = FICHA_RUTA_POR_ID[tienda.id];
            return (
              <div
                key={tienda.id}
                className="p-4 rounded-xl border border-slate-200 bg-[#F7F6F2] flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
                    Tienda Propia · {tienda.localidad}
                  </span>
                  <h4 className="font-extrabold text-sm text-[#002147] mt-1">
                    {tienda.nombre_mostrado}
                  </h4>
                  <p className="text-xs text-slate-700 mt-1">
                    {tienda.direccion}
                  </p>
                  <p className="text-[11px] text-slate-600 mt-1">
                    {tienda.horario.resumen}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 space-y-2">
                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:+34${tienda.telefono}`}
                      data-cta-zone="point_card"
                      data-store-id={tienda.id}
                      className="flex-1 inline-flex items-center justify-center gap-1.5 min-h-[44px] py-2 px-3 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#002147] hover:border-[#0F76BB] hover:text-[#0F76BB] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#0C65A1]" aria-hidden="true" />
                      <span>{tienda.telefonos_mostrados}</span>
                    </a>
                    <a
                      href={buildGoogleMapsUrl(tienda)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2.5 rounded-lg bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] text-xs font-bold transition-colors"
                      title={`Abrir ubicación de ${tienda.nombre_mostrado} en Google Maps`}
                      aria-label={`Abrir ubicación de ${tienda.nombre_mostrado} en Google Maps`}
                    >
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                  {ficha && (
                    <a
                      href={ficha.href}
                      onClick={(e) => onNavigate?.(ficha.href, e)}
                      className="w-full inline-flex items-center justify-center gap-1.5 min-h-[44px] py-2 px-3 rounded-lg bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs font-bold transition-colors"
                    >
                      <Store className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{ficha.label}</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {PUNTOS_COLABORADORES.map((punto) => {
            const ficha = FICHA_RUTA_POR_ID[punto.id];
            return (
              <div
                key={punto.id}
                className="p-3.5 rounded-xl border border-slate-200 bg-[#F4F9FE] flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
                    Colaborador · {punto.localidad}
                  </span>
                  <h4 className="font-extrabold text-xs text-[#002147] mt-0.5">
                    {punto.nombre_mostrado}
                  </h4>
                  <p className="text-[11px] text-slate-600 mt-1">
                    {punto.direccion}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 flex items-center gap-1.5">
                  {ficha && (
                    <a
                      href={ficha.href}
                      onClick={(e) => onNavigate?.(ficha.href, e)}
                      className="flex-1 inline-flex items-center justify-center min-h-[44px] py-1.5 px-2.5 rounded-lg bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs font-bold transition-colors"
                    >
                      Ver ficha
                    </a>
                  )}
                  <a
                    href={buildGoogleMapsUrl(punto)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-lg bg-white/95 border border-[#002147] text-[#002147] hover:bg-[#002147] hover:text-white transition-colors"
                    title={`Abrir ubicación de ${punto.nombre_mostrado} en Google Maps`}
                    aria-label={`Abrir ubicación de ${punto.nombre_mostrado} en Google Maps`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-white ${className}`}>
      {/* Barra de filtros interactivos del mapa (solo 2 colores: Azul claro y Azul oscuro) */}
      <div className="p-3.5 sm:p-4 bg-[#F4F9FE] border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="text-slate-600 mr-1 hidden sm:inline">
            Mostrar:
          </span>
          <button
            type="button"
            onClick={() => {
              setFilterType('todos');
              setActivePunto(null);
            }}
            className={`min-h-[44px] px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
              filterType === 'todos'
                ? 'bg-[#002147] text-white shadow-xs'
                : 'bg-white text-[#002147] border border-slate-200 hover:border-[#0F76BB]'
            }`}
          >
            Todos ({REGISTROS_PUNTOS.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterType('tiendas');
              setActivePunto(null);
            }}
            className={`inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
              filterType === 'tiendas'
                ? 'bg-[#0F76BB] text-white shadow-xs'
                : 'bg-white text-[#0C65A1] border border-slate-200 hover:border-[#0F76BB]'
            }`}
          >
            <img
              src="/logo-mimos.webp"
              alt=""
              width={16}
              height={16}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              className="w-4 h-4 rounded-full bg-white/20 object-contain"
            />
            <span>3 Tiendas propias Vigo ({TIENDAS_PROPIAS.length})</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterType('colaboradores');
              setActivePunto(null);
            }}
            className={`inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg transition-colors cursor-pointer ${
              filterType === 'colaboradores'
                ? 'bg-[#002147] text-white shadow-xs'
                : 'bg-white text-[#002147] border border-slate-200 hover:border-[#002147]'
            }`}
          >
            <img
              src="/logo-mimos.webp"
              alt=""
              width={16}
              height={16}
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              className="w-4 h-4 rounded-full bg-white/20 object-contain"
            />
            <span>5 Puntos colaboradores ({PUNTOS_COLABORADORES.length})</span>
          </button>
        </div>

        {/* Leyenda visual estricta de 2 colores */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#0F76BB] border border-white shadow-xs">
              <img
                src="/logo-mimos.webp"
                alt=""
                width={14}
                height={14}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                className="w-3.5 h-3.5 object-contain rounded-full"
              />
            </span>
            <span className="text-[#0C65A1]">Tienda propia</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#002147] border border-white shadow-xs">
              <img
                src="/logo-mimos.webp"
                alt=""
                width={14}
                height={14}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                className="w-3.5 h-3.5 object-contain rounded-full bg-white/10"
              />
            </span>
            <span className="text-[#002147]">Punto colaborador</span>
          </span>
        </div>
      </div>

      {/* Contenedor del mapa Google Maps (bloqueado por RGPD hasta consentimiento o clic explícito) */}
      {!canLoadInteractiveMap ? (
        <div className="p-5 sm:p-7 bg-[#F7F6F2] space-y-5">
          <div className="rounded-2xl border border-[#0F76BB]/25 bg-white p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xs">
            <div className="flex items-start gap-3.5 max-w-2xl">
              <div className="w-11 h-11 rounded-xl bg-[#EDF5FD] text-[#0C65A1] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-extrabold text-[#002147]">
                  Mapa interactivo bloqueado por privacidad hasta tu confirmación
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Al pulsar <strong>«Cargar mapa interactivo»</strong> se conectará con Google Maps (Google Ireland Ltd.) para mostrar las 8 ubicaciones sobre el plano. Mientras tanto, puedes consultar aquí abajo todas las direcciones, horarios o abrir la ruta externa directamente en Google Maps.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setManualMapEnabled(true)}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer shadow-xs"
              >
                <MapIcon className="w-4 h-4" aria-hidden="true" />
                <span>Cargar mapa interactivo</span>
              </button>
              <a
                href="/privacidad"
                onClick={(e) => onNavigate?.('/privacidad', e)}
                className="inline-flex items-center min-h-[44px] text-xs font-bold text-[#0C65A1] hover:underline px-2 py-1"
              >
                Más info en Privacidad
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {displayedPoints.map((punto) => {
              const isTienda = punto.tipo === 'tienda';
              const ficha = FICHA_RUTA_POR_ID[punto.id];
              return (
                <div
                  key={punto.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white flex flex-col justify-between gap-3"
                >
                  <div className="space-y-1.5">
                    <span
                      className={`inline-block text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded text-white ${
                        isTienda ? 'bg-[#0F76BB]' : 'bg-[#002147]'
                      }`}
                    >
                      {isTienda ? `Tienda Propia · ${punto.localidad}` : `Colaborador · ${punto.localidad}`}
                    </span>
                    <h4 className="font-extrabold text-sm text-[#002147] leading-snug">
                      {punto.nombre_mostrado}
                    </h4>
                    <p className="text-xs text-slate-600 flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0C65A1] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{punto.direccion} (CP {punto.codigo_postal})</span>
                    </p>
                    <p className="text-[11px] text-slate-500 flex items-start gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#0C65A1] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{punto.horario.resumen}</span>
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:+34${punto.telefono}`}
                        data-cta-zone="point_card"
                        data-store-id={punto.id}
                        className="flex-1 inline-flex items-center justify-center gap-1 min-h-[44px] py-2 px-2.5 rounded-lg bg-[#F4F9FE] border border-slate-200 text-xs font-bold text-[#002147] hover:border-[#0F76BB] transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#0C65A1]" aria-hidden="true" />
                        <span>{punto.telefonos_mostrados}</span>
                      </a>
                      <a
                        href={buildGoogleMapsUrl(punto)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 min-h-[44px] py-2 px-2.5 rounded-lg bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] text-xs font-bold transition-colors"
                        title={`Abrir ${punto.nombre_mostrado} en Google Maps`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Maps</span>
                      </a>
                    </div>
                    {ficha && (
                      <a
                        href={ficha.href}
                        onClick={(e) => onNavigate?.(ficha.href, e)}
                        className="w-full inline-flex items-center justify-center gap-1.5 min-h-[44px] py-2 px-3 rounded-lg bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs font-bold transition-colors"
                      >
                        <Store className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>{ficha.label}</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="relative w-full h-[430px] sm:h-[490px] lg:h-[530px]">
          <APIProvider apiKey={apiKey} libraries={mapId ? ['marker'] : undefined}>
            <Map
              {...(mapId ? { mapId } : {})}
              defaultCenter={defaultCenter}
              defaultZoom={11}
              gestureHandling="greedy"
              disableDefaultUI={false}
              mapTypeControl={false}
              streetViewControl={true}
              fullscreenControl={true}
              className="w-full h-full"
            >
              <MapCameraController targetPoint={activePunto} allPoints={displayedPoints} />

              {/* Marcadores avanzados con Map ID configurado o marcadores clásicos como fallback */}
              {displayedPoints.map((punto) => {
                if (!punto.latitud || !punto.longitud) return null;
                const isTienda = punto.tipo === 'tienda';
                const isSelected = activePunto?.id === punto.id;

                if (!mapId) {
                  return (
                    <Marker
                      key={punto.id}
                      position={{ lat: punto.latitud, lng: punto.longitud }}
                      title={`${punto.nombre_mostrado} (${punto.direccion})`}
                      onClick={() => handleMarkerClick(punto)}
                    />
                  );
                }

                return (
                  <AdvancedMarker
                    key={punto.id}
                    position={{ lat: punto.latitud, lng: punto.longitud }}
                    title={`${punto.nombre_mostrado} (${punto.direccion})`}
                    onClick={() => handleMarkerClick(punto)}
                  >
                    {isTienda ? (
                      /* Chincheta Tienda Propia Mimos: Azul Claro + Osito Mimos */
                      <div
                        className={`relative group cursor-pointer transition-transform duration-200 select-none ${
                          isSelected ? 'scale-125 z-30' : 'hover:scale-115 z-20'
                        }`}
                      >
                        <div className="flex items-center justify-center w-11 h-11 rounded-full bg-[#0F76BB] border-[2.5px] border-white shadow-lg shadow-[#0F76BB]/40 overflow-hidden ring-2 ring-[#60B5F6]">
                          <img
                            src="/logo-mimos.webp"
                            alt="Tintorería Mimos"
                            width={34}
                            height={34}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                            className="w-8.5 h-8.5 object-contain rounded-full bg-white/20 p-0.5 pointer-events-none"
                          />
                        </div>
                        <div className="w-0 h-0 mx-auto border-x-4 border-x-transparent border-t-[6px] border-t-[#0F76BB] -mt-0.5 drop-shadow-sm" />
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-[#0F76BB]/40 rounded-full blur-[1px]" />
                      </div>
                    ) : (
                      /* Chincheta Punto Colaborador: Azul Oscuro + Osito Mimos */
                      <div
                        className={`relative group cursor-pointer transition-transform duration-200 select-none ${
                          isSelected ? 'scale-125 z-30' : 'hover:scale-115 z-10'
                        }`}
                      >
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#002147] border-[2px] border-white shadow-md shadow-[#002147]/50 overflow-hidden ring-2 ring-[#002147]/40">
                          <img
                            src="/logo-mimos.webp"
                            alt="Punto Colaborador"
                            width={30}
                            height={30}
                            referrerPolicy="no-referrer"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                            className="w-7.5 h-7.5 object-contain rounded-full bg-white/10 p-0.5 pointer-events-none"
                          />
                        </div>
                        <div className="w-0 h-0 mx-auto border-x-3 border-x-transparent border-t-[5px] border-t-[#002147] -mt-0.5 drop-shadow-sm" />
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-1 bg-[#002147]/30 rounded-full blur-[1px]" />
                      </div>
                    )}
                  </AdvancedMarker>
                );
              })}

              {/* InfoWindow emergente interactiva sin barras de desplazamiento */}
              {activePunto && activePunto.latitud && activePunto.longitud && (
                <InfoWindow
                  position={{ lat: activePunto.latitud, lng: activePunto.longitud }}
                  onCloseClick={handleCloseInfoWindow}
                  headerDisabled={false}
                  maxWidth={380}
                >
                  <div className="min-w-[270px] max-w-[340px] p-0.5 text-slate-800 space-y-2 font-sans overflow-visible">
                    {activePunto.foto && !failedPhotos[activePunto.id] && (
                      <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-2 shadow-xs">
                        <img
                          src={activePunto.foto}
                          alt={activePunto.nombre_mostrado}
                          width={1200}
                          height={670}
                          referrerPolicy="no-referrer"
                          onError={() =>
                            setFailedPhotos((prev) => ({ ...prev, [activePunto.id]: true }))
                          }
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    {/* Cabecera InfoWindow */}
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md text-white ${
                          activePunto.tipo === 'tienda' ? 'bg-[#0F76BB]' : 'bg-[#002147]'
                        }`}
                      >
                        {activePunto.tipo === 'tienda' ? (
                          <>
                            <img
                              src="/logo-mimos.webp"
                              alt=""
                              width={14}
                              height={14}
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                              className="w-3.5 h-3.5 object-contain rounded-full"
                            />
                            <span>Tienda Propia Mimos</span>
                          </>
                        ) : (
                          <>
                            <img
                              src="/logo-mimos.webp"
                              alt=""
                              width={14}
                              height={14}
                              referrerPolicy="no-referrer"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                              className="w-3.5 h-3.5 object-contain rounded-full bg-white/20"
                            />
                            <span>Punto Colaborador</span>
                          </>
                        )}
                      </span>
                      <span className="text-[11px] font-mono text-slate-600 font-bold">
                        {activePunto.localidad}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-extrabold text-[#002147] leading-tight">
                        {activePunto.nombre_mostrado}
                      </h3>
                      {activePunto.tipo === 'punto' && (
                        <p className="text-xs font-bold text-[#0C65A1] mt-0.5">
                          Comercio: {activePunto.nombre_comercio}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1 text-xs text-slate-600">
                      <p className="flex items-start gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#0C65A1] shrink-0 mt-0.5" />
                        <span className="font-semibold text-slate-800">
                          {activePunto.direccion} (CP {activePunto.codigo_postal})
                        </span>
                      </p>
                      <p className="flex items-start gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#0C65A1] shrink-0 mt-0.5" />
                        <span>{activePunto.horario.resumen}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#0C65A1] shrink-0" />
                        <a
                          href={`tel:+34${activePunto.telefono}`}
                          data-cta-zone="map_infowindow"
                          data-store-id={activePunto.id}
                          className="font-bold text-[#002147] hover:underline"
                        >
                          {activePunto.telefonos_mostrados}
                        </a>
                      </p>
                    </div>

                    {/* Servicios destacados */}
                    <div className="pt-1.5 border-t border-slate-100 flex flex-wrap gap-1">
                      {derivarEtiquetasServicios(activePunto.servicios_confirmados).map((srv) => (
                        <span
                          key={srv}
                          className="inline-flex items-center gap-1 text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-[#0C65A1]" />
                          <span>{srv}</span>
                        </span>
                      ))}
                      {activePunto.servicios_confirmados.includes('costura_arreglos') && (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-[#0C65A1] font-bold px-1.5 py-0.5 rounded border border-[#0F76BB]/30">
                          <Scissors className="w-2.5 h-2.5" />
                          <span>Costura y Arreglos</span>
                        </span>
                      )}
                    </div>

                    {/* Botones de acción directa con color oficial de WhatsApp */}
                    <div className="pt-2 flex flex-wrap items-center gap-2">
                      <a
                        href={buildGoogleMapsUrl(activePunto)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#002147] text-white text-xs font-bold px-3 py-2 rounded-lg hover:bg-[#0a3161] transition-colors shadow-xs"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>Cómo llegar</span>
                      </a>
                      <a
                        href={buildMimoWhatsAppUrl(
                          `Hola, Mimo. Quiero hacer una consulta sobre ${activePunto.nombre_mostrado} (${activePunto.direccion})`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cta-zone="map_infowindow"
                        data-store-id={activePunto.id}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#1FA855] hover:bg-[#25B860] text-[#002147] text-xs font-bold px-3 py-2 rounded-lg transition-colors shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>
                      {FICHA_RUTA_POR_ID[activePunto.id] && (
                        <a
                          href={FICHA_RUTA_POR_ID[activePunto.id].href}
                          onClick={(e) => onNavigate?.(FICHA_RUTA_POR_ID[activePunto.id].href, e)}
                          className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0F76BB] hover:bg-[#0b5f97] text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors shadow-xs"
                        >
                          <Store className="w-3.5 h-3.5" />
                          <span>{FICHA_RUTA_POR_ID[activePunto.id].label}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        </div>
      )}

      {/* Lista rápida de acceso a cada punto debajo del mapa (2 colores) */}
      <div className="p-3 sm:p-4 bg-[#F4F9FE] border-t border-slate-200">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8 gap-2">
          {REGISTROS_PUNTOS.map((p) => {
            const isSelected = activePunto?.id === p.id;
            const isTienda = p.tipo === 'tienda';
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleMarkerClick(p)}
                className={`min-h-[48px] p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? isTienda
                      ? 'border-[#0F76BB] bg-[#EDF5FD] ring-2 ring-[#0F76BB]/30'
                      : 'border-[#002147] bg-white ring-2 ring-[#002147]/25'
                    : 'border-slate-200 bg-white hover:border-[#0F76BB]/50'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      isTienda ? 'bg-[#0F76BB]' : 'bg-[#002147]'
                    }`}
                  />
                  <span className="text-xs font-extrabold text-[#002147] truncate">
                    {p.localidad}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 truncate">
                  {isTienda ? p.direccion.split(',')[0] : p.nombre_comercio}
                </p>
              </button>
            );
          })}
        </div>
        <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
          <span>
            <strong>¿Sin tienda física en tu municipio?</strong> Cobertura a domicilio (bajo ruta e importe mínimo):
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/zonas/mos"
              onClick={(e) => {
                if (onNavigate) onNavigate('/zonas/mos', e);
              }}
              className="inline-flex items-center gap-1 min-h-[44px] px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-[#0F76BB] font-bold text-[#002147] transition-colors"
            >
              <span>Mos</span>
              <ExternalLink className="w-3 h-3 text-[#0C65A1]" aria-hidden="true" />
            </a>
            <a
              href="/zonas/nigran"
              onClick={(e) => {
                if (onNavigate) onNavigate('/zonas/nigran', e);
              }}
              className="inline-flex items-center gap-1 min-h-[44px] px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-[#0F76BB] font-bold text-[#002147] transition-colors"
            >
              <span>Nigrán</span>
              <ExternalLink className="w-3 h-3 text-[#0C65A1]" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
