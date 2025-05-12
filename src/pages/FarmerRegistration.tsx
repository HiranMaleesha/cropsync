import React, { useState } from "react";

const FarmerRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    farmerName: "",
    idNumber: "",
    phoneNumber: "",
    region: "",
    crops: [{ id: 1, name: "", area: "" }],
  });

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

  const handleSubmit = () => {
    console.log("Form Data:", formData);
    alert("Farmer Registered Successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto p-5 font-sans">
      <header className="bg-green-700 text-white p-4 text-center rounded">
        <h1 className="text-2xl font-bold">Farmer Registration System</h1>
      </header>

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
            className="bg-green-700 text-white px-5 py-2 rounded"
          >
            Register Farmer
          </button>
          <button
            onClick={() =>
              setFormData({
                farmerName: "",
                idNumber: "",
                phoneNumber: "",
                region: "",
                crops: [{ id: 1, name: "", area: "" }],
              })
            }
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
