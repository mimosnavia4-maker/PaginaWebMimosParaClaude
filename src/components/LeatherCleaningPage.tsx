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
  Sparkles,
  Store,
  Truck,
  XCircle,
} from 'lucide-react';
import heroPielesImg from '../assets/images/limpieza_pieles_taller_1794589256487.jpg';
import texturasPielImg from '../assets/images/tipos_piel_texturas_1794589256117.jpg';
import {
  SERVICIO_PIELES_DATA,
  TIENDAS_PROPIAS,
  ZONAS_SERVICIO,
  CONTACT_INFO,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackWhatsAppClick, trackPhoneClick } from '../utils/analytics';

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
  const [heroImgError, setHeroImgError] = useState(false);
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
      className="focus:outline-hidden bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800"
    >
      {/* 1. CABECERA ESPECIALIZADA */}
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
              <li className="text-[#60B5F6] font-bold">Limpieza de pieles y cuero</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
              <p className="text-xs font-mono uppercase tracking-wider text-[#60B5F6] font-bold">
                Servicio 06 · Tintorería Mimos Navia (Vigo)
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] text-balance">
                {SERVICIO_PIELES_DATA.h1}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                {SERVICIO_PIELES_DATA.subtituloCabecera}
              </p>

              <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-slate-100 leading-relaxed">
                {SERVICIO_PIELES_DATA.aclaracionServicio}
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick(SERVICIO_PIELES_DATA.url, 'service_detail', {
                      service_id: 'pieles-y-cuero',
                    })
                  }
                  className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-colors text-center sm:whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Consultar prenda con Mimo</span>
                </a>

                <a
                  href="#presupuestar-piel"
                  className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white font-bold text-sm sm:text-base px-5 py-4 rounded-xl transition-colors text-center sm:whitespace-nowrap shrink-0"
                >
                  <Camera className="w-4 h-4 text-[#60B5F6] shrink-0" aria-hidden="true" />
                  <span>Preparar consulta por foto</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col">
              <figure className="h-full rounded-2xl overflow-hidden border border-white/15 bg-[#071936] flex flex-col">
                {heroImgError ? (
                  <div className="aspect-4/3 lg:flex-1 bg-gradient-to-br from-[#071936] to-[#0b274f] flex flex-col items-center justify-center p-6 text-center text-slate-300">
                    <Sparkles className="w-10 h-10 text-[#60B5F6] mb-3" aria-hidden="true" />
                    <p className="font-bold text-white text-sm">
                      Limpieza especializada de pieles, cuero y ante
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      Revisión previa individualizada en Tintorería Mimos Vigo
                    </p>
                  </div>
                ) : (
                  <img
                    src={heroPielesImg}
                    alt="Revisión profesional de cazadoras de ante y cuero napa en taller especializado de tintorería"
                    width={800}
                    height={600}
                    fetchPriority="high"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgError(true)}
                    className="w-full aspect-4/3 lg:flex-1 object-cover"
                  />
                )}
                <figcaption className="p-4 text-xs text-slate-300 border-t border-white/10">
                  Inspección previa de curtido, elasticidad, costuras y solidez del color antes de definir el tratamiento.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUÉ TIPO DE PIEL TRATAMOS */}
      <section className="py-14 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start mb-10">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Identifica tu prenda
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                ¿Qué tipos de pieles y acabados tratamos?
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Aunque a simple vista dos cazadoras puedan parecer similares, el comportamiento frente al agua, las manchas y los productos de limpieza cambia por completo según si se ha trabajado el <strong>lado flor</strong> (cara exterior, más compacta) o el <strong>lado carne</strong> (cara interior afelpada).
              </p>
            </div>

            <div className="lg:col-span-5">
              <figure className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324]">
                {texturesImgError ? (
                  <div className="aspect-4/3 bg-slate-100 dark:bg-[#0b1d36] flex items-center justify-center p-6 text-center text-xs text-slate-600 dark:text-slate-300">
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
                    className="w-full aspect-4/3 object-cover"
                  />
                )}
                <figcaption className="px-4 py-3 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800">
                  De izquierda a derecha: cuero napa liso (lado flor), ante (lado carne) y nobuk (lado flor pulido).
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICIO_PIELES_DATA.tiposPieles.map((piel) => (
              <article
                key={piel.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-mono text-[#0F76BB] dark:text-[#60B5F6] font-bold mb-1.5">
                    {piel.grupo}
                  </p>
                  <h3 className="text-lg font-extrabold text-[#002147] dark:text-white mb-2">
                    {piel.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {piel.descripcion}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ADVERTENCIA PREVENTIVA: PIEL NATURAL VS SINTÉTICOS, RECONSTITUIDO Y CHAROL */}
      <section className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8 space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
              Importante antes de entregar tu prenda
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
              Piel natural frente a polipiel, skay, cuero reconstituido y charol
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Muchas prendas «efecto piel» no son cuero curtido sino recubrimientos sintéticos o laminados barnizados. Revisamos siempre la etiqueta y el estado del material antes de aceptar la prenda porque no admiten los mismos disolventes ni reengrases que la piel auténtica.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-[#0b1d36]">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#002147] text-white text-xs uppercase tracking-wider">
                    <th className="py-3.5 px-5 font-bold">Material</th>
                    <th className="py-3.5 px-5 font-bold">Cómo identificarlo</th>
                    <th className="py-3.5 px-5 font-bold">Cuidado adecuado</th>
                    <th className="py-3.5 px-5 font-bold">Riesgo principal si está envejecido</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {SERVICIO_PIELES_DATA.comparativaSinteticos.map((fila) => (
                    <tr
                      key={fila.material}
                      className="bg-white dark:bg-[#071324] align-top"
                    >
                      <td className="py-4 px-5 font-extrabold text-[#002147] dark:text-white whitespace-nowrap">
                        {fila.material}
                      </td>
                      <td className="py-4 px-5 text-slate-600 dark:text-slate-300 leading-relaxed">
                        {fila.identificacion}
                      </td>
                      <td className="py-4 px-5 text-slate-600 dark:text-slate-300 leading-relaxed">
                        {fila.comportamiento}
                      </td>
                      <td className="py-4 px-5 text-slate-700 dark:text-slate-200 leading-relaxed">
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

      {/* 4. POR QUÉ LIMPIAR PIEL NO ES UN LAVADO NORMAL (5 FASES) */}
      <section className="py-14 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
              Protocolo técnico en 5 fases
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
              Por qué limpiar una prenda de piel es distinto a una colada textil
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Una prenda de piel no solo se limpia: necesita recuperar sus aceites, equilibrar su acabado y secarse sin calor agresivo para conservar la caída original.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {SERVICIO_PIELES_DATA.fasesProceso.map((fase) => (
              <article
                key={fase.num}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 flex flex-col"
              >
                <span className="text-xs font-mono tabular-nums font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  Fase {fase.num}
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-[#002147] dark:text-white mt-1.5 mb-2.5">
                  {fase.titulo}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {fase.descripcion}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRANSPARENCIA TÉCNICA, PLAZOS Y RESGUARDO (RD 1453/1987) */}
      <section className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Columna izquierda: Riesgos inherentes del cuero */}
            <div className="lg:col-span-6 space-y-5">
              <div>
                <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                  Expectativas reales y transparencia
                </p>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                  Factores previos que condicionan el resultado en la piel
                </h2>
              </div>

              <div className="space-y-3.5">
                {SERVICIO_PIELES_DATA.riesgosInherentes.map((riesgo) => (
                  <div
                    key={riesgo.titulo}
                    className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36]"
                  >
                    <h3 className="text-base font-extrabold text-[#002147] dark:text-white mb-1 flex items-center gap-2">
                      <AlertTriangle
                        className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0"
                        aria-hidden="true"
                      />
                      <span>{riesgo.titulo}</span>
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                      {riesgo.detalle}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Columna derecha: Plazos, resguardo RD 1453/1987 y tiendas */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 text-[#0F76BB] dark:text-[#60B5F6]">
                  <FileCheck2 className="w-5 h-5" aria-hidden="true" />
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white">
                    Plazos, valoración y garantías de tu resguardo
                  </h2>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Al entregar una prenda de piel nos regimos por criterios técnicos claros y por la normativa española del sector (<strong>Real Decreto 1453/1987</strong>):
                </p>

                <ul className="space-y-3 text-sm text-slate-700 dark:text-slate-200">
                  {SERVICIO_PIELES_DATA.garantiasResguardo.map((garantia) => (
                    <li key={garantia} className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-1"
                        aria-hidden="true"
                      />
                      <span>{garantia}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0b1d36] p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#002147] dark:text-white">
                  <Store className="w-5 h-5 text-[#0F76BB]" aria-hidden="true" />
                  <h3 className="text-base sm:text-lg font-extrabold">
                    Recepción en nuestras {TIENDAS_PROPIAS.length} tiendas en Vigo, puntos colaboradores o a domicilio
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Puedes entregar tu prenda personalmente en nuestras tiendas o puntos para revisarla juntos, o consultar con Mimo la recogida y entrega a domicilio (servicio sujeto a importe mínimo a consultar según zona).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {TIENDAS_PROPIAS.map((t) => (
                    <div
                      key={t.id}
                      className="p-3 rounded-lg bg-slate-50 dark:bg-[#071324] border border-slate-200/80 dark:border-slate-800"
                    >
                      <p className="font-bold text-[#002147] dark:text-white">
                        {t.nombre_mostrado}
                      </p>
                      <p className="text-slate-600 dark:text-slate-300 mt-0.5">
                        {t.direccion}
                      </p>
                      <p className="text-slate-500 mt-0.5">{t.horario.resumen}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CUIDADOS EN CASA Y MITOS A EVITAR */}
      <section className="py-14 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 space-y-2">
            <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
              Conservación entre temporadas
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
              Cómo cuidar tu prenda de piel en casa y qué remedios caseros evitar
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-8">
              <h3 className="text-lg font-extrabold text-[#002147] dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#178A47]" aria-hidden="true" />
                <span>Buenas prácticas recomendadas</span>
              </h3>
              <ul className="space-y-3.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                {SERVICIO_PIELES_DATA.consejosCasa.map((consejo) => (
                  <li key={consejo} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6] shrink-0 mt-1"
                      aria-hidden="true"
                    />
                    <span>{consejo}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-8">
              <h3 className="text-lg font-extrabold text-[#002147] dark:text-white mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                <span>Mitos frecuentes que dañan la piel</span>
              </h3>
              <div className="space-y-4">
                {SERVICIO_PIELES_DATA.mitosEvitar.map((mito) => (
                  <div
                    key={mito.practica}
                    className="pb-3.5 last:pb-0 border-b last:border-b-0 border-slate-100 dark:border-slate-800"
                  >
                    <p className="text-sm font-extrabold text-[#002147] dark:text-white flex items-start gap-2">
                      <XCircle
                        className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{mito.practica}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-6 mt-1">
                      {mito.motivo}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PREPARADOR DE CONSULTA POR WHATSAPP CON MIMO */}
      <section
        id="presupuestar-piel"
        className="py-16 lg:py-20 bg-[#002147] text-white border-b border-white/10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-xs font-mono uppercase tracking-wider text-[#60B5F6] font-bold mb-2">
              Valoración directa por WhatsApp · {CONTACT_INFO.whatsappNumber}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3 text-balance">
              Consulta tu prenda de piel o cuero con Mimo
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Los enlaces de WhatsApp solo envían texto y no adjuntan imágenes de forma automática: prepara aquí los datos de tu prenda y, una vez abierto el chat con <strong>Mimo</strong>, envíanos fotos generales, de la etiqueta (si conserva) y de las zonas a tratar para darte una primera orientación antes de traerla.
            </p>
          </div>

          <div className="rounded-2xl bg-white text-slate-900 dark:bg-[#0b1d36] dark:text-white p-6 sm:p-8 shadow-xl space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="piel-prenda"
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Tipo de prenda
                </label>
                <select
                  id="piel-prenda"
                  value={tipoPrenda}
                  onChange={(e) => setTipoPrenda(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm font-medium focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                >
                  <option value="Cazadora o chaqueta">Cazadora o chaqueta</option>
                  <option value="Abrigo largo o chaquetón">Abrigo largo o chaquetón</option>
                  <option value="Falda o pantalón">Falda o pantalón</option>
                  <option value="Prenda mixta (tejido + piel)">Prenda mixta (tejido + piel)</option>
                  <option value="Abrigo o cuello de peletería">Abrigo o cuello de peletería</option>
                  <option value="Otra pieza de piel">Otra pieza de piel</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="piel-material"
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Tipo de piel o material
                </label>
                <select
                  id="piel-material"
                  value={tipoPiel}
                  onChange={(e) => setTipoPiel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm font-medium focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Localidad
                </label>
                <select
                  id="piel-localidad"
                  value={localidad}
                  onChange={(e) => setLocalidad(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm font-medium focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Cómo prefieres entregarla
                </label>
                <select
                  id="piel-modalidad"
                  value={modalidadEntrega}
                  onChange={(e) => setModalidadEntrega(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Manchas, roces o detalles previos (opcional)
                </label>
                <input
                  id="piel-obs"
                  type="text"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Ej.: Rozadura en puños y mancha de lluvia en manga."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
                className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base py-4 px-6 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Enviar consulta a Mimo por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-600 px-4 py-3.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer hover:border-[#0F76BB] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#178A47]" aria-hidden="true" />
                    <span>Texto copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span>Copiar texto</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              El presupuesto cerrado y el plazo estimado se confirman tras revisar la prenda físicamente y quedan reflejados en el resguardo.
            </p>
          </div>
        </div>
      </section>

      {/* 8. PREGUNTAS FRECUENTES */}
      <section className="py-14 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 space-y-1">
            <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
              Dudas habituales antes de limpiar tu prenda
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
              Preguntas frecuentes sobre limpieza de pieles y cuero en Vigo
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICIO_PIELES_DATA.preguntasFrecuentes.map((faq) => (
              <details
                key={faq.pregunta}
                className="group rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-5"
              >
                <summary className="font-extrabold text-[#002147] dark:text-white cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base">
                  <span>{faq.pregunta}</span>
                  <span className="text-[#0F76BB] font-mono text-lg group-open:rotate-45 transition-transform shrink-0">
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

      {/* 9. ENLACES RELACIONADOS Y LLAMADA FINAL */}
      <section className="py-14 bg-white dark:bg-[#071324]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-6">
            Otros servicios especializados de Tintorería Mimos en Vigo
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {SERVICIO_PIELES_DATA.enlacesRelacionados.map((rel) => (
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
                onClick={() =>
                  trackWhatsAppClick(SERVICIO_PIELES_DATA.url, 'service_detail_footer', {
                    service_id: 'pieles-y-cuero',
                  })
                }
                className="inline-flex items-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Consultar prenda con Mimo</span>
              </a>
              <a
                href={CONTACT_INFO.phoneHref}
                onClick={() => trackPhoneClick(SERVICIO_PIELES_DATA.url, 'service_detail')}
                className="inline-flex items-center gap-2 border border-slate-300 dark:border-slate-700 text-[#002147] dark:text-white font-bold text-sm px-4 py-3 rounded-xl hover:border-[#0F76BB] transition-colors"
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
