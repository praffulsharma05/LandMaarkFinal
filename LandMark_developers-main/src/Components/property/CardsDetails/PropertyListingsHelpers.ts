export interface KeyValue {
  key: string;
  value: unknown;
}

export interface Property {
  sno: number;
  id: string;
  plotNo: string;
  size: string;
  sizeRaw: number;
  type: string;
  price: number;
  priceRaw: number;
  description: string;
  location: string;
  bhk: string;
  rawKeyValues: KeyValue[];
}

export interface ApiResponse {
  success: boolean;
  data: Record<string, unknown>;
}

export interface ApiProperty {
  property_id: number;
  plot_number: string;
  price: string;
  property_type?: string;
  description?: string;
  location?: string;
  key_values?: KeyValue[];
}

export interface Filters {
  subTownship: string;
  projectArea: string;
  configuration: string;
  status: string;
  sortBy: string;
}

export const formatValue = (value: unknown): string => {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
  if (Array.isArray(value)) {
    if (value.length === 0) return '';
    if (typeof value[0] === 'object' && value[0] !== null) {
      return value.map(item => {
        const parts: string[] = [];
        if (item.name) parts.push(item.name);
        if (item.distance) parts.push(item.distance);
        return parts.join(', ');
      }).join(' | ');
    }
    return value.join(', ');
  }
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

export const extractBhk = (type: string): string => {
  const match = type.match(/(\d+)\s*BHK/i);
  return match ? match[1] : '';
};

export const normalizeData = (data: Record<string, unknown>): Record<string, unknown> => {
  if (!data || typeof data !== 'object') return data as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(data)) {
    if (v && typeof v === 'object' && 'value' in (v as Record<string, unknown>) && !Array.isArray(v)) {
      out[k] = (v as Record<string, unknown>).value;
    } else {
      out[k] = v;
    }
  }
  return out;
};

export const filterData = (plotData: Property[], filters: Filters): Property[] => {
  let filtered = [...plotData];
  if (filters.subTownship) {
    filtered = filtered.filter(p => {
      const kv = p.rawKeyValues?.reduce((acc: Record<string, unknown>, item: KeyValue) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, unknown>) || {};
      return String(kv['Sub Township'] || '').toLowerCase() === filters.subTownship.toLowerCase();
    });
  }
  if (filters.projectArea) {
    filtered = filtered.filter(p => {
      const kv = p.rawKeyValues?.reduce((acc: Record<string, unknown>, item: KeyValue) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, unknown>) || {};
      return String(kv['Project Area'] || '').toLowerCase() === filters.projectArea.toLowerCase();
    });
  }
  if (filters.configuration) {
    filtered = filtered.filter(p => {
      const kv = p.rawKeyValues?.reduce((acc: Record<string, unknown>, item: KeyValue) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, unknown>) || {};
      return String(kv['Configuration'] || '').toLowerCase() === filters.configuration.toLowerCase();
    });
  }
  if (filters.status) {
    filtered = filtered.filter(p => {
      const kv = p.rawKeyValues?.reduce((acc: Record<string, unknown>, item: KeyValue) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, unknown>) || {};
      return String(kv['Construction Status'] || '').toLowerCase() === filters.status.toLowerCase();
    });
  }
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'size-asc':
        filtered.sort((a, b) => {
          const aSize = parseFloat(String(a.size).replace(/[^0-9.]/g, '')) || 0;
          const bSize = parseFloat(String(b.size).replace(/[^0-9.]/g, '')) || 0;
          return aSize - bSize;
        });
        break;
      case 'size-desc':
        filtered.sort((a, b) => {
          const aSize = parseFloat(String(a.size).replace(/[^0-9.]/g, '')) || 0;
          const bSize = parseFloat(String(b.size).replace(/[^0-9.]/g, '')) || 0;
          return bSize - aSize;
        });
        break;
    }
  }
  return filtered;
};
