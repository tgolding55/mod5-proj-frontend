import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import UsersContainer from "../Containers/UsersContainer";
import { Dimmer, Loader, Grid } from "semantic-ui-react";
import CommentsContainer from "../Containers/CommentsContainer";

const ProjectPage = ({
  match: {
    params: { id }
  }
}) => {
  const [project, setProject] = useState([]);
  const [collabarators, setCollabarators] = useState([]);
  const [comments, setComments] = useState([]);
  const init = () => {
    API.getProject(id).then(projectObj => {
      setProject(projectObj.project);
      setCollabarators(projectObj.collaborators);
      setComments(projectObj.comments);
    });
  };
  useEffect(init, []);
  return project ? (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <h1>{project.title}</h1>
          <h3>Made in {project.technologies_used}</h3>
          <p>{project.description}</p>
          <p>
            {project.collaborator_size}/{project.collaborator_size_limit}
          </p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <UsersContainer users={collabarators} />
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <CommentsContainer
            comments={comments}
            project_id={id}
            setComments={setComments}
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
