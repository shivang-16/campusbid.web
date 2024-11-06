"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const MyProfilePage = () => {
    const router = useRouter();
    const userdetails = useSelector((state: RootState) => state.user.user);
    const [activeTab, setActiveTab] = useState("bids");

    const user = {
        // Mock data for demonstration
        name: "John Doe",
        email: "johndoe@example.com",
        username: "johndoe123",
        address: "123 Main St, Hometown, USA",
        institution: "XYZ University",
        phone: "+1 234 567 890",
        role: "Developer",
        anonymity: true,
        mode: "Remote",
        bids: [
            { title: "Project Alpha", project: "Content Writing", status: "Pending", budget: "₹12 - ₹123 / Project", deadline: "14/11/2024" },
            { title: "Project Beta", project: "App Development", status: "Accepted", budget: "₹150 - ₹300 / Project", deadline: "20/12/2024" }
        ],
        projects: [
            { title: "Project Gamma", description: "A sample project on AI development.", project: "AI Development", budget: "₹200 - ₹500 / Project", deadline: "15/01/2025" },
            { title: "Project Delta", description: "A blockchain project for secure transactions.", project: "Blockchain", budget: "₹300 - ₹700 / Project", deadline: "01/03/2025" }
        ]
    };

    const renderBids = () => (
        <div className="space-y-6">
            {user.bids.map((bid, index) => (
                <div key={index} className="bg-gray-50 p-5 rounded-lg flex justify-between items-center shadow-sm">
                    <div>
                        <h5 className="text-lg font-semibold text-gray-700">{bid.title}</h5>
                        <p className="text-gray-500">{bid.project}</p>
                        <p className="text-teal-600 font-medium mt-2">{bid.budget}</p>
                        <p className="text-gray-400 mt-1">Deadline: {bid.deadline}</p>
                    </div>
                    <button className={`px-5 py-1 rounded-full text-white ${bid.status === "Accepted" ? "bg-teal-500" : "bg-yellow-500"} shadow-md transition duration-150`}>
                        {bid.status}
                    </button>
                </div>
            ))}
        </div>
    );

    const renderProjects = () => (
        <div className="space-y-6">
            {user.projects.map((project, index) => (
                <div key={index} className="bg-gray-50 p-5 rounded-lg shadow-sm">
                    <h5 className="text-lg font-semibold text-gray-700">{project.title}</h5>
                    <p className="text-gray-500 mt-2">{project.description}</p>
                    <p className="text-teal-600 font-medium mt-2">{project.budget}</p>
                    <p className="text-gray-400 mt-1">Deadline: {project.deadline}</p>
                    <button className="mt-4 px-5 py-2 bg-teal-500 text-white rounded-full hover:bg-teal-600 transition duration-150 shadow-md">
                        View Details
                    </button>
                </div>
            ))}
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Header />
            <div className="max-w-5xl mx-auto pt-20 pb-10 px-4 lg:px-0">
                {/* Profile Header */}
                <div className="bg-white shadow-md rounded-lg p-8 flex flex-col lg:flex-row justify-between items-center gap-6">
                    {/* Profile Picture and Details */}
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center justify-center gap-1">
                            <div className="relative w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-md">
                                {userdetails?.name.charAt(0)}
                                <span className="absolute bottom-0 right-0 bg-teal-700 text-white text-xs px-2 py-1 rounded-full font-semibold">{userdetails?.role}</span>
                            </div>
                            <h2 className="text-sm font-semibold text-gray-500 mt-2 bg-teal-100 rounded-3xl py-1.5 px-2.5">{userdetails?.username}</h2>
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold text-gray-800">{userdetails?.name}</h1>
                            <p className="text-gray-500">{userdetails?.email}</p>
                            <p className="text-gray-500">{userdetails?.academic.schoolOrCollegeName.College_Name}</p>
                        </div>
                    </div>
                    
                    {/* Pencil Icon for Editing */}
                    <button 
                        onClick={() => router.replace("/profile/me/edit")}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-full shadow-md hover:bg-teal-600 transition duration-150"
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
                </div>

                {/* Tabs Section */}
                <div className="mt-10 flex gap-4 justify-center">
                    <button
                        className={`px-6 py-2 rounded-full font-semibold shadow-md transition duration-150 ${activeTab === "bids" ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                        onClick={() => setActiveTab("bids")}
                    >
                        My Bids
                    </button>
                    <button
                        className={`px-6 py-2 rounded-full font-semibold shadow-md transition duration-150 ${activeTab === "projects" ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                        onClick={() => setActiveTab("projects")}
                    >
                        My Projects
                    </button>
                </div>

                {/* Status Filters */}
                <div className="flex justify-around mt-6 border-b pb-4 text-gray-600 font-medium text-sm">
                    <span className="cursor-pointer hover:text-teal-600">Pending</span>
                    <span className="cursor-pointer hover:text-teal-600">Accepted</span>
                    <span className="cursor-pointer hover:text-teal-600">Rejected</span>
                    <span className="cursor-pointer hover:text-teal-600">Closed</span>
                </div>

                {/* Bids and Projects Cards */}
                <div className="space-y-10 mt-10">
                    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                        <h4 className="text-2xl font-semibold text-gray-800 mb-6">{activeTab === "bids" ? "My Bids" : "My Projects"}</h4>
                        {activeTab === "bids" ? renderBids() : renderProjects()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;
