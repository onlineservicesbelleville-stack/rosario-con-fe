import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '../constants/colors';
import { BorderRadius, FontSize, FontWeight, Shadow, Spacing } from '../constants/theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const containerByVariant: Record<Variant, ViewStyle> = {
  primary: {
    backgroundColor: Colors.primary,
    ...Shadow.sm,
  },
  secondary: {
    backgroundColor: Colors.secondary,
    ...Shadow.sm,
  },
  outline: {
    backgroundColor: Colors.transparent,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  ghost: { backgroundColor: Colors.transparent },
};

const labelByVariant: Record<Variant, TextStyle> = {
  primary: { color: Colors.textLight, letterSpacing: 0.3 },
  secondary: { color: Colors.textLight, letterSpacing: 0.3 },
  outline: { color: Colors.primary, letterSpacing: 0.3 },
  ghost: { color: Colors.primary, letterSpacing: 0.2 },
};

const paddingBySize: Record<Size, ViewStyle> = {
  sm: { paddingVertical: Spacing.xs + 2, paddingHorizontal: Spacing.md, minHeight: 36 },
  md: { paddingVertical: Spacing.sm + 4, paddingHorizontal: Spacing.lg, minHeight: 50 },
  lg: { paddingVertical: Spacing.md, paddingHorizontal: Spacing.xl, minHeight: 56 },
};

const fontSizeBySize: Record<Size, number> = {
  sm: FontSize.sm,
  md: FontSize.md,
  lg: FontSize.lg,
};

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
  fullWidth = true,
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.82}
      style={[
        styles.base,
        containerByVariant[variant],
        paddingBySize[size],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'secondary' ? Colors.textLight : Colors.primary}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.label,
            { fontSize: fontSizeBySize[size] },
            labelByVariant[variant],
            textStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.48 },
  label: {
    fontWeight: FontWeight.semibold,
  },
});
