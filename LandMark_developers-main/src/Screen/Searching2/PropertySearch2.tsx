import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import PropertyFilters from "./PropertyFilter2";
import PropertyCards from "./PropertyCards2";
import { Property, Filters } from "./types";
import { fetchProperties, buildQueryString } from "./propertyUtils";
import { useTranslation } from "../../hooks/useTranslation";
import "./PropertySearch2.css";

const PropertySearch2 = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const [properties, setProperties] = useState<Property[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [priceError, setPriceError] = useState("");
  const [uiState, setUiState] = useState({ loading: false, showFilters: false });
  const [filters, setFilters] = useState<Filters>({
    city: "", bhk: "", property_type: "", construction_status: "",
    construction_type: "", minPrice: "", maxPrice: "",
    search: "", sale_type: "", verified: "", project: "", featured_agent: ""
  });
  const townshipId = id ? parseInt(id) : 9;
  const isFirstRender = useRef(true);

  const loadProperties = useCallback(async () => {
    setUiState(prev => ({ ...prev, loading: true }));
    const query = buildQueryString(filters);
    const data = await fetchProperties(townshipId, query);
    setProperties(data);
    setTotalCount(data.length);
    setUiState(prev => ({ ...prev, loading: false }));
  }, [filters, townshipId]);

  useEffect(() => {
    (async () => {
      setUiState(prev => ({ ...prev, loading: true }));
      const query = buildQueryString(filters);
      const data = await fetchProperties(townshipId, query);
      setProperties(data);
      setTotalCount(data.length);
      setUiState(prev => ({ ...prev, loading: false }));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isFirstRender.current) { isFirstRender.current = false; return; }
    const timer = setTimeout(() => loadProperties(), 600);
    return () => clearTimeout(timer);
  }, [filters.search, loadProperties]);

  const handleFilterChange = useCallback((name: string, value: string) => setFilters((prev) => ({ ...prev, [name]: value })), []);
  const handleSubmit = useCallback((e: React.FormEvent) => { e.preventDefault(); loadProperties(); }, [loadProperties]);

  const resetFilters = useCallback(() => {
    const cleared = { city: "", bhk: "", property_type: "", construction_status: "", construction_type: "", minPrice: "", maxPrice: "", search: "", sale_type: "", verified: "", project: "", featured_agent: "" };
    setFilters(cleared);
    setPriceError("");
    setUiState(prev => ({ ...prev, loading: true }));
    setTimeout(async () => {
      const data = await fetchProperties(townshipId, buildQueryString(cleared));
      setProperties(data);
      setTotalCount(data.length);
      setUiState(prev => ({ ...prev, loading: false }));
    }, 100);
  }, [townshipId]);

  const onSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => handleFilterChange("search", e.target.value), [handleFilterChange]);
  const onShowFilters = useCallback(() => setUiState(prev => ({ ...prev, showFilters: true })), []);
  const onHideFilters = useCallback(() => setUiState(prev => ({ ...prev, showFilters: false })), []);
  const onFilterSubmit = useCallback((e: React.FormEvent) => { handleSubmit(e); setUiState(prev => ({ ...prev, showFilters: false })); }, [handleSubmit]);

  return (
    <div className="search-container">
      <div className="sm:hidden px-4 mb-4 flex gap-2 items-center">
        <div className="flex-1 relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input type="text" placeholder={t('propertySearch.searchByCity')} value={filters.search} onChange={onSearchChange} className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <span className="prop-search-filter-toggle shadow-sm hover:shadow-md" onClick={onShowFilters} aria-label={t('propertySearch.showFilters')}>
          <SlidersHorizontal size={20} className="text-slate-800" />
        </span>
      </div>
      <div className={`filter-overlay ${uiState.showFilters ? 'mobile-show' : ''}`} onClick={onHideFilters} />
      <div className={`filter-wrapper ${uiState.showFilters ? 'mobile-show' : ''}`}>
        <div className="sm:hidden flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-gray-900">{t('propertySearch.filters')}</h1>
          <button onClick={onHideFilters} className="p-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-full transition-colors" aria-label={t('propertySearch.filters')}>
            <X size={20} />
          </button>
        </div>
        <PropertyFilters filters={filters} priceError={priceError} handleFilterChange={handleFilterChange} handleSubmit={onFilterSubmit} resetFilters={resetFilters} />
      </div>
      <div className="content-area">
        {uiState.loading ? (
          <div className="loader-container"><div className="loader"></div></div>
        ) : (
          <PropertyCards properties={properties} totalCount={totalCount} loading={uiState.loading} />
        )}
      </div>
    </div>
  );
};

export default PropertySearch2;
