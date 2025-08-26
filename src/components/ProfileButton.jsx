import React from 'react';
import { useTheme } from '../contexts/Theme';

const ProfileButton = ({ name, image, onClick }) => {
  const { themeMode } = useTheme();

  return (
    <button
      onClick={onClick}
      className="flex items-center cursor-pointer gap-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      <img 
        src={image || 'https://via.placeholder.com/32'} 
        alt="Profile" 
        className="w-8 h-8 rounded-full object-cover"
      />
      {name && <span className="text-sm dark:text-white">{name}</span>}
    </button>
  );
};

export default ProfileButton;
