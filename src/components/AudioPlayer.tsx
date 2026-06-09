import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { AppCard } from './AppCard';
import { Colors } from '../constants/colors';
import { BorderRadius, FontSize, FontWeight, Spacing } from '../constants/theme';
import { formatSeconds } from '../utils/dateUtils';

interface Props {
  title: string;
  audioUrl?: string;
}

export function AudioPlayer({ title, audioUrl }: Props) {
  const { isPlaying, isLoading, position, duration, error, toggle } = useAudioPlayer(audioUrl);

  if (!audioUrl) {
    return (
      <AppCard style={styles.noAudio}>
        <Ionicons name="musical-notes-outline" size={20} color={Colors.textMuted} />
        <Text style={styles.noAudioText}>Audio próximamente</Text>
      </AppCard>
    );
  }

  const progress = duration > 0 ? position / duration : 0;

  return (
    <AppCard style={styles.card}>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>

      <View style={styles.trackBar}>
        <View style={[styles.trackFill, { flex: progress }]} />
        <View style={[styles.trackEmpty, { flex: 1 - progress }]} />
      </View>

      <View style={styles.times}>
        <Text style={styles.timeText}>{formatSeconds(position)}</Text>
        <Text style={styles.timeText}>{formatSeconds(duration)}</Text>
      </View>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        <TouchableOpacity onPress={toggle} style={styles.playBtn} disabled={isLoading}>
          <Ionicons
            name={isLoading ? 'hourglass-outline' : isPlaying ? 'pause-circle' : 'play-circle'}
            size={52}
            color={Colors.primary}
          />
        </TouchableOpacity>
      )}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', gap: Spacing.sm },
  noAudio: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
  },
  noAudioText: { fontSize: FontSize.sm, color: Colors.textMuted },
  title: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
    color: Colors.text,
    textAlign: 'center',
  },
  trackBar: {
    flexDirection: 'row',
    width: '100%',
    height: 4,
    borderRadius: BorderRadius.full,
    overflow: 'hidden',
    backgroundColor: Colors.border,
  },
  trackFill: { backgroundColor: Colors.primary },
  trackEmpty: {},
  times: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timeText: { fontSize: FontSize.xs, color: Colors.textMuted },
  playBtn: { marginTop: Spacing.xs },
  error: { fontSize: FontSize.sm, color: Colors.danger, textAlign: 'center' },
});
