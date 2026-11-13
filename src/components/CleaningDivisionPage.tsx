import React, { useState } from 'react';
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Check,
  Copy,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import {
  CONTACT_INFO,
  IMAGES,
  SERVICIOS_LIMPIEZA_PROFESIONAL,
  PACKS_APARTAMENTOS_BORRADOR,
  GESTION_INTEGRAL_AREAS,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import {
  trackFormPrepared,
  trackWhatsAppClick,
  trackPhoneClick,
} from '../utils/analytics';

interface CleaningDivisionPageProps {
  variant?: 'limpieza' | 'apartamentos' | 'empresas';
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const CleaningDivisionPage: React.FC<CleaningDivisionPageProps> = ({
  variant = 'limpieza',
  onNavigate,
}) => {
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoInmueble, setTipoInmueble] = useState(
    variant === 'apartamentos'
      ? 'Limpieza integral de Apartamento Turístico (con lencería)'
      : variant === 'empresas'
      ? 'Limpieza de Oficina o Despacho profesional'
      : 'Limpieza de Oficina o Despacho profesional'
  );
  const [frecuencia, setFrecuencia] = useState(
    variant === 'apartamentos'
      ? 'Rotación por reservas / Semanal'
      : 'Servicio continuado / Semanal'
  );
  const [detalles, setDetalles] = useState('');
  const [aceptoPrivacidad, setAceptoPrivacidad] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [preparedReady, setPreparedReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);

  const pageHeader = {
    limpieza: {
      badge: 'EMPRESA DE SERVICIOS DE LIMPIEZA · VIGO Y ÁREA DE INFLUENCIA',
      h1: 'Empresa de servicios de limpieza en Vigo y comarca',
      subtitle:
        'Limpieza profesional para oficinas y despachos, comunidades de propietarios, locales comerciales, clínicas y apartamentos turísticos en Vigo y su área de influencia, respaldada por nuestra propia planta de tintorería y lavandería.',
    },
    apartamentos: {
      badge: 'COLABORACIÓN A MEDIDA PARA ALOJAMIENTOS TURÍSTICOS · VIGO',
      h1: 'Servicios para apartamentos turísticos en Vigo: lavandería, limpieza y gestión operativa a tu medida',
      subtitle:
        'Adaptado a anfitriones y propietarios de viviendas turísticas: desde el cuidado profesional de la ropa de cama y baño hasta la preparación completa entre reservas y la coordinación operativa de tu alojamiento.',
    },
    empresas: {
      badge: 'SERVICIOS B2B PARA EMPRESAS Y PROFESIONALES · VIGO',
      h1: 'Servicios de lavandería, tintorería y limpieza para empresas en Vigo',
      subtitle:
        'Soluciones adaptadas a cada negocio en Vigo: alojamientos turísticos, hostelería, clínicas, comercios y vestuario laboral con atención directa desde nuestra central de Navia.',
    },
  }[variant];

  const buildQuoteMessage = () => {
    const lines = [
      'Hola, Mimo. Quiero solicitar un presupuesto personalizado de Limpieza / Empresas.',
      `Contacto / Empresa: ${nombreEmpresa.trim()}`,
      `Teléfono: ${telefono.trim()}`,
      `Tipo de servicio: ${tipoInmueble}`,
      `Frecuencia: ${frecuencia}`,
    ];
    if (detalles.trim()) {
      lines.push(`Detalles: ${detalles.trim()}`);
    }
    return lines.join('\n');
  };

  const heroWhatsAppHref =
    variant === 'empresas'
      ? buildMimoWhatsAppUrl(
          'Hola, Mimo. Quiero solicitar un presupuesto de lavandería y servicios textiles para mi empresa o negocio en Vigo.'
        )
      : variant === 'limpieza'
      ? CONTACT_INFO.whatsappCleaningHref
      : CONTACT_INFO.whatsappApartamentosHref;

  const whatsappQuoteHref = buildMimoWhatsAppUrl(buildQuoteMessage());

  const handlePrepareQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreEmpresa.trim() || !telefono.trim()) {
      setErrorMsg('Por favor, indica tu nombre o empresa y un teléfono de contacto.');
      return;
    }
    if (!aceptoPrivacidad) {
      setErrorMsg('Debes aceptar la política de privacidad para preparar tu solicitud.');
      return;
    }
    setErrorMsg('');
    setPreparedReady(true);
    trackFormPrepared(
      typeof window !== 'undefined' ? window.location.pathname : `/b2b-${variant}`,
      `quote_${variant}`
    );
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildQuoteMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // ignore
    }
  };

  return (
    <main id="main-content" tabIndex={-1} className="focus:outline-hidden bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
      {/* Cabecera */}
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
              <li className="text-[#60B5F6] font-semibold">{pageHeader.h1}</li>
            </ol>
          </nav>

          {/* Navegación rápida entre las 3 URLs de la línea profesional (Sección 6: 8, 9, 10) */}
          <div className="flex flex-wrap gap-2 mb-6">
            <a
              href="/limpieza-profesional-vigo"
              onClick={(e) => onNavigate('/limpieza-profesional-vigo', e)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                variant === 'limpieza'
                  ? 'bg-[#0F76BB] text-white'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              Limpieza profesional en Vigo
            </a>
            <a
              href="/limpieza-apartamentos-turisticos-vigo"
              onClick={(e) => onNavigate('/limpieza-apartamentos-turisticos-vigo', e)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                variant === 'apartamentos'
                  ? 'bg-[#0F76BB] text-white'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              Apartamentos turísticos
            </a>
            <a
              href="/servicios-empresas"
              onClick={(e) => onNavigate('/servicios-empresas', e)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                variant === 'empresas'
                  ? 'bg-[#0F76BB] text-white'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              Servicios para empresas
            </a>
            <a
              href="/limpieza-sofas-vigo"
              onClick={(e) => onNavigate('/limpieza-sofas-vigo', e)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors bg-white/10 text-[#60B5F6] hover:bg-white/20"
            >
              Sofás y tapicerías a domicilio →
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-mono uppercase tracking-wider text-[#60B5F6] font-bold">
                {pageHeader.badge}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.7rem] font-extrabold text-white tracking-tight leading-[1.12]">
                {pageHeader.h1}
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                {pageHeader.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href={heroWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-colors shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>Pide presupuesto con Mimo</span>
                </a>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white font-bold text-sm sm:text-base px-5 py-4 rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#60B5F6]" aria-hidden="true" />
                  <span>Llamar al {CONTACT_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#071936] shadow-2xl">
                {!heroImgError ? (
                  <img
                    src={IMAGES.b2bApartamentos}
                    alt="Ropa de cama y toallas preparadas por Tintorería Mimos para alojamientos turísticos y empresas en Vigo"
                    width={800}
                    height={600}
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgError(true)}
                    className="w-full aspect-4/3 object-cover"
                  />
                ) : (
                  <div className="w-full aspect-4/3 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#002147] to-[#0a254c]">
                    <Building2 className="w-10 h-10 text-[#60B5F6] mb-2" aria-hidden="true" />
                    <p className="text-sm font-bold text-white">Tintorería Mimos Navia · División Profesional</p>
                  </div>
                )}
                <div className="p-5 text-xs sm:text-sm text-slate-200">
                  <strong className="text-white block mb-1">
                    Atención centralizada en Navia (Vigo)
                  </strong>
                  Combinamos limpieza profesional con nuestra propia planta de tintorería y lavandería en C/ As Teixugueiras, 11, local 9.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Los Bloques de Servicios de Limpieza Profesional y Cuidado Textil */}
      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-2">
              Vigo y área de influencia · Presupuestos personalizados a medida
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight mb-4">
              Servicios profesionales de limpieza de instalaciones y cuidado textil
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Ofrecemos mantenimiento para oficinas, despachos, comunidades de propietarios, locales comerciales, clínicas y soluciones a medida para alojamientos y apartamentos turísticos. Además, disponemos de protocolo de actuación urgente para siniestros de hogar (incendios, humo e inundaciones) con facturación oficial para aseguradoras.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {SERVICIOS_LIMPIEZA_PROFESIONAL.map((srv) => (
              <article
                key={srv.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-8 flex flex-col justify-between shadow-xs"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                      ÁREA {srv.index}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      Valoración a medida con Mimo
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#002147] dark:text-white mb-1.5">
                    {srv.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-3">
                    {srv.subtitulo}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                    {srv.descripcion}
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 mb-6">
                    {srv.incluye.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={srv.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors w-fit"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Solicitar presupuesto con Mimo</span>
                  </a>
                  {(srv.id === 'limpieza-oficinas-locales' || srv.id === 'limpieza-hogares-viviendas') && (
                    <a
                      href="/limpieza-sofas-vigo"
                      onClick={(e) => onNavigate('/limpieza-sofas-vigo', e)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
                    >
                      <span>Ver limpieza de sofás y tapicerías</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* Las 3 Modalidades para Apartamentos Turísticos */}
          <div className="rounded-2xl bg-[#002147] text-white p-6 sm:p-10 shadow-xl border border-white/10">
            <div className="max-w-3xl mb-8">
              <span className="text-xs font-mono font-bold text-[#60B5F6] uppercase tracking-wider">
                Propuesta comercial para anfitriones y propietarios · Tres niveles de colaboración
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-2">
                Modalidades de servicio para apartamentos turísticos en Vigo
              </h2>
              <p className="text-sm text-slate-200">
                Tú decides qué tareas prefieres seguir gestionando personalmente y cuáles delegar en Mimos. Evaluamos juntos la rotación de tu alojamiento para ofrecerte una propuesta personalizada y adaptada a tu ritmo.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {PACKS_APARTAMENTOS_BORRADOR.map((pack) => {
                const isIntegral = pack.id === 'pack-gestion-integral';
                return (
                  <div
                    key={pack.id}
                    className={`rounded-2xl border p-6 sm:p-7 flex flex-col justify-between transition-all ${
                      isIntegral
                        ? 'bg-gradient-to-b from-[#072552] to-[#041733] border-[#60B5F6]/60 ring-2 ring-[#60B5F6]/30 shadow-2xl relative'
                        : 'border-white/15 bg-white/5'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-block text-[11px] font-mono bg-white/10 text-[#60B5F6] border border-white/15 px-2.5 py-1 rounded-md font-bold">
                          {pack.estado}
                        </span>
                        {isIntegral && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#178A47] text-white">
                            Servicio más completo
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-extrabold text-white mb-2 leading-snug">{pack.nombre}</h3>
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-5">
                        {pack.descripcion}
                      </p>
                      <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-200">
                        {pack.incluye.map((inc, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5" />
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href={pack.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-colors shadow-xs ${
                        isIntegral
                          ? 'bg-[#178A47] hover:bg-[#126E38] text-white py-3.5 shadow-md'
                          : 'bg-white/15 hover:bg-white/25 text-white'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>{pack.ctaTexto}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Módulo Especial: Modalidad 3 - Gestión Operativa Integral estructurada en 4 áreas */}
          <div className="mt-10 rounded-3xl bg-gradient-to-br from-[#002147] via-[#071936] to-[#0a254c] text-white border border-[#0F76BB]/40 p-6 sm:p-10 lg:p-12 shadow-2xl">
            <div className="max-w-3xl mb-10">
              <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#60B5F6] bg-white/10 px-3 py-1 rounded-md uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4 text-[#60B5F6]" />
                <span>Modalidad 3 · Servicio integral a medida para propietarios</span>
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Coordinación Integral de Limpieza y Lavandería
              </h3>
              <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                Tú gestionas tus reservas y calendario. Mimos se encarga de la parte operativa crítica: la limpieza exhaustiva en cada cambio de huésped (checkout) y la logística completa de lencería lavada, higienizada y planchada.
              </p>
              <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">
                Un interlocutor profesional para que cada nuevo huésped encuentre tu alojamiento impecable, con sábanas y toallas de calidad hotelera, resguardando la reputación de tu vivienda turística con puntualidad rigurosa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {GESTION_INTEGRAL_AREAS.map((area) => (
                <div
                  key={area.numero}
                  className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-[#0F76BB]/25 border border-[#60B5F6]/30 flex items-center justify-center text-[#60B5F6] font-bold text-sm mb-3">
                      {area.numero}
                    </div>
                    <h4 className="text-base font-bold text-white mb-3 leading-snug">
                      {area.titulo}
                    </h4>
                    <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {area.puntos.map((punto, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5" />
                          <span>{punto}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white/10 border border-white/20 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left max-w-2xl">
                <p className="text-base sm:text-lg font-bold text-white italic">
                  «Un único interlocutor para coordinar tu alojamiento. Menos gestiones para ti, una operativa mejor organizada y un equipo local pendiente de que todo funcione.»
                </p>
                <p className="text-xs sm:text-sm text-slate-300">
                  Sin tarifas cerradas públicas. Analizamos las características de tu alojamiento y el ritmo de rotación en Vigo para diseñar una propuesta a medida.
                </p>
              </div>
              <a
                href={buildMimoWhatsAppUrl(
                  'Hola, Mimo. Quiero delegar la gestión de mi apartamento turístico en Vigo y consultar una propuesta a medida'
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-colors shrink-0 shadow-lg text-center"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Quiero delegar la gestión de mi apartamento</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Presupuesto Personalizado */}
      <section className="py-16 lg:py-20 bg-white dark:bg-[#071324]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#0b1d36] p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-2">
              Prepara tu solicitud de presupuesto para Mimo
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
              Indícanos los datos básicos de tu alojamiento turístico, vivienda o empresa en Vigo para abrir WhatsApp con la solicitud estructurada.
            </p>

            <form onSubmit={handlePrepareQuote} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="b2b-nombre"
                    className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    Nombre o empresa *
                  </label>
                  <input
                    id="b2b-nombre"
                    type="text"
                    required
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={Boolean(errorMsg && !nombreEmpresa.trim())}
                    aria-describedby={errorMsg ? 'b2b-error-msg' : undefined}
                    value={nombreEmpresa}
                    onChange={(e) => {
                      setNombreEmpresa(e.target.value);
                      setPreparedReady(false);
                    }}
                    placeholder="Ej.: Apartamentos Ría / Carlos"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="b2b-telefono"
                    className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    Teléfono *
                  </label>
                  <input
                    id="b2b-telefono"
                    type="tel"
                    required
                    autoComplete="tel"
                    aria-required="true"
                    aria-invalid={Boolean(errorMsg && !telefono.trim())}
                    aria-describedby={errorMsg ? 'b2b-error-msg' : undefined}
                    value={telefono}
                    onChange={(e) => {
                      setTelefono(e.target.value);
                      setPreparedReady(false);
                    }}
                    placeholder="Ej.: 600 123 456"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="b2b-tipo"
                    className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    Tipo de servicio
                  </label>
                  <select
                    id="b2b-tipo"
                    value={tipoInmueble}
                    onChange={(e) => {
                      setTipoInmueble(e.target.value);
                      setPreparedReady(false);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                  >
                    <option value="Limpieza integral de Apartamento Turístico (con lencería)">
                      Limpieza integral de Apartamento Turístico (con lencería)
                    </option>
                    <option value="Limpieza de Oficina o Despacho profesional">
                      Limpieza de Oficina o Despacho profesional
                    </option>
                    <option value="Limpieza de Comunidad de Propietarios (portal y zonas comunes)">
                      Limpieza de Comunidad de Propietarios (portal y zonas comunes)
                    </option>
                    <option value="Limpieza de Local Comercial o Clínica">
                      Limpieza de Local Comercial o Clínica
                    </option>
                    <option value="Limpieza de sofás y tapicerías en vivienda, alojamiento o negocio">
                      Limpieza de sofás y tapicerías en vivienda, alojamiento o negocio
                    </option>
                    <option value="Recuperación de ropa y textiles por siniestro o incendio (Seguro)">
                      Recuperación de ropa y textiles por siniestro o incendio (Seguro)
                    </option>
                    <option value="Lavandería y cuidado textil para empresas">
                      Lavandería y cuidado textil para empresas
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="b2b-frecuencia"
                    className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    Frecuencia estimada
                  </label>
                  <select
                    id="b2b-frecuencia"
                    value={frecuencia}
                    onChange={(e) => {
                      setFrecuencia(e.target.value);
                      setPreparedReady(false);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                  >
                    <option value="Rotación por reservas / Semanal">
                      Rotación por reservas / Semanal
                    </option>
                    <option value="Servicio continuado / Semanal">
                      Servicio continuado / Semanal
                    </option>
                    <option value="Varias veces por semana">Varias veces por semana</option>
                    <option value="Servicio puntual">Servicio puntual</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="b2b-detalles"
                  className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Número de camas, zona en Vigo o detalles (opcional)
                </label>
                <textarea
                  id="b2b-detalles"
                  rows={2}
                  value={detalles}
                  onChange={(e) => {
                    setDetalles(e.target.value);
                    setPreparedReady(false);
                  }}
                  placeholder="Ej.: 2 apartamentos en el centro de Vigo, 4 camas en total..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                />
              </div>

              <label className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={aceptoPrivacidad}
                  onChange={(e) => {
                    setAceptoPrivacidad(e.target.checked);
                    setErrorMsg('');
                  }}
                  className="mt-0.5 rounded border-slate-300 text-[#002147] focus:ring-[#0F76BB]"
                />
                <span>
                  Acepto la{' '}
                  <a
                    href="/privacidad"
                    onClick={(e) => onNavigate('/privacidad', e)}
                    className="underline font-bold text-[#002147] dark:text-[#60B5F6]"
                  >
                    política de privacidad
                  </a>
                  .
                </span>
              </label>

              {errorMsg && (
                <p id="b2b-error-msg" role="alert" className="text-xs font-bold text-red-600 dark:text-red-400">
                  {errorMsg}
                </p>
              )}

              {!preparedReady ? (
                <button
                  type="submit"
                  className="w-full bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-colors cursor-pointer"
                >
                  Generar solicitud de presupuesto para Mimo
                </button>
              ) : (
                <div className="p-4 rounded-xl border border-[#178A47]/40 bg-[#178A47]/10 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <a
                      href={whatsappQuoteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackWhatsAppClick(
                          typeof window !== 'undefined' ? window.location.pathname : `/b2b-${variant}`,
                          `b2b_${variant}_quote_form`,
                          { service_id: `b2b-${variant}` }
                        )
                      }
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm py-3 px-4 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Abrir WhatsApp con Mimo</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center justify-center gap-1.5 border border-slate-300 bg-white text-slate-700 text-xs font-bold py-2.5 px-3.5 rounded-lg cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#178A47]" />
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

          <div className="mt-8">
            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#002147] dark:text-slate-200 hover:text-[#0F76BB]"
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
