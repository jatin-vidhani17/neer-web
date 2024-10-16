// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB6tn4XLQpOy9quqXRLXSC_PkzCdnq8sbU",
  authDomain: "neer-db.firebaseapp.com",
  databaseURL: "https://neer-db-default-rtdb.firebaseio.com",
  projectId: "neer-db",
  storageBucket: "neer-db.appspot.com",
  messagingSenderId: "430115449830",
  appId: "1:430115449830:web:1b6fbdcfae651108674427",
  measurementId: "G-FW2TQ9143Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export {database};