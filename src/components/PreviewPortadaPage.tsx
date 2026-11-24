import React, { useEffect } from 'react';
import { PreviewHeroSection } from './preview/PreviewHeroSection';
import { PreviewCatalogSection } from './preview/PreviewCatalogSection';
import { PreviewB2BAndPickupSection } from './preview/PreviewB2BAndPickupSection';
import { PreviewLocationsBand } from './preview/PreviewLocationsBand';
import { PreviewWhyAndGuidesSection } from './preview/PreviewWhyAndGuidesSection';

interface PreviewPortadaPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const PreviewPortadaPage: React.FC<PreviewPortadaPageProps> = ({
  onNavigate,
}) => {
  useEffect(() => {
    document.title = 'Vista previa Portada | Tintorería Mimos';
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute('content', 'noindex, nofollow');
    }
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main id="main-content" tabIndex={-1} className="focus:outline-hidden">
      <PreviewHeroSection
        onNavigate={onNavigate}
        onScrollToSection={handleScrollToSection}
      />
      <PreviewCatalogSection onNavigate={onNavigate} />
      <PreviewB2BAndPickupSection onNavigate={onNavigate} />
      <PreviewLocationsBand onNavigate={onNavigate} />
      <PreviewWhyAndGuidesSection onNavigate={onNavigate} />
    </main>
  );
};
