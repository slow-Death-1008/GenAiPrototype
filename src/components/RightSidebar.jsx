import React from 'react';
import ProfileButton from './ProfileButton';
import { useTheme } from '../contexts/Theme';

 
import defaultUserImage from '../assets/user.png'; 

const RightSidebar = ({ isOpen, onClose, profile, onProfileClick }) => {
  const { themeMode } = useTheme();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white z-50 dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold dark:text-white">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-700 rounded-full"
          >
            <svg className="w-6 h-6 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
               onClick={onProfileClick}>
            <ProfileButton
              name={profile.name || 'Anonymous User'} 
              
              image={profile.image || defaultUserImage} 
              onClick={onProfileClick}
            />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;