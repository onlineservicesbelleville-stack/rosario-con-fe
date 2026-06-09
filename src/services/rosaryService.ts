import { buildRosarySteps } from '../data/rosarySteps';
import { getMysteryTypeForDay } from '../utils/mysteryUtils';
import { MysteryType } from '../types/mystery';
import { RosaryStep } from '../types/rosary';

export const rosaryService = {
  getStepsForToday(): RosaryStep[] {
    const type = getMysteryTypeForDay();
    return buildRosarySteps(type);
  },

  getStepsForType(type: MysteryType): RosaryStep[] {
    return buildRosarySteps(type);
  },

  getTodayMysteryType(): MysteryType {
    return getMysteryTypeForDay();
  },

  filterFreeSteps(steps: RosaryStep[]): RosaryStep[] {
    return steps.map((s) => (s.isPremium ? { ...s, text: '', audioUrl: undefined } : s));
  },
};
