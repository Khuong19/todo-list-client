// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7CxW1h5s4E_wtTnLBiXNQ1_gRQTXd_VI",
  authDomain: "todo-list-ffa78.firebaseapp.com",
  projectId: "todo-list-ffa78",
  storageBucket: "todo-list-ffa78.appspot.com",
  messagingSenderId: "286810314020",
  appId: "1:286810314020:web:8abdc5bf9118ad5f7e0fb1",
  measurementId: "G-YDWBBJ9HPC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);