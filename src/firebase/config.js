import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAv0_6uAw_oNUDKXaSKwRID_Lq2yXyFKg0",
  authDomain: "actilc.firebaseapp.com",
  projectId: "actilc",
  storageBucket: "actilc.firebasestorage.app",
  messagingSenderId: "923911944441",
  appId: "1:923911944441:web:f163c93e733d16e7018a28",
  measurementId: "G-SBHWLTTF6F"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)