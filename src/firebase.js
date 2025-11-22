import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgU-BASJed3cRgkNTqJ-rBuUSKXjOgksc",
  authDomain: "movie-project-app-99b5d.firebaseapp.com",
  projectId: "movie-project-app-99b5d",
  storageBucket: "movie-project-app-99b5d.firebasestorage.app",
  messagingSenderId: "208991173438",
  appId: "1:208991173438:web:041e96453d93f45adf0a6f",
  measurementId: "G-CL6J9KEL2D"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);