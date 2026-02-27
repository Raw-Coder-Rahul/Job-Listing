import React from "react";
import { MapPin, Clock, DollarSign } from "lucide-react";
import Button from "./Button";

const JobCards = ({ job }) => {
  const timeAgo = (date) => {
    const now = new Date();
    const posted = new Date(date);
    const diff = Math.floor((now - posted) / 1000);

    const minutes = Math.floor(diff / 60);
    const hours = Math.floor(diff / 3600);
    const days = Math.floor(diff / 86400);

    if (diff < 60) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    return `${days} day${days > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col justify-between border border-gray-100 dark:border-gray-700">

      {/* Top Badge */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
          {job.jobType}
        </span>

        <span className="text-xs text-gray-500">
          Posted {timeAgo(job.createdAt)}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {job.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2 mb-4">
          {job.description}
        </p>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span>{job.experience} Years Experience</span>
        </div>

        <div className="flex items-center gap-2">
          <DollarSign size={16} />
          <span>{job.salary}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-6 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {job.position}
        </span>

        <Button className="px-4 py-2 text-sm">
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default JobCards;