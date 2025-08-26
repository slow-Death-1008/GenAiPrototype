import React, { useState, useRef } from 'react';
import { useTheme } from '../contexts/Theme';

const ProfileModal = ({ isOpen, onClose, currentName, currentImage, onSave }) => {
  const [name, setName] = useState(currentName || '');
  const [imagePreview, setImagePreview] = useState(currentImage || '');
  const fileInputRef = useRef(null);
  const { themeMode } = useTheme();

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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img 
                  src={imagePreview || 'https://via.placeholder.com/100'} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="absolute cursor-pointer bottom-0 right-0 bg-blue-600 p-2 rounded-full"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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
          <div className="mb-4">
            <label className="block text-sm font-medium dark:text-white">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 cursor-pointer text-gray-600 dark:text-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-md"
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
