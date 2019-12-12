import React from "react";
import { Menu, Search } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Navbar = ({ selectedPage, setSelectedPage, user }) => {
  const is_active = value => value === selectedPage;
  const options = ["Projects", "Users"];
  const menuItem = option => (
    <Link key={option + "link"} to={"/" + option}>
      <Menu.Item
        key={option}
        active={is_active(option)}
        onClick={e => setSelectedPage(e.target.innerText)}
      >
        {option}
      </Menu.Item>
    </Link>
  );
  return (
    <Menu>
      {options.map(option => menuItem(option))}

      {user && (
        <Link key={"Profilelink"} to={"/Profile"}>
          <Menu.Item
            key="Profile"
            active={is_active("Profile")}
            onClick={e => setSelectedPage(e.target.innerText)}
          >
            Profile
          </Menu.Item>
        </Link>
      )}
      <div style={{ width: "100%" }}></div>
      <Search fluid placeholder="Not implemented"></Search>
    </Menu>
  );
};

export default Navbar;
