import React from "react";
import Login from "../components/Login";
import { Segment } from "semantic-ui-react";

const LoginPage = ({ setUser, setLoading }) => {
  return (
    <Segment>
      <Login setUser={setUser} setLoading={setLoading} />
    </Segment>
  );
};

export default LoginPage;
