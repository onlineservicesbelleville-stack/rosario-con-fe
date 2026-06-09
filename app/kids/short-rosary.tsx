import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { AppButton } from '../../src/components/AppButton';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, FontSize, FontWeight, Spacing } from '../../src/constants/theme';

const STEPS = [
  { id: '1', emoji: '✝️', title: 'Señal de la Cruz', text: 'En el nombre del Padre, del Hijo y del Espíritu Santo. Amén.' },
  { id: '2', emoji: '🙏', title: 'Padre Nuestro', text: 'Padre nuestro, que estás en el cielo...' },
  { id: '3', emoji: '💐', title: 'Ave María (3 veces)', text: 'Dios te salve, María, llena eres de gracia...' },
  { id: '4', emoji: '✨', title: 'Gloria', text: 'Gloria al Padre, al Hijo y al Espíritu Santo.' },
  { id: '5', emoji: '🌟', title: '¡Terminaste!', text: '¡Muy bien! Rezaste el Rosario corto. La Virgen María está muy contenta contigo.' },
];

export default function KidsShortRosaryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <View style={styles.screen}>
      <AppHeader title="Rosario Corto para Niños" showBack />
      <View style={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]}>
        <View style={styles.card}>
          <Text style={styles.emoji}>{current.emoji}</Text>
          <Text style={styles.title}>{current.title}</Text>
          <Text style={styles.text}>{current.text}</Text>
        </View>

        {isLast ? (
          <AppButton label="Volver al inicio" onPress={() => router.replace('/kids')} />
        ) : (
          <TouchableOpacity onPress={() => setStep((s) => s + 1)} style={styles.nextBtn}>
            <Text style={styles.nextText}>Siguiente ›</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.xl,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.md,
    width: '100%',
  },
  emoji: { fontSize: 72 },
  title: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.primary, textAlign: 'center' },
  text: { fontSize: FontSize.lg, color: Colors.text, textAlign: 'center', lineHeight: 28 },
  nextBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
  },
  nextText: { color: Colors.textLight, fontSize: FontSize.xl, fontWeight: FontWeight.bold },
});
