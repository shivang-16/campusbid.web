"use client";
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import Header from '@/components/Header';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Freelancer: React.FC = () => {
    const router = useRouter();
    const [projectType, setProjectType] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [files, setFiles] = useState<File[]>([]);

    const popularSkills: string[] = [
        'Public Relations', 'Content Writing', 'Writing', 'People',
        'English', 'Article Writing',
        'Media Relations', 'Copywriting', 'Adobe Photoshop',
        'Video Editing', 'JavaScript'
    ];

    const projects = [
        { id: 1, title: 'Logo Design for Startup', description: 'Create a unique and modern logo for a new tech startup.', price: '₹5,000 - ₹6,000' },
        { id: 2, title: 'Content Writing for Blog', description: 'Write engaging and SEO-optimized articles for a lifestyle blog.', price: '₹3,000 - ₹4,500' },
        { id: 3, title: 'Website Development', description: 'Develop a responsive e-commerce website with user-friendly features.', price: '₹20,000 - ₹25,000' }
    ];

    const nearbyProjects = [
        { id: 1, title: 'Brochure Design for Local Business', description: 'Design a professional brochure to promote a local business.', price: '₹7,000 - ₹8,000' },
        { id: 2, title: 'SEO for Nearby Restaurant', description: 'Optimize the restaurant’s online presence to increase local visibility.', price: '₹10,000 - ₹12,000' },
        { id: 3, title: 'App Development', description: 'Create a customer-facing mobile app for a local service provider.', price: '₹50,000 - ₹60,000' }
    ];

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
            <div className="pt-[65px]">

                <section className="text-center py-20 px-6 bg-gradient-to-l from-teal-50 to-purple-50 lg:px-36 flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-800 leading-tight animate-fade-in">
                            The work you want, <span className="text-teal-600">The bids you need</span><span className="text-gray-800">.</span>
                        </h1>
                        <p className="mt-5 text-gray-600 max-w-3xl mx-auto text-xl animate-fade-in">
                            Discover top-tier projects at competitive prices.
                        </p>
                        {/* <div className="mt-10 flex justify-center items-center flex-col md:flex-row space-y-3 md:space-y-0 ">
                            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden shadow-sm">
                                <input
                                    type="text"
                                    placeholder="Find Projects..."
                                    className="px-4 py-2 w-96 focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-200"
                                />
                                <button className="flex items-center justify-center px-6 py-3 bg-teal-600 text-white hover:bg-teal-700 transition duration-200 transform hover:scale-105">
                                    <FaSearch />
                                </button>
                            </div>
                        </div> */}
                        <div className="mt-6 space-x-2 text-teal-600 flex justify-center flex-wrap gap-2">
                            {['Popular', 'Logo Design', 'Articles & Blog Posts'].map((tag) => (
                                <span key={tag} className="px-4 py-2 bg-gray-200 text-sm rounded-full cursor-pointer hover:bg-teal-300 transition duration-200 shadow-md">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8 md:mt-0 flex justify-center items-center hidden md:inline">
                        <img
                            src="/assets/icons/search.jpg"
                            alt="Description of Image"
                            className="rounded-lg shadow-lg max-w-full h-auto max-h-96 object-cover"
                        />
                    </div>
                </section>
                <div className="py-10">
                    {/* Categories Section */}
                    <section className="py-12 px-6 lg:px-32">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center lg:text-left">
                            Explore Categories for You
                        </h3>
                        <div className="relative flex items-center justify-between">
                            <button
                                onClick={() => scrollCategories(-1)}
                                className="absolute left-0 z-10 bg-white border border-gray-300 rounded-full p-3 shadow-md hover:shadow-lg transition-all transform hover:scale-105 focus:outline-none"
                                aria-label="Scroll Left"
                            >
                                <FaChevronLeft className="text-gray-600" />
                            </button>
                            <div id="categories-container" className="flex space-x-9 overflow-x-auto no-scrollbar px-10 py-4 transition-transform duration-300">
                                {popularSkills.map((category, index) => (
                                    <div key={index} className="flex items-center justify-center h-24 min-w-[200px] px-4 py-3 rounded-3xl text-gray-700 font-medium text-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer">
                                        <p className="text-lg">{category}</p>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => scrollCategories(1)}
                                className="absolute right-0 z-10 bg-white border border-gray-300 rounded-full p-3 shadow-md hover:shadow-lg transition-all transform hover:scale-105 focus:outline-none"
                                aria-label="Scroll Right">
                                <FaChevronRight className="text-gray-600" />
                            </button>
                        </div>
                    </section>

                    <section className="py-12 px-6 lg:px-32">
                        {/* Top Projects Section */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Top Projects for You</h3>
                            <a
                                onClick={() => router.replace("/project/all")}
                                className="text-teal-600 font-medium hover:underline hover:text-teal-700 transition-colors duration-200 cursor-pointer"
                            >
                                View more
                            </a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="min-h-48 h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between bg-white hover:bg-gray-50"
                                >
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <FaBriefcase className="text-teal-500 mr-2" size={20} />
                                            <p className="text-[17px] font-semibold text-gray-700">{project.title}</p>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-3">{project.description.substring(0,55)}...</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-teal-600 font-bold text-base">{project.price}</p>
                                        <button className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm hover:bg-teal-600 transform transition-transform duration-200 hover:scale-105 shadow-md">
                                            Bid Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Projects Nearby Section */}
                    <section className="py-12 px-6 lg:px-32">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4 md:mb-0">Projects Nearby You</h3>
                            <a
                                onClick={() => router.replace("/project/all")}
                                className="text-teal-600 font-medium hover:underline hover:text-teal-700 transition-colors duration-200 cursor-pointer"
                            >
                                View more
                            </a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {nearbyProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="min-h-48 h-auto  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col justify-between bg-white hover:bg-gray-50"
                                >
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <FaMapMarkerAlt className="text-teal-500 mr-2" size={20} />
                                            <p className="text-[17px] font-semibold text-gray-700">{project.title}</p>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-3">{project.description.substring(0,55)}...</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-teal-600 font-bold text-base">{project.price}</p>
                                        <button className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm hover:bg-teal-600 transform transition-transform duration-200 hover:scale-105 shadow-md">
                                            Bid Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                </div>
            </div>

        </div>
    );
};

export default Freelancer;
