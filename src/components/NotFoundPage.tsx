import React from 'react';
import {
  Sparkles,
  Home,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Shirt,
  Scissors,
  Truck,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { CONTACT_INFO, TIENDAS_PROPIAS } from '../data/mimosData';

interface NotFoundPageProps {
  onNavigate: (path: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate }) => {
  const serviciosRecomendados = [
    {
      nombre: 'Limpieza de Alfombras',
      descripcion: 'Recogida y entrega a domicilio o en tiendas propias en Vigo.',
      url: '/limpieza-alfombras-vigo',
      icon: Layers,
      color: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60',
    },
    {
      nombre: 'Tintorería Profesional',
      descripcion: 'Limpieza en seco y Wet Cleaning para trajes, vestidos y prendas delicadas.',
      url: '/tintoreria-vigo',
      icon: Sparkles,
      color: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/60',
    },
    {
      nombre: 'Lavandería y Colada Familiar',
      descripcion: 'Edredones, mantas, sábanas y colada diaria lavada y doblada por kilos.',
      url: '/lavanderia-vigo',
      icon: Shirt,
      color: 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800/60',
    },
    {
      nombre: 'Arreglos de Ropa y Costura',
      descripcion: 'Bajos, cremalleras, estrechados y composturas en Vigo.',
      url: '/arreglos-de-ropa-vigo',
      icon: Scissors,
      color: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800/60',
    },
    {
      nombre: 'Recogida a Domicilio',
      descripcion: 'Servicio en Vigo, Redondela, Gondomar, Porriño y Ponteareas.',
      url: '/recogida-a-domicilio',
      icon: Truck,
      color: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/60',
    },
    {
      nombre: 'Limpieza de Pieles y Cuero',
      descripcion: 'Tratamiento específico para ante, nobuk, cuero y peletería.',
      url: '/limpieza-pieles-cuero-vigo',
      icon: Sparkles,
      color: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/60',
    },
  ];

  return (
    <main id="main-content" className="flex-1 py-12 md:py-16 bg-[#F4F8FA] dark:bg-[#071324]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabecera del 404 */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 dark:bg-blue-950/60 text-[#0F76BB] dark:text-sky-300 text-xs sm:text-sm font-semibold mb-4 border border-blue-200/60 dark:border-blue-800/50">
            <HelpCircle className="w-4 h-4" aria-hidden="true" />
            <span>Código de error 404 · Dirección no encontrada</span>
          </div>

          {/* Único H1 de la página con tabIndex -1 para foco accesible */}
          <h1
            tabIndex={-1}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#002147] dark:text-white tracking-tight mb-4 focus:outline-hidden"
          >
            Página no encontrada
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-8">
            La dirección que has introducido no existe o ha sido trasladada a una nueva sección.
            Puedes volver a la portada o acceder directamente a nuestros servicios principales en Vigo.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0F76BB] hover:bg-[#002147] text-white font-bold text-sm sm:text-base shadow-sm transition-colors focus:ring-2 focus:ring-[#0F76BB] focus:ring-offset-2"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              <span>Volver a la portada</span>
            </a>
            <a
              href="/contacto"
              onClick={(e) => onNavigate('/contacto', e)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-[#002147] dark:text-slate-100 font-bold text-sm sm:text-base border border-slate-200 dark:border-slate-700 transition-colors focus:ring-2 focus:ring-[#0F76BB] focus:ring-offset-2"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>Contactar con nosotros</span>
            </a>
          </div>
        </div>

        {/* Bloque de servicios frecuentes */}
        <section aria-labelledby="heading-servicios-404" className="mb-14">
          <div className="text-center mb-6">
            <h2
              id="heading-servicios-404"
              className="text-xl sm:text-2xl font-bold text-[#002147] dark:text-white"
            >
              ¿Qué servicio necesitas hoy?
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Accede a las secciones más consultadas de Tintorería Mimos
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviciosRecomendados.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.url}
                  href={item.url}
                  onClick={(e) => onNavigate(item.url, e)}
                  className="group p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-[#0F76BB]/50 dark:hover:border-sky-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-3 ${item.color}`}
                    >
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-bold text-[#002147] dark:text-white group-hover:text-[#0F76BB] dark:group-hover:text-sky-400 transition-colors">
                      {item.nombre}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                      {item.descripcion}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center text-xs font-bold text-[#0F76BB] dark:text-sky-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Ver información y tarifas</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* Bloque de tiendas y atención telefónica */}
        <section
          aria-labelledby="heading-contacto-404"
          className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xs"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2
                id="heading-contacto-404"
                className="text-lg sm:text-xl font-bold text-[#002147] dark:text-white"
              >
                Atención directa al cliente
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Llámanos o escríbenos por WhatsApp si no encuentras lo que buscas
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#0F76BB] dark:text-sky-300 font-bold text-sm border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
              <a
                href={CONTACT_INFO.whatsappBaseHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 font-bold text-sm border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                <span>WhatsApp: {CONTACT_INFO.whatsappNumber}</span>
              </a>
              <a
                href={CONTACT_INFO.emailHref}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>{CONTACT_INFO.email}</span>
              </a>
            </div>
          </div>

          <div className="pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">
              Nuestras 3 tiendas propias en Vigo:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TIENDAS_PROPIAS.map((tienda) => (
                <div
                  key={tienda.id}
                  className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800"
                >
                  <div className="flex items-start gap-2.5 mb-1.5">
                    <MapPin className="w-4 h-4 text-[#0F76BB] dark:text-sky-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="font-bold text-sm text-[#002147] dark:text-white">
                      {tienda.nombre_mostrado}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 pl-6">
                    {tienda.direccion} ({tienda.codigo_postal} {tienda.localidad})
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pl-6 mt-2">
                    <Clock className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{tienda.horario.resumen}</span>
                  </div>
                  <div className="pl-6 mt-2">
                    <a
                      href={`tel:+34${tienda.telefono}`}
                      className="text-xs font-bold text-[#0F76BB] dark:text-sky-400 hover:underline"
                    >
                      Tel. {tienda.telefonos_mostrados}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
