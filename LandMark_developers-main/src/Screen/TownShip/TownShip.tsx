 
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Township,
  Property,
} from "../../store/TownShip/townshipsData";
import TownshipCard from "../../Components/TownShip/TownshipCard";
import { ApiConstants } from "../../constants/ApiConstants";
import { ApiEndPoints } from "../../constants/ApiEndpoints";
import "./township.css";
 
const TownShip: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState<Township | null>(null);
  const [townships, setTownships] = useState<Township[]>([]);
  const [loading, setLoading] = useState(true);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchTownships = async () => {
      try {
        const response = await fetch(`${ApiConstants.API_BASE_URL}${ApiEndPoints.TOWNSHIPS}`, {
          method: 'GET',
          headers: {
            'Cache-Control': 'no-cache',
            'Accept': '*/*',
          },
        });
        const data = await response.json();
        setTownships(data.data || []);
      } catch (error) {
        console.error('Error fetching townships:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTownships();
  }, []);

  const openCity = (item: Township) => {
    setSelectedCity(item);
  };

  const closeDrawer = () => {
    setSelectedCity(null);
  };

  useEffect(() => {
    if (selectedCity && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [selectedCity]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  type DropdownKey = "buyers" | "tenants" | "sellers" | "services" | "news" | null;
  type TabKey = "BUY" | "RENT" | "COMMERCIAL" | "PG/CO-LIVING" | "PLOTS";
  const TABS: TabKey[] = ["BUY", "RENT", "COMMERCIAL", "PG/CO-LIVING", "PLOTS"];
 
  const [dropdown, setDropdown] = useState<DropdownKey>(null);
  const [activeTab, setActiveTab] = useState<TabKey>("BUY");
  const [search, setSearch] = useState("");
  const navItems = [
    { key: "buyers", label: "For Buyers" },
    { key: "tenants", label: "For Tenants" },
    { key: "sellers", label: "For Sellers" },
    { key: "services", label: "Services" },
    { key: "news", label: "News & Guide" },
  ]; return (
     <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen min-h-screen bg-gray-100 -mt-10 flex overflow-x-hidden pb-10">
       {/* LEFT CITY GRID */}
       <div
         className={`transition-all duration-300 px-6 md:px-10  py-0 ${
           selectedCity ? "lg:w-[65%]" : "w-full"
         }`}
       >
         <h1 className="text-3xl font-bold mt-30 mb-8">Our Townships</h1>

         {loading ? (
           <div className="flex justify-center items-center py-20">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
           </div>
         ) : (
           <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
             {townships.map((item) => (
               <TownshipCard key={item.township_id || item.id} item={item} onSelect={openCity} />
             ))}
           </div>
         )}
       </div>
      {/* MOBILE BACKDROP */}
      {selectedCity && (
        <div
          role="button"
          tabIndex={0}
          onClick={closeDrawer}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") closeDrawer();
          }}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}
      {/* RIGHT DRAWER */}
      <aside
        role="dialog"
        aria-modal="true"
        className={` lg:relative right-0 top-0
        h-180
        w-full sm:w-[50%] md:w-[50%] lg:w-[65%]
        bg-white shadow-2xl
        transition-transform duration-300
        z-50
        ${selectedCity ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
        ${selectedCity ? "lg:block" : "lg:hidden"}`}
      >
        {selectedCity && (
          <div className="h-full overflow-y-auto p-6 pr-20 relative">
            {/* CLOSE BUTTON */}
            <button
              ref={closeButtonRef}
              aria-label="Close drawer"
              onClick={closeDrawer}
              className="absolute top-30 right-4 z-50
              bg-white shadow-md rounded-full
              w-10 h-10 flex items-center justify-center
              text-xl hover:bg-gray-100"
            >
              ✕
            </button>
            {/* CITY TITLE */}
            <h2 className="text-4xl font-bold mt-40">
              {(selectedCity.city || selectedCity.name)} Projects
            </h2>
            <p className="mt-3 text-gray-600">{selectedCity.description || selectedCity.location}</p>
            {/* PROPERTY GRID */}
            {selectedCity.properties && selectedCity.properties.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                {selectedCity.properties.map((property: Property) => (
                  <div
                    key={property.id}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                  >
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />

                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800">
                        {property.title}
                      </h3>

                      <p className="text-sm text-gray-600 mt-2">
                        {property.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64">
                <div className="w-24 h-24 rounded-full bg-blue-50 flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-700">No Properties Yet</h3>
                <p className="text-gray-500 text-center max-w-xs">Properties for this township will be available soon.</p>
              </div>
            )}
            {/* VERTICAL BUTTON */}
            <button 
              className="vertical-btn"
              onClick={() => navigate('/search')}
            >
              <span>View More</span>
            </button>
          </div>
        )} 
      </aside>
    </div>
  );
};
export default TownShip;