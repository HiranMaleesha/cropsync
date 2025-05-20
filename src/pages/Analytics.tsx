import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Filter, TrendingUp, DollarSign, Package, Crop } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AnalyticsData {
  summary: {
    totalHarvested: number;
    totalYield: number;
    totalArea: number;
    totalRevenue: number;
    averagePrice: number;
    totalWasted: number;
    totalShortfall: number;
    totalPlanted: number;
    recordCount: number;
  };
  filters: {
    regions: string[];
    crops: string[];
    seasons: string[];
  };
  monthlyTrends: Array<{
    _id: {
      year: number;
      month: number;
    };
    harvested: number;
    yield: number;
    area: number;
    revenue: number;
  }>;
}

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    region: '',
    cropName: '',
    season: ''
  });
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      
      const params = new URLSearchParams();
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.region) params.append('region', filters.region);
      if (filters.cropName) params.append('cropName', filters.cropName);
      if (filters.season) params.append('season', filters.season);

      const response = await axios.get(`http://localhost:5000/api/farmer-data/analytics?${params}`);
      setData(response.data);
    } catch (err) {
      setError('Failed to fetch analytics data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2
    }).format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR',
      maximumFractionDigits: 2
    }).format(num);
  };

  const formatDate = (year: number, month: number) => {
    return new Date(year, month - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 bg-red-50 p-4 rounded-md m-4">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-green-700 flex items-center gap-2">
          <TrendingUp size={24} />
          Crop Analytics Dashboard
        </h1>
      </header>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Filter size={20} />
          Filters
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
            <select
              name="region"
              value={filters.region}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Regions</option>
              {data?.filters.regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Crop</label>
            <select
              name="cropName"
              value={filters.cropName}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Crops</option>
              {data?.filters.crops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
            <select
              name="season"
              value={filters.season}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">All Seasons</option>
              {data?.filters.seasons.map(season => (
                <option key={season} value={season}>{season}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Package size={20} />
            <h3 className="font-semibold">Total Harvested</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {formatNumber(data?.summary.totalHarvested || 0)} kg
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Crop size={20} />
            <h3 className="font-semibold">Total Yield</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {formatNumber(data?.summary.totalYield || 0)} kg
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <DollarSign size={20} />
            <h3 className="font-semibold">Average Price</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(data?.summary.averagePrice || 0)}/kg
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Calendar size={20} />
            <h3 className="font-semibold">Total Area</h3>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {formatNumber(data?.summary.totalArea || 0)} perches
          </p>
        </div>
      </div>

      {/* Monthly Trends Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Monthly Trends</h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data?.monthlyTrends.map(trend => ({
                date: formatDate(trend._id.year, trend._id.month),
                harvested: trend.harvested,
                yield: trend.yield,
                revenue: trend.revenue / 1000 // Convert to thousands for better display
              }))}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" orientation="left" stroke="#10B981" />
              <YAxis yAxisId="right" orientation="right" stroke="#6366F1" />
              <Tooltip
                formatter={(value: number, name: string) => {
                  if (name === 'revenue') return [formatCurrency(value * 1000), 'Revenue'];
                  return [formatNumber(value), name.charAt(0).toUpperCase() + name.slice(1)];
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="harvested" name="Harvested" fill="#10B981" />
              <Bar yAxisId="left" dataKey="yield" name="Yield" fill="#059669" />
              <Bar yAxisId="right" dataKey="revenue" name="Revenue (Thousands)" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700 mb-2">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(data?.summary.totalRevenue || 0)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700 mb-2">Total Wasted</h3>
          <p className="text-2xl font-bold text-red-600">
            {formatNumber(data?.summary.totalWasted || 0)} kg
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h3 className="font-semibold text-gray-700 mb-2">Total Shortfall</h3>
          <p className="text-2xl font-bold text-yellow-600">
            {formatNumber(data?.summary.totalShortfall || 0)} kg
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
