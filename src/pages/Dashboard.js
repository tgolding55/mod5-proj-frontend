import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import ProjectsContainer from "../Containers/ProjectsContainer";
import { Dimmer, Loader, Icon, Grid, Form } from "semantic-ui-react";
import UsersContainer from "../Containers/UsersContainer";

const Dashboard = ({ user_id, history }) => {
  const [user, setUser] = useState({});
  const [userEdit, setUserEdit] = useState({});
  const [projects, setProjects] = useState([]);
  const [userLikees, setUserLikees] = useState([]);
  const [userLiking, setUserLikings] = useState([]);
  const [likedProjects, setLikedProjects] = useState([]);
  const [nameEdit, setNameEdit] = useState(false);
  const [bioEdit, setBioEdit] = useState(false);
  const handleLike = e => {
    e.preventDefault();
    API.updateUserLike(user.id).then(resp => setUserLikings(resp));
  };
  const init = () => {
    API.getDashboard().then(userObj => {
      setUser(userObj.user);
      setUserEdit(userObj.user);
      setProjects(userObj.projects);
      setUserLikees(userObj.liked_users);
      setUserLikings(userObj.liking_users);
      setLikedProjects(userObj.liked_projects);
    });
  };

  const update = () => {
    API.updateUser(userEdit)
      .then(userObj => {
        setUser(userObj.user);
        setUserEdit(userObj.user);
      })
      .catch(errors => setUserEdit(user));
  };

  useEffect(init, []);
  return user ? (
    <div
      onClick={() => {
        setNameEdit(false);
        setBioEdit(false);
      }}
    >
      <div>
        {userLiking.find(likee => likee.id === user_id) ? (
          <Icon name="heart" color="red" onClick={handleLike}></Icon>
        ) : (
          <Icon name="heart outline" onClick={handleLike}></Icon>
        )}
        {userLiking.length}
        {nameEdit ? (
          <Form
            onSubmit={() => {
              setNameEdit(false);
              update();
            }}
          >
            <Form.Input
              onClick={e => e.stopPropagation()}
              style={{ width: "auto" }}
              required
              value={userEdit.username}
              onChange={(e, { value }) =>
                setUserEdit({ ...user, username: value })
              }
            ></Form.Input>
          </Form>
        ) : (
          <h1
            className="clickable"
            onClick={e => {
              e.stopPropagation();
              setNameEdit(true);
            }}
          >
            {user.username}
          </h1>
        )}
        {bioEdit ? (
          <Form
            onSubmit={() => {
              setBioEdit(false);
              update();
            }}
          >
            <Form.Input
              onClick={e => e.stopPropagation()}
              style={{ width: "auto" }}
              required
              value={userEdit.bio}
              onChange={(e, { value }) => setUserEdit({ ...user, bio: value })}
            ></Form.Input>
          </Form>
        ) : (
          <p
            className="clickable"
            onClick={e => {
              e.stopPropagation();
              setBioEdit(true);
            }}
          >
            {user.bio}
          </p>
        )}

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
      <Grid stackable>
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
    </div>
  ) : (
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
  );
};

export default Dashboard;
