// CreatedBy.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./CreatedBy.css"; // pro-style CSS for your page

function CreatedBy() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/chat"); // back to chat page
  };

  const today = new Date().toLocaleDateString(); // get today's date

  return (
    <div className="createdBy-container">
      <div className="createdBy-card">
        <h1>Created By</h1>
        <img 
          src="/src/assets/myPic.jpg" 
          alt="JayaKrishna" 
          className="creator-pic" 
        />
        <h2>JayaKrishna Vamsi</h2>
        <div className="createdBy-footer">
          <p>With ❤️ using React & JavaScript</p>
        </div>

        <button className="back-btn" onClick={goBack}>
          &larr; Back
        </button>
      </div>
    </div>
  );
}

export default CreatedBy;
