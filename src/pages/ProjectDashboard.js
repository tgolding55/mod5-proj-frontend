import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import UsersContainer from "../Containers/UsersContainer";
import {
  Dimmer,
  Loader,
  Grid,
  Icon,
  Button,
  Dropdown,
  Form
} from "semantic-ui-react";
import CommentsContainer from "../Containers/CommentsContainer";

const options = [
  { key: "Planning", text: "Planning", value: "Planning" },
  { key: "In Progress", text: "In Progress", value: "In Progress" },
  { key: "Completed", text: "Completed", value: "Completed" }
];

const ProjectPage = ({
  match: {
    params: { id }
  },
  user_id,
  history
}) => {
  const [project, setProject] = useState([]);
  const [collabarators, setCollabarators] = useState([]);
  const [comments, setComments] = useState([]);
  const [projectLikes, setProjectLikes] = useState([]);
  const [status, setStatus] = useState("");
  const [projectDetails, setProjectDetails] = useState({ title: "" });
  const init = () => {
    API.editProject(id)
      .then(projectObj => {
        setProjectFromResp(projectObj);
      })
      .catch(errorsArray => {
        alert(errorsArray[0]);
        history.goBack();
      });
  };
  useEffect(init, []);

  const setProjectFromResp = projectObj => {
    setProject(projectObj.project);
    setStatus(projectObj.project.status);
    setCollabarators(projectObj.collaborators);
    setComments(projectObj.comments);
    setProjectLikes(projectObj.project.project_likes);
    setProjectDetails({ title: projectObj.project.title });
  };

  const iconHandler = e => {
    e.preventDefault();
    API.updateLike(id).then(({ user_like, liked }) =>
      liked
        ? setProjectLikes(projectLikes.filter(like => like.id !== user_like.id))
        : setProjectLikes([...projectLikes, user_like])
    );
  };

  return project ? (
    <Grid>
      <Grid.Row>
        <Form
          onSubmit={e => {
            e.preventDefault();
            API.updateProject(id, status).then(projectObj =>
              setProjectFromResp(projectObj)
            );
          }}
        >
          <Dropdown
            value={status}
            selection
            options={options}
            onChange={(e, { value }) => setStatus(value)}
          ></Dropdown>
          <Button type="submit">Change Status</Button>
        </Form>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          {user_id ? (
            !!projectLikes.find(like => like.user_id === user_id) ? (
              <Icon onClick={iconHandler} name="star"></Icon>
            ) : (
              <Icon onClick={iconHandler} name="star outline"></Icon>
            )
          ) : (
            <Icon
              onClick={e => {
                e.preventDefault();
                alert("You must be signed in to use this!");
              }}
              name="star outline"
            />
          )}
          {projectLikes.length}
          <h1>{project.title}</h1>
          <h3>Made with {project.technologies_used}</h3>
          <p>{project.description}</p>
          {project.github_link ? (
            <Button href={project.github_link}>View On Github!</Button>
          ) : (
            <Form
              onSubmit={e => {
                e.preventDefault();
                API.createProjectRepo(id, projectDetails).then(projectObj =>
                  setProject(projectObj.project)
                );
              }}
            >
              <label>Create Github Repo</label>
              <Form.Input
                label="Title"
                value={projectDetails.title}
                onChange={(e, { value }) => setProjectDetails({ title: value })}
              />
              <Button type="submit">New Repo</Button>
            </Form>
          )}
          <Button disabled>
            {collabarators.length}/{project.collaborator_size_limit}
          </Button>
          {project.status !== "Completed" ? (
            <h3>timeframe: {project.timeframe} weeks</h3>
          ) : (
            ""
          )}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <UsersContainer
            users={collabarators}
            user_id={user_id}
            history={history}
          />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <CommentsContainer
            comments={comments}
            project_id={id}
            setComments={setComments}
            user_id={user_id}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) : (
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
  );
};

export default ProjectPage;
