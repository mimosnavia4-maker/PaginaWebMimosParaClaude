import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { PuntoGondomarFicha } from './PuntoGondomarFicha';

interface PuntoGondomarPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const PuntoGondomarPage: React.FC<PuntoGondomarPageProps> = ({ onNavigate }) => {
  return (
    <main className="py-8 sm:py-12 bg-slate-50 dark:bg-[#071324] flex-1 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Migas de pan y navegación */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <nav
            aria-label="Migas de pan"
            className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2"
          >
            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="hover:text-[#0F76BB] dark:hover:text-[#60B5F6] font-semibold transition-colors"
            >
              Inicio
            </a>
            <span aria-hidden="true">/</span>
            <a
              href="/#puntos"
              onClick={(e) => onNavigate('/#puntos', e)}
              className="hover:text-[#0F76BB] dark:hover:text-[#60B5F6] font-semibold transition-colors"
            >
              Tiendas y Puntos Mimos
            </a>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900 dark:text-white font-bold">
              Puntadas No Aire (Gondomar)
            </span>
          </nav>

          <a
            href="/#puntos"
            onClick={(e) => onNavigate('/#puntos', e)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Volver a la lista de puntos</span>
          </a>
        </div>

        {/* Ficha Completa */}
        <PuntoGondomarFicha onNavigate={onNavigate} isModal={false} />
      </div>
    </main>
  );
};
