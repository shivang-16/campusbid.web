"use client";
import { fetchProjectById } from "@/actions/project_actions";
import { ProjectDataProps } from "@/helpers/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserCircle, FaClock } from "react-icons/fa";
import Link from "next/link";

const ProjectPage = () => {
  const [project, setProject] = useState<ProjectDataProps>();
  const { projectId } = useParams();

  useEffect(() => {
    if (typeof projectId === "string") {
      (async () => {
        const { project } = await fetchProjectById(projectId);
        setProject(project);
        console.log(project, "here is project")
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
          <div className="bg-white p-4 md:p-6 lg:p-8 rounded-xl shadow-md">
            <header className="border-b pb-4 mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{project.title}</h1>
              <span
                className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${project.status === "open" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
              >
                {project.status === "open" ? "Open" : "Closed"}
              </span>
            </header>

            {/* Project Description */}
            <section className="space-y-3 md:space-y-4 pb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Project Description</h2>
              <p className="text-gray-700 leading-relaxed text-justify">{project.description}</p>
            </section>

            {/* Budget and Deadline */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3 border-t border-b">
              <div className="space-y-1">
                <h3 className="text-teal-600 font-semibold">Budget</h3>
                <p className="text-teal-800 text-lg font-bold">
                  {project.budget.currency} {project.budget.min} - {project.budget.max}
                </p>
              </div>
              <div className="space-y-1">
                <h3 className="text-teal-600 font-semibold">Deadline</h3>
                <p className="text-teal-800 text-lg font-semibold">
                  {new Date(project.deadline).toLocaleDateString()}
                </p>
              </div>
            </section>

            {/* Skills Required */}
            <section className="space-y-3 mt-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Skills Required</h2>
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
            <section className="space-y-3 mt-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Supporting Documents</h2>
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
            <section className="space-y-3 mt-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">College Information</h2>
              <p className="text-gray-700">
                {project.college.College_Name}, {project.college.State}
              </p>
              <p className="text-gray-600 text-xs md:text-sm">{project.college.Stream}</p>
            </section>

            {/* Location Information */}
            <section className="space-y-3 mt-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Location</h2>
              <p className="text-gray-700 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-teal-500" />
                {project.location.city.name}, {project.location.state.name}
              </p>
              <p className="text-gray-600 text-xs md:text-sm">Country Code: {project.location.city.countryCode}</p>
            </section>

            {/* Timestamps */}
            <section className="space-y-1 text-gray-600 text-xs md:text-sm border-t pt-2 mt-4">
              <p className="flex items-center">
                <FaClock className="mr-2 text-teal-500" />
                Posted on: {new Date(project.createdAt).toLocaleDateString()}
              </p>
              <p>Last updated: {new Date(project.updatedAt).toLocaleDateString()}</p>
            </section>
          </div>

          {/* Bids Section */}
          <section className="space-y-4 pt-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Total Bids: {project.bids.length}</h2>
            <ul className="space-y-4">
              {project.bids.map((bid, index) => (
                <Link href={`/bid/${bid._id}`} key={index}>
                  <li className="flex items-center gap-4 p-4 md:p-6">
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
                        Deliverd in: <span className="font-medium text-teal-700">{bid.deliveredIn.day} days</span>
                      </p>
                    </div>
                  </li>
                  <hr className="border-gray-300" />
                </Link>
              ))}
            </ul>
          </section>
        </main>

        {/* Sidebar */}
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
      </div >
    </div >
  );
};

export default ProjectPage;
