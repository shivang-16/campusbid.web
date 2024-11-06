"use client";
import { fetchProjectById } from "@/actions/project_actions";
import { ProjectDataProps } from "@/helpers/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserCircle, FaClock, FaBookmark } from "react-icons/fa";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";
import InputWithCurrency from "@/components/ui/amountinput";

const ProjectPage = () => {
  const [showPlaceBid, setShowPlaceBid] = useState(false);
  const [project, setProject] = useState<ProjectDataProps>();
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [amount, setAmount] = useState(0);
  const { projectId } = useParams();

  useEffect(() => {
    if (typeof projectId === "string") {
      (async () => {
        const { project } = await fetchProjectById(projectId);
        setProject(project);
        console.log(project, "here is project");
      })();
    } else {
      console.error("Invalid projectId:", projectId);
    }
  }, [projectId]);

  const toggleFilter = () => {
    setShowPlaceBid(!showPlaceBid);
  };

  if (!project) return <div className="text-center py-10 text-gray-700">Loading...</div>;

  return (
    <div className="min-h-screen text-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto pt-24 pb-16 lg:pb-10 px-1 lg:px-4 xl:px-0 lg:flex gap-4">
        {/* Main Content */}
        <main className="w-full lg:w-3/4">
          <div className="bg-white p-4 md:p-6 lg:p-8 rounded-xl shadow-md">
            <header className="border-b pb-4 mb-4">
              <h1 className="text-2xl md:text-[26px] font-bold text-gray-800">{project.title}</h1>
              <span
                className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${project.status === "open" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
              >
                {project.status === "open" ? "Open" : "Closed"}
              </span>
            </header>

            {/* Project Description */}
            <section className="space-y-3 md:space-y-4 pb-4">
              <h2 className="text-xl md:text-[22px] font-semibold text-gray-700">Project Description</h2>
              <p className="text-gray-700 leading-relaxed text-justify">
                {project.description.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </section>


            {/* Budget and Deadline */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 border-t border-b">
              <div className="space-y-1">
                <h3 className="text-teal-800 font-semibold">Budget</h3>
                <p className="text-teal-700 text-base font-bold">
                  {project.budget.currency} {project.budget.min} - {project.budget.max}
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="text-teal-800 font-semibold">Deadline</h3>
                <p className="text-teal-700 text-base font-semibold">
                  {new Date(project.deadline).toLocaleDateString()}
                </p>
              </div>
            </section>

            {/* Skills Required */}
            <section className="space-y-4 mt-9">
              <h2 className="text-xl md:text-[22px] font-semibold text-gray-700">Skills Required</h2>
              <ul className="flex flex-wrap gap-2 md:gap-3">
                {project.skillsRequired.map((skill, index) => (
                  <li
                    key={index}
                    className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs md:text-sm font-medium shadow-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>

            {/* Supporting Documents */}
            <section className="space-y-3 mt-9">
              <h2 className="text-xl md:text-[22px] font-semibold text-gray-700">Supporting Documents</h2>
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
                          <div className="flex items-center space-x-3">
                            <embed src={doc.fileUrl} width={100} height={100} />
                            <a
                              href={doc.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline text-teal-800"
                            >
                              {doc.fileName}
                            </a>
                          </div>
                        )
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* College Information */}
            <section className="space-y-3 mt-9">
              <h2 className="text-xl md:text-[22px] font-semibold text-gray-700">College Information</h2>
              <p className="text-gray-700">
                {project.college.College_Name}, {project.college.State}
              </p>
              <p className="text-gray-600 text-xs md:text-sm">{project.college.Stream}</p>
            </section>

            {/* Location Information */}
            <section className="space-y-3 mt-9">
              <h2 className="text-xl md:text-[22px] font-semibold text-gray-700">Location</h2>
              <p className="text-gray-700 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-teal-500" />
                {project.location.city.name}, {project.location.state.name}
              </p>
              <p className="text-gray-600 text-xs md:text-sm">Country Code: {project.location.city.countryCode}</p>
            </section>

            {/* Timestamps */}
            <section className="space-y-1 text-gray-600 text-xs md:text-sm border-t pt-3 mt-4">
              <p className="text-gray-600 flex items-center">
                <FaClock className="mr-2 text-teal-500" />
                Posted on: {new Date(project.createdAt).toLocaleDateString()}
              </p>
              {/* <p className="text-gray-600 text-xs md:text-sm">Last updated: {new Date(project.updatedAt).toLocaleDateString()}</p> */}
            </section>
          </div>

          {/* Bids Section */}
          <section className="space-y-4 pt-8 px-4">
            {project.bids.length === 0 ? (
              <h2 className="text-xl md:text-xl font-semibold text-gray-700">No bidding has been done yet.</h2>
            ) : (
              <h2 className="text-xl md:text-xl font-semibold text-gray-700">A total of <span className="text-teal-600">{project.bids.length} biddings</span> have been done</h2>
            )}

            <ul className="space-y-4">
              {project.bids.map((bid, index) => (
                <Link href={`/bid/${bid._id}`} key={index}>
                  <li className="flex items-center gap-4 py-4 md:py-6 md:px-2">
                    <div className="w-10 h-10 flex items-center justify-center bg-teal-600 text-white text-lg font-bold rounded-full shadow-md">
                      {typeof bid.user === 'string' ? '?' : bid.user.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-800">  {typeof bid.user === 'string' ? 'Unknown User' : bid.user.name}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <FaUserCircle className="text-teal-500" />
                        Bid Amount: <span className="font-medium text-teal-700">{bid.currency} {bid.amount}</span>
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                        <FaCalendarAlt className="text-teal-500" />
                        Deliverd in: <span className="font-medium text-teal-700">{bid.deliveredIn.days} days</span>
                      </p>
                    </div>
                  </li>
                  <hr className="border-gray-300" />
                </Link>
              ))}
            </ul>
          </section>
        </main>

        <aside
          className={`w-full lg:w-1/4 bg-white px-7 lg:px-2 py-8 right-0 lg:right-7 lg:fixed top-[80px] h-[calc(100vh-80px)] overflow-y-auto 
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

          <div className="mt-12">
            <h3 className="text-lg font-extrabold text-gray-800">Bid Now</h3>
            <div className="space-y-4 mt-4">
              <div>
                <p className="text-gray-700 font-extrabold text-sm mb-1">Your Proposal</p>
                <textarea
                  placeholder="Enter your bid proposal details"
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none min-h-[120px] placeholder:text-gray-500"
                />
              </div>
              <div>
                <p className="text-gray-700 font-extrabold text-sm mb-1">Set Your Price</p>
                <InputWithCurrency
                  selectedCurrency={selectedCurrency}
                  amount={amount}
                  onCurrencyChange={setSelectedCurrency}
                  onAmountChange={setAmount}
                />
              </div>
              <div>
                <p className="text-gray-700 font-extrabold text-sm mb-1">Set Deadline</p>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <button className="w-full py-3 mt-4 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition duration-150 shadow-md">
              Submit Bid
            </button>
          </div>
        </aside>
      </div>

      <button
        className="lg:hidden fixed bottom-0 left-0 right-0 text-xl bg-teal-500 text-white py-3 flex items-center justify-center gap-2 text-center font-semibold"
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