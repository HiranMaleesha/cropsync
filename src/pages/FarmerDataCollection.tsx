import React, { useState } from "react";
import { Send, Leaf, HelpCircle } from "lucide-react";

// Sample Data
const regions = ["Kurunegal", "Kandy", "Gampola", "Monaragala", "Colombo"];
const crops = ["Green beans", "Long beans", "Tomatoes" , "corn"];
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
    <div className="mb-4">
      <div className="flex items-center mb-1">
        <label htmlFor={id} className="font-semibold flex-1 text-gray-700">
          {label}
        </label>
        {tooltip && (
          <span className="relative inline-block text-gray-400">
            <HelpCircle size={16} />
          </span>
        )}
      </div>
      {type === "select" ? (
        <select
          id={id}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select an option</option>
          {options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : type === "searchSelect" ? (
        <div className="relative">
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
          />
          {isOpen && searchOptions && (
            <div className="absolute w-full z-10 bg-white border border-gray-300 rounded-md mt-1 shadow-lg">
              {searchOptions
                .filter((option) =>
                  option.label.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((option) => (
                  <div
                    key={option.id}
                    className="px-3 py-2 cursor-pointer hover:bg-green-100"
                    onClick={() => {
                      setSearchTerm(option.label);
                      setIsOpen(false);
                    }}
                  >
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      )}
    </div>
  );
};

// FarmerDataForm Component
const FarmerDataForm = () => (
  <div className="bg-white p-6 rounded-lg shadow-md w-full lg:max-w-2xl">
    <h2 className="text-green-700 text-lg font-semibold border-b border-gray-200 pb-2 mb-4">
      Monthly Data by Farmers
    </h2>
    <form className="space-y-4">
      <FormField label="Farmer ID" id="farmer-id" type="searchSelect" searchOptions={farmers} />
      <FormField label="Crop Name" id="farmer-crop-name" type="select" options={crops} />
      <FormField label="Region" id="farmer-region" type="select" options={regions} />
      <FormField label="Area of the Crop" id="farmer-area" type="number" placeholder="Enter area" unit="Perchase" />
      <FormField label="Planted Quantity" id="farmer-planted" type="number" placeholder="Enter quantity" unit="kg" />
      <FormField label="Harvested Quantity" id="farmer-harvested" type="number" placeholder="Enter quantity" unit="kg" />
      <FormField label="Sold Amount" id="farmer-sold" type="number" placeholder="Enter amount" unit="kg" />
      <FormField label="Wasted Quantity" id="farmer-wasted" type="number" placeholder="Enter quantity" unit="kg" />
      <FormField label="Harvest Shortfall" id="farmer-shortfall" type="number" placeholder="Enter quantity" unit="kg" />
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition"
      >
        <Send size={16} /> Submit Farmer Data
      </button>
    </form>
  </div>
);

// FarmerDataCollection Component
const FarmerDataCollection = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="flex items-center gap-3 mb-6">
        <Leaf className="text-green-600" size={32} />
        <h1 className="text-2xl font-bold text-green-700">CropSync Data Collection</h1>
      </header>
      <div className="flex flex-wrap gap-6">
        <FarmerDataForm />
      </div>
    </div>
  );
};

export default FarmerDataCollection;
