import React, { useState } from "react";
import { Send, Leaf, HelpCircle } from "lucide-react";

// Sample Data
const regions = ["Kurunegal", "Kandy", "Gampola", "Monaragala", "Colombo"];
const crops = ["Green beans", "Long beans", "Tomatoes"];
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
        <label htmlFor={id} className="font-semibold flex-1">
          {label}
        </label>
        {tooltip && (
          <div className="relative inline-block">
            <HelpCircle size={16} />
          </div>
        )}
      </div>
      {type === "select" ? (
        <select
          id={id}
          className="w-full p-2 rounded border border-gray-300"
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
            className="w-full p-2 rounded border border-gray-300"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
          />
          {isOpen && searchOptions && (
            <div className="absolute bg-white border border-gray-300 rounded w-full z-10 max-h-40 overflow-auto">
              {searchOptions
                .filter((option) =>
                  option.label
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
                )
                .map((option) => (
                  <div
                    key={option.id}
                    className="p-2 cursor-pointer hover:bg-gray-100"
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
          className="w-full p-2 rounded border border-gray-300"
        />
      )}
    </div>
  );
};

// CropDataForm Component
const CropDataForm = () => (
  <div className="bg-white p-5 rounded-lg shadow flex-1 w-full md:w-[48%]">
    <h2 className="text-green-600 border-b-2 border-gray-300 pb-1 text-xl font-semibold mb-4">
      Monthly Data by Crop
    </h2>
    <form>
      <FormField label="Crop Name" id="crop-name" type="select" options={crops} />
      <FormField label="Region" id="crop-region" type="select" options={regions} />
      <FormField
        label="Area of the Crop in Whole Region"
        id="crop-area"
        type="number"
        placeholder="Enter area"
        unit="Acres"
      />
      <FormField
        label="Planted Quantity"
        id="crop-planted"
        type="number"
        placeholder="Enter quantity"
        unit="kg"
      />
      <FormField
        label="Sold Amount"
        id="crop-sold"
        type="number"
        placeholder="Enter amount"
        unit="kg"
      />
      <FormField
        label="Wasted Quantity"
        id="crop-wasted"
        type="number"
        placeholder="Enter quantity"
        unit="kg"
      />
      <FormField
        label="Harvest Shortfall"
        id="crop-harvested"
        type="number"
        placeholder="Enter quantity"
        unit="kg"
      />
      <FormField
        label="Price per 1 kg"
        id="crop-price"
        type="number"
        placeholder="Enter price"
        unit="$"
      />
      <button
        type="submit"
        className="w-full p-3 bg-green-600 text-white rounded mt-4 flex items-center justify-center gap-2 hover:bg-green-700 transition"
      >
        <Send size={16} />
        Submit Crop Data
      </button>
    </form>
  </div>
);

// Main CropDataCollection Component
const CropDataCollection = () => {
  return (
    <div className="max-w-5xl mx-auto p-5">
      <header className="flex items-center gap-2 mb-5">
        <Leaf color="green" size={32} />
        <h1 className="text-2xl text-green-600 font-bold">
          CropSync Data Collection
        </h1>
      </header>
      <div className="flex gap-5 flex-wrap">
        <CropDataForm />
      </div>
    </div>
  );
};

export default CropDataCollection;
