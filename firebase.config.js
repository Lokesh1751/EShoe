import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAei0VgjdMLFF3M5lUo7MKOZHg5zPm1Egg",
  authDomain: "e-shop-92130.firebaseapp.com",
  projectId: "e-shop-92130",
  storageBucket: "e-shop-92130.appspot.com",
  messagingSenderId: "811731467061",
  appId: "1:811731467061:web:1657005dc5b46d75e22a7c",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
