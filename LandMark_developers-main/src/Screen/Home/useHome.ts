import { useState, useEffect, useCallback } from "react";
import { fetchHomepageData, prefetchHomepageData, HomepageData } from "../../services/HomeService";
import { preloadImagesBackground } from "../../utils/imagePreloader";
import { usePrefetchOnScroll } from "../../hooks/usePrefetchOnScroll";
import { EMPTY_DATA, extractImageUrls } from "./HomeHelper";

export const useHome = () => {
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [homepageData, setHomepageData] = useState<HomepageData>(EMPTY_DATA);

  usePrefetchOnScroll(0.6, [prefetchHomepageData]);

  const applyData = useCallback((data: HomepageData) => {
    setHomepageData(data);
    preloadImagesBackground(extractImageUrls(data));
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setHasError(false);
    try {
      const data = await fetchHomepageData((fresh) => {
        applyData(fresh);
      });
      applyData(data);
    } catch (error) {
      console.error("Error loading homepage data:", error);
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }, [applyData]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    loading,
    hasError,
    homepageData,
    loadData,
  };
};
