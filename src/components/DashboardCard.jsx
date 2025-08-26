import React from "react";
const DashboardCard = ({ title, desc, color }) => {
  return (
    <div className={`p-5 rounded-xl shadow-md ${color} w-56`}>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-sm my-2">{desc}</p>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 ">Explore</button>
    </div>
  );
};

export default DashboardCard;
