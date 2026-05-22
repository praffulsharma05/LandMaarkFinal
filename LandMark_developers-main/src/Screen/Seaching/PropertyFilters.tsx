import React from "react";
import { CurrencyRupeeIcon } from "@heroicons/react/24/outline";
import { useTranslation } from "../../hooks/useTranslation";
import { getOptionValue, getOptionLabel } from "./PropertyFiltersHelper";
import { usePropertyFilters } from "./usePropertyFilters";

interface FiltersType {
  city: string; bhk: string; property_type: string; construction_status: string;
  construction_type: string; minPrice: string; maxPrice: string; search: string;
  sale_type: string; verified: string; project: string; featured_agent: string;
}

type FilterOptionRecord = Record<string, unknown>;

interface FilterOptionsShape {
  bhk?: FilterOptionRecord[]; property_type?: FilterOptionRecord[];
  construction_status?: FilterOptionRecord[]; construction_type?: FilterOptionRecord[];
}

interface Props {
  filters: FiltersType; filterOptions: FilterOptionsShape; priceError: string;
  handleFilterChange: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; resetFilters: () => void;
}

const selectClass = "px-4 py-2 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition cursor-pointer";

const PropertyFilters: React.FC<Props> = ({ filters, filterOptions, priceError, handleFilterChange, handleSubmit, resetFilters }) => {
  const { t } = useTranslation();
  const { cities, isLoadingCities, onSelectChange, onPriceChange } = usePropertyFilters({ handleFilterChange });

  const bhkOptions = Array.isArray(filterOptions?.bhk) ? filterOptions.bhk : [];
  const propertyTypeOptions = Array.isArray(filterOptions?.property_type) ? filterOptions.property_type : [];
  const constructionStatusOptions = Array.isArray(filterOptions?.construction_status) ? filterOptions.construction_status : [];
  const constructionTypeOptions = Array.isArray(filterOptions?.construction_type) ? filterOptions.construction_type : [];

  return (
    <div className="sticky top-4 z-10 flex justify-center px-4">
      <div className="w-full max-w-7xl backdrop-blur-xl bg-white/80 border border-gray-200 shadow-lg rounded-2xl px-5 py-4">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 flex-1">
            <select value={filters.bhk} data-field="bhk" onChange={onSelectChange} className={selectClass}>
              <option value="">{t('propertySearch.bhk')}</option>
              {bhkOptions.map((option, index) => (<option key={index} value={getOptionValue(option)}>{getOptionLabel(option)}</option>))}
            </select>
            <select value={filters.property_type} data-field="property_type" onChange={onSelectChange} className={selectClass}>
              <option value="">{t('propertySearch.propertyType')}</option>
              {propertyTypeOptions.map((option, index) => (<option key={index} value={getOptionValue(option)}>{getOptionLabel(option)}</option>))}
            </select>
            <select value={filters.city} data-field="city" onChange={onSelectChange} className={selectClass} disabled={isLoadingCities}>
              <option value="">{t('propertySearch.city')}</option>
              {cities.map((city) => (<option key={city.city_id} value={city.name}>{city.name}</option>))}
            </select>
            <select value={filters.construction_status} data-field="construction_status" onChange={onSelectChange} className={selectClass}>
              <option value="">{t('propertySearch.constructionStatus')}</option>
              {constructionStatusOptions.map((option, index) => (<option key={index} value={getOptionValue(option)}>{getOptionLabel(option)}</option>))}
            </select>
            <div className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-300 bg-white hover:border-gray-400 transition">
              <CurrencyRupeeIcon className="h-4 w-4 text-gray-500" />
              <input type="number" placeholder={t('propertySearch.min')} value={filters.minPrice} data-field="minPrice" onChange={onPriceChange} className="w-16 text-sm focus:outline-none bg-transparent" />
              <span className="text-gray-400">-</span>
              <input type="number" placeholder={t('propertySearch.max')} value={filters.maxPrice} data-field="maxPrice" onChange={onPriceChange} className="w-16 text-sm focus:outline-none bg-transparent" />
            </div>
            {constructionTypeOptions.length > 0 && (
              <select value={filters.construction_type} data-field="construction_type" onChange={onSelectChange} className={selectClass}>
                <option value="">{t('propertySearch.constructionType')}</option>
                {constructionTypeOptions.map((option, index) => (<option key={index} value={getOptionValue(option)}>{getOptionLabel(option)}</option>))}
              </select>
            )}
          </div>
          <div className="flex items-center justify-end gap-3 min-w-[200px]">
            <button type="submit" className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium shadow hover:shadow-md hover:scale-[1.03] transition duration-200">
              {t('propertySearch.applyFilters')}
            </button>
            <button type="button" onClick={resetFilters} className="px-5 py-2 rounded-full border border-gray-300 text-gray-600 text-sm hover:bg-gray-100 transition duration-200">
              {t('propertySearch.reset')}
            </button>
          </div>
        </form>
        {priceError && <p className="text-xs text-red-500 mt-2 ml-1">{priceError}</p>}
      </div>
    </div>
  );
};

export default PropertyFilters;
