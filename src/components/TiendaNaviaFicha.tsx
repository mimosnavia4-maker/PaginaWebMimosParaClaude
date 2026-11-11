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
  Building2,
} from 'lucide-react';
import {
  REGISTROS_PUNTOS,
  PuntoRegistro,
  buildGoogleMapsUrl,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { getStoreStatusById } from '../utils/storeStatus';

interface TiendaNaviaFichaProps {
  onNavigate?: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const TiendaNaviaFicha: React.FC<TiendaNaviaFichaProps> = ({
  onNavigate,
  isModal = false,
  onClose,
}) => {
  const punto: PuntoRegistro =
    REGISTROS_PUNTOS.find((p: PuntoRegistro) => p.id === 'as-teixugueiras') ||
    REGISTROS_PUNTOS[0];

  const [activeTabPhoto, setActiveTabPhoto] = useState<'fachada' | 'mostrador' | 'planta'>('fachada');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);

  const photos = {
    fachada: {
      url: '/images/navia/fachada-mimos-navia-vigo.jpg',
      titulo: 'Fachada Principal y Acceso en Teixugueiras',
      subtitulo: 'Rótulo azul distintivo Tintorería Lavandería Mimos Navia sobre fachada cerámica roja en Rúa das Teixugueiras 11, bajo 9.',
      tag: '1 Exterior · Fachada & Rótulo',
      detalle: 'Entrada a cota cero en bulevar peatonal accesible, sin barreras arquitectónicas y con amplia visibilidad comercial.',
    },
    mostrador: {
      url: '/images/navia/mostrador-recepcion-mimos-navia-vigo.jpg',
      titulo: 'Interior: Mostrador de Atención y Recepción Personalizada',
      subtitulo: 'Zona de atención donde revisamos cada prenda, tomamos notas de desmanchado y gestionamos la entrega en percha protegida.',
      tag: '2 Interior · Mostrador de Atención',
      detalle: 'Mostrador técnico con personal uniformado de Tintorería Mimos, clasificación cuidada por tipo de tejido y control riguroso de cada encargo.',
    },
    planta: {
      url: '/images/navia/planta-planchado-mimos-navia-vigo.jpg',
      titulo: 'Interior: Centro Operativo de Planchado y Tratamiento',
      subtitulo: 'Puestos profesionales de planchado por vapor, aspiración técnica y acabado artesanal para trajes, camisas y vestidos.',
      tag: '3 Interior · Centro de Planchado',
      detalle: 'Instalaciones industriales acondicionadas con prensas de vapor, iluminación cenital y operarias expertas de Tintorería Mimos.',
    },
  };

  const storeStatus = getStoreStatusById('as-teixugueiras');
  const whatsappUrl = buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero hacer una consulta sobre la sede central de Navia (C/ Teixugueiras, 11, bajo 9, Vigo).'
  );
  const mapsUrl = buildGoogleMapsUrl(punto);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.origin + '/tienda-mimos-navia-vigo');
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const toggleFaq = (index: number) => {
    setFaqAbierta(faqAbierta === index ? null : index);
  };

  const preguntasFrecuentes = [
    {
      q: '¿Tengo que pedir cita previa para acudir a la tienda de Navia?',
      a: 'No, no necesitas cita previa. Puedes venir libremente dentro de nuestro horario habitual (lunes a viernes de 09:30 a 14:00 y de 16:00 a 20:00, y sábados de 10:00 a 13:30). Te atendemos directamente en el mostrador.',
    },
    {
      q: '¿Cómo funciona el servicio de arreglos y costura en la tienda de Navia?',
      a: 'En Navia recepcionamos tus prendas de vestir (bajos de pantalón, cremalleras, composturas, estrechar, etc.) y tomamos nota de todas las especificaciones. Las prendas se trasladan a nuestros talleres propios de costura in situ (en Gregorio Espino y Venezuela) y te las entregamos de vuelta en Navia perfectamente planchadas y terminadas.',
    },
    {
      q: '¿Se puede aparcar fácilmente cerca de la tienda en Teixugueiras?',
      a: 'Sí, Rúa das Teixugueiras dispone de un amplio bulevar con numerosas plazas de aparcamiento público en batería y en línea justo frente a la manzana de soportales. Puedes detenerte cómodamente para bajar o subir alfombras, mantas o lotes voluminosos de ropa.',
    },
    {
      q: '¿Puedo entregar alfombras grandes de lana o seda en la tienda de Navia?',
      a: 'Por supuesto. La sede de Navia es punto central de recepción de alfombras. Medimos tu alfombra en el mostrador, revisamos el estado de las fibras y la procesamos con lavado plano, desinfección y secado en ambiente controlado.',
    },
    {
      q: '¿Cómo me avisáis cuando la ropa está lista para recoger?',
      a: 'Te notificamos de forma automática por WhatsApp o SMS en cuanto tus prendas salen de la sección de planchado y pasan nuestro control de calidad. Así no realizas ningún desplazamiento innecesario.',
    },
    {
      q: '¿Qué formas de pago tenéis disponibles en el mostrador de Navia?',
      a: 'Aceptamos tarjeta de débito y crédito (contactless, móvil, Apple Pay, Google Pay), Bizum y dinero en efectivo. Entregamos siempre justificante y ticket oficial con IVA desglosado.',
    },
    {
      q: '¿Puedo pedir que me entreguen en mi casa las prendas que dejé en Navia?',
      a: 'Sí. Navia coordina además nuestra flota propia de reparto a domicilio en Vigo y comarca. Si después prefieres recibir tus prendas, colada o alfombras directamente en tu casa u oficina, puedes solicitárnoslo por WhatsApp y acordamos la franja de entrega.',
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
            <span className="text-xs text-slate-400">Sede Central Mimos · Navia, Vigo</span>
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
          {/* Columna Izquierda: Galería Interactiva con Fotos Reales (1 exterior, 2 interior) */}
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
                  <Building2 className="w-3.5 h-3.5 text-[#60B5F6]" />
                  Sede Central Mimos · Navia
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#0F76BB] text-white shadow-md">
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

            {/* Selector de Fotografías en Miniatura (1 Exterior + 2 Interior) */}
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
                <span>1. Exterior Fachada</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('mostrador')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'mostrador'
                    ? 'bg-[#0F76BB] text-white border-[#60B5F6] shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>2. Interior Mostrador</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('planta')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'planta'
                    ? 'bg-[#0F76BB] text-white border-[#60B5F6] shadow-sm'
                    : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                }`}
              >
                <span>3. Interior Centro Planchado</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Datos Operativos y Acciones Rápidas */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] uppercase tracking-wider">
                  Sede Central & Domicilio Social
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

              {isModal ? (
                <h2
                  id="modal-ficha-titulo"
                  className="text-2xl sm:text-3xl font-black text-[#002147] dark:text-white tracking-tight"
                >
                  Tintorería Mimos Navia
                </h2>
              ) : (
                <h1 className="text-2xl sm:text-3xl font-black text-[#002147] dark:text-white tracking-tight">
                  Tintorería Mimos Navia (Sede Central)
                </h1>
              )}
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                Tintorería, Lavandería, Planchado y Centro de Operaciones en Vigo
              </p>

              <div className="mt-4 space-y-2 text-xs">
                <p className="text-slate-700 dark:text-slate-300 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                  <span>
                    <strong>C/ Teixugueiras, 11, bajo 9</strong>, 36212 Vigo (Pontevedra).
                  </span>
                </p>

                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                  <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <Car className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Aparcamiento cómodo:</strong> Amplias plazas de estacionamiento en batería a lo largo del bulevar de Teixugueiras frente a los soportales para carga rápida de prendas y alfombras.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                    <Store className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5" />
                    <span>
                      <strong>Entorno:</strong> En el bulevar principal de Navia, con acceso a cota cero sin barreras arquitectónicas y rodeado de servicios de proximidad.
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
                  <span>WhatsApp de Navia</span>
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
                  title="Copiar enlace directo de la tienda de Navia"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#0F76BB]" />
                  <span className="hidden sm:inline">{copiedShare ? '¡Copiado!' : 'Compartir'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PUNTOS FUERTES Y VALORES DIFERENCIALES DE LA SEDE CENTRAL */}
      <section aria-labelledby="seccion-ventajas-navia" className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <h2 id="seccion-ventajas-navia" className="sr-only">Ventajas y características de Mimos Navia</h2>
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/70 text-[#0F76BB] flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147] dark:text-white">Sede Central Mimos</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Planta operativa de planchado, desmanchado y coordinación logística de Vigo.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 flex items-center justify-center mb-3">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147] dark:text-white">Aparcamiento en Bulevar</h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Fácil parada en batería a pocos metros de la entrada para dejar o cargar prendas.
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
              Notificación automática al instante en cuanto tu encargo esté listo y empaquetado.
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
              Ticket oficial de depósito numerado y el cuidado minucioso de nuestro equipo.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HORARIO DETALLADO Y GESTIÓN DE COSTURA CON TALLER PROPIO */}
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
                    Horario de Atención en Navia
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
                  <div>09:30 – 14:00</div>
                  <div>16:00 – 20:00</div>
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
              <span><strong>Cobro disponible:</strong> Tarjeta (Contactless / Apple Pay / Google Pay), Bizum y Efectivo.</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Resguardo oficial:</strong> Entrega con ticket de depósito con desglose e IVA.</span>
            </div>
          </div>
        </div>

        {/* Bloque 2: Gestión Centralizada de Costura y Arreglos */}
        <div className="lg:col-span-7 bg-gradient-to-br from-blue-50/70 to-indigo-50/40 dark:from-slate-900 dark:to-blue-950/30 rounded-3xl p-6 sm:p-7 border border-blue-200/80 dark:border-blue-900/40 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#002147] text-[#60B5F6] flex items-center justify-center">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#002147] dark:text-white">
                    Recepción de Costura y Arreglos de Ropa
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Depósito en Navia coordinado con nuestros talleres propios in situ
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-[#0F76BB] text-white">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Confección Propia
              </span>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
              En la <strong>tienda de Navia</strong> recibimos tus prendas para arreglos, tomamos nota precisa de tus indicaciones y las derivamos a nuestros talleres propios de costura in situ (en Gregorio Espino y Venezuela) para su confección profesional. Te las entregamos de vuelta en Navia limpias, ajustadas y perfectamente planchadas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { tit: 'Bajos de pantalón', desc: 'Vaquero con remate original, traje con puntada invisible o bajo deportivo.' },
                { tit: 'Cambio de cremalleras', desc: 'Sustitución de cremalleras en anoraks, chaquetones, vestidos y faldas.' },
                { tit: 'Ajuste de cinturas y tallas', desc: 'Estrechar y ensanchar pantalones, faldas, americanas y camisas.' },
                { tit: 'Zurcidos y reparaciones', desc: 'Reparación de descosidos, roturas en costuras y refuerzo de forros.' },
                { tit: 'Prendas de fiesta y ceremonia', desc: 'Ajustes en vestidos delicados, tirantes y dobladillos finos.' },
                { tit: 'Planchado final artesanal', desc: 'Cada prenda arreglada se entrega planchada a vapor en percha.' },
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
                ¿Buscas una tienda con modista y probador in situ en el acto?
              </span>
              <a
                href="/tienda-mimos-gregorio-espino-vigo"
                onClick={(e) => onNavigate('/tienda-mimos-gregorio-espino-vigo', e)}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
              >
                <span>Visitar Mimos Gregorio Espino (Taller In Situ)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 4. GUÍA COMPLETA DE SERVICIOS DISPONIBLES EN LA SEDE DE NAVIA */}
      <section aria-labelledby="seccion-servicios-navia" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-black bg-blue-100 dark:bg-blue-950 text-[#0F76BB] dark:text-[#60B5F6]">
              Catálogo de Sede Central
            </span>
            <span className="text-xs font-bold text-slate-500">100% Confirmado en Navia</span>
          </div>
          <h2 id="seccion-servicios-navia" className="text-xl sm:text-2xl font-black text-[#002147] dark:text-white tracking-tight">
            Todos los Servicios de Tintorería y Lavandería en Navia
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-3xl mt-1">
            Recepción directa en mostrador para particulares, familias, profesionales y empresas del área de Navia, Samil, Alcabre, Coia y todo Vigo.
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
                Tratamiento técnico especializado para trajes, americanas, abrigos de paño, prendas de lana noble, gabardinas y vestidos de ceremonia o comunión.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Desmanchado manual prenda a prenda</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Planchado por vapor y entrega en percha protegida</span>
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
                Higienización térmica de edredones de plumón, plumas y fibras sintéticas. Secado controlado para devolver el volumen mullido sin apelmazar el relleno interior.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Tratamiento higiénico antiácaros y bactericida</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Opción de envasado al vacío para guardar en casa</span>
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
                  Punto Central de Alfombras
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Recepción directa de alfombras de lana, seda, pelo largo y kilims. Medición exacta en mostrador y proceso de lavado plano en nuestras instalaciones.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Aspirado mecánico profundo y desinfección</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Aparcamiento en Teixugueiras para descargar fácilmente</span>
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
                  Colada Familiar y Camisas por Kilos
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ahorra horas cada semana delegando la colada diaria, toallas y sábanas. Planchado artesanal de camisas con cuellos y puños impecables.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Camisas en percha con funda o dobladas para viaje</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Detergentes de alta tolerancia dermatológica</span>
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
                  Piel, Cuero y Ante
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Limpieza, nutrición y reengrase de cazadoras de piel, chaquetones de ante, serraje y piezas de peletería. Recuperación de flexibilidad y color natural.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Tratamientos artesanos respetuosos con el cuero</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Tratamiento hidrófugo antimanchas disponible</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 6: Coordinación y Logística a Domicilio */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">
                  Base de Recogida y Entrega a Domicilio
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Desde Navia coordinamos nuestras rutas de reparto a domicilio para Vigo y comarca (pedido mínimo 30 €). Puedes pedir recogida o entrega en tu casa por WhatsApp o en la web.
              </p>
            </div>
            <ul className="text-xs text-slate-500 dark:text-slate-400 space-y-1 border-t border-slate-200 dark:border-slate-700 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Franjas acordadas previamente por WhatsApp</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Ideal para alfombras grandes o lotes familiares</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. TABLA DE TIEMPOS Y PLAZOS ORIENTATIVOS DE ENTREGA EN NAVIA */}
      <section aria-labelledby="seccion-plazos-navia" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-[#0F76BB]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                Planificación Transparente
              </span>
            </div>
            <h2 id="seccion-plazos-navia" className="text-lg sm:text-xl font-black text-[#002147] dark:text-white">
              Plazos Orientativos de Entrega en Navia
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
                <th className="py-3 px-3">Aviso al Cliente</th>
                <th className="py-3 px-3">Detalle Operativo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                  Coladas familiares y camisas semanales
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold">24 a 48 horas</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    Aviso automático
                  </span>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Lavado, secado y planchado artesanal.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                  Trajes de sastre, americanas y vestidos
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold">48 a 72 horas</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    Vía WhatsApp / SMS
                  </span>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Desmanchado manual y prensa de vapor.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                  Edredones nórdicos y mantas de cama
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold">3 a 5 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-500">Vía WhatsApp</td>
                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Secado progresivo para esponjar el plumón.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                  Limpieza y restauración de alfombras
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold">7 a 10 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-500">Vía WhatsApp</td>
                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Lavado en plano y desinfección profunda.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                  Arreglos y composturas de ropa
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold">2 a 4 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-500">Vía WhatsApp</td>
                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Confección en taller propio y entrega en Navia.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                  Prendas de piel, ante, cuero y peletería
                </td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold">10 a 15 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-500">Tratamiento artesano</td>
                <td className="py-3 px-3 text-[11px] text-slate-500 dark:text-slate-400">
                  Nutrición de pieles, teñido y secado controlado.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. CÓMO LLEGAR, TRANSPORTE Y APARCAMIENTO EN NAVIA */}
      <section aria-labelledby="seccion-llegar-navia" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Navigation className="w-4 h-4 text-[#0F76BB]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
              Accesibilidad y Transporte
            </span>
          </div>
          <h2 id="seccion-llegar-navia" className="text-xl sm:text-2xl font-black text-[#002147] dark:text-white">
            Cómo Llegar a Tintorería Mimos Navia en Vigo
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Ubicación privilegiada en el bulevar de Teixugueiras, con accesos directos desde la circunvalación VG-20 y excelente comunicación con Samil y Coia.
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
              Acceso muy rápido desde la <strong>VG-20</strong> (salida Navia/Samil) o desde la Avenida de Castelao y Avenida de Europa.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Dispones de aparcamiento público en batería frente a los soportales para parar a dejar o recoger bultos pesados.
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
              Líneas con parada en Teixugueiras y proximidades de Navia:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['L5A', 'L5B', 'L15A', 'L15B', 'L15C', 'C3'].map((linea) => (
                <span key={linea} className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white">
                  {linea}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Parada a menos de 2 minutos caminando del bajo 9 de Teixugueiras 11.
            </p>
          </div>

          {/* Tarjeta A Pie en Navia */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#002147] text-white flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147] dark:text-white">A Pie en el Barrio de Navia</h3>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Ubicada en los <strong>soportales comerciales de Teixugueiras 11</strong>, junto a comercios de barrio y zonas peatonales.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Entrada sin escalones, llana y 100% adaptada para carritos de bebé y personas de movilidad reducida.
            </p>
          </div>
        </div>

        {/* Banner CTA Google Maps */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#002147] text-white flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold">¿Quieres abrir la ruta directa en tu GPS?</h4>
            <p className="text-xs text-blue-200">
              Coordenadas GPS: 42.21223, -8.754691 · C/ Teixugueiras, 11, bajo 9, Navia (Vigo)
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

      {/* 7. PREGUNTAS FRECUENTES (FAQ) DE LA TIENDA DE NAVIA */}
      <section aria-labelledby="seccion-faq-navia" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-[#0F76BB]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
            Respuestas Claras
          </span>
        </div>
        <h2 id="seccion-faq-navia" className="text-xl sm:text-2xl font-black text-[#002147] dark:text-white">
          Preguntas Frecuentes sobre la Tienda de Navia
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Todo lo que necesitas saber para entregar tus prendas en nuestra sede central.
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

      {/* 8. EL COMPROMISO MIMOS Y ATENCIÓN PROFESIONAL */}
      <section aria-labelledby="seccion-confianza-navia" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 to-[#002147] text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-[#60B5F6] border border-white/15">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              Sede Central de Tintorería Mimos en Vigo
            </span>
            <h2 id="seccion-confianza-navia" className="text-xl sm:text-2xl font-black text-white">
              Cuidado textil profesional en el corazón de Navia
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              En nuestra sede central de C/ Teixugueiras 11, bajo 9, te recibimos con la cercanía de siempre y la solvencia de nuestras instalaciones profesionales. Acércate para consultar cualquier duda sobre tus prendas, limpiar tus alfombras o dejar tu colada semanal.
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
              <span>Consultar ahora con Navia</span>
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
