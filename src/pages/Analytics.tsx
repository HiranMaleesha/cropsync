import React, { useState } from "react";

const Analytics: React.FC = () => {
    const [showCustomDateRange, setShowCustomDateRange] = useState(false);
    const [showProjections, setShowProjections] = useState(false);

    return (
        <div className="max-w-screen-xl mx-auto p-5 font-sans bg-gray-100">
            {/* Header */}
            <header className="flex flex-wrap justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-green-900 mb-1">
                        Agricultural Analytics Dashboard
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Comprehensive insights into agricultural trends and performance metrics
                    </p>
                </div>

                <button className="bg-amber-500 text-white border-none rounded px-4 py-2 text-sm font-medium cursor-pointer">
                    Generate PDF Report
                </button>
            </header>

            {/* Filters Section */}
            <div className="flex flex-wrap items-center gap-4 mb-5">
                <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-500">Region:</span>
                    <select className="px-3 py-2 rounded text-sm bg-white border border-gray-300">
                        <option value="all">All Regions</option>
                        <option value="north">Northern Region</option>
                        <option value="south">Southern Region</option>
                        <option value="east">Eastern Region</option>
                        <option value="west">Western Region</option>
                        <option value="central">Central Region</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-500">Crop Type:</span>
                    <select className="px-3 py-2 rounded text-sm bg-white border border-gray-300">
                        <option value="all">All Crops</option>
                        <option value="maize">Maize</option>
                        <option value="rice">Rice</option>
                        <option value="wheat">Wheat</option>
                        <option value="soybean">Soybean</option>
                        <option value="cotton">Cotton</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-gray-500">Time Period:</span>
                    <select
                        className="px-3 py-2 rounded text-sm bg-white border border-gray-300"
                        onChange={(e) => setShowCustomDateRange(e.target.value === "custom")}
                    >
                        <option value="year">Past Year</option>
                        <option value="6months">Past 6 Months</option>
                        <option value="quarter">Past Quarter</option>
                        <option value="custom">Custom Range</option>
                    </select>
                </div>

                {showCustomDateRange && (
                    <div className="flex gap-2">
                        <input type="date" className="px-2 py-2 border border-gray-300 rounded" />
                        <span>to</span>
                        <input type="date" className="px-2 py-2 border border-gray-300 rounded" />
                    </div>
                )}

                <button className="bg-green-700 text-white border-none rounded px-4 py-2 text-sm font-medium cursor-pointer">
                    Apply Filters
                </button>
            </div>

            {/* Statistics Section */}
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total Production", value: "1.2M tons", trend: "↑ 7.5%", trendColor: "text-green-500" },
                    { title: "Average Yield", value: "4.8 t/ha", trend: "↑ 3.2%", trendColor: "text-green-500" },
                    { title: "Cultivated Area", value: "248,560 ha", trend: "↑ 5.1%", trendColor: "text-green-500" },
                    { title: "Average Price", value: "$356/ton", trend: "↓ 2.8%", trendColor: "text-red-500" }
                ].map((stat, index) => (
                    <div key={index} className="bg-white rounded shadow p-4">
                        <div className="text-gray-500 text-sm mb-1">{stat.title}</div>
                        <div className="text-xl font-bold mb-1">{stat.value}</div>
                        <div className={`text-sm ${stat.trendColor}`}>{stat.trend}</div>
                    </div>
                ))}
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center mt-6">
                <input
                    type="checkbox"
                    id="toggleSwitch"
                    checked={showProjections}
                    onChange={() => setShowProjections(!showProjections)}
                    className="w-5 h-5 text-green-700 cursor-pointer"
                />
                <label htmlFor="toggleSwitch" className="text-sm ml-2">Show Projections</label>
            </div>

            {/* Placeholder for Charts */}
            <div className="bg-white rounded shadow p-5 mt-6">
                <h2 className="text-lg font-semibold">Charts and Graphs Go Here</h2>
            </div>
        </div>
    );
};

export default Analytics;
