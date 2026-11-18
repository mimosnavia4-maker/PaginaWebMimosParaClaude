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
  Footprints,
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
  AlertCircle,
} from 'lucide-react';
import {
  REGISTROS_PUNTOS,
  PuntoRegistro,
  buildGoogleMapsUrl,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { getStoreStatusById } from '../utils/storeStatus';

interface TiendaVenezuelaFichaProps {
  onNavigate?: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const TiendaVenezuelaFicha: React.FC<TiendaVenezuelaFichaProps> = ({
  onNavigate,
  isModal = false,
}) => {
  const punto: PuntoRegistro =
    REGISTROS_PUNTOS.find((p: PuntoRegistro) => p.id === 'rua-venezuela') ||
    REGISTROS_PUNTOS[2];

  const [activeTabPhoto, setActiveTabPhoto] = useState<'fachada' | 'interior' | 'calle'>('fachada');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);
  const [failedPhotos, setFailedPhotos] = useState<Record<string, boolean>>({});

  const photos = {
    fachada: {
      url: '/images/mimos-venezuela/fachada-portal-mimos-venezuela-vigo.jpg',
      titulo: 'Portal en Rúa de Venezuela, 29 y Señalización Mimos',
      subtitulo:
        'Cartel azul de Tintorería Arreglos Mimos en la acera junto al portal nº 29 y placa oficial azul MIMOS indicando acceso a la entreplanta.',
      tag: 'Portal nº 29 · Entreplanta',
      detalle:
        'Acceso en Rúa de Venezuela, 29 (Santiago de Vigo), señalizado en fachada y acera para entrar directamente hacia la entreplanta.',
    },
    interior: {
      url: '/images/mimos-venezuela/interior-taller-mimos-venezuela-vigo.jpg',
      titulo: 'Interior: Taller de Costura In Situ, Probador y Mostrador',
      subtitulo:
        'Máquina de coser industrial en tienda, espejo probador para toma de medidas exacta y mostrador de atención al público.',
      tag: 'Taller In Situ & Probador',
      detalle:
        'Espacio luminoso preparado para probar tus prendas en tienda, marcar bajos o entalles al momento y entregar tus encargos en mostrador.',
    },
    calle: {
      url: '/images/mimos-venezuela/calle-senalizacion-mimos-venezuela-vigo.jpg',
      titulo: 'Entorno Rúa de Venezuela y Parking Subterráneo Enfrente',
      subtitulo:
        'Perspectiva desde la acera de la tienda frente al acceso del aparcamiento de pago Parking Venezuela (nº 34–36), en pleno Santiago de Vigo.',
      tag: 'Entorno & Parking Enfrente',
      detalle:
        'Ubicación céntrica a pocos pasos de El Corte Inglés, Gran Vía y Urzáiz, con parking subterráneo de pago justo cruzando la calle.',
    },
  };

  const storeStatus = getStoreStatusById('rua-venezuela');
  const whatsappUrl = buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero hacer una consulta sobre la tienda propia de Mimos Venezuela (Rúa de Venezuela, 29, Entreplanta, Vigo).'
  );
  const mapsUrl = buildGoogleMapsUrl(punto);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '/tienda-mimos-venezuela-vigo');
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const toggleFaq = (index: number) => {
    setFaqAbierta(faqAbierta === index ? null : index);
  };

  const preguntasFrecuentes = [
    {
      q: '¿Dónde está exactamente la tienda y cómo se entra a la entreplanta?',
      a: 'Estamos en Rúa de Venezuela, 29, Entreplanta (Santiago de Vigo, 36203 Vigo), a pocos minutos a pie de El Corte Inglés, Gran Vía y Urzáiz. En la acera verás nuestro cartel azul de Tintorería Arreglos Mimos junto al árbol y, al lado de la puerta del portal, la placa azul oficial de MIMOS que te guía hacia la entreplanta.',
    },
    {
      q: '¿Cuál es el horario de Mimos Venezuela? ¿Abrís los sábados?',
      a: 'Atendemos de lunes a viernes de 09:30 a 13:30 y de 16:30 a 19:30. Los sábados, domingos y festivos esta tienda permanece cerrada. Si necesitas venir un sábado por la mañana, nuestras tiendas propias de Navia (10:00–13:30) y Gregorio Espino 42 (09:30–13:00) sí abren.',
    },
    {
      q: '¿Tenéis taller propio de costura y probador en la tienda de Venezuela?',
      a: 'Sí. Contamos con taller propio de costura in situ con máquina industrial y espejo probador para tomar la medida exacta de bajos, estrechar o ensanchar prendas, cambiar cremalleras y ajustar vestidos o pantalones directamente en tienda.',
    },
    {
      q: '¿Qué métodos de pago aceptáis en Mimos Venezuela? ¿Aceptáis Bizum?',
      a: 'En nuestra tienda de Rúa de Venezuela 29 aceptamos pago con tarjeta bancaria (contactless) y en efectivo. No se acepta Bizum en este establecimiento. Entregamos siempre tu resguardo oficial de depósito.',
    },
    {
      q: '¿Dónde puedo aparcar si vengo en coche al centro con edredones o alfombras?',
      a: 'Justo enfrente de nuestro portal se encuentra el aparcamiento subterráneo de pago Parking Venezuela (accesos en Rúa de Venezuela 34–36), muy práctico para bajar prendas de abrigo, trajes, edredones o alfombras sin dar vueltas por el centro.',
    },
    {
      q: '¿Necesito pedir cita previa o puedo pedir entrega a domicilio después?',
      a: 'No hace falta cita previa para entregar o probar prendas en horario de apertura. Y si tras dejar tu encargo en Rúa de Venezuela 29 prefieres recibirlo limpio en tu casa u oficina de Vigo, puedes coordinar la entrega a domicilio con Mimo por WhatsApp.',
    },
  ];

  return (
    <div className="space-y-10 animate-fadeIn text-slate-800 dark:text-slate-100">
      {/* Lightbox / Visor de Fotos a Pantalla Completa con Dialog accesible */}
      <Dialog
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        ariaLabel="Visor de fotografía a pantalla completa"
        maxWidthClass="max-w-4xl"
        className="bg-slate-900 border-slate-700"
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
          {!failedPhotos[activeTabPhoto] ? (
            <img
              src={photos[activeTabPhoto].url}
              alt={photos[activeTabPhoto].titulo}
              referrerPolicy="no-referrer"
              onError={() => setFailedPhotos((prev) => ({ ...prev, [activeTabPhoto]: true }))}
              className="max-h-[75vh] w-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-900 text-slate-200">
              <Store className="w-10 h-10 text-[#60B5F6] mb-3" />
              <p className="text-sm font-bold">{photos[activeTabPhoto].titulo}</p>
              <p className="text-xs text-slate-400 mt-1 max-w-md">{photos[activeTabPhoto].subtitulo}</p>
            </div>
          )}
        </div>
        <div className="p-4 sm:p-6 bg-slate-950 text-white">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#0F76BB] text-white">
              {photos[activeTabPhoto].tag}
            </span>
            <span className="text-xs text-slate-400">Tienda Propia Mimos · Santiago de Vigo</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold">{photos[activeTabPhoto].titulo}</h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">{photos[activeTabPhoto].subtitulo}</p>
          <p className="text-xs text-slate-400 mt-2 border-t border-slate-800 pt-2">
            {photos[activeTabPhoto].detalle}
          </p>
        </div>
      </Dialog>

      {/* 1. CABECERA HERO CON FOTOGRAFÍA REAL Y ACCIONES RÁPIDAS */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Columna Izquierda: Galería Interactiva con Fotos Reales */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-slate-950">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden group bg-slate-900">
              {!failedPhotos[activeTabPhoto] ? (
                <img
                  src={photos[activeTabPhoto].url}
                  alt={photos[activeTabPhoto].titulo}
                  referrerPolicy="no-referrer"
                  onError={() => setFailedPhotos((prev) => ({ ...prev, [activeTabPhoto]: true }))}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#002147] to-slate-900 text-slate-200">
                  <Store className="w-10 h-10 text-[#60B5F6] mb-2" />
                  <p className="text-sm font-bold">{photos[activeTabPhoto].titulo}</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-md">{photos[activeTabPhoto].subtitulo}</p>
                </div>
              )}
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
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 pr-24">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black bg-[#002147]/95 text-white border border-white/20 shadow-lg backdrop-blur-xs">
                  <Store className="w-3.5 h-3.5 text-[#60B5F6]" />
                  Tienda Propia Mimos · Taller In Situ
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
                onClick={() => setActiveTabPhoto('fachada')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'fachada'
                    ? 'bg-[#0F76BB] text-white border-[#60B5F6] shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>1. Portal nº 29 & Cartel</span>
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
                <span>2. Taller & Probador</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('calle')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'calle'
                    ? 'bg-[#0F76BB] text-white border-[#60B5F6] shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>3. Rúa Venezuela & Parking</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Datos Operativos y Acciones Rápidas */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] uppercase tracking-wider">
                  Sede Centro · Santiago de Vigo
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold ${
                    storeStatus.isOpen
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300'
                      : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {storeStatus.isOpen ? 'Abierto ahora' : 'Cerrado en este momento'}
                </span>
              </div>

              {isModal ? (
                <h2
                  id="modal-ficha-titulo"
                  className="text-2xl sm:text-3xl font-black text-[#002147] dark:text-white tracking-tight"
                >
                  Mimos Venezuela
                </h2>
              ) : (
                <h1 className="text-2xl sm:text-3xl font-black text-[#002147] dark:text-white tracking-tight">
                  Mimos Venezuela
                </h1>
              )}
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                Tintorería, Lavandería y Taller Propio de Costura
              </p>

              <div className="mt-4 space-y-2 text-xs">
                <p className="text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                  <span>
                    <strong>Rúa de Venezuela, 29, Entreplanta</strong>, Santiago de Vigo, 36203 Vigo (Pontevedra).
                  </span>
                </p>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <Store className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5" />
                    <span>
                      <strong>Cómo encontrarnos:</strong> Busca el cartel azul en la acera y la placa oficial <strong>MIMOS</strong> junto al portal del nº 29 para subir a la entreplanta.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <Car className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Parking justo enfrente:</strong> Aparcamiento subterráneo de pago <strong>Parking Venezuela</strong> (nº 34–36), justo cruzando la calle frente al nº 29.
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
                  <span>WhatsApp con Mimo</span>
                </a>

                <a
                  href={`tel:+34${punto.telefono}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#001733] text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4 text-[#60B5F6] shrink-0" />
                  <span>Llamar: {punto.telefonos_mostrados}</span>
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
                  <span>Cómo llegar (Ruta GPS en Google Maps)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
                  title="Copiar enlace directo de la tienda"
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
      <section aria-labelledby="seccion-ventajas-venezuela" className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <h2 id="seccion-ventajas-venezuela" className="sr-only">Ventajas y características de Mimos Venezuela</h2>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-[#0F76BB] flex items-center justify-center mb-3">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147] dark:text-white">Taller Propio In Situ</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Máquina industrial y espejo probador en tienda para marcar bajos y entalles exactos.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center mb-3">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147] dark:text-white">Parking Enfrente</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Parking subterráneo de pago justo enfrente (Rúa de Venezuela 34–36) para bultos cómodos.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 flex items-center justify-center mb-3">
            <Footprints className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147] dark:text-white">Pleno Centro de Vigo</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              A pocos minutos a pie de El Corte Inglés, Gran Vía y Rúa de Urzáiz.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147] dark:text-white">Atención Directa Mimos</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Resguardo oficial numerado, tarifas de tienda propia y trato personalizado.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HORARIO DETALLADO Y TALLER IN SITU DE COSTURA */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bloque 1: Horario Detallado Semanal y Medios de Pago */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-[#0F76BB] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-[#002147] dark:text-white">
                  Horario de Atención al Público
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Atención presencial de lunes a viernes
                </p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">Lunes a Viernes</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Horario partido de centro</p>
                </div>
                <div className="text-right font-mono font-bold text-slate-900 dark:text-white">
                  <div>09:30 – 13:30</div>
                  <div>16:30 – 19:30</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex justify-between items-center text-slate-500 dark:text-slate-400">
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Sábados</span>
                  <p className="text-[11px]">Esta tienda no abre los sábados</p>
                </div>
                <span className="font-bold text-slate-500 dark:text-slate-400">Cerrado</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex justify-between items-center text-slate-400">
                <div>
                  <span className="font-medium">Domingos y Festivos</span>
                  <p className="text-[11px] text-slate-400">Descanso del personal</p>
                </div>
                <span className="font-bold text-slate-400">Cerrado</span>
              </div>
            </div>

            {onNavigate && (
              <div className="mt-3 p-3 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700 text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                <strong className="text-[#002147] dark:text-[#60B5F6]">¿Necesitas venir un sábado por la mañana?</strong>{' '}
                Atendemos los sábados en{' '}
                <a
                  href="/tienda-mimos-gregorio-espino-vigo"
                  onClick={(e) => onNavigate('/tienda-mimos-gregorio-espino-vigo', e)}
                  className="font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
                >
                  Gregorio Espino 42 (09:30–13:00)
                </a>{' '}
                y{' '}
                <a
                  href="/tienda-mimos-navia-vigo"
                  onClick={(e) => onNavigate('/tienda-mimos-navia-vigo', e)}
                  className="font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
                >
                  Sede Central Navia (10:00–13:30)
                </a>
                .
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2.5">
            <div className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
              <CreditCard className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
              <span>
                <strong>Métodos de pago:</strong> Tarjeta bancaria (contactless) y Efectivo.
              </span>
            </div>
            <div className="flex items-start gap-2 text-xs text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/50 rounded-xl px-3 py-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Aviso importante:</strong> En la tienda de Venezuela <strong>no se acepta Bizum</strong>.
              </span>
            </div>
            <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Resguardo oficial:</strong> Entrega siempre con ticket de depósito garantizado.
              </span>
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
                    Taller Propio de Costura In Situ
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Maquinaria industrial y probador en la tienda de Rúa de Venezuela, 29
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-[#0F76BB] text-white">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Probador en Tienda
              </span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              En <strong>Mimos Venezuela</strong> no solo recogemos tus encargos: disponemos de <strong>probador con espejo y taller de costura propio en la propia entreplanta</strong> para tomarte medidas en directo y ajustar tus prendas con precisión. Si además necesitas algún trabajo especial de piel o bordado personalizado, lo coordinamos en red interna con nuestra tienda taller de Gregorio Espino 42.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                {
                  tit: 'Bajos y bastillas a medida',
                  desc: 'Pantalones vaqueros o de vestir, faldas, vestidos y abrigos marcados en el probador.',
                },
                {
                  tit: 'Cambio de cremalleras y botones',
                  desc: 'Sustitución y reparación en abrigos, anoraks, pantalones, faldas y prendas de uso diario.',
                },
                {
                  tit: 'Estrechar, ensanchar y cinturas',
                  desc: 'Entalles en americanas, camisas, vestidos y ajustes de cintura para un calce exacto.',
                },
                {
                  tit: 'Arreglos de prendas delicadas',
                  desc: 'Repaso cuidadoso en vestidos de fiesta, ceremonia y tejidos ligeros en taller.',
                },
                {
                  tit: 'Zurcidos, descosidos y rotos',
                  desc: 'Reparación de costuras abiertas, forros sueltos y pequeñas roturas en prendas de vestir.',
                },
                {
                  tit: 'Limpieza + arreglo en un viaje',
                  desc: 'Dejas la prenda en el centro y combinamos costura in situ con tintorería o planchado.',
                },
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
                ¿Quieres consultar las 18 especialidades de costura Mimos?
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

      {/* 4. GUÍA COMPLETA DE SERVICIOS DISPONIBLES EN ESTA TIENDA */}
      <section aria-labelledby="seccion-servicios-venezuela" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-blue-100 dark:bg-blue-950 text-[#0F76BB] dark:text-[#60B5F6]">
              Catálogo de Tienda Propia
            </span>
            <span className="text-xs font-bold text-slate-500">100% Confirmado en Rúa de Venezuela, 29</span>
          </div>
          <h2 id="seccion-servicios-venezuela" className="text-xl sm:text-2xl font-black text-[#002147] dark:text-white tracking-tight">
            Todos los Servicios de Tintorería y Lavandería en Mimos Venezuela
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl mt-1">
            Recepción directa en mostrador en el centro de Vigo para particulares, profesionales y pequeños comercios, con la garantía de nuestra planta central en Navia y costura in situ.
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
                  Tintorería y Cuidado de Trajes
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Tratamiento específico según etiqueta para trajes de sastre, americanas, abrigos de paño, sedas, prendas delicadas y vestidos de ceremonia o fiesta.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Revisión previa de manchas y fibras en mostrador</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Planchado profesional con vapor y entrega en percha</span>
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
                  Edredones Nórdicos y Hogar
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Lavado en gran formato y secado completo anti-humedad para edredones de plumón natural y fibra sintética, mantas, colchas, cortinas y fundas desenfundables.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Secado controlado sin apelmazar el relleno</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Sin pedido mínimo y fácil bajada desde Parking Venezuela</span>
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
                Recepción de alfombras de lana, sintéticas, pelo largo o kilims en el centro de Vigo, con traslado seguro en furgón a nuestras instalaciones especializadas.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Higienización, lavado y secado controlado en planta</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Opción de envío a domicilio al terminar con Mimo</span>
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
                  Colada Familiar & Solo Planchado
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Servicio atendido para tu ropa de diario (lavar y doblar, lavar y planchar o modalidad combinada por prenda) y solo planchado de camisas en percha o dobladas.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>100% atendida por nuestro equipo, sin monedas</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Acabado de plancha sin brillos listo para armario</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 5: Plumíferos, Anoraks y Abrigos */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">
                  Plumíferos, Anoraks y Prendas de Abrigo
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Lavado cuidadoso de plumíferos, parkas, cazadoras técnicas y jerséis delicados lavables en agua en nuestra planta de Navia, devolviendo soltura al relleno.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Sin suavizantes que apelmazan el plumón natural</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Secado profundo frente a la humedad de Vigo</span>
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
                  Entrega a Domicilio en Vigo
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                ¿Dejas tus prendas en Rúa de Venezuela 29 aprovechando un recado en el centro y prefieres que te las acerquemos luego a casa o al despacho? Consúltalo con Mimo.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Franjas concertadas por WhatsApp con Mimo</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Muy cómodo para nórdicos, alfombras o varios trajes</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. INFORMACIÓN DE ENTREGA Y RECOGIDA */}
      <section aria-labelledby="seccion-plazos-venezuela" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-[#0F76BB]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                Planificación Real en Mostrador
              </span>
            </div>
            <h2 id="seccion-plazos-venezuela" className="text-lg sm:text-xl font-black text-[#002147] dark:text-white">
              Cómo Funcionan los Plazos y la Valoración en Mimos Venezuela
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Confirmación directa al revisar la prenda
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <p className="font-extrabold text-[#002147] dark:text-white">
              Costura y arreglos in situ
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Tomamos medidas en el probador de Rúa de Venezuela 29 y te confirmamos el día exacto de recogida en el resguardo según la complejidad del arreglo y la carga del taller.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <p className="font-extrabold text-[#002147] dark:text-white">
              Tintorería, lavandería y colada
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Revisamos cada etiqueta contigo en mostrador antes de cursar el encargo hacia nuestra planta de Navia. Para orientación previa o fechas límite, escríbenos por WhatsApp antes de venir.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1.5">
            <p className="font-extrabold text-[#002147] dark:text-white">
              Edredones y alfombras
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Plazos adaptados al secado completo sin humedad y al volumen de cada pieza. Sin pedido mínimo al entregar en mostrador y opción de envío a domicilio al finalizar.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CÓMO LLEGAR, ACCESO A ENTREPLANTA Y PARKING */}
      <section aria-labelledby="seccion-llegar-venezuela" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Navigation className="w-4 h-4 text-[#0F76BB]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
              Acceso y Aparcamiento en el Centro
            </span>
          </div>
          <h2 id="seccion-llegar-venezuela" className="text-xl sm:text-2xl font-black text-[#002147] dark:text-white">
            Cómo Llegar a Mimos Venezuela (Rúa de Venezuela, 29)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            En pleno Santiago de Vigo, entre Gran Vía y Rúa de Urzáiz, con aparcamiento público de pago justo enfrente del portal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tarjeta Parking Enfrente */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">Parking Justo Enfrente</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Justo enfrente de la tienda tienes el aparcamiento subterráneo de pago <strong>Parking Venezuela</strong> (Rúa de Venezuela, 34–36).
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Resulta muy práctico si vienes en coche con trajes, varios abrigos, edredones nórdicos o alfombras sin tener que buscar sitio por el centro.
            </p>
          </div>

          {/* Tarjeta Portal y Entreplanta */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                <Store className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">Portal nº 29 · Entreplanta</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Verás nuestro <strong>cartel azul «Tintorería Arreglos Mimos»</strong> en la acera señalando hacia el portal del nº 29 y la placa azul <strong>MIMOS</strong> junto a la entrada.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Sube a la entreplanta y accederás directamente a nuestro mostrador y taller de costura.
            </p>
          </div>

          {/* Tarjeta A Pie y Entorno Centro */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#002147] text-white flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">A Pie desde el Centro</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Situada en el tramo céntrico de Rúa de Venezuela, a pocos minutos caminando de <strong>El Corte Inglés, Gran Vía, Urzáiz y Príncipe</strong>.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Bien comunicada con paradas de autobús urbano Vitrasa en Gran Vía y Urzáiz.
            </p>
          </div>
        </div>

        {/* Banner CTA Google Maps */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#002147] text-white flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold">¿Quieres que tu navegador te guíe hasta el nº 29?</h4>
            <p className="text-xs text-blue-200">
              Coordenadas GPS: 42.233117, -8.720276 · Rúa de Venezuela, 29, Entreplanta, 36203 Vigo
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

      {/* 7. PREGUNTAS FRECUENTES (FAQ) DE LA TIENDA VENEZUELA */}
      <section aria-labelledby="seccion-faq-venezuela" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-[#0F76BB]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
            Respuestas Claras
          </span>
        </div>
        <h2 id="seccion-faq-venezuela" className="text-xl sm:text-2xl font-black text-[#002147] dark:text-white">
          Preguntas Frecuentes sobre Mimos Venezuela (Rúa de Venezuela, 29)
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Acceso a la entreplanta, horarios, formas de pago (sin Bizum), parking y taller de costura.
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

      {/* 8. CIERRE DE CONFIANZA Y CONTACTO */}
      <section aria-labelledby="seccion-confianza-venezuela" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-[#002147] text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-[#60B5F6] border border-white/15">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              Tienda propia Mimos en el centro de Vigo
            </span>
            <h2 id="seccion-confianza-venezuela" className="text-xl sm:text-2xl font-black text-white">
              Costura in situ y cuidado textil de confianza en Rúa de Venezuela, 29
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              En nuestra entreplanta de <strong>Rúa de Venezuela, 29</strong> combinamos taller propio de arreglos con la atención directa de Tintorería Mimos. Trae tu prenda, pruébate el largo en el acto o envíanos una foto por WhatsApp antes de desplazarte.
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
              href={`tel:+34${punto.telefono}`}
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl border border-white/20 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#60B5F6]" />
              <span>Llamar al {punto.telefonos_mostrados}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
