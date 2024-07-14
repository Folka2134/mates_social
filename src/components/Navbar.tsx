import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <div>
      <ul className="flex justify-between px-24">
        <span>LOGO</span>
        <div className="flex gap-3">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
