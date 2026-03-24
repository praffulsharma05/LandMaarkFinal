import { useMemo } from 'react';
import { CityProperty } from '../services/services';

interface OverviewData {
  projectUnits: number | string;
  sizeMin: number;
  sizeMax: number;
  avgPriceDisplay: string;
  reraId: string;
  areaUnit: string;
  projectSizeDisplay: string;
  possessionDateDisplay: string;
  projectAreaDisplay: string;
  launchDateDisplay: string;
  configurationDisplay: string;
}

export const usePropertyOverviewData = (property: CityProperty, pricePerSqft: number): OverviewData => {
  return useMemo(() => {
    // 1. Project Units
    const projectUnits = property.project_units || 77;
    
    // 2. Sizes
    let sizeMin = 0;
    let sizeMax = 0;
    
    if (property.size) {
      const sizeMatch = property.size.match(/(\d+)/);
      if (sizeMatch) {
        const sizeValue = parseInt(sizeMatch[1]);
        sizeMin = sizeValue;
        sizeMax = sizeValue;
      }
    } else if (property.area_sqft) {
      sizeMin = property.area_sqft;
      sizeMax = property.area_sqft ? Math.round(property.area_sqft * 1.3) : 160;
    } else {
      sizeMin = 123;
      sizeMax = 160;
    }
    
    // 3. Avg. Price
    const avgPriceDisplay = property.avg_price || `₹${pricePerSqft.toLocaleString()}`;
    
    // 4. RERA ID
    const reraId = property.rera_id || 'Application Submitted';
    
    // 5. Area Unit
    const areaUnit = 'sq.ft.';
    
    // 6. Project Size
    const projectSizeDisplay = property.project_size 
      ? `${property.project_size} Buildings`
      : `${Math.ceil(Number(projectUnits) / 8)} Buildings`;
    
    // 7. Possession Starts
    let possessionDateDisplay = '';
    if (property.possession_date) {
      const date = new Date(property.possession_date);
      possessionDateDisplay = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } else if (property.construction_status === 'Ready to Move') {
      possessionDateDisplay = 'Ready to Move';
    } else {
      possessionDateDisplay = 'Dec, 2025';
    }
    
    // 8. Project Area
    let projectAreaDisplay = '';
    if (property.project_area) {
      projectAreaDisplay = property.project_area.includes('acre') 
        ? property.project_area 
        : `${property.project_area} Acres`;
    } else {
      projectAreaDisplay = `${((sizeMin * Number(projectUnits)) / 43560).toFixed(2)} Acres`;
    }
    
    // 9. Launch Date
    let launchDateDisplay = '';
    if (property.launch_date) {
      const date = new Date(property.launch_date);
      launchDateDisplay = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } else if (property.created_at) {
      const date = new Date(property.created_at);
      launchDateDisplay = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } else {
      launchDateDisplay = 'Nov, 2024';
    }
    
    // 10. Configuration
    const configurationDisplay = property.configuration || `${property.bhk} BHK ${property.propertyType || 'Apartment'}`;
    
    return {
      projectUnits,
      sizeMin,
      sizeMax,
      avgPriceDisplay,
      reraId,
      areaUnit,
      projectSizeDisplay,
      possessionDateDisplay,
      projectAreaDisplay,
      launchDateDisplay,
      configurationDisplay,
    };
  }, [property, pricePerSqft]);
};