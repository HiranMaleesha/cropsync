import React from "react";
export function RegionalMap() {
  // In a real implementation, this would use a mapping library like Leaflet
  return (
    <div className="relative h-72 bg-gray-100 rounded-md overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-2">Interactive Map</p>
          <p className="text-sm text-gray-400">
            Regional agricultural activity visualization would be displayed here
          </p>
        </div>
      </div>
      {/* These would be actual map markers in the real implementation */}
      <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-green-500 rounded-full"></div>
      <div className="absolute top-1/3 left-1/2 w-6 h-6 bg-green-600 rounded-full"></div>
      <div className="absolute top-1/2 left-1/4 w-5 h-5 bg-green-400 rounded-full"></div>
      <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-amber-500 rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-green-500 rounded-full"></div>
    </div>
  );
}
