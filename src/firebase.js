import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBoLSq9pUTTHUySQ6BnEwqNh8XX7g6h1-I",
  authDomain: "linkedin-clone-36769.firebaseapp.com",
  projectId: "linkedin-clone-36769",
  storageBucket: "linkedin-clone-36769.appspot.com",
  messagingSenderId: "418470695042",
  appId: "1:418470695042:web:442424e9596d18d925e49b",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };
export default db;
