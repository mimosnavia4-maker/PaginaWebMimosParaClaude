import React, { useState } from 'react';
import {
  ArrowLeft,
  MessageCircle,
  Phone,
  CheckCircle2,
  Ruler,
  Truck,
  Store,
  AlertTriangle,
  Camera,
  ArrowUpRight,
  Copy,
  Check,
} from 'lucide-react';
import {
  SERVICIO_ALFOMBRAS_DATA,
  TIENDAS_PROPIAS,
  CONTACT_INFO,
  IMAGES,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';

interface CarpetCleaningPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const CarpetCleaningPage: React.FC<CarpetCleaningPageProps> = ({
  onNavigate,
}) => {
  const [localidad, setLocalidad] = useState('Vigo');
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [tipoFibra, setTipoFibra] = useState('No estoy seguro / Sin etiqueta');
  const [modalidadEntrega, setModalidadEntrega] = useState(
    'Quiero consultar recogida y entrega a domicilio'
  );
  const [observaciones, setObservaciones] = useState('');
  const [copied, setCopied] = useState(false);

  const buildCarpetWhatsAppMessage = () => {
    const medidasTexto =
      largo.trim() && ancho.trim()
        ? `${largo.trim()} x ${ancho.trim()}`
        : largo.trim() || ancho.trim() || 'pendientes de medir';

    const lines = [
      'Hola, Mimo. Quiero solicitar la valoración para limpiar una alfombra.',
      `Localidad: ${localidad}`,
      `Medidas aproximadas (largo x ancho): ${medidasTexto}`,
      `Tipo de alfombra / material: ${tipoFibra}`,
      `Preferencia de entrega/recogida: ${modalidadEntrega}`,
    ];
    if (observaciones.trim()) {
      lines.push(`Estado o manchas a tener en cuenta: ${observaciones.trim()}`);
    }
    lines.push('A continuación te envío en este chat fotos de la alfombra para que puedas valorarla.');
    return lines.join('\n');
  };

  const whatsappUrl = buildMimoWhatsAppUrl(buildCarpetWhatsAppMessage());

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildCarpetWhatsAppMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // ignore
    }
  };

  return (
    <main className="bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
      {/* 1. CABECERA: H1, frase breve y botones "Consultar con Mimo por WhatsApp" y "Solicitar recogida a domicilio" (Sección 16.1) */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#002147] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Migas de pan" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-300">
              <li>
                <a
                  href="/"
                  onClick={(e) => onNavigate('/', e)}
                  className="hover:text-white underline-offset-4 hover:underline"
                >
                  Inicio
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <a
                  href="/#servicios"
                  onClick={(e) => onNavigate('/#servicios', e)}
                  className="hover:text-white underline-offset-4 hover:underline"
                >
                  Servicios
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#60B5F6] font-bold">Limpieza de alfombras en Vigo</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 border border-white/15 text-[#60B5F6] text-xs font-mono uppercase tracking-wider font-bold">
                <span>Servicio Especializado · Tintorería Mimos Navia</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                {SERVICIO_ALFOMBRAS_DATA.h1}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                {SERVICIO_ALFOMBRAS_DATA.subtituloCabecera}
              </p>

              <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-slate-100 leading-relaxed">
                {SERVICIO_ALFOMBRAS_DATA.aclaracionDomicilio}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                  <span>Consultar con Mimo por WhatsApp</span>
                </a>

                <a
                  href="#presupuestar-alfombra"
                  className="inline-flex items-center justify-center gap-2 bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  <Truck className="w-5 h-5" aria-hidden="true" />
                  <span>Solicitar recogida a domicilio</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <figure className="rounded-2xl overflow-hidden border border-white/15 bg-[#071936] shadow-lg">
                <img
                  src={IMAGES.alfombrasMimos}
                  alt="Revisión y medición profesional de una alfombra de lana en Tintorería Mimos Vigo"
                  width={800}
                  height={600}
                  fetchPriority="high"
                  className="w-full aspect-4/3 object-cover"
                />
                <figcaption className="p-4 text-xs text-slate-300 border-t border-white/10">
                  Valoración individualizada según medidas, tipo de fibra, reverso y estado de cada alfombra.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CÓMO FUNCIONA, EN 4 PASOS (Sección 16.2) */}
      <section className="py-14 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
              Proceso claro de principio a fin
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
              Cómo funciona nuestro servicio de limpieza de alfombras en 4 pasos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICIO_ALFOMBRAS_DATA.pasosComoFunciona.map((paso) => (
              <div
                key={paso.num}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                    PASO {paso.num}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#002147] dark:text-white mt-1.5 mb-2.5">
                    {paso.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {paso.descripcion}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. QUÉ ALFOMBRAS SE VALORAN y 4. CÓMO MEDIRLA (Sección 16.3 y 16.4) */}
      <section className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* 3. Qué alfombras se valoran */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                  Cuidado adaptado a cada tejido
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                  Qué tipos de alfombras valoramos en Tintorería Mimos
                </h2>
              </div>

              <div className="space-y-4">
                {SERVICIO_ALFOMBRAS_DATA.tiposAlfombrasValoradas.map((tipo) => (
                  <div
                    key={tipo.titulo}
                    className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36]"
                  >
                    <h3 className="text-base sm:text-lg font-extrabold text-[#002147] dark:text-white mb-1 flex items-center gap-2">
                      <CheckCircle2
                        className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0"
                        aria-hidden="true"
                      />
                      <span>{tipo.titulo}</span>
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                      {tipo.descripcion}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Cómo medirla (Mini guía con ejemplo de largo por ancho) */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border-2 border-[#002147] dark:border-[#0F76BB]/60 bg-[#002147] text-white p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2.5 text-[#60B5F6]">
                  <Ruler className="w-5 h-5" aria-hidden="true" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">
                    Mini guía práctica de medición
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                  {SERVICIO_ALFOMBRAS_DATA.guiaComoMedir.titulo}
                </h2>

                <p className="text-sm text-slate-200 leading-relaxed">
                  {SERVICIO_ALFOMBRAS_DATA.guiaComoMedir.introduccion}
                </p>

                {/* Diagrama Visual Largo x Ancho */}
                <div className="p-5 rounded-xl bg-white/10 border border-white/20 text-center space-y-2">
                  <div className="mx-auto max-w-[220px] aspect-3/2 rounded-lg border-2 border-dashed border-[#60B5F6] bg-[#071936] flex flex-col items-center justify-center p-3 relative">
                    <span className="text-[11px] font-mono text-[#60B5F6] uppercase">
                      Largo (ej. 2,40 m) →
                    </span>
                    <span className="text-xs font-bold text-white mt-1">
                      Cuerpo de la alfombra
                    </span>
                    <span className="text-[11px] font-mono text-slate-300 mt-1">
                      ↑ Ancho (ej. 1,70 m)
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#60B5F6] font-bold pt-1">
                    {SERVICIO_ALFOMBRAS_DATA.guiaComoMedir.ejemploPractico}
                  </p>
                </div>

                <ol className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                  {SERVICIO_ALFOMBRAS_DATA.guiaComoMedir.pasos.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono font-bold text-[#60B5F6] shrink-0">
                        0{idx + 1}.
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DE QUÉ DEPENDE EL PRESUPUESTO, 6. DÓNDE RECOGEMOS O RECIBIMOS y 7. PLAZOS (Sección 16.5, 16.6 y 16.7) */}
      <section className="py-14 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* 5. De qué depende el presupuesto */}
          <div>
            <div className="max-w-3xl mb-8">
              <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                Valoración personalizada con Mimo · Sin tarifas estándar cerradas
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight mb-3">
                ¿De qué depende el presupuesto de limpieza de una alfombra?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Cada alfombra es diferente en tamaño, peso y composición. Para darte un presupuesto justo y adaptado a tu pieza, nuestro asistente <strong>Mimo</strong> valora estos seis aspectos:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICIO_ALFOMBRAS_DATA.factoresPresupuesto.map((item) => (
                <div
                  key={item.factor}
                  className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324]"
                >
                  <h3 className="text-base font-extrabold text-[#002147] dark:text-white mb-1.5">
                    {item.factor}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.detalle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Dónde recogemos o recibimos y 7. Plazos */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-[#0F76BB] dark:text-[#60B5F6]">
                <Truck className="w-5 h-5" aria-hidden="true" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white">
                  Dónde recogemos o recibimos tu alfombra
                </h2>
              </div>

              <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <p>
                  <strong className="text-[#002147] dark:text-white">
                    • En tu propio domicilio:
                  </strong>{' '}
                  {SERVICIO_ALFOMBRAS_DATA.dondeRecogemosORecibimos.domicilio}
                </p>
                <p>
                  <strong className="text-[#002147] dark:text-white">
                    • En nuestras 3 tiendas propias en Vigo:
                  </strong>{' '}
                  {SERVICIO_ALFOMBRAS_DATA.dondeRecogemosORecibimos.tiendasPropias}
                </p>
                <p>
                  <strong className="text-[#002147] dark:text-white">
                    • En puntos de recogida colaboradores:
                  </strong>{' '}
                  {SERVICIO_ALFOMBRAS_DATA.dondeRecogemosORecibimos.puntosColaboradores}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {TIENDAS_PROPIAS.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-[#0b1d36] border border-slate-200/70 dark:border-slate-800"
                  >
                    <p className="font-bold text-[#002147] dark:text-white">
                      {t.nombre_mostrado}
                    </p>
                    <p className="text-slate-600 dark:text-slate-300 mt-0.5">{t.direccion}</p>
                    <p className="text-slate-500 mt-0.5">{t.horario.resumen}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Plazos y 8. Valoración con Fotos Reales */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-7">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white mb-2">
                  Plazos de limpieza y entrega
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {SERVICIO_ALFOMBRAS_DATA.plazosExplicacion}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-7">
                <div className="flex items-center gap-2 text-[#0F76BB] dark:text-[#60B5F6] mb-2">
                  <Camera className="w-5 h-5" aria-hidden="true" />
                  <h2 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white">
                    Revisión previa por foto en WhatsApp
                  </h2>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Cuando abras el chat con Mimo, envíanos una foto general de la alfombra, una foto del reverso (o etiqueta si la tiene) y de las manchas que te preocupen. Así nuestro equipo puede darte una valoración fiel antes de desplazarte o programar la recogida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CUIDADO Y MANCHAS (Sección 16.9) */}
      <section className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
              Recomendaciones profesionales de conservación
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
              Cuidado de tu alfombra en casa y cómo actuar ante manchas
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36]">
              <h3 className="text-lg font-extrabold text-[#002147] dark:text-white mb-4">
                Consejos básicos de mantenimiento doméstico
              </h3>
              <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
                {SERVICIO_ALFOMBRAS_DATA.cuidadoYManchas.consejosMantenimiento.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36]">
                <h3 className="text-lg font-extrabold text-[#002147] dark:text-white mb-2">
                  Por qué no conviene usar productos domésticos sin conocer el tejido
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {SERVICIO_ALFOMBRAS_DATA.cuidadoYManchas.porQueEvitarProductosDomesticos}
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-amber-300/80 dark:border-amber-700/60 bg-amber-50/60 dark:bg-amber-950/20 text-sm text-slate-800 dark:text-slate-200">
                <div className="flex items-center gap-2 font-extrabold text-[#002147] dark:text-amber-300 mb-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Cuándo acudir a una limpieza profesional e información importante</span>
                </div>
                <p className="leading-relaxed">
                  {SERVICIO_ALFOMBRAS_DATA.cuidadoYManchas.cuandoAcudirYAdvertencia}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLUJO DE SOLICITUD Y PRESUPUESTO CON MIMO (Sección 16 — Flujo de solicitud) */}
      <section
        id="presupuestar-alfombra"
        className="py-16 lg:py-20 bg-[#002147] text-white border-b border-white/10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-xs font-mono uppercase tracking-wider text-[#60B5F6] font-bold mb-2">
              Valoración directa por WhatsApp · {CONTACT_INFO.whatsappNumber}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
              Presupuestar mi alfombra con Mimo
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Un enlace de WhatsApp solo lleva texto y no permite adjuntar imágenes automáticamente: prepara aquí tus datos para abrir el chat con <strong>Mimo</strong> y, una vez dentro de WhatsApp, envíanos fotos de la alfombra y de las manchas para que Mimo confirme tu presupuesto y disponibilidad de recogida.
            </p>
          </div>

          <div className="rounded-2xl bg-white text-slate-900 dark:bg-[#0b1d36] dark:text-white p-6 sm:p-8 shadow-xl space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="alf-localidad"
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Localidad
                </label>
                <select
                  id="alf-localidad"
                  value={localidad}
                  onChange={(e) => setLocalidad(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm font-medium"
                >
                  <option value="Vigo">Vigo</option>
                  <option value="Redondela">Redondela</option>
                  <option value="Gondomar">Gondomar</option>
                  <option value="Ponteareas">Ponteareas</option>
                  <option value="O Porriño">O Porriño</option>
                  <option value="Otra localidad del área de Vigo">
                    Otra localidad (consultar cobertura)
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="alf-largo"
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Largo aprox. (ej. 2,40 m)
                </label>
                <input
                  id="alf-largo"
                  type="text"
                  value={largo}
                  onChange={(e) => setLargo(e.target.value)}
                  placeholder="Ej.: 2,40 m"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="alf-ancho"
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Ancho aprox. (ej. 1,70 m)
                </label>
                <input
                  id="alf-ancho"
                  type="text"
                  value={ancho}
                  onChange={(e) => setAncho(e.target.value)}
                  placeholder="Ej.: 1,70 m"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="alf-fibra"
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Material o tipo (si se conoce)
                </label>
                <select
                  id="alf-fibra"
                  value={tipoFibra}
                  onChange={(e) => setTipoFibra(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm"
                >
                  <option value="No estoy seguro / Sin etiqueta">
                    No estoy seguro / Sin etiqueta
                  </option>
                  <option value="Lana o fibras naturales">Lana o fibras naturales</option>
                  <option value="Sintética / Salón">Sintética / Salón</option>
                  <option value="Pelo largo (tipo shaggy)">Pelo largo (tipo shaggy)</option>
                  <option value="Oriental / Anudada / Delicada">
                    Oriental / Anudada / Delicada
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="alf-modalidad"
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Recogida o entrega en tienda
                </label>
                <select
                  id="alf-modalidad"
                  value={modalidadEntrega}
                  onChange={(e) => setModalidadEntrega(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm"
                >
                  <option value="Quiero consultar recogida y entrega a domicilio">
                    Quiero consultar recogida y entrega a domicilio
                  </option>
                  <option value="La llevaré a una tienda propia Mimos en Vigo">
                    La llevaré a una tienda propia Mimos en Vigo
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="alf-obs"
                className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
              >
                Estado, manchas o disponibilidad para la recogida (opcional)
              </label>
              <input
                id="alf-obs"
                type="text"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                placeholder="Ej.: Tiene una mancha de café y flecos en los bordes. Disponible por las tardes."
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base py-4 px-6 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Presupuestar mi alfombra en WhatsApp con Mimo</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-600 px-4 py-3.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#178A47]" />
                    <span>Mensaje copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar texto</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              El presupuesto queda confirmado una vez que Mimo revise las medidas, características y fotografías de tu alfombra en el chat de WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* 10. PREGUNTAS FRECUENTES (10 FAQs sin precios — Sección 16.10) */}
      <section className="py-14 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
              Resolvemos tus dudas antes de recoger tu alfombra
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
              Preguntas frecuentes sobre la limpieza de alfombras en Vigo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICIO_ALFOMBRAS_DATA.preguntasFrecuentes.map((faq) => (
              <details
                key={faq.pregunta}
                className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-5"
              >
                <summary className="font-extrabold text-[#002147] dark:text-white cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base">
                  <span>{faq.pregunta}</span>
                  <span className="text-[#0F76BB] font-mono text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-3 border-t border-slate-100 dark:border-slate-800">
                  {faq.respuesta}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11. ENLACES RELACIONADOS Y LLAMADA FINAL (Sección 16.11) */}
      <section className="py-14 bg-white dark:bg-[#071324]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-6">
            Servicios relacionados con el cuidado del hogar y alojamientos en Vigo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {SERVICIO_ALFOMBRAS_DATA.enlacesRelacionados.map((rel) => (
              <a
                key={rel.href}
                href={rel.href}
                onClick={(e) => onNavigate(rel.href, e)}
                className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB] bg-slate-50/70 dark:bg-[#0b1d36] flex flex-col justify-between group transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-extrabold text-[#002147] dark:text-white group-hover:text-[#0F76BB] dark:group-hover:text-[#60B5F6]">
                      {rel.titulo}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rel.descripcion}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#002147] dark:text-slate-200 hover:text-[#0F76BB]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Volver a la portada de Tintorería Mimos Navia</span>
            </a>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Presupuestar mi alfombra</span>
              </a>
              <a
                href={CONTACT_INFO.phoneHref}
                className="inline-flex items-center gap-2 border border-slate-300 dark:border-slate-700 text-[#002147] dark:text-white font-bold text-sm px-4 py-3 rounded-xl"
              >
                <Phone className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
