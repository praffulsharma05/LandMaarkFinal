import React, { useCallback } from 'react';
import { 
  Phone,
  Check
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';
import './PropertyHeader.css';

interface PropertyHeaderProps {
  property: {
    name?: string;
    builder?: string;
    location?: string;
    type?: string;
    area?: string;
    rating?: number;
    bhk?: string;
    possession?: string;
    rera_id?: string;
    price?: {
      min?: number;
      max?: number;
      perSqft?: number;
      emi?: number;
      display?: string;
    };
  };
}

const PropertyHeader: React.FC<PropertyHeaderProps> = ({ property }) => {
  const { t } = useTranslation();
  const propertyName = property?.name || t('property.header.property');
  const builder = property?.builder || '';
  const location = property?.location || t('property.header.locationNotSpecified');
  const reraId = property?.rera_id || '';
  
  const priceMin = property?.price?.min || 0;
  const priceMax = property?.price?.max || 0;
  const emi = property?.price?.emi || 0;

  const formatPrice = (price: number) => {
    if (price === 0) return '';
    if (price >= 10000) {
      if (price >= 10000000) {
        return `₹${(price / 10000000).toFixed(2)} Cr`;
      } else if (price >= 100000) {
        return `₹${(price / 100000).toFixed(2)} L`;
      }
      return `₹${price.toLocaleString()}`;
    }
    return `₹${price.toLocaleString()} L`;
  };

  const priceDisplay = () => {
    if (property?.price?.display) return property.price.display;
    if (priceMin === 0 && priceMax === 0) return t('property.header.contactForPrice');
    if (priceMin === priceMax || priceMax === 0) return formatPrice(priceMin);
    return `${formatPrice(priceMin)} - ${formatPrice(priceMax)}`;
  };

  const handleContactClick = useCallback(() => {
    console.warn('Contact button clicked');
  }, []);

  return (
    <div className="ph-container">
      <div className="ph-left">
        <div className="ph-title-row">
          <h1 className="ph-title">{propertyName}</h1>
          {reraId && (
            <span className="ph-rera-inline">
              <Check size={12} strokeWidth={3} className="ph-rera-check" />
              {t('property.header.rera')}
            </span>
          )}
        </div>

        {builder && builder.toLowerCase() !== 'developer' && (
          <p className="ph-builder">{t('property.header.by')} <span className="ph-builder-link">{builder.toUpperCase()}</span></p>
        )}

        <p className="ph-location">{location}</p>
      </div>

      <div className="ph-right">
        <p className="ph-price">{priceDisplay()}</p>
        
        {emi > 0 && (
          <p className="ph-emi">{t('property.header.emiStartsAt')} ₹{emi.toLocaleString()} {t('property.header.emiUnit')}</p>
        )}

        <p className="ph-price-type">{t('property.header.basicPrice')}</p>

        <button
          className="ph-contact-btn"
          onClick={handleContactClick}
        >
          <Phone size={16} />
          {t('property.header.contactDeveloper')}
        </button>
      </div>
    </div>
  );
};

export default PropertyHeader;