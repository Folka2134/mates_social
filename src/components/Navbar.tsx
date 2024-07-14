const Navbar = () => {
  return (
    <div>
      <ul className="flex justify-between px-24">
        <span>LOGO</span>
        <div className="flex gap-3">
          <span>Login</span>
          <span>Sign-up</span>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
