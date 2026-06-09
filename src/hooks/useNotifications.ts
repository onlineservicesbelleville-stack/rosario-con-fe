import { useState, useEffect, useCallback } from 'react';
import { notificationService } from '../services/notificationService';

export function useNotifications() {
  const [hasPermission, setHasPermission] = useState(false);
  const [isReminderActive, setIsReminderActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    notificationService.getReminderStatus().then(({ active }) => {
      setIsReminderActive(active);
    });
  }, []);

  const requestPermissions = useCallback(async () => {
    const granted = await notificationService.requestPermissions();
    setHasPermission(granted);
    return granted;
  }, []);

  const scheduleReminder = useCallback(async (hour: number, minute: number) => {
    setIsLoading(true);
    const granted = await notificationService.requestPermissions();
    if (!granted) { setIsLoading(false); return false; }
    const id = await notificationService.scheduleDailyReminder(hour, minute);
    setIsReminderActive(!!id);
    setIsLoading(false);
    return !!id;
  }, []);

  const cancelReminder = useCallback(async () => {
    setIsLoading(true);
    await notificationService.cancelDailyReminder();
    setIsReminderActive(false);
    setIsLoading(false);
  }, []);

  return { hasPermission, isReminderActive, isLoading, requestPermissions, scheduleReminder, cancelReminder };
}
