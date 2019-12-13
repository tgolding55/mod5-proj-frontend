import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ProjectsContainer from "../Containers/ProjectsContainer";
import UsersContainer from "../Containers/UsersContainer";
import API from "../Adapters/API";

const SearchPage = ({ search }) => {
  const [results, setResults] = useState({});
  const init = () => {
    API.search(search).then(results => {
      setResults(results);
    });
  };

  useEffect(init, []);

  return !!Object.keys(results).length ? (
    <>
      {console.log(results)}
      <Grid>
        <Grid.Row>
          We found {results.projects.length} project
          {results.projects.length === 1 ? "" : "s"} and {results.users.length}{" "}
          user{results.users.length === 1 ? "" : "s"}
        </Grid.Row>
        <Grid.Row columns="2">
          <Grid.Column>
            <ProjectsContainer projects={results.projects} />
          </Grid.Column>
          <Grid.Column>
            <UsersContainer users={results.users} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  ) : (
    <div>loading</div>
  );
};

export default SearchPage;
