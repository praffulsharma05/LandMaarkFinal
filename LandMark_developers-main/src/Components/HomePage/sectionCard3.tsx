import React from "react";
import "./sectionCard3.css";

interface SectionCardProps {
  title: string;
  description: string;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, description }) => {
  return (
    <div className="sec3-card">
      {/* Title */}
      <h1 className="sec3-card-title">
        {title}
      </h1>

      {/* Description */}
      <p className="sec3-card-desc">{description}</p>

      {/* Hover Glow Effect */} 
      <div className="sec3-card-glow"></div>
    </div>
  );
};

export default SectionCard;
