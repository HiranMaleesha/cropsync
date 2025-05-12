import React, { useState } from "react";

interface Farmer {
  id: string;
  name: string;
  location: string;
  crops: string[];
  acreage: number;
}

const initialFarmers: Farmer[] = [
  { id: "F001", name: "Punchi Appuhami", location: "Iowa", crops: ["Corn", "Soybeans"], acreage: 450 },
  { id: "F002", name: "Kamal Perera", location: "California", crops: ["Almonds", "Grapes"], acreage: 320 },
  { id: "F003", name: "Nimal Fernando", location: "Nebraska", crops: ["Wheat", "Barley"], acreage: 680 },
  { id: "F004", name: "Rohana Wickramasinghe", location: "Texas", crops: ["Cotton", "Sorghum"], acreage: 520 },
  { id: "F005", name: "Sunil Jayasinghe", location: "Oregon", crops: ["Apples", "Cherries"], acreage: 150 },
  { id: "F006", name: "Amara Silva", location: "Minnesota", crops: ["Corn", "Alfalfa"], acreage: 390 },
];

const FarmerProfile = () => {
  const [farmers, setFarmers] = useState<Farmer[]>(initialFarmers);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);

  const filteredFarmers = farmers.filter(
    (farmer) =>
      farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-700 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold">CropSync Farmer Profiles</h1>
      </header>

      {/* Main content */}
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar for filters */}
        {filterOpen && (
          <div className="w-64 bg-white p-4 border-r border-gray-200">
            <h2 className="font-semibold text-green-700 mb-4">Filters</h2>
            {/* Add filter options here */}
          </div>
        )}

        {/* Farmer list */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search bar */}
          <div className="bg-white p-4 flex justify-between border-b border-gray-200">
            <input
              type="text"
              placeholder="Search by name or ID..."
              className="w-full p-2 border border-gray-300 rounded"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Farmer cards */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredFarmers.map((farmer) => (
              <div
                key={farmer.id}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedFarmer(farmer)}
              >
                <h3 className="text-lg font-semibold text-gray-800">{farmer.name}</h3>
                <p className="text-gray-500">ID: {farmer.id}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Farmer details modal */}
        {selectedFarmer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full shadow-lg p-6">
              <h2 className="text-xl font-bold text-green-700">Farmer Details</h2>
              <h3 className="text-lg font-semibold text-gray-800 mt-4">{selectedFarmer.name}</h3>
              <p className="text-gray-500">ID: {selectedFarmer.id}</p>
              <button
                className="w-full mt-4 bg-green-700 text-white py-2 rounded hover:bg-green-800 transition-colors"
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
