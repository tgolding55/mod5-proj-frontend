import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import UsersContainer from "../Containers/UsersContainer";
import { Dimmer, Loader, Grid, Icon } from "semantic-ui-react";
import CommentsContainer from "../Containers/CommentsContainer";

const ProjectPage = ({
  match: {
    params: { id }
  },
  user_id
}) => {
  const [project, setProject] = useState([]);
  const [collabarators, setCollabarators] = useState([]);
  const [comments, setComments] = useState([]);
  const [projectLikes, setProjectLikes] = useState([]);

  const init = () => {
    API.getProject(id).then(projectObj => {
      setProject(projectObj.project);
      setCollabarators(projectObj.collaborators);
      setComments(projectObj.comments);
      setProjectLikes(projectObj.project.project_likes);
    });
  };
  useEffect(init, []);

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
          <p>
            {project.collaborator_size}/{project.collaborator_size_limit}
          </p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <UsersContainer users={collabarators} user_id={user_id} />
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
