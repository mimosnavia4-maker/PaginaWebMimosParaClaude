import React from 'react';
import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import {
  CONTACT_INFO,
  IMAGES,
  SERVICIOS_MIMOS,
  TIENDAS_PROPIAS,
  ZONAS_RESUMEN,
  ARTICULOS_BLOG_RESUMEN,
} from '../data/mimosData';
import { trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';

interface FooterProps {
  currentPath?: string;
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  onOpenCookieSettings: () => void;
  mimoOpen?: boolean;
  onToggleMimo?: () => void;
  mimoTriggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export const Footer: React.FC<FooterProps> = ({
  currentPath,
  onNavigate,
  onOpenCookieSettings,
  mimoOpen = false,
  onToggleMimo,
  mimoTriggerRef,
}) => {
  const activePath = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/');

  const getStoreHref = (id: string) => {
    if (id === 'as-teixugueiras') return '/tienda-mimos-navia-vigo';
    if (id === 'gregorio-espino') return '/tienda-mimos-gregorio-espino-vigo';
    if (id === 'rua-venezuela') return '/tienda-mimos-venezuela-vigo';
    return '/puntos-mimos';
  };

  const formatPhoneHref = (phone: string) => `tel:+34${phone.replace(/\s+/g, '')}`;

  const headingAccent = 'text-[#0C65A1]';
  const headingNeutral = 'text-[#002147]';
  const linkPrimary =
    'inline-flex items-center min-h-[44px] md:min-h-0 text-[#002147] font-bold hover:text-[#0F76BB] hover:underline transition-colors';
  const linkSecondary =
    'inline-flex items-center min-h-[44px] md:min-h-0 text-slate-600 hover:text-[#002147] transition-colors';
  const dividerBorder = 'border-slate-200';

  return (
    <>
      <footer className="pt-14 pb-10 md:pb-14 border-t bg-[#F8FBFF] text-slate-700 border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 xl:gap-10 pb-10 border-b ${dividerBorder}`}>
            {/* Columna 1: Marca y 3 tiendas propias clicables (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={IMAGES.logoMimos}
                  alt="Logotipo de Tintorería Mimos Navia"
                  width={42}
                  height={42}
                  className="w-10.5 h-10.5 rounded-full object-contain p-0.5 shrink-0 bg-[#EDF5FD] border border-[#002147]/10"
                />
                <div>
                  <p className={`text-base font-extrabold leading-none tracking-tight ${headingNeutral}`}>
                    TINTORERÍA <span className={headingAccent}>MIMOS</span>
                  </p>
                  <p className="text-xs mt-1 text-slate-600">
                    {CONTACT_INFO.legalName}
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                Tintorería, lavandería, arreglos de ropa, tapicerías a domicilio y limpieza profesional en Vigo y comarca.
              </p>

              <div className="space-y-3 pt-1">
                <p className={`text-[11px] font-bold uppercase tracking-wider ${headingAccent}`}>
                  Nuestras {TIENDAS_PROPIAS.length} tiendas propias en Vigo
                </p>
                <ul className="space-y-2.5 text-xs">
                  {TIENDAS_PROPIAS.map((t) => {
                    const href = getStoreHref(t.id);
                    return (
                      <li key={t.id} className="leading-snug">
                        <a
                          href={href}
                          onClick={(e) => onNavigate(href, e)}
                          className={`${linkPrimary} block`}
                        >
                          {t.direccion} ({t.codigo_postal})
                        </a>
                        <span className="block text-slate-600">
                          {t.horario.resumen}{' '}
                          <span aria-hidden="true">·</span>{' '}
                          <a
                            href={formatPhoneHref(t.telefono)}
                            onClick={() => trackPhoneClick(activePath, 'footer')}
                            className="font-semibold tabular-nums whitespace-nowrap text-[#0C65A1] hover:text-[#002147]"
                          >
                            {t.telefonos_mostrados}
                          </a>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Columna 2: Servicios destacados + Áreas principales (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div>
                <h2 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${headingAccent}`}>
                  Destacados a domicilio y taller
                </h2>
                <ul className="space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <a
                      href="/limpieza-sofas-vigo"
                      onClick={(e) => onNavigate('/limpieza-sofas-vigo', e)}
                      className={linkPrimary}
                    >
                      Limpieza de sofás a domicilio
                    </a>
                  </li>
                  <li>
                    <a
                      href="/limpieza-alfombras-vigo"
                      onClick={(e) => onNavigate('/limpieza-alfombras-vigo', e)}
                      className={linkPrimary}
                    >
                      Limpieza de alfombras (recogida o tienda)
                    </a>
                  </li>
                  <li>
                    <a
                      href="/reparacion-alfombras-vigo"
                      onClick={(e) => onNavigate('/reparacion-alfombras-vigo', e)}
                      className={linkPrimary}
                    >
                      Reparación de alfombras (flecos y bordes)
                    </a>
                  </li>
                  <li>
                    <a
                      href="/limpieza-vestidos-novia-ceremonia-vigo"
                      onClick={(e) => onNavigate('/limpieza-vestidos-novia-ceremonia-vigo', e)}
                      className={linkPrimary}
                    >
                      Vestidos de novia, fiesta y ceremonia
                    </a>
                  </li>
                  <li>
                    <a
                      href="/arreglos-de-ropa-vigo"
                      onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                      className={linkPrimary}
                    >
                      Costura y arreglos de ropa
                    </a>
                  </li>
                  <li>
                    <a
                      href="/limpieza-incendios-siniestros-vigo"
                      onClick={(e) => onNavigate('/limpieza-incendios-siniestros-vigo', e)}
                      className={linkPrimary}
                    >
                      Incendios, humo y siniestros (Seguros)
                    </a>
                  </li>
                </ul>
              </div>

              <div className={`pt-3 border-t ${dividerBorder}`}>
                <h2 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${headingNeutral}`}>
                  Servicios en Vigo
                </h2>
                <ul className="space-y-1.5 text-xs sm:text-sm">
                  {SERVICIOS_MIMOS.map((s) => (
                    <li key={s.id}>
                      <a
                        href={s.url}
                        onClick={(e) => onNavigate(s.url, e)}
                        className={linkSecondary}
                      >
                        {s.titulo}
                      </a>
                    </li>
                  ))}
                  <li className="pt-1">
                    <a
                      href="/limpieza-profesional-vigo"
                      onClick={(e) => onNavigate('/limpieza-profesional-vigo', e)}
                      className={`font-bold hover:underline ${headingAccent}`}
                    >
                      Limpieza profesional en Vigo →
                    </a>
                  </li>
                  <li>
                    <a
                      href="/limpieza-casas-vigo"
                      onClick={(e) => onNavigate('/limpieza-casas-vigo', e)}
                      className={`font-bold hover:underline ${headingAccent}`}
                    >
                      Limpieza de casas en Vigo →
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Columna 3: Red local y 4 Guías destacadas (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div>
                <h2 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${headingNeutral}`}>
                  Tiendas y puntos por localidad
                </h2>
                <ul className="space-y-1.5 text-xs sm:text-sm">
                  <li>
                    <a
                      href="/puntos-mimos"
                      onClick={(e) => onNavigate('/puntos-mimos', e)}
                      className={`font-bold hover:underline ${headingAccent}`}
                    >
                      Buscador de Tiendas y Puntos Mimos
                    </a>
                  </li>
                  {ZONAS_RESUMEN.map((zona) => (
                    <li key={zona.slug}>
                      <a
                        href={zona.url}
                        onClick={(e) => onNavigate(zona.url, e)}
                        className={linkSecondary}
                      >
                        {zona.localidad} ({zona.comarca})
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`pt-3 border-t ${dividerBorder}`}>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <h2 className={`text-xs font-bold uppercase tracking-wider ${headingNeutral}`}>
                    Guías de cuidado textil
                  </h2>
                  <a
                    href="/blog"
                    onClick={(e) => onNavigate('/blog', e)}
                    className={`inline-flex items-center min-h-[44px] md:min-h-0 text-[11px] font-bold hover:underline whitespace-nowrap shrink-0 ${headingAccent}`}
                  >
                    Ver todas ({ARTICULOS_BLOG_RESUMEN.length}) →
                  </a>
                </div>
                <ul className="space-y-2 text-xs leading-snug">
                  {ARTICULOS_BLOG_RESUMEN.slice(0, 4).map((art) => (
                    <li key={art.slug}>
                      <a
                        href={art.url}
                        onClick={(e) => onNavigate(art.url, e)}
                        className="transition-colors block text-slate-700 hover:text-[#0F76BB]"
                      >
                        {art.titulo}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Columna 4: Contacto sin cortes de correo, Redes y Colaboraciones (3 cols) */}
            <div className="lg:col-span-3 space-y-4">
              <div>
                <h2 className={`text-xs font-bold uppercase tracking-wider mb-2.5 ${headingNeutral}`}>
                  Contacto y Mimo
                </h2>
                <ul className="space-y-2 text-xs sm:text-sm">
                  <li>
                    <a
                      href={CONTACT_INFO.phoneHref}
                      onClick={() => trackPhoneClick(activePath, 'footer')}
                      className="inline-flex items-center gap-2 tabular-nums font-bold text-[#002147] hover:text-[#0F76BB]"
                    >
                      <Phone className={`w-4 h-4 shrink-0 ${headingAccent}`} aria-hidden="true" />
                      <span>{CONTACT_INFO.phoneDisplay}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={CONTACT_INFO.whatsappGeneralHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackWhatsAppClick(activePath, 'footer')}
                      className="inline-flex items-center gap-2 font-bold tabular-nums text-[#002147] hover:text-[#147A3E]"
                    >
                      <MessageCircle
                        className="w-4 h-4 shrink-0 text-[#147A3E]"
                        aria-hidden="true"
                      />
                      <span>Mimo: {CONTACT_INFO.whatsappNumber}</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={CONTACT_INFO.emailHref}
                      className="inline-flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm text-slate-700 hover:text-[#0F76BB]"
                    >
                      <Mail className={`w-4 h-4 shrink-0 ${headingAccent}`} aria-hidden="true" />
                      <span>{CONTACT_INFO.email}</span>
                    </a>
                  </li>
                  <li className="pt-0.5">
                    <a
                      href="/contacto"
                      onClick={(e) => onNavigate('/contacto', e)}
                      className={`text-xs font-bold hover:underline ${headingAccent}`}
                    >
                      Contacto, horarios y formulario →
                    </a>
                  </li>
                </ul>
              </div>

              {/* Redes Sociales Oficiales */}
              <div className={`pt-3 border-t space-y-2 ${dividerBorder}`}>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  Síguenos en redes
                </p>
                <div className="flex items-center gap-2.5">
                  <a
                    href={CONTACT_INFO.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram oficial de Tintorería Mimos Navia"
                    className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md hover:scale-105 hover:opacity-95 transition-all"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href={CONTACT_INFO.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook oficial de Tintorería Mimos"
                    className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-md hover:scale-105 hover:opacity-95 transition-all"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href={CONTACT_INFO.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Canal oficial de YouTube de Tintorería Mimos (@tintoreriamimosnavias.l.1658)"
                    className="w-11 h-11 rounded-full bg-[#FF0000] flex items-center justify-center text-white shadow-md hover:scale-105 hover:opacity-95 transition-all"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a
                    href={CONTACT_INFO.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn oficial de Tintorería Mimos Navia, S.L."
                    className="w-11 h-11 rounded-full bg-[#0A66C2] flex items-center justify-center text-white shadow-md hover:scale-105 hover:opacity-95 transition-all"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className={`pt-3 border-t space-y-2 ${dividerBorder}`}>
                <p className={`text-xs font-bold uppercase tracking-wider ${headingNeutral}`}>
                  Colaboraciones y empleo
                </p>
                <ul className="space-y-1 text-xs">
                  <li>
                    <a
                      href="/se-punto-colaborador"
                      onClick={(e) => onNavigate('/se-punto-colaborador', e)}
                      className="inline-flex items-center min-h-[44px] md:min-h-0 transition-colors font-bold text-[#0C65A1] hover:text-[#002147]"
                    >
                      Sé Punto Colaborador →
                    </a>
                  </li>
                  <li>
                    <a
                      href="/empleo-unete-a-nosotros"
                      onClick={(e) => onNavigate('/empleo-unete-a-nosotros', e)}
                      className="inline-flex items-center min-h-[44px] md:min-h-0 transition-colors font-medium text-slate-600 hover:text-[#002147]"
                    >
                      Empleo (Únete a nosotros)
                    </a>
                  </li>
                  <li>
                    <a
                      href="/feder"
                      onClick={(e) => onNavigate('/feder', e)}
                      className="inline-flex items-center min-h-[44px] md:min-h-0 transition-colors font-medium text-slate-600 hover:text-[#0F76BB]"
                    >
                      FEDER (Re-Acciona TIC)
                    </a>
                  </li>
                  <li>
                    <a
                      href="/programa-bono-energia-peme-2025-in417z"
                      onClick={(e) => onNavigate('/programa-bono-energia-peme-2025-in417z', e)}
                      className="inline-flex items-center min-h-[44px] md:min-h-0 transition-colors font-medium text-slate-600 hover:text-[#0F76BB]"
                    >
                      Bono Energía Peme 2025: IN417Z
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Barra Legal limpia en una línea, con margen derecho para no coincidir con el botón flotante de Mimo */}
          <div className="pt-6 md:pr-64 lg:pr-72 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
            <p>
              © {new Date().getFullYear()} {CONTACT_INFO.legalName} Todos los derechos reservados.
            </p>

            <nav aria-label="Enlaces legales" className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              <a
                href="/aviso-legal"
                onClick={(e) => onNavigate('/aviso-legal', e)}
                className="inline-flex items-center min-h-[44px] md:min-h-0 underline-offset-4 hover:underline whitespace-nowrap hover:text-[#002147]"
              >
                Aviso legal
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/privacidad"
                onClick={(e) => onNavigate('/privacidad', e)}
                className="inline-flex items-center min-h-[44px] md:min-h-0 underline-offset-4 hover:underline whitespace-nowrap hover:text-[#002147]"
              >
                Política de privacidad
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/cookies"
                onClick={(e) => onNavigate('/cookies', e)}
                className="inline-flex items-center min-h-[44px] md:min-h-0 underline-offset-4 hover:underline whitespace-nowrap hover:text-[#002147]"
              >
                Política de cookies
              </a>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={onOpenCookieSettings}
                className="inline-flex items-center min-h-[44px] md:min-h-0 underline-offset-4 hover:underline cursor-pointer whitespace-nowrap hover:text-[#002147]"
              >
                Gestionar cookies
              </button>
            </nav>
          </div>
        </div>
      </footer>

      {/* Barra Inferior Fija en Móvil: 4 Accesos Rápidos (Llamar, WhatsApp, Mimo, Puntos Mimos) */}
      <nav
        aria-label="Accesos rápidos en móvil"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t px-1.5 pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] grid grid-cols-4 gap-1 bg-white/95 backdrop-blur-xs border-slate-200 shadow-[0_-8px_24px_-8px_rgba(0,33,71,0.12)]"
      >
        <a
          href={CONTACT_INFO.phoneHref}
          onClick={() => trackPhoneClick(activePath, 'mobile_bar')}
          className="flex items-center justify-center gap-1 min-h-[46px] py-2 px-1 rounded-lg text-[11px] font-bold tabular-nums bg-[#EDF5FD] text-[#002147] border border-[#002147]/15 whitespace-nowrap"
        >
          <Phone className={`w-3.5 h-3.5 shrink-0 ${headingAccent}`} aria-hidden="true" />
          <span>Llamar</span>
        </a>

        <a
          href={CONTACT_INFO.whatsappGeneralHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick(activePath, 'mobile_bar')}
          className="flex items-center justify-center gap-1 min-h-[46px] py-2 px-1 rounded-lg bg-[#1FA855] hover:bg-[#25B860] text-[#002147] text-[11px] font-bold transition-colors whitespace-nowrap"
        >
          <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>

        <button
          ref={mimoTriggerRef}
          type="button"
          onClick={() => onToggleMimo?.()}
          aria-haspopup="dialog"
          aria-expanded={mimoOpen}
          aria-label="Abrir asistente Mimo"
          className={`flex items-center justify-center gap-1 min-h-[46px] py-2 px-1 rounded-lg border text-[11px] font-bold transition-colors cursor-pointer whitespace-nowrap ${
            mimoOpen
              ? 'bg-[#002147] text-white border-[#002147]'
              : 'bg-white text-[#002147] border-slate-300 hover:bg-[#EDF5FD]'
          }`}
        >
          <img
            src={IMAGES.logoMimos}
            alt=""
            aria-hidden="true"
            width={16}
            height={16}
            className="w-4 h-4 rounded-full bg-[#EDF5FD] shrink-0"
          />
          <span>Mimo</span>
        </button>

        <a
          href="/puntos-mimos"
          onClick={(e) => onNavigate('/puntos-mimos', e)}
          aria-label="Puntos Mimos"
          className="flex items-center justify-center gap-1 min-h-[46px] py-2 px-1 rounded-lg bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-[11px] font-bold transition-colors whitespace-nowrap"
        >
          <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>Puntos</span>
        </a>
      </nav>
    </>
  );
};
