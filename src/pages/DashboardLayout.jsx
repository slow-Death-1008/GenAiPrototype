import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import RightSidebar from "../components/RightSidebar"
import Sidebar from "../components/Sidebar";
import ProfileModal from "../components/ProfileModal";

const FaBars = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path></svg>
);

const FaCog = () => (
  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"></path></svg>
);

// --- Main Dashboard Layout Component ---
const DashboardLayout = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // Using a simple state instead of localStorage for this example
    const [profile, setProfile] = useState({ name: "Neon User", image: "" });

    const handleProfileSave = (newProfile) => {
        setProfile(newProfile);
    };

    return (
        <div className="relative flex h-screen font-mono text-green-400 bg-black">
            
            <div className="absolute inset-0 bg-black/60 -z-10"></div>

            <Sidebar 
                isOpen={isMobileSidebarOpen} 
                onClose={() => setIsMobileSidebarOpen(false)}
                onSettingsClick={() => setIsRightSidebarOpen(true)} 
            />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="md:hidden p-4 flex justify-between items-center bg-black/50 border-b border-green-500/30 backdrop-blur-sm">
                    <button onClick={() => setIsMobileSidebarOpen(true)} className="text-green-400 cursor-pointer hover:text-white transition-colors text-2xl">
                        <FaBars />
                    </button>
                    <h1 className="text-lg font-bold">Dashboard</h1>
                    <button onClick={() => setIsRightSidebarOpen(true)} className="text-green-400 cursor-pointer hover:text-white transition-colors text-2xl">
                        <FaCog />
                    </button>
                </header>
                
                <main className="flex-1 overflow-y-auto">
                    {/* This is the key change: Outlet renders the nested routes */}
                    <Outlet />
                </main>
            </div>

            <RightSidebar
                isOpen={isRightSidebarOpen}
                onClose={() => setIsRightSidebarOpen(false)}
                profile={profile}
                onProfileClick={() => setIsProfileModalOpen(true)}
            />

            <ProfileModal
                isOpen={isProfileModalOpen}
                onClose={() => setIsProfileModalOpen(false)}
                currentName={profile.name}
                currentImage={profile.image}
                onSave={handleProfileSave}
            />
        </div>
    );
};

export default DashboardLayout;