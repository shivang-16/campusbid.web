"use client";
import { fetchProjectById } from "@/actions/project_actions";
import { ProjectDataProps } from "@/helpers/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { FaMapMarkerAlt, FaClock, FaBookmark } from "react-icons/fa";
import Description from "@/components/ui/description";
import { FaTimes } from "react-icons/fa";
import PlaceBid from "./PlaceBid";
import BidList from "./BidList";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import Loader from "@/components/Loader";

const ProjectPage = () => {
  const [showPlaceBid, setShowPlaceBid] = useState(false);
  const [project, setProject] = useState<ProjectDataProps>();
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState('')
  const { projectId } = useParams();
  const user = useAppSelector(state => state.user.user)

  useEffect(() => {
    if (typeof projectId === "string") {
      (async () => {
        const data = await fetchProjectById(projectId);
        setProject(data?.project);
        console.log(data.project, "here is project");
        if (data?.success === false) {
          toast.error(data.message)
          setError(data.message)
        }
      })();
    } else {
      console.error("Invalid projectId:", projectId);
    }
  }, [projectId]);

  const toggleFilter = () => {
    setShowPlaceBid(!showPlaceBid);
  };

  if (!project) return <div className="text-center text-red-500">{error ? error : <Loader/>}</div>;

  return (
    <div className="min-h-screen text-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto pt-24 pb-16 lg:pb-10 px-1 lg:px-4 xl:px-0 lg:flex gap-4">
        {/* Main Content */}
        <main className="w-full lg:w-3/4">
          <div className="bg-white p-4 md:p-6 lg:p-8 border-r-[1px] border-gray-200 mb-5">
            <header className=" pb-4 mb-4">
              <h1 className="text-2xl md:text-[26px] font-bold text-gray-700">{project.title}</h1>
              <span
                className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${project.status === "open" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
              >
                {project.status === "open" ? "Open" : "Closed"}
              </span>
            </header>

            {/* Project Description */}
            <section className="space-y-3 md:space-y-4 pb-4">
              <div className="text-gray-700 leading-relaxed text-justify">
                <Description description={project.description} previewLength={300} />
              </div>
            </section>


            {/* Budget and Deadline */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 ">
              <div className="space-y-1">
                <h3 className="text-gray-600 font-semibold text-sm md:text-sm">Budget</h3>
                <p className="text-teal-700 font-bold text-sm md:text-sm">
                  {project.budget.currency} {project.budget.min} - {project.budget.max}
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="text-gray-600 font-semibold text-sm md:text-sm">Deadline</h3>
                <p className="text-teal-700 font-semibold text-sm md:text-sm">
                  {new Date(project.deadline).toLocaleDateString()}
                </p>
              </div>
            </section>

            {/* Skills Required */}
            <section className="space-y-4 mt-9">
              <h2 className="text-xl md:text-[20px] font-semibold text-gray-700">Skills Required</h2>
              <ul className="flex flex-wrap gap-2 md:gap-3">
                {project.skillsRequired.map((skill, index) => (
                  <li
                    key={index}
                    className="bg-teal-50 text-teal-800 px-3 py-1 rounded-full text-xs md:text-sm font-medium shadow-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>

            {/* Supporting Documents */}
            {project.supportingDocs.length>0 && (
              <section className="space-y-3 mt-9">
              <h2 className="text-xl md:text-[20px] font-semibold text-gray-700">Supporting Documents</h2>
              <ul className="space-y-2">
                {project.supportingDocs.map((doc, index) => {
                  const isImage = doc.fileType.startsWith("image/");
                  const isPdf = doc.fileType === "application/pdf";
                  return (
                    <li key={index} className="flex items-center space-x-3">
                      {isImage ? (
                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">
                          <Image
                            src={doc.fileUrl}
                            alt={doc.fileName}
                            width={100}
                            height={100}
                            className="rounded-lg shadow-md border border-gray-200 hover:scale-105 transition-transform"
                          />
                        </a>
                      ) : (
                        isPdf && (
                          <div className="flex flex-col justify-center items-center space-y-2">
                            <embed src={doc.fileUrl} width={100} height={100} />
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-teal-800 hover:underline"
                            >
                              Open File
                            </a>
                          </div>
                        )
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
            )}
            {/* College Information */}
            <section className="space-y-3 mt-9">
              <h2 className="text-xl md:text-[20px] font-semibold text-gray-700">College Information</h2>
              <p className="text-gray-700">
                {project.college.College_Name}, {project.college.State}
              </p>
              <p className="text-gray-600 text-xs md:text-sm">{project.college.Stream}</p>
            </section>

            {/* Location Information */}
            <section className="space-y-3 mt-9">
              <h2 className="text-xl md:text-[20px] font-semibold text-gray-700">Location</h2>
              <p className="text-gray-700 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-teal-500" />
                {project.location.city.name}, {project.location.state.name}
              </p>
              <p className="text-gray-600 text-xs md:text-sm">Country Code: {project.location.city.countryCode}</p>
            </section>

            {/* Timestamps */}
            <section className="space-y-1 text-gray-600 text-xs md:text-sm border-t border-gray-100 pt-3 mt-4">
              <p className="text-gray-600 flex items-center">
                <FaClock className="mr-2 text-teal-500" />
                Posted on: {new Date(project.createdAt).toLocaleDateString()}
              </p>
              {/* <p className="text-gray-600 text-xs md:text-sm">Last updated: {new Date(project.updatedAt).toLocaleDateString()}</p> */}
            </section>
          </div>

          {/* Bids Section */}
          {user?.role === "freelancer" &&
            <section className={`space-y-4 pt-8 px-4 bg-white ${project.bids.length > 0 && "rounded-xl "}`}>
              <BidList project={project} />
            </section>
          }

        </main>

        {user?.role === "client" &&
          <section className={`space-y-4 pt-2 px-4 bg-white ${project.bids.length > 0 && "rounded-xl shadow-md"}`}>
            <BidList project={project} />
          </section>
        }

        {user?.role === "freelancer" &&
          <>
            <aside
              className={`w-full lg:w-1/4 bg-white px-4 lg:px-2 py-8 right-0 lg:right-7 lg:fixed top-[80px] h-[calc(100vh-80px)] overflow-y-auto 
   fixed bottom-0 lg:translate-y-0 transition-transform duration-300 ease-in-out z-20
   ${showPlaceBid ? "translate-y-0" : "translate-y-full lg:translate-y-0"}`}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowPlaceBid(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 lg:hidden"
              >
                <FaTimes size={20} />
              </button>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-gray-700 text-sm">Client Name</p>
                    <p className="text-gray-900 font-semibold">Piyush Joshi</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-gray-700 text-sm">Email</p>
                    <a
                      href={`mailto:piyushjoshi81204@gmail.com`}
                      className="text-teal-600 hover:underline font-medium"
                    >
                      piyushjoshi81204@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <PlaceBid
                  selectedCurrency={selectedCurrency}
                  amount={amount}
                  setSelectedCurrency={setSelectedCurrency}
                  setAmount={setAmount}
                  projectId={projectId as string}
                />
              </div>
            </aside>
          </>
        }

      </div>
      <button
        className="lg:hidden fixed bottom-0 left-0 right-0 text-lg md:text-xl bg-teal-500 text-white py-3 flex items-center justify-center gap-2 text-center font-medium shadow-2xl shadow-teal-500/30 -mt-1"
        onClick={toggleFilter}
      >
        <FaBookmark /> Place Bid
      </button>

      {/* Overlay when slider is open */}
      {showPlaceBid && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setShowPlaceBid(false)}
        />
      )}
    </div>
  );
};

export default ProjectPage;