import React from "react";
import { Section3Item } from "../../store/HomePage/Section3";
import "./Section2Card.css";

const Section3Card: React.FC<Section3Item> = ({ image, title, price }) => {
  return (
    <div className="section2-card">
      <div className="section2-card-img-wrapper">
        <img
          src={image}
          alt={title}
          className="section2-card-img"
          loading="lazy"
        />
      </div>

      <div className="section2-card-content">
        <h1 className="section2-card-title">
          {title}
        </h1>
        {price && (
          <p className="section2-card-price">
            {price}
          </p>
        )}
      </div>
    </div>
  );
};

export default Section3Card;

