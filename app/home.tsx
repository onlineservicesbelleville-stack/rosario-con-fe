import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useDailyMystery } from '../src/hooks/useDailyMystery';
import { useProgress } from '../src/hooks/useProgress';
import { useSubscription } from '../src/hooks/useSubscription';
import { ProgressCard } from '../src/components/ProgressCard';
import { AppButton } from '../src/components/AppButton';
import { Colors } from '../src/constants/colors';
import { BorderRadius, FontSize, FontWeight, Shadow, Spacing } from '../src/constants/theme';

function getGreeting(): { text: string; emoji: string } {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return { text: 'Buenos días', emoji: '🌤️' };
  if (h >= 12 && h < 19) return { text: 'Buenas tardes', emoji: '☀️' };
  return { text: 'Buenas noches', emoji: '🌙' };
}

const QUICK_ITEMS = [
  { icon: 'book-outline' as const, label: 'Oraciones', color: Colors.primary, bg: Colors.backgroundBlue, route: '/prayers' },
  { icon: 'globe-outline' as const, label: 'Misterios', color: Colors.secondary, bg: Colors.premiumGoldLight, route: '/mysteries' },
  { icon: 'star-outline' as const, label: 'Niños', color: Colors.mysteryLuminoso, bg: Colors.mysteryLuminosoLight, route: '/kids' },
  { icon: 'people-outline' as const, label: 'Familia', color: Colors.mysteryGozoso, bg: Colors.mysteryGozosoLight, route: '/family' },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const daily = useDailyMystery();
  const { progress } = useProgress();
  const { isPremium } = useSubscription();
  const greeting = getGreeting();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + Spacing.md, paddingBottom: insets.bottom + Spacing.xxl },
      ]}
      showsVerticalScrollIndicator={false}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.greetingText}>
            {greeting.text} {greeting.emoji}
          </Text>
          <Text style={styles.dateLabel}>{daily.dateLabel}</Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/settings')}
          style={styles.settingsBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="settings-outline" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* ── Misterio del Día ───────────────────────────────── */}
      <View style={[styles.mysteryCard, { borderColor: daily.color + '40' }]}>
        {/* Banda superior de color */}
        <View style={[styles.mysteryBand, { backgroundColor: daily.color }]}>
          <Text style={[
            styles.mysteryBandLabel,
            { color: daily.type === 'glorioso' ? Colors.primaryDark : Colors.textLight },
          ]}>
            {daily.label}
          </Text>
          <View style={styles.mysteryBandRight}>
            <Text style={[
              styles.mysteryBandDays,
              { color: daily.type === 'glorioso' ? Colors.primaryDark : Colors.textLight + 'CC' },
            ]}>
              {daily.days}
            </Text>
          </View>
        </View>

        {/* Cuerpo */}
        <View style={styles.mysteryBody}>
          <Text style={styles.mysteryToday}>Misterio de hoy</Text>
          <AppButton
            label="▶  Rezar Rosario de hoy"
            onPress={() =>
              router.push({ pathname: '/rosary/guided', params: { mysteryType: daily.type } })
            }
            size="lg"
          />
          <TouchableOpacity
            onPress={() => router.push('/rosary')}
            style={styles.allRosaryLink}
          >
            <Text style={styles.allRosaryText}>Ver todos los misterios</Text>
            <Ionicons name="chevron-forward" size={13} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Accesos rápidos ────────────────────────────────── */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explorar</Text>
        <View style={styles.quickGrid}>
          {QUICK_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.route}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.82}
              style={[styles.quickCard, { backgroundColor: item.bg }]}
            >
              <View style={[styles.quickIconWrap, { backgroundColor: item.color + '22' }]}>
                <Ionicons name={item.icon} size={28} color={item.color} />
              </View>
              <Text style={[styles.quickLabel, { color: item.color }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* ── Progreso ───────────────────────────────────────── */}
      <ProgressCard progress={progress} />

      {/* ── Banner Premium ─────────────────────────────────── */}
      {!isPremium && (
        <TouchableOpacity
          onPress={() => router.push('/premium/paywall')}
          activeOpacity={0.85}
          style={styles.premiumBanner}
        >
          <View style={styles.premiumLeft}>
            <View style={styles.premiumIconWrap}>
              <Ionicons name="star" size={20} color={Colors.secondary} />
            </View>
            <View>
              <Text style={styles.premiumTitle}>Desbloquea Premium</Text>
              <Text style={styles.premiumSub}>
                Audios completos, meditaciones y más
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={Colors.secondary} />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { paddingHorizontal: Spacing.md, gap: Spacing.lg },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: { gap: 2 },
  greetingText: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    letterSpacing: 0.1,
  },
  dateLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },

  // Mystery card
  mysteryCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1.5,
    ...Shadow.md,
  },
  mysteryBand: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
  },
  mysteryBandLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.3,
  },
  mysteryBandRight: { alignItems: 'flex-end' },
  mysteryBandDays: {
    fontSize: FontSize.xs,
    letterSpacing: 0.2,
  },
  mysteryBody: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  mysteryToday: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    letterSpacing: 0.3,
  },
  allRosaryLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    paddingTop: Spacing.xs,
  },
  allRosaryText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
  },

  // Quick cards
  section: { gap: Spacing.sm },
  sectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: Spacing.xs,
  },
  quickGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  quickCard: {
    width: '47.5%',
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    alignItems: 'center',
    gap: Spacing.sm,
    ...Shadow.sm,
  },
  quickIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },

  // Premium banner
  premiumBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.premiumGoldLight,
    borderRadius: BorderRadius.xl,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.secondary + '60',
    ...Shadow.sm,
  },
  premiumLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  premiumIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.secondary + '22',
    alignItems: 'center',
    justifyContent: 'center',
  },
  premiumTitle: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.primaryDark,
  },
  premiumSub: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 1,
  },
});
