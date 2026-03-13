import React from "react";
import { Section3Item } from "../../store/HomePage/Section3";

const Section3Card: React.FC<Section3Item> = ({ image, title, price }) => {
  return (
    <div className="text-center group cursor-pointer">
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <h3 className="mt-6 text-xl tracking-[3px] font-serif text-teal-900">
        {title}
      </h3>

      <p className="mt-3 text-lg text-teal-900">{price}</p>
    </div>
  );
};

export default Section3Card;
