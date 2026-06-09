import AsyncStorage from '@react-native-async-storage/async-storage';
import { isSameDay, daysBetween } from '../utils/dateUtils';

const KEYS = {
  rosaryCount: '@progress_rosary_count',
  lastRosaryDate: '@progress_last_rosary_date',
  streak: '@progress_streak',
  prayersLearned: '@progress_prayers_learned',
  mysteriesHeard: '@progress_mysteries_heard',
  familySessions: '@progress_family_sessions',
};

export interface ProgressData {
  rosaryCount: number;
  lastRosaryDate: string | null;
  streak: number;
  prayersLearned: string[];
  mysteriesHeard: string[];
  familySessions: number;
}

export const progressService = {
  async getProgress(): Promise<ProgressData> {
    const [count, lastDate, streak, prayers, mysteries, family] = await Promise.all([
      AsyncStorage.getItem(KEYS.rosaryCount),
      AsyncStorage.getItem(KEYS.lastRosaryDate),
      AsyncStorage.getItem(KEYS.streak),
      AsyncStorage.getItem(KEYS.prayersLearned),
      AsyncStorage.getItem(KEYS.mysteriesHeard),
      AsyncStorage.getItem(KEYS.familySessions),
    ]);

    const safeParseArray = (raw: string | null): string[] => {
      if (!raw) return [];
      try { return JSON.parse(raw); } catch { return []; }
    };

    return {
      rosaryCount: count ? parseInt(count, 10) : 0,
      lastRosaryDate: lastDate,
      streak: streak ? parseInt(streak, 10) : 0,
      prayersLearned: safeParseArray(prayers),
      mysteriesHeard: safeParseArray(mysteries),
      familySessions: family ? parseInt(family, 10) : 0,
    };
  },

  async recordRosaryCompleted(): Promise<void> {
    const prog = await progressService.getProgress();
    const today = new Date();
    let newStreak = 1;

    if (prog.lastRosaryDate) {
      const last = new Date(prog.lastRosaryDate);
      if (isSameDay(today, last)) {
        newStreak = prog.streak;
      } else if (daysBetween(last, today) === 1) {
        newStreak = prog.streak + 1;
      }
    }

    await Promise.all([
      AsyncStorage.setItem(KEYS.rosaryCount, String(prog.rosaryCount + 1)),
      AsyncStorage.setItem(KEYS.lastRosaryDate, today.toISOString()),
      AsyncStorage.setItem(KEYS.streak, String(newStreak)),
    ]);
  },

  async markPrayerLearned(prayerId: string): Promise<void> {
    const prog = await progressService.getProgress();
    if (!prog.prayersLearned.includes(prayerId)) {
      const updated = [...prog.prayersLearned, prayerId];
      await AsyncStorage.setItem(KEYS.prayersLearned, JSON.stringify(updated));
    }
  },

  async markMysteryHeard(mysteryId: string): Promise<void> {
    const prog = await progressService.getProgress();
    if (!prog.mysteriesHeard.includes(mysteryId)) {
      const updated = [...prog.mysteriesHeard, mysteryId];
      await AsyncStorage.setItem(KEYS.mysteriesHeard, JSON.stringify(updated));
    }
  },

  async recordFamilySession(): Promise<void> {
    const prog = await progressService.getProgress();
    await AsyncStorage.setItem(KEYS.familySessions, String(prog.familySessions + 1));
  },

  async resetProgress(): Promise<void> {
    await AsyncStorage.multiRemove(Object.values(KEYS));
  },
};
