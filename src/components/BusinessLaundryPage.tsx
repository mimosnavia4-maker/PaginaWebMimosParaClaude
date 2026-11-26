import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  Copy,
  FileText,
  HelpCircle,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import { SERVICIO_EMPRESAS_B2B_DATA } from '../data/servicePagesData';
import {
  CONTACT_INFO,
  TIENDAS_PROPIAS,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import {
  trackFormPrepared,
  trackPhoneClick,
  trackWhatsAppClick,
} from '../utils/analytics';
import { PageHeroLight } from './PageHeroLight';

interface BusinessLaundryPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

const SECTORES_FORMULARIO = [
  'Peluquería, barbería o centro de estética (toallas, capas, kimonos, batas)',
  'Clínica médica, dental, fisioterapia o veterinaria (suciedad habitual, sin riesgo biológico)',
  'Comercio, oficina, gimnasio o vestuario laboral con suciedad normal',
  'Pequeño lote puntual de cocina o eventos (chaquetillas, mandiles, 2–3 manteles)',
  'Otro negocio (prendas propias con suciedad habitual)',
] as const;

const MODALIDADES_ENTREGA_B2B = [
  'Entrega y recogida en una de las 3 tiendas de Vigo (Navia, Gregorio Espino o Venezuela)',
  'Recogida y entrega en mi local (a coordinar ruta y volumen con Mimo)',
  'A valorar según volumen con Mimo',
] as const;

const FRECUENCIAS_B2B = [
  'Semanal o varias veces por semana',
  'Quincenal o mensual',
  'Encargo puntual',
] as const;

export const BusinessLaundryPage: React.FC<BusinessLaundryPageProps> = ({ onNavigate }) => {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [telefono, setTelefono] = useState('');
  const [sector, setSector] = useState<string>(SECTORES_FORMULARIO[0]);
  const [modalidadEntrega, setModalidadEntrega] = useState<string>(MODALIDADES_ENTREGA_B2B[0]);
  const [frecuencia, setFrecuencia] = useState<string>(FRECUENCIAS_B2B[0]);
  const [detalles, setDetalles] = useState('');
  const [facturaCif, setFacturaCif] = useState(true);
  const [aceptoPrivacidad, setAceptoPrivacidad] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [preparedReady, setPreparedReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const buildQuoteMessage = () => {
    const lines = [
      'Hola, Mimo. Escribo desde la web de empresas para consultar el lavado de nuestras propias prendas en Vigo.',
      `Empresa / Contacto: ${nombreEmpresa.trim()}`,
      `Teléfono: ${telefono.trim()}`,
      `Sector: ${sector}`,
      `Entrega / Recogida: ${modalidadEntrega}`,
      `Frecuencia estimada: ${frecuencia}`,
      `Facturación mensual con CIF: ${facturaCif ? 'Sí, la necesito' : 'No de momento / a valorar'}`,
    ];
    if (detalles.trim()) {
      lines.push(`Prendas, volumen y barrio en Vigo: ${detalles.trim()}`);
    }
    return lines.join('\n');
  };

  const whatsappQuoteHref = buildMimoWhatsAppUrl(buildQuoteMessage());

  const handlePrepareQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreEmpresa.trim() || !telefono.trim()) {
      setErrorMsg('Por favor, indica el nombre de tu negocio o contacto y un teléfono.');
      return;
    }
    if (!aceptoPrivacidad) {
      setErrorMsg('Debes aceptar la política de privacidad para preparar tu solicitud.');
      return;
    }
    setErrorMsg('');
    setPreparedReady(true);
    trackFormPrepared('/servicios-empresas', 'quote_empresas');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildQuoteMessage());
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
      {/* 1. Cabecera luminosa B2B */}
      <PageHeroLight
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Lavandería para empresas' },
        ]}
        onNavigate={onNavigate}
        kicker={SERVICIO_EMPRESAS_B2B_DATA.badgeSuperior}
        title={SERVICIO_EMPRESAS_B2B_DATA.h1}
        description={SERVICIO_EMPRESAS_B2B_DATA.subtitulo}
        note={SERVICIO_EMPRESAS_B2B_DATA.microResumenHero}
        whatsappHref={buildMimoWhatsAppUrl(
          'Hola, Mimo. Escribo desde la web de empresas. Quiero valorar el lavado de las propias prendas de mi negocio en Vigo (lotes separados, sin renting).'
        )}
        whatsappLabel="Pedir valoración por WhatsApp con Mimo"
        onWhatsAppClick={() =>
          trackWhatsAppClick('/servicios-empresas', 'empresas_hero', {
            service_id: 'servicios-empresas',
          })
        }
        secondaryAction={{
          label: `Llamar al ${CONTACT_INFO.phoneDisplay}`,
          href: CONTACT_INFO.phoneHref,
          icon: <Phone className="w-4 h-4 text-[#0C65A1] group-hover:text-white" aria-hidden="true" />,
          isInternalRoute: false,
        }}
        extraContent={
          <div className="pt-1">
            <a
              href="#presupuesto-empresas"
              className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold text-[#0C65A1] hover:text-[#002147] underline-offset-4 hover:underline"
            >
              <span>Preparar consulta guiada para Mimo</span>
              <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        }
      />

      {/* 1B. Ventajas directas para tu negocio */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#0C65A1] font-bold mb-5">
            <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Ventaja directa para tu negocio en Vigo</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-5 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-[#147A3E] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong className="text-[#002147]">Tus propias prendas, sin renting:</strong> no alquilas lencería ajena ni pierdes tus toallas o batas bordadas.
              </span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-5 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-[#147A3E] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong className="text-[#002147]">Carros separados y marcado:</strong> aislamos cargas por cliente y marcamos piezas repetidas para evitar pérdidas.
              </span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-5 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-[#147A3E] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong className="text-[#002147]">Secado completo para Vigo:</strong> olvídate del olor a humedad y de tender en el local en invierno.
              </span>
            </div>
            <div className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-5 flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <CheckCircle2 className="w-4 h-4 text-[#147A3E] shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <strong className="text-[#002147]">Sin permanencia y factura con CIF:</strong> pagas solo por lo enviado y eliges 3 tiendas o recogida concertada.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BLOQUE VERTICALES: Sectores que cuidamos */}
      <section className="py-12 lg:py-18 bg-[#F7F6F2] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 space-y-2">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
              Navia, Gregorio Espino, Vigo centro y rutas concertadas · Prendas propias de tu negocio
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
              {SERVICIO_EMPRESAS_B2B_DATA.sectoresTitulo}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {SERVICIO_EMPRESAS_B2B_DATA.sectoresSubtitulo}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICIO_EMPRESAS_B2B_DATA.sectores.map((sec) => (
              <article
                key={sec.id}
                className="rounded-xl border border-slate-200 bg-white p-6 sm:p-7 flex flex-col justify-between shadow-2xs"
              >
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1] mb-1">
                      {sec.etiqueta}
                    </p>
                    <h3 className="text-xl font-extrabold text-[#002147]">
                      {sec.titulo}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {sec.descripcion}
                  </p>

                  <ul className="space-y-2.5 pt-3 border-t border-slate-200 text-xs sm:text-sm text-slate-700">
                    {sec.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 mt-6 border-t border-slate-200">
                  <a
                    href={buildMimoWhatsAppUrl(sec.whatsappTexto)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick('/servicios-empresas', 'empresas_sector_card', {
                        service_id: `empresas:${sec.id}`,
                      })
                    }
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-lg bg-[#1FA855] hover:bg-[#25B860] text-[#002147] text-xs sm:text-sm font-bold transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Consultar este sector con Mimo</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. BLOQUE PRUEBA TÉCNICA REAL EN PLANTA PROPIA DE NAVIA */}
      <section className="py-12 lg:py-18 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1]">
              Planta propia en Navia · Control directo de principio a fin
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
              {SERVICIO_EMPRESAS_B2B_DATA.procesoPlantaTitulo}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {SERVICIO_EMPRESAS_B2B_DATA.procesoPlantaSubtitulo}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SERVICIO_EMPRESAS_B2B_DATA.procesoPlanta.map((paso) => (
              <article
                key={paso.numero}
                className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-5 space-y-2.5"
              >
                <p className="text-xs font-mono font-bold text-[#0C65A1] tabular-nums">
                  PASO {paso.numero}
                </p>
                <h3 className="text-base font-extrabold text-[#002147] leading-snug">
                  {paso.titulo}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {paso.descripcion}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BLOQUE FILTRADO POSITIVO Y EXCLUSIVIDAD OPERATIVA */}
      <section className="py-12 lg:py-18 bg-[#EDF5FD] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider text-[#0C65A1] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Alternativa cercana frente a la gran lavandería industrial</span>
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
              {SERVICIO_EMPRESAS_B2B_DATA.exclusividadTitulo}
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {SERVICIO_EMPRESAS_B2B_DATA.exclusividadSubtitulo}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {SERVICIO_EMPRESAS_B2B_DATA.exclusividadPuntos.map((punto) => (
              <article
                key={punto.id}
                className="rounded-xl border border-slate-200 border-t-4 border-t-[#0F76BB] bg-white p-6 sm:p-7 space-y-2.5"
              >
                <h3 className="text-lg font-extrabold text-[#002147] leading-snug">
                  {punto.titulo}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {punto.descripcion}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BLOQUE LOGÍSTICA EN VIGO + FORMULARIO CUALIFICADOR B2B */}
      <section
        id="presupuesto-empresas"
        className="py-12 lg:py-18 bg-[#F7F6F2] border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0C65A1] flex items-center gap-1.5">
              <Truck className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Logística flexible y facturación fiscal</span>
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
              {SERVICIO_EMPRESAS_B2B_DATA.ventajasTitulo}
            </h2>
          </div>

          {/* 4 pilares logísticos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SERVICIO_EMPRESAS_B2B_DATA.ventajas.map((v) => (
              <article
                key={v.numero}
                className="rounded-xl border border-slate-200 bg-white p-6 space-y-2.5"
              >
                <p className="text-xs font-mono font-bold text-[#0C65A1] tabular-nums">
                  {v.numero} · LOGÍSTICA
                </p>
                <h3 className="text-base sm:text-lg font-extrabold text-[#002147] leading-snug">
                  {v.titulo}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {v.descripcion}
                </p>
              </article>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Columna izquierda: Las 3 tiendas propias en Vigo */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-extrabold text-[#002147]">
                  Nuestras 3 tiendas propias en Vigo
                </h3>
                <a
                  href="/puntos-mimos"
                  onClick={(e) => onNavigate('/puntos-mimos', e)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#0C65A1] hover:underline shrink-0"
                >
                  <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Ver mapa</span>
                </a>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Si eres autónomo o gestionas un comercio, clínica o peluquería pequeña, puedes entregar y recoger directamente en mostrador en cualquiera de nuestras tiendas de Vigo, o coordinar recogida en tu local con Mimo.
              </p>

              <div className="space-y-3">
                {TIENDAS_PROPIAS.map((t) => {
                  const storeUrl =
                    t.id === 'as-teixugueiras'
                      ? '/tienda-mimos-navia-vigo'
                      : t.id === 'gregorio-espino'
                      ? '/tienda-mimos-gregorio-espino-vigo'
                      : t.id === 'rua-venezuela'
                      ? '/tienda-mimos-venezuela-vigo'
                      : '/zonas/vigo';

                  return (
                    <div
                      key={t.id}
                      className="rounded-xl border border-slate-200 bg-white p-4 flex flex-col gap-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-extrabold text-[#002147]">
                          {t.nombre_mostrado}
                        </span>
                        <a
                          href={storeUrl}
                          onClick={(e) => onNavigate(storeUrl, e)}
                          className="text-xs font-bold text-[#0C65A1] hover:underline shrink-0"
                        >
                          Ver ficha →
                        </a>
                      </div>
                      <p className="text-xs text-slate-600">
                        {t.direccion} · {t.codigo_postal} {t.localidad}
                      </p>
                      <p className="text-xs text-slate-600">
                        {t.horario.resumen} · Tel. {t.telefonos_mostrados}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Columna derecha: Formulario rápido cualificador */}
            <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1] mb-2">
                <Building2 className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Solicitud B2B sin compromiso · Respuesta directa por WhatsApp</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] mb-2">
                Prepara tu consulta de empresa para Mimo
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Indícanos tu sector, el tipo de prendas y cómo prefieres organizar la entrega para enviárselo estructurado a Mimo y darte una valoración ajustada a tu rotación.
              </p>

              <form onSubmit={handlePrepareQuote} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="emp-nombre"
                      className="block text-sm font-bold text-[#002147] mb-1.5"
                    >
                      Nombre o empresa *
                    </label>
                    <input
                      id="emp-nombre"
                      type="text"
                      required
                      autoComplete="organization"
                      aria-required="true"
                      aria-invalid={Boolean(errorMsg && !nombreEmpresa.trim())}
                      aria-describedby={errorMsg ? 'emp-error-msg' : undefined}
                      value={nombreEmpresa}
                      onChange={(e) => {
                        setNombreEmpresa(e.target.value);
                        setPreparedReady(false);
                      }}
                      placeholder="Ej.: Peluquería X / Clínica Y"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base lg:text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="emp-telefono"
                      className="block text-sm font-bold text-[#002147] mb-1.5"
                    >
                      Teléfono *
                    </label>
                    <input
                      id="emp-telefono"
                      type="tel"
                      inputMode="tel"
                      required
                      autoComplete="tel"
                      aria-required="true"
                      aria-invalid={Boolean(errorMsg && !telefono.trim())}
                      aria-describedby={errorMsg ? 'emp-error-msg' : undefined}
                      value={telefono}
                      onChange={(e) => {
                        setTelefono(e.target.value);
                        setPreparedReady(false);
                      }}
                      placeholder="Ej.: 600 123 456"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base lg:text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="emp-sector"
                    className="block text-sm font-bold text-[#002147] mb-1.5"
                  >
                    Sector de tu negocio
                  </label>
                  <select
                    id="emp-sector"
                    value={sector}
                    onChange={(e) => {
                      setSector(e.target.value);
                      setPreparedReady(false);
                    }}
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base lg:text-sm text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden"
                  >
                    {SECTORES_FORMULARIO.map((op) => (
                      <option key={op} value={op}>
                        {op}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="emp-entrega"
                      className="block text-sm font-bold text-[#002147] mb-1.5"
                    >
                      ¿Cómo prefieres entregar y recoger?
                    </label>
                    <select
                      id="emp-entrega"
                      value={modalidadEntrega}
                      onChange={(e) => {
                        setModalidadEntrega(e.target.value);
                        setPreparedReady(false);
                      }}
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base lg:text-sm text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden"
                    >
                      {MODALIDADES_ENTREGA_B2B.map((op) => (
                        <option key={op} value={op}>
                          {op}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="emp-frecuencia"
                      className="block text-sm font-bold text-[#002147] mb-1.5"
                    >
                      Frecuencia aproximada
                    </label>
                    <select
                      id="emp-frecuencia"
                      value={frecuencia}
                      onChange={(e) => {
                        setFrecuencia(e.target.value);
                        setPreparedReady(false);
                      }}
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base lg:text-sm text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden"
                    >
                      {FRECUENCIAS_B2B.map((op) => (
                        <option key={op} value={op}>
                          {op}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="emp-detalles"
                    className="block text-sm font-bold text-[#002147] mb-1.5"
                  >
                    Prendas, volumen aproximado o barrio en Vigo (opcional)
                  </label>
                  <textarea
                    id="emp-detalles"
                    rows={2}
                    value={detalles}
                    onChange={(e) => {
                      setDetalles(e.target.value);
                      setPreparedReady(false);
                    }}
                    placeholder="Ej.: Unas 40 toallas semanales y 6 capas en zona As Travesas / Centro..."
                    className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base lg:text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-2.5 pt-1">
                  <label className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={facturaCif}
                      onChange={(e) => {
                        setFacturaCif(e.target.checked);
                        setPreparedReady(false);
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0C65A1] focus:ring-[#0F76BB]"
                    />
                    <span>Necesito factura mensual agrupada con CIF</span>
                  </label>

                  <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aceptoPrivacidad}
                      onChange={(e) => {
                        setAceptoPrivacidad(e.target.checked);
                        setErrorMsg('');
                      }}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0C65A1] focus:ring-[#0F76BB]"
                    />
                    <span>
                      Acepto la{' '}
                      <a
                        href="/privacidad"
                        onClick={(e) => onNavigate('/privacidad', e)}
                        className="underline font-bold text-[#002147] hover:text-[#0F76BB]"
                      >
                        política de privacidad
                      </a>
                      .
                    </span>
                  </label>
                </div>

                {errorMsg && (
                  <p id="emp-error-msg" role="alert" className="text-xs font-bold text-red-700">
                    {errorMsg}
                  </p>
                )}

                {!preparedReady ? (
                  <button
                    type="submit"
                    className="w-full min-h-[48px] bg-[#002147] hover:bg-[#0a3161] text-white font-bold text-sm py-3.5 px-6 rounded-lg transition-colors cursor-pointer"
                  >
                    Preparar consulta de empresa para Mimo
                  </button>
                ) : (
                  <div className="p-4 rounded-xl border border-[#1FA855]/45 bg-[#EDF5FD] space-y-3">
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <a
                        href={whatsappQuoteHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackWhatsAppClick('/servicios-empresas', 'empresas_quote_form', {
                            service_id: 'servicios-empresas',
                          })
                        }
                        className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm py-3 px-4 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Abrir WhatsApp con Mimo</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex items-center justify-center gap-1.5 min-h-[44px] bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] text-xs font-bold py-2.5 px-3.5 rounded-lg cursor-pointer transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#147A3E]" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 6. BLOQUE DE ENRUTAMIENTO LIMPIO A OTRAS ÁREAS PROFESIONALES */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-1.5">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] tracking-tight">
              ¿Buscas gestión para pisos turísticos, limpieza de oficinas o tapicerías de tu local?
            </h2>
            <p className="text-sm text-slate-600">
              Para mantener una atención especializada en cada necesidad empresarial, dispones de páginas dedicadas por área:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/limpieza-apartamentos-turisticos-vigo"
              onClick={(e) => onNavigate('/limpieza-apartamentos-turisticos-vigo', e)}
              className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-5 hover:border-[#0F76BB] transition-colors flex flex-col justify-between gap-3"
            >
              <div>
                <p className="text-xs font-mono font-bold text-[#0C65A1] uppercase mb-1">
                  Viviendas vacacionales
                </p>
                <p className="text-sm font-extrabold text-[#002147]">
                  Limpieza y lencería para apartamentos turísticos en Vigo
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0C65A1]">
                <span>Ir a Apartamentos turísticos</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </span>
            </a>

            <a
              href="/limpieza-profesional-vigo"
              onClick={(e) => onNavigate('/limpieza-profesional-vigo', e)}
              className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-5 hover:border-[#0F76BB] transition-colors flex flex-col justify-between gap-3"
            >
              <div>
                <p className="text-xs font-mono font-bold text-[#0C65A1] uppercase mb-1">
                  Espacios y locales
                </p>
                <p className="text-sm font-extrabold text-[#002147]">
                  Limpieza profesional de oficinas, comunidades y clínicas
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0C65A1]">
                <span>Ir a Limpieza profesional</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </span>
            </a>

            <a
              href="/limpieza-sofas-vigo"
              onClick={(e) => onNavigate('/limpieza-sofas-vigo', e)}
              className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-5 hover:border-[#0F76BB] transition-colors flex flex-col justify-between gap-3"
            >
              <div>
                <p className="text-xs font-mono font-bold text-[#0C65A1] uppercase mb-1">
                  Salas de espera
                </p>
                <p className="text-sm font-extrabold text-[#002147]">
                  Limpieza in situ de sofás, sillones y sillas tapizadas
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0C65A1]">
                <span>Ver sofás y tapicerías</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 7. PREGUNTAS FRECUENTES B2B DE ALTA INTENCIÓN */}
      <section
        id="preguntas-frecuentes-empresas"
        aria-labelledby="faq-empresas-heading"
        className="py-12 lg:py-18 bg-[#F7F6F2]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0C65A1] flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Dudas frecuentes de empresas y autónomos</span>
              </p>
              <h2
                id="faq-empresas-heading"
                className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance"
              >
                Preguntas frecuentes sobre nuestro servicio de lavandería para empresas en Vigo
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sin letra pequeña ni compromisos genéricos: si tu negocio tiene particularidades de tejido, volumen o recogida, consúltalo directamente con Mimo por WhatsApp.
              </p>
            </div>

            <div className="lg:col-span-7 divide-y divide-slate-200 border border-slate-200 bg-white rounded-xl px-5 sm:px-7">
              {SERVICIO_EMPRESAS_B2B_DATA.preguntasFrecuentes.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div key={faq.pregunta} className="py-4">
                    <h3 className="m-0">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        className="w-full min-h-[44px] text-left flex items-center justify-between gap-4 font-extrabold text-sm sm:text-base text-[#002147] cursor-pointer py-1"
                      >
                        <span>{faq.pregunta}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#0C65A1] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    {isOpen && (
                      <div className="pt-2 pb-1 text-sm text-slate-600 leading-relaxed">
                        {faq.respuesta}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-2">
            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="inline-flex items-center gap-2 min-h-[44px] text-sm font-bold text-[#002147] hover:text-[#0F76BB]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Volver a la portada de Tintorería Mimos Navia</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};
