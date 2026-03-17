 
import React from "react";
import "./AIPrompt.css";


const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  console.log("property");
};
const AIPrompt = ({ show = true }) => {
  if (!show) return null;
 
  return (
    <div className="ai-floating-bar">
      <span className="sparkle" >✦</span>

      <input
        className="ai-input"
        type="text" id="postList"
        placeholder="I want to buy 2bhk in ajmer for around 1 crore"
      />

      <button className="generate-btn"    onClick={() =>
              document
                .getElementById("properties")
                ?.scrollIntoView({ behavior: "smooth" })
            }>
        <span className="btn-icon" >✦</span>
        Generate
      </button>

      
    </div>
  );
};

export default AIPrompt;
