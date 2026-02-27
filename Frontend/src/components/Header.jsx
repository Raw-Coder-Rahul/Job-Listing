import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { Briefcase, Home, Users } from "lucide-react";

const Header = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;
    console.log("Searching for:", query);
  };

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-red-600 dark:from-gray-800 dark:to-gray-900 text-white relative overflow-hidden">
      {/* Hero Box */}
      <div className="w-full max-w-full lg:max-w-screen-xl mx-auto bg-white/10 dark:bg-gray-800/30 backdrop-blur-md rounded-xl px-8 lg:px-16 py-20 flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

        {/* Left Section */}
        <div className="lg:flex-1 text-left space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Find Your <span className="text-yellow-300">Dream Job</span> Today
          </h1>
          <p className="text-lg md:text-xl">
            Join over <strong>2,000+ verified companies</strong> and millions of professionals finding opportunities every day. 100% safe and secure platform for job seekers.
          </p>
          <p className="text-md md:text-lg text-gray-200">
            Explore thousands of jobs across multiple industries. Connect directly with recruiters and apply with confidence.
          </p>
          <p className="text-md md:text-lg text-gray-200">
            Platform highlights:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-200">
            <li>Verified companies and recruiters</li>
            <li>Secure applications with data privacy</li>
            <li>Personalized job recommendations</li>
          </ul>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex items-stretch w-full max-w-full lg:max-w-[650px] bg-white rounded-full shadow-lg overflow-hidden mt-6"
          >
            <input
              type="text"
              placeholder="Search jobs, companies, or locations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-6 py-4 text-gray-800 text-lg focus:outline-none"
            />
            <button
              type="submit"
              className="flex items-center justify-center px-6 md:px-8 bg-blue-600 hover:bg-blue-700 dark:bg-red-600 dark:hover:bg-red-700 transition"
            >
              <FiSearch size={24} className="text-white" />
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="lg:flex-1 flex flex-wrap justify-center lg:justify-end gap-6 md:gap-8">
          <div className="flex flex-col items-center justify-center w-44 md:w-48 h-44 md:h-48 bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-4">
            <Home size={36} className="text-white opacity-80 mb-2" />
            <p className="text-white text-center text-sm md:text-base font-semibold">
              Top companies hiring
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-44 md:w-48 h-44 md:h-48 bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-4">
            <Briefcase size={36} className="text-white opacity-80 mb-2" />
            <p className="text-white text-center text-sm md:text-base font-semibold">
              Thousands of jobs
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-44 md:w-48 h-44 md:h-48 bg-white/20 backdrop-blur-md rounded-xl shadow-lg p-4">
            <Users size={36} className="text-white opacity-80 mb-2" />
            <p className="text-white text-center text-sm md:text-base font-semibold">
              Connect with recruiters
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Circles */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400 opacity-20 rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-400 opacity-20 rounded-full translate-x-16 translate-y-16"></div>
    </header>
  );
};

export default Header;