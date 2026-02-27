import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Avatar from "./Avatar";
import Popover from "./Popover";
import { User, Settings, LogOut, Menu, X, Sun, Moon } from "lucide-react";
import { clearAuth } from "../redux/authSlice";
import { USER_API_ENDPOINT } from "../utils/data";

const Navbar = ({ darkMode, setDarkMode }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const menuItems = ["Home", "Jobs", "Companies", "Contact"];

  const handleLogout = async () => {
    try {
      await axios.post(`${USER_API_ENDPOINT}logout`, {}, { withCredentials: true });
      dispatch(clearAuth());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 shadow-md transition-colors duration-500">
      {/* Full-width container */}
      <div className="w-full flex justify-between items-center h-16 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-32">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-600 dark:text-red-400">
          Job Portal
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-medium">
          {menuItems.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
              className="hover:text-red-500 dark:hover:text-red-300 transition"
            >
              {item}
            </Link>
          ))}
        </div>

        {/* User/Auth & Theme Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <Popover trigger={<Avatar name={user.fullName} size="md" />} position="bottom">
              <div className="flex flex-col w-56 space-y-2 p-2 rounded-md shadow-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
                <div className="px-2 py-2 border-b border-gray-300 dark:border-gray-700 break-words">
                  <p className="font-semibold text-red-500 dark:text-red-400">{user.fullName}</p>
                  <p className="text-sm text-red-600 dark:text-red-300">{user.email}</p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-2 py-1 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md break-words"
                >
                  <User size={16} /> Profile
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-2 px-2 py-1 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md break-words"
                >
                  <Settings size={16} /> Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-2 py-1 text-red-500 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md w-full text-left break-words"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </Popover>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg font-medium bg-red-600 dark:bg-red-700 text-white hover:bg-red-700 dark:hover:bg-red-800 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-lg font-medium bg-red-500 dark:bg-red-600 text-white hover:bg-red-600 dark:hover:bg-red-700 transition"
              >
                Register
              </Link>
            </>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 py-4 space-y-4 font-medium transition-all duration-300">
          {menuItems.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
              className="block hover:text-red-500 dark:hover:text-red-300 transition"
            >
              {item}
            </Link>
          ))}
          <hr className="border-gray-300 dark:border-gray-700" />
          {!user && (
            <>
              <Link
                to="/login"
                className="block w-full text-left hover:text-red-500 dark:hover:text-red-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full bg-red-500 dark:bg-red-600 text-white py-2 rounded-lg hover:bg-red-600 dark:hover:bg-red-700 transition"
              >
                Register
              </Link>
            </>
          )}

          {/* Mobile Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;