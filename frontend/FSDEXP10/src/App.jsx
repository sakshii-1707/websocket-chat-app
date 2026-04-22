import Chat from "./components/Chat.jsx";

function App() {
  return (
    <div className="app">
      <div className="chat-container">
        <h1 className="title">WebSocket Chat</h1>
        <Chat />
      </div>
    </div>
  );
}

export default App;