// About.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css"; // pro-style CSS

function About() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/chat"); // navigate back to chat
  };

  return (
    <div className="about-container">
      <div className="about-card">
        <h1>About QuickChat</h1>
        <p>
          <strong>QuickChat</strong> is a modern chat application that allows you to create threads, 
          send messages, and get AI-powered responses in real-time.
        </p>

        <h2>How it Works</h2>
        <ul>
          <li>Create multiple chat threads to organize your conversations.</li>
          <li>Send messages and receive instant AI responses powered by our backend API.</li>
          <li>All messages are stored securely per thread, so you can continue your conversations anytime.</li>
        </ul>

        <h2>API Key Limitation</h2>
        <p>
          Each API key is valid for <strong>1 year</strong> from the date of creation. 
          After that, you will need to renew your key to continue using the AI services.
        </p>

        <div className="about-footer">
          <p>Created by JayaKrishna &hearts;</p>
        </div>

        <button className="back-btn" onClick={goBack}>
          &larr; Back
        </button>
      </div>
    </div>
  );
}

export default About;
