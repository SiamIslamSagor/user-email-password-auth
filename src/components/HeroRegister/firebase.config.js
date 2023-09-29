// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCItRqy_8-y6U7n99QHevfHTPppRD0hibE",
  authDomain: "user-email-password-auth-74674.firebaseapp.com",
  projectId: "user-email-password-auth-74674",
  storageBucket: "user-email-password-auth-74674.appspot.com",
  messagingSenderId: "495686428426",
  appId: "1:495686428426:web:c44bb4f6734bf835f67cf3",
  measurementId: "G-QNGFPT2C7L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// export default app;
export default auth;
