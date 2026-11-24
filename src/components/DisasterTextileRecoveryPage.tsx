import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Camera,
  Check,
  CheckCircle2,
  ClipboardList,
  Clock,
  CloudRain,
  Copy,
  Download,
  Droplets,
  FileCheck2,
  FileSpreadsheet,
  FileText,
  Flame,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Plus,
  ShieldCheck,
  Store,
  Trash2,
  Truck,
  XCircle,
} from 'lucide-react';
import { SERVICIO_SINIESTROS_FAQS } from '../data/servicePagesData';
import {
  CONTACT_INFO,
  IMAGES,
  PUNTOS_COLABORADORES,
  TIENDAS_PROPIAS,
  ZONAS_RESUMEN,
  ZONAS_SERVICIO,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';
import { exportInventarioExcel, exportInventarioPdf } from '../utils/inventoryExport';
import { PageHeroLight } from './PageHeroLight';

interface DisasterTextileRecoveryPageProps {
  onNavigate: (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => void;
}

type ResiduoKey = 'pvc' | 'cocina' | 'celulosa';

interface ResiduoInfo {
  id: ResiduoKey;
  titulo: string;
  subtitulo: string;
  ventanaCritica: string;
  quimica: string;
  impactoFibras: string;
  secuenciaMimos: string;
  prohibicionClave: string;
}

const RESIDUOS_INCENDIO: Record<ResiduoKey, ResiduoInfo> = {
  pvc: {
    id: 'pvc',
    titulo: 'Eléctrico / Plásticos y PVC',
    subtitulo: 'Humo húmedo denso de combustión lenta (Wet Smoke)',
    ventanaCritica: '24–48 h (máxima urgencia corrosiva)',
    quimica:
      'La combustión de cables, aislantes y PVC libera ácido clorhídrico (HCl) y depósitos pegajosos submicrométricos que migran por termoforesis hasta armarios cerrados.',
    impactoFibras:
      'La acidez debilita la celulosa (algodón y lino) y ataca directamente lana, seda y pieles al disociarse con la humedad. En poliéster, el calor puede fundir o fijar el olor superficial.',
    secuenciaMimos:
      'Triaje rápido → aspiración mecánica en seco inicial → desengrase y neutralización química ácida → Dry Cleaning o Wet Cleaning controlado y oxígeno activo.',
    prohibicionClave:
      'No frotar ni aplicar agua directamente: el depósito untuoso se embadurna y el HCl acelera la hidrólisis.',
  },
  cocina: {
    id: 'cocina',
    titulo: 'Cocina / Aceites y proteínas',
    subtitulo: 'Aerosoles proteicos y grasa aerosolizada',
    ventanaCritica: 'Olor acre agresivo en 24 h',
    quimica:
      'Combustión orgánica y alimentaria que deja aerosoles casi invisibles pero con olor muy penetrante y carga grasa adherida a fibras próximas o corrientes de aire.',
    impactoFibras:
      'Lana, cachemir y terciopelo atrapan grasas en su pelo poroso; poliéster y poliamida retienen aceite y fijan la mancha si se lavan por encima de 40 °C. Cortinajes actúan como esponja.',
    secuenciaMimos:
      'Desengrase lipofílico controlado (sin álcalis agresivos sobre lana o seda) → Wet Cleaning por debajo de 40 °C en sintéticos → neutralización molecular con oxígeno activo.',
    prohibicionClave:
      'Nunca limpiar en seco primero ni lavar poliéster en caliente (>40 °C): ambos errores fijan el residuo proteico y graso.',
  },
  celulosa: {
    id: 'celulosa',
    titulo: 'Madera / Papel / Celulosa',
    subtitulo: 'Hollín seco pulverulento de combustión rápida (Dry Smoke)',
    ventanaCritica: '5–7 días si se actúa en seco pronto',
    quimica:
      'Partículas finas de carbono negro (<1 µm) con menor acidez que el PVC, pero con altísima capacidad de tinción si entran en contacto prematuro con humedad.',
    impactoFibras:
      'Manchado oscuro en pliegues de algodón y lino; cerco y sangrado en seda o viscosa. Los edredones y almohadas de pluma o espuma muy impregnados rara vez recuperan la neutralidad olfativa.',
    secuenciaMimos:
      'Aspiración mecánica en seco obligatoria antes de cualquier líquido → Dry Cleaning en circuito cerrado (sedas/lanas) o Wet Cleaning con oxígeno activo en celulósicas.',
    prohibicionClave:
      'No meter nunca en la lavadora ni sacudir cortinas: el agua transforma el polvo de carbono en pasta indeleble y sacudir dispersa hollín por toda la vivienda.',
  },
};

interface WaterCategoryRow {
  categoria: string;
  origenVigo: string;
  riesgoBiologico: string;
  dictamen: string;
  estado: 'Recuperable' | 'Bajo condición técnica' | 'Pérdida total obligatoria';
}

const CATEGORIAS_AGUA_VIGO: WaterCategoryRow[] = [
  {
    categoria: 'Categoría 1 · Agua limpia',
    origenVigo:
      'Rotura de tubería sanitaria o latiguillo, desbordamiento de lavabo o bañera limpios, filtración directa de lluvia limpia.',
    riesgoBiologico:
      'Sin carga patógena inicial, pero pasa a Categoría 2 si permanece estancada más de 24–48 h en la humedad de Vigo.',
    dictamen:
      'Recuperable si se separa rápido por colores (evita sangrado de tintes), se higieniza en taller y recibe secado técnico controlado.',
    estado: 'Recuperable',
  },
  {
    categoria: 'Categoría 2 · Agua gris / extinción',
    origenVigo:
      'Descarga de lavadora o lavavajillas, agua limpia estancada >48 h o agua de extinción de bomberos mezclada con hollín y químicos.',
    riesgoBiologico:
      'Presencia de microorganismos, restos detergentes o compuestos de combustión que disparan la germinación de moho.',
    dictamen:
      'Higienizable bajo criterio técnico (control de temperatura, tiempo y oxígeno activo). Las prendas delicadas que no toleren higienización pasan a pérdida total.',
    estado: 'Bajo condición técnica',
  },
  {
    categoria: 'Categoría 3 · Agua negra / fecal o moho negro',
    origenVigo:
      'Retornos de alcantarillado o bajantes fecales, inundaciones con arrastre exterior o textiles con moho negro consolidado.',
    riesgoBiologico:
      'Carga severa de patógenos, toxinas y esporas con riesgo sanitario grave por contacto cutáneo o inhalación.',
    dictamen:
      'Pérdida total obligatoria. No se introduce en circuitos de tintorería: emitimos certificado técnico de descarte para reposición del seguro.',
    estado: 'Pérdida total obligatoria',
  },
];

interface TriageRow {
  categoria: string;
  escenario: 'humo' | 'agua';
  afeccion: string;
  viabilidad: string;
  estado: 'Recuperable' | 'Valoración previa' | 'Pérdida total';
  protocolo: string;
}

const MATRIZ_TRIAJE: TriageRow[] = [
  {
    categoria: 'Algodón, lino y ropa diaria',
    escenario: 'humo',
    afeccion: 'Olor a humo, hollín de celulosa o grasa proteica de cocina sin quemadura',
    viabilidad: 'Alta recuperación tras triaje (clave <40 °C en grasa)',
    estado: 'Recuperable',
    protocolo:
      'Aspiración mecánica en seco, desengrase lipofílico adaptado y Wet Cleaning con oxígeno activo (sin termofijar).',
  },
  {
    categoria: 'Trajes, abrigos de paño, lana y seda',
    escenario: 'humo',
    afeccion: 'Humo en armario cerrado o hollín sin ataque térmico ni lavado previo en casa',
    viabilidad: 'Alta en celulosa; crítica en PVC (HCl <48 h)',
    estado: 'Recuperable',
    protocolo:
      'Aspiración en seco sin frotar + Dry Cleaning en circuito cerrado (sin álcalis en lana/seda) y desodorización molecular.',
  },
  {
    categoria: 'Cortinas, visillos, estores y alfombras',
    escenario: 'humo',
    afeccion: 'Acumulación de humo ambiental, COV y polvo pirolítico (sin quemadura)',
    viabilidad: 'Recuperable con maquinaria de gran formato',
    estado: 'Recuperable',
    protocolo:
      'Desempolvado mecánico en seco en nuestras instalaciones para cortinajes o mediante taller especialista colaborador en alfombras, desengrase controlado y verificación sensorial antes de entregar.',
  },
  {
    categoria: 'Textiles empapados (Agua Cat. 1 o Cat. 2)',
    escenario: 'agua',
    afeccion: 'Rotura de tubería o agua de extinción sin moho negro consolidado',
    viabilidad: 'Muy alta si se contiene en 24–48 h',
    estado: 'Recuperable',
    protocolo:
      'Separación inmediata para cortar sangrado de tintes, higienización acuosa o Dry Cleaning y secado técnico controlado.',
  },
  {
    categoria: 'Cuero, ante, nobuk y pluma muy saturada',
    escenario: 'humo',
    afeccion: 'Humo PVC ácido en pieles o impregnación profunda de humo en rellenos orgánicos',
    viabilidad: 'Requiere prueba piloto de viabilidad',
    estado: 'Valoración previa',
    protocolo:
      'Realizamos prueba técnica puntual sobre la pieza crítica; en rellenos de pluma/espuma con olor irreductible dictaminamos pérdida total.',
  },
  {
    categoria: 'Agua negra (Cat. 3), moho consolidado o fusión',
    escenario: 'agua',
    afeccion: 'Bajantes fecales, moho negro activo, fibras fundidas en secadora o carbonizadas',
    viabilidad: '0 % viable o riesgo sanitario',
    estado: 'Pérdida total',
    protocolo:
      'No se somete a lavado en vano: se documenta con fotografía y referencia en Certificado Técnico de Prendas Irrecuperables.',
  },
];

const NO_HACEMOS_ALCANCE = [
  'Limpieza estructural de viviendas tras obra o siniestro (paredes, techos, carpintería o suelos).',
  'Retirada de escombros, vaciado de mobiliario rígido o saneamiento de electrodomésticos afectados por fuego.',
  'Peritación del continente del inmueble ni reparación de instalaciones eléctricas o fontanería.',
  'Limpieza de tapicerías de automóviles ni piezas contaminadas por aguas fecales (pasan a certificado de descarte).',
];

const QUE_SI_HACEMOS_TEXTIL = [
  {
    num: '01',
    titulo: 'Vestuario personal, trabajo y armarios completos',
    detalle:
      'Camisas, pantalones, abrigos de paño, plumíferos, trajes de sastrería, vestidos de fiesta o ceremonia, ropa laboral y uniformes escolares.',
  },
  {
    num: '02',
    titulo: 'Cortinajes, edredones y ropa de hogar o negocio',
    detalle:
      'Cortinas (con desmontaje y colocación a domicilio), visillos, estores de tela, edredones, mantas, ropa de cama, mantelerías de hostelería y stock textil comercial afectado por humo o agua recuperable.',
  },
  {
    num: '03',
    titulo: 'Alfombras (limpieza y reparación) y pieles / cuero',
    detalle:
      'Limpieza profunda de alfombras y reparación de flecos y ribetes mediante taller especialista colaborador, y valoración individual o prueba piloto para piel, cuero y ante.',
  },
];

const PROTOCOLO_QUE_SI = [
  {
    titulo: 'Fotografía y graba antes de mover o tirar nada',
    texto:
      'Haz fotos generales del armario y detalle de etiquetas antes de retirar. Conserva incluso las piezas calcinadas hasta que el perito o nuestro inventario las registre (prueba de preexistencia).',
  },
  {
    titulo: 'Comunica el parte (Art. 16) e inventaría en 5 días (Art. 38)',
    texto:
      'Avisa cuanto antes a tu seguro (ideal <72 h, plazo legal 7 días) indicando que vas a contener textiles para salvamento. La Ley 50/1980 fija 5 días tras el aviso para entregar relación escrita.',
  },
  {
    titulo: 'Separa prendas secas, húmedas y colores en sombra ventilada',
    texto:
      'En la humedad atlántica de Vigo (81–84 % oct–ene), apilar ropa húmeda dispara moho y sangrado de tintes en 24–48 h. Airear únicamente en sombra ventilada, nunca al sol directo (la radiación UV fija manchas y decolora).',
  },
  {
    titulo: 'Usa cajas abiertas o fundas de tela transpirable',
    texto:
      'Evita la condensación de gases ácidos y humedad. No sacudas cortinas ni mantas dentro de casa: dispersarías partículas submicrométricas (<1 µm) hacia habitaciones limpias.',
  },
];

const PROTOCOLO_QUE_NO = [
  {
    titulo: 'NO laves ropa con hollín en lavadora doméstica ni frotes',
    texto:
      'El agua mezcla el hollín seco de carbono con alquitrán formando una pasta grasa indeleble incrustada en el hilo y borra la trazabilidad física antes de peritar. Además, >40 °C en poliéster fija grasas de cocina.',
  },
  {
    titulo: 'NO uses secadora ni plancha sobre textiles ahumados',
    texto:
      'Es el error más destructivo: el calor sella térmicamente (termofijación) los compuestos orgánicos volátiles del humo al polímero, funde sintéticos o elastano y vuelve el olor permanente.',
  },
  {
    titulo: 'NO uses sprays ambientadores (ciclodextrinas) ni suavizantes',
    texto:
      'Los sprays textiles encapsulan el olor temporalmente (HPβCD) y el suavizante sella el residuo con una película grasa: al sudar o con el 80–95 % de humedad en Vigo, las moléculas se liberan y el olor a humo vuelve de golpe.',
  },
  {
    titulo: 'NO encierres ropa húmeda o ahumada en bolsas de plástico',
    texto:
      'El plástico estanco dispara la condensación ácida (HCl en humos de PVC), acelera la transferencia de tintes y provoca germinación fúngica en menos de 48 horas.',
  },
];

const FASES_TALLER_MIMOS = [
  {
    num: '01',
    titulo: 'Triaje técnico y prueba de viabilidad',
    descripcion:
      'Clasificamos cada lote por estancia, fibra y tipo de residuo (PVC, cocina, celulosa o agua Cat. 1/2/3). En piezas críticas realizamos prueba piloto previa antes de procesar el resto.',
  },
  {
    num: '02',
    titulo: 'Aspiración mecánica en seco inicial',
    descripcion:
      'Retiramos en seco la fracción superficial de ceniza y carbono submicrométrico antes de introducir cualquier agua o disolvente, evitando crear pasta grasa.',
  },
  {
    num: '03',
    titulo: 'Desengrase lipofílico y neutralización',
    descripcion:
      'Aplicamos tensioactivos específicos por contaminante y neutralización química con oxígeno activo para romper las moléculas volátiles del humo en lugar de enmascararlas.',
  },
  {
    num: '04',
    titulo: 'Wet / Dry Cleaning en circuito cerrado',
    descripcion:
      'Wet Cleaning controlado (<40 °C en sintéticos, sin álcalis agresivos en lana/seda) o Dry Cleaning en circuito cerrado para trajes, abrigos y tejidos delicados.',
  },
  {
    num: '05',
    titulo: 'Control sensorial, lote prioritario y alta',
    descripcion:
      'Comprobamos en zona libre de olor, adelantamos tu lote prioritario (trabajo/colegio) y completamos el expediente con memoria técnica y factura oficial con CIF en 1–3 semanas.',
  },
];

const DOCUMENTACION_SEGURO = [
  {
    num: '01',
    titulo: 'Presupuesto previo cerrado',
    descripcion:
      'Importes unitarios exactos y desglose por partida (sin horquillas ni rangos) tras el triaje físico inicial para solicitar autorización previa o pago directo al tramitador antes del grueso de los lavados.',
  },
  {
    num: '02',
    titulo: 'Albarán de custodia por estancia',
    descripcion:
      'Registro por habitación o armario con fecha de retirada, contaminante observado, estado previo y código identificador de cada bulto o lote.',
  },
  {
    num: '03',
    titulo: 'Memoria técnica de tratamiento',
    descripcion:
      'Detalle de las fases aplicadas (aspiración en seco, desengrase, oxígeno activo, Wet/Dry Cleaning controlado) y balance numérico final del lote.',
  },
  {
    num: '04',
    titulo: 'Certificado de pérdida total',
    descripcion:
      'Dictamen objetivo con causa técnica (fusión, daño ácido HCl, agua Cat. 3 o relleno irrecuperable) y referencia fotográfica para justificar la reposición.',
  },
  {
    num: '05',
    titulo: 'Factura oficial nominativa con CIF',
    descripcion: `Emitida por ${CONTACT_INFO.legalName} (CIF ${CONTACT_INFO.cif}), con IVA desglosado, vinculada al número de siniestro y póliza para reembolso o pago directo.`,
  },
];

const TEXTILES_SELECTOR = [
  'Ropa diaria y abrigos',
  'Trajes, sastrería o ceremonia',
  'Cortinas, visillos y estores',
  'Edredones, mantas y ropa de cama',
  'Alfombras afectadas',
  'Prendas de piel, cuero o ante',
];

interface InventarioItem {
  id: number;
  estancia: string;
  prenda: string;
  unidades: number;
  estado: string;
}

const INVENTARIO_INICIAL: InventarioItem[] = [
  {
    id: 1,
    estancia: 'Dormitorio principal (armario)',
    prenda: 'Abrigos y americanas de paño / lana',
    unidades: 4,
    estado: 'Olor a humo sin quemadura',
  },
  {
    id: 2,
    estancia: 'Salón',
    prenda: 'Cortinas y visillos doble hoja',
    unidades: 2,
    estado: 'Hollín superficial / humo',
  },
];

export const DisasterTextileRecoveryPage: React.FC<DisasterTextileRecoveryPageProps> = ({
  onNavigate,
}) => {
  const [residuoActivo, setResiduoActivo] = useState<ResiduoKey>('pvc');
  const [filtroMatriz, setFiltroMatriz] = useState<'todos' | 'humo' | 'agua'>('todos');
  const [herramientaActiva, setHerramientaActiva] = useState<'inventario' | 'carta'>('inventario');

  // Estado pre-inventario rápido Art. 38
  const [invNombre, setInvNombre] = useState('');
  const [invTelefono, setInvTelefono] = useState('');
  const [invLocalidad, setInvLocalidad] = useState('Vigo');
  const [invAseguradora, setInvAseguradora] = useState('');
  const [invSiniestro, setInvSiniestro] = useState('');
  const [itemsInventario, setItemsInventario] = useState<InventarioItem[]>(INVENTARIO_INICIAL);
  const [nuevaEstancia, setNuevaEstancia] = useState('Dormitorio principal');
  const [nuevaPrenda, setNuevaPrenda] = useState('');
  const [nuevasUnidades, setNuevasUnidades] = useState(1);
  const [nuevoEstado, setNuevoEstado] = useState('Olor a humo sin hollín visible');
  const [inventarioCopiado, setInventarioCopiado] = useState(false);
  const [exportandoPdf, setExportandoPdf] = useState(false);
  const [exportandoExcel, setExportandoExcel] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);

  // Estado carta modelo aseguradora Arts. 17 y 18
  const [cartaAseguradora, setCartaAseguradora] = useState('');
  const [cartaSiniestro, setCartaSiniestro] = useState('');
  const [cartaPoliza, setCartaPoliza] = useState('');
  const [cartaAsegurado, setCartaAsegurado] = useState('');
  const [cartaOposicionContrata, setCartaOposicionContrata] = useState(true);
  const [cartaCopiada, setCartaCopiada] = useState(false);

  // Estado asistente WhatsApp urgente
  const [tipoSiniestro, setTipoSiniestro] = useState(
    'Humo y olor en armario / vivienda (sin fuego directo en la ropa)'
  );
  const [origenIncidente, setOrigenIncidente] = useState(
    'Por confirmar (humo doméstico / madera / eléctrico / agua)'
  );
  const [textilesSeleccionados, setTextilesSeleccionados] = useState<string[]>([
    'Ropa diaria y abrigos',
    'Cortinas, visillos y estores',
  ]);
  const [necesitaLotePrioritario, setNecesitaLotePrioritario] = useState(true);
  const [situacionSeguro, setSituacionSeguro] = useState(
    'Ya tengo parte o número de expediente con mi seguro'
  );
  const [localidad, setLocalidad] = useState('Vigo');
  const [modalidad, setModalidad] = useState(
    'Coordinar recogida urgente a domicilio en Vigo / comarca'
  );
  const [observaciones, setObservaciones] = useState('');
  const [copied, setCopied] = useState(false);

  const toggleTextil = (item: string) => {
    setTextilesSeleccionados((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const agregarFilaInventario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaPrenda.trim()) return;
    setItemsInventario((prev) => [
      ...prev,
      {
        id: Date.now(),
        estancia: nuevaEstancia,
        prenda: nuevaPrenda.trim(),
        unidades: Math.max(1, Number(nuevasUnidades) || 1),
        estado: nuevoEstado,
      },
    ]);
    setNuevaPrenda('');
    setNuevasUnidades(1);
  };

  const cargarLoteTipo = (preset: 'dormitorio' | 'hogar') => {
    const base = Date.now();
    if (preset === 'dormitorio') {
      setItemsInventario((prev) => [
        ...prev,
        {
          id: base + 1,
          estancia: 'Dormitorio',
          prenda: 'Camisas, jerséis y pantalones de diario (lote prioritario)',
          unidades: 15,
          estado: 'Olor a humo persistente',
        },
        {
          id: base + 2,
          estancia: 'Dormitorio',
          prenda: 'Edredón nórdico y juego de sábanas / fundas',
          unidades: 3,
          estado: 'Humedad o impregnación de humo',
        },
      ]);
    } else {
      setItemsInventario((prev) => [
        ...prev,
        {
          id: base + 3,
          estancia: 'Salón / Comedor',
          prenda: 'Alfombra de salón y mantas de sofá',
          unidades: 2,
          estado: 'Hollín / agua de extinción',
        },
        {
          id: base + 4,
          estancia: 'Recibidor',
          prenda: 'Chaquetas de piel, cazadoras y ropa de abrigo',
          unidades: 5,
          estado: 'Exposición a humo (valoración prueba piloto)',
        },
      ]);
    }
  };

  const eliminarFilaInventario = (id: number) => {
    setItemsInventario((prev) => prev.filter((item) => item.id !== id));
  };

  const totalPrendasInventario = itemsInventario.reduce((acc, item) => acc + item.unidades, 0);

  const metaClienteInventario = {
    nombre: invNombre,
    telefono: invTelefono,
    localidad: invLocalidad,
    aseguradora: invAseguradora,
    siniestro: invSiniestro,
  };

  const generarTextoInventario = () => {
    const cabecera = [
      'RELACIÓN PRELIMINAR DE TEXTILES AFECTADOS (ART. 38 LEY 50/1980 — PLAZO 5 DÍAS)',
      `${CONTACT_INFO.legalName} (CIF ${CONTACT_INFO.cif}) · Tel. ${CONTACT_INFO.phoneDisplay} · WhatsApp ${CONTACT_INFO.whatsappNumber}`,
    ];
    const datosCliente: string[] = [];
    if (invNombre.trim()) datosCliente.push(`Asegurado/a: ${invNombre.trim()}`);
    if (invTelefono.trim()) datosCliente.push(`Teléfono: ${invTelefono.trim()}`);
    if (invLocalidad.trim()) datosCliente.push(`Localidad / Tienda: ${invLocalidad.trim()}`);
    if (invAseguradora.trim()) datosCliente.push(`Aseguradora: ${invAseguradora.trim()}`);
    if (invSiniestro.trim()) datosCliente.push(`Nº Siniestro / Póliza: ${invSiniestro.trim()}`);

    const cuerpo = itemsInventario.map(
      (item, idx) =>
        `${idx + 1}. [${item.estancia}] ${item.prenda} — ${item.unidades} ud(s) — Estado: ${item.estado}`
    );
    const pie = [
      '------------------------------------------------------------------------',
      `Total aproximado registrado en borrador: ${totalPrendasInventario} unidad(es) en ${itemsInventario.length} lote(s).`,
      'Sujeto a inventario fotográfico y albarán definitivo tras triaje en Tintorería Mimos Navia, S.L.',
    ];
    return [
      ...cabecera,
      ...(datosCliente.length > 0 ? ['--- Datos del expediente ---', ...datosCliente] : []),
      '------------------------------------------------------------------------',
      ...cuerpo,
      ...pie,
    ].join('\n');
  };

  const mailtoInventarioHref = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(
    `Pre-inventario textil siniestro${invSiniestro.trim() ? ` (${invSiniestro.trim()})` : ''} - Tintorería Mimos`
  )}&body=${encodeURIComponent(
    `Hola equipo de Tintorería Mimos,\n\nOs adjunto o envío mi pre-inventario preliminar de textiles afectados para valoración y presupuesto:\n\n${generarTextoInventario()}\n\nUn saludo.`
  )}`;

  const copiarInventario = async () => {
    try {
      await navigator.clipboard.writeText(generarTextoInventario());
      setInventarioCopiado(true);
      setTimeout(() => setInventarioCopiado(false), 3000);
    } catch {
      // ignore clipboard errors
    }
  };

  const descargarPdfInventario = async () => {
    if (exportandoPdf) return;
    setExportError(null);
    setExportandoPdf(true);
    try {
      await exportInventarioPdf(itemsInventario, metaClienteInventario);
    } catch {
      setExportError(
        'No se pudo generar el PDF en este navegador. Prueba de nuevo o descarga la versión Excel.'
      );
    } finally {
      setExportandoPdf(false);
    }
  };

  const descargarExcelInventario = async () => {
    if (exportandoExcel) return;
    setExportError(null);
    setExportandoExcel(true);
    try {
      await exportInventarioExcel(itemsInventario, metaClienteInventario);
    } catch {
      setExportError(
        'No se pudo generar el archivo Excel en este navegador. Prueba de nuevo o descarga la versión PDF.'
      );
    } finally {
      setExportandoExcel(false);
    }
  };

  const generarCartaSeguro = () => {
    const comp = cartaAseguradora.trim() || '[Nombre de la Compañía Aseguradora]';
    const sin = cartaSiniestro.trim() || '[Nº de Siniestro]';
    const pol = cartaPoliza.trim() || '[Nº de Póliza]';
    const aseg = cartaAsegurado.trim() || '[Nombre completo y NIF del Asegurado]';

    const bloqueArt18 = cartaOposicionContrata
      ? `\n3. Elección de tintorería especialista (Art. 18 Ley 50/1980): De conformidad con el artículo 18 de la LCS (que requiere el consentimiento expreso del asegurado para sustituir la indemnización por reparación a través de medios propios de la entidad), no presto consentimiento para que una empresa generalista de limpieza de obra o una contrata sin protocolo específico manipule vestuario de sastrería, prendas delicadas, pieles o cortinajes. Para esta partida exclusivamente textil designo a un especialista cualificado en Vigo: ${CONTACT_INFO.legalName} (CIF ${CONTACT_INFO.cif}), quien emitirá presupuesto previo cerrado, albarán de custodia por estancia, memoria técnica, certificado de eventuales prendas irrecuperables y factura oficial con CIF.\n`
      : `\n3. Especialista textil designado: Para la partida de vestuario, pieles, cortinajes, ropa de cama y alfombras solicito tramitar mediante ${CONTACT_INFO.legalName} (CIF ${CONTACT_INFO.cif}), quien emitirá presupuesto previo cerrado para autorización o pago directo, memoria técnica y factura oficial desglosada.\n`;

    return `ASUNTO: Siniestro Nº ${sin} | Póliza ${pol} — Comunicación de contención urgente y salvamento textil (Arts. 16, 17, 18 y 38 Ley 50/1980)

A la atención del Departamento de Siniestros / Perito asignado (${comp}):

Yo, ${aseg}, en relación con el siniestro de referencia ocurrido en mi domicilio/local en Vigo/comarca, comunico formalmente lo siguiente respecto a las partidas textiles afectadas incluidas en la garantía de Contenido (Art. 46 Ley 50/1980):

1. Relación preliminar e inventario (Art. 38 LCS): Dentro del plazo legal tras la declaración del siniestro, adjunto relación preliminar por estancias y reportaje fotográfico de las prendas de vestir, ropa de cama, cortinajes y alfombras afectadas por humo, hollín o agua, quedando el inventario completo sujeto a triaje técnico definitivo en taller.

2. Contención en seco y Gastos de Salvamento urgentes (Art. 17 LCS): Con el fin de aminorar las consecuencias del siniestro y evitar tanto la corrosión ácida de fibras como la aparición de moho en 24–48 horas (agravada por la elevada humedad ambiental de Vigo), procedo a la retirada y contención preventiva en seco de los textiles recuperables al amparo del artículo 17 de la Ley 50/1980.${bloqueArt18}
Quedo a la espera de confirmación por esta vía para remitir el presupuesto previo desglosado del especialista textil y coordinar, en su caso, la verificación pericial de las piezas no recuperables antes de su retirada definitiva.

Atentamente,
${aseg}
Teléfono de contacto: [Tu teléfono]`;
  };

  const copiarCarta = async () => {
    try {
      await navigator.clipboard.writeText(generarCartaSeguro());
      setCartaCopiada(true);
      setTimeout(() => setCartaCopiada(false), 3000);
    } catch {
      // ignore clipboard errors
    }
  };

  const buildUrgentWhatsAppMessage = () => {
    const listaTextiles =
      textilesSeleccionados.length > 0
        ? textilesSeleccionados.join(', ')
        : 'Por confirmar en valoración';
    const lines = [
      'Hola, Mimo. Necesito valoración urgente de recuperación textil tras un siniestro.',
      `Tipo de incidente: ${tipoSiniestro}`,
      `Origen / contaminante aproximado: ${origenIncidente}`,
      `Textiles afectados: ${listaTextiles}`,
      `Lote prioritario (ropa básica/trabajo/colegio): ${necesitaLotePrioritario ? 'Sí, lo necesito' : 'No urgente'}`,
      `Situación con el seguro: ${situacionSeguro}`,
      `Localidad: ${localidad}`,
      `Entrega o recogida: ${modalidad}`,
    ];
    if (observaciones.trim()) {
      lines.push(`Detalles / volumen aproximado: ${observaciones.trim()}`);
    }
    lines.push(
      'Gracias. Quedo a la espera para enviaros fotos, valorar prueba de viabilidad y preparar presupuesto / factura con CIF.'
    );
    return lines.join('\n');
  };

  const whatsappUrl = buildMimoWhatsAppUrl(buildUrgentWhatsAppMessage());

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildUrgentWhatsAppMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // ignore clipboard errors
    }
  };

  const residuoSeleccionado = RESIDUOS_INCENDIO[residuoActivo];
  const filasFiltradas = MATRIZ_TRIAJE.filter((row) =>
    filtroMatriz === 'todos' ? true : row.escenario === filtroMatriz
  );

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="focus:outline-hidden bg-white text-slate-900 border-b border-slate-200"
    >
      {/* 1. CABECERA LUMINOSA DE URGENCIA TEXTIL */}
      <PageHeroLight
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Servicios', href: '/#servicios' },
          { label: 'Recuperación textil tras incendios, humo e inundaciones' },
        ]}
        onNavigate={onNavigate}
        kicker={`Servicio técnico en Vigo · Exclusivamente ropa y textiles · CIF ${CONTACT_INFO.cif}`}
        title="Recuperación textil tras incendios, humo e inundaciones en Vigo"
        description="Rescatamos armarios completos, abrigos, trajes, cortinas, edredones y alfombras afectados por humo, hollín o agua en hogares, comercios y comunidades de Vigo y comarca. Triaje honesto con prueba de viabilidad previa, lote prioritario y factura oficial con CIF para el seguro."
        note={
          <>
            <strong>Alcance 100 % textil (sin limpieza estructural de vivienda):</strong> actuamos únicamente sobre tu vestuario y textiles recuperables. No realizamos limpieza de obra en paredes, techos, suelos ni retirada de escombros.
          </>
        }
        whatsappHref={whatsappUrl}
        whatsappLabel="Consulta urgente con Mimo"
        onWhatsAppClick={() =>
          trackWhatsAppClick('/limpieza-incendios-siniestros-vigo', 'service_detail', {
            service_id: 'recuperacion-siniestros',
          })
        }
        secondaryAction={{
          label: 'Plantilla inventario y carta seguro',
          href: '#herramientas-seguro',
          icon: <ClipboardList className="w-4 h-4 text-[#0F76BB] group-hover:text-white" aria-hidden="true" />,
          isInternalRoute: false,
        }}
        image={{
          src: IMAGES.blogSiniestrosIncendio,
          alt: 'Especialista de Tintorería Mimos revisando abrigos y prendas tras un siniestro de humo en taller de Vigo',
          caption:
            'Inspección pieza a pieza en nuestra central de Navia para dictaminar qué prendas admiten recuperación tras prueba previa y cuáles requieren certificado de pérdida total.',
          fallbackTitle: 'Recuperación textil especializada tras humo, hollín e inundación',
          fallbackSubtitle: 'Triaje técnico, neutralización y documentación oficial en Tintorería Mimos Vigo',
        }}
        extraContent={
          <div className="space-y-3 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="rounded-lg bg-white border border-slate-200 px-3 py-2.5">
                <p className="font-mono font-bold text-[#0F76BB] uppercase">Ciclo habitual</p>
                <p className="font-bold text-[#002147] mt-0.5">1 a 3 semanas</p>
              </div>
              <div className="rounded-lg bg-white border border-slate-200 px-3 py-2.5">
                <p className="font-mono font-bold text-[#0F76BB] uppercase">Urgencia diaria</p>
                <p className="font-bold text-[#002147] mt-0.5">Lote prioritario trabajo/colegio</p>
              </div>
              <div className="rounded-lg bg-white border border-slate-200 px-3 py-2.5">
                <p className="font-mono font-bold text-[#0F76BB] uppercase">Piezas críticas</p>
                <p className="font-bold text-[#002147] mt-0.5">Prueba de viabilidad previa</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-600">
              Urgencias telefónicas en horario comercial:{' '}
              <a
                href={CONTACT_INFO.phoneHref}
                onClick={() =>
                  trackPhoneClick('/limpieza-incendios-siniestros-vigo', 'hero')
                }
                className="text-[#002147] font-bold underline underline-offset-4 hover:text-[#0F76BB] tabular-nums"
              >
                {CONTACT_INFO.phoneDisplay}
              </a>{' '}
              · Atención directa en Navia, Gregorio Espino y Venezuela.
            </p>
          </div>
        }
      />

      {/* BARRA RÁPIDA PARA USUARIOS EN URGENCIA */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav aria-label="Atajos según tu situación actual" className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-mono font-bold uppercase tracking-wider text-slate-500 mr-1">
              Ir directo a:
            </span>
            <a
              href="#primeras-horas"
              className="inline-flex items-center min-h-[40px] px-3 py-1.5 rounded-lg border border-slate-200 bg-[#F7F6F2] hover:bg-[#002147] hover:text-white text-[#002147] font-bold transition-colors"
            >
              1. Qué NO hacer ahora (24–48 h)
            </a>
            <a
              href="#casos-cotidianos"
              className="inline-flex items-center min-h-[40px] px-3 py-1.5 rounded-lg border border-slate-200 bg-[#F7F6F2] hover:bg-[#002147] hover:text-white text-[#002147] font-bold transition-colors"
            >
              2. Casos frecuentes y cómo valoramos
            </a>
            <a
              href="#herramientas-seguro"
              className="inline-flex items-center min-h-[40px] px-3 py-1.5 rounded-lg border border-slate-200 bg-[#F7F6F2] hover:bg-[#002147] hover:text-white text-[#002147] font-bold transition-colors"
            >
              3. Plantilla 5 días y carta al seguro
            </a>
            <a
              href="#entrega-hoy"
              className="inline-flex items-center min-h-[40px] px-3 py-1.5 rounded-lg border border-[#0F76BB]/30 bg-[#EDF5FD] hover:bg-[#0F76BB] hover:text-white text-[#002147] font-bold transition-colors"
            >
              4. Dónde entregar HOY en Vigo (horarios)
            </a>
          </nav>
        </div>
      </div>

      {/* 1B. CASOS COTIDIANOS */}
      <section
        id="casos-cotidianos"
        className="py-12 lg:py-16 bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1.5">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB]">
                Casos cotidianos en pisos y locales de Vigo
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight">
                4 incidentes habituales que rescatamos — y cómo presupuestamos sin sorpresas
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
              <div className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-4 space-y-1">
                <p className="font-extrabold text-[#002147]">
                  1. Humareda en cocina o piso de un vecino
                </p>
                <p className="text-slate-600 leading-relaxed">
                  El olor entra en armarios cerrados sin quemar la tela. Desengrase lipofílico + oxígeno activo sin lavar poliéster en caliente (&gt;40 °C).
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-4 space-y-1">
                <p className="font-extrabold text-[#002147]">
                  2. Cuadro eléctrico, caldera o plásticos
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Humo corrosivo (HCl) y hollín untuoso: aspiración en seco obligatoria y neutralización rápida antes de 48 h.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-4 space-y-1">
                <p className="font-extrabold text-[#002147]">
                  3. Rotura de latiguillo o fuga del piso de arriba
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Con la humedad de Vigo el moho brota en 24–48 h: separación de tintes, higienización y secado técnico fuera de tu vivienda.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-4 space-y-1">
                <p className="font-extrabold text-[#002147]">
                  4. Agua de extinción, garaje o local comercial
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Rescate textil de cortinajes, alfombras o género afectado solo por humo/agua recuperable, y certificado de descarte si hubo aguas fecales.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#0F76BB]/30 border-l-4 border-l-[#0F76BB] bg-[#EDF5FD] p-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <strong className="text-[#002147]">Cómo valoramos antes de gastar:</strong> envíanos primero fotos a Mimo por WhatsApp o acércate a tienda para orientarte. Tras revisar el lote, emitimos <strong className="text-[#002147]">presupuesto previo cerrado</strong> antes de lavar el grueso y, en piezas críticas (cuero, sedas, pluma), te consultamos antes de realizar una prueba técnica de viabilidad puntual.
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="rounded-xl overflow-hidden border border-slate-200 bg-[#F7F6F2] shadow-xs">
              <img
                src={IMAGES.servicioTintoreria}
                alt="Trajes, abrigos y prendas delicadas en taller profesional de Tintorería Mimos Vigo tras triaje y cuidado textil"
                width={800}
                height={600}
                loading="lazy"
                className="w-full aspect-4/3 object-cover"
              />
              <figcaption className="p-4 text-xs text-slate-600 border-t border-slate-200 bg-white leading-relaxed">
                Tratamiento individualizado por fibra en nuestro taller de Vigo: separamos vestuario diario prioritario, sastrería y cortinajes para emitir factura oficial desglosada.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. QUÉ HACER Y QUÉ NO HACER + QUÍMICA POR TIPO DE RESIDUO */}
      <section
        id="primeras-horas"
        className="py-12 lg:py-18 bg-[#F7F6F2] border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <div className="max-w-3xl mb-8 space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB]">
                Protocolo crítico de las primeras 24–48 horas
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                Qué SÍ hacer y qué NO hacer para no inutilizar el tejido ni perder cobertura
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                El éxito del rescate textil cae bruscamente pasada la ventana crítica de 24 a 72 horas por corrosión ácida, termofijación de gases o germinación de moho en el clima húmedo de Vigo.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <article className="rounded-xl border border-emerald-200 border-t-4 border-t-[#1FA855] bg-white p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-[#178A47] mb-5">
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#002147]">
                      Qué SÍ hacer de inmediato
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {PROTOCOLO_QUE_SI.map((paso, idx) => (
                      <li
                        key={paso.titulo}
                        className="flex items-start gap-3.5 pb-4 last:pb-0 border-b last:border-b-0 border-slate-200"
                      >
                        <span className="text-xs font-mono font-bold text-[#178A47] tabular-nums pt-0.5 shrink-0">
                          0{idx + 1}.
                        </span>
                        <div>
                          <p className="text-sm sm:text-base font-extrabold text-[#002147] mb-1">
                            {paso.titulo}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {paso.texto}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              <article className="rounded-xl border border-red-200 border-t-4 border-t-red-600 bg-white p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-red-700 mb-5">
                    <XCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#002147]">
                      Qué NO hacer bajo ningún concepto
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {PROTOCOLO_QUE_NO.map((error, idx) => (
                      <li
                        key={error.titulo}
                        className="flex items-start gap-3.5 pb-4 last:pb-0 border-b last:border-b-0 border-slate-200"
                      >
                        <span className="text-xs font-mono font-bold text-red-700 tabular-nums pt-0.5 shrink-0">
                          0{idx + 1}.
                        </span>
                        <div>
                          <p className="text-sm sm:text-base font-extrabold text-[#002147] mb-1">
                            {error.titulo}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {error.texto}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </div>

          {/* Selector interactivo por tipo de residuo / origen del humo */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="space-y-1 max-w-2xl">
                <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB]">
                  Diagnóstico químico según qué ardió
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] tracking-tight">
                  No todos los humos se limpian igual: selecciona el origen del incidente
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  El humo viaja por termoforesis hasta armarios cerrados sin llama directa. Aplicar agua o disolvente sin identificar el residuo empeora la mancha.
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Tipo de residuo de incendio"
                className="flex flex-wrap gap-2 shrink-0"
              >
                {(Object.values(RESIDUOS_INCENDIO) as ResiduoInfo[]).map((res) => {
                  const activo = residuoActivo === res.id;
                  return (
                    <button
                      key={res.id}
                      type="button"
                      role="tab"
                      aria-selected={activo}
                      onClick={() => setResiduoActivo(res.id)}
                      className={`min-h-[44px] px-3.5 py-2 rounded-lg text-xs font-bold border transition-colors cursor-pointer whitespace-nowrap ${
                        activo
                          ? 'bg-[#EDF5FD] border-[#0F76BB] text-[#002147]'
                          : 'bg-[#F7F6F2] border-slate-200 text-slate-700 hover:border-[#0F76BB]'
                      }`}
                    >
                      {res.titulo}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5 space-y-3">
                <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB]">
                  {residuoSeleccionado.subtitulo}
                </p>
                <h4 className="text-lg sm:text-xl font-extrabold text-[#002147]">
                  {residuoSeleccionado.titulo}
                </h4>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-800">
                  <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Ventana crítica: {residuoSeleccionado.ventanaCritica}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {residuoSeleccionado.quimica}
                </p>
                <div className="p-3.5 rounded-lg border border-red-200 bg-red-50 text-xs text-red-900 leading-relaxed">
                  <strong>Atención:</strong> {residuoSeleccionado.prohibicionClave}
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-5 space-y-2">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#002147]">
                    Impacto por fibra y pieles
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {residuoSeleccionado.impactoFibras}
                  </p>
                </div>

                <div className="rounded-xl border border-[#0F76BB]/25 bg-[#EDF5FD] p-5 space-y-2">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB]">
                    Secuencia técnica en Mimos Navia
                  </p>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {residuoSeleccionado.secuenciaMimos}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ALCANCE TEXTIL + MÓDULO INUNDACIONES EN CLIMA DE VIGO (AEMET) Y 3 CATEGORÍAS DE AGUA */}
      <section className="py-12 lg:py-18 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <div className="max-w-3xl mb-8 space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB]">
                Especialización estrictamente textil · Particulares, comercios y comunidades
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                Qué recuperamos en nuestro taller de Vigo y qué queda fuera de alcance
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                A diferencia de las contratas de limpieza general de obra, concentramos toda nuestra técnica y maquinaria textil exclusivamente en ropa y tejidos recuperables del hogar o empresa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {QUE_SI_HACEMOS_TEXTIL.map((bloque) => (
                <article
                  key={bloque.num}
                  className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-6"
                >
                  <p className="text-xs font-mono font-bold text-[#0F76BB] tabular-nums mb-2">
                    {bloque.num} · ÁREA TEXTIL
                  </p>
                  <h3 className="text-lg font-extrabold text-[#002147] mb-2">
                    {bloque.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {bloque.detalle}
                  </p>
                </article>
              ))}
            </div>

            <div className="rounded-xl border border-slate-200 border-l-4 border-l-amber-500 bg-[#F7F6F2] p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-800">
                    <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Claridad de servicio</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#002147]">
                    Límites honestos de esta intervención
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Si necesitas saneamiento de obra o carpintería del inmueble, conviene coordinar con tu aseguradora un equipo estructural mientras nosotros salvamos todo el vestuario y los textiles.
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                    {NO_HACEMOS_ALCANCE.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <XCircle
                          className="w-4 h-4 text-slate-500 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Módulo climático AEMET Vigo + 3 Categorías de Agua */}
          <div className="rounded-xl border border-[#0F76BB]/25 bg-[#EDF5FD] p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB]">
                  <CloudRain className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Inundaciones y agua de extinción en el clima de Vigo</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] tracking-tight">
                  Por qué tender ropa mojada en casa en Vigo dispara el moho en 24–48 horas
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Sin secado técnico ni deshumidificación, un armario empapado por una rotura de tubería o por agua de bomberos no logra evaporar a tiempo dentro del clima atlántico de la ría de Vigo. Pasadas las 48 horas, la germinación fúngica y la migración de tintes degradan las fibras orgánicas.
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <p className="text-lg sm:text-xl font-extrabold text-[#002147] tabular-nums">
                    77 %
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    Humedad media anual Vigo (AEMET)
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <p className="text-lg sm:text-xl font-extrabold text-[#0F76BB] tabular-nums">
                    81–84 %
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    Humedad media oct–ene (picos 95 %)
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                  <p className="text-lg sm:text-xl font-extrabold text-amber-700 tabular-nums">
                    24–48 h
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                    Margen antes del brote de moho
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CATEGORIAS_AGUA_VIGO.map((cat) => (
                <article
                  key={cat.categoria}
                  className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <span
                      className={`inline-block text-xs font-mono font-bold ${
                        cat.estado === 'Recuperable'
                          ? 'text-[#178A47]'
                          : cat.estado === 'Bajo condición técnica'
                          ? 'text-amber-800'
                          : 'text-red-700'
                      }`}
                    >
                      {cat.estado.toUpperCase()}
                    </span>
                    <h4 className="text-base font-extrabold text-[#002147]">
                      {cat.categoria}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>Origen:</strong> {cat.origenVigo}
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>Evolución:</strong> {cat.riesgoBiologico}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-[#002147] pt-3 border-t border-slate-200 leading-relaxed">
                    <strong>Criterio técnico:</strong> {cat.dictamen}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MATRIZ DE TRIAJE TÉCNICO + PROCESO EN 5 FASES + COMPROMISOS */}
      <section className="py-12 lg:py-18 bg-[#F7F6F2] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB]">
                Triaje técnico profesional
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                Prendas recuperables frente a informe de pérdida total
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Nunca te cobraremos lavados inútiles en prendas sin viabilidad: diagnosticamos por material, tipo de hollín o agua qué admite descontaminación y qué debe certificarse como irrecuperable.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filtrar matriz por tipo de siniestro"
              className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white border border-slate-200 shrink-0 self-start"
            >
              <button
                type="button"
                onClick={() => setFiltroMatriz('todos')}
                className={`min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filtroMatriz === 'todos'
                    ? 'bg-[#002147] text-white'
                    : 'text-slate-700 hover:text-[#002147]'
                }`}
              >
                Todos los casos
              </button>
              <button
                type="button"
                onClick={() => setFiltroMatriz('humo')}
                className={`inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filtroMatriz === 'humo'
                    ? 'bg-[#002147] text-white'
                    : 'text-slate-700 hover:text-[#002147]'
                }`}
              >
                <Flame className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Humo e incendio</span>
              </button>
              <button
                type="button"
                onClick={() => setFiltroMatriz('agua')}
                className={`inline-flex items-center gap-1.5 min-h-[40px] px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filtroMatriz === 'agua'
                    ? 'bg-[#002147] text-white'
                    : 'text-slate-700 hover:text-[#002147]'
                }`}
              >
                <Droplets className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Inundación y moho</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white mb-12 shadow-2xs">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
              <thead className="bg-[#EDF5FD] text-[#002147]">
                <tr>
                  <th scope="col" className="px-4 py-3.5 font-extrabold border-b border-slate-200">
                    Tipo de textil / escenario
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-extrabold border-b border-slate-200">
                    Afección observada
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-extrabold border-b border-slate-200">
                    Dictamen técnico
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-extrabold border-b border-slate-200">
                    Actuación en Tintorería Mimos
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {filasFiltradas.map((fila) => (
                  <tr key={fila.categoria} className="hover:bg-[#F7F6F2]/70">
                    <td className="px-4 py-4 font-extrabold text-[#002147] align-top">
                      {fila.categoria}
                    </td>
                    <td className="px-4 py-4 align-top leading-relaxed">{fila.afeccion}</td>
                    <td className="px-4 py-4 align-top">
                      <span
                        className={`inline-flex items-center gap-1.5 font-bold text-xs ${
                          fila.estado === 'Recuperable'
                            ? 'text-[#178A47]'
                            : fila.estado === 'Valoración previa'
                            ? 'text-amber-800'
                            : 'text-red-700'
                        }`}
                      >
                        {fila.estado === 'Recuperable' && (
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        )}
                        {fila.estado === 'Valoración previa' && (
                          <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        )}
                        {fila.estado === 'Pérdida total' && (
                          <XCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        )}
                        <span>{fila.estado}</span>
                      </span>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {fila.viabilidad}
                      </p>
                    </td>
                    <td className="px-4 py-4 align-top leading-relaxed">{fila.protocolo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg sm:text-xl font-extrabold text-[#002147]">
              Nuestro protocolo técnico en 5 fases en Navia (Vigo)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {FASES_TALLER_MIMOS.map((fase) => (
                <article
                  key={fase.num}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <p className="text-xs font-mono font-bold text-[#0F76BB] tabular-nums mb-1.5">
                    FASE {fase.num}
                  </p>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#002147] mb-2">
                    {fase.titulo}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {fase.descripcion}
                  </p>
                </article>
              ))}
            </div>

            {/* 3 compromisos operativos confirmados */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="rounded-xl border border-[#0F76BB]/30 bg-white p-5">
                <p className="text-xs font-mono font-bold uppercase text-[#0F76BB] mb-1">
                  Plazo orientativo completo
                </p>
                <h4 className="text-base font-extrabold text-[#002147] mb-1">
                  Entre 1 y 3 semanas
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Dependiendo del volumen del armario y las pasadas necesarias de desengrase, neutralización molecular y verificación en seco.
                </p>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-white p-5">
                <p className="text-xs font-mono font-bold uppercase text-[#178A47] mb-1">
                  Para que sigas con tu día a día
                </p>
                <h4 className="text-base font-extrabold text-[#002147] mb-1">
                  Lote prioritario diario y escolar
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Separamos y adelantamos vestuario de trabajo, uniformes escolares y básicos urgentes mientras procesamos el resto de lotes.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-xs font-mono font-bold uppercase text-[#0F76BB] mb-1">
                  Transparencia antes de facturar el grueso
                </p>
                <h4 className="text-base font-extrabold text-[#002147] mb-1">
                  Prueba de viabilidad previa
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Test técnico puntual sobre prendas críticas (pieles, seda, edredones de pluma) para confirmar rescate o emitir baja de pérdida total.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LEY 50/1980, DOCUMENTACIÓN PERICIAL Y HERRAMIENTAS INTERACTIVAS */}
      <section
        id="herramientas-seguro"
        className="py-12 lg:py-18 bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB]">
                Tramitación con aseguradoras y peritos · Ley 50/1980
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                Factura oficial desglosada con CIF y expediente pericial completo
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                En <strong>{CONTACT_INFO.legalName}</strong> (<strong>CIF {CONTACT_INFO.cif}</strong>) estructuramos todo el expediente textil para que tanto el perito como tu compañía (Mapfre, AXA, Allianz, Generali, SegurCaixa, Mutua, Línea Directa, etc.) lo aprueben sin devoluciones por falta de desglose.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong>Clave económica frente a la reposición:</strong> muchas pólizas liquidan la ropa usada a <em>valor real</em> (aplicando depreciación por antigüedad, Art. 26 LCS). En cambio, la limpieza técnica actúa como <strong>Gasto de Salvamento (Art. 17)</strong> y evita ese recorte siempre que resulte proporcionada, sin perjuicio de reglas de infraseguro (Art. 30) o franquicia pactada.
              </p>
            </div>

            <div className="lg:col-span-6 rounded-xl border border-[#0F76BB]/25 border-t-4 border-t-[#0F76BB] bg-[#EDF5FD] p-6 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-extrabold text-[#002147]">
                <ShieldCheck className="w-4 h-4 text-[#178A47] shrink-0" aria-hidden="true" />
                <span>Tus derechos clave bajo la Ley 50/1980 de Contrato de Seguro</span>
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>Aviso e inventario en plazo (Arts. 16 y 38):</strong> comunica el siniestro cuanto antes (plazo legal 7 días; aconsejable &lt;72 h) y entrega relación escrita de bienes afectados dentro de los <strong>5 días siguientes</strong>.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Salvamento urgente (Art. 17):</strong> retirar y contener en seco antes de que la acidez (HCl) o el moho en Vigo destruyan el tejido cumple el deber de aminorar daños —incluso si una prueba técnica fracasa—.
              </p>
              <p className="text-slate-700 leading-relaxed">
                <strong>Frente a contratas de obra (Art. 18) y peritación (Art. 38):</strong> la aseguradora no puede imponer reparación con sus propios medios <em>“si el asegurado no lo consiente”</em>, y ante desacuerdo puedes designar perito de parte.
              </p>
            </div>
          </div>

          {/* 5 Documentos del expediente pericial */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {DOCUMENTACION_SEGURO.map((doc) => (
              <article
                key={doc.num}
                className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-5"
              >
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-mono font-bold text-[#0F76BB] tabular-nums">
                    DOC. {doc.num}
                  </span>
                  <FileCheck2 className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                </div>
                <h3 className="text-base font-extrabold text-[#002147] mb-1.5">
                  {doc.titulo}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {doc.descripcion}
                </p>
              </article>
            ))}
          </div>

          {/* HERRAMIENTAS INTERACTIVAS CONTRA LA PARÁLISIS DEL AFECTADO */}
          <div className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div className="space-y-1 max-w-2xl">
                <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB]">
                  Utilidades gratuitas para desbloquear tu expediente hoy mismo
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147]">
                  Prepara tu pre-inventario de 5 días (Art. 38) o tu carta para el seguro
                </h3>
              </div>

              <div
                role="tablist"
                aria-label="Herramientas documentales para el asegurado"
                className="inline-flex flex-wrap items-center gap-1 p-1 rounded-xl bg-white border border-slate-200 self-start"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={herramientaActiva === 'inventario'}
                  onClick={() => setHerramientaActiva('inventario')}
                  className={`min-h-[40px] px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    herramientaActiva === 'inventario'
                      ? 'bg-[#002147] text-white'
                      : 'text-slate-700 hover:text-[#002147]'
                  }`}
                >
                  1. Plantilla Pre-Inventario (Art. 38)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={herramientaActiva === 'carta'}
                  onClick={() => setHerramientaActiva('carta')}
                  className={`min-h-[40px] px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    herramientaActiva === 'carta'
                      ? 'bg-[#002147] text-white'
                      : 'text-slate-700 hover:text-[#002147]'
                  }`}
                >
                  2. Carta Modelo Aseguradora (Arts. 17 y 18)
                </button>
              </div>
            </div>

            {herramientaActiva === 'inventario' ? (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs sm:text-sm text-slate-600">
                    Agrupa tus prendas por habitación para cumplir el plazo de <strong>5 días</strong> del Art. 38 LCS y descarga el documento con cabecera oficial de Tintorería Mimos en <strong>PDF</strong> o <strong>Excel (.xlsx)</strong> para tu aseguradora o para enviárnoslo directamente.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => cargarLoteTipo('dormitorio')}
                      className="min-h-[40px] text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-[#002147] hover:border-[#0F76BB] cursor-pointer"
                    >
                      + Añadir dormitorio tipo
                    </button>
                    <button
                      type="button"
                      onClick={() => cargarLoteTipo('hogar')}
                      className="min-h-[40px] text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-[#002147] hover:border-[#0F76BB] cursor-pointer"
                    >
                      + Añadir alfombra / pieles
                    </button>
                  </div>
                </div>

                {/* Datos opcionales del cliente y del expediente */}
                <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-bold text-[#002147] uppercase tracking-wider">
                      Datos del asegurado / expediente (opcional — se incluirán en el PDF y el Excel)
                    </p>
                    <span className="text-[11px] font-medium text-slate-500">
                      Solo se generan en tu navegador; no almacenamos datos en servidor
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    <div>
                      <label htmlFor="inv-nombre" className="block text-[11px] font-bold text-slate-700 mb-1">
                        Tu nombre y apellidos
                      </label>
                      <input
                        id="inv-nombre"
                        type="text"
                        value={invNombre}
                        onChange={(e) => setInvNombre(e.target.value)}
                        placeholder="Ej.: María García..."
                        className="w-full min-h-[44px] px-3 py-2 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
                      />
                    </div>
                    <div>
                      <label htmlFor="inv-telefono" className="block text-[11px] font-bold text-slate-700 mb-1">
                        Teléfono de contacto
                      </label>
                      <input
                        id="inv-telefono"
                        type="tel"
                        value={invTelefono}
                        onChange={(e) => setInvTelefono(e.target.value)}
                        placeholder="Ej.: 600 123 456"
                        className="w-full min-h-[44px] px-3 py-2 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
                      />
                    </div>
                    <div>
                      <label htmlFor="inv-localidad" className="block text-[11px] font-bold text-slate-700 mb-1">
                        Localidad o tienda
                      </label>
                      <input
                        id="inv-localidad"
                        type="text"
                        value={invLocalidad}
                        onChange={(e) => setInvLocalidad(e.target.value)}
                        placeholder="Vigo / Navia / Comarca..."
                        className="w-full min-h-[44px] px-3 py-2 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
                      />
                    </div>
                    <div>
                      <label htmlFor="inv-aseguradora" className="block text-[11px] font-bold text-slate-700 mb-1">
                        Aseguradora (si aplica)
                      </label>
                      <input
                        id="inv-aseguradora"
                        type="text"
                        value={invAseguradora}
                        onChange={(e) => setInvAseguradora(e.target.value)}
                        placeholder="Ej.: Mapfre, Allianz..."
                        className="w-full min-h-[44px] px-3 py-2 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
                      />
                    </div>
                    <div>
                      <label htmlFor="inv-siniestro" className="block text-[11px] font-bold text-slate-700 mb-1">
                        Nº Siniestro o póliza
                      </label>
                      <input
                        id="inv-siniestro"
                        type="text"
                        value={invSiniestro}
                        onChange={(e) => setInvSiniestro(e.target.value)}
                        placeholder="Ej.: SIN-2026-..."
                        className="w-full min-h-[44px] px-3 py-2 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
                      />
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={agregarFilaInventario}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-4 rounded-xl border border-slate-200"
                >
                  <div className="sm:col-span-3">
                    <label htmlFor="inv-estancia" className="block text-[11px] font-bold text-slate-700 mb-1">
                      Estancia / armario
                    </label>
                    <input
                      id="inv-estancia"
                      type="text"
                      value={nuevaEstancia}
                      onChange={(e) => setNuevaEstancia(e.target.value)}
                      className="w-full min-h-[44px] px-3 py-2 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <label htmlFor="inv-prenda" className="block text-[11px] font-bold text-slate-700 mb-1">
                      Prenda o textil afectado
                    </label>
                    <input
                      id="inv-prenda"
                      type="text"
                      value={nuevaPrenda}
                      onChange={(e) => setNuevaPrenda(e.target.value)}
                      placeholder="Ej.: 2 trajes lana, 1 edredón pluma..."
                      className="w-full min-h-[44px] px-3 py-2 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="inv-uds" className="block text-[11px] font-bold text-slate-700 mb-1">
                      Uds.
                    </label>
                    <input
                      id="inv-uds"
                      type="number"
                      min={1}
                      value={nuevasUnidades}
                      onChange={(e) => setNuevasUnidades(Math.max(1, Number(e.target.value) || 1))}
                      className="w-full min-h-[44px] px-2.5 py-2 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-xs font-medium text-slate-900 tabular-nums focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="inv-estado" className="block text-[11px] font-bold text-slate-700 mb-1">
                      Daño observado
                    </label>
                    <select
                      id="inv-estado"
                      value={nuevoEstado}
                      onChange={(e) => setNuevoEstado(e.target.value)}
                      className="w-full min-h-[44px] px-3 py-2 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
                    >
                      <option value="Olor a humo sin hollín visible">Olor a humo sin hollín visible</option>
                      <option value="Hollín superficial (sin quemadura)">Hollín superficial (sin quemadura)</option>
                      <option value="Humedad por agua limpia / extinción">Humedad por agua limpia / extinción</option>
                      <option value="Daño térmico / posible pérdida total">Daño térmico / posible pérdida total</option>
                    </select>
                  </div>
                  <div className="sm:col-span-1 flex items-end">
                    <button
                      type="submit"
                      aria-label="Añadir línea al inventario"
                      className="w-full min-h-[44px] inline-flex items-center justify-center gap-1 bg-[#002147] hover:bg-[#0a3161] text-white font-bold text-xs px-3 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                      <span className="sm:hidden">Añadir</span>
                    </button>
                  </div>
                </form>

                <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                  <table className="min-w-full divide-y divide-slate-200 text-xs">
                    <thead className="bg-[#EDF5FD] text-[#002147]">
                      <tr>
                        <th className="px-3.5 py-2.5 text-left font-extrabold">Estancia</th>
                        <th className="px-3.5 py-2.5 text-left font-extrabold">Prenda / textil</th>
                        <th className="px-3.5 py-2.5 text-left font-extrabold">Uds.</th>
                        <th className="px-3.5 py-2.5 text-left font-extrabold">Estado</th>
                        <th className="px-3.5 py-2.5 text-right font-extrabold">Quitar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-700">
                      {itemsInventario.map((item) => (
                        <tr key={item.id}>
                          <td className="px-3.5 py-2.5 font-semibold text-[#002147]">{item.estancia}</td>
                          <td className="px-3.5 py-2.5">{item.prenda}</td>
                          <td className="px-3.5 py-2.5 font-bold tabular-nums">{item.unidades}</td>
                          <td className="px-3.5 py-2.5">{item.estado}</td>
                          <td className="px-3.5 py-2.5 text-right">
                            <button
                              type="button"
                              onClick={() => eliminarFilaInventario(item.id)}
                              aria-label={`Eliminar ${item.prenda}`}
                              className="inline-flex items-center justify-center min-h-[36px] min-w-[36px] text-slate-400 hover:text-red-700 cursor-pointer p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Canal directo visible de recepción e información de tiendas Mimos */}
                <div className="rounded-xl border border-[#0F76BB]/25 bg-white p-4 sm:p-5 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#0F76BB]">
                        Recepción directa en {CONTACT_INFO.legalName} · CIF {CONTACT_INFO.cif}
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Envíanos tu inventario por WhatsApp o adjunta el PDF/Excel por email para preparar valoración previa, prueba de viabilidad y recogida en Vigo.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                      <a
                        href={CONTACT_INFO.phoneHref}
                        onClick={() =>
                          trackPhoneClick('/limpieza-incendios-siniestros-vigo', 'inventory_contact_bar')
                        }
                        className="inline-flex items-center gap-1.5 text-[#002147] hover:text-[#0F76BB] tabular-nums"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#0F76BB]" aria-hidden="true" />
                        <span>{CONTACT_INFO.phoneDisplay}</span>
                      </a>
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="inline-flex items-center gap-1.5 text-[#002147] hover:text-[#0F76BB]"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#0F76BB]" aria-hidden="true" />
                        <span>{CONTACT_INFO.email}</span>
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2 border-t border-slate-200">
                    {TIENDAS_PROPIAS.map((tienda) => (
                      <div key={tienda.id} className="text-[11px] text-slate-600 leading-snug">
                        <span className="font-bold text-[#002147] block">
                          {tienda.nombre_mostrado} ({tienda.telefonos_mostrados})
                        </span>
                        <span>
                          {tienda.direccion} ({tienda.codigo_postal}) · {tienda.horario.resumen}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {exportError && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-800"
                  >
                    {exportError}
                  </div>
                )}

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <p className="text-xs font-bold text-[#002147] tabular-nums">
                    Total provisional en borrador: {totalPrendasInventario} unidad(es) en {itemsInventario.length} lote(s)
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={descargarPdfInventario}
                      disabled={exportandoPdf || itemsInventario.length === 0}
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg bg-[#002147] hover:bg-[#0a3161] text-xs font-bold text-white cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                    >
                      {exportandoPdf ? (
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      ) : (
                        <Download className="w-4 h-4" aria-hidden="true" />
                      )}
                      <span>{exportandoPdf ? 'Generando PDF...' : 'Descargar PDF oficial'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={descargarExcelInventario}
                      disabled={exportandoExcel || itemsInventario.length === 0}
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-xs font-bold text-[#002147] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                    >
                      {exportandoExcel ? (
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                      ) : (
                        <FileSpreadsheet className="w-4 h-4" aria-hidden="true" />
                      )}
                      <span>{exportandoExcel ? 'Generando Excel...' : 'Descargar Excel (.xlsx)'}</span>
                    </button>
                    <a
                      href={buildMimoWhatsAppUrl(
                        `Hola, Mimo. Te envío mi borrador rápido de inventario tras siniestro:\n\n${generarTextoInventario()}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackWhatsAppClick(
                          '/limpieza-incendios-siniestros-vigo',
                          'inventory_tool',
                          {
                            service_id: 'recuperacion-siniestros',
                          }
                        )
                      }
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg bg-[#1FA855] hover:bg-[#178A47] text-xs font-bold text-white transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Enviar por WhatsApp</span>
                    </a>
                    <a
                      href={mailtoInventarioHref}
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg border border-slate-300 bg-white text-xs font-bold text-[#002147] hover:border-[#0F76BB] transition-colors"
                    >
                      <Mail className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                      <span>Enviar por Email</span>
                    </a>
                    <button
                      type="button"
                      onClick={copiarInventario}
                      className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg border border-slate-300 bg-white text-xs font-bold text-[#002147] hover:border-[#0F76BB] cursor-pointer transition-colors"
                    >
                      {inventarioCopiado ? (
                        <>
                          <Check className="w-4 h-4 text-[#1FA855]" aria-hidden="true" />
                          <span>Inventario copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" aria-hidden="true" />
                          <span>Copiar texto</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 space-y-3 bg-white p-5 rounded-xl border border-slate-200">
                  <div>
                    <label htmlFor="carta-aseguradora" className="block text-xs font-bold text-[#002147] mb-1">
                      Compañía aseguradora
                    </label>
                    <input
                      id="carta-aseguradora"
                      type="text"
                      value={cartaAseguradora}
                      onChange={(e) => setCartaAseguradora(e.target.value)}
                      placeholder="Ej.: Mapfre, AXA, Allianz, Generali..."
                      className="w-full min-h-[44px] px-3 py-2 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="carta-siniestro" className="block text-xs font-bold text-[#002147] mb-1">
                        Nº de siniestro
                      </label>
                      <input
                        id="carta-siniestro"
                        type="text"
                        value={cartaSiniestro}
                        onChange={(e) => setCartaSiniestro(e.target.value)}
                        placeholder="Ej.: 2026-00412"
                        className="w-full min-h-[44px] px-3 py-2 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
                      />
                    </div>
                    <div>
                      <label htmlFor="carta-poliza" className="block text-xs font-bold text-[#002147] mb-1">
                        Nº de póliza
                      </label>
                      <input
                        id="carta-poliza"
                        type="text"
                        value={cartaPoliza}
                        onChange={(e) => setCartaPoliza(e.target.value)}
                        placeholder="Opcional"
                        className="w-full min-h-[44px] px-3 py-2 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="carta-asegurado" className="block text-xs font-bold text-[#002147] mb-1">
                      Nombre completo y NIF del asegurado
                    </label>
                    <input
                      id="carta-asegurado"
                      type="text"
                      value={cartaAsegurado}
                      onChange={(e) => setCartaAsegurado(e.target.value)}
                      placeholder="Nombre y DNI/NIF"
                      className="w-full min-h-[44px] px-3 py-2 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB]"
                    />
                  </div>
                  <label className="flex items-start gap-2.5 text-xs text-slate-700 pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cartaOposicionContrata}
                      onChange={(e) => setCartaOposicionContrata(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0F76BB] focus:ring-[#0F76BB]"
                    />
                    <span>
                      Incluir cláusula Art. 18 (preferencia de tintorería especialista frente a contrata generalista de obra)
                    </span>
                  </label>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  <textarea
                    readOnly
                    aria-label="Vista previa de carta modelo para aseguradora"
                    rows={12}
                    value={generarCartaSeguro()}
                    className="w-full p-4 rounded-xl border border-slate-200 bg-white text-xs text-slate-700 font-mono leading-relaxed focus:outline-hidden"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={copiarCarta}
                      className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#002147] hover:bg-[#0a3161] text-white text-xs font-bold cursor-pointer transition-colors"
                    >
                      {cartaCopiada ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-300" aria-hidden="true" />
                          <span>Carta copiada al portapapeles</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" aria-hidden="true" />
                          <span>Copiar carta para enviar por email al seguro</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <p className="text-[11px] text-slate-500 border-t border-slate-200 pt-4">
              Orientación práctica informativa sobre documentación habitual en siniestros bajo la Ley 50/1980; no sustituye el asesoramiento jurídico particular ni las condiciones específicas de tu póliza.
            </p>
          </div>
        </div>
      </section>

      {/* 6. ASISTENTE INTERACTIVO DE VALORACIÓN URGENTE POR WHATSAPP */}
      <section
        id="valoracion-siniestro"
        className="py-12 lg:py-18 bg-[#EDF5FD] border-b border-slate-200"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-xs font-mono uppercase tracking-wider text-[#0F76BB] font-bold mb-2">
              Atención prioritaria por WhatsApp · {CONTACT_INFO.whatsappNumber}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#002147] tracking-tight mb-3 text-balance">
              Prepara tu valoración urgente y solicitud de presupuesto
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              Marca el origen del siniestro, si necesitas lote prioritario de ropa diaria y tu situación con el seguro. Al abrir WhatsApp con <strong>Mimo</strong>, podrás enviarnos fotos rápidas para orientarte al momento.
            </p>
          </div>

          <div className="rounded-xl border border-[#0F76BB]/25 bg-white text-slate-900 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="siniestro-tipo"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  ¿Qué tipo de incidente ha ocurrido?
                </label>
                <select
                  id="siniestro-tipo"
                  value={tipoSiniestro}
                  onChange={(e) => setTipoSiniestro(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                >
                  <option value="Humo y olor en armario / vivienda (sin fuego directo en la ropa)">
                    Humo y olor en armario / vivienda
                  </option>
                  <option value="Incendio con depósito de hollín y ceniza">
                    Incendio con hollín y ceniza
                  </option>
                  <option value="Inundación, fuga de agua o humedad con riesgo de moho">
                    Inundación / fuga de agua / humedad
                  </option>
                  <option value="Combinado (fuego, humo y agua de extinción)">
                    Combinado (fuego + humo + agua)
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="siniestro-origen"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Origen aproximado (clave de triaje)
                </label>
                <select
                  id="siniestro-origen"
                  value={origenIncidente}
                  onChange={(e) => setOrigenIncidente(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                >
                  <option value="Por confirmar (humo doméstico / madera / eléctrico / agua)">
                    No lo sé aún / varios focos
                  </option>
                  <option value="Eléctrico / plásticos PVC (riesgo hollín ácido HCl)">
                    Eléctrico / cables / plásticos PVC
                  </option>
                  <option value="Cocina / aceites y proteínas">
                    Cocina / aceites y campana
                  </option>
                  <option value="Madera / papel / chimenea (hollín seco)">
                    Madera / papel / chimenea
                  </option>
                  <option value="Rotura de tubería / agua limpia o gris de extinción">
                    Rotura de tubería / agua de extinción
                  </option>
                </select>
              </div>
            </div>

            <div>
              <p className="block text-xs sm:text-sm font-bold text-[#002147] mb-2">
                Textiles afectados (marca los que necesites valorar)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {TEXTILES_SELECTOR.map((item) => {
                  const selected = textilesSeleccionados.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleTextil(item)}
                      aria-pressed={selected}
                      className={`min-h-[44px] flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-bold text-left transition-colors cursor-pointer ${
                        selected
                          ? 'border-[#0F76BB] bg-[#EDF5FD] text-[#002147]'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <Check
                        className={`w-3.5 h-3.5 shrink-0 ${
                          selected ? 'text-[#1FA855] opacity-100' : 'opacity-25'
                        }`}
                        aria-hidden="true"
                      />
                      <span className="truncate">{item}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="siniestro-seguro"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Situación con el seguro
                </label>
                <select
                  id="siniestro-seguro"
                  value={situacionSeguro}
                  onChange={(e) => setSituacionSeguro(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                >
                  <option value="Ya tengo parte o número de expediente con mi seguro">
                    Ya tengo parte / expediente abierto
                  </option>
                  <option value="El perito me pide presupuesto previo de tintorería">
                    El perito me pide presupuesto previo
                  </option>
                  <option value="Aún no he comunicado el parte (acaba de ocurrir)">
                    Acaba de ocurrir / aún no di parte
                  </option>
                  <option value="Tramitación particular sin intervención de seguro">
                    Particular sin seguro (pago directo)
                  </option>
                </select>
              </div>

              <div className="flex items-end">
                <label className="w-full min-h-[44px] flex items-center gap-3 px-4 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-xs sm:text-sm font-bold text-[#002147] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={necesitaLotePrioritario}
                    onChange={(e) => setNecesitaLotePrioritario(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-[#1FA855] focus:ring-[#1FA855]"
                  />
                  <span>Necesito lote prioritario (ropa de trabajo / colegio)</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="siniestro-localidad"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Localidad
                </label>
                <select
                  id="siniestro-localidad"
                  value={localidad}
                  onChange={(e) => setLocalidad(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                >
                  {ZONAS_SERVICIO.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                  <option value="Otra localidad del área de Vigo">
                    Otra localidad del área de Vigo
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="siniestro-modalidad"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Cómo prefieres gestionarlo
                </label>
                <select
                  id="siniestro-modalidad"
                  value={modalidad}
                  onChange={(e) => setModalidad(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-sm border border-slate-300 bg-slate-50 text-base sm:text-sm text-slate-900 focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
                >
                  <option value="Coordinar recogida urgente a domicilio en Vigo / comarca">
                    Recogida urgente a domicilio
                  </option>
                  <option value="Llevar los bultos a tienda propia Mimos (Navia, Gregorio Espino o Venezuela)">
                    Entregar en una tienda propia en Vigo
                  </option>
                  <option value="Depositar en punto colaborador de la comarca">
                    Depositar en punto colaborador
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="siniestro-obs"
                  className="block text-xs sm:text-sm font-bold text-[#002147] mb-1.5"
                >
                  Volumen / notas (opcional)
                </label>
                <input
                  id="siniestro-obs"
                  type="text"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Ej.: 2 armarios, 4 cortinas y 2 edredones"
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
                  trackWhatsAppClick(
                    '/limpieza-incendios-siniestros-vigo',
                    'service_detail_secondary',
                    {
                      service_id: 'recuperacion-siniestros',
                    }
                  )
                }
                className="flex-1 inline-flex items-center justify-center gap-2.5 min-h-[48px] bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm sm:text-base py-3 px-6 rounded-lg transition-colors shadow-xs"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Enviar parte urgente a Mimo por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-1.5 min-h-[48px] bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] px-4 py-3 rounded-lg text-xs font-bold cursor-pointer transition-colors whitespace-nowrap shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#1FA855]" aria-hidden="true" />
                    <span>Texto copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" aria-hidden="true" />
                    <span>Copiar resumen</span>
                  </>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <Store className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                <p>
                  <strong className="text-[#002147]">Sin pedido mínimo en tiendas propias:</strong>{' '}
                  {TIENDAS_PROPIAS.map((t) => t.direccion).join(' · ')}.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                <p>
                  <strong className="text-[#002147]">Recogida a domicilio:</strong> sujeta a ruta e importe mínimo según volumen y localidad de Vigo / comarca.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6B. DÓNDE ENTREGAR HOY EN VIGO (SIN PEDIDO MÍNIMO), QUÉ FOTOS TRAER Y RED COMARCA */}
      <section
        id="entrega-hoy"
        className="py-12 lg:py-16 bg-white border-b border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB]">
                Entrega inmediata hoy o recogida en Vigo y comarca
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight">
                Nuestras 3 tiendas propias en Vigo y puntos de la comarca
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Puedes acercar tus prendas en bolsas o cajas transpirables sin pedido mínimo a cualquiera de nuestras tiendas propias en Vigo. Si el volumen es grande, solicita recogida a domicilio con Mimo.
              </p>
            </div>
            <a
              href="/puntos-mimos"
              onClick={(e) => onNavigate('/puntos-mimos', e)}
              className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold text-[#0F76BB] hover:text-[#002147] hover:underline shrink-0"
            >
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Ver mapa completo de tiendas y puntos</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TIENDAS_PROPIAS.map((tienda) => {
              const tiendaHref =
                tienda.id === 'as-teixugueiras'
                  ? '/tienda-mimos-navia-vigo'
                  : tienda.id === 'gregorio-espino'
                  ? '/tienda-mimos-gregorio-espino-vigo'
                  : tienda.id === 'rua-venezuela'
                  ? '/tienda-mimos-venezuela-vigo'
                  : '/zonas/vigo';
              return (
                <article
                  key={tienda.id}
                  className="rounded-xl border border-slate-200 bg-[#F7F6F2] p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <p className="text-xs font-mono font-bold uppercase text-[#0F76BB]">
                      Tienda propia · {tienda.localidad}
                    </p>
                    <h3 className="text-lg font-extrabold text-[#002147]">
                      {tienda.nombre_mostrado}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 font-semibold">
                      {tienda.direccion} ({tienda.codigo_postal})
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <strong>Horario:</strong> {tienda.horario.resumen}
                    </p>
                    <p className="text-xs text-slate-600">
                      <strong>Tel.:</strong>{' '}
                      <a
                        href={`tel:+34${tienda.telefono}`}
                        className="font-bold text-[#002147] hover:underline tabular-nums"
                      >
                        {tienda.telefonos_mostrados}
                      </a>
                    </p>
                  </div>
                  <a
                    href={tiendaHref}
                    onClick={(e) => onNavigate(tiendaHref, e)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F76BB] hover:underline pt-2 border-t border-slate-200"
                  >
                    <span>Ver ficha de tienda y cómo llegar</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </article>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 rounded-xl border border-[#0F76BB]/20 bg-[#EDF5FD] p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB]">
                <Camera className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>3 fotos rápidas que aceleran tu valoración y el parte</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                <li>
                  <strong className="text-[#002147]">1. Foto general de las estancias o bultos:</strong> armario abierto, cortinas colgadas o ropa separada (sirve de prueba previa para el perito).
                </li>
                <li>
                  <strong className="text-[#002147]">2. Foto de cerca de hollín, moho o etiquetas delicadas:</strong> para orientarte desde WhatsApp sobre si conviene lavado o prueba de viabilidad previa.
                </li>
                <li>
                  <strong className="text-[#002147]">3. Listado o foto de las piezas más dañadas:</strong> nunca las deseches antes de documentarlas si vas a incluirlas en el certificado de pérdida total.
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-[#F7F6F2] p-6 space-y-3">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#002147]">
                Cobertura en Vigo y área de influencia
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                También atendemos consultas y puntos de entrega en comarca (
                {PUNTOS_COLABORADORES.map((p) => `${p.localidad}`).join(', ')} y área de Vigo):
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {ZONAS_RESUMEN.map((zona) => (
                  <a
                    key={zona.slug}
                    href={zona.url}
                    onClick={(e) => onNavigate(zona.url, e)}
                    className="inline-flex items-center min-h-[36px] px-2.5 py-1 rounded-lg border border-slate-300 bg-white text-xs font-bold text-[#002147] hover:border-[#0F76BB] transition-colors"
                  >
                    {zona.localidad}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONEXIÓN CON GUÍA TÉCNICA DEL BLOG + PREGUNTAS FRECUENTES */}
      <section className="py-12 lg:py-18 bg-[#F7F6F2] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB]">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>Documentación técnica extendida</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] tracking-tight">
                ¿Quieres profundizar en la química del humo, los COVs y la matriz completa por tejido?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Publicamos un artículo técnico detallado sobre la fisiología del daño por hollín, comparativa con métodos domésticos y los artículos aplicables de la Ley 50/1980.
              </p>
            </div>
            <a
              href="/blog/ropa-afectada-humo-incendio-siniestro-hogar"
              onClick={(e) => onNavigate('/blog/ropa-afectada-humo-incendio-siniestro-hogar', e)}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-5 py-3 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>Leer guía técnica del blog</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div>
            <div className="max-w-3xl mb-8 space-y-1">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB]">
                Dudas habituales sobre siniestros textiles y seguros
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] tracking-tight text-balance">
                Preguntas frecuentes sobre recuperación textil tras incendios o inundaciones en Vigo
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICIO_SINIESTROS_FAQS.map((faq) => (
                <details
                  key={faq.pregunta}
                  className="group rounded-xl border border-slate-200 bg-white p-5"
                >
                  <summary className="min-h-[44px] font-extrabold text-[#002147] cursor-pointer list-none flex items-center justify-between gap-4 text-sm sm:text-base">
                    <span>{faq.pregunta}</span>
                    <span className="text-[#0F76BB] font-mono text-lg group-open:rotate-45 transition-transform shrink-0">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed pt-3 border-t border-slate-200">
                    {faq.respuesta}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. ENLACES RELACIONADOS Y CIERRE */}
      <section className="py-12 lg:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] mb-6">
            Servicios complementarios en Tintorería Mimos Vigo
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <a
              href="/textiles-hogar-vigo"
              onClick={(e) => onNavigate('/textiles-hogar-vigo', e)}
              className="p-6 rounded-xl border border-slate-200 hover:border-[#0F76BB] bg-[#F7F6F2] flex flex-col justify-between group transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-extrabold text-[#002147] group-hover:text-[#0F76BB]">
                    Edredones, cortinas y estores
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Higienización de gran formato para edredones de plumas, mantas, estores de tela y cortinas (con desmontaje y colocación).
                </p>
              </div>
            </a>

            <a
              href="/limpieza-alfombras-vigo"
              onClick={(e) => onNavigate('/limpieza-alfombras-vigo', e)}
              className="p-6 rounded-xl border border-slate-200 hover:border-[#0F76BB] bg-[#F7F6F2] flex flex-col justify-between group transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-extrabold text-[#002147] group-hover:text-[#0F76BB]">
                    Limpieza de alfombras en Vigo
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Retirada de hollín, ceniza y humedad en alfombras mediante taller especialista colaborador con recogida a domicilio o entrega en tienda.
                </p>
              </div>
            </a>

            <a
              href="/reparacion-alfombras-vigo"
              onClick={(e) => onNavigate('/reparacion-alfombras-vigo', e)}
              className="p-6 rounded-xl border border-slate-200 hover:border-[#0F76BB] bg-[#F7F6F2] flex flex-col justify-between group transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-extrabold text-[#002147] group-hover:text-[#0F76BB]">
                    Reparación de alfombras
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Arreglo y restauración de flecos, festón lateral y ribetes mediante restaurador colaborador (independiente o con limpieza).
                </p>
              </div>
            </a>

            <a
              href="/limpieza-pieles-cuero-vigo"
              onClick={(e) => onNavigate('/limpieza-pieles-cuero-vigo', e)}
              className="p-6 rounded-xl border border-slate-200 hover:border-[#0F76BB] bg-[#F7F6F2] flex flex-col justify-between group transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-extrabold text-[#002147] group-hover:text-[#0F76BB]">
                    Limpieza de pieles, cuero y ante
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Valoración individualizada y prueba técnica para cazadoras de cuero, ante o peletería expuestas a humedad o humo.
                </p>
              </div>
            </a>
          </div>

          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <a
              href="/"
              onClick={(e) => onNavigate('/', e)}
              className="inline-flex items-center gap-2 min-h-[44px] text-sm font-bold text-[#002147] hover:text-[#0F76BB]"
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
                  trackWhatsAppClick(
                    '/limpieza-incendios-siniestros-vigo',
                    'service_detail_footer',
                    {
                      service_id: 'recuperacion-siniestros',
                    }
                  )
                }
                className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-[#1FA855] hover:bg-[#178A47] text-white font-bold text-sm px-5 py-3 rounded-lg transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Consultar siniestro con Mimo</span>
              </a>
              <a
                href={CONTACT_INFO.phoneHref}
                onClick={() =>
                  trackPhoneClick('/limpieza-incendios-siniestros-vigo', 'service_detail')
                }
                className="inline-flex items-center justify-center gap-2 min-h-[48px] bg-white/95 border border-[#002147] hover:bg-[#002147] hover:text-white text-[#002147] font-bold text-sm px-4 py-3 rounded-lg transition-colors group tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#0F76BB] group-hover:text-white" aria-hidden="true" />
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
