import React, { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Header } from "./components/Header";
import FarmerRegistration from "./pages/FarmerRegistration";
import FarmerProfile from "./pages/FarmerProfile";
import FarmerDataCollection from "./pages/FarmerDataCollection";
import CropDataCollection from "./pages/CropDataCollection";
import { Login } from "./pages/auth/Login";
import { FDashboard } from "./pages/FDashboard";
import Analytics from "./pages/Analytics";
import Frecommendations from "./pages/Frecommendations";
import { MyProfile } from "./pages/MyProfile";
import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { AuthProvider } from "./firebase/auth";

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<"agent" | "farmer" | null>(null);
  const [currentPage, setCurrentPage] = useState("dashboard");

  if (!isAuthenticated || !role) {
    return (
      <Login
        onLogin={(userRole: "agent" | "farmer") => {
          setIsAuthenticated(true);
          setRole(userRole);
          setCurrentPage(userRole === "agent" ? "dashboard" : "panel");
        }}
      />
    );
  }

  const agentPages = {
    dashboard: <Dashboard />,
    "farmer-registration": <FarmerRegistration />,
    "farmer-profile": <FarmerProfile />,
    "fdata-collection": <FarmerDataCollection />,
    "cdata-collection": <CropDataCollection />,
    analytics: <Analytics />,
  };

  const farmerPages = {
    panel: <FDashboard onNavigate={setCurrentPage} />,
    help: <Frecommendations />,
    reports: <MyProfile />,
  };

  const currentPages = role === "agent" ? agentPages : farmerPages;

  return (
    <AuthProvider>
      <div className="flex h-screen bg-gray-50">
        {/* Show sidebar only for agent */}
        {role === "agent" && (
          <Sidebar
            userRole="agent"
            currentPage={currentPage}
            onNavigate={setCurrentPage}
          />
        )}

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {currentPages[currentPage as keyof typeof currentPages] || (
              <div>Page not found</div>
            )}
          </main>
        </div>
      </div>
    </AuthProvider>
  );
}
