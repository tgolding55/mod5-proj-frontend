import React, { useState, useEffect } from "react";
import { Card, Icon, Modal, Button, Header } from "semantic-ui-react";
import API from "../Adapters/API";

const ProjectCard = ({
  id,
  title,
  description,
  technologies_used,
  collaborator_size_limit,
  collaborator_size,
  status,
  project_likes,
  user_id,
  timeframe,
  history,
  projects,
  setProjects,
  sortType
}) => {
  const [projectLikes, setProjectLikes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const init = () => {
    setProjectLikes(project_likes);
  };
  useEffect(init, []);
  const iconHandler = e => {
    e.stopPropagation();
    user_id
      ? API.updateLike(id).then(({ user_like, liked }) => {
          liked
            ? setProjectLikes(
                projectLikes.filter(like => like.id !== user_like.id)
              )
            : setProjectLikes([...projectLikes, user_like]);
        })
      : alert("You must be signed in to use this!");
  };

  const resetProject = () => {
    if (sortType) {
      const changedProject = projects.find(project => project.id === id);
      changedProject.project_likes = projectLikes;

      const newProjects = [
        ...projects.filter(project => project.id !== id),
        changedProject
      ];
      setProjects(
        sortType === "new"
          ? newProjects.sort((projectA, projectB) =>
              new Date(projectA.created_at).getTime() <
              new Date(projectB.created_at).getTime()
                ? 1
                : -1
            )
          : newProjects.sort((projectA, projectB) =>
              projectA.project_likes.length < projectB.project_likes.length
                ? 1
                : -1
            )
      );
    }
  };

  useEffect(resetProject, [projectLikes]);

  return (
    <Card onClick={() => history.push("/Projects/" + id)} className="card">
      <Card.Content>
        <Card.Meta textAlign="left">
          {user_id ? (
            !!projectLikes.find(like => like.user_id === user_id) ? (
              <Icon onClick={iconHandler} color="yellow" name="star"></Icon>
            ) : (
              <Icon onClick={iconHandler} name="star outline"></Icon>
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
        </Card.Meta>
        <Card.Header>{title}</Card.Header>
        <Card.Description>{description}</Card.Description>
        <Card.Meta>Built With: {technologies_used}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        Status: {status} | Collaborator Size: {collaborator_size}/
        {collaborator_size_limit}
      </Card.Content>
      {status !== "Completed" ? (
        <Card.Content extra>Timeframe: {timeframe} weeks</Card.Content>
      ) : (
        ""
      )}
    </Card>
  );
};

export default ProjectCard;
