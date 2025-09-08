const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import "./ChatWindow.css";
import Chat from "../components/Chat.jsx";
import { MyContext } from "../context/MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import ChatHeader from "./ChatHeader.jsx";
import ChatFooter from "./ChatFooter.jsx";
import { useAuth } from "../context/AuthContext.jsx"; // ✅ import useAuth

function ChatWindow() {
  const { prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat } = useContext(MyContext);
  const { token } = useAuth(); // ✅ get token from context
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    if (!prompt || !token) return; // stop if no prompt or not logged in
    setLoading(true);
    setNewChat(false);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // ✅ include token
      },
      body: JSON.stringify({ message: prompt, threadId: currThreadId })
    };

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, options);
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const res = await response.json();
      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  // Append new chat to prevChats
  useEffect(() => {
    if (prompt && reply) {
      setPrevChats(prevChats => (
        [...prevChats, { role: "user", content: prompt }, { role: "assistant", content: reply }]
      ));
      setPrompt("");
    }
  }, [reply]);

  return (
    <div className="chatWindow">
      <ChatHeader isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="chatContent">
        <Chat />
      </div>

      {loading &&
        <div className="loaderOverlay">
          <ScaleLoader color="#4fc3f7" loading={true} />
        </div>
      }

      <ChatFooter prompt={prompt} setPrompt={setPrompt} getReply={getReply} />
    </div>
  )
}

export default ChatWindow;
