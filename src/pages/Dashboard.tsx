import React from "react";
import {
  TrendingUp,
  Users,
  Leaf,
  AlertTriangle,
  DollarSign,
} from "lucide-react";
import { StatCard } from "../components/StatCard";
import { RegionalMap } from "../components/RegionalMap";
import { ActivityFeed } from "../components/ActivityFeed";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <select className="border border-gray-300 rounded-md text-sm px-3 py-2 bg-white">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard
          title="Total Farmers"
          value="1,458"
          change="+12%"
          icon={<Users className="text-blue-600" />}
        />
        <StatCard
          title="Crops Planted"
          value="34,275 ha"
          change="+8%"
          icon={<Leaf className="text-green-600" />}
        />
        <StatCard
          title="Harvest Yield"
          value="12,458 tons"
          change="+5%"
          icon={<TrendingUp className="text-green-600" />}
        />
        <StatCard
          title="Waste Percentage"
          value="4.2%"
          change="-2.1%"
          isPositiveChange={true}
          icon={<AlertTriangle className="text-amber-500" />}
        />
        <StatCard
          title="Sales Figures"
          value="$345,890"
          change="+15%"
          icon={<DollarSign className="text-green-600" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-medium text-gray-800">
                Regional Agricultural Activity
              </h2>
              <button className="text-sm text-green-600 hover:text-green-800">
                View Full Map
              </button>
            </div>
            <RegionalMap />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-800">
              Recent Activity
            </h2>
            <button className="text-sm text-green-600 hover:text-green-800">
              View All
            </button>
          </div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
}
