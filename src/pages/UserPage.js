import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import ProjectsContainer from "../Containers/ProjectsContainer";
import { Dimmer, Loader, Icon } from "semantic-ui-react";

const UserPage = ({
  match: {
    params: { id }
  },
  user_id,
  history
}) => {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [userLikees, setUserLikees] = useState([]);
  const handleLike = e => {
    e.preventDefault();
    API.updateUserLike(id).then(resp => setUserLikees(resp));
  };
  const init = () => {
    API.getUser(id).then(userObj => {
      setUser(userObj.user);
      setProjects(userObj.projects);
      setUserLikees(userObj.user.likees);
    });
  };
  useEffect(init, []);
  return user ? (
    <div>
      {user_id ? (
        userLikees.find(likee => likee.id === user_id) ? (
          <Icon
            name="heart"
            color="red"
            className="heart"
            onClick={handleLike}
          ></Icon>
        ) : (
          <Icon
            name="heart outline"
            className="heart"
            onClick={handleLike}
          ></Icon>
        )
      ) : (
        <Icon
          name="heart outline"
          onClick={e => {
            e.preventDefault();
            alert("You must be logged in to do that!");
          }}
        />
      )}
      {userLikees.length}
      <h1>{user.username}</h1>
      <p>{user.bio}</p>
      {projects.length ? (
        <ProjectsContainer
          projects={projects}
          user_id={user_id}
          history={history}
        />
      ) : (
        <h3>{user.username} is not a part of any projects</h3>
      )}
    </div>
  ) : (
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
  );
};

export default UserPage;
