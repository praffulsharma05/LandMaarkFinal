import React from 'react';
import {
  Building2,
  ShoppingBag,
  Utensils,
  School,
  MapPin,
  Bus,
  Plane,
  Route,
  Waves,
  Dumbbell,
  Trees,
  Shield,
  Zap,
  ParkingCircle,
  Home,
  Landmark,
  Pill,
  Coffee,
  Train,
  Wind,
  Hospital,
  Map,
  Milestone,
  ChevronRight,
} from 'lucide-react';
import { CityProperty } from '../../../services/services';
import { useTranslation } from '../../../hooks/useTranslation';
import { COLORS } from '../../../styles/colors';
import './NearbyPlaces.css';

interface IconConfig {
  icon: React.ElementType;
  color: string;
  bg: string;
}

const getCategoryIcon = (category: string): IconConfig => {
  const cat = category.toLowerCase();

  if (cat.includes('hospital') || cat.includes('medical') || cat.includes('clinic'))
    return { icon: Hospital, color: COLORS.error.DEFAULT, bg: COLORS.error.light };

  if (cat.includes('school') || cat.includes('college') || cat.includes('education') || cat.includes('university'))
    return { icon: School, color: COLORS.info.DEFAULT, bg: COLORS.info.light };

  if (cat.includes('mall') || cat.includes('shop') || cat.includes('market') || cat.includes('store'))
    return { icon: ShoppingBag, color: COLORS.purple[500], bg: COLORS.purple[50] };

  if (cat.includes('restaurant') || cat.includes('food') || cat.includes('dining'))
    return { icon: Utensils, color: COLORS.warning.DEFAULT, bg: COLORS.amber[50] };

  if (cat.includes('cafe') || cat.includes('coffee'))
    return { icon: Coffee, color: COLORS.warning.dark, bg: COLORS.orange[50] };

  if (cat.includes('highway') || cat.includes('road') || cat.includes('expressway') || cat.includes('flyover'))
    return { icon: Milestone, color: COLORS.gray[600], bg: COLORS.gray[100] };

  if (cat.includes('bus') || cat.includes('metro') || cat.includes('station') || cat.includes('stop'))
    return { icon: Bus, color: COLORS.success.DEFAULT, bg: COLORS.success.light };

  if (cat.includes('train') || cat.includes('railway'))
    return { icon: Train, color: COLORS.success.dark, bg: COLORS.success.light };

  if (cat.includes('airport') || cat.includes('flight'))
    return { icon: Plane, color: COLORS.indigo[500], bg: COLORS.indigo[50] };

  if (cat.includes('bank') || cat.includes('atm'))
    return { icon: Landmark, color: COLORS.info.dark, bg: COLORS.blue[100] };

  if (cat.includes('pharmacy') || cat.includes('medicine'))
    return { icon: Pill, color: COLORS.pink[600], bg: COLORS.pink[100] };

  if (cat.includes('temple') || cat.includes('worship') || cat.includes('church') || cat.includes('mosque'))
    return { icon: Landmark, color: COLORS.amber[600], bg: COLORS.amber[100] };

  if (cat.includes('place') || cat.includes('landmark') || cat.includes('location'))
    return { icon: MapPin, color: COLORS.sky[500], bg: COLORS.sky[50] };

  if (cat.includes('gym') || cat.includes('fitness') || cat.includes('workout'))
    return { icon: Dumbbell, color: COLORS.orange[500], bg: COLORS.orange[50] };

  if (cat.includes('pool') || cat.includes('swim') || cat.includes('water'))
    return { icon: Waves, color: COLORS.sky[500], bg: COLORS.sky[50] };

  if (cat.includes('park') || cat.includes('garden') || cat.includes('green') || cat.includes('trees'))
    return { icon: Trees, color: COLORS.green[500], bg: COLORS.green[50] };

  if (cat.includes('security') || cat.includes('guard'))
    return { icon: Shield, color: COLORS.gray[500], bg: COLORS.gray[100] };

  if (cat.includes('power') || cat.includes('electricity') || cat.includes('backup'))
    return { icon: Zap, color: COLORS.yellow[500], bg: COLORS.yellow[50] };

  if (cat.includes('parking') || cat.includes('car'))
    return { icon: ParkingCircle, color: COLORS.gray[700], bg: COLORS.gray[100] };

  if (cat.includes('club') || cat.includes('community'))
    return { icon: Building2, color: COLORS.indigo[500], bg: COLORS.indigo[50] };

  if (cat.includes('kitchen') || cat.includes('modular'))
    return { icon: Home, color: COLORS.orange[500], bg: COLORS.orange[50] };

  if (cat.includes('balcony') || cat.includes('terrace'))
    return { icon: Home, color: COLORS.purple[500], bg: COLORS.purple[50] };

  if (cat.includes('bathroom') || cat.includes('washroom') || cat.includes('toilet'))
    return { icon: Waves, color: COLORS.sky[500], bg: COLORS.sky[50] };

  if (cat.includes('lift') || cat.includes('elevator') || cat.includes('stairs'))
    return { icon: Route, color: COLORS.gray[600], bg: COLORS.gray[100] };

  if (cat.includes('surveillance') || cat.includes('cctv') || cat.includes('camera'))
    return { icon: Shield, color: COLORS.error.DEFAULT, bg: COLORS.error.light };

  if (cat.includes('play area') || cat.includes('kids') || cat.includes('park'))
    return { icon: Trees, color: COLORS.green[500], bg: COLORS.green[50] };

  if (cat.includes('ventilation') || cat.includes('air'))
    return { icon: Wind, color: COLORS.cyan[500], bg: COLORS.cyan[50] };

  return { icon: Map, color: COLORS.gray[400], bg: COLORS.gray[50] };
};

