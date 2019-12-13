import React, { useState } from "react";
import CommentCard from "../components/CommentCard";
import { Card, Segment, Form, Button } from "semantic-ui-react";
import API from "../Adapters/API";

const CommentsContainer = ({ comments, project_id, setComments, user_id }) => {
  const [comment, setComment] = useState("");
  return (
    <Segment>
      <Form
        onSubmit={e => {
          e.preventDefault();
          API.postComment(comment, project_id).then(commentObj =>
            setComments([commentObj.comment, ...comments])
          );
          setComment("");
        }}
      >
        <Form.Field>
          <label>content</label>
          <input
            placeholder="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </Form.Field>
        <Button type="submit">post</Button>
      </Form>

      <Card.Group itemsPerRow="1">
        {comments.map(comment => (
          <CommentCard
            key={comment.comment_id + "comment"}
            {...comment}
            user_id={user_id}
          />
        ))}
      </Card.Group>
    </Segment>
  );
};
export default CommentsContainer;
