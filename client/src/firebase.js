// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-5a6de.firebaseapp.com",
  projectId: "mern-auth-5a6de",
  storageBucket: "mern-auth-5a6de.appspot.com",
  messagingSenderId: "343560995993",
  appId: "1:343560995993:web:00a1d33388ad1c2ecfe408",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
