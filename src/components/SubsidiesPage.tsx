import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, FileCheck2, Sparkles } from 'lucide-react';
import { CONTACT_INFO } from '../data/mimosData';

interface SubsidiesPageProps {
  variant: 'feder' | 'bono-energia';
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const SubsidiesPage: React.FC<SubsidiesPageProps> = ({ variant, onNavigate }) => {
  const isFeder = variant === 'feder';
  const [failedImgs, setFailedImgs] = useState<Record<string, boolean>>({});

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="focus:outline-hidden bg-white border-b border-slate-200 flex-1"
    >
      {/* Cabecera luminosa de publicidad institucional */}
      <section className="py-10 sm:py-12 bg-gradient-to-br from-white via-[#F4F9FE] to-[#EDF5FD] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <nav aria-label="Migas de pan">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-slate-600">
                <li>
                  <a
                    href="/"
                    onClick={(e) => onNavigate('/', e)}
                    className="inline-flex items-center min-h-[36px] text-slate-600 hover:text-[#0F76BB] underline-offset-4 hover:underline font-medium transition-colors"
                  >
                    Inicio
                  </a>
                </li>
                <li aria-hidden="true" className="text-slate-400">/</li>
                <li className="font-bold text-[#0F76BB]">
                  {isFeder ? 'FEDER' : 'Programa Bono Energía Peme 2025: IN417Z'}
                </li>
              </ol>
            </nav>

            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-xl bg-white/95 border border-[#002147] hover:bg-[#002147] text-[#002147] hover:text-white text-xs sm:text-sm font-bold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Volver a portada</span>
            </a>
          </div>

          <p className="text-xs sm:text-sm font-bold text-[#0F76BB] mb-2">
            {isFeder
              ? `Publicidade e transparencia institucional · ${CONTACT_INFO.legalName}`
              : `Instituto Enerxético de Galicia (INEGA) · ${CONTACT_INFO.legalName}`}
          </p>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#002147] tracking-tight mb-6 text-balance">
            {isFeder
              ? 'FEDER — Programa Re-Acciona TIC (Empresa Dixital)'
              : 'Programa Bono Energía Peme 2025: IN417Z'}
          </h1>

          {/* Pestañas rápidas entre ambas ayudas oficiales */}
          <div className="flex flex-wrap items-center gap-2">
            <a
              href="/feder"
              onClick={(e) => onNavigate('/feder', e)}
              className={`inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                isFeder
                  ? 'bg-[#0F76BB] text-white shadow-xs'
                  : 'bg-white text-[#002147] border border-slate-200 hover:bg-[#EDF5FD]'
              }`}
            >
              <FileCheck2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>FEDER (Re-Acciona TIC)</span>
            </a>

            <a
              href="/programa-bono-energia-peme-2025-in417z"
              onClick={(e) => onNavigate('/programa-bono-energia-peme-2025-in417z', e)}
              className={`inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
                !isFeder
                  ? 'bg-[#0F76BB] text-white shadow-xs'
                  : 'bg-white text-[#002147] border border-slate-200 hover:bg-[#EDF5FD]'
              }`}
            >
              <FileCheck2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Programa Bono Energía Peme 2025: IN417Z</span>
            </a>
          </div>
        </div>
      </section>

      <div className="py-10 sm:py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {isFeder ? (
          /* PÁGINA 1: FEDER (Programa Re-Acciona TIC) */
          <article className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-6 sm:p-8 space-y-8">
            {/* Cartel oficial FEDER sobre fondo blanco para garantizar contraste institucional */}
            {!failedImgs.feder ? (
              <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 flex justify-center">
                <img
                  src="/images/subvenciones/feder-reacciona-tic.png"
                  alt="Cartel informativo oficial del Programa Re-Acciona TIC cofinanciado por la Unión Europea (Programa Operativo FEDER Galicia 2014-2020), Xunta de Galicia, IGAPE y AMTEGA"
                  referrerPolicy="no-referrer"
                  onError={() => setFailedImgs((prev) => ({ ...prev, feder: true }))}
                  className="w-full max-w-3xl h-auto object-contain"
                />
              </div>
            ) : (
              <div className="rounded-xl bg-[#EDF5FD] border border-slate-200 p-8 flex flex-col items-center justify-center text-center text-[#002147]">
                <Sparkles className="w-8 h-8 text-[#0F76BB] mb-2" aria-hidden="true" />
                <p className="font-bold">Cartel oficial FEDER — Programa Re-Acciona TIC</p>
              </div>
            )}

            {/* Transcripción accesible íntegra del cartel oficial */}
            <div className="rounded-xl bg-[#F7F6F2] border border-slate-200 p-5 sm:p-6 space-y-3 text-center">
              <h2 className="text-base sm:text-lg font-extrabold text-[#002147]">
                Programa Re-Acciona TIC: servizos de asistencia, diagnóstico e implantación de solucións de Empresa Dixital
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed">
                Esta empresa participa no Programa Re-Acciona TIC (Empresa Dixital), cuxo resultado é o impulso e promoción de actividades de I+i lideradas polas empresas, apoio á creación e consolidación de empresas innovadoras e apoio á compra pública innovadora.
              </p>
              <div className="pt-3 border-t border-slate-200 space-y-1">
                <p className="text-sm sm:text-base font-bold text-[#002147]">
                  Operación cofinanciada pola Unión Europea · Programa Operativo FEDER Galicia 2014-2020
                </p>
                <p className="text-xs sm:text-sm text-slate-700">
                  Promover o desenvolvemento tecnolóxico, a innovación e unha investigación de calidade
                </p>
                <p className="text-sm font-bold italic text-[#0F76BB] pt-1">
                  «Unha maneira de facer Europa»
                </p>
              </div>
            </div>
          </article>
        ) : (
          /* PÁGINA 2: PROGRAMA BONO ENERGÍA PEME 2025: IN417Z */
          <article className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden p-6 sm:p-8 space-y-10">
            {/* 1. Cartel oficial INEGA / Xunta de Galicia */}
            <section aria-labelledby="cartel-bono-energia" className="space-y-4">
              {!failedImgs.bono ? (
                <div className="bg-white rounded-xl border border-slate-200 p-3 sm:p-5 flex justify-center">
                  <img
                    src="/images/subvenciones/programa-bono-energia-peme-2025.webp"
                    alt="Cartel informativo oficial de la Convocatoria de Subvencións do Instituto Enerxético de Galicia para proxectos de Mellora Enerxética dirixido ao sector servizos — Programa Bono enerxía Peme 2025 (IN417Z)"
                    referrerPolicy="no-referrer"
                    onError={() => setFailedImgs((prev) => ({ ...prev, bono: true }))}
                    className="w-full max-w-3xl h-auto object-contain"
                  />
                </div>
              ) : (
                <div className="rounded-xl bg-[#EDF5FD] border border-slate-200 p-8 flex flex-col items-center justify-center text-center text-[#002147]">
                  <Sparkles className="w-8 h-8 text-[#0F76BB] mb-2" aria-hidden="true" />
                  <p className="font-bold">Cartel oficial Programa Bono Energía Peme 2025 (IN417Z)</p>
                </div>
              )}

              <div
                id="cartel-bono-energia"
                className="rounded-xl bg-[#F7F6F2] border border-slate-200 p-5 text-center space-y-1.5"
              >
                <p className="text-sm sm:text-base font-extrabold text-[#002147]">
                  Convocatoria de Subvencións do Instituto Enerxético de Galicia para proxectos de Mellora Enerxética dirixido ao sector servizos
                </p>
                <p className="text-sm font-bold text-[#0F76BB]">
                  Programa Bono enerxía Peme 2025 (Código de procedemento: IN417Z)
                </p>
                <p className="text-xs sm:text-sm text-slate-700">
                  Operación cofinanciada pola Xunta de Galicia · Conseguir unha economía mais limpa e sostible
                </p>
              </div>
            </section>

            {/* 2. Actuación subvencionada y fotografía del equipamiento instalado */}
            <section
              aria-labelledby="actuacion-secadora"
              className="pt-6 border-t border-slate-200 space-y-5"
            >
              <div className="text-center space-y-1.5">
                <p className="text-xs font-bold text-[#0F76BB]">
                  Actuación realizada
                </p>
                <h2
                  id="actuacion-secadora"
                  className="text-lg sm:text-xl font-extrabold text-[#002147] tracking-tight"
                >
                  SUSTITUCIÓN DE SECADORA GIRBAU STI-23 POR SECADORA DOMUS DTT2-18 E
                </h2>
              </div>

              {!failedImgs.secadora ? (
                <div className="bg-[#F4F9FE] rounded-xl border border-slate-200 p-4 sm:p-6 flex justify-center">
                  <img
                    src="/images/subvenciones/secadora-domus-dtt2-18e.webp"
                    alt="Sustitución de secadora Girbau STI-23 por nueva secadora eficiente de doble tambor Domus DTT2-18 E en Tintorería Mimos Navia"
                    className="w-full max-w-md h-auto rounded-lg object-contain shadow-xs"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setFailedImgs((prev) => ({ ...prev, secadora: true }))}
                  />
                </div>
              ) : (
                <div className="rounded-xl bg-[#EDF5FD] border border-slate-200 p-8 flex flex-col items-center justify-center text-center text-[#002147]">
                  <Sparkles className="w-8 h-8 text-[#0F76BB] mb-2" aria-hidden="true" />
                  <p className="font-bold">Secadora Domus DTT2-18 E — Tintorería Mimos Navia</p>
                </div>
              )}
            </section>
          </article>
        )}

        {/* Pie de página de navegación entre subvenciones */}
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
          <p>
            Titular: <strong className="text-[#002147]">{CONTACT_INFO.legalName}</strong> ({CONTACT_INFO.streetAddress}, {CONTACT_INFO.postalCode} {CONTACT_INFO.locality})
          </p>
          <a
            href={isFeder ? '/programa-bono-energia-peme-2025-in417z' : '/feder'}
            onClick={(e) =>
              onNavigate(isFeder ? '/programa-bono-energia-peme-2025-in417z' : '/feder', e)
            }
            className="inline-flex items-center gap-1.5 min-h-[44px] font-bold text-[#0F76BB] hover:underline"
          >
            <span>
              {isFeder
                ? 'Ver Programa Bono Energía Peme 2025: IN417Z'
                : 'Ver cartel FEDER (Programa Re-Acciona TIC)'}
            </span>
            <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </main>
  );
};
