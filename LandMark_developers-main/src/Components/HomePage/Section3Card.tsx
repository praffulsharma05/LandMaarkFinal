 
import React from "react";
import { Section4CardItem } from "../../store/HomePage/section4Card";

const Section4Card = ({ icon, value, label }: Section4CardItem) => {
  return (
    <div className="bg-white rounded-2xl shadow-md flex flex-col items-center justify-center aspect-square p-4 sm:p-6 text-center transition hover:shadow-lg">
      
      <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 md:mb-6">
        {icon}
      </div>

      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-teal-900">
        {value}
      </h3>

      <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
        {label}
      </p>
    </div>
  );
};

export default Section4Card;