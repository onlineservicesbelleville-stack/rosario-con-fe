/**
 * RevenueCat service — listo para conectar cuando se configuren las API keys.
 * Sin claves configuradas, todas las funciones devuelven valores seguros por defecto.
 */
import { Platform } from 'react-native';
import { Config } from '../constants/config';

// Importación condicional para evitar crash si el módulo no está linkado
let Purchases: typeof import('react-native-purchases').default | null = null;
try {
  Purchases = require('react-native-purchases').default;
} catch {
  // react-native-purchases no está linkado todavía
}

export const revenueCatService = {
  async configure(): Promise<void> {
    if (!Purchases || !Config.features.revenueCatEnabled) return;
    try {
      const key =
        Platform.OS === 'ios'
          ? Config.revenueCat.iosApiKey
          : Config.revenueCat.androidApiKey;
      Purchases.configure({ apiKey: key });
    } catch {
      // Silencia errores de configuración
    }
  },

  async getCustomerInfo() {
    if (!Purchases || !Config.features.revenueCatEnabled) return null;
    try {
      return await Purchases.getCustomerInfo();
    } catch {
      return null;
    }
  },

  async checkPremiumStatus(): Promise<boolean> {
    if (!Purchases || !Config.features.revenueCatEnabled) return false;
    try {
      const info = await Purchases.getCustomerInfo();
      return (
        typeof info.entitlements.active[Config.revenueCat.entitlement] !== 'undefined'
      );
    } catch {
      return false;
    }
  },

  async getOfferings() {
    if (!Purchases || !Config.features.revenueCatEnabled) return null;
    try {
      return await Purchases.getOfferings();
    } catch {
      return null;
    }
  },

  async purchasePackage(pkg: unknown): Promise<boolean> {
    if (!Purchases || !Config.features.revenueCatEnabled) return false;
    try {
      const { customerInfo } = await (Purchases as any).purchasePackage(pkg);
      return typeof customerInfo.entitlements.active[Config.revenueCat.entitlement] !== 'undefined';
    } catch (e: any) {
      if (e?.userCancelled) return false;
      throw e;
    }
  },

  async restorePurchases(): Promise<boolean> {
    if (!Purchases || !Config.features.revenueCatEnabled) return false;
    try {
      const info = await Purchases.restorePurchases();
      return typeof info.entitlements.active[Config.revenueCat.entitlement] !== 'undefined';
    } catch {
      return false;
    }
  },
};
