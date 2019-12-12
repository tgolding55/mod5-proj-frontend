import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import ProjectsContainer from "../Containers/ProjectsContainer";
import { Dimmer, Loader } from "semantic-ui-react";

const Dashboard = () => {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const init = () => {
    API.getDashboard().then(userObj => {
      setUser(userObj.user);
      setProjects(userObj.projects);
    });
  };
  useEffect(init, []);
  return user ? (
    <div>
      <h1>{user.username}</h1>
      <p>{user.bio}</p>

      <ProjectsContainer projects={projects} />
    </div>
  ) : (
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
  );
};

export default Dashboard;
