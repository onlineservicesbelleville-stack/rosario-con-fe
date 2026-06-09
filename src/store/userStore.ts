import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/user';

interface UserStore {
  user: User | null;
  isLoading: boolean;
  hasSeenOnboarding: boolean;
  setUser: (user: User | null) => void;
  setOnboardingDone: () => Promise<void>;
  loadOnboardingState: () => Promise<void>;
}

const ONBOARDING_KEY = '@onboarding_done';

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isLoading: true,
  hasSeenOnboarding: false,

  setUser: (user) => set({ user }),

  setOnboardingDone: async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, '1');
    set({ hasSeenOnboarding: true });
  },

  loadOnboardingState: async () => {
    const done = await AsyncStorage.getItem(ONBOARDING_KEY);
    set({ hasSeenOnboarding: done === '1', isLoading: false });
  },
}));
