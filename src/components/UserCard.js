import React from "react";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";

const UserCard = ({ id, username, github_linked, bio }) => (
  <Link to={"/Users/" + id}>
    <Card onClick={() => null}>
      <Card.Content>
        <Card.Header>{username}</Card.Header>
        <Card.Description>{bio}</Card.Description>
        <Card.Meta>Github {github_linked ? "Linked" : "Not Linked"}</Card.Meta>
      </Card.Content>
    </Card>
  </Link>
);

export default UserCard;
