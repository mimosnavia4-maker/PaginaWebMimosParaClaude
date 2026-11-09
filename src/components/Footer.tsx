import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Sun, Moon } from 'lucide-react';
import {
  CONTACT_INFO,
  IMAGES,
  SERVICIOS_MIMOS,
  TIENDAS_PROPIAS,
  ZONAS_SEO_LOCAL,
  ARTICULOS_BLOG,
} from '../data/mimosData';
import { trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';

interface FooterProps {
  currentPath?: string;
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  onOpenCookieSettings: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentPath,
  onNavigate,
  onOpenCookieSettings,
  darkMode,
  onToggleDarkMode,
}) => {
  const activePath = currentPath || (typeof window !== 'undefined' ? window.location.pathname : '/');
  return (
    <>
      <footer className="bg-[#002147] text-slate-300 pt-14 pb-36 md:pb-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Brand & 3 Own Stores in Vigo (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={IMAGES.logoMimos}
                  alt="Logotipo de Tintorería Mimos Navia"
                  width={42}
                  height={42}
                  className="w-10.5 h-10.5 rounded-full object-contain bg-white/10 p-0.5"
                />
                <div>
                  <p className="text-lg font-extrabold text-white leading-none">
                    TINTORERÍA <span className="text-[#60B5F6]">MIMOS</span>
                  </p>
                  <p className="text-xs text-slate-300 mt-1">{CONTACT_INFO.legalName}</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Especialistas en tintorería, lavandería, planchado, cuidado de textiles del hogar y servicios de limpieza profesional para particulares, apartamentos turísticos y empresas en Vigo.
              </p>

              <div className="space-y-2 text-xs text-slate-300 pt-1">
                <p className="font-mono uppercase tracking-wider text-[#60B5F6] font-bold">
                  Nuestras {TIENDAS_PROPIAS.length} tiendas propias en Vigo:
                </p>
                {TIENDAS_PROPIAS.map((t) => (
                  <p key={t.id}>
                    <strong className="text-white">{t.direccion}</strong> ({t.codigo_postal} {t.localidad}) ·{' '}
                    {t.horario.resumen} · Tel. {t.telefonos_mostrados}
                  </p>
                ))}
              </div>
            </div>

            {/* Los 8 Servicios y Limpieza (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Servicios en Vigo
              </h2>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <a
                    href="/limpieza-alfombras-vigo"
                    onClick={(e) => onNavigate('/limpieza-alfombras-vigo', e)}
                    className="text-[#60B5F6] font-extrabold hover:underline"
                  >
                    ★ Limpieza y reparación de alfombras
                  </a>
                </li>
                <li>
                  <a
                    href="/arreglos-de-ropa-vigo"
                    onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                    className="text-[#60B5F6] font-extrabold hover:underline"
                  >
                    ★ Costura y arreglos de ropa
                  </a>
                </li>
                {SERVICIOS_MIMOS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.url}
                      onClick={(e) => onNavigate(s.url, e)}
                      className="hover:text-white transition-colors"
                    >
                      {s.index}. {s.titulo}
                    </a>
                  </li>
                ))}
                <li className="pt-1">
                  <a
                    href="/limpieza-profesional-vigo"
                    onClick={(e) => onNavigate('/limpieza-profesional-vigo', e)}
                    className="text-[#60B5F6] font-bold hover:underline"
                  >
                    Empresa de Limpieza Profesional en Vigo →
                  </a>
                </li>
              </ul>
            </div>

            {/* Red de Puntos y Guías del Blog (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Tiendas y Puntos por Localidad
              </h2>
              <ul className="space-y-1.5 text-xs sm:text-sm">
                <li>
                  <a
                    href="/puntos-mimos"
                    onClick={(e) => onNavigate('/puntos-mimos', e)}
                    className="text-[#60B5F6] font-bold hover:underline"
                  >
                    Buscador de Tiendas y Puntos Mimos
                  </a>
                </li>
                {ZONAS_SEO_LOCAL.map((zona) => (
                  <li key={zona.slug}>
                    <a
                      href={zona.url}
                      onClick={(e) => onNavigate(zona.url, e)}
                      className="hover:text-white transition-colors"
                    >
                      {zona.localidad} ({zona.comarca})
                    </a>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-white/10">
                <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                  Guías de cuidado textil
                </p>
                <ul className="space-y-1.5 text-xs">
                  {ARTICULOS_BLOG.map((art) => (
                    <li key={art.slug}>
                      <a
                        href={art.url}
                        onClick={(e) => onNavigate(art.url, e)}
                        className="hover:text-[#60B5F6] transition-colors line-clamp-1"
                      >
                        • {art.titulo}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Contacto y Tema Visual (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Contacto y Mimo
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li>
                  <a
                    href={CONTACT_INFO.phoneHref}
                    onClick={() => trackPhoneClick(activePath, 'footer')}
                    className="inline-flex items-center gap-2 hover:text-white tabular-nums font-bold"
                  >
                    <Phone className="w-4 h-4 text-[#60B5F6] shrink-0" aria-hidden="true" />
                    <span>{CONTACT_INFO.phoneDisplay}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT_INFO.whatsappGeneralHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick(activePath, 'footer')}
                    className="inline-flex items-center gap-2 hover:text-white font-bold"
                  >
                    <MessageCircle className="w-4 h-4 text-[#4ade80] shrink-0" aria-hidden="true" />
                    <span>Mimo: {CONTACT_INFO.whatsappNumber}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT_INFO.emailHref}
                    className="inline-flex items-center gap-2 hover:text-white break-all"
                  >
                    <Mail className="w-4 h-4 text-[#60B5F6] shrink-0" aria-hidden="true" />
                    <span>{CONTACT_INFO.email}</span>
                  </a>
                </li>
              </ul>

              {/* Redes Sociales Oficiales */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Síguenos en redes
                </p>
                <div className="flex items-center gap-2.5">
                  <a
                    href={CONTACT_INFO.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram oficial de Tintorería Mimos Navia"
                    className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white shadow-md hover:scale-110 hover:opacity-95 transition-all"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href={CONTACT_INFO.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook oficial de Tintorería Mimos"
                    className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-md hover:scale-110 hover:opacity-95 transition-all"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a
                    href={CONTACT_INFO.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn oficial de Tintorería Mimos Navia, S.L."
                    className="w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center text-white shadow-md hover:scale-110 hover:opacity-95 transition-all"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2">
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  Colaboraciones y Empleo
                </p>
                <ul className="space-y-1.5 text-xs">
                  <li>
                    <a
                      href="/se-punto-colaborador"
                      onClick={(e) => onNavigate('/se-punto-colaborador', e)}
                      className="text-[#60B5F6] hover:text-white transition-colors font-bold"
                    >
                      ★ Sé Punto Colaborador
                    </a>
                  </li>
                  <li>
                    <a
                      href="/empleo-unete-a-nosotros"
                      onClick={(e) => onNavigate('/empleo-unete-a-nosotros', e)}
                      className="text-slate-300 hover:text-white transition-colors font-semibold"
                    >
                      • Empleo (Únete a nosotros)
                    </a>
                  </li>
                  <li>
                    <a
                      href="/feder"
                      onClick={(e) => onNavigate('/feder', e)}
                      className="text-slate-300 hover:text-[#60B5F6] transition-colors font-semibold"
                    >
                      • FEDER (Re-Acciona TIC)
                    </a>
                  </li>
                  <li>
                    <a
                      href="/programa-bono-energia-peme-2025-in417z"
                      onClick={(e) => onNavigate('/programa-bono-energia-peme-2025-in417z', e)}
                      className="text-slate-300 hover:text-[#60B5F6] transition-colors font-semibold"
                    >
                      • Programa Bono Energía Peme 2025: IN417Z
                    </a>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onToggleDarkMode}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/15 hover:border-white/40 text-xs font-bold text-white transition-colors cursor-pointer"
                >
                  {darkMode ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-400" aria-hidden="true" />
                      <span>Modo claro</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-[#60B5F6]" aria-hidden="true" />
                      <span>Modo oscuro</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Enlaces Legales, Empleo, Subvenciones y Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              © {new Date().getFullYear()} {CONTACT_INFO.legalName} Todos los derechos reservados.
            </p>

            <nav aria-label="Enlaces legales e institucionales" className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a
                href="/empleo-unete-a-nosotros"
                onClick={(e) => onNavigate('/empleo-unete-a-nosotros', e)}
                className="text-slate-300 hover:text-white font-semibold underline-offset-4 hover:underline"
              >
                Empleo (Únete a nosotros)
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/feder"
                onClick={(e) => onNavigate('/feder', e)}
                className="text-slate-300 hover:text-white font-semibold underline-offset-4 hover:underline"
              >
                FEDER
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/programa-bono-energia-peme-2025-in417z"
                onClick={(e) => onNavigate('/programa-bono-energia-peme-2025-in417z', e)}
                className="text-slate-300 hover:text-white font-semibold underline-offset-4 hover:underline"
              >
                Programa Bono Energía Peme 2025: IN417Z
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/aviso-legal"
                onClick={(e) => onNavigate('/aviso-legal', e)}
                className="hover:text-white underline-offset-4 hover:underline"
              >
                Aviso legal
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/privacidad"
                onClick={(e) => onNavigate('/privacidad', e)}
                className="hover:text-white underline-offset-4 hover:underline"
              >
                Política de privacidad
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="/cookies"
                onClick={(e) => onNavigate('/cookies', e)}
                className="hover:text-white underline-offset-4 hover:underline"
              >
                Política de cookies
              </a>
              <span aria-hidden="true">·</span>
              <button
                type="button"
                onClick={onOpenCookieSettings}
                className="hover:text-white underline-offset-4 hover:underline cursor-pointer"
              >
                Gestionar cookies
              </button>
            </nav>
          </div>
        </div>
      </footer>

      {/* Barra Inferior Fija en Móvil: 3 Accesos Rápidos (Llamar, WhatsApp Mimo, Puntos Mimos — Sección 8 del Plan Maestro) */}
      <nav
        aria-label="Accesos rápidos en móvil"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#002147] border-t border-white/15 px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] grid grid-cols-3 gap-1.5 shadow-2xl"
      >
        <a
          href={CONTACT_INFO.phoneHref}
          onClick={() => trackPhoneClick(activePath, 'mobile_bar')}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg bg-white/10 text-white text-xs font-bold tabular-nums"
        >
          <Phone className="w-3.5 h-3.5 text-[#60B5F6] shrink-0" aria-hidden="true" />
          <span>Llamar</span>
        </a>

        <a
          href={CONTACT_INFO.whatsappGeneralHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick(activePath, 'mobile_bar')}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg bg-[#178A47] text-white text-xs font-bold"
        >
          <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>

        <a
          href="/puntos-mimos"
          onClick={(e) => onNavigate('/puntos-mimos', e)}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg bg-[#0F76BB] text-white text-xs font-bold"
        >
          <MapPin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>Puntos Mimos</span>
        </a>
      </nav>
    </>
  );
};
