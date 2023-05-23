import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBHHtNBcGGuCeoukOZWW--Bifei0G5i7yo",
  authDomain: "kanban-7751c.firebaseapp.com",
  projectId: "kanban-7751c",
  storageBucket: "kanban-7751c.appspot.com",
  messagingSenderId: "485523402664",
  appId: "1:485523402664:web:4c6218e0759151d43ff79d"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };