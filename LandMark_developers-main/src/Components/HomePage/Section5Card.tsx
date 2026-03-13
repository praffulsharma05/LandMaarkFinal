import React from "react";
import { MapPin, Hand } from "lucide-react";
import { Cards } from "../../store/HomePage/Section5Card";

interface PropertyCardProps {
  property: Cards;
}

const Section5Card: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 hover:-translate-y-1">
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-56 object-cover"
      />

      <div className="p-5 text-left">
        <h3 className="text-base font-semibold text-[#1c3b2a] mb-2">
          {property.title}
        </h3>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <MapPin size={16} />
          <span>{property.location}</span>
        </div>

        <p className="text-[#b38b3c] font-semibold mb-4">{property.price}</p>

        <div className="border-t pt-4">
          <button className="flex items-center gap-2 text-[#1c3b2a] font-semibold text-sm hover:text-[#b38b3c] transition">
            <Hand size={16} />
            ENQUIRE NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section5Card;
