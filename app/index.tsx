import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import { useUserStore } from '../src/store/userStore';
import { Colors } from '../src/constants/colors';

export default function IndexScreen() {
  const router = useRouter();
  const { isLoading, hasSeenOnboarding } = useUserStore();

  useEffect(() => {
    if (!isLoading) {
      if (hasSeenOnboarding) {
        router.replace('/home');
      } else {
        router.replace('/onboarding');
      }
    }
  }, [isLoading, hasSeenOnboarding, router]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background }}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
}
