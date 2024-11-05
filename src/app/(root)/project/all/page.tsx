import React from "react";
import AllProjects from "./_components/AllProjects";
import { fetchAllProjects } from "@/actions/project_actions";

const AllProjectPage = async () => {

  const { collegeProjects, nearbyProjects } = await fetchAllProjects()
  const projects = [ ...collegeProjects, ...nearbyProjects]
  console.log(projects, "here are projects")

  return <AllProjects projects = {projects}/>;
};

export default AllProjectPage;
