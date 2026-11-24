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
  const [failedPhotos, setFailedPhotos] = useState<Record<string, boolean>>({});

  const photos = {
    fachada1: {
      url: '/images/mimos-redondela/fachada-mimos-redondela.webp',
      titulo: 'Fachada Principal y Rótulo Oficial',
      subtitulo: 'Entrada comercial de Mimos Redondela en C/ José Regojo, 29 bajo.',
      tag: 'Fachada Principal',
      detalle:
        'Entrada directa a cota cero en el casco urbano de Redondela. Punto colaborador oficial de Tintorería Mimos con recepción y entrega de todo tipo de prendas y textiles del hogar.',
    },
    interior: {
      url: '/images/mimos-redondela/interior-mostrador-mimos-redondela.webp',
      titulo: 'Interior: Mostrador de Atención y Recepción',
      subtitulo: 'Mostrador de recepción y entrega de prendas atendido por profesionales.',
      tag: 'Interior & Mostrador',
      detalle:
        'Espacio higienizado, ordenado y acondicionado para la recepción, revisión y custodia de tus prendas con total garantía y mimo.',
    },
    fachada2: {
      url: '/images/mimos-redondela/escaparate-acceso-mimos-redondela.webp',
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
      a: 'Depositas tus prendas (trajes, vestidos de fiesta o comunión, abrigos, edredones, mantas, alfombras o colada familiar) en nuestro punto colaborador de C/ José Regojo, 29 bajo en Redondela. Se te entrega tu resguardo oficial y nuestra furgoneta propia traslada tus prendas y textiles del hogar a la central de Mimos en Navia (y coordina las alfombras con taller especialista colaborador), devolviéndolas listas y precintadas.',
    },
    {
      q: '¿Cuál es el horario de atención en Mimos Redondela?',
      a: 'Mimos Redondela atiende de lunes a viernes de 10:00 a 13:30 y de 17:00 a 20:00, y los sábados de 10:00 a 13:00, lo que permite conciliar la entrega y recogida con tu rutina diaria.',
    },
    {
      q: '¿Se pueden entregar edredones grandes y alfombras?',
      a: 'Sí, recibimos edredones sintéticos y de plumón natural, cortinas, mantas y alfombras (consultando dimensiones). Tratamos los edredones, mantas y cortinas en nuestra planta de Navia y gestionamos las alfombras mediante taller especialista colaborador con secado controlado.',
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
    <div className="space-y-8 animate-fadeIn text-[#002147]">
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
        ariaLabel="Visor de fotografía a pantalla completa de Mimos Redondela"
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
              Punto Colaborador Oficial Mimos · Redondela
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-bold text-[#002147]">{photos[activeTabPhoto].titulo}</h4>
          <p className="text-xs sm:text-sm text-slate-700 mt-1">{photos[activeTabPhoto].subtitulo}</p>
          <p className="text-xs text-slate-600 mt-2 border-t border-slate-200 pt-2">
            {photos[activeTabPhoto].detalle}
          </p>
        </div>
      </Dialog>

      {/* 1. CABECERA CON FOTOGRAFÍAS REALES Y ACCIONES RÁPIDAS */}
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
                  Punto Colaborador Oficial Mimos
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
                className={`flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'fachada1'
                    ? 'bg-[#0F76BB] text-white border-[#0F76BB] shadow-xs'
                    : 'bg-white text-[#002147] border-slate-300 hover:bg-[#EDF5FD]'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>1. Fachada</span>
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
                <Sparkles className="w-3.5 h-3.5" />
                <span>2. Interior y Mostrador</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('fachada2')}
                className={`flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'fachada2'
                    ? 'bg-[#0F76BB] text-white border-[#0F76BB] shadow-xs'
                    : 'bg-white text-[#002147] border-slate-300 hover:bg-[#EDF5FD]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>3. Perspectiva Exterior</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Datos Clave, Estado en Vivo y Botones de Contacto */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white border-t lg:border-t-0 lg:border-l border-slate-200">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold border ${
                    storeStatus.isOpen
                      ? 'bg-emerald-50 text-[#178A47] border-emerald-200'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {storeStatus.isOpen ? 'Abierto ahora' : 'Cerrado en este momento'}
                </span>

                <button
                  type="button"
                  onClick={handleShare}
                  className="inline-flex items-center gap-1.5 min-h-[44px] px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-[#002147] hover:bg-[#EDF5FD] transition-colors cursor-pointer"
                  title="Copiar enlace de esta ficha"
                >
                  {copiedShare ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#1FA855]" />
                      <span className="text-[#178A47] font-bold">¡Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5 text-[#0F76BB]" />
                      <span>Compartir</span>
                    </>
                  )}
                </button>
              </div>

              {isModal ? (
                <h3
                  id="modal-ficha-titulo"
                  className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight"
                >
                  Mimos Redondela
                </h3>
              ) : (
                <h1 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                  Servicio de tintorería y lavandería Mimos en Redondela
                </h1>
              )}

              <p className="text-sm font-semibold text-[#0F76BB] mt-1">
                Mimos Redondela · Punto Colaborador Oficial de Tintorería y Lavandería
              </p>

              <div className="mt-5 space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#002147]">
                      {punto.direccion}
                    </span>
                    <p className="text-xs text-slate-600">
                      36800 Redondela (Pontevedra)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#002147] tabular-nums">
                      L-V: 10:00-13:30 y 17:00-20:00 · Sáb: 10:00-13:00
                    </span>
                    <p className="text-xs text-slate-600">
                      {storeStatus.statusText}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                  <div>
                    <a
                      href={`tel:+34${punto.telefono}`}
                      className="font-bold text-[#002147] hover:text-[#0F76BB] transition-colors tabular-nums"
                    >
                      {punto.telefonos_mostrados}
                    </a>
                    <span className="text-xs text-slate-500 ml-1.5">(Atención telefónica del punto)</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#1FA855] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#178A47] font-medium">
                    Precios oficiales y garantía Mimos sin sobrecoste alguno
                  </span>
                </div>
              </div>
            </div>

            {/* Botones de acción directa */}
            <div className="pt-6 mt-6 border-t border-slate-200 space-y-2.5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 min-h-[48px] bg-[#1FA855] hover:bg-[#178A47] text-white font-extrabold text-sm px-4 py-3 rounded-xl shadow-sm transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Consultar por WhatsApp con Mimo</span>
              </a>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:+34${punto.telefono}`}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] bg-white/95 hover:bg-[#002147] text-[#002147] hover:text-white border border-[#002147] text-xs font-bold px-3 py-2.5 rounded-xl transition-colors group text-center"
                >
                  <Phone className="w-4 h-4 text-[#0F76BB] group-hover:text-white transition-colors" />
                  <span>Llamar al punto</span>
                </a>

                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] bg-[#F4F9FE] border border-slate-300 hover:bg-[#EDF5FD] text-[#002147] text-xs font-bold px-3 py-2.5 rounded-xl transition-colors text-center"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#0F76BB]" />
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
        <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <Sparkles className="w-5 h-5 text-[#0F76BB]" />
            <h3 className="text-lg sm:text-xl font-black text-[#002147]">
              Servicios Oficiales Disponibles en Redondela
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mb-5">
            Deja y recoge tus prendas en el punto de Redondela. Tus prendas y textiles del hogar son tratados en nuestras instalaciones de Vigo (y las alfombras con taller especialista colaborador) con las mismas tarifas y garantías:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {derivarEtiquetasServicios(punto.servicios_confirmados).map((serv, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F7F6F2] border border-slate-200"
              >
                <CheckCircle2 className="w-4 h-4 text-[#1FA855] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-bold text-[#002147]">
                  {serv}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-[#EDF5FD] border border-[#0F76BB]/25 text-xs text-[#002147] flex items-start gap-3">
            <Truck className="w-5 h-5 text-[#0F76BB] shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-0.5">Ruta de transporte y entrega directa</p>
              <p className="text-slate-700">
                Nuestra furgoneta propia recoge y entrega prendas con regularidad semanal en Redondela. Recibirás aviso cuando tus prendas estén listas en el punto.
              </p>
            </div>
          </div>
        </div>

        {/* Horarios Detallados */}
        <div className="md:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <Clock className="w-5 h-5 text-[#0F76BB]" />
            <h3 className="text-lg sm:text-xl font-black text-[#002147]">
              Horario de Atención
            </h3>
          </div>
          <p className="text-xs text-slate-600 mb-4">
            Horario oficial de atención comercial en C/ José Regojo, 29 bajo:
          </p>

          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="font-semibold text-slate-700">Lunes a Viernes</span>
              <span className="font-bold text-[#002147] text-right tabular-nums">
                10:00–13:30 / 17:00–20:00
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-200">
              <span className="font-semibold text-slate-700">Sábados</span>
              <span className="font-bold text-[#002147] text-right tabular-nums">
                10:00–13:00
              </span>
            </div>
            <div className="flex justify-between items-center py-2 text-slate-500">
              <span>Domingos y festivos</span>
              <span className="font-semibold text-right">Cerrado</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-1">
            <p>
              <strong>Ubicación:</strong> C/ José Regojo, 29 bajo, 36800 Redondela.
            </p>
            <p className="tabular-nums">
              <strong>Teléfono:</strong> 613 62 47 24
            </p>
          </div>
        </div>
      </div>

      {/* 3. PREGUNTAS FRECUENTES DE REDONDELA */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2.5 mb-6">
          <HelpCircle className="w-5 h-5 text-[#0F76BB]" />
          <h3 className="text-lg sm:text-xl font-black text-[#002147]">
            Preguntas Frecuentes sobre el Punto de Redondela
          </h3>
        </div>

        <div className="space-y-3">
          {preguntasFrecuentes.map((item, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full min-h-[48px] flex items-center justify-between gap-4 p-4 text-left font-bold text-sm text-[#002147] hover:bg-[#F4F9FE] transition-colors cursor-pointer"
                aria-expanded={faqAbierta === idx}
              >
                <span>{item.q}</span>
                {faqAbierta === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#0F76BB] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                )}
              </button>
              {faqAbierta === idx && (
                <div className="px-4 pb-4 pt-2 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200 bg-[#F4F9FE]">
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
