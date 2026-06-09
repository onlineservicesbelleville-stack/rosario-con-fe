import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProgressData } from '../services/progressService';
import { Colors } from '../constants/colors';
import { BorderRadius, FontSize, FontWeight, Shadow, Spacing } from '../constants/theme';
import { formatStreak } from '../utils/formatters';

interface Props {
  progress: ProgressData;
}

export function ProgressCard({ progress }: Props) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionLabel}>Tu progreso</Text>
      <View style={styles.row}>
        <StatChip
          icon="flame"
          iconColor={Colors.secondary}
          bg={Colors.premiumGoldLight}
          value={progress.streak > 0 ? `${progress.streak}` : '0'}
          label={progress.streak === 1 ? 'día' : 'días'}
          sublabel="Racha"
        />
        <StatChip
          icon="checkmark-circle"
          iconColor={Colors.success}
          bg={Colors.successLight}
          value={String(progress.rosaryCount)}
          label=""
          sublabel="Rosarios"
        />
        <StatChip
          icon="book"
          iconColor={Colors.primary}
          bg={Colors.backgroundBlue}
          value={String(progress.prayersLearned.length)}
          label=""
          sublabel="Oraciones"
        />
      </View>
    </View>
  );
}

function StatChip({
  icon, iconColor, bg, value, label, sublabel,
}: {
  icon: string;
  iconColor: string;
  bg: string;
  value: string;
  label: string;
  sublabel: string;
}) {
  return (
    <View style={[styles.chip, { backgroundColor: bg }]}>
      <Ionicons name={icon as any} size={20} color={iconColor} />
      <Text style={[styles.chipValue, { color: iconColor }]}>
        {value}
        {label ? <Text style={styles.chipUnit}> {label}</Text> : null}
      </Text>
      <Text style={styles.chipLabel}>{sublabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: Spacing.sm },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: Spacing.xs,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  chip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: 4,
    ...Shadow.sm,
  },
  chipValue: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
  },
  chipUnit: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
  },
  chipLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: FontWeight.medium,
  },
});
