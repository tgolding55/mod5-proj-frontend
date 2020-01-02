import React, { useState, useEffect } from "react";
import { Comment, Icon, Divider } from "semantic-ui-react";
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
    <>
      <Comment>
        <Comment.Content>
          <Comment.Metadata textAlign="left">
            {user_id ? (
              !!commentLikes.find(like => like.user_id === user_id) ? (
                <Icon
                  name="heart"
                  className="heart"
                  color="red"
                  onClick={handleClick}
                />
              ) : (
                <Icon
                  name="heart outline"
                  className="heart"
                  onClick={handleClick}
                />
              )
            ) : (
              <Icon
                name="heart outline"
                onClick={() => alert("You must be signed in to use this!")}
              />
            )}
            {commentLikes.length}
          </Comment.Metadata>

          <Comment.Text>
            {user.username}: {content}
          </Comment.Text>
        </Comment.Content>
      </Comment>
      <Divider />
    </>
  );
};

export default CommentCard;
