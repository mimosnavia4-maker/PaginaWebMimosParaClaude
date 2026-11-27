import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Store,
  MapPin,
  CheckCircle2,
  Receipt,
  Package,
} from 'lucide-react';
import {
  CONTACT_INFO,
  IMAGES,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';
import { Dialog } from './Dialog';

interface HeaderProps {
  currentPath: string;
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

type ActiveMegaMenu = 'tintoreria' | 'limpieza' | 'apartamentos' | 'puntos' | 'alfombras' | null;

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
}) => {
  const [activeMenu, setActiveMenu] = useState<ActiveMegaMenu>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const menuCloseTimeoutRef = useRef<number | null>(null);
  const trackingLinkRef = useRef<HTMLAnchorElement | null>(null);
  const orderInputRef = useRef<HTMLInputElement | null>(null);
  const mobileMenuBtnRef = useRef<HTMLButtonElement | null>(null);
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);
  const mobileCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const skipMobileRestoreFocusRef = useRef(false);

  const trackingWhatsAppUrl = buildMimoWhatsAppUrl(
    orderNumber.trim()
      ? `Hola, Mimo. Quiero consultar el estado de mi encargo/ticket n.º ${orderNumber.trim()}: `
      : 'Hola, Mimo. Quiero consultar el estado de mi encargo o ticket oficial: '
  );

  // Limpieza defensiva de cualquier atributo de estilo residual
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.removeAttribute('data-mimos-style');
      try {
        localStorage.removeItem('mimos_visual_style');
      } catch {
        // safe storage
      }
    }
  }, []);

  // Cierre de menús con tecla Escape (el modal Dialog gestiona su propia pila Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        if (mobileMenuOpen && !isTrackingModalOpen) {
          setMobileMenuOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, isTrackingModalOpen]);

  // Gestión de foco accesible, bloqueo de scroll y trampa de tabulación para el drawer móvil
  useEffect(() => {
    if (!mobileMenuOpen) return;

    skipMobileRestoreFocusRef.current = false;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      mobileCloseBtnRef.current?.focus();
    }, 40);

    const handleDrawerTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !mobileDrawerRef.current) return;
      const focusables = mobileDrawerRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;

      const firstEl = focusables[0];
      const lastEl = focusables[focusables.length - 1];
      const activeEl = document.activeElement;

      if (!mobileDrawerRef.current.contains(activeEl)) {
        e.preventDefault();
        (e.shiftKey ? lastEl : firstEl).focus();
        return;
      }

      if (e.shiftKey && activeEl === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && activeEl === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };

    window.addEventListener('keydown', handleDrawerTab);
    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleDrawerTab);
      document.body.style.overflow = originalOverflow;

      if (!skipMobileRestoreFocusRef.current) {
        const opener = mobileMenuBtnRef.current;
        if (opener && opener.isConnected) {
          opener.focus();
        }
      }
    };
  }, [mobileMenuOpen]);

  // Enfocar campo de resguardo al abrir el modal de seguimiento tras montar Dialog
  useEffect(() => {
    if (!isTrackingModalOpen) return;
    const timer = window.setTimeout(() => {
      orderInputRef.current?.focus();
    }, 65);
    return () => window.clearTimeout(timer);
  }, [isTrackingModalOpen]);

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setActiveMenu(null);
    if (mobileMenuOpen) {
      skipMobileRestoreFocusRef.current = true;
      setMobileMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  const handleMouseEnterMenu = (menu: ActiveMegaMenu) => {
    if (menuCloseTimeoutRef.current) {
      clearTimeout(menuCloseTimeoutRef.current);
      menuCloseTimeoutRef.current = null;
    }
    setActiveMenu(menu);
  };

  const handleMouseLeaveMenu = () => {
    if (menuCloseTimeoutRef.current) {
      clearTimeout(menuCloseTimeoutRef.current);
    }
    menuCloseTimeoutRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  const handleLinkClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    setActiveMenu(null);
    if (mobileMenuOpen) {
      skipMobileRestoreFocusRef.current = true;
      setMobileMenuOpen(false);
    }
    onNavigate(href, e);
  };

  const whatsappConsultarPedidoUrl = buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero consultar el estado de mi encargo/ticket n.º: '
  );

  return (
    <>
      {/* Estilos CSS embebidos para animación de caída suave tipo telón */}
      <style>{`
        @keyframes curtainDrop {
          0% {
            opacity: 0;
            transform: translateY(-12px) scaleY(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scaleY(1);
          }
        }
        .animate-curtain-drop {
          animation: curtainDrop 220ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform-origin: top center;
        }
      `}</style>

      {/* Enlace accesible para saltar directamente al contenido principal con Tab */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-[#002147] focus:text-white focus:text-sm focus:font-bold focus:shadow-lg focus:ring-2 focus:ring-[#60B5F6]"
      >
        Saltar al contenido principal
      </a>

      {/* Cabecera Principal Sticky */}
      <header
        className="sticky top-0 z-50 select-none bg-white/95 backdrop-blur-xs text-[#002147] border-b border-slate-200 shadow-xs"
        onMouseLeave={handleMouseLeaveMenu}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5 sm:py-3 gap-3 lg:gap-5">
            {/* =========================================================================
                1. BLOQUE IZQUIERDO (Identidad y Marca a doble altura)
                ========================================================================= */}
            <div className="flex items-center shrink-0">
              <a
                href="/"
                onClick={(e) => handleLinkClick('/', e)}
                className="flex items-center gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F76BB] rounded-xl pr-1"
                aria-label="Tintorería Mimos - Volver a la portada principal"
              >
                <img
                  src={IMAGES.logoMimos}
                  alt="Tintorería Mimos Navia"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain rounded-full p-1 shrink-0 group-hover:scale-105 transition-transform bg-[#EDF5FD] border border-[#002147]/10"
                />
                <div className="flex flex-col">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight leading-tight text-[#002147]">
                    TINTORERÍA{' '}
                    <span className="text-[#0C65A1]">
                      MIMOS
                    </span>
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium tracking-wider uppercase text-slate-600">
                    Navia · Vigo · Cuidado Textil
                  </span>
                </div>
              </a>
            </div>

            {/* =========================================================================
                2. BLOQUE CENTRAL (Matriz simétrica de navegación 4 x 2)
                4 Columnas milimétricamente alineadas en escritorio
                ========================================================================= */}
            <nav
              className="hidden lg:block flex-1 max-w-3xl mx-1"
              aria-label="Navegación principal estructurada"
            >
              <div className="grid grid-cols-4 gap-x-2 gap-y-1">
                {/* ----------------- FILA SUPERIOR: Servicios gancho directos y teléfono ----------------- */}
                {/* Columna 1 Superior: Costura y arreglos */}
                <div className="flex items-center justify-center">
                  <a
                    href="/arreglos-de-ropa-vigo"
                    onClick={(e) => handleLinkClick('/arreglos-de-ropa-vigo', e)}
                    onMouseEnter={() => setActiveMenu(null)}
                    className={`w-full text-center py-1 px-1.5 rounded-md transition-colors text-xs font-bold whitespace-nowrap ${
                      currentPath === '/arreglos-de-ropa-vigo'
                        ? 'bg-[#EDF5FD] text-[#0C65A1] font-extrabold'
                        : 'text-slate-700 hover:text-[#0F76BB] hover:bg-[#EDF5FD]'
                    }`}
                    title="Taller propio de costura y arreglos de ropa en Vigo"
                  >
                    Costura y arreglos
                  </a>
                </div>

                {/* Columna 2 Superior: Limpieza de sofás */}
                <div className="flex items-center justify-center">
                  <a
                    href="/limpieza-sofas-vigo"
                    onClick={(e) => handleLinkClick('/limpieza-sofas-vigo', e)}
                    onMouseEnter={() => setActiveMenu(null)}
                    className={`w-full text-center py-1 px-1.5 rounded-md transition-colors text-xs font-bold whitespace-nowrap ${
                      currentPath === '/limpieza-sofas-vigo'
                        ? 'bg-[#EDF5FD] text-[#0C65A1] font-extrabold'
                        : 'text-slate-700 hover:text-[#0F76BB] hover:bg-[#EDF5FD]'
                    }`}
                    title="Limpieza profesional de sofás, sillones y tapicerías a domicilio en Vigo"
                  >
                    Limpieza de sofás
                  </a>
                </div>

                {/* Columna 3 Superior: Desplegable Alfombras (limpieza y arreglos) */}
                <div className="flex items-center justify-center">
                  <a
                    href="/limpieza-alfombras-vigo"
                    onClick={(e) => handleLinkClick('/limpieza-alfombras-vigo', e)}
                    onMouseEnter={() => handleMouseEnterMenu('alfombras')}
                    aria-expanded={activeMenu === 'alfombras'}
                    className={`w-full inline-flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg transition-all text-xs font-bold cursor-pointer border whitespace-nowrap ${
                      activeMenu === 'alfombras' ||
                      currentPath === '/limpieza-alfombras-vigo' ||
                      currentPath === '/reparacion-alfombras-vigo'
                        ? 'bg-[#EDF5FD] text-[#0C65A1] border-[#0F76BB]/25 shadow-xs'
                        : 'text-[#002147] hover:text-[#0F76BB] hover:bg-[#EDF5FD] border-transparent'
                    }`}
                  >
                    <span className="truncate">Alfombras</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                        activeMenu === 'alfombras'
                          ? 'rotate-180 text-[#0C65A1]'
                          : 'text-slate-600'
                      }`}
                    />
                  </a>
                </div>

                {/* Columna 4 Superior: Teléfono de contacto directo */}
                <div className="flex items-center justify-center">
                  <a
                    href={CONTACT_INFO.phoneHref}
                    onClick={() => trackPhoneClick(currentPath, 'header')}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-1 px-1.5 rounded-md transition-colors text-xs font-bold truncate text-[#002147] hover:text-[#0F76BB] hover:bg-[#EDF5FD]"
                    title="Llamar directamente a Tintorería Mimos Navia"
                  >
                    <Phone
                      className="w-3 h-3 shrink-0 text-[#0C65A1]"
                      aria-hidden="true"
                    />
                    <span className="font-mono tracking-tight">{CONTACT_INFO.phoneDisplay}</span>
                  </a>
                </div>

                {/* ----------------- FILA INFERIOR: Los 4 Desplegables Temáticos ----------------- */}
                {/* Columna 1 Inferior: Desplegable Tintorería y lavandería */}
                <div className="flex items-center justify-center">
                  <a
                    href="/#servicios"
                    onClick={(e) => handleLinkClick('/#servicios', e)}
                    onMouseEnter={() => handleMouseEnterMenu('tintoreria')}
                    aria-expanded={activeMenu === 'tintoreria'}
                    className={`w-full inline-flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg transition-all text-xs font-bold cursor-pointer border ${
                      activeMenu === 'tintoreria'
                        ? 'bg-[#EDF5FD] text-[#0C65A1] border-[#0F76BB]/25 shadow-xs'
                        : 'text-[#002147] hover:text-[#0F76BB] hover:bg-[#EDF5FD] border-transparent'
                    }`}
                  >
                    <span className="truncate">Tintorería y lavandería</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                        activeMenu === 'tintoreria'
                          ? 'rotate-180 text-[#0C65A1]'
                          : 'text-slate-600'
                      }`}
                    />
                  </a>
                </div>

                {/* Columna 2 Inferior: Desplegable Limpieza profesional */}
                <div className="flex items-center justify-center">
                  <a
                    href="/limpieza-profesional-vigo"
                    onClick={(e) => handleLinkClick('/limpieza-profesional-vigo', e)}
                    onMouseEnter={() => handleMouseEnterMenu('limpieza')}
                    aria-expanded={activeMenu === 'limpieza'}
                    className={`w-full inline-flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg transition-all text-xs font-bold cursor-pointer border ${
                      activeMenu === 'limpieza' || currentPath === '/limpieza-profesional-vigo'
                        ? 'bg-[#EDF5FD] text-[#0C65A1] border-[#0F76BB]/25 shadow-xs'
                        : 'text-[#002147] hover:text-[#0F76BB] hover:bg-[#EDF5FD] border-transparent'
                    }`}
                  >
                    <span className="truncate">Limpieza profesional</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                        activeMenu === 'limpieza'
                          ? 'rotate-180 text-[#0C65A1]'
                          : 'text-slate-600'
                      }`}
                    />
                  </a>
                </div>

                {/* Columna 3 Inferior: Desplegable Alojamientos turísticos */}
                <div className="flex items-center justify-center">
                  <a
                    href="/limpieza-apartamentos-turisticos-vigo"
                    onClick={(e) => handleLinkClick('/limpieza-apartamentos-turisticos-vigo', e)}
                    onMouseEnter={() => handleMouseEnterMenu('apartamentos')}
                    aria-expanded={activeMenu === 'apartamentos'}
                    className={`w-full inline-flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg transition-all text-xs font-bold cursor-pointer border ${
                      activeMenu === 'apartamentos' || currentPath === '/limpieza-apartamentos-turisticos-vigo'
                        ? 'bg-[#EDF5FD] text-[#0C65A1] border-[#0F76BB]/25 shadow-xs'
                        : 'text-[#002147] hover:text-[#0F76BB] hover:bg-[#EDF5FD] border-transparent'
                    }`}
                  >
                    <span className="truncate">Alojamientos turísticos</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                        activeMenu === 'apartamentos'
                          ? 'rotate-180 text-[#0C65A1]'
                          : 'text-slate-600'
                      }`}
                    />
                  </a>
                </div>

                {/* Columna 4 Inferior: Desplegable Puntos Mimos */}
                <div className="flex items-center justify-center">
                  <a
                    href="/puntos-mimos"
                    onClick={(e) => handleLinkClick('/puntos-mimos', e)}
                    onMouseEnter={() => handleMouseEnterMenu('puntos')}
                    aria-expanded={activeMenu === 'puntos'}
                    className={`w-full inline-flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg transition-all text-xs font-bold cursor-pointer border ${
                      activeMenu === 'puntos' || currentPath === '/puntos-mimos'
                        ? 'bg-[#EDF5FD] text-[#0C65A1] border-[#0F76BB]/25 shadow-xs'
                        : 'text-[#002147] hover:text-[#0F76BB] hover:bg-[#EDF5FD] border-transparent'
                    }`}
                  >
                    <span className="truncate">Puntos Mimos</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                        activeMenu === 'puntos'
                          ? 'rotate-180 text-[#0C65A1]'
                          : 'text-slate-600'
                      }`}
                    />
                  </a>
                </div>
              </div>
            </nav>

            {/* =========================================================================
                3. BLOQUE DERECHO (Botones de acción gemelos apilados en columna vertical)
                ========================================================================= */}
            <div className="hidden lg:flex flex-col gap-1.5 shrink-0 w-44">
              {/* Botón superior: Hablar con Mimo */}
              <a
                href={CONTACT_INFO.whatsappGeneralHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(currentPath, 'header_whatsapp_mimo')}
                className="w-full h-[32px] inline-flex items-center justify-center gap-1.5 bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-extrabold text-xs px-3 rounded-lg transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Hablar con Mimo</span>
              </a>

              {/* Botón inferior: Consultar pedido (Abre modal de seguimiento) */}
              <button
                type="button"
                onClick={() => setIsTrackingModalOpen(true)}
                className="w-full h-[32px] inline-flex items-center justify-center gap-1.5 border font-bold text-xs px-3 rounded-lg transition-colors cursor-pointer bg-[#EDF5FD] hover:bg-[#DCEBFA] border-[#002147]/15 text-[#002147]"
                title="Consultar el estado de tu encargo o ticket oficial"
              >
                <Package
                  className="w-3.5 h-3.5 shrink-0 text-[#0C65A1]"
                  aria-hidden="true"
                />
                <span>Consultar pedido</span>
              </button>
            </div>

            {/* Botonera para pantallas móviles / tablets (< lg) */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={CONTACT_INFO.whatsappGeneralHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(currentPath, 'header_mobile_icon')}
                className="hidden md:inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-lg bg-[#1FA855] hover:bg-[#25B860] text-[#002147] transition-colors"
                aria-label="WhatsApp con Mimo"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <button
                ref={mobileMenuBtnRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-xl transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F76BB] text-[#002147] hover:bg-[#EDF5FD]"
                aria-expanded={mobileMenuOpen}
                aria-label="Abrir menú de navegación"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            DESPLEGABLE 1: TINTORERÍA Y LAVANDERÍA (PANEL FLOTANTE 3 COLUMNAS)
            ========================================================================= */}
        {activeMenu === 'tintoreria' && (
          <div
            className="hidden lg:block absolute inset-x-0 top-full pt-2 px-6 z-50"
            onMouseEnter={() => handleMouseEnterMenu('tintoreria')}
            onMouseLeave={handleMouseLeaveMenu}
          >
            <div className="max-w-6xl mx-auto bg-white text-slate-800 rounded-2xl border border-slate-200/90 shadow-[0_24px_48px_-12px_rgba(0,33,71,0.22)] p-7 animate-curtain-drop">
              {/* Barra superior */}
              <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-200">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0F76BB]">
                  Tintorería, lavandería y cuidado textil en Vigo
                </span>
                <a
                  href="/#servicios"
                  onClick={(e) => handleLinkClick('/#servicios', e)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002147] hover:text-[#0F76BB] transition-colors"
                >
                  <span>Ver catálogo completo en portada</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Grid de 3 columnas iguales */}
              <div className="grid grid-cols-3 gap-7 items-start">
                {/* Columna 1: Prendas de vestir y sastrería */}
                <div className="pr-5 border-r border-slate-200/80">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#0F76BB] mb-2.5 px-2.5">
                    Prendas de vestir y sastrería
                  </p>
                  <ul className="space-y-1">
                    {[
                      {
                        title: 'Tintorería profesional',
                        desc: 'Trajes, abrigos, sedas y desmanchado técnico',
                        href: '/tintoreria-vigo',
                      },
                      {
                        title: 'Vestidos de novia y ceremonia',
                        desc: 'Novia, fiesta, comunión, bautizo y chaqués',
                        href: '/limpieza-vestidos-novia-ceremonia-vigo',
                      },
                      {
                        title: 'Planchado artesanal',
                        desc: 'Camisas en percha o dobladas sin brillos',
                        href: '/planchado-vigo',
                      },
                      {
                        title: 'Pieles, cuero y ante',
                        desc: 'Ante, nobuk, doble faz y peletería',
                        href: '/limpieza-pieles-cuero-vigo',
                      },
                    ].map((item) => {
                      const isActive = currentPath === item.href;
                      return (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            onClick={(e) => handleLinkClick(item.href, e)}
                            className={`group block px-2.5 py-2 rounded-xl transition-colors ${
                              isActive ? 'bg-[#EDF5FD]' : 'hover:bg-[#EDF5FD]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`text-sm font-extrabold transition-colors ${
                                  isActive
                                    ? 'text-[#0F76BB]'
                                    : 'text-[#002147] group-hover:text-[#0F76BB]'
                                }`}
                              >
                                {item.title}
                              </span>
                              <ArrowRight
                                className={`w-3.5 h-3.5 text-[#0F76BB] shrink-0 transition-all ${
                                  isActive
                                    ? 'opacity-100'
                                    : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                                }`}
                              />
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Columna 2: Hogar, lavandería y costura */}
                <div className="pr-5 border-r border-slate-200/80">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#0F76BB] mb-2.5 px-2.5">
                    Hogar, lavandería y costura
                  </p>
                  <ul className="space-y-1">
                    {[
                      {
                        title: 'Lavandería profesional atendida',
                        desc: 'Plumíferos, anoraks y ropa técnica sin monedas',
                        href: '/lavanderia-vigo',
                      },
                      {
                        title: 'Colada familiar y ropa diaria',
                        desc: 'Lavar y doblar o lavado con planchado combinado',
                        href: '/colada-familiar-vigo',
                      },
                      {
                        title: 'Edredones, mantas y cortinas',
                        desc: 'Plumas, colchas, estores y secado gran formato',
                        href: '/textiles-hogar-vigo',
                      },
                      {
                        title: 'Costura y arreglos de ropa',
                        desc: 'Taller in situ en Gregorio Espino y Venezuela',
                        href: '/arreglos-de-ropa-vigo',
                      },
                    ].map((item) => {
                      const isActive = currentPath === item.href;
                      return (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            onClick={(e) => handleLinkClick(item.href, e)}
                            className={`group block px-2.5 py-2 rounded-xl transition-colors ${
                              isActive ? 'bg-[#EDF5FD]' : 'hover:bg-[#EDF5FD]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`text-sm font-extrabold transition-colors ${
                                  isActive
                                    ? 'text-[#0F76BB]'
                                    : 'text-[#002147] group-hover:text-[#0F76BB]'
                                }`}
                              >
                                {item.title}
                              </span>
                              <ArrowRight
                                className={`w-3.5 h-3.5 text-[#0F76BB] shrink-0 transition-all ${
                                  isActive
                                    ? 'opacity-100'
                                    : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                                }`}
                              />
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Columna 3: Especialidades y recogida */}
                <div>
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-[#0F76BB] mb-2.5 px-2.5">
                    Especialidades y recogida
                  </p>
                  <ul className="space-y-1">
                    {[
                      {
                        title: 'Limpieza de alfombras',
                        desc: 'Lavado por fibra con secado anti-humedad',
                        href: '/limpieza-alfombras-vigo',
                      },
                      {
                        title: 'Reparación de alfombras',
                        desc: 'Flecos, ribetes, festón y bordes por especialista',
                        href: '/reparacion-alfombras-vigo',
                      },
                      {
                        title: 'Siniestros, humo e incendios',
                        desc: 'Prueba previa de viabilidad y factura con CIF',
                        href: '/limpieza-incendios-siniestros-vigo',
                      },
                      {
                        title: 'Recogida y entrega a domicilio',
                        desc: 'Vigo, comarca y polígonos según ruta y mínimo',
                        href: '/recogida-a-domicilio',
                      },
                    ].map((item) => {
                      const isActive = currentPath === item.href;
                      return (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            onClick={(e) => handleLinkClick(item.href, e)}
                            className={`group block px-2.5 py-2 rounded-xl transition-colors ${
                              isActive ? 'bg-[#EDF5FD]' : 'hover:bg-[#EDF5FD]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`text-sm font-extrabold transition-colors ${
                                  isActive
                                    ? 'text-[#0F76BB]'
                                    : 'text-[#002147] group-hover:text-[#0F76BB]'
                                }`}
                              >
                                {item.title}
                              </span>
                              <ArrowRight
                                className={`w-3.5 h-3.5 text-[#0F76BB] shrink-0 transition-all ${
                                  isActive
                                    ? 'opacity-100'
                                    : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                                }`}
                              />
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            DESPLEGABLE 2: LIMPIEZA PROFESIONAL (PANEL FLOTANTE 12 COLUMNAS)
            ========================================================================= */}
        {activeMenu === 'limpieza' && (
          <div
            className="hidden lg:block absolute inset-x-0 top-full pt-2 px-6 z-50"
            onMouseEnter={() => handleMouseEnterMenu('limpieza')}
            onMouseLeave={handleMouseLeaveMenu}
          >
            <div className="max-w-5xl mx-auto bg-white text-slate-800 rounded-2xl border border-slate-200/90 shadow-[0_24px_48px_-12px_rgba(0,33,71,0.22)] p-7 animate-curtain-drop">
              <div className="grid grid-cols-12 gap-8 items-start">
                {/* Bloque 1: Instalaciones y Sedes */}
                <div className="col-span-7 pr-6 border-r border-slate-200/80">
                  <div className="pb-3 mb-3 border-b border-slate-200">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0F76BB] block">
                      01 · Instalaciones y Sedes
                    </span>
                    <p className="text-base font-extrabold text-[#002147] mt-0.5">
                      Limpieza técnica de inmuebles en Vigo
                    </p>
                  </div>
                  <ul className="grid grid-cols-2 gap-x-5 gap-y-1.5">
                    {[
                      {
                        title: 'Limpieza de casas y pisos particulares',
                        desc: 'Mantenimiento periódico o puesta a punto en Vigo con personal en Régimen General y RC.',
                        url: '/limpieza-casas-vigo',
                      },
                      {
                        title: 'Limpieza de oficinas y despachos',
                        desc: 'Mantenimiento periódico adaptado a tu horario comercial.',
                        url: '/blog/limpieza-oficinas-despachos-clinicas-vigo',
                      },
                      {
                        title: 'Limpieza de comunidades de propietarios',
                        desc: 'Portales, escaleras y zonas comunes con personal de confianza.',
                        url: '/blog/limpieza-comunidades-propietarios-vigo',
                      },
                      {
                        title: 'Limpieza de locales comerciales',
                        desc: 'Aperturas, cristales, escaparates y mantenimiento continuo.',
                        url: '/limpieza-profesional-vigo',
                      },
                      {
                        title: 'Limpieza de clínicas y consultas',
                        desc: 'Protocolos de higiene y desinfección sanitaria estricta.',
                        url: '/blog/limpieza-oficinas-despachos-clinicas-vigo',
                      },
                      {
                        title: 'Espacios profesionales y empresariales',
                        desc: 'Contratos flexibles con facturación transparente para autónomos y pymes.',
                        url: '/limpieza-profesional-vigo',
                      },
                    ].map((item, idx) => {
                      const isActive = currentPath === item.url;
                      return (
                        <li key={idx}>
                          <a
                            href={item.url}
                            onClick={(e) => handleLinkClick(item.url, e)}
                            className={`group block p-2 rounded-xl transition-colors ${
                              isActive ? 'bg-[#EDF5FD]' : 'hover:bg-[#EDF5FD]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className={`text-xs font-extrabold transition-colors ${
                                  isActive
                                    ? 'text-[#0F76BB]'
                                    : 'text-[#002147] group-hover:text-[#0F76BB]'
                                }`}
                              >
                                {item.title}
                              </span>
                              <ArrowRight
                                className={`w-3.5 h-3.5 text-[#0F76BB] shrink-0 transition-all ${
                                  isActive
                                    ? 'opacity-100'
                                    : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                                }`}
                              />
                            </div>
                            <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                              {item.desc}
                            </p>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Bloque 2: Cuidado Textil y Tapicerías */}
                <div className="col-span-5">
                  <div className="pb-3 mb-3 border-b border-slate-200">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0F76BB] block">
                      02 · Cuidado Textil y Tapicerías
                    </span>
                    <p className="text-base font-extrabold text-[#002147] mt-0.5">
                      Tratamiento profesional in situ y en planta
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <a
                      href="/limpieza-sofas-vigo"
                      onClick={(e) => handleLinkClick('/limpieza-sofas-vigo', e)}
                      className={`group block p-2.5 rounded-xl transition-colors ${
                        currentPath === '/limpieza-sofas-vigo'
                          ? 'bg-[#EDF5FD]'
                          : 'hover:bg-[#EDF5FD]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-extrabold transition-colors ${
                            currentPath === '/limpieza-sofas-vigo'
                              ? 'text-[#0F76BB]'
                              : 'text-[#002147] group-hover:text-[#0F76BB]'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#0F76BB] shrink-0" />
                          <span>Limpieza de sofás (Servicio destacado)</span>
                        </span>
                        <span className="text-[10px] font-bold uppercase text-[#178A47] bg-[#178A47]/10 px-2 py-0.5 rounded-sm shrink-0">
                          A domicilio
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Inyección-extracción e higienización profunda en tu propia vivienda sin desmontar el sofá.
                      </p>
                    </a>

                    <a
                      href="/limpieza-sofas-vigo"
                      onClick={(e) => handleLinkClick('/limpieza-sofas-vigo', e)}
                      className={`group block p-2.5 rounded-xl transition-colors ${
                        currentPath === '/limpieza-sofas-vigo'
                          ? 'bg-[#EDF5FD]'
                          : 'hover:bg-[#EDF5FD]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span
                          className={`text-xs font-extrabold transition-colors ${
                            currentPath === '/limpieza-sofas-vigo'
                              ? 'text-[#0F76BB]'
                              : 'text-[#002147] group-hover:text-[#0F76BB]'
                          }`}
                        >
                          Higienización in situ de tapicerías y colchones
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#0F76BB] shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Sillones, sillas tapizadas, cabeceros de cama, colchones y fundas desenfundables.
                      </p>
                    </a>

                    <a
                      href="/servicios-empresas"
                      onClick={(e) => handleLinkClick('/servicios-empresas', e)}
                      className={`group block p-2.5 rounded-xl transition-colors ${
                        currentPath === '/servicios-empresas'
                          ? 'bg-[#EDF5FD]'
                          : 'hover:bg-[#EDF5FD]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span
                          className={`text-xs font-extrabold transition-colors ${
                            currentPath === '/servicios-empresas'
                              ? 'text-[#0F76BB]'
                              : 'text-[#002147] group-hover:text-[#0F76BB]'
                          }`}
                        >
                          Lavandería para empresas y negocios
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#0F76BB] shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Toallas de peluquerías y clínicas, vestuario laboral (suciedad normal) y factura mensual con CIF.
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            DESPLEGABLE 3: ALOJAMIENTOS TURÍSTICOS (PANEL FLOTANTE 2 COLUMNAS)
            ========================================================================= */}
        {activeMenu === 'apartamentos' && (
          <div
            className="hidden lg:block absolute inset-x-0 top-full pt-2 px-6 z-50"
            onMouseEnter={() => handleMouseEnterMenu('apartamentos')}
            onMouseLeave={handleMouseLeaveMenu}
          >
            <div className="max-w-4xl mx-auto bg-white text-slate-800 rounded-2xl border border-slate-200/90 shadow-[0_24px_48px_-12px_rgba(0,33,71,0.22)] p-7 animate-curtain-drop">
              <div className="pb-3 mb-5 border-b border-slate-200">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0F76BB] block">
                  Viviendas turísticas y Airbnb en Vigo
                </span>
                <p className="text-lg font-extrabold text-[#002147] mt-0.5">
                  Soluciones de lavandería y limpieza a medida para anfitriones
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 items-start">
                <a
                  href="/limpieza-apartamentos-turisticos-vigo"
                  onClick={(e) => handleLinkClick('/limpieza-apartamentos-turisticos-vigo', e)}
                  className={`group block p-4 rounded-xl transition-colors ${
                    currentPath === '/limpieza-apartamentos-turisticos-vigo'
                      ? 'bg-[#EDF5FD]'
                      : 'hover:bg-[#EDF5FD]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center font-extrabold text-xs shrink-0">
                      01
                    </span>
                    <span className="text-sm font-extrabold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                      Servicio de Limpieza y Lavandería
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Servicio completo de limpieza del apartamento en cada rotación y suministro de ropa de cama y toallas higienizadas con planchado profesional entre huéspedes.
                  </p>
                  <div className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0F76BB] group-hover:text-[#002147]">
                    <span>Ver modalidad y presupuesto a medida</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>

                <a
                  href="/limpieza-apartamentos-turisticos-vigo"
                  onClick={(e) => handleLinkClick('/limpieza-apartamentos-turisticos-vigo', e)}
                  className={`group block p-4 rounded-xl transition-colors ${
                    currentPath === '/limpieza-apartamentos-turisticos-vigo'
                      ? 'bg-[#EDF5FD]'
                      : 'hover:bg-[#EDF5FD]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center font-extrabold text-xs shrink-0">
                      02
                    </span>
                    <span className="text-sm font-extrabold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                      Coordinación Integral de Limpieza y Lavandería
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tú gestionas tus reservas y calendario. Mimos asume la parte operativa crítica: limpieza exhaustiva en cada checkout, supervisión básica y entrega puntual de lencería hotelera impecable.
                  </p>
                  <div className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0F76BB] group-hover:text-[#002147]">
                    <span>Consultar propuesta a medida</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            DESPLEGABLE 4: PUNTOS MIMOS (PANEL FLOTANTE 3 COLUMNAS)
            ========================================================================= */}
        {activeMenu === 'puntos' && (
          <div
            className="hidden lg:block absolute inset-x-0 top-full pt-2 px-6 z-50"
            onMouseEnter={() => handleMouseEnterMenu('puntos')}
            onMouseLeave={handleMouseLeaveMenu}
          >
            <div className="max-w-6xl mx-auto bg-white text-slate-800 rounded-2xl border border-slate-200/90 shadow-[0_24px_48px_-12px_rgba(0,33,71,0.22)] p-7 animate-curtain-drop">
              <div className="grid grid-cols-12 gap-7 items-start">
                {/* Columna 1: 3 Tiendas Propias en Vigo */}
                <div className="col-span-4">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#002147]">
                      <Store className="w-3.5 h-3.5 text-[#0F76BB]" />
                      <span>3 Tiendas Propias en Vigo</span>
                    </span>
                    <a
                      href="/puntos-mimos"
                      onClick={(e) => handleLinkClick('/puntos-mimos', e)}
                      className="text-xs font-bold text-[#0F76BB] hover:text-[#002147] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Ver mapa</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="rounded-xl bg-[#F4F9FE] border border-[#002147]/12 p-2.5 space-y-1.5">
                    {[
                      {
                        name: 'Sede Central Navia',
                        badge: 'Central',
                        badgeClass: 'bg-[#002147] text-white',
                        meta: 'C/ Teixugueiras, 11, bajo 9 · 986 12 51 41',
                        desc: 'Planta de tintorería, planchado y recepción de costura.',
                        href: '/tienda-mimos-navia-vigo',
                      },
                      {
                        name: 'Mimos Gregorio Espino',
                        badge: 'Taller in situ',
                        badgeClass: 'bg-[#0F76BB] text-white',
                        meta: 'Alcalde Gregorio Espino, 42 · 986 19 27 87',
                        desc: 'Taller propio de costura y tintorería directa.',
                        href: '/tienda-mimos-gregorio-espino-vigo',
                      },
                      {
                        name: 'Mimos Venezuela',
                        badge: 'Taller in situ',
                        badgeClass: 'bg-[#0F76BB] text-white',
                        meta: 'Rúa de Venezuela, 29, Entrep. · 646 94 67 64',
                        desc: 'Taller propio de costura y atención en Vigo Centro.',
                        href: '/tienda-mimos-venezuela-vigo',
                      },
                    ].map((tienda) => {
                      const isActive = currentPath === tienda.href;
                      return (
                        <a
                          key={tienda.href}
                          href={tienda.href}
                          onClick={(e) => handleLinkClick(tienda.href, e)}
                          className={`group block p-2.5 rounded-lg transition-colors ${
                            isActive ? 'bg-[#EDF5FD]' : 'hover:bg-[#EDF5FD]'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-xs font-extrabold transition-colors ${
                                isActive
                                  ? 'text-[#0F76BB]'
                                  : 'text-[#002147] group-hover:text-[#0F76BB]'
                              }`}
                            >
                              {tienda.name}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-sm shrink-0 ${tienda.badgeClass}`}
                            >
                              {tienda.badge}
                            </span>
                          </div>
                          <p className="text-[11px] font-medium text-slate-700 mt-1">
                            {tienda.meta}
                          </p>
                          <p className="text-[11px] text-slate-600 mt-0.5">{tienda.desc}</p>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Columna 2: 5 Comercios Colaboradores + accesos */}
                <div className="col-span-4">
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-200">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#002147]">
                      <MapPin className="w-3.5 h-3.5 text-[#0F76BB]" />
                      <span>5 Comercios Colaboradores</span>
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-relaxed mb-2.5">
                    Tiendas independientes asociadas donde entregas y recoges con las mismas tarifas oficiales de Mimos:
                  </p>

                  <div className="space-y-1">
                    {[
                      {
                        localidad: 'Vigo · As Travesas',
                        detalle: "D'Passo (Camiño Espedrigada, 9)",
                        href: '/punto-mimos-dpasso-vigo',
                      },
                      {
                        localidad: 'Redondela',
                        detalle: 'Mimos Redondela (C/ José Regojo, 29)',
                        href: '/zonas/redondela',
                      },
                      {
                        localidad: 'Gondomar',
                        detalle: 'Puntadas No Aire (costura y recepción)',
                        href: '/zonas/gondomar',
                      },
                      {
                        localidad: 'Ponteareas',
                        detalle: 'Arregla2 (C/ Argentina, 4)',
                        href: '/zonas/ponteareas',
                      },
                      {
                        localidad: 'O Porriño',
                        detalle: 'Telas y Más (C/ Manuel Rodríguez, 30)',
                        href: '/zonas/o-porrino',
                      },
                    ].map((punto) => {
                      const isActive = currentPath === punto.href;
                      return (
                        <a
                          key={punto.href}
                          href={punto.href}
                          onClick={(e) => handleLinkClick(punto.href, e)}
                          className={`group flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg transition-colors ${
                            isActive ? 'bg-[#EDF5FD]' : 'hover:bg-[#EDF5FD]'
                          }`}
                        >
                          <div className="min-w-0">
                            <span
                              className={`text-xs font-extrabold block transition-colors ${
                                isActive
                                  ? 'text-[#0F76BB]'
                                  : 'text-[#002147] group-hover:text-[#0F76BB]'
                              }`}
                            >
                              {punto.localidad}
                            </span>
                            <span className="text-[11px] text-slate-600 block truncate">
                              {punto.detalle}
                            </span>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#0F76BB] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                        </a>
                      );
                    })}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-slate-200">
                    <a
                      href="/contacto"
                      onClick={(e) => handleLinkClick('/contacto', e)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#F4F9FE] hover:bg-[#EDF5FD] text-xs font-bold text-[#002147] hover:text-[#0F76BB] transition-colors"
                    >
                      <span>Contacto y horarios</span>
                      <ArrowRight className="w-3 h-3 text-[#0F76BB] shrink-0" />
                    </a>
                    <a
                      href="/blog"
                      onClick={(e) => handleLinkClick('/blog', e)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#F4F9FE] hover:bg-[#EDF5FD] text-xs font-bold text-[#002147] hover:text-[#0F76BB] transition-colors"
                    >
                      <span>Blog y guías textiles</span>
                      <ArrowRight className="w-3 h-3 text-[#0F76BB] shrink-0" />
                    </a>
                  </div>
                </div>

                {/* Columna 3: Captación de comercios */}
                <div className="col-span-4">
                  <div className="pb-2 mb-3 border-b border-slate-200 text-[11px] font-extrabold uppercase tracking-wider text-[#0F76BB]">
                    ¿Quieres ser un punto de recogida Mimos?
                  </div>

                  <div className="rounded-2xl bg-[#F7F6F2] border-2 border-[#0F76BB] text-slate-800 p-5 shadow-[0_10px_28px_-10px_rgba(15,118,187,0.22)] flex flex-col justify-between space-y-4">
                    <div>
                      <p className="text-[15px] font-extrabold leading-snug text-[#002147]">
                        ¿Tienes un negocio y quieres más ingresos y tránsito de clientes?
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1.5">
                        Te proponemos montar un punto de recogida Mimos en tu establecimiento.
                      </p>
                    </div>

                    <ul className="space-y-2 text-xs text-slate-700 leading-relaxed">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-[#002147]">Servicio complementario:</strong> entrega y recogida de prendas directamente en tu mostrador.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-[#002147]">Más clientes y ventas:</strong> atrae visitas nuevas dos veces sin cuotas ni inversión inicial.
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-[#002147]">Destaca en tu zona:</strong> nosotros nos encargamos de todo (furgoneta, resguardos y limpieza en Vigo).
                        </span>
                      </li>
                    </ul>

                    <a
                      href="/se-punto-colaborador"
                      onClick={(e) => handleLinkClick('/se-punto-colaborador', e)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0F76BB] hover:bg-[#002147] text-white text-xs font-extrabold px-4 py-2.5 transition-colors shadow-xs"
                    >
                      <span>Quiero ser punto colaborador</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            DESPLEGABLE 5: ALFOMBRAS (PANEL FLOTANTE 2 COLUMNAS)
            ========================================================================= */}
        {activeMenu === 'alfombras' && (
          <div
            className="hidden lg:block absolute inset-x-0 top-full pt-2 px-6 z-50"
            onMouseEnter={() => handleMouseEnterMenu('alfombras')}
            onMouseLeave={handleMouseLeaveMenu}
          >
            <div className="max-w-4xl mx-auto bg-white text-slate-800 rounded-2xl border border-slate-200/90 shadow-[0_24px_48px_-12px_rgba(0,33,71,0.22)] p-7 animate-curtain-drop">
              <div className="pb-3 mb-5 border-b border-slate-200">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#0F76BB] block">
                  Alfombras en Vigo · Recogida o entrega en nuestras 3 tiendas
                </span>
                <p className="text-lg font-extrabold text-[#002147] mt-0.5">
                  Limpieza profunda y arreglos de alfombras
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 items-start">
                <a
                  href="/limpieza-alfombras-vigo"
                  onClick={(e) => handleLinkClick('/limpieza-alfombras-vigo', e)}
                  className={`group block p-4 rounded-xl transition-colors ${
                    currentPath === '/limpieza-alfombras-vigo'
                      ? 'bg-[#EDF5FD]'
                      : 'hover:bg-[#EDF5FD]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center font-extrabold text-xs shrink-0">
                      01
                    </span>
                    <span className="text-sm font-extrabold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                      Limpieza de alfombras
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Lavado adaptado según fibra y reverso (lana, seda, yute, algodón o fibras modernas) con secado completo anti-humedad. Entrega en tienda o recogida a domicilio.
                  </p>
                  <div className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0F76BB] group-hover:text-[#002147]">
                    <span>Ver limpieza de alfombras</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>

                <a
                  href="/reparacion-alfombras-vigo"
                  onClick={(e) => handleLinkClick('/reparacion-alfombras-vigo', e)}
                  className={`group block p-4 rounded-xl transition-colors ${
                    currentPath === '/reparacion-alfombras-vigo'
                      ? 'bg-[#EDF5FD]'
                      : 'hover:bg-[#EDF5FD]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <span className="w-7 h-7 rounded-lg bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center font-extrabold text-xs shrink-0">
                      02
                    </span>
                    <span className="text-sm font-extrabold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                      Arreglo y reparación de alfombras
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Restauración artesanal de flecos, festón, ribetes, descosidos y bordes mediante especialista. Puedes contratar solo el arreglo o junto con la limpieza.
                  </p>
                  <div className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0F76BB] group-hover:text-[#002147]">
                    <span>Ver arreglos de alfombras</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}

      </header>

      {/* =========================================================================
          MODAL DE SEGUIMIENTO: CONSULTAR ESTADO DE PEDIDO (Dialog accesible)
          ========================================================================= */}
      <Dialog
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
        titleId="modal-tracking-title"
        maxWidthClass="max-w-md"
        className="rounded-2xl p-6 text-slate-900"
      >
        <button
          type="button"
          onClick={() => setIsTrackingModalOpen(false)}
          className="absolute top-4 right-4 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg text-slate-600 hover:text-[#002147] hover:bg-[#EDF5FD] transition-colors cursor-pointer"
          aria-label="Cerrar modal de consulta"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4 pr-10">
          <div className="w-10 h-10 rounded-xl bg-[#EDF5FD] border border-slate-200 text-[#0C65A1] flex items-center justify-center shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h2 id="modal-tracking-title" className="text-lg font-extrabold text-[#002147]">
              Consultar estado de encargo
            </h2>
            <p className="text-xs text-slate-600">
              Seguimiento de ticket o resguardo en Tintorería Mimos
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          Cada encargo depositado en nuestras 3 tiendas propias o en los 5 puntos colaboradores cuenta con un <strong>resguardo oficial numerado</strong>. Escribe tu número de resguardo para consultar en directo con Mimo por WhatsApp:
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            trackingLinkRef.current?.click();
          }}
          className="space-y-3.5"
        >
          <div>
            <label htmlFor="order-ticket-input" className="block text-xs font-bold text-[#002147] mb-1">
              N.º de ticket o resguardo:
            </label>
            <div className="relative">
              <Receipt className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={orderInputRef}
                id="order-ticket-input"
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Ej. 14258 o tu nombre"
                className="w-full min-h-[44px] pl-9 pr-3 py-2.5 text-base lg:text-sm rounded-xl border border-slate-300 bg-[#F4F9FE] text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
              />
            </div>
          </div>

          <a
            ref={trackingLinkRef}
            href={trackingWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackWhatsAppClick(currentPath, 'modal_order_status_submit');
              setIsTrackingModalOpen(false);
            }}
            className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Consultar por WhatsApp con Mimo</span>
          </a>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
          <span className="text-slate-600">¿Prefieres consultar por teléfono?</span>
          <a
            href={CONTACT_INFO.phoneHref}
            onClick={() => trackPhoneClick(currentPath, 'modal_order_phone')}
            className="font-bold text-[#0C65A1] hover:underline inline-flex items-center gap-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{CONTACT_INFO.phoneDisplay}</span>
          </a>
        </div>
      </Dialog>

      {/* =========================================================================
          MENÚ MÓVIL LATERAL (Drawer accesible para pantallas pequeñas < lg)
          ========================================================================= */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setMobileMenuOpen(false);
            }
          }}
          className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
        >
          <div
            ref={mobileDrawerRef}
            className="w-full max-w-sm h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl bg-white text-[#002147]"
          >
            <div>
              {/* Cabecera del drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-6">
                <div className="flex items-center gap-2.5">
                  <img
                    src={IMAGES.logoMimos}
                    alt=""
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full p-0.5 bg-[#EDF5FD]"
                  />
                  <span className="font-extrabold text-sm tracking-tight text-[#002147]">
                    TINTORERÍA MIMOS
                  </span>
                </div>
                <button
                  ref={mobileCloseBtnRef}
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg text-slate-600 hover:text-[#002147] hover:bg-[#EDF5FD] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F76BB]"
                  aria-label="Cerrar menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>


              {/* Lista de navegación móvil */}
              <nav className="space-y-2 text-sm font-semibold">
                {/* 1. Tintorería y lavandería */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === 'tintoreria' ? null : 'tintoreria'
                      )
                    }
                    className="w-full flex items-center justify-between min-h-[44px] py-2.5 px-3 rounded-lg text-left font-bold text-[#002147] hover:bg-[#EDF5FD]"
                  >
                    <span>Tintorería y lavandería</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpandedSection === 'tintoreria'
                          ? 'rotate-180 text-[#0C65A1]'
                          : ''
                      }`}
                    />
                  </button>
                  {mobileExpandedSection === 'tintoreria' && (
                    <div className="pl-4 pr-2 py-2 space-y-1.5 text-xs border-l ml-3 text-slate-600 border-[#0F76BB]/30">
                      <a
                        href="/tintoreria-vigo"
                        onClick={(e) => handleLinkClick('/tintoreria-vigo', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Tintorería profesional (Trajes, abrigos, delicadas)
                      </a>
                      <a
                        href="/limpieza-vestidos-novia-ceremonia-vigo"
                        onClick={(e) => handleLinkClick('/limpieza-vestidos-novia-ceremonia-vigo', e)}
                        className="block py-1.5 font-bold text-[#0C65A1]"
                      >
                        • Vestidos de novia, fiesta y ceremonia
                      </a>
                      <a
                        href="/lavanderia-vigo"
                        onClick={(e) => handleLinkClick('/lavanderia-vigo', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Lavandería profesional (servicio atendido)
                      </a>
                      <a
                        href="/planchado-vigo"
                        onClick={(e) => handleLinkClick('/planchado-vigo', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Planchado profesional
                      </a>
                      <a
                        href="/textiles-hogar-vigo"
                        onClick={(e) => handleLinkClick('/textiles-hogar-vigo', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Textiles del hogar (Edredones, mantas, cortinas)
                      </a>
                      <a
                        href="/colada-familiar-vigo"
                        onClick={(e) => handleLinkClick('/colada-familiar-vigo', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Colada familiar (lavar y doblar / planchar)
                      </a>
                      <a
                        href="/limpieza-alfombras-vigo"
                        onClick={(e) => handleLinkClick('/limpieza-alfombras-vigo', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Limpieza de alfombras (recogida o tienda)
                      </a>
                      <a
                        href="/reparacion-alfombras-vigo"
                        onClick={(e) => handleLinkClick('/reparacion-alfombras-vigo', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Reparación de alfombras (flecos y bordes)
                      </a>
                      <a
                        href="/limpieza-pieles-cuero-vigo"
                        onClick={(e) => handleLinkClick('/limpieza-pieles-cuero-vigo', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Pieles, cuero y peletería
                      </a>
                      <a
                        href="/limpieza-incendios-siniestros-vigo"
                        onClick={(e) => handleLinkClick('/limpieza-incendios-siniestros-vigo', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Recuperación tras incendios y siniestros
                      </a>
                      <a
                        href="/servicios-empresas"
                        onClick={(e) => handleLinkClick('/servicios-empresas', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Lavandería para empresas (peluquerías, clínicas y uniformes)
                      </a>
                      <a
                        href="/recogida-a-domicilio"
                        onClick={(e) => handleLinkClick('/recogida-a-domicilio', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Recogida y entrega a domicilio (Vigo, comarca y polígonos)
                      </a>
                    </div>
                  )}
                </div>

                {/* 2. Limpieza profesional */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === 'limpieza' ? null : 'limpieza'
                      )
                    }
                    className="w-full flex items-center justify-between min-h-[44px] py-2.5 px-3 rounded-lg text-left font-bold text-[#002147] hover:bg-[#EDF5FD]"
                  >
                    <span>Limpieza profesional</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpandedSection === 'limpieza'
                          ? 'rotate-180 text-[#0C65A1]'
                          : ''
                      }`}
                    />
                  </button>
                  {mobileExpandedSection === 'limpieza' && (
                    <div className="pl-4 pr-2 py-2 space-y-1.5 text-xs border-l ml-3 text-slate-600 border-[#0F76BB]/30">
                      <a
                        href="/limpieza-casas-vigo"
                        onClick={(e) => handleLinkClick('/limpieza-casas-vigo', e)}
                        className="block py-1.5 font-bold text-[#002147] hover:text-[#0F76BB]"
                      >
                        • Limpieza de casas y pisos particulares
                      </a>
                      <a
                        href="/limpieza-profesional-vigo"
                        onClick={(e) => handleLinkClick('/limpieza-profesional-vigo', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Oficinas, despachos, comunidades y locales
                      </a>
                      <a
                        href="/limpieza-sofas-vigo"
                        onClick={(e) => handleLinkClick('/limpieza-sofas-vigo', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Limpieza de sofás y tapicerías a domicilio
                      </a>
                    </div>
                  )}
                </div>

                {/* 3. Alojamientos turísticos */}
                <a
                  href="/limpieza-apartamentos-turisticos-vigo"
                  onClick={(e) => handleLinkClick('/limpieza-apartamentos-turisticos-vigo', e)}
                  className="block py-2.5 px-3 rounded-lg font-bold text-[#002147] hover:bg-[#EDF5FD]"
                >
                  Alojamientos turísticos
                </a>

                {/* 4. Puntos Mimos */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === 'puntos' ? null : 'puntos'
                      )
                    }
                    className="w-full flex items-center justify-between min-h-[44px] py-2.5 px-3 rounded-lg text-left font-bold text-[#002147] hover:bg-[#EDF5FD]"
                  >
                    <span>Puntos Mimos y tiendas</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpandedSection === 'puntos'
                          ? 'rotate-180 text-[#0C65A1]'
                          : ''
                      }`}
                    />
                  </button>
                  {mobileExpandedSection === 'puntos' && (
                    <div className="pl-4 pr-2 py-2 space-y-1.5 text-xs border-l ml-3 text-slate-600 border-[#0F76BB]/30">
                      <a
                        href="/tienda-mimos-navia-vigo"
                        onClick={(e) => handleLinkClick('/tienda-mimos-navia-vigo', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Sede Central Navia (Teixugueiras 11)
                      </a>
                      <a
                        href="/tienda-mimos-gregorio-espino-vigo"
                        onClick={(e) => handleLinkClick('/tienda-mimos-gregorio-espino-vigo', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Mimos Gregorio Espino (Taller in situ)
                      </a>
                      <a
                        href="/tienda-mimos-venezuela-vigo"
                        onClick={(e) => handleLinkClick('/tienda-mimos-venezuela-vigo', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Mimos Venezuela 29 (Taller in situ)
                      </a>
                      <a
                        href="/puntos-mimos"
                        onClick={(e) => handleLinkClick('/puntos-mimos', e)}
                        className="block py-1.5 hover:text-[#0F76BB]"
                      >
                        • Todos los puntos y comarca
                      </a>
                      <a
                        href="/se-punto-colaborador"
                        onClick={(e) => handleLinkClick('/se-punto-colaborador', e)}
                        className="block py-1.5 font-bold text-[#0C65A1]"
                      >
                        • Quiero ser punto colaborador →
                      </a>
                    </div>
                  )}
                </div>

                {/* 5. Limpieza de sofás a domicilio */}
                <a
                  href="/limpieza-sofas-vigo"
                  onClick={(e) => handleLinkClick('/limpieza-sofas-vigo', e)}
                  className="block py-2.5 px-3 rounded-lg font-extrabold text-[#0C65A1] hover:bg-[#EDF5FD]"
                >
                  Limpieza de sofás a domicilio
                </a>

                {/* 6. Alfombras (limpieza y arreglos) */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === 'alfombras' ? null : 'alfombras'
                      )
                    }
                    className="w-full flex items-center justify-between min-h-[44px] py-2.5 px-3 rounded-lg text-left font-extrabold text-[#0C65A1] hover:bg-[#EDF5FD]"
                  >
                    <span>Alfombras (limpieza y arreglos)</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpandedSection === 'alfombras'
                          ? 'rotate-180 text-[#0C65A1]'
                          : ''
                      }`}
                    />
                  </button>
                  {mobileExpandedSection === 'alfombras' && (
                    <div className="pl-4 pr-2 py-2 space-y-1.5 text-xs border-l ml-3 text-slate-600 border-[#0F76BB]/30">
                      <a
                        href="/limpieza-alfombras-vigo"
                        onClick={(e) => handleLinkClick('/limpieza-alfombras-vigo', e)}
                        className="block py-1.5 font-bold text-[#002147] hover:text-[#0F76BB]"
                      >
                        • Limpieza de alfombras (recogida o tienda)
                      </a>
                      <a
                        href="/reparacion-alfombras-vigo"
                        onClick={(e) => handleLinkClick('/reparacion-alfombras-vigo', e)}
                        className="block py-1.5 font-bold text-[#002147] hover:text-[#0F76BB]"
                      >
                        • Arreglos de alfombras (flecos y bordes)
                      </a>
                    </div>
                  )}
                </div>

                {/* 7. Costura y arreglos */}
                <a
                  href="/arreglos-de-ropa-vigo"
                  onClick={(e) => handleLinkClick('/arreglos-de-ropa-vigo', e)}
                  className="block py-2.5 px-3 rounded-lg font-bold text-[#002147] hover:bg-[#EDF5FD]"
                >
                  Costura y arreglos de ropa
                </a>

                {/* 6. Blog */}
                <a
                  href="/blog"
                  onClick={(e) => handleLinkClick('/blog', e)}
                  className="block py-2.5 px-3 rounded-lg font-bold text-[#002147] hover:bg-[#EDF5FD]"
                >
                  Blog y consejos
                </a>

                {/* 7. Contacto */}
                <a
                  href="/contacto"
                  onClick={(e) => handleLinkClick('/contacto', e)}
                  className="block py-2.5 px-3 rounded-lg font-bold text-[#002147] hover:bg-[#EDF5FD]"
                >
                  Contacto y horarios
                </a>
              </nav>

              {/* Botonera de acciones rápida en móvil */}
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    skipMobileRestoreFocusRef.current = true;
                    setMobileMenuOpen(false);
                    setIsTrackingModalOpen(true);
                  }}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 border font-bold text-xs py-3 px-4 rounded-xl transition-colors cursor-pointer bg-[#EDF5FD] hover:bg-[#DCEBFA] border-[#002147]/15 text-[#002147]"
                >
                  <Package className="w-4 h-4 text-[#0C65A1]" />
                  <span>Consultar estado de mi pedido</span>
                </button>

                <a
                  href={CONTACT_INFO.whatsappGeneralHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(currentPath, 'drawer_whatsapp')}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-xs py-3 px-4 rounded-xl transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Hablar con Mimo en WhatsApp</span>
                </a>

                <a
                  href={CONTACT_INFO.phoneHref}
                  onClick={() => trackPhoneClick(currentPath, 'drawer_phone')}
                  className="w-full min-h-[44px] flex items-center justify-center gap-2 border font-bold text-xs py-2.5 px-4 rounded-xl transition-colors border-slate-300 hover:border-[#002147] text-[#002147]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0C65A1]" />
                  <span>Llamar al {CONTACT_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Pie del drawer */}
            <div className="pt-4 text-center text-[10px] text-slate-600">
              Tintorería Mimos Navia, S.L. · Vigo (Pontevedra)
            </div>
          </div>
        </div>
      )}
    </>
  );
};
