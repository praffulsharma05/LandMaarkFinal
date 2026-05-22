import { useState, useEffect, useCallback } from "react";

interface UsePropertyFiltersProps {
  handleFilterChange: (name: string, value: string) => void;
}

export const usePropertyFilters = ({ handleFilterChange }: UsePropertyFiltersProps) => {
  const [cities, setCities] = useState<{ city_id: number; name: string }[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoadingCities(true);
      try {
        const res = await fetch("/api/cities", { method: 'GET', headers: { 'Content-Type': 'application/json' } });
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        setCities(json.data || json || []);
      } catch (error) { 
        console.error("Error fetching cities:", error); 
      } finally { 
        setIsLoadingCities(false); 
      }
    })();
  }, []);

  const onSelectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const field = (e.currentTarget as HTMLSelectElement).dataset.field;
    if (field) handleFilterChange(field, e.target.value);
  }, [handleFilterChange]);

  const onPriceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const field = (e.currentTarget as HTMLInputElement).dataset.field;
    if (field) handleFilterChange(field, e.target.value);
  }, [handleFilterChange]);

  return {
    cities,
    isLoadingCities,
    onSelectChange,
    onPriceChange,
  };
};
