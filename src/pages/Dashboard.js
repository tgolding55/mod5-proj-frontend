import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import ProjectsContainer from "../Containers/ProjectsContainer";
import { Dimmer, Loader, Icon, Grid } from "semantic-ui-react";
import UsersContainer from "../Containers/UsersContainer";

const Dashboard = ({ user_id, history }) => {
  const [user, setUser] = useState({});
  const [projects, setProjects] = useState([]);
  const [userLikees, setUserLikees] = useState([]);
  const [likedProjects, setLikedProjects] = useState([]);
  const handleLike = e => {
    e.preventDefault();
    API.updateUserLike(user.id).then(resp => setUserLikees(resp));
  };
  const init = () => {
    API.getDashboard().then(userObj => {
      setUser(userObj.user);
      setProjects(userObj.projects);
      setUserLikees(userObj.liked_users);
      setLikedProjects(userObj.liked_projects);
    });
  };
  useEffect(init, []);
  return user ? (
    <>
      <div>
        {userLikees.find(likee => likee.id === user_id) ? (
          <Icon name="heart" color="red" onClick={handleLike}></Icon>
        ) : (
          <Icon name="heart outline" onClick={handleLike}></Icon>
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
          <h3>You are not a part of any projects</h3>
        )}
      </div>
      <Grid>
        <Grid.Row columns="2">
          <Grid.Column>
            <h2>Liked Projects</h2>
            {likedProjects.length ? (
              <ProjectsContainer
                projects={likedProjects}
                history={history}
                user_id={user_id}
              />
            ) : (
              <h4>You Have Not Liked Any Projects</h4>
            )}
          </Grid.Column>
          <Grid.Column>
            <h2>Liked Users</h2>
            {userLikees.length ? (
              <UsersContainer
                users={userLikees}
                history={history}
                user_id={user_id}
              />
            ) : (
              <h4>You Have Not Liked Any Users</h4>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  ) : (
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
  );
};

export default Dashboard;
