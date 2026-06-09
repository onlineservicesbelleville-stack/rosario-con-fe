import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KIDS_LESSONS } from '../../../src/data/kidsLessons';
import { AppHeader } from '../../../src/components/AppHeader';
import { AppButton } from '../../../src/components/AppButton';
import { AppCard } from '../../../src/components/AppCard';
import { Colors } from '../../../src/constants/colors';
import { FontSize, FontWeight, Spacing } from '../../../src/constants/theme';

export default function KidsLessonScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const lesson = KIDS_LESSONS.find((l) => l.id === id);

  if (!lesson) return null;

  if (lesson.isPremium) {
    return (
      <View style={styles.screen}>
        <AppHeader title={lesson.title} showBack />
        <View style={styles.locked}>
          <Text style={styles.lockEmoji}>🔒</Text>
          <Text style={styles.lockTitle}>Contenido Premium</Text>
          <Text style={styles.lockDesc}>
            Esta lección es parte del Modo Niños Premium. ¡Desbloquea todas las historias y actividades!
          </Text>
          <AppButton label="Ver planes Premium" onPress={() => router.push('/premium/paywall')} />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <AppHeader title={lesson.title} showBack />
      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]}>
        <Text style={styles.emoji}>{lesson.emoji}</Text>
        <AppCard>
          <Text style={styles.body}>{lesson.content}</Text>
        </AppCard>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: Spacing.md, gap: Spacing.md, alignItems: 'center' },
  emoji: { fontSize: 80 },
  body: { fontSize: FontSize.lg, color: Colors.text, lineHeight: 30 },
  locked: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  lockEmoji: { fontSize: 64 },
  lockTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text },
  lockDesc: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24 },
});
