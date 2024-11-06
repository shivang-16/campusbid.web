"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { IoArrowBack } from "react-icons/io5";
import { savePersonalInfo } from "@/actions/user_actions";
import { userData } from "@/redux/slices/userSlice";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";
import { uploadImageToS3 } from "@/actions/s3_actions";
import { UserDataProps } from "@/helpers/types";

const EditMyProfilePage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userDetails = useSelector((state: RootState) => state.user.user) as UserDataProps;
    const [formData, setFormData] = useState<UserDataProps>(userDetails);
    const [newDocs, setNewDocs] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);

    const handleBack = () => {
        router.replace("/profile/me");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, field: string) => {
        setFormData({
            ...formData,
            [field]: e.target.value,
        });
    };

    const getUpdatedFields = (newData: any, originalData: any) => {
        const updates: any = {};
        for (const key in newData) {
            if (JSON.stringify(newData[key]) !== JSON.stringify(originalData[key])) {
                updates[key] = newData[key];
            }
        }
        return updates;
    };

    const handleSaveChanges = async () => {
        try {
            const updatedData = getUpdatedFields(formData, userDetails);

            const formattedFiles = newDocs?.map((file) => ({
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type
              }))

            const formattedData = {
                ...updatedData,
            };

            if(newDocs.length > 0) {
                formattedData.documents =  formattedFiles
            }

            const userinfo = await savePersonalInfo(formattedData);
            dispatch(userData(userinfo.user));

            const { signedUrls } = userinfo;
            const uploadFiles = newDocs.map((file, index) => {
                const signedUrl = signedUrls[index];
                return uploadImageToS3(file, signedUrl);
            });

            await Promise.all(uploadFiles);
            toast.success("Profile updated successfully!");

            setNewDocs([])
            setFilePreviews([])

        } catch (error) {
            console.error("Error updating profile:", error);
            toast.error("Failed to update profile.");
        }
    };

    const onDrop = (acceptedFiles: File[]) => {
        setNewDocs((prevDocs) => [...prevDocs, ...acceptedFiles]);

        acceptedFiles.forEach((file) => {
            if (file.type.includes("image")) {
                const reader = new FileReader();
                reader.onload = () => {
                    setFilePreviews((prev) => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            } else if (file.type === "application/pdf") {
                setFilePreviews((prev) => [...prev, URL.createObjectURL(file)]);
            }
        });
    };

    const removeFile = (index: number) => {
        setNewDocs((prevDocs) => prevDocs.filter((_, i) => i !== index));
        setFilePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const renderSupportingDocs = () => (
        <div className="mt-6">
            <h3 className="text-teal-600 text-2xl font-bold">Supporting Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {userDetails?.documents?.map((doc, index) => (
                    <iframe
                        key={index}
                        src={doc.fileUrl}
                        className="w-full h-64 border border-gray-300 rounded-md"
                        title={`Document ${index + 1}`}
                    />
                ))}
            </div>

            <div
                {...getRootProps()}
                className={`mt-6 p-4 border-2 border-dashed rounded-lg ${
                    isDragActive ? "border-teal-600" : "border-gray-300"
                }`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-teal-600 text-center">Drop the files here ...</p>
                ) : (
                    <p className="text-gray-600 text-center">
                        Drag and drop files here, or click to select files
                    </p>
                )}
            </div>

            {newDocs.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-gray-700 font-semibold mb-2">New Documents:</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {filePreviews.map((preview, index) => (
                            <div key={index} className="relative">
                                {newDocs[index].type.includes("image") ? (
                                    <img
                                        src={preview}
                                        alt={`Preview ${index}`}
                                        className="w-full h-64 object-cover border border-gray-300 rounded-md"
                                    />
                                ) : (
                                    <iframe
                                        src={preview}
                                        className="w-full h-64 border border-gray-300 rounded-md"
                                        title={`PDF Preview ${index}`}
                                    />
                                )}
                                <button
                                    onClick={() => removeFile(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-[100%] w-8 p-1 hover:bg-red-600"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    const renderProfileForm = () => (
        <div className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <h3 className="text-teal-600 text-2xl font-bold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Form fields here... */}
                <div>
                    <label className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        value={formData?.name || ""}
                        onChange={(e) => handleChange(e, "name")}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Phone No.</label>
                    <input
                        type="tel"
                        placeholder="+91 Enter Phone Number"
                        value={formData?.phone?.personal || ""}
                        onChange={(e) => handleChange(e, "phone")}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        value={formData?.email || ""}
                        onChange={(e) => handleChange(e, "email")}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                        disabled
                    />
                </div>
                <div>
                    <label className="block text-gray-700">Date of Birth</label>
                    <input
                        type="date"
                        value={formData?.about?.dateOfBirth || ""}
                        onChange={(e) => handleChange(e, "dateOfBirth")}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                    />
                </div>
                {userDetails?.role === "client" && (
                    <div>
                        <label className="block text-gray-700">Anonimity</label>
                        <select
                            value={formData?.mode || ""}
                            onChange={(e) => handleChange(e, "mode")}
                            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                        >
                            <option value="">Select Anonymity</option>
                            <option value="public">Public</option>
                            <option value="anonymous">Anonymous</option>
                        </select>
                    </div>
                )}
            </div>

            <h3 className="text-teal-600 text-2xl font-bold">Address Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700">City</label>
                    <input
                        type="text"
                        placeholder="City"
                        value={formData?.address?.city?.name || ""}
                        onChange={(e) => handleChange(e, "city")}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                    />
                </div>
                <div>
                    <label className="block text-gray-700">State</label>
                    <input
                        type="text"
                        placeholder="State"
                        value={formData?.address?.state?.name || ""}
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
        </div>
    );

    return (
        <div className="container mx-auto p-4">
            <Header />
            <button onClick={handleBack} className="text-teal-600 flex items-center mt-4 mb-6">
                <IoArrowBack className="mr-2" />
                Back to Profile
            </button>

            <div className="max-w-2xl mx-auto space-y-6">
                {renderProfileForm()}
                {renderSupportingDocs()}
                <button
                    onClick={handleSaveChanges}
                    className="w-full bg-teal-600 text-white py-2 px-4 rounded-md mt-6 hover:bg-teal-700"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default EditMyProfilePage;
