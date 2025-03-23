import React, { useState } from "react";

const Analytics: React.FC = () => {
    const [showCustomDateRange, setShowCustomDateRange] = useState(false);
    const [showProjections, setShowProjections] = useState(false);

    return (
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "20px", fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#f5f5f5" }}>
            {/* Header */}
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", marginBottom: "30px" }}>
                <div>
                    <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#005005", marginBottom: "5px" }}>
                        Agricultural Analytics Dashboard
                    </h1>
                    <p style={{ color: "#757575", fontSize: "16px" }}>
                        Comprehensive insights into agricultural trends and performance metrics
                    </p>
                </div>

                <button style={{
                    backgroundColor: "#ffa000", color: "white", border: "none", borderRadius: "4px",
                    padding: "10px 16px", fontSize: "14px", fontWeight: 500, cursor: "pointer"
                }}>
                    Generate PDF Report
                </button>
            </header>

            {/* Filters Section */}
            <div style={{ display: "flex", gap: "15px", alignItems: "center", flexWrap: "wrap", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: 500, fontSize: "14px", color: "#757575" }}>Region:</span>
                    <select style={{ padding: "8px 12px", borderRadius: "4px", fontSize: "14px", backgroundColor: "white", border: "1px solid #ddd" }}>
                        <option value="all">All Regions</option>
                        <option value="north">Northern Region</option>
                        <option value="south">Southern Region</option>
                        <option value="east">Eastern Region</option>
                        <option value="west">Western Region</option>
                        <option value="central">Central Region</option>
                    </select>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: 500, fontSize: "14px", color: "#757575" }}>Crop Type:</span>
                    <select style={{ padding: "8px 12px", borderRadius: "4px", fontSize: "14px", backgroundColor: "white", border: "1px solid #ddd" }}>
                        <option value="all">All Crops</option>
                        <option value="maize">Maize</option>
                        <option value="rice">Rice</option>
                        <option value="wheat">Wheat</option>
                        <option value="soybean">Soybean</option>
                        <option value="cotton">Cotton</option>
                    </select>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: 500, fontSize: "14px", color: "#757575" }}>Time Period:</span>
                    <select style={{ padding: "8px 12px", borderRadius: "4px", fontSize: "14px", backgroundColor: "white", border: "1px solid #ddd" }}
                        onChange={(e) => setShowCustomDateRange(e.target.value === "custom")}>
                        <option value="year">Past Year</option>
                        <option value="6months">Past 6 Months</option>
                        <option value="quarter">Past Quarter</option>
                        <option value="custom">Custom Range</option>
                    </select>
                </div>

                {showCustomDateRange && (
                    <div style={{ display: "flex", gap: "10px" }}>
                        <input type="date" style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }} />
                        <span>to</span>
                        <input type="date" style={{ padding: "8px", border: "1px solid #ddd", borderRadius: "4px" }} />
                    </div>
                )}

                <button style={{
                    backgroundColor: "#2e7d32", color: "white", border: "none", borderRadius: "4px",
                    padding: "10px 16px", fontSize: "14px", fontWeight: 500, cursor: "pointer"
                }}>
                    Apply Filters
                </button>
            </div>

            {/* Statistics Section */}
            <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
                {[
                    { title: "Total Production", value: "1.2M tons", trend: "↑ 7.5%", trendColor: "#4caf50" },
                    { title: "Average Yield", value: "4.8 t/ha", trend: "↑ 3.2%", trendColor: "#4caf50" },
                    { title: "Cultivated Area", value: "248,560 ha", trend: "↑ 5.1%", trendColor: "#4caf50" },
                    { title: "Average Price", value: "$356/ton", trend: "↓ 2.8%", trendColor: "#f44336" }
                ].map((stat, index) => (
                    <div key={index} style={{
                        backgroundColor: "white", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)", padding: "15px"
                    }}>
                        <div style={{ color: "#757575", fontSize: "14px", marginBottom: "8px" }}>{stat.title}</div>
                        <div style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px" }}>{stat.value}</div>
                        <div style={{ fontSize: "14px", color: stat.trendColor }}>{stat.trend}</div>
                    </div>
                ))}
            </div>

            {/* Toggle Switch */}
            <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                <input type="checkbox" id="toggleSwitch" checked={showProjections} onChange={() => setShowProjections(!showProjections)}
                    style={{ width: "40px", height: "20px", cursor: "pointer", backgroundColor: showProjections ? "#2e7d32" : "#ccc", borderRadius: "20px", position: "relative" }} />
                <label htmlFor="toggleSwitch" style={{ fontSize: "14px", marginLeft: "10px" }}>Show Projections</label>
            </div>

            {/* Placeholder for Charts */}
            <div style={{ backgroundColor: "white", borderRadius: "8px", padding: "20px", marginTop: "20px", boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" }}>
                <h2>Charts and Graphs Go Here</h2>
            </div>
        </div>
    );
};

export default Analytics;
