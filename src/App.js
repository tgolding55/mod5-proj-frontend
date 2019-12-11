import React, { useState, useEffect } from "react";
import "./App.css";
import queryString from "querystring";
import { Route, Switch, Redirect } from "react-router-dom";
import API from "./Adapters/API";

import { Dimmer, Loader, Grid, Segment } from "semantic-ui-react";
import UserStatus from "./components/UserStatus";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App({ history }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState("Projects");

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
      {loading ? (
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      ) : (
        <Grid id="layout" padded relaxed>
          <Grid.Row columns="1" verticalAlign="top">
            <Grid.Column color="black" textAlign="center">
              <h1>Collabapage</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="2">
            <Grid.Column id="navbar">
              <Navbar
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
              />
            </Grid.Column>
            <Grid.Column>
              <UserStatus
                setLoading={setLoading}
                setUser={setUser}
                user={user}
                setSelectedPage={setSelectedPage}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns="1">
            <Grid.Column>
              <Segment id="appBody">
                <Switch>
                  <Route
                    path="/Signup"
                    component={() => (
                      <SignupPage setUser={setUser} setLoading={setLoading} />
                    )}
                  />
                  <Route
                    path="/Login"
                    component={() => (
                      <LoginPage setUser={setUser} setLoading={setLoading} />
                    )}
                  />
                  <Route
                    path="/Projects"
                    component={() => <h1>Projects!</h1>}
                  />
                  <Route path="/Users" component={() => <h1>Users!</h1>} />
                  <Route path="/Profile" component={() => <h1>Profile!</h1>} />
                </Switch>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns="1" verticalAlign="bottom" stretched>
            <Grid.Column
              color="black"
              textAlign="center"
              verticalAlign="middle"
            >
              <h1>Footer</h1>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}

      <Route
        path="/auth/response"
        component={() => {
          API.githubAuth(
            queryString.parse(window.location.search)["?github_auth"]
          ).then(user => {
            setUser(user);
            history.push("/Projects");
          });
          return null;
        }}
      />
      <Route path="*">
        <Redirect to="/Projects" />
      </Route>
    </div>
  );
}

export default App;
