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
  const [failedPhotos, setFailedPhotos] = useState<Record<string, boolean>>({});

  const photos = {
    fachada: {
      url: '/images/navia/fachada-mimos-navia-vigo.webp',
      titulo: 'Fachada Principal y Acceso en Teixugueiras',
      subtitulo: 'Rótulo azul distintivo Tintorería Lavandería Mimos Navia sobre fachada cerámica roja en Rúa das Teixugueiras 11, bajo 9.',
      tag: '1 Exterior · Fachada & Rótulo',
      detalle: 'Entrada a cota cero en bulevar peatonal accesible, sin barreras arquitectónicas y con amplia visibilidad comercial.',
    },
    mostrador: {
      url: '/images/navia/mostrador-recepcion-mimos-navia-vigo.webp',
      titulo: 'Interior: Mostrador de Atención y Recepción Personalizada',
      subtitulo: 'Zona de atención donde revisamos cada prenda, tomamos notas de desmanchado y gestionamos la entrega en percha protegida.',
      tag: '2 Interior · Mostrador de Atención',
      detalle: 'Mostrador técnico con personal uniformado de Tintorería Mimos, clasificación cuidada por tipo de tejido y control riguroso de cada encargo.',
    },
    planta: {
      url: '/images/navia/planta-planchado-mimos-navia-vigo.webp',
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
      a: 'Por supuesto. La sede de Navia es punto de recepción de alfombras. Medimos tu alfombra en el mostrador, revisamos el estado de las fibras y coordinamos su limpieza especializada, desinfección y secado en ambiente controlado mediante taller especialista colaborador.',
    },
    {
      q: '¿Cómo me avisáis cuando la ropa está lista para recoger?',
      a: 'Te notificamos de forma automática por WhatsApp o SMS en cuanto tus prendas salen de la sección de planchado y pasan nuestro control de calidad. Así no realizas ningún desplazamiento innecesario.',
    },
    {
      q: '¿Qué formas de pago tenéis disponibles en el mostrador de Navia?',
      a: 'Aceptamos tarjeta de débito y crédito (contactless, móvil, Apple Pay, Google Pay) y dinero en efectivo (no se acepta Bizum). Entregamos siempre justificante y ticket oficial con IVA desglosado.',
    },
    {
      q: '¿Puedo pedir que me entreguen en mi casa las prendas que dejé en Navia?',
      a: 'Sí. Navia coordina además nuestra flota propia de reparto a domicilio en Vigo y comarca. Si después prefieres recibir tus prendas, colada o alfombras directamente en tu casa u oficina, puedes solicitárnoslo por WhatsApp y acordamos la franja de entrega.',
    },
  ];

  return (
    <div className="space-y-10 animate-fadeIn text-slate-800">
      {/* Barra superior de cierre cuando se abre en modal */}
      {isModal && onClose && (
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-200 bg-[#F4F9FE]">
          <span className="text-xs font-bold text-[#002147] uppercase tracking-wider">
            Ficha de Sede Central Mimos · Navia
          </span>
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
              referrerPolicy="no-referrer"
              onError={() => setFailedPhotos((prev) => ({ ...prev, [activeTabPhoto]: true }))}
              className="max-h-[75vh] w-full object-contain"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F4F9FE] text-[#002147]">
              <Building2 className="w-10 h-10 text-[#0F76BB] mb-3" />
              <p className="text-sm font-bold">{photos[activeTabPhoto].titulo}</p>
              <p className="text-xs text-slate-600 mt-1 max-w-md">{photos[activeTabPhoto].subtitulo}</p>
            </div>
          )}
        </div>
        <div className="p-4 sm:p-6 bg-white border-t border-slate-200 text-[#002147]">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#0F76BB] text-white">
              {photos[activeTabPhoto].tag}
            </span>
            <span className="text-xs text-slate-500">Sede Central Mimos · Navia, Vigo</span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-[#002147]">{photos[activeTabPhoto].titulo}</h4>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">{photos[activeTabPhoto].subtitulo}</p>
          <p className="text-xs text-slate-500 mt-2 border-t border-slate-200 pt-2">
            {photos[activeTabPhoto].detalle}
          </p>
        </div>
      </Dialog>

      {/* 1. CABECERA HERO CON FOTOGRAFÍA REAL Y ACCIONES RÁPIDAS */}
      <section className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* Columna Izquierda: Galería Interactiva con Fotos Reales (1 exterior, 2 interior) */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#F4F9FE]">
            {/* Foto Activa Grande con Zoom */}
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden group bg-[#EDF5FD]">
              {!failedPhotos[activeTabPhoto] ? (
                <img
                  src={photos[activeTabPhoto].url}
                  alt={photos[activeTabPhoto].titulo}
                  referrerPolicy="no-referrer"
                  onError={() => setFailedPhotos((prev) => ({ ...prev, [activeTabPhoto]: true }))}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F4F9FE] to-[#EDF5FD] text-[#002147]">
                  <Building2 className="w-10 h-10 text-[#0F76BB] mb-2" />
                  <p className="text-sm font-bold">{photos[activeTabPhoto].titulo}</p>
                  <p className="text-xs text-slate-600 mt-1 max-w-md">{photos[activeTabPhoto].subtitulo}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/15 pointer-events-none" />

              {/* Botón flotante para ampliar foto */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 min-h-[40px] px-3 py-1.5 rounded-xl bg-white/95 hover:bg-white text-[#002147] text-xs font-bold shadow-sm transition-colors cursor-pointer border border-slate-200"
                title="Ampliar foto a pantalla completa"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#0F76BB]" />
                <span className="hidden sm:inline">Ampliar</span>
              </button>

              {/* Tags flotantes sobre la foto */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 pr-24">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-black bg-white/95 text-[#002147] border border-slate-200 shadow-sm">
                  <Building2 className="w-3.5 h-3.5 text-[#0F76BB]" />
                  Sede Central Mimos · Navia
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

            {/* Selector de Fotografías en Miniatura (1 Exterior + 2 Interior) */}
            <div className="p-3 bg-[#F4F9FE] border-t border-slate-200 flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-bold text-[#002147] pl-1 shrink-0">Fotos reales:</span>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('fachada')}
                className={`flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'fachada'
                    ? 'bg-[#0F76BB] text-white border-[#0F76BB] shadow-xs'
                    : 'bg-white text-[#002147] border-slate-300 hover:bg-[#EDF5FD]'
                }`}
              >
                <span>1. Exterior Fachada</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('mostrador')}
                className={`flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'mostrador'
                    ? 'bg-[#0F76BB] text-white border-[#0F76BB] shadow-xs'
                    : 'bg-white text-[#002147] border-slate-300 hover:bg-[#EDF5FD]'
                }`}
              >
                <span>2. Interior Mostrador</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('planta')}
                className={`flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'planta'
                    ? 'bg-[#0F76BB] text-white border-[#0F76BB] shadow-xs'
                    : 'bg-white text-[#002147] border-slate-300 hover:bg-[#EDF5FD]'
                }`}
              >
                <span>3. Interior Centro Planchado</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Datos Operativos y Acciones Rápidas */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#0F76BB] uppercase tracking-wider">
                  Sede Central & Domicilio Social
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-extrabold ${
                    storeStatus.isOpen
                      ? 'bg-emerald-50 text-[#178A47] border border-emerald-200'
                      : 'bg-[#F4F9FE] text-[#002147] border border-slate-200'
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
                  Tintorería Mimos Navia
                </h2>
              ) : (
                <h1 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                  Tintorería Mimos Navia – Sede Central en Vigo
                </h1>
              )}
              <p className="text-sm font-semibold text-slate-600 mt-0.5">
                Tintorería, Lavandería, Planchado y Centro de Operaciones en Vigo
              </p>

              <div className="mt-4 space-y-2 text-xs">
                <p className="text-slate-700 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                  <span>
                    <strong>C/ Teixugueiras, 11, bajo 9</strong>, 36212 Vigo (Pontevedra).
                  </span>
                </p>

                <div className="p-3 rounded-2xl bg-[#F4F9FE] border border-slate-200 space-y-2">
                  <div className="flex items-start gap-2 text-slate-700">
                    <Car className="w-4 h-4 text-[#1FA855] shrink-0 mt-0.5" />
                    <span>
                      <strong>Aparcamiento cómodo:</strong> Amplias plazas de estacionamiento en batería a lo largo del bulevar de Teixugueiras frente a los soportales para carga rápida de prendas y alfombras.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700">
                    <Store className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
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
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#178A47] text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp de Navia</span>
                </a>

                <a
                  href={`tel:+34${punto.telefono}`}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white/95 border border-[#002147] hover:bg-[#002147] text-[#002147] hover:text-white font-extrabold text-sm py-3 px-4 rounded-xl transition-all group"
                >
                  <Phone className="w-4 h-4 text-[#0F76BB] group-hover:text-white shrink-0" />
                  <span>Llamar: {punto.telefonos_mostrados}</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#F4F9FE] hover:bg-[#EDF5FD] border border-slate-200 text-[#002147] font-bold text-xs py-2.5 px-3 rounded-xl transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#0F76BB]" />
                  <span>Cómo llegar (Ruta GPS en Google Maps)</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-[#002147] hover:bg-[#F4F9FE] transition-colors cursor-pointer"
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
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">Sede Central Mimos</h3>
            <p className="text-[11px] text-slate-600 mt-1">
              Planta operativa de planchado, desmanchado y coordinación logística de Vigo.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1FA855] flex items-center justify-center mb-3">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">Aparcamiento en Bulevar</h3>
            <p className="text-[11px] text-slate-600 mt-1">
              Fácil parada en batería a pocos metros de la entrada para dejar o cargar prendas.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">Aviso por WhatsApp</h3>
            <p className="text-[11px] text-slate-600 mt-1">
              Notificación automática al instante en cuanto tu encargo esté listo y empaquetado.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">Garantía y Confianza</h3>
            <p className="text-[11px] text-slate-600 mt-1">
              Ticket oficial de depósito numerado y el cuidado minucioso de nuestro equipo.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HORARIO DETALLADO Y GESTIÓN DE COSTURA CON TALLER PROPIO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bloque 1: Horario Detallado Semanal */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#002147]">
                    Horario de Atención en Navia
                  </h3>
                  <p className="text-xs text-slate-500">Atención directa en mostrador</p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#F4F9FE] border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-[#002147]">Lunes a Viernes</span>
                  <p className="text-[11px] text-slate-500">Jornada completa partida</p>
                </div>
                <div className="text-right font-mono font-bold text-[#002147]">
                  <div>09:30 – 14:00</div>
                  <div>16:00 – 20:00</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F4F9FE] border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-[#002147]">Sábados</span>
                  <p className="text-[11px] text-slate-500">Mañanas</p>
                </div>
                <span className="font-mono font-bold text-[#002147]">
                  10:00 – 13:30
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-slate-500">
                <div>
                  <span className="font-medium">Domingos y Festivos</span>
                  <p className="text-[11px] text-slate-400">Descanso del personal</p>
                </div>
                <span className="font-bold text-slate-400">Cerrado</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <CreditCard className="w-4 h-4 text-[#0F76BB] shrink-0" />
              <span><strong>Cobro disponible:</strong> Tarjeta (Contactless / Apple Pay / Google Pay) y Efectivo (sin Bizum).</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-[#1FA855] shrink-0" />
              <span><strong>Resguardo oficial:</strong> Entrega con ticket de depósito con desglose e IVA.</span>
            </div>
          </div>
        </div>

        {/* Bloque 2: Gestión Centralizada de Costura y Arreglos */}
        <div className="lg:col-span-7 bg-[#EDF5FD] rounded-3xl p-6 sm:p-7 border border-[#0F76BB]/25 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0F76BB] text-white flex items-center justify-center">
                  <Scissors className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#002147]">
                    Recepción de Costura y Arreglos de Ropa
                  </h3>
                  <p className="text-xs text-slate-600">
                    Depósito en Navia coordinado con nuestros talleres propios in situ
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-black bg-white border border-[#0F76BB]/25 text-[#0F76BB]">
                <Sparkles className="w-3.5 h-3.5 text-[#0F76BB]" />
                Confección Propia
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-4">
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
                  className="p-3 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-2.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
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
            <div className="mt-5 pt-3 border-t border-[#0F76BB]/20 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-600 font-medium">
                ¿Buscas una tienda con modista y probador in situ en el acto?
              </span>
              <a
                href="/tienda-mimos-gregorio-espino-vigo"
                onClick={(e) => onNavigate('/tienda-mimos-gregorio-espino-vigo', e)}
                className="inline-flex items-center gap-1 min-h-[44px] text-xs font-bold text-[#0F76BB] hover:underline"
              >
                <span>Visitar Mimos Gregorio Espino (Taller In Situ)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 4. GUÍA COMPLETA DE SERVICIOS DISPONIBLES EN LA SEDE DE NAVIA */}
      <section aria-labelledby="seccion-servicios-navia" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-black bg-[#EDF5FD] text-[#0F76BB]">
              Catálogo de Sede Central
            </span>
            <span className="text-xs font-bold text-slate-500">100% Confirmado en Navia</span>
          </div>
          <h2 id="seccion-servicios-navia" className="text-xl sm:text-2xl font-black text-[#002147] tracking-tight">
            Todos los Servicios de Tintorería y Lavandería en Navia
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-1">
            Recepción directa en mostrador para particulares, familias, profesionales y empresas del área de Navia, Samil, Alcabre, Coia y todo Vigo.
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
              <p className="text-xs text-slate-600 leading-relaxed">
                Tratamiento técnico especializado para trajes, americanas, abrigos de paño, prendas de lana noble, gabardinas y vestidos de ceremonia o comunión.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Desmanchado manual prenda a prenda</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Planchado por vapor y entrega en percha protegida</span>
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
              <p className="text-xs text-slate-600 leading-relaxed">
                Higienización térmica de edredones de plumón, plumas y fibras sintéticas. Secado controlado para devolver el volumen mullido sin apelmazar el relleno interior.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Tratamiento higiénico antiácaros y bactericida</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Opción de envasado al vacío para guardar en casa</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 3: Alfombras Grandes y Delicadas */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#1FA855] text-white flex items-center justify-center">
                  <Car className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147]">
                  Recepción de Alfombras
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Recepción directa de alfombras de lana, seda, pelo largo y kilims. Medición exacta en mostrador y gestión con taller especialista colaborador.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Aspirado mecánico profundo y desinfección</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Aparcamiento en Teixugueiras para descargar fácilmente</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 4: Colada y Planchado Semanal */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147]">
                  Colada Familiar y Camisas por Kilos
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Ahorra horas cada semana delegando la colada diaria, toallas y sábanas. Planchado artesanal de camisas con cuellos y puños impecables.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Camisas en percha con funda o dobladas para viaje</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Detergentes de alta tolerancia dermatológica</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 5: Prendas de Piel, Ante y Cuero */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147]">
                  Piel, Cuero y Ante
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Limpieza, nutrición y reengrase de cazadoras de piel, chaquetones de ante, serraje y piezas de peletería. Recuperación de flexibilidad y color natural.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Tratamientos artesanos respetuosos con el cuero</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Tratamiento hidrófugo antimanchas disponible</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 6: Coordinación y Logística a Domicilio */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#1FA855] text-white flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147]">
                  Base de Recogida y Entrega a Domicilio
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Desde Navia coordinamos nuestras rutas de reparto a domicilio para Vigo y comarca (sujeto a importe mínimo de servicio a consultar). Puedes pedir recogida o entrega en tu casa por WhatsApp o en la web.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Franjas acordadas previamente por WhatsApp</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Ideal para alfombras grandes o lotes familiares</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. TABLA DE TIEMPOS Y PLAZOS ORIENTATIVOS DE ENTREGA EN NAVIA */}
      <section aria-labelledby="seccion-plazos-navia" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-[#0F76BB]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB]">
                Planificación Transparente
              </span>
            </div>
            <h2 id="seccion-plazos-navia" className="text-lg sm:text-xl font-black text-[#002147]">
              Plazos Orientativos de Entrega en Navia
            </h2>
          </div>
          <span className="text-xs text-slate-600">
            Aviso instantáneo por WhatsApp / SMS al terminar
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase text-[#002147]">
                <th className="py-3 px-3">Servicio / Tipo de Prenda</th>
                <th className="py-3 px-3">Plazo Estándar</th>
                <th className="py-3 px-3">Aviso al Cliente</th>
                <th className="py-3 px-3">Detalle Operativo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Coladas familiares y camisas semanales
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">24 a 48 horas</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-[#178A47] border border-emerald-200">
                    Aviso automático
                  </span>
                </td>
                <td className="py-3 px-3 text-xs text-slate-600">
                  Lavado, secado y planchado artesanal.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Trajes de sastre, americanas y vestidos
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">48 a 72 horas</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#EDF5FD] text-[#0F76BB] border border-[#0F76BB]/20">
                    Vía WhatsApp / SMS
                  </span>
                </td>
                <td className="py-3 px-3 text-xs text-slate-600">
                  Desmanchado manual y prensa de vapor.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Edredones nórdicos y mantas de cama
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">3 a 5 días laborables</td>
                <td className="py-3 px-3 text-xs text-slate-600">Vía WhatsApp</td>
                <td className="py-3 px-3 text-xs text-slate-600">
                  Secado progresivo para esponjar el plumón.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Limpieza y restauración de alfombras
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">7 a 10 días laborables</td>
                <td className="py-3 px-3 text-xs text-slate-600">Vía WhatsApp</td>
                <td className="py-3 px-3 text-xs text-slate-600">
                  Lavado en plano y desinfección profunda.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Arreglos y composturas de ropa
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">2 a 4 días laborables</td>
                <td className="py-3 px-3 text-xs text-slate-600">Vía WhatsApp</td>
                <td className="py-3 px-3 text-xs text-slate-600">
                  Confección en taller propio y entrega en Navia.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Prendas de piel, ante, cuero y peletería
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">10 a 15 días laborables</td>
                <td className="py-3 px-3 text-xs text-slate-600">Tratamiento artesano</td>
                <td className="py-3 px-3 text-xs text-slate-600">
                  Nutrición de pieles, teñido y secado controlado.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. CÓMO LLEGAR, TRANSPORTE Y APARCAMIENTO EN NAVIA */}
      <section aria-labelledby="seccion-llegar-navia" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Navigation className="w-4 h-4 text-[#0F76BB]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB]">
              Accesibilidad y Transporte
            </span>
          </div>
          <h2 id="seccion-llegar-navia" className="text-xl sm:text-2xl font-black text-[#002147]">
            Cómo Llegar a Tintorería Mimos Navia en Vigo
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Ubicación privilegiada en el bulevar de Teixugueiras, con accesos directos desde la circunvalación VG-20 y excelente comunicación con Samil y Coia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tarjeta Coche y Aparcamiento */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1FA855] text-white flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147]">En Coche Particular</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Acceso muy rápido desde la <strong>VG-20</strong> (salida Navia/Samil) o desde la Avenida de Castelao y Avenida de Europa.
            </p>
            <p className="text-xs text-slate-600">
              Dispones de aparcamiento público en batería frente a los soportales para parar a dejar o recoger bultos pesados.
            </p>
          </div>

          {/* Tarjeta Autobús Vitrasa */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                <Bus className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147]">En Autobús Urbano (Vitrasa)</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Líneas urbanas verificadas con paso por Rúa das Teixugueiras (Navia):
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['L13', 'L15A', 'N2 (nocturna)', 'N4 (nocturna)'].map((linea) => (
                <span key={linea} className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-white border border-slate-300 text-[#002147]">
                  {linea}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-600">
              Parada en Rúa das Teixugueiras a pocos metros del bajo 9. Consulta paradas y horarios actualizados en{' '}
              <a
                href="https://www.vitrasa.es"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#0F76BB] underline hover:text-[#002147]"
              >
                vitrasa.es
              </a>
              .
            </p>
          </div>

          {/* Tarjeta A Pie en Navia */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147]">A Pie en el Barrio de Navia</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ubicada en los <strong>soportales comerciales de Teixugueiras 11</strong>, junto a comercios de barrio y zonas peatonales.
            </p>
            <p className="text-xs text-slate-600">
              Entrada sin escalones, llana y 100% adaptada para carritos de bebé y personas de movilidad reducida.
            </p>
          </div>
        </div>

        {/* Banner CTA Google Maps */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#EDF5FD] border border-[#0F76BB]/25 text-[#002147] flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-[#002147]">¿Quieres abrir la ruta directa en tu GPS?</h4>
            <p className="text-xs text-slate-600 tabular-nums">
              Coordenadas GPS: 42.21223, -8.754691 · C/ Teixugueiras, 11, bajo 9, Navia (Vigo)
            </p>
          </div>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[44px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs font-extrabold py-2.5 px-4 rounded-xl transition-colors shadow-xs"
          >
            <Navigation className="w-4 h-4" />
            <span>Abrir en Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* 7. PREGUNTAS FRECUENTES (FAQ) DE LA TIENDA DE NAVIA */}
      <section aria-labelledby="seccion-faq-navia" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-[#0F76BB]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB]">
            Respuestas Claras
          </span>
        </div>
        <h2 id="seccion-faq-navia" className="text-xl sm:text-2xl font-black text-[#002147]">
          Preguntas Frecuentes sobre la Tienda de Navia
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Todo lo que necesitas saber para entregar tus prendas en nuestra sede central.
        </p>

        <div className="divide-y divide-slate-200 mt-4">
          {preguntasFrecuentes.map((item, index) => {
            const abierta = faqAbierta === index;
            return (
              <div key={index} className="py-3 sm:py-4">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full min-h-[44px] py-2 flex items-center justify-between text-left gap-4 font-bold text-xs sm:text-sm text-[#002147] hover:text-[#0F76BB] transition-colors cursor-pointer"
                  aria-expanded={abierta}
                >
                  <span className="flex items-start gap-2">
                    <span className="text-[#0F76BB] font-black">{index + 1}.</span>
                    <span>{item.q}</span>
                  </span>
                  {abierta ? (
                    <ChevronUp className="w-4 h-4 text-[#0F76BB] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {abierta && (
                  <div className="mt-2 pl-6 text-xs sm:text-sm text-slate-600 leading-relaxed animate-fadeIn">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. EL COMPROMISO MIMOS Y ATENCIÓN PROFESIONAL */}
      <section aria-labelledby="seccion-confianza-navia" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#F4F9FE] to-[#EDF5FD] border border-slate-200 text-[#002147] shadow-sm relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-white text-[#0F76BB] border border-[#0F76BB]/25">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              Sede Central de Tintorería Mimos en Vigo
            </span>
            <h2 id="seccion-confianza-navia" className="text-xl sm:text-2xl font-black text-[#002147]">
              Cuidado textil profesional en el corazón de Navia
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              En nuestra sede central de C/ Teixugueiras 11, bajo 9, te recibimos con la cercanía de siempre y la solvencia de nuestras instalaciones profesionales para tu ropa y textiles del hogar. Acércate para consultar cualquier duda sobre tus prendas, gestionar tus alfombras con especialista o dejar tu colada semanal.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#178A47] text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar ahora con Navia</span>
            </a>
            <a
              href={`tel:+34${punto.telefono}`}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white/95 hover:bg-[#002147] text-[#002147] hover:text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl border border-[#002147] transition-colors group tabular-nums"
            >
              <Phone className="w-4 h-4 text-[#0F76BB] group-hover:text-white transition-colors" />
              <span>Llamar al {punto.telefonos_mostrados}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
