const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');
require('firebase/storage');

const firebaseConfig = {
  apiKey: "AIzaSyCpovTS7w3RYyY7vZaXSAySypNJKxpIUa4",
  authDomain: "pink-closet-131cf.firebaseapp.com",
  projectId: "pink-closet-131cf",
  storageBucket: "pink-closet-131cf.firebasestorage.app",
  messagingSenderId: "896635212672",
  appId: "1:896635212672:web:d8109f461ddb2ffc306765",
  measurementId: "G-Q2E8Z1EC2F"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);
const auth = firebase.auth(app);
const storage = firebase.storage(app);

module.exports = { db, auth, storage };

