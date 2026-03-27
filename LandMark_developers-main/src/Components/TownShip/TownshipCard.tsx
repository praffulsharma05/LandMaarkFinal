import React from "react";
import { Township } from "../../store/TownShip/townshipsData";

interface TownshipCardProps {
  item: Township;
  onSelect: (item: Township) => void;
}

const TownshipCard: React.FC<TownshipCardProps> = ({ item, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(item)}
      className="header group bg-white mb-20 mt-20 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300"
    >
      {/* City Image */}
      <div className=" h-70 overflow-hidden">
        <img
          src={item.image}
          alt={item.city}
          className="w-full aspect-square object-cover group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* City Info */}
      <div className="p-7   ">
        <h3 className="font-semibold text-left  text-lg text-gray-800">{item.city}</h3>

        <p className="text-sm text-gray-500  text-right mt-1">
          {item.properties.length} Properties
        </p>
        <p className="text-left">{item.description}</p> 
      </div>
    </div>
  );
};

export default TownshipCard;
