"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { fetchMyProjects } from "@/actions/user_actions";
import { ProjectDataProps } from "@/helpers/types";
import Link from "next/link";
import Loader from "@/components/Loader";

const ClientProfilePage = () => {
    const userdetails = useSelector((state: RootState) => state.user.user);
    const [activeTab, setActiveTab] = useState("projects");
    const [projects, setProjects] = useState<ProjectDataProps[]>([]);
    const [projectStatus, setProjectStatus] = useState("open");

    useEffect(() => {
        (async () => {
            const { projects } = await fetchMyProjects(projectStatus.toLowerCase());
            setProjects(projects);
            console.log(projects)
        })();
    }, [projectStatus]);

    if (!projects ) return <div className="text-center text-red-500">{<Loader/>}</div>;



    const renderProjects = () => (

        <div className="space-y-6 py-6 px-4">
            {projects.length > 0 ? projects.map((project, index) => (
                <Link href={`/project/${project._id}`} key={index}>
                    <div className="bg-gray-50 p-5 rounded-lg shadow-sm mb-3 md:mb-5">
                        <h5 className="text-lg font-semibold text-gray-700">{project.title}</h5>
                        <p className="text-gray-500 mt-2 ">{project.description.substring(0,300)}... <span className="text-teal-500 font-medium hover:underline text-sm md:text-sm">View More</span></p>
                        <p className="text-teal-600 font-medium mt-2 py-1"><span className="text-teal-600 font-medium hover:underline">{`(${project.budget.currency}) `}</span>{project.budget.min} - {project.budget.max}</p>
                        <p className="text-gray-400 mt-1">Deadline: {new Date(project.deadline).toLocaleDateString()}</p>
                    </div>
                </Link>
            )) : <div className="w-full py-10 h-full flex items-center justify-center"><h1 className="text-gray-400 font-semibold">No bids present</h1></div>}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Header />
            <div className="max-w-5xl mx-auto pt-20 pb-10 px-4 lg:px-0">
                <div className="bg-white shadow-md rounded-lg p-6 md:p-8 flex flex-col lg:flex-row justify-between items-center gap-6">
                    {/* Profile Picture and Details */}
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center justify-center gap-1">
                            <div className="relative w-20 h-20 md:w-24 md:h-24 bg-teal-500 rounded-full flex items-center justify-center text-3xl font-semibold md:font-bold text-white shadow-md">
                                {userdetails?.name.charAt(0)}
                                <span className="absolute bottom-0 right-0 bg-teal-700 text-white text-xs px-2 py-1 rounded-full font-medium md:font-semibold">{userdetails?.role}</span>
                            </div>
                            <h2 className="text-xs md:text-sm font-semibold text-gray-500 mt-2 bg-teal-100 rounded-3xl py-1.5 px-2.5">{userdetails?.username}</h2>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-xl md:text-2xl font-bold text-gray-700">{userdetails?.name}</h1>
                            <p className="text-gray-500 text-[13px] md:text-base">{userdetails?.email}</p>
                            <p className="text-gray-500 text-[13px] md:text-base">{userdetails?.academic.schoolOrCollegeName.College_Name}</p>
                        </div>
                    </div>

                    {/* Pencil Icon for Editing */}
                    <Link href={'/profile/me/edit'}>
                        <button
                            className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-none bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-600 transition duration-150"
                            title="Edit Profile"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5m-10-7l9 9m-5.5-2.5L20.5 3.5a1.5 1.5 0 00-2.121-2.121L8.5 9m5 5L9 10"
                                />
                            </svg>
                            <span>Edit Profile</span>
                        </button>
                    </Link>
                </div>

                {/* Tabs Section */}
                <div className="mt-10 flex gap-4 justify-center">

                    <button
                        className={`px-6 py-2 rounded-full font-semibold shadow-md transition duration-150 ${activeTab === "projects" ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                        onClick={() => setActiveTab("projects")}
                    >
                        My Projects
                    </button>
                </div>

                {/* Bids and Projects Cards */}
                <div className="space-y-10 mt-10">
                    <div className="bg-white rounded-lg shadow-md border border-gray-200">
                        {/* Status Filters */}

                        <div className="flex justify-around mt-6 pb-4 text-gray-600 font-medium text-sm">
                            <span className={`cursor-pointer hover:text-teal-600 ${projectStatus === "open" ? "border-b-2 border-teal-500" : ""}`} onClick={() => setProjectStatus("open")}>Open</span>
                            <span className={`cursor-pointer hover:text-teal-600 ${projectStatus === "in_progress" ? "border-b-2 border-teal-500" : ""}`} onClick={() => setProjectStatus("in_progress")}>In Progress</span>
                            <span className={`cursor-pointer hover:text-teal-600 ${projectStatus === "completed" ? "border-b-2 border-teal-500" : ""}`} onClick={() => setProjectStatus("completed")}>Completed</span>
                            <span className={`cursor-pointer hover:text-teal-600 ${projectStatus === "closed" ? "border-b-2 border-teal-500" : ""}`} onClick={() => setProjectStatus("closed")}>Closed</span>
                        </div>

                        {activeTab === "projects" ? renderProjects() : ""}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientProfilePage;
