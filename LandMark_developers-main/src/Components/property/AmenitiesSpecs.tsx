import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp,
  Grid,
  Wrench,
  Building2,
  MoreHorizontal,
  Dumbbell,
  Waves,
  Trees,
  Shield,
  Zap,
  ArrowUpDown,
  ParkingCircle,
  Home
} from 'lucide-react';
import { CityProperty } from '../../services/services';

interface AmenitiesSpecsProps {
  property: CityProperty;
}

const iconMap: Record<string, any> = {
  Dumbbell: Dumbbell,
  Waves: Waves,
  Trees: Trees,
  Shield: Shield,
  Zap: Zap,
  ArrowUpDown: ArrowUpDown,
  ParkingCircle: ParkingCircle,
  Building2: Building2,
  Home: Home,
};

const AmenitiesSpecs: React.FC<AmenitiesSpecsProps> = ({ property }) => {
  const [openSection, setOpenSection] = useState<string>("amenities");

  const renderIcon = (IconComponent: any, className = "w-6 h-6") => {
    return <IconComponent className={className} />;
  };

  const getAmenityIcon = (amenityName: string): string => {
    const amenityIconMap: Record<string, string> = {
      'Gym': 'Dumbbell',
      'Parking': 'ParkingCircle',
      'Swimming pool': 'Waves',
      'Club House': 'Building2',
      'Security': 'Shield',
      'Garden': 'Trees',
      'Children Play Area': 'Trees',
      'Power Backup': 'Zap',
      'Lift': 'ArrowUpDown',
    };
    return amenityIconMap[amenityName] || 'Building2';
  };

  // Convert specifications object to array
  const specificationsArray = Object.entries(property.specifications).map(([key, value]) => ({
    label: key,
    value: value
  }));

  // Static data for construction specifications
  const floorData = [
    { label: 'Flooring', value: 'Vitrified tiles in living, wooden flooring in bedrooms' },
    { label: 'Countertops', value: 'Granite kitchen countertop' },
  ];

  const fittingData = [
    { label: 'Bathroom Fittings', value: 'Premium brand fittings' },
    { label: 'Kitchen Fittings', value: 'Stainless steel sink with drainboard' },
  ];

  const wallData = [
    { label: 'Wall Finish', value: 'Premium emulsion paint' },
    { label: 'Ceiling', value: 'POP false ceiling in living room' },
  ];

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
              Top Amenities
            </h2>
            
            {/* Amenities Section */}
            {property.amenities.length > 0 && (
              <div className="flex justify-center mt-10">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-10">
                  {property.amenities.slice(0, 7).map((item, i) => {
                    const iconName = getAmenityIcon(item.amenity_name);
                    const IconComponent = iconMap[iconName] || Building2;
                    return (
                      <div key={i} className="flex flex-col items-center text-center group">
                        <div className="mb-2 text-gray-700 group-hover:text-purple-600 transition-colors">
                          {renderIcon(IconComponent)}
                        </div>
                        <p className="text-sm text-gray-700 leading-tight group-hover:text-gray-900 transition-colors">
                          {item.amenity_name}
                        </p>
                      </div>
                    );
                  })}

                  {property.amenities.length > 7 && (
                    <div className="flex flex-col items-center justify-center bg-gray-100 rounded-xl p-4 cursor-pointer hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                      <MoreHorizontal className="w-6 h-6 text-purple-600" />
                      <p className="text-purple-600 font-medium mt-1">+{property.amenities.length - 7} more</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Specifications Section */}
            <div className="mt-10 px-6">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                Specifications
              </h2>

              {/* Property Specifications from API */}
              {specificationsArray.length > 0 && (
                <div className="border-b border-gray-200 py-4">
                  <div
                    className="flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 py-2 rounded-lg transition-colors"
                    onClick={() => setOpenSection(openSection === "specs" ? "" : "specs")}
                  >
                    <div className="flex items-center gap-2">
                      <Grid className="w-5 h-5 text-gray-600" />
                      <p className="font-medium text-gray-800">Property Specifications</p>
                    </div>
                    {openSection === "specs" ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </div>

                  {openSection === "specs" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                      {specificationsArray.map((item, i) => (
                        <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                          <p className="text-gray-700 font-semibold text-sm mb-1">{item.label}</p>
                          <p className="text-gray-600 text-xs leading-relaxed">{item.value}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {floorData.map((item, i) => (
                      <div key={i} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="text-gray-700 font-semibold text-sm mb-1">{item.label}</p>
                        <p className="text-gray-600 text-xs leading-relaxed">{item.value}</p>
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {fittingData.map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="text-gray-700 font-semibold text-sm mb-1">{item.label}</p>
                        <p className="text-gray-600 text-xs leading-relaxed">{item.value}</p>
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
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <p className="text-gray-700 font-semibold text-sm mb-1">{item.label}</p>
                        <p className="text-gray-600 text-xs leading-relaxed">{item.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesSpecs;