import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const serviceAccount = import.meta.env.VITE_GOOGLE_APPLICATION_CREDENTIALS;
const firebaseKey = import.meta.env.VITE_FIREBASE_API_KEY;

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "mates-d5887.firebaseapp.com",
  projectId: "mates-d5887",
  storageBucket: "mates-d5887.appspot.com",
  messagingSenderId: "755099374967",
  appId: "1:755099374967:web:fe3def0c3fe0a6c4043d72",
  measurementId: "G-MWL5SCPSFJ",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
