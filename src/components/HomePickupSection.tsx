import React, { useState, useRef } from 'react';
import { MessageCircle, Phone, Check, Copy, Pencil } from 'lucide-react';
import { CONTACT_INFO, buildMimoWhatsAppUrl } from '../data/mimosData';
import {
  trackWhatsAppClick,
  trackPhoneClick,
  trackFormPrepared,
} from '../utils/analytics';

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
  const confirmationRef = useRef<HTMLDivElement>(null);

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

  const customWhatsAppHref = buildMimoWhatsAppUrl(buildWhatsAppMessage());

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
    trackFormPrepared(
      typeof window !== 'undefined' ? window.location.pathname : '/#recogida',
      'pickup_request'
    );
    setTimeout(() => {
      confirmationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);
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
      className="py-14 lg:py-20 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Columna izquierda: cómo funciona y canales */}
          <div className="lg:col-span-6">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB] mb-2">
              Recogida y entrega · Sin desplazamientos
            </p>
            <h2
              id="recogida-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] tracking-tight text-balance mb-4"
            >
              Recogida y entrega de prendas y textiles a domicilio en Vigo y comarca
            </h2>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed mb-4">
              Para que cuidar tu ropa y los textiles de tu hogar resulte todavía más cómodo, disponemos de recogida y entrega a domicilio —servicio sujeto a <strong>ruta e importe mínimo de pedido a consultar con Mimo</strong>— con cobertura en{' '}
              <a
                href="/zonas/vigo"
                onClick={(e) => onNavigate('/zonas/vigo', e)}
                className="font-bold text-[#002147] underline underline-offset-2 hover:text-[#0F76BB]"
              >
                Vigo
              </a>
              , <strong>comarca</strong> (
              <a
                href="/zonas/redondela"
                onClick={(e) => onNavigate('/zonas/redondela', e)}
                className="font-semibold text-[#0F76BB] hover:underline"
              >
                Redondela
              </a>
              ,{' '}
              <a
                href="/zonas/nigran"
                onClick={(e) => onNavigate('/zonas/nigran', e)}
                className="font-semibold text-[#0F76BB] hover:underline"
              >
                Nigrán
              </a>
              , Baiona,{' '}
              <a
                href="/zonas/mos"
                onClick={(e) => onNavigate('/zonas/mos', e)}
                className="font-semibold text-[#0F76BB] hover:underline"
              >
                Mos
              </a>
              ,{' '}
              <a
                href="/zonas/o-porrino"
                onClick={(e) => onNavigate('/zonas/o-porrino', e)}
                className="font-semibold text-[#0F76BB] hover:underline"
              >
                O Porriño
              </a>
              ,{' '}
              <a
                href="/zonas/gondomar"
                onClick={(e) => onNavigate('/zonas/gondomar', e)}
                className="font-semibold text-[#0F76BB] hover:underline"
              >
                Gondomar
              </a>
              ,{' '}
              <a
                href="/zonas/ponteareas"
                onClick={(e) => onNavigate('/zonas/ponteareas', e)}
                className="font-semibold text-[#0F76BB] hover:underline"
              >
                Ponteareas
              </a>
              , Cangas, Moaña) y <strong>polígonos industriales</strong> (PTL Valladares, Zona Franca, Porriño y Mos).
            </p>
            <p className="text-xs sm:text-sm font-bold text-[#002147] border-l-2 border-[#0F76BB] pl-3.5 py-1 bg-[#EDF5FD]/60 rounded-r-sm mb-6">
              A domicilio con importe mínimo a consultar · Sin pedido mínimo en nuestras 3 tiendas propias de Vigo y 5 puntos colaboradores
            </p>

            {/* 3 pasos */}
            <ol className="space-y-3.5 mb-8">
              <li className="p-5 rounded-xl border border-slate-200 bg-[#F7F6F2]">
                <p className="text-xs font-mono font-bold text-[#0F76BB] mb-1 tabular-nums">
                  PASO 01
                </p>
                <h3 className="text-base sm:text-lg font-extrabold text-[#002147] mb-1">
                  Escríbenos por WhatsApp (Mimo) o envíanos el formulario
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Envía listado o foto de tus prendas, edredones o alfombras, indica si hay tejido delicado y tu dirección o código postal (barrio, municipio o polígono). Mimo te confirmará el importe mínimo aplicable, la orientación de tarifa y el día de paso en tu ruta.
                </p>
              </li>

              <li className="p-5 rounded-xl border border-slate-200 bg-[#F7F6F2]">
                <p className="text-xs font-mono font-bold text-[#0F76BB] mb-1 tabular-nums">
                  PASO 02
                </p>
                <h3 className="text-base sm:text-lg font-extrabold text-[#002147] mb-1">
                  Recogemos en casa o te atendemos en tiendas y puntos Mimos
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Si prefieres entregar un encargo pequeño sin pedido mínimo o aprovechar horarios amplios, puedes acudir a nuestras 3 tiendas propias en Vigo (Navia, Gregorio Espino y Venezuela) o a nuestros 5 puntos colaboradores en Redondela, Gondomar, Ponteareas, O Porriño y Vigo (Camiño Espedrigada).
                </p>
              </li>

              <li className="p-5 rounded-xl border border-slate-200 bg-[#F7F6F2]">
                <p className="text-xs font-mono font-bold text-[#0F76BB] mb-1 tabular-nums">
                  PASO 03
                </p>
                <h3 className="text-base sm:text-lg font-extrabold text-[#002147] mb-1">
                  Tratamiento en nuestras instalaciones y entrega coordinada
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Procesamos tus prendas en nuestra central de Vigo con acabado profesional y te avisamos en cuanto estén listas para entregártelas en tu domicilio o en tu punto elegido.
                </p>
              </li>
            </ol>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
              <a
                href={CONTACT_INFO.whatsappPickupHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick(
                    typeof window !== 'undefined' ? window.location.pathname : '/#recogida',
                    'pickup_section'
                  )
                }
                className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm px-5 py-3 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Consultar recogida con Mimo</span>
              </a>

              <a
                href="/puntos-mimos"
                onClick={(e) => onNavigate('/puntos-mimos', e)}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-5 py-3 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>Ver 3 tiendas y 5 puntos</span>
              </a>

              <a
                href="/limpieza-sofas-vigo"
                onClick={(e) => onNavigate('/limpieza-sofas-vigo', e)}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <span>Sofás a domicilio</span>
              </a>

              <a
                href={CONTACT_INFO.phoneHref}
                onClick={() =>
                  trackPhoneClick(
                    typeof window !== 'undefined' ? window.location.pathname : '/#recogida',
                    'pickup_section'
                  )
                }
                className="inline-flex items-center justify-center gap-2 min-h-[44px] bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap shrink-0 group tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#0F76BB] group-hover:text-white shrink-0" aria-hidden="true" />
                <span>Llamar al {CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Columna derecha: Formulario rápido de recogida */}
          <div className="lg:col-span-6">
            <div className="rounded-xl border border-[#0F76BB]/25 border-t-4 border-t-[#0F76BB] bg-[#EDF5FD] p-6 sm:p-8 shadow-xs">
              <h3 className="text-xl font-extrabold text-[#002147] mb-2">
                Formulario rápido de recogida a domicilio
              </h3>
              <p className="text-sm text-slate-700 mb-6 leading-relaxed">
                Rellena tus datos y se abrirá directamente el WhatsApp de Mimo ({CONTACT_INFO.whatsappNumber}) con tu solicitud lista para enviar.
              </p>

              <form onSubmit={handlePrepareOrder} noValidate className="space-y-4">
                <div>
                  <label
                    htmlFor="pickup-nombre"
                    className="block text-sm font-bold text-[#002147] mb-1.5"
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
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-white text-base sm:text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="pickup-telefono"
                      className="block text-sm font-bold text-[#002147] mb-1.5"
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
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-white text-base sm:text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="pickup-servicio"
                      className="block text-sm font-bold text-[#002147] mb-1.5"
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
                      className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-white text-base sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                    >
                      <option value="Tintorería profesional (trajes, vestidos, ceremonia, delicadas)">
                        Tintorería profesional (trajes, ceremonia, delicadas)
                      </option>
                      <option value="Lavandería, colada familiar o planchado profesional">
                        Lavandería, colada familiar o planchado
                      </option>
                      <option value="Edredones, mantas, cortinas y estores">
                        Edredones, mantas, cortinas y estores
                      </option>
                      <option value="Limpieza o arreglo de alfombras">
                        Limpieza o arreglo de alfombras
                      </option>
                      <option value="Limpieza de sofás y tapicerías a domicilio">
                        Limpieza de sofás y tapicerías a domicilio
                      </option>
                      <option value="Limpieza y restauración de pieles, cuero o ante">
                        Pieles, cuero y ante
                      </option>
                      <option value="Costura y arreglos de ropa">
                        Costura y arreglos de ropa
                      </option>
                      <option value="Alojamiento turístico / Empresa / Uniformidad">
                        Alojamiento turístico / Empresa / Uniformidad
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="pickup-direccion"
                    className="block text-sm font-bold text-[#002147] mb-1.5"
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
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-white text-base sm:text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="pickup-comentarios"
                    className="block text-sm font-bold text-[#002147] mb-1.5"
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
                    className="w-full px-3.5 py-2.5 rounded-sm border border-slate-300 bg-white text-base sm:text-sm text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                  />
                </div>

                <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={aceptoPrivacidad}
                    onChange={(e) => {
                      setAceptoPrivacidad(e.target.checked);
                      setErrorMsg('');
                    }}
                    className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0F76BB] focus:ring-[#0F76BB]"
                  />
                  <span>
                    Acepto el tratamiento de mis datos para gestionar mi solicitud por WhatsApp conforme a la{' '}
                    <a
                      href="/privacidad"
                      onClick={(e) => onNavigate('/privacidad', e)}
                      className="underline font-bold text-[#002147] hover:text-[#0F76BB]"
                    >
                      política de privacidad
                    </a>
                    .
                  </span>
                </label>

                {errorMsg && (
                  <p id="pickup-error-msg" role="alert" className="text-xs font-bold text-red-700">
                    {errorMsg}
                  </p>
                )}

                {!preparedReady ? (
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm py-3.5 px-6 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Preparar solicitud para Mimo (WhatsApp)</span>
                  </button>
                ) : (
                  <div
                    ref={confirmationRef}
                    role="region"
                    aria-label="Confirmación de solicitud preparada"
                    className="p-4 sm:p-5 rounded-xl border-2 border-[#1FA855]/45 bg-white space-y-3.5 shadow-xs"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-extrabold text-[#002147] flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#1FA855] text-white flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                        <span>Paso 2 de 2: Solicitud preparada en pantalla</span>
                      </p>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        Hemos organizado tu solicitud con tus datos. <strong>Aviso importante:</strong> el mensaje no se envía solo; pulsa a continuación en <em>«Abrir WhatsApp y enviar a Mimo»</em> para transferirlo al chat oficial.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                      <a
                        href={customWhatsAppHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() =>
                          trackWhatsAppClick(
                            typeof window !== 'undefined' ? window.location.pathname : '/#recogida',
                            'pickup_form',
                            { service_id: 'recogida-a-domicilio' }
                          )
                        }
                        className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm py-3 px-4 rounded-lg transition-colors shadow-xs"
                      >
                        <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span>Abrir WhatsApp y enviar a Mimo</span>
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyText}
                        className="inline-flex items-center justify-center gap-1.5 min-h-[44px] bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] text-xs font-bold py-2.5 px-3.5 rounded-lg cursor-pointer transition-colors"
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#1FA855]" />
                            <span>Texto copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar texto</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="pt-1 text-center">
                      <button
                        type="button"
                        onClick={() => setPreparedReady(false)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#002147] underline cursor-pointer"
                      >
                        <Pencil className="w-3 h-3" aria-hidden="true" />
                        <span>¿Necesitas corregir algún dato? Modificar formulario</span>
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
