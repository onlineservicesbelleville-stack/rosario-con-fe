/**
 * Firebase Auth — preparado para activar cuando se configuren las claves.
 * Sin Firebase configurado, las funciones devuelven null/false de forma segura.
 */
import { isFirebaseConfigured } from './firebaseConfig';

let auth: any = null;

if (isFirebaseConfigured) {
  try {
    const firebase = require('@react-native-firebase/app').default;
    auth = require('@react-native-firebase/auth').default;
  } catch {
    // Firebase no inicializado todavía
  }
}

export const firebaseAuth = {
  async signInAnonymously() {
    if (!auth) return null;
    try {
      const result = await auth().signInAnonymously();
      return result.user;
    } catch { return null; }
  },

  async signInWithEmail(email: string, password: string) {
    if (!auth) return null;
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      return result.user;
    } catch { return null; }
  },

  async registerWithEmail(email: string, password: string) {
    if (!auth) return null;
    try {
      const result = await auth().createUserWithEmailAndPassword(email, password);
      return result.user;
    } catch { return null; }
  },

  async signOut() {
    if (!auth) return;
    try { await auth().signOut(); } catch {}
  },

  getCurrentUser() {
    if (!auth) return null;
    return auth().currentUser;
  },

  onAuthStateChanged(callback: (user: any) => void) {
    if (!auth) return () => {};
    return auth().onAuthStateChanged(callback);
  },
};
