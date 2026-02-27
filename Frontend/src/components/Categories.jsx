import React, { useState } from "react";
import Carousel from "./Carousel";

const categories = [
  "All",
  "Backend Developer",
  "Frontend Developer",
  "Full Stack Developer",
  "DevOps Engineer",
  "Cyber Security",
  "Data Scientist",
  "AI/ML Engineer",
  "Cloud Engineer",
  "Mobile Developer",
  "UI/UX Designer",
  "Database Administrator",
  "QA Engineer",
  "Product Manager",
  "Software Architect",
  "Blockchain Developer",
  "Game Developer",
];

const Categories = () => {
  const [selected, setSelected] = useState("All");

  const handleClick = (category) => {
    setSelected(category);
    console.log("Filter jobs by:", category);

    // Later you can dispatch Redux action here
    // dispatch(setCategoryFilter(category))
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            Explore Job Categories
          </h2>

          <span className="text-sm text-gray-500">
            Selected: <strong>{selected}</strong>
          </span>
        </div>

        <Carousel
          items={categories}
          autoSlide={true}
          interval={2500}
          renderItem={(category) => (
            <div
              onClick={() => handleClick(category)}
              className={`min-w-[220px] px-6 py-4 rounded-xl text-center cursor-pointer transition-all duration-300 shadow-md
                ${
                  selected === category
                    ? "bg-blue-600 text-white scale-105"
                    : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:scale-105"
                }`}
            >
              {category}
            </div>
          )}
        />
      </div>
    </section>
  );
};

export default Categories;