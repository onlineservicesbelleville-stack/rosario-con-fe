import React, { useRef, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Dimensions,
  TouchableOpacity, ViewToken,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ONBOARDING_SLIDES } from '../src/data/onboardingSlides';
import { AppButton } from '../src/components/AppButton';
import { useUserStore } from '../src/store/userStore';
import { Colors } from '../src/constants/colors';
import { BorderRadius, FontSize, FontWeight, Spacing } from '../src/constants/theme';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const setOnboardingDone = useUserStore((s) => s.setOnboardingDone);
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef<FlatList>(null);

  const handleViewable = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]) setActiveIndex(viewableItems[0].index ?? 0);
  });

  const finish = async () => {
    await setOnboardingDone();
    router.replace('/home');
  };

  const next = () => {
    if (activeIndex < ONBOARDING_SLIDES.length - 1) {
      flatRef.current?.scrollToIndex({ index: activeIndex + 1, animated: true });
    } else {
      finish();
    }
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom + Spacing.lg }]}>
      <TouchableOpacity onPress={finish} style={[styles.skip, { top: insets.top + Spacing.sm }]}>
        <Text style={styles.skipText}>Omitir</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatRef}
        data={ONBOARDING_SLIDES}
        keyExtractor={(i) => i.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={handleViewable.current}
        viewabilityConfig={{ itemVisiblePercentThreshold: 60 }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Text style={styles.emoji}>{item.icon}</Text>
            <Text style={[styles.title, { color: item.color }]}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        )}
      />

      <View style={styles.dots}>
        {ONBOARDING_SLIDES.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex && styles.dotActive]}
          />
        ))}
      </View>

      <View style={styles.btnWrap}>
        <AppButton
          label={activeIndex === ONBOARDING_SLIDES.length - 1 ? 'Comenzar' : 'Siguiente'}
          onPress={next}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  skip: {
    position: 'absolute',
    right: Spacing.lg,
    zIndex: 10,
  },
  skipText: { fontSize: FontSize.md, color: Colors.textSecondary },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.xxxl,
    gap: Spacing.lg,
  },
  emoji: { fontSize: 80 },
  title: {
    fontSize: FontSize.xxxl,
    fontWeight: FontWeight.bold,
    textAlign: 'center',
    lineHeight: 38,
  },
  subtitle: {
    fontSize: FontSize.lg,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 26,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xs,
    marginTop: Spacing.lg,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  dotActive: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  btnWrap: { paddingHorizontal: Spacing.lg, marginTop: Spacing.xl },
});
