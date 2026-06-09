import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Prayer } from '../types/prayer';
import { PremiumBadge } from './PremiumBadge';
import { Colors } from '../constants/colors';
import { BorderRadius, FontSize, FontWeight, Shadow, Spacing } from '../constants/theme';

// Color de fondo del ícono por oración
const iconBgByOrder: Record<number, string> = {
  1: Colors.celesteLight,      // Señal de la Cruz
  2: Colors.mysteryGozosoLight,// Credo
  3: Colors.backgroundBlue,    // Padre Nuestro
  4: '#EAF5FB',                // Ave María
  5: Colors.premiumGoldLight,  // Gloria
  6: Colors.mysteryLuminosoLight, // Jaculatoria
  7: '#EDF0FA',                // Salve
  8: Colors.mysteryGozosoLight,// Oración Final
};

const iconColorByOrder: Record<number, string> = {
  1: Colors.primary,
  2: Colors.mysteryGozoso,
  3: Colors.primaryLight,
  4: Colors.celesteDark,
  5: Colors.secondaryDark,
  6: Colors.mysteryLuminoso,
  7: Colors.primaryLight,
  8: Colors.mysteryGozoso,
};

interface Props {
  prayer: Prayer;
  onPress: () => void;
}

export function PrayerCard({ prayer, onPress }: Props) {
  const iconBg = iconBgByOrder[prayer.order] ?? Colors.celesteLight;
  const iconColor = iconColorByOrder[prayer.order] ?? Colors.primary;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.82} style={styles.container}>
      {/* Ícono */}
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        <Ionicons name="book-outline" size={20} color={iconColor} />
      </View>

      {/* Contenido */}
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>{prayer.title}</Text>
          {prayer.isPremium && <PremiumBadge />}
        </View>
        <Text style={styles.explanation} numberOfLines={2}>{prayer.explanation}</Text>
      </View>

      <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flex: 1 },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  title: {
    flex: 1,
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.text,
  },
  explanation: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 3,
    lineHeight: 18,
  },
});
