// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC1TyttuhBtFLzqZQoA4pIBDuF4NmIj-TI",
    authDomain: "test-singin-9eb0b.firebaseapp.com",
    projectId: "test-singin-9eb0b",
    storageBucket: "test-singin-9eb0b.appspot.com",
    messagingSenderId: "239676600086",
    appId: "1:239676600086:web:1f59426b5b1f63bde72a37",
    measurementId: "G-BGHFGKKMZK"
};


export const FireBaseApp = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth(FireBaseApp);
export const FireBaseDB = getFirestore(FireBaseApp);
