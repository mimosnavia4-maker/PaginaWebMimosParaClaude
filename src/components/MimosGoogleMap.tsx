import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
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

interface MimosGoogleMapProps {
  selectedPuntoId?: string | null;
  onSelectPunto?: (punto: PuntoRegistro | null) => void;
  className?: string;
  onNavigate?: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

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
}) => {
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string) || '';
  const [filterType, setFilterType] = useState<'todos' | 'tiendas' | 'colaboradores'>('todos');
  const [activePunto, setActivePunto] = useState<PuntoRegistro | null>(null);

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

  if (!apiKey) {
    return (
      <div className="w-full p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#071324] text-center">
        <MapPin className="w-8 h-8 text-[#0F76BB] mx-auto mb-2" />
        <p className="font-bold text-[#002147] dark:text-white">
          Configuración de Google Maps pendiente
        </p>
        <p className="text-xs text-slate-500 mt-1">
          La clave de API de Google Maps se activará para mostrar el mapa interactivo.
        </p>
      </div>
    );
  }

  return (
    <div className={`w-full flex flex-col rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-[#071324] ${className}`}>
      {/* Barra de filtros interactivos del mapa (solo 2 colores: Azul claro y Azul oscuro) */}
      <div className="p-3.5 sm:p-4 bg-slate-50/90 dark:bg-[#0b1d36] border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-bold">
          <span className="text-slate-500 dark:text-slate-400 mr-1 hidden sm:inline">
            Mostrar:
          </span>
          <button
            type="button"
            onClick={() => {
              setFilterType('todos');
              setActivePunto(null);
            }}
            className={`px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterType === 'todos'
                ? 'bg-[#002147] text-white shadow-xs'
                : 'bg-white dark:bg-[#071324] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-[#0F76BB]'
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
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterType === 'tiendas'
                ? 'bg-[#0F76BB] text-white shadow-xs'
                : 'bg-white dark:bg-[#071324] text-[#0F76BB] dark:text-[#60B5F6] border border-slate-200 dark:border-slate-700 hover:border-[#0F76BB]'
            }`}
          >
            <img
              src="/logo-mimos.webp"
              alt=""
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
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filterType === 'colaboradores'
                ? 'bg-[#002147] text-white shadow-xs'
                : 'bg-white dark:bg-[#071324] text-[#002147] dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#002147]'
            }`}
          >
            <img
              src="/logo-mimos.webp"
              alt=""
              className="w-4 h-4 rounded-full bg-white/20 object-contain"
            />
            <span>4 Puntos colaboradores ({PUNTOS_COLABORADORES.length})</span>
          </button>
        </div>

        {/* Leyenda visual estricta de 2 colores */}
        <div className="flex items-center gap-4 text-xs font-bold text-slate-600 dark:text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#0F76BB] border border-white shadow-xs">
              <img
                src="/logo-mimos.webp"
                alt=""
                className="w-3.5 h-3.5 object-contain rounded-full"
              />
            </span>
            <span className="text-[#0F76BB] dark:text-[#60B5F6]">Tienda propia (Azul claro)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#002147] border border-white shadow-xs">
              <img
                src="/logo-mimos.webp"
                alt=""
                className="w-3.5 h-3.5 object-contain rounded-full bg-white/10"
              />
            </span>
            <span className="text-[#002147] dark:text-white">Punto colaborador (Azul oscuro)</span>
          </span>
        </div>
      </div>

      {/* Contenedor del mapa Google Maps */}
      <div className="relative w-full h-[430px] sm:h-[490px] lg:h-[530px]">
        <APIProvider apiKey={apiKey} libraries={['marker']}>
          <Map
            mapId="DEMO_MAP_ID"
            defaultCenter={defaultCenter}
            defaultZoom={11}
            gestureHandling="greedy"
            disableDefaultUI={false}
            mapTypeControl={false}
            streetViewControl={true}
            fullscreenControl={true}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            className="w-full h-full"
          >
            <MapCameraController targetPoint={activePunto} allPoints={displayedPoints} />

            {/* Marcadores avanzados con el Osito en Tiendas Propias y Azul Oscuro en Colaboradores */}
            {displayedPoints.map((punto) => {
              if (!punto.latitud || !punto.longitud) return null;
              const isTienda = punto.tipo === 'tienda';
              const isSelected = activePunto?.id === punto.id;

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
                  {activePunto.foto && (
                    <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-2 shadow-xs">
                      <img
                        src={activePunto.foto}
                        alt={activePunto.nombre_mostrado}
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
                            className="w-3.5 h-3.5 object-contain rounded-full"
                          />
                          <span>Tienda Propia Mimos</span>
                        </>
                      ) : (
                        <>
                          <img
                            src="/logo-mimos.webp"
                            alt=""
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
                    <h4 className="text-sm font-extrabold text-[#002147] leading-tight">
                      {activePunto.nombre_mostrado}
                    </h4>
                    {activePunto.tipo === 'punto' && (
                      <p className="text-xs font-bold text-[#0F76BB] mt-0.5">
                        Comercio: {activePunto.nombre_comercio}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1 text-xs text-slate-600">
                    <p className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0F76BB] shrink-0 mt-0.5" />
                      <span className="font-semibold text-slate-800">
                        {activePunto.direccion} (CP {activePunto.codigo_postal})
                      </span>
                    </p>
                    <p className="flex items-start gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#0F76BB] shrink-0 mt-0.5" />
                      <span>{activePunto.horario.resumen}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#0F76BB] shrink-0" />
                      <a
                        href={`tel:+34${activePunto.telefono}`}
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
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#0F76BB]" />
                        <span>{srv}</span>
                      </span>
                    ))}
                    {activePunto.servicios_confirmados.includes('costura_arreglos') && (
                      <span className="inline-flex items-center gap-1 text-[10px] bg-blue-50 text-[#0F76BB] font-bold px-1.5 py-0.5 rounded border border-[#0F76BB]/30">
                        <Scissors className="w-2.5 h-2.5" />
                        <span>Costura y Arreglos</span>
                      </span>
                    )}
                  </div>

                  {/* Botones de acción directa con color oficial de WhatsApp */}
                  <div className="pt-2 flex items-center gap-2">
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
                      className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#178A47] hover:bg-[#126E38] text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                    {activePunto.id === 'gregorio-espino' && (
                      <a
                        href="/tienda-mimos-gregorio-espino-vigo"
                        onClick={(e) => onNavigate?.('/tienda-mimos-gregorio-espino-vigo', e)}
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0F76BB] hover:bg-[#0b5f97] text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors shadow-xs"
                      >
                        <Store className="w-3.5 h-3.5" />
                        <span>Ver ficha completa de la tienda</span>
                      </a>
                    )}
                    {activePunto.id === 'punto-o-porrino' && (
                      <a
                        href="/zonas/o-porrino"
                        onClick={(e) => onNavigate?.('/zonas/o-porrino', e)}
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0F76BB] hover:bg-[#0b5f97] text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors shadow-xs"
                      >
                        <Store className="w-3.5 h-3.5" />
                        <span>Ver ficha y fotos del punto</span>
                      </a>
                    )}
                    {activePunto.id === 'punto-gondomar' && (
                      <a
                        href="/zonas/gondomar"
                        onClick={(e) => onNavigate?.('/zonas/gondomar', e)}
                        className="w-full inline-flex items-center justify-center gap-1.5 bg-[#0F76BB] hover:bg-[#0b5f97] text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors shadow-xs"
                      >
                        <Store className="w-3.5 h-3.5" />
                        <span>Ver ficha y fotos de Gondomar</span>
                      </a>
                    )}
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </div>

      {/* Lista rápida de acceso a cada punto debajo del mapa (2 colores) */}
      <div className="p-3 sm:p-4 bg-slate-50/70 dark:bg-[#071324] border-t border-slate-200 dark:border-slate-800">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {REGISTROS_PUNTOS.map((p) => {
            const isSelected = activePunto?.id === p.id;
            const isTienda = p.tipo === 'tienda';
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleMarkerClick(p)}
                className={`p-2 rounded-xl text-left transition-all border cursor-pointer ${
                  isSelected
                    ? isTienda
                      ? 'border-[#0F76BB] bg-blue-50 dark:bg-blue-950/40 ring-2 ring-[#0F76BB]/30'
                      : 'border-[#002147] bg-slate-100 dark:bg-slate-800 ring-2 ring-[#002147]/30'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1d36] hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      isTienda ? 'bg-[#0F76BB]' : 'bg-[#002147]'
                    }`}
                  />
                  <span className="text-[11px] font-extrabold text-[#002147] dark:text-white truncate">
                    {p.localidad}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {isTienda ? p.direccion.split(',')[0] : p.nombre_comercio}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
