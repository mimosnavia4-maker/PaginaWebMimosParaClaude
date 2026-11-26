import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import heroCasasImg from '../assets/images/limpieza_casas_vigo_1795601216889.webp';
import { LIMPIEZA_CASAS_DATA } from '../data/servicePagesData';
import { CONTACT_INFO, TIENDAS_PROPIAS, buildMimoWhatsAppUrl } from '../data/mimosData';
import { trackFormPrepared, trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';
import { PageHeroLight } from './PageHeroLight';

interface HomeCleaningPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

const ZONA_CHIPS = [
  'Navia / Coia / Bouzas',
  'Centro / Venezuela / Gregorio Espino',
  'Teis / Lavadores / Castrelos',
  'Alcabre / Coruxo / Oia / Samil',
  'Redondela / Nigrán / Gondomar',
  'Mos / O Porriño / Ponteareas',
  'Otra zona de Vigo o comarca',
] as const;

const VIVIENDA_CHIPS = [
  'Piso 1–2 habitaciones',
  'Piso 3–4 habitaciones',
  'Casa o chalet',
] as const;

const FRECUENCIA_CHIPS = [
  'Mantenimiento semanal',
  'Mantenimiento quincenal',
  'Mantenimiento mensual',
  'Limpieza puntual / puesta a punto (mín. 2 h)',
  'Necesito asesoramiento',
] as const;

const EXTRAS_CHIPS = [
  'Solo limpieza de casa',
  'Sofá o colchón a domicilio',
  'Colada o planchado',
  'Cortinas / edredones',
  'Alfombras (especialista)',
] as const;

export const HomeCleaningPage: React.FC<HomeCleaningPageProps> = ({ onNavigate }) => {
  const [zonaSeleccionada, setZonaSeleccionada] = useState<string>(ZONA_CHIPS[0]);
  const [tipoVivienda, setTipoVivienda] = useState<string>(VIVIENDA_CHIPS[0]);
  const [frecuencia, setFrecuencia] = useState<string>(FRECUENCIA_CHIPS[0]);
  const [extras, setExtras] = useState<string[]>([EXTRAS_CHIPS[0]]);
  const [observaciones, setObservaciones] = useState('');
  const [aceptoPrivacidad, setAceptoPrivacidad] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [preparedReady, setPreparedReady] = useState(false);
  const [copied, setCopied] = useState(false);

  const heroWhatsappHref = buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero pedir valoración para limpieza de una vivienda particular en Vigo.'
  );

  const toggleExtra = (item: string) => {
    setPreparedReady(false);
    if (item === 'Solo limpieza de casa') {
      setExtras(['Solo limpieza de casa']);
      return;
    }
    setExtras((prev) => {
      const withoutSolo = prev.filter((x) => x !== 'Solo limpieza de casa');
      const exists = withoutSolo.includes(item);
      const next = exists ? withoutSolo.filter((x) => x !== item) : [...withoutSolo, item];
      return next.length > 0 ? next : ['Solo limpieza de casa'];
    });
  };

  const buildHomeCleaningMessage = () => {
    const lines = [
      'Hola, Mimo. Quiero solicitar valoración a medida para limpieza de vivienda particular.',
      `Zona: ${zonaSeleccionada}`,
      `Vivienda: ${tipoVivienda}`,
      `Modalidad / frecuencia: ${frecuencia}`,
      `Extras de interés: ${extras.join(', ')}`,
    ];
    if (observaciones.trim()) {
      lines.push(`Observaciones: ${observaciones.trim()}`);
    }
    return lines.join('\n');
  };

  const whatsappFormHref = buildMimoWhatsAppUrl(buildHomeCleaningMessage());

  const handlePrepare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aceptoPrivacidad) {
      setErrorMsg('Acepta la política de privacidad para preparar el mensaje hacia WhatsApp.');
      return;
    }
    setErrorMsg('');
    setPreparedReady(true);
    trackFormPrepared('/limpieza-casas-vigo', 'home_cleaning_quote');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildHomeCleaningMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="focus:outline-hidden bg-white text-slate-900 border-b border-slate-200"
    >
      {/* Navegación rápida entre divisiones de limpieza */}
      <nav
        aria-label="Divisiones de limpieza en Vigo"
        className="bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-bold border border-[#0F76BB] bg-[#EDF5FD] text-[#002147] whitespace-nowrap shrink-0">
              Casas y pisos particulares
            </span>
            <a
              href="/limpieza-sofas-vigo"
              onClick={(e) => onNavigate('/limpieza-sofas-vigo', e)}
              className="inline-flex items-center min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:border-[#0F76BB] hover:text-[#002147] transition-colors whitespace-nowrap shrink-0"
            >
              Sofás y colchones a domicilio
            </a>
            <a
              href="/textiles-hogar-vigo"
              onClick={(e) => onNavigate('/textiles-hogar-vigo', e)}
              className="inline-flex items-center min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:border-[#0F76BB] hover:text-[#002147] transition-colors whitespace-nowrap shrink-0"
            >
              Cortinas y edredones
            </a>
            <a
              href="/colada-familiar-vigo"
              onClick={(e) => onNavigate('/colada-familiar-vigo', e)}
              className="inline-flex items-center min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-bold border border-slate-200 bg-white text-slate-700 hover:border-[#0F76BB] hover:text-[#002147] transition-colors whitespace-nowrap shrink-0"
            >
              Colada y planchado
            </a>
            <a
              href="/limpieza-profesional-vigo"
              onClick={(e) => onNavigate('/limpieza-profesional-vigo', e)}
              className="inline-flex items-center min-h-[44px] px-3.5 py-1.5 rounded-lg text-xs font-bold border border-slate-200 bg-white text-[#0C65A1] hover:border-[#0F76BB] transition-colors whitespace-nowrap shrink-0"
            >
              Oficinas y comunidades →
            </a>
          </div>
        </div>
      </nav>

      {/* Hero luminoso unificado */}
      <PageHeroLight
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Limpieza de casas en Vigo' },
        ]}
        onNavigate={onNavigate}
        kicker={LIMPIEZA_CASAS_DATA.badgeSuperior}
        title={LIMPIEZA_CASAS_DATA.h1}
        description={LIMPIEZA_CASAS_DATA.subtitulo}
        note={
          <span>
            <strong>Condiciones claras desde el primer contacto:</strong> mínimo{' '}
            <strong>2 horas</strong> por servicio, productos a elección del cliente,{' '}
            <strong>custodia de llaves</strong> disponible y atención presencial en Vigo. No realizamos limpiezas fin de obra.
          </span>
        }
        whatsappHref={heroWhatsappHref}
        whatsappLabel="Pedir valoración por WhatsApp"
        onWhatsAppClick={() =>
          trackWhatsAppClick('/limpieza-casas-vigo', 'home_cleaning_hero', {
            service_id: 'limpieza-casas-vigo',
          })
        }
        secondaryAction={{
          label: 'Preparar valoración en 30 s',
          href: '#presupuesto-limpieza-casas',
          isInternalRoute: false,
        }}
        image={{
          src: heroCasasImg,
          alt: 'Vivienda particular luminosa y limpia en Vigo con suelo de madera y cocina despejada',
          caption:
            'Equipo propio asegurado en Vigo y comarca (desde 2011): mantenimiento periódico o puesta a punto combinable con tapicerías, colada y cortinas.',
          fallbackTitle: 'Limpieza de casas particulares en Vigo',
          fallbackSubtitle: 'Personal propio en Régimen General · Mín. 2 horas · Seguro RC',
        }}
      />

      {/* Cinta compacta de prueba física y trayectoria real (desde 2011) */}
      <section aria-label="Respaldo físico en Vigo" className="bg-white border-b border-slate-200 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 text-sm font-extrabold text-[#002147]">
              <ShieldCheck className="w-5 h-5 text-[#147A3E] shrink-0" aria-hidden="true" />
              <span>Desde 2011 en Vigo · {TIENDAS_PROPIAS.length} tiendas físicas propias:</span>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-slate-700">
              {TIENDAS_PROPIAS.map((t) => (
                <a
                  key={t.id}
                  href={
                    t.id === 'as-teixugueiras'
                      ? '/tienda-mimos-navia-vigo'
                      : t.id === 'gregorio-espino'
                      ? '/tienda-mimos-gregorio-espino-vigo'
                      : '/tienda-mimos-venezuela-vigo'
                  }
                  onClick={(e) =>
                    onNavigate(
                      t.id === 'as-teixugueiras'
                        ? '/tienda-mimos-navia-vigo'
                        : t.id === 'gregorio-espino'
                        ? '/tienda-mimos-gregorio-espino-vigo'
                        : '/tienda-mimos-venezuela-vigo',
                      e
                    )
                  }
                  className="inline-flex items-center gap-1.5 min-h-[44px] hover:text-[#0F76BB] underline-offset-4 hover:underline"
                >
                  <MapPin className="w-3.5 h-3.5 text-[#0C65A1] shrink-0" aria-hidden="true" />
                  <span>
                    <strong className="text-[#002147]">{t.nombre_mostrado.replace('Tintorería ', '')}:</strong>{' '}
                    {t.direccion}
                  </span>
                </a>
              ))}
              <a
                href={CONTACT_INFO.phoneHref}
                onClick={() => trackPhoneClick('/limpieza-casas-vigo', 'home_cleaning_trust_strip')}
                className="inline-flex items-center gap-1.5 min-h-[44px] font-bold text-[#0C65A1] hover:underline"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE 1 · Qué limpiamos dentro de tu casa */}
      <section className="py-12 sm:py-16 bg-[#F7F6F2] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
              Alcance interior por estancias
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight">
              Qué limpiamos en tu casa o piso en Vigo
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Organizamos cada visita (mínimo 2 horas) alrededor de las estancias prioritarias de tu vivienda y según tus preferencias de productos.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {LIMPIEZA_CASAS_DATA.estanciasQueLimpiamos.map((estancia) => (
              <article
                key={estancia.index}
                className="rounded-xl border border-slate-200 bg-white p-6 space-y-2.5"
              >
                <p className="text-xs font-mono font-bold text-[#0C65A1] tabular-nums">
                  {estancia.index} · ESTANCIA
                </p>
                <h3 className="text-base sm:text-lg font-extrabold text-[#002147] leading-snug">
                  {estancia.titulo}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">{estancia.detalle}</p>
              </article>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 border-l-4 border-l-[#0F76BB] bg-white p-5 sm:p-6 flex items-start gap-3.5">
            <AlertCircle className="w-5 h-5 text-[#0C65A1] shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <h3 className="text-sm sm:text-base font-extrabold text-[#002147]">
                Condiciones transparentes del servicio doméstico
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {LIMPIEZA_CASAS_DATA.alcanceTransparente}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE 2 · Modalidades claras + Ecosistema Hogar Mimos */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <div className="max-w-3xl mb-8 space-y-2">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
                Mantenimiento periódico o puesta a punto
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight">
                Modalidades adaptadas a tu hogar desde 2 horas por servicio
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Cada piso o casa se valora gratis a medida según superficie, número de baños, estado y periodicidad, sin tarifas genéricas inventadas.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LIMPIEZA_CASAS_DATA.modalidades.map((mod) => (
                <article
                  key={mod.id}
                  className="rounded-xl border border-slate-200 bg-[#F7F6F2]/60 p-6 sm:p-8 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
                      {mod.etiqueta}
                    </p>
                    <h3 className="text-xl font-extrabold text-[#002147]">{mod.titulo}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{mod.descripcion}</p>
                    <ul className="space-y-2 pt-2">
                      {mod.puntos.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-2.5 text-sm text-slate-700"
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

                  <div className="pt-2">
                    <a
                      href={buildMimoWhatsAppUrl(
                        `Hola, Mimo. Quiero solicitar valoración para ${mod.titulo.toLowerCase()} (mín. 2 h) en mi vivienda.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackWhatsAppClick('/limpieza-casas-vigo', `modality_${mod.id}`)
                      }
                      className="inline-flex items-center justify-center gap-2 min-h-[44px] w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Valorar esta modalidad</span>
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Diferencial único de Mimos en el hogar */}
          <div className="border-t border-slate-200 pt-10 space-y-6">
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
                Todo en un mismo equipo
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight">
                Combina limpieza de casa, sofás, colchones, colada y cortinas
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Resuelve la limpieza de tu vivienda y el cuidado textil con un único interlocutor en Vigo: planta propia de tintorería y lavandería en Navia, equipo a domicilio para tapicerías y recogida de alfombras con taller especialista.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {LIMPIEZA_CASAS_DATA.serviciosCombinablesMimos.map((srv) => (
                <article
                  key={srv.href}
                  className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between space-y-4 hover:border-[#0F76BB] transition-colors"
                >
                  <div className="space-y-2">
                    <h3 className="text-base font-extrabold text-[#002147] leading-snug">
                      {srv.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {srv.descripcion}
                    </p>
                  </div>
                  <a
                    href={srv.href}
                    onClick={(e) => onNavigate(srv.href, e)}
                    className="inline-flex items-center gap-1.5 min-h-[44px] text-xs sm:text-sm font-bold text-[#0C65A1] hover:text-[#002147] hover:underline"
                  >
                    <span>{srv.cta}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE 3 · Bloque anti-objeciones (RD 893/2024, Seguro RC y respaldo físico) */}
      <section className="py-12 sm:py-16 bg-[#EDF5FD] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
              Seguridad jurídica frente a la economía informal
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight">
              Por qué elegir plantilla propia asegurada frente a contratar por tu cuenta
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Al delegar en empresa local evitas ejercer de empleador doméstico bajo el Real Decreto 893/2024 y cuentas con cobertura de daños y 3 establecimientos reales en Vigo.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="bg-[#002147] text-white text-xs sm:text-sm">
                  <th scope="col" className="py-3.5 px-4 sm:px-6 font-bold w-1/4">
                    Aspecto clave
                  </th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6 font-bold w-[37.5%]">
                    Con Tintorería y Limpieza Mimos
                  </th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6 font-bold w-[37.5%] text-slate-200">
                    Particular sin alta / acuerdo informal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                {LIMPIEZA_CASAS_DATA.comparativaConfianza.map((fila) => (
                  <tr key={fila.criterio} className="align-top">
                    <th
                      scope="row"
                      className="py-4 px-4 sm:px-6 font-extrabold text-[#002147] bg-[#F7F6F2]/70"
                    >
                      {fila.criterio}
                    </th>
                    <td className="py-4 px-4 sm:px-6 text-slate-800 leading-relaxed">
                      <span className="inline-flex items-start gap-2">
                        <ShieldCheck
                          className="w-4 h-4 text-[#147A3E] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{fila.mimos}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600 leading-relaxed">
                      {fila.informal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* BLOQUE 4 · Filtro de alcance: Qué SÍ incluye vs Qué NO incluye */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
              Transparencia operativa antes de pedir presupuesto
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight">
              Qué incluye y qué NO incluye nuestro servicio residencial
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article className="rounded-xl border border-[#178A47]/30 bg-[#F7F6F2]/60 p-6 sm:p-7 space-y-4">
              <h3 className="text-lg font-extrabold text-[#002147]">
                Qué SÍ incluye en tu vivienda
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                {LIMPIEZA_CASAS_DATA.checklistIncluye.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#147A3E] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7 space-y-4">
              <h3 className="text-lg font-extrabold text-[#002147]">
                Qué NO incluye este servicio
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                {LIMPIEZA_CASAS_DATA.checklistNoIncluye.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <XCircle
                      className="w-4 h-4 text-slate-400 shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      {/* BLOQUE 5 · Micro-formulario rápido móvil por chips táctiles */}
      <section
        id="presupuesto-limpieza-casas"
        className="py-12 sm:py-16 bg-[#F7F6F2] border-b border-slate-200"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 space-y-6 shadow-xs">
            <div className="space-y-2">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
                Sin formularios largos · Cualificación en 4 toques
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight">
                Prepara tu valoración a medida en 30 segundos
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Marca las opciones de tu vivienda para abrir WhatsApp con tu solicitud ya redactada, o llámanos directamente al{' '}
                <a
                  href={CONTACT_INFO.phoneHref}
                  onClick={() => trackPhoneClick('/limpieza-casas-vigo', 'home_cleaning_form_tel')}
                  className="font-bold text-[#0C65A1] hover:underline"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>
                .
              </p>
            </div>

            <form onSubmit={handlePrepare} className="space-y-6">
              {/* Paso 1: Zona */}
              <fieldset className="space-y-2.5">
                <legend className="text-sm font-extrabold text-[#002147]">
                  1. ¿En qué zona de Vigo o comarca está la vivienda?
                </legend>
                <div className="flex flex-wrap gap-2">
                  {ZONA_CHIPS.map((zona) => {
                    const active = zonaSeleccionada === zona;
                    return (
                      <button
                        key={zona}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setZonaSeleccionada(zona);
                          setPreparedReady(false);
                        }}
                        className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold border transition-colors cursor-pointer text-left ${
                          active
                            ? 'bg-[#002147] border-[#002147] text-white'
                            : 'bg-[#F7F6F2] border-slate-300 text-[#002147] hover:border-[#0F76BB]'
                        }`}
                      >
                        {zona}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Paso 2: Tipo de vivienda */}
              <fieldset className="space-y-2.5">
                <legend className="text-sm font-extrabold text-[#002147]">
                  2. Tipo de vivienda
                </legend>
                <div className="flex flex-wrap gap-2">
                  {VIVIENDA_CHIPS.map((tipo) => {
                    const active = tipoVivienda === tipo;
                    return (
                      <button
                        key={tipo}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setTipoVivienda(tipo);
                          setPreparedReady(false);
                        }}
                        className={`min-h-[44px] px-4 py-2 rounded-lg text-xs sm:text-sm font-bold border transition-colors cursor-pointer ${
                          active
                            ? 'bg-[#002147] border-[#002147] text-white'
                            : 'bg-[#F7F6F2] border-slate-300 text-[#002147] hover:border-[#0F76BB]'
                        }`}
                      >
                        {tipo}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Paso 3: Frecuencia */}
              <fieldset className="space-y-2.5">
                <legend className="text-sm font-extrabold text-[#002147]">
                  3. Frecuencia o modalidad deseada
                </legend>
                <div className="flex flex-wrap gap-2">
                  {FRECUENCIA_CHIPS.map((freq) => {
                    const active = frecuencia === freq;
                    return (
                      <button
                        key={freq}
                        type="button"
                        aria-pressed={active}
                        onClick={() => {
                          setFrecuencia(freq);
                          setPreparedReady(false);
                        }}
                        className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold border transition-colors cursor-pointer text-left ${
                          active
                            ? 'bg-[#002147] border-[#002147] text-white'
                            : 'bg-[#F7F6F2] border-slate-300 text-[#002147] hover:border-[#0F76BB]'
                        }`}
                      >
                        {freq}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Paso 4: Extras del Hogar (selección múltiple) */}
              <fieldset className="space-y-2.5">
                <legend className="text-sm font-extrabold text-[#002147]">
                  4. Extras combinables (opcional, puedes marcar varios)
                </legend>
                <div className="flex flex-wrap gap-2">
                  {EXTRAS_CHIPS.map((extra) => {
                    const active = extras.includes(extra);
                    return (
                      <button
                        key={extra}
                        type="button"
                        aria-pressed={active}
                        onClick={() => toggleExtra(extra)}
                        className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-bold border transition-colors cursor-pointer text-left ${
                          active
                            ? 'bg-[#EDF5FD] border-[#0F76BB] text-[#002147]'
                            : 'bg-white border-slate-300 text-slate-700 hover:border-[#0F76BB]'
                        }`}
                      >
                        {extra}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div>
                <label
                  htmlFor="hc-observaciones"
                  className="block text-sm font-bold text-[#002147] mb-1.5"
                >
                  Observaciones breves (opcional: custodia de llaves, preferencia de productos, baños...)
                </label>
                <textarea
                  id="hc-observaciones"
                  rows={2}
                  value={observaciones}
                  onChange={(e) => {
                    setObservaciones(e.target.value);
                    setPreparedReady(false);
                  }}
                  placeholder="Ej.: 2 baños, preferimos usar nuestros productos en casa y consultar custodia de llaves..."
                  className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 bg-[#F7F6F2]/40 text-base lg:text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden"
                />
              </div>

              <label className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={aceptoPrivacidad}
                  onChange={(e) => {
                    setAceptoPrivacidad(e.target.checked);
                    setErrorMsg('');
                  }}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0C65A1] focus:ring-[#0F76BB]"
                />
                <span>
                  Acepto la{' '}
                  <a
                    href="/privacidad"
                    onClick={(e) => onNavigate('/privacidad', e)}
                    className="underline font-bold text-[#002147] hover:text-[#0F76BB]"
                  >
                    política de privacidad
                  </a>{' '}
                  para preparar mi solicitud hacia WhatsApp.
                </span>
              </label>

              {errorMsg && (
                <p role="alert" className="text-xs sm:text-sm font-bold text-red-700">
                  {errorMsg}
                </p>
              )}

              {!preparedReady ? (
                <button
                  type="submit"
                  className="w-full sm:w-auto min-h-[48px] bg-[#002147] hover:bg-[#0a3161] text-white font-bold text-sm sm:text-base py-3 px-6 rounded-lg transition-colors cursor-pointer"
                >
                  Preparar solicitud para WhatsApp
                </button>
              ) : (
                <div className="p-4 sm:p-5 rounded-xl border border-[#1FA855]/45 bg-[#EDF5FD] space-y-3">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#002147]">
                    Mensaje listo para enviar a Mimo ({CONTACT_INFO.whatsappNumber})
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <a
                      href={whatsappFormHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackWhatsAppClick('/limpieza-casas-vigo', 'home_cleaning_form_send', {
                          service_id: 'limpieza-casas-vigo',
                        })
                      }
                      className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm sm:text-base py-3 px-5 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Solicitar valoración por WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center justify-center gap-1.5 min-h-[48px] bg-white border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] text-xs sm:text-sm font-bold py-3 px-4 rounded-lg cursor-pointer transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-[#147A3E]" aria-hidden="true" />
                          <span>Texto copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" aria-hidden="true" />
                          <span>Copiar mensaje</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* BLOQUE 6 · Cobertura local en barrios de Vigo y comarca */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
              Desplazamiento en Vigo y área de influencia
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight">
              Barrios de Vigo y comarca donde trabajamos
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Nuestro equipo de limpieza doméstica atiende viviendas en Vigo urbano, parroquias residenciales y municipios cercanos confirmando ruta y horario con Mimo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-200 bg-[#F7F6F2]/60 p-6 space-y-3">
              <h3 className="text-base font-extrabold text-[#002147]">
                Barrios y parroquias de Vigo
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {LIMPIEZA_CASAS_DATA.coberturaGeografica.vigoBarrios.join(' · ')}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-[#EDF5FD]/60 p-6 space-y-3">
              <h3 className="text-base font-extrabold text-[#002147]">
                Comarca y municipios del área metropolitana
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {LIMPIEZA_CASAS_DATA.coberturaGeografica.comarcaMunicipios.join(' · ')}
              </p>
              <p className="text-xs text-slate-600">
                Además, si quieres entregar o recoger prendas sueltas, colada o alfombras presencialmente, puedes consultar nuestros{' '}
                <a
                  href="/puntos-mimos"
                  onClick={(e) => onNavigate('/puntos-mimos', e)}
                  className="font-bold text-[#0C65A1] hover:underline"
                >
                  puntos colaboradores de recepción textil
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOQUE 7 · Preguntas frecuentes reales (10) + Enrutador anti-canibalización */}
      <section className="py-12 sm:py-16 bg-[#F7F6F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
                Dudas habituales antes de contratar
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight">
                Preguntas frecuentes sobre limpieza de casas en Vigo
              </h2>
            </div>

            <div className="divide-y divide-slate-200 border-t border-b border-slate-200 bg-white rounded-xl px-5 sm:px-7">
              {LIMPIEZA_CASAS_DATA.preguntasFrecuentes.map((faq) => (
                <details key={faq.pregunta} className="group py-4 sm:py-5">
                  <summary className="list-none cursor-pointer flex items-center justify-between gap-4 min-h-[44px] text-sm sm:text-base font-extrabold text-[#002147] hover:text-[#0F76BB] transition-colors">
                    <span>{faq.pregunta}</span>
                    <span
                      aria-hidden="true"
                      className="text-lg font-mono text-[#0C65A1] shrink-0 group-open:rotate-45 transition-transform"
                    >
                      +
                    </span>
                  </summary>
                  <p className="pt-2.5 pb-1 text-sm text-slate-600 leading-relaxed">
                    {faq.respuesta}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Enrutador anti-canibalización */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <h2 className="text-base sm:text-lg font-extrabold text-[#002147]">
              ¿Buscas limpieza para tu comunidad, oficina o apartamento turístico?
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Para atender cada inmueble con su protocolo específico, contamos con secciones separadas para empresas/comunidades y viviendas vacacionales VUT:
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/limpieza-profesional-vigo"
                onClick={(e) => onNavigate('/limpieza-profesional-vigo', e)}
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-lg bg-white border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] text-xs sm:text-sm font-bold transition-colors"
              >
                <span>Comunidades, oficinas y locales</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
              <a
                href="/limpieza-apartamentos-turisticos-vigo"
                onClick={(e) => onNavigate('/limpieza-apartamentos-turisticos-vigo', e)}
                className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2.5 rounded-lg bg-white border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] text-xs sm:text-sm font-bold transition-colors"
              >
                <span>Apartamentos turísticos (VUT)</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="inline-flex items-center gap-2 min-h-[44px] text-sm font-bold text-[#002147] hover:text-[#0F76BB]"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Volver a la portada de Tintorería Mimos Navia</span>
            </a>

            <a
              href={CONTACT_INFO.phoneHref}
              onClick={() => trackPhoneClick('/limpieza-casas-vigo', 'home_cleaning_footer_tel')}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-lg bg-white border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] text-sm font-bold transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Llamar al {CONTACT_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
