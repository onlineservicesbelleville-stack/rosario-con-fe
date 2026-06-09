import { MysteryType } from './mystery';

export type RosaryStepType = 'prayer' | 'mystery' | 'intro' | 'finish';

export interface RosaryStep {
  id: string;
  order: number;
  type: RosaryStepType;
  title: string;
  text: string;
  audioUrl?: string;
  isPremium: boolean;
  mysteryNumber?: number;
  mysteryType?: MysteryType;
  repetitions?: number;
  currentRepetition?: number;
}

export interface RosarySession {
  id: string;
  userId?: string;
  mysteryType: MysteryType;
  startedAt: string;
  completedAt?: string;
  stepsCompleted: number;
  totalSteps: number;
  isCompleted: boolean;
}
