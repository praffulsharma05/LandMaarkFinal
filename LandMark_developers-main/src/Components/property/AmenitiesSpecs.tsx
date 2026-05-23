import React from 'react';
import { CityProperty, getImageUrl } from '../../services/services';
import OverviewItem from './Overview/OverviewItem';
import { useTranslation } from '../../hooks/useTranslation';
import { getGroupedSpecifications } from './AmenitiesSpecsHelper';
import './AmenitiesSpecs.css';

interface AmenitiesSpecsProps {
  property: CityProperty;
}

const AmenitiesSpecs: React.FC<AmenitiesSpecsProps> = ({ property }) => {
  const { t } = useTranslation();

  const groupedSpecifications = getGroupedSpecifications(property.specifications);

  const hasAmenities = property.amenities && property.amenities.length > 0;
  const hasSpecifications = Object.keys(groupedSpecifications).length > 0 &&
    Object.values(groupedSpecifications).some(arr => arr.length > 0);

  if (!hasAmenities && !hasSpecifications) return null;

  return (
    <div className="amenities-specs-wrapper">
      <div className="amenities-specs-container">
        <div id="amenities-section" className="amenities-main-grid">
          {hasAmenities && (
            <div className="tab-content-card">
              <div className="section-title">
                <span className="title-underline">
                  {t('property.topAmenities')}
                </span>
              </div>
              <div className="amenities-list-wrapper">
                <div className="items-grid">
                  {property.amenities.slice(0, 8).map((item, i) => (
                    <OverviewItem
                      key={i}
                      label={item.amenity_name}
                      value=""
                      imageSrc={item.iconUrl ? getImageUrl(item.iconUrl) : undefined}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {hasSpecifications && (
            <div className="tab-content-card" id="specifications-section">
              <div className="section-title">
                <span className="title-underline">
                  {t('property.specifications')}
                </span>
              </div>
              <div className="specifications-categories-wrapper">
                {Object.entries(groupedSpecifications).map(([category, specs], idx) => {
                  if (specs.length === 0) return null;
                  return (
                    <div key={idx} className="specification-category-group">
                      {category !== 'General' && (
                        <div className="specification-category-title">
                          {category}
                        </div>
                      )}
                      <div className="items-grid py-4">
                        {specs.map((item, i) => (
                          <OverviewItem
                            key={i}
                            label={item.label.replace(/_/g, ' ')}
                            value={item.value}
                            imageSrc={item.iconUrl ? getImageUrl(item.iconUrl) : undefined}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AmenitiesSpecs;