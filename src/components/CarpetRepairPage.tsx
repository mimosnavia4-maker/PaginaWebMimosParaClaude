import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  ExternalLink,
  Layers,
  MessageCircle,
  Phone,
  Ruler,
  Scissors,
  ShieldAlert,
  Sparkles,
  Store,
  Truck,
} from 'lucide-react';
import reparacionAlfombrasImg from '../assets/images/reparacion_alfombras_flecos_1794732541809.jpg';
import {
  SERVICIO_REPARACION_ALFOMBRAS_DATA,
  TIENDAS_PROPIAS,
  PUNTOS_COLABORADORES,
  RESENAS_REALES,
  CONTACT_INFO,
  IMAGES,
  ZONAS_SERVICIO,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackWhatsAppClick, trackPhoneClick } from '../utils/analytics';

interface CarpetRepairPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

const REPAIR_MODALITIES = [
  'Solo reparación (sin necesidad de limpieza previa)',
  'Limpieza en taller + reparación en el mismo encargo',
];

const REPAIR_WORK_TYPES = [
  'Flecos sueltos, rotos o desgastados en cabeceras',
  'Festón lateral, ribete o borde perimetral abierto',
  'Esquinas abiertas o descosidos entre borde y cabecera',
  'Rotura puntual, polilla o daño complejo (para valorar viabilidad)',
];

const RUG_TYPES = [
  'Lana o anudada a mano / oriental / persa',
  'Kilim, algodón o tejido plano',
  'Sintética / alfombra de salón',
  'No estoy seguro / Sin etiqueta (envío foto del frente y reverso)',
];

const DELIVERY_MODES = [
  'Entrega y recogida en Tienda Navia (C/ Teixugueiras, 11)',
  'Entrega y recogida en Tienda Venezuela (C/ Venezuela, 41)',
  'Entrega y recogida en Tienda Gregorio Espino (Avda. Gregorio Espino, 44)',
  'Quiero consultar recogida y entrega a domicilio (con Mimo)',
];

const SPEC_TO_FORM_TYPE: Record<string, string> = {
  flecos: REPAIR_WORK_TYPES[0],
  'feston-ribete': REPAIR_WORK_TYPES[1],
  'esquinas-descosidos': REPAIR_WORK_TYPES[2],
  'roturas-valoracion': REPAIR_WORK_TYPES[3],
};

