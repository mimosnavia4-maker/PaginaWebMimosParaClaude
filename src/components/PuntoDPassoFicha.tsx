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

interface PuntoDPassoFichaProps {
  onNavigate?: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const PuntoDPassoFicha: React.FC<PuntoDPassoFichaProps> = ({
  onNavigate,
  isModal = false,
  onClose,
}) => {
  const punto: PuntoRegistro =
    REGISTROS_PUNTOS.find((p: PuntoRegistro) => p.id === 'punto-vigo-dpasso') ??
    REGISTROS_PUNTOS[REGISTROS_PUNTOS.length - 1];

  const [activeTabPhoto, setActiveTabPhoto] = useState<'fachada' | 'interior' | 'escaparate'>(
    'fachada'
  );
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);
  const [failedPhotos, setFailedPhotos] = useState<Record<string, boolean>>({});

  const photos = {
    fachada: {
      url: '/images/dpasso-vigo/fachada-dpasso-vigo.webp',
      titulo: "Fachada Principal y Rótulo de D'Passo (Vigo)",
      subtitulo: `Acceso exterior del punto colaborador en ${punto.direccion} (${punto.localidad}).`,
      tag: 'Fachada Principal',
      detalle: `Entrada a cota cero en ${punto.direccion} (zona As Travesas / Balaídos, Vigo), fácilmente reconocible por el rótulo lateral D'PASSO y el escaparate con vinilo oficial de Tintorería Mimos.`,
    },
    interior: {
      url: '/images/dpasso-vigo/interior-punto-recogida-dpasso-vigo.webp',
      titulo: 'Interior: Vitrina y Punto de Recogida Mimos',
      subtitulo: 'Vitrina dedicada de tintorería y lavandería dentro del establecimiento.',
      tag: 'Interior & Vitrina',
      detalle:
        'Zona interior protegida y acondicionada para recibir, custodiar en funda y entregar trajes, abrigos, prendas delicadas, coladas y textiles del hogar con resguardo oficial.',
    },
    escaparate: {
      url: '/images/dpasso-vigo/escaparate-dpasso-vigo.webp',
      titulo: 'Escaparate Exterior y Relación de Servicios',
      subtitulo: `Escaparate y señalización de servicios Mimos en ${punto.direccion}.`,
      tag: 'Escaparate y Servicios',
      detalle:
        'Listado visible desde el exterior con recepción de tintorería, lavandería, alfombras, ropa de hogar, coladas y tapicerías, además de coordinación con el servicio a domicilio de Mimos.',
    },
  };

  const storeStatus = getStoreStatusById('punto-vigo-dpasso');
  const whatsappUrl = buildMimoWhatsAppUrl(
    `Hola, Mimo. Quiero hacer una consulta sobre el punto colaborador D'Passo en Vigo (${punto.direccion}).`
  );
  const mapsUrl = buildGoogleMapsUrl(punto);

  const handleShare = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(window.location.origin + '/punto-mimos-dpasso-vigo')
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

  const handleInternalLink = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClose) onClose();
    if (onNavigate) onNavigate(href, e);
  };

  const preguntasFrecuentes = [
    {
      q: "¿Cómo funciona la entrega de ropa para Tintorería Mimos en D'Passo?",
      a: `Llevas tus prendas (trajes, vestidos, abrigos, edredones, alfombras o colada familiar) a D'Passo en ${punto.direccion}, Vigo. Allí registran tu encargo con tu resguardo oficial. Nuestra furgoneta traslada tus prendas y textiles del hogar a nuestras instalaciones centrales de Mimos en Navia (y las alfombras al taller especialista colaborador) y las devuelve listas y protegidas al punto para que pases a recogerlas.`,
    },
    {
      q: "¿Cuál es el horario de apertura de D'Passo en Vigo?",
      a: 'El establecimiento atiende de lunes a viernes en horario partido de 09:30 a 13:30 y de 16:30 a 20:30. Los sábados, domingos y festivos permanece cerrado.',
    },
    {
      q: "¿Se realizan arreglos de costura o composturas en D'Passo?",
      a: "No. D'Passo actúa como punto colaborador oficial de recogida y entrega para tintorería, lavandería, planchado, colada familiar, ropa de hogar y alfombras, pero no cuenta con taller de costura en el local. Si necesitas bajos, cremalleras o arreglos de ropa, te atendemos en nuestras tiendas propias de Vigo (Navia, Rúa Venezuela y Gregorio Espino).",
    },
    {
      q: '¿Se pueden entregar edredones nórdicos y alfombras grandes en este punto?',
      a: 'Sí. En D’Passo recibimos edredones sintéticos y de plumón natural, mantas, colchas, cortinas y alfombras. En nuestra central de Navia tratamos los edredones, cortinas y mantas, y gestionamos la limpieza de las alfombras mediante taller especialista colaborador con secado controlado.',
    },
    {
      q: '¿Los precios son los mismos que en las tiendas propias de Tintorería Mimos?',
      a: 'Sí. Se aplican exactamente las mismas tarifas oficiales de Tintorería Mimos que en nuestras 3 tiendas propias de Vigo, sin recargos por recepción ni transporte desde el punto colaborador.',
    },
    {
      q: '¿Puedo consultar por WhatsApp antes de llevar la prenda o pedir entrega en casa?',
      a: 'Por supuesto. Puedes escribir directamente a Mimo por WhatsApp al 655 536 844 o llamar a D’Passo al 986 23 06 43. Si después prefieres que te entreguemos los encargos limpios en tu domicilio o trabajo en Vigo, también puedes coordinarlo con Mimo por WhatsApp.',
    },
  ];

  return (
    <div className="space-y-10 animate-fadeIn text-[#002147]">
      {/* Barra superior de cierre cuando se abre en modal */}
      {isModal && onClose && (
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-200 bg-[#F4F9FE]">
          <span className="text-xs font-bold text-[#002147] uppercase tracking-wider">
            Ficha del Establecimiento Colaborador
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
        ariaLabel="Visor de fotografía a pantalla completa de D'Passo en Vigo"
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
              <Handshake className="w-10 h-10 text-[#0F76BB] mb-3" />
              <p className="text-sm font-bold">{photos[activeTabPhoto].titulo}</p>
              <p className="text-xs text-slate-600 mt-1 max-w-md">{photos[activeTabPhoto].subtitulo}</p>
            </div>
          )}
        </div>
        <div className="p-4 sm:p-6 bg-white border-t border-slate-200 text-[#002147]">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#EDF5FD] text-[#0F76BB]">
              {photos[activeTabPhoto].tag}
            </span>
            <span className="text-xs text-slate-500">
              Punto Colaborador Oficial Mimos · {punto.localidad}
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-[#002147]">{photos[activeTabPhoto].titulo}</h4>
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
                  referrerPolicy="no-referrer"
                  onError={() => setFailedPhotos((prev) => ({ ...prev, [activeTabPhoto]: true }))}
                  className={`w-full h-full transition-transform duration-500 ${
                    activeTabPhoto === 'escaparate'
                      ? 'object-contain bg-[#F4F9FE]'
                      : 'object-cover group-hover:scale-105'
                  }`}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#F4F9FE] to-[#EDF5FD] text-[#002147]">
                  <Handshake className="w-10 h-10 text-[#0F76BB] mb-2" />
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
                <Maximize2 className="w-3.5 h-3.5 text-[#0F76BB]" />
                <span className="hidden sm:inline">Ampliar</span>
              </button>

              {/* Tags flotantes sobre la foto */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 pr-24">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-extrabold bg-white/95 text-[#002147] border border-slate-200 shadow-sm">
                  <Handshake className="w-3.5 h-3.5 text-[#0F76BB]" />
                  Punto Colaborador Oficial Mimos · Vigo
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
                onClick={() => setActiveTabPhoto('fachada')}
                className={`flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'fachada'
                    ? 'bg-[#0F76BB] text-white border-[#0F76BB] shadow-xs'
                    : 'bg-white text-[#002147] border-slate-300 hover:bg-[#EDF5FD]'
                }`}
              >
                <span>1. Fachada & Rótulo</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('interior')}
                className={`flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'interior'
                    ? 'bg-[#0F76BB] text-white border-[#0F76BB] shadow-xs'
                    : 'bg-white text-[#002147] border-slate-300 hover:bg-[#EDF5FD]'
                }`}
              >
                <span>2. Interior & Vitrina</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('escaparate')}
                className={`flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'escaparate'
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
                <span className="text-xs font-bold text-[#0F76BB] uppercase tracking-wider">
                  Punto Colaborador Oficial · Vigo
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-extrabold ${
                    storeStatus.isOpen
                      ? 'bg-emerald-50 text-[#178A47] border border-emerald-200'
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
                  {punto.nombre_mostrado} (Vigo)
                </h2>
              ) : (
                <h1 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                  Tintorería y lavandería Mimos en {punto.nombre_mostrado} (Vigo · As Travesas)
                </h1>
              )}
              <p className="text-sm font-semibold text-slate-600 mt-1">
                Punto colaborador independiente de recepción y recogida de Tintorería Mimos en Vigo
              </p>

              <div className="mt-4 space-y-2 text-xs">
                <p className="text-[#002147] flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                  <span>
                    <strong>{punto.direccion}</strong>, {punto.codigo_postal} {punto.localidad} (Pontevedra).
                  </span>
                </p>

                <div className="p-3 rounded-2xl bg-[#F4F9FE] border border-slate-200 space-y-2">
                  <div className="flex items-start gap-2 text-slate-700">
                    <Car className="w-4 h-4 text-[#1FA855] shrink-0 mt-0.5" />
                    <span>
                      <strong>Aparcamiento & Acceso:</strong> {punto.aparcamiento} Entrada directa a pie de calle para dejar o recoger prendas pesadas.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700">
                    <Store className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                    <span>
                      <strong>Entorno:</strong> En {punto.direccion} (entorno As Travesas / Balaídos), práctico para entregar encargos cerca de casa sin cruzar toda la ciudad.
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
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#178A47] text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp con Mimo</span>
                </a>

                <a
                  href={`tel:+34${punto.telefono}`}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white/95 hover:bg-[#002147] text-[#002147] hover:text-white font-extrabold text-sm py-3 px-4 rounded-xl border border-[#002147] transition-colors group tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#0F76BB] group-hover:text-white transition-colors shrink-0" />
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
                  <Navigation className="w-3.5 h-3.5 text-[#0F76BB]" />
                  <span>Cómo llegar (Ruta GPS en Google Maps)</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-[#002147] hover:bg-[#EDF5FD] transition-colors cursor-pointer"
                  title="Copiar enlace directo de este punto"
                >
                  <Share2 className="w-3.5 h-3.5 text-[#0F76BB]" />
                  <span className="hidden sm:inline">{copiedShare ? '¡Copiado!' : 'Compartir'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PUNTOS FUERTES Y VALORES DIFERENCIALES DEL PUNTO */}
      <section aria-labelledby="seccion-ventajas-dpasso" className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <h2 id="seccion-ventajas-dpasso" className="sr-only">
          Ventajas y características de D&apos;Passo Vigo como punto colaborador Mimos
        </h2>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center mb-3">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">
              Camiño Espedrigada, 9
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Acceso directo a cota cero en Vigo ({punto.codigo_postal}) sin desplazamientos hasta Navia.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1FA855] flex items-center justify-center mb-3">
            <Handshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">
              Punto Oficial Mimos
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Recepción oficial de tintorería, edredones, coladas y tapicerías (para central) y alfombras (con taller especialista).
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">
              Vitrina y Aviso Directo
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Prendas custodiadas en funda dentro de vitrina cerrada y aviso cuando regresan listas.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">
              Tarifas Oficiales de Vigo
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Los mismos precios que en nuestras tiendas propias, con resguardo numerado sin sobrecostes.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HORARIO DETALLADO Y RECEPCIÓN DE SERVICIOS MIMOS */}
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
                    Horario de Atención al Público
                  </h3>
                  <p className="text-xs text-slate-600">
                    Recepción y entrega en mostrador
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#F7F6F2] border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-[#002147]">Lunes a Viernes</span>
                  <p className="text-[11px] text-slate-600">Jornada completa partida</p>
                </div>
                <div className="text-right font-mono font-bold text-[#002147] tabular-nums">
                  <div>09:30 – 13:30</div>
                  <div>16:30 – 20:30</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F7F6F2] border border-slate-200 flex justify-between items-center text-slate-500">
                <div>
                  <span className="font-medium">Sábados</span>
                  <p className="text-[11px] text-slate-500">Fin de semana</p>
                </div>
                <span className="font-bold text-slate-500">Cerrado</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F7F6F2] border border-slate-200 flex justify-between items-center text-slate-500">
                <div>
                  <span className="font-medium">Domingos y Festivos</span>
                  <p className="text-[11px] text-slate-500">Descanso comercial</p>
                </div>
                <span className="font-bold text-slate-500">Cerrado</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Truck className="w-4 h-4 text-[#0F76BB] shrink-0" />
              <span><strong>Logística propia:</strong> Traslado en furgoneta de Tintorería Mimos a Navia.</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <ShieldCheck className="w-4 h-4 text-[#1FA855] shrink-0" />
              <span><strong>Resguardo oficial:</strong> Entrega con ticket numerado y garantía Mimos.</span>
            </div>
          </div>
        </div>

        {/* Bloque 2: Alcance del Punto Colaborador y Derivación de Costura */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#F4F9FE] to-[#EDF5FD] rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0F76BB] text-white flex items-center justify-center">
                  <Shirt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#002147]">
                    Recepción Oficial de Tintorería & Lavandería
                  </h3>
                  <p className="text-xs text-slate-600">
                    Mismos acabados y precios oficiales que en nuestras tiendas propias de Vigo
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-extrabold bg-[#0F76BB] text-white">
                Central Mimos Navia
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-4">
              En <strong>D&apos;Passo ({punto.direccion})</strong> puedes dejar tus prendas y textiles del hogar para cualquier tratamiento de tintorería, lavandería o limpieza técnica sin desplazarte hasta nuestra planta de Navia:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                {
                  tit: 'Trajes, americanas y abrigos',
                  desc: 'Limpieza en seco o húmedo, desmanchado manual y planchado profesional.',
                },
                {
                  tit: 'Edredones nórdicos y mantas',
                  desc: 'Lavado de gran capacidad, higienización térmica y secado controlado.',
                },
                {
                  tit: 'Alfombras y tapicerías',
                  desc: 'Recepción de alfombras y piezas textiles para gestión con taller especialista.',
                },
                {
                  tit: 'Colada familiar y ropa de hogar',
                  desc: 'Lavado semanal de sábanas, toallas, cortinas y prendas de uso diario.',
                },
                {
                  tit: 'Camisas y planchado profesional',
                  desc: 'Acabado con prensa y vapor para entrega en percha con funda o doblada.',
                },
                {
                  tit: 'Coordinación a domicilio',
                  desc: 'Posibilidad de concertar entrega directa en domicilio con Mimo por WhatsApp.',
                },
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

          <div className="mt-5 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs text-slate-700 font-medium flex items-center gap-1.5">
              <Scissors className="w-3.5 h-3.5 text-[#0F76BB] shrink-0" />
              <span>Sin arreglos de costura en este local: para composturas acude a nuestras tiendas propias.</span>
            </span>
            {onNavigate && (
              <a
                href="/arreglos-de-ropa-vigo"
                onClick={(e) => handleInternalLink('/arreglos-de-ropa-vigo', e)}
                className="min-h-[44px] inline-flex items-center gap-1 text-xs font-bold text-[#0F76BB] hover:underline"
              >
                <span>Ver tiendas con Arreglos de Ropa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 4. GUÍA COMPLETA DE SERVICIOS DISPONIBLES EN ESTE PUNTO */}
      <section
        aria-labelledby="seccion-servicios-dpasso"
        className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-black bg-[#EDF5FD] text-[#0F76BB]">
              Catálogo de Recepción
            </span>
            <span className="text-xs font-bold text-slate-600">100% Confirmado en {punto.localidad}</span>
          </div>
          <h2
            id="seccion-servicios-dpasso"
            className="text-xl sm:text-2xl font-black text-[#002147] tracking-tight"
          >
            Todos los Servicios de Tintorería y Lavandería en D&apos;Passo
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-1">
            Recepción directa en mostrador para vecinos, familias y negocios de Vigo. Tus prendas viajan protegidas hasta nuestra planta central en Navia y regresan listas para recoger.
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
                Cuidado especializado para trajes de chaqueta, americanas, abrigos de paño, prendas de lana, gabardinas y vestidos de fiesta, ceremonia o comunión.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Desmanchado artesanal previo en central</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Planchado con prensa de vapor y funda</span>
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
                Lavado e higienización térmica de edredones de plumón natural, fibra sintética, colchas y mantas de cama grande, con secado que mantiene el volumen mullido.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Higienización profunda sin apelmazar</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Opción de bolsa al vacío para guardar</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 3: Alfombras */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#1FA855] text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147]">
                  Punto Receptor de Alfombras
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Recepción cómoda en Camiño Espedrigada para alfombras de lana, sintéticas, pelo largo o kilims. Se miden y gestionan con taller especialista colaborador.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Desempolvado mecánico y lavado plano</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Sin tener que desplazarte hasta Navia</span>
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
                  Colada Familiar & Planchado
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Ahorra tiempo cada semana con nuestro servicio de lavado para ropa de uso diario, toallas y sábanas, junto con planchado profesional de camisas y pantalones.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Camisas en percha o dobladas para viaje</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Ropa clasificada, lavada y doblada</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 5: Textiles del Hogar y Tapicerías */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147]">
                  Ropa de Hogar y Tapicerías
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Limpieza de cortinas, visillos, fundas de sofá desmontables, cojines y mantelerías con tratamiento específico según la etiqueta y composición del tejido.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Cuidado de tejidos delicados y lino</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Eliminación de olores y alérgenos</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 6: Coordinación y Envío a Domicilio */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-[#1FA855] text-white flex items-center justify-center">
                  <Truck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147]">
                  Coordinación de Entrega a Domicilio
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Si dejas tus prendas en D&apos;Passo pero luego prefieres recibirlas directamente en casa o en el trabajo, puedes coordinar el reparto en Vigo por WhatsApp con Mimo.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Rutas propias en Vigo acordadas con Mimo</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Práctico para alfombras y edredones</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 5. TABLA DE FUNCIONAMIENTO Y TRATAMIENTO EN CENTRAL */}
      <section
        aria-labelledby="seccion-circuito-dpasso"
        className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm"
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-[#0F76BB]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB]">
                Operativa Transparente
              </span>
            </div>
            <h2
              id="seccion-circuito-dpasso"
              className="text-lg sm:text-xl font-black text-[#002147]"
            >
              Qué Prendas Recogemos en D&apos;Passo y Cómo Se Procesan
            </h2>
          </div>
          <span className="text-xs text-slate-600">
            Mismo proceso de calidad de Tintorería Mimos Navia
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-extrabold uppercase text-[#002147]">
                <th className="py-3 px-3">Servicio / Tipo de Prenda</th>
                <th className="py-3 px-3">Dónde se procesa</th>
                <th className="py-3 px-3">Recepción en D&apos;Passo</th>
                <th className="py-3 px-3">Detalle Operativo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Trajes de chaqueta, americanas, abrigos y vestidos
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold">
                  Central Mimos Navia
                </td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-[#178A47] border border-emerald-200">
                    Disponible
                  </span>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Desmanchado manual, limpieza en seco o húmedo y entrega en percha con funda.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Camisas, pantalones y planchado semanal
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold">
                  Central Mimos Navia
                </td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-[#178A47] border border-emerald-200">
                    Disponible
                  </span>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Acabado con prensa y vapor; opción en percha o doblada según preferencia.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Edredones nórdicos, mantas y ropa de cama
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold">
                  Central Mimos Navia
                </td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-[#178A47] border border-emerald-200">
                    Disponible
                  </span>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Lavado de gran capacidad y secado lento para esponjar plumón o fibra.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Fundas de sofá, cortinas y tapicerías
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold">
                  Central Mimos Navia
                </td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-[#178A47] border border-emerald-200">
                    Disponible
                  </span>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Lavado según fibra y tejido para conservar textura y ajuste.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Alfombras
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold">
                  Taller especialista colaborador
                </td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-[#178A47] border border-emerald-200">
                    Disponible
                  </span>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Desempolvado mecánico, lavado plano e higienización según fibra y tamaño.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Colada familiar y ropa de diario
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold">
                  Central Mimos Navia
                </td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-[#178A47] border border-emerald-200">
                    Disponible
                  </span>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Lavado higienizante, secado y doblado listo para guardar en armario.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Costura, bajos y arreglo de cremalleras
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold">
                  Tiendas propias Mimos (Vigo)
                </td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    Solo tiendas propias
                  </span>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Para composturas y arreglos dispones de Navia, Rúa Venezuela y Gregorio Espino.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. CÓMO LLEGAR, TRANSPORTE Y APARCAMIENTO DETALLADO */}
      <section
        aria-labelledby="seccion-llegar-dpasso"
        className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Navigation className="w-4 h-4 text-[#0F76BB]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB]">
              Accesibilidad y Transporte
            </span>
          </div>
          <h2 id="seccion-llegar-dpasso" className="text-xl sm:text-2xl font-black text-[#002147]">
            Cómo Llegar a D&apos;Passo en Vigo
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            En {punto.direccion} ({punto.codigo_postal} {punto.localidad}), con entrada directa desde la acera y cómodo acceso tanto a pie como en coche o autobús urbano.
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
            <p className="text-xs text-slate-700 leading-relaxed">
              {punto.aparcamiento} Cómodo si te acercas desde Av. de Fragoso, Av. de Castelao o Balaídos.
            </p>
            <p className="text-[11px] text-slate-600">
              Práctico para descargar edredones, bolsas de colada o alfombras a pie de tienda.
            </p>
          </div>

          {/* Tarjeta Autobús Urbano */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                <Bus className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147]">En Autobús Urbano</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Paradas de autobús urbano de Vigo en el entorno de As Travesas, Av. de Fragoso y Balaídos.
            </p>
            <p className="text-[11px] text-slate-600">
              A pocos minutos caminando hasta Camiño Espedrigada, 9 bajo.
            </p>
          </div>

          {/* Tarjeta A Pie */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147]">A Pie por el Barrio</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Situado en <strong>{punto.direccion}</strong>, punto de paso habitual en el entorno de Balaídos y As Travesas.
            </p>
            <p className="text-[11px] text-slate-600">
              Entrada comercial a cota cero, cómoda con carritos o bolsas de ropa.
            </p>
          </div>
        </div>

        {/* Banner CTA Google Maps */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#EDF5FD] border border-[#0F76BB]/25 text-[#002147] flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-[#002147]">
              ¿Quieres que tu navegador te guíe hasta la puerta?
            </h4>
            <p className="text-xs text-slate-700 tabular-nums">
              Coordenadas GPS: {punto.latitud}, {punto.longitud} · {punto.direccion},{' '}
              {punto.localidad}
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

      {/* 7. PREGUNTAS FRECUENTES (FAQ) DE D'PASSO */}
      <section
        aria-labelledby="seccion-faq-dpasso"
        className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4"
      >
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-[#0F76BB]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB]">
            Respuestas Claras
          </span>
        </div>
        <h2 id="seccion-faq-dpasso" className="text-xl sm:text-2xl font-black text-[#002147]">
          Preguntas Frecuentes sobre el Punto D&apos;Passo en Vigo
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Todo lo que necesitas saber antes de entregar o recoger tus prendas en Camiño Espedrigada, 9 bajo.
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
                    <span className="text-[#0F76BB] font-black tabular-nums">{index + 1}.</span>
                    <span>{item.q}</span>
                  </span>
                  {abierta ? (
                    <ChevronUp className="w-4 h-4 text-[#0F76BB] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {abierta && (
                  <div className="mt-2.5 pl-6 text-xs sm:text-sm text-slate-700 leading-relaxed animate-fadeIn">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. CERCANÍA, CONFIANZA Y CONTACTO DIRECTO */}
      <section
        aria-labelledby="seccion-confianza-dpasso"
        className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#F4F9FE] to-[#EDF5FD] border border-slate-200 text-[#002147] shadow-sm relative overflow-hidden"
      >
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-white text-[#0F76BB] border border-[#0F76BB]/25">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              La tecnología de Mimos con la comodidad de entregar cerca de ti en Vigo
            </span>
            <h2 id="seccion-confianza-dpasso" className="text-xl sm:text-2xl font-black text-[#002147]">
              Cuidado textil profesional en el punto D&apos;Passo
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              En {punto.nombre_mostrado} ({punto.direccion}, {punto.localidad}) tienes un punto cercano de recepción y entrega para tus encargos de tintorería, lavandería, edredones y alfombras con el respaldo de nuestra central en Navia.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-col gap-2.5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#178A47] text-white font-extrabold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Consultar ahora con Mimo</span>
            </a>
            <a
              href={`tel:+34${punto.telefono}`}
              className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-white/95 hover:bg-[#002147] text-[#002147] hover:text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl border border-[#002147] transition-colors group tabular-nums"
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
