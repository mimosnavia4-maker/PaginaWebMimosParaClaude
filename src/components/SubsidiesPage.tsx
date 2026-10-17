import React from 'react';
import { ArrowLeft, ExternalLink, FileCheck2 } from 'lucide-react';
import { CONTACT_INFO } from '../data/mimosData';

interface SubsidiesPageProps {
  variant: 'feder' | 'bono-energia';
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const SubsidiesPage: React.FC<SubsidiesPageProps> = ({ variant, onNavigate }) => {
  const isFeder = variant === 'feder';

  return (
    <main className="py-12 sm:py-16 bg-slate-50 dark:bg-[#071324] flex-1">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Migas de pan y botón volver */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <nav aria-label="Migas de pan" className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="hover:text-[#0F76BB] dark:hover:text-[#60B5F6] font-semibold transition-colors"
            >
              Inicio
            </a>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900 dark:text-white font-bold">
              {isFeder ? 'FEDER' : 'Programa Bono Energía Peme 2025: IN417Z'}
            </span>
          </nav>

          <a
            href="/"
            onClick={(e) => onNavigate('/', e)}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Volver a inicio</span>
          </a>
        </div>

        {/* Pestañas rápidas entre ambas ayudas oficiales */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <a
            href="/feder"
            onClick={(e) => onNavigate('/feder', e)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
              isFeder
                ? 'bg-[#002147] text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB]'
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-[#60B5F6]" aria-hidden="true" />
            <span>FEDER (Re-Acciona TIC)</span>
          </a>

          <a
            href="/programa-bono-energia-peme-2025-in417z"
            onClick={(e) => onNavigate('/programa-bono-energia-peme-2025-in417z', e)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-colors ${
              !isFeder
                ? 'bg-[#002147] text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB]'
            }`}
          >
            <FileCheck2 className="w-4 h-4 text-[#60B5F6]" aria-hidden="true" />
            <span>Programa Bono Energía Peme 2025: IN417Z</span>
          </a>
        </div>

        {isFeder ? (
          /* PÁGINA 1: FEDER (Programa Re-Acciona TIC) */
          <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="bg-[#002147] px-6 py-6 sm:px-8 sm:py-7 text-white border-b border-white/10">
              <p className="text-xs font-mono uppercase tracking-wider text-[#60B5F6] mb-1.5">
                Publicidade e transparencia institucional · {CONTACT_INFO.legalName}
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                FEDER — Programa Re-Acciona TIC (Empresa Dixital)
              </h1>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Cartel oficial FEDER sobre fondo blanco para garantizar contraste institucional */}
              <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 flex justify-center shadow-xs">
                <img
                  src="/images/subvenciones/feder-reacciona-tic.png"
                  alt="Cartel informativo oficial del Programa Re-Acciona TIC cofinanciado por la Unión Europea (Programa Operativo FEDER Galicia 2014-2020), Xunta de Galicia, IGAPE y AMTEGA"
                  className="w-full max-w-3xl h-auto object-contain"
                />
              </div>

              {/* Transcripción accesible íntegra del cartel oficial */}
              <div className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 p-5 sm:p-6 space-y-3 text-center">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                  Programa Re-Acciona TIC: servizos de asistencia, diagnóstico e implantación de solucións de Empresa Dixital
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                  Esta empresa participa no Programa Re-Acciona TIC (Empresa Dixital), cuxo resultado é o impulso e promoción de actividades de I+i lideradas polas empresas, apoio á creación e consolidación de empresas innovadoras e apoio á compra pública innovadora.
                </p>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-1">
                  <p className="text-sm sm:text-base font-bold text-[#002147] dark:text-[#60B5F6]">
                    Operación cofinanciada pola Unión Europea · Programa Operativo FEDER Galicia 2014-2020
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    Promover o desenvolvemento tecnolóxico, a innovación e unha investigación de calidade
                  </p>
                  <p className="text-sm font-bold italic text-slate-900 dark:text-white pt-1">
                    «Unha maneira de facer Europa»
                  </p>
                </div>
              </div>
            </div>
          </article>
        ) : (
          /* PÁGINA 2: PROGRAMA BONO ENERGÍA PEME 2025: IN417Z */
          <article className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="bg-[#002147] px-6 py-6 sm:px-8 sm:py-7 text-white border-b border-white/10">
              <p className="text-xs font-mono uppercase tracking-wider text-[#60B5F6] mb-1.5">
                Instituto Enerxético de Galicia (INEGA) · {CONTACT_INFO.legalName}
              </p>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Programa Bono Energía Peme 2025: IN417Z
              </h1>
            </div>

            <div className="p-6 sm:p-8 space-y-10">
              {/* 1. Cartel oficial INEGA / Xunta de Galicia */}
              <section aria-labelledby="cartel-bono-energia" className="space-y-4">
                <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-5 flex justify-center shadow-xs">
                  <img
                    src="/images/subvenciones/programa-bono-energia-peme-2025.jpg"
                    alt="Cartel informativo oficial de la Convocatoria de Subvencións do Instituto Enerxético de Galicia para proxectos de Mellora Enerxética dirixido ao sector servizos — Programa Bono enerxía Peme 2025 (IN417Z)"
                    className="w-full max-w-3xl h-auto object-contain"
                  />
                </div>

                <div
                  id="cartel-bono-energia"
                  className="rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 p-5 text-center space-y-1.5"
                >
                  <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                    Convocatoria de Subvencións do Instituto Enerxético de Galicia para proxectos de Mellora Enerxética dirixido ao sector servizos
                  </p>
                  <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                    Programa Bono enerxía Peme 2025 (Código de procedemento: IN417Z)
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    Operación cofinanciada pola Xunta de Galicia · Conseguir unha economía mais limpa e sostible
                  </p>
                </div>
              </section>

              {/* 2. Actuación subvencionada y fotografía del equipamiento instalado */}
              <section
                aria-labelledby="actuacion-secadora"
                className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-5"
              >
                <div className="text-center space-y-2">
                  <span className="inline-block text-xs font-mono uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6] font-bold">
                    Actuación realizada
                  </span>
                  <h2
                    id="actuacion-secadora"
                    className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight"
                  >
                    SUSTITUCIÓN DE SECADORA GIRBAU STI-23 POR SECADORA DOMUS DTT2-18 E
                  </h2>
                </div>

                <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 flex justify-center">
                  <img
                    src="/images/subvenciones/secadora-domus-dtt2-18e.jpg"
                    alt="Sustitución de secadora Girbau STI-23 por nueva secadora eficiente de doble tambor Domus DTT2-18 E en Tintorería Mimos Navia"
                    className="w-full max-w-md h-auto rounded-lg object-contain shadow-sm"
                    loading="lazy"
                  />
                </div>
              </section>
            </div>
          </article>
        )}

        {/* Pie de página de navegación entre subvenciones */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <p>
            Titular: <strong className="text-slate-900 dark:text-white">{CONTACT_INFO.legalName}</strong> ({CONTACT_INFO.streetAddress}, {CONTACT_INFO.postalCode} {CONTACT_INFO.locality})
          </p>
          <a
            href={isFeder ? '/programa-bono-energia-peme-2025-in417z' : '/feder'}
            onClick={(e) =>
              onNavigate(isFeder ? '/programa-bono-energia-peme-2025-in417z' : '/feder', e)
            }
            className="inline-flex items-center gap-1.5 font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline"
          >
            <span>
              {isFeder
                ? 'Ver Programa Bono Energía Peme 2025: IN417Z'
                : 'Ver cartel FEDER (Programa Re-Acciona TIC)'}
            </span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </main>
  );
};
