
import React from 'react';
import { MapPin, Calendar, Building2, Grid, Hash, Ruler, TrendingUp, Layers, Home, BarChart3 } from 'lucide-react';
import { CityProperty } from '../../services/services';
import OverviewItem from './Overview/OverviewItem';
import ActionButtons from './Overview/ActionButtons';
import { useTranslation } from '../../hooks/useTranslation';
import './PropertyOverview.css';

interface PropertyOverviewProps {
  property: CityProperty;
  pricePerSqft: number;
  townshipName?: string;
  townshipData?: Record<string, unknown>;
}

const PropertyOverview: React.FC<PropertyOverviewProps> = ({ property, pricePerSqft, townshipName, townshipData }) => {
  const { t } = useTranslation();
  const td = townshipData || {};

  const overviewItems = [
    { label: 'Area Unit', value: td.area_unit || property.area_unit || 'N/A', icon: Ruler },
    { label: 'Avg. Price', value: td.avg_price || property.avg_price || (pricePerSqft > 0 ? `₹${pricePerSqft.toLocaleString()}/sq.ft` : 'N/A'), icon: TrendingUp },
    { label: 'Configurations', value: td.configurations || property.configurations || property.propertyType || 'N/A', icon: Home },
    { label: 'Launch Date', value: td.launch_date ? new Date(td.launch_date as string).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : (property.launch_date ? new Date(property.launch_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'N/A'), icon: Calendar },
    { label: 'Possession Starts', value: td.possession_starts || property.possession_starts || property.construction_status || 'N/A', icon: Building2 },
    { label: 'Project Area', value: td.project_area || property.project_area || property.project_size || 'N/A', icon: Grid },
    { label: 'Land Area', value: td.land_area || property.land_area || 'N/A', icon: Ruler },
    { label: 'Property Count', value: td.property_count || property.property_count || 'N/A', icon: BarChart3 },
    { label: 'Total Units', value: td.total_units || property.total_units || 'N/A', icon: Grid },
    { label: 'RERA ID', value: td.rera_id || property.rera_id || 'N/A', icon: Hash },
    { label: 'Sizes', value: td.sizes || property.sizes || property.size || 'N/A', icon: Layers },
    { label: 'City', value: td.city || property.location?.split(',').pop()?.trim() || 'N/A', icon: MapPin },
  ];

  const handleShare = () => console.warn('Share clicked');
  const handleSave = () => console.warn('Save clicked');
  const handleAskDetails = () => console.warn('Ask for details clicked');

  const displayName = townshipName || property.title || 'Township';

  const validOverviewItems = overviewItems.filter(item => item.value && item.value !== 'N/A' && item.value !== 'undefined');

  if (!validOverviewItems || validOverviewItems.length === 0) {
    return null;
  }

  return (
    <div className="tab-content-card">
      <div className="section-title">
        <span className="title-underline">
          {displayName} {t('property.overview.overview')}
        </span>
      </div>

      <div className="mb-4">
        <div className="items-grid">
          {validOverviewItems.map((item, index) => (
            <OverviewItem
              key={index}
              label={item.label}
              value={String(item.value)}
              icon={item.icon}
            />
          ))}
        </div>
      </div>

      <ActionButtons
        onShare={handleShare}
        onSave={handleSave}
        onAskDetails={handleAskDetails}
      />
    </div>
  );
};

export default PropertyOverview;