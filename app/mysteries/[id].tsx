import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { AudioPlayer } from '../../src/components/AudioPlayer';
import { PremiumBadge } from '../../src/components/PremiumBadge';
import { AppCard } from '../../src/components/AppCard';
import { MysteryImage } from '../../src/components/MysteryImage';
import { getMysteryById, getMysteryGroupColor } from '../../src/data/mysteries';
import { getMysteryLabel, getMysteryDays } from '../../src/utils/mysteryUtils';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, FontSize, FontWeight, Spacing } from '../../src/constants/theme';

export default function MysteryDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const mystery = getMysteryById(id ?? '');

  if (!mystery) return null;

  const color = getMysteryGroupColor(mystery.type);

  return (
    <View style={styles.screen}>
      <AppHeader title={mystery.title} showBack />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]}>
        <MysteryImage imageSource={mystery.imageSource} style={styles.banner} iconSize={48} />

        <View style={[styles.badge, { backgroundColor: color + '20', borderColor: color }]}>
          <Text style={[styles.badgeText, { color }]}>{getMysteryLabel(mystery.type)}</Text>
          <Text style={styles.badgeDays}>· {getMysteryDays(mystery.type)}</Text>
          {mystery.isPremium && <PremiumBadge />}
        </View>

        <Text style={styles.description}>{mystery.shortDescription}</Text>

        <AppCard>
          <Text style={styles.label}>Meditación</Text>
          <Text style={styles.body}>{mystery.meditation}</Text>
        </AppCard>

        <AppCard>
          <Text style={styles.label}>Intención sugerida</Text>
          <Text style={styles.body}>{mystery.intention}</Text>
        </AppCard>

        <AppCard>
          <Text style={styles.label}>Para los niños</Text>
          <Text style={styles.body}>{mystery.kidsVersion}</Text>
        </AppCard>

        <AudioPlayer
          title={mystery.title}
          audioSource={mystery.audioSource}
          audioUrl={mystery.audioUrl}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.md },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: BorderRadius.lg,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: 99,
    borderWidth: 1,
  },
  badgeText: { fontSize: FontSize.sm, fontWeight: FontWeight.semibold },
  badgeDays: { fontSize: FontSize.sm, color: Colors.textSecondary },
  description: { fontSize: FontSize.lg, color: Colors.text, lineHeight: 26 },
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.xs,
  },
  body: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 24 },
});
