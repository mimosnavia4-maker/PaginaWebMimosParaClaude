import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageCircle,
  ArrowRight,
  MapPin,
  ArrowUpRight,
  Phone,
  Eye,
  ArrowLeft,
  Search,
  CheckCircle2,
  Truck,
  Store,
} from 'lucide-react';
import {
  CONTACT_INFO,
  IMAGES,
  REGISTROS_PUNTOS,
  TIENDAS_PROPIAS,
  PUNTOS_COLABORADORES,
  buildMimoWhatsAppUrl,
} from '../../data/mimosData';
import { getNaviaStoreStatus, StoreStatusInfo } from '../../utils/storeStatus';
import { trackWhatsAppClick, trackPhoneClick } from '../../utils/analytics';

interface PreviewHeroSectionProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  onScrollToSection: (sectionId: string) => void;
}

type SceneKey = 'planta' | 'flota' | 'taller';

interface RealScene {
  key: SceneKey;
  tabLabel: string;
  imageUrl: string;
  alt: string;
  kicker: string;
  caption: string;
}

const REAL_SCENES: RealScene[] = [
  {
    key: 'planta',
    tabLabel: 'Planta Navia',
    imageUrl: '/images/navia/planta-planchado-mimos-navia-vigo.webp',
    alt: 'Planta central de planchado y tratamiento textil en Tintorería Mimos Navia, Vigo',
    kicker: 'Planta central en Navia · Vigo',
    caption: 'Planchado artesanal por vapor y acabado individual prenda a prenda.',
  },
  {
    key: 'flota',
    tabLabel: 'Flota propia',
    imageUrl: '/images/colaboradores/paso-2-recogida-furgoneta.webp',
    alt: 'Furgoneta propia de Tintorería Mimos para recogida y entrega en Vigo y comarca',
    kicker: 'Rutas en Vigo y comarca',
    caption: 'Recogida a domicilio y conexión diaria entre tiendas y puntos.',
  },
  {
    key: 'taller',
    tabLabel: 'Taller de costura',
    imageUrl: '/images/gregorio-espino/interior-taller-gregorio-espino-vigo.webp',
    alt: 'Taller propio de costura y mostrador de atención en Tintorería Mimos Gregorio Espino',
    kicker: 'Modistería in situ · 18 arreglos',
    caption: 'Toma de medidas directa y acabados propios sin intermediarios.',
  },
];

interface CoverageResult {
  zonaLabel: string;
  summary: string;
  pointName: string;
  pointAddress: string;
  pointSchedule: string;
  pointPhone: string;
  pointRoute: string;
  pickupNote: string;
  whatsappHref: string;
}

