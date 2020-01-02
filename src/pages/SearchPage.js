import React, { useState, useEffect } from "react";
import { Grid, Dimmer, Loader } from "semantic-ui-react";
import ProjectsContainer from "../Containers/ProjectsContainer";
import UsersContainer from "../Containers/UsersContainer";
import API from "../Adapters/API";

const SearchPage = ({ search, history, user_id }) => {
  const [results, setResults] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const init = () => {
    setLoading(true);
    API.search(search)
      .then(results => {
        setResults(results);
        setLoading(false);
      })
      .catch(errors => {
        setErrors(errors);
        setLoading(false);
      });
  };

  useEffect(init, []);

  return loading ? (
    <Dimmer>
      <Loader>Loading</Loader>
    </Dimmer>
  ) : !!Object.keys(results).length ? (
    <Grid>
      <Grid.Row centered>
        <h2>
          You searched for "{results.search}". We found{" "}
          {results.projects.length} project
          {results.projects.length === 1 ? "" : "s"} and {results.users.length}{" "}
          user{results.users.length === 1 ? "" : "s"} that matches
        </h2>
      </Grid.Row>
      <Grid.Row columns="2">
        <Grid.Column>
          <h2>Projects</h2>
          {results.projects.length ? (
            <ProjectsContainer
              projects={results.projects}
              history={history}
              user_id={user_id}
            />
          ) : (
            <h4>No Projects Found</h4>
          )}
        </Grid.Column>
        <Grid.Column>
          <h2>Users</h2>
          {results.users.length ? (
            <UsersContainer
              users={results.users}
              history={history}
              user_id={user_id}
            />
          ) : (
            <h4>No Users Found</h4>
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  ) : (
    errors.map(error => <h1 key={error}>{error}</h1>)
  );
};

export default SearchPage;
