import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import UsersContainer from "../Containers/UsersContainer";
import { Grid, Menu } from "semantic-ui-react";

const UsersPage = ({ user_id, history }) => {
  const [users, setUsers] = useState([]);
  const [sortType, setSortType] = useState("new");

  const init = () => {
    API.getUsers().then(usersObj => setUsers(usersObj.users));
  };

  useEffect(init, []);
  return (
    <Grid>
      <Grid.Row columns="1">
        <Grid.Column>
          <Menu>
            <Menu.Item
              active={sortType === "new"}
              onClick={() => {
                setSortType("new");
                setUsers(
                  users.sort((userA, userB) =>
                    new Date(userA.created_at).getTime() <
                    new Date(userB.created_at).getTime()
                      ? 1
                      : -1
                  )
                );
              }}
            >
              Sort By New
            </Menu.Item>
            <Menu.Item
              active={sortType === "likes"}
              onClick={() => {
                setSortType("likes");
                setUsers(
                  users.sort((userA, userB) =>
                    userA.likees.length < userB.likees.length ? 1 : -1
                  )
                );
              }}
            >
              Sort By Likes
            </Menu.Item>
          </Menu>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns="1">
        <Grid.Column>
          <UsersContainer
            users={users}
            user_id={user_id}
            history={history}
            sortType={sortType}
            setUsers={setUsers}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default UsersPage;
