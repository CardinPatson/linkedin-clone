import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyD9pYFv4ziXNZSZG7jeB7t7dAmMLHh3LxE",
  authDomain: "linkedin-clone-7b5b5.firebaseapp.com",
  projectId: "linkedin-clone-7b5b5",
  storageBucket: "linkedin-clone-7b5b5.appspot.com",
  messagingSenderId: "215125405269",
  appId: "1:215125405269:web:8b8f9e1497d2718930aedc",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
