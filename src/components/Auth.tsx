import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase/firebaseInit";
import { createUser } from "../lib/firebase/actions";

export default function Auth() {
  const [user] = useAuthState(auth);

  return <div className="flex gap-3">{user ? <Signout /> : <SignIn />}</div>;
}

function SignIn() {
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        await createUser(user.uid, user);
      }
    } catch (error) {
      throw new Error(`Unable to signin.\nError: ${error}`);
    }
  };

  return (
    <button type="button" onClick={signInWithGoogle}>
      Sign in With Google
    </button>
  );
}

function Signout() {
  return (
    auth.currentUser && (
      <button type="button" onClick={() => signOut(auth)}>
        Logout
      </button>
    )
  );
}
