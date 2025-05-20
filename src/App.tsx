import React, { useState, ReactNode } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./pages/Dashboard";
import { Header } from "./components/Header";
import FarmerRegistration from "./pages/FarmerRegistration";
import FarmerProfile from "./pages/FarmerProfile";
import FarmerDataCollection from "./pages/FarmerDataCollection";
import CropDataCollection from "./pages/CropDataCollection";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { FDashboard } from "./pages/FDashboard";
import Analytics from "./pages/Analytics";
import Frecommendations from "./pages/Frecommendations";
import { MyProfile } from "./pages/MyProfile";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./index.css";
import { AuthProvider } from "./firebase/auth";

// Agent Layout Component
interface LayoutProps {
  children: ReactNode;
}

const AgentLayout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop() || 'dashboard';

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        userRole="agent"
        currentPage={currentPage}
        onNavigate={(page) => navigate(`/agent/${page}`)}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

// Farmer Layout Component
const FarmerLayout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.split('/').pop() || 'panel';

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<"agent" | "farmer" | null>(null);
  const navigate = useNavigate();

  const handleAuth = (userRole: "agent" | "farmer") => {
    console.log("Auth handler called with role:", userRole);
    setIsAuthenticated(true);
    setRole(userRole);
    // Navigate to the appropriate dashboard based on role
    if (userRole === "agent") {
      navigate("/agent/dashboard");
    } else {
      navigate("/farmer/panel");
    }
  };

  if (!isAuthenticated || !role) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleAuth} />} />
        <Route path="/signup" element={<Signup onSignup={handleAuth} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <AuthProvider>
      <Toaster />
      <Routes>
        {/* Agent Routes */}
        {role === "agent" && (
          <>
            <Route path="/agent" element={<Navigate to="/agent/dashboard" replace />} />
            <Route
              path="/agent/dashboard"
              element={
                <AgentLayout>
                  <Dashboard />
                </AgentLayout>
              }
            />
            <Route
              path="/agent/farmer-registration"
              element={
                <AgentLayout>
                  <FarmerRegistration onNavigate={(page) => navigate(`/agent/${page}`)} />
                </AgentLayout>
              }
            />
            <Route
              path="/agent/farmer-profile"
              element={
                <AgentLayout>
                  <FarmerProfile />
                </AgentLayout>
              }
            />
            <Route
              path="/agent/fdata-collection"
              element={
                <AgentLayout>
                  <FarmerDataCollection />
                </AgentLayout>
              }
            />
            <Route
              path="/agent/cdata-collection"
              element={
                <AgentLayout>
                  <CropDataCollection />
                </AgentLayout>
              }
            />
            <Route
              path="/agent/analytics"
              element={
                <AgentLayout>
                  <Analytics />
                </AgentLayout>
              }
            />
          </>
        )}

        {/* Farmer Routes */}
        {role === "farmer" && (
          <>
            <Route path="/farmer" element={<Navigate to="/farmer/panel" replace />} />
            <Route
              path="/farmer/panel"
              element={
                <FarmerLayout>
                  <FDashboard onNavigate={(page) => navigate(`/farmer/${page}`)} />
                </FarmerLayout>
              }
            />
            <Route
              path="/farmer/profile"
              element={
                <FarmerLayout>
                  <MyProfile />
                </FarmerLayout>
              }
            />
            <Route
              path="/farmer/help"
              element={
                <FarmerLayout>
                  <Frecommendations />
                </FarmerLayout>
              }
            />
            <Route
              path="/farmer/reports"
              element={
                <FarmerLayout>
                  <MyProfile />
                </FarmerLayout>
              }
            />
          </>
        )}

        {/* Catch all route - redirect to appropriate dashboard */}
        <Route
          path="*"
          element={
            <Navigate to={role === "agent" ? "/agent/dashboard" : "/farmer/panel"} replace />
          }
        />
      </Routes>
    </AuthProvider>
  );
} 