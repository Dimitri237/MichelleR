import { initializeApp } from "firebase/app"
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBUQ8r4_bWOc-HJZIZzFFv69b5GGKXID6o",
  authDomain: "africamart-87ff2.firebaseapp.com",
  projectId: "africamart-87ff2",
  storageBucket: "africamart-87ff2.firebasestorage.app",
  messagingSenderId: "239296547209",
  appId: "1:239296547209:web:ae62ba1493536ab19b3958"
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