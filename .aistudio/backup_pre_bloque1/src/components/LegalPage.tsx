import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { CONTACT_INFO } from '../data/mimosData';

interface LegalPageProps {
  section: 'aviso-legal' | 'privacidad' | 'cookies';
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  onOpenCookieSettings: () => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({
  section,
  onNavigate,
  onOpenCookieSettings,
}) => {
  return (
    <main className="py-12 sm:py-16 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <a
            href="/"
            onClick={(e) => onNavigate('/', e)}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Volver a la página principal</span>
          </a>
        </div>

        {/* Navigation Tabs Between the 3 Legal Sections */}
        <nav
          aria-label="Secciones legales"
          className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-[#0b1d36] rounded-xl w-fit mb-8"
        >
          <a
            href="/aviso-legal"
            onClick={(e) => onNavigate('/aviso-legal', e)}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
              section === 'aviso-legal'
                ? 'bg-[#002147] text-white dark:bg-[#0F76BB]'
                : 'text-slate-700 dark:text-slate-300 hover:text-[#002147]'
            }`}
          >
            Aviso legal
          </a>
          <a
            href="/privacidad"
            onClick={(e) => onNavigate('/privacidad', e)}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
              section === 'privacidad'
                ? 'bg-[#002147] text-white dark:bg-[#0F76BB]'
                : 'text-slate-700 dark:text-slate-300 hover:text-[#002147]'
            }`}
          >
            Política de privacidad
          </a>
          <a
            href="/cookies"
            onClick={(e) => onNavigate('/cookies', e)}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
              section === 'cookies'
                ? 'bg-[#002147] text-white dark:bg-[#0F76BB]'
                : 'text-slate-700 dark:text-slate-300 hover:text-[#002147]'
            }`}
          >
            Política de cookies
          </a>
        </nav>

        {/* Datos Verificados del Titular (Sección 2 y Sección 11 del Plan Maestro) */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] mb-8 text-sm">
          <h2 className="text-base font-extrabold text-[#002147] dark:text-white mb-3">
            Datos identificativos del titular (LSSI-CE y RGPD)
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-slate-700 dark:text-slate-300">
            <div>
              <dt className="text-xs text-slate-500 dark:text-slate-400">Razón social:</dt>
              <dd className="font-bold">{CONTACT_INFO.legalName}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500 dark:text-slate-400">Nombre comercial:</dt>
              <dd className="font-bold">{CONTACT_INFO.companyName}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500 dark:text-slate-400">CIF / NIF:</dt>
              <dd className="font-mono text-amber-800 dark:text-amber-300">{CONTACT_INFO.cif}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500 dark:text-slate-400">Registro Mercantil:</dt>
              <dd className="font-mono text-amber-800 dark:text-amber-300">
                {CONTACT_INFO.registroMercantil}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500 dark:text-slate-400">Domicilio social:</dt>
              <dd className="font-bold">
                {CONTACT_INFO.streetAddress}, {CONTACT_INFO.postalCode} {CONTACT_INFO.locality} (
                {CONTACT_INFO.region})
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500 dark:text-slate-400">Teléfono y correo:</dt>
              <dd className="font-bold tabular-nums">
                {CONTACT_INFO.phoneDisplay} · {CONTACT_INFO.email}
              </dd>
            </div>
            <div className="sm:col-span-2 pt-1 border-t border-slate-200 dark:border-slate-700">
              <dt className="text-xs text-slate-500 dark:text-slate-400">
                Canal interno de información / Canal ético (Ley 2/2023):
              </dt>
              <dd className="font-mono text-xs text-amber-800 dark:text-amber-300">
                {CONTACT_INFO.canalEtico}
              </dd>
            </div>
          </dl>
        </div>

        {section === 'aviso-legal' && (
          <article className="space-y-6 text-slate-700 dark:text-slate-200 leading-relaxed">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white">
              Aviso Legal
            </h1>
            <p>
              El presente sitio web (<strong>www.tintoreriamimos.es</strong>) tiene carácter informativo y de atención al cliente sobre los servicios de tintorería, lavandería, limpieza profesional, recogida a domicilio y puntos colaboradores gestionados por <strong>{CONTACT_INFO.legalName}</strong> desde sus instalaciones en {CONTACT_INFO.streetAddress}, {CONTACT_INFO.postalCode} {CONTACT_INFO.locality} ({CONTACT_INFO.region}).
            </p>
            <div className="p-5 rounded-xl border border-amber-300/80 dark:border-amber-700/60 bg-amber-50/60 dark:bg-amber-950/20 text-sm">
              <strong className="text-[#002147] dark:text-amber-300 block mb-1">
                Datos pendientes de completar antes de publicar en producción (Sección 11 y 13):
              </strong>
              Confirmar el CIF ({CONTACT_INFO.cif}), los datos de inscripción en el Registro Mercantil de Pontevedra ({CONTACT_INFO.registroMercantil}) y si procede enlace al Canal Ético ({CONTACT_INFO.canalEtico}).
            </div>
          </article>
        )}

        {section === 'privacidad' && (
          <article className="space-y-6 text-slate-700 dark:text-slate-200 leading-relaxed">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white">
              Política de Privacidad
            </h1>
            <p>
              Responsable del tratamiento: <strong>{CONTACT_INFO.legalName}</strong> ({CONTACT_INFO.cif}), con domicilio en {CONTACT_INFO.streetAddress}, {CONTACT_INFO.postalCode} {CONTACT_INFO.locality} ({CONTACT_INFO.region}), teléfono {CONTACT_INFO.phoneDisplay} y correo electrónico{' '}
              <a href={CONTACT_INFO.emailHref} className="underline">
                {CONTACT_INFO.email}
              </a>
              .
            </p>
            <h2 className="text-lg font-extrabold text-[#002147] dark:text-white">
              Finalidad del tratamiento en formularios y consultas con Mimo
            </h2>
            <p>
              Los datos que el usuario introduce en los formularios de recogida a domicilio, presupuesto para empresas o contacto se utilizan en su propio navegador para estructurar el mensaje que el usuario envía voluntariamente a través de WhatsApp (655 536 844) o correo electrónico con la finalidad de atender su consulta de precios, recogida o presupuesto.
            </p>
            <h2 className="text-lg font-extrabold text-[#002147] dark:text-white">
              Derechos de las personas interesadas
            </h2>
            <p>
              Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad enviando una comunicación a{' '}
              <a href={CONTACT_INFO.emailHref} className="underline">
                {CONTACT_INFO.email}
              </a>{' '}
              o por correo postal a nuestra sede en {CONTACT_INFO.streetAddress}, {CONTACT_INFO.postalCode} {CONTACT_INFO.locality}.
            </p>
          </article>
        )}

        {section === 'cookies' && (
          <article className="space-y-6 text-slate-700 dark:text-slate-200 leading-relaxed">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white">
              Política de Cookies
            </h1>
            <p>
              Este sitio web utiliza almacenamiento local técnico (<code>localStorage</code>) estrictamente necesario para recordar tu preferencia sobre el aviso de cookies y el modo visual de lectura (claro u oscuro).
            </p>
            <div>
              <button
                type="button"
                onClick={onOpenCookieSettings}
                className="inline-flex items-center gap-2 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Configurar o revisar preferencias de cookies
              </button>
            </div>
          </article>
        )}
      </div>
    </main>
  );
};
