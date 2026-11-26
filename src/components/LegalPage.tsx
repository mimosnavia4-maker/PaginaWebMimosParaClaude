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
  const sectionLabel =
    section === 'aviso-legal'
      ? 'Aviso legal'
      : section === 'privacidad'
      ? 'Política de privacidad'
      : 'Política de cookies';

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="focus:outline-hidden bg-white border-b border-slate-200 flex-1"
    >
      {/* Cabecera luminosa */}
      <section className="py-10 sm:py-12 bg-gradient-to-br from-white via-[#F4F9FE] to-[#EDF5FD] border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <nav aria-label="Migas de pan">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-slate-600">
                <li>
                  <a
                    href="/"
                    onClick={(e) => onNavigate('/', e)}
                    className="inline-flex items-center min-h-[44px] text-slate-600 hover:text-[#0F76BB] underline-offset-4 hover:underline font-medium transition-colors"
                  >
                    Inicio
                  </a>
                </li>
                <li aria-hidden="true" className="text-slate-400">/</li>
                <li className="font-bold text-[#0C65A1]">{sectionLabel}</li>
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

          <p className="text-xs sm:text-sm font-bold text-[#0C65A1] mb-2">
            Transparencia legal · LSSI-CE y RGPD
          </p>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#002147] tracking-tight mb-6">
            {sectionLabel}
          </h1>

          {/* Pestañas de navegación entre las 3 secciones legales */}
          <nav
            aria-label="Secciones legales"
            className="flex flex-wrap items-center gap-2 p-1.5 bg-white border border-slate-200 rounded-xl w-fit shadow-xs"
          >
            <a
              href="/aviso-legal"
              onClick={(e) => onNavigate('/aviso-legal', e)}
              className={`inline-flex items-center min-h-[44px] px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
                section === 'aviso-legal'
                  ? 'bg-[#0F76BB] text-white'
                  : 'text-[#002147] hover:bg-[#EDF5FD]'
              }`}
            >
              Aviso legal
            </a>
            <a
              href="/privacidad"
              onClick={(e) => onNavigate('/privacidad', e)}
              className={`inline-flex items-center min-h-[44px] px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
                section === 'privacidad'
                  ? 'bg-[#0F76BB] text-white'
                  : 'text-[#002147] hover:bg-[#EDF5FD]'
              }`}
            >
              Política de privacidad
            </a>
            <a
              href="/cookies"
              onClick={(e) => onNavigate('/cookies', e)}
              className={`inline-flex items-center min-h-[44px] px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
                section === 'cookies'
                  ? 'bg-[#0F76BB] text-white'
                  : 'text-[#002147] hover:bg-[#EDF5FD]'
              }`}
            >
              Política de cookies
            </a>
          </nav>
        </div>
      </section>

      <div className="py-10 sm:py-14 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Datos Identificativos del Titular (LSSI-CE y RGPD) */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-[#F4F9FE] mb-8 text-sm">
          <h2 className="text-base font-extrabold text-[#002147] mb-3">
            Datos identificativos del titular (LSSI-CE y RGPD)
          </h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-slate-700">
            <div>
              <dt className="text-xs text-slate-500">Razón social:</dt>
              <dd className="font-bold text-[#002147]">{CONTACT_INFO.legalName}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Nombre comercial:</dt>
              <dd className="font-bold text-[#002147]">{CONTACT_INFO.companyName}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">CIF / NIF:</dt>
              <dd className="font-bold text-[#002147] tabular-nums">{CONTACT_INFO.cif}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Registro Mercantil:</dt>
              <dd className="text-slate-700">
                {CONTACT_INFO.registroMercantil}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Domicilio social:</dt>
              <dd className="font-bold text-[#002147] tabular-nums">
                {CONTACT_INFO.streetAddress}, {CONTACT_INFO.postalCode} {CONTACT_INFO.locality} (
                {CONTACT_INFO.region})
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Teléfono y correo:</dt>
              <dd className="font-bold text-[#002147] tabular-nums">
                {CONTACT_INFO.phoneDisplay} · {CONTACT_INFO.email}
              </dd>
            </div>
            <div className="sm:col-span-2 pt-2 border-t border-slate-200">
              <dt className="text-xs text-slate-500">
                Canal de comunicación y atención corporativa:
              </dt>
              <dd className="text-xs text-slate-700 mt-0.5">
                {CONTACT_INFO.canalEtico}
              </dd>
            </div>
          </dl>
        </div>

        {section === 'aviso-legal' && (
          <article className="space-y-6 text-slate-700 leading-relaxed max-w-[72ch]">
            <p>
              El presente sitio web (<strong>www.tintoreriamimos.es</strong>) tiene carácter informativo y de atención al cliente sobre los servicios de tintorería, lavandería, costura y arreglos de ropa, limpieza profesional, recogida a domicilio y puntos colaboradores gestionados por <strong>{CONTACT_INFO.legalName}</strong> (CIF <strong className="tabular-nums">{CONTACT_INFO.cif}</strong>) desde sus instalaciones en {CONTACT_INFO.streetAddress}, {CONTACT_INFO.postalCode} {CONTACT_INFO.locality} ({CONTACT_INFO.region}).
            </p>
            <h2 className="text-lg font-extrabold text-[#002147]">
              Condiciones de uso y transparencia informativa
            </h2>
            <p>
              La información sobre servicios, establecimientos propios en Vigo y comercios colaboradores tiene por objeto facilitar a los usuarios el contacto directo con nuestro equipo a través de teléfono (<span className="tabular-nums">{CONTACT_INFO.phoneDisplay}</span>), correo electrónico ({CONTACT_INFO.email}) o WhatsApp (<span className="tabular-nums">{CONTACT_INFO.whatsappNumber}</span>). Los presupuestos y condiciones específicas de cada encargo se confirman de forma personalizada antes de la prestación del servicio.
            </p>
            <h2 className="text-lg font-extrabold text-[#002147]">
              Comunicaciones y canal de atención
            </h2>
            <p>
              Para cualquier consulta, reclamación, sugerencia o comunicación sobre cumplimiento y transparencia empresarial, las personas usuarias pueden dirigirse a nuestro canal de atención por correo electrónico a{' '}
              <a href={CONTACT_INFO.emailHref} className="underline font-bold text-[#0C65A1] hover:text-[#002147]">
                {CONTACT_INFO.email}
              </a>
              .
            </p>
          </article>
        )}

        {section === 'privacidad' && (
          <article className="space-y-6 text-slate-700 leading-relaxed max-w-[72ch]">
            <p>
              Responsable del tratamiento: <strong>{CONTACT_INFO.legalName}</strong> (CIF <strong className="tabular-nums">{CONTACT_INFO.cif}</strong>), con domicilio en {CONTACT_INFO.streetAddress}, {CONTACT_INFO.postalCode} {CONTACT_INFO.locality} ({CONTACT_INFO.region}), teléfono <span className="tabular-nums">{CONTACT_INFO.phoneDisplay}</span> y correo electrónico{' '}
              <a href={CONTACT_INFO.emailHref} className="underline font-bold text-[#0C65A1] hover:text-[#002147]">
                {CONTACT_INFO.email}
              </a>
              .
            </p>
            <h2 className="text-lg font-extrabold text-[#002147]">
              Finalidad del tratamiento en formularios y consultas con Mimo
            </h2>
            <p>
              Los datos que el usuario introduce en los formularios de recogida a domicilio, presupuesto para empresas, colaboradores o contacto se procesan en su propio navegador para estructurar el mensaje que el usuario envía voluntariamente a través de WhatsApp (<span className="tabular-nums">{CONTACT_INFO.whatsappNumber}</span>) o correo electrónico con la finalidad de atender su consulta de precios, recogida, presupuesto o solicitud de colaboración.
            </p>
            <h2 className="text-lg font-extrabold text-[#002147]">
              Servicios externos y comunicaciones con terceros
            </h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                <strong>Canal de mensajería WhatsApp:</strong> Al pulsar en los botones o enlaces de contacto por WhatsApp, la comunicación se gestiona a través de la infraestructura externa de Meta Platforms Ireland Ltd. (WhatsApp Ireland Limited). El tratamiento de los mensajes y metadatos en dicha plataforma se rige por su respectiva política de privacidad y las condiciones aceptadas por el usuario al utilizar dicha aplicación.
              </li>
              <li>
                <strong>Google Maps y Google Fonts:</strong> Esta web utiliza fuentes tipográficas de Google Fonts y ofrece un mapa interactivo de localización mediante Google Maps (Google Ireland Limited). Por respeto a tu privacidad, el mapa interactivo de Google Maps permanece bloqueado por defecto y no realiza conexiones ni carga recursos de Google Maps hasta que aceptas las cookies o pulsas expresamente el botón «Cargar mapa interactivo». La carga voluntaria de estos recursos implica la transmisión técnica de la dirección IP al proveedor para mostrar las ubicaciones.
              </li>
            </ul>
            <h2 className="text-lg font-extrabold text-[#002147]">
              Derechos de las personas interesadas
            </h2>
            <p>
              Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad enviando una comunicación a{' '}
              <a href={CONTACT_INFO.emailHref} className="underline font-bold text-[#0C65A1] hover:text-[#002147]">
                {CONTACT_INFO.email}
              </a>{' '}
              o por correo postal a nuestra sede en {CONTACT_INFO.streetAddress}, {CONTACT_INFO.postalCode} {CONTACT_INFO.locality}.
            </p>
          </article>
        )}

        {section === 'cookies' && (
          <article className="space-y-6 text-slate-700 leading-relaxed max-w-[72ch]">
            <p>
              En <strong>www.tintoreriamimos.es</strong> distinguimos entre el almacenamiento técnico necesario para el funcionamiento de la interfaz y la medición analítica opcional, que permanece desactivada por defecto hasta que el usuario decide aceptarla.
            </p>

            <h2 className="text-lg font-extrabold text-[#002147]">
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
                <code>mimos_theme</code>: almacena la preferencia visual técnica de la interfaz (<code>light</code>).
              </li>
            </ul>

            <h2 className="text-lg font-extrabold text-[#002147]">
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
                Contabilizar de forma agregada los clics hacia WhatsApp (<code>whatsapp_click</code>) o teléfono (<code>phone_click</code>), la preparación de solicitudes en formularios (<code>form_prepared</code>) y el uso de filtros en el localizador de tiendas (<code>locator_search</code>), registrando únicamente métricas agregadas (ruta, zona del botón, tipo de formulario o recuento de resultados), sin enviar a Google Analytics nombres, teléfonos, textos de consultas ni búsquedas personales.
              </li>
            </ul>
            <p className="text-sm">
              Si no interactúas con el aviso o si pulsas <strong>«Rechazar»</strong>, el script de Google Analytics no se carga y no se envían eventos analíticos.
            </p>

            <h2 className="text-lg font-extrabold text-[#002147]">
              3. Cómo cambiar o retirar tu consentimiento
            </h2>
            <p>
              Puedes modificar tu elección o retirar tu consentimiento en cualquier momento pulsando el botón inferior o el enlace permanente <strong>«Gestionar cookies»</strong> situado en el pie de página de toda la web. Si pasas de «Aceptar» a «Rechazar», se detiene la medición en curso, se desactiva el script analítico, vuelve a bloquearse la carga automática del mapa interactivo y se solicita la eliminación de las cookies de Google Analytics en tu navegador. También puedes borrar las cookies y los datos de sitios web desde los ajustes de privacidad de tu navegador.
            </p>

            <div>
              <button
                type="button"
                onClick={onOpenCookieSettings}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer shadow-xs"
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
