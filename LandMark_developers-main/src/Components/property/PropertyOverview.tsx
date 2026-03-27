
import React from 'react';
import { 
  Building2, Ruler, IndianRupee, FileText, Square, 
  Building, Calendar, MapPin, Rocket, Home 
} from 'lucide-react';
import { CityProperty } from '../../services/services';
import OverviewItem from './Overview/OverviewItem';
import ActionButtons from './Overview/ActionButtons';
import NearbyPlaces from './Overview/NearbyPlaces';
import DescriptionSection from './Overview/DescriptionSection';
import { usePropertyOverviewData } from '../../Hooks/usePropertyOverviewData';

interface PropertyOverviewProps {
  property: CityProperty;
  pricePerSqft: number;
}

const PropertyOverview: React.FC<PropertyOverviewProps> = ({ property, pricePerSqft }) => {
  const data = usePropertyOverviewData(property, pricePerSqft);

  // Define all overview items in a single array
  const overviewItems = [
    { label: 'Property Units', value: data.projectUnits, icon: Building2 },
    { label: 'Sizes', value: `${data.sizeMin.toLocaleString()} - ${data.sizeMax.toLocaleString()}`, icon: Ruler, subText: 'sq.ft.' },
    { label: 'Avg. Price', value: data.avgPriceDisplay, icon: IndianRupee, subText: '/sq.ft' },
    { label: 'Check RERA Status', value: data.reraId, icon: FileText },
    { label: 'Area Unit', value: data.areaUnit, icon: Square },
    { label: 'Project Size', value: data.projectSizeDisplay, icon: Building, subText: `- ${data.projectUnits} units` },
    { label: 'Possession Starts', value: data.possessionDateDisplay, icon: Calendar },
    { label: 'Project Area', value: data.projectAreaDisplay, icon: MapPin },
    { label: 'Launch Date', value: data.launchDateDisplay, icon: Rocket },
    { label: 'Configuration', value: data.configurationDisplay, icon: Home },
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
          <div className="grid grid-cols-3 text-left gap-5 mb-10">
            {overviewItems.map((item, index) => (
              <OverviewItem
                key={index}
                label={item.label}
                value={item.value}
                icon={item.icon}
                subText={item.subText}
              />
            ))}
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