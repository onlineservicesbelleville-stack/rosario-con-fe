import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PRAYERS } from '../../src/data/prayers';
import { PrayerCard } from '../../src/components/PrayerCard';
import { AppHeader } from '../../src/components/AppHeader';
import { Colors } from '../../src/constants/colors';
import { Spacing } from '../../src/constants/theme';

export default function PrayersScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      <AppHeader title="Oraciones del Rosario" showBack />
      <FlatList
        data={PRAYERS}
        keyExtractor={(p) => p.id}
        contentContainerStyle={[styles.list, { paddingBottom: insets.bottom + Spacing.xl }]}
        renderItem={({ item }) => (
          <PrayerCard prayer={item} onPress={() => router.push(`/prayers/${item.id}`)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  list: { padding: Spacing.md },
});
