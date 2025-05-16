// FarmerDetails.tsx
import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "http://localhost:5000/api/farmers";

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

type Props = {
  farmer: Farmer;
  onDelete: () => void;
  onRefresh: () => void;
  onNavigate?: (page: string) => void;
};

const FarmerDetails: React.FC<Props> = ({ farmer, onDelete, onRefresh, onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Farmer>(farmer);
  const [error, setError] = useState("");

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(farmer);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`${API_URL}/${farmer._id}`, {
        farmerName: editedData.farmerName,
        phoneNumber: editedData.phoneNumber,
        region: editedData.region,
        crops: editedData.crops
      });

      if (response.data) {
        setIsEditing(false);
        onRefresh();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Error updating farmer");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(farmer);
    setError("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCropChange = (index: number, field: 'name' | 'area', value: string) => {
    const newCrops = [...editedData.crops];
    newCrops[index] = {
      ...newCrops[index],
      [field]: field === 'area' ? Number(value) : value
    };
    setEditedData(prev => ({
      ...prev,
      crops: newCrops
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="farmerName"
              value={editedData.farmerName}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={editedData.phoneNumber}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Region</label>
            <select
              name="region"
              value={editedData.region}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="Northern">Northern</option>
              <option value="Eastern">Eastern</option>
              <option value="Western">Western</option>
              <option value="Southern">Southern</option>
              <option value="Central">Central</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Crops</label>
            {editedData.crops.map((crop, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 mb-2">
                <input
                  type="text"
                  value={crop.name}
                  onChange={(e) => handleCropChange(index, 'name', e.target.value)}
                  placeholder="Crop name"
                  className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
                <input
                  type="number"
                  value={crop.area}
                  onChange={(e) => handleCropChange(index, 'area', e.target.value)}
                  placeholder="Area"
                  className="rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{farmer.farmerName}</h3>
            <p className="text-sm text-gray-500">ID: {farmer.idNumber}</p>
          </div>

          <div className="space-y-2">
            <p><span className="font-medium">Phone:</span> {farmer.phoneNumber}</p>
            <p><span className="font-medium">Region:</span> {farmer.region}</p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Crops</h4>
            <div className="space-y-2">
              {farmer.crops.map((crop, index) => (
                <div key={index} className="text-sm">
                  <p>{crop.name} - {crop.area} hectares</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-2 pt-4">
            <button
              onClick={handleEdit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDetails;