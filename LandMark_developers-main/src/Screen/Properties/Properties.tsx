import React, { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import PropertyCard from "../../Components/Properties/PropertyCard";
import { fetchProperties, CityProperty } from "../../services/services";
import { useTranslation } from "../../hooks/useTranslation";

const Properties = () => {
  const { t } = useTranslation();
  const [properties, setProperties] = useState<CityProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<number[]>([]);

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        const data = await fetchProperties();
        setProperties(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError(t("properties.errorMessage"));
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
  }, [t]);

  useEffect(() => {
    const saved = Cookies.get("wishlist");
    if (saved) {
      setWishlist(JSON.parse(saved));
    }
  }, []);

  const toggleWishlist = (id: number) => {
    let updated;
    if (wishlist.includes(id)) {
      updated = wishlist.filter((item) => item !== id);
    } else {
      updated = [...wishlist, id];
    }
    setWishlist(updated);
    Cookies.set("wishlist", JSON.stringify(updated), { expires: 7 });
  };

  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 mt-10 py-10">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">{t("properties.loading")}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-6 mt-10 py-10">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleReload}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition"
          >
            {t("properties.tryAgain")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 mt-10 py-10">
      <h1 className="text-4xl font-bold mb-10">{t("properties.title")}</h1>

      {properties.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">{t("properties.noProperties")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property: CityProperty) => {
            const selected = wishlist.includes(property.id);
            return (
              <PropertyCard
                key={property.id}
                property={property}
                selected={selected}
                onToggle={toggleWishlist}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Properties;