// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh-Qo4UgwFafR3e40e52OQ5k7pgVbJAGA",
  authDomain: "netflix-clone-da2e1.firebaseapp.com",
  projectId: "netflix-clone-da2e1",
  storageBucket: "netflix-clone-da2e1.appspot.com",
  messagingSenderId: "712402007505",
  appId: "1:712402007505:web:1af2243badc016edc19cf0",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
