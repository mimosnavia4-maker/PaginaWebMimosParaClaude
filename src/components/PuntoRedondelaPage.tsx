import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PuntoRedondelaFicha } from './PuntoRedondelaFicha';

interface PuntoRedondelaPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const PuntoRedondelaPage: React.FC<PuntoRedondelaPageProps> = ({ onNavigate }) => {
  return (
    <main id="main-content" tabIndex={-1} className="focus:outline-hidden py-8 sm:py-12 bg-gradient-to-b from-[#F4F9FE] via-white to-[#F7F6F2] flex-1 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Migas de pan y navegación */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <nav
            aria-label="Migas de pan"
            className="text-xs sm:text-sm text-slate-600 flex flex-wrap items-center gap-2"
          >
            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="inline-flex items-center min-h-[44px] hover:text-[#0F76BB] font-semibold transition-colors"
            >
              Inicio
            </a>
            <span aria-hidden="true">/</span>
            <a
              href="/puntos-mimos"
              onClick={(e) => onNavigate('/puntos-mimos', e)}
              className="inline-flex items-center min-h-[44px] hover:text-[#0F76BB] font-semibold transition-colors"
            >
              Tiendas y Puntos Mimos
            </a>
            <span aria-hidden="true">/</span>
            <span className="text-[#002147] font-bold">
              Mimos Redondela
            </span>
          </nav>

          <a
            href="/puntos-mimos"
            onClick={(e) => onNavigate('/puntos-mimos', e)}
            className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-white/95 border border-[#002147] hover:bg-[#002147] text-[#002147] hover:text-white text-xs sm:text-sm font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Volver a la lista de puntos</span>
          </a>
        </div>

        {/* Ficha Completa de Mimos Redondela */}
        <PuntoRedondelaFicha onNavigate={onNavigate} isModal={false} />
      </div>
    </main>
  );
};
