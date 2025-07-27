// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  projectId: "senpass-lite",
  appId: "1:261003487822:web:e43b4d8f6d656beccfb11f",
  storageBucket: "senpass-lite.firebasestorage.app",
  apiKey: "AIzaSyDrEM9seUOW-z_m-hdfidXkNG5vqgT9LRk",
  authDomain: "senpass-lite.firebaseapp.com",
  messagingSenderId: "261003487822",
  measurementId: "",
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const auth = getAuth(app);


export { app, db, auth };
