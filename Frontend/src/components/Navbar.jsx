import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import Popover from "./Popover";
import { User, Settings, LogOut } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = false;

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-red-600 transition-colors duration-500">
          Job Portal
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium">
          <Link to="/" className="hover:text-red-400 transition">
            Home
          </Link>
          <Link to="/jobs" className="hover:text-red-400 transition">
            Jobs
          </Link>
          <Link to="/companies" className="hover:text-red-400 transition">
            Companies
          </Link>
          <Link to="/contact" className="hover:text-red-400 transition">
            Contact
          </Link>
        </div>

        {/* Auth / User Section */}
        <div className="flex items-center space-x-4">
          {user ? (
            <Popover
              trigger={
                <Avatar
                  src={"https://i.pravatar.cc/150?img=5"}
                  name={"John Doe"}
                  size="md"
                />
              }
              position="bottom"
            >
              <div className="flex flex-col w-56 space-y-2 p-2 rounded-md shadow-md bg-gray-800">
                <div className="px-2 py-2 border-b border-gray-700 break-words">
                  <p className="font-semibold text-red-400">John Doe</p>
                  <p className="text-sm text-red-300">john.doe@example.com</p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700 rounded-md break-words"
                >
                  <User size={16} /> Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-2 py-1 hover:bg-gray-700 rounded-md break-words"
                >
                  <Settings size={16} /> Settings
                </Link>
                <button className="flex items-center gap-2 px-2 py-1 text-red-500 hover:bg-gray-700 rounded-md w-full text-left break-words">
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </Popover>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg font-medium bg-red-700 text-white hover:bg-red-800 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white ml-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 space-y-4 font-medium bg-gray-900 text-white transition-colors duration-500">
          <Link to="/" className="block hover:text-red-400 transition">
            Home
          </Link>
          <Link to="/jobs" className="block hover:text-red-400 transition">
            Jobs
          </Link>
          <Link to="/companies" className="block hover:text-red-400 transition">
            Companies
          </Link>
          <Link to="/contact" className="block hover:text-red-400 transition">
            Contact
          </Link>
          <hr className="border-gray-700" />
          {!user && (
            <>
              <Link to="/login" className="block w-full text-left hover:text-red-400">
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;