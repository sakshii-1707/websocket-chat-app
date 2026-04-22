import { useEffect, useRef } from "react";

function MessageList({ messages, username }) {
  const endRef = useRef(null);

  // 🔥 Auto scroll to latest message
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="messages">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`message ${
            msg.sender === username ? "sent" : "received"
          }`}
        >
          <div className="sender">{msg.sender}</div>
          <div>{msg.content}</div>

          {/* 🕒 Timestamp */}
          <div className="time">
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ))}
      <div ref={endRef}></div>
    </div>
  );
}

export default MessageList;