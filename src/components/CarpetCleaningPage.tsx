import React from 'react';
import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  AlertTriangle,
  Camera,
  Check,
  CheckCircle2,
  Copy,
  MessageCircle,
  Phone,
  Ruler,
  Truck,
} from 'lucide-react';
import { SERVICIO_ALFOMBRAS_DATA } from '../data/servicePagesData';
import {
  TIENDAS_PROPIAS,
  ZONAS_SERVICIO,
  CONTACT_INFO,
  IMAGES,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';
import { PageHeroLight } from './PageHeroLight';

interface CarpetCleaningPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const CarpetCleaningPage: React.FC<CarpetCleaningPageProps> = ({
  onNavigate,
}) => {
  const [localidad, setLocalidad] = useState('Vigo');
  const [servicioSolicitado, setServicioSolicitado] = useState(
    'Limpieza e higienización de alfombra'
  );
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
      'Hola, Mimo. Quiero solicitar la valoración de una alfombra.',
      `Servicio solicitado: ${servicioSolicitado}`,
      `Localidad: ${localidad}`,
      `Medidas aproximadas (largo x ancho): ${medidasTexto}`,
      `Tipo de alfombra / material: ${tipoFibra}`,
      `Preferencia de entrega/recogida: ${modalidadEntrega}`,
    ];
    if (observaciones.trim()) {
      lines.push(`Estado, manchas o reparación a tener en cuenta: ${observaciones.trim()}`);
    }
    lines.push(
      'A continuación te envío en este chat fotos de la alfombra para que puedas valorarla.'
    );
    return lines.join('\n');
  };

  const whatsappUrl = buildMimoWhatsAppUrl(buildCarpetWhatsAppMessage());

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildCarpetWhatsAppMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="focus:outline-hidden bg-white text-slate-900 border-b border-slate-200"
    >
      {/* 1. CABECERA LUMINOSA */}
      <PageHeroLight
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Servicios', href: '/#servicios' },
          { label: 'Limpieza de alfombras en Vigo' },
        ]}
        onNavigate={onNavigate}
        kicker="Servicio Especializado en Vigo · Mediante taller especialista colaborador"
        title={SERVICIO_ALFOMBRAS_DATA.h1}
        description={SERVICIO_ALFOMBRAS_DATA.subtituloCabecera}
        note={SERVICIO_ALFOMBRAS_DATA.aclaracionDomicilio}
        whatsappHref={whatsappUrl}
        whatsappLabel="Consultar con Mimo por WhatsApp"
        onWhatsAppClick={() =>
          trackWhatsAppClick('/limpieza-alfombras-vigo', 'service_detail', {
            service_id: 'limpieza-alfombras',
          })
        }
        secondaryAction={{
          label: 'Solicitar recogida a domicilio',
          href: '#presupuestar-alfombra',
          icon: <Truck className="w-4 h-4 shrink-0" aria-hidden="true" />,
          isInternalRoute: false,
        }}
        image={{
          src: IMAGES.alfombrasMimos,
          alt: 'Revisión y medición profesional de una alfombra de lana en Tintorería Mimos Vigo',
          caption:
            'Valoración individualizada según medidas, tipo de fibra, reverso y estado de cada alfombra.',
          fallbackTitle: 'Limpieza de alfombras en Vigo',
          fallbackSubtitle: 'Recepción en tiendas y recogida concertada a domicilio',
        }}
      />

      {/* 2. CÓMO FUNCIONA, EN 4 PASOS (Lino cálido #F7F6F2) */}
      <section className="py-14 lg:py-20 bg-[#F7F6F2] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 space-y-1.5">
            <p className="text-xs sm:text-sm font-bold text-[#0C65A1]">
              Proceso claro de principio a fin
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
              Cómo funciona nuestro servicio de limpieza de alfombras en 4 pasos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICIO_ALFOMBRAS_DATA.pasosComoFunciona.map((paso) => (
              <article
                key={paso.num}
                className="rounded-sm border border-slate-200 bg-white p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono tabular-nums font-bold text-[#0C65A1]">
                    PASO {paso.num}
                  </span>
                  <h3 className="text-lg font-extrabold text-[#002147] mt-1.5 mb-2.5">
                    {paso.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {paso.descripcion}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. QUÉ ALFOMBRAS SE VALORAN + 4. CÓMO MEDIRLA + REPARACIÓN (Blanco) */}
      <section className="py-14 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Qué alfombras se valoran */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#0C65A1] mb-1">
                  Cuidado adaptado a cada tejido
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                  Qué tipos de alfombras valoramos en Tintorería Mimos
                </h2>
              </div>

              <div className="space-y-4">
                {SERVICIO_ALFOMBRAS_DATA.tiposAlfombrasValoradas.map((tipo) => (
                  <article
                    key={tipo.titulo}
                    className="p-5 rounded-sm border border-slate-200 bg-[#F7F6F2]/70"
                  >
                    <h3 className="text-base sm:text-lg font-extrabold text-[#002147] mb-1.5 flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 text-[#0C65A1] shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span>{tipo.titulo}</span>
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed pl-6">
                      {tipo.descripcion}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* Cómo medirla (Mini guía luminosa) */}
            <aside className="lg:col-span-5">
              <div className="rounded-sm border border-[#0F76BB]/30 bg-[#EDF5FD] p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2 text-[#0C65A1]">
                  <Ruler className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Mini guía práctica de medición
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                  {SERVICIO_ALFOMBRAS_DATA.guiaComoMedir.titulo}
                </h2>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {SERVICIO_ALFOMBRAS_DATA.guiaComoMedir.introduccion}
                </p>

                {/* Diagrama Visual Largo x Ancho */}
                <div className="p-5 rounded-sm bg-white border border-slate-200 text-center space-y-2">
                  <div className="mx-auto max-w-[240px] aspect-[3/2] rounded-sm border-2 border-dashed border-[#0F76BB] bg-[#F4F9FE] flex flex-col items-center justify-center p-3">
                    <span className="text-[11px] font-mono font-bold text-[#0C65A1] uppercase">
                      Largo (ej. 2,40 m) →
                    </span>
                    <span className="text-xs font-extrabold text-[#002147] mt-1">
                      Cuerpo de la alfombra
                    </span>
                    <span className="text-[11px] font-mono text-slate-600 mt-1">
                      ↑ Ancho (ej. 1,70 m)
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[#002147] font-bold pt-1">
                    {SERVICIO_ALFOMBRAS_DATA.guiaComoMedir.ejemploPractico}
                  </p>
                </div>

                <ol className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {SERVICIO_ALFOMBRAS_DATA.guiaComoMedir.pasos.map((p, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="font-mono font-extrabold text-[#0C65A1] shrink-0">
                        0{idx + 1}.
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>

          {/* Enlace dedicado a reparación y restauración de alfombras */}
          <div className="mt-12 rounded-sm border border-slate-200 border-l-4 border-l-[#0F76BB] bg-[#F7F6F2] p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0C65A1]">
                  {SERVICIO_ALFOMBRAS_DATA.reparacionYRestauracion.subtitulo}
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight">
                  {SERVICIO_ALFOMBRAS_DATA.reparacionYRestauracion.titulo}
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {SERVICIO_ALFOMBRAS_DATA.reparacionYRestauracion.descripcion}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs sm:text-sm text-slate-700">
                  {SERVICIO_ALFOMBRAS_DATA.reparacionYRestauracion.trabajos.map((trabajo) => (
                    <li key={trabajo} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{trabajo}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-4 rounded-sm bg-white border border-slate-200 p-5 sm:p-6 space-y-3.5">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {SERVICIO_ALFOMBRAS_DATA.reparacionYRestauracion.comoSolicitarlo}
                </p>
                <a
                  href="/reparacion-alfombras-vigo"
                  onClick={(e) => onNavigate('/reparacion-alfombras-vigo', e)}
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 bg-white border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-5 py-3 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Ir a reparación de alfombras</span>
                  <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
                <a
                  href={SERVICIO_ALFOMBRAS_DATA.reparacionYRestauracion.whatsappReparacionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick('/limpieza-alfombras-vigo', 'service_detail_repair', {
                      service_id: 'reparacion-alfombras',
                    })
                  }
                  className="w-full min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-xs sm:text-sm px-4 py-3 rounded-lg transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Enviar fotos de borde o fleco a Mimo</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FACTORES DEL PRESUPUESTO, PUNTOS DE ENTREGA Y PLAZOS (#F7F6F2) */}
      <section className="py-14 lg:py-20 bg-[#F7F6F2] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div>
            <div className="max-w-3xl mb-8">
              <p className="text-xs sm:text-sm font-bold text-[#0C65A1] mb-1">
                Valoración personalizada con Mimo · Sin tarifas estándar cerradas
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight mb-3 text-balance">
                ¿De qué depende el presupuesto de limpieza de una alfombra?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Cada alfombra es diferente en tamaño, peso y composición. Para darte un presupuesto justo y adaptado a tu pieza, nuestro asistente <strong>Mimo</strong> valora estos seis aspectos:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SERVICIO_ALFOMBRAS_DATA.factoresPresupuesto.map((item) => (
                <article
                  key={item.factor}
                  className="p-6 rounded-sm border border-slate-200 bg-white"
                >
                  <h3 className="text-base font-extrabold text-[#002147] mb-1.5">
                    {item.factor}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.detalle}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-slate-300/70">
            <div className="lg:col-span-7 rounded-sm border border-slate-200 bg-white p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-[#0C65A1]">
                <Truck className="w-5 h-5 shrink-0" aria-hidden="true" />
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                  Dónde recogemos o recibimos tu alfombra
                </h2>
              </div>

              <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                <p>
                  <strong className="text-[#002147]">• En tu propio domicilio:</strong>{' '}
                  {SERVICIO_ALFOMBRAS_DATA.dondeRecogemosORecibimos.domicilio}
                </p>
                <p>
                  <strong className="text-[#002147]">
                    • En nuestras {TIENDAS_PROPIAS.length} tiendas propias en Vigo:
                  </strong>{' '}
                  {SERVICIO_ALFOMBRAS_DATA.dondeRecogemosORecibimos.tiendasPropias}
                </p>
                <p>
                  <strong className="text-[#002147]">
                    • En puntos de recogida colaboradores:
                  </strong>{' '}
                  {SERVICIO_ALFOMBRAS_DATA.dondeRecogemosORecibimos.puntosColaboradores}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {TIENDAS_PROPIAS.map((t) => (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-sm bg-[#F7F6F2] border border-slate-200"
                  >
                    <p className="font-bold text-[#002147]">{t.nombre_mostrado}</p>
                    <p className="text-slate-600 mt-0.5">{t.direccion}</p>
                    <p className="text-slate-500 mt-0.5">{t.horario.resumen}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-sm border border-slate-200 bg-white p-6 sm:p-7">
                <h2 className="text-lg sm:text-xl font-extrabold text-[#002147] mb-2">
                  Plazos de limpieza y entrega
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {SERVICIO_ALFOMBRAS_DATA.plazosExplicacion}
                </p>
              </div>

              <div className="rounded-sm border border-[#0F76BB]/25 bg-[#EDF5FD] p-6 sm:p-7">
                <div className="flex items-center gap-2 text-[#0C65A1] mb-2">
                  <Camera className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <h2 className="text-lg sm:text-xl font-extrabold text-[#002147]">
                    Revisión previa por foto en WhatsApp
                  </h2>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Cuando abras el chat con Mimo, envíanos una foto general de la alfombra, una foto del reverso (o etiqueta si la tiene) y de las manchas que te preocupen. Así nuestro equipo puede darte una valoración fiel antes de desplazarte o programar la recogida.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUIDADO Y MANCHAS (Blanco) */}
      <section className="py-14 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <p className="text-xs sm:text-sm font-bold text-[#0C65A1] mb-1">
              Recomendaciones profesionales de conservación
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
              Cuidado de tu alfombra en casa y cómo actuar ante manchas
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-sm border border-slate-200 bg-[#F7F6F2]/70">
              <h3 className="text-lg font-extrabold text-[#002147] mb-4">
                Consejos básicos de mantenimiento doméstico
              </h3>
              <ul className="space-y-3 text-sm text-slate-700">
                {SERVICIO_ALFOMBRAS_DATA.cuidadoYManchas.consejosMantenimiento.map((c) => (
                  <li key={c} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#0C65A1] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <div className="p-6 rounded-sm border border-slate-200 bg-[#F7F6F2]/70">
                <h3 className="text-lg font-extrabold text-[#002147] mb-2">
                  Por qué no conviene usar productos domésticos sin conocer el tejido
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {SERVICIO_ALFOMBRAS_DATA.cuidadoYManchas.porQueEvitarProductosDomesticos}
                </p>
              </div>

              <div className="p-6 rounded-sm border border-slate-200 border-l-4 border-l-amber-500 bg-white text-sm text-slate-700">
                <div className="flex items-center gap-2 font-extrabold text-[#002147] mb-1.5">
                  <AlertTriangle
                    className="w-4 h-4 text-amber-700 shrink-0"
                    aria-hidden="true"
                  />
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

      {/* 7. FLUJO DE SOLICITUD Y PRESUPUESTO CON MIMO (#EDF5FD) */}
      <section
        id="presupuestar-alfombra"
        className="py-16 lg:py-20 bg-[#EDF5FD] text-[#002147] border-b border-slate-200"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-xs sm:text-sm font-bold text-[#0C65A1] mb-2">
              Valoración directa por WhatsApp · {CONTACT_INFO.whatsappNumber}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] tracking-tight mb-3 text-balance">
              Presupuestar mi alfombra con Mimo
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Un enlace de WhatsApp solo lleva texto y no permite adjuntar imágenes automáticamente: prepara aquí tus datos para abrir el chat con <strong>Mimo</strong> y, una vez dentro de WhatsApp, envíanos fotos de la alfombra y de las manchas para confirmar tu presupuesto y disponibilidad de recogida.
            </p>
          </div>

          <div className="rounded-sm bg-white border border-slate-200 text-slate-900 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="alf-servicio"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Qué necesitas
                </label>
                <select
                  id="alf-servicio"
                  value={servicioSolicitado}
                  onChange={(e) => setServicioSolicitado(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base lg:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                >
                  <option value="Limpieza e higienización de alfombra">
                    Limpieza de alfombra
                  </option>
                  <option value="Reparación de alfombra (flecos, bordes o descosidos)">
                    Reparación (flecos/bordes)
                  </option>
                  <option value="Limpieza + Reparación de alfombra">
                    Limpieza + Reparación
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="alf-localidad"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Localidad
                </label>
                <select
                  id="alf-localidad"
                  value={localidad}
                  onChange={(e) => setLocalidad(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base lg:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                >
                  {ZONAS_SERVICIO.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                  <option value="Otra localidad del área de Vigo">
                    Otra localidad (consultar cobertura)
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="alf-largo"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Largo aprox. (ej. 2,40 m)
                </label>
                <input
                  id="alf-largo"
                  type="text"
                  value={largo}
                  onChange={(e) => setLargo(e.target.value)}
                  placeholder="Ej.: 2,40 m"
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base lg:text-sm text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="alf-ancho"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Ancho aprox. (ej. 1,70 m)
                </label>
                <input
                  id="alf-ancho"
                  type="text"
                  value={ancho}
                  onChange={(e) => setAncho(e.target.value)}
                  placeholder="Ej.: 1,70 m"
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base lg:text-sm text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="alf-fibra"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Material o tipo (si se conoce)
                </label>
                <select
                  id="alf-fibra"
                  value={tipoFibra}
                  onChange={(e) => setTipoFibra(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base lg:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Recogida o entrega en tienda
                </label>
                <select
                  id="alf-modalidad"
                  value={modalidadEntrega}
                  onChange={(e) => setModalidadEntrega(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base lg:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
                className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
              >
                Estado, manchas o disponibilidad para la recogida (opcional)
              </label>
              <input
                id="alf-obs"
                type="text"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                placeholder="Ej.: Tiene una mancha de café y flecos en los bordes. Disponible por las tardes."
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base lg:text-sm text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick('/limpieza-alfombras-vigo', 'service_detail_builder', {
                    service_id: 'limpieza-alfombras',
                  })
                }
                className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2.5 bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm sm:text-base py-3 px-6 rounded-lg transition-colors shadow-xs"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Presupuestar mi alfombra en WhatsApp con Mimo</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="min-h-[48px] inline-flex items-center justify-center gap-1.5 border border-[#002147] bg-white hover:bg-[#002147] hover:text-white px-4 py-3 rounded-lg text-xs font-bold text-[#002147] cursor-pointer transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#147A3E]" aria-hidden="true" />
                    <span>Mensaje copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Copiar texto</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-500 text-center leading-relaxed">
              El presupuesto queda confirmado una vez que Mimo revise las medidas, características y fotografías de tu alfombra en el chat de WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* 8. PREGUNTAS FRECUENTES (#F7F6F2) */}
      <section className="py-14 lg:py-20 bg-[#F7F6F2] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <p className="text-xs sm:text-sm font-bold text-[#0C65A1] mb-1">
              Resolvemos tus dudas antes de recoger tu alfombra
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
              Preguntas frecuentes sobre la limpieza de alfombras en Vigo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICIO_ALFOMBRAS_DATA.preguntasFrecuentes.map((faq) => (
              <details
                key={faq.pregunta}
                className="group rounded-sm border border-slate-200 bg-white p-5"
              >
                <summary className="min-h-[44px] font-extrabold text-[#002147] cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base">
                  <span>{faq.pregunta}</span>
                  <span className="text-[#0C65A1] font-mono text-lg group-open:rotate-45 transition-transform shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
                  {faq.respuesta}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 9. ENLACES RELACIONADOS Y LLAMADA FINAL (Blanco) */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] mb-6">
            Servicios relacionados con el cuidado del hogar y alojamientos en Vigo
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {SERVICIO_ALFOMBRAS_DATA.enlacesRelacionados.map((rel) => (
              <a
                key={rel.href}
                href={rel.href}
                onClick={(e) => onNavigate(rel.href, e)}
                className="p-6 rounded-sm border border-slate-200 hover:border-[#0F76BB] bg-[#F7F6F2]/60 flex flex-col justify-between group transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-base font-extrabold text-[#002147] group-hover:text-[#0F76BB]">
                      {rel.titulo}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-[#0C65A1] shrink-0" aria-hidden="true" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {rel.descripcion}
                  </p>
                </div>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="inline-flex items-center gap-2 min-h-[44px] text-sm font-bold text-[#002147] hover:text-[#0F76BB]"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Volver a la portada de Tintorería Mimos Navia</span>
            </a>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick('/limpieza-alfombras-vigo', 'service_detail_footer', {
                    service_id: 'limpieza-alfombras',
                  })
                }
                className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm px-5 py-3 rounded-lg transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Presupuestar mi alfombra</span>
              </a>
              <a
                href={CONTACT_INFO.phoneHref}
                onClick={() => trackPhoneClick('/limpieza-alfombras-vigo', 'service_detail')}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-4 py-3 rounded-lg transition-colors group"
              >
                <Phone className="w-4 h-4 text-[#0C65A1] group-hover:text-white shrink-0" aria-hidden="true" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
