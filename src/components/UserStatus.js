import React from "react";
import { Segment, Button, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

const UserStatus = ({ setUser, setSelectedPage, user }) => {
  return (
    <Segment>
      {user ? (
        <>
          <Button
            onClick={() => {
              localStorage.removeItem("token");
              setUser(null);
            }}
          >
            Log out
          </Button>
          {user.github_name ? (
            <Label>Github Linked</Label>
          ) : (
            <Button href="http://localhost:3001/auth/github">
              Github time!
            </Button>
          )}
        </>
      ) : (
        <>
          <Link to="/Login">
            <Button onClick={() => setSelectedPage("login")}>Login</Button>
          </Link>

          <Link to="/Signup">
            <Button onClick={() => setSelectedPage("signup")}>Sign Up</Button>
          </Link>
        </>
      )}
    </Segment>
  );
};

export default UserStatus;
