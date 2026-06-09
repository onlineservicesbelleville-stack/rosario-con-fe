import React from 'react';
import {
  View, Text, ScrollView, Switch, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../../src/components/AppHeader';
import { AppCard } from '../../src/components/AppCard';
import { useNotifications } from '../../src/hooks/useNotifications';
import { useSubscription } from '../../src/hooks/useSubscription';
import { Colors } from '../../src/constants/colors';
import { FontSize, FontWeight, Spacing } from '../../src/constants/theme';

export default function SettingsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isReminderActive, scheduleReminder, cancelReminder } = useNotifications();
  const { isPremium, restore } = useSubscription();
  const reminderHour = 20;
  const reminderMinute = 0;

  const toggleReminder = async (val: boolean) => {
    if (val) {
      await scheduleReminder(reminderHour, reminderMinute);
    } else {
      await cancelReminder();
    }
  };

  const handleRestore = async () => {
    const ok = await restore();
    Alert.alert(ok ? '¡Listo!' : 'Sin compras', ok ? 'Compras restauradas.' : 'No se encontraron compras previas.');
  };

  return (
    <View style={styles.screen}>
      <AppHeader title="Ajustes" showBack />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]}>

        {/* Suscripción */}
        <SectionTitle label="Suscripción" />
        <AppCard>
          <SettingRow
            icon="star"
            iconColor={Colors.secondary}
            label="Estado Premium"
            value={isPremium ? 'Activo ✓' : 'No activo'}
          />
          {!isPremium && (
            <TouchableOpacity onPress={() => router.push('/premium/paywall')} style={styles.upgradeBtn}>
              <Text style={styles.upgradeText}>Ver planes Premium →</Text>
            </TouchableOpacity>
          )}
          <SettingAction icon="refresh" iconColor={Colors.primary} label="Restaurar compras" onPress={handleRestore} />
        </AppCard>

        {/* Recordatorios */}
        <SectionTitle label="Recordatorio diario" />
        <AppCard>
          <View style={styles.row}>
            <Ionicons name="notifications-outline" size={20} color={Colors.primary} />
            <Text style={styles.rowLabel}>Recordatorio a las 20:00</Text>
            <Switch
              value={isReminderActive}
              onValueChange={toggleReminder}
              trackColor={{ false: Colors.border, true: Colors.primary + '88' }}
              thumbColor={isReminderActive ? Colors.primary : Colors.textMuted}
            />
          </View>
        </AppCard>

        {/* Info */}
        <SectionTitle label="Información" />
        <AppCard>
          <SettingAction icon="document-text-outline" iconColor={Colors.textSecondary} label="Términos de uso" onPress={() => {}} />
          <SettingAction icon="shield-checkmark-outline" iconColor={Colors.textSecondary} label="Política de privacidad" onPress={() => {}} />
          <SettingRow icon="information-circle-outline" iconColor={Colors.textSecondary} label="Versión" value="1.0.0" />
        </AppCard>

      </ScrollView>
    </View>
  );
}

function SectionTitle({ label }: { label: string }) {
  return <Text style={styles.sectionTitle}>{label}</Text>;
}

function SettingRow({ icon, iconColor, label, value }: { icon: string; iconColor: string; label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Ionicons name={icon as any} size={20} color={iconColor} />
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

function SettingAction({ icon, iconColor, label, onPress }: { icon: string; iconColor: string; label: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.row}>
      <Ionicons name={icon as any} size={20} color={iconColor} />
      <Text style={[styles.rowLabel, { flex: 1 }]}>{label}</Text>
      <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.sm },
  sectionTitle: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  rowLabel: { flex: 1, fontSize: FontSize.md, color: Colors.text },
  rowValue: { fontSize: FontSize.md, color: Colors.textSecondary },
  upgradeBtn: { paddingVertical: Spacing.sm },
  upgradeText: { fontSize: FontSize.md, color: Colors.secondary, fontWeight: FontWeight.semibold },
});
