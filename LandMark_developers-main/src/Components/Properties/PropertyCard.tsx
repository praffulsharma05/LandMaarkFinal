 
import React from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CityProperty } from "../../services/services";

interface Props {
  property: CityProperty;
  selected: boolean;
  onToggle: (id: number) => void;
}

const PropertyCard: React.FC<Props> = ({ property, selected, onToggle }) => {
  const navigate = useNavigate();

  return (
    <div className="cursor-pointer group overflow-hidden rounded-2xl bg-white shadow hover:shadow-xl transition border">
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover group-hover:scale-110 transition"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Property+Image';
          }}
        />

        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 text-xs rounded-full">
          {property.tag}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(property.id);
          }}
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:scale-110 transition"
        >
          <Heart 
            className={`w-5 h-5 ${selected ? "fill-red-500 text-red-500" : "text-gray-500"}`} 
          />
        </button>
      </div>

      <div className="p-6" onClick={() => navigate(`/property/${property.id}`)}>
        <div className="flex justify-between mb-2">
          <h3 className="text-xl font-bold truncate">{property.title}</h3>
          <span className="text-primary font-bold whitespace-nowrap ml-2">{property.price}</span>
        </div>

        <div className="text-gray-500 mb-4 flex items-center gap-1">
          <span> {property.location}</span>
        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-700">{property.bhk} BHK</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-700">{property.area}</span>
          </div>
          
          {property.verified && (
            <div className="flex items-center gap-1">
              <span className="text-green-500 text-xs font-medium bg-green-50 px-2 py-1 rounded">
                ✓ Verified
              </span>
            </div>
          )}
        </div>

        {/* Show first amenity if available */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="mt-3 pt-3 border-t flex gap-2">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {property.amenities[0].amenity_name}
            </span>
            {property.amenities.length > 1 && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                +{property.amenities.length - 1} more
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyCard;