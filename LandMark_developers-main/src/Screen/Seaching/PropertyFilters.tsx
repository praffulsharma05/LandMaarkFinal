import React from "react";

interface FilterOptions {
  cities?: string[];
  bhk?: number[];
  property_types?: string[];
  construction_status?: string[];
  construction_types?: string[];
}

interface Filters {
  city: string;
  bhk: string;
  property_type: string;
  construction_status: string;
  construction_type: string;
  minPrice: string;
  maxPrice: string;
  search: string;
}

interface Props {
  filters: Filters;
  filterOptions: FilterOptions;
  priceError: string;
  handleFilterChange: (name: string, value: string) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetFilters: () => void;
}

const PropertyFilters: React.FC<Props> = ({
  filters,
  filterOptions,
  priceError,
  handleFilterChange,
  handleSearch,
  handleSubmit,
  resetFilters
}) => {
  return (
    <form onSubmit={handleSubmit} className="search-form">

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by location..."
          value={filters.search}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="filters-section">
        <div className="filters-grid">

          <div className="filter-item">
            <label>City</label>
            <input
              type="text"
              value={filters.city}
              onChange={(e) => handleFilterChange("city", e.target.value)}
            />
          </div>

          <div className="filter-item">
            <label>BHK</label>
            <select
              value={filters.bhk}
              onChange={(e) => handleFilterChange("bhk", e.target.value)}
            >
              <option value="">All</option>
              {filterOptions?.bhk?.map((b) => (
                <option key={b.bhk} value={b.bhk}>{b.bhk} BHK</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Property Type</label>
            <select
              value={filters.property_type}
              onChange={(e) => handleFilterChange("property_type", e.target.value)}
            >
              <option value="">All</option>
              {filterOptions?.property_type?.map((t) => (
                <option key={t.name} value={t.name}>{t.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Construction Status</label>
            <select
              value={filters.construction_status}
              onChange={(e) =>
                handleFilterChange("construction_status", e.target.value)
              }
            >
              <option value="">All</option>
              {filterOptions?.construction_status?.map((s) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="filter-item">
            <label>Min Price</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            />
          </div>

          <div className="filter-item">
            <label>Max Price</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            />
          </div>

        </div>

        {priceError && <div className="price-error-message">{priceError}</div>}

        <div className="filter-actions">
          <button type="submit" className="search-button">Search</button>
          <button type="button" onClick={resetFilters} className="reset-button">
            Reset
          </button>
        </div>

      </div>
    </form>
  );
};

export default PropertyFilters;