import React from "react";
import "./ChatHeader.css";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

function ChatHeader({ isOpen, setIsOpen }) {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const goToAbout = () => {
    navigate("/about");
    setIsOpen(false); // close dropdown after clicking
  };
  return (
    <>
      <div className="navbar">
        <span>
          ConnectGPT <i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="nav-actions">
          <button onClick={toggleTheme} className="theme-btn">
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <div className="userIconDiv" onClick={handleProfileClick}>
            <span className="userIcon">
              <i className="fa-solid fa-user"></i>
            </span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="dropDown">
          <div className="dropDownItem" onClick={goToAbout}>
            <i className="fa-solid fa-circle-info"></i> About
          </div>
          <div className="dropDownItem" onClick={() => navigate("/createdby")}>
            <i className="fa-solid fa-heart"></i> Created By
          </div>
          <div className="dropDownItem" onClick={handleLogout}>
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Log out
          </div>
        </div>
      )}
    </>
  );
}

export default ChatHeader;
