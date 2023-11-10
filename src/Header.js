import React from "react";

const Header = ({ date }) => {
  return (
    <header>
      <h1>
        <span className="material-symbols-outlined">schedule</span>
        <span className="material-symbols-outlined">monetization_on</span>{" "}
        TimeTally
      </h1>

      <div id="headerRight">{date}</div>
    </header>
  );
};

export default Header;
