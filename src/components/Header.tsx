"use client";
import { savePersonalInfo } from '@/actions/user_actions';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { userData } from '@/redux/slices/userSlice';
import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaEnvelope } from 'react-icons/fa';
import { MdPerson, MdWork } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Header: React.FC = () => {
  const router = useRouter();
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
      router.replace('/')
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

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
    <header className="flex items-center justify-between px-4 py-2 md:py-2 xl:px-10 shadow-md fixed w-full z-50 backdrop-blur-2xl rounded-b-3xl bg-[#f8fffe]  border-b border-gray-300 transition duration-300 ease-in-out">
      <div className="flex items-center justify-between w-auto space-x-4 shadow-2xl">
        <img
          src="/assets/icons/favicon.ico"
          alt="CampusBid Logo"
          className="w-12 h-12 md:w-[50px] md:h-[50px] rounded-full transition-transform transform hover:scale-110  border-teal-200 border-2 hover:cursor-pointer"
          onClick={() => router.replace("/")}
        />
        {/* <div onClick={() => router.replace("/")} className="hidden md:inline text-xl lg:text-[22px] hover:cursor-pointer font-sans font-bold text-teal-700 tracking-tight hover:text-teal-800 transition duration-300">
          CampusBid
        </div> */}
      </div>

      <div className="flex items-center space-x-3 lg:space-x-4 w-auto">
        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className="flex items-center px-3 text-base border-gray-300 border-[1px] md:text-none py-1 lg:px-4 md:py-1.5 bg-gray-100 text-teal-600 font-semibold rounded-3xl hover:bg-gray-200 focus:ring-2 focus:ring-teal-500 transition duration-300 shadow md:shadow-md"
          >
            {selectedRoleOption?.icon}
            <span className="ml-2 hidden sm:inline">{user.role}</span>
            <span className="ml-2">▼</span>
          </button>
          {dropdownOpen && (
            <ul ref={dropdownRef} className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
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

        <button className="p-2 rounded-full border-teal-200 border-[1px] bg-gray-100 hover:bg-teal-100 transition duration-300 shadow md:shadow-md">
          <FaBell className="text-base md:text-lg text-gray-500 hover:text-teal-700 transition duration-300" />
        </button>

        <button className="p-2 rounded-full bg-gray-100 border-teal-200 border-[1px] hover:bg-teal-100 transition duration-300 shadow md:shadow-md">
          <FaEnvelope className="text-base md:text-lg text-gray-500 hover:text-teal-700 transition duration-300" />
        </button>

        {username && (
          <Link href={`/profile/me`}>
            <span
            className="h-8 w-8 md:w-9 md:h-9 flex items-center justify-center rounded-full border-teal-200 border-[1px] bg-teal-500 hover:bg-teal-800 transition duration-300 text-white font-semibold shadow-lg hover:cursor-pointer"
          >
            {firstLetter}
          </span>
        </Link>
          
        )}
      </div>
    </header>
  );
};

export default Header;
