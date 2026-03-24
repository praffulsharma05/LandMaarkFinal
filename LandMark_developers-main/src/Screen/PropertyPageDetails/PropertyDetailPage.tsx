
 import React, { useState } from 'react';
 import { Info } from "lucide-react";

import {
  propertyData,
  tabs,
  pricingCards,
  floorPlans,
  overviewData,
  amenitiesList,
  fittingData ,
wallData, 
floorData
} from '../../store/data/propertyData';
import PropertyHeader from '../../Components/property/PropertyHeader';
import ImageGallery from '../../Components/property/ImageGallery';
import PropertyTabs from '../../Components/property/PropertyTabs';
import FloorPlansPricing from '../../Components/property/FloorPlansPricing';
import PropertyOverview from '../../Components/property/PropertyOverview';
import AmenitiesSpecs from '../../Components/property/AmenitiesSpecs';
import ContactCard from '../../Components/property/ContactCard';
import QASection from '../../Components/property/QASection';
import { useParams } from "react-router-dom";


const PropertyDetailPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  
 
 const { id } = useParams();
console.log(id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 mt-18">
      {/* Header */}
      <PropertyHeader property={propertyData.mainProperty} />

      {/* Image Gallery */}
      <ImageGallery images={propertyData.images} />

      {/* Price Card */}
       <div className="bg-white py-6 px-8 mt-0 shadow-sm mb-6">
  <div className="grid grid-cols-4 text-center divide-x divide-gray-200">

    {/* Configuration */}
    <div>
      <p className="text-lg font-semibold text-gray-900">
        {propertyData.mainProperty.rating} BHK Apartment
      </p>
      <p className="text-gray-500 text-sm mt-1">Configuration</p>
    </div>

    {/* Possession */}
    <div>
      <p className="text-lg font-semibold text-gray-900">
        {propertyData.mainProperty.possession}
      </p>
      <p className="text-gray-500 text-sm mt-1">Possession Starts</p>
    </div>

    {/* Avg Price */}
    <div>
      <p className="text-lg font-semibold text-gray-900">
        ₹{propertyData.mainProperty.price.perSqft}/sq.ft
      </p>
      <p className="text-gray-500 text-sm mt-1">Avg. Price</p>
    </div>

    {/* Sizes */}
    <div>
      <p className="text-lg font-semibold text-gray-900">
        {propertyData.mainProperty.price.max} - {propertyData.mainProperty.price.min} sq.ft
      </p>
    <p className="text-gray-500 text-sm mt-1 flex items-center justify-center gap-1">
  <span>(Super Built-up Area</span>
  <Info size={14} className="text-blue-600" />
  <span>)</span>
</p>
      
    </div>

  </div>
</div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2">
          {/* Tabs Section */}
          <PropertyTabs 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabs={tabs}
            propertyData={propertyData}
          />

          {/* Q&A Section */}
          <QASection />
        </div>

        {/* Right Column - Contact Form & Quick Info */}
        <div className="lg:col-span-1">
          <ContactCard />
        </div>
      </div>

      {/* Floor Plans and Pricing Section */}
      <FloorPlansPricing 
        pricingCards={pricingCards}
        floorPlans={floorPlans}
      />

      {/* Property Overview Section */}
      <PropertyOverview data={overviewData}
           />

      {/* Amenities and Specifications */}
      <AmenitiesSpecs 
        amenities={amenitiesList}
        floorData={floorData}
        fittingData={fittingData}
        wallData={wallData} 
      />
    </div>
  );
};

export default PropertyDetailPage;
 