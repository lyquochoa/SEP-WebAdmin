import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDyUKguLIRvhNAAj9ubJA5B-2de1rrxI_U",
  authDomain: "sep-project-39ea6.firebaseapp.com",
  databaseURL:
    "https://sep-project-39ea6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sep-project-39ea6",
  storageBucket: "sep-project-39ea6.appspot.com",
  messagingSenderId: "688232737753",
  appId: "1:688232737753:web:52e83791fb9040d62887c8",
  measurementId: "G-KGPD9RT5ML",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const auth = getAuth();

export { db, auth };
export default app;
