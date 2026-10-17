import React, { useEffect, useState } from 'react';
import {
  MessageCircle,
  ArrowRight,
  MapPin,
  ArrowUpRight,
  Building2,
  UserCheck,
  Sparkles,
  Scissors,
} from 'lucide-react';
import { CONTACT_INFO, IMAGES, ZONAS_SEO_LOCAL } from '../data/mimosData';
import { getNaviaStoreStatus, StoreStatusInfo } from '../utils/storeStatus';

interface HeroSectionProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const [storeStatus, setStoreStatus] = useState<StoreStatusInfo>(() => getNaviaStoreStatus());

  useEffect(() => {
    const interval = setInterval(() => {
      setStoreStatus(getNaviaStoreStatus());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative bg-white dark:bg-[#071324] border-b border-slate-200/80 dark:border-slate-800 py-10 sm:py-14 lg:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column (7 cols): Value Proposition & Primary Actions (Sección 7.2 del Plan Maestro) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Etiqueta superior (Sección 7.2) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#002147] text-white text-xs sm:text-sm font-bold tracking-wide">
              <span className="h-2 w-2 rounded-full bg-[#60B5F6]" aria-hidden="true" />
              <span>Tintorería, lavandería y limpieza profesional en Vigo</span>
            </div>

            {/* Titular H1 exacto (Sección 7.2 y Sección 8: Nunito Sans 800 + guiño puntual con Sony Sketch) */}
            <h1
              id="hero-heading"
              className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-[#002147] dark:text-white tracking-tight leading-[1.12]"
            >
              Cuidamos tu ropa, tus textiles del hogar y tus espacios con{' '}
              <span className="font-sketch text-[#0F76BB] dark:text-[#60B5F6] text-[1.12em] font-bold">
                mimo profesional.
              </span>
            </h1>

            {/* Subtítulo explicando servicio a particulares, apartamentos turísticos y empresas */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
              Desde nuestras instalaciones en <strong>Navia (Vigo)</strong> damos servicio a{' '}
              <strong>particulares, apartamentos turísticos y empresas</strong>. Contamos con{' '}
              <strong>3 tiendas propias en Vigo</strong>, red de establecimientos colaboradores en{' '}
              <strong>Redondela, Gondomar, Ponteareas y O Porriño</strong>, y servicio de{' '}
              <strong>recogida y entrega a domicilio</strong>.
            </p>

            {/* Botón principal (verde WhatsApp) y secundario (Sección 7.2) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <a
                href={CONTACT_INFO.whatsappGeneralHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-5 sm:px-6 py-4 rounded-xl transition-colors shadow-sm text-center sm:whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Hablar con Mimo por WhatsApp</span>
              </a>

              <a
                href="/#recogida"
                onClick={(e) => onNavigate('/#recogida', e)}
                className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] dark:hover:bg-[#0B5C94] text-white font-bold text-sm sm:text-base px-5 sm:px-6 py-4 rounded-xl transition-colors text-center sm:whitespace-nowrap shrink-0"
              >
                <span>Solicitar recogida a domicilio</span>
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </a>
            </div>

            {/* Tres datos de confianza debajo (Sección 7.2) */}
            <dl className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0b1d36] border border-slate-200/80 dark:border-slate-800">
                <dt className="font-bold text-[#002147] dark:text-white">
                  1. Recogida a domicilio y en puntos
                </dt>
                <dd className="text-slate-600 dark:text-slate-300 text-xs mt-1">
                  Pasamos por tu casa o te atendemos en tu punto colaborador más cercano.
                </dd>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0b1d36] border border-slate-200/80 dark:border-slate-800">
                <dt className="font-bold text-[#002147] dark:text-white">
                  2. 3 tiendas en Vigo + red de puntos
                </dt>
                <dd className="text-slate-600 dark:text-slate-300 text-xs mt-1">
                  As Teixugueiras, Rúa Venezuela y Gregorio Espino + 5 puntos colaboradores.
                </dd>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0b1d36] border border-slate-200/80 dark:border-slate-800">
                <dt className="font-bold text-[#002147] dark:text-white">
                  3. Valoración inmediata con Mimo
                </dt>
                <dd className="text-slate-600 dark:text-slate-300 text-xs mt-1">
                  Te informamos por WhatsApp según el tipo de prenda, textil o servicio que necesites.
                </dd>
              </div>
            </dl>
          </div>

          {/* Right Column (5 cols): Brand Illustration / Facade & Live Store Status (Sección 7.2) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0b1d36] shadow-md">
              <div className="aspect-4/3 w-full overflow-hidden bg-[#002147] relative">
                <img
                  src={IMAGES.ositoMimos}
                  alt="Tintorería Mimos Navia en C/ As Teixugueiras 11, Vigo – Cuidado profesional de prendas y textiles"
                  width={800}
                  height={600}
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 sm:p-6 space-y-3">
                <div className="flex items-center justify-between gap-2 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1.5 text-[#002147] dark:text-white">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        storeStatus.isOpen ? 'bg-emerald-600' : 'bg-amber-500'
                      }`}
                      aria-hidden="true"
                    />
                    <span>{storeStatus.statusText}</span>
                  </span>
                  <span className="font-mono text-slate-500 dark:text-slate-400">
                    {CONTACT_INFO.postalCode} Vigo
                  </span>
                </div>

                <div>
                  <h2 className="text-base font-bold text-[#002147] dark:text-white">
                    Sede Central Mimos Navia · {CONTACT_INFO.streetAddress}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
                    Horario: {CONTACT_INFO.scheduleFullNavia}
                  </p>
                </div>

                {/* Enlaces directos a localidades */}
                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800">
                  <p className="text-xs font-semibold text-[#002147] dark:text-slate-200 mb-2 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0F76BB]" aria-hidden="true" />
                    <span>Tiendas en Vigo y puntos colaboradores por localidad:</span>
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {ZONAS_SEO_LOCAL.map((zona) => (
                      <a
                        key={zona.slug}
                        href={zona.url}
                        onClick={(e) => onNavigate(zona.url, e)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-700 text-[#002147] dark:text-slate-200 hover:border-[#0F76BB] hover:text-[#0F76BB] transition-colors"
                      >
                        <span>{zona.localidad}</span>
                        <ArrowUpRight className="w-3 h-3 text-[#0F76BB]" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Debajo del bloque principal: Dos tarjetas para elegir camino rápido (Sección 7.2) */}
        <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tarjeta 1: Soy particular */}
          <div className="rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-[#0F76BB] bg-slate-50/70 dark:bg-[#0b1d36] p-6 sm:p-7 flex flex-col justify-between transition-colors">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  <UserCheck className="w-4 h-4" aria-hidden="true" />
                  <span>Camino rápido · Particulares</span>
                </span>
                <span className="font-sketch text-base font-bold text-[#002147] dark:text-slate-200">
                  Tu ropa impecable
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-2">
                Soy particular
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                Tintorería para trajes y vestidos, lavandería, planchado profesional, colada familiar (lavado, secado y doblado) y limpieza de edredones, mantas, cortinas y alfombras.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-slate-200/80 dark:border-slate-800">
              <a
                href="/#servicios"
                onClick={(e) => onNavigate('/#servicios', e)}
                className="inline-flex items-center gap-1.5 bg-[#002147] hover:bg-[#0a3161] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
              >
                <span>Ver servicios para particulares</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="/puntos-mimos"
                onClick={(e) => onNavigate('/puntos-mimos', e)}
                className="inline-flex items-center gap-1.5 border border-slate-300 dark:border-slate-700 hover:border-[#0F76BB] text-[#002147] dark:text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
              >
                <span>Ver tiendas y puntos</span>
              </a>
            </div>
          </div>

          {/* Tarjeta 2: Soy empresa o alojamiento turístico */}
          <div className="rounded-2xl border-2 border-[#002147] dark:border-[#0F76BB]/60 bg-[#002147] text-white p-6 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-bold text-[#60B5F6]">
                  <Building2 className="w-4 h-4" aria-hidden="true" />
                  <span>Camino rápido · Empresas y Alojamientos</span>
                </span>
                <span className="font-sketch text-base font-bold text-[#60B5F6]">
                  Soluciones a medida
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                Soy empresa o alojamiento turístico
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed mb-5">
                Lavandería y limpieza profesional para apartamentos turísticos y viviendas vacacionales en Vigo, además de soluciones para viviendas, oficinas, locales y empresas con presupuesto personalizado.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-white/15">
              <a
                href="/limpieza-profesional-vigo"
                onClick={(e) => onNavigate('/limpieza-profesional-vigo', e)}
                className="inline-flex items-center gap-1.5 bg-[#0F76BB] hover:bg-[#0B5C94] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
              >
                <span>Ver división de limpieza y empresas</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href={CONTACT_INFO.whatsappApartamentosHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#178A47] hover:bg-[#126E38] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Pedir presupuesto a Mimo</span>
              </a>
            </div>
          </div>
        </div>

        {/* Fila de tres tarjetas estratégicas del mismo peso visual debajo de las dos líneas de negocio */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-5">
            <div>
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Servicios destacados en Vigo y área metropolitana
              </p>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white mt-0.5">
                Acceso directo a nuestras 3 áreas especializadas
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tarjeta Estratégica 1: Apartamentos turísticos */}
            <article className="rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB] bg-white dark:bg-[#0b1d36] p-6 flex flex-col justify-between transition-colors shadow-2xs">
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="w-4 h-4" aria-hidden="true" />
                    <span>01 · Alojamientos en Vigo</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white mb-2">
                  <a
                    href="/limpieza-apartamentos-turisticos-vigo"
                    onClick={(e) => onNavigate('/limpieza-apartamentos-turisticos-vigo', e)}
                    className="hover:text-[#0F76BB] dark:hover:text-[#60B5F6] transition-colors"
                  >
                    Apartamentos turísticos
                  </a>
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  Lavandería y planchado profesional de ropa de cama y toallas junto con soluciones de limpieza y preparación entre huéspedes para viviendas vacacionales en Vigo.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <a
                  href="/limpieza-apartamentos-turisticos-vigo"
                  onClick={(e) => onNavigate('/limpieza-apartamentos-turisticos-vigo', e)}
                  className="inline-flex items-center gap-1.5 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] dark:hover:bg-[#0B5C94] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
                >
                  <span>Ver servicio</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={CONTACT_INFO.whatsappApartamentosHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#178A47] dark:text-[#4ade80] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Consultar a Mimo</span>
                </a>
              </div>
            </article>

            {/* Tarjeta Estratégica 2: Limpieza de alfombras */}
            <article className="rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB] bg-white dark:bg-[#0b1d36] p-6 flex flex-col justify-between transition-colors shadow-2xs">
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" aria-hidden="true" />
                    <span>02 · Hogar y Recogida</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white mb-2">
                  <a
                    href="/limpieza-alfombras-vigo"
                    onClick={(e) => onNavigate('/limpieza-alfombras-vigo', e)}
                    className="hover:text-[#0F76BB] dark:hover:text-[#60B5F6] transition-colors"
                  >
                    Limpieza de alfombras
                  </a>
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  Recogemos tu alfombra a domicilio o la recibimos en nuestras 3 tiendas propias de Vigo para limpiarla y secarla en nuestras instalaciones y entregártela lista.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <a
                  href="/limpieza-alfombras-vigo"
                  onClick={(e) => onNavigate('/limpieza-alfombras-vigo', e)}
                  className="inline-flex items-center gap-1.5 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] dark:hover:bg-[#0B5C94] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
                >
                  <span>Ver servicio</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={CONTACT_INFO.whatsappAlfombrasHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#178A47] dark:text-[#4ade80] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Consultar a Mimo</span>
                </a>
              </div>
            </article>

            {/* Tarjeta Estratégica 3: Costura y arreglos de ropa */}
            <article className="rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB] bg-white dark:bg-[#0b1d36] p-6 flex flex-col justify-between transition-colors shadow-2xs">
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-3">
                  <span className="inline-flex items-center gap-1.5">
                    <Scissors className="w-4 h-4" aria-hidden="true" />
                    <span>03 · Tiendas y Talleres</span>
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white mb-2">
                  <a
                    href="/arreglos-de-ropa-vigo"
                    onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                    className="hover:text-[#0F76BB] dark:hover:text-[#60B5F6] transition-colors"
                  >
                    Costura y arreglos de ropa
                  </a>
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                  Bajos, cremalleras, botones, ajustes de talla y zurcidos en nuestras 3 tiendas propias de Vigo y en los puntos colaboradores con servicio de costura en Gondomar, Ponteareas y O Porriño.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <a
                  href="/arreglos-de-ropa-vigo"
                  onClick={(e) => onNavigate('/arreglos-de-ropa-vigo', e)}
                  className="inline-flex items-center gap-1.5 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] dark:hover:bg-[#0B5C94] text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
                >
                  <span>Ver servicio</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <a
                  href={CONTACT_INFO.whatsappArreglosHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#178A47] dark:text-[#4ade80] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Consultar a Mimo</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};
