 

// import { useState } from "react";
// import "./AIPrompt.css";
// import { useNavigate } from "react-router-dom";
// const AIPrompt = () => {
//   const [query, setQuery] = useState<string>("");
//   const [data, setData] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [searched, setSearched] = useState<boolean>(false);

//   const fetchData = async () => {
//     if (!query.trim()) {
//       alert("Please enter something");
//       return;
//     }
 
//     setLoading(true);
//     setSearched(true);

//     try {
//       const res = await fetch(
//         `http://localhost:5000/api/propSearch/ai?query=${query}`
//       );

//       const result = await res.json();

//       if (Array.isArray(result)) {
//         setData(result);
//       } else {
//         setData([result]);
//       }
//     } catch (error) {
//       console.error(error);
//     }

//     setLoading(false);
//   };

//   return (
//   <div className="ai-floating-bar">
//       {/* 🔍 Search Section */}
//       <h2>Search Property</h2>
  
//       <span className="sparkle" >✦</span>

//       <input
//         className="ai-input"
//         type="text" id="postList"
//         placeholder="I want to buy 2bhk in ajmer for around 1 crore"
//          value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         style={{ padding: "8px", width: "250px" }}
//       />

//    <button className="generate-btn"     onClick={ fetchData}>
//         <span className="btn-icon" >✦</span>
//         Generate
//       </button>
//        {/* 📊 Result Section */}
//       {searched && <h2 style={{ marginTop: "20px" }}>Search Results</h2>}

//       {loading && <p>Loading...</p>}

//       {!loading &&
//         data.map((item, index) => (
//           <div
//             key={index}
//             style={{
//               border: "1px solid #ccc",
//               padding: "10px",
//               margin: "10px",
//               borderRadius: "5px",
//             }}
//           >
//             <pre>{JSON.stringify(item, null, 2)}</pre>
//           </div>
//         ))}

//       {!loading && searched && data.length === 0 && (
//         <p>No results found</p>
//       )}
      
//     </div>
//   );
// };

// export default AIPrompt;

import { useState } from "react";
import "./AIPrompt.css";
import { useNavigate } from "react-router-dom";

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
        `http://localhost:5000/api/propSearch/ai?query=${query}`
      );

      const result = await res.json();

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