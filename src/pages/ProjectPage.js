import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import UsersContainer from "../Containers/UsersContainer";
import { Dimmer, Loader } from "semantic-ui-react";

const ProjectPage = ({
  match: {
    params: { id }
  }
}) => {
  const [project, setProject] = useState([]);
  const [collabarators, setCollabarators] = useState([]);
  const init = () => {
    API.getProject(id).then(projectObj => {
      setProject(projectObj.project);
      setCollabarators(projectObj.collaborators);
    });
  };
  useEffect(init, []);
  return project ? (
    <div>
      <h1>{project.title}</h1>
      <h3>Made in {project.technologies_used}</h3>
      <p>{project.description}</p>
      <p>
        {project.collaborator_size}/{project.collaborator_size_limit}
      </p>
      <UsersContainer users={collabarators} />
    </div>
  ) : (
    <Dimmer active>
      <Loader>Loading</Loader>
    </Dimmer>
  );
};

export default ProjectPage;
