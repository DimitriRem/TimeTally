import React from "react";

const Header = ({ date }) => {
  return (
    <header>
      <h1>TimeTally</h1>
      <div id="headerRight">{date}</div>
    </header>
  );
};

export default Header;
