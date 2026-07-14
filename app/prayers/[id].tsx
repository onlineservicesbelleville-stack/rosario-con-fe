import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { AudioPlayer } from '../../src/components/AudioPlayer';
import { PremiumBadge } from '../../src/components/PremiumBadge';
import { AppCard } from '../../src/components/AppCard';
import { getPrayerById } from '../../src/data/prayers';
import { Colors } from '../../src/constants/colors';
import { FontSize, FontWeight, Spacing } from '../../src/constants/theme';

export default function PrayerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const prayer = getPrayerById(id ?? '');

  if (!prayer) return null;

  return (
    <View style={styles.screen}>
      <AppHeader title={prayer.title} showBack />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]}>
        {prayer.isPremium && (
          <View style={styles.badgeRow}>
            <PremiumBadge />
            <Text style={styles.premiumNote}>Contenido Premium</Text>
          </View>
        )}

        <AppCard>
          <Text style={styles.prayerText}>{prayer.text}</Text>
        </AppCard>

        <AppCard>
          <Text style={styles.sectionLabel}>¿Qué significa?</Text>
          <Text style={styles.explanation}>{prayer.explanation}</Text>
        </AppCard>

        <AudioPlayer
          title={prayer.title}
          audioSource={prayer.audioSource}
          audioUrl={prayer.audioUrl}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.md },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  premiumNote: { fontSize: FontSize.sm, color: Colors.textSecondary },
  prayerText: {
    fontSize: FontSize.lg,
    color: Colors.text,
    lineHeight: 30,
    letterSpacing: 0.3,
  },
  sectionLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  explanation: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 24 },
});
