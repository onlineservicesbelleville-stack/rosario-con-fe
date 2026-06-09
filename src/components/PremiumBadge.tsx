import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { BorderRadius, FontSize, Spacing } from '../constants/theme';

export function PremiumBadge() {
  return (
    <View style={styles.badge}>
      <Ionicons name="star" size={9} color={Colors.premiumGoldDark} />
      <Text style={styles.label}>Premium</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: Colors.premiumGoldLight,
    paddingHorizontal: Spacing.xs + 1,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.secondary,
  },
  label: {
    fontSize: FontSize.xs - 1,
    color: Colors.premiumGoldDark,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
