"use client";
import React, { useState } from 'react';
import { FaBell, FaEnvelope } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Header: React.FC = () => {
  // Accessing the user data from the Redux store
  const username = useSelector((state: any) => state.user.user?.username);

  // Extract the first letter of the username and make it uppercase
  const firstLetter = username ? username.charAt(0).toUpperCase() : '';

  // State for selected role
  const [role, setRole] = useState("Client");

  // Dropdown options for roles
  const roleOptions = ["Client", "Freelancer"];

  return (
    <header className="flex items-center justify-between px-8 py-3 bg-white/20 shadow-lg lg:px-8 transition duration-300 ease-in-out border-b border-gray-300 fixed w-full z-50 backdrop-blur-xl">
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        <img
          src="/assets/icons/favicon.ico"
          alt="CampusBid Logo"
          className="w-10 h-10 rounded-full transition-transform transform hover:scale-110 shadow-md"
        />
        <div className="text-2xl font-bold text-teal-700 tracking-tight hover:text-teal-900 transition duration-300">
          CampusBid
        </div>
      </div>

      {/* Dropdown for Role Selection */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="px-4 py-2 bg-gray-100 border border-gray-300 text-teal-700 font-semibold rounded-full hover:bg-gray-200 focus:ring-2 focus:ring-teal-500 transition duration-300 cursor-pointer shadow-md"
          >
            {roleOptions.map((option) => (
              <option key={option} value={option} className="text-gray-800">
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Notifications, Messages, and User Avatar */}
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full bg-gray-100 hover:bg-teal-100 transition duration-300 shadow-lg">
            <FaBell className="text-xl text-gray-500 hover:text-teal-700 transition duration-300" />
          </button>
          <button className="p-2 rounded-full bg-gray-100 hover:bg-teal-100 transition duration-300 shadow-lg">
            <FaEnvelope className="text-xl text-gray-500 hover:text-teal-700 transition duration-300" />
          </button>
          {username && (
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-teal-700 text-white font-semibold shadow-lg">
              {firstLetter}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
