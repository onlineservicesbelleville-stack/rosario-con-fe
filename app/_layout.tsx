import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useUserStore } from '../src/store/userStore';
import { revenueCatService } from '../src/services/revenueCatService';
import { Colors } from '../src/constants/colors';

export default function RootLayout() {
  const loadOnboardingState = useUserStore((s) => s.loadOnboardingState);

  useEffect(() => {
    loadOnboardingState();
    revenueCatService.configure();
  }, [loadOnboardingState]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" backgroundColor={Colors.background} />
        <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: Colors.background } }}>
          <Stack.Screen name="premium/paywall" options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
