import { useEffect, useState } from "react";
import {
  db,
  getMessages,
  auth,
  sendMessage,
} from "../lib/firebase/firebaseInit";
import { mockMessages } from "../constants/mockData";

import { v4 as uuidv4 } from "uuid";

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);
  const [formValue, setFormValue] = useState("");

  useEffect(() => {
    if (import.meta.env.VITE_APP_USE_MOCK_DATA == "true") {
      setMessages(mockMessages);
    } else {
      const fetchMessages = async () => {
        const msgs = await getMessages(db);
        setMessages(msgs);
      };
      fetchMessages();
    }
  });

  const handleSendMessage = (e: any) => {
    e.preventDefault();

    if (import.meta.env.VITE_APP_USE_MOCK_DATA == "true") {
      mockMessages.push({
        id: uuidv4(),
        data: {
          text: `${formValue}`,
          uid: "user2",
          photoURL: "/path/to/default/photo.jpg",
        },
      });
    } else {
      sendMessage(formValue);
    }
    setFormValue("");
  };

  return (
    <>
      <div className="flex h-96 flex-col justify-end overflow-scroll bg-purple-950">
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
