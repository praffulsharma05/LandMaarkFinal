 
import React from "react";
import { Section6Type } from "../../store/HomePage/Section6Card";

interface Props {
  item: Section6Type;
  isActive: boolean;
}

const Section6Card: React.FC<Props> = ({ item, isActive }) => {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ${
        isActive ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Wrapper must be relative */}
      <div className="relative w-full h-[500px] overflow-hidden">
        {/* Image */}
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Text Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <h3 className="text-white text-3xl md:text-5xl font-semibold mb-4 tracking-wide">
            {item.title}
          </h3>

          <p className="text-white text-sm md:text-lg max-w-2xl  leading-relaxed">
            {item.subtitle}
          </p>
         
        </div>
      </div>
        <button className="rounded-btn mt-10">{item.button}</button>
    </div>
  );
};

export default Section6Card;
