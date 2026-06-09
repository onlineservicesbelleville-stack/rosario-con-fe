import { MysteryType } from '../types/mystery';

const DAY_MAP: Record<number, MysteryType> = {
  0: 'glorioso',  // domingo
  1: 'gozoso',    // lunes
  2: 'doloroso',  // martes
  3: 'glorioso',  // miércoles
  4: 'luminoso',  // jueves
  5: 'doloroso',  // viernes
  6: 'gozoso',    // sábado
};

export const DAY_NAMES_ES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

export const MYSTERY_LABELS: Record<MysteryType, string> = {
  gozoso: 'Misterios Gozosos',
  doloroso: 'Misterios Dolorosos',
  glorioso: 'Misterios Gloriosos',
  luminoso: 'Misterios Luminosos',
};

export const MYSTERY_DAYS: Record<MysteryType, string> = {
  gozoso: 'Lunes y Sábado',
  doloroso: 'Martes y Viernes',
  glorioso: 'Miércoles y Domingo',
  luminoso: 'Jueves',
};

export function getMysteryTypeForDay(date: Date = new Date()): MysteryType {
  return DAY_MAP[date.getDay()];
}

export function getMysteryLabel(type: MysteryType): string {
  return MYSTERY_LABELS[type];
}

export function getMysteryDays(type: MysteryType): string {
  return MYSTERY_DAYS[type];
}
