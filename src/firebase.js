// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy_ooZGh0NSZDC9upB4tzqfVpCY-gsNeQ",
  authDomain: "cloudfile-fe683.firebaseapp.com",
  projectId: "cloudfile-fe683",
  storageBucket: "cloudfile-fe683.appspot.com",
  messagingSenderId: "13212112073",
  appId: "1:13212112073:web:b03a8b28122a5d72c4e918",
  measurementId: "G-13CKG2Z07F",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;
