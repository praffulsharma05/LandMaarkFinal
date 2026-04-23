import { useState, useEffect } from "react";
import { Township } from "../store/TownShip/TownshipTypes";
import { fetchTownships } from "../services/TownshipService";

export const useTownships = () => {
  const [townships, setTownships] = useState<Township[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTownships = async () => {
      const data = await fetchTownships();
      setTownships(data);
      setLoading(false);
    };
    loadTownships();
  }, []);

  return { townships, loading };
};