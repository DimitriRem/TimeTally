import React from "react";
import TimeEntry from "./TimeEntry";

const Toolbox = ({ items }) => {
  return (
    <div id="toolbox">
      <TimeEntry items={items} />
    </div>
  );
};

export default Toolbox;
