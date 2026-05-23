import React, { useState, useEffect, useCallback } from 'react';
import './PropertyListings.css';
import { ApiConstants } from '../../../constants/ApiConstants';
import { ApiEndPoints } from '../../../constants/ApiEndpoints';
import { useTranslation } from '../../../hooks/useTranslation';
import { Property, ApiProperty, ApiResponse } from './PropertyListingsHelpers';
import { normalizeData } from './PropertyListingsHelpers';
import PropertyListingsTable from './PropertyListingsTable';

interface PropertyListingsProps {
  initialData?: unknown[];
  townshipId?: string | number;
  townshipName?: string;
  pdf?: string[];
}

const PropertyListings: React.FC<PropertyListingsProps> = ({ initialData, townshipId, townshipName: initialTownshipName, pdf }) => {
  const { t } = useTranslation();
  const [plotData, setPlotData] = useState<Property[]>([]);
  const [filteredData, setFilteredData] = useState<Property[]>([]);
  const [uiState, setUiState] = useState<{ loading: boolean; error: string | null; expandedIndices: Set<number> }>({ loading: true, error: null, expandedIndices: new Set() });
  const [townshipName, setTownshipName] = useState<string>(initialTownshipName || '');
  const [pdfState, setPdfState] = useState<{ data: { name: string; url: string; file_path?: string }[]; thumbnails: { [key: string]: string } }>({ data: [], thumbnails: {} });
  const currentTownshipId = townshipId || localStorage.getItem('selectedTownshipId') || 17;
  const API_URL = ApiConstants.API_BASE_URL + ApiEndPoints.TOWNSHIP_PROPERTIES_FULL(Number(currentTownshipId));

  const processApiData = (data: ApiProperty[]) => {
    const properties: Property[] = data.map((p, index) => {
      const kv = (p.key_values?.reduce((acc: Record<string, unknown>, item) => {
        acc[item.key] = item.value;
        if (item.key) {
          acc[item.key.toLowerCase().trim()] = item.value;
        }
        return acc;
      }, {} as Record<string, unknown>)) || {};
      const sizeStr = 
        kv['size in sqyds.'] || 
        kv['size in sqyds'] || 
        kv['sq yds'] || 
        kv['sq. yds'] || 
        kv['size'] || 
        '-';
      const sizeVal = parseFloat(String(sizeStr).replace(/[^0-9.]/g, '')) || 0;
      const bhkMatch = String(kv.configuration || p.property_type || '').match(/(\d+)\s*BHK/i);
      return { 
        sno: index + 1, 
        id: String(kv.id || kv.id || p.property_id), 
        plotNo: String(kv.plot || p.plot_number || '-'), 
        size: String(sizeStr), 
        sizeRaw: sizeVal, 
        type: String(kv.configuration || p.property_type || '-'), 
        price: parseFloat(p.price) || 0, 
        priceRaw: parseFloat(p.price) || 0, 
        description: p.description || '', 
        location: p.location || '', 
        bhk: bhkMatch ? bhkMatch[1] : '', 
        rawKeyValues: p.key_values || [] 
      };
    }).sort((a, b) => (parseInt(a.plotNo.replace(/\D/g, '')) || 0) - (parseInt(b.plotNo.replace(/\D/g, '')) || 0));
    setPlotData(properties);
  };

  const fetchData = async () => {
    if (initialTownshipName) { if (initialData) processApiData(initialData as ApiProperty[]); setUiState(prev => ({ ...prev, loading: false })); return; }
    setUiState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const response = await fetch(API_URL);
      const result: ApiResponse = await response.json();
      if (result.success && result.data) {
        const normalizedData = normalizeData(result.data);
        setTownshipName((normalizedData.name as string) || '');
        if (normalizedData.pdf) {
          setPdfState(prev => ({ ...prev, data: normalizedData.pdf as { name: string; url: string; file_path?: string }[] }));
        }
        processApiData((normalizedData.properties as ApiProperty[]) || []);
      } else { setUiState(prev => ({ ...prev, error: t('property.listings.failedToLoadData') })); }
    } catch (err) { console.error('Error:', err); setUiState(prev => ({ ...prev, error: t('property.listings.errorLoadingData') })); }
    finally { setUiState(prev => ({ ...prev, loading: false })); }
  };

  const filterPlotData = () => {
    const kvs = plotData.map(p => p.rawKeyValues?.reduce((acc, item) => { acc[item.key] = item.value; return acc; }, {} as Record<string, unknown>) || {});
    const matchesFilter = (kv: Record<string, unknown>, key: string, value: string) => !value || String(kv[key] || '').toLowerCase() === value.toLowerCase();
    const empty = '';
    const filtered = plotData.filter((_, i) =>
      matchesFilter(kvs[i], 'Sub Township', empty) && matchesFilter(kvs[i], 'Project Area', empty) && matchesFilter(kvs[i], 'Configuration', empty) && matchesFilter(kvs[i], 'Construction Status', empty)
    );
    if ((empty as string) === 'size-asc') filtered.sort((a, b) => (parseFloat(String(a.size).replace(/[^0-9.]/g, '')) || 0) - (parseFloat(String(b.size).replace(/[^0-9.]/g, '')) || 0));
    setFilteredData(filtered);
  };

  useEffect(() => {
    if (pdf && pdf.length > 0) {
      setPdfState(prev => ({ ...prev, data: pdf.map((url, index) => ({ name: (url.split('/').pop() || '').replace(/[-_]/g, ' ').toUpperCase() || `DOCUMENT ${index + 1}`, url })) }));
    }
  }, [pdf]);

  useEffect(() => {
    if (plotData.length === 0 && !initialTownshipName) { fetchData(); }
    else if (plotData.length > 0) { filterPlotData(); setUiState(prev => ({ ...prev, expandedIndices: new Set() })); }
    else if (initialTownshipName && plotData.length === 0) {
      // Process initialData when passed from parent with townshipName
      if (initialData && (initialData as ApiProperty[]).length > 0) {
        processApiData(initialData as ApiProperty[]);
      }
      setUiState(prev => ({ ...prev, loading: false }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plotData, initialTownshipName]);

  const handleToggleAll = useCallback(() => {
    setUiState(prev => ({ ...prev, expandedIndices: prev.expandedIndices.size === filteredData.length && filteredData.length > 0 ? new Set<number>() : new Set(filteredData.map((_, i) => i)) }));
  }, [filteredData]);
  const handleStopPropagation = useCallback((e: React.MouseEvent) => { e.stopPropagation(); }, []);
  const createToggleHandler = useCallback((idx: number) => () => { setUiState(prev => { const next = new Set(prev.expandedIndices); if (next.has(idx)) { next.delete(idx); } else { next.add(idx); } return { ...prev, expandedIndices: next }; }); }, []);

  if (!uiState.loading && plotData.length === 0 && pdfState.data.length === 0) {
    return null;
  }

  return (
    <PropertyListingsTable
      filteredData={filteredData}
      ui={{ loading: uiState.loading, error: uiState.error, expandedIndices: uiState.expandedIndices, townshipName }}
      pdf={{ data: pdfState.data, thumbnails: pdfState.thumbnails }}
      t={t}
      handlers={{ handleToggleAll, handleStopPropagation, createToggleHandler }}
    />
  );
};

export default PropertyListings;
