import React, { useState } from 'react';
import { ArrowUpRight, Check, MessageCircle, Send } from 'lucide-react';
import { CONTACT_INFO, buildMimoWhatsAppUrl } from '../../data/mimosData';
import { trackFormPrepared, trackWhatsAppClick } from '../../utils/analytics';

interface PreviewB2BAndPickupSectionProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const PreviewB2BAndPickupSection: React.FC<PreviewB2BAndPickupSectionProps> = ({
  onNavigate,
}) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [zona, setZona] = useState('');
  const [servicio, setServicio] = useState('Tintorería profesional');
  const [aceptoPrivacidad, setAceptoPrivacidad] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [readyUrl, setReadyUrl] = useState<string | null>(null);

  const b2bLines = [
    {
      title: 'Apartamentos turísticos y VUT',
      text: 'Operativa concentrada en la franja crítica de 11:00 a 15:00 incluidos sábados, domingos, festivos y agosto. Lavamos tu propia lencería separada por vivienda, reponemos amenities, gestionamos llaves en cajetín o punto acordado (sin check-in presencial) y enviamos foto-reporte alineado con el Decreto 12/2017 y el REAT.',
      href: '/limpieza-apartamentos-turisticos-vigo',
      cta: 'Ver operativa para VUT',
    },
    {
      title: 'Comunidades (LPH), oficinas y locales',
      text: 'Exclusivamente mantenimiento periódico continuo (sin fin de obra ni cristales en altura). Personal en Régimen General con Seguro RC, PRL y documentación CAE al día, sustituciones cubiertas y visita técnica gratuita en Vigo.',
      href: '/limpieza-profesional-vigo',
      cta: 'Ver mantenimiento periódico',
    },
    {
      title: 'Empresas, clínicas y hostelería',
      text: 'Lavado y planchado de toallas de consulta o peluquería, sábanas de camilla y vestuario laboral (suciedad habitual). Posibilidad de pack combinado de limpieza + lavandería con factura mensual con CIF.',
      href: '/servicios-empresas',
      cta: 'Ver lavandería de empresas',
    },
    {
      title: 'Recuperación textil tras siniestros',
      text: 'Protocolo específico para ropa, cortinas y alfombras afectados por humo, hollín o inundaciones con desodorización controlada y factura oficial válida para aseguradoras.',
      href: '/limpieza-incendios-siniestros-vigo',
      cta: 'Ver recuperación de siniestros',
    },
  ];

  const handlePrepare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim() || !zona.trim()) {
      setErrorMsg('Por favor, indica tu nombre, teléfono y dirección o código postal.');
      return;
    }
    if (!aceptoPrivacidad) {
      setErrorMsg('Acepta la política de privacidad para preparar la consulta de recogida.');
      return;
    }
    setErrorMsg('');
    const msg = [
      'Hola, Mimo. Quiero consultar disponibilidad y condiciones de recogida a domicilio.',
      `Nombre: ${nombre.trim()}`,
      `Teléfono: ${telefono.trim()}`,
      `Zona / Dirección: ${zona.trim()}`,
      `Servicio: ${servicio}`,
    ].join('\n');
    setReadyUrl(buildMimoWhatsAppUrl(msg));
    trackFormPrepared('/', 'pickup_request');
  };

  return (
    <>
      {/* DIVISIÓN PROFESIONAL Y VUT EN COMPOSICIÓN ASIMÉTRICA LUMINOSA */}
      <section
        id="empresas"
        aria-labelledby="b2b-heading"
        className="py-16 lg:py-24 bg-[#EDF5FD] text-[#002147] border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs sm:text-sm font-bold text-[#0C65A1]">
                División profesional, comunidades y VUT en Vigo
              </p>
              <h2
                id="b2b-heading"
                className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-balance text-[#002147]"
              >
                Lavandería y limpieza periódica para apartamentos y empresas
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Un mismo equipo con planta propia en Navia, facturación mensual con CIF y documentación laboral al día para anfitriones, administradores de fincas y comercios de Vigo.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={CONTACT_INFO.whatsappApartamentosHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('/', 'b2b_band')}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm px-5 py-2.5 rounded-sm transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Solicitar visita por WhatsApp</span>
                </a>
                <a
                  href="/limpieza-apartamentos-turisticos-vigo"
                  onClick={(e) => onNavigate('/limpieza-apartamentos-turisticos-vigo', e)}
                  className="inline-flex items-center justify-center gap-1.5 min-h-[44px] bg-white border border-[#002147]/25 hover:border-[#002147] text-[#002147] font-bold text-sm px-5 py-2.5 rounded-sm transition-colors"
                >
                  <span>Apartamentos turísticos</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 divide-y divide-slate-300/80 border-t border-b border-slate-300/80">
              {b2bLines.map((item) => (
                <div key={item.title} className="py-6 space-y-2">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#002147]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{item.text}</p>
                  <a
                    href={item.href}
                    onClick={(e) => onNavigate(item.href, e)}
                    className="inline-flex items-center gap-1 min-h-[44px] text-xs sm:text-sm font-bold text-[#0C65A1] hover:text-[#002147] hover:underline transition-colors"
                  >
                    <span>{item.cta}</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RECOGIDA EN RUTA VS ENTREGA SIN MÍNIMO (Líneas limpias, sin cajas abultadas) */}
      <section
        id="recogida"
        aria-labelledby="recogida-heading"
        className="py-16 lg:py-22 bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-6 space-y-4">
              <p className="text-xs sm:text-sm font-bold text-[#0C65A1]">
                Recogida y entrega a domicilio
              </p>
              <h2
                id="recogida-heading"
                className="text-2xl sm:text-4xl font-extrabold text-[#002147] tracking-tight text-balance"
              >
                Consulta ruta en tu dirección o entrega en tienda sin mínimo
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Pasamos con furgoneta propia por Vigo y alrededores, servicio siempre{' '}
                <strong>sujeto a ruta disponible e importe mínimo a confirmar con Mimo</strong>. Si traes pocas prendas sueltas, recuerda que en nuestras{' '}
                <strong>3 tiendas propias y 5 puntos colaboradores no existe pedido mínimo</strong>.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1 text-sm font-bold">
                <a
                  href={CONTACT_INFO.whatsappPickupHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('/', 'pickup_direct')}
                  className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-[#1FA855] hover:bg-[#25B860] text-[#002147] px-4 py-2 rounded-sm transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>WhatsApp directo ({CONTACT_INFO.whatsappNumber})</span>
                </a>
                <a
                  href="/recogida-a-domicilio"
                  onClick={(e) => onNavigate('/recogida-a-domicilio', e)}
                  className="inline-flex items-center gap-1.5 min-h-[44px] text-[#002147] hover:text-[#0F76BB] hover:underline"
                >
                  <span>Condiciones de recogida</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <form
                onSubmit={handlePrepare}
                className="border-t border-slate-300 pt-6 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="home-pickup-name"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Nombre
                    </label>
                    <input
                      id="home-pickup-name"
                      type="text"
                      value={nombre}
                      onChange={(e) => {
                        setNombre(e.target.value);
                        setReadyUrl(null);
                      }}
                      placeholder="Tu nombre"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-base text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="home-pickup-phone"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Teléfono
                    </label>
                    <input
                      id="home-pickup-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={telefono}
                      onChange={(e) => {
                        setTelefono(e.target.value);
                        setReadyUrl(null);
                      }}
                      placeholder="Ej.: 600 000 000"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-base text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="home-pickup-zone"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Dirección o código postal
                    </label>
                    <input
                      id="home-pickup-zone"
                      type="text"
                      value={zona}
                      onChange={(e) => {
                        setZona(e.target.value);
                        setReadyUrl(null);
                      }}
                      placeholder="Calle y zona / CP"
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-base text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="home-pickup-service"
                      className="block text-xs font-bold text-slate-700 mb-1.5"
                    >
                      Qué necesitas
                    </label>
                    <select
                      id="home-pickup-service"
                      value={servicio}
                      onChange={(e) => {
                        setServicio(e.target.value);
                        setReadyUrl(null);
                      }}
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm bg-white border border-slate-300 text-base text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    >
                      <option value="Tintorería profesional">Tintorería profesional</option>
                      <option value="Limpieza de sofás o colchones a domicilio">
                        Sofá, colchón o tapicería a domicilio
                      </option>
                      <option value="Limpieza o reparación de alfombras">
                        Alfombra (limpieza / arreglo)
                      </option>
                      <option value="Edredones, mantas o cortinas">Edredones, mantas o cortinas</option>
                      <option value="Colada familiar y planchado">Colada familiar y planchado</option>
                      <option value="Costura y arreglos de ropa">Costura y arreglos de ropa</option>
                      <option value="Recuperación textil tras incendio, humo o inundación (Seguro)">
                        Recuperación textil tras incendio, humo o inundación
                      </option>
                    </select>
                  </div>
                </div>

                <label className="flex items-center gap-3 min-h-[44px] text-xs sm:text-sm text-slate-600 cursor-pointer py-1">
                  <input
                    type="checkbox"
                    checked={aceptoPrivacidad}
                    onChange={(e) => setAceptoPrivacidad(e.target.checked)}
                    className="w-5 h-5 rounded-xs border-slate-300 text-[#0C65A1] focus:ring-[#0F76BB] shrink-0"
                  />
                  <span>
                    Acepto la{' '}
                    <a
                      href="/privacidad"
                      onClick={(e) => onNavigate('/privacidad', e)}
                      className="underline font-bold text-[#002147]"
                    >
                      política de privacidad
                    </a>{' '}
                    para enviar esta consulta a Mimo.
                  </span>
                </label>

                {errorMsg && (
                  <p className="text-xs font-bold text-red-600" role="alert">
                    {errorMsg}
                  </p>
                )}

                {!readyUrl ? (
                  <button
                    type="submit"
                    className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm px-6 py-3 rounded-sm transition-colors cursor-pointer shadow-xs"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Preparar consulta para WhatsApp</span>
                  </button>
                ) : (
                  <div className="border-l-2 border-[#1FA855] pl-4 py-1 space-y-2.5">
                    <p className="inline-flex items-center gap-1.5 text-xs font-bold text-[#147A3E]">
                      <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Consulta preparada con tus datos</span>
                    </p>
                    <div>
                      <a
                        href={readyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackWhatsAppClick('/', 'pickup_form_send')}
                        className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm px-6 py-3 rounded-sm transition-colors shadow-xs"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>Enviar ahora por WhatsApp a Mimo</span>
                      </a>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
