import React from "react";
import { Card } from "semantic-ui-react";

const CommentCard = ({ content, user: { username, id } }) => (
  <Card>
    <Card.Content>
      <Card.Header>{username}</Card.Header>
      <Card.Description>{content}</Card.Description>
    </Card.Content>
  </Card>
);

export default CommentCard;
