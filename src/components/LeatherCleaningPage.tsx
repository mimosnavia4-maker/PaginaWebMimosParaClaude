import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  AlertTriangle,
  Camera,
  Check,
  CheckCircle2,
  Copy,
  FileCheck2,
  MessageCircle,
  Phone,
  ShieldAlert,
  Store,
  XCircle,
} from 'lucide-react';
import heroPielesImg from '../assets/images/limpieza_pieles_taller_1794589256487.webp';
import texturasPielImg from '../assets/images/tipos_piel_texturas_1794589256117.webp';
import { SERVICIO_PIELES_DATA } from '../data/servicePagesData';
import {
  TIENDAS_PROPIAS,
  ZONAS_SERVICIO,
  CONTACT_INFO,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackWhatsAppClick, trackPhoneClick } from '../utils/analytics';
import { PageHeroLight } from './PageHeroLight';

interface LeatherCleaningPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const LeatherCleaningPage: React.FC<LeatherCleaningPageProps> = ({
  onNavigate,
}) => {
  const [tipoPrenda, setTipoPrenda] = useState('Cazadora o chaqueta');
  const [tipoPiel, setTipoPiel] = useState('No estoy seguro / Prefiero enviar foto');
  const [localidad, setLocalidad] = useState('Vigo');
  const [modalidadEntrega, setModalidadEntrega] = useState(
    'Llevarla a una tienda propia Mimos en Vigo'
  );
  const [observaciones, setObservaciones] = useState('');
  const [copied, setCopied] = useState(false);
  const [texturesImgError, setTexturesImgError] = useState(false);

  const buildLeatherWhatsAppMessage = () => {
    const lines = [
      'Hola, Mimo. Quiero consultar la limpieza de una prenda de piel o cuero.',
      `Prenda: ${tipoPrenda}`,
      `Tipo de piel / material: ${tipoPiel}`,
      `Localidad: ${localidad}`,
      `Entrega / recogida preferida: ${modalidadEntrega}`,
    ];
    if (observaciones.trim()) {
      lines.push(`Manchas, roces o detalles previos: ${observaciones.trim()}`);
    }
    lines.push(
      'En cuanto abramos el chat te envío fotos de la prenda (y de la etiqueta si la conserva) para que podáis valorarla.'
    );
    return lines.join('\n');
  };

  const whatsappUrl = buildMimoWhatsAppUrl(buildLeatherWhatsAppMessage());

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildLeatherWhatsAppMessage());
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
          { label: 'Limpieza de pieles y cuero' },
        ]}
        onNavigate={onNavigate}
        kicker="Tintorería Mimos Navia (Vigo) · Limpieza y tratamiento técnico de piel natural"
        title={SERVICIO_PIELES_DATA.h1}
        description={SERVICIO_PIELES_DATA.subtituloCabecera}
        note={SERVICIO_PIELES_DATA.aclaracionServicio}
        whatsappHref={whatsappUrl}
        whatsappLabel="Consultar prenda con Mimo"
        onWhatsAppClick={() =>
          trackWhatsAppClick(SERVICIO_PIELES_DATA.url, 'service_detail', {
            service_id: 'pieles-y-cuero',
          })
        }
        secondaryAction={{
          label: 'Preparar consulta por foto',
          href: '#presupuestar-piel',
          icon: <Camera className="w-4 h-4 shrink-0" aria-hidden="true" />,
          isInternalRoute: false,
        }}
        image={{
          src: heroPielesImg,
          alt: 'Revisión profesional de cazadoras de ante y cuero napa en taller especializado de tintorería',
          caption:
            'Inspección previa de curtido, elasticidad, costuras y solidez del color antes de definir el tratamiento.',
          fallbackTitle: 'Limpieza especializada de pieles, cuero y ante',
          fallbackSubtitle: 'Revisión previa individualizada en Tintorería Mimos Vigo',
        }}
      />

      {/* 2. QUÉ TIPO DE PIEL TRATAMOS (#F7F6F2) */}
      <section className="py-14 lg:py-20 bg-[#F7F6F2] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-10">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-xs sm:text-sm font-bold text-[#0F76BB]">
                Identifica tu prenda
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                ¿Qué tipos de pieles y acabados tratamos?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Aunque a simple vista dos cazadoras puedan parecer similares, el comportamiento frente al agua, las manchas y los productos de limpieza cambia por completo según si se ha trabajado el <strong>lado flor</strong> (cara exterior, más compacta) o el <strong>lado carne</strong> (cara interior afelpada).
              </p>
            </div>

            <div className="lg:col-span-5">
              <figure className="rounded-sm overflow-hidden border border-slate-200 bg-white">
                {texturesImgError ? (
                  <div className="aspect-[4/3] bg-[#EDF5FD] flex items-center justify-center p-6 text-center text-xs text-slate-700 font-semibold">
                    Comparativa visual de napa lisa, ante afelpado y nobuk esmerilado
                  </div>
                ) : (
                  <img
                    src={texturasPielImg}
                    alt="Comparativa de texturas entre cuero napa liso, ante aterciopelado y nobuk de grano fino"
                    width={800}
                    height={600}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setTexturesImgError(true)}
                    className="w-full aspect-[4/3] object-cover"
                  />
                )}
                <figcaption className="px-4 py-3 text-xs text-slate-600 border-t border-slate-100">
                  De izquierda a derecha: cuero napa liso (lado flor), ante (lado carne) y nobuk (lado flor pulido).
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICIO_PIELES_DATA.tiposPieles.map((piel) => (
              <article
                key={piel.id}
                className="rounded-sm border border-slate-200 bg-white p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-mono text-[#0F76BB] font-bold mb-1.5">
                    {piel.grupo}
                  </p>
                  <h3 className="text-lg font-extrabold text-[#002147] mb-2">
                    {piel.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {piel.descripcion}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ADVERTENCIA PREVENTIVA: PIEL NATURAL VS SINTÉTICOS, RECONSTITUIDO Y CHAROL (Blanco) */}
      <section className="py-14 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 space-y-2">
            <p className="text-xs sm:text-sm font-bold text-[#0F76BB]">
              Importante antes de entregar tu prenda
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
              Piel natural frente a polipiel, skay, cuero reconstituido y charol
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Muchas prendas «efecto piel» no son cuero curtido sino recubrimientos sintéticos o laminados barnizados. Revisamos siempre la etiqueta y el estado del material antes de aceptar la prenda porque no admiten los mismos disolventes ni reengrases que la piel auténtica.
            </p>
          </div>

          <div className="rounded-sm border border-slate-200 overflow-hidden bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#EDF5FD] text-[#002147] border-b border-slate-200 text-xs uppercase tracking-wider">
                    <th className="py-3.5 px-5 font-extrabold">Material</th>
                    <th className="py-3.5 px-5 font-extrabold">Cómo identificarlo</th>
                    <th className="py-3.5 px-5 font-extrabold">Cuidado adecuado</th>
                    <th className="py-3.5 px-5 font-extrabold">Riesgo principal si está envejecido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {SERVICIO_PIELES_DATA.comparativaSinteticos.map((fila) => (
                    <tr key={fila.material} className="bg-white align-top">
                      <td className="py-4 px-5 font-extrabold text-[#002147] whitespace-nowrap">
                        {fila.material}
                      </td>
                      <td className="py-4 px-5 text-slate-600 leading-relaxed">
                        {fila.identificacion}
                      </td>
                      <td className="py-4 px-5 text-slate-600 leading-relaxed">
                        {fila.comportamiento}
                      </td>
                      <td className="py-4 px-5 text-slate-700 leading-relaxed">
                        {fila.riesgo}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 4. POR QUÉ LIMPIAR PIEL NO ES UN LAVADO NORMAL (5 FASES - #F7F6F2) */}
      <section className="py-14 lg:py-20 bg-[#F7F6F2] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 space-y-2">
            <p className="text-xs sm:text-sm font-bold text-[#0F76BB]">
              Protocolo técnico en 5 fases
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
              Por qué limpiar una prenda de piel es distinto a una colada textil
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Una prenda de piel no solo se limpia: necesita recuperar sus aceites, equilibrar su acabado y secarse sin calor agresivo para conservar la caída original.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {SERVICIO_PIELES_DATA.fasesProceso.map((fase) => (
              <article
                key={fase.num}
                className="rounded-sm border border-slate-200 bg-white p-6 flex flex-col"
              >
                <span className="text-xs font-mono tabular-nums font-bold text-[#0F76BB]">
                  Fase {fase.num}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-[#002147] mt-1.5 mb-2.5">
                  {fase.titulo}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {fase.descripcion}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRANSPARENCIA TÉCNICA, PLAZOS Y RESGUARDO (RD 1453/1987) (Blanco) */}
      <section className="py-14 lg:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Columna izquierda: Riesgos inherentes del cuero */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <p className="text-xs sm:text-sm font-bold text-[#0F76BB] mb-1">
                  Expectativas reales y transparencia
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                  Factores previos que condicionan el resultado en la piel
                </h2>
              </div>

              <div className="space-y-3.5">
                {SERVICIO_PIELES_DATA.riesgosInherentes.map((riesgo) => (
                  <div
                    key={riesgo.titulo}
                    className="p-5 rounded-sm border border-slate-200 bg-[#F7F6F2]/70"
                  >
                    <h3 className="text-base font-extrabold text-[#002147] mb-1 flex items-center gap-2">
                      <AlertTriangle
                        className="w-4 h-4 text-amber-600 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{riesgo.titulo}</span>
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed pl-6">
                      {riesgo.detalle}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna derecha: Plazos, resguardo RD 1453/1987 y tiendas */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-sm border border-[#0F76BB]/25 border-l-4 border-l-[#0F76BB] bg-[#EDF5FD] p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-[#0F76BB]">
                  <FileCheck2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                    Plazos, valoración y garantías de tu resguardo
                  </h2>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  Al entregar una prenda de piel nos regimos por criterios técnicos claros y por la normativa española del sector (<strong>Real Decreto 1453/1987</strong>):
                </p>

                <ul className="space-y-3 text-sm text-slate-700">
                  {SERVICIO_PIELES_DATA.garantiasResguardo.map((garantia) => (
                    <li key={garantia} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 text-[#0F76BB] shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span>{garantia}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-sm border border-slate-200 bg-white p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#002147]">
                  <Store className="w-5 h-5 text-[#0F76BB] shrink-0" aria-hidden="true" />
                  <h3 className="text-base sm:text-lg font-extrabold">
                    Recepción en nuestras {TIENDAS_PROPIAS.length} tiendas propias de Vigo, nuestros 5 puntos colaboradores o a domicilio
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Recibimos tus prendas de piel, ante y cuero tanto en nuestras {TIENDAS_PROPIAS.length} tiendas propias de Vigo (Navia, Gregorio Espino y Rúa Venezuela) como en cualquiera de nuestros 5 puntos colaboradores (D'Passo, Redondela, Gondomar, Ponteareas y O Porriño), o puedes consultar recogida a domicilio con Mimo según zona e importe mínimo.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
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
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUIDADOS EN CASA Y MITOS A EVITAR (#F7F6F2) */}
      <section className="py-14 lg:py-20 bg-[#F7F6F2] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 space-y-2">
            <p className="text-xs sm:text-sm font-bold text-[#0F76BB]">
              Conservación entre temporadas
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
              Cómo cuidar tu prenda de piel en casa y qué remedios caseros evitar
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 rounded-sm border border-slate-200 bg-white p-6 sm:p-8">
              <h3 className="text-lg font-extrabold text-[#002147] mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#178A47] shrink-0" aria-hidden="true" />
                <span>Buenas prácticas recomendadas</span>
              </h3>
              <ul className="space-y-3.5 text-sm text-slate-700 leading-relaxed">
                {SERVICIO_PIELES_DATA.consejosCasa.map((consejo) => (
                  <li key={consejo} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#0F76BB] shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <span>{consejo}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 rounded-sm border border-slate-200 bg-white p-6 sm:p-8">
              <h3 className="text-lg font-extrabold text-[#002147] mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" aria-hidden="true" />
                <span>Mitos frecuentes que dañan la piel</span>
              </h3>
              <div className="space-y-4">
                {SERVICIO_PIELES_DATA.mitosEvitar.map((mito) => (
                  <div
                    key={mito.practica}
                    className="pb-3.5 last:pb-0 border-b last:border-b-0 border-slate-200"
                  >
                    <p className="text-sm font-extrabold text-[#002147] flex items-start gap-2">
                      <XCircle
                        className="w-4 h-4 text-rose-600 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{mito.practica}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6 mt-1">
                      {mito.motivo}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PREPARADOR DE CONSULTA POR WHATSAPP CON MIMO (#EDF5FD) */}
      <section
        id="presupuestar-piel"
        className="py-16 lg:py-20 bg-[#EDF5FD] text-[#002147] border-b border-slate-200"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-xs sm:text-sm font-bold text-[#0F76BB] mb-2">
              Valoración directa por WhatsApp · {CONTACT_INFO.whatsappNumber}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] tracking-tight mb-3 text-balance">
              Consulta tu prenda de piel o cuero con Mimo
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Los enlaces de WhatsApp solo envían texto y no adjuntan imágenes de forma automática: prepara aquí los datos de tu prenda y, una vez abierto el chat con <strong>Mimo</strong>, envíanos fotos generales, de la etiqueta (si conserva) y de las zonas a tratar para darte una primera orientación antes de traerla.
            </p>
          </div>

          <div className="rounded-sm bg-white border border-slate-200 text-slate-900 p-6 sm:p-8 shadow-xs space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="piel-prenda"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Tipo de prenda
                </label>
                <select
                  id="piel-prenda"
                  value={tipoPrenda}
                  onChange={(e) => setTipoPrenda(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                >
                  <option value="Cazadora o chaqueta">Cazadora o chaqueta</option>
                  <option value="Abrigo largo o chaquetón">Abrigo largo o chaquetón</option>
                  <option value="Falda o pantalón">Falda o pantalón</option>
                  <option value="Prenda mixta (tejido + piel)">
                    Prenda mixta (tejido + piel)
                  </option>
                  <option value="Abrigo o cuello de peletería">
                    Abrigo o cuello de peletería
                  </option>
                  <option value="Otra pieza de piel">Otra pieza de piel</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="piel-material"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Tipo de piel o material
                </label>
                <select
                  id="piel-material"
                  value={tipoPiel}
                  onChange={(e) => setTipoPiel(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                >
                  <option value="No estoy seguro / Prefiero enviar foto">
                    No estoy seguro / Prefiero enviar foto
                  </option>
                  <option value="Cuero liso o napa">Cuero liso o napa</option>
                  <option value="Ante (gamuza) o serraje">Ante (gamuza) o serraje</option>
                  <option value="Nobuk">Nobuk</option>
                  <option value="Doble faz / Napalán">Doble faz / Napalán</option>
                  <option value="Polipiel / Skay / Charol">Polipiel / Skay / Charol</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="piel-localidad"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Localidad
                </label>
                <select
                  id="piel-localidad"
                  value={localidad}
                  onChange={(e) => setLocalidad(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                >
                  {ZONAS_SERVICIO.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                  <option value="Otra localidad cercana a Vigo">
                    Otra localidad cercana a Vigo
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="piel-modalidad"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Cómo prefieres entregarla
                </label>
                <select
                  id="piel-modalidad"
                  value={modalidadEntrega}
                  onChange={(e) => setModalidadEntrega(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                >
                  <option value="Llevarla a una tienda propia Mimos en Vigo">
                    Llevarla a una tienda propia Mimos en Vigo
                  </option>
                  <option value="Depositarla en un punto colaborador de la comarca">
                    Depositarla en un punto colaborador de la comarca
                  </option>
                  <option value="Consultar recogida a domicilio (importe mínimo a consultar)">
                    Consultar recogida a domicilio (importe mínimo a consultar)
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="piel-obs"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Manchas, roces o detalles previos (opcional)
                </label>
                <input
                  id="piel-obs"
                  type="text"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Ej.: Rozadura en puños y mancha de lluvia en manga."
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackWhatsAppClick(SERVICIO_PIELES_DATA.url, 'service_detail_secondary', {
                    service_id: 'pieles-y-cuero',
                  })
                }
                className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2.5 bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm sm:text-base py-3 px-6 rounded-lg transition-colors shadow-xs"
              >
                <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                <span>Enviar consulta a Mimo por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="min-h-[48px] inline-flex items-center justify-center gap-1.5 border border-[#002147] bg-white hover:bg-[#002147] hover:text-white px-4 py-3 rounded-lg text-xs font-bold text-[#002147] cursor-pointer transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#1FA855]" aria-hidden="true" />
                    <span>Texto copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Copiar texto</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-500 text-center">
              El presupuesto cerrado y el plazo estimado se confirman tras revisar la prenda físicamente y quedan reflejados en el resguardo.
            </p>
          </div>
        </div>
      </section>

      {/* 8. PREGUNTAS FRECUENTES (#F7F6F2) */}
      <section className="py-14 lg:py-20 bg-[#F7F6F2] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 space-y-1">
            <p className="text-xs sm:text-sm font-bold text-[#0F76BB]">
              Dudas habituales antes de limpiar tu prenda
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
              Preguntas frecuentes sobre limpieza de pieles y cuero en Vigo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICIO_PIELES_DATA.preguntasFrecuentes.map((faq) => (
              <details
                key={faq.pregunta}
                className="group rounded-sm border border-slate-200 bg-white p-5"
              >
                <summary className="min-h-[44px] font-extrabold text-[#002147] cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base">
                  <span>{faq.pregunta}</span>
                  <span className="text-[#0F76BB] font-mono text-lg group-open:rotate-45 transition-transform shrink-0">
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
            Otros servicios especializados de Tintorería Mimos en Vigo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {SERVICIO_PIELES_DATA.enlacesRelacionados.map((rel) => (
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
                    <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
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
                  trackWhatsAppClick(SERVICIO_PIELES_DATA.url, 'service_detail_footer', {
                    service_id: 'pieles-y-cuero',
                  })
                }
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm px-5 py-3 rounded-lg transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Consultar prenda con Mimo</span>
              </a>
              <a
                href={CONTACT_INFO.phoneHref}
                onClick={() => trackPhoneClick(SERVICIO_PIELES_DATA.url, 'service_detail')}
                className="min-h-[48px] inline-flex items-center justify-center gap-2 bg-white border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-4 py-3 rounded-lg transition-colors group"
              >
                <Phone
                  className="w-4 h-4 text-[#0F76BB] group-hover:text-white shrink-0"
                  aria-hidden="true"
                />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
