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
  Receipt,
  Package,
} from 'lucide-react';
import {
  CONTACT_INFO,
  IMAGES,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';

interface HeaderProps {
  currentPath: string;
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

type ActiveMegaMenu = 'tintoreria' | 'limpieza' | 'apartamentos' | 'puntos' | null;

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [activeMenu, setActiveMenu] = useState<ActiveMegaMenu>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const menuCloseTimeoutRef = useRef<number | null>(null);

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

  // Cierre de menús y modales con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null);
        setMobileMenuOpen(false);
        setIsTrackingModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setActiveMenu(null);
    setMobileMenuOpen(false);
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
    setMobileMenuOpen(false);
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

      {/* Cabecera Principal Sticky con Fondo Azul Marino Corporativo */}
      <header
        className="sticky top-0 z-50 bg-[#002147] text-white border-b border-white/10 shadow-md select-none transition-colors"
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
                className="flex items-center gap-3 group focus:outline-hidden rounded-xl pr-1"
                aria-label="Tintorería Mimos - Volver a la portada principal"
              >
                <img
                  src={IMAGES.logoMimos}
                  alt="Tintorería Mimos Navia"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain rounded-full bg-white/10 p-1 border border-white/20 shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex flex-col">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight text-white leading-tight font-serif sm:font-sans">
                    TINTORERÍA <span className="text-[#60B5F6]">MIMOS</span>
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-300 tracking-wider uppercase">
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
              className="hidden lg:block flex-1 max-w-2xl xl:max-w-3xl mx-1"
              aria-label="Navegación principal estructurada"
            >
              <div className="grid grid-cols-4 gap-x-2 gap-y-1">
                {/* ----------------- FILA SUPERIOR: Accesos directos y teléfono ----------------- */}
                {/* Columna 1 Superior: Costura y arreglos */}
                <div className="flex items-center justify-center">
                  <a
                    href="/arreglos-de-ropa-vigo"
                    onClick={(e) => handleLinkClick('/arreglos-de-ropa-vigo', e)}
                    onMouseEnter={() => setActiveMenu(null)}
                    className={`w-full text-center py-1 px-1.5 rounded-md transition-colors text-xs font-bold truncate ${
                      currentPath === '/arreglos-de-ropa-vigo'
                        ? 'bg-white/20 text-white font-extrabold'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                    title="Taller propio de costura y arreglos de ropa en Vigo"
                  >
                    Costura y arreglos
                  </a>
                </div>

                {/* Columna 2 Superior: Blog */}
                <div className="flex items-center justify-center">
                  <a
                    href="/blog"
                    onClick={(e) => handleLinkClick('/blog', e)}
                    onMouseEnter={() => setActiveMenu(null)}
                    className={`w-full text-center py-1 px-1.5 rounded-md transition-colors text-xs font-bold truncate ${
                      currentPath.startsWith('/blog')
                        ? 'bg-white/20 text-white font-extrabold'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                    title="Blog con consejos y guías prácticas de cuidado textil"
                  >
                    Blog
                  </a>
                </div>

                {/* Columna 3 Superior: Contacto */}
                <div className="flex items-center justify-center">
                  <a
                    href="/contacto"
                    onClick={(e) => handleLinkClick('/contacto', e)}
                    onMouseEnter={() => setActiveMenu(null)}
                    className={`w-full text-center py-1 px-1.5 rounded-md transition-colors text-xs font-bold truncate ${
                      currentPath === '/contacto'
                        ? 'bg-white/20 text-white font-extrabold'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                    title="Contacto, horarios, WhatsApp y formulario directo"
                  >
                    Contacto
                  </a>
                </div>

                {/* Columna 4 Superior: Teléfono de contacto directo */}
                <div className="flex items-center justify-center">
                  <a
                    href={CONTACT_INFO.phoneHref}
                    onClick={() => trackPhoneClick(currentPath, 'header')}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-1 px-1.5 rounded-md text-slate-200 hover:text-white hover:bg-white/10 transition-colors text-xs font-bold truncate"
                    title="Llamar directamente a Tintorería Mimos Navia"
                  >
                    <Phone className="w-3 h-3 text-[#60B5F6] shrink-0" aria-hidden="true" />
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
                        ? 'bg-white/20 text-white border-white/30 shadow-xs'
                        : 'text-slate-100 hover:text-white hover:bg-white/10 border-transparent'
                    }`}
                    title="Ver catálogo de tintorería y lavandería (pasa el ratón para desglose)"
                  >
                    <span className="truncate">Tintorería y lavandería</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                        activeMenu === 'tintoreria' ? 'rotate-180 text-[#60B5F6]' : 'text-slate-400'
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
                        ? 'bg-white/20 text-white border-white/30 shadow-xs'
                        : 'text-slate-100 hover:text-white hover:bg-white/10 border-transparent'
                    }`}
                    title="Limpieza técnica de oficinas, comunidades y sofás a domicilio"
                  >
                    <span className="truncate">Limpieza profesional</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                        activeMenu === 'limpieza' ? 'rotate-180 text-[#60B5F6]' : 'text-slate-400'
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
                        ? 'bg-white/20 text-white border-white/30 shadow-xs'
                        : 'text-slate-100 hover:text-white hover:bg-white/10 border-transparent'
                    }`}
                    title="Servicios para apartamentos turísticos y Airbnb en Vigo"
                  >
                    <span className="truncate">Alojamientos turísticos</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                        activeMenu === 'apartamentos' ? 'rotate-180 text-[#60B5F6]' : 'text-slate-400'
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
                        ? 'bg-white/20 text-white border-white/30 shadow-xs'
                        : 'text-slate-100 hover:text-white hover:bg-white/10 border-transparent'
                    }`}
                    title="Tiendas propias y puntos colaboradores con mapa interactivo"
                  >
                    <span className="truncate">Puntos Mimos</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${
                        activeMenu === 'puntos' ? 'rotate-180 text-[#60B5F6]' : 'text-slate-400'
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
                className="w-full h-[32px] inline-flex items-center justify-center gap-1.5 bg-[#178A47] hover:bg-[#126E38] text-white font-extrabold text-xs px-3 rounded-lg transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Hablar con Mimo</span>
              </a>

              {/* Botón inferior: Consultar pedido (Abre modal de seguimiento) */}
              <button
                type="button"
                onClick={() => setIsTrackingModalOpen(true)}
                className="w-full h-[32px] inline-flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 text-slate-100 font-bold text-xs px-3 rounded-lg transition-colors cursor-pointer"
                title="Consultar el estado de tu encargo o ticket oficial"
              >
                <Package className="w-3.5 h-3.5 text-[#60B5F6] shrink-0" aria-hidden="true" />
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
                className="inline-flex items-center justify-center p-2 rounded-lg bg-[#178A47] text-white hover:bg-[#126E38] transition-colors"
                aria-label="WhatsApp con Mimo"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-hidden"
                aria-expanded={mobileMenuOpen}
                aria-label="Abrir menú de navegación"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            DESPLEGABLE 1: TINTORERÍA Y LAVANDERÍA (TARJETAS MODULARES ESTILO PUNTOS MIMOS)
            ========================================================================= */}
        {activeMenu === 'tintoreria' && (
          <div
            className="hidden lg:block absolute left-0 right-0 top-full bg-[#FAF8F5] text-slate-800 border-b border-[#EADBCA] shadow-[0_25px_50px_-12px_rgba(44,24,16,0.18)] animate-curtain-drop z-50"
            onMouseEnter={() => handleMouseEnterMenu('tintoreria')}
            onMouseLeave={handleMouseLeaveMenu}
          >
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-7">
              {/* Barra superior del menú */}
              <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#EADBCA]/60">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C85A17]">
                  01 · Tintorería, Lavandería y Cuidado Textil en Vigo
                </span>
                <a
                  href="/#servicios"
                  onClick={(e) => handleLinkClick('/#servicios', e)}
                  className="text-xs font-bold text-[#0284C7] hover:underline inline-flex items-center gap-1"
                >
                  <span>Ver catálogo completo en portada</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Cuadrícula de tarjetas en 3 columnas */}
              <div className="grid grid-cols-3 gap-5">
                {/* COLUMNA 1: Ropa de vestir y Sastrería */}
                <div className="space-y-4">
                  {/* Tarjeta 1: Tintorería Profesional */}
                  <a
                    href="/tintoreria-vigo"
                    onClick={(e) => handleLinkClick('/tintoreria-vigo', e)}
                    className="group block p-4 rounded-xl border border-[#EADBCA] bg-white hover:border-[#002147] hover:shadow-xs transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                        Tintorería Profesional
                      </span>
                      <span className="text-[10px] font-mono uppercase bg-[#002147] text-white px-2 py-0.5 rounded-sm font-bold">
                        Prendas delicadas
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-700 mt-1.5">
                      Trajes, americanas, vestidos de fiesta, novias, comunión y abrigos.
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Desmanchado técnico manual y limpieza ecológica en seco Wet Cleaning.
                    </p>
                    <div className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-[#0284C7] group-hover:text-[#002147]">
                      <span>Ver prendas y tratamientos</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </a>

                  {/* Tarjeta 2: Planchado Profesional */}
                  <a
                    href="/planchado-vigo"
                    onClick={(e) => handleLinkClick('/planchado-vigo', e)}
                    className="group block p-4 rounded-xl border border-[#EADBCA] bg-white hover:border-[#002147] hover:shadow-xs transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                        Planchado Artesanal
                      </span>
                      <span className="text-[10px] font-mono uppercase bg-[#C85A17] text-white px-2 py-0.5 rounded-sm font-bold">
                        Sastrería
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-700 mt-1.5">
                      Camisas en percha o dobladas, pantalones y mantelerías.
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Acabados sin brillos en mesas de vaporización y aspiración alemanas.
                    </p>
                    <div className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-[#0284C7] group-hover:text-[#002147]">
                      <span>Ver planchado profesional</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </a>
                </div>

                {/* COLUMNA 2: Hogar y Colada */}
                <div className="space-y-4">
                  {/* Tarjeta 3: Textiles del Hogar */}
                  <a
                    href="/textiles-hogar-vigo"
                    onClick={(e) => handleLinkClick('/textiles-hogar-vigo', e)}
                    className="group block p-4 rounded-xl border border-[#EADBCA] bg-white hover:border-[#002147] hover:shadow-xs transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                        Textiles del Hogar
                      </span>
                      <span className="text-[10px] font-mono uppercase bg-[#0F76BB] text-white px-2 py-0.5 rounded-sm font-bold">
                        Hogar
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-700 mt-1.5">
                      Edredones de plumas, mantas, colchas, fundas de sofá y cortinas.
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Tratamiento antiácaros, desapelmazado térmico y secado controlado.
                    </p>
                    <div className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-[#0284C7] group-hover:text-[#002147]">
                      <span>Ver textiles del hogar</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </a>

                  {/* Tarjeta 4: Colada Familiar y Ropa Diaria */}
                  <a
                    href="/colada-familiar-vigo"
                    onClick={(e) => handleLinkClick('/colada-familiar-vigo', e)}
                    className="group block p-4 rounded-xl border border-[#EADBCA] bg-white hover:border-[#002147] hover:shadow-xs transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                        Colada Familiar y Ropa Diaria
                      </span>
                      <span className="text-[10px] font-mono uppercase bg-[#178A47] text-white px-2 py-0.5 rounded-sm font-bold">
                        Por volumen
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-700 mt-1.5">
                      Ropa de uso cotidiano, toallas y sábanas para particulares y familias.
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Lavado higiénico, secado suave y doblado perfecto listo para armario.
                    </p>
                    <div className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-[#0284C7] group-hover:text-[#002147]">
                      <span>Ver servicio de colada</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </a>
                </div>

                {/* COLUMNA 3: Especialidades y Empresas */}
                <div className="space-y-4">
                  {/* Tarjeta 5: Limpieza de Alfombras */}
                  <a
                    href="/limpieza-alfombras-vigo"
                    onClick={(e) => handleLinkClick('/limpieza-alfombras-vigo', e)}
                    className="group block p-4 rounded-xl border border-[#EADBCA] bg-white hover:border-[#002147] hover:shadow-xs transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-extrabold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                        Limpieza de Alfombras
                      </span>
                      <span className="text-[10px] font-mono uppercase bg-[#178A47] text-white px-2 py-0.5 rounded-sm font-bold">
                        A domicilio
                      </span>
                    </div>
                    <p className="text-xs font-medium text-slate-700 mt-1.5">
                      Lavado en plano, desinfección profunda y recogida en furgoneta.
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Servicio en todas nuestras tiendas o recogida directa en Vigo y comarca.
                    </p>
                    <div className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-[#0284C7] group-hover:text-[#002147]">
                      <span>Ver limpieza de alfombras</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </a>

                  {/* Tarjetas 6 y 7 en subgrid para Pieles y Siniestros/Empresas */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <a
                      href="/limpieza-pieles-cuero-vigo"
                      onClick={(e) => handleLinkClick('/limpieza-pieles-cuero-vigo', e)}
                      className="group block p-3.5 rounded-xl border border-[#EADBCA] bg-white hover:border-[#002147] hover:shadow-xs transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-extrabold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                          Pieles y Cuero
                        </span>
                        <span className="text-[9px] font-mono uppercase bg-[#002147] text-white px-1.5 py-0.5 rounded-xs font-bold">
                          Peletería
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                        Ante, nobuk, cuero y prendas delicadas de peletería.
                      </p>
                      <div className="mt-2 inline-flex items-center gap-0.5 text-[11px] font-bold text-[#0284C7] group-hover:text-[#002147]">
                        <span>Ver pieles</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    </a>

                    <a
                      href="/blog/ropa-afectada-humo-incendio-siniestro-hogar"
                      onClick={(e) => handleLinkClick('/blog/ropa-afectada-humo-incendio-siniestro-hogar', e)}
                      className="group block p-3.5 rounded-xl border border-[#EADBCA] bg-white hover:border-[#002147] hover:shadow-xs transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-extrabold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                          Siniestros
                        </span>
                        <span className="text-[9px] font-mono uppercase bg-[#C85A17] text-white px-1.5 py-0.5 rounded-xs font-bold">
                          Seguros
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                        Recuperación tras humo, incendios y desodorización técnica.
                      </p>
                      <div className="mt-2 inline-flex items-center gap-0.5 text-[11px] font-bold text-[#0284C7] group-hover:text-[#002147]">
                        <span>Ver protocolo</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            DESPLEGABLE 2: LIMPIEZA PROFESIONAL (2 COLUMNAS)
            ========================================================================= */}
        {activeMenu === 'limpieza' && (
          <div
            className="hidden lg:block absolute left-0 right-0 top-full bg-[#FAF8F5] text-slate-800 border-b border-[#EADBCA] shadow-[0_25px_50px_-12px_rgba(44,24,16,0.18)] animate-curtain-drop z-50"
            onMouseEnter={() => handleMouseEnterMenu('limpieza')}
            onMouseLeave={handleMouseLeaveMenu}
          >
            <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
              <div className="grid grid-cols-2 gap-10">
                {/* Columna 1: Instalaciones y Sedes */}
                <div className="space-y-3 border-r border-[#EADBCA]/60 pr-8">
                  <span className="inline-block pb-1 text-xs font-mono font-bold uppercase tracking-widest text-[#C85A17]">
                    01 · Instalaciones y Sedes
                  </span>
                  <h3 className="text-base font-extrabold text-[#002147]">
                    Limpieza técnica de inmuebles en Vigo
                  </h3>
                  <ul className="space-y-1.5 pt-1">
                    {[
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
                      <li key={idx}>
                        <a
                          href={item.url}
                          onClick={(e) => handleLinkClick(item.url, e)}
                          className="group block p-2 rounded-lg hover:bg-[#FFF2E6] transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#0284C7] group-hover:text-[#002147]">
                              {item.title}
                            </span>
                            <ArrowRight className="w-3.5 h-3.5 text-[#C85A17] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">{item.desc}</p>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Columna 2: Cuidado Textil y Tapicerías */}
                <div className="space-y-3">
                  <span className="inline-block pb-1 text-xs font-mono font-bold uppercase tracking-widest text-[#C85A17]">
                    02 · Cuidado Textil y Tapicerías
                  </span>
                  <h3 className="text-base font-extrabold text-[#002147]">
                    Tratamiento profesional in situ y en planta
                  </h3>
                  <div className="space-y-3 pt-1">
                    <a
                      href="/textiles-hogar-vigo"
                      onClick={(e) => handleLinkClick('/textiles-hogar-vigo', e)}
                      className="group block p-3.5 rounded-xl border border-[#EADBCA] bg-white hover:border-[#C85A17]/60 hover:shadow-xs transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#002147]">
                          <Sparkles className="w-3.5 h-3.5 text-[#C85A17]" />
                          <span>Limpieza de sofás (Servicio destacado)</span>
                        </span>
                        <span className="text-[10px] font-mono uppercase bg-[#178A47]/10 text-[#178A47] font-bold px-2 py-0.5 rounded-sm">
                          A domicilio
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Inyección-extracción y desinfección profunda en tu propio hogar o local sin desmontar piezas.
                      </p>
                    </a>

                    <a
                      href="/textiles-hogar-vigo"
                      onClick={(e) => handleLinkClick('/textiles-hogar-vigo', e)}
                      className="group block p-3.5 rounded-xl border border-[#EADBCA] bg-white hover:border-[#C85A17]/60 hover:shadow-xs transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#002147]">
                          Higienización in situ de tapicerías
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C85A17] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-xs text-slate-600">
                        Sillas de oficina, butacas, cabeceros de cama y banquetas tapizadas.
                      </p>
                    </a>

                    <a
                      href="/servicios-empresas"
                      onClick={(e) => handleLinkClick('/servicios-empresas', e)}
                      className="group block p-3.5 rounded-xl border border-[#EADBCA] bg-white hover:border-[#C85A17]/60 hover:shadow-xs transition-all"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#002147]">
                          Cuidado textil regular para empresas
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#C85A17] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-xs text-slate-600">
                        Servicio programado de recogida y entrega para hoteles, restaurantes y comercios.
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            DESPLEGABLE 3: ALOJAMIENTOS TURÍSTICOS (2 TARJETAS ENFRENTADAS)
            ========================================================================= */}
        {activeMenu === 'apartamentos' && (
          <div
            className="hidden lg:block absolute left-0 right-0 top-full bg-[#FAF8F5] text-slate-800 border-b border-[#EADBCA] shadow-[0_25px_50px_-12px_rgba(44,24,16,0.18)] animate-curtain-drop z-50"
            onMouseEnter={() => handleMouseEnterMenu('apartamentos')}
            onMouseLeave={handleMouseLeaveMenu}
          >
            <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
              <div className="text-center max-w-xl mx-auto mb-6">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C85A17]">
                  VIVIENDAS TURÍSTICAS Y AIRBNB EN VIGO
                </span>
                <h3 className="text-lg font-extrabold text-[#002147] mt-1">
                  Soluciones de lavandería y limpieza a medida para anfitriones
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Tarjeta 1: Servicio de Limpieza y lavandería */}
                <a
                  href="/limpieza-apartamentos-turisticos-vigo"
                  onClick={(e) => handleLinkClick('/limpieza-apartamentos-turisticos-vigo', e)}
                  className="group block p-6 rounded-2xl border border-[#EADBCA] bg-white hover:border-[#C85A17] hover:shadow-md transition-all relative overflow-hidden"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#0F76BB]/10 text-[#0F76BB] flex items-center justify-center font-bold text-sm mb-3">
                    01
                  </div>
                  <h4 className="text-base font-extrabold text-[#002147] group-hover:text-[#C85A17] transition-colors">
                    Servicio de Limpieza y Lavandería
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Servicio completo de limpieza del apartamento en cada rotación y suministro de ropa de cama y toallas higienizadas con planchado profesional entre huéspedes.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] group-hover:text-[#C85A17]">
                    <span>Ver modalidad y tarifas orientativas</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>

                {/* Tarjeta 2: Coordinación integral de limpieza y lavandería */}
                <a
                  href="/limpieza-apartamentos-turisticos-vigo"
                  onClick={(e) => handleLinkClick('/limpieza-apartamentos-turisticos-vigo', e)}
                  className="group block p-6 rounded-2xl border border-[#EADBCA] bg-white hover:border-[#C85A17] hover:shadow-md transition-all relative overflow-hidden"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#C85A17]/10 text-[#C85A17] flex items-center justify-center font-bold text-sm mb-3">
                    02
                  </div>
                  <h4 className="text-base font-extrabold text-[#002147] group-hover:text-[#C85A17] transition-colors">
                    Coordinación Integral de Limpieza y Lavandería
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Tú gestionas tus reservas y calendario. Mimos asume la parte operativa crítica: limpieza exhaustiva en cada checkout, supervisión básica y entrega puntual de lencería hotelera impecable.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#0284C7] group-hover:text-[#C85A17]">
                    <span>Consultar propuesta a medida</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            DESPLEGABLE 4: PUNTOS MIMOS (2 COLUMNAS: TIENDAS PROPIAS VS PUNTOS COLABORADORES)
            ========================================================================= */}
        {activeMenu === 'puntos' && (
          <div
            className="hidden lg:block absolute left-0 right-0 top-full bg-[#FAF8F5] text-slate-800 border-b border-[#EADBCA] shadow-[0_25px_50px_-12px_rgba(44,24,16,0.18)] animate-curtain-drop z-50"
            onMouseEnter={() => handleMouseEnterMenu('puntos')}
            onMouseLeave={handleMouseLeaveMenu}
          >
            <div className="max-w-5xl mx-auto px-6 lg:px-8 py-8">
              <div className="grid grid-cols-2 gap-10">
                {/* Columna 1: Nuestras 3 tiendas propias en Vigo */}
                <div className="space-y-4 border-r border-[#EADBCA]/60 pr-8">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#C85A17]">
                      Tiendas Propias en Vigo
                    </span>
                    <a
                      href="/puntos-mimos"
                      onClick={(e) => handleLinkClick('/puntos-mimos', e)}
                      className="text-xs font-bold text-[#0284C7] hover:underline inline-flex items-center gap-1"
                    >
                      <span>Ver mapa completo</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                  <div className="space-y-3">
                    {/* Sede Navia */}
                    <a
                      href="/tienda-mimos-navia-vigo"
                      onClick={(e) => handleLinkClick('/tienda-mimos-navia-vigo', e)}
                      className="group block p-3.5 rounded-xl border border-[#EADBCA] bg-white hover:border-[#002147] transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-extrabold text-[#002147] group-hover:text-[#0F76BB]">
                          Sede Central Navia
                        </span>
                        <span className="text-[10px] font-mono uppercase bg-[#002147] text-white px-2 py-0.5 rounded-sm font-bold">
                          Central
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        C/ Teixugueiras, 11, bajo 9 · Tel. 986 12 51 41
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Planta de tintorería, planchado y recepción para taller de costura.
                      </p>
                    </a>

                    {/* Tienda Gregorio Espino */}
                    <a
                      href="/tienda-mimos-gregorio-espino-vigo"
                      onClick={(e) => handleLinkClick('/tienda-mimos-gregorio-espino-vigo', e)}
                      className="group block p-3.5 rounded-xl border border-[#EADBCA] bg-white hover:border-[#002147] transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-extrabold text-[#002147] group-hover:text-[#0F76BB]">
                          Mimos Gregorio Espino
                        </span>
                        <span className="text-[10px] font-mono uppercase bg-[#C85A17] text-white px-2 py-0.5 rounded-sm font-bold">
                          Taller in situ
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Alcalde Gregorio Espino, 44 · Tel. 986 19 27 87
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Taller propio de costura, arreglos de ropa y tintorería directa.
                      </p>
                    </a>

                    {/* Tienda Venezuela */}
                    <a
                      href="/puntos-mimos"
                      onClick={(e) => handleLinkClick('/puntos-mimos', e)}
                      className="group block p-3.5 rounded-xl border border-[#EADBCA] bg-white hover:border-[#002147] transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-extrabold text-[#002147] group-hover:text-[#0F76BB]">
                          Mimos Venezuela
                        </span>
                        <span className="text-[10px] font-mono uppercase bg-[#C85A17] text-white px-2 py-0.5 rounded-sm font-bold">
                          Taller in situ
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        C/ Venezuela, 41, bajo 1 · Tel. 646 94 67 64
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Taller propio de costura y punto directo de atención en el centro de Vigo.
                      </p>
                    </a>
                  </div>
                </div>

                {/* Columna 2: Red de Puntos Colaboradores */}
                <div className="space-y-4">
                  <span className="inline-block pb-1 text-xs font-mono font-bold uppercase tracking-widest text-[#C85A17]">
                    Puntos Colaboradores (Comarca)
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Comercios de proximidad en tu localidad donde entregar y recoger tus encargos tratados en la central de Mimos Vigo:
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {[
                      { nombre: 'Redondela', url: '/zonas/redondela' },
                      { nombre: 'Gondomar', url: '/zonas/gondomar' },
                      { nombre: 'Ponteareas', url: '/zonas/ponteareas' },
                      { nombre: 'O Porriño', url: '/zonas/o-porrino' },
                      { nombre: 'Vigo (As Travesas)', url: '/zonas/vigo' },
                      { nombre: 'Ver mapa completo', url: '/puntos-mimos' },
                    ].map((loc, idx) => (
                      <a
                        key={idx}
                        href={loc.url}
                        onClick={(e) => handleLinkClick(loc.url, e)}
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-white border border-[#EADBCA] hover:border-[#0284C7] text-xs font-bold text-[#0284C7] hover:text-[#002147] hover:bg-[#FFF2E6] transition-colors"
                      >
                        <span>{loc.nombre}</span>
                        <ArrowRight className="w-3 h-3 text-[#C85A17]" />
                      </a>
                    ))}
                  </div>

                  <div className="pt-3">
                    <a
                      href="/se-punto-colaborador"
                      onClick={(e) => handleLinkClick('/se-punto-colaborador', e)}
                      className="group flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-[#002147] to-[#0F76BB] text-white hover:opacity-95 transition-opacity"
                    >
                      <div>
                        <span className="text-xs font-bold block">
                          ¿Tienes un comercio de proximidad?
                        </span>
                        <span className="text-[11px] text-slate-200">
                          Únete a la red de puntos Mimos sin inversión inicial
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#60B5F6] group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </header>

      {/* =========================================================================
          MODAL DE SEGUIMIENTO: CONSULTAR ESTADO DE PEDIDO
          ========================================================================= */}
      {isTrackingModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-tracking-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsTrackingModalOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#071324] text-slate-900 dark:text-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsTrackingModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
              aria-label="Cerrar modal de consulta"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#002147] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Package className="w-5 h-5 text-[#60B5F6]" />
              </div>
              <div>
                <h3 id="modal-tracking-title" className="text-lg font-extrabold text-[#002147] dark:text-white">
                  Consultar estado de encargo
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Seguimiento de ticket o resguardo en Tintorería Mimos
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              Cada encargo depositado en nuestras 3 tiendas propias o en los 5 puntos colaboradores cuenta con un <strong>resguardo oficial numerado</strong>. Escribe tu número de resguardo para consultar en directo con Mimo por WhatsApp:
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const targetUrl = buildMimoWhatsAppUrl(
                  orderNumber.trim()
                    ? `Hola, Mimo. Quiero consultar el estado de mi encargo/ticket n.º ${orderNumber.trim()}: `
                    : 'Hola, Mimo. Quiero consultar el estado de mi encargo o ticket oficial: '
                );
                trackWhatsAppClick(currentPath, 'modal_order_status_submit');
                window.open(targetUrl, '_blank', 'noopener,noreferrer');
                setIsTrackingModalOpen(false);
              }}
              className="space-y-3.5"
            >
              <div>
                <label htmlFor="order-ticket-input" className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  N.º de ticket o resguardo:
                </label>
                <div className="relative">
                  <Receipt className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="order-ticket-input"
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Ej. 14258 o tu nombre"
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-[#178A47] hover:bg-[#126E38] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-98"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Consultar por WhatsApp con Mimo</span>
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">¿Prefieres consultar por teléfono?</span>
              <a
                href={CONTACT_INFO.phoneHref}
                onClick={() => trackPhoneClick(currentPath, 'modal_order_phone')}
                className="font-bold text-[#0F76BB] hover:underline inline-flex items-center gap-1"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MENÚ MÓVIL LATERAL (Drawer para pantallas pequeñas < lg)
          ========================================================================= */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación móvil"
          className="fixed inset-0 z-50 lg:hidden bg-black/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200"
        >
          <div
            className="w-full max-w-sm bg-[#002147] text-white h-full overflow-y-auto p-6 flex flex-col justify-between shadow-2xl"
          >
            <div>
              {/* Cabecera del drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2.5">
                  <img
                    src={IMAGES.logoMimos}
                    alt=""
                    width={36}
                    height={36}
                    className="w-9 h-9 rounded-full bg-white/10 p-0.5"
                  />
                  <span className="font-extrabold text-sm tracking-tight text-white">
                    TINTORERÍA MIMOS
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
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
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/10 text-left font-bold text-slate-100"
                  >
                    <span>Tintorería y lavandería</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpandedSection === 'tintoreria' ? 'rotate-180 text-[#60B5F6]' : ''
                      }`}
                    />
                  </button>
                  {mobileExpandedSection === 'tintoreria' && (
                    <div className="pl-4 pr-2 py-2 space-y-1.5 text-xs text-slate-300 border-l border-[#60B5F6]/30 ml-3">
                      <a
                        href="/tintoreria-vigo"
                        onClick={(e) => handleLinkClick('/tintoreria-vigo', e)}
                        className="block py-1 hover:text-[#60B5F6]"
                      >
                        • Tintorería profesional (Trajes, vestidos, novia)
                      </a>
                      <a
                        href="/lavanderia-vigo"
                        onClick={(e) => handleLinkClick('/lavanderia-vigo', e)}
                        className="block py-1 hover:text-[#60B5F6]"
                      >
                        • Lavandería de ropa de diario
                      </a>
                      <a
                        href="/planchado-vigo"
                        onClick={(e) => handleLinkClick('/planchado-vigo', e)}
                        className="block py-1 hover:text-[#60B5F6]"
                      >
                        • Planchado profesional
                      </a>
                      <a
                        href="/textiles-hogar-vigo"
                        onClick={(e) => handleLinkClick('/textiles-hogar-vigo', e)}
                        className="block py-1 hover:text-[#60B5F6]"
                      >
                        • Textiles del hogar (Edredones, mantas, cortinas)
                      </a>
                      <a
                        href="/colada-familiar-vigo"
                        onClick={(e) => handleLinkClick('/colada-familiar-vigo', e)}
                        className="block py-1 hover:text-[#60B5F6]"
                      >
                        • Colada familiar (por kilos)
                      </a>
                      <a
                        href="/limpieza-alfombras-vigo"
                        onClick={(e) => handleLinkClick('/limpieza-alfombras-vigo', e)}
                        className="block py-1 hover:text-[#60B5F6]"
                      >
                        • Limpieza de alfombras a domicilio
                      </a>
                      <a
                        href="/limpieza-pieles-cuero-vigo"
                        onClick={(e) => handleLinkClick('/limpieza-pieles-cuero-vigo', e)}
                        className="block py-1 hover:text-[#60B5F6]"
                      >
                        • Pieles, cuero y peletería
                      </a>
                      <a
                        href="/blog/ropa-afectada-humo-incendio-siniestro-hogar"
                        onClick={(e) => handleLinkClick('/blog/ropa-afectada-humo-incendio-siniestro-hogar', e)}
                        className="block py-1 hover:text-[#60B5F6]"
                      >
                        • Recuperación tras siniestros e incendios
                      </a>
                      <a
                        href="/servicios-empresas"
                        onClick={(e) => handleLinkClick('/servicios-empresas', e)}
                        className="block py-1 hover:text-[#60B5F6]"
                      >
                        • Lavandería para empresas y hostelería
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
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/10 text-left font-bold text-slate-100"
                  >
                    <span>Limpieza profesional</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpandedSection === 'limpieza' ? 'rotate-180 text-[#60B5F6]' : ''
                      }`}
                    />
                  </button>
                  {mobileExpandedSection === 'limpieza' && (
                    <div className="pl-4 pr-2 py-2 space-y-1.5 text-xs text-slate-300 border-l border-[#60B5F6]/30 ml-3">
                      <a
                        href="/limpieza-profesional-vigo"
                        onClick={(e) => handleLinkClick('/limpieza-profesional-vigo', e)}
                        className="block py-1 hover:text-[#60B5F6]"
                      >
                        • Oficinas, despachos y comunidades
                      </a>
                      <a
                        href="/textiles-hogar-vigo"
                        onClick={(e) => handleLinkClick('/textiles-hogar-vigo', e)}
                        className="block py-1 hover:text-[#60B5F6]"
                      >
                        • Limpieza de sofás y tapicerías in situ
                      </a>
                    </div>
                  )}
                </div>

                {/* 3. Alojamientos turísticos */}
                <a
                  href="/limpieza-apartamentos-turisticos-vigo"
                  onClick={(e) => handleLinkClick('/limpieza-apartamentos-turisticos-vigo', e)}
                  className="block py-2.5 px-3 rounded-lg hover:bg-white/10 text-slate-100 font-bold"
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
                    className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/10 text-left font-bold text-slate-100"
                  >
                    <span>Puntos Mimos y tiendas</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpandedSection === 'puntos' ? 'rotate-180 text-[#60B5F6]' : ''
                      }`}
                    />
                  </button>
                  {mobileExpandedSection === 'puntos' && (
                    <div className="pl-4 pr-2 py-2 space-y-1.5 text-xs text-slate-300 border-l border-[#60B5F6]/30 ml-3">
                      <a
                        href="/tienda-mimos-navia-vigo"
                        onClick={(e) => handleLinkClick('/tienda-mimos-navia-vigo', e)}
                        className="block py-1 hover:text-[#60B5F6]"
                      >
                        • Sede Central Navia (Teixugueiras 11)
                      </a>
                      <a
                        href="/tienda-mimos-gregorio-espino-vigo"
                        onClick={(e) => handleLinkClick('/tienda-mimos-gregorio-espino-vigo', e)}
                        className="block py-1 hover:text-[#60B5F6]"
                      >
                        • Mimos Gregorio Espino (Taller in situ)
                      </a>
                      <a
                        href="/puntos-mimos"
                        onClick={(e) => handleLinkClick('/puntos-mimos', e)}
                        className="block py-1 hover:text-[#60B5F6]"
                      >
                        • Mimos Venezuela y comarca
                      </a>
                      <a
                        href="/se-punto-colaborador"
                        onClick={(e) => handleLinkClick('/se-punto-colaborador', e)}
                        className="block py-1 text-[#60B5F6] font-bold"
                      >
                        • Quiero ser punto colaborador →
                      </a>
                    </div>
                  )}
                </div>

                {/* 5. Costura y arreglos */}
                <a
                  href="/arreglos-de-ropa-vigo"
                  onClick={(e) => handleLinkClick('/arreglos-de-ropa-vigo', e)}
                  className="block py-2.5 px-3 rounded-lg hover:bg-white/10 text-slate-100 font-bold"
                >
                  Costura y arreglos de ropa
                </a>

                {/* 6. Blog */}
                <a
                  href="/blog"
                  onClick={(e) => handleLinkClick('/blog', e)}
                  className="block py-2.5 px-3 rounded-lg hover:bg-white/10 text-slate-100 font-bold"
                >
                  Blog y consejos
                </a>

                {/* 7. Contacto */}
                <a
                  href="/contacto"
                  onClick={(e) => handleLinkClick('/contacto', e)}
                  className="block py-2.5 px-3 rounded-lg hover:bg-white/10 text-slate-100 font-bold"
                >
                  Contacto y horarios
                </a>
              </nav>

              {/* Botonera de acciones rápida en móvil */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsTrackingModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors cursor-pointer"
                >
                  <Package className="w-4 h-4 text-[#60B5F6]" />
                  <span>Consultar estado de mi pedido</span>
                </button>

                <a
                  href={CONTACT_INFO.whatsappGeneralHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick(currentPath, 'drawer_whatsapp')}
                  className="w-full flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-xs py-3 px-4 rounded-xl transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Hablar con Mimo en WhatsApp</span>
                </a>

                <a
                  href={CONTACT_INFO.phoneHref}
                  onClick={() => trackPhoneClick(currentPath, 'drawer_phone')}
                  className="w-full flex items-center justify-center gap-2 border border-slate-600 hover:border-white text-slate-200 hover:text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#60B5F6]" />
                  <span>Llamar al {CONTACT_INFO.phoneDisplay}</span>
                </a>
              </div>
            </div>

            {/* Pie del drawer */}
            <div className="pt-4 text-center text-[10px] text-slate-400">
              Tintorería Mimos Navia, S.L. · Vigo (Pontevedra)
            </div>
          </div>
        </div>
      )}
    </>
  );
};
