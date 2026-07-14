import React, { useState, useMemo, useCallback } from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { buildRosarySteps } from '../../src/data/rosarySteps';
import { MysteryType } from '../../src/types/mystery';
import { getMysteryLabel, getMysteryTypeForDay } from '../../src/utils/mysteryUtils';
import { AudioPlayer } from '../../src/components/AudioPlayer';
import { useProgress } from '../../src/hooks/useProgress';
import { Colors, mysteryLightColor } from '../../src/constants/colors';
import { BorderRadius, FontSize, FontWeight, Shadow, Spacing } from '../../src/constants/theme';
import { getMysteryGroupColor } from '../../src/data/mysteries';

// Ícono por tipo de paso
const stepIcon: Record<string, 'cross-outline' | 'musical-notes-outline' | 'sparkles-outline' | 'checkmark-circle-outline'> = {
  prayer: 'cross-outline',
  mystery: 'sparkles-outline',
  intro: 'musical-notes-outline',
  finish: 'checkmark-circle-outline',
};

export default function GuidedRosaryScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const params = useLocalSearchParams<{ mysteryType?: string }>();
  const { recordRosary } = useProgress();

  const mysteryType = (params.mysteryType as MysteryType) ?? getMysteryTypeForDay();
  const steps = useMemo(() => buildRosarySteps(mysteryType), [mysteryType]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentStep = steps[currentIndex];
  const progress = (currentIndex + 1) / steps.length;
  const mysteryColor = getMysteryGroupColor(mysteryType);
  const mysteryLightBg = mysteryLightColor[mysteryType] ?? Colors.celesteLight;
  const isMysteryStep = currentStep.type === 'mystery';
  const isFinishStep = currentStep.type === 'finish';

  const goNext = useCallback(async () => {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      await recordRosary();
      router.replace({
        pathname: '/rosary/completed',
        params: { totalSteps: String(steps.length), mysteryType },
      });
    }
  }, [currentIndex, steps.length, recordRosary, router, mysteryType]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  }, [currentIndex]);

  return (
    <View style={styles.screen}>
      {/* ── Top bar ──────────────────────────────────────── */}
      <View style={[styles.topBar, { paddingTop: insets.top + Spacing.xs }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.closeBtn}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons name="close" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>

        <View style={styles.topCenter}>
          <Text style={styles.typeLabel}>{getMysteryLabel(mysteryType)}</Text>
          <Text style={styles.stepCount}>{currentIndex + 1} / {steps.length}</Text>
        </View>

        <View style={styles.closeBtn} />
      </View>

      {/* ── Progress bar ─────────────────────────────────── */}
      <View style={styles.progressTrack}>
        <View
          style={[
            styles.progressFill,
            { width: `${Math.round(progress * 100)}%`, backgroundColor: mysteryColor },
          ]}
        />
      </View>

      {/* ── Contenido ────────────────────────────────────── */}
      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 96 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Chip de tipo de paso */}
        <View style={styles.stepTypeRow}>
          <View style={[styles.stepTypeChip, isMysteryStep && { backgroundColor: mysteryLightBg }]}>
            <Ionicons
              name={stepIcon[currentStep.type] ?? 'cross-outline'}
              size={13}
              color={isMysteryStep ? mysteryColor : Colors.primary}
            />
            <Text style={[styles.stepTypeText, isMysteryStep && { color: mysteryColor }]}>
              {isMysteryStep
                ? `${currentStep.mysteryNumber}° Misterio`
                : currentStep.type === 'intro' ? 'Inicio'
                  : currentStep.type === 'finish' ? '¡Completado!'
                    : 'Oración'}
            </Text>
          </View>
        </View>

        {/* Título del paso */}
        <Text style={[
          styles.stepTitle,
          isFinishStep && { color: Colors.success, textAlign: 'center' },
        ]}>
          {currentStep.title}
        </Text>

        {/* Texto de la oración — en tarjeta si es oración/misterio */}
        {currentStep.text ? (
          isMysteryStep ? (
            // Misterios: fondo suave del color del misterio
            <View style={[styles.meditationCard, { backgroundColor: mysteryLightBg, borderColor: mysteryColor + '30' }]}>
              <Text style={styles.meditationText}>{currentStep.text}</Text>
            </View>
          ) : (
            // Oraciones: tarjeta blanca con línea izquierda
            <View style={[styles.prayerCard, { borderLeftColor: mysteryColor }]}>
              <Text style={styles.prayerText}>{currentStep.text}</Text>
            </View>
          )
        ) : null}

        {/* Indicador de repeticiones (Ave María x10, etc.) */}
        {currentStep.repetitions && currentStep.repetitions > 1 && (
          <View style={styles.repSection}>
            <Text style={styles.repTitle}>
              {currentStep.currentRepetition} de {currentStep.repetitions}
            </Text>
            <View style={styles.repRow}>
              {Array.from({ length: currentStep.repetitions }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.repDot,
                    i < (currentStep.currentRepetition ?? 0) && [
                      styles.repDotActive,
                      { backgroundColor: mysteryColor },
                    ],
                  ]}
                />
              ))}
            </View>
          </View>
        )}

        {/* Audio — muestra player si hay asset local o URL remota */}
        {(currentStep.audioSource || currentStep.audioUrl) && (
          <AudioPlayer
            title={currentStep.title}
            audioSource={currentStep.audioSource}
            audioUrl={currentStep.audioUrl}
          />
        )}
      </ScrollView>

      {/* ── Barra de navegación ──────────────────────────── */}
      <View style={[styles.navBar, { paddingBottom: insets.bottom + Spacing.sm }]}>
        <TouchableOpacity
          onPress={goPrev}
          disabled={currentIndex === 0}
          style={[styles.prevBtn, currentIndex === 0 && styles.btnDisabled]}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={currentIndex === 0 ? Colors.border : Colors.primary}
          />
          <Text style={[styles.prevText, currentIndex === 0 && { color: Colors.border }]}>
            Anterior
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={goNext}
          style={[styles.nextBtn, { backgroundColor: mysteryColor }]}
        >
          <Text style={styles.nextText}>
            {currentIndex === steps.length - 1 ? 'Finalizar' : 'Siguiente'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color={Colors.textLight} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },

  // Top bar
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    justifyContent: 'space-between',
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCenter: { alignItems: 'center', flex: 1 },
  typeLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
    letterSpacing: 0.2,
  },
  stepCount: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 1,
  },

  // Progress
  progressTrack: {
    height: 5,
    backgroundColor: Colors.border,
  },
  progressFill: {
    height: 5,
    borderRadius: 0,
  },

  // Content
  content: { padding: Spacing.md, gap: Spacing.md },

  // Step type chip
  stepTypeRow: { alignItems: 'flex-start' },
  stepTypeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.backgroundBlue,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  stepTypeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.primary,
    letterSpacing: 0.3,
  },

  // Step title
  stepTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.text,
    lineHeight: 32,
  },

  // Prayer card (oraciones)
  prayerCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    borderLeftWidth: 4,
    padding: Spacing.md,
    paddingLeft: Spacing.md + 4,
    ...Shadow.sm,
  },
  prayerText: {
    fontSize: FontSize.lg,
    color: Colors.text,
    lineHeight: 32,
    letterSpacing: 0.15,
  },

  // Meditation card (misterios)
  meditationCard: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.md,
  },
  meditationText: {
    fontSize: FontSize.md,
    color: Colors.text,
    lineHeight: 26,
    fontStyle: 'italic',
  },

  // Repetitions
  repSection: { gap: Spacing.xs },
  repTitle: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontWeight: FontWeight.medium,
  },
  repRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs },
  repDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.border,
  },
  repDotActive: {},

  // Nav bar
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    backgroundColor: Colors.card,
    gap: Spacing.sm,
    ...Shadow.lg,
  },
  prevBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.backgroundAlt,
  },
  btnDisabled: { opacity: 0.35 },
  prevText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.primary,
  },
  nextBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.lg,
    ...Shadow.sm,
  },
  nextText: {
    color: Colors.textLight,
    fontWeight: FontWeight.semibold,
    fontSize: FontSize.md,
    letterSpacing: 0.2,
  },
});
