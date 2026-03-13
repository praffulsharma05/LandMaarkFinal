// import React from "react";
// import "./AIPrompt.css";

// const AIPrompt = ({ show = true }) => {
//   if (!show) return null;

//   return (
//     <div className="ai-floating-bar">
//       <span className="sparkle">✨</span>
//       <span className="sparkle">✦</span>

//       <input
//         className="ai-input"
//         type="text"
//         placeholder="i want to buy 2bhk in ajmer for around 1 crore"
//       />
//     </div>
//   );
// };

// export default AIPrompt;

import React from "react";
import "./AIPrompt.css";

const AIPrompt = ({ show = true }) => {
  if (!show) return null;

  return (
    <div className="ai-floating-bar">
      <span className="sparkle">✦</span>

      <input
        className="ai-input"
        type="text"
        placeholder="I want to buy 2bhk in ajmer for around 1 crore"
      />

      <button className="generate-btn">
        <span className="btn-icon">✦</span>
        Generate
      </button>
    </div>
  );
};

export default AIPrompt;
