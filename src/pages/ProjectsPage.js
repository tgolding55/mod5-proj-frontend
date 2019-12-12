import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import ProjectsContainer from "../Containers/ProjectsContainer";

const ProjectsPage = ({ user_id }) => {
  const [projects, setProjects] = useState([]);
  const init = () => {
    API.getProjects().then(projectsObj => setProjects(projectsObj.projects));
  };
  useEffect(init, []);

  return <ProjectsContainer projects={projects} user_id={user_id} />;
};

export default ProjectsPage;