function resolveCoverageByQuery(rawQuery: string): CoverageResult {
  const q = rawQuery
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

  const findPoint = (id: string) =>
    REGISTROS_PUNTOS.find((p) => p.id === id) ?? REGISTROS_PUNTOS[0];

  if (!q || q.includes('36212') || q.includes('navia') || q.includes('teixugueiras') || q.includes('bouzas') || q.includes('alcabre') || q.includes('comesana') || q.includes('sam')) {
    const p = findPoint('as-teixugueiras');
    return {
      zonaLabel: 'Navia y zona oeste de Vigo',
      summary: 'Atención directa en nuestra sede central sin pedido mínimo + recogida a domicilio y limpieza de sofás en casa.',
      pointName: `${p.nombre_mostrado} (Sede Central)`,
      pointAddress: `${p.direccion}, ${p.codigo_postal} ${p.localidad}`,
      pointSchedule: p.horario.resumen,
      pointPhone: p.telefonos_mostrados,
      pointRoute: '/tienda-mimos-navia-vigo',
      pickupNote: 'Recogida a domicilio y sofás in situ disponibles (consultar mínimo a domicilio con Mimo).',
      whatsappHref: buildMimoWhatsAppUrl('Hola, Mimo. Estoy en Navia / Vigo oeste (36212) y quiero hacer una consulta o pedir recogida.'),
    };
  }

  if (q.includes('36205') || q.includes('36204') || q.includes('36206') || q.includes('36207') || q.includes('calvario') || q.includes('gregorio') || q.includes('travesia') || q.includes('teis')) {
    const p = findPoint('gregorio-espino');
    return {
      zonaLabel: 'O Calvario / Gregorio Espino / Travesía',
      summary: 'Tienda propia con taller in situ de costura + servicio completo de tintorería, alfombras y recogida a domicilio.',
      pointName: `${p.nombre_mostrado} (Tienda Propia + Taller)`,
      pointAddress: `${p.direccion}, ${p.codigo_postal} ${p.localidad}`,
      pointSchedule: p.horario.resumen,
      pointPhone: p.telefonos_mostrados,
      pointRoute: '/tienda-mimos-gregorio-espino-vigo',
      pickupNote: 'Entrega directa en tienda sin pedido mínimo o recogida programada a domicilio.',
      whatsappHref: buildMimoWhatsAppUrl('Hola, Mimo. Estoy en la zona de Gregorio Espino / O Calvario (Vigo) y quiero consultar un servicio.'),
    };
  }

  if (q.includes('36201') || q.includes('36202') || q.includes('36203') || q.includes('36211') || q.includes('venezuela') || q.includes('centro') || q.includes('corte ingles') || q.includes('urzaiz') || q.includes('gran via')) {
    const p = findPoint('rua-venezuela');
    return {
      zonaLabel: 'Centro de Vigo / Rúa Venezuela',
      summary: 'Tienda propia céntrica con modistería in situ, recepción diaria de prendas y recogida a domicilio en el centro de Vigo.',
      pointName: `${p.nombre_mostrado} (Tienda Propia + Taller)`,
      pointAddress: `${p.direccion}, ${p.codigo_postal} ${p.localidad}`,
      pointSchedule: p.horario.resumen,
      pointPhone: p.telefonos_mostrados,
      pointRoute: '/zonas/vigo',
      pickupNote: 'Atención en tienda sin pedido mínimo y ruta de recogida a domicilio para viviendas y oficinas.',
      whatsappHref: buildMimoWhatsAppUrl('Hola, Mimo. Estoy en el centro de Vigo / C/ Venezuela y quiero hacer una consulta.'),
    };
  }

  if (q.includes('36210') || q.includes('espedrigada') || q.includes('passo') || q.includes('coia') || q.includes('castrelos') || q.includes('balaidos') || q.includes('travesas') || q.includes('36208') || q.includes('36209')) {
    const p = findPoint('punto-vigo-dpasso');
    return {
      zonaLabel: 'As Travesas / Balaídos / Espedrigada',
      summary: 'Punto colaborador oficial en Camiño Espedrigada y cercanía directa con Navia, además de recogida y sofás a domicilio.',
      pointName: `${p.nombre_mostrado} (Punto Colaborador en Vigo)`,
      pointAddress: `${p.direccion}, ${p.codigo_postal} ${p.localidad}`,
      pointSchedule: p.horario.resumen,
      pointPhone: p.telefonos_mostrados,
      pointRoute: '/zonas/vigo',
      pickupNote: 'Sin pedido mínimo en punto colaborador; también recogemos y limpiamos sofás a domicilio en tu barrio.',
      whatsappHref: buildMimoWhatsAppUrl('Hola, Mimo. Estoy en la zona de Balaídos / As Travesas / Coia (Vigo) y quiero consultar cobertura.'),
    };
  }

  if (q.includes('36800') || q.includes('redondela') || q.includes('chapela')) {
    const p = findPoint('punto-redondela');
    return {
      zonaLabel: 'Redondela y Ría de Vigo',
      summary: 'Punto colaborador oficial Mimos Redondela con las mismas tarifas que nuestras tiendas de Vigo y conexión con planta central.',
      pointName: `${p.nombre_mostrado} (Punto Oficial)`,
      pointAddress: `${p.direccion}, ${p.codigo_postal} ${p.localidad}`,
      pointSchedule: p.horario.resumen,
      pointPhone: p.telefonos_mostrados,
      pointRoute: '/zonas/redondela',
      pickupNote: 'Depósito sin pedido mínimo en tienda; consulta rutas a domicilio o sofás en tu zona con Mimo.',
      whatsappHref: buildMimoWhatsAppUrl('Hola, Mimo. Quiero consultar el servicio en Redondela (36800).'),
    };
  }

  if (q.includes('36380') || q.includes('gondomar') || q.includes('val minor') || q.includes('nigran') || q.includes('baiona') || q.includes('36350') || q.includes('36300')) {
    const p = findPoint('punto-gondomar');
    return {
      zonaLabel: 'Gondomar y Val Miñor',
      summary: 'Punto colaborador oficial Puntadas No Aire con apertura temprana desde las 08:00 (M-V), tintorería Mimos y taller de costura.',
      pointName: `${p.nombre_mostrado} (Punto Oficial + Costura)`,
      pointAddress: `${p.direccion}, ${p.codigo_postal} ${p.localidad}`,
      pointSchedule: p.horario.resumen,
      pointPhone: p.telefonos_mostrados,
      pointRoute: '/zonas/gondomar',
      pickupNote: 'Mismas tarifas que en Vigo sin recargos. Consulta disponibilidad a domicilio por WhatsApp.',
      whatsappHref: buildMimoWhatsAppUrl('Hola, Mimo. Quiero consultar servicio y rutas en Gondomar / Val Miñor.'),
    };
  }

  if (q.includes('36860') || q.includes('ponteareas') || q.includes('condado') || q.includes('mondariz') || q.includes('salvaterra')) {
    const p = findPoint('punto-ponteareas');
    return {
      zonaLabel: 'Ponteareas y O Condado',
      summary: 'Punto colaborador oficial Arregla2 con tintorería, lavandería, alfombras y arreglos de costura in situ con ruta a planta Navia.',
      pointName: `${p.nombre_mostrado} (Punto Oficial + Costura)`,
      pointAddress: `${p.direccion}, ${p.codigo_postal} ${p.localidad}`,
      pointSchedule: p.horario.resumen,
      pointPhone: p.telefonos_mostrados,
      pointRoute: '/zonas/ponteareas',
      pickupNote: 'Entrega cómoda en el centro de Ponteareas con las tarifas oficiales de Mimos Vigo.',
      whatsappHref: buildMimoWhatsAppUrl('Hola, Mimo. Quiero consultar servicio en Ponteareas / O Condado (36860).'),
    };
  }

  if (q.includes('36400') || q.includes('porrino') || q.includes('mos') || q.includes('lourina')) {
    const p = findPoint('punto-o-porrino');
    return {
      zonaLabel: 'O Porriño y A Louriña',
      summary: 'Punto colaborador oficial Telas y Más en Rúa Manuel Rodríguez con recepción Mimos y taller de costura in situ.',
      pointName: `${p.nombre_mostrado} (Punto Oficial + Costura)`,
      pointAddress: `${p.direccion}, ${p.codigo_postal} ${p.localidad}`,
      pointSchedule: p.horario.resumen,
      pointPhone: p.telefonos_mostrados,
      pointRoute: '/zonas/o-porrino',
      pickupNote: 'Sin recargo de transporte respecto a Vigo. Consulta días de ruta y entregas con Mimo.',
      whatsappHref: buildMimoWhatsAppUrl('Hola, Mimo. Quiero consultar servicio en O Porriño / A Louriña (36400).'),
    };
  }

  const p = findPoint('as-teixugueiras');
  return {
    zonaLabel: rawQuery.trim() ? `Consulta para «${rawQuery.trim()}»` : 'Vigo y área metropolitana',
    summary: `Operamos desde nuestras ${TIENDAS_PROPIAS.length} tiendas propias en Vigo, ${PUNTOS_COLABORADORES.length} puntos colaboradores y flota de recogida a domicilio.`,
    pointName: `${p.nombre_mostrado} (Sede Central y Coordinación)`,
    pointAddress: `${p.direccion}, ${p.codigo_postal} ${p.localidad}`,
    pointSchedule: p.horario.resumen,
    pointPhone: p.telefonos_mostrados,
    pointRoute: '/puntos-mimos',
    pickupNote: 'Escríbenos con tu dirección exacta y Mimo te confirma al momento el día de paso en tu calle.',
    whatsappHref: buildMimoWhatsAppUrl(
      `Hola, Mimo. Quiero comprobar si recogéis a domicilio o qué punto me queda más cerca para ${rawQuery.trim() || 'mi zona'}.`
    ),
  };
}

