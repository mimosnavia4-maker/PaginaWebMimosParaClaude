import React, { useState } from 'react';
import {
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Ruler,
  Truck,
  Store,
} from 'lucide-react';
import {
  IMAGES,
  SERVICIO_ALFOMBRAS_DATA,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';

interface CarpetCleaningSectionProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const CarpetCleaningSection: React.FC<CarpetCleaningSectionProps> = ({
  onNavigate,
}) => {
  const [imgError, setImgError] = useState(false);
  const [localidadRapida, setLocalidadRapida] = useState('Vigo');

  const whatsappAlfombraHref = buildMimoWhatsAppUrl(
    `Hola, Mimo. Quiero solicitar una valoración para limpiar una alfombra en ${localidadRapida}. Te indico a continuación las medidas aproximadas y te envío foto en el chat.`
  );

  return (
    <section
      id="alfombras"
      aria-labelledby="alfombras-home-heading"
      className="py-16 lg:py-24 bg-white dark:bg-[#071324] border-b border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border-2 border-[#002147] dark:border-[#0F76BB]/60 bg-slate-50/90 dark:bg-[#0b1d36] p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column (7 cols): Prioridad Comercial — Limpieza de Alfombras (Sección 16) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#002147] text-white text-xs sm:text-sm font-mono uppercase tracking-wider font-bold">
                <span>Servicio prioritario · Recogida y entrega</span>
              </div>

              <h2
                id="alfombras-home-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight leading-tight"
              >
                Limpieza profesional de alfombras en Vigo con recogida y entrega a domicilio
              </h2>

              <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
                Sabemos lo incómodo que resulta mover y transportar una alfombra de salón o dormitorio. Por eso en <strong>Tintorería Mimos Navia</strong> nos encargamos de <strong>recoger tu alfombra en tu domicilio</strong> (según cobertura y condiciones) o recibirla en nuestras <strong>3 tiendas propias en Vigo</strong>, limpiarla en nuestras instalaciones y entregártela lista.
              </p>

              {/* 3 Puntos Clave del Servicio */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                <div className="p-4 rounded-xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-[#0F76BB] dark:text-[#60B5F6] font-extrabold text-sm mb-1">
                    <Truck className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Recogida y entrega</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Recogemos la alfombra en tu casa para tratarla en nuestras instalaciones (no mojamos tu salón).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-[#0F76BB] dark:text-[#60B5F6] font-extrabold text-sm mb-1">
                    <Ruler className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Todo tipo de fibras</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Valoramos alfombras de lana, fibras naturales, sintéticas, pelo corto o largo y orientales.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-[#0F76BB] dark:text-[#60B5F6] font-extrabold text-sm mb-1">
                    <Store className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Valoración con Mimo</span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Presupuesto personalizado según medidas (largo × ancho), fibra y estado enviando foto por WhatsApp.
                  </p>
                </div>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 pt-1">
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    <strong>Cómo pedir presupuesto:</strong> abre el chat con Mimo, indícanos el <strong>largo × ancho</strong> aproximado y envíanos una foto de la alfombra dentro de WhatsApp.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2
                    className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <span>
                    <strong>Recepción en Vigo:</strong> a domicilio (según cobertura) o en nuestras 3 tiendas propias (As Teixugueiras 11, Rúa Venezuela 34 y Gregorio Espino 44).
                  </span>
                </li>
              </ul>

              {/* Selector rápido de localidad y Botones de Acción */}
              <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <a
                  href={whatsappAlfombraHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>Presupuestar mi alfombra con Mimo</span>
                </a>

                <a
                  href={SERVICIO_ALFOMBRAS_DATA.url}
                  onClick={(e) => onNavigate(SERVICIO_ALFOMBRAS_DATA.url, e)}
                  className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] dark:hover:bg-[#0B5C94] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Ver guía y servicio de alfombras</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Right Column (5 cols): Imagen WebP con alt descriptivo + Mini guía de medición */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] shadow-md">
                {!imgError && (
                  <div className="aspect-4/3 w-full overflow-hidden bg-[#002147]">
                    <img
                      src={IMAGES.alfombrasMimos}
                      alt="Alfombra de lana enrollada y extendida sobre mesa de revisión con cinta métrica para limpieza profesional en Vigo"
                      width={800}
                      height={600}
                      loading="lazy"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                      PREPARAR CONSULTA EN 1 MINUTO
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-[#002147] dark:text-white">
                    ¿Dónde está tu alfombra?
                  </h3>

                  <div className="flex flex-wrap gap-1.5">
                    {['Vigo', 'Redondela', 'Gondomar', 'Ponteareas', 'O Porriño'].map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => setLocalidadRapida(loc)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          localidadRapida === loc
                            ? 'bg-[#002147] text-white dark:bg-[#0F76BB]'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    Al abrir WhatsApp podrás enviar a <strong>Mimo</strong> las medidas aproximadas (<em>largo × ancho</em>) y adjuntar fotos de la alfombra para que confirme la valoración y las opciones de recogida en <strong>{localidadRapida}</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
