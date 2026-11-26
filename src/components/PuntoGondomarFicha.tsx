import React, { useState } from 'react';
import { Dialog } from './Dialog';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Sparkles,
  Scissors,
  CheckCircle2,
  Navigation,
  Car,
  Store,
  ExternalLink,
  ShieldCheck,
  X,
  Share2,
  Calendar,
  CreditCard,
  Bus,
  ChevronDown,
  Shirt,
  Maximize2,
  Check,
  Truck,
  Heart,
  Layers,
  HelpCircle,
  ArrowRight,
  Handshake,
} from 'lucide-react';
import {
  REGISTROS_PUNTOS,
  PuntoRegistro,
  buildGoogleMapsUrl,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { ZONAS_SEO_LOCAL } from '../data/zonasSeoData';
import { getStoreStatusById } from '../utils/storeStatus';

interface PuntoGondomarFichaProps {
  onNavigate?: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const PuntoGondomarFicha: React.FC<PuntoGondomarFichaProps> = ({
  onNavigate,
  isModal = false,
  onClose,
}) => {
  const punto: PuntoRegistro =
    REGISTROS_PUNTOS.find((p: PuntoRegistro) => p.id === 'punto-gondomar') ??
    REGISTROS_PUNTOS[0];

  const [activeTabPhoto, setActiveTabPhoto] = useState<'fachada1' | 'interior' | 'fachada2'>('fachada1');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [failedPhotos, setFailedPhotos] = useState<Record<string, boolean>>({});

  const photos = {
    fachada1: {
      url: '/images/puntadas-no-aire/fachada-puntadas-no-aire-gondomar.webp',
      width: 1000,
      height: 558,
      titulo: 'Fachada Principal y Entrada Oficial',
      subtitulo: 'Entrada comercial de Puntadas No Aire en Avda. Elduayen, 9 (Gondomar).',
      tag: 'Fachada Principal',
      detalle:
        'Acceso a cota cero en la avenida principal de Gondomar. Punto colaborador oficial de Tintorería Mimos con recepción directa de tintorería y taller de costura in situ.',
    },
    interior: {
      url: '/images/puntadas-no-aire/interior-taller-puntadas-no-aire-gondomar.webp',
      width: 1200,
      height: 670,
      titulo: 'Interior: Taller de Costura y Mostrador',
      subtitulo: 'Mostrador de atención al público, taller de confección y recepción de prendas.',
      tag: 'Taller In Situ & Mostrador',
      detalle:
        'Taller artesanal de costura equipado con maquinaria profesional donde se reciben tus prendas para tintorería, colada o alfombras, y se realizan composturas y arreglos textiles con toma de medidas directa.',
    },
    fachada2: {
      url: '/images/puntadas-no-aire/escaparate-puntadas-no-aire-gondomar.webp',
      width: 1000,
      height: 558,
      titulo: 'Perspectiva Exterior y Escaparate',
      subtitulo: 'Escaparate y visibilidad comercial en Avda. Elduayen (Val Miñor).',
      tag: 'Escaparate y Acceso',
      detalle:
        'Ubicación céntrica y muy cómoda en el Val Miñor para depositar y retirar prendas con facilidad, evitando desplazamientos innecesarios a Vigo.',
    },
  };

  const storeStatus = getStoreStatusById('punto-gondomar');
  const whatsappUrl = buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero hacer una consulta sobre el punto colaborador de Puntadas No Aire en Gondomar (Avda. Elduayen, 9).'
  );
  const mapsUrl = buildGoogleMapsUrl(punto);

  const handleShare = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(window.location.origin + '/zonas/gondomar')
        .then(() => {
          setCopiedShare(true);
          setTimeout(() => setCopiedShare(false), 2500);
        })
        .catch(() => {});
    }
  };

  const preguntasFrecuentes =
    ZONAS_SEO_LOCAL.find((z) => z.url === '/zonas/gondomar')?.preguntasFrecuentes ?? [];

  return (
    <div className="space-y-10 animate-fadeIn text-[#002147]">
      {/* Botón de cierre superior si es modal */}
      {isModal && onClose && (
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-200 bg-[#F4F9FE]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#002147] uppercase tracking-wider">
              Ficha del Establecimiento Colaborador
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-11 h-11 inline-flex items-center justify-center rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-[#002147] transition-colors cursor-pointer"
            aria-label="Cerrar ficha"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Lightbox / Visor de Fotos a Pantalla Completa con Dialog accesible */}
      <Dialog
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        ariaLabel="Visor de fotografía a pantalla completa"
        maxWidthClass="max-w-4xl"
        className="bg-white border-slate-200"
      >
        <button
          type="button"
          onClick={() => setLightboxOpen(false)}
          className="absolute top-4 right-4 z-20 w-11 h-11 inline-flex items-center justify-center rounded-full bg-white/95 hover:bg-white text-[#002147] border border-slate-200 shadow-md transition-colors cursor-pointer"
          aria-label="Cerrar visor"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#F4F9FE] flex items-center justify-center">
          {!failedPhotos[activeTabPhoto] ? (
            <img
              src={photos[activeTabPhoto].url}
              alt={photos[activeTabPhoto].titulo}
              width={photos[activeTabPhoto].width}
              height={photos[activeTabPhoto].height}
              referrerPolicy="no-referrer"
              onError={() => setFailedPhotos((prev) => ({ ...prev, [activeTabPhoto]: true }))}
              className="max-h-[75dvh] w-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F4F9FE] text-[#002147]">
              <Handshake className="w-10 h-10 text-[#0C65A1] mb-3" />
              <p className="text-sm font-bold">{photos[activeTabPhoto].titulo}</p>
              <p className="text-xs text-slate-600 mt-1 max-w-md">{photos[activeTabPhoto].subtitulo}</p>
            </div>
          )}
        </div>
        <div className="p-4 sm:p-6 bg-white border-t border-slate-200 text-[#002147]">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#EDF5FD] text-[#0C65A1]">
              {photos[activeTabPhoto].tag}
            </span>
            <span className="text-xs text-slate-600">
              Punto Colaborador Oficial Mimos · Gondomar (Val Miñor)
            </span>
          </div>
          <p className="text-base sm:text-lg font-bold text-[#002147]">{photos[activeTabPhoto].titulo}</p>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">{photos[activeTabPhoto].subtitulo}</p>
          <p className="text-xs text-slate-600 mt-2 border-t border-slate-200 pt-2">
            {photos[activeTabPhoto].detalle}
          </p>
        </div>
      </Dialog>

      {/* 1. CABECERA HERO CON FOTOGRAFÍA REAL Y ACCIONES RÁPIDAS */}
      <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Columna Izquierda: Galería Interactiva con Fotos Reales */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#F4F9FE]">
            {/* Foto Activa Grande con Zoom */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden group bg-[#EDF5FD]">
              {!failedPhotos[activeTabPhoto] ? (
                <img
                  src={photos[activeTabPhoto].url}
                  alt={photos[activeTabPhoto].titulo}
                  width={photos[activeTabPhoto].width}
                  height={photos[activeTabPhoto].height}
                  referrerPolicy="no-referrer"
                  onError={() => setFailedPhotos((prev) => ({ ...prev, [activeTabPhoto]: true }))}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F4F9FE] to-[#EDF5FD] text-[#002147]">
                  <Handshake className="w-10 h-10 text-[#0C65A1] mb-2" />
                  <p className="text-sm font-bold">{photos[activeTabPhoto].titulo}</p>
                  <p className="text-xs text-slate-600 mt-1 max-w-md">{photos[activeTabPhoto].subtitulo}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-transparent to-black/15 pointer-events-none" />

              {/* Botón flotante para ampliar foto */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-[#002147] text-xs font-bold shadow-md transition-colors cursor-pointer border border-slate-200"
                title="Ampliar foto a pantalla completa"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#0C65A1]" />
                <span className="hidden sm:inline">Ampliar</span>
              </button>

              {/* Tags flotantes sobre la foto */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 pr-24">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-extrabold bg-white/95 text-[#002147] border border-slate-200 shadow-sm">
                  <Handshake className="w-3.5 h-3.5 text-[#0C65A1]" />
                  Punto Colaborador Mimos · Taller In Situ
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#0F76BB] text-white shadow-sm">
                  {photos[activeTabPhoto].tag}
                </span>
              </div>

              {/* Leyenda al pie de foto */}
              <div className="absolute bottom-4 left-4 right-4 text-white z-10 pointer-events-none">
                <p className="text-sm sm:text-base font-extrabold drop-shadow-md">
                  {photos[activeTabPhoto].titulo}
                </p>
                <p className="text-xs text-slate-100 drop-shadow-sm mt-0.5 line-clamp-2">
                  {photos[activeTabPhoto].subtitulo}
                </p>
              </div>
            </div>

            {/* Selector de Fotografías en Miniatura */}
            <div className="p-3 bg-[#F4F9FE] border-t border-slate-200 flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-bold text-[#002147] pl-1 shrink-0">Fotos reales:</span>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('fachada1')}
                className={`flex items-center gap-2 min-h-[44px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'fachada1'
                    ? 'bg-[#0F76BB] text-white border-[#0F76BB] shadow-xs'
                    : 'bg-white text-[#002147] border-slate-300 hover:bg-[#EDF5FD]'
                }`}
              >
                <span>1. Fachada & Entrada</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('interior')}
                className={`flex items-center gap-2 min-h-[44px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'interior'
                    ? 'bg-[#0F76BB] text-white border-[#0F76BB] shadow-xs'
                    : 'bg-white text-[#002147] border-slate-300 hover:bg-[#EDF5FD]'
                }`}
              >
                <span>2. Mostrador & Taller</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('fachada2')}
                className={`flex items-center gap-2 min-h-[44px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'fachada2'
                    ? 'bg-[#0F76BB] text-white border-[#0F76BB] shadow-xs'
                    : 'bg-white text-[#002147] border-slate-300 hover:bg-[#EDF5FD]'
                }`}
              >
                <span>3. Escaparate & Acceso</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Datos Operativos y Acciones Rápidas */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#0C65A1] uppercase tracking-wider">
                  Punto Colaborador Oficial · Gondomar
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-extrabold ${
                    storeStatus.isOpen
                      ? 'bg-emerald-50 text-[#147A3E] border border-emerald-200'
                      : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}
                >
                  {storeStatus.isOpen ? 'Abierto ahora' : 'Cerrado en este momento'}
                </span>
              </div>

              {isModal ? (
                <h2
                  id="modal-ficha-titulo"
                  className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight"
                >
                  Puntadas No Aire (Gondomar)
                </h2>
              ) : (
                <h1 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                  Tintorería, lavandería y costura Mimos en Gondomar (Puntadas No Aire)
                </h1>
              )}
              <p className="text-sm font-semibold text-slate-600 mt-1">
                Punto Oficial Tintorería Mimos y Taller de Costura en Val Miñor
              </p>

              <div className="mt-4 space-y-2 text-xs">
                <p className="text-[#002147] flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5" />
                  <span>
                    <strong>Avda. Elduayen, 9, bajo</strong>, 36380 Gondomar (Pontevedra).
                  </span>
                </p>

                <div className="p-3 rounded-2xl bg-[#F4F9FE] border border-slate-200 space-y-2">
                  <div className="flex items-start gap-2 text-slate-700">
                    <Car className="w-4 h-4 text-[#147A3E] shrink-0 mt-0.5" />
                    <span>
                      <strong>Aparcamiento & Acceso:</strong> En la arteria principal de Gondomar, con zonas de estacionamiento en la avenida y calles próximas para entrega y recogida ágil.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700">
                    <Clock className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5" />
                    <span>
                      <strong>Horario Temprano:</strong> Abre a las <strong>08:00 h</strong> de martes a viernes, perfecto para dejar encargos antes de la jornada laboral.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones de Contacto Rápido */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-extrabold text-sm py-3 px-4 rounded-xl shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp de Mimos</span>
                </a>
                <a
                  href={`tel:+34${punto.telefono}`}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white/95 hover:bg-[#002147] text-[#002147] hover:text-white font-extrabold text-sm py-3 px-4 rounded-xl border border-[#002147] transition-colors group tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#0C65A1] group-hover:text-white transition-colors shrink-0" />
                  <span>Llamar: {punto.telefonos_mostrados}</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#F4F9FE] hover:bg-[#EDF5FD] text-[#002147] border border-slate-300 font-bold text-xs py-2.5 px-3 rounded-xl transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#0C65A1]" />
                  <span>Cómo llegar (Ruta en Google Maps)</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-[#002147] hover:bg-[#EDF5FD] transition-colors cursor-pointer"
                  title="Copiar enlace de Gondomar"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#0C65A1]" />
                  <span className="hidden sm:inline">{copiedShare ? '¡Copiado!' : 'Compartir'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PUNTOS FUERTES Y VALORES DIFERENCIALES DE LA TIENDA */}
      <section aria-labelledby="seccion-ventajas" className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <h2 id="seccion-ventajas" className="sr-only">Ventajas y características de Puntadas No Aire Gondomar</h2>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-[#EDF5FD] text-[#0C65A1] flex items-center justify-center mb-3">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">Taller Propio In Situ</h3>
            <p className="text-xs text-slate-600 mt-1">
              Modistería y costura en la tienda con maquinaria para bajos exprés (preguntando antes disponibilidad en taller) y arreglos personalizados.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#147A3E] flex items-center justify-center mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">Apertura a las 08:00</h3>
            <p className="text-xs text-slate-600 mt-1">
              De martes a viernes abierto desde primera hora para dejar tu ropa antes de ir a trabajar.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-[#EDF5FD] text-[#0C65A1] flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">Punto Oficial Mimos</h3>
            <p className="text-xs text-slate-600 mt-1">
              Recepción de tintorería, trajes y edredones (para nuestra central de Vigo) y alfombras (con taller especialista).
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">Garantía y Mismo Precio</h3>
            <p className="text-xs text-slate-600 mt-1">
              Mismas tarifas que en nuestras sedes de Vigo, resguardo oficial y custodia garantizada.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HORARIO DETALLADO Y TALLER IN SITU DE COSTURA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bloque 1: Horario Detallado Semanal */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#EDF5FD] text-[#0C65A1] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#002147]">
                    Horario de Atención al Público
                  </h3>
                  <p className="text-xs text-slate-600">Atención directa en mostrador</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#F7F6F2] border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-[#002147]">Lunes</span>
                  <p className="text-[11px] text-slate-600">Jornada partida</p>
                </div>
                <div className="text-right font-mono font-bold text-[#002147] tabular-nums">
                  <div>10:00 – 13:30</div>
                  <div>16:00 – 19:00</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#EDF5FD] border border-[#0F76BB]/25 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-[#002147]">Martes y Miércoles</span>
                  <p className="text-[11px] text-[#147A3E] font-bold">¡Apertura temprana a las 08:00!</p>
                </div>
                <div className="text-right font-mono font-bold text-[#002147] tabular-nums">
                  <div>08:00 – 14:00</div>
                  <div>16:00 – 19:00</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#EDF5FD] border border-[#0F76BB]/25 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-[#002147]">Jueves y Viernes</span>
                  <p className="text-[11px] text-[#147A3E] font-bold">Mañanas continuas desde las 08:00</p>
                </div>
                <div className="text-right font-mono font-bold text-[#002147] tabular-nums">
                  <div>08:00 – 14:00</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F7F6F2] border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-[#002147]">Sábados</span>
                  <p className="text-[11px] text-slate-600">Mañanas</p>
                </div>
                <span className="font-mono font-bold text-[#002147] tabular-nums">
                  10:00 – 13:30
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#F7F6F2] border border-slate-200 flex justify-between items-center text-slate-500">
                <div>
                  <span className="font-medium">Domingos</span>
                  <p className="text-[11px] text-slate-500">Descanso semanal</p>
                </div>
                <span className="font-bold text-slate-500">Cerrado</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <CreditCard className="w-4 h-4 text-[#0C65A1] shrink-0" />
              <span><strong>Formas de pago:</strong> Efectivo y Tarjeta (sin Bizum).</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <ShieldCheck className="w-4 h-4 text-[#147A3E] shrink-0" />
              <span><strong>Resguardo oficial:</strong> Entrega con justificante numerado garantizado.</span>
            </div>
          </div>
        </div>

        {/* Bloque 2: Taller Propio de Costura y Modistería In Situ */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#F4F9FE] to-[#EDF5FD] rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0F76BB] text-white flex items-center justify-center">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#002147]">
                    Taller Propio de Modistería & Costura In Situ
                  </h3>
                  <p className="text-xs text-slate-600">
                    Maquinaria y confección experta en el propio taller de Puntadas No Aire
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-extrabold bg-[#0F76BB] text-white">
                Servicio Confirmado
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-4">
              En <strong>Puntadas No Aire (Gondomar)</strong> cuentas con servicio in situ de composturas de ropa y arreglos artesanales, combinado con la recepción para el cuidado integral de tintorería, edredones y colada de Mimos en el Val Miñor.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { tit: 'Bajos y bastillas de pantalón', desc: 'Acabado original en vaqueros, invisible en trajes de vestir, faldas y abrigos.' },
                { tit: 'Cambio de cremalleras y botones', desc: 'Cremalleras metálicas, invisibles o reforzadas en cazadoras, anoraks y pantalones.' },
                { tit: 'Ajuste de talla y cintura', desc: 'Estrechar o ensanchar prendas, meter laterales y adaptar vestidos a tu medida.' },
                { tit: 'Zurcidos y rotos', desc: 'Reparación de descosidos, costuras abiertas, coderas y refuerzos textiles.' },
                { tit: 'Textiles del hogar', desc: 'Ajuste de cortinas, cojines, dobladillos y composturas domésticas.' },
                { tit: 'Recepción directa de tintorería', desc: 'Entrega de trajes, abrigos, vestidos de fiesta, mantas y alfombras para Mimos.' },
              ].map((elem, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-extrabold text-[#002147] leading-tight">
                      {elem.tit}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                      {elem.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {onNavigate && (
            <div className="mt-5 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-700 font-medium">
                ¿Buscas más información sobre tipos de arreglos?
              </span>
              <a
                href="/arreglos-de-ropa-vigo"
                onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                className="min-h-[44px] inline-flex items-center gap-1 text-xs font-bold text-[#0C65A1] hover:underline"
              >
                <span>Ver sección completa de Arreglos de Ropa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 4. GUÍA COMPLETA DE SERVICIOS DISPONIBLES EN ESTE PUNTO */}
      <section aria-labelledby="seccion-servicios" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-black bg-[#EDF5FD] text-[#0C65A1]">
              Catálogo de Mostrador
            </span>
            <span className="text-xs font-bold text-slate-600">100% Confirmado en Gondomar</span>
          </div>
          <h2 id="seccion-servicios" className="text-xl sm:text-2xl font-black text-[#002147] tracking-tight">
            Servicios de Tintorería y Costura en Puntadas No Aire
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-1">
            Recepción directa en mostrador para particulares y familias de Gondomar, Nigrán, Baiona y todo el Val Miñor. Sin desplazamientos a Vigo y con garantía Mimos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Tarjeta 1: Tintorería y Trajes */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                  <Shirt className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147]">
                  Tintorería y Limpieza en Seco
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Trajes de chaqueta, americanas, abrigos de lana, gabardinas, cazadoras y vestidos delicados tratados en la central de Mimos en Vigo.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#147A3E] shrink-0" />
                <span>Desmanchado manual especializado</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#147A3E] shrink-0" />
                <span>Planchado profesional con entrega en percha y funda</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 2: Edredones y Ropa de Cama */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147]">
                  Edredones Nórdicos y Mantas
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Lavado e higienización térmica de edredones de pluma, plumón y fibras sintéticas, con secado controlado para esponjar el relleno natural.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#147A3E] shrink-0" />
                <span>Tratamiento bactericida y antiácaros</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#147A3E] shrink-0" />
                <span>Embolsado higiénico listo para guardar</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 3: Alfombras */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#1FA855] text-[#002147] flex items-center justify-center">
                  <Car className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147]">
                  Punto Receptor de Alfombras
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Deja tus alfombras de lana, sintéticas o pelo largo en Gondomar. Las medimos y coordinamos su limpieza con taller especialista colaborador.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#147A3E] shrink-0" />
                <span>Desempolvado y limpieza profunda</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#147A3E] shrink-0" />
                <span>Ahorra el viaje con la alfombra en coche hasta Vigo</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 4: Colada Familiar y Planchado */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147]">
                  Colada Familiar & Planchado
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Servicio por coladas y planchado profesional de camisas y prendas de uso diario. Ropa limpia, doblada y lista para colocar en el armario.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#147A3E] shrink-0" />
                <span>Camisas planchadas en percha impecables</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#147A3E] shrink-0" />
                <span>Detergentes hipoalergénicos de alta calidad</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 5: Taller de Costura In Situ */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center">
                  <Scissors className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147]">
                  Taller de Costura In Situ
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Toma de medidas, prueba de prendas, corte de bajos, ajuste de cinturas y reparación de cremalleras realizado directamente en el establecimiento de Gondomar.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#147A3E] shrink-0" />
                <span>Atención artesanal personalizada</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#147A3E] shrink-0" />
                <span>Rapidez y acabados precisos</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 6: Coordinación y Envío a Domicilio */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#1FA855] text-[#002147] flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147]">
                  Coordinación de Entrega a Domicilio
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                ¿Prefieres dejar tus prendas en Puntadas No Aire pero recibirlas en tu casa de Gondomar, Nigrán, Baiona o Vigo cuando estén listas? Podemos coordinar la entrega directa por WhatsApp.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#147A3E] shrink-0" />
                <span>Horarios concertados con antelación</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#147A3E] shrink-0" />
                <span>Furgoneta propia acondicionada para prendas colgadas</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. TABLA DE TIEMPOS Y PLAZOS ORIENTATIVOS DE ENTREGA */}
      <section aria-labelledby="seccion-plazos" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-[#0C65A1]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0C65A1]">
                Planificación Transparente
              </span>
            </div>
            <h2 id="seccion-plazos" className="text-lg sm:text-xl font-black text-[#002147]">
              Plazos Orientativos de Entrega en Puntadas No Aire (Gondomar)
            </h2>
          </div>
          <span className="text-xs text-slate-600">
            Aviso instantáneo por WhatsApp al estar listo tu pedido
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase text-[#002147]">
                <th className="py-3 px-3">Servicio / Tipo de Prenda</th>
                <th className="py-3 px-3">Plazo Estándar</th>
                <th className="py-3 px-3">Servicio Express Disponible</th>
                <th className="py-3 px-3">Detalle Operativo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Bajos de pantalón y ajustes sencillos
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">24 a 48 horas</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    Consultar en taller
                  </span>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Taller de costura in situ en Gondomar.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Trajes de chaqueta, americanas y vestidos
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">48 a 72 horas</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#EDF5FD] text-[#0C65A1] border border-[#0F76BB]/20">
                    Bajo consulta
                  </span>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Desmanchado manual y planchado artesanal en central.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Edredones nórdicos y mantas de invierno
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">3 a 5 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-600">Según carga de secado</td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Secado lento para devolver volumen al relleno.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Limpieza e higienizado de alfombras
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">7 a 10 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-600">No aplicable</td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Desempolvado mecánico y secado en túnel termocontrolado.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Cremalleras y composturas complejas
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">3 a 5 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-600">Consultar en mostrador</td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Prueba de ajuste in situ si es necesario.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. CÓMO LLEGAR, TRANSPORTE Y APARCAMIENTO DETALLADO */}
      <section aria-labelledby="seccion-llegar" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Navigation className="w-4 h-4 text-[#0C65A1]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0C65A1]">
              Accesibilidad y Transporte
            </span>
          </div>
          <h2 id="seccion-llegar" className="text-xl sm:text-2xl font-black text-[#002147]">
            Cómo Llegar a Puntadas No Aire en Gondomar
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Situado en la céntrica Avda. Elduayen, 9, arteria neurálgica de Gondomar que conecta fácilmente con Nigrán, Baiona, Tomiño y Vigo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tarjeta Coche y Aparcamiento */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1FA855] text-[#002147] flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147]">En Coche Particular</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Zonas de estacionamiento y parada a lo largo de la propia avenida y calles limítrofes del centro urbano.
            </p>
            <p className="text-[11px] text-slate-600">
              Facilidad para una parada breve al dejar o retirar bultos voluminosos (alfombras, nórdicos).
            </p>
          </div>

          {/* Tarjeta Autobús Interurbano */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                <Bus className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147]">En Autobús (Val Miñor)</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Líneas del transporte metropolitano que enlazan Vigo con Gondomar, Nigrán, Ramallosa y Baiona con parada cercana.
            </p>
            <p className="text-[11px] text-slate-600">
              Parada de autobús a pocos metros de la tienda.
            </p>
          </div>

          {/* Tarjeta A Pie */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147]">A Pie por Gondomar</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              En pleno corazón urbano de Gondomar, accesible a pie desde la zona comercial, colegios y plazas locales.
            </p>
            <p className="text-[11px] text-slate-600">
              Acceso a cota cero sin escalones, cómodo y accesible.
            </p>
          </div>
        </div>

        {/* Banner CTA Google Maps */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#EDF5FD] border border-[#0F76BB]/25 text-[#002147] flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-[#002147]">¿Quieres que tu navegador te guíe hasta la puerta?</h4>
            <p className="text-xs text-slate-700 tabular-nums">
              Coordenadas GPS: 42.11151, -8.762659 · Avda. Elduayen, 9, Gondomar
            </p>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center gap-2 bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs font-black py-2.5 px-4 rounded-xl transition-colors shadow-xs"
          >
            <Navigation className="w-4 h-4" />
            <span>Abrir en Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 7. PREGUNTAS FRECUENTES (FAQ) DE GONDOMAR */}
      <section aria-labelledby="seccion-faq" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-[#0C65A1]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0C65A1]">
            Respuestas Claras
          </span>
        </div>
        <h2 id="seccion-faq" className="text-xl sm:text-2xl font-black text-[#002147]">
          Preguntas Frecuentes sobre el Punto Puntadas No Aire en Gondomar
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Todo lo que necesitas saber para entregar tus prendas o encargar arreglos en el Val Miñor.
        </p>

        <div className="divide-y divide-slate-200 mt-4">
          {preguntasFrecuentes.map((item, index) => (
            <details key={index} className="group py-3 sm:py-4">
              <summary className="w-full min-h-[44px] py-2 flex items-center justify-between text-left gap-4 font-bold text-xs sm:text-sm text-[#002147] hover:text-[#0F76BB] transition-colors cursor-pointer list-none">
                <span className="flex items-start gap-2">
                  <span className="text-[#0C65A1] font-black tabular-nums">{index + 1}.</span>
                  <span>{item.pregunta}</span>
                </span>
                <ChevronDown className="w-4 h-4 text-slate-500 group-open:rotate-180 group-open:text-[#0C65A1] transition-transform shrink-0" />
              </summary>
              <div className="mt-2.5 pl-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>{item.respuesta}</p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-slate-700">
            <strong>¿Vives en Nigrán o Baiona?</strong> Nigrán no tiene tienda física propia; puedes entregar sin mínimo en Gondomar o solicitar ruta a domicilio.
          </p>
          <a
            href="/zonas/nigran"
            onClick={(e) => {
              if (onNavigate) onNavigate('/zonas/nigran', e);
            }}
            className="min-h-[44px] inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#0C65A1] hover:underline whitespace-nowrap shrink-0"
          >
            <span>Ver servicio en Nigrán</span>
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* 8. CERCANÍA, CONFIANZA Y CONTACTO DIRECTO */}
      <section aria-labelledby="seccion-confianza" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#F4F9FE] to-[#EDF5FD] border border-slate-200 text-[#002147] shadow-sm relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-white text-[#0C65A1] border border-[#0F76BB]/25">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              La tecnología de Mimos con la atención cercana de Puntadas No Aire
            </span>
            <h2 id="seccion-confianza" className="text-xl sm:text-2xl font-black text-[#002147]">
              Cuidado textil profesional y taller de costura en Gondomar (Val Miñor)
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              En Puntadas No Aire (Avda. Elduayen, 9) dispones del servicio conjunto de costura in situ y los procesos de tintorería e higienización de Tintorería Mimos con la comodidad de estar en tu propia localidad.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar ahora con Mimo</span>
            </a>
            <a
              href={`tel:+34${punto.telefono}`}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-white/95 hover:bg-[#002147] text-[#002147] hover:text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl border border-[#002147] transition-colors group tabular-nums"
            >
              <Phone className="w-4 h-4 text-[#0C65A1] group-hover:text-white transition-colors" />
              <span>Llamar al {punto.telefonos_mostrados}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
