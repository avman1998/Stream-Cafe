// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgTMvP2KORvN4PDT7cTceuSXH3QMUqDxs",
  authDomain: "stream-cafe-375715.firebaseapp.com",
  projectId: "stream-cafe-375715",
  storageBucket: "stream-cafe-375715.appspot.com",
  messagingSenderId: "228505374409",
  appId: "1:228505374409:web:5f965cde5d62aec345c718",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };
