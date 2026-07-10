import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Replace these with your own Firebase project's config values.
// This app uses a single Firestore collection called "entries".
const firebaseConfig = {
  apiKey: "AIzaSyBL603Qir_d5mi8VB4hEtG2i0NFCeMxot0",
  authDomain: "days-42c7d.firebaseapp.com",
  projectId: "days-42c7d",
  storageBucket: "days-42c7d.firebasestorage.app",
  messagingSenderId: "815768111921",
  appId: "1:815768111921:web:5351a4a04e9038b9e5fe10"
};

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
