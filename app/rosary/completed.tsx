import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppButton } from '../../src/components/AppButton';
import { getMysteryLabel } from '../../src/utils/mysteryUtils';
import { MysteryType } from '../../src/types/mystery';
import { Colors } from '../../src/constants/colors';
import { FontSize, FontWeight, Spacing } from '../../src/constants/theme';

export default function CompletedScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ totalSteps: string; mysteryType: string }>();

  const mysteryType = (params.mysteryType as MysteryType) ?? 'gozoso';

  return (
    <View style={[styles.screen, { paddingTop: insets.top + Spacing.xl, paddingBottom: insets.bottom + Spacing.xl }]}>
      <Text style={styles.emoji}>🌟</Text>
      <Text style={styles.title}>¡Rosario Completado!</Text>
      <Text style={styles.subtitle}>
        Has rezado los {getMysteryLabel(mysteryType)}.{'\n'}
        Que la Virgen María lleve tus intenciones al corazón de Jesús.
      </Text>

      <View style={styles.actions}>
        <AppButton label="Volver al inicio" onPress={() => router.replace('/home')} />
        <AppButton
          label="Rezar otro Rosario"
          variant="outline"
          onPress={() => router.replace('/rosary')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  emoji: { fontSize: 80 },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  actions: { width: '100%', gap: Spacing.sm, marginTop: Spacing.xl },
});
