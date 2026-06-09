import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { FontSize, Spacing } from '../constants/theme';

interface Props {
  icon?: string;
  title: string;
  description?: string;
}

export function EmptyState({ icon = 'search-outline', title, description }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon as any} size={48} color={Colors.textMuted} />
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.desc}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xxl,
    gap: Spacing.sm,
  },
  title: { fontSize: FontSize.lg, color: Colors.textSecondary, fontWeight: '600' },
  desc: { fontSize: FontSize.sm, color: Colors.textMuted, textAlign: 'center', maxWidth: 260 },
});
