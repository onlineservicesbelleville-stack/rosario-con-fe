import { isFirebaseConfigured } from './firebaseConfig';

let storage: any = null;

if (isFirebaseConfigured) {
  try {
    storage = require('@react-native-firebase/storage').default;
  } catch {}
}

export const storageService = {
  async getAudioUrl(path: string): Promise<string | null> {
    if (!storage) return null;
    try {
      return await storage().ref(path).getDownloadURL();
    } catch {
      return null;
    }
  },

  async getImageUrl(path: string): Promise<string | null> {
    if (!storage) return null;
    try {
      return await storage().ref(path).getDownloadURL();
    } catch {
      return null;
    }
  },
};
