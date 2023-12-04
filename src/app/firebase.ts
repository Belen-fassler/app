// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDFTznZLv_6rr2nceONJGxu7OZfRNr-efM",
  authDomain: "examen-1f73b.firebaseapp.com",
  projectId: "examen-1f73b",
  storageBucket: "examen-1f73b.appspot.com",
  messagingSenderId: "261105037824",
  appId: "1:261105037824:web:3aeeddfbbd26ea53ba1ee5",
  measurementId: "G-3TVLX26EK4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);