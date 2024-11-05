"use client";
import { savePersonalInfo } from '@/actions/user_actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { userData } from '@/redux/slices/userSlice';
import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaEnvelope } from 'react-icons/fa';
import { MdPerson, MdWork } from 'react-icons/md';

const Header: React.FC = () => {
  const user = useAppSelector((state: any) => state.user.user);
  const username = user?.username || '';
  const firstLetter = username ? username.charAt(0).toUpperCase() : '';
  const role = user?.role;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  const roleOptions = [
    { name: "client", icon: <MdPerson className="text-teal-700" /> },
    { name: "freelancer", icon: <MdWork className="text-teal-700" /> }
  ];

  const dispatch = useAppDispatch();

  const handleDropdownToggle = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleRoleChange = async (option: string) => {
    try {
      const updatedUser = await savePersonalInfo({ role: option });
      dispatch(userData(updatedUser.user));
      setDropdownOpen(false);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };


  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedRoleOption = roleOptions.find(option => option.name === role);

  return (
    <header className="flex items-center justify-between px-6 py-2 shadow-lg fixed w-full z-50 backdrop-blur-xl border-b border-gray-300 transition duration-300 ease-in-out">
      <div className="flex items-center space-x-4">
        <img
          src="/assets/icons/favicon.ico"
          alt="CampusBid Logo"
          className="w-12 h-12 rounded-full transition-transform transform hover:scale-110 shadow-md"
        />
        <div className="text-2xl font-bold text-teal-600 tracking-tight hover:text-teal-700 transition duration-300">
          CampusBid
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className="flex items-center px-4 py-2 bg-gray-100 border border-gray-300 text-teal-600 font-semibold rounded-full hover:bg-gray-200 focus:ring-2 focus:ring-teal-500 transition duration-300 shadow-md"
          >
            {selectedRoleOption?.icon}
            <span className="ml-2">{user.role}</span>
            <span className="ml-2">▼</span>
          </button>
          {dropdownOpen && (
            <ul ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              {roleOptions.map(({ name, icon }) => (
                <li
                  key={name}
                  onClick={() => handleRoleChange(name)}
                  className={`flex items-center px-4 py-2 cursor-pointer transition duration-200 
                              ${role === name ? 'bg-teal-100 font-semibold text-teal-700' : 'text-gray-800 hover:bg-teal-100'}`}
                >
                  {icon}
                  <span className="ml-2">{name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="p-2 rounded-full bg-gray-100 hover:bg-teal-100 transition duration-300 shadow-lg">
          <FaBell className="text-xl text-gray-500 hover:text-teal-700 transition duration-300" />
        </button>
        <button className="p-2 rounded-full bg-gray-100 hover:bg-teal-100 transition duration-300 shadow-lg">
          <FaEnvelope className="text-xl text-gray-500 hover:text-teal-700 transition duration-300" />
        </button>
        {username && (
          <span className="w-9 h-9 flex items-center justify-center rounded-full bg-teal-700 text-white font-semibold shadow-lg">
            {firstLetter}
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
