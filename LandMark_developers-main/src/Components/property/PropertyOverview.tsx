 

import { 
  Building2, 
  Ruler, 
  IndianRupee, 
  FileText, 
  Square, 
  Building, 
  Calendar, 
  MapPin, 
  Rocket, 
  Home 
} from 'lucide-react';

import React from 'react';
import { Share2, Heart, HelpCircle } from 'lucide-react';
import { CityProperty } from '../../services/services';

interface PropertyOverviewProps {
  property: CityProperty;
  pricePerSqft: number;
}

const PropertyOverview: React.FC<PropertyOverviewProps> = ({ property, pricePerSqft }) => {
  // 1. Project Units
  const projectUnits = property.project_units || 77;
  
  // 2. Sizes - use actual size from API if available
  let sizeMin = 0;
  let sizeMax = 0;
  
  if (property.size) {
    // Parse size like "2300sq.ft" or "950 sq.ft"
    const sizeMatch = property.size.match(/(\d+)/);
    if (sizeMatch) {
      const sizeValue = parseInt(sizeMatch[1]);
      sizeMin = sizeValue;
      sizeMax = sizeValue;
    }
  } else if (property.area_sqft) {
    sizeMin = property.area_sqft;
    sizeMax = property.area_sqft ? Math.round(property.area_sqft * 1.3) : 160;
  } else {
    sizeMin = 123;
    sizeMax = 160;
  }
  
  // 3. Avg. Price
  let avgPriceDisplay = '';
  if (property.avg_price) {
    avgPriceDisplay = property.avg_price;
  } else {
    avgPriceDisplay = `₹${pricePerSqft.toLocaleString()}`;
  }
  
  // 4. RERA ID
  const reraId = property.rera_id || 'Application Submitted';
  
  // 5. Area Unit - always sq.ft.
  const areaUnit = 'sq.ft.';
  
  // 6. Project Size (number of buildings)
  let projectSizeDisplay = '';
  if (property.project_size) {
    projectSizeDisplay = `${property.project_size} Buildings`;
  } else {
    projectSizeDisplay = `${Math.ceil(Number(projectUnits) / 8)} Buildings`;
  }
  
  // 7. Possession Starts
  let possessionDateDisplay = '';
  if (property.possession_date) {
    const date = new Date(property.possession_date);
    possessionDateDisplay = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } else if (property.construction_status === 'Ready to Move') {
    possessionDateDisplay = 'Ready to Move';
  } else {
    possessionDateDisplay = 'Dec, 2025';
  }
  
  // 8. Project Area
  let projectAreaDisplay = '';
  if (property.project_area) {
    projectAreaDisplay = property.project_area.includes('acre') 
      ? property.project_area 
      : `${property.project_area} Acres`;
  } else {
    projectAreaDisplay = `${((sizeMin * Number(projectUnits)) / 43560).toFixed(2)} Acres`;
  }
  
  // 9. Launch Date
  let launchDateDisplay = '';
  if (property.launch_date) {
    const date = new Date(property.launch_date);
    launchDateDisplay = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } else if (property.created_at) {
    const date = new Date(property.created_at);
    launchDateDisplay = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } else {
    launchDateDisplay = 'Nov, 2024';
  }
  
  // 10. Configuration
  let configurationDisplay = '';
  if (property.configuration) {
    configurationDisplay = property.configuration;
  } else {
    configurationDisplay = `${property.bhk} BHK ${property.property_type || 'Apartment'}`;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 -mt-10">
        <div className="lg:col-span-2 bg-white p-8 shadow-sm">
          <h2 className="text-3xl text-left w-3/5 border-b border-gray-400 font-bold mb-10">
            {property.title} Overview
          </h2>
          
          {/* First Row - First 3 items */}
          <div className="grid grid-cols-3 text-left md:grid-cols-3 gap-5 mb-10">
            {/* 1. Project Units */}
            
          <div className="mt-1">
  <p className="text-sm text-gray-500">Property Units</p>

  <div className="flex items-center gap-2 mt-1">
    <Building2  className="w-5 h-5 text-gray-400" />
    <p className="text-lg text-gray-900 font-semibold">
      {projectUnits}
    </p>
  </div>
</div>

            
            {/* 2. Sizes */}
          
           <div className="mt-1">
  <p className="text-sm text-gray-500">Sizes</p>

  <div className="flex items-center gap-2 mt-1">
    <Ruler  className="w-5 h-5 text-gray-400" />
    <p className="text-lg text-gray-900 font-semibold">
 {sizeMin.toLocaleString()} - {sizeMax.toLocaleString()}
    </p>
  </div>
</div>
            {/* 3. Avg. Price */}
           
              <div className="mt-1">
  <p className="text-sm text-gray-500">Avg. Price</p>

  <div className="flex items-center gap-2 mt-1">
    <IndianRupee   className="w-5 h-5 text-gray-400" />
    <p className="text-lg text-gray-900 font-semibold">
 {sizeMin.toLocaleString()} - {sizeMax.toLocaleString()}
    </p>
  </div>
</div>
            
            {/* 4. Rera Id */}
      
   
              <div className="mt-1">
  <p className="text-sm text-gray-500">Check RERA Status</p>

  <div className="flex items-center gap-2 mt-1">
    <FileText   className="w-5 h-5 text-gray-400" />
    <p className="text-lg text-gray-900 font-semibold">
 {reraId}
    </p>
  </div>
</div>
            {/* 5. Area Unit */}
      
            
                          <div className="mt-1">
  <p className="text-sm text-gray-500">Area Unit</p>

  <div className="flex items-center gap-2 mt-1">
    <Square   className="w-5 h-5 text-gray-400" />
    <p className="text-lg text-gray-900 font-semibold">
 {areaUnit}
    </p>
  </div>
</div>

            {/* 6. Project Size */}
          
          
                        <div className="mt-1">
  <p className="text-sm text-gray-500">Project Size</p>

  <div className="flex items-center gap-2 mt-1">
    <Building   className="w-5 h-5 text-gray-400" />
    <p className="text-lg text-gray-900 font-semibold">
{projectSizeDisplay}
    </p>
  </div>
</div>

            {/* 7. Possession Starts */}
         
                     <div className="mt-1">
  <p className="text-sm text-gray-500">Possession Starts</p>

  <div className="flex items-center gap-2 mt-1">
    <Calendar  className="w-5 h-5 text-gray-400" />
    <p className="text-lg text-gray-900 font-semibold">
{possessionDateDisplay}
    </p>
  </div>
</div>
            {/* 8. Project Area */}
          

                   <div className="mt-1">
  <p className="text-sm text-gray-500">Project Area</p>

  <div className="flex items-center gap-2 mt-1">
    <MapPin  className="w-5 h-5 text-gray-400" />
    <p className="text-lg text-gray-900 font-semibold">
{projectAreaDisplay}
    </p>
  </div>
</div>
            {/* 9. Launch Date */}
            
                            <div className="mt-1">
  <p className="text-sm text-gray-500">Launch Date</p>

  <div className="flex items-center gap-2 mt-1">
    <Rocket   className="w-5 h-5 text-gray-400" />
    <p className="text-lg text-gray-900 font-semibold">
{launchDateDisplay}
    </p>
  </div>
</div>
            {/* 10. Configuration */}
            
                       <div className="mt-1">
  <p className="text-sm text-gray-500">Configuration</p>

  <div className="flex items-center gap-2 mt-1">
    <Home   className="w-5 h-5 text-gray-400" />
    <p className="text-lg text-gray-900 font-semibold">
{configurationDisplay}    </p>
  </div>
</div>
  </div>
          {/* Action Buttons */}
          <div className="flex gap-4 mt-10 pt-6 border-t border-gray-200">
            <button style={{background:'#e1def4'}} className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
              <Share2 className="w-5 h-5 text-blue-700" />
              <span  className="text-blue-700 font-medium">Share</span>
            </button>
            <button style={{background:'#e1def4'}} className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
              <Heart className="w-5 h-5 text-blue-700" />
              <span className="text-blue-700 font-medium">Save</span>
            </button>
            <button 
              style={{ background: '#5e40e0' }} 
              className="flex items-center gap-2 px-6 py-3 hover:bg-purple-700 rounded-lg transition ml-auto"
            >
              <HelpCircle className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Ask For Details</span>
            </button>
          </div>
                       <div className="border-t border-gray-200 my-6"></div>
 {/* Description Section */}
           <div className="mt-10 pt-6">
            <h3 className="text-lg font-semibold mb-3">About this property</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
               {property.description}
            </p>          </div>
         <div className="border-t border-gray-200 my-6"></div>

            {/* Nearby Places */}
            {property.places && property.places.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-3">Nearby Places</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {property.places.slice(0, 4).map((place, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{place.place_name}</p>
                        <p className="text-xs text-gray-500">{place.place_category}</p>
                      </div>
                      <p className="text-xs text-blue-600">
                        {(parseFloat(place.distance_meters) / 1000).toFixed(1)} km
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          
        </div>
      </div>
    </div>
  
  );
};

export default PropertyOverview;