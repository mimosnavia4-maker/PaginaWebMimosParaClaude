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
  const [failedPhotos, setFailedPhotos] = useState<Record<string, boolean>>({});

  const photos = {
    fachada: {
      url: '/images/telas-mas/fachada-telas-mas-o-porrino.webp',
      titulo: 'Fachada Principal y Rótulo Oficial',
      subtitulo: 'Rótulo comercial Telas y Más en Rúa Manuel Rodríguez, 30 (O Porriño).',
      tag: 'Fachada Principal',
      detalle: 'Entrada a cota cero en pleno centro comercial de O Porriño. Punto colaborador oficial de Tintorería Mimos con recepción directa de prendas.',
    },
    interior: {
      url: '/images/telas-mas/interior-taller-telas-mas-o-porrino.webp',
      titulo: 'Interior: Mostrador de Atención y Telas',
      subtitulo: 'Mostrador de recepción de prendas, amplia variedad de telas y taller propio de costura.',
      tag: 'Taller In Situ & Mostrador',
      detalle: 'Espacio especializado en confección y tejidos donde se revisan tus prendas y se coordinan los tratamientos con la central de Mimos en Vigo.',
    },
    exterior: {
      url: '/images/telas-mas/escaparate-calle-telas-mas-o-porrino.webp',
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
      a: 'Llevas tus prendas (trajes, vestidos, abrigos, edredones, alfombras o colada) a Telas y Más en C/ Manuel Rodríguez, 30, O Porriño. Allí registran tu encargo con tus datos. El equipo logístico de Mimos recoge las prendas y textiles del hogar hacia nuestras instalaciones centrales en Vigo (y coordina las alfombras con taller especialista colaborador) y las devuelve listas y precintadas a Telas y Más para que las recojas cómodamente.',
    },
    {
      q: '¿Qué tipo de arreglos de costura se pueden solicitar en Telas y Más?',
      a: 'Telas y Más cuenta con taller propio de costura y arreglos in situ: subida y bajada de bajos en pantalones, faldas y abrigos, cambio y ajuste de cremalleras, ensanchar o estrechar prendas, ajustes de cintura, zurcidos y composturas en general. Además son especialistas en venta y corte de telas.',
    },
    {
      q: '¿Se pueden entregar edredones de plumas y alfombras grandes en este punto?',
      a: 'Sí. Telas y Más recibe textiles de gran volumen como edredones sintéticos y nórdicos de plumón natural, mantas, colchas y alfombras (consultando dimensiones). Mimos realiza el lavado y secado de edredones en su central de Vigo y gestiona las alfombras mediante taller especialista colaborador.',
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
            <span className="text-xs text-slate-500">Punto Colaborador Oficial Mimos · O Porriño</span>
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
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                  Punto Colaborador Mimos · Taller Propio del Colaborador
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
                <span>2. Mostrador & Telas</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('exterior')}
                className={`flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'exterior'
                    ? 'bg-[#0F76BB] text-white border-[#0F76BB] shadow-xs'
                    : 'bg-white text-[#002147] border-slate-300 hover:bg-[#EDF5FD]'
                }`}
              >
                <span>3. Exterior & Acceso</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Datos Operativos y Acciones Rápidas */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-white">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#0F76BB] uppercase tracking-wider">
                  Punto Colaborador Oficial · O Porriño
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
                  Telas y Más (O Porriño)
                </h2>
              ) : (
                <h1 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                  Tintorería, lavandería y costura Mimos en O Porriño (Telas y Más)
                </h1>
              )}
              <p className="text-sm font-semibold text-slate-600 mt-1">
                Punto colaborador independiente de recepción y recogida Mimos · Taller de costura propio del establecimiento
              </p>

              <div className="mt-4 space-y-2 text-xs">
                <p className="text-[#002147] flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                  <span>
                    <strong>Rúa Manuel Rodríguez, 30, bajo</strong>, 36400 O Porriño (Pontevedra).
                  </span>
                </p>

                <div className="p-3 rounded-2xl bg-[#F4F9FE] border border-slate-200 space-y-2">
                  <div className="flex items-start gap-2 text-slate-700">
                    <Car className="w-4 h-4 text-[#1FA855] shrink-0 mt-0.5" />
                    <span>
                      <strong>Aparcamiento & Acceso:</strong> En pleno centro de O Porriño (zona peatonal y comercial). Aparcamientos públicos cercanos y parada breve en calles adyacentes para carga y descarga.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700">
                    <Store className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
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
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#178A47] text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp de Tienda</span>
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
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center mb-3">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">Taller Propio In Situ</h3>
            <p className="text-xs text-slate-600 mt-1">
              Modistería y costura en la tienda con maquinaria para bajos exprés (preguntando antes disponibilidad en taller) y composturas.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1FA855] flex items-center justify-center mb-3">
            <Handshake className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">Punto Oficial Mimos</h3>
            <p className="text-xs text-slate-600 mt-1">
              Recepción oficial de tintorería y edredones (a nuestra central en Vigo) y alfombras (con taller especialista).
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">Aviso por WhatsApp</h3>
            <p className="text-xs text-slate-600 mt-1">
              Te notificamos en el acto cuando tus prendas pasen el control de calidad final.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">Garantía y Confianza</h3>
            <p className="text-xs text-slate-600 mt-1">
              Resguardo oficial numerado, trazabilidad de piezas y el cariño de la marca Mimos.
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
                <div className="w-9 h-9 rounded-xl bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center">
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
                  <span className="font-extrabold text-[#002147]">Lunes a Viernes</span>
                  <p className="text-[11px] text-slate-600">Jornada completa partida</p>
                </div>
                <div className="text-right font-mono font-bold text-[#002147] tabular-nums">
                  <div>10:00 – 13:30</div>
                  <div>17:00 – 20:30</div>
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
                  <span className="font-medium">Domingos y Festivos</span>
                  <p className="text-[11px] text-slate-500">Descanso del personal</p>
                </div>
                <span className="font-bold text-slate-500">Cerrado</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <CreditCard className="w-4 h-4 text-[#0F76BB] shrink-0" />
              <span><strong>Cobro disponible:</strong> Tarjeta (Contactless / Apple Pay) y Efectivo (sin Bizum).</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <ShieldCheck className="w-4 h-4 text-[#1FA855] shrink-0" />
              <span><strong>Resguardo oficial:</strong> Entrega con ticket de depósito garantizado.</span>
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
                    Maquinaria y profesionales de costura en la propia tienda de Telas y Más
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-extrabold bg-[#0F76BB] text-white">
                Servicio Exprés (bajo consulta)
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-4">
              En <strong>Telas y Más (O Porriño)</strong> dispones de una ventaja única: taller propio in situ de costura y composturas, con probador y toma de medidas directa, combinado con el servicio integral de tintorería y lavandería de Mimos sin necesidad de viajar a Vigo.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { tit: 'Bajos de pantalón exprés', desc: 'Vaquero (acabado original), traje (invisible) o casual; pregunta primero en taller si es posible según carga.' },
                { tit: 'Cambio de cremalleras', desc: 'Metálicas, espiral e invisibles en abrigos, chaquetas, faldas y anoraks.' },
                { tit: 'Ajuste de vestidos y trajes', desc: 'Entallar silueta, estrechar costados, subir tirantes y ajustar hombros.' },
                { tit: 'Venta experta de telas', desc: 'Amplio catálogo de telas por metros, retales y asesoramiento en costura.' },
                { tit: 'Cortinas, estores y hogar', desc: 'Confección a medida, corte de altura, cinta fruncidora y dobladillos.' },
                { tit: 'Zurcidos y composturas', desc: 'Reparación de descosidos, rotos, botones, corchetes y refuerzos.' },
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
            <div className="mt-5 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs text-slate-700 font-medium">
                ¿Quieres ver todas las prendas y soluciones de costura?
              </span>
              <a
                href="/arreglos-de-ropa-vigo"
                onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                className="min-h-[44px] inline-flex items-center gap-1 text-xs font-bold text-[#0F76BB] hover:underline"
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
            <span className="px-2.5 py-1 rounded-md text-xs font-black bg-[#EDF5FD] text-[#0F76BB]">
              Catálogo de Mostrador
            </span>
            <span className="text-xs font-bold text-slate-600">100% Confirmado en O Porriño</span>
          </div>
          <h2 id="seccion-servicios" className="text-xl sm:text-2xl font-black text-[#002147] tracking-tight">
            Todos los Servicios de Tintorería y Lavandería en Telas y Más
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-1">
            Recepción directa en mostrador para particulares, familias, profesionales y empresas de O Porriño y comarca de A Louriña. Sin esperas y con asesoramiento técnico personalizado.
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
                Tratamiento especializado para trajes de caballero y sastre, americanas, abrigos de paño, lanas nobles, gabardinas y vestidos de fiesta, comunión y novias con pedrería delicada.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Desmanchado artesanal previo a mano en central</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Planchado con prensa de vapor y entrega en percha</span>
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
                Lavado e higienización térmica de edredones de plumón, pluma natural y fibras sintéticas. Secado controlado para devolver el volumen mullido original sin apelmazar el relleno.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Tratamiento bactericida y antiácaros higiénico</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Opción de envasado al vacío para guardar en armario</span>
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
                  Punto Receptor de Alfombras
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Recepción directa de alfombras de lana, seda, fibras sintéticas, pelo largo y kilims. Medición exacta en el mostrador y gestión con taller especialista colaborador.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Desempolvado mecánico profundo y lavado plano</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Dejas tu alfombra en O Porriño sin desplazarte a Vigo</span>
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
                Ahorra tiempo semanal con nuestro servicio por kilos para ropa de uso diario, toallas y sábanas. Planchado profesional de camisas con cuello y puño perfecto.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Camisas en percha con funda o dobladas para viaje</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Coladas higienizadas con detergentes dermatológicos</span>
              </li>
            </ul>
          </div>

          {/* Tarjeta 5: Costura, Telas y Arreglos */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                  <Scissors className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147]">
                  Taller de Modistería & Costura
                </h3>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Servicio directo de arreglos en la propia tienda de O Porriño: bajos de pantalón, cremalleras, composturas, arreglos de trajes y venta de tejidos y telas al corte.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Toma de medidas in situ y probador en tienda</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Arreglos rápidos y acabado profesional garantizado</span>
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
                ¿Prefieres dejar tus prendas en Telas y Más pero que te las llevemos a casa cuando estén listas? Podemos coordinar la entrega en cualquier dirección de O Porriño o Vigo con nuestro furgón.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Franjas horarias concertadas por WhatsApp</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Ideal para alfombras o lotes de ropa de invierno</span>
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
              <Calendar className="w-4 h-4 text-[#0F76BB]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB]">
                Planificación Transparente
              </span>
            </div>
            <h2 id="seccion-plazos" className="text-lg sm:text-xl font-black text-[#002147]">
              Plazos Orientativos de Entrega en Telas y Más (O Porriño)
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
                  Taller de costura in situ en Telas y Más.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Trajes de chaqueta, americanas y vestidos
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">48 a 72 horas</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#EDF5FD] text-[#0F76BB] border border-[#0F76BB]/20 tabular-nums">
                    24h a 48h bajo consulta
                  </span>
                </td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Desmanchado a mano y planchado artesanal en central.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Edredones nórdicos y mantas de invierno
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">3 a 5 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-600">Según carga de secado</td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Secado lento para esponjar plumón natural.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Limpieza y restauración de alfombras
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">7 a 10 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-600">No aplicable</td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Desempolvado, lavado e higienizado completo.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Cremalleras y composturas complejas
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">3 a 5 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-600">Consultar en mostrador</td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Prueba de ajuste si es necesario.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Prendas de piel, cuero, ante y peletería
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">10 a 15 días laborables</td>
                <td className="py-3 px-3 text-[11px] text-slate-600">Tratamiento artesanal</td>
                <td className="py-3 px-3 text-[11px] text-slate-600">
                  Nutrición, teñido selectivo y secado especial.
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
            <Navigation className="w-4 h-4 text-[#0F76BB]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB]">
              Accesibilidad y Transporte
            </span>
          </div>
          <h2 id="seccion-llegar" className="text-xl sm:text-2xl font-black text-[#002147]">
            Cómo Llegar a Telas y Más en O Porriño
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Ubicación céntrica en Rúa Manuel Rodríguez, 30, en el corazón comercial de O Porriño, con accesos sencillos tanto a pie como en vehículo o transporte interurbano.
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
              Dispones de aparcamientos públicos y zonas de estacionamiento en el entorno comercial del centro urbano de O Porriño.
            </p>
            <p className="text-[11px] text-slate-600">
              Ideal para acercar alfombras o lotes de ropa con paradas breves de carga y descarga en vías adyacentes.
            </p>
          </div>

          {/* Tarjeta Autobús y Tren */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                <Bus className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147]">En Autobús y Tren</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Líneas regulares de autobús interurbano que conectan Vigo, Mos, Tui y Salceda con el centro de O Porriño.
            </p>
            <p className="text-[11px] text-slate-600">
              Estación de tren de O Porriño y paradas de bus a escasos 5-6 minutos caminando.
            </p>
          </div>

          {/* Tarjeta A Pie por el Centro Peatonal */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147]">A Pie por el Centro</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              En plena <strong>Rúa Manuel Rodríguez</strong>, la arteria peatonal y comercial más viva de O Porriño.
            </p>
            <p className="text-[11px] text-slate-600">
              Entrada sin barreras arquitectónicas a cota cero, accesible con carritos de compra o personas con movilidad reducida.
            </p>
          </div>
        </div>

        {/* Banner CTA Google Maps */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#EDF5FD] border border-[#0F76BB]/25 text-[#002147] flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-[#002147]">¿Quieres que tu navegador te guíe hasta la puerta?</h4>
            <p className="text-xs text-slate-700 tabular-nums">
              Coordenadas GPS: 42.15916, -8.621138 · Rúa Manuel Rodríguez, 30, O Porriño
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

      {/* 7. PREGUNTAS FRECUENTES (FAQ) DE TELAS Y MÁS */}
      <section aria-labelledby="seccion-faq" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-[#0F76BB]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB]">
            Respuestas Claras
          </span>
        </div>
        <h2 id="seccion-faq" className="text-xl sm:text-2xl font-black text-[#002147]">
          Preguntas Frecuentes sobre el Punto Telas y Más en O Porriño
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Todo lo que necesitas saber antes de entregar tus prendas o encargar arreglos de costura.
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

        <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-slate-700">
            <strong>¿Vives en Mos?</strong> Mos no cuenta con punto físico propio; puedes entregar sin pedido mínimo aquí en O Porriño o solicitar ruta a domicilio.
          </p>
          <a
            href="/zonas/mos"
            onClick={(e) => {
              if (onNavigate) onNavigate('/zonas/mos', e);
            }}
            className="min-h-[44px] inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-[#0F76BB] hover:underline whitespace-nowrap shrink-0"
          >
            <span>Ver servicio en Mos</span>
            <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* 8. CERCANÍA, CONFIANZA Y CONTACTO DIRECTO */}
      <section aria-labelledby="seccion-confianza" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#F4F9FE] to-[#EDF5FD] border border-slate-200 text-[#002147] shadow-sm relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-white text-[#0F76BB] border border-[#0F76BB]/25">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              La tecnología de Mimos con la atención cercana de Telas y Más
            </span>
            <h2 id="seccion-confianza" className="text-xl sm:text-2xl font-black text-[#002147]">
              Cuidado textil profesional y taller de costura en O Porriño
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              En Telas y Más (Rúa Manuel Rodríguez, 30) dispones de la experiencia combinada de modistería in situ y los procesos de tintorería e higienización más avanzados de Galicia, sin necesidad de desplazarte a Vigo.
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
