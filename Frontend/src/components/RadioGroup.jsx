import React from "react";

const RadioGroup = ({ label, options, selected, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-gray-300">{label}</label>
      <div className="flex space-x-4">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center space-x-2">
            <input
              type="radio"
              name={label}
              value={opt.value}
              checked={selected === opt.value}
              onChange={() => onChange(opt.value)}
              className="accent-red-400"
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;