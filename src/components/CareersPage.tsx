import React, { useState } from 'react';
import { ArrowLeft, Mail, CheckCircle2, ShieldCheck, Copy, Check, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../data/mimosData';

interface CareersPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [failedImgs, setFailedImgs] = useState<Record<string, boolean>>({});

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 3000);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="focus:outline-hidden bg-white border-b border-slate-200 flex-1"
    >
      {/* Cabecera luminosa de empleo */}
      <section className="py-10 sm:py-14 bg-gradient-to-br from-white via-[#F4F9FE] to-[#EDF5FD] border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <nav aria-label="Migas de pan">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-slate-600">
                <li>
                  <a
                    href="/"
                    onClick={(e) => onNavigate('/', e)}
                    className="inline-flex items-center min-h-[36px] text-slate-600 hover:text-[#0F76BB] underline-offset-4 hover:underline font-medium transition-colors"
                  >
                    Inicio
                  </a>
                </li>
                <li aria-hidden="true" className="text-slate-400">/</li>
                <li className="font-bold text-[#0F76BB]">
                  Empleo — Únete a nosotros
                </li>
              </ol>
            </nav>

            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-white/95 border border-[#002147] hover:bg-[#002147] text-[#002147] hover:text-white text-xs sm:text-sm font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Volver a portada</span>
            </a>
          </div>

          <p className="text-xs sm:text-sm font-bold text-[#0F76BB] mb-2">
            Trabaja en Tintorería Mimos · Vigo
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#002147] tracking-tight mb-4">
            Empleo — Únete a nosotros
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-700 max-w-3xl leading-relaxed">
            Tintorería Mimos mantiene abierta la recepción de candidaturas espontáneas para profesionales interesados en el ámbito del cuidado textil, lavandería y atención al público en Vigo:
          </p>
        </div>
      </section>

      {/* Las 2 áreas de empleo (Personal de tintorería y Personal de gestión textil) */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Perfil 1: Personal de tintorería */}
            <article className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
              <div className="aspect-[16/10] w-full bg-[#EDF5FD] overflow-hidden border-b border-slate-200">
                {!failedImgs.tintoreria ? (
                  <img
                    src="/images/articulos/personal-tintoreria.webp"
                    alt="Personal de tintorería en Tintorería Mimos Vigo: atención al público, desmanchado, lavado y planchado"
                    referrerPolicy="no-referrer"
                    onError={() => setFailedImgs((prev) => ({ ...prev, tintoreria: true }))}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#EDF5FD] to-[#DCEBFA] flex flex-col items-center justify-center p-6 text-center text-[#002147]">
                    <Sparkles className="w-8 h-8 text-[#0F76BB] mb-2" aria-hidden="true" />
                    <p className="font-bold text-sm">Personal de tintorería y atención</p>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <p className="text-xs font-bold text-[#0F76BB]">
                    Área 1 · Tiendas y Taller Textil en Vigo
                  </p>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                    Personal de tintorería y atención
                  </h2>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    Candidaturas espontáneas para funciones de <strong>atención al público, desmanchado, lavado y planchado de prendas</strong>. Si cuentas con experiencia previa en el sector textil o quieres incorporarte a nuestra bolsa de empleo, puedes remitirnos tu perfil.
                  </p>

                  <ul className="pt-2 space-y-2 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Recepción de prendas y atención al cliente en nuestras tiendas de Vigo.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Desmanchado específico, lavado profesional y cuidado de tejidos delicados.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Planchado profesional y preparación de pedidos.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
                      'Candidatura espontánea - Personal de tintorería (Tintorería Mimos)'
                    )}`}
                    className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm px-4 py-3 rounded-xl transition-colors"
                  >
                    <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Enviar CV para Personal de tintorería</span>
                  </a>
                </div>
              </div>
            </article>

            {/* Perfil 2: Personal de gestión textil y lavandería */}
            <article className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col">
              <div className="aspect-[16/10] w-full bg-[#EDF5FD] overflow-hidden border-b border-slate-200">
                {!failedImgs.lavanderia ? (
                  <img
                    src="/images/articulos/personal-limpieza.webp"
                    alt="Personal de lavandería e higienización textil para alojamientos y empresas en Tintorería Mimos Vigo"
                    referrerPolicy="no-referrer"
                    onError={() => setFailedImgs((prev) => ({ ...prev, lavanderia: true }))}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#EDF5FD] to-[#DCEBFA] flex flex-col items-center justify-center p-6 text-center text-[#002147]">
                    <Sparkles className="w-8 h-8 text-[#0F76BB] mb-2" aria-hidden="true" />
                    <p className="font-bold text-sm">Gestión textil y lavandería para alojamientos</p>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-3">
                  <p className="text-xs font-bold text-[#0F76BB]">
                    Área 2 · Gestión Textil y Alojamientos
                  </p>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                    Gestión textil y lavandería para alojamientos
                  </h2>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    Candidaturas espontáneas para la <strong>puesta a punto y rotación textil de lencería</strong> para apartamentos turísticos y clientes de empresa en Vigo.
                  </p>

                  <ul className="pt-2 space-y-2 text-xs sm:text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Preparación y empaquetado de juegos de cama y toallas para alojamientos turísticos.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Control de calidad y desmanchado de lencería de uso intensivo.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Apoyo en la coordinación de recogidas y entregas de lavandería para empresas.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <a
                    href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
                      'Candidatura espontánea - Gestión textil y alojamientos (Tintorería Mimos)'
                    )}`}
                    className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm px-4 py-3 rounded-xl transition-colors"
                  >
                    <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Enviar CV para Gestión textil y alojamientos</span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Bloque directo de envío de currículum e información de protección de datos */}
      <section
        aria-labelledby="envio-cv-heading"
        className="py-12 sm:py-16 bg-[#F7F6F2]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="space-y-1.5">
                <h2
                  id="envio-cv-heading"
                  className="text-lg sm:text-xl font-extrabold text-[#002147]"
                >
                  ¿Cómo enviarnos tu currículum?
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl">
                  Al pulsar en cualquiera de los botones de candidatura se abrirá automáticamente tu aplicación o programa de correo electrónico habitual (con el asunto preparado) para que puedas <strong>adjuntar tu currículum en formato PDF</strong> y enviárnoslo directamente a{' '}
                  <a
                    href={CONTACT_INFO.emailHref}
                    className="font-extrabold text-[#0F76BB] hover:underline"
                  >
                    {CONTACT_INFO.email}
                  </a>{' '}
                  indicando tu experiencia o disponibilidad.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
                    'Currículum - Bolsa de Empleo Tintorería Mimos'
                  )}`}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Abrir correo para enviar CV</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#F4F9FE] hover:bg-[#EDF5FD] text-[#002147] font-bold text-sm px-4 py-3 rounded-xl border border-slate-300 transition-colors cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-[#178A47]" aria-hidden="true" />
                      <span>Correo copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" aria-hidden="true" />
                      <span>Copiar correo</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-start gap-2.5 text-xs text-slate-600">
              <ShieldCheck className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
              <p className="leading-relaxed">
                <strong>Información sobre Protección de Datos (RGPD):</strong> Los datos personales y currículums remitidos a {CONTACT_INFO.email} serán tratados por <strong>{CONTACT_INFO.legalName}</strong> con la única finalidad de gestionar su participación en nuestros procesos de selección de personal. Puede consultar más información y cómo ejercer sus derechos en nuestra{' '}
                <a
                  href="/privacidad"
                  onClick={(e) => onNavigate('/privacidad', e)}
                  className="text-[#0F76BB] font-bold hover:underline"
                >
                  Política de Privacidad
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
