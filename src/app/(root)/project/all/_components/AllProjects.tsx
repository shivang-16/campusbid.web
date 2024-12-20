"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Header from "@/components/Header";
import { TbFilterCheck } from "react-icons/tb";
import { ProjectDataProps } from "@/helpers/types";
import { FaTimes } from "react-icons/fa";
import { TbFilterFilled } from "react-icons/tb";
import MinPaymentSlider from "@/components/ui/slider";
import Link from "next/link";


const popularSkills: string[] = [
  "Public Relations", "Content Writing", "Writing", "People",
  "English", "Article Writing", "Media Relations", "Copywriting",
  "Adobe Photoshop", "Video Editing", "JavaScript"
];

interface AllProjectsPageProps {
  projects: ProjectDataProps[];
}

const AllProjectsPage = ({ projects }: AllProjectsPageProps) => {
  const [minPayment, setMinPayment] = useState<number>(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [deadline, setDeadline] = useState("");
  const [showFilter, setShowFilter] = useState(false);


  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen relative lg:flex lg:flex-col lg:items-end">
      <Header />

      {/* Sidebar - Filters */}
      <aside
        className={`lg:w-1/4 bg-white p-6 rounded-lg shadow-lg lg:fixed top-[80px] h-[calc(100vh-80px)] overflow-y-auto 
          fixed inset-x-0 bottom-0  lg:translate-y-0 
          transition-transform duration-300 ease-in-out z-20
          ${showFilter ? "translate-y-0" : "translate-y-full lg:translate-y-0"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold text-teal-700 flex items-center gap-2">
            <TbFilterCheck /> Filters
          </h3>
          <button onClick={toggleFilter} className="text-teal-700 lg:hidden">
            <FaTimes size={20} />
          </button>
        </div>

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
          <MinPaymentSlider minPayment={minPayment} setMinPayment={setMinPayment} />
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
        <button
          onClick={toggleFilter}
          className="mt-4 w-full py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200 font-semibold"
        >
          Apply Filters
        </button>
      </aside>

      {/* Main Content - Project Listings */}
      <main className="pt-[80px] px-3 md:px-6 pb-16 lg:pb-10 lg:w-3/4">
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
        <div className="flex flex-col gap-6 md:gap-8">
          {projects.map((project, index) => (

            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md transition-transform transform duration-300 border border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-700 mb-4">{project.title}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">{project.description.substring(0,800)}...</p>
              <div className="flex justify-between items-center mb-6">
                <span className="text-teal-700 font-semibold text-lg">
                  ₹{project.budget.min} - ₹{project.budget.max}
                  <span className="text-teal-600 text-sm font-medium"> / Project</span>
                </span>
                <Link href={`/project/${project._id}`}>
                  <button className="px-5 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg shadow-md hover:from-teal-600 hover:to-teal-700 transition-all duration-300">
                    Bid Now
                  </button>
                </Link>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                {project.skillsRequired.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium bg-teal-50 text-teal-800 px-4 py-2 rounded-full border border-teal-200 shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 text-sm">
                <span className="font-semibold text-gray-700">Deadline:</span>{" "}
                {new Date(project.deadline).toLocaleDateString('en-GB')}
              </p>
            </div>

          ))}
        </div>
      </main>

      {/* Filter Footer Button for Mobile */}
      <button
        className="lg:hidden fixed bottom-0 left-0 right-0 text-xl bg-teal-500 text-white py-3 flex items-center justify-center gap-2 text-center font-semibold"
        onClick={toggleFilter}
      >
        <TbFilterFilled /> Filters
      </button>
    </div>
  );
};

export default AllProjectsPage;
