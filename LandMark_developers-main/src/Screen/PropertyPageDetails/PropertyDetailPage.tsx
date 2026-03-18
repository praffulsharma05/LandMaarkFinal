
 import React, { useState } from 'react';
import {
  propertyData,
  tabs,
  pricingCards,
  floorPlans,
  overviewData,
  amenitiesList,
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

const PropertyDetailPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  

    

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 mt-18">
      {/* Header */}
      <PropertyHeader property={propertyData.mainProperty} />

      {/* Image Gallery */}
      <ImageGallery images={propertyData.images} />

      {/* Price Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-3xl font-bold text-gray-900">
              ₹{propertyData.mainProperty.price.min} L - ₹{propertyData.mainProperty.price.max} L
            </p>
            <p className="text-gray-600 mt-1">₹{propertyData.mainProperty.price.perSqft}/sq.ft</p>
            <p className="text-sm text-gray-500 mt-2">EMI starts at ₹{propertyData.mainProperty.price.emi}K</p>
            <p className="text-xs text-gray-400 mt-1">*Price excludes maintenance, floor rise etc...</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Contact Sellers
          </button>
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
      <PropertyOverview data={overviewData} />

      {/* Amenities and Specifications */}
      <AmenitiesSpecs 
        amenities={amenitiesList}
        floorData={floorData}
      />
    </div>
  );
};

export default PropertyDetailPage;