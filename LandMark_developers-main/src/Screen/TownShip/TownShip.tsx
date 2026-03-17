 
import React, { useState, useEffect, useRef } from "react";
import {
  Township,
  townshipData,
  Property,
} from "../../store/TownShip/townshipsData";
import TownshipCard from "../../Components/TownShip/TownshipCard";
import "./township.css";
import { div } from "framer-motion/client";

const TownShip: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<Township | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openCity = (item: Township) => {
    setSelectedCity(item);
  };

  const closeDrawer = () => {
    setSelectedCity(null);
  };

  // Focus close button
  useEffect(() => {
    if (selectedCity && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [selectedCity]);

  // ESC key close
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
  
  
   

   


     <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen min-h-screen bg-gray-100 -mt-10 flex overflow-x-hidden">
      {/* LEFT CITY GRID */}
  
  
      <div
        className={`transition-all duration-300 px-6 md:px-10  py-0 ${
          selectedCity ? "lg:w-[65%]" : "w-full"
        }`}
      >
        <h1 className="text-3xl font-bold mt-30 mb-8">Our Townships</h1>

        <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
          {townshipData.map((item) => (
            <TownshipCard key={item.id} item={item} onSelect={openCity} />
          ))}
        </div>
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
        className={`fixed lg:relative right-0 top-0
        h-160
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
              {selectedCity.city} Projects
            </h2>
            <p className="mt-3 text-gray-600">{selectedCity.description}</p>
            {/* PROPERTY GRID */}
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
            {/* VERTICAL BUTTON */}
            <button className="vertical-btn">
              <span>View More</span>
            </button>
          </div>
        )}
      </aside>
    </div>
   

    
  );
};

export default TownShip;
