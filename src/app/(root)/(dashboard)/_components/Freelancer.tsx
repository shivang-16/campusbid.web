"use client";
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import Header from '@/components/Header';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { FaBriefcase, FaMapMarkerAlt } from 'react-icons/fa';
import { ProjectDataProps } from '@/helpers/types';
import Link from 'next/link';

interface AllProjectsPageProps {
    projects: {
        nearbyProjects: ProjectDataProps[]
        collegeProjects: ProjectDataProps[]
    };
  }

const Freelancer = ({projects}: AllProjectsPageProps ) => {

    const popularSkills: string[] = [
        'Public Relations', 'Content Writing', 'Writing', 'People',
        'English', 'Article Writing',
        'Media Relations', 'Copywriting', 'Adobe Photoshop',
        'Video Editing', 'JavaScript'
    ];

    const { nearbyProjects, collegeProjects } = projects

    const scrollCategories = (direction: any) => {
        const container = document.getElementById("categories-container");
        container?.scrollBy({
            left: direction * 150,
            behavior: "smooth",
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-700 relative">
            <Header />
            <div className="pt-[65px]">

                <section className="text-center h-screen lg:h-auto py-20 px-6 bg-gradient-to-l lg:gap-2 from-teal-50 to-purple-50 lg:px-36 flex flex-col md:flex-row justify-center lg:justify-between md:items-center">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-800 leading-tight animate-fade-in">
                            The work you want, <span className="text-teal-600">The bids you need</span><span className="text-gray-800">.</span>
                        </h1>
                        <p className="mt-5 text-gray-600 max-w-3xl mx-auto text-lg lg:text-xl animate-fade-in">
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
                        <div className="mt-6 space-x-2 text-teal-700 flex justify-center flex-wrap gap-2">
                            {['Popular', 'Logo Design', 'Articles & Blog Posts'].map((tag) => (
                                <span key={tag} className="px-4 py-2 bg-gray-100 text-sm rounded-full cursor-pointer hover:bg-teal-100 transition duration-300 shadow-md">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mt-8 md:mt-0 justify-center items-center hidden lg:inline">
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
                            Explore Categories for <span className="text-teal-600">You</span><span className="text-gray-800">.</span>
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



                    <section className="py-12 px-6 lg:px-36">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-semibold text-gray-800 pb-4">Top Projects for You</h3>
                            <Link href={'/project/all'} className="text-teal-600 font-medium hover:underline hover:text-teal-700 hover:cursor-pointer">View more</Link>

                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {collegeProjects.length > 0 ? collegeProjects
                                .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) // Sort by createdAt in descending order
                                .slice(0, 3).map((project) => (
                                <div key={project._id} className="h-52 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <FaBriefcase className="text-teal-500 mr-2" size={20} />
                                            <p className="text-lg font-semibold text-gray-800">{project.title.slice(0, 50)}</p>
                                        </div>
                                        <p className="text-sm text-gray-600">{project.description.slice(0, 200)}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-teal-600 font-bold text-lg">₹{project.budget.min} - ₹{project.budget.max}</p>
                                        <Link href={`/project/${project._id}`}>
                                        <button className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm hover:bg-teal-600 transition-transform transform hover:scale-105 shadow-md">
                                            Bid Now
                                        </button>
                                        </Link>
                                    </div>
                                </div>
                            )): ('No College Projects for now')}
                        </div>
                    </section>

                    {/* Projects Nearby Section */}


                    <section className="py-12 px-6 lg:px-36">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-semibold text-gray-800 pb-4">Projects Nearby You</h3>
                            <Link href={'/project/all'} className="text-teal-600 font-medium hover:underline hover:text-teal-700 hover:cursor-pointer">View more</Link>

                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {nearbyProjects.length > 0 ? nearbyProjects.map((project) => (
                                <div key={project._id} className="h-52 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center mb-4">
                                            <FaMapMarkerAlt className="text-teal-500 mr-2" size={20} />
                                            <p className="text-lg font-semibold text-gray-800">{project.title.slice(0, 50)}</p>
                                        </div>
                                        <p className="text-sm text-gray-600">{project.description.slice(0, 200)}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-4">
                                        <p className="text-teal-600 font-bold text-lg">₹{project.budget.min} - ₹{project.budget.max}</p>
                                        <Link href={`/project/${project._id}`}>
                                        <button className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm hover:bg-teal-600 transition-transform transform hover:scale-105 shadow-md">
                                            Bid Now
                                        </button>
                                        </Link>
                                    </div>
                                </div>
                            )): ("No nearby projects")}
                        </div>
                    </section>

                </div>
            </div>

        </div>
    );
};

export default Freelancer;
