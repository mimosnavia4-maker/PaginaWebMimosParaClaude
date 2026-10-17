import {
  REGISTROS_PUNTOS,
  HorarioEstructuradoRaw,
  TramoHorario,
} from '../data/mimosData';

export interface StoreStatusInfo {
  isOpen: boolean;
  statusText: string;
}

const DAYS_ES = [
  'domingo',
  'lunes',
  'martes',
  'miércoles',
  'jueves',
  'viernes',
  'sábado',
];

const DAY_KEYS: (keyof Omit<HorarioEstructuradoRaw, 'zona_horaria'>)[] = [
  'domingo',
  'lunes',
  'martes',
  'miercoles',
  'jueves',
  'viernes',
  'sabado',
];

function parseTimeStrToMinutes(timeStr: string): number {
  const [hStr, mStr] = timeStr.split(':');
  const h = Number(hStr);
  const m = Number(mStr);
  if (Number.isNaN(h) || Number.isNaN(m)) return 0;
  return h * 60 + m;
}

function parseTramosToIntervals(tramos: TramoHorario[]): [number, number][] {
  if (!Array.isArray(tramos)) return [];
  return tramos.map(([inicio, fin]) => [
    parseTimeStrToMinutes(inicio),
    parseTimeStrToMinutes(fin),
  ]);
}

function formatHm(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h < 10 ? '0' + h : h}:${m < 10 ? '0' + m : m}`;
}

export function getStoreStatusById(storeId: string = 'as-teixugueiras'): StoreStatusInfo {
  const punto =
    REGISTROS_PUNTOS.find((p) => p.id === storeId) ?? REGISTROS_PUNTOS[0];

  if (!punto) {
    return { isOpen: false, statusText: 'Horario no disponible' };
  }

  try {
    const timeZone = punto.horario.zona_horaria || 'Europe/Madrid';
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(new Date());

    const map: Record<string, string> = {};
    parts.forEach((p) => {
      map[p.type] = p.value;
    });

    const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(
      map.weekday
    );
    const currentMinutes = Number(map.hour) * 60 + Number(map.minute);

    if (dayIndex === -1) {
      return { isOpen: false, statusText: `Horario ${punto.horario.resumen}` };
    }

    const etiquetaLugar =
      punto.id === 'as-teixugueiras' ? 'en Navia' : `en ${punto.nombre_mostrado}`;

    const todayIntervals = parseTramosToIntervals(
      punto.horario[DAY_KEYS[dayIndex]]
    );
    for (let i = 0; i < todayIntervals.length; i++) {
      if (
        currentMinutes >= todayIntervals[i][0] &&
        currentMinutes < todayIntervals[i][1]
      ) {
        return {
          isOpen: true,
          statusText: `Abierto ahora ${etiquetaLugar} · cierra a las ${formatHm(
            todayIntervals[i][1]
          )}`,
        };
      }
    }

    for (let k = 0; k < 8; k++) {
      const d = (dayIndex + k) % 7;
      const list = parseTramosToIntervals(punto.horario[DAY_KEYS[d]]);
      for (let j = 0; j < list.length; j++) {
        if (k > 0 || list[j][0] > currentMinutes) {
          const when =
            k === 0 ? 'hoy' : k === 1 ? 'mañana' : `el ${DAYS_ES[d]}`;
          return {
            isOpen: false,
            statusText: `Cerrado ahora · abre ${when} a las ${formatHm(
              list[j][0]
            )}`,
          };
        }
      }
    }

    return { isOpen: false, statusText: 'Cerrado ahora' };
  } catch {
    return { isOpen: false, statusText: punto.horario.resumen };
  }
}

export function getNaviaStoreStatus(): StoreStatusInfo {
  return getStoreStatusById('as-teixugueiras');
}
