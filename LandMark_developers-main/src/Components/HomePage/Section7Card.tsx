import React from "react";
import { Section7Type } from "../../store/HomePage/section7Card";

interface Props {
  item: Section7Type;
}

const Section7Card: React.FC<Props> = ({ item }) => {
  return (
    <div className="relative rounded-xl  overflow-hidden group cursor-pointer">
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-[420px] object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"></div>

      {/* Brand (Top) */}
      <div className="absolute top-6 left-0 right-0 text-center text-white text-lg font-light tracking-wide z-10">
        {item.brand}
      </div>

      {/* Bottom Content */}
      <div className="absolute bottom-6 left-6 right-6 text-white z-10">
        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
        <p className="text-sm opacity-90 leading-relaxed">{item.subtitle}</p>
      </div>
    </div>
  );
};

export default Section7Card;
