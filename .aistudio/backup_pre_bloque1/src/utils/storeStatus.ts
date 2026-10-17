export interface StoreStatusInfo {
  isOpen: boolean;
  statusText: string;
}

const SCHEDULE: Record<number, [number, number][]> = {
  1: [
    [570, 840], // 09:30 - 14:00
    [960, 1200], // 16:00 - 20:00
  ],
  2: [
    [570, 840],
    [960, 1200],
  ],
  3: [
    [570, 840],
    [960, 1200],
  ],
  4: [
    [570, 840],
    [960, 1200],
  ],
  5: [
    [570, 840],
    [960, 1200],
  ],
  6: [[600, 810]], // Sábado 10:00 - 13:30
  0: [], // Domingo cerrado
};

const DAYS_ES = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

function formatHm(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${m < 10 ? '0' + m : m}`;
}

export function getNaviaStoreStatus(): StoreStatusInfo {
  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Madrid',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(new Date());

    const map: Record<string, string> = {};
    parts.forEach((p) => {
      map[p.type] = p.value;
    });

    const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(map.weekday);
    const currentMinutes = Number(map.hour) * 60 + Number(map.minute);

    if (dayIndex === -1) {
      return { isOpen: false, statusText: 'Horario L-V 9:30–14:00 y 16:00–20:00' };
    }

    const intervals = SCHEDULE[dayIndex] || [];
    for (let i = 0; i < intervals.length; i++) {
      if (currentMinutes >= intervals[i][0] && currentMinutes < intervals[i][1]) {
        return {
          isOpen: true,
          statusText: `Abierto ahora en Navia · cierra a las ${formatHm(intervals[i][1])}`,
        };
      }
    }

    for (let k = 0; k < 8; k++) {
      const d = (dayIndex + k) % 7;
      const list = SCHEDULE[d] || [];
      for (let j = 0; j < list.length; j++) {
        if (k > 0 || list[j][0] > currentMinutes) {
          const when = k === 0 ? 'hoy' : k === 1 ? 'mañana' : `el ${DAYS_ES[d]}`;
          return {
            isOpen: false,
            statusText: `Cerrado ahora · abre ${when} a las ${formatHm(list[j][0])}`,
          };
        }
      }
    }

    return { isOpen: false, statusText: 'Cerrado ahora' };
  } catch {
    return { isOpen: false, statusText: 'Lunes a viernes: 9:30–14:00 y 16:00–20:00' };
  }
}
