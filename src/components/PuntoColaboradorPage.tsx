import React, { useState } from 'react';
import {
  MessageCircle,
  Phone,
  CheckCircle2,
  Store,
  Truck,
  Monitor,
  ShieldCheck,
  TrendingUp,
  Users,
  Copy,
  Check,
  MapPin,
  Clock,
  HelpCircle,
  FileText,
  Mail,
} from 'lucide-react';
import {
  CONTACT_INFO,
  PUNTOS_COLABORADORES,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackFormPrepared, trackWhatsAppClick } from '../utils/analytics';
import { PageHeroLight } from './PageHeroLight';

interface PuntoColaboradorPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const PuntoColaboradorPage: React.FC<PuntoColaboradorPageProps> = ({
  onNavigate,
}) => {
  const [nombreComercio, setNombreComercio] = useState('');
  const [personaContacto, setPersonaContacto] = useState('');
  const [tipoNegocio, setTipoNegocio] = useState('Tienda de arreglos de ropa / Modistería');
  const [localidad, setLocalidad] = useState('Vigo');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [aceptoPrivacidad, setAceptoPrivacidad] = useState(false);
  const [errorPrivacidad, setErrorPrivacidad] = useState('');
  const [solicitudPreparada, setSolicitudPreparada] = useState(false);
  const [copied, setCopied] = useState(false);
  const [failedImgs, setFailedImgs] = useState<Record<string, boolean>>({});

  const buildCollaboratorWhatsAppMessage = () => {
    const lines = [
      'Hola, Mimo. Quiero solicitar información para ser Punto Colaborador de Tintorería Mimos.',
      `Nombre del comercio: ${nombreComercio.trim() || 'Pendiente de indicar'}`,
      `Persona de contacto: ${personaContacto.trim() || 'Pendiente de indicar'}`,
      `Tipo de negocio: ${tipoNegocio}`,
      `Localidad: ${localidad}`,
    ];
    if (direccion.trim()) {
      lines.push(`Dirección / Zona: ${direccion.trim()}`);
    }
    if (telefono.trim()) {
      lines.push(`Teléfono de contacto: ${telefono.trim()}`);
    }
    if (observaciones.trim()) {
      lines.push(`Detalles o dudas adicionales: ${observaciones.trim()}`);
    }
    lines.push('¿Cuándo podríamos agendar una visita o llamada informativa para conocer los márgenes y operativa?');
    return lines.join('\n');
  };

  const whatsappUrl = buildMimoWhatsAppUrl(buildCollaboratorWhatsAppMessage());
  const collaboratorMailtoHref = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
    `Solicitud Punto Colaborador - ${nombreComercio.trim() || 'Nuevo comercio'}`
  )}&body=${encodeURIComponent(buildCollaboratorWhatsAppMessage())}`;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(buildCollaboratorWhatsAppMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const faqs = [
    {
      pregunta: '¿Tengo que realizar alguna inversión o pagar cuotas de entrada?',
      respuesta:
        'No. No tienes que comprar maquinaria ni pagar licencias ni cuotas mensuales. Mimos aporta el respaldo técnico, el transporte y el sistema de gestión. Tú solo aportas tu mostrador y recibes tu comisión.',
    },
    {
      pregunta: '¿Cuánto tiempo me quitará atender a un cliente de tintorería?',
      respuesta:
        'Apenas unos instantes. El depósito y recogida se realiza mediante resguardos oficiales numerados donde se anotan las prendas recibidas de forma rápida y sencilla, sin entorpecer la atención de tu negocio principal.',
    },
    {
      pregunta: '¿En qué zonas o localidades puedo solicitar ser colaborador?',
      respuesta:
        'Buscamos activamente comercios en Vigo (todos sus barrios) y en los municipios de su entorno: Val Miñor (Gondomar, Nigrán, Baiona), O Morrazo (Cangas, Moaña), comarcas de O Condado, A Louriña y Baixo Miño (Porriño, Mos, Redondela, Ponteareas, Salceda, Tui). Si tu negocio está en otra localidad cercana, consúltanos igualmente: analizamos cada propuesta de forma individual.',
    },
    {
      pregunta: '¿Cómo se liquidan las comisiones?',
      respuesta:
        'De forma mensual y totalmente transparente. El sistema registra cada prenda recepcionada en tu punto, por lo que dispones de un desglose exacto de servicios realizados y comisiones devengadas.',
    },
  ];

  return (
    <main id="main-content" tabIndex={-1} className="focus:outline-hidden bg-white text-slate-900 flex-1">
      {/* Hero Comercial Luminoso */}
      <PageHeroLight
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Puntos Mimos', href: '/puntos-mimos' },
          { label: 'Sé Punto Colaborador' },
        ]}
        onNavigate={onNavigate}
        kicker="Alianza Comercial · Sin Inversión · Sin Riesgo"
        title="Suma un servicio de tintorería y lavandería a tu comercio sin inversión"
        description="Gana una comisión directa por cada prenda, atrae nuevos clientes que visitarán tu local dos veces y despreocúpate de todo: en Tintorería Mimos aportamos las rutas logísticas periódicas, el sistema de resguardos oficiales y el tratamiento profesional en nuestras instalaciones centrales en Vigo."
        whatsappHref={whatsappUrl}
        whatsappLabel="Quiero ser punto colaborador"
        secondaryAction={{
          label: `Llamar al ${CONTACT_INFO.phoneDisplay}`,
          href: CONTACT_INFO.phoneHref,
          icon: <Phone className="w-4 h-4 text-[#0C65A1]" aria-hidden="true" />,
          isInternalRoute: false,
        }}
        image={{
          src: '/images/colaboradores/paso-1-recepcion-software.webp',
          alt: 'Comerciante colaboradora atendiendo en mostrador con tablet de gestión de Tintorería Mimos',
          caption: 'Integración inmediata: solo necesitas un pequeño espacio de mostrador y un perchero. Nosotros te facilitamos los resguardos y el material.',
          fallbackTitle: 'Recepción ágil en mostrador',
          fallbackSubtitle: 'Alianza comercial con Tintorería Mimos Vigo',
        }}
        extraContent={
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-xs text-slate-700 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0C65A1] shrink-0" aria-hidden="true" />
              <span>Comisión fija transparente</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0C65A1] shrink-0" aria-hidden="true" />
              <span>Resguardos oficiales incluidos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0C65A1] shrink-0" aria-hidden="true" />
              <span>Logística en tu puerta</span>
            </div>
          </div>
        }
      />

      {/* Los 4 Grandes Beneficios para el Comercio */}
      <section className="py-16 lg:py-20 bg-[#F7F6F2] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-mono font-bold text-[#0C65A1] uppercase tracking-wider mb-2">
              Ventajas comerciales directas
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] tracking-tight mb-4">
              ¿Por qué sumar el servicio de Mimos a tu negocio?
            </h2>
            <p className="text-base text-slate-600">
              Un modelo de colaboración rentable y sin fricción diseñado para pequeños comercios y negocios de proximidad en Vigo y municipios limítrofes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#EDF5FD] flex items-center justify-center text-[#0C65A1]">
                <TrendingUp className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-[#002147]">
                Comisión e ingresos extra
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ganas un margen directo por cada traje, vestido, abrigo, edredón o alfombra recibido en tu mostrador, sin gastos de consumo ni costes fijos.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#EDF5FD] flex items-center justify-center text-[#0C65A1]">
                <Users className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-[#002147]">
                Doble visita de clientes
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Cada cliente visita tu local dos veces: para entregar la prenda y para recogerla. Ese flujo genera ventas cruzadas de tus propios productos.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#EDF5FD] flex items-center justify-center text-[#0C65A1]">
                <Truck className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-[#002147]">
                Logística en tu puerta
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Nuestra furgoneta pasa de forma regular en rutas fijadas. No tienes que desplazarte ni cargar nada: recogemos y entregamos en tu mostrador.
              </p>
            </div>

            <div className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-xs">
              <div className="w-12 h-12 rounded-xl bg-[#EDF5FD] flex items-center justify-center text-[#0C65A1]">
                <Monitor className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-[#002147]">
                Resguardos claros y numerados
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Sistema ágil de depósito y entrega con resguardos oficiales para el cliente, identificación segura de cada prenda y control transparente de comisiones devengadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cómo Funciona el Día a Día: Los 4 Pasos con Fotografía Real */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold text-[#0C65A1] uppercase tracking-wider">
              Operativa sencilla y transparente
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] tracking-tight mt-2 mb-4">
              Cómo funciona el día a día en 4 pasos
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Diseñado para que atender a un cliente de tintorería te lleve menos de un minuto y no interfiera con la actividad principal de tu tienda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Paso 1 */}
            <article className="rounded-3xl border border-slate-200 bg-[#F4F9FE] overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#0F76BB]/50 transition-all">
              <div className="aspect-16/10 overflow-hidden bg-slate-100">
                {!failedImgs.paso1 ? (
                  <picture>
                    <source srcSet="/images/colaboradores/paso-1-recepcion-software.webp" type="image/webp" />
                    <img
                      src="/images/colaboradores/paso-1-recepcion-software.jpg"
                      alt="Paso 1: Recepción en mostrador con resguardo oficial numerado"
                      width={800}
                      height={500}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() => setFailedImgs((prev) => ({ ...prev, paso1: true }))}
                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                    />
                  </picture>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-bold">
                    Paso 01 · Recepción con resguardo oficial
                  </div>
                )}
              </div>
              <div className="p-6 sm:p-8 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#0C65A1] bg-white border border-[#0F76BB]/25 px-2.5 py-0.5 rounded-md">
                      PASO 01
                    </span>
                    <span className="text-xs text-slate-500">
                      Atención rápida en mostrador
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#002147]">
                    Recepción ágil con resguardo oficial
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2">
                    El cliente entrega su ropa o alfombra en tu tienda. Se anota la prenda en el resguardo oficial de Mimos con el servicio solicitado: el cliente recibe su comprobante de depósito y las prendas quedan identificadas de forma segura para la siguiente ruta de recogida.
                  </p>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 pt-3 border-t border-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#147A3E] shrink-0" aria-hidden="true" />
                    <span>Sin cálculos de precios ni errores en tickets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#147A3E] shrink-0" aria-hidden="true" />
                    <span>Etiquetado claro y seguro para cada prenda</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Paso 2 */}
            <article className="rounded-3xl border border-slate-200 bg-[#F4F9FE] overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#0F76BB]/50 transition-all">
              <div className="aspect-16/10 overflow-hidden bg-slate-100">
                {!failedImgs.paso2 ? (
                  <picture>
                    <source srcSet="/images/colaboradores/paso-2-recogida-furgoneta.webp" type="image/webp" />
                    <img
                      src="/images/colaboradores/paso-2-recogida-furgoneta.jpg"
                      alt="Paso 2: Conductor de Tintorería Mimos recogiendo las prendas en la puerta del comercio"
                      width={800}
                      height={500}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() => setFailedImgs((prev) => ({ ...prev, paso2: true }))}
                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                    />
                  </picture>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-bold">
                    Paso 02 · Recogida periódica en furgoneta
                  </div>
                )}
              </div>
              <div className="p-6 sm:p-8 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#0C65A1] bg-white border border-[#0F76BB]/25 px-2.5 py-0.5 rounded-md">
                      PASO 02
                    </span>
                    <span className="text-xs text-slate-500">
                      Rutas semanales programadas
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#002147]">
                    Recogida en tu puerta por la furgoneta Mimos
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2">
                    Tú no te desplazas ni cargas bultos. Nuestra furgoneta y repartidor uniformado pasan periódicamente por tu establecimiento en los días acordados para recoger los pedidos recepcionados en fundas protectoras y transportarlos de forma segura.
                  </p>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 pt-3 border-t border-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#147A3E] shrink-0" aria-hidden="true" />
                    <span>Horarios y frecuencias regulares sin sorpresas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#147A3E] shrink-0" aria-hidden="true" />
                    <span>Traspaso rápido y coordinado con albarán oficial</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Paso 3 */}
            <article className="rounded-3xl border border-slate-200 bg-[#F4F9FE] overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#0F76BB]/50 transition-all">
              <div className="aspect-16/10 overflow-hidden bg-slate-100">
                {!failedImgs.paso3 ? (
                  <picture>
                    <source srcSet="/images/colaboradores/paso-3-taller-tintoreria.webp" type="image/webp" />
                    <img
                      src="/images/colaboradores/paso-3-taller-tintoreria.jpg"
                      alt="Paso 3: Taller central de tintorería y lavandería de Mimos en Navia Vigo con maquinaria Veit"
                      width={800}
                      height={500}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() => setFailedImgs((prev) => ({ ...prev, paso3: true }))}
                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                    />
                  </picture>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-bold">
                    Paso 03 · Tratamiento en planta central de Navia
                  </div>
                )}
              </div>
              <div className="p-6 sm:p-8 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#0C65A1] bg-white border border-[#0F76BB]/25 px-2.5 py-0.5 rounded-md">
                      PASO 03
                    </span>
                    <span className="text-xs text-slate-500">
                      Garantía artesanal e industrial
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#002147]">
                    Tratamiento profesional en nuestra planta de Navia
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2">
                    En nuestra sede central de C/ As Teixugueiras, 11 (Vigo) tratamos cada prenda con más de 25 años de experiencia: desmanchado minucioso, tecnología ecológica Wet Cleaning, limpieza en seco en circuito cerrado y planchado artesanal en mesas de aspiración alemanas Veit.
                  </p>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 pt-3 border-t border-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#147A3E] shrink-0" aria-hidden="true" />
                    <span>Cuidado experto para trajes, sedas, pieles y edredones</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#147A3E] shrink-0" aria-hidden="true" />
                    <span>El prestigio de tu comercio siempre respaldado</span>
                  </li>
                </ul>
              </div>
            </article>

            {/* Paso 4 */}
            <article className="rounded-3xl border border-slate-200 bg-[#F4F9FE] overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#0F76BB]/50 transition-all">
              <div className="aspect-16/10 overflow-hidden bg-slate-100">
                {!failedImgs.paso4 ? (
                  <picture>
                    <source srcSet="/images/colaboradores/paso-4-entrega-cliente.webp" type="image/webp" />
                    <img
                      src="/images/colaboradores/paso-4-entrega-cliente.jpg"
                      alt="Paso 4: Entrega de prenda limpia en funda protectora al cliente satisfecho en el mostrador"
                      width={800}
                      height={500}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() => setFailedImgs((prev) => ({ ...prev, paso4: true }))}
                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                    />
                  </picture>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs font-bold">
                    Paso 04 · Entrega y cobro de comisión
                  </div>
                )}
              </div>
              <div className="p-6 sm:p-8 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#0C65A1] bg-white border border-[#0F76BB]/25 px-2.5 py-0.5 rounded-md">
                      PASO 04
                    </span>
                    <span className="text-xs text-slate-500">
                      Cobro y fidelización
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-[#002147]">
                    Entrega impecable y cobro de tu comisión
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2">
                    Te devolvemos las prendas embolsadas en fundas individuales transparentes con percha. El cliente acude a retirarlo con su resguardo a tu mostrador y tú ingresas tu margen de beneficio acordado.
                  </p>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-700 pt-3 border-t border-slate-200">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#147A3E] shrink-0" aria-hidden="true" />
                    <span>Entrega protegida y con presentación de tintorería</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#147A3E] shrink-0" aria-hidden="true" />
                    <span>Liquidaciones mensuales transparentes y puntuales</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Módulo Especial Luminoso: «Nos encargamos de absolutamente todo» */}
      <section className="py-16 lg:py-20 bg-[#EDF5FD] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0C65A1] bg-white border border-[#0F76BB]/25 px-3 py-1 rounded-md uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4 text-[#0C65A1]" aria-hidden="true" />
              <span>Tecnología y Respaldo Total</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] tracking-tight">
              Nos encargamos de todo: resguardos oficiales, material y logística
            </h2>
            <p className="text-sm sm:text-base text-slate-700 mt-3 leading-relaxed">
              Sabemos que tu tiempo debe estar centrado en tu negocio. Por eso hemos simplificado la operativa al máximo para que ser punto colaborador sea una experiencia cómoda, ágil y rentable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-4">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#EDF5FD] flex items-center justify-center text-[#0C65A1]">
                <FileText className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-[#002147]">
                Resguardos oficiales claros
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Operativa sencilla pensada para el comercio de barrio. Identificación clara de cada prenda con resguardo oficial numerado, desglose del servicio y control mensual y transparente de liquidación de comisiones.
              </p>
              <div className="text-xs text-[#0C65A1] font-semibold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Atención ágil sin complicaciones técnicas</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#EDF5FD] flex items-center justify-center text-[#0C65A1]">
                <Store className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-[#002147]">
                Material promocional sin coste
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Te facilitamos vinilos para tu escaparate con el distintivo de «Punto Colaborador Oficial Mimos», cartelería informativa, fundas protectoras y talonarios de apoyo.
              </p>
              <div className="text-xs text-[#0C65A1] font-semibold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Identificación visible para tus vecinos</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#EDF5FD] flex items-center justify-center text-[#0C65A1]">
                <MapPin className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-bold text-[#002147]">
                Publicidad digital y presencia web
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Tu tienda aparecerá de inmediato en nuestra página web oficial, en las fichas de Google Maps y en nuestras páginas de localidad como punto recomendado para clientes de tu zona.
              </p>
              <div className="text-xs text-[#0C65A1] font-semibold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Tráfico web derivado hacia tu local</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perfil Ideal: ¿A qué negocios les encaja a la perfección? */}
      <section className="py-16 lg:py-20 bg-[#F7F6F2] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold text-[#0C65A1] uppercase tracking-wider">
              Sinergia y compatibilidad
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] tracking-tight mt-2 mb-4">
              ¿Para qué tipo de comercios está pensado?
            </h2>
            <p className="text-base text-slate-600">
              Cualquier establecimiento con mostrador y trato directo con el vecindario puede convertirse en punto oficial. Es una alianza natural especialmente en estos sectores:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <span className="text-xs font-mono font-bold text-[#0C65A1]">01 · MÁXIMA AFINIDAD</span>
              <h3 className="text-base font-bold text-[#002147]">
                Arreglos de ropa y modisterías
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                El complemento perfecto: muchos clientes que llevan un bajo de pantalón, cremallera o entalle necesitan también lavar o planchar el traje o abrigo.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <span className="text-xs font-mono font-bold text-[#0C65A1]">02 · HOGAR Y TEXTIL</span>
              <h3 className="text-base font-bold text-[#002147]">
                Mercerías y ropa de cama
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Público habitual de costura, lencería y hogar que valora enormemente tener un servicio de tintorería y edredones sin desplazarse a otra zona.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <span className="text-xs font-mono font-bold text-[#0C65A1]">03 · SERVICIOS DE BARRIO</span>
              <h3 className="text-base font-bold text-[#002147]">
                Reparación de calzado y llaves
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Negocios tradicionales de alta confianza y paso diario constante, donde los vecinos resuelven múltiples recados en un mismo viaje.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <span className="text-xs font-mono font-bold text-[#0C65A1]">04 · MODA Y EVENTOS</span>
              <h3 className="text-base font-bold text-[#002147]">
                Boutiques de moda y fiesta
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Ofrece a tus clientas la tranquilidad de cuidar sus vestidos de fiesta, comunión o ceremonia con la tintorería experta que tú recomiendas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <span className="text-xs font-mono font-bold text-[#0C65A1]">05 · COMERCIO DE PROXIMIDAD</span>
              <h3 className="text-base font-bold text-[#002147]">
                Droguerías, papelerías y prensa
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Comercios situados en calles peatonales o plazas céntricas de barrios que buscan monetizar su mostrador y aumentar el tráfico de visitantes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2.5">
              <span className="text-xs font-mono font-bold text-[#0C65A1]">06 · EXPANSIÓN COMARCAL</span>
              <h3 className="text-base font-bold text-[#002147]">
                Nuevas zonas de búsqueda activa
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Buscamos activamente comercios en barrios de Vigo (Calvario, Teis, Bouzas, Centro, Travesas) y municipios del entorno: Val Miñor, O Morrazo, O Porriño, Mos, Redondela, Ponteareas, Salceda o Tui.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prueba Social: Los 5 Puntos Colaboradores Actuales de Mimos */}
      <section className="py-16 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono font-bold text-[#0C65A1] uppercase tracking-wider">
              Red consolidada en Galicia
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] tracking-tight mt-2 mb-4">
              Nuestros {PUNTOS_COLABORADORES.length} puntos colaboradores actuales
            </h2>
            <p className="text-base text-slate-600">
              Establecimientos de confianza que ya disfrutan de las ventajas de trabajar con Tintorería Mimos:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PUNTOS_COLABORADORES.map((pto) => (
              <div
                key={pto.id}
                className="rounded-2xl border border-slate-200 bg-[#F4F9FE] overflow-hidden flex flex-col justify-between shadow-xs"
              >
                {pto.foto && !failedImgs[pto.id] && (
                  <div className="aspect-16/10 overflow-hidden bg-slate-100">
                    <img
                      src={pto.foto}
                      alt={pto.nombre_mostrado}
                      width={600}
                      height={375}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={() => setFailedImgs((prev) => ({ ...prev, [pto.id]: true }))}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-5 sm:p-6 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-[#0C65A1]">
                      {pto.localidad.toUpperCase()}
                    </span>
                    <span className="text-[11px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                      Punto Activo
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#002147]">
                    {pto.nombre_mostrado}
                  </h3>
                  <p className="text-xs text-slate-600 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0C65A1] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{pto.direccion}, {pto.codigo_postal} {pto.localidad}</span>
                  </p>
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" aria-hidden="true" />
                    <span>{pto.horario.resumen}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario y Contacto Directo */}
      <section className="py-16 lg:py-20 bg-[#F7F6F2] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-mono font-bold text-[#0C65A1] uppercase tracking-wider">
                Solicitud sin compromiso
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight mt-1 mb-2">
                ¿Quieres que visitemos tu comercio o hablemos por teléfono?
              </h2>
              <p className="text-sm text-slate-600">
                Rellena estos breves datos y nos pondremos en contacto contigo para explicarte las condiciones, márgenes de comisión y resolver cualquier duda.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!aceptoPrivacidad) {
                  setErrorPrivacidad('Debes aceptar la política de privacidad para continuar.');
                  return;
                }
                setErrorPrivacidad('');
                setSolicitudPreparada(true);
                trackFormPrepared(
                  typeof window !== 'undefined' ? window.location.pathname : '/se-punto-colaborador',
                  'collaborator_application'
                );
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="colab-nombre-comercio" className="block text-xs font-bold text-[#002147] mb-1.5">
                    Nombre de tu comercio o negocio *
                  </label>
                  <input
                    id="colab-nombre-comercio"
                    type="text"
                    required
                    value={nombreComercio}
                    onChange={(e) => {
                      setNombreComercio(e.target.value);
                      setSolicitudPreparada(false);
                    }}
                    placeholder="Ej. Mercería Carmen / Modas Gómez"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 bg-[#F4F9FE] text-slate-900 text-base lg:text-sm focus:ring-2 focus:ring-[#0F76BB] focus:bg-white outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="colab-persona-contacto" className="block text-xs font-bold text-[#002147] mb-1.5">
                    Persona de contacto *
                  </label>
                  <input
                    id="colab-persona-contacto"
                    type="text"
                    required
                    value={personaContacto}
                    onChange={(e) => {
                      setPersonaContacto(e.target.value);
                      setSolicitudPreparada(false);
                    }}
                    placeholder="Tu nombre y apellidos"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 bg-[#F4F9FE] text-slate-900 text-base lg:text-sm focus:ring-2 focus:ring-[#0F76BB] focus:bg-white outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label htmlFor="colab-tipo-negocio" className="block text-xs font-bold text-[#002147] mb-1.5">
                    Tipo de actividad
                  </label>
                  <select
                    id="colab-tipo-negocio"
                    value={tipoNegocio}
                    onChange={(e) => {
                      setTipoNegocio(e.target.value);
                      setSolicitudPreparada(false);
                    }}
                    className="w-full min-h-[44px] px-3 py-2.5 rounded-xl border border-slate-300 bg-[#F4F9FE] text-slate-900 text-base lg:text-sm focus:ring-2 focus:ring-[#0F76BB] focus:bg-white outline-hidden"
                  >
                    <option value="Tienda de arreglos de ropa / Modistería">
                      Arreglos de ropa / Modistería
                    </option>
                    <option value="Mercería / Lencería / Hogar">
                      Mercería / Ropa de hogar
                    </option>
                    <option value="Reparación de calzado / Llaves">
                      Reparación calzado / Llaves
                    </option>
                    <option value="Boutique de moda / Fiesta">
                      Boutique de moda / Fiesta
                    </option>
                    <option value="Droguería / Papelería / Otros">
                      Droguería / Papelería / Otros
                    </option>
                  </select>
                </div>

                <div>
                  <label htmlFor="colab-localidad" className="block text-xs font-bold text-[#002147] mb-1.5">
                    Localidad / Municipio
                  </label>
                  <input
                    id="colab-localidad"
                    type="text"
                    required
                    value={localidad}
                    onChange={(e) => {
                      setLocalidad(e.target.value);
                      setSolicitudPreparada(false);
                    }}
                    placeholder="Ej. Vigo, Cangas, Nigrán, Baiona, Mos..."
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 bg-[#F4F9FE] text-slate-900 text-base lg:text-sm focus:ring-2 focus:ring-[#0F76BB] focus:bg-white outline-hidden"
                  />
                </div>

                <div>
                  <label htmlFor="colab-telefono" className="block text-xs font-bold text-[#002147] mb-1.5">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    id="colab-telefono"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    value={telefono}
                    onChange={(e) => {
                      setTelefono(e.target.value);
                      setSolicitudPreparada(false);
                    }}
                    placeholder="Ej. 600 000 000"
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 bg-[#F4F9FE] text-slate-900 text-base lg:text-sm focus:ring-2 focus:ring-[#0F76BB] focus:bg-white outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="colab-direccion" className="block text-xs font-bold text-[#002147] mb-1.5">
                  Dirección o zona de la tienda
                </label>
                <input
                  id="colab-direccion"
                  type="text"
                  value={direccion}
                  onChange={(e) => {
                    setDireccion(e.target.value);
                    setSolicitudPreparada(false);
                  }}
                  placeholder="Calle, número o barrio aproximado"
                  className="w-full min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 bg-[#F4F9FE] text-slate-900 text-base lg:text-sm focus:ring-2 focus:ring-[#0F76BB] focus:bg-white outline-hidden"
                />
              </div>

              <div>
                <label htmlFor="colab-observaciones" className="block text-xs font-bold text-[#002147] mb-1.5">
                  Comentarios o dudas que quieras comentarnos
                </label>
                <textarea
                  id="colab-observaciones"
                  rows={3}
                  value={observaciones}
                  onChange={(e) => {
                    setObservaciones(e.target.value);
                    setSolicitudPreparada(false);
                  }}
                  placeholder="Ej. Horario de apertura, si dispones de perchero, etc."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-[#F4F9FE] text-slate-900 text-base lg:text-sm focus:ring-2 focus:ring-[#0F76BB] focus:bg-white outline-hidden"
                />
              </div>

              {/* Casilla de privacidad y aviso legal */}
              <div className="pt-1">
                <div className="flex items-start gap-2.5">
                  <input
                    id="colab-privacidad"
                    type="checkbox"
                    checked={aceptoPrivacidad}
                    onChange={(e) => {
                      setAceptoPrivacidad(e.target.checked);
                      if (e.target.checked) setErrorPrivacidad('');
                    }}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0C65A1] focus:ring-[#0F76BB]"
                  />
                  <label htmlFor="colab-privacidad" className="text-xs text-slate-600 leading-relaxed">
                    He leído y acepto la{' '}
                    <a
                      href="/privacidad"
                      onClick={(e) => onNavigate('/privacidad', e)}
                      className="font-bold text-[#0C65A1] underline"
                    >
                      política de privacidad
                    </a>
                    . Entiendo que este formulario estructura un mensaje en mi navegador para enviarlo voluntariamente por WhatsApp o correo electrónico a Tintorería Mimos Navia, S.L.
                  </label>
                </div>
                {errorPrivacidad && (
                  <p role="alert" className="text-xs font-bold text-red-600 mt-1.5">
                    {errorPrivacidad}
                  </p>
                )}
              </div>

              {/* Botón de envío en 2 pasos */}
              {!solicitudPreparada ? (
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 min-h-[48px] bg-[#0F76BB] hover:bg-[#0B5C94] text-white font-bold text-base px-8 py-3.5 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <FileText className="w-5 h-5" aria-hidden="true" />
                    <span>Preparar solicitud</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-5 py-3.5 rounded-xl transition-colors cursor-pointer group"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#147A3E] group-hover:text-white" />
                        <span>Mensaje copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#0C65A1] group-hover:text-white" />
                        <span>Copiar datos</span>
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-[#EDF5FD] border border-[#0F76BB]/25 flex flex-col sm:flex-row flex-wrap gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackWhatsAppClick(
                        typeof window !== 'undefined' ? window.location.pathname : '/se-punto-colaborador',
                        'collaborator_form'
                      )
                    }
                    className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#25B860] text-[#002147] font-bold text-sm py-3 px-4 rounded-xl transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Enviar solicitud por WhatsApp a Mimo</span>
                  </a>
                  <a
                    href={collaboratorMailtoHref}
                    className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-white/95 border border-[#002147] hover:bg-[#002147] text-[#002147] hover:text-white font-bold text-sm py-3 px-4 rounded-xl transition-colors"
                  >
                    <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Enviar por Email</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyMessage}
                    className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-[#0F76BB] text-[#002147] font-bold text-sm py-3 px-4 rounded-xl transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#147A3E]" />
                        <span>Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#0C65A1]" />
                        <span>Copiar datos</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Sección: Preguntas frecuentes para Colaboradores */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#0C65A1] font-bold mb-3">
            <HelpCircle className="w-4 h-4" aria-hidden="true" />
            <span>DUDAS HABITUALES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] tracking-tight mb-8">
            Preguntas frecuentes sobre la red de colaboradores
          </h2>

          <div className="space-y-6 divide-y divide-slate-200">
            {faqs.map((faq, idx) => (
              <div key={idx} className={idx > 0 ? 'pt-6' : ''}>
                <h3 className="text-base sm:text-lg font-bold text-[#002147] mb-2">
                  {faq.pregunta}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {faq.respuesta}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
