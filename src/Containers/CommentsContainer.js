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
          <Form.TextArea
            required
            label="New Comment"
            placeholder="Write comment here..."
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          <Button
            content="Add Comment"
            labelPosition="middle"
            icon="edit"
            primary
          />
        </Form>
      ) : (
        ""
      )}

      <Header as="h3" dividing>
        Comments
      </Header>
      {comments.length ? (
        comments.map(comment => (
          <CommentCard
            key={comment.comment_id + "comment"}
            {...comment}
            user_id={user_id}
          />
        ))
      ) : (
        <h4>This project has no comments</h4>
      )}
    </Segment>
  );
};
export default CommentsContainer;
