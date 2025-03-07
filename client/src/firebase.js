// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-5bbee.firebaseapp.com",
  projectId: "real-estate-5bbee",
  storageBucket: "real-estate-5bbee.firebasestorage.app",
  messagingSenderId: "269676139645",
  appId: "1:269676139645:web:b1f3c0fd4b91475ed6cd14",
  measurementId: "G-GFWG8CHWHJ",
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export { app };
export const app = initializeApp(firebaseConfig);