import React from 'react';
import {
  View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useSubscription } from '../../src/hooks/useSubscription';
import { PREMIUM_BENEFITS, PLANS } from '../../src/data/premiumContent';
import { AppButton } from '../../src/components/AppButton';
import { Colors } from '../../src/constants/colors';
import { BorderRadius, FontSize, FontWeight, Spacing } from '../../src/constants/theme';

export default function PaywallScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { isPremium, isLoading, error, restore } = useSubscription();

  const handlePurchase = (planId: string) => {
    Alert.alert(
      'RevenueCat pendiente',
      'Agrega tus API keys de RevenueCat en el archivo .env para habilitar compras reales.',
      [{ text: 'Entendido' }],
    );
  };

  const handleRestore = async () => {
    const ok = await restore();
    Alert.alert(
      ok ? '¡Listo!' : 'Sin compras previas',
      ok ? 'Tus compras han sido restauradas.' : 'No encontramos compras anteriores en tu cuenta.',
      [{ text: 'OK', onPress: ok ? () => router.back() : undefined }],
    );
  };

  if (isPremium) {
    return (
      <View style={[styles.screen, styles.centered]}>
        <Ionicons name="checkmark-circle" size={72} color={Colors.success} />
        <Text style={styles.alreadyTitle}>¡Ya eres Premium!</Text>
        <Text style={styles.alreadySub}>
          Disfruta de todos los audios, meditaciones y rosarios especiales.
        </Text>
        <AppButton
          label="Volver"
          onPress={() => router.back()}
          style={{ marginTop: Spacing.lg }}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {/* Botón cerrar */}
      <View style={[styles.closeBar, { paddingTop: insets.top + Spacing.xs }]}>
        <TouchableOpacity
          onPress={() => router.back()}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          style={styles.closeBtn}
        >
          <Ionicons name="close" size={22} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroEmoji}>📿</Text>
          <Text style={styles.heroTitle}>Reza con más profundidad en familia</Text>
          <Text style={styles.heroSubtitle}>
            Desbloquea audios completos, meditaciones, modo niños y rosarios especiales para acompañar tu vida de fe.
          </Text>
        </View>

        {/* Beneficios */}
        <View style={styles.benefitsList}>
          {PREMIUM_BENEFITS.map((b) => (
            <View key={b.id} style={styles.benefitRow}>
              <Text style={styles.benefitIcon}>{b.icon}</Text>
              <View style={styles.benefitText}>
                <Text style={styles.benefitTitle}>{b.title}</Text>
                <Text style={styles.benefitDesc}>{b.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Planes */}
        <View style={styles.plansContainer}>
          {PLANS.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              onPress={() => handlePurchase(plan.id)}
              activeOpacity={0.85}
              style={[styles.planCard, plan.isBestValue && styles.planCardBest]}
            >
              {plan.isBestValue && (
                <View style={styles.bestBadge}>
                  <Text style={styles.bestBadgeText}>Mejor valor</Text>
                </View>
              )}
              <View style={styles.planInfo}>
                <Text style={styles.planTitle}>{plan.title}</Text>
                <Text style={styles.planDescription}>{plan.description}</Text>
              </View>
              <View style={styles.planPricing}>
                <Text style={[styles.planPrice, plan.isBestValue && styles.planPriceBest]}>
                  {plan.price}
                </Text>
                <Text style={styles.planPeriod}>{plan.period}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botones de acción */}
        <View style={styles.actions}>
          <AppButton
            label={isLoading ? 'Procesando…' : PLANS[1].buttonLabel}
            onPress={() => handlePurchase('yearly')}
            loading={isLoading}
          />
          <AppButton
            label={PLANS[0].buttonLabel}
            variant="outline"
            onPress={() => handlePurchase('monthly')}
            disabled={isLoading}
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Restaurar */}
        <TouchableOpacity onPress={handleRestore} disabled={isLoading} style={styles.restoreBtn}>
          <Text style={styles.restoreText}>Restaurar compras</Text>
        </TouchableOpacity>

        {/* Nota legal */}
        <Text style={styles.legalNote}>
          Puedes cancelar en cualquier momento desde tu cuenta de App Store o Google Play.
          Al suscribirte aceptas los Términos de Uso y la Política de Privacidad.
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },

  // Estado ya premium
  centered: { alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, gap: Spacing.md },
  alreadyTitle: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.text, textAlign: 'center' },
  alreadySub: { fontSize: FontSize.md, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22 },

  // Barra cierre
  closeBar: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xs },
  closeBtn: {
    width: 32, height: 32,
    borderRadius: 16,
    backgroundColor: Colors.backgroundAlt,
    alignItems: 'center', justifyContent: 'center',
  },

  content: { paddingHorizontal: Spacing.md, gap: Spacing.lg },

  // Hero
  hero: { alignItems: 'center', gap: Spacing.sm, paddingTop: Spacing.sm },
  heroEmoji: { fontSize: 60 },
  heroTitle: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
    textAlign: 'center',
    lineHeight: 30,
  },
  heroSubtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },

  // Beneficios
  benefitsList: { gap: Spacing.sm },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    paddingVertical: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  benefitIcon: { fontSize: 20, width: 28, textAlign: 'center', marginTop: 1 },
  benefitText: { flex: 1 },
  benefitTitle: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.text },
  benefitDesc: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2, lineHeight: 18 },

  // Planes
  plansContainer: { gap: Spacing.sm },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.border,
    position: 'relative',
    marginTop: Spacing.xs,
  },
  planCardBest: {
    borderColor: Colors.secondary,
    backgroundColor: Colors.premiumGoldLight,
  },
  bestBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    left: Spacing.md,
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  bestBadgeText: {
    color: Colors.textLight,
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    letterSpacing: 0.3,
  },
  planInfo: { flex: 1 },
  planTitle: { fontSize: FontSize.md, fontWeight: FontWeight.bold, color: Colors.text },
  planDescription: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: 2 },
  planPricing: { alignItems: 'flex-end' },
  planPrice: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.primary },
  planPriceBest: { color: Colors.secondaryDark },
  planPeriod: { fontSize: FontSize.xs, color: Colors.textMuted },

  // Acciones
  actions: { gap: Spacing.sm },
  errorText: { fontSize: FontSize.sm, color: Colors.danger, textAlign: 'center' },

  // Restaurar
  restoreBtn: { alignItems: 'center', paddingVertical: Spacing.xs },
  restoreText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },

  // Legal
  legalNote: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textAlign: 'center',
    lineHeight: 17,
    paddingHorizontal: Spacing.sm,
  },
});
