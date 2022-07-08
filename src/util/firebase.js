import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCD3ryoBh12akfPZ4LQ9d9Usa_IqsdJhvU",
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
const analytics = getAnalytics(app);

export default app;
