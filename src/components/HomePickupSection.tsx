import React, { useState } from 'react';
import { MessageCircle, Phone, Check, Copy } from 'lucide-react';
import { CONTACT_INFO } from '../data/mimosData';

interface HomePickupSectionProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const HomePickupSection: React.FC<HomePickupSectionProps> = ({ onNavigate }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [servicio, setServicio] = useState('Tintorería profesional');
  const [comentarios, setComentarios] = useState('');
  const [aceptoPrivacidad, setAceptoPrivacidad] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [preparedReady, setPreparedReady] = useState(false);
  const [copied, setCopied] = useState(false);

  const buildWhatsAppMessage = () => {
    const lines = [
      'Hola, Mimo. Quiero solicitar información o recogida a domicilio.',
      `Nombre: ${nombre.trim()}`,
      `Teléfono: ${telefono.trim()}`,
      `Dirección / CP: ${direccion.trim()}`,
      `Servicio: ${servicio}`,
    ];
    if (comentarios.trim()) {
      lines.push(`Observaciones: ${comentarios.trim()}`);
    }
    return lines.join('\n');
  };

  const customWhatsAppHref = `https://wa.me/34655536844?text=${encodeURIComponent(
    buildWhatsAppMessage()
  )}`;

  const handlePrepareOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !telefono.trim() || !direccion.trim()) {
      setErrorMsg('Por favor, completa tu nombre, teléfono y dirección o código postal.');
      return;
    }
    if (!aceptoPrivacidad) {
      setErrorMsg('Debes aceptar la política de privacidad para preparar tu solicitud.');
      return;
    }
    setErrorMsg('');
    setPreparedReady(true);
  };

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(buildWhatsAppMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback if clipboard is restricted
    }
  };

  return (
    <section
      id="recogida"
      aria-labelledby="recogida-heading"
      className="py-16 lg:py-24 bg-white dark:bg-[#071324] border-b border-slate-200/80 dark:border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: How It Works & Channels (Sección 7.4 del Plan Maestro) */}
          <div className="lg:col-span-6">
            <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-2">
              Comodidad sin desplazamientos
            </p>
            <h2
              id="recogida-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] dark:text-white tracking-tight mb-4"
            >
              Recogida y entrega de prendas a domicilio en Vigo y alrededores
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              Para que cuidar tu ropa resulte todavía más sencillo, disponemos de opciones de recogida y entrega sujetas a las condiciones del servicio y a la zona de cobertura. También contamos con la aplicación móvil <strong>{CONTACT_INFO.appName}</strong>.
            </p>

            {/* 3 Numbered Steps */}
            <ol className="space-y-5 mb-8">
              <li className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36]">
                <p className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                  PASO 01
                </p>
                <h3 className="text-lg font-bold text-[#002147] dark:text-white mb-1.5">
                  Escríbenos por WhatsApp (Mimo) o llámanos
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Indícanos qué prendas o textiles necesitas tratar (tintorería, lavandería, colada familiar, edredones, alfombras o planchado) y tu dirección o código postal para consultar disponibilidad y precios con Mimo.
                </p>
              </li>

              <li className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36]">
                <p className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                  PASO 02
                </p>
                <h3 className="text-lg font-bold text-[#002147] dark:text-white mb-1.5">
                  Cuidamos tu ropa en nuestras instalaciones de Navia
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Procesamos tus prendas en nuestras instalaciones propias de Vigo con tratamientos específicos para cada tejido y control de acabado en cada fase.
                </p>
              </li>

              <li className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36]">
                <p className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                  PASO 03
                </p>
                <h3 className="text-lg font-bold text-[#002147] dark:text-white mb-1.5">
                  Te avisamos y coordinamos la entrega
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  En cuanto tu pedido esté listo, nos ponemos en contacto contigo para coordinar la entrega en tu domicilio o la recogida en tienda según lo acordado.
                </p>
              </li>
            </ol>

            {/* Direct Action Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">
              <a
                href={CONTACT_INFO.whatsappPickupHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Solicitar recogida con Mimo</span>
              </a>

              <a
                href="/limpieza-alfombras-vigo"
                onClick={(e) => onNavigate('/limpieza-alfombras-vigo', e)}
                className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] text-white font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <span>Limpieza de alfombras a domicilio →</span>
              </a>

              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 hover:border-[#002147] dark:hover:border-white text-[#002147] dark:text-white font-bold text-sm sm:text-base px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap shrink-0"
              >
                <Phone className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                <span>Llamar al {CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive WhatsApp Pickup Message Assistant (Sección 9 del Plan Maestro) */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-[#0b1d36] p-6 sm:p-8">
              <h3 className="text-xl font-extrabold text-[#002147] dark:text-white mb-2">
                Formulario rápido de recogida a domicilio
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                Rellena tus datos y se abrirá directamente el WhatsApp de Mimo ({CONTACT_INFO.whatsappNumber}) con tu solicitud lista para enviar.
              </p>

              <form onSubmit={handlePrepareOrder} noValidate className="space-y-4">
                <div>
                  <label
                    htmlFor="pickup-nombre"
                    className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    Nombre y apellidos *
                  </label>
                  <input
                    id="pickup-nombre"
                    name="nombre"
                    type="text"
                    required
                    autoComplete="name"
                    aria-required="true"
                    aria-invalid={Boolean(errorMsg && !nombre.trim())}
                    aria-describedby={errorMsg ? 'pickup-error-msg' : undefined}
                    value={nombre}
                    onChange={(e) => {
                      setNombre(e.target.value);
                      setPreparedReady(false);
                    }}
                    placeholder="Ej.: María Castro"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="pickup-telefono"
                      className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                    >
                      Teléfono de contacto *
                    </label>
                    <input
                      id="pickup-telefono"
                      name="telefono"
                      type="tel"
                      required
                      autoComplete="tel"
                      aria-required="true"
                      aria-invalid={Boolean(errorMsg && !telefono.trim())}
                      aria-describedby={errorMsg ? 'pickup-error-msg' : undefined}
                      value={telefono}
                      onChange={(e) => {
                        setTelefono(e.target.value);
                        setPreparedReady(false);
                      }}
                      placeholder="Ej.: 600 123 456"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="pickup-servicio"
                      className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                    >
                      Servicio principal
                    </label>
                    <select
                      id="pickup-servicio"
                      name="servicio"
                      value={servicio}
                      onChange={(e) => {
                        setServicio(e.target.value);
                        setPreparedReady(false);
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white"
                    >
                      <option value="Tintorería profesional">Tintorería profesional</option>
                      <option value="Lavandería">Lavandería</option>
                      <option value="Planchado profesional">Planchado profesional</option>
                      <option value="Colada familiar (lavado, secado y doblado)">
                        Colada familiar (lavado, secado y doblado)
                      </option>
                      <option value="Limpieza de textiles del hogar (edredones, alfombras, cortinas)">
                        Textiles del hogar (edredones, alfombras, cortinas)
                      </option>
                      <option value="Alojamiento turístico / Empresa">
                        Alojamiento turístico / Empresa
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="pickup-direccion"
                    className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    Dirección o código postal en Vigo / comarca *
                  </label>
                  <input
                    id="pickup-direccion"
                    name="direccion"
                    type="text"
                    required
                    autoComplete="street-address"
                    aria-required="true"
                    aria-invalid={Boolean(errorMsg && !direccion.trim())}
                    aria-describedby={errorMsg ? 'pickup-error-msg' : undefined}
                    value={direccion}
                    onChange={(e) => {
                      setDireccion(e.target.value);
                      setPreparedReady(false);
                    }}
                    placeholder="Ej.: C/ As Teixugueiras, 36212 Vigo"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                  />
                </div>

                <div>
                  <label
                    htmlFor="pickup-comentarios"
                    className="block text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                  >
                    Prendas o preferencia horaria (opcional)
                  </label>
                  <textarea
                    id="pickup-comentarios"
                    name="comentarios"
                    rows={2}
                    value={comentarios}
                    onChange={(e) => {
                      setComentarios(e.target.value);
                      setPreparedReady(false);
                    }}
                    placeholder="Ej.: 1 edredón de plumas y 2 trajes. Preferiblemente por la tarde."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                  />
                </div>

                <label className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={aceptoPrivacidad}
                    onChange={(e) => {
                      setAceptoPrivacidad(e.target.checked);
                      setErrorMsg('');
                    }}
                    className="mt-0.5 rounded border-slate-300 text-[#002147] focus:ring-[#0F76BB]"
                  />
                  <span>
                    Acepto el tratamiento de mis datos para gestionar mi solicitud por WhatsApp conforme a la{' '}
                    <a
                      href="/privacidad"
                      onClick={(e) => onNavigate('/privacidad', e)}
                      className="underline font-bold text-[#002147] dark:text-[#60B5F6]"
                    >
                      política de privacidad
                    </a>
                    .
                  </span>
                </label>

                {errorMsg && (
                  <p id="pickup-error-msg" role="alert" className="text-xs font-bold text-red-600 dark:text-red-400">
                    {errorMsg}
                  </p>
                )}

                {!preparedReady ? (
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] dark:hover:bg-[#0B5C94] text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Preparar solicitud para Mimo (WhatsApp)</span>
                  </button>
                ) : (
                  <div className="p-4 rounded-xl border border-[#178A47]/40 bg-[#178A47]/10 dark:bg-[#178A47]/20 space-y-3">
                    <p className="text-xs font-bold text-[#002147] dark:text-white">
                      Tu solicitud está lista. Pulsa el botón verde para abrir WhatsApp con Mimo:
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <a
                        href={customWhatsAppHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm py-3 px-4 rounded-lg transition-colors"
                      >
                        <MessageCircle className="w-4 h-4" aria-hidden="true" />
                        <span>Abrir WhatsApp y enviar a Mimo</span>
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyText}
                        className="inline-flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#071324] text-slate-700 dark:text-slate-200 text-xs font-bold py-2.5 px-3.5 rounded-lg cursor-pointer"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#178A47]" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar texto</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
