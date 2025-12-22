// src/firebase.ts
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  writeBatch, // <-- Đã thêm mới
} from "firebase/firestore";

// ---- CONFIG CỦA BẠN ----
const firebaseConfig = {
  apiKey: "AIzaSyDUOlWnsOPVnZ6MEZN1fw1cucigbeFkymo",
  authDomain: "roboki2112.firebaseapp.com",
  projectId: "roboki2112",
  storageBucket: "roboki2112.firebasestorage.app",
  messagingSenderId: "537486025636",
  appId: "1:537486025636:web:81ee596d656082297e5731",
  measurementId: "G-W8LR9M0XKJ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db   = getFirestore(app);

// Export lại TẤT CẢ những gì App.tsx đang import
export {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  writeBatch, // <-- Đã thêm mới
};