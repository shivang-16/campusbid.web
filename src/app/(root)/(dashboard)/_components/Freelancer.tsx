"use client";
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const Freelancer: React.FC = () => {
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
            <div className="pt-[72px]">

                <section className="text-center py-20 px-6 bg-gradient-to-l from-teal-100 to-purple-100 lg:px-36 flex flex-col md:flex-row md:justify-between md:items-center">
                    <div>
                        <h1 className="text-4xl font-extrabold text-gray-800 leading-tight animate-fade-in">
                            The work you want, <span className="text-teal-600">The bids you need</span><span className="text-gray-800">.</span>
                        </h1>
                        <p className="mt-5 text-gray-600 max-w-3xl mx-auto text-xl animate-fade-in">
                            Discover top-tier projects at competitive prices.
                        </p>
                        <div className="mt-10 flex justify-center items-center flex-col md:flex-row space-y-3 md:space-y-0 ">
                            <select className="px-4 py-2 border border-gray-300 rounded-t-full md:rounded-l-full md:rounded-r-none focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-200 bg-white shadow-sm">
                                <option>All</option>
                                <option>Logo Design</option>
                                <option>Articles & Blog Posts</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Find Projects..."
                                className="px-4 py-2 w-72 border-t md:border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-600 transition duration-200 shadow-sm"
                            />
                            <button className="flex items-center justify-center px-6 py-3 bg-teal-600 text-white rounded-b-full md:rounded-r-full md:rounded-l-none hover:bg-teal-700 transition duration-200 transform hover:scale-105 shadow-sm">
                                <FaSearch />
                            </button>
                        </div>
                        <div className="mt-6 space-x-2 text-teal-600 flex justify-center flex-wrap gap-2">
                            {['Popular', 'Logo Design', 'Articles & Blog Posts'].map((tag) => (
                                <span key={tag} className="px-4 py-2 bg-gray-200 text-sm rounded-full cursor-pointer hover:bg-teal-300 transition duration-200 shadow-md">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8 md:mt-0 flex justify-center items-center">
                        <img
                            src="/assets/icons/search.jpg"
                            alt="Description of Image"
                            className="rounded-lg shadow-lg max-w-full h-auto max-h-96 object-cover"
                        />
                    </div>
                </section>
                <div className="py-10">
                    {/* Categories Section */}
                    <section className="py-12 px-6 lg:px-36">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center lg:text-left">
                            Explore Categories for You
                        </h3>
                        <div className="relative flex items-center justify-between">
                            <button
                                onClick={() => scrollCategories(-1)}
                                className="z-10 bg-gray-200 rounded-full p-3 hover:shadow-lg transition-transform transform hover:scale-105 shadow-md"
                                aria-label="Scroll Left"
                            >
                                <FaChevronLeft className="text-gray-600" />
                            </button>
                            <div
                                id="categories-container"
                                className="flex space-x-4 overflow-x-auto no-scrollbar px-2 py-2 transition-transform duration-300"
                            >
                                {["Popular", "Logo Design", "Web Development", "Graphic Design", "Content Writing"].map((category, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-center h-20 min-w-[250px] rounded-lg bg-gray-100 shadow-sm hover:shadow-md hover:from-teal-50 hover:to-purple-50 text-center"
                                    >
                                        <p className="text-gray-700 font-semibold text-lg">{category}</p>
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={() => scrollCategories(1)}
                                className=" z-10 bg-gray-200 rounded-full p-3 hover:shadow-lg transition-transform transform hover:scale-105 shadow-md"
                                aria-label="Scroll Right"
                            >
                                <FaChevronRight className="text-gray-600" />
                            </button>
                        </div>
                    </section>

                    {/* Top Projects Section */}
                    <section className="py-12 px-6 lg:px-36">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-semibold text-gray-800 pb-4">Top Projects for You</h3>
                            <a href="#" className="text-teal-600 font-medium hover:underline">View more</a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { id: 1, title: 'Logo Design for Startup', price: '₹5,000' },
                                { id: 2, title: 'Content Writing for Blog', price: '₹3,000' },
                                { id: 3, title: 'Website Development', price: '₹20,000' }
                            ].map((project) => (
                                <div key={project.id} className="h-36 bg-gray-100 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-200 p-4">
                                    <p className="text-gray-700 font-medium">{project.title}</p>
                                    <p className="text-teal-600 font-semibold">{project.price}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Projects Nearby Section */}
                    <section className="py-12 px-6 lg:px-36">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-semibold text-gray-800 pb-4">Projects Nearby You</h3>
                            <a href="#" className="text-teal-600 font-medium hover:underline">View more</a>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { id: 1, title: 'Brochure Design for Local Business', price: '₹7,000' },
                                { id: 2, title: 'SEO for Nearby Restaurant', price: '₹10,000' },
                                { id: 3, title: 'App Development', price: '₹50,000' }
                            ].map((project) => (
                                <div key={project.id} className="h-36 bg-gray-100 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-200 p-4">
                                    <p className="text-gray-700 font-medium">{project.title}</p>
                                    <p className="text-teal-600 font-semibold">{project.price}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Freelancer;
