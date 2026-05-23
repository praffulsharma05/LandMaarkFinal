import React, { useEffect, useRef, useCallback } from 'react';
import { TrendingDown } from 'lucide-react';
import { CityProperty } from '../../services/services';
import { useTranslation } from '../../hooks/useTranslation';
import './PropertyTabs.css';

interface PropertyTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: Array<{ id: string; label: string }>;
  property: CityProperty;
  pricePerSqft: number;
}

const PropertyTabs: React.FC<PropertyTabsProps> = ({ activeTab, setActiveTab, tabs, property, pricePerSqft }) => {
  const { t } = useTranslation();
  const navRef = useRef<HTMLDivElement>(null);
  const handleTabClick = useCallback((tabId: string) => {
    if (tabId === 'amenities' || tabId === 'specs') {
      const targetId = tabId === 'amenities' ? 'amenities-section' : 'specifications-section';
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 100;
        window.scrollTo({ top: element.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
      }
    }
    setActiveTab(tabId);
  }, [setActiveTab]);

  const handleTabClickWithId = useCallback((tabId: string) => () => handleTabClick(tabId), [handleTabClick]);

  useEffect(() => {
    if (activeTab !== 'overview' && activeTab !== 'amenities' && activeTab !== 'specs' && navRef.current) {
      setTimeout(() => {
        const offset = 100;
        window.scrollTo({ top: navRef.current!.getBoundingClientRect().top + window.pageYOffset - offset, behavior: 'smooth' });
      }, 100);
    }
  }, [activeTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'locality':
        return (
          <>
            <div className="flex justify-between items-start mb-4">
              <h1 className="section-title"><span className="title-underline">{property.location} {t('property.tabs.locality')}</span></h1>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-800">{property.places?.length || 0}</p>
                <p className="text-sm text-gray-600">{t('property.tabs.places')}</p>
              </div>
            </div>
            {property.places && property.places.length > 0 && (
              <div className="mb-6">
                <h2 className="font-semibold mb-3">{t('property.tabs.nearbyPlaces')}</h2>
                <div className="space-y-2">
                  {property.places.slice(0, 5).map((place, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <span className="text-gray-700">{place.place_name}</span>
                      <span className="text-sm text-blue-600">
                        {String(place.distance_meters).toLowerCase().includes('km') ? place.distance_meters : `${(parseFloat(place.distance_meters) / 1000).toFixed(1)} km`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        );
      case 'pricing':
        return (
          <>
            <h1 className="section-title"><span className="title-underline">{t('property.tabs.priceTrends')}</span></h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingDown className="w-5 h-5 text-red-600 mr-2" /><span className="text-red-600 font-semibold">2.5%</span>
                </div>
                <p className="text-sm text-gray-600">{t('property.tabs.depreciation')} {property.title}</p>
                <p className="text-xs text-gray-500 mt-2">{t('property.tabs.last1Year')}</p>
                <p className="text-lg font-bold mt-2">₹{pricePerSqft.toLocaleString()}{t('property.tabs.sqFt')}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingDown className="w-5 h-5 text-red-600 mr-2" /><span className="text-red-600 font-semibold">3.2%</span>
                </div>
                <p className="text-sm text-gray-600">{t('property.tabs.depreciation')} {property.location}</p>
                <p className="text-xs text-gray-500 mt-2">{t('property.tabs.last1Year')}</p>
                <p className="text-lg font-bold mt-2">₹{Math.round(pricePerSqft * 0.95).toLocaleString()}{t('property.tabs.sqFt')}</p>
              </div>
            </div>
            <div className="border-t pt-6">
              <h2 className="font-semibold mb-4">{t('property.tabs.priceDetails')}</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">{t('property.tabs.basePrice')}</span><span className="font-semibold">{property.price}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">{t('property.tabs.pricePerSqft')}</span><span className="font-semibold">₹{pricePerSqft.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">{t('property.tabs.totalArea')}</span><span className="font-semibold">{property.area_sqft?.toLocaleString()} {t('property.tabs.sqFt')}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600">{t('property.tabs.estimatedEMI')}</span><span className="font-semibold text-blue-600">₹{(property.raw_price! / 200).toLocaleString()}{t('property.tabs.perMonth')}</span>
                </div>
              </div>
            </div>
          </>
        );
      case 'floorplans':
        return (
          <>
            <h1 className="section-title"><span className="title-underline">{t('property.tabs.floorPlans')}</span></h1>
            <div className="text-center p-8 bg-gray-100 rounded-lg">
              <p className="text-gray-500">{t('property.tabs.floorPlansComing')} {property.bhk} {t('property.tabs.bhkConfiguration')}</p>
              <p className="text-sm text-gray-400 mt-2">{t('property.tabs.contactForFloorPlans')}</p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div ref={navRef} className="tabs-nav-container">
        <nav className="tabs-nav">
          {tabs.map(tab => (
            <button key={tab.id} onClick={handleTabClickWithId(tab.id)} className={`tab-button ${activeTab === tab.id ? 'tab-button-active' : ''}`}>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      {activeTab !== 'overview' && activeTab !== 'amenities' && activeTab !== 'specs' && (
        <div className="tab-content-card">{renderTabContent()}</div>
      )}
    </div>
  );
};

export default PropertyTabs;