import React, { useState } from 'react';
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  Check,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import {
  CONTACT_INFO,
  IMAGES,
  SERVICIOS_LIMPIEZA_PROFESIONAL,
  PACKS_APARTAMENTOS_BORRADOR,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';

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
    'Apartamento turístico / Vivienda vacacional'
  );
  const [frecuencia, setFrecuencia] = useState('Rotación por reservas / Semanal');
  const [detalles, setDetalles] = useState('');
  const [aceptoPrivacidad, setAceptoPrivacidad] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [preparedReady, setPreparedReady] = useState(false);
  const [copied, setCopied] = useState(false);

  const pageHeader = {
    limpieza: {
      badge: 'DIVISIÓN DE LIMPIEZA PROFESIONAL · VIGO',
      h1: 'Empresa de limpieza profesional en Vigo y gestión textil para alojamientos',
      subtitle:
        'Impulsamos nuestra experiencia en higiene y cuidado textil hacia el servicio de limpieza profesional en Vigo: apartamentos turísticos, viviendas, oficinas y negocios con presupuesto a medida.',
    },
    apartamentos: {
      badge: 'ESPECIALISTAS EN ALOJAMIENTOS TURÍSTICOS · VIGO',
      h1: 'Limpieza y lavandería para apartamentos turísticos y viviendas vacacionales en Vigo',
      subtitle:
        'Ayudamos a propietarios, anfitriones y empresas gestoras a tener cada apartamento impecable entre huéspedes: lavado y planchado profesional de ropa de cama y toallas junto con soluciones de puesta a punto.',
    },
    empresas: {
      badge: 'SERVICIOS B2B PARA EMPRESAS Y PROFESIONALES · VIGO',
      h1: 'Servicios de lavandería, tintorería y limpieza para empresas en Vigo',
      subtitle:
        'Soluciones adaptadas a cada negocio en Vigo: alojamientos turísticos, hostelería, clínicas, comercios, oficinas y vestuario laboral con atención directa desde nuestra central de Navia.',
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
    <main className="bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
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
                  href={CONTACT_INFO.whatsappApartamentosHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-colors"
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
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#071936]">
                <img
                  src={IMAGES.b2bApartamentos}
                  alt="Ropa de cama y toallas preparadas por Tintorería Mimos para alojamientos turísticos y empresas en Vigo"
                  width={800}
                  height={600}
                  className="w-full aspect-4/3 object-cover"
                />
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

      {/* Los 4 Bloques de Servicios de Limpieza Profesional (Sección 3.B) */}
      <section className="py-16 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-2">
              Soluciones profesionales sin tarifas cerradas estándar
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight mb-4">
              Servicios de limpieza y mantenimiento textil en Vigo
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300">
              Cada apartamento, vivienda o negocio tiene dimensiones y frecuencias distintas. Por eso nuestro asistente <strong>Mimo</strong> recoge tus necesidades por WhatsApp para prepararte una propuesta a medida.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
            {SERVICIOS_LIMPIEZA_PROFESIONAL.map((srv) => (
              <article
                key={srv.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-8 flex flex-col justify-between"
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

                <a
                  href={srv.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-colors w-fit"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Solicitar presupuesto con Mimo</span>
                </a>
              </article>
            ))}
          </div>

          {/* Las 3 Modalidades para Apartamentos Turísticos */}
          <div className="rounded-2xl bg-[#002147] text-white p-6 sm:p-10">
            <h2 className="text-2xl font-extrabold text-white mb-2">
              Modalidades de servicio para apartamentos turísticos en Vigo
            </h2>
            <p className="text-sm text-slate-200 mb-6">
              Sin tarifas públicas cerradas: elige la modalidad que mejor encaje con tu alojamiento y consulta condiciones con Mimo.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PACKS_APARTAMENTOS_BORRADOR.map((pack) => (
                <div
                  key={pack.id}
                  className="rounded-xl border border-white/15 bg-white/5 p-5 flex flex-col justify-between"
                >
                  <div>
                    <span className="inline-block text-[11px] font-mono bg-white/10 text-[#60B5F6] border border-white/15 px-2 py-0.5 rounded mb-2.5">
                      {pack.estado}
                    </span>
                    <h3 className="text-base font-extrabold text-white mb-2">{pack.nombre}</h3>
                    <p className="text-xs text-slate-200 leading-relaxed mb-4">
                      {pack.descripcion}
                    </p>
                  </div>
                  <a
                    href={pack.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-xs py-2.5 px-3 rounded-lg transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Pedir presupuesto</span>
                  </a>
                </div>
              ))}
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white"
                  >
                    <option value="Apartamento turístico / Vivienda vacacional">
                      Apartamento turístico / Vivienda vacacional
                    </option>
                    <option value="Vários apartamentos turísticos (Gestora)">
                      Varios apartamentos turísticos (Gestora)
                    </option>
                    <option value="Lavandería para empresa u hostelería">
                      Lavandería para empresa u hostelería
                    </option>
                    <option value="Limpieza de oficina o local comercial">
                      Limpieza de oficina o local comercial
                    </option>
                    <option value="Limpieza de vivienda particular">
                      Limpieza de vivienda particular
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
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white"
                  >
                    <option value="Rotación por reservas / Semanal">
                      Rotación por reservas / Semanal
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
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
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
