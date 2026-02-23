import React from "react";

const Label = ({ htmlFor, children }) => {
  return (
    <label htmlFor={htmlFor} className="block text-gray-700 font-medium mb-1">
      {children}
    </label>
  );
};

export default Label;