import "./App.css";
import Sidebar from "./components/Sidebar.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import Login from "./auth/Login.jsx";
import Register from "./auth/Register.jsx";
import { MyContext } from "./context/MyContext.jsx";
import About from "./components/About.jsx"; // ✅ import About
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import CreatedBy from "./components/CreatedBy.jsx";


function App() {
  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);


  

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
  };

  return (
    <div className='app'>
      <ThemeProvider>
      <MyContext.Provider value={providerValues}>
        <Routes>
          {/* Default route → login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Route */}
          <Route path="/about" element={<About />} />
          <Route path="/createdby" element={<CreatedBy />} />

          <Route
            path="/chat"
            element={
              <PrivateRoute>
                  <Sidebar />
                  <ChatWindow />
              </PrivateRoute>
            }
          />

          {/* Catch-all → login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </MyContext.Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
