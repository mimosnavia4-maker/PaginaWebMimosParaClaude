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
} from 'lucide-react';
import {
  REGISTROS_PUNTOS,
  PuntoRegistro,
  buildGoogleMapsUrl,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { getStoreStatusById } from '../utils/storeStatus';

interface TiendaGregorioEspinoFichaProps {
  onNavigate?: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const TiendaGregorioEspinoFicha: React.FC<TiendaGregorioEspinoFichaProps> = ({
  onNavigate,
  isModal = false,
  onClose,
}) => {
  const punto: PuntoRegistro =
    REGISTROS_PUNTOS.find((p: PuntoRegistro) => p.id === 'gregorio-espino') ||
    REGISTROS_PUNTOS[1];

  const [activeTabPhoto, setActiveTabPhoto] = useState<'fachada' | 'interior' | 'esquina'>('fachada');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);

  const photos = {
    fachada: {
      url: '/images/gregorio-espino/fachada.jpg',
      titulo: 'Fachada Principal y Rótulo Mimos',
      subtitulo: 'Rótulo azul distintivo Tintorería Lavandería Mimos, toldos amarillos y escaparate luminoso en Gregorio Espino 44.',
      tag: 'Fachada Principal',
      detalle: 'Entrada a cota cero sin barreras arquitectónicas, con visibilidad completa desde la acera ajardinada de Alcalde Gregorio Espino.',
    },
    interior: {
      url: '/images/gregorio-espino/interior.jpg',
      titulo: 'Interior: Mostrador de Atención y Oso Mimos',
      subtitulo: 'Mostrador de recepción de prendas, taller de costura in situ y nuestra entrañable mascota Mimos presidiendo la tienda.',
      tag: 'Taller In Situ & Mostrador',
      detalle: 'Espacio acondicionado para atención personalizada, depósito y revisión cuidadosa de tejidos, y entrega en percha protegida.',
    },
    esquina: {
      url: '/images/gregorio-espino/fachada2.jpg',
      titulo: 'Esquina Rúa do Escultor Nogueira',
      subtitulo: 'Perspectiva de la esquina con Escultor Nogueira y acceso directo a la zona de carga y descarga de vehículos.',
      tag: 'Acceso y Carga/Descarga',
      detalle: 'Ubicación ideal para detener el coche unos minutos para dejar alfombras, edredones voluminosos o lotes familiares.',
    },
  };

  const storeStatus = getStoreStatusById('gregorio-espino');
  const whatsappUrl = buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero hacer una consulta sobre la tienda propia de Gregorio Espino (Alcalde Gregorio Espino, 44, Vigo).'
  );
  const mapsUrl = buildGoogleMapsUrl(punto);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '/tienda-mimos-gregorio-espino-vigo');
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const toggleFaq = (index: number) => {
    setFaqAbierta(faqAbierta === index ? null : index);
  };

  const preguntasFrecuentes = [
    {
      q: '¿Tengo que pedir cita previa para llevar prendas a arreglar o limpiar?',
      a: 'No, no hace falta cita previa en ningún momento. Puedes acudir libremente en nuestro horario de apertura (lunes a viernes de 09:30 a 13:30 y de 16:30 a 20:00, y sábados de 09:30 a 13:00). Te atenderemos directamente en el mostrador.',
    },
    {
      q: '¿Se pueden probar las prendas en la tienda para tomar la medida del bajo?',
      a: 'Sí, por supuesto. Disponemos de espacio para que puedas probarte pantalones, faldas, vestidos o chaquetas, y nuestra modista tomará la medida exacta con alfileres según tus indicaciones y el calzado que vayas a utilizar.',
    },
    {
      q: '¿Puedo entregar alfombras grandes viniendo en coche?',
      a: 'Sí, es una de las mayores comodidades de esta tienda. Justo en la bocacalle lateral de Rúa do Escultor Nogueira dispones de zona de carga y descarga a pocos metros de la puerta. Si nos avisas al llegar, nuestro personal te ayuda a bajarlas del vehículo.',
    },
    {
      q: '¿Disponéis de servicio de arreglos express o urgentes?',
      a: 'Sí, para arreglos sencillos como bajos de pantalón o cremalleras comunes podemos ofrecer plazo express en el mismo día o en 24 horas según el volumen de trabajo del taller en ese momento.',
    },
    {
      q: '¿Cómo me notificáis cuando las prendas están listas para recoger?',
      a: 'Te enviamos un aviso personalizado por WhatsApp o SMS en el mismo instante en que la prenda sale planchada y revisada por nuestro control de calidad. Así evitas viajes innecesarios.',
    },
    {
      q: '¿Qué métodos de pago aceptáis en la tienda de Gregorio Espino?',
      a: 'Aceptamos pago con tarjeta de crédito/débito (contactless, Apple Pay, Google Pay), Bizum para mayor agilidad y dinero en efectivo. Entregamos siempre resguardo oficial con IVA desglosado.',
    },
    {
      q: 'Si después no puedo desplazarme a recogerlas, ¿podéis llevármelas a casa?',
      a: 'Sí. Si por cualquier motivo prefieres que te entreguemos tus prendas limpias en tu domicilio o lugar de trabajo en Vigo, solo tienes que indicárnoslo por WhatsApp y coordinamos la entrega con nuestra furgoneta propia de reparto.',
    },
  ];

  return (
    <div className="space-y-10 animate-fadeIn text-slate-800 dark:text-slate-100">
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
                <span className="text-xs text-slate-400">Tienda Propia Mimos · Vigo</span>
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
                <span>2. Mostrador & Mascota</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('esquina')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'esquina'
                    ? 'bg-[#0F76BB] text-white border-[#60B5F6] shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>3. Esquina Escultor Nogueira</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Datos Operativos y Acciones Rápidas */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] uppercase tracking-wider">
                  Sede O Calvario / Gregorio Espino
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
                Mimos Gregorio Espino
              </h1>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                Tintorería, Lavandería y Taller Propio de Costura
              </p>

              <div className="mt-4 space-y-2 text-xs">
                <p className="text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                  <span>
                    <strong>Rúa do Alcalde Gregorio Espino, 44, bajo</strong> (esquina con Rúa do Escultor Nogueira), 36205 Vigo (Pontevedra).
                  </span>
                </p>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <Car className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Aparcamiento & Descarga:</strong> Zona reservada de carga y descarga justo en la esquina de Escultor Nogueira (a 15 metros). Estacionamiento en batería en calles colindantes.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <Store className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5" />
                    <span>
                      <strong>Entorno:</strong> Frente al paseo peatonal ajardinado de Gregorio Espino, a 4 minutos a pie de la peatonal del Calvario.
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
                  href="tel:+34986192787"
                  className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#001733] text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md transition-all active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4 text-[#60B5F6] shrink-0" />
                  <span>Llamar: 986 19 27 87</span>
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
        <h2 id="seccion-ventajas" className="sr-only">Ventajas y características de Mimos Gregorio Espino</h2>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-[#0F76BB] flex items-center justify-center mb-3">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147] dark:text-white">Taller Propio In Situ</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Modista en tienda con maquinaria industrial para arreglos express y marcaje directo.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center mb-3">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147] dark:text-white">Carga & Descarga Fácil</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Zona reservada a 15 metros en Escultor Nogueira para alfombras o bultos pesados.
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
                  <div>09:30 – 13:30</div>
                  <div>16:30 – 20:00</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-slate-800 dark:text-slate-200">Sábados</span>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Mañanas</p>
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  09:30 – 13:00
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
                    Maquinaria industrial y modista en la propia tienda de Gregorio Espino
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-[#0F76BB] text-white">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Servicio Express
              </span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              A diferencia de puntos que derivan prendas fuera, en <strong>Mimos Gregorio Espino</strong> disponemos de probador para tomar medidas al momento y taller directo de confección. Te atendemos para cualquier reparación, transformación o ajuste a medida.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { tit: 'Bajos de pantalón express', desc: 'Vaquero (acabado original), traje (invisible) o deportivo en 24h.' },
                { tit: 'Cambio de cremalleras', desc: 'Metálicas, espiral e invisibles en abrigos, faldas, anoraks y mochilas.' },
                { tit: 'Ajuste de vestidos y trajes', desc: 'Entallar silueta, estrechar costados, subir tirantes y ajustar hombros.' },
                { tit: 'Especialistas en cuero y piel', desc: 'Costura reforzada en ante, cuero, cazadoras moteras y bolsos.' },
                { tit: 'Cortinas, estores y hogar', desc: 'Confección a medida, corte de altura, cinta fruncidora y dobladillos.' },
                { tit: 'Bordados y personalización', desc: 'Nombres en babis escolares, toallas, batas y uniformes laborales.' },
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

      {/* 4. GUÍA COMPLETA DE SERVICIOS DISPONIBLES EN ESTA TIENDA */}
      <section aria-labelledby="seccion-servicios" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-blue-100 dark:bg-blue-950 text-[#0F76BB] dark:text-[#60B5F6]">
              Catálogo de Mostrador
            </span>
            <span className="text-xs font-bold text-slate-500">100% Confirmado en Gregorio Espino</span>
          </div>
          <h2 id="seccion-servicios" className="text-xl sm:text-2xl font-black text-[#002147] dark:text-white tracking-tight">
            Todos los Servicios de Tintorería y Lavandería en la Tienda
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl mt-1">
            Recepción directa en mostrador para particulares, familias, profesionales y empresas. Sin esperas y con asesoramiento técnico personalizado.
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
                <span>Desmanchado artesanal previo a mano</span>
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
                <span>Carga y descarga en Escultor Nogueira para tu comodidad</span>
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

          {/* Tarjeta 5: Prendas de Piel, Ante y Cuero */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-700 text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">
                  Piel, Cuero y Ante Noble
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Nutrición y reengrase de cazadoras de cuero, abrigos de mouton, ante y serraje. Reparación de desgarros y tintura selectiva para recuperar el color y la flexibilidad natural.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Peletería artesana con productos libres de solventes agresivos</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Tratamiento hidrófugo antimanchas opcional</span>
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
                ¿Prefieres dejar tus prendas en Gregorio Espino pero que te las llevemos a casa cuando estén listas? Podemos coordinar la entrega en cualquier dirección de Vigo con nuestro furgón.
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
              Plazos Orientativos de Entrega en Gregorio Espino
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
                  Taller in situ en la propia tienda.
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
                  Desmanchado a mano y planchado artesanal.
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
                  Cremalleras y arreglos complejos de sastre
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
            Cómo Llegar a Mimos Gregorio Espino en Vigo
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ubicación céntrica entre Martínez Garrido y la peatonal del Calvario con accesos sencillos tanto a pie como en coche o transporte público.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tarjeta Coche y Carga/Descarga */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">En Coche Particular</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Dispones de una <strong>zona de carga y descarga</strong> autorizada en Rúa do Escultor Nogueira, justo al doblar la esquina de la tienda.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Ideal si traes edredones o alfombras: paras a 15 metros de la entrada y nuestro equipo te ayuda a descargar.
            </p>
          </div>

          {/* Tarjeta Autobús Vitrasa */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                <Bus className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">En Autobús Urbano (Vitrasa)</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Líneas con parada inmediata en Gregorio Espino o Martínez Garrido:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['L4A', 'L4C', 'L11', 'L15A', 'L23', 'H2'].map((linea) => (
                <span key={linea} className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white">
                  {linea}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Parada a menos de 2 minutos caminando del portal 44.
            </p>
          </div>

          {/* Tarjeta A Pie desde O Calvario */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#002147] text-white flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">A Pie desde O Calvario</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A escasos <strong>300 metros de la peatonal del Calvario</strong> y del Mercado Municipal de O Calvario.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Acera amplia y llana con paseo arbolado frente al escaparate, con acceso fácil para carritos de bebé o personas de movilidad reducida.
            </p>
          </div>
        </div>

        {/* Banner CTA Google Maps */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#002147] text-white flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold">¿Quieres que tu navegador te guíe hasta la puerta?</h4>
            <p className="text-xs text-blue-200">
              Coordenadas GPS: 42.22836, -8.707589 · Alcalde Gregorio Espino, 44, Vigo
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

      {/* 7. PREGUNTAS FRECUENTES (FAQ) DE LA TIENDA GREGORIO ESPINO */}
      <section aria-labelledby="seccion-faq" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-[#0F76BB]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
            Respuestas Claras
          </span>
        </div>
        <h2 id="seccion-faq" className="text-xl sm:text-2xl font-black text-[#002147] dark:text-white">
          Preguntas Frecuentes sobre la Tienda de Gregorio Espino
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Todo lo que necesitas saber antes de venir o entregar tus prendas.
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

      {/* 8. EL OSO MIMOS Y ATENCIÓN CERCANA DE CONFIANZA */}
      <section aria-labelledby="seccion-confianza" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-[#002147] text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-[#60B5F6] border border-white/15">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              Más de 15 años cuidando los textiles de Vigo
            </span>
            <h2 id="seccion-confianza" className="text-xl sm:text-2xl font-black text-white">
              Cuidado profesional con el trato cercano de toda la vida
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              En nuestra tienda de Alcalde Gregorio Espino 44 no eres un número de orden. Nuestro equipo y nuestra mascota, el <strong>Oso Mimos</strong>, te reciben en mostrador para asesorarte sobre cómo quitar esa mancha difícil, coger el bajo justo a tu medida o renovar tus edredones y alfombras para el invierno.
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
              href="tel:+34986192787"
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl border border-white/20 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#60B5F6]" />
              <span>Llamar al 986 19 27 87</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
