export const Config = {
  app: {
    name: 'Rosario con Fe',
    version: '1.0.0',
    env: process.env.EXPO_PUBLIC_APP_ENV ?? 'development',
  },
  firebase: {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? '',
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? '',
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID ?? '',
    measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID ?? '',
  },
  revenueCat: {
    iosApiKey: process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY ?? '',
    androidApiKey: process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY ?? '',
    entitlement: 'premium',
    monthlyProduct: 'rosario_premium_monthly',
    yearlyProduct: 'rosario_premium_yearly',
  },
  features: {
    firebaseEnabled: !!(
      process.env.EXPO_PUBLIC_FIREBASE_API_KEY &&
      process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID
    ),
    revenueCatEnabled: !!(
      process.env.EXPO_PUBLIC_REVENUECAT_IOS_API_KEY ||
      process.env.EXPO_PUBLIC_REVENUECAT_ANDROID_API_KEY
    ),
  },
} as const;
