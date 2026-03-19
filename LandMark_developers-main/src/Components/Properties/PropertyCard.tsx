 

import React from "react";
import { Property } from "../../store/Properties/propertiesData";
import "./PropertyCard.css";
import { Heart } from "lucide-react";
import { assets } from "../../assets/asset";
import { useNavigate } from "react-router-dom";
interface Props {
  property: Property;
  selected: boolean;
  onToggle: (id: number) => void;
}

const PropertyCard: React.FC<Props> = ({ property, selected, onToggle }) => {
   const navigate = useNavigate();
  return (
    <div className="cursor-pointer group overflow-hidden rounded-2xl bg-white shadow hover:shadow-xl transition border" 
     >
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover group-hover:scale-110 transition"
        />

        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 text-xs rounded-full">
          {property.tag}
        </div>

        {/* Heart Button */}
  <button
  onClick={() => onToggle(property.id)}
  className="heart-btn"
>
  <Heart className={`heart-icon ${selected ? "selected" : ""}`} />
</button>
      </div>

      <div className="p-6" 
       onClick={() => navigate(`/property/${property.id}`)}>
        <div className="flex justify-between mb-2">
          <h3 className="text-xl font-bold">{property.title}</h3>
          <span className="text-primary font-bold">{property.price}</span>
        </div>

        <div className="text-gray-500 mb-4 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm"></span>
          {property.location}
        </div>

        <div className="flex justify-between border-t pt-4">
          

          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-primary">
              <img src={assets.BedRoom} alt="Bedroom" style={{ width: "30px", height: "30px" }} />
            </span>
         
          </div>

          <div className="flex items-center gap-1">
            <span className="material-symbols-outlined text-primary">
           
            </span>
            {property.area}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
