import firebase from "firebase";
import "firebase/auth";
import "firebase/firebase";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDa_fPZdLCP1c9QqLeoHWz45aKCRvzpP0Y",
  authDomain: "nwitter-f8061.firebaseapp.com",
  projectId: "nwitter-f8061",
  storageBucket: "nwitter-f8061.appspot.com",
  messagingSenderId: "1089598713551",
  appId: "1:1089598713551:web:73216a6182c9f761b591ba",
};

firebase.initializeApp(firebaseConfig);
export const firebaseInstace = firebase;
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();
