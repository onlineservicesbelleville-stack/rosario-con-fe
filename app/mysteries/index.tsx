import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MYSTERY_GROUPS } from '../../src/data/mysteries';
import { MysteryCard } from '../../src/components/MysteryCard';
import { AppHeader } from '../../src/components/AppHeader';
import { useDailyMystery } from '../../src/hooks/useDailyMystery';
import { Colors } from '../../src/constants/colors';
import { FontSize, FontWeight, Spacing } from '../../src/constants/theme';

export default function MysteriesScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const daily = useDailyMystery();

  const sections = MYSTERY_GROUPS.map((g) => ({
    title: g.label,
    color: g.color,
    isToday: g.type === daily.type,
    data: g.mysteries,
  }));

  return (
    <View style={styles.screen}>
      <AppHeader title="Los Misterios" showBack />
      <SectionList
        sections={sections}
        keyExtractor={(m) => m.id}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + Spacing.xl }]}
        renderSectionHeader={({ section }) => (
          <View style={[styles.sectionHeader, { borderLeftColor: section.color }]}>
            <Text style={[styles.sectionTitle, { color: section.color }]}>{section.title}</Text>
            {section.isToday && <Text style={styles.todayBadge}>Hoy</Text>}
          </View>
        )}
        renderItem={({ item, index }) => (
          <MysteryCard
            mystery={item}
            index={index}
            onPress={() => router.push(`/mysteries/${item.id}`)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    borderLeftWidth: 3,
    paddingLeft: Spacing.sm,
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, flex: 1 },
  todayBadge: {
    backgroundColor: Colors.success,
    color: Colors.textLight,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 99,
  },
});
