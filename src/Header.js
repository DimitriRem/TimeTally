import React from "react";

const Header = ({ date }) => {
  return (
    <header>
      <h1>
        <span className="material-symbols-outlined">schedule</span>
        <span className="material-symbols-outlined">monetization_on</span>{" "}
        TimeTally
      </h1>
      {date}
    </header>
  );
};

export default Header;
