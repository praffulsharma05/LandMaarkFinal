 import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp,
  Tent,
  Bike,
  Store,
  Flower2,
  Waves,
  Landmark,
  Trees,
  Droplets,
  Table,
  Grid,
  Wrench,
  Building2,
  MoreHorizontal
} from 'lucide-react';

// Icon mapping with proper Lucide components
const iconMap = {
  Tent: Tent,
  Bike: Bike,
  Store: Store,
  Flower2: Flower2,
  Waves: Waves,
  Landmark: Landmark,
  Trees: Trees,
  Droplets: Droplets,
  Table: Table,
};

const AmenitiesSpecs = ({ amenities, floorData, fittingData, wallData }) => {
  const [openSection, setOpenSection] = useState("floor");

  // Helper function to render icon with proper size
  const renderIcon = (IconComponent, className = "w-6 h-6") => {
    return <IconComponent className={className} />;
  };

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Vanshdeep The Aura Top Amenities
            </h2>
            
            {/* Amenities Section */}
            <div className="flex justify-center mt-10">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
                {amenities.map((item, i) => {
                  const IconComponent = iconMap[item.icon] || Building2;
                  return (
                    <div key={i} className="flex flex-col items-center text-center group">
                      <div className="mb-2 text-gray-700 group-hover:text-purple-600 transition-colors">
                        {renderIcon(IconComponent)}
                      </div>
                      <p className="text-sm text-gray-700 leading-tight group-hover:text-gray-900 transition-colors">
                        {item.name}
                      </p>
                    </div>
                  );
                })}

                {/* More Button */}
                <div className="flex flex-col items-center justify-center bg-gray-100 rounded-xl p-4 cursor-pointer hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                  <MoreHorizontal className="w-6 h-6 text-purple-600" />
                  <p className="text-purple-600 font-medium mt-1">+30 more</p>
                  <ChevronDown className="w-4 h-4 text-purple-600 mt-1" />
                </div>
              </div>
            </div>

            {/* Specifications Section */}
            <div className="mt-10 px-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                Vanshdeep The Aura Specifications
              </h2>

              {/* Floor & Counter */}
              <div className="border-b border-gray-200 py-4">
                <div
                  className="flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 py-2 rounded-lg transition-colors"
                  onClick={() => setOpenSection(openSection === "floor" ? "" : "floor")}
                >
                  <div className="flex items-center gap-2">
                    <Grid className="w-5 h-5 text-gray-600" />
                    <p className="font-medium text-gray-800">Floor & Counter</p>
                  </div>

                  {openSection === "floor" ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>

                {openSection === "floor" && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 animate-slideDown">
                    {floorData.map((item, i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                        <p className="text-gray-700 font-semibold text-sm mb-1">{item.label}</p>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Fitting */}
              <div className="border-b border-gray-200 py-4">
                <div
                  className="flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 py-2 rounded-lg transition-colors"
                  onClick={() => setOpenSection(openSection === "fitting" ? "" : "fitting")}
                >
                  <div className="flex items-center gap-2">
                    <Wrench className="w-5 h-5 text-gray-600" />
                    <p className="font-medium text-gray-800">Fitting</p>
                  </div>

                  {openSection === "fitting" ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>

                {openSection === "fitting" && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 animate-slideDown">
                    {fittingData.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                        <p className="text-gray-700 font-semibold text-sm mb-1">{item.label}</p>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Wall & Ceiling */}
              <div className="py-4">
                <div
                  className="flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 py-2 rounded-lg transition-colors"
                  onClick={() => setOpenSection(openSection === "wall" ? "" : "wall")}
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-gray-600" />
                    <p className="font-medium text-gray-800">Wall & Ceiling</p>
                  </div>

                  {openSection === "wall" ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>

                {openSection === "wall" && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {wallData.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                        <p className="text-gray-700 font-semibold text-sm mb-1">{item.label}</p>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AmenitiesSpecs;

  