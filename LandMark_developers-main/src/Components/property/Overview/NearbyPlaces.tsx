import React from 'react';
import { CityProperty } from '../../../services/services';
import { useTranslation } from '../../../hooks/useTranslation';
import { COLORS } from '../../../styles/colors';
import { getImageUrl } from '../../../services/services';
import './NearbyPlaces.css';

interface NearbyPlacesProps {
  places: CityProperty['places'];
}

const getDynamicCategory = (name: string, originalCategory: string): string => {
  const lowercaseName = name.toLowerCase();
  if (lowercaseName.includes('airport') || lowercaseName.includes('aerodrome')) return 'Airport';
  if (lowercaseName.includes('hospital') || lowercaseName.includes('medical') || lowercaseName.includes('clinic') || lowercaseName.includes('health') || lowercaseName.includes('doctor')) return 'Hospital';
  if (lowercaseName.includes('temple') || lowercaseName.includes('church') || lowercaseName.includes('mosque') || lowercaseName.includes('shrine') || lowercaseName.includes('worship') || lowercaseName.includes('mandir')) return 'Temple';
  if (lowercaseName.includes('highway') || lowercaseName.includes('road') || lowercaseName.includes('bypass') || lowercaseName.includes('expressway') || lowercaseName.includes('flyover') || lowercaseName.includes('crossing') || lowercaseName.includes('nh8') || lowercaseName.includes('nh-8') || lowercaseName.startsWith('nh') || lowercaseName.includes(' nh')) return 'Highway';
  if (lowercaseName.includes('school') || lowercaseName.includes('college') || lowercaseName.includes('university') || lowercaseName.includes('education') || lowercaseName.includes('academy')) return 'Education';
  if (lowercaseName.includes('mall') || lowercaseName.includes('market') || lowercaseName.includes('store') || lowercaseName.includes('shop') || lowercaseName.includes('plaza') || lowercaseName.includes('complex')) return 'Shopping';
  if (lowercaseName.includes('restaurant') || lowercaseName.includes('food') || lowercaseName.includes('dining') || lowercaseName.includes('cafe') || lowercaseName.includes('dhaba') || lowercaseName.includes('hotel')) return 'Dining';
  if (lowercaseName.includes('metro') || lowercaseName.includes('bus') || lowercaseName.includes('station') || lowercaseName.includes('stop') || lowercaseName.includes('railway') || lowercaseName.includes('junction')) return 'Transit';
  if (originalCategory) {
    const orig = originalCategory.toLowerCase();
    if (orig !== 'highway' && orig !== 'place' && orig !== 'unknown' && orig !== '') return originalCategory;
  }
  return 'Place';
};

const NearbyPlaces: React.FC<NearbyPlacesProps> = ({ places }) => {
  const { t } = useTranslation();
  if (!places || places.length === 0) return null;

  return (
    <div className="tab-content-card">
      <div className="section-title">
        <span className="title-underline">{t('property.nearby.aroundThisProject')}</span>
      </div>
      <div className="places-scroll-container">
        {places.map((place, index) => {
          const dynamicCategory = getDynamicCategory(place.place_name, place.place_category);
          const resolvedIcon = place.iconUrl ? getImageUrl(place.iconUrl) : undefined;
          return (
            <div key={index} className="place-card-new">
              <div className="place-card-header">
                <div className="header-left">
                  {resolvedIcon && <img src={resolvedIcon} alt={dynamicCategory} className="w-6 h-6 object-contain mr-2" loading="lazy" />}
                  <span className="place-category-new">{dynamicCategory}</span>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={COLORS.gray[400]} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="places-chevron-svg">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
              <div className="place-card-body">
                <div className="place-info-row">
                  <span className="place-name-new">{place.place_name}</span>
                  <span className="place-distance-tag">
                    {String(place.distance_meters).toLowerCase().includes('km') 
                      ? place.distance_meters 
                      : `${(parseFloat(place.distance_meters) / 1000).toFixed(1)} km`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NearbyPlaces;
