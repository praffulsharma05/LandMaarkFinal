import React from "react";
import { Section9Type } from "../../store/HomePage/section9Card";

interface Props {
  item: Section9Type;
}

const Section9Card: React.FC<Props> = ({ item }) => {
  return (
    <div className="group cursor-pointer">
      {/* Image */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-[220px] object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="mt-5">
        <h3 className="text-xl font-semibold text-[#0d2c24] mb-2">
          {item.title}
        </h3>
        <p className="text-gray-600 leading-relaxed text-sm">
          {item.description}
        </p>
      </div>
    </div>
  );
};

export default Section9Card;
