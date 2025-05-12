import React from 'react'
import {
  UserIcon,
  PhoneIcon,
  MapPinIcon,
  LeafIcon,
  HashIcon,
  TreesIcon,
  RulerIcon,
} from 'lucide-react'

export function MyProfile() {
  const farmerData = {
    id: 'F001',
    name: 'Punchi Appuhami',
    idNumber: 'ID78901234',
    phone: '+1 (555) 123-4567',
    region: 'Kurunegala',
    crops: [
      { name: 'Green Beans', area: 5000 },
      { name: 'Corn', area: 3000 },
      { name: 'Long Beans', area: 2500 },
    ],
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
                <h2 className="text-2xl font-bold text-emerald-800">{farmerData.name}</h2>
                <span className="text-emerald-600 font-medium">Farmer ID: {farmerData.id}</span>
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
                  <div className="text-gray-900 font-medium">{farmerData.phone}</div>
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
