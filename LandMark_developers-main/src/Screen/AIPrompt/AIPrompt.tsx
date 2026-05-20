
import { useState, useCallback } from "react";
import "./AIPrompt.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../hooks/useTranslation";

const AIPrompt = () => {
  const { t } = useTranslation();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  const fetchData = useCallback(async () => {
    if (!query.trim()) {
      alert("Please enter something");
      return;
    }

    setLoading(true);

    try {
      const url = `/api/propSearch/ai?query=${encodeURIComponent(query)}`;
      console.warn("🤖 AI Search URL:", url);

      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!res.ok) {
        throw new Error(`HTTP error! ${res.status}`);
      }

      const json = await res.json();
      console.warn("🤖 AI Response:", json);

      const result = json?.data || json;

      if (!result || (Array.isArray(result) && result.length === 0)) {
        alert("No results found");
        return;
      }

      const formattedData = (Array.isArray(result) ? result : [result]).map(
        (item: unknown, index: number) => ({
          property_id: (item as Record<string, unknown>)?.id || (item as Record<string, unknown>)?.property_id || index,
          title: (item as Record<string, unknown>)?.title || (item as Record<string, unknown>)?.name || "No Title",
          image: (item as Record<string, unknown>)?.image || "",
          price: (item as Record<string, unknown>)?.price || (item as Record<string, unknown>)?.budget || "0",
          location: (item as Record<string, unknown>)?.location || (item as Record<string, unknown>)?.city || "Unknown",
          bhk: (item as Record<string, unknown>)?.bhk || 2,
          property_type: (item as Record<string, unknown>)?.property_type || "Apartment",
          construction_status: (item as Record<string, unknown>)?.status || (item as Record<string, unknown>)?.construction_status || "Ready",
          area_sqft: (item as Record<string, unknown>)?.area || (item as Record<string, unknown>)?.area_sqft || 1000,
        })
      );

      console.warn("🤖 Formatted AI Results:", formattedData);

      navigate("/search", {
        state: { aiResults: formattedData },
      });

    } catch (error) {
      console.error("❌ Error fetching AI data:", error);
      alert("Something went wrong. Check console.");
    } finally {
      setLoading(false);
    }
  }, [query, navigate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      fetchData();
    }
  }, [fetchData]);

  return (
    <div className="ai-floating-bar ai-floating-bar-hidden">
      <input
        className="ai-input"
        type="text"
        placeholder={t("aiPrompt.searchPlaceholder")}
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="generate-btn"
        onClick={fetchData}
        disabled={loading}
      >
        {loading ? t("common.loading") : "Search"}
      </button>
    </div>
  );
};

export default AIPrompt;