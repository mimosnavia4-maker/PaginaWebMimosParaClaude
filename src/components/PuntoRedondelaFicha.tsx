import React, { useState } from 'react';
import { Dialog } from './Dialog';
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Sparkles,
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
  ChevronDown,
  ChevronUp,
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
  derivarEtiquetasServicios,
} from '../data/mimosData';
import { getStoreStatusById } from '../utils/storeStatus';

interface PuntoRedondelaFichaProps {
  onNavigate?: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  isModal?: boolean;
  onClose?: () => void;
}

export const PuntoRedondelaFicha: React.FC<PuntoRedondelaFichaProps> = ({
  onNavigate,
  isModal = false,
  onClose,
}) => {
  const punto: PuntoRegistro =
    REGISTROS_PUNTOS.find((p: PuntoRegistro) => p.id === 'punto-redondela') ??
    REGISTROS_PUNTOS[2];

  const [activeTabPhoto, setActiveTabPhoto] = useState<'fachada1' | 'interior' | 'fachada2'>('fachada1');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);

  const photos = {
    fachada1: {
      url: '/images/mimos-redondela/fachada-mimos-redondela.jpg',
      titulo: 'Fachada Principal y Rótulo Oficial',
      subtitulo: 'Entrada comercial de Mimos Redondela en C/ José Regojo, 29 bajo.',
      tag: 'Fachada Principal',
      detalle:
        'Entrada directa a cota cero en el casco urbano de Redondela. Punto colaborador oficial de Tintorería Mimos con recepción y entrega de todo tipo de prendas y textiles del hogar.',
    },
    interior: {
      url: '/images/mimos-redondela/interior-mostrador-mimos-redondela.jpg',
      titulo: 'Interior: Mostrador de Atención y Recepción',
      subtitulo: 'Mostrador de recepción y entrega de prendas atendido por profesionales.',
      tag: 'Interior & Mostrador',
      detalle:
        'Espacio higienizado, ordenado y acondicionado para la recepción, revisión y custodia de tus prendas con total garantía y mimo.',
    },
    fachada2: {
      url: '/images/mimos-redondela/escaparate-acceso-mimos-redondela.jpg',
      titulo: 'Perspectiva Exterior y Acceso Peatonal',
      subtitulo: 'Escaparate y visibilidad comercial en C/ José Regojo (Redondela).',
      tag: 'Perspectiva y Calle',
      detalle:
        'Ubicación céntrica y cómoda para dejar o recoger tus prendas de tintorería y lavandería sin desplazarte hasta Vigo.',
    },
  };

  const storeStatus = getStoreStatusById('punto-redondela');
  const whatsappUrl = buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero hacer una consulta sobre el punto colaborador de Mimos Redondela en C/ José Regojo, 29 bajo.'
  );
  const mapsUrl = buildGoogleMapsUrl(punto);

  const handleShare = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(window.location.origin + '/zonas/redondela')
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
      q: '¿Cómo funciona la entrega de ropa para Tintorería Mimos en Redondela?',
      a: 'Depositas tus prendas (trajes, vestidos de fiesta o comunión, abrigos, edredones, mantas, alfombras o colada familiar) en nuestro punto colaborador de C/ José Regojo, 29 bajo en Redondela. Se te entrega tu resguardo oficial y nuestra furgoneta propia traslada las prendas a la central de Mimos en Navia (Vigo) para su tratamiento profesional, devolviéndolas listas y precintadas.',
    },
    {
      q: '¿Cuál es el horario de atención en Mimos Redondela?',
      a: 'Mimos Redondela atiende de lunes a viernes de 10:00 a 13:30 y de 17:00 a 20:00, y los sábados de 10:00 a 13:00, lo que permite conciliar la entrega y recogida con tu rutina diaria.',
    },
    {
      q: '¿Se pueden entregar edredones grandes y alfombras?',
      a: 'Sí, recibimos edredones sintéticos y de plumón natural, cortinas, mantas y alfombras de cualquier medida. Se transportan y procesan en nuestra planta con desinfección y secado controlado.',
    },
    {
      q: '¿Los precios de tintorería son los mismos que en Vigo?',
      a: 'Exactamente los mismos. La tarifa oficial de Tintorería Mimos es idéntica en toda nuestra red de tiendas y puntos colaboradores, sin recargos por gestión ni transporte.',
    },
    {
      q: '¿Puedo solicitar entrega a domicilio si luego no puedo pasar a recoger?',
      a: 'Sí. Puedes escribir a Mimo por WhatsApp al 655 536 844 y coordinar la entrega directa en tu domicilio o lugar de trabajo en Redondela o alrededores.',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn text-slate-800 dark:text-slate-100">
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

      {/* Lightbox / Visor de Fotos a Pantalla Completa con Dialog accesible */}
      <Dialog
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        ariaLabel="Visor de fotografía a pantalla completa de Mimos Redondela"
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
            <span className="text-xs text-slate-400">
              Punto Colaborador Oficial Mimos · Redondela
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold">{photos[activeTabPhoto].titulo}</h4>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">{photos[activeTabPhoto].subtitulo}</p>
          <p className="text-xs text-slate-400 mt-2 border-t border-slate-800 pt-2">
            {photos[activeTabPhoto].detalle}
          </p>
        </div>
      </Dialog>

      {/* 1. CABECERA CON FOTOGRAFÍAS REALES Y ACCIONES RÁPIDAS */}
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
                  Punto Colaborador Oficial Mimos
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
                <Store className="w-3.5 h-3.5" />
                <span>1. Fachada</span>
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
                <Sparkles className="w-3.5 h-3.5" />
                <span>2. Interior y Mostrador</span>
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
                <MapPin className="w-3.5 h-3.5" />
                <span>3. Perspectiva Exterior</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Datos Clave, Estado en Vivo y Botones de Contacto */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                    storeStatus.isOpen
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                      : 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      storeStatus.isOpen ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                    }`}
                  />
                  {storeStatus.isOpen ? 'Abierto ahora' : 'Cerrado en este momento'}
                </span>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0F76BB] dark:hover:text-[#60B5F6] transition-colors cursor-pointer"
                  title="Copiar enlace de esta ficha"
                >
                  {copiedShare ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Compartir</span>
                    </>
                  )}
                </button>
              </div>

              {isModal ? (
                <h3
                  id="modal-ficha-titulo"
                  className="text-2xl sm:text-3xl font-black text-[#002147] dark:text-white tracking-tight"
                >
                  Mimos Redondela
                </h3>
              ) : (
                <h1 className="text-2xl sm:text-3xl font-black text-[#002147] dark:text-white tracking-tight">
                  Servicio de tintorería y lavandería Mimos en Redondela
                </h1>
              )}

              <p className="text-sm font-semibold text-[#0F76BB] dark:text-[#60B5F6] mt-0.5">
                Mimos Redondela · Punto Colaborador Oficial de Tintorería y Lavandería
              </p>

              <div className="mt-5 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {punto.direccion}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      36800 Redondela (Pontevedra)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">
                      L-V: 10:00-13:30 y 17:00-20:00 · Sáb: 10:00-13:00
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {storeStatus.statusText}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                  <div>
                    <a
                      href={`tel:+34${punto.telefono}`}
                      className="font-bold text-slate-900 dark:text-white hover:text-[#0F76BB] transition-colors tabular-nums"
                    >
                      {punto.telefonos_mostrados}
                    </a>
                    <span className="text-xs text-slate-400 ml-1.5">(Atención telefónica del punto)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                    Precios oficiales y garantía Mimos sin sobrecoste alguno
                  </span>
                </div>
              </div>
            </div>

            {/* Botones de acción directa */}
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-extrabold text-sm px-4 py-3 rounded-xl shadow-md transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Consultar por WhatsApp con Mimo</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:+34${punto.telefono}`}
                  className="inline-flex items-center justify-center gap-1.5 bg-[#002147] hover:bg-[#0a3161] text-white text-xs font-bold px-3 py-2.5 rounded-xl transition-colors text-center"
                >
                  <Phone className="w-4 h-4" />
                  <span>Llamar al punto</span>
                </a>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold px-3 py-2.5 rounded-xl transition-colors text-center"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BLOQUE DE SERVICIOS CONFIRMADOS Y HORARIOS DETALLADOS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Servicios Confirmados */}
        <div className="md:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <Sparkles className="w-5 h-5 text-[#0F76BB]" />
            <h3 className="text-lg sm:text-xl font-black text-[#002147] dark:text-white">
              Servicios Oficiales Disponibles en Redondela
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5">
            Deja y recoge tus prendas en el punto de Redondela. Todas son tratadas en nuestras instalaciones de Vigo con las mismas tarifas y garantías:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {derivarEtiquetasServicios(punto.servicios_confirmados).map((serv, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  {serv}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#0F76BB] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-0.5">Ruta de transporte y entrega directa</p>
              <p>
                Nuestra furgoneta propia recoge y entrega prendas con regularidad semanal en Redondela. Recibirás aviso cuando tus prendas estén listas en el punto.
              </p>
            </div>
          </div>
        </div>

        {/* Horarios Detallados */}
        <div className="md:col-span-5 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <Clock className="w-5 h-5 text-[#0F76BB]" />
            <h3 className="text-lg sm:text-xl font-black text-[#002147] dark:text-white">
              Horario de Atención
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            Horario oficial de atención comercial en C/ José Regojo, 29 bajo:
          </p>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Lunes a Viernes</span>
              <span className="font-bold text-[#002147] dark:text-white text-right">
                10:00–13:30 / 17:00–20:00
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Sábados</span>
              <span className="font-bold text-[#002147] dark:text-white text-right">
                10:00–13:00
              </span>
            </div>
            <div className="flex justify-between items-center py-2 text-slate-400">
              <span>Domingos y festivos</span>
              <span className="font-semibold text-right">Cerrado</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
            <p>
              <strong>Ubicación:</strong> C/ José Regojo, 29 bajo, 36800 Redondela.
            </p>
            <p className="mt-1">
              <strong>Teléfono:</strong> 613 62 47 24
            </p>
          </div>
        </div>
      </div>

      {/* 3. PREGUNTAS FRECUENTES DE REDONDELA */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2.5 mb-6">
          <HelpCircle className="w-5 h-5 text-[#0F76BB]" />
          <h3 className="text-lg sm:text-xl font-black text-[#002147] dark:text-white">
            Preguntas Frecuentes sobre el Punto de Redondela
          </h3>
        </div>

        <div className="space-y-3">
          {preguntasFrecuentes.map((item, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between gap-4 p-4 text-left font-bold text-sm text-[#002147] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <span>{item.q}</span>
                {faqAbierta === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#0F76BB] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {faqAbierta === idx && (
                <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
