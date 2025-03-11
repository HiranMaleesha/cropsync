import React from "react";
import {
  LayoutDashboard,
  UserPlus,
  ClipboardList,
  BarChart2,
  Users,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}
export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "farmer-registration",
      label: "Farmer Registration",
      icon: <UserPlus size={20} />,
    },
    {
      id: "data-collection",
      label: "Data Collection",
      icon: <ClipboardList size={20} />,
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart2 size={20} />,
    },
    {
      id: "farmer-profile",
      label: "Farmer Profiles",
      icon: <Users size={20} />,
    },
    {
      id: "reports",
      label: "Reports",
      icon: <FileText size={20} />,
    },
    {
      id: "admin",
      label: "Admin Panel",
      icon: <Settings size={20} />,
    },
    {
      id: "help",
      label: "Help & Support",
      icon: <HelpCircle size={20} />,
    },
  ];
  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center mr-2">
            <span className="text-white font-bold">CS</span>
          </div>
          <h1 className="text-xl font-bold text-green-800">CropSync</h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center px-4 py-3 text-sm rounded-md ${currentPage === item.id ? "bg-green-50 text-green-700 font-medium" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <span
                className={`mr-3 ${currentPage === item.id ? "text-green-600" : "text-gray-500"}`}
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 rounded-md hover:bg-gray-50">
          <LogOut size={20} className="mr-3 text-gray-500" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
