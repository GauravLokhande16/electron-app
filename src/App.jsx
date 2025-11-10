import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (window.msg) {
      window.msg.onFromMain((data) => {
        setMessages((prev) => [...prev, data]);
      });
    }
  }, []);

  const sendMessage = () => {
    if (input === "") return;
    if (window.msg) {
      window.msg.sendToMain(input);
      setInput("");
    }
  };

  return (
    <div className="container">
      <h2>Electron IPC Demo</h2>
      <p>Communication between Renderer to Main to Child Process</p>
      <input
        className="msg-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
      <hr />
      <div style={{ marginTop: 10 }}>
        <h3>Messages:</h3>
        <pre>{messages.join("\n")}</pre>
      </div>
      <table>
        <tbody>
          {data &&
            data.map((post, i) => (
              <tr key={i}>
                <td>{post.name}</td>
                <td>{post.email}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
