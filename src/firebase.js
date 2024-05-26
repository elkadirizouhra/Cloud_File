import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"; // Ajouter cette ligne

const firebaseConfig = {
  apiKey: "AIzaSyAy_ooZGh0NSZDC9upB4tzqfVpCY-gsNeQ",
  authDomain: "cloudfile-fe683.firebaseapp.com",
  projectId: "cloudfile-fe683",
  storageBucket: "cloudfile-fe683.appspot.com",
  messagingSenderId: "13212112073",
  appId: "1:13212112073:web:b03a8b28122a5d72c4e918",
  measurementId: "G-13CKG2Z07F",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app); // Ajouter cette ligne
export default app;
