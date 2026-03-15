import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBFL1bBugLHZ7VI9bqncqnYD_HqDkPrrC8",
    authDomain: "rexploretech.firebaseapp.com",
    projectId: "rexploretech",
    storageBucket: "rexploretech.firebasestorage.app",
    messagingSenderId: "502051542015",
    appId: "1:502051542015:web:a88b9d23b7be2b5aa04dca"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
