import React, { useState } from "react";
import API from "../Adapters/API";
import { useHistory } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";

const Login = ({ setUser, setLoading }) => {
  const [loginUserField, setLoginUserField] = useState("");
  const [loginPasswordField, setLoginPasswordField] = useState("");
  const history = useHistory();

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        setLoading(true);
        API.login({
          username: loginUserField,
          password: loginPasswordField
        })
          .then(user => {
            setUser(user);
            setLoading(false);
            history.push("/Projects");
          })
          .catch(errors => {
            alert(errors);
            setLoading(false);
          });
        setLoginPasswordField("");
        setLoginUserField("");
      }}
    >
      <Form.Field>
        <label>Username</label>
        <input
          placeholder="login username"
          value={loginUserField}
          onChange={e => setLoginUserField(e.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input
          type="password"
          placeholder="login password"
          value={loginPasswordField}
          onChange={e => setLoginPasswordField(e.target.value)}
        ></input>
      </Form.Field>
      <Button type="submit">Log In</Button>
    </Form>
  );
};

export default Login;
