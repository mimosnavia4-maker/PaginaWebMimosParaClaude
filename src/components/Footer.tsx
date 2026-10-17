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

interface FooterProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
  onOpenCookieSettings: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenCookieSettings,
  darkMode,
  onToggleDarkMode,
}) => {
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

              <div className="pt-3 border-t border-white/10 space-y-2">
                <p className="text-xs font-bold text-white uppercase tracking-wider">
                  Trabaja con nosotros y Ayudas
                </p>
                <ul className="space-y-1.5 text-xs">
                  <li>
                    <a
                      href="/empleo-unete-a-nosotros"
                      onClick={(e) => onNavigate('/empleo-unete-a-nosotros', e)}
                      className="text-[#60B5F6] hover:text-white transition-colors font-bold"
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
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#002147] border-t border-white/15 px-2 py-2 grid grid-cols-3 gap-1.5 shadow-2xl"
      >
        <a
          href={CONTACT_INFO.phoneHref}
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg bg-white/10 text-white text-xs font-bold tabular-nums"
        >
          <Phone className="w-3.5 h-3.5 text-[#60B5F6] shrink-0" aria-hidden="true" />
          <span>Llamar</span>
        </a>

        <a
          href={CONTACT_INFO.whatsappGeneralHref}
          target="_blank"
          rel="noopener noreferrer"
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
