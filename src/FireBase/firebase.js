
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBHUZgalkMe7Sku7qdg_NybQPICJAmXR5I",
  authDomain: "zahiraelkadiri-b5ede.firebaseapp.com",
  projectId: "zahiraelkadiri-b5ede",
  storageBucket: "zahiraelkadiri-b5ede.appspot.com",
  messagingSenderId: "295620633399",
  appId: "1:295620633399:web:e6d6a6df839679836c30b2",
  measurementId: "G-WE0GHW9RWN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);