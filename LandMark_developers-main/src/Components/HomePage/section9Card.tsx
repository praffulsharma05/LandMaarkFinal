import React from "react";
import { Section9Type } from "../../store/HomePage/section9Card";
import "./section9Card.css";

interface Props {
  item: Section9Type;
}

const Section9Card: React.FC<Props> = ({ item }) => {
  return (
    <div className="sec9-card">
      {/* Image */}
      <div className="sec9-card-img-wrapper">
        <img
          src={item.image}
          alt={item.title}
          className="sec9-card-img"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="sec9-card-content">
        <h1 className="sec9-card-title">
          {item.title}
        </h1>
        <p className="sec9-card-desc">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default Section9Card;
