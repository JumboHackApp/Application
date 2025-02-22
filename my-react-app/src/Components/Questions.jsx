import React, { useState } from "react";
import "./questions.css";

const Questions = () => {
  const [name, setName] = useState("");

  return (
    <div className="phone-container">
      <div className="question-box">
        <h2>Hi! What is your name?</h2>
        <input
          type="text"
          placeholder="Ex: Jon Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="name-input"
        />
        <button className="next-button">Next →</button>
      </div>
    </div>
  );
};

export default Questions;
