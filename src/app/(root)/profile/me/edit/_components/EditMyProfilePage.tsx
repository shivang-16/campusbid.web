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
import { getCollegeNames, getCityNames, getStateNames } from '@/actions/data_actions';
import { number } from "zod";



interface Institution {
    College_Name: string,
    State: string,
    StateCode: string,
    Stream: string,
}

interface State {
    name: string;
    isoCode: string;
    countryCode: string;
    latitude: string;
    longitude: string
}

interface City {
    name: string;
    stateCode: string;
    latitude: string;
    longitude: string
}


const EditMyProfilePage = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const userDetails = useSelector((state: RootState) => state.user.user) as UserDataProps;
    const [formData, setFormData] = useState<UserDataProps>(userDetails);
    const [newDocs, setNewDocs] = useState<File[]>([]);
    const [filePreviews, setFilePreviews] = useState<string[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [institutionName, setInstitutionName] = useState(userDetails?.academic.schoolOrCollegeName.College_Name || "");
    const [stateName, setStateName] = useState(formData?.address?.state?.name || "");
    const [cityName, setCityName] = useState(formData?.address?.city?.name || "");
    const [isInstitutionFocused, setIsInstitutionFocused] = useState(false);
    const [isStateFocused, setIsStateFocused] = useState(false);
    const [isCityFocused, setIsCityFocused] = useState(false);
    const [institutions, setInstitutions] = useState<Institution[]>([]);
    const [city, setcity] = useState<City>(formData?.address?.city);
    const [state, setstate] = useState<State>(formData?.address?.state);
    const [institution, setinstitution] = useState<Institution>(userDetails?.academic?.schoolOrCollegeName);


    const fetchColleges = async (query: string) => {
        try {
            const response = await getCollegeNames(query);
            setInstitutions(response.data);
        } catch (error) {
            console.error("Error fetching colleges:", error);
        }
    };

    const fetchStates = async (query: string) => {
        try {
            const response = await getStateNames(query);
            setStates(response.data);
        } catch (error) {
            console.error("Error fetching states:", error);
        }
    };

    const fetchCities = async (query: string) => {
        try {
            const response = await getCityNames(query, state?.isoCode || "");
            setCities(response.data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };


    const handleInstitutionSearch = (value: string) => {
        setInstitutionName(value)
        if (value) fetchColleges(value);
        else setInstitutions([]);
    };

    const handleStateSearch = (value: string) => {
        setStateName(value)
        if (value) fetchStates(value);
        else setStates([]);
    };

    const handleCitySearch = (value: string) => {
        setCityName(value)
        if (value) fetchCities(value);
        else setCities([]);
    };


    const handleSelect = (item: object, type: string) => {
        setFormData((prev) => ({ ...prev, [type]: item }));
        if (type === "schoolOrCollegeName") setInstitutions([]);
        if (type === "state") setStates([]);
        if (type === "city") setCities([]);
    };

    const handleFocus = (inputType: string) => {
        if (inputType === "schoolOrCollegeName") setIsInstitutionFocused(true);
        else if (inputType === "state") setIsStateFocused(true);
        else if (inputType === "city") setIsCityFocused(true);
    };

    const handleBlur = (inputType: string) => {
        if (inputType === "schoolOrCollegeName") setIsInstitutionFocused(false);
        else if (inputType === "state") setIsStateFocused(false);
        else if (inputType === "city") setIsCityFocused(false);
    };

    const handleBack = () => {
        router.replace("/profile/me");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>, field: string) => {
        setFormData({
            ...formData,
            [field]: e.target.value,
        });
    };

    const handleChangePhone = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setFormData({
            ...formData,
            phone: {
                ...formData.phone,
                ["personal"]: Number(e.target.value), // Convert the input to a number
            },
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
            console.log(formData)
            const updatedData = getUpdatedFields(formData, userDetails);
            console.log(updatedData)

            const formattedFiles = newDocs?.map((file) => ({
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type
            }))

            const formattedData = {
                ...updatedData,
            };

            if (newDocs.length > 0) {
                formattedData.documents = formattedFiles
            }
            console.log("odjo", formattedData)
            if (formattedData && formattedData.phone) {
                formattedData.phone = Number(formattedData.phone.personal);
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
                className={`mt-6 p-4 border-2 border-dashed rounded-lg ${isDragActive ? "border-teal-600" : "border-gray-300"
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
                        onChange={(e) => handleChangePhone(e)}
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
                        name="city"
                        placeholder="Select your City..."
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                        value={cityName}
                        onChange={(e) => handleCitySearch(e.target.value)}
                        onFocus={() => handleFocus("city")}
                        onBlur={() => {
                            handleBlur("city");
                            if (!cityName) setCityName(''); // Clear the input on blur if empty
                        }}
                        disabled={!state?.isoCode} // Disable input if no state is selected
                    />
                    {isCityFocused && cities.length > 0 && (
                        <div className="absolute z-10 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {cities.map((city) => (
                                <div
                                    key={city.name}
                                    className="p-3 hover:bg-blue-100 cursor-pointer"
                                    onMouseDown={() => {
                                        handleSelect(city, "city");
                                        setcity(city);
                                        setCityName(city.name); // Update cityName with selected value
                                    }}
                                >
                                    {city.name}
                                </div>
                            ))}
                        </div>
                    )}
                    {isCityFocused && cities.length === 0 && (
                        <div className="absolute z-10 bg-white rounded-lg shadow-lg">
                            <div className="p-3 text-gray-500">No cities found</div>
                        </div>
                    )}
                </div>
                <div>
                    <label className="block text-gray-700">State</label>
                    <input
                        type="text"
                        name="state"
                        placeholder="Select your State..."
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                        value={stateName}
                        onChange={(e) => handleStateSearch(e.target.value)}
                        onFocus={() => handleFocus("state")}
                        onBlur={() => {
                            handleBlur("state");
                            if (!stateName) setStateName(''); // Clear the input on blur if empty
                        }}
                        required
                    />
                    {isStateFocused && states.length > 0 && (
                        <div className="absolute z-10 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {states.map((state) => (
                                <div
                                    key={state.name}
                                    className="p-3 hover:bg-blue-100 cursor-pointer"
                                    onMouseDown={() => {
                                        setstate(state);
                                        handleSelect(state, "state"); // Update stateName with selected value
                                        setStateName(state.name)
                                    }}
                                >
                                    {state.name}
                                </div>
                            ))}
                        </div>
                    )}
                    {isStateFocused && states.length === 0 && (
                        <div className="absolute z-10 bg-white rounded-lg shadow-lg">
                            <div className="p-3 text-gray-500">No states found</div>
                        </div>
                    )}
                </div>
            </div>

            <h3 className="text-teal-600 text-2xl font-bold">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700">Institution</label>
                    <input
                        type="text"
                        name="institution"
                        placeholder="Select your Institution..."
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-teal-500"
                        value={institutionName}
                        onChange={(e) => handleInstitutionSearch(e.target.value)}
                        onFocus={() => handleFocus("schoolOrCollegeName")}
                        onBlur={() => {
                            handleBlur("schoolOrCollegeName");
                            if (!institution?.College_Name) {
                                setInstitutionName('');  // Clear the input on blur if empty
                            }
                        }}
                        required
                    />
                    {isInstitutionFocused && institutions.length > 0 && (
                        <div className="absolute z-10 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {institutions.map((institution) => (
                                <div
                                    key={institution.College_Name}
                                    className="p-3 hover:bg-blue-100 cursor-pointer"
                                    onMouseDown={() => {
                                        handleSelect(institution, "schoolOrCollegeName");
                                        setinstitution(institution);
                                        setInstitutionName(institution.College_Name); // Update institutionName with selected value
                                    }}>
                                    {institution.College_Name}
                                </div>
                            ))}
                        </div>
                    )}
                    {isInstitutionFocused && institutions.length === 0 && (
                        <div className="absolute z-10 bg-white rounded-lg shadow-lg">
                            <div className="p-3 text-gray-500">No institutions found</div>
                        </div>
                    )}
                </div>
            </div>
            {renderSupportingDocs()}
        </div>
    );

    return (
        <div>
            <Header />
            <button onClick={handleBack} className="text-teal-600 flex items-center mb-6">
                <IoArrowBack className="mr-2" />
                Back to Profile
            </button>
            <div className="pt-10 pb-6 px-2">
                <div className="max-w-2xl mx-auto space-y-6">
                    {renderProfileForm()}
                    <button
                        onClick={handleSaveChanges}
                        className="w-full bg-teal-600 text-white py-2 px-4 rounded-md mt-6 hover:bg-teal-700"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditMyProfilePage;
