import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors } from '../constants/colors';
import { BorderRadius, Shadow, Spacing } from '../constants/theme';

type Variant = 'elevated' | 'flat' | 'outlined';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  variant?: Variant;
  noPadding?: boolean;
}

export function AppCard({
  children,
  style,
  padding,
  variant = 'elevated',
  noPadding = false,
}: Props) {
  const computedPadding = noPadding ? 0 : (padding ?? Spacing.md);

  return (
    <View
      style={[
        styles.base,
        variant === 'elevated' && styles.elevated,
        variant === 'flat' && styles.flat,
        variant === 'outlined' && styles.outlined,
        { padding: computedPadding },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
  },
  elevated: {
    ...Shadow.md,
  },
  flat: {
    backgroundColor: Colors.backgroundAlt,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
});
