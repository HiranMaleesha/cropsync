import React from "react";

const mainContentStyle: React.CSSProperties = {
  width: "100vw", // Full width of viewport
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "15px 20px",
  borderBottom: "1px solid #e0e0e0",
  backgroundColor: "white",
};

const recommendationsHeaderStyle: React.CSSProperties = {
  backgroundColor: "#e8f5e9",
  padding: "18px 20px",
  margin: "20px",
  borderRadius: "8px",
  color: "#2e7d32",
  fontSize: "20px",
  fontWeight: 500,
  textAlign: "center",
};

const cardsContainerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "25px",
  padding: "0 20px 20px",
};

const cropCardStyle: React.CSSProperties = {
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  overflow: "hidden",
};

const cropHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px",
  borderBottom: "1px solid #f0f0f0",
};

const CropCard = ({
  name,
  priority,
  priorityColor,
  seeds,
  plantingTime,
  yieldInfo,
  image,
}: {
  name: string;
  priority: string;
  priorityColor: string;
  seeds: string;
  plantingTime: string;
  yieldInfo: string;
  image: string;
}) => (
  <div style={cropCardStyle}>
    <div style={cropHeaderStyle}>
      <div style={{ fontSize: "24px", fontWeight: 600, color: "#333" }}>{name}</div>
      <div style={{ fontSize: "16px", fontWeight: 500, padding: "6px 12px", borderRadius: "20px", backgroundColor: priorityColor }}>
        {priority}
      </div>
    </div>
    <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
      <img src={image} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", left: "20px", bottom: "20px", backgroundColor: "rgba(255, 255, 255, 0.9)", padding: "10px 15px", borderRadius: "8px", fontSize: "18px", fontWeight: 600 }}>
        {seeds}
      </div>
    </div>
    <div style={{ padding: "25px", backgroundColor: "#f9f9f9" }}>
      <div style={{ marginBottom: "15px", fontSize: "16px", color: "#333", lineHeight: "1.5" }}>
        <strong>Seeds needed:</strong> {seeds}
      </div>
      <div style={{ marginBottom: "15px", fontSize: "16px", color: "#333", lineHeight: "1.5" }}>
        <strong>Ideal planting time:</strong> {plantingTime}
      </div>
      <div style={{ fontSize: "16px", color: "#333", lineHeight: "1.5" }}>
        <strong>Expected yield:</strong> {yieldInfo}
      </div>
    </div>
  </div>
);

const Header = () => (
  <div style={headerStyle}>
    <div style={{ fontSize: "20px", fontWeight: 500, color: "#333" }}>Planting Recommendations</div>
    <div style={{ display: "flex", alignItems: "center" }}>
      <button style={{ backgroundColor: "#f5f5f5", border: "1px solid #ddd", borderRadius: "4px", padding: "8px 12px", marginRight: "10px", cursor: "pointer" }}>
        Filter ▼
      </button>
      <input type="text" placeholder="Search crops..." style={{ border: "1px solid #ddd", borderRadius: "20px", padding: "8px 12px", background: "#f5f5f5", width: "200px" }} />
    </div>
  </div>
);

const Frecommendations = () => {
  return (
    <div style={mainContentStyle}>
      <Header />
      <div style={recommendationsHeaderStyle}>Recommendations for April 2025</div>
      <div style={cardsContainerStyle}>
        <CropCard name="Tomato" priority="High Priority" priorityColor="#ffebee" seeds="200g" plantingTime="First week of April" yieldInfo="65kg per 10 sq. meters" image="/api/placeholder/400/320" />
        <CropCard name="Corn" priority="Medium Priority" priorityColor="#fff3e0" seeds="1.5kg" plantingTime="Mid-April" yieldInfo="35kg per 10 sq. meters" image="/api/placeholder/400/320" />
        <CropCard name="Carrot" priority="High Priority" priorityColor="#ffebee" seeds="50g" plantingTime="Early April" yieldInfo="25kg per 10 sq. meters" image="/api/placeholder/400/320" />
        <CropCard name="Lettuce" priority="Low Priority" priorityColor="#e8f5e9" seeds="25g" plantingTime="Throughout April" yieldInfo="15kg per 10 sq. meters" image="/api/placeholder/400/320" />
      </div>
    </div>
  );
};

export default Frecommendations;
