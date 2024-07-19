import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../lib/firebase/firebaseInit";

export default function Auth() {
  const [user] = useAuthState(auth);

  return <div className="flex gap-3">{user ? <Signout /> : <SignIn />}</div>;
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
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
