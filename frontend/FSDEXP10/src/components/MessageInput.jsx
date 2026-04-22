import { useState } from "react";

function MessageInput({ sendMessage }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "") return;

    sendMessage(text);
    setText("");
  };

  return (
    <div className="input-area">
      <input
        value={text}
        placeholder="Type message..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend(); // 🔥 Enter to send
        }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default MessageInput;