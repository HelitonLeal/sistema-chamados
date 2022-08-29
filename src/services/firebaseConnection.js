import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

let firebaseConfig = {
    apiKey: "AIzaSyBSFuRFjeGYsT_xtybOArQRhBfSP86B-H0",
    authDomain: "sistema-b3ad7.firebaseapp.com",
    projectId: "sistema-b3ad7",
    storageBucket: "sistema-b3ad7.appspot.com",
    messagingSenderId: "716472579822",
    appId: "1:716472579822:web:b140978516c2b308c7a5ff",
    measurementId: "G-T39SPGNBDJ"
  };
  
  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }

  export default firebase;