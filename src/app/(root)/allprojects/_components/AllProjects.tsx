"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Header from "@/components/Header";
import { TbFilterCheck } from "react-icons/tb";

const popularSkills: string[] = [
  "Public Relations", "Content Writing", "Writing", "People",
  "English", "Article Writing", "Media Relations", "Copywriting",
  "Adobe Photoshop", "Video Editing", "JavaScript"
];

// Sample project data
const projects = [
  {
    title: "Marketing Strategy Project",
    description: "Develop a comprehensive marketing strategy for a new product line.",
    payment: 10000,
    duration: "3 Months",
    skills: ["Marketing", "Content Writing", "Public Relations"],
    deadline: "2024-12-15",
  },
  {
    title: "Website Redesign",
    description: "Revamp the company's website to improve user experience and aesthetics.",
    payment: 15000,
    duration: "1 Month",
    skills: ["UI/UX Design", "Adobe Photoshop", "JavaScript"],
    deadline: "2024-11-30",
  },
  {
    title: "Social Media Campaign",
    description: "Manage and create content for our social media platforms.",
    payment: 12000,
    duration: "6 Months",
    skills: ["Content Writing", "Copywriting", "Media Relations"],
    deadline: "2024-12-20",
  },
  {
    title: "Mobile App Development",
    description: "Develop a mobile app for e-commerce with user-friendly design and secure payment integration.",
    payment: 30000,
    duration: "5 Months",
    skills: ["JavaScript", "React Native", "Firebase"],
    deadline: "2025-01-10",
  },
  {
    title: "Content Creation for Blog",
    description: "Write and publish weekly articles on technology trends and innovation.",
    payment: 8000,
    duration: "2 Months",
    skills: ["Content Writing", "SEO", "Article Writing"],
    deadline: "2024-12-01",
  },
  {
    title: "Graphic Design for Social Media",
    description: "Create engaging graphics for social media posts and advertisements.",
    payment: 5000,
    duration: "1 Month",
    skills: ["Adobe Photoshop", "Illustrator", "Creativity"],
    deadline: "2024-11-25",
  },
  {
    title: "SEO Optimization Project",
    description: "Improve the SEO of our website to increase visibility and ranking on search engines.",
    payment: 7000,
    duration: "2 Months",
    skills: ["SEO", "Google Analytics", "Content Marketing"],
    deadline: "2024-12-10",
  },
  {
    title: "Customer Support Chatbot",
    description: "Develop a chatbot for our website to handle customer inquiries efficiently.",
    payment: 18000,
    duration: "4 Months",
    skills: ["Python", "Machine Learning", "Natural Language Processing"],
    deadline: "2025-02-01",
  },
  {
    title: "Product Photography",
    description: "Capture high-quality images of products for the online store.",
    payment: 10000,
    duration: "1 Month",
    skills: ["Photography", "Adobe Photoshop", "Lighting"],
    deadline: "2024-11-15",
  },
  {
    title: "Corporate Video Production",
    description: "Produce a corporate video to showcase our company's achievements and vision.",
    payment: 25000,
    duration: "2 Months",
    skills: ["Video Editing", "Script Writing", "Adobe Premiere Pro"],
    deadline: "2024-12-05",
  },
  {
    title: "Backend API Development",
    description: "Create APIs to support a new feature in our web application.",
    payment: 20000,
    duration: "3 Months",
    skills: ["Node.js", "Express", "MongoDB"],
    deadline: "2025-01-20",
  },
  {
    title: "Data Analysis for Marketing",
    description: "Analyze customer data to identify trends and optimize marketing campaigns.",
    payment: 15000,
    duration: "3 Months",
    skills: ["Data Analysis", "Excel", "SQL"],
    deadline: "2024-12-30",
  },
  {
    title: "Logo Design for Rebranding",
    description: "Design a new logo for our company as part of a rebranding initiative.",
    payment: 5000,
    duration: "2 Weeks",
    skills: ["Graphic Design", "Adobe Illustrator", "Creativity"],
    deadline: "2024-11-18",
  },
  {
    title: "Translation of Documents",
    description: "Translate company documents from English to Spanish.",
    payment: 6000,
    duration: "1 Month",
    skills: ["Translation", "Spanish", "English"],
    deadline: "2024-12-01",
  },
  {
    title: "E-Commerce Platform Testing",
    description: "Test and document bugs in our newly developed e-commerce platform.",
    payment: 9000,
    duration: "1 Month",
    skills: ["Software Testing", "Bug Reporting", "Attention to Detail"],
    deadline: "2024-11-28",
  },
  {
    title: "AI-Based Product Recommendation System",
    description: "Develop a recommendation system for our online store using AI algorithms.",
    payment: 28000,
    duration: "4 Months",
    skills: ["Machine Learning", "Python", "Data Science"],
    deadline: "2025-01-25",
  },
  {
    title: "Website Content Update",
    description: "Update the content on our website to reflect recent company changes.",
    payment: 4000,
    duration: "2 Weeks",
    skills: ["Content Writing", "SEO", "Editing"],
    deadline: "2024-11-17",
  },
  {
    title: "Corporate Branding Strategy",
    description: "Develop a comprehensive branding strategy for our corporate identity.",
    payment: 20000,
    duration: "3 Months",
    skills: ["Marketing Strategy", "Branding", "Market Research"],
    deadline: "2024-12-29",
  },
  {
    title: "CRM System Setup",
    description: "Implement a CRM system for better customer relationship management.",
    payment: 22000,
    duration: "3 Months",
    skills: ["CRM", "Salesforce", "Customer Support"],
    deadline: "2025-01-15",
  },
  {
    title: "App Store Optimization",
    description: "Optimize our app listing on the app store to increase downloads.",
    payment: 8000,
    duration: "1 Month",
    skills: ["App Store Optimization", "Marketing", "SEO"],
    deadline: "2024-11-27",
  },
];


const AllProjectsPage: React.FC = () => {
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
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search projects..."
              className="w-72 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-teal-500 focus:outline-none"
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
                <span className="text-teal-600 font-bold">₹{project.payment} <span className="text-teal-600 font-medium">/ Project</span></span>
                <button className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200">
                  Apply Now
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {project.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-xs bg-teal-100 text-teal-700 px-3 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 text-sm">Deadline: {project.deadline}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllProjectsPage;
