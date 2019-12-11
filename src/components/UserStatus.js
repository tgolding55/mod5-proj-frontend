import React from "react";
import { Grid, Divider, Segment, Button, Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const UserStatus = ({ setUser, setSelectedPage, user }) => {
  return (
    <Segment>
      {user ? (
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
          </>
        ) : (
          <Button href="http://localhost:3001/auth/github">Github time!</Button>
        )
      ) : (
        <>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              <Link to="/Login">
                <Button onClick={() => setSelectedPage("login")}>Login</Button>
              </Link>
            </Grid.Column>
            <Grid.Column>
              <Link to="/Signup">
                <Button onClick={() => setSelectedPage("signup")}>
                  Sign Up
                </Button>
              </Link>
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </>
      )}
    </Segment>
  );
};

export default UserStatus;
