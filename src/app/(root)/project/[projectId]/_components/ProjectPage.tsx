"use client";
import { fetchProjectById } from "@/actions/project_actions";
import { ProjectDataProps } from "@/helpers/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserCircle, FaClock } from "react-icons/fa";

const ProjectPage = () => {
  const [project, setProject] = useState<ProjectDataProps>();
  const { projectId } = useParams();

  // Sample bids data
  const sampleBids = [
    { name: "Alice", amount: "500", currency: "INR", deadline: "2024-12-01" },
    { name: "Bob", amount: "750", currency: "INR", deadline: "2024-12-05" },
    { name: "Charlie", amount: "600", currency: "INR", deadline: "2024-12-03" },
  ];

  useEffect(() => {
    if (typeof projectId === "string") {
      (async () => {
        const { project } = await fetchProjectById(projectId);
        setProject(project);
      })();
    } else {
      console.error("Invalid projectId:", projectId);
    }
  }, [projectId]);

  if (!project) return <div className="text-center py-10 text-gray-700">Loading...</div>;

  return (
    <div className="min-h-screen text-gray-900">
      <Header />
      <div className="max-w-7xl mx-auto pt-20 pb-10 px-4 lg:px-0 lg:flex gap-8">
        {/* Main Content */}
        <main className="w-full lg:w-3/4">
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <header className="border-b pb-6 mb-6">
              <h1 className="text-3xl font-bold text-gray-800">{project.title}</h1>
              <span
                className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${project.status === "open" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
              >
                {project.status === "open" ? "Open" : "Closed"}
              </span>
            </header>

            {/* Project Description */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800">Project Description</h2>
              <p className="text-gray-700 leading-relaxed">{project.description}</p>
            </section>

            {/* Budget and Deadline */}
            <section className="grid grid-cols-2 gap-6 py-6 border-t border-b">
              <div className="space-y-2">
                <h3 className="text-teal-600 font-semibold">Budget</h3>
                <p className="text-teal-800 text-lg font-bold">
                  {project.budget.currency} {project.budget.min} - {project.budget.max}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-teal-600 font-semibold">Deadline</h3>
                <p className="text-teal-800 text-lg font-semibold">
                  {new Date(project.deadline).toLocaleDateString()}
                </p>
              </div>
            </section>

            {/* Skills Required */}
            <section className="space-y-4 mt-6">
              <h2 className="text-2xl font-semibold text-gray-800">Skills Required</h2>
              <ul className="flex flex-wrap gap-3">
                {project.skillsRequired.map((skill, index) => (
                  <li
                    key={index}
                    className="bg-teal-100 text-teal-800 px-4 py-1 rounded-full text-sm font-medium shadow-sm"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </section>

            {/* Supporting Documents */}
            <section className="space-y-4 mt-6">
              <h2 className="text-2xl font-semibold text-gray-800">Supporting Documents</h2>
              <ul className="space-y-3">
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
                            width={120}
                            height={120}
                            className="rounded-lg shadow-md border border-gray-200 hover:scale-105 transition-transform"
                          />
                        </a>
                      ) : (
                        isPdf && (
                          <div className="flex items-center space-x-3">
                            <embed src={doc.fileUrl} width="120" height="120" />
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
            <section className="space-y-4 mt-6">
              <h2 className="text-2xl font-semibold text-gray-800">College Information</h2>
              <p className="text-gray-700">
                {project.college.College_Name}, {project.college.State}
              </p>
              <p className="text-gray-600 text-sm">{project.college.Stream}</p>
            </section>

            {/* Location Information */}
            <section className="space-y-4 mt-6">
              <h2 className="text-2xl font-semibold text-gray-800">Location</h2>
              <p className="text-gray-700 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-teal-500" />
                {project.location.city.name}, {project.location.state.name}
              </p>
              <p className="text-gray-600 text-sm">Country Code: {project.location.city.countryCode}</p>
            </section>

            {/* Timestamps */}
            <section className="space-y-2 text-gray-600 text-sm border-t pt-4 mt-6">
              <p className="flex items-center">
                <FaClock className="mr-2 text-teal-500" />
                Posted on: {new Date(project.createdAt).toLocaleDateString()}
              </p>
              <p>Last updated: {new Date(project.updatedAt).toLocaleDateString()}</p>
            </section>
          </div>

          {/* Bids Section */}
          <section className="space-y-6 pt-16">
            <h2 className="text-2xl font-semibold text-gray-800">{sampleBids.length} freelancers are bidding:</h2>
            <ul className="space-y-6">
              {sampleBids.map((bid, index) => (
                <React.Fragment key={index}>
                  <li className="flex items-center gap-6 p-6 ">
                    <div className="w-12 h-12 flex items-center justify-center bg-teal-600 text-white text-xl font-bold rounded-full shadow-md">
                      {bid.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-semibold text-gray-800">{bid.name}</p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <FaUserCircle className="text-teal-500" />
                        Bid Amount: <span className="font-medium text-teal-700">{bid.currency} {bid.amount}</span>
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                        <FaCalendarAlt className="text-teal-500" />
                        Deadline: <span className="font-medium text-teal-700">{new Date(bid.deadline).toLocaleDateString()}</span>
                      </p>
                    </div>
                    <button className="px-4 py-2 text-sm font-semibold text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-600 hover:text-white transition-colors duration-200">
                      View Profile
                    </button>
                  </li>
                  <hr />
                </React.Fragment>
              ))}
            </ul>

          </section>
        </main>

        {/* Sidebar - Client Information */}
        <aside className="w-full lg:w-1/4 p-8 mt-8 lg:mt-0 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaUserCircle className="text-teal-500" /> Client Information
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-gray-700 text-sm">Client Name</p>
                <p className="text-gray-800 font-semibold">{"Piyush Joshi"}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-gray-700 text-sm">Email</p>
                <a href={`mailto:piyushjoshi81204@gmail.com`} className="text-teal-600 hover:underline font-medium">
                  {"piyushjoshi81204@gmail.com"}
                </a>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default ProjectPage;
