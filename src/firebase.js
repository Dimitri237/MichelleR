import { initializeApp } from "firebase/app"
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBtOu7bDIASzL55pJWqYpf77ofnJo6ft7A",
  authDomain: "michellesrestaurant.firebaseapp.com",
  projectId: "michellesrestaurant",
  storageBucket: "michellesrestaurant.firebasestorage.app",
  messagingSenderId: "1067086776036",
  appId: "1:1067086776036:web:f9ba5365f81209a6eecef1"
};
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)

enableIndexedDbPersistence(db)
  .then(() => console.log("🔥 Offline activé"))
  .catch(() => console.log("Offline non supporté"))

window.addEventListener("offline", () => alert("Mode hors ligne activé"))
window.addEventListener("online", () => alert("Connexion rétablie"))
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{doc=**} {
      allow read, write: if request.auth != null;
    }
  }
}
*/