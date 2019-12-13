import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ProjectsContainer from "../Containers/ProjectsContainer";
import UsersContainer from "../Containers/UsersContainer";
import API from "../Adapters/API";

const SearchPage = ({ search, history, user_id }) => {
  const [results, setResults] = useState({});
  const init = () => {
    API.search(search).then(results => {
      setResults(results);
    });
  };

  useEffect(init, []);

  return !!Object.keys(results).length ? (
    <Grid>
      <Grid.Row>
        You searched for "{results.search}". We found {results.projects.length}{" "}
        project
        {results.projects.length === 1 ? "" : "s"} and {results.users.length}{" "}
        user{results.users.length === 1 ? "" : "s"} that matches.
      </Grid.Row>
      <Grid.Row columns="2">
        <Grid.Column>
          <ProjectsContainer
            projects={results.projects}
            history={history}
            user_id={user_id}
          />
        </Grid.Column>
        <Grid.Column>
          <UsersContainer
            users={results.users}
            history={history}
            user_id={user_id}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) : (
    <div>loading</div>
  );
};

export default SearchPage;
