import React from "react";
import JobCards from "./JobCards";

const dummyJobs = [
  {
    title: "Senior Backend Developer",
    description: "Build scalable APIs and work with Node.js and MongoDB.",
    location: "Bangalore, India",
    salary: "₹12-18 LPA",
    jobType: "Full Time",
    experience: 3,
    position: "Backend Engineer",
    createdAt: "2026-02-25T09:00:00Z",
  },
  {
    title: "Frontend Developer (React)",
    description: "Develop modern UI using React and Tailwind CSS.",
    location: "Remote",
    salary: "₹8-14 LPA",
    jobType: "Remote",
    experience: 2,
    position: "Frontend Developer",
    createdAt: "2026-02-27T14:00:00Z",
  },
  {
    title: "DevOps Engineer",
    description: "Manage CI/CD pipelines and AWS infrastructure.",
    location: "Hyderabad, India",
    salary: "₹15-22 LPA",
    jobType: "Full Time",
    experience: 4,
    position: "DevOps Specialist",
    createdAt: "2026-02-20T10:30:00Z",
  },
  {
    title: "Cyber Security Analyst",
    description: "Monitor security threats and ensure system safety.",
    location: "Mumbai, India",
    salary: "₹10-16 LPA",
    jobType: "Full Time",
    experience: 3,
    position: "Security Analyst",
    createdAt: "2026-02-24T11:00:00Z",
  },
  {
    title: "AI/ML Engineer",
    description: "Build machine learning models and deploy AI systems.",
    location: "Pune, India",
    salary: "₹18-28 LPA",
    jobType: "Full Time",
    experience: 4,
    position: "Machine Learning Engineer",
    createdAt: "2026-02-26T12:00:00Z",
  },
  {
    title: "Mobile App Developer (Flutter)",
    description: "Develop cross-platform mobile applications.",
    location: "Chennai, India",
    salary: "₹7-12 LPA",
    jobType: "Full Time",
    experience: 2,
    position: "Flutter Developer",
    createdAt: "2026-02-22T08:00:00Z",
  },
  {
    title: "UI/UX Designer",
    description: "Design modern, user-friendly interfaces and experiences.",
    location: "Delhi, India",
    salary: "₹6-10 LPA",
    jobType: "Full Time",
    experience: 2,
    position: "Product Designer",
    createdAt: "2026-02-28T06:00:00Z",
  },
  {
    title: "Cloud Engineer (AWS)",
    description: "Manage cloud infrastructure and optimize deployments.",
    location: "Remote",
    salary: "₹14-20 LPA",
    jobType: "Remote",
    experience: 3,
    position: "Cloud Engineer",
    createdAt: "2026-02-23T15:00:00Z",
  },
  {
    title: "Full Stack Developer (MERN)",
    description: "Work on both frontend and backend systems.",
    location: "Ahmedabad, India",
    salary: "₹10-16 LPA",
    jobType: "Full Time",
    experience: 3,
    position: "Full Stack Developer",
    createdAt: "2026-02-21T09:00:00Z",
  },
  {
    title: "Data Analyst",
    description: "Analyze business data and generate insights.",
    location: "Kolkata, India",
    salary: "₹5-9 LPA",
    jobType: "Full Time",
    experience: 1,
    position: "Data Analyst",
    createdAt: "2026-02-28T10:00:00Z",
  },
];

const LatestJobs = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Latest Job Openings
          </h2>

          <button className="text-blue-600 hover:underline text-sm font-medium">
            View All Jobs
          </button>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {dummyJobs.map((job, index) => (
            <JobCards key={index} job={job} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default LatestJobs;