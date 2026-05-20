import React, { useState, useEffect, useCallback } from "react";
import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { ApiConstants } from "../../constants/ApiConstants";
import { ApiEndPoints } from "../../constants/ApiEndpoints";
import { Filters, FilterOptions } from "./types";
import { useTranslation } from "../../hooks/useTranslation";
import "./PropertySearch2.css";

type FilterOption = Record<string, unknown>;

interface Props {
  filters: Filters;
  priceError: string;
  handleFilterChange: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  resetFilters: () => void;
}

const getOptionValue = (option: FilterOption | null | undefined, type: string): string => {
  if (!option) return '';
  if (type === 'bhk') return String(option.bhk ?? '');
  return String(option.name ?? '');
};

const getOptionLabel = (option: FilterOption | null | undefined, type: string): string => {
  if (!option) return '';
  if (type === 'bhk' && option.bhk) return `${option.bhk} BHK`;
  return String(option.name ?? '');
};

const PropertyFilters2: React.FC<Props> = ({
  filters,
  priceError,
  handleFilterChange,
  handleSubmit,
  resetFilters
}) => {
  const { t } = useTranslation();
  const [optionsData, setOptionsData] = useState<FilterOptions>({});

  useEffect(() => {
    let mounted = true;
    const fetchOptions = async () => {
      try {
        const url = `${ApiConstants.API_BASE_URL}${ApiEndPoints.OPTIONS}`;
        const res = await axios.get(url, { headers: ApiConstants.HEADERS });
        if (mounted) setOptionsData(res.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    fetchOptions();
    return () => { mounted = false; };
  }, []);

  const filterOptions = optionsData;
  const bhkOptions = filterOptions?.bhk || [];
  const propertyTypeOptions = filterOptions?.property_type || [];
  const constructionStatusOptions = filterOptions?.construction_status || [];
  const constructionTypeOptions = filterOptions?.construction_type || [];

  const onSelectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const field = (e.currentTarget as HTMLSelectElement).dataset.field;
    if (field) handleFilterChange(field, e.target.value);
  }, [handleFilterChange]);

  const onPriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const field = (e.currentTarget as HTMLInputElement).dataset.field;
    if (field) handleFilterChange(field, e.target.value);
  }, [handleFilterChange]);

  return (
    <div className="filter-container">
      <form onSubmit={handleSubmit} className="filter-form">
        <div className="filter-group">
          <div className="filter-field">
            <label className="filter-label">{t('propertySearch.bhk')}</label>
            <select
              value={filters.bhk}
              data-field="bhk"
              onChange={onSelectChange}
              className="filter-select"
            >
              <option value="">{t('propertySearch.allBhk')}</option>
              {bhkOptions.map((opt, i) => (
                <option key={i} value={getOptionValue(opt, 'bhk')}>
                  {getOptionLabel(opt, 'bhk')}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label className="filter-label">{t('propertySearch.propertyType')}</label>
            <select
              value={filters.property_type}
              data-field="property_type"
              onChange={onSelectChange}
              className="filter-select"
            >
              <option value="">{t('propertySearch.allPropertyTypes')}</option>
              {propertyTypeOptions.map((opt, i) => (
                <option key={i} value={getOptionValue(opt, 'property')}>
                  {getOptionLabel(opt, 'property')}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label className="filter-label">{t('propertySearch.constructionStatus')}</label>
            <select
              value={filters.construction_status}
              data-field="construction_status"
              onChange={onSelectChange}
              className="filter-select"
            >
              <option value="">{t('propertySearch.allStatuses')}</option>
              {constructionStatusOptions.map((opt, i) => (
                <option key={i} value={getOptionValue(opt, 'status')}>
                  {getOptionLabel(opt, 'status')}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-field">
            <label className="filter-label">{t('propertySearch.priceRange')}</label>
            <div className="price-input-group">
              <CurrencyRupeeIcon className="price-icon" />
              <input
                type="number"
                placeholder={t('propertySearch.min')}
                value={filters.minPrice}
                data-field="minPrice"
                onChange={onPriceChange}
                className="price-input"
              />
              <span className="price-separator">-</span>
              <input
                type="number"
                placeholder={t('propertySearch.max')}
                value={filters.maxPrice}
                data-field="maxPrice"
                onChange={onPriceChange}
                className="price-input"
              />
            </div>
          </div>

          {constructionTypeOptions.length > 0 && (
            <div className="filter-field">
              <label className="filter-label">{t('propertySearch.constructionType')}</label>
              <select
                value={filters.construction_type}
                data-field="construction_type"
                onChange={onSelectChange}
                className="filter-select"
              >
                <option value="">{t('propertySearch.allTypes')}</option>
                {constructionTypeOptions.map((opt, i) => (
                  <option key={i} value={getOptionValue(opt, 'type')}>
                    {getOptionLabel(opt, 'type')}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="filter-actions">
          <button type="button" onClick={resetFilters} className="btn-reset">{t('propertySearch.reset')}</button>
          <button type="submit" className="btn-apply">{t('propertySearch.applyFilters')}</button>
        </div>
      </form>
      {priceError && <p className="price-error">{priceError}</p>}
    </div>
  );
};

export default PropertyFilters2;