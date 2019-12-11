import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import { Grid, Divider, Segment, Button, Card } from "semantic-ui-react";

const UserStatus = ({ setUser, setLoading, user }) => {
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
              <Login setUser={setUser} setLoading={setLoading} />
            </Grid.Column>
            <Grid.Column>
              <Signup setUser={setUser} setLoading={setLoading} />
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </>
      )}
    </Segment>
  );
};

export default UserStatus;
