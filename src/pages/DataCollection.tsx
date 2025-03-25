import React, { useState } from "react";
import { Send, Leaf, HelpCircle, Search } from "lucide-react";

// Sample Data
const regions = ["North", "South", "East", "West", "Central"];
const crops = ["Wheat", "Rice", "Corn", "Soybeans", "Potatoes", "Tomatoes"];
const farmers = [
  { id: "F001", label: "John Smith" },
  { id: "F002", label: "Maria Garcia" },
  { id: "F003", label: "David Johnson" },
];

// FormField Component
const FormField = ({
  label,
  id,
  type,
  placeholder,
  tooltip,
  options,
  unit,
  searchOptions,
}: {
  label: string;
  id: string;
  type: "text" | "number" | "select" | "searchSelect";
  placeholder?: string;
  tooltip?: string;
  options?: string[];
  unit?: string;
  searchOptions?: { id: string; label: string }[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ display: "flex", alignItems: "center", marginBottom: "4px" }}>
        <label htmlFor={id} style={{ fontWeight: "bold", flex: 1 }}>{label}</label>
        {tooltip && (
          <div style={{ position: "relative", display: "inline-block" }}>
            <HelpCircle size={16} />
          </div>
        )}
      </div>
      {type === "select" ? (
        <select id={id} style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}>
          <option value="">Select an option</option>
          {options?.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      ) : type === "searchSelect" ? (
        <div style={{ position: "relative" }}>
          <input
            type="text"
            style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
          />
          {isOpen && searchOptions && (
            <div style={{
              position: "absolute", background: "#fff", border: "1px solid #ccc",
              borderRadius: "5px", width: "100%", zIndex: 10
            }}>
              {searchOptions
                .filter(option =>
                  option.label.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(option => (
                  <div key={option.id}
                    style={{ padding: "5px", cursor: "pointer" }}
                    onClick={() => { setSearchTerm(option.label); setIsOpen(false); }}>
                    {option.label}
                  </div>
                ))}
            </div>
          )}
        </div>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          style={{ width: "100%", padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      )}
    </div>
  );
};

// FarmerDataForm Component
const FarmerDataForm = () => (
  <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)", flex: 1 }}>
    <h2 style={{ color: "green", borderBottom: "2px solid #ccc", paddingBottom: "5px" }}>Monthly Data by Farmers</h2>
    <form>
      <FormField label="Farmer ID" id="farmer-id" type="searchSelect" searchOptions={farmers} />
      <FormField label="Crop Name" id="farmer-crop-name" type="select" options={crops} />
      <FormField label="Region" id="farmer-region" type="select" options={regions} />
      <FormField label="Area of the Crop" id="farmer-area" type="number" placeholder="Enter area" unit="Acres" />
      <FormField label="Planted Quantity" id="farmer-planted" type="number" placeholder="Enter quantity" unit="kg" />
      <FormField label="Harvested Quantity" id="farmer-harvested" type="number" placeholder="Enter quantity" unit="kg" />
      <FormField label="Sold Amount" id="farmer-sold" type="number" placeholder="Enter amount" unit="kg" />
      <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "green", color: "white", borderRadius: "5px", marginTop: "10px" }}>
        <Send size={16} /> Submit Farmer Data
      </button>
    </form>
  </div>
);

// CropDataForm Component
const CropDataForm = () => (
  <div style={{ background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0px 2px 5px rgba(0,0,0,0.1)", flex: 1 }}>
    <h2 style={{ color: "green", borderBottom: "2px solid #ccc", paddingBottom: "5px" }}>Monthly Data by Crop</h2>
    <form>
      <FormField label="Crop Name" id="crop-name" type="select" options={crops} />
      <FormField label="Region" id="crop-region" type="select" options={regions} />
      <FormField label="Area of the Crop in Whole Region" id="crop-area" type="number" placeholder="Enter area" unit="Acres" />
      <FormField label="Planted Quantity" id="crop-planted" type="number" placeholder="Enter quantity" unit="kg" />
      <FormField label="Sold Amount" id="crop-sold" type="number" placeholder="Enter amount" unit="kg" />
      <FormField label="Price per 1 kg" id="crop-price" type="number" placeholder="Enter price" unit="$" />
      <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "green", color: "white", borderRadius: "5px", marginTop: "10px" }}>
        <Send size={16} /> Submit Crop Data
      </button>
    </form>
  </div>
);


const DataCollection = () => {
  return (
    <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
      <header style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
        <Leaf color="green" size={32} />
        <h1 style={{ fontSize: "24px", color: "green" }}>CropSync Data Collection</h1>
      </header>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <FarmerDataForm />
        <CropDataForm />
      </div>
    </div>
  );
};

export default DataCollection;
