import React, { useState } from 'react';
import {
  ArrowUpRight,
  BedDouble,
  Briefcase,
  Building2,
  ClipboardCheck,
  Clock,
  Home,
  KeyRound,
  Scissors,
  ShieldAlert,
  Shirt,
  Sofa,
  Sparkles,
  Truck,
  User,
  WashingMachine,
} from 'lucide-react';

interface PreviewHelpNavigatorSectionProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

type ProfileTabId = 'particular' | 'empresas' | 'apartamentos';

interface HelpCardItem {
  id: string;
  title: string;
  subtitle: string;
  href: string;
  renderIcon: () => React.ReactNode;
}

interface ProfileTabConfig {
  id: ProfileTabId;
  label: string;
  icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>;
  cards: HelpCardItem[];
}

const HomeCleanSparkleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.85}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
    aria-hidden="true"
  >
    <path d="M3 10.5 11 4l5.2 4.2" />
    <path d="M5 9.2V20a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-6" />
    <path d="M9.5 21v-5.5a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1V21" />
    <path d="M19 3v4" />
    <path d="M17 5h4" />
  </svg>
);

const CarpetCleanIcon = () => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.65}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-7 h-7"
    aria-hidden="true"
  >
    {/* Cabeza y cuerpo del operario */}
    <circle cx="18.5" cy="7.5" r="2.4" fill="currentColor" stroke="none" />
    <path
      d="M15.2 12.2c0-1.2 1-2 2.4-2h1.9c1.2 0 2.1.8 2.2 1.9l.4 3.4-2.1 2.2-1.8 7.8h-2l.6-6.7-2 6.7h-2l1.6-7.8c-.9-.9-1.2-2.2-.7-3.4l1.5-2.1Z"
      fill="currentColor"
      stroke="none"
    />
    {/* Brazo y mango del aspirador/inyector */}
    <path d="M18.2 13.2 21.8 17l5 8.2" strokeWidth={1.75} />
    {/* Boquilla sobre la alfombra */}
    <rect x="24.2" y="24.8" width="5.2" height="2.2" rx="1" fill="currentColor" stroke="none" />
    {/* Máquina/canister a la izquierda y manguera */}
    <path d="M5.2 26.2a3.3 3.3 0 0 1 6.3-1.2l.4 2.2H4.8l.4-1Z" />
    <circle cx="6.2" cy="27.6" r="1.4" />
    <circle cx="10.8" cy="27.6" r="1.1" />
    <path d="M6.4 23.2c-.3-4.2 2.2-7.8 6.8-8.2 2.3-.2 4.2.5 5.4 1.5" />
    {/* Alfombra en el suelo con flecos */}
    <path d="M12.5 29.5h20" strokeWidth={1.7} />
    <path d="M14 27.6h17" strokeWidth={1.2} />
    <path d="M11 28h1.5M10.8 29.5h1.7M32.5 28H34M32.5 29.5h1.8" strokeWidth={1.3} />
    {/* Destellos de limpieza */}
    <path
      d="M28.5 11.2 29.2 13l1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8Z"
      fill="currentColor"
      stroke="none"
    />
    <path
      d="M32.2 17 32.6 18.1l1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4.4-1.1Z"
      fill="currentColor"
      stroke="none"
    />
  </svg>
);

