"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Header from "@/components/Header";
import { TbFilterCheck } from "react-icons/tb";
import { ProjectDataProps } from "@/helpers/types";

const popularSkills: string[] = [
  "Public Relations", "Content Writing", "Writing", "People",
  "English", "Article Writing", "Media Relations", "Copywriting",
  "Adobe Photoshop", "Video Editing", "JavaScript"
];

interface AllProjectsPageProps {
  projects: ProjectDataProps[];
}


const AllProjectsPage = ({projects}: AllProjectsPageProps) => {
  const [minPayment, setMinPayment] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [deadline, setDeadline] = useState("");

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 bg-gray-100 min-h-screen">
      <Header />

      {/* Sidebar - Filters */}
      <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-lg fixed top-[80px] h-[calc(100vh-80px)] overflow-y-auto ">
        <h3 className="text-2xl font-semibold text-teal-700 mb-6 flex items-center gap-2"><TbFilterCheck />Filters</h3>

        {/* Profile Filter */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Profile e.g., Marketing"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        {/* Minimum Payment Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Payment</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={0}
              max={50000}
              value={minPayment}
              onChange={(e) => setMinPayment(Number(e.target.value))}
              className="w-full h-2 appearance-none mb-2 rounded-full outline-none"
            />
          </div>

          <style jsx>{`
    /* Base track styling */
    input[type="range"] {
      -webkit-appearance: none;
      appearance: none;
      width: 100%;
    }

    /* Track styling */
    input[type="range"]::-webkit-slider-runnable-track {
      height: 4px;
      border-radius: 2px;
      background: linear-gradient(
        to right,
        #14b8a6 ${(minPayment / 50000) * 100}%,
        #d1d5db ${(minPayment / 50000) * 100}% 100%
      ); /* Teal for filled and gray for unfilled */
    }

    input[type="range"]::-moz-range-track {
      height: 4px;
      background-color: #d1d5db;
      border-radius: 2px;
    }

    input[type="range"]::-ms-track {
      height: 4px;
      background-color: #d1d5db;
      border-radius: 2px;
    }

    /* Thumb (handle) styling */
    input[type="range"]::-webkit-slider-thumb {
      appearance: none;
      width: 20px;
      height: 20px;
      background-color: #14b8a6; /* Dark teal color for thumb */
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
      margin-top: -8px; /* Center the thumb */
    }

    input[type="range"]::-moz-range-thumb {
      width: 20px;
      height: 20px;
      background-color: #14b8a6;
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    }

    input[type="range"]::-ms-thumb {
      width: 20px;
      height: 20px;
      background-color: #14b8a6;
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    }
  `}</style>
          <span className="text-gray-600">₹{minPayment}</span>
        </div>

        {/* Skills Filter */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {popularSkills.map((skill) => (
              <button
                key={skill}
                onClick={() => handleSkillToggle(skill)}
                className={`px-3 py-1 rounded-full text-sm font-medium border ${selectedSkills.includes(skill)
                  ? "bg-teal-500 text-white border-teal-500"
                  : "bg-white text-teal-500 border-teal-500 hover:bg-teal-100"
                  } transition duration-200`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Deadline Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        {/* Apply Filters Button */}
        <button className="mt-4 w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200 font-semibold">
          Apply Filters
        </button>
      </aside>

      {/* Main Content - Project Listings */}
      <main className="flex-1 lg:ml-[25%] pt-[80px] px-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-72 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            <button className="px-4 py-3 bg-teal-500 text-white rounded-r-lg hover:bg-teal-600 transition duration-200">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Project Listings */}
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">
                {project.description}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-teal-600 font-bold">₹{project.budget.min} - ₹{project.budget.max} <span className="text-teal-600 font-medium">/ Project</span></span>
                <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200">
                  Apply Now
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.skillsRequired.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 text-sm">
                  Deadline: {new Date(project.deadline).toLocaleDateString('en-GB')}
              </p>             
             </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllProjectsPage;
