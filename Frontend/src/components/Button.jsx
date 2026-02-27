import React from "react";

const Button = ({ children, onClick, type = "button", className = "", disabled }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-lg font-medium transition
        bg-blue-600 dark:bg-red-600
        text-white
        hover:bg-blue-700 dark:hover:bg-red-700
        disabled:opacity-50
        focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-red-500
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;