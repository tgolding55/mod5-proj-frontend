import React, { useState, useEffect } from "react";
import { Comment, Icon } from "semantic-ui-react";
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
    <Comment>
      <Comment.Content>
        <Comment.Metadata textAlign="left">
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
        </Comment.Metadata>
        <Comment.Author>{user.username}</Comment.Author>
        <Comment.Text>{content}</Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default CommentCard;
