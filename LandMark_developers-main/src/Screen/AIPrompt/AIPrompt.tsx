 
import { useState } from "react";
import "./AIPrompt.css";
import { useNavigate } from "react-router-dom";
import { ApiConstants } from "../../constants/ApiConstants";

const AIPrompt = () => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const fetchData = async () => {
    if (!query.trim()) {
      alert("Please enter something");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        ApiConstants.API_BASE_URL + 
        `api/propSearch/ai?query=${query}`
      );

      const result = (await res.json()).data;
      console.log("Raw AI API Response:", result);
      // ✅ Normalize API response for PropertyCards
      const formattedData = (Array.isArray(result) ? result : [result]).map(
        (item: any, index: number) => ({
          property_id: item.id || index,
          title: item.title || item.name || "No Title",
          image: item.image || "",
          price: item.price || item.budget || "0",
          location: item.location || item.city || "Unknown",
          bhk: item.bhk || 2,
          property_type: item.property_type || "Apartment",
          construction_status: item.status || "Ready",
          area_sqft: item.area || 1000,
        })
      );

      // 🚀 Navigate with data
      navigate("/search", {
        state: { aiResults: formattedData },
      });

    } catch (error) {
      console.error("Error fetching AI data:", error);
    }

    setLoading(false);
  };

  return (
    <div className="ai-floating-bar">

 
      <input
        className="ai-input"
        type="text"
        placeholder="I want to buy 2bhk in ajmer for around 1 crore"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button className="generate-btn" onClick={fetchData}>

        {loading ? "Loading..." : "Search"}
      </button>

    </div>
  );
};

export default AIPrompt;