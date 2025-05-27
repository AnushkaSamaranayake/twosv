// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_7YeAks6DR0UCI9Ywe92TLLkYMTWN6dw",
  authDomain: "eco-pulse-v3.firebaseapp.com",
  projectId: "eco-pulse-v3",
  storageBucket: "eco-pulse-v3.firebasestorage.app",
  messagingSenderId: "271762466201",
  appId: "1:271762466201:web:bd56c33afa8f5cfc641f08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);