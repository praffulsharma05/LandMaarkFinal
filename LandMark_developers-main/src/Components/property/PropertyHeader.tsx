import React from 'react';
import { MapPin } from 'lucide-react';

const PropertyHeader = ({ property }) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
      <div>
        <h1 className="text-2xl font-semibold">{property.name}</h1>
        <p className="text-blue-600 text-sm mt-1">By {property.builder}</p>
        <p className="text-gray-600 text-sm mt-1 flex items-start gap-1">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>{property.location}</span>
        </p>
      </div>

      <div className="text-right">
        <p className="text-xl font-semibold">₹{property.price.min} L - {property.price.max} L</p>
        <p className="text-sm text-gray-600">₹{property.price.perSqft}/sq.ft</p>
        <p className="text-blue-600 text-sm mt-1">EMI starts at ₹{property.price.emi}K</p>
      </div>
    </div>
  );
};

export default PropertyHeader;