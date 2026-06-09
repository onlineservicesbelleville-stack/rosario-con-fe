import { create } from 'zustand';
import { ProgressData } from '../services/progressService';

interface ProgressStore {
  progress: ProgressData | null;
  setProgress: (p: ProgressData) => void;
}

export const useProgressStore = create<ProgressStore>((set) => ({
  progress: null,
  setProgress: (p) => set({ progress: p }),
}));
