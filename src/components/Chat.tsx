import { useEffect, useState } from "react";
import {
  db,
  getMessages,
  auth,
  sendMessage,
} from "../lib/firebase/firebaseInit";

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      const msgs = await getMessages(db);
      setMessages(msgs);
    };
    fetchMessages();
  });

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    console.log(formValue);

    sendMessage(formValue);
    setFormValue("");
  };

  return (
    <>
      <div>
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg.data} />
          ))}
      </div>

      <form onSubmit={handleSendMessage}>
        <input
          className="text-black"
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

function ChatMessage(props: any) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser?.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
}