export const CarpetRepairPage: React.FC<CarpetRepairPageProps> = ({ onNavigate }) => {
  const [activeSpecId, setActiveSpecId] = useState<string>(
    SERVICIO_REPARACION_ALFOMBRAS_DATA.especialidades[0].id
  );
  const [activeModeId, setActiveModeId] = useState<'solo-reparacion' | 'limpieza-mas-reparacion'>(
    'solo-reparacion'
  );
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const [modalidad, setModalidad] = useState(REPAIR_MODALITIES[0]);
  const [trabajoNecesario, setTrabajoNecesario] = useState(REPAIR_WORK_TYPES[0]);
  const [tramoAfectado, setTramoAfectado] = useState('');
  const [tipoAlfombra, setTipoAlfombra] = useState(RUG_TYPES[0]);
  const [localidad, setLocalidad] = useState('Vigo');
  const [formaEntrega, setFormaEntrega] = useState(DELIVERY_MODES[0]);
  const [notas, setNotas] = useState('');
  const [copied, setCopied] = useState(false);

  const [heroImgError, setHeroImgError] = useState(false);

  const activeSpec =
    SERVICIO_REPARACION_ALFOMBRAS_DATA.especialidades.find(
      (item) => item.id === activeSpecId
    ) ?? SERVICIO_REPARACION_ALFOMBRAS_DATA.especialidades[0];

  const activeMode =
    SERVICIO_REPARACION_ALFOMBRAS_DATA.modalidades.find(
      (item) => item.id === activeModeId
    ) ?? SERVICIO_REPARACION_ALFOMBRAS_DATA.modalidades[0];

  const visibleFaqs = showAllFaqs
    ? SERVICIO_REPARACION_ALFOMBRAS_DATA.preguntasFrecuentes
    : SERVICIO_REPARACION_ALFOMBRAS_DATA.preguntasFrecuentes.slice(0, 6);

  const buildRepairWhatsAppMessage = () => {
    const lines = [
      'Hola, Mimo. Quiero consultar la reparación o restauración de una alfombra para que la valore el restaurador.',
      `Modalidad: ${modalidad}`,
      `Trabajo necesario: ${trabajoNecesario}`,
      `Tramo o lados afectados (cm/m): ${
        tramoAfectado.trim() || 'pendiente de medir (te lo indico con la foto)'
      }`,
      `Tipo de alfombra: ${tipoAlfombra}`,
      `Localidad: ${localidad}`,
      `Entrega o recogida: ${formaEntrega}`,
    ];
    if (notas.trim()) {
      lines.push(`Observaciones: ${notas.trim()}`);
    }
    lines.push(
      'Ahora mismo te paso en este chat: 1) foto general de la alfombra, 2) primer plano del fleco/borde/daño y 3) foto del reverso.'
    );
    return lines.join('\n');
  };

  const whatsappUrl = buildMimoWhatsAppUrl(buildRepairWhatsAppMessage());

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildRepairWhatsAppMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // ignore clipboard errors
    }
  };

  const scrollToFormWithPreset = (
    specId?: string,
    mode?: 'solo-reparacion' | 'limpieza-mas-reparacion'
  ) => {
    if (specId && SPEC_TO_FORM_TYPE[specId]) {
      setTrabajoNecesario(SPEC_TO_FORM_TYPE[specId]);
    }
    if (mode === 'solo-reparacion') {
      setModalidad(REPAIR_MODALITIES[0]);
    } else if (mode === 'limpieza-mas-reparacion') {
      setModalidad(REPAIR_MODALITIES[1]);
    }
    const el = document.getElementById('consulta-reparacion-alfombra');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <main
        id="main-content"
        tabIndex={-1}
        className="focus:outline-hidden bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800"
      >
        {/* 1. HERO EDITORIAL DUAL (#002147) */}
        <section className="py-12 sm:py-16 lg:py-20 bg-[#002147] text-white border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Migas de pan" className="mb-6">
              <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-300">
                <li>
                  <a
                    href="/"
                    onClick={(e) => onNavigate('/', e)}
                    className="hover:text-white underline-offset-4 hover:underline"
                  >
                    Inicio
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <a
                    href="/limpieza-alfombras-vigo"
                    onClick={(e) => onNavigate('/limpieza-alfombras-vigo', e)}
                    className="hover:text-white underline-offset-4 hover:underline"
                  >
                    Limpieza de alfombras
                  </a>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-[#60B5F6] font-bold">Reparación de alfombras en Vigo</li>
              </ol>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <p className="text-xs sm:text-sm font-mono uppercase tracking-wider font-bold text-[#60B5F6]">
                  Solo reparación o limpieza + arreglo · Restaurador especialista colaborador
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] text-balance">
                  {SERVICIO_REPARACION_ALFOMBRAS_DATA.h1}
                </h1>

                <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                  {SERVICIO_REPARACION_ALFOMBRAS_DATA.subtituloCabecera}
                </p>

                <div className="p-4 sm:p-5 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-slate-100 leading-relaxed">
                  {SERVICIO_REPARACION_ALFOMBRAS_DATA.aclaracionOperativa}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                  <button
                    type="button"
                    onClick={() => scrollToFormWithPreset(activeSpecId, activeModeId)}
                    className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-5 sm:px-6 py-4 rounded-xl transition-colors cursor-pointer sm:whitespace-nowrap shrink-0"
                  >
                    <Camera className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>Consultar reparación con fotos</span>
                  </button>

                  <a
                    href="#puntos-entrega-reparacion"
                    className="inline-flex items-center justify-center gap-2 bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm sm:text-base px-5 sm:px-6 py-4 rounded-xl transition-colors sm:whitespace-nowrap shrink-0"
                  >
                    <Store className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>Ver tiendas y recogida</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5">
                <figure className="rounded-2xl overflow-hidden border border-white/15 bg-[#071936] shadow-lg">
                  <img
                    src={heroImgError ? IMAGES.alfombrasMimos : reparacionAlfombrasImg}
                    alt="Trabajo artesanal de remate de flecos y festón lateral sobre una alfombra tejida en mesa de restauración"
                    width={800}
                    height={600}
                    fetchPriority="high"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgError(true)}
                    className="w-full aspect-4/3 object-cover"
                  />
                  <figcaption className="p-4 text-xs text-slate-300 border-t border-white/10 leading-relaxed">
                    Remate de flecos, festón perimetral y refuerzo de esquinas valorados por restaurador especialista mediante colaborador de Tintorería Mimos.
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* 2. ESPECIALIDADES DE REPARACIÓN + MODALIDAD FLEXIBLE (#FFFFFF) */}
        <section className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            {/* 2A. Selector de modalidad: Solo reparación vs Limpieza + Reparación */}
            <div>
              <div className="max-w-3xl mb-6 space-y-1.5">
                <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  Contratación flexible según lo que necesite tu pieza
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                  Elige solo reparación o combina limpieza + arreglo en un viaje
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-5 flex flex-col gap-3">
                  {SERVICIO_REPARACION_ALFOMBRAS_DATA.modalidades.map((mode) => {
                    const isSelected = mode.id === activeModeId;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setActiveModeId(mode.id)}
                        className={`text-left p-5 rounded-2xl border-2 transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-[#002147] dark:border-[#60B5F6] bg-[#F4F7FB] dark:bg-[#0b1d36]'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] hover:border-[#0F76BB]'
                        }`}
                      >
                        <p className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                          {mode.etiqueta}
                        </p>
                        <p className="text-base sm:text-lg font-extrabold text-[#002147] dark:text-white">
                          {mode.titulo}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="lg:col-span-7">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeMode.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                      className="h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-[#002147] text-white p-6 sm:p-8 flex flex-col justify-between space-y-5"
                    >
                      <div className="space-y-3">
                        <p className="text-xs font-mono font-bold text-[#60B5F6]">
                          {activeMode.etiqueta}
                        </p>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                          {activeMode.titulo}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                          {activeMode.resumen}
                        </p>
                        <ul className="space-y-2.5 pt-2 border-t border-white/15">
                          {activeMode.puntos.map((pt) => (
                            <li
                              key={pt}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-100"
                            >
                              <CheckCircle2
                                className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => scrollToFormWithPreset(activeSpecId, activeMode.id)}
                          className="inline-flex items-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Preparar consulta con esta opción</span>
                        </button>
                        {activeMode.id === 'limpieza-mas-reparacion' && (
                          <a
                            href="/limpieza-alfombras-vigo"
                            onClick={(e) => onNavigate('/limpieza-alfombras-vigo', e)}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#60B5F6] hover:underline whitespace-nowrap"
                          >
                            <span>Ver cómo limpiamos alfombras</span>
                            <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* 2B. Catálogo interactivo de 4 daños y restauraciones frecuentes */}
            <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
              <div className="max-w-3xl mb-6 space-y-1.5">
                <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  Actuación temprana para frenar el deterioro del nudo
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                  Qué daños de alfombra valoramos con nuestro restaurador colaborador
                </h2>
              </div>

              <div
                role="tablist"
                aria-label="Especialidades de reparación de alfombras"
                className="flex flex-wrap gap-2.5 mb-6"
              >
                {SERVICIO_REPARACION_ALFOMBRAS_DATA.especialidades.map((spec) => {
                  const isActive = spec.id === activeSpecId;
                  return (
                    <button
                      key={spec.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActiveSpecId(spec.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer border whitespace-nowrap ${
                        isActive
                          ? 'bg-[#002147] text-white border-[#002147] dark:bg-[#0F76BB] dark:border-[#0F76BB]'
                          : 'bg-[#F4F7FB] dark:bg-[#0b1d36] text-[#002147] dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-[#0F76BB]'
                      }`}
                    >
                      {spec.tituloCorto}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpec.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-[#F4F7FB] dark:bg-[#0b1d36] p-6 sm:p-8 lg:p-10"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-4">
                      <p className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                        {activeSpec.soporte}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                        {activeSpec.titulo}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                        {activeSpec.descripcion}
                      </p>

                      <div className="pt-2 space-y-2.5">
                        <p className="text-xs font-extrabold uppercase tracking-wider text-[#002147] dark:text-slate-200">
                          Situaciones habituales que revisamos
                        </p>
                        <ul className="space-y-2">
                          {activeSpec.causasHabituales.map((causa) => (
                            <li
                              key={causa}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
                            >
                              <Scissors
                                className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{causa}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:col-span-5 space-y-4">
                      <div className="rounded-2xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-800 p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 text-[#002147] dark:text-[#60B5F6] font-extrabold text-sm">
                          <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Criterio real del restaurador colaborador</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {activeSpec.criterioRestaurador}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => scrollToFormWithPreset(activeSpec.id, activeModeId)}
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors cursor-pointer"
                      >
                        <Camera className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Valorar este caso con fotos</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* 3. CÓMO TRABAJA EL RESTAURADOR COLABORADOR Y LÍMITES REALES (#F4F7FB) */}
        <section className="py-14 lg:py-20 bg-[#F4F7FB] dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-2">
              <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Operativa transparente de principio a fin
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                Cómo gestionamos la reparación con nuestro restaurador colaborador
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                En Tintorería Mimos recepcionamos tu pieza con total comodidad en Vigo mientras la intervención técnica corre a cargo de un especialista en restauración textil.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SERVICIO_REPARACION_ALFOMBRAS_DATA.pasosColaborador.map((paso) => (
                <article
                  key={paso.num}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 space-y-3"
                >
                  <p className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                    PASO {paso.num}
                  </p>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#002147] dark:text-white">
                    {paso.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {paso.descripcion}
                  </p>
                </article>
              ))}
            </div>

            {/* Bloque honesto de viabilidad técnica y reverso */}
            <div className="rounded-3xl bg-[#002147] text-white p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-3">
                <p className="text-xs font-mono font-bold text-[#60B5F6] uppercase tracking-wider">
                  Honestidad técnica antes de que te desplaces
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  ¿Por qué la viabilidad y el presupuesto los confirma siempre el restaurador?
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  No todas las alfombras responden igual a la aguja: una alfombra anudada de lana suele consolidar muy bien flecos y festones, mientras que piezas con soporte trasero de látex reseco o cuarteado por los años, humedad podrida o pérdida masiva de trama pueden no admitir costura fiable. Revisamos contigo el frente y el reverso para decírtelo con claridad antes de empezar.
                </p>
              </div>
              <div className="lg:col-span-4 rounded-2xl bg-white/10 border border-white/15 p-5 space-y-2.5 text-xs sm:text-sm text-slate-100">
                <p className="font-extrabold text-[#60B5F6]">
                  Lo que comprobamos antes de aceptar la pieza:
                </p>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Resistencia de la urdimbre y primer nudo junto al borde</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Estado del reverso (yute, algodón o goma/látex)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Si precisa limpieza previa o puede ir directa a reparación</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CONSULTOR GUIADO DE WHATSAPP + GUÍA DE FOTOS PARA EL RESTAURADOR (#FFFFFF) */}
        <section
          id="consulta-reparacion-alfombra"
          className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 space-y-2">
              <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Valoración previa por foto · WhatsApp {CONTACT_INFO.whatsappNumber}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                Prepara los datos de tu alfombra para que el restaurador la valore
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Como un enlace de WhatsApp solo abre con texto, prepara aquí tu ficha y justo al entrar en el chat envíanos las fotografías del borde o fleco y del reverso.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Configurador */}
              <div className="lg:col-span-7 rounded-3xl border border-slate-200 dark:border-slate-800 bg-[#F4F7FB] dark:bg-[#0b1d36] p-6 sm:p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="rep-modalidad"
                      className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                    >
                      1. Modalidad de encargo
                    </label>
                    <select
                      id="rep-modalidad"
                      value={modalidad}
                      onChange={(e) => setModalidad(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    >
                      {REPAIR_MODALITIES.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="rep-trabajo"
                      className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                    >
                      2. Reparación que necesitas
                    </label>
                    <select
                      id="rep-trabajo"
                      value={trabajoNecesario}
                      onChange={(e) => setTrabajoNecesario(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    >
                      {REPAIR_WORK_TYPES.map((w) => (
                        <option key={w} value={w}>
                          {w}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="rep-tramo"
                      className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                    >
                      3. Tramo o lados afectados (cm o m)
                    </label>
                    <input
                      id="rep-tramo"
                      type="text"
                      value={tramoAfectado}
                      onChange={(e) => setTramoAfectado(e.target.value)}
                      placeholder="Ej.: 1,70 m de flecos en un lado / 35 cm de festón"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="rep-tipo"
                      className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                    >
                      4. Tipo de alfombra (si lo conoces)
                    </label>
                    <select
                      id="rep-tipo"
                      value={tipoAlfombra}
                      onChange={(e) => setTipoAlfombra(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    >
                      {RUG_TYPES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="rep-localidad"
                      className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                    >
                      5. Localidad
                    </label>
                    <select
                      id="rep-localidad"
                      value={localidad}
                      onChange={(e) => setLocalidad(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    >
                      {ZONAS_SERVICIO.map((loc) => (
                        <option key={loc} value={loc}>
                          {loc}
                        </option>
                      ))}
                      <option value="Otra localidad cercana a Vigo">
                        Otra localidad cercana a Vigo
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="rep-entrega"
                      className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                    >
                      6. Tienda de entrega o recogida
                    </label>
                    <select
                      id="rep-entrega"
                      value={formaEntrega}
                      onChange={(e) => setFormaEntrega(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    >
                      {DELIVERY_MODES.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="rep-notas"
                    className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    Notas adicionales (medida total de la alfombra, si está enrollada, manchas si añades limpieza...)
                  </label>
                  <textarea
                    id="rep-notas"
                    rows={2}
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                    placeholder="Ej.: Alfombra de lana de 2,40 × 1,70 m. El aspirador arrancó parte de los flecos de un extremo."
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick(
                        SERVICIO_REPARACION_ALFOMBRAS_DATA.url,
                        'service_detail',
                        { service_id: 'reparacion-alfombras-builder' }
                      )
                    }
                    className="flex-1 inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base py-3.5 px-5 rounded-xl transition-colors sm:whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Abrir WhatsApp para enviar fotos</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-600 px-4 py-3.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer hover:border-[#0F76BB] transition-colors whitespace-nowrap shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#178A47]" aria-hidden="true" />
                        <span>Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        <span>Copiar texto</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Barra lateral: Qué 3 fotos enviar + Cómo calcula el restaurador */}
              <aside className="lg:col-span-5 space-y-6">
                <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-[#002147] text-white p-6 sm:p-7 space-y-4">
                  <div className="flex items-center gap-2 text-[#60B5F6]">
                    <Camera className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <h3 className="text-lg font-extrabold text-white">
                      Qué fotos enviar en el chat
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {SERVICIO_REPARACION_ALFOMBRAS_DATA.fotosNecesarias.map((foto) => (
                      <li key={foto.titulo} className="text-xs sm:text-sm space-y-0.5">
                        <p className="font-extrabold text-white">{foto.titulo}</p>
                        <p className="text-slate-300 leading-relaxed">{foto.detalle}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-[#F4F7FB] dark:bg-[#0b1d36] p-6 sm:p-7 space-y-4">
                  <div className="flex items-center gap-2 text-[#0F76BB] dark:text-[#60B5F6]">
                    <Ruler className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <h3 className="text-lg font-extrabold text-[#002147] dark:text-white">
                      De qué depende el presupuesto
                    </h3>
                  </div>
                  <dl className="divide-y divide-slate-200/80 dark:divide-slate-800">
                    {SERVICIO_REPARACION_ALFOMBRAS_DATA.criteriosValoracion.map((criterio, idx) => (
                      <div key={criterio.titulo} className="py-3 first:pt-0 last:pb-0">
                        <dt className="text-xs sm:text-sm font-extrabold text-[#002147] dark:text-white flex items-center gap-2">
                          <span className="font-mono text-[#0F76BB] dark:text-[#60B5F6]">
                            0{idx + 1}
                          </span>
                          <span>{criterio.titulo}</span>
                        </dt>
                        <dd className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                          {criterio.detalle}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* 5. RESEÑAS REALES + 3 TIENDAS PROPIAS Y RECOGIDA (#F4F7FB) */}
        <section
          id="puntos-entrega-reparacion"
          className="py-14 lg:py-20 bg-[#F4F7FB] dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            {/* Opiniones reales de Google */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                    Reseñas verificadas en Google
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                    Confianza de nuestros clientes en Vigo
                  </h2>
                </div>
                <a
                  href={CONTACT_INFO.googleReviewsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
                >
                  <span>Ver todas las reseñas en Google</span>
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {RESENAS_REALES.map((resena) => (
                  <blockquote
                    key={resena.autor}
                    className="rounded-2xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span
                          className="text-amber-500 font-bold tracking-tight"
                          aria-label="Valoración de 5 estrellas"
                        >
                          ★★★★★
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{resena.origen}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                        «{resena.texto}»
                      </p>
                    </div>
                    <footer className="text-xs sm:text-sm font-extrabold text-[#002147] dark:text-white pt-3 border-t border-slate-100 dark:border-slate-800">
                      {resena.autor}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>

            {/* Tiendas propias + Recogida */}
            <div className="pt-10 border-t border-slate-200/80 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#002147] dark:text-white">
                    Dónde entregar tu alfombra para reparar en Vigo (3 tiendas propias y recogida)
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Sin importe mínimo en tiendas propias; recogida a domicilio sujeta a zona y condiciones del servicio (en puntos colaboradores, solo si admiten piezas de este tamaño).
                  </p>
                </div>
                <a
                  href="/puntos-mimos"
                  onClick={(e) => onNavigate('/puntos-mimos', e)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
                >
                  <Store className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Ver mapa y horarios completos</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                {TIENDAS_PROPIAS.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-5 space-y-2"
                  >
                    <p className="text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                      Tienda propia Mimos · {t.localidad}
                    </p>
                    <h3 className="text-base font-extrabold text-[#002147] dark:text-white">
                      {t.nombre_mostrado}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                      {t.direccion} · {t.codigo_postal} {t.localidad}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.horario.resumen} · Tel. {t.telefonos_mostrados}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Truck
                    className="w-5 h-5 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    <strong>Recogida a domicilio y puntos colaboradores:</strong> consulta recogida en casa con Mimo según cobertura y condiciones. Para entregar en los {PUNTOS_COLABORADORES.length} puntos colaboradores de comarca, confirma primero con Mimo que ese comercio admita el volumen de tu alfombra.
                  </p>
                </div>
                <a
                  href="/recogida-a-domicilio"
                  onClick={(e) => onNavigate('/recogida-a-domicilio', e)}
                  className="text-xs sm:text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
                >
                  Ver recogida a domicilio →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PREGUNTAS FRECUENTES + ENLACES RELACIONADOS (#FFFFFF) */}
        <section className="py-14 lg:py-20 bg-white dark:bg-[#071324]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            <div>
              <div className="max-w-3xl mb-8 space-y-1.5">
                <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  Dudas habituales antes de reparar tu alfombra
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                  Preguntas frecuentes sobre reparación y restauración de alfombras en Vigo
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleFaqs.map((faq) => (
                  <details
                    key={faq.pregunta}
                    className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-5"
                  >
                    <summary className="font-extrabold text-[#002147] dark:text-white cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base">
                      <span>{faq.pregunta}</span>
                      <span className="text-[#0F76BB] font-mono text-lg group-open:rotate-45 transition-transform shrink-0">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-3 border-t border-slate-200/70 dark:border-slate-700/60">
                      {faq.respuesta}
                    </p>
                  </details>
                ))}
              </div>

              {SERVICIO_REPARACION_ALFOMBRAS_DATA.preguntasFrecuentes.length > 6 && (
                <div className="mt-6 flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllFaqs((prev) => !prev)}
                    aria-expanded={showAllFaqs}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0b1d36] px-5 py-3 text-xs sm:text-sm font-bold text-[#002147] dark:text-white hover:border-[#0F76BB] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>
                      {showAllFaqs
                        ? 'Ocultar dudas adicionales'
                        : `Ver ${SERVICIO_REPARACION_ALFOMBRAS_DATA.preguntasFrecuentes.length - 6} dudas más`}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${showAllFaqs ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </button>
                </div>
              )}
            </div>

            {/* Enlaces relacionados */}
            <div className="pt-10 border-t border-slate-200 dark:border-slate-800">
              <div className="max-w-3xl mb-6 space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white">
                  ¿Necesitas también limpieza de la alfombra o cuidado del hogar?
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Accede directamente al servicio específico que buscas en Tintorería Mimos:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {SERVICIO_REPARACION_ALFOMBRAS_DATA.enlacesRelacionados.map((rel) => (
                  <a
                    key={rel.href}
                    href={rel.href}
                    onClick={(e) => onNavigate(rel.href, e)}
                    className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB] bg-[#F8FAFC] dark:bg-[#0b1d36] flex flex-col justify-between group transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <h3 className="text-base font-extrabold text-[#002147] dark:text-white group-hover:text-[#0F76BB] dark:group-hover:text-[#60B5F6]">
                          {rel.titulo}
                        </h3>
                        <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {rel.descripcion}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="/limpieza-alfombras-vigo"
                    onClick={(e) => onNavigate('/limpieza-alfombras-vigo', e)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
                  >
                    <Layers className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Ir a limpieza de alfombras</span>
                  </a>
                  <a
                    href="/"
                    onClick={(e) => onNavigate('/', e)}
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#002147] dark:text-slate-200 hover:text-[#0F76BB]"
                  >
                    <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Volver a portada</span>
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick(
                        SERVICIO_REPARACION_ALFOMBRAS_DATA.url,
                        'service_detail_footer',
                        { service_id: 'reparacion-alfombras' }
                      )
                    }
                    className="inline-flex items-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors whitespace-nowrap"
                  >
                    <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Enviar fotos por WhatsApp</span>
                  </a>
                  <a
                    href={CONTACT_INFO.phoneHref}
                    onClick={() =>
                      trackPhoneClick(SERVICIO_REPARACION_ALFOMBRAS_DATA.url, 'service_detail')
                    }
                    className="inline-flex items-center gap-2 border border-slate-300 dark:border-slate-700 text-[#002147] dark:text-white font-bold text-sm px-4 py-3 rounded-xl hover:border-[#0F76BB] transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                    <span>{CONTACT_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
};
