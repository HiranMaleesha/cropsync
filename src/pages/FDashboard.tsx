import React from 'react';
import { Sprout, LineChart, UserCircle, Leaf, Sun } from 'lucide-react';
import { useAuth } from '../firebase/auth'; // Adjust the path if needed
import { useNavigate } from 'react-router-dom';

interface FDashboardProps {
  onNavigate: (page: string) => void;
}

export function FDashboard({ onNavigate }: FDashboardProps) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const actionCards = [
    {
      icon: <Sprout className="w-6 h-6" />,
      title: 'View Recommendations',
      description: 'Crop insights and weekly tasks',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
      navigateTo: 'help',
    },
    {
      icon: <LineChart className="w-6 h-6" />,
      title: 'My Farm Data',
      description: 'Fields, crops, and analytics',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-500',
      navigateTo: '', // can add route later if needed
    },
    {
      icon: <UserCircle className="w-6 h-6" />,
      title: 'Farmer Profile',
      description: 'Your account and preferences',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      navigateTo: 'reports',
    },
  ];

  return (
    <div className="min-h-screen bg-green-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Leaf className="text-green-600 w-8 h-8" />
            <h1 className="text-3xl font-bold text-green-800">CropSync Dashboard</h1>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        </header>

        <div className="flex items-center gap-4 bg-green-600 text-white rounded-xl p-5 mb-6">
          <div className="bg-white/20 rounded-full p-2 flex items-center justify-center">
            <Sun className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              Hello, {currentUser?.displayName || 'Farmer'}
            </h2>
            <p className="text-sm opacity-90">72°F | Clear skies | Wind: 5 mph NE</p>
          </div>
        </div>

        <div className="space-y-4">
          {actionCards.map((card, index) => (
            <div
              key={index}
              className="flex items-center bg-white rounded-xl shadow-md p-5 gap-4 cursor-pointer transition transform hover:-translate-y-1 hover:shadow-lg"
              onClick={() => card.navigateTo && onNavigate(card.navigateTo)}
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.bgColor} ${card.iconColor}`}>
                {card.icon}
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">{card.title}</h3>
                <p className="text-sm text-gray-500">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
