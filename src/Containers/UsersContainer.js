import React from "react";
import UserCard from "../components/UserCard";
import { Card } from "semantic-ui-react";

const UsersContainer = ({ users, user_id }) => (
  <Card.Group centered doubling stackable textAlign="center">
    {users.map(user => (
      <UserCard key={user.username + "index"} {...user} user_id={user_id} />
    ))}
  </Card.Group>
);

export default UsersContainer;
