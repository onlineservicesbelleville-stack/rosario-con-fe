export interface SubscriptionStatus {
  isPremium: boolean;
  productId?: string;
  expiresAt?: string;
}

export interface Offering {
  id: string;
  title: string;
  price: string;
  period: 'monthly' | 'yearly';
  productId: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  requirement: number;
  type: 'streak' | 'total' | 'mystery' | 'prayer' | 'family';
}
