import React, { useState, useEffect } from "react";
import { Card, Icon } from "semantic-ui-react";
import API from "../Adapters/API";

const CommentCard = ({ content, likes, user, comment_id, user_id }) => {
  const [commentLikes, setCommentLikes] = useState([]);
  const handleClick = () => {
    API.updateCommentLike(comment_id).then(({ user_like, liked }) =>
      liked
        ? setCommentLikes(
            commentLikes.filter(commentLike => commentLike.id !== user_like.id)
          )
        : setCommentLikes([...commentLikes, user_like])
    );
  };
  const init = () => {
    setCommentLikes(likes);
  };
  useEffect(init, []);
  return (
    <Card>
      <Card.Content>
        <Card.Meta textAlign="left">
          {user_id ? (
            !!commentLikes.find(like => like.user_id === user_id) ? (
              <Icon name="heart" onClick={handleClick} />
            ) : (
              <Icon name="heart outline" onClick={handleClick} />
            )
          ) : (
            <Icon
              name="heart outline"
              onClick={() => alert("You must be signed in to use this!")}
            />
          )}
          {commentLikes.length}
        </Card.Meta>
        <Card.Header>{user.username}</Card.Header>
        <Card.Description>{content}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default CommentCard;
