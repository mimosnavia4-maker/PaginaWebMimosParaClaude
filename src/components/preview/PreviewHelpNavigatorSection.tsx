import React, { useState } from 'react';
import { Briefcase, Home, User } from 'lucide-react';

interface PreviewHelpNavigatorSectionProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

type ProfileTabId = 'particular' | 'empresas' | 'apartamentos';

interface HelpCardItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  imgSrc: string;
}

interface ProfileTabConfig {
  id: ProfileTabId;
  label: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  cards: HelpCardItem[];
}

const PROFILE_TABS: ProfileTabConfig[] = [
  {
    id: 'particular',
    label: 'Particular',
    icon: User,
    cards: [
      {
        id: 'part-tintoreria',
        title: 'Tintorería y ceremonia',
        subtitle: 'Trajes, vestidos, novia y pieles',
        href: '/tintoreria-vigo',
        imgSrc: '/images/ositos/osito-tintoreria.webp',
      },
      {
        id: 'part-lavanderia',
        title: 'Lavandería, colada y plancha',
        subtitle: '100 % atendida · Sin monedas',
        href: '/lavanderia-vigo',
        imgSrc: '/images/ositos/osito-lavanderia.webp',
      },
      {
        id: 'part-textiles',
        title: 'Edredones, mantas y cortinas',
        subtitle: 'Lavado y secado gran formato',
        href: '/textiles-hogar-vigo',
        imgSrc: '/images/ositos/osito-edredones.webp',
      },
      {
        id: 'part-sofas',
        title: 'Sofás y colchones',
        subtitle: 'Tapicerías en casa · Secado al aire',
        href: '/limpieza-sofas-vigo',
        imgSrc: '/images/ositos/osito-sofas.webp',
      },
      {
        id: 'part-casas',
        title: 'Limpieza dentro de tu casa',
        subtitle: 'Baños, cocinas y mantenimiento',
        href: '/limpieza-casas-vigo',
        imgSrc: '/images/ositos/osito-limpieza.webp',
      },
      {
        id: 'part-costura',
        title: 'Costura y arreglos de ropa',
        subtitle: 'Bajos, cremalleras, piel y cortinas',
        href: '/arreglos-de-ropa-vigo',
        imgSrc: '/images/ositos/osito-costura.webp',
      },
      {
        id: 'part-alfombras-limpieza',
        title: 'Limpieza de alfombras',
        subtitle: 'Lavado profundo · Recogida o tienda',
        href: '/limpieza-alfombras-vigo',
        imgSrc: '/images/ositos/osito-alfombras.webp',
      },
      {
        id: 'part-alfombras-arreglo',
        title: 'Arreglo de alfombras',
        subtitle: 'Flecos, ribetes y bordes por especialista',
        href: '/reparacion-alfombras-vigo',
        imgSrc: '/images/ositos/osito-arreglo-alfombras.webp',
      },
    ],
  },
  {
    id: 'empresas',
    label: 'Empresas',
    icon: Briefcase,
    cards: [
      {
        id: 'emp-espacios',
        title: 'Oficinas, clínicas y comunidades',
        subtitle: 'Mantenimiento periódico · RC y CAE',
        href: '/limpieza-profesional-vigo',
        imgSrc: '/images/ositos/osito-oficinas.webp',
      },
      {
        id: 'emp-lavanderia',
        title: 'Lavandería para negocios',
        subtitle: 'Toallas, batas, camillas y uniformes',
        href: '/servicios-empresas',
        imgSrc: '/images/ositos/osito-lavanderia-negocios.webp',
      },
      {
        id: 'emp-tapicerias',
        title: 'Sofás, sillas y cortinajes',
        subtitle: 'Tapicerías in situ · Sofás y sillas',
        href: '/limpieza-sofas-vigo',
        imgSrc: '/images/ositos/osito-sofas.webp',
      },
      {
        id: 'emp-costura',
        title: 'Costura y bordados laborales',
        subtitle: 'Arreglos de uniformes y cortinas',
        href: '/arreglos-de-ropa-vigo',
        imgSrc: '/images/ositos/osito-costura.webp',
      },
      {
        id: 'emp-siniestros',
        title: 'Siniestros e incendios',
        subtitle: 'Humo, hollín y agua para seguros',
        href: '/limpieza-incendios-siniestros-vigo',
        imgSrc: '/images/ositos/osito-siniestros.webp',
      },
      {
        id: 'emp-recogida',
        title: 'Recogida en tu local o polígono',
        subtitle: 'Rutas Vigo y área · Factura CIF',
        href: '/recogida-a-domicilio',
        imgSrc: '/images/ositos/osito-furgoneta.webp',
      },
    ],
  },
  {
    id: 'apartamentos',
    label: 'Apartamentos turísticos',
    icon: Home,
    cards: [
      {
        id: 'vut-lenceria',
        title: 'Solo ropa de cama y toallas',
        subtitle: 'Tu lencería lavada por vivienda',
        href: '/limpieza-apartamentos-turisticos-vigo#lenceria',
        imgSrc: '/images/ositos/osito-lenceria-vut.webp',
      },
      {
        id: 'vut-rotacion',
        title: 'Limpieza entre huéspedes',
        subtitle: 'Rotación completa + lavandería',
        href: '/limpieza-apartamentos-turisticos-vigo#rotacion',
        imgSrc: '/images/ositos/osito-limpieza.webp',
      },
      {
        id: 'vut-integral',
        title: 'Coordinación integral VUT',
        subtitle: 'Limpieza, llaves y foto-reporte',
        href: '/limpieza-apartamentos-turisticos-vigo#integral',
        imgSrc: '/images/ositos/osito-apartamentos.webp',
      },
      {
        id: 'vut-textiles',
        title: 'Nórdicos, fundas y cortinas',
        subtitle: 'Puesta a punto de textiles VUT',
        href: '/textiles-hogar-vigo',
        imgSrc: '/images/ositos/osito-edredones.webp',
      },
      {
        id: 'vut-costura',
        title: 'Costura y repasos textiles',
        subtitle: 'Bajos, cremalleras, fundas y roces',
        href: '/arreglos-de-ropa-vigo',
        imgSrc: '/images/ositos/osito-costura.webp',
      },
      {
        id: 'vut-urgencias',
        title: 'Urgencias para propietarios',
        subtitle: 'Mismo día · Sábados, domingos y festivos',
        href: '/limpieza-apartamentos-turisticos-vigo#urgencias',
        imgSrc: '/images/ositos/osito-furgoneta.webp',
      },
    ],
  },
];

