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
import ProjectsPage from "./pages/ProjectsPage";
import UsersPage from "./pages/UsersPage";
import ProjectPage from "./pages/ProjectPage";
import ProjectDashboard from "./pages/ProjectDashboard";
import UserPage from "./pages/UserPage";
import Dashboard from "./pages/Dashboard";
import NewProjectPage from "./pages/NewProjectPage";
import SearchPage from "./pages/SearchPage";

function App({ history }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
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
          <Grid.Row columns="1" verticalAlign="top" style={{ height: "10vh" }}>
            <Grid.Column
              color="black"
              textAlign="center"
              fluid="true"
              stretched
            >
              <h1>Collabapage</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns="2" className="navbar" style={{ height: "10vh" }}>
            <Grid.Column id="navbar" stretched>
              <Navbar
                user={user}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                setAppSearch={setSearch}
                history={history}
              />
            </Grid.Column>
            <Grid.Column stretched width="4" floated="right">
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
                    path="/Search"
                    component={() => (
                      <SearchPage
                        search={search}
                        history={history}
                        user_id={user ? user.id : null}
                      />
                    )}
                  />
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
                    path="/Projects/New"
                    component={() => <NewProjectPage history={history} />}
                  />
                  <Route
                    exact
                    path="/Projects/:id"
                    component={({ match }) => (
                      <ProjectPage
                        match={match}
                        user_id={user ? user.id : null}
                        github_linked={user ? user.github_linked : false}
                        history={history}
                      />
                    )}
                  />
                  <Route
                    path="/Projects/:id/edit"
                    component={({ match }) => (
                      <ProjectDashboard
                        match={match}
                        user_id={user ? user.id : null}
                        history={history}
                      />
                    )}
                  />
                  <Route
                    path="/Projects"
                    component={() => (
                      <ProjectsPage
                        user_id={user ? user.id : null}
                        github_linked={user ? user.github_linked : false}
                        history={history}
                      />
                    )}
                  />
                  <Route
                    path="/Users/:id"
                    component={({ match }) => (
                      <UserPage
                        match={match}
                        user_id={user ? user.id : null}
                        history={history}
                      />
                    )}
                  />
                  <Route
                    path="/Users"
                    component={() => (
                      <UsersPage
                        user_id={user ? user.id : null}
                        history={history}
                      />
                    )}
                  />
                  <Route
                    path="/Profile"
                    component={() =>
                      user ? (
                        <Dashboard
                          user_id={user ? user.id : null}
                          history={history}
                        />
                      ) : (
                        <Redirect to="/Projects" />
                      )
                    }
                  />

                  <Route component={() => <h1>Route Not Found</h1>} />
                </Switch>
              </Segment>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row
            columns="1"
            verticalAlign="bottom"
            stretched
            style={{ height: "10vh" }}
          >
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
      <Route exact path="/">
        <Redirect to="/Projects" />
      </Route>
    </div>
  );
}

export default App;
