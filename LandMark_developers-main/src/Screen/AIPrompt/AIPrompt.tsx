 
import React, { useState } from "react";
import "./AIPrompt.css";
import { useNavigate } from "react-router-dom";


const AIPrompt = ({ show = true }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  if (!show) return null;

  const handleGenerate = () => {
    // navigate with query
    navigate("/properties", { state: { query } });
  };
 
 
  return (
    <div className="ai-floating-bar">
      <span className="sparkle" >✦</span>

      <input
        className="ai-input"
        type="text" id="postList"
        placeholder="I want to buy 2bhk in ajmer for around 1 crore"
      />

      <button className="generate-btn"     onClick={handleGenerate}>
        <span className="btn-icon" >✦</span>
        Generate
      </button>

      
    </div>
  );
};

export default AIPrompt;
