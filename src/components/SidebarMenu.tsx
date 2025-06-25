import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdHome, IoMdCloudUpload, IoMdSettings } from 'react-icons/io';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { LuHistory } from 'react-icons/lu';

const SidebarMenu: React.FC = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close logout menu when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
      setShowLogout(false);
    }
  };

  useEffect(() => {
    if (showLogout) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLogout]);

  // Handle logout and redirect to login page
  const handleLogout = () => {
    localStorage.removeItem('idToken');
    // window.location.href = '/login';
    navigate('/login');
  };

  return (
    <nav className="flex h-full flex-col items-center justify-between pb-8 sm:text-3xl">
      <div className="flex h-full flex-col items-center sm:justify-between">
        {/* Navigation Icons */}
        <nav className="flex flex-col items-center gap-4 text-[#858882] sm:gap-10">
          <Link to="/" className="rounded-md border-[0.5px] border-[#5A5A5A] bg-[#242424] p-0.5 text-white sm:rounded-xl sm:p-2" aria-label="Home">
            <IoMdHome />
          </Link>
          <Link to="/" aria-label="Notifications">
            <FaBell />
          </Link>
          <Link to="/" aria-label="History">
            <LuHistory />
          </Link>
          <Link to="/" aria-label="Upload">
            <IoMdCloudUpload />
          </Link>
          <Link to="/" aria-label="Settings">
            <IoMdSettings />
          </Link>
        </nav>

        {/* Profile and Logout */}
        <div className="relative pt-4" ref={profileRef}>
          <button className="cursor-pointer" aria-label="User profile" onClick={() => setShowLogout((prev) => !prev)}>
            <FaUserCircle />
          </button>

          {/* Logout button dropdown */}
          <div
            className={`absolute bottom-12 left-5/2 -translate-x-1/2 transition-all duration-200 ${
              showLogout ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0'
            }`}
          >
            <button
              onClick={handleLogout}
              className="cursor-pointer rounded-lg border border-[#a2a1a1] bg-white px-4 py-2 text-base font-semibold text-[#242424] shadow-lg transition hover:bg-[#c0c0c0]"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SidebarMenu;
