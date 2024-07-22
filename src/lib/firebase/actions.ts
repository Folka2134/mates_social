import { auth, db } from "./firebaseInit";

import {
  collection,
  getDocs,
  serverTimestamp,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
  where,
  query,
} from "firebase/firestore";

export async function createUser(uid: string, data: any) {
  try {
    await setDoc(doc(db, "users", uid), { ...data });
  } catch (error) {
    throw new Error(`Unable to create user.\nError: ${error}`);
  }
}

export async function getUser(uid: string) {
  const docRef = doc(db, "users", uid);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw new Error(`Unable to get user data.\nError: ${error}`);
  }
}

export async function updateUser(uid: string, data: any) {
  try {
    await setDoc(doc(db, "users", uid), { ...data });
  } catch (error) {
    throw new Error(`Unable to update user data.\nError: ${error}`);
  }
}

export async function deleteUser(uid: string) {
  try {
    await deleteDoc(doc(db, "users", uid));
  } catch (error) {
    throw new Error(`Unable to delete user.\nError: ${error}`);
  }
}

export async function addFriend(uid: string, friendId: string) {
  try {
    await setDoc(doc(db, "users", uid, "friends"), { friendId });
  } catch (error) {
    throw new Error(`Unable to add friend.\nError: ${error}`);
  }
}

export async function getFriends(uid: string) {
  const friendsList: string[] = [];
  const friendsRef = collection(db, "users", uid, "friends");
  try {
    const querySnapshot = await getDocs(friendsRef);
    querySnapshot.forEach((doc) => {
      const friendData = doc.data();
      if (friendData.userId) {
        friendsList.push(friendData.userId);
      }
    });
  } catch (error) {
    throw new Error(`Unable to get retrieve friends.\nError: ${error}`);
  }

  return friendsList;
}

export async function removeFriend(uid: string, friendId: string) {
  const friendsRef = collection(db, "users", uid, "friends");
  const q = query(friendsRef, where("id", "==", friendId));
  try {
    const querySnapshot = await getDocs(q);
    const deletePromisses = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromisses);
  } catch (error) {
    throw new Error(`Unable to remove friend.\nError: ${error}`);
  }
}

export async function sendMessageGlobal(formValue: string) {
  const user = auth.currentUser;

  if (!user) {
    throw Error("No logged in user");
  }

  try {
    const { uid, photoURL } = user;

    await addDoc(collection(db, "messages"), {
      text: formValue,
      createdAt: serverTimestamp(),
      uid,
      photoURL,
    });
  } catch (error) {
    throw new Error(`Unable to send message.\nError: ${error}`);
  }
}

export async function getMessages() {
  const messagesRef = collection(db, "messages");
  try {
    const querySnapshot = await getDocs(messagesRef);

    return querySnapshot.docs.map((doc) => {
      return { id: doc.id, data: doc.data() };
    });
  } catch (error) {
    throw new Error(`Unable to get messages.\nError ${error}`);
  }
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
