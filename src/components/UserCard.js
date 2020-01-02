import React, { useEffect, useState } from "react";
import { Card, Icon, Grid } from "semantic-ui-react";
import API from "../Adapters/API";

const UserCard = ({
  id,
  username,
  github_linked,
  bio,
  likees,
  user_id,
  history,
  role = null,
  sortType,
  setUsers,
  users
}) => {
  const [userLikees, setUserLikees] = useState([]);
  const handleLike = e => {
    e.stopPropagation();
    API.updateUserLike(id).then(resp => setUserLikees(resp));
  };

  const init = () => {
    setUserLikees(likees);
  };

  const resetUser = () => {
    if (sortType) {
      const changedUser = users.find(user => user.id === id);
      changedUser.likees = userLikees;
      const newUsers = [...users.filter(user => user.id !== id), changedUser];
      setUsers(
        sortType === "new"
          ? newUsers.sort((userA, userB) =>
              new Date(userA.created_at).getTime() <
              new Date(userB.created_at).getTime()
                ? 1
                : -1
            )
          : newUsers.sort((userA, userB) =>
              userA.likees.length < userB.likees.length ? 1 : -1
            )
      );
    }
  };
  useEffect(resetUser, [userLikees]);
  useEffect(init, []);
  return (
    <Card onClick={() => history.push("/Users/" + id)}>
      <Card.Content>
        <Card.Meta>
          <Grid.Row>
            <Grid.Column floated="left" textAlign="left" verticalAlign="left">
              {user_id ? (
                userLikees.find(likee => likee.id === user_id) ? (
                  <Icon
                    onClick={handleLike}
                    className="heart"
                    
                    name="heart"
                    color="red"
                  ></Icon>
                ) : (
                  <Icon
                    onClick={handleLike}
                    className="heart"
                    name="heart outline"
                  ></Icon>
                )
              ) : (
                <Icon
                  name="heart outline"
                  onClick={e => {
                    e.stopPropagation();
                    alert("You must be logged in to do that!");
                  }}
                />
              )}
              {userLikees.length}
            </Grid.Column>
            <Grid.Column
              floated="right"
              textAlign="right"
              verticalAlign="right"
            >
              {role ? (
                role === "lead" ? (
                  <Icon name="key"></Icon>
                ) : (
                  <Icon name="user"></Icon>
                )
              ) : (
                ""
              )}
            </Grid.Column>
          </Grid.Row>
        </Card.Meta>
        <Card.Header>{username}</Card.Header>
        <Card.Description>{bio}</Card.Description>
        <Card.Meta>
          <p>Github {github_linked ? "Linked" : "Not Linked"}</p>
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default UserCard;