const QUICK_ZONES = [
  { label: 'Navia (36212)', query: 'navia' },
  { label: 'Centro / Venezuela (36203)', query: 'venezuela' },
  { label: 'O Calvario (36205)', query: 'gregorio' },
  { label: 'Balaídos / Coia', query: 'coia' },
  { label: 'Redondela', query: 'redondela' },
  { label: 'Gondomar', query: 'gondomar' },
  { label: 'Ponteareas', query: 'ponteareas' },
  { label: 'O Porriño', query: 'porrino' },
];

export const PreviewHeroSection: React.FC<PreviewHeroSectionProps> = ({
  onNavigate,
  onScrollToSection,
}) => {
  const [storeStatus, setStoreStatus] = useState<StoreStatusInfo>(() => getNaviaStoreStatus());
  const [activeScene, setActiveScene] = useState<SceneKey>('planta');
  const [zoneQuery, setZoneQuery] = useState('navia');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const interval = setInterval(() => {
      setStoreStatus(getNaviaStoreStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const currentScene = REAL_SCENES.find((s) => s.key === activeScene) ?? REAL_SCENES[0];
  const coverage = resolveCoverageByQuery(zoneQuery);

  return (
    <section
      aria-labelledby="preview-hero-heading"
      className="relative bg-white dark:bg-[#071324] border-b border-slate-200/70 dark:border-slate-800"
    >
      {/* Barra discreta exclusiva para comparar con la portada original */}
      <div className="bg-slate-100 dark:bg-[#0b1d36] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-[#002147] dark:text-slate-200 font-semibold">
            <Eye className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0" aria-hidden="true" />
            <span>Vista previa completa · Nueva portada editorial (oculta de Google)</span>
          </div>
          <a
            href="/"
            onClick={(e) => onNavigate('/', e)}
            className="inline-flex items-center gap-1.5 font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Comparar con la portada actual</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-14 sm:pb-20 lg:pt-18 lg:pb-24">
        {/* HERO EDITORIAL LIMPIO (Sin exceso de cajas ni etiquetas técnicas) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
              Tintorería, lavandería, costura y limpieza en Vigo
            </p>

            <h1
              id="preview-hero-heading"
              className="text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold text-[#002147] dark:text-white tracking-tight leading-[1.06] text-balance"
            >
              Cuidamos tu ropa, tus tapicerías y tus espacios con{' '}
              <span className="font-sketch text-[#0F76BB] dark:text-[#60B5F6] text-[1.08em] font-bold">
                mimo profesional.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              Desde nuestra planta central en <strong>Navia</strong> atendemos a particulares, alojamientos turísticos y empresas en <strong>Vigo y comarca</strong>: sin colas, con aviso por WhatsApp y recogida a domicilio.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <a
                href={CONTACT_INFO.whatsappGeneralHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('/preview-portada', 'hero')}
                className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-all duration-200 active:scale-[0.98] shadow-xs text-center sm:whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Consultar con Mimo</span>
              </a>

              <a
                href="#que-necesitas"
                onClick={(e) => {
                  e.preventDefault();
                  onScrollToSection('que-necesitas');
                }}
                className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] dark:hover:bg-[#0B5C94] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-all duration-200 active:scale-[0.98] text-center sm:whitespace-nowrap shrink-0"
              >
                <span>Elegir mi servicio</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              <a
                href={CONTACT_INFO.phoneHref}
                onClick={() => trackPhoneClick('/preview-portada', 'hero')}
                className="inline-flex items-center gap-2 font-bold text-[#002147] dark:text-white hover:text-[#0F76BB] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                <span className="tabular-nums">{CONTACT_INFO.phoneDisplay}</span>
              </a>
              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
              <span>Sede Navia: {storeStatus.statusText}</span>
            </div>
          </motion.div>

          {/* Columna derecha: Fotografía protagonista sin marcos pesados */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-4"
          >
            <div className="relative rounded-3xl overflow-hidden bg-[#002147] aspect-[4/3]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentScene.key}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full"
                >
                  {!failedImages[currentScene.key] ? (
                    <img
                      src={currentScene.imageUrl}
                      alt={currentScene.alt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [currentScene.key]: true }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-white">
                      <p className="text-base font-bold">{currentScene.kicker}</p>
                      <p className="text-sm text-slate-300 mt-1">{currentScene.caption}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div
                className="absolute inset-0 bg-gradient-to-t from-[#001530]/85 via-[#001530]/15 to-transparent pointer-events-none"
                aria-hidden="true"
              />

              {/* Sello visual discreto de Mimo */}
              <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/95 dark:bg-[#071324]/95 px-3 py-1.5 rounded-2xl shadow-sm">
                {!failedImages['osito'] ? (
                  <img
                    src={IMAGES.ositoMimos}
                    alt="Mimo, mascota de Tintorería Mimos"
                    referrerPolicy="no-referrer"
                    onError={() => setFailedImages((prev) => ({ ...prev, osito: true }))}
                    className="w-7 h-7 rounded-lg object-cover shrink-0"
                  />
                ) : (
                  <span className="w-7 h-7 rounded-lg bg-[#0F76BB] text-white text-xs font-extrabold flex items-center justify-center">
                    M
                  </span>
                )}
                <span className="text-xs font-extrabold text-[#002147] dark:text-white">
                  Mimos Navia
                </span>
              </div>

              <div className="absolute bottom-5 left-6 right-6 text-white">
                <p className="text-xs font-bold text-[#93c5fd]">{currentScene.kicker}</p>
                <p className="text-base sm:text-lg font-extrabold mt-0.5 leading-snug">
                  {currentScene.caption}
                </p>
              </div>
            </div>

            {/* Selector sutil de 3 escenas con barra deslizante */}
            <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-100 dark:bg-[#0b1d36]">
              {REAL_SCENES.map((scene) => {
                const isActive = activeScene === scene.key;
                return (
                  <button
                    key={scene.key}
                    type="button"
                    onClick={() => setActiveScene(scene.key)}
                    className={`relative flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-colors cursor-pointer whitespace-nowrap truncate ${
                      isActive
                        ? 'text-white'
                        : 'text-slate-600 dark:text-slate-300 hover:text-[#002147] dark:hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="hero-scene-active-bg"
                        transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                        className="absolute inset-0 rounded-xl bg-[#002147] dark:bg-[#0F76BB]"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10">{scene.tabLabel}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* COMPROBADOR INTERACTIVO DE COBERTURA POR CÓDIGO POSTAL O ZONA (Estilo Hampr) */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 rounded-3xl bg-[#F4F7FB] dark:bg-[#0b1d36] p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  Comprueba tu zona al instante
                </p>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                  ¿Dónde recogemos o cuál es tu punto Mimos más cercano?
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Escribe tu código postal, barrio o localidad de Vigo y comarca para ver horario y cobertura real.
                </p>
              </div>

              <div className="relative">
                <Search
                  className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={zoneQuery}
                  onChange={(e) => setZoneQuery(e.target.value)}
                  aria-label="Buscar por código postal, barrio o localidad"
                  placeholder="Ej.: 36212, Centro, Redondela, Gondomar..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                />
              </div>

              <div className="flex flex-wrap gap-1.5">
                {QUICK_ZONES.map((z) => {
                  const selected = zoneQuery.toLowerCase() === z.query;
                  return (
                    <button
                      key={z.label}
                      type="button"
                      onClick={() => setZoneQuery(z.query)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        selected
                          ? 'bg-[#002147] dark:bg-[#0F76BB] text-white'
                          : 'bg-white dark:bg-[#071324] text-slate-700 dark:text-slate-200 hover:text-[#0F76BB]'
                      }`}
                    >
                      {z.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={coverage.zonaLabel + coverage.pointName}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="rounded-2xl bg-white dark:bg-[#071324] p-6 sm:p-7 space-y-4 shadow-2xs"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Cobertura confirmada · {coverage.zonaLabel}</span>
                      </p>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white mt-1">
                        {coverage.pointName}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {coverage.summary}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-700 dark:text-slate-200">
                    <div className="flex items-start gap-2">
                      <Store className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="font-bold">{coverage.pointAddress}</p>
                        <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                          {coverage.pointSchedule} · Tel. {coverage.pointPhone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Truck className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                      <p className="text-slate-600 dark:text-slate-300">{coverage.pickupNote}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-3">
                    <a
                      href={coverage.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick('/preview-portada', 'coverage_checker')}
                      className="inline-flex items-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Consultar recogida en esta zona</span>
                    </a>
                    <a
                      href={coverage.pointRoute}
                      onClick={(e) => onNavigate(coverage.pointRoute, e)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline"
                    >
                      <MapPin className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                      <span>Ver ficha completa y mapa</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* CASCADA EN 3 PASOS (Estilo Poplin: tipografía limpia con secuencia progresiva) */}
        <div className="mt-16 pt-12 border-t border-slate-200/80 dark:border-slate-800">
          <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-6">
            Así de sencillo funciona Mimos
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                num: '01',
                title: 'Entregas o vamos a por ello',
                text: `Acude sin cita a nuestras ${TIENDAS_PROPIAS.length} tiendas en Vigo o ${PUNTOS_COLABORADORES.length} puntos colaboradores, o solicita recogida con nuestra flota.`,
              },
              {
                num: '02',
                title: 'Tratamos cada fibra con criterio',
                text: 'Tintorería, Wet Cleaning, costura en taller propio, lavado de alfombras en planta o limpieza de sofás en tu casa.',
              },
              {
                num: '03',
                title: 'Aviso directo por WhatsApp',
                text: 'En cuanto tus prendas salen planchadas y revisadas te avisamos para que recojas o recibas en puerta sin viajes inútiles.',
              },
            ].map((step, idx) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="space-y-2.5"
              >
                <p className="text-3xl font-extrabold text-[#0F76BB]/80 dark:text-[#60B5F6] tabular-nums">
                  {step.num}
                </p>
                <h3 className="text-lg font-extrabold text-[#002147] dark:text-white">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
