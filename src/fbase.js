import firebase from "firebase";
import * as auth from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDa_fPZdLCP1c9QqLeoHWz45aKCRvzpP0Y",
  authDomain: "nwitter-f8061.firebaseapp.com",
  projectId: "nwitter-f8061",
  storageBucket: "nwitter-f8061.appspot.com",
  messagingSenderId: "1089598713551",
  appId: "1:1089598713551:web:73216a6182c9f761b591ba",
};

firebase.initializeApp(firebaseConfig);
export const authService = firebase.auth();
