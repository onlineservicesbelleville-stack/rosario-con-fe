import { Config } from '../constants/config';

export const firebaseConfig = {
  apiKey: Config.firebase.apiKey,
  authDomain: Config.firebase.authDomain,
  projectId: Config.firebase.projectId,
  storageBucket: Config.firebase.storageBucket,
  messagingSenderId: Config.firebase.messagingSenderId,
  appId: Config.firebase.appId,
  measurementId: Config.firebase.measurementId,
};

export const isFirebaseConfigured = Config.features.firebaseEnabled;
