import "./App.css";
import Navbar from "./components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase/firebaseInit";
import Chat from "./components/Chat";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <section>{user && <Chat />}</section>
    </div>
  );
}

export default App;
