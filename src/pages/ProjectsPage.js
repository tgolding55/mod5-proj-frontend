import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import ProjectsContainer from "../Containers/ProjectsContainer";
import { Menu, Grid } from "semantic-ui-react";

const ProjectsPage = ({ user_id, github_linked, history }) => {
  const [projects, setProjects] = useState([]);
  const [sortType, setSortType] = useState("new");
  const init = () => {
    API.getProjects().then(projectsObj => setProjects(projectsObj.projects));
  };

  useEffect(init, []);

  return (
    <Grid>
      <Grid.Row columns="1">
        <Grid.Column>
          <Menu stackable>
            {github_linked && (
              <Menu.Item
                style={{ color: "white", backgroundColor: "rgb(56, 170, 49)" }}
                onClick={() => history.push("/Projects/New")}
              >
                New Project
              </Menu.Item>
            )}
            <Menu.Item
              active={sortType === "new"}
              onClick={() => {
                setSortType("new");
                setProjects(
                  projects.sort((projectA, projectB) =>
                    new Date(projectA.created_at).getTime() <
                    new Date(projectB.created_at).getTime()
                      ? 1
                      : -1
                  )
                );
              }}
            >
              Sort By New
            </Menu.Item>
            <Menu.Item
              active={sortType === "likes"}
              onClick={() => {
                setSortType("likes");
                setProjects(
                  projects.sort((projectA, projectB) =>
                    projectA.project_likes.length <
                    projectB.project_likes.length
                      ? 1
                      : -1
                  )
                );
              }}
            >
              Sort By Likes
            </Menu.Item>
          </Menu>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="1">
        <Grid.Column>
          <ProjectsContainer
            projects={projects}
            setProjects={setProjects}
            user_id={user_id}
            history={history}
            sortType={sortType}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ProjectsPage;
