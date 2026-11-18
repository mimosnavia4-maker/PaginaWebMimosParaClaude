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
import {
  CONTACT_INFO,
  IMAGES,
  PUNTOS_COLABORADORES,
  SERVICIO_SINIESTROS_FAQS,
  TIENDAS_PROPIAS,
  ZONAS_SEO_LOCAL,
  ZONAS_SERVICIO,
  buildMimoWhatsAppUrl,
} from '../data/mimosData';
import { trackPhoneClick, trackWhatsAppClick } from '../utils/analytics';
import { exportInventarioExcel, exportInventarioPdf } from '../utils/inventoryExport';

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
      'Desempolvado mecánico en seco en central de Navia, desengrase controlado y verificación sensorial antes de entregar.',
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
      'Limpieza profunda de alfombras en central de Navia, coordinación de reparación de flecos y ribetes mediante restaurador colaborador, y valoración individual o prueba piloto para piel, cuero y ante.',
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
  const [heroImgError, setHeroImgError] = useState(false);

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
      className="focus:outline-hidden bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800"
    >
      {/* 1. CABECERA ESPECIALIZADA DE URGENCIA TEXTIL */}
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
              <li className="text-[#60B5F6] font-bold">
                Recuperación textil tras incendios, humo e inundaciones
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono uppercase tracking-wider text-[#60B5F6] font-bold">
                <span>Servicio técnico en Vigo</span>
                <span aria-hidden="true">·</span>
                <span>Exclusivamente ropa y textiles</span>
                <span aria-hidden="true">·</span>
                <span>CIF {CONTACT_INFO.cif}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12] text-balance">
                Recuperación textil tras incendios, humo e inundaciones en Vigo
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
                Rescatamos armarios completos, abrigos, trajes, cortinas, edredones y alfombras afectados por humo, hollín o agua en hogares, comercios y comunidades de Vigo y comarca. Triaje honesto con prueba de viabilidad previa, lote prioritario y factura oficial con CIF para el seguro.
              </p>

              <div className="p-4 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-slate-100 leading-relaxed">
                <strong>Alcance 100 % textil (sin limpieza estructural de vivienda):</strong> actuamos únicamente sobre tu vestuario y textiles recuperables. No realizamos limpieza de obra en paredes, techos, suelos ni retirada de escombros.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
                <div className="rounded-lg bg-white/5 border border-white/10 px-3.5 py-2.5">
                  <p className="font-mono font-bold text-[#60B5F6] uppercase">Ciclo habitual</p>
                  <p className="font-bold text-white mt-0.5">1 a 3 semanas</p>
                </div>
                <div className="rounded-lg bg-white/5 border border-white/10 px-3.5 py-2.5">
                  <p className="font-mono font-bold text-[#60B5F6] uppercase">Urgencia diaria</p>
                  <p className="font-bold text-white mt-0.5">Lote prioritario trabajo/colegio</p>
                </div>
                <div className="rounded-lg bg-white/5 border border-white/10 px-3.5 py-2.5">
                  <p className="font-mono font-bold text-[#60B5F6] uppercase">Piezas críticas</p>
                  <p className="font-bold text-white mt-0.5">Prueba de viabilidad previa</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackWhatsAppClick('/limpieza-incendios-siniestros-vigo', 'service_detail', {
                      service_id: 'recuperacion-siniestros',
                    })
                  }
                  className="inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base px-6 py-4 rounded-xl transition-colors text-center sm:whitespace-nowrap shrink-0"
                >
                  <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                  <span>Consulta urgente con Mimo</span>
                </a>

                <a
                  href="#herramientas-seguro"
                  className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white text-white font-bold text-sm sm:text-base px-5 py-4 rounded-xl transition-colors text-center sm:whitespace-nowrap shrink-0"
                >
                  <ClipboardList className="w-4 h-4 text-[#60B5F6] shrink-0" aria-hidden="true" />
                  <span>Plantilla inventario y carta seguro</span>
                </a>
              </div>

              <p className="text-xs sm:text-sm text-slate-300">
                Urgencias telefónicas en horario comercial:{' '}
                <a
                  href={CONTACT_INFO.phoneHref}
                  onClick={() =>
                    trackPhoneClick('/limpieza-incendios-siniestros-vigo', 'hero')
                  }
                  className="text-white font-bold underline underline-offset-4 hover:text-[#60B5F6] tabular-nums"
                >
                  {CONTACT_INFO.phoneDisplay}
                </a>{' '}
                · Atención directa en Navia, Gregorio Espino y Venezuela.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col">
              <figure className="h-full rounded-2xl overflow-hidden border border-white/15 bg-[#071936] flex flex-col">
                {heroImgError ? (
                  <div className="aspect-4/3 lg:flex-1 bg-gradient-to-br from-[#071936] to-[#0b274f] flex flex-col items-center justify-center p-6 text-center text-slate-300">
                    <Flame className="w-10 h-10 text-[#60B5F6] mb-3" aria-hidden="true" />
                    <p className="font-bold text-white text-sm">
                      Recuperación textil especializada tras humo, hollín e inundación
                    </p>
                    <p className="text-xs text-slate-300 mt-1">
                      Triaje técnico, neutralización y documentación oficial en Tintorería Mimos Vigo
                    </p>
                  </div>
                ) : (
                  <img
                    src={IMAGES.blogSiniestrosIncendio}
                    alt="Especialista de Tintorería Mimos revisando abrigos y prendas tras un siniestro de humo en taller de Vigo"
                    width={800}
                    height={600}
                    fetchPriority="high"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgError(true)}
                    className="w-full aspect-4/3 lg:flex-1 object-cover"
                  />
                )}
                <figcaption className="p-4 text-xs text-slate-300 border-t border-white/10">
                  Inspección pieza a pieza en nuestra central de Navia para dictaminar qué prendas admiten recuperación tras prueba previa y cuáles requieren certificado de pérdida total.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* BARRA RÁPIDA PARA USUARIOS EN URGENCIA + 4 CASOS REALES EN VIGO */}
      <div className="bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Atajos según tu situación actual" className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1">
              Ir directo a:
            </span>
            <a
              href="#primeras-horas"
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#0b1d36] hover:bg-[#002147] hover:text-white text-[#002147] dark:text-slate-200 font-bold transition-colors"
            >
              1. Qué NO hacer ahora (24–48 h)
            </a>
            <a
              href="#casos-cotidianos"
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#0b1d36] hover:bg-[#002147] hover:text-white text-[#002147] dark:text-slate-200 font-bold transition-colors"
            >
              2. Casos frecuentes y cómo valoramos
            </a>
            <a
              href="#herramientas-seguro"
              className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#0b1d36] hover:bg-[#002147] hover:text-white text-[#002147] dark:text-slate-200 font-bold transition-colors"
            >
              3. Plantilla 5 días y carta al seguro
            </a>
            <a
              href="#entrega-hoy"
              className="px-3 py-1.5 rounded-lg bg-[#178A47]/10 dark:bg-emerald-950/40 hover:bg-[#178A47] hover:text-white text-[#178A47] dark:text-emerald-300 font-bold transition-colors"
            >
              4. Dónde entregar HOY en Vigo (horarios)
            </a>
          </nav>
        </div>
      </div>

      <section
        id="casos-cotidianos"
        className="py-12 lg:py-16 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="space-y-1.5">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Casos cotidianos en pisos y locales de Vigo
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                4 incidentes habituales que rescatamos — y cómo presupuestamos sin sorpresas
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-4 space-y-1">
                <p className="font-extrabold text-[#002147] dark:text-white">
                  1. Humareda en cocina o piso de un vecino
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  El olor entra en armarios cerrados sin quemar la tela. Desengrase lipofílico + oxígeno activo sin lavar poliéster en caliente (&gt;40 °C).
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-4 space-y-1">
                <p className="font-extrabold text-[#002147] dark:text-white">
                  2. Cuadro eléctrico, caldera o plásticos
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Humo corrosivo (HCl) y hollín untuoso: aspiración en seco obligatoria y neutralización rápida antes de 48 h.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-4 space-y-1">
                <p className="font-extrabold text-[#002147] dark:text-white">
                  3. Rotura de latiguillo o fuga del piso de arriba
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Con la humedad de Vigo el moho brota en 24–48 h: separación de tintes, higienización y secado técnico fuera de tu vivienda.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-4 space-y-1">
                <p className="font-extrabold text-[#002147] dark:text-white">
                  4. Agua de extinción, garaje o local comercial
                </p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Rescate textil de cortinajes, alfombras o género afectado solo por humo/agua recuperable, y certificado de descarte si hubo aguas fecales.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#0F76BB]/30 bg-[#0F76BB]/5 dark:bg-[#0b1d36] p-4 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              <strong>Cómo valoramos antes de gastar:</strong> envíanos primero fotos a Mimo por WhatsApp o acércate a tienda para orientarte. Tras revisar el lote, emitimos <strong>presupuesto previo cerrado</strong> antes de lavar el grueso y, en piezas críticas (cuero, sedas, pluma), te consultamos antes de realizar una prueba técnica de viabilidad puntual.
            </div>
          </div>

          <div className="lg:col-span-5">
            <figure className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0b1d36]">
              <img
                src={IMAGES.servicioTintoreria}
                alt="Trajes, abrigos y prendas delicadas en taller profesional de Tintorería Mimos Vigo tras triaje y cuidado textil"
                width={800}
                height={600}
                loading="lazy"
                className="w-full aspect-4/3 object-cover"
              />
              <figcaption className="p-4 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200 dark:border-slate-800">
                Tratamiento individualizado por fibra en nuestro taller de Vigo: separamos vestuario diario prioritario, sastrería y cortinajes para emitir factura oficial desglosada.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* 2. QUÉ HACER Y QUÉ NO HACER + QUÍMICA POR TIPO DE RESIDUO */}
      <section
        id="primeras-horas"
        className="py-14 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <div className="max-w-3xl mb-8 space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Protocolo crítico de las primeras 24–48 horas
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                Qué SÍ hacer y qué NO hacer para no inutilizar el tejido ni perder cobertura
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                El éxito del rescate textil cae bruscamente pasada la ventana crítica de 24 a 72 horas por corrosión ácida, termofijación de gases o germinación de moho en el clima húmedo de Vigo.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
              <article className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-[#071324] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-emerald-700 dark:text-emerald-400 mb-5">
                    <CheckCircle2 className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white">
                      Qué SÍ hacer de inmediato
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {PROTOCOLO_QUE_SI.map((paso, idx) => (
                      <li
                        key={paso.titulo}
                        className="flex items-start gap-3.5 pb-4 last:pb-0 border-b last:border-b-0 border-slate-100 dark:border-slate-800"
                      >
                        <span className="text-xs font-mono font-bold text-[#178A47] dark:text-emerald-400 tabular-nums pt-0.5 shrink-0">
                          0{idx + 1}.
                        </span>
                        <div>
                          <p className="text-sm sm:text-base font-extrabold text-[#002147] dark:text-white mb-1">
                            {paso.titulo}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                            {paso.texto}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              <article className="rounded-2xl border border-red-200 dark:border-red-900/60 bg-white dark:bg-[#071324] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 text-red-700 dark:text-red-400 mb-5">
                    <XCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white">
                      Qué NO hacer bajo ningún concepto
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {PROTOCOLO_QUE_NO.map((error, idx) => (
                      <li
                        key={error.titulo}
                        className="flex items-start gap-3.5 pb-4 last:pb-0 border-b last:border-b-0 border-slate-100 dark:border-slate-800"
                      >
                        <span className="text-xs font-mono font-bold text-red-600 dark:text-red-400 tabular-nums pt-0.5 shrink-0">
                          0{idx + 1}.
                        </span>
                        <div>
                          <p className="text-sm sm:text-base font-extrabold text-[#002147] dark:text-white mb-1">
                            {error.titulo}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
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
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-1 max-w-2xl">
                <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  Diagnóstico químico según qué ardió
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                  No todos los humos se limpian igual: selecciona el origen del incidente
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
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
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer whitespace-nowrap ${
                        activo
                          ? 'bg-[#002147] border-[#002147] text-white dark:bg-[#0F76BB] dark:border-[#0F76BB]'
                          : 'bg-slate-50 dark:bg-[#0a1b33] border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:border-[#0F76BB]'
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
                <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  {residuoSeleccionado.subtitulo}
                </p>
                <h4 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white">
                  {residuoSeleccionado.titulo}
                </h4>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 dark:text-amber-400">
                  <Clock className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Ventana crítica: {residuoSeleccionado.ventanaCritica}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {residuoSeleccionado.quimica}
                </p>
                <div className="p-3.5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50/70 dark:bg-red-950/25 text-xs text-red-900 dark:text-red-200 leading-relaxed">
                  <strong>Atención:</strong> {residuoSeleccionado.prohibicionClave}
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a1b33] p-5 space-y-2">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#002147] dark:text-white">
                    Impacto por fibra y pieles
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {residuoSeleccionado.impactoFibras}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a1b33] p-5 space-y-2">
                  <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#178A47] dark:text-emerald-400">
                    Secuencia técnica en Mimos Navia
                  </p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {residuoSeleccionado.secuenciaMimos}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ALCANCE TEXTIL + MÓDULO INUNDACIONES EN CLIMA DE VIGO (AEMET) Y 3 CATEGORÍAS DE AGUA */}
      <section className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <div className="max-w-3xl mb-8 space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Especialización estrictamente textil · Particulares, comercios y comunidades
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                Qué recuperamos en nuestro taller de Vigo y qué queda fuera de alcance
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                A diferencia de las contratas de limpieza general de obra, concentramos toda nuestra técnica y maquinaria textil exclusivamente en ropa y tejidos recuperables del hogar o empresa.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {QUE_SI_HACEMOS_TEXTIL.map((bloque) => (
                <article
                  key={bloque.num}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-6"
                >
                  <p className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] tabular-nums mb-2">
                    {bloque.num}. ÁREA TEXTIL
                  </p>
                  <h3 className="text-lg font-extrabold text-[#002147] dark:text-white mb-2">
                    {bloque.titulo}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {bloque.detalle}
                  </p>
                </article>
              ))}
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a1b33] p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-5 space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                    <AlertTriangle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Claridad de servicio</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white">
                    Límites honestos de esta intervención
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Si necesitas saneamiento de obra o carpintería del inmueble, conviene coordinar con tu aseguradora un equipo estructural mientras nosotros salvamos todo el vestuario y los textiles.
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                    {NO_HACEMOS_ALCANCE.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <XCircle
                          className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0 mt-0.5"
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
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0a1b33] p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                  <CloudRain className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Inundaciones y agua de extinción en el clima de Vigo</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                  Por qué tender ropa mojada en casa en Vigo dispara el moho en 24–48 horas
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Sin secado técnico ni deshumidificación, un armario empapado por una rotura de tubería o por agua de bomberos no logra evaporar a tiempo dentro del clima atlántico de la ría de Vigo. Pasadas las 48 horas, la germinación fúngica y la migración de tintes degradan las fibras orgánicas.
                </p>
              </div>

              <div className="lg:col-span-5 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#071324] p-3.5">
                  <p className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white tabular-nums">
                    77 %
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                    Humedad media anual Vigo (AEMET)
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#071324] p-3.5">
                  <p className="text-lg sm:text-xl font-extrabold text-[#0F76BB] dark:text-[#60B5F6] tabular-nums">
                    81–84 %
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                    Humedad media oct–ene (picos 95 %)
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#071324] p-3.5">
                  <p className="text-lg sm:text-xl font-extrabold text-amber-700 dark:text-amber-400 tabular-nums">
                    24–48 h
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                    Margen antes del brote de moho
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {CATEGORIAS_AGUA_VIGO.map((cat) => (
                <article
                  key={cat.categoria}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-5 flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <span
                      className={`inline-block text-xs font-mono font-bold ${
                        cat.estado === 'Recuperable'
                          ? 'text-[#178A47] dark:text-emerald-400'
                          : cat.estado === 'Bajo condición técnica'
                          ? 'text-amber-700 dark:text-amber-400'
                          : 'text-red-700 dark:text-red-400'
                      }`}
                    >
                      {cat.estado.toUpperCase()}
                    </span>
                    <h4 className="text-base font-extrabold text-[#002147] dark:text-white">
                      {cat.categoria}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>Origen:</strong> {cat.origenVigo}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>Evolución:</strong> {cat.riesgoBiologico}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-[#002147] dark:text-slate-200 pt-3 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                    <strong>Criterio técnico:</strong> {cat.dictamen}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. MATRIZ DE TRIAJE TÉCNICO + PROCESO EN 5 FASES + COMPROMISOS DE PLAZO Y LOTE PRIORITARIO */}
      <section className="py-14 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Triaje técnico profesional
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                Prendas recuperables frente a informe de pérdida total
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Nunca te cobraremos lavados inútiles en prendas sin viabilidad: diagnosticamos por material, tipo de hollín o agua qué admite descontaminación y qué debe certificarse como irrecuperable.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filtrar matriz por tipo de siniestro"
              className="inline-flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-700 shrink-0 self-start"
            >
              <button
                type="button"
                onClick={() => setFiltroMatriz('todos')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filtroMatriz === 'todos'
                    ? 'bg-[#002147] text-white dark:bg-[#0F76BB]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#002147] dark:hover:text-white'
                }`}
              >
                Todos los casos
              </button>
              <button
                type="button"
                onClick={() => setFiltroMatriz('humo')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filtroMatriz === 'humo'
                    ? 'bg-[#002147] text-white dark:bg-[#0F76BB]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#002147] dark:hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Humo e incendio</span>
              </button>
              <button
                type="button"
                onClick={() => setFiltroMatriz('agua')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  filtroMatriz === 'agua'
                    ? 'bg-[#002147] text-white dark:bg-[#0F76BB]'
                    : 'text-slate-600 dark:text-slate-300 hover:text-[#002147] dark:hover:text-white'
                }`}
              >
                <Droplets className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Inundación y moho</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] mb-12">
            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-left text-xs sm:text-sm">
              <thead className="bg-[#002147] text-white">
                <tr>
                  <th scope="col" className="px-4 py-3.5 font-bold">
                    Tipo de textil / escenario
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-bold">
                    Afección observada
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-bold">
                    Dictamen técnico
                  </th>
                  <th scope="col" className="px-4 py-3.5 font-bold">
                    Actuación en Tintorería Mimos
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
                {filasFiltradas.map((fila) => (
                  <tr key={fila.categoria} className="hover:bg-slate-50/70 dark:hover:bg-white/[0.02]">
                    <td className="px-4 py-4 font-extrabold text-[#002147] dark:text-white align-top">
                      {fila.categoria}
                    </td>
                    <td className="px-4 py-4 align-top leading-relaxed">{fila.afeccion}</td>
                    <td className="px-4 py-4 align-top">
                      <span
                        className={`inline-flex items-center gap-1.5 font-bold text-xs ${
                          fila.estado === 'Recuperable'
                            ? 'text-[#178A47] dark:text-emerald-400'
                            : fila.estado === 'Valoración previa'
                            ? 'text-amber-700 dark:text-amber-400'
                            : 'text-red-700 dark:text-red-400'
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
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
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
            <h3 className="text-lg sm:text-xl font-extrabold text-[#002147] dark:text-white">
              Nuestro protocolo técnico en 5 fases en Navia (Vigo)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {FASES_TALLER_MIMOS.map((fase) => (
                <article
                  key={fase.num}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-5"
                >
                  <p className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] tabular-nums mb-1.5">
                    FASE {fase.num}
                  </p>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#002147] dark:text-white mb-2">
                    {fase.titulo}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {fase.descripcion}
                  </p>
                </article>
              ))}
            </div>

            {/* 3 compromisos operativos confirmados */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="rounded-xl border border-[#0F76BB]/30 bg-white dark:bg-[#071324] p-5">
                <p className="text-xs font-mono font-bold uppercase text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                  Plazo orientativo completo
                </p>
                <h4 className="text-base font-extrabold text-[#002147] dark:text-white mb-1">
                  Entre 1 y 3 semanas
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Dependiendo del volumen del armario y las pasadas necesarias de desengrase, neutralización molecular y verificación en seco.
                </p>
              </div>
              <div className="rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-[#071324] p-5">
                <p className="text-xs font-mono font-bold uppercase text-[#178A47] dark:text-emerald-400 mb-1">
                  Para que sigas con tu día a día
                </p>
                <h4 className="text-base font-extrabold text-[#002147] dark:text-white mb-1">
                  Lote prioritario diario y escolar
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Separamos y adelantamos vestuario de trabajo, uniformes escolares y básicos urgentes mientras procesamos el resto de lotes.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-5">
                <p className="text-xs font-mono font-bold uppercase text-[#0F76BB] dark:text-[#60B5F6] mb-1">
                  Transparencia antes de facturar el grueso
                </p>
                <h4 className="text-base font-extrabold text-[#002147] dark:text-white mb-1">
                  Prueba de viabilidad previa
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
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
        className="py-14 lg:py-20 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 space-y-3">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Tramitación con aseguradoras y peritos · Ley 50/1980
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                Factura oficial desglosada con CIF y expediente pericial completo
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                En <strong>{CONTACT_INFO.legalName}</strong> (<strong>CIF {CONTACT_INFO.cif}</strong>) estructuramos todo el expediente textil para que tanto el perito como tu compañía (Mapfre, AXA, Allianz, Generali, SegurCaixa, Mutua, Línea Directa, etc.) lo aprueben sin devoluciones por falta de desglose.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Clave económica frente a la reposición:</strong> muchas pólizas liquidan la ropa usada a <em>valor real</em> (aplicando depreciación por antigüedad, Art. 26 LCS). En cambio, la limpieza técnica actúa como <strong>Gasto de Salvamento (Art. 17)</strong> y evita ese recorte siempre que resulte proporcionada, sin perjuicio de reglas de infraseguro (Art. 30) o franquicia pactada.
              </p>
            </div>

            <div className="lg:col-span-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0b1d36] p-6 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 font-extrabold text-[#002147] dark:text-white">
                <ShieldCheck className="w-4 h-4 text-[#178A47] shrink-0" aria-hidden="true" />
                <span>Tus derechos clave bajo la Ley 50/1980 de Contrato de Seguro</span>
              </div>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Aviso e inventario en plazo (Arts. 16 y 38):</strong> comunica el siniestro cuanto antes (plazo legal 7 días; aconsejable &lt;72 h) y entrega relación escrita de bienes afectados dentro de los <strong>5 días siguientes</strong>.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Salvamento urgente (Art. 17):</strong> retirar y contener en seco antes de que la acidez (HCl) o el moho en Vigo destruyan el tejido cumple el deber de aminorar daños —incluso si una prueba técnica fracasa—.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                <strong>Frente a contratas de obra (Art. 18) y peritación (Art. 38):</strong> la aseguradora no puede imponer reparación con sus propios medios <em>“si el asegurado no lo consiente”</em>, y ante desacuerdo puedes designar perito de parte.
              </p>
            </div>
          </div>

          {/* 5 Documentos del expediente pericial */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {DOCUMENTACION_SEGURO.map((doc) => (
              <article
                key={doc.num}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-5"
              >
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-mono font-bold text-[#0F76BB] dark:text-[#60B5F6] tabular-nums">
                    DOC. {doc.num}
                  </span>
                  <FileCheck2 className="w-4 h-4 text-[#0F76BB] dark:text-[#60B5F6]" aria-hidden="true" />
                </div>
                <h3 className="text-base font-extrabold text-[#002147] dark:text-white mb-1.5">
                  {doc.titulo}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {doc.descripcion}
                </p>
              </article>
            ))}
          </div>

          {/* HERRAMIENTAS INTERACTIVAS CONTRA LA PARÁLISIS DEL AFECTADO */}
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a1b33] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
              <div className="space-y-1 max-w-2xl">
                <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                  Utilidades gratuitas para desbloquear tu expediente hoy mismo
                </p>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white">
                  Prepara tu pre-inventario de 5 días (Art. 38) o tu carta para el seguro
                </h3>
              </div>

              <div
                role="tablist"
                aria-label="Herramientas documentales para el asegurado"
                className="inline-flex items-center gap-1 p-1 rounded-xl bg-white dark:bg-[#071324] border border-slate-200 dark:border-slate-700 self-start"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={herramientaActiva === 'inventario'}
                  onClick={() => setHerramientaActiva('inventario')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    herramientaActiva === 'inventario'
                      ? 'bg-[#002147] text-white dark:bg-[#0F76BB]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#002147] dark:hover:text-white'
                  }`}
                >
                  1. Plantilla Pre-Inventario (Art. 38)
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={herramientaActiva === 'carta'}
                  onClick={() => setHerramientaActiva('carta')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    herramientaActiva === 'carta'
                      ? 'bg-[#002147] text-white dark:bg-[#0F76BB]'
                      : 'text-slate-600 dark:text-slate-300 hover:text-[#002147] dark:hover:text-white'
                  }`}
                >
                  2. Carta Modelo Aseguradora (Arts. 17 y 18)
                </button>
              </div>
            </div>

            {herramientaActiva === 'inventario' ? (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    Agrupa tus prendas por habitación para cumplir el plazo de <strong>5 días</strong> del Art. 38 LCS y descarga el documento con cabecera oficial de Tintorería Mimos en <strong>PDF</strong> o <strong>Excel (.xlsx)</strong> para tu aseguradora o para enviárnoslo directamente.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => cargarLoteTipo('dormitorio')}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-[#002147] dark:text-slate-200 hover:border-[#0F76BB] cursor-pointer"
                    >
                      + Añadir dormitorio tipo
                    </button>
                    <button
                      type="button"
                      onClick={() => cargarLoteTipo('hogar')}
                      className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-[#002147] dark:text-slate-200 hover:border-[#0F76BB] cursor-pointer"
                    >
                      + Añadir alfombra / pieles
                    </button>
                  </div>
                </div>

                {/* Datos opcionales del cliente y del expediente (aparecen en PDF, Excel, Email y WhatsApp) */}
                <div className="bg-white dark:bg-[#071324] p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-bold text-[#002147] dark:text-white uppercase tracking-wider">
                      Datos del asegurado / expediente (opcional — se incluirán en el PDF y el Excel)
                    </p>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      Solo se generan en tu navegador; no almacenamos datos en servidor
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    <div>
                      <label htmlFor="inv-nombre" className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                        Tu nombre y apellidos
                      </label>
                      <input
                        id="inv-nombre"
                        type="text"
                        value={invNombre}
                        onChange={(e) => setInvNombre(e.target.value)}
                        placeholder="Ej.: María García..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a1b33] text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                      />
                    </div>
                    <div>
                      <label htmlFor="inv-telefono" className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                        Teléfono de contacto
                      </label>
                      <input
                        id="inv-telefono"
                        type="tel"
                        value={invTelefono}
                        onChange={(e) => setInvTelefono(e.target.value)}
                        placeholder="Ej.: 600 123 456"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a1b33] text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                      />
                    </div>
                    <div>
                      <label htmlFor="inv-localidad" className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                        Localidad o tienda
                      </label>
                      <input
                        id="inv-localidad"
                        type="text"
                        value={invLocalidad}
                        onChange={(e) => setInvLocalidad(e.target.value)}
                        placeholder="Vigo / Navia / Comarca..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a1b33] text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                      />
                    </div>
                    <div>
                      <label htmlFor="inv-aseguradora" className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                        Aseguradora (si aplica)
                      </label>
                      <input
                        id="inv-aseguradora"
                        type="text"
                        value={invAseguradora}
                        onChange={(e) => setInvAseguradora(e.target.value)}
                        placeholder="Ej.: Mapfre, Allianz..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a1b33] text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                      />
                    </div>
                    <div>
                      <label htmlFor="inv-siniestro" className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                        Nº Siniestro o póliza
                      </label>
                      <input
                        id="inv-siniestro"
                        type="text"
                        value={invSiniestro}
                        onChange={(e) => setInvSiniestro(e.target.value)}
                        placeholder="Ej.: SIN-2026-..."
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a1b33] text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                      />
                    </div>
                  </div>
                </div>

                <form
                  onSubmit={agregarFilaInventario}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white dark:bg-[#071324] p-4 rounded-xl border border-slate-200 dark:border-slate-800"
                >
                  <div className="sm:col-span-3">
                    <label htmlFor="inv-estancia" className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Estancia / armario
                    </label>
                    <input
                      id="inv-estancia"
                      type="text"
                      value={nuevaEstancia}
                      onChange={(e) => setNuevaEstancia(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a1b33] text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <label htmlFor="inv-prenda" className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Prenda o textil afectado
                    </label>
                    <input
                      id="inv-prenda"
                      type="text"
                      value={nuevaPrenda}
                      onChange={(e) => setNuevaPrenda(e.target.value)}
                      placeholder="Ej.: 2 trajes lana, 1 edredón pluma..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a1b33] text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    />
                  </div>
                  <div className="sm:col-span-1">
                    <label htmlFor="inv-uds" className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Uds.
                    </label>
                    <input
                      id="inv-uds"
                      type="number"
                      min={1}
                      value={nuevasUnidades}
                      onChange={(e) => setNuevasUnidades(Math.max(1, Number(e.target.value) || 1))}
                      className="w-full px-2.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a1b33] text-xs font-medium tabular-nums focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label htmlFor="inv-estado" className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 mb-1">
                      Daño observado
                    </label>
                    <select
                      id="inv-estado"
                      value={nuevoEstado}
                      onChange={(e) => setNuevoEstado(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a1b33] text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
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
                      className="w-full inline-flex items-center justify-center gap-1 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] text-white font-bold text-xs px-3 py-2 rounded-lg transition-colors cursor-pointer"
                    >
                      <Plus className="w-4 h-4" aria-hidden="true" />
                      <span className="sm:hidden">Añadir</span>
                    </button>
                  </div>
                </form>

                <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324]">
                  <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                    <thead className="bg-slate-100 dark:bg-[#0b1d36] text-[#002147] dark:text-white">
                      <tr>
                        <th className="px-3.5 py-2.5 text-left font-bold">Estancia</th>
                        <th className="px-3.5 py-2.5 text-left font-bold">Prenda / textil</th>
                        <th className="px-3.5 py-2.5 text-left font-bold">Uds.</th>
                        <th className="px-3.5 py-2.5 text-left font-bold">Estado</th>
                        <th className="px-3.5 py-2.5 text-right font-bold">Quitar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-slate-700 dark:text-slate-300">
                      {itemsInventario.map((item) => (
                        <tr key={item.id}>
                          <td className="px-3.5 py-2.5 font-semibold">{item.estancia}</td>
                          <td className="px-3.5 py-2.5">{item.prenda}</td>
                          <td className="px-3.5 py-2.5 font-bold tabular-nums">{item.unidades}</td>
                          <td className="px-3.5 py-2.5">{item.estado}</td>
                          <td className="px-3.5 py-2.5 text-right">
                            <button
                              type="button"
                              onClick={() => eliminarFilaInventario(item.id)}
                              aria-label={`Eliminar ${item.prenda}`}
                              className="text-slate-400 hover:text-red-600 cursor-pointer p-1"
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
                <div className="rounded-xl border border-[#0F76BB]/25 bg-white dark:bg-[#071324] p-4 sm:p-5 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                        Recepción directa en {CONTACT_INFO.legalName} · CIF {CONTACT_INFO.cif}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        Envíanos tu inventario por WhatsApp o adjunta el PDF/Excel por email para preparar valoración previa, prueba de viabilidad y recogida en Vigo.
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                      <a
                        href={CONTACT_INFO.phoneHref}
                        onClick={() =>
                          trackPhoneClick('/limpieza-incendios-siniestros-vigo', 'inventory_contact_bar')
                        }
                        className="inline-flex items-center gap-1.5 text-[#002147] dark:text-white hover:text-[#0F76BB]"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#0F76BB]" aria-hidden="true" />
                        <span>{CONTACT_INFO.phoneDisplay}</span>
                      </a>
                      <a
                        href={`mailto:${CONTACT_INFO.email}`}
                        className="inline-flex items-center gap-1.5 text-[#002147] dark:text-white hover:text-[#0F76BB]"
                      >
                        <Mail className="w-3.5 h-3.5 text-[#0F76BB]" aria-hidden="true" />
                        <span>{CONTACT_INFO.email}</span>
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                    {TIENDAS_PROPIAS.map((tienda) => (
                      <div key={tienda.id} className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                        <span className="font-bold text-[#002147] dark:text-white block">
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
                    className="rounded-lg border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-semibold text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
                  >
                    {exportError}
                  </div>
                )}

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  <p className="text-xs font-bold text-[#002147] dark:text-white tabular-nums">
                    Total provisional en borrador: {totalPrendasInventario} unidad(es) en {itemsInventario.length} lote(s)
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    <button
                      type="button"
                      onClick={descargarPdfInventario}
                      disabled={exportandoPdf || itemsInventario.length === 0}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] text-xs font-bold text-white cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#002147] dark:border-[#60B5F6] bg-white dark:bg-[#071324] text-xs font-bold text-[#002147] dark:text-[#60B5F6] hover:bg-slate-100 dark:hover:bg-[#0b1d36] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
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
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#178A47] hover:bg-[#126E38] text-xs font-bold text-white transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" aria-hidden="true" />
                      <span>Enviar por WhatsApp</span>
                    </a>
                    <a
                      href={mailtoInventarioHref}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-xs font-bold text-[#002147] dark:text-white hover:border-[#0F76BB]"
                    >
                      <Mail className="w-4 h-4 text-[#0F76BB]" aria-hidden="true" />
                      <span>Enviar por Email</span>
                    </a>
                    <button
                      type="button"
                      onClick={copiarInventario}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-xs font-bold text-[#002147] dark:text-white hover:border-[#0F76BB] cursor-pointer"
                    >
                      {inventarioCopiado ? (
                        <>
                          <Check className="w-4 h-4 text-[#178A47]" aria-hidden="true" />
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
                <div className="lg:col-span-5 space-y-3 bg-white dark:bg-[#071324] p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                  <div>
                    <label htmlFor="carta-aseguradora" className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1">
                      Compañía aseguradora
                    </label>
                    <input
                      id="carta-aseguradora"
                      type="text"
                      value={cartaAseguradora}
                      onChange={(e) => setCartaAseguradora(e.target.value)}
                      placeholder="Ej.: Mapfre, AXA, Allianz, Generali..."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a1b33] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="carta-siniestro" className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1">
                        Nº de siniestro
                      </label>
                      <input
                        id="carta-siniestro"
                        type="text"
                        value={cartaSiniestro}
                        onChange={(e) => setCartaSiniestro(e.target.value)}
                        placeholder="Ej.: 2026-00412"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a1b33] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                      />
                    </div>
                    <div>
                      <label htmlFor="carta-poliza" className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1">
                        Nº de póliza
                      </label>
                      <input
                        id="carta-poliza"
                        type="text"
                        value={cartaPoliza}
                        onChange={(e) => setCartaPoliza(e.target.value)}
                        placeholder="Opcional"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a1b33] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="carta-asegurado" className="block text-xs font-bold text-[#002147] dark:text-slate-200 mb-1">
                      Nombre completo y NIF del asegurado
                    </label>
                    <input
                      id="carta-asegurado"
                      type="text"
                      value={cartaAsegurado}
                      onChange={(e) => setCartaAsegurado(e.target.value)}
                      placeholder="Nombre y DNI/NIF"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0a1b33] text-xs focus:outline-hidden focus:ring-2 focus:ring-[#0F76BB]"
                    />
                  </div>
                  <label className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cartaOposicionContrata}
                      onChange={(e) => setCartaOposicionContrata(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-[#0F76BB] focus:ring-[#0F76BB]"
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
                    className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] text-xs text-slate-700 dark:text-slate-200 font-mono leading-relaxed focus:outline-hidden"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={copiarCarta}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] text-white text-xs font-bold cursor-pointer transition-colors"
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

            <p className="text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-4">
              Orientación práctica informativa sobre documentación habitual en siniestros bajo la Ley 50/1980; no sustituye el asesoramiento jurídico particular ni las condiciones específicas de tu póliza.
            </p>
          </div>
        </div>
      </section>

      {/* 6. ASISTENTE INTERACTIVO DE VALORACIÓN URGENTE POR WHATSAPP */}
      <section
        id="valoracion-siniestro"
        className="py-16 lg:py-20 bg-[#002147] text-white border-b border-white/10"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-xs font-mono uppercase tracking-wider text-[#60B5F6] font-bold mb-2">
              Atención prioritaria por WhatsApp · {CONTACT_INFO.whatsappNumber}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3 text-balance">
              Prepara tu valoración urgente y solicitud de presupuesto
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Marca el origen del siniestro, si necesitas lote prioritario de ropa diaria y tu situación con el seguro. Al abrir WhatsApp con <strong>Mimo</strong>, podrás enviarnos fotos rápidas para orientarte al momento.
            </p>
          </div>

          <div className="rounded-2xl bg-white text-slate-900 dark:bg-[#0b1d36] dark:text-white p-6 sm:p-8 shadow-xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="siniestro-tipo"
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  ¿Qué tipo de incidente ha ocurrido?
                </label>
                <select
                  id="siniestro-tipo"
                  value={tipoSiniestro}
                  onChange={(e) => setTipoSiniestro(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm font-medium focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Origen aproximado (clave de triaje)
                </label>
                <select
                  id="siniestro-origen"
                  value={origenIncidente}
                  onChange={(e) => setOrigenIncidente(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm font-medium focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
              <p className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-2">
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
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-bold text-left transition-colors cursor-pointer ${
                        selected
                          ? 'border-[#0F76BB] bg-[#0F76BB]/10 text-[#002147] dark:bg-[#60B5F6]/15 dark:text-white'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-slate-600 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <Check
                        className={`w-3.5 h-3.5 shrink-0 ${
                          selected ? 'text-[#178A47] dark:text-emerald-400 opacity-100' : 'opacity-25'
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
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Situación con el seguro
                </label>
                <select
                  id="siniestro-seguro"
                  value={situacionSeguro}
                  onChange={(e) => setSituacionSeguro(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm font-medium focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
                <label className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={necesitaLotePrioritario}
                    onChange={(e) => setNecesitaLotePrioritario(e.target.checked)}
                    className="rounded border-slate-300 text-[#178A47] focus:ring-[#178A47]"
                  />
                  <span>Necesito lote prioritario (ropa de trabajo / colegio)</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="siniestro-localidad"
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Localidad
                </label>
                <select
                  id="siniestro-localidad"
                  value={localidad}
                  onChange={(e) => setLocalidad(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm font-medium focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Cómo prefieres gestionarlo
                </label>
                <select
                  id="siniestro-modalidad"
                  value={modalidad}
                  onChange={(e) => setModalidad(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#071324] text-sm focus:ring-2 focus:ring-[#0F76BB] focus:border-[#0F76BB] focus:outline-hidden transition-colors"
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
                  className="block text-xs sm:text-sm font-bold text-[#002147] dark:text-slate-200 mb-1.5"
                >
                  Volumen / notas (opcional)
                </label>
                <input
                  id="siniestro-obs"
                  type="text"
                  value={observaciones}
                  onChange={(e) => setObservaciones(e.target.value)}
                  placeholder="Ej.: 2 armarios, 4 cortinas y 2 edredones"
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
                  trackWhatsAppClick(
                    '/limpieza-incendios-siniestros-vigo',
                    'service_detail_secondary',
                    {
                      service_id: 'recuperacion-siniestros',
                    }
                  )
                }
                className="flex-1 inline-flex items-center justify-center gap-2.5 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm sm:text-base py-4 px-6 rounded-xl transition-colors"
              >
                <MessageCircle className="w-5 h-5" aria-hidden="true" />
                <span>Enviar parte urgente a Mimo por WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center justify-center gap-1.5 border border-slate-300 dark:border-slate-600 px-4 py-3.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer hover:border-[#0F76BB] transition-colors whitespace-nowrap shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#178A47]" aria-hidden="true" />
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <Store className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                <p>
                  <strong>Sin pedido mínimo en tiendas propias:</strong>{' '}
                  {TIENDAS_PROPIAS.map((t) => t.direccion).join(' · ')}.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Truck className="w-4 h-4 text-[#0F76BB] shrink-0 mt-0.5" aria-hidden="true" />
                <p>
                  <strong>Recogida a domicilio:</strong> sujeta a ruta e importe mínimo según volumen y localidad de Vigo / comarca.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6B. DÓNDE ENTREGAR HOY EN VIGO (SIN PEDIDO MÍNIMO), QUÉ FOTOS TRAER Y RED COMARCA */}
      <section
        id="entrega-hoy"
        className="py-14 lg:py-16 bg-white dark:bg-[#071324] border-b border-slate-200 dark:border-slate-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-2">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Entrega inmediata hoy o recogida en Vigo y comarca
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                Nuestras 3 tiendas propias en Vigo y puntos de la comarca
              </h2>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                Puedes acercar tus prendas en bolsas o cajas transpirables sin pedido mínimo a cualquiera de nuestras tiendas propias en Vigo. Si el volumen es grande, solicita recogida a domicilio con Mimo.
              </p>
            </div>
            <a
              href="/puntos-mimos"
              onClick={(e) => onNavigate('/puntos-mimos', e)}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline shrink-0"
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
                  className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1d36] p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <p className="text-xs font-mono font-bold uppercase text-[#0F76BB] dark:text-[#60B5F6]">
                      Tienda propia · {tienda.localidad}
                    </p>
                    <h3 className="text-lg font-extrabold text-[#002147] dark:text-white">
                      {tienda.nombre_mostrado}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-semibold">
                      {tienda.direccion} ({tienda.codigo_postal})
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      <strong>Horario:</strong> {tienda.horario.resumen}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      <strong>Tel.:</strong>{' '}
                      <a
                        href={`tel:+34${tienda.telefono}`}
                        className="font-bold text-[#002147] dark:text-white hover:underline tabular-nums"
                      >
                        {tienda.telefonos_mostrados}
                      </a>
                    </p>
                  </div>
                  <a
                    href={tiendaHref}
                    onClick={(e) => onNavigate(tiendaHref, e)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F76BB] dark:text-[#60B5F6] hover:underline pt-2 border-t border-slate-200 dark:border-slate-800"
                  >
                    <span>Ver ficha de tienda y cómo llegar</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                </article>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a1b33] p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                <Camera className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>3 fotos rápidas que aceleran tu valoración y el parte</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                <li>
                  <strong>1. Foto general de las estancias o bultos:</strong> armario abierto, cortinas colgadas o ropa separada (sirve de prueba previa para el perito).
                </li>
                <li>
                  <strong>2. Foto de cerca de hollín, moho o etiquetas delicadas:</strong> para orientarte desde WhatsApp sobre si conviene lavado o prueba de viabilidad previa.
                </li>
                <li>
                  <strong>3. Listado o foto de las piezas más dañadas:</strong> nunca las deseches antes de documentarlas si vas a incluirlas en el certificado de pérdida total.
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a1b33] p-6 space-y-3">
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#002147] dark:text-white">
                Cobertura en Vigo y área de influencia
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                También atendemos consultas y puntos de entrega en comarca (
                {PUNTOS_COLABORADORES.map((p) => `${p.localidad}`).join(', ')} y área de Vigo):
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {ZONAS_SEO_LOCAL.map((zona) => (
                  <a
                    key={zona.slug}
                    href={zona.url}
                    onClick={(e) => onNavigate(zona.url, e)}
                    className="px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#071324] text-xs font-bold text-[#002147] dark:text-slate-200 hover:border-[#0F76BB] transition-colors"
                  >
                    {zona.localidad}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONEXIÓN CON GUÍA TÉCNICA DEL BLOG + 10 PREGUNTAS FRECUENTES */}
      <section className="py-14 lg:py-20 bg-slate-50 dark:bg-[#0a1b33] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071324] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0F76BB] dark:text-[#60B5F6]">
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                <span>Documentación técnica extendida</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white tracking-tight">
                ¿Quieres profundizar en la química del humo, los COVs y la matriz completa por tejido?
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Publicamos un artículo técnico detallado sobre la fisiología del daño por hollín, comparativa con métodos domésticos y los artículos aplicables de la Ley 50/1980.
              </p>
            </div>
            <a
              href="/blog/ropa-afectada-humo-incendio-siniestro-hogar"
              onClick={(e) => onNavigate('/blog/ropa-afectada-humo-incendio-siniestro-hogar', e)}
              className="inline-flex items-center justify-center gap-2 bg-[#002147] hover:bg-[#0a3161] dark:bg-[#0F76BB] dark:hover:bg-[#0B5C94] text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-colors whitespace-nowrap shrink-0"
            >
              <FileText className="w-4 h-4" aria-hidden="true" />
              <span>Leer guía técnica del blog</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>

          <div>
            <div className="max-w-3xl mb-8 space-y-1">
              <p className="text-xs font-mono uppercase tracking-wider font-bold text-[#0F76BB] dark:text-[#60B5F6]">
                Dudas habituales sobre siniestros textiles y seguros
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002147] dark:text-white tracking-tight text-balance">
                Preguntas frecuentes sobre recuperación textil tras incendios o inundaciones en Vigo
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICIO_SINIESTROS_FAQS.map((faq) => (
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
        </div>
      </section>

      {/* 8. ENLACES RELACIONADOS Y CIERRE */}
      <section className="py-14 bg-white dark:bg-[#071324]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#002147] dark:text-white mb-6">
            Servicios complementarios en Tintorería Mimos Vigo
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            <a
              href="/textiles-hogar-vigo"
              onClick={(e) => onNavigate('/textiles-hogar-vigo', e)}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB] bg-slate-50/70 dark:bg-[#0b1d36] flex flex-col justify-between group transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-extrabold text-[#002147] dark:text-white group-hover:text-[#0F76BB] dark:group-hover:text-[#60B5F6]">
                    Edredones, cortinas y estores
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Higienización de gran formato para edredones de plumas, mantas, estores de tela y cortinas (con desmontaje y colocación).
                </p>
              </div>
            </a>

            <a
              href="/limpieza-alfombras-vigo"
              onClick={(e) => onNavigate('/limpieza-alfombras-vigo', e)}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB] bg-slate-50/70 dark:bg-[#0b1d36] flex flex-col justify-between group transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-extrabold text-[#002147] dark:text-white group-hover:text-[#0F76BB] dark:group-hover:text-[#60B5F6]">
                    Limpieza de alfombras en Vigo
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Retirada de hollín, ceniza y humedad en alfombras en nuestras instalaciones de Navia con recogida a domicilio.
                </p>
              </div>
            </a>

            <a
              href="/reparacion-alfombras-vigo"
              onClick={(e) => onNavigate('/reparacion-alfombras-vigo', e)}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB] bg-slate-50/70 dark:bg-[#0b1d36] flex flex-col justify-between group transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-extrabold text-[#002147] dark:text-white group-hover:text-[#0F76BB] dark:group-hover:text-[#60B5F6]">
                    Reparación de alfombras
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Arreglo y restauración de flecos, festón lateral y ribetes mediante restaurador colaborador (independiente o con limpieza).
                </p>
              </div>
            </a>

            <a
              href="/limpieza-pieles-cuero-vigo"
              onClick={(e) => onNavigate('/limpieza-pieles-cuero-vigo', e)}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#0F76BB] bg-slate-50/70 dark:bg-[#0b1d36] flex flex-col justify-between group transition-colors"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-extrabold text-[#002147] dark:text-white group-hover:text-[#0F76BB] dark:group-hover:text-[#60B5F6]">
                    Limpieza de pieles, cuero y ante
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#0F76BB] shrink-0" aria-hidden="true" />
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Valoración individualizada y prueba técnica para cazadoras de cuero, ante o peletería expuestas a humedad o humo.
                </p>
              </div>
            </a>
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
                  trackWhatsAppClick(
                    '/limpieza-incendios-siniestros-vigo',
                    'service_detail_footer',
                    {
                      service_id: 'recuperacion-siniestros',
                    }
                  )
                }
                className="inline-flex items-center gap-2 bg-[#178A47] hover:bg-[#126E38] text-white font-bold text-sm px-5 py-3 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                <span>Consultar siniestro con Mimo</span>
              </a>
              <a
                href={CONTACT_INFO.phoneHref}
                onClick={() =>
                  trackPhoneClick('/limpieza-incendios-siniestros-vigo', 'service_detail')
                }
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
