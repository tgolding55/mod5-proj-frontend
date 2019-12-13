import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import ProjectsContainer from "../Containers/ProjectsContainer";
import { Dimmer, Loader, Icon } from "semantic-ui-react";

const Dashboard = ({ user_id }) => {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [userLikees, setUserLikees] = useState([]);
  const handleLike = e => {
    e.preventDefault();
    API.updateUserLike(user.id).then(resp => setUserLikees(resp));
  };
  const init = () => {
    API.getDashboard().then(userObj => {
      setUser(userObj.user);
      setProjects(userObj.projects);
      setUserLikees(userObj.user.likees);
    });
  };
  useEffect(init, []);
  return user ? (
    <div>
      {userLikees.find(likee => likee.id === user_id) ? (
        <Icon name="heart" color="red" onClick={handleLike}></Icon>
      ) : (
        <Icon name="heart outline" onClick={handleLike}></Icon>
      )}
      {userLikees.length}
      <h1>{user.username}</h1>
      <p>{user.bio}</p>

      <ProjectsContainer projects={projects} user_id={user_id} />
    </div>
  ) : (
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
  );
};

export default Dashboard;
