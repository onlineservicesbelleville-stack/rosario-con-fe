import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PremiumBenefit } from '../data/premiumContent';
import { Colors } from '../constants/colors';
import { BorderRadius, FontSize, Spacing } from '../constants/theme';

interface Props {
  benefit: PremiumBenefit;
}

export function PaywallCard({ benefit }: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.icon}>{benefit.icon}</Text>
      <View style={styles.text}>
        <Text style={styles.title}>{benefit.title}</Text>
        <Text style={styles.desc}>{benefit.description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  icon: { fontSize: 22, width: 30, textAlign: 'center' },
  text: { flex: 1 },
  title: { fontSize: FontSize.md, fontWeight: '600', color: Colors.text },
  desc: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
});
