import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Dashboard from "./Dashboard";
import ProfileModal from "../components/ProfileModal";
import RightSidebar from "../components/RightSidebar";
import { useTheme } from "../contexts/Theme";
import { FaBars, FaCog } from "react-icons/fa"; // Import icons for mobile buttons

const DashboardLayout = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
    
    // State for managing mobile sidebar visibility
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    const [profile, setProfile] = useState(() => {
        const saved = localStorage.getItem("userProfile");
        return saved ? JSON.parse(saved) : { name: "", image: "" };
    });

    const handleProfileSave = (newProfile) => {
        setProfile(newProfile);
        localStorage.setItem("userProfile", JSON.stringify(newProfile));
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Pass state to Sidebar to control its mobile visibility */}
            <Sidebar 
                isOpen={isMobileSidebarOpen} 
                onClose={() => setIsMobileSidebarOpen(false)}
                onSettingsClick={() => setIsRightSidebarOpen(true)} 
            />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Mobile Header */}
                <header className="md:hidden p-4 flex justify-between items-center bg-white dark:bg-gray-800 border-b dark:border-gray-700">
                    <button onClick={() => setIsMobileSidebarOpen(true)} className="text-gray-600 cursor-pointer dark:text-gray-300">
                        <FaBars className="w-6 h-6" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-800 dark:text-white">Dashboard</h1>
                    <button onClick={() => setIsRightSidebarOpen(true)} className="text-gray-600 cursor-pointer dark:text-gray-300">
                        <FaCog className="w-6 h-6" />
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <Dashboard />
                </div>
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