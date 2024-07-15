import { signInWithCustomToken } from "firebase/auth";
import { auth } from "../lib/firebase/firebaseInit";

export default function Auth() {
  return (
    <div className="flex gap-3">
      {/* <SignedOut> */}
      <button>Sign in</button>
      {/* </SignedOut> */}
      {/* <SignedIn>
        <UserButton />
      </SignedIn> */}
    </div>
  );
}
