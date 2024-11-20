import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuLuc9zLBMFF5zv1J6om7Uf6Mu5qdXYjg",

  authDomain: "inventory-management-47c67.firebaseapp.com",

  projectId: "inventory-management-47c67",

  storageBucket: "inventory-management-47c67.firebasestorage.app",

  messagingSenderId: "796231312190",

  appId: "1:796231312190:web:0e109dd709022c1db1026f",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export { db, auth };
