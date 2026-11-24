import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react';
import {
  IMAGES,
  PUNTOS_COLABORADORES,
  SERVICIOS_MIMOS,
  TIENDAS_PROPIAS,
  buildMimoWhatsAppUrl,
} from '../../data/mimosData';
import { trackWhatsAppClick } from '../../utils/analytics';
import limpiezaSofasImg from '../../assets/images/limpieza_sofas_domicilio_1794599721481.webp';

interface PreviewCatalogSectionProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

interface EditorialServiceRow {
  title: string;
  scope: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

const EDITORIAL_SERVICES: EditorialServiceRow[] = [
  {
    title: 'Tintorería, trajes y ceremonia',
    scope: 'Limpieza en seco y Wet Cleaning',
    description:
      'Trajes, americanas, abrigos, vestidos de fiesta, comunión y novia tratados prenda a prenda con planchado artesanal al vapor.',
    primaryHref: '/tintoreria-vigo',
    primaryLabel: 'Tintorería',
    secondaryHref: '/limpieza-vestidos-novia-ceremonia-vigo',
    secondaryLabel: 'Novia y ceremonia',
  },
  {
    title: 'Lavandería atendida y solo planchado',
    scope: 'Sin monedas · Entrega doblada o en percha',
    description:
      'Separación por color y fibra. Servicio 100 % atendido para tu colada semanal o únicamente planchado de camisas y pantalones.',
    primaryHref: '/colada-familiar-vigo',
    primaryLabel: 'Colada familiar',
    secondaryHref: '/planchado-vigo',
    secondaryLabel: 'Solo planchado',
  },
  {
    title: 'Sofás, tapicerías y colchones a domicilio',
    scope: 'Inyección-extracción · Secado natural al aire',
    description:
      'Limpiamos sofás, chaise longue, butacas y colchones en tu propia casa sin vapor en seco, sin productos enzimáticos y sin ventiladores.',
    primaryHref: '/limpieza-sofas-vigo',
    primaryLabel: 'Sofás a domicilio',
  },
  {
    title: 'Edredones, mantas y cortinas',
    scope: 'Maquinaria de gran formato en Navia',
    description:
      'Nórdicos de plumas, colchas, fundas, estores y cortinas con lavado adaptado y secado completo pensado para la humedad de Vigo.',
    primaryHref: '/textiles-hogar-vigo',
    primaryLabel: 'Textiles del hogar',
  },
  {
    title: 'Limpieza y reparación de alfombras',
    scope: 'Lavado plano + reparación de flecos y ribetes',
    description:
      'Recogida en puerta o entrega en tienda para alfombras de lana, seda, yute o fibras modernas, con restauración artesanal de bordes mediante especialista.',
    primaryHref: '/limpieza-alfombras-vigo',
    primaryLabel: 'Limpieza alfombras',
    secondaryHref: '/reparacion-alfombras-vigo',
    secondaryLabel: 'Arreglo de flecos',
  },
  {
    title: 'Arreglos de ropa, costura profesional y pieles/cuero',
    scope: 'Talleres en Gregorio Espino y Venezuela · Recepción Navia',
    description:
      'Bajos, cremalleras, ajustes de talla, cortinas y composturas en cuero, junto con limpieza e hidratación de ante, nobuk y peletería.',
    primaryHref: '/arreglos-de-ropa-vigo',
    primaryLabel: 'Arreglos y costura',
    secondaryHref: '/limpieza-pieles-cuero-vigo',
    secondaryLabel: 'Pieles y cuero',
  },
];

export const PreviewCatalogSection: React.FC<PreviewCatalogSectionProps> = ({
  onNavigate,
}) => {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const whatsappSofasHref = buildMimoWhatsAppUrl(
    'Hola, Mimo. Quiero pedir valoración enviando foto de mi sofá, colchón o alfombra en Vigo.'
  );

  return (
    <>
      {/* 1. CARTA ABIERTA DE SERVICIOS (Líneas de 1 px, sin tarjetitas ni cajas gris-azuladas) */}
      <section
        id="servicios"
        aria-labelledby="catalog-heading"
        className="py-16 lg:py-24 bg-[#F7F6F2] border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Columna izquierda: Titular editorial + foto real mostrador Navia + secuencia real 1-2-3 */}
            <div className="lg:col-span-5 space-y-7">
              <div className="space-y-3">
                <p className="text-xs sm:text-sm font-bold text-[#0F76BB]">
                  Oficio textil · Planta central en Navia
                </p>
                <h2
                  id="catalog-heading"
                  className="text-3xl sm:text-4xl font-extrabold text-[#002147] tracking-tight leading-tight text-balance"
                >
                  Todo lo que atendemos en mostrador y a domicilio
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Sin autoservicio anónimo ni esperas. Trabajamos prenda a prenda y te orientamos por WhatsApp si tienes duda antes de venir.
                </p>
              </div>

              <figure className="space-y-2">
                <div className="aspect-[4/3] overflow-hidden rounded-sm bg-[#EDF5FD]">
                  {!imgErrors['mostrador'] ? (
                    <img
                      src="/images/navia/mostrador-recepcion-mimos-navia-vigo.webp"
                      alt="Mostrador de atención y recepción en Tintorería Mimos Navia, Vigo"
                      width={1200}
                      height={900}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setImgErrors((prev) => ({ ...prev, mostrador: true }))
                      }
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#002147] font-bold p-6">
                      Mostrador Tintorería Mimos Navia
                    </div>
                  )}
                </div>
                <figcaption className="text-xs text-slate-500">
                  Mostrador central en Navia · Revisión directa de tejidos al recibir cada encargo.
                </figcaption>
              </figure>

              {/* Secuencia real cronológica en 3 pasos */}
              <div className="pt-5 border-t border-slate-300/80 space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Cómo trabajamos
                </p>
                <ol className="space-y-3 text-sm">
                  <li className="flex items-baseline gap-3">
                    <span className="font-mono font-bold text-[#0F76BB] shrink-0">
                      01
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-[#002147]">
                        Entrega sin mínimo:
                      </strong>{' '}
                      en {TIENDAS_PROPIAS.length} tiendas propias o{' '}
                      {PUNTOS_COLABORADORES.length} puntos (o recogida sujeta a ruta).
                    </span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span className="font-mono font-bold text-[#0F76BB] shrink-0">
                      02
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-[#002147]">
                        Tratamiento por fibra:
                      </strong>{' '}
                      en planta de Navia, talleres de costura o in situ en tu sofá.
                    </span>
                  </li>
                  <li className="flex items-baseline gap-3">
                    <span className="font-mono font-bold text-[#0F76BB] shrink-0">
                      03
                    </span>
                    <span className="text-slate-700">
                      <strong className="text-[#002147]">
                        Aviso por WhatsApp:
                      </strong>{' '}
                      en cuanto está revisado y listo para recoger o entregar.
                    </span>
                  </li>
                </ol>
              </div>
            </div>

            {/* Columna derecha: Lista abierta editorial de especialidades */}
            <div className="lg:col-span-7 divide-y divide-slate-300/80 border-t border-b border-slate-300/80">
              {EDITORIAL_SERVICES.map((srv) => (
                <article key={srv.title} className="py-6 sm:py-7 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] tracking-tight">
                      <a
                        href={srv.primaryHref}
                        onClick={(e) => onNavigate(srv.primaryHref, e)}
                        className="hover:text-[#0F76BB] transition-colors"
                      >
                        {srv.title}
                      </a>
                    </h3>
                    <span className="text-xs font-semibold text-[#0F76BB] shrink-0">
                      {srv.scope}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                    {srv.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 pt-0.5 text-xs sm:text-sm font-bold">
                    <a
                      href={srv.primaryHref}
                      onClick={(e) => onNavigate(srv.primaryHref, e)}
                      className="inline-flex items-center gap-1 min-h-[44px] text-[#002147] hover:underline"
                    >
                      <span>{srv.primaryLabel}</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                    {srv.secondaryHref && srv.secondaryLabel && (
                      <a
                        href={srv.secondaryHref}
                        onClick={(e) => onNavigate(srv.secondaryHref!, e)}
                        className="inline-flex items-center gap-1 min-h-[44px] text-[#0F76BB] hover:underline"
                      >
                        <span>{srv.secondaryLabel}</span>
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. DÍPTICO FOTOGRÁFICO HOGAR Y TALLER (Sofás in situ + Alfombras) */}
      <section
        id="hogar-tapicerias"
        aria-labelledby="craft-heading"
        className="py-16 lg:py-22 bg-white border-b border-slate-200"
      >
        <div id="alfombras" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs sm:text-sm font-bold text-[#0F76BB]">
                Hogar y cuidado especializado en Vigo
              </p>
              <h2
                id="craft-heading"
                className="text-2xl sm:text-4xl font-extrabold text-[#002147] tracking-tight text-balance"
              >
                Sofás, colchones y alfombras sin mover tú nada
              </h2>
            </div>

            <a
              href={whatsappSofasHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('/', 'craft_whatsapp')}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#1FA855] hover:bg-[#178A47] text-white text-sm font-bold px-5 py-2.5 rounded-sm transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              <span>Enviar foto por WhatsApp</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Sofás y colchones */}
            <article className="space-y-4">
              <a
                href="/limpieza-sofas-vigo"
                onClick={(e) => onNavigate('/limpieza-sofas-vigo', e)}
                className="block aspect-[16/10] overflow-hidden rounded-sm bg-[#EDF5FD] group"
              >
                {!imgErrors['sofa'] ? (
                  <img
                    src={limpiezaSofasImg}
                    alt="Limpieza de sofás y colchones a domicilio en Vigo"
                    width={1200}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => setImgErrors((prev) => ({ ...prev, sofa: true }))}
                    className="w-full h-full object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#002147] font-bold p-6">
                    Sofás y colchones a domicilio
                  </div>
                )}
              </a>
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-[#002147]">
                  Limpieza de sofás y colchones en casa
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Inyección-extracción controlada para 2/3 plazas, chaise longue, butacas y colchones. Sin vapor en seco, sin productos enzimáticos y con secado natural al aire.
                </p>
                <a
                  href="/limpieza-sofas-vigo"
                  onClick={(e) => onNavigate('/limpieza-sofas-vigo', e)}
                  className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold text-[#002147] hover:underline"
                >
                  <span>Cómo limpiamos sofás y tapicerías</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </article>

            {/* Alfombras */}
            <article className="space-y-4">
              <a
                href="/limpieza-alfombras-vigo"
                onClick={(e) => onNavigate('/limpieza-alfombras-vigo', e)}
                className="block aspect-[16/10] overflow-hidden rounded-sm bg-[#EDF5FD] group"
              >
                {!imgErrors['alfombras'] ? (
                  <img
                    src={IMAGES.alfombrasMimos}
                    srcSet="/alfombras-mimos-640w.webp 640w, /alfombras-mimos.webp 1024w"
                    sizes="(max-width: 767px) 100vw, 50vw"
                    alt="Revisión y medición profesional de una alfombra de lana"
                    width={1200}
                    height={750}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => setImgErrors((prev) => ({ ...prev, alfombras: true }))}
                    className="w-full h-full object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-[1.02]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#002147] font-bold p-6">
                    Limpieza y reparación de alfombras
                  </div>
                )}
              </a>
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-[#002147]">
                  Alfombras: limpieza profunda y arreglo de flecos
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Lana, seda, yute o fibras sintéticas con secado completo libre de humedad, más reparación de flecos, festón y ribetes mediante especialista.
                </p>
                <div className="flex flex-wrap items-center gap-5">
                  <a
                    href="/limpieza-alfombras-vigo"
                    onClick={(e) => onNavigate('/limpieza-alfombras-vigo', e)}
                    className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold text-[#002147] hover:underline"
                  >
                    <span>Limpieza de alfombras</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                  <a
                    href="/reparacion-alfombras-vigo"
                    onClick={(e) => onNavigate('/reparacion-alfombras-vigo', e)}
                    className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold text-[#0F76BB] hover:underline"
                  >
                    <span>Reparación y flecos</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* Directorio visible de enlaces a todas las especialidades (SEO + acceso directo) */}
          <nav
            aria-label="Índice completo de especialidades"
            className="pt-6 border-t border-slate-200 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs sm:text-sm"
          >
            <span className="font-bold text-slate-500">
              Todas las especialidades:
            </span>
            {SERVICIOS_MIMOS.map((srv) => (
              <a
                key={srv.url}
                href={srv.url}
                onClick={(e) => onNavigate(srv.url, e)}
                className="inline-flex items-center min-h-[44px] font-bold text-[#002147] hover:text-[#0F76BB] hover:underline"
              >
                {srv.titulo}
              </a>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
};
