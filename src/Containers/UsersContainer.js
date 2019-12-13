import React from "react";
import UserCard from "../components/UserCard";
import { Card } from "semantic-ui-react";

const UsersContainer = ({ users, user_id, history }) => (
  <Card.Group centered doubling stackable textAlign="center">
    {users.map(user => (
      <UserCard
        key={user.username + "index"}
        {...user}
        user_id={user_id}
        history={history}
      />
    ))}
  </Card.Group>
);

export default UsersContainer;
