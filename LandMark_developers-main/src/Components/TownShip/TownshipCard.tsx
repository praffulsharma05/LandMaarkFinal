import React from "react";
import { Township } from "../../store/TownShip/townshipsData";

interface TownshipCardProps {
  item: Township;
  onSelect: (item: Township) => void;
}

const TownshipCard: React.FC<TownshipCardProps> = ({ item, onSelect }) => {
  const cityName = item.city || item.name || 'Unknown';
  const propertiesCount = item.properties?.length || 0;
  const description = item.description || item.location || '';
  
  return (
    <div
      onClick={() => onSelect(item)}
      className="header group bg-white mb-20 mt-20 rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition duration-300"
    >
      {/* City Image */}
      <div className=" h-70 overflow-hidden">
        <img
          src={item.image || "https://images.unsplash.com/photo-1568605114967-8130f3a36994"}
          alt={cityName}
          className="w-full aspect-square object-cover group-hover:scale-110 transition duration-300"
        />
      </div>

      {/* City Info */}
      <div className="p-7 flex justify-between items-center">
        <h3 className="font-semibold text-lg text-gray-800">{cityName}</h3>

        <p className="text-sm text-gray-500">
          {propertiesCount} Properties
        </p>
      </div>
      <p className="px-7 pb-7 text-left text-gray-600">{description}</p> 
    </div>
  );
};

export default TownshipCard;
