 

// import { MapPin, IndianRupee, X } from "lucide-react";
// import { Property } from "../../store/Properties/propertiesData";

// interface Props {
//   property: Property;
//   selected: boolean;
//   hovered: boolean;
//   onHover: () => void;
//   onLeave: () => void;
//   onSelect: () => void;
//   onRemove: () => void;
// }

// const WishlistCard = ({
//   property,
//   selected,
//   hovered,
//   onHover,
//   onLeave,
//   onSelect,
//   onRemove, 
// }: Props) => {
//   const formatPrice = (price: string) => price.replace("FROM INR", "").trim();

//   return (
//     <div
//       className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100/50"
//       onMouseEnter={onHover}
//       onMouseLeave={onLeave}
//     >
//       {/* Checkbox */}
//       <div className="absolute top-3 left-3 z-10">
//         <input
//           type="checkbox"
//           checked={selected}
//           onChange={onSelect}
//           className="w-5 h-5"
//         />
//       </div>

//       {/* Remove */}
//       <button
//         onClick={onRemove}
//         className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md"
//       >
//         <X className="w-4 h-4 text-rose-500" />
//       </button>

//       {/* Image */}
//       <div className="relative h-56 overflow-hidden">
//         <img
//           src={property.image}
//           alt={property.title}
//           className="w-full h-full object-cover group-hover:scale-110 transition"
//         />

//         <div className="absolute bottom-3 left-3 right-3 bg-white rounded-lg px-3 py-2 shadow">
//           <div className="flex items-center gap-1 text-amber-800">
//             <IndianRupee className="w-4 h-4" />
//             <span className="font-semibold text-sm">
//               {formatPrice(property.price)}
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <h3 className="font-semibold text-amber-900">{property.title}</h3>

//         <div className="flex items-center gap-1 mt-2 text-amber-600">
//           <MapPin className="w-4 h-4" />
//           <p className="text-sm">{property.location}</p>
//         </div>
//       </div>

//       <div
//         className={`absolute bottom-0 left-0 h-1 bg-amber-600 transition-all ${
//           hovered ? "w-full" : "w-0"
//         }`}
//       />
//     </div>
//   );
// };

// export default WishlistCard;
import React from "react";
import { MapPin, IndianRupee, X, Heart } from "lucide-react";
import { CityProperty } from "../../services/services";

interface Props {
  property: CityProperty;
  selected: boolean;
  hovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
  onRemove: () => void;
  onClick: () => void;
}

const WishlistCard = ({
  property,
  selected,
  hovered,
  onHover,
  onLeave,
  onSelect,
  onRemove,
  onClick,
}: Props) => {
  const formatPrice = (price: string) => {
    return price.replace("FROM INR", "").trim();
  };

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100/50 cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Checkbox */}
      <div 
        className="absolute top-3 left-3 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="w-5 h-5 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
        />
      </div>

      {/* Remove Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md hover:bg-rose-50 transition"
      >
        <X className="w-4 h-4 text-rose-500" />
      </button>

      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Property+Image';
          }}
        />

        <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg">
          <div className="flex items-center gap-1 text-amber-800">
            <IndianRupee className="w-4 h-4" />
            <span className="font-semibold text-sm">
              {formatPrice(property.price)}
            </span>
          </div>
        </div>

        {/* Heart badge */}
        <div className="absolute top-3 right-12">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-amber-900 text-lg line-clamp-1">
          {property.title}
        </h3>

        <div className="flex items-center gap-1 mt-2 text-amber-600">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm line-clamp-1">{property.location}</p>
        </div>

        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-amber-100">
          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
            {property.bhk} BHK
          </span>
          <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded">
            {property.propertyType}
          </span>
          {property.verified && (
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              Verified
            </span>
          )}
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 h-1 bg-amber-600 transition-all duration-300 ${
          hovered ? "w-full" : "w-0"
        }`}
      />
    </div>
  );
};

export default WishlistCard;