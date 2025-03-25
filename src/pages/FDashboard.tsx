import React from "react";

const FDashboard: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  };

  const sidebarStyle: React.CSSProperties = {
    width: "250px",
    backgroundColor: "#3c6e30",
    color: "white",
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
  };

  const sidebarItemStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  };

  const sidebarItemHover = {
    backgroundColor: "rgba(255,255,255,0.1)",
  };

  const activeItemStyle = {
    backgroundColor: "rgba(255,255,255,0.2)",
  };

  const mainContentStyle: React.CSSProperties = {
    flexGrow: 1,
    padding: "30px",
  };

  const weatherCardStyle: React.CSSProperties = {
    backgroundColor: "#4d8a3d",
    color: "white",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "25px",
    display: "flex",
    alignItems: "center",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    marginBottom: "15px",
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  };

  const cardHoverStyle = {
    transform: "translateY(-3px)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  };

  const cardIconStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "15px",
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <div style={{ padding: "0 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.2)", marginBottom: "20px" }}>
          <div style={{ fontSize: "24px", fontWeight: "bold" }}>CropSync</div>
          <div style={{ fontSize: "14px", opacity: 0.8 }}>Smart farming at your fingertips</div>
        </div>
        <div>
          {[
            { icon: "📊", label: "Dashboard", active: true },
            { icon: "🌱", label: "Recommendations" },
            { icon: "📈", label: "Farm Data" },
            { icon: "👨‍🌾", label: "Farmer Profile" },
            { icon: "🗓️", label: "Schedule" },
            { icon: "⚙️", label: "Settings" },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                ...sidebarItemStyle,
                ...(item.active ? activeItemStyle : {}),
              }}
            >
              <div style={{ width: "24px", height: "24px", marginRight: "15px" }}>{item.icon}</div>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      <div style={mainContentStyle}>
        <div style={weatherCardStyle}>
          <div style={{ fontSize: "28px", marginRight: "15px" }}>☀️</div>
          <div>
            <h2 style={{ margin: "0 0 5px 0", fontSize: "20px" }}>Good morning, Thomas</h2>
            <div style={{ fontSize: "14px" }}>72°F | Clear skies | Wind: 5 mph NE</div>
          </div>
        </div>

        {[
          { icon: "🌱", title: "View Recommendations", description: "Crop insights and weekly tasks", bgColor: "#e8f5e9", color: "#4caf50" },
          { icon: "📊", title: "My Farm Data", description: "Fields, crops, and analytics", bgColor: "#e3f2fd", color: "#2196f3" },
          { icon: "👨‍🌾", title: "Farmer Profile", description: "Your account and preferences", bgColor: "#fff3e0", color: "#ff9800" },
        ].map((card, index) => (
          <div key={index} style={cardStyle}>
            <div style={{ ...cardIconStyle, backgroundColor: card.bgColor, color: card.color }}>{card.icon}</div>
            <div>
              <h3 style={{ margin: "0 0 5px 0", fontSize: "18px", color: "#333" }}>{card.title}</h3>
              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FDashboard;
