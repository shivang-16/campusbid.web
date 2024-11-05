"use client";
import { fetchProjectById } from "@/actions/project_actions";
import { ProjectDataProps } from "@/helpers/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

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

  if (!project) return <div>Loading...</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Project Title and Status */}
        <header className="bg-green-300 text-white py-4 px-6">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <span
            className={`text-sm font-medium ${
              project.status === "open" ? "text-green-700" : "text-red-400"
            }`}
          >
            Status: {project.status}
          </span>
        </header>

        {/* Project Details */}
        <div className="p-6 space-y-4">
          <p className="text-gray-700 text-lg">{project.description}</p>

          {/* Budget */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">Budget:</span>
            <span className="text-blue-600 font-bold">
              {project.budget.currency} {project.budget.min} -{" "}
              {project.budget.max}
            </span>
          </div>

          {/* Deadline */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 font-medium">Deadline:</span>
            <span className="text-gray-800">
              {new Date(project.deadline).toLocaleDateString()}
            </span>
          </div>

          {/* Skills Required */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Skills Required
            </h3>
            <ul className="flex space-x-2 mt-2">
              {project.skillsRequired.map((skill, index) => (
                <li
                  key={index}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Supporting Documents */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Supporting Documents
            </h3>
            <ul className="mt-2 space-y-2">
              {project.supportingDocs.map((doc, index) => {
                const isImage = doc.fileType.startsWith("image/");
                const isPdf = doc.fileType === "application/pdf";

                return (
                  <li
                    key={index}
                    className="flex items-center space-x-3 text-blue-600"
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
                        />
                      </a>
                    )}
                    {isPdf && (
                      <div>
                        <div className="pdf-preview">
                          <embed src={doc.fileUrl} width="100" height="100" />
                        </div>
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {" "}
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
            <h3 className="text-lg font-semibold text-gray-800">College</h3>
            <p className="text-gray-700">
              {project.college.College_Name}, {project.college.State}
            </p>
            <p className="text-gray-600 text-sm">{project.college.Stream}</p>
          </div>

          {/* Location Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Location</h3>
            <p className="text-gray-700">
              {project.location.city.name}, {project.location.state.name}
            </p>
            <p className="text-gray-600 text-sm">
              Country Code: {project.location.city.countryCode}
            </p>
          </div>

          {/* Timestamps */}
          <div className="text-sm text-gray-500">
            <p>Posted on: {new Date(project.createdAt).toLocaleDateString()}</p>
            <p>
              Last updated: {new Date(project.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
