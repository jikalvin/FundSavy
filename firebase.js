import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { initializeFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyAci0GND4Vtz0ozrqYEvUHGzkbjOXYdrcQ",
  authDomain: "njan-27.firebaseapp.com",
  projectId: "njan-27",
  storageBucket: "njan-27.appspot.com",
  messagingSenderId: "997977731434",
  appId: "1:997977731434:web:542ecaa53f025173633513"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
