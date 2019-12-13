import React, { useEffect, useState } from "react";
import { Card, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import API from "../Adapters/API";

const UserCard = ({ id, username, github_linked, bio, likees, user_id }) => {
  const [userLikees, setUserLikees] = useState([]);
  const handleLike = e => {
    e.preventDefault();
    API.updateUserLike(id).then(resp => setUserLikees(resp));
  };

  const init = () => {
    setUserLikees(likees);
  };
  useEffect(init, []);
  return (
    <Link to={"/Users/" + id}>
      <Card onClick={() => null}>
        <Card.Content>
          <Card.Meta textAlign="left">
            {user_id ? (
              userLikees.find(likee => likee.id === user_id) ? (
                <Icon name="heart" color="red" onClick={handleLike}></Icon>
              ) : (
                <Icon name="heart outline" onClick={handleLike}></Icon>
              )
            ) : (
              <Icon
                name="heart outline"
                onClick={e => {
                  e.preventDefault();
                  alert("You must be logged in to do that!");
                }}
              />
            )}
            {userLikees.length}
          </Card.Meta>
          <Card.Header>{username}</Card.Header>
          <Card.Description>{bio}</Card.Description>
          <Card.Meta>
            Github {github_linked ? "Linked" : "Not Linked"}
          </Card.Meta>
        </Card.Content>
      </Card>
    </Link>
  );
};

export default UserCard;
