import React from 'react';
import { ArrowLeft, Mail, Briefcase, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO } from '../data/mimosData';

interface CareersPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  return (
    <main className="py-12 sm:py-16 bg-slate-50 dark:bg-[#071324] flex-1">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Migas de pan y botón volver */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <nav
            aria-label="Migas de pan"
            className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2"
          >
            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="hover:text-[#0F76BB] dark:hover:text-[#60B5F6] font-semibold transition-colors"
            >
              Inicio
            </a>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900 dark:text-white font-bold">
              Empleo — Únete a nosotros
            </span>
          </nav>

          <a
            href="/"
            onClick={(e) => onNavigate('/', e)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Volver a inicio</span>
          </a>
        </div>

        {/* Cabecera de la página de empleo */}
        <div className="bg-[#002147] rounded-2xl p-6 sm:p-10 text-white shadow-sm mb-10 border border-white/10">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#60B5F6] mb-2">
            <Briefcase className="w-4 h-4" aria-hidden="true" />
            <span>Trabaja en Tintorería Mimos · Vigo</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
            Empleo — Únete a nosotros
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-3xl leading-relaxed">
            Tintorería Mimos busca profesionales de diferentes perfiles que realicen su actividad en nuestras áreas de cuidado textil y limpieza profesional en Vigo:
          </p>
        </div>

        {/* Las 2 áreas de empleo (Personal de tintorería y Personal de limpieza) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10">
          {/* Perfil 1: Personal de tintorería */}
          <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col">
            <div className="aspect-[16/10] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden border-b border-slate-200 dark:border-slate-800">
              <img
                src="/images/articulos/personal-tintoreria.jpg"
                alt="Personal de tintorería en Tintorería Mimos Vigo: atención al público, desmanchado, lavado y planchado"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <span className="inline-block text-xs font-mono uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6] font-bold">
                  Área 1 · Tiendas y Taller Textil en Vigo
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Personal de tintorería
                </h2>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  Su función será la de <strong>atención al público, desmanchado, lavado y planchado de las prendas</strong>. Si tienes experiencia o te atrae el mundo de la tintorería, éste puede ser tu trabajo.
                </p>

                <ul className="pt-2 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Recepción de prendas y atención al cliente en nuestras tiendas de Vigo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Desmanchado específico, lavado profesional y cuidado de tejidos delicados.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Planchado profesional y preparación de pedidos.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
                    'Currículum - Personal de tintorería (Tintorería Mimos)'
                  )}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0F76BB] hover:bg-[#002147] text-white font-bold text-sm px-4 py-3 rounded-xl transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Enviar CV para Personal de tintorería</span>
                </a>
              </div>
            </div>
          </article>

          {/* Perfil 2: Personal de limpieza */}
          <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden flex flex-col">
            <div className="aspect-[16/10] w-full bg-slate-100 dark:bg-slate-800 overflow-hidden border-b border-slate-200 dark:border-slate-800">
              <img
                src="/images/articulos/personal-limpieza.jpg"
                alt="Personal de limpieza a domicilio y apartamentos en Tintorería Mimos Vigo"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-3">
                <span className="inline-block text-xs font-mono uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6] font-bold">
                  Área 2 · Servicios a Domicilio en Vigo
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                  Personal de limpieza
                </h2>
                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  Su función es la <strong>limpieza en casa del cliente</strong>. Si tienes experiencia o te atrae el mundo de los servicios, éste puede ser tu trabajo.
                </p>

                <ul className="pt-2 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Limpieza profesional en viviendas particulares y hogares en Vigo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Puesta a punto de apartamentos turísticos y viviendas vacacionales.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>Limpieza y mantenimiento de oficinas y locales profesionales.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <a
                  href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
                    'Currículum - Personal de limpieza (Tintorería Mimos)'
                  )}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#0F76BB] hover:bg-[#002147] text-white font-bold text-sm px-4 py-3 rounded-xl transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Enviar CV para Personal de limpieza</span>
                </a>
              </div>
            </div>
          </article>
        </div>

        {/* Bloque directo de envío de currículum e información de protección de datos */}
        <section
          aria-labelledby="envio-cv-heading"
          className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h2
                id="envio-cv-heading"
                className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white"
              >
                ¿Cómo enviarnos tu currículum?
              </h2>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
                Envíanos tu currículum a{' '}
                <a
                  href={CONTACT_INFO.emailHref}
                  className="font-extrabold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
                >
                  {CONTACT_INFO.email}
                </a>{' '}
                indicando el tipo de empleo al que quieres acceder (<strong>Personal de tintorería</strong> o{' '}
                <strong>Personal de limpieza</strong>).
              </p>
            </div>

            <a
              href={`mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
                'Currículum - Bolsa de Empleo Tintorería Mimos'
              )}`}
              className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0F76BB] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors shrink-0"
            >
              <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Escribir a {CONTACT_INFO.email}</span>
            </a>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              <strong>Información sobre Protección de Datos (RGPD):</strong> Los datos personales y currículums remitidos a {CONTACT_INFO.email} serán tratados por <strong>{CONTACT_INFO.legalName}</strong> con la única finalidad de gestionar su participación en nuestros procesos de selección de personal. Puede consultar más información y cómo ejercer sus derechos en nuestra{' '}
              <a
                href="/privacidad"
                onClick={(e) => onNavigate('/privacidad', e)}
                className="text-[#0F76BB] dark:text-[#60B5F6] font-semibold hover:underline"
              >
                Política de Privacidad
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};
