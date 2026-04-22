
import React from 'react';
import { CityProperty } from '../../services/services';
import OverviewItem from './Overview/OverviewItem';
import ActionButtons from './Overview/ActionButtons';
import NearbyPlaces from './Overview/NearbyPlaces';
import DescriptionSection from './Overview/DescriptionSection';

interface PropertyOverviewProps {
  property: CityProperty;
  pricePerSqft: number;
}

const PropertyOverview: React.FC<PropertyOverviewProps> = ({ property, pricePerSqft }) => {
  console.log('Rendering PropertyOverview with property:', property);
  // Display key property fields as overview items
  const overviewItems = [
    { label: 'Longitude', value: property.longitude || 'N/A' },
    { label: 'Latitude', value: property.latitude || 'N/A' },
    { label: 'BHK', value: property.bhk || 'N/A' },
    { label: 'Property Type', value: property.propertyType || property.property_type || 'N/A' },
    { label: 'Construction Status', value: property.construction_status || 'N/A' },
    { label: 'Construction Type', value: property.construction_type || 'N/A' },
    { label: 'Area (sq.ft)', value: property.area_sqft || 'N/A' },
    { label: 'Size', value: property.size || 'N/A' },
    { label: 'Project Size', value: property.project_size || 'N/A' },
    { label: 'Launch Date', value: property.launch_date ? new Date(property.launch_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A' },
    { label: 'RERA ID', value: property.rera_id || 'N/A' },
  ];

  const handleShare = () => console.log('Share clicked');
  const handleSave = () => console.log('Save clicked');
  const handleAskDetails = () => console.log('Ask for details clicked');

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 -mt-10">
        <div className="lg:col-span-2 bg-white p-8 shadow-sm">
          <h2 className="text-3xl text-left w-7/13 left-0 border-b w-full border-gray-400 font-bold mb-8">
            {property.title} Overview
          </h2>
          
          {/* Overview Items Grid */}
          <div className="mb-10">
            {overviewItems && overviewItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 text-left">
                {overviewItems.map((item, index) => (
                  <OverviewItem
                    key={index}
                    label={item.label}
                    value={String(item.value)}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No overview information available</p>
            )}
          </div>

          {/* Action Buttons */}
          
          <ActionButtons    
            onShare={handleShare}
            onSave={handleSave}
            onAskDetails={handleAskDetails}
          />

          {/* Description Section */}
          <DescriptionSection description={property.description} />

          {/* Nearby Places */}
          <NearbyPlaces places={property.places} />
        </div>
      </div>
    </div>
  );
};

export default PropertyOverview;