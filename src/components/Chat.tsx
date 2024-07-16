import { useEffect, useState } from "react";
import { db, getMessages } from "../lib/firebase/firebaseInit";

export default function Chat() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const msgs = await getMessages(db);
      setMessages(msgs);
    };
    fetchMessages();
  }, []);

  console.log(messages);

  return (
    <div>
      {messages &&
        messages.map((msg) => <ChatMessage key={msg.id} message={msg.data} />)}
    </div>
  );
}

function ChatMessage(props: any) {
  const { text, uid } = props.message;

  return <p>1: {text}</p>;
}
