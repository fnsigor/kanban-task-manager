import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA0-lhhQcJhO-Rv7RYabqB8tx1H9LPTyLk",
  authDomain: "kanban2-f6224.firebaseapp.com",
  projectId: "kanban2-f6224",
  storageBucket: "kanban2-f6224.appspot.com",
  messagingSenderId: "501653221666",
  appId: "1:501653221666:web:ccbbcff7641b97d22f357b"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };