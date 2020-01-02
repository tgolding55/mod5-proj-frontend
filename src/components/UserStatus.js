import React from "react";
import { Button, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const UserStatus = ({ setUser, setSelectedPage, user, history }) => {
  return (
    <Menu widths="2" stackable>
      {user ? (
        <>
          <Menu.Item>
            <Button
              onClick={() => {
                localStorage.removeItem("token");
                setUser(null);
                history.push("/Projects");
              }}
            >
              Log out
            </Button>
          </Menu.Item>

          {user.github_linked ? (
            <Menu.Item>
              <Button disabled>Github Linked</Button>
            </Menu.Item>
          ) : (
            <Menu.Item>
              <Button href="http://localhost:3001/auth/github">
                Link Github
              </Button>
            </Menu.Item>
          )}
        </>
      ) : (
        <>
          <Menu.Item>
            <Link to="/Login">
              <Button onClick={() => setSelectedPage("login")}>Login</Button>
            </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/Signup">
              <Button onClick={() => setSelectedPage("signup")}>Sign Up</Button>
            </Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
};

export default UserStatus;
