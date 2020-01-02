import React, { useState } from "react";
import { Menu, Input, Form } from "semantic-ui-react";

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
    <Menu stackable fluid>
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

      <Menu.Menu position="right">
        <div>
          <Menu.Item style={{ height: "100%" }}>
            <Form
              onSubmit={e => {
                e.preventDefault();
                setAppSearch(search);
                history.push("/Search");
                setSearch("");
              }}
            >
              <Input
                className="searchbar"
                icon="search"
                placeholder="Search..."
                value={search}
                onChange={(e, { value }) => setSearch(value)}
              />
            </Form>
          </Menu.Item>
        </div>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
