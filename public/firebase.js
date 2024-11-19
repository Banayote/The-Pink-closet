// Import Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpovTS7w3RYyY7vZaXSAySypNJKxpIUa4",
  authDomain: "pink-closet-131cf.firebaseapp.com",
  databaseURL: "https://pink-closet-131cf-default-rtdb.firebaseio.com",
  projectId: "pink-closet-131cf",
  storageBucket: "pink-closet-131cf.appspot.com",
  messagingSenderId: "896635212672",
  appId: "1:896635212672:web:d8109f461ddb2ffc306765",
  measurementId: "G-Q2E8Z1EC2F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

