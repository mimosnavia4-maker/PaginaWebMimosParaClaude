import React, { useState } from 'react';
import {
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Ruler,
  Truck,
  Sofa,
  Scissors,
} from 'lucide-react';
import {
  IMAGES,
  SERVICIO_ALFOMBRAS_DATA,
  TIENDAS_PROPIAS,
  ZONAS_SERVICIO,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackWhatsAppClick } from '../utils/analytics';
import limpiezaSofasImg from '../assets/images/limpieza_sofas_domicilio_1794599721481.jpg';

interface CarpetCleaningSectionProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const CarpetCleaningSection: React.FC<CarpetCleaningSectionProps> = ({
  onNavigate,
}) => {
  const [sofaImgError, setSofaImgError] = useState(false);
  const [carpetImgError, setCarpetImgError] = useState(false);
  const [localidadRapida, setLocalidadRapida] = useState('Vigo');

  const whatsappSofasHref = buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero pedir presupuesto para limpieza de sofá o tapicería a domicilio en Vigo. Te envío foto de la pieza en este chat.'
  );

  const whatsappAlfombraHref = buildMimoWhatsAppUrl(
    `Hola, Mimo. Quiero solicitar una valoración para limpiar o arreglar una alfombra en ${localidadRapida}. Te indico las medidas aproximadas y te envío foto en el chat.`
  );

  return (
    <section
      id="alfombras"
      aria-labelledby="hogar-destacados-heading"
      className="py-16 lg:py-24 bg-white dark:bg-[#071324] border-b border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado conjunto de Ganchos 5 y 6 */}
        <div className="max-w-3xl mb-10">
          <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-2">
            Servicios destacados del hogar · Sofás in situ (5) · Alfombras y arreglos en taller (6)
          </p>
          <h2
            id="hogar-destacados-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance mb-3"
          >
            Limpieza de sofás a domicilio y limpieza o arreglo de alfombras en Vigo
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Dos soluciones específicas para piezas grandes del hogar: vamos a tu casa para higienizar tus sofás sin mover muebles y recogemos tus alfombras para lavarlas y reparar sus flecos o bordes en nuestras instalaciones.
          </p>
        </div>

        {/* Grid Doble: Gancho 5 (Sofás) + Gancho 6 (Alfombras y arreglos) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* TARJETA A — GANCHO 5: LIMPIEZA DE SOFÁS A DOMICILIO */}
          <article
            id="sofas-domicilio"
            className="rounded-3xl border-2 border-[#0F76BB]/30 dark:border-[#0F76BB]/60 bg-slate-50/90 dark:bg-[#0b1d36] overflow-hidden flex flex-col justify-between shadow-sm"
          >
            <div>
              {!sofaImgError ? (
                <div className="aspect-16/9 w-full overflow-hidden bg-[#002147]">
                  <img
                    src={limpiezaSofasImg}
                    alt="Limpieza profesional de sofá y tapicería por inyección-extracción en el domicilio del cliente en Vigo"
                    width={960}
                    height={540}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setSofaImgError(true)}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-16/9 w-full bg-[#002147] flex items-center justify-center p-6 text-center text-white">
                  <div className="space-y-2">
                    <Sofa className="w-10 h-10 mx-auto text-[#60B5F6]" aria-hidden="true" />
                    <p className="font-bold text-sm">
                      Limpieza de sofás y tapicerías a domicilio en Vigo
                    </p>
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                  <Sofa className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Servicio destacado 05 · In situ en tu domicilio</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                  Limpieza de sofás y tapicerías a domicilio
                </h3>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  Nos desplazamos a tu vivienda en Vigo y área de influencia con maquinaria de <strong>inyección-extracción controlada</strong> para eliminar suciedad acumulada, ácaros, olores y cercos sin tener que desmontar ni transportar el sofá.
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 pt-1">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Piezas tratadas:</strong> sofás de 2, 3 o más plazas, <em>chaise longue</em>, sillones, sillas tapizadas, cabeceros y colchones.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Fundas desenfundables:</strong> si tu sofá permite retirar las fundas, también las tratamos en nuestras tiendas o en taller.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Valoración rápida:</strong> envíanos una foto del sofá e indícanos el número de plazas para orientarte sobre el importe y los tiempos de secado.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappSofasHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick('/#sofas-domicilio', 'home_sofa_spotlight', {
                    service_id: 'limpieza-sofas',
                  })
                }
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Presupuestar sofá con Mimo</span>
              </a>

              <a
                href="/limpieza-sofas-vigo"
                onClick={(e) => onNavigate('/limpieza-sofas-vigo', e)}
                className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] dark:hover:bg-[#0B5C94] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap"
              >
                <span>Ver servicio de sofás</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </article>

          {/* TARJETA B — GANCHO 6: LIMPIEZA Y ARREGLO DE ALFOMBRAS */}
          <article className="rounded-3xl border-2 border-[#002147] dark:border-[#0F76BB]/60 bg-slate-50/90 dark:bg-[#0b1d36] overflow-hidden flex flex-col justify-between shadow-sm">
            <div>
              {!carpetImgError ? (
                <div className="aspect-16/9 w-full overflow-hidden bg-[#002147]">
                  <img
                    src={IMAGES.alfombrasMimos}
                    alt="Alfombra de lana enrollada y extendida sobre mesa de revisión con cinta métrica para limpieza y arreglo en Vigo"
                    width={960}
                    height={540}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setCarpetImgError(true)}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-16/9 w-full bg-[#002147] flex items-center justify-center p-6 text-center text-white">
                  <div className="space-y-2">
                    <Ruler className="w-10 h-10 mx-auto text-[#60B5F6]" aria-hidden="true" />
                    <p className="font-bold text-sm">
                      Limpieza y arreglo de alfombras en Vigo
                    </p>
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                  <Scissors className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Servicio destacado 06 · Limpieza y arreglo en taller</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                  Limpieza y arreglo de alfombras (flecos, ribetes y bordes)
                </h3>

                <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                  Tratamos alfombras de lana, sintéticas, pelo largo o nudo en nuestras instalaciones propias para no mojar tu suelo, e integramos <strong>reparación y restauración de alfombras</strong> cuando los extremos o ribetes se han desgastado.
                </p>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 pt-1">
                  <li className="flex items-start gap-2.5">
                    <Ruler
                      className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Arreglo de alfombras:</strong> reposición e igualado de flecos, refuerzo de ribetes (festón), bordes y reparación de descosidos previa foto.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Truck
                      className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>
                      <strong>Recogida y entrega:</strong> en domicilio (sujeto a importe mínimo y cobertura a consultar) o en nuestras {TIENDAS_PROPIAS.length} tiendas propias en Vigo.
                    </span>
                  </li>
                </ul>

                {/* Selector rápido de localidad para alfombra */}
                <div className="p-4 rounded-xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <p className="text-xs font-bold text-[#002147] dark:text-white">
                    ¿Dónde está tu alfombra? Elige localidad para preparar el WhatsApp:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {ZONAS_SERVICIO.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setLocalidadRapida(loc)}
                        className={`px-2.5 py-1 rounded-md text-xs font-bold transition-colors cursor-pointer ${
                          localidadRapida === loc
                            ? 'bg-[#002147] text-white dark:bg-[#0F76BB]'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappAlfombraHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick('/#alfombras', 'home_carpet_spotlight', {
                    service_id: 'limpieza-alfombras',
                  })
                }
                className="flex-1 inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Valorar alfombra en {localidadRapida}</span>
              </a>

              <a
                href={SERVICIO_ALFOMBRAS_DATA.url}
                onClick={(e) => onNavigate(SERVICIO_ALFOMBRAS_DATA.url, e)}
                className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] dark:hover:bg-[#0B5C94] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap"
              >
                <span>Ver limpieza y arreglos</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
