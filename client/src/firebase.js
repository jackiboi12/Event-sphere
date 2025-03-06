// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-84ba9.firebaseapp.com",
  projectId: "real-estate-84ba9",
  storageBucket: "real-estate-84ba9.firebasestorage.app",
  messagingSenderId: "170393672418",
  appId: "1:170393672418:web:6d446750a5a6a1dd429cbb",
  measurementId: "G-GWPSSV0PHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

// ✅ FIX: Export app properly
export { app };
