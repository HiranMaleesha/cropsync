import React, { useState } from "react";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const API_URL = "http://localhost:5000/api/farmers";

interface FarmerRegistrationProps {
  onNavigate?: (page: string) => void;
}

interface CropFormData {
  id: number;
  name: string;
  area: string;
}

interface CropApiData {
  name: string;
  area: number;
}

interface FarmerFormData {
  farmerName: string;
  idNumber: string;
  phoneNumber: string;
  region: string;
  email: string;
  password: string;
  crops: CropFormData[];
}

interface FarmerApiData {
  farmerName: string;
  idNumber: string;
  phoneNumber: string;
  region: string;
  email: string;
  firebaseUid: string;
  crops: CropApiData[];
}

const FarmerRegistration: React.FC<FarmerRegistrationProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<FarmerFormData>({
    farmerName: "",
    idNumber: "",
    phoneNumber: "",
    region: "",
    email: "",
    password: "",
    crops: [{ id: 1, name: "", area: "" }],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index?: number
  ) => {
    const { id, value } = e.target;
    if (index !== undefined) {
      const newCrops = [...formData.crops];
      newCrops[index] = { ...newCrops[index], [id]: value };
      setFormData({ ...formData, crops: newCrops });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const addCrop = () => {
    setFormData({
      ...formData,
      crops: [...formData.crops, { id: formData.crops.length + 1, name: "", area: "" }],
    });
  };

  const removeCrop = (index: number) => {
    const newCrops = formData.crops.filter((_, i) => i !== index);
    setFormData({ ...formData, crops: newCrops });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      // Validate form data
      if (!formData.farmerName || !formData.idNumber || !formData.phoneNumber || 
          !formData.region || !formData.email || !formData.password) {
        setError("Please fill in all required fields");
        return;
      }

      // Validate crops
      const invalidCrops = formData.crops.some(crop => !crop.name || !crop.area);
      if (invalidCrops) {
        setError("Please fill in all crop details");
        return;
      }

      try {
        // Create Firebase auth user
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // Format data for API
        const apiData: FarmerApiData = {
          farmerName: formData.farmerName,
          idNumber: formData.idNumber,
          phoneNumber: formData.phoneNumber,
          region: formData.region,
          email: formData.email,
          firebaseUid: userCredential.user.uid,
          crops: formData.crops.map(({ name, area }) => ({
            name,
            area: Number(area)
          }))
        };

        const response = await axios.post(API_URL, apiData);
        
        if (response.data) {
          alert("Farmer Registered Successfully!");
          onNavigate?.("farmer-profile");
        }
      } catch (firebaseErr: any) {
        // If Firebase auth succeeds but MongoDB save fails, we should clean up the Firebase user
        if (firebaseErr.response?.status === 400) {
          // Handle validation errors from backend
          const errorMessage = firebaseErr.response.data.message;
          if (firebaseErr.response.data.details) {
            setError(`${errorMessage}: ${firebaseErr.response.data.details.join(', ')}`);
          } else {
            setError(errorMessage);
          }
        } else if (firebaseErr.response?.status === 500) {
          setError("Server error while saving farmer data. Please try again.");
        } else {
          setError(firebaseErr.message || "Error registering farmer");
        }
        // TODO: Add cleanup of Firebase user if needed
      }
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError("This email is already registered. Please use a different email.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters long.");
      } else {
        setError(err.message || "Error registering farmer");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-5 font-sans">
      <header className="bg-green-700 text-white p-4 text-center rounded">
        <h1 className="text-2xl font-bold">Farmer Registration System</h1>
      </header>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <div className="bg-white p-6 mt-6 rounded shadow">
        <h2 className="text-xl font-semibold text-green-700 mb-4">Farmer Registration</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="farmerName" className="font-bold block mb-1">Full Name *</label>
            <input
              type="text"
              id="farmerName"
              value={formData.farmerName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter full name"
              required
            />
          </div>
          <div>
            <label htmlFor="idNumber" className="font-bold block mb-1">ID Number *</label>
            <input
              type="text"
              id="idNumber"
              value={formData.idNumber}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter ID number"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" className="font-bold block mb-1">Phone Number *</label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter phone number"
              required
            />
          </div>
          <div>
            <label htmlFor="region" className="font-bold block mb-1">Region *</label>
            <select
              id="region"
              value={formData.region}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">-- Select Region --</option>
              <option value="Northern">Northern</option>
              <option value="Eastern">Eastern</option>
              <option value="Western">Western</option>
              <option value="Southern">Southern</option>
              <option value="Central">Central</option>
            </select>
          </div>
          <div>
            <label htmlFor="email" className="font-bold block mb-1">Email Address *</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter email address"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="font-bold block mb-1">Password *</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter password"
              required
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-green-700 mb-2">Crop Information</h3>
        {formData.crops.map((crop, index) => (
          <div key={crop.id} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            <input
              type="text"
              id="name"
              placeholder="Crop Name"
              value={crop.name}
              onChange={(e) => handleInputChange(e, index)}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="number"
              id="area"
              placeholder="Area (Hectares)"
              value={crop.area}
              onChange={(e) => handleInputChange(e, index)}
              className="p-2 border border-gray-300 rounded"
              required
            />
            <button
              onClick={() => removeCrop(index)}
              className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={formData.crops.length === 1}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          onClick={addCrop}
          className="bg-green-600 text-white px-4 py-2 rounded mt-2"
        >
          + Add Crop
        </button>

        <div className="mt-6 space-x-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`bg-green-700 text-white px-5 py-2 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Registering...' : 'Register Farmer'}
          </button>
          <button
            onClick={() => {
              setFormData({
                farmerName: "",
                idNumber: "",
                phoneNumber: "",
                region: "",
                email: "",
                password: "",
                crops: [{ id: 1, name: "", area: "" }],
              });
              setError("");
            }}
            disabled={loading}
            className="bg-gray-200 text-gray-800 px-5 py-2 rounded"
          >
            Clear Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerRegistration;
