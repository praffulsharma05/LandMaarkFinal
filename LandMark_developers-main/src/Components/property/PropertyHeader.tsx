  

// const PropertyHeader = ({ property }) => {
//   return (
    // <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
    //   <div>
    //     <h2 className="text-2xl font-bold text-left">{property.name}</h2>
    //     <p className="text-blue-600text-3xl text-left text-sm mt-1">By {property.builder}</p>
    //     <p className="text-gray-600 text-sm mt-1 flex items-start gap-1">
    //       <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
    //       <span>{property.location}</span>
    //     </p>
    //   </div>

      
    // </div>
//   );
// };

// export default PropertyHeader;
 import React from 'react';
import { 
  MapPin, 
  Building2, 
  Phone,
  Home,
  TrendingUp,
  Layers
} from 'lucide-react';

const PropertyHeader = ({ property }) => {  
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
      
      {/* Left Section - Property Details */}
      <div className="flex-1">
        
        {/* Property Name */}
        <div className="flex items-center gap-2 mb-1">
          <Home className="w-5 h-5 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">
            {property.name}
          </h2>
        </div>

        {/* Builder */}
        <p className="text-blue-700 text-sm mt-2 flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5" />
          <span>By {property.builder}</span>
        </p>

        {/* Property Type */}
        {property.type && (
          <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
            <Layers className="w-3 h-3" />
            <span>{property.type}</span>
          </p>
        )}

        {/* Location */}
        <p className="text-gray-600 text-sm mt-2 flex items-start gap-1.5">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500" />
          <span>{property.location}</span>
        </p>

        {/* Area */}
        {property.area && (
          <p className="text-gray-500 text-xs mt-1 flex items-center gap-1 ml-5">
            <TrendingUp className="w-3 h-3" />
            <span>Super built-up: {property.area}</span>
          </p>
        )}
      </div>

      {/* Right Section - Price & CTA */}
      <div className="text-right min-w-[220px]">
        
        <p className="text-xl font-semibold">
          ₹{property.price.min} L - {property.price.max} L
        </p>

        <p className="text-sm text-gray-700">
          ₹{property.price.perSqft}/sq.ft
        </p>

        <p className="text-blue-700 text-sm mt-1">
          EMI starts at ₹{property.price.emi}K
        </p>

        {/* Contact Button */}
        <button
          className="mt-3 w-full md:w-auto bg-purple-700 hover:bg-purple-800 px-6 py-3 rounded-lg transition transform hover:scale-105"style={{background:'#5e23dc'}}
          onClick={() => console.log("Contact clicked")}
        >
          <span className="flex items-center justify-center  text-white font-bold"  >
            <Phone className="w-4 h-4" />
            Contact Sellers
          </span>
        </button>

        <p className="text-gray-400 text-xs mt-2">
          *Price excludes maintenance, floor rise
        </p>
      </div>
    </div>
  );
};

export default PropertyHeader;