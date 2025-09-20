import React from 'react';

// Placeholder for ProfileButton as it's in another file.
const ProfileButton = ({ name, image, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center cursor-pointer gap-3 p-2 rounded-full transition-colors duration-300 hover:bg-green-900/40 border border-transparent hover:border-green-500/30 group font-mono"
    >
      <img 
        src={image || 'https://placehold.co/40x40/000000/39FF14?text=P'} 
        alt="Profile" 
        className="w-10 h-10 rounded-full object-cover border-2 border-green-500/50 group-hover:border-green-400 transition-colors"
      />
      {name && (
        <span 
            className="text-sm text-green-300 group-hover:text-green-200"
            style={{ textShadow: '0 0 2px #39FF14' }}
        >
            {name}
        </span>
      )}
    </button>
  );
};


const RightSidebar = ({ isOpen, onClose, profile = {}, onProfileClick }) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-72 bg-black/80 backdrop-blur-lg border-l border-green-500/30 text-green-400 z-50 shadow-2xl shadow-green-500/10 transform transition-transform duration-300 ease-in-out font-mono ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="p-4 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 flex-shrink-0">
          <h2 
            className="text-xl font-bold"
            style={{ textShadow: '0 0 4px #39FF14' }}
          >
            Settings
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-green-900/40 cursor-pointer rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content */}
        <div className="space-y-4 flex-grow">
          <div 
            className="p-2 rounded-lg hover:bg-green-900/40 border border-transparent hover:border-green-500/30 transition-all cursor-pointer"
            onClick={onProfileClick}
          >
            <ProfileButton
              name={profile.name || 'Anonymous User'} 
              image={profile.image || 'https://placehold.co/40x40/000000/39FF14?text=A'} 
              onClick={onProfileClick}
            />
          </div>
          {/* Add other settings items here */}
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;

