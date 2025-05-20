import React, { useState, useEffect } from "react";
import { Send, Leaf, HelpCircle } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// Sample Data
const regions = ["Kurunegal", "Kandy", "Gampola", "Monaragala", "Colombo"];

interface Farmer {
  _id: string;
  farmerName: string;
  idNumber: string;
  region: string;
  crops: Array<{
    name: string;
    area: number;
  }>;
}

interface FormData {
  farmerId: string;
  farmerName: string;
  cropName: string;
  area: number;
  planted: number;
  harvested: number;
  wasted: number;
  harvestShortfall: number;
  yield: number;
  pricePerKilo: number;
  date: string;
  season: string;
  region: string;
  notes?: string;
}

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
  value,
  onChange,
}: {
  label: string;
  id: string;
  type: "text" | "number" | "select" | "searchSelect" | "date";
  placeholder?: string;
  tooltip?: string;
  options?: string[];
  unit?: string;
  searchOptions?: { id: string; label: string }[];
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
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
          value={value as string}
          onChange={onChange}
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
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

// FarmerDataForm Component
const FarmerDataForm = () => {
  const navigate = useNavigate();
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
  const [formData, setFormData] = useState<FormData>({
    farmerId: "",
    farmerName: "",
    cropName: "",
    area: 0,
    planted: 0,
    harvested: 0,
    wasted: 0,
    harvestShortfall: 0,
    yield: 0,
    pricePerKilo: 0,
    date: new Date().toISOString().split('T')[0],
    season: "",
    region: "",
    notes: ""
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFarmers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/farmer-data/farmers');
        setFarmers(response.data);
      } catch (err) {
        toast.error("Failed to fetch farmers");
        console.error(err);
      }
    };
    fetchFarmers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/farmer-data', formData);
      
      toast.success("Farmer data successfully recorded!", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#10B981",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
        },
      });

      // Reset form
      setFormData({
        farmerId: "",
        farmerName: "",
        cropName: "",
        area: 0,
        planted: 0,
        harvested: 0,
        wasted: 0,
        harvestShortfall: 0,
        yield: 0,
        pricePerKilo: 0,
        date: new Date().toISOString().split('T')[0],
        season: "",
        region: "",
        notes: ""
      });
      setSelectedFarmer(null);

      setTimeout(() => {
        navigate('/fdata-collection');
      }, 2000);

    } catch (err) {
      toast.error("Failed to submit farmer data. Please try again.", {
        duration: 4000,
        position: "top-center",
        style: {
          background: "#EF4444",
          color: "#fff",
          padding: "16px",
          borderRadius: "8px",
        },
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFarmerSelect = (farmer: Farmer) => {
    setSelectedFarmer(farmer);
    setFormData(prev => ({
      ...prev,
      farmerId: farmer._id,
      farmerName: farmer.farmerName,
      region: farmer.region,
      cropName: "", // Reset crop name when farmer changes
      area: 0 // Reset area when farmer changes
    }));
  };

  const handleCropSelect = (cropName: string) => {
    const selectedCrop = selectedFarmer?.crops.find(crop => crop.name === cropName);
    setFormData(prev => ({
      ...prev,
      cropName,
      area: selectedCrop?.area || 0
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full lg:max-w-2xl">
      <h2 className="text-green-700 text-lg font-semibold border-b border-gray-200 pb-2 mb-4">
        Monthly Data by Farmers
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="font-semibold flex-1 text-gray-700 mb-1 block">Farmer</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedFarmer?._id || ""}
            onChange={(e) => {
              const farmer = farmers.find(f => f._id === e.target.value);
              if (farmer) handleFarmerSelect(farmer);
            }}
          >
            <option value="">Select a farmer</option>
            {farmers.map((farmer) => (
              <option key={farmer._id} value={farmer._id}>
                {farmer.farmerName} ({farmer.idNumber})
              </option>
            ))}
          </select>
        </div>

        {selectedFarmer && selectedFarmer.crops && selectedFarmer.crops.length > 0 && (
          <FormField 
            label="Crop Name" 
            id="cropName" 
            type="select" 
            options={selectedFarmer.crops.map(crop => crop.name)}
            value={formData.cropName}
            onChange={(e) => handleCropSelect(e.target.value)}
          />
        )}

        {selectedFarmer && (!selectedFarmer.crops || selectedFarmer.crops.length === 0) && (
          <div className="text-yellow-600 bg-yellow-50 p-3 rounded-md">
            No crops registered for this farmer. Please register crops in the farmer's profile first.
          </div>
        )}

        <FormField 
          label="Region" 
          id="region" 
          type="select" 
          options={regions}
          value={formData.region}
          onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
        />

        <FormField 
          label="Area (Perches)" 
          id="area" 
          type="number" 
          placeholder="Enter area"
          value={formData.area}
          onChange={(e) => setFormData(prev => ({ ...prev, area: parseFloat(e.target.value) }))}
        />

        <FormField 
          label="Planted Amount (kg)" 
          id="planted" 
          type="number" 
          placeholder="Enter planted amount"
          value={formData.planted}
          onChange={(e) => setFormData(prev => ({ ...prev, planted: parseFloat(e.target.value) }))}
        />

        <FormField 
          label="Harvested Amount (kg)" 
          id="harvested" 
          type="number" 
          placeholder="Enter harvested amount"
          value={formData.harvested}
          onChange={(e) => setFormData(prev => ({ ...prev, harvested: parseFloat(e.target.value) }))}
        />

        <FormField 
          label="Wasted Amount (kg)" 
          id="wasted" 
          type="number" 
          placeholder="Enter wasted amount"
          value={formData.wasted}
          onChange={(e) => setFormData(prev => ({ ...prev, wasted: parseFloat(e.target.value) }))}
        />

        <FormField 
          label="Harvest Shortfall (kg)" 
          id="harvestShortfall" 
          type="number" 
          placeholder="Enter harvest shortfall"
          value={formData.harvestShortfall}
          onChange={(e) => setFormData(prev => ({ ...prev, harvestShortfall: parseFloat(e.target.value) }))}
        />

        <FormField 
          label="Yield (kg)" 
          id="yield" 
          type="number" 
          placeholder="Enter yield"
          value={formData.yield}
          onChange={(e) => setFormData(prev => ({ ...prev, yield: parseFloat(e.target.value) }))}
        />

        <FormField 
          label="Price per Kilo" 
          id="pricePerKilo" 
          type="number" 
          placeholder="Enter price per kilo"
          unit="LKR"
          value={formData.pricePerKilo}
          onChange={(e) => setFormData(prev => ({ ...prev, pricePerKilo: parseFloat(e.target.value) }))}
        />

        <FormField 
          label="Date" 
          id="date" 
          type="date"
          value={formData.date}
          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
        />

        <FormField 
          label="Season" 
          id="season" 
          type="select" 
          options={["Yala", "Maha"]}
          value={formData.season}
          onChange={(e) => setFormData(prev => ({ ...prev, season: e.target.value }))}
        />

        <FormField 
          label="Notes" 
          id="notes" 
          type="text" 
          placeholder="Additional notes"
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-md transition disabled:bg-green-400"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send size={16} /> Submit Farmer Data
            </>
          )}
        </button>
      </form>
    </div>
  );
};

// FarmerDataCollection Component
const FarmerDataCollection = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <header className="flex items-center mb-6">
        <div className="flex items-center gap-3">
          <Leaf className="text-green-600" size={32} />
          <h1 className="text-2xl font-bold text-green-700">CropSync Data Collection</h1>
        </div>
      </header>
      <div className="flex flex-wrap gap-6">
        <FarmerDataForm />
      </div>
    </div>
  );
};

export default FarmerDataCollection;
