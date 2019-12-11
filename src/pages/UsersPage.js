import React, { useEffect, useState } from "react";
import API from "../Adapters/API";
import UsersContainer from "../Containers/UsersContainer";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const init = () => {
    API.getUsers().then(usersObj => setUsers(usersObj.users));
  };
  useEffect(init, []);

  return <UsersContainer users={users} />;
};

export default UsersPage;
