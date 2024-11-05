"use client";
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Header from '@/components/Header';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaEdit } from "react-icons/fa";
import { createProject } from '@/actions/project_actions';
import { uploadImageToS3 } from '@/actions/s3_actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const Client: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [title, setTitle] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [budget, setBudget] = useState({ min: '', max: '' });
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]); // Store preview URLs
  const [description, setDescription] = useState<string>('');

  const router = useRouter()

  const checkEnableNext = () => {
    switch (stepIndex) {
      case 0:
        return title.trim() !== '';
      case 1:
        return selectedSkills.length > 0;
      case 2:
        return deadline !== null;
      case 3:
        const minBudget = parseFloat(budget.min);
        const maxBudget = parseFloat(budget.max);
        return !isNaN(minBudget) && !isNaN(maxBudget) && minBudget > 0 && maxBudget > 0 && minBudget <= maxBudget;
      case 4:
        return description.trim() !== '' || files.length > 0;
      default:
        return false;
    }
  };
  

  const handleDeleteFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setFilePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const onDrop = (acceptedFiles: File[]) => {
    const validFiles = acceptedFiles.filter((file) => {
      const isValidType = file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type.startsWith('image/');
      const isValidSize = file.size <= 50 * 1024 * 1024; // 50 MB
      return isValidType && isValidSize;
    });

    setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const popularSkills: string[] = [
    'Public Relations', 'Content Writing', 'Writing', 'People',
    'English', 'Article Writing',
    'Media Relations', 'Copywriting', 'Adobe Photoshop',
    'Video Editing', 'JavaScript'
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
      if (prevSkills.includes(skill) && prevSkills.length > 1) {
        return prevSkills.filter((s) => s !== skill); // Remove skill if already selected
      } else if (prevSkills.length < 5 && !prevSkills.includes(skill)) {
        return [...prevSkills, skill]; // Add skill if not selected, limit to 5
      }
      return prevSkills; // Return existing array if max skills are selected
    });
  };


  const goToNextStep = () => {
    setStepIndex(stepIndex + 1);
  };

  const goToPreviousStep = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const formattedFiles = files?.map(( file ) => ({
    name: file.name,
    fileSize: file.size,
    fileType: file.type
  }))
  const handleSubmit = async () => {
    const formattedData = {
      title,
      description,
      budget,
      deadline,
      skillsRequired: selectedSkills,
      supportingDocs: formattedFiles,
    };
    console.log("Formatted Data:", formattedData);
  
    // Create the project and get signed URLs for file uploads
    const response = await createProject(formattedData);
    const { signedUrls, project } = response;
  
    // Map over files to upload each one to its corresponding signed URL
    const uploadFiles = files.map((file, index) => {
      const signedUrl = signedUrls[index];
      return uploadImageToS3(file, signedUrl);
    });
  
    // Wait until all file uploads are complete
    await Promise.all(uploadFiles);

    toast.success("Project created")


    setTitle('')
    setDescription('')
    setBudget({ min: '', max: '' })
    setFiles([])
    setFilePreviews([])
    setSelectedSkills([])
    setStepIndex(0)

    router.replace(`/project/${project._id}`)
  
    console.log("Response after file uploads:", response);
  };
  
  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-700 relative">
      <Header />
      <div className="pt-[65px]">
        <div className=" bg-gradient-to-r from-teal-50 to-purple-50 pt-8 pb-2 px-4 flex justify-between items-center border-t-2 rounded-t-3xl">
          <div className="w-full flex justify-center items-center gap-2">
            <div className="flex items-center rounded-[5px] gap-1 sm:gap-[8px] w-[85%] sm:w-[80%] mx-auto">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="flex-1 flex items-center">
                  <div
                    className={`h-[4px] sm:h-[6px] md:h-[8px] ${index < stepIndex ? 'bg-teal-500' : index == stepIndex ? 'bg-blue-300' : 'bg-gray-300'} rounded-[3px] transition-colors duration-300`}
                    style={{ width: '100%' }}
                  ></div>
                  {index < 6 - 1 && <div className="w-[2px] sm:w-[3px] md:w-[4px]"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Step 0 */}
        {stepIndex === 0 && (
          <section className=" text-center pt-12 pb-3 px-6 bg-gradient-to-r from-teal-50 to-purple-50 lg:px-36">
            <div>
              <p className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Step 1 of 6</p>
              <h2 className="text-4xl font-extrabold text-gray-800 mt-2">Craft an Attention-Grabbing Title</h2>
              <p className="text-lg text-gray-700 mt-4 max-w-lg mx-auto">
                Your job title is the first thing candidates will see. Make sure it stands out and accurately reflects the role.
              </p>
              <div className="flex flex-col md:flex-row items-start justify-center px-6 lg:px-36 mt-16 space-y-10 md:space-y-0 md:space-x-12">
                {/* Left Section - Job Title Input */}
                <div className="w-[65%] px-8">
                  <label htmlFor="jobTitle" className="block text-xl text-gray-800 font-semibold mb-3">
                    Job Title
                  </label>
                  <input
                    id="jobTitle"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
          <section className="text-center flex justify-center pt-12 pb-3 px-6 bg-gradient-to-r from-teal-50 to-purple-50 lg:px-36">
            <div className="w-[65%] px-8">
              <p className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Step 2 of 6</p>
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
                  <p className="text-gray-400 text-sm mt-2">Add atleast one relevant skills</p>
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

        {stepIndex === 2 && (
          <section className="text-center pt-12 pb-3 px-6 bg-gradient-to-r from-teal-50 to-purple-50 lg:px-36">
            <div>
              <p className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Step 3 of 6</p>
              <h2 className="text-4xl font-extrabold text-gray-800 mt-2 font-roboto">Set a Time Limit or Deadline</h2>
              <p className="text-lg text-gray-700 mt-4 max-w-lg mx-auto">
                Establishing a clear deadline helps candidates understand the urgency and importance of the role.
              </p>
              <div className="flex flex-col md:flex-row items-start justify-center px-6 lg:px-36 mt-16 space-y-10 md:space-y-0 md:space-x-12">
                {/* Left Section - Time Limit Input */}
                <div className="w-[65%] px-8">
                  <label htmlFor="deadline" className="block text-xl text-gray-800 font-semibold mb-3">
                    Deadline
                  </label>
                  <DatePicker
                    selected={deadline}
                    onChange={(date) => setDeadline(date)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300 shadow-sm placeholder-gray-400 font-roboto"
                    placeholderText="Select a deadline"
                    dateFormat="MMMM d, yyyy" // Format for displaying the date
                    isClearable
                    showPopperArrow={false}
                  />

                  {/* Example Deadlines */}
                  <div className="mt-6">
                    <p className="text-gray-700 font-semibold mb-2 text-xl">Example Deadlines</p>
                    <ul className="list-disc pl-5 space-y-1 text-gray-600">
                      <li>Applications due by December 1, 2024</li>
                      <li>Submit proposals by November 15, 2024</li>
                      <li>Deadline for feedback: January 10, 2025</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

{stepIndex === 3 && ( // Adjust stepIndex according to your needs
  <section className="text-center pt-12 pb-3 px-6 bg-gradient-to-r from-teal-50 to-purple-50 lg:px-36">
    <div>
      <p className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Step 4 of 6</p>
      <h2 className="text-4xl font-extrabold text-gray-800 mt-2">Set Your Project Budget</h2>
      <p className="text-lg text-gray-700 mt-4 max-w-lg mx-auto">
        Defining a budget helps streamline the hiring process and ensures you attract the right talent for your project.
      </p>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 lg:px-36 mt-16 space-y-10 md:space-y-0 md:space-x-12">
        {/* Left Section - Budget Input */}
        <div className="w-[65%] px-8">
          <label htmlFor="minBudget" className="block text-xl text-gray-800 font-semibold mb-3">
            Minimum Budget (INR)
          </label>
          <input
  id="minBudget"
  type="number"
  value={budget.min}
  onChange={(e) => setBudget(prev => ({ ...prev, min: e.target.value }))}
  placeholder="Enter minimum budget (e.g., 50000)"
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300 shadow-sm placeholder-gray-400"
/>

          <label htmlFor="maxBudget" className="block text-xl text-gray-800 font-semibold mb-3 mt-6">
            Maximum Budget (INR)
          </label>
          <input
  id="maxBudget"
  type="number"
  value={budget.max}
  onChange={(e) => setBudget(prev => ({ ...prev, max: e.target.value }))}
  placeholder="Enter maximum budget (e.g., 100000)"
  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300 shadow-sm placeholder-gray-400"
/>

          {/* Example Budgets */}
        </div>
      </div>
    </div>
  </section>
)}


{stepIndex === 4 && (
  <section className="text-center pt-12 pb-3 px-6 bg-gradient-to-r from-teal-50 to-purple-50 lg:px-36">
    <div>
      <p className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Step 5 of 6</p>
      <h2 className="text-4xl font-extrabold text-gray-800 mt-2">Add Project Description and Upload Files</h2>
      <p className="text-lg text-gray-700 mt-4 max-w-lg mx-auto">
        Provide a clear project description and upload any relevant documents to support your requirements.
      </p>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 lg:px-36 mt-16 space-y-10 md:space-y-0 md:space-x-12">
        
        {/* Left Section - Budget Input */}
        <div className="w-[65%] px-8">

          {/* Description Input */}
          <label htmlFor="description" className="block text-xl text-gray-800 font-semibold mb-3 mt-6">
            Project Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your project in detail..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300 shadow-sm placeholder-gray-400 h-32"
          />

          {/* Drag and Drop Area */}
          <div
            {...getRootProps({ className: 'mt-6 border-dashed border-2 border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50' })}
          >
            <input {...getInputProps()} />
            <p className="text-gray-600">Drag & drop your PDF or DOC files here (max: 50 MB)</p>
            <p className="text-gray-500">or click to select files</p>
          </div>

          {/* File Previews */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            {files.map((file, index) => (
              <div key={index} className="relative">
                {file.type.startsWith("image/") ? (
                  <img src={filePreviews[index]} alt={file.name} className="w-full h-40 object-cover rounded" />
                ) : file.type === "application/pdf" ? (
                  <embed src={filePreviews[index]} type="application/pdf" className="w-full h-40 object-cover rounded" />
                ) : (
                  <div className="p-4 bg-gray-100 rounded text-sm text-gray-700">
                    {file.name} ({Math.round(file.size / 1024)} KB)
                  </div>
                )}
                <button onClick={() => handleDeleteFile(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">✕</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)}
       {stepIndex === 5 && (
          <section className="text-center pt-12 pb-3 px-6 bg-gradient-to-r from-teal-50 to-purple-50 lg:px-36">
            <div className="max-w-4xl mx-auto">
              <p className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Step 6 of 6</p>
              <h2 className="text-4xl font-extrabold text-gray-800 mt-2 mb-4">Project details</h2>

              <div className="border rounded-lg shadow-sm p-6 space-y-4">
                {/* Job Title Section */}
                <div className="flex justify-between items-center border-b pb-4">
                  <div className="flex flex-col items-start">
                    <h2 className="text-lg font-semibold">{title || "Title not set"}</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {description || "Description not set"}
                    </p>
                  </div>
                  <FaEdit onClick={() => setStepIndex(0)} className="text-teal-600 cursor-pointer" />
                </div>

                {/* Skills Section */}
                <div className="border-b pb-4 flex flex-col items-start gap-2">
                  <h3 className="text-md text-md font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSkills.map((skill) => (
                      <button
                        key={skill}
                        onClick={() => {handleSkillSelect(skill)}}
                        className={`px-2 py-1 border rounded-lg ${selectedSkills.includes(skill)
                          ? "bg-teal-600 text-white"
                          : "bg-gray-200 text-gray-600"
                          }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 flex flex-col items-start">
                    <h4 className="text-md font-semibold">Selected Skills:</h4>
                    <p className="text-sm text-gray-600">
                      {selectedSkills.length > 0
                        ? selectedSkills.join(", ")
                        : "No skills selected"}
                    </p>
                  </div>
                </div>

                {/* Deadline Section */}
                <div className="flex justify-between items-center border-b pb-4">
                  <div className="flex flex-col items-start">
                    <h3 className="text-md font-semibold">Deadline</h3>
                    <p className="text-sm text-gray-600">
                      {deadline ? deadline.toLocaleDateString() : "Deadline not set"}
                    </p>
                  </div>
                  <FaEdit onClick={() => setStepIndex(2)} className="text-teal-600 cursor-pointer" />
                </div>

                {/* Budget Section */}
                <div className="flex justify-between items-center border-b pb-4">
                  <div className="flex flex-col items-start">
                    <h3 className="text-md font-semibold">Budget</h3>
                    <p className="text-sm text-gray-600">
                      {budget ? `${budget.max} - ${budget.min} (INR)` : "Budget not set"}
                    </p>
                  </div>
                  <FaEdit onClick={() => setStepIndex(3)} className="text-teal-600 cursor-pointer" />
                </div>

                {/* Files Section */}
                <div className="border-b pb-4">
                  <h3 className="text-md font-semibold mb-2">Attached Files</h3>
                  {files.length > 0 ? (
                    <ul className="text-sm text-gray-600 space-y-2">
                      {files.map((file, index) => (
                        <li key={index} className="flex items-center justify-between">
                          <span>{file.name}</span>
                          <FaEdit onClick={() => setStepIndex(4)} className="text-teal-600 cursor-pointer ml-2" />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600">No files attached</p>
                  )}
                </div>
              </div>

              {/* Post Button */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-300"
                  >
                  Post this job
                </button>
              </div>
            </div>
          </section>
        )}



        <div className={`bg-gradient-to-r from-teal-50 to-purple-50 p-4 flex ${stepIndex === 0 ? "justify-end" : "justify-between"}  items-center`}>
          <button
            onClick={goToPreviousStep}
            className={`px-4 py-2 bg-gray-200 rounded-lg ${stepIndex === 0 ? 'hidden' : ''}`}
            disabled={stepIndex === 0}
          >
            Back
          </button>
          <button
            onClick={goToNextStep}
            className={`px-4 py-2 ${!checkEnableNext() ? "bg-gray-300 text-gray-400" : "bg-teal-600 text-white"} rounded-lg ${stepIndex === 5 ? 'hidden' : ''}`}
            disabled={!checkEnableNext()} // Call checkEnableNext() to get a boolean
            aria-disabled={!checkEnableNext()} // Set aria-disabled based on the result of checkEnableNext()
          >
            Next
          </button>


        </div>


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

        {/* Fixed Step Indicator with Navigation Buttons */}

      </div>
    </div>
  );
};

export default Client;
