import React, { useState, useRef, useEffect } from 'react';

const ProfileModal = ({ isOpen, onClose, currentName, currentImage, onSave }) => {
  const [name, setName] = useState(currentName || '');
  const [imagePreview, setImagePreview] = useState(currentImage || '');
  const fileInputRef = useRef(null);

  useEffect(() => {
      setName(currentName || '');
      setImagePreview(currentImage || '');
  }, [currentName, currentImage, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, image: imagePreview });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center font-mono transition-opacity duration-300">
      <div className="bg-black/50 backdrop-blur-lg border border-green-500/30 text-green-400 rounded-2xl shadow-2xl shadow-green-500/10 p-6 sm:p-8 w-full max-w-md m-4">
        <h2 
            className="text-2xl font-bold mb-6 text-center"
            style={{ textShadow: '0 0 5px #39FF14, 0 0 10px #39FF14' }}
        >
            Edit Profile
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img 
                  src={imagePreview || 'https://placehold.co/100x100/000000/39FF14?text=User'} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-2 border-green-500/50"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="absolute cursor-pointer bottom-0 right-0 bg-green-600 p-2 rounded-full hover:bg-green-500 transition-colors"
                >
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-green-300 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-3 border border-green-500/30 bg-gray-900/50 text-green-300 placeholder-green-700/80 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 cursor-pointer text-green-400 hover:bg-gray-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 cursor-pointer bg-green-600 text-black font-bold rounded-lg hover:bg-green-500 transition-colors"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileModal;
