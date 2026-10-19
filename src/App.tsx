import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesAndPricingSection } from './components/ServicesAndPricingSection';
import { CarpetCleaningSection } from './components/CarpetCleaningSection';
import { B2BApartmentsSection } from './components/B2BApartmentsSection';
import { HomePickupSection } from './components/HomePickupSection';
import { WhyChooseMimosSection } from './components/WhyChooseMimosSection';
import { BlogSection } from './components/BlogSection';
import { ContactAndLocationsSection } from './components/ContactAndLocationsSection';
import { Footer } from './components/Footer';
import { MimoAssistant } from './components/MimoAssistant';

// Rutas secundarias con carga diferida (Code-Splitting Fase 5)
const CarpetCleaningPage = React.lazy(() =>
  import('./components/CarpetCleaningPage').then((m) => ({ default: m.CarpetCleaningPage }))
);
const ClothingAlterationsPage = React.lazy(() =>
  import('./components/ClothingAlterationsPage').then((m) => ({ default: m.ClothingAlterationsPage }))
);
const CleaningDivisionPage = React.lazy(() =>
  import('./components/CleaningDivisionPage').then((m) => ({ default: m.CleaningDivisionPage }))
);
const ServiceDetailPage = React.lazy(() =>
  import('./components/ServiceDetailPage').then((m) => ({ default: m.ServiceDetailPage }))
);
const LocalZonePage = React.lazy(() =>
  import('./components/LocalZonePage').then((m) => ({ default: m.LocalZonePage }))
);
const BlogArticlePage = React.lazy(() =>
  import('./components/BlogArticlePage').then((m) => ({ default: m.BlogArticlePage }))
);
const LegalPage = React.lazy(() =>
  import('./components/LegalPage').then((m) => ({ default: m.LegalPage }))
);
const SubsidiesPage = React.lazy(() =>
  import('./components/SubsidiesPage').then((m) => ({ default: m.SubsidiesPage }))
);
const CareersPage = React.lazy(() =>
  import('./components/CareersPage').then((m) => ({ default: m.CareersPage }))
);
const TiendaGregorioEspinoPage = React.lazy(() =>
  import('./components/TiendaGregorioEspinoPage').then((m) => ({ default: m.TiendaGregorioEspinoPage }))
);
import {
  ARTICULOS_BLOG,
  SERVICIOS_MIMOS,
  ZONAS_SEO_LOCAL,
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
import { getStoredTheme, setStoredTheme } from './utils/safeStorage';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const rawPath = window.location.pathname || '/';
      const canonicalPath = resolveCanonicalRoute(rawPath);
      if (canonicalPath !== rawPath && KNOWN_ROUTES.includes(canonicalPath)) {
        window.history.replaceState({}, '', canonicalPath);
        return canonicalPath;
      }
      if (KNOWN_ROUTES.includes(canonicalPath)) {
        return canonicalPath;
      }
      return '/';
    }
    return '/';
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return getStoredTheme();
  });

  const [cookieBannerOpen, setCookieBannerOpen] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return getCookieConsentChoice() === null;
    }
    return false;
  });

  // Sync dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    setStoredTheme(darkMode);
  }, [darkMode]);

  // Apply SEO & Schema.org on route change, manage GA4, and focus h1 for accessibility
  useEffect(() => {
    applyPageSEO(currentPath);
    if (hasAnalyticsConsent()) {
      initGA4();
      trackPageView(currentPath, document.title);
    } else {
      disableAndClearGA4();
    }
    // Accesibilidad: mover foco al encabezado principal tras la navegación
    const timer = setTimeout(() => {
      const heading = document.querySelector('h1') as HTMLElement | null;
      if (heading) {
        heading.setAttribute('tabindex', '-1');
        heading.focus({ preventScroll: true });
      }
    }, 60);
    return () => clearTimeout(timer);
  }, [currentPath]);

  // Delegated listener for WhatsApp and phone clicks (single source, no PII or URLs sent)
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

      let ctaZone: CtaZone = 'page_content';
      if (anchor.closest('header')) {
        ctaZone = 'header';
      } else if (anchor.closest('[aria-label="Mimo, asistente de Tintorería Mimos"]')) {
        ctaZone = 'mimo_assistant';
      } else if (anchor.closest('[aria-label="Accesos rápidos en móvil"]')) {
        ctaZone = 'mobile_bar';
      }

      trackContactClick(
        isWhatsApp ? 'whatsapp_click' : 'phone_click',
        currentPath,
        ctaZone
      );
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, [currentPath]);

  // Listen to browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(resolveCanonicalRoute(window.location.pathname || '/'));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = useCallback(
    (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
      if (e) {
        e.preventDefault();
      }

      if (href.startsWith('/#') || href.startsWith('#')) {
        const hash = href.replace(/^\//, '');
        const targetId = hash.replace('#', '');

        if (currentPath !== '/') {
          window.history.pushState({}, '', `/${hash}`);
          setCurrentPath('/');
          setTimeout(() => {
            const el = document.getElementById(targetId);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 60);
        } else {
          window.history.pushState({}, '', `/${hash}`);
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
        return;
      }

      window.history.pushState({}, '', href);
      setCurrentPath(href);

      if (href === '/contacto') {
        setTimeout(() => {
          const el = document.getElementById('contacto');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [currentPath]
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

  // Match route
  const articuloActivo = ARTICULOS_BLOG.find((a) => a.url === currentPath);
  const zonaActiva =
    ZONAS_SEO_LOCAL.find((z) => z.url === currentPath) ||
    (currentPath === '/punto-telas-mas-porrino' ||
    currentPath === '/punto/telas-mas' ||
    currentPath === '/ficha/telas-mas'
      ? ZONAS_SEO_LOCAL.find((z) => z.slug === 'o-porrino')
      : currentPath === '/punto-puntadas-no-aire-gondomar' ||
        currentPath === '/punto/puntadas-no-aire' ||
        currentPath === '/ficha/puntadas-no-aire'
      ? ZONAS_SEO_LOCAL.find((z) => z.slug === 'gondomar')
      : undefined);
  const servicioIndividualActivo = SERVICIOS_MIMOS.find(
    (s) =>
      s.url === currentPath &&
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
    currentPath === '/aviso-legal' ||
    currentPath === '/privacidad' ||
    currentPath === '/cookies';

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-white dark:bg-[#071324] text-slate-900 dark:text-slate-100">
      {/* Aviso amable de disponibilidad de mapa para visitantes */}
      {quotaExceeded && (
        <div className="bg-amber-50 dark:bg-amber-950/70 border-b border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 px-4 py-2.5 text-xs sm:text-sm text-center sticky top-0 z-50 shadow-xs flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
          <span>
            El mapa interactivo se encuentra temporalmente en mantenimiento. Nuestras 3 tiendas propias y 5 puntos colaboradores atienden con total normalidad.
          </span>
          <a
            href="/#puntos"
            onClick={(e) => handleNavigate('/#puntos', e)}
            className="underline font-bold text-amber-950 dark:text-amber-100 hover:text-amber-700 dark:hover:text-amber-300"
          >
            Ver direcciones, horarios y teléfonos
          </a>
        </div>
      )}

      {/* 1. Cabecera Fija (Sección 7.1) */}
      <Header currentPath={currentPath} onNavigate={handleNavigate} />

      {/* Contenido según ruta (Sección 6, 7 y 16 del Plan Maestro con Suspense) */}
      <React.Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center py-20 px-4">
            <div className="flex flex-col items-center gap-3 animate-pulse">
              <div className="w-9 h-9 rounded-full border-3 border-[#0F76BB] border-t-transparent animate-spin" />
              <p className="text-sm font-bold text-[#002147] dark:text-slate-300">
                Cargando página...
              </p>
            </div>
          </div>
        }
      >
        {articuloActivo ? (
          <div id="main-content">
            <BlogArticlePage articulo={articuloActivo} onNavigate={handleNavigate} />
          </div>
        ) : currentPath === '/blog' ? (
          <main id="main-content">
            <BlogSection onNavigate={handleNavigate} isPage={true} />
          </main>
        ) : currentPath === '/limpieza-alfombras-vigo' ? (
          <div id="main-content">
            <CarpetCleaningPage onNavigate={handleNavigate} />
          </div>
        ) : currentPath === '/arreglos-de-ropa-vigo' ? (
          <div id="main-content">
            <ClothingAlterationsPage onNavigate={handleNavigate} />
          </div>
        ) : currentPath === '/limpieza-profesional-vigo' ? (
          <div id="main-content">
            <CleaningDivisionPage variant="limpieza" onNavigate={handleNavigate} />
          </div>
        ) : currentPath === '/limpieza-apartamentos-turisticos-vigo' ? (
          <div id="main-content">
            <CleaningDivisionPage variant="apartamentos" onNavigate={handleNavigate} />
          </div>
        ) : currentPath === '/servicios-empresas' ? (
          <div id="main-content">
            <CleaningDivisionPage variant="empresas" onNavigate={handleNavigate} />
          </div>
        ) : servicioIndividualActivo ? (
          <div id="main-content">
            <ServiceDetailPage
              servicio={servicioIndividualActivo}
              onNavigate={handleNavigate}
            />
          </div>
        ) : currentPath === '/puntos-mimos' || currentPath === '/contacto' ? (
          <main id="main-content">
            <ContactAndLocationsSection
              onNavigate={handleNavigate}
              pageMode={currentPath === '/contacto' ? 'contacto' : 'puntos'}
            />
          </main>
        ) : zonaActiva ? (
          <div id="main-content">
            <LocalZonePage zona={zonaActiva} onNavigate={handleNavigate} />
          </div>
        ) : isLegalRoute ? (
          <div id="main-content">
            <LegalPage
              section={currentPath.replace('/', '') as 'aviso-legal' | 'privacidad' | 'cookies'}
              onNavigate={handleNavigate}
              onOpenCookieSettings={() => setCookieBannerOpen(true)}
            />
          </div>
        ) : currentPath === '/feder' ? (
          <div id="main-content">
            <SubsidiesPage variant="feder" onNavigate={handleNavigate} />
          </div>
        ) : currentPath === '/programa-bono-energia-peme-2025-in417z' ? (
          <div id="main-content">
            <SubsidiesPage variant="bono-energia" onNavigate={handleNavigate} />
          </div>
        ) : currentPath === '/empleo-unete-a-nosotros' ? (
          <div id="main-content">
            <CareersPage onNavigate={handleNavigate} />
          </div>
        ) : currentPath === '/tienda-mimos-gregorio-espino-vigo' || currentPath === '/tienda/gregorio-espino' ? (
          <div id="main-content">
            <TiendaGregorioEspinoPage onNavigate={handleNavigate} />
          </div>
        ) : (
          /* Portada con los bloques de Sección 7 + el Bloque Propio Prioritario de Limpieza de Alfombras (Sección 16) */
          <main id="main-content">
            {/* 2. Portada principal */}
            <HeroSection onNavigate={handleNavigate} />
            {/* 3. Servicios de tintorería y lavandería */}
            <ServicesAndPricingSection onNavigate={handleNavigate} />
            {/* Servicio prioritario (Sección 16): Limpieza de alfombras con recogida y entrega */}
            <CarpetCleaningSection onNavigate={handleNavigate} />
            {/* 4. Recogida a domicilio */}
            <HomePickupSection onNavigate={handleNavigate} />
            {/* 5. Red de tiendas y puntos Mimos */}
            <ContactAndLocationsSection onNavigate={handleNavigate} />
            {/* 6. Limpieza profesional, apartamentos turísticos y empresas */}
            <B2BApartmentsSection onNavigate={handleNavigate} />
            {/* 7. Por qué elegir Mimos y reseñas reales */}
            <WhyChooseMimosSection />
            {/* 8. Guías de cuidado textil */}
            <BlogSection onNavigate={handleNavigate} />
          </main>
        )}
      </React.Suspense>

      {/* 9. Contacto y pie de página + Barra inferior móvil */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCookieSettings={() => setCookieBannerOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
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
