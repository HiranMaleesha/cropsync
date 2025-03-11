import React, { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  isPositiveChange?: boolean;
}
export function StatCard({
  title,
  value,
  change,
  icon,
  isPositiveChange = true,
}: StatCardProps) {
  const isNegativeChange = change.startsWith("-");
  const displayPositive = isNegativeChange
    ? isPositiveChange
    : !isPositiveChange;
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className="p-2 bg-gray-50 rounded-full">{icon}</div>
      </div>
      <div className="mt-2">
        <h3 className="text-xl font-bold text-gray-800">{value}</h3>
        <div className="flex items-center mt-1">
          {displayPositive ? (
            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span
            className={`text-xs font-medium ${displayPositive ? "text-green-500" : "text-red-500"}`}
          >
            {change}
          </span>
          <span className="text-xs text-gray-500 ml-1">vs last period</span>
        </div>
      </div>
    </div>
  );
}
