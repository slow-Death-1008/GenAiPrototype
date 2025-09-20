import React from 'react';

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

// Example Usage (can be removed if not needed)
const App = () => {
    return (
        <div className="bg-black min-h-screen flex items-center justify-center">
            <ProfileButton 
                name="Alex Ryder"
                image="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                onClick={() => alert('Profile button clicked!')}
            />
        </div>
    )
}


export default ProfileButton;
