import {
  // SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../lib/firebase/firebaseInit";

export default function Auth() {
  const { getToken } = useAuth();
  const signInWithClerk = async () => {
    console.log("Sign in with clerk");
    const token = await getToken({ template: "integration_firebase" });
    const userCredentials = await signInWithCustomToken(auth, token || "");
    // The userCredentials.user object can call the methods of
    // the Firebase platform as an authenticated user.
    console.log("User:", userCredentials.user);
  };

  return (
    <div className="flex gap-3">
      <SignedOut>
        <button onClick={signInWithClerk}>Sign in</button>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
