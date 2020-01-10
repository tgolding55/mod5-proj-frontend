import React, { useState } from "react";
import API from "../Adapters/API";
import { useHistory } from "react-router-dom";
import { Form, Button, Message } from "semantic-ui-react";

const Login = ({ setUser }) => {
  const [loginUserField, setLoginUserField] = useState("");
  const [loginPasswordField, setLoginPasswordField] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();

        API.login({
          username: loginUserField,
          password: loginPasswordField
        })
          .then(user => {
            setUser(user);
            history.push("/Projects");
          })
          .catch(errors => {
            setErrors(errors);
          });
        setLoginPasswordField("");
        setLoginUserField("");
      }}
      error
    >
      {errors.length ? (
        <Message error header="Error!" content={errors[0]} />
      ) : (
        ""
      )}
      <Form.Input
        required
        fluid
        label="Username"
        placeholder="Username"
        value={loginUserField}
        onChange={e => setLoginUserField(e.target.value)}
      />

      <Form.Input
        label="Password"
        type="password"
        placeholder="Password"
        required
        fluid
        value={loginPasswordField}
        onChange={e => setLoginPasswordField(e.target.value)}
      />

      <Button primary type="submit">
        Log In
      </Button>
    </Form>
  );
};

export default Login;
