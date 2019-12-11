import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProjectCard = ({
  id,
  title,
  description,
  technologies_used,
  collaborator_size_limit,
  collaborator_size,
  status
}) => (
  <Link to={"/Projects/" + id}>
    <Card onClick={() => null}>
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Description>{description}</Card.Description>
        <Card.Meta>Built With: {technologies_used}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        status: {status} | Collabarator Size: {collaborator_size}/
        {collaborator_size_limit}
      </Card.Content>
    </Card>
  </Link>
);

export default ProjectCard;
