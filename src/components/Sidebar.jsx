import React from "react";
import { FaChartPie, FaUserGraduate, FaTasks, FaCog, FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose, onSettingsClick }) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      ></div>

      <div 
        className={`
          bg-[#0a1931] text-white w-64 flex flex-col p-5
          fixed inset-y-0 left-0 z-40
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-serif font-semibold">Lock In...🔥</h1>
          <button onClick={onClose} className="md:hidden cursor-pointer text-white hover:text-blue-400">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <ul className="space-y-4 flex-grow">
          <li 
            onClick={() => {
              navigate('/dashboard');
              onClose();
            }}
            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-blue-400"
          >
            <FaChartPie /> Dashboard
          </li>
          <li 
            onClick={() => {
              navigate('/dashboard/career-paths');
              onClose();
            }}
            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-blue-400"
          >
            <FaUserGraduate /> Career Paths
          </li>
          <li 
            onClick={() => {
              navigate('/dashboard/skills-assessment');
              onClose();
            }}
            className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-blue-400"
          >
            <FaTasks /> Skills Assessment
          </li>
        </ul>

        
        <button
          onClick={onSettingsClick}
          className="hidden md:flex items-center p-3 cursor-pointer text-gray-300 hover:bg-gray-700 rounded-lg"
        >
          <FaCog className="w-6 h-6" />
          <span className="ml-3">Settings</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
