"use client";
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Header from '@/components/Header';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { FaEdit } from "react-icons/fa";
import { createProject } from '@/actions/project_actions';
import { uploadImageToS3 } from '@/actions/s3_actions';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import Description from '@/components/ui/description';
import { ChangeEvent, KeyboardEvent } from 'react';
import InputWithCurrency from '@/components/ui/amountinput';
import { getAllOptions } from '@/actions/data_actions';

interface Budget {
  min: number;
  max: number;
  minCurrency: string;
  maxCurrency: string;
}

interface StepFiveProps {
  stepIndex: number;
  budget: Budget;
  setBudget: React.Dispatch<React.SetStateAction<Budget>>;
}

interface option {
  _id: string;
  option: string
  type: string
  values: string
  tag: string
}

const Client: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [title, setTitle] = useState<string>('');
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [budget, setBudget] = useState({
    min: 0, max: 0, currency: ''
  });
  const [files, setFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]); // Store preview URLs
  const [description, setDescription] = useState<string>('');
  const [inputSkillValue, setInputSkillValue] = useState<string>("");
  const [typeValueCategory, setTypeValueCategory] = useState("");
  const [typeValueSkill, setTypeValueSkill] = useState("");
  const [options, setOptions] = useState<option[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<option[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<option[]>([]);
  const [blurCategory, setBlurCategory] = useState(false);
  const [blurSkill, setBlurSkill] = useState(false);


  useEffect(() => {
    setOptions([])
    const fetchData = async () => {
      try {
        const data = await getAllOptions("skill", "", typeValueSkill);
        setOptions(data.options);
        console.log(data.options);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    if (stepIndex == 2) {
      fetchData();
    }
  }, [typeValueSkill, stepIndex]);



  useEffect(() => {
    setOptions([])
    const fetchData = async () => {
      try {
        const data = await getAllOptions("category", "", typeValueCategory);
        setOptions(data.options);
        console.log(data.options);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };
    if (stepIndex == 1) {
      fetchData();
    }
  }, [typeValueCategory, stepIndex]);



  const router = useRouter()

  const checkEnableNext = () => {
    switch (stepIndex) {
      case 0:
        return title.trim() !== '';
      case 1:
        return selectedCategories.length > 0;
      case 2:
        return selectedSkills.length > 0;
      case 3:
        return deadline !== null;
      case 4:
        const minBudget = budget.min;
        const maxBudget = budget.max;
        return !isNaN(minBudget) && !isNaN(maxBudget) && minBudget > 0 && maxBudget > 0 && minBudget <= maxBudget;
      case 5:
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


  const Categories: string[] = [
    "Web Development",
    "Mobile App Development",
    "Digital Marketing",
    "Graphic Design",
    "Product Design",
    "Content Writing",
    "Video Production",
    "Data Science & Analytics",
    "Machine Learning & AI"

  ];

  const scrollCategories = (direction: any) => {
    const container = document.getElementById("categories-container");
    container?.scrollBy({
      left: direction * 150,
      behavior: "smooth",
    });
  };



  const handleRemoveSkill = (skillToRemove: option) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill !== skillToRemove));
  };

  const handleInputSkillChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTypeValueSkill(e.target.value);
  };

  const handleRemoveCategory = (categoryToRemove: option) => {
    setSelectedCategories(selectedCategories.filter((category) => category !== categoryToRemove));
  };

  const handleInputCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTypeValueCategory(e.target.value);
  };

  // const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter" && inputSkillValue) {
  //     e.preventDefault();
  //     if (!selectedSkills.includes(inputSkillValue)) {
  //       setSelectedSkills([...selectedSkills, inputSkillValue]);
  //       setInputSkillValue("");
  //     }
  //   }
  // };

  const handleSkillSelect = (skill: option) => {
    setSelectedSkills((prevSkills) => {
      if (prevSkills.includes(skill) && prevSkills.length > 1) {
        return prevSkills.filter((s) => s !== skill); // Remove skill if already selected
      } else if (prevSkills.length < 5 && !prevSkills.includes(skill)) {
        return [...prevSkills, skill]; // Add skill if not selected, limit to 5
      }
      return prevSkills;
    });
  };


  const handleCategorySelect = (category: option) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category) && prevCategories.length > 1) {
        return prevCategories.filter((s) => s !== category); // Remove skill if already selected
      } else if (prevCategories.length < 5 && !prevCategories.includes(category)) {
        return [...prevCategories, category]; // Add skill if not selected, limit to 5
      }
      return prevCategories; // Return existing array if max skills are selected
    });
  };


  const handleCurrencyChange = (currency: string) => {
    setBudget((prev) => ({ ...prev, currency: currency }));
  };

  const handleMinAmountChange = (amount: number) => {
    setBudget((prev) => ({ ...prev, min: amount }));
  };


  const handleMaxAmountChange = (amount: number) => {
    setBudget((prev) => ({ ...prev, max: amount }));
  };

  const recommendedFreelancers = [
    { name: "John Doe", id: 1 },
    { name: "Jane Smith", id: 2 },
    { name: "Alice Brown", id: 3 },
    { name: "Bob Johnson", id: 4 },
    { name: "Charlie White", id: 5 },
  ];


  const goToNextStep = () => {
    setStepIndex(stepIndex + 1);
  };

  const goToPreviousStep = () => {
    if (stepIndex > 0) setStepIndex(stepIndex - 1);
  };

  const formattedFiles = files?.map((file) => ({
    fileName: file.name,
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
      categories: selectedCategories,
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
    setBudget({
      min: 0, max: 0, currency: ''
    })
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
      <div className="pt-[60px]">
        <div className='min-h-screen'>
          <div className=" bg-gradient-to-r from-teal-50 to-purple-50 pt-8 pb-2 px-4 flex justify-between items-center border-t-2 rounded-t-3xl">
            <div className="w-full flex justify-center items-center gap-2">
              <div className="flex items-center rounded-[5px] gap-1 sm:gap-[8px] w-[85%] sm:w-[80%] mx-auto">
                {[...Array(7)].map((_, index) => (
                  <div key={index} className="flex-1 gap-1 flex items-center">
                    <div
                      className={`h-[4px] sm:h-[6px] md:h-[8px] ${index < stepIndex ? 'bg-teal-500' : index == stepIndex ? 'bg-blue-300' : 'bg-gray-300'} rounded-[3px] transition-colors duration-300`}
                      style={{ width: '100%' }}
                    ></div>
                    {index < 7 - 1 && <div className="w-[2px] sm:w-[3px] md:w-[4px]"></div>}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Step 0 */}
          {stepIndex === 0 && (
            <section className=" text-center pt-12 pb-3 px-5 md:px-6 bg-gradient-to-r from-teal-50 to-purple-50 lg:px-36">
              <div>
                <p className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Step 1 of 7</p>
                <h2 className="text-xl md:text-2xl lg:text-4xl font-extrabold text-gray-700 mt-2">Craft an Attention-Grabbing Project</h2>
                <p className="text-base lg:text-lg text-gray-600 mt-4 max-w-lg mx-auto text-justify md:text-none">
                  Your job title is the first thing candidates will see. Make sure it stands out and accurately reflects the role.
                </p>
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:px-6 lg:px-36 mt-16 space-y-10 md:space-y-0 md:space-x-12">
                  {/* Left Section - Job Title Input */}
                  <div className="w-full md:w-[80%] xl:w-[65%]">
                    <label htmlFor="jobTitle" className="block text-lg md:text:xl text-gray-700 font-semibold mb-3">
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
                      <p className="text-gray-700 font-semibold mb-2 text-lg md:text:xl">Example Titles</p>
                      <ul className="list-disc pl-5 flex flex-col gap-1 space-y-1 text-gray-500">
                        <li className='text-justify'>UX/UI designer to bring website mockup and prototype to life</li>
                        <li className='text-justify'>Video editor needed to create whiteboard explainer video</li>
                        <li className='text-justify'>UX designer with e-commerce experience to support app development</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}


          {stepIndex === 1 && (
            <section className="text-center flex justify-center pt-12 pb-3 px-6 bg-gradient-to-r from-teal-50 to-purple-50 lg:px-36">
              <div className="w-full md:w-[80%] xl:w-[65%]">
                <p className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Step 2 of 7</p>
                <h2 className="text-xl md:text-2xl lg:text-4xl font-extrabold text-gray-700 mt-2">Choose a Project Category</h2>
                <p className="text-base lg:text-lg text-gray-600 mt-4 max-w-lg mx-auto text-justify md:text-none">
                  Select the category that best represents your project. This will help us tailor recommendations and resources for your project needs.
                </p>

                <div className="w-full max-w-md mx-auto mt-8">
                  <div className="relative">
                    <div className="flex flex-wrap items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus-within:border-teal-500">
                      {selectedCategories.map((category) => (
                        <span
                          key={category._id}
                          className="flex items-center px-2.5 py-1 bg-teal-600 text-white rounded-full text-xs md:text-sm font-medium"
                        >
                          {category.values}
                          <button
                            onClick={() => handleRemoveCategory(category)}
                            className="ml-1 text-white hover:text-gray-200 focus:outline-none font-medium"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={typeValueCategory}
                        onChange={handleInputCategoryChange}
                        onClick={() => setBlurCategory(true)}
                        onBlur={() => setTimeout(() => setBlurCategory(false), 100)}
                        placeholder={selectedCategories.length === 0 ? "Add at least one relevant Category" : ""}
                        className="flex-1 bg-transparent outline-none text-sm md:text-base py-0.5 px-2 text-gray-700 placeholder-gray-400"
                      />
                    </div>

                    {blurCategory && (
                      <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 w-full max-h-60 overflow-y-auto">
                        {options.length > 0 ? (
                          options.map((category) => (
                            <div
                              key={category._id}
                              className="px-4 py-2 hover:bg-blue-50 hover:text-teal-600 cursor-pointer text-sm md:text-base transition-all duration-200"
                              onMouseDown={() => handleCategorySelect(category)}
                            >
                              {category.values}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-gray-500 text-sm">No Categories found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* <p className="block text-lg md:text:xl text-gray-700 font-semibold mb-3 mt-3">Popular Categories:</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {Categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategorySelect(category)}
                      className={`px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition ${selectedCategories.includes(category)
                        ? 'bg-teal-500 text-white'
                        : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div> */}
              </div>
            </section>
          )}

          {stepIndex === 2 && (
            <section className="text-center flex justify-center pt-12 pb-3 px-6 bg-gradient-to-r from-teal-50 to-purple-50 lg:px-36">
              <div className="w-full md:w-[80%] xl:w-[65%]">
                <p className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Step 3 of 7</p>
                <h2 className="text-xl md:text-2xl lg:text-4xl font-extrabold text-gray-700 mt-2">Identify Key Skills for Your Role</h2>
                <p className="text-base lg:text-lg text-gray-600 mt-4 max-w-lg mx-auto text-justify md:text-none">
                  Select the skills that are essential for the job. Aim for 3-5 skills to get the best match for your role requirements.
                </p>
                <div className="w-full max-w-md mx-auto mt-8">
                  <div className="relative">
                    <div className="flex flex-wrap items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus-within:border-teal-500">
                      {selectedSkills.map((skill) => (
                        <span
                          key={skill._id}
                          className="flex items-center px-2.5 py-1 bg-teal-600 text-white rounded-full text-xs md:text-sm font-medium"
                        >
                          {skill.values}
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            className="ml-1 text-white hover:text-gray-200 focus:outline-none font-medium"
                          >
                            ✕
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={typeValueSkill}
                        onChange={handleInputSkillChange}
                        onClick={() => setBlurSkill(true)}
                        onBlur={() => setTimeout(() => setBlurSkill(false), 100)}
                        placeholder={selectedSkills.length === 0 ? "Add at least one relevant skill" : ""}
                        className="flex-1 bg-transparent outline-none text-sm md:text-base py-0.5 px-2 text-gray-700 placeholder-gray-400"
                      />
                    </div>

                    {blurSkill && (
                      <div className="absolute z-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 w-full max-h-60 overflow-y-auto">
                        {options.length > 0 ? (
                          options.map((skill) => (
                            <div
                              key={skill._id}
                              className="px-4 py-2 hover:bg-blue-50 hover:text-teal-600 cursor-pointer text-sm md:text-base transition-all duration-200"
                              onMouseDown={() => handleSkillSelect(skill)}
                            >
                              {skill.values}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-2 text-gray-500 text-sm">No skills found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* <p className="block text-lg md:text:xl text-gray-700 font-semibold mb-3 mt-5">Popular Skills:</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {popularSkills.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => handleSkillSelect(skill)}
                      className={`px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition ${selectedSkills.includes(skill) ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div> */}
              </div>
            </section>
          )}

          {stepIndex === 3 && (
            <section className="text-center pt-12 pb-3 px-6 bg-gradient-to-r from-teal-50 to-purple-50 lg:px-36">
              <div>
                <p className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Step 4 of 7</p>
                <h2 className="text-xl md:text-2xl lg:text-4xl font-extrabold text-gray-700 mt-2">
                  Set a Time Limit or Deadline
                </h2>
                <p className="text-base lg:text-lg text-gray-600 mt-4 max-w-lg mx-auto text-justify md:text-none">
                  Establishing a clear deadline helps candidates understand the urgency and importance of the role.
                </p>
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:px-6 lg:px-36 mt-16 space-y-10 md:space-y-0 md:space-x-12">
                  {/* Left Section - Time Limit Input */}
                  <div className="w-full md:w-[80%] xl:w-[65%] flex flex-col justify-center">
                    <label htmlFor="deadline" className="block text-xl text-gray-700 font-semibold mb-3">
                      Deadline
                    </label>
                    <DatePicker
                      selected={deadline}
                      onChange={(date) => setDeadline(date)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300 shadow-sm placeholder-gray-400 font-roboto"
                      placeholderText="Select a deadline"
                      dateFormat="MMMM d, yyyy" // Format for displaying the date
                      minDate={new Date()} // Only allows dates after today
                      isClearable
                      showPopperArrow={false}
                    />

                    {/* Example Deadlines */}
                    <div className="mt-6 w-full flex flex-col items-center justify-center">
                      <p className="text-gray-700 font-semibold mb-2 text-lg md:text:xl">Example Deadlines</p>
                      <ul className="list-disc pl-5 flex flex-col gap-1 space-y-1 text-gray-500">
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

          {stepIndex === 4 && (
            <section className="text-center pt-12 pb-3 px-6 bg-gradient-to-r from-teal-50 to-purple-50 lg:px-36">
              <div>
                <p className="text-sm font-semibold text-teal-600 tracking-wider uppercase">
                  Step 5 of 7
                </p>
                <h2 className="text-xl md:text-2xl lg:text-4xl font-extrabold text-gray-700 mt-2">
                  Set Your Project Budget
                </h2>
                <p className="text-base lg:text-lg text-gray-600 mt-4 max-w-lg mx-auto text-justify md:text-none">
                  Defining a budget helps streamline the hiring process and ensures you attract the right talent for your project.
                </p>
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:px-6 lg:px-36 mt-16 space-y-10 md:space-y-0 md:space-x-12">

                  {/* Left Section - Budget Input */}
                  <div className="w-full md:w-[80%] xl:w-[65%] flex flex-col justify-center">

                    {/* Minimum Budget InputWithCurrency */}
                    <label
                      htmlFor="minBudget"
                      className="block text-lg md:text-xl text-gray-700 font-medium mb-3"
                    >
                      Minimum Budget
                    </label>
                    <InputWithCurrency
                      selectedCurrency={budget.currency || "INR"}
                      amount={Number(budget.min) || 0}
                      onCurrencyChange={handleCurrencyChange}
                      onAmountChange={handleMinAmountChange}
                    />

                    {/* Maximum Budget InputWithCurrency */}
                    <label
                      htmlFor="maxBudget"
                      className="block text-lg md:text-xl text-gray-700 font-medium mb-3 mt-10 md:mt-6"
                    >
                      Maximum Budget
                    </label>
                    <InputWithCurrency
                      selectedCurrency={budget.currency || "INR"}
                      amount={budget.max || 0}
                      onCurrencyChange={handleCurrencyChange}
                      onAmountChange={handleMaxAmountChange}
                    />

                  </div>
                </div>
              </div>
            </section>
          )}


          {stepIndex === 5 && (
            <section className="text-center pt-12 pb-3 px-6 bg-gradient-to-r from-teal-50 to-purple-50 lg:px-36">
              <div>
                <p className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Step 6 of 7</p>
                <h2 className="text-xl md:text-2xl lg:text-4xl font-extrabold text-gray-700 mt-2">Add Project Description and Upload Files</h2>
                <p className="text-base lg:text-lg text-gray-600 mt-4 max-w-lg mx-auto text-justify md:text-none">
                  Provide a clear project description and upload any relevant documents to support your requirements.
                </p>
                <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:px-6 lg:px-36 mt-16 space-y-10 md:space-y-0 md:space-x-12">
                  {/* Left Section - Time Limit Input */}
                  <div className="w-full md:w-[80%] xl:w-[65%] flex flex-col justify-center">

                    {/* Description Input */}
                    <label htmlFor="description" className="block text-lg md:text-xl text-gray-700 font-semibold mb-3">
                      Project Description
                    </label>
                    <textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe your project in detail..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 transition duration-300 shadow-sm placeholder-gray-400 h-32"
                    />
                    <div
                      {...getRootProps({ className: 'mt-6 border-dashed border-2 border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50' })}
                    >
                      <input {...getInputProps()} />
                      <p className="text-gray-600">Drag & drop your PDF or DOC files here (max: 50 MB)</p>
                      <p className="text-gray-500">or click to select files</p>
                    </div>
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
          {stepIndex === 6 && (
            <section className="text-center pt-12 pb-3 px-6 bg-gradient-to-r from-teal-50 to-purple-50 lg:px-36">
              <div className="max-w-4xl mx-auto">
                <p className="text-sm font-semibold text-teal-600 tracking-wider uppercase">Step 7 of 7</p>
                <h2 className="text-xl md:text-2xl lg:text-4xl font-extrabold text-gray-700 mt-2">Project details</h2>
                <div className="border rounded-lg shadow-sm p-6 space-y-4 pt-6 mt-4">
                  <div className="flex justify-between items-center border-b pb-4">
                    <div className="flex flex-col items-start">
                      <h2 className="text-gray-700 font-semibold mb-2 text-lg md:text:xl">{title || "Title not set"}</h2>
                      <div className="text-sm text-gray-600 mt-1 text-justify">
                        <Description description={description} previewLength={300} />
                      </div>
                    </div>
                    <FaEdit onClick={() => setStepIndex(0)} className="text-teal-600 cursor-pointer" />
                  </div>

                  <div className="border-b pb-4 flex flex-row justify-between items-center gap-2">
                    <div className='flex flex-col items-start justify-center'>
                      <h3 className="text-gray-700 font-semibold mb-2 text-lg md:text:lg">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCategories.map((category) => (
                          <button
                            key={category._id}
                            onClick={() => { handleCategorySelect(category) }}
                            className={`px-2 py-1 border text-xs md:text-sm rounded-lg ${selectedCategories.includes(category)
                              ? "bg-teal-600 text-white"
                              : "bg-gray-200 text-gray-700"
                              }`}
                          >
                            {category.values}
                          </button>
                        ))}
                      </div>
                    </div>
                    <FaEdit onClick={() => setStepIndex(1)} className="text-teal-600 cursor-pointer" />
                  </div>

                  {/* Skills Section */}
                  <div className="border-b pb-4 flex flex-row justify-between items-center gap-2">
                    <div className='flex flex-col items-start justify-center'>
                      <h3 className="text-gray-700 font-semibold mb-2 text-lg md:text:lg">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSkills.map((skill) => (
                          <button
                            key={skill._id}
                            onClick={() => { handleSkillSelect(skill) }}
                            className={`px-2 py-1 border text-xs md:text-sm rounded-lg ${selectedSkills.includes(skill)
                              ? "bg-teal-600 text-white"
                              : "bg-gray-200 text-gray-700"
                              }`}
                          >
                            {skill.values}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <FaEdit onClick={() => setStepIndex(2)} className="text-teal-600 cursor-pointer" />
                  </div>

                  {/* Deadline Section */}
                  <div className="flex justify-between items-center border-b pb-4">
                    <div className="flex flex-col items-start">
                      <h3 className="text-gray-700 font-semibold mb-2 text-lg md:text:xl">Deadline</h3>
                      <p className="text-sm text-gray-600">
                        {deadline ? deadline.toLocaleDateString() : "Deadline not set"}
                      </p>
                    </div>
                    <FaEdit onClick={() => setStepIndex(3)} className="text-teal-600 cursor-pointer" />
                  </div>

                  {/* Budget Section */}
                  <div className="flex justify-between items-center border-b pb-4">
                    <div className="flex flex-col items-start">
                      <h3 className="text-gray-700 font-semibold mb-2 text-lg md:text:xl">Budget</h3>
                      <p className="text-sm text-gray-600">
                        {budget ? `${budget.min} - ${budget.max} (INR)` : "Budget not set"}
                      </p>
                    </div>
                    <FaEdit onClick={() => setStepIndex(4)} className="text-teal-600 cursor-pointer" />
                  </div>

                  {/* Files Section */}
                  <div className="border-b pb-4">
                    <h3 className="text-gray-700 font-semibold mb-2 text-lg md:text:xl">Attached Files</h3>
                    {files.length > 0 ? (
                      <ul className="text-sm text-gray-600 space-y-2">
                        {files.map((file, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <span>{file.name}</span>
                            <FaEdit onClick={() => setStepIndex(5)} className="text-teal-600 cursor-pointer ml-2" />
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
                    className="px-6 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition duration-300"
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
              className={`px-4 py-2 ${!checkEnableNext() ? "bg-gray-300 text-gray-400" : "bg-teal-600 text-white"} rounded-lg ${stepIndex === 6 ? 'hidden' : ''}`}
              disabled={!checkEnableNext()} // Call checkEnableNext() to get a boolean
              aria-disabled={!checkEnableNext()} // Set aria-disabled based on the result of checkEnableNext()
            >
              Next
            </button>
          </div>
        </div>

        <div className="w-full p-8 bg-gradient-to-r from-white to-teal-50 shadow-xl rounded-2xl">
          <p className="text-2xl font-bold text-gray-600 mb-8 text-center">Recommended Freelancers</p>
          <div className="flex flex-wrap justify-center gap-8">
            {recommendedFreelancers.map((freelancer) => (
              <div
                key={freelancer.id}
                className="flex flex-col items-center p-6 hover:shadow-md transition-transform duration-300 transform hover:scale-103"
              >
                <div className="w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-teal-400 text-white text-4xl font-bold mb-4">
                  {freelancer.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-lg font-semibold text-gray-800 mb-2">{freelancer.name}</div>
                <div className="w-20 h-1 bg-gray-200 rounded-full mb-3"></div>
                <div className="text-sm text-gray-500 italic">Freelancer Title</div>
              </div>
            ))}
          </div>
          <button className="mt-8 text-teal-600 font-medium text-sm px-6 py-2 rounded-full border-2 border-teal-600 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-400 hover:text-white transition-all duration-300 ease-in-out focus:ring-4 focus:ring-teal-200">
            View More Freelancers
          </button>
        </div>

      </div>
    </div>
  );
};

export default Client;
