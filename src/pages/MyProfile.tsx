import { useEffect, useState } from 'react'
import {
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  LeafIcon,
  HashIcon,
  TreesIcon,
  RulerIcon,
} from 'lucide-react'
import axios from 'axios'
import { useAuth } from '../firebase/auth'

type Farmer = {
  _id: string;
  farmerName: string;
  idNumber: string;
  phoneNumber: string;
  region: string;
  crops: Array<{
    name: string;
    area: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export function MyProfile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [farmerData, setFarmerData] = useState<Farmer | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchFarmerProfile = async () => {
      if (!currentUser?.email) {
        console.log("No current user or email found:", currentUser);
        setError("No user email found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        console.log("Fetching farmer profile for:", currentUser.email);
        const response = await axios.get(`http://localhost:5000/api/farmers/email/${currentUser.email}`);
        console.log("Farmer profile response:", response.data);
        setFarmerData(response.data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching farmer profile:", err);
        setError(err.response?.data?.message || "Error fetching farmer profile");
      } finally {
        setLoading(false);
      }
    };

    fetchFarmerProfile();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-green-50 p-4 md:p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-green-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  if (!farmerData) {
    return (
      <div className="w-full min-h-screen bg-green-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-gray-600">
            No profile information found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-green-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex items-center gap-2 mb-8">
          <LeafIcon className="text-emerald-600 w-8 h-8" />
          <h1 className="text-3xl font-bold text-emerald-800">CropSync Profile</h1>
        </header>
        <div className="grid gap-8 md:grid-cols-3">
          {/* Personal Info Card */}
          <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4 mb-8 p-4 bg-green-50 rounded-lg">
              <div className="bg-emerald-600 text-white rounded-full p-4 w-16 h-16 flex items-center justify-center">
                <UserIcon size={32} />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-emerald-800">{farmerData.farmerName}</h2>
                <span className="text-emerald-600 font-medium">Farmer ID: {farmerData._id}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-emerald-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              <div />
              Personal Information
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {/* ID */}
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <HashIcon className="text-emerald-600 w-5 h-5" />
                <div>
                  <div className="text-sm text-gray-500">ID Number</div>
                  <div className="text-gray-900 font-medium">{farmerData.idNumber}</div>
                </div>
              </div>
              {/* Phone */}
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
                <PhoneIcon className="text-emerald-600 w-5 h-5" />
                <div>
                  <div className="text-sm text-gray-500">Phone Number</div>
                  <div className="text-gray-900 font-medium">{farmerData.phoneNumber}</div>
                </div>
              </div>
              {/* Region */}
              <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg sm:col-span-2">
                <MapPinIcon className="text-emerald-600 w-5 h-5" />
                <div>
                  <div className="text-sm text-gray-500">Region</div>
                  <div className="text-gray-900 font-medium">{farmerData.region}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Crops Info Card */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-emerald-800 mb-4 pb-2 border-b border-gray-200 flex items-center gap-2">
              <TreesIcon className="w-5 h-5" />
              Crops Grown
            </h3>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-3 text-sm font-medium text-gray-500 bg-gray-50">Crop</th>
                  <th className="text-left p-3 text-sm font-medium text-gray-500 bg-gray-50">Area</th>
                </tr>
              </thead>
              <tbody>
                {farmerData.crops.map((crop, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="p-3 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <LeafIcon size={16} className="text-emerald-600" />
                        {crop.name}
                      </div>
                    </td>
                    <td className="p-3 text-sm text-emerald-600 font-medium">
                      <div className="flex items-center gap-2">
                        <RulerIcon size={16} />
                        {crop.area.toLocaleString()} sq. ft
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
