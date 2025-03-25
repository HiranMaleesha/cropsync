import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Header } from "./components/Header";
import  FarmerRegistration  from "./pages/FarmerRegistration";
import  FarmerProfile  from "./pages/FarmerProfile";
import DataCollection from "./pages/DataCollection";
import { Login } from "./pages/auth/Login";
import FDashboard from "./pages/AdminPanel";
import Analytics from "./pages/Analytics";
import Frecommendations from "./pages/Help&Support";

import './index.css'; 
export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {currentPage === "dashboard" && <Dashboard />}
          {currentPage === "farmer-registration" && <FarmerRegistration />}
          {currentPage === "farmer-profile" && <FarmerProfile />}
          {currentPage === "admin" && <FDashboard />}
          {currentPage === "data-collection" && <DataCollection />}
          {currentPage === "analytics" && <Analytics />}
          {currentPage === "help" && <Frecommendations />}
        </main>
      </div>
    </div>
  );
}
