"use client";
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Client: React.FC = () => {
  const [projectType, setProjectType] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleProjectSubmit = () => {
    if (!projectType || !projectDescription || files.length === 0) {
      setErrorMessage("Please fill in all fields and upload files.");
      return;
    }
    setErrorMessage("");
    alert(`Project Type: ${projectType}\nDescription: ${projectDescription}\nFiles: ${files.map(file => file.name).join(', ')}`);
  };

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const scrollCategories = (direction: any) => {
    const container = document.getElementById("categories-container");
    container?.scrollBy({
      left: direction * 150,
      behavior: "smooth",
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-700 relative">
      <Header />

        <div className="pt-[72px] bg-gray-50 min-h-screen">
          {/* Header with Steps */}
          <section className="text-center py-12 px-6 bg-gradient-to-r from-teal-100 to-purple-100 lg:px-36">
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
            <div className="flex justify-between items-center px-6 lg:px-36 mt-16 pb-12">
              <button className="flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                <FaChevronLeft className="text-gray-500" />
                <span>Back</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition">
                <span>Next: Skills</span>
                <FaChevronRight />
              </button>
            </div>
          </section>

          {/* Main Content */}


          {/* Footer Navigation */}

          <div className="w-full p-8 rounded-lg ">
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
          </div>
        </div>

      <Footer />
    </div>
  );
};

export default Client;
