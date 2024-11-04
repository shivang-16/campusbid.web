"use client";
import React, { useState } from 'react';
import { FaSearch, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useDropzone } from 'react-dropzone';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Client: React.FC = () => {
  const [projectType, setProjectType] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const popularSkills: string[] = [
    'Public Relations', 'Content Writing', 'Creative Writing', 'Writing', 'People',
    'English', 'Smartphone', 'Autodesk AutoCAD', 'Video Production', 'Article Writing',
    'Graphic Design', 'Android', 'Media Relations', 'Copywriting', 'Adobe Photoshop',
    'Video Editing', 'JavaScript', 'iOS', 'Android App Development', 'Mobile App Development'
  ];

  const scrollCategories = (direction: any) => {
    const container = document.getElementById("categories-container");
    container?.scrollBy({
      left: direction * 150,
      behavior: "smooth",
    });
  };

  const handleSkillSelect = (skill: string) => {
    setSelectedSkills((prevSkills) => {
      if (prevSkills.includes(skill)) {
        return prevSkills.filter((s) => s !== skill); // Remove skill if already selected
      } else if (prevSkills.length < 5) {
        return [...prevSkills, skill]; // Add skill if not selected, limit to 5
      }
      return prevSkills; // Return existing array if max skills are selected
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: (acceptedFiles: File[]) => setFiles(acceptedFiles) });

  const goToNextStep = () => {
    setStepIndex(stepIndex + 1);
  };

  const goToPreviousStep = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-700 relative">
      <Header />

      <div className="pt-[72px] from-teal-100 to-purple-100">
        {/* Step 0 */}
        {stepIndex === 0 && (
          <section className=" min-h-screen text-center py-12 px-6 bg-gradient-to-r from-teal-100 to-purple-100 lg:px-36">
            <div>
              <p className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Step 1 of 5</p>
              <h2 className="text-4xl font-extrabold text-gray-800 mt-2">Craft an Attention-Grabbing Title</h2>
              <p className="text-lg text-gray-700 mt-4 max-w-lg mx-auto">
                Your job title is the first thing candidates will see. Make sure it stands out and accurately reflects the role.
              </p>
              <div className="flex flex-col md:flex-row items-start justify-center px-6 lg:px-36 mt-16 space-y-10 md:space-y-0 md:space-x-12">
                {/* Left Section - Job Title Input */}
                <div className="w-[65%] p-8">
                  <label htmlFor="jobTitle" className="block text-xl text-gray-800 font-semibold mb-3">
                    Job Title
                  </label>
                  <input
                    id="jobTitle"
                    type="text"
                    placeholder="e.g., UX/UI designer to bring website mockup to life"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300 shadow-sm placeholder-gray-400"
                  />

                  {/* Example Titles */}
                  <div className="mt-6">
                    <p className="text-gray-700 font-semibold mb-2 text-xl">Example Titles</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>UX/UI designer to bring website mockup and prototype to life</li>
                      <li>Video editor needed to create whiteboard explainer video</li>
                      <li>UX designer with e-commerce experience to support app development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Step 1 */}
        {stepIndex === 1 && (
          <section className="text-center flex justify-center py-12 px-6 bg-gradient-to-r from-teal-100 to-purple-100 lg:px-36 min-h-screen">
            <div className="w-[65%] p-8">
              <p className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Step 2 of 5</p>
              <h2 className="text-4xl font-extrabold text-gray-800 mt-2">Identify Key Skills for Your Role</h2>
              <p className="text-lg text-gray-700 mt-4 max-w-lg mx-auto">
                Select the skills that are essential for the job. Aim for 3-5 skills to get the best match for your role requirements.
              </p>

              <div className="w-full max-w-md mx-auto mt-8">
                {/* Skill Search Input */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    placeholder="Search for skills or add your own"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:border-teal-500"
                  />
                  <p className="text-gray-400 text-sm mt-2">Add up to 5 relevant skills</p>
                </div>

                {selectedSkills.length > 0 && (
                  <div className="mt-8 mb-5 p-4">
                    <p className="text-gray-700 font-semibold mb-2">Selected Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-teal-100 text-teal-600 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Skills */}
                <p className="text-gray-700 font-medium mb-4">Popular Skills for Creative Writing</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {popularSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleSkillSelect(skill)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${selectedSkills.includes(skill)
                          ? 'bg-teal-500 text-white'
                          : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* <div className="w-full p-8 rounded-lg ">
          <p className="text-lg font-semibold text-gray-800 mb-6">Recommended Freelancers</p>
          <div className="flex flex-wrap justify-center space-x-10">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-gray-200 mb-3"></div>
                <div className="w-16 h-3 bg-gray-300 rounded mb-1"></div>
                <div className="w-20 h-3 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
          <button className="text-teal-600 font-medium text-sm mt-6 hover:underline">View More Freelancers</button>
        </div> */}

        {/* Fixed Step Indicator with Navigation Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-l from-teal-100 to-purple-100 shadow-lg p-4 flex justify-between items-center border-t-2 rounded-t-3xl">
          <button
            onClick={goToPreviousStep}
            className={`px-4 py-2 bg-gray-200 rounded-lg ${stepIndex === 0 ? 'hidden' : ''}`}
            disabled={stepIndex === 0}
          >
            Back
          </button>
          <div className="w-full flex justify-center items-center gap-2">
            <div className="flex items-center rounded-[5px] gap-1 sm:gap-[8px] w-[85%] sm:w-[80%] mx-auto">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex-1 flex items-center">
                  <div
                    className={`h-[4px] sm:h-[6px] md:h-[8px] ${index < stepIndex  ? 'bg-teal-500' : index == stepIndex  ? 'bg-blue-400' : 'bg-gray-300'} rounded-[3px] transition-colors duration-300`}
                    style={{ width: '100%' }}
                  ></div>
                  {index < 5 - 1 && <div className="w-[2px] sm:w-[3px] md:w-[4px]"></div>}
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={goToNextStep}
            className={`px-4 py-2 bg-teal-600 text-white rounded-lg ${stepIndex === 4 ? 'hidden' : ''}`}
            disabled={stepIndex === 4} // Optionally disable if it's the last step
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Client;
