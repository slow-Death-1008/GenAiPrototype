import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import ProfileModal from "../components/ProfileModal";
import RightSidebar from "../components/RightSidebar";
import { FaBars, FaCog } from "react-icons/fa";
import bgVideo from "../assets/bganime3.mp4";

const DashboardLayout = () => {
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
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
        <div className="relative flex h-screen font-sans text-white">
            
            
            <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-30 -z-10"
            >
                <source src={bgVideo} type="video/mp4" />
            </video>

            <Sidebar 
                isOpen={isMobileSidebarOpen} 
                onClose={() => setIsMobileSidebarOpen(false)}
                onSettingsClick={() => setIsRightSidebarOpen(true)} 
            />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="md:hidden p-4 flex justify-between items-center bg-white/70 dark:bg-gray-800/70 border-b dark:border-gray-700 backdrop-blur-sm">
                    <button onClick={() => setIsMobileSidebarOpen(true)} className="text-gray-600 cursor-pointer dark:text-gray-300">
                        <FaBars className="w-6 h-6" />
                    </button>
                    <h1 className="text-lg font-bold text-gray-800 dark:text-white">Dashboard</h1>
                    <button onClick={() => setIsRightSidebarOpen(true)} className="text-gray-600 cursor-pointer dark:text-gray-300">
                        <FaCog className="w-6 h-6" />
                    </button>
                </header>

                
                <div
                    className={`flex-1 overflow-y-auto ${
                        isMobileSidebarOpen ? "z-30" : "z-50"
                    }`}
                >
                    <Outlet />
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
