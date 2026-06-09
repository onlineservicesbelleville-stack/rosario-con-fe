import AsyncStorage from '@react-native-async-storage/async-storage';
import { revenueCatService } from './revenueCatService';

const PREMIUM_CACHE_KEY = '@subscription_premium';

export const subscriptionService = {
  async isPremium(): Promise<boolean> {
    const live = await revenueCatService.checkPremiumStatus();
    await AsyncStorage.setItem(PREMIUM_CACHE_KEY, live ? '1' : '0');
    return live;
  },

  async getCachedPremium(): Promise<boolean> {
    const cached = await AsyncStorage.getItem(PREMIUM_CACHE_KEY);
    return cached === '1';
  },

  async purchase(pkg: unknown): Promise<boolean> {
    return revenueCatService.purchasePackage(pkg);
  },

  async restore(): Promise<boolean> {
    return revenueCatService.restorePurchases();
  },
};
