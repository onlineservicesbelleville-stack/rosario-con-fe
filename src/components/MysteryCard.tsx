import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Mystery } from '../types/mystery';
import { getMysteryGroupColor } from '../data/mysteries';
import { getMysteryDays } from '../utils/mysteryUtils';
import { mysteryLightColor } from '../constants/colors';
import { PremiumBadge } from './PremiumBadge';
import { MysteryImage } from './MysteryImage';
import { Colors } from '../constants/colors';
import { BorderRadius, FontSize, FontWeight, Shadow, Spacing } from '../constants/theme';

interface Props {
  mystery: Mystery;
  onPress: () => void;
  index?: number;
}

export function MysteryCard({ mystery, onPress, index }: Props) {
  const color = getMysteryGroupColor(mystery.type);
  const lightBg = mysteryLightColor[mystery.type] ?? Colors.celesteLight;
  const num = index !== undefined ? index + 1 : mystery.order;
  const useWhiteText = mystery.type !== 'glorioso';

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.82} style={styles.container}>
      {/* Número con color de fondo */}
      <View style={[styles.numBox, { backgroundColor: color }]}>
        <Text style={[styles.num, { color: useWhiteText ? Colors.textLight : Colors.primaryDark }]}>
          {num}
        </Text>
      </View>

      {/* Imagen del tipo de misterio */}
      <MysteryImage imageSource={mystery.imageSource} style={styles.thumb} iconSize={22} />

      {/* Contenido */}
      <View style={[styles.content, { backgroundColor: lightBg }]}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={2}>{mystery.title}</Text>
          {mystery.isPremium && <PremiumBadge />}
        </View>
        <Text style={styles.days}>{getMysteryDays(mystery.type)}</Text>
        <Text style={styles.description} numberOfLines={2}>{mystery.shortDescription}</Text>
      </View>

      {/* Chevron */}
      <View style={styles.chevronWrap}>
        <Ionicons name="chevron-forward" size={16} color={color} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
    ...Shadow.sm,
  },
  numBox: {
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
  },
  num: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
  },
  thumb: {
    width: 56,
    height: 56,
  },
  content: {
    flex: 1,
    padding: Spacing.sm + 2,
    gap: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.xs,
  },
  title: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
    lineHeight: 20,
  },
  days: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    letterSpacing: 0.2,
  },
  description: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  chevronWrap: {
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
