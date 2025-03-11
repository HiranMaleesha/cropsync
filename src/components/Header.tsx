import React from "react";
import { Bell, Search, Menu, Globe } from "lucide-react";
export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
      <div className="flex items-center md:hidden">
        <button className="text-gray-500 hover:text-gray-700">
          <Menu size={24} />
        </button>
      </div>
      <div className="flex items-center flex-1 mx-4">
        <div className="relative max-w-md w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search farmers, crops, regions..."
            className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700 relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        <button className="text-gray-500 hover:text-gray-700">
          <Globe size={20} />
        </button>
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white">
            <span className="font-medium text-sm">AG</span>
          </div>
          <span className="ml-2 text-sm font-medium text-gray-700 hidden md:block">
            Agent Name
          </span>
        </div>
      </div>
    </header>
  );
}
