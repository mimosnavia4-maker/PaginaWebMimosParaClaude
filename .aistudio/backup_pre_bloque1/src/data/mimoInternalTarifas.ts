// FUENTE INTERNA RESERVADA EXCLUSIVAMENTE PARA EL ASISTENTE MIMO (Regla 0.2 y Sección 4 / 12 del Plan Maestro)
// IMPORTANTE: Este archivo conserva las tarifas internas de referencia de Mimo para que no se pierdan.
// NINGÚN componente público de la web debe importar ni mostrar estos precios en pantalla.

export interface TarifaInternaMimo {
  categoria: string;
  prenda: string;
  referenciaInterna: string;
}

export const TARIFAS_INTERNAS_MIMO_PROTEGIDAS: TarifaInternaMimo[] = [
  { categoria: 'Camisería y Diario', prenda: 'Camisa lavada y planchada', referenciaInterna: 'Uso interno Mimo WhatsApp (655 536 844)' },
  { categoria: 'Sastrería', prenda: 'Traje completo (chaqueta y pantalón)', referenciaInterna: 'Uso interno Mimo WhatsApp (655 536 844)' },
  { categoria: 'Hogar', prenda: 'Edredones sintéticos y de plumas', referenciaInterna: 'Uso interno Mimo WhatsApp (655 536 844)' },
  { categoria: 'Hogar', prenda: 'Alfombras y cortinas', referenciaInterna: 'Uso interno Mimo WhatsApp (655 536 844)' },
  { categoria: 'Planchado', prenda: 'Servicio de solo planchado y bonos', referenciaInterna: 'Uso interno Mimo WhatsApp (655 536 844)' },
];
