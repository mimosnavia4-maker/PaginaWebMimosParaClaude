import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Check,
  Copy,
  CheckCircle2,
  ShieldCheck,
  Building2,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import {
  APARTAMENTOS_TURISTICOS_DATA,
  CONTACT_INFO,
  GESTION_INTEGRAL_AREAS,
  IMAGES,
  LIMPIEZA_PROFESIONAL_DATA,
  PACKS_APARTAMENTOS_BORRADOR,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import {
  trackFormPrepared,
  trackWhatsAppClick,
  trackPhoneClick,
} from '../utils/analytics';

interface CleaningDivisionPageProps {
  variant?: 'limpieza' | 'apartamentos';
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const CleaningDivisionPage: React.FC<CleaningDivisionPageProps> = ({
  variant = 'limpieza',
  onNavigate,
}) => {
  const isVut = variant === 'apartamentos';

  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [telefono, setTelefono] = useState('');
  const [tipoInmueble, setTipoInmueble] = useState(
    isVut
      ? 'Limpieza entre reservas + lavandería de lencería propia (VUT)'
      : 'Limpieza periódica de Comunidad de Propietarios (portal y escaleras)'
  );
  const [frecuencia, setFrecuencia] = useState(
    isVut ? 'Rotación por reservas (franja 11:00–15:00)' : 'Servicio continuado semanal'
  );
  const [detalles, setDetalles] = useState('');
  const [aceptoPrivacidad, setAceptoPrivacidad] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [preparedReady, setPreparedReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [heroImgError, setHeroImgError] = useState(false);

  useEffect(() => {
    setTipoInmueble(
      isVut
        ? 'Limpieza entre reservas + lavandería de lencería propia (VUT)'
        : 'Limpieza periódica de Comunidad de Propietarios (portal y escaleras)'
    );
    setFrecuencia(
      isVut ? 'Rotación por reservas (franja 11:00–15:00)' : 'Servicio continuado semanal'
    );
    setPreparedReady(false);
    setErrorMsg('');
    setHeroImgError(false);
  }, [isVut]);

  const headerData = isVut
    ? {
        badge: APARTAMENTOS_TURISTICOS_DATA.badgeSuperior,
        h1: APARTAMENTOS_TURISTICOS_DATA.h1,
        subtitle: APARTAMENTOS_TURISTICOS_DATA.subtitulo,
        breadcrumb: 'Apartamentos turísticos en Vigo',
        imgSrc: IMAGES.b2bApartamentos,
        imgAlt:
          'Ropa de cama y toallas preparadas por Tintorería Mimos para alojamientos turísticos en Vigo',
        imgCaptionTitle: 'Planta propia en Navia y equipo operativo en Vigo',
        imgCaptionText:
          'Lavandería higienizada y calandrada en C/ Teixugueiras, 11, bajo 9 + limpieza en franja 11:00–15:00 todo el año.',
        whatsappHref: CONTACT_INFO.whatsappApartamentosHref,
        ctaLabel: 'Pedir propuesta VUT con Mimo',
      }
    : {
        badge: LIMPIEZA_PROFESIONAL_DATA.badgeSuperior,
        h1: LIMPIEZA_PROFESIONAL_DATA.h1,
        subtitle: LIMPIEZA_PROFESIONAL_DATA.subtitulo,
        breadcrumb: 'Limpieza profesional en Vigo',
        imgSrc: IMAGES.blogLimpiezaOficinas,
        imgAlt:
          'Limpieza profesional periódica de oficinas, comunidades de propietarios y locales en Vigo',
        imgCaptionTitle: 'Atención centralizada en Navia (Vigo)',
        imgCaptionText:
          'Equipos propios en Régimen General con RC, PRL/CAE al día y soporte de nuestra planta textil en Navia.',
        whatsappHref: CONTACT_INFO.whatsappCleaningHref,
        ctaLabel: 'Concertar visita gratuita con Mimo',
      };

  const buildQuoteMessage = () => {
    const lines = [
      isVut
        ? 'Hola, Mimo. Quiero solicitar propuesta a medida para apartamento turístico (VUT) en Vigo.'
        : 'Hola, Mimo. Quiero solicitar visita técnica gratuita y presupuesto de limpieza profesional en Vigo.',
      `Contacto / Empresa / Comunidad: ${nombreEmpresa.trim()}`,
      `Teléfono: ${telefono.trim()}`,
      `Servicio: ${tipoInmueble}`,
      `Frecuencia: ${frecuencia}`,
    ];
    if (detalles.trim()) {
      lines.push(`Detalles: ${detalles.trim()}`);
    }
    return lines.join('\n');
  };

  const whatsappQuoteHref = buildMimoWhatsAppUrl(buildQuoteMessage());

  const handlePrepareQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombreEmpresa.trim() || !telefono.trim()) {
      setErrorMsg('Por favor, indica tu nombre, comunidad o empresa y un teléfono de contacto.');
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
      // ignore clipboard errors
    }
  };

  const activeFaqs = isVut
    ? APARTAMENTOS_TURISTICOS_DATA.preguntasFrecuentes
    : LIMPIEZA_PROFESIONAL_DATA.preguntasFrecuentes;

  const activeChecklist = isVut
    ? APARTAMENTOS_TURISTICOS_DATA.checklistPresupuesto
    : LIMPIEZA_PROFESIONAL_DATA.checklistPresupuesto;

  const currentPath = isVut
    ? '/limpieza-apartamentos-turisticos-vigo'
    : '/limpieza-profesional-vigo';

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="focus:outline-hidden bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800"
    >
      {/* 1. Cabecera */}
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
              <li className="text-[#60B5F6] font-semibold">{headerData.breadcrumb}</li>
            </ol>
          </nav>

          {/* Navegación rápida entre las páginas B2B */}
          <div className="flex flex-wrap gap-2 mb-6">
            <a
              href="/limpieza-profesional-vigo"
              onClick={(e) => onNavigate('/limpieza-profesional-vigo', e)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                !isVut
                  ? 'bg-[#0F76BB] text-white'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              Limpieza profesional (Comunidades, Oficinas y Locales)
            </a>
            <a
              href="/limpieza-apartamentos-turisticos-vigo"
              onClick={(e) => onNavigate('/limpieza-apartamentos-turisticos-vigo', e)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                isVut
                  ? 'bg-[#0F76BB] text-white'
                  : 'bg-white/10 text-slate-200 hover:bg-white/20'
              }`}
            >
              Apartamentos turísticos (VUT)
            </a>
            <a
              href="/servicios-empresas"
              onClick={(e) => onNavigate('/servicios-empresas', e)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors bg-white/10 text-slate-200 hover:bg-white/20 whitespace-nowrap shrink-0"
            >
              Lavandería para empresas
            </a>
            <a
              href="/limpieza-sofas-vigo"
              onClick={(e) => onNavigate('/limpieza-sofas-vigo', e)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors bg-white/10 text-[#60B5F6] hover:bg-white/20 whitespace-nowrap shrink-0"
            >
              Sofás y colchones a domicilio →
            </a>
            <a
              href="/limpieza-incendios-siniestros-vigo"
              onClick={(e) => onNavigate('/limpieza-incendios-siniestros-vigo', e)}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors bg-white/10 text-[#60B5F6] hover:bg-white/20 whitespace-nowrap shrink-0"
            >
              Incendios y siniestros →
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-mono uppercase tracking-wider text-[#60B5F6] font-bold">
                {headerData.badge}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-extrabold text-white tracking-tight leading-[1.12] text-balance">
                {headerData.h1}
              </h1>
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                {headerData.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href={headerData.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick(currentPath, `b2b_${variant}_hero`, {
                      service_id: `b2b-${variant}`,
                    })
                  }
                  className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-colors shadow-lg whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>{headerData.ctaLabel}</span>
                </a>
                <a
                  href={CONTACT_INFO.phoneHref}
                  onClick={() => trackPhoneClick(currentPath, `b2b_${variant}_hero`)}
                  className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white font-bold text-sm sm:text-base px-5 py-4 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <Phone className="w-4 h-4 text-[#60B5F6] shrink-0" aria-hidden="true" />
                  <span>Llamar al {CONTACT_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#071936] shadow-2xl">
                {!heroImgError ? (
                  <img
                    src={headerData.imgSrc}
                    alt={headerData.imgAlt}
                    width={800}
                    height={600}
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgError(true)}
                    className="w-full aspect-4/3 object-cover"
                  />
                ) : (
                  <div className="w-full aspect-4/3 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#002147] to-[#0a254c]">
                    <Building2 className="w-10 h-10 text-[#60B5F6] mb-2" aria-hidden="true" />
                    <p className="text-sm font-bold text-white">
                      Tintorería Mimos Navia · División Profesional
                    </p>
                  </div>
                )}
                <div className="p-5 text-xs sm:text-sm text-slate-200">
                  <strong className="text-white block mb-1">{headerData.imgCaptionTitle}</strong>
                  {headerData.imgCaptionText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2A. CUERPO ESPECÍFICO DE LIMPIEZA PROFESIONAL (COMUNIDADES, OFICINAS, CLÍNICAS, LOCALES) */}
      {!isVut && (
        <section className="py-16 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            {/* Garantías legales y operativas */}
            <div>
              <div className="max-w-3xl mb-8 space-y-2">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                  Respaldo legal para juntas LPH, administradores de fincas y empresas
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                  Garantías de contratación, personal propio y visita gratuita
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {LIMPIEZA_PROFESIONAL_DATA.garantiasOperativas.map((g, idx) => (
                  <article
                    key={g.titulo}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 space-y-2.5"
                  >
                    <p className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] tabular-nums">
                      0{idx + 1} · GARANTÍA B2B
                    </p>
                    <h3 className="text-base font-extrabold text-[#002147] dark:text-white leading-snug">
                      {g.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {g.detalle}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Alcance transparente: solo mantenimiento periódico (NO fin de obra / NO altura) */}
            <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#071324] p-6 sm:p-8 flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5" aria-hidden="true" />
              <div className="space-y-1">
                <h2 className="text-base sm:text-lg font-extrabold text-[#002147] dark:text-white">
                  Alcance transparente de nuestro servicio
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {LIMPIEZA_PROFESIONAL_DATA.alcanceClaro}
                </p>
              </div>
            </div>

            {/* 4 Áreas B2B */}
            <div>
              <div className="max-w-3xl mb-10 space-y-2">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                  Mantenimiento continuado en Vigo y área de influencia
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                  Áreas de limpieza profesional y cuidado textil para tu edificio o negocio
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {LIMPIEZA_PROFESIONAL_DATA.areasLimpieza.map((area) => (
                  <article
                    key={area.id}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-8 flex flex-col justify-between shadow-xs"
                  >
                    <div>
                      <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6] mb-2">
                        ÁREA {area.index} · {area.etiqueta}
                      </p>
                      <h3 className="text-xl font-extrabold text-[#002147] dark:text-white mb-2">
                        {area.titulo}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                        {area.descripcion}
                      </p>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 mb-6">
                        {area.incluye.map((item) => (
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

                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                      <a
                        href={area.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackWhatsAppClick(currentPath, `b2b_area_${area.id}`, {
                            service_id: area.id,
                          })
                        }
                        className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors whitespace-nowrap shrink-0"
                      >
                        <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Solicitar visita / presupuesto</span>
                      </a>
                      {area.enlaceHref && area.enlaceTexto && (
                        <a
                          href={area.enlaceHref}
                          onClick={(e) => onNavigate(area.enlaceHref!, e)}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
                        >
                          <span>{area.enlaceTexto}</span>
                          <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Banner cross-link Pack Combinado Limpieza + Lavandería */}
            <div className="rounded-2xl bg-[#002147] text-white p-6 sm:p-10 border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#60B5F6]">
                  Pack combinado exclusivo · Planta propia en Navia
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  ¿Tu clínica, peluquería o empresa necesita también lavandería de batas y toallas?
                </h2>
                <p className="text-sm text-slate-200 leading-relaxed">
                  Unifica en un único proveedor la limpieza periódica de tu centro y el lavado separado con planchado en calandra de uniformes, toallas o sábanas de camilla (suciedad habitual) con factura mensual con CIF.
                </p>
              </div>
              <a
                href="/servicios-empresas"
                onClick={(e) => onNavigate('/servicios-empresas', e)}
                className="inline-flex items-center justify-center gap-2 bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm px-6 py-4 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <span>Ver pack combinado para empresas</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 2B. CUERPO ESPECÍFICO DE APARTAMENTOS TURÍSTICOS (VUT) */}
      {isVut && (
        <section className="py-16 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
            {/* 4 Claves Operativas VUT */}
            <div>
              <div className="max-w-3xl mb-8 space-y-2">
                <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                  Operativa pensada para anfitriones y gestoras VUT en Vigo
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                  Rotación puntual 11:00–15:00 todo el año y control integral por vivienda
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {APARTAMENTOS_TURISTICOS_DATA.clavesDiferenciales.map((clave, idx) => (
                  <article
                    key={clave.titulo}
                    className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 space-y-2.5"
                  >
                    <p className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] tabular-nums">
                      0{idx + 1} · CLAVE VUT
                    </p>
                    <h3 className="text-base font-extrabold text-[#002147] dark:text-white leading-snug">
                      {clave.titulo}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {clave.detalle}
                    </p>
                  </article>
                ))}
              </div>
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
                  Tú decides qué tareas prefieres seguir gestionando personalmente y cuáles delegar en Mimos. Evaluamos juntos la rotación de tu alojamiento y el volumen de lencería propia para ofrecerte una propuesta personalizada (acuerdos negociables).
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
                          <span className="text-[11px] font-mono uppercase tracking-wider text-[#60B5F6] font-bold">
                            {pack.estado}
                          </span>
                          {isIntegral && (
                            <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[#4ade80]">
                              Servicio más completo
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-extrabold text-white mb-2 leading-snug">
                          {pack.nombre}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed mb-5">
                          {pack.descripcion}
                        </p>
                        <ul className="space-y-2.5 mb-6 text-xs sm:text-sm text-slate-200">
                          {pack.incluye.map((inc, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5" aria-hidden="true" />
                              <span>{inc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <a
                        href={pack.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackWhatsAppClick(currentPath, `vut_pack_${pack.id}`, {
                            service_id: pack.id,
                          })
                        }
                        className={`w-full inline-flex items-center justify-center gap-2 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-colors shadow-xs ${
                          isIntegral
                            ? 'bg-[#178A47] hover:bg-[#126E38] text-white py-3.5 shadow-md'
                            : 'bg-white/15 hover:bg-white/25 text-white'
                        }`}
                      >
                        <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>{pack.ctaTexto}</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Módulo Especial: Modalidad 3 - Coordinación Operativa Integral en 4 áreas */}
            <div className="rounded-3xl bg-gradient-to-br from-[#002147] via-[#071936] to-[#0a254c] text-white border border-[#0F76BB]/40 p-6 sm:p-10 lg:p-12 shadow-2xl">
              <div className="max-w-3xl mb-10">
                <p className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#60B5F6] uppercase tracking-wider mb-3">
                  <ShieldCheck className="w-4 h-4 text-[#60B5F6]" aria-hidden="true" />
                  <span>Modalidad 3 · Servicio integral a medida para propietarios</span>
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Coordinación Integral de Limpieza, Lavandería y Check-in
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-3 leading-relaxed">
                  Tú gestionas tus reservas y precios en Airbnb o Booking. Mimos se encarga de la parte operativa crítica: limpieza en la franja 11:00–15:00 incluidos sábados, festivos y agosto, lavandería de tu lencería propia separada por apartamento, reposición de amenities, entrega de llaves y foto-reporte inmediato de incidencias.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {GESTION_INTEGRAL_AREAS.map((area) => (
                  <div
                    key={area.numero}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-[#0F76BB]/25 border border-[#60B5F6]/30 flex items-center justify-center text-[#60B5F6] font-bold text-sm mb-3 tabular-nums">
                        {area.numero}
                      </div>
                      <h3 className="text-base font-bold text-white mb-3 leading-snug">
                        {area.titulo}
                      </h3>
                      <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {area.puntos.map((punto, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#60B5F6] shrink-0 mt-0.5" aria-hidden="true" />
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
                    «Un único interlocutor local para coordinar limpieza, lencería propia, llaves y reporte visual en cada cambio de huésped.»
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Sin tarifas estándar cerradas públicas. Analizamos el tamaño, número de camas y calendario real de tu apartamento en Vigo para diseñar una propuesta a medida.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap gap-3 shrink-0">
                  <a
                    href={buildMimoWhatsAppUrl(
                      'Hola, Mimo. Quiero delegar la coordinación operativa de mi apartamento turístico en Vigo y consultar una propuesta a medida.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-6 py-4 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <span>Delegar mi apartamento turístico</span>
                  </a>
                  <a
                    href="/blog/protocolo-rotacion-apartamentos-turisticos-vigo"
                    onClick={(e) => onNavigate('/blog/protocolo-rotacion-apartamentos-turisticos-vigo', e)}
                    className="inline-flex items-center justify-center gap-1.5 border border-white/30 hover:border-white text-white font-bold text-xs sm:text-sm px-4 py-4 rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Checklist rotación 11:00–15:00</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                  <a
                    href="/blog/como-preparar-apartamento-turistico-entre-huespedes"
                    onClick={(e) => onNavigate('/blog/como-preparar-apartamento-turistico-entre-huespedes', e)}
                    className="inline-flex items-center justify-center gap-1.5 border border-white/30 hover:border-white text-white font-bold text-xs sm:text-sm px-4 py-4 rounded-xl transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Guía Decreto 12/2017 y lencería</span>
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3. Bloque CRO + Preguntas Frecuentes visibles (sincronizadas 1:1 con JSON-LD FAQPage) */}
      <section className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* CRO Presupuesto */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-6 sm:p-8 space-y-4">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white">
              ¿De qué depende el presupuesto y qué enviar por WhatsApp a Mimo?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              {isVut
                ? 'Cada vivienda turística tiene una configuración y cadencia distinta. No publicamos tarifas fijas descontextualizadas: indícanos estos 3 datos por WhatsApp para prepararte propuesta exacta:'
                : 'No aplicamos tarifas genéricas sin ver el inmueble. Para orientarte rápido o concertar la visita técnica gratuita, envíanos estos 3 datos:'}
            </p>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
              {activeChecklist.map((item, idx) => (
                <li
                  key={item}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] space-y-1.5"
                >
                  <span className="font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                    0{idx + 1}.
                  </span>
                  <p className="leading-relaxed">{item}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* FAQs */}
          <div id="preguntas-frecuentes-b2b">
            <div className="max-w-3xl mb-8 space-y-1">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                Dudas frecuentes antes de contratar
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                {isVut
                  ? 'Preguntas frecuentes sobre limpieza y lavandería de apartamentos turísticos en Vigo'
                  : 'Preguntas frecuentes sobre limpieza profesional de comunidades, oficinas y locales en Vigo'}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeFaqs.map((faq) => (
                <details
                  key={faq.pregunta}
                  className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-5"
                >
                  <summary className="font-extrabold text-[#002147] dark:text-white cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base">
                    <span>{faq.pregunta}</span>
                    <span
                      aria-hidden="true"
                      className="text-[#0F76BB] font-mono text-lg group-open:rotate-45 transition-transform shrink-0"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-3 border-t border-slate-200/80 dark:border-slate-800">
                    {faq.respuesta}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Formulario de Presupuesto Personalizado */}
      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-[#0a1b33]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1d36] p-6 sm:p-8 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-2">
              {isVut
                ? 'Prepara tu solicitud de propuesta VUT para Mimo'
                : 'Solicita tu visita técnica gratuita o presupuesto con Mimo'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
              {isVut
                ? 'Indícanos los datos básicos de tus apartamentos turísticos en Vigo para abrir WhatsApp con tu consulta estructurada.'
                : 'Indícanos el tipo de inmueble, frecuencia y barrio o polígono en Vigo para abrir WhatsApp con la solicitud estructurada.'}
            </p>

            <form onSubmit={handlePrepareQuote} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="b2b-nombre"
                    className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    {isVut ? 'Nombre o gestor VUT *' : 'Nombre, comunidad o empresa *'}
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
                    placeholder={isVut ? 'Ej.: Apartamentos Ría / Laura' : 'Ej.: Comunidad Plaza América 4 / Clínica X'}
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
                    {isVut ? (
                      <>
                        <option value="Solo lavandería de lencería propia separada (VUT)">
                          Solo lavandería de lencería propia separada (VUT)
                        </option>
                        <option value="Limpieza entre reservas + lavandería de lencería propia (VUT)">
                          Limpieza entre reservas + lavandería de lencería propia (VUT)
                        </option>
                        <option value="Coordinación integral VUT (limpieza + lencería + amenities + llaves + foto-reporte)">
                          Coordinación integral VUT (limpieza + lencería + amenities + llaves)
                        </option>
                        <option value="Higienización de sofás y colchones de apartamento turístico">
                          Higienización de sofás y colchones de apartamento turístico
                        </option>
                      </>
                    ) : (
                      <>
                        <option value="Limpieza periódica de Comunidad de Propietarios (portal y escaleras)">
                          Limpieza periódica de Comunidad de Propietarios (LPH)
                        </option>
                        <option value="Limpieza periódica de Oficina o Despacho profesional">
                          Limpieza periódica de Oficina o Despacho profesional
                        </option>
                        <option value="Limpieza periódica de Clínica, Consulta o Centro Sanitario">
                          Limpieza periódica de Clínica o Consulta
                        </option>
                        <option value="Limpieza periódica de Local Comercial / Escaparates a cota cero">
                          Limpieza periódica de Local Comercial
                        </option>
                        <option value="Pack combinado: Limpieza de centro + Lavandería de batas/toallas">
                          Pack combinado: Limpieza + Lavandería de empresa
                        </option>
                        <option value="Limpieza de sofás, sillas de oficina o colchones a domicilio">
                          Limpieza de sofás, sillas o colchones a domicilio
                        </option>
                      </>
                    )}
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
                    {isVut ? (
                      <>
                        <option value="Rotación por reservas (franja 11:00–15:00)">
                          Rotación por reservas (franja 11:00–15:00)
                        </option>
                        <option value="Temporada alta (incluidos sábados, festivos y agosto)">
                          Temporada alta (sábados, festivos y agosto)
                        </option>
                        <option value="Entrega semanal de lencería propia limpia">
                          Entrega semanal de lencería propia limpia
                        </option>
                      </>
                    ) : (
                      <>
                        <option value="Servicio continuado semanal">Servicio continuado semanal</option>
                        <option value="2 o 3 días por semana">2 o 3 días por semana</option>
                        <option value="Servicio diario (L–V / L–S)">Servicio diario (L–V / L–S)</option>
                        <option value="Quincenal o refuerzo puntual de mantenimiento">
                          Quincenal o refuerzo puntual de mantenimiento
                        </option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="b2b-detalles"
                  className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  {isVut
                    ? 'Número de apartamentos, camas y zona en Vigo (opcional)'
                    : 'Alturas/metros aproximados, barrio o polígono y horario deseado (opcional)'}
                </label>
                <textarea
                  id="b2b-detalles"
                  rows={2}
                  value={detalles}
                  onChange={(e) => {
                    setDetalles(e.target.value);
                    setPreparedReady(false);
                  }}
                  placeholder={
                    isVut
                      ? 'Ej.: 2 viviendas en Zona Náutico/Casco Vello, 4 camas, cambios 11:00–15:00...'
                      : 'Ej.: Portal de 5 plantas en As Travesas, 2 días/semana con CAE para administrador...'
                  }
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
                  {isVut
                    ? 'Generar solicitud VUT para Mimo'
                    : 'Generar solicitud de visita técnica para Mimo'}
                </button>
              ) : (
                <div className="p-4 rounded-xl border border-[#178A47]/40 bg-[#178A47]/10 space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <a
                      href={whatsappQuoteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackWhatsAppClick(currentPath, `b2b_${variant}_quote_form`, {
                          service_id: `b2b-${variant}`,
                        })
                      }
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm py-3 px-4 rounded-lg transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Abrir WhatsApp con Mimo</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center justify-center gap-1.5 border border-slate-300 bg-white text-slate-700 text-xs font-bold py-2.5 px-3.5 rounded-lg cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#178A47]" aria-hidden="true" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
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
