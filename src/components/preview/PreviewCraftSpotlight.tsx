import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, ArrowRight, ArrowUpRight, Sofa, Scissors, Layers } from 'lucide-react';
import { CONTACT_INFO, IMAGES, buildMimoWhatsAppUrl } from '../../data/mimosData';
import { trackWhatsAppClick } from '../../utils/analytics';
import limpiezaSofasImg from '../../assets/images/limpieza_sofas_domicilio_1794599721481.jpg';

interface PreviewCraftSpotlightProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const PreviewCraftSpotlight: React.FC<PreviewCraftSpotlightProps> = ({
  onNavigate,
}) => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const sofaSteps = [
    {
      num: '01',
      title: 'Inyección-extracción en tu casa',
      desc: 'Actuamos directamente sobre tela y costura sin trasladar el sofá fuera de tu salón.',
    },
    {
      num: '02',
      title: 'Sin vapor en seco ni enzimáticos',
      desc: 'Cuidamos los tejidos con aclarado técnico equilibrado para no dejar olores ni cercos.',
    },
    {
      num: '03',
      title: 'Secado natural al aire',
      desc: 'Sin ventiladores ni aire caliente forzado que pueda deformar fundas o acolchados.',
    },
  ];

  const whatsappSofasHref = buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero pedir valoración para limpiar un sofá o tapicería a domicilio en Vigo. Te envío foto en este chat.'
  );

  return (
    <section
      id="alfombras"
      aria-labelledby="preview-craft-heading"
      className="py-18 lg:py-26 bg-[#FAFBFD] dark:bg-[#09182e] border-b border-slate-200/70 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* FILA 1: SOFÁS A DOMICILIO ESTILO BOUTIQUE (Cameo + Celsious) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="rounded-3xl overflow-hidden bg-[#002147] aspect-[4/3] group">
              {!failedImages['sofa'] ? (
                <img
                  src={limpiezaSofasImg}
                  alt="Limpieza de sofás y tapicerías a domicilio en Vigo por Tintorería Mimos"
                  referrerPolicy="no-referrer"
                  onError={() => setFailedImages((prev) => ({ ...prev, sofa: true }))}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center text-white">
                  <Sofa className="w-10 h-10 text-[#60B5F6] mb-3" aria-hidden="true" />
                  <p className="text-base font-bold">Limpieza de sofás a domicilio en Vigo</p>
                </div>
              )}
            </div>
          </motion.div>

          <div className="lg:col-span-6 space-y-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3"
            >
              <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Hogar a domicilio · Vigo y alrededores
              </p>
              <h2
                id="preview-craft-heading"
                className="text-3xl sm:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance"
              >
                Limpieza de sofás y tapicerías directamente en tu casa
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Un servicio pensado para recuperar la higiene y frescura de sofás de 2/3 plazas, chaise longue, butacas y colchones sin complicarte.
              </p>
            </motion.div>

            {/* Cascada limpia sin bordes de caja */}
            <div className="space-y-5 pt-2">
              {sofaSteps.map((st, idx) => (
                <motion.div
                  key={st.num}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.35,
                    delay: idx * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-start gap-4"
                >
                  <span className="text-lg font-extrabold text-[#0F76BB] dark:text-[#60B5F6] tabular-nums shrink-0 mt-0.5">
                    {st.num}
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-[#002147] dark:text-white">
                      {st.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                      {st.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href={whatsappSofasHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('/preview-portada', 'craft_sofa')}
                className="inline-flex items-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white text-sm font-bold px-5 py-3.5 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Pedir presupuesto con foto</span>
              </a>
              <a
                href="/limpieza-sofas-vigo"
                onClick={(e) => onNavigate('/limpieza-sofas-vigo', e)}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline"
              >
                <span>Ver guía completa de sofás</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* FILA 2: DÍPTICO EN CASCADA (Alfombras en taller + Costura in situ) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-12 border-t border-slate-200/80 dark:border-slate-800">
          {/* Izquierda: Alfombras y flecos */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group space-y-5"
          >
            <div className="rounded-3xl overflow-hidden aspect-[16/10] bg-[#002147]">
              {!failedImages['alfombras'] ? (
                <img
                  src={IMAGES.alfombrasMimos}
                  alt="Limpieza y restauración de alfombras en Tintorería Mimos Navia"
                  referrerPolicy="no-referrer"
                  onError={() => setFailedImages((prev) => ({ ...prev, alfombras: true }))}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-bold p-6">
                  Limpieza y reparación de alfombras
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                <Layers className="w-4 h-4" aria-hidden="true" />
                <span>Recogida a domicilio o en tienda</span>
              </p>
              <h3 className="text-2xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                Limpieza profunda y arreglo de alfombras
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Lana, seda, yute o fibras modernas. Lavado plano en nuestras instalaciones de Navia junto con reposición de flecos y ribetes.
              </p>
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <a
                  href="/limpieza-alfombras-vigo"
                  onClick={(e) => onNavigate('/limpieza-alfombras-vigo', e)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline"
                >
                  <span>Ver limpieza y arreglos de alfombras</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={CONTACT_INFO.whatsappAlfombrasHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#178A47] dark:text-[#4ade80] hover:underline"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Valorar alfombra</span>
                </a>
              </div>
            </div>
          </motion.article>

          {/* Derecha: Costura y 18 arreglos */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="group space-y-5"
          >
            <div className="rounded-3xl overflow-hidden aspect-[16/10] bg-[#002147]">
              {!failedImages['costura'] ? (
                <img
                  src={IMAGES.arreglosRopa}
                  alt="Taller de costura y 18 arreglos de ropa en Vigo de Tintorería Mimos"
                  referrerPolicy="no-referrer"
                  onError={() => setFailedImages((prev) => ({ ...prev, costura: true }))}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white font-bold p-6">
                  Talleres de costura · 18 arreglos
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                <Scissors className="w-4 h-4" aria-hidden="true" />
                <span>Talleres en Gregorio Espino y Venezuela · Recepción en Navia</span>
              </p>
              <h3 className="text-2xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                Costura, composturas y confección de hogar
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                18 especialidades en taller propio y puntos de Gondomar, Ponteareas y O Porriño: bajos, cremalleras, arreglos en piel y cortinas a medida.
              </p>
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <a
                  href="/arreglos-de-ropa-vigo"
                  onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#002147] dark:text-[#60B5F6] hover:underline"
                >
                  <span>Explorar los 18 arreglos y talleres</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
                <a
                  href={CONTACT_INFO.whatsappArreglosHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#178A47] dark:text-[#4ade80] hover:underline"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Consultar arreglo</span>
                </a>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};
