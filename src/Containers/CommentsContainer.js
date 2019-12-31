import React, { useState } from "react";
import CommentCard from "../components/CommentCard";
import { Comment, Segment, Form, Button, Header } from "semantic-ui-react";
import API from "../Adapters/API";

const CommentsContainer = ({ comments, project_id, setComments, user_id }) => {
  const [comment, setComment] = useState("");
  return (
    <Segment>
      {user_id ? (
        <Form
          onSubmit={e => {
            e.preventDefault();
            API.postComment(comment, project_id).then(commentObj =>
              setComments([commentObj.comment, ...comments])
            );
            setComment("");
          }}
        >
          <Form.Input
            required
            label="Comment"
            placeholder="Comment Content"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
        </Form>
      ) : (
        ""
      )}

      <Header as="h3" dividing>
        Comments
      </Header>
      {comments.map(comment => (
        <CommentCard
          key={comment.comment_id + "comment"}
          {...comment}
          user_id={user_id}
        />
      ))}
    </Segment>
  );
};
export default CommentsContainer;
