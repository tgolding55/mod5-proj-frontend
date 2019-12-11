import React from "react";
import UserCard from "../components/UserCard";
import { Card } from "semantic-ui-react";

const UsersContainer = ({ users }) => (
  <Card.Group centered doubling stackable textAlign="center">
    {users.map(user => (
      <UserCard key={user.username + "index"} {...user} />
    ))}
  </Card.Group>
);

export default UsersContainer;
