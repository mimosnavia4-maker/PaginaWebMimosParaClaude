import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
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

        {(section === 'aviso-legal' || section === 'privacidad') && (
          <div className="mb-8 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0b1d36] flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <FileText
              className="w-5 h-5 text-[#0F76BB] shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <div>
              <strong className="text-[#002147] dark:text-white block mb-0.5">
                Documento en modo borrador previo a publicación definitiva
              </strong>
              Esta sección legal permanece sin indexar en buscadores hasta que se incorporen los datos registrales y de identificación fiscal definitivos antes de la publicación oficial del sitio web.
            </div>
          </div>
        )}

        {/* Datos Identificativos del Titular (LSSI-CE y RGPD) */}
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
              <dd className="font-bold tabular-nums">{CONTACT_INFO.cif}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500 dark:text-slate-400">Registro Mercantil:</dt>
              <dd className="text-slate-600 dark:text-slate-300">
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
                Canal de comunicación y atención legal:
              </dt>
              <dd className="text-xs text-slate-600 dark:text-slate-300">
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
              El presente sitio web (<strong>www.tintoreriamimos.es</strong>) tiene carácter informativo y de atención al cliente sobre los servicios de tintorería, lavandería, costura y arreglos de ropa, limpieza profesional, recogida a domicilio y puntos colaboradores gestionados por <strong>{CONTACT_INFO.legalName}</strong> (CIF <strong>{CONTACT_INFO.cif}</strong>) desde sus instalaciones en {CONTACT_INFO.streetAddress}, {CONTACT_INFO.postalCode} {CONTACT_INFO.locality} ({CONTACT_INFO.region}).
            </p>
            <h2 className="text-lg font-extrabold text-[#002147] dark:text-white">
              Condiciones de uso y transparencia informativa
            </h2>
            <p>
              La información sobre servicios, establecimientos propios en Vigo y comercios colaboradores tiene por objeto facilitar a los usuarios el contacto directo con nuestro equipo a través de teléfono ({CONTACT_INFO.phoneDisplay}), correo electrónico ({CONTACT_INFO.email}) o WhatsApp ({CONTACT_INFO.whatsappNumber}). Los presupuestos y condiciones específicas de cada encargo se confirman de forma personalizada antes de la prestación del servicio.
            </p>
          </article>
        )}

        {section === 'privacidad' && (
          <article className="space-y-6 text-slate-700 dark:text-slate-200 leading-relaxed">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white">
              Política de Privacidad
            </h1>
            <p>
              Responsable del tratamiento: <strong>{CONTACT_INFO.legalName}</strong> (CIF <strong>{CONTACT_INFO.cif}</strong>), con domicilio en {CONTACT_INFO.streetAddress}, {CONTACT_INFO.postalCode} {CONTACT_INFO.locality} ({CONTACT_INFO.region}), teléfono {CONTACT_INFO.phoneDisplay} y correo electrónico{' '}
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
              En <strong>www.tintoreriamimos.es</strong> distinguimos entre el almacenamiento técnico necesario para el funcionamiento de la interfaz y la medición analítica opcional, que permanece desactivada por defecto hasta que el usuario decide aceptarla.
            </p>

            <h2 className="text-lg font-extrabold text-[#002147] dark:text-white">
              1. Almacenamiento técnico en el navegador (<code>localStorage</code>)
            </h2>
            <p>
              Esta web utiliza el almacenamiento local del navegador (<code>localStorage</code>) exclusivamente para guardar dos preferencias técnicas en tu dispositivo:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <code>mimos_cookies_consent</code>: registra tu decisión sobre el aviso de cookies (<code>accepted</code> o <code>rejected</code>) para respetar tu elección al cambiar de página o volver a visitar la web.
              </li>
              <li>
                <code>mimos_theme</code>: recuerda si has seleccionado el modo visual claro (<code>light</code>) u oscuro (<code>dark</code>).
              </li>
            </ul>

            <h2 className="text-lg font-extrabold text-[#002147] dark:text-white">
              2. Analítica web opcional (Google Analytics 4)
            </h2>
            <p>
              Únicamente cuando pulsas el botón <strong>«Aceptar»</strong> en el panel de preferencias, la web carga el script de medición de <strong>Google Analytics 4</strong> (identificador <code>G-17E0NSEG5Q</code>, provisto por Google) que emplea cookies analíticas (como <code>_ga</code> y <code>_ga_17E0NSEG5Q</code>) con la finalidad de:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                Conocer de forma estadística y agregada qué páginas informativas y de servicios se consultan dentro de la web (evento <code>page_view</code>).
              </li>
              <li>
                Contabilizar de forma agregada cuántas veces se pulsan los enlaces de contacto hacia WhatsApp (<code>whatsapp_click</code>) o teléfono (<code>phone_click</code>), registrando únicamente la página y la zona del botón pulsado, sin enviar a Google Analytics números de teléfono, textos de mensajes ni datos introducidos en formularios.
              </li>
            </ul>
            <p className="text-sm">
              Si no interactúas con el aviso o si pulsas <strong>«Rechazar»</strong>, el script de Google Analytics no se carga y no se envían eventos analíticos.
            </p>

            <h2 className="text-lg font-extrabold text-[#002147] dark:text-white">
              3. Cómo cambiar o retirar tu consentimiento
            </h2>
            <p>
              Puedes modificar tu elección o retirar tu consentimiento en cualquier momento pulsando el botón inferior o el enlace permanente <strong>«Configurar cookies»</strong> situado en el pie de página de toda la web. Si pasas de «Aceptar» a «Rechazar», se detiene la medición en curso, se desactiva el script analítico y se solicita la eliminación de las cookies de Google Analytics en tu navegador. También puedes borrar las cookies y los datos de sitios web desde los ajustes de privacidad de tu navegador.
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
