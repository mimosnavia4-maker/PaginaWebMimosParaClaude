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
  const [failedPhotos, setFailedPhotos] = useState<Record<string, boolean>>({});

  const photos = {
    fachada: {
      url: '/images/gregorio-espino/fachada-mimos-gregorio-espino-vigo.webp',
      titulo: 'Fachada Principal y Rótulo Mimos',
      subtitulo: 'Rótulo azul distintivo Tintorería Lavandería Mimos, toldos amarillos y escaparate luminoso en Gregorio Espino 42.',
      tag: 'Fachada Principal',
      detalle: 'Entrada a cota cero sin barreras arquitectónicas, con visibilidad completa desde la acera ajardinada de Alcalde Gregorio Espino.',
    },
    interior: {
      url: '/images/gregorio-espino/interior-taller-gregorio-espino-vigo.webp',
      titulo: 'Interior: Mostrador de Atención y Oso Mimos',
      subtitulo: 'Mostrador de recepción de prendas, taller de costura in situ y nuestra entrañable mascota Mimos presidiendo la tienda.',
      tag: 'Taller In Situ & Mostrador',
      detalle: 'Espacio acondicionado para atención personalizada, depósito y revisión cuidadosa de tejidos, y entrega en percha protegida.',
    },
    esquina: {
      url: '/images/gregorio-espino/escaparate-mimos-gregorio-espino-vigo.webp',
      titulo: 'Esquina Rúa do Escultor Nogueira',
      subtitulo: 'Perspectiva de la esquina con Escultor Nogueira y acceso directo a la zona de carga y descarga de vehículos.',
      tag: 'Acceso y Carga/Descarga',
      detalle: 'Ubicación ideal para detener el coche unos minutos para dejar alfombras, edredones voluminosos o lotes familiares.',
    },
  };

  const storeStatus = getStoreStatusById('gregorio-espino');
  const whatsappUrl = buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero hacer una consulta sobre la tienda propia de Gregorio Espino (Alcalde Gregorio Espino, 42, Vigo).'
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
      a: 'Para arreglos sencillos como bajos de pantalón o cremalleras comunes podemos valorar un plazo exprés, pero siempre hay que preguntar primero en tienda/taller si es posible hacerlo según la carga de trabajo de ese momento.',
    },
    {
      q: '¿Cómo me notificáis cuando las prendas están listas para recoger?',
      a: 'Te enviamos un aviso personalizado por WhatsApp o SMS en el mismo instante en que la prenda sale planchada y revisada por nuestro control de calidad. Así evitas viajes innecesarios.',
    },
    {
      q: '¿Qué métodos de pago aceptáis en la tienda de Gregorio Espino?',
      a: 'Aceptamos pago con tarjeta de crédito/débito (contactless, Apple Pay, Google Pay) y dinero en efectivo (no se acepta Bizum). Entregamos siempre resguardo oficial con IVA desglosado.',
    },
    {
      q: 'Si después no puedo desplazarme a recogerlas, ¿podéis llevármelas a casa?',
      a: 'Sí. Si por cualquier motivo prefieres que te entreguemos tus prendas limpias en tu domicilio o lugar de trabajo en Vigo, solo tienes que indicárnoslo por WhatsApp y coordinamos la entrega con nuestra furgoneta propia de reparto.',
    },
  ];

  return (
    <div className="space-y-10 animate-fadeIn text-slate-800">
      {/* Barra superior de cierre cuando se abre en modal */}
      {isModal && onClose && (
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-200 bg-[#F4F9FE]">
          <span className="text-xs font-bold text-[#002147] uppercase tracking-wider">
            Ficha de Tienda Propia · Gregorio Espino
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
              <Store className="w-10 h-10 text-[#0F76BB] mb-3" />
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
            <span className="text-xs text-slate-500">Tienda Propia Mimos · Vigo</span>
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
                  <Store className="w-10 h-10 text-[#0F76BB] mb-2" />
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
                  <Store className="w-3.5 h-3.5 text-[#0F76BB]" />
                  Tienda Propia Mimos · Taller In Situ
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
                <span>2. Mostrador & Mascota</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTabPhoto('esquina')}
                className={`flex items-center gap-2 min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  activeTabPhoto === 'esquina'
                    ? 'bg-[#0F76BB] text-white border-[#0F76BB] shadow-xs'
                    : 'bg-white text-[#002147] border-slate-300 hover:bg-[#EDF5FD]'
                }`}
              >
                <span>3. Esquina Escultor Nogueira</span>
              </button>
            </div>
          </div>

          {/* Columna Derecha: Datos Operativos y Acciones Rápidas */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-[#0F76BB] uppercase tracking-wider">
                  Sede O Calvario / Gregorio Espino
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
                  Mimos Gregorio Espino
                </h2>
              ) : (
                <h1 className="text-2xl sm:text-3xl font-black text-[#002147] tracking-tight">
                  Tintorería y Costura Mimos Gregorio Espino (Vigo)
                </h1>
              )}
              <p className="text-sm font-semibold text-slate-600 mt-0.5">
                Tintorería, Lavandería y Taller Propio de Costura
              </p>

              <div className="mt-4 space-y-2 text-xs">
                <p className="text-slate-700 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                  <span>
                    <strong>Rúa do Alcalde Gregorio Espino, 42, bajo</strong> (esquina con Rúa do Escultor Nogueira), 36205 Vigo (Pontevedra).
                  </span>
                </p>

                <div className="p-3 rounded-2xl bg-[#F4F9FE] border border-slate-200 space-y-2">
                  <div className="flex items-start gap-2 text-slate-700">
                    <Car className="w-4 h-4 text-[#1FA855] shrink-0 mt-0.5" />
                    <span>
                      <strong>Aparcamiento & Descarga:</strong> Zona reservada de carga y descarga justo en la esquina de Escultor Nogueira (a 15 metros). Estacionamiento en batería en calles colindantes.
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-700">
                    <Store className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
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
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#178A47] text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-xs transition-all"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp de Tienda</span>
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
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center mb-3">
            <Scissors className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">Taller Propio In Situ</h3>
            <p className="text-[11px] text-slate-600 mt-1">
              Modista en tienda con maquinaria industrial para arreglos express y marcaje directo.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#1FA855] flex items-center justify-center mb-3">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-[#002147]">Carga & Descarga Fácil</h3>
            <p className="text-[11px] text-slate-600 mt-1">
              Zona reservada a 15 metros en Escultor Nogueira para alfombras o bultos pesados.
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
              Te notificamos en el acto cuando tus prendas pasen el control de calidad final.
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
                  <div>09:30 – 13:30</div>
                  <div>16:30 – 20:00</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#F4F9FE] border border-slate-200 flex justify-between items-center">
                <div>
                  <span className="font-extrabold text-[#002147]">Sábados</span>
                  <p className="text-[11px] text-slate-500">Mañanas</p>
                </div>
                <span className="font-mono font-bold text-[#002147]">
                  09:30 – 13:00
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
              <span><strong>Cobro disponible:</strong> Tarjeta (Contactless / Apple Pay) y Efectivo (sin Bizum).</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-[#1FA855] shrink-0" />
              <span><strong>Resguardo oficial:</strong> Entrega con ticket de depósito garantizado.</span>
            </div>
          </div>
        </div>

        {/* Bloque 2: Taller Propio de Costura y Modistería In Situ */}
        <div className="lg:col-span-7 bg-[#EDF5FD] rounded-3xl p-6 sm:p-7 border border-[#0F76BB]/25 shadow-sm flex flex-col justify-between">
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
                    Maquinaria industrial y modista en la propia tienda de Gregorio Espino
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-black bg-white border border-[#0F76BB]/25 text-[#0F76BB]">
                <Sparkles className="w-3.5 h-3.5 text-[#0F76BB]" />
                Servicio Exprés (bajo consulta)
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed mb-4">
              A diferencia de puntos que derivan prendas fuera, en <strong>Mimos Gregorio Espino</strong> disponemos de probador para tomar medidas al momento y taller directo de confección. Te atendemos para cualquier reparación, transformación o ajuste a medida.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { tit: 'Bajos de pantalón exprés', desc: 'Vaquero (acabado original), traje (invisible) o deportivo; pregunta antes en taller si es posible según carga.' },
                { tit: 'Cambio de cremalleras', desc: 'Metálicas, espiral e invisibles en abrigos, faldas, anoraks y mochilas.' },
                { tit: 'Ajuste de vestidos y trajes', desc: 'Entallar silueta, estrechar costados, subir tirantes y ajustar hombros.' },
                { tit: 'Especialistas en cuero y piel', desc: 'Costura reforzada en ante, cuero, cazadoras moteras y bolsos.' },
                { tit: 'Cortinas, estores y hogar', desc: 'Confección a medida, corte de altura, cinta fruncidora y dobladillos.' },
                { tit: 'Bordados y personalización', desc: 'Nombres en babis escolares, toallas, batas y uniformes laborales.' },
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
                ¿Quieres ver todas las prendas y soluciones de costura?
              </span>
              <a
                href="/arreglos-de-ropa-vigo"
                onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                className="inline-flex items-center gap-1 min-h-[44px] text-xs font-bold text-[#0F76BB] hover:underline"
              >
                <span>Ver sección completa de Arreglos de Ropa</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 4. GUÍA COMPLETA DE SERVICIOS DISPONIBLES EN ESTA TIENDA */}
      <section aria-labelledby="seccion-servicios" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-black bg-[#EDF5FD] text-[#0F76BB]">
              Catálogo de Mostrador
            </span>
            <span className="text-xs font-bold text-slate-500">100% Confirmado en Gregorio Espino</span>
          </div>
          <h2 id="seccion-servicios" className="text-xl sm:text-2xl font-black text-[#002147] tracking-tight">
            Todos los Servicios de Tintorería y Lavandería en la Tienda
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl mt-1">
            Recepción directa en mostrador para particulares, familias, profesionales y empresas. Sin esperas y con asesoramiento técnico personalizado.
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
                Tratamiento especializado para trajes de caballero y sastre, americanas, abrigos de paño, lanas nobles, gabardinas y vestidos de fiesta, comunión y novias con pedrería delicada.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Desmanchado artesanal previo a mano</span>
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
              <p className="text-xs text-slate-600 leading-relaxed">
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
              <p className="text-xs text-slate-600 leading-relaxed">
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
                <span>Carga y descarga en Escultor Nogueira para tu comodidad</span>
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
              <p className="text-xs text-slate-600 leading-relaxed">
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

          {/* Tarjeta 5: Prendas de Piel, Ante y Cuero */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-extrabold text-[#002147]">
                  Piel, Cuero y Ante Noble
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nutrición y reengrase de cazadoras de cuero, abrigos de mouton, ante y serraje. Reparación de desgarros y tintura selectiva para recuperar el color y la flexibilidad natural.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-1 border-t border-slate-200 pt-3">
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Peletería artesana con productos libres de solventes agresivos</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#1FA855] shrink-0" />
                <span>Tratamiento hidrófugo antimanchas opcional</span>
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
              <p className="text-xs text-slate-600 leading-relaxed">
                ¿Prefieres dejar tus prendas en Gregorio Espino pero que te las llevemos a casa cuando estén listas? Podemos coordinar la entrega en cualquier dirección de Vigo con nuestro furgón.
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
              Plazos Orientativos de Entrega en Gregorio Espino
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
                <td className="py-3 px-3 text-xs text-slate-600">
                  Taller in situ en la propia tienda.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Trajes de chaqueta, americanas y vestidos
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">48 a 72 horas</td>
                <td className="py-3 px-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#EDF5FD] text-[#0F76BB] border border-[#0F76BB]/20">
                    24h a 48h bajo consulta
                  </span>
                </td>
                <td className="py-3 px-3 text-xs text-slate-600">
                  Desmanchado a mano y planchado artesanal.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Edredones nórdicos y mantas de invierno
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">3 a 5 días laborables</td>
                <td className="py-3 px-3 text-xs text-slate-600">Según carga de secado</td>
                <td className="py-3 px-3 text-xs text-slate-600">
                  Secado lento para esponjar plumón natural.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Limpieza y restauración de alfombras
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">7 a 10 días laborables</td>
                <td className="py-3 px-3 text-xs text-slate-600">No aplicable</td>
                <td className="py-3 px-3 text-xs text-slate-600">
                  Desempolvado, lavado e higienizado completo.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Cremalleras y arreglos complejos de sastre
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">3 a 5 días laborables</td>
                <td className="py-3 px-3 text-xs text-slate-600">Consultar en mostrador</td>
                <td className="py-3 px-3 text-xs text-slate-600">
                  Prueba de ajuste si es necesario.
                </td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-[#002147]">
                  Prendas de piel, cuero, ante y peletería
                </td>
                <td className="py-3 px-3 text-slate-700 font-semibold tabular-nums">10 a 15 días laborables</td>
                <td className="py-3 px-3 text-xs text-slate-600">Tratamiento artesanal</td>
                <td className="py-3 px-3 text-xs text-slate-600">
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
            Cómo Llegar a Mimos Gregorio Espino en Vigo
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Ubicación céntrica entre Martínez Garrido y la peatonal del Calvario con accesos sencillos tanto a pie como en coche o transporte público.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tarjeta Coche y Carga/Descarga */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1FA855] text-white flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147]">En Coche Particular</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dispones de una <strong>zona de carga y descarga</strong> autorizada en Rúa do Escultor Nogueira, justo al doblar la esquina de la tienda.
            </p>
            <p className="text-xs text-slate-600">
              Ideal si traes edredones o alfombras: paras a 15 metros de la entrada y nuestro equipo te ayuda a descargar.
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
              Líneas urbanas verificadas con paso directo por Alcalde Gregorio Espino:
            </p>
            <div className="flex flex-wrap gap-1.5">
              {['4C', 'H2', '23', 'N4 (nocturna)'].map((linea) => (
                <span key={linea} className="px-2 py-0.5 rounded-md text-[11px] font-mono font-bold bg-white border border-slate-300 text-[#002147]">
                  {linea}
                </span>
              ))}
            </div>
            <p className="text-xs text-slate-600">
              Parada a menos de 2 minutos caminando del número 42. Consulta horarios en{' '}
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

          {/* Tarjeta A Pie desde O Calvario */}
          <div className="p-5 rounded-2xl bg-[#F7F6F2] border border-slate-200 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F76BB] text-white flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-extrabold text-[#002147]">A Pie desde O Calvario</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              A escasos <strong>300 metros de la peatonal del Calvario</strong> y del Mercado Municipal de O Calvario.
            </p>
            <p className="text-xs text-slate-600">
              Acera amplia y llana con paseo arbolado frente al escaparate, con acceso fácil para carritos de bebé o personas de movilidad reducida.
            </p>
          </div>
        </div>

        {/* Banner CTA Google Maps */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#EDF5FD] border border-[#0F76BB]/25 text-[#002147] flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-[#002147]">¿Quieres que tu navegador te guíe hasta la puerta?</h4>
            <p className="text-xs text-slate-600 tabular-nums">
              Coordenadas GPS: 42.22836, -8.707589 · Alcalde Gregorio Espino, 42, Vigo
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

      {/* 7. PREGUNTAS FRECUENTES (FAQ) DE LA TIENDA GREGORIO ESPINO */}
      <section aria-labelledby="seccion-faq" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <HelpCircle className="w-4 h-4 text-[#0F76BB]" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#0F76BB]">
            Respuestas Claras
          </span>
        </div>
        <h2 id="seccion-faq" className="text-xl sm:text-2xl font-black text-[#002147]">
          Preguntas Frecuentes sobre la Tienda de Gregorio Espino
        </h2>
        <p className="text-xs sm:text-sm text-slate-600">
          Todo lo que necesitas saber antes de venir o entregar tus prendas.
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

      {/* 8. EL OSO MIMOS Y ATENCIÓN CERCANA DE CONFIANZA */}
      <section aria-labelledby="seccion-confianza" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#F4F9FE] to-[#EDF5FD] border border-slate-200 text-[#002147] shadow-sm relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold bg-white text-[#0F76BB] border border-[#0F76BB]/25">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              Más de 15 años cuidando los textiles de Vigo
            </span>
            <h2 id="seccion-confianza" className="text-xl sm:text-2xl font-black text-[#002147]">
              Cuidado profesional con el trato cercano de toda la vida
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              En nuestra tienda de Alcalde Gregorio Espino 42 no eres un número de orden. Nuestro equipo y nuestra mascota, el <strong>Oso Mimos</strong>, te reciben en mostrador para asesorarte sobre cómo quitar esa mancha difícil, coger el bajo justo a tu medida o renovar tus edredones y alfombras para el invierno.
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
              <span>Consultar ahora con Mimo</span>
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
