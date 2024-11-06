"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { IoArrowBack } from "react-icons/io5"; 

const EditMyProfilePage = () => {
    const router = useRouter();
    const userDetails = useSelector((state: RootState) => state.user.user);

    const handleBack = () => {
        router.replace("/profile/me");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        // Handle form field changes, for example:
        console.log(`${field} updated to: `, e.target.value);
        // You can dispatch a Redux action here to update the user data
    };

    const renderProfileForm = () => (
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <h3 className="text-teal-600 text-2xl font-bold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={userDetails?.name || ""}
                        onChange={(e) => handleChange(e, "name")}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Phone No.</label>
                    <input
                        type="tel"
                        placeholder="+91 Enter Phone Number"
                        value={userDetails?.phone?.personal || ""}
                        onChange={(e) => handleChange(e, "phone")}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={userDetails?.email || ""}
                        onChange={(e) => handleChange(e, "email")}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        value={userDetails?.about?.dateOfBirth || ""}
                        onChange={(e) => handleChange(e, "dateOfBirth")}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Anonimity</label>
                    <input
                        type="text"
                        value={userDetails?.mode || ""}
                        onChange={(e) => handleChange(e, "mode")}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                    />
                </div>
            </div>

            <h3 className="text-teal-600 text-2xl font-bold">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700">City</label>
                    <input
                        type="text"
                        placeholder="City"
                        value={userDetails?.address?.city?.name || ""}
                        onChange={(e) => handleChange(e, "city")}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">State</label>
                    <input
                        type="text"
                        placeholder="State"
                        value={userDetails?.address?.state?.name || ""}
                        onChange={(e) => handleChange(e, "state")}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                    />
                </div>
            </div>

            <h3 className="text-teal-600 text-2xl font-bold">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700">Institution</label>
                    <input
                        type="text"
                        placeholder="School/College Name"
                        value={userDetails?.academic.schoolOrCollegeName.College_Name || ""}
                        onChange={(e) => handleChange(e, "schoolOrCollegeName")}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                    />
                </div>
            </div>

            <button className="mt-4 w-full py-3 bg-teal-500 text-white rounded-md font-semibold hover:bg-teal-600 transition duration-150 shadow-md">
                Save Changes
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Header />
            <div className="max-w-4xl mx-auto pt-24 pb-10 px-4 lg:px-0">
                <div className="flex items-center mb-2">
                    <button
                        onClick={() => handleBack()}
                        className="flex items-center space-x-2 text-teal-600 hover:text-teal-800 font-semibold text-lg"
                    >
                        <IoArrowBack className="w-5 h-5" />
                        <span>Back</span>
                    </button>
                </div>
                <div className="bg-white shadow-md rounded-lg p-8">
                    {renderProfileForm()}
                </div>
            </div>
        </div>
    );
};

export default EditMyProfilePage;
