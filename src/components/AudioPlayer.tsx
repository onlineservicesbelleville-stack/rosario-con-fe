import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, DimensionValue } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { AudioSource } from '../services/audioService';
import { AppCard } from './AppCard';
import { Colors } from '../constants/colors';
import { BorderRadius, FontSize, FontWeight, Shadow, Spacing } from '../constants/theme';
import { formatSeconds } from '../utils/dateUtils';

interface Props {
  title: string;
  /** URL remota (Firebase Storage — Fase 3). */
  audioUrl?: string;
  /** Asset local via require(). Tiene prioridad sobre audioUrl. */
  audioSource?: number;
}

export function AudioPlayer({ title, audioUrl, audioSource }: Props) {
  // asset local tiene prioridad sobre URL remota
  const source: AudioSource | undefined = audioSource ?? (audioUrl || undefined);

  const { isPlaying, isLoading, position, duration, error, toggle } = useAudioPlayer(source);

  // Sin ninguna fuente: mensaje informativo
  if (!source) {
    return (
      <View style={styles.noAudio}>
        <Ionicons name="musical-notes-outline" size={18} color={Colors.textMuted} />
        <Text style={styles.noAudioText}>Audio próximamente</Text>
      </View>
    );
  }

  const progress = duration > 0 ? position / duration : 0;
  const progressPct = `${Math.round(progress * 100)}%` as DimensionValue;

  return (
    <AppCard style={styles.card}>
      {/* Título */}
      <Text style={styles.title} numberOfLines={2}>{title}</Text>

      {/* Barra de progreso */}
      <View style={styles.trackBar}>
        <View style={[styles.trackFill, { width: progressPct }]} />
      </View>

      {/* Tiempos */}
      <View style={styles.times}>
        <Text style={styles.timeText}>{formatSeconds(position)}</Text>
        <Text style={styles.timeText}>{formatSeconds(duration)}</Text>
      </View>

      {/* Error o botón play/pause */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <TouchableOpacity
          onPress={toggle}
          style={styles.playBtn}
          disabled={isLoading}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name={
              isLoading
                ? 'hourglass-outline'
                : isPlaying
                  ? 'pause-circle'
                  : 'play-circle'
            }
            size={56}
            color={Colors.primary}
          />
        </TouchableOpacity>
      )}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  noAudio: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  noAudioText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    fontStyle: 'italic',
  },
  card: {
    alignItems: 'center',
    gap: Spacing.sm,
    ...Shadow.md,
  },
  title: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 22,
  },
  trackBar: {
    width: '100%',
    height: 5,
    backgroundColor: Colors.border,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
  },
  trackFill: {
    height: 5,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
  },
  times: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timeText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  playBtn: { marginTop: Spacing.xs },
  errorText: {
    fontSize: FontSize.sm,
    color: Colors.danger,
    textAlign: 'center',
  },
});
