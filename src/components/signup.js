import React, { useState } from "react";
import API from "../Adapters/API";
import { useHistory } from "react-router-dom";
import { Form, Button, Message } from "semantic-ui-react";

const Signup = ({ setUser }) => {
  const [signupUserField, setSignupUserField] = useState("");
  const [signupPasswordField, setSignupPasswordField] = useState("");
  const [signupBioField, setSignupBioField] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        API.signup({
          username: signupUserField,
          password: signupPasswordField,
          bio: signupBioField
        })
          .then(user => {
            setUser(user);
            history.push("/Projects");
          })
          .catch(errors => {
            setErrors(errors);
          });
        setSignupPasswordField("");
        setSignupUserField("");
        setSignupBioField("");
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
        value={signupUserField}
        onChange={e => setSignupUserField(e.target.value)}
        placeholder="Username"
      />
      <Form.Input
        required
        fluid
        label="Password"
        type="password"
        placeholder="Password"
        value={signupPasswordField}
        onChange={e => setSignupPasswordField(e.target.value)}
      />

      <Form.Field required>
        <Form.TextArea
          required
          fluid
          label={"Bio: " + signupBioField.length + "/300"}
          placeholder="Bio"
          value={signupBioField}
          onChange={e =>
            e.target.value.length <= 300
              ? setSignupBioField(e.target.value)
              : null
          }
        />
      </Form.Field>

      <Button type="submit">Sign Up</Button>
    </Form>
  );
};

export default Signup;

