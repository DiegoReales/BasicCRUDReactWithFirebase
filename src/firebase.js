// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpLyT3k0c3QYCoGaNVhuNO1EjTJ0AZoQ4",
  authDomain: "basiccrud-4cca3.firebaseapp.com",
  projectId: "basiccrud-4cca3",
  storageBucket: "basiccrud-4cca3.appspot.com",
  messagingSenderId: "169489350751",
  appId: "1:169489350751:web:011c216f894620654a1bea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }