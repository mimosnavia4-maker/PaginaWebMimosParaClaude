import React, { useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import {
  ArrowLeft,
  ArrowUpRight,
  Camera,
  Check,
  CheckCircle2,
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
import reparacionAlfombrasImg from '../assets/images/reparacion_alfombras_flecos_1794732541809.webp';
import { SERVICIO_REPARACION_ALFOMBRAS_DATA } from '../data/servicePagesData';
import {
  TIENDAS_PROPIAS,
  PUNTOS_COLABORADORES,
  RESENAS_REALES,
  CONTACT_INFO,
  ZONAS_SERVICIO,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackWhatsAppClick, trackPhoneClick } from '../utils/analytics';
import { PageHeroLight } from './PageHeroLight';

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
  'Entrega y recogida en Tienda Venezuela (Rúa de Venezuela, 29, Entreplanta)',
  'Entrega y recogida en Tienda Gregorio Espino (Avda. Gregorio Espino, 42)',
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

  const [modalidad, setModalidad] = useState(REPAIR_MODALITIES[0]);
  const [trabajoNecesario, setTrabajoNecesario] = useState(REPAIR_WORK_TYPES[0]);
  const [tramoAfectado, setTramoAfectado] = useState('');
  const [tipoAlfombra, setTipoAlfombra] = useState(RUG_TYPES[0]);
  const [localidad, setLocalidad] = useState('Vigo');
  const [formaEntrega, setFormaEntrega] = useState(DELIVERY_MODES[0]);
  const [notas, setNotas] = useState('');
  const [copied, setCopied] = useState(false);

  const activeSpec =
    SERVICIO_REPARACION_ALFOMBRAS_DATA.especialidades.find(
      (item) => item.id === activeSpecId
    ) ?? SERVICIO_REPARACION_ALFOMBRAS_DATA.especialidades[0];

  const activeMode =
    SERVICIO_REPARACION_ALFOMBRAS_DATA.modalidades.find(
      (item) => item.id === activeModeId
    ) ?? SERVICIO_REPARACION_ALFOMBRAS_DATA.modalidades[0];

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
        className="focus:outline-hidden bg-white text-slate-900 border-b border-slate-200"
      >
        {/* 1. CABECERA LUMINOSA */}
        <PageHeroLight
          breadcrumbs={[
            { label: 'Inicio', href: '/' },
            { label: 'Limpieza de alfombras', href: '/limpieza-alfombras-vigo' },
            { label: 'Reparación de alfombras en Vigo' },
          ]}
          onNavigate={onNavigate}
          kicker="Solo reparación o limpieza + arreglo · Restaurador especialista colaborador"
          title={SERVICIO_REPARACION_ALFOMBRAS_DATA.h1}
          description={SERVICIO_REPARACION_ALFOMBRAS_DATA.subtituloCabecera}
          note={SERVICIO_REPARACION_ALFOMBRAS_DATA.aclaracionOperativa}
          whatsappHref={whatsappUrl}
          whatsappLabel="Consultar reparación por WhatsApp"
          onWhatsAppClick={() =>
            trackWhatsAppClick(SERVICIO_REPARACION_ALFOMBRAS_DATA.url, 'service_detail', {
              service_id: 'reparacion-alfombras',
            })
          }
          secondaryAction={{
            label: 'Ver tiendas y recogida',
            href: '#puntos-entrega-reparacion',
            icon: <Store className="w-4 h-4 shrink-0" aria-hidden="true" />,
            isInternalRoute: false,
          }}
          image={{
            src: reparacionAlfombrasImg,
            alt: 'Trabajo artesanal de remate de flecos y festón lateral sobre una alfombra tejida en mesa de restauración',
            caption:
              'Remate de flecos, festón perimetral y refuerzo de esquinas valorados por restaurador especialista mediante colaborador de Tintorería Mimos.',
            fallbackTitle: 'Reparación y restauración de alfombras en Vigo',
            fallbackSubtitle: 'Recepción en tiendas y recogida concertada a domicilio',
          }}
        />

        {/* 2. ESPECIALIDADES DE REPARACIÓN + MODALIDAD FLEXIBLE (Blanco) */}
        <section className="py-14 lg:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            {/* Selector de modalidad: Solo reparación vs Limpieza + Reparación */}
            <div>
              <div className="max-w-3xl mb-6 space-y-1.5">
                <p className="text-xs sm:text-sm font-bold text-[#0C65A1]">
                  Contratación flexible según lo que necesite tu pieza
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
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
                        className={`text-left min-h-[72px] p-5 rounded-sm border transition-colors cursor-pointer ${
                          isSelected
                            ? 'border-[#0F76BB] border-l-4 border-l-[#0F76BB] bg-[#EDF5FD]'
                            : 'border-slate-200 bg-white hover:border-[#0F76BB]'
                        }`}
                      >
                        <p className="text-xs font-mono font-bold text-[#0C65A1] mb-1">
                          {mode.etiqueta}
                        </p>
                        <p className="text-base sm:text-lg font-extrabold text-[#002147]">
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
                      className="h-full rounded-sm border border-[#0F76BB]/25 bg-[#EDF5FD] p-6 sm:p-8 flex flex-col justify-between space-y-5"
                    >
                      <div className="space-y-3">
                        <p className="text-xs font-mono font-bold text-[#0C65A1]">
                          {activeMode.etiqueta}
                        </p>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                          {activeMode.titulo}
                        </h3>
                        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                          {activeMode.resumen}
                        </p>
                        <ul className="space-y-2.5 pt-3 border-t border-[#0F76BB]/20">
                          {activeMode.puntos.map((pt) => (
                            <li
                              key={pt}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                            >
                              <CheckCircle2
                                className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5"
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
                          className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm px-5 py-3 rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-xs"
                        >
                          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                          <span>Preparar consulta con esta opción</span>
                        </button>
                        {activeMode.id === 'limpieza-mas-reparacion' && (
                          <a
                            href="/limpieza-alfombras-vigo"
                            onClick={(e) => onNavigate('/limpieza-alfombras-vigo', e)}
                            className="inline-flex items-center gap-1.5 min-h-[44px] text-xs sm:text-sm font-bold text-[#0C65A1] hover:underline whitespace-nowrap"
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

            {/* Catálogo interactivo de 4 daños y restauraciones frecuentes */}
            <div className="pt-10 border-t border-slate-200">
              <div className="max-w-3xl mb-6 space-y-1.5">
                <p className="text-xs sm:text-sm font-bold text-[#0C65A1]">
                  Actuación temprana para frenar el deterioro del nudo
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
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
                      className={`min-h-[44px] px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer border whitespace-nowrap ${
                        isActive
                          ? 'bg-[#002147] text-white border-[#002147]'
                          : 'bg-white text-[#002147] border-slate-200 hover:border-[#0F76BB]'
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
                  className="rounded-sm border border-slate-200 bg-[#F7F6F2] p-6 sm:p-8 lg:p-10"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-4">
                      <p className="text-xs font-mono font-bold text-[#0C65A1]">
                        {activeSpec.soporte}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] tracking-tight">
                        {activeSpec.titulo}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                        {activeSpec.descripcion}
                      </p>

                      <div className="pt-2 space-y-2.5">
                        <p className="text-xs font-extrabold uppercase tracking-wider text-[#002147]">
                          Situaciones habituales que revisamos
                        </p>
                        <ul className="space-y-2">
                          {activeSpec.causasHabituales.map((causa) => (
                            <li
                              key={causa}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                            >
                              <Scissors
                                className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5"
                                aria-hidden="true"
                              />
                              <span>{causa}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="lg:col-span-5 space-y-4">
                      <div className="rounded-sm bg-white border border-slate-200 p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-2 text-[#002147] font-extrabold text-sm">
                          <ShieldAlert className="w-4 h-4 text-[#0C65A1] shrink-0" aria-hidden="true" />
                          <span>Criterio real del restaurador colaborador</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {activeSpec.criterioRestaurador}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => scrollToFormWithPreset(activeSpec.id, activeModeId)}
                        className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm px-5 py-3 rounded-lg transition-colors cursor-pointer shadow-xs"
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

        {/* 3. CÓMO TRABAJA EL RESTAURADOR COLABORADOR Y LÍMITES REALES (#F7F6F2) */}
        <section className="py-14 lg:py-20 bg-[#F7F6F2] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-3xl space-y-2">
              <p className="text-xs sm:text-sm font-bold text-[#0C65A1]">
                Operativa transparente de principio a fin
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                Cómo gestionamos la reparación con nuestro restaurador colaborador
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                En Tintorería Mimos recepcionamos tu pieza con total comodidad en Vigo mientras la intervención técnica corre a cargo de un especialista en restauración textil.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {SERVICIO_REPARACION_ALFOMBRAS_DATA.pasosColaborador.map((paso) => (
                <article
                  key={paso.num}
                  className="rounded-sm border border-slate-200 bg-white p-6 space-y-3"
                >
                  <p className="text-xs font-mono tabular-nums font-bold text-[#0C65A1]">
                    PASO {paso.num}
                  </p>
                  <h3 className="text-base sm:text-lg font-extrabold text-[#002147]">
                    {paso.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {paso.descripcion}
                  </p>
                </article>
              ))}
            </div>

            {/* Bloque honesto de viabilidad técnica y reverso */}
            <div className="rounded-sm border border-[#0F76BB]/25 bg-[#EDF5FD] p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-3">
                <p className="text-xs font-bold text-[#0C65A1] uppercase tracking-wider">
                  Honestidad técnica antes de que te desplaces
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                  ¿Por qué la viabilidad y el presupuesto los confirma siempre el restaurador?
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  No todas las alfombras responden igual a la aguja: una alfombra anudada de lana suele consolidar muy bien flecos y festones, mientras que piezas con soporte trasero de látex reseco o cuarteado por los años, humedad podrida o pérdida masiva de trama pueden no admitir costura fiable. Revisamos contigo el frente y el reverso para decírtelo con claridad antes de empezar.
                </p>
              </div>
              <div className="lg:col-span-5 rounded-sm bg-white border border-slate-200 p-5 sm:p-6 space-y-2.5 text-xs sm:text-sm text-slate-700">
                <p className="font-extrabold text-[#002147]">
                  Lo que comprobamos antes de aceptar la pieza:
                </p>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Resistencia de la urdimbre y primer nudo junto al borde</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Estado del reverso (yute, algodón o goma/látex)</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Si precisa limpieza previa o puede ir directa a reparación</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CONSULTOR GUIADO DE WHATSAPP + GUÍA DE FOTOS PARA EL RESTAURADOR (#EDF5FD) */}
        <section
          id="consulta-reparacion-alfombra"
          className="py-14 lg:py-20 bg-[#EDF5FD] border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-10 space-y-2">
              <p className="text-xs sm:text-sm font-bold text-[#0C65A1]">
                Valoración previa por foto · WhatsApp {CONTACT_INFO.whatsappNumber}
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                Prepara los datos de tu alfombra para que el restaurador la valore
              </h2>
              <p className="text-sm sm:text-base text-slate-700">
                Como un enlace de WhatsApp solo abre con texto, prepara aquí tu ficha y justo al entrar en el chat envíanos las fotografías del borde o fleco y del reverso.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Configurador */}
              <div className="lg:col-span-7 rounded-sm border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="rep-modalidad"
                      className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                    >
                      1. Modalidad de encargo
                    </label>
                    <select
                      id="rep-modalidad"
                      value={modalidad}
                      onChange={(e) => setModalidad(e.target.value)}
                      className="w-full min-h-[44px] rounded-sm border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-base lg:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
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
                      className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                    >
                      2. Reparación que necesitas
                    </label>
                    <select
                      id="rep-trabajo"
                      value={trabajoNecesario}
                      onChange={(e) => setTrabajoNecesario(e.target.value)}
                      className="w-full min-h-[44px] rounded-sm border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-base lg:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
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
                      className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                    >
                      3. Tramo o lados afectados (cm o m)
                    </label>
                    <input
                      id="rep-tramo"
                      type="text"
                      value={tramoAfectado}
                      onChange={(e) => setTramoAfectado(e.target.value)}
                      placeholder="Ej.: 1,70 m de flecos en un lado / 35 cm de festón"
                      className="w-full min-h-[44px] rounded-sm border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-base lg:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="rep-tipo"
                      className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                    >
                      4. Tipo de alfombra (si lo conoces)
                    </label>
                    <select
                      id="rep-tipo"
                      value={tipoAlfombra}
                      onChange={(e) => setTipoAlfombra(e.target.value)}
                      className="w-full min-h-[44px] rounded-sm border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-base lg:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
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
                      className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                    >
                      5. Localidad
                    </label>
                    <select
                      id="rep-localidad"
                      value={localidad}
                      onChange={(e) => setLocalidad(e.target.value)}
                      className="w-full min-h-[44px] rounded-sm border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-base lg:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
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
                      className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                    >
                      6. Tienda de entrega o recogida
                    </label>
                    <select
                      id="rep-entrega"
                      value={formaEntrega}
                      onChange={(e) => setFormaEntrega(e.target.value)}
                      className="w-full min-h-[44px] rounded-sm border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-base lg:text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
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
                    className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                  >
                    Notas adicionales (medida total de la alfombra, si está enrollada, manchas si añades limpieza...)
                  </label>
                  <textarea
                    id="rep-notas"
                    rows={2}
                    value={notas}
                    onChange={(e) => setNotas(e.target.value)}
                    placeholder="Ej.: Alfombra de lana de 2,40 × 1,70 m. El aspirador arrancó parte de los flecos de un extremo."
                    className="w-full min-h-[44px] rounded-sm border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-base lg:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
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
                    className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm sm:text-base py-3 px-5 rounded-lg transition-colors sm:whitespace-nowrap shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Abrir WhatsApp para enviar fotos</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="min-h-[48px] inline-flex items-center justify-center gap-1.5 border border-[#002147] bg-white hover:bg-[#002147] hover:text-white px-4 py-3 rounded-lg text-xs font-bold text-[#002147] cursor-pointer transition-colors whitespace-nowrap shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#147A3E]" aria-hidden="true" />
                        <span>Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Copiar texto</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Barra lateral: Qué 3 fotos enviar + Cómo calcula el restaurador */}
              <aside className="lg:col-span-5 space-y-6">
                <div className="rounded-sm border border-[#0F76BB]/25 bg-white/90 p-6 sm:p-7 space-y-4">
                  <div className="flex items-center gap-2 text-[#0C65A1]">
                    <Camera className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <h3 className="text-lg font-extrabold text-[#002147]">
                      Qué fotos enviar en el chat
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {SERVICIO_REPARACION_ALFOMBRAS_DATA.fotosNecesarias.map((foto) => (
                      <li key={foto.titulo} className="text-xs sm:text-sm space-y-0.5">
                        <p className="font-extrabold text-[#002147]">{foto.titulo}</p>
                        <p className="text-slate-600 leading-relaxed">{foto.detalle}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-sm border border-slate-200 bg-white p-6 sm:p-7 space-y-4">
                  <div className="flex items-center gap-2 text-[#0C65A1]">
                    <Ruler className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <h3 className="text-lg font-extrabold text-[#002147]">
                      De qué depende el presupuesto
                    </h3>
                  </div>
                  <dl className="divide-y divide-slate-200">
                    {SERVICIO_REPARACION_ALFOMBRAS_DATA.criteriosValoracion.map((criterio, idx) => (
                      <div key={criterio.titulo} className="py-3 first:pt-0 last:pb-0">
                        <dt className="text-xs sm:text-sm font-extrabold text-[#002147] flex items-center gap-2">
                          <span className="font-mono text-[#0C65A1]">0{idx + 1}</span>
                          <span>{criterio.titulo}</span>
                        </dt>
                        <dd className="text-xs text-slate-600 mt-1 leading-relaxed">
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

        {/* 5. RESEÑAS REALES + 3 TIENDAS PROPIAS Y RECOGIDA (Blanco) */}
        <section
          id="puntos-entrega-reparacion"
          className="py-14 lg:py-20 bg-white border-b border-slate-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            {/* Opiniones reales de Google */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#0C65A1] mb-1">
                    Reseñas verificadas en Google
                  </p>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight">
                    Confianza de nuestros clientes en Vigo
                  </h2>
                </div>
                <a
                  href={CONTACT_INFO.googleReviewsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold text-[#002147] hover:text-[#0F76BB] hover:underline whitespace-nowrap shrink-0"
                >
                  <span>Ver todas las reseñas en Google</span>
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {RESENAS_REALES.map((resena) => (
                  <blockquote
                    key={resena.autor}
                    className="rounded-sm bg-[#F7F6F2]/70 border border-slate-200 p-6 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span
                          className="text-amber-700 font-bold tracking-tight"
                          aria-label="Valoración de 5 estrellas"
                        >
                          ★★★★★
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{resena.origen}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        «{resena.texto}»
                      </p>
                    </div>
                    <footer className="text-xs sm:text-sm font-extrabold text-[#002147] pt-3 border-t border-slate-200">
                      {resena.autor}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>

            {/* Tiendas propias + Recogida */}
            <div className="pt-10 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#002147]">
                    Dónde entregar tu alfombra para reparar en Vigo (3 tiendas propias y recogida)
                  </h2>
                  <p className="text-sm text-slate-600 mt-1">
                    Sin importe mínimo en tiendas propias; recogida a domicilio sujeta a zona y condiciones del servicio (en puntos colaboradores, solo si admiten piezas de este tamaño).
                  </p>
                </div>
                <a
                  href="/puntos-mimos"
                  onClick={(e) => onNavigate('/puntos-mimos', e)}
                  className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold text-[#0C65A1] hover:underline whitespace-nowrap shrink-0"
                >
                  <Store className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Ver mapa y horarios completos</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                {TIENDAS_PROPIAS.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-sm border border-slate-200 bg-[#F7F6F2]/70 p-5 space-y-2"
                  >
                    <p className="text-xs font-bold text-[#0C65A1]">
                      Tienda propia Mimos · {t.localidad}
                    </p>
                    <h3 className="text-base font-extrabold text-[#002147]">
                      {t.nombre_mostrado}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      {t.direccion} · {t.codigo_postal} {t.localidad}
                    </p>
                    <p className="text-xs text-slate-500">
                      {t.horario.resumen} · Tel. {t.telefonos_mostrados}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-sm border border-slate-200 bg-[#F7F6F2] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-[#0C65A1] shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <strong className="text-[#002147]">
                      Recogida a domicilio y puntos colaboradores:
                    </strong>{' '}
                    consulta recogida en casa con Mimo según cobertura y condiciones. Para entregar en los {PUNTOS_COLABORADORES.length} puntos colaboradores de comarca, confirma primero con Mimo que ese comercio admita el volumen de tu alfombra.
                  </p>
                </div>
                <a
                  href="/recogida-a-domicilio"
                  onClick={(e) => onNavigate('/recogida-a-domicilio', e)}
                  className="inline-flex items-center min-h-[44px] text-xs sm:text-sm font-bold text-[#0C65A1] hover:underline whitespace-nowrap shrink-0"
                >
                  Ver recogida a domicilio →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. PREGUNTAS FRECUENTES (#F7F6F2) + ENLACES RELACIONADOS (Blanco) */}
        <section className="py-14 lg:py-20 bg-[#F7F6F2] border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-8 space-y-1.5">
              <p className="text-xs sm:text-sm font-bold text-[#0C65A1]">
                Dudas habituales antes de reparar tu alfombra
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                Preguntas frecuentes sobre reparación y restauración de alfombras en Vigo
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICIO_REPARACION_ALFOMBRAS_DATA.preguntasFrecuentes.map((faq) => (
                <details
                  key={faq.pregunta}
                  className="group rounded-sm border border-slate-200 bg-white p-5"
                >
                  <summary className="min-h-[44px] font-extrabold text-[#002147] cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base">
                    <span>{faq.pregunta}</span>
                    <span className="text-[#0C65A1] font-mono text-lg group-open:rotate-45 transition-transform shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
                    {faq.respuesta}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-6 space-y-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                ¿Necesitas también limpieza de la alfombra o cuidado del hogar?
              </h2>
              <p className="text-sm text-slate-600">
                Accede directamente al servicio específico que buscas en Tintorería Mimos:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
              {SERVICIO_REPARACION_ALFOMBRAS_DATA.enlacesRelacionados.map((rel) => (
                <a
                  key={rel.href}
                  href={rel.href}
                  onClick={(e) => onNavigate(rel.href, e)}
                  className="p-6 rounded-sm border border-slate-200 hover:border-[#0F76BB] bg-[#F7F6F2]/60 flex flex-col justify-between group transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="text-base font-extrabold text-[#002147] group-hover:text-[#0F76BB]">
                        {rel.titulo}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-[#0C65A1] shrink-0" aria-hidden="true" />
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {rel.descripcion}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="/limpieza-alfombras-vigo"
                  onClick={(e) => onNavigate('/limpieza-alfombras-vigo', e)}
                  className="inline-flex items-center gap-2 min-h-[44px] text-sm font-bold text-[#0C65A1] hover:underline"
                >
                  <Layers className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Ir a limpieza de alfombras</span>
                </a>
                <a
                  href="/"
                  onClick={(e) => onNavigate('/', e)}
                  className="inline-flex items-center gap-2 min-h-[44px] text-sm font-bold text-[#002147] hover:text-[#0F76BB]"
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
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm px-5 py-3 rounded-lg transition-colors whitespace-nowrap shadow-xs"
                >
                  <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Enviar fotos por WhatsApp</span>
                </a>
                <a
                  href={CONTACT_INFO.phoneHref}
                  onClick={() =>
                    trackPhoneClick(SERVICIO_REPARACION_ALFOMBRAS_DATA.url, 'service_detail')
                  }
                  className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-white border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-4 py-3 rounded-lg transition-colors whitespace-nowrap group"
                >
                  <Phone
                    className="w-4 h-4 text-[#0C65A1] group-hover:text-white shrink-0"
                    aria-hidden="true"
                  />
                  <span>{CONTACT_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MotionConfig>
  );
};
