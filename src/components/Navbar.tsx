import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
import Auth from "./Auth";

const Navbar = () => {
  return (
    <div>
      <ul className="flex justify-between px-24">
        <span>LOGO</span>
        <Auth />
      </ul>
    </div>
  );
};

export default Navbar;
