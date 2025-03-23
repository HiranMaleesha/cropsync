import React, { useState, useEffect } from "react";

interface FormData {
  farmer: string;
  crop: string;
  region: string;
  area: number;
  plantedQuantity: number;
  harvestedQuantity: number;
  destroyedQuantity: number;
  soldAmount: number;
  wastedQuantity: number;
}

const styles = {
  container: { maxWidth: "800px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" },
  header: { display: "flex", alignItems: "center", marginBottom: "30px" },
  logo: { width: "50px", height: "50px", backgroundColor: "#2e7d32", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", marginRight: "15px" },
  logoIcon: { color: "white", fontSize: "24px" },
  card: { backgroundColor: "white", borderRadius: "8px", padding: "25px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", marginBottom: "20px" },
  input: { width: "100%", padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ddd" },
  buttonPrimary: { padding: "12px 24px", backgroundColor: "#2e7d32", color: "white", border: "none", fontSize: "16px", cursor: "pointer", borderRadius: "4px" },
  buttonSecondary: { padding: "12px 24px", backgroundColor: "#f1f1f1", border: "none", fontSize: "16px", cursor: "pointer", borderRadius: "4px" },
  formRow: { marginBottom: "15px" },
};

const InputField: React.FC<{ label: string; name: string; value: number | string; type?: string; onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void; readOnly?: boolean }> = ({ label, name, value, type = "text", onChange, readOnly }) => (
  <div style={styles.formRow}>
    <label>{label}:</label>
    <input type={type} name={name} value={value} onChange={onChange} readOnly={readOnly} style={styles.input} />
  </div>
);

const SelectField: React.FC<{ label: string; name: string; value: string; options: { value: string; label: string }[]; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }> = ({ label, name, value, options, onChange }) => (
  <div style={styles.formRow}>
    <label>{label}:</label>
    <select name={name} value={value} onChange={onChange} style={styles.input}>
      <option value="">Select {label.toLowerCase()}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

const DataCollection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    farmer: "",
    crop: "",
    region: "Kurunegala",
    area: 0,
    plantedQuantity: 0,
    harvestedQuantity: 0,
    destroyedQuantity: 0,
    soldAmount: 0,
    wastedQuantity: 0,
  });

  useEffect(() => {
    const { harvestedQuantity, destroyedQuantity, soldAmount } = formData;
    setFormData((prev) => ({ ...prev, wastedQuantity: Math.max(0, harvestedQuantity - destroyedQuantity - soldAmount) }));
  }, [formData.harvestedQuantity, formData.destroyedQuantity, formData.soldAmount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name.includes("Quantity") || name === "area" ? parseFloat(value) || 0 : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Data submitted successfully!");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🌱</span>
        </div>
        <h1 style={{ color: "#005005", fontSize: "24px" }}>CropSync Data Entry</h1>
      </header>

      <main>
        <div style={styles.card}>
          <h2 style={{ fontSize: "18px", color: "#005005", marginBottom: "20px" }}>📝 Crop Data Entry Form</h2>
          <form onSubmit={handleSubmit}>
            <SelectField label="Farmer" name="farmer" value={formData.farmer} onChange={handleChange} options={[{ value: "1", label: "Kumara Bandara" }, { value: "2", label: "Sunil Perera" }]} />
            <SelectField label="Crop" name="crop" value={formData.crop} onChange={handleChange} options={[{ value: "long_bean", label: "Long Bean" }, { value: "corn", label: "Corn" }]} />
            <InputField label="Region" name="region" value={formData.region} readOnly />
            <InputField label="Area (Acres)" name="area" value={formData.area} type="number" onChange={handleChange} />
            <InputField label="Harvested Quantity (kg)" name="harvestedQuantity" value={formData.harvestedQuantity} type="number" onChange={handleChange} />
            <InputField label="Sold Amount (kg)" name="soldAmount" value={formData.soldAmount} type="number" onChange={handleChange} />
            <InputField label="Destroyed Before Sales (kg)" name="destroyedQuantity" value={formData.destroyedQuantity} type="number" onChange={handleChange} />
            <InputField label="Wasted Quantity (kg)" name="wastedQuantity" value={formData.wastedQuantity} type="number" readOnly />

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <button type="button" style={styles.buttonSecondary}>Cancel</button>
              <button type="submit" style={styles.buttonPrimary}>Submit Data</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default DataCollection;
