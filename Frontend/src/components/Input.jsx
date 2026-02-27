import React from "react";

const Input = ({ label, type = "text", value, onChange, placeholder, name }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-gray-700 dark:text-gray-300">{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-red-500 transition"
      />
    </div>
  );
};

export default Input;