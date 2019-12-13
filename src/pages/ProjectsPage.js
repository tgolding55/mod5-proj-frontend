import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import ProjectsContainer from "../Containers/ProjectsContainer";
import { Menu, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProjectsPage = ({ user_id, github_linked }) => {
  const [projects, setProjects] = useState([]);
  const init = () => {
    API.getProjects().then(projectsObj => setProjects(projectsObj.projects));
  };
  useEffect(init, []);

  return (
    <Grid>
      <Grid.Row columns="1">
        <Grid.Column>
          <Menu>
            {github_linked && (
              <Link to="/Projects/New">
                <Menu.Item>New Project</Menu.Item>
              </Link>
            )}
          </Menu>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="1">
        <Grid.Column>
          <ProjectsContainer projects={projects} user_id={user_id} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ProjectsPage;
