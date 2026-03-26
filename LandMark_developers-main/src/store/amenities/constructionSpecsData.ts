// Construction specifications data
export interface ConstructionSpec {
  label: string;
  value: string;
}

export interface ConstructionSection {
  id: string;
  title: string;
  icon?: string;
  data: ConstructionSpec[];
}

// Individual data arrays
export const floorData: ConstructionSpec[] = [
  { label: 'Flooring', value: 'Vitrified tiles in living, wooden flooring in bedrooms' },
  { label: 'Countertops', value: 'Granite kitchen countertop' },
];

export const fittingData: ConstructionSpec[] = [
  { label: 'Bathroom Fittings', value: 'Premium brand fittings' },
  { label: 'Kitchen Fittings', value: 'Stainless steel sink with drainboard' },
];

export const wallData: ConstructionSpec[] = [
  { label: 'Wall Finish', value: 'Premium emulsion paint' },
  { label: 'Ceiling', value: 'POP false ceiling in living room' },
];

// Combined data with section metadata
export const constructionSections: ConstructionSection[] = [
  {
    id: 'floor',
    title: 'Floor & Counter',
    icon: 'Grid',
    data: floorData
  },
  {
    id: 'fitting',
    title: 'Fitting',
    icon: 'Wrench',
    data: fittingData
  },
  {
    id: 'wall',
    title: 'Wall & Ceiling',
    icon: 'Building2',
    data: wallData
  }
];

// Default export for convenience
export default {
  floorData,
  fittingData,
  wallData,
  constructionSections
};