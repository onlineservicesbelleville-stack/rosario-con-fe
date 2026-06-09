import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader } from '../../src/components/AppHeader';
import { AppCard } from '../../src/components/AppCard';
import { useDailyMystery } from '../../src/hooks/useDailyMystery';
import { MYSTERY_GROUPS } from '../../src/data/mysteries';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, FontSize, FontWeight, Spacing } from '../../src/constants/theme';
import { MysteryType } from '../../src/types/mystery';

export default function RosaryIndexScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const daily = useDailyMystery();

  const startRosary = (type: MysteryType) => {
    router.push({ pathname: '/rosary/guided', params: { mysteryType: type } });
  };

  return (
    <View style={styles.screen}>
      <AppHeader title="El Santo Rosario" />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]}>
        <AppCard style={[styles.todayCard, { borderLeftColor: daily.color }]}>
          <Text style={styles.todayLabel}>Hoy rezamos</Text>
          <Text style={[styles.todayType, { color: daily.color }]}>{daily.label}</Text>
          <TouchableOpacity onPress={() => startRosary(daily.type)} style={styles.todayBtn}>
            <Ionicons name="play-circle" size={22} color={Colors.textLight} />
            <Text style={styles.todayBtnText}>Comenzar Rosario de hoy</Text>
          </TouchableOpacity>
        </AppCard>

        <Text style={styles.sectionTitle}>Todos los Misterios</Text>
        {MYSTERY_GROUPS.map((group) => (
          <TouchableOpacity
            key={group.type}
            onPress={() => startRosary(group.type)}
            activeOpacity={0.85}
          >
            <AppCard style={[styles.groupCard, { borderLeftColor: group.color }]}>
              <View style={styles.groupRow}>
                <View style={[styles.groupDot, { backgroundColor: group.color }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.groupTitle}>{group.label}</Text>
                  <Text style={styles.groupDays}>{group.days.join(' · ')}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
              </View>
            </AppCard>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.md },
  todayCard: { borderLeftWidth: 4, gap: Spacing.sm },
  todayLabel: { fontSize: FontSize.sm, color: Colors.textMuted },
  todayType: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold },
  todayBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.xs,
    alignSelf: 'flex-start',
  },
  todayBtnText: { color: Colors.textLight, fontWeight: FontWeight.semibold, fontSize: FontSize.md },
  sectionTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text, marginTop: Spacing.sm },
  groupCard: { borderLeftWidth: 4 },
  groupRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  groupDot: { width: 10, height: 10, borderRadius: 5 },
  groupTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  groupDays: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
});
