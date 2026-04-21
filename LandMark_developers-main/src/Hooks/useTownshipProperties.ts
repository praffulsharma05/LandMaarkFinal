import { useState, useEffect } from "react";
import { TownshipProperty, fetchTownshipProperties } from "../services/TownshipPropertyService";

export const useTownshipProperties = (townshipId: number | null) => {
  const [properties, setProperties] = useState<TownshipProperty[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!townshipId) return;

    const loadProperties = async () => {
      setLoading(true);
      const data = await fetchTownshipProperties(townshipId);
      setProperties(data);
      setLoading(false);
    };
    loadProperties();
  }, [townshipId]);

  return { properties, loading };
};