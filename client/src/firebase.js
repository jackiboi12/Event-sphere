// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-84ba9.firebaseapp.com",
  projectId: "real-estate-84ba9",
  storageBucket: "real-estate-84ba9.firebasestorage.app",
  messagingSenderId: "170393672418",
  appId: "1:170393672418:web:6d446750a5a6a1dd429cbb",
  measurementId: "G-GWPSSV0PHS"};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export { app };
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);