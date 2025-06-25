import React from 'react';
import { IoMdSearch } from 'react-icons/io';
import { HiMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="flex h-full items-center justify-between px-1.5 text-xs sm:px-6 sm:text-sm md:text-base">
      {/* Left: Menu icon and nav links */}
      <div className="flex w-full items-center gap-2 sm:gap-[3rem]">
        <Link to="/" className="text-lg text-white sm:text-3xl" aria-label="Menu">
          <HiMenu />
        </Link>
        <div className="flex w-full items-center justify-center gap-4 pr-2 sm:gap-6 md:w-fit md:gap-8 [&>*]:py-1">
          <Link to="/" className="rounded-md border-[0.5px] border-[#5A5A5A] bg-[#242424] px-0.5 py-1 sm:px-2 md:px-5">
            Charging Stations
          </Link>
          <Link to="/">Fleet Sizing</Link>
          <Link to="/">Parking</Link>
        </div>
      </div>

      {/* Right: Search bar */}
      <form className="relative hidden items-center sm:flex" role="search">
        <input
          type="text"
          placeholder="Search"
          className="w-full rounded-md border border-[#5A5A5A] bg-[#242424] py-1 pr-3 pl-10 text-white placeholder:text-white focus:border-[#8f8e8e] focus:outline-none"
        />
        <IoMdSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-xl text-white" />
      </form>
    </nav>
  );
};

export default Header;
