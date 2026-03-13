import React from "react";
import { Section8Type } from "../../store/HomePage/section8Card";

interface Props {
  item: Section8Type;
}

const Section8Card: React.FC<Props> = ({ item }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-10 text-center hover:shadow-xl transition duration-300">
      <div className="text-5xl mb-6">{item.icon}</div>
      <h3 className="text-lg font-medium text-[#1c3b2a] leading-snug">
        {item.title}
      </h3>
    </div>
  );
};

export default Section8Card;
