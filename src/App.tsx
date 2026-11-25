import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from './components/Header';
import { PreviewHeroSection } from './components/preview/PreviewHeroSection';
import { PreviewHelpNavigatorSection } from './components/preview/PreviewHelpNavigatorSection';
import { PreviewCatalogSection } from './components/preview/PreviewCatalogSection';
import { PreviewB2BAndPickupSection } from './components/preview/PreviewB2BAndPickupSection';
import { PreviewLocationsBand } from './components/preview/PreviewLocationsBand';
import { PreviewWhyAndGuidesSection } from './components/preview/PreviewWhyAndGuidesSection';
import { Footer } from './components/Footer';
import { MimoAssistant } from './components/MimoAssistant';

import { lazyWithRetry } from './utils/lazyWithRetry';

// Rutas secundarias con carga diferida (Code-Splitting Fase 5)
const BlogSection = lazyWithRetry(() =>
  import('./components/BlogSection').then((m) => ({ default: m.BlogSection }))
);
const ContactAndLocationsSection = lazyWithRetry(() =>
  import('./components/ContactAndLocationsSection').then((m) => ({
    default: m.ContactAndLocationsSection,
  }))
);
const CarpetCleaningPage = lazyWithRetry(() =>
  import('./components/CarpetCleaningPage').then((m) => ({ default: m.CarpetCleaningPage }))
);
const CarpetRepairPage = lazyWithRetry(() =>
  import('./components/CarpetRepairPage').then((m) => ({ default: m.CarpetRepairPage }))
);
const LeatherCleaningPage = lazyWithRetry(() =>
  import('./components/LeatherCleaningPage').then((m) => ({ default: m.LeatherCleaningPage }))
);
const SofaCleaningPage = lazyWithRetry(() =>
  import('./components/SofaCleaningPage').then((m) => ({ default: m.SofaCleaningPage }))
);
const ClothingAlterationsPage = lazyWithRetry(() =>
  import('./components/ClothingAlterationsPage').then((m) => ({ default: m.ClothingAlterationsPage }))
);
const BridalCeremonyPage = lazyWithRetry(() =>
  import('./components/BridalCeremonyPage').then((m) => ({ default: m.BridalCeremonyPage }))
);
const HomeTextilesPage = lazyWithRetry(() =>
  import('./components/HomeTextilesPage').then((m) => ({ default: m.HomeTextilesPage }))
);
const CleaningDivisionPage = lazyWithRetry(() =>
  import('./components/CleaningDivisionPage').then((m) => ({ default: m.CleaningDivisionPage }))
);
const HomeCleaningPage = lazyWithRetry(() =>
  import('./components/HomeCleaningPage').then((m) => ({ default: m.HomeCleaningPage }))
);
const BusinessLaundryPage = lazyWithRetry(() =>
  import('./components/BusinessLaundryPage').then((m) => ({ default: m.BusinessLaundryPage }))
);
const DisasterTextileRecoveryPage = lazyWithRetry(() =>
  import('./components/DisasterTextileRecoveryPage').then((m) => ({
    default: m.DisasterTextileRecoveryPage,
  }))
);
const ServiceDetailPage = lazyWithRetry(() =>
  import('./components/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage }))
);
const LocalZonePage = lazyWithRetry(() =>
  import('./components/LocalZonePage').then((m) => ({ default: m.LocalZonePage }))
);
const BlogArticlePage = lazyWithRetry(() =>
  import('./components/BlogArticlePage').then((m) => ({ default: m.BlogArticlePage }))
);
const LegalPage = lazyWithRetry(() =>
  import('./components/LegalPage').then((m) => ({ default: m.LegalPage }))
);
const SubsidiesPage = lazyWithRetry(() =>
  import('./components/SubsidiesPage').then((m) => ({ default: m.SubsidiesPage }))
);
const CareersPage = lazyWithRetry(() =>
  import('./components/CareersPage').then((m) => ({ default: m.CareersPage }))
);
const PuntoColaboradorPage = lazyWithRetry(() =>
  import('./components/PuntoColaboradorPage').then((m) => ({ default: m.PuntoColaboradorPage }))
);
const TiendaNaviaPage = lazyWithRetry(() =>
  import('./components/TiendaNaviaPage').then((m) => ({ default: m.TiendaNaviaPage }))
);
const TiendaGregorioEspinoPage = lazyWithRetry(() =>
  import('./components/TiendaGregorioEspinoPage').then((m) => ({ default: m.TiendaGregorioEspinoPage }))
);
const TiendaVenezuelaPage = lazyWithRetry(() =>
  import('./components/TiendaVenezuelaPage').then((m) => ({ default: m.TiendaVenezuelaPage }))
);
const PuntoDPassoPage = lazyWithRetry(() =>
  import('./components/PuntoDPassoPage').then((m) => ({ default: m.PuntoDPassoPage }))
);
const NotFoundPage = lazyWithRetry(() =>
  import('./components/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);
const PreviewPortadaPage = import.meta.env.DEV
  ? lazyWithRetry(() =>
      import('./components/PreviewPortadaPage').then((m) => ({ default: m.PreviewPortadaPage }))
    )
  : null;
import {
  ARTICULOS_BLOG_RESUMEN,
  SERVICIOS_MIMOS,
  ZONAS_RESUMEN,
} from './data/mimosData';
import {
  applyPageSEO,
  KNOWN_ROUTES,
  resolveCanonicalRoute,
} from './utils/seo';
import {
  CtaZone,
  disableAndClearGA4,
  getCookieConsentChoice,
  hasAnalyticsConsent,
  initGA4,
  setCookieConsentChoice,
  trackContactClick,
  trackPageView,
} from './utils/analytics';
import { setStoredTheme } from './utils/safeStorage';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const rawPath = window.location.pathname || '/';
      const cleanPath = rawPath.split('?')[0].split('#')[0] || '/';
      const normalized = cleanPath.length > 1 ? cleanPath.replace(/\/+$/, '') : '/';
      const canonicalPath = resolveCanonicalRoute(normalized);
      if (canonicalPath !== normalized && KNOWN_ROUTES.includes(canonicalPath)) {
        window.history.replaceState({}, '', `${canonicalPath}${window.location.hash || ''}`);
        return canonicalPath;
      }
      return cleanPath;
    }
    return '/';
  });

  const pendingHashRef = useRef<string | null>(
    typeof window !== 'undefined'
      ? window.location.hash
        ? window.location.hash.replace(/^#/, '')
        : window.location.pathname === '/contacto'
          ? 'contacto'
          : null
      : null
  );
  const [scrollNonce, setScrollNonce] = useState(0);

  const [cookieBannerOpen, setCookieBannerOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return getCookieConsentChoice() === null;
    }
    return false;
  });

  // Mantener toda la web siempre en modo claro
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    setStoredTheme(false);
  }, []);

  const isInitialMount = useRef(true);

  // Apply SEO & Schema.org on route change, manage GA4, and focus h1 for accessibility
  useEffect(() => {
    applyPageSEO(currentPath);
    const cleanRoute = (currentPath || '/').split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
    if (import.meta.env.DEV && cleanRoute === '/preview-portada') {
      document.title = 'Vista previa Portada (Piloto 2) | Tintorería Mimos';
    }
    if (hasAnalyticsConsent()) {
      initGA4();
      trackPageView(currentPath, document.title);
    } else {
      disableAndClearGA4();
    }

    // En la carga inicial de una URL no movemos el foco al H1 para que el primer Tab llegue al Skip-link
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Accesibilidad: mover foco al encabezado principal solo tras una navegación interna real
    const originActiveElement = document.activeElement as HTMLElement | null;
    let observer: MutationObserver | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let focusMoved = false;

    const isElementVisible = (el: HTMLElement): boolean => {
      if (!el.isConnected) return false;

      // Si el navegador soporta checkVisibility (Chromium, Firefox, Safari)
      if (typeof el.checkVisibility === 'function') {
        if (!el.checkVisibility({ checkOpacity: false, checkVisibilityCSS: true })) {
          return false;
        }
      }

      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') {
        return false;
      }

      // Comprobar dimensiones reales y offsetParent (salvo posición fija donde offsetParent puede ser null)
      if (el.offsetParent === null && style.position !== 'fixed') {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) {
          return false;
        }
      }

      // Comprobar que ningún ancestro esté oculto (por ejemplo contenedores ocultos por React Suspense o con atributo hidden)
      let parent = el.parentElement;
      while (parent && parent !== document.body) {
        if (parent.hasAttribute('hidden')) {
          return false;
        }
        const pStyle = window.getComputedStyle(parent);
        if (pStyle.display === 'none' || pStyle.visibility === 'hidden') {
          return false;
        }
        parent = parent.parentElement;
      }

      return true;
    };

    const tryFocusHeading = (): boolean => {
      if (focusMoved) return true;

      const currentActive = document.activeElement as HTMLElement | null;

      // No mover el foco si el usuario ya se ha movido deliberadamente a otro elemento distinto del origen y del body
      if (
        currentActive !== originActiveElement &&
        currentActive !== document.body &&
        currentActive !== null
      ) {
        return true; // El usuario ya interactuó durante la carga, no arrebatar el foco
      }

      // No mover el foco si el foco está en un campo de texto/formulario o dentro de un diálogo abierto
      const isFormInput =
        currentActive instanceof HTMLInputElement ||
        currentActive instanceof HTMLTextAreaElement ||
        currentActive instanceof HTMLSelectElement ||
        currentActive?.getAttribute('contenteditable') === 'true';
      const isInsideDialog = currentActive?.closest('[role="dialog"], dialog') !== null;

      if (isFormInput || isInsideDialog) {
        return true;
      }

      // Buscar todos los h1 en el DOM y seleccionar el primero que sea realmente visible
      const headings = Array.from(document.querySelectorAll<HTMLElement>('h1'));
      const visibleHeading = headings.find(isElementVisible);

      if (visibleHeading) {
        visibleHeading.setAttribute('tabindex', '-1');
        visibleHeading.focus({ preventScroll: true });
        // Comprobar que el foco fue efectivamente recibido por el elemento visible
        if (document.activeElement === visibleHeading) {
          focusMoved = true;
          return true;
        }
      }

      return false;
    };

    // Intento inmediato si el H1 ya está presente y visible (rutas síncronas o ya cargadas en caché)
    if (!tryFocusHeading()) {
      // Para rutas diferidas (React.lazy + Suspense), observar la inserción o visibilidad del H1 en el DOM
      const targetContainer = document.getElementById('root') || document.body;

      observer = new MutationObserver(() => {
        if (tryFocusHeading()) {
          observer?.disconnect();
          observer = null;
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
        }
      });

      observer.observe(targetContainer, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'hidden', 'class'],
      });

      // Límite de seguridad máximo de 4.5 segundos para evitar observadores colgados en redes lentas
      timeoutId = setTimeout(() => {
        if (observer) {
          observer.disconnect();
          observer = null;
        }
      }, 4500);
    }

    return () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
  }, [currentPath]);

  // Delegated listener for WhatsApp and phone clicks (fallback with data-cta-zone / data-service-id / data-store-id)
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (!hasAnalyticsConsent()) {
        return;
      }
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a[href]') as HTMLAnchorElement | null;
      if (!anchor) {
        return;
      }

      const rawHref = (anchor.getAttribute('href') || '').trim().toLowerCase();
      if (!rawHref) {
        return;
      }

      const isWhatsApp =
        rawHref.startsWith('https://wa.me/') ||
        rawHref.startsWith('http://wa.me/') ||
        rawHref.includes('api.whatsapp.com/');
      const isPhone = rawHref.startsWith('tel:');

      if (!isWhatsApp && !isPhone) {
        return;
      }

      let ctaZone: CtaZone | string = anchor.dataset.ctaZone || 'page_content';
      if (!anchor.dataset.ctaZone) {
        if (anchor.closest('header')) {
          ctaZone = 'header';
        } else if (anchor.closest('[aria-label="Mimo, asistente de Tintorería Mimos"]')) {
          ctaZone = 'mimo_assistant';
        } else if (anchor.closest('[aria-label="Accesos rápidos en móvil"]')) {
          ctaZone = 'mobile_bar';
        } else if (anchor.closest('footer')) {
          ctaZone = 'footer';
        }
      }

      trackContactClick(
        isWhatsApp ? 'whatsapp_click' : 'phone_click',
        currentPath,
        ctaZone,
        {
          service_id: anchor.dataset.serviceId || undefined,
          store_id: anchor.dataset.storeId || undefined,
        }
      );
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [currentPath]);

  // Listen to browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const nextPath = window.location.pathname || '/';
      const nextHash = window.location.hash ? window.location.hash.replace(/^#/, '') : '';
      pendingHashRef.current = nextHash || (nextPath === '/contacto' ? 'contacto' : null);
      setCurrentPath(nextPath);
      if (pendingHashRef.current) {
        setScrollNonce((n) => n + 1);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Scroll reliably to #anchor targets even after React.lazy + Suspense route mounts
  useEffect(() => {
    const targetId = pendingHashRef.current;
    if (!targetId) {
      return;
    }

    let cancelled = false;
    let observer: MutationObserver | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const cleanup = () => {
      cancelled = true;
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    const tryScrollToAnchor = (): boolean => {
      if (cancelled) return true;
      const el = document.getElementById(targetId);
      if (!el) return false;
      pendingHashRef.current = null;
      cleanup();
      requestAnimationFrame(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return true;
    };

    if (!tryScrollToAnchor()) {
      const rootEl = document.getElementById('root') || document.body;
      observer = new MutationObserver(() => {
        tryScrollToAnchor();
      });
      observer.observe(rootEl, { childList: true, subtree: true });
      intervalId = setInterval(() => {
        tryScrollToAnchor();
      }, 60);
      timeoutId = setTimeout(() => {
        pendingHashRef.current = null;
        cleanup();
      }, 3500);
    }

    return cleanup;
  }, [currentPath, scrollNonce]);

  const handleNavigate = useCallback(
    (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
      if (e) {
        e.preventDefault();
      }

      if (href.startsWith('/#') || href.startsWith('#')) {
        const hash = href.replace(/^\//, '');
        const targetId = hash.replace(/^#/, '');
        const targetUrl = `/${hash}`;
        pendingHashRef.current = targetId || null;
        window.history.pushState({}, '', targetUrl);
        setCurrentPath('/');
        setScrollNonce((n) => n + 1);
        return;
      }

      const hashIndex = href.indexOf('#');
      if (hashIndex !== -1) {
        const rawPathPart = href.slice(0, hashIndex) || '/';
        const rawHashPart = href.slice(hashIndex + 1);
        pendingHashRef.current = rawHashPart || null;
        window.history.pushState({}, '', href);
        setCurrentPath(rawPathPart);
        setScrollNonce((n) => n + 1);
        return;
      }

      if (href === '/contacto') {
        pendingHashRef.current = 'contacto';
        window.history.pushState({}, '', href);
        setCurrentPath(href);
        setScrollNonce((n) => n + 1);
        return;
      }

      pendingHashRef.current = null;
      window.history.pushState({}, '', href);
      setCurrentPath(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const handleAcceptCookies = () => {
    setCookieConsentChoice('accepted');
    setCookieBannerOpen(false);
    initGA4();
    trackPageView(currentPath, document.title);
  };

  const handleRejectCookies = () => {
    setCookieConsentChoice('rejected');
    setCookieBannerOpen(false);
    disableAndClearGA4();
  };

  // Normalizar la ruta actual sin fragmento (#) ni parámetros de consulta (?)
  const cleanCurrentPath = (currentPath || '/').split('?')[0].split('#')[0] || '/';
  const normalizedRoute =
    cleanCurrentPath.length > 1 ? cleanCurrentPath.replace(/\/+$/, '') : '/';
  const effectivePath = resolveCanonicalRoute(normalizedRoute);
  const isPreviewPortada = import.meta.env.DEV && effectivePath === '/preview-portada';
  const isKnown = KNOWN_ROUTES.includes(effectivePath) || isPreviewPortada;

  // Match route
  const articuloActivo = ARTICULOS_BLOG_RESUMEN.find((a) => a.url === effectivePath);
  const zonaActiva = ZONAS_RESUMEN.find((z) => z.url === effectivePath);
  const servicioIndividualActivo = SERVICIOS_MIMOS.find(
    (s) =>
      s.url === effectivePath &&
      s.url !== '/limpieza-apartamentos-turisticos-vigo' &&
      s.url !== '/servicios-empresas'
  );

  const [quotaExceeded, setQuotaExceeded] = useState(false);

  useEffect(() => {
    const handler = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handler);
    return () => window.removeEventListener('gmp-quota-exceeded', handler);
  }, []);

  const isLegalRoute =
    effectivePath === '/aviso-legal' ||
    effectivePath === '/privacidad' ||
    effectivePath === '/cookies';

  const handleScrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-white text-slate-900 pb-16 md:pb-0">
      {/* Aviso amable de disponibilidad de mapa para visitantes */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs sm:text-sm text-center sticky top-0 z-50 shadow-xs flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>
            El mapa interactivo se encuentra temporalmente en mantenimiento. Nuestras 3 tiendas propias y 5 puntos colaboradores atienden con total normalidad.
          </span>
          <a
            href="/#puntos"
            onClick={(e) => handleNavigate('/#puntos', e)}
            className="underline font-bold text-amber-950 hover:text-amber-700"
          >
            Ver direcciones, horarios y teléfonos
          </a>
        </div>
      )}

      {/* 1. Cabecera Fija */}
      <Header
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      {/* Contenido según ruta (Sección 6, 7 y 16 del Plan Maestro con Suspense) */}
      <React.Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center py-20 px-4">
            <div className="flex flex-col items-center gap-3 animate-pulse">
              <div className="w-9 h-9 rounded-full border-3 border-[#0F76BB] border-t-transparent animate-spin" />
              <p className="text-sm font-bold text-[#002147]">
                Cargando página...
              </p>
            </div>
          </div>
        }
      >
        {!isKnown ? (
          <NotFoundPage onNavigate={handleNavigate} />
        ) : articuloActivo ? (
          <BlogArticlePage articuloSlug={articuloActivo.slug} onNavigate={handleNavigate} />
        ) : effectivePath === '/blog' ? (
          <main id="main-content" tabIndex={-1} className="focus:outline-hidden">
            <BlogSection onNavigate={handleNavigate} isPage={true} />
          </main>
        ) : effectivePath === '/limpieza-alfombras-vigo' ? (
          <CarpetCleaningPage onNavigate={handleNavigate} />
        ) : effectivePath === '/reparacion-alfombras-vigo' ? (
          <CarpetRepairPage onNavigate={handleNavigate} />
        ) : effectivePath === '/limpieza-pieles-cuero-vigo' ? (
          <LeatherCleaningPage onNavigate={handleNavigate} />
        ) : effectivePath === '/limpieza-sofas-vigo' ? (
          <SofaCleaningPage onNavigate={handleNavigate} />
        ) : effectivePath === '/arreglos-de-ropa-vigo' ? (
          <ClothingAlterationsPage onNavigate={handleNavigate} />
        ) : effectivePath === '/limpieza-vestidos-novia-ceremonia-vigo' ? (
          <BridalCeremonyPage onNavigate={handleNavigate} />
        ) : effectivePath === '/textiles-hogar-vigo' ? (
          <HomeTextilesPage onNavigate={handleNavigate} />
        ) : effectivePath === '/limpieza-profesional-vigo' ? (
          <CleaningDivisionPage variant="limpieza" onNavigate={handleNavigate} />
        ) : effectivePath === '/limpieza-casas-vigo' ? (
          <HomeCleaningPage onNavigate={handleNavigate} />
        ) : effectivePath === '/limpieza-apartamentos-turisticos-vigo' ? (
          <CleaningDivisionPage variant="apartamentos" onNavigate={handleNavigate} />
        ) : effectivePath === '/servicios-empresas' ? (
          <BusinessLaundryPage onNavigate={handleNavigate} />
        ) : effectivePath === '/limpieza-incendios-siniestros-vigo' ? (
          <DisasterTextileRecoveryPage onNavigate={handleNavigate} />
        ) : servicioIndividualActivo ? (
          <ServiceDetailPage
            servicio={servicioIndividualActivo}
            onNavigate={handleNavigate}
          />
        ) : effectivePath === '/puntos-mimos' || effectivePath === '/contacto' ? (
          <main id="main-content" tabIndex={-1} className="focus:outline-hidden">
            <ContactAndLocationsSection
              onNavigate={handleNavigate}
              pageMode={effectivePath === '/contacto' ? 'contacto' : 'puntos'}
            />
          </main>
        ) : zonaActiva ? (
          <LocalZonePage zonaSlug={zonaActiva.slug} onNavigate={handleNavigate} />
        ) : isLegalRoute ? (
          <LegalPage
            section={effectivePath.replace('/', '') as 'aviso-legal' | 'privacidad' | 'cookies'}
            onNavigate={handleNavigate}
            onOpenCookieSettings={() => setCookieBannerOpen(true)}
          />
        ) : effectivePath === '/feder' ? (
          <SubsidiesPage variant="feder" onNavigate={handleNavigate} />
        ) : effectivePath === '/programa-bono-energia-peme-2025-in417z' ? (
          <SubsidiesPage variant="bono-energia" onNavigate={handleNavigate} />
        ) : effectivePath === '/empleo-unete-a-nosotros' ? (
          <CareersPage onNavigate={handleNavigate} />
        ) : effectivePath === '/se-punto-colaborador' ? (
          <PuntoColaboradorPage onNavigate={handleNavigate} />
        ) : effectivePath === '/tienda-mimos-navia-vigo' ? (
          <TiendaNaviaPage onNavigate={handleNavigate} />
        ) : effectivePath === '/tienda-mimos-gregorio-espino-vigo' ? (
          <TiendaGregorioEspinoPage onNavigate={handleNavigate} />
        ) : effectivePath === '/tienda-mimos-venezuela-vigo' ? (
          <TiendaVenezuelaPage onNavigate={handleNavigate} />
        ) : effectivePath === '/punto-mimos-dpasso-vigo' ? (
          <PuntoDPassoPage onNavigate={handleNavigate} />
        ) : isPreviewPortada && PreviewPortadaPage ? (
          <PreviewPortadaPage onNavigate={handleNavigate} />
        ) : effectivePath === '/' ? (
          /* Portada principal luminosa: Hero de 7 transiciones + navegador de perfiles + 4 bandas editoriales */
          <main id="main-content" tabIndex={-1} className="focus:outline-hidden">
            <PreviewHeroSection
              onNavigate={handleNavigate}
              onScrollToSection={handleScrollToSection}
            />
            <PreviewHelpNavigatorSection onNavigate={handleNavigate} />
            <PreviewCatalogSection onNavigate={handleNavigate} />
            <PreviewB2BAndPickupSection onNavigate={handleNavigate} />
            <PreviewLocationsBand onNavigate={handleNavigate} />
            <PreviewWhyAndGuidesSection onNavigate={handleNavigate} />
          </main>
        ) : (
          <NotFoundPage onNavigate={handleNavigate} />
        )}
      </React.Suspense>

      {/* Pie de página + Barra inferior móvil */}
      <Footer
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenCookieSettings={() => setCookieBannerOpen(true)}
      />

      {/* Asistente Mimo y Preferencias de Cookies */}
      <MimoAssistant
        cookieBannerOpen={cookieBannerOpen}
        onAcceptCookies={handleAcceptCookies}
        onRejectCookies={handleRejectCookies}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default App;
