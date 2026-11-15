import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Building2,
  ArrowUpRight,
  MessageCircle,
  Check,
  Send,
  Truck,
} from 'lucide-react';
import { CONTACT_INFO, buildMimoWhatsAppUrl } from '../../data/mimosData';
import { trackWhatsAppClick, trackFormPrepared } from '../../utils/analytics';

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

  const b2bBlocks = [
    {
      num: '01',
      title: 'Apartamentos turísticos y VUT',
      text: 'Limpieza tras check-out, lavandería y planchado de ropa de cama y toallas con control de rotación en Vigo.',
      href: '/limpieza-apartamentos-turisticos-vigo',
      cta: 'Ver gestión de alojamientos',
    },
    {
      num: '02',
      title: 'Oficinas, locales y comunidades',
      text: 'Mantenimiento periódico o puntual con equipo propio adaptado a horarios de actividad comercial.',
      href: '/limpieza-profesional-vigo',
      cta: 'Ver limpieza profesional',
    },
    {
      num: '03',
      title: 'Uniformidad y vestuario laboral',
      text: 'Lavado industrial, desmanchado técnico y reposición organizada para empresas, hostelería y clínicas.',
      href: '/servicios-empresas',
      cta: 'Ver servicios a empresas',
    },
    {
      num: '04',
      title: 'Recuperación textil tras siniestros',
      text: 'Tratamiento especializado de ropa, cortinas y alfombras afectados por humo, hollín o inundaciones con factura para seguros.',
      href: '/limpieza-incendios-siniestros-vigo',
      cta: 'Ver protocolo y seguros',
    },
  ];

  const handlePrepare = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim() || !zona.trim()) {
      setErrorMsg('Por favor, indica tu nombre, teléfono y dirección o código postal.');
      return;
    }
    if (!aceptoPrivacidad) {
      setErrorMsg('Acepta la política de privacidad para preparar el mensaje de recogida.');
      return;
    }
    setErrorMsg('');
    const msg = [
      'Hola, Mimo. Quiero solicitar recogida o información a domicilio.',
      `Nombre: ${nombre.trim()}`,
      `Teléfono: ${telefono.trim()}`,
      `Zona / Dirección: ${zona.trim()}`,
      `Servicio: ${servicio}`,
    ].join('\n');
    setReadyUrl(buildMimoWhatsAppUrl(msg));
    trackFormPrepared('/preview-portada', 'pickup_request');
  };

  return (
    <>
      {/* BANDA DE AUTORIDAD AZUL MARINO: ALOJAMIENTOS Y EMPRESAS (Estilo GuestReady / Avantio) */}
      <section
        id="empresas"
        aria-labelledby="preview-b2b-heading"
        className="py-18 lg:py-26 bg-[#002147] text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/15 pb-10"
          >
            <div className="max-w-2xl space-y-3">
              <p className="inline-flex items-center gap-2 text-sm font-bold text-[#93c5fd]">
                <Building2 className="w-4 h-4" aria-hidden="true" />
                <span>División profesional y alojamientos turísticos en Vigo</span>
              </p>
              <h2
                id="preview-b2b-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-balance"
              >
                Tu socio operativo de lavandería y limpieza para apartamentos y empresas
              </h2>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={CONTACT_INFO.whatsappApartamentosHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('/preview-portada', 'b2b_band')}
                className="inline-flex items-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Pedir propuesta a medida</span>
              </a>
              <a
                href="/limpieza-apartamentos-turisticos-vigo"
                onClick={(e) => onNavigate('/limpieza-apartamentos-turisticos-vigo', e)}
                className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors"
              >
                <span>Apartamentos turísticos</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* 4 bloques en cascada progresiva (sin saturación visual) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {b2bBlocks.map((item, idx) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="pt-5 border-t border-white/20 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-2.5">
                  <p className="text-2xl font-extrabold text-[#60B5F6] tabular-nums">
                    {item.num}
                  </p>
                  <h3 className="text-lg font-extrabold text-white">{item.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{item.text}</p>
                </div>
                <a
                  href={item.href}
                  onClick={(e) => onNavigate(item.href, e)}
                  className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#93c5fd] hover:text-white transition-colors"
                >
                  <span>{item.cta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLICITUD LIMPIA DE RECOGIDA A DOMICILIO Y WASH IN TOWN */}
      <section
        id="recogida"
        aria-labelledby="preview-recogida-heading"
        className="py-18 lg:py-24 bg-white dark:bg-[#071324] border-b border-slate-200/70 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-5"
            >
              <p className="inline-flex items-center gap-2 text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                <Truck className="w-4 h-4" aria-hidden="true" />
                <span>Servicio a domicilio y app {CONTACT_INFO.appName}</span>
              </p>
              <h2
                id="preview-recogida-heading"
                className="text-3xl sm:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance"
              >
                Solicita recogida y entrega en tu casa u oficina
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Pasamos por tu domicilio en Vigo y alrededores (servicio sujeto a importe mínimo según zona a confirmar por Mimo). Si prefieres entregar en mano, recuerda que en nuestras <strong>3 tiendas propias y 5 puntos colaboradores no existe pedido mínimo</strong>.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1 text-sm font-bold">
                <a
                  href={CONTACT_INFO.whatsappPickupHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#178A47] dark:text-[#4ade80] hover:underline"
                >
                  <MessageCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Ir directo a WhatsApp ({CONTACT_INFO.whatsappNumber})</span>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <form
                onSubmit={handlePrepare}
                className="rounded-3xl bg-[#F4F7FB] dark:bg-[#0b1d36] p-6 sm:p-8 space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="prev-pickup-name"
                      className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1"
                    >
                      Nombre
                    </label>
                    <input
                      id="prev-pickup-name"
                      type="text"
                      value={nombre}
                      onChange={(e) => {
                        setNombre(e.target.value);
                        setReadyUrl(null);
                      }}
                      placeholder="Tu nombre"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="prev-pickup-phone"
                      className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1"
                    >
                      Teléfono
                    </label>
                    <input
                      id="prev-pickup-phone"
                      type="tel"
                      value={telefono}
                      onChange={(e) => {
                        setTelefono(e.target.value);
                        setReadyUrl(null);
                      }}
                      placeholder="Ej.: 600 000 000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="prev-pickup-zone"
                      className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1"
                    >
                      Dirección o código postal
                    </label>
                    <input
                      id="prev-pickup-zone"
                      type="text"
                      value={zona}
                      onChange={(e) => {
                        setZona(e.target.value);
                        setReadyUrl(null);
                      }}
                      placeholder="Calle y zona / CP"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="prev-pickup-service"
                      className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1"
                    >
                      Qué necesitas
                    </label>
                    <select
                      id="prev-pickup-service"
                      value={servicio}
                      onChange={(e) => {
                        setServicio(e.target.value);
                        setReadyUrl(null);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    >
                      <option value="Tintorería profesional">Tintorería profesional</option>
                      <option value="Limpieza de sofás a domicilio">Sofá o tapicería a domicilio</option>
                      <option value="Limpieza o reparación de alfombras">Alfombra (limpieza / arreglo)</option>
                      <option value="Edredones, mantas o cortinas">Edredones, mantas o cortinas</option>
                      <option value="Colada familiar y planchado">Colada familiar y planchado</option>
                      <option value="Costura y arreglos de ropa">Costura y arreglos de ropa</option>
                      <option value="Recuperación textil tras incendio, humo o inundación (Seguro)">
                        Recuperación textil tras incendio, humo o inundación
                      </option>
                    </select>
                  </div>
                </div>

                <label className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aceptoPrivacidad}
                    onChange={(e) => setAceptoPrivacidad(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-[#0F76BB] focus:ring-[#0F76BB]"
                  />
                  <span>
                    He leído y acepto la{' '}
                    <a
                      href="/privacidad"
                      onClick={(e) => onNavigate('/privacidad', e)}
                      className="underline font-bold text-[#002147] dark:text-[#60B5F6]"
                    >
                      política de privacidad
                    </a>{' '}
                    para enviar esta solicitud a Mimo.
                  </span>
                </label>

                {errorMsg && (
                  <p className="text-xs font-bold text-red-600 dark:text-red-400" role="alert">
                    {errorMsg}
                  </p>
                )}

                {!readyUrl ? (
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] dark:hover:bg-[#0B5C94] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Preparar solicitud de recogida</span>
                  </button>
                ) : (
                  <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 p-4 space-y-3">
                    <p className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Solicitud preparada con tus datos</span>
                    </p>
                    <a
                      href={readyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Enviar ahora por WhatsApp a Mimo</span>
                    </a>
                  </div>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
