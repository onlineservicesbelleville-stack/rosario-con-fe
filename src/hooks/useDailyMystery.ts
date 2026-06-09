import { useMemo } from 'react';
import { getMysteryTypeForDay, getMysteryLabel, getMysteryDays } from '../utils/mysteryUtils';
import { MYSTERIES, MYSTERY_GROUPS, getMysteryGroupColor } from '../data/mysteries';
import { formatDateES } from '../utils/dateUtils';
import { Mystery, MysteryType } from '../types/mystery';

export interface DailyMysteryInfo {
  type: MysteryType;
  label: string;
  days: string;
  color: string;
  mysteries: Mystery[];
  dateLabel: string;
}

export function useDailyMystery(): DailyMysteryInfo {
  return useMemo(() => {
    const today = new Date();
    const type = getMysteryTypeForDay(today);
    return {
      type,
      label: getMysteryLabel(type),
      days: getMysteryDays(type),
      color: getMysteryGroupColor(type),
      mysteries: MYSTERIES.filter((m) => m.type === type),
      dateLabel: formatDateES(today),
    };
  }, []);
}
