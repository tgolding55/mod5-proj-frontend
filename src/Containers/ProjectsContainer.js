import React from "react";
import ProjectCard from "../components/ProjectCard";
import { Card } from "semantic-ui-react";

const ProjectsContainer = ({ projects }) => (
  <Card.Group centered doubling stackable textAlign="center">
    {projects.map(project => (
      <ProjectCard key={project.id + "index"} {...project} />
    ))}
  </Card.Group>
);

export default ProjectsContainer;
