const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
import { useContext, useEffect, useState } from "react";
import "./Sidebar.css";
import { MyContext } from "../context/MyContext.jsx";
import { v1 as uuidv1 } from "uuid";
import { useAuth } from "../context/AuthContext.jsx"; // ✅ import useAuth

function Sidebar() {
  const { allThreads, setAllThreads, currThreadId, setNewChat, setPrompt, setReply, setCurrThreadId, setPrevChats } = useContext(MyContext);
  const { token, loading } = useAuth(); // ✅ get token from AuthContext

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Fetch all threads from backend
  const getAllThreads = async () => {
    if (!token) return; // only fetch if logged in
    try {
      const response = await fetch(`${API_BASE_URL}/thread`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const res = await response.json();
      const filteredData = res.map(thread => ({ threadId: thread.threadId, title: thread.title }));
      setAllThreads(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!loading && token) getAllThreads();
  }, [currThreadId, token, loading]);

  const createNewChat = () => {
    setNewChat(true);
    setPrompt("");
    setReply(null);
    setCurrThreadId(uuidv1());
    setPrevChats([]);
    setSidebarOpen(false);
  };

  const changeThread = async (newThreadId) => {
    if (!token) return;
    setCurrThreadId(newThreadId);
    setSidebarOpen(false);
    try {
      const response = await fetch(`${API_BASE_URL}/thread/${newThreadId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      const res = await response.json();
      setPrevChats(res);
      setNewChat(false);
      setReply(null);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteThread = async (threadId) => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/thread/${threadId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error(`Error ${response.status}`);
      await response.json();
      setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

      if (threadId === currThreadId) createNewChat();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button 
        className="sidebar-toggle-button" 
        onClick={toggleSidebar} 
        aria-label="Toggle sidebar menu"
      >
        {sidebarOpen ? <i className="fa-solid fa-xmark"></i> : <i className="fa-solid fa-bars"></i>}
      </button>

      {/* Overlay */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}

      <section className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-top">
          <button onClick={createNewChat} className="new-chat-btn">
            <img src="src/assets/blacklogo.png" alt="logo" className="logo" />
            <span className="history"><i className="fa-solid fa-pen-to-square"></i></span>
          </button>
        </div>

        <div className="sidebar-middle">
          <ul className="history">
            {allThreads?.map((thread, idx) => (
              <li
                key={idx}
                onClick={() => changeThread(thread.threadId)}
                className={thread.threadId === currThreadId ? "highlighted" : ""}
              >
                {thread.title}
                <i
                  className="fa-solid fa-trash"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteThread(thread.threadId);
                  }}
                ></i>
              </li>
            ))}
          </ul>
        </div>

        <div className="sidebar-bottom">
          <p>By JayaKrishna &hearts;</p>
        </div>
      </section>
    </>
  );
}

export default Sidebar;
