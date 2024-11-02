import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCy0QmFRWx3-cvtGkSHlMlgMmLblfTvoo4",
  authDomain: "bkform-d309e.firebaseapp.com",
  projectId: "bkform-d309e",
  storageBucket: "bkform-d309e.firebasestorage.app",
  messagingSenderId: "691160228613",
  appId: "1:691160228613:web:1b0330df219ea144ff4d6c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
