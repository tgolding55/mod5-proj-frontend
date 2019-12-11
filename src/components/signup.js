import React, { useState } from "react";
import API from "../Adapters/API";
import { useHistory } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";

const Signup = ({ setUser, setLoading }) => {
  const [signupUserField, setSignupUserField] = useState("");
  const [signupPasswordField, setSignupPasswordField] = useState("");
  const history = useHistory();

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        setLoading(true);
        API.signup({
          username: signupUserField,
          password: signupPasswordField
        })
          .then(user => {
            setUser(user);
            setLoading(false);
            history.push("/");
          })
          .catch(errors => {
            alert(errors);
            setLoading(false);
          });
        setSignupPasswordField("");
        setSignupUserField("");
      }}
    >
      <Form.Field>
        <label>Username</label>
        <input
          placeholder="signup username"
          value={signupUserField}
          onChange={e => setSignupUserField(e.target.value)}
        ></input>
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input
          type="password"
          placeholder="signup password"
          value={signupPasswordField}
          onChange={e => setSignupPasswordField(e.target.value)}
        ></input>
      </Form.Field>
      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default Signup;
