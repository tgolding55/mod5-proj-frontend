import React, { useState } from "react";
import { Menu, Input } from "semantic-ui-react";

const Navbar = ({
  selectedPage,
  setSelectedPage,
  user,
  setAppSearch,
  history
}) => {
  const is_active = value => value === selectedPage;
  const [search, setSearch] = useState("");
  const options = ["Projects", "Users"];
  const menuItem = option => (
    <Menu.Item
      key={option}
      active={is_active(option)}
      onClick={e => {
        setSelectedPage(e.target.innerText);
        history.push("/" + e.target.innerText);
      }}
    >
      {option}
    </Menu.Item>
  );

  return (
    <Menu>
      {options.map(option => menuItem(option))}

      {user && (
        <Menu.Item
          key="Profile"
          active={is_active("Profile")}
          onClick={e => {
            setSelectedPage(e.target.innerText);
            history.push("/" + e.target.innerText);
          }}
        >
          Profile
        </Menu.Item>
      )}
      <div style={{ width: "100%" }}></div>
      <form
        onSubmit={e => {
          e.preventDefault();
          setAppSearch(search);
          history.push("/Search");
          setSearch("");
        }}
      >
        <Input
          icon="search"
          placeholder="Search projects/users..."
          value={search}
          onChange={(e, { value }) => setSearch(value)}
        />
      </form>
    </Menu>
  );
};

export default Navbar;
