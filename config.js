// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArR_BPY8EITq3zSmN2KcD-0tMh5ceRQ0A",
  authDomain: "budgetify2.firebaseapp.com",
  databaseURL: "https://budgetify2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "budgetify2",
  storageBucket: "budgetify2.firebasestorage.app",
  messagingSenderId: "946519206042",
  appId: "1:946519206042:web:430dd1215d57d0d0a05723"
};

// Initialize Firebase
initializeApp(firebaseConfig);