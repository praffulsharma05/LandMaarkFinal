// import React from "react";
// import { MapPin, IndianRupee, X } from "lucide-react";
// import { Property } from "../../store/Properties/propertiesData";

// interface Props {
//   property: Property;
//   selected: boolean;
//   onRemove: (id: number) => void;
//   onSelect: (id: number) => void;
// }

// const WishlistCard: React.FC<Props> = ({
//   property,
//   selected,
//   onRemove,
//   onSelect,
// }) => {
//   const formatPrice = (price: string) => {
//     return price.replace("FROM INR", "").trim();
//   };

//   return (
//     <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden border">
//       {/* Checkbox */}
//       <div className="absolute top-3 left-3 z-10">
//         <input
//           type="checkbox"
//           checked={selected}
//           onChange={() => onSelect(property.id)}
//           className="w-5 h-5"
//         />
//       </div>

//       {/* Remove */}
//       <button
//         onClick={() => onRemove(property.id)}
//         className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow"
//       >
//         <X className="w-4 h-4 text-red-500" />
//       </button>

//       {/* Image */}
//       <div className="h-56 overflow-hidden">
//         <img
//           src={property.image}
//           alt={property.title}
//           className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
//         />
//       </div>

//       {/* Content */}
//       <div className="p-4">
//         <h3 className="font-semibold text-gray-800">{property.title}</h3>

//         <div className="flex items-center gap-1 text-gray-500 mt-2">
//           <MapPin className="w-4 h-4" />
//           {property.location}
//         </div>

//         <div className="flex items-center gap-1 mt-3 text-amber-700">
//           <IndianRupee className="w-4 h-4" />
//           <span className="font-semibold">{formatPrice(property.price)}</span>
//         </div>

//         <div className="mt-4 grid grid-cols-2 gap-2">
//           <button className="bg-amber-700 text-black py-2 rounded-lg text-sm">
//             View
//           </button>
//           <button className="border py-2 rounded-lg text-sm">Compare</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WishlistCard;

import { MapPin, IndianRupee, X } from "lucide-react";
import { Property } from "../../store/Properties/propertiesData";

interface Props {
  property: Property;
  selected: boolean;
  hovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onSelect: () => void;
  onRemove: () => void;
}

const WishlistCard = ({
  property,
  selected,
  hovered,
  onHover,
  onLeave,
  onSelect,
  onRemove,
}: Props) => {
  const formatPrice = (price: string) => price.replace("FROM INR", "").trim();

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100/50"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Checkbox */}
      <div className="absolute top-3 left-3 z-10">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="w-5 h-5"
        />
      </div>

      {/* Remove */}
      <button
        onClick={onRemove}
        className="absolute top-3 right-3 z-10 p-2 bg-white rounded-full shadow-md"
      >
        <X className="w-4 h-4 text-rose-500" />
      </button>

      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition"
        />

        <div className="absolute bottom-3 left-3 right-3 bg-white rounded-lg px-3 py-2 shadow">
          <div className="flex items-center gap-1 text-amber-800">
            <IndianRupee className="w-4 h-4" />
            <span className="font-semibold text-sm">
              {formatPrice(property.price)}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-amber-900">{property.title}</h3>

        <div className="flex items-center gap-1 mt-2 text-amber-600">
          <MapPin className="w-4 h-4" />
          <p className="text-sm">{property.location}</p>
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 h-1 bg-amber-600 transition-all ${
          hovered ? "w-full" : "w-0"
        }`}
      />
    </div>
  );
};

export default WishlistCard;
