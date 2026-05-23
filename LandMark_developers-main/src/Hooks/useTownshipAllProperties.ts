import { useState, useEffect } from "react";
import { TownshipAllProperty, fetchTownshipAllProperties } from "../services/TownshipAllPropertiesService";

export const useTownshipAllProperties = (townshipId: number | null) => {
  const [properties, setProperties] = useState<TownshipAllProperty[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!townshipId) return;

    const loadProperties = async () => {
      setLoading(true);
      const data = await fetchTownshipAllProperties(townshipId);
      setProperties(data);
      setLoading(false);
    };
    loadProperties();
  }, [townshipId]);

  return { properties, loading };
};