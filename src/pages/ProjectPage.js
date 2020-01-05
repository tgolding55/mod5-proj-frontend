import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import UsersContainer from "../Containers/UsersContainer";
import {
  Dimmer,
  Loader,
  Grid,
  Icon,
  Modal,
  Button,
  Header
} from "semantic-ui-react";
import CommentsContainer from "../Containers/CommentsContainer";

const ProjectPage = ({
  match: {
    params: { id }
  },
  user_id,
  github_linked,
  history
}) => {
  const [project, setProject] = useState([]);
  const [collabarators, setCollabarators] = useState([]);
  const [comments, setComments] = useState([]);
  const [projectLikes, setProjectLikes] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const init = () => {
    API.getProject(id).then(projectObj => {
      setProject(projectObj.project);
      setCollabarators(projectObj.collaborators);
      setComments(projectObj.comments);
      setProjectLikes(projectObj.project.project_likes);
    });
  };
  useEffect(init, []);

  const joinProject = () =>
    API.joinProject(id).then(collabaratorObj =>
      setCollabarators([...collabarators, collabaratorObj.collaborator])
    );

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
          {!!collabarators.find(collaborator => collaborator.id === user_id) ? (
            <Button
              primary
              onClick={() => history.push("/Projects/" + id + "/edit")}
            >
              Manage
            </Button>
          ) : (
            ""
          )}
          <h1>{project.status}</h1>
          {user_id ? (
            !!projectLikes.find(like => like.user_id === user_id) ? (
              <Icon
                onClick={iconHandler}
                color="yellow"
                className="star"
                name="star"
              ></Icon>
            ) : (
              <Icon
                onClick={iconHandler}
                className="star"
                name="star outline"
              ></Icon>
            )
          ) : (
            <>
              <Icon
                onClick={e => {
                  e.stopPropagation();
                  setOpenModal(true);
                }}
                name="star outline"
              />
              <Modal open={openModal} basic size="small" color="green">
                <Header icon="browser">Error!</Header>
                <Modal.Content>
                  <h3>You must be signed in to use this!</h3>
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    color="green"
                    onClick={e => {
                      e.stopPropagation();
                      setOpenModal(false);
                    }}
                    inverted
                  >
                    <Icon name="checkmark" /> Ok!
                  </Button>
                </Modal.Actions>
              </Modal>
            </>
          )}
          {projectLikes.length}

          <h1>{project.title}</h1>
          <h3>Made with {project.technologies_used}</h3>
          <p>{project.description}</p>
          {project.github_link ? (
            <Button href={project.github_link} primary>
              View On Github!
            </Button>
          ) : (
            ""
          )}
          {github_linked && !collabarators.find(user => user.id === user_id) ? (
            collabarators.length >= project.collaborator_size_limit ? (
              <Button disabled>
                Project Full - {collabarators.length}/
                {project.collaborator_size_limit}
              </Button>
            ) : (
              <Button onClick={joinProject} primary>
                Join Project - {collabarators.length}/
                {project.collaborator_size_limit}
              </Button>
            )
          ) : (
            <Button disabled>
              {collabarators.length}/{project.collaborator_size_limit}
            </Button>
          )}
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
