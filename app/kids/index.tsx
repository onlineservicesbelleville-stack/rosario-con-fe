import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KIDS_LESSONS } from '../../src/data/kidsLessons';
import { AppHeader } from '../../src/components/AppHeader';
import { PremiumBadge } from '../../src/components/PremiumBadge';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, FontSize, FontWeight, Shadow, Spacing } from '../../src/constants/theme';

// Paleta pastel rotativa por lección
const CARD_THEMES = [
  { bg: Colors.backgroundBlue, iconBg: Colors.celesteLight, iconColor: Colors.primary },
  { bg: '#FEF3E2',             iconBg: '#FDE8C2',           iconColor: Colors.warning },
  { bg: Colors.mysteryGozosoLight, iconBg: '#C5E4F8', iconColor: Colors.mysteryGozoso },
  { bg: Colors.successLight,   iconBg: '#C8EDD8',           iconColor: Colors.success },
  { bg: Colors.premiumGoldLight, iconBg: '#EDD89A',         iconColor: Colors.secondary },
  { bg: Colors.mysteryLuminosoLight, iconBg: '#B5E6D2', iconColor: Colors.mysteryLuminoso },
];

export default function KidsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <AppHeader title="Modo Niños ⭐" subtitle="Aprende con amor y alegría" showBack />

      <FlatList
        data={KIDS_LESSONS}
        keyExtractor={(l) => l.id}
        contentContainerStyle={[
          styles.list,
          { paddingBottom: insets.bottom + Spacing.xl },
        ]}
        renderItem={({ item, index }) => {
          const theme = CARD_THEMES[index % CARD_THEMES.length];

          return (
            <TouchableOpacity
              onPress={() =>
                item.id === 'rosario-corto'
                  ? router.push('/kids/short-rosary')
                  : router.push(`/kids/lesson/${item.id}`)
              }
              activeOpacity={0.82}
              style={[styles.card, { backgroundColor: theme.bg }]}
            >
              {/* Emoji en círculo coloreado */}
              <View style={[styles.emojiWrap, { backgroundColor: theme.iconBg }]}>
                <Text style={styles.emoji}>{item.emoji}</Text>
              </View>

              {/* Info */}
              <View style={styles.info}>
                <View style={styles.titleRow}>
                  <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                  {item.isPremium && <PremiumBadge />}
                </View>
                <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
              </View>

              {/* Arrow */}
              <Ionicons
                name={item.isPremium ? 'lock-closed-outline' : 'chevron-forward'}
                size={18}
                color={item.isPremium ? Colors.secondary : theme.iconColor}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md, gap: Spacing.sm },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    gap: Spacing.md,
    ...Shadow.sm,
  },
  emojiWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 30 },

  info: { flex: 1 },
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
  desc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 3,
    lineHeight: 18,
  },
});
