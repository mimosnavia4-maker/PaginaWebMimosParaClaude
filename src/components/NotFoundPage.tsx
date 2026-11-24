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
  MessageCircle,
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
    },
    {
      nombre: 'Tintorería Profesional',
      descripcion: 'Limpieza en seco y Wet Cleaning para trajes, vestidos y prendas delicadas.',
      url: '/tintoreria-vigo',
      icon: Sparkles,
    },
    {
      nombre: 'Lavandería y Colada Familiar',
      descripcion: 'Edredones, mantas, sábanas y colada diaria lavada y doblada por kilos.',
      url: '/lavanderia-vigo',
      icon: Shirt,
    },
    {
      nombre: 'Arreglos de Ropa y Costura',
      descripcion: 'Bajos, cremalleras, estrechados y composturas en Vigo.',
      url: '/arreglos-de-ropa-vigo',
      icon: Scissors,
    },
    {
      nombre: 'Recogida a Domicilio',
      descripcion: 'Servicio en Vigo, Redondela, Gondomar, Porriño y Ponteareas.',
      url: '/recogida-a-domicilio',
      icon: Truck,
    },
    {
      nombre: 'Limpieza de Pieles y Cuero',
      descripcion: 'Tratamiento específico para ante, nobuk, cuero y peletería.',
      url: '/limpieza-pieles-cuero-vigo',
      icon: Sparkles,
    },
  ];

  return (
    <main id="main-content" className="flex-1 bg-white border-b border-slate-200">
      {/* Cabecera luminosa 404 */}
      <section className="py-12 sm:py-16 bg-gradient-to-br from-white via-[#F4F9FE] to-[#EDF5FD] border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm font-bold text-[#0F76BB] mb-2 tabular-nums">
            Error 404 · Dirección no encontrada
          </p>

          {/* Único H1 de la página con tabIndex -1 para foco accesible */}
          <h1
            tabIndex={-1}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#002147] tracking-tight mb-4 focus:outline-hidden text-balance"
          >
            Página no encontrada
          </h1>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto mb-8">
            La dirección que has introducido no existe o ha sido trasladada a una nueva sección.
            Puedes volver a la portada o acceder directamente a nuestros servicios principales en Vigo.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm sm:text-base shadow-xs transition-colors"
            >
              <Home className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Volver a la portada</span>
            </a>
            <a
              href="/contacto"
              onClick={(e) => onNavigate('/contacto', e)}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-3 rounded-xl bg-white/95 border border-[#002147] hover:bg-[#002147] text-[#002147] hover:text-white font-bold text-sm sm:text-base transition-colors group"
            >
              <Phone className="w-4 h-4 text-[#0F76BB] group-hover:text-white shrink-0" aria-hidden="true" />
              <span>Contactar con nosotros</span>
            </a>
          </div>
        </div>
      </section>

      {/* Bloque de servicios frecuentes */}
      <section aria-labelledby="heading-servicios-404" className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2
              id="heading-servicios-404"
              className="text-xl sm:text-2xl font-extrabold text-[#002147]"
            >
              ¿Qué servicio necesitas hoy?
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Accede a las secciones más consultadas de Tintorería Mimos
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {serviciosRecomendados.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.url}
                  href={item.url}
                  onClick={(e) => onNavigate(item.url, e)}
                  className="group p-5 rounded-2xl bg-[#F4F9FE] hover:bg-[#EDF5FD] border border-slate-200 hover:border-[#0F76BB] transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-[#0F76BB] mb-3">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-extrabold text-[#002147] group-hover:text-[#0F76BB] transition-colors">
                      {item.nombre}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                      {item.descripcion}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center text-xs font-bold text-[#0F76BB]">
                    <span>Ver información y servicios</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bloque de tiendas y atención telefónica */}
      <section
        aria-labelledby="heading-contacto-404"
        className="py-12 sm:py-16 bg-[#F7F6F2]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div>
                <h2
                  id="heading-contacto-404"
                  className="text-lg sm:text-xl font-extrabold text-[#002147]"
                >
                  Atención directa al cliente
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Llámanos o escríbenos por WhatsApp si no encuentras lo que buscas
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={CONTACT_INFO.whatsappBaseHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-2.5 rounded-xl bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm transition-colors tabular-nums"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>WhatsApp: {CONTACT_INFO.whatsappNumber}</span>
                </a>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-2.5 rounded-xl bg-white/95 border border-[#002147] hover:bg-[#002147] text-[#002147] hover:text-white font-bold text-sm transition-colors group tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#0F76BB] group-hover:text-white shrink-0" aria-hidden="true" />
                  <span>{CONTACT_INFO.phoneDisplay}</span>
                </a>
                <a
                  href={CONTACT_INFO.emailHref}
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-4 py-2.5 rounded-xl bg-[#F4F9FE] hover:bg-[#EDF5FD] text-[#002147] font-bold text-sm border border-slate-300 transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                  <span>{CONTACT_INFO.email}</span>
                </a>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="text-xs font-bold text-[#0F76BB] mb-4">
                Nuestras 3 tiendas propias en Vigo:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TIENDAS_PROPIAS.map((tienda) => {
                  const tiendaUrlMap: Record<string, string> = {
                    'as-teixugueiras': '/tienda-mimos-navia-vigo',
                    'gregorio-espino': '/tienda-mimos-gregorio-espino-vigo',
                    'rua-venezuela': '/tienda-mimos-venezuela-vigo',
                  };
                  const storeUrl = tiendaUrlMap[tienda.id] || '/puntos-mimos';
                  return (
                    <div
                      key={tienda.id}
                      className="p-4 rounded-xl bg-[#F4F9FE] border border-slate-200 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start gap-2.5 mb-1.5">
                          <MapPin className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                          <a
                            href={storeUrl}
                            onClick={(e) => onNavigate(storeUrl, e)}
                            className="font-extrabold text-sm text-[#002147] hover:text-[#0F76BB] hover:underline"
                          >
                            {tienda.nombre_mostrado}
                          </a>
                        </div>
                        <p className="text-xs text-slate-600 pl-6 tabular-nums">
                          {tienda.direccion} ({tienda.codigo_postal} {tienda.localidad})
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 pl-6 mt-2 tabular-nums">
                          <Clock className="w-3.5 h-3.5 text-[#0F76BB] shrink-0" aria-hidden="true" />
                          <span>{tienda.horario.resumen}</span>
                        </div>
                      </div>
                      <div className="pl-6 mt-2.5">
                        <a
                          href={`tel:+34${tienda.telefono}`}
                          className="inline-flex items-center min-h-[36px] text-xs font-bold text-[#0F76BB] hover:underline tabular-nums"
                        >
                          Tel. {tienda.telefonos_mostrados}
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
