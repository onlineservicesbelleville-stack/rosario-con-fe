import { useState, useEffect, useCallback } from 'react';
import { subscriptionService } from '../services/subscriptionService';
import { revenueCatService } from '../services/revenueCatService';

export function useSubscription() {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [offerings, setOfferings] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const cached = await subscriptionService.getCachedPremium();
      setIsPremium(cached);
      const live = await subscriptionService.isPremium();
      setIsPremium(live);
      const off = await revenueCatService.getOfferings();
      setOfferings(off);
    } catch {
      setError('No se pudo verificar la suscripción.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const purchase = useCallback(async (pkg: unknown): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const ok = await subscriptionService.purchase(pkg);
      if (ok) setIsPremium(true);
      return ok;
    } catch {
      setError('Error al procesar la compra. Intenta de nuevo.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const restore = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const ok = await subscriptionService.restore();
      if (ok) setIsPremium(true);
      return ok;
    } catch {
      setError('No se encontraron compras anteriores.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isPremium, isLoading, offerings, error, purchase, restore, refresh: load };
}
