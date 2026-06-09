import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const REMINDER_ID_KEY = '@rosario_reminder_id';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const notificationService = {
  async requestPermissions(): Promise<boolean> {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('rosario-reminder', {
        name: 'Recordatorio del Rosario',
        importance: Notifications.AndroidImportance.HIGH,
        sound: 'default',
      });
    }
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  },

  async scheduleDailyReminder(hour: number, minute: number): Promise<string | null> {
    try {
      await notificationService.cancelDailyReminder();
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: '🙏 Hora del Rosario',
          body: 'Es momento de rezar el Santo Rosario con tu familia.',
          sound: 'default',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DAILY,
          hour,
          minute,
        },
      });
      await AsyncStorage.setItem(REMINDER_ID_KEY, id);
      return id;
    } catch {
      return null;
    }
  },

  async cancelDailyReminder(): Promise<void> {
    const id = await AsyncStorage.getItem(REMINDER_ID_KEY);
    if (id) {
      await Notifications.cancelScheduledNotificationAsync(id);
      await AsyncStorage.removeItem(REMINDER_ID_KEY);
    }
  },

  async getReminderStatus(): Promise<{ active: boolean; notificationId: string | null }> {
    const id = await AsyncStorage.getItem(REMINDER_ID_KEY);
    return { active: !!id, notificationId: id };
  },
};
