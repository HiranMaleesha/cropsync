import React from "react";

const CropCard = ({
  name,
  priority,
  priorityColor,
  seeds,
  plantingTime,
  yieldInfo,
  image,
}: {
  name: string;
  priority: string;
  priorityColor: string;
  seeds: string;
  plantingTime: string;
  yieldInfo: string;
  image: string;
}) => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200">
      <div className="text-2xl font-semibold text-gray-800">{name}</div>
      <div
        className={`text-sm font-medium px-3 py-1 rounded-full`}
        style={{ backgroundColor: priorityColor }}
      >
        {priority}
      </div>
    </div>
    <div className="relative h-52 overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover"
      />
      <div className="absolute left-5 bottom-5 bg-white/90 px-4 py-2 rounded-md text-lg font-semibold">
        {seeds}
      </div>
    </div>
    <div className="bg-gray-100 px-6 py-5">
      <div className="mb-3 text-base text-gray-800 leading-relaxed">
        <strong>Seeds needed:</strong> {seeds}
      </div>
      <div className="mb-3 text-base text-gray-800 leading-relaxed">
        <strong>Ideal planting time:</strong> {plantingTime}
      </div>
      <div className="text-base text-gray-800 leading-relaxed">
        <strong>Expected yield:</strong> {yieldInfo}
      </div>
    </div>
  </div>
);

const Header = () => (
  <div className="flex justify-between items-center px-5 py-4 border-b border-gray-200 bg-white">
    <div className="text-lg font-medium text-gray-800">Planting Recommendations</div>
    <div className="flex items-center">
      <button className="bg-gray-100 border border-gray-300 rounded px-3 py-2 mr-3 cursor-pointer">
        Filter ▼
      </button>
      <input
        type="text"
        placeholder="Search crops..."
        className="border border-gray-300 rounded-full px-3 py-2 bg-gray-100 w-52"
      />
    </div>
  </div>
);

const Frecommendations = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <Header />
      <div className="bg-green-100 text-green-800 text-center px-5 py-4 m-5 rounded-md text-xl font-medium">
        Recommendations for May 2025
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-5 pb-5">
        <CropCard
          name="Tomato"
          priority="High Priority"
          priorityColor="#ffebee"
          seeds="200g"
          plantingTime="First week of may"
          yieldInfo="65kg per 10 sq. meters"
          image="https://www.boondieseeds.com.au/cdn/shop/products/iStock-809037174_700x.jpg?v=1659075861"
        />
        <CropCard
          name="Corn"
          priority="Medium Priority"
          priorityColor="#fff3e0"
          seeds="1.5kg"
          plantingTime="Mid-may"
          yieldInfo="35kg per 10 sq. meters"
          image="https://waspadaaceh.com/wp-content/uploads/2022/10/tanaman-jagung.jpg"
        />
        <CropCard
          name="Long Beans"
          priority="High Priority"
          priorityColor="#ffebee"
          seeds="50g"
          plantingTime="Early may"
          yieldInfo="25kg per 10 sq. meters"
          image="https://th.bing.com/th/id/OIP.i8QqVrn8bkyGqS3QS4zcgwHaE8?w=297&h=198&c=7&r=0&o=5&cb=iwc1&dpr=1.3&pid=1.7"
        />
        <CropCard
          name="Green Beans"
          priority="Low Priority"
          priorityColor="#e8f5e9"
          seeds="25g"
          plantingTime="Throughout may"
          yieldInfo="15kg per 10 sq. meters"
          image="https://static.tnn.in/thumb/msid-109172505,thumbsize-81696,width-1280,height-720,resizemode-75/109172505.jpg"
        />
      </div>
    </div>
  );
};

export default Frecommendations;
