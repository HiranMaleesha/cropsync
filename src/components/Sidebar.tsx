import React from "react";

interface SidebarProps {
  userRole: "agent" | "farmer";
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function Sidebar({ userRole, onNavigate, currentPage }: SidebarProps) {
  const agentNavItems = [
    { label: "Dashboard", key: "dashboard" },
    { label: "Farmer Registration", key: "farmer-registration" },
    { label: "Farmer Profiles", key: "farmer-profile" },
    { label: "Data Collection", key: "data-collection" },
    { label: "Analytics", key: "analytics" },
  ];

  const farmerNavItems = [
    { label: "Admin Panel", key: "panel" },
    { label: "Help & Recommendations", key: "help" },
    { label: "My Profile", key: "reports" },
   
  ];

  const navItems = userRole === "agent" ? agentNavItems : farmerNavItems;

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="px-6 py-4 text-xl font-bold text-green-700 border-b">
        CropSync
      </div>
      <ul className="p-4 space-y-2">
        {navItems.map((item) => (
          <li
            key={item.key}
            onClick={() => onNavigate(item.key)}
            className={`cursor-pointer px-4 py-2 rounded-md ${
              currentPage === item.key
                ? "bg-green-600 text-white"
                : "hover:bg-green-100 text-gray-700"
            }`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
