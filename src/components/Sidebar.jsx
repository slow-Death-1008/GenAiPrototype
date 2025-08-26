import React from "react";
import { FaChartPie, FaUserGraduate, FaTasks, FaCog, FaTimes } from "react-icons/fa";
import logo from '../assets/logo.png';

const Sidebar = ({ isOpen, onClose, onSettingsClick }) => {
  return (
    <>
      {/* Overlay for mobile */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div 
        className={`
          bg-[#0a1931] text-white w flex flex-col p-5
          fixed inset-y-0 left-0 z-40
          transform transition-transform duration-300 ease-in-out
          md:relative md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-sans font-semibold">Career Guidance👨‍🎓👩‍🎓</h1>
          <button onClick={onClose} className="md:hidden cursor-pointer text-white hover:text-blue-400">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        <ul className="space-y-4 flex-grow">
          <li className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-blue-400">
            <FaChartPie /> Dashboard
          </li>
          <li className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-blue-400">
            <FaUserGraduate /> Career Paths
          </li>
          <li className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-blue-400">
            <FaTasks /> Skills Assessment
          </li>
        </ul>

        {/* Settings button, now hidden on mobile as it's in the top header */}
        <button
          onClick={onSettingsClick}
          className="hidden cursor-pointer md:flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg"
        >
          <FaCog className="w-6 h-6" />
          <span className="ml-3">Settings</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;