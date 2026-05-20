import React from "react";
import { Section8Type } from "../../store/HomePage/section8Card";
import "./Section8Card.css";

interface Props {
  item: Section8Type;
}

const Section8Card: React.FC<Props> = ({ item }) => {
  return (
    <div className="sec8-card">
      <div className="sec8-card-icon">{item.icon}</div>
      <h1 className="sec8-card-title">
        {item.title}
      </h1>
    </div>
  );
};

export default Section8Card;
