"use client";

import React from "react";
import Header from "@/components/Header";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const MyProfilePage = () => {

    const userdetails = useSelector((state: RootState) => state.user.user);

    const user = {
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

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <Header />
            <div className="max-w-7xl mx-auto pt-20 pb-10 px-4 lg:px-0">
                <div className="bg-white rounded-lg p-8 lg:flex gap-8">
                    {/* User Details Card */}
                    <div className="bg-gray-50 rounded-lg p-6 w-full lg:w-1/3 flex items-center flex-col lg:flex-row gap-6">
                        <div className="w-24 h-24 bg-teal-500 rounded-full flex-shrink-0 flex items-center justify-center text-4xl font-semibold text-white">
                            {userdetails?.name.charAt(0)}
                        </div>

                        <div className="text-center lg:text-left">
                            <h2 className="text-2xl font-semibold text-gray-800">{userdetails?.name}</h2>
                            <p className="text-gray-500 mt-1">{userdetails?.email}</p>
                            <button className="mt-4 px-4 py-2 text-sm text-teal-600 font-medium bg-teal-50 rounded-md hover:bg-teal-100 transition duration-150">
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="bg-gray-50 rounded-lg p-6 w-full lg:w-2/3 mt-6 lg:mt-0">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Profile Information</h3>
                        <div className="space-y-6">
                            {/* Personal Info */}
                            <div className="rounded-lg p-5 border border-gray-200 bg-white">
                                <p className="text-xl font-semibold text-gray-800">Personal Info</p>
                                <div className="text-gray-600 mt-2 space-y-2">
                                    <p><strong>Username:</strong> {userdetails?.username || ""}</p>
                                    <p><strong>Address:</strong> {user.address}</p>
                                    <p><strong>Institution:</strong> {userdetails?.academic.schoolOrCollegeName.College_Name}</p>
                                    <p><strong>Phone Number:</strong> {user.phone}</p>
                                </div>
                            </div>

                            {/* Additional Details */}
                            <div className="rounded-lg p-5 border border-gray-200 bg-white">
                                <p className="text-xl font-semibold text-gray-800">Other Details</p>
                                <div className="text-gray-600 mt-2 space-y-2">
                                    <p><strong>Role:</strong> {userdetails?.role}</p>
                                    <p><strong>Anonymity:</strong> {userdetails?.mode}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bids and Projects */}
                <div className="mt-8 space-y-6">
                    <div className="bg-white rounded-lg p-5 border border-gray-200">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">My Bids</h4>
                        <div className="space-y-4">
                            {user.bids.map((bid, index) => (
                                <div key={index} className="bg-gray-50 p-5 rounded-lg flex justify-between items-center">
                                    <div>
                                        <h5 className="text-lg font-semibold text-gray-800">{bid.title}</h5>
                                        <p className="text-gray-500">{bid.project}</p>
                                        <p className="text-green-500 mt-1">{bid.budget}</p>
                                        <span className="inline-block bg-teal-100 text-teal-600 px-3 py-1 rounded-full text-sm mt-2">
                                            {bid.project}
                                        </span>
                                        <p className="text-gray-400 mt-2">Deadline: {bid.deadline}</p>
                                    </div>
                                    <button className={`px-4 py-2 rounded-md text-white ${bid.status === "Accepted" ? "bg-green-500" : "bg-yellow-500"} transition duration-150`}>
                                        {bid.status}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-5 border border-gray-200">
                        <h4 className="text-xl font-semibold text-gray-800 mb-4">My Projects</h4>
                        <div className="space-y-4">
                            {user.projects.map((project, index) => (
                                <div key={index} className="bg-gray-50 p-5 rounded-lg flex justify-between items-center">
                                    <div>
                                        <h5 className="text-lg font-semibold text-gray-800">{project.title}</h5>
                                        <p className="text-gray-500 mt-1">{project.description}</p>
                                        <p className="text-green-500 mt-2">{project.budget}</p>
                                        <span className="inline-block bg-teal-100 text-teal-600 px-3 py-1 rounded-full text-sm mt-2">
                                            {project.project}
                                        </span>
                                        <p className="text-gray-400 mt-2">Deadline: {project.deadline}</p>
                                    </div>
                                    <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition duration-150">
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfilePage;
