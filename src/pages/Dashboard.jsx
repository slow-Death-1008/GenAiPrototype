
import DashboardCard from "../components/DashboardCard";
import ChatBox from "../components/ChatBox";


const Dashboard = () => {
  return (
    <div className="p-6 flex flex-col h-screen gap-6">
      <h1 className="text-2xl text-amber-50 font-bold">Dashboard</h1>
      <div className="flex gap-4">
        <DashboardCard title="Engineering" desc="Your recommended career" color="bg-purple-100" />
        <DashboardCard title="Design" desc="Your creativity-driven career" color="bg-pink-100" />
        <DashboardCard title="Data Science" desc="Data insights for future" color="bg-blue-100" />
      </div>
      <ChatBox />
    </div>
  );
};

export default Dashboard;
