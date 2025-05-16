// Users.tsx (FarmerProfile.tsx)
import React, { useEffect, useState } from "react";
import axios from "axios";
import FarmerDetails from "./farmerDetails";

// Define the Farmer type
type Farmer = {
  _id: string;
  farmerName: string;
  idNumber: string;
  phoneNumber: string;
  region: string;
  crops: Array<{
    name: string;
    area: number;
  }>;
  createdAt: string;
  updatedAt: string;
};

interface FarmerProfileProps {
  onNavigate?: (page: string) => void;
}

const API_URL = "http://localhost:5000/api/farmers";

const FarmerProfile: React.FC<FarmerProfileProps> = ({ onNavigate }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [farmers, setFarmers] = useState<Farmer[]>([]);

  const fetchFarmers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setFarmers(response.data);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error fetching farmers");
      setFarmers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this farmer?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        setFarmers(farmers.filter(farmer => farmer._id !== id));
      } catch (err: any) {
        setError(err.response?.data?.message || "Error deleting farmer");
      }
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5">
      <header className="bg-green-700 text-white p-4 text-center rounded mb-6">
        <h1 className="text-2xl font-bold">Farmer Profiles</h1>
      </header>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farmers.length > 0 ? (
          farmers.map((farmer) => (
            <FarmerDetails
              key={farmer._id}
              farmer={farmer}
              onDelete={() => handleDelete(farmer._id)}
              onRefresh={fetchFarmers}
              onNavigate={onNavigate}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-600">
            No farmers found
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerProfile;