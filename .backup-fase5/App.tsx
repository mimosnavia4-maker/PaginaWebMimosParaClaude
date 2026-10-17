import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ServicesAndPricingSection } from './components/ServicesAndPricingSection';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { CarpetCleaningSection } from './components/CarpetCleaningSection';
import { CarpetCleaningPage } from './components/CarpetCleaningPage';
import { ClothingAlterationsPage } from './components/ClothingAlterationsPage';
import { B2BApartmentsSection } from './components/B2BApartmentsSection';
import { CleaningDivisionPage } from './components/CleaningDivisionPage';
import { LocalZonePage } from './components/LocalZonePage';
import { HomePickupSection } from './components/HomePickupSection';
import { WhyChooseMimosSection } from './components/WhyChooseMimosSection';
import { BlogSection } from './components/BlogSection';
import { BlogArticlePage } from './components/BlogArticlePage';
import { ContactAndLocationsSection } from './components/ContactAndLocationsSection';
import { LegalPage } from './components/LegalPage';
import { SubsidiesPage } from './components/SubsidiesPage';
import { CareersPage } from './components/CareersPage';
import { Footer } from './components/Footer';
import { MimoAssistant } from './components/MimoAssistant';
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
    if (typeof window !== 'undefined') {
      return localStorage.getItem('mimos_theme') === 'dark';
    }
    return false;
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
      localStorage.setItem('mimos_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('mimos_theme', 'light');
    }
  }, [darkMode]);

  // Apply SEO & Schema.org on route change, and manage GA4 page_view according to consent
  useEffect(() => {
    applyPageSEO(currentPath);
    if (hasAnalyticsConsent()) {
      initGA4();
      trackPageView(currentPath, document.title);
    } else {
      disableAndClearGA4();
    }
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
  const zonaActiva = ZONAS_SEO_LOCAL.find((z) => z.url === currentPath);
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
      {/* Quota Defense Banner (Case A: Demo Key) */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* 1. Cabecera Fija (Sección 7.1) */}
      <Header currentPath={currentPath} onNavigate={handleNavigate} />

      {/* Contenido según ruta (Sección 6, 7 y 16 del Plan Maestro) */}
      {articuloActivo ? (
        <BlogArticlePage articulo={articuloActivo} onNavigate={handleNavigate} />
      ) : currentPath === '/blog' ? (
        <main>
          <BlogSection onNavigate={handleNavigate} />
        </main>
      ) : currentPath === '/limpieza-alfombras-vigo' ? (
        <CarpetCleaningPage onNavigate={handleNavigate} />
      ) : currentPath === '/arreglos-de-ropa-vigo' ? (
        <ClothingAlterationsPage onNavigate={handleNavigate} />
      ) : currentPath === '/limpieza-profesional-vigo' ? (
        <CleaningDivisionPage variant="limpieza" onNavigate={handleNavigate} />
      ) : currentPath === '/limpieza-apartamentos-turisticos-vigo' ? (
        <CleaningDivisionPage variant="apartamentos" onNavigate={handleNavigate} />
      ) : currentPath === '/servicios-empresas' ? (
        <CleaningDivisionPage variant="empresas" onNavigate={handleNavigate} />
      ) : servicioIndividualActivo ? (
        <ServiceDetailPage
          servicio={servicioIndividualActivo}
          onNavigate={handleNavigate}
        />
      ) : currentPath === '/puntos-mimos' || currentPath === '/contacto' ? (
        <main>
          <ContactAndLocationsSection onNavigate={handleNavigate} />
        </main>
      ) : zonaActiva ? (
        <LocalZonePage zona={zonaActiva} onNavigate={handleNavigate} />
      ) : isLegalRoute ? (
        <LegalPage
          section={currentPath.replace('/', '') as 'aviso-legal' | 'privacidad' | 'cookies'}
          onNavigate={handleNavigate}
          onOpenCookieSettings={() => setCookieBannerOpen(true)}
        />
      ) : currentPath === '/feder' ? (
        <SubsidiesPage variant="feder" onNavigate={handleNavigate} />
      ) : currentPath === '/programa-bono-energia-peme-2025-in417z' ? (
        <SubsidiesPage variant="bono-energia" onNavigate={handleNavigate} />
      ) : currentPath === '/empleo-unete-a-nosotros' ? (
        <CareersPage onNavigate={handleNavigate} />
      ) : (
        /* Portada con los bloques de Sección 7 + el Bloque Propio Prioritario de Limpieza de Alfombras (Sección 16) */
        <main>
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
