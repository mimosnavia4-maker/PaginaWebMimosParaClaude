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

interface PuntoTelasMasFichaProps {
  onNavigate?: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const PuntoTelasMasFicha: React.FC<PuntoTelasMasFichaProps> = ({
  onNavigate,
  isModal = false,
  onClose,
}) => {
  const punto: PuntoRegistro =
    REGISTROS_PUNTOS.find((p: PuntoRegistro) => p.id === 'punto-o-porrino') ||
    REGISTROS_PUNTOS[3];

  const [activeTabPhoto, setActiveTabPhoto] = useState<'fachada' | 'interior' | 'exterior'>('fachada');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);

  const photos = {
    fachada: {
      url: '/images/telas-mas/fachada2Porri.jpg',
      titulo: 'Fachada Principal y Rótulo Oficial',
      subtitulo: 'Rótulo comercial Telas y Más en Rúa Manuel Rodríguez, 30 (O Porriño).',
      tag: 'Fachada Principal',
      detalle: 'Entrada a cota cero en pleno centro comercial de O Porriño. Punto colaborador oficial de Tintorería Mimos con recepción directa de prendas.',
    },
    interior: {
      url: '/images/telas-mas/interiorPorri.jpg',
      titulo: 'Interior: Mostrador de Atención y Telas',
      subtitulo: 'Mostrador de recepción de prendas, amplia variedad de telas y taller propio de costura.',
      tag: 'Taller In Situ & Mostrador',
      detalle: 'Espacio especializado en confección y tejidos donde se revisan tus prendas y se coordinan los tratamientos con la central de Mimos en Vigo.',
    },
    exterior: {
      url: '/images/telas-mas/exterio1Porri.jpg',
      titulo: 'Perspectiva Exterior y Entrada Peatonal',
      subtitulo: 'Escaparate y acceso en la zona comercial céntrica de O Porriño.',
      tag: 'Acceso y Calle Comercial',
      detalle: 'Ubicación peatonal cómoda y accesible para dejar o recoger prendas en tus desplazamientos cotidianos por O Porriño sin desplazarte a Vigo.',
    },
  };

