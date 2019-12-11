import React, { useState, useEffect } from "react";
import "./App.css";
import queryString from "querystring";
import { Route } from "react-router-dom";
import API from "./Adapters/API";
import Login from "./components/login";
import Signup from "./components/signup";
import {
  Button,
  Dimmer,
  Loader,
  Grid,
  Divider,
  Segment,
  Card
} from "semantic-ui-react";
import ReposList from "./components/ReposList";

function App({ history }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    API.validate()
      .then(user => {
        setUser(user);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <Dimmer active>
            <Loader>Loading</Loader>
          </Dimmer>
        ) : user ? (
          user.github_name ? (
            <>
              <Card>
                <Card.Header>Hello {user.github_name}</Card.Header>
                <Card.Content>
                  <Button
                    onClick={() => {
                      localStorage.removeItem("token");
                      setUser(null);
                    }}
                  >
                    Log out
                  </Button>
                </Card.Content>
              </Card>
              <ReposList />
            </>
          ) : (
            <Button href="http://localhost:3001/auth/github">
              Github time!
            </Button>
          )
        ) : (
          <Segment>
            <Grid columns={2} relaxed="very" stackable>
              <Grid.Column>
                <Login setUser={setUser} setLoading={setLoading} />
              </Grid.Column>
              <Grid.Column>
                <Signup setUser={setUser} setLoading={setLoading} />
              </Grid.Column>
            </Grid>
            <Divider vertical>Or</Divider>
          </Segment>
        )}
      </header>

      <Route
        path="/auth/response"
        component={() => {
          API.githubAuth(
            queryString.parse(window.location.search)["?github_auth"]
          ).then(user => {
            setUser(user);
            history.push("/");
          });
          return null;
        }}
      />
    </div>
  );
}

export default App;
