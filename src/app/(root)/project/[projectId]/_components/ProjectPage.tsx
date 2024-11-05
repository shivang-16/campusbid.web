"use client";
import { fetchProjectById } from "@/actions/project_actions";
import { ProjectDataProps } from "@/helpers/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";

const ProjectPage = () => {
  const [project, setProject] = useState<ProjectDataProps>();
  const { projectId } = useParams();

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

  if (!project) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto pt-[75px] shadow-lg rounded-lg overflow-hidden">
        {/* Project Title and Status */}
        <header className="bg-teal-600 text-white py-6 px-8 flex justify-between items-center">
          <h1 className="text-3xl font-semibold">{project.title}</h1>
          <span
            className={`text-sm font-medium px-3 py-1 rounded-full ${
              project.status === "open"
                ? "bg-teal-700 text-white"
                : "bg-red-400 text-white"
            }`}
          >
            {project.status === "open" ? "Open" : "Closed"}
          </span>
        </header>

        {/* Project Details */}
        <div className="p-8 space-y-6">
          <p className="text-gray-800 text-lg leading-relaxed">{project.description}</p>

          {/* Budget */}
          <div className="flex items-center space-x-4 bg-teal-50 p-4 rounded-lg shadow-sm">
            <span className="text-gray-600 font-medium">Budget:</span>
            <span className="text-teal-800 font-bold">
              {project.budget.currency} {project.budget.min} - {project.budget.max}
            </span>
          </div>

          {/* Deadline */}
          <div className="flex items-center space-x-4 bg-teal-50 p-4 rounded-lg shadow-sm">
            <span className="text-gray-600 font-medium">Deadline:</span>
            <span className="text-teal-800 font-semibold">
              {new Date(project.deadline).toLocaleDateString()}
            </span>
          </div>

          {/* Skills Required */}
          <div>
            <h3 className="text-lg font-semibold text-teal-700">Skills Required</h3>
            <ul className="flex flex-wrap gap-2 mt-3">
              {project.skillsRequired.map((skill, index) => (
                <li
                  key={index}
                  className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm shadow-sm"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Supporting Documents */}
          <div>
            <h3 className="text-lg font-semibold text-teal-700">Supporting Documents</h3>
            <ul className="mt-4 space-y-3">
              {project.supportingDocs.map((doc, index) => {
                const isImage = doc.fileType.startsWith("image/");
                const isPdf = doc.fileType === "application/pdf";

                return (
                  <li
                    key={index}
                    className="flex items-center space-x-3 text-teal-600 hover:text-teal-800"
                  >
                    {isImage && (
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={doc.fileUrl}
                          alt={doc.fileName}
                          width={100}
                          height={100}
                          className="rounded-lg shadow-md"
                        />
                      </a>
                    )}
                    {isPdf && (
                      <div className="flex items-center space-x-2">
                        <embed src={doc.fileUrl} width="100" height="100" />
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline"
                        >
                          {doc.fileName}
                        </a>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* College Details */}
          <div>
            <h3 className="text-lg font-semibold text-teal-700">College</h3>
            <p className="text-gray-700">
              {project.college.College_Name}, {project.college.State}
            </p>
            <p className="text-gray-600 text-sm">{project.college.Stream}</p>
          </div>

          {/* Location Details */}
          <div>
            <h3 className="text-lg font-semibold text-teal-700">Location</h3>
            <p className="text-gray-700">
              {project.location.city.name}, {project.location.state.name}
            </p>
            <p className="text-gray-600 text-sm">
              Country Code: {project.location.city.countryCode}
            </p>
          </div>

          {/* Timestamps */}
          <div className="text-sm text-gray-500 space-y-1">
            <p>Posted on: {new Date(project.createdAt).toLocaleDateString()}</p>
            <p>Last updated: {new Date(project.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
