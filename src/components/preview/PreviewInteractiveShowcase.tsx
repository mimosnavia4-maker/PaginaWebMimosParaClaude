import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  ArrowUpRight,
  Shirt,
  Sofa,
  Layers,
  Scissors,
  Sparkles,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { IMAGES, buildMimoWhatsAppUrl } from '../../data/mimosData';
import { trackWhatsAppClick } from '../../utils/analytics';
import limpiezaSofasImg from '../../assets/images/limpieza_sofas_domicilio_1794599721481.jpg';

interface PreviewInteractiveShowcaseProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface CareCategory {
  id: string;
  shortTitle: string;
  tagline: string;
  fullTitle: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  imageAlt: string;
  pageHref: string;
  pageLabel: string;
  defaultQuery: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CARE_CATEGORIES: CareCategory[] = [
  {
    id: 'tintoreria',
    shortTitle: 'Prendas y ceremonia',
    tagline: 'Trajes, vestidos, abrigos y Wet Cleaning',
    fullTitle: 'Tintorería individualizada prenda a prenda en Vigo',
    description:
      'Revisamos etiquetas, botones y fibras antes de tratar cada prenda. Desde trajes de diario hasta vestidos de fiesta, comunión, novia, seda o lana.',
    highlights: [
      'Wet Cleaning ecológico para fibras sensibles o estructura sastre',
      'Desmanchado localizado previo y planchado artesanal por vapor',
      'Entrega en percha protegida con aviso automático por WhatsApp',
    ],
    imageUrl: IMAGES.servicioTintoreria,
    imageAlt: 'Prendas de vestir y trajes tratados en Tintorería Mimos Vigo',
    pageHref: '/tintoreria-vigo',
    pageLabel: 'Ver servicio de tintorería',
    defaultQuery: 'limpiar un traje, vestido de fiesta o prenda delicada',
    icon: Shirt,
  },
  {
    id: 'sofas',
    shortTitle: 'Sofás y tapicerías',
    tagline: 'En tu domicilio · Secado natural al aire',
    fullTitle: 'Limpieza profesional de sofás, butacas y colchones en casa',
    description:
      'Nos desplazamos a tu vivienda o alojamiento en Vigo con maquinaria de inyección-extracción controlada, sin mover muebles ni aplicar métodos agresivos.',
    highlights: [
      'Sin vapor en seco, sin productos enzimáticos y sin ventiladores de secado',
      'Aclarado técnico para evitar cercos tras el secado natural al aire',
      'Valoración ágil enviando una foto de tu sofá o chaise longue por WhatsApp',
    ],
    imageUrl: limpiezaSofasImg,
    imageAlt: 'Limpieza de sofá tapizado a domicilio en Vigo con inyección-extracción',
    pageHref: '/limpieza-sofas-vigo',
    pageLabel: 'Ver proceso de sofás a domicilio',
    defaultQuery: 'limpiar un sofá o tapicería a domicilio en Vigo',
    icon: Sofa,
  },
  {
    id: 'alfombras',
    shortTitle: 'Alfombras y flecos',
    tagline: 'Recogida en casa + lavado plano y taller',
    fullTitle: 'Limpieza profunda y restauración de alfombras en Navia',
    description:
      'Recogemos tu alfombra en casa o la recibimos en tienda. Aplicamos aspirado previo, lavado plano por tipo de fibra, secado en ambiente controlado y costura.',
    highlights: [
      'Lana, seda, yute, viscosa, fibras sintéticas y kilims',
      'Taller propio para reponer flecos, ribetes y reforzar bordes',
      'Devolución enrollada y protegida lista para volver a colocar',
    ],
    imageUrl: IMAGES.alfombrasMimos,
    imageAlt: 'Limpieza e higienización de alfombras en instalaciones de Tintorería Mimos',
    pageHref: '/limpieza-alfombras-vigo',
    pageLabel: 'Ver servicio de alfombras',
    defaultQuery: 'limpiar o reparar flecos de una alfombra',
    icon: Layers,
  },
  {
    id: 'costura',
    shortTitle: 'Costura y 18 arreglos',
    tagline: 'Talleres propios in situ + puntos con costura',
    fullTitle: 'Modistería profesional: bajos, cremalleras, tallas y cortinas',
    description:
      'Atendemos tus arreglos en nuestros talleres propios de Gregorio Espino y Venezuela, recepción en Navia y puntos colaboradores de Gondomar, Ponteareas y O Porriño.',
    highlights: [
      'Bajos en pantalón vaquero, de vestir o invisible, y cambio de cremalleras',
      'Estrechar, ensanchar, ajustes de cintura, hombros, mangas y zurcidos',
      'Prendas de piel, servicio express bajo disponibilidad y confección hogar',
    ],
    imageUrl: IMAGES.arreglosRopa,
    imageAlt: 'Taller de costura y arreglos de ropa de Tintorería Mimos en Vigo',
    pageHref: '/arreglos-de-ropa-vigo',
    pageLabel: 'Explorar los 18 arreglos',
    defaultQuery: 'un arreglo de costura o compostura de ropa',
    icon: Scissors,
  },
  {
    id: 'colada',
    shortTitle: 'Colada y planchado',
    tagline: 'Lavado, secado, doblado o solo plancha',
    fullTitle: 'Colada familiar y solo planchado para ganar horas cada semana',
    description:
      'Delega el lavado semanal de sábanas, toallas y ropa de diario, o tráenos únicamente tus camisas y pantalones para un planchado con prensa profesional.',
    highlights: [
      'Clasificación por color y temperatura para evitar mezclas ni tintes',
      'Opción de entrega doblada lista para armario o en percha',
      'Sin pedido mínimo en nuestras 3 tiendas propias y 5 puntos',
    ],
    imageUrl: '/images/colaboradores/paso-3-taller-tintoreria.webp',
    imageAlt: 'Centro de lavado, secado y planchado profesional de Tintorería Mimos',
    pageHref: '/colada-familiar-vigo',
    pageLabel: 'Ver colada familiar y plancha',
    defaultQuery: 'colada familiar semanal o planchado de camisas',
    icon: Sparkles,
  },
  {
    id: 'pieles',
    shortTitle: 'Piel, cuero y nobuk',
    tagline: 'Cazadoras, doble faz y piel natural',
    fullTitle: 'Tratamiento especializado de cuero, ante y peletería',
    description:
      'Las prendas de piel requieren hidratación, conservación de color y limpieza controlada que preserve su suavidad natural sin resecar ni encoger.',
    highlights: [
      'Diagnóstico visual previo de roces, pigmentación y forro interior',
      'Nutrición posterior para recuperar elasticidad en cuero liso y napa',
      'También reparamos cremalleras, forros y ajustes en cuero',
    ],
    imageUrl: '/images/navia/mostrador-recepcion-mimos-navia-vigo.webp',
    imageAlt: 'Recepción y diagnóstico técnico de prendas especiales y pieles en Mimos Navia',
    pageHref: '/limpieza-pieles-cuero-vigo',
    pageLabel: 'Ver limpieza de pieles',
    defaultQuery: 'limpiar o hidratar una cazadora de cuero, ante o piel',
    icon: ShieldCheck,
  },
];

export const PreviewInteractiveShowcase: React.FC<PreviewInteractiveShowcaseProps> = ({
  onNavigate,
}) => {
  const [selectedId, setSelectedId] = useState<string>(CARE_CATEGORIES[1].id);
  const [customNote, setCustomNote] = useState('');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const activeCategory =
    CARE_CATEGORIES.find((c) => c.id === selectedId) ?? CARE_CATEGORIES[0];

  const preparedMessage = customNote.trim()
    ? `Hola, Mimo. Quiero consultar para ${activeCategory.defaultQuery}. Detalles: ${customNote.trim()}.`
    : `Hola, Mimo. Quiero consultar tarifa y disponibilidad para ${activeCategory.defaultQuery}.`;

  const whatsappHref = buildMimoWhatsAppUrl(preparedMessage);

  return (
    <section
      id="que-necesitas"
      aria-labelledby="preview-showcase-heading"
      className="py-18 lg:py-26 bg-white dark:bg-[#071324] border-b border-slate-200/70 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera limpia de sección */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12"
        >
          <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-2">
            Selector guiado · Elige tu necesidad
          </p>
          <h2
            id="preview-showcase-heading"
            className="text-3xl sm:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance mb-3"
          >
            ¿Qué necesitas cuidar hoy?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Toca una especialidad para ver cómo trabajamos ese tejido y preparar tu consulta directa con Mimo.
          </p>
        </motion.div>

        {/* Selector en cascada progresiva (estilo SOJO / Poplin) + Vitrina dinámica */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Izquierda (5 cols): 6 opciones que entran en cascada secuencial */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {CARE_CATEGORIES.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = activeCategory.id === item.id;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.35,
                    delay: idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`relative w-full text-left p-4 rounded-2xl transition-all duration-200 cursor-pointer flex items-center gap-3.5 ${
                    isSelected
                      ? 'text-white'
                      : 'bg-slate-50/80 dark:bg-[#0b1d36] text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-[#112645]'
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="active-care-category-bg"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      className="absolute inset-0 rounded-2xl bg-[#002147] dark:bg-[#0F76BB] shadow-sm"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-white/15 text-white'
                        : 'bg-white dark:bg-[#071324] text-[#0F76BB] dark:text-[#60B5F6]'
                    }`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div className="relative z-10 min-w-0">
                    <p className="text-sm sm:text-base font-extrabold leading-tight">
                      {item.shortTitle}
                    </p>
                    <p
                      className={`text-xs mt-0.5 truncate ${
                        isSelected
                          ? 'text-slate-200'
                          : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {item.tagline}
                    </p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Derecha (7 cols): Vitrina viva con foto grande + detalle + consultor */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.article
                key={activeCategory.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-3xl bg-[#F4F7FB] dark:bg-[#0b1d36] overflow-hidden"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#002147]">
                  {!failedImages[activeCategory.id] ? (
                    <img
                      src={activeCategory.imageUrl}
                      alt={activeCategory.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [activeCategory.id]: true,
                        }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white font-bold p-6 text-center">
                      {activeCategory.fullTitle}
                    </div>
                  )}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#001530]/80 via-transparent to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  <p className="absolute bottom-4 left-6 right-6 text-white text-xs sm:text-sm font-bold">
                    {activeCategory.tagline}
                  </p>
                </div>

                <div className="p-6 sm:p-8 lg:p-10 space-y-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white tracking-tight mb-2.5">
                      {activeCategory.fullTitle}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                      {activeCategory.description}
                    </p>
                  </div>

                  <ul className="space-y-2.5 text-sm text-slate-700 dark:text-slate-200 border-t border-slate-200/80 dark:border-slate-700/60 pt-5">
                    {activeCategory.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-[#0F76BB] dark:bg-[#60B5F6] mt-2 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Mini personalización instantánea de consulta */}
                  <div className="rounded-2xl bg-white dark:bg-[#071324] p-4 sm:p-5 space-y-3 border border-slate-200/70 dark:border-slate-800">
                    <label
                      htmlFor="showcase-custom-note"
                      className="block text-xs font-bold text-slate-600 dark:text-slate-300"
                    >
                      Añade detalle opcional (plazas, tipo de prenda, barrio...):
                    </label>
                    <input
                      id="showcase-custom-note"
                      type="text"
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      placeholder="Ej.: sofá 3 plazas en Navia, vestido seda, bajo vaquero..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#0b1d36] border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    />

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackWhatsAppClick('/preview-portada', 'guided_showcase', {
                            service_id: activeCategory.id,
                          })
                        }
                        className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3 rounded-xl transition-all active:scale-[0.98]"
                      >
                        <Send className="w-4 h-4" aria-hidden="true" />
                        <span>Consultar con Mimo por WhatsApp</span>
                      </a>

                      <a
                        href={activeCategory.pageHref}
                        onClick={(e) => onNavigate(activeCategory.pageHref, e)}
                        className="inline-flex items-center gap-1 text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline"
                      >
                        <span>{activeCategory.pageLabel}</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
