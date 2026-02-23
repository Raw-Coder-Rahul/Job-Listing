import React from "react";

const Button = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;