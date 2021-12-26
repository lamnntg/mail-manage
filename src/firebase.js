import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOgA7EuFOUqYCicoGWC9BTat7ZXhUoKwg",
  authDomain: "mail-manage-aaafc.firebaseapp.com",
  projectId: "mail-manage-aaafc",
  storageBucket: "mail-manage-aaafc.appspot.com",
  messagingSenderId: "407987020163",
  appId: "1:407987020163:web:512e4f9a01ad9cf23496b6",
  measurementId: "${config.measurementId}"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
