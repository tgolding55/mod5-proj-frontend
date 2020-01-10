import React from "react";
import Signup from "../components/signup";
import { Segment } from "semantic-ui-react";

const SignupPage = ({ setUser, setLoading }) => {
  return (
    <Segment>
      <Signup setUser={setUser} setLoading={setLoading} />
    </Segment>
  );
};

export default SignupPage;
