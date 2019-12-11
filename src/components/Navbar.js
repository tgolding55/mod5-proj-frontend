import React from "react";
import { Menu, Search } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Navbar = ({ selectedPage, setSelectedPage }) => {
  const is_active = value => value === selectedPage;
  const options = ["Projects", "Users", "Profile"];
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
      <div style={{ width: "100%" }}></div>
      <Search fluid placeholder="Not implemented"></Search>
    </Menu>
  );
};

export default Navbar;
