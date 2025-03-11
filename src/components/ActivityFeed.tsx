import React from "react";
import { UserPlus, Leaf, TrendingUp, AlertTriangle } from "lucide-react";
export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: "registration",
      icon: <UserPlus className="h-5 w-5 text-blue-500" />,
      title: "New Farmer Registered",
      description: "Rajith Perera was added to the system",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "planting",
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      title: "Crop Planting Recorded",
      description: "Rice planting recorded in Anuradhapura region",
      time: "4 hours ago",
    },
    {
      id: 3,
      type: "harvest",
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      title: "Harvest Data Updated",
      description: "Vegetable harvest data updated for Kandy district",
      time: "5 hours ago",
    },
    {
      id: 4,
      type: "alert",
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
      title: "Weather Alert",
      description: "Heavy rain forecasted in Southern Province",
      time: "1 day ago",
    },
  ];
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="flex items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0"
        >
          <div className="p-2 bg-gray-50 rounded-full mr-3">
            {activity.icon}
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-gray-800">
              {activity.title}
            </h4>
            <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
            <span className="text-xs text-gray-400 mt-1 block">
              {activity.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
