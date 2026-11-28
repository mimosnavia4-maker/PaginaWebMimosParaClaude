import React, { useState, useEffect, useRef } from 'react';
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
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
  const [mobileSlideDirection, setMobileSlideDirection] = useState<'forward' | 'back'>('forward');
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [canScrollNavLeft, setCanScrollNavLeft] = useState(false);
  const [canScrollNavRight, setCanScrollNavRight] = useState(true);
  const menuCloseTimeoutRef = useRef<number | null>(null);
  const trackingLinkRef = useRef<HTMLAnchorElement | null>(null);
  const orderInputRef = useRef<HTMLInputElement | null>(null);
  const mobileMenuBtnRef = useRef<HTMLButtonElement | null>(null);
  const mobileDrawerRef = useRef<HTMLDivElement | null>(null);
  const mobileCloseBtnRef = useRef<HTMLButtonElement | null>(null);
  const mobileScrollRef = useRef<HTMLDivElement | null>(null);
  const chapterNavRef = useRef<HTMLDivElement | null>(null);
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
    if (!mobileMenuOpen) {
      setMobileExpandedSection(null);
      return;
    }

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
    setMobileExpandedSection(null);
    if (mobileMenuOpen) {
      skipMobileRestoreFocusRef.current = true;
      setMobileMenuOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPath]);

  // Actualizar visibilidad de las flechas < y > según posición real de scroll
  const updateChapterNavArrows = () => {
    const el = chapterNavRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollNavLeft(scrollLeft > 12);
    setCanScrollNavRight(scrollLeft + clientWidth < scrollWidth - 12);
  };

  useEffect(() => {
    updateChapterNavArrows();
    const el = chapterNavRef.current;
    let resizeObserver: ResizeObserver | null = null;
    if (el && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateChapterNavArrows);
      resizeObserver.observe(el);
    }
    const timer = window.setTimeout(updateChapterNavArrows, 180);
    window.addEventListener('resize', updateChapterNavArrows);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', updateChapterNavArrows);
      resizeObserver?.disconnect();
    };
  }, [currentPath]);

  const scrollChapterNav = (direction: 'left' | 'right') => {
    const el = chapterNavRef.current;
    if (!el) return;
    const step = Math.max(200, Math.round(el.clientWidth * 0.65));
    el.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    });
  };

  const openMobileSubmenu = (section: string) => {
    setMobileSlideDirection('forward');
    setMobileExpandedSection(section);
    mobileScrollRef.current?.scrollTo({ top: 0 });
  };

  const closeMobileSubmenu = () => {
    setMobileSlideDirection('back');
    setMobileExpandedSection(null);
    mobileScrollRef.current?.scrollTo({ top: 0 });
  };

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
    setMobileExpandedSection(null);
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
      {/* Estilos CSS embebidos para animación de caída suave, transiciones móviles y scroll limpio */}
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
        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(24px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes slideInLeft {
          0% {
            opacity: 0;
            transform: translateX(-24px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slideInRight 220ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .animate-slide-in-left {
          animation: slideInLeft 220ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Enlace accesible para saltar directamente al contenido principal con Tab */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-[#002147] focus:text-white focus:text-sm focus:font-semibold focus:shadow-lg focus:ring-2 focus:ring-[#60B5F6]"
      >
        Saltar al contenido principal
      </a>

      {/* Cabecera Principal Sticky */}
      <header
        className="sticky top-0 z-50 select-none bg-white/95 backdrop-blur-xs text-[#002147] border-b border-slate-200/80"
        onMouseLeave={handleMouseLeaveMenu}
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 sm:py-2.5 gap-1 sm:gap-3 lg:gap-5">
            {/* =========================================================================
                1. BLOQUE IZQUIERDO (Identidad y Marca a doble altura)
                ========================================================================= */}
            <div className="flex items-center min-w-0 shrink lg:shrink-0 overflow-hidden">
              <a
                href="/"
                onClick={(e) => handleLinkClick('/', e)}
                className="flex items-center gap-1.5 sm:gap-3 group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F76BB] rounded-xl pr-1 min-w-0"
                aria-label="Tintorería Mimos Navia - Volver a la portada principal"
              >
                <img
                  src={IMAGES.logoMimos}
                  alt="Tintorería Mimos Navia"
                  width={48}
                  height={48}
                  className="w-9 h-9 sm:w-11 sm:h-11 object-contain rounded-full p-1 shrink-0 group-hover:scale-105 transition-transform bg-[#F4F9FE] border border-[#002147]/10"
                />
                <div className="flex flex-col min-w-0 leading-none">
                  {/* Móvil (< sm): 3 líneas compactas TINTORERÍA / MIMOS NAVIA / VIGO */}
                  <span className="sm:hidden text-[9px] font-semibold tracking-[0.12em] uppercase text-[#002147]/85">
                    Tintorería
                  </span>
                  <span className="sm:hidden font-semibold text-[13px] min-[360px]:text-[14px] tracking-tight leading-[1.08] text-[#0F76BB] mt-0.5 whitespace-nowrap">
                    MIMOS NAVIA
                  </span>

                  {/* Tablet y escritorio (>= sm): wordmark editorial en Fraunces */}
                  <span className="hidden sm:inline font-editorial-display font-medium text-[19px] tracking-[-0.015em] leading-tight text-[#002147] whitespace-nowrap">
                    Tintorería{' '}
                    <span className="text-[#0F76BB]">
                      Mimos
                    </span>
                  </span>

                  <span className="text-[8.5px] sm:text-[11px] font-normal text-slate-600 truncate mt-0.5">
                    <span className="sm:hidden">Vigo</span>
                    <span className="hidden sm:inline">Navia · Vigo · Cuidado Textil</span>
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
                    className={`w-full text-center py-1 px-1.5 rounded-md transition-colors text-xs font-semibold whitespace-nowrap ${
                      currentPath === '/arreglos-de-ropa-vigo'
                        ? 'bg-[#EDF5FD] text-[#0C65A1] font-semibold'
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
                    className={`w-full text-center py-1 px-1.5 rounded-md transition-colors text-xs font-semibold whitespace-nowrap ${
                      currentPath === '/limpieza-sofas-vigo'
                        ? 'bg-[#EDF5FD] text-[#0C65A1] font-semibold'
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
                    className={`w-full inline-flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg transition-all text-xs font-semibold cursor-pointer border whitespace-nowrap ${
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
                    className="w-full inline-flex items-center justify-center gap-1.5 py-1 px-1.5 rounded-md transition-colors text-xs font-semibold truncate text-[#002147] hover:text-[#0F76BB] hover:bg-[#EDF5FD]"
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
                    className={`w-full inline-flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg transition-all text-xs font-semibold cursor-pointer border ${
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
                    className={`w-full inline-flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg transition-all text-xs font-semibold cursor-pointer border ${
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
                    className={`w-full inline-flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg transition-all text-xs font-semibold cursor-pointer border ${
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
                    className={`w-full inline-flex items-center justify-center gap-1 py-1 px-1.5 rounded-lg transition-all text-xs font-semibold cursor-pointer border ${
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
                className="w-full h-[32px] inline-flex items-center justify-center gap-1.5 bg-[#13733B] hover:bg-[#0F5C2F] text-white font-semibold text-xs px-3 rounded-full transition-colors cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Hablar con Mimo</span>
              </a>

              {/* Botón inferior: Consultar pedido (Abre modal de seguimiento) */}
              <button
                type="button"
                onClick={() => setIsTrackingModalOpen(true)}
                className="w-full h-[32px] inline-flex items-center justify-center gap-1.5 border font-medium text-xs px-3 rounded-full transition-colors cursor-pointer bg-white hover:bg-[#F4F9FE] border-slate-300 hover:border-[#002147] text-[#002147]"
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
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0 lg:hidden">
              {/* WhatsApp en tablet (768–1023 px), oculto en móvil (< 768 px) porque ya está en la barra inferior fija */}
              <a
                href={CONTACT_INFO.whatsappGeneralHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(currentPath, 'header_mobile_icon')}
                className="hidden md:inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-full bg-[#13733B] hover:bg-[#0F5C2F] text-white transition-colors"
                aria-label="WhatsApp con Mimo"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => setIsTrackingModalOpen(true)}
                className="inline-flex items-center justify-center gap-1 sm:gap-1.5 min-h-[44px] px-2.5 sm:px-3.5 py-1.5 rounded-full bg-white hover:bg-[#F4F9FE] border border-slate-300 hover:border-[#002147] text-[#002147] text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer active:scale-95"
                aria-label="Consultar estado de tu pedido"
              >
                <Package className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0C65A1] shrink-0" aria-hidden="true" />
                <span>Consulta pedido</span>
              </button>
              <button
                ref={mobileMenuBtnRef}
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-1.5 sm:p-2 rounded-xl transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F76BB] text-[#002147] hover:bg-[#EDF5FD] cursor-pointer"
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
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0F76BB]">
                  Tintorería, lavandería y cuidado textil en Vigo
                </span>
                <a
                  href="/#servicios"
                  onClick={(e) => handleLinkClick('/#servicios', e)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#002147] hover:text-[#0F76BB] transition-colors"
                >
                  <span>Ver catálogo completo en portada</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Grid de 3 columnas iguales */}
              <div className="grid grid-cols-3 gap-7 items-start">
                {/* Columna 1: Prendas de vestir y sastrería */}
                <div className="pr-5 border-r border-slate-200/80">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0F76BB] mb-2.5 px-2.5">
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
                                className={`text-sm font-semibold transition-colors ${
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
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0F76BB] mb-2.5 px-2.5">
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
                                className={`text-sm font-semibold transition-colors ${
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
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0F76BB] mb-2.5 px-2.5">
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
                                className={`text-sm font-semibold transition-colors ${
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
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0F76BB] block">
                      01 · Instalaciones y Sedes
                    </span>
                    <p className="text-base font-semibold text-[#002147] mt-0.5">
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
                                className={`text-xs font-semibold transition-colors ${
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
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0F76BB] block">
                      02 · Cuidado Textil y Tapicerías
                    </span>
                    <p className="text-base font-semibold text-[#002147] mt-0.5">
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
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                            currentPath === '/limpieza-sofas-vigo'
                              ? 'text-[#0F76BB]'
                              : 'text-[#002147] group-hover:text-[#0F76BB]'
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#0F76BB] shrink-0" />
                          <span>Limpieza de sofás (Servicio destacado)</span>
                        </span>
                        <span className="text-[10px] font-semibold uppercase text-[#13733B] bg-[#13733B]/10 px-2 py-0.5 rounded-sm shrink-0">
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
                          className={`text-xs font-semibold transition-colors ${
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
                          className={`text-xs font-semibold transition-colors ${
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
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0F76BB] block">
                  Viviendas turísticas y Airbnb en Vigo
                </span>
                <p className="text-lg font-semibold text-[#002147] mt-0.5">
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
                    <span className="w-7 h-7 rounded-lg bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center font-semibold text-xs shrink-0">
                      01
                    </span>
                    <span className="text-sm font-semibold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                      Servicio de Limpieza y Lavandería
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Servicio completo de limpieza del apartamento en cada rotación y suministro de ropa de cama y toallas higienizadas con planchado profesional entre huéspedes.
                  </p>
                  <div className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F76BB] group-hover:text-[#002147]">
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
                    <span className="w-7 h-7 rounded-lg bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center font-semibold text-xs shrink-0">
                      02
                    </span>
                    <span className="text-sm font-semibold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                      Coordinación Integral de Limpieza y Lavandería
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tú gestionas tus reservas y calendario. Mimos asume la parte operativa crítica: limpieza exhaustiva en cada checkout, supervisión básica y entrega puntual de lencería hotelera impecable.
                  </p>
                  <div className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F76BB] group-hover:text-[#002147]">
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
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#002147]">
                      <Store className="w-3.5 h-3.5 text-[#0F76BB]" />
                      <span>3 Tiendas Propias en Vigo</span>
                    </span>
                    <a
                      href="/puntos-mimos"
                      onClick={(e) => handleLinkClick('/puntos-mimos', e)}
                      className="text-xs font-semibold text-[#0F76BB] hover:text-[#002147] inline-flex items-center gap-1 transition-colors"
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
                              className={`text-xs font-semibold transition-colors ${
                                isActive
                                  ? 'text-[#0F76BB]'
                                  : 'text-[#002147] group-hover:text-[#0F76BB]'
                              }`}
                            >
                              {tienda.name}
                            </span>
                            <span
                              className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-sm shrink-0 ${tienda.badgeClass}`}
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
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#002147]">
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
                              className={`text-xs font-semibold block transition-colors ${
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
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#F4F9FE] hover:bg-[#EDF5FD] text-xs font-semibold text-[#002147] hover:text-[#0F76BB] transition-colors"
                    >
                      <span>Contacto y horarios</span>
                      <ArrowRight className="w-3 h-3 text-[#0F76BB] shrink-0" />
                    </a>
                    <a
                      href="/blog"
                      onClick={(e) => handleLinkClick('/blog', e)}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#F4F9FE] hover:bg-[#EDF5FD] text-xs font-semibold text-[#002147] hover:text-[#0F76BB] transition-colors"
                    >
                      <span>Blog y guías textiles</span>
                      <ArrowRight className="w-3 h-3 text-[#0F76BB] shrink-0" />
                    </a>
                  </div>
                </div>

                {/* Columna 3: Captación de comercios */}
                <div className="col-span-4">
                  <div className="pb-2 mb-3 border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wider text-[#0F76BB]">
                    ¿Quieres ser un punto de recogida Mimos?
                  </div>

                  <div className="rounded-2xl bg-[#FAF9F6] border border-[#0F76BB] text-slate-800 p-5 flex flex-col justify-between space-y-4">
                    <div>
                      <p className="text-[15px] font-semibold leading-snug text-[#002147]">
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
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0F76BB] hover:bg-[#002147] text-white text-xs font-semibold px-4 py-2.5 transition-colors shadow-xs"
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
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#0F76BB] block">
                  Alfombras en Vigo · Recogida o entrega en nuestras 3 tiendas
                </span>
                <p className="text-lg font-semibold text-[#002147] mt-0.5">
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
                    <span className="w-7 h-7 rounded-lg bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center font-semibold text-xs shrink-0">
                      01
                    </span>
                    <span className="text-sm font-semibold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                      Limpieza de alfombras
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Lavado adaptado según fibra y reverso (lana, seda, yute, algodón o fibras modernas) con secado completo anti-humedad. Entrega en tienda o recogida a domicilio.
                  </p>
                  <div className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F76BB] group-hover:text-[#002147]">
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
                    <span className="w-7 h-7 rounded-lg bg-[#EDF5FD] text-[#0F76BB] flex items-center justify-center font-semibold text-xs shrink-0">
                      02
                    </span>
                    <span className="text-sm font-semibold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                      Arreglo y reparación de alfombras
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Restauración artesanal de flecos, festón, ribetes, descosidos y bordes mediante especialista. Puedes contratar solo el arreglo o junto con la limpieza.
                  </p>
                  <div className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F76BB] group-hover:text-[#002147]">
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
          BANDA HORIZONTAL DE ACCESOS RÁPIDOS CON OSITOS (ESTILO IKEA, SOLO < lg, NO STICKY)
          ========================================================================= */}
      <nav
        aria-label="Accesos rápidos de servicios"
        className="lg:hidden relative bg-white border-b border-slate-200/70"
      >
        {canScrollNavLeft && (
          <button
            type="button"
            onClick={() => scrollChapterNav('left')}
            aria-label="Desplazar servicios a la izquierda"
            className="absolute inset-y-0 left-0 z-10 w-8 flex items-center justify-start pl-1 bg-gradient-to-r from-white via-white/95 to-transparent text-slate-600 hover:text-[#002147] active:scale-95 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.25]" aria-hidden="true" />
          </button>
        )}

        <div
          ref={chapterNavRef}
          onScroll={updateChapterNavArrows}
          className="flex items-center overflow-x-auto no-scrollbar snap-x snap-mandatory px-3 py-2.5 gap-2"
        >
          {[
            {
              label: 'Tintorería y lavandería',
              href: '/tintoreria-vigo',
              imgSrc: '/images/ositos/osito-tintoreria.webp',
              imgAlt: 'Osito Mimos con traje para tintorería y lavandería',
            },
            {
              label: 'Costura y arreglos',
              href: '/arreglos-de-ropa-vigo',
              imgSrc: '/images/ositos/osito-costura.webp',
              imgAlt: 'Osito Mimos con tijeras y cinta métrica para costura y arreglos',
            },
            {
              label: 'Sofás a domicilio',
              href: '/limpieza-sofas-vigo',
              imgSrc: '/images/ositos/osito-sofas.webp',
              imgAlt: 'Osito Mimos limpiando un sofá a domicilio',
            },
            {
              label: 'Alfombras y arreglos',
              href: '/limpieza-alfombras-vigo',
              imgSrc: '/images/ositos/osito-alfombras.webp',
              imgAlt: 'Osito Mimos enrollando una alfombra con flecos',
            },
            {
              label: 'Limpieza profesional',
              href: '/limpieza-profesional-vigo',
              imgSrc: '/images/ositos/osito-limpieza.webp',
              imgAlt: 'Osito Mimos con mopa y cubo para limpieza profesional',
            },
            {
              label: 'Alojamientos turísticos',
              href: '/limpieza-apartamentos-turisticos-vigo',
              imgSrc: '/images/ositos/osito-apartamentos.webp',
              imgAlt: 'Osito Mimos con llaves para alojamientos turísticos',
            },
          ].map((item) => {
            const isActive =
              currentPath === item.href ||
              (item.href === '/limpieza-alfombras-vigo' && currentPath === '/reparacion-alfombras-vigo');
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(item.href, e)}
                className={`snap-start shrink-0 h-[44px] pl-1.5 pr-4 rounded-full inline-flex items-center gap-2 border transition-colors group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F76BB] ${
                  isActive
                    ? 'bg-[#EDF5FD] border-[#0F76BB] text-[#0C65A1]'
                    : 'bg-[#F3F4F6] hover:bg-[#EDF5FD] border-transparent text-[#002147]'
                }`}
              >
                <img
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  width={34}
                  height={34}
                  loading="eager"
                  decoding="async"
                  className="w-[34px] h-[34px] object-contain shrink-0 transition-transform duration-200 group-hover:scale-105"
                />
                <span
                  className={`text-[12px] font-semibold whitespace-nowrap leading-none ${
                    isActive ? 'text-[#0C65A1]' : 'text-[#002147] group-hover:text-[#0C65A1]'
                  }`}
                >
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        {canScrollNavRight && (
          <button
            type="button"
            onClick={() => scrollChapterNav('right')}
            aria-label="Desplazar servicios a la derecha"
            className="absolute inset-y-0 right-0 z-10 w-8 flex items-center justify-end pr-1 bg-gradient-to-l from-white via-white/95 to-transparent text-slate-600 hover:text-[#002147] active:scale-95 transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.25]" aria-hidden="true" />
          </button>
        )}
      </nav>

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
            <h2 id="modal-tracking-title" className="text-lg font-semibold text-[#002147]">
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
            <label htmlFor="order-ticket-input" className="block text-xs font-semibold text-[#002147] mb-1">
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
            className="w-full min-h-[44px] py-2.5 px-4 rounded-full bg-[#13733B] hover:bg-[#0F5C2F] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer active:scale-98"
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
            className="font-semibold text-[#0C65A1] hover:underline inline-flex items-center gap-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{CONTACT_INFO.phoneDisplay}</span>
          </a>
        </div>
      </Dialog>

      {/* =========================================================================
          MENÚ MÓVIL PANTALLA COMPLETA EN 2 NIVELES (Estilo Apple / IKEA < lg)
          ========================================================================= */}
      {mobileMenuOpen && (
        <div
          ref={mobileDrawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
          className="fixed inset-0 z-50 lg:hidden bg-white text-[#002147] flex flex-col animate-in fade-in duration-150"
        >
          {/* Cabecera fija del menú móvil (cambia entre Nivel 1 y Nivel 2 con botón Volver) */}
          <div className="shrink-0 px-4 py-3 border-b border-slate-200 bg-white flex items-center justify-between gap-2">
            {mobileExpandedSection === null ? (
              <div className="flex items-center gap-2.5">
                <img
                  src={IMAGES.logoMimos}
                  alt=""
                  width={36}
                  height={36}
                  className="w-9 h-9 rounded-full p-0.5 bg-[#EDF5FD]"
                />
                <div className="flex flex-col leading-tight">
                  <span className="font-semibold text-sm tracking-tight text-[#002147]">
                    TINTORERÍA{' '}
                    <span className="text-[#0F76BB]">MIMOS NAVIA</span>
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
                    Vigo
                  </span>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={closeMobileSubmenu}
                className="min-h-[44px] pl-1 pr-3 -ml-1 inline-flex items-center gap-1 rounded-xl text-sm font-semibold text-[#0C65A1] hover:bg-[#EDF5FD] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                <span>Menú</span>
              </button>
            )}

            {mobileExpandedSection !== null && (
              <span className="text-sm font-semibold text-[#002147] truncate">
                {mobileExpandedSection === 'tintoreria' && 'Tintorería y lavandería'}
                {mobileExpandedSection === 'limpieza' && 'Limpieza profesional'}
                {mobileExpandedSection === 'apartamentos' && 'Alojamientos turísticos'}
                {mobileExpandedSection === 'alfombras' && 'Alfombras'}
                {mobileExpandedSection === 'puntos' && 'Puntos Mimos'}
              </span>
            )}

            <button
              ref={mobileCloseBtnRef}
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-xl text-slate-600 hover:text-[#002147] hover:bg-[#EDF5FD] focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#0F76BB] transition-colors cursor-pointer"
              aria-label="Cerrar menú"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Área de contenido con scroll independiente y transición lateral */}
          <div ref={mobileScrollRef} className="flex-1 overflow-y-auto px-4 py-2">
            {/* NIVEL 1: Secciones reales de la web + Blog al final */}
            {mobileExpandedSection === null && (
              <div
                key="mobile-root"
                className={mobileSlideDirection === 'back' ? 'animate-slide-in-left' : ''}
              >
                <nav aria-label="Navegación principal" className="divide-y divide-slate-100">
                  {[
                    {
                      id: 'tintoreria',
                      title: 'Tintorería y lavandería',
                      desc: 'Trajes, ceremonia, colada, hogar y domicilio',
                    },
                    {
                      id: 'limpieza',
                      title: 'Limpieza profesional',
                      desc: 'Casas, oficinas, comunidades, sofás y empresas',
                    },
                    {
                      id: 'apartamentos',
                      title: 'Alojamientos turísticos',
                      desc: 'Limpieza en rotación y lencería para anfitriones',
                    },
                    {
                      id: 'alfombras',
                      title: 'Alfombras',
                      desc: 'Limpieza por fibra y arreglo de flecos y bordes',
                    },
                    {
                      id: 'puntos',
                      title: 'Puntos Mimos',
                      desc: '3 tiendas propias en Vigo y 5 colaboradores',
                    },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => openMobileSubmenu(cat.id)}
                      className="w-full min-h-[52px] py-2.5 px-2 flex items-center justify-between gap-3 text-left rounded-xl hover:bg-[#EDF5FD]/60 active:bg-[#EDF5FD] transition-colors cursor-pointer"
                    >
                      <div className="min-w-0">
                        <span className="block text-[15px] font-semibold text-[#002147] leading-snug">
                          {cat.title}
                        </span>
                        <span className="block text-xs text-slate-600 mt-0.5 truncate">
                          {cat.desc}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-500 shrink-0" aria-hidden="true" />
                    </button>
                  ))}

                  {[
                    {
                      title: 'Costura y arreglos',
                      desc: 'Taller propio en Gregorio Espino y Venezuela',
                      href: '/arreglos-de-ropa-vigo',
                    },
                    {
                      title: 'Limpieza de sofás',
                      desc: 'Tapicerías, sillones y colchones a domicilio',
                      href: '/limpieza-sofas-vigo',
                    },
                    {
                      title: 'Blog y guías textiles',
                      desc: 'Consejos de cuidado textil y limpieza en casa',
                      href: '/blog',
                    },
                  ].map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(link.href, e)}
                      className={`w-full min-h-[52px] py-2.5 px-2 flex items-center justify-between gap-3 text-left rounded-xl transition-colors ${
                        currentPath === link.href
                          ? 'bg-[#EDF5FD] text-[#0C65A1]'
                          : 'hover:bg-[#EDF5FD]/60 active:bg-[#EDF5FD]'
                      }`}
                    >
                      <div className="min-w-0">
                        <span
                          className={`block text-[15px] font-semibold leading-snug ${
                            currentPath === link.href ? 'text-[#0C65A1]' : 'text-[#002147]'
                          }`}
                        >
                          {link.title}
                        </span>
                        <span className="block text-xs text-slate-600 mt-0.5 truncate">
                          {link.desc}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#0C65A1] shrink-0" aria-hidden="true" />
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* NIVEL 2A: TINTORERÍA Y LAVANDERÍA */}
            {mobileExpandedSection === 'tintoreria' && (
              <div key="mobile-tintoreria" className="animate-slide-in-right space-y-5 py-2">
                <a
                  href="/#servicios"
                  onClick={(e) => handleLinkClick('/#servicios', e)}
                  className="min-h-[44px] flex items-center justify-between px-3.5 py-3 rounded-xl bg-[#EDF5FD] text-xs font-semibold text-[#002147]"
                >
                  <span>Ver catálogo completo en portada</span>
                  <ArrowRight className="w-4 h-4 text-[#0C65A1]" aria-hidden="true" />
                </a>

                {[
                  {
                    heading: 'Prendas de vestir y sastrería',
                    items: [
                      { title: 'Tintorería profesional', desc: 'Trajes, abrigos, sedas y desmanchado técnico', href: '/tintoreria-vigo' },
                      { title: 'Vestidos de novia y ceremonia', desc: 'Novia, fiesta, comunión, bautizo y chaqués', href: '/limpieza-vestidos-novia-ceremonia-vigo' },
                      { title: 'Planchado artesanal', desc: 'Camisas en percha o dobladas sin brillos', href: '/planchado-vigo' },
                      { title: 'Pieles, cuero y ante', desc: 'Ante, nobuk, doble faz y peletería', href: '/limpieza-pieles-cuero-vigo' },
                    ],
                  },
                  {
                    heading: 'Hogar, lavandería y costura',
                    items: [
                      { title: 'Lavandería profesional atendida', desc: 'Plumíferos, anoraks y ropa técnica sin monedas', href: '/lavanderia-vigo' },
                      { title: 'Colada familiar y ropa diaria', desc: 'Lavar y doblar o lavado con planchado combinado', href: '/colada-familiar-vigo' },
                      { title: 'Edredones, mantas y cortinas', desc: 'Plumas, colchas, estores y secado gran formato', href: '/textiles-hogar-vigo' },
                      { title: 'Costura y arreglos de ropa', desc: 'Taller in situ en Gregorio Espino y Venezuela', href: '/arreglos-de-ropa-vigo' },
                    ],
                  },
                  {
                    heading: 'Especialidades y recogida',
                    items: [
                      { title: 'Limpieza de alfombras', desc: 'Lavado por fibra con secado anti-humedad', href: '/limpieza-alfombras-vigo' },
                      { title: 'Reparación de alfombras', desc: 'Flecos, ribetes, festón y bordes por especialista', href: '/reparacion-alfombras-vigo' },
                      { title: 'Siniestros, humo e incendios', desc: 'Prueba previa de viabilidad y factura con CIF', href: '/limpieza-incendios-siniestros-vigo' },
                      { title: 'Recogida y entrega a domicilio', desc: 'Vigo, comarca y polígonos según ruta y mínimo', href: '/recogida-a-domicilio' },
                    ],
                  },
                ].map((group) => (
                  <div key={group.heading}>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0C65A1] pb-1.5 mb-2 border-b border-slate-200">
                      {group.heading}
                    </p>
                    <div className="space-y-1">
                      {group.items.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={(e) => handleLinkClick(item.href, e)}
                          className={`min-h-[52px] flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                            currentPath === item.href ? 'bg-[#EDF5FD]' : 'hover:bg-[#EDF5FD]'
                          }`}
                        >
                          <div className="min-w-0">
                            <span className="block text-sm font-semibold text-[#002147] leading-snug">
                              {item.title}
                            </span>
                            <span className="block text-xs text-slate-600 mt-0.5 leading-snug">
                              {item.desc}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* NIVEL 2B: LIMPIEZA PROFESIONAL */}
            {mobileExpandedSection === 'limpieza' && (
              <div key="mobile-limpieza" className="animate-slide-in-right space-y-6 py-2">
                <div>
                  <div className="pb-2 mb-2.5 border-b border-slate-200">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#0C65A1]">
                      01 · Instalaciones y Sedes
                    </span>
                    <h3 className="text-sm font-semibold text-[#002147] mt-0.5">
                      Limpieza técnica de inmuebles en Vigo
                    </h3>
                  </div>
                  <div className="space-y-1">
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
                    ].map((item, idx) => (
                      <a
                        key={idx}
                        href={item.url}
                        onClick={(e) => handleLinkClick(item.url, e)}
                        className="min-h-[52px] flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-[#EDF5FD] transition-colors"
                      >
                        <div className="min-w-0">
                          <span className="block text-sm font-semibold text-[#002147] leading-snug">
                            {item.title}
                          </span>
                          <span className="block text-xs text-slate-600 mt-0.5 leading-snug">
                            {item.desc}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="pb-2 mb-2.5 border-b border-slate-200">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#0C65A1]">
                      02 · Cuidado Textil y Tapicerías
                    </span>
                    <h3 className="text-sm font-semibold text-[#002147] mt-0.5">
                      Tratamiento profesional in situ y en planta
                    </h3>
                  </div>
                  <div className="space-y-1.5">
                    <a
                      href="/limpieza-sofas-vigo"
                      onClick={(e) => handleLinkClick('/limpieza-sofas-vigo', e)}
                      className="block px-3.5 py-3 rounded-xl bg-[#F4F9FE] hover:bg-[#EDF5FD] transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#002147]">
                          <Sparkles className="w-4 h-4 text-[#0C65A1] shrink-0" aria-hidden="true" />
                          <span>Limpieza de sofás (Destacado)</span>
                        </span>
                        <span className="text-[10px] font-semibold uppercase text-[#13733B] bg-[#13733B]/10 px-2 py-0.5 rounded-sm shrink-0">
                          A domicilio
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-snug">
                        Inyección-extracción e higienización profunda en tu propia vivienda sin desmontar el sofá.
                      </p>
                    </a>

                    <a
                      href="/limpieza-sofas-vigo"
                      onClick={(e) => handleLinkClick('/limpieza-sofas-vigo', e)}
                      className="min-h-[52px] flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-[#EDF5FD] transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="block text-sm font-semibold text-[#002147]">
                          Higienización in situ de tapicerías y colchones
                        </span>
                        <span className="block text-xs text-slate-600 mt-0.5 leading-snug">
                          Sillones, sillas tapizadas, cabeceros de cama, colchones y fundas desenfundables.
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                    </a>

                    <a
                      href="/servicios-empresas"
                      onClick={(e) => handleLinkClick('/servicios-empresas', e)}
                      className="min-h-[52px] flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-[#EDF5FD] transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="block text-sm font-semibold text-[#002147]">
                          Lavandería para empresas y negocios
                        </span>
                        <span className="block text-xs text-slate-600 mt-0.5 leading-snug">
                          Toallas de peluquerías y clínicas, vestuario laboral (suciedad normal) y factura mensual con CIF.
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* NIVEL 2C: ALOJAMIENTOS TURÍSTICOS */}
            {mobileExpandedSection === 'apartamentos' && (
              <div key="mobile-apartamentos" className="animate-slide-in-right space-y-3 py-2">
                <div className="pb-2 border-b border-slate-200">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#0C65A1]">
                    Viviendas turísticas y Airbnb en Vigo
                  </span>
                  <h3 className="text-sm font-semibold text-[#002147] mt-0.5">
                    Soluciones de lavandería y limpieza a medida para anfitriones
                  </h3>
                </div>

                <a
                  href="/limpieza-apartamentos-turisticos-vigo"
                  onClick={(e) => handleLinkClick('/limpieza-apartamentos-turisticos-vigo', e)}
                  className="block p-4 rounded-2xl bg-[#F4F9FE] border border-[#002147]/10 space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-white text-[#0C65A1] inline-flex items-center justify-center font-semibold text-xs">
                      01
                    </span>
                    <span className="text-sm font-semibold text-[#002147]">
                      Servicio de Limpieza y Lavandería
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Servicio completo de limpieza del apartamento en cada rotación y suministro de ropa de cama y toallas higienizadas con planchado profesional entre huéspedes.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0C65A1]">
                    <span>Ver modalidad y presupuesto a medida</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </a>

                <a
                  href="/limpieza-apartamentos-turisticos-vigo"
                  onClick={(e) => handleLinkClick('/limpieza-apartamentos-turisticos-vigo', e)}
                  className="block p-4 rounded-2xl bg-[#F4F9FE] border border-[#002147]/10 space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-white text-[#002147] inline-flex items-center justify-center font-semibold text-xs">
                      02
                    </span>
                    <span className="text-sm font-semibold text-[#002147]">
                      Coordinación Integral de Limpieza y Lavandería
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tú gestionas tus reservas y calendario. Mimos asume la parte operativa crítica: limpieza exhaustiva en cada checkout, supervisión básica y entrega puntual de lencería hotelera impecable.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0C65A1]">
                    <span>Consultar propuesta a medida</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </a>
              </div>
            )}

            {/* NIVEL 2D: ALFOMBRAS */}
            {mobileExpandedSection === 'alfombras' && (
              <div key="mobile-alfombras" className="animate-slide-in-right space-y-3 py-2">
                <p className="text-xs font-semibold text-slate-600">
                  Recogida a domicilio o entrega en nuestras 3 tiendas de Vigo:
                </p>

                <a
                  href="/limpieza-alfombras-vigo"
                  onClick={(e) => handleLinkClick('/limpieza-alfombras-vigo', e)}
                  className="block p-4 rounded-2xl bg-[#F4F9FE] border border-[#002147]/10 space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-white text-[#0C65A1] inline-flex items-center justify-center font-semibold text-xs">
                      01
                    </span>
                    <span className="text-sm font-semibold text-[#002147]">
                      Limpieza de alfombras
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Lavado adaptado según fibra y reverso (lana, seda, yute, algodón o fibras modernas) con secado completo anti-humedad.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0C65A1]">
                    <span>Ver limpieza de alfombras</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </a>

                <a
                  href="/reparacion-alfombras-vigo"
                  onClick={(e) => handleLinkClick('/reparacion-alfombras-vigo', e)}
                  className="block p-4 rounded-2xl bg-[#F4F9FE] border border-[#002147]/10 space-y-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-white text-[#002147] inline-flex items-center justify-center font-semibold text-xs">
                      02
                    </span>
                    <span className="text-sm font-semibold text-[#002147]">
                      Arreglo y reparación de alfombras
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Restauración artesanal de flecos, festón, ribetes, descosidos y bordes mediante especialista.
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#0C65A1]">
                    <span>Ver arreglos de alfombras</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </a>
              </div>
            )}

            {/* NIVEL 2E: PUNTOS MIMOS (PROPIOS VS COLABORADORES + TARJETA CREMA CON RIBETE AZUL) */}
            {mobileExpandedSection === 'puntos' && (
              <div key="mobile-puntos" className="animate-slide-in-right space-y-5 py-2">
                {/* 3 Tiendas Propias en Vigo */}
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-200">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#002147]">
                      <Store className="w-3.5 h-3.5 text-[#0C65A1]" aria-hidden="true" />
                      <span>3 Tiendas Propias en Vigo</span>
                    </span>
                    <a
                      href="/puntos-mimos"
                      onClick={(e) => handleLinkClick('/puntos-mimos', e)}
                      className="min-h-[44px] px-2 text-xs font-semibold text-[#0C65A1] inline-flex items-center gap-1"
                    >
                      <span>Ver mapa</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>

                  <div className="rounded-2xl bg-[#F4F9FE] border border-[#002147]/12 p-2.5 space-y-1.5">
                    {[
                      {
                        nombre: 'Sede Central Navia',
                        badge: 'Central',
                        badgeClass: 'bg-[#002147] text-white',
                        direccion: 'C/ Teixugueiras, 11, bajo 9 · 986 12 51 41',
                        url: '/tienda-mimos-navia-vigo',
                      },
                      {
                        nombre: 'Mimos Gregorio Espino',
                        badge: 'Taller in situ',
                        badgeClass: 'bg-[#0C65A1] text-white',
                        direccion: 'Alcalde Gregorio Espino, 42 · 986 19 27 87',
                        url: '/tienda-mimos-gregorio-espino-vigo',
                      },
                      {
                        nombre: 'Mimos Venezuela',
                        badge: 'Taller in situ',
                        badgeClass: 'bg-[#0C65A1] text-white',
                        direccion: 'Rúa de Venezuela, 29, Entrep. · 646 94 67 64',
                        url: '/tienda-mimos-venezuela-vigo',
                      },
                    ].map((tienda) => (
                      <a
                        key={tienda.url}
                        href={tienda.url}
                        onClick={(e) => handleLinkClick(tienda.url, e)}
                        className="block px-3 py-2.5 rounded-xl bg-white/90 hover:bg-white transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-sm font-semibold text-[#002147]">
                            {tienda.nombre}
                          </span>
                          <span className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-sm shrink-0 ${tienda.badgeClass}`}>
                            {tienda.badge}
                          </span>
                        </div>
                        <p className="text-xs font-medium text-slate-600 mt-0.5">
                          {tienda.direccion}
                        </p>
                      </a>
                    ))}
                  </div>
                </div>

                {/* 5 Comercios Colaboradores */}
                <div>
                  <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#0C65A1] pb-2 mb-2 border-b border-slate-200 w-full">
                    <MapPin className="w-3.5 h-3.5 text-[#0C65A1]" aria-hidden="true" />
                    <span>5 Comercios Colaboradores</span>
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-2">
                    Tiendas independientes asociadas donde entregas y recoges con las mismas tarifas oficiales de Mimos:
                  </p>
                  <div className="space-y-1">
                    {[
                      { localidad: 'Vigo · As Travesas', comercio: "D'Passo (Camiño Espedrigada, 9)", url: '/punto-mimos-dpasso-vigo' },
                      { localidad: 'Redondela', comercio: 'Mimos Redondela (C/ José Regojo, 29)', url: '/zonas/redondela' },
                      { localidad: 'Gondomar', comercio: 'Puntadas No Aire (costura y recepción)', url: '/zonas/gondomar' },
                      { localidad: 'Ponteareas', comercio: 'Arregla2 (C/ Argentina, 4)', url: '/zonas/ponteareas' },
                      { localidad: 'O Porriño', comercio: 'Telas y Más (C/ Manuel Rodríguez, 30)', url: '/zonas/o-porrino' },
                    ].map((punto) => (
                      <a
                        key={punto.url}
                        href={punto.url}
                        onClick={(e) => handleLinkClick(punto.url, e)}
                        className="min-h-[48px] flex items-center justify-between gap-2 px-3 py-2 rounded-xl hover:bg-[#EDF5FD] transition-colors"
                      >
                        <div className="min-w-0">
                          <span className="block text-sm font-semibold text-[#002147]">
                            {punto.localidad}
                          </span>
                          <span className="block text-xs text-slate-600 truncate">
                            {punto.comercio}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" aria-hidden="true" />
                      </a>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 mt-3 border-t border-slate-200">
                    <a
                      href="/contacto"
                      onClick={(e) => handleLinkClick('/contacto', e)}
                      className="min-h-[44px] flex items-center justify-between px-3 py-2 rounded-xl bg-[#F4F9FE] hover:bg-[#EDF5FD] text-xs font-semibold text-[#002147]"
                    >
                      <span>Contacto y horarios</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#0C65A1] shrink-0" aria-hidden="true" />
                    </a>
                    <a
                      href="/blog"
                      onClick={(e) => handleLinkClick('/blog', e)}
                      className="min-h-[44px] flex items-center justify-between px-3 py-2 rounded-xl bg-[#F4F9FE] hover:bg-[#EDF5FD] text-xs font-semibold text-[#002147]"
                    >
                      <span>Blog y guías textiles</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#0C65A1] shrink-0" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Captación comercios: crema con ribete azul Mimos */}
                <div className="rounded-2xl bg-[#FAF9F6] border border-[#0F76BB] p-4 space-y-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#0C65A1]">
                    ¿Quieres ser un punto de recogida Mimos?
                  </p>
                  <h4 className="text-sm font-semibold text-[#002147] leading-snug">
                    ¿Tienes un negocio y quieres más ingresos y tránsito de clientes?
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700 leading-snug">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Servicio complementario de entrega y recogida en tu mostrador.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Más clientes y ventas sin cuotas ni inversión inicial.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>Nosotros nos encargamos de todo (furgoneta, resguardos y limpieza en Vigo).</span>
                    </li>
                  </ul>
                  <a
                    href="/se-punto-colaborador"
                    onClick={(e) => handleLinkClick('/se-punto-colaborador', e)}
                    className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full bg-[#0F76BB] hover:bg-[#002147] text-white text-xs font-semibold px-4 py-2.5 transition-colors"
                  >
                    <span>Quiero ser punto colaborador</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Barra inferior fija de acción dentro del menú móvil */}
          <div className="shrink-0 border-t border-slate-200 bg-[#F4F9FE]/80 px-4 pt-3 pb-[max(0.875rem,env(safe-area-inset-bottom))] space-y-2">
            <button
              type="button"
              onClick={() => {
                skipMobileRestoreFocusRef.current = true;
                setMobileMenuOpen(false);
                setIsTrackingModalOpen(true);
              }}
              className="w-full min-h-[44px] flex items-center justify-center gap-2 border font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors cursor-pointer bg-white hover:bg-[#EDF5FD] border-[#002147]/15 text-[#002147]"
            >
              <Package className="w-4 h-4 text-[#0C65A1]" aria-hidden="true" />
              <span>Consultar estado de mi pedido</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={CONTACT_INFO.whatsappGeneralHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(currentPath, 'drawer_whatsapp')}
                className="min-h-[44px] flex items-center justify-center gap-1.5 bg-[#13733B] hover:bg-[#0F5C2F] text-white font-semibold text-xs py-2.5 px-3 rounded-full transition-colors"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Hablar con Mimo</span>
              </a>

              <a
                href={CONTACT_INFO.phoneHref}
                onClick={() => trackPhoneClick(currentPath, 'drawer_phone')}
                className="min-h-[44px] flex items-center justify-center gap-1.5 bg-[#002147] hover:bg-[#0F76BB] text-white font-semibold text-xs py-2.5 px-3 rounded-xl transition-colors"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="font-mono tracking-tight">{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
