import React, { useState } from "react";

const FarmerRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    farmerName: "",
    idNumber: "",
    phoneNumber: "",
    region: "",
    crops: [{ id: 1, name: "", area: "" }],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index?: number) => {
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
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <header style={{ backgroundColor: "#1e8a4e", color: "white", padding: "15px", textAlign: "center" }}>
        <h1>Farmer Registration System</h1>
      </header>

      <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", marginTop: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <h2 style={{ color: "#1e8a4e" }}>Farmer Registration</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
          <div>
            <label htmlFor="farmerName" style={{ fontWeight: "bold" }}>Full Name *</label>
            <input
              type="text"
              id="farmerName"
              value={formData.farmerName}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
              placeholder="Enter full name"
              required
            />
          </div>
          <div>
            <label htmlFor="idNumber" style={{ fontWeight: "bold" }}>ID Number *</label>
            <input
              type="text"
              id="idNumber"
              value={formData.idNumber}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
              placeholder="Enter ID number"
              required
            />
          </div>
          <div>
            <label htmlFor="phoneNumber" style={{ fontWeight: "bold" }}>Phone Number *</label>
            <input
              type="tel"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
              placeholder="Enter phone number"
              required
            />
          </div>
          <div>
            <label htmlFor="region" style={{ fontWeight: "bold" }}>Region *</label>
            <select
              id="region"
              value={formData.region}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
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

        <h3 style={{ color: "#1e8a4e" }}>Crop Information</h3>
        {formData.crops.map((crop, index) => (
          <div key={crop.id} style={{ display: "grid", gridTemplateColumns: "2fr 1fr auto", gap: "10px", marginBottom: "10px" }}>
            <input
              type="text"
              id="name"
              placeholder="Crop Name"
              value={crop.name}
              onChange={(e) => handleInputChange(e, index)}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
              required
            />
            <input
              type="number"
              id="area"
              placeholder="Area (Hectares)"
              value={crop.area}
              onChange={(e) => handleInputChange(e, index)}
              style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "4px" }}
              required
            />
            <button
              onClick={() => removeCrop(index)}
              style={{
                backgroundColor: "#e53935",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              disabled={formData.crops.length === 1}
            >
              Remove
            </button>
          </div>
        ))}

        <button
          onClick={addCrop}
          style={{
            backgroundColor: "#43a047",
            color: "white",
            border: "none",
            padding: "10px 15px",
            borderRadius: "4px",
            cursor: "pointer",
            display: "block",
            margin: "10px 0",
          }}
        >
          + Add Crop
        </button>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#1e8a4e",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "4px",
              cursor: "pointer",
              marginRight: "10px",
            }}
          >
            Register Farmer
          </button>
          <button
            onClick={() => setFormData({ farmerName: "", idNumber: "", phoneNumber: "", region: "", crops: [{ id: 1, name: "", area: "" }] })}
            style={{
              backgroundColor: "#f1f3f4",
              color: "#212121",
              border: "none",
              padding: "10px 15px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Clear Form
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerRegistration;