  const storeStatus = getStoreStatusById('punto-o-porrino');
  const whatsappUrl = buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero hacer una consulta sobre el punto colaborador de Telas y Más en O Porriño (Rúa Manuel Rodríguez, 30).'
  );
  const mapsUrl = buildGoogleMapsUrl(punto);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '/zonas/o-porrino');
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const toggleFaq = (index: number) => {
    setFaqAbierta(faqAbierta === index ? null : index);
  };

  const preguntasFrecuentes = [
    {
      q: '¿Cómo funciona la entrega de ropa para Tintorería Mimos en Telas y Más?',
      a: 'Llevas tus prendas (trajes, vestidos, abrigos, edredones, alfombras o colada) a Telas y Más en C/ Manuel Rodríguez, 30, O Porriño. Allí registran tu encargo con tus datos. El equipo logístico de Mimos recoge las prendas, las traslada a nuestras instalaciones centrales en Vigo para su tratamiento profesional y las devuelve listas y precintadas a Telas y Más para que las recojas cómodamente.',
    },
    {
      q: '¿Qué tipo de arreglos de costura se pueden solicitar en Telas y Más?',
      a: 'Telas y Más cuenta con taller propio de costura y arreglos in situ: subida y bajada de bajos en pantalones, faldas y abrigos, cambio y ajuste de cremalleras, ensanchar o estrechar prendas, ajustes de cintura, zurcidos y composturas en general. Además son especialistas en venta y corte de telas.',
    },
    {
      q: '¿Se pueden entregar edredones de plumas y alfombras grandes en este punto?',
      a: 'Sí. Telas y Más recibe textiles de gran volumen como edredones sintéticos y nórdicos de plumón natural, mantas, colchas y alfombras. Mimos se encarga del lavado especializado, desinfección térmica y secado controlado en nuestras instalaciones centrales de Vigo.',
    },
    {
      q: '¿Cuáles son los días y plazos habituales de entrega y recogida?',
      a: 'La recepción en Telas y Más está abierta de lunes a viernes (10:00-13:30 y 17:00-20:30) y sábados por la mañana (10:00-13:30). Los plazos varían según el tratamiento: las prendas habituales de tintorería suelen estar listas en pocos días, mientras que alfombras o prendas delicadas pueden requerir unos días adicionales. Puedes consultar el estado en cualquier momento por WhatsApp.',
    },
    {
      q: '¿Los precios de tintorería son los mismos que en las tiendas de Vigo?',
      a: 'Sí, las tarifas de los servicios de tintorería, lavandería y limpieza de textiles de Tintorería Mimos se mantienen en toda la red de puntos colaboradores, beneficiándote de los mismos precios de Vigo sin costes de desplazamiento.',
    },
    {
      q: '¿Puedo consultar dudas o presupuestos antes de llevar las prendas?',
      a: 'Por supuesto. Puedes escribirnos directamente por WhatsApp al 655 536 844 o llamar a la tienda Telas y Más al 605 02 76 52. Con una foto de la prenda o del arreglo te orientamos al instante.',
    },
    {
      q: 'Si después no puedo desplazarme a recogerlas, ¿podéis llevármelas a casa?',
      a: 'Sí. Si por cualquier motivo prefieres que te entreguemos tus prendas limpias en tu domicilio o lugar de trabajo en O Porriño o comarca, solo tienes que indicárnoslo por WhatsApp y coordinamos la entrega con nuestra furgoneta propia de reparto.',
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
            <span className="text-xs text-slate-400">Punto Colaborador Oficial Mimos · O Porriño</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold">{photos[activeTabPhoto].titulo}</h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">{photos[activeTabPhoto].subtitulo}</p>
          <p className="text-xs text-slate-400 mt-2 border-t border-slate-800 pt-2">
            {photos[activeTabPhoto].detalle}
          </p>
        </div>
      </Dialog>

      {/* 1. CABECERA HERO CON FOTOGRAFÍA REAL Y ACCIONES RÁPIDAS (ESTRUCTURA IDÉNTICA A GREGORIO ESPINO) */}
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
                onClick={() => setActiveTabPhoto('fachada')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'fachada'
                    ? 'bg-[#0F76BB] text-white border-[#60B5F6] shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>1. Fachada & Rótulo</span>
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
                <span>2. Mostrador & Telas</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('exterior')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'exterior'
                    ? 'bg-[#0F76BB] text-white border-[#60B5F6] shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>3. Exterior & Acceso</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Datos Operativos y Acciones Rápidas */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] uppercase tracking-wider">
                  Punto Colaborador Oficial · O Porriño
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
                Telas y Más (O Porriño)
              </h1>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                Punto Oficial Tintorería Mimos y Taller de Costura
              </p>

              <div className="mt-4 space-y-2 text-xs">
                <p className="text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                  <span>
                    <strong>Rúa Manuel Rodríguez, 30, bajo</strong>, 36400 O Porriño (Pontevedra).
                  </span>
                </p>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <Car className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Aparcamiento & Acceso:</strong> En pleno centro de O Porriño (zona peatonal y comercial). Aparcamientos públicos cercanos y parada breve en calles adyacentes para carga y descarga.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <Store className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5" />
                    <span>
                      <strong>Entorno:</strong> Eje comercial céntrico de O Porriño, a pocos minutos a pie de la Casa Consistorial y de la Plaza de Antonio Palacios.
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
                  <span>WhatsApp de Tienda</span>
                </a>

                <a
                  href="tel:+34605027652"
                  className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#001733] text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4 text-[#60B5F6] shrink-0" />
                  <span>Llamar: 605 02 76 52</span>
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
      <section aria-labelledby="seccion-ventajas" className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <h2 id="seccion-ventajas" className="sr-only">Ventajas y características de Telas y Más O Porriño</h2>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-[#0F76BB] flex items-center justify-center mb-3">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147] dark:text-white">Taller Propio In Situ</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Modistería y costura en la tienda con maquinaria para bajos express y composturas.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center mb-3">
            <Handshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147] dark:text-white">Punto Oficial Mimos</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Recepción oficial para tintorería, edredones y alfombras con traslado seguro a central.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147] dark:text-white">Aviso por WhatsApp</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Te notificamos en el acto cuando tus prendas pasen el control de calidad final.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-600 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147] dark:text-white">Garantía y Confianza</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Resguardo oficial numerado, trazabilidad de piezas y el cariño de la marca Mimos.
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
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">Lunes a Viernes</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Jornada completa partida</p>
                </div>
                <div className="text-right font-mono font-bold text-slate-900 dark:text-white">
                  <div>10:00 – 13:30</div>
                  <div>17:00 – 20:30</div>
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
                  <span className="font-medium">Domingos y Festivos</span>
                  <p className="text-[11px] text-slate-400">Descanso del personal</p>
                </div>
                <span className="font-bold text-slate-400">Cerrado</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <CreditCard className="w-4 h-4 text-[#0F76BB] shrink-0" />
              <span><strong>Cobro disponible:</strong> Tarjeta (Contactless / Apple Pay), Bizum y Efectivo.</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Resguardo oficial:</strong> Entrega con ticket de depósito garantizado.</span>
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
                    Maquinaria y profesionales de costura en la propia tienda de Telas y Más
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-[#0F76BB] text-white">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Servicio Express
              </span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              En <strong>Telas y Más (O Porriño)</strong> dispones de una ventaja única: taller propio in situ de costura y composturas, con probador y toma de medidas directa, combinado con el servicio integral de tintorería y lavandería de Mimos sin necesidad de viajar a Vigo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { tit: 'Bajos de pantalón express', desc: 'Vaquero (acabado original), traje (invisible) o casual con rapidez.' },
                { tit: 'Cambio de cremalleras', desc: 'Metálicas, espiral e invisibles en abrigos, chaquetas, faldas y anoraks.' },
                { tit: 'Ajuste de vestidos y trajes', desc: 'Entallar silueta, estrechar costados, subir tirantes y ajustar hombros.' },
                { tit: 'Venta experta de telas', desc: 'Amplio catálogo de telas por metros, retales y asesoramiento en costura.' },
                { tit: 'Cortinas, estores y hogar', desc: 'Confección a medida, corte de altura, cinta fruncidora y dobladillos.' },
                { tit: 'Zurcidos y composturas', desc: 'Reparación de descosidos, rotos, botones, corchetes y refuerzos.' },
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
                ¿Quieres ver todas las prendas y soluciones de costura?
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
            <span className="text-xs font-bold text-slate-500">100% Confirmado en O Porriño</span>
          </div>
          <h2 id="seccion-servicios" className="text-xl sm:text-2xl font-black text-[#002147] dark:text-white tracking-tight">
            Todos los Servicios de Tintorería y Lavandería en Telas y Más
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl mt-1">
            Recepción directa en mostrador para particulares, familias, profesionales y empresas de O Porriño y comarca de A Louriña. Sin esperas y con asesoramiento técnico personalizado.
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
                Tratamiento especializado para trajes de caballero y sastre, americanas, abrigos de paño, lanas nobles, gabardinas y vestidos de fiesta, comunión y novias con pedrería delicada.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Desmanchado artesanal previo a mano en central</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Planchado con prensa de vapor y entrega en percha</span>
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
                Lavado e higienización térmica de edredones de plumón, pluma natural y fibras sintéticas. Secado controlado para devolver el volumen mullido original sin apelmazar el relleno.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Tratamiento bactericida y antiácaros higiénico</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Opción de envasado al vacío para guardar en armario</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 3: Alfombras Grandes y Delicadas */}
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
                Recepción directa de alfombras de lana, seda, fibras sintéticas, pelo largo y kilims. Medición exacta en el mostrador y traslado seguro a nuestra central de lavado especializada.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Desempolvado mecánico profundo y lavado plano</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Dejas tu alfombra en O Porriño sin desplazarte a Vigo</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 4: Colada y Planchado Semanal */}
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
                Ahorra tiempo semanal con nuestro servicio por kilos para ropa de uso diario, toallas y sábanas. Planchado profesional de camisas con cuello y puño perfecto.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Camisas en percha con funda o dobladas para viaje</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Coladas higienizadas con detergentes dermatológicos</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 5: Costura, Telas y Arreglos */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center">
                  <Scissors className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">
                  Taller de Modistería & Costura
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Servicio directo de arreglos en la propia tienda de O Porriño: bajos de pantalón, cremalleras, composturas, arreglos de trajes y venta de tejidos y telas al corte.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Toma de medidas in situ y probador en tienda</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Arreglos rápidos y acabado profesional garantizado</span>
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
                ¿Prefieres dejar tus prendas en Telas y Más pero que te las llevemos a casa cuando estén listas? Podemos coordinar la entrega en cualquier dirección de O Porriño o Vigo con nuestro furgón.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Franjas horarias concertadas por WhatsApp</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Ideal para alfombras o lotes de ropa de invierno</span>
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
              Plazos Orientativos de Entrega en Telas y Más (O Porriño)
            </h2>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Aviso instantáneo por WhatsApp / SMS al terminar
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
                  Taller de costura in situ en Telas y Más.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                  Trajes de chaqueta, americanas y vestidos
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold">48 a 72 horas</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    24h a 48h bajo consulta
                  </span>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Desmanchado a mano y planchado artesanal en central.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                  Edredones nórdicos y mantas de invierno
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold">3 a 5 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-400">Según carga de secado</td>
                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Secado lento para esponjar plumón natural.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                  Limpieza y restauración de alfombras
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold">7 a 10 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-400">No aplicable</td>
                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Desempolvado, lavado e higienizado completo.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                  Cremalleras y composturas complejas
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold">3 a 5 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-400">Consultar en mostrador</td>
                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Prueba de ajuste si es necesario.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                  Prendas de piel, cuero, ante y peletería
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold">10 a 15 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-400">Tratamiento artesanal</td>
                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Nutrición, teñido selectivo y secado especial.
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
            Cómo Llegar a Telas y Más en O Porriño
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ubicación céntrica en Rúa Manuel Rodríguez, 30, en el corazón comercial de O Porriño, con accesos sencillos tanto a pie como en vehículo o transporte interurbano.
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
              Dispones de aparcamientos públicos y zonas de estacionamiento en el entorno comercial del centro urbano de O Porriño.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Ideal para acercar alfombras o lotes de ropa con paradas breves de carga y descarga en vías adyacentes.
            </p>
          </div>

          {/* Tarjeta Autobús y Tren */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                <Bus className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">En Autobús y Tren</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Líneas regulares de autobús interurbano que conectan Vigo, Mos, Tui y Salceda con el centro de O Porriño.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Estación de tren de O Porriño y paradas de bus a escasos 5-6 minutos caminando.
            </p>
          </div>

          {/* Tarjeta A Pie por el Centro Peatonal */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#002147] text-white flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">A Pie por el Centro</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              En plena <strong>Rúa Manuel Rodríguez</strong>, la arteria peatonal y comercial más viva de O Porriño.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Entrada sin barreras arquitectónicas a cota cero, accesible con carritos de compra o personas con movilidad reducida.
            </p>
          </div>
        </div>

        {/* Banner CTA Google Maps */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#002147] text-white flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold">¿Quieres que tu navegador te guíe hasta la puerta?</h4>
            <p className="text-xs text-blue-200">
              Coordenadas GPS: 42.15916, -8.621138 · Rúa Manuel Rodríguez, 30, O Porriño
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

      {/* 7. PREGUNTAS FRECUENTES (FAQ) DE TELAS Y MÁS */}
      <section aria-labelledby="seccion-faq" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-[#0F76BB]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
            Respuestas Claras
          </span>
        </div>
        <h2 id="seccion-faq" className="text-xl sm:text-2xl font-black text-[#002147] dark:text-white">
          Preguntas Frecuentes sobre el Punto Telas y Más en O Porriño
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Todo lo que necesitas saber antes de entregar tus prendas o encargar arreglos de costura.
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
              La tecnología de Mimos con la atención cercana de Telas y Más
            </span>
            <h2 id="seccion-confianza" className="text-xl sm:text-2xl font-black text-white">
              Cuidado textil profesional y taller de costura en O Porriño
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              En Telas y Más (Rúa Manuel Rodríguez, 30) dispones de la experiencia combinada de modistería in situ y los procesos de tintorería e higienización más avanzados de Galicia, sin necesidad de desplazarte a Vigo.
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
              href="tel:+34605027652"
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl border border-white/20 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#60B5F6]" />
              <span>Llamar al 605 02 76 52</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
