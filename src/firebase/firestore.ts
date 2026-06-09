/**
 * Firestore preparado para activar cuando se configuren las claves.
 *
 * Colecciones:
 *   users | prayers | mysteries | rosary_sessions |
 *   family_profiles | subscriptions | achievements
 */
import { isFirebaseConfigured } from './firebaseConfig';

let firestore: any = null;

if (isFirebaseConfigured) {
  try {
    firestore = require('@react-native-firebase/firestore').default;
  } catch {}
}

const db = () => (firestore ? firestore() : null);

export const firestoreService = {
  async saveUser(uid: string, data: Record<string, unknown>) {
    const ref = db()?.collection('users').doc(uid);
    if (!ref) return;
    await ref.set(data, { merge: true });
  },

  async getUser(uid: string) {
    const ref = db()?.collection('users').doc(uid);
    if (!ref) return null;
    const snap = await ref.get();
    return snap.exists ? snap.data() : null;
  },

  async saveRosarySession(session: Record<string, unknown>) {
    const ref = db()?.collection('rosary_sessions');
    if (!ref) return null;
    const doc = await ref.add(session);
    return doc.id;
  },

  async saveFamilyProfile(profile: Record<string, unknown>) {
    const ref = db()?.collection('family_profiles');
    if (!ref) return null;
    const doc = await ref.add(profile);
    return doc.id;
  },

  async updateSubscription(uid: string, data: Record<string, unknown>) {
    const ref = db()?.collection('subscriptions').doc(uid);
    if (!ref) return;
    await ref.set(data, { merge: true });
  },
};
