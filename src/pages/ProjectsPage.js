import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import ProjectsContainer from "../Containers/ProjectsContainer";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const init = () => {
    API.getProjects().then(projectsObj => setProjects(projectsObj.projects));
  };
  useEffect(init, []);

  return <ProjectsContainer projects={projects} />;
};

export default ProjectsPage;
