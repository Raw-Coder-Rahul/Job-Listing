import React from "react";

const sizes = {
  sm: "w-8 h-8 text-sm",
  md: "w-12 h-12 text-base",
  lg: "w-16 h-16 text-lg",
  xl: "w-24 h-24 text-xl",
};

const Avatar = ({
  src,
  alt = "Avatar",
  name = "",
  size = "md",
  className = "",
}) => {
  // Generate initials if no image
  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ");
    return words.length > 1
      ? words[0][0] + words[1][0]
      : words[0][0];
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-semibold overflow-hidden ${sizes[size]} ${className}`}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
};

export default Avatar;