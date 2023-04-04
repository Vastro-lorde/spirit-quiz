import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    // databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  export const firebaseDb = getDatabase(firebaseApp, process.env.REACT_APP_DATABASEURL);
  export const firebaseAuth = getAuth(firebaseApp);

  const googleAuthProvider = new GoogleAuthProvider();

  export const firebaseGoogleSignIn = async () => signInWithPopup(firebaseAuth, googleAuthProvider);

  export const firebaseEmailSignIn = async (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);