import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef(null);

  useEffect(() => {
    const client = new Client({
      webSocketFactory: () => new SockJS("http://localhost:8080/ws"),
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("Connected ✅");
        setIsConnected(true);

        client.subscribe("/topic/messages", (msg) => {
          const data = JSON.parse(msg.body);
          setMessages((prev) => [...prev, data]);
        });
      },

      onDisconnect: () => {
        console.log("Disconnected ❌");
        setIsConnected(false);
      },

      onStompError: (frame) => {
        console.error("STOMP error:", frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => client.deactivate();
  }, []);

  const sendMessage = (text) => {
    if (!username.trim()) {
      alert("Enter username first");
      return;
    }

    if (clientRef.current && clientRef.current.connected) {
      clientRef.current.publish({
        destination: "/app/chat",
        body: JSON.stringify({
          sender: username,
          content: text,
        }),
      });
    }
  };

  return (
    <div className="app">
      <div className="chat-box">

        {/* 🔥 Header */}
        <div className="chat-header">
          💬 WebSocket Chat
          <span className={`status ${isConnected ? "online" : "offline"}`}>
            {isConnected ? "🟢 Online" : "🔴 Offline"}
          </span>
        </div>

        {/* 👤 Username */}
        <input
          className="username"
          placeholder="Enter your name..."
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* 💬 Messages */}
        <MessageList messages={messages} username={username} />

        {/* ✏️ Input */}
        <MessageInput sendMessage={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;