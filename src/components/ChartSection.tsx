import React from "react";
interface ChartSectionProps {
  type: "bar" | "line" | "pie";
}
export function ChartSection({ type }: ChartSectionProps) {
  // In a real implementation, this would use a charting library like Recharts
  return (
    <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
      <div className="text-center">
        <p className="text-gray-500 mb-2">
          {type === "bar"
            ? "Bar Chart"
            : type === "line"
              ? "Line Chart"
              : "Pie Chart"}
        </p>
        <p className="text-sm text-gray-400">
          Data visualization would be displayed here
        </p>
      </div>
    </div>
  );
}