const CarpetRepairIcon = () => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.65}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-7 h-7"
    aria-hidden="true"
  >
    {/* Aguja inclinada e hilo curvado */}
    <path
      d="M21 15.2 27.8 5.4c.5-.7 1.5-.3 1.2.5l-5.7 9.9-2.3-.6Z"
      fill="currentColor"
      stroke="none"
    />
    <path d="M27.6 6.8c4.4 1.1 5.6 5.2 3.1 8-1.4 1.6-3.7 1.7-5.1 1" strokeWidth={1.35} />
    <path d="M24.2 6.8c-3.8-2-7.8-.2-6.8 2.6.6 1.7 2.8 2 4.3 2.7" strokeWidth={1.35} />
    {/* Rollo izquierdo de la alfombra */}
    <ellipse cx="7.4" cy="21.4" rx="2.9" ry="4.4" />
    <ellipse cx="7.4" cy="21.4" rx="1.2" ry="2.1" />
    {/* Cuerpo extendido de la alfombra */}
    <path d="M7.6 17h16.6c.7 0 1.3.4 1.6 1l3.6 7.5c.3.7-.2 1.5-1 1.5H10.5l-2.6-2.2" />
    {/* Marco interior tejido (sin rombos) */}
    <path d="M13 19.6h9.6l2.3 4.8H15l-2-4.8Z" strokeWidth={1.25} />
    <path d="M15.8 21.3h5.1l.8 1.6h-5.1l-.8-1.6Z" strokeWidth={1.15} />
    {/* Flecos inferiores y derechos */}
    <path d="M11.6 27v2.4M14.2 27v2.4M16.8 27v2.4M19.4 27v2.4M22 27v2.4M24.6 27v2.4M27.2 27v2.4" strokeWidth={1.3} />
    <path d="M26 18.6h2.2M27.1 20.9h2.2M28.2 23.2h2.2" strokeWidth={1.3} />
  </svg>
);

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
        renderIcon: () => <Shirt className="w-5 h-5" aria-hidden="true" />,
      },
      {
        id: 'part-lavanderia',
        title: 'Lavandería, colada y plancha',
        subtitle: '100 % atendida · Sin monedas',
        href: '/lavanderia-vigo',
        renderIcon: () => <WashingMachine className="w-5 h-5" aria-hidden="true" />,
      },
      {
        id: 'part-textiles',
        title: 'Edredones, mantas y cortinas',
        subtitle: 'Lavado y secado gran formato',
        href: '/textiles-hogar-vigo',
        renderIcon: () => <BedDouble className="w-5 h-5" aria-hidden="true" />,
      },
      {
        id: 'part-sofas',
        title: 'Sofás y colchones',
        subtitle: 'Tapicerías en casa · Secado al aire',
        href: '/limpieza-sofas-vigo',
        renderIcon: () => <Sofa className="w-5 h-5" aria-hidden="true" />,
      },
      {
        id: 'part-casas',
        title: 'Limpieza dentro de tu casa',
        subtitle: 'Baños, cocinas y mantenimiento',
        href: '/limpieza-casas-vigo',
        renderIcon: () => <HomeCleanSparkleIcon />,
      },
      {
        id: 'part-costura',
        title: 'Costura y arreglos de ropa',
        subtitle: 'Bajos, cremalleras, piel y cortinas',
        href: '/arreglos-de-ropa-vigo',
        renderIcon: () => <Scissors className="w-5 h-5" aria-hidden="true" />,
      },
      {
        id: 'part-alfombras-limpieza',
        title: 'Limpieza de alfombras',
        subtitle: 'Lavado profundo · Recogida o tienda',
        href: '/limpieza-alfombras-vigo',
        renderIcon: () => <CarpetCleanIcon />,
      },
      {
        id: 'part-alfombras-arreglo',
        title: 'Arreglo de alfombras',
        subtitle: 'Flecos, ribetes y bordes por especialista',
        href: '/reparacion-alfombras-vigo',
        renderIcon: () => <CarpetRepairIcon />,
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
        renderIcon: () => <Building2 className="w-5 h-5" aria-hidden="true" />,
      },
      {
        id: 'emp-lavanderia',
        title: 'Lavandería para negocios',
        subtitle: 'Toallas, batas, camillas y uniformes',
        href: '/servicios-empresas',
        renderIcon: () => <Shirt className="w-5 h-5" aria-hidden="true" />,
      },
      {
        id: 'emp-tapicerias',
        title: 'Sofás, sillas y cortinajes',
        subtitle: 'Tapicerías in situ · Sofás y sillas',
        href: '/limpieza-sofas-vigo',
        renderIcon: () => <Sofa className="w-5 h-5" aria-hidden="true" />,
      },
      {
        id: 'emp-costura',
        title: 'Costura y bordados laborales',
        subtitle: 'Arreglos de uniformes y cortinas',
        href: '/arreglos-de-ropa-vigo',
        renderIcon: () => <Scissors className="w-5 h-5" aria-hidden="true" />,
      },
      {
        id: 'emp-siniestros',
        title: 'Siniestros e incendios',
        subtitle: 'Humo, hollín y agua para seguros',
        href: '/limpieza-incendios-siniestros-vigo',
        renderIcon: () => <ShieldAlert className="w-5 h-5" aria-hidden="true" />,
      },
      {
        id: 'emp-recogida',
        title: 'Recogida en tu local o polígono',
        subtitle: 'Rutas Vigo y área · Factura CIF',
        href: '/recogida-a-domicilio',
        renderIcon: () => <Truck className="w-5 h-5" aria-hidden="true" />,
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
        renderIcon: () => <BedDouble className="w-5 h-5" aria-hidden="true" />,
      },
      {
        id: 'vut-rotacion',
        title: 'Limpieza entre huéspedes',
        subtitle: 'Rotación completa + lavandería',
        href: '/limpieza-apartamentos-turisticos-vigo#rotacion',
        renderIcon: () => <KeyRound className="w-5 h-5" aria-hidden="true" />,
      },
      {
        id: 'vut-integral',
        title: 'Coordinación integral VUT',
        subtitle: 'Limpieza, llaves y foto-reporte',
        href: '/limpieza-apartamentos-turisticos-vigo#integral',
        renderIcon: () => <ClipboardCheck className="w-5 h-5" aria-hidden="true" />,
      },
      {
        id: 'vut-textiles',
        title: 'Nórdicos, fundas y cortinas',
        subtitle: 'Puesta a punto de textiles VUT',
        href: '/textiles-hogar-vigo',
        renderIcon: () => <Sparkles className="w-5 h-5" aria-hidden="true" />,
      },
      {
        id: 'vut-costura',
        title: 'Costura y repasos textiles',
        subtitle: 'Bajos, cremalleras, fundas y roces',
        href: '/arreglos-de-ropa-vigo',
        renderIcon: () => <Scissors className="w-5 h-5" aria-hidden="true" />,
      },
      {
        id: 'vut-urgencias',
        title: 'Urgencias para propietarios',
        subtitle: 'Mismo día · Sábados y festivos',
        href: '/limpieza-apartamentos-turisticos-vigo#urgencias',
        renderIcon: () => <Clock className="w-5 h-5" aria-hidden="true" />,
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

        {/* Rejilla de tarjetas clicables (4x2 en Particular, 6x1 en Empresas/Apartamentos) */}
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
              className="group relative flex flex-col rounded-2xl bg-white border border-[#BFDBFE] p-4 sm:p-5 min-h-[146px] sm:min-h-[156px] transition-all hover:border-[#0F76BB] hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F76BB] focus-visible:ring-offset-2"
            >
              <div className="flex items-start justify-between gap-2 mb-3.5">
                <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#EAF4FE] text-[#0F76BB] flex items-center justify-center shrink-0 transition-colors group-hover:bg-[#0F76BB] group-hover:text-white">
                  {card.renderIcon()}
                </span>
                <ArrowUpRight
                  className="w-4 h-4 text-[#0F76BB] opacity-75 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>

              <div className="flex-1 flex flex-col justify-start">
                <h3 className="text-sm font-bold text-[#002147] leading-snug group-hover:text-[#0F76BB] transition-colors">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-xs text-slate-600 leading-snug">
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
