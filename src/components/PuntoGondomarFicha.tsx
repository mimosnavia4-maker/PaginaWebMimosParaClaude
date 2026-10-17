import React, { useState } from 'react';
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
  ChevronUp,
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
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);

  const photos = {
    fachada1: {
      url: '/images/puntadas-no-aire/fachadaGondomar1.jpg',
      titulo: 'Fachada Principal y Entrada Oficial',
      subtitulo: 'Entrada comercial de Puntadas No Aire en Avda. Elduayen, 9 (Gondomar).',
      tag: 'Fachada Principal',
      detalle:
        'Acceso a cota cero en la avenida principal de Gondomar. Punto colaborador oficial de Tintorería Mimos con recepción directa de tintorería y taller de costura in situ.',
    },
    interior: {
      url: '/images/puntadas-no-aire/InteriorGondomar.jpg',
      titulo: 'Interior: Taller de Costura y Mostrador',
      subtitulo: 'Mostrador de atención al público, taller de confección y recepción de prendas.',
      tag: 'Taller In Situ & Mostrador',
      detalle:
        'Taller artesanal de costura equipado con maquinaria profesional donde se reciben tus prendas para tintorería, colada o alfombras, y se realizan composturas y arreglos textiles con toma de medidas directa.',
    },
    fachada2: {
      url: '/images/puntadas-no-aire/fachadaGondomar2.jpg',
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

  const toggleFaq = (index: number) => {
    setFaqAbierta(faqAbierta === index ? null : index);
  };

  const preguntasFrecuentes = [
    {
      q: '¿Cómo funciona la entrega de ropa para Tintorería Mimos en Puntadas No Aire?',
      a: 'Llevas tus prendas (trajes, vestidos, abrigos, edredones, alfombras o colada familiar) a Puntadas No Aire en Avda. Elduayen, 9, Gondomar. El establecimiento anota tus datos y te entrega un resguardo oficial. La furgoneta de transporte de Mimos traslada las prendas a nuestra central de Vigo para su tratamiento especializado y las devuelve al punto listas y precintadas para que las recojas cómodamente.',
    },
    {
      q: '¿Qué ventaja tiene el horario de apertura a las 08:00 h?',
      a: 'De martes a viernes, Puntadas No Aire abre sus puertas a las 08:00 de la mañana. Esto permite a los vecinos de Gondomar y del Val Miñor dejar su ropa antes de desplazarse al trabajo o llevar a los niños al colegio, facilitando enormemente la rutina diaria.',
    },
    {
      q: '¿Qué tipo de arreglos de costura se pueden solicitar en Puntadas No Aire?',
      a: 'Puntadas No Aire dispone de taller propio de costura in situ: dobladillos y bajos de pantalones y faldas (original, invisible o estándar), cambio y reparación de cremalleras, entallado de vestidos y trajes, ajustes de cintura, botones y zurcidos de rotos o descosidos.',
    },
    {
      q: '¿Se pueden entregar edredones de plumas y alfombras grandes en Gondomar?',
      a: 'Sí. Puntadas No Aire recibe edredones de plumón, plumas naturales, mantas y alfombras de cualquier dimensión. Tintorería Mimos se encarga de su lavado higiénico, desinfección térmica y secado especializado en nuestra planta de Vigo.',
    },
    {
      q: '¿Los precios de tintorería son los mismos que en las tiendas propias de Vigo?',
      a: 'Exactamente iguales. Las tarifas oficiales de Tintorería Mimos son uniformes en toda nuestra red. No hay ningún sobrecoste ni recargo por entrega o recogida en el punto colaborador de Gondomar.',
    },
    {
      q: '¿Puedo consultar dudas o presupuestos antes de acercarme a la tienda?',
      a: 'Por supuesto. Puedes chatear directamente con Mimo por WhatsApp al 655 536 844 o llamar directamente a Puntadas No Aire al 630 82 21 84.',
    },
    {
      q: 'Si después no puedo desplazarme a recogerlas, ¿podéis entregármelas a domicilio?',
      a: 'Sí. Si prefieres entrega a domicilio en cualquier punto de Gondomar, Nigrán, Baiona o Vigo, avísanos por WhatsApp y coordinamos la entrega con nuestra furgoneta propia de reparto.',
    },
  ];

  return (
    <div className="space-y-10 animate-fadeIn text-slate-800 dark:text-slate-100">
      {/* Botón de cierre superior si es modal */}
      {isModal && onClose && (
        <div className="flex items-center justify-between px-6 pt-5 pb-2 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Ficha del Establecimiento Colaborador
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            aria-label="Cerrar ficha"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Lightbox / Visor de Fotos a Pantalla Completa */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
              aria-label="Cerrar visor"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black flex items-center justify-center">
              <img
                src={photos[activeTabPhoto].url}
                alt={photos[activeTabPhoto].titulo}
                className="max-h-[75vh] w-full object-contain"
              />
            </div>
            <div className="p-4 sm:p-6 bg-slate-950 text-white">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0F76BB] text-white">
                  {photos[activeTabPhoto].tag}
                </span>
                <span className="text-xs text-slate-400">
                  Punto Colaborador Oficial Mimos · Gondomar (Val Miñor)
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold">{photos[activeTabPhoto].titulo}</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">{photos[activeTabPhoto].subtitulo}</p>
              <p className="text-xs text-slate-400 mt-2 border-t border-slate-800 pt-2">
                {photos[activeTabPhoto].detalle}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 1. CABECERA HERO CON FOTOGRAFÍA REAL Y ACCIONES RÁPIDAS */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Columna Izquierda: Galería Interactiva con Fotos Reales */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950">
            {/* Foto Activa Grande con Zoom */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden group">
              <img
                src={photos[activeTabPhoto].url}
                alt={photos[activeTabPhoto].titulo}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 pointer-events-none" />

              {/* Botón flotante para ampliar foto */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-white text-xs font-bold backdrop-blur-xs transition-colors cursor-pointer border border-white/20"
                title="Ampliar foto a pantalla completa"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Ampliar</span>
              </button>

              {/* Tags flotantes sobre la foto */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-[#002147]/95 text-white border border-white/20 shadow-lg backdrop-blur-xs">
                  <Handshake className="w-3.5 h-3.5 text-[#60B5F6]" />
                  Punto Colaborador Mimos · Taller In Situ
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-400 text-slate-950 shadow-md">
                  {photos[activeTabPhoto].tag}
                </span>
              </div>

              {/* Leyenda al pie de foto */}
              <div className="absolute bottom-4 left-4 right-4 text-white z-10 pointer-events-none">
                <p className="text-sm sm:text-base font-extrabold drop-shadow-md">
                  {photos[activeTabPhoto].titulo}
                </p>
                <p className="text-xs text-slate-200/90 drop-shadow-sm mt-0.5 line-clamp-2">
                  {photos[activeTabPhoto].subtitulo}
                </p>
              </div>
            </div>

            {/* Selector de Fotografías en Miniatura */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-bold text-slate-400 pl-1 shrink-0">Fotos reales:</span>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('fachada1')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'fachada1'
                    ? 'bg-[#0F76BB] text-white border-[#60B5F6] shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>1. Fachada & Entrada</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('interior')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'interior'
                    ? 'bg-[#0F76BB] text-white border-[#60B5F6] shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>2. Mostrador & Taller</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('fachada2')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'fachada2'
                    ? 'bg-[#0F76BB] text-white border-[#60B5F6] shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>3. Escaparate & Acceso</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Datos Operativos y Acciones Rápidas */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] uppercase tracking-wider">
                  Punto Colaborador Oficial · Gondomar
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold ${
                    storeStatus.isOpen
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      storeStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                    }`}
                  />
                  {storeStatus.isOpen ? 'Abierto ahora' : 'Cerrado en este momento'}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-[#002147] dark:text-white tracking-tight">
                Puntadas No Aire (Gondomar)
              </h1>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                Punto Oficial Tintorería Mimos y Taller de Costura en Val Miñor
              </p>

              <div className="mt-4 space-y-2 text-xs">
                <p className="text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                  <span>
                    <strong>Avda. Elduayen, 9, bajo</strong>, 36380 Gondomar (Pontevedra).
                  </span>
                </p>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <Car className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Aparcamiento & Acceso:</strong> En la arteria principal de Gondomar, con zonas de estacionamiento en la avenida y calles próximas para entrega y recogida ágil.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <Clock className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5" />
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
                  className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp de Mimos</span>
                </a>
                <a
                  href="tel:+34630822184"
                  className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#001733] text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4 text-[#60B5F6] shrink-0" />
                  <span>Llamar: 630 82 21 84</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs py-2.5 px-3 rounded-xl transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#0F76BB]" />
                  <span>Cómo llegar (Ruta en Google Maps)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
                  title="Copiar enlace de Gondomar"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#0F76BB]" />
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

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-[#0F76BB] flex items-center justify-center mb-3">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147] dark:text-white">Taller Propio In Situ</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Modistería y costura en la tienda con maquinaria para bajos express y arreglos personalizados.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147] dark:text-white">Apertura a las 08:00</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              De martes a viernes abierto desde primera hora para dejar tu ropa antes de ir a trabajar.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147] dark:text-white">Punto Oficial Mimos</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Recepción de tintorería, trajes, edredones y alfombras con traslado seguro a la central de Vigo.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147] dark:text-white">Garantía y Mismo Precio</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Mismas tarifas que en nuestras sedes de Vigo, resguardo oficial y custodia garantizada.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HORARIO DETALLADO Y TALLER IN SITU DE COSTURA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bloque 1: Horario Detallado Semanal */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-[#0F76BB] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#002147] dark:text-white">
                    Horario de Atención al Público
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Atención directa en mostrador</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">Lunes</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Jornada partida</p>
                </div>
                <div className="text-right font-mono font-bold text-slate-900 dark:text-white">
                  <div>10:00 – 13:30</div>
                  <div>16:00 – 19:00</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white">Martes y Miércoles</span>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">¡Apertura temprana a las 08:00!</p>
                </div>
                <div className="text-right font-mono font-bold text-slate-900 dark:text-white">
                  <div>08:00 – 14:00</div>
                  <div>16:00 – 19:00</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white">Jueves y Viernes</span>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">Mañanas continuas desde las 08:00</p>
                </div>
                <div className="text-right font-mono font-bold text-slate-900 dark:text-white">
                  <div>08:00 – 14:00</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">Sábados</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Mañanas</p>
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  10:00 – 13:30
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex justify-between items-center text-slate-400">
                <div>
                  <span className="font-medium">Domingos</span>
                  <p className="text-[11px] text-slate-400">Descanso semanal</p>
                </div>
                <span className="font-bold text-slate-400">Cerrado</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <CreditCard className="w-4 h-4 text-[#0F76BB] shrink-0" />
              <span><strong>Formas de pago:</strong> Efectivo, Tarjeta y Bizum.</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Resguardo oficial:</strong> Entrega con justificante numerado garantizado.</span>
            </div>
          </div>
        </div>

        {/* Bloque 2: Taller Propio de Costura y Modistería In Situ */}
        <div className="lg:col-span-7 bg-gradient-to-br from-blue-50/70 to-indigo-50/40 dark:from-slate-900 dark:to-blue-950/30 rounded-3xl p-6 sm:p-7 border border-blue-200/80 dark:border-blue-900/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#002147] text-[#60B5F6] flex items-center justify-center">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#002147] dark:text-white">
                    Taller Propio de Modistería & Costura In Situ
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Maquinaria y confección experta en el propio taller de Puntadas No Aire
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-[#0F76BB] text-white">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Servicio Confirmado
              </span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
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
                  className="p-3 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white leading-tight">
                      {elem.tit}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {elem.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {onNavigate && (
            <div className="mt-5 pt-3 border-t border-blue-200/60 dark:border-blue-900/40 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                ¿Buscas más información sobre tipos de arreglos?
              </span>
              <a
                href="/arreglos-de-ropa-vigo"
                onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
              >
                <span>Ver sección completa de Arreglos de Ropa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 4. GUÍA COMPLETA DE SERVICIOS DISPONIBLES EN ESTE PUNTO */}
      <section aria-labelledby="seccion-servicios" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-blue-100 dark:bg-blue-950 text-[#0F76BB] dark:text-[#60B5F6]">
              Catálogo de Mostrador
            </span>
            <span className="text-xs font-bold text-slate-500">100% Confirmado en Gondomar</span>
          </div>
          <h2 id="seccion-servicios" className="text-xl sm:text-2xl font-black text-[#002147] dark:text-white tracking-tight">
            Servicios de Tintorería y Costura en Puntadas No Aire
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl mt-1">
            Recepción directa en mostrador para particulares y familias de Gondomar, Nigrán, Baiona y todo el Val Miñor. Sin desplazamientos a Vigo y con garantía Mimos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Tarjeta 1: Tintorería y Trajes */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#002147] text-white flex items-center justify-center">
                  <Shirt className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">
                  Tintorería y Limpieza en Seco
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Trajes de chaqueta, americanas, abrigos de lana, gabardinas, cazadoras y vestidos delicados tratados en la central de Mimos en Vigo.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Desmanchado manual especializado</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Planchado profesional con entrega en percha y funda</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 2: Edredones y Ropa de Cama */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">
                  Edredones Nórdicos y Mantas
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Lavado e higienización térmica de edredones de pluma, plumón y fibras sintéticas, con secado controlado para esponjar el relleno natural.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Tratamiento bactericida y antiácaros</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Embolsado higiénico listo para guardar</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 3: Alfombras */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                  <Car className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">
                  Punto Receptor de Alfombras
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Deja tus alfombras de lana, sintéticas o pelo largo en Gondomar. Las medimos y las transportamos a nuestra planta de lavado en plano.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Desempolvado y limpieza profunda</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Ahorra el viaje con la alfombra en coche hasta Vigo</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 4: Colada Familiar y Planchado */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-700 text-white flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">
                  Colada Familiar & Planchado
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Servicio por coladas y planchado profesional de camisas y prendas de uso diario. Ropa limpia, doblada y lista para colocar en el armario.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Camisas planchadas en percha impecables</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Detergentes hipoalergénicos de alta calidad</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 5: Taller de Costura In Situ */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center">
                  <Scissors className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">
                  Taller de Costura In Situ
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Toma de medidas, prueba de prendas, corte de bajos, ajuste de cinturas y reparación de cremalleras realizado directamente en el establecimiento de Gondomar.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Atención artesanal personalizada</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Rapidez y acabados precisos</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 6: Coordinación y Envío a Domicilio */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">
                  Coordinación de Entrega a Domicilio
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                ¿Prefieres dejar tus prendas en Puntadas No Aire pero recibirlas en tu casa de Gondomar, Nigrán, Baiona o Vigo cuando estén listas? Podemos coordinar la entrega directa por WhatsApp.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Horarios concertados con antelación</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Furgoneta propia acondicionada para prendas colgadas</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. TABLA DE TIEMPOS Y PLAZOS ORIENTATIVOS DE ENTREGA */}
      <section aria-labelledby="seccion-plazos" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-[#0F76BB]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                Planificación Transparente
              </span>
            </div>
            <h2 id="seccion-plazos" className="text-lg sm:text-xl font-black text-[#002147] dark:text-white">
              Plazos Orientativos de Entrega en Puntadas No Aire (Gondomar)
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Aviso instantáneo por WhatsApp al estar listo tu pedido
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-extrabold uppercase text-slate-500 dark:text-slate-400">
                <th className="py-3 px-3">Servicio / Tipo de Prenda</th>
                <th className="py-3 px-3">Plazo Estándar</th>
                <th className="py-3 px-3">Servicio Express Disponible</th>
                <th className="py-3 px-3">Detalle Operativo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                  Bajos de pantalón y ajustes sencillos
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold">24 a 48 horas</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Mismo día / 24h
                  </span>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Taller de costura in situ en Gondomar.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                  Trajes de chaqueta, americanas y vestidos
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold">48 a 72 horas</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    Bajo consulta
                  </span>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Desmanchado manual y planchado artesanal en central.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                  Edredones nórdicos y mantas de invierno
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold">3 a 5 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-400">Según carga de secado</td>
                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Secado lento para devolver volumen al relleno.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                  Limpieza e higienizado de alfombras
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold">7 a 10 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-400">No aplicable</td>
                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Desempolvado mecánico y secado en túnel termocontrolado.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                  Cremalleras y composturas complejas
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold">3 a 5 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-400">Consultar en mostrador</td>
                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Prueba de ajuste in situ si es necesario.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. CÓMO LLEGAR, TRANSPORTE Y APARCAMIENTO DETALLADO */}
      <section aria-labelledby="seccion-llegar" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Navigation className="w-4 h-4 text-[#0F76BB]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
              Accesibilidad y Transporte
            </span>
          </div>
          <h2 id="seccion-llegar" className="text-xl sm:text-2xl font-black text-[#002147] dark:text-white">
            Cómo Llegar a Puntadas No Aire en Gondomar
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Situado en la céntrica Avda. Elduayen, 9, arteria neurálgica de Gondomar que conecta fácilmente con Nigrán, Baiona, Tomiño y Vigo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tarjeta Coche y Aparcamiento */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">En Coche Particular</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Zonas de estacionamiento y parada a lo largo de la propia avenida y calles limítrofes del centro urbano.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Facilidad para una parada breve al dejar o retirar bultos voluminosos (alfombras, nórdicos).
            </p>
          </div>

          {/* Tarjeta Autobús Interurbano */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                <Bus className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">En Autobús (Val Miñor)</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Líneas del transporte metropolitano que enlazan Vigo con Gondomar, Nigrán, Ramallosa y Baiona con parada cercana.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Parada de autobús a pocos metros de la tienda.
            </p>
          </div>

          {/* Tarjeta A Pie */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#002147] text-white flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">A Pie por Gondomar</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              En pleno corazón urbano de Gondomar, accesible a pie desde la zona comercial, colegios y plazas locales.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Acceso a cota cero sin escalones, cómodo y accesible.
            </p>
          </div>
        </div>

        {/* Banner CTA Google Maps */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#002147] text-white flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold">¿Quieres que tu navegador te guíe hasta la puerta?</h4>
            <p className="text-xs text-blue-200">
              Coordenadas GPS: 42.11151, -8.762659 · Avda. Elduayen, 9, Gondomar
            </p>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#0F76BB] hover:bg-[#60B5F6] hover:text-[#002147] text-white text-xs font-black py-2.5 px-4 rounded-xl transition-all shadow-md"
          >
            <Navigation className="w-4 h-4" />
            <span>Abrir en Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 7. PREGUNTAS FRECUENTES (FAQ) DE GONDOMAR */}
      <section aria-labelledby="seccion-faq" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-[#0F76BB]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
            Respuestas Claras
          </span>
        </div>
        <h2 id="seccion-faq" className="text-xl sm:text-2xl font-black text-[#002147] dark:text-white">
          Preguntas Frecuentes sobre el Punto Puntadas No Aire en Gondomar
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Todo lo que necesitas saber para entregar tus prendas o encargar arreglos en el Val Miñor.
        </p>

        <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-4">
          {preguntasFrecuentes.map((item, index) => {
            const abierta = faqAbierta === index;
            return (
              <div key={index} className="py-3 sm:py-4">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between text-left gap-4 font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 hover:text-[#0F76BB] dark:hover:text-[#60B5F6] transition-colors cursor-pointer"
                  aria-expanded={abierta}
                >
                  <span className="flex items-start gap-2">
                    <span className="text-[#0F76BB] font-black">{index + 1}.</span>
                    <span>{item.q}</span>
                  </span>
                  {abierta ? (
                    <ChevronUp className="w-4 h-4 text-[#0F76BB] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {abierta && (
                  <div className="mt-2.5 pl-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed animate-fadeIn">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. CERCANÍA, CONFIANZA Y CONTACTO DIRECTO */}
      <section aria-labelledby="seccion-confianza" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-[#002147] text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-[#60B5F6] border border-white/15">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              La tecnología de Mimos con la atención cercana de Puntadas No Aire
            </span>
            <h2 id="seccion-confianza" className="text-xl sm:text-2xl font-black text-white">
              Cuidado textil profesional y taller de costura en Gondomar (Val Miñor)
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              En Puntadas No Aire (Avda. Elduayen, 9) dispones del servicio conjunto de costura in situ y los procesos de tintorería e higienización de Tintorería Mimos con la comodidad de estar en tu propia localidad.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-lg transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar ahora con Mimo</span>
            </a>
            <a
              href="tel:+34630822184"
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl border border-white/20 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#60B5F6]" />
              <span>Llamar al 630 82 21 84</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
