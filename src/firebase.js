
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

console.log("Environment Variables:", process.env);

const firebaseConfig = {
  apiKey:
    process.env.REACT_APP_FIREBASE_API_KEY ||
    "AIzaSyCX6RhHy0408Nd_3huNFydpENJThsaaCHA", // Default value for testing
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

console.log("Firebase Config:", firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;

const db = initializeFirestore(app, {
  localCache: {
    persistence: true,
  },
});

export { db };

