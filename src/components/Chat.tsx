import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, getMessages } from "../lib/firebase/firebaseInit";
import { query, orderBy, limit } from "firebase/firestore";

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
        messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
    </div>
  );
}

function ChatMessage(props: any) {
  const { text, uid } = props.message;

  return <p>1: {text}</p>;
}
