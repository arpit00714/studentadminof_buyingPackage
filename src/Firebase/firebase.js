// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import {  setPersistence, browserSessionPersistence, } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWv7y1tfAFhQUDnLR2BqW435j6lOhzkno",
  authDomain: "dews-cfc0e.firebaseapp.com",
  projectId: "dews-cfc0e",
  storageBucket: "dews-cfc0e.appspot.com",
  messagingSenderId: "931544178846",
  appId: "1:931544178846:web:a718d31f47fae54069db8f",
  measurementId: "G-G2J9G3J7SS"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
// const pr = firebase.auth.GoogleAuthProvider()
const provider = new firebase.auth.GoogleAuthProvider();

// setPersistence(auth, browserSessionPersistence)
//   .then(() => {
//      console.log("Session persistence successfully enabled",)
//   })
//   .catch((error) => {
//     // Handle errors
//     console.error("Error enabling session persistence:", error);
//   });
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);
const analytics = getAnalytics(app);

export { app, analytics };