interface NearbyPlacesProps {
  places: CityProperty['places'];
}

// Dynamically determine the category based on place name keywords
const getDynamicCategory = (name: string, originalCategory: string): string => {
  const lowercaseName = name.toLowerCase();
  
  if (lowercaseName.includes('airport') || lowercaseName.includes('aerodrome')) {
    return 'Airport';
  }
  if (lowercaseName.includes('hospital') || lowercaseName.includes('medical') || lowercaseName.includes('clinic') || lowercaseName.includes('health') || lowercaseName.includes('doctor')) {
    return 'Hospital';
  }
  if (lowercaseName.includes('temple') || lowercaseName.includes('church') || lowercaseName.includes('mosque') || lowercaseName.includes('shrine') || lowercaseName.includes('worship') || lowercaseName.includes('mandir')) {
    return 'Temple';
  }
  if (lowercaseName.includes('highway') || lowercaseName.includes('road') || lowercaseName.includes('bypass') || lowercaseName.includes('expressway') || lowercaseName.includes('flyover') || lowercaseName.includes('crossing') || lowercaseName.includes('nh8') || lowercaseName.includes('nh-8') || lowercaseName.startsWith('nh') || lowercaseName.includes(' nh')) {
    return 'Highway';
  }
  if (lowercaseName.includes('school') || lowercaseName.includes('college') || lowercaseName.includes('university') || lowercaseName.includes('education') || lowercaseName.includes('academy')) {
    return 'Education';
  }
  if (lowercaseName.includes('mall') || lowercaseName.includes('market') || lowercaseName.includes('store') || lowercaseName.includes('shop') || lowercaseName.includes('plaza') || lowercaseName.includes('complex')) {
    return 'Shopping';
  }
  if (lowercaseName.includes('restaurant') || lowercaseName.includes('food') || lowercaseName.includes('dining') || lowercaseName.includes('cafe') || lowercaseName.includes('dhaba') || lowercaseName.includes('hotel')) {
    return 'Dining';
  }
  if (lowercaseName.includes('metro') || lowercaseName.includes('bus') || lowercaseName.includes('station') || lowercaseName.includes('stop') || lowercaseName.includes('railway') || lowercaseName.includes('junction')) {
    return 'Transit';
  }
  
  // Fallback to the original category from API, or 'Place' if generic
  if (originalCategory) {
    const orig = originalCategory.toLowerCase();
    if (orig !== 'highway' && orig !== 'place' && orig !== 'unknown' && orig !== '') {
      return originalCategory;
    }
  }
  
  return 'Place';
};

const NearbyPlaces: React.FC<NearbyPlacesProps> = ({ places }) => {
  const { t } = useTranslation();
  if (!places || places.length === 0) return null;

  return (
    <div className="places-container">
      <div className="section-title">
        <span className="title-underline">
          {t('property.nearby.aroundThisProject')}
        </span>
      </div>
      <div className="places-scroll-container">
        {places.map((place, index) => {
          const dynamicCategory = getDynamicCategory(place.place_name, place.place_category);
          const { icon: Icon, color } = getCategoryIcon(dynamicCategory);
          return (
            <div key={index} className="place-card-new">
              <div className="place-card-header">
                <div className="header-left">
                  <Icon size={24} color={color} className="category-icon-new" />
                  <span className="place-category-new">{dynamicCategory}</span>
                </div>
                <ChevronRight size={14} color={COLORS.gray[400]} />
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
