import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'; // this is for the normal database
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDHLDMEiJ8KesjTsPAhrUtRKilxtxNByng",
  authDomain: "fir-crud-b7bc9.firebaseapp.com",
  projectId: "fir-crud-b7bc9",
  storageBucket: "fir-crud-b7bc9.appspot.com",
  messagingSenderId: "689981168988",
  appId: "1:689981168988:web:f00c2d19cb7162c6147599",
  measurementId: "G-QEKJJWDBL3"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);