// Navbar.js

import React, { useState } from 'react';
import { MdHome, MdInfoOutline } from 'react-icons/md';
import { FaGamepad } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" p-4">
      <div className="flex items-center justify-between">
        <div className="text-black flex items-center">
          <FaGamepad className="mr-1 text-[#A367B1] font-bold text-6xl" /> 
          <h1 className='font-bold text-2xl'>Othello</h1>
        </div>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black focus:outline-none"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="hidden md:flex space-x-4 gap-4">
          <a href="#" className="text-black flex items-center text-lg">
            <MdHome className="mr-1" /> Home
          </a>
          <a href="#" className="text-black flex items-center text-lg">
            <MdInfoOutline className="mr-1" /> Explore
          </a>
          <button className='bg-[#392467] py-3 px-8 rounded-full text-white'>
            <a href="">Login</a>
          </button>
          {/* Add more links as needed */}
        </div>
      </div>
      {/* Mobile menu for small screens */}
      {isOpen && (
        <div className="md:hidden mt-4">
          <div className="flex flex-col space-y-2">
            <a href="#" className="text-black flex items-center">
              <MdHome className="mr-1" /> Home
            </a>
            <a href="#" className="text-black flex items-center">
              <MdInfoOutline className="mr-1" /> About
            </a>
            {/* Add more links as needed */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
