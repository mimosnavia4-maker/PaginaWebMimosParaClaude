import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageCircle, ChevronDown } from 'lucide-react';
import {
  CONTACT_INFO,
  IMAGES,
  SERVICIOS_MIMOS,
  ZONAS_SEO_LOCAL,
} from '../data/mimosData';

interface HeaderProps {
  currentPath: string;
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Servicios', href: '/#servicios' },
    { label: 'Limpieza profesional', href: '/limpieza-profesional-vigo' },
    { label: 'Puntos Mimos', href: '/puntos-mimos' },
    { label: 'Apartamentos y empresas', href: '/limpieza-apartamentos-turisticos-vigo' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contacto', href: '/contacto' },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileMenuOpen(false);
    onNavigate(href, e);
  };

  return (
    <header className="sticky top-0 z-40 h-20 bg-[#002147] text-white border-b border-white/10">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#0F76BB] focus:text-white focus:font-extrabold focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        Saltar al contenido principal
      </a>
      <div className="max-w-7xl mx-auto h-full px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-3">
        {/* Brand Identity */}
        <a
          href="/"
          onClick={(e) => handleNavClick('/', e)}
          className="flex items-center gap-2 sm:gap-2.5 xl:gap-3 group shrink-0"
          aria-label="Tintorería Mimos Navia – Ir a inicio"
        >
          <img
            src={IMAGES.logoMimos}
            alt="Logotipo del osito de Tintorería Mimos"
            width={44}
            height={44}
            className="w-8 h-8 sm:w-10 sm:h-10 xl:w-11 xl:h-11 rounded-full object-contain bg-white/10 p-0.5 shrink-0"
          />
          <div className="flex flex-col shrink-0">
            <span className="text-[14px] min-[375px]:text-[15px] sm:text-lg xl:text-xl font-extrabold tracking-tight leading-none text-white whitespace-nowrap">
              TINTORERÍA <span className="text-[#60B5F6]">MIMOS</span>
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-300 mt-1 leading-none whitespace-nowrap">
              <span className="sm:hidden">Navia · Vigo</span>
              <span className="hidden sm:inline xl:hidden 2xl:inline">
                Navia · Vigo · Limpieza y Cuidado Textil
              </span>
              <span className="hidden xl:inline 2xl:hidden">
                Navia · Vigo · Cuidado Textil
              </span>
            </span>
          </div>
        </a>

        {/* Primary Desktop Navigation */}
        <nav aria-label="Navegación principal" className="hidden xl:flex items-center gap-3.5 2xl:gap-5 shrink-0">
          {/* Dropdown for Services */}
          <div className="relative group">
            <a
              href="/#servicios"
              onClick={(e) => handleNavClick('/#servicios', e)}
              className="inline-flex items-center gap-1 text-[13px] 2xl:text-sm font-semibold text-slate-200 hover:text-white transition-colors py-2 whitespace-nowrap"
            >
              <span>Servicios</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#60B5F6]" aria-hidden="true" />
            </a>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute left-0 top-full pt-1 w-72 z-50">
              <div className="rounded-xl bg-[#002147] border border-white/15 shadow-2xl p-2 space-y-0.5">
                <a
                  href="/limpieza-alfombras-vigo"
                  onClick={(e) => handleNavClick('/limpieza-alfombras-vigo', e)}
                  className="block px-3 py-2 rounded-lg text-xs font-extrabold text-[#60B5F6] bg-white/5 hover:bg-[#0F76BB] hover:text-white transition-colors mb-1"
                >
                  ★ Limpieza y reparación de alfombras
                </a>
                <a
                  href="/arreglos-de-ropa-vigo"
                  onClick={(e) => handleNavClick('/arreglos-de-ropa-vigo', e)}
                  className="block px-3 py-2 rounded-lg text-xs font-extrabold text-[#60B5F6] bg-white/5 hover:bg-[#0F76BB] hover:text-white transition-colors mb-1"
                >
                  ★ Costura y arreglos de ropa
                </a>
                {SERVICIOS_MIMOS.map((srv) => (
                  <a
                    key={srv.id}
                    href={srv.url}
                    onClick={(e) => handleNavClick(srv.url, e)}
                    className="block px-3 py-2 rounded-lg text-xs font-semibold text-slate-200 hover:bg-[#0F76BB] hover:text-white transition-colors"
                  >
                    {srv.index}. {srv.titulo}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {navLinks.slice(1).map((link) => {
            const isActive =
              currentPath === link.href ||
              (link.href !== '/' && currentPath.startsWith(link.href));
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className={`text-[13px] 2xl:text-sm font-semibold transition-colors whitespace-nowrap ${
                  isActive
                    ? 'text-[#60B5F6] underline underline-offset-8'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Direct Contact & Mimo Action Zone */}
        <div className="hidden md:flex items-center gap-2 2xl:gap-3 shrink-0">
          <a
            href={CONTACT_INFO.phoneHref}
            className="inline-flex items-center gap-1.5 text-[13px] 2xl:text-sm font-semibold text-slate-200 hover:text-white transition-colors tabular-nums px-2 py-2 rounded-lg hover:bg-white/5 whitespace-nowrap"
            aria-label={`Llamar por teléfono al ${CONTACT_INFO.phoneDisplay}`}
          >
            <Phone className="w-4 h-4 text-[#60B5F6] shrink-0" aria-hidden="true" />
            <span>{CONTACT_INFO.phoneDisplay}</span>
          </a>

          <a
            href={CONTACT_INFO.whatsappGeneralHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 2xl:gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-[13px] 2xl:text-sm px-3 2xl:px-4 py-2 2xl:py-2.5 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Hablar con Mimo</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex xl:hidden items-center gap-1.5 sm:gap-2 shrink-0">

          <a
            href={CONTACT_INFO.whatsappGeneralHref}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden inline-flex items-center gap-1.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-xs px-2.5 sm:px-3 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0"
            aria-label="Hablar con Mimo por WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="min-[430px]:hidden">Mimo</span>
            <span className="hidden min-[430px]:inline">Hablar con Mimo</span>
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-1.5 sm:p-2 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="xl:hidden bg-[#002147] border-b border-white/15 px-4 pt-3 pb-6 space-y-3 shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto"
        >
          <nav aria-label="Navegación móvil" className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(link.href, e)}
                className="px-3 py-2.5 rounded-lg text-base font-semibold text-slate-100 hover:bg-white/10 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/empleo-unete-a-nosotros"
              onClick={(e) => handleNavClick('/empleo-unete-a-nosotros', e)}
              className="px-3 py-2.5 rounded-lg text-base font-semibold text-[#60B5F6] hover:bg-white/10 transition-colors"
            >
              Empleo (Únete a nosotros)
            </a>
          </nav>

          {/* Direct Links to the Core Services + Alfombras */}
          <div className="pt-2 border-t border-white/10 px-3">
            <p className="text-xs font-mono uppercase tracking-wider text-[#60B5F6] mb-2">
              Servicios de Tintorería y Lavandería
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              <a
                href="/limpieza-alfombras-vigo"
                onClick={(e) => handleNavClick('/limpieza-alfombras-vigo', e)}
                className="px-2.5 py-1.5 rounded-md bg-[#0F76BB] text-xs font-extrabold text-white transition-colors sm:col-span-2"
              >
                ★ Limpieza y reparación de alfombras
              </a>
              <a
                href="/arreglos-de-ropa-vigo"
                onClick={(e) => handleNavClick('/arreglos-de-ropa-vigo', e)}
                className="px-2.5 py-1.5 rounded-md bg-[#0F76BB] text-xs font-extrabold text-white transition-colors sm:col-span-2"
              >
                ★ Costura y arreglos de ropa en Vigo y puntos
              </a>
              {SERVICIOS_MIMOS.map((srv) => (
                <a
                  key={srv.id}
                  href={srv.url}
                  onClick={(e) => handleNavClick(srv.url, e)}
                  className="px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-white/15 text-xs font-semibold text-white transition-colors"
                >
                  {srv.index}. {srv.titulo}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Localities Links */}
          <div className="pt-2 border-t border-white/10 px-3">
            <p className="text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
              Tiendas y Puntos por Localidad
            </p>
            <div className="flex flex-wrap gap-1.5">
              {ZONAS_SEO_LOCAL.map((z) => (
                <a
                  key={z.slug}
                  href={z.url}
                  onClick={(e) => handleNavClick(z.url, e)}
                  className="px-2.5 py-1.5 rounded-md bg-white/10 hover:bg-[#0F76BB] text-xs font-semibold text-white transition-colors"
                >
                  {z.localidad}
                </a>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            <a
              href={CONTACT_INFO.phoneHref}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/10 text-white font-semibold text-sm tabular-nums"
            >
              <Phone className="w-4 h-4 text-[#60B5F6]" aria-hidden="true" />
              <span>Llamar al {CONTACT_INFO.phoneDisplay}</span>
            </a>
            <a
              href={CONTACT_INFO.whatsappGeneralHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Hablar con Mimo por WhatsApp ({CONTACT_INFO.whatsappNumber})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
