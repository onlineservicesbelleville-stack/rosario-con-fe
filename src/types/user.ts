export interface User {
  id: string;
  email?: string;
  displayName?: string;
  isAnonymous: boolean;
  createdAt: string;
}

export interface FamilyMember {
  id: string;
  name: string;
  role?: 'padre' | 'madre' | 'hijo' | 'hija' | 'abuelo' | 'abuela' | 'otro';
}

export interface FamilyProfile {
  id: string;
  familyName: string;
  members: FamilyMember[];
  intention?: string;
  createdAt: string;
}

export interface ReminderSettings {
  enabled: boolean;
  hour: number;
  minute: number;
  days: number[];
  notificationId?: string;
}
