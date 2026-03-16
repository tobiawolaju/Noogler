// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0lb9VsaR09vuhPI1tVpmi_vtP9IMGwVM",
  authDomain: "noogler-490414.firebaseapp.com",
  databaseURL: "https://noogler-490414-default-rtdb.firebaseio.com",
  projectId: "noogler-490414",
  storageBucket: "noogler-490414.firebasestorage.app",
  messagingSenderId: "265815053881",
  appId: "1:265815053881:web:0bfa8a367670f4b04a1fe8",
  measurementId: "G-BR5XWXZRVK"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
