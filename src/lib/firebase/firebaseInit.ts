import { initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  //...
};

const app = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);

async function getFriends(db: Firestore) {}

async function getFriend(db: Firestore) {}

async function addFriend(db: Firestore) {}

async function removeFriend(db: Firestore) {}
