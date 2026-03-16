// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDrxB-c8XHe7gMofljuenXg0e8A7mKeoiM",
    authDomain: "noogler-fc7d1.firebaseapp.com",
    databaseURL: "https://noogler-fc7d1-default-rtdb.firebaseio.com",
    projectId: "noogler-fc7d1",
    storageBucket: "noogler-fc7d1.firebasestorage.app",
    messagingSenderId: "644134637733",
    appId: "1:644134637733:web:432406cd608548fd883d4c",
    measurementId: "G-82N7HEZE4F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);