export const PreviewHelpNavigatorSection: React.FC<PreviewHelpNavigatorSectionProps> = ({
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<ProfileTabId>('particular');

  const currentTab =
    PROFILE_TABS.find((tab) => tab.id === activeTab) || PROFILE_TABS[0];

  const isEightCardGrid = currentTab.cards.length === 8;

  const handleTabKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = PROFILE_TABS[(index + 1) % PROFILE_TABS.length];
      setActiveTab(next.id);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev =
        PROFILE_TABS[(index - 1 + PROFILE_TABS.length) % PROFILE_TABS.length];
      setActiveTab(prev.id);
    }
  };

  return (
    <section
      id="ayuda-servicios"
      aria-labelledby="help-navigator-heading"
      className="py-12 sm:py-14 lg:py-16 bg-[#EAF4FE] border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado centrado */}
        <div className="max-w-2xl mx-auto text-center space-y-2.5">
          <h2
            id="help-navigator-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] tracking-tight"
          >
            ¿En qué podemos ayudarte?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Elige tu perfil para ir directo al servicio que necesitas en Vigo y alrededores.
          </p>
        </div>

        {/* 3 pestañas tipo píldora */}
        <div
          role="tablist"
          aria-label="Tipo de cliente"
          className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        >
          {PROFILE_TABS.map((tab, index) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`help-tab-${tab.id}`}
                aria-selected={isSelected}
                aria-controls={`help-panel-${tab.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-4 sm:px-5 py-2.5 rounded-full border text-sm font-bold transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#002147] focus-visible:ring-offset-2 ${
                  isSelected
                    ? 'bg-[#0F76BB] text-white border-[#0F76BB] shadow-xs'
                    : 'bg-white text-[#002147] border-[#BFDBFE] hover:border-[#0F76BB] hover:bg-[#F8FBFF]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden={true} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Rejilla de tarjetas verticales estilo IKEA (4x2 en Particular, 6 cols en Empresas/Apartamentos) */}
        <div
          role="tabpanel"
          id={`help-panel-${currentTab.id}`}
          aria-labelledby={`help-tab-${currentTab.id}`}
          className={`mt-7 sm:mt-8 grid gap-3 sm:gap-4 ${
            isEightCardGrid
              ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-4'
              : 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6'
          }`}
        >
          {currentTab.cards.map((card) => (
            <a
              key={card.id}
              href={card.href}
              onClick={(e) => onNavigate(card.href, e)}
              className="group min-w-0 flex flex-col rounded-2xl bg-white border border-[#BFDBFE] hover:border-[#0F76BB] p-3 sm:p-4 shadow-xs hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F76BB] focus-visible:ring-offset-2"
            >
              {/* Escenario superior con ilustración Osito Mimos */}
              <div className="rounded-xl bg-[#F4F9FE] group-hover:bg-[#EAF4FE] py-3 sm:py-4 px-2 flex items-center justify-center transition-colors">
                <img
                  src={card.imgSrc}
                  alt=""
                  aria-hidden="true"
                  width={104}
                  height={104}
                  loading="lazy"
                  decoding="async"
                  className={`${
                    isEightCardGrid
                      ? 'w-22 h-22 sm:w-26 sm:h-26'
                      : 'w-20 h-20 sm:w-22 sm:h-22'
                  } object-contain transition-transform duration-200 group-hover:scale-105`}
                />
              </div>

              {/* Cápsula de título + subtítulo centrado */}
              <div className="mt-3 flex-1 flex flex-col">
                <div className="rounded-full bg-[#EDF5FD] group-hover:bg-[#0F76BB] px-3 py-2 min-h-[40px] sm:min-h-[44px] flex items-center justify-center text-center transition-colors">
                  <h3 className="text-xs sm:text-[13px] font-extrabold text-[#002147] group-hover:text-white leading-tight transition-colors">
                    {card.title}
                  </h3>
                </div>
                <p className="mt-2 text-center text-[11px] sm:text-xs text-slate-600 leading-snug">
                  {card.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
