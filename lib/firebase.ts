import { initializeApp, getApps } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD7Av6NT8O-d_Qj06cFVgbs0xbN0d7tN7I",
  authDomain: "kyantra-57b89.firebaseapp.com",
  databaseURL: "https://kyantra-57b89-default-rtdb.firebaseio.com",
  projectId: "kyantra-57b89",
  storageBucket: "kyantra-57b89.firebasestorage.app",
  messagingSenderId: "642638045136",
  appId: "1:642638045136:web:aea953f38adb0a31a023d5",
  measurementId: "G-3J3K1JRF5C",
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize services
export const auth = getAuth(app)
export const db = getFirestore(app)

// Initialize Analytics only on the client-side
if (typeof window !== "undefined") {
  const analytics = getAnalytics(app)
}

