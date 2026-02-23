import React, { useState, useRef, useEffect } from "react";

const Popover = ({ trigger, children, position = "bottom" }) => {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <div onClick={() => setOpen(!open)} className="cursor-pointer">
        {trigger}
      </div>

      {open && (
        <div
          className={`absolute z-50 min-w-[200px] max-w-xs md:max-w-sm bg-gray-800 text-white shadow-lg rounded-lg p-3 transition-all duration-200 break-words ${positionClasses[position]}`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export default Popover;