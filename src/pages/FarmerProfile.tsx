import React, { useState } from "react";
import { Search, Filter, ChevronRight } from "lucide-react";

// Define a type for a farmer object
interface Farmer {
  id: string;
  name: string;
  location: string;
  crops: string[];
  acreage: number;
}

// Sample farmer data
const initialFarmers: Farmer[] = [
  { id: "F001", name: "John Smith", location: "Iowa", crops: ["Corn", "Soybeans"], acreage: 450 },
  { id: "F002", name: "Maria Garcia", location: "California", crops: ["Almonds", "Grapes"], acreage: 320 },
  { id: "F003", name: "Robert Johnson", location: "Nebraska", crops: ["Wheat", "Barley"], acreage: 680 },
  { id: "F004", name: "Sarah Williams", location: "Texas", crops: ["Cotton", "Sorghum"], acreage: 520 },
  { id: "F005", name: "David Lee", location: "Oregon", crops: ["Apples", "Cherries"], acreage: 150 },
  { id: "F006", name: "Lisa Brown", location: "Minnesota", crops: ["Corn", "Alfalfa"], acreage: 390 },
];

const FarmerProfile = () => {
  const [farmers, setFarmers] = useState<Farmer[]>(initialFarmers);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null); // Explicitly set type

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", backgroundColor: "#f9fafb" }}>
      {/* Header */}
      <header style={{ backgroundColor: "#2f855a", color: "white", padding: "16px", boxShadow: "0px 2px 4px rgba(0,0,0,0.1)" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>CropSync Farmer Profiles</h1>
      </header>

      {/* Main content */}
      <main style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar for filters */}
        {filterOpen && (
          <div style={{ width: "250px", backgroundColor: "white", padding: "16px", borderRight: "1px solid #e5e7eb" }}>
            <h2 style={{ fontWeight: "600", color: "#2f855a", marginBottom: "16px" }}>Filters</h2>
          </div>
        )}

        {/* Farmer list */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Search bar */}
          <div style={{ backgroundColor: "white", padding: "16px", display: "flex", justifyContent: "space-between", borderBottom: "1px solid #e5e7eb" }}>
            <input
              type="text"
              placeholder="Search by name or ID..."
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
              }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Farmer cards */}
          <div style={{ flex: 1, overflowY: "auto", padding: "24px", backgroundColor: "#f9fafb", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {filteredFarmers.map((farmer) => (
              <div
                key={farmer.id}
                style={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  padding: "16px",
                  border: "1px solid #e5e7eb",
                  transition: "box-shadow 0.2s",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedFarmer(farmer)}
              >
                <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#374151" }}>{farmer.name}</h3>
                <p style={{ color: "#6b7280" }}>ID: {farmer.id}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Farmer details modal */}
        {selectedFarmer && (
          <div style={{ position: "fixed", inset: "0", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", padding: "16px" }}>
            <div style={{ backgroundColor: "white", borderRadius: "8px", maxWidth: "400px", width: "100%", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", padding: "16px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#2f855a" }}>Farmer Details</h2>
              <h3 style={{ fontSize: "18px", fontWeight: "600", color: "#374151", marginTop: "16px" }}>{selectedFarmer.name}</h3>
              <p style={{ color: "#6b7280" }}>ID: {selectedFarmer.id}</p>
              <button
                style={{
                  width: "100%",
                  marginTop: "16px",
                  backgroundColor: "#2f855a",
                  color: "white",
                  padding: "8px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedFarmer(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default FarmerProfile;
