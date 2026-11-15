import { CONTACT_INFO, IMAGES, TIENDAS_PROPIAS } from '../data/mimosData';

export interface InventarioExportItem {
  id: number;
  estancia: string;
  prenda: string;
  unidades: number;
  estado: string;
}

export interface ClienteInventarioMeta {
  nombre: string;
  telefono: string;
  localidad: string;
  aseguradora: string;
  siniestro: string;
}

interface LogoAsset {
  dataUrl: string;
  base64: string;
  width: number;
  height: number;
}

async function loadLogoPngAsset(): Promise<LogoAsset | null> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return null;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const timeout = window.setTimeout(() => resolve(null), 2500);

    img.onload = () => {
      window.clearTimeout(timeout);
      try {
        const w = img.naturalWidth || 240;
        const h = img.naturalHeight || 80;
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/png');
        const base64 = dataUrl.split(',')[1] || '';
        resolve({ dataUrl, base64, width: w, height: h });
      } catch {
        resolve(null);
      }
    };

    img.onerror = () => {
      window.clearTimeout(timeout);
      resolve(null);
    };

    img.src = IMAGES.logoMimos;
  });
}

function getFechaEmision(): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date());
}

function normalizeMeta(meta: ClienteInventarioMeta) {
  return {
    nombre: meta.nombre.trim() || 'Por completar por el asegurado',
    telefono: meta.telefono.trim() || 'Por completar',
    localidad: meta.localidad.trim() || 'Vigo / Comarca',
    aseguradora: meta.aseguradora.trim() || 'Por indicar',
    siniestro: meta.siniestro.trim() || 'Por indicar',
    fecha: getFechaEmision(),
  };
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export async function exportInventarioPdf(
  items: InventarioExportItem[],
  meta: ClienteInventarioMeta
): Promise<void> {
  const [{ jsPDF }, autoTableModule, logo] = await Promise.all([
    import('jspdf'),
    import('jspdf-autotable'),
    loadLogoPngAsset(),
  ]);

  const autoTable =
    autoTableModule.default ?? (autoTableModule as unknown as typeof autoTableModule.default);
  const info = normalizeMeta(meta);
  const totalUnidades = items.reduce((sum, item) => sum + item.unidades, 0);

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 14;
  const contentWidth = pageWidth - marginX * 2;

  // 1. Franja superior corporativa
  doc.setFillColor(0, 33, 71); // #002147
  doc.rect(0, 0, pageWidth, 34, 'F');

  if (logo) {
    const logoHeight = 14;
    const logoWidth = Math.min(46, (logo.width / logo.height) * logoHeight);
    // Pastilla blanca sutil detrás del logotipo para contraste perfecto
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(marginX, 7, logoWidth + 4, logoHeight + 4, 2, 2, 'F');
    doc.addImage(logo.dataUrl, 'PNG', marginX + 2, 9, logoWidth, logoHeight);
  } else {
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text('TINTORERÍA MIMOS', marginX, 16);
  }

  // Datos legales y título a la derecha del logo
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('RELACIÓN PRELIMINAR DE TEXTILES AFECTADOS', pageWidth - marginX, 12.5, {
    align: 'right',
  });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(191, 219, 254);
  doc.text(
    'Pre-inventario Art. 38 Ley 50/1980 (LCS) · Plazo 5 días · Sujeto a triaje definitivo en taller',
    pageWidth - marginX,
    18,
    { align: 'right' }
  );
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text(
    `${CONTACT_INFO.legalName} · CIF ${CONTACT_INFO.cif} · ${CONTACT_INFO.canonicalBase.replace('https://', '')}`,
    pageWidth - marginX,
    24.5,
    { align: 'right' }
  );

  // 2. Barra de canales de envío directo
  doc.setFillColor(241, 245, 249);
  doc.setDrawColor(203, 213, 225);
  doc.rect(marginX, 38, contentWidth, 12, 'FD');
  doc.setTextColor(0, 33, 71);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('ENVÍO DIRECTO A TINTORERÍA MIMOS PARA VALORACIÓN Y PRESUPUESTO:', marginX + 3, 42.8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(30, 41, 59);
  doc.text(
    `Tel. central: ${CONTACT_INFO.phoneDisplay}   |   WhatsApp urgente: ${CONTACT_INFO.whatsappNumber}   |   Email: ${CONTACT_INFO.email}`,
    marginX + 3,
    47.5
  );

  // 3. Bloque de datos del asegurado y del siniestro (2 columnas)
  const boxY = 53.5;
  const colGap = 4;
  const halfW = (contentWidth - colGap) / 2;

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(marginX, boxY, halfW, 24, 1.5, 1.5, 'FD');
  doc.roundedRect(marginX + halfW + colGap, boxY, halfW, 24, 1.5, 1.5, 'FD');

  // Columna izquierda: Asegurado / Cliente
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 118, 187);
  doc.text('DATOS DEL CLIENTE / ASEGURADO', marginX + 3, boxY + 5);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(8.2);
  doc.setFont('helvetica', 'bold');
  doc.text('Nombre:', marginX + 3, boxY + 10.5);
  doc.text('Teléfono:', marginX + 3, boxY + 15.5);
  doc.text('Localidad / Zona:', marginX + 3, boxY + 20.5);

  doc.setFont('helvetica', 'normal');
  doc.text(info.nombre, marginX + 22, boxY + 10.5, { maxWidth: halfW - 25 });
  doc.text(info.telefono, marginX + 22, boxY + 15.5, { maxWidth: halfW - 25 });
  doc.text(info.localidad, marginX + 29, boxY + 20.5, { maxWidth: halfW - 32 });

  // Columna derecha: Siniestro
  const rightX = marginX + halfW + colGap;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(15, 118, 187);
  doc.text('DATOS DEL EXPEDIENTE DE SINIESTRO', rightX + 3, boxY + 5);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(8.2);
  doc.setFont('helvetica', 'bold');
  doc.text('Aseguradora:', rightX + 3, boxY + 10.5);
  doc.text('Nº Siniestro / Póliza:', rightX + 3, boxY + 15.5);
  doc.text('Fecha de emisión:', rightX + 3, boxY + 20.5);

  doc.setFont('helvetica', 'normal');
  doc.text(info.aseguradora, rightX + 25, boxY + 10.5, { maxWidth: halfW - 28 });
  doc.text(info.siniestro, rightX + 35, boxY + 15.5, { maxWidth: halfW - 38 });
  doc.text(info.fecha, rightX + 32, boxY + 20.5, { maxWidth: halfW - 35 });

  // 4. Tabla principal de prendas
  const tableRows = items.map((item, idx) => [
    String(idx + 1),
    item.estancia,
    item.prenda,
    String(item.unidades),
    item.estado,
  ]);

  autoTable(doc, {
    startY: boxY + 28,
    margin: { left: marginX, right: marginX, bottom: 20 },
    head: [['Nº', 'Estancia / Mueble', 'Prenda o textil afectado', 'Uds.', 'Daño o estado observado']],
    body: tableRows,
    foot: [
      [
        '',
        'TOTAL PROVISIONAL REGISTRADO EN BORRADOR',
        `${items.length} lote(s)`,
        String(totalUnidades),
        'Sujeto a triaje técnico en taller',
      ],
    ],
    theme: 'grid',
    styles: {
      font: 'helvetica',
      fontSize: 8.5,
      cellPadding: 2.8,
      textColor: [30, 41, 59],
      lineColor: [203, 213, 225],
      lineWidth: 0.2,
      valign: 'middle',
    },
    headStyles: {
      fillColor: [0, 33, 71],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 8.5,
    },
    footStyles: {
      fillColor: [226, 232, 240],
      textColor: [0, 33, 71],
      fontStyle: 'bold',
      fontSize: 8.5,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 10 },
      1: { cellWidth: 38, fontStyle: 'bold' },
      2: { cellWidth: 64 },
      3: { halign: 'center', cellWidth: 14, fontStyle: 'bold' },
      4: { cellWidth: 56 },
    },
  });

  const finalY =
    (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? 170;

  // 5. Bloque de tiendas propias en Vigo y advertencia técnica (si cabe en la página actual, o salto limpio)
  let blockY = finalY + 7;
  const neededHeight = 52;
  if (blockY + neededHeight > pageHeight - 16) {
    doc.addPage();
    blockY = 18;
  }

  // Caja de tiendas físicas en Vigo
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(marginX, blockY, contentWidth, 27, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.2);
  doc.setTextColor(0, 33, 71);
  doc.text('TIENDAS PROPIAS DE RECEPCIÓN Y TALLER EN VIGO (SIN CITA PREVIA):', marginX + 3, blockY + 5);

  doc.setFontSize(7.6);
  TIENDAS_PROPIAS.forEach((tienda, i) => {
    const rowY = blockY + 10.5 + i * 5.2;
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 33, 71);
    const label = `${tienda.nombre_mostrado}:`;
    doc.text(label, marginX + 3, rowY);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    doc.text(
      `${tienda.direccion} (${tienda.codigo_postal} ${tienda.localidad}) · Tel. ${tienda.telefonos_mostrados} · ${tienda.horario.resumen}`,
      marginX + 38,
      rowY,
      { maxWidth: contentWidth - 41 }
    );
  });

  // Nota técnica y legal Art. 38 + firma
  const noteY = blockY + 31;
  doc.setFillColor(255, 251, 235);
  doc.setDrawColor(253, 230, 138);
  doc.roundedRect(marginX, noteY, contentWidth, 18, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(146, 64, 14);
  doc.text('NOTA PREVENTIVA Y VALIDEZ ART. 38 LEY 50/1980:', marginX + 3, noteY + 4.8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(120, 53, 15);
  doc.text(
    '1. Relación preliminar elaborada por el asegurado dentro del plazo de 5 días (Art. 38 LCS), sujeta a albarán definitivo y triaje técnico en Tintorería Mimos Navia, S.L.\n2. Conservación previa al traslado: no usar lavadora, secadora ni plancha doméstica sobre humo o hollín; evitar bolsas de plástico cerradas si existe humedad.',
    marginX + 3,
    noteY + 9.2,
    { maxWidth: contentWidth - 6 }
  );

  // Pie de firma en todas las páginas
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(226, 232, 240);
    doc.line(marginX, pageHeight - 12, pageWidth - marginX, pageHeight - 12);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(100, 116, 139);
    doc.text(
      `${CONTACT_INFO.legalName} · CIF ${CONTACT_INFO.cif} · Tel. ${CONTACT_INFO.phoneDisplay} · WhatsApp ${CONTACT_INFO.whatsappNumber} · ${CONTACT_INFO.email}`,
      marginX,
      pageHeight - 7.5
    );
    doc.text(`Página ${p} de ${totalPages}`, pageWidth - marginX, pageHeight - 7.5, {
      align: 'right',
    });
  }

  doc.save('Pre-Inventario-Siniestro-Tintoreria-Mimos.pdf');
}

export async function exportInventarioExcel(
  items: InventarioExportItem[],
  meta: ClienteInventarioMeta
): Promise<void> {
  const [excelModule, logo] = await Promise.all([import('exceljs'), loadLogoPngAsset()]);
  const ExcelJS =
    (excelModule as unknown as { default?: typeof import('exceljs') }).default ?? excelModule;

  const info = normalizeMeta(meta);
  const workbook = new ExcelJS.Workbook();
  workbook.creator = CONTACT_INFO.legalName;
  workbook.created = new Date();

  const sheet = workbook.addWorksheet('Pre-Inventario Art. 38', {
    views: [{ showGridLines: true }],
    pageSetup: {
      paperSize: 9, // A4
      orientation: 'portrait',
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
    },
  });

  // Anchos explícitos de columnas A–E
  sheet.columns = [
    { key: 'num', width: 8 },
    { key: 'estancia', width: 28 },
    { key: 'prenda', width: 42 },
    { key: 'unidades', width: 12 },
    { key: 'estado', width: 34 },
  ];

  // Fila 1: Banner principal corporativo
  sheet.mergeCells('A1:E1');
  const bannerCell = sheet.getCell('A1');
  bannerCell.value = 'TINTORERÍA MIMOS — PRE-INVENTARIO TEXTIL POST-SINIESTRO (ART. 38 LEY 50/1980)';
  bannerCell.font = { name: 'Calibri', size: 13, bold: true, color: { argb: 'FFFFFFFF' } };
  bannerCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF002147' } };
  bannerCell.alignment = { vertical: 'middle', horizontal: 'right', wrapText: true };
  sheet.getRow(1).height = 40;

  if (logo && logo.base64) {
    try {
      const imageId = workbook.addImage({
        base64: logo.base64,
        extension: 'png',
      });
      sheet.addImage(imageId, {
        tl: { col: 0.15, row: 0.12 },
        ext: { width: Math.round((logo.width / logo.height) * 38), height: 38 },
      });
    } catch {
      // Continuar sin imagen si el entorno no admite addImage
    }
  }

  // Fila 2: Datos legales y contacto directo
  sheet.mergeCells('A2:E2');
  const legalCell = sheet.getCell('A2');
  legalCell.value = `${CONTACT_INFO.legalName} · CIF ${CONTACT_INFO.cif} · Tel.: ${CONTACT_INFO.phoneDisplay} · WhatsApp: ${CONTACT_INFO.whatsappNumber} · Email: ${CONTACT_INFO.email}`;
  legalCell.font = { name: 'Calibri', size: 9.5, bold: true, color: { argb: 'FF002147' } };
  legalCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };
  legalCell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  sheet.getRow(2).height = 22;

  // Fila 3: Separador vacío
  sheet.getRow(3).height = 8;

  // Filas 4–6: Bloque de identificación del cliente y siniestro
  const metaRows: Array<[string, string, string, string]> = [
    ['Asegurado / Cliente:', info.nombre, 'Aseguradora:', info.aseguradora],
    ['Teléfono contacto:', info.telefono, 'Nº Siniestro / Póliza:', info.siniestro],
    ['Localidad / Zona:', info.localidad, 'Fecha de emisión:', info.fecha],
  ];

  metaRows.forEach(([l1, v1, l2, v2], offset) => {
    const rowIdx = 4 + offset;
    const row = sheet.getRow(rowIdx);
    row.height = 20;

    row.getCell(1).value = l1;
    sheet.mergeCells(`B${rowIdx}:C${rowIdx}`);
    row.getCell(2).value = v1;
    row.getCell(4).value = l2;
    row.getCell(5).value = v2;

    [1, 4].forEach((c) => {
      const cell = row.getCell(c);
      cell.font = { name: 'Calibri', size: 9.5, bold: true, color: { argb: 'FF002147' } };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
      cell.alignment = { vertical: 'middle', horizontal: 'left' };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        right: { style: 'thin', color: { argb: 'FFCBD5E1' } },
      };
    });

    [2, 3, 5].forEach((c) => {
      const cell = row.getCell(c);
      cell.font = { name: 'Calibri', size: 10, color: { argb: 'FF0F172A' } };
      cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        right: { style: 'thin', color: { argb: 'FFCBD5E1' } },
      };
    });
  });

  // Fila 7: Separador vacío
  sheet.getRow(7).height = 10;

  // Fila 8: Cabecera de tabla
  const headerRowIdx = 8;
  const headerRow = sheet.getRow(headerRowIdx);
  headerRow.height = 24;
  const headers = ['Nº', 'Estancia / Mueble', 'Prenda o textil afectado', 'Uds.', 'Daño o estado observado'];
  headers.forEach((title, idx) => {
    const cell = headerRow.getCell(idx + 1);
    cell.value = title;
    cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF002147' } };
    cell.alignment = {
      vertical: 'middle',
      horizontal: idx === 0 || idx === 3 ? 'center' : 'left',
      wrapText: true,
    };
    cell.border = {
      top: { style: 'thin', color: { argb: 'FF002147' } },
      bottom: { style: 'thin', color: { argb: 'FF002147' } },
      left: { style: 'thin', color: { argb: 'FF1E3A8A' } },
      right: { style: 'thin', color: { argb: 'FF1E3A8A' } },
    };
  });

  // Filas de prendas
  const firstDataRow = headerRowIdx + 1;
  items.forEach((item, idx) => {
    const rowIdx = firstDataRow + idx;
    const row = sheet.getRow(rowIdx);
    row.height = 22;
    const isEven = idx % 2 === 1;
    const rowBg = isEven ? 'FFF8FAFC' : 'FFFFFFFF';

    row.getCell(1).value = idx + 1;
    row.getCell(2).value = item.estancia;
    row.getCell(3).value = item.prenda;
    row.getCell(4).value = item.unidades;
    row.getCell(5).value = item.estado;

    row.getCell(1).alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell(2).alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
    row.getCell(3).alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
    row.getCell(4).alignment = { vertical: 'middle', horizontal: 'center' };
    row.getCell(4).numFmt = '#,##0';
    row.getCell(5).alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };

    for (let c = 1; c <= 5; c++) {
      const cell = row.getCell(c);
      cell.font = {
        name: 'Calibri',
        size: 10,
        bold: c === 2 || c === 4,
        color: { argb: 'FF1E293B' },
      };
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowBg } };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        right: { style: 'thin', color: { argb: 'FFCBD5E1' } },
      };
    }
  });

  // Fila de Total con fórmula real =SUM(...)
  const lastDataRow = Math.max(firstDataRow, firstDataRow + items.length - 1);
  const totalRowIdx = firstDataRow + items.length;
  const totalRow = sheet.getRow(totalRowIdx);
  totalRow.height = 23;

  sheet.mergeCells(`B${totalRowIdx}:C${totalRowIdx}`);
  totalRow.getCell(1).value = '';
  totalRow.getCell(2).value = `TOTAL PROVISIONAL (${items.length} lotes registrados)`;
  totalRow.getCell(4).value =
    items.length > 0 ? { formula: `SUM(D${firstDataRow}:D${lastDataRow})` } : 0;
  totalRow.getCell(4).numFmt = '#,##0';
  totalRow.getCell(5).value = 'Sujeto a inventario y triaje técnico definitivo en taller';

  for (let c = 1; c <= 5; c++) {
    const cell = totalRow.getCell(c);
    cell.font = { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF002147' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } };
    cell.alignment = {
      vertical: 'middle',
      horizontal: c === 4 ? 'center' : 'left',
      wrapText: true,
    };
    cell.border = {
      top: { style: 'medium', color: { argb: 'FF002147' } },
      bottom: { style: 'medium', color: { argb: 'FF002147' } },
      left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
      right: { style: 'thin', color: { argb: 'FFCBD5E1' } },
    };
  }

  // Bloque inferior de tiendas en Vigo y nota preventiva
  const storeHeaderRowIdx = totalRowIdx + 2;
  sheet.mergeCells(`A${storeHeaderRowIdx}:E${storeHeaderRowIdx}`);
  const storeTitleCell = sheet.getCell(`A${storeHeaderRowIdx}`);
  storeTitleCell.value = 'CANALES DIRECTOS Y TIENDAS PROPIAS EN VIGO (TINTORERÍA MIMOS NAVIA, S.L.)';
  storeTitleCell.font = { name: 'Calibri', size: 9.5, bold: true, color: { argb: 'FF002147' } };
  storeTitleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
  storeTitleCell.alignment = { vertical: 'middle', horizontal: 'left' };
  sheet.getRow(storeHeaderRowIdx).height = 20;

  TIENDAS_PROPIAS.forEach((tienda, idx) => {
    const rIdx = storeHeaderRowIdx + 1 + idx;
    sheet.mergeCells(`A${rIdx}:E${rIdx}`);
    const cell = sheet.getCell(`A${rIdx}`);
    cell.value = `• ${tienda.nombre_mostrado}: ${tienda.direccion} (${tienda.codigo_postal} ${tienda.localidad}) · Tel. ${tienda.telefonos_mostrados} · ${tienda.horario.resumen}`;
    cell.font = { name: 'Calibri', size: 9, color: { argb: 'FF334155' } };
    cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
    sheet.getRow(rIdx).height = 18;
  });

  const footerNoteIdx = storeHeaderRowIdx + TIENDAS_PROPIAS.length + 1;
  sheet.mergeCells(`A${footerNoteIdx}:E${footerNoteIdx}`);
  const noteCell = sheet.getCell(`A${footerNoteIdx}`);
  noteCell.value =
    'Nota Art. 38 LCS: Documento preliminar del asegurado válido para cumplir el plazo de 5 días. No introducir textiles en plástico cerrado si hay humedad ni lavar/secar con calor en casa antes del triaje.';
  noteCell.font = { name: 'Calibri', size: 8.5, italic: true, color: { argb: 'FF92400E' } };
  noteCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFBEB' } };
  noteCell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
  sheet.getRow(footerNoteIdx).height = 26;

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  triggerBlobDownload(blob, 'Pre-Inventario-Siniestro-Tintoreria-Mimos.xlsx');
}
