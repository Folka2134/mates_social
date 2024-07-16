import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  Firestore,
  collection,
  getDocs,
  getFirestore,
} from "firebase/firestore";

// const serviceAccount = import.meta.env.VITE_GOOGLE_APPLICATION_CREDENTIALS;
const firebaseKey = import.meta.env.VITE_FIREBASE_API_KEY;

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: firebaseKey,
  authDomain: "mates-d5887.firebaseapp.com",
  projectId: "mates-d5887",
  storageBucket: "mates-d5887.appspot.com",
  messagingSenderId: "755099374967",
  appId: "1:755099374967:web:fe3def0c3fe0a6c4043d72",
  measurementId: "G-MWL5SCPSFJ",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

// async function getFriends(db: Firestore) {}

// async function getFriend(db: Firestore) {}

// async function addFriend(db: Firestore) {}

// async function removeFriend(db: Firestore) {}

export async function getMessages(db: Firestore) {
  const messagesRef = collection(db, "messages");
  const querySnapshot = await getDocs(messagesRef);

  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, data: doc.data() };
  });
}

// REQUEST EXAMPLE
// export const getFirestoreData = async () => {
//   const docRef = doc(db, "example", "example-document");
//   const docSnap = await getDoc(docRef);
//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//   } else {
//     // docSnap.data() will be undefined in this case
//     console.log("No such document!");
//   }
// };
