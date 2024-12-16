import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB78PSI_3ezR4oYUH3YgSL9OT-UA6BmV-I",
  authDomain: "fir-database-4047f.firebaseapp.com",
  projectId: "fir-database-4047f",
  storageBucket: "fir-database-4047f.appspot.com",
  messagingSenderId: "567285349819",
  appId: "1:567285349819:web:70a5620d7ff7f7ca16989e",
  measurementId: "G-2LENKHYKG1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)