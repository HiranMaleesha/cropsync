import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  TrendingUp,
  Users,
  Leaf,
  AlertTriangle,
  DollarSign,
  Crop,
  MapPin,
  Calendar,
  BarChart2,
} from "lucide-react";
import { StatCard } from "../components/StatCard";
import { RegionalMap } from "../components/RegionalMap";
import { ActivityFeed } from "../components/ActivityFeed";

type DashboardStats = {
  totalFarmers: number;
  totalCropArea: number;
  cropDistribution: Array<{ name: string; area: number }>;
  regionDistribution: Array<{ name: string; count: number }>;
  recentFarmers: Array<{
    farmerName: string;
    region: string;
    crops: Array<{ name: string; area: number }>;
    createdAt: string;
  }>;
  averageCropsPerFarmer: number;
  totalUniqueCrops: number;
  totalRegions: number;
};

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/dashboard/stats');
        setStats(response.data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching dashboard stats:', err);
        setError(err.response?.data?.message || 'Error fetching dashboard statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-4">
        <div className="text-center text-gray-600">No data available</div>
      </div>
    );
  }

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="w-6 h-6" />}
          title="Total Farmers"
          value={stats.totalFarmers}
          description="Registered farmers"
        />
        <StatCard
          icon={<Crop className="w-6 h-6" />}
          title="Total Crop Area"
          value={`${stats.totalCropArea.toLocaleString()} sq ft`}
          description="Combined cultivation area"
        />
        <StatCard
          icon={<BarChart2 className="w-6 h-6" />}
          title="Unique Crops"
          value={stats.totalUniqueCrops}
          description="Different crop types"
        />
        <StatCard
          icon={<MapPin className="w-6 h-6" />}
          title="Regions"
          value={stats.totalRegions}
          description="Active regions"
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

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Crop Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Crop Distribution</h2>
          <div className="space-y-4">
            {stats.cropDistribution.map((crop, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{crop.name}</span>
                <span className="font-medium">{crop.area.toLocaleString()} sq ft</span>
              </div>
            ))}
          </div>
        </div>

        {/* Region Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Region Distribution</h2>
          <div className="space-y-4">
            {stats.regionDistribution.map((region, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{region.name}</span>
                <span className="font-medium">{region.count} farmers</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Farmers */}
        <div className="bg-white rounded-lg shadow p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Farmers</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crops</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {stats.recentFarmers.map((farmer, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {farmer.farmerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {farmer.region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {farmer.crops.map(crop => crop.name).join(', ')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(farmer.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
