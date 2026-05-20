import React, { useCallback } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { useTranslation } from '../../../hooks/useTranslation';

interface KeyValue {
  key: string;
  value: unknown;
}

interface Property {
  bhk: string;
  rawKeyValues: KeyValue[];
}

interface PropertyFiltersProps {
  filters: {
    subTownship: string;
    projectArea: string;
    configuration: string;
    status: string;
    sortBy: string;
  };
  plotData: Property[];
  onFilterChange: (key: string, value: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

function reduceKeyValues(acc: Record<string, unknown>, item: KeyValue): Record<string, unknown> {
  acc[item.key] = item.value;
  return acc;
}

function mapToFilterValues(items: string[]) {
  return items.map(st => <option key={st} value={st}>{st}</option>);
}

const PropertyFilters: React.FC<PropertyFiltersProps> = ({
  filters,
  plotData,
  onFilterChange,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const { t } = useTranslation();

  const uniqueSubTownships = [...new Set(plotData.map(p => {
    const kv = p.rawKeyValues?.reduce(reduceKeyValues, {} as Record<string, unknown>) || {};
    return kv['Sub Township'] as string | undefined;
  }).filter(Boolean))].sort() as string[];

  const uniqueProjectAreas = [...new Set(plotData.map(p => {
    const kv = p.rawKeyValues?.reduce(reduceKeyValues, {} as Record<string, unknown>) || {};
    return kv['Project Area'] as string | undefined;
  }).filter(Boolean))].sort() as string[];

  const uniqueConfigurations = [...new Set(plotData.map(p => {
    const kv = p.rawKeyValues?.reduce(reduceKeyValues, {} as Record<string, unknown>) || {};
    return kv['Configuration'] as string | undefined;
  }).filter(Boolean))].sort() as string[];

  const uniqueStatus = [...new Set(plotData.map(p => {
    const kv = p.rawKeyValues?.reduce(reduceKeyValues, {} as Record<string, unknown>) || {};
    return kv['Construction Status'] as string | undefined;
  }).filter(Boolean))].sort() as string[];

  const handleOpenMobile = useCallback(() => setIsMobileOpen(true), [setIsMobileOpen]);
  const handleCloseMobile = useCallback(() => setIsMobileOpen(false), [setIsMobileOpen]);
  const handleOverlayClick = useCallback(() => setIsMobileOpen(false), [setIsMobileOpen]);
  const handleSheetClick = useCallback((e: React.MouseEvent) => e.stopPropagation(), []);

  const makeOnChange = useCallback((key: string) => {
    return (e: React.ChangeEvent<HTMLSelectElement>) => onFilterChange(key, e.target.value);
  }, [onFilterChange]);

  const filterContent = (isMobile: boolean) => (
    <div className={isMobile ? "mobile-filters-grid" : "filters"}>
      <div className={isMobile ? "filter-group" : ""}>
        {isMobile && <label>{t('property.filters.subTownship')}</label>}
        <select value={filters.subTownship} onChange={makeOnChange('subTownship')}>
          <option value="">{t('property.filters.allSubTownships')}</option>
          {mapToFilterValues(uniqueSubTownships)}
        </select>
      </div>

      <div className={isMobile ? "filter-group" : ""}>
        {isMobile && <label>{t('property.filters.projectArea')}</label>}
        <select value={filters.projectArea} onChange={makeOnChange('projectArea')}>
          <option value="">{t('property.filters.allProjectAreas')}</option>
          {mapToFilterValues(uniqueProjectAreas)}
        </select>
      </div>

      <div className={isMobile ? "filter-group" : ""}>
        {isMobile && <label>{t('property.filters.configuration')}</label>}
        <select value={filters.configuration} onChange={makeOnChange('configuration')}>
          <option value="">{t('property.filters.allConfigurations')}</option>
          {mapToFilterValues(uniqueConfigurations)}
        </select>
      </div>

      <div className={isMobile ? "filter-group" : ""}>
        {isMobile && <label>{t('property.filters.status')}</label>}
        <select value={filters.status} onChange={makeOnChange('status')}>
          <option value="">{t('property.filters.allStatus')}</option>
          {uniqueStatus.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div className={isMobile ? "filter-group" : ""}>
        {isMobile && <label>{t('property.filters.sortBy')}</label>}
        <select value={filters.sortBy} onChange={makeOnChange('sortBy')}>
          <option value="">{t('property.filters.sortBySize')}</option>
          <option value="size-asc">{t('property.filters.sizeLowToHigh')}</option>
          <option value="size-desc">{t('property.filters.sizeHighToLow')}</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      <button className="filter-trigger-btn" onClick={handleOpenMobile} aria-label={t('property.filters.filters')}>
        <SlidersHorizontal size={18} />
      </button>

      {isMobileOpen && (
        <div className="bottom-sheet-overlay" onClick={handleOverlayClick}>
          <div className="bottom-sheet" onClick={handleSheetClick}>
            <div className="bottom-sheet-header">
              <h1 className="sr-only">{t('property.filters.filters')}</h1>
              <span className="bottom-sheet-title">{t('property.filters.filters')}</span>
              <button className="close-btn" onClick={handleCloseMobile} aria-label={t('common.cancel')}>
                <X size={24} />
              </button>
            </div>
            <div className="bottom-sheet-content">
              {filterContent(true)}
              <button className="apply-btn" onClick={handleCloseMobile}>
                {t('property.filters.applyFilters')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PropertyFilters;
