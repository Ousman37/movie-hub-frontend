// //firebase-config.js
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { initializeFirestore } from "firebase/firestore";


// // Web app's Firebase configuration using environment variables
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Initialize Firestore with caching enabled
// const db = initializeFirestore(app, {
//   localCache: {
//     persistence: true,
//   },
// });

// export { auth, db };


